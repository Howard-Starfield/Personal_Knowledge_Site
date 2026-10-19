/**
 * Read-only question-quality checker.
 *
 * Rejects multiple-choice assessments that a learner could answer by test-wiseness (answer length
 * or answer position) instead of knowledge, plus certification claims (PRD FR-QUIZ-03) and
 * published placeholder pages. Supports inline lesson questions and canonical
 * `knowledge-question-bank` blocks. Rules and thresholds are documented in
 * docs/exec-plans/active/question-quality-checker.md and the question-bank authoring packet.
 *
 * Usage: tsx scripts/check-question-quality.ts [content-root]
 * Exit codes: 0 = no failures, 1 = failures found, 2 = usage error.
 */
import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"
import type { Code, Root } from "mdast"
import remarkParse from "remark-parse"
import { unified } from "unified"
import { visit } from "unist-util-visit"
import YAML from "yaml"
import {
  parseQuestionBankBlock,
  type QuestionBankDefinition,
} from "../plugins/knowledge-quiz/src/schema.ts"

/** Percentages are integers so that boundary comparisons are exact. */
export const thresholds = {
  /** Failure when the correct option is the longest (ties included) in more than this share. */
  maxCorrectIsLongestPercent: 35,
  /** Position balance is checked only for groups with at least this many items. */
  minItemsForPositionBalance: 8,
  /** Each position share must lie within [low, high] percent of an even 1/k share (k=4: 15%–35%). */
  positionBalanceLowPercentOfEven: 60,
  positionBalanceHighPercentOfEven: 140,
  /** Failure when more consecutive items than this share the same correct position. */
  maxSamePositionRun: 3,
  /** Warning when the correct option is more than this percent of the longest wrong option. */
  lengthCuePercent: 125,
  /** A published body this short that contains a placeholder phrase is a placeholder page. */
  placeholderMaxWords: 40,
} as const

export type RuleId =
  | "longest-share"
  | "position-balance"
  | "position-run"
  | "length-cue"
  | "all-none-of-above"
  | "certification-claim"
  | "certification-mention"
  | "placeholder-page"
  | "malformed-question"
  | "invalid-bank"
  | "invalid-frontmatter"

export interface Finding {
  severity: "failure" | "warning"
  rule: RuleId
  message: string
  line?: number
}

export interface ScoredItem {
  label: string
  line: number
  options: readonly string[]
  correctIndex: number
}

export interface Assessment {
  kind: "inline" | "bank"
  name: string
  items: ScoredItem[]
}

export interface FileReport {
  path: string
  assessments: Assessment[]
  findings: Finding[]
}

interface SetMeasurement {
  longestCount: number
  positionCounts: number[]
  longestRun: { letter: string; length: number; label: string }
}

const optionPattern = /^\s*[-*+]\s+(?:\[[ xX]\]\s+)?\*{0,2}([A-H])\)\*{0,2}\s+(\S.*)$/
const answerKeyPattern = /Correct Answer:\*{0,2}\s*\*{0,2}\(?([A-H])\b/
const multipleKeyPattern =
  /Correct Answers?:\*{0,2}\s*\*{0,2}\(?[A-H]\)?\*{0,2}\s*(?:,|&|\/|\band\b)\s*\*{0,2}\(?[A-H]\b/i
const detailsOpenPattern = /<details\b[^>]*>/gi
const detailsClosePattern = /<\/details\s*>/gi
const quizAnswerOpenPattern = /<details\b[^>]*\bclass\s*=\s*["'][^"']*\bquiz-answer\b/i
const allNonePattern = /\b(?:all|none) of the above\b/i
const certificationPattern = /\bcertif(?:y|ies|ied|ying|ications?)\b/gi
const headingPattern = /^\s{0,3}#{1,6}\s/
const summaryPattern = /<summary\b/i
const placeholderPattern =
  /\b(?:content (?:is )?(?:in|under) development|in development|coming soon|tbd|todo|lorem ipsum|placeholder|to be (?:written|added|completed)|under construction)\b/i
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

function letter(index: number): string {
  return String.fromCharCode(65 + index)
}

function percent(count: number, total: number): string {
  return `${Math.round((count * 100) / total)}%`
}

function failure(rule: RuleId, message: string, line?: number): Finding {
  return { severity: "failure", rule, message, line }
}

function warning(rule: RuleId, message: string, line?: number): Finding {
  return { severity: "warning", rule, message, line }
}

/** Visible length of an option: Markdown emphasis/code markers removed, whitespace collapsed. */
export function optionLength(text: string): number {
  return [...text.replace(/[*_`]/g, "").replace(/\s+/g, " ").trim()].length
}

function lengthsOf(item: ScoredItem): { correct: number; longestWrong: number } {
  const lengths = item.options.map(optionLength)
  const correct = lengths[item.correctIndex]
  if (correct === undefined) {
    throw new Error(`${item.label}: correct index ${item.correctIndex} is outside its options`)
  }
  const wrong = lengths.filter((_, index) => index !== item.correctIndex)
  return { correct, longestWrong: Math.max(0, ...wrong) }
}

function measure(items: readonly ScoredItem[]): SetMeasurement {
  const maxOptions = Math.max(0, ...items.map((item) => item.options.length))
  const positionCounts = Array.from({ length: maxOptions }, () => 0)
  let longestCount = 0
  let longestRun = { letter: "", length: 0, label: "" }
  let run = { letter: "", length: 0, label: "" }
  for (const item of items) {
    const { correct, longestWrong } = lengthsOf(item)
    if (correct >= longestWrong) longestCount += 1
    positionCounts[item.correctIndex] = (positionCounts[item.correctIndex] ?? 0) + 1
    const current = letter(item.correctIndex)
    run =
      current === run.letter
        ? { ...run, length: run.length + 1 }
        : { letter: current, length: 1, label: item.label }
    if (run.length > longestRun.length) longestRun = run
  }
  return { longestCount, positionCounts, longestRun }
}

function positionSummary(counts: readonly number[]): string {
  return counts.map((count, index) => `${letter(index)} ${count}`).join(", ")
}

/** Applies the per-assessment failure rules and per-item length warnings to one ordered set. */
export function evaluateItems(items: readonly ScoredItem[], name = "assessment"): Finding[] {
  const findings: Finding[] = []
  if (items.length === 0) return findings
  const total = items.length
  const { longestCount, longestRun } = measure(items)

  if (longestCount * 100 > thresholds.maxCorrectIsLongestPercent * total) {
    findings.push(
      failure(
        "longest-share",
        `${name}: correct option is the longest (ties included) in ${longestCount}/${total} items (${percent(longestCount, total)}); limit ${thresholds.maxCorrectIsLongestPercent}%`,
      ),
    )
  }

  const byOptionCount = new Map<number, ScoredItem[]>()
  for (const item of items) {
    byOptionCount.set(item.options.length, [
      ...(byOptionCount.get(item.options.length) ?? []),
      item,
    ])
  }
  for (const [optionCount, group] of byOptionCount) {
    if (group.length < thresholds.minItemsForPositionBalance) continue
    const counts = measure(group).positionCounts
    const lowScaled = thresholds.positionBalanceLowPercentOfEven * group.length
    const highScaled = thresholds.positionBalanceHighPercentOfEven * group.length
    const outOfBand = counts.some((count) => {
      const scaled = count * optionCount * 100
      return scaled < lowScaled || scaled > highScaled
    })
    if (outOfBand) {
      const low = (thresholds.positionBalanceLowPercentOfEven / optionCount).toFixed(1)
      const high = (thresholds.positionBalanceHighPercentOfEven / optionCount).toFixed(1)
      findings.push(
        failure(
          "position-balance",
          `${name}: correct positions ${positionSummary(counts)} across ${group.length} ${optionCount}-option items; each position must be ${low}%-${high}%`,
        ),
      )
    }
  }

  if (longestRun.length > thresholds.maxSamePositionRun) {
    findings.push(
      failure(
        "position-run",
        `${name}: ${longestRun.length} consecutive items answer ${longestRun.letter} (starting at ${longestRun.label}); limit ${thresholds.maxSamePositionRun}`,
      ),
    )
  }

  for (const item of items) {
    const { correct, longestWrong } = lengthsOf(item)
    if (correct * 100 > thresholds.lengthCuePercent * longestWrong) {
      const ratio = longestWrong === 0 ? "inf" : (correct / longestWrong).toFixed(2)
      findings.push(
        warning(
          "length-cue",
          `${item.label}: correct option ${letter(item.correctIndex)} is ${ratio}x the longest wrong option (limit ${(thresholds.lengthCuePercent / 100).toFixed(2)}x)`,
          item.line,
        ),
      )
    }
  }
  return findings
}

function allNoneFindings(options: readonly string[], label: string, line: number): Finding[] {
  return options.flatMap((text, index) =>
    allNonePattern.test(text)
      ? [
          warning(
            "all-none-of-above",
            `${label}: option ${letter(index)} uses "all/none of the above"`,
            line,
          ),
        ]
      : [],
  )
}

function countMatches(line: string, pattern: RegExp): number {
  return [...line.matchAll(pattern)].length
}

interface PendingGroup {
  line: number
  letters: string[]
  texts: string[]
  collecting: boolean
  broken: boolean
}

/** Extracts inline `- A) …` questions keyed by `<details class="quiz-answer">` blocks. */
function extractInline(
  lines: readonly string[],
  inFencedCode: (index: number) => boolean,
  lineNumber: (index: number) => number,
): { items: ScoredItem[]; findings: Finding[] } {
  const items: ScoredItem[] = []
  const findings: Finding[] = []
  let group: PendingGroup | undefined
  let depth = 0
  let quizAnswer: { line: number; text: string } | undefined
  let inDisplayMath = false

  const malformed = (message: string, line: number): void => {
    findings.push(failure("malformed-question", message, line))
  }

  const closeQuizAnswer = (block: { line: number; text: string }): void => {
    const current = group
    group = undefined
    if (current === undefined) {
      malformed("quiz-answer block has no preceding A) option list", block.line)
      return
    }
    if (current.broken) return
    if (multipleKeyPattern.test(block.text)) {
      malformed("inline questions support exactly one correct answer letter", block.line)
      return
    }
    const key = answerKeyPattern.exec(block.text)?.[1]
    if (key === undefined) {
      malformed('quiz-answer block has no parseable "**Correct Answer:** X" letter', block.line)
      return
    }
    const correctIndex = current.letters.indexOf(key)
    if (correctIndex < 0) {
      malformed(
        `Correct Answer ${key} is not one of the options ${current.letters.join(", ")}`,
        block.line,
      )
      return
    }
    if (current.letters.length < 2) {
      malformed("a question needs at least two options", current.line)
      return
    }
    items.push({
      label: `Q${items.length + 1}`,
      line: current.line,
      options: current.texts,
      correctIndex,
    })
  }

  lines.forEach((line, index) => {
    const lineNo = lineNumber(index)
    if (inFencedCode(index)) {
      if (quizAnswer === undefined && group !== undefined) group.collecting = false
      return
    }
    // A `<details>` tag quoted inside an inline code span is prose, not markup.
    const markup = line.replace(/`[^`]*`/g, "")
    const opens = countMatches(markup, detailsOpenPattern)
    const closes = countMatches(markup, detailsClosePattern)
    if (depth === 0 && opens > 0) {
      if (group !== undefined) group.collecting = false
      inDisplayMath = false
      if (quizAnswerOpenPattern.test(markup)) quizAnswer = { line: lineNo, text: "" }
    }
    if (depth > 0 || opens > 0) {
      if (quizAnswer !== undefined) quizAnswer.text += `${line}\n`
      depth = Math.max(0, depth + opens - closes)
      if (depth === 0 && quizAnswer !== undefined) {
        closeQuizAnswer(quizAnswer)
        quizAnswer = undefined
      }
      return
    }

    const option = optionPattern.exec(line)
    if (option === null) {
      const trimmed = line.trim()
      if (trimmed === "" || group === undefined) return
      const last = group.texts.length - 1
      const continuing = group.collecting && !group.broken && last >= 0
      // Indented lines and `$$` display-math blocks continue the previous option's visible text.
      const startsMath = continuing && !inDisplayMath && trimmed.startsWith("$$")
      if (inDisplayMath || startsMath || (continuing && /^(?: {2,}|\t)\S/.test(line))) {
        group.texts[last] = `${group.texts[last] ?? ""} ${trimmed}`
        if (startsMath) inDisplayMath = !(trimmed.length > 2 && trimmed.endsWith("$$"))
        else if (inDisplayMath && trimmed.endsWith("$$")) inDisplayMath = false
      } else {
        group.collecting = false
      }
      return
    }
    inDisplayMath = false
    const optionLetter = option[1] ?? ""
    const text = option[2] ?? ""
    if (optionLetter === "A") {
      if (group !== undefined && !group.broken) {
        malformed("option list has no quiz-answer key before the next question", group.line)
      }
      group = { line: lineNo, letters: ["A"], texts: [text], collecting: true, broken: false }
      return
    }
    if (group === undefined) {
      malformed(`option ${optionLetter}) does not follow an A) option`, lineNo)
      group = { line: lineNo, letters: [], texts: [], collecting: false, broken: true }
      return
    }
    if (group.broken) return
    const expected = letter(group.letters.length)
    if (!group.collecting || optionLetter !== expected) {
      malformed(`expected option ${expected}) but found ${optionLetter})`, lineNo)
      group.broken = true
      return
    }
    group.letters.push(optionLetter)
    group.texts.push(text)
  })

  if (quizAnswer !== undefined) {
    malformed("quiz-answer block is never closed with </details>", quizAnswer.line)
  } else if (group !== undefined && !group.broken) {
    malformed("option list has no quiz-answer key", group.line)
  }
  return { items, findings }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

interface SplitPage {
  frontmatterText: string
  data: Record<string, unknown> | undefined
  body: string
  bodyLineOffset: number
  frontmatterError: string | undefined
}

function splitPage(source: string): SplitPage {
  const text = source.charCodeAt(0) === 0xfeff ? source.slice(1) : source
  const match = frontmatterPattern.exec(text)
  if (match === null) {
    return {
      frontmatterText: "",
      data: undefined,
      body: text,
      bodyLineOffset: 0,
      frontmatterError: undefined,
    }
  }
  const frontmatterText = match[1] ?? ""
  const bodyLineOffset = countMatches(match[0], /\n/g)
  const body = text.slice(match[0].length)
  try {
    const parsed: unknown = YAML.parse(frontmatterText)
    if (!isRecord(parsed)) {
      return {
        frontmatterText,
        data: undefined,
        body,
        bodyLineOffset,
        frontmatterError: "frontmatter must be a mapping",
      }
    }
    return { frontmatterText, data: parsed, body, bodyLineOffset, frontmatterError: undefined }
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    return {
      frontmatterText,
      data: undefined,
      body,
      bodyLineOffset,
      frontmatterError: `invalid YAML frontmatter: ${detail}`,
    }
  }
}

function certificationFindings(
  page: SplitPage,
  lines: readonly string[],
  inFencedCode: (index: number) => boolean,
  lineNumber: (index: number) => number,
): Finding[] {
  const findings: Finding[] = []
  page.frontmatterText.split(/\r?\n/).forEach((line, index) => {
    if (countMatches(line, certificationPattern) > 0) {
      findings.push(
        failure(
          "certification-claim",
          "frontmatter uses certification wording; quizzes must not claim certification value (FR-QUIZ-03)",
          index + 2,
        ),
      )
    }
  })
  const type = page.data?.["type"]
  const wholeBodyIsSurface = type === "course" || type === "question-bank"
  const mentionLines: number[] = []
  lines.forEach((line, index) => {
    if (countMatches(line, certificationPattern) === 0) return
    const code = inFencedCode(index)
    const surface =
      !code && (wholeBodyIsSurface || headingPattern.test(line) || summaryPattern.test(line))
    if (surface) {
      findings.push(
        failure(
          "certification-claim",
          "self-description uses certification wording; quizzes must not claim certification value (FR-QUIZ-03)",
          lineNumber(index),
        ),
      )
    } else {
      mentionLines.push(lineNumber(index))
    }
  })
  if (mentionLines.length > 0) {
    const shown = mentionLines.slice(0, 8).join(", ")
    const more = mentionLines.length > 8 ? ", ..." : ""
    findings.push(
      warning(
        "certification-mention",
        `certification wording on ${mentionLines.length} body line(s) (${shown}${more}); confirm it is subject matter, not a claim about this course`,
        mentionLines[0],
      ),
    )
  }
  return findings
}

function placeholderFindings(page: SplitPage): Finding[] {
  if (page.data?.["publish"] !== true) return []
  const prose = page.body
    .replace(/<!--[\s\S]*?-->/g, " ")
    .split(/\r?\n/)
    .filter((line) => !headingPattern.test(line))
    .join(" ")
    .replace(/[*_`]/g, " ")
  const words = prose.split(/\s+/).filter((word) => word !== "")
  if (words.length === 0) {
    return [failure("placeholder-page", "publish: true page has no body text beyond headings")]
  }
  if (words.length <= thresholds.placeholderMaxWords && placeholderPattern.test(prose)) {
    return [
      failure(
        "placeholder-page",
        `publish: true page body is a placeholder ("${words.join(" ").slice(0, 60)}")`,
      ),
    ]
  }
  return []
}

/** Checks one Markdown page. `relativePath` is used only for labels. */
export function checkPage(source: string, relativePath: string): FileReport {
  const report: FileReport = { path: relativePath, assessments: [], findings: [] }
  const page = splitPage(source)
  if (page.frontmatterError !== undefined) {
    report.findings.push(failure("invalid-frontmatter", page.frontmatterError, 1))
  }

  const lines = page.body.split(/\r?\n/)
  const lineNumber = (index: number): number => index + 1 + page.bodyLineOffset
  const tree: Root = unified().use(remarkParse).parse(page.body)
  const fenced = new Set<number>()
  const bankBlocks: Array<{ value: string; line: number }> = []
  visit(tree, "code", (node: Code) => {
    const start = node.position?.start.line
    const end = node.position?.end.line
    if (start === undefined || end === undefined) {
      throw new Error(`${relativePath}: remark-parse returned a code block without a position`)
    }
    for (let line = start; line <= end; line += 1) fenced.add(line - 1)
    if (node.lang === "knowledge-question-bank") {
      bankBlocks.push({ value: node.value, line: start + page.bodyLineOffset })
    }
  })
  const inFencedCode = (index: number): boolean => fenced.has(index)

  const inline = extractInline(lines, inFencedCode, lineNumber)
  report.findings.push(...inline.findings)
  if (inline.items.length > 0) {
    report.assessments.push({ kind: "inline", name: "inline quiz", items: inline.items })
    for (const item of inline.items) {
      report.findings.push(...allNoneFindings(item.options, item.label, item.line))
    }
  }

  for (const block of bankBlocks) {
    const name = `bank block at line ${block.line}`
    let bank: QuestionBankDefinition
    try {
      bank = parseQuestionBankBlock(block.value, page.data?.["id"], `${relativePath}:${block.line}`)
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error)
      report.findings.push(failure("invalid-bank", detail, block.line))
      continue
    }
    const items: ScoredItem[] = []
    for (const question of bank.questions) {
      const label = `question ${question.id.slice(0, 8)}`
      if (question.type === "single-choice" || question.type === "multiple-select") {
        const texts = question.options.map((option) => option.text)
        report.findings.push(...allNoneFindings(texts, label, block.line))
        if (question.type === "single-choice") {
          const correctIndex = question.options.findIndex(
            (option) => option.id === question.correctOptionIds[0],
          )
          items.push({ label, line: block.line, options: texts, correctIndex })
        }
      }
    }
    if (items.length > 0) report.assessments.push({ kind: "bank", name, items })
  }

  for (const assessment of report.assessments) {
    report.findings.push(...evaluateItems(assessment.items, assessment.name))
  }
  report.findings.push(...certificationFindings(page, lines, inFencedCode, lineNumber))
  report.findings.push(...placeholderFindings(page))
  return report
}

function collectMarkdown(directory: string, files: string[]): void {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) collectMarkdown(absolute, files)
    else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "AGENTS.md") {
      files.push(absolute)
    }
  }
}

/** Checks every Markdown page below `root` except AGENTS.md files. Never writes. */
export function checkTree(root: string): FileReport[] {
  const files: string[] = []
  collectMarkdown(root, files)
  return files
    .map((file) => path.relative(root, file).replaceAll(path.sep, "/"))
    .sort()
    .map((relativePath) =>
      checkPage(fs.readFileSync(path.join(root, relativePath), "utf8"), relativePath),
    )
}

function hasFailure(report: FileReport): boolean {
  return report.findings.some((finding) => finding.severity === "failure")
}

export function formatReport(root: string, reports: readonly FileReport[]): string {
  const out: string[] = [
    `Question quality check: ${root}`,
    `Failures: correct-is-longest > ${thresholds.maxCorrectIsLongestPercent}%; position share outside 15%-35% (4 options, >= ${thresholds.minItemsForPositionBalance} items); same-position run > ${thresholds.maxSamePositionRun}; certification claims; published placeholders; malformed questions or banks.`,
    `Warnings: correct option > ${(thresholds.lengthCuePercent / 100).toFixed(2)}x longest wrong option; all/none of the above; certification wording in body text.`,
    "",
  ]
  let failures = 0
  let warnings = 0
  let items = 0
  for (const report of reports) {
    items += report.assessments.reduce((sum, assessment) => sum + assessment.items.length, 0)
    if (report.assessments.length === 0 && report.findings.length === 0) continue
    const status = hasFailure(report) ? "FAIL" : report.findings.length > 0 ? "WARN" : "PASS"
    out.push(`${status}  ${report.path}`)
    for (const assessment of report.assessments) {
      const { longestCount, positionCounts, longestRun } = measure(assessment.items)
      const total = assessment.items.length
      out.push(
        `      ${assessment.name}: ${total} item(s); correct longest ${longestCount}/${total} (${percent(longestCount, total)}); positions ${positionSummary(positionCounts)}; longest run ${longestRun.length}`,
      )
    }
    for (const finding of report.findings) {
      if (finding.severity === "failure") failures += 1
      else warnings += 1
      const where = finding.line === undefined ? "" : `L${finding.line} `
      out.push(`      ${finding.severity.padEnd(7)} ${finding.rule}: ${where}${finding.message}`)
    }
  }
  const failingFiles = reports.filter(hasFailure).length
  out.push(
    "",
    `Summary: ${reports.length} file(s), ${items} scored item(s), ${failingFiles} file(s) with failures, ${failures} failure(s), ${warnings} warning(s)`,
  )
  return out.join("\n")
}

export function main(args: readonly string[]): number {
  const root = path.resolve(args[0] ?? "content")
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    console.error(`Content root does not exist or is not a directory: ${root}`)
    return 2
  }
  const reports = checkTree(root)
  console.log(formatReport(root, reports))
  return reports.some(hasFailure) ? 1 : 0
}

function isEntryPoint(): boolean {
  const entry = process.argv[1]
  if (entry === undefined) return false
  const self = path.resolve(fileURLToPath(import.meta.url))
  const invoked = path.resolve(entry)
  return process.platform === "win32"
    ? self.toLowerCase() === invoked.toLowerCase()
    : self === invoked
}

if (isEntryPoint()) process.exitCode = main(process.argv.slice(2))

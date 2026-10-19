import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import {
  checkPage,
  checkTree,
  evaluateItems,
  formatReport,
  optionLength,
  type FileReport,
  type Finding,
  type RuleId,
  type ScoredItem,
} from "./check-question-quality.ts"

const fixtures = path.resolve("scripts/fixtures/question-quality")
const checker = path.resolve("scripts/check-question-quality.ts")

function fixture(relativePath: string): FileReport {
  const file = path.join(fixtures, relativePath)
  return checkPage(fs.readFileSync(file, "utf8"), relativePath)
}

function rules(findings: readonly Finding[], severity: Finding["severity"]): RuleId[] {
  return findings.filter((finding) => finding.severity === severity).map((finding) => finding.rule)
}

function failures(report: FileReport): RuleId[] {
  return rules(report.findings, "failure")
}

function warnings(report: FileReport): RuleId[] {
  return rules(report.findings, "warning")
}

/** Builds a scored item with four equal-length options and the given correct letter. */
function item(correct: string, index: number, correctLength = 10, wrongLength = 10): ScoredItem {
  const correctIndex = "ABCD".indexOf(correct)
  assert.ok(correctIndex >= 0, `test helper received invalid letter ${correct}`)
  const options = [0, 1, 2, 3].map((position) =>
    "x".repeat(position === correctIndex ? correctLength : wrongLength),
  )
  return { label: `Q${index + 1}`, line: index + 1, options, correctIndex }
}

function items(letters: string, longestCount = 0): ScoredItem[] {
  return [...letters].map((letter, index) =>
    index < longestCount ? item(letter, index, 12, 10) : item(letter, index, 8, 10),
  )
}

function lesson(body: string, extraFrontmatter = "", type = "lesson", publish = true): string {
  return `---
id: "2b3c4d5e-6f7a-4b8c-9d0e-1f2a3b4c5d6e"
title: "Fixture"
description: "Fixture page."
type: ${type}
publish: ${publish}
status: active
created: "2026-10-18"
tags: []
${extraFrontmatter}---

${body}
`
}

function inlineQuestion(options: readonly string[], key: string): string {
  const lines = options.map((text, index) => `- ${"ABCDEFGH"[index]}) ${text}`)
  return `Which is right?

${lines.join("\n")}

<details class="quiz-answer">
<summary>Reveal Answer</summary>

**Correct Answer:** ${key}

</details>
`
}

// --- Passing fixtures -------------------------------------------------------

test("a balanced inline assessment passes and scores every supported option style", () => {
  const report = fixture("pass/balanced-inline.md")
  assert.deepEqual(failures(report), [])
  assert.deepEqual(warnings(report), [])
  assert.equal(report.assessments.length, 1)
  const assessment = report.assessments[0]
  assert.ok(assessment)
  assert.equal(
    assessment.items.length,
    8,
    "fenced, explanation and thought-answer lists are ignored",
  )
  assert.deepEqual(
    assessment.items.map((scored) => "ABCD"[scored.correctIndex]),
    ["A", "B", "C", "D", "B", "A", "D", "C"],
  )
})

test("a valid V1 bank passes and only single-choice questions are scored", () => {
  const report = fixture("pass/bank.md")
  assert.deepEqual(failures(report), [])
  assert.equal(report.assessments.length, 1)
  assert.equal(report.assessments[0]?.kind, "bank")
  assert.equal(report.assessments[0]?.items.length, 3)
})

// --- Failing fixtures -------------------------------------------------------

test("a length-cued, single-letter assessment fails every set rule", () => {
  const report = fixture("fail/length-and-position.md")
  assert.deepEqual(
    new Set(failures(report)),
    new Set(["longest-share", "position-balance", "position-run"]),
  )
  assert.equal(warnings(report).filter((rule) => rule === "length-cue").length, 10)
})

test("a published placeholder page fails", () => {
  assert.deepEqual(failures(fixture("fail/placeholder.md")), ["placeholder-page"])
})

test("an unpublished placeholder page is not flagged", () => {
  const report = checkPage(
    lesson("*Lesson content in development...*", "", "lesson", false),
    "x.md",
  )
  assert.deepEqual(failures(report), [])
})

test("a published page with substantive text that mentions a placeholder is not flagged", () => {
  const prose = "The runtime inserts a placeholder tool result. ".repeat(10)
  assert.deepEqual(failures(checkPage(lesson(prose), "x.md")), [])
})

test("a published page with an empty body fails", () => {
  assert.deepEqual(failures(checkPage(lesson("# Title only"), "x.md")), ["placeholder-page"])
})

// --- Boundaries -------------------------------------------------------------

test("correct-is-longest share passes at 35% and fails above it", () => {
  const letters = "ABCDABCDABCDABCDABCD"
  const atLimit = evaluateItems(items(letters, 7))
  assert.ok(!rules(atLimit, "failure").includes("longest-share"))
  const overLimit = evaluateItems(items(letters, 8))
  assert.ok(rules(overLimit, "failure").includes("longest-share"))
})

test("ties for longest count as the correct option being longest", () => {
  const tied = [item("A", 0, 10, 10)]
  assert.ok(rules(evaluateItems(tied), "failure").includes("longest-share"))
})

test("small sets are not exempt from the longest-share rule", () => {
  const single = [item("A", 0, 12, 10)]
  assert.ok(rules(evaluateItems(single), "failure").includes("longest-share"))
})

test("a run of three identical letters passes and a run of four fails", () => {
  assert.ok(!rules(evaluateItems(items("AAABCD")), "failure").includes("position-run"))
  assert.ok(rules(evaluateItems(items("AAAABCD")), "failure").includes("position-run"))
})

test("position balance is skipped below eight items", () => {
  assert.ok(!rules(evaluateItems(items("ABABABA")), "failure").includes("position-balance"))
})

test("position balance passes at the 15% and 35% edges and fails outside them", () => {
  // 20 items: A 3 (15%), B 7 (35%), C 5, D 5; no run longer than 3.
  const atEdges = evaluateItems(items("BABCDBACDBCDBACDBCBD"))
  assert.ok(!rules(atEdges, "failure").includes("position-balance"))
  // 20 items: A 2 (10%), B 8 (40%), C 5, D 5.
  const outside = evaluateItems(items("BABCDBCCDBCDBACDBDBB"))
  assert.ok(rules(outside, "failure").includes("position-balance"))
  // 20 items: A 2 (10%), B 7 (35%), C 6, D 5 — only the low edge is violated.
  const belowLowEdge = evaluateItems(items("BABCDBCCDBCDBACDBDCB"))
  assert.ok(rules(belowLowEdge, "failure").includes("position-balance"))
  // 20 items: A 3 (15%), B 8 (40%), C 5, D 4 — only the high edge is violated.
  const aboveHighEdge = evaluateItems(items("BABCDBACDBCDBACBDCBB"))
  assert.ok(rules(aboveHighEdge, "failure").includes("position-balance"))
})

test("position balance scales its band with the option count", () => {
  const twoOption = [..."ABABABBA"].map((letter, index) => ({
    label: `Q${index + 1}`,
    line: index + 1,
    options: ["xxxxxxxx", "xxxxxxxx"].map((text, position) =>
      position === "AB".indexOf(letter) ? "xxxxxx" : text,
    ),
    correctIndex: "AB".indexOf(letter),
  }))
  assert.ok(!rules(evaluateItems(twoOption), "failure").includes("position-balance"))
})

test("the length-cue warning triggers only above 1.25 times the longest wrong option", () => {
  assert.ok(!rules(evaluateItems([item("A", 0, 125, 100)]), "warning").includes("length-cue"))
  assert.ok(rules(evaluateItems([item("A", 0, 126, 100)]), "warning").includes("length-cue"))
})

test("option length ignores Markdown emphasis and extra whitespace", () => {
  assert.equal(optionLength("**Bold**   _text_ `code`"), "Bold text code".length)
})

// --- Item and page rules ----------------------------------------------------

test("all/none of the above options warn", () => {
  const page = lesson(inlineQuestion(["Red", "Blue", "All of the above", "None of the above"], "A"))
  assert.equal(
    warnings(checkPage(page, "x.md")).filter((rule) => rule === "all-none-of-above").length,
    2,
  )
})

test("certification wording on a self-description surface fails", () => {
  const heading = checkPage(lesson("# Certification exam preparation\n\nBody text here."), "x.md")
  assert.ok(failures(heading).includes("certification-claim"))
  const frontmatter = checkPage(lesson("Body text.", 'subtitle: "Get certified today"\n'), "x.md")
  assert.ok(failures(frontmatter).includes("certification-claim"))
  const course = checkPage(lesson("Learners earn certification here.", "", "course"), "x.md")
  assert.ok(failures(course).includes("certification-claim"))
})

test("certification wording in lesson prose only warns", () => {
  const report = checkPage(
    lesson("The vendor holds an ISO 27001 certification and a certified appraiser reviewed it."),
    "x.md",
  )
  assert.deepEqual(failures(report), [])
  assert.deepEqual(warnings(report), ["certification-mention"])
})

// --- Malformed input --------------------------------------------------------

test("options without an answer key fail", () => {
  assert.deepEqual(failures(fixture("malformed/missing-key.md")), ["malformed-question"])
})

test("an answer key that is not one of the options fails", () => {
  assert.deepEqual(failures(fixture("malformed/unknown-key.md")), ["malformed-question"])
})

test("non-contiguous option letters fail and the broken question is not scored", () => {
  const report = fixture("malformed/letter-gap.md")
  assert.deepEqual(failures(report), ["malformed-question"])
  assert.equal(report.assessments.length, 0)
})

test("an answer key without preceding options fails", () => {
  const page = lesson(
    `<details class="quiz-answer">\n<summary>Answer</summary>\n\n**Correct Answer:** A\n\n</details>`,
  )
  assert.deepEqual(failures(checkPage(page, "x.md")), ["malformed-question"])
})

test("a quiz-answer block without a parseable key fails", () => {
  const page = lesson(inlineQuestion(["One", "Two"], "see the explanation"))
  assert.deepEqual(failures(checkPage(page, "x.md")), ["malformed-question"])
})

test("multiple inline correct answers fail", () => {
  const page = lesson(inlineQuestion(["One", "Two", "Three"], "A, C"))
  assert.deepEqual(failures(checkPage(page, "x.md")), ["malformed-question"])
})

test("a bank rejected by the V1 parser fails with the parser message", () => {
  const report = fixture("malformed/bank-invalid.md")
  assert.deepEqual(failures(report), ["invalid-bank"])
  assert.match(report.findings[0]?.message ?? "", /unknown option ID "farad"/)
})

test("invalid frontmatter fails", () => {
  const report = checkPage("---\nid: [unclosed\n---\n\nBody.\n", "x.md")
  assert.deepEqual(failures(report), ["invalid-frontmatter"])
})

test("indented continuation lines belong to the previous option", () => {
  const page = lesson(
    inlineQuestion(["Short", "Steps:\n  1. first step\n  2. second step", "Other", "Third"], "C"),
  )
  const report = checkPage(page, "x.md")
  assert.deepEqual(failures(report), [])
  assert.deepEqual(report.assessments[0]?.items[0]?.options, [
    "Short",
    "Steps: 1. first step 2. second step",
    "Other",
    "Third",
  ])
})

test("a display-math block after an option belongs to that option", () => {
  const page = lesson(inlineQuestion(["Compute\n\n$$\nx = 1\n$$\n", "Two", "Three", "Four"], "B"))
  const report = checkPage(page, "x.md")
  assert.deepEqual(failures(report), [])
  assert.equal(report.assessments[0]?.items[0]?.options[0], "Compute $$ x = 1 $$")
})

test("a details tag quoted in inline code is not treated as markup", () => {
  const page = lesson(
    'Open the `<details class="quiz-answer">` block after answering.\n\n' +
      inlineQuestion(["Alpha", "Beta", "Gamma", "Delta"], "B"),
  )
  const report = checkPage(page, "x.md")
  assert.deepEqual(failures(report), [])
  assert.equal(report.assessments[0]?.items.length, 1)
})

test("CRLF line endings are supported", () => {
  const page = lesson(inlineQuestion(["Alpha", "Beta", "Gamma", "Delta"], "C")).replaceAll(
    "\n",
    "\r\n",
  )
  const report = checkPage(page, "x.md")
  assert.equal(report.assessments[0]?.items.length, 1)
})

// --- Tree and CLI -----------------------------------------------------------

test("checkTree reports every Markdown file and skips AGENTS.md", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "question-quality-"))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  fs.mkdirSync(path.join(root, "course", "lessons"), { recursive: true })
  fs.writeFileSync(path.join(root, "AGENTS.md"), "# Certification rules\n")
  fs.writeFileSync(path.join(root, "course", "lessons", "a.md"), lesson("Body text."))
  const reports = checkTree(root)
  assert.deepEqual(
    reports.map((report) => report.path),
    ["course/lessons/a.md"],
  )
  assert.match(formatReport(root, reports), /0 failure\(s\)/)
})

function runChecker(...args: string[]) {
  return spawnSync(process.execPath, ["--import", "tsx", checker, ...args], {
    cwd: path.resolve("."),
    encoding: "utf8",
  })
}

test("the CLI exits 0 for passing fixtures", () => {
  const result = runChecker(path.join(fixtures, "pass"))
  assert.equal(result.status, 0, result.stdout + result.stderr)
  assert.match(result.stdout, /PASS +balanced-inline\.md/)
})

test("the CLI exits 1 and prints a per-file report for failures", () => {
  const result = runChecker(path.join(fixtures, "fail"))
  assert.equal(result.status, 1, result.stdout + result.stderr)
  assert.match(result.stdout, /FAIL +length-and-position\.md/)
  assert.match(result.stdout, /longest-share/)
  assert.match(result.stdout, /FAIL +placeholder\.md/)
})

test("the CLI exits 2 when the root does not exist", () => {
  const result = runChecker(path.join(fixtures, "does-not-exist"))
  assert.equal(result.status, 2)
  assert.match(result.stderr, /does not exist/)
})

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { buildSync } from "esbuild"
import type { Code, Root as MarkdownRoot } from "mdast"
import type { Element, Root } from "hast"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import type {
  QuartzComponent,
  QuartzPageTypePluginInstance,
  QuartzPluginData,
  QuartzTransformerPluginInstance,
} from "@quartz-community/types"
import {
  buildQuestionBankRegistry,
  parseQuestionBankBlock,
  parseQuizSelectionBlock,
  resolveQuiz,
  type QuestionBankDefinition,
  type QuizSelection,
} from "./src/schema.ts"
import { renderQuestionBank, renderQuiz, replaceElement } from "./src/render.ts"

declare module "vfile" {
  interface DataMap {
    knowledgeQuestionBanks?: QuestionBankDefinition[]
    knowledgeQuizSelections?: QuizSelection[]
  }
}

const styles = fs.readFileSync(new URL("./quiz.scss", import.meta.url), "utf8")
const clientBuild = buildSync({
  entryPoints: [fileURLToPath(new URL("./src/quiz-client.ts", import.meta.url))],
  bundle: true,
  format: "iife",
  minify: true,
  platform: "browser",
  target: "es2022",
  write: false,
})
const clientOutput = clientBuild.outputFiles.at(0)
if (!clientOutput) throw new Error("Knowledge quiz client bundle produced no output")
const clientScript = clientOutput.text

function frontmatterValue(fileData: QuartzPluginData, key: string): unknown {
  const frontmatter = fileData.frontmatter
  if (typeof frontmatter !== "object" || frontmatter === null) return undefined
  return Reflect.get(frontmatter, key)
}

function sourceName(fileData: QuartzPluginData): string {
  return typeof fileData.relativePath === "string" ? fileData.relativePath : "unknown Markdown file"
}

const remarkKnowledgeQuiz: Plugin<[], MarkdownRoot> = () => {
  return (tree, file) => {
    const banks: QuestionBankDefinition[] = []
    const selections: QuizSelection[] = []
    const source = sourceName(file.data)
    visit(tree, "code", (node: Code) => {
      if (node.lang === "knowledge-question-bank") {
        banks.push(
          parseQuestionBankBlock(
            node.value,
            frontmatterValue(file.data, "id"),
            `${source}:question-bank`,
          ),
        )
      }
      if (node.lang === "knowledge-quiz") {
        selections.push(parseQuizSelectionBlock(node.value, `${source}:quiz[${selections.length}]`))
      }
    })

    const contentType = frontmatterValue(file.data, "type")
    if (contentType === "question-bank" && banks.length !== 1) {
      throw new Error(
        `${source}: a question-bank page requires exactly one knowledge-question-bank block`,
      )
    }
    if (contentType !== "question-bank" && banks.length > 0) {
      throw new Error(`${source}: knowledge-question-bank blocks require type: question-bank`)
    }
    if (selections.length > 0 && contentType !== "lesson" && contentType !== "article") {
      throw new Error(
        `${source}: knowledge-quiz blocks are allowed only on lesson or article pages`,
      )
    }
    if (banks.length > 0) file.data.knowledgeQuestionBanks = banks
    if (selections.length > 0) file.data.knowledgeQuizSelections = selections
  }
}

function languageOfPre(node: Element): string | undefined {
  if (node.tagName !== "pre") return undefined
  const preLanguage = node.properties.dataLanguage
  if (typeof preLanguage === "string") return preLanguage
  const child = node.children.find(
    (candidate): candidate is Element =>
      candidate.type === "element" && candidate.tagName === "code",
  )
  if (!child) return undefined
  const codeLanguage = child.properties.dataLanguage
  if (typeof codeLanguage === "string") return codeLanguage
  const className = child.properties.className
  const classes = Array.isArray(className)
    ? className
    : typeof className === "string"
      ? [className]
      : []
  const languageClass = classes.find(
    (candidate) => typeof candidate === "string" && candidate.startsWith("language-"),
  )
  return typeof languageClass === "string" ? languageClass.slice("language-".length) : undefined
}

function collectFencedBlocks(root: Root, language: string): Element[] {
  const matches: Element[] = []
  function walk(nodes: Root["children"]): void {
    for (const node of nodes) {
      if (node.type !== "element") continue
      if (languageOfPre(node) === language) {
        matches.push(node)
        continue
      }
      if (node.tagName === "figure") {
        const fencedPre = node.children.find(
          (child): child is Element =>
            child.type === "element" && languageOfPre(child) === language,
        )
        if (fencedPre) {
          matches.push(node)
          continue
        }
      }
      walk(node.children)
    }
  }
  walk(root.children)
  return matches
}

function describePreBlocks(root: Root): string {
  const descriptions: string[] = []
  function walk(nodes: Root["children"]): void {
    for (const node of nodes) {
      if (node.type !== "element") continue
      if (node.tagName === "pre") {
        const childElements = node.children.filter(
          (child): child is Element => child.type === "element",
        )
        descriptions.push(
          JSON.stringify({
            pre: node.properties,
            children: childElements.map((child) => ({
              tagName: child.tagName,
              properties: child.properties,
            })),
          }),
        )
      }
      walk(node.children)
    }
  }
  walk(root.children)
  return descriptions.join("; ")
}

function collectBanks(files: readonly QuartzPluginData[]): QuestionBankDefinition[] {
  const banks: QuestionBankDefinition[] = []
  for (const file of files) {
    if (file.knowledgeQuestionBanks) banks.push(...file.knowledgeQuestionBanks)
  }
  return banks
}

function validatePublishedSelections(
  files: readonly QuartzPluginData[],
  registry: ReadonlyMap<string, QuestionBankDefinition>,
): void {
  const quizOwners = new Map<string, string>()
  for (const file of files) {
    for (const selection of file.knowledgeQuizSelections ?? []) {
      const existingOwner = quizOwners.get(selection.quizId)
      if (existingOwner) {
        throw new Error(`${selection.source}: quiz ID is already owned by ${existingOwner}`)
      }
      quizOwners.set(selection.quizId, selection.source)
      resolveQuiz(selection, registry)
    }
  }
}

const QuizNoopBody: QuartzComponent = () => null

type KnowledgeQuizPluginInstance = QuartzTransformerPluginInstance & QuartzPageTypePluginInstance

function KnowledgeQuizPlugin(): KnowledgeQuizPluginInstance {
  let cachedFiles: readonly QuartzPluginData[] | undefined
  let cachedRegistry: ReadonlyMap<string, QuestionBankDefinition> | undefined

  return {
    name: "KnowledgeQuiz",
    markdownPlugins() {
      return [remarkKnowledgeQuiz]
    },
    externalResources() {
      return {
        css: [{ content: styles, inline: true }],
        js: [
          {
            contentType: "inline",
            loadTime: "afterDOMReady",
            script: clientScript,
            spaPreserve: true,
          },
        ],
      }
    },
    match() {
      return false
    },
    layout: "content",
    body: () => QuizNoopBody,
    treeTransforms() {
      return [
        (root, _slug, componentData) => {
          if (cachedFiles !== componentData.allFiles || !cachedRegistry) {
            cachedFiles = componentData.allFiles
            cachedRegistry = buildQuestionBankRegistry(collectBanks(componentData.allFiles))
            validatePublishedSelections(componentData.allFiles, cachedRegistry)
          }

          const bankBlocks = collectFencedBlocks(root, "knowledge-question-bank")
          const currentBanks = componentData.fileData.knowledgeQuestionBanks ?? []
          if (bankBlocks.length !== currentBanks.length) {
            throw new Error(
              `${sourceName(componentData.fileData)}: question-bank render metadata mismatch`,
            )
          }
          for (let index = 0; index < bankBlocks.length; index += 1) {
            const block = bankBlocks[index]
            const bank = currentBanks[index]
            if (!block || !bank || !replaceElement(root, block, renderQuestionBank(bank))) {
              throw new Error(
                `${sourceName(componentData.fileData)}: failed to render question bank`,
              )
            }
          }

          const quizBlocks = collectFencedBlocks(root, "knowledge-quiz")
          const selections = componentData.fileData.knowledgeQuizSelections ?? []
          if (quizBlocks.length !== selections.length) {
            throw new Error(
              `${sourceName(componentData.fileData)}: quiz render metadata mismatch; pre blocks: ${describePreBlocks(root)}`,
            )
          }
          for (let index = 0; index < quizBlocks.length; index += 1) {
            const block = quizBlocks[index]
            const selection = selections[index]
            if (!block || !selection) {
              throw new Error(`${sourceName(componentData.fileData)}: missing quiz render metadata`)
            }
            const resolved = resolveQuiz(selection, cachedRegistry)
            if (!replaceElement(root, block, renderQuiz(resolved))) {
              throw new Error(`${selection.source}: failed to render quiz`)
            }
          }
        },
      ]
    },
  }
}

export default KnowledgeQuizPlugin

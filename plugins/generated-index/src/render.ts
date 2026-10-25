import type { Element, ElementContent, Root, RootContent } from "hast"
import { pathForSlug, type CourseSummary, type PracticeCourse } from "./index.ts"

/** The markers a page can carry to ask for a generated listing. */
export const COURSE_MARKER = "generated:courses"
export const PRACTICE_MARKER = "generated:practice"

function text(value: string): ElementContent {
  return { type: "text", value }
}

function element(
  tagName: string,
  properties: Element["properties"] = {},
  children: ElementContent[] = [],
): Element {
  return { type: "element", tagName, properties, children }
}

/**
 * A link to another page on this site.
 *
 * The anchor deliberately carries no `data-slug`: that property is what marks
 * a link as an authored relationship in the knowledge graph, and a generated
 * listing is navigation, not an authored claim. The class matches the one
 * Quartz's own folder listing uses, so the link looks like every other
 * internal link on the site.
 */
function link(href: string, label: string): Element {
  return element("a", { href, className: ["internal", "internal-link"] }, [text(label)])
}

function table(headers: readonly string[], rows: readonly ElementContent[][]): Element {
  return element("table", { className: ["generated-index"] }, [
    element("thead", {}, [
      element(
        "tr",
        {},
        headers.map((header) => element("th", {}, [text(header)])),
      ),
    ]),
    element(
      "tbody",
      {},
      rows.map((row) =>
        element(
          "tr",
          {},
          row.map((cell) => element("td", {}, [cell])),
        ),
      ),
    ),
  ])
}

/** The homepage's table of every course, with its lesson and quiz counts. */
export function renderCourseTable(summaries: readonly CourseSummary[]): Element {
  const rows = summaries.map((summary) => [
    link(pathForSlug(summary.slug), summary.title),
    text(String(summary.lessonCount)),
    text(String(summary.quizCount)),
  ])
  return table(["Course", "Lessons", "With quizzes"], rows)
}

/**
 * The Practice page's index: for every course that has practice material,
 * each quiz-bearing lesson and the answer key that goes with it.
 */
export function renderPracticeIndex(courses: readonly PracticeCourse[]): Element {
  const children: ElementContent[] = []

  for (const course of courses) {
    children.push(element("h3", {}, [link(pathForSlug(course.slug), course.title)]))
    const rows = course.lessons.map((lesson) => [
      link(pathForSlug(lesson.slug), lesson.title),
      lesson.bankSlug ? link(pathForSlug(lesson.bankSlug), lesson.bankTitle) : text("—"),
    ])
    children.push(table(["Lesson", "Answer key"], rows))
  }

  return element("div", { className: ["generated-index", "generated-index--practice"] }, children)
}

function matchesMarker(node: RootContent | ElementContent, marker: string): boolean {
  if (node.type === "raw") return node.value.includes(marker)
  if (node.type === "comment") return node.value.includes(marker)
  return false
}

function replaceInElement(elementNode: Element, marker: string, replacement: Element): boolean {
  const next: ElementContent[] = []
  let replaced = false

  for (const child of elementNode.children) {
    if (matchesMarker(child, marker)) {
      next.push(replacement)
      replaced = true
      continue
    }
    if (child.type === "element" && replaceInElement(child, marker, replacement)) {
      replaced = true
    }
    next.push(child)
  }

  elementNode.children = next
  return replaced
}

/**
 * Replace the marker in a page's body with the generated listing.
 *
 * The marker reaches the page either as a raw HTML node or as a comment
 * depending on how the Markdown pipeline handles it, so both are matched. The
 * listing is inserted where the marker sat, which keeps it inside the curated
 * prose of the page instead of bolted on after it.
 */
export function replaceMarker(root: Root, marker: string, replacement: Element): boolean {
  const next: RootContent[] = []
  let replaced = false

  for (const child of root.children) {
    if (matchesMarker(child, marker)) {
      next.push(replacement)
      replaced = true
      continue
    }
    if (child.type === "element" && replaceInElement(child, marker, replacement)) {
      replaced = true
    }
    next.push(child)
  }

  root.children = next
  return replaced
}

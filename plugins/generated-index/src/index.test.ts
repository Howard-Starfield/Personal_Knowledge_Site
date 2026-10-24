import assert from "node:assert/strict"
import test from "node:test"
import type { Element, Root } from "hast"
import { buildCourseSummaries, buildPracticeIndex, pathForSlug, type IndexFile } from "./index.ts"
import {
  COURSE_MARKER,
  PRACTICE_MARKER,
  renderCourseTable,
  renderPracticeIndex,
  replaceMarker,
} from "./render.ts"

const courseId = "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
const bankId = "067ecfb4-fe5d-4470-9007-4b31699321d8"

function course(title: string, slug: string, id = courseId): IndexFile {
  return { slug, frontmatter: { id, title, type: "course" } }
}

function lesson(
  title: string,
  slug: string,
  options: { order?: number; quiz?: string; owner?: string } = {},
): IndexFile {
  const frontmatter: Record<string, unknown> = {
    title,
    type: "lesson",
    courseId: options.owner ?? courseId,
  }
  if (options.order !== undefined) frontmatter.lessonOrder = options.order
  const file: IndexFile = { slug, frontmatter }
  if (options.quiz) {
    return { ...file, knowledgeQuizSelections: [{ questionBankId: options.quiz }] }
  }
  return file
}

function bank(title: string, slug: string, id = bankId): IndexFile {
  return { slug, frontmatter: { id, title, type: "question-bank" } }
}

function collectAnchors(node: Element | Root): Element[] {
  const anchors: Element[] = []
  const walk = (current: Element | Root) => {
    for (const child of current.children) {
      if (child.type === "element") {
        if (child.tagName === "a") anchors.push(child)
        walk(child)
      }
    }
  }
  walk(node)
  return anchors
}

function textOf(node: Element | Root): string {
  let out = ""
  const walk = (current: Element | Root) => {
    for (const child of current.children) {
      if (child.type === "text") out += child.value
      if (child.type === "element") walk(child)
    }
  }
  walk(node)
  return out
}

test("buildCourseSummaries counts the lessons and the quizzes of every course", () => {
  const summaries = buildCourseSummaries([
    course("Accounting + AI Crash Course", "courses/accounting-ai-crash-course/index"),
    course("Covered California", "courses/covered-california-certification/index", "other-id"),
    lesson("Lesson one", "courses/accounting-ai-crash-course/lessons/01-one", {
      order: 1,
      quiz: bankId,
    }),
    lesson("Lesson two", "courses/accounting-ai-crash-course/lessons/02-two", { order: 2 }),
    lesson("Other course lesson", "courses/covered-california-certification/lessons/01-one", {
      order: 1,
      quiz: bankId,
      owner: "other-id",
    }),
  ])

  assert.equal(summaries.length, 2)
  assert.deepEqual(
    summaries.map((summary) => summary.title),
    ["Accounting + AI Crash Course", "Covered California"],
  )
  assert.equal(summaries[0]?.lessonCount, 2)
  assert.equal(summaries[0]?.quizCount, 1)
  assert.equal(summaries[1]?.lessonCount, 1)
  assert.equal(summaries[1]?.quizCount, 1)
})

test("buildCourseSummaries ignores anything that is not a course", () => {
  const summaries = buildCourseSummaries([
    lesson("A lesson", "courses/x/lessons/01-a"),
    { slug: "practice", frontmatter: { title: "Practice", type: "page" } },
    { slug: "broken" },
  ])
  assert.deepEqual(summaries, [])
})

test("buildPracticeIndex pairs each quiz-bearing lesson with its answer key", () => {
  const courses = buildPracticeIndex([
    course("Accounting + AI Crash Course", "courses/accounting-ai-crash-course/index"),
    course("No practice here", "courses/quiet/index", "quiet-id"),
    lesson("Lesson two", "courses/accounting-ai-crash-course/lessons/02-two", {
      order: 2,
      quiz: bankId,
    }),
    lesson("Lesson one", "courses/accounting-ai-crash-course/lessons/01-one", {
      order: 1,
      quiz: bankId,
    }),
    lesson("No quiz", "courses/accounting-ai-crash-course/lessons/03-three", { order: 3 }),
    lesson("Quiet lesson", "courses/quiet/lessons/01-a", { order: 1, owner: "quiet-id" }),
    bank(
      "What Accounting Is Actually For Question Bank",
      "courses/accounting-ai-crash-course/question-banks/01-one",
    ),
  ])

  assert.equal(courses.length, 1)
  const entry = courses[0]
  assert.equal(entry?.title, "Accounting + AI Crash Course")
  assert.deepEqual(
    entry?.lessons.map((lesson) => lesson.title),
    ["Lesson one", "Lesson two"],
  )
  assert.equal(
    entry?.lessons[0]?.bankSlug,
    "courses/accounting-ai-crash-course/question-banks/01-one",
  )
  assert.equal(entry?.lessons[0]?.bankTitle, "What Accounting Is Actually For Question Bank")
})

test("buildPracticeIndex leaves a lesson without a known bank readable", () => {
  const courses = buildPracticeIndex([
    course("A course", "courses/a/index"),
    lesson("Lesson one", "courses/a/lessons/01-one", { order: 1, quiz: "missing-bank" }),
  ])

  const only = courses[0]?.lessons[0]
  assert.equal(only?.bankSlug, null)
  assert.equal(only?.bankTitle, "Answer key")
})

test("the course table carries the counts and links every course", () => {
  const table = renderCourseTable([
    {
      slug: "courses/accounting-ai-crash-course/index",
      title: "Accounting + AI Crash Course",
      lessonCount: 32,
      quizCount: 32,
    },
  ])

  const anchors = collectAnchors(table)
  assert.equal(anchors.length, 1)
  assert.equal(anchors[0]?.properties.href, "/courses/accounting-ai-crash-course")
  const text = textOf(table)
  assert.match(text, /Course/)
  assert.match(text, /Lessons/)
  assert.match(text, /With quizzes/)
  assert.match(text, /32/)
})

test("the practice index links every lesson and its answer key", () => {
  const index = renderPracticeIndex([
    {
      slug: "courses/accounting-ai-crash-course/index",
      title: "Accounting + AI Crash Course",
      lessons: [
        {
          slug: "courses/accounting-ai-crash-course/lessons/01-one",
          title: "Lesson one",
          order: 1,
          bankSlug: "courses/accounting-ai-crash-course/question-banks/01-one",
          bankTitle: "Question Bank",
        },
      ],
    },
  ])

  const anchors = collectAnchors(index)
  assert.deepEqual(
    anchors.map((anchor) => anchor.properties.href),
    [
      "/courses/accounting-ai-crash-course",
      "/courses/accounting-ai-crash-course/lessons/01-one",
      "/courses/accounting-ai-crash-course/question-banks/01-one",
    ],
  )
})

test("the course table is a table: a row is a row of cells", () => {
  const table = renderCourseTable([
    { slug: "courses/a/index", title: "A", lessonCount: 3, quizCount: 2 },
  ])

  const body = table.children.find(
    (child): child is Element => child.type === "element" && child.tagName === "tbody",
  )
  assert.ok(body)
  const rows = body.children.filter((child) => child.type === "element")
  assert.equal(rows.length, 1)
  const cells = rows[0]?.children.filter((child) => child.type === "element") ?? []
  assert.deepEqual(
    cells.map((cell) => (cell.type === "element" ? cell.tagName : "")),
    ["td", "td", "td"],
  )
  assert.equal(textOf(rows[0] as Element).includes("A"), true)
})

test("generated links are navigation, not authored relationships", () => {
  const table = renderCourseTable([
    { slug: "courses/a/index", title: "A", lessonCount: 1, quizCount: 0 },
  ])
  const index = renderPracticeIndex([
    {
      slug: "courses/a/index",
      title: "A",
      lessons: [
        {
          slug: "courses/a/lessons/01-one",
          title: "Lesson one",
          order: 1,
          bankSlug: "courses/a/question-banks/01-one",
          bankTitle: "Bank",
        },
      ],
    },
  ])

  for (const anchor of [...collectAnchors(table), ...collectAnchors(index)]) {
    assert.equal(anchor.properties["data-slug"], undefined)
    assert.deepEqual(anchor.properties.className, ["internal", "internal-link"])
  }
})

test("the marker is replaced where it sat", () => {
  const root: Root = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "p",
        properties: {},
        children: [{ type: "text", value: "Before" }],
      },
      { type: "raw", value: `<!-- ${COURSE_MARKER} -->` },
      {
        type: "element",
        tagName: "p",
        properties: {},
        children: [{ type: "text", value: "After" }],
      },
    ],
  }

  const replaced = replaceMarker(
    root,
    COURSE_MARKER,
    renderCourseTable([{ slug: "courses/a/index", title: "A", lessonCount: 1, quizCount: 0 }]),
  )

  assert.equal(replaced, true)
  assert.equal(root.children.length, 3)
  assert.equal(root.children[1]?.type, "element")
  assert.match(textOf(root), /A/)
})

test("a comment node is matched as well as a raw node", () => {
  const root: Root = {
    type: "root",
    children: [{ type: "comment", value: PRACTICE_MARKER }],
  }

  const replaced = replaceMarker(
    root,
    PRACTICE_MARKER,
    renderPracticeIndex([
      {
        slug: "courses/a/index",
        title: "A",
        lessons: [
          {
            slug: "courses/a/lessons/01-one",
            title: "Lesson one",
            order: 1,
            bankSlug: null,
            bankTitle: "Answer key",
          },
        ],
      },
    ]),
  )

  assert.equal(replaced, true)
  assert.match(textOf(root), /Lesson one/)
})

test("a page without a marker is left alone", () => {
  const root: Root = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "p",
        properties: {},
        children: [{ type: "text", value: "Hello" }],
      },
    ],
  }

  const replaced = replaceMarker(
    root,
    COURSE_MARKER,
    renderCourseTable([{ slug: "courses/a/index", title: "A", lessonCount: 1, quizCount: 0 }]),
  )

  assert.equal(replaced, false)
  assert.equal(root.children.length, 1)
})

test("pathForSlug turns a slug into a site path", () => {
  assert.equal(pathForSlug("index"), "/")
  assert.equal(pathForSlug("practice"), "/practice")
  assert.equal(pathForSlug("courses/a/index"), "/courses/a")
  assert.equal(pathForSlug("courses/a/lessons/01-one"), "/courses/a/lessons/01-one")
})

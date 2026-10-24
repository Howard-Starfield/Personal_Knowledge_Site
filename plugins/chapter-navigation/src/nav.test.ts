import assert from "node:assert/strict"
import test from "node:test"

import {
  bankSequence,
  computeNavigation,
  lessonSequence,
  pathForSlug,
  type NavFile,
} from "./nav.ts"

const course = "course-1"

function lesson(order: number, slug: string, title = `Lesson ${order}`): NavFile {
  return {
    slug: `courses/course-1/lessons/${slug}`,
    title,
    type: "lesson",
    courseId: course,
    lessonOrder: order,
  }
}

function bank(slug: string, title = `Bank ${slug}`): NavFile {
  return {
    slug: `courses/course-1/question-banks/${slug}`,
    title,
    type: "question-bank",
    courseId: course,
  }
}

const files: NavFile[] = [
  lesson(1, "01-first"),
  lesson(2, "02-second"),
  lesson(3, "03-third"),
  bank("01-first", "First: Question Bank"),
  bank("02-second", "Second: Question Bank"),
  bank("03-third", "Third: Question Bank"),
  {
    slug: "courses/course-2/lessons/01-other",
    title: "Other",
    type: "lesson",
    courseId: "course-2",
    lessonOrder: 1,
  },
]

test("a lesson is flanked by the neighbouring lessons of its course", () => {
  const middle = files[1]
  const nav = computeNavigation(middle, files)
  assert.equal(nav.prev?.slug, "courses/course-1/lessons/01-first")
  assert.equal(nav.next?.slug, "courses/course-1/lessons/03-third")
})

test("the first lesson has no previous and the last has no next", () => {
  const first = computeNavigation(files[0], files)
  assert.equal(first.prev, undefined)
  assert.equal(first.next?.slug, "courses/course-1/lessons/02-second")

  const last = computeNavigation(files[2], files)
  assert.equal(last.prev?.slug, "courses/course-1/lessons/02-second")
  assert.equal(last.next, undefined)
})

test("a lesson never reaches into another course", () => {
  const nav = computeNavigation(files[0], files)
  assert.ok(!nav.next?.slug.includes("course-2"))
})

test("lessons are ordered by lessonOrder, not by file name", () => {
  const unordered: NavFile[] = [
    { ...lesson(2, "02-second") },
    { ...lesson(1, "01-first") },
    { ...lesson(10, "10-tenth") },
    { ...lesson(3, "03-third") },
  ]
  assert.deepEqual(
    lessonSequence(unordered, course).map((file) => file.lessonOrder),
    [1, 2, 3, 10],
  )
})

test("question banks are ordered by the lesson they practise", () => {
  const ordered = bankSequence(files, course)
  assert.deepEqual(
    ordered.map((file) => file.slug.split("/").pop()),
    ["01-first", "02-second", "03-third"],
  )
})

test("a question bank is flanked by the neighbouring banks", () => {
  const nav = computeNavigation(files[4], files)
  assert.equal(nav.prev?.slug, "courses/course-1/question-banks/01-first")
  assert.equal(nav.next?.slug, "courses/course-1/question-banks/03-third")
})

test("a bank with no neighbours in its course renders nothing", () => {
  const lonely: NavFile = {
    slug: "courses/course-1/question-banks/01-only",
    title: "Only",
    type: "question-bank",
    courseId: course,
  }
  assert.deepEqual(computeNavigation(lonely, [lonely]), {})
})

test("any other page uses the neighbours named in its frontmatter", () => {
  const page: NavFile = {
    slug: "practice",
    title: "Practice",
    type: "page",
    navPrev: { title: "Courses", slug: "courses/index" },
    navNext: { title: "The Final Assessment", slug: "courses/course-1/lessons/03-third" },
  }
  const nav = computeNavigation(page, files)
  assert.equal(nav.prev?.slug, "courses/index")
  assert.equal(nav.next?.slug, "courses/course-1/lessons/03-third")
})

test("a page without frontmatter neighbours renders nothing", () => {
  const page: NavFile = { slug: "practice", title: "Practice", type: "page" }
  assert.deepEqual(computeNavigation(page, files), {})
})

test("a slug becomes a root-relative site path", () => {
  assert.equal(
    pathForSlug("courses/course-1/lessons/01-first"),
    "/courses/course-1/lessons/01-first",
  )
  assert.equal(pathForSlug("courses/index"), "/courses")
  assert.equal(pathForSlug("index"), "/")
  assert.equal(pathForSlug(""), "/")
})

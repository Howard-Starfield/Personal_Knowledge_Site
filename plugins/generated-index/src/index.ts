/**
 * The data behind the generated index tables.
 *
 * Two listings are built here:
 *
 * - every course, with how many lessons it has and how many of those lessons
 *   carry a quiz;
 * - every course that has practice material, with each quiz-bearing lesson
 *   next to the answer key that goes with it.
 *
 * Everything is derived from the metadata Quartz has already parsed, so a
 * listing can never drift from the material it describes. Every value that
 * arrives from a file is treated as unknown until a guard narrows it: the
 * metadata is written by hand in Markdown.
 */

export interface IndexFile {
  readonly slug?: unknown
  readonly frontmatter?: unknown
  readonly knowledgeQuizSelections?: unknown
}

export interface CourseSummary {
  readonly slug: string
  readonly title: string
  readonly lessonCount: number
  readonly quizCount: number
}

export interface PracticeLesson {
  readonly slug: string
  readonly title: string
  readonly order: number | null
  readonly bankSlug: string | null
  readonly bankTitle: string
}

export interface PracticeCourse {
  readonly slug: string
  readonly title: string
  readonly lessons: readonly PracticeLesson[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function readText(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key]
  return typeof value === "string" && value.trim().length > 0 ? value : undefined
}

function readCount(record: Record<string, unknown>, key: string): number | undefined {
  const value = record[key]
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

function frontmatterOf(file: IndexFile): Record<string, unknown> {
  return isRecord(file.frontmatter) ? file.frontmatter : {}
}

function slugOf(file: IndexFile): string | undefined {
  return typeof file.slug === "string" && file.slug.length > 0 ? file.slug : undefined
}

/** The question bank a lesson's quiz draws from, if it has a quiz at all. */
function quizBankIdOf(file: IndexFile): string | undefined {
  const selections = file.knowledgeQuizSelections
  if (!Array.isArray(selections)) return undefined
  for (const selection of selections) {
    if (!isRecord(selection)) continue
    const bankId = readText(selection, "questionBankId")
    if (bankId) return bankId
  }
  return undefined
}

function byTitle(
  left: { readonly title: string; readonly slug: string },
  right: { readonly title: string; readonly slug: string },
): number {
  const compared = left.title.localeCompare(right.title, "en")
  return compared !== 0 ? compared : left.slug.localeCompare(right.slug, "en")
}

function byLessonOrder(
  left: { readonly order: number | null; readonly title: string; readonly slug: string },
  right: { readonly order: number | null; readonly title: string; readonly slug: string },
): number {
  if (left.order !== null && right.order !== null && left.order !== right.order) {
    return left.order - right.order
  }
  if (left.order !== null && right.order === null) return -1
  if (left.order === null && right.order !== null) return 1
  const compared = left.title.localeCompare(right.title, "en")
  return compared !== 0 ? compared : left.slug.localeCompare(right.slug, "en")
}

/**
 * Every published course, with its lesson count and the number of those
 * lessons that carry a quiz.
 */
export function buildCourseSummaries(files: readonly IndexFile[]): CourseSummary[] {
  const counts = new Map<string, { lessons: number; quizzes: number }>()

  for (const file of files) {
    const frontmatter = frontmatterOf(file)
    if (readText(frontmatter, "type") !== "lesson") continue
    const courseId = readText(frontmatter, "courseId")
    if (!courseId) continue
    const entry = counts.get(courseId) ?? { lessons: 0, quizzes: 0 }
    entry.lessons += 1
    if (quizBankIdOf(file)) entry.quizzes += 1
    counts.set(courseId, entry)
  }

  const courses: CourseSummary[] = []
  for (const file of files) {
    const frontmatter = frontmatterOf(file)
    if (readText(frontmatter, "type") !== "course") continue
    const id = readText(frontmatter, "id")
    const slug = slugOf(file)
    const title = readText(frontmatter, "title")
    if (!id || !slug || !title) continue
    const entry = counts.get(id) ?? { lessons: 0, quizzes: 0 }
    courses.push({
      slug,
      title,
      lessonCount: entry.lessons,
      quizCount: entry.quizzes,
    })
  }

  return courses.sort(byTitle)
}

/**
 * Every course that has practice material, with each quiz-bearing lesson and
 * the answer key that goes with it.
 */
export function buildPracticeIndex(files: readonly IndexFile[]): PracticeCourse[] {
  const banks = new Map<string, { slug: string; title: string }>()

  for (const file of files) {
    const frontmatter = frontmatterOf(file)
    if (readText(frontmatter, "type") !== "question-bank") continue
    const id = readText(frontmatter, "id")
    const slug = slugOf(file)
    const title = readText(frontmatter, "title")
    if (!id || !slug || !title) continue
    banks.set(id, { slug, title })
  }

  const lessonsByCourse = new Map<string, PracticeLesson[]>()

  for (const file of files) {
    const frontmatter = frontmatterOf(file)
    if (readText(frontmatter, "type") !== "lesson") continue
    const bankId = quizBankIdOf(file)
    if (!bankId) continue
    const courseId = readText(frontmatter, "courseId")
    const slug = slugOf(file)
    const title = readText(frontmatter, "title")
    if (!courseId || !slug || !title) continue
    const bank = banks.get(bankId)
    const lesson: PracticeLesson = {
      slug,
      title,
      order: readCount(frontmatter, "lessonOrder") ?? null,
      bankSlug: bank?.slug ?? null,
      bankTitle: bank?.title ?? "Answer key",
    }
    const lessons = lessonsByCourse.get(courseId) ?? []
    lessons.push(lesson)
    lessonsByCourse.set(courseId, lessons)
  }

  const courses: PracticeCourse[] = []
  for (const file of files) {
    const frontmatter = frontmatterOf(file)
    if (readText(frontmatter, "type") !== "course") continue
    const id = readText(frontmatter, "id")
    const slug = slugOf(file)
    const title = readText(frontmatter, "title")
    if (!id || !slug || !title) continue
    const lessons = lessonsByCourse.get(id)
    if (!lessons || lessons.length === 0) continue
    courses.push({ slug, title, lessons: [...lessons].sort(byLessonOrder) })
  }

  return courses.sort(byTitle)
}

/** The site path of a slug: "courses/x/index" -> "/courses/x", "index" -> "/". */
export function pathForSlug(slug: string): string {
  let trimmed = slug.replace(/^\/+|\/+$/g, "")
  if (trimmed === "index") return "/"
  if (trimmed.endsWith("/index")) trimmed = trimmed.slice(0, -"/index".length)
  return trimmed ? `/${trimmed}` : "/"
}

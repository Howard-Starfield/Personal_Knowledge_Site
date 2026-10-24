/**
 * Compute the previous/next pair for a page.
 *
 * The rules come from the content contract:
 *   - a lesson's position comes from `lessonOrder` within its course;
 *   - a question bank's position comes from the order of the lesson it
 *     practises, which is the numeric prefix of its file name;
 *   - any other page may name its own neighbours in frontmatter.
 */

export type NavTarget = {
  title: string
  slug: string
}

export type NavFile = {
  slug: string
  title: string
  type?: string
  courseId?: string
  lessonOrder?: number
  navPrev?: NavTarget
  navNext?: NavTarget
}

export type Navigation = {
  prev?: NavTarget
  next?: NavTarget
}

/** The leading number of a slug segment, e.g. "07-two" -> 7. */
function numericPrefix(slug: string): number {
  const segment = slug.split("/").pop() ?? ""
  const match = segment.match(/^(\d+)/)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

function isLesson(file: NavFile): boolean {
  return file.type === "lesson" && typeof file.courseId === "string"
}

function isBank(file: NavFile): boolean {
  return file.type === "question-bank" && typeof file.courseId === "string"
}

/** The lessons of a course, in lesson order. */
export function lessonSequence(files: NavFile[], courseId: string): NavFile[] {
  return files
    .filter((file) => isLesson(file) && file.courseId === courseId)
    .sort((left, right) => {
      const leftOrder = left.lessonOrder ?? Number.MAX_SAFE_INTEGER
      const rightOrder = right.lessonOrder ?? Number.MAX_SAFE_INTEGER
      if (leftOrder !== rightOrder) return leftOrder - rightOrder
      return left.slug.localeCompare(right.slug, "en", { numeric: true })
    })
}

/** The question banks of a course, in the order of the lessons they practise. */
export function bankSequence(files: NavFile[], courseId: string): NavFile[] {
  return files
    .filter((file) => isBank(file) && file.courseId === courseId)
    .sort((left, right) => {
      const leftNumber = numericPrefix(left.slug)
      const rightNumber = numericPrefix(right.slug)
      if (leftNumber !== rightNumber) return leftNumber - rightNumber
      return left.slug.localeCompare(right.slug, "en", { numeric: true })
    })
}

function neighbours(sequence: NavFile[], current: NavFile): Navigation {
  const index = sequence.findIndex((file) => file.slug === current.slug)
  if (index < 0) return {}
  const previous = index > 0 ? sequence[index - 1] : undefined
  const following = index < sequence.length - 1 ? sequence[index + 1] : undefined
  return {
    ...(previous ? { prev: { title: previous.title, slug: previous.slug } } : {}),
    ...(following ? { next: { title: following.title, slug: following.slug } } : {}),
  }
}

export function computeNavigation(current: NavFile, files: NavFile[]): Navigation {
  if (isLesson(current)) {
    return neighbours(lessonSequence(files, current.courseId as string), current)
  }
  if (isBank(current)) {
    return neighbours(bankSequence(files, current.courseId as string), current)
  }
  return {
    ...(current.navPrev ? { prev: current.navPrev } : {}),
    ...(current.navNext ? { next: current.navNext } : {}),
  }
}

/** The site path of a slug: "courses/x" -> "/courses/x", "courses/index" -> "/courses". */
export function pathForSlug(slug: string): string {
  let trimmed = slug.replace(/^\/+|\/+$/g, "")
  if (trimmed === "index") return "/"
  if (trimmed.endsWith("/index")) trimmed = trimmed.slice(0, -"/index".length)
  return trimmed ? `/${trimmed}` : "/"
}

import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
  QuartzPluginData,
} from "@quartz-community/types"

import { computeNavigation, pathForSlug, type NavFile, type NavTarget } from "../src/nav.ts"

function frontmatterValue(fileData: QuartzPluginData, key: string): unknown {
  const frontmatter = fileData.frontmatter
  if (typeof frontmatter !== "object" || frontmatter === null) return undefined
  return Reflect.get(frontmatter, key)
}

function stringValue(fileData: QuartzPluginData, key: string): string | undefined {
  const value = frontmatterValue(fileData, key)
  return typeof value === "string" && value.trim() ? value : undefined
}

function numberValue(fileData: QuartzPluginData, key: string): number | undefined {
  const value = frontmatterValue(fileData, key)
  return typeof value === "number" && Number.isFinite(value) ? value : undefined
}

/** Read a `{ title, slug }` neighbour written in frontmatter. */
function navTarget(fileData: QuartzPluginData, key: string): NavTarget | undefined {
  const value = frontmatterValue(fileData, key)
  if (typeof value !== "object" || value === null) return undefined
  const title = Reflect.get(value, "title")
  const slug = Reflect.get(value, "slug")
  if (typeof title !== "string" || typeof slug !== "string") return undefined
  return { title, slug }
}

function toNavFile(fileData: QuartzPluginData): NavFile {
  return {
    slug: typeof fileData.slug === "string" ? fileData.slug : "",
    title: stringValue(fileData, "title") ?? "",
    type: stringValue(fileData, "type"),
    courseId: stringValue(fileData, "courseId"),
    lessonOrder: numberValue(fileData, "lessonOrder"),
    navPrev: navTarget(fileData, "navPrev"),
    navNext: navTarget(fileData, "navNext"),
  }
}

/** The page already carries a hand-written navigation; leave it alone. */
function alreadyHasNavigation(tree: unknown): boolean {
  let found = false
  const walk = (node: unknown): void => {
    if (found || typeof node !== "object" || node === null) return
    const element = node as {
      tagName?: unknown
      properties?: { className?: unknown }
      children?: unknown
    }
    const className = element.properties?.className
    const classes = Array.isArray(className)
      ? className
      : typeof className === "string"
        ? className.split(/\s+/)
        : []
    if (element.tagName === "div" && classes.includes("chapter-navigation")) {
      found = true
      return
    }
    if (Array.isArray(element.children)) element.children.forEach(walk)
  }
  walk(tree)
  return found
}

const ChapterNavigationComponent: QuartzComponent = (props?: QuartzComponentProps) => {
  const fileData = props?.fileData
  if (!fileData) return null

  const current = toNavFile(fileData)
  const nav = computeNavigation(current, (props?.allFiles ?? []).map(toNavFile))
  if (!nav.prev && !nav.next) return null
  if (alreadyHasNavigation(props?.tree)) return null

  const children = []
  if (nav.prev) {
    children.push(
      h(
        "a",
        {
          key: "prev",
          class: "chapter-nav-btn prev",
          href: pathForSlug(nav.prev.slug),
        },
        `← Previous: ${nav.prev.title}`,
      ),
    )
  }
  if (nav.next) {
    children.push(
      h(
        "a",
        {
          key: "next",
          class: "chapter-nav-btn next",
          href: pathForSlug(nav.next.slug),
        },
        `Next: ${nav.next.title} →`,
      ),
    )
  }

  return h("div", { class: "chapter-navigation" }, children)
}

export const ChapterNavigation: QuartzComponentConstructor = () => ChapterNavigationComponent

export default ChapterNavigation

import fs from "node:fs/promises"
import path from "node:path"
import type { Element, Root } from "hast"
import type { FilePath, QuartzEmitterPlugin } from "@quartz-community/types"
import { joinSegments } from "@quartz-community/types"
import { buildKnowledgeGraphManifest, type GraphSourcePage } from "./src/manifest.ts"

function isElement(value: Root["children"][number]): value is Element {
  return value.type === "element"
}

function collectAuthoredLinks(root: Root): string[] {
  const links: string[] = []

  function visitChildren(children: Root["children"]): void {
    for (const child of children) {
      if (!isElement(child)) continue
      if (child.tagName === "a") {
        const target = child.properties?.["data-slug"]
        if (typeof target === "string") links.push(target)
      }
      visitChildren(child.children)
    }
  }

  visitChildren(root.children)
  return links
}

function readStringArray(value: unknown, field: string, slug: string): string[] {
  if (value === undefined) return []
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    throw new Error(`Knowledge graph page "${slug}" has invalid ${field}`)
  }
  return value
}

function sourcePageFromContent(
  tree: Root,
  data: Record<string, unknown>,
): GraphSourcePage | undefined {
  if (data.unlisted === true) return undefined
  const slug = data.slug
  const frontmatter = data.frontmatter
  if (typeof slug !== "string" || typeof frontmatter !== "object" || frontmatter === null) {
    throw new Error("Knowledge graph received published content without a slug or frontmatter")
  }

  const id = Reflect.get(frontmatter, "id")
  const title = Reflect.get(frontmatter, "title")
  const tags = Reflect.get(frontmatter, "tags")
  if (typeof id !== "string" || typeof title !== "string") {
    throw new Error(`Knowledge graph page "${slug}" requires frontmatter id and title`)
  }

  return {
    id,
    slug,
    title,
    tags: readStringArray(tags, "tags", slug),
    authoredLinks: collectAuthoredLinks(tree),
  }
}

const KnowledgeGraphEmitter: QuartzEmitterPlugin = () => ({
  name: "KnowledgeGraphManifest",
  async emit(ctx, content): Promise<FilePath[]> {
    const sourcePages: GraphSourcePage[] = []
    const sourceSlugs = new Set<string>(ctx.allSlugs)
    for (const [tree, file] of content) {
      const slug = file.data.slug
      if (typeof slug === "string" && !sourceSlugs.has(slug)) continue
      const sourcePage = sourcePageFromContent(tree, file.data)
      if (sourcePage) sourcePages.push(sourcePage)
    }

    const manifest = buildKnowledgeGraphManifest(sourcePages)
    const outputPath = joinSegments(ctx.argv.output, "static", "knowledgeGraph.json")
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, `${JSON.stringify(manifest)}\n`, "utf8")
    return [outputPath]
  },
})

export default KnowledgeGraphEmitter

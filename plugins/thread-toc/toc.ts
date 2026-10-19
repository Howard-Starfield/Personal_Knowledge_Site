export interface TocEntry {
  depth: number
  slug: string
  text: string
}

const headingTags = new Map([
  ["h1", 1],
  ["h2", 2],
  ["h3", 3],
  ["h4", 4],
  ["h5", 5],
  ["h6", 6],
])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function childrenOf(node: Record<string, unknown>): unknown[] {
  return Array.isArray(node.children) ? node.children : []
}

function textOf(node: unknown): string {
  if (!isRecord(node)) return ""
  if (node.type === "text" && typeof node.value === "string") return node.value
  return childrenOf(node).map(textOf).join("")
}

/**
 * Builds the rail entries from the rendered HAST tree that Quartz passes to
 * components. Headings already carry their slug `id` from the Markdown
 * pipeline, so anchors match the page without re-slugging. Depth is relative
 * to the shallowest heading kept, matching the community TOC transformer.
 */
export function extractToc(tree: unknown, maxDepth = 3): TocEntry[] {
  const found: TocEntry[] = []
  const visit = (node: unknown): void => {
    if (!isRecord(node)) return
    if (node.type === "element" && typeof node.tagName === "string") {
      const depth = headingTags.get(node.tagName)
      if (depth !== undefined) {
        const properties = isRecord(node.properties) ? node.properties : {}
        const id = properties.id
        const text = textOf(node).trim()
        if (depth <= maxDepth && typeof id === "string" && id !== "" && text !== "") {
          found.push({ depth, slug: id, text })
        }
        return
      }
    }
    for (const child of childrenOf(node)) visit(child)
  }
  visit(tree)

  if (found.length === 0) return found
  const highest = Math.min(...found.map((entry) => entry.depth))
  return found.map((entry) => ({ ...entry, depth: entry.depth - highest }))
}

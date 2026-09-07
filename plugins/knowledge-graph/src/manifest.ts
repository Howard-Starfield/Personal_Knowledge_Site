export const graphSchemaVersion = 1

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export type GraphPageNode = {
  kind: "page"
  id: string
  slug: string
  title: string
  folder: string
  cluster: string
  tags: string[]
}

export type GraphTagNode = {
  kind: "tag"
  id: string
  slug: string
  label: string
}

export type GraphNode = GraphPageNode | GraphTagNode

export type AuthoredGraphEdge = {
  kind: "authored"
  source: string
  target: string
  count: number
}

export type TagMembershipGraphEdge = {
  kind: "tag-membership"
  source: string
  target: string
}

export type GraphEdge = AuthoredGraphEdge | TagMembershipGraphEdge

export type KnowledgeGraphManifest = {
  schemaVersion: typeof graphSchemaVersion
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export type GraphSourcePage = {
  id: string
  slug: string
  title: string
  tags: readonly string[]
  authoredLinks: readonly string[]
}

function normalizeSlug(value: string): string {
  const withoutBoundarySlashes = value.replace(/^\/+|\/+$/g, "")
  return withoutBoundarySlashes.length === 0 ? "index" : withoutBoundarySlashes
}

function folderForSlug(slug: string): string {
  const segments = normalizeSlug(slug).split("/")
  if (segments.length === 1) return "root"
  return segments.slice(0, -1).join("/") || "root"
}

function clusterForFolder(folder: string): string {
  if (folder === "root") return folder
  const separatorIndex = folder.indexOf("/")
  return separatorIndex === -1 ? folder : folder.slice(0, separatorIndex)
}

function tagNodeId(tag: string): string {
  return `tag:${tag}`
}

function tagSlug(tag: string): string {
  return `tags/${encodeURIComponent(tag)}`
}

function compareNodes(left: GraphNode, right: GraphNode): number {
  if (left.kind !== right.kind) return left.kind === "page" ? -1 : 1
  return left.id.localeCompare(right.id)
}

function compareEdges(left: GraphEdge, right: GraphEdge): number {
  if (left.kind !== right.kind) return left.kind === "authored" ? -1 : 1
  const sourceOrder = left.source.localeCompare(right.source)
  return sourceOrder === 0 ? left.target.localeCompare(right.target) : sourceOrder
}

export function buildKnowledgeGraphManifest(
  sourcePages: readonly GraphSourcePage[],
): KnowledgeGraphManifest {
  const pagesById = new Map<string, GraphSourcePage>()
  const pagesBySlug = new Map<string, GraphSourcePage>()

  for (const sourcePage of sourcePages) {
    if (!uuidPattern.test(sourcePage.id)) {
      throw new Error(`Knowledge graph page "${sourcePage.slug}" has an invalid UUID`)
    }

    const slug = normalizeSlug(sourcePage.slug)
    if (sourcePage.title.trim().length === 0) {
      throw new Error(`Knowledge graph page "${slug}" has no title`)
    }
    if (pagesById.has(sourcePage.id)) {
      throw new Error(`Knowledge graph contains duplicate content ID ${sourcePage.id}`)
    }
    if (pagesBySlug.has(slug)) {
      throw new Error(`Knowledge graph contains duplicate slug ${slug}`)
    }

    const normalizedPage: GraphSourcePage = {
      ...sourcePage,
      slug,
      tags: [...new Set(sourcePage.tags.map((tag) => tag.trim()).filter(Boolean))].sort(),
    }
    pagesById.set(normalizedPage.id, normalizedPage)
    pagesBySlug.set(normalizedPage.slug, normalizedPage)
  }

  const pageNodes: GraphPageNode[] = [...pagesById.values()].map((page) => {
    const folder = folderForSlug(page.slug)
    return {
      kind: "page",
      id: page.id,
      slug: page.slug,
      title: page.title,
      folder,
      cluster: clusterForFolder(folder),
      tags: [...page.tags],
    }
  })

  const tagNames = new Set<string>()
  for (const page of pagesById.values()) {
    for (const tag of page.tags) tagNames.add(tag)
  }

  const tagNodes: GraphTagNode[] = [...tagNames].sort().map((tag) => ({
    kind: "tag",
    id: tagNodeId(tag),
    slug: tagSlug(tag),
    label: `#${tag}`,
  }))

  const authoredCounts = new Map<string, number>()
  for (const page of pagesById.values()) {
    for (const rawTargetSlug of page.authoredLinks) {
      const normalizedTarget = normalizeSlug(rawTargetSlug)
      const target =
        pagesBySlug.get(normalizedTarget) ?? pagesBySlug.get(`${normalizedTarget}/index`)
      if (!target || target.id === page.id) continue
      const key = `${page.id}\u0000${target.id}`
      authoredCounts.set(key, (authoredCounts.get(key) ?? 0) + 1)
    }
  }

  const authoredEdges: AuthoredGraphEdge[] = [...authoredCounts].map(([key, count]) => {
    const [source, target] = key.split("\u0000")
    if (!source || !target) {
      throw new Error("Knowledge graph encountered an invalid authored-edge key")
    }
    return { kind: "authored", source, target, count }
  })

  const tagEdges: TagMembershipGraphEdge[] = []
  for (const page of pagesById.values()) {
    for (const tag of page.tags) {
      tagEdges.push({ kind: "tag-membership", source: page.id, target: tagNodeId(tag) })
    }
  }

  return {
    schemaVersion: graphSchemaVersion,
    nodes: [...pageNodes, ...tagNodes].sort(compareNodes),
    edges: [...authoredEdges, ...tagEdges].sort(compareEdges),
  }
}

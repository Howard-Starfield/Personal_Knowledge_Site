import assert from "node:assert/strict"
import { test } from "node:test"
import { buildKnowledgeGraphManifest, type GraphSourcePage } from "./manifest"

const sourceId = "11111111-1111-4111-8111-111111111111"
const targetId = "22222222-2222-4222-8222-222222222222"

function fixture(overrides: Partial<GraphSourcePage> = {}): GraphSourcePage {
  return {
    id: sourceId,
    slug: "knowledge/source",
    title: "Source",
    tags: ["retrieval"],
    authoredLinks: [],
    ...overrides,
  }
}

test("builds directed authored edges with counts and tag memberships", () => {
  const manifest = buildKnowledgeGraphManifest([
    fixture({ authoredLinks: ["knowledge/target", "knowledge/target", "knowledge/source"] }),
    fixture({ id: targetId, slug: "knowledge/target", title: "Target", tags: [] }),
  ])

  assert.deepEqual(manifest.edges, [
    { kind: "authored", source: sourceId, target: targetId, count: 2 },
    { kind: "tag-membership", source: sourceId, target: "tag:retrieval" },
  ])
})

test("resolves trailing-slash folder links to index pages", () => {
  const manifest = buildKnowledgeGraphManifest([
    fixture({ authoredLinks: ["courses/retrieval/"] }),
    fixture({
      id: targetId,
      slug: "courses/retrieval/index",
      title: "Retrieval course",
      tags: [],
    }),
  ])

  assert.deepEqual(manifest.edges[0], {
    kind: "authored",
    source: sourceId,
    target: targetId,
    count: 1,
  })
})

test("excludes unresolved and self links", () => {
  const manifest = buildKnowledgeGraphManifest([
    fixture({ authoredLinks: ["missing", "knowledge/source"] }),
  ])
  assert.deepEqual(manifest.edges, [
    { kind: "tag-membership", source: sourceId, target: "tag:retrieval" },
  ])
})

test("keeps folder placement as metadata without creating folder edges", () => {
  const manifest = buildKnowledgeGraphManifest([
    fixture({ slug: "courses/retrieval/lessons/frame-the-question" }),
  ])
  const pageNode = manifest.nodes.find((node) => node.kind === "page")

  assert.deepEqual(pageNode, {
    kind: "page",
    id: sourceId,
    slug: "courses/retrieval/lessons/frame-the-question",
    title: "Source",
    folder: "courses/retrieval/lessons",
    cluster: "courses",
    tags: ["retrieval"],
  })
  assert.equal(
    manifest.edges.some((edge) => JSON.stringify(edge).includes('"kind":"folder"')),
    false,
  )
})

test("rejects malformed and duplicate content IDs", () => {
  assert.throws(
    () => buildKnowledgeGraphManifest([fixture({ id: "path-derived-id" })]),
    /invalid UUID/,
  )
  assert.throws(
    () =>
      buildKnowledgeGraphManifest([
        fixture(),
        fixture({ slug: "knowledge/other", title: "Other" }),
      ]),
    /duplicate content ID/,
  )
})

test("is deterministic when source order and tag order change", () => {
  const first = fixture({ tags: ["retrieval", "evaluation"] })
  const second = fixture({
    id: targetId,
    slug: "knowledge/target",
    title: "Target",
    tags: ["evaluation"],
  })
  const forward = buildKnowledgeGraphManifest([first, second])
  const reversed = buildKnowledgeGraphManifest([
    second,
    fixture({ tags: ["evaluation", "retrieval"] }),
  ])

  assert.deepEqual(forward, reversed)
})

test("builds a representative 500-page fixture without changing graph semantics", () => {
  const pages: GraphSourcePage[] = Array.from({ length: 500 }, (_, index) => {
    const suffix = index.toString(16).padStart(12, "0")
    const links = Array.from({ length: Math.min(4, 499 - index) }, (__, offset) => {
      return `fixture/page-${index + offset + 1}`
    })
    return {
      id: `00000000-0000-4000-8000-${suffix}`,
      slug: `fixture/page-${index}`,
      title: `Fixture page ${index}`,
      tags: [`fixture-${index % 10}`],
      authoredLinks: links,
    }
  })

  const manifest = buildKnowledgeGraphManifest(pages)
  const authoredEdges = manifest.edges.filter((edge) => edge.kind === "authored")
  const tagEdges = manifest.edges.filter((edge) => edge.kind === "tag-membership")

  assert.equal(manifest.nodes.length, 510)
  assert.equal(authoredEdges.length, 1_990)
  assert.equal(tagEdges.length, 500)
})

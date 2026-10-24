import fs from "node:fs/promises"
import path from "node:path"

const outputRoot = path.resolve("public")
const manifestPath = path.join(outputRoot, "static", "knowledgeGraph.json")
const graphSourceRoot = path.resolve("plugins", "knowledge-graph")
const graphComponentPath = path.join(graphSourceRoot, "components", "index.ts")
const graphClientPath = path.join(graphSourceRoot, "pixi-graph.ts")
const graphStylesPath = path.join(graphSourceRoot, "pixi-graph.css")
const packagePath = path.resolve("package.json")
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function fail(message) {
  throw new Error(`Graph output validation failed: ${message}`)
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function validateManifest(value) {
  if (!isRecord(value) || value.schemaVersion !== 1) fail("schemaVersion must be 1")
  if (!Array.isArray(value.nodes) || !Array.isArray(value.edges)) {
    fail("nodes and edges must be arrays")
  }

  const nodeKinds = new Map()
  let pageCount = 0
  let tagCount = 0
  for (const node of value.nodes) {
    if (!isRecord(node) || typeof node.id !== "string" || nodeKinds.has(node.id)) {
      fail("node IDs must be unique strings")
    }
    if (node.kind === "page") {
      if (
        !uuidPattern.test(node.id) ||
        typeof node.slug !== "string" ||
        typeof node.title !== "string" ||
        typeof node.folder !== "string" ||
        typeof node.cluster !== "string" ||
        !Array.isArray(node.tags) ||
        node.tags.some((tag) => typeof tag !== "string")
      ) {
        fail(`invalid page node ${node.id}`)
      }
      pageCount += 1
    } else if (node.kind === "tag") {
      if (
        !node.id.startsWith("tag:") ||
        typeof node.slug !== "string" ||
        typeof node.label !== "string"
      ) {
        fail(`invalid tag node ${node.id}`)
      }
      tagCount += 1
    } else {
      fail(`unsupported node kind ${String(node.kind)}`)
    }
    nodeKinds.set(node.id, node.kind)
  }

  const edgeKeys = new Set()
  for (const edge of value.edges) {
    if (
      !isRecord(edge) ||
      typeof edge.kind !== "string" ||
      typeof edge.source !== "string" ||
      typeof edge.target !== "string"
    ) {
      fail("every edge requires kind, source, and target strings")
    }
    if (!nodeKinds.has(edge.source) || !nodeKinds.has(edge.target)) {
      fail(`edge ${edge.source} -> ${edge.target} references a missing node`)
    }
    if (edge.source === edge.target) fail("self-edges are forbidden")
    const key = `${edge.kind}\u0000${edge.source}\u0000${edge.target}`
    if (edgeKeys.has(key)) fail(`duplicate edge ${edge.source} -> ${edge.target}`)
    edgeKeys.add(key)

    if (edge.kind === "authored") {
      if (
        nodeKinds.get(edge.source) !== "page" ||
        nodeKinds.get(edge.target) !== "page" ||
        !Number.isInteger(edge.count) ||
        edge.count < 1
      ) {
        fail(`invalid authored edge ${edge.source} -> ${edge.target}`)
      }
    } else if (edge.kind === "tag-membership") {
      if (nodeKinds.get(edge.source) !== "page" || nodeKinds.get(edge.target) !== "tag") {
        fail(`invalid tag-membership edge ${edge.source} -> ${edge.target}`)
      }
    } else {
      fail(`unsupported edge kind ${edge.kind}; folders must not be edges`)
    }
  }

  return { pageCount, tagCount, edgeCount: value.edges.length }
}

async function filesBelow(directory) {
  const result = []
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) result.push(...(await filesBelow(entryPath)))
    if (entry.isFile()) result.push(entryPath)
  }
  return result
}

const rawManifest = await fs.readFile(manifestPath, "utf8")
const parsedManifest = JSON.parse(rawManifest)
const counts = validateManifest(parsedManifest)
const publicFiles = await filesBelow(outputRoot)

const forbiddenRuntimeSignatures = [
  "cdn.jsdelivr.net/npm/d3",
  "cdn.jsdelivr.net/npm/pixi",
  "unpkg.com/d3",
  "unpkg.com/pixi",
  // ADR-0006: KaTeX is vendored in quartz/static/katex, so no page may pull
  // its stylesheet or its script from an npm CDN.
  "cdn.jsdelivr.net",
  "unpkg.com",
]
const rejectedRendererSignatures = [
  "knowledge-graph__global-canvas",
  "knowledge-graph__cluster-label",
  "knowledge-graph__cluster",
]
const graphSourceEntries = await fs.readdir(graphSourceRoot)
for (const rejectedAsset of [
  "client.ts",
  "knowledge-graph.css",
  "force-graph.ts",
  "force-graph.css",
]) {
  if (graphSourceEntries.includes(rejectedAsset)) {
    fail(`rejected graph asset still exists: ${rejectedAsset}`)
  }
}
for (const expectedAsset of ["pixi-graph.ts", "pixi-graph.css"]) {
  if (!graphSourceEntries.includes(expectedAsset)) {
    fail(`Pixi graph asset is missing: ${expectedAsset}`)
  }
}
const packageJson = JSON.parse(await fs.readFile(packagePath, "utf8"))
if (!isRecord(packageJson.dependencies) || packageJson.dependencies["pixi.js"] !== "8.16.0") {
  fail("pixi.js must remain pinned exactly to 8.16.0")
}
const componentSource = await fs.readFile(graphComponentPath, "utf8")
for (const signature of [
  "force-graph__heading",
  "force-graph__legend",
  "force-graph__toolbar",
  "force-graph__dialog-header",
  "data-graph-close",
  "Expand graph",
]) {
  if (componentSource.includes(signature)) {
    fail(`non-Quartz graph chrome returned: ${signature}`)
  }
}
for (const signature of ["Graph View", "Global Graph", "force-graph__local-outer"]) {
  if (!componentSource.includes(signature)) {
    fail(`Quartz graph component signature is missing: ${signature}`)
  }
}
const stylesSource = await fs.readFile(graphStylesPath, "utf8")
for (const signature of [
  "height: 250px",
  "width: 80vw",
  "height: 80vh",
  "backdrop-filter: blur(4px)",
]) {
  if (!stylesSource.includes(signature)) {
    fail(`Quartz graph layout signature is missing: ${signature}`)
  }
}
const clientSource = await fs.readFile(graphClientPath, "utf8")
for (const signature of [
  "forceManyBody<ForceNode>().strength(-50)",
  ".distance(30)",
  "forceRadial<ForceNode>",
  ".scaleExtent([0.25, 4])",
]) {
  if (!clientSource.includes(signature)) {
    fail(`Quartz graph renderer signature is missing: ${signature}`)
  }
}
let componentPageCount = 0
for (const filePath of publicFiles) {
  if (!/\.(?:html|js)$/i.test(filePath)) continue
  const content = await fs.readFile(filePath, "utf8")
  for (const signature of forbiddenRuntimeSignatures) {
    if (content.includes(signature)) fail(`forbidden runtime graph dependency in ${filePath}`)
  }
  for (const signature of rejectedRendererSignatures) {
    if (content.includes(signature)) fail(`rejected fixed renderer emitted in ${filePath}`)
  }
  if (filePath.endsWith(".html") && content.includes('class="force-graph')) {
    componentPageCount += 1
  }
}

if (componentPageCount === 0) fail("no emitted content page contains the force graph component")

console.log(
  `Graph output valid: ${counts.pageCount} pages, ${counts.tagCount} tags, ${counts.edgeCount} relationships, ${componentPageCount} graph-enabled HTML pages.`,
)

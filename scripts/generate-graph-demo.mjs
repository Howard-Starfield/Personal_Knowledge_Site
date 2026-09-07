import { randomUUID } from "node:crypto"
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { format } from "prettier"

const contentRoot = path.resolve("content", "graph-lab")
const registryPath = path.resolve("scripts", "fixtures", "graph-demo-ids.json")
const marker = "<!-- generated:graph-demo-v1 -->"
const clusterCount = 10
const articlesPerCluster = 52
const createdDate = "2026-08-30"
const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

const pad = (value, width) => String(value).padStart(width, "0")
const yamlString = (value) => JSON.stringify(value)
const wikiLink = (target, label) => `[[${target}|${label}]]`

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isMissingFile(error) {
  return isRecord(error) && error.code === "ENOENT"
}

function relativeOutputPath(filePath) {
  const relativePath = path.relative(contentRoot, filePath)
  if (relativePath === "" || relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Refusing output outside the graph demo boundary: ${filePath}`)
  }
  return relativePath.replaceAll("\\", "/")
}

function frontmatter({ id, title, description, type, order }) {
  return [
    "---",
    `id: ${yamlString(id)}`,
    `title: ${yamlString(title)}`,
    `description: ${yamlString(description)}`,
    `type: ${type}`,
    "publish: true",
    "status: active",
    `created: ${yamlString(createdDate)}`,
    "tags: []",
    `order: ${order}`,
    "comments: false",
    "---",
  ].join("\n")
}

function clusterKey(clusterNumber) {
  return `cluster-${pad(clusterNumber, 2)}`
}

function articleKey(clusterNumber, articleNumber) {
  return `${clusterKey(clusterNumber)}/signal-map-${pad(articleNumber, 3)}`
}

function readId(ids, key) {
  const id = ids[key]
  if (typeof id !== "string" || !uuidV4Pattern.test(id)) {
    throw new Error(`Missing or invalid UUIDv4 for registry key: ${key}`)
  }
  return id
}

async function loadRegistry() {
  try {
    const parsed = JSON.parse(await readFile(registryPath, "utf8"))
    if (!isRecord(parsed) || parsed.schemaVersion !== 1 || !isRecord(parsed.ids)) {
      throw new Error("Graph demo ID registry must contain schemaVersion 1 and an ids object")
    }
    return parsed
  } catch (error) {
    if (isMissingFile(error)) {
      return { schemaVersion: 1, ids: {} }
    }
    throw error
  }
}

function expectedKeys() {
  const keys = ["root"]
  for (let clusterNumber = 1; clusterNumber <= clusterCount; clusterNumber += 1) {
    keys.push(clusterKey(clusterNumber))
    for (let articleNumber = 1; articleNumber <= articlesPerCluster; articleNumber += 1) {
      keys.push(articleKey(clusterNumber, articleNumber))
    }
  }
  return keys
}

function completeAndValidateRegistry(registry) {
  const keys = expectedKeys()
  const expected = new Set(keys)
  for (const key of Object.keys(registry.ids)) {
    if (!expected.has(key)) {
      throw new Error(`Unexpected key in graph demo ID registry: ${key}`)
    }
  }

  let createdIds = 0
  for (const key of keys) {
    const existing = registry.ids[key]
    if (existing === undefined) {
      registry.ids[key] = randomUUID()
      createdIds += 1
    } else if (typeof existing !== "string" || !uuidV4Pattern.test(existing)) {
      throw new Error(`Invalid UUIDv4 in graph demo ID registry for key: ${key}`)
    }
  }

  const values = Object.values(registry.ids)
  if (new Set(values).size !== values.length) {
    throw new Error("Graph demo ID registry contains duplicate UUIDs")
  }

  registry.ids = Object.fromEntries(keys.map((key) => [key, registry.ids[key]]))
  return createdIds
}

function rootPage(ids) {
  const clusterLinks = Array.from({ length: clusterCount }, (_, index) => {
    const clusterNumber = index + 1
    return `- ${wikiLink(
      `graph-lab/${clusterKey(clusterNumber)}/index`,
      `Graph Cluster ${pad(clusterNumber, 2)}`,
    )}`
  }).join("\n")

  return `${frontmatter({
    id: readId(ids, "root"),
    title: "Graph Scale Lab",
    description:
      "Synthetic public content for testing the knowledge graph at realistic visual density.",
    type: "category",
    order: 90,
  })}
${marker}

# Graph Scale Lab

This section contains generated public mock content for testing graph layout, interaction, and performance. It does not assert factual claims and should not be treated as source material.

## Clusters

${clusterLinks}
`
}

function clusterPage(ids, clusterNumber) {
  const current = clusterKey(clusterNumber)
  const previousNumber = clusterNumber === 1 ? clusterCount : clusterNumber - 1
  const nextNumber = clusterNumber === clusterCount ? 1 : clusterNumber + 1
  const title = `Graph Cluster ${pad(clusterNumber, 2)}`

  return `${frontmatter({
    id: readId(ids, current),
    title,
    description: `Synthetic graph-density category ${pad(clusterNumber, 2)} of ${clusterCount}.`,
    type: "category",
    order: clusterNumber,
  })}
${marker}

# ${title}

This category is a generated graph-scale fixture. Its articles contain only navigational mock relationships.

Return to ${wikiLink("graph-lab/index", "Graph Scale Lab")}, visit ${wikiLink(
    `graph-lab/${clusterKey(previousNumber)}/index`,
    "the previous cluster",
  )}, or continue to ${wikiLink(`graph-lab/${clusterKey(nextNumber)}/index`, "the next cluster")}.
`
}

function articlePage(ids, clusterNumber, articleNumber) {
  const currentCluster = clusterKey(clusterNumber)
  const previousArticle = articleNumber === 1 ? articlesPerCluster : articleNumber - 1
  const nextArticle = articleNumber === articlesPerCluster ? 1 : articleNumber + 1
  const nextCluster = clusterNumber === clusterCount ? 1 : clusterNumber + 1
  const coordinate = `${pad(clusterNumber, 2)}.${pad(articleNumber, 3)}`
  const title = `Signal Map ${coordinate}`

  return `${frontmatter({
    id: readId(ids, articleKey(clusterNumber, articleNumber)),
    title,
    description: `Synthetic graph node ${coordinate} for interaction and performance testing.`,
    type: "article",
    order: articleNumber,
  })}
${marker}

# ${title}

This is generated public mock content used to exercise graph layout at scale. It does not assert factual claims.

## Connected signals

- ${wikiLink(`graph-lab/${currentCluster}/signal-map-${pad(previousArticle, 3)}`, "Previous signal")}
- ${wikiLink(`graph-lab/${currentCluster}/signal-map-${pad(nextArticle, 3)}`, "Next signal")}
- ${wikiLink(
    `graph-lab/${clusterKey(nextCluster)}/signal-map-${pad(articleNumber, 3)}`,
    "Matching signal in the next cluster",
  )}
- ${wikiLink(`graph-lab/${currentCluster}/index`, `Graph Cluster ${pad(clusterNumber, 2)}`)}
`
}

async function listMarkdownFiles(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true })
    const nested = await Promise.all(
      entries.map((entry) => {
        const entryPath = path.join(directory, entry.name)
        if (entry.isDirectory()) return listMarkdownFiles(entryPath)
        return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : []
      }),
    )
    return nested.flat()
  } catch (error) {
    if (isMissingFile(error)) return []
    throw error
  }
}

async function verifyExistingOutputs(expectedPaths) {
  for (const filePath of await listMarkdownFiles(contentRoot)) {
    const relativePath = relativeOutputPath(filePath)
    const source = await readFile(filePath, "utf8")
    if (!source.includes(marker)) {
      throw new Error(`Refusing to overwrite unmarked Markdown: ${relativePath}`)
    }
    if (!expectedPaths.has(relativePath)) {
      throw new Error(`Unexpected stale generated Markdown requires manual review: ${relativePath}`)
    }
  }
}

async function writeGenerated(filePath, source) {
  const relativePath = relativeOutputPath(filePath)
  try {
    const existing = await readFile(filePath, "utf8")
    if (!existing.includes(marker)) {
      throw new Error(`Refusing to overwrite unmarked Markdown: ${relativePath}`)
    }
  } catch (error) {
    if (!isMissingFile(error)) throw error
  }
  await mkdir(path.dirname(filePath), { recursive: true })
  const formattedSource = await format(source, { filepath: filePath })
  await writeFile(filePath, formattedSource, "utf8")
}

async function main() {
  const registry = await loadRegistry()
  const createdIds = completeAndValidateRegistry(registry)
  const outputs = new Map([["index.md", rootPage(registry.ids)]])

  for (let clusterNumber = 1; clusterNumber <= clusterCount; clusterNumber += 1) {
    const cluster = clusterKey(clusterNumber)
    outputs.set(`${cluster}/index.md`, clusterPage(registry.ids, clusterNumber))
    for (let articleNumber = 1; articleNumber <= articlesPerCluster; articleNumber += 1) {
      outputs.set(
        `${cluster}/signal-map-${pad(articleNumber, 3)}.md`,
        articlePage(registry.ids, clusterNumber, articleNumber),
      )
    }
  }

  await verifyExistingOutputs(new Set(outputs.keys()))
  await mkdir(path.dirname(registryPath), { recursive: true })
  await writeFile(registryPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8")
  for (const [relativePath, source] of outputs) {
    await writeGenerated(path.join(contentRoot, relativePath), source)
  }

  const generatedFiles = await listMarkdownFiles(contentRoot)
  if (generatedFiles.length !== outputs.size) {
    throw new Error(`Expected ${outputs.size} generated pages, found ${generatedFiles.length}`)
  }

  console.log(
    `Generated ${outputs.size} graph demo pages (${clusterCount} clusters, ${
      clusterCount * articlesPerCluster
    } articles); created ${createdIds} new UUIDs.`,
  )
}

await main()

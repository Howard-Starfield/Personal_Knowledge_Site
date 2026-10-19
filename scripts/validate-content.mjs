import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import YAML from "yaml"

const contentRoot = path.resolve(process.argv[2] ?? "content")
const supportedTypes = new Set([
  "page",
  "category",
  "article",
  "course",
  "lesson",
  "question-bank",
  "learning-note",
])
const commonFields = ["id", "title", "description", "type", "publish", "status", "created", "tags"]
const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const date = /^\d{4}-\d{2}-\d{2}$/

const failures = []
const records = []
const recordsById = new Map()
const recordsByPath = new Map()
const assetPaths = new Set()
const assetsByName = new Map()

function relative(file) {
  return path.relative(contentRoot, file).replaceAll(path.sep, "/")
}

function collectMarkdown(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      collectMarkdown(absolute)
    } else if (entry.name.endsWith(".md")) {
      if (entry.name !== "AGENTS.md") records.push(parseRecord(absolute))
    } else if (entry.isFile()) {
      const assetPath = relative(absolute)
      assetPaths.add(assetPath)
      const sameName = assetsByName.get(entry.name) ?? []
      sameName.push(assetPath)
      assetsByName.set(entry.name, sameName)
    }
  }
}

function parseRecord(file) {
  const source = fs.readFileSync(file, "utf8")
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) {
    failures.push(`${relative(file)}: missing YAML frontmatter`)
    return { file, relativePath: relative(file), data: {}, body: source }
  }

  let data = {}
  try {
    const parsed = YAML.parse(match[1])
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      data = parsed
    } else {
      failures.push(`${relative(file)}: frontmatter must be a mapping`)
    }
  } catch (error) {
    failures.push(`${relative(file)}: invalid YAML frontmatter: ${error.message}`)
  }

  return { file, relativePath: relative(file), data, body: source.slice(match[0].length) }
}

function fail(record, message) {
  failures.push(`${record.relativePath}: ${message}`)
}

function validateCommon(record) {
  const { data } = record
  for (const field of commonFields) {
    if (!(field in data)) fail(record, `missing required field "${field}"`)
  }

  if (typeof data.id !== "string" || !uuidV4.test(data.id)) {
    fail(record, "id must be a lower-case UUIDv4")
  } else if (recordsById.has(data.id)) {
    fail(record, `duplicate id also used by ${recordsById.get(data.id).relativePath}`)
  } else {
    recordsById.set(data.id, record)
  }

  for (const field of ["title", "description"]) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      fail(record, `${field} must be a non-empty string`)
    }
  }

  if (!supportedTypes.has(data.type)) fail(record, `unsupported type "${String(data.type)}"`)
  if (typeof data.publish !== "boolean") fail(record, "publish must be a boolean")
  if (data.publish === true && data.draft === true)
    fail(record, "publish: true conflicts with draft: true")
  if (!new Set(["active", "archived"]).has(data.status))
    fail(record, "status must be active or archived")
  if (typeof data.created !== "string" || !date.test(data.created))
    fail(record, "created must use YYYY-MM-DD")
  if (
    data.updated !== undefined &&
    (typeof data.updated !== "string" || !date.test(data.updated))
  ) {
    fail(record, "updated must use YYYY-MM-DD")
  }
  if (
    !Array.isArray(data.tags) ||
    data.tags.some((tag) => typeof tag !== "string" || tag.trim() === "")
  ) {
    fail(record, "tags must be an array of non-empty strings")
  }
}

function validatePlacement(record) {
  const { data, relativePath } = record
  const fileName = path.posix.basename(relativePath)
  const directory = path.posix.dirname(relativePath)

  if (data.type === "category" && fileName !== "index.md") {
    fail(record, "a category must use index.md")
  }

  if (data.type === "article") {
    const category = recordsByPath.get(`${directory}/index.md`)
    if (!category || category.data.type !== "category") {
      fail(record, "an article must share a folder with a category index.md")
    }
  }

  if (data.type === "course") {
    if (!relativePath.startsWith("courses/") || fileName !== "index.md") {
      fail(record, "a course must use content/courses/<course>/index.md")
    }
    if (!Array.isArray(data.learningOutcomes) || data.learningOutcomes.length === 0) {
      fail(record, "a course requires at least one learning outcome")
    }
  }

  if (data.type === "learning-note" && !relativePath.startsWith("learning-log/")) {
    fail(record, "a learning note must live below content/learning-log/")
  }
}

function validateReferences(record, lessonOrders) {
  const { data } = record

  if (data.type === "lesson") {
    const course = recordsById.get(data.courseId)
    if (!course || course.data.type !== "course" || course.data.publish !== true) {
      fail(record, "courseId must reference a published course")
    }
    if (!Number.isInteger(data.lessonOrder) || data.lessonOrder <= 0) {
      fail(record, "lessonOrder must be a positive integer")
    } else if (typeof data.courseId === "string") {
      const key = `${data.courseId}:${data.lessonOrder}`
      if (lessonOrders.has(key)) {
        fail(record, `lessonOrder duplicates ${lessonOrders.get(key).relativePath}`)
      } else {
        lessonOrders.set(key, record)
      }
    }
    if (
      data.estimatedMinutes !== undefined &&
      (!Number.isInteger(data.estimatedMinutes) || data.estimatedMinutes <= 0)
    ) {
      fail(record, "estimatedMinutes must be a positive integer")
    }
  }

  if (data.type === "learning-note") {
    if (!new Set(["question", "reminder", "study-note", "correction"]).has(data.annotationKind)) {
      fail(record, "annotationKind is missing or unsupported")
    }
    if (data.relatedContentIds !== undefined) {
      if (
        !Array.isArray(data.relatedContentIds) ||
        new Set(data.relatedContentIds).size !== data.relatedContentIds.length
      ) {
        fail(record, "relatedContentIds must be a unique array")
      } else {
        for (const targetId of data.relatedContentIds) {
          if (!recordsById.has(targetId))
            fail(record, `relatedContentIds target does not exist: ${targetId}`)
        }
      }
    }
  }

  if (data.type === "question-bank") {
    const course = recordsById.get(data.courseId)
    if (!course || course.data.type !== "course" || course.data.publish !== true) {
      fail(record, "courseId must reference a published course")
    } else {
      const courseDirectory = path.posix.dirname(course.relativePath)
      if (!record.relativePath.startsWith(`${courseDirectory}/question-banks/`)) {
        fail(record, `must live below ${courseDirectory}/question-banks/`)
      }
    }
  }
}

function resolveContentTarget(record, target) {
  const withoutAnchor = target.split("#", 1)[0]
  if (withoutAnchor === "") return true
  const baseDirectory = path.posix.dirname(record.relativePath)
  const normalized = path.posix
    .normalize(path.posix.join(baseDirectory, withoutAnchor.replace(/^\//, "")))
    .replace(/\/$/, "")
  const candidates = normalized.endsWith(".md")
    ? [normalized]
    : [`${normalized}.md`, `${normalized}/index.md`]
  return candidates.some((candidate) => recordsByPath.has(candidate))
}

// Inside a Markdown table, Obsidian writes the alias separator as `\|`, which
// leaves a trailing backslash on the captured target.
function wikiTarget(match) {
  return match[1].trim().replace(/\\$/, "").trim()
}

function validateLinks(record) {
  const embeds = record.body.matchAll(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)
  for (const match of embeds) validateEmbed(record, wikiTarget(match))

  const wikiLinks = record.body.matchAll(/(?<!!)\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)
  for (const match of wikiLinks) {
    const target = wikiTarget(match)
    const absoluteTarget = target.startsWith("/") ? target.slice(1) : target
    const candidates = absoluteTarget.endsWith(".md")
      ? [absoluteTarget]
      : [`${absoluteTarget}.md`, `${absoluteTarget}/index.md`]
    if (!candidates.some((candidate) => recordsByPath.has(candidate))) {
      fail(record, `unresolved wiki link "${target}"`)
    }
  }

  const markdownLinks = record.body.matchAll(/(?<!\!)\[[^\]]+\]\(([^)]+)\)/g)
  for (const match of markdownLinks) {
    const target = match[1].trim()
    if (/^(?:https?:|mailto:|#)/.test(target)) continue
    if (!resolveContentTarget(record, target)) fail(record, `unresolved Markdown link "${target}"`)
  }

  const imageLinks = record.body.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)
  for (const match of imageLinks) {
    const target = match[1].trim()
    if (/^(?:https?:|data:)/.test(target)) continue
    const withoutAnchor = target.split("#", 1)[0].split("?", 1)[0]
    if (withoutAnchor === "") continue
    const resolved = resolveAssetPath(record, withoutAnchor)
    if (resolved === null) {
      fail(record, `image asset "${target}" escapes the content root`)
    } else if (!assetPaths.has(resolved)) {
      fail(record, `unresolved image asset "${target}"`)
    }
  }
}

// Resolves a note-relative or root-absolute ("/…") asset path to a
// content-relative path, or null when it escapes the content root.
function resolveAssetPath(record, target) {
  const joined = target.startsWith("/")
    ? target.slice(1)
    : path.posix.join(path.posix.dirname(record.relativePath), target)
  const normalized = path.posix.normalize(joined)
  if (normalized === ".." || normalized.startsWith("../") || path.posix.isAbsolute(normalized)) {
    return null
  }
  return normalized
}

// `![[target]]` embeds either transclude a note or show an asset. Obsidian
// resolves an asset by bare file name anywhere in the vault, or by a path
// relative to the note or to the content root.
function validateEmbed(record, target) {
  const withoutAnchor = target.split("#", 1)[0]
  const extension = path.posix.extname(withoutAnchor)
  if (extension === "" || extension === ".md") {
    const absoluteTarget = withoutAnchor.startsWith("/") ? withoutAnchor.slice(1) : withoutAnchor
    const candidates = absoluteTarget.endsWith(".md")
      ? [absoluteTarget]
      : [`${absoluteTarget}.md`, `${absoluteTarget}/index.md`]
    if (!candidates.some((candidate) => recordsByPath.has(candidate))) {
      fail(record, `unresolved embed "${target}"`)
    }
    return
  }
  if (!withoutAnchor.includes("/")) {
    if (!assetsByName.has(withoutAnchor)) fail(record, `unresolved embed "${target}"`)
    return
  }
  const noteRelative = resolveAssetPath(record, withoutAnchor)
  const rootRelative = resolveAssetPath({ relativePath: "index.md" }, withoutAnchor)
  if (noteRelative === null || rootRelative === null) {
    fail(record, `embed "${target}" escapes the content root`)
  } else if (!assetPaths.has(noteRelative) && !assetPaths.has(rootRelative)) {
    fail(record, `unresolved embed "${target}"`)
  }
}

if (!fs.existsSync(contentRoot)) {
  console.error(`Content root does not exist: ${contentRoot}`)
  process.exit(1)
}

collectMarkdown(contentRoot)
for (const record of records) recordsByPath.set(record.relativePath, record)
for (const record of records) validateCommon(record)
for (const record of records) validatePlacement(record)

const lessonOrders = new Map()
for (const record of records) validateReferences(record, lessonOrders)
for (const record of records) validateLinks(record)

if (failures.length > 0) {
  console.error(`Content validation failed with ${failures.length} error(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Content validation passed: ${records.length} entities, ${recordsById.size} unique IDs`)

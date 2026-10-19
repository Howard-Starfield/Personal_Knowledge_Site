import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"

// Stylesheets may only reference /static/ files that Git tracks. An ignored
// local file (such as a proprietary font) would 404 on the public site.
const styleRoots = ["quartz/styles", "quartz/components", "plugins"]

function collectStylesheets(directory, found = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules") continue
    const absolute = path.join(directory, entry.name)
    if (entry.isDirectory()) collectStylesheets(absolute, found)
    else if (/\.(?:s?css)$/.test(entry.name)) found.push(absolute)
  }
  return found
}

test("stylesheet /static/ references point at tracked files", () => {
  const tracked = new Set(
    execFileSync("git", ["ls-files", "-z", "quartz/static"], { encoding: "utf8" })
      .split("\0")
      .filter(Boolean),
  )
  const missing = []
  for (const root of styleRoots) {
    for (const stylesheet of collectStylesheets(root)) {
      const source = fs.readFileSync(stylesheet, "utf8")
      for (const match of source.matchAll(/url\(\s*["']?\/static\/([^"')?#]+)/g)) {
        const target = `quartz/static/${match[1]}`
        if (!tracked.has(target))
          missing.push(`${stylesheet.replaceAll(path.sep, "/")} -> ${target}`)
      }
    }
  }
  assert.deepEqual(missing, [])
})

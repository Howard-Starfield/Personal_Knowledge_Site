import assert from "node:assert/strict"
import test from "node:test"
import type { StaticResources } from "@quartz-community/types"
import { rewriteMermaidUrl, rewriteResources } from "../index.ts"

const CDN_MERMAID = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs"
const LOCAL_MERMAID = "/static/mermaid/mermaid.esm.min.js"

const clientScript = `async function draw(){const m = await import("${CDN_MERMAID}");m.default.initialize({})};draw()`

function resources(): StaticResources {
  return {
    css: [{ content: ".mermaid{color:var(--dark)}", inline: true }],
    js: [
      {
        script: clientScript,
        loadTime: "afterDOMReady",
        contentType: "inline",
        moduleType: "module",
      },
    ],
    additionalHead: [],
  }
}

test("the Mermaid import points at the vendored copy", () => {
  const rewritten = rewriteMermaidUrl(clientScript)
  assert.equal(rewritten.includes(CDN_MERMAID), false)
  assert.equal(rewritten.includes(LOCAL_MERMAID), true)
  assert.equal(rewritten.includes(`import("${LOCAL_MERMAID}")`), true)
})

test("a script without a Mermaid import is left alone", () => {
  const other = 'console.log("hello")'
  assert.equal(rewriteMermaidUrl(other), other)
})

test("the wrapper keeps every other resource", () => {
  const original = resources()
  const rewritten = rewriteResources(original)

  assert.equal(rewritten.css?.length, 1)
  assert.equal(rewritten.css?.[0]?.content, original.css[0]?.content)
  assert.equal(rewritten.js?.length, 1)

  const script = rewritten.js?.[0]
  assert.equal(
    typeof script === "object" && script && "script" in script ? script.script : null,
    `async function draw(){const m = await import("${LOCAL_MERMAID}");m.default.initialize({})};draw()`,
  )
  assert.equal(
    typeof script === "object" && script && "loadTime" in script ? script.loadTime : null,
    "afterDOMReady",
  )
})

test("no resource keeps a CDN reference", () => {
  const rewritten = rewriteResources(resources())
  const scripts = (rewritten.js ?? [])
    .map((resource) => ("script" in resource ? resource.script : ""))
    .join("\n")
  assert.equal(scripts.includes("cdnjs.cloudflare.com"), false)
  assert.equal(scripts.includes("cdn.jsdelivr.net"), false)
  assert.equal(scripts.includes("unpkg.com"), false)
})

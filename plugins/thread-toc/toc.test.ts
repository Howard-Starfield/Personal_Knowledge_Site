import assert from "node:assert/strict"
import test from "node:test"
import { extractToc } from "./toc.ts"

const text = (value: string) => ({ type: "text", value })
const heading = (tagName: string, id: string | undefined, ...children: unknown[]) => ({
  type: "element",
  tagName,
  properties: id === undefined ? {} : { id },
  children,
})

test("extractToc reads slugged headings from the rendered tree", () => {
  const tree = {
    type: "root",
    children: [
      heading("h2", "first-step", text("First "), {
        type: "element",
        tagName: "code",
        children: [text("step")],
      }),
      { type: "element", tagName: "p", children: [text("Body")] },
      { type: "element", tagName: "section", children: [heading("h3", "detail", text("Detail"))] },
      heading("h2", "second-step", text("Second step")),
    ],
  }

  assert.deepEqual(extractToc(tree), [
    { depth: 0, slug: "first-step", text: "First step" },
    { depth: 1, slug: "detail", text: "Detail" },
    { depth: 0, slug: "second-step", text: "Second step" },
  ])
})

test("extractToc skips headings without an id, without text, or deeper than maxDepth", () => {
  const tree = {
    type: "root",
    children: [
      heading("h2", undefined, text("No anchor")),
      heading("h2", "empty"),
      heading("h4", "too-deep", text("Too deep")),
      heading("h3", "kept", text("Kept")),
    ],
  }

  assert.deepEqual(extractToc(tree), [{ depth: 0, slug: "kept", text: "Kept" }])
})

test("extractToc returns no entries for malformed or empty input", () => {
  assert.deepEqual(extractToc(undefined), [])
  assert.deepEqual(extractToc("not a tree"), [])
  assert.deepEqual(extractToc({ type: "root", children: "nope" }), [])
})

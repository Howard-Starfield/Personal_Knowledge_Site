import assert from "node:assert/strict"
import test from "node:test"
import { computeProgress } from "./scroll-progress.ts"
import { ScrollProgress } from "./components/index.ts"

test("computeProgress returns 0 when at top of document", () => {
  const result = computeProgress(0, 800, 2000, null)
  assert.equal(result, 0)
})

test("computeProgress returns 0 for negative scroll position", () => {
  const result = computeProgress(-50, 800, 2000, null)
  assert.equal(result, 0)
})

test("computeProgress calculates document fallback progress correctly", () => {
  // docHeight = 2000, viewport = 800 -> scrollable = 1200
  // scrollTop = 600 -> 600 / 1200 = 0.5
  const result = computeProgress(600, 800, 2000, null)
  assert.equal(result, 0.5)
})

test("computeProgress caps at 1 when scrolled to bottom of document", () => {
  const result = computeProgress(1500, 800, 2000, null)
  assert.equal(result, 1)
})

test("computeProgress handles document shorter than viewport", () => {
  const result = computeProgress(0, 1000, 500, null)
  assert.equal(result, 0)
})

test("computeProgress calculates progress relative to article element", () => {
  // Article starts at top=200, bottom=1800, height=1600.
  // viewportHeight = 800.
  // targetEnd = articleBottom - viewportHeight = 1800 - 800 = 1000.
  // When scrollTop = 500: progress = 500 / 1000 = 0.5.
  const articleRect = { top: 200 - 500, bottom: 1800 - 500 }
  const result = computeProgress(500, 800, 2500, articleRect)
  assert.equal(result, 0.5)
})

test("computeProgress caps at 1 when past the end of the article", () => {
  const articleRect = { top: -1000, bottom: 0 }
  const result = computeProgress(1200, 800, 2500, articleRect)
  assert.equal(result, 1)
})

test("ScrollProgress component exports valid QuartzComponentConstructor with styles and scripts", () => {
  assert.equal(typeof ScrollProgress, "function")
  const Component = ScrollProgress()
  assert.equal(typeof Component, "function")
  assert.ok(typeof Component.css === "string" && Component.css.length > 0)
  assert.ok(typeof Component.afterDOMLoaded === "string" && Component.afterDOMLoaded.length > 0)

  // Test rendering
  const vnode = Component({
    ctx: {},
    externalResources: { css: [], js: [], additionalHead: [] },
    fileData: {},
    cfg: {},
    children: [],
    tree: { type: "root", children: [] },
    allFiles: [],
    displayClass: undefined,
  })
  assert.ok(vnode && typeof vnode === "object" && "type" in vnode && "props" in vnode)
  const element = vnode as { type: string; props: Record<string, unknown> }
  assert.equal(element.type, "div")
  assert.equal(element.props["data-scroll-progress"], "true")
  assert.equal(element.props.role, "progressbar")
  assert.equal(element.props["aria-valuenow"], "0")
})

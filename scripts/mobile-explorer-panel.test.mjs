import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

import esbuild from "esbuild"
import { sassPlugin } from "esbuild-sass-plugin"

const here = path.dirname(fileURLToPath(import.meta.url))
const stylesheet = path.join(here, "..", "quartz", "styles", "custom.scss")

// The mobile Explorer drawer is an override of @quartz-community/explorer,
// whose own stylesheet puts `overflow: hidden` on `.explorer` while the
// drawer inside it is `position: absolute`. The drawer is therefore cropped
// to the 34px toggle button and the left menu never appears. This guard
// compiles the real stylesheet and asserts the drawer contract, so the
// override cannot silently regress.
// Plan: docs/exec-plans/active/mobile-explorer-left-panel.md

const MOBILE = "max-width: 800px"
const REDUCED = "prefers-reduced-motion"

async function compileStylesheet() {
  const result = await esbuild.build({
    entryPoints: [stylesheet],
    bundle: true,
    write: false,
    format: "iife",
    loader: { ".scss": "css" },
    plugins: [sassPlugin({ type: "css-text", cssImports: true })],
  })
  const file = result.outputFiles[0]
  assert.ok(file, "the stylesheet produced no output")
  // Collapse whitespace so selectors can be matched without caring about the
  // formatter's line breaks.
  return file.text.replace(/\s+/g, " ").trim()
}

/** Every `@media <query> { ... }` block in the stylesheet. */
function mediaBlocks(css) {
  const blocks = []
  const open = /@media\s+([^{]+)\{/g
  let match
  while ((match = open.exec(css)) !== null) {
    let depth = 0
    for (let i = match.index; i < css.length; i++) {
      if (css[i] === "{") depth++
      else if (css[i] === "}") {
        depth--
        if (depth === 0) {
          blocks.push({ query: match[1].trim(), text: css.slice(match.index, i + 1) })
          open.lastIndex = i
          break
        }
      }
    }
  }
  return blocks
}

function mediaBlock(css, { include = [], exclude = [] } = {}) {
  const block = mediaBlocks(css).find(
    (candidate) =>
      include.every((part) => candidate.query.includes(part)) &&
      exclude.every((part) => !candidate.query.includes(part)),
  )
  assert.ok(block, `the stylesheet has no @media block matching ${include.join(" and ")}`)
  return block.text
}

/** The stylesheet with every mobile-only `@media` block removed. */
function withoutMobileBlocks(css) {
  const blocks = mediaBlocks(css).filter(
    (candidate) => candidate.query.includes("max-width: 800px") && !candidate.query.includes("not"),
  )
  assert.ok(blocks.length > 0, "the stylesheet has no mobile media block")
  return blocks.reduce((rest, block) => rest.replace(block.text, ""), css)
}

function rule(css, selector) {
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`))
  assert.ok(match, `the stylesheet has no rule for \`${selector}\``)
  return match[1]
}

function declarations(body) {
  return Object.fromEntries(
    body
      .split(";")
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk) => {
        const colon = chunk.indexOf(":")
        return [chunk.slice(0, colon).trim(), chunk.slice(colon + 1).trim()]
      }),
  )
}

test("the mobile Explorer drawer is anchored to the viewport", async () => {
  const css = await compileStylesheet()
  const mobile = mediaBlock(css, { include: [MOBILE], exclude: ["not"] })

  const drawer = declarations(
    rule(mobile, "\\.page\\s*>\\s*#quartz-body \\.explorer \\.explorer-content"),
  )
  assert.equal(drawer.position, "fixed", "the drawer must be viewport-anchored")
  assert.equal(drawer.left, "0")
  assert.equal(drawer.top, "0")
  assert.ok(drawer.width, "the drawer must have a bounded width")
  assert.ok(
    drawer.width.includes("min("),
    "the drawer width must be bounded, not the full viewport",
  )
  assert.ok(drawer["max-height"], "the drawer must be bounded in height")
  assert.ok(drawer["z-index"], "the drawer must sit above the page")
})

test("the drawer is not cropped by the Explorer box on mobile", async () => {
  const css = await compileStylesheet()
  const mobile = mediaBlock(css, { include: [MOBILE], exclude: ["not"] })

  const explorer = declarations(rule(mobile, "\\.explorer"))
  assert.equal(explorer.overflow, "visible", ".explorer must not clip the drawer it contains")
})

test("the drawer is parked off-screen while collapsed and shown while open", async () => {
  const css = await compileStylesheet()
  const mobile = mediaBlock(css, { include: [MOBILE], exclude: ["not"] })

  const collapsed = declarations(
    rule(
      mobile,
      "\\.page\\s*>\\s*#quartz-body \\.explorer\\.collapsed\\s*>\\s*\\.explorer-content",
    ),
  )
  assert.equal(collapsed.visibility, "hidden")
  assert.equal(collapsed.transform, "translateX(-100%)")

  const open = declarations(
    rule(
      mobile,
      "\\.page\\s*>\\s*#quartz-body \\.explorer:not\\(\\.collapsed\\)\\s*>\\s*\\.explorer-content",
    ),
  )
  assert.equal(open.visibility, "visible")
  assert.equal(open.transform, "translateX(0)")
})

test("the toggle dismisses the drawer and the page behind it is locked", async () => {
  const css = await compileStylesheet()
  const mobile = mediaBlock(css, { include: [MOBILE], exclude: ["not"] })

  const scrim = declarations(
    rule(mobile, "\\.explorer:not\\(\\.collapsed\\) button\\.mobile-explorer::after"),
  )
  assert.equal(scrim.position, "fixed", "the scrim must cover the viewport")
  assert.ok(scrim["background-color"], "the scrim must dim the page behind")

  const toggle = declarations(rule(mobile, "\\.explorer button\\.mobile-explorer"))
  assert.equal(
    toggle["z-index"],
    "auto",
    "the toggle must not create a stacking context that traps the icon",
  )

  const lock = declarations(rule(mobile, "html\\.mobile-no-scroll"))
  assert.equal(lock.overflow, "hidden", "the page behind the drawer must not scroll")
})

test("the drawer honours reduced motion", async () => {
  const css = await compileStylesheet()
  const reduced = mediaBlock(css, { include: [MOBILE, REDUCED], exclude: ["not"] })

  const drawer = declarations(
    rule(reduced, "\\.page\\s*>\\s*#quartz-body \\.explorer \\.explorer-content"),
  )
  assert.equal(drawer.transition, "none")
})

test("the desktop Explorer is not affected by the mobile override", async () => {
  const css = await compileStylesheet()
  const outsideMobile = withoutMobileBlocks(css)

  assert.ok(
    !/\.explorer:not\(\.collapsed\)\s*>\s*\.explorer-content\s*\{/.test(outsideMobile),
    "the drawer states must stay inside the mobile media query",
  )
  assert.ok(
    !/\.explorer-content\s*\{[^}]*position:\s*fixed/.test(outsideMobile),
    "the drawer must not be viewport-anchored above 800px",
  )
  assert.ok(
    !outsideMobile.includes("mobile-no-scroll"),
    "the scroll lock must stay inside the mobile media query",
  )
  assert.ok(
    !/\.explorer\s*\{[^}]*overflow:\s*visible/.test(outsideMobile),
    "the clip removal must stay inside the mobile media query",
  )
})

test("the override documents the package behaviour it replaces", () => {
  const source = fs.readFileSync(stylesheet, "utf8")
  assert.ok(
    source.includes("@quartz-community/explorer"),
    "the override must name the pinned package it overrides",
  )
  assert.ok(
    source.includes("docs/exec-plans/active/mobile-explorer-left-panel.md"),
    "the override must point at its execution plan",
  )
})

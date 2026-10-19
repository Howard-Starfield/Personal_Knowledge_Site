import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { buildSync } from "esbuild"
import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { extractToc } from "../toc.ts"

const styles = fs.readFileSync(new URL("../thread-toc.css", import.meta.url), "utf8")
const clientBuild = buildSync({
  entryPoints: [fileURLToPath(new URL("../thread-toc.ts", import.meta.url))],
  bundle: true,
  format: "iife",
  minify: true,
  platform: "browser",
  target: "es2022",
  write: false,
})
const clientOutput = clientBuild.outputFiles.at(0)
if (!clientOutput) throw new Error("Thread TOC client bundle produced no output")
const clientScript = clientOutput.text

const ThreadTocComponent: QuartzComponent = (props?: QuartzComponentProps) => {
  // The community table-of-contents plugin (the only producer of fileData.toc)
  // is disabled, so read the headings from the rendered tree instead.
  const toc = extractToc(props?.tree)

  // Only render if article has at least 2 headings
  if (toc.length < 2) {
    return null
  }

  return h(
    "div",
    { class: "chat-navigation-rail-container" },
    h(
      "nav",
      {
        class: "chat-navigation-rail",
        "aria-label": "Table of contents",
      },
      h(
        "div",
        { class: "chat-navigation-rail__list" },
        toc.map((entry, index) => {
          const slug = String(entry.slug)
          const text = String(entry.text)
          const depth = Number(entry.depth)
          const meta = depth > 0 ? `§ ${index + 1}` : `Section ${index + 1}`

          return h(
            "a",
            {
              key: slug,
              class: "chat-navigation-rail__tick",
              href: `#${slug}`,
              "data-slug": slug,
              "data-title": text,
              "data-meta": meta,
              "aria-label": text,
            },
            h(
              "span",
              { class: "chat-navigation-rail__marker" },
              h("span", { class: "chat-navigation-rail__line" }),
            ),
          )
        }),
      ),
      h(
        "div",
        { class: "chat-navigation-rail__card", "aria-hidden": "true" },
        h("div", { class: "chat-navigation-rail__card-title" }),
        h("div", { class: "chat-navigation-rail__card-meta" }),
      ),
    ),
  )
}

ThreadTocComponent.css = styles
ThreadTocComponent.afterDOMLoaded = clientScript

export const ThreadToc: QuartzComponentConstructor = () => ThreadTocComponent

export default ThreadToc

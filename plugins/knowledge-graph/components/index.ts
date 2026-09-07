import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { buildSync } from "esbuild"
import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

const styles = fs.readFileSync(new URL("../pixi-graph.css", import.meta.url), "utf8")
const clientBuild = buildSync({
  entryPoints: [fileURLToPath(new URL("../pixi-graph.ts", import.meta.url))],
  bundle: true,
  format: "iife",
  minify: true,
  platform: "browser",
  target: "es2022",
  write: false,
})
const clientOutput = clientBuild.outputFiles.at(0)
if (!clientOutput) throw new Error("Pixi graph client bundle produced no output")
const clientScript = clientOutput.text

const graphIconPath =
  "M49,0c-3.309,0-6,2.691-6,6c0,1.035,0.263,2.009,0.726,2.86l-9.829,9.829C32.542,17.634,30.846,17,29,17s-3.542,0.634-4.898,1.688l-7.669-7.669C16.785,10.424,17,9.74,17,9c0-2.206-1.794-4-4-4S9,6.794,9,9s1.794,4,4,4c0.74,0,1.424-0.215,2.019-0.567l7.669,7.669C21.634,21.458,21,23.154,21,25s0.634,3.542,1.688,4.897L10.024,42.562C8.958,41.595,7.549,41,6,41c-3.309,0-6,2.691-6,6s2.691,6,6,6s6-2.691,6-6c0-1.035-0.263-2.009-0.726-2.86l12.829-12.829c1.106,0.86,2.44,1.436,3.898,1.619v10.16c-2.833,0.478-5,2.942-5,5.91c0,3.309,2.691,6,6,6s6-2.691,6-6c0-2.967-2.167-5.431-5-5.91v-10.16c1.458-0.183,2.792-0.759,3.898-1.619l7.669,7.669C41.215,39.576,41,40.26,41,41c0,2.206,1.794,4,4,4s4-1.794,4-4s-1.794-4-4-4c-0.74,0-1.424,0.215-2.019,0.567l-7.669-7.669C36.366,28.542,37,26.846,37,25s-0.634-3.542-1.688-4.897l9.665-9.665C46.042,11.405,47.451,12,49,12c3.309,0,6-2.691,6-6S52.309,0,49,0zM11,9c0-1.103,0.897-2,2-2s2,0.897,2,2s-0.897,2-2,2S11,10.103,11,9zM6,51c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S8.206,51,6,51zM33,49c0,2.206-1.794,4-4,4s-4-1.794-4-4s1.794-4,4-4S33,46.794,33,49zM29,31c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S32.309,31,29,31zM47,41c0,1.103-0.897,2-2,2s-2-0.897-2-2s0.897-2,2-2S47,39.897,47,41zM49,10c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S51.206,10,49,10z"

export const KnowledgeGraph = (() => {
  const Component: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const currentSlug = typeof fileData.slug === "string" ? fileData.slug : ""
    const className = [displayClass, "force-graph"].filter(Boolean).join(" ")

    return h(
      "section",
      {
        class: className,
        "data-current-slug": currentSlug,
        "aria-labelledby": "force-graph-title",
      },
      h("h3", { id: "force-graph-title" }, "Graph View"),
      h(
        "div",
        { class: "force-graph__local-outer" },
        h("div", {
          class: "force-graph__canvas force-graph__canvas--local",
          "data-graph-canvas": "local",
          role: "img",
          "aria-label": "Local graph of this note and its direct connections",
        }),
        h(
          "button",
          {
            class: "force-graph__open",
            type: "button",
            "data-graph-open": true,
            "aria-label": "Global Graph",
          },
          h(
            "svg",
            {
              version: "1.1",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 55 55",
              fill: "currentColor",
              "aria-hidden": "true",
            },
            h("path", { d: graphIconPath }),
          ),
        ),
      ),
      h(
        "div",
        { class: "force-graph__a11y" },
        h("p", { "data-graph-status": true, "aria-live": "polite" }, "Loading graph…"),
        h("p", null, h("span", { "data-graph-count": true }, "—"), " connections"),
        h("ul", { "data-graph-list": true }),
      ),
      h(
        "dialog",
        {
          class: "force-graph__dialog",
          "data-graph-dialog": true,
          "aria-labelledby": "force-vault-title",
          "aria-describedby": "force-vault-instructions",
          tabIndex: -1,
        },
        h(
          "div",
          { class: "force-graph__dialog-shell" },
          h("h2", { class: "force-graph__a11y", id: "force-vault-title" }, "Global graph"),
          h(
            "p",
            { class: "force-graph__a11y", id: "force-vault-instructions" },
            "Drag nodes to explore. Scroll to zoom. Drag empty space to pan. Press Escape or select outside the graph to close.",
          ),
          h("p", {
            class: "force-graph__a11y",
            "data-global-status": true,
            "aria-live": "polite",
          }),
          h("ul", { class: "force-graph__a11y", "data-global-list": true }),
          h("div", {
            class: "force-graph__canvas force-graph__canvas--global",
            "data-graph-canvas": "global",
            role: "img",
            "aria-label": "Global graph of all published notes and tags",
          }),
        ),
      ),
    )
  }

  Component.css = styles
  Component.afterDOMLoaded = clientScript
  return Component
}) satisfies QuartzComponentConstructor

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { buildSync } from "esbuild"
import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

const styles = fs.readFileSync(new URL("../scroll-progress.css", import.meta.url), "utf8")
const clientBuild = buildSync({
  entryPoints: [fileURLToPath(new URL("../scroll-progress.ts", import.meta.url))],
  bundle: true,
  format: "iife",
  minify: true,
  platform: "browser",
  target: "es2022",
  write: false,
})
const clientOutput = clientBuild.outputFiles.at(0)
if (!clientOutput) throw new Error("Scroll progress client bundle produced no output")
const clientScript = clientOutput.text

const ScrollProgressComponent: QuartzComponent = (props?: QuartzComponentProps) => {
  const displayClass = props?.displayClass
  const className = ["scroll-progress", displayClass].filter(Boolean).join(" ")
  return h(
    "div",
    {
      class: className,
      "data-scroll-progress": "true",
      role: "progressbar",
      "aria-label": "Reading progress",
      "aria-valuenow": "0",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
    },
    h("div", {
      class: "scroll-progress__bar",
    }),
  )
}

ScrollProgressComponent.css = styles
ScrollProgressComponent.afterDOMLoaded = clientScript

export const ScrollProgress: QuartzComponentConstructor = () => ScrollProgressComponent

export default ScrollProgress

import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { buildSync } from "esbuild"
import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

const styles = fs.readFileSync(new URL("../font-toggle.css", import.meta.url), "utf8")
const clientBuild = buildSync({
  entryPoints: [fileURLToPath(new URL("../font-toggle.ts", import.meta.url))],
  bundle: true,
  format: "iife",
  minify: true,
  platform: "browser",
  target: "es2022",
  write: false,
})
const clientOutput = clientBuild.outputFiles.at(0)
if (!clientOutput) throw new Error("Font toggle client bundle produced no output")
const clientScript = clientOutput.text

const preScript =
  "var f=localStorage.getItem('user-font-preference')??'bookerly';document.documentElement.setAttribute('data-font',f);"

const FontToggleComponent: QuartzComponent = (props?: QuartzComponentProps) => {
  const displayClass = props?.displayClass
  const className = ["font-toggle", displayClass].filter(Boolean).join(" ")
  return h(
    "button",
    {
      class: className,
      type: "button",
      "aria-label": "Toggle font: Bookerly / Inter",
      title: "Toggle font: Bookerly / Inter",
    },
    h("span", { class: "font-toggle__label" }, "Aa"),
  )
}

FontToggleComponent.css = styles
FontToggleComponent.beforeDOMLoaded = preScript
FontToggleComponent.afterDOMLoaded = clientScript

export const FontToggle: QuartzComponentConstructor = () => FontToggleComponent
export default FontToggle

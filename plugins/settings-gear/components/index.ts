import fs from "node:fs"
import { fileURLToPath } from "node:url"
import { buildSync } from "esbuild"
import { h } from "preact"
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"

const styles = fs.readFileSync(new URL("../settings-gear.css", import.meta.url), "utf8")
const clientBuild = buildSync({
  entryPoints: [fileURLToPath(new URL("../settings-gear.ts", import.meta.url))],
  bundle: true,
  format: "iife",
  minify: true,
  platform: "browser",
  target: "es2022",
  write: false,
})
const clientOutput = clientBuild.outputFiles.at(0)
if (!clientOutput) throw new Error("Settings gear client bundle produced no output")
const clientScript = clientOutput.text

const preScript = `
(function() {
  try {
    var theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.setAttribute("saved-theme", theme);
    }
    var font = localStorage.getItem("user-font-preference") || "bookerly";
    document.documentElement.setAttribute("data-font", font);
  } catch(e) {}
})();
`

const SettingsGearComponent: QuartzComponent = (props?: QuartzComponentProps) => {
  const displayClass = props?.displayClass
  const className = ["settings-gear", displayClass].filter(Boolean).join(" ")

  return h(
    "div",
    { class: className },
    h(
      "button",
      {
        class: "settings-gear__btn",
        type: "button",
        "aria-label": "Site Settings",
        "aria-haspopup": "true",
        "aria-expanded": "false",
        title: "Settings (Theme & Font)",
      },
      h(
        "svg",
        {
          class: "settings-gear__icon",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
        },
        h("path", {
          d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
        }),
        h("circle", { cx: "12", cy: "12", r: "3" }),
      ),
    ),
    h(
      "div",
      {
        class: "settings-gear__popover",
        role: "dialog",
        "aria-label": "Site Settings Menu",
      },
      // Theme Section
      h(
        "div",
        { class: "settings-gear__section" },
        h("span", { class: "settings-gear__label" }, "Appearance"),
        h(
          "div",
          { class: "settings-gear__group", role: "group", "aria-label": "Theme selection" },
          h(
            "button",
            {
              class: "settings-gear__option",
              type: "button",
              "data-theme-val": "light",
              "aria-label": "Switch to Day mode",
            },
            h(
              "svg",
              { viewBox: "0 0 24 24", "aria-hidden": "true" },
              h("circle", { cx: "12", cy: "12", r: "4" }),
              h("path", {
                d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41",
              }),
            ),
            "Day",
          ),
          h(
            "button",
            {
              class: "settings-gear__option",
              type: "button",
              "data-theme-val": "dark",
              "aria-label": "Switch to Night mode",
            },
            h(
              "svg",
              { viewBox: "0 0 24 24", "aria-hidden": "true" },
              h("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" }),
            ),
            "Night",
          ),
        ),
      ),
      // Font Section
      h(
        "div",
        { class: "settings-gear__section" },
        h("span", { class: "settings-gear__label" }, "Reading Typography"),
        h(
          "div",
          { class: "settings-gear__group", role: "group", "aria-label": "Font selection" },
          h(
            "button",
            {
              class: "settings-gear__option",
              type: "button",
              "data-font-val": "bookerly",
              "aria-label": "Bookerly Serif Font",
            },
            "Bookerly",
          ),
          h(
            "button",
            {
              class: "settings-gear__option",
              type: "button",
              "data-font-val": "inter",
              "aria-label": "Inter Sans-serif Font",
            },
            "Inter",
          ),
        ),
      ),
    ),
  )
}

SettingsGearComponent.css = styles
SettingsGearComponent.beforeDOMLoaded = preScript
SettingsGearComponent.afterDOMLoaded = clientScript

export const SettingsGear: QuartzComponentConstructor = () => SettingsGearComponent
export default SettingsGear

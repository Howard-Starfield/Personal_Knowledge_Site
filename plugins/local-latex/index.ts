import { Latex } from "@quartz-community/latex"
import type { QuartzTransformerPluginInstance } from "@quartz-community/types"

/**
 * The upstream latex plugin links its KaTeX stylesheet from
 * https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css, so every
 * page view depends on a third-party host being reachable.
 *
 * This wrapper reuses the upstream transform unchanged and only swaps that
 * stylesheet for the copy vendored in the repository at
 * `quartz/static/katex/`, so the site has no remote runtime dependency.
 * ADR-0006 records the decision.
 */
const LOCAL_KATEX_CSS = "/static/katex/katex.min.css"
const LOCAL_COPY_TEX = "/static/katex/copy-tex.min.js"

function LocalLatex(): QuartzTransformerPluginInstance {
  const plugin = Latex()
  return {
    ...plugin,
    name: "Latex",
    externalResources: (ctx) => {
      const resources = plugin.externalResources?.(ctx)
      if (!resources) return resources
      return {
        ...resources,
        css: (resources.css ?? []).map((resource) => {
          const content = resource?.content
          if (typeof content === "string" && content.includes("katex")) {
            return { ...resource, content: LOCAL_KATEX_CSS }
          }
          return resource
        }),
        js: (resources.js ?? []).map((resource) => {
          if (
            "src" in resource &&
            typeof resource.src === "string" &&
            resource.src.includes("copy-tex")
          ) {
            return { ...resource, src: LOCAL_COPY_TEX }
          }
          return resource
        }),
      }
    },
  }
}

export default LocalLatex

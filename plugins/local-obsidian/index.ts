import { ObsidianFlavoredMarkdown } from "@quartz-community/obsidian-flavored-markdown"
import type { ObsidianFlavoredMarkdownOptions } from "@quartz-community/obsidian-flavored-markdown"
import type { QuartzTransformerPluginInstance, StaticResources } from "@quartz-community/types"

/**
 * The upstream Obsidian plugin renders a Mermaid diagram by importing the runtime
 * from https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs,
 * so every reader of a page with a diagram depends on a third-party host serving
 * the site's code.
 *
 * This wrapper reuses the upstream transform unchanged and only swaps that import
 * for the copy vendored in the repository at `quartz/static/mermaid/`, so the site
 * has no remote runtime dependency. ADR-0006 records the decision.
 *
 * The vendored copy keeps the upstream directory layout, because the entry module
 * imports its chunks with paths relative to itself.
 */
const CDN_MERMAID = "https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs"
const LOCAL_MERMAID = "/static/mermaid/mermaid.esm.min.js"

/** Rewrite the Mermaid import inside the plugin's inline client script. */
export function rewriteMermaidUrl(script: string): string {
  return script.replace(CDN_MERMAID, LOCAL_MERMAID)
}

/** Point every Mermaid import in the plugin's resources at the vendored copy. */
export function rewriteResources(resources: Partial<StaticResources>): Partial<StaticResources> {
  return {
    ...resources,
    js: (resources.js ?? []).map((resource) => {
      if (
        "script" in resource &&
        typeof resource.script === "string" &&
        resource.script.includes(CDN_MERMAID)
      ) {
        return { ...resource, script: rewriteMermaidUrl(resource.script) }
      }
      return resource
    }),
  }
}

function LocalObsidian(
  options?: Partial<ObsidianFlavoredMarkdownOptions>,
): QuartzTransformerPluginInstance {
  const plugin = ObsidianFlavoredMarkdown(options)
  return {
    ...plugin,
    name: "ObsidianFlavoredMarkdown",
    externalResources: (ctx) => {
      const resources = plugin.externalResources?.(ctx)
      if (!resources) return resources
      return rewriteResources(resources)
    },
  }
}

export default LocalObsidian

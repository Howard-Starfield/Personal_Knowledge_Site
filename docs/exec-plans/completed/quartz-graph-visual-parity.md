# Execution plan: Quartz graph visual parity

| Field    | Value                                                 |
| -------- | ----------------------------------------------------- |
| Status   | Complete                                              |
| Created  | 2026-08-30                                            |
| Baseline | `c97512f` plus the uncommitted completed graph slices |
| Scope    | Phase 5 graph presentation only                       |

## Objective

Match the graph presentation on the live Quartz 5 documentation site while retaining this repository's UUID manifest, authored-link and tag-edge meanings, local bundling, failure isolation, and lifecycle cleanup.

## Live reference findings

Verified on `https://quartz.jzhao.xyz/` on 2026-08-30:

- The local graph has a `Graph View` heading and a plain 250px bordered canvas.
- A 24px graph icon sits at the canvas's top-right and opens the global view.
- The global view is an 80vw by 80vh bordered graph panel over a 4px blurred page.
- The visible shell has no title bar, counts, legend, cluster names, close button, list panel, or zoom toolbar.
- Node labels start hidden and emerge on hover or zoom.
- Page nodes are small filled circles. Tag nodes are light circles with a tertiary outline. The current page uses the secondary color.
- The global graph uses radial force and hover focus. The local graph uses one-hop depth without radial grouping.

The installed `@quartz-community/graph@0.1.0` CSS and renderer source confirm the exact dimensions, colors, force values, node radii, label opacity formula, zoom range, and modal behavior. The official package remains disabled because it downloads D3 and Pixi from jsDelivr at runtime and uses slug identity.

## Non-goals

- Do not replace `knowledgeGraph.json`, UUID identity, or the local plugin.
- Do not copy the official runtime-CDN loader.
- Do not turn generated navigation into graph relationships.
- Do not remove text alternatives. Keep them visually hidden instead.
- Do not patch Quartz core or alter page content.

## Files

- `plugins/knowledge-graph/components/index.ts`
- `plugins/knowledge-graph/pixi-graph.css`
- `plugins/knowledge-graph/pixi-graph.ts`
- `scripts/validate-graph-output.mjs`
- this plan

## Acceptance gates

- [x] Local and global graph shells match the live Quartz dimensions and visible controls.
- [x] Cluster headings, header chrome, counters, legend, toolbar, and visible lists are absent.
- [x] Pixi nodes, labels, edges, zoom, hover, drag, and radial global layout match the official renderer.
- [x] Authored edges remain solid and tag membership remains dotted; direction stays in manifest data.
- [x] Accessible local/global link lists remain real anchors in visually hidden content.
- [x] Pixi and D3 remain exact local dependencies with no runtime CDN.
- [x] Strict TypeScript, tests, content/graph validation, real build, and browser comparison pass.

## Completion evidence

- Live Quartz reference: local frame measured 250px high with a 5px radius and 24px graph button. The global panel measured 80vw by 80vh with a 5px radius and 4px page blur.
- Local build: the same computed dimensions, one Pixi canvas, no SVG fallback, no legend or toolbar, and no browser warnings or errors.
- Global build: the same computed dimensions, one Pixi canvas, no visible header or toolbar, no browser warnings or errors, and outside-click close.
- Browser hit-test proof: local and global node hover set the expected UUID focus state, revealed the node label, and dimmed unrelated global nodes and edges.
- `npm test`: 173 tests passed across 45 suites.
- `npm run validate:content`: 19 entities and 19 unique IDs passed.
- `npx tsc --noEmit`: passed.
- Targeted Prettier: passed.
- `npx quartz build --concurrency=1`: 62 files emitted.
- `npm run validate:graph`: 19 pages, 1 tag, 39 relationships, and 12 graph-enabled HTML pages passed.
- `npx wrangler deploy --dry-run`: 74 assets, no bindings.
- `npm run check`: TypeScript passed. Repository-wide Prettier remains red on eight unrelated pre-existing documentation files.

The live Quartz documentation has many more graph nodes than this 19-page demo vault. The shell, node treatment, force settings, hover behavior, and modal presentation match; raw graph density will converge as content grows. Tag edges stay dotted because the repository contract requires that semantic distinction.

## Rollback

Restore the completed `replace-svg-force-with-pixi-graph.md` renderer presentation. No content or data migration is involved.

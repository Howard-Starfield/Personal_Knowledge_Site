# Execution Plan: Replace SVG force graph with local Pixi graph

| Field           | Value                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| Status          | Complete                                                                                              |
| Owner           | Product owner                                                                                         |
| Created         | 2026-08-30                                                                                            |
| Updated         | 2026-08-30                                                                                            |
| Baseline commit | `c97512f` plus the uncommitted completed local graph slices                                           |
| Target branch   | `v5`                                                                                                  |
| PR              | Not created                                                                                           |
| PRD phase       | Phase 5, knowledge graph                                                                              |
| Related ADRs    | ADR-0002; no new ADR required because Phase 5 already permits locally bundled D3/Pixi graph rendering |

## 1. Objective

Replace the current SVG force renderer with a locally bundled PixiJS 8 canvas renderer modeled on Quartz 5's official graph experience. Keep the existing UUID-based graph manifest and relationship semantics. The compact and expanded graph must support node drag/open, pan, zoom, hover isolation, labels, theme colors, and reliable teardown.

## 2. Non-goals

- Do not enable `@quartz-community/graph@0.1.0` unchanged because it injects floating D3 7 and PixiJS 8 scripts from jsDelivr at runtime.
- Do not replace the versioned `knowledgeGraph.json` contract with ContentIndex or slug identity.
- Do not add inferred links, semantic/vector relationships, D1, authentication, comments, capture, managed media, or deployment.
- Do not change Markdown, frontmatter IDs, category tables, routes, or publishing behavior.
- Do not claim a large-vault performance ceiling from the current 20-node browser fixture.

## 3. Acceptance gates

- [x] The renderer uses a PixiJS canvas and D3 force/zoom behavior comparable to the official Quartz graph.
- [x] PixiJS and D3 are exact direct dependencies bundled into the emitted component script; no runtime CDN or remote graph asset exists.
- [x] The old SVG renderer assets are deleted and rejected by the graph output validator.
- [x] Node drag/open, hover focus, wheel/control zoom, pan, local depth, and expanded global graph work in the real browser.
- [x] Solid directed authored links and dotted tag membership remain distinct; folder/category remains grouping metadata and never becomes an edge.
- [x] Page nodes retain immutable UUID identity; slug remains routing metadata.
- [x] Canvas/Pixi failure leaves the article and accessible relationship lists readable.
- [x] Every application, simulation, ticker/frame loop, resize observer, listener, and dialog resource has one cleanup path across Quartz navigation.
- [x] Keyboard users retain node/link access through generated text alternatives and all controls retain names and focus styling.
- [x] Reduced motion stops ambient simulation after a deterministic settle; mobile does not initialize or fetch the graph by default.

## 4. Instruction and source verification

| Scope                        | Source                                                                                 | Finding                                                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Repository                   | `AGENTS.md`                                                                            | Plan before code, local graph resources, strict TypeScript, explicit lifecycle cleanup, preserve dirty worktree             |
| Product                      | `docs/product/PRD.md` FR-GRAPH-01/02 and Phase 5                                       | Public local/global graph is optional and cannot break reading                                                              |
| Prior renderer               | `docs/exec-plans/completed/replace-fixed-graph-with-force-graph.md`                    | Manifest contract is sound; current SVG interaction is lighter than requested                                               |
| Official Quartz docs         | `https://github.com/jackyzha0/quartz/blob/v5/docs/plugins/Graph.md`                    | Default local/global options include drag, zoom, depth, force tuning, tag visibility, hover focus, and radial global layout |
| Official Quartz feature docs | `https://github.com/jackyzha0/quartz/blob/v5/docs/features/graph%20view.md`            | Local graph shows one-hop neighbors; global graph shows the whole vault                                                     |
| Installed official package   | `node_modules/@quartz-community/graph/dist/components/index.js`                        | Version 0.1.0 uses D3 force/drag/zoom plus Pixi Application/Graphics/Text and requests D3/Pixi from jsDelivr                |
| PixiJS official docs         | `https://github.com/pixijs/pixijs/blob/v8.16.0/src/app/__docs__/app-overview.md`       | Async `Application.init`, `resizeTo`, and explicit `destroy` lifecycle                                                      |
| PixiJS event docs            | `https://github.com/pixijs/pixijs/blob/v8.16.0/src/events/__docs__/events-overview.md` | Pointer events and global pointer movement are the supported interaction path                                               |

Context7 resolved `/jackyzha0/quartz` and `/pixijs/pixijs/v8.16.0` before documentation retrieval.

## 5. Version and dependency matrix

| Component                        |         Exact version | Scope                            | Notes                                                                            |
| -------------------------------- | --------------------: | -------------------------------- | -------------------------------------------------------------------------------- |
| Quartz                           | 5.0.0, HEAD `c97512f` | framework                        | No core patch                                                                    |
| Official graph package inspected |                 0.1.0 | reference only                   | 209,971-byte unpacked package; runtime CDN implementation remains disabled       |
| PixiJS                           |                8.16.0 | browser runtime, locally bundled | MIT; pinned to the exact official documentation version instead of floating `@8` |
| d3-force                         |                 3.0.0 | browser runtime, locally bundled | Existing direct dependency                                                       |
| d3-selection                     |                 3.0.0 | browser runtime, locally bundled | Existing direct dependency                                                       |
| d3-zoom                          |                 3.0.0 | browser runtime, locally bundled | Existing direct dependency                                                       |
| esbuild                          |       0.27.7 resolved | build time                       | Bundles graph dependencies into the component IIFE                               |
| TypeScript                       |        5.9.3 resolved | build/test                       | Strict rules remain enabled                                                      |

### Dependency assessment

PixiJS is the deliberate cost of this visual direction. The official graph uses it for GPU-backed scene rendering and high-density interaction. Existing native SVG remains the smaller alternative, but the owner has selected the heavier official-style behavior. PixiJS is MIT licensed, actively maintained, browser-native, and does not require a Worker or Cloudflare binding. The emitted bundle size and runtime backend will be recorded before completion.

## 6. Repository reconnaissance

- The current local plugin owns both the schema-versioned graph emitter and the component renderer.
- `src/manifest.ts`, its tests, `index.ts`, and `scripts/validate-graph-output.mjs` already enforce UUID identity and graph semantics.
- `force-graph.ts` renders SVG, implements pointer drag, and uses D3 zoom; `force-graph.css` styles the SVG nodes/edges.
- The official Quartz graph is visually heavier because Pixi owns its canvas, display list, labels, hit testing, and continuous render loop.
- The official implementation uses slug identity and generic ContentIndex links, so enabling it directly would weaken this repository's stronger contract even if the CDN issue were ignored.

## 7. Design

### Visual plan

- Palette: existing Quartz `--secondary`, `--tertiary`, `--darkgray`, `--lightgray`, `--dark`, and `--light` tokens. No new site-wide colors.
- Type: existing body font for note labels and code font for folder/graph metadata.
- Layout: compact canvas remains quiet in the right sidebar; the expanded dialog gives nearly all space to the canvas with controls overlaid in one corner.
- Signature: nodes behave like an instrument panel for the vault. Hovering one note leaves its neighborhood bright and drops unrelated nodes to low opacity. Labels emerge with zoom instead of covering the map at rest.

The distinctive part is the live Pixi constellation, not more card chrome. The surrounding shell stays subdued so the graph owns the interaction.

### Runtime design

1. Parse `knowledgeGraph.json` from `unknown` into the existing discriminated graph model.
2. Select the current one-hop graph or whole manifest.
3. Create one Pixi `Application` per visible graph and one D3 force simulation per application.
4. Render edges in a Pixi `Graphics` layer, nodes in separate `Graphics` objects, and labels as `Text` objects.
5. Use Pixi pointer events for hit testing, drag/click thresholds, hover focus, and node activation.
6. Use D3 zoom on the Pixi canvas to transform the scene container. Zoom buttons call the same behavior.
7. Use a bounded application ticker callback, stop simulations after settling or under reduced motion, and destroy the Pixi application plus D3/listener state during cleanup.

### Accessibility design

- Canvas gets a concise accessible name but does not pretend each GPU object is an HTML link.
- The local relationship list remains the keyboard and screen-reader route for current-note connections.
- The global dialog adds a collapsible alphabetical page/tag list using real anchors.
- Edge direction/style and node kind remain described in the legend and text alternatives, not color alone.

## 8. Data and behavior contracts

- Manifest schema remains version 1.
- Solid authored edges retain direction and count.
- Dotted tag edges connect a page UUID to a `tag:` node.
- Folder cluster names can influence D3 forces and Pixi labels, never edge creation.
- Repeated authored links remain one edge with `count`.
- Self, unresolved, external, media, and generated navigation links remain excluded by the unchanged emitter.
- Browser routing uses the node slug only after UUID identity has selected the node.
- Runtime data is validated once at fetch; internal rendering trusts the parsed model.

## 9. File touch plan

| Order | File                                                        | Change                                                            |
| ----: | ----------------------------------------------------------- | ----------------------------------------------------------------- |
|     1 | `package.json`, `package-lock.json`                         | Add exact `pixi.js@8.16.0`                                        |
|     2 | `plugins/knowledge-graph/pixi-graph.ts`                     | Add locally bundled Pixi renderer and lifecycle                   |
|     3 | `plugins/knowledge-graph/pixi-graph.css`                    | Add canvas-specific shell/fallback styles                         |
|     4 | `plugins/knowledge-graph/components/index.ts`               | Bundle new entry, add global accessible list, update copy/classes |
|     5 | `plugins/knowledge-graph/force-graph.ts`, `force-graph.css` | Delete superseded lighter renderer assets                         |
|     6 | `plugins/knowledge-graph/package.json`                      | Bump local plugin/display version                                 |
|     7 | `scripts/validate-graph-output.mjs`                         | Require Pixi assets/canvas markers and reject old assets/CDNs     |
|     8 | `docs/architecture/VERSION_MATRIX.md`                       | Record exact local graph runtime dependencies                     |
|     9 | this plan                                                   | Record evidence and move to completed                             |

## 10. Implementation and verification steps

1. Install exact PixiJS and inspect installed `Application`, `Graphics`, `Text`, events, renderer, and destroy declarations/source.
2. Implement the Pixi client using the existing parser and graph selection behavior.
3. Replace component assets and extend the rerunnable validator.
4. Run content validation, 173+ tests, TypeScript, targeted formatting, real Quartz build, graph validation, and Wrangler dry-run.
5. In the browser, verify local/global rendering, drag and zoom controls, keyboard lists, dialog reopen, mobile behavior, and no current console errors.
6. Inspect emitted bundle size, script URLs, canvas count, and final diff.

## 11. Rollback and stop conditions

Rollback removes PixiJS, restores the completed SVG renderer assets/component entry, and rebuilds. No content or user data changes.

Stop if the exact Pixi API conflicts with the pinned docs, the local component cannot bundle it without a Quartz core change, WebGL/Canvas failure breaks reading, runtime cleanup leaks applications/canvases, graph semantics would need to change, or lockfile churn cannot be explained.

## 12. Completion evidence

### Automated and build proof

| Check                                                    | Result                                                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npx tsc --noEmit`                                       | Passed                                                                                                      |
| Targeted Prettier check for changed graph files          | Passed                                                                                                      |
| `npm test`                                               | Passed: 173 tests across 45 suites                                                                          |
| `npm run validate:content`                               | Passed: 19 entities and 19 unique IDs                                                                       |
| `npx quartz build --concurrency=1`                       | Passed: 20 inputs, 1 filtered, 62 emitted files                                                             |
| `npm run validate:graph`                                 | Passed: 19 pages, 1 tag, 39 relationships, 12 graph-enabled HTML pages                                      |
| `npx wrangler deploy --dry-run`                          | Passed: 74 static assets, no bindings                                                                       |
| `npm ls pixi.js d3-force d3-selection d3-zoom --depth=0` | Exact pins: Pixi 8.16.0 and D3 packages 3.0.0                                                               |
| `npm run check`                                          | TypeScript passed; repository-wide Prettier remains red on eight unrelated pre-existing documentation files |

The emitted graph component bundle is 592,294 uncompressed bytes. Output search found no D3/Pixi jsDelivr or unpkg imports.

### Browser proof

- Desktop local view: `data-graph-renderer="pixi"`, one canvas, zero fallback SVGs, no console warnings/errors.
- Expanded view: one Pixi canvas, zero fallback SVGs, 19 pages, 1 tag, 39 relationships, and 20 real links in the alphabetical fallback list.
- Drag plus zoom in/out/reset completed without a warning or error.
- Close/reopen retained exactly one local and one global canvas rather than adding duplicate renderers.
- At a 720 x 900 viewport, the component was `display: none`, created zero canvases, and did not enter a loading state.
- The expanded desktop view was left open in the in-app browser for owner review.

### Known limit

The 500-page fixture proves manifest generation semantics and runtime complexity, not large-vault browser frame rate. This slice makes no large-vault performance ceiling claim.

### Adversarial completion review

1. Generated navigation did not become graph edges; the emitter remained unchanged.
2. Node identity remains the immutable frontmatter UUID, so moves and titles do not redefine identity.
3. No ID is generated from a route, path, title, or render position.
4. The manifest still receives only the published Quartz content set and excludes unlisted pages.
5. No principal-specific store, write path, auth boundary, D1, or user data was introduced.
6. No client identity or role is accepted.
7. Pixi failure falls back to SVG, and total graph failure hides only the graph while leaving the article readable.
8. D1 remains absent.
9. Pixi and D3 are exact local dependencies; no remote graph runtime was emitted.
10. Rollback removes Pixi and restores the completed SVG component without data migration.
11. Strict TypeScript passed without assertions, non-null assertions, suppression, or fallback canonical data.
12. Manifest JSON remains `unknown` until validated by the existing parser.
13. No tests were skipped, weakened, or broadly re-snapshotted.
14. Abort, simulation, ticker, D3 zoom, pointer listeners, Pixi application, and canvas share one teardown path; browser reopen proof found no duplicates.
15. No Node or Cloudflare runtime behavior was added to the browser renderer.
16. The heavy 592,294-byte bundle is intentional for the selected official-style Pixi experience and is isolated to the graph component.

## 13. Completion log

| Date       | Commit        | Work completed                                                                                                         | Evidence                                                                                                                 | Remaining                                           |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| 2026-08-30 | Not committed | Verified Quartz 5's official Pixi/D3 behavior and replaced the SVG renderer with a locally bundled Pixi implementation | Context7, installed package source, 173 tests, real build, output validator, Wrangler dry-run, browser interaction proof | Owner visual preference check; no code gate remains |

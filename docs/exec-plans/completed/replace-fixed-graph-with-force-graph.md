# Execution Plan: Replace Fixed Graph with Obsidian-style Force Graph

| Field           | Value                                                                          |
| --------------- | ------------------------------------------------------------------------------ |
| Status          | Complete                                                                       |
| Owner           | Product owner                                                                  |
| Created         | 2026-08-30                                                                     |
| Updated         | 2026-08-30                                                                     |
| Baseline commit | `c97512f` with preserved owner-authored working-tree changes                   |
| Target branch   | `v5`                                                                           |
| PR              | Not created                                                                    |
| PRD phase       | Phase 5 — Knowledge graph                                                      |
| Related ADRs    | ADR-0002; no new ADR required because graph semantics and schema do not change |

## 1. Objective

Replace the rejected deterministic SVG graph with one conventional Obsidian-style force-directed graph experience. The compact sidebar and expanded dialog will use the same locally bundled force renderer with organic layout, drag, hover isolation, zoom, and pan. Delete the rejected renderer assets while preserving the validated UUID-based manifest and relationship rules.

## 2. Non-goals

- No change to graph identity, schema, edge semantics, category rules, Markdown, or publishing.
- No inferred/semantic links, D1, authentication, capture, comments, managed media, or deployment.
- No Quartz core patch, second frontend framework, runtime CDN, or remote graph asset.
- No attempt to prove very-large-vault rendering in this visual replacement.

## 3. Acceptance gates

- [x] The old `client.ts` and `knowledge-graph.css` assets are removed, with no old fixed-cluster/global-canvas selectors emitted.
- [x] Both compact and expanded views are force-directed; nodes can be dragged and the expanded view can pan/zoom.
- [x] Solid directed authored links and dotted tag memberships remain distinct; folders influence grouping but never become edges.
- [x] Page IDs remain immutable UUIDs and no identity is derived from path or title.
- [x] D3 modules are pinned, bundled locally, and absent from runtime CDN requests.
- [x] Graph fetch/validation/render failure leaves article reading intact.
- [x] Repeated Quartz navigation tears down simulations, listeners, zoom handlers, and dialog state.
- [x] Narrow/mobile viewports do not initialize or fetch the graph by default.
- [x] Keyboard focus, visible focus, text relationship alternative, reduced motion, and non-color semantics remain available.

Evidence: unit tests, TypeScript/format checks, real Quartz build, generated-output validator, Wrangler dry-run, and browser interaction/screenshots.

## 4. Instruction sources

| Scope/path  | Instruction file                                              | Relevant rules                                                                        |
| ----------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Repository  | `AGENTS.md`                                                   | Plan first; local dependencies; lifecycle cleanup; strict TS; preserve dirty worktree |
| Product     | `docs/product/PRD.md`                                         | FR-GRAPH-01/02 and Phase 5 acceptance                                                 |
| Prior slice | `docs/exec-plans/completed/phase-5-local-and-global-graph.md` | Existing manifest contract, evidence, and rejected-renderer limitations               |

No nested `AGENTS.md` exists under `plugins/` or `scripts/`.

## 5. Version and environment matrix

| Component        | Exact version/commit                             | Source of truth | Notes                                                     |
| ---------------- | ------------------------------------------------ | --------------- | --------------------------------------------------------- |
| Quartz           | `5.0.0`, repository HEAD `c97512f`               | package/Git     | Static framework retained                                 |
| TypeScript       | `5.9.3` resolved                                 | lockfile        | Strict project rules apply                                |
| esbuild          | `0.27.7` resolved                                | lockfile        | Bundles the browser entry locally at component build time |
| d3-force         | `3.0.0`                                          | npm registry    | ISC; 89,551-byte unpacked package                         |
| d3-selection     | `3.0.0`                                          | npm registry    | ISC; 134,715-byte unpacked package                        |
| d3-zoom          | `3.0.0`                                          | npm registry    | ISC; 86,878-byte unpacked package                         |
| D3 type packages | force `3.0.10`, selection `3.0.11`, zoom `3.0.8` | npm registry    | MIT; development-only typing                              |

## 6. Official source verification

| Claim                                                                    | Official URL                                                                    | Verified date | Installed source/symbol                                                      | Finding                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Force simulations expose link/charge/center forces and explicit `stop()` | `https://github.com/d3/d3-force/blob/main/_autodocs/README.md`                  | 2026-08-30    | `node_modules/d3-force/src/simulation.js`                                    | Use one simulation per rendered surface and stop it during teardown  |
| Link force accepts node identities and configurable distance/strength    | `https://github.com/d3/d3-force/blob/main/_autodocs/api-reference/forceLink.md` | 2026-08-30    | `node_modules/d3-force/src/link.js`                                          | Preserve UUID/tag IDs through the force graph                        |
| D3 modules support npm imports and zoom behavior                         | `https://d3js.org/api`; `https://d3js.org/getting-started`                      | 2026-08-30    | `node_modules/d3-zoom/src/zoom.js`; `node_modules/d3-selection/src/index.js` | Modular dependencies can be build-time bundled without a runtime CDN |

Context7 resolved `/d3/d3-force` and `/websites/d3js` before documentation retrieval.

## 7. Repository reconnaissance

The existing graph emits a valid `knowledgeGraph.json`, but `plugins/knowledge-graph/client.ts` computes fixed deterministic coordinates and `knowledge-graph.css` presents the result as a framed card plus fixed cluster artwork. The user rejected that visual direction. The installed community graph package is not enabled because version `0.1.0` injects D3/Pixi from jsDelivr at runtime.

| Area             | Current file                                  | Change                                                          |
| ---------------- | --------------------------------------------- | --------------------------------------------------------------- |
| Manifest/emitter | `plugins/knowledge-graph/src/*`, `index.ts`   | Preserve unchanged                                              |
| Component shell  | `plugins/knowledge-graph/components/index.ts` | Simplify copy/markup and bundle the new browser entry           |
| Rejected client  | `plugins/knowledge-graph/client.ts`           | Delete                                                          |
| Rejected style   | `plugins/knowledge-graph/knowledge-graph.css` | Delete                                                          |
| New force client | `plugins/knowledge-graph/force-graph.ts`      | Add parsed boundary, force rendering, interaction, and teardown |
| New force style  | `plugins/knowledge-graph/force-graph.css`     | Add scoped constellation visual system                          |
| Output proof     | `scripts/validate-graph-output.mjs`           | Require new markup and reject old assets/selectors/CDNs         |

## 8. Contracts and invariants

- Solid edge = authored body link with preserved direction/count.
- Dotted edge = page-to-tag membership.
- Folder/category = force grouping and visual label only, never an edge.
- Browser JSON is `unknown` until validated into the canonical discriminated unions.
- Article DOM and reading do not depend on graph success.
- Generated navigation remains excluded because the build manifest source is unchanged.

## 9. Proposed design

The existing emitter remains the sole graph-data owner. The component uses esbuild's bundling API to embed a local IIFE containing the required D3 force, selection, and zoom modules. The client parses the manifest once per Quartz navigation, renders a one-hop compact simulation and a lazy full-vault simulation, and records every cleanup function. Pages are circular nodes, tags are diamond nodes, directed authored links are solid, and tag membership is dotted. Folder grouping uses x/y attraction toward category centers and subtle labels, not synthetic edges. Node labels appear for the current/selected/hovered neighborhood to reduce visual clutter. Pointer-event drag handling uses an explicit movement threshold so a click cannot be confused with a drag or land on a moving neighboring node.

### Alternatives considered

| Alternative                                               | Benefit                                                   | Problem                                                         | Decision |
| --------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------- | -------- |
| Enable installed community graph                          | Closest stock Quartz appearance                           | Runtime jsDelivr D3/Pixi violates local-resource policy         | Reject   |
| Keep fixed SVG and restyle                                | No dependency                                             | Does not address the rejected static/non-draggable behavior     | Reject   |
| Modular D3 force/selection/zoom plus bounded pointer drag | Familiar Obsidian behavior; local SVG; explicit lifecycle | Adds pinned packages and bundle size                            | Select   |
| Pixi/Sigma canvas                                         | Better extreme-scale ceiling                              | Larger dependency/complexity and unnecessary for current corpus | Defer    |

No ADR is required: this does not change stable contracts or add a production service/framework.

## 10. Data and schema changes

None. `knowledgeGraph.json` remains schema version 1. D1, API, and media changes are not applicable.

## 11. File touch plan

| Order | File/path                                     | Change                                                    | Risk                          |
| ----: | --------------------------------------------- | --------------------------------------------------------- | ----------------------------- |
|     1 | `package.json`, `package-lock.json`           | Add exact force/selection/zoom runtime/types dependencies | lockfile churn/bundle size    |
|     2 | `plugins/knowledge-graph/components/index.ts` | Bundle and mount new renderer                             | Quartz component loading      |
|     3 | old/new client and CSS assets                 | Delete rejected assets; add force assets                  | lifecycle/interaction         |
|     4 | `scripts/validate-graph-output.mjs`           | Enforce replacement and local bundling                    | false-negative output proof   |
|     5 | this plan                                     | Record evidence and move to completed                     | stale plan if results omitted |

## 12. Incremental implementation steps

1. [x] Pin packages and inspect installed exports/types/license files.
2. [x] Replace the component shell and assets, preserving the manifest boundary.
3. [x] Extend the rerunnable output validator to reject old and remote assets.
4. [x] Run focused/unit/type/format/build/output/Worker proofs.
5. [x] Exercise desktop compact/expanded, drag/zoom/navigation, failure isolation, and narrow viewport in the browser.

## 13. Test plan

- Unit: preserve all manifest tests; add pure force-view selection tests only if model selection changes.
- Integration: `npm test`, `npx tsc --noEmit`, targeted Prettier, real Quartz build, `npm run validate:graph`, `npx wrangler deploy --dry-run`.
- Browser: compact view, expanded view, drag, wheel/controls, click navigation, dialog close, repeat SPA navigation, no console errors.
- Accessibility: named controls/dialog, focus state, label/line/shape semantics, relationship list, reduced-motion behavior.
- Mobile: component hidden and no `knowledgeGraph.json` request at narrow width.
- Performance: record bundled client bytes and current manifest node/edge counts; do not claim large-vault suitability.
- Security: output scan for remote graph URLs and private paths; no mutation/auth surface added.

## 14. Migration, deployment, and rollback

No content/data migration and no deployment. Rollback removes the three direct modular D3 dependencies, restores the prior component assets, and rebuilds. No user data is written or lost.

## 15. Risks and stop conditions

| Risk                                                             | Resolution                                        | Stop condition?                   |
| ---------------------------------------------------------------- | ------------------------------------------------- | --------------------------------- |
| D3 bundle cannot be emitted through the local component boundary | Prove with real build and inspect emitted HTML/JS | Yes; do not patch Quartz core     |
| Type packages require unsafe casts                               | Model boundary/selection generics explicitly      | Yes if strict rules cannot be met |
| Teardown cannot prevent duplicate simulation/listener state      | Browser SPA repetition and DOM/resource checks    | Yes                               |
| Lockfile contains unrelated churn                                | Inspect scoped diff after install                 | Yes if unexplained                |

## 16. Adversarial review and completion evidence

- Generated navigation still cannot create edges: the unchanged emitter reads parsed authored body links only.
- UUID page identity, graph schema version 1, folder metadata, tag membership, and authored edge direction/count are unchanged.
- The emitter still receives only filtered published Quartz content; no private intake, attachments, mutation path, D1, or identity surface was added.
- Browser JSON remains `unknown` until validated; no `any`, assertion, non-null assertion, suppression, or invented fallback graph data was introduced.
- The component checks the optional Quartz cleanup hook at runtime, while its own global runtime owner disposes simulations/listeners on script replacement and every navigation initializes through one teardown boundary.
- Node click, Enter activation, drag, zoom, dialog close, and SPA navigation were exercised in the real browser. The graph remained one component and one dialog after navigation.
- Narrow 760 px rendering hid the graph and produced no horizontal overflow (`760.29` px body width versus `760` px scroll width). Mobile initialization returns before fetch.
- `client.ts` and `knowledge-graph.css` are absent. The output validator rejects their old fixed-cluster selectors and all known D3/Pixi CDN signatures.
- The locally emitted minified client resource is 73,771 bytes for the current build. This is accepted for the comparison slice; it is not a large-vault performance claim.
- No test was skipped or weakened. All 173 tests pass, including seven graph manifest tests and the representative 500-page construction fixture.
- Rollback remains code/static-only and cannot delete user data.

### Commands and results

```text
npm run validate:content
Passed: 19 entities, 19 unique IDs.

npm test
Passed: 173 tests across 45 suites.

npx tsc --noEmit
Passed.

npx prettier <changed graph files and plan> --check
Passed.

npx quartz build --concurrency=1
Passed: 62 files emitted from 20 inputs; one unpublished input filtered.

npm run validate:graph
Passed: 19 pages, 1 tag, 39 relationships, 12 graph-enabled HTML pages; rejected assets and remote graph URLs absent.

npx wrangler deploy --dry-run
Passed: 74 assets, no bindings, no deployment.

npm run check
TypeScript passed. Repository-wide Prettier remains red on eight pre-existing documentation files outside this slice; targeted changed-file formatting passed.
```

### Browser evidence

- Compact graph rendered six local nodes on the representative page with readable authored/tag legend and text relationship fallback.
- Expanded graph rendered 20 nodes in six labeled folder/tag groupings and 39 relationships.
- Zoom-in changed the viewport from no transform to `translate(-156.8,-100.8) scale(1.28)`.
- A pointer drag repositioned the highlighted node and reheated/re-settled the network.
- A graph-node click navigated to the exact expected note; Enter activation also navigated correctly.
- The dialog close control worked, and article content remained independent of graph state.

### Known limitations

- The current corpus has only one controlled tag, so the dotted tag layer is visually sparse.
- This proves the current 20-node browser graph and a 500-page manifest construction fixture, not smooth rendering for a 500-visible-node vault.
- The graph is intentionally absent below the 800 px desktop breakpoint.

## 17. Completion log

| Date       | Commit        | Work completed                                                                                            | Evidence                                                                                   | Remaining                     |
| ---------- | ------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------- |
| 2026-08-30 | Not committed | Reproduced the rejected fixed renderer, verified D3 docs, and planned a locally bundled force replacement | Git/status inspection, Context7, npm metadata                                              | Implementation and validation |
| 2026-08-30 | Not committed | Replaced and removed the rejected assets; browser-verified the force graph and completed required checks  | 173 tests; real build; graph validator; Wrangler dry-run; desktop and mobile browser proof | Owner visual preference       |

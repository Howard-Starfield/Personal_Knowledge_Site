# Execution Plan: Phase 5 — Local and Global Knowledge Graph Comparison

| Field           | Value                                                                   |
| --------------- | ----------------------------------------------------------------------- |
| Status          | Complete                                                                |
| Owner           | Product owner                                                           |
| Created         | 2026-08-30                                                              |
| Updated         | 2026-08-30                                                              |
| Baseline commit | `c97512f` with preserved owner-authored working-tree changes            |
| Target branch   | `v5`                                                                    |
| PR              | Not created                                                             |
| PRD phase       | Phase 5 — Knowledge graph                                               |
| Related ADRs    | ADR-0002; ADR-0001 is superseded and provides historical semantics only |

## 1. Objective

Add two comparable graph experiences backed by one versioned, validated build artifact: a compact local neighborhood graph in the content-page right sidebar and an expandable global vault graph. Both views must preserve the repository's authored-link, tag-membership, and folder-cluster meanings without becoming necessary for reading an article.

## 2. Non-goals

- No semantic, vector, or AI-inferred relationships.
- No D1, owner progress, comments, capture API, auth, managed media, deployment, or production publishing.
- No Quartz core patch and no second frontend framework.
- No runtime CDN, D3, Pixi, or new package dependency.
- No graph on generated folder/tag pages and no default graph initialization on narrow/mobile viewports.

## 3. Acceptance gates copied from the PRD

- [x] Solid authored-link edges and dotted page-to-tag membership edges are visibly distinct.
- [x] Folders appear only as cluster regions/labels, never as graph edges.
- [x] Repeated authored links are deduplicated and retain a count and direction.
- [x] Self-links, unresolved links, generated navigation, external links, and media assets are excluded.
- [x] The graph uses immutable frontmatter UUIDs as page identity and never derives identity from path/title.
- [x] Graph resources are locally emitted; no runtime D3/Pixi CDN is present.
- [x] Local graph depth and global graph affordance are visibly distinct while sharing one data contract.
- [x] Keyboard and text-list alternatives expose the relationships without relying on color.
- [x] Article reading survives graph fetch, parse, or render failure.
- [x] Repeated Quartz navigation does not duplicate listeners, observers, dialogs, or graph state.

Evidence: unit tests for the manifest/model, a real Quartz build, a generated-output validator, browser screenshots and interaction checks, accessibility inspection, and narrow-viewport network proof.

## 4. Instruction sources

| Scope/path      | Instruction file                                      | Relevant rules                                                                                                    |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Repository      | `AGENTS.md`                                           | Plan before code; local resources; graph semantics; lifecycle cleanup; strict TypeScript; preserve dirty worktree |
| Product         | `docs/product/PRD.md`                                 | Phase 5 behavior and acceptance gates                                                                             |
| Content         | `content/AGENTS.md`                                   | Read for context; no content changes planned                                                                      |
| Active baseline | `docs/exec-plans/active/phase-0-online-foundation.md` | Graph was explicitly deferred and remote runtime graph blocked                                                    |

Verification command/output:

```text
rg --files | rg "(^|/)AGENTS\\.md$"
AGENTS.md
```

## 5. Version and environment matrix

| Component             | Exact version/commit                                     | Source of truth                       | Notes                                                    |
| --------------------- | -------------------------------------------------------- | ------------------------------------- | -------------------------------------------------------- |
| Quartz                | `5.0.0`, repository HEAD `c97512f`                       | `package.json`, Git                   | Static framework retained                                |
| Content Index         | `0.1.0`                                                  | lockfile/package                      | Remains enabled for existing site features               |
| Existing Graph plugin | `0.1.0`                                                  | installed package                     | Not enabled because it injects D3/Pixi from jsDelivr     |
| Node                  | local diagnostic `v24.14.0`; project contract `v22.16.0` | `docs/architecture/VERSION_MATRIX.md` | Exact-pin proof remains a baseline limitation            |
| npm                   | local diagnostic `11.9.0`                                | version matrix                        | No dependency install planned                            |
| TypeScript            | `5.9.3` resolved                                         | lockfile                              | Strict project rules apply                               |
| esbuild               | root `0.27.7`                                            | lockfile                              | Existing build-time compiler only; no browser dependency |
| Wrangler              | `4.125.0`                                                | package and version matrix            | Dry-run only                                             |
| D3/Pixi               | None in the new implementation                           | planned source/output scan            | Native SVG chosen                                        |

## 6. Official source verification

| Claim/assumption                                                       | Official URL                                                                         | Verified date | Installed source file/symbol                                                                | Finding                                                                             |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Quartz component plugins expose JSX plus CSS/client script resources   | `https://github.com/jackyzha0/quartz/blob/v5/docs/advanced/creating%20components.md` | 2026-08-30    | `quartz/plugins/loader/componentLoader.ts`; `quartz/plugins/emitters/componentResources.ts` | Local component package can register one sidebar component and bundle its resources |
| Quartz plugin manifests may declare component and emitter capabilities | `https://github.com/jackyzha0/quartz/blob/v5/docs/advanced/making%20plugins.md`      | 2026-08-30    | `quartz/plugins/loader/config-loader.ts`; `gitLoader.ts`                                    | A project-local package can expose a build emitter and a component subpath          |
| Quartz SPA behavior uses navigation events and explicit cleanup        | Same component documentation                                                         | 2026-08-30    | `quartz/components/scripts/*`; installed Backlinks/Explorer scripts                         | Client setup must be repeatable and register teardown with `window.addCleanup`      |
| Installed community graph is not locally bundled                       | `https://github.com/jackyzha0/quartz/blob/v5/docs/features/graph%20view.md`          | 2026-08-30    | `node_modules/@quartz-community/graph/dist/components/index.js`                             | Installed version injects `cdn.jsdelivr.net` D3 and Pixi URLs and remains disabled  |

Context7 library `/jackyzha0/quartz` was resolved before documentation retrieval.

## 7. Repository reconnaissance

### Current behavior reproduced

- `quartz.config.yaml` enables Backlinks and ContentIndex but no graph component.
- The current learning-log page contains Backlinks markup and no graph markup.
- `public/static/contentIndex.json` contains 22 records; the representative page has authored outgoing links and a retrieval tag.
- The installed graph package contains runtime jsDelivr imports for D3 7 and Pixi 8.

### Relevant code map

| Area                 | File/symbol                                   | Current responsibility      | Expected change                                                          |
| -------------------- | --------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| Plugin configuration | `quartz.config.yaml`                          | Site plugin/layout registry | Enable the project-local graph package in the right sidebar              |
| Manifest builder     | `plugins/knowledge-graph/src/manifest.ts`     | New pure build contract     | Validate IDs and produce deterministic page/tag nodes and link/tag edges |
| Emitter              | `plugins/knowledge-graph/index.ts`            | New static artifact writer  | Emit `static/knowledgeGraph.json`                                        |
| Component            | `plugins/knowledge-graph/components/index.ts` | New graph shell             | Render local panel, accessible list, and global dialog affordance        |
| Client               | `plugins/knowledge-graph/client.ts`           | New browser behavior        | Validate artifact, render local/global native SVG, manage lifecycle      |
| Styles               | `plugins/knowledge-graph/knowledge-graph.css` | New scoped visual contract  | Obsidian-like graph presentation and responsive behavior                 |
| Output proof         | `scripts/validate-graph-output.mjs`           | New rerunnable verifier     | Validate generated schema/references and forbid graph CDN signatures     |

### Existing tests and fixtures

Existing content/link/ID validators protect canonical Markdown. New tests will protect graph-specific mapping, deduplication, direction, exclusion, and identity behavior.

## 8. Contracts and invariants

### Content identity

- [x] IDs remain immutable.
- [x] Path/title/permalink are not treated as identity.

### Category table

- [x] Generated navigation cannot become authored graph edges.

### Graph

- [x] Solid = authored internal link.
- [x] Dotted = page-to-tag membership.
- [x] Folder = cluster, no edge.
- [x] Graph manifest schema is versioned and validated at the browser boundary.

### Security/data

- [x] Markdown remains canonical public content.
- [x] No private source material, secrets, remote scripts, or browser corpus parsing are introduced.
- [x] D1/auth are not applicable to this slice.

## 9. Proposed design

The emitter consumes Quartz's already-resolved processed-content metadata at build time. It validates immutable frontmatter UUIDs, maps slugs to IDs, emits page and tag nodes, deduplicates authored links with counts, and emits tag memberships. The client validates this one artifact, then derives either the current page's one-hop neighborhood or the whole-vault layout. Native SVG provides deterministic layouts and interaction without a runtime library. The full graph appears in a native dialog opened from the local panel.

### Alternatives considered

| Alternative                                    | Benefit                                              | Problem                                                                                                            | Decision                                                 |
| ---------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Enable installed community graph               | Fastest                                              | Runtime jsDelivr D3/Pixi conflicts with local-bundle invariant and IDs/edge meanings are insufficiently controlled | Rejected                                                 |
| Add locally bundled D3/Pixi                    | Strong force/zoom primitives                         | Adds dependency, bundle weight, lifecycle surface, and audit work for a 22-page showcase                           | Deferred until representative-scale evidence requires it |
| Native SVG over one deterministic manifest     | No dependency/CDN; explicit semantics; easy fallback | Less organic physics                                                                                               | Selected                                                 |
| Separate data implementations for local/global | Independent tuning                                   | Risks semantic drift and duplicated validation                                                                     | Rejected                                                 |

No ADR is required: the established graph semantics and Quartz boundary do not change, and no major dependency is added.

## 10. Data and schema changes

### Static/build contracts

`static/knowledgeGraph.json` uses `schemaVersion: 1`, page/tag discriminated-union nodes, and authored/tag-membership discriminated-union edges. Page node IDs are canonical frontmatter UUIDs. Tag IDs use a separate `tag:` namespace and are not content IDs.

### D1 migrations

Not applicable.

### API changes

Not applicable; the artifact is static and read-only.

### Media changes

Not applicable.

## 11. File touch plan

| Order | File/path                                                     | Change                                                                                                                         | Reason                                          | Risk   |
| ----: | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | ------ |
|     1 | `docs/exec-plans/completed/phase-5-local-and-global-graph.md` | Add/maintain plan                                                                                                              | Execution authority                             | Low    |
|     2 | `plugins/knowledge-graph/**`                                  | Add local emitter/component/model/client/styles/tests                                                                          | Complete graph vertical slice                   | Medium |
|     3 | `quartz.config.yaml`                                          | Enable plugin and sidebar layout                                                                                               | Make feature visible                            | Low    |
|     4 | `tsconfig.json`                                               | Include project-local plugin TypeScript in strict checks and allow explicit `.ts` imports for Quartz's native-ESM local loader | Keep plugin code inside repository safety gates | Low    |
|     5 | `package.json`                                                | Add output-validation script only                                                                                              | Rerunnable proof                                | Low    |
|     6 | `scripts/validate-graph-output.mjs`                           | Add generated-artifact checks                                                                                                  | Prevent semantic/CDN regressions                | Low    |

## 12. Incremental implementation steps

### Step 1 — Manifest model and emitter

- Change: implement validated graph types, deterministic builder, unit tests, and static emitter.
- Verification: targeted tests and TypeScript.
- Rollback point: remove local package without touching content.

### Step 2 — Two graph views

- Change: add local sidebar and global dialog views over the shared artifact, accessible list, keyboard interaction, and lifecycle cleanup.
- Verification: production build, browser desktop/mobile checks, SPA navigation, dialog interaction.
- Rollback point: disable the one config entry.

### Step 3 — Generated-output proof

- Change: add and run a graph artifact/CDN validator; run project gates.
- Verification: content validation, tests, build, Wrangler dry-run, Playwright/manual browser evidence.
- Rollback point: static rollback of the feature files/config.

## 13. Test plan

### Unit

| Behavior                | Test/fixture                     | Expected result                                      |
| ----------------------- | -------------------------------- | ---------------------------------------------------- |
| Immutable page identity | valid/malformed/duplicate IDs    | only valid unique UUID IDs; collisions fail          |
| Authored relationships  | repeated, self, unresolved links | directed edge count retained; invalid edges excluded |
| Tag membership          | repeated tags and page tags      | one dotted membership per page/tag                   |
| Folder semantics        | nested slugs                     | cluster metadata only; no folder edge kind           |
| Determinism             | reordered input fixture          | byte-equivalent manifest ordering                    |

### Integration/build

| Behavior               | Command/test                       | Expected result                                                               |
| ---------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Full repository checks | `npm run check`, `npm test`        | changed files and suites pass; unrelated baseline findings reported literally |
| Canonical content      | `npm run validate:content`         | pass                                                                          |
| Real static output     | `npx quartz build --concurrency=1` | graph artifact and component assets emitted                                   |
| Output contract        | `npm run validate:graph`           | manifest valid and no forbidden graph CDN signatures                          |
| Worker topology        | `npx wrangler deploy --dry-run`    | assets-only dry-run succeeds                                                  |

### End-to-end/UI

| Flow                       | Viewports/input modes      | Evidence                                                                  |
| -------------------------- | -------------------------- | ------------------------------------------------------------------------- |
| Compare local/global views | Desktop mouse and keyboard | Sidebar screenshot, open-dialog screenshot, focus/close/navigation checks |
| SPA lifecycle              | Two internal navigations   | one component/dialog; no duplicate handlers or console errors             |
| Mobile default             | Narrow viewport            | component hidden and graph artifact not requested                         |

### Accessibility

- Buttons/dialog use native semantics, accessible names, visible focus, and an explicit close control. Native Escape handling is provided by the platform dialog; the browser automation did not independently prove Escape dismissal.
- The relationship list is a nonvisual alternative.
- Line style, markers, labels, and legend communicate semantics beyond color.
- Reduced-motion mode removes transitions.

### Security

No auth/mutation path. Validate static JSON as unknown. Scan graph assets for remote runtime library URLs and private path markers.

### Performance

The emitted showcase contains 19 page nodes, 1 tag node, and 39 relationships. A deterministic synthetic fixture built 500 page nodes, 10 tag nodes, 1,990 authored edges, and 500 tag edges in 11.3 ms in the local diagnostic test run. This is model-construction evidence, not a claim that the native-SVG global layout is suitable for 500 visible pages. At 760 px, the component was hidden, body width matched scroll width, and the isolated server log contained no `knowledgeGraph.json` request.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: existing validator remains authoritative; graph reads IDs without changing them.
- Backward-compatible window: disabling the plugin restores current Backlinks-only behavior.
- Deployment order: build static graph and pages together.
- Registry/manifest synchronization: one build owns both.
- User-visible impact: new sidebar panel and optional full-screen dialog on content pages.

## 15. Deployment plan

Local demo and dry-run only. No secrets, bindings, D1, deployment, DNS, or production approval are part of this request.

## 16. Rollback and recovery

Remove/disable the local plugin config entry and rebuild. No data is migrated or written at runtime; Markdown, IDs, and links are untouched.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                                          | Impact                                          | How it will be resolved                                                            | Stop condition?                                  |
| --------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| Plugin loader cannot support combined local emitter/component package | Feature cannot remain local without core change | Prove against installed loader before build                                        | Yes; do not patch core                           |
| Processed link metadata differs from documented behavior              | Wrong edges                                     | Unit fixtures plus generated-manifest inspection                                   | Yes if unresolved                                |
| Native SVG becomes unreadable at representative scale                 | Global view weak                                | Dense-layout styles and 500-node synthetic model test; defer force engine decision | No for current showcase unless interaction fails |
| Existing dirty files overlap                                          | Owner work could be overwritten                 | Inspect status/diff before and after; patch only scoped lines                      | Yes if conflict cannot be isolated               |

## 18. Adversarial review

1. Generated navigation does not become an edge because the emitter counts only parsed body-anchor `data-slug` values before generated page chrome/category tables exist.
2. Page identity is the immutable frontmatter UUID; slugs are routing metadata, so a move does not regenerate an ID.
3. The emitter receives only the already filtered published corpus and does not copy attachments or private inputs.
4. No principal-scoped data or persistence exists in this slice.
5. No client identity or role is accepted.
6. The only new public contract is the documented, versioned `knowledgeGraph.json` schema.
7. Client fetch/validation/render failure updates the optional graph status and does not alter the article.
8. D1 is not used.
9. Rollback removes one plugin config entry and static rebuild; no user data is migrated.
10. Authored links, tags, and folders remain distinct node/edge/cluster concepts; no semantic relationships were added.
11. No assertion, non-null assertion, suppression, or fallback canonical data was added in project graph code.
12. Browser JSON is parsed from `unknown` with explicit discriminated-union validation.
13. No existing test was weakened or skipped; seven graph tests were added.
14. Setup tears down per-page handlers/resources through `window.addCleanup`; browser navigation returned one panel and one dialog.
15. Quartz component and navigation lifecycle behavior was verified in pinned source and the real browser.
16. No dependency, global selector, corpus reparse, or quadratic graph-construction path was introduced.

## 19. Completion evidence

### Commands and results

```text
npm run validate:content
Content validation passed: 19 entities, 19 unique IDs.

npm test
173 tests passed across 45 suites; 7 graph-specific tests include a 500-page/2,490-edge fixture.

npx tsc --noEmit
Passed.

npx quartz build --concurrency=1
Passed; 62 files emitted.

npm run validate:graph
Passed: 19 pages, 1 tag, 39 relationships, 12 graph-enabled HTML pages; no forbidden D3/Pixi CDN signature.

npx wrangler deploy --dry-run
Passed: 74 static assets read; no bindings; no deployment performed.

npm run check
TypeScript passed. Repository-wide Prettier remains red on 8 pre-existing documentation files outside this slice. Targeted Prettier and git diff checks for changed graph files passed.
```

### Generated artifacts inspected

- `public/static/knowledgeGraph.json`: schema version 1; 20 nodes; 39 edges; UUID page IDs; tag namespace; no folder edge kind.
- representative content HTML: one local graph panel, one accessible relationship list, and one native global dialog.
- Worker dry-run: assets-only; no bindings.

### UI evidence

- Desktop local view: ready state with 4 direct relationships on the representative Learning Log page.
- Global view: 20 visible nodes, 5 folder regions, 39 relationships, zoom control changed the SVG view box, and no browser warnings/errors.
- User-style graph link navigation reached the target article; browser history returned to the original page with exactly one graph panel/dialog.
- Narrow 760 px view: graph hidden, body width equaled body scroll width, and isolated server output had no graph-manifest request.
- Keyboard/accessibility: native button/dialog/link semantics, named dialog, labeled zoom/close controls, visible focus CSS, shape/line-style legend, text relationship list, and reduced-motion override.

### Deviations from plan

- The project-local component entry uses `.ts` plus Preact `h()` instead of `.tsx`. Quartz's bundled build dynamically imports local component subpaths through Node; the pinned runtime loaded `.ts` but rejected raw `.tsx`. The local plugin boundary was preserved and Quartz core was not patched.
- The full repository formatting gate still reports eight unrelated documentation files. They were not reformatted because this slice preserves unrelated owner work.

### Known limitations

- The deterministic SVG layout is intentionally a showcase-scale map, not a force-directed engine or a 500-visible-node scalability claim.
- The current corpus has only one controlled tag, so the dotted tag layer is visually sparse.
- Pan/drag physics are not implemented; the global comparison provides focus highlighting and zoom/reset controls.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Non-goals not implemented accidentally.
- [x] All applicable PRD acceptance gates pass.
- [x] Contracts/docs updated.
- [x] Tests/evidence attached.
- [x] Security/privacy review complete.
- [x] Rollback documented.
- [x] Known limitations documented.
- [x] Plan completion log updated.
- [x] Plan moved to `completed/` only after evidence is recorded.

## 21. Completion log

| Date       | Commit        | Work completed                                                                             | Evidence                                                                                                        | Remaining                     |
| ---------- | ------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 2026-08-30 | Not committed | Planned the shared-manifest local/global graph comparison                                  | Context7 docs plus installed loader/graph source inspection                                                     | Implementation and validation |
| 2026-08-30 | Not committed | Implemented and browser-verified the local sidebar graph and expandable global vault graph | 173 tests; real build; graph validator; Wrangler dry-run; desktop, navigation, and narrow-view browser evidence | Owner comparison and choice   |

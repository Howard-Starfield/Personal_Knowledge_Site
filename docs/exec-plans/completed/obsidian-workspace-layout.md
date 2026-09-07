# Execution Plan: Obsidian-style workspace layout repair

| Field           | Value                                               |
| --------------- | --------------------------------------------------- |
| Status          | Complete                                            |
| Owner           | Product owner with Codex implementation support     |
| Created         | 2026-08-30                                          |
| Updated         | 2026-08-30                                          |
| Baseline commit | `c97512f` with preserved owner working-tree changes |
| Target branch   | `v5`                                                |
| PR              | Not created                                         |
| PRD phase       | Public frontend repair within the local showcase    |
| Related ADRs    | None. Phase 5 graph work remains separate.          |

## 1. Objective

Give the local public site a compact, linked-note workspace appearance and remove horizontal layout overflow at desktop, tablet, and mobile widths. Preserve readable Markdown when optional JavaScript features fail.

## 2. Non-goals

- Do not enable the installed graph package. It downloads D3 and PixiJS from a runtime CDN and fails `FR-GRAPH-02`.
- Do not implement the Phase 5 graph manifest, graph renderer, quizzes, comments, capture, D1, Access, deployment, or content-model changes.
- Do not patch Quartz core or add dependencies.
- Do not modify or discard the owner's existing mock-content and validation work.

## 3. Acceptance gates

- `FR-UI-01`: explorer/search remain at left, reading remains central, and table of contents/backlinks remain at right where space permits.
- `FR-UI-02`: reading remains primary on mobile and article/table content does not overflow horizontally.
- `FR-UI-03`: authored content and generated navigation remain visually distinct without relying only on color.
- No document-level horizontal overflow at 390, 800, 1024, 1280, and 1440 CSS pixels.
- Light and dark themes retain visible focus and readable contrast.

## 4. Instruction and source verification

| Scope      | Source                                                               | Finding                                                                                        |
| ---------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Repository | `AGENTS.md`                                                          | Plan before code, preserve dirty work, no runtime CDN graph, verify browser lifecycle.         |
| Product    | `docs/product/PRD.md` sections 16, 18, and Phase 5                   | Graph stays optional and locally bundled; side context must yield to reading at narrow widths. |
| Layout     | `quartz/styles/base.scss` and `quartz/styles/variables.scss`         | Quartz uses 320px side tracks. `.center` has `min-width: 100%`.                                |
| Graph      | `node_modules/@quartz-community/graph@0.1.0` README and distribution | The component loads D3 and PixiJS from jsDelivr at runtime.                                    |

Exact installed versions remain those recorded in `docs/architecture/VERSION_MATRIX.md`: Quartz `5.0.0`, graph `0.1.0`, and TypeScript `5.9.3`.

## 5. Reproduction and root cause

At 1024px, Playwright measured a 1041px document and a center column ending at 1040.75px. At 1280px, the custom center padding increased the center box beyond its grid track, overlapping the right rail. The custom `4.7rem` article title made the overlap visible. The fix belongs in the project stylesheet: make the center a border box with `min-width: 0`, use smaller side tracks, constrain the title, and keep wide tables inside their existing `.table-container` scroller.

## 6. Design

The visual direction is a public notebook workspace rather than a field-manual poster. Light mode uses graphite, paper gray, and muted violet; dark mode uses charcoal layers and a brighter violet link color. Sidebars read as tool panes, while the center remains a quiet note canvas. Typography returns to a compact system UI with a monospace metadata layer. The distinctive element is the visible three-pane workspace boundary, not decorative background graphics.

No ADR is required because this changes project configuration and `custom.scss` only. A graph implementation still requires its own Phase 5 plan and architecture decision.

## 7. File touch plan

| Order | File                        | Change                                                                         | Risk   |
| ----: | --------------------------- | ------------------------------------------------------------------------------ | ------ |
|     1 | `quartz.config.yaml`        | Replace the fieldbook palette with the notebook palette.                       | Low    |
|     2 | `quartz/styles/custom.scss` | Repair sizing and restyle the workspace, cards, tables, and responsive states. | Medium |
|     3 | This plan                   | Record commands, screenshots, and completion status.                           | Low    |

Static contracts, frontmatter, IDs, graph semantics, APIs, D1, and media are unchanged.

## 8. Test plan

- Run `npm run validate:content`, focused tests, TypeScript, and a real Quartz build.
- Use Playwright against the built local site at 390x844, 800x900, 1024x768, 1280x800, and 1440x900.
- Assert `documentElement.scrollWidth === clientWidth` on representative article, folder, and index routes.
- Inspect screenshots for reading width, sidebar collision, table containment, focus visibility, light mode, and dark mode.
- Check browser console errors and confirm article content remains available with JavaScript disabled if the CLI permits the probe.

## 9. Rollback and stop conditions

Rollback is limited to the two project presentation files. No content or user data changes. Stop if the repair requires a Quartz core patch, a new dependency, a graph semantic change, or remote runtime code.

## 10. Adversarial review

- Generated navigation does not become a graph edge.
- IDs, links, routes, aliases, and content are unchanged.
- No unpublished files or assets enter output.
- No API, identity, database, or remote dependency is added.
- Graph failure cannot affect article reading because graph remains disabled.
- The responsive fix targets the actual grid owner and does not hide overflow at the document root.

## 11. Completion evidence

- `npm run validate:content`: passed, 19 entities and 19 unique IDs.
- `npm test`: passed, 166 tests across 45 suites, with no failures or skips.
- `npx tsc --noEmit`: passed.
- Focused Prettier and `git diff --check`: passed.
- `npx quartz build --concurrency=1`: passed, 59 emitted files.
- `npx wrangler deploy --dry-run`: passed, 63 static files and no bindings.
- Playwright measured equal document and viewport widths at 390, 800, 1024, 1280, and 1440px. At 390px, tables retain a 576px scroll width inside a 358px container without widening the document.
- The open mobile explorer measures exactly 390px from viewport edge to viewport edge and does not widen the document.
- Browser console: zero errors and zero warnings on the representative article and homepage flows.
- Light and dark article screenshots, folder layout, mobile article, mobile homepage, and open explorer evidence are under `output/playwright/`.

The installed graph package remains disabled. Its runtime CDN behavior still conflicts with `FR-GRAPH-02`; a compliant graph is a separate Phase 5 implementation.

# Execution Plan: Category Index Tables and LLM Maintainer Entrypoint

| Field           | Value                                          |
| --------------- | ---------------------------------------------- |
| Status          | Completed                                      |
| Owner           | Product owner with Codex documentation support |
| Created         | 2026-08-22                                     |
| Updated         | 2026-08-22                                     |
| Baseline commit | `c01f387`                                      |
| Target branch   | `v5`                                           |
| PR              | Not created                                    |
| PRD phase       | Product-contract clarification before Phase 1  |
| Related ADRs    | None; no architecture boundary changes         |

## 1. Objective

Make every public category `index.md` append an accessible generated table of its published direct children, make course indexes use a type-specific lesson table, and identify the repository-root `AGENTS.md` as the LLM maintainer entry point without duplicating the full contract into one drifting handoff file.

## 2. Non-goals

- Do not implement Quartz components, schema validators, fixtures, or builds.
- Do not recursively flatten all descendants into every parent category.
- Do not make arbitrary `index.md` files enumerate the filesystem.
- Do not change folder, tag, link, graph, ID, question-bank, or publication semantics.
- Do not restore, discard, stage, commit, or deploy unrelated dirty work.

## 3. Acceptance gates copied from the PRD

- Category `index.md` remains a real curated page with its own immutable ID.
- Generated listing rows remain navigation and do not create authored graph edges.
- Draft, archived, unintended, and duplicate/alias outputs remain excluded.
- Course ordering is derived from validated lesson entities, not filenames or filesystem enumeration.
- An LLM maintainer is directed through the repository instruction hierarchy rather than a stale copied mega-document.

## 4. Instruction sources

| Scope/path | Instruction file    | Relevant rules                                                   |
| ---------- | ------------------- | ---------------------------------------------------------------- |
| Repository | `AGENTS.md`         | PRD authority, plan-before-change, identity and graph invariants |
| `content/` | `content/AGENTS.md` | Content placement, generated navigation, authoring evidence      |

Verification: both instruction files and the active PRD/content contract were read before edits.

## 5. Version and environment matrix

Not applicable to this documentation-only decision. Exact runtime versions and Quartz extension points remain Phase 0/Phase 1 evidence gates.

## 6. Official source verification

No new library, framework, API, CLI, or cloud behavior is assumed. This plan records an owner product decision and does not implement Quartz behavior.

## 7. Repository reconnaissance

The PRD currently says a category page "may" list descendants, while `CONTENT_MODEL.md` shows `listingScope: descendants` and excludes category indexes from the table. This does not guarantee the owner's intended direct-folder contents table. Course indexes currently say "outline" without requiring a table.

## 8. Contracts and invariants

- Direct child means an immediately nested published content entity, not every recursive descendant.
- The current category `index.md` never lists itself.
- A direct child category appears as a row; its own descendants remain on its own page.
- Generated rows are navigational only and never graph edges.
- Type controls index behavior: category table, course lesson table, Learning Log listing, or curated standalone page.
- IDs and explicit relationships remain unchanged.

## 9. Proposed design

Require a curated introduction plus a generated direct-child table for every public category. Use a distinct generated lesson table for course indexes. Keep the homepage and standalone pages curated unless an explicit content-type contract adds a listing.

## 10. Data and schema changes

Documentation contract only. Remove the provisional `listingScope: descendants` example from the baseline category frontmatter. A later recursive-listing option requires a schema/contract change.

## 11. File touch plan

| Order | File/path                         | Change                                                                | Reason                            | Risk |
| ----: | --------------------------------- | --------------------------------------------------------------------- | --------------------------------- | ---- |
|     1 | `docs/product/PRD.md`             | Require direct-child category tables and type-specific index behavior | Product authority                 | Low  |
|     2 | `docs/contracts/CONTENT_MODEL.md` | Correct category/course examples and table rules                      | Normative content contract        | Low  |
|     3 | `content/AGENTS.md`               | Constrain content authors and agents                                  | Prevent manual/recursive listings | Low  |
|     4 | `AGENTS.md`                       | Declare the LLM maintainer entry point/read chain                     | Safe handoff                      | Low  |
|     5 | This plan                         | Record checks and adversarial completion                              | Evidence                          | Low  |

## 12. Incremental implementation steps

1. Correct the category and course index contracts.
2. Add the maintainer handoff entry-point rule.
3. Scan for stale descendant-listing language, structural Markdown errors, and graph-semantic drift.

## 13. Test plan

Documentation checks: one H1 per edited file, balanced fenced blocks, unique requirement IDs, no stale `listingScope: descendants`, and consistent direct-child/type-specific wording. Runtime/UI/accessibility proof remains Phase 1 work.

## 14. Migration and compatibility

No content migration is performed. Any future content already using `listingScope` must be inventoried during Phase 1 before executable validation is introduced.

## 15. Deployment plan

Not applicable; no deploy is authorized.

## 16. Rollback and recovery

Documentation-only changes can be reverted without user data impact. The prior PRD is archived separately.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                                  | Impact                                            | Resolution                                                      | Stop?           |
| ------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------- | --------------- |
| Quartz extension cannot emit the required table safely        | Contract cannot be implemented without core patch | Phase 1 source spike/ADR                                        | Yes             |
| Direct-child classification is ambiguous after aliases/routes | Duplicate or missing rows                         | Use canonical source entities and physical parent at build time | Yes if unproven |
| One-file LLM handoff drifts from contracts                    | Unsafe maintenance                                | Use `AGENTS.md` as entry point with linked authority chain      | No              |

## 18. Adversarial review

| Challenge                                                                   | Result                                                                                                              |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Could a parent duplicate every grandchild?                                  | No; only immediate canonical children are eligible and recursive flattening is prohibited.                          |
| Could a subcategory disappear because category indexes were excluded?       | No; immediate child category indexes are required rows.                                                             |
| Could the table list itself?                                                | No; the current `index.md` is explicitly excluded.                                                                  |
| Could drafts, archives, attachments, aliases, or permalinks leak/duplicate? | They are explicitly excluded and targeted fixtures are required.                                                    |
| Could filesystem order become content order?                                | No; order is explicit `order`, normalized title, then immutable ID.                                                 |
| Could a course list unrelated files as lessons?                             | No; membership uses validated `courseId`, and the table sorts by `lessonOrder`.                                     |
| Could question banks appear as lessons?                                     | No; practice banks require a separate labeled section after OQ-09 approval.                                         |
| Could generated rows become knowledge-graph relationships?                  | No; graph isolation remains an explicit invariant and test gate.                                                    |
| Could every generic `index.md` dump its folder?                             | No; generated behavior is selected by validated content type.                                                       |
| Could one copied handoff file drift from repository policy?                 | No hand-maintained bundle was added; root `AGENTS.md` is the entry point and requires access to linked authorities. |

## 19. Completion evidence

Structural checks reported one H1 per edited document, balanced fences, and unique PRD requirement IDs. A targeted scan found no live `listingScope: descendants` or optional descendant-listing wording. Required handoff-chain files all exist. No runtime artifact is claimed because this is a product-contract change and the pre-existing checkout toolchain remains unresolved.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Direct-child and type-specific rules agree across documents.
- [x] Generated navigation remains graph-isolated.
- [x] LLM entry point is explicit and nonduplicative.
- [x] Structural checks pass.
- [x] Plan ready to move to `completed/`.

## 21. Completion log

| Date       | Commit        | Work completed                                                                                         | Evidence                                                            | Remaining                              |
| ---------- | ------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | -------------------------------------- |
| 2026-08-22 | Not committed | Required direct-child category tables, course lesson tables, and the root LLM-maintainer handoff chain | Structural/requirement/stale-contract checks and adversarial review | Runtime implementation remains Phase 1 |

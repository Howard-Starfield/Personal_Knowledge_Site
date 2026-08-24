# Execution Plan: PRD Public Learning Revision

| Field | Value |
|---|---|
| Status | Complete |
| Owner | Product owner with Codex documentation support |
| Created | 2026-08-22 |
| Updated | 2026-08-22 |
| Completed | 2026-08-22 |
| Baseline commit | `c01f387` |
| Target branch | `v5` |
| PR | Not created |
| PRD phase | Pre-implementation product-contract correction |
| Related ADRs | None approved; this revision precedes implementation |

## 1. Objective

Correct the product contract so it describes a public knowledge and course site with publicly readable learning annotations, optional public discussion, and Git-authored interactive quizzes. Remove the unapproved assumption that learning records require a private, login-gated D1 product.

## 2. Non-goals

- Do not implement Quartz components, quizzes, comments, Cloudflare services, or content migration.
- Do not restore or discard the existing dirty worktree.
- Do not select a public comment provider beyond documenting the verified Giscus option and its limitations.
- Do not decide whether quiz progress must sync across devices; retain that as an explicit product question.
- Do not deploy, commit, stage, or publish.

## 3. Acceptance gates

- [x] The PRD uses unambiguous terms for inline annotations, Learning Log entries, and comments.
- [x] Public reading does not require login.
- [x] Owner/site mutation and optional visitor discussion are not conflated.
- [x] Pre-authored quiz questions, answers, and explanations remain canonical Markdown/Git content.
- [x] The PRD states that answers shipped in static output are not secret or exam-secure.
- [x] Giscus is described as an optional GitHub Discussions integration, not the canonical annotation store.
- [x] Course and lesson content contracts have stable IDs and ordered navigation.
- [x] Phase order does not require Access/D1 before those foundations exist.
- [x] The frontmatter/examples document is placed at the canonical content-contract path.
- [x] Unresolved product choices are clearly labeled rather than guessed.

## 4. Instruction sources

| Scope/path | Instruction file | Relevant rules |
|---|---|---|
| Repository | `AGENTS.md` | PRD authority, plan before change, source verification, no invented Quartz APIs, preserve dirty work |
| `docs/` | No nested `AGENTS.md` present | Root instructions apply |

Verification: `rg --files -g "AGENTS.md"` returned only the repository-root file.

## 5. Version and environment matrix

| Component | Exact version/commit | Source of truth | Notes |
|---|---|---|---|
| Repository baseline | `c01f387` | `git log` | Initial Quartz 5 commit on `v5` |
| Quartz | `5.0.0` at baseline | `git show HEAD:package.json` | Current working-tree `package.json` is deleted |
| Node | `v22.16.0` at baseline | `git show HEAD:.node-version` | Current working-tree file is deleted |
| Comments plugin | `@quartz-community/comments` `0.1.0` | installed `package.json` | Supports Giscus only |
| Cloudflare runtime | Unpinned | Current repository | Not selected by this documentation revision |

## 6. Official source verification

| Claim/assumption | Official URL | Verified date | Installed source file/symbol | Finding |
|---|---|---|---|---|
| Quartz comments provider | `https://quartz.jzhao.xyz/plugins/comments` | 2026-08-22 | `node_modules/@quartz-community/comments/dist/index.d.ts` | Current plugin supports Giscus and GitHub repository/discussion configuration |
| Comments runtime behavior | `https://quartz.jzhao.xyz/plugins/comments` | 2026-08-22 | `node_modules/@quartz-community/comments/dist/index.js` | Loads `https://giscus.app/client.js`; it is an external runtime dependency |
| Custom plugin surface | `https://quartz.jzhao.xyz/advanced/making-plugins` | 2026-08-22 | `node_modules/@quartz-community/types/dist/index.d.ts` | Quartz exposes transformer, filter, emitter, and page-type/component extension surfaces |
| Quiz availability | Quartz docs and installed plugin search | 2026-08-22 | `docs/`, `node_modules/@quartz-community/` | No installed or documented first-party/community quiz plugin was located; implementation must be a verified local extension or separately reviewed plugin |

## 7. Repository reconnaissance

### Current behavior reproduced

- The product PRD now exists at `docs/product/prd.md`, but root instructions refer to case-sensitive `docs/product/PRD.md`.
- No active execution plan existed before this file.
- `docs/contracts/FRONTMATTER_EXAMPLES.md` contains examples only, while the target repository layout names the canonical contract `docs/contracts/CONTENT_MODEL.md`.
- The installed Comments plugin supports only Giscus and maps discussions using mutable page properties such as URL/title/path unless a stable custom-term integration is added.
- The current worktree remains intentionally untouched despite 18 tracked changes and untracked product documentation.

### Relevant code map

| Area | File/symbol | Current responsibility | Expected change |
|---|---|---|---|
| Product contract | `docs/product/prd.md` | Private-note-heavy platform contract | Revise to public learning/course contract and correct phase sequence |
| Content contract | `docs/contracts/FRONTMATTER_EXAMPLES.md` | Frontmatter examples | Move/expand as `CONTENT_MODEL.md`, including course, lesson, and quiz authoring contracts |
| Repository instructions | `AGENTS.md` | Enforces obsolete private-data baseline | Align terminology and product invariants with revised PRD |

## 8. Contracts and invariants

- Markdown and Git remain canonical for public articles, lessons, quiz questions, answers, explanations, and durable owner-authored annotations.
- Public reading, course navigation, quiz attempts, answer reveal, and explanations do not require authentication.
- Optional comments are a discussion surface and do not redefine canonical content, quiz answers, graph relationships, or immutable identity.
- If browser mutation is later added, read-public and write authorization are separate decisions.
- Content IDs, quiz IDs, and question IDs do not derive from paths, titles, or list positions.
- Generated quiz controls, answers, and comment links do not create authored graph edges.
- Article reading survives quiz, comments, graph, video, and API failure.

## 9. Proposed design

Revise the baseline around three distinct learning surfaces:

1. Canonical public knowledge/course content in Markdown.
2. Canonical pre-authored quizzes in validated Markdown data blocks, enhanced in the browser and readable without JavaScript.
3. Optional Giscus discussion for quick public follow-up comments, explicitly noncanonical and subject to GitHub/Giscus availability and posting identity.

Owner-authored durable reminders and follow-up questions should default to Git-authored Markdown. A later owner-only browser writing flow may publish them through a reviewed Git pull request or a separate public-read/write-protected store.

### Alternatives considered

| Alternative | Benefit | Problem | Decision |
|---|---|---|---|
| Put all annotations in public D1 | Immediate browser writes | Adds API/auth/moderation/backup complexity and duplicates Git-authored learning content | Not baseline |
| Treat Giscus comments as canonical notes | Existing UI and GitHub moderation | External runtime, GitHub dependency, mutable mapping risk, weak structured quiz/reminder contract | Optional discussion only |
| Put large quiz arrays in frontmatter | One schema location | Makes metadata unwieldy and poor to author/read | Use validated fenced blocks in the Markdown body |
| Git-authored quiz blocks with client enhancement | Durable, reviewable, static, portable | Answers are visible in source/static output | Baseline; not exam-secure by design |

No ADR is required for a pre-implementation correction to the unimplemented baseline. Implementation of a new public mutation store or custom comment identity mapping will require its own decision record if it adds a production service/dependency.

## 10. Data and schema changes

- Add `course` and `lesson` content types.
- Add stable course membership/order fields for lessons.
- Define versioned `knowledge-quiz` fenced data blocks with stable quiz/question IDs.
- Define public annotation callouts for durable owner-authored questions/reminders.
- Remove private-note/D1 records from the required baseline.
- Keep optional authenticated administration and synchronized progress as later decisions.

D1 migrations, APIs, and media changes are not applicable to this documentation-only revision.

## 11. File touch plan

| Order | File/path | Change | Reason | Risk |
|---:|---|---|---|---|
| 1 | `docs/product/prd.md` -> `docs/product/PRD.md` | Correct case and revise product contract | Match root authority and clarified product | High: broad contract change |
| 2 | `docs/contracts/FRONTMATTER_EXAMPLES.md` -> `docs/contracts/CONTENT_MODEL.md` | Establish canonical content contract and examples | Match intended repository structure | Medium |
| 3 | `AGENTS.md` | Align enforced invariants with revised product | Prevent agents implementing obsolete private architecture | Medium |
| 4 | `content/AGENTS.md` | Add the required nested content-authoring rules | Remove the existing governance bootstrap blocker | Low |
| 5 | This plan | Record evidence and completion | Required governance | Low |

## 12. Incremental implementation steps

1. Correct document paths/case and content-contract placement.
2. Replace private-note baseline language with public learning, course, quiz, and optional discussion contracts.
3. Repair phase ordering and acceptance gates.
4. Align root agent instructions.
5. Run term, path, link, and adversarial consistency scans.

## 13. Test plan

- Static searches for obsolete baseline claims (`private notes`, public-comment non-goal, login-gated reading, Phase 4/5 dependency inversions).
- Static searches for required new contracts (`course`, `lesson`, `knowledge-quiz`, public annotation, Giscus limitations).
- Verify all local Markdown links and governed paths exist with exact case.
- Inspect Git diff and confirm unrelated dirty files are unchanged.

Runtime, browser, accessibility, security, and performance tests are not applicable because no production code is changed. Their requirements remain in the revised PRD for later implementation.

## 14. Migration and compatibility

No content or user-data migration exists because implementation has not started. The revised PRD supersedes version 1.0 before production data exists.

## 15. Deployment plan

Not applicable. No deployment is authorized.

## 16. Rollback and recovery

This documentation revision can be reverted as a file-level change. No database, media, deployed resource, or generated content is affected.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown | Impact | Resolution | Stop condition? |
|---|---|---|---|
| Who may post public comments | Moderation and identity requirements | Ask owner after consolidation | Blocks comment implementation, not PRD revision |
| Whether quiz progress persists | Could add browser storage or D1/auth | Ask owner after consolidation | Blocks progress implementation |
| Stable Giscus mapping by content ID | Moves can detach discussions | Spike local override/provider behavior | Blocks relying on comments as durable records |
| Course sequencing model | Affects navigation and prerequisites | Use ordered lessons as provisional contract; confirm with owner | Blocks implementation if rejected |
| Existing dirty checkout | Build remains unavailable | Preserve and resolve separately | Blocks implementation, not documentation revision |

## 18. Adversarial review

1. Generated category, course, Learning Log, quiz, and comments navigation is explicitly excluded from authored graph edges.
2. Content, course, lesson, learning-note, quiz, and question identity does not derive from path, title, date, or order.
3. Quiz answers and explanations are intentionally public and the product cannot claim exam security.
4. Published learning annotations are intentionally public; restricted content remains prohibited from public output.
5. Comments are noncanonical external discussion, with stable mapping, moderation, privacy, CSP, and failure gates before enablement.
6. A page move cannot be claimed to preserve a Giscus thread until immutable content-ID mapping is proven or migration is accepted.
7. Quiz and comment JavaScript failure leaves article/lesson content and the quiz Q&A fallback readable.
8. Access/D1 no longer precede their approved user job; they are optional Phase 6 infrastructure.
9. Managed browser upload no longer precedes its identity/authorization foundation.
10. The custom graph is deferred until after the course/quiz baseline and the current runtime-CDN problem is recorded.
11. The original v1.0 contract is archived rather than destroyed.
12. The required nested `content/AGENTS.md` now exists and makes the public-content boundary explicit.

## 19. Completion evidence

- Active PRD: `docs/product/PRD.md`, one H1, 1,085 lines after revision.
- Archived PRD: `docs/product/archive/PRD-v1.0.md`, 3,017 lines.
- Canonical content contract: `docs/contracts/CONTENT_MODEL.md`.
- Installed Comments evidence: `@quartz-community/comments` `0.1.0`; Giscus-only public options and external `giscus.app/client.js` loader inspected.
- Callout evidence: checked-out Quartz docs list built-in `question`, `todo`, `note`, and `warning` callouts.
- Static scans found no duplicate requirement IDs, obsolete live contract paths, or old managed-video `assetId` mapping.
- Markdown fence counts are balanced by marker length in the edited PRD and content contract.
- Git status confirmed the pre-existing deleted toolchain files remain unresolved and were not restored or discarded by this documentation task.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Non-goals preserved.
- [x] Product terminology is internally consistent.
- [x] Contract examples match PRD fields.
- [x] Sources and installed behavior are recorded.
- [x] Known limitations and follow-up questions remain explicit.
- [x] No unrelated dirty work changed.

## 21. Completion log

| Date | Commit | Work completed | Evidence | Remaining |
|---|---|---|---|---|
| 2026-08-22 | Not committed | Revised and adversarially reviewed the product, content, and authoring contracts | Static source/path/requirement/fence scans recorded above | Product-owner answers to PRD open questions before affected phases |

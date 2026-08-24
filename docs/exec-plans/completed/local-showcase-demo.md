# Execution Plan: Local Knowledge Fieldbook Showcase

| Field           | Value                                                                             |
| --------------- | --------------------------------------------------------------------------------- |
| Status          | Complete                                                                          |
| Owner           | Product owner                                                                     |
| Created         | 2026-08-24                                                                        |
| Updated         | 2026-08-24                                                                        |
| Baseline commit | `c01f387a6a44a24148214059cba04b7f6847784e` with preserved dirty working tree      |
| Target branch   | `v5`                                                                              |
| PR              | None                                                                              |
| PRD phase       | Local representative fixture spanning Phase 0 proof and Phase 1 presentation only |
| Related ADRs    | ADR-0002; ADR-0001 is historical only                                             |

## 1. Objective

Turn the one-page Quartz fixture into a polished, locally testable public
knowledge-site showcase. The showcase demonstrates the capabilities already
approved and available through pinned Quartz—public reading, generated folder
navigation, search, explorer, tags, backlinks, popovers, dark mode, callouts,
course-shaped content, a Learning Log, and semantic answer disclosure—while
clearly labeling later/gated features that are not implemented.

Housekeeping adds a project README and a small documentation map plus project-
level architecture, testing, and security summaries. It does not reset, delete,
mass-format, or commit the existing dirty working tree.

## 2. Non-goals

- Do not implement or silently approve the provisional question-bank/quiz
  schema while PRD OQ-09 remains open.
- Do not add scoring JavaScript, persisted progress, D1, Access, owner capture,
  comments, graph, managed media, analytics, or a browser CMS.
- Do not add dependencies, patch Quartz core, upgrade packages, or resolve the
  existing supply-chain/deployment blockers in this slice.
- Do not deploy, push, commit, create cloud resources, change DNS, or mutate
  secrets.
- Do not delete upstream documentation, historical plans, the typo-named
  `docs/mainter_agent.md`, or any unrelated/user-owned dirty path.
- Do not claim the demo content is a completed Phase 1/2 implementation.

## 3. Acceptance gates

- [x] The homepage states what is live, what is preview-only, and what remains
      gated; no decorative control implies unavailable behavior.
- [x] Public demo routes cover a category, nested category, article, course,
      lessons, Learning Log entry, and feature guide with immutable random UUIDs.
- [x] Search, explorer, dark mode, tags, backlinks, popovers, generated folder
      listings, callouts, task lists, tables, and native answer disclosure can be
      exercised in the local browser.
- [x] Course lessons remain freely navigable and their authored links are
      intentional relationships, not completion gates.
- [x] The answer-disclosure prototype uses semantic `<details>` markup and is
      explicitly not the unresolved executable bank-backed quiz implementation.
- [x] Responsive layouts remain readable at desktop and mobile widths; focus is
      visible and reduced-motion preferences are respected.
- [x] Private authoring/wiki artifacts do not enter `public/`.
- [x] Project navigation docs explain the authority split without copying the
      entire instruction stack into another mega-document.
- [x] Required static, test, build, and browser evidence is recorded honestly.

## 4. Instruction sources

| Scope/path       | Instruction file                                      | Relevant rules                                                          |
| ---------------- | ----------------------------------------------------- | ----------------------------------------------------------------------- |
| Repository       | `AGENTS.md`                                           | Plan first; preserve dirty work; no core patch/deploy; required checks  |
| Public content   | `content/AGENTS.md`                                   | IDs, public boundary, source/quiz rules, generated navigation semantics |
| Product          | `docs/product/PRD.md`                                 | Public-first baseline; Phase 0–2 boundaries; OQ-09 gate                 |
| Content contract | `docs/contracts/CONTENT_MODEL.md`                     | Frontmatter and content-type contracts                                  |
| Architecture     | `docs/decisions/ADR-0002-separate-personal-wiki.md`   | Personal wiki is outside blog authority                                 |
| Foundation plan  | `docs/exec-plans/active/phase-0-online-foundation.md` | Local build evidence and outstanding deployment blockers                |

The user-pasted documentation-structure recommendation was treated as advisory
input, not repository authority. Its useful distinction—project-wide testing
and security guidance versus per-slice plans—is adapted without replacing the
existing PRD/ADR/plan hierarchy.

## 5. Version and environment matrix

| Component  | Exact version/commit                                       | Source of truth                | Notes                                                               |
| ---------- | ---------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Quartz     | `5.0.0`, commit `c01f387a6a44a24148214059cba04b7f6847784e` | `package.json`, Git HEAD       | Pinned local source                                                 |
| Node       | Local `v24.14.0`; project `.node-version` `v22.16.0`       | local runtime; `.node-version` | Compatible diagnostic runtime; exact-pin proof remains Phase 0 debt |
| npm        | Local `11.9.0`; engine `>=10.9.2`                          | local runtime; `package.json`  | Existing Phase 0 reproducibility limitation                         |
| TypeScript | `5.9.3` resolved                                           | lockfile/version matrix        | No TS feature code planned                                          |
| Prettier   | resolved project version                                   | lockfile/version matrix        | Targeted changed-file check                                         |
| Wrangler   | `4.125.0`                                                  | package/lock                   | Dry-run only; no deployment                                         |

## 6. Official and installed-source verification

| Claim                                                                           | Official/current source                         | Verified   | Installed source inspected                                                                | Finding                                                                                 |
| ------------------------------------------------------------------------------- | ----------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Quartz scans Markdown below `content/` and uses configured ignore patterns      | Context7 `/jackyzha0/quartz`, `quartz/build.ts` | 2026-08-24 | `quartz/build.ts`                                                                         | Build is content-driven; `private/` remains outside inputs                              |
| YAML config owns theme, SPA, and plugin/layout composition                      | Context7 `/jackyzha0/quartz`, `quartz/cfg.ts`   | 2026-08-24 | `quartz.config.yaml`, `quartz/plugins/loader/config-loader.ts`                            | Config/local SCSS is sufficient; no core patch needed                                   |
| Raw semantic HTML including `details` is parsed                                 | pinned repository/source                        | 2026-08-24 | `@quartz-community/obsidian-flavored-markdown@0.1.1`, `rehypeRaw`                         | Native disclosure can demonstrate answer reveal without a new schema/script             |
| Folder pages generate direct child/subfolder listings                           | pinned installed plugin                         | 2026-08-24 | `@quartz-community/folder-page@0.1.0`, `FolderContent`, `pagesFromTrie`                   | Suitable for showcase navigation; it is not the final PRD-mandated category table       |
| Page CSS classes are derived from frontmatter, and body has stable slug context | pinned installed plugin/core                    | 2026-08-24 | `@quartz-community/content-page@0.1.0`, `ContentBody`; `quartz/components/renderPage.tsx` | Showcase styling can remain scoped; slug selectors avoid adding a new frontmatter field |
| Local preview command is supported                                              | pinned docs                                     | 2026-08-24 | `docs/cli/build.md`, `quartz/bootstrap-cli.mjs`                                           | `npx quartz build --serve --port <port>` is the supported preview route                 |

Context7 first returned the Java scheduler for “Quartz”; the refined library
lookup resolved the correct SSG IDs `/jackyzha0/quartz` and
`/websites/quartz_jzhao_xyz`. No documentation fallback was silently assumed.

## 7. Repository reconnaissance

- Branch `v5`, HEAD `c01f387`; the working tree contains pre-existing tracked
  deletions/modifications plus untracked project docs/config/content.
- The current public site has one placeholder page and emits 39 files.
- `quartz.config.yaml` enables explicit publishing, explorer, search,
  backlinks, article title, content metadata, tags, dark mode, breadcrumbs,
  folder pages, and content index. Comments, graph, analytics, and feeds are
  disabled.
- `quartz/styles/custom.scss` is empty aside from imports.
- `docs/mainter_agent.md` is a short legacy handoff and is not referenced;
  root `AGENTS.md` already owns maintainer entry.
- Phase 0 still blocks external deployment on URL/base metadata, remote runtime
  policy, dependency hardening, and exact runtime proof.

## 8. Contracts and invariants

- `content/` plus Git remains canonical for every published demo page.
- New IDs are random UUIDv4 values generated once with `New-Guid`; they are not
  derived from title, path, date, order, or rendered output.
- Every demo page explicitly sets `publish: true`, `status: active`, and public
  content metadata.
- No private/raw source is used. Demo copy is original and makes only bounded,
  general technical claims.
- Generated folder lists, explorer, breadcrumbs, course browsing, tags,
  backlinks, and answer controls do not become explicit graph edges.
- Authored internal links are intentional public knowledge relationships.
- OQ-09 remains open; no `knowledge-question-bank` or `knowledge-quiz` block is
  authored or parsed.
- The semantic answer preview is public, no-JavaScript compatible, nonsecure,
  and has no stored attempt state.

## 9. Proposed design

### Design thesis

The subject is a retrieval-systems fieldbook for a working learner. The page's
single job is to let a visitor move from “read” to “test” to “revisit” without
mistaking a content index for a marketing landing page.

### Tokens

| Role           | Token     |
| -------------- | --------- |
| Deep channel   | `#123247` |
| Retrieval blue | `#1f6987` |
| Signal amber   | `#d99a32` |
| Mist paper     | `#eef4f4` |
| Graphite ink   | `#18252c` |
| Night field    | `#0d1b24` |

Typography uses a compact technical display stack (`Bahnschrift`,
`Arial Narrow`, system sans), a highly readable UI/body stack (`Aptos`, Segoe
UI, system sans), and `Cascadia Mono`/system monospace for evidence labels.
All are local/system fonts; no runtime font request is added.

### Layout

```text
desktop
┌──────── context ────────┬──────────── field note ────────────┬──── evidence ────┐
│ title/search/explorer   │ thesis + signal rail               │ toc/backlinks     │
│                        │ live capability map                 │                   │
│                        │ generated collection listing        │                   │
└────────────────────────┴──────────────────────────────────────┴───────────────────┘

mobile
┌──────────────────────────────┐
│ title + tools                │
│ thesis                       │
│ vertical signal rail         │
│ content + answer disclosure  │
│ generated listings           │
└──────────────────────────────┘
```

The signature is a “signal rail”: a restrained amber route through four real
learning operations—orient, inspect, test, revisit. It appears once on the
homepage; supporting pages remain quiet.

### Self-critique before build

The first concept risked becoming a generic dark technical dashboard with cards
and glowing gradients. It was revised to a light field-manual surface with one
structural amber rail, restrained square geometry, and evidence-style labels.
The design avoids a generic metric hero, decorative numbering, runtime web
fonts, and scattered animation. Motion is limited to focus/hover affordances
and disabled under reduced motion.

No ADR is required: this uses existing configuration, local SCSS, built-in
plugins, authored Markdown, and native HTML disclosure without changing an
architecture boundary.

## 10. Data and schema changes

- Static/content: add valid public page/category/course/lesson/learning-note
  fixtures and preserve the homepage ID.
- Executable quiz schema: none.
- D1/API/media/auth: not applicable.
- Theme: project-owned color tokens and scoped SCSS only.

## 11. File touch plan

| Order | File/path                                                                                 | Change                                                     | Risk   |
| ----: | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------ |
|     1 | This plan                                                                                 | Record scope, sources, design, and evidence                | Low    |
|     2 | `README.md`, `docs/README.md`                                                             | Add project entry points and documentation map             | Low    |
|     3 | `docs/architecture/ARCHITECTURE.md`                                                       | Summarize approved system boundaries                       | Low    |
|     4 | `docs/TESTING_STRATEGY.md`, `docs/SECURITY.md`                                            | Separate project-wide test/security guidance               | Low    |
|     5 | `content/index.md`                                                                        | Replace placeholder with honest showcase home; preserve ID | Medium |
|     6 | New files under `content/knowledge-systems/`, `content/courses/`, `content/learning-log/` | Add representative public demo content                     | Medium |
|     7 | `quartz.config.yaml`                                                                      | Update site title and local theme colors only              | Low    |
|     8 | `quartz/styles/custom.scss`                                                               | Add scoped fieldbook visual system                         | Medium |

## 12. Incremental implementation steps

1. Add the documentation map/summary files and verify every authority link.
2. Add the public showcase content with immutable IDs and intentional links.
3. Apply the scoped visual system and build until emitted markup matches the
   pinned plugin behavior.
4. Run static checks, tests, real build, private-leak scan, and browser UAT.
5. Reconcile evidence and leave the local preview command for the owner.

## 13. Test plan

### Static/content

- frontmatter parses and every published demo entity has one unique UUID;
- routes and internal links resolve;
- no `knowledge-question-bank` or `knowledge-quiz` block exists;
- no private workflow/source marker enters `public/`;
- output contains the expected routes, semantic `details`/`summary`, callouts,
  and generated folder listings.

### Project checks

- targeted Prettier for changed Markdown/YAML/SCSS;
- `npx tsc --noEmit`;
- `npm test`;
- `npx quartz build --concurrency=1`;
- `npx wrangler deploy --dry-run` only if the existing Phase 0 config remains
  unchanged and the command needs no cloud mutation.

### Browser UAT

- desktop homepage visual/semantic snapshot;
- mobile homepage and course lesson readability;
- search opens and finds a demo route;
- dark mode toggles;
- internal navigation and popover/backlink behavior;
- native answer disclosure opens with keyboard/click;
- console has no project-authored error;
- screenshot evidence under `output/playwright/` (ignored or removed from
  hand-authored source after inspection).

## 14. Migration and compatibility

No user-data migration. The placeholder homepage keeps its ID. New demo pages
are first-publication fixtures with new random IDs. Removing the showcase later
requires an explicit content decision because published IDs must not be reused;
the simplest rollback before publication is reverting only this plan's files.

## 15. Security and privacy

No private source, capture, secret, account, external widget, or browser write
path is added. Answer content is intentionally public. Raw HTML is limited to
semantic static disclosure markup; no scripts, event handlers, arbitrary iframe,
or unsafe URL is authored.

## 16. Stop conditions

- Stop before executable quizzes until OQ-09 is explicitly resolved.
- Stop if correct demo behavior requires a Quartz core patch, new dependency,
  remote runtime script, or unsupported lifecycle hook.
- Stop if a generated page leaks private/unpublished content or if any required
  ID/link/route cannot be proven.
- Stop before external deployment while Phase 0 blockers remain.

## 17. Completion evidence

- Housekeeping added a project README, documentation map, and focused
  architecture, testing, and security summaries. Existing dirty paths and the
  legacy handoff filename were preserved; no reset, deletion, commit, push, or
  deployment occurred.
- Content validation parsed 13 published Markdown entities and proved 13 unique
  UUIDv4 IDs, explicit publication, and active status. The executable-quiz scan
  excluded repository instructions and found no question-bank or quiz blocks
  in publishable content.
- Targeted Prettier passed for every file in this slice. `git diff --check` and
  `npx tsc --noEmit` passed.
- `npm test` passed 163 of 163 tests with zero failures, skips, or todos.
- `npx quartz build --concurrency=1` found 14 Markdown inputs, filtered the
  non-publishable `content/AGENTS.md`, and emitted 53 production files.
- The production-output scan found every representative route, the signal rail,
  semantic recall disclosures, and no broken-link marker, raw wiki-link tail,
  private intake path, content-authoring path, or personal-wiki marker.
- `npx wrangler deploy --dry-run` passed with Wrangler `4.125.0`; it read 63
  static assets, found no bindings, and performed no deployment.
- Playwright UAT at `http://localhost:8080` proved search and content preview,
  explorer navigation, internal-link popovers, backlinks, persisted dark mode,
  zero browser-console errors, click and Enter-key recall disclosure, and a
  390-pixel viewport with `scrollWidth === innerWidth`.
- The Knowledge Systems category exposed exactly its two direct children and
  did not flatten the nested evaluation article into the parent listing.
- Inspected screenshots are retained below ignored `output/playwright/`:
  `home-desktop.png`, `home-mobile.png`, `article-dark.png`, and
  `category-desktop.png`.

Known limitations remain explicit: the PRD-mandated semantic category table is
still Phase 1 work; executable bank-backed quizzes remain gated by OQ-09; and
the Phase 0 `baseUrl`, runtime-CDN policy, dependency-hardening, and exact-
runtime issues still block external deployment.

## 18. Adversarial review

- Generated listings remain navigation and did not become authored graph edges.
- All new IDs are random UUIDv4 values and are not path/title derived.
- Gated features are labeled and have no fake controls.
- Public-output scans found no private authoring or personal-wiki markers.
- No authentication, D1, API, media, or user-specific state exists in this
  slice; cross-principal and destructive migration questions are not
  applicable.
- No client identity, runtime data cast, type suppression, non-null assertion,
  fallback canonical data, weakened test, dependency, core patch, global
  listener, browser corpus scan, or production binding was added.
- Raw semantic HTML is static and keyboard accessible; reduced-motion and focus
  rules are present in scoped project SCSS.
- Rollback is file-local and does not delete user data. Published demo IDs must
  not be reused if the fixture is later replaced after publication.

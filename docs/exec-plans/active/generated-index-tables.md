# Execution Plan: Phase X — Generated index tables (every course, and every course with practice)

| Field           | Value                                                                      |
| --------------- | -------------------------------------------------------------------------- |
| Status          | In progress                                                                |
| Owner           | Site maintainer (agent)                                                    |
| Created         | 2026-10-25                                                                 |
| Updated         | 2026-10-25                                                                 |
| Baseline commit | `f6bf758` (merge of PR #36)                                                |
| Target branch   | `feat/generated-index-tables`                                              |
| PR              | [#37](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/37) |
| PRD phase       | Public-learning baseline; navigation of published study material           |
| Related ADRs    | None required (see §9)                                                     |

## 1. Objective

Two pages need to show the whole library without a hand-written list:

- the **homepage** (`content/index.md`) names three featured courses and points at the
  catalogue; it does not show the other fourteen;
- the **Practice** page (`content/practice.md`) names three assessments and says that
  every quiz-bearing lesson links its own key, but it does not list the 109
  quiz-bearing lessons and their answer keys.

Observable outcome: the homepage carries a generated table of **every** course with its
lesson count and quiz count, and the Practice page carries a generated index of every
course that has practice material, each quiz-bearing lesson next to its answer key.
Both are built from the content tree at build time, so they cannot drift from the
material they describe.

## 2. Non-goals

- No change to any lesson, bank, quiz, or question.
- No change to the graph's semantics, the Explorer, the chapter navigation, or any
  other plugin.
- No new runtime JavaScript, no new dependency, no new page.
- No change to the three featured courses already on the homepage, or to the three
  assessments already on the Practice page.

## 3. Acceptance gates

- [ ] G1 — the homepage lists all seventeen courses, each linked, with lesson and quiz
      counts that match the content tree.
- [ ] G2 — the Practice page lists every quiz-bearing lesson and its answer key, for
      all four courses that have practice material.
- [ ] G3 — the generated listings create **no** authored graph edges.
- [ ] G4 — the listings are generated at build time; no listing is committed to
      Markdown.
- [ ] G5 — the required checks pass, and the live pages show the tables.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                                  |
| ----------- | ------------------- | ------------------------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; PR boundary; strict TypeScript; generated files out of source |
| Nested path | `content/AGENTS.md` | Curated content only; generated listings create no authored graph edges         |

`AGENTS.md` line 100: "Generated category-table links, course lesson tables, quiz UI,
comments, explorer links, breadcrumbs, search results, and UI navigation do not create
explicit graph edges."
`content/AGENTS.md` line 104 repeats it and adds: "Do not hand-maintain generated
listings in Markdown."

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                                                    | Official URL   | Verified date | Installed source file/symbol                                | Finding                                                                                                                                                           |
| ----------------------------------------------------------------------------------- | -------------- | ------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A page's links become authored graph edges only when the anchor carries `data-slug` | the repository | 2026-10-25    | `plugins/knowledge-graph/index.ts` (`collectAuthoredLinks`) | The manifest reads `child.properties?.["data-slug"]`; an anchor without that property is not an edge.                                                             |
| The graph manifest is built from the parsed trees, not the rendered page            | the repository | 2026-10-25    | `plugins/knowledge-graph/index.ts` (`emit`)                 | The emitter walks `content` — the trees from `quartz/processors/parse.ts`. `renderPage` transforms a **clone**, so render-time output never reaches the manifest. |
| Quartz's own generated listing produces no `data-slug` anchors                      | the built page | 2026-10-25    | `public/courses/index.html`                                 | The folder listing renders 17 course links and the page carries exactly **1** `data-slug` anchor (the authored link in the body).                                 |
| A page-type plugin can transform the rendered tree with every file's metadata       | the repository | 2026-10-25    | `quartz/plugins/pageTypes/dispatcher.ts` (line 168)         | `treeTransforms` from every page-type plugin are collected and applied in `renderPage`, with `componentData.allFiles`.                                            |
| A quiz-bearing lesson and its bank are already linked by immutable ID               | the repository | 2026-10-25    | `plugins/knowledge-quiz/index.ts` (remark pass)             | The quiz block carries `questionBankId`; the bank page's frontmatter `id` is the bank ID. The parsed values are on `file.data`.                                   |
| A local plugin is registered in `quartz.config.yaml` by path                        | the repository | 2026-10-25    | `quartz.config.yaml`                                        | `./plugins/knowledge-quiz` is enabled with an `order`; `plugins/knowledge-quiz/package.json` declares `category: ["transformer", "pageType"]`.                    |

## 7. Repository reconnaissance

### The first attempt, and why it was rejected

The work started as committed Markdown: a generated block between
`<!-- generated:courses -->` markers, written by `scratch/cc-scope/generate_indexes.py`.
Two defects were found before anything was published.

1. **The tables did not parse.** Each cell held a wiki-link whose alias separator is a
   pipe — `[[courses/x/index|Course]]` — and a bare pipe inside a Markdown table cell
   splits the row. Every row had one cell too many, the link never formed, and the
   title rendered as stray text. The repository's own working course table escapes the
   separator (`[[courses/…/lessons/01-…\|What the ACA Is…]]`, see
   `content/courses/covered-california-certification/index.md`), so the generator, not
   the convention, was wrong.
2. **The listings would have created authored graph edges.** A wiki-link in a Markdown
   body is an authored link, and `AGENTS.md` line 100 forbids generated listings from
   creating edges. A committed 130-row practice table would have added roughly 240
   edges from two pages, and `content/AGENTS.md` also forbids hand-maintaining a
   generated listing in Markdown at all.

The Markdown approach was therefore abandoned in favour of generating the tables at
build time.

### Relevant code map

| Area            | File/symbol                               | Current responsibility                       | Expected change                               |
| --------------- | ----------------------------------------- | -------------------------------------------- | --------------------------------------------- |
| The listings    | `content/index.md`, `content/practice.md` | Curated prose plus a marker                  | Curated prose plus a marker; no listing rows  |
| The generator   | _none_                                    | —                                            | New local plugin                              |
| The plugin      | `plugins/generated-index/`                | —                                            | New: a page-type plugin with a tree transform |
| Registration    | `quartz.config.yaml`                      | The plugin list                              | One more local plugin                         |
| Graph semantics | `plugins/knowledge-graph/index.ts`        | Builds the manifest from authored body links | Unchanged                                     |

### Existing tests and fixtures

- `npm run validate:content`, `npm run validate:graph`, `npm test`, `npx prettier . --check`,
  `npx quartz build` — the usual gates.
- `scripts/validate-graph-output.mjs` prints the page, tag, and relationship counts, so a
  change in the graph is visible in the build log.

## 8. Contracts and invariants

### Content identity

- [x] No content file's ID changes.
- [x] No lesson, bank, or question is touched.

### Graph

- [x] The generated listings create no authored edges (§6, §9).
- [x] The three assessments and the three featured courses keep their authored links.

### Security/data

- [x] No new script, request, storage write, or dependency.

### Type safety

- [x] Strict TypeScript; no `any`, no `as any`, no non-null assertion. Every value read
      from a file's metadata is treated as `unknown` and narrowed by a guard.

## 9. Proposed design

A new local plugin, `plugins/generated-index/`, registered as a page-type plugin with a
**tree transform**.

At render time the transform looks for one marker in the page body:

- `<!-- generated:courses -->` → the _every course_ table;
- `<!-- generated:practice -->` → the _every course with practice_ index.

If the marker is there, the transform replaces it with the generated markup. If it is
not, the page is untouched — the transform returns immediately, so the other 356 pages
cost one scan.

The data comes from `componentData.allFiles`, which the dispatcher already builds: every
published file's slug, frontmatter, and — for quiz-bearing lessons — the parsed quiz
selection with its `questionBankId`. Nothing is re-parsed from Markdown, and the corpus
is walked once per build, not once per page.

The generated anchors carry `class="internal internal-link"` and an `href` resolved with
Quartz's own `resolveRelative`, exactly like the folder listing in
`quartz/components/PageList.tsx`. They deliberately carry **no `data-slug`**, which is
what keeps them out of the graph manifest — the same mechanism that already keeps
Quartz's generated listings, the Explorer links, and the chapter navigation out of it.

### Alternatives considered

| Alternative                                           | Benefit                                      | Problem                                                                                     | Decision   |
| ----------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- |
| Commit the tables as Markdown                         | No code                                      | Breaks the table cells, creates ~240 authored edges, and hand-maintains a generated listing | Rejected   |
| A script that rewrites the Markdown before each build | Simple                                       | Same two defects; the listing still lives in the authored source                            | Rejected   |
| A build-time plugin that renders the tables           | Cannot drift; no edges; no listing in source | Needs a plugin, a marker, and tests                                                         | **Chosen** |

ADR status: **not required.** No package, framework, dependency, or graph-semantics
change; a local plugin, as `AGENTS.md` line 85 prefers.

## 10. Data and schema changes

None. The plugin reads the metadata Quartz already parsed.

## 11. File touch plan

| Order | File/path                                          | Change                                      | Reason                   | Risk |
| ----: | -------------------------------------------------- | ------------------------------------------- | ------------------------ | ---- |
|     1 | `docs/exec-plans/active/generated-index-tables.md` | This plan                                   | `AGENTS.md` requires one | None |
|     2 | `plugins/generated-index/package.json`             | Plugin manifest                             | Registration             | Low  |
|     3 | `plugins/generated-index/src/index.ts`             | The index builders (pure functions)         | Testable core            | Low  |
|     4 | `plugins/generated-index/src/render.ts`            | The HAST rendering of the two tables        | Markup                   | Low  |
|     5 | `plugins/generated-index/src/index.test.ts`        | Unit tests                                  | Gates                    | Low  |
|     6 | `plugins/generated-index/index.ts`                 | The page-type plugin and its tree transform | Wiring                   | Low  |
|     7 | `content/index.md`                                 | Marker replaces the committed table         | Generated listing        | Low  |
|     8 | `content/practice.md`                              | Marker replaces the committed table         | Generated listing        | Low  |
|     9 | `quartz.config.yaml`                               | Register the plugin                         | Wiring                   | Low  |

## 12. Incremental implementation steps

### Step 1 — The index builders

- Change: `plugins/generated-index/src/index.ts`.
- Verification: unit tests; `npm test`.
- Evidence: §19.
- Rollback point: revert the plugin directory.

### Step 2 — The rendering and the plugin

- Change: `plugins/generated-index/src/render.ts`, `plugins/generated-index/index.ts`,
  `quartz.config.yaml`.
- Verification: unit tests; the build.
- Evidence: §19.
- Rollback point: revert the plugin directory and the config line.

### Step 3 — The pages

- Change: `content/index.md`, `content/practice.md` — the committed tables become a
  marker; the curated prose is untouched.
- Verification: the built pages; a Playwright check of the rendered table.
- Evidence: §19.
- Rollback point: revert the two content files.

### Step 4 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior         | Command                    | Expected result                     |
| ---------------- | -------------------------- | ----------------------------------- |
| Index builders   | `npm test`                 | The new suite passes                |
| Content contract | `npm run validate:content` | 358 entities, unchanged             |
| Graph contract   | `npm run validate:graph`   | The relationship count is unchanged |
| The whole suite  | `npm test`                 | All pass                            |
| Formatting       | `npx prettier . --check`   | Clean                               |
| Types            | `npx tsc --noEmit`         | Clean                               |
| The site builds  | `npx quartz build`         | Exit 0                              |

### End-to-end/UI

| Flow                     | Viewport | Evidence                                                               |
| ------------------------ | -------- | ---------------------------------------------------------------------- |
| The homepage table       | 1440x900 | Seventeen rows, each title a working link                              |
| The Practice index       | 1440x900 | Four course sections; every lesson and answer key linked               |
| The graph is unchanged   | 1440x900 | The relationship count in the build log is the count before the change |
| A phone reads the tables | 390x844  | The table scrolls sideways; the page still loads                       |

### Accessibility

The tables are ordinary tables with header cells, so a screen reader announces the
column headers. Every link is a real anchor with its title as its accessible name.

### Security

Not applicable. Nothing is fetched, stored, or trusted from the client.

### Performance

The transform returns immediately for a page with no marker. For the two pages that do
have one, the corpus is walked once per build and the result is cached, so the cost is
one pass, not one pass per page.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: no ID changes.
- Backward-compatible window: a page without a marker renders exactly as before.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: two pages gain a generated listing.

## 15. Deployment plan

- Preview: the local build in `public/`, served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live homepage table and the live Practice index.
- Production approval: the owner approved this work on 2026-10-24.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds. The two pages fall back to their curated
prose, which is what they carried before.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                   | Impact                       | How it is resolved                                                                                              | Stop condition? |
| ---------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------- |
| The marker does not survive Markdown parsing   | No table appears             | The transform matches both a `raw` node and a `comment` node                                                    | No              |
| A course's lessons are not found by `courseId` | A lesson count reads zero    | The count is built from the same `courseId` membership the content contract uses; the build log shows every row | No              |
| A quiz names a bank that does not exist        | A row with no answer key     | The knowledge-quiz plugin already fails the build on an unknown bank                                            | No              |
| The generated links leak into the graph        | The relationship count grows | The anchors carry no `data-slug`; the count is compared before and after                                        | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — the anchors carry no
   `data-slug`, and the manifest is built from the source trees.
2. Could a file move break IDs, links, notes, media, aliases, or routes? **No** — no
   file moved; the listing is derived from the tree at build time.
3. Could unpublished content become public? **No** — the listing is built from the
   published files the build already filtered.
4. Could one principal access another's data? **No.**
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No** — the plugin reads Quartz's own
   `allFiles` and the knowledge-quiz plugin's parsed selection.
7. Does optional feature failure break article reading? **No** — a page without a
   marker is untouched, and a missing bank shows an em dash.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct? **Yes** — the
    curated links are unchanged, and the generated ones stay out of the graph.

## 19. Completion evidence

### 19.1 Commands and results

```text
npx quartz build --concurrency=1
  Found 359 input files from `content`
  Parsed 359 Markdown files in 29s
  Emitted 1013 files to `public` in 7s
  Done processing 359 files in 37s

npm run validate:content
  Content validation passed: 358 entities, 358 unique IDs

npm run validate:graph
  Graph output valid: 358 pages, 394 tags, 1897 relationships, 774 graph-enabled HTML pages.

npm test
  tests 264  pass 264  fail 0        (252 before this change, 12 added)

npx tsc --noEmit
  (no output)

npx prettier --check <the changed files>
  All matched files use Prettier code style!
```

### 19.2 Generated artifacts inspected

The graph manifest was built from `origin/v5` (`f6bf758`) and from this branch, and
the two were compared edge by edge:

```text
baseline edges: 1897  branch edges: 1897
removed (0):
added (0):
```

The edges of the two pages that carry a listing, read from the manifest:

```text
index -> Knowledge Fieldbook
  outgoing authored edges: 6
    -> practice
    -> courses/covered-california-certification/index
    -> learning-log/index
    -> courses/accounting-ai-crash-course/index
    -> courses/ai-agent-crash-course/index
    -> courses/index (x2)
practice -> Practice
  outgoing authored edges: 9
    -> the three assessments and their three banks
    -> courses/covered-california-certification/index
    -> courses/ai-agent-crash-course/index
    -> courses/accounting-ai-crash-course/index
```

Every one of those is an authored link in the curated prose. The fourteen courses
that appear only in the generated table, and the 109 lessons and 109 answer keys that
appear only in the generated index, are not edges.

The emitted HTML was counted:

```text
practice generated tables: 4
   32 rows, 32 lesson links, 32 bank links   (Accounting + AI)
   19 rows, 19 lesson links, 19 bank links   (AI Agent)
    1 row,   1 lesson link,   1 bank link    (AI Basics)
   57 rows, 57 lesson links, 57 bank links   (Covered California)
total rows: 109
homepage generated rows: 17, course links: 17
```

### 19.3 UI evidence

Driven with Playwright against the local build on `http://127.0.0.1:8099`:

```text
=== homepage ===
homepage generated tables: 1
homepage generated rows: 17
homepage headers: ['COURSE', 'LESSONS', 'WITH QUIZZES']
first course link: Account Management: Maintaining Relationships -> /courses/account-management-maintaining-relationships
last course link: How to Be an Agent Boss: Leading AI Agents at Work -> /courses/how-to-be-an-agent-boss
marker text visible: False
first row cells: ['Account Management: Maintaining Relationships', '7', '0']
after click, url: http://127.0.0.1:8099/courses/account-management-maintaining-relationships
course page title: Account Management: Maintaining Relationships

=== practice ===
practice generated tables: 4
practice generated rows: 109
practice course headings: ['Accounting + AI Crash Course', 'AI Agent Crash Course',
                           'AI Basics: What Every Professional Needs to Know',
                           'Covered California: Core Programme for Enrollers']
marker text visible: False
first lesson link: What Accounting Is Actually For -> /courses/accounting-ai-crash-course/lessons/01-what-accounting-is-for
after click, url: http://127.0.0.1:8099/courses/accounting-ai-crash-course/lessons/01-what-accounting-is-for
lesson page title: What Accounting Is Actually For

=== mobile (390x844) ===
mobile: {'bodyScrollW': 390, 'innerW': 390, 'tableContainer': True,
         'tableOverflowX': 'auto', 'tableWidth': 576, 'containerWidth': 358}
```

The page does not scroll sideways on a phone; the table scrolls inside the site's own
`.table-container`, which is the treatment every table on the site already has.

Screenshots: `scratch/cc-scope/index-home-table.png`,
`scratch/cc-scope/index-home-desktop.png`, `scratch/cc-scope/index-practice-phone.png`.

### 19.4 Deviations from plan

1. **The tables were not committed to Markdown.** The plan already recorded this as
   the rejected alternative; the implementation followed the chosen design, and the
   rejection is described in §7.
2. **A curated paragraph was restored.** The first draft of the Practice page had
   dropped the paragraph naming the AI Agent and Accounting crash courses. It was
   restored in `d146889` so that no authored content, and no graph edge, was lost.
3. **The generated listings carry no `data-slug`,** as designed; the graph is
   unchanged, which is the acceptance gate G3.

### 19.5 Live verification, after the merge

Pull request [#37](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/37)
merged into `v5` as `f118d32`. The live site was checked with Playwright against
`https://blog.howardlab.dev`:

```text
=== live homepage ===
generated tables: 1
generated rows: 17
headers: ['COURSE', 'LESSONS', 'WITH QUIZZES']
first: Account Management: Maintaining Relationships -> /courses/account-management-maintaining-relationships
last: How to Be an Agent Boss: Leading AI Agents at Work -> /courses/how-to-be-an-agent-boss
marker visible: False
after click: https://blog.howardlab.dev/courses/account-management-maintaining-relationships | Account Management: Maintaining Relationships

=== live practice ===
generated tables: 4
generated rows: 109
course headings: ['Accounting + AI Crash Course', 'AI Agent Crash Course',
                  'AI Basics: What Every Professional Needs to Know',
                  'Covered California: Core Programme for Enrollers']
marker visible: False

=== live phone (390x844) ===
{'bodyScrollW': 390, 'innerW': 390, 'rows': 17}

=== live graph manifest ===
total edges: 1897 authored: 694
```

The live manifest carries 1897 edges, the same count as before the merge, so the
listings reached the reader without touching the graph.

Screenshots: `scratch/cc-scope/live-home-table.png`,
`scratch/cc-scope/live-practice-phone.png`.

## 20. Final acceptance checklist

- [ ] Objective achieved.
- [ ] Non-goals not implemented accidentally.
- [ ] All acceptance gates pass.
- [ ] Contracts/docs updated.
- [ ] Tests/evidence attached.
- [ ] Security/privacy review complete.
- [ ] Migration/rollback documented.
- [ ] Known limitations documented.
- [ ] Plan completion log updated.

## 21. Completion log

| Date       | Commit    | Work completed                                                                                                                         | Evidence                                                                           | Remaining                                       |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| 2026-10-25 | `48ceb28` | The plugin `plugins/generated-index`, the two markers, the config line, the unit tests, and this plan                                  | §19                                                                                | —                                               |
| 2026-10-25 | `d146889` | The curated paragraph on the Practice page restored, so no authored link is lost                                                       | The graph is 1897 relationships before and after, with none added and none removed | —                                               |
| 2026-10-25 | `1928bb5` | The evidence recorded in §19                                                                                                           | §19                                                                                | —                                               |
| 2026-10-25 | —         | Pull request [#37](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/37) opened against `v5`                            | The pull request body carries the same evidence                                    | The CI run, then the merge, then the live check |
| 2026-10-25 | `3166a78` | The test file narrowed its element rows with a guard instead of a cast, so no assertion remains in the plugin                          | `npx tsc --noEmit` clean, 264 tests pass                                           | —                                               |
| 2026-10-25 | `f118d32` | Pull request [#37](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/37) merged into `v5` after a green CI run          | §19.5                                                                              | —                                               |
| 2026-10-25 | —         | The live site checked after the deploy: 17 courses on the homepage, 109 lessons and answer keys on the Practice page, 1897 graph edges | §19.5                                                                              | —                                               |

### Acceptance gates

| Gate                                                                                           | Result                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| G1 — the homepage lists all seventeen courses, linked, with counts that match the content tree | Pass — 17 rows, 17 links, counts 7/0, 32/32, 10/0, 15/0, 6/0, 7/0, 7/0, 19/19, 13/0, 7/1, 7/0, 7/0, 8/0, 11/0, 57/57, 8/0 |
| G2 — the Practice page lists every quiz-bearing lesson and its answer key                      | Pass — 4 courses, 109 rows, 109 lesson links, 109 bank links                                                              |
| G3 — the listings create no authored graph edges                                               | Pass — 1897 relationships before and after, 0 added, 0 removed                                                            |
| G4 — the listings are generated at build time, not committed to Markdown                       | Pass — `plugins/generated-index/`, two markers, no listing in `content/`                                                  |
| G5 — the checks pass and the live pages show the tables                                        | Pass — §19.1 and §19.5                                                                                                    |

### Known follow-ups (not part of this change)

- The owner's open items are unchanged: delete the leftover Vercel preview of the
  `backup/wip-2026-10-19` branch, and decide whether Mermaid's two remaining cdnjs
  imports are vendored or replaced.
- The thirteen courses that publish no question banks have no row in the practice
  index. Whether they should get practice material is the owner's call.

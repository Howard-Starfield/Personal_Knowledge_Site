# Execution Plan: Phase X — A Practice tab for the assessment material

| Field           | Value                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Status          | Complete                                                                                         |
| Owner           | Site maintainer (agent)                                                                          |
| Created         | 2026-10-24                                                                                       |
| Updated         | 2026-10-24                                                                                       |
| Baseline commit | `9a9ebbb139f70f5fcab7065eb27e2b305f8dd019`                                                       |
| Target branch   | `fix/practice-tab`                                                                               |
| PR              | [#26](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/26) (merged as `7b3868c`) |
| PRD phase       | Public-learning baseline; discoverability of published study material                            |
| Related ADRs    | None required (see §9)                                                                           |

## 1. Objective

The assessment material must be reachable in one tap from the left menu,
instead of three levels deep inside a course.

Observable outcome: the left menu carries a third top-level entry,
**Practice**, that opens a page listing the assessments, the memorisation
lessons and every answer key; and every quiz-bearing lesson on the site links
its own answer key.

## 2. Non-goals

- No change to any question, answer, explanation, quiz, bank, or lesson body
  other than a navigational link.
- No change to the Explorer package, its options, or any stylesheet.
- No change to the sixteen courses that publish no question banks.
- No new content claims.

## 3. Acceptance gates

- [ ] G1 — the left menu gains a third top-level entry that opens the Practice
      page in one tap.
- [ ] G2 — every quiz-bearing lesson on the site links its own question bank.
- [ ] G3 — the course page and the homepage both point at the new tab.
- [ ] G4 — the required checks pass and the live site serves it.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                   |
| ----------- | ------------------- | ---------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; graph invariants; required checks; PR boundary |
| Nested path | `content/AGENTS.md` | Content types and placement; links; public-content boundary      |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                              | Official URL                       | Verified date | Installed source file/symbol                                                                             | Finding                                                                                                                                       |
| ------------------------------------------------------------- | ---------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| A category folder renders as a folder that expands to nothing | `@quartz-community/explorer@0.1.0` | 2026-10-24    | `dist/index.js` → `N(u,e,D,F,…)`: folders render `div.folder-container`, files render `a.nav-file-title` | A category's index page is the folder node itself, so the entry carries no link                                                               |
| A root-level page renders as a link                           | same                               | 2026-10-24    | same                                                                                                     | Verified empirically by patching the built content index: a root-level file renders `<a href="/practice">`                                    |
| The package can turn folder titles into links                 | same                               | 2026-10-24    | `dist/index.d.ts` → `ExplorerOptions.folderClickBehavior`                                                | `"collapse" \| "link"`; the site sets `collapse` in `quartz.config.yaml`                                                                      |
| "exam" is the wrong word for this material                    | the package's own lint             | 2026-10-24    | `tools/lint_package.py`                                                                                  | Banned list: "certificate", "certificates", "credential", "credentials", "exam", "exams" — the material must not read as a certification exam |
| The contract's word for this surface is "practice"            | `docs/contracts/CONTENT_MODEL.md`  | 2026-10-24    | "Public banks may appear in a separately labeled practice section"                                       | The practice section is a reserved slot for exactly this material                                                                             |
| Answers are public                                            | `docs/product/PRD.md`              | 2026-10-24    | FR-PUB-03 / "exam security or secret answer storage"                                                     | The site must never present the material as secure or proctored                                                                               |

## 7. Repository reconnaissance

### Current behavior reproduced

```text
$ python scratch/cc-scope/explorer_category_route.py
Learning Log: url http://127.0.0.1:8099/ -> http://127.0.0.1:8099/   children after expand: 0
Practice:     url http://127.0.0.1:8099/ -> http://127.0.0.1:8099/   children after expand: 0
```

The left menu had two entries, "Courses" and "Learning Log". Both are
category folders, and a category folder's entry in the Explorer expands to
nothing: its index page _is_ the folder node, so there is nothing to expand
and nothing to navigate to. **Neither category page is reachable from the
left menu at all** — a pre-existing gap that also affects the Learning Log.

The assessments therefore had two routes, both poor: the Explorer tree, three
levels deep (Courses › Covered California › lessons › 57 lessons), and the
course page's table, which was unlinked until PR #21.

### Relevant code map

| Area              | File/symbol                                                 | Current responsibility                     | Expected change                                   |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| Left-menu entries | `@quartz-community/explorer@0.1.0` → `N(u,e,D,F,…)`         | Renders folders as toggles, files as links | A root-level page renders as a link — used        |
| Explorer options  | `quartz.config.yaml` → `folderClickBehavior: collapse`      | Folder titles toggle                       | Unchanged                                         |
| New surface       | `content/practice.md`                                       | —                                          | The Practice page                                 |
| Homepage          | `content/index.md`                                          | Featured-courses table and a bullet list   | Both point at the new surface                     |
| Course page       | `content/courses/covered-california-certification/index.md` | Curated body plus the lesson table         | A pointer to the Practice page                    |
| Lessons           | `content/courses/*/lessons/*.md`                            | Inline quiz block                          | 52 lessons in three other courses link their bank |

## 8. Contracts and invariants

### Content identity

- [x] Existing IDs preserved; one new UUIDv4 minted for the new page
      (`36216bc8-46e5-48f5-8758-8c6dc9b39ec4`).
- [x] No question bank ID or question revision changed.

### Category table

- [x] The new surface is a `page`, not a category folder, so it carries no
      generated child table and no category rules are engaged.

### Graph

- [x] The new page's links are authored body links, which the repository
      defines as explicit knowledge relationships.
- [x] Generated navigation still creates no edges.

### Security/data

- [x] No secret or private data enters static output.

## 9. Proposed design

1. **`content/practice.md`** — a root-level page titled "Practice". A root
   level file renders in the Explorer as a link, which a category folder does
   not, so the entry is one tap. Its curated body lists the three
   assessments with their answer keys, then points at the rest of the course
   and the other courses that publish banks.
2. **`content/index.md`** — the featured-courses table gains the Covered
   California course (the newest published course was missing from it), and
   the field-notes list gains a Practice bullet next to Courses and the
   Learning Log.
3. **`content/courses/covered-california-certification/index.md`** — one
   sentence pointing at the Practice page.
4. **The other three courses** — 52 quiz-bearing lessons that had no link to
   their own answer key now have one, by the same scripted edit and the same
   id check as the Covered California course.

### Alternatives considered

| Alternative                                        | Benefit                                                                  | Problem                                                                                                                   | Decision                                             |
| -------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| A category folder `content/practice/index.md`      | Matches the category pattern                                             | Renders as a dead entry in the Explorer: no link, expands to nothing                                                      | Rejected                                             |
| Switch the Explorer to `folderClickBehavior: link` | Every folder title becomes a link, which would also fix the Learning Log | Folders without an index (`lessons/`, `question-banks/`) get an empty href, so their titles would stop working as toggles | Rejected — left for the owner as a separate decision |
| Name the tab "Exams"                               | Matches the owner's word                                                 | The package's own lint bans "exam" and "exams" from this material, because it must not read as a certification exam       | Rejected                                             |
| Duplicate the lessons into the new folder          | A folder of its own                                                      | `content/AGENTS.md`: "Do not duplicate one article or lesson into multiple folders to simulate classification"            | Rejected                                             |

ADR status: **not required.** No framework, dependency, schema, identity, or
topology change; no package behaviour change.

## 10. Data and schema changes

- One new content entity: the Practice page.
- No manifest, no schema, no D1, no API change.

## 11. File touch plan

| Order | File/path                                                    | Change                                   | Reason                                                                      | Risk                            |
| ----: | ------------------------------------------------------------ | ---------------------------------------- | --------------------------------------------------------------------------- | ------------------------------- |
|     1 | `content/practice.md`                                        | New page                                 | The third left-menu entry                                                   | Low                             |
|     2 | `content/index.md`                                           | Featured row + Practice bullet           | The newest course was missing; the new tab is reachable from the front page | Low                             |
|     3 | `content/courses/covered-california-certification/index.md`  | One pointer sentence                     | The course points at the assessments                                        | Low                             |
|     4 | `content/courses/*/lessons/*.md` (52 files in three courses) | A link to the lesson's own question bank | The answer key is reachable from the lesson                                 | Low — one line each, id-checked |
|     5 | `docs/exec-plans/active/practice-tab.md`                     | This plan                                | `AGENTS.md` requires a plan                                                 | None                            |

## 12. Incremental implementation steps

### Step 1 — The new page and its entry points

- Change: items 1–3 above.
- Verification: the Explorer lists three top-level entries and the Practice
  entry opens the page in one tap, on desktop and on a phone.
- Evidence: §19.
- Rollback point: revert the three files.

### Step 2 — The other courses' lessons

- Change: item 4 above.
- Verification: 109 quiz-bearing lessons site-wide, each linking its bank.
- Evidence: §19.
- Rollback point: revert the lessons.

### Step 3 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior              | Command                         | Expected result              |
| --------------------- | ------------------------------- | ---------------------------- |
| Content validates     | `npm run validate:content`      | 358 entities, 358 unique IDs |
| The graph validates   | `npm run validate:graph`        | 1898 relationships           |
| The unit suite passes | `npm test`                      | 242 tests, 0 failures        |
| Formatting            | `npx prettier --check`          | Clean                        |
| Types                 | `npx tsc --noEmit`              | Clean                        |
| Build                 | `npx quartz build`              | Exit 0                       |
| Worker                | `npx wrangler deploy --dry-run` | Exit 0                       |

### End-to-end/UI

| Flow                            | Viewport      | Evidence                                                |
| ------------------------------- | ------------- | ------------------------------------------------------- |
| The left menu has a third entry | 390x844, 1440 | Explorer top level is `Courses, Learning Log, Practice` |
| Tapping Practice opens the page | 390x844 touch | URL becomes `/practice`, heading "Practice"             |
| Every assessment link resolves  | 390x844       | Six links on the page, all resolving                    |
| The homepage links the new tab  | 390x844       | The field-notes bullet and the featured row             |

### Accessibility

The new entry is a real link in the Explorer's file rendering, so it is
keyboard reachable, has an accessible name, and keeps the visible focus ring.
The page's own links use the page titles as their accessible names.

### Security

Not applicable — no new script, request, or storage write.

### Performance

One extra page; 52 extra anchors across 52 pages. No measurable effect.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: proven by `npm run validate:content`.
- Backward-compatible window: the new page is new; nothing changes for
  existing URLs.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: a third left-menu entry, a featured course on the
  homepage, and answer keys linked from every quiz-bearing lesson.

## 15. Deployment plan

- Preview: the local build in `public/`, served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live Practice page, the live left menu, and a lesson's
  answer-key link.
- Production approval: the owner asked for a tab showing the assessments and
  the final exam.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds. No user data is involved.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                                       | Impact                                                                            | How it is resolved                                                                                                    | Stop condition? |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------- |
| A root-level page is not a sanctioned surface                      | The contract lists `page` as an approved standalone page, and the homepage is one | The validator passes it; the contract's category rules do not apply to a page                                         | Yes             |
| The Learning Log stays a dead entry in the menu                    | The Learning Log page is still unreachable from the left menu                     | Pre-existing and reported to the owner; the `folderClickBehavior: link` option and its trade-off are written up in §9 | No              |
| "Practice" is not the word the owner expected                      | The tab is not called "Exams"                                                     | The package lint bans "exam" from this material, and the contract's word is "practice"; the owner can rename the page | No              |
| The other courses' banks are not reachable from their course pages | Their lesson→bank links now work                                                  | Verified across all 109 quiz-bearing lessons                                                                          | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — generated
   navigation is untouched.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no existing file moved; the new page has a new URL.
3. Could unpublished content become public? **No** — the new page is published
   deliberately by the owner's request; nothing else changed.
4. Could one principal access another's data? **No** — public static content.
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No.**
7. Does optional feature failure break article reading? **No** — a new page
   and links.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — the new links are explicit authored relationships.

## 19. Completion evidence

### 19.1 Commands and results

```text
npx prettier --check <the touched files>   All matched files use Prettier code style!
npx tsc --noEmit                            clean
npm test                                    tests 242 | pass 242 | fail 0
npm run validate:content                    358 entities, 358 unique IDs
npm run validate:graph                      358 pages, 394 tags, 1898 relationships
npx quartz build --concurrency=1            exit 0, no "✗" plugin-load lines
npx wrangler deploy --dry-run               exit 0
```

Link resolution was checked against `git ls-files`, not against the local
tree, after the first CI run exposed the difference (§19.4).

### 19.2 Generated artifacts inspected

- content manifest: 358 entities, 358 unique IDs (was 357 — the new page).
- graph manifest: 1898 relationships.
- built HTML: the Practice page and its links; the Explorer renders three
  top-level entries.

### 19.3 UI evidence

Against the deployed site, `https://blog.howardlab.dev`:

```text
desktop menu: [{'text': 'Courses', 'tag': 'div', 'href': None},
               {'text': 'Learning Log', 'tag': 'div', 'href': None},
               {'text': 'Practice', 'tag': 'a', 'href': '/practice'}]
  tapped Practice -> https://blog.howardlab.dev/practice
  heading: Practice

phone menu:   the same three entries
  tapped Practice -> https://blog.howardlab.dev/practice
  heading: Practice
```

Screenshots: `scratch/cc-scope/live-menu-practice.png` (the live phone drawer
with the new tab) and `scratch/cc-scope/live-phone-practice.png` (the live
Practice page on a phone).

### 19.4 Deviations from plan

1. The first attempt linked "AI Basics", a course that exists in the local
   working tree but is excluded from Git by `.git/info/exclude`. The link
   resolved locally and failed CI with `unresolved wiki link
"courses/ai-basics-what-every-professional-needs-to-know/index"`. Fourteen
   of the eighteen course folders in this working tree are local-only, so the
   local tree is **not** the published site: only `accounting-ai-crash-course`,
   `ai-agent-crash-course` and `covered-california-certification` are tracked.
   Every link added by this change was then checked against `git ls-files`,
   not against the local tree.
2. The Practice page began as a category folder, `content/practice/index.md`.
   The Explorer renders a category folder as a toggle with an empty child
   list, so it produced a dead entry in the menu. It was rewritten as a
   root-level page, which the Explorer renders as a link.

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

| Date       | Commit                                   | Work completed                                                           | Evidence                                                                                   | Remaining                                                                                            |
| ---------- | ---------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 2026-10-24 | `e6e1350` → merged as `7b3868c` (PR #26) | A Practice tab, a featured-course row, and 52 lessons linking their bank | §19 (live menu on desktop and phone, 358 entities, 1898 relationships, 242/242 unit tests) | The Learning Log is still unreachable from the menu; `folderClickBehavior: link` is the owner's call |

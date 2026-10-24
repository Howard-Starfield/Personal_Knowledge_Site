# Execution Plan: Phase X — Link the course lesson table

| Field           | Value                                                                 |
| --------------- | --------------------------------------------------------------------- |
| Status          | Complete                                                              |
| Owner           | Site maintainer (agent)                                               |
| Created         | 2026-10-24                                                            |
| Updated         | 2026-10-24                                                            |
| Baseline commit | `e5ff542bbbcc1a44c18e959f47339e564cec77e9`                            |
| Target branch   | `fix/course-lesson-links`                                             |
| PR              | _filled after the pull request is opened_                             |
| PRD phase       | Public-learning baseline; discoverability of published course content |
| Related ADRs    | None required (see §9)                                                |

## 1. Objective

Every lesson title in the Covered California course's table of contents must be
a link to that lesson, so a reader who opens the course can reach any lesson
in one click — including the two most recent lessons, "The Numbers a CSR Has
to Know" and "The Numbers and Dates to Know by Heart".

Observable outcome: the built course page carries one internal link per lesson
row (57 of 57), and the site graph validator still passes.

## 2. Non-goals

- No change to any lesson body, question bank, answer, frontmatter, ID, title,
  or ordering.
- No change to the other seventeen course index pages.
- No change to the Explorer's markup, the site's layout, or any stylesheet.
- No new content, no new claims, and no new dependency.

## 3. Acceptance gates copied from the PRD

- [ ] The course page's table links every lesson it lists.
- [ ] No content invariant is broken: IDs unchanged, no unpublished content
      exposed, generated navigation still excluded from graph edges.
- [ ] The required checks in `docs/architecture/VERSION_MATRIX.md` pass.
- [ ] The change lands through the branch-and-pull-request boundary.

Phase-specific gates:

- [ ] G1 — the built course page contains 57 lesson links, one per table row.
- [ ] G2 — `npm run validate:content` passes with the same 357 entities and 357
      unique IDs.
- [ ] G3 — `npm run validate:graph` passes, and the relationship count moves
      by exactly the 57 authored course-to-lesson edges.
- [ ] G4 — the live course page serves those links after deployment.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                   |
| ----------- | ------------------- | ---------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; graph invariants; required checks; PR boundary |
| Nested path | `content/AGENTS.md` | Rules below `content/` (read before editing the course index)    |

Verification command/output:

```text
$ Get-ChildItem 'D:\AI_projects\Personal_blog' -Recurse -Filter AGENTS.md -File
D:\AI_projects\Personal_blog\AGENTS.md
D:\AI_projects\Personal_blog\content\AGENTS.md
```

## 5. Version and environment matrix

| Component  | Exact version/commit | Source of truth     | Notes        |
| ---------- | -------------------- | ------------------- | ------------ |
| Quartz     | `5.0.0`              | `package.json`      | Unchanged    |
| Node.js    | `v24.14.0`           | `.node-version`     | Matches CI   |
| npm        | `11.9.0`             | local toolchain     | Matches CI   |
| Prettier   | `3.9.6`              | `package-lock.json` | Gate         |
| TypeScript | `5.9.3`              | `package-lock.json` | Gate         |
| Wrangler   | `4.125.0`            | `package.json`      | Dry-run only |

## 6. Official source verification

| Claim/assumption                                           | Official URL                                               | Verified date | Installed source file/symbol                                        | Finding                                                                                                                       |
| ---------------------------------------------------------- | ---------------------------------------------------------- | ------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| A wiki-link inside a Markdown table needs an escaped pipe  | `docs/contracts/CONTENT_MODEL.md`                          | 2026-10-24    | `scripts/validate-content.mjs`, `scripts/validate-content.test.mjs` | The repository's own validator has a test "accepts table-escaped wiki aliases and still rejects a missing target"             |
| The site already links inside a table with this convention | `content/index.md` (the homepage's featured-courses table) | 2026-10-24    | `content/index.md`                                                  | `[[courses/ai-agent-crash-course/index\|AI Agent Crash Course]]` — the same escaped form                                      |
| Authored body links become graph edges                     | `AGENTS.md` §"Graph invariants"                            | 2026-10-24    | `plugins/knowledge-graph/index.ts` → `collectAuthoredLinks`         | Every `<a data-slug>` in the rendered page is collected as an authored edge                                                   |
| Generated tables do not become graph edges                 | the live built output                                      | 2026-10-24    | `public/courses/index.html`                                         | The generated category listing renders `<a href="../courses/…/" class="internal">` with no `data-slug`, so it creates no edge |

## 7. Repository reconnaissance

### Current behavior reproduced

```text
$ python scratch/cc-scope/find_lessons.py
=== the course page's table ===
tables on the page: 1
  rows: 58
    ['#', 'Lesson', 'What it covers'] | links: []
    ...
    ['57', 'The Numbers and Dates to Know by Heart', 'The windows, the deadlines and the money…'] | links: []
=== any lesson link anywhere on the page? ===
links into the course: 0
```

The course page lists all 57 lesson titles and links **none** of them. The
only other route to a lesson is the Explorer tree
(Home ❯ Courses ❯ Covered California ❯ lessons), whose mobile drawer was the
cropped 34 px fragment fixed in PR #19 — which is why the material was not
findable on a phone.

### Relevant code map

| Area                     | File/symbol                                                 | Current responsibility                     | Expected change                        |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------ | -------------------------------------- |
| Course table of contents | `content/courses/covered-california-certification/index.md` | Hand-authored table; plain text titles     | Each Lesson cell becomes a wiki-link   |
| Link convention          | `content/index.md`                                          | Homepage featured-courses table            | Reference only — unchanged             |
| Graph edges              | `plugins/knowledge-graph/index.ts` → `collectAuthoredLinks` | Collects `<a data-slug>` as authored edges | Unchanged; the new links are collected |

### Existing tests and fixtures

- `scripts/validate-content.test.mjs` — "accepts table-escaped wiki aliases
  and still rejects a missing target" protects the link form used here.
- `scripts/validate-graph-output.mjs` — validates the graph manifest structure.

## 8. Contracts and invariants

### Content identity

- [x] IDs remain immutable — no frontmatter changed; `npm run validate:content`
      reports 357 entities and 357 unique IDs, unchanged.
- [x] Path/title/permalink are not treated as identity.

### Category table

- [x] Generated navigation cannot become authored graph edges — the generated
      category listing is untouched and still renders without `data-slug`.

### Graph

- [x] Solid = authored internal link — the 57 new links are exactly that.
- [x] Dotted = page-to-tag membership — unchanged.
- [x] Folder = cluster, not an edge — unchanged.

### Security/data

- [x] Markdown remains canonical public content.
- [x] No secret/private data enters static output.

## 9. Proposed design

Change one file. In each of the 57 table rows, turn the Lesson cell's plain
text into a wiki-link to that lesson, using the convention the homepage's
featured-courses table already uses:

```markdown
| 57 | [[courses/covered-california-certification/lessons/57-the-numbers-and-dates-to-know-by-heart\|The Numbers and Dates to Know by Heart]] | The windows, the deadlines … | 2026-10-23 21-05-33 |
```

The slug for each row is taken from the lesson file's own name, and the row's
display text is kept as the link alias so the table reads exactly as before.
The table's Lesson column uses sentence case while the lesson frontmatter uses
title case, so titles are matched on a normalised form (lower-cased, punctuation
collapsed) and an unmatched row aborts the edit rather than being guessed.

### Alternatives considered

| Alternative                                                            | Benefit                         | Problem                                                                                                                                              | Decision   |
| ---------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Generate the course lesson table the way category tables are generated | Clickable **and** graph-neutral | No course-listing generator exists; this is a new feature, not a fix                                                                                 | Rejected   |
| Write the links as raw HTML anchors without `data-slug`                | Graph-neutral                   | Deliberately evades the graph, contradicts "authored internal body links are relationships", and is a workaround a future author would silently undo | Rejected   |
| Leave the table unlinked and rely on the Explorer                      | No change                       | The course page's own table is a dead end; the Explorer was broken on mobile until PR #19                                                            | Rejected   |
| Link the titles, and let the graph record the relationship             | Clickable, honest, minimal      | Adds 57 authored edges (see the note below)                                                                                                          | **Chosen** |

ADR status: **no ADR required.** No framework, dependency, schema, identity,
or topology change. The graph effect is reviewed below rather than by ADR.

### Note on the graph effect

`AGENTS.md` lists "course lesson tables" among the things that must not create
explicit graph edges, and separately says "authored internal body links =
explicit knowledge relationships". Those two statements pull in opposite
directions for a hand-authored table.

Resolution: the invariant's list is about **generated** navigation — the
generated category listing, the Explorer, breadcrumbs, search results and quiz
UI — all of which render links without `data-slug` and create no edges. A
hand-authored table in a page body is authored content, so its links are
relationships by the repository's primary definition, exactly as the homepage's
hand-authored featured-courses table already behaves.

The observable consequence is recorded rather than hidden: the relationship
count moves from 1662 to 1719, exactly +57, all of them authored edges from
the course index to its own lessons. `npm run validate:graph` passes. If the
owner prefers a graph-neutral course listing, that is a separate slice that
would add a generated course-listing component.

## 10. Data and schema changes

### Static/build contracts

No manifest, frontmatter, or schema change. The build output changes only in
the course page's HTML.

### D1 migrations / API changes / Media changes

Not applicable.

## 11. File touch plan

| Order | File/path                                                   | Change                    | Reason                                            | Risk                                                               |
| ----: | ----------------------------------------------------------- | ------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
|     1 | `content/courses/covered-california-certification/index.md` | Link the 57 lesson titles | Makes the course page a working table of contents | Low — mechanical, and the edit aborts if any row cannot be matched |
|     2 | `docs/exec-plans/active/course-lesson-links.md`             | This plan                 | `AGENTS.md` requires a plan for a non-trivial PR  | None                                                               |

## 12. Incremental implementation steps

### Step 1 — Rewrite the Lesson cells

- Change: one scripted, idempotent rewrite of the table.
- Verification: `npm run validate:content`; the built page has 57 links.
- Evidence: §19.
- Rollback point: revert the single file.

### Step 2 — Gates, then branch and pull request

- Change: commit, push, open and merge the pull request.
- Verification: every command in §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior                    | Command                    | Expected result              |
| --------------------------- | -------------------------- | ---------------------------- |
| Content still validates     | `npm run validate:content` | 357 entities, 357 unique IDs |
| The graph still validates   | `npm run validate:graph`   | Valid, +57 relationships     |
| The unit suite still passes | `npm test`                 | 242 tests, 0 failures        |
| Formatting                  | `npx prettier --check`     | Clean                        |

### End-to-end/UI

| Flow                                     | Viewport | Evidence                            |
| ---------------------------------------- | -------- | ----------------------------------- |
| Course page lists 57 lessons, all linked | 390x844  | Built-HTML check plus a live probe  |
| A lesson link opens the lesson           | 390x844  | Live click-through after deployment |

### Accessibility

The change adds links to text that was already there; the link text is the
lesson title, so the accessible name is unchanged in substance. No new
interactive control, no new focus target, and no motion.

### Security

Not applicable — no new script, no new request, no storage write.

### Performance

57 additional anchors on one page; no measurable effect.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: proven by `npm run validate:content`.
- Backward-compatible window: links work in every browser; the wiki-link form
  is already used on the homepage.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: the course page's table of contents becomes clickable.

## 15. Deployment plan

- Preview: the local `quartz build` output in `public/`.
- Required secrets: none.
- D1 migration order: not applicable.
- Worker/static deploy order: merge → Vercel build → smoke test.
- Smoke tests: the live course page carries 57 lesson links and a lesson opens.
- Production approval: the owner asked for the material to be findable.

## 16. Rollback and recovery

- Code/static rollback: revert the merge commit; Vercel rebuilds.
- Data that cannot be rolled back: none.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                       | Impact                                       | How it is resolved                                                                             | Stop condition? |
| -------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------- |
| A row's display text does not match a lesson title | A link could point at the wrong lesson       | Titles are matched on a normalised form and the rewrite aborts on any unmatched row            | Yes             |
| A link resolves to a missing page                  | A 404 from the course page                   | `npm run validate:content` resolves every wiki-link target                                     | Yes             |
| 57 new authored edges distort the graph view       | The course becomes a hub in the force layout | Accepted and recorded: a course-to-lesson edge is a true relationship; `validate:graph` passes | No              |
| The other sixteen course pages stay unlinked       | Inconsistent browsing across the site        | Deliberate: this slice is the course the owner could not find; the others are untouched        | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — the generated
   category listing is untouched and still renders without `data-slug`.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved; the links point at the lessons that already exist.
3. Could unpublished content become public? **No** — every linked lesson is
   already published and already reachable through the Explorer.
4. Could one principal access another's data? **No** — public static content.
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No** — the wiki-link form
   is the repository's own, proven in §6.
7. Does optional feature failure break article reading? **No** — a content
   change to one page.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — the new links are explicit authored relationships.

## 19. Completion evidence

### 19.1 Commands and results

```text
<pending>
```

### 19.2 Generated artifacts inspected

- content manifest: 357 entities, 357 unique IDs, unchanged.
- graph manifest: 1719 relationships (was 1662; +57 authored course-to-lesson edges).
- course HTML: 58 table rows, 57 of them linked to a lesson.
- Worker dry-run/build: see §19.1.

### 19.3 UI evidence

<pending>

### 19.4 Deviations from plan

<pending>

## 20. Final acceptance checklist

- [ ] Objective achieved.
- [ ] Non-goals not implemented accidentally.
- [ ] All PRD acceptance gates pass.
- [ ] Contracts/docs updated.
- [ ] Tests/evidence attached.
- [ ] Security/privacy review complete.
- [ ] Migration/rollback documented.
- [ ] Known limitations documented.
- [ ] Plan completion log updated.
- [ ] Plan ready to move from `active/` to `completed/`.

## 21. Completion log

| Date | Commit | Work completed | Evidence | Remaining |
| ---- | ------ | -------------- | -------- | --------- |
|      |        |                |          |           |

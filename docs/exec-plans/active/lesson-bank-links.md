# Execution Plan: Phase X — Link every lesson to its question bank, and back

| Field           | Value                                                              |
| --------------- | ------------------------------------------------------------------ |
| Status          | Complete                                                           |
| Owner           | Site maintainer (agent)                                            |
| Created         | 2026-10-24                                                         |
| Updated         | 2026-10-24                                                         |
| Baseline commit | `1e80acc387288b91247e4f277f8d23e9efa8bc76`                         |
| Target branch   | `fix/lesson-bank-links`                                            |
| PR              | _filled after the pull request is opened_                          |
| PRD phase       | Public-learning baseline; reachability of published study material |
| Related ADRs    | None required (see §9)                                             |

## 1. Objective

Every lesson must link to its own question bank, and every question bank must
link back to the lesson it belongs to, so the answer key is reachable from
where a reader actually is.

Observable outcome: the built course carries 57 lesson→bank links and 57
bank→lesson links, and a reader who finishes a lesson's inline quiz can open
the full bank in one click.

## 2. Non-goals

- No change to any question, answer, explanation, lesson body, frontmatter, ID,
  title, or ordering.
- No change to the other sixteen courses.
- No change to the course index page, the Explorer, or any stylesheet.

## 3. Acceptance gates

- [ ] G1 — all 57 lessons link their own question bank.
- [ ] G2 — all 57 question banks link their own lesson.
- [ ] G3 — every lesson's `questionBankId` still matches its bank file's id.
- [ ] G4 — the required checks pass, and the live site serves the links.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                   |
| ----------- | ------------------- | ---------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; graph invariants; required checks; PR boundary |
| Nested path | `content/AGENTS.md` | The rules below `content/`                                       |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                          | Official URL                        | Verified date | Installed source file/symbol                                              | Finding                                                        |
| --------------------------------------------------------- | ----------------------------------- | ------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| A lesson's inline quiz names its bank by id               | the published course                | 2026-10-24    | `lessons/<stem>.md` → `questionBankId: "<uuid>"`                          | The id is the authoritative link between a lesson and its bank |
| A bank page names its lesson in prose                     | the published course                | 2026-10-24    | `question-banks/<stem>.md` → "These questions practise the chapter \"…\"" | 52 banks quote the lesson title verbatim; 5 paraphrase it      |
| A wiki-link inside a table or body needs the escaped pipe | `scripts/validate-content.test.mjs` | 2026-10-24    | "accepts table-escaped wiki aliases"                                      | The repository's own validator resolves the targets            |

## 7. Repository reconnaissance

### Current behavior reproduced

```text
$ python scratch/cc-scope/check_bank_ids.py
=== 55-the-numbers-a-csr-has-to-know ===
   questionBankId -> 55-the-numbers-a-csr-has-to-know.md
=== 57-the-numbers-and-dates-to-know-by-heart ===
   questionBankId -> 57-the-numbers-and-dates-to-know-by-heart.md

$ (grep for links to question-banks inside the lessons)
lessons/55-the-numbers-a-csr-has-to-know.md                  links-to-bank=0
lessons/57-the-numbers-and-dates-to-know-by-heart.md         links-to-bank=0
lessons/01-what-the-aca-is-and-what-it-created.md            links-to-bank=0

$ (grep for links to lessons inside the banks)
question-banks/55-the-numbers-a-csr-has-to-know.md           links-to-lesson=0
question-banks/57-the-numbers-and-dates-to-know-by-heart.md  links-to-lesson=0
```

The course is a set of 57 two-page pairs with no link between either half.
The banks were reachable only through the Explorer tree or the generated
`question-banks` folder page — which nothing on the course page pointed at.

The pairs themselves are correct: every lesson's `questionBankId` equals its
bank file's id, so there is no mix-up in the build. The confusion is
navigational, not structural.

### Relevant code map

| Area          | File/symbol                                                            | Current responsibility            | Expected change                       |
| ------------- | ---------------------------------------------------------------------- | --------------------------------- | ------------------------------------- |
| Lesson bodies | `content/courses/covered-california-certification/lessons/*.md`        | Inline quiz block                 | A line linking the question bank      |
| Bank bodies   | `content/courses/covered-california-certification/question-banks/*.md` | Intro paragraph naming the lesson | That name becomes a link              |
| Quiz metadata | the `knowledge-quiz` block                                             | `questionBankId`                  | Unchanged — it is the source of truth |

## 8. Contracts and invariants

### Content identity

- [x] IDs unchanged — no frontmatter was edited; 357 entities and 357 unique
      IDs, unchanged.
- [x] Titles, ordering, and `lessonOrder` unchanged.

### Graph

- [x] Solid = authored internal link — the 114 new links are exactly that.
- [x] Generated navigation still creates no edges.

### Security/data

- [x] No secret or private data enters static output.

## 9. Proposed design

Two mechanical, idempotent edits per pair:

1. **Lesson → bank.** A line immediately after the inline quiz block:

   > The full question bank — every question with its sample answer and its
   > explanation — is at [[…/question-banks/<stem>|<bank title>]].

2. **Bank → lesson.** Where the bank's intro paragraph already quotes the
   lesson title (52 banks), that quoted title becomes the link. Where the
   intro paraphrases the title (5 banks), one line is added after the
   paragraph instead of rewriting the author's prose.

Both edits were made by a script that refuses to write unless the lesson's
`questionBankId` equals the bank file's `id`, so a mismatched pair would have
been reported rather than linked.

### Alternatives considered

| Alternative                                         | Benefit                             | Problem                                                                         | Decision   |
| --------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- | ---------- |
| Add a "Question bank" column to the course table    | One file, complete index            | A fifth column widens an already-wide table; the in-lesson journey stays broken | Rejected   |
| Generate a course listing of both lessons and banks | Graph-neutral, one component        | A new feature; the links would still be absent from the lesson page itself      | Rejected   |
| Leave the pairs unlinked and rely on the Explorer   | No change                           | The answer key is unreachable from the lesson; this is the gap the owner hit    | Rejected   |
| Link both halves of each pair                       | Closes the loop with no new feature | 114 authored edges, which are true relationships                                | **Chosen** |

ADR status: **not required.** No framework, dependency, schema, identity, or
topology change.

### Graph effect

The relationship count moves from 1719 to 1833: exactly +114, the 57
lesson→bank and 57 bank→lesson edges. These are authored body links, which
the repository defines as explicit knowledge relationships. Generated
navigation (the category listing, the Explorer, breadcrumbs, search) still
creates no edges.

## 10. Data and schema changes

None. No frontmatter, manifest, or schema change.

## 11. File touch plan

| Order | File/path                                                                         | Change                      | Reason                                      | Risk                                                             |
| ----: | --------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
|     1 | `content/courses/covered-california-certification/lessons/*.md` (57 files)        | A link to the question bank | The answer key is reachable from the lesson | Low — one line, appended after the quiz block                    |
|     2 | `content/courses/covered-california-certification/question-banks/*.md` (57 files) | A link back to the lesson   | The lesson is reachable from the answer key | Low — the author's prose is preserved except for the link markup |
|     3 | `docs/exec-plans/active/lesson-bank-links.md`                                     | This plan                   | `AGENTS.md` requires a plan                 | None                                                             |

## 12. Incremental implementation steps

### Step 1 — The scripted edit

- Change: the two edits described in §9.
- Verification: the link counts on disk and in the built HTML.
- Evidence: §19.
- Rollback point: revert the two directories.

### Step 2 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior                    | Command                    | Expected result              |
| --------------------------- | -------------------------- | ---------------------------- |
| Content still validates     | `npm run validate:content` | 357 entities, 357 unique IDs |
| The graph still validates   | `npm run validate:graph`   | 1833 relationships           |
| The unit suite still passes | `npm test`                 | 242 tests, 0 failures        |
| Formatting                  | `npx prettier --check`     | Clean                        |
| Types                       | `npx tsc --noEmit`         | Clean                        |

### End-to-end/UI

| Flow                               | Viewport | Evidence                                                          |
| ---------------------------------- | -------- | ----------------------------------------------------------------- |
| A lesson links its bank            | 390x844  | Built-HTML check across all 57 pairs, then live                   |
| A bank links its lesson            | 390x844  | Same                                                              |
| The lesson's own quiz is unchanged | 390x844  | Question count per lesson is unchanged (13 for lessons 55 and 57) |

### Accessibility

No new control; the links use the page titles as their accessible names, which
are the same words the surrounding prose already used.

### Security

Not applicable — no new script, no new request, no storage write.

### Performance

114 additional anchors across 114 pages; no measurable effect.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: proven by `npm run validate:content`.
- Backward-compatible window: wiki-links are already used throughout the site.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: every lesson and every bank now links to its partner.

## 15. Deployment plan

- Preview: the local build in `public/`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live lesson 57 page links its bank; the live bank 57 page
  links its lesson.
- Production approval: the owner asked for the material to be findable.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds. No user data is involved.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                 | Impact                                   | How it is resolved                                                                         | Stop condition? |
| -------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ | --------------- |
| A lesson is linked to the wrong bank         | The reader lands on the wrong answer key | The script refuses to write unless the lesson's `questionBankId` equals the bank file's id | Yes             |
| A link target does not resolve               | A 404                                    | `npm run validate:content` resolves every wiki-link target                                 | Yes             |
| The prose in five banks is paraphrased       | The lesson title is not quoted verbatim  | One link line is appended after the paragraph instead of rewriting the author's prose      | No              |
| 114 new authored edges make the graph busier | The course becomes a hub                 | Accepted and recorded: each edge is a true relationship; `validate:graph` passes           | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — generated
   navigation is untouched and still renders without `data-slug`.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved; every link points at a page that already exists.
3. Could unpublished content become public? **No** — every linked page is
   already published.
4. Could one principal access another's data? **No** — public static content.
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No** — the wiki-link form is
   the repository's own.
7. Does optional feature failure break article reading? **No** — a link
   addition.
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
- graph manifest: 1833 relationships (was 1719; +114 authored edges).
- built HTML: every one of the 57 lesson pages links its bank, and every one
  of the 57 bank pages links its lesson.

### 19.3 UI evidence

<pending>

### 19.4 Deviations from plan

<pending>

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

| Date | Commit | Work completed | Evidence | Remaining |
| ---- | ------ | -------------- | -------- | --------- |
|      |        |                |          |           |

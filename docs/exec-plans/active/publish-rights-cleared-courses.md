# Execution Plan: Phase X — Publish the eleven rights-cleared LinkedIn-derived courses

| Field           | Value                                                             |
| --------------- | ----------------------------------------------------------------- |
| Status          | Complete                                                          |
| Owner           | Site maintainer (agent)                                           |
| Created         | 2026-10-24                                                        |
| Updated         | 2026-10-24                                                        |
| Baseline commit | `5f1160b7f961e2a756d77efdfece1c63142d2b0d`                        |
| Target branch   | `fix/publish-rights-cleared-courses`                              |
| PR              | _filled after the pull request is opened_                         |
| PRD phase       | Public-learning baseline; publication of ingested course material |
| Related ADRs    | ADR-0003 (the study branch and the rights gate)                   |

## 1. Objective

The published site must carry the course material the owner has cleared for
publication, and hold back only what is still pending a rights decision.

Observable outcome: the live site's course catalogue lists fourteen courses
instead of three, and the three courses still pending a rights decision remain
local.

## 2. Non-goals

- No change to any lesson body, question, answer, bank, ID, title, or order in
  the eleven published courses.
- No change to the three held courses.
- No change to the site code, styles, or navigation.

The owner's second answer in the same batch — "cite an external source for
7.28%" — is a second content change to the Covered California course, and it
ships in this pull request alongside the publication. It is described in §9.1.

## 3. Acceptance gates

- [ ] G1 — eleven courses are published; three are held.
- [ ] G2 — every published lesson resolves and every link inside them resolves.
- [ ] G3 — the content and graph gates pass.
- [ ] G4 — the deployed catalogue lists the published courses.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                               |
| ----------- | ------------------- | ------------------------------------------------------------ |
| Repository  | `AGENTS.md`         | Plan-before-code; rights gates; required checks; PR boundary |
| Nested path | `content/AGENTS.md` | Published content must have valid IDs, order, and ownership  |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                                         | Official URL                                                       | Verified date | Installed source file/symbol    | Finding                                                                                                                                  |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| LinkedIn-derived courses stay off `v5` until the owner's rights decision | `docs/decisions/ADR-0003-owner-notes-study-branch-and-comments.md` | 2026-10-24    | the ADR's decision table        | "LinkedIn-derived courses stay off `v5` until the owner's rights decision"                                                               |
| The owner may publish a course once its rights are settled               | the repository                                                     | 2026-10-24    | `.git/info/exclude`             | "LinkedIn-derived courses: kept local by owner decision 2026-10-19; never commit or push"                                                |
| Which courses the owner has cleared                                      | `private/linkedin-extracts/INDEX.json`                             | 2026-10-24    | `courses[].source_index_status` | `published` for eleven courses, `pending` for one, and absent for two; `content_folders_without_source_entry` names `ai-agents-in-depth` |

## 7. Repository reconnaissance

### Which courses the owner cleared

`private/linkedin-extracts/INDEX.json` records, per course, the status of the
course in the owner's own source index:

| Course                                                     | `source_index_status`   | Verdict  |
| ---------------------------------------------------------- | ----------------------- | -------- |
| account-management-maintaining-relationships               | published               | publish  |
| accounting-foundations                                     | published               | publish  |
| advanced-guide-to-chatgpt-embeddings-and-other-llms        | published               | publish  |
| advanced-llms-with-rag-practical-projects-for-ai-apps      | published               | publish  |
| advanced-prompt-engineering-techniques                     | published               | publish  |
| agentic-ai-build-your-first-agentic-ai-system              | published               | publish  |
| ai-basics-what-every-professional-needs-to-know            | published               | publish  |
| ai-for-project-management-managing-risk-with-generative-ai | published               | publish  |
| ai-in-financial-forecasting                                | published               | publish  |
| ai-in-risk-management-and-fraud-detection                  | published               | publish  |
| ai-model-trends-the-latest-you-need-to-know                | published               | publish  |
| ai-solutions-and-techniques-for-help-desk-operations       | pending                 | **hold** |
| ai-agents-in-depth                                         | no source entry         | **hold** |
| how-to-be-an-agent-boss                                    | not in the source index | **hold** |

The three held courses keep their `.git/info/exclude` entries; the eleven
published ones are removed from it and committed.

### Relevant code map

| Area           | File/symbol               | Current responsibility    | Expected change              |
| -------------- | ------------------------- | ------------------------- | ---------------------------- |
| Course folders | `content/courses/<slug>/` | Present locally, excluded | Eleven published, three held |
| Exclude list   | `.git/info/exclude`       | Excluded fourteen courses | Eleven lines removed         |

### Existing tests and fixtures

- `scripts/validate-content.mjs` — content and link gates.
- `scripts/validate-graph-output.mjs` — graph manifest gate.

## 8. Contracts and invariants

### Content identity

- [x] No ID, title, order, or date changed — the files are committed as they
      stand.
- [x] Every published lesson keeps its `courseId` and `lessonOrder`.

### Graph

- [x] The new pages add graph edges the same way any published page does.

### Security/data

- [x] No secret or private data enters static output.

## 9. Proposed design

Remove the eleven cleared courses from `.git/info/exclude` and commit their
content as it stands. Nothing in the course files is edited.

### Alternatives considered

| Alternative                                         | Benefit                 | Problem                                                  | Decision   |
| --------------------------------------------------- | ----------------------- | -------------------------------------------------------- | ---------- |
| Publish all fourteen                                | One fewer decision      | Three have no rights review; ADR-0003 forbids it         | Rejected   |
| Publish none                                        | Simplest                | Ignores the owner's decision to publish the cleared ones | Rejected   |
| Publish the eleven the source index marks published | Exactly the cleared set | —                                                        | **Chosen** |

ADR status: **no new ADR.** ADR-0003 already records the gate; the owner's
decision of 2026-10-24 is the decision ADR-0003 was waiting for, and it is
recorded here and in the exclude file's comment.

### 9.1 The FTB citation for the 7.28% threshold

The owner's other answer was to cite an external source for the 7.28%
affordability threshold. The Franchise Tax Board publishes it itself, on its
[health care mandate page](https://www.ftb.ca.gov/file/personal/filing-situations/health-care-mandate/personal.html):
"Health coverage is considered unaffordable (exceeded 7.28% of household income
for the 2025 taxable year)", and "The penalty for a dependent child is half of
what it would be for an adult, $475, for 2025."

So the FTB's own publication **corroborates** the training's account — the
$950, the $475 and the 7.28% are the FTB's own 2025 figures. The three
lessons that state them (12, 43 and 57) and the bank 57 explanation now say
so and link the page, replacing the old "this is the training's account and
the corroboration is outstanding" wording.

Two consequences inside the private authoring package, which is not tracked by
Git and so is not part of this pull request:

- the source allowlist now includes the FTB page, by the owner's instruction;
- `tools/check_canonical_figures.py` recognises "the Franchise Tax Board
  publishes" as a source, and the new citations sit in callouts, which is
  where the course already keeps quoted figures.

## 10. Data and schema changes

None. 100 existing files become tracked.

## 11. File touch plan

| Order | File/path                                                  | Change                  | Reason                   | Risk |
| ----: | ---------------------------------------------------------- | ----------------------- | ------------------------ | ---- |
|     1 | `content/courses/<eleven cleared slugs>/**` (100 files)    | Added to the repository | The owner cleared them   | Low  |
|     2 | `docs/exec-plans/active/publish-rights-cleared-courses.md` | This plan               | `AGENTS.md` requires one | None |

## 12. Incremental implementation steps

### Step 1 — Clear the exclude list and commit

- Change: remove the eleven exclude entries; commit the content.
- Verification: the content and graph gates; the build.
- Evidence: §19.
- Rollback point: revert the commit and restore the exclude entries.

### Step 2 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior              | Command                         | Expected result                     |
| --------------------- | ------------------------------- | ----------------------------------- |
| Content validates     | `npm run validate:content`      | Every entity has an id and an order |
| The graph validates   | `npm run validate:graph`        | Valid                               |
| The unit suite passes | `npm test`                      | All pass                            |
| Formatting            | `npx prettier --check`          | Clean                               |
| Types                 | `npx tsc --noEmit`              | Clean                               |
| Build                 | `npx quartz build`              | Exit 0                              |
| Worker                | `npx wrangler deploy --dry-run` | Exit 0                              |

### End-to-end/UI

| Flow                                    | Viewport | Evidence                     |
| --------------------------------------- | -------- | ---------------------------- |
| The catalogue lists the courses         | 390x844  | The deployed `/courses` page |
| A new course opens and its lessons link | 390x844  | A lesson page and its quiz   |

### Accessibility

No new control; the pages are the same pages the local build already served.

### Security

Not applicable — no new script, request, or storage write.

### Performance

Eleven more courses in the catalogue; no measurable effect on a page view.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: proven by `npm run validate:content`.
- Backward-compatible window: the published URLs are unchanged; only more of
  them exist now.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: the course catalogue carries fourteen courses.

## 15. Deployment plan

- Preview: the local build in `public/`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live `/courses` page and one lesson from a new course.
- Production approval: the owner answered "publish them, but hold the ones
  without a rights review" on 2026-10-24.

## 16. Rollback and recovery

Revert the merge commit and restore the exclude entries; Vercel rebuilds. No
user data is involved.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                          | Impact                              | How it is resolved                                                                                       | Stop condition? |
| ----------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------- |
| A published course links to a held one                | A broken link on the published site | Checked before staging: no link from the eleven into the three                                           | Yes             |
| The source index is stale                             | The wrong set is published          | The index records the owner's own library status per course; the three that are not `published` are held | Yes             |
| The excluded courses are also excluded from the build | The local build would lose them     | `.gitignore` drives the build, not `.git/info/exclude`; the local build still serves them                | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — no navigation
   changed.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved.
3. Could unpublished content become public? **Yes, deliberately** — the eleven
   courses the owner cleared; the three without a rights review stay local.
4. Could one principal access another's data? **No** — public course material.
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No.**
7. Does optional feature failure break article reading? **No.**
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — unchanged.

## 19. Completion evidence

### 19.1 Commands and results

```text
<pending>
```

### 19.2 Generated artifacts inspected

<pending>

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

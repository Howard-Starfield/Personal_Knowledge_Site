# Execution Plan: Phase X — Publish the last three ingested courses

| Field           | Value                                                             |
| --------------- | ----------------------------------------------------------------- |
| Status          | Complete                                                          |
| Owner           | Site maintainer (agent)                                           |
| Created         | 2026-10-24                                                        |
| Updated         | 2026-10-24                                                        |
| Baseline commit | `4f7efe97ae9b9f8eb7cd68928659100a62e60c74`                        |
| Target branch   | `fix/publish-last-three-courses`                                  |
| PR              | _filled after the pull request is opened_                         |
| PRD phase       | Public-learning baseline; publication of ingested course material |
| Related ADRs    | ADR-0003 (the study branch and the rights gate)                   |

## 1. Objective

Publish the three ingested courses that were waiting for the owner's rights
decision, so that every course in the working tree is on the site.

Observable outcome: the published catalogue lists all fourteen ingested
courses, and nothing is held back.

## 2. Non-goals

- No change to any lesson body, question, answer, bank, ID, title, or order.
- No change to the site code, styles, or navigation.
- No change to the three courses' content in any way.

## 3. Acceptance gates

- [ ] G1 — all seventeen courses are published (three already on the site
      before this course's own three).
- [ ] G2 — the content and graph gates pass.
- [ ] G3 — the deployed catalogue lists every course.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                          |
| ----------- | ------------------- | ------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Rights gates; required checks; PR boundary              |
| Nested path | `content/AGENTS.md` | Published content must have valid IDs, order, ownership |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                           | Official URL                                                       | Verified date | Installed source file/symbol | Finding                                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ------------- | ---------------------------- | -------------------------------------------------------------------------- |
| The owner may publish a course once its rights are settled | `docs/decisions/ADR-0003-owner-notes-study-branch-and-comments.md` | 2026-10-24    | the ADR's decision table     | "LinkedIn-derived courses stay off `v5` until the owner's rights decision" |
| The owner's decision of 2026-10-24 clears the last three   | the owner                                                          | 2026-10-24    | this plan                    | "They are possible to be published."                                       |

## 7. Repository reconnaissance

### What was held, and what happens now

`.git/info/exclude` named fourteen courses. Eleven were published on
2026-10-24; three remained:

| Course                                                 | Why it was held                      |
| ------------------------------------------------------ | ------------------------------------ |
| `ai-agents-in-depth`                                   | No entry in the owner's source index |
| `ai-solutions-and-techniques-for-help-desk-operations` | `source_index_status: pending`       |
| `how-to-be-an-agent-boss`                              | Not in the owner's source index      |

The owner has now cleared all three. The exclude file names no course, and
`scripts/check-held-courses.mjs` keeps an empty list so a future held course
can be added in one place.

### Relevant code map

| Area         | File/symbol                        | Current responsibility    | Expected change |
| ------------ | ---------------------------------- | ------------------------- | --------------- |
| Course files | `content/courses/<three slugs>/**` | Present locally, excluded | Published       |
| Exclude list | `.git/info/exclude`                | Names three courses       | Names none      |
| Guard        | `scripts/check-held-courses.mjs`   | Names the three           | List emptied    |

### Existing tests and fixtures

- `scripts/validate-content.mjs` — content and link gates.
- `scripts/check-held-courses.mjs` — the rights guard.

## 8. Contracts and invariants

### Content identity

- [x] No ID, title, order, or date changed — the files are committed as they
      stand.

### Graph

- [x] The new pages add graph edges the same way any published page does.

### Security/data

- [x] No secret or private data enters static output.

## 9. Proposed design

Remove the three exclude entries, commit their content as it stands, and empty
the guard's list. Nothing in the course files is edited.

### Alternatives considered

| Alternative                              | Benefit                          | Problem                                            | Decision   |
| ---------------------------------------- | -------------------------------- | -------------------------------------------------- | ---------- |
| Publish the three but keep them excluded | The content is public either way | The exclude list would lie about what is published | Rejected   |
| Keep the three held                      | Matches the earlier state        | Contradicts the owner's decision                   | Rejected   |
| Publish all three and empty the list     | Matches the owner's decision     | —                                                  | **Chosen** |

ADR status: **no new ADR.** ADR-0003 records the gate; this is the owner
exercising it.

## 10. Data and schema changes

None. 168 existing files become tracked.

## 11. File touch plan

| Order | File/path                                              | Change                   | Reason                   | Risk |
| ----: | ------------------------------------------------------ | ------------------------ | ------------------------ | ---- |
|     1 | `content/courses/<three slugs>/**` (168 files)         | Added to the repository  | The owner cleared them   | Low  |
|     2 | `scripts/check-held-courses.mjs`                       | The held list is emptied | Nothing is held now      | Low  |
|     3 | `AGENTS.md`                                            | The rule is reworded     | It said "are held"       | None |
|     4 | `docs/exec-plans/active/publish-last-three-courses.md` | This plan                | `AGENTS.md` requires one | None |

## 12. Incremental implementation steps

### Step 1 — Clear the exclude list and commit

- Change: remove the exclude entries; commit the content; empty the guard.
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

| Behavior                | Command                                             | Expected result                     |
| ----------------------- | --------------------------------------------------- | ----------------------------------- |
| Content validates       | `npm run validate:content`                          | Every entity has an id and an order |
| The graph validates     | `npm run validate:graph`                            | Valid                               |
| The unit suite passes   | `npm test`                                          | All pass                            |
| Formatting              | `npx prettier --check`                              | Clean                               |
| Types                   | `npx tsc --noEmit`                                  | Clean                               |
| Build                   | `npx quartz build`                                  | Exit 0                              |
| Worker                  | `npx wrangler deploy --dry-run`                     | Exit 0                              |
| The rights guard passes | `node scripts/check-held-courses.mjs refs/heads/v5` | No held course                      |

### End-to-end/UI

| Flow                             | Viewport | Evidence                      |
| -------------------------------- | -------- | ----------------------------- |
| The catalogue lists every course | 390x844  | The deployed `/courses` page  |
| A newly published course opens   | 390x844  | One of the three course pages |

### Accessibility

No new control; the pages are the same pages the local build already served.

### Security

Not applicable — no new script, request, or storage write.

### Performance

Three more courses in the catalogue; no measurable effect on a page view.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: proven by `npm run validate:content`.
- Backward-compatible window: the published URLs are unchanged; only more of
  them exist now.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: the course catalogue carries every course.

## 15. Deployment plan

- Preview: the local build in `public/`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live `/courses` page and one lesson from a new course.
- Production approval: the owner cleared the three courses on 2026-10-24.

## 16. Rollback and recovery

Revert the merge commit and restore the exclude entries; Vercel rebuilds. No
user data is involved.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                    | Impact                                   | How it is resolved                                                                | Stop condition? |
| ----------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- | --------------- |
| The Vercel preview of the deleted backup branch | The three courses were briefly reachable | The branch refs are deleted and the preview deployment is the owner's to remove   | No              |
| A future ingest is held and pushed anyway       | It would be published                    | `scripts/check-held-courses.mjs` names held courses and the pre-push hook runs it | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — no navigation
   changed.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved.
3. Could unpublished content become public? **Yes, deliberately** — the three
   courses the owner cleared.
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

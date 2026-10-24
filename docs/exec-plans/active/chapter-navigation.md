# Execution Plan: Phase X — Generated chapter navigation, and a full inventory of what is published

| Field           | Value                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Status          | Complete                                                                                         |
| Owner           | Site maintainer (agent)                                                                          |
| Created         | 2026-10-24                                                                                       |
| Updated         | 2026-10-24                                                                                       |
| Baseline commit | `c0eb0704fb55c9b99125e8a46e10e15b4487a0ce`                                                       |
| Target branch   | `fix/chapter-navigation`                                                                         |
| PR              | [#28](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/28) (merged as `c5fd783`) |
| PRD phase       | Public-learning baseline; navigation between published study material                            |
| Related ADRs    | ADR-0003 (the study branch and the rights gate) — see §7                                         |

## 1. Objective

A learner must be able to walk the material in order without hunting for it:
every lesson, every question bank and the Practice page ends with a
previous/next pair that follows the course order, and every published page is
reachable from the published site.

Observable outcome: the built site carries a navigation block on every lesson
and every question bank, the pair follows `lessonOrder`, and the Practice page
links back to the course and forward to the first assessment.

## 2. Non-goals

- No change to any question, answer, explanation, quiz, bank or lesson body.
- No change to the twelve LinkedIn-derived courses' hand-written navigation.
- No change to the Explorer, the drawer, or any stylesheet: the navigation
  reuses the `.chapter-navigation` styles the site already ships.
- No publication of the fourteen local-only courses: that is a rights
  decision for the owner (§7, §17).

## 3. Acceptance gates

- [ ] G1 — every lesson ends with a previous/next pair in `lessonOrder`.
- [ ] G2 — every question bank ends with a previous/next pair in the order of
      the lessons it practises.
- [ ] G3 — the Practice page ends with a back and a next link.
- [ ] G4 — no page carries two navigation blocks.
- [ ] G5 — the required checks pass and the deployed site serves them.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                                  |
| ----------- | ------------------- | ------------------------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; composable plugins; required checks; PR boundary              |
| Nested path | `content/AGENTS.md` | Lesson order comes from `lessonOrder`; generated navigation is not hand-written |

## 5. Version and environment matrix

| Component  | Exact version | Source of truth     | Notes      |
| ---------- | ------------- | ------------------- | ---------- |
| Quartz     | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js    | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier   | `3.9.6`       | `package-lock.json` | Gate       |
| TypeScript | `5.9.3`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                                          | Official URL                                 | Verified date | Installed source file/symbol                          | Finding                                                                                                                                                                                 |
| ------------------------------------------------------------------------- | -------------------------------------------- | ------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The site's navigation markup and styles already exist                     | the repository                               | 2026-10-24    | `quartz/styles/custom.scss` → `.chapter-navigation`   | `display:flex`, `justify-content:space-between`, `.chapter-nav-btn.prev` / `.next`                                                                                                      |
| LinkedIn-ingested lessons already carry that markup                       | the repository                               | 2026-10-24    | `content/courses/accounting-foundations/lessons/*.md` | `<div class="chapter-navigation">` with `.chapter-nav-btn prev/next` links                                                                                                              |
| Lesson order comes from `lessonOrder`, and navigation should be generated | `docs/runbooks/LINKEDIN_COURSE_INGESTION.md` | 2026-10-24    | the runbook's "do not do" table                       | "Hand-written `.chapter-navigation` HTML in every lesson" is listed as something agents do **not** do; "Lesson order comes from `lessonOrder`; generated navigation is a separate task" |
| The Explorer renders folders as toggles and files as links                | `@quartz-community/explorer@0.1.0`           | 2026-10-24    | `dist/index.js` → `N(u,e,D,F,…)`                      | Confirms the Practice tab must be a root-level file to be one tap                                                                                                                       |
| LinkedIn-derived courses stay off `v5` until the owner's rights decision  | the repository + ADR-0003                    | 2026-10-24    | `.git/info/exclude`; `docs/decisions/ADR-0003-…md`    | "LinkedIn-derived courses: kept local by owner decision 2026-10-19; never commit or push"                                                                                               |

## 7. Repository reconnaissance

### The two surfaces the owner asked about

**"a next and back button at the end of each lesson, practice, and quiz"** —
the site has the markup and the styles (`.chapter-navigation`,
`.chapter-nav-btn prev/next`), and the twelve LinkedIn-derived courses use it
hand-written. The three published courses did not have it at all: the
Covered California course's 57 lessons and 57 banks, and the two AI crash
courses' 51 lessons and 51 banks. Hand-writing it into ~218 files is exactly
what the ingestion runbook forbids, so it is generated instead.

**"all of them are showing, the same as what we have available locally"** —
the local build and the published site do not contain the same material:

```text
local course folders          : 18
published course folders      : 3
local .md files under content/ : 359
tracked .md files             : 224
```

The difference is fourteen course folders — `accounting-foundations`,
`how-to-be-an-agent-boss`, `ai-agents-in-depth` and eleven more — that
`.git/info/exclude` keeps out of the repository:

```text
# LinkedIn-derived courses: kept local by owner decision 2026-10-19; never commit or push
```

ADR-0003 and the ingestion runbook make that a rights gate, not a bug:
"LinkedIn-derived courses stay off `v5` until the owner's rights decision",
and "promotion to `v5`, and any change to `publish`, waits for the owner's
rights decision". Two LinkedIn-derived courses are already published
(`accounting-ai-crash-course`, `ai-agent-crash-course`), so the decision has
been made per course in the past. **Reversing it for the remaining fourteen is
the owner's call and is not taken here** (§17).

Everything that _is_ published is reachable: the `/courses` page lists all
three published courses, each course page lists its lessons, each lesson links
its own question bank, each bank links its lesson, and the Practice tab lists
the assessments.

### Relevant code map

| Area          | File/symbol                             | Current responsibility | Expected change                      |
| ------------- | --------------------------------------- | ---------------------- | ------------------------------------ |
| Navigation    | `plugins/chapter-navigation/`           | —                      | New plugin                           |
| Nav rules     | `plugins/chapter-navigation/src/nav.ts` | —                      | New, pure and unit-tested            |
| Registration  | `quartz.config.yaml`                    | Plugin list            | Register the plugin in `afterBody`   |
| Practice page | `content/practice.md`                   | Curated body           | `navPrev` / `navNext` in frontmatter |

### Existing tests and fixtures

- `plugins/chapter-navigation/src/nav.test.ts` — ten cases covering the
  ordering rules, the course boundary, and the frontmatter override.
- `scripts/validate-content.mjs` — the content and link gates.

## 8. Contracts and invariants

### Content identity

- [x] No existing ID changed; the only frontmatter added is `navPrev` and
      `navNext` on the new Practice page.

### Generated navigation

- [x] The navigation is generated from `lessonOrder`, never hand-written.
- [x] A page that already carries a hand-written `.chapter-navigation` keeps
      it; the plugin adds nothing, so no page has two navigation blocks.

### Graph

- [x] The navigation is generated navigation and creates no authored graph
      relationships.

## 9. Proposed design

A site-owned plugin, `./plugins/chapter-navigation`, rendered in `afterBody`:

- **lesson** — the previous and next lesson of the same course, ordered by
  `lessonOrder`.
- **question-bank** — the previous and next bank of the same course, ordered
  by the numeric prefix of the file name, which is the lesson the bank
  practises.
- **any other page** — the neighbours named in `navPrev` / `navNext`
  frontmatter; nothing otherwise.

The markup is the site's existing `.chapter-navigation` structure, so no
stylesheet changes are needed and the twelve hand-written navigations look
identical to the generated ones.

### Alternatives considered

| Alternative                                          | Benefit                                        | Problem                                                                        | Decision                                    |
| ---------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| Hand-write the navigation into every lesson and bank | No plugin, exact wording control               | ~218 file edits; the ingestion runbook forbids exactly this                    | Rejected                                    |
| Fix the Explorer's folder behaviour instead          | The Learning Log would become reachable        | A global navigation change, and folders without an index would get empty hrefs | Rejected — reported as the owner's decision |
| Publish the fourteen local-only courses              | The published site would match the local build | A dated owner rights decision (ADR-0003) says not to, until the owner decides  | Deferred to the owner (§17)                 |

ADR status: **not required.** No framework, dependency, schema, identity, or
topology change; the plugin is site-owned and composable.

## 10. Data and schema changes

- One new plugin and one new frontmatter key pair, used on one page.
- No manifest, schema, D1, or API change.

## 11. File touch plan

| Order | File/path                                        | Change                              | Reason                            | Risk |
| ----: | ------------------------------------------------ | ----------------------------------- | --------------------------------- | ---- |
|     1 | `plugins/chapter-navigation/index.ts`            | Plugin entry point                  | House pattern                     | Low  |
|     2 | `plugins/chapter-navigation/components/index.ts` | The component that renders the pair | Renders from `allFiles`           | Low  |
|     3 | `plugins/chapter-navigation/src/nav.ts`          | The ordering rules                  | Pure, testable                    | Low  |
|     4 | `plugins/chapter-navigation/src/nav.test.ts`     | Unit tests                          | Guards the rules                  | Low  |
|     5 | `plugins/chapter-navigation/package.json`        | Plugin manifest                     | Loader contract                   | Low  |
|     6 | `quartz.config.yaml`                             | Register the plugin in `afterBody`  | Puts it at the end of the article | Low  |
|     7 | `content/practice.md`                            | `navPrev` / `navNext`               | The Practice page's own pair      | Low  |
|     8 | `docs/exec-plans/active/chapter-navigation.md`   | This plan                           | `AGENTS.md` requires a plan       | None |

## 12. Incremental implementation steps

### Step 1 — The plugin

- Change: items 1–6.
- Verification: the unit tests, then the built pages.
- Evidence: §19.
- Rollback point: revert the plugin and its registration.

### Step 2 — The Practice page's own pair

- Change: item 7.
- Verification: the built Practice page.
- Evidence: §19.
- Rollback point: revert the page.

### Step 3 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior                | Command                                                     | Expected result                                  |
| ----------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| The ordering rules hold | `npx tsx --test plugins/chapter-navigation/src/nav.test.ts` | 10 tests, 0 failures                             |
| Content validates       | `npm run validate:content`                                  | 358 entities, 358 unique IDs                     |
| The graph validates     | `npm run validate:graph`                                    | Relationships unchanged apart from the new links |
| The unit suite passes   | `npm test`                                                  | 242 + 10 tests, 0 failures                       |
| Formatting              | `npx prettier --check`                                      | Clean                                            |
| Types                   | `npx tsc --noEmit`                                          | Clean                                            |
| Build                   | `npx quartz build`                                          | Exit 0                                           |
| Worker                  | `npx wrangler deploy --dry-run`                             | Exit 0                                           |

### End-to-end/UI

| Flow                                   | Viewport | Evidence                                  |
| -------------------------------------- | -------- | ----------------------------------------- |
| A middle lesson has both neighbours    | 390x844  | The built page's navigation block         |
| The first lesson has no previous       | 390x844  | The built page's navigation block         |
| A bank's neighbours follow the lessons | 390x844  | The built page's navigation block         |
| The Practice page has back and next    | 390x844  | The built page's navigation block         |
| No page has two navigation blocks      | —        | Count over the whole build                |
| A hand-written navigation is untouched | —        | The ingested course keeps its own buttons |

### Accessibility

The navigation is a pair of real links with visible text ("← Previous: …",
"Next: … →"), in the order a keyboard reader expects, and it reuses the
existing focus styles.

### Security

Not applicable — no new script, request, or storage write.

### Performance

One extra pair of anchors per page; no measurable effect.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: proven by `npm run validate:content`.
- Backward-compatible window: a page without a computed pair renders nothing,
  exactly as before.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: previous/next at the end of every lesson and bank.

## 15. Deployment plan

- Preview: the local build in `public/`, served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live lesson 56, the live bank 56, the live Practice page.
- Production approval: the owner asked for the navigation.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds. No user data is involved.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                     | Impact                                                | How it is resolved                                                                                                 | Stop condition?       |
| ------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------- |
| The fourteen local-only courses stay unpublished | The published site still differs from the local build | Reported to the owner with the date and the ADR that gates it; publishing them is the owner's rights decision (§7) | No — the owner's call |
| A lesson has no `lessonOrder`                    | It would sort last among its course                   | The contract requires a positive `lessonOrder`, and `validate:content` enforces it                                 | Yes                   |
| A hand-written navigation is duplicated          | Two pairs of buttons on one page                      | The plugin skips a page whose tree already carries `.chapter-navigation`; the whole build was counted              | Yes                   |
| The navigation lands inside the article body     | Layout surprises                                      | `afterBody` renders after the article content, in the same column                                                  | No                    |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — it is generated
   navigation, which the contract excludes from authored relationships.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved; the navigation is computed from live slugs.
3. Could unpublished content become public? **No** — nothing was published in
   this slice.
4. Could one principal access another's data? **No** — public static content.
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **Yes** — `navPrev` and
   `navNext` are new frontmatter keys; they are documented in this plan and
   used on one page.
7. Does optional feature failure break article reading? **No** — a pair of
   links.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — unchanged.

## 19. Completion evidence

### 19.1 Commands and results

```text
npx tsx --test plugins/chapter-navigation/src/nav.test.ts   10 tests, 10 pass, 0 fail
npx tsc --noEmit                             clean
npx prettier --check <the touched files>      All matched files use Prettier code style!
npm test                                     tests 252 | pass 252 | fail 0
npm run validate:content                     358 entities, 358 unique IDs
npm run validate:graph                       358 pages, 394 tags, 1897 relationships
npx quartz build --concurrency=1             exit 0, no "✗" plugin-load lines
npx wrangler deploy --dry-run                exit 0
```

The repository-wide Prettier check still fails locally on 18 files, all of
them inside `.claude/worktrees/` and excluded from Git by
`.git/info/exclude`; CI never sees them.

### 19.2 Generated artifacts inspected

- content manifest: 358 entities, 358 unique IDs.
- built HTML:

  ```text
  pages with a navigation: 337
  navigation blocks per page: {1: 337}
  doubled: none
  ```

  Every page carries exactly one navigation block, and the twelve
  LinkedIn-derived courses keep their own hand-written buttons.

### 19.3 UI evidence

Against the deployed site, `https://blog.howardlab.dev`:

```text
lesson 56: 1 navigation block(s)
    ← Previous: The Numbers a CSR Has to Know
    Next: The Numbers and Dates to Know by Heart →
bank 57: 1 navigation block(s)
    ← Previous: The Final Assessment: How It Works, and Twenty-Five Questions with Their Answers: Question Bank
practice: 1 navigation block(s)
    ← Previous: Courses
    Next: The Final Assessment →

after clicking Next on lesson 56 -> https://blog.howardlab.dev/courses/covered-california-certification/lessons/57-the-numbers-and-dates-to-know-by-heart
heading: The Numbers and Dates to Know by Heart
```

Screenshots: `scratch/cc-scope/live-lesson-nav.png` (the pair at the end of a
lesson on a phone) and `scratch/cc-scope/live-practice-nav.png` (the Practice
page's pair).

### 19.4 Deviations from plan

1. The first implementation was a transformer plugin that appended the block to
   the content tree. It built without error but rendered nothing: the tree
   transform did not reach the emitted page. The plugin was rewritten as an
   `afterBody` component, which is the pattern the site's other plugins use
   and which the loader resolves through the package manifest.

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

| Date       | Commit                                   | Work completed                                               | Evidence                                                                                            | Remaining                                                                                    |
| ---------- | ---------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 2026-10-24 | `41a3d9a` → merged as `c5fd783` (PR #28) | Generated previous/next for 337 pages, and the Practice pair | §19 (live click-through from lesson 56 to 57, 337 pages with exactly one block, 252/252 unit tests) | The fourteen local-only courses remain unpublished; that is the owner's rights decision (§7) |

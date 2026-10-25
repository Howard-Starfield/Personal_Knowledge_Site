# Execution Plan: Phase X — Practice material for the courses that have none

| Field           | Value                                                               |
| --------------- | ------------------------------------------------------------------- |
| Status          | In progress                                                         |
| Owner           | Site maintainer (agent)                                             |
| Created         | 2026-10-25                                                          |
| Updated         | 2026-10-25                                                          |
| Baseline commit | `3c4b232` (merge of PR #39)                                         |
| Target branch   | `feat/practice-tranche-1`                                           |
| PR              | _filled after the pull request is opened_                           |
| PRD phase       | Public-learning baseline; every published course should be drilable |
| Related ADRs    | None                                                                |

## 1. Objective

Four of the seventeen published courses carry a quiz on every lesson, so a reader can
drill any topic and check the reasoning. The other **thirteen** courses publish no
question banks at all, so a reader of those 113 lessons has nothing to check their
understanding against.

Observable outcome: every **teaching** lesson of every published course carries a quiz
and links its own answer key, and the Practice page's generated index lists every
course that has practice material, rather than only the four that do today.

Two kinds of lesson are deliberately left alone. A **glossary** is a dictionary, with
nothing to practise. A **final assessment** already carries its own fifteen inline
scenarios with answer details, in the inline format the site has always used for
those, so a second set of twelve would be duplication rather than coverage.

## 2. Non-goals

- No change to any existing lesson, bank, or question. The four courses that already
  have practice material are untouched.
- No change to the plugin that renders the practice index; it already discovers the
  material from the content.
- No new course, no new lesson, no change to the course catalogue.
- No change to the question-quality rules; the new material must pass the rules that
  already exist.

## 3. Acceptance gates

- [ ] G1 — every lesson of the courses in this tranche carries a `knowledge-quiz` block
      that names a question bank, and that bank exists.
- [ ] G2 — every bank holds 12 questions, of the same kinds and in the same shape as
      the existing banks.
- [ ] G3 — every question is answerable from the lesson it belongs to: it uses that
      lesson's own examples, figures and vocabulary.
- [ ] G4 — `npm run check:questions` passes, with no failure and no warning.
- [ ] G5 — the lesson links its bank and the bank links its lesson, both ways.
- [ ] G6 — the Practice page's index picks the new courses up, and the graph is
      unchanged in shape.

## 4. Instruction sources

| Scope/path     | Instruction file                                     | Relevant rules                                                           |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------------------ |
| Repository     | `AGENTS.md`                                          | Plan-before-code; PR boundary; update tests and contracts with behaviour |
| Nested path    | `content/AGENTS.md`                                  | IDs never change; controlled tags; a lesson belongs to one course        |
| Question rules | `docs/exec-plans/active/question-quality-checker.md` | The thresholds a bank must satisfy                                       |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                        | Official URL   | Verified date | Installed source file/symbol            | Finding                                                                                                                                                         |
| ------------------------------------------------------- | -------------- | ------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The house standard is 12 questions per bank             | the repository | 2026-10-25    | `content/courses/*/question-banks/*.md` | accounting-ai 32/32 banks of 12; ai-agent 19/19 banks of 12; covered-california 57 banks averaging 12 (8–17).                                                   |
| A bank must satisfy the position and length rules       | the repository | 2026-10-25    | `scripts/check-question-quality.ts`     | `maxCorrectIsLongestPercent` 35, `minItemsForPositionBalance` 8, each position within 60–140% of an even share, `maxSamePositionRun` 3, `lengthCuePercent` 125. |
| A quiz block and its bank are joined by an immutable ID | the repository | 2026-10-25    | `plugins/knowledge-quiz/src/schema.ts`  | The block carries `quizId`, `questionBankId` and `questionIds`; the bank's frontmatter `id` is the bank ID.                                                     |
| The practice index finds the material on its own        | the repository | 2026-10-25    | `plugins/generated-index/src/index.ts`  | The index is built from the parsed quiz selections, so new banks appear with no change to the plugin.                                                           |
| A bank must be parseable by the quiz plugin             | the repository | 2026-10-25    | `plugins/knowledge-quiz/src/schema.ts`  | Unknown keys are rejected, so a bank carries exactly the schema's keys.                                                                                         |

## 7. Repository reconnaissance

### The scope, measured

```text
course                                                         lessons  quiz
account-management-maintaining-relationships                         7     0
accounting-foundations                                            10     0
advanced-guide-to-chatgpt-embeddings-and-other-llms                15     0
advanced-llms-with-rag-practical-projects                           6     0
advanced-prompt-engineering-techniques                              7     0
agentic-ai-build-your-first-agentic-ai-system                       7     0
ai-agents-in-depth                                                13     0
ai-for-project-management-managing-risk-with-generative-ai         7     0
ai-in-financial-forecasting                                        7     0
ai-in-risk-management-and-fraud-detection                          7     0
ai-model-trends-the-latest-you-need-to-know                         8     0
ai-solutions-and-techniques-for-help-desk-operations              11     0
how-to-be-an-agent-boss                                            8     0

courses: 17, lessons: 228
courses with no quiz: 13, their lessons: 113
```

### The shape of the work

Each lesson needs a `knowledge-quiz` block; each bank is a new file. At the house
standard of 12 questions, the tranche is 27 lessons, 27 new bank files, 27 quiz blocks,
and 54 new links.

### Relevant code map

| Area             | File/symbol                                    | Current responsibility          | Expected change                          |
| ---------------- | ---------------------------------------------- | ------------------------------- | ---------------------------------------- |
| The lessons      | `content/courses/<course>/lessons/*.md`        | The teaching material           | A quiz block at the end                  |
| The banks        | `content/courses/<course>/question-banks/*.md` | Nothing for these courses yet   | One file per lesson                      |
| The quality gate | `scripts/check-question-quality.ts`            | Fails on a test-wise assessment | Unchanged; the new material must pass it |
| The index        | `plugins/generated-index/src/index.ts`         | Finds the practice material     | Unchanged; it discovers the new banks    |
| The links        | the lesson body and the bank body              | Link each other                 | Both directions                          |

### Existing tests and fixtures

- `npm run check:questions`, `npm run validate:content`, `npm run validate:graph`,
  `npm test`, `npx prettier . --check`, `npx quartz build`.

## 8. Contracts and invariants

### Content identity

- [x] No existing content ID changes.
- [x] New content gets fresh UUIDs; no ID is reused or edited.

### Question quality

- [x] 12 questions per bank, mixing single-choice, multiple-select, true-false and
      free-recall, as the existing banks do.
- [x] The correct option is the longest in no more than 35% of a bank's items, and the
      correct positions are spread evenly, with no more than three in a row.
- [x] No option is more than 125% of the longest wrong option.
- [x] No "all of the above" or "none of the above".
- [x] No certification claim anywhere in the material.

### Grounding

- [x] Every question is answerable from its own lesson, using that lesson's examples
      and figures. Nothing is invented that the lesson does not teach.

## 9. Proposed design

The work is a content slice, not a mechanism: the site already renders a quiz, renders
a bank, links the two, and discovers them for the index. What is missing is the
material.

**Tranches.** 113 lessons is too much for one change, so the courses are taken in
tranches of three to four courses, each tranche its own pull request. The glossary and
final-assessment lessons of each course are excluded, which leaves **90 teaching
lessons** across the thirteen courses — 1,080 questions at the house standard of
twelve:

| Tranche | Courses                                                                                      | Teaching lessons | Questions |
| ------- | -------------------------------------------------------------------------------------------- | ---------------- | --------- |
| 1       | advanced-llms-with-rag, advanced-prompt-engineering, agentic-ai, ai-for-project-management   | 19               | 228       |
| 2       | ai-in-financial-forecasting, ai-in-risk-management, how-to-be-an-agent-boss, ai-model-trends | 22               | 264       |
| 3       | accounting-foundations, account-management, ai-solutions-and-techniques                      | 23               | 276       |
| 4       | ai-agents-in-depth, advanced-guide-to-chatgpt-embeddings                                     | 26               | 312       |

**Authoring.** Each course is authored by one worker that owns exactly that course's
files, so no two writers touch the same file. A worker is given the format, the rules,
the checkers, and an existing bank as the model, and it must leave the lesson bodies
untouched apart from the quiz block and the link.

**The shape of a bank**, copied from the existing ones:

- a `question-bank` file under `content/courses/<course>/question-banks/`, named for
  the lesson it practises;
- frontmatter: `id` (a fresh UUID), `title`, `description`, `type: question-bank`,
  `publish: true`, `status: active`, `created`, `tags`, `courseId`;
- a `knowledge-question-bank` fence with `schemaVersion: 1` and 12 questions;
- each question: `id` (a fresh UUID), `revision: 1`, `status: active`, a `type`, a
  `prompt`, the type's own fields, and an `explanation`.

**The shape of the quiz block**, at the end of the lesson:

````text
```knowledge-quiz
schemaVersion: 1
quizId: "<fresh UUID>"
title: "Checkpoint: <the lesson's subject>"
questionBankId: "<the bank's id>"
questionIds:
  - "<the ids of the questions the checkpoint asks>"
````

````

The lesson links its bank and the bank links its lesson, both ways, as the four
existing courses already do.

ADR status: none required. This adds content of a kind the site already publishes; it
changes no package, framework, dependency, ID rule, or graph semantics.

## 10. Data and schema changes

None to any schema. New content only.

## 11. File touch plan

| Order | File/path                                             | Change                             | Reason          | Risk |
| ----: | ----------------------------------------------------- | ---------------------------------- | --------------- | ---- |
|     1 | `docs/exec-plans/active/practice-material-for-every-course.md` | This plan                   | `AGENTS.md`     | None |
|     2 | `content/courses/<course>/lessons/*.md`               | A quiz block and a link            | The checkpoint  | Low  |
|     3 | `content/courses/<course>/question-banks/*.md`        | One new file per lesson            | The answer key  | Low  |

## 12. Incremental implementation steps

### Step 1 — Author one course per worker

- Change: one course's lessons and banks.
- Verification: `npm run check:questions`; `npm run validate:content`.
- Evidence: §19.
- Rollback point: revert the course's files.

### Step 2 — Review the tranche

- Change: nothing.
- Verification: read the banks against their lessons; the checkers; the build.
- Evidence: §19.
- Rollback point: revert.

### Step 3 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior                | Command                    | Expected result             |
| ----------------------- | -------------------------- | --------------------------- |
| The questions are fair  | `npm run check:questions`  | No failure, no warning      |
| The content is valid    | `npm run validate:content` | 358 + the new entities      |
| The whole suite         | `npm test`                 | All pass                    |
| Formatting              | `npx prettier . --check`   | Clean                       |
| The site builds         | `npx quartz build`         | Exit 0                      |

### End-to-end/UI

| Flow                             | Viewport | Evidence                                                    |
| -------------------------------- | -------- | ----------------------------------------------------------- |
| A new lesson's checkpoint renders | 1440x900 | The quiz panel with its questions                           |
| Its answer key renders           | 1440x900 | The bank with its answers and explanations                  |
| The lesson and the key link      | 1440x900 | Both directions work                                        |
| The Practice index grows         | 1440x900 | The new courses appear with their lessons                   |

### Accessibility

The quiz and bank components are unchanged; the new material uses the same markup.

### Security

Not applicable.

### Performance

The quiz is a client-side component; the bank is a page. No new runtime.

## 14. Migration and compatibility

- No migration. New content only.
- The Practice page grows by the number of new lessons.
- Deployment order: merge → Vercel build → smoke test.

## 15. Deployment plan

- Preview: the local build served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Smoke tests: one new lesson's checkpoint, and the Practice index.
- Production approval: the owner approved this work on 2026-10-25.

## 16. Rollback and recovery

Revert the merge commit; the new lessons return to having no checkpoint, exactly as
before.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                     | Impact                                    | How it is resolved                                                     | Stop condition? |
| ------------------------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------- | --------------- |
| A question is not answerable from its lesson      | The reader is misled                      | Every question must use the lesson's own examples and figures; the reviewer checks each bank against its lesson | No           |
| The correct answers cluster in one position       | The checkpoint is testable                 | The gate fails the build; the worker fixes the bank                  | No              |
| A bank carries a certification claim               | The material reads as an exam             | The gate fails the build                                               | No              |
| Two workers touch the same file                    | A lost edit                               | Each worker owns exactly one course's files                           | No              |
| A lesson's own ID changes                          | Every link to it breaks                    | IDs are never edited; the work adds only                             | Yes, if it happens |

## 18. Adversarial review

1. Could a new question publish something false? **Yes** — that is the risk. Every
   question is grounded in its lesson's own text, and the reviewer reads the bank
   against the lesson before the tranche is landed.
2. Could this change the graph's semantics? **No** — the new links are authored links
   from a lesson to its own bank, exactly as the four existing courses do.
3. Could the new material be read as a certification exam? **No** — the gate rejects
   certification wording, and the material is written as practice.
4. Could unpublished content reach the site? **No** — every new bank declares
   `publish: true` and the publish filter is unchanged.
5. Could a question bank break the quiz plugin? **No** — the plugin parses every bank
   at build time and fails the build on a malformed one.
6. Does the work need an ADR? **No** — no package, dependency, ID rule, or graph
   semantics change.
7. Could the site's weight grow unacceptably? **No** — 27 new pages in this tranche, of
   the size of the existing ones.
8. Does it touch any existing content? **No.**

## 19. Completion evidence

### 19.1 Commands and results

```text
npx quartz build --concurrency=1
  Found 378 input files from `content`
  Parsed 378 Markdown files in 38s
  Emitted 1102 files to `public` in 8s

npm run validate:content
  Content validation passed: 377 entities, 377 unique IDs

npm run validate:graph
  Graph output valid: 377 pages, 394 tags, 2126 relationships, 797 graph-enabled HTML pages.

npm test
  tests 268  pass 268  fail 0

npm run check:questions
  Summary: 377 file(s), 1177 scored item(s), 92 file(s) with failures, 192 failure(s), 458 warning(s)
  (the baseline was 358 files, 1044 items, 92 files with failures, 192 failures, 458
   warnings - the failure and warning totals are unchanged, and no finding is raised
   against any of the new banks or the lessons they touch)

npx tsc --noEmit
  (no output)

npx prettier --check <the changed files>
  All matched files use Prettier code style!

npx wrangler deploy --dry-run
  --dry-run: exiting now.
```

### 19.2 Generated artifacts inspected

The new banks were checked for structure: 19 banks, 12 questions each, every bank with
the same mix of 7 single-choice, 2 multiple-select, 1 true-false and 2 free-recall,
every quiz naming its bank, every question id a quiz asks present in that bank, every
lesson linking its bank and every bank linking its lesson, and no id used twice.

### 19.3 UI evidence

Driven with Playwright against the live site after the merge:

```text
practice tables: 8 rows: 128
courses: ['Accounting + AI Crash Course', 'Advanced LLMs with RAG', 'Advanced Prompt
          Engineering Techniques', 'Agentic AI', 'AI Agent Crash Course', 'AI Basics',
          'AI for Project Management', 'Covered California']

lesson quiz panels: 1
lesson quiz questions: 6
lesson -> bank link: .../question-banks/00-foundations-of-prompt-engineering
after click: https://blog.howardlab.dev/courses/advanced-prompt-engineering-techniques/question-banks/00-foundations-of-prompt-engineering
bank prompts: 12

glossary chapter link: .../lessons/01-mechanics-of-machine-learning
after click: https://blog.howardlab.dev/courses/ai-basics-.../lessons/01-mechanics-of-machine-learning | How Machines Learn: Rules, Data, Filters, and Bias

live graph edges: 2126 pages: 771
```

The Practice page's generated index grew from four courses and 109 rows to eight
courses and 128 rows, with no change to the plugin: it finds the new banks by itself.

### 19.4 Deviations from plan

1. **A link defect was found and fixed on the way.** A link written as
   `[Chapter 0](./00-foundations-of-prompt-engineering)` is resolved by matching its
   last segment against every page on the site. When two pages share that name - a
   lesson and its question bank, or the glossary of two courses - the match is
   ambiguous and the link falls back to a path from the site root, which does not
   exist. This was already true on the live site, and adding a bank for every lesson
   would have made it true of four more courses. Ninety-five links in twenty-seven
   pages now name the page they mean, and the number of anchors pointing at a page
   that does not exist falls from forty-two to two. The two that remain are a
   different thing: a hashtag in a worked example that the Markdown parser reads as a
   tag link.
2. **A wiki-link inside a table cell needs its alias separator escaped,** because the
   pipe that separates the target from the alias is also the table's column
   separator. The repair followed the repository's own convention, and it repaired
   twelve course tables that had been showing their lesson titles as plain text
   since they were published.
3. **The glossary and final-assessment lessons of each course are left alone,** as
   the plan says. A glossary has nothing to practise, and a final assessment already
   carries its own fifteen inline scenarios with answers.

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
| 2026-10-25 | `bd58848` | This plan | - | - |
| 2026-10-25 | `77af545` | The repair of ninety-five course-contents links that resolved to the wrong page | §19.4 | - |
| 2026-10-25 | `671fc53` | Tranche 1: nineteen question banks and nineteen checkpoints for four courses, 228 questions | §19 | - |
| 2026-10-25 | `71506ad` | The deployment runbook | - | - |
| 2026-10-25 | `0abc85b` | The escaping of the alias separator in table cells, which also repaired twelve course tables | §19.4 | - |
| 2026-10-25 | `5b33069` | Pull request [#40](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/40) merged into `v5` after a green CI run | §19.3 | Tranches 2 to 4 |

### Tranche 1 acceptance gates

| Gate | Result |
| ---- | ------ |
| G1 - every teaching lesson of the four courses carries a quiz that names a bank that exists | Pass - 19 lessons, 19 banks |
| G2 - every bank holds 12 questions of the same kinds as the existing banks | Pass - the mix is 7/2/1/2 in all 19 |
| G3 - every question is answerable from its own lesson | Pass - the questions use each lesson's own figures and worked cases; reviewed against the lessons |
| G4 - `npm run check:questions` passes with no new finding | Pass - the failure and warning totals are identical to the baseline |
| G5 - the lesson links its bank and the bank links its lesson | Pass - both directions, every pair |
| G6 - the Practice index picks the new courses up and the graph is unchanged in shape | Pass - four courses and 109 rows became eight courses and 128 rows, with no change to the plugin |

### Still to come

Tranches 2 to 4 cover the remaining nine courses: 71 teaching lessons and 852
questions.
````

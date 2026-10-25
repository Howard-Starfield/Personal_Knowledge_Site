# Execution Plan: Phase X — Practice material for the courses that have none

| Field           | Value                                                            |
| --------------- | ---------------------------------------------------------------- |
| Status          | In progress                                                      |
| Owner           | Site maintainer (agent)                                          |
| Created         | 2026-10-25                                                       |
| Updated         | 2026-10-25                                                       |
| Baseline commit | `3c4b232` (merge of PR #39)                                     |
| Target branch   | `feat/practice-tranche-1`                                        |
| PR              | _filled after the pull request is opened_                        |
| PRD phase       | Public-learning baseline; every published course should be drilable |
| Related ADRs    | None                                                             |

## 1. Objective

Four of the seventeen published courses carry a quiz on every lesson, so a reader can
drill any topic and check the reasoning. The other **thirteen** courses publish no
question banks at all, so a reader of those 113 lessons has nothing to check their
understanding against.

Observable outcome: every lesson of every published course carries a quiz and links its
own answer key, and the Practice page's generated index lists all seventeen courses
rather than four.

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

| Scope/path  | Instruction file    | Relevant rules                                                            |
| ----------- | ------------------- | ------------------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; PR boundary; update tests and contracts with behaviour |
| Nested path | `content/AGENTS.md` | IDs never change; controlled tags; a lesson belongs to one course          |
| Question rules | `docs/exec-plans/active/question-quality-checker.md` | The thresholds a bank must satisfy |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                              | Official URL      | Verified date | Installed source file/symbol                 | Finding                                                                                                          |
| ------------------------------------------------------------- | ----------------- | ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| The house standard is 12 questions per bank                   | the repository    | 2026-10-25    | `content/courses/*/question-banks/*.md`        | accounting-ai 32/32 banks of 12; ai-agent 19/19 banks of 12; covered-california 57 banks averaging 12 (8–17).     |
| A bank must satisfy the position and length rules             | the repository    | 2026-10-25    | `scripts/check-question-quality.ts`            | `maxCorrectIsLongestPercent` 35, `minItemsForPositionBalance` 8, each position within 60–140% of an even share, `maxSamePositionRun` 3, `lengthCuePercent` 125. |
| A quiz block and its bank are joined by an immutable ID        | the repository    | 2026-10-25    | `plugins/knowledge-quiz/src/schema.ts`         | The block carries `quizId`, `questionBankId` and `questionIds`; the bank's frontmatter `id` is the bank ID.         |
| The practice index finds the material on its own               | the repository    | 2026-10-25    | `plugins/generated-index/src/index.ts`         | The index is built from the parsed quiz selections, so new banks appear with no change to the plugin.              |
| A bank must be parseable by the quiz plugin                     | the repository    | 2026-10-25    | `plugins/knowledge-quiz/src/schema.ts`         | Unknown keys are rejected, so a bank carries exactly the schema's keys.                                          |

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

| Area             | File/symbol                                        | Current responsibility                | Expected change            |
| ---------------- | -------------------------------------------------- | ------------------------------------- | -------------------------- |
| The lessons      | `content/courses/<course>/lessons/*.md`            | The teaching material                 | A quiz block at the end    |
| The banks        | `content/courses/<course>/question-banks/*.md`     | Nothing for these courses yet         | One file per lesson        |
| The quality gate | `scripts/check-question-quality.ts`                | Fails on a test-wise assessment       | Unchanged; the new material must pass it |
| The index        | `plugins/generated-index/src/index.ts`             | Finds the practice material           | Unchanged; it discovers the new banks |
| The links        | the lesson body and the bank body                  | Link each other                       | Both directions            |

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
tranches of three to five courses, each tranche its own pull request:

| Tranche | Courses                                                  | Lessons |
| ------- | -------------------------------------------------------- | ------- |
| 1       | advanced-llms-with-rag, advanced-prompt-engineering, agentic-ai, ai-for-project-management | 27 |
| 2       | ai-in-financial-forecasting, ai-in-risk-management, how-to-be-an-agent-boss, ai-model-trends | 29 |
| 3       | accounting-foundations, account-management, ai-solutions-and-techniques | 28 |
| 4       | ai-agents-in-depth, advanced-guide-to-chatgpt-embeddings | 28 |

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

```text
```knowledge-quiz
schemaVersion: 1
quizId: "<fresh UUID>"
title: "Checkpoint: <the lesson's subject>"
questionBankId: "<the bank's id>"
questionIds:
  - "<the ids of the questions the checkpoint asks>"
```
```

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

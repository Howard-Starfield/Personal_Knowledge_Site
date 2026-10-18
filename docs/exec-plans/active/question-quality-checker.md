# Execution Plan: Question-quality checker (test-wiseness guardrail)

| Field           | Value                                                                                 |
| --------------- | ------------------------------------------------------------------------------------- |
| Status          | In progress                                                                           |
| Owner           | Product owner; implementation by a Claude Code side session                           |
| Created         | 2026-10-18                                                                            |
| Updated         | 2026-10-18                                                                            |
| Baseline commit | `068520b`                                                                             |
| Target branch   | `claude/peaceful-clarke-3eb86a` (local only; push/PR requires owner approval)         |
| PR              | Not created                                                                           |
| PRD phase       | Supports Phase 2 quiz quality (FR-QUIZ-01..03); no runtime or schema change           |
| Related ADRs    | None required: a dev-only check script, no new dependency, no Quartz or schema change |

## 1. Objective

Add `npm run check:questions`, a read-only checker that exits nonzero when a multiple-choice
assessment can be answered by test-wiseness (answer length or answer position) rather than
knowledge, or when a page makes a certification claim or publishes placeholder content. It must
check both the inline lesson format used by the uncommitted WIP courses and the committed
`knowledge-question-bank` format, print a per-file report, and document its thresholds. The
authoring packet gains the same rules as machine-checked rejection criteria.

Motivating measurement (2026-10-18, 14 uncommitted courses, 384 four-option inline questions):
correct option longest in 97.1%; at least 20% longer than every distractor in 94.5%; correct
positions A 81 / B 222 / C 64 / D 17; one final assessment is B for all 15 questions.

## 2. Non-goals

- Rewriting any question, lesson, course, or runbook. The checker only reports.
- Changing the quiz client (for example option shuffling) or the V1 bank schema.
- Wiring the check into the build, `validate:content`, or CI. That is an owner decision.
- Semantic distractor quality, grammar cues, lexical-overlap cues, or factual review: those stay
  in the packet's human/independent audit.
- Moving the inline format into the bank format.

## 3. Acceptance gates

- [ ] `npm run check:questions [root]` exits 0 when no failure exists and 1 when any failure
      exists; exit 2 on usage error (missing root).
- [ ] Per assessment (one inline page, or one bank block) the following are **failures**:
  - correct-is-longest share > 35%;
  - with ≥ 8 scored items, any answer-position share outside 15%–35% (four-option items);
  - a run of more than 3 consecutive items with the same answer position.
- [ ] Per item **warnings**: correct option > 1.25× the longest wrong option; "all of the above" /
      "none of the above" options.
- [ ] Per page **failures**: certification wording on self-description surfaces (FR-QUIZ-03);
      `publish: true` page whose body is a placeholder.
- [ ] Malformed question markup and bank blocks that the V1 parser rejects are failures.
- [ ] Bank blocks are parsed with `parseQuestionBankBlock` from
      `plugins/knowledge-quiz/src/schema.ts`; no second bank parser.
- [ ] Tests cover passing, failing, boundary, and malformed fixtures; full `npm test` passes.
- [ ] Packet updated with the rules as machine-checked rejection criteria.
- [ ] Read-only run against the owner's main-checkout `content/` with a per-course table.

Evidence: test output, `tsc --noEmit` output, Prettier check on changed files, checker report.

## 4. Instruction sources

| Scope/path       | Instruction file                                   | Relevant rules                                                        |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------------------- |
| Repository       | `AGENTS.md`                                        | plan-before-code, strict TS, no `any`/casts, tests, no new dependency |
| `content/`       | `content/AGENTS.md`                                | read-only here; quiz answers never invented or changed                |
| Content contract | `docs/contracts/CONTENT_MODEL.md`                  | V1 bank block, question variants                                      |
| Authoring        | `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` | challenge and quality audit list (answer cues, label proportions)     |
| Product          | `docs/product/PRD.md` FR-QUIZ-01..03               | certification claims prohibited                                       |

## 5. Version and environment matrix

| Component               | Exact version | Source of truth                          | Notes                               |
| ----------------------- | ------------- | ---------------------------------------- | ----------------------------------- |
| Node                    | v24.14.0      | `node --version`                         | `engines.node >= 22`                |
| tsx                     | 4.23.1        | `node_modules/tsx/package.json`          | runs `.ts` scripts and `tsx --test` |
| TypeScript              | 5.9.3         | `node_modules/typescript/package.json`   | `strict: true`                      |
| yaml                    | 2.9.0         | `node_modules/yaml/package.json`         | existing dependency (frontmatter)   |
| remark-parse            | 11.0.0        | `node_modules/remark-parse/package.json` | existing dependency (fenced blocks) |
| unified                 | 11.0.5        | `node_modules/unified/package.json`      | existing dependency                 |
| Prettier                | 3.9.6         | `node_modules/prettier/package.json`     | repository formatting gate          |
| Quartz/Wrangler/D1/Pixi | n/a           | —                                        | not touched                         |

No dependency is added. `node_modules` resolves from the parent checkout.

## 6. Source verification

| Claim                                                           | Installed source                                                       | Finding                                                                                                                                                                                                |
| --------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bank blocks are fenced code with lang `knowledge-question-bank` | `plugins/knowledge-quiz/index.ts` (`visit(tree, "code")`, `node.lang`) | Use remark-parse `code` nodes with the same `lang` test.                                                                                                                                               |
| Bank parser and question variants                               | `plugins/knowledge-quiz/src/schema.ts` `parseQuestionBankBlock`        | Throws `Error` on invalid input; returns typed `single-choice`/`multiple-select`/… union.                                                                                                              |
| Bank ID comes from frontmatter `id`                             | `parseQuestionBankBlock(sourceText, bankId, source)`                   | Pass frontmatter `id` as `unknown`; the parser validates it.                                                                                                                                           |
| Quiz client does not shuffle options                            | `plugins/knowledge-quiz/src/quiz-client.ts` (no shuffle/random)        | Authored position is the learner-visible position, so position bias matters.                                                                                                                           |
| Test runner                                                     | `package.json` `"test": "tsx --test"`                                  | `*.test.ts` under `scripts/` is discovered.                                                                                                                                                            |
| tsconfig coverage                                               | `tsconfig.json` `include`                                              | `scripts/` is not included; add `scripts/**/*.ts` so the checker is strict-typechecked.                                                                                                                |
| Inline format in WIP courses                                    | main checkout `content/courses/**` (read-only grep)                    | 384 groups of `- A)`/`- **A)**`/`- [ ] A)` lines; `<details class="quiz-answer">` with `**Correct Answer:** X` (variants `**X**`, `X — text`). `thought-answer` blocks are free recall and not scored. |
| PRD FR-QUIZ-03                                                  | `docs/product/PRD.md` §13.5                                            | UI must never claim answers are suitable for certification.                                                                                                                                            |

## 7. Repository reconnaissance

- Baseline: `npm test` → 180 pass, 0 fail.
- Existing script style: `scripts/validate-content.mjs` (plain JS, collects failures, prints, exit 1)
  with a `spawnSync` CLI test. The checker must import the TypeScript bank parser, so it is a `.ts`
  script run through `tsx`, matching `npm test`'s use of `tsx`.
- Committed content: one bank (`content/courses/retrieval-field-guide/question-banks/fundamentals.md`).
- Found while reading: `.../ai-solutions-and-techniques-for-help-desk-operations/lessons/10-final-assessment.md`
  is `publish: true` with body `*Lesson content in development...*`.
- Found while reading: many WIP lessons use "certified"/"certification" as subject matter
  (ISO 27001 certification, GDPR-certified, certified appraiser). See §9 for scoping.

## 8. Contracts and invariants

- [x] No content, ID, schema, graph, or runtime change. The checker never writes files.
- [x] Course text is untrusted data: it is only matched with regexes and parsed by the strict V1
      parser; nothing in it is executed or followed.
- [x] Fail closed: unparseable question markup is a failure, not a skip.

## 9. Proposed design

`scripts/check-question-quality.ts` exports pure functions and a CLI entry:

1. Walk `root` for `*.md` (skip `AGENTS.md`), read each file, split YAML frontmatter.
2. Parse the body once with `remark-parse`. Fenced code nodes give (a) the
   `knowledge-question-bank` blocks and (b) line ranges excluded from inline scanning.
3. **Inline extraction** (line scan outside fenced code and outside `<details>…</details>`):
   option lines matching `- A) …`, `- **A)** …`, `- [ ] A) …` (also `*`, letters A–H) form a
   group that must start at A and continue alphabetically. The next `<details class="quiz-answer">`
   block must contain `**Correct Answer:** X`; X keys the group. Malformed cases: group without
   key, key without group, non-contiguous letters, fewer than 2 options, key letter not among
   options, quiz-answer without a parseable key, more than one key, unclosed quiz-answer block.
   An indented line or a `$$` display-math block directly after an option continues that option's
   text. `<details>` tags quoted inside inline code spans are prose, not markup.
4. **Bank extraction**: `parseQuestionBankBlock(block, frontmatter.id, source)`. A thrown error is
   a failure. `single-choice` questions become scored items (position = option index → letter);
   `multiple-select` options are checked only for "all/none of the above".
5. **Set metrics** per assessment (inline page or bank block), in document order.

### Thresholds (constants exported as `thresholds`)

| Rule                     | Level   | Definition                                                                                                                                                                                                                                                                       |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Correct-is-longest share | failure | share of scored items whose correct option length ≥ every wrong option length (ties count) **> 35%**                                                                                                                                                                             |
| Position balance         | failure | for items with k options, when that group has **≥ 8** items: each letter share must lie in **[0.6/k, 1.4/k]** (k=4 → 15%–35%)                                                                                                                                                    |
| Same-position run        | failure | more than **3** consecutive scored items with the same correct letter                                                                                                                                                                                                            |
| Length cue               | warning | correct option length **> 1.25 ×** longest wrong option                                                                                                                                                                                                                          |
| All/none of the above    | warning | any option text matching `all of the above` / `none of the above`                                                                                                                                                                                                                |
| Certification wording    | failure | `certify`, `certified`, `certifies`, `certifying`, `certification(s)` on a self-description surface                                                                                                                                                                              |
| Certification wording    | warning | the same words elsewhere in a page body (subject-matter use is common, e.g. ISO certification)                                                                                                                                                                                   |
| Placeholder page         | failure | `publish: true` and the body, after removing headings, emphasis markers, and HTML comments, is empty or ≤ 40 words containing a placeholder phrase (`content in development`, `coming soon`, `TBD`, `TODO`, `lorem ipsum`, `placeholder`, `to be written`, `under construction`) |
| Malformed markup         | failure | see step 3/4                                                                                                                                                                                                                                                                     |

Length = characters after stripping `*`, `` ` ``, `_` emphasis markers and collapsing whitespace.
Small sets are not exempt from the longest-share and run rules: a single-item quiz whose correct
option is longest fails; the author fixes it by rebalancing option lengths.

**Self-description surfaces** for the certification failure: frontmatter values, Markdown headings,
`<summary>` text, and the body outside fenced code of `type: course` and `type: question-bank` pages. Lesson
prose and question text only warn. This is a deliberate narrowing of the literal brief ("certify /
certified / certification wording → failure"): a literal page-wide failure would fail every WIP
course on legitimate subject matter (ISO 27001 certification, certified appraisers) and teach
authors to ignore the check. The warning keeps every occurrence visible for owner review.

### Alternatives considered

| Alternative                            | Problem                                                   | Decision    |
| -------------------------------------- | --------------------------------------------------------- | ----------- |
| Extend `validate-content.mjs`          | Plain JS cannot import the TS bank parser; mixes concerns | Rejected    |
| `.mjs` script + duplicated bank parser | Second parser drifts from the executable schema           | Rejected    |
| Fixed 15–35% band for any option count | Wrong for 2/3-option items (50% is ideal for A/B)         | Scaled band |
| Page-wide certification failure        | Mass false positives on subject matter                    | Scoped (§9) |

No ADR needed (no dependency, schema, graph, or topology change).

## 10. Data and schema changes

Static/build contracts: none. D1: not applicable. API: not applicable. Media: not applicable.
Report format is human-readable text; it is not a public contract.

## 11. File touch plan

| Order | File                                                 | Change                             |
| ----: | ---------------------------------------------------- | ---------------------------------- |
|     1 | `docs/exec-plans/active/question-quality-checker.md` | this plan                          |
|     2 | `scripts/check-question-quality.test.ts`             | tests                              |
|     3 | `scripts/fixtures/question-quality/**`               | fixture Markdown                   |
|     4 | `scripts/check-question-quality.ts`                  | checker                            |
|     5 | `package.json`                                       | `check:questions` script           |
|     6 | `tsconfig.json`                                      | include `scripts/**/*.ts`          |
|     7 | `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md`   | machine-checked rejection criteria |

## 12. Incremental steps

1. Tests and fixtures first (red). 2. Checker until tests pass (green). 3. `tsc`, Prettier,
   full `npm test`. 4. Packet update. 5. Read-only run against the main checkout's `content/`.

Rollback: revert the commit; nothing else depends on the script.

## 13. Test plan

| Behavior                                     | Fixture/test                  | Expected                         |
| -------------------------------------------- | ----------------------------- | -------------------------------- |
| Balanced inline assessment                   | `pass/balanced-inline.md`     | exit 0, no failures              |
| Valid bank (reuse of V1 parser)              | `pass/bank.md`                | exit 0                           |
| Length-cued, all-B assessment                | `fail/length-and-position.md` | longest-share, balance, run fail |
| Boundary 35% longest share (pass) / 36%      | generated items               | pass at ≤ 35%, fail above        |
| Boundary run of 3 (pass) / 4 (fail)          | generated items               | as stated                        |
| Balance ignored below 8 items                | generated 7 items             | no balance failure               |
| Balance band edges 15% / 35%                 | generated 20 items            | pass at edges, fail outside      |
| 1.25× warning edge                           | unit                          | equal ratio no warning           |
| All/none of the above                        | unit                          | warning                          |
| Certification on surface vs prose            | unit                          | failure vs warning               |
| Placeholder published page                   | `fail/placeholder.md`         | failure; unpublished not flagged |
| Malformed inline (no key, bad letter, gap)   | `malformed/*.md` + unit       | failure                          |
| Malformed bank YAML / schema violation       | `malformed/bank-invalid.md`   | failure with parser message      |
| Options inside fenced code / details ignored | unit                          | not scored                       |
| Missing root                                 | CLI                           | exit 2                           |

UI, accessibility, performance, security sections: not applicable (dev-time script; linear in
corpus size; no network; no writes).

## 14–16. Migration, deployment, rollback

Not applicable beyond reverting the commit. Not wired into build or deploy.

## 17. Risks and stop conditions

| Risk                                          | Resolution                                              |
| --------------------------------------------- | ------------------------------------------------------- |
| Prose lists using `- A)` misread as questions | Fail closed (reported as malformed); owner can see them |
| Thresholds too strict for tiny lesson quizzes | Documented; owner may tune constants in one place       |
| Certification scoping differs from brief      | Reported as a deviation for owner decision              |

## 18. Adversarial review

1–2, 4–5, 8–10: not applicable (no graph, ID, principal, D1, or runtime change). 3: the checker
reads unpublished pages but writes nothing and is not part of static output. 6: no new API; the V1
parser is reused. 7: no runtime feature.

## 19. Completion evidence

### Commands and results

```text
tsx --test scripts/check-question-quality.test.ts   -> 35 pass, 0 fail
tsx --test (full suite)                             -> 215 pass, 0 fail (baseline 180)
tsc --noEmit -p tsconfig.json                       -> exit 0 (now includes scripts/**/*.ts)
prettier --check <changed files>                    -> clean
npm run check:questions (worktree content/)         -> 1 failure: committed retrieval-field-guide
    bank has 1 scored single-choice question whose correct option ties for longest (32 = 32 chars)
tsx scripts/check-question-quality.ts <main checkout>/content (read-only) -> exit 1;
    137 files, 384 scored items, 33 files with failures, 76 failures, 398 warnings
```

Mutation checks: raising each threshold (longest share, run, length cue, low/high balance band,
minimum balance size) or disabling broken-group suppression makes at least one test fail.

Parser cross-check against the 2026-10-18 measurement: same 384 items and the same correct
positions (A 81 / B 222 / C 64 / D 17). Correct-is-longest is 98.4% here versus 97.1% in the seed
script because this checker strips Markdown emphasis and includes multi-line option text.

### Deviations from plan

- Certification wording is a failure only on self-description surfaces and a warning elsewhere
  (see §9); the brief asked for a page-wide failure. Owner decision pending.
- Added after the first real-corpus run: indented and `$` display-math option continuation, and
  ignoring `<details>` tags quoted in inline code. Both have regression tests.

## 20. Final acceptance checklist

See §3.

## 21. Completion log

| Date       | Commit                                 | Work completed                                        | Evidence | Remaining                                                                      |
| ---------- | -------------------------------------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| 2026-10-18 | branch `claude/peaceful-clarke-3eb86a` | Checker, tests, fixtures, npm script, packet criteria | §19      | Owner: certification scope; whether to wire into CI/validation; fixing content |

# Execution Plan: Publish the AI Agent and Accounting + AI crash courses

| Field           | Value                                                               |
| --------------- | ------------------------------------------------------------------- |
| Status          | Active, awaiting owner review of PR #13                             |
| Owner           | Product owner                                                       |
| Baseline commit | `068520b` (`v5`) plus ADR-0003 (`c1dd19b`)                          |
| Target branch   | `v5`, through PR #13 only                                           |
| Related ADR     | ADR-0003 (decision record; this plan does not implement its slices) |

## 1. Objective

Publish two owner-authored courses as Markdown under `content/courses/`:

- `ai-agent-crash-course`: 19 lessons.
- `accounting-ai-crash-course`: 32 lessons.

Every lesson has one bank-backed `knowledge-question-bank` with 12 questions. The bank feeds the lesson's retrieval-checkpoint quizzes and its chapter quiz.

## 2. Non-goals

- No code, plugin, schema or configuration change.
- No change to Phase 0 hosting or deployment.
- No cross-chapter review items or interleaved final assessment. A later plan adds them.
- No LinkedIn-derived course. Those stay gated on the owner's rights decision.

## 3. Acceptance gates

- **Content contract** (`docs/contracts/CONTENT_MODEL.md`): every page has exactly one lowercase UUIDv4, `publish: true` and `status: active`. Lessons reference their course by `courseId` and have a unique `lessonOrder`.
- **Quiz references:** every quiz block references an existing bank and active question IDs (PRD FR-QUIZ-01).
- **Item quality:** `check:questions` passes with no length or position cues.
- **No secrets or private paths:** no private data, transcripts or local paths in published files.

## 4. Source evidence

- **Sources** (read-only, owner-declared): the owner's MIT-licensed course folders `AI_AGENT_CRASH_COURSE` and `accounting_ai_crash_course` under the owner's `linkedinLearning` directory. `BOBO_FACTS.md` defines the fictional company used in the accounting examples.
- **Rewrite:** lessons are rewritten in the agents' own words, not copied.
- **Fact-check:**
  - every chapter was checked against its source chapter;
  - 15 chapters also had an independent check against official documentation or primary sources;
  - every correction was applied.
  - Reports live in git-ignored `private/content-authoring/<course>/fact-check/`.

## 5. Files

- `content/courses/ai-agent-crash-course/{index.md,lessons/*.md,question-banks/*.md}`
- `content/courses/accounting-ai-crash-course/{index.md,lessons/*.md,question-banks/*.md}`
- `AGENTS.md`: one-sentence `study` carve-out that makes ADR-0003 implementable.

## 6. Tests and evidence

| Check                                             | Result                                       |
| ------------------------------------------------- | -------------------------------------------- |
| `node scripts/validate-content.mjs`               | Pass: 655 entities, 655 unique IDs           |
| `check:questions` (PR #12) on both course folders | 0 failures, 348 scored items                 |
| `npx quartz build`                                | 782 files emitted; 51 lessons render quizzes |

## 7. Security and privacy

- Answers are public by design (FR-QUIZ-03).
- Fact-check reports and source extracts stay in `private/`.

## 8. Rollback

Revert the PR #13 merge commit. Content IDs are new, so nothing else references them yet, and no user data is involved.

## 9. Stop conditions

- A review finds copied source text, an unverified factual claim, or a broken quiz reference.
- The owner withholds publication.

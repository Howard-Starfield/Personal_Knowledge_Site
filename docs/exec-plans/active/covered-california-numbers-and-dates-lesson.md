# Execution Plan: Publish the final-assessment and numbers-and-dates lessons

| Field           | Value                                                      |
| --------------- | ---------------------------------------------------------- |
| Status          | Active — implemented, awaiting owner review                |
| Owner           | Product owner                                              |
| Baseline commit | `aeac500`                                                  |
| Target branch   | `v5`, through a pull request only                          |
| Related         | `docs/exec-plans/active/covered-california-publication.md` |

## 1. Objective

Add two lessons to the published Covered California course and make the
numbers in the course findable in one place.

1. **The Final Assessment: How It Works, and Twenty-Five Questions with Their
   Answers** — the format the training describes, and twenty-five questions
   answered the way a representative would answer them, each naming the
   document the answer lives in.
2. **The Numbers and Dates to Know by Heart** — a memorisation sheet of the
   windows, the deadlines and the money, sorted by _whose_ figure each one is:
   published policy, the training's own, or one consumer's case.

## 2. Non-goals

- No change to the site framework, the schema, the plugins' behaviour or the
  deployment target.
- No quiz item that contradicts an existing lesson.
- No figure asserted without its source.

## 3. What changed and why

### The final-assessment lesson was corrected before it was published

It was authored in the private package but never published, because its
premise did not survive checking:

- There is **no surviving owner worksheet** anywhere in the library. The
  phrases it quoted appear only in the package's own files.
- The 23 October review recording is **45 seconds of speech over a silent
  screen** — six segments, `speech_likely: false`. It is not the source of
  anything.
- The assessment format the training actually describes is a **twenty-question
  review** where you locate the answers rather than choose from options, and a
  **fifty-question multiple-choice final** (session `2026-10-15 mi-term-exam`).

The answers, the traps and the "where it lives" lines were sound — they cite
named lessons and named sessions — so only the framing was wrong. The lesson
now states the assessment format as the training gives it, says plainly that
the twenty-five questions are **this package's own revision set**, and drops
the quoted instruction, the invented count and the claim that a worksheet
survives.

### The numbers-and-dates lesson is new

Built from the lessons that already teach each figure, so it cannot disagree
with them. Its spine is a provenance taxonomy, because the failure mode is not
forgetting a figure but quoting one of the wrong kind: a figure the official
record publishes, a figure only the training gives, or a date from one
consumer's case.

Two figures carry a second label: the 14 days' notice (published, and the
training calls it advice rather than a rule) and the tribal cost-sharing band
(the training puts it above 300%, the official record publishes it at any
household income).

One figure has no external source: the Franchise Tax Board's 7.28% threshold
for tax year 2025 appears only in the package's own lessons. It is labelled as
the training's account of what the FTB publishes, and it is flagged here
because it is the one number on the sheet nobody can check.

## 4. The lint rule was narrowed, not relaxed

The forbidden-wording rule exists so that no page reads as a qualification
programme. It was failing on the session locator `2026-10-15 mi-term-exam`,
because the owner named a recording `Mi-term-exam.mp4`. A locator is
documentation of the training, not a claim about the reader, so
`tools/lint_package.py` now removes **every session id the package knows
about** from the line before the scan, in all three forms a lesson may cite
one. Everything else is still caught.

## 5. Evidence

| Check                                 | Result                                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Package `run_all_checks.py --rebuild` | All checks pass: 57 lessons, 685 questions, 348 trap rows, 25 operational sections, 57 keyless views |
| Package `check_number_grounding.py`   | Every number in the prose appears in a source                                                        |
| `node scripts/validate-content.mjs`   | 357 entities, 357 unique IDs                                                                         |
| `check:questions` on the course       | 115 files, 308 scored items, 0 failures                                                              |
| `npx tsc --noEmit` / `npm test`       | clean / all pass                                                                                     |
| `npx quartz build --concurrency=1`    | builds, and the course page links all 57 lessons                                                     |
| `npm run validate:graph`              | valid                                                                                                |
| `npx wrangler deploy --dry-run`       | accepted                                                                                             |

## 6. Rollback

Revert the pull request's merge commit. Every content id is new, so a revert is
clean.

## 7. Stop conditions

- The owner does not want the final-assessment lesson published. Reverting the
  merge removes it; the private package keeps the work.
- The 7.28% figure is not wanted on the sheet, or the owner wants it sourced
  or dropped. It is one row and one question.
- A review finds a figure on the sheet that its source lesson does not support.

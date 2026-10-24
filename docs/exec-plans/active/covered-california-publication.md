# Execution Plan: Publish the Covered California enroller core programme

| Field           | Value                                                                |
| --------------- | -------------------------------------------------------------------- |
| Status          | Active, awaiting owner review                                        |
| Owner           | Product owner                                                        |
| Baseline commit | `5a14483` (`v5` and `ttec`)                                          |
| Target branch   | `v5`, through a pull request only                                    |
| Related         | `placement-proposal.yaml` in the private package; `CONTENT_MODEL.md` |

## 1. Objective

Publish the reviewed Covered California enroller core programme as public
Markdown under `content/courses/covered-california-certification/`: 55
lessons, each with its own question bank, plus the course index.

The course was compiled in the git-ignored private package
`private/content-authoring/covered-california-certification/`. The owner has
now decided it should be public. This plan records how it moves, what proves
it correct, and where it stops.

## 2. Non-goals

- No code, plugin, schema, configuration or hosting change.
- No change to the private package. It stays the review record.
- No change to the fact-check record, the trap register or the glossary. They
  remain private working documents.
- No deployment, no Pages enable, no DNS, no merge into `v5`.
- No removal of the training's own figures, and no blending of them into
  published policy.

## 3. Acceptance gates

- **Content contract** (`docs/contracts/CONTENT_MODEL.md`): every page has
  exactly one lowercase UUIDv4, `publish: true`, `status: active`, and a
  non-empty `tags` array. Lessons reference their course by `courseId` and
  have a unique positive `lessonOrder`. Question banks live below the owning
  course's `question-banks/`.
- **Item quality:** `check:questions` passes with no length or position cues.
- **No secrets or private paths:** no private data, transcripts or local paths
  in published files.
- **Site build:** `npx quartz build` succeeds and the course renders.

## 4. Source evidence

- **Source (read-only):** the reviewed private package. Its `id-manifest.json`
  owns every identity — 1 course, 55 lesson, 55 bank and 643 question UUIDs.
  Nothing is re-minted; ids are carried across unchanged.
- **Underlying material:** 45 training sessions from the owner's 2026
  recording library, and a local mirror of the official Covered California
  site. The fact-check record for each lesson lives in the private package.
- **Every figure is labelled.** Figures the official record publishes are
  attributed to it. Figures only the training gives — the 95-day and 155-day
  document periods, the 60-day document extension, the 30-day reinstatement
  window, the 10-business-day resend wait — are labelled as the training's
  own in every lesson that states them, because the official record publishes
  no number of days for any of them.

## 5. Files

- `content/courses/covered-california-certification/index.md`
- `content/courses/covered-california-certification/lessons/<lesson-slug>.md` (55)
- `content/courses/covered-california-certification/question-banks/<lesson-slug>.md` (55)

The package's frontmatter is already in the repository's format, and its
question-bank body is already the repository's `knowledge-question-bank` block,
so the promotion is a location change plus `publish: false` -> `publish: true`.
The lesson bodies carry the repository's `knowledge-quiz` block unchanged, so
the retrieval checkpoints and the end-of-lesson quiz keep working.

## 6. Tests and evidence

| Check                                  | Result                                                          |
| -------------------------------------- | --------------------------------------------------------------- |
| `node scripts/validate-content.mjs`    | Pass: 353 entities, 353 unique IDs                              |
| `check:questions` on the course folder | 0 failures, 297 scored items, 2 warnings                        |
| `npx quartz build --concurrency=1`     | Pass: 354 files parsed, 944 files emitted                       |
| Local paths in published files         | None — the 19 path hits are all in the private review documents |
| Internal links in published files      | None, so no link can break on the move                          |

## 7. Security and privacy

- Answers are public by design, as elsewhere in this site.
- No transcript, no local path and no intake file is published.
- The lessons quote statutory and regulatory language that the official record
  also publishes; the sampled verbatim runs are public law and public site
  wording, not the training's script.
- The training's own figures stay labelled as the training's, so a reader
  cannot mistake them for published policy.
- Timestamps in the lessons locate statements inside the owner's training
  recordings. They are provenance, not content, and they expose nothing.

## 8. Rollback

Revert the pull request's merge commit. Every content id is new and nothing
else references it yet, so a revert is clean and no user data is involved.

## 9. Stop conditions

- A review finds copied source text, an unverified factual claim, or a broken
  quiz reference.
- A review finds a local path, a transcript, or employer-identifying content
  in a published file.
- The owner withholds publication.
- The content contract's identity rule is read to forbid carrying the
  package's slug-derived question ids into `content/`. In that case the
  question ids need the sanctioned creation helper, and the plan does not
  proceed until that is settled.

# ADR-0003: Owner Notes Inbox, Study-Branch Auto-Merge, and Visitor Comments

| Field                  | Value                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Status                 | Accepted                                                                                                                               |
| Date                   | 2026-10-18                                                                                                                             |
| Decision owners        | Product owner                                                                                                                          |
| Related PRD section    | FR-ANN-05 to FR-ANN-07, FR-COMMENT-01 to FR-COMMENT-04, SEC-03, SEC-04, OQ-11, OQ-12, Phases 3 and 4                                   |
| Related execution plan | One plan per rollout slice, created from `docs/exec-plans/PLAN_TEMPLATE.md` before that slice is coded                                 |
| Supersedes             | None. Amends the PRD defaults for OQ-12, FR-ANN-06 and FR-COMMENT-04, and the AGENTS.md no-auto-merge rule for the `study` branch only |
| Superseded by          | None                                                                                                                                   |

## Context

The owner wants to:

1. share the site publicly with other people;
2. post private notes while reading (questions, "explain this better",
   "quiz me more", corrections, reminders) using their own login;
3. have an AI agent pick those notes up whenever the owner starts it and turn
   them into new quiz questions, clarification articles, callouts or
   corrections to learn from;
4. let visitors comment on lessons and articles.

The PRD already plans most of this: the owner-only Learning Inbox (FR-ANN-05),
the capture-to-pull-request workflow (FR-ANN-06), a private GitHub Issues
adapter (FR-ANN-07, OQ-11) and optional Giscus discussion (FR-COMMENT-01 to 04).
Three PRD defaults conflict with the owner's decisions of 2026-10-18:

- OQ-12 defaults to processing one explicitly supplied issue per run;
- FR-ANN-06 and AGENTS.md forbid any agent auto-merge;
- FR-COMMENT-03/04 keep comments disabled, and opt-in per page if enabled.

## Decision drivers

- A fast learning loop: generated material should be studyable without waiting
  for a review.
- The publicly shared site stays human-reviewed.
- No custom password or session system, and no secret in a browser bundle.
- Captured text and visitor comments cannot steer the agent.
- Immutable content IDs remain the only identity (threads and notes survive
  renames and moves).
- Low operating cost: nothing runs unattended or bills while idle.
- Every step can be rolled back without deleting notes or discussions.

## Verified evidence

| Claim                                                         | Official source URL                                                                                                                                          | Verified date | Pinned source file/symbol or experiment                                            | Finding                                                                                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Issue-form fields can be prefilled from URL query parameters  | https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-githubs-form-schema (Context7 `/github/docs`) | 2026-10-18    | —                                                                                  | A field's `id` is its canonical key for URL prefill.                                                                      |
| New-issue URL behaviour                                       | https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-an-issue (Context7 `/github/docs`)                                    | 2026-10-18    | —                                                                                  | `template` and `labels` parameters exist; a user without permission gets `404`; an over-long URL gets `414 URI Too Long`. |
| Installed comments plugin cannot key a thread to a content ID | —                                                                                                                                                            | 2026-10-18    | `node_modules/@quartz-community/comments@0.1.0` `dist/index.d.ts`, `dist/index.js` | `mapping` accepts `specific`, but no per-page `term` is emitted; `comments: false` frontmatter hides the thread.          |
| GitHub CLI can target a base branch and open the PR form      | `gh pr create --help`                                                                                                                                        | 2026-10-18    | gh 2.97.0                                                                          | `--base`, `--head`, `--fill`, `--web` exist.                                                                              |
| Preview URLs are already enabled for the Worker               | —                                                                                                                                                            | 2026-10-18    | `wrangler.jsonc` `preview_urls: true`                                              | Preview-alias deployment for `study` is **not yet verified**; slice 2 must prove it against Wrangler 4.125.0.             |

## Considered options

### Option A — Keep the PRD defaults

One explicitly named issue per run, human merge of every PR, comments off.

- Advantages: no rule changes; the strongest review boundary.
- Disadvantages: the owner reviews every generated change before studying it,
  which slows the learning loop the site exists for.

### Option B — Agent self-merges straight into `v5`

- Advantages: fully hands-off.
- Disadvantages/risks: unreviewed AI answers and articles reach the people the
  site is shared with; `v5` protection could not require a human review.

### Option C — Agent self-merges into `study`; the owner promotes to `v5` (selected)

- Advantages: generated material is studyable within minutes on a preview,
  while the shared site only receives owner-reviewed batches.
- Disadvantages/risks: a second long-lived branch to keep in sync; `study` is
  a branch of a **public** repository, so anything merged there is visible on
  GitHub even though it is not on the shared site.

Also considered and rejected for now: an in-site note form behind Cloudflare
Access (deferred to a later slice); scheduled or GitHub Actions–triggered agent
runs (cost and unattended behaviour); one public comment thread that the agent
also reads (prompt-injection exposure).

## Decision

**1. Private notes.** A new private repository, `Howard-Starfield/learning-inbox`,
holds owner notes as issues created from one issue form,
`.github/ISSUE_TEMPLATE/note.yml`, with the default label `ready` and these fields:

| Field id     | Type     | Required | Meaning                                                                                                                                                    |
| ------------ | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content_id` | input    | yes      | Immutable ID of the page (prefilled)                                                                                                                       |
| `page`       | input    | no       | Page URL, display context only (prefilled)                                                                                                                 |
| `kind`       | dropdown | yes      | Question or Explain this better → `question`; Quiz me more → `quiz-candidate`; Correction → `correction`; Study note → `study-note`; Reminder → `reminder` |
| `note`       | textarea | yes      | The owner's note                                                                                                                                           |
| `selection`  | textarea | no       | Text selected on the page (prefilled, capped at 1,500 characters)                                                                                          |

The capture ID is the provider-assigned `learning-inbox#<issue number>`; the
creation time is the issue's `created_at`.

**2. "Private note" button.** A local Quartz component (new local plugin
`plugins/owner-note`) renders on lessons and articles. It is a plain link,
built at build time, to the prefilled issue form, so it works without
JavaScript. A small client script adds the current text selection on click,
initialises once per page and cleans up through the Quartz SPA cleanup hook.
The owner's GitHub permission on the private repository is the only
authorization; visitors who follow the link get GitHub's `404`. The inbox
repository's name appears in public HTML and is not treated as a secret.

**3. Agent run.** When the owner starts a session and runs `/process-inbox`, the
agent processes every open note labelled `ready`. This batch mode becomes operative only when slice 0 updates `content/AGENTS.md` (Learning Inbox ingestion) and `docs/runbooks/LEARNING_INBOX_AGENT.md` to authorize it; until then the existing one-explicit-item procedure governs. An owner-authored `ready` note is the owner's explicit selection (the matching AGENTS.md carve-out); the owner removes the label to hold a note back:

1. A helper (`scripts/inbox.ts`) lists notes through `gh` and validates each
   envelope. A note fails closed when its author is not the owner, its
   `content_id` is unknown, its `kind` is unsupported or its note is empty.
2. For each note the agent chooses exactly one disposition from
   `docs/runbooks/LEARNING_INBOX_AGENT.md`: question-bank change, Learning Log
   entry, inline callout, editorial correction, duplicate, or `needs-answer`.
3. `needs-answer` makes no content change: the agent comments its question on
   the issue and labels it `needs-answer`. It never invents an answer.
4. Any other disposition gets a branch `inbox/<issue>-<slug>` cut from `study`
   and one PR into `study`. Before merging, `validate:content`, the tests, a
   real build and `check:questions` for the touched course must pass, along
   with the required `verify` check on the PR. A course is eligible only once
   its assessments live in a question bank that passes `check:questions`.
5. The agent then merges its own PR into `study` and labels the issue
   `in-study`.
6. The PR body cites the capture ID, the disposition, the evidence used and any
   new IDs. It never copies the note or selection text into the public
   repository.
7. New IDs come only from a UUID helper (`scripts/new-id`), which slice 0 adds.

**4. Promotion.** On request, the agent opens one PR from `study` into `v5`
summarising the included notes. Only the owner merges it. After that merge, the
next run closes the covered issues as `done` and brings `study` back in line
with `v5`. A change the owner drops during promotion marks its issue
`rejected`, with the reason.

**5. Deployments.** A push to `study` deploys an unlisted, non-indexed preview;
a push to `v5` deploys production. Both are Cloudflare Workers Static Assets
deployments with separate preview and production configuration.

**6. Visitor comments.** Giscus threads, stored in GitHub Discussions on the
public repository, appear on lessons and articles of the public site. Category,
index and tag pages get none, and a validated `comments: false` disables a
single page.

- A local wrapper (new local plugin `plugins/knowledge-comments`) uses Giscus
  `specific` mapping with the page's immutable ID as the term, so threads
  survive renames and moves.
- Giscus loads lazily and fails isolated.
- Moderation uses GitHub Discussions' own tools and notifications.
- The About page discloses the external script and the GitHub sign-in.
- Visitor comments are never an agent input. The owner copies a worthwhile
  question into a private note.

**Not approved by this ADR:**

- agent merges into `v5`;
- scheduled or event-triggered agent runs;
- an in-site form or Cloudflare Access;
- D1 or any server-side store;
- agents reading Giscus;
- comments on category, index or tag pages;
- spaced repetition or any persistent learner state;
- publishing a LinkedIn-derived course to `v5` before the owner's rights
  decision for it.

## Contract impact

- [x] Quartz/core/plugin boundary — two new local plugins (`owner-note`,
      `knowledge-comments`); no Quartz core patch.
- [x] content/frontmatter schema — optional boolean `comments` (default `true`
      on lessons and articles); the validator rejects other values.
- [x] immutable IDs — used as the note's `content_id` and as the Giscus term.
- [ ] category table
- [ ] graph semantics/manifest — notes and comments never create edges.
- [ ] public routes/permalinks
- [ ] API contract
- [ ] D1 schema/migrations
- [x] Access/auth/authorization — the owner's GitHub repository permission is
      the capture authorization; no site-owned auth.
- [ ] R2/Stream media contract
- [x] deployment topology — `study` preview plus `v5` production.
- [x] privacy/retention — private inbox repository; public Discussions;
      a public `study` branch.
- [x] frontend/accessibility — note button and comment thread.
- [x] dependency/version matrix — Giscus is a remote runtime dependency to be
      recorded with its CSP origins.

## Consequences

### Positive

- The owner can study agent-generated material within minutes, without waiting
  for a review.
- The shared site only changes through owner-reviewed promotion PRs.
- No credentials ship to the browser, and no server or database is added.
- Notes and threads stay attached to pages through renames and moves.

### Negative

- `study` must be kept in sync with `v5` after every promotion.
- Anything merged into `study` is publicly visible on GitHub.
- The note flow leaves the site for GitHub's issue form.

### New risks

- Generated answers could be wrong on `study` until the owner catches them
  during study or promotion. This is mitigated by the evidence requirement, the
  `needs-answer` path and the question checker.
- Spam or abuse in Discussions, mitigated by GitHub moderation and the option
  to restrict posting.
- A note whose selected text contains instructions. The agent treats all note
  and selection text as untrusted data (SEC-03).

## Migration plan

0. **Rules and helpers:**
   - accept this ADR;
   - update the PRD (OQ-11 resolved as direct private issues, OQ-12,
     FR-ANN-06, FR-COMMENT-03/04, Phases 3 and 4), AGENTS.md (the `study`
     carve-out), `LEARNING_INBOX_AGENT.md`, CONTENT_MODEL (note envelope
     mapping, `comments` field), SECURITY.md and VERSION_MATRIX;
   - remove the stale OQ-09 gate in `content/AGENTS.md`;
   - add `scripts/new-id`;
   - extend the `verify` check to PRs into `study`.
1. **Notes loop:**
   - create the inbox repository and issue form;
   - add `plugins/owner-note`, `scripts/inbox.ts` and `/process-inbox`;
   - create `study` from `v5` and protect it with the required `verify` check;
   - prove the loop end to end with three real notes on one pilot course that
     already uses a question bank.
2. **Deployments:** the `study` preview deploy, the `v5` production deploy, and
   the agent's promotion PR. Prerequisites: `baseUrl`, Cloudflare credentials
   stored as GitHub secrets by the owner, `v5` branch protection, and the
   Bookerly font removed from the build.
3. **Visitor comments:**
   - enable Discussions and the Giscus app;
   - add `plugins/knowledge-comments`;
   - add the privacy note on the About page;
   - set up moderation and notifications.
4. **Later, each with its own plan:** an in-site form behind Cloudflare Access;
   spaced review (needs a PRD change to FR-COURSE-04).

## Backward compatibility

- Existing content needs no changes. Pages without `comments` behave as
  `comments: true` on lessons and articles, and as no comments elsewhere.
- The note envelope starts at version 1. The helper rejects any issue that
  lacks the form's fields rather than guessing.

## Rollback

| To roll back | Do this                                                  | What is kept                        |
| ------------ | -------------------------------------------------------- | ----------------------------------- |
| Note capture | Remove the `owner-note` plugin from `quartz.config.yaml` | The inbox repository and every note |
| Agent loop   | Stop running `/process-inbox`                            | Open notes stay `ready`             |
| Promotion    | Revert the promotion PR on `v5` with a normal revert PR  | `study` and the notes               |
| Comments     | Disable `knowledge-comments`                             | Discussions remain in GitHub        |
| Previews     | Delete the `study` preview alias                         | —                                   |

No step deletes notes, discussions or Git history.

## Validation and acceptance evidence

- **`owner-note`:**
  - unit tests for the link: field ids, encoding, the selection cap and
    staying under the length limit;
  - a no-JavaScript render;
  - keyboard and accessible-name checks;
  - one listener per page after repeated SPA navigation.
- **`scripts/inbox.ts`:** fixtures for a valid note, a non-owner author, an
  unknown `content_id`, an unsupported `kind`, an empty note, a duplicate run
  of the same issue, and a `gh` failure.
- **`/process-inbox`:** a dry run on fixture issues, then an end-to-end run
  with three real notes (one quiz, one clarification, one `needs-answer`).
  Evidence: PR links and the label transitions.
- **`knowledge-comments`:**
  - the Giscus term equals the content ID;
  - `comments: false` renders nothing;
  - no duplicate iframe after repeated SPA navigation;
  - the article stays readable when giscus.app is blocked;
  - an axe check of the thread container.
- **Deployments:** preview and production URLs recorded; preview served with
  a no-index header; separate preview and production configuration shown.

## Follow-up work

- [ ] Update PRD sections listed in slice 0.
- [ ] Update root `AGENTS.md` and `content/AGENTS.md` for the `study` carve-out.
- [ ] Update `VERSION_MATRIX.md`, `CONTENT_MODEL.md`, `SECURITY.md`.
- [ ] Create one execution plan per slice and link its PR here.
- [ ] Add a promotion and rollback runbook for `study` → `v5`.

## Unresolved assumptions to verify in their slice

- The exact GitHub new-issue URL length limit (the 1,500-character selection
  cap is conservative).
- Wrangler 4.125.0 preview-alias deployment, and a no-index header for the
  preview.
- The Claude Code project command format for `/process-inbox`.
- Repository auto-merge settings and branch protection for `study`.
- The Giscus repository and category IDs (from the owner's Giscus setup).

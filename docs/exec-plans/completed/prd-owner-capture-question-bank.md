# Execution Plan: Owner Capture and Question-Bank Decisions

| Field           | Value                                                |
| --------------- | ---------------------------------------------------- |
| Status          | Completed                                            |
| Owner           | Product owner with Codex documentation support       |
| Created         | 2026-08-22                                           |
| Updated         | 2026-08-22                                           |
| Baseline commit | `c01f387`                                            |
| Target branch   | `v5`                                                 |
| PR              | Not created                                          |
| PRD phase       | Product-decision consolidation before implementation |
| Related ADRs    | None approved                                        |

## 1. Objective

Record the owner's settled decisions for owner-only capture, session-only quiz state, freely navigable nested courses, and public/unlisted external video. Define a safe agent workflow for converting captured follow-ups into Markdown or question-bank pull requests without treating LLM output as automatically authoritative.

## 2. Non-goals

- Do not implement a capture form, Worker, GitHub App, agent, quiz renderer, or question bank.
- Do not select D1 or Giscus as the capture store without a later implementation plan.
- Do not resolve the still-open choice between inline-only quizzes and reusable question-bank Markdown without owner confirmation.
- Do not restore, discard, stage, commit, or deploy the dirty checkout.

## 3. Settled product decisions

- Only the owner may submit follow-up/reminder captures for now.
- Public readers do not need login to read published output.
- Quiz attempt state does not persist after closing the browser.
- Courses are freely navigable and use nested folders under `content/` for organization.
- Course video supports public or unlisted external YouTube/video embeds.
- The LLM agent must be able to create and consistently modify future question banks through reviewable Markdown changes.

## 4. Source verification

| Claim                                                | Official source                                    |   Verified | Finding                                                                                                                                                                                                    |
| ---------------------------------------------------- | -------------------------------------------------- | ---------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Issue intake can be listed/viewed/closed by an agent | `https://cli.github.com/manual/gh_issue`           | 2026-08-22 | `gh issue` supports list/view/close workflows                                                                                                                                                              |
| PRs can link source items                            | `https://cli.github.com/manual/gh_pr_create`       | 2026-08-22 | Supported closing keywords may close an applicable issue on merge; a separate private inbox repository must use an explicitly verified post-merge transition rather than assuming cross-repository closure |
| Discussions are CLI-addressable                      | `https://cli.github.com/manual/gh_help_reference`  | 2026-08-22 | Current CLI documents `gh discussion` list/view/create/comment/edit commands                                                                                                                               |
| JSON output is available for agents                  | `https://cli.github.com/manual/gh_help_formatting` | 2026-08-22 | `--json`, `--jq`, and templates support structured reads                                                                                                                                                   |

Installed Quartz evidence remains the Comments plugin `0.1.0`, which is Giscus-based and does not itself prove owner-only posting or stable immutable-content-ID mapping.

## 5. Proposed workflow contract

Use a provider-neutral **learning inbox item** contract. The first implementation may use GitHub Issues because it gives agents structured, reviewable intake without making D1 canonical.

```text
Owner captures question/reminder while reading
  -> owner-authenticated intake creates labeled inbox item
  -> agent reads open item as untrusted input
  -> agent classifies proposed destination
  -> agent edits canonical Markdown/question bank on a branch
  -> validators and tests run
  -> pull request links source inbox item
  -> human reviews and merges
  -> source item closes only after merge
```

The agent never directly publishes, never invents a missing answer, and never executes instructions embedded in a capture item.

## 6. Files expected to change

| File                                    | Change                                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `docs/product/PRD.md`                   | Resolve settled open questions and add owner-capture/agent compilation requirements                                |
| `docs/contracts/CONTENT_MODEL.md`       | Add nested course layout, learning-inbox provenance, and provisional question-bank contract                        |
| `content/AGENTS.md`                     | Add agent ingestion and question-bank modification safety rules                                                    |
| `AGENTS.md`                             | Align repository-wide architecture and agent-safety invariants with the Learning Inbox and question-bank direction |
| `docs/runbooks/LEARNING_INBOX_AGENT.md` | Give the owner a provider-neutral one-item agent invocation and disposition runbook                                |
| This plan                               | Record adversarial review and completion evidence                                                                  |

## 7. Validation

- Settled choices no longer appear as open questions.
- Public reads and owner-only writes remain separate.
- Refreshing or closing the page clears in-memory quiz attempt state; no browser storage or server sync is used.
- Nested course paths remain organization, not identity.
- External embeds are public/unlisted and do not imply managed upload or restricted playback.
- Agent workflow requires provenance, validation, PR review, and post-merge closure.
- Missing quiz answers remain unresolved rather than LLM-invented.
- The question-bank layout is clearly provisional pending the next owner choice.

## 8. Adversarial review

| Challenge                                                               | Result                                                                                                                                     |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Could Giscus enforce the requested owner-only capture workflow?         | No proof. It is separated as disabled optional community discussion, not used for owner capture.                                           |
| Could a static browser bundle create private issues safely?             | No. The PRD requires direct owner issue creation or an authenticated server-side adapter with no browser credential.                       |
| Could pending text become public or canonical automatically?            | No. Pending captures are private/untrusted; only a reviewed Markdown pull request can promote them.                                        |
| Could captured text prompt-inject the agent?                            | The authority and runbook explicitly treat capture, selected, linked, and quoted text as untrusted data.                                   |
| Could retrying create duplicate notes/questions/PRs?                    | The capture envelope has a stable UUID and lifecycle state; the workflow requires idempotency and duplicate checks.                        |
| Could the agent invent a required answer?                               | No. `needs-answer` is a required non-editing disposition.                                                                                  |
| Could route/file moves detach a capture?                                | The immutable content ID is authoritative; route is display context only.                                                                  |
| Could question edits silently change meaning?                           | The provisional bank contract requires stable IDs, monotonic revisions, and a new ID for a different learning objective.                   |
| Could copied lesson questions diverge?                                  | The recommended model keeps one canonical bank definition and ID-only quiz selections.                                                     |
| Could the bank become a site-wide monolith?                             | The risk register and runbook require course/topic-sized banks.                                                                            |
| Could private quiz state survive closing?                               | Baseline state is in memory only; refresh and close reset it and all persistence mechanisms are prohibited.                                |
| Could unlisted video be treated as private?                             | No. The PRD explicitly treats it as public-by-link and not an authorization boundary.                                                      |
| Could provider/API failure block reading?                               | No. Capture, comments, graph, media, and API failures are isolated from static reading.                                                    |
| Could D1 become a second CMS?                                           | No. Capture queues are noncanonical and D1 remains optional/noncanonical.                                                                  |
| Could an agent merge or deploy directly?                                | No. The workflow stops at a validated pull request and closes the item only after human-reviewed merge.                                    |
| Did this work weaken tests, add dependencies, or assume a runtime hook? | No implementation, dependency, test, or runtime-hook change was made; all provider/runtime details remain later source-verification gates. |

## 9. Rollback

Documentation-only changes can be reverted without data or deployment impact. The prior PRD version remains archived.

## 10. Completion log

| Date       | Commit        | Work                                                                                                                               | Evidence                                                                                                                                                       | Remaining                                                                |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 2026-08-22 | Not committed | Consolidated settled decisions; added Learning Inbox, agent runbook, provisional bank-backed contract, and adversarial corrections | One H1 per edited document; balanced fences; unique PRD requirement IDs; answered OQs removed; no old `FRONTMATTER_EXAMPLES.md`; targeted stale-reference scan | Owner decisions OQ-04, OQ-07–OQ-12; Phase 0 implementation remains first |

# Execution Plan: Phase 2 Precursor — Question-Bank Authoring Standard

| Field           | Value                                              |
| --------------- | -------------------------------------------------- |
| Status          | Complete                                           |
| Owner           | Product owner with Codex implementation support    |
| Created         | 2026-08-23                                         |
| Updated         | 2026-08-23                                         |
| Baseline commit | `c01f387a6a44a24148214059cba04b7f6847784e`         |
| Target branch   | `v5` (no commit/push authorized)                   |
| PR              | Not created                                        |
| PRD phase       | Phase 2 — Courses, public annotations, and quizzes |
| Related ADRs    | None; OQ-09 remains open                           |

## 1. Objective

Create one reusable, repository-versioned Markdown template that an external or repository-aware LLM can use to compile course or article source material into an auditable question-bank draft. The draft must map deterministically to the provisional bank-backed quiz contract while keeping supplied-material reinforcement questions distinct from externally researched deep-dive questions.

## 2. Non-goals

- Do not implement the Quartz transformer, renderer, browser interaction, or executable schema in this slice.
- Do not resolve PRD OQ-09 implicitly; owner confirmation remains required before canonical question-bank authoring or Phase 2 implementation.
- Do not import the sampled `Personal_Wiki` corpus or treat its generated quizzes/references as verified.
- Do not generate canonical UUIDs, publish content, create quiz progress storage, or add dependencies.
- Do not require timestamps when the source material has no reliable timecodes.

## 3. Acceptance gates

- The template supports a supplied course, lesson collection, article, paper, or authored notes.
- Every draft question identifies its evidence and cannot silently use general model knowledge.
- Supplied-material reinforcement questions appear before verified deep-dive questions.
- Deep-dive questions use explicitly supplied or independently verified external sources and are not attributed to the original course/article.
- A timestamp is optional; a usable source locator is mandatory.
- Supported question variants map to the provisional V1 names and answer shapes.
- Draft-only metadata is visibly separated from the future canonical runtime schema.
- The template requires duplicate, answer-position, coverage, ambiguity, and unsupported-claim audits.
- The template defines one deterministic private draft tree, one canonical course integration tree, and a fail-closed response-only fallback when no output root is authorized.
- Source material is read-only by default, is not copied into the draft or public tree, and is not rewritten as part of question-bank authoring.

## 4. Instruction sources

| Scope/path | Instruction file                  | Relevant rules                                                          |
| ---------- | --------------------------------- | ----------------------------------------------------------------------- |
| Repository | `AGENTS.md`                       | PRD authority, plan-before-code, maintainer reading chain               |
| Product    | `docs/product/PRD.md`             | Provisional bank-backed model, supported question types, OQ-09          |
| Content    | `content/AGENTS.md`               | No invented answers, stable IDs, no provisional canonical authoring yet |
| Contract   | `docs/contracts/CONTENT_MODEL.md` | Current human-readable bank/quiz shapes and strict validation intent    |

No nested `AGENTS.md` applies below `docs/`.

## 5. Repository findings

- The site currently documents, but does not implement, `knowledge-question-bank` and `knowledge-quiz` executable handling.
- Strict-mode intent rejects unknown runtime fields, so editorial evidence fields cannot be labeled production-supported before the Phase 2 schema is implemented.
- The provisional question types are `single-choice`, `multiple-select`, `true-false`, and `free-recall`.
- A lesson/article quiz selects an ordered list of stable question IDs from one canonical bank; ordering can place reinforcement before deep-dive selections.
- Article-owned canonical bank placement remains unresolved beyond an approved shared question-bank folder.
- The sampled external `Personal_Wiki` inventory contains useful course structure but unsafe assessment evidence: 3,852 consolidated questions all mark option A, 3,304 questions fall into exact-duplicate groups, and at least one sampled answer contradicts its own prompt/options.

## 6. Proposed design

Use a two-stage contract:

1. `QUESTION_BANK_AUTHORING_PACKET.md` is a fillable editorial interchange format. It records source inventory, source locators, learning objectives, question tiers, candidate questions, and audit results. Candidate IDs such as `Q001` are explicitly noncanonical.
2. A later sanctioned integration helper validates the reviewed draft, creates/preserves UUIDs, maps supported fields to the executable bank schema, and constructs ordered quiz selections. It must not silently discard unresolved editorial evidence.

The authoring stage uses `private/question-bank-authoring/<draftSetId>/` when a repository-aware owner authorizes filesystem output. It creates only the packet-defined artifacts and never copies source text by default. A tool without an authorized working root returns a filename-labeled artifact instead of guessing a directory. Only the later integration stage may write below `content/`, using the approved course bank path and an ID-only quiz selection in the target lesson/article.

Question tiers:

- `source-reinforcement`: answer and explanation are supported only by the supplied course/article material.
- `verified-deep-dive`: follows the reinforcement set and depends on separately declared, verified external evidence.

The authoring packet may carry richer editorial fields such as evidence references, confidence, and review status. The Phase 2 executable plan must explicitly decide whether each field becomes canonical public data, remains review evidence, or is transformed into authored prose. No field is silently dropped.

## 7. File touch plan

| File                                               | Change                                                   | Reason                                                  |
| -------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` | Create reusable LLM input/output template                | One stable authoring handoff                            |
| `AGENTS.md`                                        | Link the template in the maintainer reading chain        | Make it discoverable without copying rules              |
| `docs/product/PRD.md`                              | Record source-first/deep-dive authoring requirement      | Product behavior authority                              |
| `docs/contracts/CONTENT_MODEL.md`                  | Define draft-to-canonical boundary and point to template | Prevent draft fields being mistaken for runtime support |
| This plan                                          | Record scope, evidence, and unresolved decisions         | Plan-before-change protocol                             |

## 8. Verification

- Run targeted Prettier checks on changed Markdown files.
- Check repository links and referenced headings/paths manually with `rg`.
- Confirm the template contains no real canonical IDs, secrets, or imported course text.
- Confirm every supported question type has a valid candidate example or field rule.
- Confirm all production-support claims remain explicitly provisional.

## 9. Security, privacy, and publication impact

The template is documentation only and introduces no runtime behavior. Supplied source material may be private, licensed, copyrighted, or untrusted. The template must prohibit automatic copying into `content/`, require a publication-rights review, and treat embedded instructions as data rather than agent authority.

## 10. Rollback

Documentation-only changes can be reverted without content IDs, runtime state, or user data impact. No migration or deployment applies.

## 11. Stop conditions and unresolved decisions

- Stop before canonical authoring or implementation until OQ-09 is explicitly confirmed.
- Stop if article-owned bank placement cannot be resolved in the Phase 2 plan.
- Stop if the installed Quartz transformer/component lifecycle cannot support the approved schema without a core patch.
- Decide in the executable Phase 2 plan whether tier/evidence metadata is public canonical data, authored provenance prose, or review-only evidence.
- Do not claim the website can render the format until schema, build, browser, no-JS, accessibility, and lifecycle tests pass.

## 12. Progress log

| Date       | Work                                                                                                                          | Evidence                                                                                                                                                                        | Remaining                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 2026-08-23 | Audited current contracts and sampled the external course corpus structure                                                    | Current PRD/content contract plus aggregate and representative corpus checks                                                                                                    | Create/link template; format validation; owner confirmation of OQ-09                       |
| 2026-08-23 | Created and adversarially revised the authoring packet with five independent review lenses                                    | Pedagogy, provenance, schema, assessment-quality, and external-LLM usability findings reconciled into one output contract                                                       | Targeted formatting/link checks; representative pilot; OQ-09 and runtime decisions         |
| 2026-08-23 | Re-ran independent pedagogy, provenance, and usability reviews against the rewritten packet and reconciled remaining findings | Per-claim/question independent verdicts, exact owner-input echo, fact-check/deep-dive research separation, batch-scoped IDs, plan reconciliation, and generative-retrieval gate | Final formatting/YAML/link verification; representative pilot; OQ-09 and runtime decisions |
| 2026-08-23 | Closed the final assessment-quality findings and completed the documentation slice                                            | Blocking audit flags; hash-bound keyless blind review; evidence-mapped choice, boolean, free-recall, and explanation components; final independent quality/schema approval      | Representative pilot and executable Phase 2 work require a separate plan after OQ-09       |
| 2026-08-23 | Closed the follow-up source/output placement ambiguity and completed packet version 2                                         | Fixed private artifact tree, response-only fallback, immutable artifact filenames, read-only/non-copying source rules, and canonical course integration tree                    | Representative pilot and executable Phase 2 work require a separate plan after OQ-09       |

## 13. Completion evidence

- Created `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` and linked it from root `AGENTS.md`, the PRD, and the content contract.
- Five independent lenses reviewed pedagogy, provenance, schema compatibility, assessment quality, and external-LLM usability. Pedagogy, provenance, and usability were re-audited after the first rewrite; schema and assessment-quality reviewers gave final approval after the last corrections.
- Targeted Prettier verification passed for every file changed in this slice.
- All eight embedded `yaml` examples parsed with the installed YAML parser.
- Packet-version, fixed candidate-path, read-only source, non-mutating authoring, and path-traversal invariants passed targeted assertions.
- `private/question-bank-authoring/` is covered by the repository's existing `private/` Git ignore rule; no working directory or source copy was created.
- `git diff --check` passed.
- No content, canonical UUID, runtime schema, dependency, browser feature, deployment, commit, or push was created.
- OQ-09, article/shared-bank placement, editorial-field disposition, a representative end-to-end pilot, and executable transformer/UI/no-JS/accessibility evidence remain explicit future gates rather than hidden completion claims.

# ADR-0001: Karpathy-Style Raw Intake to Reviewed Public Markdown

| Field                   | Value                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Status                  | Superseded                                                                                                                       |
| Date                    | 2026-08-23                                                                                                                       |
| Decision owners         | Product owner                                                                                                                    |
| Related PRD section     | Content model, categories, graph, agent workflow, and phases                                                                     |
| Related execution plans | `docs/exec-plans/completed/karpathy-intake-and-course-pilot.md`; `docs/exec-plans/completed/private-content-intake-lifecycle.md` |
| Supersedes              | None                                                                                                                             |
| Superseded by           | `docs/decisions/ADR-0002-separate-personal-wiki.md`                                                                              |

> Historical decision only. ADR-0002 separates the portable personal wiki
> workflow from this blog's source-authoring workflow. Do not use this ADR as
> active authority for a new blog content assignment.

## Context

The owner wants a public knowledge/course site that can accept course material, articles, papers, notes, and other sources through a simple raw-input workflow. An LLM should incrementally compile those sources into useful Markdown, reuse related existing categories and pages, propose new categories when genuinely necessary, add tags and cross-references, and generate reviewed active-learning material.

Andrej Karpathy's April 2026 LLM Wiki idea provides the motivating three-layer pattern: immutable raw sources, an LLM-maintained Markdown wiki, and a schema document that governs the agent. Concrete community implementations add topic-directory reuse, new-topic creation, merge/update triage, source fields, wikilinks, indexes, and linting.

This repository has stricter constraints than a private Obsidian vault. Its output is public, every canonical entity has an immutable UUID, tags are controlled, authored body links become explicit graph edges, category folders require real `index.md` pages, source material may be licensed or private, and Git review is the publication boundary. Directly copying an autonomous private-wiki pattern would risk taxonomy sprawl, invented relationships, source leakage, and unreviewed publication.

The owner explicitly approved the boundary that an agent may create or update categories and content on a reviewable branch but may not merge or publish those changes automatically.

## Decision drivers

- low-friction owner source intake;
- durable Markdown rather than chat-only output;
- traceability to immutable raw evidence;
- public copyright/privacy safety;
- stable content identity and taxonomy;
- meaningful, explainable internal relationships;
- question-bank quality and answer provenance;
- reviewable Git diffs and rollback;
- no baseline database, embedding pipeline, or second site generator.

## Verified evidence

| Claim                                                                                        | Source                                                              | Verified   | Finding                                                                                                                 |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| The LLM Wiki pattern separates immutable raw sources, an LLM-owned wiki, and an agent schema | `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` | 2026-08-23 | The original is an abstract idea file and recommends adapting structure/workflow to the domain                          |
| The pattern expects incremental integration rather than one-off summarization                | Same gist, Core idea and Ingest sections                            | 2026-08-23 | New sources can update summaries, entities, concepts, indexes, cross-references, contradictions, and logs               |
| A concrete skill checks existing topic directories before creating a distinct topic          | `https://github.com/Astro-Han/karpathy-llm-wiki/blob/main/SKILL.md` | 2026-08-23 | Useful implementation precedent; it also distinguishes New, Update, Disputed, and No material outcomes                  |
| This repository defines folders, tags, and authored links as different semantics             | `AGENTS.md`; `docs/product/PRD.md`; `content/AGENTS.md`             | 2026-08-23 | Folder is primary category, tag is controlled classification, and accepted authored links create explicit relationships |

## Considered options

### Option A — Autonomous raw-to-public compilation

The agent reads a raw folder, creates or moves category folders, writes tags/links, and immediately publishes the resulting content.

Advantages:

- lowest interaction cost;
- closest to some private LLM Wiki implementations.

Disadvantages/risks:

- can publicly leak restricted source material;
- can proliferate weak categories and tag synonyms;
- can invent or overstate internal relationships;
- can replace stable IDs or create invalid category folders;
- gives generated answers and factual claims no independent review boundary;
- rollback after publication cannot undo disclosure.

### Option B — Immutable private intake and automatic branch proposal

The owner places selected sources in a nonpublic raw intake. The agent inventories and fingerprints them, then creates classification, taxonomy, provenance, link, content, and assessment proposals. It may create or update the complete candidate Markdown tree on a working branch. New categories, tags, authored links, answers, and `publish: true` remain subject to validation and owner review before merge.

Advantages:

- preserves the low-friction compile workflow;
- provides concrete diffs instead of abstract plans;
- preserves source evidence and rollback;
- fits Markdown/Git authority and public-output safety;
- supports incremental improvement without a new database.

Disadvantages/risks:

- requires review effort;
- needs deterministic manifests, validation, and receipts;
- initial category matching is weak while the public corpus is nearly empty;
- no similarity score can replace owner judgment for ambiguous taxonomy.

### Option C — Manual content authoring only

Keep raw sources outside the repository and manually write every public page, link, tag, and question.

Advantages:

- smallest automation and prompt-injection surface;
- direct editorial control.

Disadvantages/risks:

- does not meet the desired scalable course workflow;
- repeats mechanical inventory, linking, and assessment work;
- loses the compounding LLM Wiki benefit.

## Decision

Adopt Option B.

1. The fixed repository-local intake root is `private/content-intake/`, covered by the existing Git ignore rule. The owner may explicitly authorize an external nonpublic root.
2. `inbox/<owner-drop>/` is mutable owner staging for unprocessed material. It is neither canonical evidence nor authority for an agent to process every sibling drop.
3. An explicitly authorized trusted sealing step may accept exactly one selected inbox child. It validates path containment, assigns the owner-approved `intakeId`, hashes every file, and moves that exact child once to `raw/<intakeId>/sources/` without changing its bytes. It creates `raw/<intakeId>/intake.yaml` and verifies the post-move hashes. A partial, escaped, or mismatched transition fails closed.
4. Once sealed, owner-selected source bytes below `raw/<intakeId>/` are read-only to every authoring/review agent. Agents record hashes and never automatically move, delete, rewrite, commit, serve, or publish them. Finishing content does not move the raw evidence.
5. Noncanonical inventories and proposals live below `work/<intakeId>/`; independent review and integration handoff evidence lives below `reviewed/<intakeId>/`.
6. A terminal `completed/<intakeId>/completion.yaml` is a small workflow receipt, not a second source copy. It may be created only by the reviewer/integrator after the declared completion gate and references the immutable source hashes plus reviewed/canonical outcomes. Allowed terminal dispositions are `integrated`, `no-material`, `duplicate`, and `rejected`; `blocked`, `ambiguous`, and `disputed` remain nonterminal.
7. The intake agent first inventories the current category pages by immutable content ID. It reports ranked candidates and evidence. It does not use an uncalibrated confidence threshold as sole authority.
8. A clearly related item may be proposed below an existing category. Ambiguity is returned for owner decision.
9. A genuinely distinct item may produce a complete proposed category change on a branch, including a sanctioned immutable ID and valid category `index.md`. It is not merged or published automatically.
10. Existing controlled tags may be proposed. A previously unknown tag is a separate taxonomy proposal and fails canonical validation until approved in the future machine-readable registry.
11. External source/provenance links are not internal graph relationships. Suggested internal links remain proposal records until accepted into authored Markdown; only those accepted body links become explicit graph edges.
12. The agent may update an existing page only when it preserves its immutable ID, identifies the source-backed delta, and does not erase unresolved contradiction/history.
13. `Study.md` is an intake bundle, not a canonical public content type. It remains raw. Transcript-derived public material becomes original course/lesson prose with provenance; assessment definitions live separately in canonical question banks; lesson/article quiz blocks select questions by ID.
14. Source quizzes without verified keys and explanations are comparison evidence only. They produce `needs-answer`, never an invented key.
15. Question-bank compilation remains governed by `QUESTION_BANK_AUTHORING_PACKET.md` and independent review.
16. The authoring agent stops at a validated branch/diff or private work artifact. It cannot self-review, write a completion receipt, auto-merge, deploy, or change DNS/secrets.

This ADR does not approve embeddings, a semantic/vector graph, a database, an autonomous background worker, bulk ingestion, automatic deletion, direct production publishing, a new question-bank runtime schema, or republishing restricted course text.

## Contract impact

- [ ] Quartz/core/plugin boundary
- [x] content/frontmatter schema
- [ ] immutable IDs
- [x] category table
- [x] graph semantics/manifest
- [x] public routes/permalinks
- [ ] API contract
- [ ] D1 schema/migrations
- [ ] Access/auth/authorization
- [ ] R2/Stream media contract
- [ ] deployment topology
- [x] privacy/retention
- [ ] frontend/accessibility
- [ ] dependency/version matrix

Identity and graph meanings do not change; the ADR constrains when AI-proposed categories/tags/links may enter those existing contracts.

## Consequences

### Positive

- The owner gets a predictable drop-and-compile workflow.
- Raw evidence remains available for verification and re-compilation.
- Public pages can improve incrementally without duplicating whole sources.
- Category, tag, link, and question decisions remain inspectable.
- The same source manifest can drive course prose and assessment authoring without merging their schemas.

### Negative

- Intake is not a one-click public publisher.
- Every new taxonomy/link/answer decision has review overhead.
- Raw-source retention consumes local storage. Completion receipts make finished work easy to identify but do not authorize deletion or compression; a destructive retention policy requires a later owner-approved ADR.
- The first few imports require more owner guidance because the site has almost no established categories.

### New risks

- LLM classification may be overconfident or inconsistent.
- Large sources may be incompletely inspected if batching lacks coverage accounting.
- Derived prose may remain too close to licensed wording.
- Accepted cross-links may create noisy graph hubs.
- Repeated ingestion may duplicate concepts unless hashes and receipts are enforced.

## Migration plan

1. Add the PRD, content-contract, agent, template, and runbook rules.
2. Add a nonpublic versioned intake manifest and proposal format.
3. Pilot one transcript-only course and audit one mixed transcript/answerless-quiz bundle.
4. Validate classification, source coverage, question gaps, and public-copy boundaries.
5. Create canonical course/category content only in a later rights-cleared integration diff.
6. Add machine-readable tag and content validation before scaling beyond the pilot.

## Backward compatibility

No existing canonical content is migrated. Current content continues to build. Existing sealed `raw/<intakeId>/` and `work/<intakeId>/` pilots remain valid and are not moved merely to fit the new queue folders. Existing raw source directories outside the repository remain valid owner inputs when explicitly allowlisted. Future intake packet versions must declare compatibility and reject unknown breaking versions.

## Rollback

Disable the intake workflow by removing its template/runbook references. Preserve raw sources and review artifacts; do not delete them automatically. Revert unmerged branch proposals. Already published canonical content follows ordinary Git rollback while preserving IDs and cannot guarantee erasure from public caches.

## Validation and acceptance evidence

- targeted Markdown formatting and link checks;
- YAML/schema parsing for intake examples;
- path containment and traversal rejection;
- source hash stability and duplicate-intake tests;
- raw/public-output leak scan;
- classification outcomes for existing, ambiguous, new, disputed, duplicate, and no-material cases;
- missing-answer behavior;
- ID preservation and category-index validation;
- authored-link versus generated/provenance-link graph tests;
- real Quartz build and local browser proof for any integrated fixture.

## Follow-up work

- [ ] Update PRD sections.
- [ ] Update root and content `AGENTS.md`.
- [ ] Add `CONTENT_INGESTION_PACKET.md` and `CONTENT_INTAKE_AGENT.md`.
- [ ] Reconcile `CONTENT_MODEL.md` and the question-bank packet.
- [ ] Add machine-readable tag registry design and validation in a later executable plan.
- [ ] Link the pilot evidence and final `Study.md` decision.

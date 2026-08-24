# Execution Plan: Karpathy-Style Intake and Course Pilot

| Field           | Value                                                                              |
| --------------- | ---------------------------------------------------------------------------------- |
| Status          | Complete for private pilot; public integration remains a separate Phase 2 decision |
| Owner           | Product owner with Codex implementation support                                    |
| Created         | 2026-08-23                                                                         |
| Updated         | 2026-08-23                                                                         |
| Baseline commit | `c01f387a6a44a24148214059cba04b7f6847784e`                                         |
| Target branch   | `v5` (no commit, push, merge, or deployment authorized)                            |
| PR              | Not created                                                                        |
| PRD phase       | Phase 1 content foundation with a bounded Phase 2 authoring precursor              |
| Related ADRs    | ADR-0001, accepted raw-to-reviewed-branch compilation boundary                     |

## 1. Objective

Define a deterministic Karpathy-style intake workflow in which owner-curated raw sources remain immutable and nonpublic, an LLM proposes source-grounded public Markdown on a reviewable branch, and canonical publication remains a separate validated action. Prove the workflow with a bounded read-only sample from the owner's LinkedIn Learning `Done` corpus, decide the role of each course `Study.md`, and keep the existing Quartz site locally loadable for browser testing.

## 2. Non-goals

- Do not bulk-import or scan the full contents of all 85 courses.
- Do not copy full transcripts, restricted course text, or source attachments into public `content/`.
- Do not treat source-provided assessment prompts as canonical when answer keys and explanations are absent.
- Do not publish, deploy, change DNS, create Cloudflare resources, commit, push, merge, or alter secrets.
- Do not add embeddings, vector search, a graph database, D1, a second frontend, or another SSG.
- Do not implement a general autonomous background worker or unsupervised batch publisher.
- Do not silently create new top-level categories, controlled tags, authored graph links, IDs, answers, or factual claims.

## 3. Acceptance gates

- The owner has one documented raw-source drop location outside the public content tree.
- Raw input is immutable to the agent and is never automatically moved, deleted, or published.
- Every intake has a versioned manifest, deterministic ID, source hashes, rights status, and explicit scope.
- Classification reports existing-category candidates before proposing a new top-level category or subcategory.
- A new category proposal includes its required category `index.md` contract but cannot merge or publish automatically.
- Existing controlled tags may be proposed; new tags remain explicit taxonomy changes.
- Internal link proposals identify the source and target content IDs plus a stated relationship; only accepted authored body links become graph edges.
- External source/provenance links remain distinct from internal knowledge relationships.
- `Study.md` remains an immutable intake bundle and is neither copied wholesale nor merged into a question-bank file.
- The pilot demonstrates at least one transcript-only course and one source bundle containing answerless assessment prompts.
- The local Quartz placeholder site builds, serves, and opens in a browser without claiming deployment readiness.

## 4. Instruction sources

| Scope/path | Instruction file                                      | Relevant rules                                                       |
| ---------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| Repository | `AGENTS.md`                                           | PRD authority, ADR triggers, source verification, branch boundary    |
| Product    | `docs/product/PRD.md`                                 | Public Markdown, category, link, quiz, phase, and security contracts |
| Content    | `content/AGENTS.md`                                   | Public boundary, placement, IDs, tags, links, and quiz rules         |
| Contract   | `docs/contracts/CONTENT_MODEL.md`                     | Frontmatter and provisional question-bank schemas                    |
| Intake     | `docs/templates/CONTENT_INGESTION_PACKET.md`          | Fixed raw/work/review boundary and source classification             |
| Runbook    | `docs/runbooks/CONTENT_INTAKE_AGENT.md`               | Deterministic one-intake compilation and stop conditions             |
| Template   | `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md`    | Source-grounded assessment drafting and review                       |
| Runtime    | `docs/exec-plans/active/phase-0-online-foundation.md` | Existing local Quartz/Workers proof and blockers                     |

## 5. Version and environment matrix

Runtime versions remain governed by `docs/architecture/VERSION_MATRIX.md` and the Phase 0 plan:

- Quartz package/source `5.0.0` at baseline commit `c01f387a6a44a24148214059cba04b7f6847784e`;
- Node project pin `22.16.0`, with local compatible diagnostic runtime previously observed as Node `24.14.0`;
- Wrangler `4.125.0` exact development dependency;
- Markdown and Git remain canonical for public content.

No new dependency is approved by this plan.

## 6. Verified evidence

| Claim                                                                                                                                                                 | Source                                                                      | Verified   | Finding                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| The original LLM Wiki pattern separates immutable raw sources, an LLM-maintained Markdown wiki, and an agent schema                                                   | `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`         | 2026-08-23 | The idea file explicitly leaves exact directory/schema choices to the domain and recommends human involvement during ingest |
| A concrete implementation reuses a close topic directory, creates a new one only for a distinct topic, merges matching concepts, and cross-links multi-topic material | `https://github.com/Astro-Han/karpathy-llm-wiki/blob/main/SKILL.md`         | 2026-08-23 | Useful operational precedent, not authority over this repository's IDs, taxonomy, links, or publication rules               |
| Quartz 5 supports `npx quartz build --serve` and defaults to scanning Markdown below `content/`                                                                       | Context7 `/jackyzha0/quartz`; pinned `docs/cli/build.md`; `quartz/build.ts` | 2026-08-23 | Supported local browser-testing path; installed source remains implementation authority                                     |
| Workers Static Assets can serve a directory without a Worker script                                                                                                   | Context7 `/websites/developers_cloudflare_workers`; `wrangler.jsonc`        | 2026-08-23 | Existing assets-only Phase 0 topology remains valid for local proof; no deploy is authorized                                |

## 7. Repository and corpus findings

- Branch `v5` remains heavily dirty with owner/unrelated tracked deletions and untracked product/runtime work; none may be discarded or broadly normalized.
- The existing Phase 0 plan already records a 163-test pass, a Quartz build, a local Wrangler route matrix, and deployment blockers. This plan rechecks local launchability rather than duplicating deployment work.
- The `Done` corpus contains 85 course folders with one `Study.md` each.
- `Local AI- Build a RAG Model from Scratch with Open-Source Tools/Study.md` is approximately 102 KB, contains course transcripts, and states that no quiz files were available.
- `Accounting Foundations/Study.md` is approximately 173 KB and combines transcript text with eight chapter-quiz sections. The inspected assessment files contain prompts/options but no answer keys or explanations; one transcript-derived “question” is a malformed excerpt.
- Current public `content/` contains only the placeholder homepage plus a Phase 0 route directory; there is no mature category corpus against which an LLM similarity score could be calibrated.
- The PRD requires controlled tags, but a machine-readable controlled-tag registry is not yet present.

## 8. Contracts and invariants

### Raw and derived layers

- `private/content-intake/raw/<intakeId>/` is owner-controlled, nonpublic, and read-only to the intake agent.
- Source bytes are fingerprinted and referenced; the agent never silently rewrites, relocates, deletes, or republishes them.
- `private/content-intake/work/<intakeId>/` contains noncanonical inventories and proposals.
- `content/` receives only reviewed, rights-cleared, original Markdown through the normal branch/PR boundary.

### Classification and taxonomy

- Category candidates are existing `type: category` pages identified by immutable content ID, not merely folder-name similarity.
- An LLM confidence number is advisory and never sufficient by itself to create or publish taxonomy.
- A proposed new category is a complete branch change with a sanctioned UUID and valid `index.md`; it remains unpublished until review.
- One content entity has one physical home. Tags and authored links carry cross-category meaning.

### Links and graph

- External source links are provenance, not internal graph edges.
- Generated category/course navigation remains graph-isolated.
- Suggested internal relationships stay in a proposal artifact until accepted into authored Markdown.
- No embedding-derived or AI-generated relationship is accepted without the ADR and review evidence required by repository policy.

### Study and assessment separation

- `Study.md` is an intake bundle, not a canonical site type.
- Transcript sections may support original lesson summaries and source-reinforcement questions, but are not copied wholesale.
- Source-provided quizzes without a verified key/explanation are comparison evidence only and produce `needs-answer`, not canonical questions.
- Canonical questions live once in the approved bank; lessons/articles contain only ordered selections after the executable Phase 2 contract exists.

## 9. Proposed design

```text
private/
  content-intake/
    raw/<intakeId>/
      intake.yaml
      sources/
    work/<intakeId>/
      source-inventory.yaml
      classification-proposal.yaml
      taxonomy-proposals.yaml
      link-proposals.yaml
      study-disposition.md
      question-bank-handoff.md
      audit.md
      content-draft/
    reviewed/<intakeId>/
      integration-handoff.md
  question-bank-authoring/<draftSetId>/
    ...packet-defined artifacts...

content/
  <approved-category>/
    index.md
    <approved-article-or-course>/
```

The content-intake runbook owns source inventory, classification, provenance, content drafting, and link/tag proposals. The question-bank packet remains a separate assessment compiler that references the same intake/source manifest.

## 10. Data and schema changes

- Add a versioned editorial intake manifest and proposal shapes; these remain noncanonical until integration.
- Add a public source-provenance decision to the content contract without copying raw source bodies.
- Document a future machine-readable tag registry requirement; do not invent its executable location in this documentation slice.
- Do not change canonical UUID format, question schema, or runtime behavior in the governance step.

## 11. File touch plan

| Order | File/path                                                  | Change                                                                | Risk                                 |
| ----: | ---------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------ |
|     1 | This plan                                                  | Keep scope, evidence, pilot, and runtime results current              | Low                                  |
|     2 | `docs/decisions/ADR-0001-karpathy-intake-compilation.md`   | Record the owner-approved raw-to-reviewed-branch architecture         | Medium                               |
|     3 | `docs/product/PRD.md`                                      | Add intake, classification, provenance, and publication behavior      | Medium                               |
|     4 | `docs/contracts/CONTENT_MODEL.md`                          | Define editorial intake and `Study.md` disposition                    | Medium                               |
|     5 | `AGENTS.md`, `content/AGENTS.md`                           | Add maintainer reading order and operational constraints              | Medium                               |
|     6 | `docs/templates/CONTENT_INGESTION_PACKET.md`               | Add the reusable source-to-content proposal packet                    | Medium                               |
|     7 | `docs/runbooks/CONTENT_INTAKE_AGENT.md`                    | Add the deterministic single-intake workflow                          | Medium                               |
|     8 | Git-ignored `private/` pilot artifacts                     | Test two bounded source shapes without publishing or altering sources | Low                                  |
|     9 | Existing runtime/config only if diagnosis proves necessary | Restore local launchability narrowly under Phase 0                    | High; stop before unrelated redesign |

## 12. Incremental steps

1. Approve and link the ADR; reconcile PRD, contracts, root/nested agent rules, template, and runbook.
2. Run formatting, structural, schema, path, and adversarial consistency checks.
3. Rebuild and start the existing Quartz site with the pinned supported command; verify it in a real browser.
4. Create a nonpublic intake manifest for the RAG transcript-only course and inspect the Accounting mixed-bundle boundary case.
5. Generate a small candidate question bank under the existing packet, independently review it, and record gaps rather than inventing answers.
6. Decide the canonical `Study.md` treatment and record what would be promoted to course, lesson, provenance, and bank files.
7. If executable quiz rendering remains unimplemented, stop with an explicit Phase 2 plan rather than claiming the static page proves quiz readiness.

## 13. Test plan

- Documentation: targeted Prettier, YAML parsing, unique IDs/requirements, referenced-path checks, no conflicting taxonomy/link rules.
- Intake: path containment, traversal rejection, source hash stability, duplicate intake, malformed manifest, missing rights status, and no raw mutation.
- Pilot: deterministic source-unit coverage; unanswered source quizzes return `needs-answer`; generated questions trace to source locators; no full transcript appears in an output artifact.
- Runtime: TypeScript check, focused/full tests in proportion to changes, real Quartz build, local HTTP root/404/assets, and browser navigation.
- Public safety: no files from `private/` in `public/`; no restricted transcript strings in generated public output.

## 14. Security, privacy, rights, and publication

The `Done` corpus is treated as owner-supplied, potentially licensed and restricted source material. Local access does not establish public republication rights. Raw source paths and bodies remain outside `content/`, generated public output, logs, and screenshots. Only original summaries/questions with reviewed provenance and lawful publication status may later be integrated.

## 15. Migration and rollback

No existing canonical content is migrated. Documentation additions are reversible. Pilot artifacts remain below the Git-ignored `private/` root and can be retained for owner review without entering a deploy. Any future canonical integration occurs as a separate branch diff and preserves stable IDs.

## 16. Stop conditions

- Stop if raw input would enter Quartz output or Git unintentionally.
- Stop if a source's publication rights are insufficient for the proposed public text.
- Stop if a correct answer or source locator cannot be established.
- Stop if category/tag/link changes cannot be reconciled with ADR-0001 and current graph semantics.
- Stop before an executable question bank until OQ-09 and the Phase 2 schema/runtime gates are explicitly resolved.
- Stop if local launch requires a Quartz core patch, dependency upgrade, remote runtime, or destructive cleanup.

## 17. Completion evidence

- ADR-0001, PRD 1.3, the content contract, root/nested maintainer rules, the
  content-ingestion packet, the question-bank packet, and the intake runbook use
  one raw/work/review boundary and one classification vocabulary.
- All YAML examples in the changed normative documents parse; pilot manifests
  and the five-question candidate parse and reconcile with their owner input.
- RAG and Accounting source hashes were rechecked after authoring and remained
  unchanged.
- The RAG pilot produced five source-reinforcement candidates in the requested
  type/difficulty/coverage distribution. The candidate and key-hidden view have
  matching recorded SHA-256 values; independent review is honestly `pending`.
- The Accounting boundary pilot found eight quiz sections but no declared keys
  or explanations, produced zero canonical candidates, and recorded
  `needs-answer` rather than inferring answers.
- Quartz built two input files and emitted 32 public files; the local server
  returned `200` for `/` and the content index, while the private intake route
  and an unknown route returned `404`.
- Browser verification loaded the Personal Knowledge Site and exercised theme
  and search controls. The visible preview remains at
  `http://127.0.0.1:8080/` for owner testing.
- Public-output scans found no private intake ID, local corpus path, source hash,
  Accounting course title, or `public/private` directory.
- `npm test`: 163 passed, 0 failed, 0 skipped. `npm run check` passed TypeScript
  and then reported eight pre-existing Markdown formatting warnings outside
  this slice; targeted Prettier checks for all changed governance and pilot
  artifacts passed.

## 18. Progress log

| Date       | Work                                                                                      | Evidence                                                                                                                      | Remaining                                                                        |
| ---------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 2026-08-23 | Audited current branch, Phase 0 evidence, current contracts, and bounded corpus structure | Branch/HEAD/status; Context7 Quartz/Workers docs; 85 `Study.md` files counted; RAG and Accounting samples inspected read-only | ADR/contracts/runbook/template; local browser proof; pilot and final disposition |
| 2026-08-23 | Reconciled the ingestion architecture and maintainer handoff                              | ADR-0001; PRD 1.3; content contract; packets/runbook; YAML and targeted formatting passes                                     | Run the bounded pilots and local preview                                         |
| 2026-08-23 | Completed the private RAG and Accounting pilots and local browser proof                   | Stable source hashes; five-question candidate; answerless-quiz stop; 163 tests; route, leakage, search, and theme evidence    | Owner confirmation of OQ-09 before Phase 2 quiz implementation                   |

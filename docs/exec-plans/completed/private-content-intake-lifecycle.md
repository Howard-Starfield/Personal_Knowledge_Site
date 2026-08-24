# Execution Plan: Private Content-Intake Lifecycle

| Field           | Value                                                       |
| --------------- | ----------------------------------------------------------- |
| Status          | Complete                                                    |
| Owner           | Product owner with Codex implementation support             |
| Created         | 2026-08-23                                                  |
| Updated         | 2026-08-23                                                  |
| Baseline commit | `c01f387a6a44a24148214059cba04b7f6847784e`                  |
| Target branch   | `v5` (no commit, push, merge, or deployment authorized)     |
| PR              | Not created                                                 |
| PRD phase       | Phase 1 content foundation                                  |
| Related ADRs    | ADR-0001 amendment for intake-state and retention semantics |

## 1. Objective

Create a reproducible, private, Git-ignored source queue for courses, articles,
papers, and notes. Define exact transitions from an owner drop through sealed
immutable evidence, LLM work, independent review, and a completion receipt;
create the local folders; and provide one reusable repository-aware LLM handoff
prompt without exposing private source material to Quartz or Git.

## 2. Non-goals

- Do not ingest the existing `Done` corpus or move any current source file.
- Do not delete, rewrite, normalize, publish, commit, or deploy source material.
- Do not let the content-authoring LLM self-review or mark its own intake
  complete.
- Do not move immutable raw evidence merely because content work finishes.
- Do not implement a background watcher, database, embeddings, browser uploader,
  or automatic public publisher.
- Do not change canonical IDs, question schemas, graph semantics, or Quartz core.

## 3. Acceptance gates

- The owner has one obvious local drop folder for unprocessed material.
- The entire intake root is covered by the existing `private/` Git-ignore rule
  and remains outside Quartz's `content/` input.
- Intake sealing is a distinct trusted transition. Only the exact selected drop
  may move into `raw/<intakeId>/sources/`; hashes and a manifest are recorded.
- Once sealed, raw source bytes are immutable and are never moved or deleted by
  the authoring LLM.
- Noncanonical generated artifacts live only below `work/<intakeId>/`.
- Independent review material lives below `reviewed/<intakeId>/`.
- `completed/<intakeId>/completion.yaml` is a receipt, not a second source copy,
  and may be created only after the declared completion gate.
- Blocked, rejected, duplicate, disputed, and no-material outcomes preserve raw
  evidence and receive explicit dispositions rather than deletion.
- A reusable prompt names the exact drop/intake and prevents whole-inbox sweeps.
- Public-output scans find no private paths, intake IDs, manifests, or source
  bodies.

## 4. Instruction sources

| Scope/path   | Instruction file                                         | Relevant rules                                               |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| Repository   | `AGENTS.md`                                              | Plan-first changes, private raw intake, no direct publishing |
| Product      | `docs/product/PRD.md`                                    | FR-PUB-04 through FR-PUB-06 and public-output security       |
| Contract     | `docs/contracts/CONTENT_MODEL.md`                        | Intake manifests, immutable raw evidence, Study separation   |
| Architecture | `docs/decisions/ADR-0001-karpathy-intake-compilation.md` | Raw/work/review boundary and retention                       |
| Template     | `docs/templates/CONTENT_INGESTION_PACKET.md`             | Fixed private artifacts and authoring scope                  |
| Runbook      | `docs/runbooks/CONTENT_INTAKE_AGENT.md`                  | Single-intake procedure and stop conditions                  |

Only root `AGENTS.md` applies to the documentation and private paths in this
slice. `content/AGENTS.md` remains authoritative if a later integration touches
public content; this slice does not.

## 5. Version and environment matrix

No dependency or runtime version changes are required. Quartz remains package
`5.0.0` at baseline commit `c01f387a6a44a24148214059cba04b7f6847784e`.
Node/npm/Wrangler remain governed by
`docs/architecture/VERSION_MATRIX.md`. The filesystem lifecycle uses only
documented directory and YAML contracts.

## 6. Source verification

| Claim                                                                                                         | Source                                                                                      | Verified   | Finding                                                                          |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| The Karpathy-style pattern separates immutable `raw/`, LLM-maintained `wiki/`, and a schema/instruction layer | `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`; ADR-0001 source record | 2026-08-23 | The idea is intentionally abstract and must be adapted to this public repository |
| A concrete implementation keeps raw files after New, Update, Disputed, and No material triage                 | `https://github.com/Astro-Han/karpathy-llm-wiki/blob/main/SKILL.md`                         | 2026-08-23 | Raw evidence is retained; compilation and logs change separately                 |
| Quartz builds from `content/`, not `private/`                                                                 | Pinned `docs/cli/build.md`; prior local route/leak proof                                    | 2026-08-23 | `private/` is outside the configured Markdown input and is Git-ignored           |

## 7. Repository findings

- `.gitignore` already contains the broad `private/` rule.
- The local private root currently contains pilot `raw/` and `work/` folders;
  no `inbox/`, `reviewed/`, or `completed/` folder exists.
- Existing contracts prohibit the authoring agent from moving or deleting raw
  evidence and place reviewed handoffs separately.
- ADR-0001 intentionally left long-term raw retention unresolved. The owner now
  requests an explicit queue/completion organization, which requires an ADR
  amendment because retention/movement semantics are an ADR trigger.

## 8. Contracts and invariants

- `inbox/` is mutable owner staging and is not evidence or agent authority.
- A trusted sealing step operates on exactly one selected inbox child, assigns
  an intake ID, validates containment, hashes every source, and moves the exact
  child into `raw/<intakeId>/sources/` without changing bytes.
- The content-authoring role begins only after sealing succeeds. It writes only
  to `work/<intakeId>/`.
- `raw/<intakeId>/` is immutable after sealing. Completion never moves it.
- `reviewed/<intakeId>/` contains independent-review and integration handoff
  evidence.
- `completed/<intakeId>/completion.yaml` is a terminal receipt that references
  raw hashes and reviewed/canonical outputs. It contains no copied source body.
- Terminal receipt states are `integrated`, `no-material`, `duplicate`, or
  `rejected`. `blocked`, `ambiguous`, and `disputed` are nonterminal and remain
  in work/review.
- No private lifecycle directory becomes a public route, graph edge, category,
  tag, content identity, or question identity.

## 9. Proposed design

```text
private/content-intake/
  inbox/<owner-drop>/                 # owner places unprocessed material
  raw/<intakeId>/
    intake.yaml                       # sealed manifest and hashes
    sources/<original tree>           # immutable after sealing
  work/<intakeId>/                    # authoring LLM outputs
  reviewed/<intakeId>/                # independent review/integration handoff
  completed/<intakeId>/
    completion.yaml                   # terminal receipt; no source copy
```

The source is moved exactly once: from the selected inbox child into the sealed
raw location by an explicitly authorized trusted sealing step. It is not moved
again after authoring. “Finished” means a completion receipt exists and the
derived outputs have reached their declared reviewed/integrated disposition.

### Alternatives considered

| Alternative                                                         | Benefit                          | Problem                                                                         | Decision |
| ------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------- | -------- |
| Move raw sources into a finished folder after generation            | Visually simple                  | Breaks evidence paths and lets an author imply its own work is finished         | Rejected |
| Delete or compress raw after publication                            | Saves space                      | Loses reproducibility and introduces an unapproved destructive retention policy | Rejected |
| Leave owner drops permanently in one raw folder                     | Few transitions                  | Cannot distinguish mutable/unselected drops from sealed evidence                | Rejected |
| Inbox, one trusted seal, immutable raw, separate completion receipt | Clear queue and durable evidence | Requires an explicit sealing role                                               | Selected |

## 10. Data and schema changes

- Extend the editorial intake contract with lifecycle schema version `1` and
  `queued`, `sealed`, `authoring`, `in-review`, and terminal receipt states.
- Add `completed/<intakeId>/completion.yaml` as noncanonical private workflow
  evidence.
- Do not change public frontmatter, canonical content, D1, API, or media schemas.

## 11. File touch plan

| Order | File/path                                                                | Change                                                    | Risk   |
| ----: | ------------------------------------------------------------------------ | --------------------------------------------------------- | ------ |
|     1 | This plan                                                                | Record scope, evidence, lifecycle, and checks             | Low    |
|     2 | ADR-0001                                                                 | Amend queue, sealing, retention, and completion semantics | Medium |
|     3 | PRD and content contract                                                 | Reconcile lifecycle states and receipt fields             | Medium |
|     4 | Root `AGENTS.md`, ingestion packet, intake runbook                       | Enforce role/transition boundaries                        | Medium |
|     5 | `docs/templates/CONTENT_INTAKE_HANDOFF_PROMPT.md`                        | Add exact reusable repository-aware handoff               | Low    |
|     6 | Git-ignored `private/content-intake/{inbox,raw,work,reviewed,completed}` | Create local operating folders                            | Low    |

## 12. Implementation steps

1. Amend ADR-0001 before changing the lifecycle contract.
2. Reconcile PRD, content contract, packet, runbook, and maintainer instructions.
3. Add the handover prompt and create the local private folders.
4. Validate formatting/YAML, ignore coverage, path containment, source
   preservation, Quartz input isolation, and public-output leakage.

## 13. Test plan

- Confirm every expected private directory exists.
- Confirm representative files beneath every private directory match the
  existing `private/` ignore rule.
- Parse all new YAML examples.
- Confirm no contract authorizes the content-authoring LLM to move sealed raw
  evidence or self-create a completion receipt.
- Confirm Quartz continues to build only from `content/` and that no private
  path or marker appears below `public/`.
- Run targeted Prettier and `git diff --check`; run broader tests in proportion
  to documentation-only changes.

## 14. Migration and compatibility

Existing sealed pilot folders below `raw/` and `work/` remain valid. They are not
moved. Missing lifecycle folders are created locally. Existing external
allowlisted sources remain supported. No public content or immutable ID moves.

## 15. Deployment

Not applicable. This change does not deploy, add bindings, change DNS, or create
remote resources.

## 16. Rollback and recovery

Documentation may be reverted without deleting private source material. Empty
local lifecycle folders may remain harmlessly. Never roll back by deleting raw
sources or review evidence.

## 17. Risks and stop conditions

| Risk                                                   | Resolution                                                    | Stop condition      |
| ------------------------------------------------------ | ------------------------------------------------------------- | ------------------- |
| Inbox transition targets the wrong folder              | Require an exact selected child and containment/hash checks   | Yes                 |
| An LLM treats generated work as independently complete | Separate author, reviewer, and completion roles               | Yes                 |
| Source text enters Git/static output                   | Broad ignore plus build/leak checks                           | Yes                 |
| Existing pilot evidence would need moving              | Preserve it in place                                          | Yes                 |
| Raw retention becomes costly                           | Later owner-approved retention ADR; no deletion in this slice | No immediate change |

## 18. Adversarial review

No generated navigation or graph meaning changes. No canonical IDs or paths
move. Private material remains outside `content/`. No API, database, identity,
or dependency is added. Rollback preserves all user data. The one permitted
source move is bounded to the explicitly selected inbox child during sealing;
the content author has no move/delete authority.

## 19. Completion evidence

- Created local, Git-ignored `inbox/`, `raw/`, `work/`, `reviewed/`, and
  `completed/` directories below `private/content-intake/` without moving the
  existing pilot sources.
- Added `docs/templates/CONTENT_INTAKE_HANDOFF_PROMPT.md` with exact-drop,
  seal-then-author role boundaries and a prohibition on sibling inbox sweeps,
  self-review, completion receipts, publishing, and deployment.
- Reconciled ADR-0001, PRD FR-PUB-04, `CONTENT_MODEL.md`, root `AGENTS.md`, the
  ingestion packet, and the intake runbook.
- All modified YAML examples parsed successfully.
- `git check-ignore -v --no-index` proved representative inbox, raw, work,
  reviewed, and completed paths are covered by `.gitignore:10:private/`.
- Containment checks proved all five local directories resolve below the exact
  private intake root.
- Quartz 5.0.0 build found only two `content/` inputs, filtered the instruction
  file, and emitted 39 public files from the one published page.
- Public scans found no private source inbox marker, intake path, handover
  prompt variable, or completion receipt name; `public/private` is absent.
- Targeted Prettier and `git diff --check` passed.
- `npm test`: 163 passed, 0 failed, 0 skipped.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Lifecycle authorities reconciled.
- [x] Local folder tree created.
- [x] Handover prompt created.
- [x] Ignore and public-output isolation proved.
- [x] Formatting and schema checks pass.
- [x] Known limitations documented.

## 21. Completion log

| Date       | Commit        | Work completed                                                                                                   | Evidence                                                                                                   | Remaining                                      |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 2026-08-23 | Not committed | Plan created after repository and source-workflow audit                                                          | Existing ignore rule, ADR-0001, PRD FR-PUB-04, original/concrete LLM Wiki sources                          | Implement and validate lifecycle               |
| 2026-08-23 | Not committed | Implemented and validated the private queue, trusted seal boundary, completion receipt, and reusable LLM handoff | Folder/ignore/containment checks; YAML and formatting passes; Quartz build; 163 tests; public leakage scan | None for this documentation/local-folder slice |

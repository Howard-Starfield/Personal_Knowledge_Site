# Execution Plan: Phase X — <Name>

| Field           | Value                                               |
| --------------- | --------------------------------------------------- |
| Status          | Draft / Approved / In progress / Blocked / Complete |
| Owner           |                                                     |
| Created         | YYYY-MM-DD                                          |
| Updated         | YYYY-MM-DD                                          |
| Baseline commit |                                                     |
| Target branch   |                                                     |
| PR              |                                                     |
| PRD phase       |                                                     |
| Related ADRs    |                                                     |

## 1. Objective

State the exact outcome in observable terms.

## 2. Non-goals

List work that is explicitly excluded. Include later PRD phases that must not leak into this change.

## 3. Acceptance gates copied from the PRD

- [ ] Copy each applicable gate verbatim or link to a stable heading and restate it here.
- [ ] Add phase-specific measurable gates.
- [ ] Define what evidence proves each gate.

## 4. Instruction sources

Record all instruction files active for this work.

| Scope/path  | Instruction file   | Relevant rules |
| ----------- | ------------------ | -------------- |
| Repository  | `AGENTS.md`        |                |
| Nested path | `<path>/AGENTS.md` |                |

Verification command/output:

```text
<How active Codex instruction sources were verified>
```

## 5. Version and environment matrix

| Component                           | Exact version/commit | Source of truth | Notes |
| ----------------------------------- | -------------------- | --------------- | ----- |
| Quartz                              |                      |                 |       |
| Quartz plugins                      |                      |                 |       |
| Node                                |                      |                 |       |
| npm                                 |                      |                 |       |
| Wrangler                            |                      |                 |       |
| Hono                                |                      |                 |       |
| D3/Pixi                             |                      |                 |       |
| Cloudflare compatibility date/flags |                      |                 |       |
| Test tools                          |                      |                 |       |

## 6. Official source verification

For every material implementation assumption, provide both an official source and the installed code location when applicable.

| Claim/assumption                         | Official URL | Verified date | Installed source file/symbol | Finding |
| ---------------------------------------- | ------------ | ------------- | ---------------------------- | ------- |
| Example: ContentIndex data used by graph |              |               |                              |         |

Rules:

- Do not cite blogs/tutorials as authority when official docs/source exist.
- Do not leave “assumed” for a critical behavior.
- When docs/source conflict, move the issue to Blockers and create a spike/ADR.

## 7. Repository reconnaissance

### Current behavior reproduced

Document commands and observed outputs before changes.

### Relevant code map

| Area | File/symbol | Current responsibility | Expected change |
| ---- | ----------- | ---------------------- | --------------- |
|      |             |                        |                 |

### Existing tests and fixtures

List tests that already protect this area and gaps that must be filled.

## 8. Contracts and invariants

Copy or reference the exact contracts affected.

### Content identity

- [ ] IDs remain immutable.
- [ ] Path/title/permalink are not treated as identity.

### Category table

- [ ] Generated navigation cannot become authored graph edges.

### Graph

- [ ] Solid = authored internal link.
- [ ] Dotted = page-to-tag membership.
- [ ] Folder = cluster, no edge.

### Security/data

- [ ] Markdown remains canonical public content.
- [ ] D1 records are principal-scoped.
- [ ] Access identity is validated server-side.
- [ ] No secret/private data enters static output/logs.

Add phase-specific invariants below:

## 9. Proposed design

Describe the design, data flow, extension points, and why it is the smallest compliant approach.

Include diagrams where useful.

### Alternatives considered

| Alternative | Benefit | Problem | Decision |
| ----------- | ------- | ------- | -------- |
|             |         |         |          |

State whether an ADR is required. If yes, stop implementation until it is approved.

## 10. Data and schema changes

### Static/build contracts

List manifest/frontmatter/HTML/schema changes and versioning behavior.

### D1 migrations

List migration files, compatibility, indexes, backfill, recovery, and rollback implications.

### API changes

List routes, request/response schemas, auth, errors, idempotency, and concurrency.

### Media changes

List provider, media ID, upload/playback/caption behavior, and retention.

Use “not applicable” explicitly rather than leaving a section ambiguous.

## 11. File touch plan

| Order | File/path | Change | Reason | Risk |
| ----: | --------- | ------ | ------ | ---- |
|     1 |           |        |        |      |

Do not include speculative unrelated refactors.

## 12. Incremental implementation steps

Each step should leave the repository testable.

### Step 1 — <Name>

- Change:
- Verification:
- Evidence:
- Rollback point:

### Step 2 — <Name>

- Change:
- Verification:
- Evidence:
- Rollback point:

Add steps as needed. Avoid a single “implement everything” step.

## 13. Test plan

### Unit

| Behavior | Test/fixture | Expected result |
| -------- | ------------ | --------------- |
|          |              |                 |

### Integration/build

| Behavior | Command/test | Expected result |
| -------- | ------------ | --------------- |
|          |              |                 |

### End-to-end/UI

| Flow | Viewports/input modes | Evidence |
| ---- | --------------------- | -------- |
|      |                       |          |

### Accessibility

- keyboard path;
- screen-reader semantics;
- contrast/focus;
- reduced motion;
- graph/table alternative.

### Security

- unauthenticated/unauthorized;
- cross-principal access;
- invalid payload/origin;
- output/log secret scan;
- static private-data leak check.

### Performance

State fixture size, baseline, threshold, and measurement method.

## 14. Migration and compatibility

- Existing content/data migration:
- Base/head ID preservation:
- Backward-compatible window:
- Deployment order:
- Registry/manifest synchronization:
- User-visible impact:

## 15. Deployment plan

- Preview resources/bindings:
- Required secrets:
- D1 migration order:
- Worker/static deploy order:
- Smoke tests:
- Production approval:

Never reuse production data resources in preview.

## 16. Rollback and recovery

State exact rollback triggers and actions.

- Code/static rollback:
- D1 compatibility:
- Media impact:
- Content registry resync:
- Write pause requirement:
- Data that cannot be rolled back:

Do not claim that deleting an applied migration is a rollback.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown | Impact | How it will be resolved | Stop condition? |
| ------------ | ------ | ----------------------- | --------------- |
|              |        |                         |                 |

Implementation must stop when a critical row remains unresolved.

## 18. Adversarial review

Answer before requesting review:

1. Could generated navigation become a graph edge?
2. Could a file move break IDs, links, notes, media, aliases, or routes?
3. Could unpublished content/assets become public?
4. Could one principal access another's data?
5. Is any client identity/role trusted?
6. Is any new API or source field undocumented/unverified?
7. Does optional feature failure break article reading?
8. Does D1 become an article source of truth?
9. Can rollback preserve user data?
10. Are explicit links, tags, folders, and future semantic relations still distinct?

## 19. Completion evidence

Fill during implementation.

### Commands and results

```text
<command>
<result summary and artifact/log location>
```

### Generated artifacts inspected

- content manifest:
- graph manifest:
- category HTML:
- Worker dry-run/build:
- D1 migration output:

### UI evidence

- screenshots/recordings:
- mobile/desktop:
- light/dark:
- keyboard/reduced motion:

### Deviations from plan

List every deviation and its approval/ADR.

## 20. Final acceptance checklist

- [ ] Objective achieved.
- [ ] Non-goals not implemented accidentally.
- [ ] All PRD acceptance gates pass.
- [ ] Contracts/docs updated.
- [ ] Tests/evidence attached.
- [ ] Security/privacy review complete.
- [ ] Migration/rollback documented and tested where possible.
- [ ] Known limitations documented.
- [ ] Plan completion log updated.
- [ ] Plan ready to move from `active/` to `completed/`.

## 21. Completion log

| Date | Commit | Work completed | Evidence | Remaining |
| ---- | ------ | -------------- | -------- | --------- |
|      |        |                |          |           |

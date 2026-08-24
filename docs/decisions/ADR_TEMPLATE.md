# ADR-XXXX: <Decision title>

| Field | Value |
|---|---|
| Status | Proposed / Accepted / Rejected / Superseded |
| Date | YYYY-MM-DD |
| Decision owners | |
| Related PRD section | |
| Related execution plan | |
| Supersedes | |
| Superseded by | |

## Context

Describe the problem, current architecture, constraints, and why the existing PRD decision is insufficient or must be clarified.

## Decision drivers

- user/product need;
- security/privacy;
- data integrity;
- Quartz upgradeability;
- Cloudflare compatibility;
- accessibility/performance;
- operational cost/complexity;
- rollback and migration.

## Verified evidence

| Claim | Official source URL | Verified date | Pinned source file/symbol or experiment | Finding |
|---|---|---|---|---|
| | | | | |

Do not base an ADR on undocumented assumptions.

## Considered options

### Option A — <Name>

Description.

Advantages:

- ...

Disadvantages/risks:

- ...

### Option B — <Name>

Description.

Advantages:

- ...

Disadvantages/risks:

- ...

Add options as required, including “keep current decision.”

## Decision

State the selected option precisely. Include what is not being approved.

## Contract impact

Check and describe all that apply:

- [ ] Quartz/core/plugin boundary
- [ ] content/frontmatter schema
- [ ] immutable IDs
- [ ] category table
- [ ] graph semantics/manifest
- [ ] public routes/permalinks
- [ ] API contract
- [ ] D1 schema/migrations
- [ ] Access/auth/authorization
- [ ] R2/Stream media contract
- [ ] deployment topology
- [ ] privacy/retention
- [ ] frontend/accessibility
- [ ] dependency/version matrix

## Consequences

### Positive

- ...

### Negative

- ...

### New risks

- ...

## Migration plan

Describe content, code, static manifest, D1, media, and deployment steps in safe order.

## Backward compatibility

State the compatibility window and how old clients/builds/data behave.

## Rollback

State exactly how to reverse or contain the decision without deleting user data. If irreversible, say so and define recovery.

## Validation and acceptance evidence

List required tests, benchmarks, security review, preview deployment, screenshots, and generated artifacts.

## Follow-up work

- [ ] Update PRD sections.
- [ ] Update root/nested `AGENTS.md` if operational rules changed.
- [ ] Update version matrix/contracts.
- [ ] Link implementation plans/PRs.
- [ ] Add upgrade/rollback runbook.

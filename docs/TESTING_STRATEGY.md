# Testing Strategy

## Principle

Tests prove different layers; compilation is not a substitute for behavior.
Feature-specific cases and commands belong in the applicable active execution
plan. This document defines the project-wide proof model.

## Layers

| Layer             | Proves                                                            | Does not prove                                      |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| Static/format     | Parseable, consistently formatted source                          | Runtime behavior                                    |
| TypeScript        | Type-level consistency for trusted code paths                     | Validation of untrusted runtime data                |
| Unit              | Deterministic domain/component behavior                           | Real build or browser integration                   |
| Content/schema    | IDs, taxonomy, frontmatter, references, revisions                 | Visual/accessibility quality                        |
| Integration/build | Real Quartz parsing/filtering/emission and manifests              | Browser interaction across navigation               |
| Browser/UAT       | Rendered interaction, responsive behavior, keyboard flows         | Deployment platform behavior                        |
| Hosting/dry-run   | Worker config, assets, routes, 404 behavior                       | Production DNS/auth/secrets unless exercised safely |
| Security          | Authorization, validation, leakage, unsafe input, failure closure | General feature usability                           |

## Required habits

- Add or identify regression coverage for changed behavior.
- Cover success, absence, malformed input, duplicate/collision, boundary, and
  failure states relevant to the change.
- Treat external/runtime data as `unknown` until runtime-validated.
- Mock provider/system boundaries, not the behavior being proved.
- Keep tests deterministic: no uncontrolled network, wall-clock timing, random
  identity, production binding, or mutable shared state.
- Never delete, skip, weaken, broadly re-snapshot, or suppress a failing test to
  accept an implementation.
- Report environment blockers separately from assertion failures.

## Baseline command families

The exact current commands and versions live in
`docs/architecture/VERSION_MATRIX.md`. A normal local implementation proves the
relevant equivalents of:

```powershell
npx prettier <changed-files> --check
npx tsc --noEmit
npm test
npx quartz build --concurrency=1
npx wrangler deploy --dry-run
```

UI work additionally requires real browser evidence at representative desktop
and mobile widths, keyboard operation, visible focus, reduced-motion review,
and an accessibility scan appropriate to the changed surface.

## Content and privacy proof

Every public-content change inventories emitted routes/assets and scans for
draft/private/source leakage. Identity checks cover missing, malformed,
duplicate, moved, and changed IDs. Generated navigation is checked separately
from authored body links so navigation never silently changes graph meaning.

## Completion report

Record exact commands, exit status, meaningful counts, browser scenarios,
screenshots when visual behavior changes, environment limitations, and gates not
run. Never summarize a dry run as deployment or a local build as clean-clone
reproducibility.

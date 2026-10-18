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
`docs/architecture/VERSION_MATRIX.md`. The CI job `verify`
(`.github/workflows/ci.yaml`) runs this list on every pull request and every
push to `v5`; a normal local implementation proves the same before opening a
pull request:

```powershell
npx tsc --noEmit
npx prettier . --check
npm test
npm run validate:content
npx quartz build --concurrency=1
npm run validate:graph
npx wrangler deploy --dry-run
```

`npm test` uses explicit test globs; add new tests under `quartz/`, `plugins/`,
or `scripts/` with the existing `.test.{ts,js,mjs}` naming. `validate:graph`
reads build output and must run after the build.

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

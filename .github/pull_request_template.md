<!--
Pull-request evidence required by AGENTS.md. Fill every section; write "Not applicable" with a
reason instead of deleting one. The CI job `verify` must pass before merge.
-->

## Plan

- Active plan: `docs/exec-plans/active/<plan>.md`

## Scope

- In scope:
- Not in scope:

## Official sources used

| Claim | Source URL or pinned file | Verified date |
| ----- | ------------------------- | ------------- |
|       |                           |               |

## Test commands and results

<!-- Paste each command with its exit status and meaningful counts. -->

```text
npx tsc --noEmit
npx prettier . --check
npm test
npm run validate:content
npx quartz build --concurrency=1
npm run validate:graph
npx wrangler deploy --dry-run
```

## UI evidence

<!-- Screenshots or recordings for UI changes: desktop/mobile, light/dark, keyboard focus. -->

## Generated manifest evidence

<!-- Required for content, graph, or quiz contract changes. -->

## Migration and rollback

-

## Known limitations

-

## Acceptance-gate checklist

- [ ] Plan is current and matches the implementation.
- [ ] All plan acceptance gates pass, with evidence above.
- [ ] Contracts and docs updated in this change.
- [ ] No test was skipped, weakened, or broadly re-snapshotted.
- [ ] No private, draft, or licensed source content reaches `content/` or static output.
- [ ] AGENTS.md adversarial completion review answered in the plan.

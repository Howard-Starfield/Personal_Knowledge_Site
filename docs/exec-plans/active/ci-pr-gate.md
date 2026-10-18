# Execution Plan: Phase 0 — CI pull-request gate

| Field           | Value                                                                       |
| --------------- | --------------------------------------------------------------------------- |
| Status          | In progress                                                                 |
| Owner           | Product owner with Claude Code implementation support                       |
| Created         | 2026-10-18                                                                  |
| Updated         | 2026-10-18                                                                  |
| Baseline commit | `068520b1abde57dc795d0e15ea4138e4786d065d`                                  |
| Target branch   | `v5` through a pull request; no push or PR without owner approval           |
| PR              | Not created                                                                 |
| PRD phase       | Phase 0 — Recover, pin, and prove the foundation                            |
| Related ADRs    | None required; no deployment, topology, auth, or storage dependency changes |

## 1. Objective

Every pull request and every push to `v5` runs one GitHub Actions job, `verify`, that reproduces
the repository's local proof chain on the pinned Node runtime: clean install, TypeScript,
repository-wide Prettier, unit tests with explicit globs, content validation, a real Quartz build,
graph output validation, and a Wrangler assets-only dry run. Upstream Quartz workflows that would
deploy to the wrong host or publish images/tags are removed. The PR template and command
documentation match the new gate.

## 2. Non-goals

- No deploy job, preview deployment, Cloudflare secret, or production binding.
- No change to `push.bat` or the owner's direct-push publishing path (handled separately).
- No quiz, content, or plugin behavior changes.
- No dependency upgrade; the lockfile is unchanged.
- No branch-protection change; settings are recommended to the owner only.
- No change to Dependabot configuration, `FUNDING.yml`, or issue templates.

## 3. Acceptance gates copied from the PRD

- [x] PRD Phase 0: "replace or disable upstream workflows gated to `jackyzha0/quartz`".
      Evidence: the four upstream deploy/preview/docker workflows are deleted and `ci.yaml` is
      replaced with no deploy or tag job.
- [x] PRD Phase 0: "restore deterministic install/check/test/build commands".
      Evidence: CI uses `npm ci` on the `.node-version` runtime; `npm test` uses explicit globs.
- [x] Phase-specific: `npx prettier . --check` passes repository-wide (8 docs files formatted in
      a separate mechanical commit).
- [x] Phase-specific: all workflow steps pass locally before handoff (section 19).
- [ ] Phase-specific: the `verify` job passes on GitHub after the owner approves a push/PR.

## 4. Instruction sources

| Scope/path | Instruction file             | Relevant rules                                                           |
| ---------- | ---------------------------- | ------------------------------------------------------------------------ |
| Repository | `AGENTS.md`                  | Plan-before-code, source verification, required checks, PR evidence list |
| Repository | `docs/TESTING_STRATEGY.md`   | Proof layers; never summarize a dry run as deployment                    |
| Repository | `docs/exec-plans/active/...` | Phase 0 plan defers workflow replacement to a reviewed workflow slice    |

No nested `AGENTS.md` covers `.github/`, `docs/`, `scripts/`, or `package.json`.

Verification command/output:

```text
git ls-files | grep AGENTS.md  ->  AGENTS.md, content/AGENTS.md (content/ is not touched)
```

## 5. Version and environment matrix

| Component             | Exact version/commit                                  | Source of truth                  | Notes                                       |
| --------------------- | ----------------------------------------------------- | -------------------------------- | ------------------------------------------- |
| Node (CI)             | `v22.16.0`                                            | `.node-version`                  | Bundles npm `10.9.2`, the engine minimum    |
| Node (local evidence) | `v24.14.0`                                            | `node --version`                 | Diagnostic only, not exact-pin proof        |
| `actions/checkout`    | `v7.0.1` = `3d3c42e5aac5ba805825da76410c181273ba90b1` | `gh api .../git/ref/tags/v7.0.1` | Commit-SHA pin; Dependabot keeps it current |
| `actions/setup-node`  | `v7.1.0` = `949feb2413d6458794dcd2491c4babbbce0c15c1` | `gh api .../git/ref/tags/v7.1.0` | Commit-SHA pin                              |
| Runner image          | `ubuntu-24.04`                                        | Workflow                         | Explicit image, not `ubuntu-latest`         |
| Wrangler              | `4.125.0`                                             | `package.json`, lockfile         | Unchanged                                   |
| TypeScript/Prettier   | lockfile-resolved                                     | `package-lock.json`              | Unchanged                                   |
| Quartz                | `5.0.0`                                               | `package.json`                   | Unchanged                                   |

## 6. Official source verification

| Claim/assumption                                               | Official URL                                                                             | Verified date | Installed source file/symbol                             | Finding                                                                                                                                                                    |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setup-node` reads `.node-version` and caches npm              | `https://github.com/actions/setup-node/blob/v7.1.0/action.yml`                           | 2026-10-18    | `action.yml` inputs `node-version-file`, `cache`         | Both inputs exist at the pinned SHA                                                                                                                                        |
| `checkout` supports `fetch-depth` and `persist-credentials`    | `https://github.com/actions/checkout/blob/v7.0.1/action.yml`                             | 2026-10-18    | `action.yml` inputs `fetch-depth`, `persist-credentials` | Both inputs exist at the pinned SHA                                                                                                                                        |
| Upstream workflows never run here                              | Repository files                                                                         | 2026-10-18    | `.github/workflows/*.yaml` job `if:`                     | All jobs gated on `github.repository == 'jackyzha0/quartz'`                                                                                                                |
| Wrangler dry run needs no Cloudflare credentials               | `https://developers.cloudflare.com/workers/wrangler/commands/`                           | 2026-10-18    | Local run with no token env and no Wrangler auth config  | `--dry-run: exiting now.` after reading assets; exit 0                                                                                                                     |
| Node test runner expands quoted glob arguments                 | `https://nodejs.org/docs/latest-v22.x/api/test.html#running-tests-from-the-command-line` | 2026-10-18    | `fs.globSync` on the four patterns                       | Expands to exactly the 14 tracked test files                                                                                                                               |
| Quartz links local plugins into `.quartz/plugins` during build | Repository source                                                                        | 2026-10-18    | `quartz/plugins/loader/config-loader.ts` `installPlugin` | Symlinks appear after build; Node's default discovery skips that dot-directory (bare `tsx --test` also found 180 after a build), but it walks every other untracked folder |

## 7. Repository reconnaissance

### Current behavior reproduced

- No workflow runs on `Howard-Starfield/Personal_Knowledge_Site`; every job is repository-gated.
- If ungated, `deploy-v5`/`deploy-preview` target a Cloudflare Pages project named `quartz`,
  `docker-build-push` publishes a GHCR image, and `ci.yaml` `publish-tag` creates release tags.
- `npx tsc --noEmit`: exit 0.
- `npx prettier . --check`: fails on 8 docs files (`ADR_TEMPLATE.md`, `PLAN_TEMPLATE.md`,
  3 completed plans, `mainter_agent.md`, `PRD-v1.0.md`, `LEARNING_INBOX_AGENT.md`).
- Explicit-glob tests: 180 tests, 45 suites, 14 tracked test files, all pass. (The 2026-10-18
  review counted 170 tests in 13 files; the difference is `quartz/cli/helpers.test.js`, 10 tests.)
- `npm run validate:content`: 551 entities, 551 unique IDs.
- `npx quartz build --concurrency=1`: 552 input files, 598 emitted files.
- `npm run validate:graph`: 551 pages, 2 tags, 2160 relationships, 533 graph-enabled pages.
- `npx wrangler deploy --dry-run`: 622 asset files read, no bindings.
- `package.json` and `package-lock.json` root dependency ranges match exactly, so `npm ci` will not
  reject the lockfile.

### Relevant code map

| Area            | File/symbol                                             | Current responsibility     | Expected change                           |
| --------------- | ------------------------------------------------------- | -------------------------- | ----------------------------------------- |
| CI              | `.github/workflows/ci.yaml`                             | Upstream gated build + tag | Replaced by the `verify` job              |
| Upstream deploy | `build-preview`, `deploy-preview`, `deploy-v5`          | Cloudflare Pages deploys   | Deleted                                   |
| Upstream image  | `docker-build-push.yaml`                                | GHCR image publish         | Deleted                                   |
| Test entry      | `package.json` `scripts.test`                           | Bare `tsx --test`          | Explicit globs                            |
| PR template     | `.github/pull_request_template.md`                      | Upstream contributor text  | AGENTS.md pull-request evidence checklist |
| Command docs    | `VERSION_MATRIX.md`, `TESTING_STRATEGY.md`, `README.md` | Phase 0 command list       | Add validators, prettier, CI reference    |

### Existing tests and fixtures

The 14 test files listed in section 13 plus the real content tree. This slice adds no product
behavior, so it adds no unit test; the workflow itself is the regression gate.

## 8. Contracts and invariants

- [x] Content identity, category tables, and graph semantics: untouched.
- [x] Markdown remains canonical public content.
- [x] No secret enters the workflow; `permissions: contents: read`; checkout does not persist
      credentials; no `pull_request_target`.
- [x] No deploy, publish, or tag step exists.

## 9. Proposed design

One workflow file, one job, sequential steps that mirror the local proof order. A single job keeps
one required status check name (`verify`) for branch protection. Steps run on `pull_request` (all
branches, including Dependabot PRs) and on `push` to `v5`; `workflow_dispatch` allows manual reruns.
PR runs on the same ref cancel superseded runs; `v5` pushes never cancel.

`npm test` itself gets the explicit globs so local runs and CI cannot drift:

```text
tsx --test "quartz/**/*.test.ts" "quartz/**/*.test.js" "plugins/**/*.test.ts" "scripts/**/*.test.mjs"
```

Double quotes stop both POSIX `sh` and Windows `cmd` from expanding the patterns; Node expands them.

### Alternatives considered

| Alternative                              | Benefit                  | Problem                                               | Decision |
| ---------------------------------------- | ------------------------ | ----------------------------------------------------- | -------- |
| Keep upstream files, change the `if:`    | Smaller diff             | Leaves Pages/GHCR/tag jobs one edit away from running | Rejected |
| Globs only in the workflow               | `package.json` unchanged | Local `npm test` still runs untracked scratch copies  | Rejected |
| OS matrix like upstream                  | Cross-OS proof           | Production build runs on one Linux runner; 3× cost    | Deferred |
| `cloudflare/wrangler-action` for dry run | Official action          | Adds an action dependency for a no-auth CLI call      | Rejected |

No ADR is required.

## 10. Data and schema changes

Not applicable: no manifest, frontmatter, D1, API, or media change.

## 11. File touch plan

| Order | File/path                                                                           | Change                  | Reason                       | Risk |
| ----: | ----------------------------------------------------------------------------------- | ----------------------- | ---------------------------- | ---- |
|     1 | `docs/exec-plans/active/ci-pr-gate.md`                                              | New plan                | Plan-before-code             | Low  |
|     2 | 8 docs files listed in section 7                                                    | `prettier --write` only | Repository-wide format gate  | Low  |
|     3 | `.github/workflows/ci.yaml`                                                         | Replace                 | PR gate                      | Low  |
|     4 | `.github/workflows/{build-preview,deploy-preview,deploy-v5,docker-build-push}.yaml` | Delete                  | Wrong host/publish targets   | Low  |
|     5 | `package.json`                                                                      | `scripts.test` globs    | Deterministic test discovery | Low  |
|     6 | `.github/pull_request_template.md`                                                  | Replace                 | AGENTS.md evidence list      | Low  |
|     7 | `docs/architecture/VERSION_MATRIX.md`, `docs/TESTING_STRATEGY.md`, `README.md`      | Command lists           | Stale docs                   | Low  |

## 12. Incremental implementation steps

### Step 1 — Mechanical formatting

- Change: `prettier --write` on the 8 files; no wording change.
- Verification: `npx prettier . --check` exit 0; `git diff --stat` shows only those files.
- Rollback point: revert the formatting commit.

### Step 2 — Workflow, test script, PR template, docs

- Change: files 3–7 above.
- Verification: every workflow step run locally in order (section 19).
- Rollback point: revert the commit; no external state is created.

## 13. Test plan

### Integration/build

| Behavior           | Command                            | Expected result            |
| ------------------ | ---------------------------------- | -------------------------- |
| Types              | `npx tsc --noEmit`                 | exit 0                     |
| Format             | `npx prettier . --check`           | exit 0                     |
| Unit tests         | `npm test`                         | 180 pass, 0 fail, 14 files |
| Content schema/IDs | `npm run validate:content`         | exit 0                     |
| Real build         | `npx quartz build --concurrency=1` | exit 0                     |
| Graph manifest     | `npm run validate:graph`           | exit 0                     |
| Worker config      | `npx wrangler deploy --dry-run`    | exit 0, no bindings        |

### End-to-end/UI, accessibility, performance

Not applicable: no UI or runtime change. Playwright is not yet a repository dependency and is not
added here.

### Security

- Workflow token is read-only; no secrets are referenced; fork PRs run without secrets.
- Actions are pinned to full commit SHAs.

## 14. Migration and compatibility

- `npm test` now runs only tracked test locations; new tests must live under `quartz/`, `plugins/`,
  or `scripts/` with the `.test.{ts,js,mjs}` naming already in use.
- User-visible impact: none.

## 15. Deployment plan

Not applicable. No deploy job is added. A later slice must add Workers deployment with scoped
secrets, separate preview/production names, and owner approval.

## 16. Rollback and recovery

Revert the commits. Deleted upstream workflows remain in Git history. No external state is created.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                             | Impact                        | How it will be resolved                  | Stop condition? |
| -------------------------------------------------------- | ----------------------------- | ---------------------------------------- | --------------- |
| Local proof ran on Node 24, not 22.16.0                  | Pin-specific failure possible | First GitHub run on the pinned runtime   | No              |
| `npm ci` not exercised locally (shared `node_modules`)   | Install failure in CI         | Lockfile/package.json sync check; CI run | No              |
| Quartz build could need network for fonts/images         | Flaky build                   | Runner has network; observe first run    | No              |
| Required check not enforced until owner applies settings | Gate is advisory              | Owner applies section 19 recommendations | No              |

## 18. Adversarial review

1. Generated navigation as a graph edge: no graph code changed.
2. File move breaking IDs/routes: no content moved.
3. Unpublished content becoming public: no build/publish behavior changed; no artifact upload.
4. Cross-principal access: not applicable.
5. Client identity trusted: not applicable.
6. Undocumented API/field: action inputs verified at pinned SHAs.
7. Optional failure breaking reading: not applicable.
8. D1 as source of truth: not applicable.
9. Rollback preserves data: yes, revert only.
10. Links/tags/folders distinct: unchanged.

## 19. Completion evidence

### Commands and results

See the completion log. Branch-protection recommendation for `v5` (owner applies in GitHub
Settings → Branches or Rules; not applied by this change):

- require a pull request before merging;
- require status check `verify` to pass, and require the branch to be up to date;
- block force pushes and deletions;
- optionally include administrators so `push.bat` direct pushes are also blocked.

Local run on 2026-10-18 from clean `public/` and `.quartz/`, in workflow order (Node `v24.14.0`;
shared `node_modules`, so `npm ci` was not exercised):

```text
npx tsc --noEmit                  exit 0
npx prettier . --check            exit 0  All matched files use Prettier code style!
npm test                          exit 0  tests 180, suites 45, pass 180, fail 0
npm run validate:content          exit 0  551 entities, 551 unique IDs
npx quartz build --concurrency=1  exit 0  552 files processed, 598 emitted
npm run validate:graph            exit 0  551 pages, 2 tags, 2160 relationships, 533 graph pages
npx wrangler deploy --dry-run     exit 0  622 asset files read, no bindings
npm test (after build)            exit 0  tests 180 (no symlink duplication)
```

### Deviations from plan

- The review's claim that bare `tsx --test` reruns tests through `.quartz/plugins` symlinks did not
  reproduce here (180 tests either way). Explicit globs are kept to bound discovery to tracked
  test locations; docs describe that reason rather than the symlink claim.

## 20. Final acceptance checklist

- [x] Objective achieved locally.
- [x] Non-goals not implemented accidentally.
- [ ] `verify` passes on GitHub (needs owner-approved push).
- [x] Contracts/docs updated.
- [x] Security/privacy review complete.
- [x] Rollback documented.
- [ ] Plan ready to move from `active/` to `completed/` after the first green GitHub run.

## 21. Completion log

| Date       | Commit      | Work completed                                                    | Evidence                    | Remaining                                 |
| ---------- | ----------- | ----------------------------------------------------------------- | --------------------------- | ----------------------------------------- |
| 2026-10-18 | `132f12b`   | Plan created                                                      | Section 7 baseline          | Implementation                            |
| 2026-10-18 | `f983d70`   | Prettier on 8 docs files                                          | `prettier . --check` exit 0 | Workflow                                  |
| 2026-10-18 | this commit | Workflow, upstream removal, test globs, PR template, command docs | Section 19                  | First GitHub run; owner branch protection |

# Execution Plan: Phase 0 — Online Foundation

| Field           | Value                                                                         |
| --------------- | ----------------------------------------------------------------------------- |
| Status          | In progress                                                                   |
| Owner           | Product owner with Codex implementation support                               |
| Created         | 2026-08-22                                                                    |
| Updated         | 2026-08-22                                                                    |
| Baseline commit | `c01f387a6a44a24148214059cba04b7f6847784e`                                    |
| Target branch   | `v5` (no commit/push authorized in this plan)                                 |
| PR              | Not created                                                                   |
| PRD phase       | Phase 0 — Recover, pin, and prove the foundation                              |
| Related ADRs    | None approved; stop if Quartz core patch or topology change appears necessary |

## 1. Objective

Recover the smallest reproducible Quartz 5 toolchain from the pinned baseline without discarding unrelated work, produce a local static build, and prove an assets-only Cloudflare Workers Static Assets configuration with correct extensionless routing and HTTP 404 behavior. Stop before public deployment, DNS changes, secrets, commits, or pushes until the owner confirms the public site name/domain and Cloudflare target.

## 2. Non-goals

- Do not implement category tables, courses, quizzes, Learning Inbox, comments, graph, managed media, D1, or Access.
- Do not deploy publicly, change DNS, create Cloudflare resources, push, commit, or open a pull request in this slice.
- Do not restore unrelated deleted README, license, Docker, code-of-conduct, or upstream-release files merely to make Git status smaller.
- Do not enable Giscus, encrypted/private-page output, analytics, or runtime-CDN graph dependencies.
- Do not patch Quartz core or replace Quartz/Cloudflare Workers Static Assets.

## 3. Acceptance gates copied from the PRD

- Reconcile the currently deleted build/toolchain files without discarding unrelated work.
- Pin Quartz, plugins, Node, npm, and deployment tools.
- Create `docs/architecture/VERSION_MATRIX.md`.
- Restore deterministic install/check/test/build commands.
- Identify and replace/disable upstream workflows gated to `jackyzha0/quartz` in a later reviewed workflow slice.
- Prove Workers Static Assets routing, nested pages, assets, and HTTP 404 behavior.
- Produce a real Quartz fixture build.
- Do not claim native/deployed readiness from compilation or a dry run alone.

## 4. Instruction sources

| Scope/path | Instruction file      | Relevant rules                                                                                |
| ---------- | --------------------- | --------------------------------------------------------------------------------------------- |
| Repository | `AGENTS.md`           | PRD authority, source verification, plan-before-code, dirty-work preservation, Workers target |
| Product    | `docs/product/PRD.md` | Phase 0 scope, public-output boundary, stop conditions                                        |
| Content    | `content/AGENTS.md`   | Public content and identity rules if the placeholder changes                                  |

Verified from the repository root before changes. No nested instruction file applies to root toolchain/config files.

## 5. Version and environment matrix

| Component                     | Exact version/commit                                                              | Source of truth                         | Current finding                                                         |
| ----------------------------- | --------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| Quartz                        | package `5.0.0`, commit `c01f387a6a44a24148214059cba04b7f6847784e`                | `HEAD:package.json`, Git                | `quartz/` exists; root launcher/config files are deleted                |
| Node project pin              | `22.16.0` candidate                                                               | `HEAD:.node-version`                    | Local shell is `24.14.0`; upstream workflows inconsistently use 22/24   |
| npm minimum/pin               | minimum `10.9.2`; exact recovery pin unresolved until clean install proof         | `HEAD:package.json`, local npm `11.9.0` | Record exact lockfile producer before completion                        |
| Quartz plugins                | exact package-lock resolutions, including comments/content/folder plugins `0.1.0` | `HEAD:package-lock.json`                | Current lockfile was replaced by an empty project                       |
| TypeScript                    | `5.9.3` resolved                                                                  | `HEAD:package-lock.json`                | Root `tsconfig.json` deleted                                            |
| Wrangler                      | `4.125.0`                                                                         | npm registry, verified 2026-08-22       | Not installed; Node requirement `>=22.0.0`; license `MIT OR Apache-2.0` |
| Cloudflare compatibility date | candidate `2026-08-22`, must pass pinned Wrangler validation                      | project-owned Wrangler config           | Not yet configured                                                      |

The Node/npm discrepancy is an evidence item, not permission to silently float CI versions. The first build may run under local Node 24.14.0, but completion must state that it is not exact Node-pin proof unless a matching runtime is used.

## 6. Official source verification

| Claim/assumption                                            | Official URL                                                                             |                Verified | Installed source/file                                         | Finding                                                                             |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------: | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Quartz build emits static output to `public`                | local pinned `docs/cli/build.md`                                                         |              2026-08-22 | `quartz/bootstrap-cli.mjs`                                    | `npx quartz build`; output default is `public`                                      |
| Quartz config fallback order                                | pinned repository source                                                                 |              2026-08-22 | `quartz/plugins/loader/config-loader.ts`, `resolveConfigPath` | `quartz.config.yaml` then legacy config then `quartz.config.default.yaml`           |
| Static assets can deploy without Worker code                | `https://developers.cloudflare.com/workers/best-practices/workers-best-practices`        | 2026-08-22 via Context7 | Wrangler config pending                                       | `assets.directory` is sufficient; no `main` required                                |
| SSG custom 404 and HTML routing are configurable            | `https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation` | 2026-08-22 via Context7 | `wrangler.jsonc`                                              | `not_found_handling: 404-page`; `auto-trailing-slash` passed the local route matrix |
| GitHub Actions uses Wrangler with scoped Cloudflare secrets | `https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/`          | 2026-08-22 via Context7 | Existing workflows target Pages and are owner-gated           | Later workflow uses `cloudflare/wrangler-action@v3` or pinned CLI after review      |
| Wrangler config is deployment source of truth               | `https://developers.cloudflare.com/workers/wrangler/commands/workers`                    | 2026-08-22 via Context7 | None                                                          | Do not configure production variables ad hoc in dashboard                           |

Context7 library ID: `/websites/developers_cloudflare_workers`.

## 7. Repository reconnaissance

### Current behavior reproduced

- Branch `v5`, HEAD `c01f387`, origin `Howard-Starfield/Personal_Knowledge_Site`.
- Essential tracked root files are deleted: `.gitignore`, `.node-version`, `.npmrc`, Prettier config, TypeScript declarations/config, `package.json`, `quartz.ts`, and `quartz.config.default.yaml`.
- `package-lock.json` is 92 bytes with no packages; pinned HEAD lock is approximately 234 KB.
- `node_modules/` exists but is untracked because `.gitignore` is deleted; it is generated state, not clean-install evidence.
- No `quartz.config.yaml`, `wrangler.*`, or `.openai/hosting.json` exists.
- Existing GitHub workflows are gated to `jackyzha0/quartz`; deploy workflows target Cloudflare Pages, not the approved Workers Static Assets target.
- `content/index.md` is an untracked blank Quartz welcome page and does not satisfy the product content contract.
- `docs/mainter_agent.md` is an untracked owner-created handoff prompt; preserve it unchanged in this slice.

### Relevant code map

| Area                | File/symbol                              | Responsibility                     | Expected change                                            |
| ------------------- | ---------------------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| CLI                 | `quartz/bootstrap-cli.mjs`               | Build/serve/plugin commands        | No core edit                                               |
| Config loader       | `quartz/plugins/loader/config-loader.ts` | Loads YAML/config and plugins      | No core edit                                               |
| Project launcher    | `quartz.ts`                              | Loads config/layout                | Restore exact baseline                                     |
| Dependency contract | `package.json`, `package-lock.json`      | Scripts and exact dependency graph | Restore baseline, then intentionally pin Wrangler          |
| Project config      | `quartz.config.yaml`                     | Public project behavior            | Create minimal safe project config after source inspection |
| Deployment          | `wrangler.jsonc`                         | Assets-only Workers config         | Create and dry-run after routing spike                     |
| Architecture record | `docs/architecture/VERSION_MATRIX.md`    | Exact reproducibility matrix       | Create/update with evidence                                |

## 8. Contracts and invariants

- Markdown/Git remains canonical.
- Restored toolchain files come from the exact baseline commit unless an intentional, documented delta is required.
- No unpublished content or attachments enter output.
- No optional runtime dependency may break basic reading.
- No runtime CDN graph, Giscus, encrypted-page output, analytics, or server code is enabled in the recovery configuration.
- Workers preview and production identities/secrets remain separate; this slice creates neither.
- Generated output and dependency directories remain ignored and uncommitted.

## 9. Proposed design

1. Restore only essential tracked toolchain files from the pinned baseline and leave unrelated deletions untouched.
2. Re-establish a valid lockfile and add Wrangler `4.125.0` as a development-only deployment tool with intentional lockfile evidence.
3. Create a project-owned Quartz YAML config with conservative public-only defaults; do not reuse unsafe upstream defaults blindly.
4. Build locally and inspect `public/`, nested routes, assets, and `404.html`.
5. Add assets-only `wrangler.jsonc` after confirming the Quartz output shape; start with official SSG routing and verify rather than guessing HTML handling.
6. Run Wrangler validation/dry-run locally. Public deployment remains a separate approved step.

No ADR is required unless assets-only routing cannot serve Quartz correctly or a Worker script/core patch appears necessary.

## 10. Data and schema changes

- Static/build: project Quartz config and Wrangler assets config only.
- D1 migrations: not applicable.
- API changes: not applicable; no Worker `main` or API route.
- Media changes: not applicable.

## 11. File touch plan

| Order | File/path                                                         | Change                                                         | Reason                                   | Risk                                    |
| ----: | ----------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------- | --------------------------------------- |
|     1 | Essential deleted root toolchain files                            | Restore exact `c01f387` versions                               | Recover build without redesign           | Medium: overlaps pre-existing deletions |
|     2 | `package.json`, `package-lock.json`                               | Add exact Wrangler dev dependency after baseline restore       | Deployment dry-run                       | Medium: dependency/lock churn           |
|     3 | `quartz.config.yaml`                                              | Add minimal public project config                              | Avoid unsafe/incorrect upstream defaults | Medium                                  |
|     4 | `wrangler.jsonc`                                                  | Assets-only configuration                                      | Workers Static Assets preview/dry-run    | Medium                                  |
|     5 | `docs/architecture/VERSION_MATRIX.md`                             | Record exact tools/source evidence                             | Required Phase 0 authority               | Low                                     |
|     6 | This plan                                                         | Keep evidence/current blockers                                 | Required protocol                        | Low                                     |
|     7 | `docs/exec-plans/evidence/phase-0/package-lock.pre-recovery.json` | Preserve the pre-existing empty lockfile before reconciliation | Avoid discarding unrecognized work       | Low                                     |

Existing content/product docs and `docs/mainter_agent.md` are preserved. Workflow replacement is deferred until local build/dry-run evidence exists.

## 12. Incremental implementation steps

### Step 1 — Recover exact baseline

- Restore only the essential deleted toolchain files listed in section 7.
- Verify restored hashes/content against `c01f387`.
- Leave unrelated deletions and untracked product documentation unchanged.

### Step 2 — Install and validate

- Add/pin Wrangler only after the baseline package/lock pair is restored.
- Run deterministic dependency install with network approval.
- Record actual Node/npm versions and any lockfile producer difference.

### Step 3 — Safe Quartz configuration and fixture build

- Create project-owned public config after inspecting installed plugin contracts.
- Build a minimal public fixture without enabling later product phases.
- Inspect output inventory, 404, external scripts, and unpublished leakage.

### Step 4 — Workers assets-only proof

- Configure `public/` assets, preview URLs, custom 404, and tested HTML handling.
- Run Wrangler config validation/dry-run.
- Serve the output through the closest available local Workers mechanism and assert routes/statuses if supported without cloud resource creation.

## 13. Test plan

| Area          | Proof                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| Dependencies  | Restored package/lock consistency; deterministic install command/result                                     |
| Type/style    | Project `check` command after exact scripts are restored                                                    |
| Unit          | Existing Quartz test command; failures classified, not weakened                                             |
| Build         | Real Quartz build to `public/`                                                                              |
| Output safety | Inventory excludes drafts/private/unintended files and optional external scripts                            |
| Routing       | `/`, nested page, static asset, extensionless page, trailing-slash variant, and missing route with HTTP 404 |
| Workers       | Pinned Wrangler configuration validation/dry-run; no `main` bundle unless evidence requires it              |

Accessibility/UI proof is limited to the minimal fixture in this phase; production design UAT belongs to later product phases.

## 14. Migration and compatibility

No user data migration. Restored root files recover the initial commit's build contract. Generated output and `node_modules` remain disposable. A new Wrangler config is additive and has no runtime effect before deployment.

## 15. Deployment plan

This plan stops before deployment. A later step requires:

- owner-confirmed project/site name and initial `workers.dev` versus custom domain choice;
- authenticated `wrangler whoami` proof without exposing credentials;
- separate preview/production resource names;
- least-privilege Cloudflare API token stored only in approved secrets;
- reviewed GitHub workflow and branch/publishing boundary;
- explicit owner approval for first external deployment and DNS mutation.

## 16. Rollback and recovery

Restored files are recoverable because their source is the pinned baseline commit. New config/docs can be removed before deployment without external impact. No cloud resource or user data is created in this slice.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                                          | Impact                                                     | Resolution                                                            | Stop?                                                         |
| --------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------- |
| Pre-existing deletions were intentional beyond stripping the template | Restoring could overlap owner work                         | Restore only build-critical exact-baseline files and report inventory | Stop if restored content conflicts with an edited replacement |
| Node 22.16 pin conflicts with local Node 24 and upstream CI 24        | Reproducibility claim is weak                              | Record both; run matching CI/runtime before completion                | Yes for exact-pin completion, not local diagnostic build      |
| Plugin install changes dependency graph unexpectedly                  | Supply-chain drift                                         | Compare lock diff and exact resolved versions                         | Yes                                                           |
| Quartz head and Mermaid support reference cdnjs                       | Remote runtime/preconnect violates the local-bundle policy | Find a supported override or approve an ADR before any core change    | Yes for deployment                                            |
| Missing public `baseUrl` emits `https://undefined/` social metadata   | Broken public previews/canonical metadata                  | Owner confirms workers.dev/custom-domain URL, then set and rebuild    | Yes for deployment                                            |
| Quartz route shape conflicts with Workers HTML handling               | Broken links/redirects/404s                                | HTTP route matrix spike                                               | Yes                                                           |
| Workers needs server code                                             | Topology change                                            | Stop for ADR; do not add `main` opportunistically                     | Yes                                                           |
| Cloudflare auth or domain is unavailable                              | Cannot deploy                                              | Complete local proof, then request owner action                       | Yes for external deployment only                              |

## 18. Adversarial review

Before handoff, answer all root `AGENTS.md` completion questions plus: were unrelated deletions restored, did an upstream workflow remain silently disabled, did private/draft content enter output, did any remote runtime script appear, and was deployment claimed from a dry run.

## 19. Completion evidence

- Essential root build files were restored byte-for-byte from baseline commit `c01f387`; unrelated tracked deletions were left untouched. The pre-recovery lockfile was preserved under `docs/exec-plans/evidence/phase-0/`.
- Wrangler `4.125.0` is an exact development dependency. The post-install lock SHA-256 is `9529e85a6a8a09de0d323225817a7203825c5ecbb7fdfc99b6f8b16d718d5da9`.
- `npm test` passed 163/163 tests in 45/45 suites outside the restricted child-process sandbox.
- `npx quartz build --concurrency=1` passed after the temporary routing fixture was removed: two inputs discovered, the unpublished `content/AGENTS.md` filtered out, one page published, 39 files emitted.
- The temporary fixture build emitted a nested folder index and nested page. Local Wrangler returned: `/` 200; `/phase-0-route` 307 to its slash form; `/phase-0-route/` 200; `/phase-0-route/nested-page` 200; its slash form 307 to the canonical no-slash path; `/static/contentIndex.json` 200; an unknown path 404. Fixture sources were then removed and the final output rebuilt.
- `npx wrangler deploy --dry-run` accepted the final 43-file asset directory without a Worker `main` and reported no bindings.
- `npm run check` passed TypeScript and exposed 12 repository-wide Prettier failures in existing documentation. No unrelated mass-format was performed.
- `npm audit --json` reported high advisory paths through `sharp` and `brace-expansion`, plus a low `esbuild` advisory. No automated or forced upgrade was applied.
- Built output contains no enabled Giscus/comments, graph, or analytics integration. It does contain unresolved `https://undefined/` social metadata and Quartz-owned cdnjs references; both block external deployment.

## 20. Final acceptance checklist

- [x] Essential baseline files reconciled without unrelated restoration.
- [x] Exact version matrix recorded.
- [ ] Deterministic clean-install and exact Node/npm pin evidence recorded.
- [x] Check/test/build results recorded without hiding the formatting failure.
- [x] Public output inspected.
- [x] Workers routing/404 matrix passes locally.
- [x] Wrangler dry-run passes with assets-only config.
- [x] No external deployment, commit, push, DNS, or secret mutation occurred.
- [x] Known limitations and runtime mismatch are explicit.

## 21. Completion log

| Date       | Commit        | Work completed                                                                                                                                                                     | Evidence                                                                                                                              | Remaining                                                                                                              |
| ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 2026-08-22 | Not committed | Repository/hosting audit and current Cloudflare source verification                                                                                                                | Git/status/config/workflow inspection; Context7; npm Wrangler metadata                                                                | Restore, install, build, route proof                                                                                   |
| 2026-08-22 | Not committed | Preserved the pre-recovery empty lockfile; restored essential baseline files; pinned Wrangler `4.125.0`; recorded version/audit matrix                                             | Baseline path verification; lock graph comparison found zero changes to existing package versions; Wrangler version proof; npm audit  | Safe Quartz config, build, routing proof; high advisories block deployment                                             |
| 2026-08-22 | Not committed | First conservative-config build diagnosed a missing required frontmatter transformer                                                                                               | Build found two inputs, filtered both, emitted shell only; installed NoteProperties docs/source prove frontmatter parsing requirement | Rebuild with required parser                                                                                           |
| 2026-08-22 | Not committed | Added the required frontmatter parser, built the public placeholder, proved Workers static routing/404s with temporary nested fixtures, removed fixtures, and rebuilt clean output | 163 tests pass; final Quartz build passes; local route matrix passes; Wrangler dry-run passes                                         | Public URL/baseUrl choice; dependency hardening; remote-CDN decision; exact Node/npm proof; repository formatting debt |

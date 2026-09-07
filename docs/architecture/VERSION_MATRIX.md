# Version Matrix

| Field           | Value                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Status          | Phase 0 recovery matrix; local exact-runtime proof incomplete                                                     |
| Updated         | 2026-08-30                                                                                                        |
| Baseline commit | `c01f387a6a44a24148214059cba04b7f6847784e`                                                                        |
| Package version | Quartz `5.0.0`                                                                                                    |
| Lockfile        | npm lockfile v3; SHA-256 `9529e85a6a8a09de0d323225817a7203825c5ecbb7fdfc99b6f8b16d718d5da9` after adding Wrangler |

This file records the versions used for build and deployment evidence. `package-lock.json` is the executable authority for every JavaScript package not individually listed below.

## Required runtimes and tools

| Component     | Project pin/contract                                                        | Current local evidence                                          | Status                                                          |
| ------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| Quartz source | `5.0.0` at commit `c01f387a6a44a24148214059cba04b7f6847784e`                | Git HEAD and restored `package.json`                            | Pinned                                                          |
| Node.js       | `.node-version` = `v22.16.0`; package engine `>=22`                         | `v24.14.0`                                                      | Compatible diagnostic runtime, not exact-pin proof              |
| npm           | package engine `>=10.9.2`; exact producer not recorded by baseline lockfile | `11.9.0`                                                        | Compatible diagnostic runtime, exact reproducibility unresolved |
| Wrangler      | `4.125.0` exact dev dependency                                              | `npx wrangler --version` = `4.125.0` outside restricted sandbox | Pinned                                                          |
| TypeScript    | `5.9.3` resolved                                                            | `package-lock.json`                                             | Pinned by lock                                                  |
| Prettier      | `3.9.6` resolved                                                            | `package-lock.json`                                             | Pinned by lock                                                  |
| esbuild       | root `0.27.7`; Wrangler/tsx also resolve isolated `0.28.1` copies           | `package-lock.json`, `npm ls`                                   | Audit finding remains on root copy                              |

## Key Quartz plugins

| Package                              | Exact resolved version | Scope                                                                  |
| ------------------------------------ | ---------------------: | ---------------------------------------------------------------------- |
| `@quartz-community/types`            |                `0.3.0` | Shared plugin types                                                    |
| `@quartz-community/content-index`    |                `0.1.0` | Sitemap/RSS/content metadata                                           |
| `@quartz-community/content-page`     |                `0.1.0` | Content pages                                                          |
| `@quartz-community/folder-page`      |                `0.1.0` | Folder/category pages                                                  |
| `@quartz-community/explicit-publish` |                `0.1.0` | Opt-in public publishing                                               |
| `@quartz-community/comments`         |                `0.1.0` | Installed but disabled; optional later community discussion            |
| `@quartz-community/graph`            |                `0.1.0` | Installed but must remain disabled until runtime-CDN issue is resolved |

All other plugin and transitive versions come from the committed lockfile. Version ranges in `package.json` are not evidence of the installed version.

## Local knowledge-graph runtime

The site-owned graph plugin keeps `@quartz-community/graph` disabled and bundles its browser dependencies through esbuild. This preserves the repository's UUID manifest and avoids the official package's floating jsDelivr imports.

| Package        | Exact resolved version | Scope                                      |
| -------------- | ---------------------: | ------------------------------------------ |
| `pixi.js`      |               `8.16.0` | Canvas renderer, display list, hit testing |
| `d3-force`     |                `3.0.0` | Force simulation                           |
| `d3-selection` |                `3.0.0` | Canvas selection adapter                   |
| `d3-zoom`      |                `3.0.0` | Pan and zoom behavior                      |

PixiJS API and lifecycle behavior were verified on 2026-08-30 through Context7 source `/pixijs/pixijs/v8.16.0`. Quartz graph behavior was verified through `/jackyzha0/quartz`, the pinned Quartz v5 graph documentation, and installed `@quartz-community/graph@0.1.0` source.

## Local bank-backed quiz runtime

`plugins/knowledge-quiz` version `0.1.0` is a site-owned Quartz transformer/page-type plugin. It uses installed `yaml@2.8.2`, Quartz per-file `vfile.data`, render-time `treeTransforms`, and locally bundled browser code; it adds no remote runtime dependency. Quartz plugin metadata, `allFiles`, and `nav`/`render` lifecycle behavior were verified on 2026-08-30 through Context7 source `/jackyzha0/quartz` and the pinned installed files `quartz/plugins/types.ts`, `quartz/plugins/pageTypes/dispatcher.ts`, `quartz/components/renderPage.tsx`, and `quartz/util/trace.ts`.

## Cloudflare Workers Static Assets

| Setting            | Phase 0 decision                                                                    |
| ------------------ | ----------------------------------------------------------------------------------- |
| Deployment tool    | Wrangler `4.125.0`                                                                  |
| Topology           | Assets-only Worker; no `main` script unless a later spike/ADR proves it necessary   |
| Asset directory    | `./public`                                                                          |
| Compatibility date | `2026-08-22`; accepted by Wrangler `4.125.0` dry-run                                |
| Not-found behavior | `404-page`; must prove an actual HTTP 404 response                                  |
| HTML handling      | `auto-trailing-slash`; verified through the local Workers route matrix              |
| Preview URLs       | Enabled for later preview deployment; preview and production names remain separate  |
| Secrets            | None for local build/dry-run; deployment secrets require later owner-approved setup |

Official sources verified 2026-08-22 through Context7 library `/websites/developers_cloudflare_workers`:

- `https://developers.cloudflare.com/workers/best-practices/workers-best-practices`
- `https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation`
- `https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/`
- `https://developers.cloudflare.com/workers/wrangler/commands/workers`

Pinned local Quartz sources:

- `docs/cli/build.md`
- `docs/hosting.md`
- `quartz/bootstrap-cli.mjs`
- `quartz/plugins/loader/config-loader.ts`

## Supply-chain audit status

`npm audit --json` on 2026-08-22 reported three unresolved advisories:

| Package                              | Severity | Current path/scope                                                 | Disposition                                                               |
| ------------------------------------ | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `sharp@0.34.5`                       | High     | Direct Quartz production dependency and favicon/OG-image plugins   | Blocks public deployment; fixed release requires a reviewed major upgrade |
| `brace-expansion@1.1.16` and `5.0.8` | High     | Transitive through `serve-handler`/`minimatch`                     | Blocks public deployment until dependency graph is updated and tests pass |
| `esbuild@0.27.7`                     | Low      | Direct build dependency; Wrangler/tsx have isolated fixed `0.28.1` | Record and resolve in a separate dependency-hardening slice               |

Do not run `npm audit fix` or `--force`. Dependency upgrades must be explicit, source-reviewed, lockfile-audited, and tested separately from product feature work. Local diagnostic builds may continue with owner-authored fixture content, but no external deployment is considered safe while high-severity findings remain.

## Required commands

Phase 0 used these commands:

```text
npm run check
npm test
npx quartz build --concurrency=1
npx wrangler deploy --dry-run
```

`npm test` passed all 163 tests across 45 suites outside the restricted process sandbox. The real Quartz build reported 39 emitted files from the single published placeholder page, and Wrangler read 43 files from the final asset directory in the assets-only dry-run. The temporary routing fixture separately proved `/`, extensionless nested pages, canonical trailing-slash redirects, `static/contentIndex.json`, and an actual HTTP 404 response.

`npm run check` passed TypeScript but failed the repository-wide Prettier gate on 12 pre-existing/unrelated documentation files. The files changed in this slice have their own targeted Prettier check. Replace `npm install` with deterministic clean-install evidence once Node/npm pinning and plugin installation behavior are reconciled. Do not claim clean-clone reproducibility before that proof exists.

## Output-readiness findings

- `configuration.baseUrl` is intentionally unset pending the owner's public URL choice. Generated Open Graph URLs currently contain `https://undefined/` and block deployment.
- `quartz/components/Head.tsx` hard-codes a `cdnjs.cloudflare.com` preconnect, and the Obsidian-flavored Markdown Mermaid client can dynamically import Mermaid from cdnjs when a Mermaid block is present. The baseline site reads without that import, but the remote-runtime policy is not yet satisfied. Do not patch Quartz core without an approved ADR or supported override.
- Giscus/comments, graph, analytics, RSS, and sitemap remain disabled. Public article reading does not depend on a Worker script or private runtime service.

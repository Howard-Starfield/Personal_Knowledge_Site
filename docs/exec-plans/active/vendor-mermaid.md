# Execution Plan: Phase X — Vendor Mermaid so the site loads no npm CDN

| Field           | Value                                                         |
| --------------- | ------------------------------------------------------------- |
| Status          | In progress                                                   |
| Owner           | Site maintainer (agent)                                       |
| Created         | 2026-10-25                                                    |
| Updated         | 2026-10-25                                                    |
| Baseline commit | `f8a6915` (merge of PR #38)                                   |
| Target branch   | `feat/vendor-mermaid`                                         |
| PR              | _filled after the pull request is opened_                     |
| PRD phase       | Public-learning baseline; the site's runtime must stand alone |
| Related ADRs    | ADR-0006 (Accepted) — extended to cover Mermaid               |

## 1. Objective

Two lessons draw a Mermaid diagram, and the browser fetches the Mermaid runtime from
`cdnjs.cloudflare.com` to draw it. Every reader of those two pages depends on a
third-party host being reachable, and a third-party host serving the site's code.

Observable outcome: a page with a diagram loads Mermaid from this site's own origin,
and no page in the build references a CDN for its runtime.

## 2. Non-goals

- No change to the diagrams themselves, to the lessons that carry them, or to any other
  page.
- No change to the plugin's behaviour beyond where the runtime comes from.
- No new framework, dependency, or runtime JavaScript written by hand.

## 3. Acceptance gates

- [ ] G1 — the built site contains no reference to `cdnjs.cloudflare.com`.
- [ ] G2 — the two lessons still render their diagrams, from the local copy.
- [ ] G3 — the vendored copy is complete: every module the entry file can reach,
      statically or on demand, is in the repository.
- [ ] G4 — a build-time check fails if a CDN runtime ever comes back.
- [ ] G5 — the required checks pass, and the live pages draw their diagrams.

## 4. Instruction sources

| Scope/path | Instruction file                                   | Relevant rules                                                 |
| ---------- | -------------------------------------------------- | -------------------------------------------------------------- |
| Repository | `AGENTS.md`                                        | Plan-before-code; PR boundary; strict TypeScript; ADR triggers |
| Decision   | `docs/decisions/ADR-0006-remote-runtime-policy.md` | No npm CDN at runtime; vendor instead of loading remotely      |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Mermaid   | `11.4.0`      | the plugin's script | Vendored   |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |

## 6. Official source verification

| Claim/assumption                                                       | Official URL          | Verified date | Installed source file/symbol                                     | Finding                                                                                                                                                                   |
| ---------------------------------------------------------------------- | --------------------- | ------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The Mermaid runtime is loaded from cdnjs                               | the live site         | 2026-10-25    | `public/static/resource-after-5eb75950.js`                       | The client script does `import("https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs")`. It is the only remote runtime reference in the whole build. |
| The URL is a constant inside the Obsidian plugin's inline script       | the installed package | 2026-10-25    | `@quartz-community/obsidian-flavored-markdown` (`dist/index.js`) | The plugin's `externalResources()` returns the client script as an inline string, so the URL can be rewritten without touching the package.                               |
| The plugin offers a `mermaid` option, so the feature can be turned off | the installed package | 2026-10-25    | `ObsidianFlavoredMarkdownOptions`                                | `mermaid: boolean`. Turning it off would drop the diagrams, which is not what the owner asked for.                                                                        |
| The runtime is an ES module with lazily imported diagram types         | the CDN package       | 2026-10-25    | `mermaid.esm.min.mjs`                                            | The entry statically imports 10 chunks and dynamically imports 21 diagram types plus a KaTeX renderer. Vendoring only the loaded set would break any other diagram type.  |
| The Mermaid stylesheet has no remote asset                             | the built page        | 2026-10-25    | `public/static/resource-style-6bd36952.css`                      | Every `url()` in the Mermaid CSS is a `data:` URI; there is no font or image to vendor.                                                                                   |

## 7. Repository reconnaissance

### What the site loads today

Opening the live lesson that carries a timeline diagram and recording every request:

```text
cdnjs requests: 24 (24 unique)
total uncompressed: 0.64 MiB
```

Those 24 files are the entry module plus the chunks the two diagrams happened to need.

### Relevant code map

| Area              | File/symbol                                                          | Current responsibility                   | Expected change                      |
| ----------------- | -------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------ |
| The runtime URL   | `@quartz-community/obsidian-flavored-markdown` (`externalResources`) | Ships the client script with the CDN URL | Wrapped, URL rewritten               |
| The wrapper       | `plugins/local-latex/index.ts`                                       | The house pattern for this               | Copied for Mermaid                   |
| The vendored copy | `quartz/static/katex/`                                               | KaTeX, vendored under ADR-0006           | A sibling `quartz/static/mermaid/`   |
| The check         | `scripts/validate-graph-output.mjs`                                  | Fails the build on a CDN runtime         | `cdnjs.cloudflare.com` added         |
| The decision      | `docs/decisions/ADR-0006-remote-runtime-policy.md`                   | Records the policy                       | Mermaid moved from open item to done |

### Existing tests and fixtures

- `npm test`, `npm run validate:content`, `npm run validate:graph`,
  `npx prettier . --check`, `npx tsc --noEmit`, `npx quartz build`,
  `npx wrangler deploy --dry-run`.

## 8. Contracts and invariants

### Content identity

- [x] No content file changes at all.

### Runtime

- [x] No page loads a script, style, or module from a third-party host.
- [x] The diagrams still render.

### Type safety

- [x] Strict TypeScript; no `any`, no `as any`, no non-null assertion.

## 9. Proposed design

The house pattern from ADR-0006 and `plugins/local-latex`: wrap the upstream plugin,
reuse its behaviour unchanged, and change only where the asset comes from.

`plugins/local-obsidian/` wraps `@quartz-community/obsidian-flavored-markdown`. It calls
the upstream factory with the same options, spreads the upstream instance, and rewrites
the one CDN URL inside the inline client script to `/static/mermaid/mermaid.esm.min.mjs`.

The vendored copy lives at `quartz/static/mermaid/`:

- `mermaid.esm.min.mjs` — the entry module;
- `chunks/mermaid.esm.min/` — every chunk reachable from it, statically or on demand,
  so a diagram of any type will draw;
- `CHECKSUMS.txt` — the SHA-256 of each file, as `quartz/static/katex/` does;
- `LICENSE` — the upstream MIT licence.

The entry module imports its chunks with paths relative to itself, so the directory
structure is preserved exactly and the relative imports resolve unchanged.

The relative import graph was walked after downloading: 64 files, 411 relative imports,
none unresolved, and no bare specifier.

ADR-0006 is extended: Mermaid moves from "the remaining item" to "vendored".

Finally the check that would have caught this is strengthened:
`scripts/validate-graph-output.mjs` already fails the build when a page references
`cdn.jsdelivr.net` or `unpkg.com`; `cdnjs.cloudflare.com` joins them, so a CDN
runtime cannot come back unnoticed.

### Alternatives considered

| Alternative                                 | Benefit                        | Problem                                                                                   | Decision   |
| ------------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------- | ---------- |
| Turn the plugin's `mermaid` option off      | One line                       | The two diagrams stop drawing; the owner asked for the dependency to go, not the diagrams | Rejected   |
| Replace the two diagrams with static images | No runtime at all              | Loses a live, text-authored diagram; the owner approved vendoring the runtime             | Rejected   |
| Patch the upstream package                  | Direct                         | Editing a dependency in `node_modules` is not reproducible                                | Rejected   |
| Wrap the plugin and vendor the runtime      | Same behaviour, no remote host | 2.4 MiB in the repository                                                                 | **Chosen** |

ADR status: ADR-0006 already records the policy; this change extends it rather than
replacing it, so no new ADR is needed.

## 10. Data and schema changes

None.

## 11. File touch plan

| Order | File/path                                          | Change                                       | Reason                    | Risk |
| ----: | -------------------------------------------------- | -------------------------------------------- | ------------------------- | ---- |
|     1 | `docs/exec-plans/active/vendor-mermaid.md`         | This plan                                    | `AGENTS.md` requires one  | None |
|     2 | `quartz/static/mermaid/` (65 files)                | The vendored runtime                         | ADR-0006                  | Low  |
|     3 | `plugins/local-obsidian/index.ts`                  | The wrapper that rewrites the URL            | House pattern             | Low  |
|     4 | `plugins/local-obsidian/package.json`              | The plugin manifest                          | Registration              | Low  |
|     5 | `plugins/local-obsidian/src/url.test.ts`           | A unit test for the rewrite                  | Gates                     | Low  |
|     6 | `quartz.config.yaml`                               | Point at the wrapper instead of the upstream | Wiring                    | Low  |
|     7 | `.prettierignore`                                  | Exclude the vendored copy                    | Byte-identical files      | None |
|     8 | `scripts/validate-graph-output.mjs`                | Add the CDN signature to the forbidden list  | The guard that catches it | Low  |
|     9 | `docs/decisions/ADR-0006-remote-runtime-policy.md` | Record that Mermaid is vendored              | ADR upkeep                | Low  |

## 12. Incremental implementation steps

### Step 1 — The vendored copy

- Change: `quartz/static/mermaid/`.
- Verification: the import graph check; the checksums.
- Evidence: §19.
- Rollback point: delete the directory.

### Step 2 — The wrapper

- Change: `plugins/local-obsidian/`, `quartz.config.yaml`.
- Verification: the unit test; the build.
- Evidence: §19.
- Rollback point: point the config back at the upstream plugin.

### Step 3 — The guard and the ADR

- Change: `scripts/validate-graph-output.mjs`, ADR-0006, `.prettierignore`.
- Verification: `npm run validate:graph`; the build fails when a CDN URL is present.
- Evidence: §19.
- Rollback point: revert those three files.

### Step 4 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior                     | Command                  | Expected result          |
| ---------------------------- | ------------------------ | ------------------------ |
| The wrapper rewrites the URL | `npm test`               | The new suite passes     |
| The build carries no CDN     | `npm run validate:graph` | The build fails on a CDN |
| The whole suite              | `npm test`               | All pass                 |
| Formatting                   | `npx prettier . --check` | Clean                    |
| Types                        | `npx tsc --noEmit`       | Clean                    |
| The site builds              | `npx quartz build`       | Exit 0                   |

### End-to-end/UI

| Flow                             | Viewport | Evidence                                            |
| -------------------------------- | -------- | --------------------------------------------------- |
| The diagram draws, from the site | 1440x900 | An SVG inside the code block; no request to any CDN |
| The other diagram draws too      | 1440x900 | An SVG inside the code block                        |
| The local modules are served     | 1440x900 | 200 for the entry and for the chunks                |

### Accessibility

Nothing about the diagram changes; the same markup is produced, only from a different
origin.

### Security

The vendored files are the upstream files, byte for byte, and `CHECKSUMS.txt` records
their hashes. The build fails if a page references a CDN runtime.

### Performance

The reader now fetches the same modules from the site's own origin, so the total
transferred is unchanged and one third-party connection is removed. The repository
grows by 2.4 MiB.

## 14. Migration and compatibility

- No data migration. No content change. No URL change.
- The pages that carry a diagram keep their URLs.
- Deployment order: merge → Vercel build → smoke test.

## 15. Deployment plan

- Preview: the local build served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live lesson draws its diagram, and the network panel shows no CDN.
- Production approval: the owner approved this work on 2026-10-25.

## 16. Rollback and recovery

Revert the merge commit; the upstream plugin is used again and the site goes back to
loading Mermaid from cdnjs.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                         | Impact                                             | How it is resolved                                                          | Stop condition? |
| ---------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- | --------------- |
| A chunk is missing, so some diagram type cannot draw | A future diagram fails to render                   | The whole reachable closure was downloaded, and the import graph is checked | No              |
| The vendored copy drifts from upstream               | A reader sees an old Mermaid                       | `CHECKSUMS.txt` records every file's hash                                   | No              |
| The rewrite misses a second CDN reference            | The site still depends on a CDN                    | The build fails if any CDN reference appears in the output                  | No              |
| The wrapper changes the plugin's behaviour           | The wiki-links, callouts, or checkbox stop working | The wrapper spreads the upstream instance and changes only the URL          | No              |

## 18. Adversarial review

1. Could this reintroduce a remote dependency? **No** — the build fails if a CDN URL
   appears in the output.
2. Could vendoring a third-party bundle into a public repository be a licence problem?
   **No** — Mermaid is MIT, and its licence is vendored next to the files.
3. Could the vendored files be tampered with? **No** — they are copied byte for byte
   from the upstream package and their hashes are recorded.
4. Could a future Mermaid release break the site? **No** — the site does not fetch
   Mermaid at runtime; the copy in the repository is the one that runs.
5. Could the wrapper break the plugin's other features? **No** — the wrapper reuses the
   upstream instance and changes one string.
6. Is the size acceptable? **Yes** — 2.4 MiB in the repository, against 1 MiB for
   KaTeX and 11.53 MB for the content index the site already emits.
7. Does the change touch any content? **No.**
8. Does it change the site's graph or its contracts? **No.**

## 19. Completion evidence

### 19.1 Commands and results

```text
npx quartz build --concurrency=1
  Found 359 input files from `content`
  Parsed 359 Markdown files in 32s
  Emitted 1079 files to `public` in 8s      (1013 before, +66 for the vendored copy)

npm run validate:content
  Content validation passed: 358 entities, 358 unique IDs

npm run validate:graph
  Graph output valid: 358 pages, 394 tags, 1897 relationships, 774 graph-enabled HTML pages.

npm test
  tests 268  pass 268  fail 0        (264 before this change, 4 added)

npx tsc --noEmit
  (no output)

npx prettier --check <the changed files>
  All matched files use Prettier code style!

npx wrangler deploy --dry-run
  Read 1129 files from the assets directory public
  --dry-run: exiting now.
```

The build carries no CDN reference at all:

```text
cdnjs.cloudflare.com anywhere in public/**/*.{html,js,css}: 0
the client script imports: /static/mermaid/mermaid.esm.min.js
vendored files copied to public/static/mermaid: 66
```

### 19.2 Generated artifacts inspected

The vendored copy was checked as a graph before it was used:

```text
files: 64, relative imports: 411
unresolved: none
bare specifiers: none
```

Every module the entry can reach — statically, or on demand for a diagram type
the site has not drawn yet — is in the repository, so a future diagram of any type
will still draw. `CHECKSUMS.txt` records the SHA-256 of every file.

### 19.3 UI evidence

Driven with Playwright against the local build on `http://127.0.0.1:8099`:

```text
/courses/advanced-prompt-engineering-techniques/lessons/02-chain-of-thought-and-step-by-step
  mermaid blocks: {'blocks': 4, 'processed': 4, 'svgs': 4}
  remote requests: 0 []
  local mermaid requests: 24
  first local: http://127.0.0.1:8099/static/mermaid/mermaid.esm.min.js

/courses/agentic-ai-build-your-first-agentic-ai-system/lessons/00-introduction-and-autonomy-levels
  mermaid blocks: {'blocks': 3, 'processed': 3, 'svgs': 3}
  remote requests: 0 []
  local mermaid requests: 23
  first local: http://127.0.0.1:8099/static/mermaid/mermaid.esm.min.js
```

The diagrams draw, every diagram is processed, and the module count is exactly what
the CDN version fetched. Screenshot: `scratch/cc-scope/mermaid-local-diagram.png`.

### 19.4 Deviations from plan

1. **The modules are named `.js`, not `.mjs`.** The first build served the vendored
   copy with the extension upstream uses, and the browser refused to execute it: the
   preview server answers `text/plain` for `.mjs`, and a module script must be
   served with a JavaScript MIME type. Rather than depend on a server's extension
   mapping — which differs between the preview server and the CDN — the modules were
   renamed and their import specifiers rewritten. The rewrite is the only change
   from the upstream bytes, and it is recorded in `CHECKSUMS.txt` and in ADR-0006.
2. **The whole reachable closure was vendored, not only the 24 files the two
   diagrams happened to load.** The entry module imports 21 diagram types on demand
   and a KaTeX renderer; vendoring only the loaded set would have broken any other
   diagram type. The complete closure is 64 modules, 2.4 MiB.
3. **The gate now covers all three CDNs.** `scripts/validate-graph-output.mjs`
   already banned `cdn.jsdelivr.net` and `unpkg.com`; `cdnjs.cloudflare.com` joins
   them, so the build fails if any runtime comes back from a CDN.

## 20. Final acceptance checklist

- [ ] Objective achieved.
- [ ] Non-goals not implemented accidentally.
- [ ] All acceptance gates pass.
- [ ] Contracts/docs updated.
- [ ] Tests/evidence attached.
- [ ] Security/privacy review complete.
- [ ] Migration/rollback documented.
- [ ] Known limitations documented.
- [ ] Plan completion log updated.

## 21. Completion log

| Date       | Commit | Work completed                                                                                                                                                                     | Evidence | Remaining |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| 2026-10-25 | —      | The Mermaid runtime vendored at `quartz/static/mermaid/` (64 modules, 2.4 MiB), the `plugins/local-obsidian` wrapper, the config line, the CDN gate, the ADR update, and this plan | §19      | —         |

# Execution Plan: Phase X — Vendor KaTeX, so the site has no npm-CDN runtime

| Field           | Value                                                          |
| --------------- | -------------------------------------------------------------- |
| Status          | Complete                                                       |
| Owner           | Site maintainer (agent)                                        |
| Created         | 2026-10-24                                                     |
| Updated         | 2026-10-24                                                     |
| Baseline commit | `6ad77093b8d9e262dbad99c791e77cbda72aa0c9`                     |
| Target branch   | `fix/vendor-katex`                                             |
| PR              | _filled after the pull request is opened_                      |
| PRD phase       | Public-learning baseline; the local-bundle policy              |
| Related ADRs    | ADR-0006 (the remote-runtime policy) — **accepted 2026-10-24** |

## 1. Objective

No page of the published site may pull a script or a stylesheet from an npm
CDN.

Observable outcome: the built HTML references KaTeX from
`/static/katex/katex.min.css` and `/static/katex/copy-tex.min.js`, both
served by the site itself, and the build fails if a jsdelivr or unpkg URL
reappears anywhere in the output.

## 2. Non-goals

- No change to how mathematics renders, to the content, or to the LaTeX
  transform itself.
- No change to the Obsidian-flavoured markdown plugin.
- No vendoring of Mermaid in this slice (see §17).

## 3. Acceptance gates

- [ ] G1 — no built page references `cdn.jsdelivr.net` or `unpkg.com`.
- [ ] G2 — the vendored stylesheet, script and fonts are served by the site.
- [ ] G3 — a maths page still renders its formulas.
- [ ] G4 — the required checks pass, and the runtime gate fails if the CDN
      comes back.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                 |
| ----------- | ------------------- | -------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; ADR for Quartz-core changes; required checks |
| Nested path | `content/AGENTS.md` | Not touched in this slice                                      |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes                       |
| --------- | ------------- | ------------------- | --------------------------- |
| KaTeX     | `0.16.11`     | the npm tarball     | The version the plugin pins |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged                   |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI                  |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate                        |

## 6. Official source verification

| Claim/assumption                                                | Official URL                        | Verified date | Installed source file/symbol       | Finding                                                                                                                                                                    |
| --------------------------------------------------------------- | ----------------------------------- | ------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The maths plugin links KaTeX from jsdelivr                      | `@quartz-community/latex`           | 2026-10-24    | `dist/index.js` around line 233914 | `css: [{ content: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" }]` and `src: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js"` |
| The plugin exposes no option for those URLs                     | `@quartz-community/latex`           | 2026-10-24    | `dist/index.d.ts` → `LatexOptions` | The options are `renderEngine`, `customMacros` and the engine options only                                                                                                 |
| The cdnjs preconnect is in this repository's own Head component | `quartz/components/Head.tsx:60`     | 2026-10-24    | the file                           | `<link rel="preconnect" href="https://cdnjs.cloudflare.com" …>`                                                                                                            |
| A runtime gate already exists and can be extended               | `scripts/validate-graph-output.mjs` | 2026-10-24    | `forbiddenRuntimeSignatures`       | It already banned `cdn.jsdelivr.net/npm/d3` and `unpkg.com/npm/pixi` for the graph plugin                                                                                  |
| KaTeX's stylesheet references its fonts relatively              | the npm package                     | 2026-10-24    | `dist/katex.min.css`               | `url(fonts/KaTeX_AMS-Regular.woff2)` — so the fonts must sit beside the stylesheet                                                                                         |

## 7. Repository reconnaissance

### What was actually remote

```text
$ (every external URL in the built index.html, before this change)
https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js
https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css
https://cdnjs.cloudflare.com
```

Three references, on every page: the KaTeX stylesheet, the KaTeX copy-tex
script, and a `preconnect` hint to cdnjs that nothing used.

### The parts

| Part              | Size    | Note                                           |
| ----------------- | ------- | ---------------------------------------------- |
| `katex.min.css`   | 23 KB   | References 60 font files relatively            |
| `copy-tex.min.js` | 1.7 KB  | The "copy the LaTeX" button                    |
| 60 font files     | 1.03 MB | 20 families × woff2, woff and ttf, as upstream |
| `LICENSE`         | 1.1 KB  | MIT, travels with the files                    |
| `CHECKSUMS.txt`   | 6.1 KB  | SHA-256 of every vendored file                 |

### Relevant code map

| Area            | File/symbol                         | Current responsibility              | Expected change                               |
| --------------- | ----------------------------------- | ----------------------------------- | --------------------------------------------- |
| Plugin          | `plugins/local-latex/index.ts`      | —                                   | Wraps the maths plugin, swaps the URLs        |
| Registration    | `quartz.config.yaml`                | `@quartz-community/latex`           | `./plugins/local-latex`                       |
| Vendored assets | `quartz/static/katex/`              | —                                   | Stylesheet, script, fonts, licence, checksums |
| Head            | `quartz/components/Head.tsx:60`     | A preconnect to a host nothing used | The line is removed                           |
| Gate            | `scripts/validate-graph-output.mjs` | `forbiddenRuntimeSignatures`        | Gains `cdn.jsdelivr.net` and `unpkg.com`      |

### Existing tests and fixtures

- `scripts/validate-graph-output.mjs` — the runtime gate, extended here.
- `npm test`, `npx tsc --noEmit`, `npx prettier . --check` — the usual gates.

## 8. Contracts and invariants

### Content identity

- [x] No content file changed.

### Graph

- [x] The generated navigation and the graph itself are unchanged.

### Security/data

- [x] The vendored files are upstream KaTeX at a pinned version, with
      checksums and their MIT licence in the repository.

## 9. Proposed design

A site-owned plugin, `./plugins/local-latex`, wraps `@quartz-community/latex`:
it reuses the upstream transform unchanged and swaps the two jsdelivr URLs
for the vendored copies. The package is not forked, and the plugin is
registered in `quartz.config.yaml` in place of the package plugin.

The `cdnjs` preconnect is removed from this repository's own `Head.tsx`, and
the runtime gate is widened to the npm CDNs.

### Alternatives considered

| Alternative                              | Benefit                    | Problem                                                                   | Decision   |
| ---------------------------------------- | -------------------------- | ------------------------------------------------------------------------- | ---------- |
| Fork the maths plugin                    | Full control               | A fork to track upstream; `AGENTS.md` prefers an override                 | Rejected   |
| A post-build rewrite of the emitted HTML | No wrapper                 | Fragile: it depends on the URLs and on hashed file names                  | Rejected   |
| Accept the CDN                           | No change                  | The owner chose otherwise; it also contradicts the graph-plugin precedent | Rejected   |
| Wrap the plugin and swap its resources   | Small, composable, no fork | —                                                                         | **Chosen** |

ADR status: **ADR-0006 is the ADR.** It is moved from "Proposed" to
"Accepted" with the owner's decision of 2026-10-24 recorded, and its
implementation list updated to what was actually built.

## 10. Data and schema changes

None.

## 11. File touch plan

| Order | File/path                                          | Change                                       | Reason                                | Risk |
| ----: | -------------------------------------------------- | -------------------------------------------- | ------------------------------------- | ---- |
|     1 | `quartz/static/katex/` (63 files)                  | Vendored KaTeX assets, licence and checksums | The maths must be served locally      | Low  |
|     2 | `plugins/local-latex/index.ts`, `package.json`     | The wrapper plugin                           | Swap the URLs without forking         | Low  |
|     3 | `quartz.config.yaml`                               | Register the wrapper in place of the package | The site now loads local KaTeX        | Low  |
|     4 | `quartz/components/Head.tsx`                       | Remove the cdnjs preconnect                  | Nothing used that host                | Low  |
|     5 | `scripts/validate-graph-output.mjs`                | Widen the runtime gate                       | Make the policy machine-enforced      | Low  |
|     6 | `docs/decisions/ADR-0006-remote-runtime-policy.md` | Accepted, with the implementation as built   | The ADR is the record of the decision | Low  |
|     7 | `docs/exec-plans/active/vendor-katex.md`           | This plan                                    | `AGENTS.md` requires one              | None |

## 12. Incremental implementation steps

### Step 1 — Vendor the assets

- Change: extract the stylesheet, the script, the fonts and the licence from
  the pinned npm tarball; record the checksums.
- Verification: the checksum file matches the files.
- Evidence: §19.
- Rollback point: remove the directory.

### Step 2 — Swap the URLs

- Change: the wrapper plugin, the registration, the preconnect, the gate.
- Verification: the built HTML has no npm-CDN reference.
- Evidence: §19.
- Rollback point: revert the four files.

### Step 3 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior              | Command                         | Expected result                  |
| --------------------- | ------------------------------- | -------------------------------- |
| Types                 | `npx tsc --noEmit`              | Clean                            |
| Formatting            | `npx prettier . --check`        | Clean                            |
| The unit suite passes | `npm test`                      | All pass                         |
| The runtime gate      | `npm run validate:graph`        | Valid, and it fails on a CDN URL |
| The site builds       | `npx quartz build`              | Exit 0                           |
| The Worker dry run    | `npx wrangler deploy --dry-run` | Exit 0                           |

### End-to-end/UI

| Flow                       | Viewport | Evidence                                                   |
| -------------------------- | -------- | ---------------------------------------------------------- |
| A maths page renders       | 390x844  | The formula is typeset, not raw LaTeX                      |
| The stylesheet resolves    | 390x844  | `/static/katex/katex.min.css` returns 200                  |
| The fonts resolve          | 390x844  | `/static/katex/fonts/KaTeX_Main-Regular.woff2` returns 200 |
| No page reaches an npm CDN | —        | The built HTML has no jsdelivr or unpkg reference          |

### Accessibility

No change; the maths renders as it did.

### Security

Not applicable — no new script; the vendored script is upstream KaTeX at a
pinned version with a recorded checksum.

### Performance

The maths stylesheet and its fonts are now same-origin: one fewer cross-origin
request chain, and the site no longer depends on a CDN's availability.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: no content changed.
- Backward-compatible window: the maths looks identical; only the source of
  the assets changes.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: none, except that maths keeps working when a CDN is
  unreachable.

## 15. Deployment plan

- Preview: the local build in `public/`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: a maths page on the live site.
- Production approval: the owner chose "vendor KaTeX into the repo" on
  2026-10-24.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds and the site goes back to the CDN.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                      | Impact                                  | How it is resolved                                                                                                                                                                                              | Stop condition? |
| ------------------------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Mermaid still imports from cdnjs                  | Two pages keep a third-party runtime    | The URL is a constant inside the Obsidian-markdown package, which also provides the wiki-links and callouts the site needs; vendoring Mermaid means its whole chunk tree and is a separate slice (§6, ADR-0006) | No — reported   |
| The vendored fonts bloat the repository           | 1.05 MB of binary assets                | Upstream KaTeX ships exactly these files; shipping them unmodified keeps the stylesheet byte-identical to upstream                                                                                              | No              |
| The maths plugin is upgraded and changes its URLs | The maths silently goes back to the CDN | The runtime gate fails the build instead                                                                                                                                                                        | Yes             |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — no navigation
   changed.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no content file moved.
3. Could unpublished content become public? **No** — nothing was published.
4. Could one principal access another's data? **No.**
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No.**
7. Does optional feature failure break article reading? **No** — the maths
   still renders, from the same origin.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — unchanged.

## 19. Completion evidence

### 19.1 Commands and results

```text
npx tsc --noEmit                  clean
npm test                          tests 252 | pass 252 | fail 0
npm run validate:content          358 entities, 358 unique IDs
npm run validate:graph            358 pages, 394 tags, 1897 relationships
npx quartz build --concurrency=1  exit 0, no "✗" plugin-load lines
npx wrangler deploy --dry-run     exit 0
```

The first CI run failed on Prettier, which wanted to reformat the vendored
minified files; `quartz/static/katex/` is now in `.prettierignore`, because
those files are byte-identical to upstream and their checksums are recorded.

### 19.2 Generated artifacts inspected

- The built maths page references `/static/katex/katex.min.css` and
  `/static/katex/copy-tex.min.js`, and nothing else.
- The built site has no `cdn.jsdelivr.net` or `unpkg.com` reference.

### 19.3 UI evidence

Against the deployed site:

```text
katex.min.css -> 200 23335 bytes
/static/katex/copy-tex.min.js -> 200 (1673 bytes)
/static/katex/fonts/KaTeX_Main-Regular.woff2 -> 200 (26272 bytes)

CDN references on the maths page: none
local katex references: ['/static/katex/copy-tex.min.js', '/static/katex/katex.min.css']

the homepage's external URLs:
['http://www.w3.org/2000/svg', 'https://blog.howardlab.dev/index',
 'https://blog.howardlab.dev/static/og-image.png',
 'https://github.com/Howard-Starfield/Personal_Knowledge_Site',
 'https://quartz.jzhao.xyz/']
```

Only the site's own URLs, the SVG namespace, the GitHub footer link and the
Quartz credit remain. No third-party runtime is loaded.

### 19.4 Deviations from plan

1. The ADR's original step 3 asked the runtime gate to ban
   `cdnjs.cloudflare.com` as well. It cannot: Mermaid is imported from there
   by `@quartz-community/obsidian-flavored-markdown`, and vendoring Mermaid
   means shipping its whole chunk tree. The gate therefore bans the npm CDNs,
   and the Mermaid runtime is recorded as the remaining item in ADR-0006 §6 and
   §17 of this plan.

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

| Date       | Commit                                               | Work completed                                                                                    | Evidence                                                                         | Remaining                                                                |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 2026-10-24 | `dfa50b1` + `90592b7` → merged as `ec93c09` (PR #31) | KaTeX vendored, the CDN URLs swapped, the preconnect removed, the gate widened, ADR-0006 accepted | §19 (no npm CDN reference in the built site, the assets serve 200 from the site) | Mermaid still imports from cdnjs on the two lessons that carry a diagram |

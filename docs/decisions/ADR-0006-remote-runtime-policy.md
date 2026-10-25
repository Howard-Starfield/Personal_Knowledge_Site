# ADR-0006: The remote-runtime policy for third-party CDN assets

| Field    | Value                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------- |
| Status   | Accepted — 2026-10-24                                                                                   |
| Date     | 2026-10-23                                                                                              |
| Deciders | Product owner                                                                                           |
| Related  | ADR-0005, `docs/architecture/HOSTING_TARGETS.md`, `docs/exec-plans/active/phase-0-online-foundation.md` |

## Context

Every page the site builds loads two assets from a third-party CDN:

- `https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css` — 23,335 bytes
- `https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js` — 1,673 bytes

and every page carries `<link rel="preconnect" href="https://cdnjs.cloudflare.com">`.

A local build of the current content puts those two URLs in **770 of 770** built
HTML files.

**Where they come from.** The KaTeX URLs are hard-coded in the npm package
`@quartz-community/latex` (`dist/index.js`, around line 233914). The plugin is
loaded by `quartz.config.yaml`, which lists it with `renderEngine: katex`. The
`cdnjs` preconnect is in Quartz core, `quartz/components/Head.tsx:60`.

**Why it cannot simply be dropped.** The content genuinely uses mathematics:
**211 files** contain `$$…$$` display maths or `\frac`, across the accounting
and account-management courses. Removing the plugin would break them.

**The policy already exists, narrowly.** `scripts/validate-graph-output.mjs`
carries a `forbiddenRuntimeSignatures` list that fails the build if the output
contains `cdn.jsdelivr.net/npm/d3`, `cdn.jsdelivr.net/npm/pixi`,
`unpkg.com/d3` or `unpkg.com/pixi`. Those are the URLs the community **graph**
plugin injects — and the established response to that plugin was to leave it
disabled, as recorded in `docs/exec-plans/completed/phase-5-local-and-global-graph.md`:
_"Installed community graph is not locally bundled … The installed community graph
injects `cdn.jsdelivr.net` D3 and Pixi URLs and remains disabled."_

So the repository has a position: **a community plugin that pulls code from a
CDN at page-view time is not acceptable, and the graph plugin was disabled for
exactly that reason.** The LaTeX plugin is in the same category and has not had
the same treatment. `docs/exec-plans/active/phase-0-online-foundation.md` lists
this as a deployment stop condition: _"Quartz head and Mermaid support reference
cdnjs | Remote runtime/preconnect violates the local-bundle policy | Find a
supported override or approve an ADR before any core change | Yes for
deployment."_

## Options

### A. Vendor KaTeX and rewrite the two URLs at build time — **recommended**

Copy the two files into the repository (`public/static/katex/`), and add a build
step that rewrites the two jsdelivr URLs and removes the cdnjs preconnect from
the emitted HTML.

- **Pros.** The site becomes self-contained: no third-party code runs, no
  reader IP reaches a CDN, and the assets are versioned with the content. It
  does not fork Quartz core and does not fork a third-party package, so there
  is no upstream to track. The existing `forbiddenRuntimeSignatures` gate
  extends cleanly to `cdn.jsdelivr.net` and `cdnjs.cloudflare.com`, and the
  policy becomes machine-enforced rather than a note in a document.
- **Cons.** A post-build rewrite step is unusual, and it depends on the two
  URLs staying as they are; if the plugin changes them, the rewrite stops
  matching and the gate catches it.
- **Cost.** 25 KB of vendored assets, one small script, one gate extension.

### B. Configure the plugin to point at local assets

Not available. The URLs are hard-coded constants in the published bundle; the
plugin exposes no option for them. This would require forking the package.

### C. Accept the CDN and document the dependency

- **Pros.** No change to the build, no vendored files, no fork. The version is
  already pinned in the URL (`katex@0.16.11`), and the project is pinned in
  `package-lock.json`.
- **Cons.** It is a third-party runtime dependency on a public CDN, on every
  page view, for a site whose stated policy is a local bundle. It contradicts
  the treatment of the graph plugin. A CDN outage or policy change breaks
  every maths page, and the reader's IP and user agent reach a third party.

### D. Remove the LaTeX plugin and the mathematics

Not viable. 211 content files would lose their rendering.

## Decision

**Adopt option A: vendor KaTeX, rewrite the two URLs at build time, remove the
cdnjs preconnect, and extend the existing remote-runtime gate to cover
`cdn.jsdelivr.net` and `cdnjs.cloudflare.com`.**

The gate already exists and already has a precedent; this extends both. The
alternative — accepting a CDN runtime on every page — is inconsistent with the
decision already taken about the graph plugin, and the content genuinely needs
the maths, so the assets are vendored rather than the feature dropped.

Implementation, all inside this repository:

1. `quartz/static/katex/` holds the vendored assets at the version the plugin
   pins: `katex.min.css` (23,335 bytes), `copy-tex.min.js` (1,673 bytes),
   KaTeX's 60 font files, KaTeX's `LICENSE`, and `CHECKSUMS.txt` recording the
   SHA-256 of every vendored file. The build copies them to
   `public/static/katex/`.
2. `plugins/local-latex/` wraps `@quartz-community/latex`, reuses its transform
   unchanged, and swaps the two jsdelivr URLs for `/static/katex/…`. The
   wrapper is registered in `quartz.config.yaml` in place of the package
   plugin, so the site does not fork the package.
3. The `cdnjs` preconnect is removed from `quartz/components/Head.tsx`, which
   is this repository's own copy of that file.
4. `scripts/validate-graph-output.mjs` gains `cdn.jsdelivr.net` and
   `unpkg.com` in `forbiddenRuntimeSignatures`, so the build fails if the
   maths is ever pulled from an npm CDN again.

The owner chose **option A** on 2026-10-24: vendor KaTeX into the repository
rather than keep the CDN.

### Mermaid: vendored, 2026-10-25

The Phase 0 plan's stop condition — _"Quartz head and Mermaid support
reference cdnjs"_ — is now closed. The preconnect is gone, KaTeX is vendored,
and the Mermaid runtime is vendored too.

The Obsidian-flavoured markdown plugin imported Mermaid from
`https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.4.0/mermaid.esm.min.mjs`
at runtime, so the two lessons that carry a diagram
(`advanced-prompt-engineering-techniques/lessons/02-chain-of-thought-and-step-by-step`
and `agentic-ai-build-your-first-agentic-ai-system/lessons/00-introduction-and-autonomy-levels`)
reached a CDN.

That URL is a constant inside
`@quartz-community/obsidian-flavored-markdown`, and the plugin also provides
the wiki-links and callouts the site depends on, so the plugin cannot simply
be switched off. The same treatment as KaTeX applies: vendor the files and
wrap the plugin, without forking the package.

1. `quartz/static/mermaid/` holds the vendored runtime at version 11.4.0: the
   ESM entry module, every chunk reachable from it (statically imported, or
   imported on demand for a diagram type the site has not drawn yet), the
   upstream MIT `LICENSE`, and `CHECKSUMS.txt` recording the SHA-256 of every
   file. The upstream directory layout is preserved, because the entry module
   imports its chunks with paths relative to itself. The whole reachable
   closure is vendored — 64 modules, 2.4 MiB — so a future diagram of any
   type will still draw.

   The modules are named `.js` rather than `.mjs`, and their import
   specifiers were rewritten to match. A module script must be served with a
   JavaScript MIME type, and some static servers answer `text/plain` for the
   `.mjs` extension, which the browser refuses to execute. `.js` is understood
   everywhere, so the copy does not depend on a server's extension mapping.
   That rewrite is the only change from the upstream bytes.

2. `plugins/local-obsidian/` wraps
   `@quartz-community/obsidian-flavored-markdown`, reuses its transform
   unchanged, and rewrites the one cdnjs import inside the plugin's inline
   client script to `/static/mermaid/mermaid.esm.min.js`. The wrapper is
   registered in `quartz.config.yaml` in place of the package plugin.
3. `scripts/validate-graph-output.mjs` gains `cdnjs.cloudflare.com` in
   `forbiddenRuntimeSignatures`, so the build fails if any runtime comes back
   from a CDN. The runtime gate now covers all three CDNs, not just the npm
   ones.

The owner approved this on 2026-10-25.

## Consequences

- The site has **no third-party runtime**. Every asset it loads is served by
  the same origin as the page, from the same deployment.
- A maths page renders identically offline and behind a firewall, and the
  content is not exposed to a third party by a page view.
- The repository carries 3.5 MB of third-party code: the 25 KB of KaTeX's
  stylesheet and script, KaTeX's 60 font files, which the stylesheet
  references in woff2, woff and ttf, and Mermaid's 64 modules (2.4 MiB). Both
  are pinned by version and checksum (`quartz/static/katex/CHECKSUMS.txt` and
  `quartz/static/mermaid/CHECKSUMS.txt`), and each MIT licence travels with it
  as a `LICENSE` file beside the files.
- If the plugin is upgraded and changes its URLs, the rewrite stops matching and
  the new gate fails the build rather than silently going back to the CDN.
- The `cdnjs` preconnect is removed by the same build step, so the site stops
  opening a connection to a host it does not use.
- This resolves the last deployment stop condition in the Phase 0 plan that
  belongs to the content, and clears the way for the deployment slice.

## Stop conditions

- The owner prefers to accept the CDN. Then this ADR is not adopted, the
  forbidden-signature list stays as it is, and the Phase 0 plan's stop
  condition is closed by the owner's decision rather than by a change.
- Vendoring is attempted and the maths pages do not render identically. Then
  option A is abandoned and the owner is asked to choose between C and D.

# Hosting targets

`ARCHITECTURE.md` names Cloudflare Workers Static Assets as the deployment
target. This file records what it would take to host the same site on GitHub
Pages as well, what the two targets share, and where they cannot both be
right at once.

It is analysis and a recipe. It does not change the deployment target.

## 1. The build is the product; hosting is a deploy step

`npx quartz build` writes a static `public/` directory — HTML, CSS, JS and
public manifests. Nothing in that output is Cloudflare-specific. The Workers
config is assets-only (`wrangler.jsonc` sets `assets.directory` to `./public`
with no Worker `main`), so the same directory can be served by GitHub Pages,
Cloudflare Pages, Netlify, an object store, or nginx.

That is what makes a second target cheap: one build, two deploy steps.

## 2. What the targets share

| Concern         | Both targets                                                 |
| --------------- | ------------------------------------------------------------ |
| Source of truth | Markdown under `content/` plus Git, reviewed by pull request |
| Build           | `npx quartz plugin install && npx quartz build` → `public/`  |
| Routing         | extensionless URLs, resolved by the SPA fallback `404.html`  |
| HTTPS           | provided by the platform                                     |
| Cost            | free tier covers a site of this size                         |

The routing row is worth stating precisely. GitHub Pages serves static files
and has no extensionless routing: a request for `/courses/example` 404s unless
the host serves `404.html` as a fallback and the client takes over. This
repository already sets `enableSPA: true` in `quartz.config.yaml`, and the
build emits `public/404.html` — verified in the local build. That is the whole
mechanism, and it is already in place for the Pages target.

The `docs/hosting.md` recipe for Pages also needs full git history, because
Quartz resolves created/modified dates from git. This repository's CI already
uses `fetch-depth: 0` for the same reason, and the Pages workflow must too.

## 3. Where they cannot both be right: `baseUrl`

`baseUrl` is a build input, and it is the one thing that is not shared.

- It is read from `quartz.config.yaml` only. The config loader resolves
  `quartz.config.yaml` from the working directory
  (`quartz/plugins/loader/config-loader.ts`); there is no environment-variable
  override, so two targets need two configuration values.
- It is a host, optionally with a path prefix. `new URL(\`https://${cfg.baseUrl}\`).pathname`
becomes the site's base path (`quartz/components/renderPage.tsx`), so a GitHub
*project* site works with `baseUrl: howard-starfield.github.io/Personal_Knowledge_Site`,
and a custom domain works with `baseUrl: fieldbook.example.com`.
- It is baked into the output. The same `public/` cannot serve from two
  different prefixes.

Consequences:

1. **One canonical URL per build.** Pick the URL that is canonical and build
   for it. If GitHub Pages is to serve the site, `baseUrl` becomes the Pages
   hostname (or the custom domain), and the Cloudflare build for the same
   hostname is byte-identical.
2. **A second target on a different hostname needs a second build.** It is a
   mirror, not the same artefact, and it must not compete for canonical URLs.
   Give it its own `baseUrl` and mark it noindex.
3. **Without `baseUrl` the site still works** — links are relative
   (`renderPage.tsx` uses an empty base path when `baseUrl` is absent) — but
   the social metadata is broken: `quartz/components/Head.tsx` builds
   `https://${cfg.baseUrl}/static/og-image.png` with no fallback, so the output
   carries `https://undefined/...`. A local build of the current content puts
   that string in **397** of its 944 HTML files. This is the Phase 0 blocker,
   and it blocks both targets equally.

So the hosting question is really a question about **which single URL the site
is published at**. GitHub Pages and Cloudflare are both fine answers to that;
they are not two answers to one question at the same time.

## 4. GitHub Pages recipe

Verified against the pinned Quartz source and this repository's CI.

**Repository settings (owner action, one time).** Settings → Pages → Source:
**GitHub Actions**. Until this is done the repository reports
`has_pages: false` and no Pages workflow can succeed.

**Build settings if using the Cloudflare Pages Git integration instead.**
Production branch `v5`, framework preset `None`, build command
`npx quartz plugin install && npx quartz build`, output directory `public`.

**Workflow.** Add `.github/workflows/deploy-pages.yaml`:

```yaml
name: Deploy to GitHub Pages

on:
  # Manual until the owner enables Pages and confirms the canonical hostname.
  workflow_dispatch:
  # Once Pages is enabled and baseUrl is settled, use:
  # push:
  #   branches: [v5]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-24.04
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v7.0.1
        with:
          fetch-depth: 0 # full history: Quartz resolves dates from git
      - uses: actions/setup-node@v7.1.0
        with:
          node-version-file: .node-version
          cache: npm
      - run: npm ci
      - run: npx quartz plugin install
      - run: npx quartz build --concurrency=1
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public
  deploy:
    needs: build
    runs-on: ubuntu-24.04
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Why the trigger is manual by default.** A push-triggered Pages workflow
fails every run while `has_pages` is `false`, which turns the pull-request
gate red for unrelated work. `workflow_dispatch` makes the deploy an explicit,
deliberate act, and the one-line change to the push trigger is recorded in the
file.

**`baseUrl` for the Pages target.** With the repository name unchanged, the
site is a GitHub _project_ site, so `baseUrl` needs the path prefix:
`howard-starfield.github.io/Personal_Knowledge_Site`. With a custom domain
attached, `baseUrl` is the bare hostname.

## 5. Vercel — the target the owner chose

Vercel is the chosen deployment target. The owner decided this on 2026-10-23.

**What it needs in the repository.** `vercel.json` at the root, which is now
committed:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "buildCommand": "npx quartz plugin install && npx quartz build",
  "outputDirectory": "public"
}
```

- **`cleanUrls: true`** is the load-bearing one. Quartz emits extensionless
  links, and Vercel serves `about.html` at `/about` only when this is set.
  Vercel's own documentation still lists it as current, and it is not
  deprecated.
- **`trailingSlash: false`** normalises `/about/` to `/about` with a 308,
  matching the links Quartz emits and keeping one URL per page. Leaving it
  undefined lets both forms serve the same content, which invites duplicate
  indexing.
- **`buildCommand`** is `npx quartz plugin install && npx quartz build`, and
  it must be that. There is no `build` script in `package.json` - only a
  `prebuild` that runs `install-plugins` - so `npm run build` would run the
  hook and then fail on the missing script.
- **`outputDirectory: public`** is where Quartz writes the site.

**What it needs in the dashboard.** Import the repository, then set Framework
Preset `Other`, Root Directory `./`, and the build command and output
directory above. Vercel issues two `*.vercel.app` URLs and a fresh preview URL
per deployment.

**What it needs in the configuration.** `baseUrl` becomes the Vercel hostname
or the custom domain - `personal-knowledge-site.vercel.app`, or the domain
once connected. Unlike the GitHub Pages project site, there is **no path
prefix**: Vercel serves at the apex, so `baseUrl` is a bare hostname. This is
the same line that removes the `https://undefined/` social metadata from all
770 built pages.

**What Vercel handles for free.** Caching: the pinned Quartz documentation
states that Cloudflare Pages, Vercel and Netlify handle caching
automatically, so hashed assets get the right cache headers and the HTML
stays fresh, with no configuration. TLS, the preview URL per deployment and
the `*.vercel.app` names are also included.

**What it does not fix.** The remote-runtime policy. Every one of the 770
built pages loads `katex@0.16.11/dist/katex.min.css` and
`katex@0.16.11/dist/contrib/copy-tex.min.js` from `cdn.jsdelivr.net`, and
carries a `<link rel="preconnect" href="https://cdnjs.cloudflare.com">`.
Vendoring KaTeX means editing `quartz/components/Head.tsx`, which is Quartz
core and needs an ADR before any core change. Vercel does not change that
decision; it only makes it live.

## 6. What choosing Pages would mean

- Cloudflare Workers stays the target named in `ARCHITECTURE.md` unless an ADR
  says otherwise. Adding a second target is a deployment-architecture change
  and is recorded as ADR-0005 for owner approval.
- Pages removes three Cloudflare dependencies from the _public_ path: the
  account, the API token and the DNS mutation. It adds a dependency on
  GitHub Pages being enabled on the repository.
- Anything Cloudflare-only does not exist on the Pages target: Workers
  bindings, Cloudflare Access, preview URLs from `wrangler`. The baseline
  requires none of them for published reading, so this is not a loss today.
- The two targets stay **independent**, so a Pages outage does not take the
  Cloudflare copy down, and vice versa — as long as the canonical URL is
  only served by one of them.

## 6. Stop conditions

- The owner has not confirmed a canonical hostname. `baseUrl` cannot be set
  without it, and the build's social metadata stays broken without it.
- The remote-runtime policy (the Quartz-owned cdnjs references) is unresolved.
  It blocks both targets equally, and it is not a hosting problem.
- Pages has not been enabled on the repository.

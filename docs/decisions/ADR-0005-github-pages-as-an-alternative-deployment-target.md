# ADR-0005: Keep one canonical URL, and allow GitHub Pages as an alternative deployment target

| Field    | Value                                                                                 |
| -------- | ------------------------------------------------------------------------------------- |
| Status   | Proposed — awaiting owner approval                                                    |
| Date     | 2026-10-23                                                                            |
| Deciders | Product owner                                                                         |
| Related  | ADR-0003, `docs/architecture/ARCHITECTURE.md`, `docs/architecture/HOSTING_TARGETS.md` |

## Context

`ARCHITECTURE.md` names Cloudflare Workers Static Assets as the deployment
target, and the active Phase 0 plan stops before any external deployment. The
Phase 0 evidence records that the built output still carries unresolved
`https://undefined/` social metadata and Quartz-owned cdnjs references, both
of which block deployment on any target.

The owner asked whether GitHub Pages could host the site as an option while
Cloudflare support is kept.

The build output is static and platform-neutral: `npx quartz build` writes
`public/`, and the Workers config is assets-only with no Worker `main`. The
one target-specific build input is `baseUrl`, which is read from
`quartz.config.yaml` with no environment override, and which is baked into
the output as both the canonical URL and the social metadata.

## Decision

1. **One canonical URL.** The site is published at a single canonical
   hostname. Every build uses that hostname as `baseUrl`, so the canonical
   links, the social metadata and the sitemap all agree.
2. **GitHub Pages is a supported alternative target**, not a co-hosted
   mirror. Switching to it means changing `baseUrl`, adding the Pages
   workflow, and enabling Pages on the repository. It does not require a
   content, plugin or schema change.
3. **Cloudflare Workers Static Assets remains a supported target.** The two
   are independent, so a failure of one does not take the other down, and a
   copy may be served on a second hostname as a noindex mirror — never as a
   second canonical URL.
4. **The Pages workflow's default trigger is `workflow_dispatch`.** A
   push-triggered Pages workflow fails on every run while the repository
   reports `has_pages: false`, which would turn the pull-request gate red for
   unrelated work. The push trigger is added when Pages is enabled and the
   canonical hostname is confirmed.
5. **`baseUrl` must be set before any target goes live.** The 397 built files
   that carry `https://undefined/` are a content defect, not a hosting one,
   and they are fixed by setting `baseUrl`.

## Consequences

- The owner can host on GitHub Pages without giving up Cloudflare, and the
  decision can be reversed by changing one configuration value and a
  workflow.
- Two targets means two deploy paths to keep working. Both are assets-only
  and share the same build, so the cost is one workflow file and one
  configuration line, not a second framework or a second content pipeline.
- The architecture document's "Cloudflare Workers Static Assets is the
  primary deployment target" line stays true until the owner chooses
  otherwise; this ADR records the alternative, not a switch.
- Anything Cloudflare-only — Workers bindings, Cloudflare Access, wrangler
  preview URLs — does not exist on the Pages target. The published-reading
  baseline requires none of them, so nothing is lost today.
- The decision cannot be executed until the owner confirms a canonical
  hostname, because `baseUrl` cannot be set without one.

## Alternatives considered

- **GitHub Pages only, Cloudflare retired.** Simplest, and it drops the
  Cloudflare account, API token and DNS dependency. Rejected because the
  architecture names Workers as the target and the owner asked to keep
  Cloudflare support; a reversal later would need a second deploy path
  anyway.
- **Serve both targets from the same canonical hostname.** Not possible:
  one DNS zone points at one provider, and a build can only bake in one
  `baseUrl`.
- **GitHub Pages as a build-and-host proxy for the Cloudflare target.**
  Rejected: it adds a hop and an outage mode to gain nothing that two
  independent builds do not already give.

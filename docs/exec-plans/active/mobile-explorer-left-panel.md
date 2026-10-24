# Execution Plan: Phase X — Mobile Explorer as a left-hand panel

| Field           | Value                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Status          | Complete — merged as `e993e39`; two follow-ups remain (§17), so the plan stays in `active/`      |
| Owner           | Site maintainer (agent)                                                                          |
| Created         | 2026-10-24                                                                                       |
| Updated         | 2026-10-24                                                                                       |
| Baseline commit | `8260445e3918778e8ff146cfeb860f98bbf105ed`                                                       |
| Target branch   | `fix/mobile-explorer-left-panel`                                                                 |
| PR              | [#19](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/19) (merged as `e993e39`) |
| PRD phase       | Public-learning baseline; presentation defect on the published site                              |
| Related ADRs    | None required (see §9)                                                                           |

## 1. Objective

On viewports at or below 800 px, the Explorer must open as an expanded
left-hand panel that is fully visible, scrollable, and dismissible, instead of
the current clipped 34 px fragment that overlaps the toggle button.

Observable outcome: at 390 x 844 the Explorer panel is fully visible on the
left when opened, its first tree items are readable, the page behind it cannot
be scrolled while it is open, tapping outside the panel or pressing Escape
closes it, and the desktop layout at 1440 px is byte-for-byte unchanged.

## 2. Non-goals

- No change to the Explorer package (`@quartz-community/explorer`), its
  component source, or any Quartz core file.
- No change to the tree's contents, ordering, folder-collapse behaviour, or
  the `fileTree` localStorage contract.
- No redesign of the desktop sidebar, the header, the search bar, or the
  article typography.
- No new runtime dependency, no remote runtime dependency, and no change to
  the published content tree, frontmatter, or stable IDs.
- Not a general mobile-audit of the site; this slice is the left menu only.

## 3. Acceptance gates copied from the PRD

Restated from `docs/product/PRD.md` (public reading baseline) and
`AGENTS.md` §"Quartz frontend and browser lifecycle safety":

- [ ] Published pages remain readable without login, and article reading never
      depends on the Explorer. Evidence: Playwright read of a lesson page with
      the drawer open and closed.
- [ ] Interactive controls remain keyboard reachable, have accessible names,
      preserve visible focus, and honour reduced motion. Evidence: §13
      Accessibility.
- [ ] Custom styles stay scoped; no broad global selectors and no `!important`
      without explicit justification. Evidence: review of the diff.
- [ ] Required checks in `docs/architecture/VERSION_MATRIX.md` pass. Evidence:
      §19.
- [ ] UI changes ship with screenshots. Evidence: §19 UI evidence.

Phase-specific gates:

- [ ] G1 — at 390 px, `.explorer-content` is fully inside the viewport when
      the Explorer is open (bounding box `x >= 0`, `width <= 390`, and
      `visibility: visible`).
- [ ] G2 — at 390 px, the closed Explorer paints nothing over the page
      (`visibility: hidden`, box entirely off-screen to the left).
- [ ] G3 — at 390 px and 768 px, the page behind an open panel does not
      scroll, and scrolling the panel itself does work.
- [ ] G4 — tapping the scrim closes the panel, and the toggle closes the panel
      from the keyboard (`Enter`/`Space`). `Escape` is **not** wired: the pinned
      package owns the toggle handler and adding a listener would mean a new
      site-owned plugin, which this slice does not add (§17).
- [ ] G5 — at 1440 px the Explorer is unchanged: no fixed positioning, no
      scrim, the tree is visible, and the page scrolls normally.
- [ ] G6 — the regression test in `scripts/mobile-explorer-panel.test.mjs`
      fails if the mobile block stops pinning the drawer to the viewport or
      re-introduces the clipping `overflow`.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                                                    |
| ----------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Plan-before-code; ADR triggers; branch+PR boundary; required checks; scoped styles; accessibility |
| Nested path | `quartz/AGENTS.md`  | _none present_ (checked)                                                                          |
| Nested path | `content/AGENTS.md` | Not touched by this change                                                                        |

Verification command/output:

```text
$ Get-ChildItem 'D:\AI_projects\Personal_blog' -Recurse -Filter AGENTS.md -File
D:\AI_projects\Personal_blog\AGENTS.md
D:\AI_projects\Personal_blog\content\AGENTS.md
```

## 5. Version and environment matrix

| Component                    | Exact version/commit                     | Source of truth     | Notes                                              |
| ---------------------------- | ---------------------------------------- | ------------------- | -------------------------------------------------- |
| Quartz                       | `5.0.0`                                  | `package.json`      | Unchanged by this slice                            |
| `@quartz-community/explorer` | `0.1.0`                                  | `package-lock.json` | The component this fix overrides; **not** modified |
| Node.js                      | `v24.14.0`                               | `.node-version`     | Matches CI                                         |
| npm                          | `11.9.0`                                 | local toolchain     | Matches CI                                         |
| Prettier                     | `3.9.6` resolved                         | `package-lock.json` | Gate                                               |
| TypeScript                   | `5.9.3` resolved                         | `package-lock.json` | Gate                                               |
| Wrangler                     | `4.125.0`                                | `package.json`      | Dry-run only                                       |
| Playwright (Python)          | local install, **not** a repo dependency | local tooling       | Evidence capture only                              |

## 6. Official source verification

| Claim/assumption                                                                    | Official URL                                                                                                                                        | Verified date | Installed source file/symbol                                                                                          | Finding                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The Explorer ships a mobile drawer that is `position:absolute` inside `.explorer`   | `https://www.npmjs.com/package/@quartz-community/explorer`                                                                                          | 2026-10-24    | `node_modules/@quartz-community/explorer/dist/index.js` → `explorer_default` (`src/components/styles/explorer.scss`)  | `@media all and (max-width: 800px)`: `.explorer { overflow: hidden }` and `.explorer .explorer-content { position: absolute; top: 0; left: 0; width: 100vw; height: 100dvh; transform: translateX(-100vw) }` |
| The same mobile block clips the drawer                                              | same                                                                                                                                                | 2026-10-24    | same                                                                                                                  | `overflow: hidden` on `.explorer` clips the absolutely positioned drawer to the 34 px button box (`flex: 0 0 34px`)                                                                                          |
| The Explorer toggles `.collapsed` on `.explorer` and `mobile-no-scroll` on `<html>` | same                                                                                                                                                | 2026-10-24    | `node_modules/@quartz-community/explorer/dist/index.js` → `src/components/scripts/explorer.ts` (`L` / toggle handler) | `C.classList.toggle("collapsed")`; `C.setAttribute("aria-expanded", …)`; `document.documentElement.classList.add/remove("mobile-no-scroll")`                                                                 |
| The Explorer auto-collapses on mobile at load and after SPA navigation              | same                                                                                                                                                | 2026-10-24    | same                                                                                                                  | `n.checkVisibility() && (t.classList.add("collapsed"), …)` inside the `nav`/`render` handler                                                                                                                 |
| `mobile-no-scroll` has no styling in the package                                    | same                                                                                                                                                | 2026-10-24    | `explorer_default`                                                                                                    | Only `overscroll-behavior: contain` is defined; the package never locks page scroll                                                                                                                          |
| The drawer is never closed by tapping outside it                                    | same                                                                                                                                                | 2026-10-24    | same                                                                                                                  | No scrim element and no outside-click handler exist in the package                                                                                                                                           |
| The site's own stylesheet is the supported override point                           | `AGENTS.md` §"Non-negotiable architecture" ("Do not patch Quartz core when configuration, an override, or a local plugin can meet the requirement") | 2026-10-24    | `quartz/styles/custom.scss`                                                                                           | The override is authored in the site stylesheet, not in the dependency                                                                                                                                       |

## 7. Repository reconnaissance

### Current behavior reproduced

Commands (Playwright over the local build and over `https://blog.howardlab.dev/`):

```text
$ python scratch/cc-scope/pw.py before http://127.0.0.1:8099/index.html --probe
--- iphone12 (390x844) ---
   explorerClass: explorer nav-files-container collapsed
   contentVis: hidden
   contentTransform: matrix(1, 0, 0, 1, -390, 0)
   contentRect: {'x': -390, 'y': 0, 'w': 390, 'h': 844}
   btn: {'display': 'flex', 'vis': 'visible', 'x': 44, 'y': 40, 'w': 34, 'h': 34}
```

The computed box is a full-viewport drawer that is parked off-screen to the
left — the styles are correct. The visible defect is that the drawer never
appears at all when opened, and a 34 px fragment of the tree is painted at the
top-left of the page instead, overlapping the toggle button.

Screenshot evidence: `scratch/cc-scope/beforeopen-iphone12.png` shows
"Courses" and "Learning Log" as a bare fragment at the top of the page with the
hamburger icon drawn on top of "Learning Log"; the article body is fully
visible behind it.

### Root cause

1. `@quartz-community/explorer@0.1.0` sets `overflow: hidden` on `.explorer`
   inside `@media all and (max-width: 800px)`.
2. The drawer `.explorer .explorer-content` is `position: absolute`, so it is a
   descendant of that clipping box and is clipped to the `.explorer` box, which
   the same package sizes to `flex: 0 0 34px`.
3. The drawer is also `width: 100vw; height: 100dvh` — a full-screen cover
   rather than the left-hand panel the site wants, and the package provides no
   scrim, no outside-click close, and no scroll lock.

### Relevant code map

| Area                   | File/symbol                                                                  | Current responsibility          | Expected change                                                                     |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------- |
| Explorer styles        | `node_modules/@quartz-community/explorer/dist/index.js` → `explorer_default` | Mobile drawer markup and styles | **Unchanged** (pinned dependency)                                                   |
| Site stylesheet        | `quartz/styles/custom.scss` § mobile block (line ~1117)                      | Site overrides for mobile       | Drawer re-anchored to the viewport, panel width, scrim, scroll lock, reduced motion |
| Explorer client script | `node_modules/@quartz-community/explorer/dist/index.js` → `explorer.ts`      | Toggle handler                  | **Unchanged**; the fix reuses its `.collapsed` / `mobile-no-scroll` hooks           |
| Regression guard       | `scripts/mobile-explorer-panel.test.mjs`                                     | _new_                           | Fails if the mobile drawer stops being viewport-anchored or gets clipped again      |

### Existing tests and fixtures

- `scripts/static-asset-references.test.mjs` proves the stylesheet asset
  references resolve to tracked files; it does not cover layout.
- The repository has **no** committed Playwright harness and no committed
  layout test. `AGENTS.md` lists "Playwright critical paths" as a required
  check, so this slice records Playwright evidence in §19 and leaves the
  harness itself as a follow-up (see §17).

## 8. Contracts and invariants

### Content identity

- [x] IDs remain immutable — no content file is touched.
- [x] Path/title/permalink are not treated as identity — not applicable.

### Category table

- [x] Generated navigation cannot become authored graph edges — the Explorer
      tree stays generated navigation; no Markdown link is added.

### Graph

- [x] Solid = authored internal link; dotted = page-to-tag; folder = cluster.
      Not applicable — no graph change.

### Security/data

- [x] Markdown remains canonical public content.
- [x] No secret/private data enters static output/logs — the change is CSS only.
- [x] The drawer closes only through user interaction; nothing is transmitted.

Added invariants for this slice:

- The Explorer must remain a generated navigation surface; the fix must not add
  authored links.
- The fix must not change Explorer behaviour above 800 px.
- The fix must not depend on a Quartz hook that the pinned package does not
  provide.

## 9. Proposed design

Keep the pinned package and override its drawer from the site stylesheet.

1. **Stop the clip.** `.explorer { overflow: visible }` inside the mobile
   media query, so the drawer is no longer cropped to the 34 px button box.
2. **Re-anchor the drawer to the viewport.** The panel becomes
   `position: fixed; inset: 0 auto 0 0; width: min(19rem, 84vw);
height: 100dvh`, so it is a left-hand panel rather than a full-screen cover.
3. **Slide on the panel's own width.** `transform: translateX(-100%)` when
   `.explorer` carries `.collapsed`, `translateX(0)` otherwise — the package's
   own class is the only state hook.
4. **Dismiss.** The toggle button grows a `::after` scrim that covers the
   viewport while the panel is open. A pseudo-element dispatches its clicks to
   the element that owns it, so the scrim reuses the package's existing toggle
   handler and needs no JavaScript. The icon is lifted above the panel with a
   z-index so it stays visible and clickable.
5. **Lock the page behind.** `html.mobile-no-scroll { overflow: hidden }`, which
   is the class the package already toggles — but scoped to the mobile media
   query, because the package also adds it when the _desktop_ collapse button
   is used, and locking the desktop page would be a regression.
6. **Reduced motion.** Transitions and the scrim fade are disabled under
   `prefers-reduced-motion: reduce`.

### Alternatives considered

| Alternative                                                   | Benefit                                                                        | Problem                                                                                                 | Decision   |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ---------- |
| Patch `@quartz-community/explorer` in `node_modules`          | Direct fix                                                                     | Not a tracked file; lost on `npm ci`; AGENTS.md forbids patching Quartz core when an override works     | Rejected   |
| Add a site-owned plugin with a client script for scrim/Escape | Full control                                                                   | New plugin surface, new registration, new lifecycle to prove; the pseudo-element trick removes the need | Rejected   |
| Keep the full-screen `100vw` drawer and only remove the clip  | Smallest diff                                                                  | Still a full-screen cover, not the left-hand panel the owner asked for; no scrim, no dismiss            | Rejected   |
| CSS override in the site stylesheet                           | Smallest compliant change; no dependency churn; reuses the package's own hooks | Depends on `::after` click dispatch, which is standard CSS behaviour and is verified in §19             | **Chosen** |

ADR status: **no ADR required.** The change does not replace or patch Quartz
core, does not add a framework or dependency, and does not touch identity,
graph, storage, or topology. It is a scoped override in the site's own
stylesheet, which `AGENTS.md` explicitly prefers.

## 10. Data and schema changes

### Static/build contracts

No manifest, frontmatter, HTML, or schema change. The build output changes
only in the emitted CSS bundle.

### D1 migrations

Not applicable — D1 is not part of this baseline.

### API changes

Not applicable.

### Media changes

Not applicable.

## 11. File touch plan

| Order | File/path                                              | Change                                                                      | Reason                                                | Risk                     |
| ----: | ------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------ |
|     1 | `quartz/styles/custom.scss`                            | Mobile drawer override inside the existing `@media all and ($mobile)` block | The site stylesheet is the supported override point   | Low — scoped to ≤ 800 px |
|     2 | `scripts/mobile-explorer-panel.test.mjs`               | New `node:test` guard for the drawer contract                               | AGENTS.md requires a regression test for a defect fix | Low                      |
|     3 | `docs/exec-plans/active/mobile-explorer-left-panel.md` | This plan                                                                   | AGENTS.md requires a plan for a non-trivial change    | None                     |

No speculative refactors. `quartz/styles/base.scss`, `quartz/styles/variables.scss`,
and the pinned package are not touched.

## 12. Incremental implementation steps

### Step 1 — Reproduce and pin the defect

- Change: none (investigation only).
- Verification: Playwright probe + screenshot at 390 px.
- Evidence: §7 and §19.
- Rollback point: n/a.

### Step 2 — Override the drawer in the site stylesheet

- Change: add the mobile drawer rules to `quartz/styles/custom.scss`; remove
  the now-wrong `left: -1rem` offset.
- Verification: rebuild; re-run the Playwright probe; confirm G1–G5.
- Evidence: §19.
- Rollback point: revert the single file.

### Step 3 — Add the regression guard

- Change: `scripts/mobile-explorer-panel.test.mjs`.
- Verification: `npm test`; the test fails when the mobile drawer rules are
  removed (checked by temporarily editing the stylesheet in the working tree).
- Evidence: §19.
- Rollback point: delete the file.

### Step 4 — Full gate run, then branch, PR, merge

- Change: commit on `fix/mobile-explorer-left-panel`, open and merge the pull
  request, confirm the Vercel deployment.
- Verification: every command in §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit

| Behavior                                                     | Test/fixture                             | Expected result     |
| ------------------------------------------------------------ | ---------------------------------------- | ------------------- |
| The mobile drawer is anchored to the viewport                | `scripts/mobile-explorer-panel.test.mjs` | Pass                |
| The mobile drawer is not clipped by `.explorer`              | same                                     | Pass                |
| The closed drawer is off-screen and hidden                   | same                                     | Pass                |
| The open drawer is a left-hand panel of bounded width        | same                                     | Pass                |
| The scrim and the scroll lock exist only in the mobile block | same                                     | Pass                |
| Removing the override fails the test                         | same, by temporary edit                  | Fail (manual proof) |

### Integration/build

| Behavior   | Command/test                       | Expected result                   |
| ---------- | ---------------------------------- | --------------------------------- |
| TypeScript | `npx tsc --noEmit`                 | Clean                             |
| Formatting | `npx prettier . --check`           | Clean                             |
| Unit tests | `npm test`                         | All pass, including the new guard |
| Content    | `npm run validate:content`         | Clean                             |
| Build      | `npx quartz build --concurrency=1` | No `✗` plugin-load lines          |
| Graph      | `npm run validate:graph`           | Clean                             |
| Worker     | `npx wrangler deploy --dry-run`    | Clean                             |

### End-to-end/UI

| Flow                         | Viewports/input modes                | Evidence                           |
| ---------------------------- | ------------------------------------ | ---------------------------------- |
| Open the drawer              | 390 x 844, 768 x 1024, touch + mouse | Screenshots + computed-style probe |
| Close with the toggle        | same                                 | Screenshot                         |
| Close by tapping the scrim   | 390 x 844, touch                     | Screenshot + state probe           |
| Close with Escape            | 390 x 844, keyboard                  | State probe                        |
| Scroll the page while closed | 390 x 844                            | Page scrolls                       |
| Scroll the panel while open  | 390 x 844                            | Panel scrolls, page does not       |
| Desktop unchanged            | 1440 x 900                           | Screenshot + probe                 |

### Accessibility

- Keyboard path: the toggle is reachable with `Tab` and activates with
  `Enter`/`Space`, which closes the open panel; the toggle keeps
  `aria-label="Explorer"` and `aria-expanded` from the package.
- `Escape` does **not** close the panel. The pinned Explorer package owns the
  toggle handler and exposes no close hook, so this would need a site-owned
  plugin with its own listener lifecycle. It is recorded as a known limitation
  (§17) rather than smuggled into a CSS-only change.
- Screen-reader semantics: unchanged from the package (`aria-controls` points
  at the drawer, `aria-expanded` reflects the open state).
- Contrast/focus: the scrim is a dimming layer, not a text surface; the focus
  ring on the toggle is untouched.
- Reduced motion: `prefers-reduced-motion: reduce` disables the slide and the
  scrim fade.
- Graph/table alternative: not applicable.

### Security

Not applicable — the change is CSS only, adds no network call, no storage
write, and no new dependency.

### Performance

No new runtime JavaScript is added to the site bundle. The only new paint
work is one composited `transform` on the drawer and one fixed overlay while
it is open. Measured: no long tasks introduced; the drawer opens in one
animation frame budget (~220 ms transition).

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: no frontmatter touched; `npm run validate:content`
  proves it.
- Backward-compatible window: the override is CSS inside a media query, so a
  browser without `:has()` support still gets the upstream behaviour rather
  than a broken one.
- Deployment order: merge to `v5`; Vercel rebuilds the static site.
- Registry/manifest synchronization: not applicable.
- User-visible impact: the mobile left menu becomes an expanded left panel.

## 15. Deployment plan

- Preview resources/bindings: the local `quartz build` output in `public/`,
  served over `http://127.0.0.1:8099`, is the preview.
- Required secrets: none.
- D1 migration order: not applicable.
- Worker/static deploy order: merge → Vercel build → smoke test.
- Smoke tests: the live course page, a lesson page, and the drawer behaviour
  at 390 px.
- Production approval: the owner asked for the push; the change lands through
  the pull-request boundary required by `AGENTS.md`.

## 16. Rollback and recovery

- Code/static rollback: revert the merge commit; Vercel rebuilds.
- D1 compatibility: not applicable.
- Media impact: none.
- Content registry resync: not applicable.
- Write pause requirement: none.
- Data that cannot be rolled back: none — no data is written.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                                             | Impact                                          | How it will be resolved                                                                                                                                                         | Stop condition?                             |
| ------------------------------------------------------------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `::after` click dispatch to the owning button is relied on for the scrim | Tapping outside the panel would not close it    | Verified in a real browser in §19; if it fails, the fallback is a small site-owned plugin (rejected alternative in §9)                                                          | Yes, if the scrim does not close the panel  |
| The package adds `mobile-no-scroll` on desktop too                       | Locking the desktop page would be a regression  | The scroll lock is scoped to the mobile media query                                                                                                                             | No                                          |
| `position: fixed` could be captured by a transformed ancestor            | The drawer would anchor to the wrong box        | No ancestor in the chain carries a transform; verified by computed `position` and box in §19                                                                                    | Yes, if the drawer is not viewport-anchored |
| Long tree labels wrap in a 19 rem panel                                  | Narrower tree text                              | The panel scrolls vertically; the tree already wraps at the desktop width of 320 px                                                                                             | No                                          |
| The repository has no committed Playwright harness                       | The CI gate cannot re-run the visual proof      | Evidence is captured in this plan and the pull request; the harness is a separate follow-up slice (§7)                                                                          | No                                          |
| `Escape` does not close the drawer                                       | Keyboard users lose the shortest dismissal path | The toggle stays keyboard-operable (`Enter`/`Space`); a site-owned plugin with a listener lifecycle is the only clean fix, and it is out of scope for this CSS-only slice (§13) | No                                          |
| The toggle icon stays a "menu" glyph while the panel is open             | The affordance does not read as "close"         | The same button closes the panel and the scrim is dismissible; swapping the glyph would mean changing the pinned package's markup, which `AGENTS.md` forbids without an ADR     | No                                          |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — no Markdown link
   was added; the Explorer tree stays generated navigation.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file was moved or renamed.
3. Could unpublished content/assets become public? **No** — no content or
   asset changed.
4. Could one principal access another's data? **No** — no data access.
5. Is any client identity/role trusted? **No** — no identity handling.
6. Is any new API or source field undocumented/unverified? **No** — the only
   hooks used (`.explorer.collapsed`, `html.mobile-no-scroll`,
   `button.mobile-explorer`) were read out of the pinned package source
   (§6).
7. Does optional feature failure break article reading? **No** — the Explorer
   is not on the article-reading path; the change is CSS inside a media query.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written; reverting
   the commit restores the previous CSS.
10. Are explicit links, tags, folders, and future semantic relations still
    distinct? **Yes** — unchanged.

## 19. Completion evidence

### 19.1 Commands and results

```text
$ npx tsc --noEmit
   clean, exit 0

$ npx prettier --check quartz/styles/custom.scss scripts/mobile-explorer-panel.test.mjs \
      docs/exec-plans/active/mobile-explorer-left-panel.md
   All matched files use Prettier code style!

$ npm test
   tests 242 | suites 45 | pass 242 | fail 0
   (the 7 new "mobile Explorer drawer" tests are included)

$ npm run validate:content
   Content validation passed: 357 entities, 357 unique IDs

$ npx quartz build --concurrency=1
   exit 0, no "✗" plugin-load lines

$ npm run validate:graph
   Graph output valid: 357 pages, 394 tags, 1662 relationships, 773 graph-enabled HTML pages.

$ npx wrangler deploy --dry-run
   Read 993 files from the assets directory ...\public; no bindings; exit 0
```

The repository-wide `npx prettier . --check` fails **locally only**: all 150
flagged files are excluded from Git by `.git/info/exclude` (for example
`/content/courses/accounting-foundations/`), so CI never sees them. Proven by
`git check-ignore` over every flagged path: 150/150 ignored, 0 tracked. The
`verify` check run on the `v5` head `d51ba38` reported "All matched files use
Prettier code style!".

The regression guard was proven to bite: with the stylesheet override stashed,
6 of its 7 tests fail (the seventh asserts the desktop is untouched, which
correctly still passes).

### 19.2 Generated artifacts inspected

- content manifest: unchanged (`npm run validate:content`, 357/357).
- graph manifest: unchanged (`npm run validate:graph`, 1662 relationships).
- category HTML: unchanged.
- Worker dry-run/build: `npx wrangler deploy --dry-run`, 993 assets read.
- D1 migration output: not applicable.

### 19.3 UI evidence

Driven with Playwright (Chrome) against the local build served on
`http://127.0.0.1:8099`. **28/28 checks pass.**

The same suite was re-run against the deployed site
`https://blog.howardlab.dev/` after PR #19 merged: **28/28 checks pass**, with
the open panel measuring `x=0, w=304, h=844` at 390 px and the tree link
navigating to
`/courses/accounting-ai-crash-course/lessons/29-anomaly-detection`.

| Flow                         | Viewport / input              | Result                                                                         |
| ---------------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| Open the drawer              | 390x844 touch, 768x1024 touch | Panel at `x=0`, `w=304`, `h=844`, `visibility: visible`, `position: fixed`     |
| Closed drawer paints nothing | 390x844                       | `visibility: hidden`, box at `x=-304` (fully off-screen)                       |
| Page behind the panel        | 390x844                       | `html` overflow `hidden`; a wheel gesture leaves `scrollY` at 0                |
| Tree inside the panel        | 390x844                       | `ul.explorer-ul` scrolls (`22275 > 732`), `scrollTop` reaches 200              |
| Dismiss by tapping the scrim | 390x844 touch                 | Panel collapses; `mobile-no-scroll` removed                                    |
| Dismiss from the keyboard    | 390x844, `Tab` then `Enter`   | Panel collapses                                                                |
| Navigate from the tree       | 390x844 touch                 | Reaches the lesson page; the panel collapses; `scrollY` returns to 0           |
| Desktop unchanged            | 1440x900                      | Drawer `position: static`, tree visible and uncollapsed, page scrolls normally |
| Dark theme                   | 390x844, `saved-theme=dark`   | Panel background `rgb(22, 22, 24)`, text `rgb(212, 212, 212)`                  |
| Reduced motion               | 390x844, `reduce`             | Drawer `transition-duration: 0s`, scrim `animation-name: none`                 |

Screenshots (committed under `docs/images/`):

- `mobile-explorer-before-390.png` — the defect: the tree renders as a bare
  fragment at the top of the page and the toggle overlaps it.
- `mobile-explorer-drawer-390.png` — the fix: an expanded left-hand panel with
  the page dimmed behind it.
- `mobile-explorer-drawer-390-dark.png` — the same panel in the dark theme.
- `mobile-explorer-desktop-1440.png` — the desktop layout, unchanged.

The desktop screenshots are not byte-identical between builds because the
Explorer's tree fade is animated: two captures of the **same** build taken
1500 ms and 4000 ms after load already differ by 504 pixels in the same
region. The change itself is confined to the mobile media query, which the
committed guard asserts against the compiled CSS.

### 19.4 Deviations from plan

1. **The toggle button needed `z-index: auto`.** The package gives
   `button.mobile-explorer` a `z-index: 101`, which makes it a stacking
   context and traps the icon under the panel. The plan's §9 did not anticipate
   this; the fix is one extra declaration, and the guard asserts it.
2. **The base drawer rule does not set `transform`/`visibility`.** The first
   draft set them on the base rule, whose higher specificity then beat the
   open-state rule and left the panel permanently hidden. The state rules now
   carry the same specificity as the base rule.
3. **`Escape` is not wired** (§13, §17). Recorded as a known limitation instead
   of adding a site-owned plugin to a CSS-only slice.
4. **The tree scrolls inside `ul.explorer-ul`, not the panel.** That is the
   upstream Quartz scroll container (`ul.overflow` with `max-height: 100%`),
   which the package already provides; the plan's wording was imprecise.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Non-goals not implemented accidentally.
- [x] All PRD acceptance gates pass.
- [x] Contracts/docs updated.
- [x] Tests/evidence attached.
- [x] Security/privacy review complete.
- [x] Migration/rollback documented and tested where possible.
- [x] Known limitations documented (`Escape`, the menu glyph, no committed
      Playwright harness).
- [x] Plan completion log updated.
- [x] Plan stays in `active/` until the §17 follow-ups land, so the plan's own
      path stays valid for the code comment and the regression guard.

## 21. Completion log

| Date       | Commit                                   | Work completed                                                          | Evidence                                                                                         | Remaining                                                                                    |
| ---------- | ---------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| 2026-10-24 | `2a094d2` → merged as `e993e39` (PR #19) | Root cause found, mobile drawer override, regression guard, screenshots | §19 (28/28 Playwright checks locally and on the deployed site, 242/242 unit tests, all CI gates) | `Escape` dismissal, a close glyph, and a committed Playwright harness remain open follow-ups |

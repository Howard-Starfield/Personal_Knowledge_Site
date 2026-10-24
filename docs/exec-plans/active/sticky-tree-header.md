# Execution Plan: Phase X — A sticky folder header in the Explorer tree

| Field           | Value                                                            |
| --------------- | ---------------------------------------------------------------- |
| Status          | Complete                                                         |
| Owner           | Site maintainer (agent)                                          |
| Created         | 2026-10-24                                                       |
| Updated         | 2026-10-24                                                       |
| Baseline commit | `8c61adf7b0cb78bb75176bc9fce6425e2322d8aa`                       |
| Target branch   | `fix/sticky-tree-header`                                         |
| PR              | _filled after the pull request is opened_                        |
| PRD phase       | Public-learning baseline; navigation of published study material |
| Related ADRs    | None required (see §9)                                           |

## 1. Objective

The Explorer tree holds a lot of learning items — one course folder carries
fifty-odd lessons — so collapsing a folder again means scrolling all the way
back up to its title.

Observable outcome: a folder's title stays pinned to the top of the tree while
its children scroll, so the folder you are inside is always one click away,
and the folder above it reappears as you scroll back up.

## 2. Non-goals

- No change to the tree's markup, behaviour, or the Explorer's package.
- No change to the mobile drawer, the course pages, or any content.
- No new JavaScript.

## 3. Acceptance gates

- [ ] G1 — a folder header keeps its position while the tree scrolls.
- [ ] G2 — the header is opaque, so items do not show through it.
- [ ] G3 — the behaviour holds in the desktop sidebar and in the mobile drawer.
- [ ] G4 — the required checks pass.

## 4. Instruction sources

| Scope/path  | Instruction file    | Relevant rules                                                        |
| ----------- | ------------------- | --------------------------------------------------------------------- |
| Repository  | `AGENTS.md`         | Scope custom styles; no broad selectors; required checks; PR boundary |
| Nested path | `content/AGENTS.md` | Not touched                                                           |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                           | Official URL                       | Verified date | Installed source file/symbol                   | Finding                                                                                                                                                       |
| ---------------------------------------------------------- | ---------------------------------- | ------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The tree markup is a folder title followed by its children | the built page                     | 2026-10-24    | `.explorer-content li > .folder-container`     | `<li><div class="folder-container nav-folder-title tree-item-self">…</div><div class="folder-outer"><ul class="content tree-item-children">…</ul></div></li>` |
| The tree is its own scroll container on desktop            | the repository                     | 2026-10-24    | `quartz/styles/custom.scss`                    | `.explorer-content { min-height: 0; overflow-y: auto; }`                                                                                                      |
| The tree is its own scroll container on mobile             | the repository                     | 2026-10-24    | `quartz/styles/custom.scss` (the mobile block) | The drawer gives `.explorer .explorer-content` a fixed box with `overflow-y: auto`                                                                            |
| The Explorer package owns the tree                         | `@quartz-community/explorer@0.1.0` | 2026-10-24    | `dist/index.js`                                | The package renders the tree; the sticky behaviour is a style, not a behaviour change                                                                         |

## 7. Repository reconnaissance

### Current behavior reproduced

The tree renders a folder as a title followed by its children. When a course
folder is expanded, its title scrolls out of view with the rest of the list,
so the only way to collapse it again is to scroll back to the top.

### Relevant code map

| Area        | File/symbol                        | Current responsibility     | Expected change                   |
| ----------- | ---------------------------------- | -------------------------- | --------------------------------- |
| Tree styles | `quartz/styles/custom.scss`        | The site's Explorer styles | One sticky rule for folder titles |
| Tree markup | `@quartz-community/explorer@0.1.0` | Renders the tree           | Unchanged                         |

### Existing tests and fixtures

- `npx prettier . --check`, `npm test`, `npx quartz build` — the usual gates.

## 8. Contracts and invariants

### Content identity

- [x] No content file touched.

### Graph

- [x] No link added or removed.

### Security/data

- [x] No new script, request, or storage write.

## 9. Proposed design

One rule, in the site's own stylesheet, outside the desktop-only media query so
that it applies to the sidebar and to the mobile drawer alike:

```scss
.explorer-content li > .folder-container {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--light);
}
```

`position: sticky` inside the tree's scroll container keeps the title of the
folder you are inside pinned to the top of the tree. Because the rule is
scoped to `li > .folder-container`, every level of the tree gets it, and a
deeper folder's title paints over the shallower one — so the header you see
while scrolling deep into a lesson list is the one you want to collapse, and
the one above it returns as you scroll back up.

The background is the theme's own page colour, so the header is opaque in both
light and dark mode, and nothing shows through it.

### Alternatives considered

| Alternative                                   | Benefit                             | Problem                                                         | Decision   |
| --------------------------------------------- | ----------------------------------- | --------------------------------------------------------------- | ---------- |
| A JavaScript "collapse" button on each folder | A visible control                   | New runtime behaviour, a listener lifecycle, and an ADR         | Rejected   |
| A back-to-top button in the tree              | A quick way up                      | Still does not show which folder you are in, and adds a control | Rejected   |
| Sticky folder titles                          | The parent is always one click away | —                                                               | **Chosen** |

ADR status: **not required.** A scoped style in the site's own stylesheet; no
package, framework, or behaviour change.

## 10. Data and schema changes

None.

## 11. File touch plan

| Order | File/path                                      | Change                            | Reason                     | Risk |
| ----: | ---------------------------------------------- | --------------------------------- | -------------------------- | ---- |
|     1 | `quartz/styles/custom.scss`                    | One sticky rule for folder titles | The parent stays reachable | Low  |
|     2 | `docs/exec-plans/active/sticky-tree-header.md` | This plan                         | `AGENTS.md` requires one   | None |

## 12. Incremental implementation steps

### Step 1 — The rule

- Change: the sticky rule.
- Verification: the built page; a Playwright check of the computed position.
- Evidence: §19.
- Rollback point: revert the stylesheet.

### Step 2 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior              | Command                         | Expected result |
| --------------------- | ------------------------------- | --------------- |
| Formatting            | `npx prettier --check`          | Clean           |
| Types                 | `npx tsc --noEmit`              | Clean           |
| The unit suite passes | `npm test`                      | All pass        |
| The site builds       | `npx quartz build`              | Exit 0          |
| The Worker dry run    | `npx wrangler deploy --dry-run` | Exit 0          |

### End-to-end/UI

| Flow                          | Viewport | Evidence                                                                                   |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| A folder header stays pinned  | 1440x900 | The computed `position` is `sticky` and the header's `top` is 0 while the tree is scrolled |
| The same in the mobile drawer | 390x844  | Screenshot                                                                                 |
| The header is opaque          | 390x844  | The computed background is `var(--light)`                                                  |

### Accessibility

Nothing changes for a keyboard or screen-reader user: the folder title is the
same button, in the same place in the tab order, with the same accessible
name. It is now also visible while the list scrolls.

### Security

Not applicable.

### Performance

One `position: sticky` per folder header; the browser handles it on the
compositor. No measurable effect.

## 14. Migration and compatibility

- Existing content/data migration: none.
- Base/head ID preservation: no content changed.
- Backward-compatible window: browsers without `position: sticky` keep the old
  behaviour.
- Deployment order: merge to `v5`; Vercel rebuilds.
- User-visible impact: the folder you are inside stays at the top of the tree.

## 15. Deployment plan

- Preview: the local build in `public/`, served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the live tree, expanded and scrolled.
- Production approval: the owner asked for it on 2026-10-24.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                   | Impact                      | How it is resolved                                                                               | Stop condition? |
| ---------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------ | --------------- |
| Nested folder titles overlap while stuck       | Two titles at the same spot | The deeper title paints over the shallower one, so the header shown is the folder you are inside | No              |
| The header is transparent                      | Items show through it       | The rule sets the theme's page colour as its background                                          | No              |
| The sticky element is not the scroller's child | It would not stick          | The rule targets `li > .folder-container`, which is inside the tree's own scroll container       | No              |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — no link added.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved.
3. Could unpublished content become public? **No** — nothing published here.
4. Could one principal access another's data? **No.**
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No.**
7. Does optional feature failure break article reading? **No** — the tree still
   works without the rule.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — unchanged.

## 19. Completion evidence

### 19.1 Commands and results

```text
<pending>
```

### 19.2 Generated artifacts inspected

<pending>

### 19.3 UI evidence

<pending>

### 19.4 Deviations from plan

<pending>

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

| Date | Commit | Work completed | Evidence | Remaining |
| ---- | ------ | -------------- | -------- | --------- |
|      |        |                |          |           |

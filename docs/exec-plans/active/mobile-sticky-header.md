# Execution Plan: Phase X — Opaque mobile sticky header

| Field           | Value                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Status          | Complete                                                                                         |
| Owner           | Site maintainer (agent)                                                                          |
| Created         | 2026-10-24                                                                                       |
| Updated         | 2026-10-24                                                                                       |
| Baseline commit | `f5ead2762c1fcf1b267d6386f29f86f2cf46a339`                                                       |
| Target branch   | `fix/mobile-sticky-header`                                                                       |
| PR              | [#22](https://github.com/Howard-Starfield/Personal_Knowledge_Site/pull/22) (merged as `3959969`) |
| PRD phase       | Public-learning baseline; mobile reading experience                                              |
| Related ADRs    | None required                                                                                    |

## 1. Objective

On a phone, the sticky strip at the top of every page — the menu toggle and
the site title — must be opaque, so the page does not scroll underneath it and
collide with it.

Observable outcome: at 390 x 844, scrolled into the course table, the strip
paints over the content behind it instead of letting the table text run
through the site title.

## 2. Non-goals

- No change to the strip's height, spacing, or typography.
- No change to the desktop layout.
- No change to the drawer's behaviour, the course table, or any content.

## 3. Acceptance gates

- [ ] G1 — the mobile `.sidebar.left` computes to an opaque background.
- [ ] G2 — the desktop `.sidebar.left` is unchanged.
- [ ] G3 — the required checks pass.
- [ ] G4 — the live site shows an opaque strip after deployment.

## 4. Instruction sources

| Scope/path | Instruction file | Relevant rules                        |
| ---------- | ---------------- | ------------------------------------- |
| Repository | `AGENTS.md`      | Scoped custom styles; required checks |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                   | Official URL                       | Verified date | Installed source file/symbol                                                                     | Finding                                                                                                  |
| -------------------------------------------------- | ---------------------------------- | ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| On mobile the left sidebar is the sticky top strip | `@quartz-community/explorer@0.1.0` | 2026-10-24    | `explorer_default` → `.page > #quartz-body .sidebar.left:has(.explorer) { position: sticky; … }` | The package makes it sticky, so it must be opaque                                                        |
| The site overrides that background to transparent  | the repository                     | 2026-10-24    | `quartz/styles/custom.scss` mobile block → `.sidebar { background: transparent }`                | The site stylesheet is unlayered, so it wins over the package's layered `background-color: var(--light)` |

## 7. Repository reconnaissance

### Current behavior reproduced

```text
$ python scratch/cc-scope/sticky_probe.py
{'tag': 'div', 'cls': 'left sidebar', 'position': 'sticky', 'top': 0,
 'height': 85, 'background': 'rgba(0, 0, 0, 0)', 'zIndex': '1',
 'text': 'Knowledge FieldbookGraph ViewLoading gra'}
```

The strip is sticky and fully transparent, so the course table's rows scroll
under the site title. The screenshot `scratch/cc-scope/live-course-table-linked.png`
shows "KNOWLEDGE FIELDBOOK" printed over row 56's title.

### Relevant code map

| Area             | File/symbol                              | Current responsibility                 | Expected change                       |
| ---------------- | ---------------------------------------- | -------------------------------------- | ------------------------------------- |
| Mobile top strip | `quartz/styles/custom.scss` mobile block | `.sidebar { background: transparent }` | `.sidebar.left` paints `var(--light)` |

### Existing tests and fixtures

- `scripts/mobile-explorer-panel.test.mjs` — the compiled-CSS guard for the
  mobile drawer; it proves the desktop rules stay outside the mobile query and
  is unaffected by this change.

## 8. Contracts and invariants

### Content identity

- [x] No content file touched; 357 entities and 357 unique IDs unchanged.

### Graph

- [x] No link changed; the relationship count stays at 1719.

### Security/data

- [x] No secret or private data enters static output.

## 9. Proposed design

One declaration, in the existing mobile media query: the left sidebar — which
on mobile is the sticky strip — gets `background-color: var(--light)`.

The rule stays inside the mobile media query, so the desktop sidebar (a
column beside the article) is untouched. `var(--light)` is the theme's own
page background, so the strip reads as part of the page in both light and dark
mode.

### Alternatives considered

| Alternative                                | Benefit                                          | Problem                                                                             | Decision   |
| ------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------- | ---------- |
| Make the strip non-sticky on mobile        | No overlap, no bar                               | The menu toggle scrolls away and the menu becomes unreachable                       | Rejected   |
| Add a background only to the title element | Smaller bar                                      | The strip's contents are spread across it; the toggle would still sit over the page | Rejected   |
| Opaque sticky strip                        | Menu stays reachable; content is cleanly cut off | A solid bar across the top of a phone screen                                        | **Chosen** |

ADR status: **not required.** A scoped style change; no framework, dependency,
schema, identity, or topology change.

## 10. Data and schema changes

None.

## 11. File touch plan

| Order | File/path                                        | Change                     | Reason                          | Risk |
| ----: | ------------------------------------------------ | -------------------------- | ------------------------------- | ---- |
|     1 | `quartz/styles/custom.scss`                      | Opaque mobile sticky strip | Stop the page colliding with it | Low  |
|     2 | `docs/exec-plans/active/mobile-sticky-header.md` | This plan                  | `AGENTS.md` requires a plan     | None |

## 12. Incremental implementation steps

### Step 1 — Make the strip opaque

- Change: one declaration in the mobile media query.
- Verification: computed background and a screenshot at 390 x 844.
- Evidence: §19.
- Rollback point: revert the single file.

### Step 2 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behavior   | Command                         | Expected result              |
| ---------- | ------------------------------- | ---------------------------- |
| Formatting | `npx prettier --check`          | Clean                        |
| Types      | `npx tsc --noEmit`              | Clean                        |
| Unit tests | `npm test`                      | 242 tests, 0 failures        |
| Content    | `npm run validate:content`      | 357 entities, 357 unique IDs |
| Graph      | `npm run validate:graph`        | 1719 relationships           |
| Build      | `npx quartz build`              | Exit 0                       |
| Worker     | `npx wrangler deploy --dry-run` | Exit 0                       |

### End-to-end/UI

| Flow                               | Viewport | Evidence                                 |
| ---------------------------------- | -------- | ---------------------------------------- |
| Scroll into the course table       | 390x844  | Screenshot before and after              |
| The strip paints over the content  | 390x844  | Computed background `rgb(250, 248, 248)` |
| The menu toggle is still reachable | 390x844  | The drawer still opens                   |

### Accessibility

No new control and no change to the accessible name or focus order. The strip
keeps its contrast against the page background because it now uses the same
background colour as the page.

### Security

Not applicable.

## 14. Migration and compatibility

No migration. The change is a background colour inside a media query.

## 15. Deployment plan

- Preview: the local build in `public/`, served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge to `v5`; Vercel rebuilds.
- Smoke tests: the live course page, scrolled into the table.
- Production approval: the owner asked for the mobile experience to be
  improved and for the material to be findable.

## 16. Rollback and recovery

Revert the merge commit; Vercel rebuilds. No user data is involved.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                        | Impact                                   | How it is resolved                                                                                                   | Stop condition? |
| ----------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- |
| A solid bar changes the mobile look | The top of every phone page gains a band | The band is the page background colour, so it reads as the page, not as an added element; checked in the screenshots | No              |
| The rule leaks above 800px          | The desktop sidebar becomes opaque       | The declaration is inside the mobile media query only; the desktop probe is unchanged                                | Yes             |

## 18. Adversarial review

1. Could generated navigation become a graph edge? **No** — no link changed.
2. Could a file move break IDs, links, notes, media, aliases, or routes?
   **No** — no file moved.
3. Could unpublished content become public? **No** — no content changed.
4. Could one principal access another's data? **No** — no data access.
5. Is any client identity/role trusted? **No.**
6. Is any new API or source field undocumented? **No.**
7. Does optional feature failure break article reading? **No** — a background
   colour.
8. Does D1 become an article source of truth? **No** — not applicable.
9. Can rollback preserve user data? **Yes** — nothing is written.
10. Are explicit links, tags, folders, and semantic relations distinct?
    **Yes** — unchanged.

## 19. Completion evidence

### 19.1 Commands and results

```text
npx prettier --check quartz/styles/custom.scss   All matched files use Prettier code style!
npx tsc --noEmit                                 clean
npm test                                         tests 242 | pass 242 | fail 0
npm run validate:content                         357 entities, 357 unique IDs
npm run validate:graph                           1719 relationships
npx quartz build --concurrency=1                 exit 0
npx wrangler deploy --dry-run                    exit 0
```

### 19.2 Generated artifacts inspected

- content manifest: unchanged.
- graph manifest: unchanged at 1719 relationships.
- Worker dry-run/build: exit 0.

### 19.3 UI evidence

Before: `scratch/cc-scope/live-course-table-linked.png` — the site title
printed over row 56 of the course table, and the computed background of the
strip was `rgba(0, 0, 0, 0)`.

After: `scratch/cc-scope/local-sticky-header.png` — the strip paints over the
content cleanly, with the computed background `rgb(250, 248, 248)`. The live
site reports the same value after the deployment, and the drawer's own
acceptance suite still passes 28/28 against production.

### 19.4 Deviations from plan

None.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Non-goals not implemented accidentally.
- [x] All acceptance gates pass.
- [x] Contracts/docs updated.
- [x] Tests/evidence attached.
- [x] Security/privacy review complete.
- [x] Migration/rollback documented.
- [x] Known limitations documented.
- [x] Plan completion log updated.
- [x] Plan ready to move from `active/` to `completed/`.

## 21. Completion log

| Date       | Commit                                   | Work completed              | Evidence                                                       | Remaining |
| ---------- | ---------------------------------------- | --------------------------- | -------------------------------------------------------------- | --------- |
| 2026-10-24 | `9e21634` → merged as `3959969` (PR #22) | Opaque mobile sticky header | §19 (computed background, before/after screenshots, all gates) | None      |

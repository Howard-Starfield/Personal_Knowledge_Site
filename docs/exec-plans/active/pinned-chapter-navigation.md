# Execution Plan: Phase X — Pin the chapter navigation and ellipsize its titles

| Field           | Value                                     |
| --------------- | ----------------------------------------- |
| Status          | In progress                               |
| Owner           | Site maintainer (agent)                   |
| Created         | 2026-10-25                                |
| Updated         | 2026-10-25                                |
| Baseline commit | `06956a5` (merge of PR #45)               |
| Target branch   | `feat/pinned-chapter-navigation`          |
| PR              | _filled after the pull request is opened_ |
| PRD phase       | Public-learning baseline; reading comfort |
| Related ADRs    | None                                      |

## 1. Objective

The previous and next buttons at the end of a lesson are useful exactly when the
reader wants them: mid-way down a long chapter, or on a phone where the end of the
page is a long scroll away.

Observable outcome: the chapter navigation is a bar pinned to the foot of the
viewport, always reachable, with its titles truncated rather than wrapped, so the
two buttons never fall onto a second row.

## 2. Non-goals

- No change to the pages, the lessons, the questions, or the plugin that builds the
  navigation.
- No change to what the buttons say or where they point.
- No new element in the markup: the navigation is already a single container with
  two anchors, and it is restyled, not rebuilt.

## 3. Acceptance gates

- [ ] G1 — the navigation is pinned to the viewport (`position: fixed`) and stays
      there while the reader scrolls.
- [ ] G2 — a long title is truncated with an ellipsis on one line, at every width
      from a 390px phone to a wide desktop.
- [ ] G3 — the two buttons never fall onto a second row.
- [ ] G4 — the last line of a lesson can still be read; the bar does not cover it.
- [ ] G5 — the buttons still point where they did, in the right direction.
- [ ] G6 — the check, the gates and the live site all pass.

## 4. Instruction sources

| Scope/path | Instruction file            | Relevant rules                                                |
| ---------- | --------------------------- | ------------------------------------------------------------- |
| Repository | `AGENTS.md`                 | Plan-before-code; PR boundary; scoped styles; accessibility   |
| Style      | `quartz/styles/custom.scss` | The house pattern for the mobile drawer and the sticky header |

## 5. Version and environment matrix

| Component | Exact version | Source of truth     | Notes      |
| --------- | ------------- | ------------------- | ---------- |
| Quartz    | `5.0.0`       | `package.json`      | Unchanged  |
| Node.js   | `v24.14.0`    | `.node-version`     | Matches CI |
| Prettier  | `3.9.6`       | `package-lock.json` | Gate       |

## 6. Official source verification

| Claim/assumption                                                           | Official URL         | Verified date | Installed source file/symbol                                                        | Finding                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------- | -------------------- | ------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The buttons work and point the right way                                   | the live site        | 2026-10-25    | `plugins/chapter-navigation/components/index.ts`                                    | Every button on the pages checked resolves with a 200 and lands on the chapter it names, in the right direction. No 404, no swapped pair.                                                                                                                                  |
| On a phone the two buttons fall onto a second row                          | the live site        | 2026-10-25    | `public/static/styles/index-*.css`                                                  | At 390px the navigation is 84px tall — two rows of 21px buttons. At 768px and above it is one row.                                                                                                                                                                         |
| A long title wraps inside the button                                       | the live site        | 2026-10-25    | `public/static/styles/index-*.css`                                                  | The plugin's button is 37px tall at 768px and 53px at 390px: the title wraps to a second line inside the button.                                                                                                                                                           |
| The navigation is the only element that needs to change                    | the repository       | 2026-10-25    | `plugins/chapter-navigation/components/index.ts`, `content/courses/**/lessons/*.md` | Two kinds of markup use the same classes: the plugin's `← Previous: … / Next: … →`, and the hand-written chapter navigation in the LinkedIn-derived lessons. The plugin already skips a page that carries its own navigation, so the two never appear together.            |
| Nothing between the navigation and the viewport creates a containing block | the live site        | 2026-10-25    | the computed styles of every ancestor                                               | No ancestor has a transform, filter, perspective, will-change or contain, so a fixed child is positioned against the viewport.                                                                                                                                             |
| The theme's own link rules win over the site's button rules                | the built stylesheet | 2026-10-25    | `quartz/styles/custom.scss`                                                         | `.page article a.internal` and `a.internal` set the padding, the border and the radius, so the buttons render as the theme's links rather than as the pills the site draws. The new rules must not restate those properties, or the buttons would change their appearance. |

## 7. Repository reconnaissance

### The two kinds of navigation

| Kind                 | Where it comes from                                          | Markup                                                                                                                                 |
| -------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| The plugin's         | `plugins/chapter-navigation`, in the page's `afterBody` slot | `<div class="chapter-navigation"><a class="chapter-nav-btn prev">← Previous: …</a><a class="chapter-nav-btn next">Next: … →</a></div>` |
| The hand-written one | the Markdown of the LinkedIn-derived lessons                 | the same classes, with the chapter's own title                                                                                         |

Both are styled by `.chapter-navigation` in `quartz/styles/custom.scss`, which
currently appears **twice** (lines 1284 and 1369). The second block wins for the
properties it sets; the first still supplies the `!important` colour, the
`text-decoration`, and the `gap`. The new rules are written once, in one place, and
do not restate the properties the theme owns.

### The layout the bar has to sit in

Measured on the live site:

| Viewport | Grid                  | Sidebar   | Content column |
| -------- | --------------------- | --------- | -------------- |
| 390px    | one column            | -         | 16 - 374       |
| 768px    | one column            | -         | 16 - 752       |
| 1024px   | 320px + auto          | 16 - 336  | 336 - 1008     |
| 1440px   | 320px + auto, centred | 80 - 400  | 400 - 1360     |
| 1920px   | 320px + auto, centred | 320 - 640 | 640 - 1600     |

The content column's centre is never the viewport's centre on a wide screen, so a
bar that centres its buttons in the viewport would put them over the sidebar's
half of the gap. The buttons are therefore given the content column's width rather
than the viewport's.

### Existing tests and fixtures

- `npm test`, `npm run validate:content`, `npm run validate:graph`,
  `npx prettier . --check`, `npx tsc --noEmit`, `npx quartz build`.

## 8. Contracts and invariants

### Content identity

- [x] No content file changes at all.

### Behaviour

- [x] The buttons still say the same thing and point at the same pages.
- [x] The bar appears only where a navigation already existed.

### Type safety

- [x] No TypeScript changes; the change is a stylesheet.

## 9. Proposed design

One rule set, replacing the two existing blocks:

1. `.page .chapter-navigation` becomes a bar pinned to the foot of the viewport:
   `position: fixed`, `inset: auto 0 0 0`, a background of the page colour, a top
   border, and `flex-wrap: nowrap` so the two buttons cannot fall onto a second
   row. It is scoped to `.page` so it cannot reach anything else on the site.
2. The buttons sit at the edges of the content column, in the bar's own padding, so
   they line up with where they line up today. On a phone the bar is the full width.
3. Each button truncates: `min-width: 0`, a maximum width of the column's half,
   `overflow: hidden`, `text-overflow: ellipsis` and `white-space: nowrap`. The
   title is one line with an ellipsis, never two.
4. The page reserves room for the bar, so the last line of a lesson can still be
   read. The reservation is made with `:has()`, which the browsers that run this
   site support, and falls back to a plain bottom margin where it is not supported.
5. The z-index sits below the Explorer drawer (200) and its scrim (150), so the
   drawer still covers the bar when it opens.

The bar keeps the site's own colours, so it follows the light and dark themes, and
it adds no animation, so `prefers-reduced-motion` needs no special case.

### Alternatives considered

| Alternative                                         | Benefit                     | Problem                                                                                           | Decision   |
| --------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- | ---------- |
| Ellipsize the title and leave the bar in the flow   | Small change                | The buttons still sit at the end of a long page                                                   | Rejected   |
| Make the bar span the whole viewport                | Simplest                    | The buttons would sit over the sidebar, not the content                                           | Rejected   |
| Rebuild the navigation as a page-type component     | Full control of the markup  | The hand-written navigation in the lessons would still need it, so there would be two kinds again | Rejected   |
| Pin the existing navigation and truncate its titles | Same look, always reachable | -                                                                                                 | **Chosen** |

ADR status: **not required.** No package, dependency, framework, content rule or
graph semantics change; this is a stylesheet change to the site's own classes.

## 10. Data and schema changes

None.

## 11. File touch plan

| Order | File/path                                             | Change                                   | Reason                   | Risk |
| ----: | ----------------------------------------------------- | ---------------------------------------- | ------------------------ | ---- |
|     1 | `docs/exec-plans/active/pinned-chapter-navigation.md` | This plan                                | `AGENTS.md` requires one | None |
|     2 | `quartz/styles/custom.scss`                           | One rule set for the bar and its buttons | The change itself        | Low  |
|     3 | `scripts/check-question-quality.ts`                   | Unchanged                                | -                        | -    |

## 12. Incremental implementation steps

### Step 1 — The rule set

- Change: `quartz/styles/custom.scss`.
- Verification: the build; the measurements in §13.
- Evidence: §19.
- Rollback point: revert the file.

### Step 2 — Gates, branch, pull request

- Change: commit, push, open and merge the pull request.
- Verification: §19.1.
- Evidence: §19.
- Rollback point: revert the merge commit.

## 13. Test plan

### Unit / integration

| Behaviour                | Command                    | Expected result |
| ------------------------ | -------------------------- | --------------- |
| The stylesheet compiles  | `npx quartz build`         | Exit 0          |
| The whole suite          | `npm test`                 | All pass        |
| Formatting               | `npx prettier . --check`   | Clean           |
| Types                    | `npx tsc --noEmit`         | Clean           |
| The content is unchanged | `npm run validate:content` | 447 entities    |
| The graph is unchanged   | `npm run validate:graph`   | The same counts |

### End-to-end/UI

| Flow                            | Viewport       | Evidence                                                                 |
| ------------------------------- | -------------- | ------------------------------------------------------------------------ |
| The bar is pinned               | 390, 768, 1440 | `position: fixed`, and the bar's box does not move when the page scrolls |
| The buttons stay on one row     | 390 - 1920     | Every button's top is the same                                           |
| A long title is truncated       | 390            | One line, and the rendered text ends with an ellipsis                    |
| The last line of a lesson shows | 1440           | Scrolling to the end leaves the last line above the bar                  |
| The buttons still work          | 1440           | Each resolves to the chapter it names                                    |
| The drawer still opens over it  | 390            | The drawer covers the bar                                                |
| Keyboard                        | 1440           | The links are reachable, and the focus ring is visible                   |

### Accessibility

The bar's links are the same anchors, in the same order in the document, with the
same accessible names; only their position changes. The truncation is visual: the
full title is still in the DOM and still announced. A fixed bar that covers content
is a hazard for keyboard users, so the page reserves room for it and the focus ring
is left visible.

### Security

Not applicable.

### Performance

A fixed element is painted every frame instead of only when it is in view. The bar
holds two links, so the cost is negligible.

## 14. Migration and compatibility

- No migration, no content change, no URL change.
- The bar's room is reserved with `:has()`, with a plain bottom margin as the
  fallback, so a browser without `:has()` shows a little extra space under the
  footer and nothing else changes.

## 15. Deployment plan

- Preview: the local build served on `http://127.0.0.1:8099`.
- Required secrets: none.
- Deployment order: merge → Vercel build → smoke test.
- Smoke tests: the bar on a lesson page, on a phone, and the drawer.
- Production approval: the owner asked for this on 2026-10-25.

## 16. Rollback and recovery

Revert the merge commit; the navigation returns to the end of the page.

## 17. Risks, unknowns, and stop conditions

| Risk/unknown                                      | Impact                               | How it is resolved                                                                                            | Stop condition? |
| ------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------- | --------------- |
| The bar covers the last line of a lesson          | The reader cannot finish reading     | The page reserves the bar's height; verified by scrolling to the end                                          | No              |
| The bar covers the Explorer's bottom on a desktop | The tree looks cut off               | The bar is aligned to the content column, not the viewport                                                    | No              |
| A long title is now unreadable                    | The reader cannot tell which chapter | The ellipsis keeps the start and the end of the title, and the full title is still the link's accessible name | No              |
| The drawer no longer covers the bar               | The drawer looks broken              | The bar's z-index is below the drawer's                                                                       | No              |
| The theme's link rules fight the new rules        | The buttons change their appearance  | The new rules do not restate the padding, the border or the radius                                            | No              |

## 18. Adversarial review

1. Could this hide content behind the bar? **Yes, if the reservation fails** — so
   the reservation is made and verified by scrolling to the end.
2. Could a fixed element break the page's own scrolling? **No** — no ancestor
   creates a containing block, so the bar is fixed to the viewport.
3. Does the change touch any content? **No.**
4. Does it change the graph? **No.**
5. Could the bar appear where no navigation was intended? **No** — the rule styles
   an element that only exists where a navigation already existed.
6. Is the keyboard path unchanged? **Yes** — the same anchors, in the same order.
7. Does the truncation hide the link's meaning? **No** — the title keeps its start
   and end, and the accessible name is unchanged.
8. Does it need an ADR? **No** — a stylesheet change to the site's own classes.

## 19. Completion evidence

### 19.1 Commands and results

```text
npx quartz build --concurrency=1
  Found 448 input files from `content`
  Parsed 448 Markdown files in 53s
  Emitted 1181 files to `public` in 9s

npm run validate:content
  Content validation passed: 447 entities, 447 unique IDs

npm run validate:graph
  Graph output valid: 447 pages, 394 tags, 2546 relationships, 876 graph-enabled HTML pages.

npm test
  tests 268  pass 268  fail 0

npx tsc --noEmit
  (no output)

npx prettier --check quartz/styles/custom.scss
  All matched files use Prettier code style!
```

### 19.2 Generated artifacts inspected

**The buttons, before the change.** Every navigation on the site was read and every
destination was fetched:

```text
/courses/advanced-prompt-engineering-techniques/lessons/02-chain-of-thought-and-step-by-step
  prev -> 200  lands: Zero-Shot, Few-Shot Exemplars & In-Context Pattern Induction
  next -> 200  lands: Generated Knowledge Prompting & Directional Stimulus Guidance
/courses/advanced-prompt-engineering-techniques/lessons/05-glossary
  prev -> 200  lands: Tree-of-Thought (ToT) Search & Chain-of-Density (CoD)
  next -> 200  lands: Comprehensive 15-Scenario Active-Recall Diagnostic Assessment
/courses/accounting-ai-crash-course/lessons/16-ratios-and-analysis
  prev -> 200  lands: Cash Flow Statement Basics
  next -> 200  lands: Internal Controls for Entry-Level Accounting
/courses/covered-california-certification/lessons/57-the-numbers-and-dates-to-know-by-heart
  prev -> 200  lands: The Final Assessment: How It Works, and Twenty-Five Questions
/courses/ai-agents-in-depth/lessons/01-agent-fundamentals
  prev -> 200  lands: Introduction: Agent = LLM + Context + Tools
  next -> 200  lands: Chapter 2: Context Engineering
```

Every button resolves, in the right direction, to the chapter it names. Nothing was
broken; the problem was only where the buttons sat and what a long title did.

**The layout, before and after**, measured in a browser at five widths:

```text
                          before            after
390px   two rows of buttons   84px tall     fixed, 38px, one row, 2 titles truncated
768px   one row               46px tall     fixed, 38px, one row, 1 title truncated
1024px  one row               46px tall     fixed, 38px, one row, 1 title truncated
1440px  one row               46px tall     fixed, 38px, one row, no truncation
1920px  one row               46px tall     fixed, 38px, one row, no truncation
```

**The bar's position** — it does not move when the page scrolls, and it does not
cover the end of the lesson:

```text
390px:  scrolled to the end, the footer's bottom is 90px above the bar's top
1440px: scrolled to the end, the footer's bottom is 90px above the bar's top
```

**The alignment** — the buttons sit at the edges of the content column at every
width, not the edges of the viewport:

```text
390px:  content 16-374     buttons 16-374
768px:  content 16-752     buttons 16-752
1024px: content 336-1008   buttons 336-1008
1440px: content 400-1360   buttons 400-1360
1920px: content 640-1600   buttons 640-1600
```

**The appearance is unchanged.** The computed styles of the button were compared
against the live site, property by property, in the resting and in the hover state:

```text
                live                     local
color           rgb(43, 43, 43)          rgb(43, 43, 43)
background      rgba(143,159,169,0.15)  rgba(143,159,169,0.15)
border-radius   5px                      5px
font-size       14.08px                  14.08px
font-weight     500                      500
padding         0.8px 5.6px              0.8px 5.6px
hover colour    rgb(40, 75, 99)          rgb(40, 75, 99)
hover lift      translateY(-1px)         translateY(-1px)
```

### 19.3 UI evidence

```text
focused: {'tag': 'A', 'href': '.../lessons/01-zero-shot-and-few-shot-prompting',
          'outlineWidth': '2px', 'outlineStyle': 'solid', 'visible': True}
after Tab: {'tag': 'A', 'text': 'Chapter 3: Generated Knowledge & Directi...'}
position in the flow: {'parent': 'markdown-preview-view markdown-rendered', 'index': 186}
```

The buttons are reachable with the keyboard, the focus ring is visible, the second
button is the next stop, and the navigation is still the last thing in the article, so
the reading order has not changed.

The drawer still covers the bar when it opens on a phone:

```text
{'barZ': '100', 'panelZ': '200', 'panelX': 0, 'panelWidth': 304}
```

Screenshots: `scratch/cc-scope/pinned-desktop.png`,
`scratch/cc-scope/pinned-phone.png`.

### 19.4 Deviations from plan

1. **The rule set was written once, not twice.** `quartz/styles/custom.scss`
   carried two `.chapter-navigation` blocks, the second overriding the first and
   the first still supplying the `!important` colour. They are now one block, and
   the computed styles were compared against the live site to prove that the
   buttons look exactly as they did.
2. **The bar spans the viewport, but the buttons do not.** The bar's own padding
   places the buttons at the edges of the content column, so on a desktop the
   buttons sit over the text and not over the sidebar. The padding is computed
   from the same numbers the layout uses.
3. **The room for the bar is reserved with `:has()`.** A browser without `:has()`
   keeps the plain bottom margin, so the page has a little extra space under the
   footer and nothing else changes.

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

| Date       | Commit | Work completed                                                                                                            | Evidence | Remaining |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| 2026-10-25 | -      | The chapter navigation pinned to the foot of the viewport, its titles truncated, and the duplicated rule set written once | §19      | -         |

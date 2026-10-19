# Execution Plan: Restyle Callouts with Corner-Mitered Scribe and Floating Title Badge

| Field           | Value                                    |
| --------------- | ---------------------------------------- |
| Status          | Complete                                 |
| Owner           | Antigravity / Howard                     |
| Created         | 2026-09-29                               |
| Updated         | 2026-09-29                               |
| Baseline commit | 068520b1abde57dc795d0e15ea4138e4786d065d |
| Target branch   | main                                     |
| PR              | N/A                                      |
| PRD phase       | Visual / Design Polish                   |
| Related ADRs    | N/A                                      |

## 1. Objective

Restyle Quartz markdown callouts (`.callout`) in `quartz/styles/custom.scss` to match the gaming guide badge style (Attachment 2 / Maxroll style):

1. **Title Badge**: Transform `.callout-title` into a solid-background badge/pill floating over the top border (`margin-top: -1.8rem`, `position: relative`, `overflow: visible`), styled with bold uppercase text (`font-size: 0.74rem`, `font-weight: 750`, `letter-spacing: 0.08em`) in contrasting dark text against the accent color.
2. **Corner-Mitered Left Scribe**: Implement `border-left: 4.5px solid var(--color)` with `border-radius: 8px`. In browser box rendering, the corner joint between the 4.5px left border and the 1px top/bottom border curves smoothly around the corner radius, naturally decreasing in thickness and rounding into the card edges.
3. Preserve the site's existing color variables and types (`question`, `warning`, `note`, `tip`, `info`, `todo`, `danger`, `failure`, `example`, `abstract`).
4. Maintain collapsible callout functionality with fold icons and hover states.

## 2. Non-goals

- Altering Markdown syntax or Quartz OFM plugins.
- Modifying Quartz core files (`quartz/styles/callouts.scss`).
- Changing color tokens or callout types.
- Modifying unrelated SCSS rules.

## 3. Acceptance Gates

- [x] `.callout` container has `overflow: visible` to allow the floating badge to extend across the top border.
- [x] `.callout` container has `border-left: 4.5px solid var(--color)` and `border-radius: 8px` to achieve the decreasing-width corner-mitered scribe.
- [x] `.callout-title` renders as an inline-flex badge with solid `--color` background, dark text `#111113`, uppercase bold typography, and small pill border radius (4px).
- [x] High contrast text is ensured for darker callouts (`danger`, `failure` using `#ffffff`, `note` using `var(--light)`).
- [x] Collapsible callouts remain interactive and visually aligned.
- [x] Formatting and TypeScript checks pass (`tsc --noEmit`, prettier check).
- [x] Quartz build emits successfully with bundled CSS verified in `public/index-*.css`.

## 4. Instruction Sources

| Scope/path    | Instruction file            | Relevant rules                                                |
| ------------- | --------------------------- | ------------------------------------------------------------- |
| Repository    | `AGENTS.md`                 | Quartz 5 static framework, plan-before-code, no core patching |
| Custom Styles | `quartz/styles/custom.scss` | Custom site CSS overrides                                     |

## 5. Version and Environment Matrix

| Component | Exact version/commit | Source of truth | Notes                 |
| --------- | -------------------- | --------------- | --------------------- |
| Quartz    | 5.0.0                | `package.json`  | Pinned Quartz 5       |
| Node      | >=22                 | `package.json`  | Windows local runtime |

## 6. Official Source Verification

- Pinned Quartz Callout Styles: `quartz/styles/callouts.scss`
- Project Callout Overrides: `quartz/styles/custom.scss` (lines 815-950)
- DOM structure emitted by `@quartz-community/obsidian-flavored-markdown`:
  `<blockquote class="callout [type]" data-callout="[type]"><div class="callout-title"><div class="callout-icon"></div><div class="callout-title-inner"><p>[title]</p></div>[fold]</div><div class="callout-content">...</div></blockquote>`

## 7. Exact Files Expected to Change

- `quartz/styles/custom.scss`: Update `.callout` block.
- `docs/exec-plans/active/restyle-callouts-corner-miter-badge.md`: Active execution plan.

## 8. Incremental Steps & Verification Evidence

1. Updated `.callout` rules in `quartz/styles/custom.scss`.
2. Ran Prettier to format SCSS.
3. Executed `tsc --noEmit`: 0 errors.
4. Executed `npx.cmd tsx quartz/bootstrap-cli.mjs build`: successfully parsed and emitted files in 2s.
5. Inspected `public/index-cd69f6cd.css`: confirmed compiled `.page .callout` and `.page .callout .callout-title` rules are active.

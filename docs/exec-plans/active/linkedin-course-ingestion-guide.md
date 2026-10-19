# Execution Plan: Codifying the LinkedIn Course Ingestion & Feynman Pedagogical Standard

| Field           | Value                                |
| --------------- | ------------------------------------ |
| Status          | Complete                             |
| Owner           | Howard                               |
| Created         | 2026-09-29                           |
| Updated         | 2026-09-29                           |
| Baseline commit | `HEAD`                               |
| Target branch   | `main`                               |
| PRD phase       | Content & Course Baseline / Runbooks |
| Related ADRs    | ADR-0001, ADR-0002                   |

## 1. Objective

Formally codify the end-to-end LinkedIn Learning course intake, PDF extraction, Feynman pedagogical rewriting, and active-recall assessment pipeline into a critical, authoritative repository runbook (`docs/runbooks/LINKEDIN_COURSE_INGESTION.md`). Cross-reference this runbook in `docs/README.md` and `docs/templates/content_intake_handoff_prompt.md` to ensure any future maintainer or agent ingesting the remaining 86 courses adheres to the exact same rigorous standards.

## 2. Non-goals

- Modifying existing published course contents in `content/courses/how-to-be-an-agent-boss/` or `content/courses/ai-agents-in-depth/`.
- Changing Quartz core layout or plugin code.
- Batch-generating the remaining 86 courses in this change.

## 3. Acceptance gates

- [x] Create `docs/runbooks/LINKEDIN_COURSE_INGESTION.md` with exhaustive instructions covering:
  - Critical invariants (read-only source authority, zero transcript leakage, immutable UUIDv4, KaTeX escaping).
  - Python extraction pipeline usage (`scripts/extract-linkedin-courses.py` + `PyMuPDF`).
  - Feynman pedagogical framework (central metaphors, `[!warning]` callouts, worked math).
  - Auxiliary PDF processing contracts (5-Pillar Glossary, 7-Phase Lab Guide).
  - 15-question scenario assessment format with Feynman takeaways and 4-tier scoring rubric.
  - Dual-subagent Implementer + Independent Verifier verification protocol.
- [x] Update `docs/README.md` to index the new runbook under Project Authority.
- [x] Update `docs/templates/content_intake_handoff_prompt.md` to link and reference the runbook.
- [x] Verify content and repo integrity via `npm.cmd run validate:content`, `npm.cmd test`, and `npx.cmd quartz build`.

## 4. Instruction sources

| Scope/path | Instruction file                                   | Relevant rules                                            |
| ---------- | -------------------------------------------------- | --------------------------------------------------------- |
| Repository | `AGENTS.md`                                        | Content invariants, plan-before-code, source verification |
| Content    | `content/AGENTS.md`                                | Frontmatter schemas, lessonOrder, question banks          |
| Contracts  | `docs/contracts/CONTENT_MODEL.md`                  | Course/Lesson models, Study.md disposition                |
| Templates  | `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` | Question stem, distractor, explanation guidelines         |

## 5. Verification commands

- `npm.cmd run validate:content`
- `npm.cmd test`
- `node scripts/validate-graph-output.mjs`
- `npx.cmd quartz build`

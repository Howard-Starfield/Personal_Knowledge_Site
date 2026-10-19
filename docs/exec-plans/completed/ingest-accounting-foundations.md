# Execution Plan: Ingesting "Accounting Foundations"

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Status          | Completed                                             |
| Owner           | Howard                                                |
| Created         | 2026-09-29                                            |
| Updated         | 2026-09-29                                            |
| Baseline commit | `HEAD`                                                |
| Target branch   | `main`                                                |
| PRD phase       | Course Ingestion Baseline / LinkedIn Learning Runbook |
| Related ADRs    | ADR-0001, ADR-0002                                    |

---

## 1. Objective

Transform the downloaded LinkedIn Learning course **Accounting Foundations** by professors Jim Stice and Earl Stice into an authoritative public course on this Quartz 5 site (`content/courses/accounting-foundations/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, the auxiliary glossary PDF (`Glossary_Accounting Foundations.pdf`) will be expanded into a dedicated 5-Pillar Architectural Taxonomy & Dictionary chapter, a 15-question active-recall scenario assessment will be authored, and each unit will be audited using a sequential Implementer + Independent Verifier subagent workflow.

---

## 2. Non-Goals

- Modifying existing published courses (`content/courses/ai-agents-in-depth/`, `content/courses/how-to-be-an-agent-boss/`, `content/courses/account-management-maintaining-relationships/`).
- Copying raw transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once.

---

## 3. Acceptance Gates

- [x] Course setup at `content/courses/accounting-foundations/index.md` with:
  - Canonical lowercase UUIDv4 `id` (`ba0aaa71-2556-4246-8c74-ab63aad30ffe`).
  - `type: course`, `publish: true`, `status: active`, `difficulty: beginner`, `learningOutcomes` array.
  - Curated overview prose, instructor attribution, and roadmap table.
- [x] Core Feynman lessons authored below `lessons/`:
  - `00-introduction.md` (LessonOrder 1): The Language of Business & The 4 Flavors of Accounting.
  - `01-balance-sheet.md` (LessonOrder 2): Financial Accounting — The Balance Sheet & The Accounting Equation.
  - `02-income-and-cash-flow.md` (LessonOrder 3): Income Statement & Cash Flow Statement — Profitability vs. Liquidity.
  - `03-financial-statement-analysis.md` (LessonOrder 4): Financial Statement Analysis — Ratios, Common Size & DuPont Framework.
  - `04-managerial-costing-and-budgeting.md` (LessonOrder 5): Managerial Accounting — Cost Allocation, Overhead & Budgets.
  - `05-breakeven-variance-and-evaluation.md` (LessonOrder 6): Managerial Analysis — Breakeven Mechanics, Variance & Performance.
  - `06-income-taxes-filing.md` (LessonOrder 7): Income Tax Dynamics — Marginal Brackets, Deductions & Capital Gains.
  - `07-tax-planning-strategies.md` (LessonOrder 8): Strategic Tax Planning — Time Shifting, Entity Pockets & Character Transformation.
- [x] Auxiliary Glossary Chapter:
  - `08-glossary.md` (LessonOrder 9): 5-Pillar Architectural Taxonomy Map & A–Z Conceptual Dictionary with Authoritative Definition, Feynman Intuition, and Operational Context.
- [x] 15-Question Active-Recall Scenario Assessment:
  - `09-final-assessment.md` (LessonOrder 10): Exactly 15 scenario-based 4-option questions with collapsible `<details class="quiz-answer">` accordions containing Correct Answer, Authoritative Explanation, and Feynman Takeaway, concluding with a 4-tier rubric.
- [x] Bottom `.chapter-navigation` buttons (`prev` / `next`) on all lessons.
- [x] Currency symbols strictly escaped as `\$` (or backticked) across all Markdown prose and tables to prevent KaTeX rendering crashes.
- [x] Course registration in `content/index.md` (Featured Courses).
- [x] Source tracking index updated via `python scripts/extract-linkedin-courses.py --sync-index`.
- [x] Verification gates pass:
  - `npm.cmd run validate:content` reports 0 errors.
  - `npm.cmd test` passes (189+ tests).
  - `node scripts/validate-graph-output.mjs` passes.
  - `npx.cmd quartz build` succeeds without syntax or broken link errors.

---

## 4. Instruction Sources

| Scope / Path        | Instruction File                                   | Relevant Rules                                                                                           |
| ------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Repository Root     | `AGENTS.md`                                        | Content invariants, strict TypeScript, no placeholder content, source verification                       |
| Ingestion Runbook   | `docs/runbooks/LINKEDIN_COURSE_INGESTION.md`       | Extraction commands, Feynman pedagogical engine, auxiliary PDF processing, 15-question assessment schema |
| Content Contract    | `docs/contracts/CONTENT_MODEL.md`                  | Course/Lesson frontmatter schemas, `courseId`, `lessonOrder`, `Study.md` disposition                     |
| Content Subtree     | `content/AGENTS.md`                                | Public content boundary, UUIDv4 immutability, link resolution                                            |
| Assessment Template | `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` | Active recall standards, scenario design, distractor plausibility                                        |

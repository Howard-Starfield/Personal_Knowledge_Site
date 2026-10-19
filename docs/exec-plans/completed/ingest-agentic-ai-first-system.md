# Execution Plan: Ingesting "Agentic AI: Build Your First Agentic AI System"

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Status          | Completed                                             |
| Owner           | Howard                                                |
| Created         | 2026-09-30                                            |
| Updated         | 2026-09-30                                            |
| Baseline commit | `HEAD`                                                |
| Target branch   | `main`                                                |
| PRD phase       | Course Ingestion Baseline / LinkedIn Learning Runbook |
| Related ADRs    | ADR-0001, ADR-0002                                    |

---

## 1. Objective

Transform the downloaded LinkedIn Learning course **Agentic AI: Build Your First Agentic AI System** by AI researcher, Microsoft Cloud Advocate, and LinkedIn Top Voice **Aishwarya Srinivasan** into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/agentic-ai-build-your-first-agentic-ai-system/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep algorithmic derivations of agentic reasoning loops, architectural ASCII diagrams, worked calibration metrics, concrete Python ReAct code, an architectural taxonomy glossary chapter, a 15-scenario active-recall assessment, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses (`ai-agents-in-depth`, `how-to-be-an-agent-boss`, `account-management-maintaining-relationships`, `accounting-foundations`, `advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms`, `advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications`, `advanced-prompt-engineering-techniques`).
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/agentic-ai-build-your-first-agentic-ai-system/`
- Course ID: `7988d9f7-7121-4897-8ea1-d07d96146cfa`
- Slug: `agentic-ai-build-your-first-agentic-ai-system`

| Order | Lesson File                                         | Title                                                                            | UUIDv4                                 |
| ----- | --------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                                          | Course Overview & Syllabus: Building Production Agentic AI                       | `7988d9f7-7121-4897-8ea1-d07d96146cfa` |
| 1     | `lessons/00-introduction-and-autonomy-levels.md`    | Foundations of Agentic AI & The 5 Levels of Autonomy                             | `c1877b8d-ea94-4386-a622-4027cbb6983c` |
| 2     | `lessons/01-agentic-lifecycle-cc-cd.md`             | The Agentic AI Lifecycle: Continuous Calibration & Development (CC/CD)           | `5c81fe45-4ec7-4071-8c6a-2aa61de1eadf` |
| 3     | `lessons/02-building-the-baseline-agent.md`         | Architecting the Baseline Agent: ReAct Loops & Action Execution                  | `fc325764-5901-4b06-b22d-02fab53c6fbc` |
| 4     | `lessons/03-tools-memory-and-retrieval.md`          | Tool Integration, Dynamic Memory & Retrieval Augmentation                        | `4f44b541-d005-48f7-b1f5-25707539f88b` |
| 5     | `lessons/04-production-governance-and-economics.md` | Production Considerations: The Cost-Complexity-Reliability Trilemma & Guardrails | `03870874-bc15-4608-a6d6-cbb3c9224f9f` |
| 6     | `lessons/05-glossary.md`                            | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Agentic Dictionary           | `d809f94c-10d9-4f0d-8dea-722c4e9452ea` |
| 7     | `lessons/06-final-assessment.md`                    | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                    | `45be041b-5a9a-4112-9182-5f254b518bb3` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/agentic-ai-build-your-first-agentic-ai-system/index.md` with:
  - Canonical UUIDv4 `7988d9f7-7121-4897-8ea1-d07d96146cfa`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-introduction-and-autonomy-levels.md`
- [x] Lesson 2 authored & verified: `01-agentic-lifecycle-cc-cd.md`
- [x] Lesson 3 authored & verified: `02-building-the-baseline-agent.md`
- [x] Lesson 4 authored & verified: `03-tools-memory-and-retrieval.md`
- [x] Lesson 5 authored & verified: `04-production-governance-and-economics.md`
- [x] Lesson 6 authored & verified: `05-glossary.md` (57 terms across 5 architectural pillars)
- [x] Lesson 7 authored & verified: `06-final-assessment.md` (15 scenarios with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors (84 entities, 84 unique IDs)
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index` (7 published, 80 pending)

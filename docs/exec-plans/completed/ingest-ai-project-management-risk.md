# Execution Plan: Ingesting "AI for Project Management: Managing Risk with Generative AI"

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

Transform the downloaded LinkedIn Learning course **AI for Project Management: Managing Risk with Generative AI** by renowned project management and supply chain expert **Daniel Stanton** ("Mr. Supply Chain", PMP) into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/ai-for-project-management-managing-risk-with-generative-ai/`). Every unit has been rewritten from first principles using the **Feynman Learning Technique**, featuring deep mathematical and probabilistic risk modeling (Expected Monetary Value, Monte Carlo simulations, schedule network critical paths), an auxiliary 7-phase hands-on lab guide, an architectural taxonomy glossary compiling the official glossary PDF into 5 pillars (53 terms), a 15-scenario active-recall diagnostic assessment faithfully incorporating the 10 original certification quiz stems, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses.
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/ai-for-project-management-managing-risk-with-generative-ai/`
- Course ID: `c3271776-f252-4801-8b82-fc56d514b473`
- Slug: `ai-for-project-management-managing-risk-with-generative-ai`

| Order | Lesson File                                              | Title                                                                                   | UUIDv4                                 |
| ----- | -------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                                               | Course Overview & Syllabus: Algorithmic Project Risk Management                         | `c3271776-f252-4801-8b82-fc56d514b473` |
| 1     | `lessons/00-foundations-of-ai-project-risk.md`           | Foundations of AI in Project Risk Management & The Failure of Static Registers          | `830b6837-f647-4a98-968d-42520fee7d89` |
| 2     | `lessons/01-ai-risk-plan-identification-analysis.md`     | The AI RISK PLAN Framework: Data Analysis & Threat Identification                       | `186808c1-bfce-4c33-a716-80c62c5863a4` |
| 3     | `lessons/02-ai-risk-plan-quantification-simulation.md`   | The AI RISK PLAN Framework: Risk Ranking, Generative Simulation & Real-Time Telemetry   | `13bb725d-3e04-4f7d-b933-a2435768dd2b` |
| 4     | `lessons/03-ai-risk-plan-governance-decision-support.md` | The AI RISK PLAN Framework: Contingency Planning, Decision Support & Ethical Guardrails | `04caa344-c5dd-4952-a304-295bd1970b9c` |
| 5     | `lessons/04-hands-on-risk-plan-lab.md`                   | Hands-On Implementation Lab: Constructing an Enterprise AI Risk Management Engine       | `37b065d5-4c08-4587-9711-a0a2d20891bc` |
| 6     | `lessons/05-glossary.md`                                 | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Project Risk Dictionary             | `60c5dd8c-67bd-433c-b4c4-100f5f85a213` |
| 7     | `lessons/06-final-assessment.md`                         | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                           | `0f7b5cf1-e889-4bb3-a7d0-4a3a0e706966` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/ai-for-project-management-managing-risk-with-generative-ai/index.md` with:
  - Canonical UUIDv4 `c3271776-f252-4801-8b82-fc56d514b473`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-foundations-of-ai-project-risk.md`
- [x] Lesson 2 authored & verified: `01-ai-risk-plan-identification-analysis.md`
- [x] Lesson 3 authored & verified: `02-ai-risk-plan-quantification-simulation.md`
- [x] Lesson 4 authored & verified: `03-ai-risk-plan-governance-decision-support.md`
- [x] Lesson 5 authored & verified: `04-hands-on-risk-plan-lab.md` (Auxiliary 7-Phase Lab Guide)
- [x] Lesson 6 authored & verified: `05-glossary.md` (53 terms across 5 pillars from official PDF)
- [x] Lesson 7 authored & verified: `06-final-assessment.md` (15 scenarios incorporating the 10 quiz stems with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

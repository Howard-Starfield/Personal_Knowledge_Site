# Execution Plan: Ingesting "AI in Risk Management and Fraud Detection"

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Status          | Completed                                             |
| Owner           | Howard                                                |
| Created         | 2026-09-30                                            |
| Completed       | 2026-09-30                                            |
| Baseline commit | `HEAD`                                                |
| Target branch   | `main`                                                |
| PRD phase       | Course Ingestion Baseline / LinkedIn Learning Runbook |
| Related ADRs    | ADR-0001, ADR-0002                                    |

---

## 1. Objective

Transform the downloaded LinkedIn Learning course **AI in Risk Management and Fraud Detection** by corporate finance executive and author **Glenn Hopper** (_AI Mastery for Finance Professionals_, former CFO, Head of AI Research at Aventis Advisory Group) into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/ai-in-risk-management-and-fraud-detection/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep mathematical and algorithmic foundations of anomaly detection (Isolation Forest path lengths and harmonic numbers, Local Outlier Factor density ratios, the Accuracy Paradox on imbalanced datasets, SMOTE synthetic vector math, cost-sensitive matrices, ROC/PR curves), an auxiliary 7-phase hands-on lab guide building an end-to-end Python 3.11+ fraud detection engine with scikit-learn and Pydantic v2 data models, a 5-pillar architectural taxonomy glossary (55 terms), a 15-scenario active-recall diagnostic assessment with accessible `<details class="quiz-answer">` accordions and 4-tier rubric, and sequential Implementer + Independent Verifier subagent audits for every chapter.

---

## 2. Non-Goals

- Modifying existing published courses.
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/ai-in-risk-management-and-fraud-detection/`
- Course ID: `81b8076a-4b7c-4ab3-9320-4702482db781`
- Slug: `ai-in-risk-management-and-fraud-detection`

| Order | Lesson File                                          | Title                                                                                                        | UUIDv4                                 |
| ----- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| -     | `index.md`                                           | Course Overview & Syllabus: Algorithmic Anomaly Detection, Machine Learning & Generative Risk Operations     | `81b8076a-4b7c-4ab3-9320-4702482db781` |
| 1     | `lessons/00-foundations-of-ai-risk-management.md`    | Foundations of Modern Financial Risk Management: The Breakdown of Static Rules & Manual Triage               | `286e96ca-f20f-4466-b98f-17080b092dcd` |
| 2     | `lessons/01-anomaly-detection-algorithms-theory.md`  | Algorithmic Anomaly Detection: Mathematical Mechanics of Isolation Forests, LOF & Ensemble Trees             | `1c7f7b77-b5d2-4d25-aa98-35c1d86b46f3` |
| 3     | `lessons/02-imbalanced-data-engineering-modeling.md` | Imbalanced Learning & Feature Engineering: Defeating the Accuracy Paradox with SMOTE, PR Curves & Tuning     | `53efaffb-859c-4ddd-babb-f9847079d234` |
| 4     | `lessons/03-generative-ai-alerts-audit-reporting.md` | Generative AI in Fraud Operations: Automated Natural Language Alerts, Case Narratives & Fiduciary Governance | `deff6fd2-f658-4cbc-8b15-8818d2b53d19` |
| 5     | `lessons/04-hands-on-fraud-detection-lab.md`         | Hands-On Implementation Lab: Building a Production-Ready Credit Card Fraud Detection Engine                  | `e9ecccf1-9531-444a-b731-589e2a5fda3c` |
| 6     | `lessons/05-glossary.md`                             | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Financial Risk Dictionary                                | `a0c94e61-5806-4244-80aa-70ada08d926f` |
| 7     | `lessons/06-final-assessment.md`                     | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                                                | `f63827da-9aed-47cd-b679-556b2fa5bbe6` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/ai-in-risk-management-and-fraud-detection/index.md` with:
  - Canonical UUIDv4 `81b8076a-4b7c-4ab3-9320-4702482db781`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-foundations-of-ai-risk-management.md`
- [x] Lesson 2 authored & verified: `01-anomaly-detection-algorithms-theory.md`
- [x] Lesson 3 authored & verified: `02-imbalanced-data-engineering-modeling.md`
- [x] Lesson 4 authored & verified: `03-generative-ai-alerts-audit-reporting.md`
- [x] Lesson 5 authored & verified: `04-hands-on-fraud-detection-lab.md` (Auxiliary 7-Phase Lab Guide)
- [x] Lesson 6 authored & verified: `05-glossary.md` (55 terms across 5 pillars)
- [x] Lesson 7 authored & verified: `06-final-assessment.md` (15 scenario-based questions with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

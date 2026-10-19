# Execution Plan: Ingesting "AI in Financial Forecasting"

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

Transform the downloaded LinkedIn Learning course **AI in Financial Forecasting** by corporate finance executive and author **Glenn Hopper** ("AI Mastery for Finance Professionals", Head of AI Research at Aventis Advisory Group, former CFO) into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/ai-in-financial-forecasting/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep econometric and statistical time-series derivations (Ordinary Least Squares, heteroscedasticity, ARIMA/SARIMA, Augmented Dickey-Fuller stationarity tests, Pearson/Spearman correlation vs Granger Causality, variance inflation factors), an auxiliary 7-phase hands-on lab guide reconstructing the Apple research exercise into a complete Python 3.11+ SARIMA forecasting engine, an architectural taxonomy glossary compiling the official glossary PDF into 5 pillars (50+ terms), a 15-scenario active-recall diagnostic assessment faithfully incorporating the 14 original certification quiz stems, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses.
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/ai-in-financial-forecasting/`
- Course ID: `47a600f9-bca7-4399-b34d-5168f88594e3`
- Slug: `ai-in-financial-forecasting`

| Order | Lesson File                                             | Title                                                                                        | UUIDv4                                 |
| ----- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                                              | Course Overview & Syllabus: Adaptive Econometric & Generative Financial Forecasting          | `47a600f9-bca7-4399-b34d-5168f88594e3` |
| 1     | `lessons/00-foundations-of-ai-forecasting.md`           | Foundations of AI in Financial Forecasting: Beyond Linear Regression & Spreadsheet Fragility | `9f211e26-d4e9-4a83-9117-5659e8bd2334` |
| 2     | `lessons/01-financial-data-engineering-cleaning.md`     | Financial Data Engineering: Ingestion, Imputation & Multimodal Feature Alignment             | `856d0e81-5cff-4414-ae39-3b533a428927` |
| 3     | `lessons/02-correlation-causation-feature-selection.md` | Statistical Relationships & Causal Feature Selection: Separating Signal from Spurious Drift  | `7976dfb4-81ea-42da-8caa-50639ee497bb` |
| 4     | `lessons/03-generative-scenario-modeling-what-if.md`    | Dynamic Scenario Analysis: Probabilistic "What-If" Projections & Deep Market Research        | `9024ca26-46d3-4c8b-881a-4f4b2b557bc2` |
| 5     | `lessons/04-hands-on-deep-research-lab.md`              | Hands-On Implementation Lab: Building an End-to-End Financial Forecasting & SARIMA Engine    | `d8da6921-8780-4603-a26e-9127c7420d41` |
| 6     | `lessons/05-glossary.md`                                | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Financial Forecasting Dictionary         | `3042c6f7-83a6-4137-a63e-7c353bf7ef55` |
| 7     | `lessons/06-final-assessment.md`                        | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                                | `ac58aa04-92e8-488b-9dbb-7a7d87e4713c` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/ai-in-financial-forecasting/index.md` with:
  - Canonical UUIDv4 `47a600f9-bca7-4399-b34d-5168f88594e3`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-foundations-of-ai-forecasting.md`
- [x] Lesson 2 authored & verified: `01-financial-data-engineering-cleaning.md`
- [x] Lesson 3 authored & verified: `02-correlation-causation-feature-selection.md`
- [x] Lesson 4 authored & verified: `03-generative-scenario-modeling-what-if.md`
- [x] Lesson 5 authored & verified: `04-hands-on-deep-research-lab.md` (Auxiliary 7-Phase Lab Guide)
- [x] Lesson 6 authored & verified: `05-glossary.md` (57 terms across 5 pillars from official PDF)
- [x] Lesson 7 authored & verified: `06-final-assessment.md` (15 scenarios incorporating the 14 quiz stems with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

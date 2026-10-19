# Execution Plan: Ingesting "AI Basics: What Every Professional Needs to Know"

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

Transform the downloaded LinkedIn Learning course **AI Basics: What Every Professional Needs to Know** by renowned AI educator and former Google Lead AI Advocate **Laurence Moroney** into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/ai-basics-what-every-professional-needs-to-know/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep mathematical and algorithmic foundations of rules vs. data, convolutional filter mathematics, autoregressive token sampling distributions, enterprise vendor evaluation rubrics, an architectural taxonomy glossary chapter, a 15-scenario active-recall assessment, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses.
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/ai-basics-what-every-professional-needs-to-know/`
- Course ID: `bc47c0e7-30d1-4561-b517-a587dc37c06a`
- Slug: `ai-basics-what-every-professional-needs-to-know`

| Order | Lesson File                                          | Title                                                                         | UUIDv4                                 |
| ----- | ---------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                                           | Course Overview & Syllabus: Demystifying AI from Math to Production           | `bc47c0e7-30d1-4561-b517-a587dc37c06a` |
| 1     | `lessons/00-breaking-the-hype-and-mental-models.md`  | Breaking the Hype: The Paradigm Shift from Rules to Data                      | `f3499836-fca1-4f2c-89ce-0ca0e04d0343` |
| 2     | `lessons/01-mechanics-of-machine-learning.md`        | The Mechanics of Machine Learning: Neural Networks, Filters & Bias Math       | `6b892240-c620-4090-ad87-66e175d33724` |
| 3     | `lessons/02-generative-ai-llms-and-agents.md`        | Generative AI, Autoregressive LLMs & The Agentic Frontier                     | `45e57212-a24f-4759-bd16-160e2b825690` |
| 4     | `lessons/03-enterprise-strategies-and-governance.md` | Putting AI to Work: The 20-Minute Rule, Vendor Audits & Algorithmic Fairness  | `1740364c-3921-4250-b290-b9b18b652e62` |
| 5     | `lessons/04-future-of-ai-safety-and-on-device.md`    | The Future of AI: Cryptographic Provenance, Small Models & Strategic Learning | `d427111c-8231-493d-8560-6c99340caf83` |
| 6     | `lessons/05-glossary.md`                             | 5-Pillar Architectural Taxonomy & Comprehensive A–Z AI Systems Dictionary     | `b2ead684-d0ce-4024-bb30-e9343fe560ab` |
| 7     | `lessons/06-final-assessment.md`                     | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                 | `dd371c27-e2ec-4da1-99cb-a25504c7bdc1` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/ai-basics-what-every-professional-needs-to-know/index.md` with:
  - Canonical UUIDv4 `bc47c0e7-30d1-4561-b517-a587dc37c06a`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-breaking-the-hype-and-mental-models.md`
- [x] Lesson 2 authored & verified: `01-mechanics-of-machine-learning.md`
- [x] Lesson 3 authored & verified: `02-generative-ai-llms-and-agents.md`
- [x] Lesson 4 authored & verified: `03-enterprise-strategies-and-governance.md`
- [x] Lesson 5 authored & verified: `04-future-of-ai-safety-and-on-device.md`
- [x] Lesson 6 authored & verified: `05-glossary.md` (61 terms across 5 architectural pillars)
- [x] Lesson 7 authored & verified: `06-final-assessment.md` (15 scenarios with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors (92 entities, 92 unique IDs)
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index` (8 published, 79 pending)

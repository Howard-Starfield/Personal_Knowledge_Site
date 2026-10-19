# Execution Plan: Ingesting "Advanced Guide to ChatGPT, Embeddings, and Other Large Language Models (LLMs)"

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

Transform the downloaded LinkedIn Learning course **Advanced Guide to ChatGPT, Embeddings, and Other Large Language Models (LLMs)** by AI entrepreneur and lecturer **Sinan Ozdemir** into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep mathematical formulas, architectural ASCII diagrams, worked engineering examples, concrete code patterns, an architectural taxonomy glossary chapter, a 15-scenario active-recall assessment, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses (`content/courses/ai-agents-in-depth/`, `content/courses/how-to-be-an-agent-boss/`, `content/courses/account-management-maintaining-relationships/`, `content/courses/accounting-foundations/`).
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/`
- Course ID: `a62e5265-aacf-45ea-8e64-7dae192cc27f`
- Slug: `advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms`

| Order | Lesson File                                         | Title                                                              | UUIDv4                                 |
| ----- | --------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------- |
| -     | `index.md`                                          | Course Overview & Syllabus                                         | `a62e5265-aacf-45ea-8e64-7dae192cc27f` |
| 1     | `lessons/00-introduction.md`                        | Course Orientation & The LLM Revolution                            | `74dc6087-4af9-4373-8d58-3a79b135ee55` |
| 2     | `lessons/01-llm-foundations-and-transformers.md`    | LLM Foundations & The Transformer Architecture                     | `40ad97da-1b8f-41b9-8959-27d4da6fd3d5` |
| 3     | `lessons/02-semantic-search-and-embeddings.md`      | Semantic Search, Vector Spaces & Bi/Cross-Encoders                 | `9ef659f4-ffe6-492f-b4d9-e55ef3d74f22` |
| 4     | `lessons/03-prompt-engineering-fundamentals.md`     | Prompt Engineering Foundations & Few-Shot Alignment                | `1a7bf3a5-30ef-4731-bb5a-32ec1d10e9e1` |
| 5     | `lessons/04-rag-and-ai-agents.md`                   | Retrieval-Augmented Generation & Autonomous AI Agents              | `ac1c31c6-4ef1-49d9-85d4-d5939562a198` |
| 6     | `lessons/05-fine-tuning-foundations.md`             | Optimizing LLMs: Transfer Learning & Fine-Tuning                   | `1975b76e-0989-40fe-a732-30ad3cba2b1d` |
| 7     | `lessons/06-advanced-prompt-engineering.md`         | Advanced Prompt Engineering: Chains, Guardrails & Reasoning        | `071d35fb-f92c-46db-a19e-10ada11d1eb7` |
| 8     | `lessons/07-custom-embeddings-and-architectures.md` | Customizing Embeddings & Representation Engineering                | `24c71caa-1783-419c-a4b7-24dc1373df17` |
| 9     | `lessons/08-ai-alignment-first-principles.md`       | AI Alignment: First Principles, Ethics & Red Teaming               | `9ce0d450-62ef-446d-ad47-c947a8cd1997` |
| 10    | `lessons/09-multimodal-and-rlhf.md`                 | Beyond Text: Vision Transformers & RLHF Alignment                  | `6c867f94-2533-4ee0-bfcd-7aa42ba86f15` |
| 11    | `lessons/10-open-source-fine-tuning-and-peft.md`    | Advanced Open-Source Fine-Tuning & Parameter Efficiency            | `5107991e-ca3c-4838-9a89-810716c2658a` |
| 12    | `lessons/11-production-llmops-and-distillation.md`  | Production LLMOps, Cost Modeling & Knowledge Distillation          | `47b3f4a2-9917-4872-9830-f38f62bfee07` |
| 13    | `lessons/12-llm-evaluation-and-benchmarking.md`     | LLM Evaluation, Benchmarking & World Model Probing                 | `b158cc05-55ba-442b-a7ae-aafcf6a95b48` |
| 14    | `lessons/13-glossary.md`                            | 5-Pillar Architectural Taxonomy & Comprehensive A–Z LLM Dictionary | `babdb058-8f41-4c27-967d-eb5f442e9869` |
| 15    | `lessons/14-final-assessment.md`                    | Comprehensive 15-Scenario Active-Recall Assessment                 | `28ffb092-8b02-4c8a-a69c-bb0f9b970c79` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/index.md` with:
  - Canonical lowercase UUIDv4 `id` (`a62e5265-aacf-45ea-8e64-7dae192cc27f`).
  - `type: course`, `publish: true`, `status: active`, `difficulty: advanced`, `learningOutcomes` array.
  - Curated overview prose, instructor attribution, and roadmap table.
- [x] Core Feynman lessons authored below `lessons/`:
  - `00-introduction.md` (LessonOrder 1)
  - `01-llm-foundations-and-transformers.md` (LessonOrder 2)
  - `02-semantic-search-and-embeddings.md` (LessonOrder 3)
  - `03-prompt-engineering-fundamentals.md` (LessonOrder 4)
  - `04-rag-and-ai-agents.md` (LessonOrder 5)
  - `05-fine-tuning-foundations.md` (LessonOrder 6)
  - `06-advanced-prompt-engineering.md` (LessonOrder 7)
  - `07-custom-embeddings-and-architectures.md` (LessonOrder 8)
  - `08-ai-alignment-first-principles.md` (LessonOrder 9)
  - `09-multimodal-and-rlhf.md` (LessonOrder 10)
  - `10-open-source-fine-tuning-and-peft.md` (LessonOrder 11)
  - `11-production-llmops-and-distillation.md` (LessonOrder 12)
  - `12-llm-evaluation-and-benchmarking.md` (LessonOrder 13)
- [x] Auxiliary Architectural Taxonomy & Glossary:
  - `13-glossary.md` (LessonOrder 14)
- [x] 15-Question Active-Recall Scenario Assessment:
  - `14-final-assessment.md` (LessonOrder 15) with `<details class="quiz-answer">` accordions and 4-tier rubric.
- [x] Bottom `.chapter-navigation` buttons (`prev` / `next`) on all lessons.
- [x] Strict KaTeX currency safety: ZERO raw dollar signs in prose/tables (always `\$` or backticked) and ZERO dollar signs inside LaTeX math delimiters.
- [x] Course registration in `content/index.md` (Featured Courses).
- [x] Source tracking index updated via `python scripts/extract-linkedin-courses.py --sync-index`.
- [x] Verification gates pass:
  - `npm.cmd run validate:content` reports 0 errors.
  - `npm.cmd test` passes (189+ tests).
  - `node scripts/validate-graph-output.mjs` passes.
  - `npx.cmd quartz build` succeeds with zero errors.

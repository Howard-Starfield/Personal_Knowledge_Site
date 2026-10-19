# Execution Plan: Ingesting "Advanced Prompt Engineering Techniques"

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

Transform the downloaded LinkedIn Learning course **Advanced Prompt Engineering Techniques** by senior technologist and educator **Morten Rand-Hendriksen** into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/advanced-prompt-engineering-techniques/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep mathematical formulations of attention and autoregressive generation, architectural ASCII diagrams, worked prompt optimization examples, concrete Python patterns, an architectural taxonomy glossary chapter, a 15-scenario active-recall assessment, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses (`ai-agents-in-depth`, `how-to-be-an-agent-boss`, `account-management-maintaining-relationships`, `accounting-foundations`, `advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms`, `advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications`).
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/advanced-prompt-engineering-techniques/`
- Course ID: `e0de2644-4dcb-45dc-930d-3584829d4a7d`
- Slug: `advanced-prompt-engineering-techniques`

| Order | Lesson File                                                  | Title                                                                 | UUIDv4                                 |
| ----- | ------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                                                   | Course Overview & Syllabus: Advanced Prompt Engineering               | `e0de2644-4dcb-45dc-930d-3584829d4a7d` |
| 1     | `lessons/00-foundations-of-prompt-engineering.md`            | Foundations of Prompt Engineering & In-Context Dynamics               | `3b535567-34b9-4d23-bb25-bdff7c06296a` |
| 2     | `lessons/01-zero-shot-and-few-shot-prompting.md`             | Zero-Shot, Few-Shot Exemplars & In-Context Pattern Induction          | `ab86a7a7-3c37-4495-a657-7cee782272fc` |
| 3     | `lessons/02-chain-of-thought-and-step-by-step.md`            | Chain-of-Thought (CoT), Step-by-Step Optimization & OPRO              | `cd770948-3e98-4ba3-9756-a69d8fe41764` |
| 4     | `lessons/03-generated-knowledge-and-directional-stimulus.md` | Generated Knowledge Prompting & Directional Stimulus Guidance         | `9091157c-d70a-4756-aa9d-ba02203089c3` |
| 5     | `lessons/04-tree-of-thought-and-chain-of-density.md`         | Tree-of-Thought (ToT) Search & Chain-of-Density (CoD) Compression     | `07bd40c9-ae1e-4466-8ba7-cd6615e7ffa0` |
| 6     | `lessons/05-glossary.md`                                     | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Prompt Dictionary | `216fff0f-ec21-4b87-a93b-c819f1e60c7d` |
| 7     | `lessons/06-final-assessment.md`                             | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment         | `e8232c51-545f-4cb8-9e45-939360774a29` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/advanced-prompt-engineering-techniques/index.md` with:
  - Canonical UUIDv4 `e0de2644-4dcb-45dc-930d-3584829d4a7d`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-foundations-of-prompt-engineering.md`
- [x] Lesson 2 authored & verified: `01-zero-shot-and-few-shot-prompting.md`
- [x] Lesson 3 authored & verified: `02-chain-of-thought-and-step-by-step.md`
- [x] Lesson 4 authored & verified: `03-generated-knowledge-and-directional-stimulus.md`
- [x] Lesson 5 authored & verified: `04-tree-of-thought-and-chain-of-density.md`
- [x] Lesson 6 authored & verified: `05-glossary.md` (50+ terms across 5 architectural pillars)
- [x] Lesson 7 authored & verified: `06-final-assessment.md` (15 scenarios with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

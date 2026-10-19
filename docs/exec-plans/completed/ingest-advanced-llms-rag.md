# Execution Plan: Ingesting "Advanced LLMs with Retrieval Augmented Generation (RAG): Practical Projects for AI Applications"

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

Transform the downloaded LinkedIn Learning course **Advanced LLMs with Retrieval Augmented Generation (RAG): Practical Projects for AI Applications** by machine learning engineer and educator **Guy Ernst** into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep mathematical formulas, architectural ASCII diagrams, worked engineering examples, concrete code patterns, an architectural taxonomy glossary chapter, a 15-scenario active-recall assessment, and sequential Implementer + Independent Verifier subagent audits for every single chapter.

---

## 2. Non-Goals

- Modifying existing published courses (`content/courses/ai-agents-in-depth/`, `content/courses/how-to-be-an-agent-boss/`, `content/courses/account-management-maintaining-relationships/`, `content/courses/accounting-foundations/`, `content/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/`).
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/`
- Course ID: `51514bd6-585b-4e56-b7b1-3f137e962f3c`
- Slug: `advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications`

| Order | Lesson File                              | Title                                                                             | UUIDv4                                 |
| ----- | ---------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                               | Course Overview & Syllabus: Advanced RAG Architecture                             | `51514bd6-585b-4e56-b7b1-3f137e962f3c` |
| 1     | `lessons/00-foundations-of-rag.md`       | Foundations of Retrieval-Augmented Generation & Naive RAG Failure Modes           | `0530cbc9-3d78-49f0-be23-77ff0d9b6400` |
| 2     | `lessons/01-text-encoding-embeddings.md` | Text Encoding, Tokenization & Vector Space Embeddings                             | `0ed2b1c8-9207-4eca-b0d0-33437b841b12` |
| 3     | `lessons/02-chunking-enrichment.md`      | Semantic Chunking, Contextual Retrieval & Query-Document Alignment (Reverse HyDE) | `ad0a6c31-b300-469b-972d-d42074009699` |
| 4     | `lessons/03-hybrid-search-reranking.md`  | Hybrid Dense-Sparse Search, Cross-Encoder Reranking & Multimodal PDF Ingestion    | `eaecc0ef-6645-4aeb-9991-079c0d4abe42` |
| 5     | `lessons/04-glossary.md`                 | 5-Pillar Architectural Taxonomy & Comprehensive A–Z RAG Dictionary                | `a08d46f5-1f8a-4ce7-9dda-dff92df2c7f1` |
| 6     | `lessons/05-final-assessment.md`         | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                     | `a0b1116a-4128-4b8b-a128-8c6c3ed8061d` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/index.md` with:
  - Canonical UUIDv4 `51514bd6-585b-4e56-b7b1-3f137e962f3c`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-foundations-of-rag.md`
- [x] Lesson 2 authored & verified: `01-text-encoding-embeddings.md`
- [x] Lesson 3 authored & verified: `02-chunking-enrichment.md`
- [x] Lesson 4 authored & verified: `03-hybrid-search-reranking.md`
- [x] Lesson 5 authored & verified: `04-glossary.md` (50+ terms across 5 architectural pillars)
- [x] Lesson 6 authored & verified: `05-final-assessment.md` (15 scenarios with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

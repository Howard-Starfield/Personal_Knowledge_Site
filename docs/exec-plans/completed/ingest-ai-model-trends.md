# Execution Plan: Ingesting "AI Model Trends: The Latest You Need to Know"

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Status          | Completed                                             |
| Owner           | Howard                                                |
| Created         | 2026-09-30                                            |
| Updated         | 2026-10-01                                            |
| Baseline commit | `HEAD`                                                |
| Target branch   | `main`                                                |
| PRD phase       | Course Ingestion Baseline / LinkedIn Learning Runbook |
| Related ADRs    | ADR-0001, ADR-0002                                    |

---

## 1. Objective

Transform the downloaded LinkedIn Learning course **AI Model Trends: The Latest You Need to Know** by senior staff developer instructor **Ray Villalobos** into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/ai-model-trends-the-latest-you-need-to-know/`). Every unit has been rewritten from first principles using the **Feynman Learning Technique**, featuring deep technical and architectural deconstructions of frontier LLMs (OpenAI GPT-5.6 / GPT-5.5, Anthropic Fable 5 Mythos & Opus 4.8 / Sonnet 5, Google Gemini 3.5 Flash & Diffusion & Gemma 4 12B, open-weight GLM 5.2 Index Share layer-caching, DeepSeek V4, and MiMo-V2.5), an auxiliary 7-phase hands-on lab building a multi-model benchmarking and agentic evaluation engine in Python 3.11+ / Pydantic v2, an architectural taxonomy glossary (50+ terms across 5 pillars), a 15-scenario active-recall diagnostic assessment, and sequential Implementer + Independent Verifier subagent audits for every chapter.

---

## 2. Non-Goals

- Modifying existing published courses.
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/ai-model-trends-the-latest-you-need-to-know/`
- Course ID: `ecb81404-0f2d-495f-bd30-290140707fa3`
- Slug: `ai-model-trends-the-latest-you-need-to-know`

| Order | Lesson File                                                     | Title                                                                                                  | UUIDv4                                 |
| ----- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| -     | `index.md`                                                      | Course Overview & Syllabus: Frontier LLM Architectures, Agentic Orchestration & Empirical Benchmarking | `ecb81404-0f2d-495f-bd30-290140707fa3` |
| 1     | `lessons/00-frontier-model-landscape-evaluation-benchmarks.md`  | The Frontier Model Landscape: Empirical Evaluation Beyond Marketing Benchmarks                         | `87d732a6-bc12-476e-94cc-7be6261ddd84` |
| 2     | `lessons/01-openai-frontier-gpt5-architecture-orchestration.md` | OpenAI Frontier Architecture: GPT-5.6 Parallel Agents, Codex Sandboxes & Multi-Modal Engines           | `0f1ae058-e64f-472f-a891-a9f82a35b3f3` |
| 3     | `lessons/02-anthropic-frontier-fable-sonnet-opus-agents.md`     | Anthropic Frontier Architecture: Fable 5 Mythos Fences, Sonnet 5 Computer Use & Opus 4.8 Memory Nodes  | `cea543af-636b-461f-bd59-0a4e66327b86` |
| 4     | `lessons/03-google-gemini-diffusion-sovereign-gemma.md`         | Google Gemini & Sovereign Ecosystem: Gemini Diffusion, 3.5 Flash & On-Device Gemma 4 12B               | `a15fc348-303f-4c84-b305-b1f17363418a` |
| 5     | `lessons/04-open-weight-frontier-glm-deepseek-mimo.md`          | Open-Weight Frontier: GLM 5.2 Index Share Caching, DeepSeek V4 & Speculative Decoding                  | `c14787d7-5222-42c8-bfbc-574b8b7d43bd` |
| 6     | `lessons/05-hands-on-model-evaluation-agentic-lab.md`           | Hands-On Implementation Lab: Multi-Model Evaluation & Automated Contract Harness in Python             | `2fe11164-fea8-4d5a-8489-cfae4ad18324` |
| 7     | `lessons/06-glossary.md`                                        | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Frontier Model Dictionary                          | `51f59de6-5d4b-4ba4-88bb-ea9330c2d23f` |
| 8     | `lessons/07-final-assessment.md`                                | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                                          | `7860cad1-d0ff-48f3-b70e-b77c10fa959d` |

---

## 4. Acceptance Gates

- [x] Course setup at `content/courses/ai-model-trends-the-latest-you-need-to-know/index.md` with:
  - Canonical UUIDv4 `ecb81404-0f2d-495f-bd30-290140707fa3`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [x] Added to Featured Courses grid in `content/index.md`
- [x] Lesson 1 authored & verified: `00-frontier-model-landscape-evaluation-benchmarks.md`
- [x] Lesson 2 authored & verified: `01-openai-frontier-gpt5-architecture-orchestration.md`
- [x] Lesson 3 authored & verified: `02-anthropic-frontier-fable-sonnet-opus-agents.md`
- [x] Lesson 4 authored & verified: `03-google-gemini-diffusion-sovereign-gemma.md`
- [x] Lesson 5 authored & verified: `04-open-weight-frontier-glm-deepseek-mimo.md`
- [x] Lesson 6 authored & verified: `05-hands-on-model-evaluation-agentic-lab.md` (Auxiliary 7-Phase Lab Guide)
- [x] Lesson 7 authored & verified: `06-glossary.md` (50+ terms across 5 pillars)
- [x] Lesson 8 authored & verified: `07-final-assessment.md` (15 scenario-based questions with `<details class="quiz-answer">` accordions)
- [x] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [x] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [x] `npm.cmd run validate:content` reports 0 errors
- [x] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [x] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

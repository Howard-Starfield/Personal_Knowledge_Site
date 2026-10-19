# Execution Plan: Ingesting "AI Solutions and Techniques for Help Desk Operations"

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Status          | In Progress                                           |
| Owner           | Howard                                                |
| Created         | 2026-10-01                                            |
| Updated         | 2026-10-01                                            |
| Baseline commit | `HEAD`                                                |
| Target branch   | `main`                                                |
| PRD phase       | Course Ingestion Baseline / LinkedIn Learning Runbook |
| Related ADRs    | ADR-0001, ADR-0002                                    |

---

## 1. Objective

Transform the downloaded LinkedIn Learning course **AI Solutions and Techniques for Help Desk Operations** by enterprise technology author and science journalist **Pam Baker** (Author of _Generative AI for Dummies_) into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/ai-solutions-and-techniques-for-help-desk-operations/`). Every unit will be rewritten from first principles using the **Feynman Learning Technique**, featuring deep technical and architectural deconstructions of IT service management (ITSM) automation, dual-engine virtual assistants (deterministic rule engines vs probabilistic LLMs), machine learning ticket routing and SLA optimization, predictive incident forecasting using telemetry and queuing theory, NLP sentiment analysis and intent classification, AI-driven dynamic knowledge bases with Retrieval-Augmented Generation (RAG), proactive self-healing support engineering, and enterprise governance/economics. In addition, the course will include a 7-phase Python 3.11+ / Pydantic v2 hands-on implementation lab building a production triage and deflection engine, a 5-pillar architectural taxonomy glossary (50+ terms across 5 pillars), a 15-scenario active-recall diagnostic assessment, and sequential Implementer + Independent Verifier subagent audits for every chapter.

---

## 2. Non-Goals

- Modifying existing published courses.
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Course Blueprint & Identity Mapping

- Course Root: `content/courses/ai-solutions-and-techniques-for-help-desk-operations/`
- Course ID: `9f06e4da-f651-4857-95d5-df8a6fde9aa5`
- Slug: `ai-solutions-and-techniques-for-help-desk-operations`

| Order | Lesson File                                                             | Title                                                                                                 | UUIDv4                                 |
| ----- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------- |
| -     | `index.md`                                                              | Course Overview & Syllabus: IT Service Management Automation, Cognitive Triage & Proactive Operations | `9f06e4da-f651-4857-95d5-df8a6fde9aa5` |
| 1     | `lessons/00-help-desk-automation-foundations-itsm-evolution.md`         | Help Desk Automation Foundations: From Static Rule Queues to Cognitive Service Desks                  | `1417cf41-8170-4682-816c-5a9062a79d58` |
| 2     | `lessons/01-conversational-ai-dual-engine-virtual-assistants.md`        | Conversational Support Architecture: Dual-Engine Rule Systems & Generative Virtual Assistants         | `f23a0d20-611d-41e3-8c20-bdfa79f90562` |
| 3     | `lessons/02-intelligent-ticket-routing-machine-learning-triage.md`      | Intelligent Ticket Triage: Multi-Class ML Routing, Load Balancing & Predictive SLA Gates              | `e5a4c90d-6649-4ea1-b8bb-53f91eabe69c` |
| 4     | `lessons/03-predictive-analytics-incident-forecasting-telemetry.md`     | Predictive Analytics & Telemetry: Time-Series Forecasting, Queuing Theory & Silent Failure Detection  | `6f03317a-481b-4168-9dd4-1859e0538639` |
| 5     | `lessons/04-nlp-sentiment-analysis-intent-classification.md`            | Natural Language Processing in Support: Emotion Intensity, Named Entity Extraction & Intent Vectors   | `61d1bebd-ec22-4f05-af3a-60e0fcc99ee9` |
| 6     | `lessons/05-dynamic-knowledge-bases-rag-self-service-deflection.md`     | Dynamic Knowledge Engineering: Vector RAG, Semantic Caching & Autonomous Self-Service Deflection      | `101dcb25-d7d8-4c38-8317-c3958ffd5193` |
| 7     | `lessons/06-proactive-support-anomaly-detection-automated-workflows.md` | Proactive Support Systems: Edge Telemetry Anomaly Detection, Digital Twins & Self-Healing Remediation | `93a85f03-8bb5-450c-b89e-a6d248e315ce` |
| 8     | `lessons/07-governance-security-change-management-roi.md`               | Enterprise Governance & Economics: Data Privacy, Human-in-the-Loop Safeguards & TCO/ROI Models        | `8f7d2d4d-0081-4c19-a052-d749adc5144a` |
| 9     | `lessons/08-hands-on-help-desk-triage-lab.md`                           | Hands-On Implementation Lab: Production AI Help Desk Triage & Deflection Engine in Python             | `baadddfc-26f3-42c2-8a5f-29213d0e8359` |
| 10    | `lessons/09-glossary.md`                                                | 5-Pillar Architectural Taxonomy & Comprehensive A–Z Help Desk AI Dictionary                           | `ccc407db-4451-48df-8cde-28f6f1bd9b64` |
| 11    | `lessons/10-final-assessment.md`                                        | Comprehensive 15-Scenario Active-Recall Diagnostic Assessment                                         | `d84cdbfb-09b0-4429-b588-7bf5be2bcc03` |

---

## 4. Acceptance Gates

- [ ] Course setup at `content/courses/ai-solutions-and-techniques-for-help-desk-operations/index.md` with:
  - Canonical UUIDv4 `9f06e4da-f651-4857-95d5-df8a6fde9aa5`
  - `type: course`, `publish: true`, `status: active`
  - Learning outcomes array and syllabus table linking to lessons
- [ ] Added to Featured Courses grid in `content/index.md`
- [ ] Lesson 1 authored & verified: `00-help-desk-automation-foundations-itsm-evolution.md`
- [ ] Lesson 2 authored & verified: `01-conversational-ai-dual-engine-virtual-assistants.md`
- [ ] Lesson 3 authored & verified: `02-intelligent-ticket-routing-machine-learning-triage.md`
- [ ] Lesson 4 authored & verified: `03-predictive-analytics-incident-forecasting-telemetry.md`
- [ ] Lesson 5 authored & verified: `04-nlp-sentiment-analysis-intent-classification.md`
- [ ] Lesson 6 authored & verified: `05-dynamic-knowledge-bases-rag-self-service-deflection.md`
- [ ] Lesson 7 authored & verified: `06-proactive-support-anomaly-detection-automated-workflows.md`
- [ ] Lesson 8 authored & verified: `07-governance-security-change-management-roi.md`
- [ ] Lesson 9 authored & verified: `08-hands-on-help-desk-triage-lab.md` (Auxiliary 7-Phase Lab Guide)
- [ ] Lesson 10 authored & verified: `09-glossary.md` (50+ terms across 5 pillars)
- [ ] Lesson 11 authored & verified: `10-final-assessment.md` (15 scenario-based questions with `<details class="quiz-answer">` accordions)
- [ ] Every lesson verified by sequential Implementer + Independent Verifier subagent pair
- [ ] Zero unescaped currency dollar signs (all `\$`, zero `$` inside LaTeX math delimiters)
- [ ] `npm.cmd run validate:content` reports 0 errors
- [ ] `npx.cmd quartz build` passes cleanly with 0 `katex-error` spans
- [ ] Index synced via `python scripts/extract-linkedin-courses.py --sync-index`

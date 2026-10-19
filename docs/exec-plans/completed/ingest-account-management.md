# Execution Plan: Ingesting "Account Management: Maintaining Relationships"

| Field           | Value                                                 |
| --------------- | ----------------------------------------------------- |
| Status          | Complete                                              |
| Owner           | Howard                                                |
| Created         | 2026-09-29                                            |
| Updated         | 2026-09-29                                            |
| Baseline commit | `HEAD`                                                |
| Target branch   | `main`                                                |
| PRD phase       | Course Ingestion Baseline / LinkedIn Learning Runbook |
| Related ADRs    | ADR-0001, ADR-0002                                    |

---

## 1. Objective

Transform the downloaded LinkedIn Learning course **Account Management: Maintaining Relationships** by instructor Miles Croft into an authoritative, publication-ready public course on this Quartz 5 site (`content/courses/account-management-maintaining-relationships/`). Every chapter will be rewritten from first principles using the **Feynman Learning Technique**, the auxiliary exercise PDF (`Going Rotten Timer CRM Suggestions.pdf`) will be structured into a dedicated hands-on lab chapter, a 15-question scenario-based active-recall assessment will be authored, and each unit will be audited using a sequential Implementer + Independent Verifier subagent workflow.

---

## 2. Non-Goals

- Modifying existing published courses (`content/courses/ai-agents-in-depth/` or `content/courses/how-to-be-an-agent-boss/`).
- Wholesaling or copying verbatim transcripts from `Study.md` or `course-package.json` into public content (violates Zero-Transcript Leakage Rule).
- Changing Quartz core plugins or theme layouts.
- Auto-publishing multiple courses at once; strictly ingesting one course to ensure exhaustive depth and zero defects.

---

## 3. Acceptance Gates

- [x] Course setup at `content/courses/account-management-maintaining-relationships/index.md` with:
  - Canonical lowercase UUIDv4 `id`.
  - `type: course`, `publish: true`, `status: active`, `difficulty: intermediate`, `learningOutcomes` array.
  - Curated overview prose, instructor attribution, and roadmap table.
- [x] Core Feynman lessons authored below `lessons/`:
  - `00-introduction.md` (LessonOrder 1): The Mindset of Modern Account Management.
  - `01-relationship-selling.md` (LessonOrder 2): Relationship Selling, Trust & Reciprocal Ecosystems.
  - `02-meeting-and-treating-clients.md` (LessonOrder 3): Authentic Hospitality & Anti-Bribery Governance.
  - `03-automating-account-cadence.md` (LessonOrder 4): Cadence Automation, Rotten Timers & CRM Hygiene.
  - `04-service-recovery-and-retention.md` (LessonOrder 5): Service Recovery, Radical Ownership & Recurrence Prevention.
- [x] Auxiliary PDF Lab Lesson:
  - `05-exercise-files.md` (LessonOrder 6): Hands-on implementation guide for CRM Rotten Timers (Pipedrive, HubSpot, Freshsales) with ASCII architecture dataflow, 7 production phases, and an idempotency/alert fatigue callout.
- [x] 15-Question Active-Recall Scenario Assessment:
  - `06-final-assessment.md` (LessonOrder 7): Exactly 15 scenario-based 4-option questions with collapsible `<details class="quiz-answer">` accordions containing Correct Answer, Authoritative Explanation, and Feynman Takeaway, concluding with a 4-tier rubric.
- [x] Bottom `.chapter-navigation` buttons (`prev` / `next`) on all lessons.
- [x] Currency symbols strictly escaped as `\$` (or backticked) across all Markdown prose and tables to prevent KaTeX rendering crashes.
- [x] Course registration in `content/index.md` (Featured Courses).
- [x] Source tracking index updated via `python scripts/extract-linkedin-courses.py --sync-index`.
- [x] Verification gates pass:
  - `npm.cmd run validate:content` reports 0 errors.
  - `npm.cmd test` passes (189+ tests).
  - `node scripts/validate-graph-output.mjs` passes.
  - `npx.cmd quartz build` succeeds without syntax or broken link errors.

---

## 4. Instruction Sources

| Scope / Path        | Instruction File                                   | Relevant Rules                                                                                           |
| ------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Repository Root     | `AGENTS.md`                                        | Content invariants, strict TypeScript, no placeholder content, source verification                       |
| Ingestion Runbook   | `docs/runbooks/LINKEDIN_COURSE_INGESTION.md`       | Extraction commands, Feynman pedagogical engine, auxiliary PDF processing, 15-question assessment schema |
| Content Contract    | `docs/contracts/CONTENT_MODEL.md`                  | Course/Lesson frontmatter schemas, `courseId`, `lessonOrder`, `Study.md` disposition                     |
| Content Subtree     | `content/AGENTS.md`                                | Public content boundary, UUIDv4 immutability, link resolution                                            |
| Assessment Template | `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` | Active recall standards, scenario design, distractor plausibility                                        |

---

## 5. Version and Environment Matrix

| Component | Version / Environment       | Source of Truth                       |
| --------- | --------------------------- | ------------------------------------- |
| Node.js   | v20+ / Windows 11           | `package.json`                        |
| Quartz    | 5.0.0 (`@jackyzha0/quartz`) | `package.json`                        |
| Python    | 3.10+ with `pymupdf`        | `scripts/extract-linkedin-courses.py` |
| Vitest    | Pinned in `package.json`    | `npm.cmd test`                        |

---

## 6. Official Source Verification

| Artifact / Concept    | Source Location                                                                              | Verified Status                                           |
| --------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Source Download       | `<LINKEDIN_SOURCE_DIR>/Account Management- Maintaining Relationships`                        | Verified read-only                                        |
| Course Package        | `scratch/extracted-courses/account-management-maintaining-relationships/course-package.json` | Staged (6 chapters, 15 quizzes, 2 exercise PDFs)          |
| Course Index          | `content/courses/account-management-maintaining-relationships/index.md`                      | To be created with fresh UUIDv4                           |
| Frontmatter Validator | `scripts/validate-content.mjs`                                                               | Verified (checks `id`, `type`, `courseId`, `lessonOrder`) |

---

## 7. Execution Steps

1. **Course Package Extraction (Done):**
   - Verified extraction into `scratch/extracted-courses/account-management-maintaining-relationships/course-package.json`.
2. **Phase 2: Course Setup:**
   - Generate course UUIDv4.
   - Author `content/courses/account-management-maintaining-relationships/index.md` with overview, syllabus, learning outcomes, and difficulty.
3. **Phase 3: Sequential Subagent Swarm (Per Chapter):**
   - For each chapter, run Implementer Subagent to draft the lesson in full Feynman depth with vivid analogies, callouts, worked math, and `\$` currency escaping.
   - Run Independent Verifier Subagent to audit frontmatter, validate links, check KaTeX safety, and run `npm.cmd run validate:content`.
4. **Phase 4: Auxiliary PDF Lab Chapter (`05-exercise-files.md`):**
   - Build 7-Phase implementation guide for CRM "Going Rotten" timers with ASCII dataflow diagrams, multi-CRM comparisons (Pipedrive, HubSpot, Freshsales), SLA alerting, and an idempotency/alert fatigue callout.
5. **Phase 5: 15-Question Final Assessment (`06-final-assessment.md`):**
   - Author 15 enterprise scenario questions across all course topics.
   - Include collapsible accordions with Correct Answer, Authoritative Explanation, and Feynman Takeaway.
   - Conclude with the 4-tier scoring rubric.
6. **Phase 6: Catalog Registration & Repo Verification:**
   - Update `content/index.md`.
   - Run `python scripts/extract-linkedin-courses.py --sync-index`.
   - Run `npm.cmd run validate:content`, `npm.cmd test`, `node scripts/validate-graph-output.mjs`, and `npx.cmd quartz build`.

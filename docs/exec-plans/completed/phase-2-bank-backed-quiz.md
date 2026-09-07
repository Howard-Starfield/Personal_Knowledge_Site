# Phase 2 Bank-Backed Quiz Vertical Slice

## Status

- State: completed 2026-08-30
- Owner decision: OQ-09 confirmed on 2026-08-30
- Baseline branch: `v5`
- Baseline commit: `c97512f787a831778c6f832535ec5af9bf4dacff`
- Scope: one canonical question-bank schema, build-time quiz resolution, and an accessible in-memory learner interaction

## Objective

Make Git-authored quizzes executable without duplicating question definitions. A question-bank Markdown file owns stable question UUIDs, answer keys, and explanations. A lesson or article selects questions by ID. The static build validates and resolves those references; the browser presents one question at a time and reports correct or incorrect only after the learner selects an answer and presses **Check answer**.

## Non-goals

- Login, synchronized progress, D1, local storage, cookies, or durable scoring
- Exam secrecy; answers remain present in public static HTML
- Random generation, adaptive testing, spaced-repetition scheduling, or LLM calls in the browser
- Direct authoring-agent publication or self-review
- Quiz-derived graph edges
- A Quartz core patch or a second frontend framework

## Verified baseline and sources

| Source                        | Exact evidence                                                                                                                                                                                                                   | Verified   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Quartz                        | repository `package.json` version `5.0.0`; installed source at `quartz/plugins/types.ts`, `quartz/plugins/pageTypes/dispatcher.ts`, `quartz/components/renderPage.tsx`, `quartz/processors/parse.ts`, and `quartz/util/trace.ts` | 2026-08-30 |
| Quartz official documentation | Context7 `/jackyzha0/quartz`; `docs/advanced/making plugins.md` and `docs/advanced/creating components.md`                                                                                                                       | 2026-08-30 |
| YAML                          | installed `yaml@2.8.2` from `package-lock.json`                                                                                                                                                                                  | 2026-08-30 |
| Existing browser lifecycle    | `nav`/`render` plus `window.addCleanup`; confirmed in Quartz documentation and the site-owned graph runtime                                                                                                                      | 2026-08-30 |

Repository findings:

- Transformer plugins run per file and may attach validated data to `vfile.data`.
- Page-type `treeTransforms` run during static rendering with `componentData.allFiles`, which permits cross-file bank resolution without a browser corpus scan.
- `trace()` exits the build on the main thread and rethrows worker errors, so invalid fenced-block data cannot silently become a rendered quiz.
- Static resources declared by a transformer are bundled into page resources.
- The temporary `.recall-card` disclosure rows on `showcase.md` do not grade answers and are the visual surface the owner rejected.

## Design space

| Candidate                                                                                                    | Benefit                                                                    | Failure                                                                | Disposition |
| ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| Duplicate full questions inside each lesson                                                                  | Simple local rendering                                                     | Creates multiple answer authorities and revision drift                 | Rejected    |
| Fetch a public bank manifest and build the quiz entirely in the browser                                      | Easy cross-file lookup                                                     | Breaks the no-JavaScript fallback and defers schema failure to runtime | Rejected    |
| Parse bank/selection blocks per file, resolve through a render-time tree transform, then enhance static HTML | One canonical bank, build-time failure, readable fallback, no corpus fetch | Requires a local multi-category Quartz plugin                          | Selected    |

## Contracts

### Canonical authoring

- A `type: question-bank` page contains exactly one `knowledge-question-bank` fenced block.
- The block has `schemaVersion: 1` and a non-empty unique `questions` array.
- Every question has an immutable UUID, positive `revision`, `status`, `type`, non-empty `prompt`, and non-empty `explanation`.
- `single-choice` has at least two unique options and exactly one valid answer ID.
- `multiple-select` has at least three unique options, at least two valid answer IDs, and at least one incorrect option.
- `true-false` has a Boolean `answer`.
- `free-recall` has a non-empty `sampleAnswer` and is self-graded.
- A `knowledge-quiz` block has a UUID `quizId`, bank UUID, and non-empty unique question UUIDs.
- Unknown keys, HTML-bearing strings, duplicate IDs, missing references, cross-bank references, and retired selections fail validation.

### Runtime behavior

- Static HTML contains every prompt, choice, answer, and explanation.
- Without JavaScript, every question is readable and its answer/explanation is reachable through a semantic disclosure.
- With JavaScript, one question is visible at a time.
- Choice selection alone never reveals correctness. **Check answer** commits the current selection.
- Objective questions show a text-and-icon correct/incorrect status and an explanation in an `aria-live` region.
- Free recall reveals a sample answer and asks for a self-assessment.
- Previous/next, reset, and all answers are keyboard reachable with visible focus.
- State exists only in the current DOM and resets on refresh, close, or navigation.
- Repeated Quartz navigation cannot duplicate handlers.

## Expected files

- `plugins/knowledge-quiz/package.json`
- `plugins/knowledge-quiz/index.ts`
- `plugins/knowledge-quiz/src/schema.ts`
- `plugins/knowledge-quiz/src/render.ts`
- `plugins/knowledge-quiz/src/quiz-client.ts`
- `plugins/knowledge-quiz/quiz.scss`
- `plugins/knowledge-quiz/src/*.test.ts`
- `quartz.config.yaml`
- `content/courses/retrieval-field-guide/question-banks/fundamentals.md`
- `content/courses/retrieval-field-guide/lessons/02-design-the-evidence-loop.md`
- `content/showcase.md`
- `docs/product/PRD.md`
- `docs/contracts/CONTENT_MODEL.md`
- `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md`
- `docs/templates/content_intake_handoff_prompt.md`
- `docs/architecture/VERSION_MATRIX.md`

## Steps

1. Record the confirmed OQ-09 decision and tighten the canonical V1 schema.
2. Implement one runtime validator/parser shared by transformer and tests.
3. Implement build-time bank/selection parsing and cross-file resolution.
4. Render semantic static fallback markup and scoped quiz styling.
5. Add the in-memory browser controller with lifecycle teardown.
6. Replace the rejected showcase disclosures with a link to a real lesson quiz and add a representative four-type bank.
7. Update the two LLM handoff templates with the exact candidate-to-canonical integration format.
8. Run focused tests, malformed fixture checks, content validation, TypeScript/format checks, a real Quartz build, and browser/accessibility checks.

## Security and privacy

- All quiz data is intentionally public and must contain only owner-approved public material.
- YAML is treated as `unknown` and narrowed at the plugin boundary.
- Question strings render as HAST text nodes; embedded HTML and scripts are rejected.
- No remote runtime dependency, credentials, browser storage, or user identity is introduced.
- The plugin never reads private authoring packages or owner source files.

## Rollback

Disable the local plugin in `quartz.config.yaml`, remove the fenced selection block from the demo lesson, and restore the prose-only recall link. Question-bank Markdown remains readable source and no user data is lost because no progress is persisted.

## Stop conditions

- The installed Quartz lifecycle differs from the verified hook behavior.
- Cross-file data cannot be resolved before static rendering.
- Strict validation would require a Quartz core patch.
- Any licensed/private source text would enter `content/`.
- The static fallback or article body fails when quiz JavaScript is unavailable.

## Acceptance evidence

- [x] Authoring schema accepts all four supported types and rejects malformed/unknown fields.
- [x] Unknown bank/question IDs and retired selections fail the build.
- [x] The real demo lesson renders one question at a time with JavaScript.
- [x] Selecting an option does not grade; **Check answer** reports correct/incorrect.
- [x] Multiple-select compares the exact selected set, independent of order.
- [x] Free recall is explicitly self-graded.
- [x] Reset clears the current in-memory attempt.
- [x] No-JavaScript fallback exposes answers and explanations.
- [x] Repeated SPA navigation creates one controller per quiz.
- [x] `npm run validate:content`, focused tests, TypeScript, targeted Prettier, and real Quartz build pass.
- [x] Browser keyboard and accessibility checks pass.

## Completion evidence

- `npm run validate:content`: 551 entities and 551 unique IDs passed.
- `npm test`: 180 tests across 45 suites passed; no skips or failures.
- `npx tsc --noEmit`: passed under strict TypeScript.
- Targeted Prettier check: passed.
- `npx quartz build --concurrency=1`: 552 inputs, 1 filtered, and 598 emitted files; passed.
- `npm run validate:graph`: 551 pages, 2 tags, 2160 relationships, and 533 graph-enabled pages; passed without quiz-derived edges.
- Browser interaction: wrong then correct single-choice feedback, exact-set multiple-select grading, free-recall reveal/self-assessment, reset, and full-width answer-row layout passed.
- Browser accessibility tree: named quiz region, fieldset/legend prompts, labelled native radios/checkboxes/textarea/buttons, live feedback region, and visible focus styling passed inspection.
- Static-output check: the quiz is a standalone semantic section and every answer/explanation remains in a no-JavaScript disclosure fallback.

## Adversarial completion review

- Generated quiz controls and bank references are not graph edges.
- UUIDs are authored and immutable; no path/title-derived fallback exists.
- Unknown runtime data is validated, not cast.
- No answer is invented, inferred from position, or accepted if its option ID is absent.
- Quiz failure leaves the lesson readable.
- No durable state, identity, database, or private asset path was introduced.
- No global selector, remote script, full browser corpus scan, or quadratic corpus path was introduced.

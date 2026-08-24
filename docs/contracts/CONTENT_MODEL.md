# Content Model Contract

This document is the normative human-readable contract for published content, courses, lessons, question banks, quizzes, and learning annotations. It belongs under `docs/contracts/` because implementations, validators, fixtures, content agents, and migration tools consume the same serialized fields.

The machine-readable schemas created during implementation are executable authority. CI must detect drift between those schemas, this contract, and the examples below.

## Common published-content fields

Every published `page`, `category`, `article`, `course`, `lesson`, `question-bank`, or `learning-note` requires:

| Field         | Contract                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `id`          | Canonical lower-case UUID generated once and never derived from a path, title, date, or list position.               |
| `title`       | Non-empty human-readable title.                                                                                      |
| `description` | Plain-text summary suitable for listings and previews.                                                               |
| `type`        | One supported discriminator: `page`, `category`, `article`, `course`, `lesson`, `question-bank`, or `learning-note`. |
| `publish`     | Must be `true` for public output. Missing or false content is excluded.                                              |
| `status`      | `active` or `archived`.                                                                                              |
| `created`     | Editorial creation date in `YYYY-MM-DD` form.                                                                        |
| `tags`        | Controlled normalized tag array, possibly empty.                                                                     |

Optional common fields include `updated`, `order`, `permalink`, `aliases`, `lang`, `socialImage`, and `comments`.

`updated` is an editorial date for a meaningful revision. Git or deployment timestamps must not silently redefine it.

`comments: true` explicitly opts a page into the optional community-discussion feature after that feature passes its Phase 4 gates. The current owner-only capture decision does not enable Giscus; missing or false means comments are disabled.

## Recommended course directory layout

```text
content/
  courses/
    retrieval-foundations/
      index.md
      lessons/
        01-why-retrieval.md
      question-banks/
        fundamentals.md
```

All course, lesson, and question-bank Markdown remains below `content/`. Folder nesting is organization and current route context; immutable frontmatter IDs remain the only content identity source.

## Editorial source-authoring boundary

ADR-0002 defines a noncanonical, source-to-review-package layer. It is not a
public Quartz content type and is never emitted by the site. The portable
personal-wiki kit is a separate workspace and has no authority here.

Repository-aware output layout:

```text
private/
  content-authoring/
    <packageId>/
      owner-input.yaml
      source-inventory.yaml
      placement-proposal.yaml
      content-draft/
        course-index.md
        lessons/<lesson-slug>.md
        article.md
      glossary.md
      question-bank-candidate.md
      quiz-selection-proposal.yaml
      provenance.md
      audit.md
```

Only the assignment-appropriate content shape is created: course index and
lessons for a course, or `article.md` for an article, paper, or coherent notes
set. The agent never creates both shapes implicitly.

The owner creates the `owner-input.yaml` envelope from
`docs/templates/content_intake_handoff_prompt.md`. Every source is an exact
owner-declared allowlist entry and remains read-only at its supplied location.
The agent cannot inspect sibling paths, add sources, move/delete source files,
copy full source bodies, write `content/`, or approve its own package.

Rules:

- `packageId` is a stable workflow label, not a canonical content ID.
- Every local source path is exact, owner-supplied, and hashed where readable. A
  changed hash is a new source revision and cannot silently overwrite a prior
  package.
- Owner verification records separate source-identity, completeness, factual,
  currency, rights, and quotation-permission scopes. One checked field never
  implies another.
- Source paths remain only in the private inventory. Draft prose uses source
  references and deterministic locators so private paths cannot leak into
  public integration.
- Generated prose, glossary terms, questions, answers, explanations, placement,
  tags, and links remain proposals until independent review.
- The agent never generates canonical UUIDs. Missing support yields
  `needs-source`, `needs-answer`, `disputed`, or `blocked`.
- An existing category can be proposed only by immutable content ID. Ambiguity
  requires owner selection; a new-category proposal does not create its public
  folder or ID.
- External provenance is not an internal graph edge. Suggested internal links
  become edges only if later accepted into authored Markdown body content.
- Generated category tables, lesson tables, indexes, backlinks, and explorer
  links are navigation, not authored relationship proposals.

## `Study.md`, glossary, and assessment disposition

An owner-supplied course `Study.md` may contain transcripts, extracted quizzes,
source metadata, or malformed fragments. It remains a read-only source and is
never copied wholesale to `content/` or renamed into a canonical question bank.

| Source/package part       | Permitted derived output                                                                | Prohibited shortcut                                                          |
| ------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Transcript/notes          | Original course overview and lesson prose with deterministic locators and rights review | Publishing the full transcript or lightly paraphrasing it section by section |
| Source metadata           | Private provenance evidence and an approved public citation after review                | Exposing local paths or treating a URL as an internal graph edge             |
| Glossary                  | Source-grounded terms, confusions, locators, and evidence status                        | Inventing a public glossary type/path or unsupported definition              |
| Assessment prompt/options | Comparison evidence; a candidate only with a supported key and explanation              | Guessing the key or assuming option order encodes correctness                |
| Generated core questions  | Separate packet-defined review artifact grounded in provided sources                    | Appending questions/answers to `Study.md` or public lessons                  |
| Advanced questions        | Separately labeled candidates with authorized external verification sources             | Using unattributed model memory or attributing them to the course            |

At canonical integration, course/lesson prose, public provenance, approved
glossary material, question definitions, and lesson quiz selections live in
their own approved contracts. One canonical question definition is never
duplicated into a lesson body. OQ-09 still blocks executable question-bank
integration.

## Published article

```yaml
---
id: "7cd1f739-d876-4556-a5d8-2b4b602d3728"
title: "Embeddings"
description: "How text and other data become vectors for semantic retrieval."
type: article
publish: true
status: active
created: "2026-08-22"
tags:
  - semantic-search
  - retrieval
order: 20
aliases:
  - "Vector Embeddings"
---
```

## Category index

Path: `content/ai/rag/index.md`

```yaml
---
id: "1d772d1f-bfec-43a1-bf4b-d4ad411f96db"
title: "Retrieval-Augmented Generation"
description: "Guides and research covering retrieval, context construction, and grounded generation."
type: category
publish: true
status: active
created: "2026-08-22"
tags: []
---
```

The Markdown body is a curated wiki introduction. The site appends one generated semantic table containing every eligible published direct child: immediate child category indexes, articles, courses, and any later type explicitly allowed by the contract.

A direct child is immediately nested in this category folder. A subcategory appears once as a row linking to its own `index.md`; articles below that subcategory appear on the subcategory page, not recursively in this parent table.

Reader-facing columns are type, linked title, description, tags, and editorial updated date when present. Rows sort by explicit `order`, then normalized title, then immutable ID. Exclude the current index, drafts, archived content, attachments, unrelated pages, and alias/permalink duplicates. Do not hand-maintain a duplicate table or add a recursive `listingScope` field in the baseline.

## Course index

Path: `content/courses/retrieval-foundations/index.md`

```yaml
---
id: "dc928765-e357-475d-89fd-a4ea724cb8cc"
title: "Retrieval Foundations"
description: "A guided course on indexing, retrieval, evaluation, and grounded generation."
type: course
publish: true
status: active
created: "2026-08-22"
tags:
  - retrieval
difficulty: beginner
learningOutcomes:
  - "Explain the role of retrieval in a grounded generation system."
  - "Compare common chunking and ranking tradeoffs."
prerequisiteIds: []
comments: false
---
```

The course body contains its authored overview. The site appends a generated semantic lesson table from every published active `lesson` entity whose `courseId` matches this course. Columns are lesson order, linked title, description, estimated time when present, and tags. Generated lesson links are navigation and do not create authored graph edges.

The lesson table is type-specific: it does not blindly enumerate files or folders and does not mix question-bank files into lesson rows. If the provisional question-bank model is approved, public banks may appear in a separately labeled practice section defined by the executable Phase 2 schema.

Course-specific fields:

| Field              | Required | Contract                                                    |
| ------------------ | -------: | ----------------------------------------------------------- |
| `learningOutcomes` |      Yes | Non-empty array of plain-text learner outcomes.             |
| `difficulty`       |       No | `beginner`, `intermediate`, or `advanced`.                  |
| `prerequisiteIds`  |       No | Unique stable content IDs; missing targets fail validation. |

## Lesson

Path: `content/courses/retrieval-foundations/lessons/01-why-retrieval.md`

```yaml
---
id: "3e288647-4921-4fb9-b948-9e87e3fe65ca"
title: "Why Retrieval Matters"
description: "Learn why external evidence can improve the grounding and currency of generated answers."
type: lesson
publish: true
status: active
created: "2026-08-22"
tags:
  - retrieval
courseId: "dc928765-e357-475d-89fd-a4ea724cb8cc"
lessonOrder: 1
estimatedMinutes: 25
comments: false
---
```

`courseId` must reference a published course. `lessonOrder` is a positive integer unique within that course. The filename prefix is presentation/organization only and is never identity.

Lesson-specific fields:

| Field              | Required | Contract                                                 |
| ------------------ | -------: | -------------------------------------------------------- |
| `courseId`         |      Yes | Immutable ID of the owning course.                       |
| `lessonOrder`      |      Yes | Positive integer unique within the course.               |
| `estimatedMinutes` |       No | Positive integer estimate; not a completion requirement. |

Every published lesson is directly navigable. `lessonOrder` supplies a recommended sequence and generated previous/next controls; it does not lock the lesson or prove completion.

## Question-bank draft authoring boundary

Use `docs/templates/QUESTION_BANK_AUTHORING_PACKET.md` when compiling supplied course, article, paper, or notes material into candidate questions. This editorial interchange format is intentionally richer than the provisional runtime schema: it records source allowlists, deterministic locators, claim/coverage inventories, likely-confusion risk areas, question tiers, option-level evidence, quality audits, and independent review.

Draft metadata is not canonical content and does not belong below `content/` until reviewed and transformed through the sanctioned integration path. Temporary draft IDs never become content, bank, quiz, or question identity. The authoring LLM may mark work only `candidate` or `blocked`; it cannot certify its own factual accuracy or publication readiness.

The packet defines the complete noncanonical artifact tree. A repository-aware run uses the Git-ignored `private/question-bank-authoring/<draftSetId>/` root unless the owner supplies another explicit nonpublic working root. Source material stays at its declared read-only location and is referenced through the owner allowlist; the authoring LLM does not copy full source text or create alternate output folders. Without an authorized writable root, it returns a filename-labeled artifact and creates no directory.

Question-bank authoring is non-mutating: it does not append questions to the supplied article, transcript, lesson, or notes. After independent review and Phase 2 approval, a maintainer places course question definitions once in `content/courses/<course-slug>/question-banks/<bank-slug>.md` and adds only an ordered bank/question selection block to an existing lesson. Article selection may target the existing article file, but its shared bank location remains blocked until OQ-09 resolves that contract. Importing or adapting source material into public lessons is a separate content task and publication-rights decision.

Core `source-reinforcement` questions must originate in supplied material. They cover foundations before missed details, misconceptions, exceptions, failure modes, boundary conditions, applications, and transfer. `verified-deep-dive` questions follow the core set and must extend a declared supplied-source claim using separately identified authoritative evidence. Source fidelity and independent factual verification remain separate gates. Timestamps are optional, but evidence summaries without deterministic source anchors are insufficient.

Each essential learning objective requires at least one unaided generative-retrieval candidate, normally `free-recall`, or an owner-reviewed documented gap. Choice-question recognition alone does not prove recall mastery.

The executable Phase 2 plan must explicitly disposition every editorial field as strict public schema, authored provenance/UI, or review-only evidence. It must also resolve article/shared-bank ownership and whether core/deep-dive groups render as one ordered quiz or separate quiz blocks. No integration agent silently drops unresolved evidence or invents placement.

## Provisional question bank

This is the recommended working contract pending PRD decision OQ-09. It must not be implemented as executable authority until the owner confirms it; Phase 2 also must not invent a competing inline-only shape.

Path: `content/courses/retrieval-foundations/question-banks/fundamentals.md`

```yaml
---
id: "6fbeb15e-1ea1-40dc-87bb-830b49907e31"
title: "Retrieval Fundamentals Question Bank"
description: "Reusable active-recall questions for the Retrieval Foundations course."
type: question-bank
publish: true
status: active
created: "2026-08-22"
tags:
  - retrieval
courseId: "dc928765-e357-475d-89fd-a4ea724cb8cc"
comments: false
---
```

The Markdown body may explain the scope and evidence used to author the bank. The canonical question definitions live in one `knowledge-question-bank` fenced block:

````markdown
```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "c8d6eb3b-f6d2-4cbb-8edf-4c78e75358ee"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the primary purpose of retrieval in RAG?"
    options:
      - id: a
        text: "To replace the language model"
      - id: b
        text: "To supply relevant external context"
      - id: c
        text: "To encrypt the prompt"
    correctOptionIds: [b]
    explanation: "Retrieval supplies relevant evidence that can ground generation."
  - id: "f61df196-9ccc-4ba9-8794-2606fe9c799f"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why chunk size changes retrieval quality."
    sampleAnswer: "Chunk size changes how much context and topic mixing each retrieved unit contains."
    explanation: "Useful answers discuss precision, context completeness, and boundary effects."
```
````

Question-bank-specific fields:

| Field      |             Required | Contract                                                                      |
| ---------- | -------------------: | ----------------------------------------------------------------------------- |
| `courseId` | Yes for the baseline | Stable ID of the owning course; path nesting does not replace this reference. |

Question definition fields:

| Field         | Required | Contract                                                                                              |
| ------------- | -------: | ----------------------------------------------------------------------------------------------------- |
| `id`          |      Yes | Immutable UUID, globally unique across all question banks.                                            |
| `revision`    |      Yes | Positive integer incremented whenever prompt, options, answer, sample answer, or explanation changes. |
| `status`      |      Yes | `active` or `retired`; a published referenced question is retired rather than silently deleted.       |
| `type`        |      Yes | Supported discriminated question type.                                                                |
| `prompt`      |      Yes | Non-empty plain text.                                                                                 |
| `explanation` |      Yes | Non-empty plain text supported by the authored source material.                                       |

The bank content ID comes only from frontmatter. The fenced block must not declare a second `bankId`. Preserve a question ID for a correction or refinement of the same learning objective and increment `revision`. Create a new ID when the item is repurposed for a materially different objective. An agent uses `needs-answer` rather than inventing a missing correct answer or explanation.

## Standalone page

```yaml
---
id: "a50eabef-9551-4280-8b4b-2b345cfb5f5d"
title: "About"
description: "About this knowledge site and how its content is maintained."
type: page
publish: true
status: active
created: "2026-08-22"
tags: []
---
```

## Draft article

```yaml
---
id: "837279ff-25cc-4bad-84b2-ed83b54d9031"
title: "Draft Retrieval Notes"
description: "Working notes that are not yet available on the public site."
type: article
publish: false
status: active
created: "2026-08-22"
tags:
  - retrieval
---
```

Do not combine `publish: true` and `draft: true`.

## Archived article

```yaml
---
id: "7cd1f739-d876-4556-a5d8-2b4b602d3728"
title: "Embeddings"
description: "Archived introduction to vector representations for retrieval."
type: article
publish: true
status: archived
created: "2026-08-22"
tags:
  - semantic-search
---
```

Archival retains the original ID. The runtime/route policy determines the tombstone or redirect behavior; the ID is never reused.

## Public learning annotations

Durable owner-authored follow-up questions and reminders live in ordinary Markdown callouts:

```markdown
> [!question] Follow-up
> How would this technique behave with multilingual documents?

> [!todo] Revisit
> Compare this claim with the evaluation lesson before publishing a conclusion.
```

Use verified built-in callout types for the baseline: `[!question]` for follow-ups, `[!todo]` for reminders, `[!note]` for study notes, and `[!warning]` for corrections. Public comments are a separate discussion surface and are not canonical annotations.

## Learning Log entry

Path: `content/learning-log/multilingual-retrieval-follow-up.md`

```yaml
---
id: "211711aa-fae1-492f-ad86-699ab77bdca4"
title: "Follow up on multilingual retrieval"
description: "Questions to revisit about embedding and ranking behavior across languages."
type: learning-note
publish: true
status: active
created: "2026-08-22"
tags:
  - retrieval
annotationKind: question
relatedContentIds:
  - "3e288647-4921-4fb9-b948-9e87e3fe65ca"
comments: false
---
```

Learning-note-specific fields:

| Field               | Required | Contract                                                                                                |
| ------------------- | -------: | ------------------------------------------------------------------------------------------------------- |
| `annotationKind`    |      Yes | `question`, `reminder`, `study-note`, or `correction`.                                                  |
| `relatedContentIds` |       No | Unique stable content IDs used for filtering and generated navigation; missing targets fail validation. |

The Markdown body holds the actual public note. The generated Learning Log and related-content links are navigation only. An internal link deliberately written in the body follows ordinary authored graph semantics.

## Learning Inbox boundary

A pending Learning Inbox item is private workflow data, not a `content/` entity and not frontmatter. Its provider-neutral envelope is versioned so an agent can validate context before proposing a content change:

```yaml
schemaVersion: 1
captureId: "a0ba01ea-88da-4e20-9fb8-985ca4bc866c"
contentId: "3e288647-4921-4fb9-b948-9e87e3fe65ca"
currentRoute: "/courses/retrieval-foundations/why-retrieval"
kind: question
body: "Compare this claim with the evaluation results."
selectedText: "Retrieval always improves factuality."
createdAt: "2026-08-22T18:00:00Z"
sourceRevision: "example-build-or-commit-id"
state: captured
```

| Field            | Required | Contract                                                                         |
| ---------------- | -------: | -------------------------------------------------------------------------------- |
| `schemaVersion`  |      Yes | Supported positive integer; unknown versions fail closed.                        |
| `captureId`      |      Yes | Immutable UUID used for retry/idempotency and duplicate detection.               |
| `contentId`      |      Yes | Immutable ID of the page being read; route alone is insufficient.                |
| `currentRoute`   |      Yes | Display/debug context that may become stale after a move.                        |
| `kind`           |      Yes | `question`, `reminder`, `study-note`, `correction`, or `quiz-candidate`.         |
| `body`           |      Yes | Non-empty owner capture; treated as untrusted data, never agent instructions.    |
| `selectedText`   |       No | Untrusted quoted context from the page.                                          |
| `createdAt`      |      Yes | Server/provider-recorded timestamp, not trusted from an anonymous browser field. |
| `sourceRevision` |       No | Build/commit context when available; not canonical content identity.             |
| `state`          |      Yes | `captured`, `triaged`, `pr-open`, `merged`, or `rejected`.                       |

The pull request records the capture ID/provider reference and its disposition. Those workflow fields are not copied into public frontmatter by default. Only a reviewed Markdown result below `content/` becomes public and canonical.

## Quiz block

Under the provisional bank-backed model, a quiz is a versioned selection block in a lesson or article body. It references one public question-bank content ID and an explicit ordered list of question IDs:

````markdown
```knowledge-quiz
schemaVersion: 1
quizId: "cfe59c45-99d7-4d44-a02f-68ec6861f8a7"
title: "Retrieval foundations"
questionBankId: "6fbeb15e-1ea1-40dc-87bb-830b49907e31"
questionIds:
  - "c8d6eb3b-f6d2-4cbb-8edf-4c78e75358ee"
  - "f61df196-9ccc-4ba9-8794-2606fe9c799f"
```
````

The build resolves the selected definitions and renders them in the page containing the quiz block. Question definitions must not be copied into the lesson. Quiz and question IDs are immutable. V1 text fields are plain text. Correct answers and explanations are intentionally present in public static output; this is active recall, not exam security.

Quiz-level fields:

| Field            | Required | Contract                                                           |
| ---------------- | -------: | ------------------------------------------------------------------ |
| `schemaVersion`  |      Yes | Integer `1` for V1; unsupported versions fail the build.           |
| `quizId`         |      Yes | Immutable canonical UUID unique across published quiz blocks.      |
| `title`          |      Yes | Non-empty plain-text title.                                        |
| `questionBankId` |      Yes | Stable content ID of one published, active question bank.          |
| `questionIds`    |      Yes | Non-empty ordered unique list of active question IDs in that bank. |

Every selected question resolves at build time. Missing banks, cross-bank question references, duplicate selections, and retired questions fail validation rather than being skipped.

Supported question-definition variants:

| Question type     | Additional required fields                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `single-choice`   | At least two unique `options`; `correctOptionIds` containing exactly one existing option ID.     |
| `multiple-select` | At least two unique `options`; non-empty `correctOptionIds` containing only existing option IDs. |
| `true-false`      | Boolean `answer`.                                                                                |
| `free-recall`     | Non-empty plain-text `sampleAnswer`; it is self-graded rather than automatically scored.         |

## External video boundary

Baseline lessons may contain approved public/unlisted YouTube embeds, ordinary external video links, and intentionally public direct-video embeds only through syntax verified against the pinned Quartz implementation. Do not paste arbitrary iframe HTML or download/rehost an external video. Every embed needs a descriptive title and ordinary fallback link. Unlisted is public-by-link, not access-controlled.

## Managed knowledge video target

````markdown
```knowledge-video
mediaId: "cfe59c45-99d7-4d44-a02f-68ec6861f8a7"
title: "RAG Retrieval Walkthrough"
```
````

This syntax is not part of the baseline. If managed video is approved later, provider and provider-asset mapping live in one reviewed media registry rather than being duplicated in every lesson block.

## Identity reminder

```text
id         = permanent machine identity; never changes
path       = current repository location; can change
slug       = current generated route; can change
permalink  = optional stable public route; not identity
title      = display name; can change
folder     = category placement; can change
tags       = cross-category membership; can change
courseId   = stable owning-course identity for a lesson or course-owned question bank
questionBankId = frontmatter content ID of one question-bank page
quizId     = stable identity of a quiz block
questionId = stable identity of one canonical question definition
questionRevision = monotonic content revision for that definition
learningNoteId = stable identity of a public Learning Log entry
captureId  = private workflow identity; never public content identity
```

## Strict validation summary

Publication fails on:

- missing, malformed, duplicate, or unexpectedly changed IDs;
- an unsupported content or question type;
- conflicting `publish: true` and `draft: true`;
- an unknown controlled tag;
- a public category folder without a valid published category `index.md`;
- a generated category listing that omits or duplicates an eligible direct child, includes the current index, or flattens a recursive grandchild;
- a lesson with an unknown `courseId`;
- duplicate `lessonOrder` in one course;
- a question bank with an unknown `courseId`;
- a learning note with an unknown `relatedContentIds` target;
- an unsupported or malformed quiz schema;
- a missing, unpublished, archived, or unknown `questionBankId`;
- a selected question missing from the referenced bank, duplicated in one selection, or marked `retired`;
- a changed question definition without an incremented positive `revision`;
- a quiz question without a required answer or explanation;
- a correct option that does not exist;
- an unsafe executable value in a plain-text quiz field;
- route, permalink, alias, or case collisions.

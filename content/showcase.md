---
id: "cb573d46-9d9c-4e0a-b612-41de64d4098e"
title: "Feature Field Test"
description: "A guided local test of the live knowledge, navigation, annotation, and active-recall surfaces."
type: page
publish: true
status: active
created: "2026-08-24"
tags:
  - retrieval
order: 5
comments: false
---

This page is a test bench, not a sales page. Each section names what actually
works in the local build and what remains behind a product or architecture gate.

## Navigation that earns its place

- Use **Search** to find “failure signal” or “evidence loop.”
- Expand **Explorer** to move between knowledge, courses, and the Learning Log.
- Hover [[knowledge-systems/retrieval-as-a-decision-system|this internal link]]
  for a preview, then open it and inspect the backlink on the destination.
- Switch color mode from the left toolbar; the content hierarchy stays the same.

> [!question] Follow-up
> Which part of the learning loop should become the default landing point once
> real course material replaces this showcase?

> [!todo] Revisit after use
> Record which search terms fail to surface the page you expected.

## Active recall—bank-backed quiz

The temporary purple disclosure strips are gone. Open
[[courses/retrieval-field-guide/lessons/02-design-the-evidence-loop|Design the evidence loop]]
to try the real quiz: choose an answer, press **Check answer**, receive an
explicit correct or incorrect result, and read the explanation. The four-question
demo also proves multiple-select, true/false, and self-graded free recall.

## Content surfaces

| Surface      | Demonstrated here                                    | Product boundary                                       |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------ |
| Article      | Long-form explanation, headings, tables, tags        | Canonical Markdown with immutable ID                   |
| Category     | Curated index plus generated folder listing          | Final semantic direct-child table remains Phase 1 work |
| Course       | Outcomes, recommended order, directly linked lessons | No completion gate or persisted progress               |
| Annotation   | Question, reminder, note, and warning callouts       | Public authored content, not private capture           |
| Learning Log | Standalone public learning note                      | Generated filtering UI remains Phase 2 work            |
| Recall       | Canonical bank-backed interactive quiz               | Attempt state resets on refresh or navigation          |

## Later, not simulated

The following capabilities have no fake buttons in this demo:

- owner-only Learning Inbox capture;
- community comments;
- custom knowledge graph;
- managed video upload;
- synchronized progress;
- browser publishing administration.

Their absence is intentional. Each needs its own identity, privacy, lifecycle,
failure, and rollback evidence before it can be called functional.

> [!warning] Demo boundary
> Do not use the recall disclosures as exam security. Answers are intentionally
> present in public static HTML.

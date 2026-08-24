---
id: "90dcf39c-f5f8-4cc2-a92f-7a52b099d4c6"
title: "Evaluate the Retriever Separately"
description: "A reminder to diagnose evidence selection before changing answer instructions."
type: learning-note
publish: true
status: active
created: "2026-08-24"
tags:
  - retrieval
annotationKind: reminder
relatedContentIds:
  - "00306953-4e89-47a3-b925-f3f4f333d91d"
  - "e3a471ee-e96f-4f5c-bc79-c45c37e5b854"
comments: false
---

When an answer misses a condition, first check whether the condition appeared in
the retrieved evidence. If it did not, changing only the answer prompt treats a
symptom downstream of the loss.

> [!todo] Next review
> Add one paired example: the same visible answer failure caused once by missing
> evidence and once by evidence misuse.

Related reading: [[knowledge-systems/retrieval-as-a-decision-system|Retrieval as a decision system]] and [[knowledge-systems/evaluation/measure-the-retriever|Measure the retriever before the answer]].

---
id: "e3a471ee-e96f-4f5c-bc79-c45c37e5b854"
title: "Measure the Retriever Before the Answer"
description: "Separate evidence selection from answer use so an evaluation result suggests a repair."
type: article
publish: true
status: active
created: "2026-08-24"
tags:
  - retrieval
order: 10
comments: false
---

An end-to-end score tells you whether the final result worked. It does not tell
you where the repair belongs. Evaluate the evidence boundary and the answer
boundary separately before combining them into one product judgment.

## Two questions, two repairs

| Boundary           | Evaluation question                                          | Repair direction                                        |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------- |
| Evidence selection | Did the returned set contain the material needed to answer?  | Scope, segmentation, query, filter, or ranking changes  |
| Answer use         | Given adequate evidence, did the response use it faithfully? | Instruction, synthesis, citation, or abstention changes |

If evidence is missing, polishing the answer layer can make the failure harder
to notice. If evidence is present but misused, adding more retrieval volume can
increase noise without fixing the reasoning.

> [!todo] Revisit
> Define one evaluation example where the same final failure could originate at
> either boundary, then write the observation that distinguishes them.

Return to [[knowledge-systems/retrieval-as-a-decision-system|Retrieval as a decision system]] for the full chain.

Then continue to [[courses/retrieval-field-guide/lessons/02-design-the-evidence-loop|Design the evidence loop]].

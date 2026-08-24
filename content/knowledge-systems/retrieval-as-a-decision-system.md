---
id: "00306953-4e89-47a3-b925-f3f4f333d91d"
title: "Retrieval as a Decision System"
description: "A practical model for locating retrieval failures before they become fluent answer failures."
type: article
publish: true
status: active
created: "2026-08-24"
tags:
  - retrieval
order: 10
comments: false
---

Retrieval is often described as one step: “find relevant context.” In practice,
it is a chain of decisions. A useful diagnosis names the earliest decision that
could have removed the needed evidence.

## The chain

| Decision       | Working question                                 | Typical failure signal                                                      |
| -------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| Scope          | Which sources are eligible?                      | The needed evidence was never in the searchable set.                        |
| Representation | What unit is retrieved?                          | Results contain fragments without the condition that changes their meaning. |
| Query          | What need does the search express?               | Results match wording but miss the user's actual constraint.                |
| Ranking        | Which candidates appear first?                   | Relevant evidence exists but is buried below stronger lexical matches.      |
| Use            | How does the reader or generator apply evidence? | The right passage is present but the answer ignores or distorts it.         |

This framing prevents a common debugging error: changing the answer prompt when
the evidence was already lost earlier in the pipeline.

> [!question] Follow-up
> When a query is underspecified, should the system retrieve broadly or ask for
> clarification before searching?

> [!warning] Boundary
> A confident answer is not evidence that retrieval worked. Fluency and evidence
> quality must be inspected separately.

## A compact diagnostic

1. Write the claim the answer must support.
2. Identify the smallest evidence unit that would support or challenge it.
3. Check whether that unit was eligible for search.
4. Check whether it was retrieved and ranked high enough to be used.
5. Check whether the final answer preserved its conditions and uncertainty.

The next note, [[knowledge-systems/evaluation/measure-the-retriever|Measure the retriever before the answer]], turns this diagnostic into an evaluation split.

The first course lesson, [[courses/retrieval-field-guide/lessons/01-frame-the-question|Frame the question]], applies it before a search begins.

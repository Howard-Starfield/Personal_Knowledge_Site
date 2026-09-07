---
id: "f241644e-78ab-4e63-8147-911a19223623"
title: "Change One Variable at a Time"
description: "Design a small comparison that reveals which change affected the result."
type: article
publish: true
status: active
created: "2026-08-30"
tags: []
order: 10
comments: false
---

When several parts of a system change together, a better result does not tell
you which change helped. A worse result does not tell you which change caused
the damage. Small comparisons preserve that information.

> [!abstract] Example content
> This article uses a fictional blog search test. It is original mock material,
> not a report of measured production performance.

## Write the comparison first

Suppose a search misses an article that a reader expects to find. You could
rewrite the title, add tags, change the query, and adjust ranking in one pass.
That might improve the result, but the test would teach you very little.

Write the comparison before changing the system.

| Part          | Example                                                       |
| ------------- | ------------------------------------------------------------- |
| Baseline      | The query "decision risk" returns no Decision Tools article.  |
| Intervention  | Add the phrase "decision risk" to one article description.    |
| Measure       | Record whether the expected article enters the first results. |
| Stop rule     | Stop if the edit harms the description or adds a false claim. |
| Next decision | Keep, revise, or revert the wording based on the result.      |

The intervention should preserve meaning. Do not add a keyword merely to win a
search test. The page still has to tell the truth when a reader opens it.

## Keep the failed test

A failed comparison narrows the problem. If the description changes but the
result does not, the next test can inspect indexing or ranking. Record the
failed attempt so another person does not repeat it as if it were new work.

Use [[decision-tools/write-the-decision-before-the-meeting|Write the decision before the meeting]] to record why the experiment is worth running and what evidence would change the larger choice.

> [!warning] One variable is a diagnostic rule
> Real systems have interacting parts. Start with one change when you need to
> locate a cause. Test combinations later when the interaction itself becomes
> the question.

---
id: "7477cab0-586c-4437-9b79-de7f1b05c45d"
title: "Design the Evidence Loop"
description: "Create separate checks for evidence selection and answer use, then connect each failure to a repair."
type: lesson
publish: true
status: active
created: "2026-08-24"
tags:
  - retrieval
courseId: "8938cffa-fe2c-4e16-9eb1-399a44c32e1d"
lessonOrder: 2
estimatedMinutes: 10
comments: false
---

A useful evaluation loop produces a next action. Start with one representative
question and keep the evidence-selection result separate from the answer-use
result.

## Build the loop

- [ ] Record the exact question and its important constraints.
- [ ] Describe the minimum evidence a strong result should contain.
- [ ] Inspect whether the returned set contains that evidence.
- [ ] Inspect whether the answer uses the evidence without dropping conditions.
- [ ] Assign the failure to the earliest boundary that explains it.
- [ ] Change one decision and rerun the same case.

> [!note] Why one change?
> Changing scope, segmentation, ranking, and answer instructions together may
> improve the result, but it hides which change mattered.

## Check your understanding

Select an answer, then use **Check answer**. The quiz keeps its state only while
this page remains open; refreshing or leaving the page starts a new attempt.

```knowledge-quiz
schemaVersion: 1
quizId: "58c51c7f-6255-49dd-baac-5b9f7b12fe3c"
title: "Diagnose the evidence loop"
questionBankId: "3afae4fa-5974-407f-9ad4-90b15a696fd4"
questionIds:
  - "73273639-7382-456c-8319-c7e3a8c72dd1"
  - "cc6d315d-e746-43fa-9cf8-ecf89865f0e4"
  - "617ee777-4f57-4517-b16f-a8ffe2db1715"
  - "1c66665a-eaf0-4114-ac79-d9b9b0e98060"
```

## Recall before reveal

Before checking the quiz explanation, explain why one end-to-end score cannot
distinguish every retrieval failure from every answer failure.

The detailed evaluation note is [[knowledge-systems/evaluation/measure-the-retriever|Measure the retriever before the answer]].

Return to the [[courses/retrieval-field-guide/index|course overview]] at any time.

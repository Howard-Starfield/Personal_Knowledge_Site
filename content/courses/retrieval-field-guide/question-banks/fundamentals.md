---
id: "3afae4fa-5974-407f-9ad4-90b15a696fd4"
title: "Retrieval Field Guide Question Bank"
description: "Canonical public questions and explanations for the Retrieval Field Guide course."
type: question-bank
publish: true
status: active
created: "2026-08-30"
tags:
  - retrieval
  - active-learning
courseId: "8938cffa-fe2c-4e16-9eb1-399a44c32e1d"
comments: false
---

This public bank owns the stable question definitions used by Retrieval Field
Guide quizzes. The answer key is intentionally visible because this is a
learning aid, not a secure exam.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "73273639-7382-456c-8319-c7e3a8c72dd1"
    revision: 1
    status: active
    type: single-choice
    prompt: "A response is fluent but cites evidence that never contained the required date constraint. Which boundary should be investigated first?"
    options:
      - id: retrieval
        text: "Evidence selection and retrieval"
      - id: prose
        text: "The final answer's writing style"
      - id: color
        text: "The interface color theme"
    correctOptionIds: [retrieval]
    explanation: "The required constraint is absent from the selected evidence, so the earliest demonstrated failure is retrieval. Rewriting cannot restore evidence that was never selected."
  - id: "cc6d315d-e746-43fa-9cf8-ecf89865f0e4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which actions preserve a diagnostic evidence loop? Select every correct answer."
    options:
      - id: record
        text: "Record the exact question and its important constraints"
      - id: separate
        text: "Evaluate evidence selection separately from answer use"
      - id: change-one
        text: "Change one decision before rerunning the same case"
      - id: change-all
        text: "Change segmentation, ranking, and answer instructions together"
    correctOptionIds: [record, separate, change-one]
    explanation: "A diagnostic loop preserves the case, separates the stages, and changes one decision at a time. Changing several boundaries together hides which change caused the result."
  - id: "617ee777-4f57-4517-b16f-a8ffe2db1715"
    revision: 1
    status: active
    type: true-false
    prompt: "One end-to-end score can always identify whether a failure began in retrieval or in answer generation."
    answer: false
    explanation: "The same low end-to-end score can result from weak evidence selection or poor use of strong evidence. Separate measures are needed to identify the earliest failing boundary."
  - id: "1c66665a-eaf0-4114-ac79-d9b9b0e98060"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why changing only one decision before rerunning the same retrieval case improves diagnosis."
    sampleAnswer: "Holding the case and other decisions constant makes the changed decision the clearest explanation for any observed difference. Changing several decisions at once may improve the result but conceals which intervention mattered."
    explanation: "The important idea is causal isolation: a repairable loop needs evidence about which boundary change produced the new result."
```

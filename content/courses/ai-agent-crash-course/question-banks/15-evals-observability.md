---
id: "eed63678-8bfa-4a5f-af9d-c125dff3940e"
title: "Evals, Observability, and Improvement Loops Question Bank"
description: "Practice questions for Evals, Observability, and Improvement Loops."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions practise golden sets, grader families, judge bias controls, trajectory checks, traces, and baseline gates.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "160075b4-4ac7-46b2-a1ea-c7cc4bceaa6a"
    revision: 1
    status: active
    type: single-choice
    prompt: "You write a golden-set row for a refund question. Which way of storing the expected answer survives later prompt rewording best?"
    options:
      - id: full-sentence
        text: "Store one full expected sentence and require an exact match"
      - id: substring-list
        text: "Store a list of key phrases that must all appear"
      - id: first-word
        text: "Store only the opening word and check how the reply begins"
    correctOptionIds: [substring-list]
    explanation: "A list of required key phrases checks the facts that matter while letting the wording change. Full-sentence matching is the tempting choice, but it fails every time the phrasing is tweaked even when the answer is still correct."
  - id: "7521b3db-94da-4de2-b0bb-359dac851439"
    revision: 1
    status: active
    type: single-choice
    prompt: "You need to check that every agent reply is valid JSON with a required field. Which grader family fits best?"
    options:
      - id: code-grader
        text: "A code grader that parses the reply and checks fields"
      - id: model-judge
        text: "A model grader that reads the reply and rates its quality"
      - id: human-review
        text: "A human reviewer who reads every reply on each run"
    correctOptionIds: [code-grader]
    explanation: "Parsing and field checks are deterministic, so a code grader is free, fast and repeatable. A model judge is tempting because it is flexible, but it adds cost and bias to a question a function can decide exactly."
  - id: "a6afac5c-d5f8-4427-a76f-36fc537a4cf4"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your safety suite has 30 injection prompts the bot must refuse, and it now scores 100 percent. A user complains the bot refuses a harmless translation request. What was missing?"
    options:
      - id: more-attacks
        text: "More injection prompts so refusal coverage keeps growing"
      - id: stricter-grader
        text: "A stricter refusal grader that checks the exact phrasing"
      - id: benign-controls
        text: "Benign control rows that measure over-refusal as well"
    correctOptionIds: [benign-controls]
    explanation: "A refusal-only suite can only catch missed refusals, so a bot that refuses everything would score perfectly. Benign control rows that should be answered expose over-refusal. Adding more attacks is tempting, but it measures the same side again."
  - id: "95d7826a-fffb-46e6-b4f4-9fff96e1c63f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your pairwise judge picks the first answer in most comparisons, whichever answer is shown first. What is the standard fix?"
    options:
      - id: longer-prompt
        text: "Write a longer judge prompt that explains the criteria"
      - id: swap-order
        text: "Run both orders and keep only the agreed verdicts"
      - id: lower-temp
        text: "Set the temperature to zero so the judge stays steady"
    correctOptionIds: [swap-order]
    explanation: "This is position bias. Running A then B and B then A, and counting a win only when both orders agree, cancels it, and disagreements are marked indeterminate. A lower temperature is tempting, but it makes the biased choice more consistent rather than removing it."
  - id: "de5efdea-8a17-465b-8a2c-cac1a64c6a6d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two agent versions give the same correct final reply to 'Email the customer that the refund was processed'. Version B sent the email directly and skipped the approval queue. How should the eval score them?"
    options:
      - id: both-pass
        text: "Both pass because the final reply is identical and correct"
      - id: user-asked
        text: "Both pass because sending was the user's explicit request"
      - id: trajectory-check
        text: "Only A passes because the tool sequence is also graded"
    correctOptionIds: [trajectory-check]
    explanation: "Agents are graded on the trajectory, meaning which tools ran and whether approval-required ones went through the queue. Judging only the last sentence would let B pass by luck. The user's request does not override a policy that requires approval."
  - id: "265d0a8c-5d11-42f5-a1c4-f0f5e3e2ec12"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your system runs on a GPT model and you also use a GPT model as the faithfulness judge. Which change reduces self-preference bias most directly?"
    options:
      - id: other-family
        text: "Use a judge from a different model family than the system"
      - id: bigger-judge
        text: "Use the largest model in the same family as the judge"
      - id: more-runs
        text: "Run the same judge several times and average the scores"
    correctOptionIds: [other-family]
    explanation: "A model tends to rate its own family's output higher, so the judge should come from a different family than the system under test. A bigger same-family judge is tempting, but it keeps the same preference, and averaging repeats only smooths noise."
  - id: "6d78eddb-e148-421f-bbfd-0b01a364c283"
    revision: 1
    status: active
    type: single-choice
    prompt: "A pull request drops the pass rate below the stored baseline, so CI fails. The author believes the new behavior is better. What is the intended way forward?"
    options:
      - id: skip-check
        text: "Skip the eval step for this pull request and merge it"
      - id: lower-quietly
        text: "Lower the threshold in the runner so the check passes"
      - id: update-baseline
        text: "Commit a new baseline in the same PR with a reason"
    correctOptionIds: [update-baseline]
    explanation: "The baseline changes only by an explicit human commit with a justification, so every accepted degradation is visible in review. Quietly editing the runner threshold is tempting, but it hides the regression from the reviewer."
  - id: "96238ab0-1fb4-4b92-9459-70b51b0964c8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which checks are good fits for deterministic code or exact-match graders? Select all that apply."
    options:
      - id: tone
        text: "Does the answer sound warm and professional?"
      - id: cites-file
        text: "Does the answer cite the expected policy chunk?"
      - id: valid-schema
        text: "Does the tool call use the required argument schema?"
      - id: refuse-token
        text: "Does an injection input produce the literal REFUSE string?"
    correctOptionIds: [cites-file, valid-schema, refuse-token]
    explanation: "Citation presence, schema validity and a literal output string can each be decided by a function, so they are cheap and repeatable. Tone is subjective, which makes it the tempting one to automate with code, but it needs a model judge or a human."
  - id: "9173a8b0-4120-48f3-bc54-bc430c00dea5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Your LLM judge gives nearly every answer a similar high score and favors long replies. Which actions help? Select all that apply."
    options:
      - id: bigger-answers
        text: "Ask the system to write longer answers to impress it"
      - id: length-note
        text: "Add 'Length is not quality' to the judge prompt"
      - id: quote-claim
        text: "Require a quoted unsupported claim for any score below 1"
      - id: human-sample
        text: "Have a human regrade a sample of judged cases each quarter"
    correctOptionIds: [length-note, quote-claim, human-sample]
    explanation: "A length reminder and a required quoted claim push the judge toward evidence rather than size, and a quarterly human regrade checks that the judge still agrees with people. Writing longer answers is tempting, but it feeds verbosity bias instead of removing it."
  - id: "4a27effe-e8f3-439d-89e1-8c1ca13d64ad"
    revision: 1
    status: active
    type: true-false
    prompt: "A golden set that passes at 100 percent proves the system is excellent and gives strong protection against future regressions."
    answer: false
    explanation: "A perfect pass rate more often means the dataset is too easy, so a future change has no room to show up as a signal. Adding the hardest recent user cases keeps the set informative."
  - id: "ec16734e-287c-4ced-ac56-c98d5d3366f7"
    revision: 1
    status: active
    type: free-recall
    prompt: "Compare an eval run and a trace. What question does each answer, and how do you use them together after a change?"
    sampleAnswer: "An eval run is the scoreboard: it tells you whether a change made things better or worse, using pass rate, citation hits, refusals, cost and latency across many cases. A trace is the replay footage for one request: it shows the retrieved chunks, model calls, tool calls and approvals. After a change you rerun the eval and compare it to the earlier run. For each regression you open that case's trace, joined by request ID, to find out why it failed."
    explanation: "A strong answer separates the two roles. The eval says whether and how much, while the trace says why. They are joined by the request ID, so a failed row leads straight to its spans."
  - id: "8aa8ac19-892f-4375-b545-c00d19106680"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: describe the improvement loop that lets you change a prompt or retrieval setting safely, from collecting failures to deciding to ship."
    sampleAnswer: "First collect traces and user-reported bad answers and group the failures. Turn each real failure into a new golden-set case with the correct expected output. Change one thing, such as one prompt edit, in its own pull request and its own config. Rerun the same dataset and compare the two runs for regressions and wins. Ship only if the pass rate and faithfulness are up and cost and latency stay inside the agreed limits. The CI baseline blocks the merge otherwise."
    explanation: "The loop is traces, then failure grouping, then new eval cases, then one change, then rerun and compare, then a gated ship decision. Changing one thing at a time is what makes a difference in scores attributable."
```

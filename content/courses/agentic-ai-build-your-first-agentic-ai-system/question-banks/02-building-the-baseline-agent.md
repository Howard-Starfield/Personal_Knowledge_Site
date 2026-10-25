---
id: "39b5fe19-a179-44c2-850c-c32dcb7d50a5"
title: "Architecting the Baseline Agent: ReAct Loops & Action Execution: Question Bank"
description: "Practice questions for the baseline agent lesson: the ReAct cycle, the governed state machine, loop guards, negative boundary constraints, and the statistical verification of the calibrated agent."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - agentic-ai
  - study-guide
  - assessment
  - active-recall
courseId: "7988d9f7-7121-4897-8ea1-d07d96146cfa"
comments: false
---

These questions practise [[courses/agentic-ai-build-your-first-agentic-ai-system/lessons/02-building-the-baseline-agent|Architecting the Baseline Agent: ReAct Loops & Action Execution]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "7f19b13d-5b27-448b-a2ef-a156dea26f95"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson defines an agentic system as a stateful dynamical system. Which three cycles does it say are interleaved?"
    options:
      - id: a
        text: "Prompting, sampling and post-processing, which together produce a single answer"
      - id: b
        text: "Verbal reasoning, tool dispatch and feedback assimilation, in that order"
      - id: c
        text: "Planning, approval and execution, which mirror a human approval workflow"
      - id: d
        text: "Observation, reflection and re-planning, which form the classic OODA loop"
    correctOptionIds: [b]
    explanation: "b is correct: the ReAct paradigm interleaves Thought, Action and Observation — verbal reasoning, discrete environmental tool dispatch, and empirical feedback assimilation. a describes a passive language model, which is the paradigm the lesson is moving away from. c is wrong because approval is a governance control the lesson adds later, not one of the three cognitive cycles. d is wrong because the lesson's ordering starts with reasoning and an action, not with an observation and a reflection. Lesson section: Deconstructing the ReAct Cognitive Loop."
  - id: "0f7dbcb8-49a9-4741-a2fc-85f5cdd3c601"
    revision: 1
    status: active
    type: single-choice
    prompt: "Every agent runtime in the lesson enforces four mandatory loop guards. What happens when the maximum iteration guard, the turn limit K_max, is breached?"
    options:
      - id: a
        text: "The agent pauses and asks the user for a longer budget before continuing"
      - id: b
        text: "The context window is truncated so that the oldest turns are dropped first"
      - id: c
        text: "The token budget guard takes over and charges the overrun to the next cycle"
      - id: d
        text: "The agent is forced straight to TERMINATED with an SLA_TIMEOUT status"
    correctOptionIds: [d]
    explanation: "d is correct: the constraint is t <= K_max, and the breach action is a force transition to TERMINATED with an SLA_TIMEOUT status, which is what stops runaway recursive work and thread deadlocks. a is wrong because the guard is deterministic and does not ask anybody. b is wrong because dropping old turns is not the lesson's answer; a flawed early trace is exactly what must not silently survive in the context. c is wrong because the token budget guard is a separate guard with its own action. Lesson section: Agent State Machine Formalism & JSON Schema Tool Calling."
  - id: "b8e9b52c-6127-4d41-a05b-b0e605ea95ae"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson warns that language models are natural keyword attractors. What does it say has to be injected into the system prompt to fix this?"
    options:
      - id: a
        text: "Explicit negative boundary constraints, saying what each department is not allowed to handle"
      - id: b
        text: "More few-shot examples of positive cases, so the model learns the right patterns"
      - id: c
        text: "A higher temperature, so the model explores options the scanner never would"
      - id: d
        text: "A longer chain of thought, so the model reasons its way past the surface words"
    correctOptionIds: [a]
    explanation: "a is correct: the lesson states that you cannot fix the surface-keyword trap by adding more few-shot examples of positive cases, and that you must explicitly define what each department is NOT allowed to handle. b is wrong because it is precisely the remedy the lesson rules out. c is wrong because the goal is calibrated routing, not more randomness. d is wrong because longer reasoning over the same prompt does not change what the model was asked to disallow. Lesson section: The Real-World Customer Support Triage Experiment."
  - id: "8e5551d8-3af3-4bbd-b26a-33b508174995"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson closes with five invariants of baseline agent engineering. Which of these are among them? Select every correct answer."
    options:
      - id: a
        text: "Reasoning Must Precede Action Execution — a verbal thought trace comes before the tool call"
      - id: b
        text: "Never Route on Positive Definitions Alone — each queue needs explicit exclusion rules"
      - id: c
        text: "Always convert every tool result into a longer chain of thought before continuing"
      - id: d
        text: "Raise the turn limit K_max each time the agent hits it, rather than terminating the run"
    correctOptionIds: [a, b]
    explanation: "a and b are two of the five invariants: reasoning must precede action execution, and a model must never be routed on positive definitions alone. c is wrong because the third invariant is to bound the execution loop deterministically, not to keep extending the reasoning. d is wrong for the same reason: the maximum iteration guard exists precisely to terminate the run, and raising K_max on each breach removes the bound. Lesson section: Architectural Summary: The 5 Invariants of Baseline Agent Engineering."
  - id: "73e9d9cf-9540-4ce2-950a-2e266cb49a27"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson says the ReAct loop grows the context window monotonically, because each thought, action and observation tuple is appended back into the prompt history. Which of these does it name as a consequence? Select every correct answer."
    options:
      - id: a
        text: "Attention dispersion, as self-attention over the system instructions dilutes"
      - id: b
        text: "Error cascade amplification, as a flawed early trace becomes immutable context"
      - id: c
        text: "Context blowout, as the prompt history grows with every appended tuple"
      - id: d
        text: "Tool schema erosion, because the JSON schema drifts as the context grows"
    correctOptionIds: [a, b, c]
    explanation: "a, b and c are the consequences the lesson names: attention dispersion as the history approaches thousands of tokens, error cascade amplification when a flawed trace at turn 2 becomes part of the immutable context for turns 3, 4 and 5, and the context blowout the invariants warn about. d is wrong because the tool schema is a deterministic contract that does not drift with the history; what drifts is the model's attention over it. Lesson section: Deconstructing the ReAct Cognitive Loop."
  - id: "bd1f21f6-a4a8-4f49-8408-e79505634846"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson's golden benchmark for the triage agent holds 30 cases, with 6 tickets for each of the 5 departments."
    answer: true
    explanation: "True. The lesson describes a 30-case balanced golden reference dataset, N = 30 with 6 tickets per department across Billing, Technical Support, Returns, Account Management and Product Inquiry, and every ticket is engineered with lexical collisions, multi-intent overlaps and surface-keyword traps so the boundary cases are the ones being tested."
  - id: "62a34a7e-fc17-4a23-937a-dc345fab76c7"
    revision: 1
    status: active
    type: single-choice
    prompt: "McNemar's paired test on the V1 and V2 runs returns a chi-squared statistic of 4.1667 against a critical value of 3.8415 at alpha = 0.05. What does the lesson conclude?"
    options:
      - id: a
        text: "The null hypothesis stands, because the statistic is above the critical value"
      - id: b
        text: "The result is inconclusive, because the contingency table has no discordant pairs"
      - id: c
        text: "The null hypothesis is rejected at 95% confidence, so the lift is statistically significant"
      - id: d
        text: "The lift is significant, but only for the departments that improved in both of the runs"
    correctOptionIds: [c]
    explanation: "c is correct: 4.1667 exceeds the critical value of 3.8415, so the lesson rejects the null hypothesis at 95% statistical confidence and calls the +20.0% lift a verified architectural improvement. a is wrong because a statistic above the critical value is what rejects the null, not what keeps it. b is wrong because the contingency table does contain discordant pairs: 6 cases went from V1 fail to V2 pass and 0 went the other way. d is wrong because the paired test is applied to the whole matched set, not department by department. Lesson section: Mathematical Rigor & Statistical Verification."
  - id: "dcde17f7-e6c0-4e98-8538-a2f90b843869"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, say what the Expected Calibration Error (ECE) measures, and what the lesson's numbers for V1 and V2 tell you."
    sampleAnswer: "ECE measures the gap between how confident the agent says it is and how often it is actually right, which is the lesson's way of asking whether the agent knows when it does not know. An agent that outputs a confidence of 0.95 on a ticket it then misroutes is dangerously overconfident. The V1 run reports an ECE of 0.1750 and the calibrated V2 run reports 0.0853, so the calibration work roughly halved that gap. The point of measuring it is that accuracy alone would not have revealed an agent that is confidently wrong."
    explanation: "A strong answer defines ECE as the gap between stated confidence and observed accuracy, gives both figures, and says what the halving of that gap tells you about the calibrated agent. An answer that defines ECE but leaves out the two numbers, or gives the numbers without saying what they mean, is only half there. Lesson section: Mathematical Rigor & Statistical Verification."
  - id: "7c8c5cc7-c8eb-42a1-9152-7c1336d7c5f0"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the rise in Macro-F1 from 0.7394 to 0.9331 tell the reader about the calibration work?"
    options:
      - id: a
        text: "It shows the agent got better on the two largest departments while the others held steady"
      - id: b
        text: "It shows the lift was spread across all five queues rather than won on one of them"
      - id: c
        text: "It shows the agent's decisions became faster, because Macro-F1 measures latency"
      - id: d
        text: "It shows the agent now handles every ticket correctly, because a score of one is close"
    correctOptionIds: [b]
    explanation: "b is correct: the lesson reads the rise as calibration lifting performance symmetrically across all five operational queues rather than inflating one at the expense of another, and Macro-F1 is the metric that makes that visible because it weights every class equally. a is wrong because it describes the opposite of what a Macro-F1 improvement over balanced classes means. c is wrong because Macro-F1 measures classification quality, not latency; latency is one of the four things the evaluation harness measures separately. d is wrong because 0.9331 is not 1.0 — the V2 run still got two of its thirty cases wrong. Lesson section: Mathematical Rigor & Statistical Verification."
  - id: "fc7a0fb1-3772-49e4-b4c2-f7f8361f6507"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the governed agent state machine, a tool call is validated before it runs. What happens when the schema or policy check fails?"
    options:
      - id: a
        text: "A synthetic error observation is injected and the agent returns to PERCEIVING"
      - id: b
        text: "The call is executed anyway, and the error is reported after the fact"
      - id: c
        text: "The agent halts immediately and the whole trajectory is marked as failed for review"
      - id: d
        text: "The failed call is retried with a looser schema until one of them validates"
    correctOptionIds: [a]
    explanation: "a is correct: the sandbox execution stage injects a synthetic error observation when the schema or policy check fails, and the loop returns to PERCEIVING so the agent can reason about the failure instead of crashing. b is wrong because the whole point of the ACTION_VALIDATION stage is to stop the call before it reaches production. c is wrong because a recoverable error is not a terminal state; only the guards terminate a run. d is wrong because relaxing the schema is exactly the kind of unbounded retry the state machine exists to prevent. Lesson section: Agent State Machine Formalism & JSON Schema Tool Calling."
  - id: "3bb27fa3-415c-4f11-b5d8-4c2b639eeef4"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson says the V2 agent was engineered without changing model weights. In your own words, say what was injected into the prompt to close the eight failure modes, and what that changed."
    sampleAnswer: "Three things were injected: formal departmental domain boundaries, explicit negative boundary constraints stating what each department is prohibited from handling, and the Boundary Disambiguation Matrix that settles the multi-intent cases the baseline mis-routed. Together they made the Calibrated V2 prompt, and they took the benchmark from 73.3% accuracy with a Macro-F1 of 0.7394 and an ECE of 0.1750 to 93.3% accuracy with a Macro-F1 of 0.9331 and an ECE of 0.0853. The point is that the gain came from the prompt and the routing rules, not from a bigger or better model."
    explanation: "A strong answer names the three injections, gives at least part of the measured lift, and says explicitly that the weights did not change. An answer that says only the agent improved, without the three injections, misses the engineering point the lesson is making about where the accuracy came from. Lesson section: Continuous Development (CD): Engineering the Calibrated V2 Agent."
  - id: "58fe226d-cfc0-4c71-b122-44390a392f4a"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did the lesson's benchmark report show for the baseline V1 agent and the calibrated V2 agent?"
    options:
      - id: a
        text: "V1 reached 93.3% accuracy and V2 reached 73.3%, so calibration cost accuracy"
      - id: b
        text: "Both reached 73.3% accuracy, and the difference was only in the latency"
      - id: c
        text: "V1 reached 80.0% accuracy and V2 reached 100.0%, so the V2 agent was perfect"
      - id: d
        text: "V1 reached 73.3% accuracy (22 of 30) and V2 reached 93.3% (28 of 30)"
    correctOptionIds: [d]
    explanation: "d is correct: the report gives the baseline V1 at 73.3% (22 of 30) and the calibrated V2 at 93.3% (28 of 30), a +20.0% absolute improvement. a is wrong because it reverses the two agents. b is wrong because the accuracy figures are not the same and the difference is not latency. c is wrong because neither figure is 100% and the V1 baseline was not 80.0%. Lesson section: Production-Grade Reference Implementation: Complete Python 3.11+ Harness."
```

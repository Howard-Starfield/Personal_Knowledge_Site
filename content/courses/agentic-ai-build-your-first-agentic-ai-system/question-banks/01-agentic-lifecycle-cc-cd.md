---
id: "337d98f4-d51e-4dba-972e-21819d88d843"
title: "The Agentic AI Lifecycle: Continuous Calibration & Development (CC/CD): Question Bank"
description: "Practice questions for the CC/CD lesson: golden reference traces, smart telemetry sampling, Jensen-Shannon drift thresholds, intervention metrics, and the closed-loop calibration directives."
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

These questions practise [[courses/agentic-ai-build-your-first-agentic-ai-system/lessons/01-agentic-lifecycle-cc-cd|The Agentic AI Lifecycle: Continuous Calibration & Development (CC/CD)]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "7bb3fb69-38ec-4297-97f4-6b63350c3932"
    revision: 1
    status: active
    type: single-choice
    prompt: "How large should the Golden Reference Dataset be, and what does the lesson contrast it with?"
    options:
      - id: a
        text: "At least 10,000 synthetic single-turn question-and-answer pairs, because breadth of cases beats depth"
      - id: b
        text: "Between 20 and 100 expert-validated golden traces, because depth beats breadth"
      - id: c
        text: "Exactly three golden traces, because a small suite is easier for an agent to pass"
      - id: d
        text: "One trace for every production incident, because incidents are the only real edge cases"
    correctOptionIds: [b]
    explanation: "b is correct: the lesson calls 20 to 100 high-fidelity, expert-validated golden traces vastly superior to a pile of synthetic pairs, because a trace is a multi-turn behavioural specification rather than a string in and a string out. a is the mistake the lesson warns against by name. c is wrong because three traces is far too few to catch a regression, which is what the dataset is for. d is wrong because incidents are not the only hard cases, and the lesson's own weekly cadence adds three to five curated traces every week rather than only chasing fires. Lesson section: Curating 20-100 Golden Reference Examples."
  - id: "08e99fa0-0dd9-4381-8e88-c8b9b9fe4f73"
    revision: 1
    status: active
    type: single-choice
    prompt: "A golden reference trace has four parts in the lesson's format. Which of these is NOT one of them?"
    options:
      - id: a
        text: "The user's intent and the initial state of the environment"
      - id: b
        text: "The target tool invocation trajectory the agent should follow"
      - id: c
        text: "A list of the raw model outputs the agent happened to produce on the day"
      - id: d
        text: "The environment invariant postconditions that must hold afterwards"
    correctOptionIds: [c]
    explanation: "c is correct: a golden trace is a specification of what should happen, not a recording of what did happen, so it holds the intent and initial state, the target tool invocation trajectory, the semantic argument assertions, and the environment invariant postconditions. a, b and d are three of those four parts. The missing fourth part is the semantic argument assertions, the exact schemas and allowable parameter bounds for each tool call. Lesson section: Curating 20-100 Golden Reference Examples."
  - id: "5ae7ad22-5f01-4d66-9311-41d7f249cc84"
    revision: 1
    status: active
    type: single-choice
    prompt: "The drift detector reports a Jensen-Shannon divergence of 0.3515 against the baseline distribution. Which response does the lesson's threshold matrix call for?"
    options:
      - id: a
        text: "Halt deployments and audit the prompts, because the score sits in the severe band"
      - id: b
        text: "Treat it as nominal stability, because anything under 0.40 sits inside tolerance"
      - id: c
        text: "Trigger a smart sampling review, because the score sits in the moderate band"
      - id: d
        text: "Trip the circuit breaker and revert the agent to Level 1 immediately"
    correctOptionIds: [a]
    explanation: "d is correct: the matrix places 0.25 up to 0.40 in the severe policy drift band, whose action is to halt deployments and audit the prompts. a is wrong because nominal stability runs only up to 0.10. b is wrong because the moderate band, which triggers a smart sampling review, runs from 0.10 up to 0.25. c is wrong because the circuit breaker and the revert to Level 1 belong to the critical anomaly band at 0.40 and above, and 0.3515 is below that. Lesson section: Mathematical Foundations of Agentic Calibration."
  - id: "15f906eb-b2a7-4376-a02a-4953ed1a3326"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson lists five invariants of the CC/CD lifecycle. Which of these are among them? Select every correct answer."
    options:
      - id: a
        text: "Closed-Loop or Die — every production decision has to come back as a feedback signal"
      - id: b
        text: "Smart Sampling Over Random Audits — review effort goes to the highest-entropy traces"
      - id: c
        text: "The Golden Reference Dataset has to hold at least 500 traces before deployment"
      - id: d
        text: "The base model has to be retrained every week to keep the drift in check"
    correctOptionIds: [a, b]
    explanation: "a and b are two of the lesson's five invariants: closed-loop or die, and smart sampling over random audits. c is wrong because the lesson puts the Golden Reference Dataset at 20 to 100 traces, not 500, and the point is depth rather than volume. d is wrong because the lesson's answer to drift is deterministic calibration — prompts, tool schemas and autonomy levels — not weekly model retraining; a retraining cadence is the MLOps pattern the lesson contrasts itself with. Lesson section: Architectural Summary: The 5 Invariants of CC/CD."
  - id: "a3a6da7b-9ab1-4d08-ac10-a75d6fefca6c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The deployment gate puts an agent through shadow execution before it takes real write traffic. Which of these describe that stage? Select every correct answer."
    options:
      - id: a
        text: "It grants the candidate agent 5% of live traffic before any comparison is made"
      - id: b
        text: "It replays 100% of live production prompts against the candidate agent"
      - id: c
        text: "Read-only queries are executed for real so their answers can be compared"
      - id: d
        text: "Proposed writes are logged to telemetry but not executed against production"
    correctOptionIds: [b, c, d]
    explanation: "b, c and d describe shadow execution, also called the dark launch: the agent sits alongside the existing human operators, receives all live production prompts, plans trajectories and runs read-only queries for real, while proposed write mutations are only logged. a is wrong because the 5% share belongs to the canary stage that comes after shadow execution, and the whole point of the dark launch is to compare before any write traffic moves. Lesson section: The Deployment Transition Gate."
  - id: "11faba9d-bbae-438e-9f3d-b81c97d07aed"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson's Premature Agency Trap says an agent may move beyond Level 1 or Level 2 only once telemetry shows a Jensen-Shannon divergence below 0.15, a golden benchmark pass rate above 95%, and no unhandled tool-call failures across a continuous 14-day production window."
    answer: true
    explanation: "True. Those three conditions are the lesson's gate for expanding tool permissions: below 0.15 divergence, above a 95% golden benchmark pass rate, and zero unhandled tool-call failures found by smart sampling over fourteen consecutive production days. The trap being named is granting high-autonomy mutation permissions before telemetry confirms bounded variance."
  - id: "07e33ea5-373f-4578-a90e-dc59a7fb25bc"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's Week 3 runbook wires circuit breakers into the canary rollout. Which pair of conditions trips them?"
    options:
      - id: a
        text: "HIR above 0.05, or a golden trace failure rate above 10%"
      - id: b
        text: "JSD above 0.40, or any single hard rejection by the guardrails"
      - id: c
        text: "A canary share above 25%, or more than three prompt revisions in one week"
      - id: d
        text: "HIR above 0.15, or JSD above 0.25, which triggers an automatic rollback"
    correctOptionIds: [d]
    explanation: "d is correct: the runbook sets an automatic rollback if HIR rises above 0.15 or JSD rises above 0.25, and the canary share then has to be walked back down the ladder. a is wrong because 0.05 is far below the 15% intervention threshold the lesson uses. b is wrong because 0.40 is the critical anomaly threshold, not the rollback trigger. c is wrong because traffic share and the number of prompt revisions are operational facts, not safety conditions. Lesson section: Engineering Runbook: Establishing Your First CC/CD Pipeline."
  - id: "2ceaeb91-8175-45e2-8b8f-13937a9431fb"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson gives the error dynamics equation E(t+1) = E(t)(1 - eta*kappa) + epsilon_drift. In your own words, say what each term means and what happens to the error rate as kappa falls towards zero."
    sampleAnswer: "E(t) is the error rate at cycle t, eta is the rate at which corrective feedback is applied, kappa is the quality of that corrective feedback, and epsilon_drift is the error the environment injects on its own every cycle. The error settles at a fixed point of E* = epsilon_drift divided by (eta*kappa), so the worse the corrective feedback, the higher that floor sits. As kappa falls towards zero the corrective term weakens, E* grows without bound and the error rate climbs towards 1.0, which is what the lesson's stability condition eta*kappa > epsilon_drift is there to prevent."
    explanation: "A strong answer names what each of the four symbols carries, gives the fixed point E* = epsilon_drift / (eta*kappa), and explains that kappa is the quality of the corrective feedback rather than its speed. An answer that only says the equation balances error against correction, without the kappa-to-zero consequence, misses the lesson's point about why feedback quality decides whether a self-correcting agent converges or decays. Lesson section: Mathematical Foundations of Agentic Calibration."
  - id: "3affa2d9-0cb0-4928-b2ec-b6ce0efcb762"
    revision: 1
    status: active
    type: single-choice
    prompt: "The calibration run reports a human intervention rate of 18.0% over 100 sessions. Which directive does the lesson's engine raise first, and what does it do?"
    options:
      - id: a
        text: "DIR-GDN-003, which expands the golden dataset with three to five new traces"
      - id: b
        text: "DIR-DFT-002, which revises the system prompt so the agent stops over-searching"
      - id: c
        text: "DIR-HIR-001, which downgrades the agent from Level 3 back to Level 2"
      - id: d
        text: "DIR-TLS-REST, which updates the tool schema so the drain timeout argument is accepted"
    correctOptionIds: [c]
    explanation: "d is correct: 18.0% breaches the 15.0% allowable threshold, so DIR-HIR-001 is raised with CRITICAL urgency and its action is to downgrade the autonomy level from L3 to L2 and require synchronous human confirmation for all non-idempotent tool calls. a and c are lower-urgency remediation actions the same run also produced, but they do not answer the intervention-rate breach. b is the prompt-revision directive, which in this run was driven by the detected tool-distribution drift rather than by the intervention rate. Lesson section: Production Implementation: The CC/CD Orchestrator in Python 3.11+."
  - id: "c6acf26e-7454-4ffd-8bd4-2cdbd8db8ea3"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which sequence of traffic shares does the lesson's canary rollout use after shadow execution?"
    options:
      - id: a
        text: "100% immediately, because shadow execution has already proved the agent is safe"
      - id: b
        text: "5%, then 25%, then 100% of production traffic"
      - id: c
        text: "50%, then 75%, then 100% of production traffic"
      - id: d
        text: "5% only, with no canary expansion until the following quarter"
    correctOptionIds: [b]
    explanation: "b is correct: the runbook expands canary traffic from 5% to 25% to 100% over seven operational days, and each step watches something different — error bursts, unhandled exceptions and latency spikes at 5%, then human intervention rates and tool-distribution shifts at 25%, then continuous telemetry into the calibration loop at 100%. a is wrong because shadow execution compares against human resolutions rather than proving the agent safe on its own. c and d are wrong because neither sequence is the one the lesson uses. Lesson section: The Deployment Transition Gate."
  - id: "69dd6830-40ab-472b-a74b-f69b11ddbb63"
    revision: 1
    status: active
    type: single-choice
    prompt: "Over 100 production sessions the agent needed a human to intervene 18 times. What do the lesson's two headline intervention metrics read as?"
    options:
      - id: a
        text: "HIR of 18.0% and an autonomy yield of 82.0%"
      - id: b
        text: "A human intervention rate of 82.0% and an autonomy yield of 18.0%"
      - id: c
        text: "A human intervention rate of 1.8% and an autonomy yield of 98.2%"
      - id: d
        text: "A human intervention rate of 8.0% and an autonomy yield of 92.0%"
    correctOptionIds: [a]
    explanation: "a is correct: HIR is the number of intervened sessions over the total, so 18 of 100 is 18.0%, and autonomy yield is its complement, so AY is 82.0%. b has the two swapped, which is the tempting mistake because yield and intervention rate look like opposites but not like percentages of the same thing in the wrong order. c is wrong because it divides by ten somewhere, and d is wrong because it misreads the count of 18 as 8. Lesson section: Mathematical Foundations of Agentic Calibration."
  - id: "4292460d-80fe-42d8-b75d-3398a760c9a4"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how the lesson's smart sampling differs from a random audit, and what it means to say that quality beats volume when curating the golden reference dataset."
    sampleAnswer: "A random audit takes a flat slice of sessions and hopes the interesting ones turn up, which the lesson calls fatally flawed because 95% of production traffic is trivial and repetitive. Smart sampling instead scores every session with a weighted signal — human intervention at +0.45, tool failures at +0.25, turn anomalies at +0.15, sentiment at +0.10 and low confidence at +0.05 — and reads only the top 5% to 10% highest-entropy failure traces, so the review effort lands where failures actually are. Quality beats volume is the companion rule for the dataset itself: 20 to 100 hand-validated multi-step traces, each carrying intent, tool trajectory, argument assertions and postconditions, are worth more than 10,000 synthetic single-turn pairs."
    explanation: "A strong answer covers both halves: the sampling strategy that spends review effort on the highest-entropy sessions, and the curation rule that prefers a small number of complete, multi-step golden traces over a large pile of synthetic pairs. An answer that explains the weights but not the dataset rule, or the reverse, is only half there. Lesson sections: Mathematical Foundations of Agentic Calibration and The CC/CD Infinity Loop Framework."
```

---
id: "f8690f3d-3afe-41ff-b0af-d8c20e263801"
title: "Chapter 9: Continuous Agent Evolution: Question Bank"
description: "Practice questions for the Continuous Agent Evolution chapter: learning signals from trajectories, the four update carriers, the dual-loop architecture, safety boundaries, and sleep learning."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
comments: false
---

These questions practise [[courses/ai-agents-in-depth/lessons/09-continuous-agent-evolution|Chapter 9: Continuous Agent Evolution]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "982d3030-928c-4f13-b7e0-3d6eb79c5731"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does storing raw operational trajectories in a vector database not amount to continual evolution?"
    options:
      - id: preservation-not-learning
        text: "Because preserving experience is not the same as learning from it; the run still has to be judged and validated"
      - id: token-limit
        text: "Because vector databases cannot hold conversation embeddings once those embeddings pass a certain token count of their own"
      - id: kv-leak
        text: "Because persisting raw transcripts leaves the model's KV cache populated across separate processes, which leaks memory over a long run"
      - id: automatic-finetune
        text: "Because saving conversations automatically triggers LoRA fine-tuning on unverified tokens and so erodes the base tool-calling ability it had"
    correctOptionIds: [preservation-not-learning]
    explanation: "preservation-not-learning is correct: a store of raw runs lets an Agent retrieve past text, but it does not say whether the run succeeded, whether a sound strategy or plain luck produced the outcome, or whether the interface has since changed. Continual evolution needs a verification and learning system built around the model — recording evidence, diagnosing outcomes across several trajectories, synthesising candidate updates, and validating them against regression suites before release. token-limit, kv-leak and automatic-finetune are not the chapter's account. Lesson section: continuous agent evolution."
  - id: "d53e4604-3ef6-4fc0-a194-68b464722ff4"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why must the outcome verifier and the process verifier be established programmatically before the quality verifier can be relied on?"
    options:
      - id: floating-point
        text: "Because the quality verifier needs floating-point emulation that cannot start until the lower layers have written to the database in the usual way"
      - id: no-tool-calls
        text: "Because the quality verifier cannot judge tone or grammar on a trajectory that contains any tool call at all, which is most of them"
      - id: anchor-in-state
        text: "Because outcome alone lets shortcuts pass and quality alone rewards false promises, so real-state checks must anchor it"
      - id: rl-policy
        text: "Because the process verifier is an offline reinforcement-learning policy that trains the outcome verifier's neural weights"
    correctOptionIds: [anchor-in-state]
    explanation: "anchor-in-state is correct: the bottom layer reads objective environment state such as database rows, unit-test exit codes and API returns, the middle layer checks that the work was done through compliant procedures, and the upper layer judges subjective quality. If only the outcome is checked, an Agent that deletes a test or bypasses a control looks successful; if only quality or satisfaction is checked, an Agent that promises unauthorised refunds scores highly. floating-point, no-tool-calls and rl-policy invent mechanisms the chapter does not describe. Lesson section: deriving learning signals from operational trajectories."
  - id: "bd057e30-e43f-4340-9f02-9a54a9b55a14"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the chapter, what must a usable learning signal contain?"
    options:
      - id: normalised-scalar
        text: "A scalar between minus one and plus one, a token count, the number of tool calls, and the model's confidence in its own answer"
      - id: four-components
        text: "Whether the task succeeded, a separate verdict per dimension, the exact evidence location, and a failure-type label"
      - id: score-and-meta
        text: "A single overall rating, a confidence interval, the timestamp of the run, and the identity of the user who triggered it"
      - id: diff-and-cost
        text: "A diff against the previous prompt, the list of tools used, the total token cost, and a hash of the trajectory for deduplication"
    correctOptionIds: [four-components]
    explanation: "four-components is correct: a single aggregate score says only how well one run went and cannot tell the next stage what to change, so an actionable signal needs the completion status, a separate verdict for each dimension such as outcome, rule compliance and promise-action consistency, the precise location of the evidence down to the turn and the tool call, and a label for the failure type — with the verifier declining to score when the evidence is ambiguous rather than injecting noise. normalised-scalar, score-and-meta and diff-and-cost each leave out the diagnostic content the chapter insists on. Lesson section: deriving learning signals from operational trajectories."
  - id: "5438ba41-66ff-4624-84cc-50be5f4031dc"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the chapter's primary criterion for choosing which update carrier a learned capability should be written into?"
    options:
      - id: recency
        text: "How recently the error happened, because a problem seen yesterday is always more worth fixing than one that was seen last month"
      - id: cost
        text: "How expensive the update would be, because the cheapest carrier that can hold the capability is always the right one to use in the end"
      - id: familiarity
        text: "Which carrier the team is most confident in maintaining, so that the same mechanism is used everywhere for the sake of consistency"
      - id: representational-medium
        text: "The natural representational medium of the capability, so facts go to knowledge and code, perception to parameters"
    correctOptionIds: [representational-medium]
    explanation: "representational-medium is correct: retrievable facts, exception records and API quirks belong in the experience knowledge base; operating principles that can be articulated belong in Prompts or Skills; deterministic constraints, verification gates and retry logic belong in programs and the Harness; high-dimensional perception, prosody and implicit long-horizon intuition belong in the model parameters. The chapter explicitly warns against putting hard business rules in parameters or deterministic constraints in prompts. recency, cost and familiarity are not the criterion it gives. Lesson section: four methods for continual agent evolution."
  - id: "096b8b1a-1b5e-4bbe-bde2-f3495ddfdbf0"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the escalation-rule experiment, the model inferred a rule that escalating to a human after three failed calls was the standard procedure. Why was that a failure?"
    options:
      - id: symptom-as-rule
        text: "Because the model read a symptom of failure as a rule, so the escalation the benchmark scores as failure was written into the spec"
      - id: too-short
        text: "Because the rule was too short to meet a minimum prompt length, so it never reached the model that was supposed to use it in the run"
      - id: banned-word
        text: "Because the benchmark forbids the word escalate in any prompt written for that domain, so the rule could not legally be expressed"
      - id: live-validation
        text: "Because a prompt change cannot be validated without a human telecom agent checking it live during the run itself"
    correctOptionIds: [symptom-as-rule]
    explanation: "symptom-as-rule is correct: in the baseline the Agent repeatedly failed tools and then escalated, and that escalation was recorded as the termination state of nineteen of twenty trajectories, so when asked to induce rules the model saw frequent escalations and concluded that escalating after repeated failures was the correct procedure — while the benchmark counts an escalation to a human as a task failure, so the failure mode was literally written into the specification. too-short, banned-word and live-validation are not what went wrong. Lesson section: encoding experience as instructions."
  - id: "e6c8aaf5-d5db-424e-ad89-ce99cfd5ec92"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the chapter call the separation of the online execution loop from the offline evolution loop an architectural non-negotiable?"
    options:
      - id: restart
        text: "Because an Agent that modifies itself while serving requests would have to restart the physical server for every single incoming query"
      - id: platform-blocks
        text: "Because browsers and serverless platforms block traffic from any Agent that holds self-modification permissions at all in their default configuration"
      - id: immediate-persistence
        text: "Because an injection in one request could persist into global behaviour at once, and unvalidated changes would reach every user untested"
      - id: cannot-express
        text: "Because the online loop may only append evidence, so it has no way of expressing a proposed change in the first place at all"
    correctOptionIds: [immediate-persistence]
    explanation: "immediate-persistence is correct: the online loop's only job is to serve requests reliably and append immutable evidence, and if the Agent could change its own production prompts, tools or weights inside the live request path then a single injection could corrupt global behaviour, an accidental success or a transient glitch could trigger an ill-conceived update, and no unvalidated change would ever reach another user without regression testing. restart, platform-blocks and cannot-express are not the chapter's reasons. Lesson section: building a continual-evolution closed loop for long-term operation."
  - id: "3364d452-81d2-4130-b9e4-fb13b8b31a44"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the evolved requirement-clarification Skill resolve the trade-off between asking too little and asking too much?"
    options:
      - id: fixed-questions
        text: "By asking a fixed number of questions before every action, so that the behaviour is the same in every situation it ever meets"
      - id: risk-graded
        text: "By doing low-risk reversible work directly with stated assumptions, and requiring a confirmed specification for high-risk changes"
      - id: never-ask
        text: "By never asking anything, because the intent can always be recovered from the state left by the previous conversation the user had"
      - id: delegate-questions
        text: "By delegating every clarification question to an unconstrained sub-agent that runs in its own separate thread of execution"
    correctOptionIds: [risk-graded]
    explanation: "risk-graded is correct: asking too little makes unverified architectural assumptions and leads to rework, while asking too much about a trivial change creates so much friction that the user gives up, so the evolved Skill proceeds directly with explicit assumptions on low-risk reversible changes and asks targeted questions, produces a concise specification and waits for confirmation on high-risk ones such as architecture, permissions, data schemas and public APIs — with the Harness able to veto an unconfirmed high-risk write. fixed-questions, never-ask and delegate-questions are the extremes the chapter rejects. Lesson section: encoding experience as instructions, the requirement clarification example."
  - id: "18cd5524-9c27-4340-b406-b9a0c716888e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list among the guardrail metrics that have to be enforced as hard thresholds? Select every correct answer."
    options:
      - id: rule-violations
        text: "Rule violations"
      - id: privacy-leakage
        text: "Privacy leakage"
      - id: unsupported-claims
        text: "Unsupported claims and promise-action inconsistency"
      - id: latency
        text: "Response latency in milliseconds"
    correctOptionIds: [rule-violations, privacy-leakage, unsupported-claims]
    explanation: "rule-violations, privacy-leakage and unsupported-claims are correct: the chapter says guardrails should cover at least rule violations, privacy leakage, unsupported claims, promise-action inconsistency and unauthorised operations, and that these must have hard thresholds which an average quality score cannot cancel out. latency is a cost and performance measure rather than a safety baseline. Lesson section: deriving learning signals, and the reflection question on satisfaction as a signal."
  - id: "d03db6d0-366b-428f-a5c0-60c7052b225d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are among the four update carriers the chapter gives for continual evolution? Select every correct answer."
    options:
      - id: knowledge-base
        text: "The experience knowledge base"
      - id: prompts-skills
        text: "Prompts and Skills"
      - id: programs-harness
        text: "Programs and the Harness"
      - id: retriever
        text: "The retrieval embedding model that decides which context is fetched"
    correctOptionIds: [knowledge-base, prompts-skills, programs-harness]
    explanation: "knowledge-base, prompts-skills and programs-harness are three of the four carriers, the fourth being the model parameters themselves. retriever is not one of the four in the chapter's taxonomy, even though retrieval is discussed elsewhere in the book. Lesson section: four methods for continual agent evolution."
  - id: "e4a89f9e-60c8-455c-88f6-398fac5a89c1"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says temporal composability means that everything a component introduces can be completely and reversibly undone when the component is removed, and that spatial composability means components declare their dependencies and react when those dependencies change. Is that what the chapter says?"
    answer: true
    explanation: "True — that is the chapter's account of the two orthogonal properties of dynamic composition, as used in the Cordis framework and the DeepSeek Harness. Temporal composability, what changed, requires every resource allocation, event hook and state transformation to have an explicit reversible inverse, so removing a plugin restores the environment cleanly without a process restart. Spatial composability, what is depended on, requires components to declare their dependencies and coordinate activation and deactivation when those dependencies change. Lesson section: encoding experience as programs, dynamic composition."
  - id: "ddf70ab6-9c02-4046-a25b-3dd638b6ef95"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the closed loop the chapter builds for continual evolution, and say what each side of it is responsible for."
    sampleAnswer: "The loop is split in two so that learning never happens inside the request path. The online side has one job: serve the request reliably and append immutable execution evidence — the trajectory, the tool calls, the environment state. The offline side turns those trajectories into structured learning signals with verdicts and evidence locations, induces candidate updates in whichever carrier the capability belongs in, validates them against a regression suite and the safety gates, and only then releases, consolidates or rolls them back gradually through a canary. The point of the split is that a candidate can be rejected without ever having touched production."
    explanation: "A strong answer names the two sides and the responsibilities of each, gives the order of the offline steps from signal to candidate to validation to gradual release, and says why the separation matters. An answer that only describes the steps of the offline loop has missed the architectural point of the split. Lesson section: building a continual-evolution closed loop for long-term operation."
  - id: "30096326-3263-478f-b598-71e048bcac10"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the chapter means by the root of trust in a self-evolving system, and describe the boundary it draws around it."
    sampleAnswer: "The root of trust is the part of the system that decides whether the system's own changes are allowed to happen — the permission system, the release controller and its configuration, the validation suites, the release-gate thresholds, the audit log and the deployment credentials. The boundary is that all of it sits outside anything the evolvable Agent can reach. The Agent runs in a low-privilege sandbox whose only power is to generate candidate patches and tests; it has no access to the permission system, the API keys or the update validators, and it cannot approve its own changes. Candidates are reproduced and regression-tested by those trusted mechanisms before anything is released."
    explanation: "A strong answer says what the root of trust is in terms of the concrete components, says that the Agent has no access to them, and explains what the boundary buys — that the Agent cannot approve its own changes and that candidates are re-tested by trusted machinery before release. An answer that only says the Agent should be sandboxed has given half the boundary. Lesson section: safety boundaries for continual evolution."
```

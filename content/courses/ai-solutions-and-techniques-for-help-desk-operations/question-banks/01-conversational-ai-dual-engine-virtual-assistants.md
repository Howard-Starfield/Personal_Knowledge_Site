---
id: "ae82b37f-a2ab-4369-a14d-15d6c1a5077d"
title: "Conversational Support Architecture: Dual-Engine Rule Systems & Generative Virtual Assistants: Question Bank"
description: "Practice questions for the dual-engine conversational support lesson, covering the three topologies, the routing thresholds, the frustration trap and the blended cost model."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - help-desk
  - study-guide
  - assessment
  - active-recall
courseId: "9f06e4da-f651-4857-95d5-df8a6fde9aa5"
comments: false
---

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/01-conversational-ai-dual-engine-virtual-assistants|Conversational Support Architecture: Dual-Engine Rule Systems & Generative Virtual Assistants]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "457f5d0b-d05d-4979-8404-0b9833d59726"
    revision: 1
    status: active
    type: single-choice
    prompt: "A dual-engine desk handles 100,000 tickets a month, with 45% resolved by deterministic rules at $0.05, 35% resolved by the generative engine at $0.25, and 20% escalated to a human at $18.50. What is the blended cost per ticket?"
    options:
      - id: blend-381
        text: "$3.81, from 0.0225 plus 0.0875 plus 3.7000"
      - id: blend-934
        text: "$9.34, from a blended mix that escalates half of all tickets to a human"
      - id: blend-566
        text: "$5.66, from a blended mix that escalates 30% of all tickets to a human"
      - id: blend-197
        text: "$1.97, from a blended mix that escalates only 10% of all tickets to a human"
    correctOptionIds: [blend-381]
    explanation: "The lesson multiplies each share by its unit cost and adds the results: 0.45 x 0.05 is 0.0225, 0.35 x 0.25 is 0.0875, and 0.20 x 18.50 is 3.7000, for a blended cost of $3.81 a ticket. The other three figures are the lesson's sensitivity table rows, where a 50%, 30% and 10% human escalation share give $9.34, $5.66 and $1.97 respectively. They change the routing mix, not the cost model."
  - id: "8c709692-97bc-42f5-b973-a868dbcca868"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the lesson's three topologies does it call the most robust enterprise automation pattern, and why?"
    options:
      - id: topo-1
        text: "Topology 1, Tiered Support Architecture, where a rule engine answers first"
      - id: topo-3
        text: "Topology 3, Dynamic Learning Pathways, where the model replies to the user directly"
      - id: topo-2
        text: "Topology 2, AI-Augmented Rule-Based Systems, with semantic slot filling"
      - id: topo-none
        text: "The lesson does not rank the three topologies; all three are presented as equally robust"
    correctOptionIds: [topo-2]
    explanation: "Topology 2, AI-Augmented Rule-Based Systems with semantic slot filling, is the most robust pattern because the generative model is never permitted to execute actions or speak directly to corporate backend APIs; it works only as a semantic translation compiler that emits a validated schema for a deterministic executor to run. Topology 1 still lets the generative agent attempt a resolution, and Topology 3 moves the assistant into the Tier-1 technician's console rather than removing the model from the action path."
  - id: "5b0e06fc-3732-4bc1-b8fe-c32dea6a2a78"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which set of routing thresholds does the lesson benchmark for the dual-engine router?"
    options:
      - id: thr-loose
        text: "τ_rule = 0.80, θ_risk = 0.50 and τ_llm = 0.95, which is far more permissive"
      - id: thr-95
        text: "τ_rule = 0.95, θ_risk at or below 0.15 and τ_llm around 0.80"
      - id: thr-risk
        text: "τ_rule = 0.95, θ_risk at or below 0.50 and τ_llm around 0.20, which loosens the gate"
      - id: thr-strict
        text: "τ_rule = 0.60, θ_risk at or below 0.05 and τ_llm around 0.99, which is stricter still"
    correctOptionIds: [thr-95]
    explanation: "The lesson sets the deterministic gate at τ_rule = 0.95 so the rule engine produces no false positives, the hallucination risk ceiling at θ_risk at or below 0.15 in compliance-sensitive environments, and the minimum generative threshold at τ_llm of about 0.80. If neither engine can clear those thresholds the router defaults closed to human escalation, so loosening any of them weakens the safety property the architecture exists to provide."
  - id: "0bef81c9-9f73-4d03-baae-4fa68bc1a236"
    revision: 1
    status: active
    type: single-choice
    prompt: "How many consecutive failed turns should the assistant tolerate before it stops and hands the conversation to a human?"
    options:
      - id: turns-1
        text: "One, because a single failure means the intent was misclassified by the router"
      - id: turns-3
        text: "Three, because the third turn is the one that triggers the sentiment collapse"
      - id: turns-10
        text: "Ten, because most intents resolve within a handful of clarifying exchanges"
      - id: turns-2
        text: "Two, because sentiment drops by over 65% on the third consecutive failure turn"
    correctOptionIds: [turns-2]
    explanation: "The lesson's frustration trap says that if the agent fails to resolve an intent or extract the required entities after two consecutive turns, continuing the automated dialogue produces exponential dissatisfaction, and customer sentiment drops by over 65% on the third consecutive bot failure turn, triggering channel switching and inflated escalation severity. Tolerating a third turn is exactly the failure mode the lesson warns about, and the model it gives, S(t) = S0 times e raised to minus lambda t times one minus the loop indicator times delta rage, shows a single repeated state at turn two already dropping sentiment below the acceptable threshold."
  - id: "1e23563e-56ea-4e4c-9e51-8bf87dd383cd"
    revision: 1
    status: active
    type: single-choice
    prompt: "What annual saving does the lesson claim for a mature dual-engine desk running the 45% rule, 35% generative and 20% human split on 100,000 tickets a month?"
    options:
      - id: save-4572
        text: "$4,572,000 a year, which is what the dual-engine desk costs to run"
      - id: save-1469
        text: "$1,469,000 a year, which is the monthly saving multiplied by twelve"
      - id: save-22200
        text: "$22,200,000 a year, which is the total annual cost of the legacy manual desk"
      - id: save-17628
        text: "$17,628,000 a year, a 79.4% reduction against the legacy manual desk"
    correctOptionIds: [save-17628]
    explanation: "The legacy manual desk costs $1,850,000 a month and $22,200,000 a year, while the dual-engine desk costs $381,000 a month and $4,572,000 a year. The difference is $17,628,000 a year, a 79.4% reduction. $4,572,000 is the new run rate rather than the saving, and $1,469,000 is the monthly saving, which is not the annual figure the lesson reports."
  - id: "49ddf688-01ba-47ec-8ff5-2868e743c3aa"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did the British Columbia Civil Resolution Tribunal rule in Moffatt v. Air Canada (2024 CRT 149) in February 2024?"
    options:
      - id: ac-liable
        text: "The airline was held liable for what its chatbot told the passenger, because the chatbot is the corporation's agent"
      - id: ac-cleared
        text: "The airline was cleared, because a passenger is expected to read the published fare rules before relying on a chatbot"
      - id: ac-settled
        text: "The ruling was an outright settlement, because the tribunal had no power to decide the case"
      - id: ac-warning
        text: "The airline was fined for a policy breach, but the passenger's refund claim was dismissed"
    correctOptionIds: [ac-liable]
    explanation: "Air Canada argued that the chatbot was a separate legal entity responsible for its own actions, and the tribunal rejected that defence outright, ruling that a corporation is fully liable for all representations, promises and misstatements made by its autonomous chatbots, and awarded damages for negligent misrepresentation. The lesson draws the general lesson from it: courts treat an enterprise conversational assistant as an authorized agent of the corporation, so any statement the model makes binds the organization legally."
  - id: "4c9c16f6-adaf-4aad-9c96-34b2a6abb761"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson formally define the deterministic engine's state machine?"
    options:
      - id: fsm-markov
        text: "As a Markov chain with a transition matrix over intent probabilities"
      - id: fsm-tuple
        text: "As M = (Q, Sigma, delta, q0, F): states, alphabet, transitions, start state, final states"
      - id: fsm-grammar
        text: "As a regular expression grammar compiled into a finite automaton"
      - id: fsm-lookup
        text: "As a lookup table from hashed message embeddings to canned response templates that can be reused"
    correctOptionIds: [fsm-tuple]
    explanation: "The lesson formalises the deterministic engine as the finite state machine M = (Q, Sigma, delta, q0, F), which is what gives it its auditability: explicit state variables, rigid transitions and a strict answer for the current state. It is not probabilistic, so a Markov chain is the wrong model, and the lesson's own comparison table stresses that the state machine's semantic flexibility is zero while the generative model's is near infinite, so it fails the moment a user's phrasing does not match an exact intent pattern."
  - id: "511d4501-834c-4ed6-811c-1df2b14f2079"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these belong to the lesson's four-layer defensive guardrail stack? Select every correct answer."
    options:
      - id: guard-1
        text: "Layer 1, Pre-Execution Prompt Fencing and Input Hygiene"
      - id: guard-2
        text: "Layer 2, Deterministic PII and Secret Scrubbing"
      - id: guard-3
        text: "Layer 3, NeMo Guardrails and Flow Boundaries"
      - id: guard-4
        text: "A layer that lets the model call the enterprise reset API directly when the user sounds certain"
    correctOptionIds: [guard-1, guard-2, guard-3]
    explanation: "The stack runs from pre-execution prompt fencing and input hygiene, through deterministic PII and secret scrubbing before anything reaches an external API or vector store, into NeMo Guardrails and Colang flow boundaries with fact-checking rails, and finally to output contract and liability validation before the response reaches the client. The fourth option inverts the design: the stack exists precisely to stop the model reaching the backend on its own, which is why Topology 2 forbids it outright."
  - id: "25d46151-2102-4ef5-a09a-6242fe1d3869"
    revision: 1
    status: active
    type: multiple-select
    prompt: "In the semantic slot filling topology, which of these does the lesson say the generative model is forbidden from doing? Select every correct answer."
    options:
      - id: forbid-exec
        text: "Executing actions on the enterprise backend"
      - id: forbid-api
        text: "Speaking directly to corporate backend APIs"
      - id: forbid-schema
        text: "Translating free-text user input into a validated slot schema"
      - id: forbid-reset
        text: "Executing a password reset once the extracted slots validate cleanly"
    correctOptionIds: [forbid-exec, forbid-api]
    explanation: "Topology 2 is built on a single prohibition: the generative model is never permitted to execute actions or speak directly to corporate backend APIs. Its only job is to act as a semantic translation compiler, turning messy free text into a validated schema that a deterministic executor then runs, so the third option is the model's actual purpose rather than a prohibition, and the fourth option describes exactly the action the architecture removes from the model."
  - id: "55abb0d3-b091-43d8-bfce-492a480ae85e"
    revision: 1
    status: active
    type: true-false
    prompt: "In the semantic slot filling topology, the generative model may execute the enterprise action itself once the extracted slots have validated."
    answer: false
    explanation: "The claim is false, and it is the reason the topology exists. In Topology 2 the generative model is never permitted to execute actions or speak directly to corporate backend APIs; it compiles free text into a validated slot schema, and a deterministic executor performs the action on the strength of that schema. Validating the slots is what makes the hand-off safe, not a licence for the model to act, and the lesson treats a model that can call the backend as the central hallucination risk it is designed to remove."
  - id: "c8a890b0-c1e9-44f4-9577-18ea747ac9b4"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the infinite loop frustration trap as the lesson describes it: the two numbers attached to it, and what the assistant should do when it appears."
    sampleAnswer: "The lesson says that if a conversational agent fails to resolve an intent or extract the required entities after two consecutive turns, continuing the automated dialogue produces exponential user dissatisfaction, and telemetry shows customer sentiment dropping by over 65% on the third consecutive bot failure turn, which triggers channel switching to the emergency hotline and inflated escalation severity. It models sentiment as S(t) = S0 times e raised to minus lambda t times one minus the loop indicator times delta rage, with lambda around 0.25 and delta rage around 0.40. The right response is to stop the automated dialogue and escalate to a human technician after the second consecutive failure, because a single repeated state at turn two already drops sentiment below the acceptable threshold."
    explanation: "A strong answer names the two-turn limit and the 65% third-turn collapse, and explains that the loop indicator and the rage penalty in the sentiment model are what make repetition so expensive. It should also state the operational consequence, which is escalation rather than another retry, and why that matters for a service desk that has to keep the channel open for the next customer."
  - id: "0fa84925-94f2-4772-96d8-8f10be0ebc05"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the lesson's cost model, work out the blended cost per ticket for the dual-engine desk and the annual saving it produces, and say which lever dominates the result."
    sampleAnswer: "A fully burdened human costs $18.50 a ticket, which is $17.05 base plus $1.45 tooling, a deterministic rule costs $0.05, and a generative query costs $0.25. At a 45% rule share, 35% generative share and 20% human share, the blended cost is 0.45 x 0.05 plus 0.35 x 0.25 plus 0.20 x 18.50, which is 0.0225 plus 0.0875 plus 3.7000, so $3.81 a ticket and $381,000 a month against a legacy baseline of $1,850,000 a month. The dual-engine desk therefore runs at $4,572,000 a year against $22,200,000, an annual saving of $17,628,000 or 79.4%. The dominant lever is human escalation: at $18.50 a ticket, the 20% of tickets that still reach a human account for $3.70 of the $3.81, which is why the lesson's sensitivity table shows that moving escalation from 50% to 20% more than doubles the total saving."
    explanation: "A strong answer shows the arithmetic on all three unit costs, arrives at $3.81, and connects that to the $381,000 monthly and $4,572,000 annual figures. The key judgement is that the human escalation rate dominates everything else, so the deflection rate and the self-service quality matter far more than the token price, which is what makes the escalation sensitivity table the decisive exhibit."
```

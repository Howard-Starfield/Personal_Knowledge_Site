---
id: "fc16ac92-5922-4b09-9dbf-1688fd2cb8ca"
title: "Production Considerations: The Cost-Complexity-Reliability Trilemma & Guardrails: Question Bank"
description: "Practice questions for the production lesson: the cost, complexity and reliability trilemma, reliability decay, the three guardrail tiers, velocity governors and idempotency keys, and the production roadmap."
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

These questions practise [[courses/agentic-ai-build-your-first-agentic-ai-system/lessons/04-production-governance-and-economics|Production Considerations: The Cost-Complexity-Reliability Trilemma & Guardrails]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "b84f5622-e1d3-4d5e-94ee-646dfdb0b862"
    revision: 1
    status: active
    type: single-choice
    prompt: "An engineer measures 95% accuracy on single-hop tool selection and calls the agent production-ready. The lesson calls this the 95% Fallacy. Why?"
    options:
      - id: a
        text: "Because the accuracy was measured on single-hop cases rather than on the full workflow"
      - id: b
        text: "Because 95% accuracy is too low a bar for a customer-facing agent in any setting"
      - id: c
        text: "Because the test set was too small to give a trustworthy estimate of the accuracy"
      - id: d
        text: "Because over 10 sequential turns a 95% step rate leaves only a 59.9% mission rate"
    correctOptionIds: [d]
    explanation: "d is correct: mission success is the product of the per-step probabilities, so a 0.95 step rate over ten turns leaves 59.9%, and four customer sessions in every ten end in catastrophic failure or incomplete execution. a is wrong because the point is not that the test cases were the wrong ones, but that a single-hop score says nothing about a ten-turn mission. b is wrong because 95% on a single step is a fine number; it is the extrapolation that fails. c is wrong because the sample size was never the issue. Lesson section: The Mathematics of Exponential Reliability Decay."
  - id: "5bb3577f-1d32-4107-8ae3-5b47e92085f1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson maps the Airbus flight control laws onto the agent architecture. What does each side correspond to?"
    options:
      - id: a
        text: "The LLM is the flight computer and the guardrails are the pilot's side-stick"
      - id: b
        text: "The LLM is the pilot expressing intent and the guardrails are the flight computer"
      - id: c
        text: "The LLM is the hydraulic actuator and the guardrails are the airframe envelope"
      - id: d
        text: "The LLM is the autopilot and the guardrails are the air traffic controller"
    correctOptionIds: [b]
    explanation: "b is correct: the model is the pilot, with high-level strategic reasoning and intent generation, while the guardrail architecture is the flight control computer, which clamps parameters to verified operational limits before any API call is dispatched, exactly as a flight law clamps pitch to +30 degrees and commands Alpha-Floor protection. a and c are wrong because they reverse the direction of control, and d is wrong because the autopilot is a separate system from the pilot in the analogy. Lesson section: The Physical Feynman Analogy: Commercial Aviation Fly-by-Wire & Nuclear SCRAM Safety Systems."
  - id: "902f555f-17c0-4181-b05c-0999ddf57b92"
    revision: 1
    status: active
    type: single-choice
    prompt: "What monetary ceilings does the lesson's financial velocity governor enforce on an autonomous agent?"
    options:
      - id: a
        text: "No monetary caps at all, because the model is trusted to judge the amount for itself"
      - id: b
        text: "A single transaction cap of $500 and a cumulative session cap of $200 over 24 hours"
      - id: c
        text: "A single transaction cap of $200 and a cumulative session cap of $500 over 24 hours"
      - id: d
        text: "A single transaction cap of $200 and a cumulative session cap of $500 over 30 days"
    correctOptionIds: [c]
    explanation: "c is correct: the single-transaction cap is $200.00, above which a refund is escalated to a human supervisor, and the cumulative session spend cap is $500.00 across a rolling 24-hour window, which stops an attacker draining an account through repeated micro-refunds. a is wrong because relying on the model's judgement is the fallacy the whole lesson is written against. b is wrong because it swaps the two figures. d is wrong because the window is a rolling 24 hours, not 30 days. Lesson section: Financial Velocity Governors & Rate Limiters."
  - id: "eaf72677-92e9-4761-aacb-29ddc920f482"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson segregates tools by access tier under the principle of least privilege. Which of these tiers does it name? Select every correct answer."
    options:
      - id: a
        text: "Tier-R read-only tools, such as fetch_order_status, that produce no side effects"
      - id: b
        text: "Tier-M state-mutating tools, such as update_shipping_address, that modify records"
      - id: c
        text: "Tier-F financial and irreversible tools, such as issue_refund, that need velocity governance"
      - id: d
        text: "Tier-X experimental tools, which run outside the guardrail envelope during the pilot"
    correctOptionIds: [a, b, c]
    explanation: "a, b and c are the three access tiers the lesson defines: read-only tools that produce zero side effects and can run autonomously, state-mutating tools that modify records and require an authenticated session plus schema validation, and financial or irreversible tools that need strict velocity governance, cryptographic idempotency and human approval above a pre-authorised threshold. d is wrong because the lesson has no tier that runs outside the guardrail envelope; that is exactly the exposure the tiers exist to remove. Lesson section: The Principle of Least Privilege."
  - id: "0ade29c0-3cfd-4c06-a2df-5c4b22f912bc"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson works through a runaway ReAct session of 8 turns on a frontier model priced at $3.00 per million input tokens and $15.00 per million output tokens. Which of these figures does that worked example give? Select every correct answer."
    options:
      - id: a
        text: "63,600 input tokens consumed by the single 8-turn ticket"
      - id: b
        text: "$0.23 spent on that one ticket"
      - id: c
        text: "$11,340 a day at 50,000 customer inquiries"
      - id: d
        text: "512,000 input tokens consumed by the single 8-turn ticket"
    correctOptionIds: [a, b, c]
    explanation: "a, b and c are the worked example's figures: the turn-by-turn input tokens of 2,700 up to 13,200 sum to 63,600, the cumulative cost reaches $0.2268, which the lesson rounds to $0.23, and at 50,000 inquiries a day that is $11,340 a day and $340,200 a month. d is wrong because it inflates the token count roughly eightfold; the quadratic growth is real but it is cumulative across turns, not a multiple of the total per turn. Lesson section: Concrete Economic Example: The Runaway ReAct Session."
  - id: "2a3885b7-d4fd-4ad7-8441-c2259ed46b04"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson's nuclear SCRAM analogy says that when a velocity governor or financial quota is breached, an out-of-band circuit trips, revokes the agent's credentials and escalates to a human operator, so the agent cannot reason its way out of it."
    answer: true
    explanation: "True. The SCRAM system is hardwired and out of band: reactor safety does not depend on the operator diagnosing the gauges, and in the agent architecture the governor trips the circuit breaker, revokes the credentials and escalates to a human operator. That is the lesson's answer to the fallacy of relying on the intelligence of the model to constrain the actions of the model."
  - id: "0f8e520b-25c8-4500-b303-e87735178a49"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of these belongs to Phase 2 of the lesson's 4-Phase Production Roadmap?"
    options:
      - id: a
        text: "Shadow mode, where the agent drafts plans and every mutating action needs human sign-off"
      - id: b
        text: "Model routing, sending 80% of routine traffic to compact 8B models"
      - id: c
        text: "Earned agency, granting autonomous status once an intent class holds 99%+ accuracy"
      - id: d
        text: "The golden benchmark dataset of 50 to 100 historical customer scenarios with expert truth"
    correctOptionIds: [a]
    explanation: "a is correct: Phase 2 is the high-control, low-agency foundation phase, where the agent runs in shadow mode behind human agents, reading tickets and drafting plans that a human can approve, edit or reject with a single click, and every mutating action requires 100% human sign-off. b and c belong to Phase 4, which is where model routing and earned agency live, and d belongs to Phase 1, which is where the golden benchmark dataset is assembled. Lesson section: The 4-Phase Production Roadmap."
  - id: "b27e1a22-d58a-4828-8811-205865cbb1a5"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson calls the Tool Idempotency Blindspot one of the two recurring blindspots behind most production outages. In your own words, say what the myth is, what really happens, and what the lesson says to do about it."
    sampleAnswer: "The myth is that the reasoning loop handles errors intelligently, so a failed API call will be analysed and retried only if it is genuinely necessary. The reality is that on an HTTP 504 Gateway Timeout the downstream service often did process the transaction while the acknowledgement was lost in transit, and the agent's default behaviour on seeing the timeout is to retry with identical arguments, which produces duplicate charges, duplicate orders and corrupted state. The fix is that the agent never calls a state-mutating tool directly: the dispatcher computes a deterministic SHA-256 hash of the payload, transmits it as an Idempotency-Key header, and the backend enforces atomic check-and-set semantics on that key."
    explanation: "A strong answer states all three parts: the belief that the loop will retry intelligently, the lost-acknowledgement mechanism that makes a retry duplicate, and the hash-and-check-and-set fix. An answer that explains only the duplicate-charge risk without the timeout mechanism, or only the fix, is missing a third of the story. Lesson section: The Tool Idempotency Blindspot."
  - id: "b052c775-0e57-4016-b983-3ee11c4024fb"
    revision: 1
    status: active
    type: single-choice
    prompt: "An attacker hides a refund instruction in a shipping manifest attached to a $15 order, and the agent retrieves that manifest as context. What does the lesson say stops the attack?"
    options:
      - id: a
        text: "Tier 1 input guardrails detect the payload before the ticket ever enters the agent's context"
      - id: b
        text: "The vector store is internal, so the retrieved chunk is treated as trusted enterprise content"
      - id: c
        text: "The LLM's own reasoning rejects the instruction because it is embedded in a document"
      - id: d
        text: "Tier 3 action guardrails block it: the $850 exceeds the $200 cap and the order was $15"
    correctOptionIds: [d]
    explanation: "d is correct: the velocity governor flags that $850.00 exceeds the $200.00 single-transaction threshold, the grounding verifier discovers the original purchase price was only $15.00, and the action is blocked while the session is frozen and an alert goes to the fraud operations centre. a is wrong because the payload arrives through retrieval rather than through the user's own message, so it never passes the Tier 1 ingress scan. b is wrong because retrieved content is untrusted input no matter where it was stored. c is wrong because the whole point is that the model reads the payload and treats it as an authoritative-sounding instruction. Lesson section: The Indirect Prompt Injection Infiltration Vector."
  - id: "723a02d7-bccd-442b-9931-7b879624dbc8"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's test suite includes a scenario where the agent's draft response cites order ORD-505 but no such order appears in the retrieved context. How is it handled?"
    options:
      - id: a
        text: "It is passed on to the user with a short warning appended at the end of the message"
      - id: b
        text: "It is blocked at Tier 2, because the justification does not cite the required order"
      - id: c
        text: "It is allowed through, because only the tool call is checked and not the response"
      - id: d
        text: "It is blocked at Tier 3, because the velocity governor rejects an unpriced action"
    correctOptionIds: [b]
    explanation: "b is correct: the run reports BLOCKED_OUTPUT at TIER_2_OUTPUT_GUARDRAIL, with the reason that the payload justification does not cite required order ORD-505, which is the semantic factuality and grounding verifier doing its job. a is wrong because an ungrounded commitment is blocked, not softened with a warning. c is wrong because Tier 2 exists precisely to check the response as well as the tool call. d is wrong because the velocity governor governs money, and there was no tool call in this scenario. Lesson section: Execution Output & Telemetry."
  - id: "3a3dffcf-4d16-4c24-93e8-cf1b970caf86"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's Cost-Complexity-Reliability Trilemma says you can optimise any two dimensions and must sacrifice the third. Which system does it name for low cost and latency with high reliability?"
    options:
      - id: a
        text: "The Enterprise Heavyweight, which buys reliability with frontier models, deep search and judges"
      - id: b
        text: "The Toy Prototype, which buys speed with compact models and no validation checks"
      - id: c
        text: "The Guarded State Machine, which buys both by restricting the model to narrow tasks"
      - id: d
        text: "The Fly-by-Wire Computer, which is the hardware layer that enforces the hard limits"
    correctOptionIds: [c]
    explanation: "c is correct: the Guarded State Machine keeps sub-second latency and negligible token expense with 99.9% reliability, and pays for it with severely constrained autonomy, because the system is essentially a deterministic DAG or finite state machine where the LLM is restricted to narrow classification or extraction tasks with human-in-the-loop checkpoints on every state mutation. a and b are the two other corners of the trilemma, and both sacrifice a different dimension. d is wrong because the fly-by-wire computer is an analogy for the guardrail layer, not one of the three named trade-off systems. Lesson section: The Cost-Complexity-Reliability Trilemma."
  - id: "2e8f0b8e-9ef3-4212-bfb7-7567d71ddc39"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain the lesson's first invariant, that the LLM is untrusted software, and say what it obliges you to build."
    sampleAnswer: "It means never treating a model completion as a validated instruction. The model is a probabilistic reasoning engine, not a deterministic actuator, so it cannot be trusted to respect a limit it was never mechanically held to. That obliges you to route every state mutation through an external, deterministic validation firewall: Tier 3 action guardrails that clamp transaction sizes, API call rates and database queries regardless of how confident the agent says it is. The fly-by-Wire analogy makes the same point in the other direction, since an Airbus flight computer clamps the pitch angle no matter how hard the pilot pulls the stick."
    explanation: "A strong answer states what untrusted software means in agent terms, names the deterministic firewall as the obligation, and ties it back to the fly-by-wire analogy. An answer that only says the model can be wrong, without saying what has to be built around it, misses the invariant's practical half. Lesson section: Architectural Summary: The 5 Invariants of Production Governance & Economics."
```

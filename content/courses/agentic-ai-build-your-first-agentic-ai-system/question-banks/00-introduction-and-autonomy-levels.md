---
id: "4fb24403-7f1a-4e44-966e-9c51fc689597"
title: "Foundations of Agentic AI & The 5 Levels of Autonomy: Question Bank"
description: "Practice questions for the foundations lesson: reliability decay, the Agentic Viability Index, the L0 to L5 autonomy taxonomy, and the human-in-the-loop escalation envelope."
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

These questions practise [[courses/agentic-ai-build-your-first-agentic-ai-system/lessons/00-introduction-and-autonomy-levels|Foundations of Agentic AI & The 5 Levels of Autonomy]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f79de588-b64c-4777-94bb-5add6258bc2b"
    revision: 1
    status: active
    type: single-choice
    prompt: "A multi-step agent workflow takes 10 sequential steps, and each step succeeds on its own with probability 0.95. Treating the steps as independent, what is the approximate probability that the whole workflow finishes correctly?"
    options:
      - id: a
        text: "About 95 percent, because every individual step is 95 percent reliable"
      - id: b
        text: "About 60 percent, because the step accuracies multiply together"
      - id: c
        text: "About 35 percent, because each additional step adds a fresh chance of failure"
      - id: d
        text: "About 21 percent, because the workflow behaves like a chain of thirty steps"
    correctOptionIds: [b]
    explanation: "b is correct: the lesson models the whole run as P = p^n, so 0.95^10 comes to about 59.9 percent, which rounds to about 60 percent. a is the tempting answer because it reads off the per-step accuracy and ignores the chain. c is the twenty-step figure (0.95^20 is about 35.9 percent), not the ten-step one. d is the thirty-step figure (about 21.5 percent). The lesson's point is that a step accuracy that looks excellent is a workflow reliability that looks like a coin flip. Lesson section: The Mathematical Fragility of Autonomous Agency: Reliability Decay."
  - id: "c82815b1-a8e4-4ed8-a3e8-c6210595e0b7"
    revision: 1
    status: active
    type: single-choice
    prompt: "The Agentic Viability Index (AVI) scores a task before an agent is built for it. Which set of factors does the lesson put in the numerator of the AVI formula?"
    options:
      - id: a
        text: "Entropy, business value and reversibility"
      - id: b
        text: "Latency and the token cost of every model call"
      - id: c
        text: "Human review effort and audit frequency"
      - id: d
        text: "The number of tools and the depth of memory"
    correctOptionIds: [a]
    explanation: "a is correct: AVI is (F_entropy x V_business x R_reversibility) divided by (B_blast_radius x C_latency + epsilon), so entropy, business value and reversibility are the three numerator factors. b is wrong because latency is in the denominator, where a low value is good, and the token cost does not appear in the formula at all. c is wrong because human review effort and audit frequency are never named in the index. d is wrong because the tool count and the memory depth do not enter the calculation either. Lesson section: The Opportunity Evaluation Matrix: Quantifying Agentic Viability."
  - id: "94b40107-f0d5-4d4f-a0bf-6bccb2c42c30"
    revision: 1
    status: active
    type: single-choice
    prompt: "A payroll workflow scores 0.40 on the Agentic Viability Index. What does the lesson's decision rule say to do with it?"
    options:
      - id: a
        text: "Launch the agent at Level 4 and audit its spans asynchronously afterwards"
      - id: b
        text: "Launch the agent at Level 3 and page a human only for out-of-bounds events"
      - id: c
        text: "Reject the agent and write deterministic code instead, because 0.40 falls in the lowest band"
      - id: d
        text: "Launch the agent at Level 2 with a synchronous gate on every proposed action"
    correctOptionIds: [c]
    explanation: "c is correct: the lesson's bands put any AVI below 1.2 in the lowest tier, where the answer is to reject the agent and write deterministic code instead. A payroll workflow scoring 0.40 is therefore not a weak agent, it is a task that should never have been an agent. a and b are wrong because both launch an agent at an autonomy level the score does not support. d is wrong because even the conservative Level 2 launch is an agent launch, and the lesson reserves it for the middle band where an agent is genuinely viable. Lesson section: The Opportunity Evaluation Matrix: Quantifying Agentic Viability."
  - id: "8d6b045a-1467-4a9e-a22b-e263aca4f300"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Before an autonomy level is assigned, the lesson says to assess three dimensions of agency. Which of these are the three? Select every correct answer."
    options:
      - id: a
        text: "Latency autonomy — how many seconds the agent may think before it answers"
      - id: b
        text: "Action autonomy — the hands: which tools the agent may call and with what authority"
      - id: c
        text: "Planning autonomy — the brain: whether the agent breaks the objective into sub-plans"
      - id: d
        text: "End-to-end autonomy — the conductor: whether the agent owns the whole workflow"
    correctOptionIds: [b, c, d]
    explanation: "b, c and d are the three dimensions the lesson names: action autonomy is the hands, planning autonomy is the brain, and end-to-end autonomy is the conductor. a is wrong because latency is not one of the three axes, and the lesson treats latency as a cost in the AVI denominator rather than as a form of agency. A good answer here also says why each one matters: action autonomy decides what the agent may touch, planning autonomy decides how far it decomposes the objective, and end-to-end autonomy decides whether it owns the result. Lesson section: The Autonomy Taxonomy: Action vs. Planning vs. End-to-End Autonomy."
  - id: "58b08524-ee56-4e71-8699-d91be9b701ab"
    revision: 1
    status: active
    type: single-choice
    prompt: "At which level of the L0 to L5 taxonomy does the human become an exception reviewer, paged only when the agent steps outside its authorised bounds?"
    options:
      - id: a
        text: "Level 1, where the model drafts an answer and a human writes out every action"
      - id: b
        text: "Level 2, where a synchronous gatekeeper approves each proposed action before it runs"
      - id: c
        text: "Level 4, where an asynchronous auditor reviews the completed spans after the fact"
      - id: d
        text: "Level 3, where an exception reviewer is paged only for out-of-bounds events"
    correctOptionIds: [d]
    explanation: "d is correct: Level 3 is conditional autonomy, where the human role is exception reviewer and the human is paged only when the agent leaves its authorised bounds. a describes Level 1, the copilot that drafts but never acts. b describes Level 2, the synchronous gatekeeper who approves every action before it runs. c describes Level 4, the asynchronous auditor who reviews the spans after the fact. The whole point of the taxonomy is that the human role changes shape as autonomy rises: writer, then gatekeeper, then exception reviewer, then auditor. Lesson section: The Autonomy Taxonomy: Action vs. Planning vs. End-to-End Autonomy."
  - id: "c04f2212-29aa-4b3b-b294-8646c234bd34"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson's Autonomy Inflation Trap says a new agentic capability should be launched at Level 2 and should not be launched directly at Level 3 or Level 4."
    answer: true
    explanation: "True. The lesson states plainly that a team should never deploy directly to Level 3 or Level 4, and that a new agentic capability should always launch at Level 2 with a synchronous human gate. Autonomy is then earned, by promoting to Level 3 only once real-world distribution data shows the failure modes are captured by deterministic guardrails. The trap is the temptation to skip that step because a demo looked convincing on a handful of cases."
  - id: "8e8cfa2f-ffe6-4eab-b692-7f0ef6909451"
    revision: 1
    status: active
    type: single-choice
    prompt: "The escalation envelope computes a risk score R for every proposed action. Which band does an action scoring R = 0.78 fall into?"
    options:
      - id: a
        text: "AUTO_EXECUTE, because R is below the 0.25 threshold"
      - id: b
        text: "REQUIRE_HUMAN_APPROVAL, because R sits between 0.50 and 0.85"
      - id: c
        text: "VERIFIED_EXECUTE, because R is between 0.25 and 0.50"
      - id: d
        text: "HARD_REJECT, because R is at or above the 0.85 rejection ceiling"
    correctOptionIds: [b]
    explanation: "b is correct: the bands are AUTO_EXECUTE below 0.25, VERIFIED_EXECUTE from 0.25 up to 0.50, REQUIRE_HUMAN_APPROVAL from 0.50 up to 0.85, and HARD_REJECT at 0.85 or above, so 0.78 needs a human decision. a and c are wrong because both put the score in a band it does not reach. d is wrong because the HARD_REJECT threshold is 0.85, and 0.78 is still below it. The lesson's worked engine output agrees: act_003 scores 0.7790 and is routed to a Finance Manager for approval. Lesson section: Engineering Human-in-the-Loop Escalation Boundaries."
  - id: "d80028ce-c390-42c1-b557-e776fe6deaff"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson calls the illusion of determinism a trap. In your own words, say what it is and why a JSON schema does not protect against it."
    sampleAnswer: "The illusion of determinism is the belief that because the agent emits well-formed JSON and every call lands inside a declared schema, the behaviour of the system is predictable and safe. It is an illusion because a schema fixes the shape of a message, not the meaning of its values. A refund tool that accepts {customer_id, refund_cents} will happily accept refund_cents of 9999900 instead of 9900, because both are integers. That is why the lesson insists that every side effect be validated independently of the schema that delivered it."
    explanation: "A strong answer names the gap between syntactic conformance and semantic correctness, and gives the schema-shaped-but-wrong-value example the lesson uses. An answer that only says the schema is not enough, without explaining that it enforces data types rather than business rules, is half the answer. Lesson section: Production \"Most Missed Things\" in Agentic Engineering."
  - id: "96f7523d-9e0a-4e20-bc76-e2c56361a5fd"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which description matches the Autonomy Inflation Trap the lesson warns about?"
    options:
      - id: a
        text: "Launching new agentic capabilities at Level 3 or Level 4 to save engineering time"
      - id: b
        text: "Granting full autonomy on day one and tightening the guardrails later"
      - id: c
        text: "Raising the level whenever a reviewer complains about the system's latency"
      - id: d
        text: "Launching straight to Level 3 or Level 4 rather than starting at the safe Level 2 gate"
    correctOptionIds: [d]
    explanation: "d is correct: the trap is skipping the Level 2 launch and going straight to a higher autonomy level, when the lesson's answer is that autonomy must be earned through real-world evidence rather than assumed. a and b are two faces of the same mistake and are wrong for the same reason. c is wrong because the trigger for raising autonomy is production evidence about failure modes, not a complaint about how slow the system feels. Lesson section: Production \"Most Missed Things\" in Agentic Engineering."
  - id: "aad11d19-6ede-408b-bd69-18c48aca4aa5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson says the Agentic Viability Index rewards certain properties of a task and penalises others. Which of these push an AVI score up? Select every correct answer."
    options:
      - id: a
        text: "Higher entropy in the inputs and the state the agent sees"
      - id: b
        text: "Higher business value for the outcome the agent is asked to produce"
      - id: c
        text: "Higher reversibility, so a wrong action can still be compensated"
      - id: d
        text: "A larger blast radius, so a mistake reaches more of the system"
    correctOptionIds: [a, b, c]
    explanation: "a, b and c all sit in the numerator, so raising them raises AVI: more entropy in the inputs, more business value on the outcome, and more reversibility when something goes wrong. d is wrong because blast radius sits in the denominator, so a larger blast radius lowers the score and makes the task less suitable for an agent. The lesson's rule of thumb follows from this: if the input and state entropy are low, reject the agent and write deterministic code. Lesson section: The Opportunity Evaluation Matrix: Quantifying Agentic Viability."
  - id: "47134abb-2702-43b0-a6d6-f0f7414c64c8"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's policy engine scores four proposed actions. What band does act_002, with a computed risk of 0.2783, land in?"
    options:
      - id: a
        text: "VERIFIED_EXECUTE, because 0.2783 falls between 0.25 and 0.50"
      - id: b
        text: "AUTO_EXECUTE, because 0.2783 falls below the 0.25 threshold"
      - id: c
        text: "REQUIRE_HUMAN_APPROVAL, because 0.2783 is close to the 0.50 boundary"
      - id: d
        text: "HARD_REJECT, because 0.2783 exceeds the 0.25 execution ceiling"
    correctOptionIds: [a]
    explanation: "a is correct: 0.2783 lies between 0.25 and 0.50, so the engine returns VERIFIED_EXECUTE, which the lesson's worked output confirms for act_002. b is wrong because AUTO_EXECUTE needs a score below 0.25. c is wrong because 0.2783 is nowhere near the 0.50 boundary that starts REQUIRE_HUMAN_APPROVAL. d is wrong because the ceiling that triggers HARD_REJECT is 0.85, not 0.25. Lesson section: Production Implementation: Autonomy Decision Engine & Escalation Router."
  - id: "5d0721a4-6588-403a-bb99-d9e765374574"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson uses a flight deck as an analogy for agent autonomy. In your own words, say what the autopilot may do, what it may never do, and what that implies for building an agent."
    sampleAnswer: "The autopilot may act constantly: it makes thousands of small corrections to trim tabs and control surfaces, which is the lesson's image of action autonomy. What it may never do is exercise unbounded policy autonomy, such as deciding to divert a flight from Frankfurt to Munich, because that decision belongs to the pilot in command. The implication for agents is that giving them many small authorities is not the same as giving them a large one, and that the unbounded decisions have to stay with a human while the bounded, frequent ones can be automated."
    explanation: "A strong answer separates the two kinds of authority the analogy names: the autopilot has plenty of action autonomy and no policy autonomy over the flight's destination. It should also draw the design conclusion, which is that the decisions an agent is allowed to take on its own are the small and the bounded ones, while the large ones stay human. Lesson section: The Physical Feynman Analogy: The Medical Residency Hierarchy & Flight Deck Autonomy."
```

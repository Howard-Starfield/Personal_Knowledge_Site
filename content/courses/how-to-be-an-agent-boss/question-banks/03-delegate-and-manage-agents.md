---
id: "27557b17-c662-4a4d-a69b-aa1166b97c10"
title: "Chapter 3: Delegate & Manage — Autonomy Calibration and Lifecycle Operations: Question Bank"
description: "Practice questions on the three autonomy tiers, the operational telemetry cockpit, the two-gate scaling protocol and the agent lifecycle."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "fcc6b41f-6b81-4acb-9d11-99beb482fa0f"
comments: false
---

These questions practise [[courses/how-to-be-an-agent-boss/lessons/03-delegate-and-manage-agents|Chapter 3: Delegate & Manage — Autonomy Calibration and Lifecycle Operations]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "d1ebc7cd-c5d1-4783-958c-d86ecb17e437"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the three autonomy tiers lets the agent execute routine work on its own while humans handle only the exceptions?"
    options:
      - id: a
        text: "Level 1, Human-in-the-Loop, because the agent prepares a staged card and a manager clicks to approve it"
      - id: b
        text: "Level 2, Human-on-the-Loop, because the agent runs routine actions itself and escalates only on thresholds"
      - id: c
        text: "Level 3, Human-out-of-the-Loop, because the agent executes the whole task and logs the outcome for later review"
      - id: d
        text: "Level 2, Human-on-the-Loop, but only once the agent's fallback rate has fallen to zero percent for a month"
    correctOptionIds: [b]
    explanation: "Level 2 is Exception and Review mode: the human steps out of the synchronous critical path, the agent executes Tier 1 and Tier 2 actions immediately, and execution halts when an input crosses a pre-configured threshold, so supervisors handle the 5% to 10% of anomalous transactions while the agent clears the 90% routine volume. A is Level 1. C is Level 3. D is wrong on the fallback rate, because the chapter treats a fallback rate of zero percent as a warning sign rather than an achievement."
  - id: "95c5ab05-a90c-431b-9afa-7642dd8f8354"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under Human-on-the-Loop mode, which of these does the chapter list as a condition that halts execution and dispatches the task to a human for triage?"
    options:
      - id: a
        text: "The requesting employee's role is absent from the agent's permission table for the target system, so the run is stopped"
      - id: b
        text: "The tenant's remaining credit balance has fallen below ten percent of the monthly allocation for the period"
      - id: c
        text: "The agent has been running for more than four hours on one conversation without completing the task"
      - id: d
        text: "The agent's confidence score falls below 0.85, so the request goes to the exception queue"
    correctOptionIds: [d]
    explanation: "The chapter's escalation triggers are a financial ceiling of $250.00, a confidence threshold below 0.85, data ambiguity such as multiple conflicting vendor IDs, negative sentiment such as severe distress or litigation threats, and retry exhaustion when a tool call fails twice consecutively. The other three are not on that list: a permission table is not a trigger, the credit balance belongs to the cost chapter, and there is no running-time trigger for a single conversation."
  - id: "70ffb7cb-083c-4a80-b9a2-4a9eb20a3d1b"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter says a Human-out-of-the-Loop agent is only permissible when three layers of defensive architecture are in place. Which set does it give?"
    options:
      - id: a
        text: "Velocity rate limiters, circuit breaker tripwires, and immutable asynchronous audit trails"
      - id: b
        text: "A three-stage rollout, a weekly manual review of every conversation, and a written operating charter"
      - id: c
        text: "Delegated user credentials, a service principal for privileged calls, and a customer-managed encryption key"
      - id: d
        text: "A golden evaluation dataset, an adversarial red-team exercise, and a sandbox with no production writes"
    correctOptionIds: [a]
    explanation: "The three non-negotiable safeguards for Level 3 are velocity rate limiters such as a maximum of 20 records updated per minute, circuit breaker tripwires that drop the whole agent into Level 1 and alert on-call engineering if the tool failure rate exceeds 3% over a rolling 10-minute window, and immutable asynchronous audit trails logging every prompt, payload, token count and API response. D describes the Stage 1 pilot activities, which come before autonomy is granted."
  - id: "6b338b9b-876b-4a7c-8671-e42632b1a936"
    revision: 1
    status: active
    type: single-choice
    prompt: "The Autonomy Escalation Matrix pairs risk with volume. Which row does the chapter give for a workflow that is high risk and irreversible?"
    options:
      - id: a
        text: "Level 3, Human-out-of-the-Loop, with anomaly tripwires and rate limits as the fallback mechanism"
      - id: b
        text: "Level 2, Human-on-the-Loop, with human sign-off required whenever the cost exceeds 250 dollars"
      - id: c
        text: "Level 1, Human-in-the-Loop, with a mandatory staging card and sign-off at any volume"
      - id: d
        text: "Level 1, Human-in-the-Loop, with multi-party human approval where the volume is under twenty a day"
    correctOptionIds: [c]
    explanation: "The matrix gives high and irreversible risk, at any volume, a Level 1 HITL fallback of a mandatory staging card and sign-off, with database record deletion, refunds over $1,000 and contract approvals as the representative workflows. D describes the separate critical and regulatory row, which adds multi-party approval on top of a volume of under 20 a day."
  - id: "560ac674-5d0b-44d7-823a-1f8b49f55160"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the expense bot case study, the agent's CSAT fell from 4.8 stars to 2.9 while its resolution rate stayed at 91%. What did the log triage find?"
    options:
      - id: a
        text: "The foundation model was degrading week by week, so the response was to rewrite the system prompt from scratch"
      - id: b
        text: "The agent was built only as an Expense Submission Agent, but users read the name and expected travel help too"
      - id: c
        text: "Tool calls were failing, because the SAP connector was returning schema errors under the morning load"
      - id: d
        text: "The turn count per task had climbed, because the confirmation card asked the employee to re-check every field"
    correctOptionIds: [b]
    explanation: "The root cause is an Expectation-Capability Mismatch: the agent was strictly built as an Expense Submission Agent writing rows to the SAP ERP, but it was branded as the Travel and Expense Bot in Teams, so users expected corporate travel policy answers and flight rebooking, and the agent's rigid refusal to answer policy questions earned one-star ratings. A is the novice manager's reaction the chapter explicitly rejects, and C and D are not what the clustered one-star reviews showed."
  - id: "a82f9360-7fad-48d8-af2c-a25c36aeebd0"
    revision: 1
    status: active
    type: single-choice
    prompt: "The two-gate scaling protocol guards an agent before new capabilities are added. What does Gate 1 require?"
    options:
      - id: a
        text: "A new feature shipped as a Level 1 staging card, with a separate evaluation set and its own dedicated regression suite"
      - id: b
        text: "An architectural isolation decision, so the new capability becomes a separate child specialist agent"
      - id: c
        text: "Two hundred consecutive defect-free runs under human supervision before the new feature graduates to Level 2"
      - id: d
        text: "Resolution rate at or above 95% over 30 business days, tool error rate under 1.0%, and a 100% regression pass"
    correctOptionIds: [d]
    explanation: "Gate 1 is Stability and Value Proof: resolution rate at or above 95% over 30 consecutive business days, tool error rate under 1.0%, a fallback rate steady between 4% and 8%, and a 100% pass on the existing golden evaluation regression benchmark. A, B and C are the contents of Gate 2, and the two hundred defect-free runs in C are the graduation condition inside Gate 2 rather than the gate itself."
  - id: "4f4c7c44-25bf-4853-9aa3-b43ae864db6b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Stakeholders want the popular domestic flight agent to take on hotel rebooking, rental cars and conference registration at once. What does the chapter say happens on the naive path?"
    options:
      - id: a
        text: "The tool catalogue grows from four to nineteen, schemas collide, and flight booking reliability falls from 96% to 71%"
      - id: b
        text: "Nothing much changes at all, because the extra tools simply spread across the same requests without any measurable effect"
      - id: c
        text: "The agent refuses the new requests, and the extra tools sit idle while the original four continue to serve users"
      - id: d
        text: "The routing layer absorbs the new intents, and each request is handed to whichever child agent seems closest"
    correctOptionIds: [a]
    explanation: "This is Multi-Intent Drift: the catalogue grows from 4 tools to 19, a request like changing a reservation for next Thursday makes the model confuse the flight change schema with the hotel rebooking schema, and the once-beloved flight booking reliability plummets from 96% to 71%. C describes what the 2-Gate protocol aims for, not what the naive path produces, and D describes an architecture the chapter recommends against for this case."
  - id: "aa58433d-d00f-4b83-a42f-15273994ea4d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter place in the weekly maintenance cadence for an agent in operational cadence? Select every correct answer."
    options:
      - id: a
        text: "Review the top five fallback and escalation query clusters to find where the agent is giving up"
      - id: b
        text: "Inspect tool error logs and API latency spikes for the patterns behind the failures"
      - id: c
        text: "Re-run the full golden evaluation regression suite to confirm the fixes have not broken anything"
      - id: d
        text: "Benchmark the agent against newly released foundation models to decide whether to rebuild it"
    correctOptionIds: [a, b]
    explanation: "The weekly cadence covers the top five fallback and escalation query clusters, tool error logs and API latency spikes, and the qualitative thumbs-down feedback. Re-running the regression suite is a monthly task, and benchmarking against newly released foundation models is a quarterly review, so C and D are correctly ruled out."
  - id: "2e3e279b-9192-4c65-8167-5e32a7309b43"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are named retirement triggers in the chapter's lifecycle for an enterprise agent? Select every correct answer."
    options:
      - id: a
        text: "Core business process extinction, when the underlying process is redesigned or eliminated entirely"
      - id: b
        text: "API and system deprecation, when the backend software changes in a fundamentally different direction"
      - id: c
        text: "A foundation model leap, when a modern model can run the workflow natively in a single tool call"
      - id: d
        text: "Credential revocation, once the OAuth tokens and service principals have been deleted from the tenant"
    correctOptionIds: [a, b, c]
    explanation: "The chapter names three retirement triggers: core business process extinction, API and system deprecation such as moving from an on-premise Oracle ERP to SAP S/4HANA, and a foundation model leap that makes a complex multi-agent routing architecture redundant. Credential revocation is a phase of the graceful retirement protocol, not a reason to retire the agent."
  - id: "34096ff2-35a0-4ea1-8341-42cfbf33bc96"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says that a fallback rate of zero percent on an agent is often a warning sign rather than a sign of perfection."
    answer: true
    explanation: "The chapter's fallback rate entry says a target typically sits between 5% and 10%, and that a fallback rate of 0% is often a warning sign, because it means the agent lacks defensive boundaries and is likely hallucinating answers to out-of-scope queries. A perfectly clean escalation rate sounds like success but is evidence that the agent never refuses, and a well-governed agent must refuse sometimes."
  - id: "546a6051-53d4-431f-a41a-0a87da63c78d"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter's 4-step remediation protocol fixed the expense bot's falling CSAT. Name the four steps and say what each one settled."
    sampleAnswer: "Step 1, Diagnose the Scope Gap, separated the user demands into functional categories and found an expectation-capability mismatch rather than a technical failure. Step 2, Evaluate ROI and Feasibility, judged policy FAQs high ROI and low risk, while flight and hotel booking was low immediate ROI and massive risk. Step 3, Implement Clean Addition, grounded the agent read-only on the official travel policy PDF through RAG while leaving the SAP expense submission schema untouched. Step 4, Tune CLEAR Boundaries and Routing, updated the agent's Limits with an explicit routing response pointing booking requests to the corporate travel portal. Within two weeks CSAT rebounded to 4.7 stars with no backend code refactored."
    explanation: "A strong answer gives all four steps in order and shows that the fix was a targeted addition plus a clear boundary, not a rewrite. The best answers also give the outcome, because the point of the protocol is that CSAT rebounded to 4.7 stars without refactoring a single line of backend ERP code."
  - id: "ddb49da3-8206-4e41-863d-f5f44b0ebc2e"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter gives a four-phase protocol for retiring an agent. Name the phases and say what each one does."
    sampleAnswer: "Phase 1 is a 30-day sunset notice, which displays an informative deprecation banner in the chat interface and redirects users to the new tool. Phase 2 is read-only lockdown, which revokes write permissions so the agent can still answer status queries but halts new mutations. Phase 3 is credential revocation, deleting OAuth tokens, Entra ID service principals and webhook subscriptions. Phase 4 is telemetry archival, exporting audit trails and evaluation logs to cold storage for compliance retention. The protocol exists because simply turning off the server or deleting the keys leaves users stranded and scheduled webhooks failing silently."
    explanation: "A strong answer names all four phases in order and explains that the order matters, because notice, then lockdown, then credential revocation, then archival keeps users and auditors served. The best answers add the reason for the protocol, which is that a silent switch-off strands users and leaves failing webhooks behind."
```

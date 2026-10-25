---
id: "bca3709b-5c87-4949-9e1a-afe04734bb1e"
title: "Chapter 2: Build Agents with Purpose — Defining Scope & Choosing Tools: Question Bank"
description: "Practice questions on instruction bloat, the CLEAR framework, modular agent handoffs, the tool risk matrix and pre-deployment evaluation."
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

These questions practise [[courses/how-to-be-an-agent-boss/lessons/02-build-agents-with-purpose|Chapter 2: Build Agents with Purpose — Defining Scope & Choosing Tools]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "4bb18cac-5b29-49bd-8785-f0875d3a3a5b"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's Swiss Army Knife Trap describes what happens when a single agent is given every job at once?"
    options:
      - id: a
        text: "The model gets slower but stays accurate, because extra instructions always add useful context to the reasoning"
      - id: b
        text: "Attention dilutes, tool selection breaks down and token burn rises, so the agent stops obeying its own rules"
      - id: c
        text: "The prompt outgrows the context window, so the runtime truncates the conversation and loses the earlier history"
      - id: d
        text: "The build fails outright, because Copilot Studio refuses to compile an agent that carries more than a hundred tools"
    correctOptionIds: [b]
    explanation: "The chapter lists three effects of instruction bloat: attention dilution, tool selection confusion and runaway latency and token burn, followed by the death spiral in which builders answer with even more emphatic instructions that dilute attention further. C mistakes the symptom for the disease, because the four thousand-word trigger phrase problem is about conflict and drift, not about a context limit. D is not a behaviour of the platform the chapter describes."
  - id: "104c6dee-9da1-4af3-bf10-e30cbbefafa5"
    revision: 1
    status: active
    type: single-choice
    prompt: "The CLEAR Framework gives an agent five pillars. Which set does the chapter give?"
    options:
      - id: a
        text: "Context, Language, Examples, Execution and Response, so the model's tone and vocabulary are pinned down"
      - id: b
        text: "Persona, Prompt, Tools, Retrieval and Review, matching the order the configuration screens appear in"
      - id: c
        text: "Context, Limits, Evaluation, Actions and Response, so the agent is scored before it is allowed to answer"
      - id: d
        text: "Context, Limits, Execution, Actions and Response, treated as a binding standard operating procedure"
    correctOptionIds: [d]
    explanation: "CLEAR stands for Context, Limits, Execution, Actions and Response, and the chapter treats it as the contract or standard operating procedure you hand to a new employee. A invents a Language pillar and drops Limits, which is the pillar that carries the negative constraints. B renames the pillars to match a configuration screen rather than the framework. C replaces Execution with Evaluation, which the chapter handles separately as a pre-deployment concern."
  - id: "fe8a324e-bfd5-4fd9-856c-f4d75ab636da"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's Rule of Single Responsibility for Agents states what?"
    options:
      - id: a
        text: "One agent equals one verifiable business mission; if you cannot say it in one active-verb sentence, split it"
      - id: b
        text: "One agent may own one business domain, but only if the domain fits inside a single connector in Copilot Studio"
      - id: c
        text: "One agent may own up to four business missions, provided the total instruction set stays under eight thousand words"
      - id: d
        text: "One agent must own the whole workflow end to end, because handing work to a child agent doubles the token cost"
    correctOptionIds: [a]
    explanation: "The rule is one agent equals one verifiable business mission, with the chapter's own example of validating receipts and submitting expense claims to the SAP ERP as a single active-verb sentence. If you cannot summarise the objective that way, the scope is too wide and you split it. B and C invent conditions the chapter does not state, and D runs directly against the chapter's federated architecture."
  - id: "d71a5c97-0780-49d9-a3cb-92c0759c61b2"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's Tool Risk Matrix puts every tool in one of three tiers. Which tier is a tool that creates a reversible draft for review?"
    options:
      - id: a
        text: "Tier 1, because a tool that only produces output without changing anything is always the lowest risk"
      - id: b
        text: "Tier 3, because anything that creates a file in a business system can eventually change a real record"
      - id: c
        text: "Tier 2, the moderate-risk draft tier that needs reviewable output and a user preview notification"
      - id: d
        text: "Tier 3, because the draft is still a write against the business system and must be signed off by a manager"
    correctOptionIds: [c]
    explanation: "Tier 1 is read and non-destructive, with autonomous execution and standard rate limiting. Tier 2 is draft and moderate risk, requiring reviewable output and a user preview notification, and its examples are drafting an email, staging an ERP form and creating a purchase request. Tier 3 is the high-risk mutating tier with irreversible state changes, which requires a mandatory Human-in-the-Loop confirmation card or manager approval."
  - id: "338eefd4-f838-4362-879d-7ecdf0eaa58d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What two technical controls does the chapter's Blast Radius Invariant require of every Tier 3 tool?"
    options:
      - id: a
        text: "A written operating manual of around thirty pages, and a quarterly review with the security team"
      - id: b
        text: "An explicit Human-in-the-Loop confirmation that halts execution, and a unique idempotency key on every request"
      - id: c
        text: "A separate service principal with its own dedicated permissions, and an encrypted channel to the target system"
      - id: d
        text: "A mandatory cooling-off period of twenty-four hours, and a second separate agent to re-check the payload"
    correctOptionIds: [b]
    explanation: "Any action classified as Tier 3 must display an itemised confirmation card and halt execution until the user explicitly approves, and must carry a unique transactional idempotency key such as req_uuid_v4 so that a retry is never processed twice by the receiving backend. A, C and D sound like governance, but the invariant names exactly these two technical controls, and adding a delay would not stop a duplicate payment."
  - id: "1fed5105-e2e3-4aa4-930c-4718bbd2e649"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter treats prompt compression as the false solution to instruction bloat. Why does it fail?"
    options:
      - id: a
        text: "Because a compressed prompt cannot be debugged, since a dense block of text hides which rule the model actually broke"
      - id: b
        text: "Because shortening a prompt always lowers the model's reasoning quality on every kind of question asked of it"
      - id: c
        text: "Because the real fix is a frontier model with a much longer context window, not a smaller and denser prompt"
      - id: d
        text: "Because the chapter forbids compressing prompts, on the grounds that agents must always read their full instruction set"
    correctOptionIds: [a]
    explanation: "The chapter gives three reasons: compressing prompts reduces semantic clarity so the model loses nuance and misses subtle negative constraints, tool selection accuracy plummets because API descriptions lack explicit parameter examples, and debugging a dense compressed prompt is nearly impossible. The first reason in that list is the one to give, because the failure that reaches production is the missed negative constraint. C is the opposite of the chapter's argument, since the cure is modular decomposition, not a bigger window."
  - id: "f0ee42b9-2578-4372-8e3d-02573f92fe75"
    revision: 1
    status: active
    type: single-choice
    prompt: "A project manager proposes deploying a new customer agent to production and watching CSAT scores and response times for two weeks. What is the chapter's answer?"
    options:
      - id: a
        text: "A qualified yes, provided the agent is limited to internal staff and the CSAT target is set at four stars"
      - id: b
        text: "A yes, because two weeks of real traffic is the only way to see how employees actually phrase their requests"
      - id: c
        text: "A no, because customer satisfaction cannot be measured reliably in any setting, online or offline"
      - id: d
        text: "An emphatic no, because CSAT is post-hoc, biased by survivorship, and cannot tell you what went wrong"
    correctOptionIds: [d]
    explanation: "The chapter's answer is an emphatic NO, for four reasons: the strategy is post-hoc and reactive, it suffers survivorship bias because frustrated users leave rather than fill in surveys, it has zero diagnostic specificity, and latency is not correctness, since an agent can fabricate an answer in 600ms and be blazingly fast and entirely defective. A and B are the arguments the chapter rejects. C overstates the case, because the objection is to CSAT as a pre-deployment gate, not to measuring satisfaction."
  - id: "348b63e1-4b4c-490c-96a4-f9096c793dc7"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter include in the offline pre-flight evaluation suite? Select every correct answer."
    options:
      - id: a
        text: "Happy-path scenarios, forty percent of the suite, checking the sequential playbook and the JSON parameters"
      - id: b
        text: "Complex edge cases, thirty percent of the suite, such as multi-currency receipts and the eighty-nine day boundary"
      - id: c
        text: "Adversarial and prompt-injection cases, which check the agent keeps its system prompt confidential"
      - id: d
        text: "Live production traffic from real customers, sampled over the first two weeks after the launch"
    correctOptionIds: [a, b, c]
    explanation: "The four partitions are happy path at forty percent, complex edge cases at thirty percent, negative boundary and out-of-scope tests at fifteen percent, and adversarial and prompt injection tests at fifteen percent. D is the strategy the chapter rejects, because waiting for live customers to suffer damage is post-hoc and non-diagnostic."
  - id: "8973e2d4-76f4-4ce0-86c9-751f457f3093"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The chapter's grounding hierarchy places three kinds of source. Which of these pairings does it give? Select every correct answer."
    options:
      - id: a
        text: "Live REST and OData APIs for high-velocity transactional state such as current account balances"
      - id: b
        text: "Relational databases and Dataverse tables for structured, deterministic queries such as the employee directory"
      - id: c
        text: "Enterprise semantic search over policy PDFs and handbooks for deterministic arithmetic on a monthly total"
      - id: d
        text: "The agent's own conversation history for structured schema validation on the vendor master record"
    correctOptionIds: [a, b]
    explanation: "The hierarchy runs from live REST and OData APIs for high-velocity transactional state, through relational databases and Dataverse tables for structured and deterministic data, down to enterprise semantic search, which is RAG over policy PDFs, handbooks and transcripts. C misplaces semantic search: it is the unstructured and qualitative band, used for questions such as the daily per diem meal allowance in London, not for deterministic arithmetic. D names a source the hierarchy does not contain."
  - id: "3b600de3-96fe-4e84-a7fb-8172442a8563"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter places enterprise semantic search, which covers policy PDFs and handbooks, in the unstructured and qualitative band of its grounding hierarchy rather than in the structured and deterministic one."
    answer: true
    explanation: "The hierarchy puts enterprise semantic search, which is RAG over SharePoint, tenant graph and vector indexes, in the unstructured and qualitative band, below relational databases and Dataverse tables in the structured and deterministic band. The chapter's own example for semantic search is a question about the daily per diem meal allowance in London, and for structured entities it is a question about how many vacation days an employee has left."
  - id: "91bace50-5f5f-40dc-a860-4f6eab1526f8"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter lists four non-negotiable release thresholds that must pass before an agent is published. Name them and give their minimum passing values."
    sampleAnswer: "Tool Calling Accuracy must be at least 98%, meaning the exact correct tool was selected with valid argument types. Negative Constraint Adherence must be 100%, with zero tolerance for violating a safety rule such as approving an un-receipted expense or leaking prompt secrets. Grounded Faithfulness must be at least 95%, so every policy claim maps directly to a cited paragraph in the grounded documentation. Deterministic Schema Compliance must be 100%, so Adaptive Cards and downstream webhook payloads conform strictly to the target JSON schema."
    explanation: "A strong answer gives all four metrics with their figures, and notices that the two set at 100% are the safety ones, where the chapter allows no tolerance at all. The best answers also place the overall deployment gate of a score of at least 95% separately from the individual thresholds."
  - id: "24a0b17c-f7de-477f-a8c1-1fdbad5d547b"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe what a modular handoff gives the child agent, using the chapter's own travel booking example."
    sampleAnswer: "The Primary Agent acts as a front-desk router, handling intent classification, user authentication and context coordination before it dispatches. The Travel Booking child agent receives a clean context window, carrying only the relevant parameters such as the destination Dallas and the purpose Sales Summit, and none of the earlier conversation about budget spreadsheets or tax forms. It has a dedicated tool surface of just SearchFlights and ReserveHotelRoom, so it is physically impossible for it to trigger an ERP expense payment or alter a payroll ledger. When it finishes it returns a structured execution receipt, such as a CONFIRMED status and a booking reference, and the Primary Agent resumes the conversation and moves on to the next intent."
    explanation: "A strong answer names the four properties of a handoff: a clean context window, a dedicated tool surface, a structured return contract and resumption. The best answers explain why the dedicated tool surface matters, because it makes an out-of-mandate action impossible rather than merely discouraged."
```

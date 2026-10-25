---
id: "0723727e-d8f7-427b-8367-f6b372bc61ac"
title: "Introduction: Leading AI Agents with Confidence: Question Bank"
description: "Practice questions on the passive-chatbot versus digital-employee distinction, the four reasons agent projects fail, and the three tests for agent readiness."
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

These questions practise [[courses/how-to-be-an-agent-boss/lessons/00-introduction|Introduction: Leading AI Agents with Confidence]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "68c5effd-4c2b-4576-a01f-5f18eb7e3ab9"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which contrast does the introduction draw between passive AI and an active AI agent?"
    options:
      - id: a
        text: "Passive AI handles only structured spreadsheet inputs, while an agent also handles unstructured emails, prose and messy scans"
      - id: b
        text: "Passive AI waits for a prompt and returns text, while an agent is triggered by events and acts through tools in a loop"
      - id: c
        text: "Passive AI keeps persistent enterprise state between sessions, while an agent starts every conversation with no memory"
      - id: d
        text: "Passive AI can write directly to business applications, while an agent is limited to printing answers on a screen"
    correctOptionIds: [b]
    explanation: "The introduction describes passive AI as Prompt In to Text Out: reactive, ephemeral and bounded entirely by the chat window, while an agent is triggered by events or schedules and works through a multi-step loop. A misstates the passive system, which is conversational rather than restricted to spreadsheets. C reverses the two, because the agent is the one grounded in persistent enterprise state. D reverses them again, since it is the agent that reads and writes business systems while the passive one only produces output on a screen."
  - id: "93f3d7f3-7c8a-4f9f-ba72-920f1a030501"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the introduction, what turns a chatbot into something that behaves like a digital intern?"
    options:
      - id: a
        text: "A larger context window, more parameters, and a friendlier conversational tone throughout the interface"
      - id: b
        text: "A proprietary corporate database, a branded avatar, and a custom user interface for the chat window"
      - id: c
        text: "A longer system prompt, an operations manual of about thirty pages, and a very generous token allowance each month"
      - id: d
        text: "Tools such as APIs, grounding in organizational data, and an execution loop that plans, acts, observes and iterates"
    correctOptionIds: [d]
    explanation: "The introduction states that when an AI system is given tools, grounding and execution loops, it stops being a calculator and becomes that intern. A, B and C each describe ways of making a chatbot wordier or better dressed, none of which lets it act on the business. Longer prompts are in fact the danger the Prompter's Fallacy names, because sprawling instructions cause instruction conflict and the loss of negative constraints."
  - id: "c43f337f-bc96-47c4-afc6-9c6e1e906887"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which execution loop does the introduction say separates an agent from a chatbot?"
    options:
      - id: a
        text: "Think, act, observe the result, and iterate, the multi-step ReAct loop the introduction names"
      - id: b
        text: "Prompt, parse, classify and return one completion, without any further tool call being made"
      - id: c
        text: "Plan once at the start of a run, then execute every remaining step without checking any intermediate result"
      - id: d
        text: "Retrieve, rerank, summarise and hand the result to the user, who performs the final action by hand"
    correctOptionIds: [a]
    explanation: "The comparison table gives the passive system's execution loop as single-turn inference and the agent's as the multi-step ReAct loop of thinking, acting, observing and iterating. B describes the passive side. C is close to an agent but wrong on the observation step, and observation is exactly what lets an agent correct itself. D describes a retrieval system that advises rather than acts."
  - id: "a36f0095-55cb-4f16-bf78-bff180f5f87f"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction lists four reasons enterprise agent implementations fail. Which set does it give?"
    options:
      - id: a
        text: "Unclear goals, weak models, slow hardware and a shortage of structured data in the enterprise"
      - id: b
        text: "Expensive licences, a crowded market, a long sales cycle and a competing internal tool"
      - id: c
        text: "Poorly defined scope, nonexistent guardrails, uncalibrated autonomy, and ignored costs and telemetry"
      - id: d
        text: "A missing intern, an absent operating manual, no escalation policy and no weekly review meeting at all"
    correctOptionIds: [c]
    explanation: "The introduction says implementations almost never fail because the foundation model lacked reasoning capability; they fail on scope, guardrails, autonomy and cost visibility. A and B list technical and commercial obstacles that the chapter does not name as causes. D mixes genuine management artefacts from the intern analogy, but they are not the four reasons the chapter gives."
  - id: "b3fef70b-1b11-4b04-93a7-5feaa484ff97"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction says some workflows should not be given to an agent at all. What points to traditional automation instead?"
    options:
      - id: a
        text: "The workflow involves unstructured inputs that must be read and judged, so no rule engine can express it"
      - id: b
        text: "The workflow is entirely structured, predictable and rule-based, so ordinary automation is faster and cheaper"
      - id: c
        text: "The workflow needs a judgement no human has ever performed before and no example can be given"
      - id: d
        text: "The workflow changes every week, so any automation would be rebuilt constantly and would never settle down"
    correctOptionIds: [b]
    explanation: "The Discover stage says that if a workflow is 100% structured, predictable and rule-based, traditional automation such as a Power Automate flow or a script is faster, cheaper and more reliable, and agents shine when there is ambiguity, unstructured text, dynamic reasoning and flexible planning. A and C describe exactly the conditions that call for an agent. D is the opposite of the point, since a workflow that changes every week cannot be standardised for anyone, agent or script."
  - id: "dbf82524-d4fc-4576-a1d3-73cabeab36d0"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction offers three tests a manager can apply before building an agent. What does the Blast Radius Check ask?"
    options:
      - id: a
        text: "Whether the workflow could be handed to a junior intern working only from a single-page written operating manual"
      - id: b
        text: "Whether the workflow contains unstructured reasoning that an if-then rule could never express at all"
      - id: c
        text: "Whether the agent's instructions fit inside a fixed context window without losing any of the safety rules"
      - id: d
        text: "What the worst outcome would be if the agent ran a hallucinated tool call"
    correctOptionIds: [d]
    explanation: "The Blast Radius Check asks what the worst thing is that happens if the agent executes a hallucinated tool call, and the answer decides whether a mandatory Human-in-the-Loop approval gate is required. A is the Intern Test and B is the Efficiency Test, both of which the chapter lists separately. C is not one of the three tests the introduction names."
  - id: "57bc6a14-f6e5-4cda-8811-a2409525f94c"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction describes the Prompter's Fallacy. Which of its three failure modes comes first?"
    options:
      - id: a
        text: "Unbounded scope, where sprawling instructions cause instruction conflict and lost negative constraints"
      - id: b
        text: "Hallucinated API calls, where the agent invents endpoint names and dispatches unauthorised emails to customers"
      - id: c
        text: "Unmonitored token burn, where a reasoning loop retries for dozens of turns before anyone notices"
      - id: d
        text: "Unverified answers, where the agent states figures it cannot support with any grounded source document"
    correctOptionIds: [a]
    explanation: "The Prompter's Fallacy lists its three failure modes in order: unbounded scope and prompt bloat, then hallucinated API calls and uncontrolled side effects, then unmonitored token burn and runaway loops. B and C are the second and third modes. D is not one of the three; the chapter's point is that a chatbot's wrong sentence has a blast radius of zero, while an agent's wrong action reaches production systems."
  - id: "f8cfc902-d5bc-42dc-9b98-27f0f1420c2a"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The introduction describes what gives an intern their authority on a task. Which of these does it list? Select every correct answer."
    options:
      - id: a
        text: "A defined objective and scope, so the intern knows what finishing the task actually looks like"
      - id: b
        text: "Access to tools and enterprise systems, so the intern can act rather than only advise"
      - id: c
        text: "Grounded organizational knowledge, so the intern works from company policy rather than general guesses"
      - id: d
        text: "A permanent seat in every planning meeting, so the intern hears about work before it arrives"
    correctOptionIds: [a, b, c]
    explanation: "The intern in the introduction has a defined objective and scope, access to tools and enterprise systems, grounded organizational knowledge, the agency to execute a multi-step sequence of actions, and escalation boundaries. The first three are on that list. A seat in planning meetings is not one of them, and it is not one of the capabilities that turns a chatbot into an intern either."
  - id: "34a98775-9062-4ff9-ab3c-c715a14c47b8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The introduction's comparison table sets passive AI beside active AI agents. Which rows does that table actually use? Select every correct answer."
    options:
      - id: a
        text: "System access, where the passive system only produces output on a screen while the agent reads and writes"
      - id: b
        text: "Failure mode, where the passive system hallucinates prose while the agent hallucinates an action"
      - id: c
        text: "Voice and tone, where the passive assistant answers briefly while the agent answers at length"
      - id: d
        text: "Training volume, where the agent has been trained on far more documents than the passive system"
    correctOptionIds: [a, b]
    explanation: "The table's rows are operational role, trigger mechanism, execution loop, system access, organizational context, failure mode and human relationship. System access and failure mode are two of them, and both are what make the agent role qualitatively different. Voice and tone is not a row, and neither is training volume."
  - id: "a5abf53f-8203-45a4-aaf0-df3d171fb526"
    revision: 1
    status: active
    type: true-false
    prompt: "The introduction says a workflow should be given to an agent whenever it is too painful for a person to carry out by hand, even when every step of it is structured and rule-based."
    answer: false
    explanation: "The Efficiency Test says the opposite. Where a workflow is 100% structured, predictable and rule-based, traditional automation such as a Power Automate flow or a script is faster, cheaper and more reliable, and there is no unstructured reasoning to justify paying the compute tax of an agentic model. Pain is a reason to automate something; it is not, on its own, a reason to choose an agent."
  - id: "d18338c0-4499-40f0-8d2d-95f7a3ced228"
    revision: 1
    status: active
    type: free-recall
    prompt: "Name the three tests the introduction offers for deciding whether a workflow is ready for an agent, and say what each one asks."
    sampleAnswer: "The Intern Test asks whether you could write an onboarding intern's responsibilities, allowed tools and escalation criteria on a single page; if you cannot, the workflow is too ambiguous for an agent. The Blast Radius Check asks what the worst outcome would be if the agent executed a hallucinated tool call, and an answer such as corrupt production records or an unauthorized financial transfer demands a Human-in-the-Loop approval gate. The Efficiency Test asks whether the workflow is genuinely dynamic or could be solved with an if-then rule, because if there is no unstructured reasoning you should not pay the compute tax of an agentic model."
    explanation: "A strong answer names all three tests, says what each one asks in a clause, and gives the consequence of each answer: an ambiguous workflow, a mandatory approval gate, and the compute tax of an agent that was not needed."
  - id: "1101ff48-1dd4-4157-8857-60b7f9fc521b"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the four stages of the agent lifecycle the introduction sets out, and name the framework each stage is paired with."
    sampleAnswer: "The introduction structures the work as four stages. Discover is Strategy and Opportunity Selection, where the BXT Framework of Business value, user Experience and Technical feasibility decides whether an agent is warranted at all. Build is Scope, Grounding and Modular Tools, where the CLEAR Framework of Context, Limits, Examples, Actions and Result writes the agent's instructions. Manage is Autonomy, Oversight and Operations, covering the Human-to-Agent Ratio, review cadences and pre-deployment evals. Optimize is Cost Governance, Telemetry and Lifecycle Decisions, covering credit forecasting, spending ceilings, and when to scale, repurpose or retire an agent."
    explanation: "A strong answer gives the four stages in order and pairs each with the framework or discipline the introduction names for it, showing that discovery comes before building, that instructions are written with CLEAR, and that cost and lifecycle decisions are treated as part of the cycle rather than an afterthought."
```

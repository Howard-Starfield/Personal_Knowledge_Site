---
id: "1433bfd1-8bf0-44e8-8704-b68594d34b89"
title: "Chapter 1: Discover Agents — Finding High-Leverage Workflows: Question Bank"
description: "Practice questions on judging agent opportunities with the freight-truck test, the BXT framework, the build-buy-extend triad and the 3-gate fit audit."
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

These questions practise [[courses/how-to-be-an-agent-boss/lessons/01-discover-agents|Chapter 1: Discover Agents — Finding High-Leverage Workflows]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "7f04eab3-758b-46a5-a319-f2c3a7857eef"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter places candidate workflows on a Workflow Automation Matrix. Which of these belongs in deterministic automation rather than in the AI agent realm?"
    options:
      - id: a
        text: "Reading free-form supplier emails and judging which contract clause applies to each complaint"
      - id: b
        text: "Copying daily sales totals from a structured SQL table into a fixed five-column ledger"
      - id: c
        text: "Extracting merchant names and amounts from a photographed receipt with uneven lighting"
      - id: d
        text: "Deciding which customers need empathy from the tone of their replies to an outage email"
    correctOptionIds: [b]
    explanation: "The chapter's own RPA versus Agent Test uses this example and answers no: the workflow has 100% structured inputs and zero variance in business logic, so a deterministic script or Power Automate flow is cheaper, faster and 100% reliable with zero risk of hallucination. A, C and D all need unstructured reading or qualitative judgement, which is exactly the territory the matrix reserves for agents, parsers and extractors."
  - id: "61db2b66-1ac2-4cb2-81ba-b8677f7a41d7"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's Golden Rule of the Agent Boss tells you to do what before you build an agent?"
    options:
      - id: a
        text: "Choose a frontier model with a very large context window and a generous token allowance for the team"
      - id: b
        text: "Run a three-gate audit against every prebuilt agent in the vendor marketplace before selecting one"
      - id: c
        text: "Score the candidate workflow on the BXT scoring card and confirm it clears the green threshold band"
      - id: d
        text: "Standardize the human workflow, so two experienced people agree on the exact sequence of steps"
    correctOptionIds: [d]
    explanation: "The Golden Rule is that before you build an agent, you standardize the human workflow, because if two experienced team members cannot agree on the exact sequence of steps, business rules and escalation criteria, an agent will fail every single time. B and C are real activities in the chapter but they come later, and A is a tooling choice that does nothing for a process nobody has defined."
  - id: "dba95f36-646a-4ec3-9f63-8474f8dafc77"
    revision: 1
    status: active
    type: single-choice
    prompt: "The freight-truck metaphor says to judge an agent with the four questions a seasoned fleet manager asks. Which set of questions does it give?"
    options:
      - id: a
        text: "Payload capacity, fuel efficiency, terrain capability and maintenance overhead"
      - id: b
        text: "Gross weight, wheelbase, turning radius and the length of the warranty on the chassis"
      - id: c
        text: "Horsepower, acceleration from zero to sixty, the top speed it can reach and how it sounds"
      - id: d
        text: "Whether it costs less than a used van, whether it can be insured, and how quickly it can be serviced"
    correctOptionIds: [a]
    explanation: "The chapter's four fleet-manager questions are payload capacity, fuel efficiency, terrain capability and maintenance overhead. B and C describe the showroom sports car rather than the working truck, which is the point of the metaphor. D is a plausible business question, but it is not one of the four the chapter names."
  - id: "d0f8330b-c621-471f-900c-ecd785dd6148"
    revision: 1
    status: active
    type: single-choice
    prompt: "A prebuilt agent from a marketplace must clear an audit before you provision access to it. What does the 3-Gate Fit Audit examine?"
    options:
      - id: a
        text: "Whether the vendor's licence price beats the cost of building the same workflow on an enterprise platform"
      - id: b
        text: "Whether the agent's headline benchmark scores match the ones published in the vendor's own marketing"
      - id: c
        text: "Capability and grounding match, data connection and security permissions, then enterprise IT governance and approval"
      - id: d
        text: "Whether the agent supports multilingual chat, a branded voice, regional data residency and several deployment models"
    correctOptionIds: [c]
    explanation: "The three gates are Gate 1 Capability and Grounding Match, which asks whether it actually reasons and can ingest your data formats; Gate 2 Data Connection and Security Permissions, which covers the identity model, retention and encryption; and Gate 3 Enterprise IT Governance and Approval Path, which covers audit trails, the kill switch and lifecycle. A, B and D are procurement and marketing checks that the chapter deliberately does not treat as gates."
  - id: "a121d1c3-b7ce-4d2a-9886-67395390565c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Gate 2 of the fit audit compares two identity models for an agent. Which comparison does the chapter make?"
    options:
      - id: a
        text: "Service principal access is safer, because one shared credential removes the employee's own permission limits"
      - id: b
        text: "Delegated access is safe because the agent inherits the user's permissions, while service principal access is hazardous if uncontrolled"
      - id: c
        text: "Both models are equally safe, provided the vendor encrypts in transit with TLS 1.3 and at rest with AES-256"
      - id: d
        text: "Delegated access suits read-only queries, and service principal access is required for any write operation"
    correctOptionIds: [b]
    explanation: "Delegated access is marked safe because the agent acts strictly on behalf of the logged-in employee and inherits their exact permission boundaries, so it cannot see Executive Compensation documents if that employee cannot. Application or service principal access is marked hazardous if uncontrolled, because a single shared super-admin credential can leak restricted corporate secrets to an unauthorized employee. Encryption standards matter, but they do not make the two identity models equally safe."
  - id: "f120cd64-5bf7-45d3-a542-3b96f3e3a72d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The BXT Scoring Card rates each dimension from 1 to 5. What does the chapter say about a candidate that scores 8 in total?"
    options:
      - id: a
        text: "A priority pilot that should be fast-tracked for immediate prototype development and sandbox testing"
      - id: b
        text: "A conditional candidate whose scope, grounding data or API bottlenecks must be fixed before building"
      - id: c
        text: "A borderline case that should be scored again by a different team before any decision is recorded"
      - id: d
        text: "A disqualified candidate that should not be automated with AI agents at all"
    correctOptionIds: [d]
    explanation: "The thresholds are 13 to 15 for a Priority Pilot, 10 to 12 for a Conditional Candidate, and below 10 for Disqualified, where the advice is to apply traditional automation, improve the manual process, or discard. Eight therefore falls in the disqualified band. A and B describe the two higher bands, and C is not a band the chapter defines."
  - id: "a9a01a45-4731-463b-8959-5ff7db8ec966"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the RFP security questionnaire case study, what does the agent change the turnaround time to?"
    options:
      - id: a
        text: "Twenty-four hours, from a baseline turnaround of seven business days"
      - id: b
        text: "Two hours, because the 150-question spreadsheet is filled in entirely by the agent"
      - id: c
        text: "Unchanged at seven business days, while the manual effort per RFP falls to forty-five minutes"
      - id: d
        text: "One business day, so the prospect receives the completed answers the same afternoon"
    correctOptionIds: [a]
    explanation: "The baseline is a 150-question spreadsheet that takes an average of 7 business days, and the case study reports cycle time dropping from 7 days to 24 hours, with the Sales Engineer reduced from 12 hours to 45 minutes of human review. C misreads the case study by holding the turnaround fixed, and B and D are turnaround figures the chapter never claims."
  - id: "033708da-ee8d-4e73-acf5-f059f2728ecb"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter place in the eXperience dimension of the BXT Framework? Select every correct answer."
    options:
      - id: a
        text: "Friction elimination, so the agent removes tedious toil instead of adding a clunky new interface"
      - id: b
        text: "Trust and verification burden, where ten minutes of checking every thirty-second output cancels the gain"
      - id: c
        text: "Graceful escalation, so the agent hands off with an organised summary when it hits an edge case"
      - id: d
        text: "API write capabilities, because the target system must accept writes through a clean documented interface"
    correctOptionIds: [a, b, c]
    explanation: "The eXperience dimension covers friction elimination, trust and verification burden, intuitive interaction and graceful escalation UX. The ten minutes of checking against a thirty-second output is the Ghost Verification Penalty the chapter names. API write capabilities belong to the Technology dimension, so D is the wrong dimension."
  - id: "5e6cbcf1-05c5-4e8b-8e45-4980415427c8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter say about the Build versus Buy versus Extend triad? Select every correct answer."
    options:
      - id: a
        text: "Extend is the pragmatic path for 80% of enterprise business workflows"
      - id: b
        text: "Extend reaches value in days to weeks, the same speed as buying an off-the-shelf marketplace agent"
      - id: c
        text: "Build gives total architectural control and zero vendor lock-in, at the cost of a very high upfront investment"
      - id: d
        text: "Buy allows unlimited customization depth, because any marketplace agent can be rewritten for internal databases"
    correctOptionIds: [a, c]
    explanation: "Extend is described as the pragmatic path for 80% of enterprise business workflows, building on an established platform such as Microsoft Copilot Studio, Microsoft 365 Agents, Salesforce Agentforce or ServiceNow GenAI. Build is where total architectural control and zero vendor lock-in live, and its upfront cost is very high. B is wrong because Extend takes weeks to two months while Buy takes days to weeks, and D is wrong because Buy's customization depth is only surface-level."
  - id: "8a6bbb07-7359-43dc-ba53-901cd3c2b786"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter states that if two experienced human team members cannot agree on the exact sequence of steps, business rules and escalation criteria for a task, an AI agent will fail every single time."
    answer: true
    explanation: "That is the Golden Rule of the Agent Boss almost verbatim: clean up the process first, automate second. The Tool Trap shows what skipping it produces, because an agent deployed into a messy environment reads conflicting documentation and makes contradictory decisions for different clients, queries APIs that hold stale data, and floods mailboxes with confused clarification requests."
  - id: "3bded655-2af7-40b9-abc2-78c77432112e"
    revision: 1
    status: active
    type: free-recall
    prompt: "The freight-truck metaphor tells you to judge an agent with a fleet manager's four questions. Name the four and say what each one is for."
    sampleAnswer: "Payload Capacity asks whether the workflow carries meaningful business value, such as invoices processed or disputes resolved, rather than being decorative novelty. Fuel Efficiency asks what the compute cost of tokens, credits and API calls is relative to the economic value generated per resolved task. Terrain Capability asks how the agent behaves when inputs are messy, incomplete, contradictory or delayed, and whether it stays on the road or spins out into hallucinations. Maintenance Overhead asks how much human supervision, prompt tuning, schema syncing and telemetry monitoring it will take to keep it running smoothly week after week."
    explanation: "A strong answer names all four questions with the chapter's own vocabulary, because the point of the metaphor is that a flashy demo answers none of them. The best answers add that ninety-five percent of social media clips and vendor demos are showroom sports cars, rated on zero payload and runaway fuel burn."
  - id: "f6b8cd32-c849-464e-adfa-2c2595866adb"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter gives a four-step method for decomposing a workflow before you consider automating it. Name the four steps and say what each one produces."
    sampleAnswer: "Triggers and Inputs establishes what initiates the workflow and what format the input arrives in, such as a customer email, a new ERP row, an IT alert or a scheduled interval. Dependencies and System Boundaries maps which systems are involved and what credentials or security boundaries gate access to them. Decision Points and Cognitive Friction locates where humans currently pause to evaluate, and whether the criteria are strict arithmetic rules such as an approval threshold or tacit qualitative judgement. Success Metrics and KPIs establishes how success is measured today, through cycle time, error and re-work rate, hours consumed per week, compliance adherence or customer satisfaction."
    explanation: "A strong answer gives the four steps in order and says what each one produces, using the chapter's own metrics. The best answers note that the third step is the decisive one, because a workflow whose decisions are all strict arithmetic rules belongs to a rules engine or deterministic automation rather than to an agent."
```

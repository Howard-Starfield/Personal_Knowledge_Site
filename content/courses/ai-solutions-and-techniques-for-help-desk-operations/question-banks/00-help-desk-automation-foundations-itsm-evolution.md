---
id: "8b63ceba-c2af-45a4-8a1f-c8e61bd82eba"
title: "Help Desk Automation Foundations: From Static Rule Queues to Cognitive Service Desks: Question Bank"
description: "Practice questions for the help desk automation foundations lesson, covering the toil audit, PAPS prioritisation, the zombie tool audit and the four-stage maturity path."
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

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/00-help-desk-automation-foundations-itsm-evolution|Help Desk Automation Foundations: From Static Rule Queues to Cognitive Service Desks]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "2adfeb2b-721d-4559-b9ea-b166803ce4ce"
    revision: 1
    status: active
    type: single-choice
    prompt: "Workflow A is Self-Service Password Reset, with 8 people involved, a 10-minute cycle and 95% manual repetition, against an implementation cost of 2. What is its Process Automation Prioritization Score, and where does it land?"
    options:
      - id: score-3781
        text: "37.81, which makes it Priority 1: Automate Now"
      - id: score-2118
        text: "21.18, which makes it Priority 2: Automate Now"
      - id: score-1398
        text: "13.98, which makes it Priority 3: Augment with AI"
      - id: score-1798
        text: "17.98, which makes it Redesign First: Manual Keep"
    correctOptionIds: [score-3781]
    explanation: "PAPS divides human effort times cycle time times manual repetition by implementation cost plus 0.01, so Workflow A scores 8 x 10 x 0.95 over 2.01, which is 76.0 over 2.01, or 37.81. The lesson ranks that as Priority 1: Automate Now. 21.18 is Workflow B's score (SaaS License Deprovisioning), 13.98 is Workflow C's (Home Office Wi-Fi and VPN Debugging) and 17.98 is Workflow D's (Ad-Hoc Executive Onboarding Customization), so each distractor belongs to a different workflow rather than to Workflow A."
  - id: "34149988-3bb7-4444-8c55-3a5c9a8e3bd6"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the lesson's four workflows is classified as Priority 3: Augment with AI?"
    options:
      - id: workflow-a
        text: "Workflow A, Self-Service Password Reset"
      - id: workflow-b
        text: "Workflow B, SaaS License Deprovisioning"
      - id: workflow-c
        text: "Workflow C, Home Office Wi-Fi and VPN Debugging"
      - id: workflow-d
        text: "Workflow D, Ad-Hoc Executive Onboarding Customization"
    correctOptionIds: [workflow-c]
    explanation: "Workflow C scores 13.98 and is labelled Priority 3: Augment with AI, because its manual repetition is only 40% and it needs endpoint telemetry rather than a clean API. Workflow A scores 37.81 and Workflow B scores 21.18, so both are Automate Now, while Workflow D scores 17.98 and lands in Redesign / Manual Keep because its repetition is only 15% and it involves bespoke security clearances."
  - id: "ba9e38b7-3db6-423c-b75a-f2e9522372e0"
    revision: 1
    status: active
    type: single-choice
    prompt: "Before automating a workflow, what does the lesson say must be true of the manual process itself?"
    options:
      - id: gate-documented
        text: "Once the standard operating procedure has been written down by the team"
      - id: gate-98
        text: "Only once a human can execute the procedure with at least 98% success"
      - id: gate-90days
        text: "Once the knowledge behind the procedure has drifted less than 90 days"
      - id: gate-turnover
        text: "Once the annual turnover rate across the support team falls below 40%"
    correctOptionIds: [gate-98]
    explanation: "The lesson warns that automating a broken manual workflow accelerates the generation of errors by 1,000x, and sets a hard gate: if a human analyst cannot execute the process from a written SOP with at least a 98% success rate, the process must be refactored before any bot or LLM touches it. Writing the SOP down is not enough, knowledge drift within 90 days is a Stage 1 problem rather than a readiness gate, and the 40% turnover figure describes the staffing risk the automation is meant to fix."
  - id: "97187dd2-7649-4d8b-aba9-9b1a733cc819"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's 4-step zombie tool audit protocol, what is the first step?"
    options:
      - id: audit-ap
        text: "Reconcile the accounts payable ledger against every vendor invoice"
      - id: audit-dns
        text: "Sweep DNS and network telemetry for unused connection endpoints"
      - id: audit-keys
        text: "Inventory every API key and webhook that is still active in the estate"
      - id: audit-sso
        text: "Ingest single sign-on records and flag seats with zero logins in 60 days"
    correctOptionIds: [audit-sso]
    explanation: "The protocol opens with single sign-on ingestion: query the Okta or Entra ID Graph APIs for all registered enterprise apps, extract the last sign-in timestamp across provisioned accounts, and flag any application with zero logins in the preceding 60 days. DNS and network telemetry, API key and webhook inventory, and accounts payable reconciliation are the later steps that confirm what the sign-in data suspected."
  - id: "f3f306f3-106f-4e84-9c19-1a9fe4496f39"
    revision: 1
    status: active
    type: single-choice
    prompt: "A support team of 25 analysts turns over at 40% a year, with recruitment costing $15,000, onboarding $8,000, and lost productivity of $5,000 a month for a three-month ramp. What is the annualised cost of that turnover?"
    options:
      - id: turn-38000
        text: "$38,000 a year, because only one of the ten departures is counted"
      - id: turn-150000
        text: "$150,000 a year, which is the budget redirected into automation"
      - id: turn-380k
        text: "$380,000 a year, across ten departures costing $38,000 each"
      - id: turn-1050k
        text: "$1,050,000 a year, if the ramp-up period runs for twelve months"
    correctOptionIds: [turn-380k]
    explanation: "Ten departures times a per-departure cost of $15,000 plus $8,000 plus $5,000 times three months, which is $38,000 each, gives $380,000 a year. That is the annual capital hemorrhage the lesson describes. $150,000 is the amount redirected into the automation engine rather than the turnover cost, $38,000 is the per-departure figure rather than the annual total, and the twelve-month ramp is not the three months the lesson assumes."
  - id: "b4a921ca-edb1-4e2d-b8ae-87d828996972"
    revision: 1
    status: active
    type: single-choice
    prompt: "A help desk depends on eight disconnected platforms, and each pair has to be kept in sync. How many point-to-point API integrations does that require?"
    options:
      - id: links-28
        text: "28, because eight tools imply eight times seven, halved"
      - id: links-16
        text: "16, because each tool only has to talk to the one beside it in the stack"
      - id: links-64
        text: "64, because every tool must be able to talk to every other one"
      - id: links-8
        text: "8, because a single shared interface lets all eight tools use one link"
    correctOptionIds: [links-28]
    explanation: "The lesson models the integration surface as N(N-1)/2, so eight platforms such as Zendesk, Jira, Okta, Slack, Jamf, CrowdStrike, PagerDuty and SolarWinds need 8 x 7 / 2 = 28 independent API integrations. Each one is a point of silent failure when a vendor changes an API version or an OAuth scope. Sixteen understates the surface by treating the tools as a chain, 64 counts ordered pairs instead of unordered ones, and 8 ignores the pairwise nature of the problem entirely."
  - id: "bf41dd8a-597f-4908-ab5c-12e9457a511f"
    revision: 1
    status: active
    type: single-choice
    prompt: "What mean time to resolution does the lesson attach to Stage 3 of the service desk evolution, the Cognitive and Proactive stage?"
    options:
      - id: stage-days
        text: "Days to weeks, because reactive firefighting still dominates the queue"
      - id: stage-60s
        text: "Under 60 seconds, because the system acts before the user reports a fault"
      - id: stage-4h
        text: "Around four hours, because a first-line analyst still confirms each ticket"
      - id: stage-90m
        text: "Under 90 minutes, because a deterministic rule set clears the standard catalogue"
    correctOptionIds: [stage-60s]
    explanation: "Stage 3 pairs agentic tool execution with self-healing telemetry and drives mean time to resolution under 60 seconds, because the platform detects and remedies the fault before the user thinks to open a ticket. Days to weeks belongs to Stage 0 Reactive Chaos, and the rule-driven stage that follows it still relies on humans working through a queue, so neither of those answers describes Stage 3."
  - id: "4464f9c6-cddc-4d8f-93fc-ad2646e12a07"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these categories does the lesson's toil table mark as Automate Immediately? Select every correct answer."
    options:
      - id: toil-password
        text: "Password Resets and Account Unlocks, at 20% to 30% of volume and 8 to 12 minutes each"
      - id: toil-mfa
        text: "MFA Token Resync and Device Registration, at 12% to 18% of volume and 10 to 15 minutes each"
      - id: toil-license
        text: "Software License and SaaS Access Requests, at 8% to 14% of volume and 12 to 20 minutes each"
      - id: toil-hardware
        text: "Hardware Diagnostics and Peripheral Failures, at 10% to 15% of volume and 30 to 45 minutes each"
    correctOptionIds: [toil-password, toil-mfa, toil-license]
    explanation: "The table marks password resets, MFA resync and software licence or SaaS access requests as Automate Immediately, because each is a static identity or provisioning check that a script can finish in minutes. Hardware diagnostics and peripheral failures are marked Augment with AI, since they need physical inspection and carry high cognitive complexity. VPN tunnel drops sit at Augment or Self-Service, and application bugs route to Tier-3 rather than to automation."
  - id: "ddb65f4c-cbc4-41d3-93d1-ac85829daccb"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these statements about the lesson's figures is true? Select every correct answer."
    options:
      - id: fact-50-70
        text: "A cognitive service desk extinguishes 50% to 70% of standard IT tickets at the source."
      - id: fact-turnover
        text: "Help desk turnover above 40% a year creates offboarding blind spots and SLA penalty exposure."
      - id: fact-status
        text: "Status check tickets represent 15% of inbound chat volume in many IT organizations."
      - id: fact-zombie
        text: "Inactive seats typically account for 30% to 50% of total SaaS spend."
    correctOptionIds: [fact-50-70, fact-turnover, fact-status]
    explanation: "The lesson gives 50% to 70% for the share of standard tickets a cognitive service desk extinguishes, links turnover above 40% to credential retention, context loss and a 15% throughput drop that can trigger penalties of hundreds of thousands of dollars a quarter, and puts status checks at 15% of inbound chat volume. The zombie-tool figure is 15% to 30% of SaaS spend, not 30% to 50%, so the last statement overstates it."
  - id: "84ababba-ad6b-43be-a8d9-8f6fa1d460eb"
    revision: 1
    status: active
    type: true-false
    prompt: "A deterministic rule set written today will still be accurate in three months, because static rules do not drift out of date."
    answer: false
    explanation: "The lesson's Stage 1 is defined by rule fragility: static HTML and PDF wiki articles drift out of date within 90 days of creation, and rule tables grow to thousands of conflicting lines. When a user types Cannot access my credentials instead of password, the rule misses and the ticket falls into an unassigned dead queue. The claim is false because rules drift precisely because the products and processes behind them keep changing."
  - id: "429c49f1-5096-4a98-a52e-133fc80a52df"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the Process Automation Prioritization Score would rank the lesson's four workflows, and say which one you would automate first and why."
    sampleAnswer: "PAPS = (human effort x cycle time x manual repetition) / (implementation cost + 0.01). Workflow A, Self-Service Password Reset, scores 8 x 10 x 0.95 over 2.01, which is 37.81, and is Priority 1: Automate Now. Workflow B, SaaS License Deprovisioning, scores 5 x 15 x 0.85 over 3.01, which is 21.18, and is Priority 2: Automate Now. Workflow C, Home Office Wi-Fi and VPN Debugging, scores 7 x 35 x 0.40 over 7.01, which is 13.98, and is Priority 3: Augment with AI. Workflow D, Ad-Hoc Executive Onboarding Customization, scores 9 x 120 x 0.15 over 9.01, which is 17.98, and is Redesign or Manual Keep. I would automate Workflow A first because it has the highest score, the lowest implementation cost and the highest manual repetition, and because a password reset already runs headlessly through an identity provider API in the vast majority of cases."
    explanation: "A strong answer states the formula, gives all four scores with their labels, and justifies the first choice in terms of high repetition, low implementation cost and a headless execution path. It should also notice that Workflow D scores higher than Workflow C despite its long cycle time, because its manual repetition of 15% and bespoke security clearances make it a redesign case rather than an automation case."
  - id: "dd483e97-5644-4296-82ad-1fbc1a181a4a"
    revision: 1
    status: active
    type: free-recall
    prompt: "A support manager asks why the lesson refuses to automate the ad-hoc executive onboarding workflow first, even though each ticket takes 120 minutes. Explain your answer using the lesson's prioritisation model and its readiness gate."
    sampleAnswer: "The cycle time is not the deciding factor. Workflow D has the longest cycle time at 120 minutes and 9 people involved, but its manual repetition is only 15%, so much of that time is judgement and bespoke customisation rather than repeatable procedure, and its implementation cost of 9 is the highest of the four. Its PAPS is 9 x 120 x 0.15 over 9.01, which is 17.98, and the lesson labels it Redesign or Manual Keep. The readiness gate also applies: if a human cannot execute the process from a written SOP with at least a 98% success rate, automating it would accelerate the generation of errors by 1,000x and corrupt directories. So I would redesign the onboarding workflow first and automate Workflow A, the self-service password reset at 37.81, as the pilot."
    explanation: "A strong answer shows that PAPS divides out manual repetition and implementation cost, so a long cycle time alone does not make a workflow an automation candidate, and that Workflow D at 17.98 belongs in Redesign or Manual Keep. It also applies the 98% success gate, explains the 1,000x error amplification risk, and proposes the higher-scoring workflow as the pilot."
```

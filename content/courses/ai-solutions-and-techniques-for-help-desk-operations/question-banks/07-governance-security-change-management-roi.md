---
id: "e8df5815-d699-45d9-9844-bda0ade76d82"
title: "Enterprise Governance & Economics: Data Privacy, Human-in-the-Loop Safeguards & TCO/ROI Models: Question Bank"
description: "Practice questions for the governance and economics lesson, covering the four action delegation tiers, the steering committee, the adoption roadmap and the TCO, NPV and ROI model."
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

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/07-governance-security-change-management-roi|Enterprise Governance & Economics: Data Privacy, Human-in-the-Loop Safeguards & TCO/ROI Models]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "61f3a1c1-45b6-4754-8430-68d99c936780"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson's delegation model sort proposed AI actions into four tiers?"
    options:
      - id: tier-four
        text: "Tier 0 read-only, Tier 1 reversible, Tier 2 stateful and Tier 3 critical infrastructure"
      - id: tier-shuffle
        text: "Tier 0 reversible, Tier 1 read-only, Tier 2 critical and Tier 3 stateful"
      - id: tier-one
        text: "A single tier, because every action should be reviewed by the steering committee first"
      - id: tier-three
        text: "Three tiers, because Tier 2 and Tier 3 both need multi-party quorum approval"
    correctOptionIds: [tier-four]
    explanation: "The tiers run from risk and blast radius upwards: Tier 0 is informational and read-only with zero risk and full autonomy, Tier 1 is a reversible low-risk mutation, Tier 2 is a stateful or irreversible mutation with significant identity or financial impact, and Tier 3 is a critical infrastructure mutation with an enterprise-wide, catastrophic blast radius. The tiers are not interchangeable, and the autonomy model tightens as the blast radius grows."
  - id: "037e38cf-afd7-45be-a72b-2c9a1b891877"
    revision: 1
    status: active
    type: single-choice
    prompt: "What approval does a Tier-3 action such as modifying a perimeter firewall rule require before it runs?"
    options:
      - id: q-one
        text: "One approval, because the AI proposal already carries the risk assessment"
      - id: q-async
        text: "Asynchronous notification only, because the action is reversible by the automated rollback script"
      - id: q-dual
        text: "Two independent operators, for example the CISO and the IT Director, approving synchronously"
      - id: q-committee
        text: "A single approval from the steering committee at its next bi-weekly scheduled meeting"
    correctOptionIds: [q-dual]
    explanation: "Tier 3 carries a catastrophic, organisation-wide blast radius, so it demands a multi-party quorum with dual keys: synchronous approval by at least two independent operators such as the CISO and the IT Director, plus a fully tested catastrophic rollback runbook and a snapshot state backup. Asynchronous notification is the Tier-1 model, and a Tier-1 rollback script is not a substitute for a second signature on a firewall change."
  - id: "e7dbb19b-8cc0-4ebc-89ea-a246a3b91fdc"
    revision: 1
    status: active
    type: single-choice
    prompt: "What automated rollback requirement does the lesson attach to a Tier-1 reversible action?"
    options:
      - id: rb-next
        text: "Rollback scripts must exist, but they are only run by a technician during the next shift"
      - id: rb-60
        text: "An automated rollback script must trigger if the health check fails within 60 seconds"
      - id: rb-none
        text: "Nothing is required, because Tier-1 actions are already reversible by definition"
      - id: rb-weekly
        text: "A snapshot of the endpoint disk image, taken once a week by the endpoint agent"
    correctOptionIds: [rb-60]
    explanation: "Tier-1 actions run autonomously with safeguards and post-action notification only, but the rollback requirement is mandatory: an automated rollback script must fire if the health check fails within 60 seconds. Reversibility in principle is not the same as a guaranteed reversal in practice, and the 60-second bound is what keeps a bad Tier-1 action from lingering across a shift."
  - id: "82b22592-e432-4e93-b6d5-99fd81fab837"
    revision: 1
    status: active
    type: single-choice
    prompt: "The cross-functional AI steering committee holds absolute veto power over automation expansions. Which of these forces a mandatory review?"
    options:
      - id: gov-vendor
        text: "A new vendor contract is signed, because procurement must always consult the steering committee"
      - id: gov-deflect
        text: "A weekly report shows deflection rates above 40% on the target categories"
      - id: gov-turnover
        text: "Technician turnover rises above 35% in a single quarter"
      - id: gov-trigger
        text: "A Tier-2 or Tier-3 script is proposed, or a security anomaly is confirmed"
    correctOptionIds: [gov-trigger]
    explanation: "The committee meets on a bi-weekly cadence and must review whenever a new Tier-2 or Tier-3 action script is proposed for automation, whenever model drift exceeds a 5% deviation on the baseline evaluation suite, and whenever a confirmed security anomaly or prompt injection attempt is detected. The other three are ordinary operational events that the committee tracks but does not gate on."
  - id: "c4b38149-e6f0-459b-b738-d3b323bca48a"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson's AI Quality Bounty change the behaviour it wants from technicians?"
    options:
      - id: bounty-throughput
        text: "Technicians are paid per ticket closed, because raw throughput is what the support function is measured on"
      - id: bounty-silent
        text: "Overrides are logged silently, because collecting corrections would slow the resolution queue"
      - id: bounty-modal
        text: "A 2-click categorisation modal captures why the AI proposal was rejected, for a gold-standard dataset"
      - id: bounty-confirmed
        text: "Only confirmed hallucinations earn a bounty, so that staff are not paid for ordinary disagreement"
    correctOptionIds: [bounty-modal]
    explanation: "The lesson inverts the incentive: technicians are rewarded for teaching, correcting and auditing the model rather than for raw ticket volume, through micro-bonuses or recognition points for catching hallucinations and stale documentation, and through a 2-click modal that categorises a rejected proposal as Stale Documentation, Hallucinated Parameter, Incomplete Context or User Nuance Missed. The original prompt, the erroneous draft, the human correction and the categorisation are bundled into a gold-standard dataset for fine-tuning and regression suites."
  - id: "bf5541fe-17db-4292-8b4e-f9ac91fd2b5f"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson's worked business case put as the initial year-0 capital expenditure?"
    options:
      - id: capex-150
        text: "$150,000, made up of $85,000 integration, $40,000 sanitization and $25,000 upskilling"
      - id: capex-195
        text: "$195,000, because the lesson treats the first year's operating cost as part of the initial capital outlay"
      - id: capex-45
        text: "$45,000, because that is what the three recurring platform and compute lines cost in total"
      - id: capex-285
        text: "$285,000, which is the total capital and operating spend across the three-year horizon"
    correctOptionIds: [capex-150]
    explanation: "CapEx_0 is $150,000, being $85,000 for system integration, private VPC and KMS setup, $40,000 for the enterprise sanitization engine and custom connectors, and $25,000 for the 4-week staff upskilling and change management programme. The $45,000 is the annual operating expenditure, so $195,000 is the first-year total outlay of capital plus operating cost, and $285,000 is the capital plus three years of operating expenditure."
  - id: "7388a576-36f8-4806-b5d0-f86d82baa283"
    revision: 1
    status: active
    type: single-choice
    prompt: "What three-year net present value does the lesson's worked business case report, and at what discount rate?"
    options:
      - id: npv-995
        text: "$995,000 a year, which is the gross saving before the operating expenditure is deducted"
      - id: npv-2212
        text: "$2,212,460, the 3-year NPV at a 10% discount rate on the $150,000 capital outlay"
      - id: npv-803
        text: "$803,400, which is the first-year net benefit after capital and operating expenditure"
      - id: npv-950
        text: "$950,000 a year, which is the net cash flow once operating expenditure is deducted"
    correctOptionIds: [npv-2212]
    explanation: "Discounting $950,000 of net cash flow a year at the enterprise's 10% cost of capital gives a 3-year NPV of $2,212,460, with a cumulative lifecycle ROI of 947.4% and a capital payback period of about 1.89 months. $995,000 is the annual gross saving before operating expenditure, $950,000 is the annual net cash flow, and $803,400 is the first-year net benefit."
  - id: "c95e9629-ab48-4c52-9ecc-4789e53a2fa0"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are entry or exit conditions the lesson attaches to stages of the five-stage adoption roadmap? Select every correct answer."
    options:
      - id: road-sanitize
        text: "Stage 2 requires a sanitization pipeline reaching 99.9% PII scrubbing in the synthetic test harness"
      - id: road-agree
        text: "Stage 2 requires at least 92% agreement with historical senior technician routing"
      - id: road-ciso
        text: "Stage 4 requires CISO approval of the Tier-2 HITL boundary and zero unapproved state mutations"
      - id: road-stage5
        text: "Stage 5 may begin as soon as the copilot is live, with no incident record required first"
    correctOptionIds: [road-sanitize, road-agree, road-ciso]
    explanation: "The roadmap is gated: Stage 2 needs 99.9% PII scrubbing in the synthetic test harness and must reach at least 92% agreement with historical senior technician routing on 5,000 historic tickets; Stage 4 needs SOC 2 Type II audit readiness, CISO approval of the Tier-2 HITL boundary and zero unapproved state mutations; and Stage 5 may only begin after 60 consecutive days with zero security or privacy incidents across Stage 4. The fourth option removes the gate that the whole roadmap exists to impose."
  - id: "e58b4177-19ec-4a0e-a0c5-4c0f706f8b87"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are phases of the lesson's enterprise incident response plan for AI operations? Select every correct answer."
    options:
      - id: ir-contain
        text: "Containment and isolation at T+0 to 5 minutes: trip the circuit breaker and revoke OAuth tokens"
      - id: ir-forensic
        text: "Forensic investigation at T+5 to 60 minutes: replay the payload and check the retrieval chunk lineage"
      - id: ir-remediate
        text: "Remediation and rollback at T+1 to 4 hours: run rollback scripts and blacklist adversarial vectors"
      - id: ir-shutdown
        text: "Permanent shutdown of the AI help desk, which the plan requires within one business day"
    correctOptionIds: [ir-contain, ir-forensic, ir-remediate]
    explanation: "The plan has three phases: containment and isolation from T+0 to 5 minutes, which trips the global circuit breaker to downgrade the bot to static read-only mode, revokes the AI service principal OAuth tokens in IAM and Active Directory and isolates affected tenant sessions; forensic investigation from T+5 to 60 minutes, which replays the exact prompt payload through an isolated sandbox debugger, inspects the vector RAG retrieval chunk lineage for poisoned sources and reviews the WORM cryptographic state logs; and remediation and rollback from T+1 to 4 hours, which executes the rollback scripts for unverified state mutations and blacklists adversarial prompt vectors in the deterministic WAF. Permanent shutdown is not one of the phases."
  - id: "c11904ce-a9f4-42a2-a3ac-9fb131905e33"
    revision: 1
    status: active
    type: true-false
    prompt: "A Tier-3 action such as modifying a perimeter firewall rule may be executed on a single operator's approval."
    answer: false
    explanation: "The claim is false. Tier 3 covers critical infrastructure mutations with an enterprise-wide, catastrophic blast radius, and the autonomy model for it is a multi-party quorum with dual keys, so approval must come synchronously from at least two independent operators, such as the CISO and the IT Director, backed by a fully tested catastrophic rollback runbook and a snapshot state backup. A single approval is the Tier-2 model, and it is not sufficient for a firewall or mass endpoint patch."
  - id: "77be11db-bae4-4a1a-a685-f18464048cdd"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work out the lesson's business case for a 5,000-employee organisation: the capital and operating outlay, the three savings pillars, and the resulting NPV and payback."
    sampleAnswer: "The organisation handles 120,000 tickets a year at a fully loaded Tier-1 cost of $12.00 a ticket, with a technician rate of $24.00 an hour, 35% turnover on a 25-technician fleet at $23,750 a replacement, and a 10% discount rate. Capital outlay is $150,000, being $85,000 for system integration, private VPC and KMS setup, $40,000 for the sanitization engine and connectors and $25,000 for the 4-week upskilling programme, and annual operating expenditure is $45,000, being $22,000 of platform licensing, $11,000 of token inference and vector compute and $12,000 of knowledge base drift maintenance. Gross savings are $995,000 a year across three pillars: $720,000 from deflecting and autonomously resolving 50% of the 120,000 tickets, $180,000 from saving 7.5 minutes of technician labour on each of the 60,000 tickets that still reach a human, and $95,000 from retaining 4 technicians whose turnover falls from 35% to 19%. Net cash flow is therefore $950,000 a year, so over three years discounted at 10% the NPV is $2,212,460, the cumulative lifecycle ROI is 947.4% and the capital payback period is about 1.89 months, under 8 weeks."
    explanation: "A strong answer separates CapEx_0 from annual OpEx, names the three savings pillars with their own arithmetic, and then carries the net cash flow through the discounting to the NPV, the ROI and the payback period. It should also note that the turnover pillar is a retention effect on 4 technicians rather than a headcount cut, and that the pessimistic end of the sensitivity matrix still returns $513,000 a year."
  - id: "f51a9599-6faf-4915-ad8f-b0f2872db9a7"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the lesson's four action delegation tiers and the durable state machine that carries the approvals for the upper two."
    sampleAnswer: "Tier 0 is informational and read-only, such as retrieving a KB article or querying ticket status, with zero risk, fully autonomous execution, no human intervention and no rollback requirement because no state changes. Tier 1 is a reversible low-risk mutation, such as sending a password reset email or terminating a hung spoolsv.exe process, which runs autonomously with safeguards and post-action notification, and which must carry a mandatory automated rollback script that fires if the health check fails within 60 seconds. Tier 2 is a stateful or irreversible mutation, such as granting a Salesforce entitlement or provisioning an Adobe Creative Cloud licence, and requires synchronous single-operator human authorization plus a documented manual rollback procedure. Tier 3 is critical infrastructure, such as modifying a perimeter firewall rule, dropping a database schema or mass-patching endpoint operating systems, and requires a multi-party quorum with dual keys, meaning at least two independent operators approving synchronously, along with a fully tested catastrophic rollback runbook and a snapshot state backup. The approvals are carried by a durable state machine on Temporal.io or AWS Step Functions, which tolerates hours or days of human latency without losing state: it validates the schema and entitlement prerequisites, generates an HMAC-SHA256 signed approval token, dispatches an interactive card to a Slack or Teams channel, moves the request to WAITING_FOR_HUMAN_APPROVAL with a 4-hour TTL, and on approval re-checks the cryptographic token and the operator's MFA before a privileged service worker executes the target API, with every outcome written to a tamper-evident WORM audit log."
    explanation: "A strong answer gives all four tiers with a concrete example and the autonomy model for each, and then describes the state machine with its durable orchestrator, the signed approval token, the 4-hour TTL, the MFA re-check and the WORM audit log. The key insight it should draw is that the state machine is what makes asynchronous human approval safe for an autonomous system, because the system's authority is suspended until a human authorises it."
```

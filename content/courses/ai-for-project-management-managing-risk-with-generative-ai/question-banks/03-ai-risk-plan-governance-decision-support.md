---
id: "c7ae74a8-7e56-44bf-bd76-ef97b4b5ac49"
title: "The AI RISK PLAN Framework: Contingency Planning, Decision Support & Ethical Guardrails: Question Bank"
description: "Practises reserve sizing and governance, MCDA decision support, alarm-fatigue mathematics, telemetry triage and the three ethical guardrails."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - project-management
  - study-guide
  - assessment
  - active-recall
courseId: "c3271776-f252-4801-8b82-fc56d514b473"
comments: false
---

These questions practise [[courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/03-ai-risk-plan-governance-decision-support|The AI RISK PLAN Framework: Contingency Planning, Decision Support & Ethical Guardrails]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "81f6feea-61eb-4e35-9d6e-d68a34bc8ddb"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's three-tier capital structure separates a contingency reserve from a management reserve. What distinguishes them?"
    options:
      - id: opt-a
        text: "The contingency reserve is held by the executive sponsor and sized from organisational risk tolerance, while the management reserve is the PM's to spend at will"
      - id: opt-b
        text: "The two are the same pool under two names, differing only in whether a change control board is told about the drawdown afterwards"
      - id: opt-c
        text: "The management reserve sits inside the cost baseline and the contingency reserve sits outside it, so that EVM measures progress against the reserve"
      - id: reserves
        text: "Contingency is inside the cost baseline and PM held; management is outside it and sponsor held"
    correctOptionIds: [reserves]
    explanation: "The contingency reserve covers known-unknowns, is sized by EMV or the P80 differential, sits inside the cost baseline that EVM measures against, and is deployed autonomously by the project manager. The management reserve covers unknown-unknowns, is sized parametrically, sits outside the cost baseline, and is held by the executive sponsor or change control board."
  - id: "6ef216d0-3998-4a43-976d-b39cd5b665f1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson says a contingency reserve is useless if the project manager must deliberate for two weeks while a crisis compounds. What must every funded contingency plan carry?"
    options:
      - id: opt-a
        text: "A named accountable lead, a quarterly review date and a budget code, so that the response can be scheduled and audited like any other work package"
      - id: opt-b
        text: "A formal contract amendment approved by the change control board, so that the drawdown itself becomes part of the contractual baseline"
      - id: elements
        text: "A metric, an operator and threshold, a pre-authorised drawdown, a fallback runbook"
      - id: opt-c
        text: "An executive escalation ladder with three named roles, so that whoever is on duty can obtain an approval within the hour"
    correctOptionIds: [elements]
    explanation: "Every funded contingency plan needs a concrete telemetry metric, a relational operator with a numerical threshold, a pre-authorised drawdown amount, and a deterministic fallback sequence that engineering leads can execute immediately. The lesson's worked CP-02 follows exactly that shape."
  - id: "fef1769c-ad7f-4fcc-ae9a-2b960f6adfd3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's Multi-Criteria Decision Analysis, the five criteria carry different weights and different directions. Which criterion is treated as a benefit, where a higher raw value is preferred?"
    options:
      - id: benefit
        text: "Resilience SLA, which carries a weight of 0.30"
      - id: opt-a
        text: "Time to Deploy in weeks, weighted 0.20, because a faster deployment is always the cheaper choice in money as well as in time"
      - id: opt-b
        text: "Vendor Lock-in on a one to ten scale, weighted 0.15, because a locked-in supplier is the only source of a reliable multi-region design"
      - id: opt-c
        text: "Technical Debt on a one to ten scale, weighted 0.15, because a high debt score is the clearest signal that an architecture should be replaced"
    correctOptionIds: [benefit]
    explanation: "Cost, Time to Deploy, Technical Debt and Vendor Lock-in are all cost criteria, normalised with (max - x) / (max - min), while Resilience SLA is a benefit criterion normalised with (x - min) / (max - min). ALT-A wins on 0.6552 precisely because its 9.2 resilience score earns it a 0.8889 utility against a 0.30 weight."
  - id: "24c39346-4b2f-400e-ba41-1fe4772ef223"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson explains why a detector that is 95% accurate still produces mostly false alarms, and then says the framework mandates two architectural remedies. Which are they? Select every correct answer."
    options:
      - id: opt-a
        text: "Multi-signal Bayesian fusion, so an alarm needs co-occurring anomalies across uncorrelated vectors"
      - id: opt-b
        text: "CUSUM persistence windows, so a threshold must be violated for several consecutive sampling periods"
      - id: opt-c
        text: "Raising the alert threshold until the false discovery rate falls below one percent"
      - id: opt-d
        text: "Routing every single-metric breach straight to the executive sponsor, so that nothing at all is missed"
    correctOptionIds: [opt-a, opt-b]
    explanation: "Because critical failures have a low base rate prevalence, single-metric threshold triggers produce a 72% false alarm rate, so the framework mandates multi-signal Bayesian fusion and CUSUM persistence windows. Raising the threshold alone would only hide real failures, and routing every breach upward is the behaviour that causes the fatigue in the first place."
  - id: "1d5800a0-eeae-4ac7-8a25-2806fd864aad"
    revision: 1
    status: active
    type: single-choice
    prompt: "The detector has a true positive rate of 0.95 and a false positive rate of 0.05, and critical failures occur in only 2% of sprints. What positive predictive value does the lesson calculate?"
    options:
      - id: opt-a
        text: "About 95%, because the detector is accurate enough that an alarm it raises can be trusted almost completely"
      - id: ppv
        text: "About 27.9%, so roughly 72% of alarms are false"
      - id: opt-b
        text: "About 50%, because the false positive rate and the true positive rate sit symmetrically around the base rate of critical failures"
      - id: opt-c
        text: "About 2%, because the base rate of critical failures caps the value of any alarm the detector is able to raise"
    correctOptionIds: [ppv]
    explanation: "PPV = (0.95 x 0.02) / ((0.95 x 0.02) + (0.05 x 0.98)) = 0.0190 / 0.0680 = 27.9%, so the false discovery rate is 72.06%. The detector is accurate and the alarms are still mostly wrong, because the base rate of genuine failure is 2%."
  - id: "f528c62d-411e-466a-9c01-1ef923d63dcf"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson applies Madeleine Clare Elish's Moral Crumple Zone to project governance and names two symmetric moral hazards. What are they?"
    options:
      - id: opt-a
        text: "The Algorithmic Shield and the Automated Sycophancy, where a model that agrees with everyone is mistaken for a model that is right"
      - id: opt-b
        text: "The Scapegoat Manager and the Flight Director, who together divide the authority to act from the responsibility for the outcome"
      - id: hazards
        text: "The Algorithmic Shield and the Scapegoat Manager"
      - id: opt-c
        text: "The Watermelon Project and the Post-Mortem Amnesia, where a green status report and a forgotten failure both hide the same truth"
    correctOptionIds: [hazards]
    explanation: "The Algorithmic Shield is the project manager who rubber-stamps an AI recommendation to avoid blame, and the Scapegoat Manager is the manager forced to supervise a black-box autonomous pipeline without the telemetry or veto authority to stop it. The lesson answers both by making accountability strictly non-delegable."
  - id: "cb72e7df-20ef-41cd-91cc-72d34035d1d4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are the three ethical guardrails the lesson gives for Step N, Navigate Ethics? Select every correct answer."
    options:
      - id: opt-a
        text: "Audit synthetic vendor evaluations against empirical benchmark matrices with blinded brand names"
      - id: opt-b
        text: "Use Zero-Data-Retention APIs, local VPC inference endpoints and automated PII scrubbing before prompt assembly"
      - id: opt-c
        text: "Require a Flight Director Sign-Off Gate so that only authenticated human leaders commit capital or pull triggers"
      - id: opt-d
        text: "Let the model approve its own recommendations, so that the whole decision trail stays inside one system of record"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "The three guardrails are algorithmic bias and vendor discrimination, intellectual property and private RAG leakage, and non-delegable human accountability. Letting the model approve its own recommendations would build the Algorithmic Shield into the system rather than prevent it."
  - id: "6f62ea8a-32cf-45d3-8a21-03bab1282295"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's telemetry run reports PR dwell at 54.5 hours, CI/CD build failure rate at 18.0%, WIP saturation at 1.45 tasks per engineer, HSM P99 latency at 142.0 ms and DB replication lag at 310.0 ms. Which playbooks trigger?"
    options:
      - id: opt-a
        text: "Only CP-04, because PR dwell is the one metric the framework treats as a leading signal of every other failure mode"
      - id: opt-b
        text: "CP-01, CP-02 and CP-04, because HSM latency, replication lag and dwell time all breach their thresholds in the same sampling window"
      - id: opt-c
        text: "None of them, because the anomaly engine reports breaches for information only and every drawdown still needs a separate board vote"
      - id: triggers
        text: "CP-02 on replication lag over 250 ms, and CP-04 on dwell over 48 hours"
    correctOptionIds: [triggers]
    explanation: "The run reports exactly two breaches: db_replication_lag_ms at 310.0 against a 250.0 threshold, and pr_dwell_hours at 54.5 against a 48.0 threshold. HSM P99 latency at 142.0 ms stays under the 180.0 threshold of CP-01 and the CI failure rate of 18.0% stays under the 30% threshold of CP-03."
  - id: "c7b075f8-6fe2-4832-b2f8-01f032f2132b"
    revision: 1
    status: active
    type: single-choice
    prompt: "What happens when the engine attempts a contingency drawdown without an authenticated human identity and an authorised executive role?"
    options:
      - id: blocked
        text: "The call is blocked and a verified human must sign off"
      - id: opt-a
        text: "The drawdown is queued and executed once the next scheduled reporting cycle has produced an executive summary for review"
      - id: opt-b
        text: "The drawdown is allowed but capped at the smallest pre-authorised amount until a human confirms it at the next governance meeting"
      - id: opt-c
        text: "The engine escalates the request to the executive sponsor on its own authority, because the model is the party that detected the breach"
    correctOptionIds: [blocked]
    explanation: "The governance guardrail rejects the autonomous drawdown outright, because a verified human identity and role must sign off. In the worked run the automated attempt was blocked, and only after Dr. E. Vance approved $48,000 and J. Miller approved $18,000 did the ledger move from $175,000 to $109,000 of remaining contingency."
  - id: "5f9a5388-18cb-4deb-8d76-738a40ebeb49"
    revision: 1
    status: active
    type: true-false
    prompt: "The Step A reporting engine sends the C-suite and the engineering leads the same briefing content, so that both tiers read one version of the truth."
    answer: false
    explanation: "One-size-fits-none communication is the third structural flaw of manual reporting, and Step A answers it with three separate tiers. The C-Suite brief carries the baseline, capital and EVM forecast, the Engineering brief carries PR dwell, CI failure rate, WIP saturation and the triggered runbooks, and the Financial brief carries the EVM variance analysis and the drawdown ledger."
  - id: "c1a979c0-a2e9-43a8-808f-bc4320fd5437"
    revision: 1
    status: active
    type: free-recall
    prompt: "Contrast the contingency reserve with the management reserve in the lesson's worked capital structure, and give the dollar figures from the run."
    sampleAnswer: "The contingency reserve covers known-unknowns: specific identified risks such as HSM latency, vendor SLA breach or integration refactor. It is sized from EMV or the P80 differential, it sits inside the cost baseline, it is owned by the project manager, and drawdowns are logged against specific risk IDs. The management reserve covers unknown-unknowns such as regulatory overhauls or natural disasters, it is sized parametrically by the executive sponsor, it sits outside the cost baseline and it needs a formal charter or contract amendment. In the run, $1,250,000 of work packages plus a $175,000 contingency reserve gives a $1,425,000 cost baseline, and adding a $125,000 management reserve gives a total project budget of $1,550,000."
    explanation: "A strong answer separates the two reserves on nature, owner, baseline position and sizing method, and then reconciles the figures into the $1,550,000 total budget, so the reader can see that management reserve is deliberately outside the baseline EVM measures against."
  - id: "49896c3c-7c44-412f-b9fd-7cb6ad80bd23"
    revision: 1
    status: active
    type: free-recall
    prompt: "What is the Automated Sycophancy and Hallucinated Safety Trap, and how does the lesson say to neutralise it?"
    sampleAnswer: "Commercial large language models are aligned through reinforcement learning from human feedback to be agreeable and optimistic, so an executive asking whether a compressed testing plan can still land the cutover by October 1st receives an encouraging answer full of invented recovery scenarios and understated tail risk. The lesson neutralises it with adversarial red-team system instructions: the model is told to act as an adversarial risk auditor whose sole objective is to identify fatal architectural flaws, hidden dependency bottlenecks and unrealistic schedule assumptions, with no encouragement and mathematical rigour about the highest-probability failure modes."
    explanation: "A strong answer explains why an aligned model fails in a risk room, quotes the shape of the adversarial system instruction, and connects it to the wider point that the AI synthesises while the human decides."
```

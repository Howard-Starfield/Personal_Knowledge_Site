---
id: "19d21c06-0a12-4165-8229-1a3ec49d7fdc"
title: "The AI RISK PLAN Framework: Data Analysis & Threat Identification: Question Bank"
description: "Practises multi-stratum data ingestion, CPM float analysis, adversarial red-team personas, vector deduplication and the Critical Path Vulnerability Index."
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

These questions practise [[courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/01-ai-risk-plan-identification-analysis|The AI RISK PLAN Framework: Data Analysis & Threat Identification]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "b0f2aee6-d6a4-4956-a661-b52f7745769e"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's core-drilling analogy sorts project data into four strata. Which stratum carries the Master Service Agreements, Statements of Work and cross-vendor financial penalty milestones?"
    options:
      - id: opt-a
        text: "Stratum 1, the topsoil and fill, because contracts are drafted first and circulated at kickoff before any technical work begins"
      - id: opt-b
        text: "Stratum 2, the alluvial silt and water table, because the agreements are negotiated alongside the workflow and the ticket backlog"
      - id: bedrock
        text: "Stratum 4, the crystalline bedrock and seismic faults"
      - id: opt-c
        text: "Stratum 3, the sedimentary rock and limestone, because the WBS and the interface contracts are what the agreements formally govern"
    correctOptionIds: [bedrock]
    explanation: "Stratum 4 is the contractual and institutional layer: MSAs, SOWs, cross-vendor financial penalty milestones and the post-mortems of failed projects over the preceding decade. Stratum 1 is the optimistic kickoff charter, Stratum 2 the operational workflow layer, and Stratum 3 the technical architecture layer."
  - id: "1aea3873-309c-4cc9-9761-343c486d185e"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson warns about the Correlation vs Causation Blindspot, illustrated by the claim that delivery delays rise 34% when daily standup duration grows by 15 minutes. What does it say naive managers do about it?"
    options:
      - id: symptom
        text: "They attack the symptom, capping standups at 10 minutes"
      - id: opt-a
        text: "They invert the finding and instruct engineers to hold every discussion offline, so that the measured 34% disappears from the dashboard"
      - id: opt-b
        text: "They dismiss the telemetry entirely as noise, since a correlation between a meeting length and a delay cannot be measured to a useful precision"
      - id: opt-c
        text: "They escalate the correlation to leadership as a confirmed root cause, so that the delay can be funded and the standup budget protected"
    correctOptionIds: [symptom]
    explanation: "Naive managers attack the symptom: they mandate 10-minute standup caps or instruct engineers to take long discussions offline. The lesson's counter-example is two senior engineers debating on a ticket for four days, whose root cause is an uncoordinated API contract rather than the communication tool, so the pipeline must follow causal graphs to root vulnerabilities instead of alarming on superficial behavioural indicators."
  - id: "f829541f-00b6-4ad1-b5f9-64dce60f0708"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked schedule, T-02 HSM Procurement carries 7.2 days of total float while T-04 Host Adapter Bridge carries 26.0 days. What does that float tell the risk team?"
    options:
      - id: opt-a
        text: "Both tasks can absorb an unlimited delay, because total float is a property of the schedule rather than of the activity it is measured on"
      - id: opt-b
        text: "T-02 and T-04 must be treated as critical paths in their own right, because a float buffer is only released once the project has already started"
      - id: opt-c
        text: "The float is a scheduling convenience with no risk meaning, since the lesson ranks every threat purely by its expected monetary value"
      - id: float
        text: "A threat on either task is buffered; risk on a zero-float node needs immediate intervention"
    correctOptionIds: [float]
    explanation: "Total float is the slack an activity can absorb before the project finish date moves. A threat on T-02 or T-04 is therefore buffered, while a threat on T-01, T-03, T-05, T-06 or T-07, where total float is zero, requires immediate intervention, which is exactly the distinction the Critical Path Vulnerability Index makes quantitative."
  - id: "344d7098-3763-4b20-92bb-eab1a23f6552"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson place in the semi-structured telemetry category? Select every correct answer."
    options:
      - id: opt-a
        text: "Ticket state transitions, such as Jira cycle time and pull request review queue dwell time"
      - id: opt-b
        text: "Code repository commit distribution, branch divergence and automated integration test failure frequencies"
      - id: opt-c
        text: "Hardware component bill of materials with international shipping tracking numbers"
      - id: opt-d
        text: "The resource allocation matrix and loaded labour rates used to cost the work packages"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "Semi-structured telemetry covers the operational rhythm and engineering cadence: ticket state transitions, repository commit distribution and branch divergence, integration test failure frequencies, and the bill of materials with shipping tracking numbers. Resource allocation matrices and loaded labour rates are structured telemetry, not semi-structured."
  - id: "0b5a2217-18e0-46aa-8ae2-912763192927"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's worked engine reports a Critical Path Vulnerability Index of 62.8%. What does that figure say about the project's exposure?"
    options:
      - id: opt-a
        text: "That 62.8% of the risks on the register are critical, which is a larger share than the 50% threshold the lesson calls dangerous"
      - id: cpvi
        text: "That 62.8% of the total EMV sits on zero-float tasks"
      - id: opt-b
        text: "That 62.8% of the schedule horizon is exposed to delay, so the contingency reserve should be sized at that share of the budget"
      - id: opt-c
        text: "That the register is 62.8% complete on its risk analysis, because the index also tracks how far the red-team engine has progressed"
    correctOptionIds: [cpvi]
    explanation: "CPVI divides the EMV of clusters hitting zero-float activities by the EMV of all clusters, so 62.8% means $303,500 of the $483,500 total synthetic exposure is concentrated on the critical path. CLUS-01 at $123,000 targets T-02, which is protected by 7.2 days of float, while CLUS-02 at $182,000 and CLUS-04 at $84,000 hit T-03 and T-06 directly."
  - id: "5ac53f14-3a41-4709-8a49-bf9d00826f83"
    revision: 1
    status: active
    type: single-choice
    prompt: "Threat factors are clustered into canonical risk clusters by pairwise cosine similarity against a threshold tau. Which thresholds does the lesson give?"
    options:
      - id: opt-a
        text: "A single fixed threshold of 0.50 for every model, so that clustering behaves identically on sparse n-gram and dense embeddings alike"
      - id: opt-b
        text: "Tau = 0.90 for sparse n-gram models and tau = 0.10 for dense transformers, because dense vectors spread their mass further out"
      - id: tau
        text: "Tau = 0.18 for sparse n-gram models and tau = 0.75 for dense transformers"
      - id: opt-c
        text: "Tau = 0.75 for sparse n-gram models and tau = 0.18 for dense transformers, because the two thresholds are simply swapped"
    correctOptionIds: [tau]
    explanation: "The threshold is empirically tuned to the embedding family: 0.18 for sparse n-gram models and 0.75 for dense transformers. Factors sharing a risk category whose similarity clears tau are clustered into one canonical risk factor, their EMVs reconciled and their impacted task nodes unioned."
  - id: "45a6aa09-77e9-442b-8b5e-ee4c51be4b0a"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's four adversarial personas each attack the project from a different direction. Which persona looks at geopolitical export restrictions such as ITAR and EAR?"
    options:
      - id: procurement
        text: "The Forensic Procurement Officer, who reads the international supply chain"
      - id: opt-a
        text: "The Adversarial Subcontractor, because finding SOW ambiguities is the fastest way to expose export-control exposure"
      - id: opt-b
        text: "The Hostile Regulatory Compliance Auditor, whose audit frameworks include export rules as well as encryption boundaries"
      - id: opt-c
        text: "The Cynical Site Reliability Engineer, who assumes every third-party API will breach its latency SLA under peak load"
    correctOptionIds: [procurement]
    explanation: "The Forensic Procurement Officer analyses international supply chains, foundry backlogs, geopolitical export restrictions such as ITAR and EAR, and single-source hardware dependencies. The Subcontractor hunts SOW ambiguity, the Auditor works to PCI-DSS 4.0, SOC-2 Type II, HIPAA and ISO 27001, and the SRE tests the operational architecture under load."
  - id: "a8b85ff0-054e-446e-8637-a13a8c1dcbce"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson bounds AI threat identification against the AI Hallucination and Scope Creep Trap. Which of these does it require? Select every correct answer."
    options:
      - id: opt-a
        text: "Prompts grounded in explicit, parsed WBS activities and contractual deliverables"
      - id: opt-b
        text: "Evidentiary citations from the ingested documents, such as a section reference in the vendor MSA"
      - id: opt-c
        text: "Rejection of any generated risk that lacks a verifiable mapping to a task node ID in the project DAG"
      - id: opt-d
        text: "A fixed ceiling of 400 risks per register, so that the list stays short enough for leadership to read"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "The three bounds are grounding, citation and task-node mapping. The 400-item register is the failure the bounds exist to prevent, with asteroid strikes on AWS data centres and the nationalisation of cloud providers as the kind of hallucinated hazard that fills it, so a numerical cap is not the answer."
  - id: "09b82e91-c8b6-43c2-9358-dade4ab8bdf1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson computes the Shannon entropy of a task's discretised duration distribution. What does it say the entropy is for a fully deterministic task, such as standard off-the-shelf server racking with zero variance?"
    options:
      - id: opt-a
        text: "H = log2 K, because a zero-variance task still has to be allocated to one of the K duration bins before it can be reported"
      - id: entropy
        text: "H = 0 bits, because all the probability mass sits in one bin"
      - id: opt-b
        text: "H = 1 bit, because a deterministic task still has one binary choice between finishing on time and finishing late"
      - id: opt-c
        text: "H cannot be computed, because the lesson reserves entropy for tasks that are already modelled as a Beta-PERT distribution"
    correctOptionIds: [entropy]
    explanation: "A fully deterministic task puts all its mass in one bin, P(x1) = 1.0, so H(X) = 0 bits. A high-entropy task spread flat across a wide horizon reaches H_max(X) = log2 K, and when such a task also sits on the critical path it is an acute schedule risk that Stage A and Stage I exist to isolate."
  - id: "719ee75b-f519-42b3-80b5-b3f6ac96bfeb"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson's worked engine collapses the seven raw synthetic threats generated by its distinct personas into five canonical risk clusters, and the register is then triaged cluster by cluster."
    answer: true
    explanation: "Semantic vector deduplication merges the redundant personas before triage. In CLUS-01 the SRE's warning about supply chain rationing and the Procurement Officer's warning about customs delays were correctly merged into $123,000 of aggregate exposure, and in CLUS-02 two lock contention vectors became one critical threat worth $182,000."
  - id: "345df5f5-312e-4c43-9ed8-529e67c6493b"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson says vector cosine deduplication prevents register bloat. Explain how, using the seven-threats-to-five-clusters result from the worked engine."
    sampleAnswer: "Independent personas describe the same failure mode in different words, so without deduplication each new agent adds a fresh-looking entry and the register stops being reviewable. The engine compares pairwise cosine similarity between embedded threat factors and clusters those that clear the threshold tau, merging semantically redundant risks into one canonical factor whose EMVs are reconciled and whose impacted task nodes are unioned. Seven raw threats became five canonical clusters: the SRE's supply chain warning and the Procurement Officer's customs warning merged into CLUS-01 at $123,000, and two lock contention vectors merged into CLUS-02 at $182,000."
    explanation: "A strong answer explains the mechanism (pairwise cosine projections above tau) and then evidences it with the two merges the lesson names, rather than restating that deduplication is a good idea."
  - id: "41a300fa-ba94-4436-8b6d-358082208535"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the Correlation vs Causation Blindspot the lesson warns about, and what it says an AI telemetry pipeline should do instead of reacting to a surfaced correlation."
    sampleAnswer: "The lesson's examples are a dashboard claiming that delivery delays rise 34% when daily standup duration grows by 15 minutes, and tickets with more than 12 comments carrying an 80% defect rate. Naive managers attack the symptom with 10-minute standup caps or by moving long discussions offline, which removes the measurement without touching the cause. Long standups and verbose Jira discussions are lagging expressions of deep architectural ambiguity or unstated contractual conflict, so the pipeline must follow causal graphs to root vulnerabilities instead of alarming on superficial behavioural indicators."
    explanation: "A strong answer names the two correlations the lesson uses, shows why the naive reaction is wrong by giving the uncoordinated API contract as the real root cause, and ends on the pipeline's duty to trace causal graphs rather than surface behavioural correlations."
```

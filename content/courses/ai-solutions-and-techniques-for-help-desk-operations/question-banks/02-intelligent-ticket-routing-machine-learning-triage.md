---
id: "34e441b7-32d5-4c6a-ae6b-1f65e095ab09"
title: "Intelligent Ticket Triage: Multi-Class ML Routing, Load Balancing & Predictive SLA Gates: Question Bank"
description: "Practice questions for the intelligent ticket triage lesson, covering class imbalance, the hybrid feature vector, the cost-sensitive loss, the priority engine and constrained dispatch."
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

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/02-intelligent-ticket-routing-machine-learning-triage|Intelligent Ticket Triage: Multi-Class ML Routing, Load Balancing & Predictive SLA Gates]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "47211078-1c3a-4d06-9034-03ee4c18d39a"
    revision: 1
    status: active
    type: single-choice
    prompt: "A classifier predicts Password Reset for every ticket in the identity queue and still scores 85% overall accuracy, while missing every catastrophic database deadlock and security breach in the set. What does the lesson say to do instead?"
    options:
      - id: acc-meaningless
        text: "Treat overall accuracy as meaningless, and optimise macro F1-score and cost-weighted risk instead"
      - id: acc-sufficient
        text: "Treat overall accuracy as sufficient, because the majority of tickets are routine password resets"
      - id: acc-dashboard
        text: "Report overall accuracy on every dashboard, alongside the 0.82 dispatch confidence threshold"
      - id: acc-rare
        text: "Only weigh overall accuracy for categories that make up less than 1% of inbound ticket volume"
    correctOptionIds: [acc-meaningless]
    explanation: "The lesson calls overall accuracy a meaningless and dangerous metric in ITSM, because the category distribution is so long-tailed that always answering Password Reset looks excellent on the headline metric while the errors land on the outages that matter. It says to optimise for class-balanced macro F1-score and cost-weighted risk, and it backs that with Focal Loss and a cost-sensitive matrix rather than with any accuracy threshold. The other options all treat accuracy as a number worth chasing."
  - id: "6f8a491f-4492-4f74-a7b5-e1f01a3a06e1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's feature pipeline concatenates a dense transformer embedding, a sparse TF-IDF vector and a block of normalised metadata features. How wide is the resulting vector z?"
    options:
      - id: dim-768
        text: "768 dimensions, taken from the dense transformer encoder output alone"
      - id: dim-1056
        text: "1,056 dimensions, because the sparse TF-IDF vector is projected down before concatenation"
      - id: dim-1824
        text: "1,824 dimensions, from 768 dense plus 1,024 sparse plus 32 metadata"
      - id: dim-2048
        text: "2,048 dimensions, because each of the five categories contributes its own embedding slice"
    correctOptionIds: [dim-1824]
    explanation: "The pipeline is three branches wide: e_dense at 768 dimensions from the dense transformer encoder, x_sparse at 1,024 dimensions from the TF-IDF and subword branch, and m_meta at 32 dimensions from normalised numerical features. Concatenating them gives z at 1,824 dimensions, which is the vector the classifier head actually consumes. Taking the dense branch alone drops the exact-match signal, and the other two figures do not correspond to any branch combination the lesson describes."
  - id: "9ac83624-e7ad-4d51-9df4-d1fe21ed47b2"
    revision: 1
    status: active
    type: single-choice
    prompt: "With Focal Loss at the lesson's focusing parameter, what happens to a sample the model already classifies with p_t = 0.95?"
    options:
      - id: focal-same
        text: "Nothing changes, because focal loss reweights the loss term rather than the gradient"
      - id: focal-400
        text: "Its gradient impact falls by a factor of 400, because (1 - 0.95) squared is 0.0025"
      - id: focal-rise
        text: "Its gradient impact rises by a factor of 400, because rare examples dominate the loss surface"
      - id: focal-drop
        text: "The sample is dropped from the batch entirely, because easy examples carry no signal at all"
    correctOptionIds: [focal-400]
    explanation: "Focal Loss multiplies the standard cross-entropy by the modulating factor (1 - p_t) raised to gamma. At gamma = 2.0, a sample with p_t = 0.95 gets a factor of (1 - 0.95) squared, which is 0.0025, so its gradient impact is cut by a factor of 400 and the training signal moves onto the hard, rare examples. The factor always reduces the weight of an easy example rather than raising it, and nothing is discarded from the batch."
  - id: "ffcc0328-5c0c-4e38-9d1a-4880b3101808"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson set the two ends of its cost-sensitive misclassification matrix?"
    options:
      - id: cm-equal
        text: "Both directions are weighted equally, because a missed password reset costs as much as a missed outage"
      - id: cm-one
        text: "C_P1,P4 = 1 and C_P4,P1 = 1, so the matrix simply balances the two severity classes"
      - id: cm-100
        text: "C_P1,P4 = 100 and C_P4,P1 = 10, which keeps the reweighting within one order of magnitude"
      - id: cm-1000
        text: "C_P1,P4 = 1000 and C_P4,P1 = 1, so the model errs toward caution on severe incidents"
    correctOptionIds: [cm-1000]
    explanation: "The lesson sets C_P1,P4 = 1000 and C_P4,P1 = 1, so calling a P1 outage a P4 password reset costs a thousand times more than the reverse mistake. That asymmetry forces the optimisation landscape to err on the side of caution for high-severity incidents, which is the whole point of the matrix: a senior engineer can quickly reassign an over-escalated password reset, but nothing absorbs a prolonged production outage."
  - id: "01160eb4-bcd1-4948-b4cd-92b97a491f7d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What confidence threshold does the lesson set for gated automated dispatch, and what happens below it?"
    options:
      - id: gate-095
        text: "0.95, because the classifier must be near certain before a ticket may leave the human pool"
      - id: gate-050
        text: "0.50, which keeps the dispatch queue full without overloading the senior reviewers"
      - id: gate-082
        text: "0.82, with anything below it routed to a senior review bucket with top-3 suggestions"
      - id: gate-none
        text: "There is no confidence gate, because the skill and capacity constraints already prevent misrouting"
    correctOptionIds: [gate-082]
    explanation: "The pipeline is instantiated with confidence_threshold = 0.82, and the deployment checklist repeats it as tau_auto at or above 0.82, with predictions below 0.82 routed to a Senior Human Review Bucket carrying top-3 suggestions. A prediction only leaves the human pool when the classifier clears that gate. The skill and capacity constraints in the dispatcher govern which technician takes a ticket once it has been classified, so they cannot replace the classification gate itself."
  - id: "e848bc08-9f8f-47e5-a67e-d7d62d24e4e1"
    revision: 1
    status: active
    type: single-choice
    prompt: "What minimum skill score must a technician hold before the dispatcher will hand them a P1 or P2 ticket?"
    options:
      - id: skill-070
        text: "0.70, against 0.40 for P3 and P4 tickets"
      - id: skill-095
        text: "0.95, because a P1 or P2 ticket must match the technician's skill score almost exactly"
      - id: skill-040
        text: "0.40 for every priority, because capacity is the only constraint that should shape dispatch"
      - id: skill-000
        text: "0.00, because the complexity weight alone decides whether a technician is eligible"
    correctOptionIds: [skill-070]
    explanation: "The dispatcher's first constraint sets required_skill at 0.70 for P1_CRITICAL and P2_HIGH tickets, and at 0.40 for P3_MEDIUM and P4_LOW ones, so the more severe the ticket the more of the category a technician must actually know. Any technician below the bar is skipped before capacity or load is considered. The other figures either ignore the severity split or invert it."
  - id: "2ac34bec-b864-4c3e-bb58-32c70b8d90b3"
    revision: 1
    status: active
    type: single-choice
    prompt: "Sample ticket INC-50292 is a routine Okta password and MFA reset from a non-VIP on a workstation, with a 240-minute SLA target and a queue depth of 2. Which technician does the pipeline dispatch it to?"
    options:
      - id: disp-sarah
        text: "Sarah Chen (Sr DBA), because she carries the lowest active load of the three technicians"
      - id: disp-elena
        text: "Elena Rostova (Helpdesk Tier-1), because her projected load of 5.0 is the lowest"
      - id: disp-marcus
        text: "Marcus Vance (SecOps/IAM), because he holds the highest skill score for the identity queue"
      - id: disp-none
        text: "Nobody, because the routine reset scores below the 0.82 dispatch threshold and needs a human"
    correctOptionIds: [disp-elena]
    explanation: "The ticket classifies as Identity_Access_Management with near-certain confidence, so it clears the 0.82 gate, and it lands in P4_LOW, so the required skill is 0.40. Sarah Chen has no identity skill at all and is skipped; Marcus Vance matches on skill with 0.95 but his projected load is 8.0 plus the 1.0 complexity weight, which is 9.0; Elena Rostova matches with 0.80 and her projected load is 4.0 plus 1.0, which is 5.0. The dispatcher minimises projected utilisation, so Elena wins. The lesson's point is that skill is a filter and load is the objective."
  - id: "bbfc4c34-4ff8-408f-a6a1-72561b542fdf"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these rows does the lesson's category volume table describe correctly? Select every correct answer."
    options:
      - id: vol-identity
        text: "Password / Identity Resets at 48.5% of volume, with low P4 severity"
      - id: vol-erp
        text: "ERP / Database Outages at 1.2% of volume, with critical P1 severity"
      - id: vol-security
        text: "Security Breach / Ransomware at 0.1% of volume, with catastrophic P1 severity"
      - id: vol-network
        text: "Network Connectivity at 40% of volume, with P2 severity"
    correctOptionIds: [vol-identity, vol-erp, vol-security]
    explanation: "The table gives Password / Identity Resets 48.5%, Software License Requests 22.0%, Hardware / Peripheral Setup 14.2%, Network Connectivity 9.1%, ERP / Database Outages 1.2% and Security Breach / Ransomware 0.1%, with severity rising as volume falls. Network Connectivity is 9.1% and sits at medium or high P3 and P2 severity, so the 40% figure is wrong. The shape of the table is the argument for cost-sensitive training: the rarest rows carry the worst outcomes."
  - id: "789385d9-a74a-443b-94e6-ca467b823259"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are triage anti-patterns the lesson names, paired with the mitigation it gives for each? Select every correct answer."
    options:
      - id: anti-label
        text: "The self-fulfilling label feedback loop, mitigated by a random 2% golden evaluation holdout"
      - id: anti-pingpong
        text: "The reassignment ping-pong, mitigated by stripping automated routing after more than two reassignments"
      - id: anti-vocab
        text: "Category vocabulary evolution, mitigated by streaming vocabulary entropy monitoring at ΔD_KL of 0.15 or more"
      - id: anti-delete
        text: "The ticket ping-pong, mitigated by deleting the ticket from the system once it reaches three hops"
    correctOptionIds: [anti-label, anti-pingpong, anti-vocab]
    explanation: "The lesson's three anti-patterns are the self-fulfilling label loop, where Tier-1 scripts poison the training data and a 2% golden holdout is audited by senior staff; the reassignment ping-pong, where a ticket that moves more than twice loses its automated routing and is pinned to the senior queue; and category vocabulary evolution, where new terms such as Kubernetes are absent from an 18-month-old corpus and entropy monitoring fires at ΔD_KL of 0.15 or more. Deleting tickets is not a mitigation the lesson proposes, and the anti-pattern is not called the ticket ping-pong."
  - id: "9e7644e0-0cc2-4ba4-ba92-b5a7e5ab8cef"
    revision: 1
    status: active
    type: true-false
    prompt: "A triage model that classifies 85% of tickets correctly has proved that it is fit to route tickets automatically."
    answer: false
    explanation: "The claim is false, and the lesson's accuracy paradox is the proof. A classifier that always answers Password Reset reaches 85% overall accuracy on the real ticket distribution and still fails to detect 100% of catastrophic database deadlocks and security breaches, because those categories are 1.2% and 0.1% of volume. Accuracy therefore says nothing about the cases that decide whether an outage becomes a business incident, which is why the lesson insists on macro F1-score, cost-weighted risk and a gated dispatch threshold."
  - id: "3bc18a43-44a4-4509-8893-d5fd1ac01054"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work out the priority score and the predicted resolution time for sample ticket INC-50291, and say who the pipeline dispatches it to."
    sampleAnswer: "INC-50291 affects the payment_gateway, which the engine treats as a high impact service, so the technical impact score is 95; the text carries the keyword Urgent, so business urgency is 65; the requester is a VIP, so the VIP tier score is 100; and none of the five frustration terms appear, so distress is 20. The composite is 0.40 x 95 plus 0.30 x 65 plus 0.15 x 100 plus 0.15 x 20, which is 38 plus 19.5 plus 15 plus 3, or 75.5, landing in P2_HIGH. The category is Database_Reliability, whose baseline is 120 minutes, so at the P2 multiplier of 0.8 with a queue depth of 1 adding 8.5 minutes the predicted resolution time is 104.5 minutes, above the 60-minute SLA target, which raises the SLA breach warning. The only technician whose Database_Reliability skill clears the 0.70 needed for a P2 ticket is Sarah Chen (Sr DBA), whose projected load after taking the 5.0-point ticket is 17.0 against a capacity of 30.0."
    explanation: "A strong answer shows each of the four component scores, the weighted sum and the tier it produces, then the separate resolution-time calculation with its baseline, multiplier and queue delay, and finally the dispatch decision with the skill threshold that eliminated the other two technicians. It should notice that the predicted 104.5 minutes against a 60-minute target is what makes the SLA gate fire."
  - id: "594de966-d775-4238-88da-f81fb6e7d136"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the lesson rejects overall classification accuracy as a triage metric, and say what it tells you to optimise instead."
    sampleAnswer: "Enterprise ticket distributions are extremely long-tailed: Password / Identity Resets are 48.5% of volume and Software License Requests another 22.0%, while ERP / Database Outages are 1.2% and Security Breach / Ransomware only 0.1%. A naive classifier that always answers Password Reset therefore reaches 85% overall accuracy while detecting none of the catastrophic database deadlocks or security breaches, so accuracy is a meaningless and dangerous metric in ITSM. The lesson says to optimise for class-balanced macro F1-score and cost-weighted risk, and to get there by training with Focal Loss at gamma = 2.0, which cuts the gradient impact of an easy p_t = 0.95 sample by a factor of 400, and by adding a cost-sensitive matrix with C_P1,P4 = 1000 against C_P4,P1 = 1 so the model errs toward caution on severe incidents."
    explanation: "A strong answer quotes the skewed distribution, shows how the majority class can carry the headline metric while the rare classes are missed entirely, and names both remedies the lesson proposes. It should also connect the cost matrix to the asymmetry of the consequences: an over-escalated password reset costs a senior engineer a minute, while a missed outage costs a production outage."
```

---
id: "71b100dd-2325-44ad-a362-8ee555af1ffc"
title: "Proactive Support Systems: Edge Telemetry Anomaly Detection, Digital Twins & Self-Healing Remediation: Question Bank"
description: "Practice questions for the proactive support lesson, covering streaming anomaly detection, Isolation Forest and LOF, the circuit breaker pattern and the workforce productivity business case."
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

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/06-proactive-support-anomaly-detection-automated-workflows|Proactive Support Systems: Edge Telemetry Anomaly Detection, Digital Twins & Self-Healing Remediation]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "4f2f31e7-2fd3-499d-be80-695d10f1b0fb"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's anomaly engine runs two detection paths side by side. Why does it need both?"
    options:
      - id: path-both
        text: "Because a single metric can look normal while the combination of metrics is structurally wrong"
      - id: path-speed
        text: "Because the univariate path alone is far too slow for a message bus carrying 100,000 events a second"
      - id: path-mv-slow
        text: "Because the multivariate path is too slow to run against a live Kafka stream"
      - id: path-choice
        text: "Because the lesson runs only one engine per fleet and chooses it by fleet size"
    correctOptionIds: [path-both]
    explanation: "Path A, the univariate streaming engine, watches continuous metrics such as CPU utilisation, physical memory saturation and disk queue depth using EMA and streaming Z-scores, and catches the ordinary threshold breaches. Path B, the multivariate unsupervised engine, evaluates multi-dimensional state vectors with Isolation Forests and Local Outlier Factors, and catches the failures that no single metric reveals, such as a print spooler deadlock that shows normal CPU at 15% and normal RAM at 250 MB while thread handles accumulate, filesystem I/O drops to zero and a local RPC queue grows. Both run in parallel; neither replaces the other."
  - id: "0e5c72d1-6bc5-4618-aefe-51ee691a14bf"
    revision: 1
    status: active
    type: single-choice
    prompt: "What anomaly threshold does the lesson set for the streaming Z-score, and what extra condition does it attach?"
    options:
      - id: z-200
        text: "2.0, which gives a tighter band that catches smaller deviations without flooding the service desk"
      - id: z-flat
        text: "3.0, but only if the mean and variance are held constant across the whole day"
      - id: z-diurnal
        text: "3.0, with the mean and variance kept across 24-hour diurnal buckets to avoid false alarms"
      - id: z-lof
        text: "1.65, which is the threshold the lesson reserves for the Local Outlier Factor path"
    correctOptionIds: [z-diurnal]
    explanation: "A threshold of 3.0 catches deviations beyond the 99.73% confidence band under Gaussian assumptions, but enterprise telemetry has pronounced diurnal shifts such as the 09:00 login rush, so the mean and variance must be maintained across 24-hour diurnal buckets to stop normal daily peaks from raising false positives. The 1.65 figure belongs to the Local Outlier Factor path and the 2.0 band is not the lesson's setting."
  - id: "8415aeec-6040-490e-a933-93b5da83b471"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Isolation Forest, what does a short path length tell you about a telemetry observation?"
    options:
      - id: iso-long
        text: "Long path lengths, because normal endpoints are structurally distinct from the bulk of the fleet"
      - id: iso-short
        text: "Short path lengths, because anomalies are isolated close to the root of the isolation tree"
      - id: iso-zero
        text: "Zero path lengths, because anomalies cannot be separated from the training distribution"
      - id: iso-uniform
        text: "Uniform path lengths, because random axis splits distribute every point evenly across the trees"
    correctOptionIds: [iso-short]
    explanation: "Isolation Forests isolate anomalies by recursively partitioning feature space with random orthogonal axis splits, and because anomalies are few and structurally distinct they are isolated close to the root of the tree, so their path lengths are substantially shorter than those of normal points. The lesson's interpretation rule is that a normalised path length s below 0.5 means the endpoint is structurally abnormal. A long path is what a normal, well-behaved endpoint produces."
  - id: "723d8133-1568-4d84-b124-edc93fcd43bb"
    revision: 1
    status: active
    type: single-choice
    prompt: "What Local Outlier Factor does the lesson treat as warranting automated triage, and what does it mean?"
    options:
      - id: lof-100
        text: "1.0, because a ratio of one is the arithmetic average density of a healthy peer group"
      - id: lof-low
        text: "0.85, because a denser cluster than the peer average is the safer condition"
      - id: lof-250
        text: "2.5, because any score above the peer group's average density should trigger an automated triage"
      - id: lof-165
        text: "1.65, because the endpoint has drifted into an isolated, degraded state relative to its peers"
    correctOptionIds: [lof-165]
    explanation: "The lesson reads LOF as a ratio of the average local reachability density of an endpoint's neighbours to its own, so a value of about 1.0 means the endpoint sits within its normal cluster and a value below 1.0 means it is in a denser, safer cluster than average. A value of 1.65 or more means the local density is significantly lower than its neighbours and the endpoint has drifted into an isolated, degraded state. LOF exists precisely because high CPU is normal for an engineer compiling code and anomalous for a sales agent."
  - id: "7cdaffc2-fb68-4a71-bf4f-73578531d2bb"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under the lesson's circuit breaker pattern, what triggers the breaker to trip to OPEN on a host?"
    options:
      - id: cb-three
        text: "Three executions in 15 minutes, after which a Tier-3 human incident is dispatched for that host"
      - id: cb-one
        text: "One failure, after which the breaker stays open until an engineer closes it by hand"
      - id: cb-thirty
        text: "Thirty executions in 15 minutes, after which the runbook is disabled across every host in the entire fleet"
      - id: cb-half
        text: "Three executions in 15 minutes, after which remediation on that host is blocked and Tier-3 is called"
    correctOptionIds: [cb-half]
    explanation: "The breaker trips to OPEN when a runbook executes 3 times on the same host inside a 15-minute sliding window without achieving permanent post-flight health, and the consequence is that all further automated remediation on that host is blocked immediately and an escalated Tier-3 human incident is dispatched with full crash diagnostics. The option that names the trigger without the consequence is incomplete, one failure is not enough, and the breaker is per host rather than fleet-wide."
  - id: "ec997e67-ca7c-4549-ab23-bddf275d4cad"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which four invariants does the lesson require of every enterprise self-healing runbook?"
    options:
      - id: inv-real
        text: "Strict idempotency, pre-flight validation, post-flight verification and audit trail logging"
      - id: inv-training
        text: "Strict idempotency, pre-flight validation, post-flight verification and scheduled staff training"
      - id: inv-budget
        text: "Strict idempotency, pre-flight validation, ticket creation and quarterly budget review"
      - id: inv-report
        text: "Strict idempotency, ticket creation, escalation timers and a weekly report on remediation counts"
    correctOptionIds: [inv-real]
    explanation: "The four non-negotiable operational invariants are strict idempotency, so running the runbook N times leaves the same end state as running it once; pre-flight validation, so preconditions are checked before any state is altered; post-flight verification, so the script confirms the system has returned to nominal health, for example by checking a restarted service answers health probes within 15 seconds; and audit trail logging, where every invocation writes a cryptographic, tamper-evident event carrying the target host, the anomaly signature, before and after process hashes and the return codes. The other options substitute programme-management tasks for safety properties."
  - id: "f1a70659-004b-4a19-b707-edb6657bb9f1"
    revision: 1
    status: active
    type: single-choice
    prompt: "What annual net productivity value does the lesson's worked incident model attribute to proactive self-healing?"
    options:
      - id: biz-1562
        text: "$1,562.50, which is the cost of the 90-second self-healing path for 500 users"
      - id: biz-1106
        text: "$1,106,250 a year, from 12 incidents at $92,187.50 of net saving each"
      - id: biz-93750
        text: "$93,750, which is what the 90-minute reactive path costs for the same 500 users"
      - id: biz-375
        text: "$375,000 a year, which assumes every one of the 12 incidents reaches the reactive path"
    correctOptionIds: [biz-1106]
    explanation: "At an employee cost of $125.00 an hour, the reactive 90-minute path costs $93,750 for 500 impacted users and the 90-second self-healing path costs $1,562.50, so the net saving is $92,187.50 per incident. Across an average of 12 major incidents a year that is $1,106,250, before counting reduced burnout, better SLA compliance and improved retention. The other figures are single components of that model rather than the annual total."
  - id: "fb81188c-a5df-407d-9e00-1c1425fc79b9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are requirements in the lesson's edge telemetry sensing and agent checklist? Select every correct answer."
    options:
      - id: edge-agents
        text: "eBPF socket probes and osquery daemons on fleet endpoints, capped at 1% CPU and 75MB RAM"
      - id: edge-intervals
        text: "Collection intervals of 10 seconds for high-frequency metrics and 60 seconds for full tables"
      - id: edge-mtls
        text: "Mutual TLS with pinned transport keys on every telemetry stream"
      - id: edge-retain
        text: "Full-disk retention of every metric so that any historical window can be reconstructed"
    correctOptionIds: [edge-agents, edge-intervals, edge-mtls]
    explanation: "The checklist asks for lightweight eBPF socket probes and osquery daemons on all fleet endpoints, with strict resource limits of at most 1% CPU and 75MB of RAM, collection intervals of 10 seconds for high-frequency metrics and 60 seconds for full tables, and mutual TLS with pinned transport keys on the telemetry stream. The fourth option is the opposite of the design: telemetry agents are deliberately kept lightweight, and the anomaly engine works from streaming statistics rather than from retained history."
  - id: "2e984849-a3b3-4088-bcda-783cc4ec697d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson attribute to its multivariate, unsupervised detection path? Select every correct answer."
    options:
      - id: mv-patha
        text: "Path A, univariate streaming, using EMA and streaming Z-scores on continuous metrics such as CPU"
      - id: mv-pathb
        text: "Path B, multivariate unsupervised, using Isolation Forests and Local Outlier Factors on vectors"
      - id: mv-pair
        text: "Isolation Forest for global structural outliers, and LOF for endpoints drifting from their peer group"
      - id: mv-supervised
        text: "A single supervised classifier trained on labelled incident history, preferred over both paths"
    correctOptionIds: [mv-patha, mv-pathb, mv-pair]
    explanation: "The engine is explicitly dual-path: Path A is the univariate streaming engine, and Path B is the multivariate unsupervised engine built on Isolation Forests and Local Outlier Factors. The pairing inside Path B is deliberate, because a global forest finds structural outliers while LOF finds endpoints that have drifted relative to their own functional cohort. The lesson does not recommend a supervised classifier, because labelled incident history is exactly what a support organisation lacks."
  - id: "1620a011-a749-483c-9b79-6cdb9b25d316"
    revision: 1
    status: active
    type: true-false
    prompt: "An automated runbook that restarts an application which crashes on startup because of an incompatible database schema can safely be left running."
    answer: false
    explanation: "The claim is false, and the lesson calls the danger remediation flapping. A blind restart runbook against that fault enters an infinite restart loop that exhausts process IDs, saturates disk logs with crash dumps and masks the true root cause. The defence is the stateful circuit breaker pattern, which trips to OPEN after 3 executions on the same host within a 15-minute window, blocks further automated remediation on that host and dispatches an escalated Tier-3 human incident."
  - id: "c0d55cec-95fb-4228-8db8-1016f824709c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain remediation flapping as the lesson describes it, and describe the three states of the circuit breaker that prevents it."
    sampleAnswer: "Remediation flapping is the catastrophic loop in which an automated script repeatedly tries to fix a system with a fundamental underlying flaw. The lesson's example is an application that crashes on startup because an upstream database schema was updated without backward compatibility: a blind restart runbook restarts it forever, exhausting process IDs, saturating disk logs with crash dumps and masking the true root cause. The defence is a stateful circuit breaker with three states. CLOSED is nominal operation, where runbooks execute freely on verified anomalies. OPEN is reached when a runbook executes 3 times on a specific host inside a 15-minute sliding window without achieving permanent post-flight health, after which all further automated remediation on that host is blocked immediately and an escalated Tier-3 human incident is dispatched with full crash diagnostics. HALF-OPEN permits a single trial remediation after a 30-minute cooldown; if it succeeds and health persists for 10 minutes the breaker resets to CLOSED, and if it fails it snaps straight back to OPEN. The four runbook invariants support this, since strict idempotency, pre-flight validation, post-flight verification within 15 seconds and tamper-evident audit logging all bound how far a bad remediation can travel."
    explanation: "A strong answer names the flapping mechanism and its cost, gives all three breaker states with their thresholds, the cooldown and the persistence window, and connects the breaker to the four runbook invariants. It should also make clear that the breaker is scoped to a host, so one bad application cannot open the automation across the rest of the fleet."
  - id: "3c22869d-cd2e-405b-90e6-53a7bf04dc0b"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work out the lesson's business case for proactive self-healing on a baseline incident, and say what the annual figure comes to."
    sampleAnswer: "The lesson values workforce productivity at $125.00 an hour. For the baseline incident affecting 500 users, a reactive resolution of 90 minutes costs 500 x 125.00 x 1.5 hours, which is $93,750. The proactive path detects the anomaly, remediates it, spends 30 seconds on post-flight telemetry health verification and resolves in 90 seconds, which is 0.025 hours, giving 500 x 125.00 x 0.025, which is $1,562.50 of damage, with zero tickets filed because proactive communication and auto-remediation reach the users first. The net saving per incident is therefore $93,750 - $1,562.50, which is $92,187.50. At an average of 12 major technical incidents a year, the annual net value is 12 x $92,187.50, which is $1,106,250, more than $1.1 million a year before counting reduced IT burnout, improved SLA compliance and enhanced employee retention. The sensitivity table shows the same shape at other scales: with 2,500 impacted users, shrinking the resolution envelope from 90 minutes to 90 seconds preserves nearly half a million dollars in a single event."
    explanation: "A strong answer shows the hourly rate, the two resolution times converted into hours, both damage figures and the net saving per incident, and then multiplies by the annual incident count. It should note that the proactive path also files zero tickets, and should use the sensitivity matrix to show that the argument gets stronger, not weaker, as the impacted cohort grows."
```

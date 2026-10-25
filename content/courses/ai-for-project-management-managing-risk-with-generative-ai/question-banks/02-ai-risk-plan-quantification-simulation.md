---
id: "54e28b80-9ed5-45fd-9d47-ecf786a18a0f"
title: "The AI RISK PLAN Framework: Risk Ranking, Generative Simulation & Real-Time Telemetry: Question Bank"
description: "Practises cardinal EMV ranking, Pareto triage, ROMI-optimised mitigation, Beta-PERT Monte Carlo simulation, merge bias and CUSUM telemetry monitoring."
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

These questions practise [[courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/02-ai-risk-plan-quantification-simulation|The AI RISK PLAN Framework: Risk Ranking, Generative Simulation & Real-Time Telemetry]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "3ea79ada-d010-4f64-b794-62f89cc74ad1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson opens Step R with what it calls the ordinal scale multiplication fallacy. What exactly is invalid about the standard corporate practice it describes?"
    options:
      - id: opt-a
        text: "The 5x5 matrix is invalid only because the colours assigned to each cell are subjective and could be drawn to a house style"
      - id: ordinal
        text: "Multiplying qualitative 1 to 5 ranks, because the gaps between ranks are not equal"
      - id: opt-b
        text: "The 5x5 matrix is invalid because it produces too few cells to separate a catastrophic risk from a routine one in a complex programme"
      - id: opt-c
        text: "The 5x5 matrix is invalid only when the impact column mixes cost and schedule, so a single monetary column would repair it"
    correctOptionIds: [ordinal]
    explanation: "An ordinal scale establishes order but not equal intervals, so multiplying 3 by 4 manufactures a precision the scale never contained and produces priority inversions. The lesson's first invariant therefore prohibits ordinal arithmetic for risk prioritisation."
  - id: "6da7f907-9366-4bfd-b655-d2ddab6bfce1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson makes cardinal Expected Monetary Value the baseline ranking metric. How is it defined, and what are its two ingredients?"
    options:
      - id: opt-a
        text: "EMV is the ordinal matrix score divided by five, so that every register ends up on the same five-point scale"
      - id: opt-b
        text: "EMV is the monetary impact multiplied by the number of mitigation options available for that risk in the register"
      - id: opt-c
        text: "EMV is the sum of every likelihood score in the register divided by the total impact of the programme"
      - id: emv
        text: "EMV = P times I, a calibrated probability against a monetary impact"
    correctOptionIds: [emv]
    explanation: "Every risk factor is parameterised with an objective probability P(r_k) in [0, 1], drawn from retrospectives, synthetic red-teaming or empirical frequency, and a quantifiable economic impact I(r_k) in currency covering direct labour delay, idle contractor burn rate, contractual breach penalties and cloud rework. EMV = P x I then supports portfolio budgeting, underwriting and mitigation ROI."
  - id: "e1e11e33-becc-47f3-8be4-328bc7a5bcfb"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's Pareto 80/20 triage splits the register into two operational tiers. How does it describe them?"
    options:
      - id: pareto
        text: "The Vital Few top 20% carry 80% of EMV; the Useful Many are logged only"
      - id: opt-a
        text: "The Vital Few top 80% carry 20% of EMV, and the Useful Many top 20% are the ones that get bespoke treatment"
      - id: opt-b
        text: "The split is drawn at 50% of the risks, so that the first half of the register is treated actively and the second half is dropped"
      - id: opt-c
        text: "No split is drawn, because the lesson insists that every identified risk must carry its own telemetry trigger and mitigation plan"
    correctOptionIds: [pareto]
    explanation: "Risk exposure in complex engineering systems follows a power law, so roughly 20% of identified risks account for 80% of aggregate EMV. The Vital Few get mandatory algorithmic treatment with telemetry triggers, explicit mitigations and executive budget authorisation, while the Useful Many are absorbed into aggregate contingency reserves and logged without bespoke overhead."
  - id: "62e2b592-ce55-4b71-9a68-c3213b9e32cf"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson name as one of the four formal risk treatment archetypes? Select every correct answer."
    options:
      - id: opt-a
        text: "Avoid"
      - id: opt-b
        text: "Mitigate"
      - id: opt-c
        text: "Transfer"
      - id: opt-d
        text: "Escalate to the executive sponsor"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "The four archetypes are Avoid, which eliminates the threat condition by altering scope, architecture or the supplier contract; Mitigate, which reduces P and/or I; Transfer, which reallocates liability through fixed-price contracts, insurance or binding SLA penalty clauses; and Accept, which absorbs the residual exposure through P80/P90 contingency reserves. Escalation is not one of them."
  - id: "64aea83b-8448-454e-a7d7-de70b323cb35"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson states a decision rule for Return on Mitigation Investment. What does it say should happen when the ROMI of a proposed mitigation is zero or negative?"
    options:
      - id: opt-a
        text: "The mitigation should be funded anyway, because the register needs a response against every risk it has formally logged"
      - id: opt-b
        text: "The mitigation should be sent back for redesign, because a non-positive ROMI always signals that the engineering estimate was too conservative"
      - id: romi
        text: "Reject proactive mitigation and accept the risk into contingency reserves"
      - id: opt-c
        text: "The decision should be deferred to the executive sponsor, since only the sponsor can judge how much risk appetite the programme is allowed to carry"
    correctOptionIds: [romi]
    explanation: "ROMI = ((EMV_pre - EMV_post) - C_mit) / C_mit. Above zero the mitigation yields net economic value; at or below zero it costs more than the expected loss it prevents, so the lesson requires the risk to be formally accepted into contingency reserves rather than treated."
  - id: "10bd58f6-bc63-4ed8-ba40-35005ddc6fb2"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson reject the Triangular distribution that project management software has historically defaulted to?"
    options:
      - id: opt-a
        text: "Because the Triangular distribution cannot be sampled on a continuous interval, so every draw has to fall on one of the three declared points"
      - id: opt-b
        text: "Because the Triangular distribution places too much weight near the mode, which hides the long pessimistic tail that project work actually produces"
      - id: opt-c
        text: "Because the Triangular distribution requires four parameters rather than the three that a Beta-PERT fit can work from on a real schedule"
      - id: pert
        text: "Its density has a derivative discontinuity at the mode and it overweights the tails"
    correctOptionIds: [pert]
    explanation: "The Triangular density has an abrupt derivative discontinuity at the mode m and overweights the extremes a and b, which inflates the variance artificially. Beta-PERT is bounded on the same interval, smooths the tails and weights the most likely estimate m four times as heavily as the extremes."
  - id: "4b082f0d-294b-488a-bc7a-813e0dd0a472"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two parallel activities X and Y must both finish before a milestone, so the stage duration is max(X, Y). What does the lesson say the deterministic CPM gets wrong here?"
    options:
      - id: opt-a
        text: "It forgets that the two activities share the same crew, so it should add a dependency edge rather than treat them as parallel"
      - id: merge
        text: "It takes the max of the two means, while the expected max is larger"
      - id: opt-b
        text: "It assumes the pessimistic duration of the longer task, which is safe but pessimistic, so the stage is always over-estimated rather than under"
      - id: opt-c
        text: "It ignores the merge node entirely, so the integration task that follows both activities is scheduled from their start rather than from their completion"
    correctOptionIds: [merge]
    explanation: "Merge Bias follows from Jensen's inequality: max is a convex function, so E[max(X, Y)] is greater than or equal to max(E[X], E[Y]). The expected completion date drifts towards the maximum duration rather than the mean, and the lesson's fourth invariant says never to commit to a deterministic CPM schedule."
  - id: "ba2d2ae8-ccc1-41d1-a0f0-d40156bb6fa1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The Monte Carlo run reports a Criticality Index of 47.0% for T-02, which the deterministic schedule had placed on the critical path. What does that tell the team?"
    options:
      - id: criticality
        text: "The critical path shifted in 53.0% of iterations, so watching only T-02 is a trap"
      - id: opt-a
        text: "That the criticality index is computed from the float of each task rather than from the 10,000 simulated outcomes, so it cannot shift between runs"
      - id: opt-b
        text: "That T-02 was the critical task in 47.0% of iterations and no other task was ever critical, so the deterministic path was still broadly right"
      - id: opt-c
        text: "That the simulation was under-sampled, because a criticality index that does not reach 100% indicates that the iteration count was too low for convergence"
    correctOptionIds: [criticality]
    explanation: "T-03 became the bottleneck in 24.9% of runs and T-04 in 28.1%, so in 53.0% of the 10,000 simulated worlds the critical path moved. A project manager who tracks only T-02 is blindsided more than half the time, which is why the lesson treats path criticality as a dynamic stochastic property rather than a static label."
  - id: "d9c9883e-6ea7-4bea-9f9b-d9116a364ff8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "When the CUSUM drift statistic S_t crosses the escalation threshold, what does the monitoring agent do? Select every correct answer."
    options:
      - id: opt-a
        text: "Re-parameterizes the affected task's Beta-PERT distribution, shifting m and b upward to reflect observed operational drag"
      - id: opt-b
        text: "Re-runs the 10,000-iteration Monte Carlo simulation"
      - id: opt-c
        text: "Calculates the delta in the project P80 horizon"
      - id: opt-d
        text: "Draws down the contingency reserve immediately and asks the executive sponsor to ratify the new baseline afterwards"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "The four actions are to re-parameterize the Beta-PERT distribution, re-run the 10,000-iteration simulation, calculate the delta in the P80 horizon and then generate an executive alert if that updated P80 breaches the baseline contingency reserve. The reserve itself is not drawn down automatically by the monitoring agent."
  - id: "d1296589-4eeb-4c66-9ce3-59a4abc31732"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson's worked run puts the P80 enterprise commitment horizon at 90.64 days against a deterministic CPM horizon of 82.33 days, and it reports that gap as a schedule contingency reserve of +8.31 working days."
    answer: true
    explanation: "The reserve is the percentile differential, Reserve_80 = P80 - Baseline_CPM = 90.64 - 82.33 = +8.31 working days, and it is what buys an 80% confidence level. Committing to P90 at 93.95 days would demand an 11.61-day reserve, and the lesson warns that committing to P50 is a 50% coin flip."
  - id: "a3518f8f-a508-4e6b-91f1-356e60b709a4"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain Merge Bias using the lesson's worked parallel example, and say what it costs the project."
    sampleAnswer: "Task X has a=16, m=24, b=42, so E[X] = 25.33 days, and Task Y has a=15, m=23, b=36, so E[Y] = 23.83 days. Deterministic CPM takes max(E[X], E[Y]) = 25.33 days, but the simulated expected duration of the merged stage is 27.85 days, which is 2.52 days of pure Merge Bias. The cause is Jensen's inequality: max is convex, so the expectation of the slowest of two random paths is longer than the slowest of their averages, and the whole project drifts later without anyone performing poorly or scope being added."
    explanation: "A strong answer supplies the three-point estimates, the two means, the deterministic figure and the simulated figure, and names Jensen's inequality as the cause rather than merely asserting that parallel work finishes late."
  - id: "0dfcbff2-3027-485a-814c-0d0d7c80e6eb"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson's worked run ranks mitigations by ROMI under a $55,000 capital budget. Which treatments were selected, what did each cost, and what did the funded portfolio do to the schedule?"
    sampleAnswer: "Three treatments were selected. The Automated Formal Verification Rig on T-05 led at 143.8% ROMI for $16,000, the Parallelized Sharding Spike and Rust Core on T-02 at 127.3% for $22,000, and the Secondary Cloud HSM Vendor SLA on T-03 at 126.7% for $15,000, totalling $53,000 of the $55,000 budget. The Pre-Audit Readiness Consultant Review at 85.7% was excluded because the capital was exhausted, and the Contracted Integrator SLA Guarantee at 0.0% was rejected for creating no net economic benefit. The funded portfolio compressed the P80 horizon from 90.64 days to 82.68 days, a recovery of 7.96 working days, while mean expenditure rose from $477,840.77 to $530,377.97."
    explanation: "A strong answer gives the three selected treatments with their ROMI and cost, explains why the 85.7% candidate was dropped on budget and the 0.0% candidate on economics, and quantifies the S-curve shift the portfolio bought."
```

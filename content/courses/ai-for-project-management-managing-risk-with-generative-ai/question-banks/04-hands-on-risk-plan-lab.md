---
id: "4220fb1a-856b-4d04-8778-da9f8302bd41"
title: "Hands-On Implementation Lab: Constructing an Enterprise AI Risk Management Engine: Question Bank"
description: "Practises the seven-phase engine: Pydantic schema invariants, CPM DAG scheduling, Beta-PERT Monte Carlo simulation, Bayesian telemetry updating, ROMI mitigation and the governance gate."
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

These questions practise [[courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/04-hands-on-risk-plan-lab|Hands-On Implementation Lab: Constructing an Enterprise AI Risk Management Engine]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "c6a854d4-c3d3-4267-ad33-9dfe962a2bf4"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson warns against what it calls the Script Kiddie AI Pipeline Fallacy. What does it say generative AI must never do inside a production risk engine?"
    options:
      - id: roles
        text: "Calculate schedules, simulate random variables or execute drawdowns"
      - id: opt-a
        text: "Draft the natural-language risk narrative, because a model that writes the register can also be trusted to score the register it wrote"
      - id: opt-b
        text: "Cluster semantically similar risks, because deduplication is a semantic judgement that no deterministic algorithm can perform on its own"
      - id: opt-c
        text: "Read the work breakdown structure at all, because parsing the schedule is the one step where a language model adds real value over a script"
    correctOptionIds: [roles]
    explanation: "AI agents serve strictly as qualitative semantic extractors, feeding validated typed data into deterministic algorithms: topological DAG engines, Beta-PERT numerical samplers, Bayes' theorem calculators and cryptographically verified governance gates. A model that also computes the schedule invents phantom tasks and produces scores that cannot withstand an external audit."
  - id: "16cc9afa-354c-4a6b-8571-b87a1bd143fb"
    revision: 1
    status: active
    type: single-choice
    prompt: "Phase 2 enforces three mathematical invariants at the ingestion boundary. Which of these four PERT triples would the schema reject?"
    options:
      - id: opt-a
        text: "a = 10, m = 14, b = 22, the exact shape of the Core Sensor and LiDAR Rig task in the Project Titan schedule"
      - id: opt-b
        text: "a = 15, m = 20, b = 35, the Safety Edge Compute Procurement triple that the worked run samples ten thousand times"
      - id: rejected
        text: "a = 18, m = 12, b = 40, because the most likely duration sits below the optimistic one"
      - id: opt-c
        text: "a = 12, m = 16, b = 26, the 5G Ultra-Reliable Mesh Deployment triple that the engine later reports at zero criticality"
    correctOptionIds: [rejected]
    explanation: "The schema enforces 0 < a <= m <= b, so a most likely duration of 12 days below an optimistic 18 days is out of order and is rejected before it can reach the calculation layer. The other three triples are the shapes the engine actually runs for TASK-01, TASK-02 and TASK-06."
  - id: "f67c56ce-0e6f-4aa6-8241-62088eb58ec0"
    revision: 1
    status: active
    type: single-choice
    prompt: "The Beta-PERT sampler is the engine's numerical core. How does it compute the mean of a task's duration distribution, and what happens when the mode is symmetric?"
    options:
      - id: opt-a
        text: "It averages the three estimates directly, and it widens the spread whenever the mode sits closer to the optimistic end of the range"
      - id: opt-b
        text: "It takes the median of the three estimates and assumes the spread is uniform between the optimistic and pessimistic bounds"
      - id: opt-c
        text: "It fits a normal distribution to the three estimates and truncates it at the bounds, which keeps the tails inside the declared range"
      - id: pert
        text: "Mean = (a + 4m + b) / 6, and a symmetric mode gives alpha = beta = 3"
    correctOptionIds: [pert]
    explanation: "The mean is (a + 4m + b) / 6, which weights the most likely estimate four times as heavily as the extremes, and the standard deviation assumes the span from a to b covers about six standard deviations, so sigma = (b - a) / 6. When the mode is symmetric the shape parameters simplify to alpha = 3 and beta = 3."
  - id: "adfa9e7d-a0a3-458f-8d95-48820d3b8d78"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson list as outputs of Phase 4, the probabilistic Monte Carlo engine with Beta-PERT sampling? Select every correct answer."
    options:
      - id: opt-a
        text: "Empirical P50, P80, P90 and P95 percentiles of the project duration"
      - id: opt-b
        text: "A Task Criticality Index for every work package, measured across the iterations"
      - id: opt-c
        text: "The merge bias and the non-linear schedule divergence across parallel paths"
      - id: opt-d
        text: "A guaranteed critical path that is identical in every one of the simulated runs"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "Phase 4 samples 10,000 iterations with seed control, extracts the empirical percentiles, computes each task's Criticality Index as the fraction of iterations in which it was critical, and captures merge bias across parallel paths. It cannot promise a fixed critical path, because the worked run shows the path shifting between worlds."
  - id: "e8daefa2-08c2-480a-b92c-909828b82f75"
    revision: 1
    status: active
    type: single-choice
    prompt: "Signal SIG-101 reports a supplier delivery delay of 32.0 days against a 25.0-day threshold. What does the engine do to RSK-01?"
    options:
      - id: opt-a
        text: "It raises the posterior to 0.8852, because a breached supplier threshold is the strongest single signal in the Project Titan telemetry set"
      - id: posterior
        text: "It moves the posterior to 0.6800 and the EMV to $95,200"
      - id: opt-b
        text: "It leaves the prior of 0.20 untouched, because the Bayesian updater only acts on signals that arrive from the build pipeline"
      - id: opt-c
        text: "It raises the posterior to 1.0 and the EMV to $140,000, since a threshold breach on a monitored risk is proof that the risk has occurred"
    correctOptionIds: [posterior]
    explanation: "With a prior of 0.20, a likelihood of 0.85 given the risk and 0.10 given no risk, the posterior is 0.6800, and the dynamic EMV becomes 0.6800 x $140,000 = $95,200. A breach raises the posterior through Bayes' theorem; it does not prove the risk has occurred."
  - id: "1c434d38-9892-47d3-87d2-cb29cd11c264"
    revision: 1
    status: active
    type: single-choice
    prompt: "Signal SIG-102 reports a sensor noise value of 0.042 against a 0.05 threshold, so it does not trigger. What happens to RSK-02's probability and EMV?"
    options:
      - id: opt-a
        text: "The posterior falls to zero, because a signal that stays below its threshold is evidence that the risk is not present at all"
      - id: opt-b
        text: "The posterior rises slightly above the prior, because a near miss on a threshold is still a weak signal that the risk is building"
      - id: unchanged
        text: "The posterior stays at 0.2500 and the EMV at $23,750"
      - id: opt-c
        text: "The posterior is set to the false positive rate of the detector, since the updater must output some probability on every sampling tick"
    correctOptionIds: [unchanged]
    explanation: "The Bayesian updater returns the current probability unchanged when the signal has not been triggered, so RSK-02 keeps its prior of 0.2500 and its EMV of $23,750. A signal that never breached its threshold carries no evidence, so the engine leaves the risk exactly where it was."
  - id: "58cab5a7-f5ef-47e7-9219-e50b7a77429f"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Project Titan run, an automated agent tries to execute the $35,000 LiDAR mitigation drawdown without human credentials. What happens?"
    options:
      - id: intercept
        text: "The interceptor blocks it with a security breach error"
      - id: opt-a
        text: "The drawdown is approved and queued for the next reporting cycle, because a ROMI of 159.1% is evidence enough to act without a signature"
      - id: opt-b
        text: "The drawdown is approved at half value, because the ROMI ranking can split a mitigation when the reserve is under half spent"
      - id: opt-c
        text: "The drawdown is approved but logged as provisional, and the audit ledger is reconciled at the end of the month by the financial tier"
    correctOptionIds: [intercept]
    explanation: "The governance interceptor is impermeable: an automated agent cannot commit contingency capital autonomously, so the attempt raises a security breach error. The lesson then repeats the lesson's Apollo 11 analogy, where a verified human identity and role must authorise the response."
  - id: "93e94d7a-bf96-4c31-8023-d73d3356d33b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these roles does the lesson list as authorised to sign off on a contingency drawdown? Select every correct answer."
    options:
      - id: opt-a
        text: "SUPPLY_CHAIN_VP"
      - id: opt-b
        text: "INFRASTRUCTURE_DIRECTOR"
      - id: opt-c
        text: "PROJECT_DIRECTOR"
      - id: opt-d
        text: "AUTOMATED_AGENT"
    correctOptionIds: [opt-a, opt-b, opt-c]
    explanation: "An authorised executive role is one of SUPPLY_CHAIN_VP, INFRASTRUCTURE_DIRECTOR or PROJECT_DIRECTOR, and the call must carry an authenticated human identity as well. The worked run shows E. Harrison signing as SUPPLY_CHAIN_VP and M. Rodriguez as INFRASTRUCTURE_DIRECTOR, which is why the automated agent's attempt was refused."
  - id: "c7df1d43-b267-42ec-b1ac-50799b1798f7"
    revision: 1
    status: active
    type: single-choice
    prompt: "The verified run reports a deterministic critical path duration of 100.67 days, a P80 of 107.17 days and a P90 of 110.77 days. What does the engine recommend, and how does it read TASK-06's criticality index of 0.0%?"
    options:
      - id: opt-a
        text: "It recommends committing to 100.67 days, because the deterministic critical path is the only figure that can be defended in front of a customer"
      - id: opt-b
        text: "It recommends a buffer of 10.10 days, because the reserve should always be sized against the worst-case P90 horizon rather than the P80"
      - id: opt-c
        text: "It recommends committing to 107.17 days with no buffer at all, because the P80 already absorbs the full spread between the critical path and the mean"
      - id: p80
        text: "Commit to P80 with +6.50 days of buffer; TASK-06 was never critical"
    correctOptionIds: [p80]
    explanation: "The recommended schedule buffer is P80 minus the deterministic horizon, 107.17 - 100.67 = +6.50 days, and the invariant is to commit to P80 rather than the optimistic mode. TASK-06's 0.0% criticality index means it never became critical in any of the 10,000 simulated worlds."
  - id: "055e0d33-042c-4a0c-8c06-67105d41042e"
    revision: 1
    status: active
    type: true-false
    prompt: "In the Project Titan deterministic schedule, TASK-06, the 5G Ultra-Reliable Mesh Deployment, sits on the critical path, and the Monte Carlo run confirms it as a critical task in every one of the 10,000 iterations."
    answer: false
    explanation: "The deterministic critical path is TASK-02 -> TASK-04 -> TASK-05 -> TASK-07 -> TASK-08, and TASK-06 is not on it. The simulation agrees: TASK-06 has a Criticality Index of 0.0%, while TASK-05 and TASK-07 are critical in 100.0% of iterations and TASK-02 and TASK-04 in 91.7%."
  - id: "a10856e9-2d09-4dc9-8211-0dc06dedb6d3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Why does the lesson require a fixed PRNG seed and idempotent telemetry processing, and what would break without them?"
    sampleAnswer: "The engine runs under corporate governance, external financial audit and regulatory scrutiny, so a risk profile that reports a P80 completion of Day 107.2 today has to report exactly the same value tomorrow against identical inputs. That means every Monte Carlo routine fixes the pseudo-random seed at 42, so the sampling vector and the criticality indices are reproducible. Telemetry updating must also be idempotent, so processing the same signal packet twice cannot compound the posterior or let it drift. Without the seed the audit trail changes on every run; without idempotency the same telemetry applied twice inflates the probability and corrupts the EMV that funds the mitigations."
    explanation: "A strong answer states the audit requirement, names the seed value of 42, distinguishes reproducibility from idempotency, and gives a concrete consequence for each when the rule is broken."
  - id: "4ffab4b3-5ead-4913-be95-edd77a5066ee"
    revision: 1
    status: active
    type: free-recall
    prompt: "Walk through Phase 6 for Project Titan: what budget cap applied, which mitigations were selected and at what ROMI, and what did the governance gate and the ledger end up with?"
    sampleAnswer: "The mitigation capital was capped at $60,000, and two mitigations were selected: the Dual-Source Secondary LiDAR Supplier Contract at $35,000 with a ROMI of 159.1%, and Deploy High-Gain Antennas and Redundant Wi-Fi 6E Failover at $22,000 with a ROMI of 134.6%. When the engine then tried to execute the $35,000 drawdown autonomously, the governance interceptor raised a security breach error, because an automated agent cannot commit capital without authenticated human credentials. E. Harrison, as SUPPLY_CHAIN_VP, signed for the $35,000 and M. Rodriguez, as INFRASTRUCTURE_DIRECTOR, signed for the $22,000, so $57,000 was committed against the $100,000 authorised contingency reserve and $43,000 stayed unallocated."
    explanation: "A strong answer gives the cap, both mitigations with their ROMI and cost, the interception of the automated drawdown, the two named signatories with their roles, and the committed and unallocated balances that follow."
```

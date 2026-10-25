---
id: "caf6a331-3a4e-4f61-9cca-83a3444fe259"
title: "Foundations of AI in Project Risk Management & The Failure of Static Registers: Question Bank"
description: "Practises the ordinal-versus-cardinal distinction, the failure of the static 5x5 register, Bayesian telemetry updating and the economics of mitigation."
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

These questions practise [[courses/ai-for-project-management-managing-risk-with-generative-ai/lessons/00-foundations-of-ai-project-risk|Foundations of AI in Project Risk Management & The Failure of Static Registers]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "59d215d3-46b1-42bc-b7f2-b23fb4c3fef3"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team rates a risk Likelihood 4 and Impact 2, multiplies them to get 8, and sorts the whole register by that product. According to the lesson's account of Stevens' Taxonomy, what is wrong with that step?"
    options:
      - id: ord
        text: "Likelihood and Impact are ordinal ranks, and ordinal numbers cannot be multiplied"
      - id: opt-a
        text: "Nothing is wrong, because the 5x5 matrix is the industry standard and the product gives an auditable priority score"
      - id: opt-b
        text: "The product is only invalid because the team left out the impact column, and restoring that column would make the multiplication sound"
      - id: opt-c
        text: "The score is invalid because four times two does not equal eight in the decimal sense, so the register should store the unmultiplied ranks"
    correctOptionIds: [ord]
    explanation: "An ordinal scale establishes order only, so the distance between Rank 1 and Rank 2 is not mathematically equivalent to the distance between Rank 4 and Rank 5. Multiplying them manufactures phantom equivalences and priority inversions, which is why the lesson replaces matrix products with cardinal probabilities and monetary impacts."
  - id: "76a64620-722d-4139-98c1-84f4ff307f39"
    revision: 1
    status: active
    type: single-choice
    prompt: "Risk Alpha has a 60% probability and a $15,000 impact; Risk Beta has a 4% probability and a $400,000 impact. Both carry the same 5x5 matrix score of 8. What expected loss does the lesson compute for each?"
    options:
      - id: opt-a
        text: "Alpha $120,000 and Beta $160,000, because the monetary impact multiplies out over the whole exposure period of the project"
      - id: emv
        text: "Alpha $9,000 and Beta $16,000, so Beta is the larger exposure"
      - id: opt-b
        text: "Alpha $15,000 and Beta $400,000, because a risk's expected loss is simply the monetary impact it would cause if it occurred"
      - id: opt-c
        text: "Alpha $4,800 and Beta $3,200, because a 60% probability is worth six times a 4% probability regardless of the impact"
    correctOptionIds: [emv]
    explanation: "Expected loss is probability multiplied by monetary impact: $0.60 x $15,000 = $9,000 for Alpha and $0.04 x $400,000 = $16,000 for Beta. Beta nearly doubles Alpha in expected dollars even though the two risks carry the identical matrix score, which is the whole point of quantifying cardinally."
  - id: "685bc574-4907-4cf4-864f-bdad6648eb2f"
    revision: 1
    status: active
    type: single-choice
    prompt: "A catastrophic risk carries a 1% probability and a $10,000,000 impact, while a routine problem carries a 90% probability and a $10,000 impact. What does the 5x5 matrix do with that pair?"
    options:
      - id: opt-a
        text: "It scores both at 5, because the 90% routine problem still lands in the minor impact band and the matrix only reads the impact column"
      - id: opt-b
        text: "It scores the catastrophe at 25 and the routine problem at 10, because a matrix reserves its top band for the largest possible product of probability and impact"
      - id: matrix
        text: "It scores the catastrophe at 5 and the routine problem at 10, colouring the catastrophe green"
      - id: opt-c
        text: "It refuses to score either one, because a 5x5 matrix cannot represent a probability of 1% alongside an impact of $10,000,000 without collapsing the scale"
    correctOptionIds: [matrix]
    explanation: "The catastrophe scores 1 x 5 = 5 and is colour-coded green as low risk, while the routine problem scores 5 x 2 = 10 and is colour-coded yellow as medium risk. The team therefore funds the $10,000 annoyance and leaves the $10,000,000 disaster unhedged, because the scale caps at 5 and compresses the tail."
  - id: "4412683b-5d7f-4176-9894-0c4234a0aa7e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Before a risk can be quantified cardinally, which two inputs does the lesson say it must carry? Select every correct answer."
    options:
      - id: opt-a
        text: "An objective probability P in [0, 1], drawn from retrospectives, synthetic red-teaming or empirical frequency"
      - id: opt-b
        text: "A quantifiable economic impact I denominated in currency"
      - id: opt-c
        text: "An ordinal likelihood rank from 1 to 5 multiplied by an ordinal impact rank from 1 to 5"
      - id: opt-d
        text: "A colour band taken from the standard 5x5 heatmap, so the register stays comparable with legacy spreadsheets"
    correctOptionIds: [opt-a, opt-b]
    explanation: "Cardinal quantification needs a calibrated probability on the unit interval and an economic impact expressed in money, so that EMV = P x I can be compared, summed across a portfolio and used to size reserves. An ordinal product and a colour band are exactly the arithmetic the lesson rejects."
  - id: "b27ec34e-8db2-41cb-9ab3-14d7c6915354"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson contrasts the inside view with the outside view when it introduces reference class forecasting. What does it report for software ERP migrations across Fortune 500 enterprises?"
    options:
      - id: opt-a
        text: "Roughly a quarter exceed their initial schedules, which is why reference class forecasting is only a sanity check rather than a planning input"
      - id: opt-b
        text: "The lesson gives no external base rate, because the planning fallacy is argued from the team's own experience rather than from comparable projects"
      - id: opt-c
        text: "Over half exceed their initial schedules, but the lesson reports the figure without saying by how much their cost or duration slipped"
      - id: base-rate
        text: "Over 75% exceed their initial schedules by at least 40%"
    correctOptionIds: [base-rate]
    explanation: "The outside view replaces the team's own optimistic bottom-up path with the historical distribution of comparable projects, and the lesson's figure is that over 75% of Fortune 500 ERP migrations exceed their initial schedules by at least 40%. Separately it reports the planning fallacy as underestimating delivery timelines by 30% to 70%."
  - id: "86e5e851-f7e5-4b18-ae12-5287ad7662b3"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson lists four fatal physical constraints on the human lookout in the crow's nest. Which of these is one of them?"
    options:
      - id: envelope
        text: "An insufficient reaction envelope for a 46,000-ton vessel travelling at 22 knots"
      - id: opt-a
        text: "A loss of visual acuity in the lookout, which the lesson treats as a physical rather than an organisational limit"
      - id: opt-b
        text: "A radar sweep that was too infrequent to catch a closing obstacle before it reached the hull"
      - id: opt-c
        text: "A decision rule that forbade the helm from altering course, so any warning could never have been acted upon"
    correctOptionIds: [envelope]
    explanation: "The four are narrow line-of-sight, periodic sampling, cognitive distortion and insufficient reaction envelope. A 46,000-ton steel vessel at 22 knots needs nautical miles to alter its vector, so forty-five seconds of warning was hydrodynamically insufficient, which is the lesson's point about how little time a late signal actually buys."
  - id: "c85f168c-c564-4323-b385-2f804b2ab2bf"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson names three structural weaknesses of Earned Value Management as a risk-prediction tool. Which one is path blindness?"
    options:
      - id: opt-a
        text: "EVM registers variance only after work packages fall behind, so by the time the SPI drops to 0.80 the delay has already happened"
      - id: path
        text: "All earned value dollars count equally, so a $50,000 documentation task outweighs a $10,000 critical-path task"
      - id: opt-b
        text: "EVM reports deterministic point values such as an SPI of 0.92 and ignores variance, probability distributions and emerging risks"
      - id: opt-c
        text: "EVM cannot be computed at all without a fully baselined work breakdown structure approved before the project starts"
    correctOptionIds: [path]
    explanation: "Path blindness is the loss of any notion of position in the schedule: a non-critical decorative documentation task worth $50,000 delivers five times more earned value than a $10,000 architectural kernel task sitting on the critical path, so a project can report an SPI of 1.02 while its zero-float critical path is stalled. The other two weaknesses are the lagging nature of the metrics and the absence of uncertainty bounds."
  - id: "ab3d7cf8-dace-41f0-9c90-d0dfd3aa6f1b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson treat as a leading indicator, one that signals failure weeks before a schedule breaks? Select every correct answer."
    options:
      - id: opt-a
        text: "Git pull-request review latency"
      - id: opt-b
        text: "The monthly status report and the SPI figure it produces"
      - id: opt-c
        text: "ERP supplier documentation timestamps"
      - id: opt-d
        text: "The cost variance that Earned Value Management books at the end of the month"
    correctOptionIds: [opt-a, opt-c]
    explanation: "Earned Value Management and monthly status reports are lagging autopsies of what has already happened. Leading indicators such as PR review latency and ERP supplier documentation timestamps move first, so acting on them happens while the plan can still be changed."
  - id: "a32d5260-535c-4930-a5b3-4e987ee33718"
    revision: 1
    status: active
    type: single-choice
    prompt: "A risk starts at a 15% prior. A verified operational signal arrives with P(Signal | Risk) = 0.85 and P(Signal | no Risk) = 0.10. What posterior does the lesson's Bayes calculation produce?"
    options:
      - id: opt-a
        text: "About 21%, because the marginal probability of the signal is 0.2125 and the risk keeps most of its original weight"
      - id: opt-b
        text: "About 15%, because one signal only refines the estimate and cannot move the prior without a second independent source"
      - id: posterior
        text: "A posterior of 60.0%, so the risk moves from a nominal 15% to a live threat"
      - id: opt-c
        text: "About 85%, because the sensitivity of the detector can be read straight across as the probability that the risk is real"
    correctOptionIds: [posterior]
    explanation: "The marginal probability of the signal is 0.85 x 0.15 + 0.10 x 0.85 = 0.2125, so P(D | S1) = 0.1275 / 0.2125 = 0.6000. One verified signal therefore lifts the risk from 15% to 60.0%, which the lesson contrasts with the static register that would have left it logged at 15%."
  - id: "cff03195-3829-41f6-a98b-f18fe79a2372"
    revision: 1
    status: active
    type: true-false
    prompt: "In the lesson's worked register, the static 5x5 matrix ranks RISK-02, Cloud Compute Overrun, first with a score of 12, and the dynamic engine leaves it in that leading position."
    answer: false
    explanation: "This is the lesson's False Priority Trap. RISK-02 topped the static register at 4 x 3 = 12, but FinOps scripts resolved the underlying problem and dropped its posterior to 33.3% and its dynamic EMV to $5,999.40, so it falls to rank #3 while RISK-01 climbs to rank #1 at 84.9% and $382,095."
  - id: "8f6063d4-0a6a-47c5-a125-4160e039619a"
    revision: 1
    status: active
    type: free-recall
    prompt: "A risk currently carries an EMV of $90,000. A proposed mitigation costs $25,000 and cuts the EMV to $20,000. Using the lesson's formula, what is the net economic value of taking the mitigation, and what does that number tell the project manager?"
    sampleAnswer: "The net economic value is $45,000, because (EMV_pre - EMV_post) - C_mit = ($90,000 - $20,000) - $25,000. A positive figure means the mitigation buys back more expected loss than it costs, so it clears the economic hurdle and should be funded rather than argued about on instinct."
    explanation: "A strong answer shows the arithmetic and then the decision it supports. The expected loss avoided is $70,000, the cost of the mitigation is $25,000, and the difference is the $45,000 of shareholder value the mitigation creates."
  - id: "5306f44a-eafd-426f-b217-ec9432e563d6"
    revision: 1
    status: active
    type: free-recall
    prompt: "Why does the lesson say a traditional monthly risk register is a lookout in a crow's nest? Name the four physical constraints it identifies and the conclusion it draws from them."
    sampleAnswer: "The register is a lookout because human eyesight, and the monthly review that stands in for it, suffers four fatal constraints: narrow line-of-sight, periodic sampling, cognitive distortion and an insufficient reaction envelope. By the time an existential obstacle is visible to a human estimator, the project's momentum and inertia make budget overruns and schedule slips mathematically irreversible, which is why the lesson replaces the register with a continuously sensing telemetry envelope."
    explanation: "A strong answer names all four constraints in the lesson's own terms, then draws the conclusion the lesson draws from them: a monthly spot check is not a sensor, so the project needs a continuous sensing envelope instead of a quarterly re-colouring of a spreadsheet."
```

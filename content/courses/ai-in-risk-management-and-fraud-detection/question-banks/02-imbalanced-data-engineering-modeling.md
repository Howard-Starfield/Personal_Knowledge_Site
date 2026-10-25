---
id: "721ce167-7e3e-4794-9a7d-04a0e85f07af"
title: "Imbalanced Learning & Feature Engineering: Defeating the Accuracy Paradox with SMOTE, PR Curves & Tuning: Question Bank"
description: "Practises why accuracy fails on skewed fraud data, how ROC and precision-recall curves diverge, cost-sensitive thresholds, resampling mechanics and the domain features that carry the signal."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - fraud-detection
  - study-guide
  - assessment
  - active-recall
courseId: "81b8076a-4b7c-4ab3-9320-4702482db781"
comments: false
---

These questions practise [[courses/ai-in-risk-management-and-fraud-detection/lessons/02-imbalanced-data-engineering-modeling|Imbalanced Learning & Feature Engineering: Defeating the Accuracy Paradox with SMOTE, PR Curves & Tuning]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "c9252dc0-3bef-4847-ae76-fe48cc5347b3"
    revision: 1
    status: active
    type: single-choice
    prompt: "A fraud model is 99.80% accurate on a portfolio that is 99.8% legitimate transactions and 0.2% fraud. The lesson calls this the accuracy paradox. What is the operational consequence?"
    options:
      - id: fit-for-production
        text: "The model is fit for production, because a 99.80% accuracy rate leaves only a 0.20% error budget for the entire portfolio"
      - id: catches-none
        text: "It catches none of the 200 frauds, so recall and precision are both 0.00% and the loss is $1,000,000"
      - id: not-computable
        text: "The model is unusable because the accuracy figure cannot be computed on a set whose two classes are this far apart"
      - id: needs-balanced-data
        text: "The model has to be retrained on a balanced sample before its accuracy figure can be trusted at all"
    correctOptionIds: [catches-none]
    explanation: "This is Model A in the lesson's worked comparison: 99.80% accuracy, 0.00% recall, 0.00% precision, an F1 of 0.00, and a total cost of $1,000,000 from 200 missed frauds at $5,000 each. Accuracy is measuring the majority class, so a model that always says legitimate looks excellent. The number is not wrong and it is not unavailable; it is simply measuring the wrong thing, which is why the lesson replaces it with precision-recall area, F-Beta and total expected financial cost."
  - id: "70b666fe-551c-4643-bb1d-d21de20e0252"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's sleeping lighthouse keeper analogy, why does the 99.73% year-end accuracy claim not hold up?"
    options:
      - id: wrong-denominator
        text: "Because the keeper's audit record is counted over 365 nights while the calm season is only 364 nights, so the denominator is wrong"
      - id: lower-than-model
        text: "Because 364 out of 365 correct nights is a lower figure than the 99.8% accuracy the naive fraud model reports"
      - id: loss-not-chargeable
        text: "Because the hurricane destroyed the harbour and the loss cannot be charged to the keeper's performance record at all"
      - id: one-night-mattered
        text: "Because the one night that mattered cost a 40-ship cargo fleet and $500,000,000 in cargo"
    correctOptionIds: [one-night-mattered]
    explanation: "The analogy works because the accuracy score averages over the 364 calm nights and hides the one night that carried the entire risk: a 40-ship cargo fleet wrecked on the rocks, with $500,000,000 of cargo lost. The lesson's point is that a metric which rewards the routine case can look outstanding on paper while guaranteeing catastrophic loss on the rare case, and the fraud analogue is a model that is right about 99.8% of transactions and wrong about every single fraud. The denominator is fine and the loss is very much chargeable; the metric is the problem."
  - id: "c53d38ff-008d-4246-8a20-46e22b47d943"
    revision: 1
    status: active
    type: single-choice
    prompt: "Stadium security arrests 1,000 innocent spectators and catches 80 pickpockets, out of 100,000 spectators and 100 pickpockets. What does the lesson say the two curves show for that screening operation?"
    options:
      - id: roc-flatters
        text: "The ROC curve sounds almost immaculate, while the precision is only 7.4%"
      - id: pr-flatters
        text: "The precision-recall curve sounds almost immaculate, while the ROC curve exposes that over 92% of the work was wasted"
      - id: same-curve
        text: "Both curves look the same, because the false-positive rate and the precision are two names for the same arithmetic"
      - id: roc-exposes
        text: "The ROC curve exposes the waste, while the precision-recall curve hides it, because precision weights the true positives far more heavily"
    correctOptionIds: [roc-flatters]
    explanation: "The megaphone and the microscope are the lesson's names for the two curves. The false-positive rate is 1,000 over 100,000, which is 0.01, so the ROC announcement sounds virtually immaculate. Inside the holding cell, the magistrate sees that only 80 of the 1,080 detained are actually guilty, so precision is 7.4% and over 92% of the security work was wasted on innocent patrons. The two metrics are not the same arithmetic: one normalises by all the innocents in the stadium, the other by the people actually detained."
  - id: "44baeae2-e06d-44d8-a4a2-a51c0690d033"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's demonstration that ROC-AUC can flatter a model, the false-positive count rises from 50 to 1,000 against 100,000 negatives while the positives stay at 200. What does the lesson say happens to the ROC-AUC?"
    options:
      - id: collapses
        text: "It collapses, because an ROC-AUC of 0.985 cannot survive a twenty-fold rise in false positives"
      - id: rises
        text: "It rises, because the false-positive rate is the only term on the horizontal axis of the ROC curve"
      - id: barely-moves
        text: "It barely moves, from 0.985 to 0.978, because the 0.0095 change in the false-positive rate is imperceptible on that axis"
      - id: invariant
        text: "It stays at exactly 0.985, because the ROC curve is invariant to the class balance of the population it is computed on"
    correctOptionIds: [barely-moves]
    explanation: "The false-positive rate goes from 0.00050 to 0.01000, a change of 0.0095, which on an axis spanning the unit interval is visually and statistically imperceptible, so the ROC-AUC only slips from 0.985 to 0.978. Over the same change, precision falls from 0.6667 to 0.0909, a collapse of 57.6 percentage points, an 86.4% relative degradation, and the precision-recall area drops precipitously. That asymmetry is exactly why the lesson makes precision-recall area the mandatory primary offline metric under SOX 404 and PCI DSS."
  - id: "2e9e9be1-2228-4c5a-be82-8f78ad8f4022"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson says that missing a fraudulent transaction costs $5,000 while investigating an alert costs $15. What does it say the Bayes-optimal decision threshold becomes?"
    options:
      - id: stays-half
        text: "0.50, because a probability above one half is the only defensible point at which to call an event fraud"
      - id: three-per-mille
        text: "0.0030, that is 0.3%"
      - id: stays-half-because-equal
        text: "It stays at 0.50, because the Bayes rule only moves the threshold when the two cost columns are exactly equal to each other"
      - id: theory-only
        text: "0.0030 in theory only, because production has to keep the default 0.50 until investigators are retrained on a new threshold"
    correctOptionIds: [three-per-mille]
    explanation: "The lesson derives the threshold from the cost matrix as p* = (C(FP) - C(TN)) over (C(FP) - C(TN) + C(FN) - C(TP)), which with C(FP) of 15 and C(FN) of 5,000 gives 15 over 5,000, or 0.0030. Missing a fraud costs about 333 times more than inspecting an alert, so the threshold collapses from the naive 0.50 down to 0.3%. The threshold is not optional because of training: it is a consequence of the dollar asymmetry, and the lesson treats moving it as the mandatory final layer of the pipeline."
  - id: "6098395c-79af-441d-9da7-a8b13c724f0a"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson sets class_weight='balanced' on a training set of 100,000 transactions containing 200 frauds. What does it say that achieves?"
    options:
      - id: duplicates-rows
        text: "It duplicates the 200 fraud rows 500 times so that the two classes occupy comparable space in every training batch"
      - id: fraud-heavy
        text: "It weights fraud at 250.0 and legitimate at about 0.501, so each fraud exerts roughly 499 times more gradient force"
      - id: reversed-weights
        text: "It weights the fraud class at 0.501 and the legitimate class at 250.0, so that the abundant class does not dominate the loss function"
      - id: drops-majority
        text: "It removes the majority class entirely and leaves only the 200 fraud rows for the model to learn the boundary of"
    correctOptionIds: [fraud-heavy]
    explanation: "The weight for each class is N divided by K times n_j. With N of 100,000 and two classes, the fraud class of 200 rows gets 100,000 over 400, which is 250.0, and the legitimate class of 99,800 rows gets about 0.501. The ratio is roughly 499, so every fraud instance exerts about 499 times more gradient force, pulling the separating hyperplane toward the financial boundary. This is a loss-function adjustment; it does not copy rows, reverse the weights, or throw away the majority class."
  - id: "2dffe139-3650-43cc-b4e8-b98c2ae4a904"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does SMOTE differ from random oversampling and random undersampling?"
    options:
      - id: copies-with-target
        text: "SMOTE copies each fraud row a fixed number of times, but it chooses which rows to copy so the minority class becomes as dense as the majority"
      - id: deletes-boundary
        text: "SMOTE deletes the legitimate rows that sit nearest the fraud cluster, which keeps the boundary clean without inventing any points"
      - id: interpolates
        text: "SMOTE interpolates new points between a fraud row and one of its nearest minority neighbours"
      - id: adds-noise
        text: "SMOTE resamples the fraud rows with replacement and then adds random noise to each copy in a fixed direction"
    correctOptionIds: [interpolates]
    explanation: "SMOTE, from Chawla, Bowyer, Hall and Kegelmeyer in 2002, works in continuous feature space: for a minority point it finds the k nearest minority neighbours, typically k of 5, picks one of them, draws a uniform lambda and builds a new point as x_i plus lambda times (x_zi minus x_i). Random undersampling instead deletes 99% of the legitimate transactions and throws away 99,600 rows of normal variance, while random oversampling duplicates the 200 fraud rows 500 times and produces identical replicas that invite memorisation. The lesson's safehouse analogy makes the same point: copying a safehouse teaches nothing, while a tightrope strung between two of them teaches the margin."
  - id: "510efb21-ebba-4e0a-a367-87550fd886b7"
    revision: 1
    status: active
    type: multiple-select
    prompt: "In Borderline-SMOTE, which two of these statements about the DANGER category are correct? Select every correct answer."
    options:
      - id: danger-definition
        text: "A point is in the danger zone when the number of majority neighbours among its m nearest neighbours satisfies m/2 <= m' < m"
      - id: danger-synthesis
        text: "Synthesis is performed exclusively on danger points, because that is the margin where classifiers struggle"
      - id: danger-ignored
        text: "Danger points are ignored, because synthesizing near them would pollute the legitimate cluster the way a noised point would"
      - id: danger-like-safe
        text: "Danger points are treated the same as safe points, so the core fraud clusters get densified along with the margin"
    correctOptionIds: [danger-definition, danger-synthesis]
    explanation: "Borderline-SMOTE, from Han and colleagues in 2005, counts the majority neighbours m' among the m closest points drawn from the whole dataset, both fraud and legitimate. Safe points have m/2 or fewer majority neighbours and get no synthesis; noise points, where every neighbour is legitimate, are ignored so that label noise is not amplified; danger points, with m/2 or more but fewer than m, are the only ones on which synthesis is performed, reinforcing exactly the margin where classifiers struggle. Ignoring danger points is the treatment reserved for noise, and safe points are deliberately not densified."
  - id: "697a02ad-56be-4937-b80b-a8323755ca07"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three of these are among the lesson's derived financial features, with the thresholds or settings the lesson gives them? Select every correct answer."
    options:
      - id: bcr-threshold
        text: "The balance-to-credit utilization ratio, which spikes above 0.85 as the signature of bust-out fraud"
      - id: spike-ratio-threshold
        text: "The instantaneous spike ratio, which flags a transaction more than five times the customer's average historical disbursement"
      - id: iar-smoothing
        text: "The international transaction ratio with Laplace smoothing, using alpha of 1 and beta of 50 for a domestic retail bank"
      - id: logit-range
        text: "The log-odds logit transform, which maps a probability estimate into the unit interval so models can compare it directly with a threshold"
    correctOptionIds: [bcr-threshold, spike-ratio-threshold, iar-smoothing]
    explanation: "The balance-to-credit ratio divides the balance by the credit limit plus a small epsilon, so $9,500 is 95% utilization on a $10,000 card but only 9.5% on a $100,000 line, and it spikes above 0.85 in the classic bust-out pattern of six months of building credit followed by a 48-hour spending spree. The spike ratio divides the instantaneous amount by the 30-day average transaction size and flags anything above 5.0. The international transaction ratio uses Laplace smoothing with alpha of 1 and beta of 50 for a domestic retail bank, so a customer with one transaction out of one does not read as fully international. The logit is the exception: it maps a probability into the whole real line, not the unit interval."
  - id: "a6ec181f-1441-4881-ab2e-0ee7c844b5a7"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that applying SMOTE to the whole dataset before splitting it into training and test folds is safe, because the synthetic points are derived from real fraud rows."
    answer: false
    explanation: "This is the leakage trap the lesson devotes a section to. The model in the training fold memorises the exact vector between the real point and its synthetic neighbour, so at test time it retrieves an interpolated coordinate it already saw in training rather than predicting. Test precision-recall area reports a stellar 0.992 while in production it collapses to 0.120. Preprocessing, imputation, scaling and SMOTE must all happen strictly inside the training fold of an imblearn pipeline, never on the dataset before the split."
  - id: "dd2a9412-b954-4a0f-a59a-a260de6f870b"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the lesson's sleeping lighthouse keeper analogy argues about accuracy as a metric for fraud detection, and which three metrics it puts in its place."
    sampleAnswer: "A lighthouse keeper who is right on 364 of 365 nights boasts 99.73% accuracy at year end, and that is exactly the failure mode the analogy exposes: the one night that mattered destroyed a 40-ship cargo fleet and $500,000,000 of cargo. A fraud model that always predicts the legitimate class has the same shape, scoring 99.80% accuracy while catching none of the 200 frauds and leaving $1,000,000 of chargebacks uncollected. Accuracy is computed over the majority class, so with a base rate of 0.1% to 0.2% it is almost guaranteed to look excellent while the only failure that matters is invisible. The lesson replaces it with three metrics: precision-recall area, which is Average Precision and is the mandatory primary offline metric under SOX 404 and PCI DSS; F-Beta, with a beta of 2 when recall matters more than precision; and total expected financial cost, computed from the asymmetric cost matrix of $5,000 for a false negative and $15 for a false positive."
    explanation: "A strong answer must use the analogy to make the general point that a metric averaging over the routine case hides the rare case that carries the loss, then give the specific fraud consequence of a model that is 99.80% accurate while catching no fraud, and name all three replacement metrics: PR-AUC (Average Precision), F-Beta with beta of 2, and total expected financial cost. It should note that accuracy is not unavailable or wrong arithmetic, it is simply measuring the majority class, and that the base rate of 0.1% to 0.2% is what makes it so flattering."
  - id: "f61c8006-db62-4508-9f9f-be90155a8f93"
    revision: 1
    status: active
    type: free-recall
    prompt: "Walk through the lesson's Model A versus Model B comparison: what each model is, what it scores, what it costs in dollars, and what the threshold sweep adds on top."
    sampleAnswer: "Model A is the naive classifier that predicts the majority class: 99.80% accuracy, 0.00% recall, 0.00% precision, an F1 of 0.00, zero frauds caught out of 200, and a total cost of $1,000,000 in missed fraud. Model B is the cost-sensitive pipeline with SMOTE, balanced class weights and a tuned threshold of 0.040: accuracy 99.37%, a drop of only 0.43 percentage points, but recall of 85.00% with 170 of the 200 frauds caught, precision of 22.08% with 600 false alarms, and an F1 of 35.05%. Its total cost is $150,000 of missed fraud plus $11,550 of investigation friction, which is $161,550, a net benefit of $838,450 over Model A. The threshold sweep then makes the operating point explicit: across 1,000 discrete thresholds from 0.001 to 0.999 the total dollar cost bottoms out at tau of 0.040, far below the default threshold of 0.50, and the curve shows what the default threshold would have cost instead."
    explanation: "A strong answer must give both models' full score lines and their dollar totals: Model A at 99.80% accuracy, 0.00% recall, 0.00% precision and $1,000,000 of missed fraud, and Model B at 99.37% accuracy, 85.00% recall, 22.08% precision, 35.05% F1 and $161,550 of total cost, for a net benefit of $838,450. It must explain that Model B is SMOTE plus balanced class weights plus a tuned threshold, that the 0.43 percentage point accuracy loss is a fair price for intercepting 170 of 200 frauds, and that the threshold sweep over 1,000 values from 0.001 to 0.999 locates the cost minimum at 0.040 rather than the default 0.50."
```

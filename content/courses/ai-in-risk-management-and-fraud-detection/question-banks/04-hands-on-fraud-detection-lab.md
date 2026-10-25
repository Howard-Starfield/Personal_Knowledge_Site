---
id: "c3887912-fd81-413c-a615-878e7b40bd75"
title: "Hands-On Implementation Lab: Building a Production-Ready Credit Card Fraud Detection Engine: Question Bank"
description: "Practises the seven lab phases end to end: typed data contracts, synthetic imbalance, domain features, unsupervised screening, class-weighted training, cost-calibrated thresholds and signed incident dispatch."
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

These questions practise [[courses/ai-in-risk-management-and-fraud-detection/lessons/04-hands-on-fraud-detection-lab|Hands-On Implementation Lab: Building a Production-Ready Credit Card Fraud Detection Engine]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "a198b315-8ca0-46dc-b0ac-ed88a1a7ad42"
    revision: 1
    status: active
    type: single-choice
    prompt: "Phase 2 builds a synthetic dataset of 10,000 transactions with a 0.50% fraud base rate, then demonstrates the accuracy paradox with a naive predictor that calls every transaction legitimate. What does the lab report?"
    options:
      - id: ninety-nine-ninety-five
        text: "99.95% accuracy with a chargeback loss of $5,000.00, because only one fraud in the set is large enough to matter"
      - id: accuracy-and-loss
        text: "99.50% accuracy and $250,000.00 of uncaught fraud, because all 50 frauds are missed at $5,000 each"
      - id: accuracy-no-loss
        text: "99.50% accuracy and no loss at all, because the legitimate transactions make up the overwhelming majority of the set"
      - id: fifty-fifty
        text: "50.00% accuracy and $250,000.00 of uncaught fraud, because the naive predictor has to guess the label of every row"
    correctOptionIds: [accuracy-and-loss]
    explanation: "The naive zero-fraud predictor scores 9,950 true negatives over 10,000 rows, which is 99.50% accuracy, and its recall is 0 out of 50, or 0.0%. At $5,000 of loss per incident that is 50 times 5,000, so $250,000.00 of unmitigated chargeback loss on a single synthetic cohort. The point of the phase is that an auditor shown 99.50% sees a stellar score while the model has let every single attack through. Accuracy here is not measuring anything the business cares about."
  - id: "0bb03fa0-76c4-476b-9810-9ae6f4d591e0"
    revision: 1
    status: active
    type: single-choice
    prompt: "In Phase 5 the training partition holds 7,500 transactions, of which 7,462 are legitimate and 38 are fraudulent. What does class_weight='balanced' do to the two classes?"
    options:
      - id: reversed
        text: "It weights the legitimate class at 98.6842 and the fraud class at 0.5025, so the abundant class dominates the split criteria"
      - id: unit-weight
        text: "It leaves both classes at unit weight, and the imbalance is handled later by resampling the test partition"
      - id: fraud-heavy
        text: "It weights the fraud class at 98.6842 against 0.5025 for legitimate transactions"
      - id: share-weighted
        text: "It weights each class by its share of the total, so the 38 fraudulent rows are down-weighted to reflect their rarity"
    correctOptionIds: [fraud-heavy]
    explanation: "The inverted frequency weight is w_j = N over K times n_j. With N of 7,500 and two classes, the legitimate class of 7,462 rows gets 7,500 over 14,924, which is 0.5025, and the fraud class of 38 rows gets 7,500 over 76, which is 98.6842. Every fraudulent transaction therefore carries nearly 99 times the weight of a legitimate one when Gini impurity is computed, so the trees are pushed towards splits that isolate the minority class. Before the weights are applied the majority class exerts 196.4 times more influence over the split criteria, which is exactly the imbalance the phase exists to defeat."
  - id: "04ef8138-58c2-497b-964a-f369e809a97b"
    revision: 1
    status: active
    type: single-choice
    prompt: "The Phase 6 backtest compares the default threshold of 0.50 with a calibrated threshold of 0.015 on a test partition of 2,500 transactions. What does it report?"
    options:
      - id: all-caught
        text: "At 0.015 every one of the 12 frauds is caught, and the loss falls from $10,015.00 to $1,020.00"
      - id: free-false-alarms
        text: "At 0.015 every one of the 12 frauds is caught, and the loss falls from $10,015.00 to $15.00 because false alarms are free"
      - id: default-catches-all
        text: "At 0.50 every one of the 12 frauds is caught, and the loss falls to $1,020.00 once the threshold is tightened"
      - id: still-misses-two
        text: "At 0.015 two frauds are still missed, and the loss falls from $10,015.00 to $1,020.00 because recall improves"
    correctOptionIds: [all-caught]
    explanation: "At the default threshold of 0.500 the confusion matrix is 10 true positives, 1 false positive, 2 false negatives and 2,487 true negatives, giving precision of 90.9% and recall of 83.3%, and a total loss of $10,015.00. At the calibrated threshold of 0.015 it is 12 true positives, 68 false positives, zero false negatives and 2,420 true negatives, precision of 15.0% and recall of 100.0%, and a total loss of $1,020.00, because 68 false alarms at $15 each cost $1,020.00 while the missed frauds cost nothing. The net benefit is $8,995.00, an 89.8% reduction in net risk exposure on the test set alone."
  - id: "6348fe5e-d215-4e15-ba95-508f6f7fd0f1"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lab derives the Bayesian cost-optimal decision threshold from its cost matrix. What does it get, and why?"
    options:
      - id: half
        text: "0.500, because a probability above one half is the only defensible point at which to call a transaction fraudulent"
      - id: five-percent
        text: "0.050, because a one-in-twenty interception rate is the most the review desk can absorb"
      - id: grid-search
        text: "0.015, because that is the value the grid search over the test partition returns"
      - id: three-per-mille
        text: "0.003, because the cost of a false alarm at $15 is set against the cost of a missed fraud at $5,000"
    correctOptionIds: [three-per-mille]
    explanation: "The derivation is (C_FP minus C_TN) over (C_FP minus C_TN plus C_FN minus C_TP), which with 15, 0, 5,000 and 15 gives 15 over 5,000, or 0.003. The lab spells out the consequence: any transaction with a fraud probability greater than 0.3% warrants automated interception or step-up authentication. The empirical grid search over the test partition then lands on 0.015 rather than 0.003, because discrete sample sizes make the empirical optimum coarser than the theoretical one. Both point the same way, and both are far below the default threshold of 0.50."
  - id: "ef449dbf-1dd0-4e06-b423-95078305990c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lab apply Laplace smoothing to the cross-border activity ratio?"
    options:
      - id: ratio-exceeds-one
        text: "Because the raw ratio can exceed 1.0 when a card makes more international purchases than it has transactions in total"
      - id: young-account
        text: "Because a young account with one international purchase out of one transaction would otherwise read as 100% international"
      - id: currency-conversion
        text: "Because international purchases carry a different currency, so the amounts have to be converted before the ratio can be computed"
      - id: scaler-requirement
        text: "Because the ratio has to be scaled with a RobustScaler before it can be used inside the Isolation Forest"
    correctOptionIds: [young-account]
    explanation: "The raw ratio N_intl over N_total suffers catastrophic variance on young accounts: one international purchase out of one transaction reads as 1.0, and zero out of one reads as 0.0, with nothing in between. The lab applies a prior pseudocount of alpha 1 and beta 2, so the ratio becomes (N_intl plus 1) over (N_total plus 2). An account with no prior transactions gets 0.50, an uninformative prior, and as N_total approaches 500 the ratio converges smoothly to the true empirical frequency. It is a regularisation of the denominator, not a currency or scaling problem."
  - id: "aff980ec-57e8-48ff-b7ef-06d51a8a1700"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lab use a RobustScaler on the engineered features rather than a StandardScaler?"
    options:
      - id: symmetric-features
        text: "Because the StandardScaler assumes a normal distribution and the engineered features are perfectly symmetric, so the median is the safer choice anyway"
      - id: removes-outliers
        text: "Because a RobustScaler removes the outliers entirely, so a $4,200 fraudulent authorization can never distort the tree splits"
      - id: inflates-mean-std
        text: "Because extreme outliers inflate the mean and standard deviation a z-score uses"
      - id: forest-requirement
        text: "Because the Isolation Forest requires every feature to be scaled to the unit interval before it can compute a path length"
    correctOptionIds: [inflates-mean-std]
    explanation: "Transaction amounts and velocity counts follow severe power-law and lognormal distributions with extreme outliers, and a z-score divides by the sample standard deviation, which those outliers inflate along with the sample mean. The RobustScaler centres on the median and scales by the interquartile range, so the feature space is not distorted by a handful of extreme values. It does not delete outliers, and no scaler is a precondition for an Isolation Forest. The governance checklist adds the other half of the discipline: fit the RobustScaler strictly on the training partition, with no test-set distribution leakage."
  - id: "7b936f74-b71f-4075-ba12-437c3fcc790d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lab's Phase 4 Isolation Forest screening layer contribute to the pipeline?"
    options:
      - id: zero-day-screen
        text: "A zero-day screen over 150 trees with contamination set to 0.01, feeding a continuous anomaly score into the telemetry envelope"
      - id: supervised-probability
        text: "A supervised fraud probability for the transaction, trained on the chargeback dispute records the lab generates in Phase 5"
      - id: final-blocking
        text: "The final blocking decision, because a transaction scoring above the anomaly threshold is frozen before the supervised model ever sees it"
      - id: feature-ranking
        text: "A set of Gini impurity rankings over the engineered features, which is how the lab identifies its most predictive columns"
    correctOptionIds: [zero-day-screen]
    explanation: "The unsupervised layer exists because supervised classifiers need historical labels, and a zero-day technique such as attacking an unmonitored merchant category code or spoofing a mobile wallet has no labels yet. The lab trains 150 isolation trees and calibrates contamination to 0.01 so the screen isolates the top 1% most extreme out-of-distribution events, and it feeds the continuous decision score back into the telemetry envelope for the supervised ensemble and the compliance audit log. The lab's own diagram shows the shape: a dense in-distribution event isolates at a path length of about 12 for a score near 0.20, and a sparse outlier at about 2 for a score near 0.85."
  - id: "c72db02c-8bd8-4996-aa51-1934b0fa91d0"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two of these are on the lab's production hardening and regulatory governance checklist? Select every correct answer."
    options:
      - id: itgc-traceability
        text: "SOX 404 ITGC traceability, logging the random seed and the dataset version hash alongside the git commit SHA so the backtest can be reproduced"
      - id: preprocessing-isolation
        text: "SR 11-7 preprocessing isolation, fitting the RobustScaler strictly on the training partition so the test distribution does not leak"
      - id: daily-retrain
        text: "A requirement to retrain the Random Forest every 24 hours, because fraud patterns drift faster than the weekly release cadence"
      - id: disable-unsupervised
        text: "A requirement to disable the Isolation Forest in production, so that only audited supervised models make blocking decisions"
    correctOptionIds: [itgc-traceability, preprocessing-isolation]
    explanation: "The checklist opens with SOX 404 ITGC traceability, asking whether the random seed of 42 and the dataset version hash are logged in the model registry next to the git commit SHA, because an auditor running the harness has to see the same confusion matrices and cost figures down to the cent. The SR 11-7 item asks whether the RobustScaler is fit strictly on the training partition. The other items are not on the list: there is no daily retraining mandate, and the whole point of the defence-in-depth architecture is that the unsupervised Isolation Forest screens for zero-day anomalies in parallel with the supervised ensemble rather than being switched off."
  - id: "75e8157c-41e8-4d52-87b9-ee38264f1e72"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three of these are among the lab's controls on the incident alerting and cryptographic dispatch path? Select every correct answer."
    options:
      - id: pii-redaction
        text: "Zero-trust PII redaction, hashing the account identifier with a salted SHA-256 so no plaintext identifier reaches the prompt"
      - id: hmac-signature
        text: "Cryptographic non-repudiation, signing every payload with an HMAC-SHA256 that the downstream webhook verifies in constant time"
      - id: replay-defence
        text: "A replay defence that rejects any webhook whose timestamp drifts more than 300 seconds from the server clock, alongside fail-closed behaviour"
      - id: downstream-enrichment
        text: "A rule that lets the downstream banking API verify the account identifier directly so it can enrich the alert with the cardholder's name"
    correctOptionIds: [pii-redaction, hmac-signature, replay-defence]
    explanation: "Three controls sit on that path. Zero-trust PII redaction satisfies PCI DSS 4.0 and GLBA by hashing the account identifier with a salted SHA-256, producing a token, so no plaintext identifier enters a generative prompt. Cryptographic non-repudiation signs each payload with an HMAC-SHA256 over the payload JSON under an enterprise secret key, and the downstream core banking webhook verifies that signature in constant time before executing any hold, because a spoofed alert could otherwise freeze a whole cardholder base. The fiduciary isolation rules add a cryptographic replay defence with an authorised UTC timestamp and a unique event nonce, rejecting any drift beyond 300 seconds, plus fail-closed behaviour when validation or parsing fails. The downstream service is not given the identifier so it can enrich the alert."
  - id: "ec2fb5c1-3be8-4cb1-9b8c-18972e9a0822"
    revision: 1
    status: active
    type: true-false
    prompt: "The lab reports that the downstream core banking API can execute a card freeze as soon as the phase 7 webhook arrives, because the account identifier in the payload has already been hashed."
    answer: false
    explanation: "Hashing protects the personal data, it does not authenticate the sender. Every alert payload is signed with an HMAC-SHA256 over the payload JSON under an enterprise secret key, and the downstream webhook verifies that signature in constant time before executing any hold or account suspension. The fiduciary isolation rules add an authorised UTC timestamp and a unique event nonce, rejecting any webhook whose timestamp drifts more than 300 seconds from the server clock, plus a fail-closed architecture in which a failure of signature validation or schema parsing terminates the webhook without modifying account state, and dual-key isolation so the signing secret sits in a hardware security module or secrets manager rather than beside the ordinary application keys."
  - id: "4fe0d2d3-3b94-4062-842c-aa44271766de"
    revision: 1
    status: active
    type: free-recall
    prompt: "Summarise the lab's reported results for the supervised ensemble and for the two thresholds, and explain why the calibrated threshold is the better operating point despite its much lower precision."
    sampleAnswer: "On the 2,500-row test partition, which holds 2,488 legitimate and 12 fraudulent transactions, the supervised ensemble reports a ROC-AUC of 0.9976 and a precision-recall average precision of 0.9031. The strongest features by Gini impurity reduction are is_foreign_country at 32.65%, amount at 22.91%, card_not_present at 13.58%, velocity_1h at 11.77%, balance_to_credit_ratio at 11.72%, intl_activity_ratio at 4.49% and avg_tx_size_ratio at 2.87%. At the default threshold of 0.50 the engine catches 10 of the 12 frauds with 1 false alarm, so precision is 90.9% and recall 83.3%, but the 2 missed frauds cost $10,000 and the false alarm $15, for a total loss of $10,015.00. At the calibrated threshold of 0.015 it catches all 12 frauds with 68 false alarms, precision falls to 15.0% and recall reaches 100.0%, and the total loss is $1,020.00. The calibrated point is better because the dollar asymmetry dominates the precision number: a false alarm costs $15 and a missed fraud costs $5,000, so trading 67 extra automated challenges for two extra frauds caught saves $8,995.00, an 89.8% reduction in net risk on the test set alone, and over $3,500,000 across an annual volume of 1,000,000 transactions."
    explanation: "A strong answer must give the ensemble's headline numbers (ROC-AUC of 0.9976 and average precision of 0.9031 on the 2,500-row partition), the leading feature (is_foreign_country at 32.65% of the Gini impurity reduction), and the full arithmetic of both thresholds: 10 true positives, 1 false positive and 2 false negatives at $10,015.00 for the default, against 12 true positives, 68 false positives and zero false negatives at $1,020.00 for the calibrated one, with the $8,995.00 net benefit and the 89.8% reduction. It must then explain that precision is not the objective, that the $15 against $5,000 asymmetry makes 68 cheap challenges preferable to two expensive misses, and that the saving scales to over $3,500,000 a year at a volume of 1,000,000 transactions."
  - id: "0b55baca-7368-413b-9937-61a5ad0d7b3e"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the lab's argument for engineering domain features instead of feeding the raw transaction attributes into the model, and describe what each of the four features measures."
    sampleAnswer: "The lab's position is that raw attributes are insufficient because experienced fraudsters tailor their amounts to sit inside legitimate retail ranges, and what exposes fraud is behavioural deviation relative to an entity's own historical baseline. The first feature is revolving credit line utilization, the current balance divided by the credit limit, which exposes a syndicate draining a stolen card: the legitimate baseline sits between 5% and 65% of the line while overt attacks push 75% to 96%. The second is the relative transaction size multiplier, the current amount divided by the customer's own average spend, with the denominator floored at 25.0 so a brand-new account cannot produce an infinite multiplier; a $500 purchase is ordinary for an executive who routinely spends $400 and an extreme 33.3 times anomaly on a card that averages $15. The third is the Laplace-smoothed cross-border ratio, (N_intl plus 1) over (N_total plus 2), which stops a young card with one international purchase out of one from reading as 100% international and converges to the true frequency as history accumulates. The fourth is RobustScaler, because amounts and velocity counts follow severe power-law and lognormal distributions whose extreme outliers would inflate the mean and standard deviation a z-score relies on, so the features are centred on the median and scaled by the interquartile range."
    explanation: "A strong answer must state the lab's premise, that experienced fraudsters tailor amounts to legitimate ranges so only deviation from the entity's own history exposes them, and then cover all four features with their arithmetic: utilization as balance over credit limit against a legitimate 5% to 65% band, the size multiplier over the customer's own average with the 25.0 floor and the $500 on a $15 average example, the Laplace-smoothed cross-border ratio with its uninformative prior of 0.50, and RobustScaler replacing the mean and standard deviation with the median and interquartile range. It should also note that the resulting feature set is what the Phase 5 model actually consumes, so the engineering and the training are one design rather than two."
```

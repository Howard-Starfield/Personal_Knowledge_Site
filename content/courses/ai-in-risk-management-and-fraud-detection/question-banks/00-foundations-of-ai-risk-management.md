---
id: "b610fb28-2f51-4a75-bf04-a89c556acbc2"
title: "Foundations of Modern Financial Risk Management: The Breakdown of Static Rules & Manual Triage: Question Bank"
description: "Practises why static threshold rules fail against structured adversaries, the base-rate arithmetic behind alert fatigue, and the three-tier AI risk lifecycle."
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

These questions practise [[courses/ai-in-risk-management-and-fraud-detection/lessons/00-foundations-of-ai-risk-management|Foundations of Modern Financial Risk Management: The Breakdown of Static Rules & Manual Triage]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "02abf626-8e28-4ca1-b5d8-31d5abb67594"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $9,500 wire arrives from a brand-new account on a high-risk ASN. The engine's only rule is the orthogonal threshold on amount, $x_1 >= 10,000 USD. What does the lesson say happens to that wire?"
    options:
      - id: amount-and-age
        text: "It is flagged and blocked, because the threshold on amount is evaluated together with the account-age feature inside the same conjunction of rules"
      - id: below-threshold
        text: "It passes, because the amount sits just under the $10,000 threshold"
      - id: undefined-gradient
        text: "It is flagged and blocked, because the gradient of the step function is undefined at the discontinuity and the engine refuses to score anywhere near it"
      - id: routed-to-tier2
        text: "It is routed to Tier 2 for asynchronous behavioural scoring, because every payment from a newly registered counterparty is filtered before clearing"
    correctOptionIds: [below-threshold]
    explanation: "The lesson's axis-aligned rigidity example says the opposite of intuition: a $9,500 transaction from a brand-new account on a high-risk ASN may carry 100 times more empirical risk than a $12,000 transaction from an audited Fortune 500 enterprise, yet the orthogonal threshold on Amount permits the first and flags the second. The rule tests one axis, so the other risk signals are invisible to it. Rushing it to Tier 2 is a modern behaviour the legacy rule engine does not have, and the undefined gradient at the discontinuity is a property of the mathematics, not a reason to block."
  - id: "ffffad2e-f90e-4288-845d-cf5f1098a84c"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked example a clearing house processes 10,000,000 transactions a month at a 0.1% fraud base rate, with 98% sensitivity and 98% specificity. How many alerts does the engine raise across the month?"
    options:
      - id: true-positives-only
        text: "9,800, because that is the number of fraudulent transactions the classifier successfully intercepts every month"
      - id: false-positives-only
        text: "199,800, because the 2% false-positive rate is applied to the 9,990,000 legitimate transactions in the volume"
      - id: all-legitimate
        text: "9,790,200, because every legitimate transaction that the classifier correctly clears still has to be recorded as an alert"
      - id: all-alerts
        text: "209,600, because 9,800 true positives and 199,800 false positives are both raised as alerts"
    correctOptionIds: [all-alerts]
    explanation: "The lesson counts both kinds of raised alert. True positives are 10,000 times 0.98 = 9,800, false negatives are 200, false positives are 9,990,000 times 0.02 = 199,800, and true negatives are 9,790,200. The alerts the analysts receive are the 9,800 true positives plus the 199,800 false positives, which is 209,600 a month. Quoting only 9,800 forgets the false positives that create the fatigue, and 199,800 on its own forgets the frauds that were actually caught."
  - id: "a2871be3-a591-44ca-805e-9a53636a5fca"
    revision: 1
    status: active
    type: single-choice
    prompt: "A quarterly audit samples 500 transactions from a population of 1,000,000 in which exactly 50 are fraudulent. What probability does the lesson report for the sample containing no fraud at all?"
    options:
      - id: sample-too-small
        text: "97.53%, because a sample that small almost never reaches the fraud population"
      - id: five-percent-sample
        text: "8.2%, because the lesson computes that miss probability for the larger sample of 50,000 transactions it also discusses"
      - id: population-rate-carries
        text: "0.05%, because the population fraud rate of 50 in a million simply carries over into the sample unchanged"
      - id: even-coin-flip
        text: "50.0%, because when fraud is this rare in the population the honest prior on any single draw is an even coin flip"
    correctOptionIds: [sample-too-small]
    explanation: "This is the lesson's hypergeometric demonstration. With 50 fraudulent transactions hidden in a million and only 500 sampled, the chance of touching none of them is 97.53%. The 8.2% figure belongs to the 50,000-transaction (5%) sample, which is still a spot check rather than continuous coverage. The population rate does not transfer to a sample that never overlaps the fraud, and a coin flip is not a prior for a draw you can compute."
  - id: "93e0ed9a-8696-44b5-81fa-a5ea703e91b5"
    revision: 1
    status: active
    type: single-choice
    prompt: "Tier 2 fuses the unsupervised and the supervised engines into a single composite risk score. Which formula does the lesson give for that composite?"
    options:
      - id: equal-mean
        text: "The unweighted mean of the Isolation Forest score, the LOF score and the supervised fraud probability, so that each engine contributes one third of the composite"
      - id: max-of-three
        text: "The maximum of the three normalised engine scores, so that one strong signal is enough to escalate the transaction to Tier 3"
      - id: weighted-sum
        text: "A weighted sum of the three engine scores, with the weights summing to 1.0"
      - id: product-of-three
        text: "The product of the three normalised engine scores, so that weak evidence on any one axis suppresses the composite risk score"
    correctOptionIds: [weighted-sum]
    explanation: "The lesson defines the composite as S_composite = w1 times S_IForest + w2 times S_LOF + w3 times P_Supervised(Fraud given x), with the weights summing to 1.0 and each individual score normalised to the unit interval. An equal mean is one possible weighting, not the definition, and the lesson does not prescribe it. Taking a maximum or a product changes the semantics: a maximum lets one engine decide alone, and a product lets the quietest engine veto the others."
  - id: "08b16049-b844-4728-bb0a-0625094bcc89"
    revision: 1
    status: active
    type: single-choice
    prompt: "Tier 3 turns the composite score into an action through automated webhooks. Which band freezes a disbursement and pages corporate treasury?"
    options:
      - id: silent-band
        text: "S below 0.30, because that band is logged to the analytics warehouse and silently approved"
      - id: freeze-band
        text: "S at or above 0.75"
      - id: friction-band
        text: "S between 0.30 and 0.75, because that band is the one where step-up multi-factor authentication is demanded"
      - id: mid-band
        text: "S between 0.50 and 0.70, because the lower band only triggers vendor dual authorisation rather than a full freeze"
    correctOptionIds: [freeze-band]
    explanation: "The lesson's three webhook bands are: S below 0.30 is silently approved and logged; S from 0.30 up to but not including 0.75 adds friction, such as step-up multi-factor authentication or a vendor dual-authorisation workflow; and S at or above 0.75 freezes the disbursement, dispatches a high-priority PagerDuty or Slack alert to corporate treasury, and pushes a pre-compiled forensic docket to a senior risk manager. The 0.30 to 0.75 band is the friction band, not the freeze band."
  - id: "edc4419a-d35d-4e05-9bab-02bff42ffac5"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the $4,800,000 synthetic vendor invoice attack, what did the legacy rule engine do with the payment?"
    options:
      - id: paid-it
        text: "It paid the invoice, because the amount matched the purchase order and the vendor name matched the master ledger"
      - id: paid-it-quietly
        text: "It paid the invoice without comment, and the fraud only surfaced 75 days later during quarterly audit reconciliation"
      - id: froze-on-account-age
        text: "It froze the disbursement, because the beneficiary account had been open for only 14 days with no historical transaction edges"
      - id: froze-on-time-of-day
        text: "It froze the disbursement, because the request arrived at 02:14 AM from an unmapped residential internet service provider"
    correctOptionIds: [paid-it]
    explanation: "The scenario's whole point is that the legacy engine saw nothing wrong: the amount matched the purchase order and the vendor name matched the master ledger, so the payment went out and the fraud was only found 75 days later. The modern engine froze the disbursement within 350 milliseconds, but it did so on the combination of signals the legacy rule had no way to read, not on the account age or the time of day alone."
  - id: "d85ec52a-15b6-4d1c-832d-46e268a3d060"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is Tier 1 responsible for inside the three-tier lifecycle?"
    options:
      - id: full-scoring
        text: "Scoring every transaction with the full supervised ensemble, because the composite score has to exist before anything can be authorised"
      - id: hold-for-humans
        text: "Routing the top 1% to 2% of transactions to Tier 2 while holding the rest for a human analyst to review by hand"
      - id: fast-clearance
        text: "Clearing 98% to 99% of benign traffic in under 50 milliseconds and routing the top 1% to 2% to Tier 2"
      - id: freeze-webhook
        text: "Freezing every transaction whose composite score reaches 0.75, because the freezing webhook is the only thing Tier 1 is allowed to do"
    correctOptionIds: [fast-clearance]
    explanation: "Tier 1 sits on the authorization path with a hard latency budget of under 50 milliseconds. It clears 98% to 99% of unambiguously benign traffic without human intervention, enriches the payload with streaming counters, and isolates the top 1% to 2% of anomalous or high-uncertainty transactions for Tier 2. It reaches that speed with an in-memory Redis or Dragonfly cache and low-depth Isolation Forest trees of depth 4 or less, not a full ensemble."
  - id: "be4df9f5-0a6d-4a8e-bb61-bdcb1c41b582"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two of these are behaviours the lesson attributes to the Tier 2 domain-specific feature set? Select every correct answer."
    options:
      - id: velocity-ratio
        text: "Velocity ratios comparing short-term transaction volume against a long-term hourly baseline"
      - id: categorical-entropy
        text: "Categorical entropy of the merchant category codes accessed over a rolling 48-hour window"
      - id: password-entropy
        text: "Shannon entropy of the account owner's password strength, sampled at every authorization attempt"
      - id: dollar-threshold
        text: "A single hard dollar threshold applied to the transaction amount before any ratio is computed"
    correctOptionIds: [velocity-ratio, categorical-entropy]
    explanation: "Tier 2 derives contextual ratios instead of evaluating scalar amounts. Its four features are velocity ratios, the balance-to-credit utilization velocity, the categorical entropy of merchant category codes over a rolling 48-hour window, and entity graph centrality. Password strength is not a transaction feature the lesson mentions, and a single hard dollar threshold is exactly the static rule the lesson argues against."
  - id: "5ae7b174-5321-4329-b5c6-32664cd27cb5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the lesson's worked high-volume clearing example are correct? Select every correct answer."
    options:
      - id: base-rate
        text: "The fraud base rate in the volume is 0.1%, which is 10,000 fraudulent transactions out of 10,000,000"
      - id: false-positive-count
        text: "A 2% false-positive rate on 9,990,000 legitimate transactions produces 199,800 false positives"
      - id: afi-share
        text: "The alert false-positive rate is 199,800 out of 209,600 total alerts, which the lesson reports as roughly 95.32%"
      - id: mostly-genuine
        text: "Because the classifier is 98% specific, the vast majority of the alerts it raises are genuine fraud"
    correctOptionIds: [base-rate, false-positive-count, afi-share]
    explanation: "All three figures come straight from the worked derivation: a 0.1% base rate over 10,000,000 transactions gives 10,000 frauds; the 2% false-positive rate over 9,990,000 legitimate transactions gives 199,800 false positives; and those 199,800 against 209,600 total alerts give the roughly 95.32% alert false-positive rate the lesson calls the Alert Fatigue Index. High specificity does not make the alerts mostly genuine, because the base rate is so low that the false positives outnumber the true positives by a factor of more than twenty."
  - id: "e2015f60-ff46-4b67-9593-b58c8fa81a4d"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that a rule engine with 98% sensitivity and 98% specificity produces alerts of which only 4.68% are genuine fraud."
    answer: false
    explanation: "It is the other way round. The Alert Fatigue Index is defined as FP divided by TP plus FP, which is 199,800 out of 209,600, or roughly 95.32%. Only about 4.68% of the alerts raised are genuine fraud. The confusion in the statement comes from reading the 4.68% as the share of alerts that are genuine when it is actually the share that are false."
  - id: "a73c55df-765e-465f-b288-b8637ec9ffca"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain what the walk-through metal detector and the 3D Volumetric Doppler Radar array each model about fraud detection, and what the lesson says the enterprise consequence of the difference is."
    sampleAnswer: "The walk-through metal detector models the legacy rule engine: a one-dimensional scalar sieve that tests a single value against a fixed threshold, so it only ever sees the metal it happens to be pointed at, exactly as a static threshold on amount only ever sees the dollar figure. The 3D Volumetric Doppler Radar array models the modern engine: it tracks a body continuously in three-dimensional context, so it can separate the ordinary commuter from the person who never touches the belt at all. The enterprise consequence is that the static rule misses structured evasion, because an adversary who maps the threshold simply sits just below it, while the contextual engine compresses false positives by 80% to 90% and surfaces structured smurfing attacks immediately."
    explanation: "A strong answer must name both sides of the analogy and the consequence the lesson draws from it. The walk-through metal detector stands for the legacy rule engine: a one-dimensional scalar sieve that tests one value against a fixed threshold, so it only ever sees what it is pointed at. The 3D Volumetric Doppler Radar array stands for the modern engine, which tracks a body continuously in three-dimensional context and can separate the ordinary commuter from the person who never touches the belt. The consequence is that the static rule is evaded by structured attacks, because an adversary who maps the threshold simply operates just below it, while the contextual engine compresses false positives by 80% to 90% and surfaces structured smurfing attacks immediately."
  - id: "ae9c32da-cefe-4ce1-b00e-e35f939af279"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the lesson's chain from 9,527 alerts a day to roughly 298 full-time investigators, and say what sensory habituation does to the quality of the investigations that follow."
    sampleAnswer: "The 209,600 monthly alerts spread across the 22 working days in the month give about 9,527 alerts a day. At 15 minutes per alert an analyst gets through only about 32 alerts a day, so 9,527 a day needs roughly 298 full-time equivalents. Cut the handling time to 3 minutes and 160 alerts a day are coverable by about 60 investigators at $75,000 fully loaded, which is about $4,500,000 a year; cut it to 1 minute and a team of 20 costs about $1.5 million a year. Sensory habituation is the psychological collapse of that operation: when the same false alarm shape arrives thousands of times, attention degrades and the reviewer rubber-stamps instead of investigating, so genuine fraud gets waved through by a tired human exactly as a static rule would have waved it through."
    explanation: "A strong answer must carry both the arithmetic and the psychological point. The 209,600 monthly alerts spread across the 22 working days give about 9,527 a day, and at 15 minutes per alert an analyst clears only about 32 a day, which is why roughly 298 full-time equivalents are needed. At 3 minutes an alert it is 160 a day, coverable by about 60 investigators at $75,000 fully loaded for roughly $4,500,000 a year, and at 1 minute a team of 20 costs about $1.5 million a year. Sensory habituation is the collapse that follows: the same false alarm shape seen thousands of times degrades attention until the reviewer rubber-stamps, so genuine fraud is waved through by a tired human."
```

---
id: "4f6da57b-ee93-46f6-b2e4-c6b911136217"
title: "Algorithmic Anomaly Detection: Mathematical Mechanics of Isolation Forests, LOF & Ensemble Trees: Question Bank"
description: "Practises the Isolation Forest path-length score, the Local Outlier Factor density ratio, Random Forest variance and feature attribution, and the hybrid Tier 2 scoring topology."
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

These questions practise [[courses/ai-in-risk-management-and-fraud-detection/lessons/01-anomaly-detection-algorithms-theory|Algorithmic Anomaly Detection: Mathematical Mechanics of Isolation Forests, LOF & Ensemble Trees]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "424eaaf3-6200-4df6-80e3-db05431f2a37"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson defines the Isolation Forest anomaly score as 2 raised to the power of minus the average path length divided by c(n). What happens to the score as the average path length grows?"
    options:
      - id: falls-to-zero
        text: "It falls toward zero, because a point buried deep in a dense region needs many random cuts to isolate"
      - id: rises-to-one
        text: "It rises toward one, because a longer average path length means the point survived more random splits and is therefore more unusual than the rest of the room"
      - id: always-half
        text: "It settles at exactly 0.5 for every point, because the normalization constant c(n) is chosen so that all scores collapse onto one operating point"
      - id: rises-because-c-shrinks
        text: "It rises toward one, because c(n) shrinks as the sample size shrinks, which makes the path ratio smaller for a deeply buried point"
    correctOptionIds: [falls-to-zero]
    explanation: "The score is 2 to the power of minus E[h(x)] divided by c(n), so a longer path makes the exponent more negative and the score smaller. The lesson's limit behaviour is explicit: as the path length approaches zero the score approaches 1.0 for a definitive anomaly, a path length equal to c(n) gives exactly 0.5 for a structural inlier, and a path length approaching the deepest possible value drives the score toward zero. The ratio, not the raw path length, is what the score compares."
  - id: "953315f3-2284-4652-95cb-dcfa62b0e589"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked Isolation Forest example, Event A is the suspect midnight wire with an average path length of 3.2 and Event B is the routine retail point-of-sale transaction with an average path length of 10.4. What anomaly scores does the lesson compute for them?"
    options:
      - id: ratios-not-scores
        text: "Event A scores about 0.3124 and Event B scores about 1.0152, because those numbers are the normalized path ratios rather than the scores themselves"
      - id: swapped
        text: "Event A scores about 0.4948 and Event B scores about 0.8053, because the shorter path length produces the lower score"
      - id: both-half
        text: "Both events score about 0.50, because the normalization constant c(256) of 10.2448 divides both path lengths down to the same value"
      - id: a-high-b-low
        text: "Event A scores about 0.8053 and Event B scores about 0.4948, so only Event A crosses the 0.60 critical threshold"
    correctOptionIds: [a-high-b-low]
    explanation: "Dividing 3.2 by c(256) of 10.2448 gives the path ratio 0.312354, and 2 to the power of minus 0.312354 gives about 0.8053, above the 0.60 critical threshold, so Event A is flagged and routed to Tier 2 step-up authentication. Dividing 10.4 by 10.2448 gives 1.015152, and 2 to the power of minus 1.015152 gives about 0.4948, which is the structural-inlier region, so the routine transaction clears Tier 2. The two numbers 0.3124 and 1.0152 are the intermediate ratios, not the scores."
  - id: "d3d50bad-d7a7-4995-a2f7-99434374e107"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's 20 Questions analogy says a person alone on a balcony needs far fewer random cuts to isolate than a banker in a crowded ballroom. What does that intuition justify about Isolation Forest?"
    options:
      - id: full-density-model
        text: "That Isolation Forest should fit a full density model over the entire dataset before it scores any point, because only a full model knows which attendee is the odd one out"
      - id: few-partitions
        text: "That outliers require few random partitions to isolate"
      - id: trees-equal-path-length
        text: "That the number of trees should be set equal to the average path length, so that the ensemble reproduces the cuts an interviewer would actually ask"
      - id: sample-largest-cluster
        text: "That the subsample size should be set to the size of the largest cluster, so that crowded rooms are always searched first and the balcony is never missed"
    correctOptionIds: [few-partitions]
    explanation: "The analogy is the lesson's core principle for the algorithm: outliers require few random partitions to be completely isolated, because the random cuts separate a lone point quickly and a member of a dense cluster slowly. That is why Isolation Forest builds trees on random subsamples and scores a point by how short its average path is. A full density model is closer to what the lesson contrasts Isolation Forest with, and neither tying the tree count to the path length nor sizing the subsample to the largest cluster follows from the analogy."
  - id: "70fc61ce-6698-4701-9c8c-bc2ee3403b07"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson say that subsampling to 256 points helps against coordinated attacks?"
    options:
      - id: removes-majority
        text: "Because it removes the majority class entirely, so the surviving sample contains only the anomalies the engine needs to score"
      - id: lengthens-inlier-paths
        text: "Because it raises the average path length of every inlier, which pushes their scores further below the 0.60 critical threshold"
      - id: breaks-the-mask
        text: "Because only one or two botnet transactions enter any single tree's sample, which breaks the mask"
      - id: raises-ensemble-variance
        text: "Because it raises the variance of the ensemble, which makes the fused score less sensitive to any single tree's opinion"
    correctOptionIds: [breaks-the-mask]
    explanation: "This is the masking problem. When a coordinated botnet submits 50 synthetic identity credit applications at once, those 50 anomalies form a dense pocket that needs many cuts to isolate in a full-sample tree, so their anomalous nature is hidden. Under subsampling with psi of 256, only one or two botnet transactions enter any single tree's sample, which breaks the mask and restores rapid isolation. Subsampling does not delete the majority class, and it does not raise ensemble variance; Random Subspace Selection is what the lesson uses to lower that variance."
  - id: "6e978d45-472d-4f3e-9496-5d8bed31f186"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's factory floor versus quiet library analogy, why does a global 60 dB threshold fail?"
    options:
      - id: logarithmic-comparison
        text: "Because decibels are logarithmic, so the arithmetic difference between 70 dB and 45 dB cannot be compared against a fixed threshold at all"
      - id: reversed-verdict
        text: "Because the visitor's 45 dB reading is physically quieter than the worker's 70 dB reading, so the threshold reaches the wrong verdict on both cases"
      - id: relative-to-neighbours
        text: "Because 70 dB is quiet relative to the 90 dB factory floor, while 45 dB is extreme relative to the 25 dB library"
      - id: below-ambient
        text: "Because the library's 25 dB ambient level makes a 60 dB threshold mathematically undefined, since a threshold above the ambient noise cannot be applied"
    correctOptionIds: [relative-to-neighbours]
    explanation: "The library is quiet, so a 45 dB visitor is a serious disturbance there, while the factory floor runs at 90 dB, so a 70 dB worker is unremarkable. A single global threshold gets both wrong. The lesson's core principle is that anomaly status is relative to the density of the immediate neighbours, which is exactly what the Local Outlier Factor computes and what a global threshold cannot do. The threshold is perfectly well defined; it is the reference point that is wrong."
  - id: "16fd9a58-7742-4750-aea8-e7a32df72172"
    revision: 1
    status: active
    type: single-choice
    prompt: "A point's Local Outlier Factor is the average local reachability density of its k nearest neighbours divided by its own local reachability density. In the lesson's worked example the ratio comes out at about 2.37. What does that number say?"
    options:
      - id: neighbours-denser
        text: "That the neighbours are about 237% denser than the point is, so it is a local anomaly"
      - id: reachability-distance
        text: "That the point is 2.37 times further from its neighbours than they are from each other, which is the reachability distance it has to travel"
      - id: dense-core-member
        text: "That the point sits inside a dense core and is therefore safer than the average member of its cluster"
      - id: point-denser
        text: "That the point's own density is 2.37 times that of its neighbours, which would make it a dense-core member rather than an anomaly"
    correctOptionIds: [neighbours-denser]
    explanation: "In the worked example the cluster members have a local reachability density of 0.7071 and the query point has 0.2988, and 0.7071 divided by 0.2988 gives about 2.3665. A ratio above 1 means the point is sparser than the neighbourhood around it, which is the local outlier. The cluster member o4 scores exactly 1.0000, which is what a homogeneous inlier looks like. The reachability distance and the densities themselves are separate quantities from the ratio."
  - id: "53ec672a-d534-440b-b355-c913a4307450"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does Breiman's random subspace selection cut the variance floor of a random forest ensemble?"
    options:
      - id: raises-tree-count
        text: "Because it raises the number of trees B, so the second term of the variance formula vanishes while the first term is left unaffected"
      - id: stratified-splits
        text: "Because it replaces bootstrap sampling with a stratified split that guarantees every feature is used at every depth of the ensemble"
      - id: drives-correlation-to-zero
        text: "Because it drives the pairwise correlation between trees toward zero"
      - id: shrinks-feature-space
        text: "Because it shrinks the number of candidate features to the square root of the dimension, so the ensemble can no longer memorise the training set"
    correctOptionIds: [drives-correlation-to-zero]
    explanation: "The ensemble variance is rho sigma squared plus (1 - rho) over B times sigma squared. As B grows the second term vanishes, but rho sigma squared survives, so strongly predictive features chosen at the root of nearly every bootstrap tree leave an immovable floor. Random subspace selection considers only about the square root of the dimension at each split, which forces trees onto secondary features and drives rho toward zero. More trees alone cannot remove that floor."
  - id: "810bf97f-f584-4675-a375-29026e09e0ba"
    revision: 1
    status: active
    type: multiple-select
    prompt: "According to the lesson's comparative matrix, which two of these properties are attributed to the Local Outlier Factor? Select every correct answer."
    options:
      - id: multi-density-optimal
        text: "Optimal multi-density handling, because it was designed specifically for local density variations"
      - id: cold-start-high
        text: "High cold-start efficacy, because it needs zero labelled fraud instances"
      - id: explainability-high
        text: "High fiduciary explainability, because PFI, tree traversal paths and SHAP TreeExplainer all describe its decisions"
      - id: sub-millisecond-latency
        text: "Sub-millisecond p99 inference latency, because scoring is a tree path traversal of depth 8 or less"
    correctOptionIds: [multi-density-optimal, cold-start-high]
    explanation: "The matrix gives the Local Outlier Factor an Optimal rating for multi-density handling and a High rating for cold-start efficacy, which is why the lesson names deep offline forensic clustering and B2B invoice anomaly audit as its operational sweet spot. The high fiduciary explainability rating belongs to the Random Forest, whose PFI, tree traversal paths and SHAP TreeExplainer give directional attribution, while the Local Outlier Factor provides only a scalar density ratio. The sub-millisecond latency belongs to the Isolation Forest, because the Local Outlier Factor needs a nearest-neighbour query that costs 15 to 100 milliseconds."
  - id: "1b89546b-6ef7-4b1e-9b55-ff65c58f051f"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the Random Forest section of the lesson are correct? Select every correct answer."
    options:
      - id: oob-share
        text: "Each tree is trained on a bootstrap sample, and roughly 36.8% of the rows in any one tree end up out-of-bag"
      - id: pfi-definition
        text: "Permutation Feature Importance measures how far the PR-AUC falls when a feature's values are shuffled, so a drop of 0.35 marks a critical driver"
      - id: mdi-cardinality
        text: "Mean Decrease in Impurity can be dominated by high-cardinality identifiers such as transaction_id_hash, timestamp_epoch_ms and account_uuid"
      - id: oob-useless
        text: "Because the trees are trained on bootstrap samples, the out-of-bag rows can never be used to estimate the generalization error of the ensemble"
    correctOptionIds: [oob-share, pfi-definition, mdi-cardinality]
    explanation: "The probability that a given row is not drawn in one bootstrap draw is (1 - 1/n) to the power n, which approaches e to the power minus one, about 36.8%, leaving about 63.2% in bag, and those out-of-bag rows are the free validation set the lesson relies on. Permutation Feature Importance is defined as the drop in model performance when a feature's values are shuffled, so a 0.35 PR-AUC collapse marks a critical driver. Mean Decrease in Impurity suffers a cardinality bias that lets identifiers such as transaction_id_hash, timestamp_epoch_ms and account_uuid outrank genuinely predictive flags like is_foreign_ip, which is exactly why the lesson prefers permutation over impurity rankings."
  - id: "36daae99-54da-437f-8351-e9eb8fbf0b3e"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that a Random Forest can be deployed as the cold-start engine on a brand-new payment rail that has not yet produced a single labelled fraud case."
    answer: false
    explanation: "The comparative matrix gives the Random Forest a cold-start efficacy of Zero: it fails completely without confirmed labelled data. Isolation Forest and Local Outlier Factor both score High because they need zero labelled fraud instances, which is exactly why they carry the unsupervised pathway on a new rail. The supervised branch has to wait until verified labels exist, even though the cost-sensitive Random Forest is the strongest engine once they do."
  - id: "bd26df75-75f9-4739-ba12-f13b8c9c8bff"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the normalization constant c(n) does in the Isolation Forest score, why it has to be there, and how the lesson computes c(256) from its formula."
    sampleAnswer: "A raw average path length cannot be compared across samples of different sizes, because a larger dataset produces longer paths even for an ordinary point. The constant c(n) is the expected path length of an unsuccessful search in a binary search tree over n points, so dividing the average path length by c(n) turns a raw length into a dimensionless ratio. The formula is c(n) = 2 times the quantity ln(n-1) plus gamma, minus 2(n-1) over n, with gamma approximately 0.5772156649. For n = 256, ln(255) = 5.541263545, adding gamma gives 6.118479210, doubling gives 12.236958420, and subtracting the linear adjustment 510/256 = 1.992187500 gives c(256) = 10.2448. The score is then 2 raised to minus that ratio, so a point whose average path length equals c(n) scores exactly 0.5."
    explanation: "A strong answer must say that c(n) normalizes away the sample size so scores are comparable, quote the formula c(n) = 2 times (ln(n-1) plus gamma) minus 2(n-1) over n with gamma approximately 0.5772156649, and walk the arithmetic to c(256) = 10.2448. It should also make the link to the 0.5 point: because the ratio is 1 exactly when the average path length equals c(n), that case lands on the score of 0.5 the lesson calls a structural inlier, while shorter paths push the score up toward 1.0 and longer paths push it down toward zero."
  - id: "27d59d6e-2643-40de-9336-1a26365e1c4c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the composite risk arbitrator the lesson proposes for Tier 2: which engines feed it, what score it produces, and the three score bands with the action each band triggers."
    sampleAnswer: "Tier 2 is a hybrid engine. Pathway A is unsupervised, with an Isolation Forest of psi 256 and 100 trees producing a fast zero-day anomaly score in the unit interval, plus a Local Outlier Factor with k of 20 for the high-value wire density check. Pathway B is supervised, with a cost-sensitive Random Forest trained on verified labels producing P(Fraud given x) through class weights, and SHAP TreeExplainer attribution for the regulatory drivers. The composite risk arbitrator fuses the unsupervised and supervised outputs into S_total = w1 times s_iForest plus w2 times P(Fraud), so a zero-day attack the supervised model has never seen can still be caught. Three bands act on it: below 0.35 is auto-approve and the funds are released; from 0.35 up to but not including 0.70 is a step-up challenge using 3DS 2.0 or a push token; and 0.70 or above freezes the transaction and routes it to Tier 3."
    explanation: "A strong answer must name both pathways and their settings, quote the composite S_total = w1 times s_iForest plus w2 times P(Fraud), and give all three bands with their actions: auto-approve below 0.35, a step-up MFA challenge between 0.35 and 0.70 using 3DS 2.0 or a push token, and a freeze and escalation to Tier 3 at 0.70 or above. It should explain why both engines are present: the unsupervised branch catches zero-day attacks and works with no labels at all, while the supervised branch carries the known typologies and produces the regulatory attribution."
```

---
id: "53efaffb-859c-4ddd-babb-f9847079d234"
title: "Imbalanced Learning & Feature Engineering: Defeating the Accuracy Paradox with SMOTE, PR Curves & Tuning"
description: "Master feature engineering, SMOTE vector interpolation, cost-sensitive loss, and Precision-Recall optimization to overcome severe class imbalance in financial fraud."
type: "lesson"
publish: true
status: "active"
created: "2026-09-30"
tags:
  - finance
  - risk-management
  - fraud-detection
  - machine-learning
  - feature-engineering
  - imbalanced-data
courseId: "81b8076a-4b7c-4ab3-9320-4702482db781"
lessonOrder: 3
estimatedMinutes: 25
comments: false
---

# Imbalanced Learning & Feature Engineering: Defeating the Accuracy Paradox with SMOTE, PR Curves & Tuning

In [[courses/ai-in-risk-management-and-fraud-detection/lessons/01-anomaly-detection-algorithms-theory|Chapter 1: Anomaly Detection Algorithms]], we analyzed how unsupervised tree partitioning (Isolation Forests) and localized density estimation (Local Outlier Factor) identify novel, zero-day anomalies without historical labels. However, when financial institutions operate mature payment gateways, credit card issuing networks, or corporate ERP ledgers, they possess millions of historical transaction records accompanied by verified dispute, chargeback, and audit outcomes.

Supervised machine learning should theoretically thrive in this environment. Yet, when enterprise risk teams deploy standard supervised classifiers (such as standard Logistic Regression, Support Vector Machines, or Gradient Boosted Trees) directly against historical financial ledgers, the models almost invariably experience catastrophic operational failure:

```
========================================================================================
           THE PATHOLOGY OF NAIVE SUPERVISED LEARNING IN FRAUD DETECTION
========================================================================================

  1. The 99.8% Accuracy Illusion:
     A classifier predicts every transaction is "Legitimate" (Class 0). On a validation
     dataset with 0.2% fraud prevalence, the model achieves a staggering 99.8% accuracy.
     The engineering team celebrates; the executive committee deploys the model.

  2. The Production Reality:
     Within 30 days, the payment rail incurs \$1,200,000 in unrecovered chargebacks.
     The model caught 0 fraudulent transactions (Recall = 0.0%). Every single syndicate
     attack sailed through uninterrupted.

  3. The Fundamental Flaw:
     Standard machine learning algorithms are designed to minimize symmetric 0-1 loss
     across balanced class distributions. When the minority class represents < 0.2% of
     the population, the empirical error gradient of the minority class is completely
     swallowed by the overwhelming volume of the majority class.
========================================================================================
```

This phenomenon is known as the **Accuracy Paradox**. In high-stakes financial operations—spanning **merchant payment acquiring**, **credit card issuing**, and **corporate ledger fraud**—accuracy is not merely an unhelpful metric; it is an active operational hazard.

To build production-grade fraud engines that defend institutional solvency, machine learning engineers must master four foundational disciplines:

1. **Mathematical evaluation metrics** that isolate the minority class (Precision-Recall curves vs. ROC curves).
2. **Asymmetric cost-sensitive loss functions** that reflect the real-world dollar disparity between false alarms and missed fraud.
3. **Synthetic resampling mechanics** (SMOTE, Borderline-SMOTE, and Tomek Links) that rebalance inductive feature manifolds without inducing memory-based overfitting.
4. **Domain-specific financial feature engineering** that extracts behavioral velocity, credit utilization elasticity, and Laplace-smoothed transaction frequency ratios.

---

## The Core Intuition: Three Feynman Analogies

Before examining metric derivations, loss gradients, and vector interpolation formulas, we establish physical intuitions for the three central pillars of imbalanced learning.

```
========================================================================================
                      THREE PHYSICAL ANALOGIES FOR IMBALANCED LEARNING
========================================================================================

  1. THE ACCURACY PARADOX: The Sleeping Lighthouse Keeper
  ──────────────────────────────────────────────────────────────────────────────────────
  • The Scenario: A lighthouse keeper guards a treacherous coastal shipping channel.
    Historical maritime records show that over a 365-day year, calm, clear waters prevail
    on 364 days. A catastrophic hurricane strikes on exactly 1 night.
  • The Policy: The keeper falls asleep every evening and permanently sets his warning
    signal to "Clear Seas Ahead."
  • The Paradox: At year-end, the keeper boasts an audit record of 99.73% accuracy
    (364 / 365 days correct) and demands a performance bonus. Yet on the single night
    the hurricane hit, a 40-ship cargo fleet shattered on the granite rocks, resulting in
    the total loss of crew and \$500,000,000 in cargo.
  • Financial Reality: In fraud, predicting the majority class guarantees high statistical
    accuracy while guaranteeing total catastrophic financial ruin.

                                           vs.

  2. SMOTE VECTOR INTERPOLATION: The Tightrope Between Safehouses
  ──────────────────────────────────────────────────────────────────────────────────────
  • The Scenario: On a vast desert map representing high-dimensional feature space,
    99,800 legitimate villas form dense, sprawling cities. Scattered miles apart in the
    dunes sit only 200 clandestine fraud safehouses.
  • Random Oversampling (Naive Cloning): Merely photocopies the 200 safehouses hundreds
    of times. A patrol drone memorizes those exact 200 GPS coordinates (overfitting) but
    remains completely blind to an intruder standing 10 meters away.
  • SMOTE Vector Mechanics: The drone draws a straight tightrope between two neighboring
    safehouses and constructs synthetic decoy safehouses at random intervals directly along
    that line. The drone learns the entire corridor connecting the criminals, rather than
    memorizing individual coordinates.
  • Borderline Danger: If the tightrope is drawn between two safehouses that cross directly
    through a legitimate village, synthetic points pollute the civilian zone, causing mass
    false arrests. Boundary cleaning algorithms (Tomek Links) cut these hazardous ropes.

                                           vs.

  3. ROC-AUC vs. PR-AUC: The Stadium Megaphone vs. The Private Microscope
  ──────────────────────────────────────────────────────────────────────────────────────
  • The Scenario: A soccer stadium holds 100,000 attendees (legitimate transactions) and
    100 pickpockets (fraudulent events).
  • The Flawed Screening: Stadium security arrests 1,000 innocent spectators and catches
    80 pickpockets.
  • The Megaphone (ROC Curve): Security announces over the stadium loudspeaker: "Our False
    Positive Rate is only 1.0%! 99% of innocent citizens entered without hassle!"
    Because the denominator contains all 99,900 innocent fans (FPR = 1,000 / 100,000 = 0.01),
    the performance sounds virtually immaculate.
  • The Microscope (PR Curve): Inside the holding cell, a magistrate inspects the arrests.
    Out of 1,080 detained individuals (80 pickpockets + 1,000 innocent fans), only 80 are
    actually guilty. The Precision is 80 / 1,080 = 7.4%. Over 92% of security investigations
    were wasted on innocent patrons!
  • Financial Reality: The ROC curve magnifies the quiet majority, masking operational
    paralysis. The Precision-Recall curve isolates the frontline reality of human triage.
========================================================================================
```

---

## The Mathematics of Severe Class Imbalance

To formalize why classical learning paradigms break down, we must examine the interplay between the empirical data distribution, the base-rate fallacy, and metric insensitivity.

### The Base-Rate Fallacy in Financial Fraud

Let $Y \in \{0, 1\}$ denote the binary ground truth of a transaction, where $Y = 1$ denotes fraud and $Y = 0$ denotes legitimate business. Let $A \in \{0, 1\}$ denote an automated fraud alert triggered by a machine learning model.

In financial payments, the prior probability of fraud (the base rate) is exceptionally small:

$$
\pi = P(Y = 1) \in [0.0001, 0.002]
$$

Suppose an advanced risk model achieves both a high sensitivity (true positive rate) and high specificity (true negative rate):

$$
P(A = 1 \mid Y = 1) = 0.95 \quad (\text{Sensitivity / Recall})
$$

$$
P(A = 0 \mid Y = 0) = 0.95 \implies P(A = 1 \mid Y = 0) = 0.05 \quad (\text{False Positive Rate})
$$

To an untrained risk manager, a model with $95\%$ sensitivity and only $5\%$ false positive rate appears exceptional. However, applying Bayes' Theorem reveals the empirical probability that an alerted transaction is actually fraudulent (the **Positive Predictive Value** or **Precision**):

$$
P(Y = 1 \mid A = 1) = \frac{P(A = 1 \mid Y = 1) P(Y = 1)}{P(A = 1 \mid Y = 1) P(Y = 1) + P(A = 1 \mid Y = 0) P(Y = 0)}
$$

Substituting the operational base rate $\pi = 0.001$ ($0.1\%$ fraud):

$$
P(Y = 1 \mid A = 1) = \frac{0.95 \times 0.001}{(0.95 \times 0.001) + (0.05 \times 0.999)}
$$

$$
P(Y = 1 \mid A = 1) = \frac{0.00095}{0.00095 + 0.04995} = \frac{0.00095}{0.05090} \approx 0.01866 \quad (1.87\%)
$$

Despite the model's apparent $95\%$ sensitivity and $95\%$ specificity, **over $98.1\%$ of generated alerts are false alarms**. In a processing facility handling 500,000 transactions per day, this model generates 25,450 alerts daily to catch 475 frauds. Human investigators would be inundated with over 24,975 false alerts every 24 hours, completely paralyzing Tier 3 compliance operations.

---

### Mathematical Proof: Why ROC-AUC Hallucinates on Imbalanced Data

The Receiver Operating Characteristic (ROC) curve plots the True Positive Rate ($\text{TPR}$) against the False Positive Rate ($\text{FPR}$) across varying decision thresholds $\tau \in [0, 1]$:

$$
\text{TPR}(\tau) = \frac{\text{TP}(\tau)}{\text{TP}(\tau) + \text{FN}(\tau)} = \frac{\text{TP}(\tau)}{P}
$$

$$
\text{FPR}(\tau) = \frac{\text{FP}(\tau)}{\text{FP}(\tau) + \text{TN}(\tau)} = \frac{\text{FP}(\tau)}{N_{\text{neg}}}
$$

The Precision-Recall (PR) curve plots Precision against Recall ($\text{TPR}$) across the same threshold spectrum:

$$
\text{Precision}(\tau) = \frac{\text{TP}(\tau)}{\text{TP}(\tau) + \text{FP}(\tau)}
$$

$$
\text{Recall}(\tau) = \frac{\text{TP}(\tau)}{\text{TP}(\tau) + \text{FN}(\tau)} = \text{TPR}(\tau)
$$

```
========================================================================================
            MATHEMATICAL PROOF: ASYMPTOTIC INSENSITIVITY OF ROC-AUC
========================================================================================

  Theorem:
  As the number of negative instances N_neg approaches infinity relative to positive
  instances P (N_neg >> P), the False Positive Rate FPR(τ) converges asymptotically toward 0
  for any bounded number of false alarms FP(τ), rendering the ROC curve insensitive to
  massive surges in false positives. Conversely, Precision(τ) directly penalizes FP(τ)
  independently of N_neg.

  Proof:
  1. Let N_neg = TN + FP, and let the class imbalance ratio be defined as:
     r = N_neg / P, where r -> ∞.

  2. Consider a scenario where a model change causes false positives to explode by a factor
     of k = 20 (e.g., from FP_1 = 50 to FP_2 = 1,000) while TP remains constant at 100
     on a test set with P = 200 and N_neg = 100,000 (r = 500):

     • Case 1 (Baseline: FP = 50):
       FPR_1 = 50 / 100,000 = 0.00050 (0.05%)
       Precision_1 = 100 / (100 + 50) = 0.6667 (66.7%)

     • Case 2 (Degraded: FP = 1,000):
       FPR_2 = 1,000 / 100,000 = 0.01000 (1.00%)
       Precision_2 = 100 / (100 + 1,000) = 0.0909 (9.09%)

  3. Analysis of Metric Response:
     • Absolute change in FPR:
       ΔFPR = FPR_2 - FPR_1 = 0.01000 - 0.00050 = 0.00950
       On the ROC curve (x-axis spanning [0, 1]), an increase of 0.0095 is visually and
       statistically imperceptible. The ROC-AUC remains virtually identical (e.g., 0.985
       vs. 0.978).

     • Absolute change in Precision:
       ΔPrecision = Precision_2 - Precision_1 = 0.0909 - 0.6667 = -0.5758
       Precision collapses by 57.6 percentage points (an 86.4% relative degradation!).
       The PR-AUC (Average Precision) drops precipitously.

  4. Conclusion:
     Because the denominator of FPR contains N_neg (TN + FP), large volumes of TN insulate
     FPR from false positive spikes. Precision completely excludes TN from its calculation,
     binding false positives directly to true positive capture.
     Q.E.D.
========================================================================================
```

> [!warning] The ROC-AUC Hallucination on Imbalanced Data
> In academic literature and Kaggle competitions, models frequently boast an **ROC-AUC of 0.98+** on fraud datasets. In production, this figure is often meaningless. Because negative transactions outnumber fraud by 1,000 to 1, a model can generate thousands of false alarms while maintaining an ROC-AUC above 0.97.
>
> Under SOX 404, PCI DSS, and internal banking audits, **PR-AUC (Average Precision)** is the mandatory primary offline metric for imbalanced classification. An ROC curve should never be used as the sole deployment gatekeeper in financial risk architectures.

---

## Cost-Sensitive Learning: Aligning Math with Financial Loss

Standard machine learning algorithms optimize empirical risk under the assumption of **symmetric loss**: misclassifying a positive instance carries the exact same penalty as misclassifying a negative instance.

In enterprise risk management, loss is radically **asymmetric**:

```
========================================================================================
                     THE ASYMMETRIC FINANCIAL LOSS MATRIX
========================================================================================

                             ACTUAL FRAUD (Y = 1)       ACTUAL LEGITIMATE (Y = 0)
                          ┌───────────────────────────┬───────────────────────────┐
  PREDICTED FRAUD         │ True Positive (TP)        │ False Positive (FP)       │
  (Action: Alert / Block) │ Friction / Triage Cost    │ False Alarm Friction Cost │
                          │ C(TP) = \$15              │ C(FP) = \$15              │
                          ├───────────────────────────┼───────────────────────────┤
  PREDICTED LEGITIMATE    │ False Negative (FN)       │ True Negative (TN)        │
  (Action: Approve Wire)  │ Catastrophic Loss         │ Frictionless Throughput   │
                          │ C(FN) = \$5,000           │ C(TN) = \$0               │
                          └───────────────────────────┴───────────────────────────┘
========================================================================================
```

### The Cost Components Defined:

- **$C(\text{FN}) = 5{,}000\text{ USD}$ (\$5,000)**: The cost of missed fraud. Represents unrecovered principal, interchange chargeback penalties (\$25 to \$100 per incident), administrative dispute handling, card reissuance fees, and potential regulatory non-compliance fines.
- **$C(\text{FP}) = 15\text{ USD}$ (\$15)**: The cost of a false alarm. Represents an automated Step-Up challenge (SMS OTP, 3DS push notification), transient cardholder friction, customer support call volume, and the lifetime churn probability of an insulted client.
- **$C(\text{TP}) = 15\text{ USD}$ (\$15)**: The cost of successful interception. The fraud was prevented (saving the \$5,000 principal), but the operational investigation and verification cost remains (\$15).
- **$C(\text{TN}) = 0\text{ USD}$ (\$0)**: Seamless straight-through automated settlement. Zero friction, zero financial loss.

---

### Derivation of the Expected Cost Formalization

The expected financial loss $\mathbb{E}[\text{Cost}]$ of a fraud detection policy operating over a distribution with ground-truth prior $\pi = P(Y = 1)$ is formalized as:

$$
\mathbb{E}[\text{Cost}] = C(\text{FN}) \cdot P(\text{FN}) + C(\text{FP}) \cdot P(\text{FP}) + C(\text{TP}) \cdot P(\text{TP}) + C(\text{TN}) \cdot P(\text{TN})
$$

Expressing these probabilities in terms of the decision threshold $\tau$, where the model predicts fraud if the posterior probability $P(Y = 1 \mid \mathbf{x}) \ge \tau$:

$$
P(\text{FN}) = P(Y = 1) \cdot P(P(Y = 1 \mid \mathbf{x}) < \tau \mid Y = 1) = \pi \cdot (1 - \text{Recall}(\tau))
$$

$$
P(\text{FP}) = P(Y = 0) \cdot P(P(Y = 1 \mid \mathbf{x}) \ge \tau \mid Y = 0) = (1 - \pi) \cdot \text{FPR}(\tau)
$$

$$
P(\text{TP}) = P(Y = 1) \cdot P(P(Y = 1 \mid \mathbf{x}) \ge \tau \mid Y = 1) = \pi \cdot \text{Recall}(\tau)
$$

$$
P(\text{TN}) = P(Y = 0) \cdot P(P(Y = 1 \mid \mathbf{x}) < \tau \mid Y = 0) = (1 - \pi) \cdot (1 - \text{FPR}(\tau))
$$

Because $C(\text{TN}) = 0\text{ USD}$ (\$0) and $C(\text{TP}) \approx C(\text{FP})$ in automated alert triaging, the expected cost function simplifies to:

$$
\mathbb{E}[\text{Cost}] \approx C(\text{FN}) \cdot \pi (1 - \text{Recall}(\tau)) + C(\text{FP}) \cdot \Big[ (1 - \pi)\text{FPR}(\tau) + \pi \text{Recall}(\tau) \Big]
$$

### Derivation of the Optimal Bayes Decision Threshold

Under decision theory, an optimal classifier assigns an observation $\mathbf{x}$ to the fraudulent class ($Y = 1$) if and only if the expected cost of predicting fraud is strictly less than the expected cost of predicting legitimate:

$$
\mathbb{E}[\text{Cost} \mid \hat{Y} = 1, \mathbf{x}] \le \mathbb{E}[\text{Cost} \mid \hat{Y} = 0, \mathbf{x}]
$$

Let $p(\mathbf{x}) = P(Y = 1 \mid \mathbf{x})$. Expanding both sides using the cost matrix:

$$
p(\mathbf{x}) \cdot C(\text{TP}) + (1 - p(\mathbf{x})) \cdot C(\text{FP}) \le p(\mathbf{x}) \cdot C(\text{FN}) + (1 - p(\mathbf{x})) \cdot C(\text{TN})
$$

Rearranging terms to solve for $p(\mathbf{x})$:

$$
(1 - p(\mathbf{x})) \cdot \Big( C(\text{FP}) - C(\text{TN}) \Big) \le p(\mathbf{x}) \cdot \Big( C(\text{FN}) - C(\text{TP}) \Big)
$$

$$
\frac{1 - p(\mathbf{x})}{p(\mathbf{x})} \le \frac{C(\text{FN}) - C(\text{TP})}{C(\text{FP}) - C(\text{TN})}
$$

$$
\frac{1}{p(\mathbf{x})} - 1 \le \frac{C(\text{FN}) - C(\text{TP})}{C(\text{FP}) - C(\text{TN})}
$$

$$
\frac{1}{p(\mathbf{x})} \le 1 + \frac{C(\text{FN}) - C(\text{TP})}{C(\text{FP}) - C(\text{TN})} = \frac{(C(\text{FP}) - C(\text{TN})) + (C(\text{FN}) - C(\text{TP}))}{C(\text{FP}) - C(\text{TN})}
$$

Inverting yields the **Optimal Bayes Decision Threshold** $p^*$:

$$
p^* = \frac{C(\text{FP}) - C(\text{TN})}{(C(\text{FP}) - C(\text{TN})) + (C(\text{FN}) - C(\text{TP}))}
$$

Substituting our operational values ($C(\text{FN}) = 5{,}000\text{ USD}$, $C(\text{FP}) = 15\text{ USD}$, $C(\text{TP}) = 15\text{ USD}$, $C(\text{TN}) = 0\text{ USD}$):

$$
p^* = \frac{15 - 0}{(15 - 0) + (5{,}000 - 15)} = \frac{15}{15 + 4{,}985} = \frac{15}{5{,}000} = 0.0030 \quad (0.3\%)
$$

```
========================================================================================
                 THE STRATEGIC REVELATION OF THE OPTIMAL THRESHOLD
========================================================================================
  • Traditional Default Threshold: τ = 0.50 (50% probability)
  • Optimal Bayes Threshold:      p* = 0.0030 (0.3% probability)

  Takeaway:
  Because missing a fraud costs 333 times more than inspecting a false alarm
  (\$5,000 / \$15 = 333.3), any transaction with an estimated fraud probability
  exceeding a mere 0.3% must be flagged for secondary verification.
  A default threshold of 0.50 guarantees institutional insolvency!
========================================================================================
```

---

### Balanced Class Weighting in Optimization Objectives

Rather than shifting thresholds post-hoc, we can inject cost sensitivity directly into model training via **weighted empirical loss**.

In standard binary cross-entropy loss, each sample contributes equally to the gradient:

$$
\mathcal{L}_{\text{BCE}}(\theta) = - \frac{1}{N} \sum_{i=1}^N \left[ y_i \ln \hat{p}_i + (1 - y_i) \ln (1 - \hat{p}_i) \right]
$$

To force the optimization algorithm (SGD, Adam, Newton-Raphson) to prioritize the minority class, we introduce balanced class weights $w_j$ for each class $j \in \{0, 1\}$:

$$
w_j = \frac{N}{K \cdot n_j}
$$

Where:

- $N$ is the total number of training transactions.
- $K$ is the number of distinct classes ($K = 2$ for binary fraud detection).
- $n_j$ is the total count of samples in class $j$.

The weighted cross-entropy loss function becomes:

$$
\mathcal{L}_{\text{Weighted}}(\theta) = - \frac{1}{N} \sum_{i=1}^N \left[ w_1 y_i \ln \hat{p}_i + w_0 (1 - y_i) \ln (1 - \hat{p}_i) \right]
$$

For a training set of $N = 100,000$ transactions with $n_1 = 200$ frauds and $n_0 = 99,800$ legitimate transactions:

$$
w_1 = \frac{100{,}000}{2 \times 200} = \frac{100{,}000}{400} = 250.0
$$

$$
w_0 = \frac{100{,}000}{2 \times 99{,}800} = \frac{100{,}000}{199{,}600} \approx 0.501
$$

By setting `class_weight='balanced'` in scikit-learn or XGBoost, every fraud instance exerts **$499\times$ more gradient force** ($250.0 / 0.501 \approx 499$) during backpropagation, pulling the separating hyperplane toward the optimal financial boundary.

---

## Resampling Strategies & SMOTE Vector Mechanics

While class weighting modifies the loss landscape, **resampling methods** alter the underlying training distribution prior to model fitting.

```
========================================================================================
                      RESAMPLING METHODOLOGIES: TRADE-OFF ANALYSIS
========================================================================================

  1. Random Undersampling (RUS):
     • Mechanism: Randomly deletes 99% of legitimate transactions to match the 200 frauds.
     • Catastrophic Flaw: Discards 99,600 legitimate transactions. The model loses all
       knowledge of normal variance, merchant diversity, and geographical baselines.
       False positives skyrocket.

  2. Random Oversampling (ROS):
     • Mechanism: Duplicates the 200 fraud transactions 500 times with replacement.
     • Catastrophic Flaw: Creates identical exact replicas in feature space. Supervised
       models construct hyper-narrow decision boundaries enclosing these exact points,
       leading to severe memorization/overfitting and zero generalization.

  3. Synthetic Minority Over-sampling Technique (SMOTE):
     • Mechanism: Synthesizes novel, continuous minority instances along the line segments
       connecting k-nearest minority neighbors.
     • Advantage: Forces the decision region of the minority class to become broader and
       more convex, promoting robust generalization.
========================================================================================
```

---

### SMOTE Mathematical Derivation

Developed by Chawla, Bowyer, Hall, and Kegelmeyer (2002), SMOTE operates directly in continuous feature space $\mathbb{R}^d$:

```
========================================================================================
                       SMOTE VECTOR INTERPOLATION MECHANICS
========================================================================================

     Feature X2
        ▲
        │
        │                  ★ x_zi (k-NN Minority Neighbor)
        │                 /
        │                /
        │               /  ◄── Difference Vector: (x_zi - x_i)
        │              /
        │             ◆ x_new = x_i + λ * (x_zi - x_i),  where λ ~ U(0, 1)
        │            /
        │           /
        │          ★ x_i (Selected Minority Seed Instance)
        │
        │
        └──────────────────────────────────────────────────────────► Feature X1
========================================================================================
```

For each sample $\mathbf{x}_i \in S_{\text{min}}$ belonging to the minority fraud class:

1. Compute the Euclidean distance from $\mathbf{x}_i$ to all other minority instances in $S_{\text{min}}$:

$$
d(\mathbf{x}_i, \mathbf{x}_j) = \|\mathbf{x}_i - \mathbf{x}_j\|_2 = \sqrt{\sum_{m=1}^d (x_{im} - x_{jm})^2}
$$

2. Identify the $k$-nearest minority neighbors $\mathcal{N}_k(\mathbf{x}_i) \subset S_{\text{min}}$ (typically $k = 5$).
3. Depending on the desired oversampling ratio, randomly select one neighbor $\mathbf{x}_{zi} \in \mathcal{N}_k(\mathbf{x}_i)$.
4. Draw a random scalar $\lambda$ from a uniform continuous distribution:

$$
\lambda \sim U(0, 1)
$$

5. Compute the new synthetic fraud feature vector $\mathbf{x}_{\text{new}}$ via vector interpolation:

$$
\mathbf{x}_{\text{new}} = \mathbf{x}_i + \lambda (\mathbf{x}_{zi} - \mathbf{x}_i)
$$

This equation represents a **convex linear combination** of the seed point $\mathbf{x}_i$ and its neighbor $\mathbf{x}_{zi}$:

$$
\mathbf{x}_{\text{new}} = (1 - \lambda)\mathbf{x}_i + \lambda \mathbf{x}_{zi}
$$

Because $\lambda \in [0, 1]$, $\mathbf{x}_{\text{new}}$ is mathematically guaranteed to lie on the line segment connecting $\mathbf{x}_i$ and $\mathbf{x}_{zi}$ in $\mathbb{R}^d$.

---

### Borderline Pathologies & Advanced Variants

While vanilla SMOTE outperforms naive replication, it suffers from a major mathematical limitation: **blind interpolation across overlapping boundary manifolds**.

If a minority instance $\mathbf{x}_i$ is an extreme outlier surrounded almost entirely by legitimate transactions, vanilla SMOTE will blindly connect it to another distant minority point, generating synthetic points that bridge directly through dense legitimate clusters:

```
========================================================================================
                  THE OVERLAPPING SYNTHESIS PATHOLOGY OF VANILLA SMOTE
========================================================================================

     Feature X2
        ▲
        │       ★ Fraud x_1
        │        \
        │         \   Synthetic points generated directly
        │          \  inside the dense legitimate cluster!
        │           ▼
        │        ○   ◆   ○
        │      ○   ○   ◆   ○  ◄── Dense Legitimate Transactions
        │        ○   ○   ○
        │             \
        │              \
        │               ★ Fraud x_2
        │
        └──────────────────────────────────────────────────────────► Feature X1
========================================================================================
```

To resolve this pathology, production pipelines utilize **Borderline-SMOTE** and **Tomek Links**:

#### 1. Borderline-SMOTE (Han et al., 2005)

Before synthesizing any points, Borderline-SMOTE inspects the $m$-nearest neighbors of each minority instance across the _entire_ dataset (both fraud and legitimate). Let $m'$ be the number of majority (legitimate) neighbors among the $m$ closest points:

- **SAFE**: $0 \le m' < \frac{m}{2}$. The fraud point is comfortably surrounded by other frauds. No synthesis is performed here to avoid over-densifying core clusters.
- **NOISE**: $m' = m$. All $m$ neighbors are legitimate. The fraud point is an isolated anomaly or mislabeled entry. Synthesizing here would amplify label noise; hence, it is ignored.
- **DANGER**: $\frac{m}{2} \le m' < m$. The fraud point sits directly on the fragile decision boundary. **Synthesis is performed exclusively on DANGER points**, reinforcing the exact margin where classifiers struggle.

#### 2. Tomek Links (Tomek, 1976)

A **Tomek Link** is defined as an instance pair $(\mathbf{x}_i, \mathbf{x}_j)$ where $\mathbf{x}_i \in \text{Legitimate}$, $\mathbf{x}_j \in \text{Fraud}$, and there exists no third point $\mathbf{x}_k$ such that:

$$
d(\mathbf{x}_i, \mathbf{x}_k) < d(\mathbf{x}_i, \mathbf{x}_j) \quad \text{or} \quad d(\mathbf{x}_j, \mathbf{x}_k) < d(\mathbf{x}_i, \mathbf{x}_j)
$$

Points forming a Tomek link are minimally separated nearest neighbors belonging to opposite classes. In a **SMOTE-Tomek** pipeline:

1. SMOTE synthesizes new fraud points to expand the minority class.
2. Tomek Links identification scans the boundary and discards both points in the link (or removes the majority point), carving a clean, distinct margin between legitimate traffic and fraud clusters.

---

## Domain-Specific Feature Engineering for Financial Risk

Raw tabular fields provided by core banking rails (such as `amount`, `merchant_id`, `timestamp`, `card_pan`) possess virtually zero linear separation power when evaluated in isolation. A \$2,500 wire is completely benign when sent by an enterprise procurement department on a Tuesday afternoon, but represents an account takeover when executed from an overseas IP on a dormant student checking account at 3:00 AM.

Feature engineering in financial risk translates raw events into **behavioral deviation vectors**.

```
========================================================================================
              THE FOUR PILLARS OF FINANCIAL RISK FEATURE DERIVATION
========================================================================================

  1. Financial Elasticity Ratios:
     Normalizes raw ledger balances against underwriting constraints (credit lines).
     Exposes credit bust-out and synthetic identity ramping.

  2. Velocity & Aggregation Windows:
     Measures deviations from baseline transactional frequency across rolling temporal
     horizons (10 min, 1 hour, 24 hours, 7 days). Exposes automated script attacks.

  3. Frequency Ratios with Laplace Smoothing:
     Calculates risk concentrations across high-cardinality attributes (countries, MCCs)
     while mathematically stabilizing low-sample denominators.

  4. Log-Odds Logit Transforms:
     Linearizes highly skewed multiplicative probabilities into additive logistic space.
========================================================================================
```

---

### Derived Feature 1: Balance-to-Credit Utilization Ratio (BCR)

In credit issuing and overdraft risk, raw outstanding balance is uninformative without underwriting context. A balance of \$9,500 on a \$10,000 card represents $95\%$ utilization (severe risk), whereas the same balance on a \$100,000 private banking line represents $9.5\%$ utilization.

$$
\text{BCR} = \frac{\text{balance}}{\text{credit\_limit} + \epsilon}
$$

Where $\epsilon = 10^{-6}$ prevents zero-division errors for debit accounts or unassigned limits. In fraud detection, credit utilization exhibits non-linear elasticity:

```
========================================================================================
                     BCR BEHAVIORAL ELASTICITY MANIFOLD
========================================================================================

  Fraud Probability P(Fraud)
      ▲
  1.0 │                                             /─────────── (Bust-out Fraud: Maxed)
      │                                            /
  0.5 │                                           /
      │                                          /
  0.1 │─────────────────────────────────────────/
  0.0 └───────────────┬─────────────────────────┬───────────────► BCR (Utilization)
                     0.0                       0.85            1.0+
                 (Normal Range)            (Danger Zone)
========================================================================================
```

When $\text{BCR} > 0.85$, fraud probability spikes exponentially—a classic signature of **bust-out fraud**, where a fraudster systematically builds credit for six months before maxing out the entire credit line in a single 48-hour spending spree.

---

### Derived Feature 2: Average Transaction Size (ATS)

Fraud syndicates executing account takeovers frequently alter the velocity and magnitude of ledger deductions. The Average Transaction Size normalizes cumulative spending across transaction count:

$$
\text{ATS} = \frac{\text{balance}}{\text{num\_transactions} + \epsilon}
$$

When combined with sliding velocity windows, the ratio of the instantaneous transaction amount to historical ATS reveals sudden transactional spikes:

$$
\text{Spike Ratio} = \frac{\text{amount}_t}{\text{ATS}_{\text{30d}} + \epsilon}
$$

A Spike Ratio exceeding $5.0$ indicates an individual transaction five times larger than the customer's average historical disbursement.

---

### Derived Feature 3: International Transaction Ratio with Laplace Smoothing

Cross-border card-not-present (CNP) authorizations represent a high-risk vector. Calculating an account's historical proportion of international transactions identifies behavioral anomalies:

$$
\text{Raw Ratio} = \frac{N_{\text{intl}}}{N_{\text{total}}}
$$

However, the raw ratio suffers from severe **low-sample variance**:

- An account with 1 international transaction out of 1 total transaction yields a ratio of $1.0$ ($100\%$).
- An account with 1,000 international transactions out of 1,000 total transactions also yields $1.0$ ($100\%$).

Treating these two accounts identically introduces crippling noise into the model. To stabilize estimation across low sample counts, we introduce **Laplace (Add-1) Smoothing**:

$$
\text{IAR} = \frac{N_{\text{intl}} + 1}{N_{\text{total}} + 2}
$$

In a generalized formulation where historical portfolio priors are known:

$$
\text{IAR}_{\text{Bayes}} = \frac{N_{\text{intl}} + \alpha}{N_{\text{total}} + \beta}
$$

Where $\alpha / \beta$ reflects the global portfolio baseline international transaction frequency (e.g., $\alpha = 1, \beta = 50$ for a domestic retail bank).

> [!tip] Laplace Smoothing on Transaction Frequency Ratios
> When computing behavioral ratios from rolling event streams (such as international charge ratios, weekend spending frequencies, or high-risk MCC counts), never compute raw proportions without prior smoothing.
>
> A brand-new cardholder making their first legitimate purchase abroad will yield a raw ratio of $1 / 1 = 1.0$, immediately triggering false positive alarms across the payment rail. Laplace smoothing shrinks low-count ratios toward the global population prior, preventing alert storms on new accounts.

---

### Derived Feature 4: Log-Odds Logistic Formulation

When engineering features for generalized linear models (such as regularized Logistic Regression), multiplicative interactions between probabilities violate linear additivity. The log-odds (logit) transformation maps probability estimates $p \in (0, 1)$ to continuous space $(-\infty, +\infty)$:

$$
\text{Logit}(p) = \ln\left( \frac{p}{1 - p} \right) = \beta_0 + \sum_{i=1}^d \beta_i x_i
$$

For financial risk scoring, computing log-odds ratios across categorical merchant risks (e.g., MCC risk scores) enables linear models to learn additive risk increments:

$$
\text{Risk Score} = \beta_0 + \beta_1 \ln(\text{ATS}) + \beta_2 \text{BCR} + \beta_3 \text{IAR}
$$

---

## The Data Leakage Invariant: Pipeline Isolation

In fraud detection and risk modeling, data leakage represents the single most dangerous architectural defect. While an improperly tuned model underperforms gracefully, **a model contaminated by data leakage produces stellar validation scores during development and collapses instantly in production**.

```
========================================================================================
           DATA LEAKAGE VIA RESAMPLING: THE ANATOMY OF A SILENT DISASTER
========================================================================================

  THE FATAL WORKFLOW (WRONG):
  1. Entire Dataset (1,000,000 transactions)
  2. Apply SMOTE to the WHOLE dataset -> Creates 500,000 synthetic frauds.
  3. Apply StandardScaler to the WHOLE dataset -> Fits μ and σ across all data.
  4. Perform Train/Test Split (80% Train, 20% Test).
  5. Fit Model -> Evaluate on Test Fold.

  WHY THIS DESTROYS PRODUCTION SYSTEMS:
  • Remember the SMOTE equation: x_new = x_i + λ * (x_zi - x_i).
  • If SMOTE is executed before splitting, a synthetic point x_new can be assigned to the
    TEST fold while its parent seed instances (x_i, x_zi) are assigned to the TRAIN fold!
  • The model in the training fold memorizes the exact vector between x_i and x_zi.
  • When tested on x_new, the model doesn't "predict" fraud; it simply retrieves an
    interpolated coordinate it already saw during training!
  • Test PR-AUC will report a stellar 0.992. In production, PR-AUC collapses to 0.120!
========================================================================================
```

> [!caution] The Golden Rule of Pipeline Isolation (Data Leakage)
> **Resampling, scaling, and imputation must NEVER touch validation or test data.**
>
> Preprocessing parameters ($\mu, \sigma$, imputation medians) and synthetic generation algorithms (SMOTE, Borderline-SMOTE) must be fitted **exclusively on the training fold**.
>
> Standard `sklearn.pipeline.Pipeline` does not support resampling because scikit-learn transformers cannot modify the target array $y$ or alter sample counts during `.fit()`. Risk engineers must use `imblearn.pipeline.Pipeline` from the `imbalanced-learn` library to ensure resampling occurs strictly inside each cross-validation training fold.

```
========================================================================================
              LEAKAGE-FREE STRATIFIED CROSS-VALIDATION ARCHITECTURE
========================================================================================

    Raw Historical Dataset (N = 100,000, Fraud = 0.2%)
                     │
                     ▼
    ┌────────────────────────────────────────────────────────────────────────────────┐
    │ StratifiedKFold Cross-Validation Split (e.g., 5 Folds)                         │
    │ (Preserves 0.2% class ratio in every single fold)                              │
    └────────────────────────────────────────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────────────────────────┐
        ▼ (Fold 1 Train: 80,000)                      ▼ (Fold 1 Test: 20,000)
    ┌─────────────────────────────────┐           ┌──────────────────────────────────┐
    │ PIPELINE EXECUTION (ISOLATED)   │           │ TEST EVALUATION (ISOLATED)       │
    │                                 │           │                                  │
    │ 1. Fit Imputer (Medians)        │──────────►│ 1. Transform Imputer             │
    │ 2. Fit RobustScaler (Q25, Q75)  │──────────►│ 2. Transform RobustScaler        │
    │ 3. Apply Borderline-SMOTE       │           │                                  │
    │    (Generates points ONLY from  │           │    [ZERO RESAMPLING APPLIED]     │
    │     training fold instances!)   │           │    (Test set retains pure,       │
    │ 4. Fit Cost-Sensitive Model     │──────────►│     unaltered 0.2% fraud ratio)  │
    └─────────────────────────────────┘           │                                  │
                                                  │ 3. Evaluate Precision-Recall     │
                                                  │    and Total Financial Cost      │
                                                  └──────────────────────────────────┘
========================================================================================
```

---

## Step-by-Step Worked Numerical Example: The Cost of Deception

To solidify the mathematical and financial divergence between accuracy and cost-sensitive evaluation, we trace a concrete, step-by-step numerical calculation.

### The Operational Scenario

- **Dataset**: A monthly validation batch of $N = 100{,}000$ corporate card transactions.
- **Class Distribution**:
  - Legitimate Transactions ($Y = 0$): $99{,}800$ transactions ($99.8\%$).
  - Fraudulent Transactions ($Y = 1$): $200$ transactions ($0.2\%$).
- **Financial Cost Matrix**:
  - Cost of Missed Fraud ($C(\text{FN})$): \$5,000 (chargeback loss + fine).
  - Cost of False Alert ($C(\text{FP})$): \$15 (investigation + SMS verification).
  - Cost of Correct Fraud Interception ($C(\text{TP})$): \$15 (investigation cost).
  - Cost of Straight-Through Legitimate Settlement ($C(\text{TN})$): \$0.

---

### Candidate Model A: The Naive Majority Classifier ("The Lighthouse Keeper")

Model A optimizes for raw accuracy. Given that $99.8\%$ of samples are legitimate, the model predicts $\hat{Y} = 0$ for every single transaction:

```
========================================================================================
                    CONFUSION MATRIX: MODEL A (NAIVE MAJORITY)
========================================================================================
                               ACTUAL FRAUD (200)    ACTUAL LEGITIMATE (99,800)
  PREDICTED FRAUD (0)                 TP = 0                   FP = 0
  PREDICTED LEGITIMATE (100,000)     FN = 200                 TN = 99,800
========================================================================================
```

#### Metric Computations for Model A:

- **Accuracy**:

$$
\text{Accuracy} = \frac{\text{TP} + \text{TN}}{N} = \frac{0 + 99{,}800}{100{,}000} = \mathbf{99.80\%}
$$

- **Recall (Sensitivity)**:

$$
\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} = \frac{0}{0 + 200} = \mathbf{0.00\%}
$$

- **Precision**: Undefined ($0 / 0$), conventionally set to $\mathbf{0.00\%}$.
- **F1-Score**: $\mathbf{0.00}$.

#### Total Dollar Cost Computation for Model A:

$$
C_{\text{total}}(\text{Model A}) = \text{FN} \times C(\text{FN}) + \text{FP} \times C(\text{FP}) + \text{TP} \times C(\text{TP}) + \text{TN} \times C(\text{TN})
$$

$$
C_{\text{total}}(\text{Model A}) = (200 \times 5{,}000\text{ USD}) + (0 \times 15\text{ USD}) + (0 \times 15\text{ USD}) + (99{,}800 \times 0\text{ USD})
$$

$$
C_{\text{total}}(\text{Model A}) = 1{,}000{,}000\text{ USD}
$$

Total Financial Loss for Model A: **\$1,000,000**.

---

### Candidate Model B: Tuned Cost-Sensitive Classifier

Model B utilizes SMOTE resampling with balanced class weights and a Bayes-optimized threshold ($\tau = 0.04$).

- Catches $170$ out of $200$ fraudulent transactions (Recall = $85\%$).
- Generates $600$ false alarms across the $99{,}800$ legitimate transactions ($\text{FPR} = 600 / 99{,}800 \approx 0.601\%$).

```
========================================================================================
                 CONFUSION MATRIX: MODEL B (COST-SENSITIVE TUNED)
========================================================================================
                               ACTUAL FRAUD (200)    ACTUAL LEGITIMATE (99,800)
  PREDICTED FRAUD (770)               TP = 170                 FP = 600
  PREDICTED LEGITIMATE (99,230)       FN = 30                  TN = 99,200
========================================================================================
```

#### Metric Computations for Model B:

- **Accuracy**:

$$
\text{Accuracy} = \frac{\text{TP} + \text{TN}}{N} = \frac{170 + 99{,}200}{100{,}000} = \frac{99{,}370}{100{,}000} = \mathbf{99.37\%}
$$

_(Notice that Model B's accuracy is strictly LOWER than Model A: 99.37% vs. 99.80%!)_

- **Recall (Sensitivity)**:

$$
\text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}} = \frac{170}{170 + 30} = \frac{170}{200} = \mathbf{85.00\%}
$$

- **Precision (PPV)**:

$$
\text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}} = \frac{170}{170 + 600} = \frac{170}{770} \approx \mathbf{22.08\%}
$$

- **F1-Score**:

$$
\text{F1} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}} = 2 \times \frac{0.2208 \times 0.8500}{0.2208 + 0.8500} = 2 \times \frac{0.18768}{1.0708} \approx \mathbf{35.05\%}
$$

#### Total Dollar Cost Computation for Model B:

$$
C_{\text{total}}(\text{Model B}) = \text{FN} \times C(\text{FN}) + \text{FP} \times C(\text{FP}) + \text{TP} \times C(\text{TP}) + \text{TN} \times C(\text{TN})
$$

$$
C_{\text{total}}(\text{Model B}) = (30 \times 5{,}000\text{ USD}) + (600 \times 15\text{ USD}) + (170 \times 15\text{ USD}) + (99{,}200 \times 0\text{ USD})
$$

$$
C_{\text{total}}(\text{Model B}) = 150{,}000\text{ USD} + 9{,}000\text{ USD} + 2{,}550\text{ USD} + 0\text{ USD}
$$

$$
C_{\text{total}}(\text{Model B}) = 150{,}000\text{ USD} + 11{,}550\text{ USD} = 161{,}550\text{ USD}
$$

Total Financial Loss for Model B: **\$161,550**.

---

### The Executive Financial Verdict

```
========================================================================================
                 EXECUTIVE COMPARISON: MODEL A vs. MODEL B
========================================================================================

  Metric                          Model A (Naive)           Model B (Cost-Sensitive)
  ──────────────────────────────────────────────────────────────────────────────────────
  Accuracy                        99.80% (WINNER?)          99.37% (-0.43%)
  Recall (Fraud Interception)     0.00%                     85.00% (+85.0%)
  Precision                       0.00%                     22.08% (+22.08%)
  Frauds Caught                   0 / 200                   170 / 200
  False Alarms Generated          0                         600
  Missed Fraud Loss (FN)          \$1,000,000                \$150,000
  Investigation Friction (FP+TP)  \$0                        \$11,550
  TOTAL FINANCIAL LOSS            \$1,000,000                \$161,550

  NET INSTITUTIONAL BENEFIT:
  Model B SAVES \$838,450 per 100,000 transactions!
========================================================================================
```

Despite having a lower reported accuracy, Model B preserves **\$838,450 of enterprise capital** across every 100,000 processed transactions. This mathematical reality decisively proves why accuracy must be discarded in favor of cost-sensitive risk metrics.

---

## Hyperparameter Tuning & Threshold Optimization

When optimizing machine learning models for imbalanced financial datasets, default grid search routines produce counter-productive results if configured with default settings.

### 1. Scoring Functions in Grid Search

Standard hyperparameter optimization using `GridSearchCV` or `Optuna` defaults to `scoring='accuracy'`. In an imbalanced environment, this drives the optimizer to select hyperparameters that suppress minority predictions entirely:

```python
# CATASTROPHIC CONFIGURATION (DO NOT USE IN RISK):
grid = GridSearchCV(estimator=model, param_grid=params, scoring='accuracy')

# CORRECT PRODUCTION CONFIGURATIONS:
# Option A: Optimizing for Area Under Precision-Recall Curve (PR-AUC / Average Precision)
grid = GridSearchCV(estimator=pipeline, param_grid=params, scoring='average_precision', cv=cv)

# Option B: Optimizing for F-Beta with high recall weighting (e.g., Beta = 2)
from sklearn.metrics import fbeta_score, make_scorer
f2_scorer = make_scorer(fbeta_score, beta=2)
grid = GridSearchCV(estimator=pipeline, param_grid=params, scoring=f2_scorer, cv=cv)
```

`scoring='average_precision'` calculates the area under the Precision-Recall curve using Riemann summation across all operating thresholds:

$$
\text{PR-AUC} = \sum_{n} (\text{Recall}_n - \text{Recall}_{n-1}) \text{Precision}_n
$$

This ensures hyperparameter combinations are evaluated across their entire Precision-Recall operating frontier, rather than anchored to an arbitrary default cutoff.

---

### 2. Probability Calibration (Platt Scaling vs. Isotonic Regression)

When models are trained using SMOTE or heavy class weighting (`class_weight='balanced'`), the empirical loss gradient distorts the output probability scores. A predicted score of `0.70` from a weighted tree model no longer corresponds to an actual $70\%$ posterior probability of fraud.

To restore true probabilistic meaning—essential for calculating exact expected dollar loss $\mathbb{E}[\text{Cost}]$—risk teams apply **Probability Calibration**:

```
========================================================================================
                      PROBABILITY CALIBRATION METHODS
========================================================================================

  1. Platt Scaling (Sigmoid Calibration):
     • Fits a univariate logistic regression to the model's raw logits:
       P(Y = 1 | s) = 1 / (1 + exp(A * s + B))
     • Best for: Small datasets or models with parametric error structures (SVM, Logistic).

  2. Isotonic Regression:
     • Fits a non-parametric, monotonic step function to map raw scores to true empirical
       frequencies:
       min ∑ (y_i - m(s_i))^2  subject to m(s_i) <= m(s_j) for s_i < s_j
     • Best for: Large financial datasets (> 50,000 samples) and tree ensembles (Random
       Forest, XGBoost, LightGBM) where distortion is non-linear.
========================================================================================
```

In scikit-learn, calibration is applied via `CalibratedClassifierCV` using out-of-fold calibration to prevent validation leakage.

---

### 3. Empirical Cost Threshold Sweeping

Rather than relying on theoretical Bayes thresholds that assume perfect calibration, production systems perform an empirical **Threshold Sweep** across validation predictions:

```
========================================================================================
                   EMPIRICAL THRESHOLD SWEEP MINIMIZING TOTAL DOLLAR LOSS
========================================================================================

  Total Expected Loss ($)
      ▲
  $1.0M│    \
       │     \
       │      \
  $500K│       \                                      /
       │        \                                    /
       │         \                                  /
  $161K│───────────★ Optimal Threshold τ* = 0.040──/
       │
   $0  └───────────┬────────────────────────────────┬───────────────► Threshold τ
                  0.040                            0.50
               (Minimum Cost)                 (Default 0.50)
========================================================================================
```

By computing total dollar cost $C_{\text{total}}(\tau)$ across 1,000 discrete threshold steps $\tau \in [0.001, 0.999]$, risk systems locate the exact empirical minimum $\tau^*$, locking it as the production decision boundary for Tier 2 scoring.

---

## Production-Grade Implementation Lab: End-to-End Pipeline

The following self-contained Python script implements a production-grade fraud modeling engine. It generates synthetic multi-modal financial transactions, constructs domain-specific features (BCR, ATS, Laplace-smoothed IAR), builds an isolated `imblearn.pipeline.Pipeline`, performs Stratified K-Fold cross-validation with Borderline-SMOTE, evaluates PR curves, and executes cost-sensitive threshold optimization:

```python
"""
Production Imbalanced Learning & Feature Engineering Pipeline
Course: AI in Risk Management and Fraud Detection
Module: Chapter 2 - Imbalanced Learning & Feature Engineering
"""

import numpy as np
import pandas as pd
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import (
    precision_recall_curve,
    average_precision_score,
    confusion_matrix,
    classification_report
)
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import RobustScaler
from imblearn.pipeline import Pipeline as ImbPipeline
from imblearn.over_sampling import BorderlineSMOTE


# =====================================================================
# 1. SYNTHETIC FINANCIAL DATA GENERATOR (0.2% FRAUD PREVALENCE)
# =====================================================================
def generate_synthetic_financial_ledger(n_samples: int = 100_000, random_state: int = 42) -> pd.DataFrame:
    """
    Generates synthetic corporate transaction ledger with realistic multi-modal distributions,
    high class imbalance (0.2% fraud), and domain attributes.
    """
    np.random.seed(random_state)
    n_fraud = int(n_samples * 0.002)  # 200 fraud
    n_legit = n_samples - n_fraud      # 99,800 legit

    # Legitimate transactions
    legit_amount = np.random.exponential(scale=120.0, size=n_legit) + 5.0
    legit_balance = np.random.uniform(low=500.0, high=25_000.0, size=n_legit)
    legit_credit_limit = legit_balance / np.random.uniform(0.1, 0.65, size=n_legit)
    legit_tx_count = np.random.poisson(lam=18, size=n_legit) + 1
    legit_intl_tx = np.random.binomial(n=legit_tx_count, p=0.03)

    # Fraudulent transactions (Bust-out & Account Takeover characteristics)
    fraud_amount = np.random.exponential(scale=1_850.0, size=n_fraud) + 250.0
    fraud_balance = np.random.uniform(low=8_000.0, high=30_000.0, size=n_fraud)
    # Fraudsters max out credit limit (high utilization)
    fraud_credit_limit = fraud_balance / np.random.uniform(0.85, 0.99, size=n_fraud)
    fraud_tx_count = np.random.poisson(lam=4, size=n_fraud) + 1
    fraud_intl_tx = np.random.binomial(n=fraud_tx_count, p=0.45)

    # Combine distributions
    amounts = np.concatenate([legit_amount, fraud_amount])
    balances = np.concatenate([legit_balance, fraud_balance])
    credit_limits = np.concatenate([legit_credit_limit, fraud_credit_limit])
    tx_counts = np.concatenate([legit_tx_count, fraud_tx_count])
    intl_txs = np.concatenate([legit_intl_tx, fraud_intl_tx])
    labels = np.concatenate([np.zeros(n_legit, dtype=int), np.ones(n_fraud, dtype=int)])

    # Shuffle dataset
    indices = np.arange(n_samples)
    np.random.shuffle(indices)

    df = pd.DataFrame({
        "amount": amounts[indices],
        "balance": balances[indices],
        "credit_limit": credit_limits[indices],
        "num_transactions": tx_counts[indices],
        "num_intl_transactions": intl_txs[indices],
        "is_fraud": labels[indices]
    })
    return df


# =====================================================================
# 2. DOMAIN-SPECIFIC FEATURE ENGINEERING TRANSFORMER
# =====================================================================
class FinancialFeatureEngineer(BaseEstimator, TransformerMixin):
    """
    Derives domain-specific risk indicators:
    - Balance-to-Credit Ratio (BCR)
    - Average Transaction Size (ATS)
    - International Transaction Ratio with Laplace Smoothing (IAR)
    - Instantaneous Spike Ratio
    """
    def __init__(self, laplace_alpha: float = 1.0, laplace_beta: float = 2.0):
        self.laplace_alpha = laplace_alpha
        self.laplace_beta = laplace_beta

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X_df = X.copy() if isinstance(X, pd.DataFrame) else pd.DataFrame(X)
        eps = 1e-6

        # Feature 1: Balance-to-Credit Utilization Ratio (BCR)
        bcr = X_df["balance"] / (X_df["credit_limit"] + eps)

        # Feature 2: Average Transaction Size (ATS)
        ats = X_df["balance"] / (X_df["num_transactions"] + eps)

        # Feature 3: International Transaction Ratio with Laplace Smoothing
        iar = (X_df["num_intl_transactions"] + self.laplace_alpha) / (
            X_df["num_transactions"] + self.laplace_beta
        )

        # Feature 4: Instantaneous Spike Ratio
        spike_ratio = X_df["amount"] / (ats + eps)

        # Compile engineered matrix
        features = pd.DataFrame({
            "amount": X_df["amount"],
            "balance": X_df["balance"],
            "bcr": bcr,
            "ats": ats,
            "iar": iar,
            "spike_ratio": spike_ratio
        })
        return features.values


# =====================================================================
# 3. COST MATRIX AND EVALUATOR
# =====================================================================
class FinancialCostEvaluator:
    """
    Calculates enterprise profit/loss based on asymmetric fraud cost matrix.
    C(FN) = $5,000 | C(FP) = $15 | C(TP) = $15 | C(TN) = $0
    """
    def __init__(self, c_fn: float = 5_000.0, c_fp: float = 15.0, c_tp: float = 15.0, c_tn: float = 0.0):
        self.c_fn = c_fn
        self.c_fp = c_fp
        self.c_tp = c_tp
        self.c_tn = c_tn

    def compute_total_cost(self, y_true: np.ndarray, y_pred: np.ndarray) -> dict:
        cm = confusion_matrix(y_true, y_pred)
        tn, fp, fn, tp = cm.ravel()

        fn_cost = fn * self.c_fn
        fp_cost = fp * self.c_fp
        tp_cost = tp * self.c_tp
        tn_cost = tn * self.c_tn
        total_cost = fn_cost + fp_cost + tp_cost + tn_cost

        return {
            "tn": tn,
            "fp": fp,
            "fn": fn,
            "tp": tp,
            "fn_cost": fn_cost,
            "fp_cost": fp_cost,
            "tp_cost": tp_cost,
            "total_cost": total_cost,
            "precision": tp / (tp + fp) if (tp + fp) > 0 else 0.0,
            "recall": tp / (tp + fn) if (tp + fn) > 0 else 0.0
        }

    def find_optimal_threshold(self, y_true: np.ndarray, y_probs: np.ndarray) -> tuple:
        thresholds = np.linspace(0.001, 0.999, 1000)
        best_threshold = 0.5
        min_cost = float("inf")

        for tau in thresholds:
            y_pred = (y_probs >= tau).astype(int)
            cost_metrics = self.compute_total_cost(y_true, y_pred)
            if cost_metrics["total_cost"] < min_cost:
                min_cost = cost_metrics["total_cost"]
                best_threshold = tau

        return best_threshold, min_cost


# =====================================================================
# 4. EXECUTION PIPELINE WITH ISOLATED RESAMPLING
# =====================================================================
def run_production_pipeline():
    print("=====================================================================")
    print(" 1. GENERATING ENTERPRISE LEDGER DATASET")
    print("=====================================================================")
    df = generate_synthetic_financial_ledger(n_samples=100_000, random_state=42)
    X = df.drop(columns=["is_fraud"])
    y = df["is_fraud"].values

    n_fraud = np.sum(y)
    n_legit = len(y) - n_fraud
    print(f"Total Transactions: {len(y):,}")
    print(f"Legitimate Volume: {n_legit:,} ({n_legit/len(y)*100:.2f}%)")
    print(f"Fraudulent Volume: {n_fraud:,} ({n_fraud/len(y)*100:.2f}%)")

    # Stratified K-Fold Split (Ensures 0.2% fraud in all folds)
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    train_idx, test_idx = next(skf.split(X, y))

    X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]

    print("\n=====================================================================")
    print(" 2. CONSTRUCTING LEAKAGE-FREE IMBALANCED-LEARN PIPELINE")
    print("=====================================================================")
    # Construct strictly isolated pipeline:
    # Feature Engineer -> RobustScaler -> BorderlineSMOTE -> Weighted RandomForest
    pipeline = ImbPipeline([
        ("engineer", FinancialFeatureEngineer(laplace_alpha=1.0, laplace_beta=2.0)),
        ("scaler", RobustScaler()),
        ("smote", BorderlineSMOTE(sampling_strategy=0.10, random_state=42, k_neighbors=5)),
        ("classifier", RandomForestClassifier(
            n_estimators=100,
            max_depth=12,
            class_weight="balanced",
            n_jobs=-1,
            random_state=42
        ))
    ])

    print("Fitting pipeline strictly on training fold (Resampling isolated)...")
    pipeline.fit(X_train, y_train)

    # Predict posterior probabilities on pristine test fold
    y_test_probs = pipeline.predict_proba(X_test)[:, 1]

    # Evaluate Precision-Recall Performance
    pr_auc = average_precision_score(y_test, y_test_probs)
    print(f"\nOut-of-Fold Average Precision (PR-AUC): {pr_auc:.4f}")

    print("\n=====================================================================")
    print(" 3. COST-SENSITIVE THRESHOLD OPTIMIZATION")
    print("=====================================================================")
    evaluator = FinancialCostEvaluator(c_fn=5_000.0, c_fp=15.0, c_tp=15.0, c_tn=0.0)

    # Baseline Model (Naive Default Threshold = 0.50)
    y_pred_default = (y_test_probs >= 0.50).astype(int)
    default_metrics = evaluator.compute_total_cost(y_test, y_pred_default)

    # Optimal Cost Threshold Sweep
    opt_tau, min_cost = evaluator.find_optimal_threshold(y_test, y_test_probs)
    y_pred_optimal = (y_test_probs >= opt_tau).astype(int)
    optimal_metrics = evaluator.compute_total_cost(y_test, y_pred_optimal)

    # Naive Majority Model (Predicts 0 for everything)
    y_pred_naive = np.zeros_like(y_test)
    naive_metrics = evaluator.compute_total_cost(y_test, y_pred_naive)

    print(f"A. Naive Majority Classifier (100% Inaction):")
    print(f"   Accuracy: {100 * (len(y_test) - np.sum(y_test)) / len(y_test):.2f}%")
    print(f"   Recall: 0.00% | Frauds Missed: {naive_metrics['fn']}")
    print(f"   Total Expected Dollar Cost: ${naive_metrics['total_cost']:,.2f}")

    print(f"\nB. Baseline Classifier (Default Threshold τ = 0.500):")
    print(f"   Recall: {default_metrics['recall']*100:.2f}% | Precision: {default_metrics['precision']*100:.2f}%")
    print(f"   TP: {default_metrics['tp']} | FP: {default_metrics['fp']} | FN: {default_metrics['fn']}")
    print(f"   Total Expected Dollar Cost: ${default_metrics['total_cost']:,.2f}")

    print(f"\nC. Cost-Optimized Classifier (Bayes Threshold τ* = {opt_tau:.3f}):")
    print(f"   Recall: {optimal_metrics['recall']*100:.2f}% | Precision: {optimal_metrics['precision']*100:.2f}%")
    print(f"   TP: {optimal_metrics['tp']} | FP: {optimal_metrics['fp']} | FN: {optimal_metrics['fn']}")
    print(f"   Total Expected Dollar Cost: ${optimal_metrics['total_cost']:,.2f}")

    net_savings = naive_metrics["total_cost"] - optimal_metrics["total_cost"]
    print(f"\n>>> NET MONETARY SAVINGS: ${net_savings:,.2f} on 20,000 transactions! <<<")


if __name__ == "__main__":
    run_production_pipeline()
```

---

## Architectural Reference Matrix: Resampling vs. Cost-Sensitive vs. Threshold Tuning

When architecting production fraud engines, risk engineers must select the appropriate balance of algorithmic strategies. The following reference matrix delineates operational trade-offs across financial dimensions:

| Dimension                                       | Random Resampling (ROS / RUS)                                            | Synthetic Resampling (SMOTE / Borderline)                            | Cost-Sensitive Loss (`class_weight`)                             | Empirical Threshold Shifting ($\tau \to p^*$)                           |
| ----------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Mechanism**                                   | Mechanical duplication or random deletion of samples                     | Convex vector interpolation between $k$-NN minority points           | Scales loss gradients by class inverse frequency $w_j$           | Post-processing shift of classification probability cutoff              |
| **Data Distribution Impact**                    | Distorts training manifold; drops 99% data (RUS) or creates spikes (ROS) | Expands minority convex hull without replicating exact coordinates   | Preserves raw empirical data distribution completely             | Preserves raw empirical data distribution completely                    |
| **Risk of Overfitting**                         | **Extreme** (ROS memorizes coordinates; RUS under-fits)                  | Low to Moderate (Borderline-SMOTE restricts boundary noise)          | Very Low (operates via regularization and loss scaling)          | **Zero** (no parameter modification; purely decision boundary)          |
| **Training Latency**                            | Low (RUS reduces data size; ROS increases size)                          | Moderate ($O(N_{\text{min}} \cdot k \cdot d)$ neighbor query)        | **Minimal** ($O(1)$ scalar multiplication during backprop)       | **Instantaneous** (evaluated post-training on validation fold)          |
| **Inference Latency**                           | Zero impact on downstream scoring SLA                                    | Zero impact on downstream scoring SLA                                | Zero impact on downstream scoring SLA                            | Zero impact ($O(1)$ floating point comparison `p >= tau`)               |
| **Regulatory Auditability (SOX 404 / SR 11-7)** | Low (synthetic data replication complicates model validation)            | Moderate (must document that synthetic data never entered test sets) | **High** (mathematically clean loss function adjustment)         | **High** (transparent governance rule mapping dollar risk to cutoff)    |
| **Operational Recommendation**                  | **Prohibited** on Tier 2 institutional payment rails                     | Deploy **Borderline-SMOTE** inside isolated CV pipelines             | **Mandatory Baseline** across all gradient boosted & tree models | **Mandatory Final Layer** tuned against dynamic portfolio cost matrices |

---

## Key Takeaways & Executive Summary

1. **The Accuracy Paradox is an Existential Operational Hazard:** Predicting the majority class in severe imbalanced regimes achieves $99.8\%$ accuracy while allowing $100\%$ of fraud through. In financial risk, accuracy must be replaced by **PR-AUC (Average Precision)**, **F-Beta**, and **Total Expected Financial Cost**.
2. **ROC-AUC Asymptotically Insulates False Positives:** As negative instances dwarf positive fraud ($N_{\text{neg}} \gg P$), the False Positive Rate ($\text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}$) remains virtually unchanged even when false alarms explode by $20\times$. The Precision-Recall curve isolates the frontline compliance reality, exposing every false alarm.
3. **The Optimal Bayes Threshold Reflects Financial Asymmetry:** When missing a fraudulent event costs \$5,000 and inspecting an alert costs \$15, the theoretical optimal decision threshold collapses from the naive $0.50$ down to $p^* = \frac{15}{5{,}000} = 0.0030$ ($0.3\%$).
4. **SMOTE Interpolates Convex Minority Boundaries:** Vanilla SMOTE creates synthetic points via $\mathbf{x}_{\text{new}} = \mathbf{x}_i + \lambda(\mathbf{x}_{zi} - \mathbf{x}_i)$. To prevent synthesizing points inside legitimate clusters, **Borderline-SMOTE** restricts generation to instances in the danger zone, and **Tomek Links** cleans ambiguous boundary overlap.
5. **Data Leakage in Resampling Guarantees Production Failure:** Preprocessing, imputation, scaling, and SMOTE must **never** be performed on the dataset prior to cross-validation splitting. Resampling must occur strictly inside the training fold of an `imblearn.pipeline.Pipeline`.
6. **Domain Feature Engineering Outperforms Raw Columns:** Real-time fraud detection relies on behavioral deviation features, including **Balance-to-Credit Utilization (BCR)**, **Average Transaction Size (ATS)**, and **International Transaction Ratios with Laplace Smoothing (IAR)**.

---

## What's Next?

Having mastered feature engineering, SMOTE vector interpolation, cost-sensitive matrices, and Precision-Recall optimization, we have constructed an analytical engine capable of triaging millions of transactions.

However, when an automated model flags a sophisticated money laundering ring or anomalous corporate disbursement, raw mathematical scores alone cannot satisfy federal regulatory requirements. Under **FinCEN regulations**, **Bank Secrecy Act (BSA)** mandates, and internal audit oversight, compliance officers must draft exhaustive, legally admissible **Suspicious Activity Reports (SARs)**.

Proceed to [[courses/ai-in-risk-management-and-fraud-detection/lessons/03-generative-ai-alerts-audit-reporting|Chapter 3: Generative AI in Fraud Operations]] to master how Large Language Models, Retrieval-Augmented Generation (RAG), and knowledge graphs automate alert narratives, synthesize regulatory filings, and construct tamper-evident audit trails.

```knowledge-quiz
schemaVersion: 1
quizId: "60476db6-a21d-4113-9347-d26985d8132d"
title: "Checkpoint: the accuracy paradox, resampling and cost-sensitive thresholds"
questionBankId: "721ce167-7e3e-4794-9a7d-04a0e85f07af"
questionIds:
  - "c9252dc0-3bef-4847-ae76-fe48cc5347b3"
  - "44baeae2-e06d-44d8-a4a2-a51c0690d033"
  - "2e9e9be1-2228-4c5a-be82-8f78ad8f4022"
  - "510efb21-ebba-4e0a-a367-87550fd886b7"
  - "697a02ad-56be-4937-b80b-a8323755ca07"
  - "a6ec181f-1441-4881-ab2e-0ee7c844b5a7"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-in-risk-management-and-fraud-detection/question-banks/02-imbalanced-data-engineering-modeling|Imbalanced Learning & Feature Engineering: Defeating the Accuracy Paradox with SMOTE, PR Curves & Tuning: Question Bank]].

<div class="chapter-navigation">
  <a class="chapter-nav-btn prev" href="/courses/ai-in-risk-management-and-fraud-detection/lessons/01-anomaly-detection-algorithms-theory">← Chapter 1: Anomaly Detection Algorithms</a>
  <a class="chapter-nav-btn next" href="/courses/ai-in-risk-management-and-fraud-detection/lessons/03-generative-ai-alerts-audit-reporting">Chapter 3: Generative AI in Fraud Operations →</a>
</div>

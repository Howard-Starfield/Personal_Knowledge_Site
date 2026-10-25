---
id: "f481e687-c590-4ae2-983b-140b0cebde69"
title: "Statistical Relationships & Causal Feature Selection: Separating Signal from Spurious Drift: Question Bank"
description: "Practises the spurious regression diagnosis, the Durbin-Watson red flag, cointegration and Granger gating, VIF pruning, and the Meridian Cloud Capital lodestone disaster."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - financial-forecasting
  - study-guide
  - assessment
  - active-recall
courseId: "47a600f9-bca7-4399-b34d-5168f88594e3"
comments: false
---

These questions practise [[courses/ai-in-financial-forecasting/lessons/02-correlation-causation-feature-selection|Statistical Relationships & Causal Feature Selection: Separating Signal from Spurious Drift]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "d591bcf2-6cad-4bd5-8c61-487e92811012"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say to conclude when an OLS regression reports an R-squared that exceeds its Durbin-Watson statistic?"
    options:
      - id: residuals-fine
        text: "The residuals are stationary and the fit is trustworthy, because a Durbin-Watson value near two confirms the regression is well specified"
      - id: two-goodness
        text: "The regression is well specified, because the Durbin-Watson statistic and the coefficient of determination are both measures of goodness of fit"
      - id: shared-drift
        text: "The residuals are non-stationary and the reported statistical significance is an artifact of shared drift"
      - id: add-dummies
        text: "The model is over-parameterised, so the fix is to add seasonal dummy variables until the Durbin-Watson statistic falls below the R-squared"
    correctOptionIds: [shared-drift]
    explanation: "The lesson names this the Granger-Newbold red flag: when the R-squared exceeds the Durbin-Watson statistic the residuals carry severe drift, the reported significance is an artifact of shared secular drift between two non-stationary series, and the level regression is spurious. The empirical run shows it plainly, with a level R-squared of 0.7673 against a Durbin-Watson statistic of 0.1621. The Durbin-Watson statistic measures residual autocorrelation rather than goodness of fit, so it is not a second measure of fit to be traded against the R-squared."
  - id: "758cd20b-e52f-40ee-a658-06701631b5b1"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's spurious regression demonstration, what happens to the relationship once the series are differenced?"
    options:
      - id: collapses
        text: "The Pearson correlation collapses to -0.0458 and the R-squared to 0.0021, revealing the underlying independence"
      - id: holds
        text: "The Pearson correlation holds at 0.8760 and the R-squared rises to 0.7673, confirming the relationship was genuine after all"
      - id: rises
        text: "The Pearson correlation rises to 0.9737 and the R-squared to 0.887, which is the tell-tale sign of a genuine structural driver"
      - id: drift-moves
        text: "The Durbin-Watson statistic falls to 0.1621 while the correlation holds, so the residual drift rather than the correlation is the problem that must be fixed"
    correctOptionIds: [collapses]
    explanation: "The level regression on 120 observations gives a Pearson r of 0.8760 with an inflated R-squared of 0.7673, but differencing collapses the correlation to -0.0458 and the R-squared to 0.0021 while the Durbin-Watson statistic moves to 2.2059, the ideal white-noise value near two. That is the signature of two independent random walks that merely drifted upward together, and the stage prints Spurious Regression Verified: True."
  - id: "fd5e75ec-a1f4-4995-8b10-0e565b0e62c0"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's definition of Granger causality, what must past values of a candidate predictor X do before X can be retained as a causal forecasting feature for Y?"
    options:
      - id: dw-below-r2
        text: "Raise the R-squared of the level regression above the Durbin-Watson statistic, so that the two series are shown to drift together"
      - id: mutual-info
        text: "Lift the mutual information of the pair above 0.25 bits, which is the screening threshold the lesson applies first"
      - id: residual-variance
        text: "Reduce the variance of the target's residuals enough to bring its Durbin-Watson statistic back towards two"
      - id: incremental
        text: "Provide statistically significant incremental information for predicting the target beyond past values of the target alone"
    correctOptionIds: [incremental]
    explanation: "The lesson defines Granger causality as temporal precedence: past values of X must add significant information about Y beyond what past values of Y alone already provide, and the test must be run on stationary series or it will manufacture spurious causality. Spearman rank and mutual information belong to the earlier screening stage, with thresholds of 0.30 and 0.25 bits, and the R-squared against Durbin-Watson comparison is the warning that tells you to stop and difference before testing anything."
  - id: "f86a45a4-00f7-4e2e-8025-d08d0aa3e726"
    revision: 1
    status: active
    type: single-choice
    prompt: "What thresholds and pruning rule does the lesson give for collinearity?"
    options:
      - id: prune-above-one
        text: "Prune whenever the variance inflation factor exceeds 1.0, because any correlation between predictors corrupts the fit"
      - id: five-and-ten
        text: "A VIF at or below 5.0 is safe, above 10.0 is catastrophic, and the highest VIF feature is pruned until all remain below 5.0"
      - id: ten-and-eighty-five
        text: "A VIF at or below 10.0 is safe, above 85.0 is catastrophic, and the lowest VIF feature is pruned first to preserve the collinear twins"
      - id: primary-only
        text: "A VIF at or below 5.0 is safe, but only for the primary driver, and every remaining feature is kept regardless of its variance inflation factor"
    correctOptionIds: [five-and-ten]
    explanation: "The decision matrix sets the safe band at a variance inflation factor of 5.0 or less and the catastrophic band above 10.0, and the operational action is to iteratively prune the feature with the highest VIF until every remaining feature sits at or below 5.0. The reason is mathematical: standard errors explode in proportion to the square root of the VIF and the Gram matrix approaches singularity, which is what allowed the RFP pipeline coefficient to flip sign in the Meridian case where the VIF exceeded 85 across all four predictors."
  - id: "ab96beb0-0b72-49e7-a76d-a31a132e83f0"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under what condition does the lesson permit two non-stationary I(1) series to be regressed in levels?"
    options:
      - id: common-trend
        text: "When both series drift upward at the same rate, so that the level regression is protected by a common secular trend"
      - id: high-correlation
        text: "When the Pearson correlation between the levels exceeds 0.85, which is the co-trending red flag the lesson warns about"
      - id: cointegrated
        text: "When cointegration is proven by a stationary linear combination, so an Error Correction Model can be built"
      - id: dw-below-r2-again
        text: "When the Durbin-Watson statistic of the level regression is below the R-squared, which proves the two series move together"
    correctOptionIds: [cointegrated]
    explanation: "Cointegration means a linear combination of the two I(1) series is itself stationary, I(0), and the lesson requires it to be proven with the Engle-Granger two-step test, rejecting the null when the residual ADF statistic is below -3.37. Once proven, an Error Correction Model captures both the long-run equilibrium and the short-run dynamics. A shared upward drift is precisely the condition that makes a level regression spurious, not the condition that licenses one."
  - id: "35684605-a0f4-408e-bbc5-47cea8eb703f"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's feature profile table, what verdict does the Air Travel Traffic candidate receive, and on what grounds?"
    options:
      - id: spurious-drift
        text: "Rejected as spurious co-trending drift, because its differenced Granger test gives a p-value of 0.5311"
      - id: redundant-collinear
        text: "Rejected as redundant collinear, because its variance inflation factor of 3.44 sits above the catastrophic threshold of 10.0"
      - id: causal-driver
        text: "Retained as a causal driver, because its Pearson correlation of 0.8817 clears the bivariate screening threshold"
      - id: causal-collinear
        text: "Retained as a causal but collinear feature, because its Granger F-statistic of 0.6430 is large enough to confirm temporal precedence"
    correctOptionIds: [spurious-drift]
    explanation: "Air Travel Traffic shows a Pearson r of 0.8817 and a Spearman of 0.8888, which look impressive, but its Granger F-statistic is only 0.6430 with a p-value of 0.5311, so past air travel traffic adds no information about the target once the series are differenced. Its VIF of 3.44 is comfortably safe, so collinearity is not the problem; the stage prints the verdict SPURIOUS CO-TRENDING DRIFT and rejects it as a lodestone."
  - id: "7c8905c5-cdeb-4662-aa5c-4c96165c0f49"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Meridian Cloud Capital case study, what happened to the OLS coefficients for the RFP pipeline and for social media brand impressions?"
    options:
      - id: signs-held
        text: "Both held their expected signs, with the pipeline coefficient at +0.18 and the impressions coefficient at +1.42, so the allocation decision followed the model"
      - id: both-zero
        text: "Both coefficients collapsed towards zero, so the model returned no significant driver at all and the committee chose on instinct"
      - id: swapped
        text: "The pipeline coefficient rose to +0.18 while the impressions coefficient fell to -1.42, so the two features partly cancelled"
      - id: sign-flip
        text: "The pipeline coefficient flipped to -0.18 while the impressions coefficient inflated to +1.42"
    correctOptionIds: [sign-flip]
    explanation: "Under multicollinearity with a variance inflation factor above 85 across all four predictors, the Gram matrix was severely ill-conditioned, so the only genuine structural leading causal driver, the trailing qualified RFP pipeline, took a negative coefficient of -0.18 while social media brand impressions inflated to +1.42. Leadership believed the negative sign and defunded RFP bid responses and sales engineering, which is the opposite of what the data supported."
  - id: "dc3407ac-b4d1-4eab-84d8-6ea45720fa87"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three defects does the lesson attribute to Meridian's model? Select every correct answer."
    options:
      - id: lodestone-anomaly
        text: "The Lodestone Ad-Spend Anomaly, a level regression of contracted ARR against brand impressions that was spurious"
      - id: collinear-cluster
        text: "Catastrophic multicollinear clustering across impressions, MQLs, headcount and RFP pipeline, with VIF above 85"
      - id: sign-flip-defect
        text: "An arbitrary coefficient sign flip that turned the RFP pipeline coefficient negative and the impressions coefficient positive"
      - id: double-difference
        text: "A unit-root failure, because the team differenced the series twice before fitting and lost the quarterly cycle entirely"
    correctOptionIds: [lodestone-anomaly, collinear-cluster, sign-flip-defect]
    explanation: "The lesson lists exactly three structural analytical defects: the Lodestone Ad-Spend Anomaly, where the trailing sixteen quarters gave r = 0.942 and R-squared = 0.887 while the differenced relationship collapsed to r = 0.04 with p = 0.78; catastrophic multicollinear clustering across the four predictors with a variance inflation factor above 85; and the arbitrary coefficient sign flip. Double differencing is not among them; the team's error was running a level regression on two I(1) series without ever checking stationarity."
  - id: "ac863331-cc68-449e-ab16-76cf920657a9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two features did the recovered Meridian pipeline keep in the final model? Select every correct answer."
    options:
      - id: rfp-pipeline
        text: "Trailing Qualified RFP Pipeline"
      - id: renewal-rates
        text: "Customer Contract Renewal Rates"
      - id: impressions-back
        text: "Global Social Media Brand Impressions, retained as a leading indicator once the differenced Granger test rejected it"
      - id: mqls-back
        text: "Inbound Marketing Qualified Leads, pruned on the variance inflation factor but restored to the model for the capital plan"
    correctOptionIds: [rfp-pipeline, renewal-rates]
    explanation: "The recovered pipeline retained only the trailing qualified RFP pipeline and customer contract renewal rates, restoring parameter stability and bringing out-of-sample forecast accuracy within 3.2% of actual ARR. Brand impressions were rejected outright because they failed the differenced Granger test at p = 0.531, and inbound marketing qualified leads were pruned because their variance inflation factor was 798.73."
  - id: "ddc88e2a-5a25-4b01-b85f-6fdd7241dbd5"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that Meridian's 2024 actual ARR of $128M came in at $107M below its $235M forecast, a 45.5% forecast error."
    answer: true
    explanation: "The lesson reports that actual 2024 ARR came in at $128M against a forecasted $235M, a catastrophic $107M revenue shortfall and a 45.5% forecast error. The consequences were an operating burn rate of $6.8M a month, an emergency 35% workforce reduction, a $31M write-off of prepaid marketing contracts, and an emergency $40M down-round structured debt facility at a punitive 14% interest rate."
  - id: "63cadfea-4a9f-4765-9f5e-64beb8339b58"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain in your own words what the lesson means by a lodestone metric, and why the Air Travel Traffic candidate qualifies as one."
    sampleAnswer: "A lodestone is a variable whose correlation with the target looks decisive in levels but is produced only by both series drifting upward together, so it carries no causal information once the shared trend is removed. The Air Travel Traffic candidate shows a Pearson r of 0.8817 and a Spearman of 0.8888 against the target, together with a low variance inflation factor of 3.44, so it passes the collinearity screen. But its Granger F-statistic is 0.6430 with a p-value of 0.5311 on the differenced series, which means past air travel adds nothing to the forecast once the drift is differenced away, so the stage rejects it as spurious co-trending drift."
    explanation: "A strong answer defines the lodestone as a metric that correlates only because of shared secular drift, quotes the Air Travel Traffic figures of 0.8817 and a p-value of 0.5311, and notes that its low variance inflation factor rules out collinearity as the reason for the rejection."
  - id: "92dd392e-0fe5-4e2b-b5f8-3d2efe3d9afb"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the five-stage econometric gating procedure the lesson's decision matrix lays out, from bivariate screening through collinearity pruning."
    sampleAnswer: "Stage one is bivariate screening on Spearman rank correlation above 0.30 or mutual information above 0.25 bits, which screens out uninformative noise while preserving non-linear candidates. Stage two is the stationarity gate, an augmented Dickey-Fuller test in which a statistic below the 5% critical value rejects the unit-root null at p at or below 0.05, with a non-stationary series differenced or sent to a cointegration test. Stage three is the cointegration audit, the Engle-Granger two-step residual test rejected when the statistic is below -3.37, after which an Error Correction Model is built if it passes. Stage four is causal direction, a Granger causality F-test with p at or below 0.05 on stationary series, which confirms temporal precedence and rejects lodestones. Stage five is collinearity pruning, where a variance inflation factor of 5.0 or less is safe, above 10.0 is catastrophic, and the highest VIF feature is iteratively pruned until every remaining feature sits at or below 5.0."
    explanation: "A strong answer gives all five stages in order with their metrics and thresholds, the Spearman and mutual information screen, the ADF, the Engle-Granger residual test at -3.37, the Granger F-test and the VIF bands at 5.0 and 10.0, and notes that each stage only runs on series that have passed the one before it."
```

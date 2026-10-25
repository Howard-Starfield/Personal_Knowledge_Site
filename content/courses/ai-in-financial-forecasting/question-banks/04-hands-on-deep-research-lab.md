---
id: "66d1eb8c-d609-4f3f-97ff-a0ecee82a534"
title: "Hands-On Implementation Lab: Building an End-to-End Financial Forecasting & SARIMA Engine: Question Bank"
description: "Practises the seven-phase pipeline, the AIC and BIC trade-off, the SARIMA overfitting fallacy, the Pydantic GAAP invariant, the fan chart widening, and the executive scenario variance report."
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

These questions practise [[courses/ai-in-financial-forecasting/lessons/04-hands-on-deep-research-lab|Hands-On Implementation Lab: Building an End-to-End Financial Forecasting & SARIMA Engine]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "1ca83879-0b42-45f8-b7a5-91e4ba9e5f4a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson tell a corporate forecasting team to minimise BIC rather than AIC when selecting the SARIMA specification?"
    options:
      - id: bic-penalty
        text: "Because the BIC penalty k times ln(n) outgrows the AIC penalty 2k once n is at least eight, so marginal parameters are punished harder"
      - id: aic-penalty
        text: "Because the AIC penalty of 2k is stricter than the BIC penalty of k times ln(n) for any sample size above eight quarters of available history"
      - id: in-sample
        text: "Because AIC is computed on in-sample residuals while BIC is computed on out-of-sample errors, so only BIC genuinely measures generalisation"
      - id: likelihood-only
        text: "Because AIC uses the maximised log-likelihood and BIC uses the residual variance, so BIC systematically rewards a smaller error term"
    correctOptionIds: [bic-penalty]
    explanation: "The lesson's note on AIC versus BIC says the AIC penalty of 2k is relatively lenient and can over-parameterise the seasonal polynomial in small macro-financial samples of twenty quarters or fewer, while the BIC penalty of k times ln(n) becomes the larger penalty once n is at least eight, so minimising BIC is prioritised for board forecasting. Both criteria are built from the maximised log-likelihood, so the likelihood term itself is not what distinguishes them."
  - id: "6b4a0257-9e6a-4a0f-82bc-51e3f2ac6be8"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which specification did the grid search select for the 20-quarter Apple revenue series, and what were its information criteria?"
    options:
      - id: spec-a
        text: "SARIMA(0, 1, 0) times (1, 1, 0) at 4, with an AIC of 204.30 and a BIC of 205.08"
      - id: spec-b
        text: "SARIMA(1, 1, 0) times (0, 1, 0) at 4, with an AIC of 286.66 and a BIC of 287.94"
      - id: spec-c
        text: "SARIMA(1, 1, 0) times (1, 1, 0) at 4, AIC 206.25, BIC 207.16"
      - id: spec-d
        text: "SARIMA(1, 1, 1) times (0, 1, 1) at 4, with an AIC of 397.32 and a BIC of 398.11"
    correctOptionIds: [spec-c]
    explanation: "The grid search output prints the optimal model as SARIMA(1, 1, 0) times (1, 1, 0, 4) with an AIC of 206.25 and a BIC of 207.16, a deliberately parsimonious model carrying only two parameters, a first-order non-seasonal autoregressive coefficient and a first-order seasonal autoregressive coefficient. The (0, 1, 0) times (1, 1, 0, 4) row scores a lower AIC of 204.30 but a higher BIC of 205.08 on a single parameter, and the lesson explains that penalising unnecessary moving-average parameters is what secures the lowest BIC."
  - id: "e7865bf0-3f4c-4f2a-a1f2-6c3a4a4cba10"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson write the two information criteria used in the grid search?"
    options:
      - id: formula-a
        text: "AIC is 2k minus 2 ln of the maximised likelihood, and BIC is k times ln(n) minus 2 ln of the maximised likelihood"
      - id: formula-b
        text: "AIC is 2k minus 2 ln of the maximised likelihood, and BIC is k times ln(n) minus 2 ln of it"
      - id: formula-c
        text: "AIC is 2k plus 2 ln of the maximised likelihood, and BIC is k times ln(n) plus 2 ln of the maximised likelihood"
      - id: formula-d
        text: "AIC is n times ln(k) minus 2 ln of the maximised likelihood, and BIC is 2k minus n times ln of the maximised likelihood"
    correctOptionIds: [formula-b]
    explanation: "The lesson gives AIC as 2k minus 2 ln of the maximised likelihood and BIC as k ln(n) minus 2 ln of the maximised likelihood, where k is the number of freely estimated parameters, that is p plus q plus P plus Q plus one if a constant is included, and n is the effective sample size after differencing. The two criteria share the likelihood term and differ only in the penalty, and BIC carries the heavier penalty once the sample is large enough."
  - id: "6fa4d606-5d38-4ee3-9d4e-7c6a11f0e9cb"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the Pydantic v2 validator in Phase 2 enforce on every quarterly record?"
    options:
      - id: inv-a
        text: "That revenue and cost of revenue are both positive, so no quarter can record a negative top line"
      - id: inv-b
        text: "That the quarter label matches the fiscal quarter pattern, so malformed period strings never reach the pipeline"
      - id: inv-c
        text: "That the gross margin stays inside the band observed across the twenty quarters, so an outlier margin is rejected outright before ingestion"
      - id: inv-d
        text: "That revenue minus cost of revenue equals gross profit within one million dollars, so a broken identity stops the record"
    correctOptionIds: [inv-d]
    explanation: "The QuarterlyFinancialRecord model carries a model validator that recomputes the expected gross profit as revenue minus cost of revenue and raises a ValueError when the absolute difference from the supplied gross profit exceeds one million dollars, which is the GAAP identity failing closed. The field constraints that revenue and cost of revenue are greater than zero and the fiscal quarter pattern are separate guards, and no margin band is enforced."
  - id: "8d49b135-4f2a-4d5a-a7f9-2e46b4a1cb4d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the engine's stationarity diagnostic print for the raw and the seasonally differenced revenue series?"
    options:
      - id: adf-a
        text: "Raw ADF -5.1716 with p 0.0000, and seasonally differenced ADF -2.0337 with p 0.2720"
      - id: adf-b
        text: "Raw ADF -5.1716, p 0.0000, stationary; differenced ADF -2.0337, p 0.2720, not stationary"
      - id: adf-c
        text: "Raw ADF -2.0337 with p 0.2720, marked non-stationary, and seasonally differenced ADF -5.1716 with p 0.0000, marked stationary"
      - id: adf-d
        text: "Both series stationary, because the raw series prints ADF -5.1716 with p 0.0000 and the differenced series prints ADF -2.0337 with p 0.0000"
    correctOptionIds: [adf-b]
    explanation: "The terminal output prints the raw revenue series at ADF -5.1716 with p 0.0000, flagged stationary, and the seasonally differenced series at s = 4 with ADF -2.0337 and p 0.2720, flagged not stationary. The differencing step removes the seasonal structure but leaves a series whose unit-root test still fails at the 5% level, and the grid search proceeds with a first-difference term d = 1 to deal with that."
  - id: "58de2fd2-3d1e-4c2e-8a8f-6b6f2ba4bd0e"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson's fan chart show about forecast uncertainty as the horizon extends?"
    options:
      - id: widening
        text: "The 95% band widens from plus or minus $11,487M at h = 1 to plus or minus $28,401M at h = 12"
      - id: narrowing
        text: "The 95% band narrows from plus or minus $28,401M at h = 1 to plus or minus $11,487M at h = 12, because the model learns the seasonal cycle"
      - id: flat
        text: "The 95% band stays at plus or minus $11,487M across the whole horizon, because the forecast error variance is constant"
      - id: exploding
        text: "The 95% band explodes into wild non-physical oscillations beyond h = 4, because the fitted polynomial has too many roots"
    correctOptionIds: [widening]
    explanation: "The forecast error variance formula sigma-h squared equals sigma-e squared times the sum of the psi-j squared terms, and the Wold decomposition shows it grows monotonically with the horizon, so the printed band moves from plus or minus $11,487M at 2025-Q1 to plus or minus $28,401M at 2027-Q4. The lesson calls that widening the basis for sizing debt, pre-ordering inventory and holding liquidity buffers; the explosive behaviour belongs to the overfitted high-order models, not to this parsimonious specification."
  - id: "a68024b8-1d9c-4a76-9e22-96dd9e9a17f8"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the executive scenario variance report, which scenario erodes the gross margin the most?"
    options:
      - id: severe
        text: "The Severe Disruption, because its 20% revenue contraction produces the largest absolute revenue variance of $82,620M"
      - id: mild
        text: "The Mild Disruption, because a 0.5% cost inflation on a smaller revenue base is proportionally the hardest to absorb"
      - id: tariff
        text: "The Targeted Tariff Shock, because 20% hardware tariffs lift cost of sales by 4.5% and cut the margin by 242 basis points"
      - id: moderate
        text: "The Moderate Disruption, because a 10% revenue contraction against 1.5% cost inflation is the steepest ratio in the matrix"
    correctOptionIds: [tariff]
    explanation: "The report shows the Targeted Tariff Shock cutting the gross margin from 46.21% to 43.79%, a loss of 242 basis points, which is worse than the 188 basis points of the Severe Disruption even though the tariff case removes less revenue. The lesson attributes that to downside cost stickiness and pricing elasticity, where a 6% elasticity-driven volume contraction leaves the cost base largely intact while the 4.5% cost of sales increase lands immediately."
  - id: "561e7c1b-8a45-4e0f-9c2b-3d8ba5b0a9ee"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three constraints does the lesson's idempotency and deterministic reproducibility invariant place on an enterprise forecasting engine? Select every correct answer."
    options:
      - id: seeded
        text: "Zero unseeded stochasticity, with every pseudo-random number generator pinned to an explicit seed such as 42"
      - id: immutable
        text: "Immutability of historical ingestion, with source records parsed into frozen data transfer objects under strict schema validation"
      - id: deterministic-mle
        text: "Mathematical determinism in optimisation, with fixed tolerances and deterministic initial parameter states"
      - id: gpu-parallel
        text: "Parallel execution across GPU workers, so the grid search over the parameter space completes in minutes rather than hours"
    correctOptionIds: [seeded, immutable, deterministic-mle]
    explanation: "The invariant lists three non-negotiable constraints: zero unseeded stochasticity with every generator pinned to seed 42, immutability of historical ingestion through frozen data transfer objects with strict schema validation, and mathematical determinism in optimisation with fixed tolerance criteria and deterministic initial parameter states such as enforce_stationarity False and enforce_invertibility False, so the same history yields bit-for-bit identical forecasts. Parallel execution is a performance choice, not a determinism guarantee."
  - id: "ac2b6712-1f8d-4f1a-bf5c-4a2e2a1cb9d2"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three measures does the lesson's operating playbook put in place for model drift and auditability? Select every correct answer."
    options:
      - id: golden
        text: "Automated golden testing in continuous integration, checking that point forecasts do not move by more than 0.001% from approved reference baselines"
      - id: ljung-box
        text: "A Ljung-Box white noise test on the model residuals after each quarterly re-fit, alerting when the p-value falls below 0.05"
      - id: bic-tracking
        text: "Rolling BIC tracking across a twelve-quarter window, so a sharp escalation signals a structural change in product mix"
      - id: shadow-model
        text: "A shadow copy of the model run outside the governed environment, so the board always has an independent estimate"
    correctOptionIds: [golden, ljung-box, bic-tracking]
    explanation: "The playbook specifies automated golden testing against a pinned reference dataset with a 0.001% tolerance, pre-commit schema linting against the Pydantic field validators, a Ljung-Box test on the residuals with an alert when the serial correlation is significant at p below 0.05, rolling BIC tracking over a twelve-quarter window to detect structural change such as a permanent shift from hardware to recurring services, immutable parameter freezes storing the exact orders and tolerances for every board forecast, and segregation of duties between the modelling team and the FP&A team. A shadow copy is not one of the controls."
  - id: "842e0d46-c6e1-4e3d-9b12-e59f1b0e5c7a"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that a 20% tariff shock compresses gross profit far more severely than an equivalent demand drop, because of cost stickiness and pricing elasticity."
    answer: true
    explanation: "The lesson makes that its fifth key takeaway: macroeconomic shocks never scale linearly, and a 20% tariff shock compresses gross profit far more severely than an equivalent demand drop because cost of sales does not adjust instantaneously when revenue contracts. The Phase 6 matrix demonstrates it, with the Targeted Tariff Shock costing 242 basis points of gross margin against 188 basis points for the Severe Disruption."
  - id: "a5da230e-30b7-4a1c-9f8d-9d2b7f4c6e11"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain in your own words why the lesson treats the SARIMA overfitting fallacy as a governance problem rather than a statistical footnote, and state the guard rails it proposes."
    sampleAnswer: "Training error falls monotonically as lag parameters are added, so an analyst who minimises in-sample fit will always reach for a bigger polynomial, but adding parameters degrades out-of-sample generalisation. On a quarterly series with only twenty observations, a specification such as SARIMA(4, 1, 4) times (2, 1, 2) at 4 collapses the degrees of freedom to near zero, the characteristic polynomial roots approach the unit circle, and forecasts projected twelve quarters out explode into wild, non-physical oscillations that no treasurer could act on. The lesson's guard rails are to search a grid with non-seasonal orders p at most 2 and q at most 2 and seasonal orders P at most 1 and Q at most 1, to minimise BIC rather than AIC, to fix the seasonal integration order D at 1, and to keep version-controlled parameter freezes of the exact orders and tolerances used for every board forecast."
    explanation: "A strong answer explains why in-sample fit is a misleading objective, cites the twenty-observation sample and the SARIMA(4, 1, 4) times (2, 1, 2) at 4 example with its collapsing degrees of freedom and exploding fan chart, and lists the guard rails of the order restrictions, the BIC criterion, the fixed D of 1 and the parameter freezes."
  - id: "7285bbd5-6b0c-4b93-a41b-0f1c85a3d4f2"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the seven phases of the engine in the lesson, and say what each one is for."
    sampleAnswer: "Phase one is the environment and dependency architecture, pinning Python 3.11+ with Pydantic v2, statsmodels, NumPy and pandas. Phase two is the historical dataset and schema validation, ingesting twenty quarters of Apple GAAP filings from SEC 10-K and 10-Q documents for FY2020-Q1 to FY2024-Q4 through the QuarterlyFinancialRecord model and its GAAP identity check. Phase three is the time-series diagnostics and stationarity testing, with autocorrelation and partial autocorrelation analysis, the Augmented Dickey-Fuller unit root test and quarterly seasonal differencing at s equals 4. Phase four is econometric model selection, grid searching the orders and minimising AIC and BIC. Phase five is confidence interval extraction and fan chart forecasting over a twelve-quarter horizon to FY2027-Q4 with 80% and 95% bands. Phase six is the macroeconomic shock and scenario sensitivity engine, translating the research vector into base, mild, moderate, severe and targeted tariff scenarios with non-linear gross margin compression. Phase seven is the executive synthesis brief and automated variance reporting, which renders the board-level variance table and the audit trail."
    explanation: "A strong answer names all seven phases in order, gives the Apple FY2020-Q1 to FY2024-Q4 dataset and the seasonal period of 4, the twelve-quarter horizon, and the five scenarios, and states the purpose of each phase rather than only its number."
```

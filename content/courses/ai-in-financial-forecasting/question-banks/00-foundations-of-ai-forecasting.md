---
id: "294eb99b-ba23-47d5-90bc-8f6f90941895"
title: "Foundations of AI in Financial Forecasting: Beyond Linear Regression & Spreadsheet Fragility: Question Bank"
description: "Practises the Almanac-versus-radar analogy, the OLS assumptions that fail in finance, the Box-Jenkins stationarity requirement, the rolling-average phase delay, and the Horizon Electronics liquidity crunch."
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

These questions practise [[courses/ai-in-financial-forecasting/lessons/00-foundations-of-ai-forecasting|Foundations of AI in Financial Forecasting: Beyond Linear Regression & Spreadsheet Fragility]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "e93145a3-e07b-4ff8-b234-506c634fa151"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pair of metaphors does this lesson use to contrast the static corporate spreadsheet budget with an adaptive forecasting architecture?"
    options:
      - id: almanac-radar
        text: "The Farmer's Almanac set against the Doppler Radar Array"
      - id: blueprint-shake-table
        text: "A static drafting blueprint set against a multi-axis hydraulic shaking table"
      - id: almanac-telescope
        text: "The Farmer's Almanac set against a long-range astronomical telescope"
      - id: radar-lighthouse
        text: "A rotating lighthouse beam set against the Doppler Radar Array"
    correctOptionIds: [almanac-radar]
    explanation: "The lesson maps the static spreadsheet budget onto the Farmer's Almanac, which projects from historical averages and cannot see a hurricane forming offshore, and maps adaptive forecasting onto the Doppler Radar Array, whose 360-degree volumetric scan completes every four to six minutes. The drafting blueprint and the shaking table belong to the seismic analogy of a later chapter, and neither the telescope nor the lighthouse is used here."
  - id: "61cd1c14-45b9-47b9-8e1d-faa2d683af25"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under the Gauss-Markov Theorem the OLS estimators are the Best Linear Unbiased Estimators only when the classical assumptions hold. Which assumption does the lesson say finance almost universally violates, and what its violation does to the reported standard errors?"
    options:
      - id: homoscedasticity
        text: "Homoscedasticity; a non-constant error variance makes the OLS estimates biased rather than merely inefficient"
      - id: linearity
        text: "Linearity in parameters; S-curves and capacity ceilings turn the fitted slope into a structural specification bias"
      - id: no-autocorrelation
        text: "No autocorrelation; positive serial correlation deflates the standard errors and inflates the t-statistics"
      - id: exogeneity
        text: "Exogeneity of the regressor; a correlated error term drives the residuals into a permanent negative cycle"
    correctOptionIds: [no-autocorrelation]
    explanation: "The lesson states that the no-autocorrelation condition is almost universally violated in finance: a company that exceeds revenue expectations in Q1 on a multi-year deployment is statistically more likely to exceed them again in Q2. With positive serial correlation the standard errors of the coefficients are artificially deflated, which inflates the t-statistics and manufactures an illusion of statistical confidence. Linearity and homoscedasticity are also flagged, but they distort the fitted shape and the error bounds rather than the standard errors in the way asked about here."
  - id: "958af02b-3bb9-47fb-a7be-229e38f404b3"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson works the first-order conditions of the OLS criterion through to a closed-form estimator. What does it say the slope estimator equals?"
    options:
      - id: cov-var
        text: "The covariance of x and y divided by the variance of x"
      - id: min-ssr
        text: "The value of the sum of squared residuals at the point where both partial derivatives vanish"
      - id: sqrt-var
        text: "The square root of the variance of x divided by the variance of y"
      - id: r-squared
        text: "The coefficient of determination implied by the correlation between x and y"
    correctOptionIds: [cov-var]
    explanation: "The derivation arrives at beta-one equal to Cov(x, y) over Var(x), with beta-zero as the mean of y minus beta-one times the mean of x. Minimising the sum of squared residuals is the route to that closed form rather than the estimator itself, and the coefficient of determination is an outcome of the fit rather than the slope."
  - id: "3c0aa112-e1d0-47a1-9cee-64eca261a52f"
    revision: 1
    status: active
    type: single-choice
    prompt: "How long is the lag that the lesson's phase-delay argument attributes to a 12-month simple moving average?"
    options:
      - id: one-period
        text: "One month, because the average of twelve observations still sits at the end of the window"
      - id: three-months
        text: "Three months, because the trailing window is centred on the most recent quarter"
      - id: six-months
        text: "Six months, because half of the twelve-month window sits behind the forecast date"
      - id: five-and-a-half
        text: "Five and a half months"
    correctOptionIds: [five-and-a-half]
    explanation: "On a linear trend the lesson proves that the k-period simple moving average equals the true series evaluated at t minus (k-1)/2, so a twelve-month window reports economic reality of 5.5 months prior. That phase delay is why the lesson calls the rolling average a source of lag amnesia and shows the smoothed line still projecting peak growth long after the market has turned."
  - id: "326749ce-4c1f-4aa4-a452-d378f214cfbc"
    revision: 1
    status: active
    type: single-choice
    prompt: "The benchmark in the lesson runs a stable expansion regime and then a contraction regime over 20 quarters. Which pair of MAPE figures belongs to the OLS linear trend in those two regimes?"
    options:
      - id: ols-mape
        text: "7.73% then 85.55%, because the trendline mechanically extrapolates the expansion into a collapsing market"
      - id: sma-mape
        text: "5.72% then 44.74%, because the four-quarter window keeps pulling forward trailing quarters of peak pre-shock revenue"
      - id: ar-mape
        text: "9.43% then 32.06%, because the mean-reverting coefficient cannot detect the external sentiment collapse from 101 to 61"
      - id: ols-swapped
        text: "85.55% then 7.73%, because the error measure only becomes meaningful once the market has already turned downward"
    correctOptionIds: [ols-mape]
    explanation: "The diagnostic analysis states that OLS fails completely in the shock regime, with MAPE jumping from 7.73% to 85.55% because the model mechanically extrapolates past expansion into a collapsing market. The 5.72% and 44.74% pair belongs to the four-quarter simple moving average and the 9.43% and 32.06% pair to the autoregressive AR(1) model, so each of the other options attaches the right regime error to the wrong architecture."
  - id: "a414e9ff-7db7-4cb4-acc8-e3e0ed33a1b1"
    revision: 1
    status: active
    type: single-choice
    prompt: "Corporate revenue is rarely stationary, so the lesson applies a differencing operator before fitting ARIMA. How does it define first-order differencing?"
    options:
      - id: backshift
        text: "As the backshift operator applied to the series once, so that the differenced value at time t is the observed value at time t minus the observed value at time t minus one"
      - id: trend-removal
        text: "As the removal of the constant mean from the series, so that the expected value no longer depends on calendar time"
      - id: lag-difference
        text: "As the difference between the series and its one-period lag"
      - id: variance-stabiliser
        text: "As the substitution of the logarithmic transform for the raw level, so that the variance stops expanding with company size"
    correctOptionIds: [lag-difference]
    explanation: "The lesson defines the differencing operator as nabla equals one minus B, with B the backshift operator such that B raised to the power k of y-t equals y at t minus k, so first-order differencing is y-t minus y at t minus one. Removing a constant mean is what stationarity requires rather than what differencing performs, and a logarithmic transform is a separate variance-stabilising step that the lesson pairs with differencing rather than substitutes for it."
  - id: "8a7802fb-7750-453b-bcf6-ab593af1e35e"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Horizon Electronics case study, what were the actual Q1 and Q2 2024 quarterly revenues?"
    options:
      - id: seventeen
        text: "$17.4M and $16.9M, a modest shortfall against the plan that the balance sheet could absorb"
      - id: twelve-eleven
        text: "$12.1M and $11.4M, a 38% negative revenue variance against the spreadsheet projection"
      - id: eighteen-five
        text: "$18.5M and $18.1M, which is what the OLS trendline had projected for both quarters"
      - id: zero
        text: "$0.0M and $0.0M, because the rolling average reported no revenue at all once the leading indices turned down"
    correctOptionIds: [twelve-eleven]
    explanation: "Horizon had projected 2024 revenue of $74.2M, about $18.5M a quarter, but realised $12.1M in Q1 and $11.4M in Q2 2024, a 38% negative revenue variance. The $18.5M figure is the forecast rather than the outcome, and a rolling average that had turned down would still have carried the high revenues of the previous year rather than reporting nothing."
  - id: "4c772fc4-279d-4040-a946-856d032d56ca"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The root-cause diagnostic for Horizon Electronics names two fallacies. Which two does it name? Select every correct answer."
    options:
      - id: trend-trap
        text: "The Homoscedastic Trend Extrapolation Trap"
      - id: average-trap
        text: "The Rolling Average Amnesia Fallacy"
      - id: precision-trap
        text: "The Spreadsheet Pseudo-Precision Trap"
      - id: variance-trap
        text: "The Heteroscedasticity Trap"
    correctOptionIds: [trend-trap, average-trap]
    explanation: "The diagnostic names exactly two failures: the Homoscedastic Trend Extrapolation Trap, the spreadsheet that kept projecting linear expansion, and the Rolling Average Amnesia Fallacy, the four-quarter window still buoyed by the high revenues of the second, third and fourth quarters of 2023. It also lists three structural causes behind them, the absence of leading macroeconomic ingestion, the inability to model multi-modal interaction and the absence of probabilistic fan bounds, but those are causes rather than the named fallacies. Spreadsheet pseudo-precision and heteroscedasticity are real weaknesses of the old toolset, yet they are not the two labels the diagnostic attaches to this failure."
  - id: "1c4fddd8-f6f2-48ed-aa92-431744279ada"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Before an ARIMA model can be applied to corporate financial data, what does the lesson require? Select every correct answer."
    options:
      - id: stationarity
        text: "That the series satisfy weak (covariance) stationarity"
      - id: differencing
        text: "That the series be differenced with the operator nabla equals one minus B to remove trend and seasonal structure"
      - id: exogenous
        text: "That exogenous leading indicators such as interest rates be supplied to the model as regressors"
      - id: seasonal-period
        text: "That the seasonal period s be set to twelve for quarterly corporate earnings"
    correctOptionIds: [stationarity, differencing]
    explanation: "The lesson makes stationarity the precondition, namely a constant mean, a constant variance and an autocovariance that depends only on the lag, and then says the differencing operator nabla equals one minus B, with the seasonal form one minus B to the power s, is how a trending and seasonal series is made to meet it. It also says standard SARIMA is univariate, predicting revenue from revenue alone and staying blind to leading exogenous variables such as rates, churn alerts or supply-chain bottlenecks, so supplying them is not a requirement. And the seasonal period for quarterly corporate earnings is four, with twelve reserved for monthly data."
  - id: "8342df50-93f4-4a71-aba1-1b57d1b59f6c"
    revision: 1
    status: active
    type: true-false
    prompt: "In the lesson's benchmark, the four-quarter simple moving average is the model that degrades least when the regime changes from expansion to contraction."
    answer: false
    explanation: "The benchmark reports the opposite ordering. The OLS linear trend degrades most, with MAPE rising from 7.73% to 85.55% because it extrapolates the expansion into a collapsing market. The simple moving average is the second worst, rising from 5.72% to 44.74% because it keeps pulling forward trailing quarters of peak pre-shock revenue. It is the autoregressive AR(1) model that degrades least of the three, at 32.06% after 9.43%, and even it fails because its mean-reverting coefficient cannot detect the external sentiment collapse from 101 to 61."
  - id: "6f87ee6a-968f-4b89-a7de-a6d8fdcb5aee"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why the lesson argues that a simple moving average cannot be relied on to detect the turn in a market, and what the phase-delay argument shows."
    sampleAnswer: "A simple moving average replaces each observation with the arithmetic mean of the last k observations, so it cannot react faster than the data it averages. On a linear trend the lesson proves that the average equals the true series evaluated at t minus (k-1)/2, which means a twelve-month window reports economic reality from 5.5 months earlier. In the benchmark the four-quarter average therefore carried strong trailing numbers straight into the contraction, because the high revenues of the pre-shock quarters were still inside the window, and its MAPE jumped from 5.72% to 44.74%."
    explanation: "A strong answer states the phase delay, gives the (k-1)/2 result and the 5.5 months for a twelve-month window, and then connects it to the benchmark: the smoothed line was still projecting peak growth while the market had already turned, so the model was reading trailing history rather than the present."
  - id: "e1ce4ebc-c689-4ab7-bd8d-710153292a06"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the lesson means by the three pillars of modern adaptive forecasting, and give the worked example it uses for non-linear interaction recognition."
    sampleAnswer: "The three pillars are multi-modal feature alignment, which ingests internal ERP and CRM telemetry alongside external macro indicators such as yield curve inversions, producer price indices, freight rates and currency moves; non-linear interaction recognition, where gradient boosted trees or temporal fusion transformers detect thresholds a straight line cannot; and continuous rolling re-forecasts, where telemetry streams in every week or month and the forecast is recalculated instead of frozen for a year. The worked example is digital advertising spend, which yields linear revenue growth up to $2M per quarter and then hits ad saturation with sharply diminishing returns."
    explanation: "A strong answer names all three pillars in the lesson's own words, uses the $2M per quarter advertising saturation threshold for the non-linear pillar and the twelve-day extension in customer payment times for the rolling pillar, and makes the contrast with the frozen annual budget explicit."
```

---
id: "0a0203b3-9c57-4d3a-b423-1202a923be47"
title: "Financial Data Engineering: Ingestion, Imputation & Multimodal Feature Alignment: Question Bank"
description: "Practises the refinery analogy, the flow, stock and rate aggregation operators, the three imputation methods, the ADF stationarity gate, and the Apex Global Logistics phantom dip."
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

These questions practise [[courses/ai-in-financial-forecasting/lessons/01-financial-data-engineering-cleaning|Financial Data Engineering: Ingestion, Imputation & Multimodal Feature Alignment]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "edacfabd-c371-4e6e-9af5-1adc0a3d0665"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the refinery analogy that governs this lesson's pipeline, which stage corresponds to statistical imputation of missing records?"
    options:
      - id: desalting
        text: "Desalting and washing, because that is the stage in which the schema is validated and every foreign currency entry is converted to the USD base"
      - id: hydrotreating
        text: "Catalytic hydrotreating, because that is where missing records are filled"
      - id: reforming
        text: "Catalytic reforming, because that is where the logarithmic variance stabilisation and the first and seasonal differencing are applied"
      - id: jet-a
        text: "Aviation kerosene, because that is the finished output that the downstream machine-learning model consumes as its feature tensor"
    correctOptionIds: [hydrotreating]
    explanation: "The refinery table maps desalting and washing to schema validation and ISO 4217 currency normalisation, fractional distillation to multimodal frequency alignment and resampling, catalytic hydrotreating to the statistical imputation of missing records by forward-fill, linear interpolation or MICE, catalytic reforming to the stationarity transformation of logarithmic variance stabilisation and differencing, and aviation kerosene to the verified covariance-stationary tensor handed to the model. Imputation is hydrotreating; the other three stages are currency and schema work, differencing and the finished output respectively."
  - id: "eeaf326e-5f84-4b31-b4f6-dc8e2980063c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A quarterly feature is built from a daily EUR/USD spot series and from quarterly revenue. Which aggregation does the lesson prescribe for each?"
    options:
      - id: sum-both
        text: "Sum the daily exchange rates across the quarter and sum the daily revenue, because both are measured over an elapsed interval"
      - id: mean-both
        text: "Average the exchange rate across the quarter and take the last revenue observation, because a price and a flow behave the same way"
      - id: last-and-mean
        text: "Take the last exchange rate and average the revenue, because a rate and a flow are both continuous in time"
      - id: rate-and-flow
        text: "Time-weight the exchange rate across the quarter and sum the revenue over the quarter"
    correctOptionIds: [rate-and-flow]
    explanation: "The lesson separates flow variables, aggregated by summation over the interval, from stock variables, taken as the end-of-period snapshot, and rate or intensity variables, aggregated as a time-weighted mean or median. Quarterly revenue is a flow and is summed; EUR/USD spot is a rate and is time-weighted. Summing ninety days of exchange rates to produce a quarterly rate of 97.2 is named in the lesson as a disastrous arithmetic error that completely corrupts model weights."
  - id: "1d5b877e-6a28-4cbd-86b0-3affb4627968"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson call zero-insertion the fatal anti-pattern for a missing flow variable?"
    options:
      - id: phantom
        text: "It implants phantom negative autocorrelation and inflates the sample variance of the series"
      - id: variance-only
        text: "It preserves the variance of the series but flattens the trend, so the model under-forecasts revenue without ever distorting the residual structure"
      - id: ceased-items
        text: "It is only valid for line items that legitimately ceased, such as cancelled software licenses, and for a flow variable it merely understates the level of the quarter"
      - id: stock-bals
        text: "It is acceptable for stock variables such as cash balances, because a missing balance is treated as a zero balance on the balance sheet"
    correctOptionIds: [phantom]
    explanation: "The lesson's zero-insertion column records massive artificial inflation of the variance and severe phantom negative autocorrelation, because a drop to zero followed by a rebound looks like a violent collapse and recovery that never happened and forces autoregressive models to infer extreme cyclical oscillation where none exists. It is legitimate only for line items that genuinely ceased, such as cancelled software licenses, and the catastrophic distortion the case study records comes from applying it to a revenue flow."
  - id: "0cecf13b-3615-4f38-a733-afbced813f89"
    revision: 1
    status: active
    type: single-choice
    prompt: "The empirical output of this lesson's pipeline compares three imputations of the same missing revenue record. What value does it report for the linear interpolation method?"
    options:
      - id: zero-value
        text: "$0.00, because the zero-insertion method records a missing week as no activity at all"
      - id: locf-value
        text: "$13,900,000.00, because the forward-fill method carries the last observation through the gap"
      - id: interp-value
        text: "$14,436,500.00, the continuous smoothed bridge"
      - id: knn-value
        text: "$14,286,000.00, because the KNN method reconstructs the gap from the nearest comparable subsidiaries in the same region"
    correctOptionIds: [interp-value]
    explanation: "The execution output prints the three methods side by side for the same missing observation: zero-insertion gives $0.00 and is labelled a catastrophic distortion, forward-fill gives $13,900,000.00 and is labelled a stagnation assumption, and linear interpolation gives $14,436,500.00 and is labelled the continuous smoothed bridge. The interpolation figure is therefore $14,436,500.00, not the forward-fill number. KNN and MICE are described in the comparison table but neither is executed in the terminal output, so no $14,286,000.00 figure appears anywhere."
  - id: "85d84886-1ce3-4f7f-8c08-93349f318f70"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson's ADF diagnostic report for the raw revenue level series, and what does it instruct the pipeline to do next?"
    options:
      - id: already-stationary
        text: "An ADF statistic of -3.852 against a critical value of -2.980, so the series is already stationary and needs no transformation"
      - id: unit-root-stands
        text: "An ADF statistic of 0.193 against a critical value of -2.980, so the unit root stands and the series is log-differenced"
      - id: null-rejected
        text: "An ADF statistic of 0.193 against a 5% critical value of -2.980, so the null hypothesis of a unit root is rejected and the series is already stationary"
      - id: differenced-twice
        text: "An ADF statistic of -3.852 against a 5% critical value of -2.980, so the series is log-differenced a second time before it enters the feature store"
    correctOptionIds: [unit-root-stands]
    explanation: "The null hypothesis of the ADF test is that a unit root is present, so a statistic above the 5% critical value means the null is accepted and the series is not stationary. The raw level prints 0.193 against -2.980 and is marked not stationary, while the log-differenced series prints -3.852 against -2.980 and is marked stationary at the 5% level. The other options either swap the two rows or draw the wrong conclusion from the raw figure."
  - id: "4dd750ed-9e93-46f1-8c2f-3191cda4e2c0"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Apex Global Logistics case study, what was the look-ahead defect in the feature engineering?"
    options:
      - id: train-only
        text: "The MinMaxScaler was fitted on the training fold only, so the 2023-2024 inflation spike was scaled with parameters learned from the pandemic trough"
      - id: averaged-index
        text: "The pipeline averaged the Baltic Dry freight index over the whole 2019-2024 window before splitting, which double-counted the diesel price shock"
      - id: seasonal-dummies
        text: "The seasonal dummy variables were added to the raw container counts, so the model had no way to learn the quarterly cycle on its own"
      - id: global-scaler
        text: "The MinMaxScaler was fitted across the whole 2019-2024 history, so the model learned the 2020 pandemic trough diesel price"
    correctOptionIds: [global-scaler]
    explanation: "The lesson describes a global MinMaxScaler applied across the entire 2019-2024 dataset at once, rather than fitted on trailing training folds, so the normalised variance of the 2023-2024 inflationary energy spike was compressed against the pandemic-trough minimum. The remedy is strict Scikit-learn pipelines with out-of-time rolling cross-validation through TimeSeriesSplit, with scalers fitted exclusively on train windows."
  - id: "391412dc-2600-472a-80b5-aba8b99a2303"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did Apex do in response to the forecast that the zero-insertion had produced, and what did the reconciled actuals show?"
    options:
      - id: cut-capacity
        text: "It cancelled 450 trailer lease options and furloughed 60 drivers, while actual Q3 revenues rose 8% year-over-year"
      - id: cut-and-fell
        text: "It cancelled lease options for 450 long-haul trailers and furloughed 60 drivers, while actual Q3 revenues fell 8% year-over-year"
      - id: grew-capacity
        text: "It expanded the fleet by leasing 450 trailers and retained all 60 drivers, while actual Q3 revenues came in up 8% year-over-year"
      - id: cut-and-contracted
        text: "It cancelled lease options for 450 trailers and furloughed 60 drivers, while the reconciliation showed the European business had in fact contracted sharply"
    correctOptionIds: [cut-capacity]
    explanation: "The phantom dip came from eight consecutive weeks of zero-inserted revenue in June and July, so the model read a violent cyclical crash and projected a further 34% collapse in European volume for Q4. Apex acted on it by terminating dry-van lease options for 450 long-haul trailers in Rotterdam and Antwerp and furloughing 60 commercial drivers. In reality European demand was robust and actual Q3 revenues were up 8% year-over-year once the unmapped accounts were reconciled, so the company then had to spot-charter emergency carriers at a 65% premium and absorb $4.2M in penalty fees and emergency broker expenses."
  - id: "473ee05b-d2c0-4fa5-b66e-ccf3915f3a6e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these did the lesson say the corrected Apex pipeline added as automated gates? Select every correct answer."
    options:
      - id: schema-invariants
        text: "Schema invariant assertions that raise on a revenue value of zero or less, halting the run before a forecast is published"
      - id: rolling-cv
        text: "Strict Scikit-learn pipelines with out-of-time rolling cross-validation, with scalers fitted only on train windows"
      - id: stationarity-gate
        text: "A stationarity gate that routes any series failing the Augmented Dickey-Fuller test at p greater than 0.05 through logarithmic differencing"
      - id: seasonal-dummies
        text: "A seasonal dummy for every quarter of the year, so the model never has to learn the holiday cycle from the data"
    correctOptionIds: [schema-invariants, rolling-cv, stationarity-gate]
    explanation: "The recovery added three gates: automated schema invariant assertions requiring revenue greater than zero, strict Scikit-learn pipelines with out-of-time rolling cross-validation through TimeSeriesSplit so scalers are fitted only on train windows, and an automated stationarity gate that routes any series failing the Augmented Dickey-Fuller test at p greater than 0.05 through logarithmic differencing before it enters the feature store tensors. Seasonal dummies are exactly the shortcut that let the original model train on raw, un-differenced container counts, so they are not part of the fix."
  - id: "ffd6984e-d7dd-4cb8-9f8f-a12e79fbfdd2"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two situations does the lesson say forward-fill, or last observation carried forward, suits? Select every correct answer."
    options:
      - id: stock-prices
        text: "Daily stock prices, where the market is closed and no new trade occurs"
      - id: quarterly-revenue
        text: "Quarterly sales revenue in a growing market, where carrying the last quarter forward is a reasonable estimate of the next"
      - id: fx-weekends
        text: "Weekend foreign exchange rates and interest rate holidays"
      - id: migration-gap
        text: "A quarter in which an ERP migration left the general ledger with no revenue records at all"
    correctOptionIds: [stock-prices, fx-weekends]
    explanation: "The lesson's comparison table places forward-fill on the line of appropriate contexts for daily stock prices, weekend foreign exchange rates and interest rate holidays, and on the line of inappropriate contexts for flow variables such as sales revenue or quarterly expenses, because carrying last quarter's revenue forward across an expanding market assumes zero economic growth and artificially suppresses the underlying volatility. A quarter with no ledger records at all is a gap in a flow variable, which the lesson routes to linear interpolation or to multimodal imputation instead."
  - id: "4f86b9b1-c81f-43cf-924b-2018041cd86c"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that the Augmented Dickey-Fuller test needs a minimum of eight data points before it will run."
    answer: true
    explanation: "The pure-Python ADF engine in the pipeline raises a ValueError when the series is shorter than eight points, so the minimum sample requirement is real. The test's null hypothesis is that a unit root is present, so a p-value above 0.05 leaves the series non-stationary and sends it into differencing, while a statistic below the 5% critical value rejects the null. The eight-point floor and the 5% threshold are separate rules, and both appear in the execution output against a critical value of -2.980."
  - id: "078c3a45-0288-4ee5-969b-e4e85ff993f7"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain, in your own words, why the lesson insists that data purity has to precede model sophistication, and use the Apex Global Logistics case study to support your answer."
    sampleAnswer: "A model is an optimisation engine over its inputs, so no sophistication in the learner can repair a contaminated feature vector. In Apex's case the fault was not the choice of ARIMA over LSTM or XGBoost but a failure in the refining pipeline: $18.4M of invoice records failed to sync during the SAP S/4HANA migration and the ETL wrote those eight weeks as $0.00, a global scaler leaked information from the whole 2019-2024 window, and an ARIMA was trained on raw, un-differenced container counts. The model read the artifact as a real collapse, so the company cut capacity and paid $4.2M in penalties while demand was in fact up 8% year-over-year."
    explanation: "A strong answer states the principle that output fidelity cannot exceed the structural purity of the input vectors, then grounds it in the three defects the lesson lists, the zero-insertion of the $18.4M of unsynced SAP invoices, the global scaler fitted across 2019-2024 and the model trained on undifferenced counts, and closes with the operational cost of $4.2M in penalties and emergency broker expenses."
  - id: "d1bee634-da37-4fcd-a7f4-79f9b89502c2"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the flow, stock and rate aggregation operators the lesson defines, and explain why choosing the wrong one corrupts the model."
    sampleAnswer: "A flow variable measures activity over an elapsed interval and is aggregated by summation across the interval, so quarterly revenue, cost of goods sold, marketing spend and units shipped are summed over the quarter. A stock variable is a point-in-time balance and is aggregated as the end-of-period snapshot, so cash, inventory, the accounts receivable balance and headcount take the last observed value. A rate or intensity variable is a continuous level and is aggregated as a time-weighted mean or median, so the ten-year Treasury yield, the federal funds rate, the EUR/USD spot rate and the inflation rate are averaged with time weighting. The consequence of the wrong operator is a corrupted tensor: summing ninety days of EUR/USD to make a quarterly rate of 97.2 is named a disastrous arithmetic error that completely corrupts model weights."
    explanation: "A strong answer gives one or two examples for each of the three operators, states the summation, end-of-period and time-weighted mean rules, and quotes the EUR/USD arithmetic error to show the consequence of choosing the wrong operator."
```

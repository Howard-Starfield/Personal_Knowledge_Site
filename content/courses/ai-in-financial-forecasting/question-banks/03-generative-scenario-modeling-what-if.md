---
id: "d2e1bf71-7f12-4cba-bb54-d62c63847e7a"
title: "Dynamic Scenario Analysis: Probabilistic 'What-If' Projections & Deep Market Research: Question Bank"
description: "Practises the shake-table analogy, the three levels of forecasting maturity, shock vector construction, the working capital scissors, Cash Flow at Risk, and the Apex Global Robotics solvency collapse."
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

These questions practise [[courses/ai-in-financial-forecasting/lessons/03-generative-scenario-modeling-what-if|Dynamic Scenario Analysis: Probabilistic 'What-If' Projections & Deep Market Research]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "a205db61-cdc1-4e84-adb5-d18febefb810"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's translation table between seismic engineering and financial stress-testing, what does the resonant frequency of a building correspond to in the corporate engine?"
    options:
      - id: revolver
        text: "The revolving credit facility, because the damper saturates when the bank freezes the credit line"
      - id: cash-trap
        text: "The working capital cash trap, because receivables freeze while vendors demand cash upfront"
      - id: static-plan
        text: "The static Annual Operating Plan, because both assume calm markets and invariant loads"
      - id: operating-leverage
        text: "Operating leverage and a high fixed cost structure"
    correctOptionIds: [operating-leverage]
    explanation: "The table maps a building's natural frequency matching the seismic pulse onto operating leverage and a high fixed cost structure, so a high fixed SG&A base converts modest top-line dips into an EBIT collapse. The revolving credit facility maps to damper saturation, the working capital cash trap to material yielding, and the static Annual Operating Plan to the static blueprint."
  - id: "e8f9d8f8-11a1-4d23-b8de-c61fdc9cff4e"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say distinguishes Level 1 static budgeting from Level 3 dynamic scenario modelling?"
    options:
      - id: point-estimate
        text: "Level 1 is a single point estimate, while Level 3 bounds the future into joint probabilistic distributions"
      - id: sensitivity-table
        text: "Level 1 uses a point forecast, while Level 3 replaces it with an isolated one-variable sensitivity table that toggles one parameter at a time"
      - id: tornado-chart
        text: "Level 1 assumes calm markets, while Level 3 adds a tornado chart so that each input can be swung by plus or minus five per cent"
      - id: ebitda-stop
        text: "Level 1 forecasts revenue only, while Level 3 forecasts the full income statement but stops at EBITDA rather than free cash flow"
    correctOptionIds: [point-estimate]
    explanation: "The evolution diagram runs from a deterministic point forecast with revenue of $1,000M, EBITDA of $220M and FCFF of $110M under an explicit 100% certainty assumption, through isolated sensitivity tables that toggle one parameter at a time and assume ceteris paribus, to a dynamic probabilistic scenario manifold with Base, Best, Downside and Tail cases at weights of 0.50, 0.20, 0.20 and 0.10 that propagates shocks multiplicatively and computes CFaR at the 95th level. The one-at-a-time table is Level 2, and free cash flow is modelled at every level."
  - id: "7406ead2-7bfb-4bca-9879-36de1b8c181c"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson define Cash Flow at Risk at confidence level alpha?"
    options:
      - id: weighted-sum
        text: "As the sum of the probability-weighted free cash flows across every simulated scenario, which is the expected value of the cash flow distribution"
      - id: parametric
        text: "As the standard deviation of simulated free cash flow multiplied by the normal critical value of 1.645, which is the parametric estimate"
      - id: quantile-gap
        text: "As the expected free cash flow minus the alpha quantile of the simulated cash flow distribution"
      - id: scenario-gap
        text: "As the gap between the base-case free cash flow and the downside-case free cash flow, weighted by the two scenario probabilities"
    correctOptionIds: [quantile-gap]
    explanation: "The lesson defines CFaR as E[FCFF] minus F inverse of alpha, where the expectation is the probability-weighted mean sum of p-k times FCFF-k and the quantile is the alpha-quantile of the cash flow distribution, the 5th percentile for a 95% confidence level. The standard-deviation form multiplied by 1.645 is the parametric Gaussian estimate, which the lesson rejects because corporate cash flows are severely negatively skewed, and the gap between two named scenarios is a deterministic comparison rather than a risk metric."
  - id: "e8377876-d213-4e46-80b3-05e5b7b4d491"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's working capital scissors effect, which three distortions hit the enterprise at once under macroeconomic stress?"
    options:
      - id: release
        text: "Customers pay faster, suppliers relax their terms, and safety stock falls, so cash releases and the balance sheet strengthens"
      - id: scissors
        text: "Customers delay payment, suppliers demand cash faster, and safety stock builds, so cash is trapped"
      - id: payables-float
        text: "Customers delay payment, suppliers extend their terms generously, and safety stock falls, so the drain is offset by a payables float"
      - id: cancelling
        text: "Customers pay faster, suppliers demand cash faster, and safety stock builds, so the two cash effects cancel each other out"
    correctOptionIds: [scissors]
    explanation: "The lesson names three simultaneous distortions: customers delaying payment so days sales outstanding stretch from 45 to 65, suppliers refusing standard credit and demanding net-30 or cash-in-advance so days payable outstanding contract, and safety stock accumulation driven by unpredictable supply chains, border tariff delays and shipping rerouting. Together they drive the change in net working capital deep into positive territory, a severe cash drain that can exhaust liquidity even while the income statement reports positive net income."
  - id: "12ed70ea-abd7-447a-a3cd-26e35679c2b4"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson report for Apex Global Robotics' free cash flow to the firm under the stagflationary stress, compared with the static board budget?"
    options:
      - id: no-change
        text: "Plus $113.2M against a budget of plus $113.2M, because the stress was priced into the plan before the tariff landed"
      - id: spreadsheet
        text: "Minus $45.0M against a budget of plus $113.2M, which is what the linear spreadsheet predicted once the 14% volume drop was entered"
      - id: net-income
        text: "Minus $85.7M against a budget of plus $126.4M, because net income is the figure the treasury department reported"
      - id: fcff-swing
        text: "Minus $116.8M against a budget of plus $113.2M, a swing of $230.0M"
    correctOptionIds: [fcff-swing]
    explanation: "The variance table shows free cash flow to the firm falling from a budgeted plus $113.2M to minus $116.8M, a swing of $230.0M, while the working capital change moved from plus $8.0M to plus $48.6M, a cash trap of $40.6M. The minus $85.7M figure is GAAP net income rather than free cash flow, and the plus $45M number was what the linear spreadsheet predicted, not what the treasury department found."
  - id: "88a15a72-3624-446d-8961-7f8115441fa3"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson gives a degree of operating leverage of 4.5 for an enterprise with high fixed overhead. What does that number mean for a 10% revenue decline?"
    options:
      - id: proportional
        text: "Operating profit falls by 10% as well, because the contribution margin absorbs the whole change in revenue and the fixed base is untouched"
      - id: dol
        text: "Operating profit falls by 45%, because the degree of operating leverage is the percentage change in EBIT per percentage change in revenue"
      - id: revenue-shock
        text: "Revenue falls by a further 45%, because the multiplier converts an operating shock into a top-line shock"
      - id: no-effect
        text: "Nothing changes in EBIT, because a degree of operating leverage of 4.5 describes the sensitivity of revenue to cost rather than EBIT to revenue"
    correctOptionIds: [dol]
    explanation: "The degree of operating leverage is defined as the percentage change in EBIT divided by the percentage change in revenue, equal to contribution margin over EBIT. At 4.5, a 10% revenue decline triggers a 45% collapse in operating EBIT, which is why operating leverage acts as an accelerator of cash destruction in downside scenarios rather than a neutral multiplier."
  - id: "847bb601-403b-4e9d-bf19-661523826f95"
    revision: 1
    status: active
    type: single-choice
    prompt: "Suppliers raise their prices by 10% and the enterprise can only raise its end-product prices by 3%. What pricing pass-through coefficient does the lesson derive, and what does it describe?"
    options:
      - id: pass-through
        text: "A coefficient of 0.30, describing how much input inflation can be passed on without destroying unit volume"
      - id: absorbed-share
        text: "A coefficient of 0.70, describing the share of the cost increase the enterprise must absorb inside its own margin"
      - id: price-share
        text: "A coefficient of 0.03, describing the enterprise's share of end-product price increase when suppliers raise prices by 10%"
      - id: required-multiple
        text: "A coefficient of 3.33, describing the multiple by which a unit price rise must exceed an input price rise to hold the margin flat"
    correctOptionIds: [pass-through]
    explanation: "The lesson computes the pass-through as 3% divided by 10%, giving 0.30, and uses it to quantify the enterprise's ability to pass upstream input inflation to end customers without destroying unit volume. The coefficient multiplies into the revenue shock equation, so a low pass-through means a price rise cannot offset a cost shock and the margin absorbs it."
  - id: "b9914987-f188-4e69-8898-2a97cd1f84eb"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three of these does the lesson list as steps in the structured conversion pipeline that turns a narrative macro scenario into model inputs? Select every correct answer."
    options:
      - id: volume-shock
        text: "A revenue volume shock derived from GDP elasticity, purchasing managers' indices and historical churn"
      - id: pass-through
        text: "A pricing pass-through elasticity expressing how much input inflation can be passed to customers"
      - id: cogs-multipliers
        text: "Cost of goods sold multipliers for tariffs, commodities and freight, weighted by the bill of materials"
      - id: narrative-summary
        text: "A narrative summary of the geopolitical headline, so the analyst can trace the shock back to its source"
    correctOptionIds: [volume-shock, pass-through, cogs-multipliers]
    explanation: "The pipeline has four steps: the revenue volume shock from industry GDP elasticity, purchasing managers' indices and historical customer churn; the pricing pass-through elasticity; cost of goods sold multipliers for tariffs, commodities and freight, weighted by the component share of the bill of materials; and working capital velocity shocks for days sales outstanding, days payable outstanding and days inventory outstanding, derived from liquidity surveys and lead-time expansions. A narrative summary is what the pipeline consumes and discards; what it must produce is a quantified shock vector."
  - id: "d9d69dda-3e97-4256-9cf4-94e770209d25"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three patterns does the lesson say make a generative model a useful adversarial red team rather than a consensus machine? Select every correct answer."
    options:
      - id: premortem
        text: "The premortem query, which assumes the enterprise has already breached its covenants and entered restructuring and asks for the causal chain"
      - id: counter-factual
        text: "The counter-factual stress prompt, which forbids consensus data and asks for the unhedged transmission channels that would exhaust free cash flow"
      - id: persona-debate
        text: "The persona-constrained debate, in which specialised agents challenge each other's assumptions in structured rounds before synthesis"
      - id: generic-prompt
        text: "A single generic prompt asking for standard financial forecasting assumptions for an industrial equipment manufacturer next year"
    correctOptionIds: [premortem, counter-factual, persona-debate]
    explanation: "The lesson warns that a generic prompt about standard assumptions reliably returns sanitised corporate consensus optimism, typically modest 3% to 5% growth with stable gross margins, because foundation models are pre-trained on documents that are systematically optimistic. The remedies it names are the premortem query pattern, the counter-factual stress prompt that prohibits consensus data, and persona-constrained multi-agent debate in structured rounds. The generic prompt is the trap the lesson warns about, not one of the techniques."
  - id: "2cde66d2-6421-4a06-ad14-21b7633e9eb6"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that Apex's cost of goods sold rose from $636M to $657M even though revenue fell by 22%."
    answer: true
    explanation: "The lesson attributes the rise to the tariff and commodity squeeze: 18% tariff surcharges and 12% raw material inflation overwhelmed the minor reduction in unit volumes, so cost of goods sold rose while revenue fell by 22%. It also notes that labor costs fell by only 3.5% despite a 14% unit volume drop, because unionized assembly technicians and cleanroom leases could not be easily terminated."
  - id: "dd9a1c52-87eb-43ce-a9ed-613ab161030a"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain, in your own words, why the lesson argues that the linear spreadsheet's forecast of plus $45M of net income for Apex was not merely imprecise but structurally incapable of showing the solvency problem."
    sampleAnswer: "The spreadsheet adjusted one input and left everything else intact, so it applied linear cost scaling: variable costs fell in proportion to revenue, margins held, working capital cycles and capital expenditure were untouched. The lesson names three transmission mechanics the model ignored. Tariff and commodity inflation raised cost of goods sold from $636M to $657M while revenue fell 22%. Fixed overhead could not flex, with labor costs down only 3.5% against a 14% unit volume drop. And the working capital scissors drained $48.6M as days sales outstanding stretched from 45 to 61 while days payable outstanding contracted from 50 to 40. Free cash flow therefore fell to minus $116.8M, a burn of $9.7M a month, against a spreadsheet that said plus $45M."
    explanation: "A strong answer names the three non-linear mechanics, the tariff and commodity squeeze, the fixed overhead inflexibility and the $48.6M working capital drain, and shows how they turn a modest-looking profit forecast into a cash insolvency, with the $113.2M to minus $116.8M swing."
  - id: "0164511f-f6c6-439a-88c0-07b8e53f1976"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the lesson prefers a non-parametric empirical Cash Flow at Risk to the parametric Gaussian version, and describe how the empirical figure is computed."
    sampleAnswer: "The lesson argues that corporate cash flow distributions are severely negatively skewed and fat-tailed to the downside, because operating leverage compresses margins asymmetrically, debt covenants and liquidity runs show threshold-driven cliff effects, and working capital cash traps accelerate non-linearly under stress. A Gaussian model with its symmetric tails therefore badly understates the downside. The empirical figure is computed by drawing 10,000 Monte Carlo perturbations across the scenario shock vectors, sorting the resulting distribution and extracting the exact fifth-percentile value, then subtracting that quantile from the probability-weighted expected free cash flow to give CFaR at the 95th level."
    explanation: "A strong answer gives the three reasons the Gaussian assumption fails, states that the engine draws 10,000 Monte Carlo perturbations and takes the empirical fifth percentile rather than the 1.645 standard-deviation approximation, and connects the fat left tail to the size of the liquidity buffer a treasury must hold."
```

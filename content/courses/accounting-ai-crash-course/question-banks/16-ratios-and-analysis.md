---
id: "501fe964-ae16-4bca-807e-3397cd8ab0f5"
title: "Ratios and Business Analysis Question Bank"
description: "Practice questions for Ratios and Business Analysis."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study and a made-up neighbor, Riverside Auto Detailing; every figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "a3f15acf-331d-433d-9998-f20cbe5a2d85"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's May service revenue is $48,000 and its cost of services is $16,800. What is the gross margin?"
    options:
      - id: cost-share
        text: "35.0%, the share of revenue that is spent delivering the work"
      - id: net-share
        text: "17.5%, the share of revenue left after every cost"
      - id: gross-share
        text: "65.0%, the share of revenue left after delivery costs"
    correctOptionIds: [gross-share]
    explanation: "Gross margin is gross profit divided by revenue, so $31,200 divided by $48,000 gives 65.0%. The 35.0% option is the cost share, which is the mirror image of gross margin, and 17.5% is the net margin that remains after overhead and interest."
  - id: "31f74b85-6a40-4f06-91f7-dd990f6c0403"
    revision: 1
    status: active
    type: single-choice
    prompt: "In a later month BoBo's cost of services rises to $20,000 while revenue stays at $48,000. What is the new gross margin?"
    options:
      - id: gm-58
        text: "58.3%, because $28,000 of gross profit remains"
      - id: cost-41
        text: "41.7%, because that is the share spent on delivery"
      - id: unchanged
        text: "65.0%, because revenue did not move this month"
    correctOptionIds: [gm-58]
    explanation: "Gross profit falls to $28,000, and $28,000 divided by $48,000 is 58.3%. The 41.7% option is the cost share rather than the margin, and 65.0% wrongly assumes margin depends only on revenue when costs also change it."
  - id: "90fd2f53-a0f7-46d4-a70e-c7b0f24b48a3"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using BoBo's May 31 balance sheet, which calculation gives the quick ratio?"
    options:
      - id: all-assets
        text: "All current assets of $54,000 over current liabilities"
      - id: cash-ar
        text: "Cash plus receivables of $52,000 over current liabilities"
      - id: cash-only
        text: "Cash alone of $22,000 over total current liabilities of $17,300"
      - id: total-liab
        text: "Cash plus receivables of $52,000 over total liabilities"
    correctOptionIds: [cash-ar]
    explanation: "The quick ratio keeps only the most liquid current assets, here cash of $22,000 plus receivables of $30,000, and divides by current liabilities of $17,300 to get about 3.01. Using all current assets would give the current ratio of 3.12 instead, and dividing by total liabilities mixes in the long-term note."
  - id: "75548096-02d5-4869-b3fc-b233a4e7a24a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which ratio uses only ending balance sheet figures, with no averaging needed?"
    options:
      - id: dso
        text: "Days sales outstanding, comparing receivables to revenue"
      - id: ar-turnover
        text: "Receivables turnover, comparing revenue to receivables"
      - id: dpo
        text: "Days payable outstanding, comparing payables to costs"
      - id: debt-equity
        text: "Debt-to-equity, comparing liabilities to owner equity"
    correctOptionIds: [debt-equity]
    explanation: "Debt-to-equity divides two balance sheet snapshots taken on the same date, so the ending balances match each other and no averaging is needed. DSO, receivables turnover and DPO each pair a period total from the income statement with a balance sheet line, which is why they use average balances."
  - id: "b306f070-41a8-472a-b2f8-30f1478c0c78"
    revision: 2
    status: active
    type: single-choice
    prompt: "BoBo's average receivables are $28,000 and its May credit sales are $48,000. Using a 30-day period, what is DSO?"
    options:
      - id: dso-175
        text: "17.5 days, from average receivables over credit sales"
      - id: dso-514
        text: "51.4 days, from credit sales over average receivables"
      - id: dso-188
        text: "18.8 days, from ending receivables over credit sales"
    correctOptionIds: [dso-175]
    explanation: "DSO is average receivables divided by net credit sales, times the days in the period, so $28,000 divided by $48,000 times 30 is 17.5 days. Flipping the fraction gives 51.4, which is the inverse and answers a different question, and using the ending balance of $30,000 gives 18.8 because it ignores the April starting point."
  - id: "c57e2cdf-d1dc-4f12-8473-453a3b2996ce"
    revision: 2
    status: active
    type: single-choice
    prompt: "A client's DSO climbs from 30 to 45 days. What is the best first step?"
    options:
      - id: annualize
        text: "Annualize the figure to see the yearly run rate"
      - id: aging
        text: "Pull the aging report to see which customers are late"
      - id: write-off
        text: "Write off the oldest invoices so receivables shrink"
      - id: wait
        text: "Wait another month to see whether it was just noise"
    correctOptionIds: [aging]
    explanation: "The aging report shows whether one large customer or many customers caused the slip, and that decides whether the fix is a collections call or a credit-policy review. Waiting is tempting because single months can be noisy, but a 15-day jump deserves a diagnosis now, and writing off invoices hides the problem instead of explaining it."
  - id: "a7f5e60d-8f03-46c7-a317-e9fb139cad3b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Riverside's DSO rose from 32 to 47 days while its DPO fell from 34 to 24 days. What does this pair suggest?"
    options:
      - id: improving
        text: "The cash cycle is improving because vendors get paid sooner"
      - id: faster
        text: "Customers pay faster, which leaves spare cash on hand"
      - id: squeeze
        text: "Customers pay slower while vendors want cash sooner"
    correctOptionIds: [squeeze]
    explanation: "A rising DSO means customers take longer to pay, and a falling DPO means Riverside pays vendors in fewer days, so cash is squeezed from both sides. Paying vendors sooner can look like good manners, but combined with slower collections it drains cash rather than improving the cycle."
  - id: "ca522949-d82f-481d-a469-314b3eda6135"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these ratios use only balance sheet figures, so ending balances are fine? Select every correct answer."
    options:
      - id: current
        text: "Current ratio: current assets over current liabilities"
      - id: quick
        text: "Quick ratio: cash plus receivables over current liabilities"
      - id: debt-equity
        text: "Debt-to-equity: total liabilities over total equity"
      - id: dso
        text: "DSO: average receivables over credit sales times days"
      - id: ap-turnover
        text: "AP turnover: annualized costs over average payables"
    correctOptionIds: [current, quick, debt-equity]
    explanation: "The current ratio, quick ratio and debt-to-equity each divide one balance sheet line by another from the same date, so the ending snapshot is the right input. DSO and AP turnover are tempting because they also involve a balance, but each pairs it with an income statement total and therefore needs an average balance."
  - id: "57dea145-dc57-4294-a377-2c46cc31db50"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The owner asks you to use an AI assistant to draft the KPI commentary. Which practices fit the chapter's guardrails? Select every correct answer."
    options:
      - id: paste-figures
        text: "Paste in the closed figures and tell it to use only those"
      - id: review-all
        text: "Read every sentence and delete what the data cannot support"
      - id: estimate
        text: "Ask it to estimate any ratio you have not yet computed"
      - id: keep-trail
        text: "Save the prompt, the response and your edits for audit"
      - id: raw-names
        text: "Paste raw customer names so the commentary feels specific"
    correctOptionIds: [paste-figures, review-all, keep-trail]
    explanation: "AI may draft wording from numbers you supply, a human must review every sentence, and the prompt, output and edits should be kept so the report can be audited. Asking it to estimate a missing ratio invites fabricated numbers that could reach the banker, and pasting raw customer names exposes confidential data."
  - id: "ced01011-7280-45c0-8cb7-6446bf2deb13"
    revision: 1
    status: active
    type: true-false
    prompt: "A current ratio of 4.5 is always a sign of strong financial health."
    answer: false
    explanation: "A very high current ratio can mean idle cash, slow-moving inventory or uncollected receivables, so it needs to be read next to the quick ratio and DSO. More liquidity feels safer, but assets that are not being put to work are not automatically a strength."
  - id: "ddc74365-e9d8-45db-bf5a-2439e2a95e52"
    revision: 1
    status: active
    type: free-recall
    prompt: "BoBo's May DSO is 17.5 days and its DPO is 18.6 days. Explain what the pair says about working capital and what you would suggest to Sara, your senior."
    sampleAnswer: "BoBo collects from clients about a day faster than it pays vendors, so the gap is roughly minus 1.1 days, which is a small working-capital tailwind. Collections are excellent compared with the 30 to 45 days often seen in services. I would suggest checking whether vendor terms allow a longer payment window, because paying in 18.6 days may be sooner than necessary, and I would compare both numbers with April and the budget before drawing a firm conclusion."
    explanation: "A strong answer states that DSO measures collection speed, DPO measures payment speed, and that the small negative gap is mildly favorable. It also avoids over-claiming by asking for the prior period, a target and the vendor terms before recommending a change."
  - id: "50279ff4-296c-404d-a347-d7f375884954"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how the four families of ratios help you judge a business, why some ratios need average balances, and why industry context matters."
    sampleAnswer: "Profitability ratios such as gross and net margin show how much of each revenue dollar is kept. Liquidity ratios such as the current and quick ratio show whether near-term bills can be paid, leverage shows reliance on debt, and efficiency ratios such as DSO and DPO show how fast cash moves. Ratios that combine an income statement total with a balance sheet snapshot use the average of the beginning and ending balance so the two match in time. A healthy range depends on the industry, so I pair every ratio with the prior period and a benchmark."
    explanation: "A complete answer names all four families with one example each, ties averaging to the period-versus-snapshot mismatch, and says that a ratio has meaning only against a trend or benchmark. Reciting formulas without those three ideas is a partial answer."
```

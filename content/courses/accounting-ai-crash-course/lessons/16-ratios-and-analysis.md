---
id: "854a9d7e-4c0e-4378-8470-fbf0a0e64beb"
title: "Ratios and Business Analysis"
description: "Calculate and interpret ten core financial ratios from a closed income statement and balance sheet, with the right balances and the right context."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
  - ratios
  - financial-analysis
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 16
estimatedMinutes: 55
---

## Why this matters

A trial balance tells you what happened; ratios tell you whether it was good or bad. A $10,000 profit means one thing on $20,000 of revenue and something very different on $2,000,000. Owners, lenders and controllers talk in ratios, and being able to look at a closed income statement and balance sheet and explain them is what moves you from recording transactions to explaining them. All the numbers in this lesson are sample data for the fictional BoBo Digital Services LLC.

## What you'll be able to do

- Calculate ten core ratios from an income statement and balance sheet.
- Decide when a ratio needs an average balance and when the ending balance is enough.
- Explain what each ratio says in plain English, including why a healthy range depends on the industry.
- Diagnose a business from several ratios read together across months.
- Use an AI assistant to draft commentary without letting it touch the numbers.

## Before you start

Recall these ideas from earlier lessons, without looking back:

- What is the difference between the income statement, which covers a period, and the balance sheet, which is a snapshot?
- Which accounts count as current assets, and which as current liabilities?
- Why should ratios only be calculated after the month-end close is finished? See the [[courses/accounting-ai-crash-course/lessons/15-cash-flow-statement|Previous lesson]] for the cash side of the story.

## The BoBo numbers

This chapter's worked examples use two statements. Keep them handy.

**Income statement, month ended May 31, 2026**

| Line | Amount |
|---|---:|
| Service revenue | $48,000 |
| Cost of services | $16,800 |
| Gross profit | $31,200 |
| Operating expenses | $22,400 |
| Operating income | $8,800 |
| Interest expense | $400 |
| Net income | $8,400 |

**Balance sheet**

| Account | Apr 30 | May 31 |
|---|---:|---:|
| Cash | $18,500 | $22,000 |
| Accounts receivable | $26,000 | $30,000 |
| Prepaid software | $2,400 | $2,000 |
| Total current assets | $46,900 | $54,000 |
| Accounts payable | $9,800 | $11,000 |
| Credit card payable | $3,200 | $3,500 |
| Accrued wages | $2,500 | $2,800 |
| Total current liabilities | $15,500 | $17,300 |
| Total liabilities | $35,500 | $37,100 |
| Owner's equity | $25,400 | $30,400 |

## Step 1 — Ratios are division with a story: profitability

A ratio is one number divided by another. The skill is knowing which two numbers to divide and what the answer means. Think of a ratio as a size-adjuster: it lets you compare a corner café with a national chain by asking "per dollar of revenue, what is left?"

Ratios fall into four families:

| Family | Question it answers | Examples |
|---|---|---|
| Profitability | How well do we turn revenue into profit? | Gross margin, net margin, expense ratio |
| Liquidity | Can we pay our bills soon? | Current ratio, quick ratio |
| Leverage | How much do we rely on debt? | Debt-to-equity |
| Efficiency | How fast do we collect and pay cash? | AR turnover, DSO, AP turnover, DPO |

The three profitability ratios you need now:

- **Gross margin** = gross profit ÷ revenue. The share of revenue kept after delivery costs, before overhead.
- **Net profit margin** = net income ÷ revenue. The share of revenue left after every cost, including interest.
- **Expense ratio** = operating expenses ÷ revenue. The weight of overhead.

Worked example with BoBo's May numbers:

- Gross margin = $31,200 ÷ $48,000 = 0.650, or **65.0%**.
- Net margin = $8,400 ÷ $48,000 = 0.175, or **17.5%**.
- Expense ratio = $22,400 ÷ $48,000 = 0.4667, or **46.7%**.

In plain terms, for every dollar BoBo bills, about 65 cents survives delivery costs, about 47 cents goes to overhead, and about 17.5 cents ends up as profit.

> [!warning] Common mistake
> Reading a margin as "good" or "bad" without saying which industry it is in. The chapter's rules of thumb are general benchmarks, not standards: for example, software firms often run gross margins around 70–85% while grocery retailers run roughly 20–30%.

## Step 2 — Liquidity and leverage: balance-sheet-only ratios

Liquidity asks whether you can pay the bills coming due. Picture a household: your checking account plus the paycheck arriving Friday, compared with the rent and card payments due this month.

- **Current ratio** = current assets ÷ current liabilities.
- **Quick ratio** (acid test) = (cash + accounts receivable) ÷ current liabilities. It leaves out less-liquid current assets such as prepaid expenses and inventory, so it is the stricter test.
- **Debt-to-equity** = total liabilities ÷ equity. This lesson uses total liabilities; some analysts use only interest-bearing debt, so state your definition at the top of the report and keep it the same every month.

All three use only balance sheet lines from the same date, so you use **ending** balances.

Worked example, May 31:

- Current ratio = $54,000 ÷ $17,300 = **3.12**.
- Quick ratio = ($22,000 + $30,000) ÷ $17,300 = $52,000 ÷ $17,300 = **3.01**.
- Debt-to-equity = $37,100 ÷ $30,400 = **1.22**.

BoBo can cover its near-term bills about three times over. The general rule of thumb in the source material is a current ratio of 1.5–3.0, so 3.12 sits just above it, which hints at cash that may be sitting idle.

> [!warning] Common mistake
> Assuming a higher liquidity ratio is always better. Very high values can signal idle cash, slow-moving inventory or uncollected receivables, so read the current ratio next to the quick ratio and DSO.

```knowledge-quiz
schemaVersion: 1
quizId: "4025b996-f71d-4394-bfbb-4b3507bbda76"
title: "Checkpoint: margins and liquidity"
questionBankId: "501fe964-ae16-4bca-807e-3397cd8ab0f5"
questionIds:
  - "a3f15acf-331d-433d-9998-f20cbe5a2d85"
  - "90fd2f53-a0f7-46d4-a70e-c7b0f24b48a3"
```

## Step 3 — Efficiency and the average-balance rule

Efficiency ratios measure how quickly cash cycles through receivables and payables. Here is the trap: the income statement covers a **period** ("revenue from May 1 to May 31") while the balance sheet is a **snapshot** ("receivables on May 31"). Dividing a month of revenue by one day's balance mixes the two. The fix is a simple average of the beginning and ending balance:

> Average balance = (beginning balance + ending balance) ÷ 2

Rule of thumb: if a ratio mixes an income statement line with a balance sheet line, average the balance sheet line. If it uses only balance sheet lines, use the ending balance.

The efficiency ratios:

- **AR turnover** = annualized net credit sales ÷ average AR. How many times a year you collect your receivables.
- **DSO** (days sales outstanding) = (average AR ÷ net credit sales) × days in the period. Average days to collect an invoice.
- **AP turnover** = annualized cost of services ÷ average AP.
- **DPO** (days payable outstanding) = (average AP ÷ cost of services) × days in the period. Average days to pay a vendor.

To annualize a single month for the turnover ratios, multiply the month by 12. This lesson uses 30 days for DSO and DPO. A trailing-twelve-month figure is smoother when you have one, because multiplying one unusual month by 12 can mislead.

Only sales made on credit ever pass through receivables, so the AR ratios use net credit sales. Cash or card sales collected at checkout would inflate turnover and make collections look faster than they are. To keep the arithmetic simple, this example assumes all of BoBo's $48,000 May revenue was invoiced on credit.

Worked example with BoBo's May data:

- Average AR = ($26,000 + $30,000) ÷ 2 = $28,000.
- AR turnover = ($48,000 × 12) ÷ $28,000 = $576,000 ÷ $28,000 = **20.57x**.
- DSO = ($28,000 ÷ $48,000) × 30 = **17.5 days**.
- Average AP = ($9,800 + $11,000) ÷ 2 = $10,400.
- AP turnover = ($16,800 × 12) ÷ $10,400 = $201,600 ÷ $10,400 = about **19.4x**.
- DPO = ($10,400 ÷ $16,800) × 30 = **18.6 days**.

Compare the two day counts: DSO 17.5 minus DPO 18.6 is **−1.1 days**. BoBo collects from clients slightly faster than it pays vendors, a small working-capital advantage.

> [!warning] Common mistake
> Using the ending receivables balance in a turnover or DSO calculation. With ending AR of $30,000 the May DSO would show 18.8 days instead of 17.5, because the April starting balance is ignored.

```knowledge-quiz
schemaVersion: 1
quizId: "421cf38b-85c6-4e90-9c83-19dab33034fd"
title: "Checkpoint: efficiency and averages"
questionBankId: "501fe964-ae16-4bca-807e-3397cd8ab0f5"
questionIds:
  - "b306f070-41a8-472a-b2f8-30f1478c0c78"
  - "75548096-02d5-4869-b3fc-b233a4e7a24a"
```

## Step 4 — Reading ratios in context, and using AI safely

One ratio alone is noise. A useful analysis pairs each ratio with three things: the prior period, a budget or target, and an industry benchmark. Think of a doctor: a single blood-pressure reading means little until it is compared with your last visit and with people your age.

Consider the made-up neighbor, Riverside Auto Detailing, over three months:

| Ratio | March | April | May |
|---|---:|---:|---:|
| Gross margin | 42% | 40% | 36% |
| Current ratio | 1.8 | 1.6 | 1.2 |
| Quick ratio | 1.1 | 0.9 | 0.6 |
| Debt-to-equity | 1.4 | 1.7 | 2.1 |
| DSO (days) | 32 | 38 | 47 |
| DPO (days) | 34 | 30 | 24 |

No single line explains the problem, but together they show a working-capital squeeze: margins are slipping, liquidity is falling, debt is rising to fill the gap, customers are paying later, and vendors are being paid sooner.

If an AI assistant helps draft the commentary, give it only closed figures that you paste in, and treat it as a drafting tool for the wording only:

- Do not let it estimate or fill in a ratio.
- Make every sentence traceable to a number you supplied.
- Review every sentence yourself; you are accountable for the report.
- Keep the prompt, the response and your edits as an audit trail.
- Do not paste raw client names or other confidential details.

> [!warning] Common mistake
> Calculating ratios on books that are not closed. Adjusting entries such as depreciation and accruals move the inputs, so wait for the close or label the output DRAFT.

```knowledge-quiz
schemaVersion: 1
quizId: "c5a37196-8c15-4a26-879c-8e018a64128f"
title: "Checkpoint: context and AI guardrails"
questionBankId: "501fe964-ae16-4bca-807e-3397cd8ab0f5"
questionIds:
  - "a7f5e60d-8f03-46c7-a317-e9fb139cad3b"
  - "57dea145-dc57-4294-a377-2c46cc31db50"
```

## Try it

A made-up bakery shows these ratios: gross margin 28%, net margin 4%, current ratio 1.1, quick ratio 0.4, debt-to-equity 2.5, DSO 5 days, DPO 28 days, expense ratio 24%. The owner asks, "Are we okay?"

1. Using BoBo's May numbers, calculate the operating margin (operating income ÷ revenue).
2. Write a short answer for the owner in plain English. Name which ratios are comfortable and which are a concern, and say what you would check next.

> [!example]- Sample solution
> 1. Operating margin = $8,800 ÷ $48,000 = 0.1833, or about **18.3%**.
> 2. Sample answer: "Profitability looks plausible for a small bakery, though I would check it against a bakery benchmark. Liquidity is the concern: a current ratio of 1.1 is thin, and a quick ratio of 0.4 means that without inventory you could cover only about 40% of short-term liabilities. Debt-to-equity of 2.5 is on the high side. The cash cycle is a bright spot, since customers pay in about 5 days and vendors are paid in about 28. Before advising anything, I would compare these numbers with prior months, see what is inside current liabilities, and look at whether any debt could be refinanced longer term."

## Key takeaways

- A ratio is a division with a story; group them into profitability, liquidity, leverage and efficiency.
- Balance-sheet-only ratios (current, quick, debt-to-equity) use ending balances; ratios that mix an income statement and balance sheet line use the average balance.
- BoBo's May numbers: gross margin 65.0%, net margin 17.5%, current ratio 3.12, quick ratio 3.01, DSO 17.5 days, DPO 18.6 days.
- Healthy ranges depend on the industry, so always pair a ratio with the prior period, a target and a benchmark.
- Trends and combinations of ratios tell the story; one month in isolation is noise.
- AI can help draft wording, but a human owns the numbers, reviews every sentence and keeps an audit trail.

## Explain it back

In your own words, explain how the four families of ratios help you judge a business, why some ratios need average balances, and why industry context matters.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "90d36ab2-c595-450e-bbee-c01cd67fea26"
title: "Chapter quiz: Ratios and business analysis"
questionBankId: "501fe964-ae16-4bca-807e-3397cd8ab0f5"
questionIds:
  - "31f74b85-6a40-4f06-91f7-dd990f6c0403"
  - "c57e2cdf-d1dc-4f12-8473-453a3b2996ce"
  - "ca522949-d82f-481d-a469-314b3eda6135"
  - "ced01011-7280-45c0-8cb7-6446bf2deb13"
  - "ddc74365-e9d8-45db-bf5a-2439e2a95e52"
  - "50279ff4-296c-404d-a347-d7f375884954"
```

Next: [[courses/accounting-ai-crash-course/lessons/17-internal-controls|Next lesson]]

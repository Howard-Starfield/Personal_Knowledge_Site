---
id: "e7a4fe10-1e14-4c62-a5b2-c2abc41a3733"
title: "Income Statement Deep Dive"
description: "Build a multi-step income statement, compute the three margins, and explain why revenue growth is not automatically profit growth."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 13
estimatedMinutes: 45
---

## Why this matters

The books are closed, and the owner now wants the one answer that matters: "Did we make money, and why?" That answer lives on the income statement. The skill that separates someone who posts entries from someone who explains the business is reading it line by line, tracing each line to the general ledger, and saying in plain English why it moved. Revenue growth is not automatically profit growth, and this lesson shows you where the gap hides.

## What you'll be able to do

- Build a multi-step income statement from account balances, in the correct order.
- Calculate gross, operating and net margin, and say what each one tells you.
- Diagnose a month-over-month variance in dollars and percent, and name its likely cause.
- Decide whether a cost belongs in cost of services, operating expenses or equity.
- Explain how net income closes to Retained Earnings at period end.

## Before you start

Recall these ideas from earlier lessons before reading on. Try to answer from memory.

- What does the month-end close have to finish before anyone prints financial statements?
- What is the difference between a revenue account and a contra-revenue account?
- Which accounts are temporary and reset each period, and which carry a balance forward?

If you want to revisit the close, see [[courses/accounting-ai-crash-course/lessons/12-month-end-close|Previous lesson]].

## Step 1 — Start at the top: revenue and net revenue

**In plain English.** The income statement is a video, not a photo. A balance sheet freezes one day. The income statement covers a whole period, such as a month, and shows what happened across it.

**Analogy.** Think of a food truck's daily report. Burritos sold times price is the top line. Anyone who got their money back comes off before you count the day.

**The rule.** Under accrual accounting, revenue is recorded as the service is delivered, not when cash arrives. Refunds are not expenses. They are booked to Refunds & Allowances (4900) or Chargebacks (4910), contra-revenue accounts that reduce gross revenue to **net revenue**.

**Worked example.** BoBo Digital Services LLC (fictional sample data) had April gross revenue of $48,200 and refunds of $1,820.

| Line | April 2026 |
|---|---:|
| Gross revenue | $48,200 |
| Less: refunds and chargebacks | ($1,820) |
| **Net revenue** | **$46,380** |

A refund entry looks like this: debit Refunds & Allowances $500, credit Cash – Stripe Available $500.

> [!warning] Common mistake
> Posting a refund as an operating expense. It sits below gross profit and makes gross margin look healthier than it really is. Refunds belong against revenue.

## Step 2 — Cost of services and gross profit

**In plain English.** Cost of services is what it cost to deliver the sales you made. If BoBo had not sold the work, it would not have spent the money.

**Analogy.** For the food truck it is the tortillas, beef and propane. Skip the burrito and you skip the cost. The parking permit, by contrast, is due either way.

**The rule.** For a service business, cost of services (often called COGS) includes direct contractor labor, payment processor fees, marketplace fees and per-job licensed media. Gross profit is net revenue minus cost of services, and gross margin % is gross profit divided by net revenue.

**Worked example.**

| Cost of services | April 2026 |
|---|---:|
| Contractor Costs – Direct (5010) | $9,400 |
| Stripe Processing Fees (5030) | $850 |
| PayPal Processing Fees (5040) | $380 |
| eBay Final Value Fees (5050) | $2,180 |
| Stock Assets / Licensed Media (5020) | $190 |
| **Total cost of services** | **$13,000** |

Gross profit is $46,380 − $13,000 = $33,380. Gross margin is $33,380 ÷ $46,380 = 72.0%.

The gross method for a $1,000 Stripe sale that deposits $970 is: debit Cash $970, debit Stripe Processing Fees $30, credit Service Revenue $1,000. Revenue is what the client paid, and the fee is its own cost.

> [!warning] Common mistake
> Booking revenue at the net deposit ($970) so the fee never appears. That understates both revenue and cost of services and hides what it really costs to take payments.

```knowledge-quiz
schemaVersion: 1
quizId: "8cb12841-166d-4bce-a508-dbd0e814dff1"
title: "Checkpoint: revenue and cost of services"
questionBankId: "510bd21f-6202-42b6-bfcc-fb5521b869c4"
questionIds:
  - "baf2ec79-beb8-4bff-a4df-997cc4d1f69f"
  - "ae305af7-b90e-42ad-9bd8-4c1c103d4455"
```

## Step 3 — Operating expenses, other income and net income

**In plain English.** Operating expenses are the cost of keeping the doors open. You pay them whether or not you sold anything that day. Below them sits a small area for things that are not core operations, such as interest earned on the bank account.

**Analogy.** On the food truck this is the parking permit and insurance. Interest earned is the $20 you found on the sidewalk, nice but not the business.

**The rule.**

- Operating income = gross profit − operating expenses. It measures the core business before non-operating items.
- Net income = operating income + other income − other expense.
- Operating margin % = operating income ÷ net revenue. Net margin % = net income ÷ net revenue.
- Owner draws are not on the income statement. For a single-member LLC like BoBo, money the owner takes out reduces equity (Owner Draws, 3020), not profit.

**Worked example.** April operating expenses came to $10,750.

| Operating expense group | April 2026 |
|---|---:|
| Software and subscriptions | $286 |
| Marketing and advertising | $2,245 |
| Professional services | $1,050 |
| General and administrative | $588 |
| Other operating costs | $6,581 |
| **Total operating expenses** | **$10,750** |

Operating income is $33,380 − $10,750 = $22,630, an operating margin of 48.8%. Adding $35 of interest income gives net income of $22,665, a net margin of 48.9%. This model shows no income tax line because a single-member LLC's profit is taxed on the owner's own return.

> [!warning] Common mistake
> Treating an owner draw as an expense, or calling net income "revenue." The first understates profit, and the second mixes up the bottom line with the top line.

## Step 4 — Variance: explain the change, not just the number

**In plain English.** A variance is the difference between this period and another one. A number with no cause attached is not useful. The cause comes from pulling the general ledger detail behind the line.

**Analogy.** A smoke detector tells you something is wrong in the building, but you still have to walk the rooms to find the fire. Gross margin is the smoke detector for a service business.

**The rule.** Dollar change = new − old. Percent change = dollar change ÷ old. Compare periods on the same basis: if a cost was reclassified this month, restate the prior month, or the variance is fiction.

**Worked example.** March against April through gross profit:

| Line | March | April | $ change | % change |
|---|---:|---:|---:|---:|
| Gross revenue | $41,500 | $48,200 | +$6,700 | +16.1% |
| Refunds | ($910) | ($1,820) | ($910) | doubled |
| Net revenue | $40,590 | $46,380 | +$5,790 | +14.3% |
| Contractor cost | $7,200 | $9,400 | +$2,200 | +30.6% |
| Gross profit | $29,790 | $33,380 | +$3,590 | +12.1% |
| Gross margin | 73.4% | 72.0% | −1.4 points | — |

A narrative a controller would accept: "Net revenue rose 14.3% but gross profit rose only 12.1%. Gross margin slipped from 73.4% to 72.0% because direct contractor cost grew 30.6% on two large subcontracted jobs."

> [!warning] Common mistake
> Reporting "marketing was up $640" with no cause. Pull the ledger detail first and explain why, and state facts, not guesses.

```knowledge-quiz
schemaVersion: 1
quizId: "caefac2b-0ec8-4004-9fd7-0a3ca8968c97"
title: "Checkpoint: expenses, owner pay and variances"
questionBankId: "510bd21f-6202-42b6-bfcc-fb5521b869c4"
questionIds:
  - "46eb2149-952b-46d9-9cea-f176858c6537"
  - "4554bdc8-859f-4fe8-852e-b1cb24bb2ed2"
```

## Step 5 — Closing net income to Retained Earnings

**In plain English.** Revenue and expense accounts are temporary. They start each period at zero, so at period end their balances are swept into one account and the profit is added to equity.

**Analogy.** It is like a scoreboard reset after each game, with the final score written into the season record.

**The rule.** Formal closing is normally done at fiscal year-end, and a monthly close like the one below is an illustration of the same mechanics. Close revenue accounts to Income Summary, close contra-revenue and expense accounts to Income Summary, then close the Income Summary balance to Retained Earnings. A profit increases equity.

**Worked example.** BoBo's April closing, simplified to totals:

| Entry | Debit | Credit |
|---|---:|---:|
| Revenue accounts (4010–4040) | $48,200 | |
| Interest income | $35 | |
| Income Summary | | $48,235 |
| Income Summary | $25,570 | |
| Refunds, cost of services, operating expenses | | $25,570 |
| Income Summary | $22,665 | |
| Retained Earnings (3090) | | $22,665 |

The expense total is $1,820 + $13,000 + $10,750 = $25,570, and $48,235 − $25,570 = $22,665.

> [!warning] Common mistake
> Forgetting adjusting entries such as depreciation and bad debt before printing the statement. Missing non-cash expenses overstate profit, so confirm the close is finished first.

```knowledge-quiz
schemaVersion: 1
quizId: "1b7f3bda-db80-4966-8acd-fe6ce6cbb0b8"
title: "Checkpoint: closing and review errors"
questionBankId: "510bd21f-6202-42b6-bfcc-fb5521b869c4"
questionIds:
  - "e08490c9-b197-45c0-b797-bb4f39faf59c"
  - "36c232f8-b60a-4774-9911-94364f57e606"
```

## Try it

BoBo's May figures are: gross revenue $52,300, refunds $2,440, cost of services $14,970, operating expenses $10,250 and interest income $42. Build a short multi-step statement, compute the three margins, and write two variance sentences comparing May with April.

> [!example]- Sample solution
> - Net revenue: $52,300 − $2,440 = $49,860
> - Gross profit: $49,860 − $14,970 = $34,890; gross margin 34,890 ÷ 49,860 = 70.0%
> - Operating income: $34,890 − $10,250 = $24,640; operating margin 49.4%
> - Net income: $24,640 + $42 = $24,682; net margin 49.5%
>
> Sample sentences: "Net revenue rose $3,480 (7.5%) over April, but gross profit rose only $1,510 and gross margin fell from 72.0% to 70.0%, with refunds up from $1,820 to $2,440." "Operating expenses fell from $10,750 to $10,250, so operating margin rose; check the ledger detail before calling that a lasting improvement."

## Key takeaways

- The income statement covers a period and runs top to bottom: revenue, net revenue, gross profit, operating income, net income.
- Refunds are contra-revenue, and processor fees are cost of services booked under the gross method.
- Direct costs of a sale go in cost of services; the cost of staying open goes in operating expenses; owner draws go to equity.
- Gross margin = gross profit ÷ net revenue, and it is the early warning for a service business.
- A variance needs a cause from the ledger detail, on a consistent basis for both periods.
- Net income closes through Income Summary to Retained Earnings.

## Explain it back

In your own words, explain to a friend who is not an accountant why a business can have record revenue and still earn less profit than last month.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "223b2084-5df7-4180-83d9-cabe272db3a7"
title: "Chapter quiz: income statement"
questionBankId: "510bd21f-6202-42b6-bfcc-fb5521b869c4"
questionIds:
  - "1e058e90-8eeb-4460-85f6-3957e5ed49a6"
  - "cb74654c-9b10-4454-8571-c979ae11ca9d"
  - "6280ef10-c35a-445c-ae51-cc5e7e88cfae"
  - "70d7d1fb-2528-40a7-ab5d-4ce79540838d"
  - "6ebc56cd-c097-4425-a678-1a3fc69941df"
  - "dfd0e5f9-b5b5-4dae-a567-ce474c9ccd02"
```

Next: [[courses/accounting-ai-crash-course/lessons/14-balance-sheet|Next lesson]]

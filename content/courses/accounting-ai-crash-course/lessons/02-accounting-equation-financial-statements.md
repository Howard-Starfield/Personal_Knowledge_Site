---
id: "2eaa7b5b-54c8-43bb-b6bc-9c3cc7cfb904"
title: "The Accounting Equation and Financial Statements"
description: "Use Assets = Liabilities + Equity to classify business items and read the three financial statements as one connected story."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 2
estimatedMinutes: 40
---

## Why this matters

Almost every task in an entry-level accounting job touches one of the three financial statements. Posting a vendor bill, recording a customer payment and checking an accounts receivable balance all change what the statements say. In an interview, being able to walk through the statements and how they connect is one of the quickest ways to show you actually understand accounting rather than having memorized it. A mistake in classification, such as booking a laptop as an expense, quietly distorts every report built on top of it.

## What you'll be able to do

- Explain the accounting equation and use it to find a missing amount.
- Classify a business item as an asset, liability, equity, revenue or expense.
- Calculate net income from revenue, refunds and expenses.
- Diagnose a balance sheet that does not balance by quantifying the gap.
- Explain how the Income Statement, Balance Sheet and Cash Flow Statement connect.

## Before you start

- In your own words, what is the job of accounting in a business? See the [[courses/accounting-ai-crash-course/lessons/01-what-accounting-is-for|Previous lesson]] if you need a refresher.
- What is the difference between money a business has and money a business has earned?
- Why might a business owner care about more than one report?

## Step 1 — The accounting equation

**In plain language.** A business is a pile of things it owns, a pile of things it owes, and whatever is left for the owner. Picture a backpack: everything inside is the assets, the items borrowed from friends are liabilities, and the part that is truly yours is equity.

**The rule.** The accounting equation says that total assets always equal liabilities plus owner's equity.

```text
Assets = Liabilities + Equity
```

Assets are resources the business owns or controls that are expected to provide future benefit. Liabilities are present obligations to outside parties. Equity is the residual interest in the assets after deducting liabilities. Because equity is whatever is left, you can rearrange the equation: Equity = Assets − Liabilities.

**Worked example.** BoBo Digital Services LLC, a fictional online design business, owns cash, receivables and a laptop worth $20,400 in total. It owes $5,950 to a software vendor and a freelance designer.

- Equity = $20,400 − $5,950 = $14,450.
- Check: $5,950 + $14,450 = $20,400, which equals assets.

> [!warning] Common mistake
> Adding liabilities to assets, or reading equity as "the cash the owner has". Liabilities are claims against the assets, so they are subtracted to find equity, and equity is a share of all assets, not just cash.

## Step 2 — Five elements and where each one lives

**In plain language.** Every item a business tracks falls into one of five elements. Three live on the Balance Sheet and two on the Income Statement, with Revenue and Expenses ultimately feeding equity.

| Element   | What it is                                      | BoBo example                                                            | Statement        |
| --------- | ----------------------------------------------- | ----------------------------------------------------------------------- | ---------------- |
| Asset     | Owned resource                                  | PayPal balance, MacBook, unpaid customer invoices (accounts receivable) | Balance Sheet    |
| Liability | Amount owed                                     | Balance owed to Adobe                                                   | Balance Sheet    |
| Equity    | Owner's residual share                          | Owner's capital, retained earnings                                      | Balance Sheet    |
| Revenue   | Income earned from the business's main activity | Digital service sales                                                   | Income Statement |
| Expense   | Cost of operating during the period             | Marketing, contractor pay                                               | Income Statement |

**The rule.** Revenue is recognized when it is earned, not when cash arrives. A customer refund reduces revenue, so it is recorded in a contra-revenue account such as Sales Refunds. A customer prepayment for work not yet delivered is a liability (unearned revenue) until the work is done.

**Worked examples.**

1. A $500 sale paid through Stripe: debit Stripe (asset) $500, credit Service Revenue $500.
2. A $150 refund paid back through PayPal: debit Sales Refunds (contra-revenue) $150, credit PayPal $150.
3. An unpaid customer invoice is an asset (accounts receivable), a claim on future cash. It is not cash and not revenue "waiting to arrive".
4. A purchase that benefits the business for years and is above the company's capitalization threshold, such as a laptop, is an asset rather than an expense.

> [!warning] Common mistake
> Posting a laptop purchase as an office expense because "it looks like a normal receipt". This understates assets and overstates expenses.

```knowledge-quiz
schemaVersion: 1
quizId: "f26d4641-559b-47b9-9d7a-3a65847b7358"
title: "Checkpoint — equation and elements"
questionBankId: "04217265-5e07-46d4-9217-88331d031e0c"
questionIds:
  - "ebfb2c9f-4228-459b-804a-1a8d993512a7"
  - "973e7142-16c0-4324-836c-66f7069f7fd3"
```

## Step 3 — The Income Statement and net income

**In plain language.** The Income Statement is a video of a period, such as one month. It shows what the business earned and what it spent, and ends with the bottom line.

**The rule.** Net income equals revenue (after refunds) minus expenses. It covers a range of dates, such as May 1 to May 31.

**Worked example.** BoBo's May figures:

| Line                   | Amount     |
| ---------------------- | ---------- |
| Service revenue        | $14,500    |
| Less: refunds          | ($450)     |
| Net revenue            | $14,050    |
| Processing fees        | ($1,200)   |
| Marketing              | ($850)     |
| Contractor pay         | ($3,000)   |
| Software subscriptions | ($400)     |
| Platform fees          | ($500)     |
| Miscellaneous          | ($1,000)   |
| Total expenses         | ($6,950)   |
| **Net income**         | **$7,100** |

Check the arithmetic: $1,200 + $850 + $3,000 + $400 + $500 + $1,000 = $6,950, and $14,050 − $6,950 = $7,100.

> [!warning] Common mistake
> Treating a refund as an ordinary expense, or adding it back instead of subtracting it. Refunds take back revenue that was already counted.

## Step 4 — The Balance Sheet, retained earnings and the cash trail

**In plain language.** The Balance Sheet is a photo of one day. The Income Statement's profit does not stay on the video: it is added to a savings bucket in equity called retained earnings, like a river running into a lake.

**The rules.**

- The Balance Sheet is a snapshot at a single date, for example as of May 31.
- Net income closes into retained earnings at period end, and an owner's draw reduces equity rather than being an expense.
- The Cash Flow Statement covers a period and groups actual cash movement into operating, investing and financing activities. Net income is not the same as cash, because unpaid invoices raise income before they raise cash.

**Worked example.** BoBo's May 31 balance sheet:

| Assets                           | Amount      | Liabilities and equity | Amount      |
| -------------------------------- | ----------- | ---------------------- | ----------- |
| Checking, PayPal and Stripe cash | $15,400     | Accounts payable       | $5,950      |
| Accounts receivable              | $3,200      | Equity (required)      | $14,450     |
| Laptop                           | $1,800      |                        |             |
| **Total assets**                 | **$20,400** | **Total**              | **$20,400** |

Cash is $4,800 + $7,200 + $3,400 = $15,400. If the owner's file lists capital of $5,000, prior retained earnings of $8,300 and May net income of $7,100, those equity pieces add to $20,400, not $14,450. That is a $5,950 discrepancy to flag and trace, not to force away.

> [!warning] Common mistake
> Believing a profitable business always has cash. A business can show a profit while customers still owe it money, so read the Income Statement and the Cash Flow Statement together.

```knowledge-quiz
schemaVersion: 1
quizId: "039402bb-0d91-4f32-91a7-71839bb65c38"
title: "Checkpoint — income, balance sheet and cash"
questionBankId: "04217265-5e07-46d4-9217-88331d031e0c"
questionIds:
  - "7cd27f83-bd2d-4cf7-bf98-72598d569331"
  - "441f44be-3843-4c45-bbfd-0992f4f4bd65"
```

## Try it

Greenleaf Goods LLC, a fictional online retailer, gives you its April figures:

- Cash $9,400; inventory $6,200; unpaid customer invoices $2,100; computer equipment (net) $2,500.
- Credit card balance $1,800; loan from a friend $5,000.
- Owner's investment $4,000; prior retained earnings $3,800.
- April sales $12,800; April expenses $6,400.

Calculate net income, ending retained earnings, total equity and total assets and liabilities. Does the balance sheet balance? If not, name one thing you would check.

> [!example]- Sample solution
>
> - Net income = $12,800 − $6,400 = $6,400.
> - Ending retained earnings = $3,800 + $6,400 = $10,200.
> - Total equity = $4,000 + $10,200 = $14,200.
> - Total assets = $9,400 + $6,200 + $2,100 + $2,500 = $20,200.
> - Total liabilities = $1,800 + $5,000 = $6,800.
> - Liabilities plus equity = $21,000, which is $800 more than assets, so it does not balance.
> - Check first for one-sided or unposted entries, missing owner draws or contributions, and whether net income was closed into retained earnings. Do not adjust a figure just to make it balance.

## Key takeaways

- Assets = Liabilities + Equity, and equity is what remains after debts.
- Every item is an asset, liability, equity, revenue or expense; classify before you post.
- Net income = revenue (after refunds) − expenses, and it covers a period.
- The Balance Sheet is a snapshot at one date, and net income closes into retained earnings within equity.
- Net income and cash are different, so profitable businesses can still run short of cash.
- A balance sheet that does not balance means an error to trace, not a number to adjust.

## Explain it back

Explain the accounting equation in your own words, then describe how the Income Statement, Balance Sheet and Cash Flow Statement connect.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "daf737ca-7e60-4b61-a08a-16d76b638374"
title: "Chapter quiz — accounting equation and statements"
questionBankId: "04217265-5e07-46d4-9217-88331d031e0c"
questionIds:
  - "2802189c-256c-4d75-9ff8-a9daaaadc809"
  - "cfb0cd9e-6b8f-4929-bab0-4d99f4fcd4f6"
  - "c7a67453-ae3d-4bf4-a9fe-a84ec6948918"
  - "60ca5ca6-387d-46d3-8ad4-5902baffdf42"
  - "a347e9fb-57ad-4a7a-818f-ed2c1a316494"
  - "106f230a-248f-4fff-af0a-a344a15f9dfc"
  - "1ac6e4a3-88ea-41ad-b8dd-9d772f2da178"
  - "a38b0fa6-92d9-4f24-bbe9-d15d2a335853"
```

Next: [[courses/accounting-ai-crash-course/lessons/03-debits-and-credits|Next lesson]]

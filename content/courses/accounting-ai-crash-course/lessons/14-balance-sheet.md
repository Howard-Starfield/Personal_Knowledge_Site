---
id: "795e924f-17ce-4afc-b169-f84d79f8861e"
title: "Balance Sheet Deep Dive"
description: "Read, classify and build a balance sheet from a trial balance, prove it balances, and judge short-term liquidity."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 14
estimatedMinutes: 45
---

## Why this matters

Lenders read the balance sheet before they approve a credit line, owners read it before they take money out, and auditors tie it to supporting schedules at the start of an engagement. If it is wrong, everything built on it is wrong too: taxes, loan covenants and valuations. As a new accountant you will rarely draft one from scratch, but you will be asked to explain a line, classify an account and find out why the statement does not balance. Reading it fluently is a core skill.

## What you'll be able to do

- Explain why a balance sheet is a snapshot "as of" one date and why Assets = Liabilities + Equity.
- Classify accounts from a trial balance as current assets, fixed assets, current liabilities, long-term liabilities or equity.
- Build a classified balance sheet from a trial balance and prove that it balances.
- Calculate working capital, the current ratio and the quick ratio, and interpret them.
- Diagnose a statement that does not balance or a liquidity ratio that is falling.

## Before you start

Recall these ideas from earlier lessons before reading on. Answer from memory first:

1. What does a debit do to an asset account, and what does a credit do?
2. Why does every transaction keep the accounting equation in balance?
3. What does the income statement cover, and how is that different from a single date?

Back to the income statement: [[courses/accounting-ai-crash-course/lessons/13-income-statement|Previous lesson]].

## Step 1 — A snapshot that always balances

**In plain language.** The income statement is a movie of a period. The balance sheet is a photograph taken at one instant, usually the close of the last day of the period. That is why its heading says "As of April 30, 2026" and not "For the Month Ended". The day after, the numbers change.

**Analogy.** Think of a bathroom scale reading. It tells you your weight right now, not how your weight moved all month.

**The rule.** There are three sections:

- **Assets**: what the company owns or has a right to, such as cash, receivables, equipment and prepaids.
- **Liabilities**: what it owes, such as payables, credit cards, unearned revenue and loans.
- **Equity**: what is left for the owners after the liabilities, mainly owner capital and retained earnings.

Together they follow one equation, with no tolerance for "close enough":

**Assets = Liabilities + Equity**

**Worked example.** BoBo Digital Services LLC (a fictional company) reports total assets of $43,470 at April 30, 2026. Liabilities are $19,930 and equity is $23,540, so $19,930 + $23,540 = $43,470. The two sides match to the dollar.

> [!warning] Common mistake
> Titling a balance sheet "For the Month Ended April 30". That wording belongs to statements that cover a period. A balance sheet describes a single date, so it says "As of".

## Step 2 — Classify by the 12-month line

**In plain language.** A _classified_ balance sheet sorts assets and liabilities by time. Items that turn into cash, or come due, within 12 months are current (formal standards use the operating cycle if it is longer than a year, which rarely matters for a service firm like BoBo). Items that last or come due later are long-term.

**Analogy.** Sort your mail into "deal with this month" and "deal with later". The sort tells you how urgent each bill is.

**The rules.**

| Group                 | What goes in it                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Current assets        | Cash, receivables, prepaids and short-term inventory, expected to turn to cash or be used within 12 months |
| Fixed assets (PP&E)   | Long-lived equipment, shown at cost, less accumulated depreciation, which gives net book value             |
| Current liabilities   | Payables, credit cards, unearned revenue, sales tax payable, and the next 12 months of loan principal      |
| Long-term liabilities | Debt principal due beyond 12 months                                                                        |
| Equity                | Owner capital plus retained earnings, less owner draws                                                     |

Accumulated depreciation is a **contra-asset**: a running total of depreciation recorded to date that reduces the asset instead of adding a new one. Customer deposits and unearned revenue are **liabilities**, not income, because the company still owes the service.

**Worked example.** BoBo's equipment costs $12,000 and has $4,800 of accumulated depreciation, so its net book value is $7,200. Its equipment loan is split: $2,400 is due within 12 months (current) and $6,000 is due later (long-term). A hosting prepayment of $5,400 is unearned revenue and a current liability.

> [!warning] Common mistake
> Recording a whole multi-year loan as a current liability. Only the principal due in the next 12 months is current. Misclassifying the rest makes a healthy company look squeezed.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "690676e3-2b6d-48f7-b57d-1c9225a4b588"
title: "Snapshot and classification"
questionBankId: "8d80bfec-22d5-4f51-bbf4-7e093796bb51"
questionIds:
  - "a764d12e-1f08-4792-a438-fb0e78f09845"
  - "3d69ebbe-3fc4-4c46-930a-e56acc979adf"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/14-balance-sheet|Balance Sheet Deep Dive Question Bank]].

## Step 3 — Build the balance sheet from a trial balance

**In plain language.** You start from the adjusted trial balance, group every account into its class, work out net income and what it does to equity, then list everything in order and check that both sides agree.

**Analogy.** It is like sorting a pile of receipts into labelled folders, then adding up each folder to confirm the grand total matches the pile.

**The method.**

1. Pull the adjusted trial balance (after depreciation and prepaid adjustments).
2. Classify every account.
3. Compute net income: revenue minus expenses.
4. Roll retained earnings forward: beginning balance plus net income minus owner draws. (In this chapter's convention draws reduce retained earnings; some LLCs reduce Owner Capital instead, depending on policy.)
5. List the sections in order and total them.
6. Prove that Assets = Liabilities + Equity before you send it.

**Worked example.** BoBo's year-to-date revenue is $42,300 and expenses are $36,300, so net income is $6,000. With beginning retained earnings of $8,540 and draws of $6,000:

$8,540 + $6,000 - $6,000 = **$8,540** ending retained earnings.

| Section                  | Items                                                               |       Total |
| ------------------------ | ------------------------------------------------------------------- | ----------: |
| Current assets           | Cash $18,420 + $4,500, receivables $9,750, prepaids $1,200 + $2,400 |     $36,270 |
| Fixed assets, net        | $12,000 cost less $4,800 accumulated depreciation                   |      $7,200 |
| **Total assets**         |                                                                     | **$43,470** |
| Current liabilities      | $3,180 + $2,640 + $5,400 + $310 + $2,400                            |     $13,930 |
| Long-term liabilities    | Equipment loan, long-term part                                      |      $6,000 |
| Equity                   | Owner capital $15,000 + retained earnings $8,540                    |     $23,540 |
| **Liabilities + equity** | $13,930 + $6,000 + $23,540                                          | **$43,470** |

> [!warning] Common mistake
> Posting owner draws as an operating expense. Draws are distributions to the owner, so they reduce equity and never appear on the income statement.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "4b5496e6-ebe5-4cca-b820-5c143f000c1d"
title: "Equity and rolling retained earnings"
questionBankId: "8d80bfec-22d5-4f51-bbf4-7e093796bb51"
questionIds:
  - "092e597d-c92f-4ed3-95d4-1385f09d5ea6"
  - "d640e0a6-0091-4723-9c1a-6727b80b89df"
```

## Step 4 — Read liquidity and spot red flags

**In plain language.** Liquidity is the ability to pay short-term bills when they come due. Three numbers give a quick read, all taken from current items.

**Analogy.** Your checking balance plus what friends owe you, compared with the bills arriving this month.

**The rules.**

- **Working capital** = current assets - current liabilities.
- **Current ratio** = current assets / current liabilities.
- **Quick ratio** (this chapter's version) = (current assets - inventory - prepaids) / current liabilities. It is a tougher test because it leaves out items that cannot quickly become cash. Other textbooks define the quick ratio slightly differently, so always check the formula in use.

**Worked example.** For BoBo, working capital is $36,270 - $13,930 = **$22,340**. The current ratio is 36,270 / 13,930 = **2.60**. BoBo has no inventory but $3,600 of prepaids, so the quick ratio is (36,270 - 3,600) / 13,930 = **2.35**.

Rules of thumb vary by industry, but a ratio below 1.0 means short-term assets do not cover short-term bills. Watch for these red flags: a falling current ratio month after month, receivables growing faster than revenue, payables growing while cash is flat, negative equity, and related-party loans.

> [!warning] Common mistake
> Judging health from profit alone. A firm can show profit on the income statement while receivables pile up and cash runs out. The balance sheet often shows the problem before the bank balance does.

### Checkpoint 3

```knowledge-quiz
schemaVersion: 1
quizId: "c7a335de-0184-41f1-b45a-4f1457ea46b7"
title: "Working capital and ratios"
questionBankId: "8d80bfec-22d5-4f51-bbf4-7e093796bb51"
questionIds:
  - "d15b3f15-c782-4b8d-bcc1-2b31944db603"
  - "c83efa07-09e9-4288-be5e-4b9ef0c18bd1"
```

## Try it

Harbor Print LLC (a made-up firm) has this adjusted trial balance at June 30, 2026. Build the classified balance sheet, prove that it balances, and compute working capital, the current ratio and the quick ratio.

| Account                      |  Amount | Normal side |
| ---------------------------- | ------: | ----------- |
| Cash                         |  $9,000 | Debit       |
| Accounts Receivable          |  $4,000 | Debit       |
| Prepaid Insurance            |  $1,000 | Debit       |
| Equipment                    | $10,000 | Debit       |
| Accumulated Depreciation     |  $3,000 | Credit      |
| Accounts Payable             |  $2,500 | Credit      |
| Unearned Revenue             |  $1,500 | Credit      |
| Note Payable, current part   |  $2,000 | Credit      |
| Note Payable, long-term part |  $5,000 | Credit      |
| Owner Capital                |  $6,000 | Credit      |
| Retained Earnings            |  $4,000 | Credit      |

> [!example]- Sample solution
> **Current assets:** $9,000 + $4,000 + $1,000 = $14,000. **Fixed assets, net:** $10,000 - $3,000 = $7,000. **Total assets:** $21,000.
>
> **Current liabilities:** $2,500 + $1,500 + $2,000 = $6,000. **Long-term liabilities:** $5,000. **Total liabilities:** $11,000.
>
> **Equity:** $6,000 + $4,000 = $10,000. **Liabilities + equity:** $11,000 + $10,000 = $21,000, which equals total assets.
>
> **Working capital:** $14,000 - $6,000 = $8,000. **Current ratio:** 14,000 / 6,000 = 2.33. **Quick ratio:** (14,000 - 0 - 1,000) / 6,000 = 2.17.

## Key takeaways

- A balance sheet is a snapshot "as of" one date, and Assets = Liabilities + Equity must hold exactly.
- Classified means sorted by time: the 12-month line separates current from long-term.
- Fixed assets show at cost less accumulated depreciation, a contra-asset, giving net book value.
- Net income and owner draws flow through retained earnings, and draws are never an expense.
- Working capital, the current ratio and the quick ratio give a fast liquidity read.
- Tie each line to a schedule, classify by the 12-month rule, and prove the equation before sending anything.

## Explain it back

In your own words, explain how you would build a classified balance sheet from a trial balance and prove it is right, using BoBo as your example.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "28d68748-ad82-488f-ac50-27dab9ccf3a0"
title: "Balance sheet chapter quiz"
questionBankId: "8d80bfec-22d5-4f51-bbf4-7e093796bb51"
questionIds:
  - "566aa97c-bf6b-47fe-8111-9318580aeadf"
  - "2e524727-3cc9-41af-bdf0-0db38cbdb7bd"
  - "85c8f856-7d13-487c-b7b3-7e4df3e5738a"
  - "f6b5145a-7bda-4111-9ad1-7243d24e7628"
  - "256c3a72-d41b-48a0-9001-6b82b5e0abdb"
  - "6e846d5f-cd06-4343-9a46-9b25c8eb439a"
```

Next: [[courses/accounting-ai-crash-course/lessons/15-cash-flow-statement|Next lesson]]

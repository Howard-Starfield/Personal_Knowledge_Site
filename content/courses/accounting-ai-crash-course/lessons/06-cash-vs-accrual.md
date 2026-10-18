---
id: "2c733edb-e85b-44a2-a5a2-05eb6af11f46"
title: "Cash vs Accrual Accounting"
description: "Learn when to record revenue and expenses under cash and accrual accounting, and how prepayments, prepaids and accruals bridge the two."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
  - accrual-accounting
  - adjusting-entries
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 6
estimatedMinutes: 45
---

## Why this matters

Every month-end close asks one question: did we record revenue and expenses in the right period? If you confuse cash with activity, profit looks too high in some months and too low in others, and lenders and auditors will notice, and tax reporting can be affected. A customer who pays a year up front is not a year of profit today, and a vendor bill that arrives in January for December work is a December cost. Getting the timing right is one of the most common tasks you will do as a junior accountant.

## What you'll be able to do

- Explain the difference between cash-basis and accrual-basis accounting using a real transaction.
- Calculate the monthly revenue from a customer prepayment and the monthly expense from a prepaid cost.
- Decide whether a transaction needs a prepaid, unearned revenue, accrued expense or accrued revenue entry.
- Build the journal entries for a customer prepayment, a prepaid expense and an accrued expense.
- Diagnose why a cash-basis profit overstates or understates the true result of a month.

## Before you start

Answer these from memory before reading on.

- What does a debit to an asset account do to its balance, and what does a credit to a liability do?
- What is the difference between the balance sheet and the income statement?
- Why does a business keep a record of what customers owe it?

If you need a refresher, revisit the [[courses/accounting-ai-crash-course/lessons/05-accounting-cycle|Previous lesson]].

This lesson uses the fictional BoBo Digital Services LLC case study. All figures are sample data.

## Step 1 — Two ways to decide when something happened

**In plain language.** Cash accounting works like your personal checking account: you count money when it enters or leaves the bank. Accrual accounting works like a calendar of promises: you count revenue when you earn it and an expense when you incur it, no matter when cash moves.

**Analogy.** A gym sells you a 12-month membership for $1,200 in January. The gym does not call that $1,200 of January revenue. It owes you twelve months of access and earns about $100 a month as you use it. That gym membership is the mental model for every prepayment in this lesson.

**The rule.** Under cash basis, record revenue when cash is received and an expense when cash is paid. Under accrual basis, apply two ideas:

- Revenue recognition: record revenue when (or as) the performance obligation is satisfied, meaning control of the promised service or product passes to the customer.
- Matching (expense recognition): record an expense in the period it is incurred or used up, which for many costs is the same period as the revenue it helped earn.

Financial statements that follow GAAP (Generally Accepted Accounting Principles, the US rulebook) use the accrual basis. The short version to remember is: cash is when, accrual is what.

**Worked example.** On January 1, BigClient LLC pays BoBo $12,000 for a 12-month digital marketing retainer. Both methods total $12,000 for the year, but they spread it differently.

| Month | Cash received | Cash-basis revenue | Accrual revenue | Unearned revenue balance |
| --- | --- | --- | --- | --- |
| Jan | $12,000 | $12,000 | $1,000 | $11,000 |
| Feb | $0 | $0 | $1,000 | $10,000 |
| Mar | $0 | $0 | $1,000 | $9,000 |
| ... | $0 | $0 | $1,000 | falls $1,000 a month |
| Dec | $0 | $0 | $1,000 | $0 |
| Total | $12,000 | $12,000 | $12,000 | |

Cash basis makes January look like a hero month and the rest of the year look empty. A bank looking at those statements in March would see almost no recent revenue. Accrual shows the steady $1,000 a month that actually happened.

> [!warning] Common mistake
> Thinking that cash in the bank means revenue earned. A deposit only tells you when money moved, not whether the work has been done.

## Step 2 — Customer prepayments are a liability first

**In plain language.** When a customer pays before you do the work, you have their money but you also owe them the work. The money is not yours to call revenue yet.

**Analogy.** Think of a restaurant gift card. The restaurant holds your money, but it owes you meals. Each meal you eat turns a little of that debt into earned revenue.

**The rule.** Cash received before the work is performed is recorded as a liability in Customer Deposits / Unearned Revenue (2050) in BoBo's chart of accounts. Textbooks often call this deferred revenue. Each month-end you move the earned portion from the liability to Service Revenue with an adjusting journal entry (AJE).

**Worked example.** BigClient's $12,000 prepayment:

| Date | Account | Debit | Credit |
| --- | --- | --- | --- |
| Jan 1 | Cash – Stripe | $12,000 | |
| Jan 1 | Customer Deposits / Unearned Revenue (2050) | | $12,000 |
| Jan 31 | Customer Deposits / Unearned Revenue (2050) | $1,000 | |
| Jan 31 | Service Revenue | | $1,000 |

Repeat the January 31 entry at every month-end through December. A good tie-out is the rollforward: beginning balance, plus new prepayments, minus revenue recognized, equals the ending balance, and it must match the general ledger.

> [!warning] Common mistake
> Posting a customer prepayment straight to revenue because the cash arrived. Always ask whether the work has been performed yet. If not, it belongs in Customer Deposits / Unearned Revenue (2050).

```knowledge-quiz
schemaVersion: 1
quizId: "ae0d6b54-655b-4171-ba5d-ab2accbe8119"
title: "Checkpoint: cash, accrual and prepayments"
questionBankId: "206a314c-3b45-4f41-b977-741b24e987bc"
questionIds:
  - "6f9c78ff-f1fa-487d-a444-a1f6578a157b"
  - "68bc64e0-c7bf-4ebd-88b6-a2036610bb83"
```

## Step 3 — Prepaid and accrued expenses

**In plain language.** Expenses have the same timing problem in two directions. A prepaid expense is cash you paid before you use the benefit. An accrued expense is a cost you have already incurred but have not been billed for or paid.

**Analogy.** Prepaid is like buying a 12-month transit pass: you pay once and use it one month at a time. Accrued is like a restaurant tab you run for the evening: you have eaten, the bill comes later, and the cost belongs to tonight.

**The rule.**

- A prepaid expense is an asset until it is consumed. Each month-end you move the used portion from the asset to expense.
- An accrued expense is recorded at month-end by an adjusting entry: debit the expense, credit Accrued Expenses (2060). When the invoice arrives you reclassify the liability to Accounts Payable, and when you pay it you clear Accounts Payable.
- Match the expense to the service date, not the invoice date or the payment date.

**Worked example 1: prepaid insurance.** BoBo pays $2,400 on January 1 for a 12-month policy.

| Date | Account | Debit | Credit |
| --- | --- | --- | --- |
| Jan 1 | Prepaid Insurance (asset) | $2,400 | |
| Jan 1 | Cash – Bank | | $2,400 |
| Jan 31 | Insurance Expense | $200 | |
| Jan 31 | Prepaid Insurance | | $200 |

The $200 is $2,400 divided by 12 months. By December 31, the Prepaid Insurance balance is $0.

**Worked example 2: accrued contractor.** Acme Contractor works December 26 to 31, sends a $1,200 invoice on January 5, and is paid January 12.

| Date | Account | Debit | Credit |
| --- | --- | --- | --- |
| Dec 31 | Contractor Expense | $1,200 | |
| Dec 31 | Accrued Expenses (2060) | | $1,200 |
| Jan 5 | Accrued Expenses (2060) | $1,200 | |
| Jan 5 | Accounts Payable | | $1,200 |
| Jan 12 | Accounts Payable | $1,200 | |
| Jan 12 | Cash – Bank | | $1,200 |

The expense lives in December, when the work happened. The cash leaves in January.

> [!warning] Common mistake
> Booking a December contractor invoice in January because it arrived in January. Check the service date, not the invoice date.

```knowledge-quiz
schemaVersion: 1
quizId: "557aba81-5ae3-45cd-8d75-30d002f3d210"
title: "Checkpoint: prepaid and accrued expenses"
questionBankId: "206a314c-3b45-4f41-b977-741b24e987bc"
questionIds:
  - "a1cf5a5f-53b8-4968-8f7d-0941da4317ee"
  - "42d41392-1b6a-41fe-a746-d46fd3342680"
```

## Step 4 — Accrued revenue and receivables

**In plain language.** The revenue side has a mirror problem. Sometimes you finish the work before you bill, and sometimes you bill before you are paid. In both cases the revenue belongs in the month you did the work.

**Analogy.** A plumber finishes a repair on Friday and mails the invoice on Monday. The job was done on Friday, so that is when the plumber earned the money, even though no bill or payment exists yet.

**The rule.**

- Accrued revenue is revenue earned but not yet billed. It is an asset, recorded at month-end by debiting Accrued Revenue and crediting Service Revenue.
- Accounts Receivable (AR) is money customers owe you for work already delivered and billed. It is an asset on the balance sheet, while revenue appears on the income statement.
- Accounts Payable (AP) is the mirror image for vendors. It is a liability, and the matching expense is on the income statement.

The bridge accounts (unearned revenue, prepaid expenses, accrued expenses, accrued revenue, AR and AP) exist because cash timing and activity timing do not match.

**Worked example 1: standard receivable.** BoBo delivers a logo on December 28, invoices $800 the same day, and is paid January 10.

| Date | Account | Debit | Credit |
| --- | --- | --- | --- |
| Dec 28 | Accounts Receivable | $800 | |
| Dec 28 | Service Revenue | | $800 |
| Jan 10 | Cash – Bank | $800 | |
| Jan 10 | Accounts Receivable | | $800 |

Under cash basis the $800 would be January revenue. Under accrual it is correctly December revenue.

**Worked example 2: accrued revenue.** BoBo finishes a $2,500 website for ShopX on December 30 but does not invoice until January 2.

| Date | Account | Debit | Credit |
| --- | --- | --- | --- |
| Dec 31 | Accrued Revenue (asset) | $2,500 | |
| Dec 31 | Service Revenue | | $2,500 |
| Jan 2 | Accounts Receivable | $2,500 | |
| Jan 2 | Accrued Revenue | | $2,500 |

> [!warning] Common mistake
> Confusing AR with revenue, or AP with expense. They both feel like money moving, but AR and AP are balance sheet balances owed, while revenue and expense are income statement results of activity.

```knowledge-quiz
schemaVersion: 1
quizId: "93517261-3d1b-425b-b69c-2b3beb6adc09"
title: "Checkpoint: receivables and accrued revenue"
questionBankId: "206a314c-3b45-4f41-b977-741b24e987bc"
questionIds:
  - "7831250b-f93b-4f70-96de-d1e9e4b96eb0"
  - "f95f8eb4-c241-4752-96ac-cca8e954e2ca"
```

## Try it

Bo emails you on December 31: "Show me December under cash and under accrual, and tell me which adjusting entries we need." Use these six sample transactions:

1. Dec 1: received $6,000 from ClientA for a 6-month retainer starting Dec 1.
2. Dec 1: paid $2,400 to InsureCo for 12 months of insurance starting Dec 1.
3. Dec 8: delivered a website and invoiced ClientB $1,800; ClientB paid on Dec 29.
4. Dec 26 to 31: contractor Acme worked 18 hours at $50 an hour; the invoice is expected January 5.
5. Dec 28: finished an SEO audit for ClientD and will invoice $1,200 on January 2.
6. Dec 30: paid $400 for Google Ads used in December.

Calculate net income under each method, the difference, and list the adjusting entries needed.

> [!example]- Sample solution
> Cash basis: revenue is $6,000 + $1,800 = $7,800. Expenses are $2,400 insurance + $400 ads = $2,800. Net income is $5,000.
>
> Accrual basis: revenue is $1,000 (one of six months of the retainer) + $1,800 + $1,200 = $4,000. Expenses are $200 insurance (one of twelve months) + $900 contractor (18 × $50) + $400 ads = $1,500. Net income is $2,500.
>
> Cash basis overstates December by $2,500 net: it books the full $6,000 retainer and misses the $900 contractor cost, which raise profit. Expensing the full $2,400 insurance payment and missing the $1,200 audit revenue partly offset this.
>
> Adjusting entries needed on December 31:
> - Transaction 1: debit Customer Deposits / Unearned Revenue (2050) $1,000, credit Service Revenue $1,000 (after the receipt was credited to the liability).
> - Transaction 2: debit Insurance Expense $200, credit Prepaid Insurance $200.
> - Transaction 4: debit Contractor Expense $900, credit Accrued Expenses (2060) $900.
> - Transaction 5: debit Accrued Revenue $1,200, credit Service Revenue $1,200.
>
> Transactions 3 and 6 need no adjustment: the invoice and the payment fall in the same period as the activity.

## Key takeaways

- Cash basis records on the cash event; accrual basis records on the economic event.
- Revenue is recognized when (or as) the performance obligation is satisfied, and expenses are recorded in the period incurred, generally alongside the revenue they helped earn.
- Cash received before the work is a liability (Customer Deposits / Unearned Revenue, 2050); cash paid before the benefit is an asset (prepaid expense).
- Accrued revenue is an asset and an accrued expense is a liability, both created by month-end adjusting entries.
- AR and AP are balances owed on the balance sheet; revenue and expense belong to the income statement.
- Always check the service date, not the invoice date or the payment date.

## Explain it back

Bo says, "We got $12,000 from BigClient in January, so we made twelve grand this month!" In your own words, explain why that is wrong and what BoBo records instead.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "c4d36d40-1ee4-4414-950d-b5c3e43edc4d"
title: "Chapter quiz: cash vs accrual"
questionBankId: "206a314c-3b45-4f41-b977-741b24e987bc"
questionIds:
  - "35f38688-5f10-4973-9c9b-344d8bc366aa"
  - "63f814f5-8fa8-4651-81fc-6c7a079c31f4"
  - "7e8d4ce9-a5ff-4edc-8545-9f7879ae0a69"
  - "c102db83-5b61-420f-b354-3fda97483285"
  - "9ad851f3-909e-48e4-86c7-eb51c1d5eea6"
  - "eaa18aad-4b07-4626-9f48-8fca4bdc0fb9"
```

Next: [[courses/accounting-ai-crash-course/lessons/07-accounts-payable|Next lesson]]

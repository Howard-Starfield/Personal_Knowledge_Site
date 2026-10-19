---
id: "7c0231bc-cb15-49b7-8249-45492ee96795"
title: "Adjusting Entries: Putting Costs and Revenue in the Right Month"
description: "Learn the six standard month-end adjusting entries and the supporting schedules that make each one traceable."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 11
estimatedMinutes: 40
---

## Why this matters

Cash moving in the bank is not the same as the business earning or using something. If a team skips the month-end adjustments, profit can look much better or worse than reality, and owners, lenders and tax preparers make decisions on the wrong numbers. Adjusting entries are among the most common tasks given to a new accountant, so doing them cleanly makes you useful in a close very quickly.

## What you'll be able to do

- Explain why adjusting entries exist and sort a situation into an accrual or a deferral.
- Calculate the monthly prepaid amortization, straight-line depreciation and bad debt allowance for a small business.
- Write the journal entry for each of the six standard adjustments.
- Decide when an accrual needs a reversing entry and diagnose a double-counted expense.
- Build the supporting schedule a supervisor can trace for each entry.

## Before you start

- In the previous lessons, what is the difference between cash-basis and accrual-basis accounting?
- Which accounts live on the balance sheet, and which live on the income statement?
- What does it mean for an account to be a contra-asset?

Review: [[courses/accounting-ai-crash-course/lessons/10-credit-card-reconciliation|Previous lesson]]

## Step 1 — Why cash and economics disagree

**Plain language.** Imagine you pay $120 for a year of a streaming service in January. You did not use $120 of entertainment in January; you used $10. The other $110 is "service I haven't watched yet". A business has the same problem every month, and adjusting entries slice each cash event into the months it belongs to.

**The rule.** An adjusting entry is a journal entry posted at the end of a period to apply the revenue recognition principle (record revenue when it is earned) and the matching principle (record expenses in the period they help earn revenue). Each one touches at least one income statement account and one balance sheet account, and it does not move cash. There are two families:

- An **accrual** records revenue or expense _before_ the cash moves.
- A **deferral** records revenue or expense _after_ the cash has already moved, by spreading it over time.

**Worked example.** Three BoBo Digital Services LLC situations, all sample data:

| Situation                                                             | Cash timing             | Family                      |
| --------------------------------------------------------------------- | ----------------------- | --------------------------- |
| Jordan Lee finishes a video in December; the invoice comes in January | Cash after the work     | Accrual                     |
| BoBo pays $2,400 in July for a 12-month software plan                 | Cash before the use     | Deferral (prepaid)          |
| A client pays $12,000 on October 1 for a year of service              | Cash before the service | Deferral (unearned revenue) |

The six standard adjustments are prepaid expense amortization, accrued expenses, accrued revenue, depreciation, unearned revenue recognition and the bad debt allowance.

> [!warning] Common mistake
> Thinking an adjusting entry is needed only when cash moves. It is the opposite: you post one precisely because the books and the real activity disagree, and the entry itself never debits or credits cash.

## Step 2 — Deferrals: prepaid costs and unearned revenue

**Plain language.** A prepaid cost is cash you spent before you used the thing. Unearned revenue is cash a customer gave you before you delivered the service. Both sit on the balance sheet until time passes, then a slice moves to the income statement.

**The rule.**

- Prepaid expense: debit the expense and credit the prepaid asset for the month's slice.
- Unearned revenue: BoBo's chart of accounts calls this Customer Deposits / Unearned Revenue (2050). It is a liability, because BoBo still owes the service. Debit 2050 and credit revenue for the month's slice.

**Worked example 1: prepaid software.** BoBo paid $2,400 on July 1 for 12 months. Each month consumes $2,400 ÷ 12 = $200. A prepaid roll shows the balance:

| Month | Beginning | Amortization | Ending |
| ----- | --------: | -----------: | -----: |
| Jul   |     2,400 |        (200) |  2,200 |
| Oct   |     1,800 |        (200) |  1,600 |
| Dec   |     1,400 |        (200) |  1,200 |

December 31 entry: debit Software Expense 200, credit Prepaid Software 200.

**Worked example 2: unearned revenue.** A client paid $12,000 on October 1 for a year, so BoBo earns $1,000 per month. After October, November and December the balance is $12,000 − $3,000 = $9,000. December 31 entry: debit Customer Deposits / Unearned Revenue (2050) 1,000, credit Service Revenue 1,000.

> [!warning] Common mistake
> Recording the whole $12,000 as revenue on the day the cash arrives. That overstates October and leaves the following months with nothing, and the service has not yet been delivered.

```knowledge-quiz
schemaVersion: 1
quizId: "2dfea547-4611-4ee6-bbbe-51efee3cfb3a"
title: "Checkpoint: accruals, deferrals and prepaids"
questionBankId: "5ca9a315-76b7-487f-84ff-ba9357199324"
questionIds:
  - "11d74d39-b623-41b3-8109-43de01de3a29"
  - "e18cbf95-1e81-4afe-be4b-c12caef86c59"
```

## Step 3 — Spreading and estimating: depreciation and the bad debt allowance

**Plain language.** A computer keeps being "used up" even though no cash moves after you buy it, so its cost is spread over its useful life. Likewise, some customers will probably never pay, so you estimate that loss now instead of waiting to be surprised.

**The rule.**

- Straight-line depreciation per period = (cost − salvage value) ÷ useful life. Debit Depreciation Expense and credit Accumulated Depreciation, a contra-asset.
- Land is not depreciated, because it has no finite useful life.
- Bad debt allowance: required allowance = policy rate × accounts receivable. Compare it with the existing allowance balance and book only the difference. Debit Bad Debt Expense and credit Allowance for Doubtful Accounts, a contra-asset.

**Worked example 1: depreciation.** A $5,000 workstation with a 36-month life and no salvage value depreciates $5,000 ÷ 36 = $138.89 per month. After 12 months, accumulated depreciation is about $1,666.67 and net book value is about $3,333.33.

**Worked example 2: allowance.** AR is $40,000 and policy is 2%. The required allowance is $800 and the existing balance is $0, so debit Bad Debt Expense 800 and credit Allowance 800. If AR were $50,000 at 3% with $200 already in the allowance, the required balance is $1,500, so the entry is only $1,300.

> [!warning] Common mistake
> Booking the full required allowance every month. The allowance is a running balance, so the entry is only the gap between the target and what is already there.

```knowledge-quiz
schemaVersion: 1
quizId: "df690da3-7932-4565-ab8c-05838470e8d1"
title: "Checkpoint: depreciation and bad debt allowance"
questionBankId: "5ca9a315-76b7-487f-84ff-ba9357199324"
questionIds:
  - "e0d571ae-1957-43dc-a6e7-68ab485c1a03"
  - "d14fb809-0796-459f-a2fa-469bb5e77bd2"
```

## Step 4 — Accruals and reversing entries

**Plain language.** An accrual covers a cost you have already incurred but have not been billed for. Think of a tab at a restaurant: you ate in December, so the meal belongs to December even if the bill arrives later.

**The rule.** Debit the expense and credit a liability such as Accrued Expenses (2060). Accrued revenue works the other way around: for work done but not yet billed, debit a receivable (Accounts Receivable when payment is unconditional) and credit revenue. A **reversing entry** on the first day of the next period flips the accrual, so the normal invoice entry does not count the cost twice.

**Worked example.** Jordan Lee finishes a $1,800 video on December 28, and the invoice arrives January 5.

| Date  | Entry                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------- |
| 12/31 | Debit Contractor Costs - Direct 1,800; credit Accrued Expenses 1,800                                |
| 1/1   | Debit Accrued Expenses 1,800; credit Contractor Costs - Direct 1,800                                |
| 1/5   | AP books the invoice normally: debit Contractor Costs - Direct 1,800; credit Accounts Payable 1,800 |

January's net effect for that work is $0, because the reversal and the invoice cancel out. The cost correctly stays in December.

> [!warning] Common mistake
> Accruing in December and then booking the invoice in January with no reversing entry. The same cost is expensed twice. If you skip the reversal, clear the accrual when the invoice posts instead.

## Step 5 — Schedules, review and AI guardrails

**Plain language.** An entry nobody can trace is an entry nobody can trust, so every adjustment travels with the schedule behind it.

**The rule.** Build a prepaid roll, a depreciation schedule and an accrual list. Draft the journal entries with the schedule attached, send the package to a supervisor, post it after approval, then set the reversals for day 1 of the next month. If you use AI, give it numbers from your schedule to write the description. Never let it generate the numbers, never post its output without human review, and keep the prompt and output with the entry.

**Worked example.** BoBo's controller sees December profit well below forecast. Checking the schedules shows two errors: only $500 of the $1,000 revenue release was booked, and the allowance was $4,000 instead of 2% × $40,000 = $800. Revenue was understated by $500 and expense overstated by $3,200, so net income was understated by $3,700.

> [!warning] Common mistake
> Treating the schedule as paperwork to skip. The schedule is what lets a reviewer catch a 10%-instead-of-2% mistake before the month is reported.

```knowledge-quiz
schemaVersion: 1
quizId: "02d0390d-1739-473f-a4aa-14e08a0951dd"
title: "Checkpoint: accruals and reversals"
questionBankId: "5ca9a315-76b7-487f-84ff-ba9357199324"
questionIds:
  - "e9e2525c-6e9e-40af-aaf0-03e8e960e98d"
  - "4d35ea91-cee7-4027-8475-4eaa0e4998d0"
```

## Try it

BoBo paid $3,600 on April 1 for a 12-month software contract. Work out the December 31 entry for that month and the prepaid balance after it. Then calculate December depreciation on a $5,000 workstation with a 36-month life and no salvage value, and say which accounts are used.

> [!example]- Sample solution
> Prepaid software: $3,600 ÷ 12 = $300 per month. Debit Software Expense 300 and credit Prepaid Software 300. April through December is nine months, so $2,700 has been used and the balance is $3,600 − $2,700 = $900.
>
> Depreciation: $5,000 ÷ 36 = $138.89. Debit Depreciation Expense 138.89 and credit Accumulated Depreciation, a contra-asset. Neither entry touches cash.

## Key takeaways

- Adjusting entries align revenue and expense with the period they belong to, and they never touch cash.
- Each one hits at least one income statement account and one balance sheet account.
- Accruals come before cash; deferrals come after cash.
- Straight-line depreciation is (cost − salvage) ÷ useful life, and land is not depreciated.
- The allowance entry is only the gap between the required balance and the existing balance.
- Reverse an accrual on day 1 of the next period (or clear it when the invoice posts), or the invoice will double count it.

## Explain it back

In your own words, explain to a non-accountant friend what adjusting entries are and why they matter, using one BoBo example.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "6c5f51bd-a34e-4898-9c67-8bd231f1148f"
title: "Chapter quiz: adjusting entries"
questionBankId: "5ca9a315-76b7-487f-84ff-ba9357199324"
questionIds:
  - "15744836-006f-4d9a-8ece-95e0450c6eb4"
  - "d4456270-f2e8-4a37-af3c-49be226b8979"
  - "7374260e-5848-4f84-9571-9cd128a503de"
  - "4d0d3882-2997-4399-babd-34eb6194f4f4"
  - "b51f97ed-4a21-48e5-9ab1-cd3fff5aa62a"
  - "bba26700-0288-437e-9859-1eea79b22478"
```

Next: [[courses/accounting-ai-crash-course/lessons/12-month-end-close|Next lesson]]

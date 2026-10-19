---
id: "3b16cd24-7b71-4444-9b29-18ebe6993afb"
title: "The Accounting Cycle"
description: "Follow one transaction through the nine repeating steps that turn receipts into financial statements and reset the books for the next period."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 5
estimatedMinutes: 55
---

## Why this matters

Job postings for accounting roles ask you to "assist with month-end close", "prepare journal entries" and "support the trial balance". Every one of those phrases names a step in the accounting cycle. If you know the cycle, you know where your work fits, why deadlines exist, and what a senior means when they say "we're on the adjustments". It is also a common entry-level interview question: "Walk me through the accounting cycle."

## What you'll be able to do

- Explain the nine steps of the accounting cycle in order and what each one produces.
- Journalize a payment and post it to the ledger, then calculate the resulting account balances.
- Diagnose what a balanced trial balance does and does not prove.
- Calculate a prepaid adjusting entry and build an adjusted trial balance.
- Decide which accounts close at period-end and write the closing entries.

## Before you start

Answer these from memory, without looking anything up.

- When you debit an asset account, does it go up or down, and what must be credited to balance the entry? (See [[courses/accounting-ai-crash-course/lessons/04-chart-of-accounts|Previous lesson]] and the lessons before it.)
- Which statement shows performance over a period, and which shows position on a single date?
- Why might a payment made today not be an expense today?

We use the fictional BoBo Digital Services LLC case study again. All figures are sample data.

## Step 1 — Capture (cycle steps 1 to 3)

**In plain language.** The cycle is a repeatable routine a business runs every period to turn a pile of receipts, invoices and bank statements into financial statements, and then reset to start again. The first three steps capture the facts: keep the proof (step 1), record each event in a journal (step 2), and sort the records by account in the general ledger (step 3).

**Analogy.** Picture a restaurant kitchen. Order tickets arrive (source documents), the chef cooks each order in turn (journal entries), and each plate is delivered to the right table (ledger accounts).

**The rule.**

- A **source document** is the original proof that a transaction happened, such as a receipt, invoice or bank statement. No document, no entry.
- A **journal entry** is the first formal, dated, debit-and-credit record of one event.
- The **general ledger** collects every entry by account. Copying an entry into the accounts it touched is called **posting**.

**The nine steps at a glance:**

| #   | Step                       | Produces                                           |
| --- | -------------------------- | -------------------------------------------------- |
| 1   | Gather source documents    | Validated evidence                                 |
| 2   | Journalize                 | Dated journal entries                              |
| 3   | Post to the ledger         | A running balance per account                      |
| 4   | Unadjusted trial balance   | A debits-equal-credits report                      |
| 5   | Adjusting entries          | Entries that put amounts in the right period       |
| 6   | Adjusted trial balance     | The report statements are built from               |
| 7   | Financial statements       | Income statement, balance sheet, cash flow, equity |
| 8   | Closing entries            | Temporary accounts reset, profit moved to equity   |
| 9   | Post-closing trial balance | Proof that only permanent accounts remain          |

**Worked example.** On October 1, BoBo's owner pays $2,400 through PayPal for a 12-month design software plan. The PayPal receipt is filed (step 1). Because the benefit lasts twelve months, the payment is first recorded as an asset, not an expense (step 2):

| Date | Account          | Debit | Credit |
| ---- | ---------------- | ----- | ------ |
| 10/1 | Prepaid Software | 2,400 |        |
| 10/1 | PayPal (Cash)    |       | 2,400  |

Posting (step 3) updates both ledgers. Prepaid Software goes from $0 to $2,400. PayPal cash opens at $8,000 and falls by $2,400. If three more payments of $600, $300 and $250 are credited to PayPal cash in October, its balance is 8,000 − 2,400 − 600 − 300 − 250 = $4,450.

> [!warning] Common mistake
> Expensing the whole $2,400 on October 1 because the cash left that day. Cash leaving is not the same as the benefit being used up, so this overstates October's expense and understates the following months.

## Step 2 — Check (cycle step 4)

**In plain language.** At month-end you list every account balance in one place and confirm total debits equal total credits. This is the trial balance (step 4).

**Analogy.** A restaurant manager counts the till at closing time. The count tells you whether the arithmetic holds together, but not whether every sale was rung up.

**The rule.** A trial balance lists every account's balance in a debit or credit column. Double-entry bookkeeping makes the totals equal when every entry was posted completely, so a difference signals a posting problem. Equal totals do not prove correctness: a missing entry, a wrong account or a duplicated entry can all leave the totals equal.

**Worked example.** BoBo's October transactions are: 10/1 the $2,400 software plan; 10/3 a $1,500 Stripe client payment; 10/5 a $600 contractor payment; 10/10 $90 of Stripe fees; 10/15 a $300 refund; 10/20 a $2,000 invoice, unpaid; 10/25 $250 of marketing. With an assumed opening owner's equity of $8,000, the trial balance is:

| Account                 | Debit      | Credit     |
| ----------------------- | ---------- | ---------- |
| Cash - PayPal           | 4,450      |            |
| Cash - Stripe           | 1,410      |            |
| Accounts Receivable     | 2,000      |            |
| Prepaid Software        | 2,400      |            |
| Owner's Equity          |            | 8,000      |
| Service Revenue         |            | 3,500      |
| Sales Returns/Refunds   | 300        |            |
| Contractor Expense      | 600        |            |
| Processing Fees Expense | 90         |            |
| Marketing Expense       | 250        |            |
| **Totals**              | **11,500** | **11,500** |

Now suppose the totals were $42,300 and $42,030. The $270 gap could be two swapped digits, because a transposition produces a difference divisible by 9 (270 ÷ 9 = 30), or an entry posted to only one side. You trace it to the journal. You never add a plug to force a match.

> [!warning] Common mistake
> Believing "the trial balance balances, so the books are right." If a $400 fee was never journalized, debits still equal credits, but net income is overstated by $400.

```knowledge-quiz
schemaVersion: 1
quizId: "bb4cf4c3-8181-4e04-aac1-8a8659c9ba51"
title: "Checkpoint: capture and check"
questionBankId: "0eba52be-3996-4fc1-9977-cf963f71addb"
questionIds:
  - "4425c809-3eb8-4d10-9ffd-05e2903406ea"
  - "c5ef6d29-f83a-4890-a2b7-86e469e36d17"
```

## Step 3 — Adjust and report (cycle steps 5 to 7)

**In plain language.** Raw cash records do not always show which month a cost or sale belongs to. Adjusting entries fix the timing at period-end (step 5). The adjusted trial balance (step 6) then feeds the financial statements (step 7).

**Analogy.** If you pay a gym $1,200 for a year, you do not "use up" $1,200 on day one. Each month you consume one twelfth of what you bought.

**The rule.** Under accrual accounting, revenue and expense are matched to the period in which they were earned or incurred, not when cash moves. An adjusting entry for a prepaid item moves the used portion from the asset to an expense. The statements are built from the **adjusted** trial balance.

**Worked example.** One month of the $2,400 plan is used in October, so 2,400 ÷ 12 = $200:

| Date  | Account          | Debit | Credit |
| ----- | ---------------- | ----- | ------ |
| 10/31 | Software Expense | 200   |        |
| 10/31 | Prepaid Software |       | 200    |

Prepaid Software falls to $2,200 and Software Expense becomes $200. Totals remain equal at $11,500. The October income statement then reads:

- Service Revenue $3,500 less refunds $300 gives net revenue of $3,200.
- Expenses: contractor $600, marketing $250, processing fees $90, software $200, totalling $1,140.
- Net income: 3,200 − 1,140 = **$2,060**.

The balance sheet shows cash of $5,860, receivables of $2,000 and Prepaid Software of $2,200, for total assets of $10,060. This equals the owner's equity of 8,000 + 2,060 = $10,060.

> [!warning] Common mistake
> Building the statements from the unadjusted trial balance. The $200 of software expense would be missing, and net income would look $200 too high.

## Step 4 — Close and find your place (cycle steps 8 to 9)

**In plain language.** Closing entries (step 8) wipe the period's scorecard back to zero and roll the profit into equity. The post-closing trial balance (step 9) confirms the line is clean for the next period.

**Analogy.** At the end of a game you record the final result in the season standings and wipe the scoreboard to zero. The standings (permanent accounts) stay.

**The rule.** **Temporary accounts** (revenue, expenses, and dividends or owner draws) measure one period and are closed. **Permanent accounts** (assets, liabilities, equity) carry forward. Closing normally goes through Income Summary: close revenue to it, close expenses to it, then move the balance to Retained Earnings (owner's equity; for an LLC, the owner's or member's capital). Dividends or owner draws close directly to equity, not through Income Summary. Adjusting entries fix timing and happen at each close, while closing entries reset accounts and typically happen at fiscal year-end.

**Worked example.** Treating October as a close, with revenue of $3,500 and $1,440 of contra-revenue and expenses (300 + 600 + 250 + 90 + 200):

| Account                            | Debit | Credit |
| ---------------------------------- | ----- | ------ |
| Service Revenue                    | 3,500 |        |
| Income Summary                     |       | 3,500  |
| Income Summary                     | 1,440 |        |
| Expense accounts and refunds       |       | 1,440  |
| Income Summary                     | 2,060 |        |
| Owner's Equity (Retained Earnings) |       | 2,060  |

The post-closing trial balance holds only permanent accounts: Cash 4,450 + 1,410, Receivables 2,000, Prepaid Software 2,200, against Owner's Equity of 10,060. Both sides total $10,060.

**Where you fit.** The course says a junior accountant typically spends the first months in steps 1 to 4, while seniors or the controller own adjustments, statements and closing.

> [!warning] Common mistake
> Closing a permanent account such as Cash. Its balance would be zeroed on the books while the money is still in the bank. Remember: temporaries close, permanents stay.

```knowledge-quiz
schemaVersion: 1
quizId: "ef846534-b854-4999-a44a-107dc2c119d9"
title: "Checkpoint: adjust and report"
questionBankId: "0eba52be-3996-4fc1-9977-cf963f71addb"
questionIds:
  - "7866525e-0eb7-475b-ae9a-502f8767be81"
  - "0a7e5a54-ac7e-4599-8b5f-a70876db5759"
```

```knowledge-quiz
schemaVersion: 1
quizId: "bc811f6a-7929-4a51-9a36-581b1def21e4"
title: "Checkpoint: close and reset"
questionBankId: "0eba52be-3996-4fc1-9977-cf963f71addb"
questionIds:
  - "40119043-2a23-41b3-8199-0be6c19d9575"
  - "f2c61da0-36b7-48c5-8935-eb40bb91e7f9"
```

## Try it

BoBo's November activity, with assumed opening balances of $5,000 in PayPal cash and $5,000 in Owner's Equity, and no prepaid items (all sample data):

1. 11/2 Received $3,200 through Stripe for two client projects.
2. 11/4 Paid a $1,000 contractor through PayPal.
3. 11/7 Stripe and PayPal fees of $120 were deducted from the Stripe balance.
4. 11/10 Refunded $200 to a client through PayPal.
5. 11/15 Invoiced a client $1,800, net 30.
6. 11/20 Paid $300 for marketing through PayPal.

Write the journal entries, post them, and build an unadjusted trial balance. Then name one adjustment you would ask a senior about.

> [!example]- Sample solution
> Entries: (1) debit Cash - Stripe 3,200, credit Service Revenue 3,200. (2) debit Contractor Expense 1,000, credit Cash - PayPal 1,000. (3) debit Processing Fees Expense 120, credit Cash - Stripe 120. (4) debit Sales Returns/Refunds 200, credit Cash - PayPal 200. (5) debit Accounts Receivable 1,800, credit Service Revenue 1,800. (6) debit Marketing Expense 300, credit Cash - PayPal 300.
>
> Balances: PayPal 5,000 − 1,000 − 200 − 300 = 3,500; Stripe 3,200 − 120 = 3,080; Receivables 1,800; Service Revenue 3,200 + 1,800 = 5,000.
>
> Trial balance debits: 3,500 + 3,080 + 1,800 + 200 + 1,000 + 120 + 300 = 10,000. Credits: Owner's Equity 5,000 + Service Revenue 5,000 = 10,000. They match.
>
> Adjustment to raise: this batch has no prepaid items, so ask whether any accruals exist, such as contractor work done but not yet billed. If a prepaid plan existed, its monthly share (for example $200 on a $2,400 plan) would move to expense.

## Key takeaways

- The cycle has nine steps: source documents, journal, ledger, unadjusted trial balance, adjusting entries, adjusted trial balance, statements, closing entries, post-closing trial balance.
- No source document, no entry.
- A balanced trial balance proves the arithmetic only, not that every entry was recorded or posted to the right account.
- Adjusting entries fix timing, and statements are built from the adjusted trial balance.
- Temporary accounts close, permanent accounts stay, and closing normally happens at year-end.

## Explain it back

Walk through the nine steps of the accounting cycle in order, using BoBo's $2,400 prepaid software plan as your example. Say it aloud or write it down before you reveal any answer.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "33022721-df94-46cd-8fd9-0b510209b1cd"
title: "Chapter quiz: the accounting cycle"
questionBankId: "0eba52be-3996-4fc1-9977-cf963f71addb"
questionIds:
  - "851b1148-a9a3-4007-b968-7c26f086aac4"
  - "33b0377d-b319-4600-96fd-1a9f9b6a5d74"
  - "64af2028-d149-4aac-b92f-7a2129d8db72"
  - "7087005d-35c7-4adf-a260-6efaff169f3e"
  - "310511f0-9d88-4bf9-8923-9ab127a7d3d6"
  - "91639931-c81b-4ee0-b1f5-f49cf6a43268"
```

Next: [[courses/accounting-ai-crash-course/lessons/06-cash-vs-accrual|Next lesson]]

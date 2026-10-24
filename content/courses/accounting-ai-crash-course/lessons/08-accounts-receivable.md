---
id: "241934f0-9f5e-414e-bf1f-3c9f9137eae6"
title: "Accounts Receivable Workflow"
description: "Record invoices, apply payments and credit memos, age receivables, calculate DSO, and estimate and write off bad debt."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 8
estimatedMinutes: 45
---

## Why this matters

Accounts receivable (AR) is where earned revenue turns into cash, or fails to. A payment applied to the wrong invoice triggers a collection email for money the customer already sent. A missing credit memo leaves the aging report showing a balance nobody owes. An account ignored for months can end in a bankruptcy filing and no cash. Companies can report strong revenue and still run short of cash when receivables are not managed.

## What you'll be able to do

- Record an invoice and a customer payment with the correct debits and credits.
- Apply full, partial and mismatched payments, and issue a credit memo, without distorting revenue.
- Build an aging report by placing each open invoice in the right bucket, and calculate DSO.
- Calculate an allowance for doubtful accounts and post the adjusting entry.
- Decide how a specific write-off and a later recovery are recorded under the allowance method.

## Before you start

- In accrual accounting, when is revenue recorded, and how is that different from when cash arrives? Think back to [[courses/accounting-ai-crash-course/lessons/07-accounts-payable|Previous lesson]], where the same logic ran in the other direction for bills you owe.
- What does a contra account do to the account it sits beside?
- Why does a payment processor's fee not change the revenue a business earned?

## Step 1 — Record the sale as a receivable

**In plain language.** When BoBo finishes a project but the client has 30 days to pay, BoBo has no cash yet. It has a promise to pay, and that promise is an asset called Accounts Receivable.

**Analogy.** Picture a napkin that says "IOU $20 — Sam." The napkin is a receivable. A business just keeps thousands of them in a system.

**The rule.** AR is a current asset. Under accrual accounting, revenue is recorded when the performance obligation is satisfied (ASC 606), not when cash arrives. The entry is a debit to Accounts Receivable and a credit to Service Revenue. Two ledgers track it: the sub-ledger lists every open invoice by customer, and the AR control account in the general ledger must equal the sub-ledger total each period.

**Worked example.** BoBo issues INV-2026-0142 to Northwind for $3,500 on April 1, Net 30, so it is due May 1.

| Account                         |  Debit | Credit |
| ------------------------------- | -----: | -----: |
| Accounts Receivable — Northwind | $3,500 |        |
| Service Revenue                 |        | $3,500 |

Later Northwind pays through Stripe, which keeps a $105 fee and deposits $3,395.

| Account                         |  Debit | Credit |
| ------------------------------- | -----: | -----: |
| Cash — Operating Bank           | $3,395 |        |
| Merchant Processing Fees        |   $105 |        |
| Accounts Receivable — Northwind |        | $3,500 |

The invoice closes in full and revenue stays at the gross $3,500. The fee is an operating expense.

> [!warning] Common mistake
> Debiting the processor fee to revenue, or recording revenue only when cash arrives. Fees are an expense, and revenue follows delivery, not the bank deposit.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "10d9508c-4c4b-44a3-abf9-dd3fe633369b"
title: "Checkpoint 1 — Receivables and fees"
questionBankId: "2ae6aead-4171-422a-b3fa-3c1867e9a1e5"
questionIds:
  - "f725a28b-19f9-4f9d-be89-b2ed5c660926"
  - "11492e93-cf24-459c-a298-7c683e2b0ba0"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/08-accounts-receivable|Accounts Receivable Workflow Question Bank]].

## Step 2 — Apply payments and credit memos

**In plain language.** Applying a payment means matching cash to the exact invoice it pays. A credit memo is different: it lowers what a customer owes without moving any cash.

**Analogy.** A payment is like checking a name off a list, so the right line has to be crossed out. A credit memo is like a store crossing an item off your bill because you were charged for something you never received.

**The rules.**

- Follow the customer's remittance advice, the note that says which invoice the money is for. If there is none, ask the customer rather than guessing. Cash you cannot yet match sits in unapplied cash and should be cleared quickly.
- A partial payment reduces the open balance, but the invoice keeps aging from its original date.
- A credit memo debits Sales Returns & Allowances (a contra-revenue account) and credits AR. A refund is different: it returns cash that was already received.
- A manager should approve a credit memo, and the approval should be documented.

**Worked example.** Acme is billed $1,200 on INV-2026-0133: a $500 logo, a $300 style guide and $400 of copywriting. Acme disputes the copywriting and a manager agrees to remove it.

| Account                    | Debit | Credit |
| -------------------------- | ----: | -----: |
| Sales Returns & Allowances |  $400 |        |
| Accounts Receivable — Acme |       |   $400 |

The invoice now shows $800 open. When Acme pays $800, debit Cash $800 and credit AR $800, and the invoice closes. Separately, if Northwind sends a $1,500 partial payment against a $3,500 invoice, you debit Cash $1,500, credit AR $1,500, and $2,000 stays open.

> [!warning] Common mistake
> Applying cash to the oldest invoice because it is the most overdue. The customer's remittance wins, and the wrong match leaves a paid invoice open.

## Step 3 — Age the receivables and read DSO

**In plain language.** An aging report sorts open invoices by how late they are, so you chase the oldest first. Days Sales Outstanding (DSO) boils collections down to one number: the average days it takes to collect after a sale.

**Analogy.** Think of a fridge with a date shelf: fresh food in front, old food at the back that needs to be dealt with today. Aging is that shelf for invoices.

**The rules.**

- Days past due is counted from the due date. Buckets are Current (not yet due), 1–30, 31–60, 61–90 and 90+.
- DSO = (ending AR ÷ credit sales for the period) × days in the period. Lower is better, and you compare it with your terms.
- DSO is an average. It can look healthy while one customer is months late.

**Worked example.** On April 30, five invoices are open. Count days from each due date to April 30.

| Invoice | Due date | Days past due | Amount | Bucket  |
| ------- | -------- | ------------: | -----: | ------- |
| A       | May 10   |       not due |   $800 | Current |
| B       | Apr 21   |             9 |   $550 | 1–30    |
| C       | Mar 30   |            31 | $1,200 | 31–60   |
| D       | Feb 19   |            70 | $1,500 | 61–90   |
| E       | Jan 27   |            93 |   $700 | 90+     |

Total AR is $4,750. For DSO, suppose AR is $30,000 and credit sales for a 30-day month were $45,000. Then DSO = (30,000 ÷ 45,000) × 30 = 20 days. If terms are Net 30, 20 days looks good, yet the aging above shows $700 stuck beyond 90 days that the average hides.

> [!warning] Common mistake
> Counting days from the invoice date instead of the due date. A Net 30 invoice that is 45 days old is only 15 days past due.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "9564a0a1-f8ee-416b-b8e4-6a9d4aded2f0"
title: "Checkpoint 2 — Payments and aging"
questionBankId: "2ae6aead-4171-422a-b3fa-3c1867e9a1e5"
questionIds:
  - "dd2e431c-6e88-4547-b5e4-e23c22e706d1"
  - "50504c27-2175-41a9-81aa-17f480fd1524"
```

## Step 4 — Estimate losses with the allowance method

**In plain language.** Some customers will never pay. The allowance method admits that early, by estimating the loss in the same period as the sale instead of waiting to be surprised.

**Analogy.** A shop that sells on credit sets aside a few percent of each month's tab as "probably lost," without knowing which customers it will be.

**The rules.**

- The Allowance for Doubtful Accounts is a contra-asset that reduces AR to net AR on the balance sheet.
- Setting it up debits Bad Debt Expense and credits the allowance. It is adjusted to a target, so you book only the difference from the current balance.
- A write-off of a specific uncollectible invoice debits the allowance and credits AR. Profit is not hit again, because the expense was already recorded.
- If a written-off customer later pays, first reinstate the receivable (debit AR, credit Allowance), then record the cash (debit Cash, credit AR).
- The direct write-off method records the expense only when a specific account is confirmed uncollectible. It generally does not satisfy GAAP for material amounts because it breaks the matching principle. Tax rules generally call for direct write-off for tax reporting.

**Worked example.** AR is $18,000 and the policy is 3%, so the target allowance is $540. The allowance already has a $200 credit balance, so add $340.

| Account                         | Debit | Credit |
| ------------------------------- | ----: | -----: |
| Bad Debt Expense                |  $340 |        |
| Allowance for Doubtful Accounts |       |   $340 |

Now suppose gross AR is $20,000 and the allowance is $1,000, so net AR is $19,000. A customer goes bankrupt and a $300 invoice is written off: debit Allowance $300, credit AR $300. Gross AR is $19,700, the allowance is $700, and net AR is still $19,000. Profit did not move.

> [!warning] Common mistake
> Debiting Bad Debt Expense again at the write-off. Under the allowance method the expense was recorded when the allowance was built.

### Checkpoint 3

```knowledge-quiz
schemaVersion: 1
quizId: "e35a16c0-cd41-48ca-b1be-b71ee94876a8"
title: "Checkpoint 3 — Allowance and write-offs"
questionBankId: "2ae6aead-4171-422a-b3fa-3c1867e9a1e5"
questionIds:
  - "7d8e1c77-a28c-4534-a934-60ca99962584"
  - "947153d2-0a0c-44cd-8706-8941ca333ead"
```

## Try it

BoBo has $25,000 of AR at month-end, aged as follows. The allowance currently has a $400 credit balance. The policy uses these loss rates: 1% current, 3% for 1–30, 10% for 31–60, 25% for 61–90 and 50% for 90+.

| Bucket  | Balance |
| ------- | ------: |
| Current | $14,000 |
| 1–30    |  $6,000 |
| 31–60   |  $3,000 |
| 61–90   |  $1,500 |
| 90+     |    $500 |

Compute the target allowance, write the adjusting entry, and show net AR on the balance sheet.

> [!example]- Sample solution
> Allowance by bucket: $14,000 × 1% = $140; $6,000 × 3% = $180; $3,000 × 10% = $300; $1,500 × 25% = $375; $500 × 50% = $250. The target is $140 + $180 + $300 + $375 + $250 = $1,245.
>
> The allowance already holds $400, so the increase is $1,245 − $400 = $845. Debit Bad Debt Expense $845 and credit Allowance for Doubtful Accounts $845.
>
> Net AR = $25,000 − $1,245 = $23,755.

## Key takeaways

- A sale creates a receivable: debit AR, credit revenue, when the work is delivered rather than when cash arrives.
- Apply each payment to the invoice the customer names, and keep the sub-ledger tied to the GL control account.
- Credit memos reduce what is owed through contra-revenue, and no cash moves. Refunds return cash.
- Age by days past due, and read DSO together with the aging, because an average can hide late accounts.
- The allowance is a contra-asset topped up to a target; a write-off moves balances against it and leaves profit unchanged.

## Explain it back

In your own words, trace a $3,500 invoice from completed work to payment, and explain how an allowance and a later write-off affect profit and net AR.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "ff645fef-d24c-48f7-9cf8-5db6a2d264c1"
title: "Chapter quiz — Accounts Receivable"
questionBankId: "2ae6aead-4171-422a-b3fa-3c1867e9a1e5"
questionIds:
  - "7c24f3bc-e695-4d3c-a77c-5566452f6e55"
  - "cc180043-4b55-48d2-9555-253cf615cded"
  - "e8534ccf-c336-4e41-9fd3-80728bf84d50"
  - "7225c778-93dc-41ee-b0f7-72ac7e575e93"
  - "1b184b44-0a50-48a0-b7e2-0093e8474881"
  - "10a59077-54c7-46a0-bbb1-aaffb1763886"
```

Next: [[courses/accounting-ai-crash-course/lessons/09-bank-reconciliation|Next lesson]]

---
id: "aecedef8-1327-4e43-995c-a7532297670d"
title: "The QuickBooks-Style Bookkeeping Workflow"
description: "Learn the capture, classify, reconcile, review and report workflow that sits under every small-business accounting package."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 22
estimatedMinutes: 40
---

## Why this matters

Many entry-level bookkeeping and AP/AR job postings ask for QuickBooks Online "or similar", so this workflow is a fast way into the profession. The buttons change between products, but the journal entries under them do not. If you can translate each click into a debit and a credit, you can work in any small-business package and spot the mistakes that quietly corrupt the books.

## What you'll be able to do

- Name the five-verb bookkeeping workflow and apply it to a daily and monthly cadence.
- Decide whether a bank-feed line should be matched, added, transferred, or escalated.
- Write the journal entries behind an invoice, a Stripe deposit with a fee, a vendor bill, and a credit-card payment.
- Diagnose why revenue on the P&L differs from cash deposits.
- Set guardrails that keep an AI helper from fabricating, auto-posting, or auto-paying.

## Before you start

- What is the difference between a debit and a credit, and which side does an asset increase on?
- Why does revenue get recorded when work is invoiced rather than when cash arrives?
- What does a bank reconciliation prove?

Review: [[courses/accounting-ai-crash-course/lessons/21-power-query-power-pivot|Previous lesson]]

## Step 1 — Every button is a journal entry

**Plain language.** QuickBooks Online is a general ledger with a friendly face. When you press Save on an invoice, the software posts debits and credits to accounts on your chart of accounts. The software does the mechanics, while you supply the judgment: which account, which customer, which date, and whether this is new or already recorded.

**Analogy.** Think of the app as a calculator for a chef. The calculator does the arithmetic, but the chef still decides what goes in the pot.

**The rule.** Every bookkeeping system boils down to five verbs:

1. **Capture** the transaction (bank feed, receipt, invoice, manual entry).
2. **Classify** it to the right account, customer, or vendor.
3. **Reconcile** the ledger to the bank, card, or loan statement.
4. **Review** A/R aging, A/P aging, the P&L, and uncategorized items.
5. **Report** the P&L, balance sheet, cash flow, and owner KPIs.

The bank feed changed the work from typing to reviewing. The bank streams transactions in, and your job is to judge them.

**Worked example.** Bo finishes a $2,500 SEO project for Acme Café on net 15 terms. Saving the invoice posts:

```
Dr  Accounts Receivable - Acme Café   2,500.00
    Cr  Service Revenue                    2,500.00
```

Recording a $500 customer payment later (Receive Payment, deposited to Checking) posts Dr Checking 500 / Cr Accounts Receivable 500, so the receivable shrinks as cash arrives.

> [!warning] Common mistake
> Learning QuickBooks as a list of buttons. Buttons differ between Xero, Wave and QuickBooks, but the five verbs and the entries underneath do not.

## Step 2 — Match, Add, Transfer, or Split

**Plain language.** Each bank-feed line needs a decision. The memory hook is: match if it is already in the books, add if it is not, transfer if it only moves money, and split if one line is two things.

**Analogy.** A feed line is like a package at a front desk. Either someone is expecting it (match), it is new and needs a home (add), it is just moving between your own rooms (transfer), or it holds two items for different people (split).

**The rules.**

- **Match** links a feed line to a transaction already in QuickBooks, so no new entry is created.
- **Add** creates a new transaction when there is no prior record, and you pick the account.
- **Categorize** means assigning the account, customer, vendor, or class to a line you are adding.
- If you cannot identify a line, hold it and ask. Guessing is the wrong answer.

**Worked example.** Acme pays the $2,500 invoice through Stripe. Stripe takes $77.50 and deposits $2,422.50. Use Find Match, select the open invoice, and add a $77.50 line for Stripe Processing Fees (5030). One transaction posts:

```
Dr  Checking                         2,422.50
Dr  Stripe Processing Fees (5030)        77.50
    Cr  Accounts Receivable - Acme Café       2,500.00
```

The shorthand is "gross at invoice, fee at deposit, net to bank."

> [!warning] Common mistake
> Adding the $2,422.50 deposit as new revenue. That counts the sale twice, once at the invoice and once at the deposit, and leaves the invoice open in A/R.

```knowledge-quiz
schemaVersion: 1
quizId: "efa0cd85-9fa5-411c-841f-4077d88cb2ac"
title: "Checkpoint: bank-feed decisions"
questionBankId: "5bcdca62-e8be-4f0f-80dd-8a1d78708c84"
questionIds:
  - "9d4e8fb9-daf3-49d7-874c-6896ab7f9b6c"
  - "529d075c-8ecd-4780-9f93-e40676065a7a"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/22-quickbooks-workflow|The QuickBooks-Style Bookkeeping Workflow Question Bank]].

## Step 3 — Bills, expenses, and paying the credit card

**Plain language.** A Bill is a vendor invoice you will pay later, so it credits Accounts Payable. An Expense is something you have already paid, so it credits cash or the card. Paying down a credit card is neither, because it only moves value between two balance-sheet accounts.

**Analogy.** A Bill is an IOU on your desk. An Expense is a receipt in your pocket. Paying the card is moving cash from your wallet to settle a tab you already ran up.

**The rules.**

- Bills feed the A/P aging report, while Expenses do not.
- Paying the card debits the Credit Card Payable liability and credits Checking.
- The purchases on the card were already expensed when they hit it.

**Worked example.** Priya Designs sends a $900 invoice dated April 12, due May 12. The bill posts Dr Contract Labor Expense 900 / Cr Accounts Payable 900. On April 28 Bo pays $1,840 to the Visa card:

```
Dr  Credit Card Payable - Visa    1,840.00
    Cr  Checking                       1,840.00
```

Nothing reaches the P&L.

> [!warning] Common mistake
> Categorizing a card payment as an expense. This is the most common QuickBooks bookkeeping error, and it double-counts spending.

```knowledge-quiz
schemaVersion: 1
quizId: "10eac2a0-9cea-4c65-a9f0-245ee9dc36ae"
title: "Checkpoint: bills and card payments"
questionBankId: "5bcdca62-e8be-4f0f-80dd-8a1d78708c84"
questionIds:
  - "765a4eac-cd33-4d12-ad21-c9838f814bc1"
  - "dc8d304b-30b0-4fc7-9d16-6a5ccd42061f"
```

## Step 4 — Prove it, lock it, and keep a trail

**Plain language.** Reconciliation proves the books agree with the bank. A closing date password then locks the closed period, and the audit log records every create, edit and delete.

**Analogy.** Reconciling is checking your receipts against the bank statement, locking is sealing the folder, and the audit log is the sign-in sheet on the door.

**The rules.**

- Reconcile by ticking every cleared item until the difference is 0.00 against the statement balance.
- If the difference equals a missed service charge, add the charge as an expense to your bank fees account, tick it, and finish.
- The closing date locks transactions on or before a date, and a password makes the lock stricter (QuickBooks lets you choose a warning or a password).
- Avoid deleting transactions. Void them where the type allows, or reverse with an entry, and never edit a prior period without permission.

**Worked example.** The April statement for Checking ends at $6,418.27. You tick the cleared items, find the difference is a $3.50 service charge, add it, and the difference reaches 0.00. Then you set the closing date to April 30 with a password.

> [!warning] Common mistake
> Thinking the audit log makes the password unnecessary. The log shows edits after they happen, but only the lock helps prevent them.

## Step 5 — Revenue is not cash, and AI is a proposer

**Plain language.** Under accrual accounting, revenue is recorded when it is earned, which for Bo usually means when the invoice is sent, not when the cash arrives. So P&L revenue and bank deposits usually differ, mostly by the change in unpaid receivables plus processing fees.

**Analogy.** Revenue is the bill you sent. Cash is the money that came back. They are on different clocks.

**The rules.**

- A/R aging is where the gap between revenue and cash lives, so review it monthly.
- AI may suggest categories, flag anomalies and draft work. It must say unknown rather than invent a payee, and it should cite the prior coding pattern.
- A human approves before posting, and AI never initiates payment without an authorized approver.
- AI runs under a named user, so the audit log shows who did what.

**Worked example.** Bo's Q1 revenue is $58,000 and Stripe deposits are $42,000. Fees were about $1,300, and A/R at 3/31 is $14,800, which together explain nearly all of the gap. The books are right.

> [!warning] Common mistake
> "Fixing" revenue down to the deposit total. That swaps in cash thinking and erases work Bo has already earned.

```knowledge-quiz
schemaVersion: 1
quizId: "bf8e2add-a9ab-4267-b5d0-b9c7f9a75cb9"
title: "Checkpoint: controls and revenue"
questionBankId: "5bcdca62-e8be-4f0f-80dd-8a1d78708c84"
questionIds:
  - "c7e94988-cf33-4e79-a12b-efa71ab8d087"
  - "14a37faa-3528-4295-b8c6-43d4475acf9a"
```

## Try it

Classify these three April feed lines for BoBo, giving the action (match, add, transfer, escalate), the account, and the P&L effect:

1. `ADOBE CREATIVE CLOUD -54.99`
2. `DEPOSIT - TRANSFER FROM SAVINGS +5,000.00`
3. `CHASE INK PMT -1,840.00`

> [!example]- Sample solution
>
> 1. Add. a software expense account. It reduces profit, and a banking rule for Adobe is reasonable once it recurs.
> 2. Transfer. Savings to Checking. Both are balance-sheet accounts, so there is no P&L effect and it is not income.
> 3. Transfer through Pay Down Credit Card. It debits Credit Card Payable and credits Checking, so there is no P&L effect. It is not an expense.

## Key takeaways

- Every QuickBooks button posts a journal entry, so learn the entries and the buttons follow.
- The five verbs are capture, classify, reconcile, review and report.
- Match if it is already recorded, add if not, transfer if it is only moving money, and escalate what you cannot identify.
- Gross at invoice, fee at deposit, net to bank.
- Paying the card is a transfer, not an expense.
- AI proposes and a human approves, with no fabrication, no auto-post and no auto-pay.

## Explain it back

In your own words, explain the five-verb bookkeeping workflow and trace how a $2,500 invoice paid through Stripe with a $77.50 fee moves through it.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "fc48c3fc-0e0b-4fe6-bde2-8e9ebfb2a2c6"
title: "Chapter quiz: the bookkeeping workflow"
questionBankId: "5bcdca62-e8be-4f0f-80dd-8a1d78708c84"
questionIds:
  - "54f90185-6bd3-404d-993f-b1d068ec5776"
  - "60b4c315-bb60-4cc0-ba05-16c405c53707"
  - "8a0d2509-e0c1-4c40-835a-9e4cf97e21f4"
  - "45b1262a-320d-42f2-8582-6cc23d1402de"
  - "0984c2fd-435e-4721-8892-73647cdb3741"
  - "d7ad821f-6d24-488e-8939-201643aab154"
```

Next: [[courses/accounting-ai-crash-course/lessons/23-erp-awareness|Next lesson]]

---
id: "5bcdca62-e8be-4f0f-80dd-8a1d78708c84"
title: "The QuickBooks-Style Bookkeeping Workflow Question Bank"
description: "Practice questions for The QuickBooks-Style Bookkeeping Workflow."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study; every figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "9d4e8fb9-daf3-49d7-874c-6896ab7f9b6c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Acme Café's $2,500 invoice is open in A/R. Stripe now deposits $2,422.50 after a $77.50 fee. What should you do with the bank-feed line?"
    options:
      - id: add-net
        text: "Add it as new Service Revenue of $2,422.50 for Acme"
      - id: match-fee
        text: "Match it to the invoice and record the $77.50 fee"
      - id: add-void
        text: "Add it as revenue and void the original invoice"
      - id: park
        text: "Park it in Uncategorized Income until month-end"
    correctOptionIds: [match-fee]
    explanation: "Matching clears the $2,500 receivable, and the $77.50 fee is added to Stripe Processing Fees (5030) in the same transaction, so Checking receives only the net $2,422.50. Adding the deposit as new revenue is tempting because the cash is real, but it counts the sale twice and leaves the invoice open in A/R forever."
  - id: "765a4eac-cd33-4d12-ad21-c9838f814bc1"
    revision: 1
    status: active
    type: single-choice
    prompt: "On April 28 Bo pays $1,840 from Checking to the Visa Business Credit Card. Which entry is correct?"
    options:
      - id: dr-supplies
        text: "Debit Office Supplies, credit Checking"
      - id: dr-checking
        text: "Debit Checking, credit the Credit Card Payable"
      - id: dr-ap
        text: "Debit Accounts Payable, credit Checking"
      - id: dr-card
        text: "Debit Credit Card Payable, credit Checking"
    correctOptionIds: [dr-card]
    explanation: "Paying the card shrinks a liability and shrinks cash, so both sides are balance-sheet accounts and the profit and loss statement is untouched. Booking it to an expense is tempting, but the purchases were already expensed when they hit the card, so that would count them twice."
  - id: "dc8d304b-30b0-4fc7-9d16-6a5ccd42061f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Priya Designs sends a $900 invoice dated April 12, due May 12, and Bo has not paid it yet. How should you record it?"
    options:
      - id: bill
        text: "Enter a Bill, crediting Accounts Payable $900"
      - id: expense
        text: "Enter an Expense, crediting Checking $900"
      - id: receipt
        text: "Enter a Sales Receipt to Priya Designs for $900"
      - id: wait
        text: "Wait and record it on May 12 when it is paid"
    correctOptionIds: [bill]
    explanation: "A vendor invoice you will pay later is a Bill, which debits Contract Labor Expense and credits Accounts Payable on the bill date. An Expense is for something already paid, so using it here would hide the debt from the A/P aging report."
  - id: "c7e94988-cf33-4e79-a12b-efa71ab8d087"
    revision: 1
    status: active
    type: single-choice
    prompt: "April is finished and Bo wants to stop anyone from quietly editing April transactions in November. What should you set?"
    options:
      - id: rule
        text: "A banking rule that flags edits to April lines"
      - id: rec-report
        text: "A reconciliation report saved for April"
      - id: closing
        text: "A closing date of April 30 with a password"
      - id: audit-filter
        text: "An audit log filter set to April deletions"
    correctOptionIds: [closing]
    explanation: "The closing date password locks transactions on or before that date, so editing a closed period needs the password. The audit log is tempting because it records changes, but it only shows them afterwards and does not prevent them."
  - id: "14a37faa-3528-4295-b8c6-43d4475acf9a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Q1 service revenue on the P&L is $58,000, Stripe deposits total $42,000, and A/R at 3/31 is $14,800. What does this show?"
    options:
      - id: overstated
        text: "Revenue is overstated and should be cut back to the $42,000 deposits"
      - id: accrual
        text: "Accrual revenue counts invoices sent, and unpaid ones sit in A/R"
      - id: missing
        text: "Stripe is missing deposits that need to be re-imported"
      - id: cpa-cash
        text: "The CPA booked revenue on deposit dates instead of invoices"
    correctOptionIds: [accrual]
    explanation: "Revenue is recorded when the invoice is sent, so the gap between revenue and cash is roughly unpaid A/R plus Stripe fees. Cutting revenue to the deposit total is tempting, but that would switch to cash thinking and erase work Bo already earned."
  - id: "529d075c-8ecd-4780-9f93-e40676065a7a"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $1,500 outgoing wire reads INTL XFER 7841 with no recipient detail. What is the right move?"
    options:
      - id: labor
        text: "Code it to Contract Labor, the closest likely account"
      - id: uncat-exp
        text: "Add it to Uncategorized Expense so the feed clears"
      - id: match-bill
        text: "Match it to the nearest open vendor bill amount"
      - id: ask
        text: "Hold it and ask Bo who the payee is before posting"
    correctOptionIds: [ask]
    explanation: "An unidentified payment should be escalated, because guessing creates a wrong entry that looks real. Dumping it into Uncategorized Expense feels harmless, but every dollar there makes the P&L less truthful and clears the queue without answering the question."
  - id: "54f90185-6bd3-404d-993f-b1d068ec5776"
    revision: 1
    status: active
    type: multiple-select
    prompt: "You start as an entry-level bookkeeper reviewing BoBo's bank feed. Which habits are right? Select every correct answer."
    options:
      - id: escalate
        text: "Ask the owner about a line you cannot identify"
      - id: delete-dup
        text: "Delete a duplicate-looking line to clean the feed"
      - id: check-match
        text: "Check payee, date, amount and invoice number before Match"
      - id: trust-rule
        text: "Let a brand-new banking rule auto-categorize at once"
      - id: attach
        text: "Attach the receipt to the transaction it supports"
    correctOptionIds: [escalate, check-match, attach]
    explanation: "Escalating, verifying a match on several fields, and attaching receipts all protect the audit trail. Deleting a line is tempting because it tidies the feed, but deletions show in the audit log and should be replaced by voiding when a transaction is truly wrong."
  - id: "60b4c315-bb60-4cc0-ba05-16c405c53707"
    revision: 1
    status: active
    type: single-choice
    prompt: "A banking rule sends every Amazon charge to Office Supplies, and three of last month's 14 charges were personal. Which statement is correct?"
    options:
      - id: keeps-miscoding
        text: "It keeps miscoding every future matching charge unnoticed"
      - id: blocks-feed
        text: "It blocks every later Amazon charge from reaching the feed"
      - id: safe-later
        text: "It becomes safe after a month of correct coding"
      - id: no-edit
        text: "It cannot be changed once it has been saved"
    correctOptionIds: [keeps-miscoding]
    explanation: "A rule applies to every future matching line, so one bad rule can corrupt many entries before anyone looks. Assuming a rule becomes safe after good months is tempting, but personal or capital purchases can still match it later, so it needs periodic spot-checks."
  - id: "8a0d2509-e0c1-4c40-835a-9e4cf97e21f4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which April feed lines for BoBo are balance-sheet moves with no profit and loss effect? Select every correct answer."
    options:
      - id: adobe
        text: "Adobe Creative Cloud charge of $54.99"
      - id: visa
        text: "Paying the Visa balance of $1,840 from Checking"
      - id: svc-fee
        text: "Bank service fee of $12.00 on the statement"
      - id: savings
        text: "Transfer of $5,000 from savings into Checking"
      - id: stripe-fee
        text: "Stripe Processing Fees (5030) of $77.50"
    correctOptionIds: [visa, savings]
    explanation: "Paying the card and moving money between Bo's own accounts only shift balances between balance-sheet accounts. The Adobe charge, the bank service fee and the Stripe fee are all expenses, so each reduces profit."
  - id: "45b1262a-320d-42f2-8582-6cc23d1402de"
    revision: 1
    status: active
    type: true-false
    prompt: "A Sales Receipt is the right form when a customer still owes Bo money for finished work."
    answer: false
    explanation: "A Sales Receipt records a sale the customer already paid for, while an Invoice records money still owed and debits Accounts Receivable. Using a Sales Receipt for unpaid work would leave the amount out of A/R, so it would never appear in the aging report."
  - id: "0984c2fd-435e-4721-8892-73647cdb3741"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain the five-verb bookkeeping workflow and trace how a $2,500 invoice paid through Stripe with a $77.50 fee moves through it."
    sampleAnswer: "The five verbs are capture, classify, reconcile, review and report. Bo sends the invoice, which captures the sale as Dr Accounts Receivable 2,500 and Cr Service Revenue 2,500. When Stripe deposits $2,422.50, I match the feed line to the invoice and add the fee, classifying it as Dr Checking 2,422.50, Dr Stripe Processing Fees (5030) 77.50 and Cr Accounts Receivable 2,500. At month-end I reconcile Checking to the statement, review the A/R aging and P&L, and report them to Bo."
    explanation: "A strong answer names all five verbs in order and shows the two entries: gross revenue at the invoice, then the fee and net cash at the deposit. It should say the deposit is matched rather than added as new revenue."
  - id: "d7ad821f-6d24-488e-8939-201643aab154"
    revision: 1
    status: active
    type: free-recall
    prompt: "Bo asks whether an AI tool can categorize the bank feed and pay vendors without anyone checking. What guardrails do you set?"
    sampleAnswer: "AI can suggest categories and draft work, but a person approves before anything posts. It must say unknown instead of inventing a payee or account, and it should cite the past coding pattern behind each suggestion. It never pays vendors on its own, and a named human approver clicks Pay. It runs under its own named user so the audit log shows who touched each transaction."
    explanation: "A strong answer covers no fabrication, citing prior coding, human review before posting, no auto-pay, and a named-user audit trail. It treats AI as a proposer and the human as the approver."
```

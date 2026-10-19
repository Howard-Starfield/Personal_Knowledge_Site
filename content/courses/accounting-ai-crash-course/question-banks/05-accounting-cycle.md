---
id: "0eba52be-3996-4fc1-9977-cf963f71addb"
title: "The Accounting Cycle Question Bank"
description: "Practice questions for The Accounting Cycle."
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
  - id: "4425c809-3eb8-4d10-9ffd-05e2903406ea"
    revision: 1
    status: active
    type: single-choice
    prompt: "On October 1, BoBo pays $2,400 through PayPal for a 12-month design software plan. Which entry records it that day?"
    options:
      - id: software-expense
        text: "Debit Software Expense and credit PayPal cash, $2,400"
      - id: cash-prepaid
        text: "Debit PayPal cash and credit Prepaid Software, $2,400"
      - id: prepaid
        text: "Debit Prepaid Software and credit PayPal cash, $2,400"
      - id: payable
        text: "Debit Prepaid Software and credit Accounts Payable, $2,400"
    correctOptionIds: [prepaid]
    explanation: "The plan benefits twelve months, so the payment is first held as an asset (Prepaid Software) while cash decreases. Expensing the full $2,400 immediately is tempting, but it would overstate October's expense and understate the next eleven months."
  - id: "c5ef6d29-f83a-4890-a2b7-86e469e36d17"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's trial balance shows debits equal to credits, but a $400 processing fee was never journalized. What is true?"
    options:
      - id: balanced-overstated
        text: "Totals still match, yet net income is overstated by $400"
      - id: out-by-400
        text: "Totals differ by $400, so the report exposes the omission"
      - id: balanced-correct
        text: "Totals match, so net income and cash must both be right"
      - id: understated
        text: "Totals still match, yet net income is understated by $400"
    correctOptionIds: [balanced-overstated]
    explanation: "An entry that was never made leaves debits and credits equal, so the trial balance cannot reveal it. The missing fee expense means net income is too high, which is why a balanced trial balance does not prove the books are correct."
  - id: "851b1148-a9a3-4007-b968-7c26f086aac4"
    revision: 1
    status: active
    type: single-choice
    prompt: "The PayPal cash account opens October at $8,000. Posted credits are $2,400 (software plan), $600 (contractor), $300 (refund) and $250 (ads). What balance should the ledger show?"
    options:
      - id: only-software
        text: "$5,600, because only the software plan counts"
      - id: skip-refund
        text: "$4,750, because refunds are posted elsewhere"
      - id: skip-prepaid
        text: "$6,850, because prepaid items never hit cash"
      - id: all-four
        text: "$4,450, because all four credits are posted"
    correctOptionIds: [all-four]
    explanation: "Every payment leaves the cash account, so the balance is 8,000 minus 2,400, 600, 300 and 250, which is $4,450. Treating a prepaid purchase as non-cash is tempting, but a prepaid asset is still paid for with cash on the day of purchase."
  - id: "7866525e-0eb7-475b-ae9a-502f8767be81"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo paid $1,200 on September 1 for 12 months of web hosting and booked it to Prepaid Hosting. What adjusting entry belongs on September 30?"
    options:
      - id: reversed
        text: "Debit Prepaid Hosting and credit Hosting Expense, $100"
      - id: one-month
        text: "Debit Hosting Expense and credit Prepaid Hosting, $100"
      - id: full-amount
        text: "Debit Hosting Expense and credit Prepaid Hosting, $1,200"
      - id: cash-side
        text: "Debit Hosting Expense and credit Cash, $100"
    correctOptionIds: [one-month]
    explanation: "One month of a twelve-month plan was used, so one twelfth ($100) moves from the asset to expense. Using the full $1,200 is tempting but would expense the whole year now, and crediting Cash would pay for the hosting a second time."
  - id: "0a7e5a54-ac7e-4599-8b5f-a70876db5759"
    revision: 1
    status: active
    type: single-choice
    prompt: "Halverson CPA asks which report you should build the October Income Statement from. Which do you use?"
    options:
      - id: unadjusted
        text: "The unadjusted trial balance, pulled on October 31"
      - id: post-closing
        text: "The post-closing trial balance, because it is cleanest"
      - id: adjusted
        text: "The adjusted trial balance, after adjusting entries"
      - id: source-log
        text: "The source-document log, because it holds originals"
    correctOptionIds: [adjusted]
    explanation: "Statements are built from the adjusted trial balance because it already reflects the timing corrections. The post-closing version is tempting for being clean, but revenue and expense accounts have been zeroed in it, so an Income Statement could not be built from it."
  - id: "40119043-2a23-41b3-8199-0be6c19d9575"
    revision: 1
    status: active
    type: single-choice
    prompt: "At fiscal year-end BoBo's Service Revenue is $40,000 and expenses total $25,000. After revenue and expenses are closed to Income Summary, which entry moves the result to equity?"
    options:
      - id: profit-credit
        text: "Debit Income Summary $15,000; credit Retained Earnings $15,000"
      - id: profit-debit
        text: "Debit Retained Earnings $15,000; credit Income Summary $15,000"
      - id: expenses-only
        text: "Debit Income Summary $25,000; credit Retained Earnings $25,000"
      - id: revenue-only
        text: "Debit Income Summary $40,000; credit Retained Earnings $40,000"
    correctOptionIds: [profit-credit]
    explanation: "Income Summary holds a $40,000 credit and a $25,000 debit, so it carries a $15,000 credit balance, which is moved to equity by debiting Income Summary and crediting Retained Earnings. Reversing the sides would record a loss, and using $40,000 would ignore the expenses."
  - id: "33b0377d-b319-4600-96fd-1a9f9b6a5d74"
    revision: 1
    status: active
    type: single-choice
    prompt: "You start as BoBo's junior accountant. According to this course, where does most of your first months' work sit?"
    options:
      - id: closing
        text: "Steps 8-9, running closing entries and post-closing checks"
      - id: statements
        text: "Steps 5-7, owning adjustments and statement preparation"
      - id: everything
        text: "Steps 1-9 alone, with seniors only reviewing at year-end"
      - id: first-four
        text: "Steps 1-4, from source documents through the trial balance"
    correctOptionIds: [first-four]
    explanation: "The course describes juniors living mostly in steps 1 to 4, collecting documents, journalizing, posting and supporting the trial balance, while seniors own adjustments, statements and closing. Assuming you own every step is tempting, but a junior's entries are reviewed and later steps need senior judgment."
  - id: "64af2028-d149-4aac-b92f-7a2129d8db72"
    revision: 1
    status: active
    type: multiple-select
    prompt: "It is fiscal year-end. Which BoBo accounts are temporary and close to Income Summary? Select every correct answer."
    options:
      - id: cash-stripe
        text: "Cash - Stripe (balance of $1,410)"
      - id: service-revenue
        text: "Service Revenue (balance of $3,500)"
      - id: prepaid
        text: "Prepaid Software (balance of $2,200)"
      - id: marketing
        text: "Marketing Expense (balance of $250)"
      - id: receivable
        text: "Accounts Receivable (balance of $2,000)"
    correctOptionIds: [service-revenue, marketing]
    explanation: "Revenue and expense accounts measure one period's activity, so they are zeroed by closing entries. Prepaid Software and Accounts Receivable are tempting because they came from income-related events, but they are assets that carry forward."
  - id: "7087005d-35c7-4adf-a260-6efaff169f3e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A trial balance shows debits of $42,300 and credits of $42,030. Which responses are sound? Select every correct answer."
    options:
      - id: swapped
        text: "Check for swapped digits, since $270 divides evenly by 9"
      - id: suspense
        text: "Add a $270 plug entry so the totals agree"
      - id: one-sided
        text: "Look for a missing or one-sided posting worth $270"
      - id: wait
        text: "Wait for adjusting entries, which usually absorb gaps"
    correctOptionIds: [swapped, one-sided]
    explanation: "A $270 gap can come from transposed digits or from an entry posted to only one side, so both are worth tracing back to the journal. Plugging the difference is tempting because it makes the report balance, but it hides a real error and auditors will find it."
  - id: "f2c61da0-36b7-48c5-8935-eb40bb91e7f9"
    revision: 1
    status: active
    type: true-false
    prompt: "Prepaid Software is a permanent account, so closing entries leave its balance in place."
    answer: true
    explanation: "Prepaid Software is an asset, and assets carry their balance into the next period. Only its related expense account, Software Expense, is temporary and gets closed."
  - id: "310511f0-9d88-4bf9-8923-9ab127a7d3d6"
    revision: 1
    status: active
    type: free-recall
    prompt: "Walk through the nine steps of the accounting cycle in order, using BoBo's $2,400 prepaid software plan as your example."
    sampleAnswer: "The cycle runs: source document, journal entry, ledger posting, unadjusted trial balance, adjusting entries, adjusted trial balance, financial statements, closing entries, post-closing trial balance. For BoBo, the PayPal receipt supports debiting Prepaid Software and crediting cash for $2,400. That posts to both ledgers, and the trial balance checks that debits equal credits. At month-end, an adjusting entry moves $200 to Software Expense, leaving $2,200 prepaid. The adjusted trial balance feeds the statements, closing entries zero the temporary accounts into equity, and the post-closing trial balance confirms only permanent accounts remain."
    explanation: "A strong answer gives all nine steps in the correct order and ties at least the journal entry, the $200 adjustment and the closing of temporary accounts to the example. Mixing up the adjusted and post-closing trial balances is a frequent slip."
  - id: "91639931-c81b-4ee0-b1f5-f49cf6a43268"
    revision: 1
    status: active
    type: free-recall
    prompt: "A new hire proposes closing the Cash account to Retained Earnings at year-end. What happens, and why is it wrong?"
    sampleAnswer: "Closing Cash would zero out the business's cash balance on the books, even though the money is still in the bank. Cash is a permanent asset account, so its balance carries forward into the next period. Only temporary accounts, meaning revenue, expenses and dividends or owner draws, are closed. Closing a permanent account would wipe part of the balance sheet and make the next period start with wrong numbers."
    explanation: "The key ideas are that Cash is permanent, that only temporary accounts reset, and that closing a permanent account corrupts the balance sheet. A weaker answer says only that it is against the rules without naming the temporary versus permanent distinction."
```

---
id: "ec17c6b0-89dd-4a2c-8073-29fcf04ff927"
title: "Bank Reconciliation Question Bank"
description: "Practice questions for Bank Reconciliation."
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
  - id: "b2a15794-8d63-4aa1-b301-693d9ed1f476"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo mailed check #1046 on April 29 and recorded it in the books that day. The payee has not cashed it by April 30. How is it treated on the reconciliation?"
    options:
      - id: bank-subtract
        text: "Subtract it from the bank balance and book no entry"
      - id: book-subtract
        text: "Subtract it from the book balance and book an entry"
      - id: bank-add
        text: "Add it to the bank balance and book no entry"
      - id: book-add
        text: "Add it to the book balance and book an entry"
    correctOptionIds: [bank-subtract]
    explanation: "The books already recorded the check when it was written, so only the bank is behind; subtracting it from the bank balance lines the bank up with the books and needs no entry. Booking it again would count the same expense twice."
  - id: "60483938-fec7-47cc-888e-174f686dbd4e"
    revision: 1
    status: active
    type: single-choice
    prompt: "April Stripe sales of $10,000 were booked at gross, but the bank received only $9,550. What is the reconciling problem?"
    options:
      - id: revenue-over
        text: "Revenue is overstated by $450 and must be reduced"
      - id: bank-error
        text: "The bank short-paid $450 and the bank must be disputed"
      - id: fee-missing
        text: "A $450 fee was never booked, so book cash is too high"
      - id: dit
        text: "The $450 is a deposit in transit that clears next month"
    correctOptionIds: [fee-missing]
    explanation: "Stripe kept $450 in fees before paying out, so the correct entry is a debit to Stripe Processing Fees and a credit to Cash. Reducing revenue is tempting, but the $10,000 of sales really happened and gross revenue is right."
  - id: "488443c5-3e33-45fd-88ca-1d39bcbcf08a"
    revision: 1
    status: active
    type: single-choice
    prompt: "A customer's $400 ACH payment was returned by the bank for insufficient funds. Which entry goes on the books?"
    options:
      - id: dr-cash
        text: "Debit Cash $400 and credit Accounts Receivable $400 to clear it"
      - id: dr-ar
        text: "Debit Accounts Receivable $400 and credit Cash $400"
      - id: dr-bad-debt
        text: "Debit Bad Debt Expense $400 and credit Cash $400"
      - id: dr-revenue
        text: "Debit Service Revenue $400 and credit Cash $400"
    correctOptionIds: [dr-ar]
    explanation: "The bank took the money back, so cash falls, but the customer still owes BoBo, so the receivable is reinstated. Bad debt expense would be right only after BoBo decides the customer will never pay, and the sale itself was not undone."
  - id: "75a52a76-9bee-4429-bfa5-a44a83be6797"
    revision: 1
    status: active
    type: single-choice
    prompt: "After listing every item you can support, the rec is still $75 apart. What is the right next step?"
    options:
      - id: plug-misc
        text: "Book $75 to a rec adjustment account so the rec ties"
      - id: carry-quiet
        text: "Carry the $75 into next month and say nothing about it"
      - id: change-bank
        text: "Change the bank balance by $75 so both sides agree"
      - id: document-escalate
        text: "Document what you checked, flag the $75 and escalate it"
    correctOptionIds: [document-escalate]
    explanation: "An unexplained gap is information, so you record what you checked and hand it to your supervisor. A plug makes the rec look finished while hiding a possible error or fraud, which is exactly what an auditor looks for."
  - id: "6de169d1-cb1c-4ad4-ba54-9f1e0c40329b"
    revision: 1
    status: active
    type: single-choice
    prompt: "A company's bank statement shows $30,000. A $2,000 deposit is in transit and $1,500 of checks are outstanding. What is the adjusted bank balance?"
    options:
      - id: sub-both
        text: "$26,500, found by subtracting both items"
      - id: add-both
        text: "$33,500, found by adding both items"
      - id: add-dit
        text: "$30,500, found by adding the deposit and removing checks"
      - id: sub-dit
        text: "$29,500, found by subtracting the deposit and adding the checks back"
    correctOptionIds: [add-dit]
    explanation: "Deposits in transit raise the bank balance and outstanding checks lower it, so 30,000 + 2,000 - 1,500 gives $30,500. Reversing the signs is the common slip, because it treats the bank's view as the thing being corrected."
  - id: "cee8fa38-d32b-4b89-a071-30735db68df2"
    revision: 1
    status: active
    type: single-choice
    prompt: "Check #1039 to a software vendor was booked at $250, but the invoice and the bank both show $350. What correcting entry belongs on the books?"
    options:
      - id: dr-cash-cr-exp
        text: "Debit Cash $100 and credit the expense account $100"
      - id: dr-exp-cr-cash
        text: "Debit the expense account $100 and credit Cash $100"
      - id: no-entry
        text: "Make no entry because the bank already holds the right figure"
      - id: add-bank
        text: "Add $100 to the bank balance on the rec and make no entry"
    correctOptionIds: [dr-exp-cr-cash]
    explanation: "The bank paid $100 more than the books recorded, so cash was overstated and the expense understated, and the entry fixes both. Leaving it alone because the bank is right is tempting, but the books are what must catch up."
  - id: "0a59df97-08ef-4075-af45-ff7fffc20bcd"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's controller wants Stripe fees to stop surprising the team each month. What does a Stripe Clearing account do?"
    options:
      - id: gross-net
        text: "It holds gross sales until net cash and the fee are booked"
      - id: skip-fees
        text: "It removes the need to record the fee as an expense at any point"
      - id: bank-feed
        text: "It replaces the bank feed so statements no longer need matching"
      - id: reserve
        text: "It sets aside cash that the business can no longer spend"
    correctOptionIds: [gross-net]
    explanation: "Sales are booked to the clearing account at gross, and on payout day the net cash and the fee are booked against it, so the leftover balance should match Stripe's in-transit report. It does not remove the fee; it just makes the fee visible each time."
  - id: "a62c60b6-4d2a-4eef-92ba-a26ca267d20d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these items need an adjusting journal entry on the books? Select every correct answer."
    options:
      - id: service-fee
        text: "A $30 bank service fee taken on April 29"
      - id: dit-item
        text: "A Stripe deposit in transit posted May 1"
      - id: nsf-item
        text: "A returned customer ACH payment"
      - id: out-check
        text: "A check mailed April 29 that has not cleared"
      - id: interest-item
        text: "Interest credited by the bank"
    correctOptionIds: [service-fee, nsf-item, interest-item]
    explanation: "The bank already knows about the fee, the return and the interest, so the books must catch up with entries. The deposit in transit and the outstanding check are timing items that are already on the books and clear by themselves next period."
  - id: "5c9acb84-c843-4a60-a3a3-4461c770397b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A $200 difference remains after all known items are listed. Which actions are good practice? Select every correct answer."
    options:
      - id: trace
        text: "Pull source documents and trace each line to the general ledger"
      - id: escalate
        text: "Escalate with a written note of what was checked"
      - id: plug
        text: "Book it to a miscellaneous rec adjustment account to finish"
      - id: totals-only
        text: "Recheck only the ending balances and stop there"
    correctOptionIds: [trace, escalate]
    explanation: "Differences are found by tracing individual transactions to their documents, and escalating with notes keeps a trail for the reviewer. Rechecking only the totals is tempting but can miss two offsetting errors that hide inside matching balances."
  - id: "c2883441-780a-4d0a-941d-87909e88185a"
    revision: 1
    status: active
    type: true-false
    prompt: "A deposit in transit needs an adjusting journal entry on the books."
    answer: false
    explanation: "The deposit was already recorded when it was made, so the books are right and only the bank is a day or two behind. It appears on the rec as an addition to the bank balance and clears on its own next period."
  - id: "f35f436b-8674-40fc-ba85-8db4a8786e74"
    revision: 1
    status: active
    type: free-recall
    prompt: "A junior accountant plugs a $75 gap to Miscellaneous Expense so the rec ties. Explain what is wrong and what they should do instead."
    sampleAnswer: "A plug makes the numbers match without knowing why, so it can hide a missed fee, a recording error or even theft. If a $75 gap goes unexplained today, a $50,000 gap will be just as unexplainable later. They should reverse the plug, trace each line to its source document, document what they checked, leave any remaining difference noted and escalate to the supervisor."
    explanation: "A strong answer says the plug hides the cause, names at least one thing it could hide, and gives the replacement behavior of investigating, documenting and escalating."
  - id: "3780776b-450b-43c1-9bcf-86ca17658e0c"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how a bank reconciliation works and why bank-side items need no entry while book-side items do."
    sampleAnswer: "A reconciliation takes the bank statement balance and the book cash balance and adjusts both to one agreed number. Bank-side items such as outstanding checks and deposits in transit are timing differences that are already on the books, so they clear on their own and need no entry. Book-side items such as fees, NSF returns, interest, processor fees and recording errors are things the bank knows and the books do not, so each needs an adjusting entry."
    explanation: "A strong answer names both starting balances, separates timing items from items the books are missing, and ties the entry rule to who already has the transaction recorded."
```

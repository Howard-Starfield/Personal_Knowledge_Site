---
id: "5ca9a315-76b7-487f-84ff-ba9357199324"
title: "Adjusting Entries Question Bank"
description: "Practice questions for Adjusting Entries."
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
  - id: "e18cbf95-1e81-4afe-be4b-c12caef86c59"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo paid $2,400 on July 1 for a 12-month software plan and recorded it as Prepaid Software. What is the adjusting entry on December 31 for that month?"
    options:
      - id: dr-prepaid
        text: "Debit Prepaid Software 200 and credit Cash 200"
      - id: monthly-slice
        text: "Debit Software Expense 200 and credit Prepaid Software 200"
      - id: full-cost
        text: "Debit Software Expense 2,400 and credit Prepaid Software 2,400"
      - id: backwards
        text: "Debit Prepaid Software 200 and credit Software Expense 200"
    correctOptionIds: [monthly-slice]
    explanation: "The plan costs $2,400 over 12 months, so each month consumes $200, which moves from the Prepaid Software asset to expense. Expensing all $2,400 is tempting because that is the cash paid, but it ignores the months not yet used."
  - id: "11d74d39-b623-41b3-8109-43de01de3a29"
    revision: 1
    status: active
    type: single-choice
    prompt: "At year-end BoBo has two open items: Jordan Lee finished a video but has not sent an invoice, and a client paid $12,000 on October 1 for a full year of service. How should they be sorted?"
    options:
      - id: both-accruals
        text: "Both are accruals, because both need a December 31 entry"
      - id: both-deferrals
        text: "Both are deferrals, because cash timing differs from service"
      - id: swapped
        text: "The video is a deferral and the prepayment is an accrual"
      - id: sorted
        text: "The video is an accrual and the prepayment is a deferral"
    correctOptionIds: [sorted]
    explanation: "An accrual records an expense or revenue before the cash moves, which fits the unbilled video work. A deferral spreads cash that has already moved, which fits the prepayment. Needing a year-end entry is not the test, because both kinds need one."
  - id: "15744836-006f-4d9a-8ece-95e0450c6eb4"
    revision: 1
    status: active
    type: single-choice
    prompt: "A client paid BoBo $12,000 on October 1 for twelve months of service, recorded in Customer Deposits / Unearned Revenue (2050). After the December 31 adjusting entry, what balance remains in 2050?"
    options:
      - id: nine-k
        text: "$9,000, the three unearned months still owed"
      - id: ten-k
        text: "$10,000, the balance after only two months of service"
      - id: eleven-k
        text: "$11,000, the balance after only one month of service"
      - id: one-k
        text: "$1,000, the revenue recognized in December alone"
    correctOptionIds: [nine-k]
    explanation: "Three months (October, November and December) have been earned at $1,000 each, so $12,000 minus $3,000 leaves $9,000 still owed as service. The $1,000 option is the December amount, not the remaining liability."
  - id: "e0d571ae-1957-43dc-a6e7-68ab485c1a03"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo bought a $5,000 workstation with a 36-month life and no salvage value. What is the monthly straight-line depreciation, rounded to cents?"
    options:
      - id: all-now
        text: "$5,000, expensing the full cost in the first month"
      - id: twelve
        text: "$416.67, dividing the cost by 12 months"
      - id: thirty-six
        text: "$138.89, dividing the cost by 36 months"
      - id: year-total
        text: "$1,666.67, the total built up after one year"
    correctOptionIds: [thirty-six]
    explanation: "Straight-line depreciation is cost minus salvage divided by useful life, so $5,000 divided by 36 months is about $138.89. The $1,666.67 option is the accumulated depreciation after 12 months, not the monthly charge."
  - id: "d14fb809-0796-459f-a2fa-469bb5e77bd2"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's AR is $50,000 and policy requires a 3% allowance. The Allowance for Doubtful Accounts already has a $200 credit balance. What is the adjusting entry?"
    options:
      - id: full-three
        text: "Debit Bad Debt Expense 1,500 and credit Allowance 1,500 now"
      - id: top-up
        text: "Debit Bad Debt Expense 1,300 and credit Allowance 1,300"
      - id: existing-only
        text: "Debit Bad Debt Expense 200 and credit Allowance 200"
      - id: reversed
        text: "Debit Allowance 1,300 and credit Bad Debt Expense 1,300"
    correctOptionIds: [top-up]
    explanation: "The required allowance is 3% of $50,000, or $1,500, and $200 is already there, so the entry only tops it up by $1,300. Booking the full $1,500 would double count the existing balance."
  - id: "e9e2525c-6e9e-40af-aaf0-03e8e960e98d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Jordan Lee finished a $1,800 video on December 28, but the invoice will arrive January 5. What should BoBo record on December 31?"
    options:
      - id: wait
        text: "Record nothing in December and book the invoice when it arrives"
      - id: ap-debit
        text: "Debit Accounts Payable 1,800 and credit Contractor Costs - Direct 1,800 in December"
      - id: prepaid
        text: "Debit Prepaid Expenses 1,800 and credit Accrued Expenses 1,800"
      - id: accrue
        text: "Debit Contractor Costs - Direct 1,800 and credit Accrued Expenses 1,800"
    correctOptionIds: [accrue]
    explanation: "The work was done in December, so the cost belongs to December even though no invoice exists yet. Waiting for the invoice is tempting because there is no document, but it would push the expense into January and overstate December profit."
  - id: "4d35ea91-cee7-4027-8475-4eaa0e4998d0"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo accrued Jordan's $1,800 on December 31 but posted no reversing entry. On January 5 AP books the invoice as a normal expense. What is the result?"
    options:
      - id: no-effect
        text: "Nothing is wrong, because each entry falls in its own month"
      - id: cash-high
        text: "Cash is overstated by $1,800 until the accrual is cleared"
      - id: double
        text: "The cost is expensed twice and the accrued liability stays open"
      - id: expense-low
        text: "The accrual clears itself and January expense is understated"
    correctOptionIds: [double]
    explanation: "The December accrual already recorded the cost, and the January invoice records it again, so expense is counted twice and the liability is never cleared. A reversing entry on January 1 removes the accrual so the normal invoice entry is correct."
  - id: "d4456270-f2e8-4a37-af3c-49be226b8979"
    revision: 1
    status: active
    type: multiple-select
    prompt: "While closing December, which situations need an adjusting entry? Select every correct answer."
    options:
      - id: annual-plan
        text: "A $2,400 annual software plan paid in July"
      - id: unbilled
        text: "A designer's finished work with no invoice received"
      - id: paid-invoice
        text: "A client invoice paid in full and recorded on December 20"
      - id: workstation
        text: "A workstation that was in use all month"
    correctOptionIds: [annual-plan, unbilled, workstation]
    explanation: "The prepaid plan needs its monthly amortization, the unbilled work needs an accrual, and the workstation needs depreciation. The invoice paid and recorded on December 20 is already in the right period, so nothing more is needed."
  - id: "7374260e-5848-4f84-9571-9cd128a503de"
    revision: 1
    status: active
    type: multiple-select
    prompt: "BoBo releases $1,000 of an annual prepayment into December revenue. Which lines belong in the entry? Select every correct answer."
    options:
      - id: dr-2050
        text: "Debit Customer Deposits / Unearned Revenue (2050) for $1,000"
      - id: cr-revenue
        text: "Credit Service Revenue for $1,000"
      - id: dr-cash
        text: "Debit Cash for $1,000 because the money arrives"
      - id: cr-2050
        text: "Credit Customer Deposits / Unearned Revenue for $1,000"
    correctOptionIds: [dr-2050, cr-revenue]
    explanation: "The liability shrinks with a debit because BoBo has delivered part of the service, and revenue is credited for the same amount. Debiting cash is tempting but the cash arrived back in October, so adjusting entries never touch it."
  - id: "4d0d3882-2997-4399-babd-34eb6194f4f4"
    revision: 1
    status: active
    type: true-false
    prompt: "A client pays $12,000 on October 1 for a full year of service, so BoBo should record $12,000 of revenue in October because the cash arrived then."
    answer: false
    explanation: "Revenue is recognized as the service is delivered, which here is $1,000 per month. Recording it all in October would overstate that month's profit and understate the following months, and the unearned part is a liability until earned."
  - id: "b51f97ed-4a21-48e5-9ab1-cd3fff5aa62a"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain to a non-accountant friend what adjusting entries are and why they matter, using one BoBo example."
    sampleAnswer: "Cash moves at random times, but work and costs happen steadily, so at month-end accountants slice each cash event into the months it belongs to. For example, BoBo pays $2,400 for a year of software, but only $200 of it is used in December, so an adjusting entry moves $200 from the Prepaid Software asset to expense. Without these entries, profit looks wrong and people make decisions on bad numbers."
    explanation: "A strong answer says adjusting entries align revenue and expense with the period they belong to, regardless of when cash moved. A concrete BoBo example with real numbers shows you can apply the idea instead of reciting it."
  - id: "bba26700-0288-437e-9859-1eea79b22478"
    revision: 1
    status: active
    type: free-recall
    prompt: "BoBo's December profit came in far below forecast. You find that only $500 of a $1,000 monthly revenue release was booked, and the bad debt allowance was $4,000 instead of 2% of $40,000. What is the effect on net income, and what should you do?"
    sampleAnswer: "Revenue is understated by $500. The correct allowance is $800, so bad debt expense is overstated by $3,200. Net income is understated by $3,700 in total. I would correct both entries, tie each one back to its supporting schedule, the contract and the written policy, and then show my supervisor the corrected figures."
    explanation: "A strong answer adds both errors in the same direction, $500 plus $3,200, and recomputes the allowance from policy rather than trusting the posted number. It also names the supporting schedules as the control that would have caught the mistakes."
```

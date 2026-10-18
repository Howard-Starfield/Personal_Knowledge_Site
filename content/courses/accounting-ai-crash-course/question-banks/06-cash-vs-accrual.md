---
id: "206a314c-3b45-4f41-b977-741b24e987bc"
title: "Cash vs Accrual Accounting Question Bank"
description: "Practice questions for Cash vs Accrual Accounting."
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
  - id: "6f9c78ff-f1fa-487d-a444-a1f6578a157b"
    revision: 1
    status: active
    type: single-choice
    prompt: "On January 1, BigClient pays BoBo $12,000 for a 12-month retainer that starts that day. How much revenue does BoBo record for January under accrual accounting?"
    options:
      - id: all-cash
        text: "$12,000, because the full payment arrived in the bank in January"
      - id: no-invoice
        text: "$0, because the contract has not been fully delivered"
      - id: one-month
        text: "$1,000, because one month of service was delivered"
    correctOptionIds: [one-month]
    explanation: "Accrual accounting records revenue as the service is delivered, and one month of a 12-month retainer is $1,000. Recording all $12,000 in January follows the cash, which is tempting because the deposit is already in the bank, but most of that money is still owed back as service."
  - id: "42d41392-1b6a-41fe-a746-d46fd3342680"
    revision: 1
    status: active
    type: single-choice
    prompt: "Acme Contractor works December 26 to 31 on a BoBo project, sends a $1,200 invoice on January 5, and is paid January 12. What does BoBo record on December 31?"
    options:
      - id: accrue
        text: "Debit Contractor Expense and credit Accrued Expenses (2060) for $1,200"
      - id: wait-invoice
        text: "Nothing yet, because the vendor invoice does not arrive until January 5"
      - id: wait-cash
        text: "Nothing yet, because no cash leaves the bank until January 12"
    correctOptionIds: [accrue]
    explanation: "The work happened in December, so the expense is incurred in December, and the credit goes to Accrued Expenses because no bill exists yet. Waiting for the invoice or the payment is tempting, but both only show when paperwork or cash moved, not when the activity happened."
  - id: "a1cf5a5f-53b8-4968-8f7d-0941da4317ee"
    revision: 1
    status: active
    type: single-choice
    prompt: "On January 1, BoBo pays $2,400 for a 12-month insurance policy and records it as Prepaid Insurance. What adjusting entry does it make on January 31?"
    options:
      - id: expense-all
        text: "Debit Insurance Expense and credit Cash for the full $2,400 premium"
      - id: reverse
        text: "Debit Prepaid Insurance and credit Insurance Expense for $200"
      - id: cash-200
        text: "Debit Insurance Expense and credit Cash for $200"
      - id: amortize
        text: "Debit Insurance Expense and credit Prepaid Insurance for $200"
    correctOptionIds: [amortize]
    explanation: "One month of coverage is used up, so $200 moves from the Prepaid Insurance asset into Insurance Expense. Crediting Cash would record cash leaving a second time, although the full $2,400 was paid on January 1."
  - id: "68bc64e0-c7bf-4ebd-88b6-a2036610bb83"
    revision: 1
    status: active
    type: single-choice
    prompt: "Halcyon Studios pays BoBo $3,500 on July 1 for a retainer covering July through September. Which description fits the credit side of the July 1 entry?"
    options:
      - id: revenue
        text: "Service revenue, because the customer has already paid BoBo in full"
      - id: liability
        text: "A liability, because BoBo still owes three months of service"
      - id: prepaid
        text: "A prepaid expense, because the payment covers future months"
    correctOptionIds: [liability]
    explanation: "Cash received before the work is a liability, recorded in Customer Deposits / Unearned Revenue (2050), until the service is delivered. A prepaid expense is the mirror image: it is cash that the business itself paid out early, which makes it an asset."
  - id: "35f38688-5f10-4973-9c9b-344d8bc366aa"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why would a bank reviewing BoBo for a loan often prefer accrual-basis statements over cash-basis ones?"
    options:
      - id: higher-profit
        text: "Accrual statements always report a higher profit than cash-basis statements do"
      - id: no-unpaid
        text: "Accrual statements remove expenses that have not been paid yet"
      - id: fair-months
        text: "Accrual statements put revenue in the period earned, so months compare fairly"
    correctOptionIds: [fair-months]
    explanation: "Accrual statements record revenue and expenses when the activity happens, so a steady business looks steady month after month. Cash statements can swing wildly with the timing of payments, and accrual is not always higher, since it adds unpaid expenses that cash basis ignores."
  - id: "7831250b-f93b-4f70-96de-d1e9e4b96eb0"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo delivers an $800 logo on December 28, invoices it the same day, and is paid January 10. What does the accrual-basis picture show at December 31?"
    options:
      - id: no-revenue
        text: "No December revenue, because the $800 is only a receivable until paid"
      - id: dec-revenue
        text: "$800 of December revenue and an $800 receivable on the balance sheet"
      - id: jan-revenue
        text: "$800 of January revenue, because the cash arrives on January 10"
    correctOptionIds: [dec-revenue]
    explanation: "The logo was delivered in December, so the revenue is earned in December, and the unpaid invoice sits on the balance sheet as Accounts Receivable. Treating the receivable as a reason to delay revenue is tempting, but a receivable exists precisely because revenue was earned before the cash."
  - id: "f95f8eb4-c241-4752-96ac-cca8e954e2ca"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two of these accounts are assets on BoBo's December 31 balance sheet? Select every correct answer."
    options:
      - id: prepaid-insurance
        text: "Prepaid Insurance, the unused part of a policy already paid for"
      - id: unearned
        text: "Customer Deposits / Unearned Revenue (2050), cash received early"
      - id: accrued-revenue
        text: "Accrued Revenue, work finished but not yet billed to the client"
      - id: accrued-expenses
        text: "Accrued Expenses (2060), costs incurred but not yet billed by vendors"
    correctOptionIds: [prepaid-insurance, accrued-revenue]
    explanation: "Prepaid Insurance and Accrued Revenue are things BoBo has a right to, so they are assets. Customer Deposits / Unearned Revenue and Accrued Expenses are obligations BoBo owes, so they are liabilities, and the cash-in or cost wording makes it easy to confuse the two groups."
  - id: "63f814f5-8fa8-4651-81fc-6c7a079c31f4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two December events need an adjusting entry on December 31 under accrual accounting? Select every correct answer."
    options:
      - id: adobe
        text: "Adobe charged BoBo's card $80 on December 22 for December software"
      - id: contractor
        text: "A contractor worked December 26 to 31 and has not yet sent an invoice"
      - id: clientb
        text: "ClientB paid on December 29 an invoice that was issued on December 8"
      - id: seo-audit
        text: "BoBo finished an SEO audit on December 28 and will invoice on January 2"
    correctOptionIds: [contractor, seo-audit]
    explanation: "The unbilled contractor work needs an expense accrual and the unbilled audit needs a revenue accrual, because both activities happened in December. The Adobe charge is already recorded in the right month, and ClientB's payment is an ordinary receipt that clears an existing receivable."
  - id: "7e8d4ce9-a5ff-4edc-8545-9f7879ae0a69"
    revision: 1
    status: active
    type: true-false
    prompt: "A $12,000 retainer is paid in January and fully delivered by December. Cash basis and accrual basis both report $12,000 of revenue for the year and differ only in which months get it."
    answer: true
    explanation: "Over the full life of the contract, both methods record the same $12,000, so the difference is timing. Cash basis puts it all in January, while accrual spreads $1,000 across the 12 months in which the work is performed."
  - id: "c102db83-5b61-420f-b354-3fda97483285"
    revision: 1
    status: active
    type: true-false
    prompt: "Accounts Payable is an expense, because it records money BoBo is paying out."
    answer: false
    explanation: "Accounts Payable is a liability on the balance sheet that shows what BoBo owes vendors for bills already received. The expense sits on the income statement and is recorded when the cost is incurred, which can be a different month from when the bill is paid."
  - id: "9ad851f3-909e-48e4-86c7-eb51c1d5eea6"
    revision: 1
    status: active
    type: free-recall
    prompt: "Bo says, \"We got $12,000 from BigClient in January, so we made twelve grand this month!\" In your own words, explain why that is wrong and what BoBo records instead."
    sampleAnswer: "The $12,000 is cash, not January profit. BoBo has only delivered one month of a 12-month retainer, so it still owes 11 months of service. On receipt it debits Cash and credits Customer Deposits / Unearned Revenue (2050) for $12,000, then each month-end it debits that liability and credits Service Revenue for $1,000. Accrual accounting matches revenue to the month the work is done, so January shows $1,000 of revenue and the balance stays a liability."
    explanation: "A strong answer separates cash movement from earning, names the liability, and gives the monthly $1,000 recognition entry. Using the gym membership or a similar analogy shows you can explain the idea to a non-accountant."
  - id: "eaa18aad-4b07-4626-9f48-8fca4bdc0fb9"
    revision: 1
    status: active
    type: free-recall
    prompt: "A customer pays $5,000 on December 1 for a 5-month service starting that day. Write the December 1 entry and the December 31 adjusting entry, and say why each is made."
    sampleAnswer: "On December 1, debit Cash $5,000 and credit Customer Deposits / Unearned Revenue (2050) $5,000, because BoBo has been paid but still owes five months of service. On December 31, debit Customer Deposits / Unearned Revenue (2050) $1,000 and credit Service Revenue $1,000, because one of the five months has been delivered. The remaining $4,000 stays a liability until the work is done."
    explanation: "The key ideas are that the receipt creates a liability instead of revenue and that each month of delivery moves one fifth, $1,000, into revenue. Crediting the full $5,000 to revenue on December 1 is the common error this question is designed to catch."
```

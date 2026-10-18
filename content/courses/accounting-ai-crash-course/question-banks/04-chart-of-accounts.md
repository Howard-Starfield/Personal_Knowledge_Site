---
id: "94cb1c13-ca14-4a9c-9458-b519814d3690"
title: "Chart of Accounts and Account Classification Question Bank"
description: "Practice questions for Chart of Accounts and Account Classification."
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
  - id: "cbb75348-c00c-4282-8892-7eb196164044"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo buys a $1,800 laptop for Priya. Assume BoBo's policy capitalizes purchases over $1,000. Which account is correct?"
    options:
      - id: supplies
        text: "6310 Office Supplies, expensed in the month it is bought"
      - id: equipment
        text: "1500 Computer Equipment, a long-term depreciable asset"
      - id: misc
        text: "6910 Miscellaneous Expense, because it is a one-off item"
      - id: prepaid
        text: "1200 Prepaid Software, because the laptop runs the tools"
    correctOptionIds: [equipment]
    explanation: "The laptop will be useful for more than a year and costs more than the capitalization threshold, so it is recorded as Computer Equipment (1500) and depreciated over time. Coding it to Office Supplies is tempting because the purchase is routine, but it would overstate expenses and understate assets."
  - id: "be9199d6-85ca-4cbd-a078-7124d3cf663b"
    revision: 1
    status: active
    type: single-choice
    prompt: "On January 2 BoBo pays $1,200 up front for a hypothetical annual software plan. Which account takes the debit at purchase?"
    options:
      - id: expense-now
        text: "6130 Software Subscriptions – Accounting, for the full $1,200"
      - id: payable
        text: "2010 Accounts Payable, until the year of service is used"
      - id: cash
        text: "1010 Cash – Operating Bank, because the money left there"
      - id: prepaid
        text: "1200 Prepaid Software Subscriptions, released $100 a month"
    correctOptionIds: [prepaid]
    explanation: "The payment buys twelve months of service, so it sits in Prepaid Software Subscriptions (1200) and $100 moves to the expense account each month. Expensing all $1,200 in January overstates January's costs and understates the next eleven months."
  - id: "3a2ec988-c0e1-43c5-b52a-b962342a1539"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $230 wire lands in BoBo's bank with no memo, and nobody recognizes it. Where should it be coded today?"
    options:
      - id: suspense
        text: "1900 Suspense Account, to be investigated and cleared"
      - id: revenue
        text: "4040 Service Revenue – Subscriptions, as probable income"
      - id: capital
        text: "3010 Owner Capital Contributions, as probably Bo's money"
      - id: undeposited
        text: "1300 Undeposited Funds, as a routine payout in transit"
    correctOptionIds: [suspense]
    explanation: "An unidentified receipt belongs in Suspense (1900) until someone finds out what it is, and then it is reclassified before month-end close. Treating it as revenue is tempting, but an unknown deposit must never be assumed to be income. Undeposited Funds is for known, expected payments."
  - id: "a7700ae2-9c7a-469b-ac86-6d5b8bfe4adc"
    revision: 1
    status: active
    type: single-choice
    prompt: "Maya Chen, the virtual assistant, invoices $150 for administrative support. Jordan Lee's invoice covers editing a client's video. Which account takes Maya's $150?"
    options:
      - id: direct
        text: "5010 Contractor Costs – Direct, because she is a contractor"
      - id: supplies
        text: "6310 Office Supplies, because it is low-value overhead cost"
      - id: indirect
        text: "6210 Contractor Costs – Indirect (Admin), as admin support"
      - id: cpa
        text: "6520 Professional Fees – Accounting, as accounting-related work"
    correctOptionIds: [indirect]
    explanation: "Maya supports the business but does not work on a billable client deliverable, so her cost is an operating expense in 6210. Jordan's editing is tied to a sold project and goes to 5010 in COGS. Coding both to one contractor account would blur direct and indirect cost."
  - id: "57976459-bd6e-487a-9fe3-56b018b931b5"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo starts running TikTok ads and wants a new account between 6020 Google Ads and 6030 Marketing – Other. What makes adding 6025 easy?"
    options:
      - id: auto
        text: "The software renumbers every account automatically on insert"
      - id: repeat
        text: "Numbers can repeat because the names identify each account"
      - id: anything
        text: "New accounts may take any number, since order has no meaning"
      - id: gaps
        text: "The chart was numbered in tens, leaving gaps for new accounts"
    correctOptionIds: [gaps]
    explanation: "Numbering in increments of ten leaves room to insert accounts such as 6025 without renumbering existing codes, which would break reports and vendor mappings. Account numbers must stay unique and in the right range, so any-number and repeated-number practices would scramble the ranges that tell you the account type."
  - id: "ed79d236-b9d0-4843-86d9-87dccec6d872"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $1,000 Stripe payout arrives in BoBo's operating bank account. Which entry records the move?"
    options:
      - id: payout
        text: "Debit 1010 Cash – Operating Bank; credit 1030 Cash – Stripe Available"
      - id: revenue
        text: "Debit 1010 Cash – Operating Bank; credit 4040 Service Revenue – Subscriptions"
      - id: reversed
        text: "Debit 1030 Cash – Stripe Available; credit 1010 Cash – Operating Bank"
      - id: fees
        text: "Debit 1010 Cash – Operating Bank; credit 5030 Stripe Processing Fees"
    correctOptionIds: [payout]
    explanation: "A payout moves money between two cash accounts, so the bank account increases and the Stripe balance decreases and total cash does not change. Crediting revenue would count the same sale a second time, because the sale was already recorded when the customer paid."
  - id: "01234561-d3f8-457b-893a-c1216c9bc24f"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these accounts on BoBo's chart are contra accounts? Select every correct answer."
    options:
      - id: accum-dep
        text: "1590 Accumulated Depreciation, which offsets equipment"
      - id: receivable
        text: "1100 Accounts Receivable, which carries a credit balance"
      - id: refunds
        text: "4900 Refunds & Allowances, which offsets Service Revenue"
      - id: payable
        text: "2010 Accounts Payable, which offsets Accounts Receivable"
      - id: draws
        text: "3020 Owner Draws, which offsets Owner Capital Contributions"
    correctOptionIds: [accum-dep, refunds, draws]
    explanation: "A contra account is paired with a parent and carries the opposite normal balance, so Accumulated Depreciation, Refunds & Allowances and Owner Draws all qualify. Accounts Receivable is tempting because customers owe money, but it is an ordinary asset with a debit balance, and Accounts Payable is a liability, not an offset to receivables."
  - id: "97fe963f-311c-48cc-bfe1-026b040d530f"
    revision: 1
    status: active
    type: multiple-select
    prompt: "BoBo's April report shows revenue of $50,000 because $1,800 of Stripe fees were netted out before posting. Which statements are correct? Select every correct answer."
    options:
      - id: net-fine
        text: "The report is fine because net cash is the real top line"
      - id: gross
        text: "Gross revenue should be $51,800 instead of $50,000"
      - id: understated
        text: "The reported revenue is understated by $1,800"
      - id: refunds
        text: "The $1,800 belongs in 4900 Refunds & Allowances"
      - id: fee-account
        text: "The $1,800 belongs in 5030 Stripe Processing Fees"
    correctOptionIds: [gross, understated, fee-account]
    explanation: "Customers paid $51,800, so revenue is recorded gross and the processing fees are posted separately to 5030. Netting hides both the true top line and the cost of using Stripe. Fees are tempting to treat as refunds, but no customer received money back, so Refunds & Allowances is the wrong account."
  - id: "8e8ed1c6-44a8-4ad2-95cd-8ad1050a28ba"
    revision: 1
    status: active
    type: true-false
    prompt: "A $4,700 balance that has sat in 1900 Suspense for six months is acceptable as long as the trial balance still balances."
    answer: false
    explanation: "A suspense balance should be investigated and reclassified every month, because balancing only proves the arithmetic. Leaving items parked for months lets real errors hide and is a common audit question."
  - id: "c873a9f6-b7bc-4635-a5f1-a7760bd7d642"
    revision: 1
    status: active
    type: true-false
    prompt: "When Bo moves $2,000 from a personal account to fund BoBo, the credit goes to 3010 Owner Capital Contributions, not to revenue."
    answer: true
    explanation: "Money the owner puts in is an increase in equity, so it is credited to Owner Capital Contributions. Recording it as revenue is tempting because cash went up, but BoBo did not earn it from a customer, and it would overstate income."
  - id: "2ab65d7f-2ee3-45b5-91b3-5b72d7199a89"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain to a friend in your own words what a chart of accounts is and how an account number helps you use it, with one BoBo account as an example."
    sampleAnswer: "A chart of accounts is the numbered list of every general ledger account a business uses to sort its transactions, like labeled folders in a filing cabinet. The first digit tells you the family, so 1000s are assets, 2000s liabilities, 3000s equity, 4000s revenue, 5000s cost of goods sold and 6000s operating expenses. For example, 6010 is Marketing – Facebook Ads, so a 6 tells me it is an operating expense before I read the name. Each side of every entry is coded to one account."
    explanation: "A strong answer defines the chart as the structured list of ledger accounts, explains the number ranges, and uses a concrete BoBo account to show the number telling you the type. The filing-cabinet analogy is optional but helps you explain it to a non-accountant."
  - id: "4f797c51-2945-4770-8dc1-f6d4cce522ea"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain to a teammate why Stripe fees get their own account (5030) instead of being netted inside revenue."
    sampleAnswer: "Revenue should show what customers actually paid, so I record it gross and post the fee separately. That keeps the top line honest. A separate account also lets the owner see exactly what each processor costs, for example Stripe fees compared with PayPal fees, which is information the owner can use to decide where to sell. If the fees are buried inside revenue, both numbers become less useful."
    explanation: "The two key reasons are an accurate gross top line and decision-useful visibility into processing cost by platform. Mentioning a comparison between processors shows you understand why the chart is tailored to the business."
```

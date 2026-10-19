---
id: "2ae6aead-4171-422a-b3fa-3c1867e9a1e5"
title: "Accounts Receivable Workflow Question Bank"
description: "Practice questions for Accounts Receivable Workflow."
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
  - id: "f725a28b-19f9-4f9d-be89-b2ed5c660926"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo finishes a $3,500 project for a client who has 30 days to pay. Which entry records it when the work is complete?"
    options:
      - id: ar-revenue
        text: "Debit Accounts Receivable; credit Service Revenue"
      - id: cash-revenue
        text: "Debit Cash; credit Service Revenue, once the client pays"
      - id: revenue-ar
        text: "Debit Service Revenue; credit Accounts Receivable"
      - id: ar-deferred
        text: "Debit Accounts Receivable; credit Deferred Revenue"
    correctOptionIds: [ar-revenue]
    explanation: "Revenue is recognized when the performance obligation is satisfied, so completing the work creates both revenue and a receivable, the client's promise to pay. Waiting for cash is the cash-basis habit, and it would put the revenue in the wrong period."
  - id: "7c24f3bc-e695-4d3c-a77c-5566452f6e55"
    revision: 1
    status: active
    type: single-choice
    prompt: "At month-end BoBo's AR sub-ledger totals $14,150 across all customers, but the GL Accounts Receivable control account shows $14,200. What should the clerk do?"
    options:
      - id: carry
        text: "Carry the $50 forward, since small gaps are normal in AR"
      - id: plug
        text: "Book the $50 to Bad Debt Expense so the totals agree"
      - id: investigate
        text: "Find the $50 difference, since the two must reconcile"
      - id: trust-gl
        text: "Adjust the sub-ledger to match the GL without review"
    correctOptionIds: [investigate]
    explanation: "The control account in the GL has to equal the sum of the customer-level sub-ledger, so any difference is an error to trace, not a rounding habit. Forcing the totals together hides the real problem, such as a payment posted to the wrong invoice."
  - id: "11492e93-cf24-459c-a298-7c683e2b0ba0"
    revision: 1
    status: active
    type: single-choice
    prompt: "A client owes $3,500. Stripe deposits $3,395 after a $105 fee. How is the $105 recorded?"
    options:
      - id: cut-revenue
        text: "Debit Service Revenue $105, which lowers reported revenue"
      - id: leave-open
        text: "Leave $105 open in Accounts Receivable until the client pays it"
      - id: credit-memo
        text: "Issue a $105 credit memo to the client for the fee"
      - id: fee-expense
        text: "Debit Merchant Processing Fees $105, an operating expense"
    correctOptionIds: [fee-expense]
    explanation: "The client owed $3,500, so Cash is debited $3,395, the fee goes to an expense account, and AR is credited the full $3,500. Reducing revenue is tempting because the fee shrinks the deposit, but it understates gross revenue and distorts margins."
  - id: "cc180043-4b55-48d2-9555-253cf615cded"
    revision: 1
    status: active
    type: single-choice
    prompt: "An invoice for $1,200 includes a $400 copywriting line the client disputes, and a manager approves removing it. What is the entry and the new balance?"
    options:
      - id: bad-debt
        text: "Debit Bad Debt Expense $400; credit AR $400; balance $800"
      - id: credit-memo
        text: "Debit Sales Returns & Allowances $400; credit AR $400; balance $800"
      - id: reverse
        text: "Debit AR $400; credit Sales Returns & Allowances $400; balance $1,600"
      - id: cash-out
        text: "Debit Sales Returns & Allowances $400; credit Cash $400; balance $1,200"
    correctOptionIds: [credit-memo]
    explanation: "A credit memo reduces net revenue through a contra-revenue account and reduces the open AR balance, with no cash moving. Bad Debt Expense is for customers who cannot pay, whereas this client simply should not have been billed for the line."
  - id: "dd2e431c-6e88-4547-b5e4-e23c22e706d1"
    revision: 1
    status: active
    type: single-choice
    prompt: "Acme wires $2,000 and its remittance email says the money is for INV-0142. The oldest open Acme invoice is INV-0050. How should the clerk apply the payment?"
    options:
      - id: oldest-first
        text: "Apply it to INV-0050, because the oldest invoice is most overdue"
      - id: split
        text: "Split it evenly across every open Acme invoice to be fair"
      - id: remittance
        text: "Apply it to INV-0142, exactly as the remittance directs"
      - id: hold
        text: "Hold it as unapplied cash for the quarter-end review"
    correctOptionIds: [remittance]
    explanation: "The remittance advice tells you which invoice the customer meant to pay, and every dollar belongs to one invoice. Paying the oldest invoice instead leaves INV-0142 looking open, so Acme would receive a collection reminder for money it already sent."
  - id: "e8534ccf-c336-4e41-9fd3-80728bf84d50"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo ends a 30-day month with $30,000 in AR after $45,000 of credit sales. What is DSO?"
    options:
      - id: fifteen
        text: "About 15 days, half the days in the period"
      - id: twenty
        text: "About 20 days, two-thirds of the period"
      - id: thirty
        text: "About 30 days, matching the period length"
      - id: forty-five
        text: "About 45 days, from dividing sales by AR"
    correctOptionIds: [twenty]
    explanation: "DSO is ending AR divided by credit sales, times the days in the period: 30,000 / 45,000 x 30 = 20 days. Dividing sales by AR flips the fraction and gives 45, which would wrongly suggest customers pay far slower than BoBo's terms."
  - id: "50504c27-2175-41a9-81aa-17f480fd1524"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo invoiced a client on March 1 with Net 30 terms, so it was due March 31. On April 30 it is still unpaid. Which aging bucket holds it?"
    options:
      - id: current
        text: "The current bucket, since the invoice is under 90 days old"
      - id: thirty-one-sixty
        text: "The 31–60 bucket, counting 60 days from the invoice date"
      - id: sixty-one-ninety
        text: "The 61–90 bucket, since it is more than 60 days old"
      - id: one-thirty
        text: "The 1–30 bucket, counting 30 days past the due date"
    correctOptionIds: [one-thirty]
    explanation: "This chapter ages invoices by days past due, and March 31 to April 30 is 30 days, so the invoice sits in the 1–30 bucket. Counting from the invoice date gives 60 days and an over-alarming bucket, because it ignores the 30 days the client was allowed."
  - id: "7d8e1c77-a28c-4534-a934-60ca99962584"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about the Allowance for Doubtful Accounts are true? Select every correct answer."
    options:
      - id: contra
        text: "It is a contra-asset that reduces AR to net AR"
      - id: booked
        text: "It is raised with a debit to Bad Debt Expense"
      - id: liability
        text: "It is a liability owed to customers who overpay"
      - id: removes
        text: "It removes specific unpaid invoices from the ledger"
    correctOptionIds: [contra, booked]
    explanation: "The allowance is an estimate that sits against AR as a contra-asset, and it is increased by debiting Bad Debt Expense. It does not remove any invoice, which is why a specific write-off is a separate entry."
  - id: "947153d2-0a0c-44cd-8706-8941ca333ead"
    revision: 1
    status: active
    type: multiple-select
    prompt: "BoBo writes off a bankrupt customer's $300 invoice under the allowance method. Which results are true? Select every correct answer."
    options:
      - id: net-same
        text: "Net AR is unchanged by the write-off"
      - id: no-pl
        text: "Bad debt expense is not recorded again"
      - id: profit-down
        text: "Net income falls by $300 at the write-off"
      - id: allow-up
        text: "The allowance balance grows by $300"
    correctOptionIds: [net-same, no-pl]
    explanation: "The write-off debits the allowance and credits AR by the same $300, so gross AR and the allowance both fall and net AR stays put. The expense was already recognized when the allowance was built, so profit does not drop a second time."
  - id: "7225c778-93dc-41ee-b0f7-72ac7e575e93"
    revision: 1
    status: active
    type: true-false
    prompt: "A credit memo and a refund both send cash out of the bank to the customer."
    answer: false
    explanation: "A credit memo only reduces what the customer owes, so no cash moves, while a refund returns cash that was already received. Both make the customer better off, which is why they get confused, but only the refund touches the bank balance."
  - id: "1b184b44-0a50-48a0-b7e2-0093e8474881"
    revision: 1
    status: active
    type: free-recall
    prompt: "At month-end AR is $18,000, the allowance has a $200 credit balance, and the policy is 3% of AR. Give the adjusting entry and show the arithmetic."
    sampleAnswer: "The target allowance is $18,000 x 3% = $540. The allowance already holds $200, so it must rise by $340. The entry is a debit to Bad Debt Expense $340 and a credit to Allowance for Doubtful Accounts $340."
    explanation: "A strong answer tops the allowance up to the target rather than booking the full $540, because $200 is already there. Booking $540 would overstate bad debt expense by the existing balance."
  - id: "10a59077-54c7-46a0-bbb1-aaffb1763886"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, trace a $3,500 invoice from completed work to payment, and explain how an allowance and a later write-off affect profit and net AR."
    sampleAnswer: "When the work is done I debit Accounts Receivable and credit Service Revenue $3,500, then apply the customer's payment to that invoice with a debit to Cash and a credit to AR. To plan for customers who will not pay, I debit Bad Debt Expense and credit the allowance, which lowers profit and net AR in the period of the sale. When one customer is confirmed uncollectible I debit the allowance and credit AR, which leaves profit and net AR unchanged."
    explanation: "A strong answer separates the three moments: the sale creates AR, the allowance estimate hits profit, and the later write-off only moves balances inside the balance sheet. Naming the entries shows you can apply the ideas instead of reciting definitions."
```

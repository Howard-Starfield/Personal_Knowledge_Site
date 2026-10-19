---
id: "fe885f93-e1f9-4d51-b31d-fd8f981ee03c"
title: "Debits and Credits Without Fear Question Bank"
description: "Practice questions for Debits and Credits Without Fear."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

This bank holds the practice questions for the Debits and Credits Without Fear lesson; the answer key is visible because it is a learning aid.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "e528482b-ee68-4ede-85d5-20884a2ef68f"
    revision: 1
    status: active
    type: single-choice
    prompt: "A customer pays BoBo $300 by card through Stripe for a logo pack. Which entry records the sale?"
    options:
      - id: reversed
        text: "Debit Service Revenue $300 and credit Stripe Clearing $300"
      - id: cash-sale
        text: "Debit Stripe Clearing $300 and credit Service Revenue $300"
      - id: on-credit
        text: "Debit Accounts Receivable $300 and credit Service Revenue $300"
      - id: capital
        text: "Debit Stripe Clearing $300 and credit Owner's Capital $300"
    correctOptionIds: [cash-sale]
    explanation: "Stripe Clearing is an asset that grew, so it takes the debit, and revenue is earned, so it takes the credit. The reversed entry is tempting because a credit feels like money coming in, but revenue increases on the credit side and cash on the debit side. Receivable is wrong because the money already arrived."
  - id: "675177d2-0010-49b7-b1c1-815d1ab2d04e"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's March trial balance lists four accounts. Which one normally carries a credit balance?"
    options:
      - id: cash-checking
        text: "Cash in checking"
      - id: ad-expense
        text: "Advertising Expense"
      - id: owner-draws
        text: "Owner Draws account"
      - id: accounts-payable
        text: "Accounts Payable"
    correctOptionIds: [accounts-payable]
    explanation: "Accounts Payable is a liability, and liabilities sit in the CLIC group, so they increase and normally rest on the credit side. Cash is the tempting choice if you think a credit means money arriving, but cash is an asset and normally holds a debit balance. Expenses and drawings are in DEAD and are also debit-balance accounts."
  - id: "10da71f0-9c27-4124-92fb-d38ab2db865c"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo finishes a website refresh and invoices the client $1,200, due in 14 days. What is the entry today?"
    options:
      - id: ar-rev
        text: "Debit Accounts Receivable and credit Service Revenue for $1,200"
      - id: cash-rev
        text: "Debit Cash and credit Service Revenue for $1,200"
      - id: rev-ar
        text: "Debit Service Revenue and credit Accounts Receivable for $1,200 total"
      - id: wait
        text: "Make no entry until the client pays the $1,200 invoice"
    correctOptionIds: [ar-rev]
    explanation: "The work is delivered, so BoBo has earned revenue and gained a right to collect $1,200, which is an asset called Accounts Receivable. Waiting for payment is tempting but BoBo uses the accrual basis, so revenue is recorded when earned, not when cash arrives. Debiting Cash is wrong because no cash has moved yet."
  - id: "57d66922-8124-4087-a09a-4ded366ad9ae"
    revision: 1
    status: active
    type: single-choice
    prompt: "The client from that $1,200 invoice pays into PayPal a week later. What happens to revenue?"
    options:
      - id: rev-up
        text: "Revenue rises by $1,200 because the cash has now arrived"
      - id: rev-down
        text: "Revenue falls by $1,200 as the invoice clears"
      - id: no-change
        text: "Revenue stays put; Cash rises and the receivable falls"
      - id: capital-up
        text: "Revenue stays put; Cash rises and Capital rises"
    correctOptionIds: [no-change]
    explanation: "The sale was already counted on invoice day, so payment only swaps one asset for another: debit Cash - PayPal and credit Accounts Receivable. Raising revenue again is the classic double-count, because cash arriving is not the same event as earning. Capital is only affected by owner funding, not by a customer paying."
  - id: "05bb6c8d-80f1-48f4-af26-50dad4e9885a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Stripe pays BoBo a $300 sale but keeps a $10 fee, so $290 lands in the Stripe balance. Which entry follows the gross method?"
    options:
      - id: net-only
        text: "Debit Stripe Clearing $290; credit Service Revenue $290, netting the fee out"
      - id: gross
        text: "Debit Stripe Clearing $290 and Processing Fees $10; credit Service Revenue $300"
      - id: fee-credit
        text: "Debit Stripe Clearing $300; credit Service Revenue $290 and Processing Fees $10 together"
      - id: unbalanced
        text: "Debit Stripe Clearing $300 and Processing Fees $10; credit Service Revenue $300"
    correctOptionIds: [gross]
    explanation: "Revenue is booked at the full $300 and the $10 fee is its own expense, so debits of $290 plus $10 equal the $300 credit. Netting to $290 looks tidy but hides gross sales and distorts gross margin. The last option debits $310 against a $300 credit, so it cannot balance."
  - id: "8e699dbb-ea26-4abf-b230-92e3cf8a88ca"
    revision: 1
    status: active
    type: single-choice
    prompt: "Bo withdraws $300 from business checking to pay for personal groceries. Which account takes the debit?"
    options:
      - id: office-supplies
        text: "Office Supplies Expense, because cash was spent"
      - id: sales-returns
        text: "Sales Returns, because money left the business"
      - id: contractor
        text: "Contractor Expense, since Bo works for the firm"
      - id: owner-draws
        text: "Owner Draws, an equity account that grows with a debit"
    correctOptionIds: [owner-draws]
    explanation: "A personal withdrawal is the owner taking value out of the business, which belongs in Owner Draws, one of the DEAD accounts that increases with a debit. Coding it to an expense is tempting because the bank balance matches, but it understates profit and mixes personal and business spending."
  - id: "1304c1e0-d309-4379-8889-3f351b5a7580"
    revision: 1
    status: active
    type: single-choice
    prompt: "One journal entry reads Debit Advertising Expense $80 and Credit Cash $170, but the bank shows the ad cost $80. What is the cleanest fix?"
    options:
      - id: fix-credit
        text: "Correct the Cash credit from $170 to $80 and note the bank line"
      - id: debit-cash
        text: "Debit Cash another $90 so the entry balances at $170 each way"
      - id: raise-debit
        text: "Raise the Advertising debit from $80 to $170 to match the credit"
      - id: plug-capital
        text: "Post the $90 gap to Owner's Capital so the books still tie"
    correctOptionIds: [fix-credit]
    explanation: "The source document says $80, so the wrong figure is the $170 credit and correcting it restores balance with evidence behind the change. Raising the expense to $170 forces balance but records an ad cost the bank never charged. Plugging the gap to equity or cash hides a keying error instead of fixing it."
  - id: "8d6e16ba-ec35-4055-94fb-8839cc24ea39"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these accounts increase with a debit? Select every correct answer."
    options:
      - id: equipment
        text: "Equipment (a laptop bought for long-term use)"
      - id: software
        text: "Software Expense (the monthly Canva Pro bill)"
      - id: payable
        text: "Accounts Payable (a bill BoBo has not paid yet)"
      - id: revenue
        text: "Service Revenue (fees earned from BoBo's clients)"
      - id: draws
        text: "Owner Draws (cash Bo takes out personally)"
    correctOptionIds: [equipment, software, draws]
    explanation: "Assets, expenses and drawings are the DEAD group, so a debit increases them. Accounts Payable and Service Revenue are liabilities and income in the CLIC group, which increase with a credit. Revenue is tempting because earning feels like a plus, but a plus on the right side is still a credit."
  - id: "6f27d984-aa17-4601-bd69-14592fa87069"
    revision: 1
    status: active
    type: multiple-select
    prompt: "BoBo refunds a customer $150 through Stripe. Which lines belong in the entry? Select every correct answer."
    options:
      - id: returns-debit
        text: "Debit Sales Returns & Refunds for $150"
      - id: cash-credit
        text: "Credit Cash - Stripe Clearing for $150"
      - id: ad-debit
        text: "Debit Advertising Expense for $150"
      - id: revenue-credit
        text: "Credit Service Revenue for $150"
    correctOptionIds: [returns-debit, cash-credit]
    explanation: "A refund reduces revenue through a contra-revenue account, which has a debit normal balance, while cash leaves Stripe and takes a credit. Crediting Service Revenue is tempting because the customer is involved, but that would increase revenue instead of reducing it. Booking the refund as an expense mixes it with operating costs."
  - id: "2ca63439-4eb6-4e55-b4b2-ce8efea9eb1b"
    revision: 1
    status: active
    type: true-false
    prompt: "Because a debit to Cash increases it, a debit increases every account it touches."
    answer: false
    explanation: "A debit only means the left side of an entry. It increases assets, expenses and drawings, but it decreases liabilities, income and capital, so the effect depends on the account type."
  - id: "2dd9061f-63ac-4030-b0a1-56095a123044"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why debits and credits are directions rather than good or bad. Use DEAD CLIC and one BoBo entry to show why the books stay balanced."
    sampleAnswer: "Debit and credit are labels for the left and right side of an entry, so neither is a reward or a penalty. DEAD CLIC says debits increase Expenses, Assets and Drawings, while credits increase Liabilities, Income and Capital. For example, when BoBo sells a $300 logo pack on Stripe, Stripe Clearing is debited $300 and Service Revenue is credited $300. Total debits equal total credits, so the books stay in balance."
    explanation: "A strong answer says the words only name sides, states the DEAD CLIC groups correctly, and gives a concrete entry with equal totals. Saying that a debit is bad or means money leaving shows the misconception this lesson targets."
  - id: "f5cc9d6b-580b-4b1a-acd1-c76fe9e3f23c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Bo deposits $2,000 of personal savings into the business account and a coworker codes it as Service Revenue. Explain the error and give the correct entry."
    sampleAnswer: "Owner funding is not earned from customers, so it is equity and not revenue. Coding it as revenue would overstate income by $2,000. The correct entry is Debit Cash - Business Checking $2,000 and Credit Owner's Capital $2,000. Equity increases with a credit, and the entry balances."
    explanation: "The key ideas are that revenue must be earned and that owner money is equity, which rises with a credit. Naming the overstated income shows you understand why the mistake matters, not just which account to pick."
```

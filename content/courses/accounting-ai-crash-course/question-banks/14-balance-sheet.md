---
id: "8d80bfec-22d5-4f51-bbf4-7e093796bb51"
title: "Balance Sheet Deep Dive Question Bank"
description: "Practice questions for Balance Sheet Deep Dive."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case and other made-up companies; every figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "a764d12e-1f08-4792-a438-fb0e78f09845"
    revision: 1
    status: active
    type: single-choice
    prompt: "A bank asks BoBo for its financial position at the close of business on the last night of April. Which heading belongs on that statement?"
    options:
      - id: month-ended
        text: "For the Month Ended April 30, 2026"
      - id: as-of
        text: "As of the close on April 30, 2026"
      - id: date-range
        text: "For April 1 through April 30, 2026"
      - id: year-ended
        text: "For the Year Ended April 30, 2026"
    correctOptionIds: [as-of]
    explanation: "A balance sheet is a snapshot of what the company owns, owes and has left for the owners at one moment, so its heading names a single date with \"As of\". \"For the Month Ended\" is tempting because April is the reporting month, but that wording belongs to statements that cover a period, such as the income statement."
  - id: "3d69ebbe-3fc4-4c46-930a-e56acc979adf"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo owes $8,400 on an equipment loan, with $2,400 due within the next 12 months and $6,000 due later. How should the balance sheet show it?"
    options:
      - id: all-current
        text: "All $8,400 as a current liability"
      - id: all-long-term
        text: "All $8,400 as a long-term liability"
      - id: expense-split
        text: "$2,400 as an expense and $6,000 as debt"
      - id: split
        text: "$2,400 current and $6,000 long-term"
    correctOptionIds: [split]
    explanation: "Only the principal due within 12 months is current, so the loan is split into a current portion and a long-term portion. Showing the whole loan as current is tempting because the debt is one contract, but it would shrink working capital and make the company look less able to pay its near-term bills."
  - id: "092e597d-c92f-4ed3-95d4-1385f09d5ea6"
    revision: 1
    status: active
    type: single-choice
    prompt: "A company starts the year with $10,000 of retained earnings, earns $7,000 of net income and records $3,000 of owner draws against retained earnings. What are the ending retained earnings?"
    options:
      - id: correct-14
        text: "$14,000: start plus profit, minus draws"
      - id: draws-ignored
        text: "$17,000: start plus profit, draws ignored"
      - id: draws-added
        text: "$20,000: start plus profit plus draws"
      - id: profit-only
        text: "$7,000: profit alone, ignoring the start"
    correctOptionIds: [correct-14]
    explanation: "Retained earnings roll forward as beginning balance plus net income minus distributions to the owner, which gives $10,000 + $7,000 - $3,000 = $14,000. Ignoring the draws is tempting because draws are not on the income statement, but they still reduce what is left in the business."
  - id: "d640e0a6-0091-4723-9c1a-6727b80b89df"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which accounts belong in the equity section of BoBo's balance sheet? Select every correct answer."
    options:
      - id: owner-capital
        text: "Owner Capital"
      - id: retained-earnings
        text: "Retained Earnings"
      - id: owner-draws
        text: "Owner Draws, shown as a reduction"
      - id: card-payable
        text: "Credit Card Payable"
      - id: accum-depr
        text: "Accumulated Depreciation"
    correctOptionIds: [owner-capital, retained-earnings, owner-draws]
    explanation: "Equity holds what the owner put in, the profit kept in the business, and the draws that reduce both. Accumulated Depreciation is tempting because it carries a credit balance like equity accounts do, but it is a contra-asset that sits with the fixed assets it reduces."
  - id: "d15b3f15-c782-4b8d-bcc1-2b31944db603"
    revision: 1
    status: active
    type: single-choice
    prompt: "A firm has $45,000 of current assets and $30,000 of current liabilities. What are its working capital and current ratio?"
    options:
      - id: ratio-inverted
        text: "Working capital $15,000; current ratio 0.67"
      - id: summed
        text: "Working capital $75,000; current ratio 1.50"
      - id: correct
        text: "Working capital $15,000; ratio 1.50"
      - id: liabilities-only
        text: "Working capital $30,000; current ratio 1.50"
    correctOptionIds: [correct]
    explanation: "Working capital is current assets minus current liabilities, $45,000 - $30,000 = $15,000, and the current ratio divides assets by liabilities, $45,000 / $30,000 = 1.50. Flipping the division gives 0.67, which is tempting because the same two numbers are used, but it measures the wrong direction."
  - id: "c83efa07-09e9-4288-be5e-4b9ef0c18bd1"
    revision: 1
    status: active
    type: single-choice
    prompt: "A shop has $36,000 of current assets, including $18,000 of inventory and $2,000 of prepaids, plus $16,000 of current liabilities. Using this chapter's quick ratio, which pair is right?"
    options:
      - id: swapped
        text: "Current ratio 1.00 and quick ratio 2.25"
      - id: correct
        text: "Current ratio 2.25, quick ratio 1.00"
      - id: inventory-only
        text: "Current ratio 2.25 and quick ratio 1.13"
      - id: no-strip
        text: "Current ratio 2.25 and quick ratio 2.25"
    correctOptionIds: [correct]
    explanation: "The current ratio is $36,000 / $16,000 = 2.25, and this chapter's quick ratio removes inventory and prepaids first: ($36,000 - $18,000 - $2,000) / $16,000 = 1.00. Removing only the inventory gives 1.13, which is tempting but leaves prepaids in even though they cannot be turned into cash to pay bills."
  - id: "566aa97c-bf6b-47fe-8111-9318580aeadf"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's owner contributes a laptop worth $3,000 at the start of the year, and $1,200 of accumulated depreciation builds up on it. How does the laptop appear in assets?"
    options:
      - id: added
        text: "At $4,200, cost plus accumulated depreciation"
      - id: dep-only
        text: "At $1,200, since depreciation replaces the cost"
      - id: liability
        text: "At $3,000, with the $1,200 shown as a liability"
      - id: net-book
        text: "At $3,000 less $1,200, a net book value of $1,800"
    correctOptionIds: [net-book]
    explanation: "Fixed assets show at cost, less accumulated depreciation, which gives a net book value of $1,800. Treating the $1,200 as a liability is tempting because it has a credit balance, but it is a contra-asset that reduces the asset instead of a debt owed to anyone."
  - id: "2e524727-3cc9-41af-bdf0-0db38cbdb7bd"
    revision: 1
    status: active
    type: single-choice
    prompt: "A customer pays BoBo $3,600 today for 12 months of hosting that starts today. Nothing has been delivered yet. How is the receipt recorded?"
    options:
      - id: unearned
        text: "Debit Cash, credit Unearned Revenue, a liability"
      - id: revenue
        text: "Debit Cash, credit Revenue because the cash has arrived"
      - id: receivable
        text: "Debit Accounts Receivable, credit Revenue for the full year"
      - id: capital
        text: "Debit Cash, credit Owner Capital as a new contribution"
    correctOptionIds: [unearned]
    explanation: "BoBo has the cash but still owes twelve months of service, so the credit goes to Customer Deposits / Unearned Revenue, a current liability that turns into revenue as hosting is delivered. Crediting Revenue is tempting because cash arrived, but revenue is recognized when the service is delivered, not when it is paid for."
  - id: "85c8f856-7d13-487c-b7b3-7e4df3e5738a"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A draft balance sheet shows total assets of $50,000 and total liabilities plus equity of $49,800. Which first moves are sensible? Select every correct answer."
    options:
      - id: foot-tb
        text: "Pull the trial balance and check that it foots"
      - id: recent-entries
        text: "Review recent journal entries to unusual accounts"
      - id: hidden-account
        text: "Check whether a filter hid an uncategorized account"
      - id: round-away
        text: "Treat $200 as rounding because it is under 1%"
      - id: plug-re
        text: "Plug the $200 difference into Retained Earnings"
    correctOptionIds: [foot-tb, recent-entries, hidden-account]
    explanation: "The books must balance exactly, so you trace the cause: start with whether the trial balance foots, then look for one-sided or oddly coded entries and for accounts the report missed. Plugging the difference into Retained Earnings is tempting because it makes the totals match, but it hides the error instead of finding it."
  - id: "f6b5145a-7bda-4111-9ad1-7243d24e7628"
    revision: 1
    status: active
    type: true-false
    prompt: "Because a service firm like BoBo holds no inventory, its quick ratio under this chapter's formula always equals its current ratio."
    answer: false
    explanation: "This chapter's quick ratio removes both inventory and prepaids, so a firm with no inventory but $3,600 of prepaids still gets a quick ratio below its current ratio. BoBo's figures are 2.35 versus 2.60, close but not equal."
  - id: "256c3a72-d41b-48a0-9001-6b82b5e0abdb"
    revision: 1
    status: active
    type: free-recall
    prompt: "A friend reports $50,000 of net income for the year but has almost no cash. Use the balance sheet to explain how that can happen."
    sampleAnswer: "Net income comes from the income statement, while cash is one asset on the balance sheet. The profit can sit in other assets, for example accounts receivable if customers have not paid yet, or in equipment bought with the cash. It can also have gone to pay down loans or to owner draws. The income statement shows what was earned and the balance sheet shows where it went."
    explanation: "A strong answer separates earning from holding cash and names at least two balance sheet destinations, such as growing receivables, purchases of fixed assets, debt repayment or draws. It should show that profit and cash move through different statements."
  - id: "6e846d5f-cd06-4343-9a46-9b25c8eb439a"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how you would build a classified balance sheet from a trial balance and prove it is right, using BoBo as your example."
    sampleAnswer: "I start with the adjusted trial balance and classify each account: cash, receivables and prepaids are current assets, the equipment is a fixed asset reduced by accumulated depreciation, and payables, unearned revenue and the next 12 months of the loan are current liabilities. The rest of the loan is long-term. Equity is owner capital plus retained earnings, which includes the year's net income less draws. Then I total assets and total liabilities plus equity, confirm they match to the dollar, and compute working capital and the current ratio before sending it."
    explanation: "Look for four ideas: classification by the 12-month line, the contra-asset treatment of accumulated depreciation, net income and draws flowing through retained earnings, and the proof that assets equal liabilities plus equity. A concrete BoBo example shows you can apply the process instead of reciting it."
```

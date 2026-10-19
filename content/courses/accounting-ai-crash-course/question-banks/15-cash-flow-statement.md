---
id: "5e69fb42-e1ee-4eb6-a5c8-bdef41a59291"
title: "Cash Flow Statement Basics Question Bank"
description: "Practice questions for Cash Flow Statement Basics."
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
  - id: "3e87dd0d-a0bb-4b39-b2d3-e1698d2b4266"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's accounts receivable grows by $5,000 during the month while net income stays the same. What is the effect on operating cash flow?"
    options:
      - id: rises
        text: "Operating cash flow rises by $5,000"
      - id: falls
        text: "Operating cash flow falls by $5,000"
      - id: investing
        text: "Investing cash flow falls by $5,000"
      - id: unchanged
        text: "Operating cash flow is unchanged"
    correctOptionIds: [falls]
    explanation: "A larger receivable means BoBo booked revenue that customers have not paid yet, so net income overstates the cash collected and the adjustment is a subtraction. Saying it is unchanged is tempting because net income did not move, but net income is the accrual figure the statement starts from and then corrects."
  - id: "9036b991-f355-4f25-84f0-e9aef25a6f1e"
    revision: 1
    status: active
    type: single-choice
    prompt: "A small firm reports net income of $5,000, depreciation of $1,000, a $3,000 rise in AR and a $500 rise in AP. What is its operating cash flow under the indirect method?"
    options:
      - id: ocf-1500
        text: "$1,500 of operating cash flow"
      - id: ocf-2500
        text: "$2,500 of operating cash flow"
      - id: ocf-6500
        text: "$6,500 of operating cash flow"
      - id: ocf-3500
        text: "$3,500 operating cash flow"
    correctOptionIds: [ocf-3500]
    explanation: "Start at 5,000, add back 1,000 of depreciation, subtract the 3,000 AR increase and add the 500 AP increase to reach 3,500. The 6,500 answer is tempting because it skips the AR change, which treats uncollected sales as if they were cash."
  - id: "05a13665-a8c8-4c15-b640-3b9082c858da"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under US GAAP, BoBo pays $1,200 on a loan, made up of $1,000 principal and $200 interest. How do the two parts appear in the cash flow statement?"
    options:
      - id: split
        text: "Principal is a financing outflow; interest is already in net income"
      - id: swapped
        text: "Principal is an operating outflow; interest is a financing outflow"
      - id: all-financing
        text: "Both parts are financing outflows, $1,200 in total"
      - id: principal-investing
        text: "Principal is an investing outflow; interest is already in net income"
    correctOptionIds: [split]
    explanation: "Interest is an expense, so it already reduced net income and sits in the operating section, while repaying principal is a return of borrowed money and belongs in financing. Putting the whole payment in financing is tempting because it is one bank payment, but that would double count the interest."
  - id: "2369a072-7265-4e94-bd9a-5b5569f4829c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $4,200 editing workstation was coded to Office Supplies expense. How does that distort the cash flow statement?"
    options:
      - id: unaffected
        text: "No cash flow line changes because only the balance sheet is wrong"
      - id: doubled
        text: "Operating outflow is understated and the investing outflow is doubled"
      - id: operating
        text: "Operating outflow is overstated and the investing outflow is missing"
      - id: income-over
        text: "Net income is overstated and operating cash flow is unaffected"
    correctOptionIds: [operating]
    explanation: "Expensing the purchase lowers net income, so the cash outflow lands in operating activities instead of investing, and the investing section shows nothing. The claim that no cash flow line changes is tempting because the cash left either way, but the section it is reported in is wrong."
  - id: "65f5ee68-108b-4246-b63a-c1bd93e83db0"
    revision: 1
    status: active
    type: single-choice
    prompt: "A client prepays BoBo $600 in May for work that will be done in June, and the amount is recorded in Customer Deposits / Unearned Revenue (2050). What is the effect on May operating cash flow?"
    options:
      - id: subtract
        text: "It subtracts $600, because the revenue is not yet earned"
      - id: add
        text: "It adds $600, because the cash came in before the work"
      - id: none
        text: "It has no effect, because no revenue has been recognized yet"
      - id: financing
        text: "It adds $600 to financing, because the client funded BoBo"
    correctOptionIds: [add]
    explanation: "The cash is in the bank but net income does not include it yet, so the increase in the 2050 liability is added in the operating section. Treating it as no effect is tempting because no revenue was recorded, but the statement reconciles net income to cash, and cash did arrive."
  - id: "422c9135-472a-489a-b1a6-07d5171d615d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The controller wants the cash flow statement at 9 a.m., but the bank reconciliation is not finished. What is the right move?"
    options:
      - id: publish
        text: "Publish it from the book balance and correct it later"
      - id: estimate
        text: "Estimate ending cash from last month's bank balance"
      - id: caveat
        text: "Send it with a note that cash is probably right"
      - id: wait
        text: "Tell the controller it waits for reconciled cash"
    correctOptionIds: [wait]
    explanation: "Ending cash on the statement must tie to reconciled balance sheet cash, so a draft built before the reconciliation can be wrong without anyone noticing. Sending it with a caveat is tempting because it meets the deadline, but a statement that is probably right is still an unverified statement."
  - id: "e301510f-2006-4f62-aa02-ffe1b81e2d38"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Under the indirect method, which of these changes add to operating cash flow? Select every correct answer."
    options:
      - id: ar-down
        text: "A decrease in accounts receivable"
      - id: ap-up
        text: "An increase in accounts payable"
      - id: prepaid-up
        text: "An increase in prepaid expenses"
      - id: deposits-down
        text: "A decrease in customer deposits"
      - id: depreciation
        text: "A depreciation charge in net income"
    correctOptionIds: [ar-down, ap-up, depreciation]
    explanation: "A falling receivable means old invoices were collected, a rising payable means expenses were booked but not yet paid, and depreciation reduced net income without any cash leaving. Prepaid increases and customer deposit decreases are tempting because they sound like adjustments, but each one means cash went out, so each is subtracted."
  - id: "3f096445-83c1-4989-b6ed-61e4d24298be"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of BoBo's May transactions belong in the financing section? Select every correct answer."
    options:
      - id: draw
        text: "Owner draw of $6,000 for personal bills"
      - id: contribution
        text: "Owner contribution of $8,200 from savings"
      - id: workstation
        text: "Workstation purchase of $4,200 in cash"
      - id: ap-paydown
        text: "Paying down $1,200 of old vendor bills"
      - id: adobe
        text: "Prepaying $1,800 for Adobe Creative Cloud"
    correctOptionIds: [draw, contribution]
    explanation: "Money moving between the owner and the business is financing, so the draw is an outflow and the contribution is an inflow. Paying old vendor bills is tempting because it feels like repaying someone, but accounts payable is part of day-to-day operations and shows up as a working capital change."
  - id: "a308d372-adb3-4f11-a78b-b0755e0260d3"
    revision: 1
    status: active
    type: true-false
    prompt: "Because depreciation reduces net income, it also reduces the cash in BoBo's bank account in the month it is recorded."
    answer: false
    explanation: "Depreciation spreads the cost of equipment over its useful life, but the cash left the bank when BoBo bought the equipment. That is why the indirect method adds depreciation back to net income instead of treating it as a payment."
  - id: "4cccf88c-a826-4aae-b493-a9ab19fa2944"
    revision: 1
    status: active
    type: true-false
    prompt: "Under US GAAP, interest paid on a loan is already inside net income, so it is reported in operating activities, while the principal portion of the payment is reported in financing."
    answer: true
    explanation: "Interest is an expense that flows through the income statement, so it reaches the statement of cash flows through net income. Principal never touches the income statement, which is why it needs its own line in financing."
  - id: "d4afcadc-98a9-4112-8403-f43e59bcf977"
    revision: 1
    status: active
    type: free-recall
    prompt: "A consulting firm earned net income of $3,800 in April, with $800 of depreciation, AR up $6,000, prepaid insurance down $600 and AP up $1,500. Work out its net cash from operating activities and show each step."
    sampleAnswer: "Start with net income of 3,800. Add back depreciation of 800, because it is non-cash. Subtract the 6,000 AR increase, because those sales are not collected yet. Add the 600 prepaid decrease, because less cash went to prepaying expenses than was expensed. Add the 1,500 AP increase, because those bills are not paid yet. The total is 3,800 + 800 - 6,000 + 600 + 1,500 = 700 of net cash from operating activities."
    explanation: "A strong answer starts with net income, adds the non-cash charge and then gives each working capital line the right sign with a reason. The total of 700 is much lower than net income because the large AR increase absorbed most of the profit."
  - id: "f5f40e88-93a2-449f-b2fb-1f7dde4a3b31"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why a company can be profitable and still run short on cash, using BoBo's May numbers."
    sampleAnswer: "Net income is an accrual figure, so it counts revenue when earned and expenses when incurred, not when cash moves. In May BoBo earned 12,400, but customers still owed 9,800 more, Bo prepaid 1,800 for software, paid down 1,200 of vendor bills and bought a 4,200 workstation. Bo also took a 6,000 draw. Those timing items, investing and owner activity were only partly offset by an 8,200 contribution and a 600 customer prepayment, so cash fell 950 even though the month was profitable."
    explanation: "A strong answer separates accrual profit from cash and names specific causes such as uncollected receivables, prepaid costs, equipment and owner draws. It also points out that these are timing and classification items, not losses."
```

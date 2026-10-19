---
id: "d70428d6-d103-40a8-9f3e-bd46a89efdbb"
title: "Cash Flow Statement Basics"
description: "Learn to explain why profit is not cash and to build a simple indirect-method cash flow statement that ties to the balance sheet."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 15
estimatedMinutes: 40
---

## Why this matters

Owners and lenders often ask the same question: "We made a profit, so why is the bank balance lower?" The cash flow statement is the report that answers it. A bank deciding on a line of credit pays close attention to cash from operations, and a business that books sales it never collects can fail while showing profit. In this lesson you follow BoBo Digital Services LLC (a fictional company, all figures are sample data) through a month that looked great on paper and drained the bank account.

## What you'll be able to do

- Explain why net income and cash differ, naming at least three causes.
- Classify a transaction as operating, investing or financing.
- Calculate operating cash flow from net income using the indirect method.
- Diagnose a cash flow statement that does not tie to the balance sheet.
- Build a complete indirect-method statement from two balance sheets and an income statement.

## Before you start

Answer these from memory before reading on. Previous lesson: [[courses/accounting-ai-crash-course/lessons/14-balance-sheet|Previous lesson]].

- What are the three parts of the accounting equation, and which statement lists them?
- What is the difference between recording revenue when it is earned and recording it when cash arrives?
- What does depreciation do to an asset's value on the balance sheet, and does it involve a payment?

## Step 1 — Three buckets for every dollar of cash

**In plain words.** The statement of cash flows explains the change in the cash balance between two dates. It sorts every cash movement into one of three buckets.

- **Operating:** cash from running the business, such as customer receipts, vendor payments, payroll and rent.
- **Investing:** cash spent on or received from long-term assets, such as buying equipment or selling a vehicle.
- **Financing:** cash moving between the business and its owners or lenders, such as loan proceeds, loan principal repayments, owner contributions and owner draws.

**Analogy.** Think of a household budget split into groceries, big purchases and money borrowed or lent. The total cash change is the same, but the buckets show whether the household is living within its means.

**The rule.** Net change in cash equals operating plus investing plus financing. A handy order to remember is O, I, F.

**Worked example.** BoBo's cash fell from $14,300 on May 1 to $13,350 on May 31, a change of negative $950. The statement has to explain that $950 completely, with every dollar assigned to one of the three buckets.

> [!warning] Common mistake
> Sorting by how a payment feels instead of what it is. Paying down a vendor bill feels like "paying someone back", but trade payables are an operating item. Financing is reserved for owners and lenders.

## Step 2 — Why profit is not cash, and the indirect method

**In plain words.** Net income is an accrual number. It records revenue when it is earned and expenses when they are incurred, not when cash moves. The indirect method starts from net income and corrects it back to cash.

**Analogy.** Net income is the score the referee announces, and cash is what is actually in the till. The indirect method is the reconciliation between the two.

**The rules.**

1. Start with net income.
2. Add back non-cash expenses such as depreciation, because they reduced profit without any cash leaving.
3. Adjust for working capital changes:
   - Accounts receivable up: subtract. Accounts receivable down: add.
   - Prepaid expenses up: subtract. Prepaid expenses down: add.
   - Accounts payable up: add. Accounts payable down: subtract.
   - Customer deposits / unearned revenue up: add. Customer deposits / unearned revenue down: subtract.

**Worked example (BoBo, May).** Net income was $12,400.

| Line                                                 |    Amount | Why                              |
| ---------------------------------------------------- | --------: | -------------------------------- |
| Net income                                           |    12,400 | Starting point                   |
| Depreciation                                         |      +850 | Non-cash expense                 |
| AR increase                                          |    -9,800 | Sales not yet collected          |
| Prepaid expenses increase                            |    -1,800 | Adobe subscription paid up front |
| AP decrease                                          |    -1,200 | Old vendor bills paid down       |
| Customer deposits / unearned revenue (2050) increase |      +600 | Client prepaid June work         |
| **Operating cash flow**                              | **1,050** | Far below the profit             |

A quick memory aid: assets that go up use cash, liabilities that go up hold on to cash.

> [!warning] Common mistake
> Treating depreciation as a cash outflow. The cash left when the equipment was bought. Depreciation is only the gradual expensing of that cost, so it is added back, never paid.

```knowledge-quiz
schemaVersion: 1
quizId: "a0aa856d-5710-43d3-ac9a-1516d0499db3"
title: "Checkpoint: profit versus cash"
questionBankId: "5e69fb42-e1ee-4eb6-a5c8-bdef41a59291"
questionIds:
  - "a308d372-adb3-4f11-a78b-b0755e0260d3"
  - "65f5ee68-108b-4246-b63a-c1bd93e83db0"
```

## Step 3 — Investing and financing

**In plain words.** After operating activities, the statement lists what BoBo did with long-term assets and how it was funded.

**Analogy.** Buying a workstation is like buying a house rather than paying the electric bill: it is a long-term purchase, so it gets its own section. Taking money out as an owner is like moving money between your own pockets and the business, which is why it is financing.

**The rules.**

- A purchase that lands in a fixed asset account is investing, shown as an outflow. Selling such an asset is an inflow.
- Owner contributions are financing inflows and owner draws are financing outflows.
- A loan payment has two parts. Under US GAAP, interest paid is an expense, so it is already inside net income and stays in operating. Principal is repaid borrowing, so it is a financing outflow.

**Worked example (BoBo, May).**

| Section         | Item                            | Amount |
| --------------- | ------------------------------- | -----: |
| Investing       | Purchase of editing workstation | -4,200 |
| Financing       | Owner contribution              | +8,200 |
| Financing       | Owner draw                      | -6,000 |
| Financing total |                                 | +2,200 |

For a loan payment of $1,200 made up of $1,000 principal and $200 interest, only the $1,000 goes in financing. The $200 is already reflected in net income.

> [!warning] Common mistake
> Putting equipment in operating. If a purchase belongs on the balance sheet as a long-term asset, it is investing. Coding it to an expense account distorts both net income and two sections of the statement.

```knowledge-quiz
schemaVersion: 1
quizId: "96298f79-c7b5-424b-b6df-4933f66b6b8f"
title: "Checkpoint: investing and financing"
questionBankId: "5e69fb42-e1ee-4eb6-a5c8-bdef41a59291"
questionIds:
  - "05a13665-a8c8-4c15-b640-3b9082c858da"
  - "3f096445-83c1-4989-b6ed-61e4d24298be"
```

## Step 4 — Assemble the statement and tie it out

**In plain words.** Add the three sections, then add the beginning cash balance. The result must equal cash on the balance sheet.

**Analogy.** It is like a bank reconciliation for the whole business: if the totals do not agree, something is missing, miscoded or misposted.

**The rule.** Beginning cash plus net change in cash equals ending cash, and ending cash must tie to the balance sheet. Also run an equity roll-forward: beginning equity plus net income plus contributions minus draws equals ending equity.

**Worked example (BoBo, May 2026).**

```
CASH FLOWS FROM OPERATING ACTIVITIES
  Net income                                     12,400
  Depreciation                                      850
  Increase in accounts receivable                (9,800)
  Increase in prepaid expenses                   (1,800)
  Decrease in accounts payable                   (1,200)
  Increase in customer deposits / unearned rev.     600
  Net cash provided by operating activities       1,050

CASH FLOWS FROM INVESTING ACTIVITIES
  Purchase of editing workstation                (4,200)
  Net cash used in investing activities          (4,200)

CASH FLOWS FROM FINANCING ACTIVITIES
  Owner contribution                              8,200
  Owner draw                                     (6,000)
  Net cash provided by financing activities       2,200

NET CHANGE IN CASH                                 (950)
Cash at beginning of period (May 1)              14,300
CASH AT END OF PERIOD (May 31)                   13,350
```

Tie-outs: 1,050 - 4,200 + 2,200 = -950, and 14,300 - 950 = 13,350, which matches balance sheet cash. Equity also ties: 20,500 + 12,400 + 8,200 - 6,000 = 35,100.

The business was profitable. The problem was timing: $9,800 was waiting in receivables, and Bo chose to buy equipment and take a draw.

If you are a junior, you will usually support the senior who builds the statement by pulling the comparative balance sheet, the fixed asset roll-forward and the loan amortization split, and by tying ending cash to the reconciled bank balance. Do not publish a statement whose ending cash is unreconciled.

> [!warning] Common mistake
> Declaring the statement finished because the sections add up. Ending cash must also match reconciled balance sheet cash, and an unexplained equity change usually means a missing draw, contribution or miscoded entry.

```knowledge-quiz
schemaVersion: 1
quizId: "bad33a7f-7367-4786-ba7e-61fb46feacbd"
title: "Checkpoint: build and tie out"
questionBankId: "5e69fb42-e1ee-4eb6-a5c8-bdef41a59291"
questionIds:
  - "422c9135-472a-489a-b1a6-07d5171d615d"
  - "9036b991-f355-4f25-84f0-e9aef25a6f1e"
```

## Try it

BoBo's June figures: net income $9,500, depreciation $850, accounts receivable fell $4,000 (collections came in), accounts payable rose $2,000, Bo bought a $1,500 camera and took a $5,000 owner draw, with no contributions. The beginning cash balance was $13,350. Build the statement and state ending cash.

> [!example]- Sample solution
> Operating: 9,500 + 850 + 4,000 + 2,000 = 16,350.
> Investing: camera purchase of 1,500, an outflow, so -1,500.
> Financing: owner draw of 5,000, an outflow, so -5,000.
> Net change in cash: 16,350 - 1,500 - 5,000 = 9,850.
> Ending cash: 13,350 + 9,850 = 23,200.
> A falling receivable and a rising payable both added cash, which is why cash climbed far above what a simple profit-minus-draw guess would suggest.

## Key takeaways

- The statement of cash flows explains the change in cash using three sections: operating, investing and financing.
- Net income is an accrual figure, so the indirect method starts there and corrects it to cash.
- Add back non-cash expenses such as depreciation; rising assets use cash and rising liabilities hold on to cash.
- Equipment purchases are investing; owner draws, contributions and loan principal are financing; under US GAAP interest stays in operating through net income.
- Ending cash must tie to reconciled balance sheet cash, and an equity roll-forward helps find hidden draws or contributions.
- A profitable business can still be short of cash because of timing, so read operating cash flow beside net income.

## Explain it back

In your own words, explain why a company can be profitable and still run short on cash, using BoBo's May numbers.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "d8b748eb-df65-47ae-90cf-9273412dd54c"
title: "Chapter quiz: cash flow statement basics"
questionBankId: "5e69fb42-e1ee-4eb6-a5c8-bdef41a59291"
questionIds:
  - "3e87dd0d-a0bb-4b39-b2d3-e1698d2b4266"
  - "2369a072-7265-4e94-bd9a-5b5569f4829c"
  - "e301510f-2006-4f62-aa02-ffe1b81e2d38"
  - "4cccf88c-a826-4aae-b493-a9ab19fa2944"
  - "d4afcadc-98a9-4112-8403-f43e59bcf977"
  - "f5f40e88-93a2-449f-b2fb-1f7dde4a3b31"
```

Next: [[courses/accounting-ai-crash-course/lessons/16-ratios-and-analysis|Next lesson]]

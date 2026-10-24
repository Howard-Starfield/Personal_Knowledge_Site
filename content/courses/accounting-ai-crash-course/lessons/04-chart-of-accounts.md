---
id: "e74d6346-2c3c-4006-bf38-3938bd7abac8"
title: "Chart of Accounts and Account Classification"
description: "Learn how a numbered chart of accounts sorts every transaction, and how to code real BoBo transactions to the right account."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 4
estimatedMinutes: 40
---

## Why this matters

On your first day in an accounting job you are often handed a list of account codes and asked to "code this invoice." A software subscription coded as office supplies, processor fees netted out of revenue, or a laptop expensed instead of capitalized all produce reports that mislead the owner. Debits and credits can be learned quickly; coding well takes judgment, and judgment starts with understanding the chart of accounts. In this lesson you will use the fictional BoBo Digital Services LLC, and every figure is sample data.

## What you'll be able to do

- Explain what a chart of accounts is and why every business has one.
- Read an account number and name the account family it belongs to.
- Decide which BoBo account a transaction belongs in, including asset versus expense and COGS versus operating expense.
- Explain why contra accounts exist and name three examples with the account each offsets.
- Diagnose a balance in a clearing or suspense account and say what to do about it.

## Before you start

Recall these ideas from earlier lessons, without looking back:

- Which side of an entry increases an asset, and which side increases revenue?
- What is the accounting equation, and which accounts sit on each side of it?
- Why does every entry need a supporting document?

If you want to refresh your memory, revisit [[courses/accounting-ai-crash-course/lessons/03-debits-and-credits|Previous lesson]].

## Step 1 — What a chart of accounts is and how it is numbered

**In plain language.** A chart of accounts (COA) is the numbered list of "buckets" a business uses to sort every dollar that moves in or out. Think of a filing cabinet: each drawer is a family of accounts, each folder is one account, and each line of a transaction is coded to one account folder.

**The rule.** The COA is a structured, numbered list of every general ledger account the business uses. Most small US businesses use four-digit ranges:

| Range | Family                    | Question it answers                             |
| ----- | ------------------------- | ----------------------------------------------- |
| 1000s | Assets                    | What do we own?                                 |
| 2000s | Liabilities               | What do we owe?                                 |
| 3000s | Equity                    | What is left for the owners?                    |
| 4000s | Revenue                   | What came in?                                   |
| 5000s | Cost of goods sold (COGS) | What did it directly cost to deliver the sales? |
| 6000s | Operating expenses        | What does it cost to run the business?          |

Ranges are a convention, not a law; some charts also use 7000s to 9000s for other income, other expense and tax. The numbers matter in practice because they let you check the family before you read the name: "number first, name second."

**Gaps.** Number in increments of ten (1010, 1020, 1030) so new accounts can be inserted later without renumbering. BoBo's TikTok ads can become 6025, between 6020 Marketing – Google Ads and 6030 Marketing – Other.

**Worked example.** Bo asks, "How much did we spend on payment processing last quarter?" With one generic account called "Bank Service Charges," that question needs forensic work. With separate accounts 5030 Stripe Processing Fees, 5040 PayPal Processing Fees and 5050 eBay Final Value Fees, it is a simple report. The same transactions in different buckets give a very different view of the business.

> [!warning] Common mistake
> Thinking a chart of accounts is a fixed template. A restaurant and a digital services LLC should not share a chart; the accounts must match the business model and the questions the owner needs answered.

## Step 2 — Coding transactions: assets, expenses, COGS and equity

**In plain language.** Coding means choosing the one account each side of a transaction belongs to. Ask three questions in order: what family is this (own, owe, owner, earned, cost)? Is it used up now or does it last? Is it tied directly to a sale?

**The rules.**

- **Current versus long-term assets.** A current asset is cash or something expected to be converted to cash or used up within a year, such as Accounts Receivable or Prepaid Software. A long-term asset is used in operations for more than a year, such as Computer Equipment, and is depreciated over its useful life.
- **Capitalize or expense.** Each business sets a capitalization threshold in its policy. Thresholds vary by business and are often somewhere between $500 and $2,500. Book policy and tax elections are separate decisions: for tax, the IRS de minimis safe harbor lets many small businesses expense items up to $2,500 per invoice or item. Purchases above it become assets.
- **COGS versus operating expense.** COGS is a cost directly tied to delivering what was sold. On BoBo's chart that includes direct contractor work, licensed stock media, and processor fees. Operating expenses run the business generally, such as admin help and marketing. A useful test is "would this cost have happened without that sale?" Classifying processor fees as COGS is BoBo's chart design, a policy choice.
- **Equity is not revenue.** Money the owner puts in is 3010 Owner Capital Contributions. Money the owner takes out is 3020 Owner Draws. Neither is revenue or an expense.

**Worked example.** BoBo's bookkeeper hands you these items. Assume BoBo capitalizes purchases over $1,000.

| Transaction                                          | Account                                  | Why                                                                      |
| ---------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| $1,800 laptop                                        | 1500 Computer Equipment                  | Lasts more than a year and is above the threshold, so it is capitalized. |
| $79.99 Adobe monthly charge                          | 6110 Software Subscriptions – Design     | Design software used for service delivery.                               |
| $300 to a freelance video editor on a client project | 5010 Contractor Costs – Direct           | Directly tied to a billable deliverable.                                 |
| $150 to the virtual assistant for admin work         | 6210 Contractor Costs – Indirect (Admin) | Supports the business but not a specific sale.                           |
| $2,000 from Bo's personal account to fund BoBo       | 3010 Owner Capital Contributions         | An equity increase, not income.                                          |
| $800 paid to Bo personally                           | 3020 Owner Draws                         | An equity decrease, not an expense.                                      |

**Prepaid items.** A hypothetical $1,200 annual QuickBooks plan paid in January is debited to 1200 Prepaid Software Subscriptions, then $100 a month moves to 6130 Software Subscriptions – Accounting. Expensing the whole amount in January would overstate that month and understate the next eleven.

> [!warning] Common mistake
> Coding a laptop to Office Supplies because buying it feels like a normal expense. A purchase above the capitalization threshold that lasts more than a year is an asset.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "56e0f10b-4d2b-4913-9b01-b7fa5e3451a1"
title: "Checkpoint 1 — Numbering and coding"
questionBankId: "94cb1c13-ca14-4a9c-9458-b519814d3690"
questionIds:
  - "57976459-bd6e-487a-9fe3-56b018b931b5"
  - "cbb75348-c00c-4282-8892-7eb196164044"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/04-chart-of-accounts|Chart of Accounts and Account Classification Question Bank]].

## Step 3 — Contra accounts and recording gross before net

**In plain language.** Sometimes you want a statement to show a net number while the books remember the gross one. A contra account makes that possible: it sits beside a "parent" account and subtracts from it.

**The rule.** A contra account is paired with a parent account and carries the opposite normal balance. BoBo's chart includes:

| Contra account                            | Offsets                                                        | Normal balance |
| ----------------------------------------- | -------------------------------------------------------------- | -------------- |
| 1590 Accumulated Depreciation – Equipment | 1500 Computer Equipment                                        | Credit         |
| 1110 Allowance for Doubtful Accounts      | 1100 Accounts Receivable                                       | Credit         |
| 4900 Refunds & Allowances                 | Service Revenue (4010 to 4040)                                 | Debit          |
| 3020 Owner Draws                          | Owner equity, tracked against 3010 Owner Capital Contributions | Debit          |

The balance sheet then shows equipment net of depreciation, and the income statement shows gross revenue less refunds equals net revenue, while the ledger keeps the original detail.

**"Gross before net."** Record revenue at the full amount customers paid, and record refunds, chargebacks and processing fees in their own accounts. Do not collapse them.

**Worked example.** Stripe shows $1,000 of customer payments and deducts a $43 fee, so the payout is $957. The entry debits 1030 Cash – Stripe Available for $957, debits 5030 Stripe Processing Fees for $43, and credits revenue for $1,000. Debits of $1,000 equal credits of $1,000. If instead only $957 were credited to revenue, the top line would be $43 too low and the fee would vanish from view.

A $400 refund for a logo project is debited to 4900 Refunds & Allowances, not recorded as a negative sale, so the refund rate stays visible.

> [!warning] Common mistake
> Netting Stripe fees out of revenue because "that is the cash that arrived." The top line should show what customers paid, and the cost of getting paid belongs in a fee account.

## Step 4 — Clearing and suspense accounts

**In plain language.** Both are temporary holding accounts, but for different reasons. Think of a hotel, not a home: items may check in, but they must check out.

**The rules.**

- A **clearing account**, such as 1300 Undeposited Funds, is an intentional parking spot for known payments that have been received but not yet matched to a bank deposit, so the bank reconciliation can match one lump-sum deposit instead of dozens of individual sales. BoBo also holds processor balances in their own cash accounts (1020, 1030, 1040).
- A **suspense account**, 1900, is for unknown items that need investigation. An unidentified receipt is credited to suspense, so it shows up as an unexplained credit and is not income. When you find out what the item is, you reclassify it to the right account.
- Both should be reconciled to zero, or to a known and justified balance, every month before close. Auditors typically ask what is sitting in suspense.

**Worked example.** A $137 wire arrives with no memo. You post it to 1900 Suspense, ask the bank or owner what it is, and reclassify it once identified. If a $4,700 balance has sat in suspense for six months, review every line in it, reclassify each to its correct account, and look for the root cause, such as bad deposit memos, so it does not recur.

> [!warning] Common mistake
> Assuming an unidentified deposit is revenue. Until you know the source, it is unexplained, and calling it income can overstate results.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "00bca628-2905-4790-9b30-b42cb97aee90"
title: "Checkpoint 2 — Contra and suspense accounts"
questionBankId: "94cb1c13-ca14-4a9c-9458-b519814d3690"
questionIds:
  - "01234561-d3f8-457b-893a-c1216c9bc24f"
  - "3a2ec988-c0e1-43c5-b52a-b962342a1539"
```

## Try it

Code each of these BoBo transactions with an account number and name, and give a one-line reason.

1. $250 Facebook Ads charge.
2. $32 wire fee charged by the bank.
3. $75 stock photo licensed for a paid client project.
4. A $230 deposit that nobody can identify.
5. A $500 refund to an unhappy logo client.

> [!example]- Sample solution
>
> 1. 6010 Marketing – Facebook Ads: paid advertising, an operating expense.
> 2. 6410 Bank Fees: fees charged by the bank, an operating expense.
> 3. 5020 Stock Assets / Licensed Media: used directly on a sold project, so COGS.
> 4. 1900 Suspense Account: unknown source, so investigate and reclassify within the month.
> 5. 4900 Refunds & Allowances: a contra-revenue account that keeps gross revenue intact and the refund visible.

## Key takeaways

- A chart of accounts is the numbered list of every ledger account; the first digit tells you the family.
- Number in tens so accounts can be inserted without renumbering.
- Capitalize purchases that last more than a year and exceed the policy threshold; expense the rest, and spread prepaids over the period they cover.
- Record revenue gross and use contra accounts and separate fee accounts so the net figure and the detail both survive.
- Owner contributions and draws are equity, not revenue or expense.
- Suspense is a hotel, not a home: investigate and clear it every month.

## Explain it back

In your own words, explain to a friend what a chart of accounts is and how an account number helps you use it, with one BoBo account as an example.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "d3a7b21a-91e3-46ae-b8d6-a2930210738f"
title: "Chapter quiz — Chart of accounts"
questionBankId: "94cb1c13-ca14-4a9c-9458-b519814d3690"
questionIds:
  - "be9199d6-85ca-4cbd-a078-7124d3cf663b"
  - "a7700ae2-9c7a-469b-ac86-6d5b8bfe4adc"
  - "ed79d236-b9d0-4843-86d9-87dccec6d872"
  - "97fe963f-311c-48cc-bfe1-026b040d530f"
  - "8e8ed1c6-44a8-4ad2-95cd-8ad1050a28ba"
  - "c873a9f6-b7bc-4635-a5f1-a7760bd7d642"
  - "2ab65d7f-2ee3-45b5-91b3-5b72d7199a89"
  - "4f797c51-2945-4770-8dc1-f6d4cce522ea"
```

Next: [[courses/accounting-ai-crash-course/lessons/05-accounting-cycle|Next lesson]]

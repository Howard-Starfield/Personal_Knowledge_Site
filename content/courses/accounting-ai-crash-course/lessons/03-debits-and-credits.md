---
id: "832ef15c-9e68-4318-a050-20a2b6ee5420"
title: "Debits and Credits Without Fear"
description: "Learn to journalize everyday small-business transactions with debits and credits and prove that every entry balances."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 3
estimatedMinutes: 45
---

## Why this matters

Much of an entry-level accounting day is one task: something happened in the business, so write the journal entry. If you cannot turn "we paid the Stripe fee" into a debit and a credit, you cannot post invoices in QuickBooks or Xero, reconcile a bank account, or answer the classic interview question, "Walk me through a journal entry for X." Managers do not expect a new hire to know tax law, but they do expect you to know which side of the entry the cash goes on.

## What you'll be able to do

- Explain why a debit is not "bad" and a credit is not "good."
- Apply the DEAD CLIC memory hook to decide which side increases an account.
- Journalize sales, collections, fees, refunds, expenses and owner funding for BoBo Digital Services.
- Calculate whether an entry balances and spot the error when it does not.
- Diagnose common mistakes such as double-counted revenue or owner money booked as income.

## Before you start

Recall these ideas from earlier in the course before you read on.

- What are the three parts of the accounting equation, and why must both sides always match?
- What is the difference between an asset and a liability? Name one of each for a small online business.
- When does a business earn revenue: when work is delivered or when cash arrives?

Need a refresher? Revisit the [[courses/accounting-ai-crash-course/lessons/02-accounting-equation-financial-statements|Previous lesson]].

## Step 1 — Debit and credit are just left and right

**In plain language.** Every transaction has two sides: something comes in, something goes out, or something is swapped. "Debit" and "Credit" are the labels accountants use for the left side and the right side of that swap. They carry no moral meaning.

**Analogy.** Think of pouring water between two buckets. One bucket gains and one loses, and the water has to come from somewhere. Debit and credit are only the direction labels on the pour.

**The precise rule.** Double-entry bookkeeping records every transaction with at least one debit and at least one credit, and total debits must equal total credits. A debit is an entry on the left; a credit is an entry on the right. Each entry answers two questions together: "What did we get?" and "Where did it come from?"

**Worked example.** BoBo sells a logo pack for $300 through Stripe.

| Account                | Debit  | Credit |
| ---------------------- | ------ | ------ |
| Cash – Stripe Clearing | 300.00 |        |
| Service Revenue        |        | 300.00 |

What BoBo got is $300 in its Stripe balance (debit). Where it came from is a sale (credit). The left total is $300 and the right total is $300, so it balances.

> [!warning] Common mistake
> Believing that "debit" means money leaving and "credit" means money arriving. For Cash, a debit is an increase. The words name sides of an entry, not good or bad news.

## Step 2 — DEAD CLIC tells you which side increases

**In plain language.** Each type of account grows on one particular side. A mnemonic saves you from reasoning it out every time.

**Analogy.** Picture a T drawn on paper with a mirror down the middle. DEAD accounts live on the left and grow leftward. CLIC accounts live on the right and grow rightward. Every entry puts one foot on each side so the books stay symmetrical.

**The precise rule.**

- **DEAD**: **D**ebits increase **E**xpenses, **A**ssets and **D**rawings (dividends for a corporation).
- **CLIC**: **C**redits increase **L**iabilities, **I**ncome (revenue) and **C**apital (equity).
- Whatever side increases an account, the opposite side decreases it.
- The side where an account normally increases is its normal balance. Cash has a debit normal balance; Accounts Payable and Service Revenue have credit normal balances.

**Worked example.** Canva Pro auto-bills $49 to the business checking account. Software Expense is in DEAD, so debit it $49 to increase it. Cash is an asset, also in DEAD, and it decreases, so credit Cash $49. Debits $49 equal credits $49.

> [!warning] Common mistake
> Reversing the sides because "credit feels positive." Revenue is in CLIC, so a credit to Service Revenue is exactly what makes revenue go up.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "6385f4f9-ad17-43e6-a9fd-bfea4bb6fdf1"
title: "Checkpoint 1: sides and DEAD CLIC"
questionBankId: "fe885f93-e1f9-4d51-b31d-fd8f981ee03c"
questionIds:
  - "675177d2-0010-49b7-b1c1-815d1ab2d04e"
  - "8d6e16ba-ec35-4055-94fb-8839cc24ea39"
```

## Step 3 — Record a sale, then record the payment

**In plain language.** A sale and the cash for that sale are two different events. When BoBo delivers work and sends an invoice, revenue is earned today even though the money comes later. Accounts Receivable is the bridge between those two events.

**Analogy.** An invoice is a promissory note you hold. The note is worth something (an asset) the moment it exists, and when the client pays, you simply trade the note for cash.

**The precise rule.** BoBo uses the accrual basis, so revenue is recorded when earned. Invoicing debits Accounts Receivable (an asset rises) and credits Service Revenue. Collection debits Cash and credits Accounts Receivable, and it never touches revenue again.

**Worked example.** A client is invoiced $1,200 for a website refresh on 3 March, net 14. On 10 March the client pays into PayPal.

| Date   | Account             | Debit    | Credit   |
| ------ | ------------------- | -------- | -------- |
| 3 Mar  | Accounts Receivable | 1,200.00 |          |
| 3 Mar  | Service Revenue     |          | 1,200.00 |
| 10 Mar | Cash – PayPal       | 1,200.00 |          |
| 10 Mar | Accounts Receivable |          | 1,200.00 |

Revenue was booked once, on 3 March. The 10 March entry swaps one asset for another, so the receivable returns to zero.

> [!warning] Common mistake
> Recording revenue again when the client pays an old invoice. That double-counts income. Clear Accounts Receivable and leave revenue alone.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "cbc1d19a-bce6-4b90-9fc6-2af3974f888c"
title: "Checkpoint 2: invoices and collections"
questionBankId: "fe885f93-e1f9-4d51-b31d-fd8f981ee03c"
questionIds:
  - "10da71f0-9c27-4124-92fb-d38ab2db865c"
  - "57d66922-8124-4087-a09a-4ded366ad9ae"
```

## Step 4 — Fees, refunds, owner funding and owner draws

**In plain language.** Not every transaction involves a customer. Platforms take fees, customers get refunds, and the owner moves personal money in and out. Each has its own account so reports stay honest.

**Analogy.** Think of a grocery receipt. You want the full price of the goods and the discount coupons listed on separate lines, not blended into one number you cannot audit.

**The precise rules.**

- **Fees:** record gross revenue and record the fee as a separate expense. Netting the fee against revenue hides gross sales.
- **Refunds:** use a contra-revenue account such as Sales Returns & Refunds. A contra account offsets its parent and has the opposite normal balance, so this one carries a debit balance.
- **Owner contribution:** the owner's money is equity, credited to Owner's Capital. It is not revenue because the business did not earn it.
- **Owner draw:** a personal withdrawal debits Owner Draws, a DEAD account, and credits Cash. It is not an expense.

**Worked examples.**

| Event                                                           | Debit                             | Credit                          |
| --------------------------------------------------------------- | --------------------------------- | ------------------------------- |
| Stripe fee of $10 on a $300 sale (the sale is already recorded) | Merchant Processing Fees 10.00    | Cash – Stripe Clearing 10.00    |
| Refund of $150 via Stripe                                       | Sales Returns & Refunds 150.00    | Cash – Stripe Clearing 150.00   |
| Bo puts in $2,000 of savings                                    | Cash – Business Checking 2,000.00 | Owner's Capital 2,000.00        |
| Bo withdraws $300 for groceries                                 | Owner Draws 300.00                | Cash – Business Checking 300.00 |

Each processor, such as Stripe, PayPal and eBay, is treated like its own small bank account, so each gets its own cash account.

> [!warning] Common mistake
> Coding an owner deposit as Service Revenue. That inflates income with money the business never earned.

## Step 5 — Prove every entry balances and fix the ones that do not

**In plain language.** The great strength of double entry is that errors announce themselves. If total debits and total credits differ, something was keyed or posted wrong.

**Analogy.** A balance check is like counting the change in a till. If the total is off by $90, there is a reason, and it is findable.

**The precise rule.** Check each entry's debits and credits, then check the grand totals. Use source documents, such as the bank statement, to decide which figure is wrong, and fix the wrong figure instead of plugging the difference. Document the fix with its source. A trial balance proves only that debits equal credits, not that each amount sits in the correct account.

**Worked example.** BoBo's March trial balance is off by $90. The entry export shows Debit Advertising Expense $80 and Credit Cash $170. The bank statement says the ad charge was $80. The $170 credit is the keying error, so correct it to $80 and note "bank statement line" as the source. The debit side and credit side now both equal $80, so the entry balances.

A quick control in Excel is `=SUM(Debit)-SUM(Credit)`, which must equal 0. In SQL, group by journal entry ID and return any entry where the debit total does not equal the credit total.

> [!warning] Common mistake
> Assuming balanced books are correct books. An entry such as Debit Revenue and Credit Cash for a sale balances perfectly, yet it is backwards.

### Checkpoint 3

```knowledge-quiz
schemaVersion: 1
quizId: "c90eb14e-3243-4be0-b17a-0091f6a6e9ec"
title: "Checkpoint 3: owner draws and fixing an entry"
questionBankId: "fe885f93-e1f9-4d51-b31d-fd8f981ee03c"
questionIds:
  - "8e699dbb-ea26-4abf-b230-92e3cf8a88ca"
  - "1304c1e0-d309-4379-8889-3f351b5a7580"
```

## Try it

Journalize these four BoBo transactions, then confirm that debits equal credits for each one.

1. 9 March: a Stripe sale of a template pack for $250.
2. 9 March: Stripe charges an $8 processing fee on that sale.
3. 12 March: a customer is refunded $80 through PayPal.
4. 13 March: Bo contributes $500 of personal savings to business checking.

> [!example]- Sample solution
>
> 1. Debit Cash – Stripe Clearing 250.00; credit Service Revenue 250.00.
> 2. Debit Merchant Processing Fees 8.00; credit Cash – Stripe Clearing 8.00.
> 3. Debit Sales Returns & Refunds 80.00; credit Cash – PayPal 80.00.
> 4. Debit Cash – Business Checking 500.00; credit Owner's Capital 500.00.
>
> Debits total $838.00 and credits total $838.00. The sale stays at its gross $250, the fee and the refund are recorded separately, and the owner's money goes to equity, not revenue.

## Key takeaways

- Debit means left and credit means right; neither is good or bad.
- DEAD accounts (Expenses, Assets, Drawings) increase with debits; CLIC accounts (Liabilities, Income, Capital) increase with credits.
- Every entry needs at least one debit and one credit, and total debits must equal total credits.
- Revenue is earned once; collecting an old invoice moves Cash up and Accounts Receivable down.
- Record fees and refunds separately from gross sales, and treat owner money as equity, not revenue.
- A balanced entry can still be wrong, so confirm it against the source document.

## Explain it back

In your own words, explain why debits and credits are directions rather than good or bad. Use DEAD CLIC and one BoBo entry to show why the books stay balanced.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "14922b8e-a96e-4134-8119-c5b290d2d0b0"
title: "Chapter quiz: Debits and Credits Without Fear"
questionBankId: "fe885f93-e1f9-4d51-b31d-fd8f981ee03c"
questionIds:
  - "e528482b-ee68-4ede-85d5-20884a2ef68f"
  - "05bb6c8d-80f1-48f4-af26-50dad4e9885a"
  - "6f27d984-aa17-4601-bd69-14592fa87069"
  - "2ca63439-4eb6-4e55-b4b2-ce8efea9eb1b"
  - "2dd9061f-63ac-4030-b0a1-56095a123044"
  - "f5cc9d6b-580b-4b1a-acd1-c76fe9e3f23c"
```

Next: [[courses/accounting-ai-crash-course/lessons/04-chart-of-accounts|Next lesson]]

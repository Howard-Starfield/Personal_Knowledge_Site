---
id: "8ee5cb70-9e0c-483c-a65c-062f6fd90079"
title: "Credit Card Reconciliation and Expense Coding"
description: "Learn to turn a company card statement into correctly coded expenses, handle exceptions, and prove the card liability matches the issuer."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 10
estimatedMinutes: 45
---

## Why this matters

In a small company the card program often lands on whoever does the books. Every statement line is a chance to catch a duplicate charge, a personal purchase or a missing receipt before month-end close or a tax review finds it. Lazy coding makes the profit and loss unreadable, and an unsupported expense can put a deduction at risk. A clean card reconciliation is one of the fastest ways to earn trust in an accounts payable seat.

## What you'll be able to do

- Explain why a card swipe creates an expense and a liability, and why paying the statement is not an expense.
- Calculate and record the entries for a swipe, a statement payment, a personal charge and its reimbursement, and a refunded duplicate.
- Decide which statement lines to code now and which to query, using merchant, memo and receipt support.
- Diagnose a duplicate, a personal charge and a missing receipt, and route each one correctly.
- Build a month-end reconciliation of Credit Card Payable that includes activity after the last statement.

## Before you start

- In an earlier lesson, what did a bank reconciliation prove, and which account did it tie to the bank?
- Which side of the books holds a liability such as Accounts Payable, and does it normally carry a debit or a credit balance?
- Why does Bo's Owner Draws account reduce equity but never profit?

Revisit your answers in [[courses/accounting-ai-crash-course/lessons/09-bank-reconciliation|Previous lesson]].

## Step 1 — Follow the swipe and the payment

**In plain language.** A company card is a short-term loan from the issuer. Each swipe borrows money to pay a vendor, and the monthly statement is the bill for everything borrowed. Think of a roommate who pays for things on your behalf all month and hands you a tab at the end: you owe them as each purchase happens, and you settle once.

**The rule.** A swipe debits the right expense and credits Credit Card Payable (2020 in BoBo's chart), a current liability. Paying the statement debits Credit Card Payable and credits Cash. The payment is never an expense, because the expense was recognized at the swipe.

**Worked example.** BoBo's Visa shows these charges for the cycle:

| Merchant             | Amount    | Account                                      |
| -------------------- | --------- | -------------------------------------------- |
| Adobe Creative Cloud | $79.99    | Software Subscriptions – Design (6110)       |
| Canva Pro            | $14.99    | Software Subscriptions – Design (6110)       |
| Notion               | $29.00    | Software Subscriptions – Productivity (6120) |
| Google Ads           | $1,240.00 | Marketing – Google Ads (6020)                |
| Nobu dinner          | $187.43   | Travel & Meals (6710)                        |

The cycle entry (booked line by line in QuickBooks Online, shown here as one summary):

| Account                                      | Debit    | Credit   |
| -------------------------------------------- | -------- | -------- |
| Software Subscriptions – Design (6110)       | 94.98    |          |
| Software Subscriptions – Productivity (6120) | 29.00    |          |
| Marketing – Google Ads (6020)                | 1,240.00 |          |
| Travel & Meals (6710)                        | 187.43   |          |
| Credit Card Payable – Visa (2020)            |          | 1,551.41 |

When Bo pays the $1,551.41 statement by ACH, the entry is a debit to Credit Card Payable – Visa (2020) and a credit to Cash – Operating Bank (1010) for $1,551.41. No expense account appears.

> [!warning] Common mistake
> Booking the statement payment as an expense. The swipe already recorded the expense, so an expense on the payment counts every purchase twice and wipes out the liability.

```knowledge-quiz
schemaVersion: 1
quizId: "f45be8b1-ad2a-46e7-a462-e45472c85eb8"
title: "Checkpoint: swipe and payment"
questionBankId: "34a2172a-b85b-424d-8c87-8cc3b8730072"
questionIds:
  - "90df4f84-7d7c-4ded-8e8d-21285edae2c4"
  - "5b6b94d5-00bd-4623-ab8a-2a073f610892"
```

## Step 2 — Code every line to a specific account

**In plain language.** The statement is the company's diary of what it spent. Your job is to translate each diary entry into the right bucket, with proof. Merchant names are often cryptic, such as a Square prefix or an Amazon Marketplace code, so you look at the merchant, the memo and the receipt together.

**The rule.** Each line needs three things: the merchant (the vendor as the card network reports it), a memo (the cardholder's note of the business purpose, needed for meals, travel and gifts) and receipt support (an itemized document, not just the card slip). Keep a vendor-to-account mapping table so recurring vendors are coded the same way every month, and default to a specific account, never a catch-all like Miscellaneous.

**Worked example.** Adobe maps to 6110 every month because the mapping table says so, and Google Ads maps to 6020. A line reading AMZN MKTPLACE for $39.87 has no obvious purpose, so you look up the order. If it turns out to be printer ink, it goes to Office Supplies (6310). If it is a gift for Bo's family, it is personal. Foreign charges are simpler: when a 15 euro Notion charge is posted as $16.22, you book the dollars as posted, because the issuer has already converted it. A separate foreign transaction fee is its own small line in Bank Fees (6410).

AI can help by suggesting an account for a merchant, but it only suggests. A person approves before anything posts, and every suggestion and approval is logged.

> [!warning] Common mistake
> Dumping unclear lines into Miscellaneous Expense. The total still ties, but meals, software and travel become indistinguishable, and meals are generally only 50 percent deductible, so the tax return can be wrong.

## Step 3 — Handle the exceptions

**In plain language.** Most lines are routine. The exceptions are where you add value: a charge that looks personal, a charge that might be a duplicate, and a charge with no receipt. The rule is to code what is clean, chase what is not, and never silently guess.

**The rules.**

- **Personal charges.** Code to Owner Draws (3020) for a single-member LLC like BoBo, and tell the owner. In a corporation the charge goes to an employee or shareholder receivable instead. If the owner repays the business, debit Cash and credit Owner Draws.
- **Missing receipts.** IRS Publication 463 generally expects documentary evidence for an expense of $75 or more and for any lodging, and meals also need attendees and a business purpose. A card slip shows only the total, so it is generally not enough on its own; ask for the vendor's itemized receipt. Track the charge in a missing-receipt tracker (date, merchant, amount, cardholder, status, days outstanding, reclass date). If the receipt never arrives by the policy cutoff, reclass the charge to Owner Draws and document why.
- **Duplicates and disputes.** Ask before you assume. If a charge is confirmed as a duplicate and the issuer credits it, debit Credit Card Payable and credit the original expense.

**Worked example.** The Peloton class for $44.00 posts to Owner Draws:

| Account                           | Debit | Credit |
| --------------------------------- | ----- | ------ |
| Owner Draws (3020)                | 44.00 |        |
| Credit Card Payable – Visa (2020) |       | 44.00  |

If Bo repays by Venmo to Pacific Bank, the reimbursement debits Cash – Operating Bank (1010) $44.00 and credits Owner Draws (3020) $44.00. If the Nobu receipt never arrives, the cutoff entry debits Owner Draws (3020) and credits Travel & Meals (6710) for $187.43. If Google Ads confirms a duplicate $1,240.00 charge and Visa credits it, you debit Credit Card Payable – Visa (2020) and credit Marketing – Google Ads (6020) for $1,240.00.

> [!warning] Common mistake
> Calling two similar charges a duplicate without asking. Two $487.00 Delta flights 17 days apart on the same route may be a return trip, so deleting or disputing one could remove a real expense.

```knowledge-quiz
schemaVersion: 1
quizId: "7c516aa7-681d-40e6-b077-c28c586b8704"
title: "Checkpoint: coding and exceptions"
questionBankId: "34a2172a-b85b-424d-8c87-8cc3b8730072"
questionIds:
  - "d13819c8-28a9-4894-9300-f78b343b59f4"
  - "7e944c23-d3c8-45d0-b9c1-bc28c9bb84a1"
```

## Step 4 — Reconcile to the issuer, not just the last statement

**In plain language.** Reconciling means proving that what your books say you owe the issuer is what the issuer says you owe. A credit card reconciliation proves a liability, whereas a bank reconciliation proves the Cash asset. Because card issuers post transactions promptly, the timing problems of a bank reconciliation (deposits in transit, outstanding checks) are rare, and the work is mostly coding accuracy and receipt support.

**The rule.** At month-end, Credit Card Payable should equal the issuer's unpaid balance on that date: the last statement balance plus charges posted since, minus any payments that have cleared. Reconcile to the issuer's activity as of month-end, not only to the last printed statement. Differences go on a reconciling schedule.

**Worked example.** The Visa statement closed June 3 at $1,551.41 and was unpaid on June 30. Charges of $890.00 posted between June 4 and June 30. Credit Card Payable at June 30 should be $2,441.41 ($1,551.41 + $890.00). If Bo had paid the statement on June 25, only the $890.00 would remain.

> [!warning] Common mistake
> Tying the books only to the last printed statement. Charges posted after the statement date are missing, so the month-end liability and expenses are understated.

```knowledge-quiz
schemaVersion: 1
quizId: "f9223a57-bf35-487b-8aec-a9b94484466a"
title: "Checkpoint: reconciliation"
questionBankId: "34a2172a-b85b-424d-8c87-8cc3b8730072"
questionIds:
  - "da92da71-e14b-4764-9a76-bc6a80f3bc56"
  - "27763b4e-169a-4731-8bfb-fb3f1b52a4dd"
```

## Try it

BoBo's Visa shows five charges for the cycle: Canva Pro $14.99, Google Ads $620.00, Peloton $44.00, Nobu dinner $187.43 (no receipt in the inbox) and AWS $45.00.

1. Code each line and write the summary entry.
2. Say which lines need a question to Bo before posting.
3. Record the entry when Bo pays the statement.

> [!example]- Sample solution
> Canva Pro goes to Software Subscriptions – Design (6110) $14.99. Google Ads goes to Marketing – Google Ads (6020) $620.00. Peloton goes to Owner Draws (3020) $44.00, because it looks personal. Nobu goes to Travel & Meals (6710) $187.43, tagged Receipt Pending. AWS goes to Software Subscriptions – Productivity (6120) $45.00. The credit is Credit Card Payable – Visa (2020) $911.42, which equals the five debits ($14.99 + $620.00 + $44.00 + $187.43 + $45.00).
>
> Email Bo one message: request an itemized Nobu receipt with attendees and business purpose, and confirm that Peloton is personal. Add Nobu to the missing-receipt tracker.
>
> When Bo pays the $911.42 statement, debit Credit Card Payable – Visa (2020) $911.42 and credit Cash – Operating Bank (1010) $911.42. No expense account appears.

## Key takeaways

- A swipe debits an expense and credits Credit Card Payable; paying the statement debits Credit Card Payable and credits Cash, and is never an expense.
- Code every line to a specific account using merchant, memo and an itemized receipt, and avoid Miscellaneous.
- Personal charges go to Owner Draws for a single-member LLC, and a repayment debits Cash and credits Owner Draws.
- A card slip is not a receipt; chase itemized receipts, track them, and reclass at the policy cutoff.
- Ask before treating similar charges as duplicates, and credit the expense only once the issuer refunds.
- Reconcile Credit Card Payable to the issuer's balance as of month-end, including charges after the last statement.

## Explain it back

Explain to a friend who is not an accountant how a company card purchase and the later statement payment flow through the books, and why paying the statement is not an expense.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "e8cde396-5b0c-4db7-b993-3bc0442f7682"
title: "Chapter quiz: credit card reconciliation"
questionBankId: "34a2172a-b85b-424d-8c87-8cc3b8730072"
questionIds:
  - "da831265-65e1-4a48-aadd-af267ff5e1a4"
  - "23f13c50-4d9b-47ac-a2d2-e1397c44510f"
  - "673fb913-b235-416a-bfb6-a79f4771130e"
  - "20f9e225-9672-4f3a-9f80-a81b745a4d26"
  - "653d430d-c1a7-40f3-b7cd-3f6fb7b05447"
  - "efae4350-1c0e-46c7-b380-b18ebf0b136a"
```

Next: [[courses/accounting-ai-crash-course/lessons/11-adjusting-entries|Next lesson]]

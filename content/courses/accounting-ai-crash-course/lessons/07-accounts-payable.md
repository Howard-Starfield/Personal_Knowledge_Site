---
id: "75b40834-6dd3-430b-bc57-3943e2cf98b3"
title: "Accounts Payable Workflow"
description: "Process a vendor bill from inbox to payment, with the controls, discount, accrual and aging steps that keep cash leaving only once and to the right person."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 7
estimatedMinutes: 45
---

## Why this matters

Accounts payable (AP) is where a company's cash leaves the building. A missed check can mean a duplicate payment, a payment to a scammer, a lost early-payment discount or an expense recorded in the wrong month. Because the work is repeatable and the stakes are visible, AP is a common first seat for people entering or returning to accounting, and "walk me through how you process an invoice" is a standard interview question. This lesson follows the fictional BoBo Digital Services LLC; every vendor, invoice and figure is sample data.

## What you'll be able to do

- Record a vendor bill and its payment with the correct debits and credits.
- Decide whether an invoice passes a three-way match, and spot a likely duplicate.
- Calculate the cash paid and the entry for a 2/10 Net 30 early-payment discount.
- Build the accrual and reversal entries for an expense that has not been billed yet.
- Place overdue bills into aging buckets and name the guardrails for AI-assisted invoice reading.

## Before you start

Recall these ideas from earlier lessons before you read on. Try to answer from memory.

- Under accrual accounting, when is an expense recorded?
- What does a debit do to an expense account, and what does a credit do to a liability account?
- Why does the matching principle matter for a month's profit?

If these feel shaky, revisit [[courses/accounting-ai-crash-course/lessons/06-cash-vs-accrual|Previous lesson]] first.

## Step 1 — Record the bill, then record the payment

**In plain language.** A vendor sends an invoice (a bill). The moment you accept that you owe it, the books show a new expense and a new debt. Later, when you pay, the debt disappears and cash goes down. Two separate events, two separate entries.

**Analogy.** Ordering lunch on a tab: the meal is consumed when you eat (expense), but you owe the café until you settle up (payable). Settling up is a different moment.

**The rule.** Accounts Payable (account 2010) is a current liability. Recording a bill debits an expense (or an asset) and credits AP. Paying it debits AP and credits Cash. Cash is not touched until payment.

**Worked example.** On May 15, 2026 BoBo receives HubSpot invoice HS-55120 for $2,400, Net 30, so it is due June 14.

| Date | Account | Debit | Credit |
|------|---------|------:|-------:|
| 2026-05-15 | 6030 Marketing – Other | 2,400.00 | |
| 2026-05-15 | 2010 Accounts Payable | | 2,400.00 |

BoBo pays by ACH on June 12.

| Date | Account | Debit | Credit |
|------|---------|------:|-------:|
| 2026-06-12 | 2010 Accounts Payable | 2,400.00 | |
| 2026-06-12 | 1010 Cash – Operating Bank | | 2,400.00 |

After both entries, AP for HubSpot is back to zero and the expense sits in May, the month it was incurred.

> [!warning] Common mistake
> Debiting Cash when you record the bill. The bill creates a debt, not a payment, so the credit side is AP; Cash only moves on the payment date.

## Step 2 — Check before you pay: match, duplicates, approval and bank changes

**In plain language.** Every control in AP answers one question: should this money leave? You check the paperwork agrees, that this is the only copy of the bill, and that someone with authority approved it.

**Analogy.** Think of a stadium gate. The ticket (purchase order), the wristband (proof it arrived) and the ID (invoice) must all line up, and the same ticket cannot enter twice.

**The rules.**

- **Three-way match.** The purchase order (PO, the internal approval to buy), the receiving document (proof the goods or services arrived) and the vendor invoice must agree on quantity, price and item before you pay.
- **Duplicate search.** Search by invoice number, then by vendor plus amount plus date. A resent invoice may carry a different date.
- **Approval.** Route the bill through the company's approval limits before payment; never pay first and approve later.
- **Vendor bank changes.** Never change a vendor's bank details because of an email. Call the vendor on a number you already have on file, and use a second approver.
- **W-9.** Collect the vendor's W-9 (their taxpayer ID form) before the first payment to a U.S. contractor, so year-end tax reporting is possible.

**Worked example.** Jordan Lee, a contract video editor, bills $4,800 for 40 hours at $120 (invoice JL-2026-07). PO-2026-014 authorizes 40 hours at $120, and the Creative Director confirms the work arrived. Quantity, rate and total agree, so the match is clean. The bill is coded to 5010 Contractor Costs – Direct, flagged in the vendor record for year-end contractor reporting, and sent for approval.

Next, FastLead Marketing invoice FL-3387 for $1,250 arrives. Searching AP finds the same vendor, number and amount already paid on May 7 by ACH; only the date differs. Do not enter it. Log it as a suspected duplicate, then email the vendor with the original payment reference and wait for written confirmation.

> [!warning] Common mistake
> Treating a different invoice date as proof of a new invoice. A vendor's billing system can resend an old invoice with a new date, so search by number and by vendor, amount and date.

```knowledge-quiz
schemaVersion: 1
quizId: "a58f556d-75ba-4c0c-8be4-8fc3bed832db"
title: "Checkpoint — bills and controls"
questionBankId: "b0587ae4-e089-4e75-9ef7-b07507b0eac3"
questionIds:
  - "b3d7455f-0433-4c62-98b7-7c63d7ca080c"
  - "1b03c61f-2ee5-4148-adee-15e55c3eea0f"
```

## Step 3 — Early-payment discounts (2/10 Net 30)

**In plain language.** Some vendors reward fast payment. The terms 2/10 Net 30 read: take 2% off if you pay within 10 days; otherwise pay the full amount within 30.

**Analogy.** It is a tiny loan in reverse: paying 20 days sooner earns a guaranteed 2%.

**The rule.** Record the bill at its full (gross) amount. If you pay inside the discount window, clear the full AP balance, reduce cash by the discounted amount, and credit the difference to Purchase Discounts Taken (6920). Some companies credit the discount to the expense account instead; follow your chart of accounts.

**Worked example.** PrintPro bills BoBo $5,000 on May 1 under 2/10 Net 30. BoBo pays on May 9, inside the 10 days. The discount is $5,000 × 2% = $100, so cash paid is $4,900.

| Date | Account | Debit | Credit |
|------|---------|------:|-------:|
| 2026-05-01 | 6030 Marketing – Other | 5,000.00 | |
| 2026-05-01 | 2010 Accounts Payable | | 5,000.00 |
| 2026-05-09 | 2010 Accounts Payable | 5,000.00 | |
| 2026-05-09 | 1010 Cash – Operating Bank | | 4,900.00 |
| 2026-05-09 | 6920 Purchase Discounts Taken | | 100.00 |

Why bother? Saving 2% for paying 20 days earlier repeats about 18 times a year (365 ÷ 20), so the saving works out to roughly a 36–37% annual return, far above what idle cash would earn.

> [!warning] Common mistake
> Reading 2/10 as "10% off". The 2 is the percentage, the 10 is the number of days.

## Step 4 — Accrue an unbilled expense, then reverse it

**In plain language.** Sometimes you use something in December but the invoice arrives in January. December's books should still show the cost.

**Analogy.** Using a friend's streaming account all month: the month is over, so that month's spending should include it, even though the bill is coming later.

**The rule.** At period end, record expenses already incurred but not yet invoiced: debit the expense, credit Accrued Expenses (2060, a liability). On the first day of the next period, reverse the accrual. When the real bill arrives, book it normally (debit expense, credit AP). The reversal prevents counting the cost twice.

**Worked example.** BoBo used an estimated $620 of AWS in December 2026; the invoice arrives on January 8, 2027 for $634.50.

| Date | Account | Debit | Credit |
|------|---------|------:|-------:|
| 2026-12-31 | 6120 Software Subscriptions – Productivity | 620.00 | |
| 2026-12-31 | 2060 Accrued Expenses | | 620.00 |
| 2027-01-01 | 2060 Accrued Expenses | 620.00 | |
| 2027-01-01 | 6120 Software Subscriptions – Productivity | | 620.00 |
| 2027-01-08 | 6120 Software Subscriptions – Productivity | 634.50 | |
| 2027-01-08 | 2010 Accounts Payable | | 634.50 |

December shows $620 of expense. January shows −$620 + $634.50 = $14.50, the variance from the estimate. That is acceptable when the difference is small; for a large difference, adjust the December estimate instead.

> [!warning] Common mistake
> Waiting for the invoice before recording the cost. December profit is then overstated and January looks unusually expensive.

```knowledge-quiz
schemaVersion: 1
quizId: "480166e8-aec4-479e-8c0d-5ba89c760324"
title: "Checkpoint — discounts and accruals"
questionBankId: "b0587ae4-e089-4e75-9ef7-b07507b0eac3"
questionIds:
  - "ecbe8e3b-bdc9-482b-8aa0-a983ed3b2aa7"
  - "afce2e99-ab1c-4b30-8fc7-0bd50bf33003"
```

## Step 5 — Aging reports and AI-assisted invoice reading

**In plain language.** An AP aging report lists unpaid bills grouped by how long they have waited, so the controller sees what is late and what cash is needed. Newer tools can also read invoice PDFs automatically, which is fast but needs strict controls.

**Analogy.** Aging is a produce shelf sorted by freshness; the oldest items need attention first. The AI reader is a fast junior clerk whose work you still review.

**The rules.**

- Aging buckets are commonly 0–30, 31–60, 61–90 and 90+ days. Companies age from either the invoice date or the due date; pick one policy and apply it consistently. This lesson ages by days past the due date.
- Guardrails for AI reading invoices: return null instead of guessing a missing field; cite where each field came from; send low-confidence fields to a person; keep a human approving before anything posts; log the model, prompt, output and decision; never let the model change vendor bank details; run the duplicate check after extraction; and quarantine documents that might not be invoices.

**Worked example.** As of May 16, 2026, Google Ads invoice GA-77104 ($2,300) was due May 1, so it is 15 days past due and sits in 0–30. Canva CNV-2210 ($119.99) was due April 9, so it is 37 days past due and sits in 31–60.

> [!warning] Common mistake
> Letting an AI tool post invoices that "look clean". It can still misread a field or miss a duplicate; a person approves before money moves.

```knowledge-quiz
schemaVersion: 1
quizId: "35c27a1a-9c4c-4e0a-9a10-3940b6a00d7f"
title: "Checkpoint — aging and AI guardrails"
questionBankId: "b0587ae4-e089-4e75-9ef7-b07507b0eac3"
questionIds:
  - "f2ae7e83-8fd9-43d5-a20f-1606234bb4bc"
  - "37402f2e-4364-4899-a93a-3e0ba59a6921"
```

## Try it

Build an aging report as of May 16, 2026, grouped by days past the due date, for these four unpaid, approved BoBo bills:

| Vendor | Invoice | Amount | Due date |
|--------|---------|-------:|----------|
| Google Ads | GA-77104 | 2,300.00 | 2026-05-01 |
| Canva Pro | CNV-2210 | 119.99 | 2026-04-09 |
| Office Cleaner Co. | OCC-441 | 480.00 | 2026-03-07 |
| LegalZoom | LZ-5560 | 1,200.00 | 2026-02-11 |

Compute days past due for each, place it in a bucket, total each bucket, and say which buckets need urgent attention.

> [!example]- Sample solution
> Days past due on May 16: Google Ads 15, Canva 37, Office Cleaner 70, LegalZoom 94.
>
> | 0–30 | 31–60 | 61–90 | 90+ | Total |
> |-----:|------:|------:|----:|------:|
> | 2,300.00 | 119.99 | 480.00 | 1,200.00 | 4,099.99 |
>
> The 61–90 and 90+ buckets total $1,680.00 and need urgent attention. LegalZoom at 94 days should be paid or its dispute resolved this week.

## Key takeaways

- Recording a bill debits an expense and credits AP; paying it debits AP and credits Cash.
- A three-way match compares the PO, the receiving document and the invoice before payment.
- Search for duplicates by invoice number and by vendor, amount and date, and hold any second copy until the vendor confirms.
- Never change vendor bank details from an email; verify by phone at a known number with a second approver.
- 2/10 Net 30 means 2% off if paid within 10 days, which is worth about 36–37% a year.
- Accrue unbilled expenses at period end, reverse them next period, and let AI propose entries while a person approves.

## Explain it back

In your own words, explain how the three-way match, the duplicate search and the approval step each stop money from leaving the company wrongly.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "53c5fae1-919c-4b5b-8b66-5939fdd1d6b7"
title: "Chapter quiz — Accounts Payable Workflow"
questionBankId: "b0587ae4-e089-4e75-9ef7-b07507b0eac3"
questionIds:
  - "ac6a48d4-17b7-4b9c-8670-c215775b910b"
  - "63bb31b7-0062-40f9-b571-f95194b4447e"
  - "735fc27a-4330-4ce8-a434-ba56b892ae4e"
  - "bd41c176-a51b-4908-ab0f-d33e34f2bd6b"
  - "1f8e20e5-c2b5-4814-9635-cb3c092c23a6"
  - "1591863a-4933-48f6-a1b2-0a0821bd527d"
```

Next: [[courses/accounting-ai-crash-course/lessons/08-accounts-receivable|Next lesson]]

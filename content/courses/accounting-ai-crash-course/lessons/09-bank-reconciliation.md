---
id: "9bdf0558-00ca-4087-a9b2-f3dc5a8185e2"
title: "Bank Reconciliation: Explaining Why Two Records Differ"
description: "Learn to tie the bank statement balance and the book cash balance to one adjusted number, and to decide which differences need a journal entry."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 9
estimatedMinutes: 40
---

## Why this matters

Cash is the asset most exposed to error and theft, and every month-end close depends on it being reconciled. Auditors usually ask for the bank reconciliation early, and a wrong cash figure makes the rest of the financial statements hard to trust. A reconciliation that is forced to match with a plug hides exactly the problems it exists to catch. This chapter follows the fictional BoBo Digital Services LLC; all figures are sample data.

## What you'll be able to do

- Explain why the bank statement and the general ledger cash balance rarely match on the last day of the month.
- Decide whether a reconciling item is a bank-side timing item or a book-side item that needs an entry.
- Calculate the adjusted bank balance and the adjusted book balance, and confirm they tie.
- Write the adjusting entries for bank fees, NSF returns, interest, processor fees and recording errors.
- Diagnose an unexplained difference without plugging it.

## Before you start

- In your own words, what is the difference between cash basis and accrual accounting?
- When a business records a sale to a customer on account, which account does it debit?
- Why does every journal entry need a source document?

Review: [[courses/accounting-ai-crash-course/lessons/08-accounts-receivable|Previous lesson]]

## Step 1 — Two diaries of the same money

**Plain language.** The bank keeps one diary of your cash (the statement) and you keep another (the general ledger cash account). They record the same story but see it at different moments, so they rarely agree on the last day of the month. Your job is to explain every dollar of the gap, not to force the two to match.

**Analogy.** You write down a $40 dinner on Friday. The card statement shows it on Monday and also shows a $3 foreign-transaction fee you did not know about. The dinner is a timing difference; the fee is something your notebook is missing.

**The rule.** A bank reconciliation compares the ending balance per the bank statement with the ending balance per the books and arrives at one adjusted cash balance. Differences fall into two buckets:

- **Bank side (timing):** items the books already recorded but the bank has not processed yet, such as outstanding checks and deposits in transit. They clear on their own next period and need no entry.
- **Book side (needs an entry):** items the bank already processed but the books have not, such as fees, NSF returns, interest, processor fees and recording errors. Each one needs an adjusting entry.

**Worked example.** At April 30, BoBo's books show $48,500 and the Pacific Bank statement shows $46,820, a gap of $1,680. A $2,400 Stripe payout was started on April 30 but posted by the bank on May 1; that is a deposit in transit, so the books are right and no entry is made. Checks #1042 ($800), #1045 ($400) and #1046 ($300) have not cleared, so they are outstanding checks that also need no entry.

> [!warning] Common mistake
> Thinking every difference needs a journal entry. Outstanding checks and deposits in transit are already on the books; booking them again would double count them.

## Step 2 — Book-side items and their entries

**Plain language.** Book-side items are things the bank knows and you do not yet. The books must catch up with the bank.

**Analogy.** Your notebook is missing the $3 card fee. You do not argue with the card company; you update the notebook.

**The rule.** Each book-side item has a standard entry, and in each case cash is the account that changes:

- Bank fee: debit Bank Fees Expense, credit Cash.
- Processor fee (such as Stripe): debit Stripe Processing Fees, credit Cash.
- Interest credited by the bank: debit Cash, credit Interest Income.
- NSF (returned) customer payment: debit Accounts Receivable, credit Cash, because the customer still owes the money.
- Book recording error: debit or credit the correct account for the difference, with the opposite side to Cash.

**Worked example.** BoBo's April books also need these entries:

- Bank service fee: debit Bank Fees $30, credit Cash $30.
- Stripe fees netted out of payouts, never booked: debit Stripe Processing Fees $450, credit Cash $450.
- A returned ACH from a customer: debit Accounts Receivable $100, credit Cash $100.
- Check #1039 recorded as $250 but cleared at $350: debit the expense $100, credit Cash $100.
- A wire fee of $100 on a 4/22 vendor wire: debit Bank Fees $100, credit Cash $100.

**A better habit for processors.** Record gross sales to a Stripe Clearing account, book the fee when it hits, and clear the balance when the net payout arrives. If Stripe pays out $97 on a $100 sale, the payout entry debits Cash $97 and Stripe Processing Fees $3 and credits Stripe Clearing $100.

> [!warning] Common mistake
> Forgetting processor fees. Sales are booked at gross, but only the net lands in the bank, so cash is overstated until the fee is booked.

```knowledge-quiz
schemaVersion: 1
quizId: "9934e019-9a7d-4266-b3f6-b016c78088e8"
title: "Checkpoint: bank side vs book side"
questionBankId: "ec17c6b0-89dd-4a2c-8073-29fcf04ff927"
questionIds:
  - "b2a15794-8d63-4aa1-b301-693d9ed1f476"
  - "488443c5-3e33-45fd-88ca-1d39bcbcf08a"
```

## Step 3 — Build the two-sided worksheet

**Plain language.** Put the bank on the left and the books on the right. Adjust each side for its own reconciling items. If you did it right, both sides land on the same number.

**Analogy.** Two people count the same pile of cash using different methods. When both correct for what they missed, their totals agree.

**The rule.** On the bank side, add deposits in transit and subtract outstanding checks. On the book side, subtract fees, processor fees, NSF items and errors that overstated cash, and add interest and errors that understated cash. The result of each side is its adjusted balance, and the two must agree. That agreed number is the cash figure for the balance sheet.

**Worked example.** BoBo's April 30 workpaper:

| Bank side | Amount | Book side | Amount |
|---|---:|---|---:|
| Balance per bank | $46,820 | Balance per books | $48,500 |
| Add deposit in transit | 2,400 | Less bank service fee | (30) |
| Less check #1042 | (800) | Less Stripe fees | (450) |
| Less check #1045 | (400) | Less NSF return | (100) |
| Less check #1046 | (300) | Less wire fee | (100) |
| | | Less check #1039 error | (100) |
| **Adjusted bank** | **$47,720** | **Adjusted book** | **$47,720** |

Bank: 46,820 + 2,400 - 800 - 400 - 300 = 47,720. Books: 48,500 - 30 - 450 - 100 - 100 - 100 = 47,720. The gap is $0, so the rec ties, and $47,720 is April's cash.

> [!warning] Common mistake
> Adjusting the wrong side. Reconciling items on the bank side change the bank balance only, and book-side items change the book balance only.

```knowledge-quiz
schemaVersion: 1
quizId: "c0a0f93a-e360-4f56-a2a4-74be716d0972"
title: "Checkpoint: the worksheet"
questionBankId: "ec17c6b0-89dd-4a2c-8073-29fcf04ff927"
questionIds:
  - "6de169d1-cb1c-4ad4-ba54-9f1e0c40329b"
  - "cee8fa38-d32b-4b89-a071-30735db68df2"
```

## Step 4 — When it will not tie: investigate, never plug

**Plain language.** Real reconciliations rarely tie on the first pass. You find items one at a time by pulling source documents. When a gap remains, you keep investigating.

**Analogy.** A detective does not stop at a suspect who almost fits. The leftover difference is the clue.

**The rule.** Never plug a difference to make the rec tie. Trace individual transactions, not just ending balances, to their source documents. If something remains unexplained, document what you checked and escalate it. Review aged outstanding checks every month too, since old uncashed checks may be lost or may fall under state unclaimed property rules, which vary by state.

**Worked example.** BoBo's April first pass left a $200 gap: adjusted books showed $47,920 against an adjusted bank balance of $47,720. Re-checking cleared-check images found check #1039 booked at $250 but cleared at $350, which explained $100. Re-ticking the check register and the bank debits against the books found a $100 wire fee that was never booked, which explained the other $100. Each find came from a source document, and the rec tied at $47,720 with no plug.

In the course case study, BoBo's May first-pass worksheet was $2,300 apart (illustrative figures): the adjusted bank balance was $54,333 and the adjusted book balance was $56,633. Ticking each Stripe payout to the bank and the Stripe report found a manual $2,300 estimate with no bank deposit that was never reversed when the real $2,800 payout came in. Reversing it (debit Service Revenue, credit Cash, $2,300) brought the books to $54,333 and tied the rec.

> [!warning] Common mistake
> Plugging a small gap to Miscellaneous Expense. If you cannot explain $50 today, you will not be able to explain $50,000 later.

```knowledge-quiz
schemaVersion: 1
quizId: "923a873f-ed56-4e93-94b2-7bf785469010"
title: "Checkpoint: investigating differences"
questionBankId: "ec17c6b0-89dd-4a2c-8073-29fcf04ff927"
questionIds:
  - "75a52a76-9bee-4429-bfa5-a44a83be6797"
  - "5c9acb84-c843-4a60-a3a3-4461c770397b"
```

## Try it

BoBo's bank statement at June 30 shows $12,000. The books show $12,160. A $900 customer deposit was made June 30 and does not appear on the statement. Checks of $450 and $300 have not cleared. The bank charged a $20 service fee and credited $10 of interest, and neither is on the books. Find the adjusted bank and adjusted book balances, write the entries, and say whether the rec ties.

> [!example]- Sample solution
> Adjusted bank = 12,000 + 900 - 450 - 300 = 12,150.
> Adjusted book = 12,160 - 20 + 10 = 12,150.
> Both sides are $12,150, so the rec ties.
> Entries: debit Bank Fees $20, credit Cash $20; and debit Cash $10, credit Interest Income $10. The deposit in transit and the two checks need no entry.

## Key takeaways

- A bank reconciliation explains why two reliable records differ; it does not force them to match.
- Bank-side items (outstanding checks, deposits in transit) are timing differences and need no entry.
- Book-side items (fees, interest, NSF, processor fees, recording errors) need adjusting entries.
- The adjusted bank balance and the adjusted book balance must agree, and that number is the cash figure.
- Processor fees are a commonly missed item, and a clearing account makes them visible.
- Never plug: investigate, document and escalate.

## Explain it back

In your own words, explain how a bank reconciliation works and why bank-side items need no entry while book-side items do.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "fdfa67c3-16d1-4299-9f5e-9d53f79f0542"
title: "Chapter quiz: bank reconciliation"
questionBankId: "ec17c6b0-89dd-4a2c-8073-29fcf04ff927"
questionIds:
  - "60483938-fec7-47cc-888e-174f686dbd4e"
  - "0a59df97-08ef-4075-af45-ff7fffc20bcd"
  - "a62c60b6-4d2a-4eef-92ba-a26ca267d20d"
  - "c2883441-780a-4d0a-941d-87909e88185a"
  - "f35f436b-8674-40fc-ba85-8db4a8786e74"
  - "3780776b-450b-43c1-9bcf-86ca17658e0c"
```

Next: [[courses/accounting-ai-crash-course/lessons/10-credit-card-reconciliation|Next lesson]]

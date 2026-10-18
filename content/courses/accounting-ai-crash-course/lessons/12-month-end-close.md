---
id: "a072aa8a-f254-46a7-875f-32f5d5ec4035"
title: "Month-End Close Checklist"
description: "Run a repeatable five-day month-end close for BoBo Digital Services LLC, from cutoff to a locked, tied-out set of financial statements."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
  - month-end-close
  - reconciliation
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 12
estimatedMinutes: 50
---

## Why this matters

Owners, banks and tax preparers all rely on the numbers that come out of the monthly close. A sloppy close means wrong profit, wrong taxes and awkward conversations with a lender. Managers judge a junior accountant less by how much GAAP they can recite and more by whether the reconciliations arrive on time, tie to the ledger and come with support. Closing the books is the moment theory meets the calendar.

## What you'll be able to do

- Explain the close as an ordered sequence: cutoff, reconcile, adjust, review, report, lock.
- Calculate a bank reconciliation and the monthly adjusting entries for BoBo's December close.
- Decide what to do when a subledger, a variance or a late bill does not behave.
- Diagnose why a post-adjustment trial balance or balance sheet fails to tie.
- Build a close tracker with an owner, a workpaper and a sign-off for every step.

## Before you start

Try to answer these from memory first. They have no answers here on purpose.

- What is the difference between cash basis and accrual basis, and which one does BoBo use?
- Why does an annual prepayment sit on the balance sheet before it becomes an expense?
- What does it mean when a subledger total disagrees with its general ledger control account?

If these feel shaky, revisit [[courses/accounting-ai-crash-course/lessons/11-adjusting-entries|Previous lesson]] first.

## Step 1 — Cutoff and data pull (Day 1)

**In plain language.** Closing the books means saying, "As of the 31st, this is what we earned, spent, owned and owed. We checked it, supported it and we are not changing it." Before you can say that, you need a clean boundary and all the raw material in one place.

**Analogy.** Think of a pilot's preflight checklist. The pilot does not trust a feeling that the plane is ready; they run the list line by line, every time. Day 1 is walking up to the plane with the list in your hand.

**The rule.** *Cutoff* is the rule that revenue and expense belong in the period they were earned or incurred, not when cash moved. A close is a sequence, not a sprint: you cannot report before you have adjusted, and you cannot adjust well before you have reconciled.

**Worked example.** On Day 1 of BoBo's December close you:

1. email Bo asking for anything dated December 31 or earlier by end of day;
2. download the December bank and credit card statements and file them in a folder such as `/close/2025-12/01_bank/`;
3. run the pre-adjustment trial balance as of 12/31 and save it as `TB_pre_adj_2025-12.xlsx`;
4. pull the AR aging, AP aging, prepaid schedule, deferred revenue schedule and fixed-asset register;
5. restrict posting to December for non-finance users (a soft lock) and build the close tracker.

> [!warning] Common mistake
> Closing too early, before the bills and invoices have arrived. Missing cutoff items land in the wrong month and understate expense, so wait for the agreed cutoff window and send the cutoff email.

## Step 2 — Reconcile and investigate (Days 2 and 3)

**In plain language.** A reconciliation proves that a number in your ledger agrees with an independent source, such as a bank statement, a card statement or a vendor statement. Subledgers (the AR and AP detail) are tied to their control accounts in the general ledger.

**Analogy.** It is like checking your own receipt pile against the card statement before you pay it. If they disagree, you do not scribble a difference in the margin; you find the missing receipt.

**The rule.** *Investigate, don't plug.* A difference, even a small one, is a clue. You trace it to a cause, record the correct entry and document it. A reconciliation without support is just a guess.

**Worked example: BoBo's bank rec.**

| Line | Amount |
|---|---|
| GL cash before adjustments | $42,508.18 |
| Less bank fees not yet booked | −$60.00 |
| **Adjusted GL balance** | **$42,448.18** |
| Bank statement ending balance | $39,255.93 |
| Plus deposit in transit | +$4,088.00 |
| Less outstanding checks ($510.00 + $385.75) | −$895.75 |
| **Adjusted bank balance** | **$42,448.18** |

The two adjusted figures agree. The $60 fee is the only entry needed: debit Bank Fees $60, credit Cash $60. Outstanding checks and the deposit in transit need no entry because the ledger already has them.

On Day 3 the same discipline applies to AR and AP. In the source example, the AR subledger was off by $342; tracing it found a duplicate invoice, which was voided and documented.

> [!warning] Common mistake
> Forcing the balance by plugging the difference into an expense or suspense line. It makes the page tie while hiding a real error, and it sets a precedent.

```knowledge-quiz
schemaVersion: 1
quizId: "2efa320f-5ba7-43ff-abe9-e1e9a274b6a6"
title: "Checkpoint: cutoff and reconciliation"
questionBankId: "c0c66352-f119-407c-be5e-e401e5a0a151"
questionIds:
  - "64066268-22b1-4f9b-979e-b96e8588824d"
  - "39d19966-6b99-41f9-9d0b-137729ba0f4c"
```

## Step 3 — Adjusting entries (Day 4)

**In plain language.** After the reconciliations, you record the economic events nobody else booked: expenses incurred but not billed, the monthly use of prepaid items, wear on equipment, revenue earned from advance payments, and wages earned but unpaid.

**Analogy.** If the reconciliations are checking the receipts you have, adjustments are recording the things you know happened but have no receipt for yet, like electricity you used in December that gets billed in January.

**The rule.** Each adjusting entry touches one balance sheet account and one income statement account (or two balance sheet accounts), never just one side. Every entry carries a memo that says what and why, a workpaper reference and a source-document location.

**Worked example: BoBo's December adjustments, all dated 12/31.**

| Entry | Debit | Credit | Amount |
|---|---|---|---|
| Contractor work done in December, invoice not yet received | Contractor Costs | Accrued Expenses | $1,800.00 |
| Annual insurance policy ($2,400 per year, one month) | Insurance Expense | Prepaid Insurance | $200.00 |
| Annual software plan ($660 per year, one month) | Software Expense | Prepaid Software | $55.00 |
| Straight-line depreciation (laptop $125 + camera $112 + furniture $75) | Depreciation Expense | Accumulated Depreciation | $312.00 |
| Monthly portion of three annual-plan clients | Customer Deposits / Unearned Revenue | Service Revenue | $4,500.00 |
| Wages earned 12/29 to 12/31, paid in January | Wages Expense | Accrued Payroll | $1,440.00 |
| Employer FICA on those wages (7.65%) | Payroll Taxes Expense | Accrued Payroll Taxes | $110.16 |
| Notion charge sitting in suspense | Software Expense (Productivity) | Ask My Accountant (suspense) | $89.00 |

Two traps from the source solution key. First, the December utility bill: an estimate of $185 and the actual bill of $204 describe the same expense, so you book the actual $204 to Accounts Payable and skip the estimate rather than booking both. Second, the unbilled contractor work goes to Accrued Expenses, not Accounts Payable, because no invoice has arrived yet.

> [!warning] Common mistake
> Reversing a prepaid entry. Debiting Prepaid Insurance and crediting Cash records a new prepayment; amortizing one is debit Insurance Expense, credit Prepaid Insurance.

```knowledge-quiz
schemaVersion: 1
quizId: "1736fa58-b18b-46f4-a254-461e9d9b6060"
title: "Checkpoint: adjusting entries"
questionBankId: "c0c66352-f119-407c-be5e-e401e5a0a151"
questionIds:
  - "d4700451-84fb-4dbf-a361-27f2ecb66a41"
  - "4e2779b7-3ac1-4d60-85fb-4d8148df6e22"
```

## Step 4 — Review, variance and financial statements (Day 5)

**In plain language.** Now you rerun the trial balance, look for anything odd, compare the month with earlier periods, and produce the statements. Anything that looks wrong is wrong until proven otherwise.

**Analogy.** It is the proofreading pass after the draft is written: not rewriting the essay, but asking whether each sentence makes sense next to the others.

**The rule.** Rerun the trial balance and confirm debits equal credits. Scan it for wrong-signed balances, suspense accounts and suspiciously round numbers. Run variance analysis against the prior month, prior year and budget, and explain every line above your threshold (the source uses more than 10% or more than $500). Then tie every statement line back to the trial balance.

**Worked example: BoBo's result.**

| Item | Amount |
|---|---|
| Net income before adjustments | $18,911.63 |
| Net effect of the adjusting entries, the actual utility bill and the $60 bank fee | +$229.84 |
| **December net income** | **$19,141.47** |

The $229.84 is +$4,500 deferred revenue release, then −$1,800 contractor, −$204 utilities, −$200 insurance, −$55 software, −$312 depreciation, −$1,440 wages, −$110.16 payroll tax, −$89 reclass and −$60 bank fee. Total assets of $91,782.18 equal total liabilities plus equity of $91,782.18, so the balance sheet ties. If yours does not, retrace the entries rather than adjusting an arbitrary line.

> [!warning] Common mistake
> Expecting revenue to equal the AR balance. Revenue is a flow for the period and AR is a balance at a date; the right check is beginning AR plus billings minus collections equals ending AR.

## Step 5 — Sign-off, lock and communication

**In plain language.** The last job is to prove the work, hand it over and close the door so nobody quietly changes December later.

**Analogy.** It is the cabin door on the plane. Once the checklist is done and signed, you lock it, and reopening requires someone with authority.

**The rule.** Every workpaper carries a source, a tickmark legend and preparer and reviewer sign-off. Tickmarks (for example a check mark for agreed to the ledger, or a circled plus for agreed to the statement) show what was checked and how. After the controller's review, set the close date in the accounting system and password-protect it. Only the controller reopens a closed period, with the reason documented.

**Worked example.** A $1,200 bill dated December 15 shows up after the lock. You do not unlock December yourself. You ask the controller to choose between reopening December with documented approval, which suits material items, or posting to January with a missed-cutoff memo. If Bo needs numbers before the close is done, send a draft clearly watermarked as pre-adjustment, list what is not yet booked, and document the decision.

Two AI guardrails from the source apply here: AI can draft variance commentary but must cite accounts and amounts, and a human reviews, signs and posts. AI never signs a workpaper or posts an entry.

> [!warning] Common mistake
> Reopening a closed period without controls. It defeats the purpose of the lock and corrupts reports that others already relied on.

```knowledge-quiz
schemaVersion: 1
quizId: "525c6bfd-30e1-412d-9df6-b9ff5967d2fe"
title: "Checkpoint: review and lock"
questionBankId: "c0c66352-f119-407c-be5e-e401e5a0a151"
questionIds:
  - "8eabda3e-9d0b-4e5c-9552-80d29447daf8"
  - "7a939c17-c9a9-4945-a04f-85ff5f3298fb"
```

## Try it

Build a one-page close tracker for BoBo's December close. Include these columns: step, day, task, owner, prepared by, reviewed by, workpaper and status. Fill in at least one task for each of the five days, and add a status of Not Started, In Progress, Blocked or Complete. Then write the memo, workpaper reference and source for the contractor accrual entry.

> [!example]- Sample solution
> | Step | Day | Task | Owner | Prepared by | Reviewed by | Workpaper | Status |
> |---|---|---|---|---|---|---|---|
> | 1 | D1 | Send cutoff email; soft lock posting | Junior | Junior | Junior | Email and screenshot | Complete |
> | 2 | D2 | Bank rec: $42,448.18 adjusted on both sides | Junior | Junior | Senior | 04_bank_rec.xlsx | Complete |
> | 3 | D3 | Tie AR and AP subledgers to the GL | Junior | Junior | Senior | 06_AR_tie.xlsx | In Progress |
> | 4 | D4 | Accrue $1,800 contractor cost | Junior | Junior | Senior | 10_accruals.xlsx | Not Started |
> | 5 | D5 | Rerun TB; variance analysis; lock close date | Senior | Junior | Controller | 18_variance.xlsx | Not Started |
>
> Contractor accrual entry dated 12/31: debit Contractor Costs $1,800, credit Accrued Expenses $1,800. Memo: "Accrue December contractor work, invoice received 1/4. WP 10." Source: the contractor's invoice saved in the support folder.

## Key takeaways

- Close is a sequence: cutoff, reconcile, adjust, review, report, lock. Order is the whole game.
- Cutoff means expense and revenue belong to the period incurred or earned, not the period paid.
- If you cannot show the support, you did not do the work; every workpaper has a source, a tickmark legend and sign-off.
- Investigate, don't plug: a small difference is a clue, not a rounding error.
- Each adjusting entry must touch two accounts, and every entry needs a memo, a workpaper reference and a source location.
- Locking the close date stops back-dated entries, and only the controller reopens a period.

## Explain it back

In your own words, describe in order how you would close BoBo's December books, from cutoff to lock, and why the order matters.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "9f3b801f-74db-48e8-8744-6805ee904900"
title: "Chapter quiz: month-end close"
questionBankId: "c0c66352-f119-407c-be5e-e401e5a0a151"
questionIds:
  - "199a49ae-333a-4ba7-a179-4115a1faaebe"
  - "09b46e46-215d-409e-bb19-d202dcafde51"
  - "3383555c-060a-4a5f-966f-381e37c955f0"
  - "4071c29c-c4a9-4a28-b2e2-edb1e05c21b4"
  - "8cf8c5e5-bea4-419b-9f56-388198c7ed86"
  - "c434d8c1-31c7-4c91-b1cd-95dad6044cfd"
```

Next: [[courses/accounting-ai-crash-course/lessons/13-income-statement|Next lesson]]

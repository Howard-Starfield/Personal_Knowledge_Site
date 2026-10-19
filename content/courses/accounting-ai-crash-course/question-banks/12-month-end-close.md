---
id: "c0c66352-f119-407c-be5e-e401e5a0a151"
title: "Month-End Close Checklist Question Bank"
description: "Practice questions for Month-End Close Checklist."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC December close; every figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "199a49ae-333a-4ba7-a179-4115a1faaebe"
    revision: 1
    status: active
    type: single-choice
    prompt: "A junior wants to post accruals on Day 1 and reconcile the bank on Day 4 to save time. Why is that order risky?"
    options:
      - id: speed
        text: "Bank statements arrive too late to use on Day 1"
      - id: fees-first
        text: "The bank rec can reveal unbooked fees that change expenses"
      - id: cash-only
        text: "Accruals may only be posted to accounts that hold cash"
      - id: reviewer
        text: "The senior reviews cash before any other account is touched"
    correctOptionIds: [fees-first]
    explanation: "Reconciling often produces entries, such as bank fees, NSF items or interest, that change expenses and net income, so those must be booked before the period's results are final. The idea that accruals touch only cash accounts is tempting but wrong, because accruals hit expense and liability accounts."
  - id: "09b46e46-215d-409e-bb19-d202dcafde51"
    revision: 1
    status: active
    type: single-choice
    prompt: "On January 6, Bo forwards an electric bill dated December 28 for $204 covering December service. December is not yet locked. What is the right treatment?"
    options:
      - id: dec-ap
        text: "December: debit Utilities, credit Accounts Payable"
      - id: jan-post
        text: "Record it in January, because that is when the bill arrived"
      - id: dec-cash
        text: "Record it in December: debit Utilities, credit Cash for $204"
      - id: suspense
        text: "Park it in the suspense account until the January close"
    correctOptionIds: [dec-ap]
    explanation: "Cutoff follows when the service was used, not when the paper arrived, so the expense belongs in December and the unpaid bill is a payable. Posting it in January is the common mistake, and it would understate December expense and overstate January."
  - id: "39d19966-6b99-41f9-9d0b-137729ba0f4c"
    revision: 1
    status: active
    type: single-choice
    prompt: "The AR aging totals $42,300 but the general ledger AR balance is $41,958. What should you do first?"
    options:
      - id: adjust-gl
        text: "Post a $342 entry to the ledger so it matches the aging"
      - id: edit-aging
        text: "Edit the aging report so it matches the ledger balance"
      - id: compare
        text: "Compare aging and ledger detail line by line for the cause"
      - id: expense-it
        text: "Write the $342 off to expense because it is a small gap"
    correctOptionIds: [compare]
    explanation: "A subledger that does not tie to its control account means a transaction is on one side only or was posted wrongly, so you trace it before changing anything. Forcing the ledger to match the aging is tempting, but it hides the real error, such as a duplicate or voided invoice."
  - id: "d4700451-84fb-4dbf-a361-27f2ecb66a41"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo prepaid $660 for a one-year software plan. Which entry records one month of use at close?"
    options:
      - id: prepay-up
        text: "Debit Prepaid Software $55 and credit Software Expense $55"
      - id: cash-out
        text: "Debit Software Expense $55 and credit Cash $55 each month"
      - id: full-year
        text: "Debit Software Expense $660 and credit Prepaid Software $660"
      - id: amortize
        text: "Debit Software Expense $55 and credit Prepaid Software $55"
    correctOptionIds: [amortize]
    explanation: "One month of a $660 annual plan is $55, which moves from the prepaid asset into expense. The reversed entry is a frequent slip that would grow the asset instead of using it up."
  - id: "4e2779b7-3ac1-4d60-85fb-4d8148df6e22"
    revision: 1
    status: active
    type: single-choice
    prompt: "Three days of wages, $1,440, were earned through December 31 but will be paid in January. What employer-side FICA accrual belongs with them at 7.65%?"
    options:
      - id: ss-only
        text: "$89.28, which treats only Social Security as owed"
      - id: both-sides
        text: "$220.32, which doubles the rate to 15.3 percent"
      - id: employer
        text: "$110.16, which is 7.65 percent of the wages"
      - id: flat-ten
        text: "$144.00, which uses a flat 10 percent rate"
    correctOptionIds: [employer]
    explanation: "Employer FICA is 7.65 percent of wages, and $1,440 times 0.0765 is $110.16. The $220.32 answer is tempting because 15.3 percent is the combined employer and employee rate, but employee withholding reduces net pay and is not an extra employer expense."
  - id: "8eabda3e-9d0b-4e5c-9552-80d29447daf8"
    revision: 1
    status: active
    type: single-choice
    prompt: "December revenue is 38 percent above November, and Bo wants the financials by lunch. What is your best next move?"
    options:
      - id: pull-detail
        text: "Pull revenue detail and explain the jump with sources"
      - id: send-note
        text: "Send them now with a note that sales grew strongly"
      - id: trim
        text: "Lower December revenue until it looks closer to the trend"
      - id: skip
        text: "Skip review, since higher revenue is simply good news"
    correctOptionIds: [pull-detail]
    explanation: "Large swings must be explained before anyone outside the close sees them, so you check new clients, the deferred revenue release and one-off invoices. Treating growth as good news is tempting, but an unexplained jump may be a cutoff or posting error."
  - id: "7a939c17-c9a9-4945-a04f-85ff5f3298fb"
    revision: 1
    status: active
    type: single-choice
    prompt: "December was locked yesterday. Today a $1,200 vendor bill dated December 15 appears. What should you do?"
    options:
      - id: unlock-self
        text: "Lift the lock yourself and back-date it into December"
      - id: escalate
        text: "Ask the controller to choose between reopening and January"
      - id: jan-quiet
        text: "Post it in January with no note so nobody is bothered"
      - id: wait-year
        text: "Hold it until year end and post it with the other adjustments"
    correctOptionIds: [escalate]
    explanation: "A closed period is changed only by the controller, who decides based on materiality and policy whether to reopen December or post to January with a missed-cutoff memo. Unlocking it yourself is the tempting shortcut, but it defeats the purpose of the lock."
  - id: "64066268-22b1-4f9b-979e-b96e8588824d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which tasks belong on Day 1 (cutoff and data pull) of the close? Select every correct answer."
    options:
      - id: deferred
        text: "Release the monthly deferred revenue"
      - id: cutoff-email
        text: "Send the cutoff email asking for documents"
      - id: statements
        text: "Download the bank and credit card statements"
      - id: pre-tb
        text: "Run the pre-adjustment trial balance"
      - id: final-lock
        text: "Password-protect the final close date"
    correctOptionIds: [cutoff-email, statements, pre-tb]
    explanation: "Day 1 gathers the raw material: a cutoff request, statements and the trial balance before adjustments. Releasing deferred revenue is a Day 4 adjustment, and the final password-protected lock is the last step on Day 5, even though a soft lock for non-finance users can start earlier."
  - id: "3383555c-060a-4a5f-966f-381e37c955f0"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A reviewer must be able to follow your reconciliation without asking you questions. Which items belong on the workpaper? Select every correct answer."
    options:
      - id: initials
        text: "Preparer and reviewer initials with dates"
      - id: plug
        text: "A balancing line that absorbs small differences"
      - id: legend
        text: "A tickmark legend explaining each symbol used"
      - id: source
        text: "A reference to the bank or vendor source document"
      - id: totals
        text: "Only the final totals, with detail kept in your head"
    correctOptionIds: [initials, legend, source]
    explanation: "A workpaper proves what was checked, by whom and against what, which is why initials, a tickmark legend and the source reference matter. A balancing line is tempting for tidiness, but plugging hides errors and a workpaper with no detail cannot be audited."
  - id: "4071c29c-c4a9-4a28-b2e2-edb1e05c21b4"
    revision: 1
    status: active
    type: true-false
    prompt: "December revenue on the income statement should equal the AR aging total, so any gap between them signals an error."
    answer: false
    explanation: "Revenue is a flow measured over the month, while AR is a balance at one date, so they are not meant to match. The proper check is beginning AR plus revenue billed minus cash collected equals ending AR."
  - id: "8cf8c5e5-bea4-419b-9f56-388198c7ed86"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: describe in order how you would close BoBo's December books, from cutoff to lock, and why the order matters."
    sampleAnswer: "I would start with cutoff and data: send the cutoff request, pull the statements, the pre-adjustment trial balance and the subledgers. Next I reconcile cash and the credit card, then tie AR and AP to the ledger, because those steps can reveal entries to book. Then I post adjustments such as accruals, prepaid amortization, depreciation, deferred revenue release and payroll accrual. After that I rerun the trial balance, scan unusual balances, analyze variances and prepare the statements. Last, the controller reviews and the close date is locked. Order matters because later steps depend on earlier ones, and nothing is final until it is supported and signed off."
    explanation: "A strong answer lists the stages in sequence: cutoff, reconcile, adjust, review and report, then lock. It also gives the dependency reason, for example that reconciling can create entries that must exist before results are final."
  - id: "c434d8c1-31c7-4c91-b1cd-95dad6044cfd"
    revision: 1
    status: active
    type: free-recall
    prompt: "You accrued a $185 utilities estimate, then the actual $204 December bill arrives during the close window. What do you book, and why not both?"
    sampleAnswer: "I would book the actual $204 bill as a debit to Utilities and a credit to Accounts Payable, dated December 31, and skip the $185 estimate. The estimate and the bill are two ways of recognizing the same December expense, so booking both would count it twice. If the estimate had already been posted, I would reverse it. I would also save the bill and cite it in the memo."
    explanation: "The key idea is that an estimate is a placeholder for an expense, so once the real bill is available only one of them stays on the books. Booking both overstates December expense by the estimate amount."
```

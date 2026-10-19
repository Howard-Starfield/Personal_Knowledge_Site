---
id: "34a2172a-b85b-424d-8c87-8cc3b8730072"
title: "Credit Card Reconciliation and Expense Coding Question Bank"
description: "Practice questions for Credit Card Reconciliation and Expense Coding."
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
  - id: "90df4f84-7d7c-4ded-8e8d-21285edae2c4"
    revision: 1
    status: active
    type: single-choice
    prompt: "On May 5 BoBo's company Visa is charged $79.99 for Adobe Creative Cloud. Which entry records the swipe?"
    options:
      - id: cash-out
        text: "Debit Software Subscriptions and credit Cash for $79.99"
      - id: swipe
        text: "Debit Software Subscriptions and credit Credit Card Payable for $79.99"
      - id: reverse
        text: "Debit Credit Card Payable and credit Software Subscriptions for $79.99"
      - id: cash-in
        text: "Debit Cash and credit Credit Card Payable, since the bank lent the money"
    correctOptionIds: [swipe]
    explanation: "A swipe is the moment the expense is incurred and the company starts owing the card issuer, so the entry debits the expense and credits Credit Card Payable. Crediting Cash is tempting because the purchase feels like spending, but no cash leaves the bank until the statement is paid."
  - id: "5b6b94d5-00bd-4623-ab8a-2a073f610892"
    revision: 1
    status: active
    type: single-choice
    prompt: "On June 25 BoBo pays the $1,551.41 Visa statement by ACH from Pacific Bank. What is the correct entry?"
    options:
      - id: re-expense
        text: "Debit each expense account and credit Cash, matching the statement lines"
      - id: flipped
        text: "Debit Cash and credit Credit Card Payable, since the bank is owed"
      - id: pay-down
        text: "Debit Credit Card Payable and credit Cash, with no new expense"
      - id: draws
        text: "Debit Owner Draws and credit Cash, since Bo is repaying the card"
    correctOptionIds: [pay-down]
    explanation: "The expenses were recognized when each charge was swiped, so the payment only retires the liability against cash. Debiting the expense accounts again would double-count every line and push Credit Card Payable toward zero or below."
  - id: "da831265-65e1-4a48-aadd-af267ff5e1a4"
    revision: 1
    status: active
    type: single-choice
    prompt: "A new AP hire codes the software, a client dinner and the Google Ads bill all to Miscellaneous Expense to finish faster. What is the main problem?"
    options:
      - id: no-detail
        text: "The profit and loss can't show spending by category, and meals are taxed differently from software"
      - id: understated
        text: "Credit Card Payable would be understated because catch-all accounts do not feed the liability"
      - id: no-tie
        text: "The statement total would no longer tie to Credit Card Payable, so the reconciliation fails"
      - id: draws-up
        text: "Owner Draws would be overstated because uncategorized lines default to personal spending"
    correctOptionIds: [no-detail]
    explanation: "Coding every line to a catch-all account keeps the total right but destroys the detail owners and tax preparers need, such as the 50 percent limit on meals. The total still ties to the liability, because the credit side of each swipe goes to Credit Card Payable whichever expense account is used."
  - id: "d13819c8-28a9-4894-9300-f78b343b59f4"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $44 Peloton class appears on the Visa. Bo is travelling and has not replied. What is the best action today?"
    options:
      - id: misc
        text: "Code it to Miscellaneous Expense and mention it at year-end"
      - id: wellness
        text: "Code it to an employee wellness benefit, since gyms are common perks"
      - id: hold
        text: "Hold the line off the books until Bo confirms whether it was personal"
      - id: draws
        text: "Code it to Owner Draws and tell Bo, so he can correct it if wrong"
    correctOptionIds: [draws]
    explanation: "A charge that appears personal is coded to Owner Draws right away and flagged to the owner, who can correct it. Leaving it off the books is tempting but wrong, because the issuer will bill the charge and Credit Card Payable must still match."
  - id: "7e944c23-d3c8-45d0-b9c1-bc28c9bb84a1"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two $487.00 Delta JFK-LAX charges post on May 12 and May 29. What is the best first step?"
    options:
      - id: dispute
        text: "Dispute the second charge with Visa as a duplicate straight away"
      - id: ask
        text: "Ask Bo whether these were two trips before disputing anything"
      - id: delete
        text: "Delete the second line, since identical amounts mean a duplicate"
      - id: draws
        text: "Book the second flight to Owner Draws because repeat flights are personal"
    correctOptionIds: [ask]
    explanation: "Seventeen days apart on the same route could be a return flight or a second trip, so you ask before acting. A dispute or a deletion based on a guess could wrongly remove a real expense."
  - id: "23f13c50-4d9b-47ac-a2d2-e1397c44510f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Bo forwards a card slip showing \"Nobu $187.43\" for a client dinner, with no itemized receipt. What is still missing?"
    options:
      - id: itemized
        text: "An itemized receipt, plus attendees and the business purpose"
      - id: nothing
        text: "Nothing, because the slip proves the amount and the vendor"
      - id: memo-only
        text: "Only a memo giving the business purpose, since the slip is the receipt"
      - id: approval
        text: "Approval from the bank before the charge can be coded"
    correctOptionIds: [itemized]
    explanation: "A card slip shows the total but not what was bought, so a meal needs an itemized receipt along with who attended and why. The slip does prove the amount, which is why treating it as the whole receipt is tempting."
  - id: "da92da71-e14b-4764-9a76-bc6a80f3bc56"
    revision: 1
    status: active
    type: single-choice
    prompt: "The Visa statement closed June 3 at $1,551.41 and was still unpaid on June 30. Charges of $890.00 posted between June 4 and June 30. What should Credit Card Payable show on June 30?"
    options:
      - id: statement-only
        text: "$1,551.41, the last printed statement balance"
      - id: new-only
        text: "$890.00, only the charges since the statement closed"
      - id: net
        text: "$661.41, the statement less the newer charges"
      - id: both
        text: "$2,441.41, the statement plus the newer charges"
    correctOptionIds: [both]
    explanation: "The liability at month-end is everything the company owes the issuer on that date, which is the unpaid statement plus the charges posted since. Stopping at the last printed statement is tempting, but it leaves out $890.00 of real expense and debt."
  - id: "673fb913-b235-416a-bfb6-a79f4771130e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statement lines should be queried or parked in a pending tab instead of being coded and posted as clean? Select every correct answer."
    options:
      - id: no-receipt
        text: "A restaurant charge with no itemized receipt on file"
      - id: adobe
        text: "A recurring Adobe charge with its auto-emailed receipt"
      - id: paypal
        text: "A $200 PayPal charge nobody can identify yet"
      - id: amazon
        text: "An Amazon Marketplace charge that might be personal"
      - id: zoom
        text: "A Zoom subscription with a vendor invoice attached"
    correctOptionIds: [no-receipt, paypal, amazon]
    explanation: "A missing itemized receipt, an unidentifiable wrapper such as PayPal and an ambiguous Amazon purchase all lack support or a known purpose, so you ask rather than guess. The Adobe and Zoom lines are tempting to hold because they recur, but each already has its receipt."
  - id: "20f9e225-9672-4f3a-9f80-a81b745a4d26"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements correctly describe a credit card reconciliation? Select every correct answer."
    options:
      - id: cash
        text: "It proves the Cash account matches the issuer's printed statement"
      - id: liability
        text: "It proves Credit Card Payable matches the issuer's unpaid balance"
      - id: timing
        text: "It mainly hunts for deposits in transit and outstanding checks"
      - id: coding
        text: "It also depends on coding accuracy and receipt support per line"
    correctOptionIds: [liability, coding]
    explanation: "A card reconciliation is a liability check against the issuer's balance, and because the issuer feed is timely the effort goes mostly into coding and receipt support. Deposits in transit and outstanding checks belong to a bank reconciliation, which proves the Cash asset instead."
  - id: "27763b4e-169a-4731-8bfb-fb3f1b52a4dd"
    revision: 1
    status: active
    type: true-false
    prompt: "A Notion charge of 15 euros that the issuer posted as $16.22 should be re-converted with your own exchange rate before booking."
    answer: false
    explanation: "The card issuer has already converted the charge, so you book the dollar amount exactly as posted. Any separate foreign transaction fee is its own small line, coded to Bank Fees."
  - id: "653d430d-c1a7-40f3-b7cd-3f6fb7b05447"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain to a friend who is not an accountant how a company card purchase and the later statement payment flow through the books, and why paying the statement is not an expense."
    sampleAnswer: "When someone swipes the company card, two things are recorded at once: the expense for whatever was bought, and a liability called Credit Card Payable for what the company now owes the issuer. Each month the issuer sends a statement. When BoBo pays it, the entry debits Credit Card Payable and credits Cash, so the liability shrinks and the bank balance falls. No new expense is recorded, because the expense was already booked at the swipe and booking it again would count it twice."
    explanation: "A strong answer names both entries, the swipe (expense and liability) and the payment (liability and cash), and says why the payment never touches an expense account. Using a concrete BoBo example shows you can apply the idea instead of reciting it."
  - id: "efae4350-1c0e-46c7-b380-b18ebf0b136a"
    revision: 1
    status: active
    type: free-recall
    prompt: "A cardholder keeps ignoring your requests for an itemized receipt for a $187.43 dinner. Describe what you do, from the first request to the end of the policy window."
    sampleAnswer: "I send one specific request listing the missing item, the amount and date, and what I need: the itemized receipt, attendees and business purpose, with a deadline. I log the charge in the missing-receipt tracker, leave it coded to Travel & Meals tagged Receipt Pending, and send reminders. If the receipt still has not arrived by the escalation point I tell the controller or owner. When the policy window passes I reclass the charge to Owner Draws, document why, and never book it silently as a supported deduction."
    explanation: "A good answer is calm and process-driven: one specific request, a tracker entry, escalation, and a reclass at the policy cutoff. It also avoids guessing or quietly treating the unsupported charge as a deductible business expense."
```

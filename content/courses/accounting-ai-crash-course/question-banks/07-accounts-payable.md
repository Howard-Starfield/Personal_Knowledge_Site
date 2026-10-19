---
id: "b0587ae4-e089-4e75-9ef7-b07507b0eac3"
title: "Accounts Payable Workflow Question Bank"
description: "Practice questions for Accounts Payable Workflow."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study; every vendor, invoice and figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "1b03c61f-2ee5-4148-adee-15e55c3eea0f"
    revision: 1
    status: active
    type: single-choice
    prompt: "An invoice FL-3387 for $1,250 arrives from FastLead Marketing. Your AP system already shows the same vendor, invoice number and amount, paid on May 7. Only the invoice date differs. What do you do?"
    options:
      - id: enter-pay
        text: "Enter and pay it, because the invoice date differs"
      - id: hold-confirm
        text: "Hold it, log a suspected duplicate, and ask the vendor"
      - id: delete-quietly
        text: "Delete the file quietly, since the original was paid"
      - id: pay-refund
        text: "Pay it now and request a refund if it proves a duplicate"
    correctOptionIds: [hold-confirm]
    explanation: "Same vendor, same invoice number and same amount is the signature of a resent invoice, so you hold it, log it, and ask the vendor to confirm in writing with the original payment reference. Paying first and chasing a refund later is the tempting mistake, because cash that has left is hard to get back and the vendor may not return it."
  - id: "ac6a48d4-17b7-4b9c-8670-c215775b910b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which three documents must agree before a bill passes a three-way match?"
    options:
      - id: po-receipt-invoice
        text: "Purchase order, receiving document, and vendor invoice"
      - id: po-invoice-bank
        text: "Purchase order, vendor invoice, and latest bank statement"
      - id: invoice-receipt-w9
        text: "Vendor invoice, receiving document, and signed W-9"
      - id: po-approval-payment
        text: "Purchase order, approval email, and payment receipt"
    correctOptionIds: [po-receipt-invoice]
    explanation: "The match compares what was authorized (purchase order), what actually arrived (receiving document) and what the vendor is charging (invoice) on quantity, price and item. A bank statement is tempting because it shows money moving, but it only exists after payment, so it cannot help you decide whether to pay."
  - id: "ecbe8e3b-bdc9-482b-8aa0-a983ed3b2aa7"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo receives a $5,000 print invoice dated May 1 with terms 2/10 Net 30 and pays it on May 9. How much cash leaves the bank?"
    options:
      - id: full-amount
        text: "Pay the full $5,000, with no discount"
      - id: ten-percent
        text: "Pay $4,500 for a 10% early-pay discount"
      - id: net-of-discount
        text: "Pay $4,900 and take the discount"
      - id: four-percent
        text: "Pay $4,800 for a 4% early-pay discount"
    correctOptionIds: [net-of-discount]
    explanation: "May 9 falls inside the 10-day window, so BoBo takes 2% off: $5,000 times 0.02 is $100, leaving $4,900. Paying $4,500 reads the 10 in 2/10 as a percentage, but the 10 is the number of days and only the 2 is the percentage."
  - id: "63bb31b7-0062-40f9-b571-f95194b4447e"
    revision: 1
    status: active
    type: single-choice
    prompt: "The $5,000 print bill was recorded earlier at its full amount. Which entry correctly records paying it $4,900 early and taking the discount?"
    options:
      - id: ap-4900
        text: "Debit AP 4,900; credit Cash 4,900, leaving $100 open in AP"
      - id: expense-100
        text: "Debit AP 4,900 and Expense 100; credit Cash 5,000 when paying it"
      - id: ignore-saving
        text: "Debit AP 5,000; credit Cash 5,000 and ignore the $100 saving"
      - id: discount-taken
        text: "Debit AP 5,000; credit Cash 4,900 and Purchase Discounts Taken 100"
    correctOptionIds: [discount-taken]
    explanation: "The bill sits in AP at $5,000, so the payment must clear all $5,000 of it. Cash only goes down by $4,900, and the $100 difference is credited to Purchase Discounts Taken (account 6920). Clearing only $4,900 of AP is the tempting error, since it leaves a phantom $100 liability on the books."
  - id: "afce2e99-ab1c-4b30-8fc7-0bd50bf33003"
    revision: 1
    status: active
    type: single-choice
    prompt: "It is December 31. Jordan Lee finished a video job in December but will not invoice until January 5. What is the correct entry on December 31?"
    options:
      - id: credit-cash
        text: "Debit contractor expense and credit Cash for the work done"
      - id: accrue
        text: "Debit contractor expense and credit Accrued Expenses"
      - id: wait-invoice
        text: "Record nothing until the invoice arrives in January"
      - id: reverse-roles
        text: "Debit Accounts Payable and credit the contractor expense account"
    correctOptionIds: [accrue]
    explanation: "The work was used in December, so the matching principle puts the expense in December even though no invoice exists yet. The other side is a liability, Accrued Expenses, because nothing has been paid. Waiting for the invoice is tempting, but it pushes the cost into January and overstates December profit."
  - id: "735fc27a-4330-4ce8-a434-ba56b892ae4e"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo accrued $620 of AWS expense on December 31 and reversed it on January 1. The actual bill of $634.50 is booked on January 8. How much AWS expense does January show?"
    options:
      - id: full-bill
        text: "$634.50"
      - id: accrual-only
        text: "$620.00"
      - id: variance
        text: "$14.50"
      - id: zero
        text: "$0.00"
    correctOptionIds: [variance]
    explanation: "The January 1 reversal credits expense by $620 and the January 8 bill debits it by $634.50, so the net is the $14.50 variance. Showing $634.50 is the tempting answer, but it forgets the reversal; the $620 belongs to December, so January only carries the difference."
  - id: "f2ae7e83-8fd9-43d5-a20f-1606234bb4bc"
    revision: 1
    status: active
    type: single-choice
    prompt: "On May 16 a bill that was due April 6 is still unpaid. In an AP aging report that groups bills by days past the due date, which bucket holds it?"
    options:
      - id: zero-thirty
        text: "0–30 days past its due date"
      - id: sixty-ninety
        text: "61–90 days beyond its due date"
      - id: ninety-plus
        text: "90+ days past its due date"
      - id: thirty-sixty
        text: "31–60 days past its due date"
    correctOptionIds: [thirty-sixty]
    explanation: "April 6 to May 6 is 30 days and May 6 to May 16 is 10 more, so the bill is 40 days past due and lands in the 31–60 bucket. Choosing 0–30 is the tempting slip when you count only the days in May and forget the rest of April."
  - id: "bd41c176-a51b-4908-ab0f-d33e34f2bd6b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "An email claims to be from a vendor and says, \"We changed banks, please use this new account.\" Which TWO actions are right?"
    options:
      - id: reply-email
        text: "Reply to the email and ask the sender to confirm details"
      - id: call-known
        text: "Call the vendor on a phone number already on file"
      - id: update-now
        text: "Update the bank details now so the payment is not delayed"
      - id: second-approver
        text: "Have a second person approve the vendor master-data change"
      - id: call-email-number
        text: "Call the phone number printed in the email signature"
    correctOptionIds: [call-known, second-approver]
    explanation: "The only safe check is out-of-band: call a number you already hold, then have a second person approve the change. Replying to the email or calling the number inside it feels like verification, but it reaches the same sender, who may be the fraudster."
  - id: "37402f2e-4364-4899-a93a-3e0ba59a6921"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A team adds an AI tool that reads PDF invoices into draft entries. Which THREE guardrails belong in the design?"
    options:
      - id: auto-post
        text: "Auto-post any invoice the model marks as looking clean"
      - id: null-fields
        text: "Return null for fields that are not visible on the page"
      - id: auto-bank
        text: "Let the model update vendor bank details from invoices"
      - id: review-low
        text: "Send low-confidence fields to a person for human review"
      - id: dup-after
        text: "Run the duplicate check after extraction, before posting"
    correctOptionIds: [null-fields, review-low, dup-after]
    explanation: "A model must return null instead of guessing, route doubtful fields to a human, and have its output duplicate-checked before anything is drafted for approval. Auto-posting a clean-looking invoice is tempting for speed, but a person must approve before money moves."
  - id: "b3d7455f-0433-4c62-98b7-7c63d7ca080c"
    revision: 1
    status: active
    type: true-false
    prompt: "Recording a vendor bill that has not been paid yet debits Cash and credits Accounts Payable."
    answer: false
    explanation: "Recording the bill debits an expense (or an asset) and credits Accounts Payable, because the company now owes money but has not paid it. Cash is only touched when the bill is paid, with a debit to Accounts Payable and a credit to Cash."
  - id: "1f8e20e5-c2b5-4814-9635-cb3c092c23a6"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how the three-way match, the duplicate search and the approval step each stop money from leaving the company wrongly."
    sampleAnswer: "The three-way match compares the purchase order, the receiving document and the invoice, so we only pay for what was authorized, actually received and billed at the agreed price. The duplicate search looks up the invoice number and the vendor, amount and date, so a resent invoice is never paid twice. The approval step means someone with authority signs off before payment, which prevents unauthorized spending and fraud."
    explanation: "A strong answer names what each control checks: the match verifies the purchase, the duplicate search verifies it is the only copy, and approval verifies authority. Each control catches a different failure, so skipping one leaves a gap the others do not cover."
  - id: "1591863a-4933-48f6-a1b2-0a0821bd527d"
    revision: 1
    status: active
    type: free-recall
    prompt: "A company used $920 of cloud hosting in December but will not be billed until January. Explain what entry is made on December 31, why, and what happens when the bill arrives."
    sampleAnswer: "On December 31 we debit the hosting expense and credit Accrued Expenses for $920, because the service was used in December and the matching principle puts the cost in the same month. In January the accrual is reversed and the real bill is booked as debit expense and credit Accounts Payable, so the cost is not counted twice and only any difference from the estimate lands in January."
    explanation: "Look for the December debit to expense and credit to a liability, the reason given (matching principle), and the January reversal that stops double counting. Saying only that we wait for the invoice misses the point that December's profit would be overstated."
```

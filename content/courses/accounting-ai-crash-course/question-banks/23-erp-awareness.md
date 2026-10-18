---
id: "9a582055-daf9-48ad-8612-425af2a21acf"
title: "ERP Awareness Question Bank"
description: "Practice questions for ERP Awareness."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use hypothetical companies and sample figures to check your grasp of how ERPs connect subledgers, controls and the general ledger.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "6fc73876-29a5-48e8-9d7b-383d1901a596"
    revision: 1
    status: active
    type: single-choice
    prompt: "A warehouse scans in 1,200 lb of green coffee at $7 per pound, and the vendor invoice has not arrived yet. In an ERP with perpetual inventory and receipt accruals (SAP-style GR/IR), what does the goods receipt post?"
    options:
      - id: ap-now
        text: "Debit Inventory and credit Accounts Payable for the vendor"
      - id: grir
        text: "Debit Inventory and credit the GR/IR clearing account"
      - id: expense
        text: "Debit Purchases expense and credit the GR/IR clearing account"
      - id: cash
        text: "Debit Inventory and credit Cash until the invoice arrives"
    correctOptionIds: [grir]
    explanation: "The receipt records the $8,400 of stock on hand and parks the matching credit in the GR/IR clearing account, because the vendor has not billed yet. Crediting the vendor's Accounts Payable at receipt is tempting, but the receipt only accrues the obligation in GR/IR until the invoice is posted and creates the payable."
  - id: "ac75fa17-55ff-4342-84e7-45ceb890c8cc"
    revision: 1
    status: active
    type: single-choice
    prompt: "At month-end the AP subledger lists $487,200 of open bills, but the GL Accounts Payable balance is $491,500. What is the right reading?"
    options:
      - id: rounding
        text: "A small rounding gap that the system will clear itself"
      - id: gl-wins
        text: "The GL is official, so overwrite the subledger with $491,500"
      - id: timing
        text: "Normal noise, because subledgers always run below the GL"
      - id: break
        text: "A $4,300 break to trace, such as a manual entry to AP"
    correctOptionIds: [break]
    explanation: "The AP control account in the GL must equal the open-bill total in the subledger, so a $4,300 gap is a break to investigate, for example a journal entry posted straight to the control account. Overwriting the subledger to match the GL would hide the cause instead of finding it."
  - id: "677ffb51-a09c-469e-af2e-3656281876c0"
    revision: 1
    status: active
    type: single-choice
    prompt: "A vendor invoice for $12,000 is entered and the approval threshold is $5,000. What should happen before the bill can be paid?"
    options:
      - id: route
        text: "It waits in pending status until the assigned approver approves it"
      - id: post-first
        text: "It posts at once and the approver reviews it after payment"
      - id: clerk
        text: "The clerk who entered it approves it, since they know the vendor"
      - id: year-end
        text: "It is paid in the next run, and approval is checked at year-end"
    correctOptionIds: [route]
    explanation: "A configured workflow holds the bill in a pending state and routes it to the designated approver, and only after approval does it become payable (depending on configuration, it may also stay unposted until then). Letting the person who entered the bill approve it is tempting because they know the vendor, but it defeats segregation of duties."
  - id: "23b8373d-4c0a-414f-9505-3b8a10f34856"
    revision: 1
    status: active
    type: single-choice
    prompt: "A new staff accountant gets access to the company's ERP. Which permission set fits an entry-level role with proper segregation of duties?"
    options:
      - id: approve
        text: "Enter bills and approve them so nothing waits in a queue"
      - id: thresholds
        text: "Enter bills and adjust approval thresholds that seem too tight"
      - id: entry-reports
        text: "Enter bills, run standard reports, and drill down to source"
      - id: coa
        text: "Enter bills and edit the chart of accounts for new vendors"
    correctOptionIds: [entry-reports]
    explanation: "Entry-level users enter transactions, run standard reports and drill down to investigate, while configuration and approval stay with other roles. Approving your own bills is tempting because it speeds things up, but it removes the independent check the role-based design is meant to provide."
  - id: "a2faba88-936a-48be-a914-658a81f15da9"
    revision: 1
    status: active
    type: single-choice
    prompt: "The owner wants bills over $10,000 to need owner approval, and the ERP has a threshold setting for exactly this. Is switching it on configuration or customization?"
    options:
      - id: custom-company
        text: "Customization, because the rule is specific to this company"
      - id: config
        text: "Configuration, because a built-in setting handles it without code"
      - id: custom-dev
        text: "Customization, because approval rules always need a developer"
      - id: neither
        text: "Neither, because approval rules are fixed at go-live and cannot change"
    correctOptionIds: [config]
    explanation: "Configuration means using settings the system already provides, and a threshold is exactly that, so no code is involved. A rule being specific to one company does not make it customization, which is defined by changing system behavior through code or custom objects."
  - id: "06763545-baa3-4edc-9a8e-20318206d239"
    revision: 1
    status: active
    type: single-choice
    prompt: "You have studied NetSuite documentation but never used the product. Which resume line stays honest and still gives an interviewer something to probe?"
    options:
      - id: proficient
        text: "Proficient in NetSuite, SAP, Sage Intacct, Xero and QuickBooks"
      - id: admin
        text: "Configured NetSuite approval workflows during a self-study project"
      - id: tutorials
        text: "Two years of SAP experience gained from watching tutorials"
      - id: studied
        text: "Studied NetSuite docs; can explain AP and AR flows conceptually"
    correctOptionIds: [studied]
    explanation: "The honest line names the system, says what you actually did (studied), and limits the claim to concepts you can explain. A list of five systems sounds impressive, but the first follow-up question about a module or a real workflow would expose it."
  - id: "cc55fdad-841f-44f6-8ee5-f75dde64f6d7"
    revision: 1
    status: active
    type: single-choice
    prompt: "An AI tool reads a vendor PDF and drafts a bill with a suggested GL account. What should the entry-level reviewer do before it posts?"
    options:
      - id: confident
        text: "Post it if the model is confident, since confidence means accuracy"
      - id: skim
        text: "Post it after a skim, because the AI cites the PDF anyway"
      - id: verify
        text: "Check the coding against the invoice, then approve under your name"
      - id: tool-login
        text: "Let it post under the AI tool's login to save the review step"
    correctOptionIds: [verify]
    explanation: "AI proposes and a named human verifies against the source document and approves, so the audit trail shows who was accountable. A source citation helps the review, but it does not replace the review, and a confidence score is not proof the account is right."
  - id: "7f7a9198-e9ef-4215-b349-fd851ed72f3b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A bill for a green-coffee purchase is ready for a three-way match. Which records does the system compare? Select every correct answer."
    options:
      - id: po
        text: "The purchase order with quantity and price"
      - id: receipt
        text: "The goods receipt with quantity received"
      - id: invoice
        text: "The vendor invoice with quantity and amount"
      - id: bank-line
        text: "The bank statement line for the payment"
      - id: aging
        text: "Last month's AP Aging report for that vendor"
    correctOptionIds: [po, receipt, invoice]
    explanation: "A three-way match compares the purchase order, the goods receipt and the vendor invoice before the bill is approved for payment. The bank statement line is tempting because it is also a document, but it shows up only after payment and belongs to bank reconciliation."
  - id: "02822a55-1a14-4559-b659-92d7081b3780"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A company lets an AI tool draft bills inside its ERP. Which guardrails belong in the design? Select every correct answer."
    options:
      - id: cite
        text: "Link every suggested entry to its source document"
      - id: estimate
        text: "Let the AI estimate an amount when the PDF is blurry"
      - id: human
        text: "Require a named human to approve before posting"
      - id: autopost
        text: "Allow auto-posting for any bill the AI scores highly"
      - id: log
        text: "Record in the audit log that an AI tool drafted it"
    correctOptionIds: [cite, human, log]
    explanation: "Good guardrails tie each suggestion to a source record, require a human approval before posting, and keep an audit trail naming both the tool and the approver. Estimating a missing number is tempting when a PDF is unclear, but AI must never fabricate data; unclear items go to a human."
  - id: "d9eee7e0-c128-414a-b3b1-45be45825180"
    revision: 1
    status: active
    type: true-false
    prompt: "Because the screens in QuickBooks Online, NetSuite and SAP look different, the core accounting behind a vendor bill is also different in each."
    answer: false
    explanation: "The screens and names differ, but the core entry is the same: debit an expense or asset, credit Accounts Payable, post to the AP subledger and roll up to the GL. Fuller ERPs add steps such as receipts and three-way match around it. This is why fundamentals transfer between systems even when the interface takes weeks to learn."
  - id: "8979db8c-691d-49a3-bbef-48da48f63ef9"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, describe how one vendor bill moves through an ERP from purchase order to payment, and why the AP subledger must tie to the GL."
    sampleAnswer: "Procurement issues a purchase order, which is a commitment and not yet a posting. When goods arrive, the receipt debits Inventory and credits the GR/IR clearing account. The invoice is entered and matched against the PO and the receipt, then routed through approval if it is over the threshold. On approval it posts, debiting GR/IR and crediting Accounts Payable for the vendor, which also increases the AP control account in the GL. The payment run then debits Accounts Payable and credits Cash. The subledger holds the detail and the GL holds the summary, so the open-bill total must equal the control account, and any difference is a break to investigate."
    explanation: "A strong answer names the steps in order, includes the three-way match and the approval, and shows the debits and credits at receipt, posting and payment. It also explains that the subledger detail must reconcile to the GL control account."
  - id: "3e7fe3cb-599a-4376-be3f-2e18119daea4"
    revision: 1
    status: active
    type: free-recall
    prompt: "A recruiter asks, \"Do you have NetSuite experience?\" You have studied it but never used it. Write your honest answer."
    sampleAnswer: "I want to be straight with you: I have not used NetSuite hands-on. What I do have is the accounting flow it implements. I can walk through how a bill moves from purchase order to receipt to invoice, three-way match, approval and posting, and how the AP subledger reconciles to the GL at month-end. I have studied the AP and AR module documentation, and I would expect a few weeks to ramp up on the screens themselves."
    explanation: "A strong answer is honest about what you have not done, pivots to the accounting you do understand, and gives a realistic ramp-up expectation. Vague hedging or claiming experience you lack both damage trust."
```

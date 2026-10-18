---
id: "f1678c3d-b82a-4372-852e-b8c261f51d56"
title: "Audit Evidence and Documentation Question Bank"
description: "Practice questions for Audit Evidence and Documentation."
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
  - id: "6eb6ce18-44c6-4bcc-9e4b-500059c7cdd7"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $1,200 vendor invoice looks unusual, and Bo says, \"Trust me, it's real.\" Which support would be the strongest evidence?"
    options:
      - id: verbal
        text: "Bo's spoken assurance that the vendor invoice is genuine and current"
      - id: spreadsheet
        text: "A row in an internal spreadsheet that has no approval controls on it"
      - id: original
        text: "The vendor's original invoice, matched to a PO and receiving slip"
      - id: qbo-note
        text: "A note typed into QuickBooks by the person who booked the invoice"
    correctOptionIds: [original]
    explanation: "Evidence is only as strong as its source, and an original third-party document that is matched to a purchase order and proof of receipt is the hardest to dispute. Bo's word is tempting because he owns the business, but a verbal statement is weak evidence on its own."
  - id: "9c49487b-8904-41ad-9d41-a94cd30c9f8b"
    revision: 1
    status: active
    type: single-choice
    prompt: "You are building a workpaper for BoBo's March cash reconciliation. Which item belongs in the header zone?"
    options:
      - id: identifiers
        text: "The client name, period and workpaper number"
      - id: conclusion
        text: "The one-sentence conclusion about the balance"
      - id: exceptions
        text: "The list of exceptions found in testing"
      - id: math
        text: "The math that ties the bank to the ledger"
    correctOptionIds: [identifiers]
    explanation: "The header answers who, what and when so a stranger can refile the page if it falls out of the binder, which means client, period and workpaper number. The conclusion and exceptions belong in the footer, and the tie-out math belongs in the body."
  - id: "2067ea28-ccf3-4f18-be40-529b91164756"
    revision: 1
    status: active
    type: single-choice
    prompt: "On BoBo's 3/31 reconciliation you compare the $25,000.00 bank balance to the Pacific Bank statement. Which tickmark from this lesson's legend fits?"
    options:
      - id: agreed-gl
        text: "A, agreed to general ledger detail"
      - id: agreed-bank
        text: "B, agreed to the bank statement"
      - id: footed
        text: "F, footed with the totals re-added"
      - id: examined
        text: "X, examined the original document"
    correctOptionIds: [agreed-bank]
    explanation: "B means the number was agreed to the bank statement, and that is exactly the comparison you performed. A is the tempting wrong choice because the reconciliation also involves the ledger, but A records a comparison to ledger detail, which is a different piece of work."
  - id: "8a574565-e87c-421f-84fc-186a3f1bb840"
    revision: 1
    status: active
    type: single-choice
    prompt: "A reviewer wants proof that BoBo's accounts payable is complete at March 31. Which procedure fits best?"
    options:
      - id: confirm-customers
        text: "Confirm receivable balances directly with each customer by mail or email"
      - id: depreciation
        text: "Recalculate straight-line depreciation on each item in the equipment list"
      - id: inventory-foot
        text: "Re-add every column on the inventory count listing before you sign it"
      - id: unrecorded
        text: "Search for unrecorded bills, such as April payments for March invoices"
    correctOptionIds: [unrecorded]
    explanation: "Payables risk is understatement, so you look for bills that should have been recorded but were not, for example April payments that relate to March invoices. Confirming customer balances is tempting, but it tests receivables, which is a different account with the opposite risk."
  - id: "f39eed84-1fa3-41a8-9676-cc93806e2584"
    revision: 1
    status: active
    type: single-choice
    prompt: "You pick five accounts receivable balances from BoBo's ledger and pull the invoice and signed Statement of Work behind each. What are you testing, and in which direction do you work?"
    options:
      - id: existence-vouch
        text: "Existence, by vouching from the ledger back to source documents"
      - id: completeness-trace
        text: "Completeness, by tracing from source documents into the ledger entries"
      - id: existence-trace
        text: "Existence, by tracing from source documents into the ledger entries"
      - id: completeness-vouch
        text: "Completeness, by vouching from the ledger back to source documents"
    correctOptionIds: [existence-vouch]
    explanation: "Starting from recorded balances and working back to the documents asks whether each recorded amount is real, which is existence, and that direction is called vouching. The completeness option is tempting because tracing is a real procedure, but it starts from documents and asks whether anything was left out."
  - id: "0b4b41da-f00e-46b6-b14c-ef75c6a2ef35"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's income statement shows $48,200 of March revenue. Starting from that number, which path walks the audit trail toward the evidence?"
    options:
      - id: reversed
        text: "Source document, subledger, general ledger, trial balance, financial statement"
      - id: skipped
        text: "Financial statement, general ledger, source document, trial balance, subledger"
      - id: swapped
        text: "Trial balance, financial statement, subledger, general ledger, source document"
      - id: correct-path
        text: "Financial statement, trial balance, ledger, subledger, source document"
    correctOptionIds: [correct-path]
    explanation: "The audit trail runs from the financial statement to the trial balance, then the general ledger, then the subledger and finally the source document. The reversed order is tempting because it is how the data is created, but the audit trail is read from the number you must support back to its origin."
  - id: "047f71d5-51bb-48cc-8322-6e7114b454d1"
    revision: 1
    status: active
    type: single-choice
    prompt: "A reviewer writes \"no source for the $1,200 accrual\" on your workpaper. What is the best response?"
    options:
      - id: email-only
        text: "Reply by email that you are looking into it, and leave the workpaper alone for now"
      - id: clear-it
        text: "Find the support, cross-reference it, re-sign with the date, and clear the note"
      - id: delete-note
        text: "Delete the review note after Bo tells you in person that the accrual is valid"
      - id: explain-away
        text: "Explain by email that the accrual is routine and leave the workpaper exactly as is"
    correctOptionIds: [clear-it]
    explanation: "The fix belongs on the workpaper itself: locate the support, add the cross-reference, re-sign with the date, and answer the note in writing. Replying only by email feels responsive, but the binder still shows an unsupported number, so the next reviewer hits the same gap."
  - id: "20709c93-881c-404e-8f8a-6e56ea5a0a67"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which habits help a reviewer sign off on your workpaper in one pass? Select every correct answer."
    options:
      - id: specific-xref
        text: "Cite a specific workpaper and line for every tie"
      - id: see-file
        text: "Write \"see file\" next to each source reference"
      - id: define-legend
        text: "Define each tickmark symbol in a legend on the page"
      - id: reuse-header
        text: "Reuse last year's header and fix the dates later"
      - id: sign-date
        text: "Sign and date your preparation before handing off"
    correctOptionIds: [specific-xref, define-legend, sign-date]
    explanation: "Specific cross-references, a defined legend and a signed, dated preparation let a reviewer follow the work without calling you. Writing \"see file\" is tempting shorthand, but it sends the reviewer hunting, and a reused header can leave the wrong period or preparer on the page."
  - id: "c4058790-b39a-44ad-b2e4-051085b05719"
    revision: 1
    status: active
    type: multiple-select
    prompt: "BoBo's bank balance is $25,000.00, with a $54.00 outstanding check and a $1,000.00 deposit in transit. Which steps give the adjusted bank balance? Select every correct answer."
    options:
      - id: add-check
        text: "Add the $54.00 outstanding check to the bank balance"
      - id: subtract-check
        text: "Subtract the $54.00 outstanding check from the bank balance"
      - id: add-deposit
        text: "Add the $1,000.00 deposit in transit to the bank balance"
      - id: subtract-deposit
        text: "Subtract the $1,000.00 deposit in transit from the bank balance"
    correctOptionIds: [subtract-check, add-deposit]
    explanation: "A check you wrote has not yet cleared the bank, so it reduces the bank balance, and a deposit in transit has not yet reached the bank, so it increases it. That gives $25,000.00 minus $54.00 plus $1,000.00, or $25,946.00. Adding the check is tempting because it looks like a reconciling item, but it moves the balance the wrong way."
  - id: "37d1b5e3-1218-4e2d-a84a-6f264e352060"
    revision: 1
    status: active
    type: true-false
    prompt: "A tickmark is fine without a legend as long as the preparer remembers what it means."
    answer: false
    explanation: "A tickmark is only useful if the reviewer can decode it, so every symbol used must be defined in a legend, and every legend entry must have been used. Memory is tempting to rely on, but the preparer may be unavailable and the reviewer cannot guess what work was done."
  - id: "51a0fcaf-99ee-4eca-9fd4-2f3ec1c52c3f"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain what makes an accounting workpaper reviewable. Cover its three zones, the role of tickmarks and the audit trail."
    sampleAnswer: "A reviewable workpaper has a header that says who, what and when, a body that shows the numbers tied to the ledger with a tickmark or cross-reference on each, and a footer with a one-sentence conclusion, any exceptions and signed, dated sign-offs. Tickmarks show what work was done on each number, and every symbol is defined in a legend. The audit trail links the financial statement to the trial balance, ledger, subledger and source document, so a reviewer can trace a number to its evidence without calling the preparer."
    explanation: "A strong answer names header, body and footer, explains that tickmarks need a legend, and describes the unbroken chain from the statement down to the source document. The central idea is that correct work is not enough unless someone else can verify it."
  - id: "ca4dc8c7-4397-46c3-a36e-5747b57f1048"
    revision: 1
    status: active
    type: free-recall
    prompt: "After you signed BoBo's cash reconciliation, you find that the outstanding checks list was footed as $2,150.23 when it should be $2,510.23, a digit transposition. The reviewer arrives tomorrow. What do you do?"
    sampleAnswer: "I would re-foot the list from the bank statement and the check register to confirm $2,510.23, then recompute the reconciliation. With the larger outstanding-check total, the adjusted bank balance falls by $360.00, so it no longer ties to the ledger and I must find the cause of that difference. I would correct the workpaper with a dated footnote that explains the restatement, update the lead schedule, and re-sign. I would tell the reviewer in writing tonight and bring the original and corrected versions tomorrow."
    explanation: "A strong answer verifies the correct figure first, recognizes that the $360.00 error means the reconciliation no longer ties, and fixes the work on the workpaper rather than only in conversation. Disclosing the error in writing before the review protects trust, whereas hoping nobody notices breaks it."
```

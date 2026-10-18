---
id: "dd6df370-9a82-4d95-969d-e73d435f2745"
title: "Internal Controls for Entry-Level Accounting Question Bank"
description: "Practice questions for Internal Controls for Entry-Level Accounting."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study; every name and figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "4f5ff1da-cfc3-414a-8e96-1b89bba2ae14"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo is reviewing its controls. Which one is preventive rather than detective?"
    options:
      - id: bank-rec
        text: "A monthly bank reconciliation that surfaces odd transfers"
      - id: wire-approval
        text: "Manager approval required before a wire is released"
      - id: audit-log
        text: "A quarterly review of the QuickBooks audit log"
      - id: vendor-list
        text: "A year-end review of the active vendor list"
    correctOptionIds: [wire-approval]
    explanation: "Approval before a wire is sent stops the problem before it happens, which is what makes a control preventive. The bank reconciliation is the tempting choice because it is so familiar, but it can only discover an unauthorized transfer after the money has already left."
  - id: "e99fc863-6a2a-4323-b0e1-0f3bd79b252a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Bo reviews the Adobe card statement line by line and finds a charge with no receipt. What kind of control found it?"
    options:
      - id: preventive-before
        text: "Preventive, because Bo is looking before money moves"
      - id: compensating
        text: "Compensating, because Priya has no QuickBooks access"
      - id: preventive-receipts
        text: "Preventive, because receipts are required within 5 business days"
      - id: detective
        text: "Detective, because the charge had already happened"
    correctOptionIds: [detective]
    explanation: "The statement review looks backward at charges that have already posted, so it is a detective control. The receipt rule feels preventive, but the charge is made first and the receipt is checked afterward, so the review only catches what slipped through."
  - id: "e232d4f4-1035-400b-a3bd-de754f2adf78"
    revision: 1
    status: active
    type: single-choice
    prompt: "At a small firm, one person approves a payment, sends it from the bank, and books it in the ledger. Which duties are combined?"
    options:
      - id: car
        text: "Authorization, custody and recording"
      - id: review-filing
        text: "Authorization, review and filing"
      - id: reporting
        text: "Custody, reconciliation and reporting"
      - id: posting
        text: "Approval, posting and archiving"
    correctOptionIds: [car]
    explanation: "Approving is authorization, sending money from the bank is custody of the asset, and booking the entry is recording. Segregation of duties exists to split exactly these three, and the other sets are plausible-sounding lists that are not the standard trio."
  - id: "e77b7682-74cf-4dde-bc61-f4e3489e4e98"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does segregation of duties change for someone who wants to commit and hide a fraud?"
    options:
      - id: always-caught
        text: "It guarantees that every fraud attempt is caught quickly"
      - id: no-detective
        text: "It removes the need for any later detective review"
      - id: collusion
        text: "It typically requires collusion with another person to succeed"
      - id: blame
        text: "It shifts the blame onto the person who recorded it"
    correctOptionIds: [collusion]
    explanation: "When no single person controls a transaction from start to finish, a fraudster needs a partner, and collusion is far rarer than solo fraud. It does not guarantee detection, which is why detective controls such as reconciliations are still needed alongside it."
  - id: "86d5496c-6490-4808-8bdc-c6f8cf96f2b8"
    revision: 1
    status: active
    type: single-choice
    prompt: "Maya prepares BoBo's monthly bank reconciliation. Which arrangement gives the strongest second pair of eyes?"
    options:
      - id: self-recheck
        text: "Maya re-checks her own work the following day"
      - id: bo-and-cpa
        text: "Bo signs it and an outside CPA reviews it"
      - id: priya-reads
        text: "Priya reads it because she holds the company card"
      - id: jordan-signs
        text: "Jordan signs it since he sends the invoices in"
    correctOptionIds: [bo-and-cpa]
    explanation: "Review only adds value when it comes from someone independent of the preparer, and an outside CPA adds independence that a four-person team cannot supply. Re-checking your own work feels like a second look, but one person preparing and approving the same reconciliation has almost no audit value."
  - id: "63d1ee91-ffa0-4461-93e5-6e73fa4aa6f7"
    revision: 1
    status: active
    type: single-choice
    prompt: "A vendor emails new bank details and asks BoBo to update them. What is the correct first move?"
    options:
      - id: reply-confirm
        text: "Reply to the email to ask the sender to confirm the change"
      - id: update-now
        text: "Update the record now so the next payment is not delayed"
      - id: check-routing
        text: "Check that the new routing number looks like a real bank"
      - id: call-original
        text: "Call the phone number on the original signed contract"
    correctOptionIds: [call-original]
    explanation: "A spoofed email can come from an attacker, so the confirmation must travel through a channel the attacker does not control, such as the number on the original contract. Replying to the same email is tempting but sends the question straight back to the possible fraudster."
  - id: "1d05fac4-4f77-443c-ac42-95bec264ec47"
    revision: 1
    status: active
    type: single-choice
    prompt: "Maya's bank reconciliation will not balance because of an unidentified $1,200 deposit. What should she do?"
    options:
      - id: open-item
        text: "Leave it as an open item, investigate it, and flag it"
      - id: plug-income
        text: "Book it to an income account so the reconciliation balances"
      - id: net-fees
        text: "Net it against next month's bank fees to clear it"
      - id: sit-quiet
        text: "Leave the reconciliation unsigned and tell no one yet"
    correctOptionIds: [open-item]
    explanation: "An unexplained item should stay open while it is investigated, and be escalated if it is still unresolved. Plugging it to an income account makes the totals agree, but it hides a possible error or fraud and the plug compounds the next month."
  - id: "4941138f-3f5a-4742-9a35-46a8292939e2"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Maya both adds vendors and enters their bills at BoBo. Which controls compensate for that overlap? Select every correct answer."
    options:
      - id: new-vendor-report
        text: "Bo initials the weekly New Vendors Added report"
      - id: sixty-days
        text: "Payments to vendors under 60 days old need Bo's re-approval"
      - id: self-review
        text: "Maya reviews her own new vendors the next morning"
      - id: pay-access
        text: "Maya releases payments so bills never wait for approval"
    correctOptionIds: [new-vendor-report, sixty-days]
    explanation: "Both correct options put someone other than Maya in front of new vendors, which is the independent look that the overlapping duties removed. Self-review is the tempting choice, but a person cannot supply independence for their own work."
  - id: "cc3584e8-dfbb-40cb-acd6-1eacc90bdbb4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A teammate asks to borrow your QuickBooks login for one quick bill. Which are good reasons to refuse? Select every correct answer."
    options:
      - id: audit-trail
        text: "The log would show your name on someone else's actions"
      - id: short-loan
        text: "A short loan is fine if you watch the screen"
      - id: extra-permissions
        text: "The borrower could gain permissions they should not hold"
      - id: contractors-only
        text: "It matters only if the borrower is an outside contractor"
    correctOptionIds: [audit-trail, extra-permissions]
    explanation: "Shared logins defeat the audit trail's attribution because the system records the action under one name, and they let someone act with permissions they were never granted. Watching the screen or keeping the loan short does not fix either problem, so no duration or borrower makes sharing acceptable."
  - id: "ac64718c-a226-4560-b319-07e3746f8f5a"
    revision: 1
    status: active
    type: true-false
    prompt: "If an organization has strong preventive controls, detective controls are no longer needed."
    answer: false
    explanation: "Prevention is cheaper, but no set of preventive controls stops everything, so detective controls catch what slips through. A healthy system pairs the two, for example approval before payment plus a reconciliation afterward."
  - id: "174fd4ec-909b-4312-84b6-a93df261619e"
    revision: 1
    status: active
    type: free-recall
    prompt: "It is Friday at 4:45 PM and Bo is unreachable for two hours. Priya says an $8,500 vendor wire must go out today and offers to approve it herself. What should Maya do, and why?"
    sampleAnswer: "Maya should not process the wire. Priya has no payment-approval authority, and the confirmation only goes to Bo's phone by design. She should get the request in writing with the vendor, amount and reason, message Bo for a yes or no, and tell Priya the payment waits for Bo. She documents the sequence and gets Bo's approval in writing before he releases it, because missing a deadline is a smaller problem than an unapproved wire."
    explanation: "A strong answer refuses to bypass the control and also finds the fastest path inside it, which is writing the request down and reaching the real approver. Mentioning documentation shows you understand that the audit trail is part of the control."
  - id: "c9cffa5c-1a80-4d9d-b90f-fb0786b6997a"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain what internal controls are, what segregation of duties separates, and how a four-person business like BoBo compensates when full separation is impossible."
    sampleAnswer: "An internal control is a deliberate step in a process that prevents or detects errors and fraud. Segregation of duties splits custody, authorization and recording so no one person controls a whole transaction. BoBo cannot do that fully with four people, so it uses compensating controls. Bo alone releases payments and reviews a weekly new-vendor report, and an outside CPA independently reviews the bank reconciliation."
    explanation: "A strong answer defines a control as prevention or detection, names the three duties, and explains that a compensating control reduces the same risk by a different mechanism. Pointing to a concrete BoBo control shows you can apply the idea rather than recite it."
```

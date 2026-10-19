---
id: "088e3c3c-e345-44d5-b610-58481f5d270d"
title: "Fraud and Error Detection Basics Question Bank"
description: "Practice questions for Fraud and Error Detection Basics."
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
  - id: "5a97d279-2e79-4142-9e72-879944af2068"
    revision: 1
    status: active
    type: single-choice
    prompt: "A company lets one clerk add new vendors and also approve payments to them. Which side of the Fraud Triangle does this weakness create?"
    options:
      - id: pressure
        text: "Pressure, because the clerk probably has money problems"
      - id: rationalization
        text: "Rationalization, because the clerk may call it borrowing"
      - id: opportunity
        text: "Opportunity, because no second person checks the clerk"
    correctOptionIds: [opportunity]
    explanation: "Opportunity is the weakness in controls, and having the same person create vendors and approve their payments is exactly that gap. Pressure and rationalization describe a person's inner state, which you cannot see in a transaction report; accounting controls mainly address opportunity."
  - id: "954c978a-d608-4e76-82f7-9a75532b35c8"
    revision: 1
    status: active
    type: single-choice
    prompt: "Five weekly ACH payments of $4,900.00 went to a new vendor, and BoBo's approval threshold is $5,000. What should an entry-level accountant do?"
    options:
      - id: escalate
        text: "Document the five payments and escalate to the controller"
      - id: call-vendor
        text: "Call the vendor to confirm the invoices are genuine"
      - id: ask-approver
        text: "Ask the approver to explain why all five amounts were so similar"
      - id: reverse
        text: "Reverse the payments in the books until it is settled"
    correctOptionIds: [escalate]
    explanation: "Your role is to find, flag, document and escalate to someone with authority. Calling the vendor or questioning the approver can tip off a possible wrongdoer and disturb evidence, and reversing entries changes the records that an investigator needs."
  - id: "200aa372-46b5-4e2c-b22d-6fe1f62bac92"
    revision: 1
    status: active
    type: single-choice
    prompt: "A bookkeeper keeps one customer's payment and covers the gap by applying later customers' payments to that first account. What is this scheme called?"
    options:
      - id: structuring
        text: "Structuring, splitting amounts to dodge a payment or approval limit"
      - id: cutoff
        text: "Cutoff manipulation, moving revenue between periods"
      - id: phantom
        text: "Phantom employee, paying someone who does not exist"
      - id: lapping
        text: "Lapping, shuffling later payments to cover an earlier theft"
    correctOptionIds: [lapping]
    explanation: "Lapping hides a stolen receipt by continually covering it with newer customers' payments. It is tempting to call it structuring because money is moved around, but structuring breaks a transaction into smaller pieces to stay under a threshold."
  - id: "a96fc76d-41b4-4623-b170-a0fc63f79e06"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which dataset is best suited to a Benford's Law first-digit test?"
    options:
      - id: five-payments
        text: "Five consecutive payments to one vendor this month"
      - id: year-ap
        text: "A year of accounts payable amounts, thousands of rows"
      - id: check-numbers
        text: "Check numbers assigned in sequence by the company"
      - id: single-wire
        text: "A single $12,300 wire that was flagged for review"
    correctOptionIds: [year-ap]
    explanation: "Benford's Law describes the leading digits of naturally occurring numbers, and it only shows a meaningful pattern across a large volume of them. A handful of payments or a sequence of assigned numbers is too small or not naturally occurring, so a mismatch there proves nothing."
  - id: "73660e3e-c470-469c-8f91-e01874ae30f1"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which sentence belongs in a flagging memo about five $4,900 payments to one vendor?"
    options:
      - id: accuse-person
        text: "K. Smith appears to be committing fraud with these five payments"
      - id: prove-ghost
        text: "These five payments prove the vendor is a ghost vendor"
      - id: neutral
        text: "Five $4,900 payments to one vendor noted; recommend review"
      - id: asked-vendor
        text: "I asked the vendor to explain why the payments look fake"
    correctOptionIds: [neutral]
    explanation: "A good memo describes what you saw and recommends review without stating a conclusion about intent. Accusatory wording can defame an innocent person and can become evidence, and contacting the vendor breaks the rule against investigating alone."
  - id: "ea77d623-2a00-4fbd-9255-28cfaaabfa4f"
    revision: 1
    status: active
    type: single-choice
    prompt: "A vendor's bank account was changed on March 10 and the vendor was paid $18,000 on March 12. What is the most useful first check?"
    options:
      - id: pull-log
        text: "Pull the change log and confirm a different person approved it"
      - id: ask-clerk
        text: "Ask the clerk who made the change to explain the reason behind it"
      - id: call-invoice
        text: "Call the vendor on the phone number printed on the invoice"
      - id: wait-audit
        text: "Leave the change alone and wait for the next audit cycle"
    correctOptionIds: [pull-log]
    explanation: "A bank detail change followed quickly by a large payment is a high-priority review, and the first evidence is who changed it and whether someone else approved it. Questioning the clerk or phoning a number from the invoice can tip off a wrongdoer or reach a fake contact, and waiting leaves the exposure open."
  - id: "6663be19-9f9a-44d7-afe1-dd405cf4f57b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your duplicate-invoice report gives 30 false positives every month because of subscription billing, and your supervisor jokes, \"Just skip those.\" What is the best response?"
    options:
      - id: skip-items
        text: "Skip those items quietly and keep running the rest"
      - id: turn-off
        text: "Turn the test off until the billing system is changed"
      - id: send-all
        text: "Send all 30 items to the controller each month as they are"
      - id: refine
        text: "Refine the query, then record the change with written sign-off"
    correctOptionIds: [refine]
    explanation: "Tuning the query to exclude known recurring subscriptions keeps the control working, and written sign-off leaves an audit trail. Skipping items or switching the test off creates a gap where a real duplicate could hide, while sending raw noise upward buries the real items."
  - id: "dca21a5f-9ff0-44d3-b6c3-968fc2f83281"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which findings in a vendor master file are red flags for a possible ghost vendor? Select every correct answer."
    options:
      - id: bank-match
        text: "The vendor's bank account matches an employee's account"
      - id: po-box-only
        text: "The vendor has only a PO Box and no website"
      - id: monthly
        text: "The vendor sends an invoice every month"
      - id: pays-check
        text: "The vendor is paid by check rather than by ACH"
      - id: discount
        text: "The vendor offers an early-payment discount"
    correctOptionIds: [bank-match, po-box-only]
    explanation: "A bank account shared with an employee and a PO Box with no web presence are the classic signs of a fake vendor set up to move money out. Monthly invoices, payment by check and early-payment discounts are ordinary behavior for real vendors, so they do not point to fraud on their own."
  - id: "fccd7e12-aa9b-4e89-912e-a85ceddcf922"
    revision: 1
    status: active
    type: multiple-select
    prompt: "You notice a suspicious payment pattern. Which actions fit an entry-level accountant's role? Select every correct answer."
    options:
      - id: document
        text: "Record transaction IDs, amounts, dates and source report"
      - id: escalate-up
        text: "Walk the list to the supervisor or controller quietly"
      - id: cooperate
        text: "Cooperate fully with the investigation that follows"
      - id: chat-friend
        text: "Mention it to a trusted coworker for a second opinion"
      - id: contact-party
        text: "Ask the suspected party to explain the transactions"
    correctOptionIds: [document, escalate-up, cooperate]
    explanation: "The job is to document the facts, escalate quietly and then help with whatever the investigation asks for. Telling a coworker feels harmless but it spreads the news and can reach the suspect, and questioning the suspected party is investigating alone."
  - id: "d0984420-954e-40ff-81e9-388f40b13e41"
    revision: 1
    status: active
    type: true-false
    prompt: "If a flagged item later turns out to be an honest error, the accountant who flagged it made a mistake."
    answer: false
    explanation: "Red flags are patterns that deserve a question, not verdicts, and the detection method is the same for errors and fraud. A supervisor would rather review several false positives than miss one real problem, so flagging an item that proves innocent is the system working."
  - id: "19b953fc-0db8-4a8e-b128-c918494085be"
    revision: 1
    status: active
    type: free-recall
    prompt: "A construction firm's new junior accountant sees nine Friday wires of $9,200 to $9,800 to a PO Box vendor that the AP manager added. List what she should do and what she should avoid."
    sampleAnswer: "She should document the nine wire dates and amounts, the vendor master record and the vendor-add log, write a neutral one-page memo with no conclusion, and take it to the controller, who sits above the AP manager. She should not call the vendor, confront the manager, or wait to see what happens. The repeated amounts just under what looks like a $10,000 sign-off limit suggest split payments, and the manager adding and paying the vendor is a segregation-of-duties gap."
    explanation: "A strong answer names the pattern (repetition below a threshold), the opportunity (one person adding and approving the vendor), and the quiet escalation to someone above the person involved. It also states what she must not do, which is contact the vendor or confront the manager."
  - id: "ed801858-3417-4ab9-b665-0e5f90d43692"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain what an entry-level accountant does and does not do when something in the data looks wrong, and connect it to the Fraud Triangle."
    sampleAnswer: "I run the scheduled anomaly reports, drop obvious false positives, document each remaining item with neutral wording and escalate quietly to my supervisor or controller, then wait for direction and cooperate. I do not investigate alone, contact the suspected party, tip off coworkers or write accusations. Of the three Fraud Triangle sides, pressure and rationalization are invisible in data, while opportunity shows up as weak controls and data patterns, so that is where my reports and flags help."
    explanation: "A strong answer covers both lists, the do and the do-not, and gives the reason that investigating alone can destroy evidence and expose you. Linking opportunity to what the data and controls can reveal shows you understand why the role is finder and flagger."
```

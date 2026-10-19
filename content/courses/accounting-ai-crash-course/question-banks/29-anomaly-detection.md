---
id: "813ff0ec-fd79-40d9-b530-d5afc19e2cc8"
title: "Accounting Anomaly Detection Question Bank"
description: "Practice questions for Accounting Anomaly Detection."
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
  - id: "d324228b-970e-4ed2-bd31-ccc751354642"
    revision: 1
    status: active
    type: single-choice
    prompt: "A hosting vendor normally bills BoBo about $400 a month, but this month's invoice is $4,000. No written control was broken. Which kind of anomaly is this?"
    options:
      - id: rule-violation
        text: "A rule violation, because a written control was broken"
      - id: integrity-flag
        text: "A data integrity flag, because two records conflict with each other"
      - id: outlier
        text: "A statistical outlier, because it breaks the vendor's history"
    correctOptionIds: [outlier]
    explanation: "The invoice is unusual compared with the vendor's own history, which is what makes it a statistical outlier. It is not a rule violation because no written control was broken, and it is not an integrity flag because no two records disagree."
  - id: "09e0e9f8-4ec1-47b3-840f-477ec278c749"
    revision: 1
    status: active
    type: single-choice
    prompt: "Priya's team is building its first anomaly report. Why do entry-level teams usually start with rule-based flags before adding statistics?"
    options:
      - id: transparent
        text: "Rules are cheap and transparent, so they are easy to defend in an audit"
      - id: no-false-positives
        text: "Rules never produce false positives, so the triage step can safely be skipped"
      - id: stats-add-nothing
        text: "Statistical flags catch less, so they add nothing once rules exist"
      - id: stats-need-ai
        text: "Statistical flags need an AI model, which junior staff cannot run"
    correctOptionIds: [transparent]
    explanation: "A rule such as duplicate invoice number can be explained to anyone in one sentence, which makes it easy to defend and tune. Rules still produce false positives, so triage is always needed, and statistical layers are added later once the rule library and triage process are working."
  - id: "6e4be0d2-48bc-4fff-a0f3-7eddac806648"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pandas call marks BOTH rows when two invoices share a vendor and an invoice number?"
    options:
      - id: default-keep
        text: "ap.duplicated(subset=['vendor_id','invoice_number'])"
      - id: number-only
        text: "ap.duplicated(subset=['invoice_number'], keep=False)"
      - id: drop-dupes
        text: "ap.drop_duplicates(subset=['vendor_id','invoice_number'], keep=False)"
      - id: keep-false
        text: "ap.duplicated(subset=['vendor_id','invoice_number'], keep=False)"
    correctOptionIds: [keep-false]
    explanation: "Setting keep to False marks every row in a duplicate group, and using both vendor_id and invoice_number matches the rule definition. Without keep=False only the later copy is marked, so the reviewer would not see the original. Using the invoice number alone would wrongly pair different vendors that happen to use the same number."
  - id: "b6950e57-4f5d-44e1-b0ad-8b816e6c3a21"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $812.00 payment goes to 'Acmee Hosting', a vendor created a week earlier. BoBo already pays 'Acme Hosting' $812.00 regularly. What is the right move?"
    options:
      - id: call-vendor
        text: "Call Acmee Hosting yourself to confirm the invoice is genuine"
      - id: escalate-now
        text: "Escalate immediately as a possible shell vendor, without investigating"
      - id: typo-dismiss
        text: "Dismiss it as a typo, since the amount matches a vendor we already approved"
      - id: whitelist-name
        text: "Whitelist the new name so the similarity rule stops firing on it"
    correctOptionIds: [escalate-now]
    explanation: "A near-identical vendor name, a brand-new vendor record and the same amount as an existing vendor together form the classic shell-vendor pattern, so it goes straight to the controller. Calling the vendor feels like diligence but can tip off a wrongdoer and is outside a junior's authority."
  - id: "9764cff4-055b-490e-bb4e-7b48a16bbce4"
    revision: 1
    status: active
    type: single-choice
    prompt: "Three rules fire on one $4,200 Saturday ACH to a vendor added nine days ago. What should the triager do first?"
    options:
      - id: call-vendor
        text: "Call the vendor to check that the invoice is real"
      - id: reverse-payment
        text: "Reverse the payment so the money comes back quickly"
      - id: pull-and-escalate
        text: "Pull the source documents and escalate to the manager"
      - id: dismiss-it
        text: "Dismiss it, since each rule alone is usually harmless"
    correctOptionIds: [pull-and-escalate]
    explanation: "Three rules on the same transaction is the automatic escalation trigger, and the first step is to assemble the invoice, W-9, PO and approval trail so the manager can decide. Dismissing it because each rule is weak on its own ignores that three at once is the signal."
  - id: "23ed70d7-e184-47db-81f1-7f5e9b065091"
    revision: 1
    status: active
    type: single-choice
    prompt: "A duplicate-invoice rule raises 40 flags a week and 38 are dismissed because one vendor reuses template numbers each month. What is the best tuning move?"
    options:
      - id: add-conditions
        text: "Add amount and invoice-date conditions, then re-measure after a month"
      - id: delete-rule
        text: "Delete the rule, since 95% of its flags turn out to be false positives"
      - id: raise-threshold
        text: "Raise the dollar threshold until the weekly flags drop to zero"
      - id: clear-faster
        text: "Keep every flag and ask reviewers to clear them faster"
    correctOptionIds: [add-conditions]
    explanation: "The noise comes from one repeatable pattern, so adding amount and invoice-date proximity removes it while keeping the rule alive for real duplicates. Deleting the rule throws away protection against genuine double payments, and chasing zero flags would hide true positives as well."
  - id: "558ef20f-d4b6-4c3a-9124-d56c5945ba2e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A flag has no supporting documents and involves a brand-new vendor. Which TWO actions fit a first-pass triager?"
    options:
      - id: call-vendor
        text: "Call the vendor and ask them to explain the payment"
      - id: pull-docs
        text: "Pull the invoice, W-9, PO and approval trail into a packet"
      - id: reverse-payment
        text: "Reverse the payment yourself to stop any further loss"
      - id: escalate
        text: "Tell the controller or manager and wait for direction"
      - id: skip-log
        text: "Dismiss it and skip the log because it looks routine"
    correctOptionIds: [pull-docs, escalate]
    explanation: "A triager surfaces and documents: gather the evidence, then hand the decision to someone with authority. Calling the vendor or reversing the payment are tempting because they feel decisive, but both exceed a junior's role and a vendor call can tip off a wrongdoer."
  - id: "a1ceef8d-c3ec-41c5-a17a-05ea653017b8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The controller says, \"Stop flagging Stripe weekend payments, it is noise.\" Which TWO responses keep the control defensible?"
    options:
      - id: rule-off
        text: "Switch the weekend rule off for every vendor to cut the noise"
      - id: quiet-skip
        text: "Quietly skip Stripe rows whenever the weekly report is built"
      - id: whitelist-stripe
        text: "Whitelist Stripe only, so the rule stays live for other vendors"
      - id: sundays-only
        text: "Narrow the weekend rule so it flags Sundays but not Saturdays"
      - id: approve-and-log
        text: "Get written approval and log the change in the monthly tuning log"
    correctOptionIds: [whitelist-stripe, approve-and-log]
    explanation: "A narrow whitelist bounds the risk to one known recurring vendor, and written approval plus a tuning-log entry leaves an audit trail. Quietly skipping rows or narrowing the rule to Sundays changes the control with no record and no justification, so an auditor could not tell what was operating."
  - id: "194916c6-87db-4e6f-a319-01e5b8a17720"
    revision: 1
    status: active
    type: true-false
    prompt: "Benford's Law is a reliable test for deciding whether one single invoice is fraudulent."
    answer: false
    explanation: "Benford's Law compares the first-digit pattern of a whole population of amounts with the expected distribution, so a deviation points to a cluster such as a vendor worth investigating. A single amount starting with 7 or 9 proves nothing by itself."
  - id: "99da1ed1-0bc5-4355-9a3a-78a901ca7f97"
    revision: 1
    status: active
    type: true-false
    prompt: "If a rule has never fired in six months, the first step is to investigate why, not to remove it."
    answer: true
    explanation: "A silent rule may be correctly covering a risk that simply has not occurred, which still gives deterrence and audit evidence, or its logic may be broken so it can never fire. Only after checking which case applies, and documenting that the risk is gone, should the rule be removed."
  - id: "13779368-bda5-405e-826c-65679af29012"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain the three R's of detection and why \"escalate, don't investigate\" is the rule for a junior triager."
    sampleAnswer: "The three R's are Rule, Review and Record: a deterministic rule flags a transaction, a human reviews and triages it, and the decision is recorded in a disposition log with the rule, decision, reviewer and timestamp. A junior should escalate rather than investigate because contacting a vendor can tip off a wrongdoer, creates HR and legal risk, and exceeds the junior's authority. The junior's value is surfacing and documenting accurately, and investigation belongs to the controller, internal audit or forensic specialists."
    explanation: "A strong answer names all three R's, says what the log must contain, and gives at least two reasons that investigating is outside a junior's role. Saying only that juniors lack experience misses the tipping-off and legal risks."
  - id: "6e8eb887-4aca-4aa3-a90c-a1d60202fa6a"
    revision: 1
    status: active
    type: free-recall
    prompt: "A $2,800 payment went to a vendor created 11 days ago, on a Saturday, with a PO signed by the clerk who set the vendor up. The clerk is your work friend. Describe what you do next."
    sampleAnswer: "I would stay calm, not discuss it with the clerk or the vendor, and record the flag in the disposition log. I would pull the packet of invoice, vendor record, PO, W-9 and approval trail and note the segregation-of-duties problem explicitly. Then I would message the controller, or someone one level above my manager if my manager is connected to the clerk, saying the packet is ready and I am not investigating further. I would carry on with the rest of the report, log the item as escalated and pending review, and accept being recused if asked."
    explanation: "Look for three things: escalation to the right person instead of investigation, no contact with the friend or vendor, and a logged trail. The friendship is the reason the process exists, so treating this flag differently from any other would defeat the control."
```

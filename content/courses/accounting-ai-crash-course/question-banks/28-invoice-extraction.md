---
id: "63b4b047-7bfa-41bb-abbb-5ab9c1c397f1"
title: "Invoice Extraction and AP Automation Question Bank"
description: "Practice questions for Invoice Extraction and AP Automation."
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
  - id: "f0628b68-98fe-45bc-b50d-059f5fc08de3"
    revision: 1
    status: active
    type: single-choice
    prompt: "An extracted invoice shows subtotal $100.00, tax $8.00 and total $118.00. Which pipeline step should catch the problem, and why?"
    options:
      - id: schema-validation
        text: "Schema validation, because subtotal plus tax must equal total"
      - id: vendor-lookup
        text: "Vendor lookup, because totals are stored in the vendor master"
      - id: duplicate-check
        text: "Duplicate check, because the amounts differ from the register"
      - id: gl-suggestion
        text: "GL suggestion, because the account depends on the total paid"
    correctOptionIds: [schema-validation]
    explanation: "The validation step runs a reconciliation check: $100.00 plus $8.00 is $108.00, not $118.00, so the record is flagged for a human. The duplicate check compares an invoice to bills already in the AP register, so it never tests whether one invoice's own arithmetic adds up."
  - id: "8dd1a893-b987-4dfb-af0b-bb7f3eab2cf2"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's queue holds two Google Ads invoices that look identical. Which fields does the duplicate check compare?"
    options:
      - id: gl-due-date
        text: "Vendor, GL account, currency and due date"
      - id: four-field-match
        text: "Vendor ID, invoice number, total, invoice date"
      - id: approver-method
        text: "Approver, vendor, amount and payment method"
      - id: amount-parts
        text: "Subtotal, tax, total and currency on the invoice"
    correctOptionIds: [four-field-match]
    explanation: "The duplicate check matches vendor ID, invoice number, total amount and invoice date against the AP register. Subtotal, tax, total and currency all describe the money on one invoice, so they cannot show that the same document arrived twice."
  - id: "9474c5fb-3132-4448-af89-cab4ef9c15be"
    revision: 1
    status: active
    type: single-choice
    prompt: "A new Adobe invoice for $9.99 lists a Stock Image Asset, and the tool's GL suggestion has confidence 0.54. What is the best reviewer action?"
    options:
      - id: keep-usual
        text: "Keep 6110 Software Subscriptions, since Adobe always codes there"
      - id: reject-dup
        text: "Reject it as a duplicate, since Adobe invoices appear monthly"
      - id: open-and-recode
        text: "Open the PDF, confirm a one-off buy, recode to 5020, note why"
      - id: approve-overall
        text: "Approve as is, since the vendor matched and overall passes 0.85"
    correctOptionIds: [open-and-recode]
    explanation: "A GL confidence below the 0.80 threshold means the line item does not fit the vendor's usual pattern, so the reviewer checks the PDF, overrides the code and records the reason. A passing overall score is tempting, but it averages in strong fields and hides the weak coding."
  - id: "e859eb38-79a2-42c2-adcf-8226d1a23bdf"
    revision: 1
    status: active
    type: single-choice
    prompt: "A vendor emails: \"We changed banks, please use the new account for your next payment.\" What should you do?"
    options:
      - id: update-first
        text: "Update the vendor master now and verify by email reply later"
      - id: reply-email
        text: "Reply to the sender asking them to confirm the new details"
      - id: usual-domain
        text: "Accept it if the email comes from the vendor's usual domain"
      - id: call-known-number
        text: "Phone a number already on file and get a second approver"
    correctOptionIds: [call-known-number]
    explanation: "Bank details never change because of a message. The reviewer phones a number already on file, gets a second approver and logs both names. Replying to the sender is tempting, but a fraudster controls that channel and will simply confirm the change."
  - id: "5cc3a88e-3eae-499f-bfa3-1efbb6835757"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the chapter's sample code, which two assertions protect the AP register write?"
    options:
      - id: confidence-dup
        text: "Overall confidence is above 0.85 and no duplicate was found"
      - id: approved-permission
        text: "Status is approved and the user has the ap_approve permission"
      - id: matched-reconciled
        text: "The vendor is matched and the totals reconcile to the subtotal"
      - id: source-version
        text: "Every field has a source and the model version is recorded"
    correctOptionIds: [approved-permission]
    explanation: "The write function asserts that a human set the status to approved and that the user holds the approval permission, so no code path posts without a person's click. Confidence, matching and sources are useful checks earlier in the pipeline, but none of them proves a human decided."
  - id: "d3cb1f5c-096b-430b-98c0-2df5131ebda3"
    revision: 1
    status: active
    type: single-choice
    prompt: "The model returns a total of 1,250.00 with confidence 0.97 but quotes no source text for it. How should the pipeline treat that field?"
    options:
      - id: null-and-review
        text: "As null, and route the invoice to a human for review"
      - id: trust-confidence
        text: "As valid, because 0.97 shows the model is nearly certain"
      - id: small-penalty
        text: "As valid, but with a small cut to the overall confidence"
      - id: vendor-matched
        text: "As valid, because the vendor matched the master exactly"
    correctOptionIds: [null-and-review]
    explanation: "A field with no source quote may be a guess, so the rule is to treat it as null and send it to a person. A high confidence number cannot stand in for evidence, because a model can be confidently wrong."
  - id: "539c83ce-1f7f-45d2-8a6f-3ffcf215b8d7"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the chapter's weights (vendor 0.2, total 0.3, invoice number 0.2, invoice date 0.15, GL code 0.15), every field scores 1.0 except the total at 0.4. What follows?"
    options:
      - id: plain-average
        text: "Overall is 0.88, above 0.85, so it is pre-checked as ready"
      - id: one-weak-field
        text: "Overall is 0.82, but one weak field cannot force a review"
      - id: weighted-review
        text: "Overall is 0.82, below 0.85, so human review is mandatory"
      - id: weakest-field
        text: "Overall is 0.40, matching the weakest field, so it is rejected"
    correctOptionIds: [weighted-review]
    explanation: "The weighted sum is 0.2 + 0.12 + 0.2 + 0.15 + 0.15 = 0.82, which is below the 0.85 line, so review is mandatory. The plain average of 0.88 is the tempting mistake, because it ignores that the total carries the heaviest weight."
  - id: "9bec9b27-ec9a-49cc-94a3-7fbcc902410a"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are guardrails the chapter requires for AI-assisted invoice processing? Select every correct answer."
    options:
      - id: source-quote
        text: "Every extracted field carries a source quote from the invoice"
      - id: no-auto-post
        text: "No code path posts to the register without a human approval"
      - id: audit-fields
        text: "Each action is logged with who, what, when, before and after"
      - id: trusted-skip
        text: "Vendors on a trusted list may skip approval above 0.99"
      - id: silent-upgrade
        text: "The extraction model is swapped whenever a newer one ships"
    correctOptionIds: [source-quote, no-auto-post, audit-fields]
    explanation: "Source quotes, a mandatory approval click and a full who, what, when, before and after audit log are the three guardrails listed. A trusted-vendor skip is tempting but breaks the never-auto-post rule, and the chapter says model versions are locked per record, not swapped silently."
  - id: "a436a86a-4e13-49aa-9617-07ea356d5ee6"
    revision: 1
    status: active
    type: multiple-select
    prompt: "OCR returns the vendor name as \"Ad0be 1nc.\" Which responses fit the pipeline's controls? Select every correct answer."
    options:
      - id: fuzzy-confirm
        text: "Fuzzy-match the name to the vendor master, then have a human confirm"
      - id: flag-new
        text: "Flag NEW VENDOR for a human if no match clears the threshold"
      - id: auto-create
        text: "Create a vendor from the garbled text so the invoice keeps moving"
      - id: number-only
        text: "Skip the vendor field and match on invoice number alone"
    correctOptionIds: [fuzzy-confirm, flag-new]
    explanation: "A fuzzy match can recover Adobe Inc. from the master file, and a human confirms it; if nothing clears the threshold, the item is flagged as a new vendor for a person to create. Auto-creating a vendor from garbled text would pollute the master and create duplicate vendors."
  - id: "6b001b67-e07c-4f77-9756-0659f2b4c277"
    revision: 1
    status: active
    type: true-false
    prompt: "An invoice with overall confidence 0.98 can be written to the AP register without anyone clicking Approve, because the score is high enough."
    answer: false
    explanation: "No invoice posts without a human approval click and an audit log entry, however high the score is. A confidence score only decides how an item is routed in the queue, and it is not a control against errors or fraud."
  - id: "a8f84a0a-1300-4e6c-8cde-14da5ecf45d2"
    revision: 1
    status: active
    type: free-recall
    prompt: "A second Maria Chen invoice for $1,200.00 is flagged as a duplicate in the queue. Describe what you do and what you write in the audit log."
    sampleAnswer: "I open both PDFs side by side and confirm they show the same vendor, invoice number, amount and date. Once I confirm it is the same bill emailed twice, I reject the second one and take no payment action. The audit log note says it duplicates the original invoice, names the four matching fields and records that the original is retained, along with my user and the timestamp."
    explanation: "A strong answer confirms the flag by looking at the documents instead of trusting the system, then rejects the copy rather than paying it. It also names the four duplicate-check fields and shows that the decision is recorded for auditors."
  - id: "6c7adfa0-efd0-46f4-81be-a8f11fcbba84"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how an invoice-extraction pipeline turns a PDF into an AP register entry, and where the human decision sits."
    sampleAnswer: "OCR turns the PDF into text, and an LLM extracts the fields, each with a value, a confidence and a source quote. Validation checks that subtotal plus tax equals total, the vendor is matched to the master, and a duplicate check runs on vendor, invoice number, amount and date. The system suggests a GL account and scores overall confidence, then the invoice lands in a review queue. A person approves, corrects or rejects it, and only an approved invoice is written to the AP register with an audit log entry. AI drafts, human approves."
    explanation: "A strong answer walks the steps in order and names the three things each field carries: value, confidence and source. It places the human approval before the register write, because that is the guardrail that keeps AI in an assistive role."
```

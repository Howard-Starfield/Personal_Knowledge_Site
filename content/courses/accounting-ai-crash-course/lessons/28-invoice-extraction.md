---
id: "4b40c455-e8fe-420a-bc67-de84aba24049"
title: "Invoice Extraction and AP Automation"
description: "Learn how an AI pipeline drafts accounts payable entries from vendor invoices and why a human approves every one."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 28
estimatedMinutes: 45
---

## Why this matters

Many finance teams run vendor invoices through software that reads the PDF and pre-fills the accounts payable (AP) register. The speed is real, but so is the risk: an OCR engine can read $1,200.00 as $12,000.00, a duplicate can be paid twice, and a faked "new bank details" email can send money to a fraudster. Employers value the person who understands the pipeline and its controls, not just the person who clicks through the queue. This lesson shows the pipeline and the one rule that keeps it safe: AI drafts, a human approves.

## What you'll be able to do

- Explain how OCR and field extraction turn an invoice PDF into a structured record.
- Calculate whether an invoice reconciles and compute a weighted overall confidence score.
- Apply the four-field duplicate check to a pair of invoices.
- Decide whether to approve, correct, reject or escalate an item in a review queue.
- Describe the guardrails that stop an AP tool from posting or changing bank details on its own.

## Before you start

Think back to the reconciliation work in the previous lesson, [[courses/accounting-ai-crash-course/lessons/27-python-reconciliation-engine|Previous lesson]], and to accounts payable earlier in the course.

- What does a reconciliation compare, and what do you do with an item that does not match?
- What is an AP register, and what does it tell you about what the business owes?
- Why should a record of who changed what and when exist for every accounting change?

## Step 1 — Turn a PDF into structured data

**Plain language.** Humans read PDFs; ledgers read structured data. Extraction does the first draft of the typing. Two kinds of AI help. OCR (Optical Character Recognition) turns the picture of an invoice into text. Field extraction then decides which number is the total, which date is the due date and which string is the vendor.

**Analogy.** Picture a tireless intern who reads every invoice the same way and never gets bored, but who can be confidently wrong. You would not let that intern post to the ledger unchecked, so you ask them to show their work.

**The rule.** Every extracted field must carry three things: a value, a confidence between 0.0 and 1.0, and a source quote showing the exact text it came from. The prompt tells the model not to guess; a missing field is returned as null with confidence 0.0, and a field with no source is treated as null.

**Worked example.** The Adobe invoice for BoBo Digital Services LLC (a fictional company) becomes this record:

```json
{
  "vendor": { "value": "Adobe Inc.", "confidence": 0.99, "source": "header: 'Adobe Inc.'" },
  "invoice_number": { "value": "ADB-2026-04-118", "confidence": 0.97, "source": "top-right" },
  "subtotal": { "value": 54.99, "confidence": 0.99, "source": "line: 'Subtotal 54.99'" },
  "tax": { "value": 4.4, "confidence": 0.99, "source": "'Tax 4.40'" },
  "total": { "value": 59.39, "confidence": 0.99, "source": "'Total 59.39'" }
}
```

Classic OCR engines such as Tesseract work well on clean documents. Vision-language models can read messy scans and understand layout in one call. Either way, record the engine and version used.

> [!warning] Common mistake
> Trusting a clean-looking number. A faded scan can turn $1,200.00 into $12,000.00 with no visible warning. A value without a source quote is a guess, however neat the JSON looks.

## Step 2 — Validate, match the vendor and catch duplicates

**Plain language.** After extraction, three cheap checks run before any person sees the item: does the arithmetic work, is this a known vendor, and have we already received this bill?

**Analogy.** It is like a mailroom clerk who checks that the numbers add up, that the sender is in the address book, and that the same envelope has not arrived before.

**The rules.**

- **Reconciliation:** subtotal plus tax must equal total (the chapter allows a tolerance under $0.02 for rounding). If not, flag for a human.
- **Vendor lookup:** normalize case and punctuation, try an exact match, then a fuzzy match (a library such as RapidFuzz scores similarity). If nothing matches, flag NEW VENDOR; a human confirms before any new vendor enters the master file.
- **Duplicate check:** compare vendor ID, invoice number, total and invoice date against the AP register, before the item reaches an approver.

**Worked example.** An invoice extracts as subtotal $100.00, tax $8.00, total $118.00. Since $100.00 plus $8.00 is $108.00, the totals do not reconcile and the item goes to a human. Separately, BoBo's April queue held Maria Chen at $1,200.00 and Google Ads at $2,150.00 twice each. The second copies matched on all four fields, so both were rejected; together they would have been $3,350.00 of double payments.

> [!warning] Common mistake
> Treating a duplicate flag as a nuisance. A vendor that is paid twice rarely tells you; they keep the money. Open both PDFs, confirm, reject the copy and write a note.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "f2ff38c6-102c-4063-a8ae-935ed37b1be2"
title: "Checkpoint 1: validation and duplicates"
questionBankId: "63b4b047-7bfa-41bb-abbb-5ab9c1c397f1"
questionIds:
  - "f0628b68-98fe-45bc-b50d-059f5fc08de3"
  - "8dd1a893-b987-4dfb-af0b-bb7f3eab2cf2"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/28-invoice-extraction|Invoice Extraction and AP Automation Question Bank]].

## Step 3 — Suggest the GL code and score confidence

**Plain language.** The system proposes which general ledger (GL) account the expense belongs to, usually from what that vendor was coded to before. It then combines field confidences into one overall score so the queue can be sorted.

**Analogy.** A colleague who has coded Adobe to Software Subscriptions ten times will guess the same again, which is right until Adobe sends something different.

**The rules.**

- If at least 80% of the vendor's recent invoices share one code, suggest it with high confidence (the chapter's example uses 0.95); otherwise fall back to an LLM reading the line item at lower confidence (0.6 in the chapter's example).
- Any GL suggestion under 0.80 is routed to a human with alternatives.
- Overall confidence is a weighted sum: vendor 0.2, total 0.3, invoice number 0.2, invoice date 0.15, GL code 0.15. Below 0.85 means mandatory human review; above it the item is still shown in the queue, pre-checked as ready.

**Worked example.** Suppose every field scores 1.0 except the total at 0.4. The overall score is 0.2 + 0.3 × 0.4 + 0.2 + 0.15 + 0.15 = 0.82, below 0.85, so review is mandatory. For BoBo's Adobe stock-image invoice ($9.99), the usual code 6110 Software Subscriptions – Design would be wrong; the line item said "Stock Image Asset", the GL confidence was 0.54, and the reviewer recoded it to 5020 Stock Assets / Licensed Media.

> [!warning] Common mistake
> Reading only the overall score. An overall score above 0.85 can hide a 0.54 GL confidence, because the strong fields pull the average up. Always look at the weak field.

## Step 4 — Review, approve and keep the audit trail

**Plain language.** A person looks at the source PDF, the extracted record and the suggested code side by side, then approves, corrects, rejects or escalates. Everything is logged.

**Analogy.** The tool is a draft; you are the signature. Auditors ask who signed, and the log is the answer.

**The rules.**

- Sort the queue with the lowest confidence first.
- Approve clean items, correct small issues with a reason, and escalate new vendors, non-reconciling totals and changed bank details.
- The write to the AP register asserts two things: the status is approved, and the user has approval permission. Nothing else may post.
- The audit log records who, what, when, before and after for every action.
- Never change vendor bank information because of an email (this is the chapter's control rule). Call the vendor on a number already on file, require a second approver, and log both names.

**Worked example.** The GL override for the Adobe item is logged as: invoice ID, your user, the timestamp, action "gl_override", before 6110 (suggestion), after 5020 (user override), and the reason "line item is a one-off stock image, not a subscription".

> [!warning] Common mistake
> Believing a high score is a fraud control. A change-of-bank-details email can arrive on a 0.98-confidence invoice. Confidence routes the queue; only a phone call to a known number verifies the change.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "44f6bce1-2200-48f6-813e-f83c9e9354c5"
title: "Checkpoint 2: approval and bank-detail controls"
questionBankId: "63b4b047-7bfa-41bb-abbb-5ab9c1c397f1"
questionIds:
  - "e859eb38-79a2-42c2-adcf-8226d1a23bdf"
  - "5cc3a88e-3eae-499f-bfa3-1efbb6835757"
```

## Try it

Triage these three queue items. For each, choose Approve, Correct and approve, Reject or Escalate, and write one audit log sentence.

1. Amazon Web Services, $842.16, no tax, all fields at 0.98 or higher, GL 6120 with confidence 0.96 (9 of the last 10 invoices used 6120).
2. A vendor invoice where subtotal $250.00, tax $20.00 and total $290.00.
3. Google Ads, $2,150.00, with the same invoice number and date as an invoice already in the register.

> [!example]- Sample solution
>
> 1. Approve. Open the PDF, confirm totals and vendor, and log: "Reviewed PDF; totals reconcile; vendor and GL pattern match prior invoices; approved."
> 2. Escalate or correct. $250.00 plus $20.00 is $270.00, not $290.00, so the reconciliation fails. Open the PDF; if OCR misread a figure, correct it with a reason, otherwise contact the vendor. Log which figure was wrong.
> 3. Reject as a duplicate. Compare both PDFs, confirm the four fields match, and log: "Duplicate of the earlier invoice; same invoice received twice; no payment action."

## Key takeaways

- AI drafts, a human approves; nothing posts to the AP register without an approval click and an audit log entry.
- Every extracted field needs a value, a confidence and a source quote; no source means treat it as null.
- The duplicate check compares vendor ID, invoice number, total and invoice date.
- Overall confidence is weighted and routes the queue; it is not a control against errors or fraud.
- Never change vendor bank details from a message; call a known number and require two approvers.
- Frame any project honestly: a prototype on sample data where AI assists and a human approves.

## Explain it back

In your own words, explain how an invoice-extraction pipeline turns a PDF into an AP register entry, and where the human decision sits.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "6732845a-66b9-47c0-89c6-24c5d3cffa3b"
title: "Chapter quiz: invoice extraction and AP automation"
questionBankId: "63b4b047-7bfa-41bb-abbb-5ab9c1c397f1"
questionIds:
  - "9474c5fb-3132-4448-af89-cab4ef9c15be"
  - "d3cb1f5c-096b-430b-98c0-2df5131ebda3"
  - "539c83ce-1f7f-45d2-8a6f-3ffcf215b8d7"
  - "9bec9b27-ec9a-49cc-94a3-7fbcc902410a"
  - "a436a86a-4e13-49aa-9617-07ea356d5ee6"
  - "6b001b67-e07c-4f77-9756-0659f2b4c277"
  - "a8f84a0a-1300-4e6c-8cde-14da5ecf45d2"
  - "6c7adfa0-efd0-46f4-81be-a8f11fcbba84"
```

Next: [[courses/accounting-ai-crash-course/lessons/29-anomaly-detection|Next lesson]]

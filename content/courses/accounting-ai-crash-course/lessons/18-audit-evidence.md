---
id: "0380d569-45a7-4d01-a7ba-13b62e679208"
title: "Audit Evidence and Documentation"
description: "Learn how to build a reviewable workpaper that traces a financial statement number back to its source evidence."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 18
estimatedMinutes: 45
---

## Why this matters

When a bank, an external accountant or your own senior checks a number, they cannot rely on your memory of how it was produced. They rely on the documentation you left behind. If that documentation is unsigned, undated or impossible to decode, someone has to redo your work, and that is the fastest way to lose a team's trust. Clean, reviewable work lets a reviewer sign off quickly, and it is one of the most visible skills an entry-level accountant can show.

## What you'll be able to do

- Rank common types of support by how strong they are as evidence.
- Build a workpaper with a header, body and footer, and calculate a bank reconciliation that ties to the ledger.
- Decide whether a test is vouching or tracing, and say which assertion it supports.
- Diagnose a review note and respond so that it is cleared on the workpaper itself.
- Explain the guardrails for using AI on workpaper tasks.

## Before you start

Answer these from memory first. Do not look anything up.

- What is the difference between a control that prevents an error and a control that detects one?
- Why does every journal entry need a source document behind it?
- What is a reconciling item, and why can a bank balance and a ledger balance differ even when nothing is wrong?

If these feel shaky, revisit [[courses/accounting-ai-crash-course/lessons/17-internal-controls|Previous lesson]]. All BoBo figures in this lesson are sample data.

## Step 1 — Evidence and the audit trail

**In plain language.** Evidence is anything that supports the claim that a number on the financial statements is real and correct. Think of a detective: a confident story is not enough, so the detective needs fingerprints, receipts and timestamps. Your memory of a transaction is not evidence, and a verbal assurance from the owner is weak evidence.

**The rule.** The reliability of evidence depends on where it comes from. Roughly, from strongest to weakest:

1. original documents from an outside party, such as a bank statement or vendor invoice;
2. internal documents produced under good controls;
3. internal documents without controls;
4. verbal statements.

The **audit trail** is the unbroken chain from a financial statement number back to the originating source document: financial statement, trial balance, general ledger, subledger, source document. If any link is missing, the number is unsupported.

**Worked example.** BoBo's March income statement shows $48,200 of revenue. To support it, you walk back: the income statement agrees to the trial balance, the trial balance agrees to the revenue accounts in the general ledger, the ledger agrees to the individual invoices, and each invoice agrees to a signed Statement of Work and proof of delivery. Now suppose Bo says, "Trust me, that invoice is real." You still need the invoice itself, ideally with proof the work was delivered.

> [!warning] Common mistake
> Treating a confident explanation from the owner as support. Because Bo knows the business best, it feels disrespectful to ask for the document, but a spoken statement is not sufficient evidence on its own.

## Step 2 — Anatomy of a workpaper

**In plain language.** A workpaper is one clean, signed document that supports one number. It is not a worksheet, which is messy scratch work. Think of a workpaper like a labelled evidence bag: anyone who picks it up should know what is inside, where it came from and what it proves.

**The rule.** A workpaper does four things: it states what is being proved, shows numbers that tie to the general ledger, cites the source of each number, and concludes with signoff. It has three zones:

- **Header:** who, what, when and where the information came from. Client, period, workpaper number and title, preparer, reviewer, sources and the cross-reference to the lead schedule. Sources are often logged as PBC items (Provided By Client: documents requested from the client, or internally from the bookkeeper), each with its own number.
- **Body:** the math. Every number carries a tickmark or a cross-reference, with no floating numbers.
- **Footer:** what the work means. A one-sentence conclusion, the exceptions (or "None"), and signed, dated sign-offs.

A **lead schedule** is the top-level summary for a financial statement line, for example Cash, and it rolls up the supporting workpapers beneath it.

**Worked example.** BoBo's Pacific Bank account (GL 1010) at March 31, 2026:

| Line | Amount |
|---|---|
| Balance per bank statement | $25,000.00 |
| Less: outstanding check #1142 to Adobe | ($54.00) |
| Add: deposit in transit | $1,000.00 |
| **Adjusted bank balance** | **$25,946.00** |
| Balance per general ledger | $25,946.00 |
| Difference | $0.00 |

The outstanding check has not reached the bank yet, so it lowers the bank balance. The deposit in transit has not been credited by the bank yet, so it raises it. The header names the client, period, workpaper number and sources. The footer concludes in one sentence, such as "Cash account 1010 agrees to the ledger at $25,946.00 as of 3/31/26 after reconciling items. No exceptions," then adds signatures and dates.

> [!warning] Common mistake
> Leaving out the footer because "the numbers speak for themselves." Without a conclusion, an exceptions list and a signed date, the page is a scratchpad, not a workpaper.

```knowledge-quiz
schemaVersion: 1
quizId: "da57785d-00c6-4f6c-af91-9845f219ce98"
title: "Checkpoint: evidence and workpaper anatomy"
questionBankId: "f1678c3d-b82a-4372-852e-b8c261f51d56"
questionIds:
  - "9c49487b-8904-41ad-9d41-a94cd30c9f8b"
  - "c4058790-b39a-44ad-b2e4-051085b05719"
```

## Step 3 — Tickmarks, vouching and tracing

**In plain language.** A tickmark is a small symbol next to a number that says what work you did on it. It works like a stamp on a passport, showing which checks the number has passed. Different teams use different symbols, so every workpaper must carry a legend that defines them.

**The rule.** Every symbol you use must appear in the legend, and every legend entry must have been used. This lesson's sample legend:

| Tickmark | Meaning |
|---|---|
| A | Agreed to general ledger detail |
| B | Agreed to the bank statement |
| F | Footed: totals re-added |
| X | Examined the original source document |
| R | Recalculated independently |
| V | Vouched from the ledger back to source |
| T | Traced from source forward to the ledger |
| ✓ | No exception |

Two directions of testing matter. **Vouching** starts from a recorded amount and checks it against the source, which tests **existence** (is the recorded amount real? the overstatement risk). **Tracing** starts from the source and follows it into the records, which tests **completeness** (was everything recorded? the understatement risk).

**Worked example.** For receivables, you pick five customer balances from the ledger and pull the invoice and signed Statement of Work behind each, which is vouching for existence. For accounts payable, the main risk is that bills are missing, so you search for unrecorded liabilities, such as April payments for March invoices, which targets completeness. In both cases you place V or T next to the number and keep the legend current.

> [!warning] Common mistake
> Mixing up the two directions. If you start at the ledger and check the document, you are vouching and testing existence; starting at the document and looking for the ledger entry is tracing and tests completeness.

```knowledge-quiz
schemaVersion: 1
quizId: "ba944d48-0881-46a6-9b16-3396bd762a7a"
title: "Checkpoint: tickmarks and testing direction"
questionBankId: "f1678c3d-b82a-4372-852e-b8c261f51d56"
questionIds:
  - "2067ea28-ccf3-4f18-be40-529b91164756"
  - "f39eed84-1fa3-41a8-9676-cc93806e2584"
```

## Step 4 — Keep it reviewable: notes, references and AI

**In plain language.** A reviewer's note is the system working, not a personal attack. Your job is to make the work easier to review each time. Think of the workpaper binder as a shared kitchen: if you leave a mess, the next person cannot use it.

**The rule.** Respond to review notes in three moves: **acknowledge** the note, **address** the underlying work, and **annotate** the workpaper with what you fixed, then re-sign and date. Clear the note in writing, ideally within one business day, and never delete it. Other habits make the binder navigable:

- use specific cross-references such as "Tie to WP A-1.1, line 4", not "see file";
- save supporting email text or a PDF into the binder rather than writing "see email";
- date every support document and screenshot, in the filename and on the page;
- name files consistently, for example `PBC-03_PacificBank_BankStmt_2026-03.pdf`;
- start from a locked template, not last year's file.

**AI guardrails.** AI can draft a binder index, suggest cross-references or draft a request list from a trial balance. It must not invent numbers, dates, vendor names or invoice IDs. Every line it drafts must cite a real source document, a human must review and sign, and the footer should note that AI assisted. If you cannot meet all four, do not use AI for that step.

**Worked example.** A reviewer writes: "No source for the $1,200 accrual." A good response is to find the invoice or calculation, add it to the PBC tracker, cross-reference it on the workpaper, re-sign with the date, and reply on the note: "Cleared. Support added as PBC-09; see WP line 6."

> [!warning] Common mistake
> Answering a review note only by email while leaving the workpaper unchanged. The next reviewer opens the binder and finds the same unsupported number.

```knowledge-quiz
schemaVersion: 1
quizId: "57f7f1e1-9c4a-4026-ae4b-d4a14af4ddac"
title: "Checkpoint: review notes and habits"
questionBankId: "f1678c3d-b82a-4372-852e-b8c261f51d56"
questionIds:
  - "047f71d5-51bb-48cc-8322-6e7114b454d1"
  - "20709c93-881c-404e-8f8a-6e56ea5a0a67"
```

## Try it

BoBo's reconciliation at March 31 shows a bank balance of $14,221.45, outstanding checks that were footed as $2,150.23, and a $776.00 deposit in transit. The ledger balance is $12,847.22. After signing, you re-add the check list from the source and find the correct total is $2,510.23, so two digits were transposed.

1. Recompute the adjusted bank balance with the correct total.
2. State whether it still ties to the ledger, and by how much.
3. List the steps you take on the workpaper and with the reviewer.

> [!example]- Sample solution
> 1. Adjusted bank balance: $14,221.45 − $2,510.23 + $776.00 = $12,487.22. (The original, wrongly footed total gave $14,221.45 − $2,150.23 + $776.00 = $12,847.22.)
> 2. It no longer ties: $12,847.22 − $12,487.22 = $360.00 difference. The footing error was hiding a real unexplained difference, so you must investigate the cause (for example a missing reconciling item or a ledger error) before concluding.
> 3. Steps: re-foot the list from the bank records to confirm $2,510.23; correct the workpaper with a dated footnote explaining the restatement; update the lead schedule; re-sign and date; tell the reviewer in writing before the walkthrough and bring both versions; add a "refoot all subtotals before signing" line to your checklist.

## Key takeaways

- Evidence strength depends on its source: original outside documents beat internal records, and verbal statements are weakest.
- The audit trail runs from the financial statement through the trial balance, ledger and subledger to the source document.
- A workpaper has a header, body and footer, with a conclusion, exceptions and a signed, dated sign-off.
- Every tickmark needs a legend entry. Vouching (ledger to source) tests existence, and tracing (source to ledger) tests completeness.
- Clear review notes on the workpaper itself: acknowledge, address, annotate, then re-sign.
- AI may draft structure, but it never invents facts and never signs for you.

## Explain it back

In your own words, explain what makes an accounting workpaper reviewable. Cover its three zones, the role of tickmarks and the audit trail.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "9197c0d6-9982-428a-bbbe-d8421656c408"
title: "Chapter quiz: audit evidence and documentation"
questionBankId: "f1678c3d-b82a-4372-852e-b8c261f51d56"
questionIds:
  - "6eb6ce18-44c6-4bcc-9e4b-500059c7cdd7"
  - "8a574565-e87c-421f-84fc-186a3f1bb840"
  - "0b4b41da-f00e-46b6-b14c-ef75c6a2ef35"
  - "37d1b5e3-1218-4e2d-a84a-6f264e352060"
  - "51a0fcaf-99ee-4eca-9fd4-2f3ec1c52c3f"
  - "ca4dc8c7-4397-46c3-a36e-5747b57f1048"
```

Next: [[courses/accounting-ai-crash-course/lessons/19-fraud-and-error-detection|Next lesson]]

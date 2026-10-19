---
id: "39acb7fc-0c20-4ca0-bdf2-310ee21a28a1"
title: "ERP Awareness: How Big Systems Run the Same Accounting"
description: "Learn how ERPs connect modules, subledgers and the general ledger, and how to discuss them honestly in an interview."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 23
estimatedMinutes: 40
---

## Why this matters

Almost every accounting job posting lists software, and recruiters use those names to screen candidates. Two mistakes cost new hires: under-claiming ("I have never used any of these") and over-claiming ("I know SAP" after a few videos). If you understand how an ERP works underneath, you can speak with honest competence, which is both safer and more convincing.

## What you'll be able to do

- Explain how an ERP differs from small-business accounting software and why subledgers feed the general ledger.
- Trace one vendor bill from purchase order to payment and state the debits and credits at each posting.
- Diagnose a subledger-to-GL difference and decide what to do next.
- Decide which permissions fit an entry-level user and which controls an approval workflow enforces.
- Write an honest answer about an ERP you have not used, and state the guardrails for AI that drafts entries.

## Before you start

Recall these ideas from earlier lessons before reading on. Try each one from memory.

- What does the AP process do between receiving a vendor bill and paying it? See the [[courses/accounting-ai-crash-course/lessons/22-quickbooks-workflow|Previous lesson]] for how QuickBooks handles it.
- What is a control account, and why would a balance have to equal a list of detail?
- Why should the person who enters a payment not be the only person who approves it?

## Step 1 — ERP versus small-business software, and subledgers

**Plain language.** Small-business tools such as QuickBooks Online and Xero are built for one company recording the basics: invoices in, bills out, a bank feed, standard reports. An ERP (Enterprise Resource Planning system) puts accounting inside a larger system with inventory, procurement, HR and more, all in one database. In QuickBooks you record transactions. In an ERP you often supervise transactions that other modules already created.

**Analogy.** QuickBooks is a well-organized filing cabinet you fill yourself. An ERP is a building's plumbing: when the warehouse scans goods in, the entries flow to the accounting side without anyone retyping them.

**The rule.** The General Ledger (GL) holds account-level balances. Subledgers hold transaction-level detail: the AP subledger lists every vendor bill, the AR subledger every customer invoice, the fixed-asset subledger every asset. Posting in a subledger also posts a corresponding entry to the GL (sometimes summarized, depending on the system), and the subledger total must equal the GL control account.

**Worked example.** At month-end the AP subledger shows $487,200 of open bills, but the GL Accounts Payable balance is $491,500. The difference is $4,300 ($491,500 minus $487,200). You do not change either number to force a match. You run the subledger-to-GL reconciliation report and look for causes such as a manual journal entry posted straight to the AP control account (in systems that allow it), a bill voided without a matching GL change, or a posting that failed. Then you escalate to the controller with what you found.

> [!warning] Common mistake
> Treating the GL as "the real one" and overwriting the subledger to match it. A difference is a signal to investigate, and forcing it closed hides the cause.

## Step 2 — One vendor bill, eight steps

**Plain language.** Follow a single purchase through a fully configured ERP. The screens differ between systems, and the core entry (debit an expense or asset, credit Accounts Payable, roll up to the GL) is the same everywhere. Receipt accruals and three-way matching exist only in fuller ERPs; QuickBooks Online and Xero have no receipt step.

**Analogy.** It is like receiving a package at work: someone orders it, someone signs for it, the bill arrives, and only when all three agree does anyone pay.

**The rule.** A three-way match compares the purchase order, the goods receipt and the vendor invoice. If any of the three disagree beyond the configured tolerance, the bill stops for review instead of posting.

**Worked example.** The company orders 1,200 lb of green coffee at $7 per pound, so the order is $8,400 ($7 times 1,200).

1. Purchase order: recorded as a commitment, with no GL posting yet.
2. Goods receipt: debit Inventory $8,400, credit the GR/IR clearing account (Goods Received / Invoice Received) $8,400.
3. Invoice entry: the AP clerk enters the vendor's $8,400 invoice against the PO.
4. Three-way match: PO, receipt and invoice agree.
5. Approval: the threshold is $5,000, so the bill routes to a manager. Depending on configuration, the bill may be held unposted until approved, or posted and blocked from payment.
6. Posting: debit GR/IR $8,400, credit Accounts Payable for the vendor $8,400.
7. GL roll-up: the AP control account rises by $8,400 and must still equal the subledger.
8. Payment: debit Accounts Payable $8,400, credit Cash $8,400. The audit log records each step.

The GR/IR account is how SAP-style systems handle the gap between receipt and invoice, and it applies to stock items (non-stock goods usually debit an expense instead). NetSuite calls its equivalent Inventory Received Not Billed, and other ERPs name or structure it differently.

> [!warning] Common mistake
> Crediting the vendor's Accounts Payable at the goods receipt. The receipt does record an accrued liability, but it sits in the GR/IR clearing account until the invoice is posted and creates the payable to the vendor.

```knowledge-quiz
schemaVersion: 1
quizId: "84dd8108-aed2-4136-85ea-980981d84206"
title: "Checkpoint: Ledgers and the AP flow"
questionBankId: "9a582055-daf9-48ad-8612-425af2a21acf"
questionIds:
  - "ac75fa17-55ff-4342-84e7-45ceb890c8cc"
  - "6fc73876-29a5-48e8-9d7b-383d1901a596"
```

## Step 3 — Controls: workflow, roles and configuration

**Plain language.** An ERP enforces rules about who can do what. A workflow is a configured path a transaction must follow, such as a bill over a threshold routing to a manager. Role-based access ties permissions to a job role rather than a person, which supports segregation of duties. An audit log records who entered, edited and approved each item.

**Analogy.** A workflow is a signature chain on a paper form, and the audit log is the copy of every signature with a timestamp.

**The rule.** Configuration means using the settings the system already provides, such as turning on an approval threshold. Customization means changing behavior with code or custom objects, which is more expensive and tends to be fragile when the system is upgraded. Posting commits an entry to the GL, and period close locks a period so no new entries land in it (authorized users can normally reopen it).

**Worked example.** A wholesale roaster sets this approval rule: bills under $5,000 auto-approve, $5,000 to $25,000 go to the operations manager, and over $25,000 go to the owner. That rule is configuration. An entry-level AP clerk can enter bills, run standard reports and drill down to the source, but typically cannot approve their own bills, change thresholds, edit the chart of accounts or close the period.

> [!warning] Common mistake
> Approving your own work "to keep things moving." Segregation of duties exists because an independent check catches both errors and fraud.

```knowledge-quiz
schemaVersion: 1
quizId: "cecd3a19-27f5-4356-bb9c-2c102551884c"
title: "Checkpoint: Controls and access"
questionBankId: "9a582055-daf9-48ad-8612-425af2a21acf"
questionIds:
  - "677ffb51-a09c-469e-af2e-3656281876c0"
  - "23b8373d-4c0a-414f-9505-3b8a10f34856"
```

## Step 4 — Talking about ERPs honestly

**Plain language.** You do not need hands-on experience with every ERP, but you must be accurate about what you have done. Name the system, name the module, and name what you actually did and did not do.

**Analogy.** Saying "I speak French" after a phrasebook leads to a bad moment when someone answers. Saying "I can read French and understand the grammar, but I have not held a conversation" earns trust.

**The rule.** Use verbs that match your experience, such as studied, documented or practiced, and avoid claiming admin or configuration skills you do not have. Keep the system and the module separate: "I used the AP module in QuickBooks" names both.

**Worked example.** A recruiter asks about NetSuite and you have only studied it. A strong answer opens with honesty ("I have not used it hands-on"), pivots to the flow you can explain (PO to receipt to invoice to match to approval to posting, and the subledger-to-GL tie), and sets a realistic expectation of a few weeks to learn the screens.

> [!warning] Common mistake
> Listing five systems as "proficient." The first question about a module name or a real workflow exposes it, and the recruiter then doubts the rest of your resume.

## Step 5 — AI and automation inside an ERP

**Plain language.** ERPs are where exports, APIs, robotic process automation (bots that click through screens) and AI tools plug in. As an entry-level accountant you may use or review their output.

**Analogy.** Treat AI output like a junior colleague's first draft: useful, but you read it line by line before it goes in the books.

**The rule.** Guardrails: no fabricated data, a cited source record for every suggestion, a named human approving before posting, an audit trail that shows an AI tool drafted the entry and who approved it, and auto-approval, if allowed at all, only for low-value, low-risk items.

**Worked example.** An AI tool reads a PDF bill and pre-fills a draft in the ERP with a suggested expense account. You open the PDF, confirm the vendor, amount and account, fix anything wrong, and approve. The audit log then shows "drafted by AI tool, approved by" your user name and the time.

> [!warning] Common mistake
> Trusting a high confidence score or a cited source without checking. The citation helps you review, but it does not replace the review.

```knowledge-quiz
schemaVersion: 1
quizId: "ce89b252-1b1e-416f-b2f9-9deccf187394"
title: "Checkpoint: Honest claims and AI"
questionBankId: "9a582055-daf9-48ad-8612-425af2a21acf"
questionIds:
  - "06763545-baa3-4edc-9a8e-20318206d239"
  - "cc55fdad-841f-44f6-8ee5-f75dde64f6d7"
```

## Try it

Write a half-page "ERP familiarity" note for your own portfolio. Include: (1) one sentence naming a system you have used hands-on, if any; (2) one sentence naming an ERP you have only studied, with the module you can explain; (3) the eight-step flow for an $8,400 bill with the debits and credits at receipt, posting and payment; and (4) the cover-letter sentence you would use if a posting says "NetSuite preferred."

> [!example]- Sample solution
> Hands-on: "QuickBooks Online, AP and bank-feed workflow on a personal practice project." Studied: "NetSuite documentation for AP and AR modules, conceptual level only."
>
> Flow: PO for 1,200 lb at $7, a commitment with no posting. Receipt: debit Inventory $8,400, credit GR/IR $8,400. Invoice entered, three-way match passes, the bill routes to a manager because it is over $5,000. Posting: debit GR/IR $8,400, credit Accounts Payable $8,400. Payment: debit Accounts Payable $8,400, credit Cash $8,400.
>
> Cover-letter sentence: "I have not worked hands-on in NetSuite, but I understand the accounting flow it automates, from three-way match to the subledger-to-GL reconciliation, and I expect to be productive on the screens within a few weeks."

## Key takeaways

- An ERP integrates accounting with operations, so accountants often supervise entries that other modules already created.
- Subledgers hold detail and the GL holds summaries; the subledger total must equal the GL control account, and any difference is a break to investigate.
- A three-way match of purchase order, receipt and invoice must agree before a bill is approved for payment.
- Workflows, role-based access and the audit log enforce segregation of duties; entry-level users enter and review but do not approve their own work or configure the system.
- Be honest about hands-on experience: name the system, the module, and what you did and did not do.
- AI may draft entries, but a named human approves before anything posts, with a source record and an audit trail.

## Explain it back

In your own words, describe how one vendor bill moves through an ERP from purchase order to payment, and why the AP subledger must tie to the GL.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "41e76a82-7e71-42a5-bfee-c927bf5c00b5"
title: "Chapter quiz: ERP awareness"
questionBankId: "9a582055-daf9-48ad-8612-425af2a21acf"
questionIds:
  - "a2faba88-936a-48be-a914-658a81f15da9"
  - "d9eee7e0-c128-414a-b3b1-45be45825180"
  - "7f7a9198-e9ef-4215-b349-fd851ed72f3b"
  - "02822a55-1a14-4559-b659-92d7081b3780"
  - "8979db8c-691d-49a3-bbef-48da48f63ef9"
  - "3e7fe3cb-599a-4376-be3f-2e18119daea4"
```

Next: [[courses/accounting-ai-crash-course/lessons/24-sql-for-accounting|Next lesson]]

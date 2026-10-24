---
id: "1574bc21-6865-4fa7-9be6-429c0d83dee7"
title: "AI in Accounting: Useful vs Dangerous"
description: "Learn which accounting tasks AI can safely draft, which need strict guardrails, and which must never be automated."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 30
estimatedMinutes: 40
---

## Why this matters

Every accounting team is being pushed to "use AI," and used well it turns an hour of drafting into ten minutes. Used carelessly it invents a vendor balance, auto-posts journal entries nobody can explain, or accepts a spoofed email that changes a vendor's bank details before the next payment run. In your first weeks on a job, one unchecked AI number can cost you your reputation. The rule that protects you is short: AI accelerates the draft, and the human owns the answer.

## What you'll be able to do

- Explain why AI can invent numbers and how grounding reduces that risk.
- Explain why AI cannot be the system of record for the books.
- Classify an AI use case as safe with review, heavy-guardrail, or never automated.
- Diagnose an AI-drafted paragraph by tying each figure to a source.
- Build a draft, verify, log routine for a month-end task at BoBo Digital Services LLC.

## Before you start

Answer from memory, without looking anything up.

- Why does a company separate the person who prepares an entry from the person who approves it?
- What does "tie to source" mean when you review a number in the previous lesson's work?
- What is the difference between a system that records transactions and a document that merely describes them?

Review: [[courses/accounting-ai-crash-course/lessons/29-anomaly-detection|Previous lesson]].

## Step 1 — AI is a pattern machine that can invent

**In plain language.** An AI assistant reads a lot of text, learns what answers usually look like, and produces output that sounds right. It does not know what it does not know. When it lacks a number, it will often produce one that looks right anyway.

**Analogy.** Think of a very fluent new hire who hates saying "I don't know" and fills gaps with confident guesses.

**The rule.** A _hallucination_ is output that is confidently false, with no basis in any supplied source. _Grounding_ means forcing the AI to answer only from source material you supply, ideally with citations. In accounting, if the AI cannot cite it, do not trust the number.

**Worked example.** At BoBo Digital Services LLC, May marketing was $5,840, April was $4,120 and the budget was $4,500. You give the AI the GL extract and it drafts a paragraph. You check it:

- Month-over-month increase: $5,840 − $4,120 = $1,720, correct.
- Over budget: $5,840 − $4,500 = $1,340, and $1,340 ÷ $4,500 = 29.8%, correct.
- "Prior-year May marketing was about $3,975": you never supplied prior-year data. The 2024 GL says $2,210.

The AI invented the prior-year figure to make the paragraph feel complete. You replace it with the real $2,210 and note in the binder that the AI draft contained a fabricated amount, verified against the 2024 GL.

> [!warning] Common mistake
> Assuming a specific-looking number, such as one with a decimal place, must have come from somewhere. Precision is not evidence. Only a source document is.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "0b580e79-596a-4af0-8519-afb906fad72f"
title: "Checkpoint 1 — Hallucination and grounding"
questionBankId: "5b2c833f-6bcf-4e6c-9c2f-9c9cfaa89554"
questionIds:
  - "4fb40ab9-7957-4083-841b-d27af9c255ad"
  - "a0af94f3-1b06-441b-81cb-0dce2f53e432"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/30-ai-in-accounting|AI in Accounting: Useful vs Dangerous Question Bank]].

## Step 2 — Why AI cannot be the system of record

**In plain language.** An Excel formula gives the same answer every time you feed it the same inputs. An AI model gives answers that are similar but not guaranteed identical. Books of record must be reproducible, so an auditor can re-perform the work and get the same result.

**Analogy.** Excel and QuickBooks are the kitchen where the food is cooked; the AI is a sous-chef who plates beautifully. The customer, whether the CFO, an auditor or the IRS, is served only after the head chef, you, has tasted the dish.

**The rule.** Determinism means same input, same output. Probabilism means same input, similar but not identical output. The AI's _confidence score_ is the model's own estimate of itself, so it is a sort key for what to review first, never proof of accuracy.

**Worked example.** Your AI tool extracts an invoice total and reports 96% confidence. You open the PDF next to the proposal anyway. At BoBo's pilot, one extraction on a partial-month consulting bill came out $312 too high because of a sales tax miscalculation; the clerk caught it only because the PDF was open. The score said "probably fine," and the source said otherwise.

> [!warning] Common mistake
> Treating a high confidence score as accuracy. Models are routinely confidently wrong, especially about numbers and citations.

## Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "82c16d7c-9627-48fb-b733-72d374c118a9"
title: "Checkpoint 2 — Confidence and determinism"
questionBankId: "5b2c833f-6bcf-4e6c-9c2f-9c9cfaa89554"
questionIds:
  - "05744472-0a50-487b-a6c6-0fec5a214c0a"
  - "d17efa78-21c9-4f38-aa14-e19f2b94f914"
```

## Step 3 — The decision table: safe, heavy guardrails, never

**In plain language.** Ask what role the AI is playing, then decide how much review it needs.

**Analogy.** A drafting assistant is a capable but unverified intern: read every line. A poster, payer or master-data editor is an intern holding the company checkbook, and controls exist so no single junior has it.

**The rule.**

| AI acts as                                     | Treat it like                                       | Examples                                                                                                                                        |
| ---------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Drafter, extractor, searcher                   | An intern or scanner; review the output             | Variance commentary, invoice field extraction, contract summaries, checklists, audit-prep templates, searching your own policies with citations |
| Calculator or forecaster                       | Helpful but heavy review; the system of record wins | Depreciation, forecasts                                                                                                                         |
| Poster, payer, master-data editor, tax decider | Stop; a human approver, always                      | Auto-posting journal entries, approving payments, changing vendor bank details, tax conclusions, overwriting records                            |

The cleanest test: if this AI output were wrong, who would catch it before harm is done? If the answer is nobody, do not ship it.

**Worked example.** Three requests arrive on day two of close.

1. Summarize a new $80,000 vendor contract: safe with review. Re-open the contract and confirm renewal, termination and indemnity clauses; the summary is a map, not the terrain.
2. Suggest GL codes for bank-feed lines: safe with review. Keep the _suggest_ switch on and the _post_ switch off.
3. Update three vendor records from emailed instructions: never. Call each vendor on a number you already have, require two human approvers, and document it.

> [!warning] Common mistake
> Thinking "AI is good at categorizing, so let it post too." Posting removes the human approval, and wrong codes flow into the P&L, tax filings and KPIs.

## Step 4 — Your daily routine: draft, verify, log

**In plain language.** Use AI for first-pass prose, never first-pass numbers. Pull the numbers from QuickBooks Online or Excel yourself and put them into the prompt.

**Analogy.** Pilots use autopilot but still run a checklist. The automation helps; the accountability stays with the pilot.

**The rule.** Three verbs: _draft_ (AI proposes), _verify_ (you tie every number to source), _log_ (record the prompt, sources, output, reviewer and decision). Add a note such as "tied to GL extract" to anything you share, escalate anything that touches master data, payments or tax, and tell your manager when AI helped.

**Worked example.** Your AR aging summary from the AI shows a 90+ bucket of $1,482, but QuickBooks shows $1,428. The system of record wins, so you use $1,428, work out why the AI differed (stale paste, rounding or invention) and note the discrepancy in your AI log. A log row looks like: date, task, tool, prompt summary, sources, reviewer, decision.

> [!warning] Common mistake
> Hiding that you used AI. Transparency builds trust; being found out destroys it.

## Checkpoint 3

```knowledge-quiz
schemaVersion: 1
quizId: "26df333a-34a9-4fe5-973b-dbd47e03f69c"
title: "Checkpoint 3 — Decision table and master data"
questionBankId: "5b2c833f-6bcf-4e6c-9c2f-9c9cfaa89554"
questionIds:
  - "ef6393e9-8384-4b97-b51a-ca27e35535d5"
  - "d621d3a8-159b-45e0-a591-8dcad1d8049e"
```

## Try it

Maya lists four ideas the team is considering. For each, write **Safe with review**, **Heavy guardrails**, or **Never**, and name two guardrails.

1. AI drafts the May marketing variance paragraph from the GL extract.
2. An AI agent with write access to QuickBooks auto-posts recurring rent entries each month.
3. AI summarizes a new $120,000 client contract into a one-page brief for the close binder.
4. AI updates vendor bank details from emailed remittance instructions.

> [!example]- Sample solution
>
> 1. **Safe with review.** Feed the actual GL extract, require citations to invoices, tie every dollar amount to source, get reviewer sign-off and log the prompt and output.
> 2. **Never as described.** The AI may propose the entry to a review queue, but a human posts it, the preparer and approver are different people, and QuickBooks keeps the audit trail.
> 3. **Safe with review.** Use a sanctioned grounded tool, require section citations, re-open the contract to confirm renewal, termination and indemnity terms, and mark the brief "AI-drafted, human-verified."
> 4. **Never.** Call the vendor on a known number, require two human approvers, document it in the vendor file, and keep the AI locked out of master-data writes.

## Key takeaways

- AI should assist accounting work, not replace accounting controls.
- Hallucinations are confident inventions; grounding in supplied sources and citations is the main defense.
- AI is probabilistic, so the system of record stays in Excel and QuickBooks, and numbers come from the system, not the model.
- Confidence scores are a triage hint, never proof.
- Never let AI post entries, release payments, change master data, or settle tax positions without the required human approver or professional.
- Draft, verify, log: tie every number to source and keep an audit trail.

## Explain it back

In your own words, explain to a hiring manager how you use AI in accounting work, covering what AI drafts, what you verify, and what it never does.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "05b476e8-38c4-4ee7-8164-f5e087857cc3"
title: "Chapter quiz — AI in Accounting"
questionBankId: "5b2c833f-6bcf-4e6c-9c2f-9c9cfaa89554"
questionIds:
  - "a9db1106-591c-41e5-9bde-6ded2b99515b"
  - "d242ee42-414d-4d41-aee3-cba1aca91435"
  - "1582932c-aee8-4ab8-9bda-d6dcb3bb423b"
  - "8368e09c-9c87-4c5d-9e8a-de4c3d86b919"
  - "6c4254bd-9607-41ee-a051-2ad3cb778e44"
  - "19edf757-138f-499e-b584-b6cf14a6b859"
```

Next: [[courses/accounting-ai-crash-course/lessons/31-ledgerguard-ai-agent|Next lesson]]

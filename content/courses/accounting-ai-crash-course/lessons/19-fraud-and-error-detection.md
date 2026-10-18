---
id: "90c9da0b-b4e1-4c57-9bf0-dabb52234261"
title: "Fraud and Error Detection Basics"
description: "Learn to spot common red flags in accounting data and to flag, document and escalate them the way an entry-level accountant should."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
  - fraud
  - controls
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 19
estimatedMinutes: 40
---

## Why this matters

Money goes missing or gets misstated in two ways: honest errors and deliberate fraud. Much of the time the first person to notice is not an outside auditor but someone in accounting who sees a pattern that does not feel right. At the entry level that person may be you, running the payables report or the bank reconciliation. Your job is to be the smoke alarm, not the fire department: notice, document, escalate. People who confuse finding with investigating can damage a case, and sometimes their own career.

## What you'll be able to do

- Explain the three sides of the Fraud Triangle and say which one accounting controls can reduce.
- Diagnose red flags such as split payments, round-dollar payments, ghost vendors and late manual journal entries in a transaction list.
- Decide whether a finding should be flagged, and name who receives the flag.
- Write a neutral, non-accusatory flagging memo sentence.
- Describe the guardrails for using AI to explain flagged items.

## Before you start

Think back to the earlier lessons on source documents and on audit evidence. Try these without looking:

- Why must every journal entry trace back to a source document?
- What does it mean to separate duties so that no one person controls a whole transaction?
- What is the difference between a mistake and a misstatement that someone made on purpose?

Need a refresher? Revisit the [[courses/accounting-ai-crash-course/lessons/18-audit-evidence|Previous lesson]].

## Step 1 — Why people commit fraud, and why you shouldn't assume it

**Plain language.** Fraud is deliberate deception for gain. Criminologist Donald Cressey described three conditions that tend to be present together, called the **Fraud Triangle**: *pressure* (money trouble or a target to hit), *opportunity* (a gap in controls), and *rationalization* ("I'll pay it back"). Think of a fire: it needs fuel, heat and oxygen. You cannot see someone's pressure or rationalization in a report, but you can see opportunity and the residue fraud leaves in data.

**The rule.** Opportunity is the side that accounting controls can reduce, through segregation of duties, approval limits, mandatory vacations and review of journal entries. A red flag is a *pattern that deserves a question*, not a verdict. Most odd findings turn out to be messy data, such as an invoice keyed twice, so you do not decide whether something is error or fraud. You only decide whether it deserves a second look, and the second look belongs to your supervisor, the controller, internal audit or forensic specialists.

**Worked example.** At BoBo Digital Services LLC (a fictional company), a clerk both adds new vendors to the vendor master and approves payments to them. Pressure and rationalization are invisible, but the missing second person is plainly visible: that is opportunity, and the fix is to require a different approver for vendor changes than for payments.

> [!warning] Common mistake
> Treating a red flag as proof. A round number or a PO Box proves nothing by itself; it only tells you where to ask the next question.

## Step 2 — Tests that surface the patterns

**Plain language.** Red-flag tests are filters on data you already have. Real invoices usually have odd cents and arrive on weekdays; made-up ones are often tidy and sometimes hug a limit.

**The rule and the tests.** Run these on a regular schedule:

- **Duplicate invoices:** group by vendor and invoice number and keep groups with more than one row; also look at same amount, same date, different invoice numbers.
- **Split payments (structuring):** one transaction broken into smaller ones to stay under a limit. Banks must report cash transactions of more than $10,000 in a business day, and breaking up cash to avoid that report is legally called structuring; splitting vendor payments to stay under an internal approval limit is the same pattern. Sum each vendor's payments over a rolling 30 days and look for totals over the limit made of items each under it.
- **Round-dollar payments:** filter for amounts that are exact multiples of $100 and compare against the usual share.
- **Weekend or holiday payments:** rare and individually justifiable when legitimate.
- **Manual journal entries near close:** count entries by user in the last five days of a period and compare with that user's normal.
- **Vendor bank account changes:** any change followed soon by a payment is high priority.
- **Benford's Law:** in naturally occurring numbers the first digit is 1 about 30% of the time and 9 only about 4.6%. Fabricated numbers often miss this pattern, but it only works on large datasets.

**Worked example.** BoBo's March payments to JR Strategic Advisors: $4,900.00 on 03/03, 03/10, 03/17, 03/24 and 03/31, against a $5,000 approval threshold. Five payments, a round amount, a new vendor with a PO Box. A rolling sum shows $24,500 in about four weeks, none of it reaching the threshold. Result: flag, with the vendor ID, the five payments and the $5,000 threshold.

> [!warning] Common mistake
> Assuming a round retainer must be fraud. Many legitimate retainers are round, so flag it for review and let the controller decide.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "96067a11-191d-4b46-928e-f0f9c3ad0c42"
title: "Checkpoint — triangle and tests"
questionBankId: "088e3c3c-e345-44d5-b610-58481f5d270d"
questionIds:
  - "5a97d279-2e79-4142-9e72-879944af2068"
  - "a96fc76d-41b4-4623-b170-a0fc63f79e06"
```

## Step 3 — Common schemes and their fingerprints

**Plain language.** Each scheme leaves a different fingerprint, so you learn to look for the fingerprint rather than the crime.

**The definitions.**

- **Skimming:** stealing cash or check receipts *before* they are recorded, so there is no entry to find, only a missing one.
- **Lapping:** hiding a stolen receipt from Customer A by applying Customer B's later payment to A's account, and so on in a continual shuffle. Look for aging anomalies and customers complaining about "missing" payments.
- **Ghost vendor:** a fake vendor in the payables master. Look for a PO Box only, no website or phone, a name close to a real vendor, and bank details or an address matching an employee.
- **Phantom employee:** a fake person on payroll whose pay goes to an account the fraudster controls. Look for no benefit deductions, no time off taken, or details matching another employee.
- **Period-end journal entries:** not wrong in themselves (accruals belong there), but a spike by one user, especially entries that credit revenue, deserves a look.

**Analogy.** Lapping is like robbing Peter to pay Paul: the hole never closes, so the thief has to keep feeding it.

**Worked example.** BoBo's March JE log shows eleven manual entries by one user ID in the last four days of the month, against an average of three, all crediting revenue for a combined impact of $87,400. You do not interview the preparer. You pull the entries, the user's usual count and the amounts, and send them to the controller.

> [!warning] Common mistake
> Thinking no entry means no fraud. Skimming leaves no entry at all, so you look for gaps and complaints, not only for odd records.

## Step 4 — Your role: find, flag, escalate, stay quiet

**Plain language.** You are a finder and flagger, not an investigator. Calling the vendor, confronting the approver or venting to a friend in the office can tip off a wrongdoer, who may destroy evidence or coordinate stories.

**The rule.** The daily and monthly routine is:

1. Run the scheduled anomaly reports.
2. Drop obvious false positives, such as a retainer you already confirmed.
3. Document each remaining item with transaction ID, amount, party, source report and date.
4. Walk the list to your supervisor or controller.
5. Stop and wait for direction.
6. Cooperate fully with any investigation that follows.

When unsure, flag. Never skip a noisy report; refine the query instead and get sign-off in writing. Keep memo language neutral: describe what you saw, not what you concluded. Memos can become evidence, and an accusation can defame an innocent person.

**AI guardrails.** AI can explain a flagged row in plain English, but it must cite the specific columns it used, add no facts that are not in the data, never accuse a named person, keep a saved audit trail of prompt and answer, and always be reviewed by a human. Do not paste names or sensitive identifiers into a public AI tool.

**Worked example.** The wrong memo line: "K. Smith is committing fraud." The right one: "Five $4,900 payments to one vendor noted; recommend review." If the person involved is someone you respect, the same rule applies, and if the controller is involved, escalate one level higher.

> [!warning] Common mistake
> Quietly checking with the vendor first "just to be sure." That is investigating alone, and it may be the very tip-off that lets evidence disappear.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "65b9ce72-f621-42ed-a04d-fe1bfddfa87b"
title: "Checkpoint — schemes and your role"
questionBankId: "088e3c3c-e345-44d5-b610-58481f5d270d"
questionIds:
  - "200aa372-46b5-4e2c-b22d-6fe1f62bac92"
  - "73660e3e-c470-469c-8f91-e01874ae30f1"
```

## Try it

BoBo's March list has four lines. For each, say whether you would flag it and why, and name who gets the flag.

1. 03/02, Adobe, $54.99, monthly subscription on the corporate card.
2. 03/11, Sky Lounge Bar, $284.16, reimbursement to an employee, and a corporate card charge for the same vendor, amount and date for the same employee.
3. 03/16 (Sunday), a new vendor, $12,300 ACH, manual override, no approver in the log.
4. 03/07 and 03/14, two vendors with different names and IDs but the same street address.

> [!example]- Sample solution
> 1. Normal. A routine recurring charge; no flag.
> 2. Flag. The same amount, vendor and date appear twice, which looks like a double claim or a sloppy reimbursement. Send it to the payables supervisor and do not contact the employee.
> 3. Flag. It is a weekend payment to a new vendor with no approver on record. It may be a legitimate emergency, but the approval gap has to be closed. Send it to the controller (or one level higher if the controller approved it).
> 4. Flag. Two vendor IDs at one address could be a legitimate parent and subsidiary, a duplicate setup or a ghost vendor. Document both records and escalate for a vendor consolidation review.

## Key takeaways

- The Fraud Triangle is pressure, opportunity and rationalization; opportunity is the side controls can reduce.
- Red flags are patterns that deserve a question, not verdicts about anyone's intent.
- Standard tests cover duplicates, split payments, round dollars, weekend payments, late manual entries and vendor bank changes.
- Your role is to find, flag, document and escalate quietly, and never to investigate or tip anyone off.
- Neutral memo wording protects you and the person who may be innocent.
- AI may explain a flag but must cite the data, never accuse, and always be checked by a human.

## Explain it back

In your own words, explain what an entry-level accountant does and does not do when something in the data looks wrong, and connect it to the Fraud Triangle.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "0fe41207-51da-4a4f-bc36-4cfce8e0bab3"
title: "Chapter quiz — fraud and error detection"
questionBankId: "088e3c3c-e345-44d5-b610-58481f5d270d"
questionIds:
  - "954c978a-d608-4e76-82f7-9a75532b35c8"
  - "ea77d623-2a00-4fbd-9255-28cfaaabfa4f"
  - "6663be19-9f9a-44d7-afe1-dd405cf4f57b"
  - "dca21a5f-9ff0-44d3-b6c3-968fc2f83281"
  - "fccd7e12-aa9b-4e89-912e-a85ceddcf922"
  - "d0984420-954e-40ff-81e9-388f40b13e41"
  - "19b953fc-0db8-4a8e-b128-c918494085be"
  - "ed801858-3417-4ab9-b665-0e5f90d43692"
```

Next: [[courses/accounting-ai-crash-course/lessons/20-excel-essentials|Next lesson]]

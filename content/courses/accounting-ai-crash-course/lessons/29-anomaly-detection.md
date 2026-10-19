---
id: "e3d041e6-381b-4f33-8b7b-aefa356129bd"
title: "Accounting Anomaly Detection"
description: "Build a small rule library for accounts payable, then triage what it flags and escalate the right items."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 29
estimatedMinutes: 40
---

## Why this matters

Most payment errors and internal fraud are not spotted by someone staring at a screen. They are surfaced by a rule that runs every week and produces a short list of unusual items for a person to review. Auditors increasingly expect data analytics over whole populations rather than samples. A junior accountant who understands both the rules and the triage discipline behind them is useful from the first week, and is far better placed than someone who simply trusts a black-box "AI fraud detector".

## What you'll be able to do

- Explain what an accounting anomaly is and why it is not the same as fraud.
- Write pandas logic for common accounts payable flags such as duplicate invoices, weekend payments, round-dollar payments and new-vendor payments.
- Decide whether a flagged transaction should be dismissed, documented or escalated.
- Diagnose a noisy rule using its false-positive rate and propose a tuning change.
- Describe the guardrails for using an AI model to draft explanations of flags.

## Before you start

Recall these ideas from earlier lessons before reading on:

- What documents does a three-way match compare before an invoice is paid?
- Why should the person who prepares a payment not also approve it?
- What does an audit trail let an outsider reconstruct?

If you need a refresher on invoice handling, revisit the [[courses/accounting-ai-crash-course/lessons/28-invoice-extraction|Previous lesson]].

## Step 1 — What an anomaly is, and how we detect it

**In plain language.** An anomaly is a transaction that breaks a pattern. Think of a smoke alarm: it goes off for burnt toast as often as for a real fire, and its job is to make a person look, not to name the cause.

**The precise rule.** A pattern can be one of three things, and each gives a different kind of anomaly:

- A written rule, such as "invoices over $5,000 need a PO". Breaking it is a *rule violation*.
- History, such as a vendor who usually bills about $400 a month. Breaking it is a *statistical outlier*.
- A relationship, such as a vendor address matching an employee address. Breaking it is a *data integrity flag*.

Detection comes in two flavors. *Rule-based* detection asks "did this specific condition happen?" and is cheap, transparent and easy to defend to an auditor. *Statistical* detection asks "is this unusual compared with history?" using tools such as a z-score (how many standard deviations a value sits from the mean) or Benford's Law (the expected spread of leading digits). Statistics can see subtler patterns but are harder to explain and easier to over-trust, so entry-level teams normally start with rules.

**Worked example.** Suppose a vendor's monthly bills have a mean of $400 and a standard deviation of $100 (illustrative numbers). A $650 bill has z = (650 - 400) / 100 = 2.5, so it is not flagged by a "z above 3 in absolute value" rule. A $750 bill has z = 3.5 and is flagged. Neither number tells you whether the bill is legitimate; it only tells you a person should look.

> [!warning] Common mistake
> Treating "anomaly" as a synonym for "fraud". Most anomalies are legitimate but unusual, such as a real rush payment or a real new vendor. Detection surfaces; triage decides which ones matter.

## Step 2 — The rule library in pandas

**In plain language.** A rule library is a short list of named, repeatable checks, like a pre-flight checklist. Each check has a name, a severity and a recommended action.

**The precise rules.** These flags are the core of the weekly BoBo Digital Services LLC accounts payable report:

| Flag | Condition |
|---|---|
| Duplicate invoice number | Same vendor and same invoice number on more than one row |
| Weekend payment | Pay date falls on Saturday or Sunday |
| Round-dollar payment | Amount above $1,000 and divisible by 100 |
| New vendor, high payment | Payment above $1,000 within 30 days of the vendor being created |
| Missing approval | No approver recorded on a payment above the approval threshold (the source example uses $500) |

The thresholds ($1,000 and 30 days) are defaults you can tune. In pandas, Monday is weekday 0, so Saturday and Sunday are 5 and 6.

```python
import pandas as pd

ap = pd.read_csv("bobo_ap_subledger.csv", parse_dates=["pay_date", "invoice_date"])

# Duplicate invoice number: keep=False marks every copy, not just the later one
dup_mask = ap.duplicated(subset=["vendor_id", "invoice_number"], keep=False)

# Weekend payment
weekend = ap[ap["pay_date"].dt.weekday >= 5]

# Round-dollar payment above the threshold
round_dollar = ap[(ap["amount"] > 1000) & (ap["amount"] % 100 == 0)]

# New vendor with a high payment
vendors = pd.read_csv("bobo_vendor_master.csv", parse_dates=["created_date"])
joined = ap.merge(vendors.loc[:, ["vendor_id", "created_date"]], on="vendor_id", how="left")
joined["days_since_created"] = (joined["pay_date"] - joined["created_date"]).dt.days
new_vendor_hi = joined[(joined["days_since_created"] <= 30) & (joined["amount"] > 1000)]
```

**Worked example.** BoBo pays Pacific Northwest Creative LLC $4,200.00 by ACH on Saturday, May 4. The vendor was created on April 25, nine days earlier. Round-dollar: 4,200 is above 1,000 and 4,200 % 100 is 0, so it fires. Weekend: Saturday, so it fires. New vendor: 9 days is at most 30 and the amount is above $1,000, so it fires. Three rules hit one transaction.

> [!warning] Common mistake
> Reading the threshold loosely. A payment of exactly $1,000.00 does not satisfy "amount above $1,000", so the round-dollar rule does not fire on it. Always test your boundary values, because an off-by-one threshold silently changes what your control catches.

```knowledge-quiz
schemaVersion: 1
quizId: "645d2df2-8c3c-4041-a0ca-1b0ce3f2673c"
title: "Checkpoint — anomalies and the rule library"
questionBankId: "813ff0ec-fd79-40d9-b530-d5afc19e2cc8"
questionIds:
  - "d324228b-970e-4ed2-bd31-ccc751354642"
  - "6e4be0d2-48bc-4fff-a0f3-7eddac806648"
```

## Step 3 — Triage: dismiss, document or escalate

**In plain language.** Think of an emergency-room nurse. The nurse does not perform surgery; the nurse checks each arrival, handles the minor ones with the paperwork at hand, and calls the doctor for the serious ones. In anomaly work you are the triage nurse, not the detective.

**The precise rule.** Every flag ends in one of three dispositions:

1. **Dismiss.** Existing documentation (PO, approval email, receipt, contract, recurring schedule) clears it. Write a one-line note and attach the evidence.
2. **Document.** It is probably fine but the paperwork is messy. Leave a note for the AP manager.
3. **Escalate.** Several rules hit one transaction, the flag is Critical, documentation that should exist is missing, or the same vendor appears across several weeks. Three or more rules on one transaction is an automatic escalation.

When you escalate, you assemble the source documents and tell your manager or the controller. You do not contact the vendor, reverse the payment, or voice an accusation, because that can tip off a wrongdoer, creates HR and legal risk, and is beyond a junior's authority.

**Worked example.** For the $4,200 payment above, the triager pulls the invoice PDF, W-9, PO and approval email, logs the three flags, and messages the manager that the packet will be ready shortly and that the vendor will not be contacted. The manager finds a PO signed by the CMO and a flat-fee contract for a real freelance deliverable, so the item is documented and dismissed. The control still worked, because the right people reviewed it within an hour and the log now answers any later auditor question in seconds.

> [!warning] Common mistake
> Calling the vendor "just to verify". If the payment is fraudulent, that call warns the fraudster. If it is legitimate, it can damage the relationship. Escalate first and let someone with authority decide.

```knowledge-quiz
schemaVersion: 1
quizId: "3f9e5029-c11b-4535-bffe-7823cff869f6"
title: "Checkpoint — triage and escalation"
questionBankId: "813ff0ec-fd79-40d9-b530-d5afc19e2cc8"
questionIds:
  - "9764cff4-055b-490e-bb4e-7b48a16bbce4"
  - "558ef20f-d4b6-4c3a-9124-d56c5945ba2e"
```

## Step 4 — Tuning, whitelists, the audit trail and AI guardrails

**In plain language.** A rule that cries wolf every week trains people to ignore it. Tuning is the monthly habit of checking which rules are noisy and sharpening them, like adjusting a car alarm that goes off in the wind.

**The precise rules.**

- A **false positive** is a flag on a legitimate transaction; a **false negative** is a real problem the rules missed. Too many false positives cause alert fatigue, which in turn produces false negatives because real flags get ignored.
- A **whitelist** is a pre-approved list of vendors the rule should not flag, such as a landlord for the round-dollar rule or a recurring software vendor that settles on Saturdays. Add to it only with documented, written approval and log the change.
- The **disposition log** records the rule that fired, the decision, the reviewer, the timestamp and a link to the evidence. Without it, a control is effectively not operating, because nobody can prove it was reviewed.
- Each month, compute the false-positive rate per rule. A rule above about 80% false positives is a candidate for a threshold change.
- Benford's Law is population-level: it tells you a group of amounts looks off, not that one invoice is fraudulent.
- If an AI model drafts plain-English notes for flags, it may only describe what is in the row and the rule, must cite the transaction ID and rule name, must never fabricate or accuse, and every note is a triage aid while the disposition stays a human decision.

**Worked example.** A duplicate-invoice rule raises 40 flags in a week and 38 are dismissed. The false-positive rate is 38 / 40 = 95%, well above 80%. The cause is one vendor reusing template invoice numbers each month. Rather than deleting the rule, add conditions such as a similar amount and nearby invoice dates, then re-measure after a month. Similarly, if a controller asks you to stop flagging Stripe weekend payments, propose a whitelist entry for Stripe only, get written approval and log it in the tuning log.

> [!warning] Common mistake
> Quietly dropping or loosening a rule because it is noisy. A silent change means an auditor cannot tell what was operating. Change controls openly, with approval and a record.

```knowledge-quiz
schemaVersion: 1
quizId: "514175d3-5444-4fc0-85ce-6ab658f7c477"
title: "Checkpoint — tuning and whitelists"
questionBankId: "813ff0ec-fd79-40d9-b530-d5afc19e2cc8"
questionIds:
  - "23ed70d7-e184-47db-81f1-7f5e9b065091"
  - "a1ceef8d-c3ec-41c5-a17a-05ea653017b8"
```

## Try it

Below are four rows from a week's AP register. List every flag from this lesson that fires on each row, and give a disposition (dismiss, document or escalate).

| Row | Vendor | Amount | Pay date | Vendor created | Other |
|---|---|---|---|---|---|
| A | Google Workspace | $216.00 | Sat 05/04 | 2020 | Recurring, already whitelisted |
| B | Podcast Pro LLC | $1,150.00 | Fri 05/03 | 2024-04-20 | PO, W-9 and contract on file |
| C | Rent, Larkspur LLC | $7,500.00 | Wed 05/01 | 2018 | Lease on file |
| D | New Logo Designs LLC | $2,500.00 | Mon 05/06 | 2024-05-01 | No approver recorded |

> [!example]- Sample solution
> - **Row A:** weekend payment only. The vendor is whitelisted, so dismiss with a note that the whitelist applied.
> - **Row B:** new vendor with a high payment (paid 13 days after creation, above $1,000). It is not a round-dollar amount and it is not a weekend. Documentation is complete, so document and dismiss.
> - **Row C:** round-dollar above $1,000 ($7,500 is divisible by 100). The lease supports it, so verify the lease and propose whitelisting the landlord for this rule with documented approval.
> - **Row D:** new vendor with a high payment (paid 5 days after creation) plus a missing approval above the approval threshold, and also round-dollar because $2,500 is divisible by 100. Three rules on one row is an automatic escalation: hold the payment, pull the packet and tell the controller without contacting the vendor.

## Key takeaways

- An anomaly breaks a pattern (a rule, a history or a relationship); an anomaly is not fraud.
- Rule-based flags are transparent and easy to defend, so start there and add statistics once triage works.
- Three or more rules on one transaction means automatic escalation.
- Escalate, don't investigate: pull the documents, tell the right person, and never contact the vendor on suspicion.
- Record every disposition with the rule, decision, reviewer and timestamp, or the control cannot be proven.
- Tune monthly using false-positive rates, change rules openly, and keep AI notes to facts that cite the source row.

## Explain it back

In your own words, explain the three R's of detection (Rule, Review, Record) and why "escalate, don't investigate" is the rule for a junior triager. Write your answer before you check the sample answer in the chapter quiz.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "a4a7b3a6-d5b8-4512-be1d-6c71b898a6d6"
title: "Chapter quiz — anomaly detection"
questionBankId: "813ff0ec-fd79-40d9-b530-d5afc19e2cc8"
questionIds:
  - "09e0e9f8-4ec1-47b3-840f-477ec278c749"
  - "b6950e57-4f5d-44e1-b0ad-8b816e6c3a21"
  - "194916c6-87db-4e6f-a319-01e5b8a17720"
  - "99da1ed1-0bc5-4355-9a3a-78a901ca7f97"
  - "13779368-bda5-405e-826c-65679af29012"
  - "6e8eb887-4aca-4aa3-a90c-a1d60202fa6a"
```

Next: [[courses/accounting-ai-crash-course/lessons/30-ai-in-accounting|Next lesson]]

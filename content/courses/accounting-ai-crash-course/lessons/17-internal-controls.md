---
id: "b3cb5afa-5be9-4125-8f4c-51e080760647"
title: "Internal Controls for Entry-Level Accounting"
description: "Learn how preventive, detective and compensating controls keep a small business's numbers safe from mistakes and fraud."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 17
estimatedMinutes: 45
---

## Why this matters

A journal entry is only as trustworthy as the process around it. A vendor payment with no second pair of eyes is a fraud waiting to happen, and a shared password can erase the evidence of who did what. Lenders, buyers and auditors all ask the same question, "How do you know that number is right?", and internal controls are your answer. Employers also ask about them in entry-level interviews, because they want to know whether you follow the process when nobody is watching.

## What you'll be able to do

- Explain what an internal control is, and classify a control as preventive or detective.
- Name the three duties that segregation of duties separates, and diagnose a process where one person holds all three.
- Design compensating controls for a small team that cannot separate its duties.
- Decide what to do when you meet a control trigger such as a vendor bank-detail change, an unidentified deposit, or a request to share a login.

## Before you start

Answer these from memory first. Do not look anything up.

- Why does a bank reconciliation compare the books to an outside record, and who should look at the result?
- What does an accounts payable process do between receiving a vendor bill and paying it?
- Why does a journal entry need a supporting document?

If you want to refresh the previous topic, see [[courses/accounting-ai-crash-course/lessons/16-ratios-and-analysis|Previous lesson]].

Throughout this course we use a fictional case study, BoBo Digital Services LLC, a four-person remote business. Bo is the owner, Priya is the senior designer who holds the Adobe corporate card, Maya is a 1099 virtual assistant who does bookkeeping support in QuickBooks Online (QBO), and Jordan is a 1099 video editor with no system access. All names and figures are sample data.

## Step 1 — What an internal control is

**In plain language.** An internal control is a deliberate step in a process that is designed to prevent or detect an error or fraud. It is not paperwork for its own sake. Every control answers one of three questions: did the right thing happen, did the right person approve it, and can we prove it later?

**Analogy.** Think of a lock on a door and a security camera. The lock stops a break-in before it happens. The camera cannot stop anyone, but it shows what happened afterward. A building needs both because no lock is perfect.

**The rule.** A preventive control stops a problem before it happens, for example a manager's approval before a wire is sent. A detective control catches a problem after it happens, for example a monthly bank reconciliation that surfaces an unauthorized transfer. A healthy control system uses both, because prevention is cheaper but can never stop everything.

**Worked example.** BoBo's Adobe corporate card is held by Priya. Bo reviews the monthly card statement line by line and asks for a receipt and business purpose for each charge. If a $500 charge has no receipt, the review has caught it, but the money is already spent. That makes the statement review a detective control. Requiring approval before a card is issued or a limit is raised would be preventive.

> [!warning] Common mistake
> Calling every control "preventive" because it feels protective. Ask one question instead: does it act before the transaction happens, or after? A review that happens afterward is detective, however thorough it is.

```knowledge-quiz
schemaVersion: 1
quizId: "665cb3f6-7d89-48e6-bc9d-86d2268add16"
title: "Checkpoint 1 — Preventive vs detective"
questionBankId: "dd6df370-9a82-4d95-969d-e73d435f2745"
questionIds:
  - "4f5ff1da-cfc3-414a-8e96-1b89bba2ae14"
  - "e99fc863-6a2a-4323-b0e1-0f3bd79b252a"
```

## Step 2 — Segregation of duties

**In plain language.** Segregation of duties (SoD) means no single person controls a whole transaction from start to finish. The idea is to break the chain so that one person alone cannot steal money and hide it.

**Analogy.** A bank vault that needs two keys held by two people. Neither person can open it alone, so stealing requires them to agree to do it together.

**The rule.** Split these three duties across different people. A memory hook is CAR:

- **C**ustody, meaning who has access to the asset such as cash, checks or inventory.
- **A**uthorization, meaning who approves the transaction.
- **R**ecording, meaning who books it in the general ledger.

If one person can set up a vendor, approve a payment, send it, and book the entry, they can steal and hide it. With the duties split, most fraud of this kind needs collusion, which means two or more people working together, and that is far rarer.

**Worked example.** Here is a pattern from a peer agency in the chapter's case study. A bookkeeper had full QBO access, including bill-pay, and the owner approved only invoices above a $2,000 threshold. Over three years about $87,000 was paid to a vendor the bookkeeper had created, and each invoice sat just under the threshold. One person did vendor setup, bill entry and payment release, and nobody outside the business checked the books. A weekly five-minute review of the new-vendor list plus an outside review would have caught it early.

> [!warning] Common mistake
> Thinking SoD is about distrust of a specific person. It is about structure: even a completely honest person should not hold all three duties, because honest mistakes are also left unchecked.

## Step 3 — Compensating controls for a small team

**In plain language.** BoBo has four people and two of them are contractors, so full SoD is not realistic. When the ideal control is not possible, you add a different control that reduces the same risk. That is a compensating control.

**Analogy.** If you cannot fit a second lock on a door, you might add an alarm. It is a different mechanism that still addresses the same risk of someone getting in unseen.

**The rule.** A compensating control is a substitute control used when the ideal control, often full SoD, is not possible. It shows an auditor that you thought about the risk and engineered a workable answer rather than ignoring it.

**Worked example.** After a near-miss, Bo redesigned BoBo's accounts payable cycle.

| Step                         | Who does it                                          | Who checks or approves                        |
| ---------------------------- | ---------------------------------------------------- | --------------------------------------------- |
| Vendor setup                 | Maya, in QBO                                         | Bo initials a weekly New Vendors Added report |
| Bill entry and coding        | Maya                                                 | Bills wait in an approval state for Bo        |
| Payment approval and release | Bo only, with confirmation prompts sent to his phone | Not applicable                                |
| Bank reconciliation          | Maya prepares it                                     | Bo signs it and an outside CPA reviews it     |

Maya both sets up vendors and enters bills, which breaks pure SoD. The compensating controls are Bo's weekly report, an extra approval for any vendor less than 60 days old, and a CPA sampling new vendors against their W-9 forms. The outside CPA review matters most because it supplies the independence the team cannot produce internally.

> [!warning] Common mistake
> Treating a compensating control as a weaker version of "doing nothing". It only counts if it is documented and actually performed every time. A report that Bo never reads is not a control.

```knowledge-quiz
schemaVersion: 1
quizId: "f2eb38bb-12f3-47fa-80fa-de5a9cfbb28e"
title: "Checkpoint 2 — SoD and compensating controls"
questionBankId: "dd6df370-9a82-4d95-969d-e73d435f2745"
questionIds:
  - "e232d4f4-1035-400b-a3bd-de754f2adf78"
  - "86d5496c-6490-4808-8bdc-c6f8cf96f2b8"
```

## Step 4 — Controls in your daily work

**In plain language.** You will not design the control system on day one. You will operate it, and the quality of your habits decides whether the controls actually work.

**Analogy.** A fire door only works if people close it every time. One person propping it open "just this once" defeats the whole design.

**The rule.** Follow the process exactly, document who approved what and when, flag problems instead of fixing them silently, never share a login, and treat a reconciliation as a control rather than a chore. A useful test is whether you could prove the transaction to an auditor in 60 seconds.

**Worked example.** Three situations at BoBo show these habits.

1. **A vendor emails new bank details.** Maya does not change anything. Bo calls the number on the original signed contract, not the number in the email, and logs the callback before the record is updated. In the chapter's near-miss, a changed routing number on a $4,200 invoice was exactly this kind of business email compromise.
2. **An unidentified $1,200 deposit appears.** Maya leaves it as an open reconciling item, investigates, and flags it if it stays unresolved. She does not book it to an income account to force the reconciliation to balance.
3. **Someone asks to borrow a login.** The answer is no. A shared login makes the system record one person's name for another person's actions, so the audit trail can no longer show who really acted. The alternative is a temporary read-only user created with Bo's approval.

> [!warning] Common mistake
> Plugging an unexplained item to make a reconciliation balance. It makes the totals agree today, but it hides a possible error or fraud and the plug compounds next month.

```knowledge-quiz
schemaVersion: 1
quizId: "4afdc594-43d4-4917-881b-30d54995325f"
title: "Checkpoint 3 — Daily control habits"
questionBankId: "dd6df370-9a82-4d95-969d-e73d435f2745"
questionIds:
  - "63d1ee91-ffa0-4461-93e5-6e73fa4aa6f7"
  - "1d05fac4-4f77-443c-ac42-95bec264ec47"
```

## Try it

Pick this risk: "A fake vendor is added to commit fraud." Write one row of a control matrix for it with these columns: Risk, Control, Type (preventive, detective or both), Owner, and How tested. Then name one thing you would check to show the control is working.

> [!example]- Sample solution
>
> | Risk                              | Control                                                                                                        | Type                                                        | Owner | How tested                                                                                    |
> | --------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----- | --------------------------------------------------------------------------------------------- |
> | Fake vendor added to commit fraud | New vendors need a W-9 and address verification, and Bo reviews and initials a weekly New Vendors Added report | Both (W-9 check preventive, weekly report review detective) | Bo    | Sample 5 new vendors per quarter and confirm the W-9 is on file and Bo's initials are present |
>
> A good check is the sample itself: pick new vendors at random and confirm both the W-9 and the signed review, because a control that leaves no evidence cannot be shown to work.

## Key takeaways

- A control is a deliberate step that prevents or detects errors and fraud, and a healthy system uses both kinds.
- Segregation of duties splits custody, authorization and recording so most fraud of this kind needs collusion.
- When SoD is impossible, a documented compensating control, backed by independent outside review, fills the gap.
- Confirm vendor bank-detail changes by calling the number on the original contract, never the number in the request.
- Never share a login and never plug a reconciliation, because both undermine the evidence controls rely on.
- Ask yourself whether you could prove the transaction to an auditor in 60 seconds.

## Explain it back

In your own words, explain what internal controls are, what segregation of duties separates, and how a four-person business like BoBo compensates when full separation is impossible. Write it before you open the quiz.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "6105be49-9b25-4566-9930-eb5c2d5e0dd2"
title: "Chapter quiz — Internal controls"
questionBankId: "dd6df370-9a82-4d95-969d-e73d435f2745"
questionIds:
  - "e77b7682-74cf-4dde-bc61-f4e3489e4e98"
  - "4941138f-3f5a-4742-9a35-46a8292939e2"
  - "cc3584e8-dfbb-40cb-acd6-1eacc90bdbb4"
  - "ac64718c-a226-4560-b319-07e3746f8f5a"
  - "174fd4ec-909b-4312-84b6-a93df261619e"
  - "c9cffa5c-1a80-4d9d-b90f-fb0786b6997a"
```

Next: [[courses/accounting-ai-crash-course/lessons/18-audit-evidence|Next lesson]]

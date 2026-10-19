---
id: "3960e2e6-7cab-4a60-9a10-1c5098815f28"
title: "Python Reconciliation Engine"
description: "Build and explain a five-tier Python engine that matches bank and book records and leaves a short exception list for a human."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 27
estimatedMinutes: 55
---

## Why this matters

Every accounting team proves that its books agree with the bank. Done by eye, this breaks down once volumes grow: you miss items, match the wrong ones, and lose a weekend. A reconciliation engine applies the same rules every month, records how every match was made, and hands your manager a short list of items that need a human decision. Building one also shows an employer judgment, not just syntax, because the matching tiers are an accounting design choice.

## What you'll be able to do

- Explain the five matching tiers in order and what each one catches that the previous tier missed.
- Decide which tier should match a given bank and book pair.
- Diagnose three silent bugs: double matching, sign mismatch and date-format mismatch.
- Build the tier logic in pandas and rapidfuzz, and read its three outputs.
- Defend the AI guardrails and describe the project honestly as a sample-data prototype.

## Before you start

Think about these without looking anything up.

- What is a bank reconciliation, and why can a bank balance and a book balance legitimately differ?
- Why might a bank post a payment on a different day than the day the bookkeeper recorded it?
- How did the previous lesson prepare messy transaction data before analysis?

Review: [[courses/accounting-ai-crash-course/lessons/26-python-transaction-cleanup|Previous lesson]].

All data here comes from the fictional BoBo Digital Services LLC case study, and every figure is sample data.

## Step 1 — Strict to loose: exact and date-window tiers

**In plain language.** Reconciliation proves that two records of the same activity agree: the bank statement on one side and the books on the other. A single rule cannot cover every mess, so the engine uses tiers. Each tier is looser than the last, and each one only sees the rows the earlier tiers left over.

**Analogy.** Think of sorting a pile of paired socks. You pull out the perfect pairs first. Only then do you hunt for pairs that are nearly the same shade. If you went by "nearly the same" first, you might split a perfect pair.

**The rule.** The engine first loads both CSVs and normalizes them: dates become real dates, amounts are rounded to cents, descriptions are lowercased, and a `matched` flag starts as false. Then:

- **Tier 1, exact:** identical amount and identical date.
- **Tier 2, date window:** identical amount and a date gap of at most N days (the course default is 3), preferring the closest date. If two candidates are equally close, the pair is ambiguous and goes to exceptions.
- **Mark once:** the moment a row matches, it is flagged, and every later tier skips flagged rows.

**Worked example.**

```python
# core of Tier 2: same amount, date within the window
candidates = book[
    (~book["matched"])
    & (book["amount"] == b["amount"])
    & ((book["date"] - b["date"]).abs() <= pd.Timedelta(days=3))
]
```

The bank shows $1,000.00 on April 3 and the books show $1,000.00 on April 6. The gap is exactly 3 days, which the window allows, so Tier 2 matches them. Tier 1 would have missed the pair because the dates differ.

> [!warning] Common mistake
> Letting an item match twice. If you forget to flag a row as matched, a later tier can pick it up again and the matched totals double count it.

## Step 2 — Reference and fuzzy tiers

**In plain language.** Sometimes the amounts disagree slightly but an identifier ties the rows together, such as a check number. Sometimes the only link is that the descriptions look alike, for example a card-processor code on the bank side and a friendly label in the books.

**Analogy.** A reference match is like two people holding the same claim ticket number. A fuzzy match is like recognizing someone by their general look: useful, but it needs a higher bar before you trust it.

**The rule.**

- **Tier 3, reference:** a shared non-empty reference joins the rows only when the amount difference is within a small tolerance (for example $1.00), and the difference is recorded so a person can see it. A few cents may be a bank fee. A larger gap on a shared reference is a red flag, such as a reused or mistyped check number, so those pairs go to the exception queue for human review instead of being marked matched.
- **Tier 4, fuzzy:** compare lowercased descriptions with rapidfuzz `token_set_ratio`, which scores 0 to 100 and ignores word order. Keep only candidates whose amount is within a small tolerance, and only accept scores at or above the threshold. The course uses 85 as a defensible starting point and reviews every fuzzy match by eye for the first three months.

**Worked example.**

```python
choice = process.extractOne(
    b["description"],
    candidates["description"].tolist(),
    scorer=fuzz.token_set_ratio,
    score_cutoff=85,
)
```

Bank -$427.18 and book -$427.20 both carry reference CHK1042. Tier 1 fails because the amounts differ, so Tier 3 matches them and logs a difference of $0.02.

> [!warning] Common mistake
> Lowering the fuzzy threshold to "find more matches". A looser threshold mostly finds wrong matches, such as pairing a $1,200 electric bill with a $1,200 supplies payment because both descriptions mention April.

```knowledge-quiz
schemaVersion: 1
quizId: "ceaadca8-ae02-4c12-8a64-c1e251f722a5"
title: "Checkpoint: tiers 1 to 4"
questionBankId: "680f74b6-6119-4e29-8f64-ff26aca03abe"
questionIds:
  - "005fecba-19e2-4e16-8ebc-c2939fe12d32"
  - "497c698e-28c8-4c6a-8220-23d9a3929dbe"
```

## Step 3 — Split matches: one bank row, many book rows

**In plain language.** Payment processors often pay out one net deposit for many sales. The bank sees one line, while the books hold many. No single-row rule can match that, so the last tier searches for a small group of book rows that adds up to the bank amount.

**Analogy.** It is like a restaurant bill paid with one card swipe for a table of friends: one charge, several orders that sum to it.

**The rule.** Tier 5 considers unmatched book rows dated near the bank row (the course uses 7 days), tries group sizes from 2 up to a cap (default 5), and accepts a group whose sum is within a tiny tolerance of the bank amount. Because the number of combinations grows very fast, the cap and the date pre-filter are essential, and a pool of 500 or more candidate rows would need smarter pruning.

**Worked example.** BoBo's bank shows an $18,427.66 Stripe payout on April 8. The books hold sales of $7,200.00, $6,000.00 and $5,790.00 and a fee row of -$562.34, all dated April 4 to 6.

7,200.00 + 6,000.00 + 5,790.00 = 18,990.00, and 18,990.00 - 562.34 = 18,427.66.

Four book rows sum to one bank row, which fits inside the default cap of 5.

> [!warning] Common mistake
> Treating the split tier as a general search. Without a group-size cap and a date filter, it can run for a very long time on a month-end pool.

## Step 4 — Outputs, exceptions and guardrails

**In plain language.** The engine does not try to match everything. Its real product is a clean, short list of items a human must look at, plus a record of how every match was made.

**The rule.** The run produces three files: `matched.csv` (each match with its tier, row IDs, amounts and, for fuzzy, the score), `exceptions.csv` (everything unmatched, bank side and book side) and `summary.md` (counts per tier and exception counts, for a manager to read quickly). `matched.csv` is the audit log, so keep it.

**Guardrails when using AI.** Never let AI invent matches or journal entries, cite real source row IDs, keep matching deterministic and require a unique best candidate (when two or more candidates tie, send them all to `exceptions.csv` for a person instead of picking one by row ID or at random), have a person review every exception, never auto-post journals, and keep the audit trail.

**Worked example.** Last month the run left 14 exceptions. This month it leaves 73. Do not carry on: something changed, such as a new export format, so investigate first. Then categorize each exception (timing difference, missing journal, duplicate, true error, in-transit item), post journals for real book gaps, re-run, and attach `summary.md` and `exceptions.csv` to the workpaper.

**Be honest about what this is.** It is a prototype on sample data, not a production system. Production tools typically carry stronger controls. If you describe the project to an employer, say "designed to reduce manual matching" rather than quoting a time saving you never measured.

> [!warning] Common mistake
> Reading a non-empty exception list as a failure. Exceptions are the point: they are the items that deserve human judgment.

```knowledge-quiz
schemaVersion: 1
quizId: "9845baa1-a9e3-4066-a52c-92b86dc38846"
title: "Checkpoint: split matching and guardrails"
questionBankId: "680f74b6-6119-4e29-8f64-ff26aca03abe"
questionIds:
  - "79a5c2ff-404e-4925-aabb-ff66703ff58b"
  - "85c8693d-426a-4029-97c4-ef90d05f8b4f"
```

## Try it

Walk these ten bank and ten book lines through the tiers by hand. Decide which tier matches each pair and which lines become exceptions.

| Bank | Date | Amount | Reference |
| --- | --- | --- | --- |
| B1 | Apr 2 | 1,500.00 | INV-2210 |
| B2 | Apr 3 | -85.40 | none |
| B3 | Apr 5 | -427.18 | CHK1042 |
| B4 | Apr 8 | 18,427.66 | none |
| B5 | Apr 10 | -250.00 | none |
| B6 | Apr 12 | -1,200.00 | LEASE-04 |
| B7 | Apr 15 | -42.00 | none |
| B8 | Apr 18 | 750.00 | INV-2215 |
| B9 | Apr 22 | -99.99 | none |
| B10 | Apr 28 | -350.00 | RFD-04 |

| Book | Date | Amount | Reference |
| --- | --- | --- | --- |
| K1 | Apr 2 | 1,500.00 | INV-2210 |
| K2 | Apr 2 | -85.40 | none |
| K3 | Apr 5 | -427.20 | CHK1042 |
| K4 | Apr 4 | 7,200.00 | none |
| K5 | Apr 5 | 6,000.00 | none |
| K6 | Apr 6 | 5,790.00 | none |
| K7 | Apr 6 | -562.34 | none |
| K8 | Apr 12 | -1,200.00 | LEASE-04 |
| K9 | Apr 18 | 750.00 | INV-2215 |
| K10 | Apr 23 | -99.99 | none |

> [!example]- Sample solution
> - B1 and K1: Tier 1 (same amount and date).
> - B2 and K2: Tier 2 (same amount, dates one day apart).
> - B3 and K3: Tier 3 (reference CHK1042, difference of $0.02 logged).
> - B4 with K4, K5, K6 and K7: Tier 5 (7,200.00 + 6,000.00 + 5,790.00 - 562.34 = 18,427.66).
> - B6 and K8: Tier 1. B8 and K9: Tier 1.
> - B9 and K10: Tier 2 (same amount, dates one day apart).
> - Exceptions: B5 (no book row), B7 (bank fee not yet booked, so post a journal) and B10 (refund not yet recorded).

## Key takeaways

- Run five tiers in order, strictest first: exact, date window, reference, fuzzy, split.
- Match once and mark forever, so no row is used twice.
- Normalize signs and dates before matching, because mismatches fail silently.
- Fuzzy matching needs a threshold you document (the course uses 85) and an amount check.
- Exceptions are the product: a short list for a human, backed by `matched.csv` as the audit log.
- Describe the project honestly as a sample-data prototype, and never let AI post journals.

## Explain it back

In your own words, explain how the five-tier reconciliation engine works and why the tier order matters, using the BoBo Stripe payout as an example.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "6d4c9b66-3990-4a14-aa8a-1ab912a1737e"
title: "Chapter quiz: Python reconciliation engine"
questionBankId: "680f74b6-6119-4e29-8f64-ff26aca03abe"
questionIds:
  - "94791caa-767e-4e7e-a08b-47f8962a64cc"
  - "6eb5f74e-09ab-4b0d-b78b-0f09adfab5ca"
  - "bb2d9076-95e2-4932-a62c-024a6217b5b8"
  - "bd6fa8b4-f364-4924-9597-3ba9a0f231e7"
  - "4cad73e3-3644-47de-b0ee-8e847052bd1c"
  - "66071aef-41e6-4d01-80e5-130cb8ffcf7a"
  - "b4ee306a-2c96-42c1-88c6-0f3e19546ef1"
  - "0bc10398-80a9-4cd5-b62d-138b9c259f81"
```

Next: [[courses/accounting-ai-crash-course/lessons/28-invoice-extraction|Next lesson]]

---
id: "c95a162d-ef5d-41ca-8ef4-23f177f64e4a"
title: "SQL for Accounting Data"
description: "Learn to read an accounting database and write the joins, totals and exception queries a finance team asks for every month."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 24
estimatedMinutes: 55
---

## Why this matters

Most accounting systems store their data in a relational database, so the person who can query it directly gets answers in minutes instead of waiting days for a report. At BoBo Digital Services LLC, a pre-audit request for late manual entries, repeat vendor payments and old receivables becomes three short queries. A duplicate-bill query can also catch real money: in the chapter's case study, one query found about $11,400 of true duplicate bills. SQL does not decide what is wrong; it surfaces the rows a human should look at.

## What you'll be able to do

- Explain how primary keys, foreign keys and JOINs connect the tables of an accounting database.
- Write a SELECT with WHERE, GROUP BY, HAVING and ORDER BY to total revenue or spend.
- Diagnose NULL and LEFT JOIN mistakes that silently drop rows from a trial balance.
- Build AR aging buckets and a duplicate-bill check, and decide what to do with the flagged rows.
- Apply a safe workflow for AI-drafted SQL: schema citation, dry run, human review and audit trail.

## Before you start

Recall these ideas first, without looking anything up:

- What does it mean for an account to be debit-normal or credit-normal?
- What does an AR aging report tell a collections lead?
- Why must total debits equal total credits in a trial balance?

If you want a refresher on ERP systems, see [[courses/accounting-ai-crash-course/lessons/23-erp-awareness|Previous lesson]].

The examples use the fictional BoBo Digital Services LLC schema and PostgreSQL syntax. Several functions used here (DATE_TRUNC, STRING_AGG, ILIKE, GREATEST) are PostgreSQL features, so other databases may need small changes. All figures are sample data.

## Step 1 — Read the schema

**Plain language.** A database is like a workbook with rules. Each table is a tab, each column is a typed header, and each row is one record such as one invoice. Tables link through ID columns, the way VLOOKUP links sheets, except the database enforces the link.

**Analogy.** Think of a paper filing room. The customer folder has a unique folder number, and every invoice slip carries that number so you can find its folder.

**The rule.** A *primary key* uniquely identifies each row in its own table. A *foreign key* is a column that holds another table's primary key. A *JOIN* combines two tables on that matching key.

**Worked example.** BoBo's schema has seven tables: customers, vendors, chart_of_accounts, transactions, invoices, bills and payments. Here is the link between invoices and customers:

```sql
SELECT cu.customer_name, i.invoice_number, i.total
FROM invoices i
JOIN customers cu ON cu.customer_id = i.customer_id;
```

`invoices.customer_id` is a foreign key that points to `customers.customer_id`, the primary key. The `ON` line says which columns must match. The GL table `transactions` links to `chart_of_accounts` through `account_id` the same way.

> [!warning] Common mistake
> Thinking a column named like an ID is always a primary key. `customer_id` in invoices repeats for every invoice a customer has, so it is a foreign key. Only `invoice_id` is unique per invoice row.

## Step 2 — Filter and summarize

**Plain language.** A query describes a filter: which columns, from which table, which rows, grouped how, sorted how. You are not programming a procedure; you are describing the rows you want.

**Analogy.** Imagine the GL as a giant spreadsheet with 100,000 rows and SQL as a very good filter button. WHERE hides rows you do not want; GROUP BY then folds the remaining rows into one line per group.

**The rule.** Write the clauses in this order: SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY. WHERE filters rows before grouping, and HAVING filters groups after an aggregate such as SUM or COUNT has been calculated. Revenue accounts are credit-normal, so monthly revenue is credits minus debits, which nets out refunds posted as debits.

**Worked example.** Monthly revenue for the trailing 12 months:

```sql
SELECT
    DATE_TRUNC('month', t.txn_date) AS month,
    SUM(t.credit - t.debit)         AS revenue
FROM transactions t
JOIN chart_of_accounts c ON c.account_id = t.account_id
WHERE c.account_type = 'Revenue'
  AND t.txn_date >= CURRENT_DATE - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', t.txn_date)
ORDER BY month;
```

If a month has credits of 60,000 and a refund debit of 1,600, the query returns 58,400 for that month. To list only vendors whose total bills exceed $5,000, add `HAVING SUM(b.total) > 5000` after GROUP BY, because the vendor total exists only after grouping.

> [!warning] Common mistake
> Putting an aggregate test in WHERE, such as `WHERE COUNT(*) > 1`. WHERE runs before any grouping, so the database cannot yet know the count. Use HAVING.

```knowledge-quiz
schemaVersion: 1
quizId: "1e1ff336-016d-40c1-8d17-fa00ed096bfc"
title: "Checkpoint: Schema and summaries"
questionBankId: "781daeae-a649-4382-95ba-45440f8ceb67"
questionIds:
  - "78669a18-a925-420d-8e7b-2fbb50d27fb6"
  - "6458a848-e052-4023-86b7-5d9254979a30"
```

## Step 3 — Handle NULL and LEFT JOIN

**Plain language.** NULL means unknown or no value. It is not zero and it is not an empty string. Because NULL is unknown, asking whether it equals anything gives an unknown answer, not true.

**Analogy.** A blank cell in a spreadsheet is not the same as a cell holding 0. If you ask "is this blank cell equal to that blank cell?", the honest answer is "I cannot tell".

**The rule.** Test for missing values with `IS NULL` or `IS NOT NULL`, never `= NULL`. `COUNT(*)` counts rows, while `COUNT(column)` skips NULLs, and `SUM` ignores NULLs. A plain JOIN drops rows with no match; a `LEFT JOIN` keeps every left-table row even when there is no match on the right, filling the right-side columns with NULL.

**Worked example.** Finding transactions with no account assigned:

```sql
SELECT transaction_id, txn_date, memo
FROM transactions
WHERE account_id IS NULL;
```

For a trial balance you want every account, even those with no activity, so you LEFT JOIN from chart_of_accounts to transactions. The chapter's version puts the date test in WHERE, which turns the unmatched rows' NULL dates into rows that fail the test and removes them again. Put the date test in the ON clause instead:

```sql
SELECT
    c.account_number,
    c.account_name,
    COALESCE(SUM(t.debit), 0)                                AS total_debits,
    COALESCE(SUM(t.credit), 0)                               AS total_credits,
    COALESCE(SUM(t.debit), 0) - COALESCE(SUM(t.credit), 0)   AS net_debit
FROM chart_of_accounts c
LEFT JOIN transactions t
       ON t.account_id = c.account_id
      AND t.txn_date <= DATE '2026-05-31'
GROUP BY c.account_number, c.account_name
ORDER BY c.account_number;
```

An account with no activity still appears thanks to the LEFT JOIN, but `SUM` over no rows returns NULL, not 0, so each total is wrapped in `COALESCE(..., 0)` to print a clean zero balance.

Across all accounts, total debits minus total credits should be zero. If it is not, stop and find the unbalanced entry.

> [!warning] Common mistake
> Believing a zero trial balance proves the books are right. It shows only that debits equal credits; a wrong account or period can still balance.

## Step 4 — Spot exceptions

**Plain language.** Accountants use SQL as an exception finder: old receivables, repeat bills, and unusual entries near close.

**Analogy.** It is like running a metal detector over the ledger. A beep tells you where to dig, not what you found.

**The rule.** Use `CASE WHEN` to turn days past due into buckets. Use `GROUP BY` plus `HAVING COUNT(*) > 1` to find duplicates. Filter on `source = 'Manual'` and a date window to find manual journal entries near close.

**Worked example.** AR aging, measuring days past the due date:

```sql
SELECT
    CASE
        WHEN CURRENT_DATE - i.due_date <=  0 THEN '1. Current'
        WHEN CURRENT_DATE - i.due_date <= 30 THEN '2. 1-30'
        WHEN CURRENT_DATE - i.due_date <= 60 THEN '3. 31-60'
        WHEN CURRENT_DATE - i.due_date <= 90 THEN '4. 61-90'
        ELSE                                       '5. 90+'
    END                          AS aging_bucket,
    COUNT(*)                     AS invoice_count,
    SUM(i.total - i.amount_paid) AS open_balance
FROM invoices i
WHERE i.status = 'Open'
  AND i.total - i.amount_paid > 0
GROUP BY aging_bucket
ORDER BY aging_bucket;
```

An invoice due 2026-03-01 on a day 76 days later lands in bucket 4. Duplicate bills:

```sql
SELECT v.vendor_name, b.bill_date, b.total, COUNT(*) AS dup_count
FROM bills b
JOIN vendors v ON v.vendor_id = b.vendor_id
GROUP BY v.vendor_name, b.bill_date, b.total
HAVING COUNT(*) > 1;
```

If this flags two $950.00 Upwork bills dated the same day, open both source documents. In the case study only 6 of 14 flagged items were true duplicates. Manual entries near close:

```sql
SELECT t.txn_date, t.reference, t.memo, t.created_by,
       GREATEST(t.debit, t.credit) AS amount
FROM transactions t
WHERE t.source = 'Manual'
  AND t.txn_date BETWEEN DATE '2026-03-30' AND DATE '2026-03-31'
  AND GREATEST(t.debit, t.credit) >= 5000
ORDER BY amount DESC;
```

> [!warning] Common mistake
> Treating a flagged row as proof. The query shows candidates, and a person must check the source documents before voiding or accusing anyone.

```knowledge-quiz
schemaVersion: 1
quizId: "e5eaf4e3-7c77-4bc8-b801-8042a399eabd"
title: "Checkpoint: NULLs and exceptions"
questionBankId: "781daeae-a649-4382-95ba-45440f8ceb67"
questionIds:
  - "c1148b32-adc0-4b8e-9594-7007189cde8c"
  - "32837cc2-a80f-4952-88e1-8fcc2d972ef4"
```

## Step 5 — Use AI to draft SQL safely

**Plain language.** AI assistants write SQL quickly but may invent column names. Treat the assistant like a capable junior who must show their work.

**Analogy.** A new hire can draft a journal entry fast, but a reviewer still checks it against the source documents before it posts.

**The rule.** Follow these guardrails: paste the real schema into every prompt, reject any column the schema lacks, dry-run with `LIMIT 100`, have a human review every query before production (especially DELETE or UPDATE), and keep an audit trail.

**Worked example.** A header comment that records the trail:

```sql
-- Query: Top 10 vendors by spend, YTD
-- Author: H. Lee (drafted with AI, reviewed)
-- Schema version: bobo_v3.2 (2026-05-01)
-- Date: 2026-05-16
-- Reviewed by: M. Tan
```

If a draft sums `transactions.amount` but your schema has only `debit` and `credit`, reject it and re-prompt with the actual CREATE TABLE statements.

> [!warning] Common mistake
> Trusting a query because it runs. A query can execute cleanly and still use the wrong filter, double count rows, or answer a different question than the one asked.

```knowledge-quiz
schemaVersion: 1
quizId: "ccd2cb03-bb55-42a5-831d-2cd04ec42c97"
title: "Checkpoint: Safe AI-drafted SQL"
questionBankId: "781daeae-a649-4382-95ba-45440f8ceb67"
questionIds:
  - "44f7530a-aadf-4a0f-bfeb-458938fc48ae"
  - "ac6f4159-71b9-4b0b-8c46-c1439c33bbd6"
```

## Try it

Marcus asks: "List each customer with open invoices more than 90 days past due, with the total they owe, biggest first." Write the query using the BoBo schema, then say what you would do before sending the result.

> [!example]- Sample solution
> ```sql
> SELECT cu.customer_name,
>        SUM(i.total - i.amount_paid) AS open_balance
> FROM invoices i
> JOIN customers cu ON cu.customer_id = i.customer_id
> WHERE i.status = 'Open'
>   AND i.total - i.amount_paid > 0
>   AND CURRENT_DATE - i.due_date > 90
> GROUP BY cu.customer_name
> ORDER BY open_balance DESC;
> ```
> The JOIN brings in names, WHERE keeps only open balances more than 90 days past due, GROUP BY and SUM total each customer, and ORDER BY puts the largest first. Before sending, dry-run with LIMIT, spot-check a few customers against their invoices, and note the schema version you used.

## Key takeaways

- Tables link through keys: a foreign key points to another table's primary key, and JOIN uses that match.
- WHERE filters rows before grouping; HAVING filters groups after aggregates are calculated.
- Use IS NULL, never = NULL, and remember COUNT(*) counts rows while COUNT(column) skips NULLs.
- Use LEFT JOIN when every row on one side must appear, and keep date tests in the ON clause so unmatched rows survive.
- SQL surfaces exceptions such as old receivables, duplicate bills and late manual entries; a person decides what they mean.
- AI-drafted SQL needs the real schema, a LIMIT dry run, human review and an audit trail.

## Explain it back

In your own words, explain how an accountant uses SQL to answer "Who owes us money?" Cover the tables and keys involved, the clauses you would use, and one trap to avoid.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "5a13c0b0-330b-46fc-a091-97617742eddd"
title: "Chapter quiz: SQL for Accounting Data"
questionBankId: "781daeae-a649-4382-95ba-45440f8ceb67"
questionIds:
  - "4f70ad2e-3a9f-4f19-b321-878e64c42857"
  - "dc64becb-156f-4c8e-9cca-c4b31c024a3e"
  - "7f20e2e6-46c9-4f15-9ec9-8a4cdfdbe34a"
  - "06651f90-8fa8-45a5-842e-c96b2242a617"
  - "4344377a-465d-4376-9ad9-19e8531ae23d"
  - "4ad7024c-9b31-4fac-a9cb-562fed1ce564"
```

Next: [[courses/accounting-ai-crash-course/lessons/25-power-bi-dashboard|Next lesson]]

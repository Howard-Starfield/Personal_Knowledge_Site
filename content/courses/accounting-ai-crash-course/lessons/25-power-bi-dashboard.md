---
id: "047f0c44-d15f-4423-9680-4dc52f96633e"
title: "Power BI Accounting Dashboard"
description: "Learn how a star-schema model, DAX measures and an exception report turn accounting data into a dashboard that answers a CFO's questions."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 25
estimatedMinutes: 45
---

## Why this matters

A spreadsheet shows numbers; a dashboard lets a CFO ask "why?" and get an answer in a few clicks. In your first accounting role you will more likely refresh, check and troubleshoot a dashboard than build one from scratch, and you can only do that well if you understand how it is wired. In the sample case, BoBo Digital Services LLC cut a four-hour Monday reporting routine down to about fifteen minutes, and an exception report flagged a $4,200 duplicate vendor bill. All figures here are sample data.

## What you'll be able to do

- Explain why a star schema (one fact table plus dimension tables) gives correct totals where a flat table does not.
- Decide whether a calculation should be a measure or a calculated column.
- Calculate an aging bucket and a safe percentage using SWITCH and DIVIDE logic.
- Diagnose a dashboard problem such as wrong time-based results or a blank KPI card.
- Build the DAX for an OpEx percentage-of-revenue measure with a warning flag.

## Before you start

Answer these from memory before reading on.

- What does an accounts receivable aging report show, and why does a collector care about the 90+ days group?
- In the previous lessons you cleaned data in Power Query and used SQL. Why does the quality of the cleaned data limit everything a dashboard can show?
- What is the difference between gross margin and net income?

If you want a refresher on the previous topic, see [[courses/accounting-ai-crash-course/lessons/24-sql-for-accounting|Previous lesson]].

## Step 1 — A dashboard answers questions, and the model comes first

**Plain language.** A report is a snapshot: "here are the numbers as of March 31." A dashboard is interactive: you can slice the same numbers by month, customer or account. The unit of work is a question, not a chart. If the CFO's question takes more than about three clicks, you have built a wall of charts.

**Analogy.** Think of a newsroom. The Executive Summary page is the front page, and the other pages are the sections. A reader should find the story quickly, and the facts behind each story must be right.

**The rule.** Professionals spend most of their time on the data model, not the colors. The standard design is a **star schema**: one central **fact table** that holds the numbers (every invoice, bill or journal line, plus keys), surrounded by **dimension tables** that hold the labels used to filter and group (date, account, vendor, customer). The build order is F-D-M-V: Fact, Dimensions, Measures, Visuals.

**Worked example.** In the BoBo model, `Fact_Transactions` has TransactionID, DateKey, AccountKey, VendorKey, CustomerKey, Amount, Memo and Source. The four dimensions are `Dim_Date`, `Dim_Account`, `Dim_Vendor` and `Dim_Customer`. The amount lives once, in the fact table. The vendor's name lives once, in `Dim_Vendor`, and is reached through VendorKey. When the CFO picks a customer in a slicer, the filter travels to the fact table and every total updates.

> [!warning] Common mistake
> Building one giant flat table because it feels simpler. Repeated labels and keys make totals double-count and filters misbehave. Settle the model before you design visuals, or you will rebuild charts every time the model changes.

## Step 2 — Relationships and the date table

**Plain language.** Tables only cooperate if they are joined correctly. Each dimension has one row per key, and the fact table has many rows per key, so the joins are one-to-many.

**Analogy.** A phone book (dimension) lists each person once; a call log (fact) lists many calls per person. You look up a name in the book and then filter the log.

**The rule.** In the BoBo model every relationship is one-to-many, runs in a single direction from dimension to fact, and the dimensions are not joined to each other. `Dim_Date` is marked as the date table, and every time-based measure (month-over-month, year-over-year, year-to-date) uses `Dim_Date[Date]`, never the date column on the fact table. Memory hooks: "Star, not flat" and "Date table or die."

**Worked example.** Suppose a year-over-year measure built on the fact table's own date returns blanks for some months. The sound fix is to make sure `Dim_Date` is a complete calendar, mark it as the date table, and base the measure on `Dim_Date[Date]`. If a visual shows wrong totals or blanks, open Model view and check that every fact-to-dimension relationship is active and one-to-many.

> [!warning] Common mistake
> Ignoring the relationships and assuming the visuals are at fault. A broken or inactive relationship produces wrong totals, so check Model view before touching a measure.

```knowledge-quiz
schemaVersion: 1
quizId: "52abaf08-ae91-4c17-81fc-fe25dc6df5f8"
title: "Checkpoint: model and relationships"
questionBankId: "072aad55-3541-4ccc-8c74-8aa5df667f61"
questionIds:
  - "82c920d6-3883-49ef-a532-2af67a78da31"
  - "f667dbf6-7c2b-4439-b4fd-7efe0fd9d06d"
```

## Step 3 — Measures versus calculated columns

**Plain language.** A **calculated column** is worked out row by row when the data refreshes and then stored. A **measure** is worked out at the moment you look, using whatever rows the current filters leave in view.

**Analogy.** A calculated column is a price tag printed on each item in the shop. A measure is the till total, which changes depending on what is in the basket.

**The rule.** If the answer depends on what the user is looking at, use a measure. If the answer is fixed for each row, such as whether one transaction is over $10,000, a calculated column can work. When in doubt, use a measure. Keep your measures in a dedicated measure table and group them in display folders so they stay findable.

**Worked example.** Total Revenue is a measure, because it must change when someone clicks March, a customer or a region. There is no single row called "Total Revenue" to store it on.

```DAX
Total Revenue =
CALCULATE (
    SUM ( Fact_Transactions[Amount] ),
    Dim_Account[Account Type] = "Revenue"
)
```

Notice the filter uses the stable field `Account Type`. Filtering on a single account name such as "Sales Q1 2024" would break the moment accounts are added or renamed.

> [!warning] Common mistake
> Using a calculated column for something that must respond to slicers. It bloats the file and is fixed at refresh, so it cannot follow the user's clicks.

## Step 4 — Core DAX patterns: CALCULATE, DIVIDE and SWITCH

**Plain language.** Three patterns cover a lot of accounting dashboards. CALCULATE adds or changes filters on a calculation. DIVIDE does a division safely. SWITCH with TRUE() sorts values into buckets.

**Analogy.** CALCULATE is a filter you clip onto a calculation. DIVIDE is a division with a safety net. SWITCH is a sorting chute where the first matching gate catches each item.

**The rule.**

- `CALCULATE ( SUM ( column ), filter )` gives a filtered sum.
- `DIVIDE ( numerator, denominator, alternate )` returns the alternate result when the denominator is zero. If you leave the third argument out, it returns BLANK.
- `SWITCH ( TRUE (), condition1, result1, condition2, result2, default )` tests the conditions in order and returns the first one that is true.

**Worked example.** Gross margin percent is revenue less COGS, divided by revenue:

```DAX
Gross Margin % =
DIVIDE (
    [Total Revenue]
        - CALCULATE (
              SUM ( Fact_Transactions[Amount] ),
              Dim_Account[Account Type] = "COGS"
          ),
    [Total Revenue],
    0
)
```

With revenue of $100,000 and COGS of $62,000, the measure returns 38,000 / 100,000 = 0.38, shown as 38%. In a month with no revenue it returns 0 instead of an error.

For AR aging (the chapter writes this as a measure; to chart individual invoices by bucket you would normally put the same logic in an invoice-level calculated column), an invoice with Days Outstanding of 45 is tested against 0, then 30, then 60. It fails the first two tests and passes the third, so it lands in "31-60 Days":

```DAX
AR Aging Bucket =
SWITCH (
    TRUE (),
    [Days Outstanding] <= 0,  "Current",
    [Days Outstanding] <= 30, "1-30 Days",
    [Days Outstanding] <= 60, "31-60 Days",
    [Days Outstanding] <= 90, "61-90 Days",
    "90+ Days"
)
```

> [!warning] Common mistake
> Assuming DIVIDE always returns BLANK on a zero denominator. BLANK is only the default; if you supply a third argument, that value is returned.

```knowledge-quiz
schemaVersion: 1
quizId: "7d2f21b6-e604-499d-8eb6-91d80d19d1e8"
title: "Checkpoint: measures and aging buckets"
questionBankId: "072aad55-3541-4ccc-8c74-8aa5df667f61"
questionIds:
  - "9c4fb12c-7b08-423b-b4f4-104bd7084ecb"
  - "d61cab15-7d2e-4f17-9df7-1745873ec708"
```

## Step 5 — Exceptions, maintenance and AI guardrails

**Plain language.** The most useful page is often the plainest. The Exception Report is just a set of tables that list transactions a human should look at. Most of your day-to-day work is also less glamorous: refresh the dashboard, check the latest date, screenshot tiles for a deck, and flag broken visuals.

**Analogy.** An exception report is a smoke alarm. It does not fight fires, but it tells you where to look.

**The rule.** BoBo's Exception Report has four tables: transactions over $10,000 with no approval, duplicate amounts for the same vendor within 30 days, round-dollar journal entries above $5,000, and postings on weekends or holidays. When you use AI to draft DAX, follow four guardrails: no fabricated table or column names, label the exact formula returned, verify the result against a known value, and keep an audit trail of prompt, formula, check and date.

**Worked example.** Two $4,200 CloudHostPro invoices, posted 12 days apart with the same memo, appear in the duplicate-amount table. You drill through to the detail, find the same invoice number in QuickBooks, confirm with the owner that the bill was entered twice, void the duplicate before the scheduled payment runs, and document the catch. The same $4,200 is below the $10,000 approval threshold and the round-dollar table only covers journal entries above $5,000, so only the duplicate table would have caught it.

> [!warning] Common mistake
> Trusting an AI-drafted measure because it compiles. A measure can run and still be wrong, so tie the result to a known figure such as the P&L, and never quietly edit a measure on a live executive dashboard.

```knowledge-quiz
schemaVersion: 1
quizId: "75fef9f3-598e-47a6-b119-563db36ecdb1"
title: "Checkpoint: exceptions and AI guardrails"
questionBankId: "072aad55-3541-4ccc-8c74-8aa5df667f61"
questionIds:
  - "8d7076b8-0f32-4e96-b2b9-d3c08a575ba6"
  - "62c7c6c1-ec2c-4ca0-a7c1-91f143a94a8e"
```

## Try it

You are given a star schema with `Fact_Transactions` (Amount, AccountKey and others), `Dim_Date` and `Dim_Account` (Account Type: Revenue, COGS, OpEx, Asset, Liability). The business question: "Show operating expenses as a percentage of revenue by month, with a flag for any month over 60%."

1. Write a Total Revenue measure, a Total OpEx measure and an OpEx % of Revenue measure.
2. Write a flag measure that returns "HIGH" above 60% and "OK" otherwise.
3. Sketch the page: which visual shows the trend, and where does the 60% line go?

> [!example]- Sample solution
> ```DAX
> Total Revenue =
> CALCULATE (
>     SUM ( Fact_Transactions[Amount] ),
>     Dim_Account[Account Type] = "Revenue"
> )
>
> Total OpEx =
> CALCULATE (
>     SUM ( Fact_Transactions[Amount] ),
>     Dim_Account[Account Type] = "OpEx"
> )
>
> OpEx % of Revenue =
> DIVIDE ( [Total OpEx], [Total Revenue], 0 )
>
> OpEx Flag =
> IF ( [OpEx % of Revenue] > 0.60, "HIGH", "OK" )
> ```
>
> Layout: Year and Quarter slicers at the top, three KPI cards (OpEx percent, Revenue, OpEx), a combo chart with Revenue as bars and OpEx % of Revenue as a line with a reference line at 60%, and a table of Month, Revenue, OpEx, OpEx % and Flag with red formatting where the flag is HIGH. For example, revenue of $50,000 and OpEx of $33,000 gives 66%, so that month shows HIGH.

## Key takeaways

- A dashboard answers questions; the model is the foundation and the visuals come last (Fact, Dimensions, Measures, Visuals).
- A star schema holds numbers once in a fact table and labels in dimension tables, joined one-to-many from dimension to fact in a single direction.
- Mark a complete Dim_Date as the date table and base every time-based measure on its Date column.
- If the answer depends on what the user is looking at, use a measure; use a calculated column only for fixed per-row values.
- Filter on stable fields such as Account Type, and use DIVIDE with an alternate result to avoid divide-by-zero errors.
- An exception report and a documented, verified AI workflow are what make a dashboard trustworthy.

## Explain it back

In your own words, explain why the data model matters more than the visuals in a Power BI accounting dashboard. Use the star schema, measures and the date table in your answer.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "27082933-b095-4c42-a15b-8c39b87c5339"
title: "Chapter quiz: Power BI accounting dashboard"
questionBankId: "072aad55-3541-4ccc-8c74-8aa5df667f61"
questionIds:
  - "104ef911-6ef5-424d-94dd-1fa2d509a19d"
  - "5039e8f9-d9b2-4ecb-abcb-f38962f4d853"
  - "7c6af7ee-65a4-4cf8-a5ef-5486b13ac4d5"
  - "73c2e96f-a993-4392-9898-0e9f3a57013b"
  - "abbefa57-d6cf-4dee-ace3-4ef6bdb4bd3d"
  - "af6eb26c-ec84-4581-8c9b-d3dc975f8b5a"
```

Next: [[courses/accounting-ai-crash-course/lessons/26-python-transaction-cleanup|Next lesson]]

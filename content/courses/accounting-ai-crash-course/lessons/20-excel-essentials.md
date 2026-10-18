---
id: "826740fe-9641-4e2c-932b-c6f055c1ec25"
title: "Excel Essentials for Accounting Work"
description: "Learn the Table, SUMIFS, COUNTIFS, XLOOKUP, IFS, date and PivotTable habits that let you build a workbook a manager can audit."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
  - excel
  - spreadsheets
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 20
estimatedMinutes: 55
---

## Why this matters

Almost every accounting system exports to Excel, so spreadsheets are where entry-level accountants clean, check and summarize data before anyone relies on it. A broken range or a number stored as text can hide a duplicate payment or leave a report short without any error message. The goal is not clever formulas. It is a workbook whose totals tie to the source and whose logic a manager can follow cell by cell.

## What you'll be able to do

- Explain why a Table with structured references is safer than a plain range.
- Calculate category totals with SUMIFS and flag possible duplicates with COUNTIFS.
- Build an XLOOKUP that maps a category to a GL code and an IFS that sorts invoices into aging buckets.
- Decide between EOMONTH and EDATE for a due date or renewal date.
- Diagnose why a total does not tie to its source.

## Before you start

- What is the difference between a debit total and a credit total, and what should the two be in a trial balance?
- Why does an accountant care that a report can be traced back to its source records?
- What does it mean for an invoice to be "aged" in accounts receivable?

Need a refresher on spotting errors in the books? See the [[courses/accounting-ai-crash-course/lessons/19-fraud-and-error-detection|Previous lesson]].

## Step 1 — Start every dataset as a Table

**In plain language.** A plain range of cells is just cells. A Table (press Ctrl+T) is a named object that grows when you add rows and lets formulas refer to columns by name.

**Analogy.** A plain range is a stack of loose pages. A Table is a binder: add a page and every index that points at the binder includes it.

**The rule.** A structured reference such as `Tx[Amount]` means "the Amount column of the Table named Tx", and it expands as rows are added. A reference such as `B2:B500` stops at row 500 whatever you paste below it. A reference can also be locked: `$A$1` is absolute and never moves when copied, `A1` is relative and shifts, and `$A1` or `A$1` locks only the column or only the row. F4 cycles through these.

**Worked example.** BoBo's October export lands in a Table named `Tx`:

| TxID | Date | Vendor | Category | Amount |
|---|---|---|---|---|
| T-001 | 2025-10-02 | Adobe | Software | 79.99 |
| T-002 | 2025-10-03 | AWS | Software | 412.50 |
| T-003 | 2025-10-05 | Staples | Office Supplies | 88.20 |
| T-004 | 2025-10-07 | Delta Airlines | Travel | 642.10 |
| T-005 | 2025-10-09 | Adobe | Software | 79.99 |
| T-006 | 2025-10-12 | Uber | Travel | 38.40 |
| T-007 | 2025-10-15 | Staples | Office Supplies | 124.60 |
| T-008 | 2025-10-18 | AWS | Software | 412.50 |
| T-009 | 2025-10-22 | LinkedIn | Marketing | 299.00 |
| T-010 | 2025-10-28 | Delta Airlines | Travel | 318.75 |

`=SUM(Tx[Amount])` returns 2,496.03 today, and still includes the rows you paste next month. For a conditional-formatting rule that must test each row's own columns, write `=AND($E2<TODAY(),$F2>0)`: the dollar signs lock the columns, and the row number stays free to move.

> [!warning] Common mistake
> Pressing F4 to "fix" a range that misses new rows. F4 only adds dollar signs so a reference does not shift when copied. It does not make the range longer; converting to a Table does.

## Step 2 — Total and flag with SUMIFS and COUNTIFS

**In plain language.** SUMIFS adds up numbers that meet conditions. COUNTIFS counts rows that meet conditions.

**Analogy.** SUMIFS is a calculator with a filter in front of it: only rows that pass every filter reach the adding machine.

**The rule.** The pattern is `SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)`: the range to add comes first, then pairs of range and condition. Join an operator to a date with `&`, as in `">="&DATE(2025,10,1)`. `COUNTIFS` takes the same range-and-condition pairs but only counts, and returns 0 when nothing matches.

**Worked example.** Software spend for October 2025:

```
=SUMIFS(Tx[Amount],
        Tx[Category],"Software",
        Tx[Date],">="&DATE(2025,10,1),
        Tx[Date],"<="&DATE(2025,10,31))
```

Four rows qualify: 79.99 + 412.50 + 79.99 + 412.50 = **984.98**. To flag possible duplicates, add a `DupFlag` column:

```
=IF(COUNTIFS(Tx[Vendor],[@Vendor],Tx[Amount],[@Amount])>1,"DUP CHECK","")
```

T-001 and T-005 (Adobe, 79.99) and T-002 and T-008 (AWS, 412.50) are flagged. A flag is a reason to look, not a verdict. A person decides whether the second AWS charge is a true duplicate or a second legitimate environment.

> [!warning] Common mistake
> Thinking SUMIFS removes duplicates. It adds every row that passes the conditions, so a double-posted invoice is added twice. Duplicates need their own check, such as the COUNTIFS flag.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "b61883c3-e540-4987-b8ba-33d953e1aba2"
title: "Checkpoint: Tables and SUMIFS"
questionBankId: "0e1fa42c-1577-47ec-9b8b-9246b284aed8"
questionIds:
  - "d75956bc-be36-49ae-96d2-8cdd42bfe72e"
  - "d6cefd15-010e-4ac5-bbda-9c30a6b51a67"
```

## Step 3 — Look up and sort with XLOOKUP and IFS

**In plain language.** A lookup finds a key in one list and returns a related value from another. IFS tests conditions in order and returns the answer for the first true one.

**Analogy.** XLOOKUP is a phone book: you give a name and get a number. IFS is a row of gates checked from the top; the first gate you pass decides your result.

**The rule.** `XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])`. It matches exactly by default, can return from a column left or right of the key, and has a built-in not-found argument. VLOOKUP's default is an approximate match and it only looks right of the key, which is a known source of silent mapping errors. XLOOKUP is available in Microsoft 365 and Excel 2021; older versions may not have it. For `IFS(test1, value1, test2, value2, ...)`, end with `TRUE` as a catch-all.

**Worked example.** Add a GL code from a chart-of-accounts Table `COA`:

```
=XLOOKUP([@Category], COA[Category], COA[GLCode], "UNMAPPED")
```

Software returns 6200 and Travel 6400. A category missing from `COA` shows `UNMAPPED`, which becomes your exception list. For an aging bucket from a `DaysOutstanding` column:

```
=IFS([@DaysOutstanding]<=30,"0-30",
     [@DaysOutstanding]<=60,"31-60",
     [@DaysOutstanding]<=90,"61-90",
     TRUE,"90+")
```

An invoice that is 60 days old fails the first test, passes the second, and lands in "31-60". An invoice that is 129 days old fails all three tests and reaches the `TRUE` line: "90+".

> [!warning] Common mistake
> Expecting the `TRUE` line to catch everything. It only catches rows that failed every earlier test, because IFS stops at the first true one.

## Step 4 — Do date math with EOMONTH, EDATE and YEARFRAC

**In plain language.** Month lengths vary, so adding "30 days" is a poor way to move a date by a month. Excel has functions that move by whole months.

**Analogy.** EOMONTH is the calendar's "end of month" bell. EDATE is a "same day next month" reminder.

**The rule.** `EOMONTH(start, months)` returns the last day of the month that is `months` away from the start. `EDATE(start, months)` returns the same day of the month that is `months` away, snapping to the last day if the target month is shorter. `YEARFRAC(start, end)` returns the fraction of a year between two dates; its result depends on the day-count basis you choose.

**Worked example.**

- `=EOMONTH("2025-10-15",0)` gives 2025-10-31, and `=EOMONTH("2025-10-15",-1)` gives 2025-09-30.
- `=EDATE("2025-10-15",1)` gives 2025-11-15, while `=EDATE("2025-10-31",1)` gives 2025-11-30.
- An invoice dated 2025-10-05 with terms "due at the end of next month" has due date `EOMONTH([@InvoiceDate],1)`, which is 2025-11-30.
- A 12-month prepaid that starts on a given date ends on `EDATE([@StartDate],11)`.
- `=YEARFRAC("2025-01-01","2025-07-01")` gives 0.5, so a $1,200 annual fee prorated over half a year is $600.

> [!warning] Common mistake
> Using EOMONTH for a renewal that happens on a fixed day. EOMONTH always returns a month-end, so a renewal on the 15th would be reported on the 30th or 31st.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "3a82f43c-90f4-47ad-ad1f-f7d0155b84de"
title: "Checkpoint: Lookups and dates"
questionBankId: "0e1fa42c-1577-47ec-9b8b-9246b284aed8"
questionIds:
  - "f0b3a3bb-e90f-4316-8399-3b0731fba472"
  - "d4e012a7-ed7b-44ec-bf98-fb24220e1424"
```

## Step 5 — Summarize with a PivotTable and tie it out

**In plain language.** A PivotTable groups a Table by the fields you choose and adds up the values. Before you send anything, you prove the numbers agree with the source.

**Analogy.** A PivotTable is a sorting table: dump all the receipts on it, group them by pile, and total each pile. The tie-out is counting the piles against the original stack.

**The rule.** Click inside the Table, choose Insert, then PivotTable. Drag Category to Rows and Amount to Values. Group a date field by month if you want a monthly view. Then cross-check: the PivotTable grand total should equal `SUM(Tx[Amount])`, and any SUMIFS summary should match both. For a trial balance, total debits and total credits should agree, so a Net field of Debit minus Credit should total zero.

**Worked example.** On the ten-row sample the category totals are Software 984.98, Office Supplies 212.80, Travel 999.25 and Marketing 299.00. They add to 2,496.03, which equals `SUM(Tx[Amount])`. Suppose a pivot shows less than the SUM. Check, in this order, whether the source is a Table that was refreshed, whether the values are set to Count instead of Sum, and whether any amounts are stored as text. Test with `=ISNUMBER(A2)`, and compare `COUNT(Tx[Amount])` with the row count.

Display and stored value can also differ: a cell showing 100.00 may hold 100.004. `ROUND(value,2)` changes the stored value; formatting does not.

> [!warning] Common mistake
> Arguing about which total is "right" before finding where they differ. Split the difference by category until you find the specific rows.

### Checkpoint 3

```knowledge-quiz
schemaVersion: 1
quizId: "e8e9e34c-44e5-43f1-b9b2-4c7629d2a189"
title: "Checkpoint: Tie-out"
questionBankId: "0e1fa42c-1577-47ec-9b8b-9246b284aed8"
questionIds:
  - "10f0a40b-82b5-4c47-87c5-9b483a18628b"
  - "f5d844a1-3ab2-4659-af71-196aff7a39d5"
```

## Try it

Use the ten-row `Tx` sample from Step 1. On a Summary tab, build a SUMIFS-driven total for each of the four categories, add a Grand Total, and write a cross-check cell that returns TRUE when the summary equals the source total. Then count how many rows would receive a "DUP CHECK" flag.

> [!example]- Sample solution
> Each category uses `=SUMIFS(Tx[Amount],Tx[Category],"<name>")`:
>
> | Category | Total |
> |---|---|
> | Software | 984.98 |
> | Office Supplies | 212.80 |
> | Travel | 999.25 |
> | Marketing | 299.00 |
> | **Grand Total** | **2,496.03** |
>
> The cross-check cell is `=ROUND(SUM(B2:B5),2)=ROUND(SUM(Tx[Amount]),2)`, which returns TRUE. Four rows are flagged: T-001 and T-005 (Adobe, 79.99) and T-002 and T-008 (AWS, 412.50). The Staples rows have different amounts, so they are not flagged.

## Key takeaways

- Convert every dataset to a Table first, so structured references grow with the data.
- SUMIFS puts the range to add first, then range-and-condition pairs; it never removes duplicates.
- A COUNTIFS flag marks rows for review; a person decides whether they are real duplicates.
- XLOOKUP matches exactly by default and returns a fallback such as UNMAPPED, so gaps become a visible exception list.
- Use EOMONTH for month-end dates and EDATE for the same day each month.
- If you cannot tie the total to the source, you are not ready to send the report.

## Explain it back

In your own words, explain why you turn a dataset into a Table before anything else, then name the three formula families that do most accounting work and one job for each.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "4b151495-15ca-4302-9034-76715a783613"
title: "Chapter quiz: Excel essentials"
questionBankId: "0e1fa42c-1577-47ec-9b8b-9246b284aed8"
questionIds:
  - "a6e353f9-4932-4a4f-a0de-e34eb2fe1161"
  - "dbdebac0-4fde-4839-8492-35b11a80af05"
  - "0f198691-e403-4ec6-b349-508fcf795517"
  - "26b054da-da75-4a0b-9b7b-9a4d5c6d6749"
  - "4315d3b8-30e4-4715-9089-446d42df472c"
  - "ec681f29-3d2d-470d-a602-610d80d8ee6a"
```

Next: [[courses/accounting-ai-crash-course/lessons/21-power-query-power-pivot|Next lesson]]

---
id: "0e1fa42c-1577-47ec-9b8b-9246b284aed8"
title: "Excel Essentials for Accounting Work Question Bank"
description: "Practice questions for Excel Essentials for Accounting Work."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use sample data from the fictional BoBo Digital Services LLC; every figure is made up for practice.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "d6cefd15-010e-4ac5-bbda-9c30a6b51a67"
    revision: 1
    status: active
    type: single-choice
    prompt: "A Table named Tx holds ten October rows, and four of them are Software: Adobe 79.99, AWS 412.50, Adobe 79.99 and AWS 412.50. What does SUMIFS(Tx[Amount],Tx[Category],\"Software\",Tx[Date],\">=\"&DATE(2025,10,1),Tx[Date],\"<=\"&DATE(2025,10,31)) return?"
    options:
      - id: one-each
        text: "492.49, one Adobe row and one AWS row only"
      - id: all-four
        text: "984.98, all four Software rows added together"
      - id: skip-category
        text: "2,496.03, every row because Category is skipped"
    correctOptionIds: [all-four]
    explanation: "SUMIFS adds every row that meets all of its criteria, and all four Software rows fall inside October, so the total is 984.98. The 492.49 answer wrongly treats the repeat charges as one, but SUMIFS does not remove duplicates; that is a separate check."
  - id: "d75956bc-be36-49ae-96d2-8cdd42bfe72e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Each month you paste about 40 new rows under a plain range, and a report still uses =SUM(B2:B500). Rows past 500 are silently left out. What is the best fix?"
    options:
      - id: make-table
        text: "Convert the data to a Table and sum Tx[Amount]"
      - id: retype-range
        text: "Retype the end of the range each month to cover new rows"
      - id: lock-range
        text: "Press F4 so the range stays locked as rows arrive"
    correctOptionIds: [make-table]
    explanation: "A Table grows when rows are added, and a structured reference such as Tx[Amount] grows with it, so the report never misses new data. Pressing F4 only adds dollar signs to a reference. That stops it from shifting when copied, but it does not make the range any longer."
  - id: "a6e353f9-4932-4a4f-a0de-e34eb2fe1161"
    revision: 1
    status: active
    type: single-choice
    prompt: "An overdue-invoice rule, =AND($E2 less than TODAY(),$F2 greater than 0), is applied to A2:F200. Why are the dollar signs placed before the column letters only?"
    options:
      - id: fixed-cell
        text: "It locks the rule to row 2 so every row copies the first invoice's result"
      - id: shift-cols
        text: "It lets columns E and F shift right so each cell checks its neighbor"
      - id: row-test
        text: "It keeps columns E and F fixed while each row checks its own invoice"
    correctOptionIds: [row-test]
    explanation: "A mixed reference such as $E2 locks the column but lets the row move, so every cell in a row tests that row's due date and balance. Writing $E$2 would lock both parts and make all rows copy row 2's result, which is the tempting mistake."
  - id: "dbdebac0-4fde-4839-8492-35b11a80af05"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the ten-row Tx sample, Adobe 79.99 appears on T-001 and T-005, AWS 412.50 on T-002 and T-008, and Staples has two different amounts. You add =IF(COUNTIFS(Tx[Vendor],[@Vendor],Tx[Amount],[@Amount])>1,\"DUP CHECK\",\"\"). Which rows are flagged?"
    options:
      - id: four-rows
        text: "T-001, T-002, T-005 and T-008, each repeating a vendor and amount"
      - id: aws-only
        text: "T-002 and T-008 only, because Adobe's repeat is a subscription"
      - id: staples
        text: "T-003 and T-007, because both come from the vendor Staples"
    correctOptionIds: [four-rows]
    explanation: "The formula counts rows that match on both vendor and amount, so all four repeated pairs are flagged and the two Staples rows are not, since their amounts differ. The formula cannot know that a subscription charge is legitimate, so a flag only means a person should investigate."
  - id: "f0b3a3bb-e90f-4316-8399-3b0731fba472"
    revision: 1
    status: active
    type: single-choice
    prompt: "A new transaction has Category Training, which is missing from the COA table. The formula is =XLOOKUP([@Category],COA[Category],COA[GLCode],\"UNMAPPED\"). What does that row show?"
    options:
      - id: nearest-code
        text: "The GL code of the closest category in the list"
      - id: unmapped
        text: "The text UNMAPPED, which flags the row for review"
      - id: zero-code
        text: "A zero that quietly adds nothing to later totals"
    correctOptionIds: [unmapped]
    explanation: "XLOOKUP uses exact matching by default and returns the fourth argument when the key is not found, so the row shows UNMAPPED and joins your exception list. An approximate match to a neighboring category would be dangerous because it would post the cost to the wrong account without any warning."
  - id: "0f198691-e403-4ec6-b349-508fcf795517"
    revision: 1
    status: active
    type: single-choice
    prompt: "An invoice is exactly 60 days old. The IFS tests run in this order: Days<=30, Days<=60, Days<=90, then TRUE for \"90+\". Which bucket does it get?"
    options:
      - id: sixty-one
        text: "61-90, because 60 days has passed the 31-60 window"
      - id: ninety-plus
        text: "90+, because the TRUE fallback catches every row"
      - id: thirty-one
        text: "31-60, because 60 first passes the second test"
    correctOptionIds: [thirty-one]
    explanation: "IFS checks the tests from the top and stops at the first one that is true; 60 fails the first test and passes Days<=60, so it lands in 31-60. The TRUE at the end is only a fallback for rows that failed every earlier test, so it never applies here."
  - id: "d4e012a7-ed7b-44ec-bf98-fb24220e1424"
    revision: 1
    status: active
    type: single-choice
    prompt: "A software subscription started on the 15th and renews on the same day every month. Which formula returns the next renewal date?"
    options:
      - id: eomonth-next
        text: "EOMONTH([@Start],1), the last day of next month"
      - id: eomonth-zero
        text: "EOMONTH([@Start],0), the end of the current month"
      - id: yearfrac
        text: "YEARFRAC([@Start],TODAY()), the year fraction so far"
      - id: edate
        text: "EDATE([@Start],1), the same day of next month"
    correctOptionIds: [edate]
    explanation: "EDATE moves a date by whole months and keeps the day of the month, which is what a renewal date needs. EOMONTH always returns a month-end, so it suits period-end dates, and it would put this renewal on the 30th or 31st instead of the 15th."
  - id: "26b054da-da75-4a0b-9b7b-9a4d5c6d6749"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which are real advantages of XLOOKUP over VLOOKUP? Select every correct answer."
    options:
      - id: exact-default
        text: "Exact match is the default setting"
      - id: look-left
        text: "It can return a column left of the lookup column"
      - id: not-found
        text: "A built-in argument handles missing keys"
      - id: column-number
        text: "It needs a column index counted from the left"
      - id: sorted-only
        text: "It requires the lookup list sorted ascending"
    correctOptionIds: [exact-default, look-left, not-found]
    explanation: "XLOOKUP matches exactly unless told otherwise, can return from any column, and has an if_not_found argument, so no IFERROR wrapper is needed. The column index number is a VLOOKUP habit that XLOOKUP removes, and neither function needs the list sorted for an exact match."
  - id: "10f0a40b-82b5-4c47-87c5-9b483a18628b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A SUMIFS returns 0 even though you can see matching rows. Which are likely causes? Select every correct answer."
    options:
      - id: text-amounts
        text: "The Amount cells are stored as text, not numbers"
      - id: trailing-space
        text: "The criteria cells carry trailing spaces after the words"
      - id: table-column
        text: "The criteria range is a column inside a Table"
      - id: date-format
        text: "The Date column is formatted as a date"
    correctOptionIds: [text-amounts, trailing-space]
    explanation: "SUMIFS skips amounts stored as text and cannot match a criterion that differs by a hidden space, so either one can produce 0; test amounts with ISNUMBER and clean text with TRIM. Tables and date formats are normal conditions that SUMIFS handles without trouble."
  - id: "f5d844a1-3ab2-4659-af71-196aff7a39d5"
    revision: 1
    status: active
    type: true-false
    prompt: "Formatting a cell to show two decimals changes the value stored in that cell."
    answer: false
    explanation: "Number formatting only changes how the value is displayed, so a cell showing 100.00 can still hold 100.004. Only a function such as ROUND changes the stored value, and that difference is why displayed totals can miss a tie-out by a penny."
  - id: "4315d3b8-30e4-4715-9089-446d42df472c"
    revision: 1
    status: active
    type: free-recall
    prompt: "The bank CSV has 138 lines and the QuickBooks register has 134. Walk through how you would reconcile them in Excel."
    sampleAnswer: "Convert both lists to Tables, named Bank and Books. Add a MatchKey helper column to each that joins the date and the amount. Use XLOOKUP from Bank into Books with a NOT IN BOOKS fallback, then filter for that text to see unmatched bank lines. Reverse the lookup to find book entries that never cleared. Investigate each exception, such as a deposit in transit, an outstanding check or a duplicate payment, and document what you found."
    explanation: "A strong answer uses Tables, a shared match key, a lookup in both directions and a fallback text that creates an exception list. It also explains each exception instead of just listing it, because timing items and true errors need different actions."
  - id: "ec681f29-3d2d-470d-a602-610d80d8ee6a"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why you turn a dataset into a Table before anything else, then name the three formula families that do most accounting work and one job for each."
    sampleAnswer: "A Table has a name, grows when rows are added, and lets formulas use column names such as Tx[Amount], so reports do not silently miss new rows. After that, lookups such as XLOOKUP map a vendor or category to a GL code. Aggregates such as SUMIFS and COUNTIFS total spend by category and month or flag duplicates. PivotTables summarize the whole dataset by category and month with subtotals."
    explanation: "A good answer gives the reason for Tables, which is that formulas keep working as data arrives, and then pairs each family with a concrete job. Naming functions without a job, or a job without a function, shows only half of the idea."
```

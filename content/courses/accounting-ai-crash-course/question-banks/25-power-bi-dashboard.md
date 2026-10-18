---
id: "072aad55-3541-4ccc-8c74-8aa5df667f61"
title: "Power BI Accounting Dashboard Question Bank"
description: "Practice questions for Power BI Accounting Dashboard."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study; every table, vendor, invoice and figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "82c920d6-3883-49ef-a532-2af67a78da31"
    revision: 1
    status: active
    type: single-choice
    prompt: "A coworker pastes vendor, customer, account type, date and amount into one big sheet. Dashboard totals double-count and slicers behave oddly. What is the best fix?"
    options:
      - id: adjust-columns
        text: "Add calculated columns that scale each row's amount down to offset the repeats"
      - id: hide-columns
        text: "Keep one table but hide the columns that cause the repeats"
      - id: star-schema
        text: "Split it into a fact table of transactions plus linked dimension tables"
      - id: visuals-first
        text: "Rebuild the visuals first, then rework the table layout afterward"
    correctOptionIds: [star-schema]
    explanation: "A star schema keeps the numbers once in a central fact table and puts the labels in separate dimension tables joined by keys, so totals stop repeating and slicers filter cleanly. Hiding columns is tempting because it makes the sheet look tidier, but the double-counting comes from the flat structure itself, not from what is visible."
  - id: "9c4fb12c-7b08-423b-b4f4-104bd7084ecb"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which need is best met by a DAX measure rather than a calculated column?"
    options:
      - id: revenue-total
        text: "A revenue total that must change with the month or customer clicked"
      - id: large-flag
        text: "A yes-or-no flag stored on every row showing whether it exceeds $10,000"
      - id: category-label
        text: "A fixed text label stored on every row for its account category"
      - id: vendor-type-copy
        text: "A per-row copy of the vendor type stored with each transaction"
    correctOptionIds: [revenue-total]
    explanation: "A measure is calculated at the moment of use, in whatever filter context the user has chosen, so a revenue total belongs there. The over-$10,000 flag is the tempting wrong option, but it has one fixed answer per row, which is exactly what a calculated column is for."
  - id: "104ef911-6ef5-424d-94dd-1fa2d509a19d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Gross Margin % is written with DIVIDE, using [Total Revenue] as the denominator and 0 as the third argument. A slicer selects a month with no revenue. What does the card show?"
    options:
      - id: error-page
        text: "A divide-by-zero error that blanks the whole page"
      - id: always-blank
        text: "BLANK, because DIVIDE always returns BLANK on a zero denominator"
      - id: carry-forward
        text: "The previous month's margin, carried forward automatically"
      - id: alternate-zero
        text: "0, the alternate result supplied as the third argument"
    correctOptionIds: [alternate-zero]
    explanation: "DIVIDE returns the alternate result when the denominator is zero, and here the author set that alternate result to 0. BLANK is only the default when no third argument is given, so assuming it always returns BLANK ignores the argument that was written."
  - id: "d61cab15-7d2e-4f17-9df7-1745873ec708"
    revision: 1
    status: active
    type: single-choice
    prompt: "The AR aging bucket logic uses SWITCH with TRUE(): Current at 0 days or less, then limits of 30, 60 and 90 days, with a final default. An invoice has Days Outstanding of 45. Which bucket does it land in?"
    options:
      - id: one-thirty
        text: "1-30 Days"
      - id: thirty-sixty
        text: "31-60 Days"
      - id: sixty-ninety
        text: "61-90 Days"
      - id: ninety-plus
        text: "90+ Days"
    correctOptionIds: [thirty-sixty]
    explanation: "SWITCH with TRUE() tests the conditions from top to bottom and returns the first one that is true. At 45 days the test for 30 or fewer fails and the test for 60 or fewer passes, so the invoice is 31-60 Days. Picking 1-30 is the tempting slip when you think of 45 days as roughly a month."
  - id: "5039e8f9-d9b2-4ecb-abcb-f38962f4d853"
    revision: 1
    status: active
    type: single-choice
    prompt: "A YoY Growth % measure built on the date column inside Fact_Transactions returns wrong or blank results. What is the sound fix?"
    options:
      - id: dim-date
        text: "Base time measures on Dim_Date[Date] after marking Dim_Date as the date table"
      - id: fact-column
        text: "Add a calculated column on the fact table that stores last year's amount per row"
      - id: plain-division
        text: "Replace SAMEPERIODLASTYEAR with plain division by the prior year total"
      - id: hard-dates
        text: "Hard-code the prior year's dates inside the measure's filter condition"
    correctOptionIds: [dim-date]
    explanation: "Time-intelligence functions such as SAMEPERIODLASTYEAR need a proper date table, so the model gets a Dim_Date that is marked as the date table and every time measure uses its Date column. A calculated column on the fact table is tempting because it looks like a quick patch, but it is fixed per row and cannot respond to the period the user picks."
  - id: "f667dbf6-7c2b-4439-b4fd-7efe0fd9d06d"
    revision: 1
    status: active
    type: single-choice
    prompt: "An analyst opens Model view to check how BoBo's tables are related. Which relationship setup is correct for the star schema?"
    options:
      - id: many-to-many
        text: "Many-to-many between each dimension and the fact table"
      - id: fact-to-dim
        text: "One-to-many from the fact table out to each dimension, single direction"
      - id: dim-to-fact
        text: "One-to-many from each dimension to the fact table, single direction"
      - id: dim-to-dim
        text: "One-to-many in both directions among all four dimension tables"
    correctOptionIds: [dim-to-fact]
    explanation: "Each dimension holds one row per key, and the fact table holds many rows for that key, so the relationship runs one-to-many from dimension to fact with the filter flowing in one direction. Reversing it to fact-to-dimension is the tempting mistake because the fact table feels central, but filters must travel from the labels down to the numbers."
  - id: "8d7076b8-0f32-4e96-b2b9-d3c08a575ba6"
    revision: 1
    status: active
    type: single-choice
    prompt: "Bo's Monday review shows two $4,200 CloudHostPro invoices posted 12 days apart with the same memo. Which exception table is built to surface this pattern?"
    options:
      - id: unapproved-large
        text: "Transactions over $10,000 that have no approval recorded in the system"
      - id: duplicate-amounts
        text: "Same-vendor transactions with identical amounts within 30 days"
      - id: round-dollar
        text: "Round-dollar journal entries above $5,000 in the period"
      - id: weekend-posts
        text: "Postings made on weekends or holidays in the period"
    correctOptionIds: [duplicate-amounts]
    explanation: "The duplicate-amount table looks for the same vendor and the same amount inside a 30-day window, which is exactly what two $4,200 invoices 12 days apart look like. The round-dollar table is the tempting choice because 4,200 is a round figure, but that table only checks journal entries above $5,000."
  - id: "62c7c6c1-ec2c-4ca0-a7c1-91f143a94a8e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "An AI assistant drafts a DAX measure for Net Income. Which THREE steps follow the chapter's guardrails?"
    options:
      - id: check-names
        text: "Check that table and column names match your actual model"
      - id: accept-compiles
        text: "Accept the formula once it compiles without any errors"
      - id: tie-out
        text: "Tie the result to a known figure, such as the QuickBooks P&L"
      - id: keep-invented
        text: "Keep invented table names if the logic looks sound"
      - id: audit-log
        text: "Log the prompt, the formula, your check and the date"
    correctOptionIds: [check-names, tie-out, audit-log]
    explanation: "Each draft must reference real tables and columns, be tied to a known figure by a human, and be recorded in an audit trail. Accepting a formula because it compiles is tempting, but a measure can run without errors and still return the wrong number."
  - id: "7c6af7ee-65a4-4cf8-a5ef-5486b13ac4d5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A teammate proposes four changes to the BoBo model. Which TWO should you push back on?"
    options:
      - id: hard-coded-name
        text: "Filter revenue by Account Name equal to Sales Q1 2024"
      - id: mark-date
        text: "Mark Dim_Date as the date table for time measures"
      - id: visuals-first
        text: "Build the visuals first and settle the model later"
      - id: display-folders
        text: "Group the measures into display folders by function"
    correctOptionIds: [hard-coded-name, visuals-first]
    explanation: "A filter on one account name breaks when accounts are added or renamed, and building visuals before the model forces you to rebuild charts whenever the model changes. Display folders can look like extra clutter, but they keep dozens of measures findable and are recommended."
  - id: "73c2e96f-a993-4392-9898-0e9f3a57013b"
    revision: 1
    status: active
    type: true-false
    prompt: "A calculated column in Power BI is recalculated every time a user clicks a slicer."
    answer: false
    explanation: "A calculated column is computed row by row when the data refreshes and then stored, so clicking a slicer does not recompute it. A measure is the object that responds to slicer clicks, which is why anything that depends on what the user is looking at belongs in a measure."
  - id: "abbefa57-d6cf-4dee-ace3-4ef6bdb4bd3d"
    revision: 1
    status: active
    type: free-recall
    prompt: "The CFO asks why March revenue is down against February. Which dashboard page do you open, and what do you click to find the cause?"
    sampleAnswer: "I open the Revenue Trend page, click March in the line chart so the page filters to that month, and then use the decomposition tree to break Total Revenue down by customer. That shows which customer's revenue dropped, for example one that churned, in about three clicks and without building anything new."
    explanation: "A strong answer names the Revenue Trend page, the click on March, and the breakdown by customer. Describing a new report to build misses the point that the dashboard is meant to answer the question through drilling."
  - id: "af6eb26c-ec84-4581-8c9b-d3dc975f8b5a"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why the data model matters more than the visuals in a Power BI accounting dashboard. Use the star schema, measures and the date table in your answer."
    sampleAnswer: "Visuals only display what the model gives them. A star schema keeps one fact table of transactions joined to dimension tables, so totals are right and filters work. Measures calculate in the filter context the user chooses, so numbers like Total Revenue respond to slicers. A marked date table makes time measures such as month-over-month growth work correctly. If the model is wrong, every chart is wrong however good it looks."
    explanation: "Look for the three model pieces: the fact and dimension structure, measures that respond to filters, and the marked date table. The key idea is the order of work, model first, measures second, visuals last."
```

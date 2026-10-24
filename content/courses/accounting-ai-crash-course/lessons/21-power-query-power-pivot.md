---
id: "8def987b-a071-40bf-8edd-56217f7ecd3c"
title: "Power Query and Power Pivot for Accounting"
description: "Build a refreshable month-end pipeline that imports, cleans, combines and analyzes payment exports with Power Query, Power Pivot and DAX."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 21
estimatedMinutes: 45
---

## Why this matters

If you copy and paste the same CSV files into a workbook every month, you are closing the books the slow way, and every manual step is a chance to drop a row or mistype a total. Power Query records your cleanup steps once and replays them on next month's files with a single refresh. Employers hiring entry-level accountants often ask about it, because a clean, refreshable month-end pack is worth more than a one-off spreadsheet. The same thinking carries over to Power BI and to Python's pandas library.

## What you'll be able to do

- Explain what Power Query, the Data Model, Power Pivot and DAX each do, and how they fit together.
- Build a standardized transaction table by importing, cleaning and appending several exports.
- Decide which key to use when removing duplicates, and defend the choice.
- Diagnose unmatched rows after merging with the Chart of Accounts (COA).
- Read a basic DAX measure and say what it calculates.

## Before you start

- What is the Chart of Accounts, and why does every transaction need an account from it?
- Why do bookkeepers look up the GL account for each bank line, and what tool did you use for that lookup before this lesson?
- How would you check that an imported column of amounts adds up to the total shown in the source file?

Review: [[courses/accounting-ai-crash-course/lessons/20-excel-essentials|Previous lesson]]

## Step 1 — Get: connect to a folder, not a file

**In plain language.** Power Query is a recorder for data cleanup. You click through the steps once and Excel writes them down as a recipe, stored in a language called M. Next month you give the recipe new ingredients and it runs again.

**Analogy.** Think of a kitchen. Power Query is the prep cook, Power Pivot is the chef and the PivotTable is the plate. You are the one telling the kitchen what to make.

**The rule.** You find Power Query under the Data tab, Get Data. For recurring imports, choose From File, then From Folder, so one connection serves every file in that folder. Next month you put the new files in a new dated folder and change one parameter.

**Worked example.** BoBo Digital Services LLC keeps four exports in a folder named for the month: a Stripe file, a PayPal file, a Pacific Bank file and a vendor bills file. You connect once to the April folder. To work on one source at a time, filter the file list by name, for example `Name` starts with "stripe", and duplicate the query for each of the other sources. Keeping the sources in separate queries lets you fix each one's quirks before you combine them.

> [!warning] Common mistake
> Importing each file separately with From File. You then rebuild the work every month. Connect to the folder and keep the path in a parameter, so a teammate's laptop can run the same pipeline.

## Step 2 — Shape: headers, junk rows, types and clean text

**In plain language.** Raw exports are untidy. Shaping makes every column mean what it says.

**Analogy.** It is like unpacking groceries: remove the packaging, check the labels and put each item in the right place.

**The rules.**

1. Use Remove Top Rows first to drop metadata above the real data. The Pacific Bank export has four junk rows (title, account, period and a blank line) before its header row.
2. Then use Transform, Use First Row as Headers to turn the first real row into column names. Promoting headers before removing the junk rows would make the title line your header.
3. Remove truly blank rows, but never silently delete error rows: each one is a real transaction with a bad date, amount or encoding. Reference the query, use Keep Errors to send them to an exception query, fix or investigate them, and check that the row count and amount total still match the source export before you load.
4. Set the data type of every column that matters: Date, Decimal or Currency, and Text. Use the Using Locale option for dates like 4/5/2026 if your computer is not set to US formats.
5. Use Transform, Format, Trim and Clean to strip extra spaces and non-printing characters.

**Worked example.** Stripe's `Created (UTC)` column arrives as the text "2026-04-03 14:22:11". Change its type to date and time, or split it into a Date and a Time on the space. A date stored as text will not sort, filter or relate to a calendar table, and an Amount stored as text will not sum, so a PivotTable shows counts instead of totals.

> [!warning] Common mistake
> Trusting the automatic type detection, or skipping Change Type on a critical column. The refresh still succeeds, but your totals are silently wrong. Set types explicitly after every import.

```knowledge-quiz
schemaVersion: 1
quizId: "24f3719a-44b6-4552-942a-e6a6d7b97131"
title: "Checkpoint: get and shape"
questionBankId: "b32480fa-effb-4cd5-bf6f-dd48893ad364"
questionIds:
  - "fad21ed4-dad3-459f-a718-824904ea4141"
  - "bac1a09d-696f-4a13-93da-92541d63c127"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/accounting-ai-crash-course/question-banks/21-power-query-power-pivot|Power Query and Power Pivot for Accounting Question Bank]].

## Step 3 — Combine: standardize, append and deduplicate

**In plain language.** Each source has different column names. Before stacking them, make them look the same.

**Analogy.** Imagine merging four class rosters into one list. You first agree on the column headings, then stack the lists, then remove students listed twice.

**The rules.**

- Add a `Source` column to each query with a literal such as "Stripe", "PayPal", "Bank" or "Bills", so you can always trace a row back to its file.
- Rename and select columns so every query has the same schema: `TxnDate`, `Description`, `Amount`, `Currency`, `Source` and `RawSourceID`.
- Append stacks tables vertically and matches columns by name. Use Home, Append Queries, As New, and name the result `All_Transactions`.
- Remove duplicates on `Source` plus `RawSourceID`, the source system's own transaction ID.

**Worked example.** In the Stripe query, rename `Created (UTC)` to `TxnDate`, `Net` to `Amount` and `id` to `RawSourceID`, then keep only the six standard columns. If PayPal's net amount is still called `Net` while the bank calls it `Amount`, Append places them in separate columns and `Amount` is filled for only some rows, with no error message.

> [!warning] Common mistake
> Deduplicating on Date and Amount. Two real $99.00 payments on the same day look like duplicates but have different transaction IDs. Use the source's own ID as the key.

## Step 4 — Enrich: merge with the Chart of Accounts and audit

**In plain language.** Merge adds columns from another table by matching a key, which is what VLOOKUP does, but with a recorded and repeatable process.

**Analogy.** It is like adding a sticker with the account number to every receipt by looking up the vendor type on a reference list.

**The rules.**

- Pre-classify rows with a Conditional Column, for example if `Type` is "charge" then "Revenue", if "refund" then "Revenue Contra", otherwise "Other". This gives the merge something to match.
- Use Home, Merge Queries, match `GL Hint` to the COA's `Account Name`, choose Left Outer, and expand `Account Number` and `Account Type`.
- Left Outer keeps every transaction even when the lookup fails, so you can see what did not match.
- Audit: filter the new `Account Number` column for null. The count should be zero before you load.

**Worked example.** Twelve rows come back null. Filter to them, compare their `GL Hint` text with the COA names, and check for case or trailing spaces. Then either add a missing account to the COA or fix the conditional rule upstream. In BoBo's July close, a bank description changed from two spaces to one, and switching the rule to a text-contains test on "STRIPE TRANSFER" fixed nine rows. A new "Software-SaaS" hint needed one new COA row.

> [!warning] Common mistake
> Hand-editing the output table to patch unmatched rows. The next refresh overwrites the edit and the real problem remains. Fix the query, not the output.

```knowledge-quiz
schemaVersion: 1
quizId: "088b1d5c-6940-4321-a196-15c84ceb120e"
title: "Checkpoint: combine and enrich"
questionBankId: "b32480fa-effb-4cd5-bf6f-dd48893ad364"
questionIds:
  - "9d6f50dc-7938-464e-9ab8-732d3fb60c9c"
  - "feb7aa72-c76a-448a-b52b-7f1da04e6cbe"
```

## Step 5 — Load, analyze and refresh

**In plain language.** Once the data is clean, you load it to the Data Model so Power Pivot can analyze it.

**Analogy.** Power Query is the prep cook, who has done the shaping. Power Pivot is the chef who combines the prepared tables into dishes called measures.

**The rules.**

- Use Home, Close & Load To, Add to Data Model. The Data Model stores compressed tables and their relationships, and can hold far more rows than a worksheet, which is capped at about 1.05 million.
- Power Pivot is the analysis layer on the Data Model. You define relationships between tables, such as Transactions, Chart of Accounts and a Calendar table. A measure that filters on the Chart of Accounts needs a relationship between that table and the transactions table.
- DAX (Data Analysis Expressions) is the formula language for measures. It looks like Excel but works on whole columns and tables.
- Data, Refresh All re-runs every query against the current files.

**Worked example.** A first measure:

```DAX
Total Revenue :=
CALCULATE(
    SUM ( All_Transactions[Amount] ),
    Chart_of_Accounts[Account Type] = "Revenue"
)
```

This sums `Amount` for rows whose account type is Revenue. Put a Calendar month on the rows of a PivotTable and the measure fills each month. The chapter estimates about three hours to build the pipeline once, and under a minute to refresh afterward.

> [!warning] Common mistake
> Loading every column to the Data Model. Unused columns bloat the workbook and slow refresh. In the final step before load, keep only the columns you use.

## Step 6 — Use AI to draft M code, with guardrails

**In plain language.** AI can draft M code and DAX quickly, but it can also invent column names and functions.

**Analogy.** Treat it like an eager intern: helpful, and every output needs your review.

**The rules.**

1. Paste your exact CSV header row into the prompt, and never let AI invent column names.
2. Comment each generated query with its source file and the date you checked the headers.
3. Read every type change line yourself, because a currency column set to a whole-number type loses cents.
4. Test each branch of a classification rule with a known row before it reaches the financial statements.
5. Verify function names against the official M documentation or the editor's suggestions; a name such as `Table.MagicCleanCurrency` does not exist.
6. After an AI-assisted change, run Refresh All on a known month and tie the totals to the closed file.

**Worked example.** The AI writes code that refers to `Transaction Number`. Your PayPal file says `Transaction ID`. You fix the code and re-prompt with the verbatim header row, instead of renaming the CSV or waiting for an error.

> [!warning] Common mistake
> Assuming that code which previews without errors is correct. A wrong type or a wrong revenue-versus-refund rule can refresh successfully and still produce wrong numbers.

```knowledge-quiz
schemaVersion: 1
quizId: "3826de45-ae3b-42cf-83b0-6654de102e87"
title: "Checkpoint: model, measure and AI"
questionBankId: "b32480fa-effb-4cd5-bf6f-dd48893ad364"
questionIds:
  - "553355d6-fc9a-4e6a-aa34-028ecb3afe1c"
  - "71a1e362-ff40-4428-bfb8-c7bd4969ffb6"
```

## Try it

Your manager hands you a Stripe CSV, a PayPal CSV and a bank CSV with four junk rows on top, plus a Chart of Accounts file. Outline on paper: (a) the Power Query steps for the bank file, (b) the final unified columns, (c) the merge rule with the COA, and (d) one quality-control check.

> [!example]- Sample solution
> (a) Bank: connect to the folder, filter the name to the bank file, combine, remove the top 4 rows, promote headers, set Posting Date to date and Amount to currency, rename Posting Date to `TxnDate` and the check or slip number to `RawSourceID`, add `Source` = "Bank", add a conditional `GL Hint` from description keywords, then select the common columns.
> (b) `TxnDate`, `Description`, `Amount`, `Currency`, `Source`, `RawSourceID`, `GL Hint`, plus `Account Number` and `Account Type` from the merge.
> (c) Left outer join of `All_Transactions[GL Hint]` to `Chart_of_Accounts[Account Name]`, then expand the two COA columns.
> (d) A query that counts rows with a null `Account Number`, loaded to a summary cell; the target is zero before you close the month.

## Key takeaways

- Power Query always does three things in order: get the data, shape it, load it.
- Append stacks rows and matches columns by name; Merge adds columns by matching a key.
- Always set data types explicitly after import, especially dates and currency.
- Deduplicate on Source plus RawSourceID, never on date and amount alone.
- Use a left outer join and a zero-unmatched check, then load to the Data Model for DAX measures.
- Fix the query, not the output, and verify anything AI drafts.

## Explain it back

In your own words, describe how a monthly Power Query pipeline works from CSV files to a refreshable report, and what the mantra "Fix the query, not the output" means.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "2d5a18df-8542-4bc2-b9e7-8be3a9e365b8"
title: "Chapter quiz: Power Query and Power Pivot"
questionBankId: "b32480fa-effb-4cd5-bf6f-dd48893ad364"
questionIds:
  - "3031b7bd-b602-470e-b150-3e59d1ec33fc"
  - "f15d33c1-021f-4d63-8c7a-e3fe1734cfd9"
  - "2dd02ee2-a31c-4531-8aef-5a06e344e11e"
  - "d867914b-fc56-4194-a77e-8393fb4e018d"
  - "f65d247a-a9e9-40fe-8b94-c4c8125f8a23"
  - "93c39578-1ea6-47a6-aa1d-363d24f7135a"
```

Next: [[courses/accounting-ai-crash-course/lessons/22-quickbooks-workflow|Next lesson]]

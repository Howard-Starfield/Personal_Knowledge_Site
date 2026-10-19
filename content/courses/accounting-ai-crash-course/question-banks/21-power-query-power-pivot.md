---
id: "b32480fa-effb-4cd5-bf6f-dd48893ad364"
title: "Power Query and Power Pivot for Accounting Question Bank"
description: "Practice questions for Power Query and Power Pivot for Accounting."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC month-end pipeline; every figure and file name is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "9d6f50dc-7938-464e-9ab8-732d3fb60c9c"
    revision: 1
    status: active
    type: single-choice
    prompt: "You have January, February and March Stripe exports with identical columns and want one table holding all three months. Which Power Query operation fits?"
    options:
      - id: pivot
        text: "Pivot, to turn the month rows into columns"
      - id: merge
        text: "Merge, to join the three files together on a shared key"
      - id: append
        text: "Append, to stack the three tables into more rows"
      - id: unpivot
        text: "Unpivot, to turn the monthly columns into rows"
    correctOptionIds: [append]
    explanation: "Append stacks tables vertically, so identical columns from three months become one longer table. Merge is the tempting choice, but it adds columns by matching a key, which would leave you with three side-by-side copies of each field instead of one list of transactions."
  - id: "fad21ed4-dad3-459f-a718-824904ea4141"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's four CSV files arrive in a new dated folder every month. Why is Get Data from a folder better than from a single file?"
    options:
      - id: folder
        text: "One folder connection picks up the files placed in that folder"
      - id: speed
        text: "A folder connection reads large CSV data faster than a file one"
      - id: types
        text: "A folder connection sets the correct data types for you"
      - id: model
        text: "A folder connection loads the data to Power Pivot by default"
    correctOptionIds: [folder]
    explanation: "The connection points at the folder, so next month you drop in the new files, change one parameter and refresh instead of building new queries. Many learners assume data types come with it, but Power Query only guesses types from a sample of rows and can guess wrong, so you still set them explicitly with a Change Type step."
  - id: "bac1a09d-696f-4a13-93da-92541d63c127"
    revision: 1
    status: active
    type: single-choice
    prompt: "After a refresh, a PivotTable on the combined transactions shows row counts instead of sums for Amount, and the dates will not sort. What is the most likely cause?"
    options:
      - id: renamed
        text: "Columns were renamed before the Append step ran in the query"
      - id: dupes
        text: "Remove Duplicates deleted too many real payments"
      - id: join
        text: "The Chart of Accounts merge used a left outer join"
      - id: text-type
        text: "Amount and date columns were loaded as text, not typed"
    correctOptionIds: [text-type]
    explanation: "Values stored as text cannot be summed, sorted or related, so the PivotTable falls back to counting them. A wrong dedupe key would make totals too small, but it would not turn sums into counts, and a left outer join keeps rows rather than breaking number columns."
  - id: "3031b7bd-b602-470e-b150-3e59d1ec33fc"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two legitimate $99.00 PayPal payments from the same customer arrive on the same day. Which Remove Duplicates key keeps both?"
    options:
      - id: date-amount
        text: "Date plus Amount, because real duplicates always share both"
      - id: source-id
        text: "Source plus RawSourceID, the source's own transaction ID"
      - id: customer-amount
        text: "Customer plus Amount, because repeat buyers pay alike"
      - id: description-date
        text: "Description plus Date, because the text reveals repeats"
    correctOptionIds: [source-id]
    explanation: "Each source gives every transaction its own ID, so two separate payments have different IDs and both survive while a true re-import of the same row is removed. Date plus Amount is tempting because it looks like a duplicate, but it would delete one of the two real payments."
  - id: "feb7aa72-c76a-448a-b52b-7f1da04e6cbe"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your merge with the Chart of Accounts must keep every transaction in the load and let you spot any with no matching account. Which join kind do you choose?"
    options:
      - id: inner
        text: "Inner join, keeping only the rows that matched an account exactly"
      - id: anti
        text: "Left anti join, keeping only the rows that matched nothing"
      - id: left-outer
        text: "Left outer join, keeping every transaction even when unmatched"
      - id: right-outer
        text: "Right outer join, keeping every account even when unused"
    correctOptionIds: [left-outer]
    explanation: "A left outer join keeps all transactions and leaves nulls where the lookup failed, so you can filter for the nulls and fix them. An inner join is the tempting choice, but it silently drops the unmatched rows, which hides exactly the problems you need to see."
  - id: "553355d6-fc9a-4e6a-aa34-028ecb3afe1c"
    revision: 1
    status: active
    type: single-choice
    prompt: "You have finished cleaning the data and want a Total Revenue measure that PivotTables can use across related tables. Where do you define it?"
    options:
      - id: m-step
        text: "In the Power Query editor, as one more step written in M"
      - id: power-pivot
        text: "In Power Pivot, on tables loaded to the Data Model"
      - id: worksheet-cell
        text: "In a worksheet cell, as an ordinary Excel formula"
    correctOptionIds: [power-pivot]
    explanation: "DAX measures live in Power Pivot on top of the Data Model, which is why you load the queries there. M belongs to Power Query and reshapes data before load, so an M step cannot act as a measure that recalculates inside a PivotTable."
  - id: "71a1e362-ff40-4428-bfb8-c7bd4969ffb6"
    revision: 1
    status: active
    type: single-choice
    prompt: "An AI assistant drafts M code for your PayPal export and refers to a column called Transaction Number, but your file says Transaction ID. What do you do?"
    options:
      - id: fix-header
        text: "Correct it to your real header and re-prompt with exact headers"
      - id: rename-file
        text: "Keep it and rename the column in the CSV to match the code"
      - id: run-anyway
        text: "Run it, since a refresh error would reveal any real mistake"
      - id: guess-again
        text: "Ask the AI to guess again until the preview loads cleanly"
    correctOptionIds: [fix-header]
    explanation: "AI guesses column names from old documentation, so you give it your verbatim headers and fix the code to match the file you actually have. Waiting for a refresh error is the tempting shortcut, but a wrong type or classification can refresh successfully and still produce wrong totals."
  - id: "f15d33c1-021f-4d63-8c7a-e3fe1734cfd9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Your Chart of Accounts merge returns nulls for 12 rows. Which actions are sensible parts of the debugging process?"
    options:
      - id: filter-nulls
        text: "Filter to the null rows and compare their GL Hint values to account names"
      - id: type-in
        text: "Type the missing account numbers straight into the output table"
      - id: trim-step
        text: "Check for trailing spaces or case differences and add a Trim step"
      - id: inner-join
        text: "Switch to an inner join so the null rows leave the output"
      - id: add-account
        text: "Add the account to the Chart of Accounts if it is genuinely missing"
    correctOptionIds: [filter-nulls, trim-step, add-account]
    explanation: "You inspect the unmatched rows, fix near-misses such as spacing at the source, and add a real account only when it is missing. Typing numbers into the output feels quick, but the next refresh wipes them, and an inner join only hides the unmatched rows."
  - id: "2dd02ee2-a31c-4531-8aef-5a06e344e11e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "You are using AI to draft M code for a financial pipeline. Which practices are sound guardrails?"
    options:
      - id: paste-headers
        text: "Paste your exact CSV header row into the prompt each time"
      - id: skip-types
        text: "Skip reviewing type changes when the preview looks right"
      - id: comment-source
        text: "Comment each generated query with its source file and date"
      - id: trust-names
        text: "Trust any function name the code uses if the query runs"
      - id: review-types
        text: "Read every type change line, especially currency columns"
    correctOptionIds: [paste-headers, comment-source, review-types]
    explanation: "Exact headers stop invented column names, a source comment lets someone re-verify later, and reading the type lines catches a currency column set to whole numbers. A query that previews cleanly can still be wrong, so a good-looking preview is not a reason to skip the type review."
  - id: "d867914b-fc56-4194-a77e-8393fb4e018d"
    revision: 1
    status: active
    type: true-false
    prompt: "When you append queries whose columns have different names, Power Query puts the mismatched columns side by side and does not raise an error."
    answer: true
    explanation: "Append matches columns by name, so a Net column in one query and an Amount column in another land in separate columns, each mostly empty. The tempting belief is that Power Query will warn you, but the table loads fine and the gap shows up later as missing totals."
  - id: "f65d247a-a9e9-40fe-8b94-c4c8125f8a23"
    revision: 1
    status: active
    type: free-recall
    prompt: "A teammate's duplicate removal on Date, Amount and Customer deleted two real $99.00 PayPal payments from one day. Explain what went wrong and how you would fix and protect the pipeline."
    sampleAnswer: "The key was wrong: same date, amount and customer describes legitimate repeat payments, not duplicates. The fix is to deduplicate on Source plus RawSourceID, the source system's own unique transaction ID, and change it in the query rather than patching the output. A row-count check before and after the dedupe step helps catch it next time."
    explanation: "A good answer names the wrong key and the safe key, and says to fix the query. The common slip is to restore the deleted rows by hand in the output, which the next refresh would overwrite."
  - id: "93c39578-1ea6-47a6-aa1d-363d24f7135a"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, describe how a monthly Power Query pipeline works from CSV files to a refreshable report, and what the mantra Fix the query, not the output means."
    sampleAnswer: "Power Query gets the files from a folder, shapes them by setting headers and types, cleaning text, standardizing columns, appending and merging with the Chart of Accounts, then loads them to the Data Model where Power Pivot measures feed a PivotTable. Next month you add new files and press Refresh All. Fixes belong in the query steps, because edits made in the output are overwritten at the next refresh."
    explanation: "A strong answer covers get, shape and load, mentions the Data Model and DAX, and explains why output edits are lost. The usual gap is describing the steps without saying why refreshing is the payoff."
```

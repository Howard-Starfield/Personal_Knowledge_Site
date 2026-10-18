---
id: "c67131b9-35b7-4c7a-911b-cc2310a2fee8"
title: "Python for Transaction Cleanup Question Bank"
description: "Practice questions for Python for Transaction Cleanup."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study; every figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "c4169ae8-34f1-455f-bd7e-d24c3d825f2d"
    revision: 2
    status: active
    type: single-choice
    prompt: "The bank export has a row \"Stripe Payout MAR16\" for +8400.00, and no vendor rule matches it. Which category does categorize() return?"
    options:
      - id: review
        text: "Uncategorized deposit — REVIEW, so a person decides what it is"
      - id: revenue
        text: "Revenue, since the amount is positive and no rule matched it"
      - id: software
        text: "Software & Subscriptions, since Stripe is a software company"
    correctOptionIds: [review]
    explanation: "categorize() looks the vendor up in CATEGORY_MAP, and an unmatched positive row goes to the deposit review bucket instead of Revenue. Revenue is the tempting answer, but a payout is a transfer of sales already recorded from Stripe's export, so booking it as revenue would count those sales twice."
  - id: "b935a5d4-ca27-4c1a-9c47-acab6f39dfb5"
    revision: 1
    status: active
    type: single-choice
    prompt: "The summary tab shows $0 for the Amazon category, yet raw Amazon charges exist. In process_source, what should you confirm first?"
    options:
      - id: dates
        text: "That the date column was converted before grouping"
      - id: sorting
        text: "That the register was sorted by date before it is grouped"
      - id: encoding
        text: "That the bank file was read with the utf-8 encoding"
      - id: order
        text: "That normalize_vendor runs before categorize is called"
    correctOptionIds: [order]
    explanation: "CATEGORY_MAP is keyed by canonical names such as Amazon, so categorizing a raw string like AMZN MKTP US*2H3K9 finds no key. The vendor column must be normalized first. Sorting or date conversion would not change which category a row receives."
  - id: "f2195318-0b9a-44f2-b233-4a6be7c7b9cd"
    revision: 1
    status: active
    type: single-choice
    prompt: "register[\"amount\"].sum() returns 12,847.22 but the bank total is 48,200.00. What do you check first?"
    options:
      - id: dtypes
        text: "df.dtypes, to see whether amount was read as text"
      - id: map
        text: "CATEGORY_MAP, to see whether a category is missing"
      - id: sort
        text: "The sort order, to see whether rows were dropped"
      - id: nat
        text: "The date column, to see whether it holds any NaT"
    correctOptionIds: [dtypes]
    explanation: "One stray entry such as a dash or N/A can make pandas read the whole amount column as object (text), which makes a sum unreliable or raises an error. Find the offending row before doing any math. A missing category or a NaT date does not change a plain sum of the amount column."
  - id: "d0a1f1db-59b0-4d85-b730-5a5b450c9150"
    revision: 1
    status: active
    type: single-choice
    prompt: "A bank row reads AMZN MKTP US*2H3K9 AMZN.COM/BIL WA. Which approach also catches Amazon.com*M14B2 and maps both to Amazon?"
    options:
      - id: equals
        text: "An exact equality test against the word Amazon"
      - id: split
        text: "Splitting the string on spaces and keeping token one"
      - id: regex
        text: "A case-insensitive regex with word boundaries"
      - id: lookup
        text: "A lookup of the full raw string in a dictionary"
    correctOptionIds: [regex]
    explanation: "A pattern such as \\bamzn|\\bamazon\\b with the ignore-case flag matches the stable part of both strings and ignores the changing reference suffix. Exact equality misses nearly every real variant, and a dictionary of full raw strings breaks whenever a new suffix like *2H3K9 appears."
  - id: "7cce4287-a86c-4651-8967-45fc907e5821"
    revision: 1
    status: active
    type: single-choice
    prompt: "Finance renames the Utilities category to Telecom and Utilities. Which part of transaction_cleaner.py needs to change?"
    options:
      - id: vendor-rules
        text: "The regex patterns listed inside VENDOR_RULES"
      - id: category-map
        text: "The category values listed in CATEGORY_MAP"
      - id: rename-maps
        text: "The column names listed in the rename maps"
      - id: fallback
        text: "The fallback return in normalize_vendor"
    correctOptionIds: [category-map]
    explanation: "Vendor normalization and categorization are separate jobs, so a category rename only touches the values in CATEGORY_MAP, such as the Verizon entry. The regex rules turn raw strings into vendor names and never mention category names."
  - id: "3211a7fe-020e-4517-9537-cf49d5ac1521"
    revision: 1
    status: active
    type: single-choice
    prompt: "Reading the bank CSV with encoding=\"utf-8\" raises UnicodeDecodeError, and the chapter says this bank exports Windows-1252. What do you do?"
    options:
      - id: skip-bytes
        text: "Add an errors setting so the bad bytes are skipped"
      - id: retype
        text: "Retype the vendor names that look garbled by hand"
      - id: cp1252
        text: "Set encoding to cp1252 explicitly in the read function"
      - id: strip-chars
        text: "Strip the non-letter characters before reading the file"
    correctOptionIds: [cp1252]
    explanation: "Naming the file's real encoding fixes the crash and prevents garbled characters from silently corrupting vendor strings. Skipping bad bytes would hide the damage instead of repairing it, and the corrupted names would then fail your regex matching."
  - id: "02c0d436-4958-4e8f-aad0-372759855e92"
    revision: 1
    status: active
    type: single-choice
    prompt: "A script line reads df.rename(columns=rename_map) on its own, and the next line cannot find the vendor column. What is wrong?"
    options:
      - id: needs-copy
        text: "The DataFrame must be copied before rename can work"
      - id: lowercase
        text: "The rename only works after the columns are lowercased"
      - id: wrong-dtype
        text: "The vendor column has the wrong dtype for renaming"
      - id: not-assigned
        text: "The renamed copy was never assigned back to df"
    correctOptionIds: [not-assigned]
    explanation: "rename returns a new DataFrame, so unless you write df = df.rename(...), the original keeps its old column names. Copying first is not required, and a column's dtype has no effect on renaming its label."
  - id: "410606f2-57a4-4d22-9820-c4d32f7f2721"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Stripe renames created_at to created_utc in its export. Which places in the script mention the old name and need updating? Select every correct answer."
    options:
      - id: parse-dates
        text: "The parse_dates list inside read_stripe"
      - id: vendor-rules
        text: "The patterns inside VENDOR_RULES"
      - id: stripe-map
        text: "The key inside STRIPE_MAP"
      - id: category-map
        text: "The vendors inside CATEGORY_MAP"
      - id: summary
        text: "The groupby call that builds the summary"
    correctOptionIds: [parse-dates, stripe-map]
    explanation: "The old name appears twice: as the parse_dates column in read_stripe and as the key in STRIPE_MAP. Changing only the map is tempting because it feels like the whole job, but read_stripe would still ask for a column that no longer exists. The vendor rules, category map and summary never mention date column names."
  - id: "e8c5daf6-d40e-456b-99ff-19055f93d15c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "On close day, 12 of 745 transactions sit in Uncategorized — REVIEW. Which actions does the chapter recommend? Select every correct answer."
    options:
      - id: hand-categorize
        text: "Hand-categorize them this month so close is not blocked"
      - id: post-anyway
        text: "Post them as they are and tidy up in a later month"
      - id: add-rules
        text: "Add rules for any vendor that appeared more than once"
      - id: hide-bucket
        text: "Remove the bucket from the summary so totals look clean"
    correctOptionIds: [hand-categorize, add-rules]
    explanation: "Reviewing the bucket by hand keeps close moving, and adding rules for repeat vendors shrinks the bucket next month. Posting unreviewed rows or hiding the bucket just moves the uncertainty into the books, where it is harder to find."
  - id: "8c1ff0e3-2104-4d5d-aa2a-473062507efa"
    revision: 1
    status: active
    type: true-false
    prompt: "Once an AI-drafted pandas script runs without errors on the full file, it is safe to skip the 20-row dry run and the regex review."
    answer: false
    explanation: "A script that runs without errors can still categorize rows wrongly, and the chapter singles out regex as where AI-written code most often hides silent bugs. Run the draft on a small sample, inspect every output column, and read each pattern before trusting the full file."
  - id: "846dae01-e737-425e-8827-43c70d371205"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how transaction_cleaner.py turns three messy exports into one register your senior can review, and why vendor normalization and categorization are separate steps."
    sampleAnswer: "The script reads each export with an explicit encoding and date parsing, renames the columns to date, vendor and amount, and stacks the three into one table. Vendor normalization uses regex rules to collapse variants such as AMZN MKTP and Amazon.com into one name, and a separate dictionary maps each vendor to a category. It then groups totals by category, writes a multi-tab Excel file, and a person reviews the Uncategorized bucket. The two steps are separate because the list of vendor spellings and the chart of accounts change independently."
    explanation: "A strong answer covers read, reshape and review in order, and names both the regex rules and the category dictionary. The separation point matters most: you can add a vendor spelling without touching categories, or rename a category without touching any regex."
  - id: "9ddaa767-a637-47b0-8fbb-a15db29cc8f2"
    revision: 1
    status: active
    type: free-recall
    prompt: "On close day the script prints a warning that 3 rows have unparseable dates. What do you do next, and why?"
    sampleAnswer: "I would not post anything yet. I would find those rows in the raw CSV, look for a format change such as a day and month swap, and fix it in that source's read step or ask the data provider about the change. Then I would rerun and confirm the NaT count is zero, because rows with missing dates could land in a phantom period."
    explanation: "The key ideas are to stop before posting, trace the bad rows to the raw file, fix the cause, and confirm the count returns to zero. Using errors=coerce turns bad dates into NaT instead of crashing, so the warning count is your only signal."
```

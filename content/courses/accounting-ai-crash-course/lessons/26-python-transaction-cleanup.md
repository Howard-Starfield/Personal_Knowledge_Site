---
id: "8771af9a-f1ec-4117-b552-3e8fdc7cae3d"
title: "Python for Transaction Cleanup"
description: "Use pandas to turn three messy payment-processor exports into one categorized register that a senior can review."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
  - python
  - data-cleaning
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 26
estimatedMinutes: 45
---

## Why this matters

A large share of an entry-level accounting day goes to reformatting: renaming columns, fixing dates, mapping hundreds of vendor spellings to a few real vendors. Each manual step is a place for a tired person to slip on close day. At BoBo Digital Services LLC (a fictional company), a prior bookkeeper spent 11 hours on this work, and three Amazon charges still landed in Software instead of Office Supplies because one spelling was missed. A short, reviewable script does the same work the same way every month, so your time moves from retyping to reviewing.

## What you'll be able to do

- Explain what a DataFrame, Series, dtype and vectorized operation are in pandas.
- Build a reader for each of three exports that sets encoding and date parsing explicitly.
- Write regex vendor rules and a separate category dictionary, and say why they are kept apart.
- Diagnose three common failures: text-typed amounts, unassigned renames and wrong rule order.
- Decide what to do with rows that land in the review bucket, and how to use AI drafts safely.

## Before you start

Recall these ideas before reading on, without looking anything up:

- Why do a processor's gross sales, fees and net payout have to be treated as separate numbers?
- What does a bank reconciliation compare, and why is a clean, consistent transaction list useful for it?
- What does "no document, no entry" mean for anything you post?

Link back to the dashboard lesson if you need a refresher on the monthly reporting flow: [[courses/accounting-ai-crash-course/lessons/25-power-bi-dashboard|Previous lesson]].

## Step 1 — Think of pandas as a spreadsheet engine

**In plain language.** For cleanup work, Python is a calculator that can read a CSV file, find and replace in bulk, group, and write a new file. You do not need advanced programming ideas for this. The free library **pandas** (imported as `pd`) gives Python a table that lives in memory.

**Analogy.** A DataFrame is a spreadsheet without gridlines, where the formula bar is replaced by lines of code. You change a whole column in one statement instead of dragging a formula down 400 rows.

**The rules and terms.**

- A **DataFrame** is a two-dimensional table with named columns and an index.
- A **Series** is one column of a DataFrame.
- A **dtype** is the column's data type, such as `int64`, `float64`, `object` (text or mixed) or `datetime64[ns]`. A wrong dtype means wrong behavior.
- **Vectorization** means operating on a whole column at once rather than looping row by row.
- **groupby** splits a table into buckets by a column and calculates per bucket, much like an Excel pivot table.

Every cleanup script follows the same recipe: read the raw file, standardize column names, parse dates, normalize vendors, categorize, group and total, then save a clean file.

**Worked example.** BoBo has three March exports:

| Source | Date column | Date style | Amount column |
|---|---|---|---|
| Stripe | `created_at` | `2026-03-15 14:22:08 UTC` | `net` |
| PayPal | `Date` | `03/15/2026` | `Net` |
| Bank debit | `Posting Date` | `15-Mar-26` | `Amount` |

The goal is one table with the columns `date`, `vendor`, `amount` and `source`.

> [!warning] Common mistake
> Looping over rows with `iterrows()` because it feels like Excel. Reach for the vectorized column operation first; it is shorter, faster and has fewer places for row-level bugs.

## Step 2 — Read each export safely

**In plain language.** Every source needs its own reader because each one names columns and writes dates differently. Be explicit about the file encoding too: some bank exports use Windows-1252 (`cp1252`) rather than UTF-8.

**Analogy.** Think of three creek beds feeding one clean river. Each creek needs its own filter before the water joins the river.

**The rules.**

- Pass `encoding` explicitly to `read_csv`. A wrong guess either raises `UnicodeDecodeError` or silently garbles characters in vendor names.
- Use `parse_dates` so pandas converts the date column while reading.
- After reading, rename columns to one standard set: `df = df.rename(columns=...)`. `rename` returns a new DataFrame, so it must be assigned back.
- With `pd.to_datetime(..., errors="coerce")`, unparseable dates become `NaT` (not-a-time) instead of crashing. That is only safe if you count the `NaT` rows afterwards.

**Worked example.**

```python
import pandas as pd
from pathlib import Path

RAW_DIR = Path("./raw")

def read_bank(path):
    df = pd.read_csv(path, encoding="cp1252", parse_dates=["Posting Date"])
    df["source"] = "Bank"
    return df

def clean_columns(df):
    df = df.copy()
    df.columns = (
        df.columns.str.strip().str.lower().str.replace(" ", "_", regex=False)
    )
    return df

BANK_MAP = {"posting_date": "date", "description": "vendor", "amount": "amount"}
```

After `clean_columns`, `Posting Date` becomes `posting_date`, and `BANK_MAP` renames it to `date`. Stripe and PayPal get their own maps (`created_at` to `date`, `description` or `name` to `vendor`, `net` to `amount`).

Later in the script, a guard checks the dates: `register["date"].isna().sum()` counts the bad ones, and the script prints a warning if the count is above zero.

> [!warning] Common mistake
> Writing `df.rename(columns=...)` without assigning the result. Nothing changes, and the next line fails to find the new column name.

```knowledge-quiz
schemaVersion: 1
quizId: "b0cd632a-6400-48ff-b950-c34f9bd552e8"
title: "Checkpoint: reading the exports"
questionBankId: "c67131b9-35b7-4c7a-911b-cc2310a2fee8"
questionIds:
  - "f2195318-0b9a-44f2-b233-4a6be7c7b9cd"
  - "3211a7fe-020e-4517-9537-cf49d5ac1521"
```

## Step 3 — Normalize vendors, then categorize

**In plain language.** Real vendor strings are messy: `AMZN MKTP US*2H3K9 AMZN.COM/BIL WA`, `Amazon.com*M14B2` and `AMAZON MKTPLACE PMTS` are all Amazon. First collapse each spelling to one canonical name. Then look the canonical name up in a dictionary to get its category.

**Analogy.** Normalization is sorting mail by sender. Categorization is deciding which filing cabinet each sender's mail belongs in. The senders and the cabinets change on different schedules, so you keep them separate.

**The rules.**

- A **regex** (pattern language) with `\b` word boundaries and a case-insensitive flag matches the stable part of a string and ignores changing suffixes.
- Rules are checked in order; the first match wins. If nothing matches, tidy the original string so it is at least consistent.
- `CATEGORY_MAP` is keyed by canonical vendor name. A vendor not in the map is never guessed: an unmatched deposit goes to `Uncategorized deposit — REVIEW` and an unmatched charge to `Uncategorized — REVIEW`. Positive rows are often payouts, owner contributions, loans, refunds or transfers, not revenue.
- Normalization must run before categorization, or the dictionary keys never match.

**Worked example.**

```python
import re

VENDOR_RULES = [
    (re.compile(r"\bamzn|\bamazon\b", re.IGNORECASE), "Amazon"),
    (re.compile(r"\bverizon\b", re.IGNORECASE), "Verizon"),
    (re.compile(r"\buber\b", re.IGNORECASE), "Uber"),
    (re.compile(r"\bzoom\b", re.IGNORECASE), "Zoom"),
]

CATEGORY_MAP = {
    "Amazon": "Office Supplies",
    "Verizon": "Utilities",
    "Uber": "Travel",
    "Zoom": "Software & Subscriptions",
}

def normalize_vendor(raw):
    if not isinstance(raw, str):
        return "UNKNOWN"
    s = raw.strip()
    for pattern, canonical in VENDOR_RULES:
        if pattern.search(s):
            return canonical
    return re.sub(r"\s+", " ", s).title()

def categorize(vendor, amount):
    if vendor in CATEGORY_MAP:
        return CATEGORY_MAP[vendor]
    if amount > 0:
        return "Uncategorized deposit — REVIEW"   # payout, transfer, loan... a person decides
    return "Uncategorized — REVIEW"
```

Run this on Roberto's eight sample bank rows. All three Amazon rows become Amazon and Office Supplies (47.82 + 23.41 + 91.04 = 162.27 out). Verizon (142.18) goes to Utilities, Uber (22.75) to Travel and Zoom (149.90) to Software and Subscriptions. The unknown 52.00 charge lands in the review bucket. The Stripe payout of +8,400.00 has no rule, so it lands in the deposit review bucket rather than being booked as revenue.

> [!warning] Common mistake
> Matching with `vendor == "Amazon"`. Real strings never equal the clean name, so most Amazon rows stay unmatched and the review bucket looks bigger than it should.

```knowledge-quiz
schemaVersion: 1
quizId: "a71130a9-7528-41b6-b955-e5a910355994"
title: "Checkpoint: vendor rules and categories"
questionBankId: "c67131b9-35b7-4c7a-911b-cc2310a2fee8"
questionIds:
  - "d0a1f1db-59b0-4d85-b730-5a5b450c9150"
  - "c4169ae8-34f1-455f-bd7e-d24c3d825f2d"
```

## Step 4 — Group, review and use AI with guardrails

**In plain language.** Once the three sources are stacked into one register, group by category for totals and export an Excel file with a `register` tab and a `summary_by_category` tab. The real work then shifts to your review of the exceptions.

**Analogy.** The script is a first-pass assistant who sorts the pile. You still check the pile marked "unsure" before anything is posted.

**The rules.**

- Stack with `pd.concat`, then use `groupby("category")` with `count` and `sum` for totals.
- A monthly routine: put the exports in `./raw`, run the script, open the output, review every row whose category ends in `REVIEW` (both `Uncategorized — REVIEW` charges and `Uncategorized deposit — REVIEW` deposits), add rules for vendors that repeat, and save a dated copy of the script.
- Hand-categorize unmatched rows this month so close is not blocked. Add rules for vendors that appear more than once so the bucket shrinks next month.
- Pandas can write `.xlsx` files through the `openpyxl` library; install it on any machine that runs the script.
- When AI drafts the code: paste the real column list rather than letting it guess, give it the header row and a few data rows, dry-run on about 20 rows, read every regex yourself, and save the prompt next to the script. AI replaces typing, not your accounting judgment.

**Worked example.** BoBo's March run produces 745 rows across the three sources. Suppose 12 land in the review bucket. You categorize those 12 by hand so Wednesday's deadline holds, then add rules for any vendor that appeared more than once. Next month the bucket is smaller.

If a source later renames a column, for example Stripe changes `created_at` to `created_utc`, update every place that names it: the `parse_dates` list in the Stripe reader and the key in `STRIPE_MAP`.

> [!warning] Common mistake
> Defaulting unmatched deposits to Revenue. A Stripe payout is money moving from the processor to the bank, and Stripe's own export already holds those sales, so booking the payout as revenue counts it twice. Owner contributions, loans and transfers are not revenue at all. Every unmatched deposit gets a human decision.

```knowledge-quiz
schemaVersion: 1
quizId: "86b27736-3447-4a31-b53e-9b6bbc19569b"
title: "Checkpoint: review and AI guardrails"
questionBankId: "c67131b9-35b7-4c7a-911b-cc2310a2fee8"
questionIds:
  - "e8c5daf6-d40e-456b-99ff-19055f93d15c"
  - "8c1ff0e3-2104-4d5d-aa2a-473062507efa"
```

## Try it

Roberto sends eight bank rows for March: AMZN MKTP US*2H3K9 (-47.82), VERIZON WIRELESS PMT (-142.18), Stripe Payout MAR16 (+8400.00), Amazon.com*M14B2 (-23.41), UBER TRIP 7XQ8K (-22.75), AMAZON MKTPLACE PMTS (-91.04), ZOOM.US (-149.90) and UNKNOWN VENDOR REF#1183 (-52.00). Using the functions from Step 3, write the steps that produce a categorized register, then predict the total for each category before you run anything.

> [!example]- Sample solution
> Read with `pd.read_csv(..., parse_dates=["Posting Date"])`, clean the column names, rename them to `date`, `vendor` and `amount`, then run `normalize_vendor` first and `categorize` second:
>
> ```python
> df["vendor"] = df["vendor"].apply(normalize_vendor)
> df["category"] = [categorize(v, a) for v, a in zip(df["vendor"], df["amount"])]
> print(df.groupby("category")["amount"].sum())
> ```
>
> Predicted totals: Office Supplies -162.27, Utilities -142.18, Travel -22.75, Software and Subscriptions -149.90, Uncategorized — REVIEW -52.00, Uncategorized deposit — REVIEW 8,400.00. A person identifies the unknown charge, and confirms the Stripe payout is a transfer of sales already recorded from Stripe's export, not new revenue.

## Key takeaways

- Read, reshape, review: the script handles the first two, you own the third.
- A DataFrame is an in-memory table; operate on whole columns, not rows.
- Set encoding and date parsing explicitly, and count `NaT` dates after parsing.
- Keep vendor regex rules separate from the category dictionary, and normalize first.
- Always assign the result of `rename`, and check `df.dtypes` when a sum looks wrong.
- Review the unmatched bucket every month, and treat AI-drafted code as a draft to test.

## Explain it back

In your own words, explain how `transaction_cleaner.py` turns three messy exports into one register your senior can review, and why vendor normalization and categorization are separate steps.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "5aa22eac-17d6-4968-b637-08560990acd4"
title: "Chapter quiz: Python for transaction cleanup"
questionBankId: "c67131b9-35b7-4c7a-911b-cc2310a2fee8"
questionIds:
  - "b935a5d4-ca27-4c1a-9c47-acab6f39dfb5"
  - "7cce4287-a86c-4651-8967-45fc907e5821"
  - "02c0d436-4958-4e8f-aad0-372759855e92"
  - "410606f2-57a4-4d22-9820-c4d32f7f2721"
  - "846dae01-e737-425e-8827-43c70d371205"
  - "9ddaa767-a637-47b0-8fbb-a15db29cc8f2"
```

Next: [[courses/accounting-ai-crash-course/lessons/27-python-reconciliation-engine|Next lesson]]

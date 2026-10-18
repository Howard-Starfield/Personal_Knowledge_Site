---
id: "680f74b6-6119-4e29-8f64-ff26aca03abe"
title: "Python Reconciliation Engine Question Bank"
description: "Practice questions for Python Reconciliation Engine."
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
  - id: "94791caa-767e-4e7e-a08b-47f8962a64cc"
    revision: 1
    status: active
    type: single-choice
    prompt: "A teammate reorders BoBo's engine so fuzzy description matching runs before exact amount-and-date matching. What is the main risk?"
    options:
      - id: same-result
        text: "Nothing changes, because every tier reaches the same pairs"
      - id: steals-row
        text: "A loose tier can claim a row that had a clean exact pair"
      - id: slower-only
        text: "The run only takes longer, since results stay identical"
      - id: split-blocked
        text: "Tier 5 can no longer run, because it needs fuzzy output first"
    correctOptionIds: [steals-row]
    explanation: "Each tier works on the leftovers of the tier before it, so a loose rule that runs early can pair a row with the wrong partner and leave its true exact match stranded as an exception. The idea that every order gives the same pairs is tempting, but a row can only be matched once, so the first rule to claim it wins."
  - id: "005fecba-19e2-4e16-8ebc-c2939fe12d32"
    revision: 1
    status: active
    type: single-choice
    prompt: "The bank shows $1,000.00 on April 3 and the books show $1,000.00 on April 6, with no reference numbers. The engine uses a three-day window. Which tier matches them?"
    options:
      - id: tier-1
        text: "Tier 1, because the two amounts are exactly identical"
      - id: tier-4
        text: "Tier 4, because the descriptions probably look similar"
      - id: tier-5
        text: "Tier 5, because the dates are three days apart"
      - id: tier-2
        text: "Tier 2, because the gap is within the three-day window"
    correctOptionIds: [tier-2]
    explanation: "The amounts agree and the dates differ by exactly three days, which the plus-or-minus three-day window allows, so Tier 2 matches the pair. Tier 1 requires the same date as well as the same amount, so the identical amounts alone are not enough."
  - id: "497c698e-28c8-4c6a-8220-23d9a3929dbe"
    revision: 1
    status: active
    type: single-choice
    prompt: "The bank shows -$427.18 with reference CHK1042 and the books show -$427.20 with reference CHK1042, both on April 5. Which tier matches them?"
    options:
      - id: tier-3
        text: "Tier 3, because the shared reference joins them"
      - id: round-away
        text: "Tier 1, because 2 cents is small enough to round away"
      - id: tier-2-window
        text: "Tier 2, because the date gap is within the window"
      - id: tier-5-sum
        text: "Tier 5, because the amounts differ by a small total"
    correctOptionIds: [tier-3]
    explanation: "Tier 3 joins rows on a shared non-empty reference and records the 2 cent amount difference for review. Tier 2 is tempting because the dates agree, but it still requires identical amounts, and the engine rounds to cents without any tolerance, so a 2 cent gap breaks the exact comparison."
  - id: "6eb5f74e-09ab-4b0d-b78b-0f09adfab5ca"
    revision: 1
    status: active
    type: single-choice
    prompt: "At a threshold of 70 the fuzzy tier pairs a $1,200 electric bill with a $1,200 office supplies payment at a score of 78. What is the best fix?"
    options:
      - id: lower-60
        text: "Lower the threshold to 60 so more rows match"
      - id: drop-amount
        text: "Remove the amount tolerance so only text decides"
      - id: raise-85
        text: "Raise the threshold to 85 and keep the amount check"
      - id: accept-78
        text: "Accept the match, since a score of 78 is a passing grade"
    correctOptionIds: [raise-85]
    explanation: "A higher threshold demands more similar descriptions, and the amount check adds a second safeguard, so two unrelated vendors no longer pair up. Lowering the threshold looks like it finds more matches, but those extra matches are the false positives that cause the problem."
  - id: "79a5c2ff-404e-4925-aabb-ff66703ff58b"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $18,427.66 Stripe payout lands on April 8. The books hold sales of $7,200.00, $6,000.00 and $5,790.00 plus a -$562.34 fee row, all dated April 4 to 6. Which tier matches them?"
    options:
      - id: tier-2-all
        text: "Tier 2, because every row is within three days"
      - id: tier-5-split
        text: "Tier 5, because four book rows sum to one bank row"
      - id: tier-3-name
        text: "Tier 3, because all four rows share the Stripe name"
      - id: tier-4-desc
        text: "Tier 4, because the descriptions all mention Stripe"
    correctOptionIds: [tier-5-split]
    explanation: "The three sales total $18,990.00 and the fee brings that to $18,427.66, so one bank row equals the sum of four book rows. That is a split match. Tier 4 is tempting because the descriptions mention Stripe, but it also requires a single book row whose amount is close to the bank amount."
  - id: "bb2d9076-95e2-4932-a62c-024a6217b5b8"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's bank CSV has separate positive debit and credit columns, while the book CSV already uses one signed amount. What should the load step do?"
    options:
      - id: absolute-value
        text: "Match on absolute value so the sign never matters"
      - id: two-columns
        text: "Leave both columns and match each on its own"
      - id: flip-book
        text: "Flip the sign of the book side when totals differ"
      - id: signed-amount
        text: "Fold debits and credits into one signed amount"
    correctOptionIds: [signed-amount]
    explanation: "Deposits must be positive and withdrawals negative on both sides before any tier runs, otherwise nothing warns you when a deposit pairs with an expense. Matching on absolute value hides the problem instead of fixing it, because a $500 deposit would then pair with a $500 withdrawal."
  - id: "bd6fa8b4-f364-4924-9597-3ba9a0f231e7"
    revision: 1
    status: active
    type: single-choice
    prompt: "The bank exports 04/05/2026 meaning April 5, and the book system exports the same text meaning May 4. The loader relies on auto-detection. What is the right fix?"
    options:
      - id: explicit-format
        text: "Pass an explicit format to the date parser and log failures"
      - id: trust-auto
        text: "Trust auto-detection, because both files show identical text"
      - id: widen-window
        text: "Widen the date window until the two dates fall inside it"
      - id: drop-date
        text: "Drop the date from the match and rely on amount alone"
    correctOptionIds: [explicit-format]
    explanation: "Naming the format removes the guesswork, and logging rows that fail to parse shows you problems instead of hiding them. Widening the window to cover a month-long gap is tempting, but it would loosen every tier and let wrong rows match."
  - id: "85c8693d-426a-4029-97c4-ef90d05f8b4f"
    revision: 2
    status: active
    type: multiple-select
    prompt: "A teammate wants to use AI to speed up exception review. Which guardrails should apply? Select every correct answer."
    options:
      - id: suggest-only
        text: "Let AI suggest a likely category for each exception"
      - id: cite-rows
        text: "Require explanations to cite real bank and book row IDs"
      - id: auto-post
        text: "Let AI post journal entries for exceptions it is sure about"
      - id: random-tie
        text: "Break ties between equal candidates at random each run"
      - id: skip-review
        text: "Skip human review for items the AI labels as timing items"
    correctOptionIds: [suggest-only, cite-rows]
    explanation: "AI may suggest a category and must point to real source rows, but a person decides every exception and posts every journal. Random tie-breaking is tempting as a quick fix, but a tie means the evidence cannot tell the candidates apart, so tied candidates go to exceptions for a person to decide."
  - id: "4cad73e3-3644-47de-b0ee-8e847052bd1c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about the split-match tier are true? Select every correct answer."
    options:
      - id: cap-group
        text: "Capping group size keeps the combinations manageable"
      - id: prefilter-dates
        text: "Pre-filtering by date window shrinks the candidate pool"
      - id: unlimited-group
        text: "Group size can be unlimited because combinations stay small"
      - id: runs-first
        text: "It should run first, since it handles the largest amounts"
      - id: one-to-one
        text: "It matches one bank row to exactly one book row"
    correctOptionIds: [cap-group, prefilter-dates]
    explanation: "The number of combinations explodes as the pool and the group size grow, so the engine caps the group size and narrows the pool by date first. Running it first is a tempting idea because the amounts are large, but split matching is the loosest tier and belongs last."
  - id: "66071aef-41e6-4d01-80e5-130cb8ffcf7a"
    revision: 1
    status: active
    type: true-false
    prompt: "If exceptions.csv still holds 14 items after a run, the engine has failed."
    answer: false
    explanation: "Exceptions are the point of the engine, because they are the short list a human must investigate, such as timing items, unrecorded fees or duplicates. The warning sign is a sudden jump, for example from 14 to 73, which means something changed and needs investigating before you continue."
  - id: "b4ee306a-2c96-42c1-88c6-0f3e19546ef1"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how the five-tier reconciliation engine works and why the tier order matters, using the BoBo Stripe payout as an example."
    sampleAnswer: "The engine loads the bank and book CSVs, normalizes dates, signs and text, then runs five tiers from strictest to loosest: exact amount and date, a date window, a shared reference, fuzzy description, and finally split matching. Each tier marks rows as matched so later tiers never reuse them, which is why the order matters: a loose rule must not steal a row that had a clean pair. The BoBo Stripe payout of $18,427.66 matches no single book row, so it falls through to the split tier, where three sales and a fee row sum to the deposit. Anything left over goes to exceptions.csv for a person to review."
    explanation: "A strong answer names all five tiers in order, explains the mark-once rule and why strict tiers go first, and uses the payout to show why a split tier exists. It also ends with human review of the leftovers instead of claiming the engine matches everything."
  - id: "0bc10398-80a9-4cd5-b62d-138b9c259f81"
    revision: 1
    status: active
    type: free-recall
    prompt: "A hiring manager asks how you would honestly describe this project and what you would change before using it in production. Answer in four or five sentences."
    sampleAnswer: "I built a reconciliation prototype in Python with pandas and rapidfuzz, and I ran it on sample data for a fictional company, so it is not deployed in production. I would say it is designed to reduce manual matching, not quote a time saving I never measured. Before production I would add tests for the sign convention and date parsing, keep a persistent audit log of every match, require approval for fuzzy matches, and benchmark the split tier on real volumes. Production tools typically carry stronger controls than this prototype, and I would say so openly."
    explanation: "A strong answer states plainly that this is a sample-data prototype, avoids a hard before-and-after number it cannot defend, and names concrete improvements such as tests, a persisted audit trail, fuzzy-match approval and a split-tier benchmark."
```

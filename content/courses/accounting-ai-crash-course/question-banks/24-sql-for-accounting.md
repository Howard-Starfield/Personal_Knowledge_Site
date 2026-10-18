---
id: "781daeae-a649-4382-95ba-45440f8ceb67"
title: "SQL for Accounting Data Question Bank"
description: "Practice questions for SQL for Accounting Data."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC schema; every figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "78669a18-a925-420d-8e7b-2fbb50d27fb6"
    revision: 1
    status: active
    type: single-choice
    prompt: "In BoBo's schema, the invoices table has a customer_id column whose values come from customers.customer_id. What kind of column is invoices.customer_id?"
    options:
      - id: primary-key
        text: "A primary key, because each invoice row needs a unique value"
      - id: foreign-key
        text: "A foreign key, because it points to a row in another table"
      - id: aggregate
        text: "An aggregate, because it summarizes many invoices per customer"
    correctOptionIds: [foreign-key]
    explanation: "A foreign key holds the primary key value of a row in another table, which is how invoices link to customers and how a JOIN knows what to match. It is not the primary key, because many invoices can share one customer_id while invoice_id is the value that stays unique."
  - id: "6458a848-e052-4023-86b7-5d9254979a30"
    revision: 1
    status: active
    type: single-choice
    prompt: "You want only the vendors whose total April bills exceed $5,000. Where does the 5,000 test belong in the query?"
    options:
      - id: where-clause
        text: "In WHERE, because it filters rows before they are grouped"
      - id: order-by
        text: "In ORDER BY, because it ranks vendors from highest to lowest"
      - id: having-clause
        text: "In HAVING, because it filters groups after SUM runs"
    correctOptionIds: [having-clause]
    explanation: "A vendor total exists only after GROUP BY has run SUM, so a test on that total must use HAVING. WHERE is tempting, but it runs before grouping and would test individual bills, not each vendor's total."
  - id: "c1148b32-adc0-4b8e-9594-7007189cde8c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your trial balance query LEFT JOINs chart_of_accounts to transactions, then adds WHERE t.txn_date is on or before the close date. An account with no activity disappears. Why?"
    options:
      - id: null-filtered
        text: "Its unmatched row has a NULL date, so WHERE removes it"
      - id: left-join-rule
        text: "A LEFT JOIN only keeps accounts that have a matching transaction"
      - id: zero-dropped
        text: "GROUP BY drops any account whose debits and credits sum to zero"
    correctOptionIds: [null-filtered]
    explanation: "With no transactions, the joined row has NULL in txn_date, and a date test against NULL is not true, so WHERE removes the row and quietly turns the LEFT JOIN into an inner join. The fix is to move the date test into the ON clause. The belief that LEFT JOIN requires a match is the opposite of what it does."
  - id: "32837cc2-a80f-4952-88e1-8fcc2d972ef4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about NULL in BoBo's transactions table are correct? Select every correct answer."
    options:
      - id: is-null-test
        text: "IS NULL finds rows where account_id is missing"
      - id: equals-null
        text: "account_id = NULL returns the rows with no account"
      - id: count-star
        text: "COUNT(*) counts a row even if some columns are NULL"
      - id: count-column
        text: "COUNT(account_id) counts rows where account_id is NULL"
    correctOptionIds: [is-null-test, count-star]
    explanation: "NULL means unknown, so IS NULL is the only reliable test and COUNT(*) counts every row. Writing = NULL is tempting because it reads naturally, but the comparison is never true, so it returns zero rows; COUNT on a column skips its NULLs."
  - id: "44f7530a-aadf-4a0f-bfeb-458938fc48ae"
    revision: 1
    status: active
    type: single-choice
    prompt: "An AI assistant drafts a query that sums transactions.amount, but BoBo's schema only has debit and credit columns. What should you do first?"
    options:
      - id: rename-column
        text: "Add an amount column to the table so the query runs as written"
      - id: dry-run-only
        text: "Run it with LIMIT 100 to see whether the database accepts it"
      - id: reject-reprompt
        text: "Reject the draft and re-prompt with the real schema text"
    correctOptionIds: [reject-reprompt]
    explanation: "A column that is not in the schema is a hallucination, so the draft is rejected and the AI is asked again with the actual CREATE TABLE statements. Changing the database to fit the AI reverses the order of authority, and a LIMIT dry-run only helps after the query is grounded in the real schema."
  - id: "ac6f4159-71b9-4b0b-8c46-c1439c33bbd6"
    revision: 1
    status: active
    type: true-false
    prompt: "If SUM(total_debits) minus SUM(total_credits) from your trial balance query equals zero, the ledger is proven free of errors and fraud."
    answer: false
    explanation: "A zero difference shows only that total debits equal total credits. A wrong account, a wrong period, a duplicated bill or a fraudulent but balanced entry would still produce zero."
  - id: "4f70ad2e-3a9f-4f19-b321-878e64c42857"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the chapter's AR aging query, an open invoice has a due date of 2026-03-01 and today is 2026-05-16, which is 76 days later. Which bucket does it land in?"
    options:
      - id: bucket-three
        text: "Bucket 3, the 31-60 days past due group"
      - id: bucket-four
        text: "Bucket 4, the 61-90 days past due"
      - id: bucket-five
        text: "Bucket 5, the 90+ days past due group"
    correctOptionIds: [bucket-four]
    explanation: "The query measures days past the due date, and 76 is greater than 60 but not greater than 90, so the CASE WHEN falls through to the 61-90 branch. Bucket 5 is tempting because the invoice feels old, but 90+ needs more than 90 days past due."
  - id: "dc64becb-156f-4c8e-9cca-c4b31c024a3e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your duplicate-bill query flags Upwork with two $950.00 bills dated 2026-03-15, numbered UPW-3471 and UPW-3472. What is the right next step?"
    options:
      - id: review-both
        text: "Review both bills, since the query only surfaces candidates"
      - id: void-later
        text: "Void the later bill, since identical amounts prove a duplicate"
      - id: ignore-flag
        text: "Ignore the flag, since different numbers prove both are real"
    correctOptionIds: [review-both]
    explanation: "The query groups on vendor, date and amount, so a match is a candidate that a person must check against the source documents. Two real bills can share an amount, and one data-entry error can carry a new number, so neither voiding nor ignoring is justified without review."
  - id: "7f20e2e6-46c9-4f15-9ec9-8a4cdfdbe34a"
    revision: 1
    status: active
    type: single-choice
    prompt: "In one month a Revenue account has credits of 60,000 and a refund posted as a debit of 1,600. What should the monthly revenue query return?"
    options:
      - id: sum-both
        text: "61,600, adding the refund as extra revenue activity"
      - id: debits-only
        text: "1,600, the debit side, which holds the refund amount"
      - id: credits-only
        text: "60,000, the credit side, ignoring debits for revenue"
      - id: net-credit
        text: "58,400, credits minus debits, as revenue is credit-normal"
    correctOptionIds: [net-credit]
    explanation: "Revenue accounts are credit-normal, so net revenue is SUM(credit - debit) and the refund reduces it to 58,400. Using credits alone is tempting but overstates revenue, because it ignores reversals that hit the debit side."
  - id: "06651f90-8fa8-45a5-842e-c96b2242a617"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which habits make AI-drafted SQL safe to use on accounting data? Select every correct answer."
    options:
      - id: paste-schema
        text: "Paste the real CREATE TABLE text into every prompt"
      - id: dry-run-limit
        text: "Dry-run with LIMIT 100 before running at full scale"
      - id: syntax-trust
        text: "Skip review when the query runs without a syntax error"
      - id: audit-header
        text: "Save the prompt, draft and reviewer in a header comment"
      - id: direct-update
        text: "Run AI-drafted UPDATE statements straight on production"
    correctOptionIds: [paste-schema, dry-run-limit, audit-header]
    explanation: "Grounding the prompt in the schema, previewing results with LIMIT and keeping an audit trail are the chapter's guardrails. A query that runs can still be wrong, so syntax success is not review, and running AI-written UPDATE or DELETE statements without a second person is the riskiest step of all."
  - id: "4344377a-465d-4376-9ad9-19e8531ae23d"
    revision: 1
    status: active
    type: free-recall
    prompt: "Marcus asks for every manual journal entry of $5,000 or more posted in the last two days of the quarter. Describe the query you would write: tables, filters and why it is useful."
    sampleAnswer: "I would select from the transactions table and JOIN chart_of_accounts to show the account name. The WHERE clause keeps source equal to Manual, txn_date between the last two days of the quarter, and the larger of debit and credit at 5,000 or more, then I would order by amount descending. It is useful because manual entries near close are a standard audit flag, and the output shows who posted what and when so the controller can review it. The query surfaces candidates only; a person judges them."
    explanation: "A strong answer names the table and the join, the three filters (source, date window, amount threshold) and the reason this exception report matters. It should also make clear that SQL surfaces entries for review and does not decide whether they are wrong."
  - id: "4ad7024c-9b31-4fac-a9cb-562fed1ce564"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain how an accountant uses SQL to answer \"Who owes us money?\" Cover the tables and keys involved, the clauses you would use, and one trap to avoid."
    sampleAnswer: "The invoices table holds what customers owe, and customer_id is a foreign key to the customers table, so I JOIN them to show names. I filter to open invoices with a remaining balance using WHERE on status and total minus amount_paid, group by customer or by an aging bucket built with CASE WHEN, and SUM the open balance. A trap to avoid is writing = NULL instead of IS NULL, or using an inner join that silently drops rows. I would also dry-run with LIMIT and review the result before sending it to anyone."
    explanation: "A strong answer links tables through the key, names the clause roles (WHERE filters rows, GROUP BY and SUM summarize), and names a real trap such as NULL handling or a join that drops rows. Mentioning review before sharing shows the audit mindset the chapter stresses."
```

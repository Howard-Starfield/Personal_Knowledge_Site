---
id: "510bd21f-6202-42b6-bfcc-fb5521b869c4"
title: "Income Statement Deep Dive Question Bank"
description: "Practice questions for Income Statement Deep Dive."
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
  - id: "baf2ec79-beb8-4bff-a4df-997cc4d1f69f"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo refunds a client $500 for an unsatisfactory logo. Where does the refund belong on the income statement?"
    options:
      - id: ga-expense
        text: "A general and administrative expense below the gross profit line"
      - id: contra-revenue
        text: "A contra-revenue deduction that lowers gross to net revenue"
      - id: cost-of-services
        text: "A cost of services line that lowers gross profit directly"
      - id: other-expense
        text: "An other expense line that sits below operating income"
    correctOptionIds: [contra-revenue]
    explanation: "A refund gives back part of the sale, so it is booked to Refunds & Allowances (4900), a contra-revenue account that turns gross revenue into net revenue. Booking it as an operating expense is tempting because money left the business, but that would leave gross margin looking better than it really is."
  - id: "ae305af7-b90e-42ad-9bd8-4c1c103d4455"
    revision: 1
    status: active
    type: single-choice
    prompt: "A $1,000 Stripe sale for invoice 1042 deposits $970 after a $30 processing fee. Which entry follows the gross method?"
    options:
      - id: net-only
        text: "Debit Cash 970 and credit Service Revenue 970 for the net deposit"
      - id: bank-fees
        text: "Debit Cash 970 and Bank Fees 30, credit Service Revenue 1,000"
      - id: gross-method
        text: "Debit Cash 970 and Stripe Processing Fees 30, credit Service Revenue 1,000"
      - id: fee-unrecorded
        text: "Debit Cash 1,000 and credit Service Revenue 1,000, leaving the fee unrecorded"
    correctOptionIds: [gross-method]
    explanation: "The client paid $1,000, so revenue is $1,000 and the $30 fee is its own cost of services line (Stripe Processing Fees, 5030). Booking only the $970 deposit hides both the true top line and the cost of using Stripe, while putting the fee in Bank Fees moves a cost that BoBo's chart of accounts treats as cost of services into operating expenses."
  - id: "1e058e90-8eeb-4460-85f6-3957e5ed49a6"
    revision: 1
    status: active
    type: single-choice
    prompt: "April net revenue was $46,380 and cost of services was $13,000. What is the gross margin?"
    options:
      - id: correct-margin
        text: "72.0%, found by dividing gross profit by net revenue"
      - id: gross-base
        text: "69.3%, found by dividing gross profit by gross revenue"
      - id: cost-ratio
        text: "28.0%, found by dividing cost of services by net revenue"
    correctOptionIds: [correct-margin]
    explanation: "Gross profit is $46,380 minus $13,000, or $33,380, and dividing by net revenue gives 72.0%. Dividing by gross revenue of $48,200 gives 69.3%, which ignores the refunds already taken out, and 28.0% is the cost ratio rather than the margin."
  - id: "46eb2149-952b-46d9-9cea-f176858c6537"
    revision: 1
    status: active
    type: single-choice
    prompt: "From March to April BoBo's net revenue rose 14.3% but gross profit rose only 12.1%, and gross margin slipped from 73.4% to 72.0%. Which line best explains the squeeze?"
    options:
      - id: opex-faster
        text: "Operating expenses rose, which reduces gross profit directly"
      - id: interest-fell
        text: "Interest income on the business checking account fell"
      - id: bigger-draws
        text: "Owner draws were larger than they were in March"
      - id: contractor-cost
        text: "Contractor cost grew 30.6%, outpacing net revenue growth"
    correctOptionIds: [contractor-cost]
    explanation: "Contractor cost rose from $7,200 to $9,400, far faster than net revenue, so each sales dollar kept less after direct costs. Operating expenses sit below gross profit and cannot change gross margin, and interest income and owner draws are not part of gross profit at all."
  - id: "cb74654c-9b10-4454-8571-c979ae11ca9d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Jordan Lee edits a video for one client project and BoBo pays him $800 for that job. How should BoBo classify the $800?"
    options:
      - id: operating-expense
        text: "Operating expense, because he is not an employee"
      - id: direct-cost
        text: "Cost of services, because it is a direct cost of that sale"
      - id: other-expense
        text: "Other expense, because it is paid to a person outside the firm"
      - id: contra-revenue
        text: "Contra-revenue, because it reduces what the client paid"
    correctOptionIds: [direct-cost]
    explanation: "Work done for one specific sale is a direct cost, so it goes to Contractor Costs – Direct (5010) in cost of services. Being a contractor rather than an employee does not make the cost indirect, and moving it to operating expenses would make gross margin look better than it is."
  - id: "4554bdc8-859f-4fe8-852e-b1cb24bb2ed2"
    revision: 1
    status: active
    type: single-choice
    prompt: "Bo moves $3,000 from the business account to his personal account. How does this affect BoBo's income statement?"
    options:
      - id: opex-up
        text: "Operating expenses rise $3,000, so net income falls by that much"
      - id: other-expense
        text: "Other expense rises $3,000 below operating income"
      - id: no-change
        text: "It does not change; the equity account Owner Draws rises"
      - id: cost-up
        text: "Cost of services rises $3,000, so gross margin falls"
    correctOptionIds: [no-change]
    explanation: "BoBo is a single-member LLC, so money Bo takes out for himself is an Owner Draw (3020), which reduces equity and never touches profit. Treating it as an operating expense understates profit by $3,000 and misleads anyone reading the statement."
  - id: "e08490c9-b197-45c0-b797-bb4f39faf59c"
    revision: 1
    status: active
    type: single-choice
    prompt: "After April's revenue and expense accounts are closed, Income Summary shows a $22,665 credit balance. What clears it?"
    options:
      - id: to-retained
        text: "Debit Income Summary and credit Retained Earnings, 22,665"
      - id: reversed
        text: "Debit Retained Earnings and credit Income Summary, 22,665"
      - id: to-draws
        text: "Debit Income Summary and credit Owner Draws, 22,665"
      - id: to-cash
        text: "Debit Income Summary and credit Cash, 22,665"
    correctOptionIds: [to-retained]
    explanation: "A credit balance means revenue exceeded expenses, so debiting Income Summary brings it to zero and crediting Retained Earnings adds the profit to equity. Reversing the entry would reduce equity by the profit, and crediting Cash or Owner Draws confuses profit with money moving."
  - id: "6280ef10-c35a-445c-ae51-cc5e7e88cfae"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these belong in BoBo's cost of services? Select every correct answer."
    options:
      - id: stripe-fees
        text: "Stripe Processing Fees on client payments"
      - id: ebay-fees
        text: "eBay Final Value Fees on template sales"
      - id: quickbooks
        text: "QuickBooks Online monthly subscription"
      - id: stock-media
        text: "Licensed stock media bought for one client job"
      - id: google-ads
        text: "Google Ads spend to attract new clients"
    correctOptionIds: [stripe-fees, ebay-fees, stock-media]
    explanation: "Processing fees, marketplace fees and media licensed for one job all exist because a particular sale happened, so they belong in cost of services. QuickBooks and Google Ads are the cost of keeping the business open and winning work, so they stay in operating expenses even though they feel like real costs."
  - id: "36c232f8-b60a-4774-9911-94364f57e606"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A reviewer finds these items in a draft BoBo income statement. Which are errors to fix? Select every correct answer."
    options:
      - id: refund-opex
        text: "Refunds posted as an operating expense line"
      - id: net-deposit
        text: "Revenue booked at the net deposit, fee unrecorded"
      - id: interest-other
        text: "Interest income shown below operating income"
      - id: margin-net
        text: "Gross margin calculated using net revenue"
      - id: not-restated
        text: "Prior month not restated after a reclassification"
    correctOptionIds: [refund-opex, net-deposit, not-restated]
    explanation: "Refunds belong against revenue, revenue is booked gross with the fee as a separate cost, and months must be compared on the same basis or the variance means nothing. Interest income below operating income and a margin measured on net revenue are both the correct layout."
  - id: "70d7d1fb-2528-40a7-ab5d-4ce79540838d"
    revision: 1
    status: active
    type: true-false
    prompt: "If BoBo's revenue rises from one month to the next, its net income must rise too."
    answer: false
    explanation: "Revenue growth only becomes profit growth if costs do not grow faster. In April revenue grew 16.1% while gross margin fell, and a jump in refunds, contractor cost or operating expenses can leave profit flat or lower even on record sales."
  - id: "6ebc56cd-c097-4425-a678-1a3fc69941df"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain to a friend who is not an accountant why a business can have record revenue and still earn less profit than last month."
    sampleAnswer: "Revenue is only the top of the statement, the money customers agreed to pay. Before anything is left for the owner, refunds come out, then the direct cost of delivering the work such as contractors and processor fees, then the cost of running the business such as software and advertising. If any of those grow faster than sales, profit shrinks even while revenue grows. Gross margin shows this first, which is why revenue growth is not automatically profit growth."
    explanation: "A strong answer names the layers between revenue and profit and says that costs growing faster than sales is what shrinks profit. Mentioning gross margin as the early warning, and using a concrete cost such as contractors or processor fees, shows you can apply the idea."
  - id: "dfd0e5f9-b5b5-4dae-a567-ce474c9ccd02"
    revision: 1
    status: active
    type: free-recall
    prompt: "Bo asks, \"We billed $48,200 in April but I kept only $22,665. Where did the rest go?\" Walk down the income statement to answer."
    sampleAnswer: "Start with $48,200 of gross revenue and take out $1,820 of refunds to reach net revenue of $46,380. Cost of services of $13,000 for contractors, processor fees, eBay fees and media leaves gross profit of $33,380. Operating expenses of $10,750 leave operating income of $22,630, and $35 of interest income brings net income to $22,665. So $25,535 went to refunds, direct costs and the cost of running the business, less the small interest gain."
    explanation: "A strong answer follows the statement in order and gives a figure at each subtotal, so the $25,535 gap is traced to refunds, cost of services and operating expenses. Naming the subtotals correctly, and not calling net income revenue, shows you can explain the middle of the statement."
```

---
id: "a7b09d1c-caec-4116-8288-d02021ab9b42"
title: "Exercise Files: Building an Expense Submission Agent in Copilot Studio: Question Bank"
description: "Practice questions on the Contoso expense agent lab, covering the SharePoint schema, the receipt threshold, idempotency and the approval flow."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "fcc6b41f-6b81-4acb-9d11-99beb482fa0f"
comments: false
---

These questions practise [[courses/how-to-be-an-agent-boss/lessons/06-exercise-files|Exercise Files: Building an Expense Submission Agent in Copilot Studio]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "0b8f54f6-ed23-43a0-93c8-023fc02547a4"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lab's agent validates each claim against a receipt threshold in the Contoso policy. What does the lesson say about it?"
    options:
      - id: a
        text: "A receipt is required at $25.00 or above, because that is the breakfast allowance in the Contoso policy"
      - id: b
        text: "Under $75.00 a receipt is optional, and at $75.00 or above it is mandatory before the claim can be staged"
      - id: c
        text: "A receipt is required for every claim above $1.00, because the policy mirrors the IRS substantiation rule"
      - id: d
        text: "No receipt threshold applies, because the SharePoint list records the receipt link as an optional text column"
    correctOptionIds: [b]
    explanation: "Step 2 of the playbook splits the rule at $75.00: if the amount is under $75.00 the receipt is optional and the claim is marked substantiated without receipt, and if it is $75.00 or above the receipt is mandatory and the agent must prompt for a URL before it can proceed. A confuses the threshold with the $25.00 breakfast cap, and C and D both deny a rule the lesson states three times, in the instructions, in the schema and in the validation logic."
  - id: "a897b634-c907-4ace-bb44-978bc1de2168"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lab's SharePoint list holds nine typed columns. Which column does the lesson mark as unique and indexed?"
    options:
      - id: a
        text: "The Approver Email column, because one manager must never hold two pending claims open at the same time"
      - id: b
        text: "The Submitter Email column, because a person may only submit one expense claim in any single billing month"
      - id: c
        text: "The Amount column, because two claims for the same value can never both be legitimate inside one day"
      - id: d
        text: "The Idempotency Key column, because the unique hash is what stops a duplicate tool call creating a second claim"
    correctOptionIds: [d]
    explanation: "The Idempotency Key column is a single line of text with unique values enforced and an index, and the summary of the lab's artifacts describes it as the indexed IdempotencyKey. It is the anti-duplicate hash token. The other three columns carry no such constraint: the approver and submitter emails are plain email-format text fields, and Amount is a currency column with a minimum of 0.01 and two decimal places."
  - id: "b04ec1b9-b933-4048-b38a-281e00e537ed"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which set of spending caps does the Contoso policy in this lab set?"
    options:
      - id: a
        text: "Breakfast $25.00, lunch $30.00, dinner $45.00, and a total daily meal allowance of $100.00 per person"
      - id: b
        text: "Breakfast $30.00, lunch $45.00, dinner $100.00, and a total daily meal allowance of $250.00 per person"
      - id: c
        text: "Breakfast $45.00, lunch $100.00, dinner $250.00, and a total daily meal allowance of $375.00 per person"
      - id: d
        text: "A single flat allowance of $75.00 per person per day, covering every meal category without separate caps"
    correctOptionIds: [a]
    explanation: "The category caps are breakfast at a maximum of $25.00, lunch at $30.00, dinner at $45.00, and a total daily meal allowance of $100.00 per person, with lodging at $250.00 a night on the standard tier and $375.00 on the high-cost tier for New York, San Francisco and London. B and C shift each figure up by one, and D invents a flat allowance that the policy does not contain."
  - id: "0b5c5071-b063-4fd0-89e5-e54fd2cfb707"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lab's idempotency protection relies on a deterministic hash. What is it calculated from?"
    options:
      - id: a
        text: "A random UUID generated afresh for each tool call, so that no two separate calls ever produce the same value"
      - id: b
        text: "The SharePoint item ID, the approver's email address and the timestamp of the approval decision"
      - id: c
        text: "SHA256 of the user email, the date, the amount and the merchant, with the column set to enforce unique values"
      - id: d
        text: "The receipt URL and the expense category, because those two fields are what distinguish one claim from another"
    correctOptionIds: [c]
    explanation: "The lesson gives the pattern as SHA256 of the user email, the date, the amount and the merchant, and the SharePoint column is set to enforce unique values so a duplicate tool call is rejected with an HTTP 409 Conflict. A is the opposite of the point, because a fresh random value every time would never detect a duplicate. B and D use fields the formula does not include."
  - id: "ba76cd7c-74e2-4864-9f8d-9d143cf8ed4b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Step 3 of the agent's playbook is a pre-submission confirmation gate. What does it require?"
    options:
      - id: a
        text: "That the manager approve the claim in Teams before the agent stages the record in the SharePoint list"
      - id: b
        text: "That no database action runs until the user has reviewed the summary and explicitly confirmed the claim"
      - id: c
        text: "That the receipt link has been opened and verified by the agent before the summary table is rendered"
      - id: d
        text: "That the expense category has been pre-approved by the budget desk before the agent asks the employee to confirm"
    correctOptionIds: [b]
    explanation: "Step 3 says not to execute any database actions until the user explicitly reviews and confirms the staged claim details, so the agent renders a summary table and asks the user to reply Confirm before anything is written. A puts the manager in the loop too early, since the manager's approval is the second gate in the flow, not the first. C and D are controls the lesson does not put at this step."
  - id: "9eed8d55-71d0-433c-932f-15a9d13a55cf"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lab's approval step inside the cloud flow, which approval type does the flow use?"
    options:
      - id: a
        text: "Approve or reject, first to respond, assigned to the manager's email address resolved from the directory"
      - id: b
        text: "Approve or reject, all must respond, assigned to the whole cost centre rather than to a single manager"
      - id: c
        text: "Approve only, with rejection handled by a second flow that a human has to start manually later on"
      - id: d
        text: "Multi-stage sequential approval, requiring the manager and then the department head to sign off in turn"
    correctOptionIds: [a]
    explanation: "The Approvals connector action is Start and wait for an approval with the approval type Approve/Reject - First to respond, assigned to the ManagerEmail that the Office 365 Users connector returns from Get manager (V2). B and D change the assignment or the number of approvers, and C removes the rejection branch that the flow's condition and its Rejected update depend on."
  - id: "e47f7326-139a-4cbc-bf79-ef91f6941041"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lab tells you which model and temperature to use for the agent. What does it say?"
    options:
      - id: a
        text: "GPT-4o-mini with temperature 0.0, because the cheaper model handles expense extraction well enough"
      - id: b
        text: "GPT-4o with temperature 1.0, because the highest setting lets the model explore more varied ways to phrase a reply"
      - id: c
        text: "GPT-4o with temperature 0.7, because a little stylistic variety keeps the replies from sounding robotic"
      - id: d
        text: "GPT-4o with temperature 0.0, because identical policy evaluations every time matter more than variety"
    correctOptionIds: [d]
    explanation: "The lesson selects GPT-4o, the enterprise-pinned frontier model, and sets the temperature to 0.0. A temperature of 0.7 or 1.0 introduces stylistic variety and creative lexical sampling, which the lesson calls a bug in corporate expense accounting because it leads to compliance violations, and what is wanted is identical, deterministic policy evaluations every single time."
  - id: "e6339254-e764-42f6-8af7-3cd980fac231"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson explains why the $75 receipt threshold is embedded across the instructions, the schema and the validation logic. Which of these does it say? Select every correct answer."
    options:
      - id: a
        text: "It mirrors IRS Publication 463, under which business expenses under $75.00 need no documentary evidence"
      - id: b
        text: "It excludes lodging from that threshold, so a room charge is treated differently from a meal"
      - id: c
        text: "Demanding receipts for a $6 coffee would alienate the workforce and tank adoption"
      - id: d
        text: "It exists because the finance team wanted a uniform rule, rather than because any external standard required one"
    correctOptionIds: [a, b, c]
    explanation: "The threshold mirrors IRS Publication 463 on travel, gift and car expenses, which does not require documentary evidence for business expenses under $75.00 excluding lodging, provided the taxpayer records the date, amount, merchant and business purpose contemporaneously. Contoso mirrors the tax rule, so demanding receipts for a $6 coffee and letting a $450 flight through without one are both failures, in opposite directions."
  - id: "04e1b37b-bee4-47fd-8ae0-524bf65f5d96"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lab's offline test suite includes three named test cases. Which of these does it run? Select every correct answer."
    options:
      - id: a
        text: "A standard meal expense under $75, to confirm the claim stages and routes without blocking the user"
      - id: b
        text: "A flight or hotel expense of $75 or more, to confirm the receipt rule holds under user pushback"
      - id: c
        text: "A payroll change request, to confirm the agent refuses to alter a direct report's compensation record"
      - id: d
        text: "A bulk re-import of the prior quarter's claims, to confirm the agent replays history accurately"
    correctOptionIds: [a, b]
    explanation: "Test case 1 is the $28.50 Chipotle lunch, checking the exemption path, and test case 2 is the $480.00 United Airlines flight, checking receipt enforcement and that the agent resists a request to waive it. Test case 3 is the out-of-scope hotel booking request, which checks the refusal and handoff. C and D are not cases in the suite, though the hotel booking refusal is the kind of out-of-scope check that case 3 performs."
  - id: "0db4dd6f-cacc-4510-b160-aa28b057c6b5"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson says that if an employee clicks Confirm twice on an expense card, the agent must reject the second submission with an HTTP 409 Conflict rather than create a second claim."
    answer: true
    explanation: "That is exactly what the idempotency pattern does. The key is SHA256 of the user email, date, amount and merchant, and the IdempotencyKey column enforces unique values, so the database engine rejects the duplicate immediately with an HTTP 409 Conflict. Without it, the lesson's example gives three rapid clicks, three identical Adaptive Cards for the same $350 flight, and three separate $350 reimbursement transactions if the manager approves all three, overpaying the employee by $700.00."
  - id: "07958a61-dd16-4fa9-a444-2a52d282dec0"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson's CLEAR instruction set defines strict negative constraints. State the rule that matters most, say why it matters, and give the behaviour it is meant to prevent."
    sampleAnswer: "Rule 1 is NEVER APPROVE EXPENSES YOURSELF. Without it, an LLM given conversational latitude will routinely say something like that meal sounds completely reasonable, I have approved your claim and forwarded it to payroll. In an automated enterprise environment an agent that hallucinates administrative authority creates severe compliance, audit and legal liabilities. The negative constraints must therefore be expressed in absolute, non-negotiable imperative language, and the Step 3 confirmation gate and the manager approval flow exist to enforce them mechanically."
    explanation: "A strong answer gives the rule in the lab's own words, explains that the danger is a fabricated administrative authority rather than a wrong figure, and notes that a negative constraint only works if it is stated absolutely. The best answers also connect the rule to the confirmation gate, because the constraint and the gate are what stop an approval claim."
  - id: "6faa7bb7-2b3a-4516-b877-f7105ad28e64"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the data store and the two actions the lab's agent uses, including what each one is for."
    sampleAnswer: "The data store is a SharePoint Online list named Corporate_Expenses on the FinanceOperations site, with nine typed columns: Title, Amount, Category, Expense Date, Receipt URL, Status, Approver Email, Submitter Email and the indexed, unique IdempotencyKey, with Status defaulting to Pending Approval and Expense Date constrained to today or earlier. Action 1 is the prebuilt Power Platform SharePoint connector running Create item, mapping eight entity slots, hardcoding Status to Pending Approval and taking SubmitterEmail from the authenticated identity, with the item's ID and link captured as outputs. Action 2 is the Power Automate cloud flow Expense-Approval-Manager-Route, which resolves the submitter's manager with Get manager (V2), starts and waits for an approval of type Approve/Reject - First to respond, and then updates the list to Approved or Rejected and notifies the employee in Teams."
    explanation: "A strong answer names the list, its nine columns and the default status, then distinguishes the two actions by their purpose: one writes the staged record, the other routes it for human sign-off. The best answers also note the eight entity slots and that the second action returns an approval status and the approver's comments to Copilot."
```

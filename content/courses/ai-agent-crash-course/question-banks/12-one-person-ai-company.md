---
id: "340fccff-5762-4b7d-82a2-568fa57c461d"
title: "One-Person AI Company Control Plane Question Bank"
description: "Practice questions for One-Person AI Company Control Plane."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions practise agent roles, approval queues, budget caps, audit logs, and the weekly review loop of an owner-run control plane.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "42ddaedc-40f4-4c59-bdc0-685135d87e48"
    revision: 1
    status: active
    type: single-choice
    prompt: "A Researcher agent has spent $24.80 of its $25 daily cap, and its next call is projected to cost $0.40. What should the control plane do?"
    options:
      - id: pre-call-refuse
        text: "Refuse the call up front and mark the agent over-budget"
      - id: alert-after
        text: "Let the call run and send a spend alert once it has finished"
      - id: weekly-flag
        text: "Let the call run and flag the overspend in the weekly review"
    correctOptionIds: [pre-call-refuse]
    explanation: "A pre-call hook adds the projected cost to today's spend and refuses the call if it would pass the cap, so the money is never spent. An after-the-fact alert is the tempting option, but by the time it fires the call has already happened and the overspend is real."
  - id: "6aa1b3c4-28fb-4b6a-acb3-25f7ae3da951"
    revision: 1
    status: active
    type: single-choice
    prompt: "Where should the rule 'customer emails need owner approval' be enforced?"
    options:
      - id: system-prompt
        text: "In the agent's system prompt as a firm written instruction"
      - id: outside-code
        text: "In control-plane code that sits outside the agent process"
      - id: tool-description
        text: "In the tool description the model reads on every call"
    correctOptionIds: [outside-code]
    explanation: "Code outside the agent cannot be talked out of the rule, because the agent never holds the ability to send without a human decision. A prompt instruction is the tempting choice, but an agent can be tricked into ignoring its prompt, so the rule must not depend on it."
  - id: "44e14b76-fd1a-40ce-a6e6-f540bb21abcc"
    revision: 1
    status: active
    type: single-choice
    prompt: "The owner reads a pending blog post, fixes one claim, and clicks Edit. What should the system do?"
    options:
      - id: run-edit
        text: "Run the edited payload at once and record the owner's note"
      - id: overwrite-pending
        text: "Keep the same row pending and overwrite its payload quietly"
      - id: new-pending
        text: "Mark the row edited and create a new pending approval row"
    correctOptionIds: [new-pending]
    explanation: "An edit closes the original row and creates a fresh pending approval, so the changed text still gets its own deliberate Approve click. Running the edit at once is the tempting shortcut, but it would let an unreviewed payload execute."
  - id: "de8b15a4-c180-4296-b54b-acc4820ed848"
    revision: 1
    status: active
    type: single-choice
    prompt: "Two browser tabs click Approve on the same $50 charge at the same moment. Which design stops a double charge?"
    options:
      - id: read-then-update
        text: "Read the state in Python, then run a second UPDATE statement"
      - id: disable-button
        text: "Disable the Approve button in the browser after one click"
      - id: retry-loop
        text: "Wrap the worker in a retry loop that skips failed charges"
      - id: conditional-update
        text: "Run one UPDATE that sets approved only if state is pending"
    correctOptionIds: [conditional-update]
    explanation: "A single conditional UPDATE lets the database decide the winner: only one caller sees a row count of 1 and the other gets a 409. Disabling the button is tempting, but it protects only one tab, while a read followed by a separate update leaves a race window."
  - id: "68297f07-245f-4b8f-8c9a-88c58a5da7a4"
    revision: 1
    status: active
    type: single-choice
    prompt: "A Marketer agent drafts a post saying 'Our tool guarantees 90% cost reduction.' What is the best control?"
    options:
      - id: approval-edit
        text: "Hold it for approval, flag the claim, and edit it"
      - id: prompt-only
        text: "Add a no-absolute-claims line to the prompt and auto-publish"
      - id: publish-and-fix
        text: "Publish now and remove the post if customers complain"
    correctOptionIds: [approval-edit]
    explanation: "Publishing needs approval, so the owner sees the flagged claim and edits it into something supported before anything goes public. Auto-publishing with a prompt line is the tempting option, but a prompt alone is not a hard gate and a public mistake is costly to undo."
  - id: "c5b290b6-a2e7-4d17-a437-6ea3c07bab43"
    revision: 1
    status: active
    type: single-choice
    prompt: "A Researcher agent ran up a $400 bill overnight. What is the best first response?"
    options:
      - id: rewrite-prompt
        text: "Rewrite the agent's prompt to tell it to spend less"
      - id: pause-and-trace
        text: "Pause the agent, then read its audit trail by request id"
      - id: delete-role
        text: "Delete the Researcher role and let the CEO agent take over"
    correctOptionIds: [pause-and-trace]
    explanation: "Pausing stops the spend, and the request_id trail shows exactly what the agent did and which control was missing. Rewriting the prompt is tempting, but the agent did what it was permitted to do, so the fix is a cap, a pre-call hook and an alert."
  - id: "b34dd0b7-dc42-428b-85f9-8451a2d5dbf9"
    revision: 1
    status: active
    type: single-choice
    prompt: "A Sales agent forwarded a customer's address to the Researcher, which sent it to an outside API. What is the right fix?"
    options:
      - id: prompt-warning
        text: "Tell the Sales agent in its prompt not to share addresses"
      - id: drop-web-fetch
        text: "Remove web fetch from the Researcher role entirely"
      - id: redact-between-roles
        text: "Redact personal data on messages between roles in policy"
    correctOptionIds: [redact-between-roles]
    explanation: "The gap was a missing rule for what may cross between roles, so the fix is a policy on the message path that masks personal data before delivery. Removing web fetch is tempting, but it would cripple the Researcher while the next role pair could leak the same way."
  - id: "81b44ddc-d2e6-4a83-8d69-e5a5813b1f0c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which items belong in the minimum contract for an agent role? Select every correct answer."
    options:
      - id: tools-tier
        text: "The allowed tool list and the default permission tier"
      - id: approval-cap
        text: "The actions needing approval and the budget cap"
      - id: weekly-metric
        text: "A weekly metric that shows whether the role is working"
      - id: prompt-wording
        text: "The exact system prompt wording, written before anything else"
      - id: shared-key
        text: "One shared admin key that every role can use for tools"
    correctOptionIds: [tools-tier, approval-cap, weekly-metric]
    explanation: "A role contract names the job, tools, tier, approval triggers, budget cap and weekly metric, and it is written before the prompt. A shared admin key is the tempting shortcut, but it defeats per-role permissions because every role could then touch every tool."
  - id: "bf3eefaa-d26d-45f2-8367-7a08cc000f8c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which actions should go through the approval queue by default? Select every correct answer."
    options:
      - id: send-email
        text: "Sending an email to a customer"
      - id: issue-refund
        text: "Issuing a refund to a customer"
      - id: publish-post
        text: "Publishing a blog post to the public site"
      - id: draft-email
        text: "Drafting an email for the owner to read"
      - id: read-memory
        text: "Reading a memory card for context"
    correctOptionIds: [send-email, issue-refund, publish-post]
    explanation: "Customer contact, money movement and publishing are external actions, so each waits for a human decision. Drafting is the tempting extra, but it stays internal and adding friction there slows the system without protecting anyone."
  - id: "b7fd7cdd-61b6-47f4-af41-741c3ee9f2b6"
    revision: 1
    status: active
    type: true-false
    prompt: "If the same failure appears in the weekly review three weeks running, the likeliest cause is a missing policy update rather than a dumb agent."
    answer: true
    explanation: "Every failure should be turned into a policy, budget or tool restriction, so a repeating failure means the human has not yet changed a rule. Blaming the agent is the tempting reading, but an agent keeps doing what its limits allow."
  - id: "89cdffcd-8068-4eeb-af5d-0e4e1686d83c"
    revision: 1
    status: active
    type: free-recall
    prompt: "A friend says to keep approval rules inside the agent's prompt because it is faster to build. Explain why you would put the approval queue outside the agent instead."
    sampleAnswer: "A prompt is only a request the agent can be tricked into ignoring, for example by a hostile web page. If the approval gate is code outside the agent, the agent can only propose an action and a human must click Approve before anything runs. That gap is also what makes the system worth trusting with customers and money."
    explanation: "A strong answer separates the data plane, where agents run, from the control plane that holds permissions and approvals, and says that a prompt rule can be bypassed while code outside the agent cannot."
  - id: "7121a0a8-1b4b-4692-a0da-5dd6e52c544d"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, describe how roles, tool permissions, budgets, the approval queue, the audit log and the weekly review work together to let one owner direct many agents safely."
    sampleAnswer: "Each agent is a role with a job, a tool list, a permission tier, a budget cap and a weekly metric. Anything external, such as email, payments or publishing, becomes a pending approval that the owner approves, rejects or edits, and budgets are checked before each model call. Every step is written to an audit log joined by request id, and the weekly review turns failures into new rules."
    explanation: "A strong answer links all six pieces into one loop: contract, gate, cap, record, and review, with the owner approving risky actions and updating policy each week."
```

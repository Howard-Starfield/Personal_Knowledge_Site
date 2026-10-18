---
id: "36ecbfa6-2234-4195-833e-cb7c4d9ffb9f"
title: "The One-Person AI Company Control Plane"
description: "Build the owner's dashboard layer of roles, approvals, budgets, and audit logs that lets one person direct many AI agents without losing control."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
  - agent-governance
  - human-in-the-loop
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 12
estimatedMinutes: 45
---

## Why this matters

Solo operators who hand work to AI agents often get burned the same way: an overnight API bill, an unapproved marketing claim, a made-up refund policy sent to a customer, or private data passed to the wrong tool. Those are rarely model failures. They happen because the agent had no clear role, no budget, no approval gate, and no place where a human reviewed its work. A control plane is the smallest layer that stops each of those from taking over your week. It is also the piece that makes your agent work credible to a paying client.

## What you'll be able to do

- Explain the difference between the data plane and the control plane, and why approval logic belongs in the second.
- Write a role contract for an agent with tools, tier, approval triggers, budget cap and weekly metric.
- Decide which actions go to the approval queue and trace what Approve, Reject and Edit each do.
- Calculate whether a pre-call budget hook should allow or refuse a model call.
- Diagnose an agent incident by using a request id and a policy change, rather than blaming the agent.

## Before you start

- In the last lesson, which business workflows did you decide were worth automating, and which needed a human check? See [[courses/ai-agent-crash-course/lessons/11-business-applications|Previous lesson]].
- What does a permission scope such as read-only or external-action-requires-approval stop an agent from doing?
- Why does an audit log help you debug an agent after it has already acted?

## Step 1 — Think org chart, not swarm

**Plain language.** A multi-agent system is not ten chatbots arguing. It is a small set of named roles, each with a job, a tool list, a spending limit and a rule about when to ask the owner.

**Analogy.** Imagine hiring ten very fast, very confident staff who do not know your tax position, your sensitive customers or your lawyer. You would not manage them with sticky notes. You would want an org chart, a key cabinet with one hook per person per tool, and a petty-cash limit for each.

**The rule.** The data plane is where agents run tasks and call tools. The control plane sits above it and answers four questions: who is doing what, with which permissions, under which budget, and what is waiting for human sign-off. Each agent is a role, and a role has a contract:

1. a name and a one-sentence job;
2. an allowed tool list;
3. a default permission tier (read-only-internal, read-write-internal, external-action-with-approval, or blocked);
4. the actions that need approval;
5. a budget cap;
6. a weekly metric.

Write the contract before the prompt. If you cannot measure a role weekly, you cannot tell whether to keep it.

**Worked example.** The course's Marketer role looks like this:

| Field | Value |
|---|---|
| Job | Create content, positioning and ad copy |
| Tools | content.draft, memory.read |
| Tier | read-write-internal |
| Approval triggers | content.publish, ad spend, public claims |
| Weekly budget | 20 USD |
| Weekly metric | Approval acceptance rate |

Notice that the Marketer can draft but cannot publish. Two roles, Critic and Security, are review-only by design: they read everything and write nothing, a cheap insurance policy against productive agents shipping bad work.

> [!warning] Common mistake
> Putting approval rules into the agent's system prompt. An agent can be tricked into ignoring its prompt, so the rule must live in code outside the agent process.

```knowledge-quiz
schemaVersion: 1
quizId: "f62ef3e2-6fda-4baf-bbe6-56236ffcddfe"
title: "Checkpoint: roles and planes"
questionBankId: "340fccff-5762-4b7d-82a2-568fa57c461d"
questionIds:
  - "6aa1b3c4-28fb-4b6a-acb3-25f7ae3da951"
  - "81b44ddc-d2e6-4a83-8d69-e5a5813b1f0c"
```

## Step 2 — Build the approval queue

**Plain language.** When an agent wants to do something external, such as send an email, publish a post, charge a card, issue a refund, merge to main or deploy, it does not do it. It writes a row with the state pending and waits for you.

**Analogy.** It is an inbox of "may I?" cards. Each card says what the agent wants to do, in readable form, and has three buttons: Approve, Reject, Edit.

**The rules.**

- Show a human-readable rendering of the payload: To, Subject and Body for an email, the customer and amount for a charge, the title and a preview for a post. Raw JSON hides mistakes.
- A row is decided exactly once. Approve runs the action through the tool runner with the original request id. Reject logs and drops it. Edit closes the row as edited and creates a new pending row with the changed payload, so an edited payload is never executed silently.
- Rejections are sticky. The agent must not re-queue the same action automatically.
- Approving, rejecting and editing are all written to the audit log.

**Worked example: the double click.** Two browser tabs press Approve on a 50 USD charge at the same time. If your code reads the state, checks it in Python, and then updates, both tabs can pass the check and the customer is charged twice. The safe form is one conditional statement:

```sql
UPDATE approvals
SET state = 'approved', reviewer_note = ?, decided_at = ?
WHERE id = ? AND state = 'pending';
```

The database decides the winner. The caller that changed one row proceeds. The caller that changed zero rows gets a 409 "already decided" response. In production you also add idempotency keys on external calls, such as payment and email providers, so a retried approval cannot double-send.

> [!warning] Common mistake
> Thinking the approval queue is a speed bump to remove from the demo. It is the feature: the moments your agent did not act because policy did not allow it are what a customer pays for.

```knowledge-quiz
schemaVersion: 1
quizId: "3e84b003-7bca-4a49-858e-0e6cc5d3e334"
title: "Checkpoint: approvals"
questionBankId: "340fccff-5762-4b7d-82a2-568fa57c461d"
questionIds:
  - "44e14b76-fd1a-40ce-a6e6-f540bb21abcc"
  - "de8b15a4-c180-4296-b54b-acc4820ed848"
```

## Step 3 — Cap spend before the call and log everything

**Plain language.** Watching spend after a call is not the same as capping it. A cap works before the call: read today's spend, estimate what this call will cost from the prompt size, and refuse if the total would pass the limit.

**Analogy.** A petty-cash drawer with an alarm tells you the money is gone. A drawer that stays locked once the daily limit is reached keeps the money in.

**The rule.** The check is spend today plus projected cost compared with the daily cap, and the same idea applies to the weekly cap and a global cap. A gateway such as Helicone shows actual spend per agent, but it records what happened. The pre-call hook is what refuses. For safety, put hard caps in the model client itself, not only in the dashboard.

The audit log is the other half. It is append-only and records every model call, tool call, approval decision and outcome. Every row carries the same request_id as the rest of its trajectory, so one click expands a row into the whole story. The chapter's version also chains rows: each row stores the SHA-256 hash of the previous row (prev_hash) and its own row_hash, starting from a GENESIS marker. Changing any old row breaks every later hash, and a verify function returns false.

**Worked example.** Suppose the owner set the Researcher a 25 USD daily cap (an illustrative figure) and it has spent 24.80 USD. The next call is projected at 0.40 USD. The total would be 25.20, which is greater than 25.00, so the hook refuses, marks the agent over-budget and alerts you. Now the incident version: an agent spends 400 USD overnight. Three controls were missing: a sensible cap, the pre-call hook, and an alert at a lower threshold. Pause the agent (status blocked), filter the audit log to that agent and the last day, reconstruct the trajectory by request id, add the controls, and record it in the weekly review.

> [!warning] Common mistake
> Relying on an alert from your observability tool to protect the budget. By the time the alert fires, the money is already spent.

```knowledge-quiz
schemaVersion: 1
quizId: "7a7b309d-7950-4d34-b02b-708e10a0bf40"
title: "Checkpoint: budgets and audit"
questionBankId: "340fccff-5762-4b7d-82a2-568fa57c461d"
questionIds:
  - "42ddaedc-40f4-4c59-bdc0-685135d87e48"
  - "c5b290b6-a2e7-4d17-a437-6ea3c07bab43"
```

## Step 4 — Close the loop weekly, and stay honest about limits

**Plain language.** On a schedule, such as Sunday night, a report reads the audit log and tells you tasks completed, dollars spent per agent, the approval acceptance rate, top failures and suggested policy changes. You pick one change and make it on Monday.

**Analogy.** It is the manager's weekly review, except the evidence is an automatic logbook rather than anyone's memory.

**The rule.** Every failure becomes a policy update, not a punishment. Ask what policy, budget or tool restriction would have prevented it. If an agent goes off-policy three weeks running, the human has not yet changed a rule. The course also lists ten working rules: every agent has a role and limits and measurable tasks, tools are permissioned, external actions, money movement, publishing and customer communication need approval, the owner sees a dashboard, failed tasks become lessons, and performance is evaluated weekly.

**Worked example.** A Marketer draft claims "guarantees 90% cost reduction." The content guardrail flags the absolute claim, the owner clicks Edit and replaces it with a sourced claim, a new pending approval is created, and the owner approves it. Over several weeks the review shows claims needing edits, so you add a hard rule against unsourced absolute claims, in the guardrail and not only in the prompt.

**Be honest about the limits.** One-person ownership is not one-person execution. A human still has to handle company formation, taxes, insurance, payment-account verification and legal liability. Brand crises and high-stakes customer moments land on the owner, so the higher the brand stakes, the lower the approval threshold should be. Treat predictions of the first one-person billion-dollar company as marketing from tool sellers, and watch for the owner becoming the bottleneck for every approval.

> [!warning] Common mistake
> Blaming the agent when it repeats a failure. The agent keeps doing what its limits allow, so repeated failure means a rule is missing.

## Try it

Design a Refund Clerk role for a small online shop and test a budget check.

1. Write its role contract: job, tools, tier, approval triggers, weekly budget, and weekly metric.
2. Decide which of these go to the approval queue: drafting a reply, issuing a refund, reading an order, emailing the customer.
3. A Marketer agent has a 20 USD weekly cap and has spent 19.80 USD. A call is projected to cost 0.35 USD. Should the hook allow it?

> [!example]- Sample solution
> 1. Job: prepare refund decisions for customer orders. Tools: crm.read, kb.search, refund.request (which only creates a pending approval). Tier: external-action-with-approval for refunds, read-only otherwise. Approval trigger: every refund and every customer email. Weekly budget: for example 10 USD, adjusted after the first week of real numbers. Metric: refunds approved on first review, or first-response time.
> 2. Queue: issuing a refund and emailing the customer. Drafting a reply and reading an order are internal, so adding friction would slow work without protecting anyone.
> 3. 19.80 + 0.35 = 20.15, which is greater than 20.00, so the hook refuses and marks the agent over-budget until the next period or an owner override.

## Key takeaways

- The control plane governs who does what, with which permissions and budget, and what awaits sign-off. Agents run in the data plane below it.
- An agent role is a contract: job, tools, tier, approval triggers, budget cap and weekly metric, written before the prompt.
- Approvals are decided exactly once with a conditional UPDATE, and Edit creates a new pending row rather than running the edit.
- Capping spend means a pre-call check. Observation tools tell you what was spent after the fact.
- An audit log joined by request_id, optionally hash-chained, lets you reconstruct any incident quickly.
- Every failure is a policy update, and the owner still carries legal, financial and brand responsibility.

## Explain it back

In your own words, explain how roles, tool permissions, budgets, the approval queue, the audit log and the weekly review work together to let one owner direct many agents safely.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "021aa152-dd10-40e2-8345-604d92313929"
title: "Chapter quiz: the one-person AI company control plane"
questionBankId: "340fccff-5762-4b7d-82a2-568fa57c461d"
questionIds:
  - "68297f07-245f-4b8f-8c9a-88c58a5da7a4"
  - "b34dd0b7-dc42-428b-85f9-8451a2d5dbf9"
  - "bf3eefaa-d26d-45f2-8367-7a08cc000f8c"
  - "b7fd7cdd-61b6-47f4-af41-741c3ee9f2b6"
  - "89cdffcd-8068-4eeb-af5d-0e4e1686d83c"
  - "7121a0a8-1b4b-4692-a0da-5dd6e52c544d"
```

Next: [[courses/ai-agent-crash-course/lessons/13-capstone-business-agent-os|Next lesson]]

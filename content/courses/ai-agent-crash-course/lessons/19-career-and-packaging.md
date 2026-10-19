---
id: "87c1dc79-4e0e-414f-8fbf-897838112174"
title: "Career Proof, Consulting Offers, and Safe Packaging"
description: "Turn your agent projects into visible evidence, productized offers, and a safe way to work with paying clients."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 19
estimatedMinutes: 45
---

## Why this matters

A recruiter or a small-business owner decides quickly whether to keep reading or to move on. After a whole course of building systems, the building is the easy part; making the work visible, credible, and commercially safe is the hard part. One careless agent that emails customer data or refunds the wrong card can end an AI career, so the packaging has to show safety as clearly as it shows skill.

## What you'll be able to do

- Explain why evidence (evals, traces, security tests) beats a claim like "I know RAG".
- Write a resume bullet that names a system, its tools, a problem, and a measurable trust feature.
- Decide whether an offer is productized and calculate retainer revenue.
- Diagnose a discovery call and turn "automate everything" into an approval-gated MVP.
- Decide what must be in place (DPA, liability cap, deletion policy) before touching client data.

## Before you start

Review the red-team work from [[courses/ai-agent-crash-course/lessons/18-security-red-team|Previous lesson]] and answer these from memory:

- What does a prompt-injection test suite prove about an agent, and what can it not prove?
- Why do tool guardrails protect better than a rule written into the prompt?
- What was the purpose of the human approval step in your capstone agent?

## Step 1 — Show evidence, not claims

**Plain language.** "I know RAG" is a claim anyone can make. A repository with an eval report and a blocked-injection security test is evidence. The market is crowded with people who say they build agents, so be the boring competent one: you measure, you refuse unsafe scope, and you log every action.

**Analogy.** Think of a chef's portfolio. The resume is the menu, the portfolio is the tasting plate, the demo video is the kitchen tour, and the case study is the recipe card with before and after photos.

**The rule.** Collect your proof in one `portfolio` folder: a project page, an architecture diagram, a demo script (about 90 seconds), an eval report, a security report, screenshots, resume bullets, a LinkedIn post, and client discovery questions. Each artifact has one quality bar:

- The project page lets a senior engineer rebuild your architecture from the page alone.
- The architecture diagram has an answer for "what happens when this box fails?" for every box.
- The eval and security reports show honesty: what you tested, what you block, and what you do not yet test.

**Worked example.** The chapter's capstone page reports a golden set of 50 questions, an 87% retrieval hit rate, 92% citation accuracy, and 18 of 18 indirect prompt-injection cases blocked. Those figures come from the course's own example; your numbers must come from your own runs.

**Resume formula.** Built a system using tools or architecture to solve a business problem, including a trust, safety, or eval feature. For example: "Built a RAG assistant with FastAPI and BM25 for policy Q&A; a 50-case eval measured retrieval hit rate." It has a verb that produced something, a measurable result, and no buzzword without a referent.

> [!warning] Common mistake
> Writing "passionate about cutting-edge AI agents" and nothing else. Without a number, a named tool, or a safety feature, the bullet is still a claim.

## Step 2 — Package your skills as productized offers

**Plain language.** A productized service has a fixed scope, a fixed price, and a defined deliverable. "AI chatbot, $5,000, two weeks, includes eval and security review" is productized; "AI consulting" is not. Fixed offers convert faster and are harder to creep.

**Analogy.** A catering package: you bring the equipment, you set the menu and the price, and you do not redesign the dining room.

**The rule.** Each one-page offer states the problem, deliverable, timeline, price, and what is not promised. The chapter sketches seven offers, such as an FAQ chatbot with citations, an internal document search assistant, a support draft assistant, and an agent safety review. Pricing models seen in solo-builder writeups are hourly, fixed project, monthly retainer, and revenue share. Treat the dollar ranges as starting points to verify against your local market, not facts.

**Worked example.** Retainers are where solo consulting compounds. Three retainers at $2,000 per month is 3 x 2,000 x 12 = $72,000 per year before any new projects. Hourly rates are a safe fallback for unknown scope but clients hear "uncapped", and revenue share needs a clean baseline and months of patience, so avoid it for early clients.

> [!warning] Common mistake
> Letting scope expand without re-scoping in writing. A productized offer lists what is out of scope, and you point back to that list.

```knowledge-quiz
schemaVersion: 1
quizId: "5f652f58-d99b-4370-80b4-9a49f7b0de64"
title: "Checkpoint: evidence and offers"
questionBankId: "ac1bc044-85e5-416f-9950-3705a06b80c7"
questionIds:
  - "fbf6db65-300e-47b3-8a11-648236e0165b"
  - "51b8f902-d1a0-45f9-9071-addc1231301a"
```

## Step 3 — Run discovery and design the approval-gated MVP

**Plain language.** A discovery call is a diagnostic, not a pitch. Listen for these signals: a painful, repetitive, measurable workflow, clean enough data, and a willing human in the loop. If any is missing, the project will likely fail and damage your reputation.

**Analogy.** Like a doctor asking where it hurts before prescribing, you ask before you sell.

**The rule.** Keep the call to 30 to 45 minutes. Good questions cover which workflow wastes the most time, where the information lives, whether data is confidential or regulated, who approves a response, what the worst case is, and how success will be measured. If you are past the fourth question and have no idea what the painful workflow is, end the call politely. When a client asks for "AI that handles everything", propose the approval-gated MVP: AI drafts, a human clicks, and the system logs both.

**Worked example.** An owner wants an agent that answers customers and issues refunds. Your safer first version retrieves the policy and quotes it, checks refund eligibility with reasoning, drafts the reply and proposed amount, places both in an approval queue, and waits for a human click before anything is sent or refunded. The decision, draft, citation, and outcome go to an audit log. That covers most of the work, keeps legal and trust calls with a person, and creates the record that could justify a later version.

> [!warning] Common mistake
> Removing the approval gate early because "it always gets it right". The gate is how you ship safely and collect the evidence for loosening it.

```knowledge-quiz
schemaVersion: 1
quizId: "3cef1090-9e22-47f6-8ab6-f7a59488e877"
title: "Checkpoint: discovery and approval gates"
questionBankId: "ac1bc044-85e5-416f-9950-3705a06b80c7"
questionIds:
  - "24b1ec59-14fc-43c8-9d7e-fb0a130fd396"
  - "ed1e085f-e5e1-4602-9941-ed6b96766439"
```

## Step 4 — Respect the privacy, contract, and honesty lines

**Plain language.** Once you handle a client's data, you carry legal and ethical weight. If the data includes personal information about people covered by privacy laws such as the GDPR, you are often a data processor acting for the client (the controller), though the label depends on who decides the purposes and means of the processing. Under GDPR Article 28 that relationship must be governed by a written contract, usually called a Data Processing Agreement (DPA), under which you process only on the client's documented instructions and, at the client's choice, delete or return the data when the work ends.

**Analogy.** A locksmith gets keys to a house; the written agreement, not goodwill, says what you may do with them.

**The rule.** Before client data touches your laptop, have a signed DPA, encrypted storage, and a deletion policy you actually follow. Regulated data needs explicit legal review before you touch it, because each regime has its own scope and contract terms: HIPAA (US health data held by covered entities and their business associates, which requires a Business Associate Agreement rather than a plain DPA), PCI-DSS (an industry standard, not a statute, for payment card account data), COPPA (US rules on personal information collected online from children under 13), and FERPA (US student education records at schools that receive federal education funding, at any age). Whether a law applies to you depends on your role, the client, and the location, so have a lawyer confirm. Put a limitation-of-liability clause in contracts, commonly capped at fees paid (courts and statutes in some places limit what a cap can cover, and a contract cannot cap a person's own GDPR rights), and state that the client must review AI-drafted output before it reaches customers. Settle IP in writing. Consider professional liability (errors and omissions) insurance once you have paying clients; quotes vary, so verify them. Never promise 100% accuracy, "replace your support team", actions without approval gates, or compliance you have not verified.

**Worked example.** Fine-tuning on customer chat data: check whether customers know their data may train AI, whether there is an opt-out, whether personal data is scrubbed, where training runs and what happens afterward, whether the resulting model may hold personal data (regulators say a model trained on personal data is not automatically anonymous), and how deletion requests are handled. Refuse the engagement until all have written answers.

> [!warning] Common mistake
> Starting a small pilot without a DPA and discovering the data is regulated. A small pilot is still personal data.

```knowledge-quiz
schemaVersion: 1
quizId: "4fede261-ef74-43bc-8422-c6142257a432"
title: "Checkpoint: data and contracts"
questionBankId: "ac1bc044-85e5-416f-9950-3705a06b80c7"
questionIds:
  - "bd3894c0-b186-4baa-acba-7e0081836d62"
  - "4362a18b-b5d8-4f0b-a370-7a8ff984a4c7"
```

## Try it

Pick one project you built in this course. Write its resume bullet using the formula, then write a one-line "not promised" statement for a made-up productized offer based on it. Finally, list three discovery questions you would ask a prospect.

> [!example]- Sample solution
> Bullet: "Built a citation-grounded policy assistant with hybrid retrieval and an approval queue for outbound replies; a 30-case eval measured retrieval hit rate and refusal accuracy." (Use your own numbers; do not copy ones you did not measure.)
>
> Not promised: "Does not send messages, change records, or handle refunds without a per-action human approval."
>
> Discovery questions: "Which single workflow wastes the most time this week, and how often?" "Is any of the data confidential or regulated?" "Who would approve a draft before it reaches a customer, and are they available daily?"

## Key takeaways

- Evidence (evals, security tests, before/after numbers) beats claims, and honest limits build trust.
- A productized service has fixed scope, fixed price, and a defined deliverable with a written out-of-scope list.
- A discovery call is a diagnostic; end it politely if no painful, measurable workflow appears.
- For customer-facing or money-touching work, ship an approval-gated MVP: AI drafts, a human approves, the system logs both.
- A signed DPA (or the equivalent written processing contract, such as a BAA for HIPAA data), a liability cap, and a deletion policy come before client data.
- Never promise perfect accuracy or compliance you have not verified.

## Explain it back

In your own words, explain why an approval-gated MVP is the safest first version of a customer-facing agent, and what the system records.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "43baf69f-f289-491d-9d98-723e57fe7146"
title: "Chapter quiz: career proof and packaging"
questionBankId: "ac1bc044-85e5-416f-9950-3705a06b80c7"
questionIds:
  - "da894456-05dd-451c-84ce-9ac886d103e8"
  - "197dcb9c-0d05-4ede-90f0-a9684040ff9b"
  - "8bae5f8c-5a93-45f5-9483-ac08392cae7b"
  - "41ac364e-44af-4f6f-b102-61d493aeefaf"
  - "34958335-6582-4acb-a7fb-e6b3f4ced128"
  - "bfb9633a-d372-49ea-a504-e5843f961225"
```

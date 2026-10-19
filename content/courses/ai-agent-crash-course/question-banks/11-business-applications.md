---
id: "6a30958e-54ee-4386-a39e-c9b2ecb32c01"
title: "AI for Business Applications Question Bank"
description: "Practice questions for AI for Business Applications."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

Practice questions on picking a painful workflow and building a safe support assistant around it.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "23fa5730-097c-4376-855c-2b40c88e477d"
    revision: 1
    status: active
    type: single-choice
    prompt: "A bakery owner says she wants AI. Which candidate task best passes the workflow-first test?"
    options:
      - id: cards
        text: "Replacing the hand-written thank-you cards she enjoys writing"
      - id: preorder-faq
        text: "Answering the same pre-order questions each day from the menu and FAQ"
      - id: general-bot
        text: "Building a general assistant before choosing which task it should handle"
      - id: forecast
        text: "Predicting next year's trends from data the bakery has never collected"
    correctOptionIds: [preorder-faq]
    explanation: "A good target is repetitive, measurable, costly when wrong, time-consuming for people, and backed by data that already exists. The daily pre-order questions meet all of these. The thank-you cards are tempting, but it is a job the owner enjoys and no one pays to remove."
  - id: "4417a702-c150-442d-b644-2de186666d30"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under the draft-first versus send-first rule, which output may reasonably go out send-first?"
    options:
      - id: refund-offer
        text: "A refund offer to a customer upset about a broken blender"
      - id: legal-wording
        text: "A reply containing legal-sounding wording about liability"
      - id: topic-tag
        text: "An internal tag that labels each new ticket by its topic"
      - id: apology
        text: "An apology email to an angry customer after a late order"
    correctOptionIds: [topic-tag]
    explanation: "Internal tags, summaries and status updates have a low cost of error and never reach a customer, so they can be reviewed after the fact. The apology email is tempting because it sounds routine, but customer-facing, emotional replies stay draft-first with a human approving before send."
  - id: "5abefc6f-9b85-4672-b8cc-808c3a1a6d9e"
    revision: 1
    status: active
    type: single-choice
    prompt: "A support pipeline searches one shared index for every ticket, and spam tickets receive long policy-based drafts. Which change gives the most leverage?"
    options:
      - id: classify-first
        text: "Classify each message first, then use a class-specific retriever and approval rule"
      - id: bigger-model
        text: "Switch to a larger model so it ignores spam when it drafts a reply to each message"
      - id: more-chunks
        text: "Retrieve more chunks for every ticket so the right policy is more likely to be included"
    correctOptionIds: [classify-first]
    explanation: "Classification before retrieval is the cheapest leverage in the pipeline because it selects the right retriever, prompt and approval rule, and lets spam skip drafting entirely. Retrieving more chunks is tempting, but it adds cost and noise without deciding what kind of message this is."
  - id: "22858341-cce0-49d3-b4cf-47ae824dafd7"
    revision: 1
    status: active
    type: true-false
    prompt: "If the model returns a citation string with its draft, the draft can be sent without checking that the string actually appears in the policy file."
    answer: false
    explanation: "A model can invent or distort a quotation, so the pipeline should verify that the cited text appears verbatim in the policy and escalate if it does not. Structured output makes the citation easy to extract, but it does not make the citation true."
  - id: "a525ef77-7935-4686-bc63-42017df7b3a8"
    revision: 1
    status: active
    type: single-choice
    prompt: "The draft prompt says refunds above $200 must be escalated, yet the pipeline also checks the amount in code after the reply. Why?"
    options:
      - id: cannot-read
        text: "The model cannot read the refund policy placed in its prompt"
      - id: shorter-draft
        text: "Prompt rules make the draft longer, so a second pass shortens it"
      - id: skip-audit
        text: "A code check lets the pipeline skip the audit log for small amounts"
      - id: outside-model
        text: "Prompt rules can be fooled, so the cap must be enforced outside the model"
    correctOptionIds: [outside-model]
    explanation: "The model may ignore a rule, or a ticket may trick it, so defense in depth means code verifies the proposed amount independently and escalates when it is too high. Skipping the audit log is wrong: every decision is still logged, whatever the amount."
  - id: "34a02188-2aed-4718-b010-b5d9205985c4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which designs keep the approval gate trustworthy? Select every correct answer."
    options:
      - id: human-action
        text: "Take the approved flag from the reviewer's action outside the model session"
      - id: recheck-final
        text: "Re-run the rule-based escalation check on the final draft, not an earlier one"
      - id: trust-tool
        text: "Treat a tool result saying approval was granted as enough to send the reply"
      - id: model-flag
        text: "Let the model's own needs_escalation flag be the only escalation test used"
    correctOptionIds: [human-action, recheck-final]
    explanation: "Approval must come from outside the model, and the rules must be applied to the final draft that will actually be sent. A tool result claiming approval is tempting to accept, but text in the model context can be forged, so it must be ignored."
  - id: "1e9bb911-492d-4ae2-a2f1-b93df1b8ab6f"
    revision: 1
    status: active
    type: single-choice
    prompt: "A bakery gets about 100 pre-orders a week, runs its site on Wix and has the owner answer DMs personally. What should you recommend?"
    options:
      - id: custom-build
        text: "Build a custom chatbot with its own API, retriever and dashboard from the start"
      - id: buy-suite
        text: "Buy an enterprise support suite that charges per AI-resolved ticket each month"
      - id: diy-platform
        text: "Set up the Wix chatbot on the menu and FAQ and route pre-orders to the owner"
    correctOptionIds: [diy-platform]
    explanation: "At low volume with standard logic, using the feature inside the platform the business already has is the cheapest option, and you charge for configuration and a short playbook. A custom build is tempting but loses money at this volume unless volume grows or the platform cannot do the job."
  - id: "ebfad8dd-b36b-43ed-a36e-1d30b322f321"
    revision: 1
    status: active
    type: single-choice
    prompt: "A website chatbot answers 10,000 questions a month. Moving from $0.02 per call to $0.20 per call changes the monthly bill from what to what?"
    options:
      - id: twenty
        text: "From $20 to $200 per month"
      - id: two-hundred
        text: "From $200 to $2,000 per month"
      - id: two-thousand
        text: "From $2,000 to $20,000 per month"
      - id: hundred
        text: "From $100 to $1,000 per month"
    correctOptionIds: [two-hundred]
    explanation: "10,000 calls at $0.02 is $200, and 10,000 calls at $0.20 is $2,000. The first option is tempting because it is off by a factor of ten, which is an easy decimal slip. Per-event cost often decides whether a small business can afford the tool."
  - id: "f688283d-694a-4c1b-9849-489577a39968"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which conditions make a workflow a good target for an AI project? Select every correct answer."
    options:
      - id: repetitive
        text: "People repeat the task many times every single week"
      - id: measurable
        text: "Its success can be tracked with one clear metric"
      - id: data-exists
        text: "The data it needs is already collected somewhere"
      - id: enjoyed
        text: "The staff enjoy the task and would rather keep it"
      - id: no-cost
        text: "A mistake costs nothing, so no one needs to track it"
    correctOptionIds: [repetitive, measurable, data-exists]
    explanation: "Good targets are repetitive, measurable, costly when wrong, time-consuming and already backed by data. A task nobody measures because mistakes are free is tempting as a safe starting point, but with no cost of error there is no value to sell."
  - id: "913ab010-65db-4f6a-a504-e9d4d26e6e4b"
    revision: 1
    status: active
    type: true-false
    prompt: "Once a support assistant's drafts are accepted without edits more than 70% of the time for a week, the approval gate can be removed for every ticket class."
    answer: false
    explanation: "The chapter ties removing the gate to a specific class sustaining a high accept rate for about four weeks, never globally. Even then refunds, cancellations, complaints and legal-tone messages should keep a human, so one good week proves very little."
  - id: "cce47b0d-d97f-43c1-bc7e-c136431089b0"
    revision: 1
    status: active
    type: free-recall
    prompt: "Walk through the support assistant pipeline from an incoming ticket to the metrics report, and say where a human is involved."
    sampleAnswer: "A ticket is classified first. Abuse and spam are escalated without drafting. Other classes retrieve the matching policy and the customer's history, then the model drafts a reply with a quoted citation. Guardrail and code checks run on the draft, including the refund cap, and a human approves, edits or rejects it before anything is sent. Each decision is written to an audit log, and the metrics report summarises latency, cost, escalation and approval rates."
    explanation: "A strong answer keeps the order classify, retrieve, draft, check, approve, log, measure, and places the human at the approval seam. It should also note that abuse and spam skip drafting and that approval comes from outside the model."
  - id: "e3781482-8c56-471f-b9a8-86cd0b7777c3"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why a good AI product starts with a painful workflow rather than a model, and how the approval gate and a metric fit in."
    sampleAnswer: "Buyers pay to remove a repetitive, measurable, costly task, not to own a model. So you pick a workflow that has data and a clear cost of error, let the AI do the routine first part, and keep the judgment for a human. A human approval gate sits before anything leaves the company, and a metric such as the share of drafts approved without edits shows when the gate can be relaxed for one class."
    explanation: "The key ideas are workflow before model, the AI compressing the routine part, a human approving at the seam, and a metric that earns the right to loosen the gate. Mentioning the model first misses the central point."
```

---
id: "5b2c833f-6bcf-4e6c-9c2f-9c9cfaa89554"
title: "AI in Accounting: Useful vs Dangerous Question Bank"
description: "Practice questions for AI in Accounting: Useful vs Dangerous."
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
  - id: "4fb40ab9-7957-4083-841b-d27af9c255ad"
    revision: 1
    status: active
    type: single-choice
    prompt: "BoBo's AI assistant drafts May marketing commentary that cites a prior-year May figure of about $3,975. You never gave it prior-year data, and the 2024 GL shows $2,210. What best describes the problem?"
    options:
      - id: stale-data
        text: "The tool used an outdated copy of the 2024 ledger"
      - id: hallucination
        text: "The tool invented a plausible number with no source"
      - id: rounding
        text: "The tool rounded the real prior-year amount upward"
      - id: other-basis
        text: "The tool restated 2024 on a different accounting basis"
    correctOptionIds: [hallucination]
    explanation: "A hallucination is a confident, specific-looking output that has no basis in any supplied source, and you had supplied no prior-year data at all. A stale copy or a different basis would still trace back to some real document, but this number traces to nothing."
  - id: "a0af94f3-1b06-441b-81cb-0dce2f53e432"
    revision: 1
    status: active
    type: single-choice
    prompt: "You want the AI to draft the May variance paragraph without inventing facts. Which instruction is best grounded?"
    options:
      - id: generic
        text: "Explain May marketing using what you know about typical trends"
      - id: estimate
        text: "Draft May commentary and estimate any missing comparison figures"
      - id: memory
        text: "Draft May commentary from general training and polish the wording"
      - id: grounded
        text: "Draft May commentary using only this GL extract and cite each line"
    correctOptionIds: [grounded]
    explanation: "Grounding means forcing the AI to answer only from supplied source material, and asking for line citations lets you check each claim. Asking it to estimate missing figures invites exactly the fabricated numbers grounding is meant to prevent."
  - id: "a9db1106-591c-41e5-9bde-6ded2b99515b"
    revision: 1
    status: active
    type: single-choice
    prompt: "An AI summary of a 40-page SaaS contract states the auto-renewal date. Before you advise on renewing, what should you do?"
    options:
      - id: reopen
        text: "Open the contract, find the clause and confirm date and notice period"
      - id: trust-summary
        text: "Rely on the summary because the AI read every page and quoted the clause"
      - id: ask-twice
        text: "Ask the AI again and renew if both answers give the same date"
      - id: use-score
        text: "Accept the date if the tool reports a high confidence score"
    correctOptionIds: [reopen]
    explanation: "A summary is a map, not the terrain, so decisions must rest on the clause in the contract itself, including the notice period. Getting the same answer twice only shows the AI is consistent, not that it is right."
  - id: "d621d3a8-159b-45e0-a591-8dcad1d8049e"
    revision: 1
    status: active
    type: single-choice
    prompt: "An email appearing to come from a BoBo vendor asks to change their bank account, and the AI inbox tool offers to apply it. What is the correct treatment?"
    options:
      - id: apply-logged
        text: "Let the tool apply it and record the change in the audit log"
      - id: reply-email
        text: "Reply to the email asking the sender to confirm the new details"
      - id: callback
        text: "Call the vendor on a known number and get two human approvals"
      - id: review-after
        text: "Let the tool apply it and review the change after the next payment run"
    correctOptionIds: [callback]
    explanation: "Bank-detail changes are a classic fraud route, so you verify out-of-band on a number you already trust and require two people to approve. Replying to the same email only confirms the details with the person who may be the fraudster."
  - id: "d242ee42-414d-4d41-aee3-cba1aca91435"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your bank-feed tool offers auto-categorize and auto-post. Which setting should you use?"
    options:
      - id: both-on
        text: "Turn both on so every entry is categorized and posted with no manual delay"
      - id: post-only
        text: "Turn on posting only, since coding is quick to do by hand"
      - id: both-off
        text: "Turn both off, since AI should never see bank transactions"
      - id: suggest-only
        text: "Turn on suggestions only, and keep a person approving each post"
    correctOptionIds: [suggest-only]
    explanation: "Suggesting codes is reasonable AI work, but posting without review removes the human approval that protects the books. Turning everything off is too strict, because suggestions with review are one of the safe uses."
  - id: "1582932c-aee8-4ab8-9bda-d6dcb3bb423b"
    revision: 1
    status: active
    type: single-choice
    prompt: "An AI-written AR aging summary shows a 90+ bucket of $1,482, but your QuickBooks Online aging report shows $1,428. What do you do?"
    options:
      - id: use-qbo
        text: "Use the QBO figure, then investigate why the AI number differed"
      - id: use-ai
        text: "Use the AI figure because it is the newer calculation"
      - id: footnote-both
        text: "Footnote both figures and let the reader decide which applies"
      - id: ask-again
        text: "Ask the AI to recompute it and keep the answer it repeats"
    correctOptionIds: [use-qbo]
    explanation: "The system of record is authoritative, so the AI figure is replaced and the gap is investigated, which could be stale data, rounding or a hallucination. Letting the AI re-answer its own question does not tie anything back to source."
  - id: "ef6393e9-8384-4b97-b51a-ca27e35535d5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which tasks suit AI use at BoBo, provided a person reviews the result? Select all that apply."
    options:
      - id: draft-variance
        text: "Drafting variance commentary from a supplied GL extract"
      - id: release-pay
        text: "Releasing vendor payments once the AI marks them approved"
      - id: extract-invoices
        text: "Extracting invoice fields, then checking low-confidence ones"
      - id: post-recurring
        text: "Posting recurring journal entries straight into QBO"
      - id: summarize-contract
        text: "Summarizing a contract as a map before reading its clauses"
    correctOptionIds: [draft-variance, extract-invoices, summarize-contract]
    explanation: "Drafting, extracting and summarizing all produce output that a person checks against source before anything happens. Posting entries and releasing payments are write actions, so they stay with named human approvers; AI may queue them but never complete them."
  - id: "8368e09c-9c87-4c5d-9e8a-de4c3d86b919"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which guardrails belong in a month-end workflow where AI drafts variance commentary? Select all that apply."
    options:
      - id: fill-gaps
        text: "Let the AI estimate any comparison figure you did not supply"
      - id: pull-numbers
        text: "Pull the figures from QBO or the GL, then paste them in"
      - id: trust-score
        text: "Skip tying figures when the confidence score is high"
      - id: cite-lines
        text: "Require each driver to cite an invoice or GL line"
      - id: log-use
        text: "Log the prompt, sources, output, reviewer and decision"
    correctOptionIds: [pull-numbers, cite-lines, log-use]
    explanation: "Numbers come from the system, every claim carries a citation, and the interaction is logged so you can prove what the AI said versus what you decided. Estimating missing figures or trusting a high score both let unverified numbers through."
  - id: "05744472-0a50-487b-a6c6-0fec5a214c0a"
    revision: 1
    status: active
    type: true-false
    prompt: "A 96% confidence score on an extracted invoice total means you can post the total without checking the PDF."
    answer: false
    explanation: "Confidence is the model's own estimate, and models are often confidently wrong, especially on numbers. Treat it as a triage hint for deciding what to review first, never as proof that the total is right."
  - id: "d17efa78-21c9-4f38-aa14-e19f2b94f914"
    revision: 1
    status: active
    type: true-false
    prompt: "Because AI is probabilistic, the same input can give similar but not identical outputs, which is why AI cannot be the system of record."
    answer: true
    explanation: "Books of record must reproduce the same result from the same inputs so an auditor can re-perform it. An Excel formula does that; an AI model does not, so the model can assist but cannot be the authoritative record."
  - id: "6c4254bd-9607-41ee-a051-2ad3cb778e44"
    revision: 1
    status: active
    type: free-recall
    prompt: "A hiring manager asks, \"How do you use AI in your accounting work?\" Answer in your own words, covering what AI drafts, what you verify, and what it never does."
    sampleAnswer: "I use AI for first drafts such as variance commentary, contract summaries and checklists, and I pull the numbers from QBO or the GL myself so the AI only writes prose around them. I tie every figure to a source document, require citations, and keep a short log of prompts, sources and reviewers. AI never posts journal entries, releases payments, edits vendor master data or reaches tax conclusions, because those need named human approvers. AI assists the work; the controls stay with me."
    explanation: "A strong answer names both the leverage and the limits: drafting is allowed, verification against source is mandatory, and anything that writes to the books, moves money, or decides a tax position is human-only."
  - id: "19edf757-138f-499e-b584-b6cf14a6b859"
    revision: 1
    status: active
    type: free-recall
    prompt: "The owner asks an AI tool whether a new $9,000 espresso machine should be capitalized or expensed for tax. What is the right treatment of that request, and why?"
    sampleAnswer: "The AI may summarize the question, the company's capitalization policy and the tax considerations to raise, but it must not conclude. A qualified tax professional makes the decision, and I document the conclusion and rationale. Tax outcomes depend on specific facts and current law, and a wrong answer brings penalties and amended returns."
    explanation: "Tax conclusions are fact- and law-specific, so AI can frame the question but only a licensed tax professional answers it. Relying on the AI's answer would shift a penalty risk onto the company."
```

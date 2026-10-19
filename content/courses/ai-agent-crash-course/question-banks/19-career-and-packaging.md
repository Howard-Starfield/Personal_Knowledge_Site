---
id: "ac1bc044-85e5-416f-9950-3705a06b80c7"
title: "Career Proof, Consulting Offers, and Safe Packaging Question Bank"
description: "Practice questions for Career Proof, Consulting Offers, and Safe Packaging."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

This bank holds the practice questions for the career, consulting, and packaging lesson.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "ed1e085f-e5e1-4602-9941-ed6b96766439"
    revision: 1
    status: active
    type: single-choice
    prompt: "A shop owner wants one agent to answer customers and issue refunds with no human involved. Which first version should you propose?"
    options:
      - id: auto-refund
        text: "An agent that answers and refunds on its own, with logs reviewed daily"
      - id: draft-approve
        text: "A drafting assistant: AI proposes, a human clicks, both are logged"
      - id: small-limit
        text: "An agent that refunds small amounts itself and drafts only larger ones"
    correctOptionIds: [draft-approve]
    explanation: "Anything touching customers or money should start as draft-and-approve: the AI prepares, a person clicks, and the system logs both. Auto-refunding small amounts is tempting, but it still lets the agent move money without a human decision and gives you no approved-decision record to justify loosening the gate later."
  - id: "24b1ec59-14fc-43c8-9d7e-fb0a130fd396"
    revision: 1
    status: active
    type: single-choice
    prompt: "You are past the fourth question of a discovery call and still cannot name the client's painful workflow. What is the best move?"
    options:
      - id: end-politely
        text: "End the call politely, because not every prospect is a fit"
      - id: pitch-anyway
        text: "Start pitching your best offer to fill the gap in the talk"
      - id: hourly-start
        text: "Offer an hourly rate so scope can be sorted out after you begin"
      - id: free-pilot
        text: "Promise a free pilot so the workflow reveals itself later"
    correctOptionIds: [end-politely]
    explanation: "A discovery call is a diagnostic, not a pitch, and a project with no clear painful, measurable workflow will fail and hurt your reputation. Pitching or starting hourly work anyway is tempting but just moves the unknown into the engagement."
  - id: "bd3894c0-b186-4baa-acba-7e0081836d62"
    revision: 1
    status: active
    type: single-choice
    prompt: "A client wants a small pilot on customer order data this week, but no Data Processing Agreement is signed. What do you do?"
    options:
      - id: sample-first
        text: "Start with a sample of the data and sign the DPA after the pilot"
      - id: laptop-only
        text: "Start on your own laptop since the pilot is small and temporary"
      - id: pause-for-dpa
        text: "Pause the work until the DPA is signed and retention is written"
    correctOptionIds: [pause-for-dpa]
    explanation: "The DPA comes before any client data touches your machine, because the data may turn out to be regulated. Calling the pilot small or temporary does not change that; personal data in a sample is still personal data."
  - id: "51b8f902-d1a0-45f9-9071-addc1231301a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of these is a productized service rather than a vague offer?"
    options:
      - id: hourly-open
        text: "AI consulting at a flexible hourly rate, scope agreed as we go"
      - id: monthly-everything
        text: "Automation for everything, billed monthly until you are happy"
      - id: effort-priced
        text: "A chatbot project priced by effort once we see how it goes"
      - id: fixed-bundle
        text: "AI chatbot, $5,000, two weeks, with eval and security review"
    correctOptionIds: [fixed-bundle]
    explanation: "A productized service has fixed scope, fixed price, and a defined deliverable. Effort-based pricing sounds flexible but leaves scope open, which is exactly what invites scope creep."
  - id: "fbf6db65-300e-47b3-8a11-648236e0165b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which resume bullet best follows the course formula of a built system, its tools, a problem, and a trust or measurement feature?"
    options:
      - id: buzzword
        text: "Built an advanced next-generation AI agent that transforms how businesses use data"
      - id: measured-rag
        text: "Built a RAG assistant with FastAPI and BM25; a 50-case eval measured hit rate"
      - id: vague-work
        text: "Worked extensively on an exciting AI agent project using many modern tools and frameworks"
    correctOptionIds: [measured-rag]
    explanation: "A strong bullet names what was built, with what, for which problem, and shows a measurable result. The buzzword bullet has a verb but no referent or number, so it remains a claim rather than evidence."
  - id: "da894456-05dd-451c-84ce-9ac886d103e8"
    revision: 1
    status: active
    type: single-choice
    prompt: "You land three monthly retainers of $2,000 each and keep them for a full year. What recurring revenue is that, before any new projects?"
    options:
      - id: six-k
        text: "$6,000 per year"
      - id: twenty-four-k
        text: "$24,000 per year"
      - id: seventy-two-k
        text: "$72,000 per year"
      - id: forty-eight-k
        text: "$48,000 per year"
    correctOptionIds: [seventy-two-k]
    explanation: "Three retainers times $2,000 per month times 12 months is $72,000. The $24,000 figure is only one retainer for a year, and $6,000 is only one month of all three."
  - id: "197dcb9c-0d05-4ede-90f0-a9684040ff9b"
    revision: 1
    status: active
    type: single-choice
    prompt: "A friendly startup offers equity instead of cash for your first AI project. What does the course recommend as the default?"
    options:
      - id: cash-default
        text: "Prefer cash for early clients; equity is a bet, not a payment"
      - id: take-equity
        text: "Take the equity, since an early client may not afford a fixed price"
      - id: equity-with-control
        text: "Take the equity if they promise to follow your AI decisions"
    correctOptionIds: [cash-default]
    explanation: "The default for the first few clients is cash, and equity only comes after questions about dilution, vesting, and who holds control. A promise to follow your AI decisions does not turn an uncertain equity stake into payment."
  - id: "8bae5f8c-5a93-45f5-9483-ac08392cae7b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which signals should a promising discovery call reveal? Select every correct answer."
    options:
      - id: painful-workflow
        text: "A painful, repetitive, measurable workflow"
      - id: clean-data
        text: "Data that is clean enough to work with"
      - id: willing-human
        text: "A person willing to review the AI's output"
      - id: automate-all
        text: "A request to automate everything end to end"
      - id: uncapped-hourly
        text: "An uncapped hourly arrangement from day one"
    correctOptionIds: [painful-workflow, clean-data, willing-human]
    explanation: "The course looks for a painful, repetitive, measurable workflow, clean data, and a willing human in the loop. A request to automate everything is a warning sign, not a qualifying signal, because it hides the narrow workflow you actually need."
  - id: "4362a18b-b5d8-4f0b-a370-7a8ff984a4c7"
    revision: 2
    status: active
    type: multiple-select
    prompt: "Which items belong in your safeguards before and during a client engagement? Select every correct answer."
    options:
      - id: signed-dpa
        text: "A signed DPA before any client data arrives"
      - id: liability-cap
        text: "A liability clause capping exposure at fees paid"
      - id: demo-permission
        text: "Written permission before client data enters demos"
      - id: promise-accuracy
        text: "A promise of 100 percent accuracy on all answers"
      - id: keep-data
        text: "Keeping client data afterward for future evals"
    correctOptionIds: [signed-dpa, liability-cap, demo-permission]
    explanation: "Sign the DPA first, cap liability at fees paid (a lawyer should confirm what a cap can lawfully cover where you work), and get written permission before client data appears in demos or evals. Promising 100 percent accuracy is on the course's list of things never to promise, and keeping data afterward breaks the deletion policy."
  - id: "41ac364e-44af-4f6f-b102-61d493aeefaf"
    revision: 1
    status: active
    type: true-false
    prompt: "Revenue-share is a good default pricing model for a solo consultant's first ten clients."
    answer: false
    explanation: "Revenue-share needs a clean measurable baseline, deep client trust, and patience for six months or more, so the course says to avoid it for the first ten clients. Fixed productized pricing is the default."
  - id: "34958335-6582-4acb-a7fb-e6b3f4ced128"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: why is an approval-gated MVP the safest first version of a customer-facing agent, and what does the system record?"
    sampleAnswer: "The AI drafts the reply or action, a human reviews and clicks approve, and the system logs both the draft and the human decision. That keeps legal and customer-trust decisions with a person while the agent still does most of the work. The log also builds the evidence that could justify loosening the gate later."
    explanation: "A strong answer names the draft, the human click, and the logging of both, and connects the gate to safety and to later evidence."
  - id: "bfb9633a-d372-49ea-a504-e5843f961225"
    revision: 2
    status: active
    type: free-recall
    prompt: "A client asks you to fine-tune a model on their customers' chat logs. What should you check before agreeing?"
    sampleAnswer: "Check whether customers were told their data may train AI, whether there is an opt-out, and whether personal data is scrubbed before training. Ask where training runs and what happens to the data afterward, whether the resulting model could contain personal data, and how an erasure request under privacy law such as the GDPR would be handled, noting that the right is not absolute. Decline until each answer is in writing."
    explanation: "The answer should cover consent, opt-out, scrubbing, where training runs, model contents, and deletion or erasure rights, and end with a written requirement rather than a verbal assurance."
```

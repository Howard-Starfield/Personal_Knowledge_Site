---
id: "0f0a8868-41fb-4fec-819f-1f7152c0a50d"
title: "Capstone Business Agent OS Question Bank"
description: "Practice questions for Capstone Business Agent OS."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

Practice questions covering seams, request tracing, approval gating, fallback routing, and packaging for the Business Agent OS capstone.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "27d50336-9e6e-44b2-83b6-32e2c9d67139"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your chunker emits UUID chunk ids, but the memory module stored sequential integers. Each module passes its own tests. What goes wrong once they are wired together?"
    options:
      - id: unit-failure
        text: "Each module's own tests start failing after integration"
      - id: seam-mismatch
        text: "Memory citations point at chunks that do not exist"
      - id: prompt-length
        text: "The model runs out of room in the context window"
      - id: worker-count
        text: "Gunicorn needs more workers to hold the larger ids"
    correctOptionIds: [seam-mismatch]
    explanation: "The id shape disagrees at the boundary between chunker and memory, so provenance references resolve to nothing. This is a seam bug that passes in isolation, which is why the unit-test option is wrong: the modules each still behave correctly alone."
  - id: "67abe793-2581-4cf7-80ea-4ec911baf4aa"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the capstone carry the request id in a context variable instead of passing it as a function argument?"
    options:
      - id: ctxvar
        text: "Any module can read the current id at log time with no signature changes"
      - id: unguessable
        text: "A context variable makes the id impossible for a client to guess"
      - id: persist
        text: "The id then survives after the request has finished processing"
      - id: no-table
        text: "It removes the need for a shared audit table across modules"
    correctOptionIds: [ctxvar]
    explanation: "Reading the id from a context variable lets audit, retriever, router, and composer tag their rows without every function taking an extra parameter. It does not make the id secret or replace the shared audit table; it only carries the id through one request."
  - id: "f4214874-8656-4736-8169-aeb981cb21f7"
    revision: 1
    status: active
    type: single-choice
    prompt: "A developer renames the tool send_email to email_send but forgets to update the permission scope map. Following the chapter's rule, what should the runner do?"
    options:
      - id: default-allow
        text: "Apply a default scope so the renamed tool keeps working"
      - id: warn-run
        text: "Run the tool but write a warning line into the audit log"
      - id: refuse
        text: "Refuse to run the tool because it has no declared scope"
      - id: ask-model
        text: "Let the model decide which scope the new name should get"
    correctOptionIds: [refuse]
    explanation: "A tool with no declared scope must refuse to run, so a rename cannot quietly turn the guardrail off. Running it with a warning is tempting, but a logged warning still lets an unscoped action execute."
  - id: "8d28fb4b-9bd1-4d07-8b53-b408db980cbb"
    revision: 2
    status: active
    type: single-choice
    prompt: "The dashboard's HTMX partial shows raw JSON after you click a button. What is the most likely fix?"
    options:
      - id: json-gzip
        text: "Keep the JSON response and compress it with gzip"
      - id: more-workers
        text: "Raise the Gunicorn worker count to match CPU cores"
      - id: native-path
        text: "Point the handler at the native chat API path instead"
      - id: html-response
        text: "Return an HTML response because HTMX swaps HTML text"
    correctOptionIds: [html-response]
    explanation: "HTMX inserts the response body into the target as markup, so a handler that returns JSON shows raw JSON text, and an error status is not swapped by default so it can show nothing. Compression or extra workers change delivery, not the body format the swap expects."
  - id: "4dd09011-c552-4ae1-ad60-4faae1746a74"
    revision: 2
    status: active
    type: single-choice
    prompt: "Your router calls a local Ollama server through an OpenAI-style client. The model is already pulled and its tag is correct, yet calls return 404. What should you change?"
    options:
      - id: native-chat
        text: "Switch the client to the native /api/chat path only"
      - id: compat-path
        text: "Point the router at the /v1/chat/completions path"
      - id: model-tag
        text: "Rename the model tag to a shorter local name"
      - id: add-auth
        text: "Add basic auth in front of the local Ollama server"
    correctOptionIds: [compat-path]
    explanation: "Ollama's OpenAI-compatible endpoint is /v1/chat/completions, which lets the router treat it as a drop-in. The native path is /api/chat, so using it is tempting, but it has its own request and response shape (the reply is under message, not choices) that an OpenAI-style client does not parse."
  - id: "b926d610-a151-4743-ad21-6a423df3b4b7"
    revision: 1
    status: active
    type: single-choice
    prompt: "A small-business owner watches your demo. Which moment best shows the safety they cannot get from a no-code chatbot?"
    options:
      - id: cited-answer
        text: "The refund answer arriving with a clickable citation"
      - id: fast-reply
        text: "The answer arriving faster than a competitor's chatbot"
      - id: paused-email
        text: "The requested email pausing in the approval queue"
      - id: diagram-view
        text: "The architecture diagram appearing at the end of the demo"
    correctOptionIds: [paused-email]
    explanation: "Seeing an external action wait for human approval is visible proof the agent will not act alone. A cited answer is valuable but exists on many chatbots, so it is not the differentiator."
  - id: "9564ac7f-a09c-416d-b42e-fc04d15c0891"
    revision: 1
    status: active
    type: single-choice
    prompt: "After adding a reranker, retrieval hit rates rose but answer quality fell. What is the best next step?"
    options:
      - id: split-metrics
        text: "Measure retrieval and answers separately, then inspect the composer"
      - id: drop-reranker
        text: "Remove the reranker since retrieval evals cannot be trusted"
      - id: tune-prompt
        text: "Tune the answer prompt until the golden score recovers"
      - id: swap-store
        text: "Replace the vector database with a different product"
    correctOptionIds: [split-metrics]
    explanation: "A reranker can put a chunk first that answers a different facet, or the composer may drop context too aggressively, so retrieval and answer quality must be measured apart. Tuning the prompt first is tempting but hides where the regression actually starts."
  - id: "13a1c363-c7b0-4acf-9867-644071e51af9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are cross-module contracts the chapter says to write in SEAMS.md before coding? Select every correct answer."
    options:
      - id: chunk-id
        text: "The chunk id shape shared by the chunker and memory provenance"
      - id: tool-scope
        text: "The tool name that the permission scope map looks up"
      - id: case-id
        text: "The case id shared by the golden set and eval reports"
      - id: python-pin
        text: "The Python version pinned in the project configuration"
      - id: folder-order
        text: "The alphabetical order of the top-level folders"
    correctOptionIds: [chunk-id, tool-scope, case-id]
    explanation: "Seams are places where data crosses a module boundary and must agree: chunk ids, tool names against scope maps, and case ids across golden sets and reports. A Python version pin or folder ordering is project configuration, not a data contract between two components."
  - id: "09c4fa7c-b996-4a5d-9e57-d7837facd727"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which measures protect against indirect prompt injection in retrieved documents? Select every correct answer."
    options:
      - id: strip-comments
        text: "Strip HTML comments from sources before the model sees them"
      - id: wrap-untrusted
        text: "Wrap untrusted text in a delimiter the system prompt warns about"
      - id: flag-imperatives
        text: "Flag documents that address the assistant for human review"
      - id: trust-corpus
        text: "Trust any document that comes from the company's own corpus"
      - id: trust-score
        text: "Trust any chunk whose relevance score is above a threshold"
    correctOptionIds: [strip-comments, wrap-untrusted, flag-imperatives]
    explanation: "Sanitizing sources, delimiting untrusted text, and reviewing suspicious documents at ingestion all reduce injection risk. Trusting a company document or a high relevance score is tempting, but a relevant chunk can still carry hidden instructions."
  - id: "50a825f8-c6eb-499e-964e-a718cb48f65e"
    revision: 1
    status: active
    type: true-false
    prompt: "A 6 percent fallback rate to the local Ollama model is bad news regardless of its cause."
    answer: false
    explanation: "It depends on the cause. If the API was down, the fallback saved those requests; if the budget cap fired, the cap or traffic mix needs investigating. That is why the dashboard should track fallback rate and alert above a threshold."
  - id: "19cff6af-6266-4ecf-9f50-f1a461150b6a"
    revision: 1
    status: active
    type: free-recall
    prompt: "A friend wants to skip guardrails, the approval queue, and the audit log to ship the demo faster. Explain what you would tell them."
    sampleAnswer: "Skipping them does not save time, it moves the cost later. Without an approval queue there is no safe story for a real customer, without red-team tests there is no pass criterion, and without an audit log you cannot reconstruct an incident. Retrofitting every tool, log, and screen afterwards is more work, and the moments the agent refused to act are the reason a small business would pay for it."
    explanation: "Good answers name the missing approval story, red-team criterion, and audit trail, and note that retrofitting costs more than building them first."
  - id: "8a38a87e-b588-429a-9930-4a19d2e13e6b"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why wiring earlier chapters into one capstone finds bugs that separate notebooks hide, using one seam as an example."
    sampleAnswer: "Each component was only tested alone, so the contracts between them were never exercised. When they share one process, mismatches appear, for example the chunker emitting UUID chunk ids while the memory module expects integers, so citations point at chunks that do not exist. A shared types file, a seams list, and a request id test make those contracts explicit and fixable."
    explanation: "A strong answer names the idea that bugs live at boundaries and gives a concrete seam such as chunk ids, tool names against scopes, or request id propagation."
```

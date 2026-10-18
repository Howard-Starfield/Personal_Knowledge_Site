---
id: "e361abe1-1366-4692-8e7c-81d51ba68d60"
title: "Enterprise LLM Systems Question Bank"
description: "Practice questions for Enterprise LLM Systems."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

This bank holds practice questions on access control, logging, cost, routing, and escalation in an enterprise RAG assistant.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "a0e70119-d4bb-4c63-a765-33f4513f9658"
    revision: 1
    status: active
    type: single-choice
    prompt: "Alice has the USER role and asks about manager-only goals. Where should the permission rule be enforced?"
    options:
      - id: post-filter
        text: "In Python after top-k returns, dropping every chunk her role cannot read"
      - id: in-query
        text: "In the vector query, as a metadata filter applied before ranking"
      - id: prompt-rule
        text: "In the system prompt, telling the model to hide any manager-only content"
      - id: ui-hide
        text: "In the frontend, by hiding every citation she is not allowed to open"
    correctOptionIds: [in-query]
    explanation: "A metadata filter inside the vector query means forbidden chunks are never returned to application code, so the model cannot see them. Filtering in Python after retrieval is the tempting option, but the chunks were already loaded and could reach logs or crash dumps. Prompt and frontend rules only hide data that has already left the database."
  - id: "5b010ba1-15e2-4693-afdd-f7dfd8cc71f7"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team fetches the top 5 chunks and then drops forbidden ones. For Alice, 4 of those 5 are ADMIN-only. What is the main problem?"
    options:
      - id: shown-anyway
        text: "The forbidden chunks are still shown to her because the filtering comes too late"
      - id: no-effect
        text: "Nothing changes, because the ranking order is unaffected by filtering afterward"
      - id: cheaper-tier
        text: "The router drops to a cheaper model tier because fewer chunks arrive"
      - id: crowded-out
        text: "Only one visible chunk is left, so her best answer may be missed"
    correctOptionIds: [crowded-out]
    explanation: "The top-k slots were spent on chunks she cannot read, so a relevant visible chunk ranked sixth is never considered. The late filter does hide the forbidden chunks from her, so the tempting claim that they are shown is wrong. The real harms are crowded-out answers and forbidden data loaded into memory and traces."
  - id: "cfe5fa22-4d05-48cb-8805-f672a9683ca8"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which component should decide who may see which document?"
    options:
      - id: gateway
        text: "The API gateway, which checks a verified role before the model sees data"
      - id: model
        text: "The model, which is told the user's role and judges each retrieved document itself"
      - id: template
        text: "The prompt template, which contains a rule to answer only from the given sources"
      - id: embedder
        text: "The embedding model, which learns to give forbidden text very low scores"
    correctOptionIds: [gateway]
    explanation: "The gateway is the trust boundary: it authenticates the request, reads the role, and applies the filter before the model sees anything. Asking the model to judge is tempting but fails, because a prompt injection can talk it out of the rule. The model is treated like a co-worker who can leak whatever it reads, not like a security guard."
  - id: "5b748a4e-b083-4469-b9b7-d81d3a3c62f6"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the lab prices for gpt-5.2-mini ($0.15 per 1M input tokens, $0.60 per 1M output tokens), what does a call with 812 input and 134 output tokens cost?"
    options:
      - id: input-only
        text: "$0.000122, from the input tokens alone"
      - id: decimal-slip
        text: "$0.00202, after a decimal slip in the million divisor"
      - id: correct-cost
        text: "$0.000202, from input plus output cost"
      - id: swapped
        text: "$0.000507, with the two prices swapped"
    correctOptionIds: [correct-cost]
    explanation: "Input costs 812 x 0.15 = 121.8 and output costs 134 x 0.60 = 80.4, a total of 202.2, which divided by 1,000,000 is about $0.000202. Counting only input tokens gives $0.000122 and ignores the output charge. Swapping the prices gives $0.000507, which overstates the cost because the cheaper rate belongs to the larger token count."
  - id: "d403d7f1-e805-4b37-b817-1e4ae077afb0"
    revision: 1
    status: active
    type: single-choice
    prompt: "An ADMIN request uses the chain gpt-5.2, then gpt-5.2-mini, then local Ollama. The first two calls raise errors. What happens?"
    options:
      - id: fails-fast
        text: "The request fails at once because the primary model was unavailable"
      - id: local-answers
        text: "The local model answers and the result marks fallback_used as true"
      - id: retry-primary
        text: "The router keeps retrying gpt-5.2 until the provider recovers"
      - id: cached-reply
        text: "The router returns the last successful reply from its stored cache"
    correctOptionIds: [local-answers]
    explanation: "The router walks the chain in order, catching each error, and the first model that succeeds answers; the result records that a fallback was used. Failing at once is tempting but is exactly what a chain prevents. Only if every model in the chain fails does the router raise an error."
  - id: "e4cbc065-30fc-45f0-a4be-d7fd67e74f43"
    revision: 1
    status: active
    type: single-choice
    prompt: "The best retrieval score for a question is 0.22 and the escalation threshold is 0.35. What should the assistant do?"
    options:
      - id: general-knowledge
        text: "Answer from the model's general knowledge at a lower temperature"
      - id: raise-role
        text: "Retry the search with the user's role raised to ADMIN"
      - id: disclaimer
        text: "Answer from the best chunk and add a disclaimer about confidence"
      - id: open-ticket
        text: "Open a support ticket and tell the user a human will follow up"
    correctOptionIds: [open-ticket]
    explanation: "A score under the threshold means the sources probably do not answer the question, so the safe path is a ticket and a human follow-up without calling the model. Answering anyway with a disclaimer is tempting but still ships a likely hallucination. Raising the role would break the permission model."
  - id: "ab39db53-23e0-441d-8af6-1d13eb174697"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your OpenAI bill rose roughly tenfold overnight. Which first step best locates the cause?"
    options:
      - id: cost-log
        text: "Group the cost log by user, feature, and model to find the jump"
      - id: retrieval-log
        text: "Sort the retrieval log by similarity score to find the weakest matches"
      - id: feedback-log
        text: "Filter the feedback log to yesterday's thumbs-down votes from users"
      - id: request-log
        text: "Read the request log alone, since it lists every question that was asked"
    correctOptionIds: [cost-log]
    explanation: "The cost log records model, tokens, and USD per call, so grouping it shows which user, feature, or model drove the jump, such as a runaway loop or a stolen key. The request log shows who asked what but not what it cost. Retrieval and feedback logs answer quality questions, not spend questions."
  - id: "ecc08f23-e167-431d-9086-6fc348be03ca"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which are real reasons that filtering retrieved chunks after the vector search is unsafe? Select all that apply."
    options:
      - id: in-memory
        text: "Forbidden chunks are already loaded and may reach logs or crash dumps"
      - id: too-slow
        text: "Python list filtering is too slow to run over even five results"
      - id: crowds-topk
        text: "The top-k ranking is crowded by chunks the user cannot see"
      - id: trace-records
        text: "The trace records that forbidden chunks were fetched for this query"
      - id: no-metadata
        text: "Metadata fields are unavailable to Python code once the query returns"
    correctOptionIds: [in-memory, crowds-topk, trace-records]
    explanation: "Post-filtering loads forbidden data, wastes top-k slots, and leaves an audit trail showing the data was fetched. Speed is not the problem, since filtering five results is trivial. Metadata is in fact returned with results, which is why post-filtering looks easy and is so tempting."
  - id: "82af4f6f-adfa-454f-85f6-3006f3c81d46"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which items belong in the per-call audit and cost record? Select all that apply."
    options:
      - id: jwt-secret
        text: "The secret that signs tokens, so auditors can verify them"
      - id: who-what
        text: "User ID, timestamp, and the retrieval IDs that were returned"
      - id: model-cost
        text: "Model name, input tokens, output tokens, and a USD estimate"
      - id: reply-only
        text: "Only the final model reply, since inputs can always be rebuilt"
    correctOptionIds: [who-what, model-cost]
    explanation: "An auditor needs to know who asked, when, which chunks were retrieved, and what the call cost. A signing secret must never be logged, even though verification sounds like a good reason. Logging only the reply makes why-questions unanswerable because retrieval state is lost."
  - id: "3649dc7d-094b-412d-9374-7881976ff992"
    revision: 1
    status: active
    type: true-false
    prompt: "A system prompt that says answer only from the sources is enough, on its own, to defend against prompt injection."
    answer: false
    explanation: "The instruction is necessary but not sufficient, because an injected instruction can compete with it. Real defense adds input guardrails, output guardrails, and the retrieval filter so the model never holds forbidden data. Treating the prompt as the security control is the common mistake."
  - id: "b7ac6df3-90c4-42b7-b995-2494ea5033e0"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, how does an enterprise RAG assistant decide what a user may see, what it logs, and what it does when it cannot answer with confidence?"
    sampleAnswer: "The gateway verifies the user's token and reads the role. That role becomes a metadata filter inside the vector query, so forbidden documents are never returned and the model only sees allowed chunks. Each call writes request, retrieval, and cost records so any past answer can be reconstructed and spend can be traced. A router picks a model tier by role and falls back down a chain if a provider fails. If the best retrieval score is below the threshold, the bot opens a support ticket for a human instead of guessing."
    explanation: "A strong answer covers the filter-before-search rule, the trust boundary at the gateway, the three logs, the router, and escalation. The common gap is placing permissions in the prompt, which fails under prompt injection."
  - id: "8395ef2d-351e-40fe-8824-957cdfbcff49"
    revision: 1
    status: active
    type: free-recall
    prompt: "A new engineer proposes deleting the where filter and instead telling the model to ignore documents above the user's role. Write a short reply explaining why this is unsafe and what the system should do."
    sampleAnswer: "The model is not a security boundary. Once forbidden chunks reach it, a prompt injection or a poisoned document can make it leak them, and the chunks also appear in traces and memory. The filter must stay in the vector query so forbidden documents are never returned. We should also keep a regression test that queries as a USER and asserts no ADMIN-only chunk appears in the citations."
    explanation: "A good reply names the trust boundary, the leak paths, and the regression test. The tempting but weak answer is that a firm prompt instruction is just as good as a database filter."
```

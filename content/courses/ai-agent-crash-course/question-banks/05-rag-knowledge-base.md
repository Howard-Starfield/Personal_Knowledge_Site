---
id: "38ff08b5-119a-459b-90fc-d84a690ceda6"
title: "Build a RAG Knowledge Base Question Bank"
description: "Practice questions for Build a RAG Knowledge Base."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

Practice questions on retrieval-augmented generation: chunking, retrieval, grounded answers, refusal, injection defence and evaluation.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f2258c4b-629f-4580-abce-68cc2474ec0f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your support bot says digital downloads have a 30-day refund window. The refund policy says nothing of the kind, yet the retrieved chunks include the correct digital goods paragraph. What is the most likely failure?"
    options:
      - id: retrieval-miss
        text: "Retrieval missed the right chunk, so raise top-k"
      - id: grounding-gap
        text: "Generation ignored the evidence, so tighten grounding"
      - id: stale-index
        text: "The index is stale, so re-run the ingestion script"
      - id: tiny-chunks
        text: "Chunks are too small, so grow the target token size"
    correctOptionIds: [grounding-gap]
    explanation: "The right evidence was retrieved, so the invention happened at generation: the prompt was not strict enough about answering only from context. Raising top-k addresses a missing chunk, which is not the problem here."
  - id: "91aaf8df-6f7f-465b-ab53-cb2dd80d04d4"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the chapter's code the best retrieved distance for a question is 0.92 and the threshold is 0.85. What does the pipeline do?"
    options:
      - id: refuse-early
        text: "It returns the refusal text and skips the chat model call"
      - id: warn-model
        text: "It calls the chat model with a low-confidence warning note"
      - id: best-chunk
        text: "It calls the chat model with only the single best chunk"
      - id: model-decides
        text: "It lets the chat model itself decide whether to refuse or answer"
    correctOptionIds: [refuse-early]
    explanation: "The gate compares the best distance to the threshold before any generation, and a distance above it triggers the exact refusal string. Letting the model decide would give a soft refusal path that models tend to ignore."
  - id: "f34c1ac2-662c-4b0f-9b58-16ee65ce9e8a"
    revision: 1
    status: active
    type: single-choice
    prompt: "A teammate treats Chroma's returned score as a similarity and sorts chunks from highest to lowest before building the prompt. What goes wrong with a cosine collection?"
    options:
      - id: slow-search
        text: "The search becomes much slower because every result is re-sorted"
      - id: duplicate-chunks
        text: "The same chunk appears twice inside the assembled prompt text"
      - id: farthest-first
        text: "The least relevant chunks come ahead of the closest"
      - id: no-citations
        text: "The citation tags can no longer be matched back to chunk ids"
    correctOptionIds: [farthest-first]
    explanation: "Chroma returns distance, where lower means closer, so sorting descending puts the farthest chunks first. The citation ids are unaffected because they come from the chunk ids, not from the scores."
  - id: "3f966449-078a-4e79-a4f0-2edef0db0daf"
    revision: 2
    status: active
    type: single-choice
    prompt: "You ingested with one embedding model, but the chat script embeds questions with a different model that outputs vectors of the same length. What is the result?"
    options:
      - id: slightly-worse
        text: "Retrieval still works but is a little less accurate than before"
      - id: meaningless
        text: "Distances across the two vector spaces are meaningless"
      - id: auto-convert
        text: "Chroma quietly converts the query vectors to the stored model"
      - id: only-threshold
        text: "Only the refusal threshold needs to be retuned afterwards by hand"
    correctOptionIds: [meaningless]
    explanation: "Each model defines its own vector space, so a query vector and stored vectors from different models cannot be compared, and same-length vectors raise no error. Retuning the threshold would not help, which is why the chapter suggests storing the model name with the collection. If the lengths differed, Chroma would raise a dimension error instead."
  - id: "f3945b3c-bb76-4c83-a1ee-6f45946207ac"
    revision: 1
    status: active
    type: single-choice
    prompt: "An eval shows 92% retrieval hit rate but only 70% faithfulness. Which fix should come first?"
    options:
      - id: bigger-k
        text: "Increase top-k so more chunks reach the prompt"
      - id: new-embedder
        text: "Switch to a larger embedding model and re-ingest"
      - id: hybrid-search
        text: "Add keyword search alongside the vector search"
      - id: stricter-prompt
        text: "Tighten the prompt, lower temperature, enforce citations"
    correctOptionIds: [stricter-prompt]
    explanation: "A high hit rate means the right chunks are arriving, so the model is inventing on top of good evidence. Changing retrieval would not fix a generation problem, and the chapter notes that generation fixes are the cheaper ones."
  - id: "4edf439b-e2cf-4c43-bd42-201b196b9508"
    revision: 2
    status: active
    type: single-choice
    prompt: "You sweep top-k from 3 to 8 on a 12-item in-scope set and the hit rate stays flat at 83% (10 of 12). What does this most strongly suggest?"
    options:
      - id: k-too-low
        text: "Top-k is still too low, so keep sweeping upward to a value of 20"
      - id: judge-broken
        text: "The faithfulness judge is returning unreliable scores for these items"
      - id: not-indexed
        text: "The missing answers cannot be reached by retrieving more"
      - id: threshold-wrong
        text: "The refusal threshold is hiding the correct chunks from the prompt"
    correctOptionIds: [not-indexed]
    explanation: "If a larger k never finds the missing chunks, they are not retrievable that way: chunking may split the text badly or the documents may lack the answer. The faithfulness judge does not affect hit rate, which only checks retrieval."
  - id: "c1d7038a-23ac-422d-b6b8-4e362bcf535d"
    revision: 1
    status: active
    type: single-choice
    prompt: "A retrieved FAQ chunk ends with a line telling the model to reply with its system prompt. Why is this called indirect prompt injection?"
    options:
      - id: via-document
        text: "It arrives through retrieved text, not from the user"
      - id: via-user
        text: "The user typed the instruction into the chat box directly"
      - id: via-system
        text: "The developer wrote the instruction into the system prompt text"
      - id: via-embedder
        text: "The embedding model changed the meaning of the line on its way in"
    correctOptionIds: [via-document]
    explanation: "The hostile instruction hides in data that retrieval places into the context window, so the user never types it. A direct injection would come from the user message itself."
  - id: "4027f851-d2e8-4432-b323-93117b66516f"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The right chunk is missing from the top-k results. Which changes target this retrieval problem? Select every correct answer."
    options:
      - id: hybrid
        text: "Add keyword search next to vector search"
      - id: rerank
        text: "Re-order the top results with a reranker"
      - id: rewrite
        text: "Rewrite the user query before searching"
      - id: cooler
        text: "Lower the chat model temperature to 0.1"
      - id: cite-rule
        text: "Require an inline citation after every claim"
    correctOptionIds: [hybrid, rerank, rewrite]
    explanation: "Hybrid search, reranking and query rewriting all change what evidence reaches the prompt. Lower temperature and citation rules shape how the model writes after retrieval, so they cannot restore a chunk that was never retrieved."
  - id: "aca08e15-5421-4013-996b-d660ad3f13cf"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Customers must never see staff-only SOP chunks. Which controls actually enforce that? Select every correct answer."
    options:
      - id: role-filter
        text: "Filter by an access level tag at retrieval time"
      - id: recheck-acl
        text: "Recheck the source permissions when retrieving"
      - id: prompt-ask
        text: "Ask the model in the prompt to hide staff content"
      - id: hide-panel
        text: "Hide the citation panel from customer accounts"
    correctOptionIds: [role-filter, recheck-acl]
    explanation: "Access has to be enforced before text reaches the model, by filtering on tags and rechecking upstream permissions. A prompt request depends on the model obeying it, and hiding citations does not stop the text being used."
  - id: "32b4ec06-2679-445b-93d1-ee9f7cfe1f25"
    revision: 1
    status: active
    type: true-false
    prompt: "If every citation tag in an answer points to a chunk that was actually retrieved, the answer is guaranteed to be faithful to the documents."
    answer: false
    explanation: "Citation accuracy only checks that the cited ids were retrieved. The answer can still contain claims the cited chunk does not support, which is why faithfulness is measured separately."
  - id: "6f204c8a-ee33-4bb9-9318-16535a8b01e2"
    revision: 1
    status: active
    type: free-recall
    prompt: "A support bot gives correct-sounding answers that are not in the documents. Name the four candidate causes and how you would test each."
    sampleAnswer: "Retrieval failure: check the hit rate on the eval set, since the right chunk is not in top-k; fix with chunking, hybrid search, reranking or higher k. Grounding failure: the prompt is too soft, so tighten answer-only-from-context and lower temperature. Citation gap: the model states facts without citation tags, so parse and reject uncited answers. Missing source: the documents do not cover the topic, so ingest the document or extend refusal."
    explanation: "A strong answer separates retrieval, grounding, citation enforcement and missing data, and attaches a different test to each so the fix targets the right stage."
  - id: "3179f36d-5859-48bd-af44-75ec7e7d1313"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain in your own words how a RAG chatbot turns a question into a cited answer or an exact refusal, and which two metrics show where it breaks."
    sampleAnswer: "The question is embedded and the closest chunks are retrieved from the vector store with distances. If the best distance is worse than the threshold the bot returns the exact refusal. Otherwise a prompt holds the chunks with citation ids and an answer-only-from-context rule, and the model replies with citations. Retrieval hit rate shows whether the retriever found the right chunk, and faithfulness shows whether the answer stays within the retrieved text."
    explanation: "Look for the full flow from embedding to gate to grounded generation, plus the pairing of hit rate with the retriever and faithfulness with the generator."
```

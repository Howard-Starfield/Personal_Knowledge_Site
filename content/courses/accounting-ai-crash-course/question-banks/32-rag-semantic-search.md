---
id: "b02badf9-b4a5-4714-a91c-83dffb0db580"
title: "RAG and Semantic Search for Accounting Documents Question Bank"
description: "Practice questions for RAG and Semantic Search for Accounting Documents."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
---

These practice questions use the fictional BoBo Digital Services LLC case study; every document name and figure is sample data.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "43dbdc37-476d-42c6-8948-d87e17118dfe"
    revision: 1
    status: active
    type: single-choice
    prompt: "A new hire asks a general chatbot for BoBo's contractor meal limit and gets a confident figure. What would make a RAG vault more trustworthy for this question?"
    options:
      - id: more-data
        text: "It was trained on a larger sample of public internet pages"
      - id: grounded
        text: "It answers only from passages retrieved from BoBo's own files"
      - id: longer
        text: "It writes longer and more detailed answers than a chatbot would"
      - id: faster
        text: "It replies in eight seconds instead of minutes of manual searching"
    correctOptionIds: [grounded]
    explanation: "A RAG vault retrieves the relevant passages from BoBo's own documents first and tells the LLM to answer only from them, so the figure can be traced to a page. Speed is a real benefit and is tempting, but a fast answer with no source is still unverifiable."
  - id: "8b05f200-1ed4-4d19-a487-b0e521c94fa3"
    revision: 1
    status: active
    type: single-choice
    prompt: "The policy says \"per diem for independent contractors.\" A user searches the vault for \"1099 meal allowance\" and still gets the right paragraph. Why?"
    options:
      - id: exact-words
        text: "Both phrases contain the same exact words in the policy text"
      - id: ctrl-f
        text: "The system ran a faster Ctrl-F across every document at once"
      - id: memory
        text: "The system remembered an earlier search from the same user"
      - id: meaning
        text: "Embeddings of question and paragraph sit close by meaning"
    correctOptionIds: [meaning]
    explanation: "Semantic search turns the question and each paragraph into embeddings, which are lists of numbers that represent meaning, and returns the paragraphs nearest to the question. A faster Ctrl-F is tempting, but Ctrl-F matches exact words only and would find nothing for these two phrases."
  - id: "63033d0f-c616-4fd9-8886-a41979e56f43"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team splits every document into one-sentence chunks. Answers keep missing qualifiers such as \"only when traveling outside the home metro area.\" What is the best diagnosis?"
    options:
      - id: too-small
        text: "Chunks are too small, so the clause sits apart from its rule"
      - id: too-large
        text: "Chunks are too large, so retrieval drags in unrelated context"
      - id: high-k
        text: "Top-K is set too high, so the clause is pushed out of results"
      - id: wide-vector
        text: "The embedding model produces too many numbers per chunk"
    correctOptionIds: [too-small]
    explanation: "A one-sentence chunk loses the surrounding context, so the qualifying clause sits in a different chunk from the rule it limits. Oversized chunks are a real problem too, but they cause drifting answers full of irrelevant text, not missing qualifiers."
  - id: "ad17be36-dd63-4c7d-b3ee-770274edad20"
    revision: 1
    status: active
    type: single-choice
    prompt: "A staff accountant must never see payroll content through the vault. Where should the permission filter run?"
    options:
      - id: after-answer
        text: "After generation, by removing payroll terms from the LLM's answer"
      - id: in-prompt
        text: "In the system prompt, by instructing the LLM to keep payroll secret"
      - id: at-retrieval
        text: "At retrieval time, so unauthorized chunks never reach the LLM"
      - id: in-menu
        text: "In the search screen, by hiding payroll files from the menu"
    correctOptionIds: [at-retrieval]
    explanation: "Filtering chunks by the user's permission scope before the LLM is invoked means the model never holds data the user may not see. Asking the LLM to keep a secret is tempting, but a model that has seen the text can be nudged into repeating it."
  - id: "48cbc72a-3306-45da-9a24-5eb12c83bced"
    revision: 1
    status: active
    type: single-choice
    prompt: "The vault says contractors get up to $75 per day for meals, but the cited page 4 of the reimbursement policy says $60. What do you do?"
    options:
      - id: use-source
        text: "Use the $60 on the page and tell the system owner about it"
      - id: trust-ai
        text: "Use the $75 figure, since the AI read every document in the vault"
      - id: attach
        text: "Use $75 and attach the citation so the auditor can check it later"
      - id: re-ask
        text: "Ask the chatbot again until it returns the figure from the page"
    correctOptionIds: [use-source]
    explanation: "The cited document is the authority, so you use its $60 and tell the system owner so the grounding or retrieval bug can be fixed. Attaching the citation to the wrong figure is tempting, but it hands the auditor a claim that its own support contradicts."
  - id: "f2a4b8bd-1b40-4e41-a9a6-f1e66b12d8ff"
    revision: 1
    status: active
    type: single-choice
    prompt: "Finance wants every document that mentions purchase order number 48213. Which approach fits best?"
    options:
      - id: semantic-only
        text: "Semantic search alone, since embeddings capture every kind of match"
      - id: hybrid
        text: "Hybrid search, so keyword matching catches the exact PO number"
      - id: rerank
        text: "Re-ranking alone, since it re-orders results by true relevance"
      - id: large-k
        text: "Semantic search with a very large K, to catch every PO number"
    correctOptionIds: [hybrid]
    explanation: "A PO number is an exact identifier, so keyword matching handles it better, and hybrid search combines that with meaning-based search. Re-ranking is tempting, but it only re-orders chunks that were already retrieved and cannot find an exact ID that retrieval missed."
  - id: "f5771136-279d-4c07-9d0e-0cbcbdbe8620"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three controls help make a RAG vault audit-ready? Select every correct answer."
    options:
      - id: fallback
        text: "The LLM fills gaps from its training knowledge"
      - id: sources-only
        text: "The LLM answers only from the retrieved excerpts"
      - id: hidden-citations
        text: "Citations are hidden so answers read more cleanly"
      - id: cite
        text: "Every claim carries a document and page citation"
      - id: query-log
        text: "Each query is logged with user, chunks and answer"
    correctOptionIds: [sources-only, cite, query-log]
    explanation: "Source grounding, citations and a query log let the firm trace and reconstruct every answer the system ever gave. Letting the LLM fill gaps from training knowledge is tempting when sources are thin, but that is exactly how invented policy enters the answer."
  - id: "2033b135-a900-43ac-b798-51938d038782"
    revision: 1
    status: active
    type: multiple-select
    prompt: "In which three situations should the vault reply with its fixed refusal message? Select every correct answer."
    options:
      - id: low-score
        text: "The best chunk's similarity score is below the threshold"
      - id: different-wording
        text: "The question is phrased differently from the policy's wording"
      - id: llm-no-answer
        text: "The LLM finds the chunks do not contain the answer"
      - id: two-documents
        text: "The answer spans both the lease and the revenue memo"
      - id: filtered-out
        text: "The permission filter removes every candidate chunk"
    correctOptionIds: [low-score, llm-no-answer, filtered-out]
    explanation: "A weak match, chunks that do not answer the question, and an empty set after permission filtering each mean no authorized source supports an answer. Different wording is tempting as a reason to refuse, but semantic search is built to match meaning even when the words differ."
  - id: "f1b042cd-f704-4d23-8851-ba97f18f0794"
    revision: 1
    status: active
    type: true-false
    prompt: "When the vault replies \"I cannot confirm this from the provided sources,\" it has malfunctioned and should be reconfigured to give its best guess instead."
    answer: false
    explanation: "A refusal is the guardrail working: no source supports an answer, so the system says so instead of inventing one. Reconfiguring it to guess would remove the very behavior that makes its answers safe to use in an audit."
  - id: "8bc90bb7-fb3d-4752-b946-fcf580299146"
    revision: 1
    status: active
    type: true-false
    prompt: "The user's question must be embedded with the same embedding model that was used to embed the document chunks."
    answer: true
    explanation: "Distances between vectors only make sense when both vectors come from the same model, since each model has its own number space. Mixing models would compare unrelated coordinates and return poor matches."
  - id: "7b8b9342-cd79-4da1-a8a2-a2da9f02dee4"
    revision: 1
    status: active
    type: free-recall
    prompt: "Design the chunking strategy for BoBo's 40-page lease agreement. State the chunk size, the overlap, the boundaries and the metadata each chunk carries."
    sampleAnswer: "Use section-aware chunking of about 500 tokens with an overlap of roughly 50 to 100 tokens, so a key sentence is not cut in half between two chunks. Use the lease's natural numbered sections as chunk boundaries where possible and never split a single clause. Attach metadata to every chunk: document name, page, section number or heading, and a permission scope such as accounting."
    explanation: "A strong answer gives a size near 500 tokens, explains that overlap protects sentences at chunk edges, prefers natural clause boundaries, and lists the metadata needed for citations and permission filtering."
  - id: "12705f9e-ba63-43a8-b7a9-e7a1acbb4ce5"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, tell a Controller how a RAG vault keeps an AI from inventing policy. Cover retrieval, citations, refusal and your own verification step."
    sampleAnswer: "The vault first retrieves the few most relevant passages from our own approved documents, and the LLM may answer only from those passages. Every claim must carry a document and page citation, so a person can check it. If no passage supports the answer, the system refuses with a fixed message instead of guessing from its general knowledge. Finally, I open the cited PDF and read the page myself before relying on the answer, because the AI proposes and the accountant verifies."
    explanation: "A strong answer names all four layers: retrieval limited to approved sources, mandatory citations, refusal when unsupported, and human verification of the cited page."
```

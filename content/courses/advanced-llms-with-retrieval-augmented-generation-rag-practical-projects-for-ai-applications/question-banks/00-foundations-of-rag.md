---
id: "d8e6557c-9908-45dd-bf4d-cf48c268da2f"
title: "Foundations of RAG & Naive Failure Modes: Question Bank"
description: "Questions that practise the naive RAG pipeline, the precision-recall trade-off and the four chokepoints that break naive retrieval in production."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - rag
  - study-guide
  - assessment
  - active-recall
courseId: "51514bd6-585b-4e56-b7b1-3f137e962f3c"
comments: false
---

These questions practise [[courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/lessons/00-foundations-of-rag|Foundations of RAG & Naive Failure Modes]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "877ba218-81d2-4a87-9c0c-4ce6c63a8178"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's compliance-audit worked case, exactly 10 clauses in the repository legally define the mandatory security exceptions, and the vector search returns the top 3 chunks, all of them true penalty clauses. What are the precision and the recall of that retrieval?"
    options:
      - id: precision-100-recall-30
        text: "Precision 100% and recall 30%"
      - id: precision-30-recall-100
        text: "Precision 30% and recall 100%, because three of the ten clauses came back"
      - id: precision-90-recall-45
        text: "Precision 90% and recall 45%, which is the same query answered at k = 20"
      - id: precision-45-recall-90
        text: "Precision 45% and recall 90%, since a wider search always buys back recall"
    correctOptionIds: [precision-100-recall-30]
    explanation: "The lesson counts TP = 3, FP = 0 and FN = 10 - 3 = 7, so precision is 3/3 = 100% and recall is 3/10 = 30%. The 30%/100% pair reverses the two numbers, and the 90%/45% pair belongs to the k = 20 scenario. The danger is that the model states its three exceptions with total confidence while seven remain in the database, so the failure carries no hallucination flag at all."
  - id: "bdadad6c-7b29-4b28-a3ab-6a5c01c65919"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's semantic similarity trap asks how to configure MTU 9000 jumbo frames on a Cisco Nexus 9300. Which chunk does naive RAG actually retrieve, and which one does it throw away?"
    options:
      - id: keeps-cli-chunk
        text: "It keeps the CLI syntax chunk and discards the essay about jumbo frames"
      - id: keeps-topical-essay
        text: "It keeps the topical essay (0.887) and discards the CLI chunk (0.612)"
      - id: keeps-both
        text: "It keeps both chunks, because their cosine scores are close enough to be useful"
      - id: keeps-neither
        text: "It keeps neither chunk, because a query about networking never matches a router"
    correctOptionIds: [keeps-topical-essay]
    explanation: "This is the point the lesson makes with the trap: the essay about jumbo frames and MTU configuration scores 0.887, while the chunk holding the exact three lines of switch configuration syntax scores only 0.612, so naive RAG retrieves the topical essay and discards the answer. Keeping both would still need the reranker to pick the right one, and discarding both is not what happens at all, because the higher-scoring essay is kept."
  - id: "7adc1855-9f4a-4540-bf43-a2eb9d685436"
    revision: 1
    status: active
    type: single-choice
    prompt: "A developer facing the lesson's Sorcerer's Apprentice pathology responds by raising top-k from 3 to 100 inside a 128k context window. According to the lesson, what is the primary failure this triggers?"
    options:
      - id: disk-space
        text: "The index runs out of disk space once the collection passes a million chunks"
      - id: normalisation-lost
        text: "The query vector stops being unit-normalised after the first batch of candidate scoring"
      - id: lost-in-the-middle
        text: "Lost in the Middle attention decay, conflicting facts, and inflated token cost"
      - id: dimension-drop
        text: "The embedding model silently drops to 384 dimensions under that much load"
    correctOptionIds: [lost-in-the-middle]
    explanation: "The lesson describes exactly this sequence: the context window floods with boilerplate, contradictory document versions and irrelevant distractors, the attention mechanism degrades, latency and token costs compound, and the generator hallucinates by combining disjointed fragments. The other three are not effects the lesson attributes to a larger k: disk capacity is a storage question, normalisation is fixed before search, and the model's dimensionality does not change at query time."
  - id: "9b965ad0-8e1a-4734-809e-a6a6a28f286d"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's chunk boundary bleeding worked case, a retrieved chunk begins 'Because of this lawsuit, it agreed to pay a $450,000,000 settlement and spin off its cloud storage division'. What has the fixed character splitter destroyed?"
    options:
      - id: table-schema
        text: "The table schema, because the row was separated from its column headers"
      - id: keyword-identity
        text: "The keyword identity, because dense embeddings cannot hold a dollar amount"
      - id: conditional-premise
        text: "The conditional premise, because the condition was ranked below the conclusion"
      - id: pronoun-antecedent
        text: "The pronoun's antecedent, so the chunk cannot say who paid the settlement"
    correctOptionIds: [pronoun-antecedent]
    explanation: "This is anaphora severing: the antecedent 'MegaCorp' lived in the previous chunk, so the pronoun 'it' reaches the model with no referent and the answer becomes an unnamed entity. The table schema and the conditional premise are the lesson's other two structural breakdowns, but neither is what happened in this worked case, and dollar amounts are not the issue because the chunk does contain the $450,000,000 figure."
  - id: "3dc8976d-933e-44be-86a4-e8ec252f79a4"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson contrasts a dense-only retriever with BM25 on the query 'Why did error code 0x80070005 occur?'. What does the lesson say happens to the two candidate articles?"
    options:
      - id: generic-081
        text: "The generic article scores 0.81 and the exact article scores 0.76"
      - id: exact-081
        text: "The exact article scores 0.81 and the generic article scores 0.76"
      - id: both-equal
        text: "Both articles score identically, because the two documents are near-duplicates"
      - id: neither-retrieved
        text: "Neither article is retrieved, because the string is not in the embedding vocabulary"
    correctOptionIds: [generic-081]
    explanation: "The lesson's point is that dense retrieval gets this backwards: the generic article about Windows update errors scores 0.81 while the article containing the literal string 0x80070005 scores 0.76, because its surrounding words are brief and conversational. BM25 matches the exact token with mathematical certainty, which is why the lexical blindness chokepoint calls for hybrid search rather than dense-only retrieval."
  - id: "556d8e3b-ff8f-4424-b941-96791dc47d26"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's Context Window Mirage warning compares a 500,000-token prompt with targeted retrieval that injects 2,000 tokens, at 50,000 queries per day and $3.00 per million tokens. Which cost does it give for the targeted-retrieval approach?"
    options:
      - id: cost-3000
        text: "About $3,000 a month, because only the retrieved chunks are billed"
      - id: cost-300
        text: "Under $300 a month, a 250x reduction against the $75,000 whole-prompt figure"
      - id: cost-75000
        text: "Exactly $75,000 a month, since every query still sees the full manual"
      - id: cost-12000
        text: "About $12,000 a month, because the provider bills the cached prefix on every request"
    correctOptionIds: [cost-300]
    explanation: "Sending 500k tokens per query at $3.00 per million tokens comes to $75,000 a month for the single endpoint, while targeted retrieval at 2,000 tokens costs under $300 a month, which the lesson calls a 250x cost reduction. The other figures do not appear in the warning: the lesson's point is that the dominant cost is the prompt tokens you send, and that long context windows also wreck Time-to-First-Token and attentional diffusion."
  - id: "7eda5c20-d092-4e4d-b8ac-389874b8258d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pair of retrieval changes does the lesson's naive-versus-advanced table place at the retrieval and the fusion stage?"
    options:
      - id: chunking-and-hnsw
        text: "Fixed token chunking becomes adaptive semantic chunking, and HNSW replaces BM25"
      - id: indexing-and-cutoff
        text: "Single dense vector becomes contextual enrichment, and RRF replaces the cutoff"
      - id: hybrid-and-rrf
        text: "Dense-only search becomes dense plus sparse, and RRF replaces raw distance"
      - id: cutoff-and-generation
        text: "Fixed top-k becomes cross-encoder reranking, and generation gains deduplication"
    correctOptionIds: [hybrid-and-rrf]
    explanation: "The table's retrieval row moves from single-engine cosine ANN to hybrid search over a dense HNSW index plus a sparse BM25 or SPLADE index, and its fusion row moves from none, meaning raw vector distance, to Reciprocal Rank Fusion with rank-based score normalization. The other pairings mix rows: chunking and reranking are separate stages, and the cutoff does not become RRF."
  - id: "a4ebb71b-9a78-4bba-9a57-f4efa3ee48b9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are failure modes the lesson attributes to naive RAG itself? Select every correct answer."
    options:
      - id: context-starvation
        text: "Context Starvation, where a small k returns high precision but low recall"
      - id: noise-flooding
        text: "Noise Flooding, where a large k drags in contradictory distractor chunks"
      - id: boundary-amnesia
        text: "Chunk Boundary Amnesia, where a stored snippet carries no company or year"
      - id: posting-list-order
        text: "Inverted index skew, where posting lists are kept in unsorted DocID order"
    correctOptionIds: [context-starvation, noise-flooding]
    explanation: "Context Starvation and Noise Flooding are the two ends of the lesson's precision-recall trade-off: a small k starves the model of exceptions, a large k floods it with distractors. Chunk Boundary Amnesia is a real failure the lesson names, but it belongs to the storage and enrichment stage rather than to naive retrieval, and inverted index skew is not a failure mode the lesson discusses at all."
  - id: "347fb99f-1936-4cde-af50-b9a2882888f6"
    revision: 1
    status: active
    type: multiple-select
    prompt: "According to the lesson's architectural maturity table, which of these are stages of advanced production RAG rather than of the naive baseline? Select every correct answer."
    options:
      - id: adaptive-chunking
        text: "Adaptive Semantic Chunking that preserves tables, trees and syntax"
      - id: contextual-enrichment
        text: "Contextual Enrichment with a Reverse HyDE inverted question index"
      - id: single-dense-vector
        text: "A single dense vector per chunk, with no sparse inverted index at all"
      - id: fixed-topk
        text: "A fixed top-k cutoff that passes the retrieved noise straight to the LLM"
    correctOptionIds: [adaptive-chunking, contextual-enrichment]
    explanation: "The advanced column of the table lists adaptive semantic chunking at stage 1 and contextual enrichment plus a Reverse HyDE question index at stage 2. The other two are precisely the naive behaviours the table contrasts them against: one dense vector with no sparse index, and a fixed cutoff that passes noise downstream."
  - id: "d8e82425-87c8-4bdf-b163-63b9a8ca3466"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that a vector similarity score of 0.85 does not mean an 85% probability of relevance."
    answer: true
    explanation: "True. The Cosine Distance Overconfidence trap says exactly this, and explains why: in a 1536-dimensional sphere almost all vectors are near-orthogonal and distances are tightly clustered, dense regions such as generic legal boilerplate show artificially inflated similarity across almost any query, and a naive hard threshold such as 0.80 will reject specific technical chunks in sparse regions while admitting generic distractors from dense regions."
  - id: "e0c73762-ad48-46c4-8cd1-9747470059dc"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain the precision-recall trade-off that traps naive RAG, using the lesson's own compliance-audit worked case with the 10 mandatory clauses."
    sampleAnswer: "Any single top-k value has to give one up for the other. At k = 3 the engine returns three true penalty clauses, so precision is 100% and recall is only 30%, and the model states its three exceptions with complete confidence while seven more sit unseen in the database. At k = 20 it captures 9 of the 10, so recall reaches 90%, but precision falls to 45%, the 11 distractor chunks include expired 2021 addenda that contradict the final versions, and the model suffers Lost in the Middle attention decay and hallucinates a hybrid of the two. Because one k slider cannot hold both numbers high, naive RAG sits on the Pareto frontier, and the lesson's answer is a multi-stage architecture with broad recall retrieval and cross-encoder reranking rather than a bigger k."
    explanation: "A strong answer names both ends of the trade-off with the lesson's own numbers, k = 3 giving 100% precision and 30% recall against k = 20 giving 90% recall and 45% precision, and explains why one k slider cannot hold both high. It should also name the consequence, that the model states its three exceptions with total confidence while seven stay unseen in the database, and end on the architectural answer rather than a larger k."
  - id: "9d209540-2c1f-47f0-b087-fed485bd8625"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the lesson says a dense bi-encoder cannot be trusted with exact identifiers, and what the production fix is."
    sampleAnswer: "Dense projections blur rare high-specificity strings, so a serial such as Part-XYZ-9481-B is not reliably separated from Part-XYZ-9481-C, an error code such as ERR_HTTP2_PROTOCOL_ERROR_0x44 loses its identity, and a legal clause reference such as Section 14.3(b)(ii) becomes generic. The lesson's worked case shows the damage directly: the article containing the literal string 0x80070005 scores 0.76 while a generic article about Windows update errors scores 0.81. Lexical BM25 matches those strings with certainty but is blind to paraphrase and synonymy, so the production fix is hybrid search, marrying dense vector similarity with sparse BM25 keyword precision, and fusing the two channels with Reciprocal Rank Fusion."
    explanation: "A strong answer explains that a dense projection blurs rare high-specificity strings, and supports it with the lesson's worked case, where the article containing the literal string 0x80070005 scores 0.76 while a generic article about Windows update errors scores 0.81. It should name the matching weakness as lexical blindness, note that BM25 matches those strings with certainty but is blind to paraphrase, and give the production fix as hybrid search fused with Reciprocal Rank Fusion."
```

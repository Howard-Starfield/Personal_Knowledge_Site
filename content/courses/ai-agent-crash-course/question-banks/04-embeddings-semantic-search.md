---
id: "1fc4a703-7b53-4c39-b1b3-540284df8b64"
title: "Embeddings and Semantic Search Question Bank"
description: "Practice questions for Embeddings and Semantic Search."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

This bank owns the questions used by the Embeddings and Semantic Search lesson; the answer key is visible because it is a learning aid.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f257bc39-9765-4c6c-aa2c-4144b0f549ea"
    revision: 1
    status: active
    type: single-choice
    prompt: "A shopper types \"I want my money back\". The only matching document says \"refund eligibility\" and shares no words with the query. Why can embedding search still return it?"
    options:
      - id: partial-match
        text: "It finds partial word matches inside the document text"
      - id: nearby-vectors
        text: "The two texts map to nearby vectors because meaning is similar"
      - id: synonym-list
        text: "It checks each query word against a stored synonym dictionary"
      - id: llm-rewrite
        text: "It rewrites the query using an LLM before matching words"
    correctOptionIds: [nearby-vectors]
    explanation: "An embedding model is trained so that texts with similar meaning land close together, so the query and the refund chunk end up near each other even with no shared words. Partial word matching is what keyword search does, and it would find nothing here."
  - id: "47658cb0-ca25-4f35-8b4d-b8c1301e9ba4"
    revision: 1
    status: active
    type: single-choice
    prompt: "A query vector is (1, 0). Chunk A is (5, 0), chunk B is (1, 1) and chunk C is (0, 1). Which chunk has the highest cosine similarity to the query?"
    options:
      - id: chunk-b-distance
        text: "Chunk B, because it is closest in straight-line distance"
      - id: chunk-c-length
        text: "Chunk C, because its length matches the query most closely"
      - id: chunk-a-direction
        text: "Chunk A, because it points in exactly the same direction"
      - id: chunk-a-length
        text: "Chunk A, because its larger length gives a larger score"
    correctOptionIds: [chunk-a-direction]
    explanation: "Cosine similarity compares direction only, and chunk A points exactly along the query, giving a score of 1. Chunk A does not win because of its length: cosine ignores length, and straight-line distance would actually favour chunk B."
  - id: "6bc94505-1cec-4bed-8c51-bda43b71754a"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team embeds each 30-page PDF as a single vector. Searches return vague, mostly irrelevant hits even for very specific questions. What is the best first fix?"
    options:
      - id: split-chunks
        text: "Split each PDF into passages of a few hundred tokens"
      - id: raise-k
        text: "Return a larger top-k so the right page appears somewhere"
      - id: more-dimensions
        text: "Switch to an embedding model with more dimensions"
      - id: shorten-query
        text: "Shorten the query so it matches the average meaning"
    correctOptionIds: [split-chunks]
    explanation: "One vector for a whole PDF becomes a blurred average of every topic in it, so specific questions match poorly. Splitting into passages lets each vector represent one idea. A larger top-k only returns more of the same blurry results."
  - id: "99b067fe-2cf4-46db-ba4b-657f1d8bb286"
    revision: 2
    status: active
    type: single-choice
    prompt: "Your search script converts Chroma distances into similarity scores and prints negative values, which makes no sense for cosine similarity. The collection was created with default settings. What is the likely cause?"
    options:
      - id: corrupt-model
        text: "The embedding model is corrupted and must be reinstalled"
      - id: top-k-high
        text: "TOP_K is set too high, which inflates every score"
      - id: overlap-high
        text: "The chunks overlap too much, which pushes scores upward"
      - id: squared-l2
        text: "Default distance is squared L2, so convert or set cosine"
    correctOptionIds: [squared-l2]
    explanation: "Chroma's default distance is squared L2, not cosine, so a cosine-style conversion can produce out-of-range scores unless every vector has length 1. Either normalize and convert, or create the collection with a cosine setting. Top-k only controls how many results return, not their scale."
  - id: "f54312f2-0c8c-4087-8b5e-c4ed8d2afed1"
    revision: 1
    status: active
    type: single-choice
    prompt: "You built a Chroma index with a local 384-dimension model, then switched the backend setting to OpenAI text-embedding-3-small and re-ran only the search script. What should you expect and do?"
    options:
      - id: still-works
        text: "Searches work, because all embeddings share one common space"
      - id: rebuild
        text: "A dimension mismatch; rebuild the index with the new model"
      - id: truncate
        text: "Truncate the new vectors to 384 values to match the index"
      - id: mix-index
        text: "Add the new vectors beside the old ones in the same index"
    correctOptionIds: [rebuild]
    explanation: "Vectors from different models live in different spaces, and here the sizes differ too, so Chroma reports a dimension mismatch. The fix is to delete the old index and rebuild it with the new model. Truncation only works within one model that supports it, and cannot translate between spaces."
  - id: "ea9feea5-4bba-4b23-9bc6-73e89e384624"
    revision: 1
    status: active
    type: single-choice
    prompt: "Document X ranks 1st in the BM25 list and 3rd in the vector list. Document Y ranks 2nd in both lists. Using Reciprocal Rank Fusion with k = 60, which document ranks higher in the fused list?"
    options:
      - id: y-consistent
        text: "Y, because it is consistently second in both lists"
      - id: tie-same-sum
        text: "They tie, because both ranks sum to the same total"
      - id: x-higher
        text: "X, with about 0.03227 against about 0.03226 for Y"
      - id: needs-weights
        text: "Neither is scored until you tune BM25 and vector weights"
    correctOptionIds: [x-higher]
    explanation: "X scores 1/61 + 1/63, about 0.03227, while Y scores 2/62, about 0.03226, so X edges ahead. The rank sums tie at 4, but RRF adds reciprocals rather than ranks, which rewards a top position slightly more. RRF needs no weights."
  - id: "977d3af8-6ff2-4a97-b339-7b9e84a8cc85"
    revision: 1
    status: active
    type: single-choice
    prompt: "Vector search puts the wrong policy chunk at rank 1 and the correct one at rank 4. What is the standard low-cost fix?"
    options:
      - id: top-k-one
        text: "Reduce top-k to 1 so only the best-scoring chunk is used"
      - id: more-overlap
        text: "Re-embed the corpus with a larger overlap between chunks"
      - id: rerank-all
        text: "Run a cross-encoder across the entire index for every query"
      - id: rerank-top
        text: "Rerank the top 20 to 50 candidates with a cross-encoder"
    correctOptionIds: [rerank-top]
    explanation: "A cross-encoder reads the query and each candidate together, so it orders a short list far more accurately than the first-pass vectors do. It is too slow to run on the whole index, which is why it only scores the top 20 to 50. Cutting top-k to 1 would lock in the wrong rank-1 chunk."
  - id: "ef90cc3b-b7b5-4e8a-9006-5b2ce8d1d5a3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "A support bot must find tickets by an exact error code such as ERR_5031 and also by loose paraphrases. Which statements about hybrid search are correct? Select every correct answer."
    options:
      - id: bm25-exact
        text: "BM25 reliably matches rare exact tokens such as ERR_5031"
      - id: rrf-merge
        text: "RRF merges two ranked lists without tuning score weights"
      - id: dense-exact
        text: "Dense vectors are the strongest choice for exact error codes"
      - id: fixed-weights
        text: "A fixed 0.7 vector and 0.3 BM25 weight is always safest"
      - id: bm25-paraphrase
        text: "BM25 matches paraphrases such as money back and refund"
    correctOptionIds: [bm25-exact, rrf-merge]
    explanation: "BM25 is strong on rare exact tokens, and RRF fuses the BM25 and vector rankings with no weight tuning. Dense vectors are the weaker tool for exact codes, and BM25 cannot connect paraphrases that share no words. A fixed blend of weights is the approach the chapter warns against."
  - id: "ac919d0d-c9d0-44fd-b4e5-6aa50ed83344"
    revision: 2
    status: active
    type: multiple-select
    prompt: "A team will embed customer emails through a hosted embedding API. Which measures best reduce the privacy risk? Select every correct answer."
    options:
      - id: redact-first
        text: "Strip or redact names and account numbers before embedding"
      - id: local-model
        text: "Use a local embedding model so text stays in your infrastructure"
      - id: vectors-opaque
        text: "Treat the stored vectors as unreadable and skip other controls"
      - id: filter-after
        text: "Filter results by permission only after the LLM has answered"
      - id: delete-source-only
        text: "Honor deletion requests by removing only the source file"
    correctOptionIds: [redact-first, local-model]
    explanation: "Redacting personal data first, or keeping embedding local, stops sensitive text leaving your infrastructure. Embedding inversion research has recovered much of the original text from vectors, so they are not safely opaque. Permissions must be applied before results reach the LLM, and deletion must also remove the vectors."
  - id: "d0e4054f-b7de-4aaf-9682-efab96eebe23"
    revision: 1
    status: active
    type: true-false
    prompt: "Retrieval top-k in a search pipeline and sampling top-k used when an LLM generates text are the same setting."
    answer: false
    explanation: "Retrieval top-k is how many chunks the search returns. Sampling top-k limits how many candidate tokens the model may choose from at each generation step. They share a name but control different stages."
  - id: "f6edae58-8899-405b-a3e4-b8b5d4d82359"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: describe how a notes-search tool turns the question \"money back on a software download\" into the right chunk. Cover chunking, embedding, cosine similarity and top-k, and say what hybrid search and reranking each add."
    sampleAnswer: "Documents are split into chunks of one idea each, with a little overlap, and every chunk is embedded as a vector and stored. The query is embedded by the same model, compared to each chunk by cosine similarity, and the top-k closest chunks are returned, so the refund chunk surfaces despite different wording. Hybrid search adds BM25 keyword results fused with RRF to catch exact tokens, and a cross-encoder reranker re-scores the top 20 to 50 candidates for a more accurate final order."
    explanation: "A strong answer follows the chain chunk, embed, store, query, compare, top-k, and ties the two optional layers to their purpose: hybrid for exact tokens, reranking for precision."
  - id: "5385cef3-c9aa-4739-abca-4f356f9dd230"
    revision: 1
    status: active
    type: free-recall
    prompt: "Why should you build a small evaluation set of 20 to 50 query and expected-source pairs before tuning chunk size, model or reranker, and which two metrics does the chapter track with it?"
    sampleAnswer: "Without a fixed set of queries with known right answers you are guessing whether a change helped. Re-running the same set after each change shows the effect, using Recall@k, which checks whether the correct document appears in the top k results, and MRR, the average of 1 divided by the rank of the first correct result."
    explanation: "The key ideas are a repeatable baseline and the two named metrics, Recall@k as a yes-or-no hit rate and MRR as a rank-sensitive score."
```

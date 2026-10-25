---
id: "ac02a79c-fa2c-4229-9de6-c598dfc14d87"
title: "Hybrid Search, Cross-Encoder Reranking & Multimodal Retrieval: Question Bank"
description: "Questions that practise BM25, Reciprocal Rank Fusion, cross-encoder reranking and multimodal PDF ingestion."
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

These questions practise [[courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/lessons/03-hybrid-search-reranking|Hybrid Search, Cross-Encoder Reranking & Multimodal Retrieval]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "896d38dc-edce-49b7-9b4a-78d2e2bb24ab"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's BM25 term-frequency curve, what does the TF multiplier approach as the term frequency grows without limit?"
    options:
      - id: k1-plus-one
        text: "It approaches k_1 + 1, so extra repetitions stop adding much"
      - id: k1-plus-one-b-zero
        text: "It approaches k_1 + 1 only when b is set to 0, and grows linearly otherwise"
      - id: one
        text: "It approaches 1.0, because the saturation curve is normalized to the IDF term"
      - id: k1
        text: "It approaches k_1 itself, because the plus-one term cancels the document length ratio"
    correctOptionIds: [k1-plus-one]
    explanation: "The term frequency multiplier is (tf * (k_1 + 1)) / (tf + k_1), which is bounded and tends to k_1 + 1 as tf grows, so the tenth occurrence of a term counts far less than the third. The document length normalization term, (1 - b + b * dl / avgdl), is a separate multiplier that leaves the curve bounded, so the claim that the limit depends on b being zero, or that the limit is k_1 itself, does not follow."
  - id: "6fedbf06-230f-4457-af1f-142b4be6cceb"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's score calibration catastrophe compares a common-word query with a rare-identifier query. What does it say happens to BM25 relative to dense cosine?"
    options:
      - id: bounded-bm25
        text: "BM25 stays within the interval [-1, 1], so it can always be added straight to a cosine score"
      - id: unbounded-bm25
        text: "BM25 runs from 0 upward and dwarfs cosine on rare tokens, 40 times larger there"
      - id: both-bounded
        text: "BM25 and cosine both stay bounded, so per-query min-max scaling makes them comparable"
      - id: below-zero
        text: "BM25 is unbounded below zero, so rare tokens push matching documents to the bottom"
    correctOptionIds: [unbounded-bm25]
    explanation: "BM25 has no upper bound and is zero at the bottom, while cosine similarity sits inside [-1, 1], so on a rare-identifier query the BM25 score can be about 40 times the dense score, against roughly 4x on a common-word query. A fixed weighted sum therefore hands control to whichever channel the query happens to favour, and BM25 never goes below zero."
  - id: "ead79749-7a5c-4046-9617-772e506ed55c"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson give as the reason RRF beats score-based fusion?"
    options:
      - id: minmax-first
        text: "RRF rescales every channel with min-max normalization before it adds the scores"
      - id: single-index
        text: "RRF replaces the two channels with one BM25 index, so nothing can disagree"
      - id: rank-only
        text: "RRF uses only ordinal ranks, so any monotonic score transform leaves it unchanged"
      - id: length-weighting
        text: "RRF weights each channel by the inverse of its average document length in the corpus"
    correctOptionIds: [rank-only]
    explanation: "RRF sums 1/(k + r) over the channels, so it uses the rank of a document and never the score, which makes it invariant to any monotonic rescaling of a channel, exactly what per-query min-max normalization tries and fails to achieve. RRF does not normalize scores, does not collapse the two channels, and does not use document length at all."
  - id: "7c967e4c-1deb-48f0-91b1-029c975924cd"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's consensus-amplification worked case scores three documents with k = 60. Which document wins the fused ranking?"
    options:
      - id: dense-first-only
        text: "The document ranked first in Dense and absent from BM25, on the strength of 1/61"
      - id: mid-both
        text: "The document ranked fifteenth in Dense and twelfth in BM25, at 0.027222"
      - id: top-rank-wins
        text: "The document ranked first in Dense wins, because a top rank always beats a consensus"
      - id: both-high
        text: "The document ranked second in Dense and third in BM25, at 0.032002"
    correctOptionIds: [both-high]
    explanation: "The document that both channels rank highly wins, because consensus across channels is the signal RRF is built to capture: 1/62 + 1/63 = 0.032002 beats 1/61 = 0.016393 and beats 1/75 + 1/72 = 0.027222. The document at the top of one channel alone scores the least of the three, which is exactly the point of fusion."
  - id: "e3a38e14-bc73-4849-ab6b-76a1f0713275"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson says a bi-encoder can retrieve the wrong polarity for a medical query. Which pair does it use to show this?"
    options:
      - id: aspirin-polarity
        text: "'Which patients can take Aspirin' against 'must NOT take Aspirin', cos > 0.88"
      - id: acquisition-direction
        text: "'Company A acquired Company B' against 'Company B acquired Company A'"
      - id: phrase-paraphrase
        text: "'mitigating write bottlenecks' against 'Persisting In-Memory Dictionaries'"
      - id: medical-synonym
        text: "'treatment for elevated arterial tension' against 'Management of Primary Hypertension'"
    correctOptionIds: [aspirin-polarity]
    explanation: "The Aspirin pair is the polarity case: both chunks are about Aspirin and safety, so the cosine is above 0.88 and the retriever cannot tell which one says the drug must be avoided. The acquisition pair is subject-object directionality and the other two are paraphrase pairs, both of which a bi-encoder handles reasonably well, so they are not the polarity worked case."
  - id: "84232a08-17d7-455b-b27f-33f040a3443d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson instruct about running a cross-encoder in the retrieval pipeline?"
    options:
      - id: whole-corpus
        text: "Run it over the whole corpus so that every document in the collection gets an exact relevance score"
      - id: rerank-pool
        text: "Keep it in stage two, reranking a bounded pool of roughly 30 to 100 candidates"
      - id: stage-one
        text: "Run it in stage one in place of BM25, because it is the more precise of the two"
      - id: ingestion-time
        text: "Run it once at ingestion time, so every chunk carries its own score in the index"
    correctOptionIds: [rerank-pool]
    explanation: "A cross-encoder costs a full forward pass per query-document pair, so the lesson puts it in stage two, where a bi-encoder and BM25 have already produced a pool of roughly 30 to 100 candidates to rerank down to the golden top 3 to 5. Running it over the whole corpus would take seconds on a GPU or over 30 seconds on a CPU, and its cost is quadratic in the combined sequence length."
  - id: "a0afced1-37fb-4a34-bdea-191652e58900"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which statement about ColPali and the OCR step matches the lesson?"
    options:
      - id: ocr-then-embed
        text: "It OCRs the page into text first, then embeds each line of the extracted text"
      - id: render-and-grid
        text: "It renders the page at 150 DPI and runs a vision model over a grid of 128 dimensions"
      - id: patch-matching
        text: "It renders the page as an image and matches query tokens to visual patches"
      - id: markdown-table
        text: "It converts the page into a Markdown table and hands that table to BM25 alone"
    correctOptionIds: [patch-matching]
    explanation: "ColPali renders each page as an image and produces one vector per visual patch, then matches the query tokens against those patches, so a chart, a scanned table and a diagram stay searchable without an OCR pass. The OCR route is the legacy answer, and the lesson notes it breaks on scanned pages, complex tables and figures."
  - id: "8cb9e855-d4ca-49fd-845c-1fec887a3d36"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson list as a structural failure of naive PDF parsing? Select every correct answer."
    options:
      - id: column-inversion
        text: "Multi-column stream inversion, where adjacent columns are read across the page"
      - id: table-decapitation
        text: "Table decapitation, where rows are flattened into unlabelled numbers"
      - id: vector-crowding
        text: "Vector crowding, where page patches sit too close together in the manifold"
      - id: query-expansion
        text: "Query expansion, where the retriever rewrites the user's question into keywords"
    correctOptionIds: [column-inversion, table-decapitation]
    explanation: "Multi-column inversion and table decapitation are the two parsing failures the lesson names for PDF corpora, and both are why the lesson insists on layout-aware parsing. Vector crowding is an embedding-space problem rather than a parsing problem, and query expansion is a retrieval-stage technique the lesson discusses in another context."
  - id: "70475b3f-30b3-4dcc-a063-76c7300aa941"
    revision: 1
    status: active
    type: multiple-select
    prompt: "According to the lesson, what does Reciprocal Rank Fusion actually reward? Select every correct answer."
    options:
      - id: consensus
        text: "Documents that both retrieval channels rank highly, not documents one channel loves"
      - id: scale-invariance
        text: "Rank positions rather than raw scores, which makes the fusion scale-invariant"
      - id: highest-raw-score
        text: "The highest raw BM25 score, since that term carries the most information"
      - id: minmax-equalise
        text: "Per-query min-max normalization, which equalizes the two score distributions"
    correctOptionIds: [consensus, scale-invariance]
    explanation: "RRF rewards consensus between the two channels and uses only ordinal ranks, so it is immune to any monotonic rescaling of a channel's scores. The highest raw BM25 score is what the calibration catastrophe warns against, because raw scores are on incomparable scales, and per-query min-max normalization is the broken alternative RRF replaces."
  - id: "62366222-7026-447e-bb51-3cab545ea782"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that a single dense vector per chunk cannot represent a 400-token document faithfully, because the document vector must be computed offline before any query is known."
    answer: true
    explanation: "True. The lesson's argument is that the bi-encoder's document vector has to be computed and stored before any user query exists, so a whole 400-token chunk is compressed into one point in the vector space without knowing what will be asked of it. That is why negation, subject-object directionality and subtle qualifiers are blurred away, and why the cross-encoder is needed to resolve them."
  - id: "793621cd-9856-4e05-9758-756c58dc9bf5"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain in your own words why the lesson rejects adding raw BM25 scores to dense cosine similarities, and what it puts in their place."
    sampleAnswer: "The two channels are not on the same scale at all: cosine similarity is bounded inside [-1, 1] while BM25 is unbounded above and grows with query rarity, so on a rare-identifier query the BM25 score can be forty times the dense score, while on a common-word query it is only about four times, which means a fixed weighted sum silently hands control to whichever channel the query happens to favour. Per-query min-max normalization does not rescue it, because one outlier compresses the rest toward zero and a single weak match can map to 1.0. Reciprocal Rank Fusion throws the scores away and works only on ordinal ranks, 1/(k + r) with k = 60, which makes it invariant to any monotonic rescaling and lets a document ranked second by Dense and third by BM25 beat a document ranked first by Dense alone."
    explanation: "A strong answer states the scale problem, that cosine similarity is bounded inside [-1, 1] while BM25 is unbounded above and grows with query rarity, and gives the lesson's figures, about 40x on a rare-identifier query against roughly 4x on a common-word query. It should explain why per-query min-max normalization does not repair it, one outlier compressing the rest and a weak match mapping to 1.0, and then give RRF with its 1/(k + r) formula at k = 60 and the reason ranks are invariant to rescaling."
  - id: "ff729694-58b4-47dc-9319-3c219f09fc36"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the two-stage retrieval funnel the lesson recommends, including the latency budgets and the role of each stage."
    sampleAnswer: "Stage one is high-recall candidate generation: a parallel bi-encoder HNSW index and a sparse BM25 index run over a corpus of a million chunks or more in under 25 milliseconds, and their two ranked lists are merged with Reciprocal Rank Fusion into a pool of the top 50 to 100 candidates. Stage two is high-precision reranking: a cross-encoder such as bge-reranker-large reads each candidate as one concatenated sequence of CLS, query, SEP, document, SEP, so every query token attends to every document token, and it cuts the pool down to the golden top 3 to 5 chunks in under 75 milliseconds. The rule is never to run a cross-encoder over the whole corpus, because its cost is quadratic in the combined length, which would take seconds on a GPU or over 30 seconds on a CPU."
    explanation: "A strong answer separates the two stages and their budgets: high-recall candidate generation from a parallel bi-encoder HNSW index and a sparse BM25 index in under 25 ms, fused by Reciprocal Rank Fusion into a pool of the top 50 to 100 candidates, and high-precision reranking by a cross-encoder in under 75 ms down to the golden top 3 to 5 chunks. It should also state the prohibition, never run a cross-encoder over the whole corpus, and why, that its cost is quadratic in the combined sequence length."
```

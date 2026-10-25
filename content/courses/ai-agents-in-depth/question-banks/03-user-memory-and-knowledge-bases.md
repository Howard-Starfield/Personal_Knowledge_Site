---
id: "71d1e4b3-033f-4210-8e10-e95adcf96723"
title: "Chapter 3: User Memory and Knowledge Bases: Question Bank"
description: "Practice questions for the User Memory and Knowledge Bases chapter: memory formats and lifecycle, the retrieval pipeline from chunking to reranking, structured indexes, and knowledge governance."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
comments: false
---

These questions practise [[courses/ai-agents-in-depth/lessons/03-user-memory-and-knowledge-bases|Chapter 3: User Memory and Knowledge Bases]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "1e30aae6-9da8-412e-a58f-bd9669c37dc2"
    revision: 1
    status: active
    type: single-choice
    prompt: "Mem0's version 3 changed how conflicting memories are handled. What is the change the chapter describes?"
    options:
      - id: append-only
        text: "Writes became append-only, and conflicts are settled at query time by hybrid retrieval rather than by an LLM at write time"
      - id: wider-matrix
        text: "The LLM decision matrix was widened to cover more cases, and every decision now also records its justification inside the memory"
      - id: no-writing
        text: "Memory writing was removed entirely, so the system keeps only the raw conversation transcripts and reads directly from them"
      - id: keyword-index
        text: "Vector search was replaced by an exact keyword index, so conflicting facts are found by matching the exact wording the user used"
    correctOptionIds: [append-only]
    explanation: "append-only is correct: version 3 only appends, with a timestamp on each fact, and leaves the reconciliation to query time through dense semantic search, BM25, entity matching and temporal ranking. The reason is that a wrong write-time UPDATE or DELETE destroyed historical data irreversibly, and the write path also cost a second LLM call per candidate. wider-matrix keeps the version 2 design and adds to it. no-writing overstates the change, since memories are still written. keyword-index misstates the mechanism, because the resolution is a hybrid of several retrieval signals rather than exact lexical matching alone. Lesson section: user memory system, the Mem0 case study."
  - id: "fae6073a-609f-4680-8f8e-83a32457b167"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter compares four storage formats for user memory. Which set is correct?"
    options:
      - id: three-formats
        text: "Simple Notes, JSON Cards and Executable Code, with no fourth format because the chapter treats the first two as variants of one idea"
      - id: storage-engines
        text: "Plain text files, a relational database, a vector database and a graph database, chosen by whatever storage engine a deployment already runs"
      - id: four-formats
        text: "Simple Notes, JSON Cards, Advanced JSON Cards and Executable Code, each trading simplicity against disambiguation power"
      - id: json-dropped
        text: "Simple Notes, Advanced JSON Cards, Vector Store and Executable Code, with the plain JSON Card format dropped as redundant"
    correctOptionIds: [four-formats]
    explanation: "four-formats is correct: the chapter lays out Simple Notes, JSON Cards, Advanced JSON Cards and Executable Code, moving from the cheapest and flattest to the richest and most expensive to maintain. three-formats, json-dropped and storage-engines each invent a different set, and the last confuses a memory format with a database product. Lesson section: four storage formats for user memory."
  - id: "6bc37c73-076c-42f6-9ebb-6a873016b169"
    revision: 1
    status: active
    type: single-choice
    prompt: "A user's dentist and their father's cardiologist are both called Dr. Zhang. Why does the chapter say Advanced JSON Cards succeeds where Simple Notes and plain JSON Cards fail?"
    options:
      - id: timestamps
        text: "It records each fact with a timestamp, so the two doctors can be told apart by which of them was entered into the store first"
      - id: metadata
        text: "It carries backstory, person and relationship metadata, so the two names are separated and stay attached to the right people"
      - id: raw-transcript
        text: "It keeps the raw conversation transcript beside every derived fact, so the model can re-read the original wording at query time"
      - id: embedding-does-it
        text: "It relies on the embedding model to disambiguate, because dense vectors separate two people who share a name automatically"
    correctOptionIds: [metadata]
    explanation: "metadata is correct: Simple Notes breaks a fact into isolated atomic statements, so both doctors collapse into the same name, while a plain JSON Card's rigid category, subcategory and key-value hierarchy assumes information can be neatly classified and still collides on the entity. Advanced JSON Cards adds explicit backstory, person and relationship fields, at the cost of higher maintenance overhead and latency. timestamps do not separate two people who share a name. raw-transcript describes an archival approach, not the JSON Card format. embedding-does-it is wrong because dense vectors blur precisely the entity distinctions the chapter is trying to preserve. Lesson section: four storage formats for user memory, the Advanced JSON Cards pattern."
  - id: "c2fd826d-63d8-4bc3-a034-b1729d17cfb9"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why is cosine similarity preferred over unnormalized Euclidean distance when comparing a query against document embeddings of different lengths?"
    options:
      - id: sparse-vectors
        text: "Because Euclidean distance cannot be computed at all on the sparse vectors that a document store produces internally, so it would fail on most of the index"
      - id: speed
        text: "Because cosine similarity is much cheaper to evaluate across a whole index than a full Euclidean distance is"
      - id: undefined
        text: "Because Euclidean distance is undefined for vectors that have not been normalized, and normalizing first destroys information"
      - id: magnitude
        text: "Because cosine similarity measures directional alignment and ignores magnitude, so a longer document is not penalised for its length"
    correctOptionIds: [magnitude]
    explanation: "magnitude is correct: a bi-encoder produces vectors whose norm grows with document length and term repetition, so raw L2 distance would push a long document away from a query even when they discuss the same thing. Cosine similarity divides by the norms and compares direction only. sparse-vectors and speed are not the reason, and undefined is wrong because Euclidean distance is perfectly well defined on unnormalized vectors — it is simply the wrong measure here. Lesson section: dense embeddings, metric space geometry."
  - id: "7cc48274-71bf-4f42-9fe2-1d5c27bf6e08"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does HNSW organise its graph, and what do the parameters M and efSearch control?"
    options:
      - id: skiplist
        text: "A skip-list hierarchy, sparse long-range links above and dense local links below; M bounds the edges per node and efSearch sizes the query queue"
      - id: bst
        text: "A balanced search tree over the sorted embeddings, where M is the tree depth and efSearch is the fan-out of each node at every level of the tree that is built"
      - id: flat-graph
        text: "A flat graph linking every vector to every other, where M limits the total edge count and efSearch scales the GPU batch size"
      - id: kmeans-tree
        text: "A clustering tree built by recursive partitioning, where M is the number of clusters and efSearch is how many are probed per query"
    correctOptionIds: [skiplist]
    explanation: "skiplist is correct: the upper layers hold sparse nodes with long-range edges for logarithmic-time routing across the space, layer 0 holds every vector with dense local links for precision, M caps the bidirectional edges per node and efSearch sizes the priority queue used at query time, trading latency against recall. bst and kmeans-tree describe trees, not HNSW's graph. flat-graph is not how the index is built or queried. Lesson section: dense embeddings, index structures and the HNSW discussion."
  - id: "aab66b83-b656-4c22-98b2-39566305c161"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does BM25 routinely outperform dense embeddings on a query containing an exact identifier such as a CVE number or an error code?"
    options:
      - id: idf-dominates
        text: "Because BM25 weights every term by inverse document frequency, so a rare identifier automatically dominates the final ranking of the whole result set"
      - id: untrained
        text: "Because embedding models are never trained on identifiers, so they always return the nearest document purely by accident"
      - id: length-normalization
        text: "Because BM25 normalizes by document length, and identifier strings make a document unusually long relative to its topic"
      - id: exact-match
        text: "Because the inverted index performs exact lexical matching, so the identifier is found precisely instead of being blurred by subword tokenization"
    correctOptionIds: [exact-match]
    explanation: "exact-match is correct: an inverted index looks up the literal string, while a dense projection of an identifier, often split into subword pieces or mapped out of vocabulary, loses the exact token and returns only a neighbourhood of semantically similar documents. idf-dominates is a real property of BM25 but it is not what distinguishes it on identifiers, since IDF applies to the whole query. untrained misstates the cause, since the issue is the representation rather than the training data. length-normalization is about fairness between documents of different lengths. Lesson section: sparse embeddings and BM25."
  - id: "e7d84dc3-8872-419b-9b3d-169bcee22e94"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why a hybrid retrieval pipeline combines dense and sparse retrieval, and why the chapter recommends Reciprocal Rank Fusion over a weighted sum of the two scores."
    sampleAnswer: "The two retrievers fail in opposite ways. Dense retrieval understands meaning, so it finds a passage on the same subject even when it shares no words with the query, but it blurs exact identifiers into a neighbourhood of similar vectors; BM25 over an inverted index matches the literal string, so it nails an error code but is blind to paraphrase. Running both covers both failure modes. The chapter prefers Reciprocal Rank Fusion because the two score families are not comparable — dense cosine sits roughly between zero and one while BM25 is unbounded and moves with query length — so RRF discards the raw scores and sums the reciprocal of each document's rank in each list, which needs no calibration."
    explanation: "A strong answer gives the complementary strengths of the two retrievers, and then the reason for fusion on ranks rather than on scores, namely that the scales are incompatible. An answer that says hybrid search is simply better than either retriever has missed the point, and an answer that gives only one of the two reasons has answered half the question. Lesson section: hybrid retrieval and reciprocal rank fusion."
  - id: "df989662-a0bb-433e-8267-a405214766dc"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why is a cross-encoder reranker applied only to the top N candidates rather than to the whole corpus?"
    options:
      - id: length-limit
        text: "Because the reranker was trained on short queries and its accuracy collapses on documents of more than a few hundred words of running prose"
      - id: score-space
        text: "Because the reranker emits scores on an incomparable scale, so only the relative order of a shortlist can be used"
      - id: same-limits
        text: "Because the cross-encoder also stores a single vector per document and therefore inherits the retriever's indexing limits"
      - id: quadratic-cost
        text: "Because it attends fully between query and document, which cannot be precomputed into an index and is far too costly at corpus scale"
    correctOptionIds: [quadratic-cost]
    explanation: "quadratic-cost is correct: a bi-encoder scores the query and the document separately, so it can be indexed offline, while a cross-encoder concatenates them and runs full bidirectional attention across all tokens for every pair, which gives a far better relevance judgement but cannot be precomputed and scales roughly with the square of the sequence length per pair. length-limit, score-space and same-limits are not the reasons the chapter gives. Lesson section: reranking, bi-encoders against cross-encoders."
  - id: "e367e0b9-2574-42af-851e-1e15129265fc"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are stages the chapter gives for the user memory lifecycle? Select every correct answer."
    options:
      - id: read
        text: "Read the relevant existing memories for the user"
      - id: extract
        text: "Extract candidate memories in the background, off the critical path of the conversation"
      - id: verify
        text: "Verify the source and the policy of each candidate before it is allowed into the store"
      - id: retrain
        text: "Retrain the model's parameters on the newly collected memories so that it remembers them natively"
    correctOptionIds: [read, extract, verify]
    explanation: "read, extract and verify are correct: the chapter gives the lifecycle as reading the relevant memories, extracting candidates in the background, verifying source and policy, and then updating the store. retrain is wrong because this is the external-memory path — putting the memory into the weights is the post-training route covered in Chapter 8, not part of this lifecycle. Lesson section: user memory system."
  - id: "0e658ca4-54d4-4cc1-b3e3-b86b738a1a50"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter identify as failure modes of naive RAG? Select every correct answer."
    options:
      - id: counting
        text: "Counting: the top-k result is an unrepresentative sample, so the ratio the model reports is simply wrong"
      - id: boundary
        text: "Boundaries: matching individual approval tickets by nearest neighbour never reveals the global rule about who is excluded"
      - id: two-round-trips
        text: "Latency: naive RAG always needs two round trips, because the query has to be rewritten before the retrieval can begin"
      - id: recall
        text: "Recall: the document that holds the answer falls outside the top-k altogether and is never shown to the model"
    correctOptionIds: [counting, boundary, recall]
    explanation: "counting, boundary and recall are correct: the chapter's black cat and white cat case shows that sampling top-k and reasoning over the sample cannot produce a global statistic, and the discount eligibility case shows that nearest-neighbour matching on individual tickets cannot reconstruct the rule that excludes everyone else. two-round-trips is not a failure mode the chapter attributes to naive RAG, and the contrast it draws is about analytical power rather than about the number of round trips. Lesson section: extracting deep knowledge from datasets, the counting and boundary dilemmas."
  - id: "3d555d4a-cf65-488d-9de5-84dbea2e9bb7"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says Contextual Retrieval and Contextual Compression are the same technique applied at two different points in the pipeline. Is that what the chapter says?"
    answer: false
    explanation: "False — the chapter explicitly contrasts the two, because the similar names hide opposite operations. Contextual Retrieval is additive and happens offline during indexing: an LLM reads the whole source document and prepends a short situational prefix to each chunk before the chunk is embedded and inverted-indexed, which restores the orphan context that chunking destroyed. Contextual Compression is an online runtime mechanism that strips tokens the model no longer needs out of the live conversation history so the context window keeps its capacity. Lesson section: RAG technique, contextual retrieval."
  - id: "1cc5c6ca-d0b3-418f-90c0-215ed752c8be"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the chapter argues for keeping a structured overview resident in the context while the raw detail is recalled on demand, and say how the filesystem paradigm and Agentic RAG each support that arrangement."
    sampleAnswer: "The overview-plus-on-demand arrangement puts a compact map of the knowledge permanently in front of the model, so it can decide what is worth fetching, and spends the window's tokens on the detail a particular question actually needs. The filesystem paradigm supports it through its L0, L1 and L2 layers: a one-sentence summary of about 100 tokens for routing, an overview of about 2,000 tokens for planning and scenario rules, and the full text fetched only when deep analysis demands it. Agentic RAG supports it by wrapping the knowledge base as a tool the Agent queries inside a ReAct loop, decomposing the question into sub-queries and running a second targeted round when the first result is not enough."
    explanation: "A strong answer states the arrangement itself, gives the token-saving reason for it, and then credits each of the two mechanisms with the specific part it plays — the layered loading for the filesystem paradigm and the iterative multi-hop retrieval for Agentic RAG. An answer that describes only one of the two has answered half the question. Lesson section: beyond flat text, and the Agentic RAG section."
```

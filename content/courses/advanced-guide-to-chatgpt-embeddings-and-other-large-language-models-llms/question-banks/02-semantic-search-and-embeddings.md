---
id: "3ea14a3e-1b39-4d0e-9c4c-6d95e29b1c66"
title: "Chapter 2: Semantic Search, Vector Spaces & Bi/Cross-Encoders: Question Bank"
description: "Practice questions for the semantic search chapter: why lexical retrieval fails, unit-normalised vector geometry, symmetric and asymmetric retrieval spaces, the dual-stage bi-encoder and cross-encoder pipeline, chunking strategies, and the three production traps."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - large-language-models
  - study-guide
  - assessment
  - active-recall
courseId: "a62e5265-aacf-45ea-8e64-7dae192cc27f"
comments: false
---

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/02-semantic-search-and-embeddings|Chapter 2: Semantic Search, Vector Spaces & Bi/Cross-Encoders]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "ad0d1b6a-73b4-4a1f-9a03-bb0a0f4f4c65"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's collectibles case, why does BM25 rank the children's stage-magic toy kit above the 1993 Black Lotus trading card?"
    options:
      - id: a
        text: "The toy kit contains all three query tokens, while the card uses domain vocabulary that shares no token with the query"
      - id: b
        text: "The toy kit is shorter, so the length normalisation term in the BM25 formula gives it a higher score than the card listing"
      - id: c
        text: "The card is dated 1993, and BM25 discounts documents that old unless the query asks for a year"
      - id: d
        text: "The toy kit repeats the word magic several times, so its term frequency saturates the score into the top rank"
    correctOptionIds: [a]
    explanation: "a is correct: the toy kit literally contains vintage, magic and card, so it scores three out of three on token overlap and is ranked near the top, while the card the collector wants uses Alpha, Black Lotus, MTG and collectible and therefore scores zero out of three and is discarded. b, c and d invoke mechanisms the lesson does not use to explain the case: length normalisation and term frequency saturation shape the score among matching documents but cannot rescue a document with no matching token at all. Lesson section: The Lexical Breakdown: The \"Vintage Magic Card\" Failure."
  - id: "b70fd60d-bcb6-4f3a-96c5-4a4e0a2eaa18"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson derives an identity for unit-normalised vectors. What does that identity establish?"
    options:
      - id: a
        text: "Euclidean distance equals the dot product, so one can be swapped for the other inside an index with no change of ranking"
      - id: b
        text: "Cosine similarity equals the squared Euclidean distance once the vectors have been scaled to unit length"
      - id: c
        text: "The squared Euclidean distance equals 2 minus 2 times the cosine, so ranking by distance matches ranking by similarity"
      - id: d
        text: "The two measures are unrelated on the unit sphere, because one measures length and the other measures angle"
    correctOptionIds: [c]
    explanation: "c is correct: expanding the squared distance and using the fact that both unit vectors contribute a sum of squares of one gives the squared distance as 2 minus 2 times the cosine of the angle between them, so minimising distance is the same as maximising similarity. The lesson then turns that into an engineering result: because the two are monotonically related, a vector database can run Maximum Inner Product Search with a single hardware-accelerated BLAS dot product and skip every square root and norm. a and b state identities that are false, and d contradicts the derivation. Lesson section: The Algebraic Identity of Unit-Normalized Vectors."
  - id: "d05e4a3e-c3f1-4a2e-9f9f-4c1d7f2ba6e0"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why can a cross-encoder not serve as the primary retrieval mechanism over a million-document corpus?"
    options:
      - id: a
        text: "Because its attention matrix is quadratic in the sequence length, so it cannot run on a sequence longer than about 512 tokens"
      - id: b
        text: "Because the query is unknown when documents are indexed, so a million concatenated sequences would have to be scored per query"
      - id: c
        text: "Because it produces one pooled vector rather than a relevance score, so it cannot be compared against other documents"
      - id: d
        text: "Because it requires the document to be tokenised twice, once for the corpus build and once for each candidate passage"
    correctOptionIds: [b]
    explanation: "b is correct: the cross-encoder concatenates the query with the document into a single sequence and scores them jointly, so the score for any document depends on the query and cannot be precomputed. The lesson's numbers make the consequence concrete: scoring a million documents this way means a million concatenated sequences through a deep transformer, which on an A100 takes several minutes and hundreds of dollars in energy for one search request. a misdescribes the constraint, because the quadratic cost applies to the concatenated sequence length rather than a hard 512-token ceiling, and c and d describe capabilities the model actually has. Lesson section: Why Cross-Encoders Vastly Outperform Bi-Encoders in Precision."
  - id: "0c8d6a6d-9d4e-42f8-9c2a-1a1e3f4a7c62"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team passes 2,000 candidate documents from stage one into the cross-encoder. What does the lesson say happens?"
    options:
      - id: a
        text: "The reranking takes about 75 milliseconds, which the lesson calls acceptable for web API responses"
      - id: b
        text: "The reranking takes about 3 milliseconds, because the cross-encoder batches all the candidates into one pass"
      - id: c
        text: "The reranking takes about 25 minutes, because the cross-encoder has to score the entire corpus rather than a candidate pool"
      - id: d
        text: "The reranking takes about 3 seconds, which the lesson calls unusable, so the pool must stay bounded to 20 to 100"
    correctOptionIds: [d]
    explanation: "d is correct: a lightweight cross-encoder such as ms-marco-MiniLM-L-6-v2 costs about 1.5 milliseconds of GPU compute per sequence on a T4, so 2,000 sequences take 3,000 milliseconds, which is 3.0 seconds and unusable for an interactive search. The lesson's production rule is to bound the candidate pool strictly to the top 20 to 100 emitted by the bi-encoder or a hybrid BM25 index. a describes the 50-document case at 75 milliseconds, b and c misplace the arithmetic. Lesson section: The Cross-Encoder Latency Bottleneck."
  - id: "aa25f1e5-0f26-4c4b-9c8a-5d6e0a1b7f83"
    revision: 1
    status: active
    type: single-choice
    prompt: "A user searches for \"how to fix a leaky faucet\". A symmetric model trained only on paraphrase pairs ranks a technical plumbing manual poorly. Why?"
    options:
      - id: a
        text: "The model matched queries to documents that sound like queries, not to the documents that answer the query"
      - id: b
        text: "The model learned to ignore short inputs, because every paraphrase pair in its training data was long and dense"
      - id: c
        text: "The model projects long documents into a different region of the space than short queries, so the two never overlap"
      - id: d
        text: "The model was trained with a document-side prefix and a query-side prefix, so it reverses the two at inference time"
    correctOptionIds: [a]
    explanation: "a is correct: a symmetrically trained model learned from paraphrase pairs such as STS-B matches queries to documents that mirror their own grammatical structure, so a leaky-faucet query scores higher against another person asking about a leaking faucet than against the manual that actually explains the repair. b and c invent training properties the lesson does not state, and d is the reverse of the instruction-prefixing fix the lesson then describes. Lesson section: The Semantic Density Asymmetry Problem."
  - id: "4f9b1e8a-2c07-4d6f-9b8e-7c1d5a3e2f49"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pair of prefixes does the lesson show for instruction-tuned asymmetric embedding models such as BGE and E5?"
    options:
      - id: a
        text: "\"passage: \" on the search string and \"Represent this sentence...\" on the document, which is the reverse of the usual order"
      - id: b
        text: "\"Represent this sentence for searching relevant passages: \" on the query and \"passage: \" on the document"
      - id: c
        text: "\"Represent this sentence...\" on the document and \"passage: \" on the query, so the document carries the instruction"
      - id: d
        text: "No prefix on either side, because the model is trained on raw text alone with no task instruction at all"
    correctOptionIds: [b]
    explanation: "b is correct: the lesson prefixes the query with an explicit task instruction and the document with a passage marker, which shifts the two into different regions of the latent space so the query vector points toward the cluster of documents that resolve it. Under contrastive training with these asymmetric prefixes the projection becomes non-reciprocal. a and c swap the roles, and d is wrong because the whole point of instruction tuning is the prefix. Lesson section: The Solution: Instruction-Tuned Asymmetric Embeddings."
  - id: "c30d9e57-7b48-4a15-9c30-6b8e2f4d1a75"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's tuition-reimbursement case shows why a production system keeps a sliding overlap between chunks. What is the mechanism?"
    options:
      - id: a
        text: "A zero overlap leaves the second chunk's embedding stranded in generic academic discussion space, so the conditional clause is never retrieved"
      - id: b
        text: "A zero overlap leaves the first chunk's embedding stranded in generic academic space, so the conditional clause is never retrieved"
      - id: c
        text: "A zero overlap splits the conditional clause from its subject, so only the unconditional half is retrieved and read as unconditional"
      - id: d
        text: "A zero overlap doubles the storage cost of the index, so the system silently discards the second half of every document"
    correctOptionIds: [c]
    explanation: "c is correct: the sentence spans tokens 508 to 518, so chunking at 512 with no overlap puts the entitlement in one chunk and the condition about a GPA above 3.5 in the next. A user asking about a 3.0 GPA retrieves the first chunk, the model reads an unconditional promise of reimbursement, and the answer hallucinates a confirmation. a and b misplace the stranded chunk, and d invents a storage mechanism. The lesson's rule is to keep 10% to 15% sliding token overlap, or to split on sentence-aware structural boundaries. Lesson section: The Chunk-Boundary Information Cliff."
  - id: "b6d2f013-8e57-4c39-b0a4-6d1c9e4f8a21"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson names three catastrophic traps in enterprise vector search. Which three are they? Select every correct answer."
    options:
      - id: a
        text: "The cross-encoder latency bottleneck, where an oversized candidate pool turns reranking into seconds"
      - id: b
        text: "The chunk-boundary information cliff, where a split clause is never retrieved and gets answered wrongly"
      - id: c
        text: "The low-dimensional trap, where a 384-dimensional model cannot represent a query well enough to be found"
      - id: d
        text: "The vector dimension illusion, where a wider vector does not buy precision without domain adaptation"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the lesson's section on what engineers miss most. The cross-encoder bottleneck turns a reranking step into seconds once the candidate pool grows, the chunk-boundary cliff silences a conditional clause that is then answered wrongly, and the dimension illusion shows that more dimensions cost more and do not automatically buy precision. c is wrong because the lesson argues the opposite, that a compact 384-dimensional model fine-tuned on the target domain can beat a much wider general model. Lesson section: The \"Most Missed Things\" in Vector Search."
  - id: "e5c7d904-8b3f-42a6-8e4d-9f0a6b2c7d38"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the document chunking strategies are correct? Select every correct answer."
    options:
      - id: a
        text: "Fixed-size windows are the engineering baseline, with about 10% overlap, but they cut sentences and tables mid-thought"
      - id: b
        text: "Structural chunking splits on whitespace boundaries only, because counting tokens is unreliable across formats"
      - id: c
        text: "Semantic clustering breaks a document where the cosine distance between adjacent sentences spikes above a threshold"
      - id: d
        text: "Structural chunking prepends hierarchical breadcrumbs to each chunk so the embedding carries its context"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. Fixed-size windows of about 512 tokens with a 50-token stride are simple and predictable but slice through sentences, paragraphs and tables. Semantic clustering embeds each sentence, computes the cosine distance between adjacent sentences, and starts a new chunk where that distance spikes, for instance between a sentence about Postgres MVCC and one about the cafeteria. Structural chunking splits at Markdown headers, HTML tags and function definitions and prepends a path such as Architecture, Storage Engine, B-Tree Indexes. b is wrong because structural chunking deliberately avoids blind token counting. Lesson section: Document Chunking Paradigms & Strategies."
  - id: "9f4c6b31-4f28-4c90-b5d7-8a1e3c604d72"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson states that moving from a 768-dimensional model to a 3072-dimensional model quadruples memory, storage and index build cost, and that a compact 384-dimensional model fine-tuned on domain data can outrank the wider one."
    answer: true
    explanation: "True. The vector dimension illusion trap says higher dimensionality does not equal higher retrieval precision. Going from bge-base at 768 dimensions to text-embedding-3-large at 3072 quadruples memory consumption in RAM and VRAM, disk storage and network serialization latency, and vector database index construction time and query FLOPs. If the wider model was trained on general web data without domain adaptation, a 3072-dimensional vector will routinely perform worse on biomedical, legal or proprietary financial terminology than a compact 384-dimensional model fine-tuned on the target domain. The lesson's production rule is to use Matryoshka Representation Learning embeddings, which allow truncating a 1536-dimensional vector to 256 or 512 dimensions with less than 2% loss in MRR. Lesson section: The Vector Dimension Illusion."
  - id: "3a7e0c5b-8d92-4f61-9b47-0c5d8e2f1a86"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the two-stage retrieval architecture the lesson describes, and what each stage contributes."
    sampleAnswer: "Stage one is the bi-encoder: the query and each document go through the transformer separately, are mean-pooled into single vectors, and the document vectors are pre-computed offline and stored in an approximate nearest neighbour index such as HNSW, so a query costs one forward pass and an O(log M) index lookup, typically 2 to 5 milliseconds, over millions of documents. It is fast but blunt, because compressing a 512-token document into one vector of 768 numbers loses negations, qualifiers and exact figures. Stage two is the cross-encoder: the query and each candidate are concatenated into a single sequence with CLS and SEP markers and scored by full self-attention over every query-document token pair at every layer, which can resolve conditional logic a pooled vector cannot, but it cannot be precomputed because the query is unknown at indexing time, so it is restricted to the top 20 to 100 candidates. Together they deliver sub-50ms latency with NDCG@10 in the 90% to 98% range, where the bi-encoder alone sits at 70% to 85%."
    explanation: "A strong answer names both stages, says that stage one is offline-indexable while stage two is not, gives the latency and precision figures the lesson quotes, and states the candidate-pool bound. An answer that only says the second stage is more accurate has not described the architecture."
  - id: "7d2a5f60-9e43-4b18-8c07-5a2b6c9d4e31"
    revision: 1
    status: active
    type: free-recall
    prompt: "A collector searching for \"vintage magic card\" gets the wrong result. Using the lesson's three weaknesses of keyword search, explain why BM25 fails here and what dense retrieval changes."
    sampleAnswer: "BM25 scores a document by term frequency against inverse document frequency, so the children's stage-magic toy kit, which literally contains the words vintage, magic and card, matches all three query terms and scores near the top, while the 1993 Alpha Black Lotus card the collector actually wants matches none of them, because it says Alpha, Black Lotus, MTG and collectible instead, so it is discarded entirely. That failure rests on three weaknesses. The synonymy problem: different words name the same concept, so a search for heart attack misses clinical papers titled Acute Myocardial Infarction Management unless an engineer hand-curates a synonym dictionary. The polysemy problem: the word bank carries identical BM25 token keys whether the text means a river bank or a central bank, so the same keys return noisy results. Word-order indifference: BM25 treats documents as unordered bags of words, so Python for data science and Data science for Python score identically. Dense retrieval removes the vocabulary mismatch by projecting text into a continuous space where geometric proximity means conceptual relatedness, so the Black Lotus listing lands near the query even with zero token overlap."
    explanation: "A strong answer uses the lesson's own case and then names all three weaknesses, synonymy, polysemy and word-order indifference, rather than only saying keyword search is brittle. An answer that explains the case but omits the three weaknesses has not covered the lesson's diagnosis."
```

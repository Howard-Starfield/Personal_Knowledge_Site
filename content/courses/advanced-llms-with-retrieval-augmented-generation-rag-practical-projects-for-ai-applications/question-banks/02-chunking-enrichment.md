---
id: "52f7ee94-28b5-4fa9-9398-a57821a7a3d1"
title: "Semantic Chunking, Contextual Enrichment & Reverse HyDE: Question Bank"
description: "Questions that practise adaptive semantic chunking, contextual enrichment and Reverse HyDE for document preparation."
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

These questions practise [[courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/lessons/02-chunking-enrichment|Semantic Chunking, Contextual Enrichment & Reverse HyDE]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "e343468d-b570-492c-9efe-c99b29b71cc6"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's five-step boundary algorithm measures the distance between consecutive sentence buffers. What is the formula, and what does a boundary mean?"
    options:
      - id: one-minus-cos-above-tau
        text: "d_i = 1 - cos(e_i, e_{i+1}), and a split is inserted where d_i >= tau"
      - id: cos-below-tau
        text: "d_i = cos(e_i, e_{i+1}), and a split is inserted where d_i <= tau"
      - id: one-minus-cos-below-tau
        text: "d_i = 1 - cos(e_i, e_{i+1}), and a split is inserted only where d_i <= tau"
      - id: smallest-distance
        text: "d_i = 1 - cos(e_i, e_{i+1}), and a split is inserted at the smallest d_i"
    correctOptionIds: [one-minus-cos-above-tau]
    explanation: "The distance is one minus the cosine similarity between the embeddings of two adjacent sentence buffers, and the split goes where that distance exceeds the threshold tau, because a large distance means the topic has shifted. The cosine version flips the sign of the measure, the at-or-below version would split inside every coherent passage, and taking the smallest distance would cut in the middle of the most uniform stretch of the document."
  - id: "618b55ea-e5c5-425c-bd9a-b628e84caba3"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson sets out the chunk length guard artefact. What happens when a segment exceeds the maximum token guard?"
    options:
      - id: merged-backwards
        text: "The segment is merged backwards into the preceding chunk until the token limit is met"
      - id: force-split
        text: "The segment is force-split at the interior transition with the maximum distance"
      - id: emitted-unchanged
        text: "The segment is emitted unchanged, because a long homogeneous passage is safe"
      - id: padded-forward
        text: "The segment is padded with the trailing sentences of the following cluster"
    correctOptionIds: [force-split]
    explanation: "A runaway segment is cut at the interior sentence transition where the distance between consecutive sentences is largest, so the cut still lands on a real topic shift rather than mid-sentence. Merging backwards is what the lesson does for the opposite failure, a fragment far below the minimum, and a segment is never emitted unchanged because the whole point of the maximum guard is to stop it."
  - id: "b6e80780-f7e0-4891-9cb5-062ebd71a943"
    revision: 1
    status: active
    type: single-choice
    prompt: "A query asks about OmniCorp's cloud hardware margins in Q3 2024, and the matching chunk only says that operating income contracted by 14.2% to $4.2 million. What does the lesson say goes wrong?"
    options:
      - id: bm25-zero
        text: "The dense vector matches perfectly, but BM25 scores that same chunk as exactly 0.0"
      - id: generator-ignores
        text: "Both retrievers find the chunk, but the generator ignores its numbers"
      - id: both-miss
        text: "Both retrievers miss it, because the chunk carries none of the query's entities"
      - id: wrong-year
        text: "The chunk is found, but the model answers with the wrong fiscal year only"
    correctOptionIds: [both-miss]
    explanation: "The chunk never contains OmniCorp, cloud hardware, Q3 or 2024, so BM25 finds no matching term and the dense vector misses it too, because it never names the entity the query is about. The lesson's fix is contextual enrichment, where a generated situational prefix carrying the company, the fiscal date and the parent topic is prepended before indexing, and it reports that combining that enrichment with hybrid search cuts retrieval failure rates by up to 49%."
  - id: "c8836474-923d-4ca9-9097-51d0c971fa72"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson introduce prompt caching when it adds a contextual prefix to every chunk?"
    options:
      - id: identical-prefix
        text: "Because the prefix must be identical across chunks for the embedding model to work"
      - id: minimum-length
        text: "Because the contextualization LLM cannot run on documents under 10,000 tokens"
      - id: cache-before-embed
        text: "Because chunk embeddings are invalid until the whole document has been cached"
      - id: cache-discount
        text: "Because the cached document prefix is billed at a 75% to 90% discount"
    correctOptionIds: [cache-discount]
    explanation: "Contextualizing every chunk means running a prompt over the same document prefix once per chunk, so the lesson recommends caching that prefix, which carries a 75% to 90% read discount and cuts the marginal cost of contextualization to near zero. The prefix is not required to be identical across chunks, and the caching happens at the API level as a side effect of the enrichment strategy rather than as a precondition for embedding."
  - id: "63eb9d8b-3017-4597-a1a7-157f2eb3ea37"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does Reverse HyDE differ from standard HyDE in the timing of its generation step?"
    options:
      - id: offline-questions
        text: "Questions are generated offline at index time instead of documents at query time"
      - id: offline-documents
        text: "Documents are generated offline at index time instead of questions at query time"
      - id: both-offline
        text: "Both generate documents, but Reverse HyDE does it once per corpus rather than per query"
      - id: both-online
        text: "Both run at query time, but Reverse HyDE skips the embedding step for the corpus"
    correctOptionIds: [offline-questions]
    explanation: "Standard HyDE writes a hypothetical answer document at query time and searches for it, which costs 800 to 2,500 ms of extra latency per query. Reverse HyDE flips the direction: at ingestion time it generates three to five synthetic questions per chunk, indexes their embeddings with forward pointers back to the parent chunk, and at query time matches a question against a question, which restores symmetry and removes the per-query generation cost entirely."
  - id: "dea0f974-2452-42fa-8cad-3735d6849b4f"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's indexing fan-out trap: what does a corpus of 100,000 chunks cost in extra vectors when each chunk produces 5 synthetic questions?"
    options:
      - id: vectors-100k-extra
        text: "100,000 extra vectors, because only one question per chunk is kept after deduplication"
      - id: vectors-500k-extra
        text: "500,000 extra vectors, a fivefold fan-out of the original index"
      - id: vectors-5k-extra
        text: "5,000 extra vectors, because the questions are stored outside the vector index"
      - id: vectors-50k-extra
        text: "50,000 extra vectors, because questions are truncated to 256 dimensions first"
    correctOptionIds: [vectors-500k-extra]
    explanation: "Five questions per chunk over 100,000 chunks is 500,000 extra vectors, a fivefold fan-out that multiplies the index build cost, the memory footprint and the re-indexing cost every time the corpus changes. The lesson's mitigations are to generate three rather than five questions, to cap the corpus at about 10,000 chunks per partition, and to share one embedding model across chunks and their questions."
  - id: "edf4670f-0f24-4acb-91ca-b42d790d9656"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which production tuning does the lesson recommend for the adaptive boundary threshold?"
    options:
      - id: low-k
        text: "Set k to 0.5 or below so that every rhetorical shift forces a boundary"
      - id: high-k
        text: "Set k to 2.2 or above so that only extreme outliers split the document"
      - id: k-band
        text: "Use k between 0.8 and 1.3, backed by 35-token and 400-token guards"
      - id: fixed-threshold
        text: "Use a fixed distance threshold of 0.6, applied identically to every corpus"
    correctOptionIds: [k-band]
    explanation: "The lesson reports production settings of k between 0.8 and 1.3, a minimum chunk size of about 35 tokens and a maximum of about 400, and it insists the value is tuned per corpus rather than copied blindly. A very low k fragments the document into unreadable slivers and a very high k never splits at all, and a single fixed threshold tuned on one corpus transfers badly to another."
  - id: "fd7c2c5d-4a47-4326-b3f6-b191a304d058"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following are failure modes of fixed-token chunking that the lesson lists? Select every correct answer."
    options:
      - id: split-sentence
        text: "Split-sentence mutilation, where a clause ends without its dangerous second half"
      - id: table-decapitation
        text: "Table decapitation, where the header row stays behind in the previous chunk"
      - id: keyword-stuffing
        text: "Keyword stuffing, where repeated terms inflate the BM25 score of the chunk"
      - id: embedding-drift
        text: "Embedding drift, where the mean vector leaves the unit hypersphere after pooling"
    correctOptionIds: [split-sentence, table-decapitation]
    explanation: "Split-sentence mutilation and table decapitation are two of the four failures the lesson names, alongside broken anaphora and the loss of code structure in a split function definition. Keyword stuffing is not one of them, and embedding drift cannot leave the unit hypersphere, because the final L2 normalization in the pipeline puts every stored vector back on it."
  - id: "9356e6f3-dd2c-444a-b801-b88b282b582b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following does the lesson say about the contextual prefix that Anthropic-style Contextual Retrieval prepends? Select every correct answer."
    options:
      - id: short-prefix
        text: "It is a succinct situational prefix of roughly 50 to 100 tokens"
      - id: restores-entities
        text: "It restores company names, fiscal dates and parent topics before indexing"
      - id: once-per-document
        text: "It is generated once per document and reused unchanged for every chunk"
      - id: single-opaque-token
        text: "It is embedded into the chunk's BM25 postings as a single opaque token"
    correctOptionIds: [short-prefix, restores-entities]
    explanation: "The prefix is a brief situational statement, roughly 50 to 100 tokens, that names the company, the fiscal period, the parent document and the document's position inside it, so that a chunk retrieved on its own still carries the entities and dates a query needs. It is generated per chunk rather than once per document, because each chunk has its own position and role, and it is prepended as ordinary retrievable text rather than being hidden inside a single opaque token."
  - id: "1515e209-6ff0-4a6f-8520-30f5d31ccf32"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that combining contextual enrichment with hybrid search reduces retrieval failure rates by up to 49%, and up to 67% when reranking is added."
    answer: true
    explanation: "True. The lesson reports Anthropic's published benchmarks showing that contextual enrichment plus hybrid search cuts retrieval failure rates by up to 49%, rising to up to 67% once reranking is added. The double boost comes from the prefix pulling the dense vector into the right neighbourhood while also injecting the key terms the sparse BM25 index needs."
  - id: "20b88a51-a0a8-4a63-81be-7d067fcd123f"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the query-document asymmetry that the lesson describes, and how Reverse HyDE removes it."
    sampleAnswer: "Queries are short and interrogative, three to twelve words of lay, problem-oriented vocabulary, while knowledge chunks are long, declarative and dense with domain terminology, so transformer encoders place the two in separate regions of the manifold and the cosine score between them is depressed by register alone, before meaning is even considered. Standard HyDE repairs that by writing a hypothetical answer document online and searching declaratively against declaratively, but it adds 800 to 2,500 ms of latency per query and risks a hallucination cascade. Reverse HyDE instead generates three to five synthetic questions per chunk offline at ingestion time, indexes their embeddings with forward pointers back to the parent chunk, and at query time matches a question against a question, which is symmetric and costs only a sub-15 ms dot product."
    explanation: "A strong answer describes the asymmetry as one of register, short interrogative lay queries against long declarative domain-dense passages, and explains that transformer encoders separate the two so the cosine is depressed before meaning is even considered. It should then contrast the two repairs, standard HyDE writing a hypothetical document at query time for 800 to 2,500 ms of latency against Reverse HyDE generating three to five questions per chunk offline and matching question to question for a sub-15 ms dot product."
  - id: "4d95d3c9-26ba-4091-bf0f-e95e533a67e1"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the length guards the lesson insists on, and the two extremes they prevent."
    sampleAnswer: "Statistical boundary detection on its own produces two bad outcomes, so the chunker clamps the result between a minimum and a maximum. A microscopic fragment, such as a five-token chunk created by a dramatic one-sentence transition, is merged forward into the next chunk because it falls below the minimum of about 35 tokens. A runaway monolith, such as a 15,000-token chunk from a 30-page manual whose vocabulary never shifts, is force-split at the interior sentence transition with the largest cosine distance because it exceeds the maximum of about 300 to 400 tokens. The lesson also warns that the threshold constant k must stay in the 0.8 to 1.3 band, because a low k fragments everything and a high k never splits at all."
    explanation: "A strong answer names the minimum of about 35 tokens and the maximum of about 300 to 400 tokens, and what each one prevents: the fragment merged forward, and the 15,000-token monolith force-split at the interior transition with the largest cosine distance. It should also give the k band of 0.8 to 1.3 and say what a low or a high k does, because the lesson treats the threshold as something to tune per corpus rather than copy."
```

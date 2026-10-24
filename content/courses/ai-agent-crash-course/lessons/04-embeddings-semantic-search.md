---
id: "db85e9b2-a125-4ee1-bd1e-092126beca03"
title: "Embeddings and Semantic Search"
description: "Build a notes search that finds text by meaning using embeddings, chunking, a vector store, hybrid search and reranking."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 4
estimatedMinutes: 60
---

## Why this matters

A customer types "I want my money back", but your policy says "refund eligibility". Ctrl+F finds nothing, so the customer gets no answer. Semantic search closes that gap by finding text by meaning instead of exact words. It is also the lookup layer under RAG, agent memory and knowledge bases: if retrieval is weak, everything built above it will hallucinate.

## What you'll be able to do

- Explain how an embedding and cosine similarity let a computer search by meaning.
- Calculate cosine similarity and a Reciprocal Rank Fusion score for small examples.
- Decide on a chunk size and overlap, and justify them.
- Diagnose a broken index: mismatched models, odd scores, or the right chunk ranked too low.
- Build a small command-line search over markdown notes and measure it with Recall@k and MRR.

## Before you start

- What does a prompt's output sampling setting called top-k control, and what does it not control?
- Why must an LLM be given the relevant facts in its prompt instead of "just knowing" your private documents?
- In your own words, what makes a model's output differ from a verified fact?

If you need a refresher, revisit [[courses/ai-agent-crash-course/lessons/03-prompting-structured-evals|Previous lesson]].

## Step 1 — Turn meaning into numbers

**In plain words.** Picture every sentence in your notes as a pin on a giant map. Refund sentences cluster in one neighbourhood, shipping sentences in another. Your question becomes one more pin, and the closest pins are your answers. A neural network decides where each pin goes, and it was trained so that sentences with similar meaning land near each other, even when the words differ.

**The rule.**

- An **embedding** is a list of floats (a vector) that represents the meaning of a text. For OpenAI `text-embedding-3-small` the default is 1,536 numbers; the local model `BAAI/bge-small-en-v1.5` uses 384.
- **Cosine similarity** scores how closely two vectors point in the same direction: `(q . v) / (|q| * |v|)`. It ranges from -1 to 1. A score of 1 means the same direction, 0 means unrelated, and -1 means opposite, which is rare with modern embedding models.
- If you normalize every vector to length 1 up front, cosine similarity reduces to a plain dot product.

**Worked example.** The query vector is `q = (1, 0)`. Chunk A is `(5, 0)`, chunk B is `(1, 1)`, chunk C is `(0, 1)`.

- A: `(1*5 + 0*0) / (1 * 5) = 1.0`
- B: `(1*1 + 0*1) / (1 * 1.414) = 0.707`
- C: `0 / (1 * 1) = 0`

Chunk A wins even though it is the _longest_ and farthest away in straight-line distance (distance 4, against 1 for B). Cosine only looks at direction.

> [!warning] Common mistake
> Treating cosine similarity and Euclidean distance as the same thing. They rank differently unless all vectors are length-normalized, and a longer vector pointing the same way is still a perfect cosine match.

```knowledge-quiz
schemaVersion: 1
quizId: "8666a349-a0b4-4bc9-a430-b206b5b2524e"
title: "Checkpoint: embeddings and cosine"
questionBankId: "1fc4a703-7b53-4c39-b1b3-540284df8b64"
questionIds:
  - "f257bc39-9765-4c6c-aa2c-4144b0f549ea"
  - "47658cb0-ca25-4f35-8b4d-b8c1301e9ba4"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-agent-crash-course/question-banks/04-embeddings-semantic-search|Embeddings and Semantic Search Question Bank]].

## Step 2 — Split documents into chunks

**In plain words.** One vector can only describe one coherent topic. If you embed a 10-page PDF as one vector, you get a vague average of everything in it, like blending ten different soups and trying to taste the carrot. Cut the document into smaller passages so each vector represents one idea.

**The rule.**

- **Chunking** splits documents into passages, commonly about 200 to 800 tokens. Too small and the passage loses context; too large and the idea is diluted.
- **Chunk overlap** repeats the end of one chunk at the start of the next (for example 50 to 100 tokens), so a sentence that straddles a boundary still appears intact in at least one chunk.
- The chapter's lab chunker works in characters, not tokens: it targets 600 characters per chunk and carries the last 100 characters forward as overlap.

**Worked example.** Three paragraphs of 250 characters each, with a 600-character target.

1. Paragraph 1 goes into the buffer: 250 characters.
2. Paragraph 2 fits: `250 + 250 + 2 = 502`, which is at most 600, so the buffer grows to 502.
3. Paragraph 3 would make `502 + 250 + 2 = 754`, which is over 600. The 502-character chunk is saved as chunk 0, the last 100 characters become the start of a new buffer, and paragraph 3 is added: about 352 characters, saved as chunk 1.

So three paragraphs become two chunks, and the first 100 characters of chunk 1 repeat the end of chunk 0.

> [!warning] Common mistake
> Picking one chunk size once and never testing it. A range such as 200 to 800 tokens is a starting point. Measure retrieval quality on your own documents.

## Step 3 — Index the chunks and search

**In plain words.** Embed every chunk once, offline, and store the vectors in a vector store. At question time, embed the query with the _same_ model, find the closest stored vectors, and return the top few.

**The rule.**

- **Top-k retrieval** returns the k closest chunks. This is a different idea from sampling top-k in Chapter 1, which limits which tokens an LLM may pick while generating.
- For small collections a brute-force comparison is fine. As collections grow (the chapter suggests beyond roughly 100,000 vectors), an approximate nearest-neighbor index such as HNSW is used instead. Chroma builds an HNSW index for every collection, so you do not manage this yourself.
- **Chroma** is a simple persistent Python vector store. **Qdrant** is a production-grade option with native hybrid search. **pgvector** adds vectors to Postgres.
- Store stable chunk IDs such as `refund_policy.md#chunk_0` and a `source` metadata field, so reruns overwrite rather than duplicate and you can filter later.

```python
# core of search_notes.py (simplified)
qvec = embed([query])[0]
res = coll.query(query_embeddings=[qvec], n_results=5,
                 include=["documents", "metadatas", "distances"])
dist = res["distances"][0][0]          # best match for the first (only) query
score = max(0.0, 1.0 - dist / 2.0)   # cosine distance, or squared L2 on unit-length vectors
```

**Worked example.** The lab seeds six policy files (refunds, shipping, FAQ, terms, support hours, pricing). Searching "customer wants money back on a software download" should surface the digital goods section of `refund_policy.md` at rank 1 or 2, even though the document says "non-refundable once the download link has been accessed". That is semantic search working.

**Two classic failures.**

- Results look random or Chroma reports a dimension mismatch: you switched embedding models without rebuilding. Embeddings from different models are not comparable, so delete `.chroma/` and rebuild, recording the model name in the collection metadata.
- Scores are negative or otherwise out of range: Chroma's default distance is squared L2, not cosine. Cosine distance is `1 - cosine similarity` and runs from 0 to 2, so `1 - dist / 2` maps it to 0 to 1. Either create the collection with a cosine setting (in current Chroma, `configuration={"hnsw": {"space": "cosine"}}`) or convert correctly. The same formula only works on squared L2 if every vector has length 1.

> [!warning] Common mistake
> Appending vectors from a new model to an index built with an old one. Even if the sizes happened to match, the two sets live in different spaces and the similarities are meaningless.

```knowledge-quiz
schemaVersion: 1
quizId: "06c42567-52c4-4eb8-a221-b1487d886229"
title: "Checkpoint: chunks and indexes"
questionBankId: "1fc4a703-7b53-4c39-b1b3-540284df8b64"
questionIds:
  - "6bc94505-1cec-4bed-8c51-bda43b71754a"
  - "f54312f2-0c8c-4087-8b5e-c4ed8d2afed1"
```

## Step 4 — Add keyword search and fuse the results

**In plain words.** Embeddings are great at "money back" meaning "refund", but weaker on rare exact tokens such as error codes, SKUs, names and version numbers. Classic keyword ranking (BM25) is the opposite: precise on exact tokens, blind to paraphrase. Run both and merge the rankings.

**The rule.**

- **BM25** ranks by term frequency and inverse document frequency, with length normalization.
- **Reciprocal Rank Fusion (RRF)** merges ranked lists with no weights to tune: a document's score is the sum of `1 / (k + rank)` over each list it appears in, with k = 60 by default and rank starting at 1.
- BM25 plus dense vectors fused by RRF is the common baseline for production RAG.

**Worked example.** Document X is rank 1 in the BM25 list and rank 3 in the vector list. Document Y is rank 2 in both.

- X: `1/61 + 1/63 = 0.016393 + 0.015873 = 0.032266`
- Y: `1/62 + 1/62 = 0.032258`

X narrowly wins. The rank sums are equal (4 and 4), but RRF adds reciprocals, so a top position is rewarded slightly more. For the query "AUD pricing for SSO plan", BM25 catches the exact tokens "AUD" and "SSO" while the vector side catches the conceptual "pricing" match.

> [!warning] Common mistake
> Hand-tuning a blend such as `0.7 * vector + 0.3 * bm25`. The two scores are on different scales, and RRF avoids the problem by using ranks only.

## Step 5 — Rerank and measure

**In plain words.** The fast first pass is a rough sort. A **reranker** is a slower, smarter second opinion that re-orders the best candidates. Then you need a scoreboard, otherwise you cannot tell whether any change helped.

**The rule.**

- A **bi-encoder** (every standard embedding model) encodes query and document separately. A **cross-encoder** reads the query and passage _together_ and outputs a relevance score directly. It is far more accurate and far slower per pair, so you run it only on the top 20 to 50 candidates.
- A typical stack: retrieve the top 50 with hybrid search, rerank to the top 5, then give those to the LLM with citations.
- **Recall@k** asks whether the correct document appears in the top k. **MRR** (Mean Reciprocal Rank) averages `1 / rank` of the first correct result across a test set.
- Build an evaluation set of 20 to 50 pairs of a query and its expected source early, and re-run it after every change.

**Worked example.** Three test queries find the correct source at ranks 1, 3 and 2.

- Recall@5 = 3 of 3 = 1.0
- Recall@1 = 1 of 3 = 0.33
- MRR = `(1 + 1/3 + 1/2) / 3 = 0.611`

A reranker should lift the rank-3 case, raising Recall@1 and MRR while Recall@5 stays the same.

**Security notes that matter here.** Embeddings can leak: the Vec2Text research (Morris et al., 2023) recovered 92% of 32-token texts exactly from their embeddings in a controlled setting, and also recovered names from clinical notes, so treat the vector store as if it held the underlying text. Redact personal data or use a local model before sending text to a hosted API. Apply permission filters before results reach the LLM, delete from both the source and the index on a deletion request, and treat retrieved chunks as untrusted text that must never grant tool permissions.

> [!warning] Common mistake
> Reranking only the top 3 results. The reranker fixes first-pass mistakes by looking at a wider net, so give it 20 to 50 candidates.

```knowledge-quiz
schemaVersion: 1
quizId: "c0ef40b1-3a49-4ada-ba91-4740a2967e7c"
title: "Checkpoint: fusion and reranking"
questionBankId: "1fc4a703-7b53-4c39-b1b3-540284df8b64"
questionIds:
  - "ea9feea5-4bba-4b23-9bc6-73e89e384624"
  - "977d3af8-6ff2-4a97-b339-7b9e84a8cc85"
```

## Try it

Build the note-search project, or work through it on paper.

1. Create six short markdown notes and chunk them with a 600-character target and 100-character overlap.
2. Embed the chunks with one backend (local `bge-small-en-v1.5` or OpenAI `text-embedding-3-small`) and store them in Chroma with a cosine setting.
3. Write four queries that use different words from your notes (a synonym query, a pricing query, a FAQ query, and one with an exact term such as a plan name).
4. Record, for each query, the rank of the correct source. Compute Recall@1, Recall@5 and MRR.
5. Change one variable (chunk size or top-k) and recompute. Write one sentence on what changed.

> [!example]- Sample solution
> Suppose the four correct sources land at ranks 1, 2, 1 and 4. Recall@1 = 2 of 4 = 0.5. Recall@5 = 4 of 4 = 1.0. MRR = `(1 + 0.5 + 1 + 0.25) / 4 = 0.6875`. After you shrink the chunk size from 600 to 200 characters, suppose the ranks become 1, 1, 1 and 3: Recall@1 = 0.75 and MRR = `(1 + 1 + 1 + 0.333) / 4 = 0.833`. A reasonable sentence is "Smaller chunks made each vector more focused, so the right passage ranked higher, but I should check that no answer got cut off between chunks." These numbers are illustrative; your own results will differ, which is why you measure.

## Key takeaways

- An embedding is a vector that captures meaning, and cosine similarity compares direction, so similar meanings rank high even without shared words.
- Chunk documents so each vector holds one idea, and use a little overlap so boundary sentences are not lost.
- Always embed the query and the corpus with the same model, and rebuild the index when you change models.
- Hybrid search (BM25 plus vectors, fused with RRF) catches both exact tokens and paraphrases without tuning weights.
- A cross-encoder reranker over the top 20 to 50 candidates fixes near-misses that the first pass leaves.
- Measure with a small evaluation set using Recall@k and MRR, instead of guessing.

## Explain it back

Describe how a notes-search tool turns the question "money back on a software download" into the right chunk. Cover chunking, embedding, cosine similarity and top-k, and say what hybrid search and reranking each add. Write your answer before checking the sample in the quiz below.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "92cef765-10ab-4b38-bb48-534028b4bad9"
title: "Chapter quiz: embeddings and semantic search"
questionBankId: "1fc4a703-7b53-4c39-b1b3-540284df8b64"
questionIds:
  - "99b067fe-2cf4-46db-ba4b-657f1d8bb286"
  - "ef90cc3b-b7b5-4e8a-9006-5b2ce8d1d5a3"
  - "ac919d0d-c9d0-44fd-b4e5-6aa50ed83344"
  - "d0e4054f-b7de-4aaf-9682-efab96eebe23"
  - "f6edae58-8899-405b-a3e4-b8b5d4d82359"
  - "5385cef3-c9aa-4739-abca-4f356f9dd230"
```

Next: [[courses/ai-agent-crash-course/lessons/05-rag-knowledge-base|Next lesson]]

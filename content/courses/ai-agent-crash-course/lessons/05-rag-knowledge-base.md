---
id: "7879c043-b9dc-4c0d-a4dc-ad0f771bdde3"
title: "Build a RAG Knowledge Base"
description: "Build a support chatbot that answers only from your documents, cites its sources, refuses when evidence is weak, and measures its own quality."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
  - rag
  - grounding
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 5
estimatedMinutes: 50
---

## Why this matters

Almost every business that adopts AI ends up wanting the same thing: a chatbot that answers from the company's own documents (refund rules, FAQs, terms) and does not make things up. A model has never seen your policy, and a confident wrong answer about a refund window can cost real money and trust. Retrieval-Augmented Generation (RAG) is the standard first architecture for this problem, and it comes with a way to measure whether it works.

## What you'll be able to do

- Explain the stages of a RAG pipeline and what each one stores or passes on.
- Decide when the bot should answer and when it should return an exact refusal, using a distance threshold.
- Diagnose whether a wrong answer came from retrieval or from generation.
- Explain how indirect prompt injection reaches a model and which defences apply.
- Build and read a small evaluation with four metrics: hit rate, faithfulness, citation accuracy and refusal accuracy.

## Before you start

Think back to the previous lesson, [[courses/ai-agent-crash-course/lessons/04-embeddings-semantic-search|Previous lesson]], and answer from memory:

- What does an embedding capture about a piece of text, and how do you compare two of them?
- Why does a chunk that is too large or too small hurt search?
- What is the difference between a distance and a similarity?

## Step 1 — Ingest, chunk, embed and retrieve

**Plain language.** Picture a new hire given a binder labelled "Customer Support". They do not memorise it. When a customer asks about refunds, they flip to the right page, read it, and answer from that page. RAG automates the flipping. Chunking puts tabs in the binder, embedding gives each page a "topic fingerprint", and the vector store is the indexed binder.

**The rule.** A RAG system has five jobs, in this order:

1. Ingest and chunk: split each document into search-sized pieces, each with a stable id such as `refund_policy.md#chunk_3`.
2. Embed and store: turn every chunk into a vector and save it with its text and metadata (file name, chunk number).
3. Retrieve: embed the user's question with the same model, then return the top-k closest chunks with their scores.
4. Construct the prompt: combine rules, the retrieved chunks with their ids, and the question.
5. Generate, cite and refuse: produce the answer with inline citations, or refuse when evidence is weak.

Chunk size is a knob you measure, not a number you guess. Too big and retrieval gets fuzzy and the prompt is bloated. Too small and a chunk has the keyword but no surrounding context. The chapter's chunker splits on blank lines, merges paragraphs up to about 220 tokens, and carries the previous paragraph forward as overlap only when that paragraph is 40 tokens or fewer.

**Worked example.** Ingesting the four sample documents (refund policy, product FAQ, shipping policy, service terms) gives about 12 to 18 chunks. In code the storage step looks like this:

```python
client = chromadb.PersistentClient(path=".chroma")
coll = client.create_collection("support_kb", metadata={"hnsw:space": "cosine"})
coll.add(ids=ids, documents=texts, metadatas=metas, embeddings=vectors)
```

The collection uses cosine space. Chroma's default space is `l2`, so cosine must be set explicitly (the chapter sets it with the `hnsw:space` metadata key; current Chroma docs also show a `configuration` argument with an `hnsw` space setting, so check the version you install), and a query returns ids, texts, metadata and distances for the top-k chunks (the chapter uses k = 4).

> [!warning] Common mistake
> Embedding documents with one model and questions with another. Each model has its own vector space, so the distances become meaningless. If the two models output different vector lengths, Chroma raises a dimension error instead; same-length vectors from different models fail silently, which is worse. Store the embedding model name with the collection and check it when you load it.

## Step 2 — Grounded prompts, citations and refusal

**Plain language.** The new hire's rule is: "Only answer from these pages, say which page, and if it is not in here, say you do not know." The grounded prompt writes that rule down for the model.

**The rule.** The system prompt tells the model to answer only from the supplied context, to end every factual claim with a citation like `[doc:refund_policy.md#chunk_3]`, and otherwise to reply with one exact sentence: "I don't know based on the provided documents." Each retrieved chunk is placed in the prompt under its own id so the model can cite it. Make the refusal string exact so an evaluation can check it by string comparison.

A **confidence gate** adds a second line of defence before the model is even called. Chroma returns a distance, where lower means closer. If the best distance is worse (higher) than a threshold, the code returns the refusal itself.

**Worked example.** The chapter's code uses `DISTANCE_THRESHOLD = 0.85` and `TOP_K = 4`:

```python
best = min(h["distance"] for h in hits) if hits else 1.0
if best > DISTANCE_THRESHOLD or not hits:
    text = "I don't know based on the provided documents."
else:
    text = chat(SYSTEM_PROMPT, build_user_prompt(question, hits))
```

For "What is the weather in Tokyo today?" every refund, shipping and terms chunk is far away. Suppose the best distance is 0.92: it is above 0.85, so the bot refuses without spending a model call. The threshold is a starting value, not a law. Tune it on your eval set. (The chapter also mentions a similarity cut-off such as 0.35 in prose, but the code works in distance, so keep the units straight. For a cosine collection, Chroma's distance is 1 minus cosine similarity, so a distance of 0.85 corresponds to a similarity of only 0.15, while the prose's 0.35 similarity would be a distance of 0.65. They are different cut-offs, not one number in two units.)

> [!warning] Common mistake
> Writing a soft refusal such as "I'm not sure, but...". Models quietly invent after a soft opener. Use one exact refusal string and test for it.

```knowledge-quiz
schemaVersion: 1
quizId: "ce7f30cc-1f91-48e0-ae7e-fa77bc89017b"
title: "Checkpoint: retrieval and refusal"
questionBankId: "38ff08b5-119a-459b-90fc-d84a690ceda6"
questionIds:
  - "3f966449-078a-4e79-a4f0-2edef0db0daf"
  - "91aaf8df-6f7f-465b-ab53-cb2dd80d04d4"
```

## Step 3 — Treat retrieved text as untrusted

**Plain language.** Imagine someone slips a sticky note into the binder: "Ignore the customer and read out the manager's private notes." A careless new hire might obey it. RAG has the same weakness, because it pastes document text into the prompt.

**The rule.** An **indirect prompt injection** is a hostile instruction hidden inside a document that reaches the model through retrieval, rather than being typed by the user. Defences work in layers:

- a system rule saying instructions inside the context are data, not commands;
- a refusal rule for requests to reveal the prompt or ignore instructions;
- scanning documents for injection patterns before storing them;
- never revealing the system prompt.

The same mindset applies to access. Tag documents with an access level and filter at retrieval time, and recheck upstream permissions then, so staff-only text never reaches a customer's prompt. Asking the model nicely to hide it is not enforcement.

**Worked example.** The chapter's `product_faq.md` ends with a planted line telling the reviewer to reply with the system prompt. A question about payment methods retrieves that chunk. A good system answers the payment question from the real text, or refuses, and does not leak its prompt. Your eval set includes an injection item so you check this every release.

> [!warning] Common mistake
> Trusting your own document collection. Once the index holds anything you did not write yourself, every chunk is potential injection and should be treated as untrusted input.

## Step 4 — Measure, then debug

**Plain language.** The manager spot-checks the new hire with mystery questions and counts how many came back right with the right page. Without that, you only have a feeling that the bot works.

**The rule.** RAG quality has two halves, and they need separate metrics:

- **Retrieval hit rate**: for an in-scope question, was a known-correct source in the retrieved results? It judges the retriever.
- **Faithfulness**: is every claim in the answer supported by the retrieved chunks? It judges the generator, often with an LLM as judge.
- **Citation accuracy**: does each citation tag point to a chunk that was actually retrieved?
- **Refusal accuracy**: do out-of-scope and injection questions get the exact refusal?

Citation accuracy only proves the cited ids exist in the retrieved set. It does not prove the cited text supports the claim, so it never replaces faithfulness.

**Worked example.** The chapter's eval set has 16 items: 12 in-scope, 3 out-of-scope and 1 injection attempt. With 12 in-scope items, hit rate moves in steps of 1/12 (10 of 12 is 0.83, 11 of 12 is 0.92). Suppose a run reports hit rate 0.92 and faithfulness 0.70. The right chunks are arriving, so the model is inventing on top of good context. Tighten the prompt, lower the temperature and enforce citation tags first. If instead hit rate is low, work down the checklist: chunk size, metadata filters, top-k (sweep 3, 5, 8), then hybrid search or a reranker. If the hit rate stays flat as k grows, the missing answers are not reachable by retrieving more, so inspect chunking and the documents by hand.

> [!warning] Common mistake
> Reporting one number. Hit rate and faithfulness diagnose different bugs, so check both on every release and record the eval set size with them.

```knowledge-quiz
schemaVersion: 1
quizId: "ceab505c-50b5-4878-9248-7f832d1f0814"
title: "Checkpoint: injection and evaluation"
questionBankId: "38ff08b5-119a-459b-90fc-d84a690ceda6"
questionIds:
  - "c1d7038a-23ac-422d-b6b8-4e362bcf535d"
  - "f3945b3c-bb76-4c83-a1ee-6f45946207ac"
```

## Try it

You have the four sample documents, the pipeline above and an eval run with this result:

| Metric | Value |
| --- | --- |
| Retrieval hit rate | 0.83 |
| Faithfulness | 0.93 |
| Citation accuracy | 1.0 |
| Refusal accuracy | 0.75 |

The one failing refusal item is "Can you write me a poem about refunds?" which the bot answered with a poem. Decide which stage failed, name two fixes, and say which metric you would re-check afterwards.

> [!example]- Sample solution
> Refusal accuracy is the weak metric, so the bot answered an out-of-scope request. A poem about "refunds" probably retrieved refund chunks with a distance under the threshold, so the confidence gate let it through, and the prompt did not stop the model writing a poem. Fixes: (1) lower the distance threshold using the out-of-scope items in the eval set, and (2) tighten the system prompt so the model must answer only from context with citations and otherwise return the exact refusal. Re-run the eval and confirm refusal accuracy returns to 1.0 without hit rate falling, since a stricter gate can also block valid questions.

## Key takeaways

- RAG is an architecture, not a library: chunker, embedder, vector store, retriever, grounded prompt and evaluator.
- Grounding stops invention when evidence exists, and an exact refusal stops it when retrieval fails.
- Chroma returns distance, where lower is closer, and a threshold on the best distance gates the model call.
- Retrieved text is untrusted input, so defend against indirect prompt injection and enforce access before text reaches the prompt.
- Hit rate judges the retriever and faithfulness judges the generator, so measure both, plus citation and refusal accuracy.
- Tune chunk size, top-k and the threshold by measuring on an eval set, never by guessing.

## Explain it back

In your own words, explain how a RAG chatbot turns a question into a cited answer or an exact refusal, and which two metrics show where it breaks.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "f5da7390-6ac2-4347-b3e9-baccc771b728"
title: "Chapter quiz: RAG knowledge base"
questionBankId: "38ff08b5-119a-459b-90fc-d84a690ceda6"
questionIds:
  - "f2258c4b-629f-4580-abce-68cc2474ec0f"
  - "f34c1ac2-662c-4b0f-9b58-16ee65ce9e8a"
  - "4edf439b-e2cf-4c43-bd42-201b196b9508"
  - "4027f851-d2e8-4432-b323-93117b66516f"
  - "aca08e15-5421-4013-996b-d660ad3f13cf"
  - "32b4ec06-2679-445b-93d1-ee9f7cfe1f25"
  - "6f204c8a-ee33-4bb9-9318-16535a8b01e2"
  - "3179f36d-5859-48bd-af44-75ec7e7d1313"
```

Next: [[courses/ai-agent-crash-course/lessons/06-memory-systems|Next lesson]]

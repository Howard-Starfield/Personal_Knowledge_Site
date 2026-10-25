---
id: "c8f3a205-7d41-4e69-8b52-1a06c9d4f738"
title: "Chapter 4: Retrieval-Augmented Generation & Autonomous AI Agents: Question Bank"
description: "Practice questions for the RAG and agents chapter: parametric against non-parametric memory, the RAG marginalisation, the three pillars of modular RAG, the RAG triad, the ReAct loop, deterministic versus autonomous orchestration, and the three production failure modes."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/04-rag-and-ai-agents|Chapter 4: Retrieval-Augmented Generation & Autonomous AI Agents]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f1b6d830-4e27-4c59-9a7d-05c3e8b61274"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson describe parametric memory as static, opaque and prone to compression loss?"
    options:
      - id: a
        text: "It lives in the frozen weights, so one changed fact means retraining, and long-tail details get squeezed out"
      - id: b
        text: "It lives in the vector index, so one changed fact means re-embedding, and long-tail details get squeezed out"
      - id: c
        text: "It lives in the context window, so one changed fact means a longer prompt, and long-tail details get squeezed out"
      - id: d
        text: "It lives in the prompt prefix, so one changed fact means a new retrieval, and long-tail details get squeezed out"
    correctOptionIds: [a]
    explanation: "a is correct: parametric memory is the fixed tensor weights established during pretraining, so correcting one stored fact requires retraining or a parameter-efficient fine-tune costing thousands of dollars, the weight tensors cannot easily be inspected to see whether a particular invoice number is known, and trillions of tokens compressed into billions of parameters lose the long tail, which is where confident hallucinations come from. b, c and d place the memory in the external structures the chapter says hold the non-parametric memory. Lesson section: The Closed-Book Student (Raw LLM / Parametric Memory)."
  - id: "3a7c05e9-8b62-4d10-b4f8-92c6e5d731a8"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's RAG formulation, what do the two terms of the marginalisation over documents represent?"
    options:
      - id: a
        text: "The first term is the generator's likelihood over the output tokens and the second is the retriever's relevance score"
      - id: b
        text: "The first term is a prior probability over the corpus and the second term is a likelihood over the output vocabulary"
      - id: c
        text: "The first term is the retriever's relevance probability, the second the generator's likelihood given that passage"
      - id: d
        text: "The first term is a keyword overlap score and the second term is a cross-encoder reranking score"
    correctOptionIds: [c]
    explanation: "c is correct: the Lewis et al. framework writes the answer distribution as a sum over latent passages, where the first term, parameterised by the retriever weights, is the probability that a passage is relevant to the prompt, computed from the dense query and document embeddings, and the second term, parameterised by the decoder weights, is the likelihood of the answer given the prompt and that passage. a swaps the two roles, b is not the decomposition the paper uses, and d confuses the formalisation with two concrete ranking techniques the chapter describes separately. Lesson section: The RAG Formulation: Marginalizing Over Latent Documents."
  - id: "7e2b4f16-9d85-4a37-b0c6-8f41d3a95e60"
    revision: 1
    status: active
    type: single-choice
    prompt: "What distinguishes the RAG-Token model from the RAG-Sequence model in the original RAG paper?"
    options:
      - id: a
        text: "RAG-Token runs one forward pass per retrieved document, while RAG-Sequence runs a single pass over all of them together"
      - id: b
        text: "RAG-Token can change which document it draws on at each token, while RAG-Sequence fixes one document for the whole sequence"
      - id: c
        text: "RAG-Token marginalises over the corpus exactly, while RAG-Sequence marginalises only over the top-k candidates"
      - id: d
        text: "RAG-Token scores documents with a cross-encoder, while RAG-Sequence scores them with a bi-encoder"
    correctOptionIds: [b]
    explanation: "b is correct: in the sequence model a single sampled passage conditions the entire generated sequence, and the top-k sequences are generated independently and their likelihoods marginalised, whereas in the token model the document weights are re-evaluated at every token step conditioned on what has already been generated, so a sentence can draw its first half from one passage and its second half from another. a, c and d misstate the difference: both variants marginalise over the top-k candidates, and neither is tied to a particular encoder. Lesson section: RAG-Sequence vs. RAG-Token Marginalization."
  - id: "5c94e0b7-26d1-4f83-9a05-e7b3c82d6019"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say a production retriever does when no candidate passage passes the similarity gate?"
    options:
      - id: a
        text: "It falls back to answering from the model's parametric memory, since no passage is available"
      - id: b
        text: "It widens the candidate pool until some passage passes, because an empty result would be useless"
      - id: c
        text: "It merges the dense and sparse rankings with reciprocal rank fusion and retries with a lower cutoff"
      - id: d
        text: "It flags the query as unanswerable, so irrelevant noise never reaches the generator"
    correctOptionIds: [d]
    explanation: "d is correct: the lesson's Similarity Threshold Gate exists precisely so that a query with no close match is marked unanswerable rather than answered from whatever the index returned, which prevents irrelevant noise from entering the generator and being dressed up as an answer. a reintroduces the hallucination the architecture exists to remove, b would defeat the gate, and c describes a fusion step that happens before the gate rather than after it. Lesson section: Maximum Inner Product Search (MIPS) & Cosine Similarity."
  - id: "b40d8c37-1a5e-4f92-9b76-3c05e8d24a1f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson combine dense vector search with BM25 through reciprocal rank fusion?"
    options:
      - id: a
        text: "Because dense vectors cannot be compared against a sparse index, so the two scores have to be averaged numerically"
      - id: b
        text: "Because dense search misses exact tokens such as error codes and SKUs, which the lexical index catches"
      - id: c
        text: "Because BM25 is too slow for a live query, so the dense index is used to pre-filter the lexical one"
      - id: d
        text: "Because the two methods use different embedding dimensions, so fusion normalises them into one space"
    correctOptionIds: [b]
    explanation: "b is correct: dense retrieval is good at conceptual matching, such as mapping how to terminate employee onto involuntary separation procedure, but it is poor at exact lexical matches like the error code ERR_CONN_REFUSED_502, the SKU TX-9902-A or the variable name user_auth_token_v3. Reciprocal rank fusion combines the two rank lists with a smoothing constant of 60, so chunks that do well in both the lexical and the semantic modality are pushed to the top. a, c and d describe mechanisms the chapter does not use. Lesson section: Hybrid Search (Dense Semantic + Sparse Lexical)."
  - id: "d71a5f92-4c03-4e8b-b6d9-05f3c8a27e64"
    revision: 1
    status: active
    type: single-choice
    prompt: "A RAG system answers \"I am an AI and cannot answer\" even though the retrieved context contains the facts. Which triad metrics does that describe?"
    options:
      - id: a
        text: "Answer Relevance is zero, while Context Relevance stays high because the chunks really are on topic"
      - id: b
        text: "Context Relevance is zero, while Groundedness stays high because every claim is supported by the context"
      - id: c
        text: "Groundedness is zero, while Answer Relevance stays high because the answer is fluent and well formed"
      - id: d
        text: "All three are zero, because an evasion means nothing in the pipeline was retrievable at all"
    correctOptionIds: [a]
    explanation: "a is correct: Answer Relevance compares the embedding of the original query with the embedding of a query reconstructed from the answer, so a pure evasion scores zero, while Context Relevance scores the retrieved chunks rather than the answer and stays high because the chunks really do match the question. The lesson gives that evasion as its worked case of a zero answer-relevance score. b, c and d misattribute the failure to the retrieval or the grounding stage. Lesson section: The RAG Triad Evaluation Framework."
  - id: "9b3e0d58-7c14-4a6f-b28d-05e7f4a1c936"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson says the explicit Thought step is mandatory in a ReAct loop. Why?"
    options:
      - id: a
        text: "Because the tool dispatcher cannot parse an action that is not preceded by a matching observation already in the trace"
      - id: b
        text: "Because the observation text is only attached to the context window once a thought has been emitted for it"
      - id: c
        text: "Because the JSON Schema of the tool contract cannot be validated without a preceding natural language step"
      - id: d
        text: "Because the reasoning tokens join the conditioning history and steer attention toward the right tool and arguments"
    correctOptionIds: [d]
    explanation: "d is correct: forcing the model to emit a Thought trace first means the reasoning tokens become part of the conditioning history, which steers the self-attention heads toward the correct tool and valid arguments, whereas jumping straight from objective to action invites greedy sampling errors. a, b and c invent dispatcher and validation mechanics the chapter does not describe, and the chapter is explicit that the tool contract is enforced by JSON Schema and Pydantic, not by the presence of a thought. Lesson section: Why is the explicit Thought step mandatory?"
  - id: "0e8c47a2-95d6-4b13-8f50-c7261d3b9a84"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three failure modes does the lesson name for production RAG and agent systems? Select every correct answer."
    options:
      - id: a
        text: "Context poisoning and distractor chunks, where irrelevant passages dilute attention and bury the signal"
      - id: b
        text: "The prompt template drift, where a prompt edited in one service fails to match the others"
      - id: c
        text: "The tool execution infinite loop, where the agent repeats an identical failing call until the budget is gone"
      - id: d
        text: "The hallucination-of-tools trap, where the model invents a tool name that is not in the registry"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are the three traps in the chapter's section on what engineers miss most. High-recall retrieval with k of ten or more drags in factually irrelevant or contradictory chunks that dilute the self-attention weights and, through the lost-in-the-middle effect, hide the passage that mattered; a transient API error can make the agent repeat the identical failing call until it burns the budget; and an unconstrained model will invent a tool such as predict_stock_growth_2028. b is not one of the three named traps. Lesson section: The \"Most Missed Things\" in RAG & Agent Engineering."
  - id: "4c81b7d6-20af-49e3-95c7-8d3f0a6b25e1"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about deterministic routing and autonomous agents are correct? Select every correct answer."
    options:
      - id: a
        text: "A deterministic state machine fixes its tool calls at design time and handles errors with ordinary retry blocks"
      - id: b
        text: "An autonomous agent chooses its next tool from the intermediate data it has observed"
      - id: c
        text: "An autonomous agent costs one forward pass per generation step, while a state machine pays for every iteration"
      - id: d
        text: "The lesson's recommended pattern is hybrid orchestration, with a state machine over sandboxed agent nodes"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are correct. A deterministic state machine is a hard-coded directed acyclic graph with predictable failures and minimal cost, suited to critical compliance workflows, payments and deterministic data ETL, while an autonomous agent selects tools conditionally from intermediate data, which suits open-ended research, exploratory support and dynamic diagnostics. The lesson calls hybrid orchestration the enterprise gold standard, with the state machine controlling authentication, compliance and database transactions while agents operate inside sandboxed nodes. c is wrong because the cost is the other way round: the autonomous agent consumes one forward pass per iteration, while the deterministic route needs only one model call per required generation step. Lesson section: Deterministic State Routing vs. Autonomous Agent Reasoning."
  - id: "a63d9f18-72b0-4e5c-a4d7-8b12f5c36e09"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says an unconstrained model will invent tools that do not exist, and that constrained decoding with a grammar engine makes it mathematically impossible to emit an unregistered tool name."
    answer: true
    explanation: "True. The hallucination-of-tools trap describes a model emitting a call such as predict_stock_growth_2028 with a ticker argument, which crashes the runtime with an unhandled KeyError, or passes the string into an uncontrolled execution sink, if tool existence is not validated. The mitigations are whitelist validation of the action string against the registry, structured constrained decoding such as OpenAI Structured Outputs or context-free grammar engines like Outlines and Guidance that constrain the logits at the token level, and a corrective feedback loop that returns the list of available tools so an instruction-aligned model can self-correct on the next step. Lesson section: The Hallucination-of-Tools Trap."
  - id: "8b5d2e07-6c93-4f40-b1a8-37d9e5c8a204"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the three pillars of a modular RAG architecture and what each one does."
    sampleAnswer: "The Indexer is the offline half: it parses enterprise documents while preserving headings as semantic metadata and normalising tables into Markdown or JSON, partitions them into chunks by one of three strategies, embeds each chunk with a bi-encoder such as text-embedding-3-small or bge-large-en-v1.5 into a 1536-dimensional vector, and writes those vectors with their metadata payloads into a vector database that indexes them with an HNSW graph for logarithmic lookups. The Retriever is the online half: it embeds the user's query, searches the index with maximum inner product search, applies a similarity threshold gate so an unanswerable query is flagged rather than answered from noise, fuses the dense ranking with a BM25 ranking through reciprocal rank fusion with a smoothing constant of 60, and reranks the survivors with a cross-encoder, keeping the top 3 to 5. The Generator is the last pillar: it allocates the context budget across the system prompt, conversation history, grounding passages, the user's query and a reserved output budget, wraps the passages in XML tags carrying document identifiers, and conditions the model to answer only from those passages, with a source citation tag on every factual statement."
    explanation: "A strong answer names the three pillars in pipeline order, separates the offline indexer from the online retriever and the generator, and mentions the chunking strategies, the threshold gate, hybrid fusion and the citation contract. An answer that describes only retrieval and generation has missed the pillar that does the work before either of them."
  - id: "2e7a9d14-6f38-4b05-9c72-8a1d4e60b3f5"
    revision: 1
    status: active
    type: free-recall
    prompt: "A team must choose between a deterministic state machine and an autonomous ReAct agent for a workflow. Explain the trade-off the lesson sets out, and what it recommends."
    sampleAnswer: "A deterministic state machine is a hard-coded directed acyclic graph whose control flow and tool selection are fixed at design time, so its failures are predictable and handled with ordinary try and catch and retry blocks, and its cost is minimal because each required generation step costs one model call. It suits critical compliance workflows, payments and deterministic data ETL. An autonomous ReAct agent lets the model decide the next step and pick tools from what it has observed, which makes it right for open-ended research, exploratory customer support and dynamic diagnostics, but its failures are unpredictable, since the agent can enter an infinite loop or choose the wrong tool, and it consumes one forward pass per iteration. The lesson's gold standard is hybrid orchestration: a deterministic state machine controls the macro-workflow such as authentication, compliance and database transactions, while autonomous agents operate inside sandboxed nodes where dynamic exploration is genuinely needed, backed by a hard circuit breaker at five iterations and loop detection on repeated action and input hashes."
    explanation: "A strong answer contrasts control flow, tool selection, failure predictability and cost for both architectures, names the workloads each suits, and states the hybrid orchestration recommendation with its guardrails. An answer that says only that agents are more flexible has not set out the trade-off."
```

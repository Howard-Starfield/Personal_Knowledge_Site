---
id: "16c83732-0a60-4692-a26b-84b94a478c5f"
title: "Tool Integration, Dynamic Memory & Retrieval Augmentation: Question Bank"
description: "Practice questions for the tools and memory lesson: dual-tier memory, hybrid retrieval, the six-tier error taxonomy, retrieval metrics, and judge calibration."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - agentic-ai
  - study-guide
  - assessment
  - active-recall
courseId: "7988d9f7-7121-4897-8ea1-d07d96146cfa"
comments: false
---

These questions practise [[courses/agentic-ai-build-your-first-agentic-ai-system/lessons/03-tools-memory-and-retrieval|Tool Integration, Dynamic Memory & Retrieval Augmentation]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "ab9b561f-8efa-41d8-8cfd-75e21af20864"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson splits agent memory into a working tier and a long-term tier. Which three namespaces does it put in long-term memory?"
    options:
      - id: a
        text: "Session cache, request queue and retry buffer, which hold the last few exchanges"
      - id: b
        text: "Semantic memory, episodic memory and procedural memory"
      - id: c
        text: "Attention heads, key vectors and value vectors, which form the KV cache"
      - id: d
        text: "Golden traces, confusion matrices and macro-F1 scores, which hold the measurements"
    correctOptionIds: [b]
    explanation: "b is correct: long-term memory holds durable enterprise truth in three namespaces — semantic memory for factual knowledge, SOPs and product specifications, episodic memory for records of past agent executions, and procedural memory for execution graphs, tool definitions and API syntax rules. a and c describe the working tier and its machinery rather than long-term storage, and d describes the evaluation harness. Lesson section: Tier 2: Long-Term Memory (Episodic & Semantic Retrieval)."
  - id: "4f7c19ea-040a-4df7-8aed-d72a6bbb4d06"
    revision: 1
    status: active
    type: single-choice
    prompt: "A tool call omits a mandatory parameter and passes a string where an integer timestamp is required. Which error code in the lesson's taxonomy does that belong to?"
    options:
      - id: a
        text: "TOOL_SYNTAX_ERROR, because the payload did not parse as valid JSON"
      - id: b
        text: "TOOL_EXECUTION_FAILURE, because the downstream service rejected the request"
      - id: c
        text: "GROUNDING_HALLUCINATION, because the plan included a step no SOP supports"
      - id: d
        text: "TOOL_SCHEMA_VIOLATION, because the arguments broke the registered contract"
    correctOptionIds: [d]
    explanation: "d is correct: a missing required parameter and a type mismatch are the signature of a contract and schema violation, which the taxonomy detects as a Pydantic ValidationError and mitigates by feeding the exact validation traceback back into the scratchpad for self-correction. a is wrong because the payload parsed fine as JSON; it was the argument types that broke. b is wrong because no request ever reached the service. c is wrong because nothing here is about ungrounded planning. Lesson section: Production Error Taxonomy for Dynamic Tools & Memory."
  - id: "e184230b-41ea-4340-8204-c073d586058a"
    revision: 1
    status: active
    type: single-choice
    prompt: "The 22-case experiment lifted SOP recall from 53.0% to 75.0%. What does the lesson say the V1 system was doing wrong?"
    options:
      - id: a
        text: "Retrieval depth k = 2 was too shallow, so cross-cutting SOPs were dropped"
      - id: b
        text: "The reasoning model was too small to read the documents it had already retrieved"
      - id: c
        text: "The customer queries were too vague for any retrieval depth to satisfy"
      - id: d
        text: "The ranking put the right documents at the top but in the wrong order"
    correctOptionIds: [a]
    explanation: "a is correct: the lesson diagnoses the V1 system as severe retrieval truncation, because at k = 2 the cross-cutting SOPs such as SOP-10 and SOP-12 never entered the context, and that is what left 20 of 22 plans stuck in the Partial tier. b is wrong because the V1 diagnosis is not model capacity; the same documents were retrieved and still not enough of the right ones arrived. c is wrong because the V2 system answered the same queries far better once depth and ranking changed. d is wrong because both V1 and V2 report an MRR of 1.0000, so ordering was never the problem. Lesson section: Deconstructing the 22-Case Complex Customer Scenario Experiment."
  - id: "706ddbd7-176e-430c-86d4-f95c5a6f57b7"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson lists the changes that took the V1 system to V2. Which of these are among them? Select every correct answer."
    options:
      - id: a
        text: "Keep the same shallow retrieval depth, because more documents always dilute attention"
      - id: b
        text: "Expand the retrieval depth from k = 2 to k = 4"
      - id: c
        text: "Rank with hybrid dense embeddings and sparse BM25, fused by Reciprocal Rank Fusion"
      - id: d
        text: "Use a structured plan synthesis prompt that verifies cross-cutting escalation thresholds"
    correctOptionIds: [b, c, d]
    explanation: "b, c and d are the three changes: retrieval depth expansion, hybrid RRF ranking, and a structured plan synthesis prompt. a is wrong because it contradicts the lesson's own diagnosis, which was that k = 2 was too shallow; the lesson's advice is to raise k while keeping it lean, not to keep it small. Lesson section: Deconstructing the 22-Case Complex Customer Scenario Experiment."
  - id: "ae676787-89d1-47fc-ad62-1342a900a194"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson names three policies for evicting content from working memory. Which of these does it name? Select every correct answer."
    options:
      - id: a
        text: "Sliding context window, retaining only the last M conversational turns"
      - id: b
        text: "Hierarchical summarization, condensing the earlier turns into a compact factual abstract"
      - id: c
        text: "Attention sparsification, dropping every token the model attends to least"
      - id: d
        text: "Recursive replay, re-running the whole trajectory after each tool result"
    correctOptionIds: [a, b]
    explanation: "a and b are two of the three policies the lesson lists, together with selective scratchpad pruning, which strips raw JSON tool outputs once the agent has extracted the facts and keeps only the synthesized thought. c is wrong because the lesson's third eviction policy is about removing tool payloads, not about pruning tokens by attention weight. d is wrong because replaying the whole trajectory after every tool result is the opposite of the context discipline the lesson argues for. Lesson section: Working Memory Management Strategies."
  - id: "d476b70d-6397-4b20-9715-6ba1a2dbee32"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson measures Cohen's Kappa at 0.6818 for its LLM-as-a-Judge, which places it in the Substantial Agreement band, and it requires kappa of at least 0.60 before an automated judge may gate a release."
    answer: true
    explanation: "True. The worked derivation over 50 plans gives p_o of 0.8200 and p_e of 0.4344, hence kappa of 0.6818, which the lesson's Landis and Koch table places in the 0.61 to 0.80 band of Substantial Agreement and approves for automated benchmark evaluation. The fifth invariant then sets kappa of at least 0.60 as the gate before an automated judge is allowed to block or approve a release."
  - id: "7cd84632-47a3-41db-b386-a44b44ce5dc6"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson fuses the two retrieval rankings with Reciprocal Rank Fusion. What does RRF actually do?"
    options:
      - id: a
        text: "It normalises both score distributions onto a shared scale and adds the raw scores"
      - id: b
        text: "It takes the better of the two rankings and discards the weaker one entirely"
      - id: c
        text: "It sums the reciprocal of each document's rank in each ranking, with a smoothing constant of 60"
      - id: d
        text: "It re-ranks the combined set with a cross-encoder model before returning the top K"
    correctOptionIds: [c]
    explanation: "c is correct: RRF(d) is the sum over the dense and sparse rankings of 1 divided by (k_0 plus the rank of the document), with k_0 typically set to 60, so a document ranked highly by both modalities dominates the final set. a is wrong because RRF exists precisely to avoid arbitrary score normalisation between two incomparable score scales. b is wrong because it throws away the complementary strength of the other modality. d is wrong because cross-encoder reranking is the lesson's answer to a different problem, retrieval distraction, not to fusing the two rankings. Lesson section: Hybrid Retrieval via Reciprocal Rank Fusion (RRF)."
  - id: "8699b05f-b7b6-44d4-88f3-ff89d7e72cea"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, say how Recall@K and Precision@K differ, and what the lesson's worked example and experiment show."
    sampleAnswer: "Recall@K asks what proportion of the policies that were actually needed made it into the top K retrieved chunks, so it measures coverage. Precision@K asks what proportion of the K returned chunks were relevant, so it measures density and penalises context clutter. The lesson's worked example is a problem spanning three policies — return, freight damage and executive signoff — where retrieving only two gives Recall@2 of 2/3, or 66.7%. The experiment shows the trade-off in numbers: V1 had Precision@2 of 79.5% but Recall@2 of only 53.0%, while V2 at k = 4 lifted recall to 75.0% and paid for it with Precision@4 of 56.8%."
    explanation: "A strong answer defines both metrics in terms of coverage versus density, gives the three-policy example, and quotes the V1 and V2 recall and precision figures so the trade-off is visible. An answer that defines the two metrics but never says what the experiment measured is only half there. Lesson section: Mathematical Rigor: Retrieval & Alignment Metrics."
  - id: "149f75f6-ecb3-4bc3-b21b-f272d40c6d7b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Case CS-19 is the one V2 plan the judge graded Bad. What did the lesson's post-mortem find?"
    options:
      - id: a
        text: "The retrieval step still failed to bring the needed SOPs into the context window at k = 4"
      - id: b
        text: "Two retrieved SOPs held contradictory instructions, so the model misattributed the middle"
      - id: c
        text: "The model ignored the retrieved SOPs and invented a step that no policy supported"
      - id: d
        text: "The downstream API returned an error, so the plan was graded Bad on infrastructure grounds"
    correctOptionIds: [b]
    explanation: "b is correct: expanding k to 4 brought SOP-06, SOP-10, SOP-13 and SOP-15 into the window, but SOP-13 on promotional clawback and SOP-15 on failover migration held dense, mutually contradictory instructions about service deactivation sequences, so the model suffered context dilution, misattributed what sat in the middle, and emitted an invalid failover order that would have taken down active secondary databases. a is wrong because the retrieval did succeed; the failure came afterwards. c is wrong because the plan was grounded in retrieved SOPs that contradicted each other rather than invented. d is wrong because no infrastructure failure is involved. Lesson section: Post-Mortem of Scenario CS-19: The \"Lost in the Middle\" Failure."
  - id: "250837cb-3750-4c87-8637-7ccd18c60179"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson works out how much VRAM the KV cache alone takes for a 70B model at a sequence length of 32,768 tokens. What figure does it reach?"
    options:
      - id: a
        text: "8.6 GB, because the layers and the heads share most of the memory between them"
      - id: b
        text: "2.1 GB, because 16-bit precision halves the footprint of a 70B model"
      - id: c
        text: "512 GB, because the cache scales directly with the number of model parameters"
      - id: d
        text: "About 85.9 GB, for one request, before the model weights are even counted"
    correctOptionIds: [d]
    explanation: "d is correct: the formula gives 4 times 1 times 32,768 times 80 layers times 64 heads times 128 head dimensions, which is 85,899,345,920 bytes, or about 85.9 GB, and that is the cache of a single request with the model weights excluded. a and b are wrong because the layers, heads and sequence length multiply rather than share. c is wrong because the cache scales with sequence length and architecture, not with the parameter count. The lesson uses this number to argue that piling unindexed enterprise documents into short-term working context is economically unsustainable. Lesson section: The Memory Footprint of the KV Cache."
  - id: "980e3bff-d392-40c0-b72a-6137be109935"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the Mean Reciprocal Rank measure in the lesson's retrieval metric set?"
    options:
      - id: a
        text: "How high the first relevant policy document appears, averaged across the query set"
      - id: b
        text: "How many of the top K documents were relevant, so that context clutter is penalised"
      - id: c
        text: "How the relevant documents are discounted by their position inside the ranking"
      - id: d
        text: "How many of the required policies were captured inside the top K retrieved chunks"
    correctOptionIds: [a]
    explanation: "a is correct: MRR averages 1 over the rank of the first relevant document for each query, so a primary policy retrieved at position 1 contributes 1.0 and at position 2 contributes 0.5. b describes Precision@K, which measures density among the returned documents. c describes the discounting inside NDCG@K, which is a graded-relevance metric. d describes Recall@K, which measures coverage of the required policies. Lesson section: Mathematical Rigor: Retrieval & Alignment Metrics."
  - id: "5b6d5e33-8f0a-4ac7-9eb1-2d8aa89e4a03"
    revision: 1
    status: active
    type: free-recall
    prompt: "The lesson's third invariant warns about K-value bloat. In your own words, say what it warns about, and what it tells you to do instead."
    sampleAnswer: "Raising the retrieval depth K shows diminishing returns and eventually inverts reasoning fidelity: a bigger context does not simply surface more of the right material, it buries it. The lesson's own experiment shows where the boundary sits, because expanding from k = 2 to k = 4 lifted recall from 53.0% to 75.0% and turned 15 of 22 plans Good, while case CS-19 then failed with the Lost in the Middle problem once contradictory SOPs sat in the middle of the window. The advice is to keep working memory lean, with K no greater than 5, and to resolve multi-intent queries with iterative query decomposition rather than casting a wider net."
    explanation: "A strong answer states the inversion — that more retrieved context eventually harms reasoning fidelity — connects it to the CS-19 failure the lesson reports, and gives both halves of the remedy, the K of 5 ceiling and iterative query decomposition. An answer that only says the K value matters, without the inversion and the remedy, is incomplete. Lesson section: Architectural Summary: The 5 Invariants of Tools, Memory & Retrieval."
```

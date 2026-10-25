---
id: "9efc634d-1699-4bdf-93b0-4d3f73d5ceb9"
title: "Dynamic Knowledge Engineering: Vector RAG, Semantic Caching & Autonomous Self-Service Deflection: Question Bank"
description: "Practice questions for the dynamic knowledge engineering lesson, covering structural chunking, hybrid RRF retrieval, semantic caching, command guardrails and the deflection economics."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - help-desk
  - study-guide
  - assessment
  - active-recall
courseId: "9f06e4da-f651-4857-95d5-df8a6fde9aa5"
comments: false
---

These questions practise [[courses/ai-solutions-and-techniques-for-help-desk-operations/lessons/05-dynamic-knowledge-bases-rag-self-service-deflection|Dynamic Knowledge Engineering: Vector RAG, Semantic Caching & Autonomous Self-Service Deflection]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "80e7dd1a-9f61-43fa-91c2-52d4cb3d6028"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson reject naive chunking that slices documents every 500 tokens with a 50-token overlap?"
    options:
      - id: chunk-slices
        text: "It slices runbooks at arbitrary character boundaries, splitting scripts and severing warnings"
      - id: chunk-few
        text: "It embeds too few tokens, so the vector database cannot index a technical runbook document at all"
      - id: chunk-long
        text: "It overlaps chunks by 50 tokens, which makes the retrieved context too long for the prompt"
      - id: chunk-model
        text: "It uses the wrong embedding model, because dense vectors cannot represent PowerShell syntax"
    correctOptionIds: [chunk-slices]
    explanation: "A character-boundary chunker severs a PowerShell pipeline in half, detaches the prerequisite line about domain controllers from the command it governs, and splits error codes and registry keys away from the software versions they belong to. The fix is AST-aware structural chunking, which enforces atomic boundaries around Markdown headers, fenced code blocks and prerequisite and warning callouts so that safety warnings are prepended to every executable chunk derived from the section. Token count and prompt length are not the issue, and the embedding model is a separate concern."
  - id: "77360a3d-000b-41a4-bfc3-e373dbf8f999"
    revision: 1
    status: active
    type: single-choice
    prompt: "For the query 'Fix 0x80040115 MAPI disconnect on Windows 11', which document does the lesson's hybrid RRF retrieval put first, and by what margin?"
    options:
      - id: rrf-b
        text: "Document B wins, because its dense rank of 1 outweighs the sparse penalty of 35"
      - id: rrf-tie
        text: "The two documents tie at 0.03028, so the dense rank decides the order of the two results"
      - id: rrf-a
        text: "Document A wins at 0.03028 against Document B's 0.02692, because BM25 matched the hex code"
      - id: rrf-none
        text: "Neither document is retrievable, because RRF cannot score a document that two systems rank differently"
    correctOptionIds: [rrf-a]
    explanation: "With the smoothing constant k at 60, Document A scores 1 over 72 plus 1 over 61, which is 0.03028, and Document B scores 1 over 61 plus 1 over 95, which is 0.02692, so Document A wins decisively. Document A carries the exact hex code 0x80040115 and the MAPI acronym, which BM25 matched exactly, while Document B has the wrong code 0x80040111 and was ranked first only by the bi-encoder's liking for the phrasing around Outlook connectivity failure. The example is the argument for hybrid retrieval: dense similarity alone would have returned the wrong error code."
  - id: "b0db2bc1-9928-415f-b382-d4ce7b01163c"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's two-stage retrieval, what does the cross-encoder do with the candidate chunks the hybrid stage returns?"
    options:
      - id: ce-050
        text: "0.50, keeping only the single best chunk so the prompt stays as short as possible"
      - id: ce-075
        text: "0.75, so only chunks scoring above it survive and the top 3 are kept for synthesis"
      - id: ce-095
        text: "0.95, which keeps the pipeline safe even when the retrieved context contradicts itself"
      - id: ce-none
        text: "There is no threshold, because the cross-encoder's ranking is trusted without a cut-off"
    correctOptionIds: [ce-075]
    explanation: "Stage 1 returns the top 20 candidates in under 15 ms, and the cross-encoder such as bge-reranker-large then scores each one through full all-to-all cross-attention, discarding anything with a relevance score below 0.75 and assembling the top 3 chunks into the final prompt context window. A bi-encoder cannot see fine-grained cross-token interactions, which is exactly what the second stage buys, and there is always a cut-off because an unbounded context window is what the reranker exists to prevent."
  - id: "b4288990-e850-4632-8f44-c2b27a0e33e8"
    revision: 1
    status: active
    type: single-choice
    prompt: "What cosine similarity does a query have to reach against the cached query vectors before the lesson's semantic cache treats it as a hit?"
    options:
      - id: cache-099
        text: "0.99, because a cached answer must be almost identical before it may be served"
      - id: cache-085
        text: "0.85, which is the same confidence gate the intent vectoriser uses for zero-touch execution"
      - id: cache-075
        text: "0.75, matching the cross-encoder relevance threshold so both stages use one cut-off"
      - id: cache-094
        text: "0.94, because a hit serves the answer in 22 ms with zero LLM tokens at $0.00001"
    correctOptionIds: [cache-094]
    explanation: "The lesson sets tau_cache at 0.94, so a hit returns the pre-verified, guardrail-checked response directly from memory in 22 milliseconds using zero LLM tokens at a cost of $0.00001. A miss runs the full pipeline, hybrid RRF plus cross-encoder plus guardrail AST verification plus generation, at 1,850 milliseconds and $0.015. Exact string hashing achieves a hit rate below 4% on human phrasings of the same request, which is why the cache has to be semantic rather than literal."
  - id: "90932077-6077-4882-8cd3-54faf1b0e127"
    revision: 1
    status: active
    type: single-choice
    prompt: "What three invalidation layers does the lesson require so the semantic cache cannot serve stale or hazardous instructions?"
    options:
      - id: inv-none
        text: "Nothing is needed, because a cached answer has already been verified and cannot go stale"
      - id: inv-nightly
        text: "A single nightly rebuild, because the knowledge base only changes once a day"
      - id: inv-manual
        text: "A 24-hour TTL and a weekly manual review of the most-cached entries"
      - id: inv-three
        text: "A 7-day TTL, LRU eviction, and an event-driven purge within 500 ms of a KB change"
    correctOptionIds: [inv-three]
    explanation: "The first layer is a 7-day time to live on standard entries, the second is least recently used eviction so cold entries leave a capacity-constrained Redis cluster, and the third is event-driven knowledge invalidation, where a CI/CD webhook triggered by a Git update, merge or deprecation purges every cached query whose source attribution references that document ID within 500 milliseconds. Only the third layer reacts to the change that actually matters, which is why a nightly rebuild is not enough."
  - id: "f426576d-827b-4bd7-9f5d-324e2640157b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the lesson's four AST validation rules is the Network Exfiltration Guard?"
    options:
      - id: guard-net
        text: "Outbound commands such as curl or wget are barred unless the URI is a pinned internal corporate host"
      - id: guard-destructive
        text: "Destructive verbs such as Remove-Item, del and dd abort the pipeline and escalate to a human technician"
      - id: guard-allowlist
        text: "Only approved administrative binaries may be invoked, from a fixed allowlist of system tools"
      - id: guard-elevation
        text: "Commands needing root or Administrator rights must carry a warning badge and an elevation check"
    correctOptionIds: [guard-net]
    explanation: "The Network Exfiltration Guard prohibits outbound network commands such as curl, wget, Invoke-WebRequest, ssh and scp unless the target URI matches an internal, cryptographically pinned corporate CDN or artifact repository. The other three rules are separate: the binary allowlist restricts which executables may run, the destructive verb ban aborts the pipeline on Remove-Item, del, format, dd, mkfs, drop and truncate, and elevation gating handles commands that need root or Administrator rights."
  - id: "fb94cf43-f357-4230-9734-deacf72272ac"
    revision: 1
    status: active
    type: single-choice
    prompt: "What annual net economic value does the lesson's worked case study attribute to the enterprise RAG self-service engine?"
    options:
      - id: eco-666
        text: "$666,000 a month, which is the gross labor saving before the infrastructure cost is deducted"
      - id: eco-7938
        text: "$7,938,000 a year, which is $661,500 a month net of the $4,500 infrastructure cost"
      - id: eco-7992
        text: "$7,992,000 a year, which is the gross labor saving annualised without the running cost"
      - id: eco-54
        text: "$54,000 a year, which is the annual infrastructure spend on the vector, cache and token costs"
    correctOptionIds: [eco-7938]
    explanation: "With 80,000 monthly sessions and a 45% verified deflection rate there are 36,000 deflected tickets, which at $18.50 a ticket is $666,000 of gross monthly saving; subtracting the $4,500 monthly infrastructure cost leaves $661,500, and twelve months of that is $7,938,000 a year, a return on investment ratio of 147 to 1. The $7,992,000 figure is the gross labour avoidance before the running cost is netted off, and $54,000 is the annual operating expenditure on the vector database, the Redis cluster, the embedding compute and the cache-miss tokens."
  - id: "a952f0e7-0d9d-4a50-bf9e-650d551ae8fa"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are layers of the lesson's multi-layer technical command guardrail architecture? Select every correct answer."
    options:
      - id: gl-1
        text: "Layer 1, regex and token tripwires that reject banned command patterns instantly"
      - id: gl-2
        text: "Layer 2, AST syntax validation and the runbook allowlist"
      - id: gl-3
        text: "Layer 3, context grounding and attribution checks at a confidence of 0.98 or above"
      - id: gl-4
        text: "Layer 4, an LLM self-critique pass that asks the model whether the command looks safe"
    correctOptionIds: [gl-1, gl-2, gl-3]
    explanation: "The architecture has three deterministic layers: regex and token tripwires that instantly reject patterns such as rm -rf, format C:, del /s, Invoke-Expression and unapproved external URLs; AST syntax validation against the runbook allowlist, checking the binary, the flags and the absence of subshell spawning; and context grounding and attribution checks at a confidence threshold of 0.98, under which the code block is stripped and a safe URL presented instead. There is no model-judged fourth layer, because asking the same model that generated the command whether it is safe would defeat the point."
  - id: "4fe1b297-280c-4704-9358-fbdfff156ee3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson put in place to stop phantom deflection and stale advice? Select every correct answer."
    options:
      - id: drift-anomaly
        text: "A deflection degradation anomaly that flags an article whose verified deflection drops more than 25%"
      - id: drift-conflict
        text: "Telemetry conflict scoring that quarantines an article after three consecutive failing attempts"
      - id: drift-loop
        text: "Closed-loop verification, where only command telemetry or a success ping confirms a deflection"
      - id: drift-page
        text: "Page-close analytics, where a user closing the browser tab counts as a confirmed resolution"
    correctOptionIds: [drift-anomaly, drift-conflict, drift-loop]
    explanation: "The lesson's verification chain runs through three mechanisms: a deflection degradation anomaly that flags an article when its verified deflection rate falls by more than 25% over a 14-day rolling window, telemetry conflict scoring that quarantines an article when the recommended command returns non-zero exit codes across 3 consecutive client attempts, and closed-loop verification that counts a resolution as deflected only when command telemetry or a success ping confirms it. The fourth option is the illusion of phantom deflection the lesson warns against, where a page close is mistaken for a success."
  - id: "9a466d85-1e65-4798-b1f4-295eca2c136d"
    revision: 1
    status: active
    type: true-false
    prompt: "A user closing the self-service page without opening a ticket proves that the RAG pipeline deflected the issue."
    answer: false
    explanation: "The claim is false, and the lesson names it the illusion of phantom deflection. A page close carries no verification signal, so treating it as success is vanity metric reporting, and the lesson's comparison table contrasts the two cases: on the verified side a resolution arrives in under 60 seconds, produces zero tickets within a 48-hour window and is confirmed by command telemetry, while on the unverified side the user suffers in silence or emails the CIO. Only command telemetry or a success ping counts as proof."
  - id: "fcd10714-cdaa-4f8f-b11a-d60275d52638"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work out the Reciprocal Rank Fusion scores for Document A and Document B in the lesson's worked retrieval example, and say which document wins and why that matters."
    sampleAnswer: "The query is 'Fix 0x80040115 MAPI disconnect on Windows 11' and the smoothing constant is k = 60. Document A has dense rank 12, because the bi-encoder ranked it lower on the colloquial phrasing, and sparse rank 1, because BM25 matched 0x80040115 and MAPI exactly, so its RRF score is 1 over 60 plus 12 plus 1 over 60 plus 1, which is 0.01389 plus 0.01639, or 0.03028. Document B has dense rank 1, because the bi-encoder loved the phrasing around Outlook connectivity failure, and sparse rank 35, because BM25 penalised it for carrying the wrong error code 0x80040111, so its score is 1 over 61 plus 1 over 95, which is 0.01639 plus 0.01053, or 0.02692. Document A wins decisively, 0.03028 against 0.02692, and that is the point of the hybrid design: a dense model on its own would have returned the document with the wrong hexadecimal code, which on a support desk sends the user down the wrong runbook entirely."
    explanation: "A strong answer states the formula with k = 60, computes both sums term by term, and identifies the tie-break that matters, which is the sparse modality's exact-match confidence rather than the dense modality's semantic plausibility. It should also explain the operational consequence, since a wrong hex code sends a user down the wrong remediation path regardless of how well the wording matched."
  - id: "864911d7-8dfe-4719-88a3-e91a3dffe5c3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the lesson's semantic caching design: the similarity threshold, what a hit and a miss cost, and the three invalidation layers that make it safe."
    sampleAnswer: "The cache embeds the inbound query and performs a vector similarity search against an in-memory vector cache such as Redis with RediSearch or GPTCache, and a hit requires the nearest cached query vector to reach a cosine similarity of at least 0.94. That threshold is what lets the cache cope with human phrasing, where exact string hashing achieves a hit rate below 4% even though the top 20 inquiries account for 55% to 65% of inbound traffic. A hit returns the pre-verified, guardrail-checked response in 22 milliseconds using zero LLM tokens at a cost of $0.00001, while a miss runs the whole pipeline, hybrid RRF, cross-encoder rerank, guardrail AST verification and generation, at 1,850 milliseconds and $0.015. The cache is only safe with three invalidation layers: a 7-day time to live, least recently used eviction so cold entries leave a memory-constrained cluster, and event-driven knowledge invalidation, where a CI/CD webhook fired by a KB article being updated, merged or deprecated in Git purges every cached query that references that document ID within 500 milliseconds. Without that third layer the cache would eventually serve stale or hazardous technical instructions."
    explanation: "A strong answer gives the 0.94 threshold and explains why a semantic rather than literal match is needed, states both the hit and miss economics with their latencies and costs, and lists all three invalidation layers with the 500-millisecond purge. It should also note that only pre-verified, guardrail-checked responses are eligible to be cached, since caching an unverified answer would make the guardrail pointless."
```

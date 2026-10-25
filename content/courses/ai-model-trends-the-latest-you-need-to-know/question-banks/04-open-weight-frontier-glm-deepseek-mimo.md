---
id: "fe0ecd1b-c281-4dfa-b120-dae9f3b74679"
title: "Open-Weight Frontier: GLM 5.2 Index Share Caching, DeepSeek V4 & Speculative Decoding: Question Bank"
description: "Practises the lesson's Index Share attention derivation, GLM 5.2 speculative verification, and the on-premise versus cloud breakeven arithmetic."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - llm
  - study-guide
  - assessment
  - active-recall
courseId: "ecb81404-0f2d-495f-bd30-290140707fa3"
comments: false
---

These questions practise [[courses/ai-model-trends-the-latest-you-need-to-know/lessons/04-open-weight-frontier-glm-deepseek-mimo|Open-Weight Frontier: GLM 5.2 Index Share Caching, DeepSeek V4 & Speculative Decoding]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "ba011af0-93df-495a-a496-f8bf57f5cceb"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does Index Share change about the attention cost of a deep Transformer?"
    options:
      - id: a
        text: "It turns O(L times N squared) into O(N squared plus (L minus 1) times K times N)"
      - id: b
        text: "It turns O(L times N squared) into O(N times L), because the attention map is computed once for the whole stack"
      - id: c
        text: "It leaves the complexity unchanged and simply skips the softmax on the deepest layers for a constant-factor gain"
      - id: d
        text: "It reduces the sequence length N before the attention scan, so the quadratic term shrinks while L stays the same"
    correctOptionIds:
      - a
    explanation: "A standard Transformer pays O(L times N squared) because every layer recomputes the full attention map. Index Share runs that quadratic scan once in an early anchor layer and caches the top-K token indices for reuse, giving O(N squared plus (L minus 1) times K times N) across the stack. Option b is wrong on both terms: the quadratic scan still happens, and the deeper layers still cost something. Option c describes a constant-factor trick with no asymptotic change. Option d changes the problem rather than the algorithm."

  - id: "b9df5063-4546-415a-935a-150b77e51a37"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say Index Share actually buys in production inference?"
    options:
      - id: a
        text: "A 65% to 70% cut in FLOPs and a 3x token compute efficiency gain, but perplexity rises by 0.04%, which the lesson accepts as a fair trade for the speed"
      - id: b
        text: "A 20% increase in candidate acceptance and a 2.8x to 3.2x wall-clock speedup on software engineering syntax"
      - id: c
        text: "A 65% to 70% cut in FLOPs, a 3x token compute efficiency gain, and perplexity within 0.04% of a dense Transformer"
      - id: d
        text: "A 3x token compute efficiency gain, with a 90% cut in key-value cache memory and 27% of the per-token attention compute"
    correctOptionIds:
      - c
    explanation: "The lesson reports that indexing reduces total token generation FLOPs by approximately 65% to 70%, a 3x token compute efficiency gain, while maintaining language modelling perplexity within 0.04% of a standard dense Transformer. Option a inverts the perplexity result, which is the claim that makes the saving nearly free. Option b describes GLM 5.2's speculative verification. Option d describes DeepSeek V4's Multi-Head Latent Attention."

  - id: "06979f1f-e441-483b-b912-65e049159e43"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does GLM 5.2's speculative verification work, and what does the lesson report it achieving?"
    options:
      - id: a
        text: "A draft model proposes 4 tokens in parallel, the 753B target verifies them in one pass, and acceptance reaches 92% to 96%"
      - id: b
        text: "A draft model proposes 16 tokens in parallel, the 753B target verifies them in one pass, and acceptance reaches 78% to 82%"
      - id: c
        text: "A draft model proposes 4 tokens in parallel, the 753B target verifies each one separately, and acceptance reaches 78% to 82%"
      - id: d
        text: "A draft model proposes 4 tokens in parallel, the 753B target verifies them in one pass, and acceptance reaches 78% to 82%"
    correctOptionIds:
      - d
    explanation: "A lightweight draft model proposes gamma = 4 candidate tokens in parallel and the 753B target ingests them in a single forward pass using a tree-attention or causal verification mask, with any rejected candidate discarding the ones after it. Because GLM 5.2 co-trains its speculative draft heads alongside the primary backbone, acceptance reaches 78% to 82% on standard software engineering syntax, a 20% increase over generic speculative decoders and an effective 2.8x to 3.2x wall-clock speedup. Options a, b and c each corrupt one of those numbers or the mechanism."

  - id: "f33362c3-46e8-495d-acef-db585547c1a4"
    revision: 1
    status: active
    type: single-choice
    prompt: "At what monthly token volume does hosting GLM 5.2 on-premise become cheaper than renting it through OpenRouter?"
    options:
      - id: a
        text: "About 216 million tokens a month, once the fixed hardware cost is covered by the cloud saving"
      - id: b
        text: "About 2.16 billion tokens a month, against $4,324 a month of fixed on-premise cost"
      - id: c
        text: "About 21.6 billion tokens a month, because the 753B parameters must be paid for in full before anything is cheaper"
      - id: d
        text: "Exactly 2.16 billion tokens a month, after which the on-premise cluster is permanently free to operate"
    correctOptionIds:
      - b
    explanation: "The lesson's crossover calculation divides the $4,324 monthly on-premise fixed cost by the blended token price of $2.00 per million, giving 2,162,000,000 tokens, roughly 2.16 billion a month. Option a is off by a factor of ten. Option c has no basis in the calculation. Option d confuses the breakeven with a free operating cost; the hardware cost continues, it is simply offset by the avoided API spend above that volume."

  - id: "5c0042ce-cecf-4fc9-bdf3-170bba02e9db"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did it cost to build the full-stack Firebase application with GLM 5.2, and how does that compare with running the benchmark suite?"
    options:
      - id: a
        text: "About $7.00 for the whole build, and $983.00 for the benchmark suite against Fable 5's $10,000-plus"
      - id: b
        text: "About $7.00 for the whole build, and $983.00 for the benchmark suite, which is roughly ten times Fable 5's cost"
      - id: c
        text: "About $983.00 for the whole build, and $7.00 for the benchmark suite, because the build was the larger job"
      - id: d
        text: "About $7.00 for the whole build, but over $10,000 for the benchmark suite, matching what Fable 5 cost on the same suite"
    correctOptionIds:
      - a
    explanation: "Ray Villalobos completed the entire end-to-end build, including multi-turn refactoring passes and troubleshooting, for approximately $7.00 in OpenRouter API tokens, and running the full Artificial Analysis evaluation suite against GLM 5.2 cost $983.00, while the same suite against Claude Fable 5 exceeded $10,000.00. Option b has the comparison backwards. Option c swaps the two figures. Option d swaps the suite costs as well as the direction of the comparison."

  - id: "08a83ba1-ee29-4702-8c61-0d85a11c8541"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does Multi-Head Latent Attention give DeepSeek V4 Pro?"
    options:
      - id: a
        text: "A 65% to 70% cut in FLOPs and a 3x token compute efficiency gain, by caching the top-K attention indices"
      - id: b
        text: "A 20% increase in candidate acceptance and a 2.8x to 3.2x wall-clock speedup on software engineering syntax"
      - id: c
        text: "A 90% cut in key-value cache memory and 27% of legacy per-token attention compute"
      - id: d
        text: "A reduction of the active parameter count from 1.6 trillion down to 384 fine-grained micro-experts"
    correctOptionIds:
      - c
    explanation: "Multi-Head Latent Attention reduces the GPU key-value cache memory footprint by 90% and requires only 27% of the per-token attention compute of legacy attention layers, which is what lets DeepSeek serve at low cost with 49B active parameters out of 1.6 trillion. Option a describes GLM 5.2's Index Share attention caching. Option b describes speculative verification. Option d misattributes MiMo-V2.5's 8-of-384 expert routing to DeepSeek's architecture."

  - id: "328b2e47-fb84-4eaa-adea-b81d5f69509e"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson report about MiMo-V2.5 Pro and the Otis agent?"
    options:
      - id: a
        text: "It drifted after a few hours of operation, which is the failure mode MiMo was built to fix"
      - id: b
        text: "It ran for three consecutive weeks, passing more than 670 sequential tool calls and 230 test assertions"
      - id: c
        text: "It ran for three consecutive weeks, but only because the harness re-prompted it manually whenever it began to drift"
      - id: d
        text: "It handled roughly 15 to 20 tool calls before the context drifted, matching the behaviour of traditional models"
    correctOptionIds:
      - b
    explanation: "Ray Villalobos deployed MiMo-V2.5 Pro as the reasoning engine for Otis, an autonomous agent running around the clock on an OpenClaw harness, and it operated continuously for three consecutive weeks without manual prompt corrections, passing more than 670 sequential tool calls and 230 automated test assertions. Option c contradicts the point of the result, since the absence of manual correction is the finding. Option d describes the traditional models that drift after 15 to 20 tool iterations."

  - id: "e940ded5-c06f-4f41-b06d-d19ad0c23206"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which properties of the GLM 5.2 Index Share architecture does the lesson state? Select every correct answer."
    options:
      - id: a
        text: "An early anchor layer performs the full quadratic attention scan and caches the top-K token indices for each query."
      - id: b
        text: "K is typically around 128 to 512 tokens, far smaller than the sequence length."
      - id: c
        text: "Total compute falls from O(L times N squared) to O(N squared plus (L minus 1) times K times N)."
      - id: d
        text: "Every layer still scans all N tokens, and the cache only stores the resulting attention weights for reuse."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c are the mechanism the lesson derives: the anchor layer runs the full scan once, the cached index set is far smaller than the sequence because K is around 128 to 512, and the resulting complexity is O(N squared plus (L minus 1) times K times N). Option d contradicts the whole design, since the point of the index cache is that deeper layers skip the full scan entirely."

  - id: "2b3875d9-8b30-420a-b90c-40b08cb298ea"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about MiMo-V2.5 Pro and the Otis agent match the lesson? Select every correct answer."
    options:
      - id: a
        text: "MiMo-V2.5 Pro routes tokens across 8 of 384 fine-grained micro-experts rather than 8 large experts among 16."
      - id: b
        text: "Multi-Token Prediction heads predict 2 to 3 future tokens at once, yielding up to 3x generation throughput."
      - id: c
        text: "Otis ran continuously for three consecutive weeks, passing more than 670 sequential tool calls and 230 automated test assertions."
      - id: d
        text: "Traditional models begin to drift from the initial specification after only 2 to 3 tool iterations."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c are all the lesson's own figures: 8 of 384 micro-experts, Multi-Token Prediction heads predicting 2 to 3 tokens for up to 3x throughput, and Otis running for three consecutive weeks past 670 tool calls and 230 test assertions. Option d is wrong because the lesson puts the traditional failure point at 15 to 20 tool iterations, not 2 to 3, which is exactly the drift MiMo was built to survive."

  - id: "a9758052-a3ed-4f59-835b-ef51e2d0d036"
    revision: 1
    status: active
    type: true-false
    prompt: "On-premise hosting of GLM 5.2 becomes cheaper than the OpenRouter API once a team processes more than roughly 2.16 billion tokens a month."
    answer: true
    explanation: "That is the lesson's crossover. The on-premise fixed cost is $4,324 a month and the blended token price is $2.00 per million, so the breakeven is 4,324 divided by 2.00 times 10 to the minus 6, which is 2,162,000,000 tokens, roughly 2.16 billion a month. Below that volume renting through OpenRouter is mathematically superior; above it, or under strict data-residency mandates, on-premise becomes the right answer."

  - id: "145117b8-de8b-41cb-a64f-419454850d99"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the Index Share attention cache changes the cost of a 64-layer Transformer over a long context, and say what the lesson claims the saving is worth in practice."
    sampleAnswer: "A standard Transformer recomputes a full N by N attention map in every one of its 64 layers, which is O(L times N squared) and becomes memory-bound on repositories of 10 to the 5 or 10 to the 6 tokens. Index Share runs that quadratic scan once, in an early anchor layer, and caches the top-K most significant token indices, with K around 128 to 512, so the rest of the stack costs O(N squared plus (L minus 1) times K times N). The lesson's empirical claim is that this cuts token generation FLOPs by about 65% to 70%, a 3x token compute efficiency gain, while keeping language modelling perplexity within 0.04% of a standard dense Transformer. Tokens keep their full-context receptive field, because the anchor layer still evaluates the global context."
    explanation: "A strong answer gives both complexities, the K range of 128 to 512 and the fact that the scan happens once in an anchor layer, and it should give the three practical numbers: 65% to 70% of FLOPs, the 3x efficiency gain and perplexity within 0.04%. It should also note that the receptive field is preserved. An answer that leaves out the perplexity figure misses the point, because the lesson's claim is that the saving is nearly free."

  - id: "6e152267-eedd-46f6-b395-fb5ee2b143a5"
    revision: 1
    status: active
    type: free-recall
    prompt: "Work out the on-premise versus cloud breakeven for GLM 5.2: state the fixed monthly cost, the blended token price and the token volume at which the two are equal."
    sampleAnswer: "The on-premise path carries a fixed $4,324 a month in capital and operating cost, and the cloud path is priced at $1.40 per million input tokens and $4.40 per million output tokens, which for an 80/20 input-output mix gives a blended $2.00 per million tokens. Setting the two equal gives V times 2.00 times 10 to the minus 6 equal to 4,324, so V is 2,162,000,000 tokens, about 2.16 billion a month or 72 million a day. Below that volume renting through OpenRouter wins, because the organisation avoids hardware obsolescence, hardware failure risk and the upfront capital commitment; above it, or wherever HIPAA, ITAR or internal IP policy forbids cloud routing, on-premise becomes economically and operationally imperative."
    explanation: "A strong answer gives all three inputs, the $4,324 fixed cost, the $2.00 blended price and the 2.16 billion token figure, and it should show the division that produces them. It should also mention that the blended price comes from an 80/20 input-output mix at $1.40 and $4.40. An answer that only quotes 2.16 billion without the inputs has not shown the working."
```

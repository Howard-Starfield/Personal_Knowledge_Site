---
id: "3d1f9316-68ea-4a4e-977a-c290bddb85e1"
title: "Google Gemini & Sovereign Ecosystem: Gemini Diffusion, 3.5 Flash & On-Device Gemma 4 12B: Question Bank"
description: "Practises the lesson's Gemini 3.5 Flash pricing, the denoising mechanics of Gemini Diffusion and the VRAM mathematics of running Gemma 4 12B locally."
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

These questions practise [[courses/ai-model-trends-the-latest-you-need-to-know/lessons/03-google-gemini-diffusion-sovereign-gemma|Google Gemini & Sovereign Ecosystem: Gemini Diffusion, 3.5 Flash & On-Device Gemma 4 12B]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "39227c81-d671-4ca1-8e2d-4a716b3b5be9"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson charge for Gemini 3.5 Flash, and what happens to the price for a long-context cached prompt?"
    options:
      - id: a
        text: "$0.075 input and $0.30 output per million tokens, with cached long contexts at $0.01875"
      - id: b
        text: "$1.25 per million input tokens and $5.00 per million output tokens, with long-context cached prompts dropping to $0.01875"
      - id: c
        text: "$0.075 per million input tokens and $0.30 per million output tokens, with long-context cached prompts rising to $0.30"
      - id: d
        text: "$0.00 per million tokens, because the model runs on Google's own hardware and is never metered"
    correctOptionIds:
      - a
    explanation: "Gemini 3.5 Flash is priced at $0.075 per million input tokens for prompts up to 128K and $0.30 per million output tokens, and the lesson adds a context caching discount that drops long-context cached prompts to $0.01875 per million tokens. Option b gives Gemini 1.5 Pro's pricing, which the comparative matrix lists as $1.25 and $5.00. Option c has the caching discount backwards. Option d is wrong because the model is a metered cloud API, unlike a locally hosted Gemma checkpoint."

  - id: "755e518d-9cda-4710-9c97-d37eacbdef83"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson, what does it cost to ingest a 100,000-line monorepo of roughly 400,000 tokens on Gemini 3.5 Flash, and how does that compare with the alternatives?"
    options:
      - id: a
        text: "$4.00, the same as Anthropic Fable 5, because both bill the identical number of cached tokens"
      - id: b
        text: "$0.03, against $4.00 on Anthropic Fable 5 and $2.00 on OpenAI GPT-5.6 Sol"
      - id: c
        text: "$0.30, because the model bills the whole 400,000 tokens as if they were output tokens"
      - id: d
        text: "$0.03, but the lesson claims that still leaves it 50x to 100x more expensive than the cloud alternatives"
    correctOptionIds:
      - b
    explanation: "The lesson puts the ingestion at $0.03 on Gemini 3.5 Flash, against $4.00 on Anthropic Fable 5 and $2.00 on OpenAI GPT-5.6 Sol, and calls that a 50x to 100x economic advantage for high-volume continuous integration linting, pull-request triage and test-suite generation. Option a mistakes the Fable 5 figure for Flash's own cost. Option c charges input tokens at the output rate. Option d has the direction of the comparison reversed."

  - id: "7d59e422-47d1-4ab2-b895-1f426b2839a2"
    revision: 1
    status: active
    type: single-choice
    prompt: "What makes Gemini Diffusion's generation behaviour different from causal autoregressive decoding?"
    options:
      - id: a
        text: "It generates tokens strictly left to right, but with a much smaller per-token embedding dimension and a shorter context window"
      - id: b
        text: "It replaces sequential decoding with parallel denoising: 2,048 tokens in 16 or 32 steps, with native in-filling"
      - id: c
        text: "It generates one token per forward pass but caches every key and value in VRAM across denoising timesteps, exactly as an ordinary decoder would"
      - id: d
        text: "It applies a lower-triangular causal mask so that each token can attend to the tokens that follow it"
    correctOptionIds:
      - b
    explanation: "Gemini Diffusion starts from pure noise and denoises the whole sequence in parallel, so a sequence of 2,048 tokens takes only 16 or 32 steps, and total inference latency is disconnected from sequence length. Option a describes ordinary autoregressive decoding. Option c contradicts the lesson's warning that the KV cache cannot be reused across denoising timesteps. Option d inverts the meaning of the causal mask, which is exactly the restriction that makes autoregressive models poor at in-filling."

  - id: "a8b05175-be39-4c02-9e39-edfa714f9121"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say about the Key-Value cache in Gemini Diffusion?"
    options:
      - id: a
        text: "It is the main speed-up, because each denoising step reuses the keys and values computed in the previous step"
      - id: b
        text: "It is unavailable for autoregressive models, since only diffusion models can keep a KV cache in VRAM"
      - id: c
        text: "It cannot be reused across denoising timesteps, so hardware must trade compute for a zero KV cache footprint"
      - id: d
        text: "It is retained for the prefix but discarded for the denoised middle region of an in-filling task"
    correctOptionIds:
      - c
    explanation: "Because the entire sequence representation evolves at every denoising timestep, all keys and values must be recalculated on every pass, so the KV cache cannot be reused and hardware implementations trade high compute utilization for a zero KV cache VRAM footprint. Option a describes the opposite of what the lesson says. Option b has the model families reversed. Option d invents a prefix-versus-middle rule that the lesson does not state."

  - id: "cf1fd503-c039-44b7-8fa8-3e6b99a40403"
    revision: 1
    status: active
    type: single-choice
    prompt: "What hardware does the lesson say Gemma 4 12B needs at FP16 precision?"
    options:
      - id: a
        text: "15.0 GB in total, so a single RTX 4080 with 16GB of VRAM is enough at full precision"
      - id: b
        text: "7.5 GB in total, so a consumer RTX 4060 with 8GB can run the full model unquantized"
      - id: c
        text: "24.0 GB in total, because the 1.25 headroom factor applies only to the KV cache and not to the weights"
      - id: d
        text: "30.0 GB in total, which means dual RTX 4090 cards or a 64GB Apple M4 Max"
    correctOptionIds:
      - d
    explanation: "At FP16 the weights are 24.0 GB and the 1.25 headroom factor takes the total to 30.0 GB, which the lesson maps to dual RTX 4090 cards or an Apple M4 Max with 64GB. Option a describes the INT8 figure, which is 15.0 GB. Option b describes the 4-bit figure, which is 7.5 GB. Option c has the arithmetic backwards, since the 24.0 GB is the weights alone and the factor is applied on top of it."

  - id: "7e91b374-ee9a-4919-8045-ec067a65d557"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the lesson's formula for sizing the VRAM a local Gemma 4 12B deployment needs?"
    options:
      - id: a
        text: "VRAM in bytes equals (P times B over 8) times 1.25, where the 1.25 factor is operational headroom"
      - id: b
        text: "VRAM in bytes equals (P times B over 8) times 2.0, because both the weights and the activations must be stored twice over"
      - id: c
        text: "VRAM in bytes equals P times B over 8, with the KV cache budgeted separately in the operating system's page file"
      - id: d
        text: "VRAM in bytes equals the parameter count divided by the bit width, with no overhead factor applied at all"
    correctOptionIds:
      - a
    explanation: "The formula is VRAM in bytes equals (P times B over 8) times 1.25, where P is the parameter count and B the bit width. The 1.25 multiplier provides the 25% operational headroom needed for the KV cache, activation memory tensors, the CUDA runtime context and scratchpad buffers during multi-token generation. Option b invents a twofold factor. Option c leaves out the headroom. Option d omits the factor that makes the plan safe."

  - id: "4f04e097-c80e-40dc-bb7d-902e9c0e046e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the following is NOT one of the three sovereign invariants the Hermes Agent architecture enforces?"
    options:
      - id: a
        text: "Zero external network calls, with all outbound connections blocked at the socket level"
      - id: b
        text: "Local SQLite vector memory through embedded vector extensions such as sqlite-vec"
      - id: c
        text: "A hosted vector database tier that mirrors the local index"
      - id: d
        text: "Sandboxed subprocess tool dispatch, so every file edit runs in an isolated child process"
    correctOptionIds:
      - c
    explanation: "The three invariants are zero external network calls, local SQLite vector memory through sqlite-vec, and sandboxed subprocess tool dispatch. The lesson says explicitly that no codebase fragments are ever sent to external cloud vector databases such as Pinecone or Qdrant Cloud, so a hosted mirror tier would break the whole point. The other three options are the invariants themselves, so the answer is the only one that is not."

  - id: "21e2070f-a923-4761-8763-7c271c888710"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which properties does the lesson attribute to the Hermes Agent local runtime? Select every correct answer."
    options:
      - id: a
        text: "All outbound internet connections are blocked at the socket level, and the agent talks only to local endpoints."
      - id: b
        text: "Repository embeddings are indexed into an embedded SQLite database with vector extensions such as sqlite-vec."
      - id: c
        text: "File modifications, linter executions and git operations execute inside an isolated Node.js child-process sandbox."
      - id: d
        text: "The agent calls a hosted vector database such as Pinecone or Qdrant Cloud for repository retrieval."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c are the three sovereign invariants the lesson sets out, and together they are what produces compliance with HIPAA, GDPR and trade-secret boundaries. Option d contradicts the second invariant directly: the whole point of the local sqlite-vec index is that no codebase fragment leaves the machine."

  - id: "acfa56da-83fa-4f06-a0d0-722fc7cbba52"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about deploying Gemma 4 12B at reduced precision match the lesson? Select every correct answer."
    options:
      - id: a
        text: "At FP16 the weights alone are 24.0 GB, and the 1.25 headroom factor takes the total to 30.0 GB."
      - id: b
        text: "At INT8 the total requirement is 15.0 GB, which fits on a single RTX 4080 with 16GB of VRAM."
      - id: c
        text: "4-bit quantization increases code perplexity by 8% to 14% in the lesson's empirical evaluations."
      - id: d
        text: "4-bit quantization leaves symbolic reasoning and abstract syntax tree parsing entirely unaffected."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c all match the lesson's table and its quantization warning, which cites miscounted Python indentation levels and hallucinated TypeScript generic parameters as the failure modes and recommends INT8 or FP16 checkpoints for mission-critical software engineering agents. Option d is the opposite of what the lesson says: measurable degradation in symbolic reasoning and abstract syntax tree code parsing is precisely the reason it warns against aggressive 4-bit weight quantization."

  - id: "982f6ee7-80b1-4ecb-9e46-5842cf849473"
    revision: 1
    status: active
    type: true-false
    prompt: "Gemini Diffusion generates an entire sequence of 2,048 tokens in only 16 or 32 parallel denoising steps, so its inference latency is disconnected from sequence length."
    answer: true
    explanation: "That is the lesson's sub-linear step complexity claim, with N = 2,048 tokens produced in S = 16 or S = 32 steps and total latency no longer tied to sequence length. The caveat the lesson attaches is that the KV cache cannot be reused across denoising timesteps, so the throughput win is paid for in recomputation rather than in caching."

  - id: "054c137b-73ba-4b6e-9c6f-5a7b098d0a00"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why a team handling regulated or trade-secret data might route a task to Gemma 4 12B under Hermes Agent rather than to Gemini 3.5 Flash, and what the two paths cost."
    sampleAnswer: "Gemini 3.5 Flash is fast and cheap at $0.075 per million input tokens and $0.30 per million output tokens, but it is a cloud service: the data leaves the premises, crosses Google's public cloud fabric and stays subject to its terms of service. Gemma 4 12B under Hermes Agent is a local, air-gapped runtime with three sovereign invariants: no external network calls at all, repository embeddings indexed into an embedded SQLite database with sqlite-vec rather than a hosted vector database, and tool dispatch inside an isolated child-process sandbox. That buys compliance with HIPAA, GDPR and trade-secret boundaries, at the price of your own hardware: about 30 GB of VRAM at FP16, 15 GB at INT8 or 7.5 GB at 4-bit, and zero marginal API cost per token."
    explanation: "A strong answer names the cloud-versus-local distinction and the three sovereign invariants, and gives the VRAM figures as the price of sovereignty. It should quote Flash's $0.075 and $0.30 pricing as the cloud alternative. An answer that only says the local model is more private has missed the mechanism, which is the blocked socket layer and the local sqlite-vec index."

  - id: "b9a74c23-6962-4962-85c8-a187609c2c26"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe what makes Gemini Diffusion different from an autoregressive language model, and name the autoregressive limitation it fixes."
    sampleAnswer: "An autoregressive model factorises a sequence as a chain of conditional probabilities and decodes left to right, one token per forward pass, so it needs N sequential passes, and each token can attend only to the tokens before it. Gemini Diffusion treats generation as denoising instead: it starts from pure noise and predicts the clean embedding or the noise vector across a small number of parallel denoising steps with bidirectional self-attention, so 2,048 tokens take 16 or 32 steps and latency is disconnected from sequence length. The limitation it fixes is unidirectional cognitive blindness, because a causal mask means a token can never attend to later tokens, which makes autoregressive models poor at code in-filling where both the imports above and the callers below are already defined. The cost is that the KV cache cannot be reused across denoising timesteps."
    explanation: "A strong answer contrasts sequential left-to-right decoding with parallel denoising, gives the 16 or 32 step figure for 2,048 tokens, and names code in-filling as the limitation being fixed, because bidirectional attention lets the model respect the prefix and the suffix at once. It should also acknowledge the KV cache trade-off. An answer that only says diffusion is faster has missed both the mechanism and the limitation."
```

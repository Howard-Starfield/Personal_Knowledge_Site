---
id: "b8f2d571-4c06-4a93-8e17-5d90c3a6e284"
title: "Chapter 11: Production LLMOps, Cost Modeling & Knowledge Distillation: Question Bank"
description: "Practice questions for the LLMOps chapter: the prefill and decode duality and the roofline ceiling, PagedAttention and the KV cache arithmetic, AWQ and GPTQ, the three distillation paradigms, the proof of Hinton's tau-squared factor, the self-hosting breakeven model, and the three production traps."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/11-production-llmops-and-distillation|Chapter 11: Production LLMOps, Cost Modeling & Knowledge Distillation]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "3d9b6e14-7a25-4f08-9c31-6e5a0d8b2f47"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson says a 70B model in FP16 reaches about 14.56 tokens per second on an A100 cluster. How does it arrive at that number?"
    options:
      - id: a
        text: "Dividing the 2,039 GB/s memory bandwidth by the 140 GB of weights that must stream for every token"
      - id: b
        text: "Dividing the 312 TFLOPS of Tensor Core compute by the 140 GB of weights, then converting to tokens"
      - id: c
        text: "Multiplying the 2,039 GB/s memory bandwidth by the batch size, because batching removes the memory ceiling"
      - id: d
        text: "Dividing the 140 GB of weights by the 2,039 GB/s bandwidth, then reading the result as a time per token"
    correctOptionIds: [a]
    explanation: "a is correct: the roofline model gives the single-stream ceiling as the memory bandwidth divided by the model size in VRAM, so 2,039 GB/s over 140 GB is about 14.56 tokens per second, with the matching minimum inter-token latency of 140 over 2,039 times 1,000, which is 68.66 ms per token. b uses the compute figure the chapter shows to be almost irrelevant to decode, c misstates the effect of batching, and d inverts the division and reads a rate as a latency. Lesson section: Concrete Hardware Proof: 70B Model on NVIDIA A100 vs. H100."
  - id: "8e14f7c3-5b90-4d26-a708-3f9c2b6d1e58"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson stresses that moving from an A100 to an H100 speeds up single-stream generation by only 1.64x. Why?"
    options:
      - id: a
        text: "Because the H100's extra compute is spent on the attention head, which the decode path cannot use"
      - id: b
        text: "Because tensor parallelism splits the weights across GPUs and adds an inter-GPU transfer to every token"
      - id: c
        text: "Because decode is memory-bandwidth-bound, and the bandwidth only rises from 2,039 GB/s to 3,350 GB/s"
      - id: d
        text: "Because the H100's HBM3 doubles the model capacity, so the same weights occupy half the memory"
    correctOptionIds: [c]
    explanation: "c is correct: the decode phase must move every parameter from high bandwidth memory into the chip for each generated token, so its speed is set by the memory bus, and the H100's bandwidth advantage is 3,350 over 2,039, which is the same 1.64 times by which the generation speed rises even though the Tensor Core compute tripled from 312 to 989 TFLOPS. a, b and d describe effects the chapter does not claim for the upgrade. Lesson section: Concrete Hardware Proof: 70B Model on NVIDIA A100 vs. H100."
  - id: "c7a3d061-9e48-4b15-8f72-4d0b6e8c3a29"
    revision: 1
    status: active
    type: single-choice
    prompt: "What problem does PagedAttention solve, and how does it solve it?"
    options:
      - id: a
        text: "It replaces the KV cache with recomputed activations, so the context is held on the CPU between tokens"
      - id: b
        text: "It maps logical token blocks to non-contiguous physical blocks, which removes external fragmentation"
      - id: c
        text: "It compresses the KV cache to 4-bit, which removes the need for any block table at all"
      - id: d
        text: "It bundles whole requests into one static tensor, which removes the bubble waste in generation"
    correctOptionIds: [b]
    explanation: "b is correct: vLLM borrows virtual memory paging from the operating system, partitioning VRAM into a global pool of fixed-size physical blocks of 16 or 32 tokens and keeping a block table that maps each request's logical token indices to physical addresses, so external fragmentation disappears entirely because every allocation unit has the same size and internal fragmentation is confined to the final incomplete block at under 4%. a and c describe mechanisms the chapter does not give, and d describes static batching, which is the problem PagedAttention solves alongside the memory wall, not its mechanism. Lesson section: The PagedAttention Breakthrough."
  - id: "f52b8d30-6c17-4e49-a83b-1d9e7c0b5a64"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson call static batching wasteful?"
    options:
      - id: a
        text: "Because every request must be padded to the full context window rather than to the longest request in the batch"
      - id: b
        text: "Because the batch size must be chosen at build time, so the engine cannot admit requests while it runs"
      - id: c
        text: "Because the KV cache for the batch must be contiguous, so the engine cannot evict a finished request"
      - id: d
        text: "Because the batch runs until the longest request ends, so the GPU computes padding for the finished ones"
    correctOptionIds: [d]
    explanation: "d is correct: natural language responses have unpredictable lengths, so a request that finishes at step 50 stays locked in the batch while the GPU computes padding tokens until the longest member terminates at step 500, which wastes over 50% of GPU compute in idle bubbles. a, b and c each misdescribe the mechanics: static batching pads to the longest request in the batch, it does admit a fixed batch at each round, and its KV cache is contiguous, which is the separate memory problem PagedAttention addresses. Lesson section: The Failure of Static Batching: Bubble Waste."
  - id: "6c07e4a9-3b58-4d26-9051-8f2a7c3b6e10"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the lesson's formula for Llama-3-70B with 80 layers, 8 KV heads, a head dimension of 128 and FP16, what is the KV cache per token?"
    options:
      - id: a
        text: "327,680 bytes, which is about 320 KB per token and 1.342 GB for a 4,096-token request"
      - id: b
        text: "41,943 bytes, because grouped-query attention shares the query heads rather than the value heads"
      - id: c
        text: "3,276,800 bytes, because each attention layer keeps a separate copy of the keys and of the values"
      - id: d
        text: "1,310,720 bytes, because the head dimension must be squared to include the attention probabilities"
    correctOptionIds: [a]
    explanation: "a is correct: two times 80 layers times 8 KV heads times 128 head dimension times 2 bytes is 327,680 bytes, which is about 320 KB per token, so a 4,096-token request needs about 1.342 GB and a concurrent batch of 64 requests needs 85.9 GB of VRAM for the cache alone. b misapplies grouped-query attention, which shares across query heads rather than halving the key and value storage, and c and d misapply the formula. Lesson section: The KV Cache Memory Wall."
  - id: "1b4d7e90-5c26-4a83-97f0-8e2a6d3c1b57"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does AWQ exploit, and how does it keep the runtime efficient?"
    options:
      - id: a
        text: "It scales salient channels so their relative error shrinks, then fuses the inverse scale into the LayerNorm"
      - id: b
        text: "It keeps the top 1% of weights in FP16 and quantizes the rest, which mixed-precision kernels handle natively"
      - id: c
        text: "It compensates the rounding error of each column with the inverse Hessian, grouping updates in blocks of 128"
      - id: d
        text: "It searches for the best scale per layer by minimising perplexity on a calibration set of 128 passages"
    correctOptionIds: [a]
    explanation: "a is correct: AWQ scales the salient weight channels up by a factor s and divides the matching activations by s, so their relative rounding error shrinks by a factor of s, and the inverse scaling is permanently folded into the preceding LayerNorm or bias weights, so the runtime still executes a standard homogeneous INT4 matrix multiplication with zero mixed-precision penalty. b is the mixed-precision approach AWQ explicitly avoids because it breaks the uniform tensor layout the Tensor Core GEMM kernels need, and c is GPTQ's mechanism. Lesson section: Activation-Aware Weight Quantization (AWQ)."
  - id: "d9c1b670-3e85-4a24-8f07-5b3e2d9a6c14"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the core mechanism that distinguishes GPTQ from naive uniform quantization?"
    options:
      - id: a
        text: "It quantizes each weight column independently, so no column's error can affect any other column"
      - id: b
        text: "It protects the top 0.1% to 1% of salient channels in FP16 while the rest of the matrix is compressed to 4-bit"
      - id: c
        text: "It uses per-channel scaling factors chosen from the average activation magnitude over a calibration set"
      - id: d
        text: "It quantizes one column at a time and adjusts the remaining columns to compensate for the error"
    correctOptionIds: [d]
    explanation: "d is correct: GPTQ treats quantization as a second-order error-minimisation problem under the Optimal Brain Surgeon framework, rounding one column at a time and using the inverse Hessian to update the columns not yet quantized so that the layer output error is compensated rather than accumulated. The Hessian inverse is computed once by Cholesky decomposition and the updates are applied in lazy blocks of 128 columns, which is what makes a 70B model quantizable in roughly four hours on a single GPU. a, b and c each describe a different method. Lesson section: Generalized Post-Training Quantization (GPTQ)."
  - id: "7e35a0c8-1b94-4d27-8f63-5a9d2e7c4b06"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three traps does the lesson name in its section on what engineers miss most in LLMOps and distillation? Select every correct answer."
    options:
      - id: a
        text: "The omitted tau-squared scaling trap, where the teacher's gradient is silently diminished by a factor of tau squared"
      - id: b
        text: "The decode memory bandwidth fallacy, where more Tensor Core compute is expected to speed up generation"
      - id: c
        text: "The PTQ calibration trap, where a calibration set of 128 passages is too small to preserve perplexity"
      - id: d
        text: "Student capacity collapse, where a 1B student is asked to replicate an unconstrained 70B generalist"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. Dropping the tau-squared multiplier from the distillation loss makes the teacher's gradient sixteen times weaker at a temperature of 4 and sixty-four times weaker at a temperature of 8, so the student trains almost entirely on the hard labels and never absorbs the dark knowledge. Believing that more Tensor Core FLOPS will make single-stream generation three times faster is physically impossible, because all 140 GB of weights must cross the memory bus for every token. And a 1B student cannot replicate the latent manifold of an unconstrained 70B generalist, which causes representation collapse with smeared outputs and rising hallucination rates, so the domain must be narrowed first. c is not one of the three named traps. Lesson section: The \"Most Missed Things\" in LLMOps & Distillation."
  - id: "2f8c5b19-7e30-4a46-9d07-6b1e4a8c3d52"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the lesson's serving economics are correct? Select every correct answer."
    options:
      - id: a
        text: "The breakeven volume divides the monthly fixed GPU cost by the API cost per request less the variable self-host cost"
      - id: b
        text: "Average GPU utilisation is usually close to 100%, because capacity is provisioned for the mean rather than the peak"
      - id: c
        text: "In the worked case the fixed monthly cost is $24,020 and the breakeven is about 8.01 million requests a month"
      - id: d
        text: "Because capacity must cover the 99th percentile peak, average monthly utilisation typically sits between 20% and 40%"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The breakeven equation divides the monthly fixed GPU cost by the API cost per request minus the variable self-hosting cost per request, and in the worked case that is $24,020 over a $0.003 margin, giving about 8,006,667 requests a month. The fixed cost itself is the $17,520 GPU lease for an 8x H100 node at $24.00 an hour over 730 hours, plus $1,500 for egress, storage and load balancing, plus $5,000 of DevOps allocation. Because the cluster must absorb the 99th percentile peak without breaching the latency SLA while traffic follows a diurnal curve, average utilisation sits between 20% and 40%, and at 25% the effective cost per token is four times the naive peak-capacity estimate. b is the exact fallacy the chapter warns against. Lesson section: The Utilization Factor Fallacy and the Breakeven Volume Equation."
  - id: "6a0d3f84-9b57-4c12-8e36-4b7d1f9c0a28"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says that at a temperature of 4 the teacher puts 0.84 on \"Paris\" and 0.08 on \"Lyon\" for the prompt \"The capital of France is\", and that this residual mass is what the student learns from."
    answer: true
    explanation: "True. The lesson's dark knowledge case uses exactly those figures. With the hard label \"Paris\" at 1.0 and every other token at 0.0, a student trained only on the one-hot target learns nothing about the structure of the alternatives and an error predicting \"Lyon\" is penalised exactly as hard as one predicting \"tractor\". The teacher's softened distribution at a temperature of 4 instead puts \"Paris\" at 0.84, \"Lyon\" at 0.08, \"Marseille\" at 0.05, \"London\" at 0.01 and \"tractor\" at about 10 to the power of minus 8. That residual mass encodes the teacher's implicit knowledge that Lyon and Marseille are major French cities, that London is a capital city even though it is geographically wrong, and that \"tractor\" is linguistically absurd, and forcing the student to match it transfers the latent manifold geometry, the semantic taxonomy and the uncertainty boundaries. Lesson section: The Dark Knowledge Principle."
  - id: "b60e9c35-4a17-4d92-8f03-7c5b1d8a2e49"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why Hinton's distillation loss carries a tau-squared factor on the soft term."
    sampleAnswer: "The gradient of the soft cross-entropy with respect to a student logit is one over tau times the difference between the student's softened probability and the teacher's. Substituting the first-order Taylor expansion of the softened softmax, which is valid when the temperature is large relative to the logit magnitudes, the probability difference itself contributes a factor of one over N tau, so the raw soft gradient shrinks as one over N tau squared. That shrinkage is fatal in practice: raising the temperature is exactly what exposes the dark knowledge and smooths the distribution, and at a temperature of 4 the teacher's gradient is sixteen times weaker and at a temperature of 10 a hundred times weaker, so the hard ground-truth term completely overpowers it and the student trains almost exclusively on the hard labels. Multiplying the soft term by tau squared cancels the artefact and restores parity, so the gradient magnitude stays consistent whatever smoothing temperature is chosen."
    explanation: "A strong answer gives the one over N tau squared result, the sixteen times and hundred times figures, and the consequence that the hard term would otherwise swamp the soft one. An answer that only says the factor compensates for the temperature has not shown why."
  - id: "5c93e7d6-8f41-4b05-9e72-0a3c6d8b5e37"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the prefill and decode duality the lesson sets out, and how it fixes the ceiling on single-stream generation."
    sampleAnswer: "Autoregressive inference has two phases with opposite bottlenecks. In prefill the whole prompt of N tokens is processed at once, the dominant operation is a matrix-matrix product, the arithmetic intensity is high, the Tensor Cores are saturated and the phase is compute-bound; the metric that matters there is time to first token. In decode exactly one token is produced per forward step, the dominant operation is a matrix-vector product, and every parameter in the model must stream from off-chip high bandwidth memory across the memory bus into the chip, so the arithmetic intensity collapses towards one FLOP per byte, the Tensor Cores idle about 95% of the time and the phase is memory bandwidth-bound; the metric there is inter-token latency. That gives a hard ceiling: the tokens per second for a single stream cannot exceed the memory bandwidth divided by the model size in VRAM. For a 70B model in FP16 at 140 GB on an H100 cluster at 3,350 GB/s that is about 23.93 tokens per second and about 41.79 ms per token, and on an A100 at 2,039 GB/s about 14.56 tokens per second and 68.66 ms per token. Since the compute tripled while the bandwidth rose only 1.64 times, generation speed rose only 1.64 times, and the ways to raise it are to quantize the weights, to batch until the arithmetic intensity climbs and the engine becomes compute-bound, or to distill into a smaller model."
    explanation: "A strong answer names both phases with their dominant operation and their metric, gives the roofline ceiling with at least one hardware pair of figures, and explains why tripling the compute barely moves single-stream speed. An answer that only says decode is slower has not reached the mechanism."
```

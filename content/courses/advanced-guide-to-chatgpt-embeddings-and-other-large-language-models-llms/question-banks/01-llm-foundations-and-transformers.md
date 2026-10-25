---
id: "0cf9c5e1-9db7-4168-b844-5495b5e61ff5"
title: "Chapter 1: LLM Foundations & The Transformer Architecture: Question Bank"
description: "Practice questions for the Transformer chapter: scaled dot-product attention and why it is scaled, multi-head subspaces, positional encodings, the three subfamilies, sampling hyperparameters, and the three production traps."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/01-llm-foundations-and-transformers|Chapter 1: LLM Foundations & The Transformer Architecture]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f30f58fc-32f4-4ee6-95a9-fed9a3015024"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's spotlight-theater analogy for self-attention, what do the Query, the Key and the Value correspond to?"
    options:
      - id: a
        text: "The Query is the spotlight, the Key is the name badge, and the Value is the notebook"
      - id: b
        text: "The Query is the name badge, the Key is the notebook, and the Value is the spotlight"
      - id: c
        text: "The Query is the notebook, the Key is the spotlight, and the Value is the name badge"
      - id: d
        text: "They are one and the same asset, because self-attention uses a single projection per token position"
    correctOptionIds: [a]
    explanation: "a is correct: the Query is the adjustable spotlight that asks what kind of context this token needs, the Key is the public name badge that declares the token's semantic identity and grammatical role, and the Value is the notebook holding the raw factual payload the token contributes when it is addressed. b and c swap the three assets around. d is wrong because each token projects separately into all three spaces through the learned matrices W^Q, W^K and W^V. Lesson section: The Mental Model: The Spotlight Theater (Feynman Analogy)."
  - id: "8e62aa20-95f5-4154-a999-3c7f0fa84ea9"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson derives the variance of an unscaled query-key dot product. What does it show happens as the key dimension grows?"
    options:
      - id: a
        text: "The variance shrinks toward zero, so the softmax flattens and every token receives the same weight"
      - id: b
        text: "The variance stays at one whatever the dimension, so the scaling factor only changes the arithmetic cost"
      - id: c
        text: "The variance grows linearly with the key dimension, so the logits saturate softmax and the gradients vanish"
      - id: d
        text: "The variance grows with the square of the key dimension, so the scaling factor should have been d_k itself"
    correctOptionIds: [c]
    explanation: "c is correct: the proof shows that the variance of the dot product equals d_k, so the standard deviation of the raw scores is the square root of d_k, which is about 11.31 when d_k is 128. Raw scores then reach values like 25 or minus 30, the softmax saturates into a near one-hot vector, and the derivative of every probability with respect to its logit becomes zero, so no gradient flows back to W^Q and W^K. a and b contradict the derivation, and d misstates the growth law, because the variance is linear in d_k and the square root is exactly what divides it back to unit variance. Lesson section: The Mathematical Proof: Why the Square Root of d_k Scaling Factor Is Vital."
  - id: "fe77d5ef-b591-4182-a26c-acded14f2f44"
    revision: 1
    status: active
    type: single-choice
    prompt: "BERT-Base has a hidden dimension of 768 and 12 attention heads. What does the lesson say each head operates on?"
    options:
      - id: a
        text: "A subspace of 768 dimensions, because every head sees the full model dimension before it is projected"
      - id: b
        text: "A subspace of 64 dimensions, because the hidden dimension is divided by the number of heads"
      - id: c
        text: "A subspace of 12 dimensions, because each head is assigned one dimension per layer of the stack"
      - id: d
        text: "A subspace of 32 dimensions, because the number of transformer layers is subtracted from the hidden dimension"
    correctOptionIds: [b]
    explanation: "b is correct: the subspace dimension is d_k = d_v = d_model divided by h, so 768 divided by 12 gives 64, and the twelve head outputs are concatenated back to 768 before the output projection W^O blends them into one representation. a describes a single attention mechanism over the full dimension, c and d are arithmetic the lesson never performs. The point of the split is that separate heads specialise, one on syntactic dependencies, one on coreference, one on positional locality and one on punctuation. Lesson section: Subspace Projections and Dimensions."
  - id: "f7af2836-23cd-4a75-aa41-3e6d1ef0faee"
    revision: 1
    status: active
    type: single-choice
    prompt: "What property does Rotary Position Embeddings give a model, according to the lesson's comparison with the earlier schemes?"
    options:
      - id: a
        text: "An absolute position vector that is added to every token embedding before the first attention layer"
      - id: b
        text: "A learned lookup table that generalises to any sequence length, because the positions are trained rather than fixed in advance"
      - id: c
        text: "A sinusoidal encoding whose wavelengths form a geometric progression from 2 pi up to 10000 times 2 pi"
      - id: d
        text: "An inner product that depends only on the relative distance between two positions, so context can be extended"
    correctOptionIds: [d]
    explanation: "d is correct: RoPE applies a multiplicative rotation to the Query and Key vectors, and the inner product between a rotated query and a rotated key reduces to one that depends only on the difference of the two positions, which is what lets Llama, Mistral, Gemma and Qwen generalise to longer context windows using interpolation techniques such as YaRN or RoPE scaling. a describes the additive sinusoidal scheme, b describes the learned absolute table that cannot extrapolate beyond its training length, and c describes the sinusoidal wavelengths. Lesson section: 3. Rotary Position Embeddings (RoPE)."
  - id: "1bc03490-2237-4822-8169-1db1308c1f8a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does a bare self-attention layer fail to distinguish \"The chef cooked the bear\" from \"The bear cooked the chef\"?"
    options:
      - id: a
        text: "Self-attention is permutation-invariant, so the pairwise dot products over the two token sets are identical"
      - id: b
        text: "Self-attention is permutation-invariant, so the token embeddings of both sentences are literally the same vectors"
      - id: c
        text: "The causal mask hides the second token from the first, so the model never sees the words at all"
      - id: d
        text: "The softmax saturates on both sentences, so every attention weight is spread evenly across the sequence"
    correctOptionIds: [a]
    explanation: "a is correct: pure self-attention is strictly permutation-invariant, it operates over an unordered multiset of tokens with zero intrinsic awareness of word order or distance, so the set of pairwise dot products is mathematically identical for the two sentences. b confuses the invariance of the attention computation with the embeddings themselves, which are different words. c is wrong because a causal mask is a decoder-only device, and d misdescribes the failure, since the problem is not saturation but the absence of any positional signal, which is why positional information must be injected before the first attention layer. Lesson section: Positional Encodings: Breaking Permutation Invariance."
  - id: "cb8aa4f7-7ad2-4751-9c55-827a684a4135"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the lesson's KV-cache equation for Llama-2 70B at batch size 8, context length 4096, 80 layers, hidden size 8192 and FP16, what does the KV cache come to?"
    options:
      - id: a
        text: "About 10.7 GB, because only the two projection matrices are stored and not a copy of the activations"
      - id: b
        text: "About 85.89 GB, which the lesson notes can exceed the size of the model weights under load"
      - id: c
        text: "About 140 GB, because the cache holds a full copy of the model weights for every token in the batch"
      - id: d
        text: "About 3.6 TB, because the cache is sized for the whole sparse cluster that serves the model"
    correctOptionIds: [b]
    explanation: "b is correct: two times the batch size times the context length times the number of layers times the hidden size times the bytes per parameter gives about 85.89 GB, and the lesson warns that the KV cache alone can exceed the size of the model weights under high concurrency or long sequence lengths, which is why it appears as its own term in the total VRAM equation alongside weights, activations and CUDA overhead. a, c and d use figures the lesson gives for other quantities, the weights at 140 GB and the GPT-4 sparse cluster at 3.6 TB. Lesson section: The Exact VRAM Equation for Inference."
  - id: "41bbd7d2-2609-40e4-a48c-e432352c692c"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's diagram gives the KV-cache memory of each attention variant as a share of the standard multi-head baseline. Which set is correct?"
    options:
      - id: a
        text: "Multi-head attention uses 100% of the baseline, grouped-query attention uses 25%, and multi-query attention uses 50% of it"
      - id: b
        text: "Multi-head attention uses 100% of the baseline, grouped-query attention uses 25%, and multi-query attention uses 12.5%"
      - id: c
        text: "Multi-head attention uses 12.5% of the baseline, grouped-query attention uses 25%, and multi-query attention uses the full 100%"
      - id: d
        text: "All three variants sit on the same baseline, because the cache stores activations rather than key and value vectors"
    correctOptionIds: [b]
    explanation: "b is correct: standard multi-head attention is the 100% baseline, grouped-query attention shares one key head and one value head across each group of query heads and sits at 25% of the baseline, and multi-query attention collapses to a single shared key and value head and sits at 12.5%. The lesson explains the mechanism as grouping the 32 query heads into 8 groups of 4 in Llama-3 and Mistral, which lets a serving cluster quadruple the batch size and cut serving costs by 75% without hurting generation quality. Lesson section: The KV Cache Memory Explosion."
  - id: "55a4595a-2505-48a3-b7d8-b39b8503ab38"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson names three architectural traps that cause widespread production failures. Which three are they? Select every correct answer."
    options:
      - id: a
        text: "The quadratic attention scaling trap, where doubling the context window quadruples the memory demand"
      - id: b
        text: "The softmax saturation trap, where omitting the square-root scaling kills the gradients"
      - id: c
        text: "The subword tokenisation trap, where splitting a word hides its individual characters from attention"
      - id: d
        text: "The KV cache memory explosion, where storing keys and values for many users exhausts server memory"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the lesson's section on what engineers miss most. Quadratic scaling makes a longer context cost far more than proportionally, the missing square-root of d_k makes the softmax saturate so the loss curve plateaus with no error raised, and the KV cache exhausts VRAM because generation throughput is memory-bandwidth bound. c is wrong because tokenisation is not one of the three traps named here, and the subword blind spot belongs to a different chapter. Lesson section: The \"Most Missed Things\" in Transformer Engineering."
  - id: "6668ff2f-f8c2-4fc7-ba66-f9233f8e38b5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the three Transformer subfamilies are correct? Select every correct answer."
    options:
      - id: a
        text: "An auto-encoding model such as BERT masks 15% of its tokens and predicts them from surrounding context"
      - id: b
        text: "An auto-regressive model such as GPT attends to every token in the sequence, because it applies no attention mask"
      - id: c
        text: "A sequence-to-sequence model such as T5 uses cross-attention, where the keys and values come from the encoder"
      - id: d
        text: "In a decoder-only model the mask sends the logit to minus infinity for any position to the right of the current one"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. BERT masks 15% of tokens with a special mask token and trains on cross-entropy against the original identities, T5's decoder takes its queries from its own previous layer and its keys and values from the encoder output, and the causal mask sets M_ij to minus infinity for j greater than i so that exp of minus infinity is zero and future tokens receive no attention weight. b is wrong because the decoder-only family is defined by exactly that mask, and that mask is why its pretraining objective reduces to maximising the log-likelihood of the next token. Lesson section: The Three Subfamilies of Transformers."
  - id: "12b8073c-2e48-421c-b2ac-824807bba8d3"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says that lowering the temperature towards zero makes generation strictly deterministic, which suits code generation and mathematical calculation."
    answer: true
    explanation: "True. As the temperature approaches zero the largest logit dominates the denominator completely, so the probability of the maximum logit goes to one and every other token goes to zero, which is greedy decoding and is strictly deterministic. The lesson calls it ideal for code generation, mathematical calculation and factual data extraction. Raising the temperature above one does the opposite: the differences between logits shrink and the distribution flattens toward uniform randomness, which increases diversity at the risk of hallucinated gibberish. Lesson section: 1. Temperature."
  - id: "628a09e1-6ec5-4e4f-97fe-61e241db2c12"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the difference between top-k and top-p sampling, and why the lesson treats top-p as the better default for some prompts."
    sampleAnswer: "Top-k puts a fixed ceiling on the candidate pool: the logits are sorted descending and only the top k tokens survive, everything else being assigned a logit of minus infinity, so with k set to 50 the model can never select a token outside those fifty. Top-p instead sets a probability-mass threshold and keeps the smallest set of tokens whose cumulative probability reaches p, so at p equal to 0.90 the prompt \"The capital of France is\" leaves a pool of one token, because Paris alone carries 0.92, while \"Once upon a\" needs a pool of eighteen tokens before the cumulative sum reaches 0.90. The lesson's argument is that language varies in how uncertain it is, so a fixed ceiling is too permissive when the answer is obvious and too restrictive when the answer is open."
    explanation: "A strong answer states both selection rules precisely, gives the pool sizes the lesson works through for the two prompts, and explains the adaptivity argument. An answer that says only that top-p is more flexible has not shown how the two rules differ."
  - id: "83554f6e-44e1-455f-ad48-d5ca8bab7c26"
    revision: 1
    status: active
    type: free-recall
    prompt: "A team doubles a model's context window from 4096 to 8192 tokens and the serving cluster runs out of memory. Explain what the lesson says is happening, and what the production answer is."
    sampleAnswer: "Standard self-attention scales at the square of the sequence length in both memory and compute, because the raw alignment matrix Q times K transpose is N by N, so doubling the window from 4096 to 8192 quadruples the demand instead of doubling it. The lesson puts a number on it: a sequence of 32768 tokens across 32 attention heads in FP16 needs about 68.7 GB just to hold the intermediate attention scores, which is why naive PyTorch attention at that length crashes on an 80 GB GPU. The production answer is FlashAttention, which never materialises the N by N matrix in high-bandwidth memory but tiles Q, K and V into blocks of about 192 KB that fit in on-chip SRAM, computes the softmax incrementally with online normalisation, and fuses the whole computation into one kernel, which yields a two-to-four-times wall-clock speedup and drops peak memory from the square of N down to N."
    explanation: "A strong answer names the quadratic scaling, gives the lesson's 68.7 GB figure for the intermediate matrix, and describes FlashAttention as a tiled and fused kernel that keeps that matrix off the memory bus. An answer that only says the context has become too long has not reached the mechanism."
```

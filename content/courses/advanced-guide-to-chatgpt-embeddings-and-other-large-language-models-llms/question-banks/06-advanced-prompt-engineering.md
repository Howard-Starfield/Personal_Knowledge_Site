---
id: "8b40c7f2-6d15-4a93-b7e8-2c04f9a6d351"
title: "Chapter 6: Advanced Prompt Engineering: Chains, Guardrails & Reasoning: Question Bank"
description: "Practice questions for the advanced prompting chapter: why Chain-of-Thought works, the reasoning taxonomy and its token costs, structured output by constrained decoding and repair loop, batch prompting against prompt chaining, the defence stack against injection, and confidence measurement from token log-probabilities."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/06-advanced-prompt-engineering|Chapter 6: Advanced Prompt Engineering: Chains, Guardrails & Reasoning]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "c51a8e37-9d42-4b06-8f75-2e3a9c05b1d6"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson's computational account, why does appending \"Let's think step by step\" improve accuracy on multi-step problems?"
    options:
      - id: a
        text: "The intermediate tokens act as external working memory, so the answer becomes a sequence of low-entropy steps"
      - id: b
        text: "The extra tokens raise the sampling temperature, which flattens the distribution and explores more options"
      - id: c
        text: "The extra tokens change the causal attention mask, which lets the model attend to the prompt from every position"
      - id: d
        text: "The extra tokens fill the residual stream, which reduces the entropy of the final target token all the way to zero"
    correctOptionIds: [a]
    explanation: "a is correct: without intermediate tokens the whole mapping from prompt to answer has to happen inside a fixed number of transformer layers, whereas each generated reasoning token passes through self-attention, stores partial sums and constraints in the residual stream and the KV cache, and lowers the conditional entropy of the final answer, turning one intractable leap into a chain of high-probability transitions. b and c invent decoding and masking effects the lesson does not claim, and d is wrong because the entropy reduction is a reduction, not a zeroing. Lesson section: The Cognitive & Computational Foundation."
  - id: "5e7b03d9-6a48-4c71-92f5-0b8d4e3a6c15"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which row of the lesson's Chain-of-Thought taxonomy is correct?"
    options:
      - id: a
        text: "Zero-shot CoT costs about 800 extra tokens, because the phrase expands the full reasoning path inside the prompt"
      - id: b
        text: "Few-shot manual CoT costs about 50 extra tokens, because only the trigger phrase is added to the demonstration block"
      - id: c
        text: "Least-to-most prompting costs about 800 extra tokens, because the sub-questions and their answers are all appended"
      - id: d
        text: "Self-consistency costs about 300 extra tokens, because only one extra path is sampled before the majority vote"
    correctOptionIds: [c]
    explanation: "c is correct: the taxonomy prices least-to-most at a high cost of roughly +800 tokens, because the model decomposes the query into sub-questions and each solved sub-question and answer is appended to the context before the next is attempted. Zero-shot CoT is the cheapest at about +50 tokens, few-shot manual CoT sits at about +300, self-consistency costs M times the single path because M paths are sampled, and tree-of-thoughts is the most expensive at B to the power D states. a, b and d each misprice a row. Lesson section: Variants of CoT Reasoning."
  - id: "9d24c81b-7f56-4a09-b3d8-5e0a6c9f2b34"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does majority voting over M sampled reasoning paths beat greedy decoding?"
    options:
      - id: a
        text: "Because the votes are taken on the raw token probabilities rather than on the decoded output strings"
      - id: b
        text: "Because errors are stochastic and disperse across many wrong answers, while correct paths converge on one answer"
      - id: c
        text: "Because sampling at a temperature near 0.7 removes the causal mask from the reasoning tokens as they are generated"
      - id: d
        text: "Because the majority vote discards the reasoning traces entirely, so the final answer carries no intermediate tokens"
    correctOptionIds: [b]
    explanation: "b is correct: in high-dimensional token space the errors and hallucinations of a single path are stochastic and disperse across many different wrong answers, whereas valid reasoning paths, even when phrased differently, consistently converge on the same correct invariant answer, so the vote recovers it. a is wrong because the vote is taken over the decoded answers, c is wrong because the causal mask is untouched by sampling, and d misdescribes the method, since the reasoning traces are what the model actually produces. Lesson section: Self-Consistency with Majority Voting."
  - id: "f07b3e58-2c96-4d14-a8f3-5b6e0d9a4c72"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team calls a frontier API where token logit access is unavailable. Which approach does the lesson recommend for structured output?"
    options:
      - id: a
        text: "Constrained decoding through a DFA compiled from the Pydantic schema, applied as a logit mask before the softmax"
      - id: b
        text: "A prompt that repeats the JSON schema several times, so the model is more likely to respect it on every single call"
      - id: c
        text: "Constrained decoding through a context-free grammar, applied after generation as a post-processing filter"
      - id: d
        text: "A deterministic self-correction repair loop that re-queries at temperature zero and routes failures onward"
    correctOptionIds: [d]
    explanation: "d is correct: when low-level logit manipulation is not available, the chapter's approach is the repair loop, in which the completion is parsed with the Pydantic model, any validation or decode error is caught with its exact location, message and type, a reflection prompt is assembled from the original prompt, the bad JSON and the error, and the model is re-queried at temperature zero for a single healing attempt before a dead-letter queue takes over. a and c are the logit-level techniques, which need a self-hosted engine such as vLLM, SGLang, Outlines or llama.cpp, and b is guesswork. Lesson section: The Automated Reflection Repair Loop."
  - id: "3a7f60c9-8d24-4b51-9e07-6c2b5f1a8d43"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson computes the cumulative failure probability of the repair loop. What does it work out to?"
    options:
      - id: a
        text: "0.05, because the retry inherits the single-pass failure probability when the temperature is unchanged"
      - id: b
        text: "0.001, which lifts pipeline reliability from 95% to 99.9% with a single automated retry"
      - id: c
        text: "0.25, because the retry and the first attempt each contribute a five percent failure probability"
      - id: d
        text: "0.0025, because the reflection prompt doubles the single-pass success probability of the frontier models"
    correctOptionIds: [b]
    explanation: "b is correct: with a single-pass success probability of about 0.92 to 0.96 for frontier models, the first attempt fails roughly 5% of the time, and a reflection prompt carrying the exact Pydantic error details lifts the retry success to about 0.98, so the cumulative failure probability is 0.05 times 0.02, which is 0.001, taking reliability from 95% to 99.9%. a, c and d each corrupt one of those steps. Lesson section: Mathematical Convergence of the Repair Loop."
  - id: "b29e4f70-1d38-4c85-a6b9-7f0c3e5b9a26"
    revision: 1
    status: active
    type: single-choice
    prompt: "A system instruction and its few-shot exemplars take 1,500 tokens and each of 10 reviews adds 30 tokens. What does the lesson say batching saves?"
    options:
      - id: a
        text: "Prompt tokens drop from 15,000 to 1,800, which is an 88% reduction in prompt token consumption"
      - id: b
        text: "Prompt tokens drop from 1,800 to 15,000, which is an 88% reduction in prompt token consumption"
      - id: c
        text: "Prompt tokens drop from 15,000 to 1,530, which is a 90% reduction in prompt token consumption"
      - id: d
        text: "Prompt tokens drop from 1,500 to 1,800, because the shared instruction is billed once for the whole batch"
    correctOptionIds: [a]
    explanation: "a is correct: running the 10 reviews individually pays the 1,500-token instruction ten times, which is 15,000 tokens, while the batch pays it once and adds 10 times 30, which is 300, for 1,800 tokens, an 88% reduction. b reverses the direction, c forgets the per-review tokens, and d describes the batch as if the individual runs did not exist. Lesson section: Batch Prompting Mechanics."
  - id: "6e05b3a8-4c72-4d91-b5f6-8a3c7e0d2b59"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which set of risks does the lesson attach to batch prompting?"
    options:
      - id: a
        text: "Context contamination between items, loss of the per-item temperature setting, and expiry of the API key mid-batch"
      - id: b
        text: "Positional degradation in the middle of the batch, a failure of the causal attention mask, and loss of the few-shot exemplars"
      - id: c
        text: "Truncation of the JSON array, duplicate billing of the system instruction, and growth of the KV cache beyond memory"
      - id: d
        text: "Context contamination between items, positional degradation in the middle of the batch, and truncation of the JSON array"
    correctOptionIds: [d]
    explanation: "d is correct: the chapter's three production pitfalls for batching are context contamination, where the sentiment of one review bleeds into the assessment of the next, positional degradation, where recall is higher for items at the very beginning and very end and accuracy drops for items in positions 4 through 8, and truncation risk, where exceeding the maximum output token limit severs the JSON array mid-structure and destroys its validity. a, b and c each substitute an effect the chapter does not list. Lesson section: Production Pitfalls."
  - id: "c1f9d47b-3a68-4e05-8d92-7b6c0a4f2d18"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three traps does the lesson call the most fatal in production prompt engineering? Select every correct answer."
    options:
      - id: a
        text: "The chain-of-thought hallucination snowball, where an early error becomes immutable context for every later step"
      - id: b
        text: "Indirect prompt injection through retrieved chunks, where a malicious payload rides in on a vector search hit"
      - id: c
        text: "The batch token blow-up, where packing items into one context multiplies the system prompt cost"
      - id: d
        text: "Monolithic prompt bloat, where instruction attrition makes the model ignore the rules in the middle"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. Because every emitted token becomes immutable context for all later forward passes, a bad first step such as asserting that 50,000 times 12 is 500,000 produces an elaborate and logically airtight but completely false justification; a payload injected into a public web page or shared document is retrieved by vector search and concatenated straight into the system prompt; and a prompt that grows past 2,000 tokens suffers instruction attrition, with the model prioritising the beginning and the end and ignoring the rules in the middle. c is not one of the three named traps. Lesson section: The \"Most Missed Things\" in Production Prompt Engineering."
  - id: "4d8b2e05-7f61-4c39-8a05-d6e2b7f4c193"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the defence stack against prompt injection are correct? Select every correct answer."
    options:
      - id: a
        text: "The quarantined LLM has zero tools, zero API keys and zero database permissions"
      - id: b
        text: "Output filtering is achieved by raising the sampling temperature until invalid completions become unlikely"
      - id: c
        text: "Schema enforcement rejects any output that deviates from the typed Pydantic model"
      - id: d
        text: "The privileged LLM consumes only the validated model produced by the quarantined tier"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The quarantined tier ingests the raw sandboxed document with zero tools, zero API keys and zero database permissions and its only job is to extract raw factual data into a validated Pydantic model, and the privileged tier consumes only that validated model, so an injected command inside the raw text ends up as a strongly typed string attribute that cannot override the system prompt. Schema enforcement rejects any output that deviates from the typed model, which blocks arbitrary injected keys. b is wrong because output filtering is done by classifying the completion with a guardrail model such as Llama Guard or NeMo Guardrails, not by changing the sampling temperature. Lesson section: The Multi-Layered Defense Architecture."
  - id: "0a6c9d31-4e87-4b52-9f13-7c8b2a05e6d4"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says raw pre-trained base models are often well calibrated, and that RLHF and instruction tuning destroy calibration by pushing confidence toward 1.0."
    answer: true
    explanation: "True. The Alignment Paradox in the chapter's calibration section states that raw pre-trained base models such as Llama-3-Base are frequently well calibrated, because their token probabilities accurately reflect frequency in the pre-training corpus, but RLHF and instruction tuning destroy calibration by pushing confidence scores toward 1.0 to make the assistant appear helpful and decisive. The consequence the chapter draws is that verbalised confidence from an aligned model is not evidence of parametric grounding, so claims should always be validated with external verification gates rather than trusted because the model sounded certain. Lesson section: Calibration & Expected Calibration Error (ECE)."
  - id: "8e5c3a06-9b47-4d81-a2f0-6c7e9d4b0518"
    revision: 1
    status: active
    type: free-recall
    prompt: "Compare batch prompting and prompt chaining as the lesson does, and say when each one is the right choice."
    sampleAnswer: "Batch prompting packs N independent queries into one prompt envelope so the system instruction and the few-shot exemplars are paid for once. With a 1,500-token instruction and 10 reviews of 30 tokens each, running the reviews individually costs 15,000 prompt tokens while the batch costs 1,800, an 88% reduction. The price is high per-request latency, all-or-nothing failure granularity because one bad item means re-running the whole batch, a high risk of context interference with the sentiment of one review bleeding into the assessment of the next, and the lost-in-the-middle effect on items in positions 4 through 8. Prompt chaining decomposes the workflow into a directed acyclic graph whose nodes are specialised model calls or deterministic computations and whose edges carry validated state, so a failure can be retried at the failing station alone, there is complete state isolation between items, arbitrary Python or SQL can run between nodes, and each stage can use a right-sized model, with an 8B extractor feeding a 70B evaluator and a concise model for the summary. Batching suits homogeneous independent classifications; chaining suits multi-stage document workflows."
    explanation: "A strong answer gives the token arithmetic and the 88% figure, names the failure-granularity and context-interference differences, and states the use case for each. An answer that only says chaining is more reliable has not covered the trade-off."
  - id: "b7194f62-0d35-4a98-8e27-3f6c0b8a2d95"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the lesson proposes to tell an epistemically fluent guess apart from a fact the model actually holds, and what it says about the limits of that method."
    sampleAnswer: "For a response of T tokens the lesson averages the model's own token log-probabilities into a mean confidence score, and because log-probabilities are non-positive, values near zero such as -0.05 indicate certainty while deeply negative values such as -3.50 indicate uncertainty; the sequence perplexity is that mean exponentiated with the sign flipped, so a perplexity near 1.1 means the model met no surprises on its path. The capital of France is Paris comes out with a mean log-probability of -0.0095 and a perplexity of 1.01, while the invented quantum resistor patent and the name Dr. A. Vanderbilt come out at -1.9778 and 7.23, and the tell is that the perplexity spikes on the key entity tokens, the name and the number. The limit is calibration: a base model is often well calibrated, but RLHF and instruction tuning destroy calibration by pushing confidence toward 1.0, so the measurement is only trustworthy on an unaligned model, and in production the chapter insists on external verification gates rather than trusting verbalised confidence."
    explanation: "A strong answer states the mean log-probability and perplexity relations, gives both worked numbers, identifies the entity-token spike as the signal, and states the calibration caveat with the alignment paradox. An answer that says only that low perplexity means confidence has not covered the method's limits."
```

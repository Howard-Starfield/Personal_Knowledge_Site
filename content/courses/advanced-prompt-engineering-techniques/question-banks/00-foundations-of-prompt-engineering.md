---
id: "dbd74c37-41a3-45e2-a948-b6f1f67f5318"
title: "Foundations of Prompt Engineering & In-Context Dynamics: Question Bank"
description: "Practice questions for the foundations lesson: next-token prediction, the subword tokenization blind spot, attention and the KV cache, reference prompting against parametric recall, the token budget, and lost-in-the-middle placement."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - prompt-engineering
  - study-guide
  - assessment
  - active-recall
courseId: "e0de2644-4dcb-45dc-930d-3584829d4a7d"
comments: false
---

These questions practise [[courses/advanced-prompt-engineering-techniques/lessons/00-foundations-of-prompt-engineering|Foundations of Prompt Engineering & In-Context Dynamics]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "de9a974e-d919-4f87-b943-aafd1a5a8e4c"
    revision: 1
    status: active
    type: single-choice
    prompt: "An engineer asks a model for the reverse of \"lollipop\" and the model replies \"pilollop\". Which architectural explanation does the lesson give for the root cause?"
    options:
      - id: a
        text: "The causal attention mask prevents the model from attending to any token that appeared earlier in the sequence of the prompt."
      - id: b
        text: "BPE splits the word into multi-character subwords, hiding character positions from attention."
      - id: c
        text: "The feed-forward layers lack the parameter depth needed to execute string concatenation."
      - id: d
        text: "The sampling temperature was set to 0.0, which suppresses creative letter reordering."
    correctOptionIds: [b]
    explanation: "Byte-Pair Encoding merges characters into subword tokens, and the lesson shows \"lollipop\" reaching the model as three atomic vector IDs, [\"lol\", \"lip\", \"op\"]. Attention weights and position encodings attach to tokens, not to the letters inside them, so the model is blind to internal character indices and can only reverse or scramble the subword tokens. The lesson's fix is to force the decomposition, first separating the word into hyphen-separated characters and then reversing them step by step. Temperature, feed-forward depth and the causal mask are not the cause, and the mask is designed to hide later tokens rather than earlier ones. Lesson section: The Tokenization Blind Spot: Why LLMs Cannot Spell \"Lollipop\" Backwards."
  - id: "ebcb0e90-45c8-4742-a9e2-876dd371af8b"
    revision: 1
    status: active
    type: single-choice
    prompt: "An application must quote contract IDs, dates and exact names from a source document without changing a character. Which strategy does the lesson recommend?"
    options:
      - id: a
        text: "Ask the model to repeat its reasoning three times and average the results for stability."
      - id: b
        text: "Lower the decoding temperature on the cluster that hosts the inference service."
      - id: c
        text: "Ask the model to spell every domain term backwards so that the deeper reasoning layers get activated instead."
      - id: d
        text: "Put the source material in the prompt as reference context and let the model extract from it."
    correctOptionIds: [d]
    explanation: "Reference prompting moves the facts out of the lossy weights and into the context window, where the model copies them out rather than regenerating them from memory. The lesson puts the hallucination rate on long-tail facts at 20% to 60% for parametric recall, against under 1% for reference prompting when it is constrained. Repeating reasoning, lowering the temperature and reversing the spelling of terms all leave the source of truth inside the model, so none of them grounds the answer. Lesson section: The Attention Concentration Effect: Reference Prompting."
  - id: "cb499a5f-ae61-4e15-bbd3-83aa597369fc"
    revision: 1
    status: active
    type: single-choice
    prompt: "In a chat pipeline, generating 50 output tokens takes about 1.0 second, but the time to first token takes over 8.0 seconds. What is the most likely cause?"
    options:
      - id: a
        text: "The prompt is too large, so the prefill pass has to process all of it first."
      - id: b
        text: "The max tokens limit for generation was set too low for the answer the user asked for."
      - id: c
        text: "The host is running out of disk space, so the writes to the KV cache during prefill are being throttled hard."
      - id: d
        text: "No temperature parameter was passed, so the sampler falls back to a slow default decoding path."
    correctOptionIds: [a]
    explanation: "Prefill evaluates every prompt token in parallel to build the Key and Value matrices for the KV cache, and that work has to finish before the first token can be decoded. A prompt carrying tens of thousands of un-pruned tokens therefore dominates the time to first token while inter-token latency stays low, which is the classic signature of context bloat. The generation limit, the disk space and the temperature parameter do not produce that split between a slow first token and a fast stream. Lesson section: The Three Costs of Context Window Inflation."
  - id: "0c60597e-0846-455d-9b6f-a27aedbd5c2d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson reports that retrieval accuracy across a long context is U-shaped. Where should a team put the schema constraints and the specific user query?"
    options:
      - id: a
        text: "In the exact centre of the reference text, so the constraints are surrounded by supporting context on every side."
      - id: b
        text: "In the middle of the prompt, because the model's attention is strongest where the document is densest."
      - id: c
        text: "At the top for the constraints and at the end for the query."
      - id: d
        text: "Scattered evenly through the prompt, so that no single region can dominate the attention budget."
    correctOptionIds: [c]
    explanation: "Liu et al. (Stanford, UC Berkeley) found that retrieval accuracy across long contexts is U-shaped: the model attends reliably to the beginning of the context and to the end of it, while the middle 30% to 70% suffers attention dispersion because softmax normalization spreads attention mass over everything it can see. That is why the lesson puts the schema and the guardrails at the top and the specific user query at the bottom, with the bulky reference material in between. Spreading the constraints around and burying them in the centre both land in the weakest region. Lesson section: The Three Costs of Context Window Inflation."
  - id: "abddac03-6722-47b9-92f8-5798fc36d251"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson gives the total token budget as a single equation. Which form is it?"
    options:
      - id: a
        text: "Tokens_total = T_system + T_reference + T_user + T_generation, at most C_window."
      - id: b
        text: "Tokens_total = T_system + T_reference + T_user, with the generation budget counted separately by the provider."
      - id: c
        text: "Tokens_total = T_prompt + T_output, with the prompt and the output weighted equally against the context window."
      - id: d
        text: "Tokens_total = T_reference + T_generation, because the system prompt and the user query are billed outside the context window."
    correctOptionIds: [a]
    explanation: "The budget adds what the system prompt costs, what the reference material costs, what the user query costs and what the answer is allowed to cost, and the total has to stay inside the context window of the model in use. The lesson lists 8,192 tokens for standard Llama-3, 128,000 for GPT-4o and 1,000,000 for Claude 3.5 Sonnet and Gemini 1.5 Pro. A budget that leaves out the generation, or one that treats the user query as free, does not match the formula the lesson works with. Lesson section: Mathematical Formulation of the Token Budget."
  - id: "cbad0dfc-ac50-487b-bafa-2cb270ae0310"
    revision: 1
    status: active
    type: single-choice
    prompt: "At $2.50 per million input tokens, a pipeline handles 100,000 queries a day with a 25,000-token prompt. What does that cost per day?"
    options:
      - id: a
        text: "$750 a day, because the input tokens of every query are billed at the output rate."
      - id: b
        text: "$6,250 a day, about $187,500 a month."
      - id: c
        text: "$250 a day, because only the first thousand tokens of a long prompt are billed."
      - id: d
        text: "$25,000 a day, because every one of the 100,000 queries also pays for a full generation."
    correctOptionIds: [b]
    explanation: "The lesson multiplies 100,000 queries by 25,000 input tokens at $2.50 per million tokens to reach $6,250 a day, or roughly $187,500 a month. Pruning the same prompt down to 3,000 tokens brings the bill to $750 a day and $22,500 a month, a net annual saving of $1.98 million. The figures in the wrong answers either confuse input pricing with output pricing, which the lesson puts at $10.00 per million, or ignore that every query is charged on its own. Lesson section: The Three Costs of Context Window Inflation."
  - id: "afcb7f63-0b6f-4de2-9bfd-fb7754cf8abc"
    revision: 1
    status: active
    type: single-choice
    prompt: "When reference prompting is used, what happens to the entropy of the next-token probability distribution?"
    options:
      - id: a
        text: "It rises, because the model now has more material to choose between and so spreads its probability mass further."
      - id: b
        text: "It stays exactly where it was, because the frozen weights keep producing the same distribution as before."
      - id: c
        text: "It drops, from roughly 4.8 nats to roughly 0.1 nats."
      - id: d
        text: "It becomes undefined, because the entropy of a distribution conditioned on reference text has never been computed before."
    correctOptionIds: [c]
    explanation: "The lesson reports that conditioning on reference text concentrates the attention: the conditional entropy of the next-token distribution falls from about 4.8 nats, where the model is guessing among philosophical jargon, to about 0.1 nats, where it is extracting a specific span. That collapse is what turns unbounded generation into deterministic extraction. Entropy does not rise, stay put or become undefined simply because the context carries facts. Lesson section: The Attention Concentration Effect: Reference Prompting."
  - id: "565394ba-11ec-4e67-8b42-cab69432b5b1"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson names three reasons zero-shot prompting fails on a capability-style task. Which three are they? Select every correct answer."
    options:
      - id: a
        text: "Lossy Compression of the factual corpus into the weights"
      - id: b
        text: "Long-Tail Smearing across weakly represented facts"
      - id: c
        text: "Plausibility Optimization toward a fluent, confident answer"
      - id: d
        text: "Attention dispersion in the centre of a long reference context"
    correctOptionIds: [a, b, c]
    explanation: "Lossy Compression, Long-Tail Smearing and Plausibility Optimization are the three failure modes the lesson lists for the zero-shot capability approach, where the model recites the cultural consensus instead of the framework. Attention dispersion belongs to a different section: it is the failure the reference prompting architecture is designed to cure, through reranking down to the top 3 to 5 most relevant chunks. Lesson section: The Limits of Parametric Recall: The Capability Approach Case Study."
  - id: "4195fe6d-fbb7-46cb-9ea5-dbe6568679a6"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the production rules for a long-context prompt does the lesson set out? Select every correct answer."
    options:
      - id: a
        text: "Put the schema and the guardrails at the top and the specific user query at the end"
      - id: b
        text: "Rerank the reference material down to the top 3 to 5 most relevant 500-token chunks"
      - id: c
        text: "Treat the system prompt as the security firewall for the application"
      - id: d
        text: "Enforce authorization, input sanitization and output schema validation in the application harness"
    correctOptionIds: [a, b, d]
    explanation: "The placement rule, the reranking rule and the application-harness rule all survive into production. The system prompt is the one the lesson rules out, calling that the System Prompt Overconfidence Fallacy: a long or adversarial user message can swamp system tokens through attention drift or prompt injection, so authorization, input sanitization and output schema validation have to be enforced deterministically outside the model. Lesson section: \"Most Missed Things\" Callouts."
  - id: "f3c624ab-9846-41ae-8f17-9b29f560edd7"
    revision: 1
    status: active
    type: true-false
    prompt: "A system prompt is a safe place to enforce authorization, because the model gives system tokens more attention weight than user tokens."
    answer: false
    explanation: "The lesson calls this the System Prompt Overconfidence Fallacy. Modern fine-tuned models do give system tokens more implicit attention weight, but a long or adversarial user message can still swamp them through attention drift or prompt injection attacks. Authorization, input sanitization and output schema validation therefore have to be enforced in the API application harness, never left to the prompt. Lesson section: \"Most Missed Things\" Callouts."
  - id: "e482c603-b8de-48cd-9592-2bad17003959"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why the model answers \"pilollop\" when asked for the reverse of \"lollipop\", and what a production system should do about it."
    sampleAnswer: "Byte-Pair Encoding merges characters into subword tokens, so \"lollipop\" reaches the model as [\"lol\", \"lip\", \"op\"] and the individual letters are never indexed on their own. Attention and position encodings attach to those tokens, so the model cannot count or reverse characters inside a token in a single forward pass. A production system therefore forces the decomposition, first separating the word into hyphen-separated characters and then reversing them step by step, and moves anything more exact than that into a Python tool."
    explanation: "A strong answer names the tokenizer as the cause, gives the subword split of the word, and says what to do instead: force character spacing, use a step-by-step scratchpad, or offload the work to code execution. An answer that only says the model is bad at spelling has not found the mechanism."
  - id: "fe3d494a-d7b0-4e6c-8755-2fc683ef9d7a"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the token budget mental model, and how a team would use it to cut cost without losing accuracy."
    sampleAnswer: "The lesson adds up what the system prompt, the reference material, the user query and the generation cost, and holds the total inside the context window of the model being used. Each part carries a bill and a delay: input tokens are priced per million, and the prefill pass that reads the prompt dominates the time to first token, so a bloated prompt costs money and patience before the answer even starts. A team prunes the reference material with semantic reranking down to the top 3 to 5 most relevant chunks, places the schema and the guardrails at the top and the query at the bottom, and keeps the total inside the window."
    explanation: "A strong answer gives the four terms of the budget, names the costs the lesson attaches to context inflation, and explains the pruning and placement rules that follow from them. An answer that only lists the four terms, without linking them to cost and latency, has missed the point of the model."
```

---
id: "53c07701-37de-49ed-810b-01e4f742d95f"
title: "AI and LLM Fundamentals Question Bank"
description: "Practice questions for AI and LLM Fundamentals."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

Practice questions on tokens, context windows, hallucination, sampling controls, and retrieval versus long context.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "afe0201f-fb8f-4b0a-af65-311d369584ff"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team estimates the API cost of a 1,000-word document by assuming one token per word. What is the most reliable correction?"
    options:
      - id: word-count
        text: "Keep the word count, because each token is one whole word"
      - id: model-tokenizer
        text: "Count tokens with the tokenizer of the model being used"
      - id: shared-tokenizer
        text: "Reuse one tokenizer for every model, since vocabularies match"
      - id: char-count
        text: "Count characters, because each character is one token"
    correctOptionIds: [model-tokenizer]
    explanation: "Tokens are usually word fragments, and each model family has its own tokenizer, so only the target model's tokenizer gives a trustworthy count. Counting words is tempting but ignores that one word often becomes several tokens."
  - id: "25d1685f-a1cc-4205-bc18-a49e38b06d39"
    revision: 1
    status: active
    type: true-false
    prompt: "A trained LLM stores a database of facts and looks the answer up when you ask a question."
    answer: false
    explanation: "A trained model is a set of numeric weights plus code that runs them. It produces a probability distribution over the next token and picks one, so a fact like a capital city is just a very probable continuation, not a retrieved row."
  - id: "084cf868-b813-4907-bfac-26cf5f0f5016"
    revision: 1
    status: active
    type: single-choice
    prompt: "A model has an 8,000-token context window. Your prompt is 7,800 tokens and you allow up to 500 output tokens. What is the problem?"
    options:
      - id: input-only
        text: "Nothing, because the window limits only the prompt size"
      - id: separate-budget
        text: "The window resets after input, so output has its own budget"
      - id: shared-window
        text: "Input and output share the window, so 8,300 tokens exceeds it"
      - id: first-tokens
        text: "Only the first 500 tokens of the prompt count toward the window"
    correctOptionIds: [shared-window]
    explanation: "The context window covers input plus output in one request. 7,800 plus 500 is 8,300, which is more than 8,000, so the output can be cut off or the request can fail. Treating the window as an input-only limit is the tempting mistake."
  - id: "e6f2b40a-05ca-4f39-a3ce-0d73b37d145e"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about the lost-in-the-middle finding are supported? Select every correct answer."
    options:
      - id: middle-weaker
        text: "Facts buried mid-context are used less reliably than facts near the start or end"
      - id: more-middle
        text: "A larger advertised window leaves more middle space where facts can be missed"
      - id: middle-strongest
        text: "Facts placed in the middle of a prompt are recalled more strongly than others"
      - id: million-fixes
        text: "The problem disappears once a window reaches one million tokens"
      - id: small-only
        text: "The effect appears only in models with fewer than ten billion parameters"
    correctOptionIds: [middle-weaker, more-middle]
    explanation: "Accuracy tends to fall for information in the middle of a long context compared with the start or end, and a bigger window simply has more middle. A huge window does not remove the effect, which is why advertised size is not the same as effective size."
  - id: "aafec49b-962a-4a62-baa5-620227b56375"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why do models often guess instead of saying they do not know, according to the evaluation-incentive explanation of hallucination?"
    options:
      - id: eval-rewards-guessing
        text: "Benchmarks score abstaining like a wrong answer, so guessing pays"
      - id: corrupted-lookup
        text: "Models keep a lookup table of facts that sometimes becomes corrupted"
      - id: low-temperature
        text: "A low temperature forces the model to invent text it has never seen"
      - id: tokenizer-drops
        text: "Tokenizers drop rare facts before the model ever reads the prompt"
    correctOptionIds: [eval-rewards-guessing]
    explanation: "When a benchmark gives the same zero for a wrong answer and for abstaining, a model that always guesses scores better, so training pressure favors confident guesses. A lookup table is the tempting picture, but models do not contain one."
  - id: "20fc1b28-f169-48cb-839f-67c29c759977"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why an LLM can answer confidently and still be wrong, and name one system-level fix."
    sampleAnswer: "The model produces the most probable continuation of the text, not a checked fact. For rare or absent facts it still picks a fluent token, and evaluations that reward guessing over abstaining push it to answer anyway. A system-level fix is to ground answers in retrieved sources, require citations, and allow the system to refuse when no evidence is found."
    explanation: "A strong answer covers both parts: next-token generation with no built-in fact check, and the incentive to guess. The fix belongs in the system around the model, not in telling it not to hallucinate."
  - id: "8627de1f-63a1-4075-ae03-83ca3768ca8a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which order describes the typical modern post-training stack presented in this lesson?"
    options:
      - id: pref-sft-rlvr
        text: "Preference optimization, then supervised fine-tuning, then RL with verifiable rewards"
      - id: rlvr-sft-pref
        text: "RL with verifiable rewards, then supervised fine-tuning, then preference optimization"
      - id: sft-rlvr-pref
        text: "Supervised fine-tuning, then RL with verifiable rewards, then preference optimization"
      - id: sft-pref-rlvr
        text: "Supervised fine-tuning, then preference optimization, then RL with verifiable rewards"
    correctOptionIds: [sft-pref-rlvr]
    explanation: "A base model first learns from example prompt and response pairs, then from preferences between responses, then from programmatically checkable rewards on math, code, and reasoning. Swapping the last two is tempting because both involve reinforcement-style signals."
  - id: "8f68a6c6-df31-4769-a713-8f5b05d33f8a"
    revision: 2
    status: active
    type: single-choice
    prompt: "You are building a tool that extracts invoice fields into a fixed format. Which sampling setup fits best?"
    options:
      - id: high-temp
        text: "High temperature, such as 1.2, so the extractor explores options"
      - id: max-temp-no-limit
        text: "Maximum temperature with no output limit, to cover rare field names"
      - id: low-temp-limit
        text: "Low temperature, such as 0, with an explicit max token limit"
    correctOptionIds: [low-temp-limit]
    explanation: "Extraction wants predictable output, so a low temperature suits it, and an explicit output limit prevents runaway, costly responses. Higher temperature adds randomness, which helps brainstorming but hurts fixed-format extraction. Some newest models, such as recent Claude versions, reject non-default temperature, so there you rely on prompting and schema validation instead."
  - id: "ce93d27e-3546-4bc1-87ce-0eee3cc2af66"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about sampling controls are correct? Select every correct answer."
    options:
      - id: temp-rescales
        text: "Temperature rescales the whole next-token probability distribution before a token is picked"
      - id: top-p-set
        text: "Top-p keeps the smallest set of tokens whose cumulative probability reaches p"
      - id: top-k-percent
        text: "Top-k keeps every token whose probability is above k percent"
      - id: freq-rewards
        text: "Frequency penalty rewards tokens that have already appeared in the output"
      - id: low-temp-smarter
        text: "A lower temperature makes the model more knowledgeable and factual"
    correctOptionIds: [temp-rescales, top-p-set]
    explanation: "Temperature reshapes the distribution and top-p truncates it by cumulative probability. Top-k keeps a fixed number of candidates, not a percentage, and a frequency penalty discourages repeats. Lower temperature only makes output more predictable, not more knowledgeable."
  - id: "c7c39e53-0ddb-48e2-89c5-bb53784e9ee6"
    revision: 1
    status: active
    type: true-false
    prompt: "On a hosted API, temperature 0 with a fixed seed can still produce slightly different outputs across runs."
    answer: true
    explanation: "Floating-point math, batching, and silent backend updates mean hosted APIs are not bit-for-bit deterministic. A seed gives best-effort reproducibility, so log the model version or system fingerprint and do not treat it as a guarantee."
  - id: "1fe4db8e-03c3-4bf0-801c-d964142d9cc8"
    revision: 1
    status: active
    type: single-choice
    prompt: "In your RAG app a teammate says, \"I raised top-k from 5 to 10 and answers improved.\" What should you ask first?"
    options:
      - id: window-size
        text: "Did the context window grow, since top-k sets the window size?"
      - id: which-layer
        text: "Was it the retriever chunk count or the sampler candidate tokens?"
      - id: sampler-chunks
        text: "Was it the sampler's top-k, which controls how many chunks are retrieved?"
      - id: same-as-top-p
        text: "Was top-p also changed, since top-k and top-p are the same setting?"
    correctOptionIds: [which-layer]
    explanation: "The same name covers two layers: retrieval top-k is how many document chunks go into the prompt, and sampling top-k is how many candidate next tokens the model may choose from. Assuming the sampler controls chunks is the tempting conflation."
  - id: "fbd1150a-3e45-4322-97bf-7304c33602d4"
    revision: 1
    status: active
    type: free-recall
    prompt: "In one minute, explain to a business owner why we use retrieval (RAG) instead of pasting all company files into a giant context window."
    sampleAnswer: "A real company corpus is usually larger than any window, and long prompts cost more and respond more slowly on every message. Facts buried in the middle of a long prompt are used less reliably, so you can pay more for worse answers. Retrieval lets you filter documents by permission, pull only the few relevant chunks, and cite which source each claim came from."
    explanation: "Good answers cover size, cost or latency, the middle-of-context weakness, and the permission and citation advantages of retrieving a few chunks."
```

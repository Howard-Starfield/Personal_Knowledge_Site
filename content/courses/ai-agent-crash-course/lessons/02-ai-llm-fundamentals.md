---
id: "0d1178a0-12f7-44c6-bf44-5cf98301e4aa"
title: "AI and LLM Fundamentals"
description: "Learn what a language model actually does at inference time, and how tokens, context windows, hallucination, and sampling settings shape every AI product you build."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
  - llm
  - fundamentals
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 2
estimatedMinutes: 55
---

## Why this matters

If you treat a language model as a black box that "knows things," every failure looks like a mystery: a chatbot that invents a citation, an agent that wanders, a bill that doubles overnight. A model does not look facts up the way a database does. It generates likely next tokens, and almost every later problem in this course traces back to that one fact. A business owner who says "the bot lies sometimes" needs you to turn that sentence into a fixable engineering problem: grounding, sampling settings, limits, and evaluation.

## What you'll be able to do

- Explain what a token is and why you must count tokens, not words, for cost and context limits.
- Calculate whether a prompt plus its output budget fits inside a context window.
- Diagnose why a model can sound confident and still be wrong, and name a system-level fix.
- Decide which temperature and output-limit settings fit a given task.
- Distinguish sampling top-k from retrieval top-k, and argue for retrieval over a giant prompt.

## Before you start

Recall these from the previous lesson before reading on: [[courses/ai-agent-crash-course/lessons/01-ai-learning-os|Previous lesson]].

- How do you plan to practice and review what you learn in this course?
- What is the difference between recognizing an answer and recalling it from memory?

## Step 1 — A model is a next-token machine

**Plain language.** A trained LLM is a very large numeric function: a file of weights (its parameters) plus code that runs them. There is no table of facts inside. You send text in, it is chopped into tokens, the model computes a probability for every possible next token, one token is picked, added to the text, and the loop repeats.

**Analogy.** Picture the most confident autocomplete you have ever seen. Given "The capital of France is," it looks nothing up. Almost every document it was trained on continued with " Paris," so that continuation is overwhelmingly probable.

**Precise rule.** A **token** is the unit of text a tokenizer produces, usually a word fragment. Pricing, context length, and output length are all measured in tokens. Different model families use different tokenizers, so the same text gives different counts. For example, OpenAI's GPT-4o family is tokenized with the `o200k_base` encoding via the `tiktoken` library, while open-weight models such as Llama or Qwen are loaded through the Hugging Face `AutoTokenizer`. Claude has no offline tokenizer in this course's materials; you count with Anthropic's `messages.count_tokens` API endpoint, which is free to call. Claude Opus 4.7 and later use a newer tokenizer that produces roughly 30 percent more tokens for the same text than earlier Claude models, so recount against the model you will call.

**Worked example.** A tokenizer might split `Tokenization is weird.` into pieces like "Token", "ization", " is", " weird", and "." That is about five tokens for three words plus a period. The exact split depends on the tokenizer, so treat this as an illustration, not a measured result. Note that a leading space can be part of a token.

> [!warning] Common mistake
> Estimating cost or context fit by counting words. Count tokens with the tokenizer of the model you will actually call.

## Step 2 — Parameters and the context window

**Plain language.** "Size" labels such as 8B or 70B mean 8 billion or 70 billion trainable weights. More parameters generally means more capacity, but also more memory and latency. The **context window** is the total number of tokens the model can handle in one request, input and output combined.

**Analogy.** The context window is the model's desk. You can spread out many pages, but the model reads the pages near its hands better than the ones at the back.

**Precise rule.** Memory for weights is roughly parameters times bytes per parameter. Advertised windows can be very large, but the **effective window**, where the model still uses information reliably, is usually smaller. The "lost in the middle" finding (Liu et al., 2023) reports that information buried in the middle of a long context is used less reliably than information near the start or end.

**Worked example.**

- Memory: 70 billion parameters at 16-bit precision is 2 bytes each, so 70 billion times 2 bytes is about 140 GB of weights. At 4-bit, each weight needs half a byte, which is about 35 GB before overhead. This is why a 7B model can run on a laptop and a 70B model needs serious hardware.
- Budget: with an 8,000-token window, a 7,800-token prompt leaves only 200 tokens for output. Asking for 500 output tokens needs 8,300 tokens in total, which does not fit.

> [!warning] Common mistake
> Treating the window as an input-only limit. Input and output share one budget, and a bigger advertised window is not proof that every token in it is used well.

```knowledge-quiz
schemaVersion: 1
quizId: "22a08b6f-d82e-4eeb-a471-b11c3b64b64e"
title: "Checkpoint: tokens and context"
questionBankId: "53c07701-37de-49ed-810b-01e4f742d95f"
questionIds:
  - "afe0201f-fb8f-4b0a-af65-311d369584ff"
  - "084cf868-b813-4907-bfac-26cf5f0f5016"
```

## Step 3 — How a base model becomes an assistant, and why it hallucinates

**Plain language.** **Pretraining** teaches a base model to predict the next token across a huge amount of text. The result completes text but is not yet a polite, instruction-following assistant. **Post-training** turns it into one.

**Analogy.** Pretraining is reading a giant library. Post-training is the coaching that teaches the reader how to answer a question helpfully.

**Precise rule.** The course presents a typical modern post-training stack in three stages:

1. Supervised fine-tuning (SFT) on many good prompt and response pairs.
2. Preference optimization, which teaches the model which of two responses people prefer. Methods named in the chapter include RLHF, DPO, and RLAIF.
3. Reinforcement learning with verifiable rewards (RLVR) for math, code, and reasoning, where correctness can be checked by a program.

A **hallucination** is plausible but false output. The chapter anchors its explanation in OpenAI's September 2025 paper "Why Language Models Hallucinate" (arXiv 2509.04664): pretraining mostly sees what is said, so rare facts are hard to get right, and common evaluations score "I don't know" the same as a wrong answer, which rewards guessing.

**Worked example.** Ask for the birthday of a little-known person. For a well-attested fact the right continuation is very probable. For a rare one the probabilities are flat, yet the sampler still picks a token and the sentence reads just as fluently. You can get three different confident dates in three runs, all unsupported.

> [!warning] Common mistake
> Trying to fix hallucination by telling the model "do not hallucinate." The durable fix is system-level: ground answers in retrieved sources, require citations, and let the system refuse when it has no evidence.

## Step 4 — Sampling controls

**Plain language.** After the model produces probabilities for the next token, sampling settings decide which token is chosen.

**Analogy.** Temperature is like the dial on a coffee grinder: a fine, predictable grind at one end and a coarse, chaotic one at the other.

**Precise rule.**

- **Temperature** rescales the distribution. Zero picks the most probable token; higher values flatten the distribution and add randomness. OpenAI documents a 0 to 2 range for its Chat Completions API, but its reasoning models reject temperature and top-p when reasoning effort is on. Anthropic documented a 0 to 1 range, but its newest models (Claude Opus 4.7 and later, and Sonnet 5.5) return an error for any non-default temperature, top-p, or top-k, so you steer them with prompting instead.
- **Top-p (nucleus sampling)** samples only from the smallest set of tokens whose cumulative probability reaches p.
- **Top-k (sampling)** samples only from the k most likely tokens. OpenAI's API does not expose it. Ollama does, and older Claude models accept it, but the newest Claude models reject non-default values.
- **Seed** gives best-effort reproducibility, not a guarantee.
- **Max tokens** caps output. Set it explicitly so a runaway response cannot run up your bill.
- **Frequency and presence penalties** push against repetition.

Where a model does accept these settings, OpenAI's guidance is to change temperature or top-p, not both. Provider rules change by model, so check current documentation for the exact model you call.

**Worked example.** For a tool that extracts invoice fields, use temperature 0 and an explicit max token limit, then validate the output. For a tagline brainstorm, try a higher temperature and generate several options. Even at temperature 0, hosted APIs can differ slightly between runs because of floating-point math, batching, and backend updates, so log the model version with every call.

> [!warning] Common mistake
> Treating temperature as a "smartness" dial. It controls randomness, not knowledge. A lower setting is more predictable, not more correct.

```knowledge-quiz
schemaVersion: 1
quizId: "42476268-5c0b-449d-bdce-083a49b06152"
title: "Checkpoint: hallucination and sampling"
questionBankId: "53c07701-37de-49ed-810b-01e4f742d95f"
questionIds:
  - "aafec49b-962a-4a62-baa5-620227b56375"
  - "8f68a6c6-df31-4769-a713-8f5b05d33f8a"
```

## Step 5 — Two kinds of top-k, and why bigger context is not better retrieval

**Plain language.** The word "top-k" names two unrelated settings. **Sampling top-k** lives inside the model and limits which candidate tokens can be picked. **Retrieval top-k** lives in your RAG pipeline and sets how many document chunks are fetched and placed into the prompt.

**Analogy.** One is about which words the model may choose from. The other is about which pages an assistant slides onto the desk before the model starts.

**Precise rule.** When someone says "top-k," first ask which layer they mean. Then compare two designs for answering questions over a company's files: paste everything into the prompt, or retrieve a few relevant chunks. The chapter gives these reasons retrieval usually wins: the corpus may not fit any window, long prompts cost more and add latency, mid-context information is used less reliably, retrieval lets you filter by who may see which document, and retrieved chunks can be cited.

**Worked example.** Suppose each chunk is 400 tokens. Retrieving 5 chunks adds 5 times 400, which is 2,000 tokens, instead of resending a corpus that could be hundreds of thousands of tokens on every message. You also know which file each chunk came from.

> [!warning] Common mistake
> Tuning "top-k" without saying which layer. Changing retrieval top-k changes what evidence the model sees; changing sampling top-k changes how it picks words.

```knowledge-quiz
schemaVersion: 1
quizId: "4f60dbb5-4432-4925-b5ea-816067717047"
title: "Checkpoint: top-k and long context"
questionBankId: "53c07701-37de-49ed-810b-01e4f742d95f"
questionIds:
  - "1fe4db8e-03c3-4bf0-801c-d964142d9cc8"
  - "e6f2b40a-05ca-4f39-a3ce-0d73b37d145e"
```

## Try it

Run a short tokenizer experiment, then do the budget arithmetic.

1. Install `tiktoken` and count tokens for the sentence below using the `o200k_base` encoding. Compare the token count to the word count.
2. A model has a 16,000-token window. Your prompt is 15,200 tokens. What is the largest output limit you can set?
3. You retrieve 6 chunks of 350 tokens each plus a 150-token question and instructions. How many input tokens is that?

```python
import tiktoken

sentence = "Tokenization is weird because unbelievable splits into pieces."
enc = tiktoken.get_encoding("o200k_base")
ids = enc.encode(sentence)
print(len(sentence.split()), "words,", len(ids), "tokens")
for token_id in ids:
    print(token_id, repr(enc.decode([token_id])))
```

> [!example]- Sample solution
> 1. The sentence has 8 words. You should see more than 8 tokens, because words such as "Tokenization" and "unbelievable" split into several pieces and a leading space belongs to the token that follows it. The exact number depends on the installed encoding, so report what your run prints rather than a remembered number.
> 2. The window is shared: 16,000 minus 15,200 leaves 800 tokens, so the output limit can be at most 800.
> 3. 6 times 350 is 2,100, plus 150 is 2,250 input tokens.

## Key takeaways

- An LLM generates probable next tokens; it does not look facts up in a stored database.
- Count tokens, not words, with the tokenizer of the model you actually call.
- The context window is one shared budget for input and output, and the effective window can be smaller than the advertised one.
- Hallucination is a predictable result of next-token generation and evaluations that reward guessing; the fix is grounding, citations, and the option to refuse.
- Temperature controls randomness, not knowledge; set an explicit max token limit and log the model version.
- Sampling top-k and retrieval top-k are different layers; retrieving a few cited chunks usually beats pasting everything into the prompt.

## Explain it back

In one minute, explain to a business owner why we use retrieval (RAG) instead of pasting all company files into a giant context window.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "a5eae9ed-8af9-4fe0-a887-0e1c008be599"
title: "Chapter quiz: AI and LLM fundamentals"
questionBankId: "53c07701-37de-49ed-810b-01e4f742d95f"
questionIds:
  - "25d1685f-a1cc-4205-bc18-a49e38b06d39"
  - "8627de1f-63a1-4075-ae03-83ca3768ca8a"
  - "ce93d27e-3546-4bc1-87ce-0eee3cc2af66"
  - "c7c39e53-0ddb-48e2-89c5-bb53784e9ee6"
  - "20fc1b28-f169-48cb-839f-67c29c759977"
  - "fbd1150a-3e45-4322-97bf-7304c33602d4"
```

Next: [[courses/ai-agent-crash-course/lessons/03-prompting-structured-evals|Next lesson]]

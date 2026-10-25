---
id: "7bed80dd-d22a-43e2-be6b-a2673142eee5"
title: "Chain-of-Thought (CoT), Step-by-Step Optimization & OPRO: Question Bank"
description: "Practice questions for the Chain-of-Thought lesson: the constant compute bottleneck, scratchpad compute, the CoT lineage, OPRO and its GSM8K champion, self-consistency voting, the KV cache as a symbolic state machine, and the production pitfalls."
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

These questions practise [[courses/advanced-prompt-engineering-techniques/lessons/02-chain-of-thought-and-step-by-step|Chain-of-Thought (CoT), Step-by-Step Optimization & OPRO]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "0db2f036-1517-4ada-8521-7c97da1e4bee"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why can a Transformer decoder fail on a multi-step problem in a single forward pass when the algorithm needs more sequential steps than the model has layers?"
    options:
      - id: a
        text: "Because the context window is smaller than the number of digits in the problem, so the input has to be truncated."
      - id: b
        text: "Because each layer computes only a bounded depth of logic, so a task whose depth D exceeds L cannot be solved in one pass."
      - id: c
        text: "Because the softmax normalisation over the vocabulary flattens the output distribution until the highest token barely leads."
      - id: d
        text: "Because the KV cache only stores the final answer and discards the intermediate tokens as they are produced."
    correctOptionIds: [b]
    explanation: "The lesson derives the limit from the compute budget: a token costs about 2N FLOPs whatever the token happens to be, and each layer can compute only a bounded depth of logic, so a task needing D sequential steps with D greater than L is impossible in a single pass. That is why constant-depth transformers without intermediate tokens are held inside TC^0 and cannot even do graph connectivity or arbitrary-length multiplication. The context window, the softmax and the KV cache are not what rules the problem out. Lesson section: The Constant Compute Bottleneck."
  - id: "3a9e86e4-4f23-4e30-9289-55a8de9f208d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The model writes 200 tokens of reasoning before emitting the final number. How does the lesson account for the extra compute?"
    options:
      - id: a
        text: "The extra tokens are free, because the prompt tokens are already cached and each reasoning token costs almost nothing."
      - id: b
        text: "The reasoning tokens are billed as input tokens, because they are written into the context window."
      - id: c
        text: "The compute is unchanged, because the model still executes exactly one forward pass per generated token."
      - id: d
        text: "Each reasoning token is a successive forward pass, so the total is T_reasoning times 2N FLOPs."
    correctOptionIds: [d]
    explanation: "Generating the scratchpad changes the computational graph rather than the cost of a token. A token still costs about 2N FLOPs, but 200 reasoning tokens mean 200 successive forward passes and so 200 times 2N FLOPs of total capacity, with every intermediate token acting as an externalised register in working memory. The wrong answers either treat the reasoning as free, bill it at the wrong rate, or leave the graph unchanged. Lesson section: The Constant Compute Bottleneck."
  - id: "fa355d46-0ce9-4547-a426-11ed7b7efe10"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did Wei et al. find about Chain-of-Thought as the models grow?"
    options:
      - id: a
        text: "It is an emergent ability, appearing only in the largest models and absent below roughly 10B parameters."
      - id: b
        text: "It helps every model size equally, because the reasoning tokens add compute that small models can already use."
      - id: c
        text: "It hurts the smallest models, and the benefit then grows smoothly and linearly with the parameter count."
      - id: d
        text: "It is available only in fine-tuned models, since the instruction to think step by step has to be taught first."
    correctOptionIds: [a]
    explanation: "Wei et al. found Chain-of-Thought to be an emergent ability on benchmarks such as GSM8K and SVAMP. Models under roughly 10B parameters did not benefit and often produced disfluent, circular chains that degraded performance, while models of 100B parameters and above, such as PaLM 540B and GPT-3 175B, jumped from about 18% accuracy on direct prompting to over 57% with Few-Shot CoT. The benefit is a phase change at scale, not a smooth trend from the first checkpoint, and it does not need fine-tuning. Lesson section: Manual Few-Shot CoT (Wei et al., 2022)."
  - id: "5fd72dc6-472c-47fc-a072-d27a3c6a2151"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which instruction did DeepMind's OPRO discover for GSM8K, and what did it score?"
    options:
      - id: a
        text: "\"Let's think step by step.\", scoring 71.8% and outperforming the human-engineered phrases."
      - id: b
        text: "\"Let's work through this step-by-step to make sure we get the right answer.\", scoring 74.4%."
      - id: c
        text: "\"Take a deep breath and work on this problem step by step.\", scoring 80.2%."
      - id: d
        text: "\"Let's solve this problem by splitting it into smaller sub-tasks.\", scoring 76.2%."
    correctOptionIds: [c]
    explanation: "Running OPRO on GSM8K with PaLM 2-L, the optimiser tested hundreds of candidates over dozens of iterations and produced the champion \"Take a deep breath and work on this problem step by step.\" at 80.2% accuracy, 8.4 points above Kojima's phrase at 71.8% and 26.2 points above the direct zero-shot baseline at 54.0%. The other phrases in the list are genuine entries in the table, but they belong to Kojima and to human engineers and none of them reached 80.2%. Lesson section: The Emergent Champion on GSM8K."
  - id: "2dba42f7-79c2-440c-a945-bf8313c17677"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does self-consistency decoding turn a reasoning problem into a vote?"
    options:
      - id: a
        text: "It samples N reasoning paths at a non-zero temperature and takes the plurality of their final answers."
      - id: b
        text: "It runs greedy decoding repeatedly and keeps the first answer that parses as a valid number."
      - id: c
        text: "It compares the length of each reasoning chain and keeps the longest one, on the grounds that more tokens mean more thought."
      - id: d
        text: "It asks the model to verify its own answer several times and counts how many of those verifications pass."
    correctOptionIds: [a]
    explanation: "Wang et al. sample N independent trajectories at a temperature typically between 0.5 and 0.7 with top-p sampling between 0.9 and 0.95, extract the canonical final answer from each, and take the plurality vote. The correct paths converge on the same mathematical attractor while the erroneous ones diverge into different numbers, so the vote settles on the right answer; the lesson puts the gain at 5% to 15% over greedy CoT on challenging reasoning benchmarks. Taking the first parseable answer, the longest chain and the model's own self-verification are not the mechanism. Lesson section: Self-Consistency Decoding (Wang et al., 2022)."
  - id: "8672af9b-da2a-4ee6-bfcd-e7a27a8c40a9"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked conversion the model writes \"Convert 4 feet to 48 inches\" and then answers. Why does it get the conversion right?"
    options:
      - id: a
        text: "Because the conversion was stored in the fine-tuned weights during pretraining, so it can be recalled without recomputation."
      - id: b
        text: "Because the value 48 sits in the KV cache, and the final query attends to it directly."
      - id: c
        text: "Because the conversion happened in the feed-forward layers, which store intermediate results between tokens."
      - id: d
        text: "Because the attention heads recompute every earlier token from scratch at the final step, so nothing can be lost."
    correctOptionIds: [b]
    explanation: "Each generated token writes its Key and Value vectors into the KV cache, so the intermediate state \"48\" physically exists there as a key-value vector. When the model reaches \"Therefore, the answer is\", its final query attends over the whole accumulated cache and can read that state directly, which turns the final prediction into a lookup or a copy from the scratchpad history rather than a retrieval from the frozen weights. The wrong answers either put the intermediate state in the weights, in the feed-forward layers, or assume the cache is discarded and recomputed. Lesson section: The KV Cache as an Accumulating Symbolic State Machine."
  - id: "3399ed31-be9f-4d36-8bf0-b1991823805d"
    revision: 1
    status: active
    type: single-choice
    prompt: "A production team parses the model's final token to get the answer. What does the lesson say is wrong with that, and what does it recommend?"
    options:
      - id: a
        text: "The final token is always the answer, so the team should raise the temperature to make the right number more likely at the end."
      - id: b
        text: "The model stops too early, so the team should raise the max tokens limit for the generation and let it run longer."
      - id: c
        text: "The model ends in prose, so use two stages: reason freely, then extract with a strict schema."
      - id: d
        text: "The reasoning tokens are removed before the answer is emitted, so the team should disable the scratchpad entirely."
    correctOptionIds: [c]
    explanation: "With \"Let's think step by step\" the model terminates in unpredictable conversational prose, so a simple regex that grabs the last number can easily grab the wrong one. The lesson's fix is Two-Stage Extraction: let the model reason freely in Stage 1, then feed that reasoning into Stage 2 with a strict JSON schema or a Pydantic validator. Raising the temperature, raising the token limit and switching the scratchpad off all leave the same defect in place. Lesson section: The Final-Answer Extraction Vulnerability."
  - id: "8993a28b-cb68-46aa-8ad6-895c4a8e3535"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which entries belong to the Chain-of-Thought lineage the lesson lays out? Select every correct answer."
    options:
      - id: a
        text: "Kojima et al. (2022), Zero-Shot CoT with \"Let's think step by step\""
      - id: b
        text: "Zhou et al. (2022), Least-to-Most decomposition into sub-problems"
      - id: c
        text: "Wei et al. (2022), Few-Shot Chain-of-Thought"
      - id: d
        text: "Zhao et al. (2021), Contextual Calibration for a few-shot classifier"
    correctOptionIds: [a, b, c]
    explanation: "The lineage runs from Wei et al. on Few-Shot CoT, through Kojima et al. on Zero-Shot CoT, to Zhou et al. on Least-to-Most decomposition, and then on to DeepMind's OPRO. Contextual Calibration belongs to the previous chapter, where it corrects the label bias of a few-shot classifier rather than a reasoning chain. Lesson section: The Evolution of Chain-of-Thought (CoT)."
  - id: "945d24e1-3529-4b68-bf46-3c0f39dd8f76"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which production pitfalls does the lesson warn about when Chain-of-Thought is deployed? Select every correct answer."
    options:
      - id: a
        text: "Hallucinatory calculation cascading, where an early error becomes immutable context"
      - id: b
        text: "The token budget explosion and the latency tax of a long reasoning chain"
      - id: c
        text: "The CoT illusion, where reasoning a simple classification task actually degrades accuracy"
      - id: d
        text: "The loss of the system prompt's place in the attention order"
    correctOptionIds: [a, b, c]
    explanation: "The lesson's three warnings are the cascading trap, in which a wrong line becomes immutable history that every later token conditions on; the token budget explosion, where 250 reasoning tokens raise the marginal cost of a query by over 10,000% and add over six seconds of waiting at 40 tokens per second; and the CoT illusion, where forcing step-by-step reasoning on sentiment analysis or language detection degrades accuracy through overthinking. The position of the system prompt is a separate topic from the reasoning chain. Lesson section: \"Most Missed Things\" & Production Pitfalls."
  - id: "7d09142c-dd70-4a2f-8e87-f945a7244eea"
    revision: 1
    status: active
    type: true-false
    prompt: "Chain-of-Thought raises the logical depth of an answer, but it also creates single points of failure along the reasoning chain."
    answer: true
    explanation: "The lesson says exactly this in the cascading trap: intermediate tokens become immutable history in the autoregressive context window, so a minor error such as stating that 4 feet equals 40 inches makes every later token condition on the false premise, and the model then executes flawless logic on top of it. Chain-of-Thought increases logical depth and adds failure points at the same time. Lesson section: The Hallucinatory Calculation Cascading Trap."
  - id: "973782e7-d342-4e2a-9873-d3b6ccc04557"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what OPRO does, and why the instruction it found beat the human-written ones on GSM8K."
    sampleAnswer: "OPRO treats the LLM as the optimiser over the space of natural language instructions. Because language is discrete, backpropagation cannot update a prompt, so the optimiser model is instead fed a meta-prompt holding the optimisation trajectory of previously tried prompts with their validation scores, the inputs where earlier candidates failed, and a directive to beat the best score so far. On GSM8K with PaLM 2-L it tested hundreds of candidates over dozens of iterations and produced \"Take a deep breath and work on this problem step by step.\" at 80.2%, against 71.8% for Kojima's phrase, 74.4% and 76.2% for human-written phrases, and 54.0% for direct zero-shot."
    explanation: "A strong answer says that the model is used as the optimiser, names the three parts of the meta-prompt, and gives the champion with its score against the baseline and the human phrases. An answer that only says OPRO searches for better prompts has missed the mechanism, and one that quotes a score the lesson does not record has invented it."
  - id: "e5d7841a-ca50-46c1-9efd-567e9a2d2f02"
    revision: 1
    status: active
    type: free-recall
    prompt: "A team wants to apply Chain-of-Thought to every request. What would the lesson tell them to change, and what would it tell them to leave alone?"
    sampleAnswer: "The lesson would reserve Chain-of-Thought for multi-step algorithmic derivation and keep direct zero-shot or calibrated few-shot for simple classification, because forcing step-by-step reasoning on sentiment analysis, language detection or PII redaction degrades accuracy through overthinking. It would also budget the tokens and the latency, because 250 reasoning tokens raise the marginal cost of a query by over 10,000% and add over six seconds of waiting at 40 tokens per second, so streaming or an asynchronous queue is needed in a synchronous application. Finally it would add Two-Stage Extraction, letting the model reason freely and then reading the answer out with a strict JSON schema or a Pydantic validator."
    explanation: "A strong answer separates the tasks that deserve a scratchpad from the ones that do not, quotes the cost and latency figures, and names the two-stage extraction pattern. An answer that recommends Chain-of-Thought everywhere, or that leaves the final-answer parsing to a regex, has missed both halves of the lesson's production discipline."
```

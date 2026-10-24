---
id: "d7f53787-14f2-4b7f-8bd9-7ee6f88fa2ef"
title: "Choosing Prompting, RAG, or Fine-Tuning"
description: "Learn the customization ladder so you can pick the cheapest fix that works before reaching for fine-tuning."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 9
estimatedMinutes: 45
---

## Why this matters

"Fine-tune it" sounds like the serious answer to every AI problem: wrong answers, odd tone, a need for privacy. Acting on that instinct can burn weeks and a large cloud bill and still leave you with a system worse than the one you started with. Most "we need a fine-tune" requests turn out to be prompt bugs, retrieval bugs, schema bugs, or missing tests. Knowing which rung of the ladder your problem lives on saves money, time, and credibility with clients and vendors.

## What you'll be able to do

- Explain the customization ladder and why an eval set gates every climb.
- Decide whether a symptom is a knowledge problem (retrieval) or a behavior problem (fine-tuning).
- Describe how LoRA and QLoRA make fine-tuning affordable.
- Choose between SFT, DPO, GRPO or RFT, and distillation for a described situation.
- Diagnose reward hacking from the symptoms and name fixes.

## Before you start

Recall these ideas before reading on:

- What does a RAG pipeline add to a model that a prompt alone cannot?
- Why did Chapter 2 force outputs into a strict schema rather than hoping for good formatting?
- Which guardrails from the previous lesson would you want around any model you customize?

If you need a refresher on safety, revisit [[courses/ai-agent-crash-course/lessons/08-guardrails-mcp-safety|Previous lesson]].

## Step 1 — Climb the ladder, one rung at a time

Think of customizing a model like fixing a slow car. You check the tires before you rebuild the engine. Each rung of the ladder is cheaper, faster, and lower-risk than the one above it, so you only climb when the rung below has clearly failed.

The ladder, from cheapest to most expensive:

1. Better prompt, including one to three few-shot examples.
2. Structured output with a schema (a Pydantic model, as in Chapter 2).
3. Better retrieval (RAG).
4. Better evals plus few-shot examples mined from real failures.
5. Supervised fine-tuning (SFT).
6. Preference tuning (DPO) or reinforcement-style tuning (RL, RFT).
7. Training or hosting a custom base model.

The rule is that you climb only when the rung below has failed **measured against an eval set**, meaning a held-out set of roughly 30 to 100 questions with ideal answers. "I think it is not working" is not a reason to climb. Worked example: "Our 50-question eval set scored 62% on faithfulness, and we already tried three prompt variants and a reranker" is a valid reason, because it is measured and shows lower rungs were tried.

Evals come before training because without a baseline you cannot tell whether a change helped. The workflow is: write the eval set, score the unmodified system, change one rung, re-score, and ship only if the score moved.

> [!warning] Common mistake
> Treating "the answers feel off" as enough evidence to start training. Without a held-out eval set you cannot prove a fine-tune helped, so write and score the evals first.

## Step 2 — Retrieval supplies facts, fine-tuning changes behavior

Picture a smart new hire. A prompt is the instructions you give them. RAG is a binder of policies they look things up in. Fine-tuning is a short training course that changes their habits. If a policy changes, you swap a page in the binder; you do not retrain the employee. Mixing these up gives you a confident liar.

The rule: **fine-tuning changes behavior; RAG supplies facts.** If the bot does not know your refund policy, that is a knowledge problem, and retrieval with citations is the right tool, because documents are editable, auditable, and reversible while trained weights are none of those. If the bot knows the policy but answers in the wrong tone, format, or shape, that is a behavior problem and fine-tuning can help.

Supervised fine-tuning (SFT) trains on labeled pairs of an input and its ideal output. It is justified when all of these hold:

1. The failure is about how the model responds, not what it knows.
2. You have or can produce hundreds of consistent, high-quality examples. Quality beats quantity: 200 hand-curated examples beat 2,000 noisy ones.
3. You have an eval set the examples were not drawn from.
4. The task is stable enough that retraining every few months is acceptable.

Worked example: a bank wants an HR chatbot to answer from updated policy PDFs. The symptom is knowledge, documents exist, and they will change. So build RAG with access control, citations, refreshed documents, and audit logs. A good combined pattern is to log real failures, hand-correct about 200 into ideal replies, and SFT a small model on them; the model becomes the voice while RAG stays the memory.

> [!warning] Common mistake
> Rewriting "answer questions about our 50,000 PDFs" as a fine-tuning project. Facts trained into weights go stale and still leak out as confident guesses; restate it as RAG with evals and citations.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "df6476a7-6030-407a-a5ac-e8934af39b78"
title: "Checkpoint: ladder and facts versus behavior"
questionBankId: "da9da75e-42de-438c-afb4-856fbd831745"
questionIds:
  - "60cb5e06-7cc3-405d-ac26-ceb172fe27a9"
  - "99918e1c-9d31-4f67-b2fd-c36a0941bf75"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-agent-crash-course/question-banks/09-fine-tuning-decision|Choosing Prompting, RAG, or Fine-Tuning Question Bank]].

## Step 3 — LoRA and QLoRA make training affordable

Updating every weight of a large model needs a lot of GPU memory. LoRA (Low-Rank Adaptation) avoids that by freezing the base model and training two small low-rank matrices on selected layers. Think of it as a sticky-note patch placed on a textbook instead of reprinting the book. The patch is called an adapter, and trainable parameters drop by roughly 100 to 1000 times.

QLoRA goes further: the frozen base weights are quantized to 4-bit (NF4 format, via the bitsandbytes library), while the small adapters train in higher precision. That is what makes fine-tuning a 7B model on a single consumer GPU practical. The cost is slightly slower training and a small accuracy hit compared with LoRA in 16-bit. The umbrella term PEFT (Parameter-Efficient Fine-Tuning) also names the Hugging Face library that implements these methods.

Worked example from the chapter's lab: a tiny run fine-tunes the small open model Qwen2.5-0.5B-Instruct on 50 to 200 examples that turn messy customer messages into structured JSON support tickets. The key settings are a LoRA rank of 16, an alpha of 32, targeting all linear layers, and loading the base in 4-bit NF4. The trainer reports training and evaluation loss, and the result is an adapter file of tens of megabytes rather than a full model. You can hot-swap adapters on one base model.

```python
lora = LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
                  target_modules="all-linear", task_type="CAUSAL_LM")
```

Watch for catastrophic forgetting, where a narrow dataset makes the model lose general skills, and for overfitting, where validation loss rises while training loss keeps falling.

> [!warning] Common mistake
> Thinking QLoRA quantizes the adapters. The memory saving comes from quantizing the large frozen base to 4-bit; only the adapters are trained.

## Step 4 — Preference, reward, and distillation methods

Once SFT is not enough, the next rung asks what signal you have.

- **DPO (Direct Preference Optimization)** trains on triples of a prompt, a preferred response, and a rejected one. There is no separate reward model and no PPO loop, which makes it simpler and more stable than classical RLHF, so it is the default for "prefer this style." OpenAI's guidance suggests SFT first, then DPO to refine.
- **RLHF** uses human rankings, a reward model, and PPO. Powerful but complex and unstable. **RLAIF** uses another model as the ranker instead of humans.
- **GRPO (Group Relative Policy Optimization)** estimates its baseline from a group of sampled answers rather than from a separate critic network, saving memory. It was introduced in the DeepSeekMath paper and became widely known through DeepSeek-R1. It fits tasks with a verifier, such as a unit test or an exact-match check.
- **RFT (Reinforcement Fine-Tuning)** is OpenAI's managed version of this idea: you supply prompts and a grader (a Python function or an LLM judge), and the platform samples, scores, and updates the model.
- **Distillation** trains a small student model to imitate a larger teacher. For small teams the practical form is hard-label distillation: collect good answers from a strong model and SFT a smaller open model on them. Check the teacher provider's terms of service first.

Worked example, the chapter's five cases in order: an HR bot missing policy facts goes to RAG; inconsistent support tone with clean examples goes to SFT; messy SQL that a linter can score goes to RFT or GRPO; an expensive extraction task goes to distillation; a defense contractor whose data cannot leave the premises uses a local open model with QLoRA.

The biggest failure of graded training is **reward hacking**: the model finds a shortcut that earns grader points without solving the task. If you reward the word "sorry", it will open every reply with "Sorry sorry sorry." The telltale sign is a rising training-grader score alongside falling human-rated quality. Fixes: smooth multi-component scores instead of pass or fail, a different hold-out grader for evaluation, and starting from a task the model already solves sometimes. Inspect the highest-reward outputs by hand.

> [!warning] Common mistake
> Using a single binary grader for both training and evaluation. The model will learn to satisfy it, and you will have no independent signal to catch the gaming.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "8b1844ca-1fad-4e11-be89-a56da2879cc8"
title: "Checkpoint: LoRA and reward hacking"
questionBankId: "da9da75e-42de-438c-afb4-856fbd831745"
questionIds:
  - "42fc7041-dee9-4e4f-97cd-e50901cd7073"
  - "bc9718b8-9fcd-482e-965a-590b7991bad5"
```

## Try it

Write down a one-page decision memo for this case: a retailer's support bot gives wrong delivery-time answers, uses a stiff tone, and the owner wants to fine-tune on 40,000 old chat logs. They have no eval set and have not tried retrieval or few-shot prompting. State which rung you would start on, what you would do in the first week, and what evidence would justify climbing later.

> [!example]- Sample solution
> Start by building a 30 to 100 question eval set and scoring the current bot; without it nothing can be proven. The wrong delivery times are a knowledge problem, so add retrieval over current shipping policy and order data with citations. The stiff tone is a behavior problem, so first try a tightened system prompt with two to five few-shot examples and re-score. Only if tone still fails on the eval set, and you have a few hundred clean ideal replies drawn from the logs (not all 40,000 noisy ones), consider SFT, keeping RAG as the memory. Screen the logs for personal data and prompt injections before using them.

## Key takeaways

- Customization is a ladder: prompt, schema, retrieval, evals and few-shot, SFT, DPO or RFT, then a custom model.
- Climb only when a lower rung has failed on a held-out eval set; evals come before training.
- Retrieval supplies facts; fine-tuning changes behavior such as tone and format.
- LoRA trains small adapters on a frozen base; QLoRA also quantizes the base to 4-bit.
- DPO uses preference pairs, GRPO and RFT use a programmable grader, and distillation shrinks a model by imitating a bigger one.
- Reward hacking shows up as a rising grader score with falling real quality; use smooth scores and a hold-out grader.

## Explain it back

In your own words, explain why you climb the customization ladder one rung at a time, what justifies moving up a rung, and how the facts-versus-behavior distinction guides the choice.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "6ff492f5-b24c-4093-8597-14bad0351132"
title: "Chapter quiz: choosing a customization path"
questionBankId: "da9da75e-42de-438c-afb4-856fbd831745"
questionIds:
  - "4b360fe7-b6d8-4916-b1fc-04f4ab818b4d"
  - "82995d34-7318-4b0a-b63f-d5bdd6ddcbb1"
  - "dccf560e-7852-4275-a014-d2fb6860b924"
  - "2cf2b332-dc3c-48bf-9a29-4dc8a459e4f9"
  - "3b12e0b2-033b-475e-adeb-5a6dbafba032"
  - "74606719-b5ec-455e-8aa4-de69d4121bee"
  - "93ddfb56-8481-444b-aee2-7da8ecd5d35b"
  - "ffc20b90-db3e-4c98-8fed-cdde8317f084"
```

Next: [[courses/ai-agent-crash-course/lessons/10-enterprise-llm|Next lesson]]

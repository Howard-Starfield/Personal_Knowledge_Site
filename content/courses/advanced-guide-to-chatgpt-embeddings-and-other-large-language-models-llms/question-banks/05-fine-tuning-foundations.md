---
id: "d92a6e05-4c38-4b71-9f83-5e17c0b24a6d"
title: "Chapter 5: Optimizing LLMs: Transfer Learning & Fine-Tuning: Question Bank"
description: "Practice questions for the fine-tuning chapter: the three learning regimes, the prompting-versus-RAG-versus-fine-tuning decision matrix, token economics and the breakeven point, the SFT loss and prompt masking, catastrophic forgetting and its defences, dataset curation, and the three production failure modes."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/05-fine-tuning-foundations|Chapter 5: Optimizing LLMs: Transfer Learning & Fine-Tuning]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "6c1a3f85-27b4-4d90-8e73-4f5b9c60d217"
    revision: 1
    status: active
    type: single-choice
    prompt: "In supervised fine-tuning, why must the prompt tokens be masked out of the loss?"
    options:
      - id: a
        text: "Otherwise the model spends its gradients learning to predict the user's prompt rather than the answer"
      - id: b
        text: "Otherwise the loss normalisation is wrong and the effective learning rate doubles at every step"
      - id: c
        text: "Otherwise the causal attention mask leaks the completion tokens back into the prompt positions"
      - id: d
        text: "Otherwise the sequence length exceeds the model's context window and the forward pass fails outright at runtime"
    correctOptionIds: [a]
    explanation: "a is correct: with unmasked labels the model is penalised for its next-token predictions over the prompt segment, so it expends gradient updates learning to predict the user's own words, which is how a prompt like \"Translate the following sentence into Spanish\" teaches it that the word \"following\" comes next. The chapter puts the resulting waste at 50% to 80% of the gradient updates, and names prompt echoing at inference as the visible symptom. b, c and d describe mechanisms the chapter does not give. Lesson section: Why Masking is Mandatory."
  - id: "e0b74d39-5c82-4a16-b4f7-3d9e6a25c108"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's worked case has a 2,500-token few-shot prompt, a 100-token fine-tuned prompt, an input cost of $0.0000015 per token and a $150 training cost. What is the breakeven query volume?"
    options:
      - id: a
        text: "About 4,167 queries, because the token saving is divided by the cost of a single token"
      - id: b
        text: "About 416,667 queries, because the training cost is added to the token saving rather than divided by it"
      - id: c
        text: "About 41,667 queries, because $150 divided by the $0.0036 saving per query is the crossover point"
      - id: d
        text: "About 4,166,700 queries, because the per-query saving is computed on the output tokens rather than the input"
    correctOptionIds: [c]
    explanation: "c is correct: the breakeven formula divides the sunk training cost by the per-query saving, and the saving is 2,400 tokens times $0.0000015, which is $0.0036, so $150 divided by $0.0036 is about 41,667 queries. The lesson then notes that at 50,000 queries a month fine-tuning pays for itself within 25 days, and at a million queries a month it saves $3,450 every month. a, b and d each corrupt one step of that arithmetic. Lesson section: the numerical worked case."
  - id: "2f9d5c48-0b31-4e7a-a6d2-8c45e1b037f6"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team needs the model to follow a bespoke SQL dialect exactly and also to answer questions about a constantly changing internal wiki. What does the lesson advise?"
    options:
      - id: a
        text: "Fine-tune on the wiki pages and answer from memory, because the wiki is the company's own knowledge"
      - id: b
        text: "Use RAG for the wiki and fine-tune for the dialect, because the two levers fix different things"
      - id: c
        text: "Use one long few-shot prompt for both, since the model can hold the dialect and the wiki in context"
      - id: d
        text: "Fine-tune on the wiki only, because a fine-tuned model can also be given retrieved passages at inference"
    correctOptionIds: [b]
    explanation: "b is correct: the lesson's rule of thumb is that RAG gives the model an open book while fine-tuning teaches it a new accent, style or job skill. A dialect and a fixed output schema are exactly what fine-tuning internalises, and the decision matrix rates fine-tuning poor on factuality and freshness because it memorises static facts and hallucinates when they shift, while rating RAG excellent on grounded live documents. The lesson's elite pattern is a smaller model such as Llama-3-8B fine-tuned for domain tone and citation syntax with RAG supplying the dynamic passages. a and c apply the wrong lever to the wrong half of the problem, and d contradicts the knowledge injection fallacy. Lesson section: The Golden Rule of Thumb."
  - id: "7b4e0a19-6d35-4c82-b5f0-93a7c2e85d64"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson add a KL divergence penalty against the frozen reference model to the fine-tuning loss?"
    options:
      - id: a
        text: "It makes the fine-tuned model's probability distribution identical to the base model's on every single token"
      - id: b
        text: "It adds a term that rewards the model for assigning probability to tokens the base model considered absurd"
      - id: c
        text: "It keeps the vocabulary embedding matrix frozen so the model's output space cannot drift at all"
      - id: d
        text: "It penalises drift from the reference distribution, so the optimiser cannot wander out of the general basin"
    correctOptionIds: [d]
    explanation: "d is correct: the penalty measures how far the fine-tuned policy has drifted from the frozen reference model, and because the ratio of the two probabilities explodes when the fine-tuned model puts high mass on a token the base model considered absurd, the optimiser is pulled back toward the base distribution. The scalar beta controls the stiffness of that spring, so a higher beta prevents catastrophic forgetting at the cost of slower task adaptation. a is wrong because the penalty is a distance, not a clamp, and b reverses the direction of the term. Lesson section: KL Divergence Penalty Regularization."
  - id: "3a8d6f27-0c59-4e13-b7d6-2f41a9c8053e"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's rehearsal strategy blends general instruction data into the domain dataset. What does that buy?"
    options:
      - id: a
        text: "A larger effective dataset, so the model sees many more instances of the domain's vocabulary in total"
      - id: b
        text: "A constraint on the optimiser, because gradients on general reasoning keep the weights in the competence basin"
      - id: c
        text: "A higher diversity score on the held-out split, which is the metric that decides when to stop early"
      - id: d
        text: "A smaller validation loss, because the general cases dilute the contribution of the domain-specific loss term"
    correctOptionIds: [b]
    explanation: "b is correct: the domain dataset covers only a tiny manifold of language, so the optimisation path pushes the weights out of the broad basin that encoded general reasoning, coding syntax and arithmetic. Blending a replay proportion of roughly 10% to 25% of general instruction data forces the optimiser to compute gradients on general reasoning problems at the same time, which constrains that drift. a, c and d describe side effects rather than the mechanism, and the point of rehearsal is not to make the domain signal weaker. Lesson section: Rehearsal Datasets (Data Replay / Mixing)."
  - id: "9c6b4e08-3d17-4f52-8a90-e5c73b106d48"
    revision: 1
    status: active
    type: single-choice
    prompt: "What result does the lesson report for the LIMA paper?"
    options:
      - id: a
        text: "A 65B LLaMA model fine-tuned on 1,000 curated pairs matched or beat models trained on 50,000 noisy samples"
      - id: b
        text: "A 7B model fine-tuned on 1,000 curated pairs with reinforcement learning from human feedback beat every larger model"
      - id: c
        text: "A 65B model fine-tuned on 50,000 machine-generated pairs outperformed the same model trained on 1,000 pairs"
      - id: d
        text: "A 13B model trained on 1,000 pairs showed that alignment needs reinforcement learning to reach a usable quality"
    correctOptionIds: [a]
    explanation: "a is correct: LIMA fine-tuned a 65B LLaMA model on just 1,000 meticulously curated instruction and response pairs, with no reinforcement learning from human feedback at all, and in blind human preference evaluations it outperformed or matched models including GPT-3.5-Turbo and Alpaca that had been trained on 50,000 or more machine-generated samples. The chapter's reading is the superficial alignment hypothesis, that knowledge and capability come from pre-training while alignment teaches which formats and styles to use. b, c and d each invert one of those facts. Lesson section: The LIMA Principle."
  - id: "5e0b7c93-8d46-4f21-a75e-1b60c3d2947f"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson call fine-tuning on 5,000 internal wiki pages a dangerous anti-pattern?"
    options:
      - id: a
        text: "Because the dataset is too large for a single-node fine-tuning run to finish in a sensible time budget"
      - id: b
        text: "Because the pages contain conflicting instructions that the model cannot reconcile during the training run"
      - id: c
        text: "Because the base model's vocabulary cannot represent the internal jargon and acronyms used on those wiki pages"
      - id: d
        text: "Because lossy compression stores facts unreliably, so the model fabricates confident company-specific numbers"
    correctOptionIds: [d]
    explanation: "d is correct: the chapter's knowledge injection fallacy holds that autoregressive fine-tuning is an unreliable mechanism for factual storage, because text is compressed through lossy parameter projections, so when asked for a policy number, a date or an API key the model produces fluent, confident hallucinations that mimic the style of the company documents while fabricating the values. The fix is to use RAG for factual retrieval and reserve fine-tuning for form, style, tone and deterministic output structure. a, b and c give practical objections the lesson does not make. Lesson section: The Knowledge Injection Fallacy."
  - id: "1f8a2d60-7c95-4d38-b6a0-3e74f5081c26"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three failure modes does the lesson name for production fine-tuning? Select every correct answer."
    options:
      - id: a
        text: "The knowledge injection fallacy, where factual documents are compressed into unreliable recall"
      - id: b
        text: "Prompt masking omission, where the model wastes its gradients learning the user's own prompt"
      - id: c
        text: "The learning rate divergence, where a peak rate above the stated range destabilises the run"
      - id: d
        text: "The overfitting and repetition cliff, where the output distribution collapses onto repeated tokens"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. Fine-tuning on documents is called dangerous because factual recall is unreliable, an unmasked prompt turns the model into a student of the user's own wording, and training a small dataset for five to ten epochs causes entropy collapse, with the softmax mass concentrating on a tiny vocabulary of repeated tokens until the model loops on \"The product is good good good\". c is not one of the three named traps, and the learning rates the chapter recommends, 1e-5 to 5e-5 for full fine-tuning and 1e-4 to 3e-4 for PEFT, are presented as guidance rather than as a failure mode. Lesson section: The \"Most Missed Things\" in Fine-Tuning."
  - id: "d3b60f18-7c24-4e95-8a17-2f5d9c40b6e8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the lesson's five rules of production dataset curation are correct? Select every correct answer."
    options:
      - id: a
        text: "The system message must be identical across training samples and must match the production string exactly"
      - id: b
        text: "Overlapping prompt structures are desirable, because repeated prefixes make the model robust to prefixes"
      - id: c
        text: "Malformed JSON must never appear in the completion tokens, because the model treats every completion token as ground truth"
      - id: d
        text: "Samples over the context budget should be truncated or discarded, not chopped mid-sentence"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The system prompt must be invariant across the dataset and identical to the production string, because variance in it degrades the model's conditional distribution; the completion tokens are treated as ground truth, so malformed JSON, unclosed quotes or inconsistent markdown become the model's targets; and samples that exceed the context budget should be strategically truncated or discarded rather than chopped mid-sentence, because chopping trains the model to emit end-of-sequence tokens abruptly. b is the opposite of the rule, since duplicated prompt structures cause overfitting to one prefix, and the chapter recommends semantic embedding clustering to guarantee diversity instead. Lesson section: The 5 Rules of Production Dataset Curation."
  - id: "4a7c1e83-9f50-4d26-b8c7-0e3d95b26a19"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says accuracy alone is misleading on an imbalanced review dataset, and that a production fine-tuned model should reach more than 99.8% JSON schema compliance."
    answer: true
    explanation: "True. Because customer feedback datasets are rarely perfectly balanced, the chapter says accuracy alone is misleading, and that poor performance on minority 2-star reviews can be hidden by near-perfect performance on majority 5-star reviews. The imbalance it quotes is severe, with over 65% of reviews at 5 stars and 2-star and 3-star reviews together under 10%, so an unbalanced fine-tune reaches 68% raw accuracy while completely failing to detect dissatisfaction. The three recommended metrics are macro-averaged F1, which scores each of the five ratings independently and averages them with equal weight, mean absolute error for ordinal ratings, and the JSON schema compliance rate, where a production-ready fine-tuned model should exceed 99.8%. Lesson section: Evaluation Metrics: Beyond Raw Accuracy."
  - id: "86d3b0f4-2a71-4c58-9e26-7f1a5c830d4e"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the concert pianist analogy, explain the three learning regimes the lesson compares and what each one changes."
    sampleAnswer: "Pre-training is the fifteen years at the conservatory: the model learns universal musical representations from trillions of tokens and gains world-class general competence that can play almost any score, at thousands of GPUs and ten million dollars or more, but it leaves a raw unaligned text completer. In-context prompting is sight-reading a jazz lead sheet handed over at stage door: instructions and demonstrations condition the model at inference time with the weights completely frozen, which is instant to try and costs no training compute, but it is mentally expensive in context tokens, stiff rather than idiomatic, and scales in cost with every query. Supervised fine-tuning is the three-week residency with a New Orleans jazz band: backpropagating target cross-entropy through the completion tokens updates the weights from theta to theta-star, so the swing timing and chord substitutions become muscle memory and the model improvises authentically from a short prompt, at the price of a dataset of a thousand to ten thousand curated pairs and a permanent risk of catastrophic forgetting."
    explanation: "A strong answer assigns one metaphor to each regime, says that only fine-tuning changes the weights, gives the scale of data and compute for each, and names the cost each regime pays. An answer that only lists the three without saying what changes in the model has not made the comparison."
  - id: "0a5c9e37-4b81-4f60-8d27-91c6b30a5e84"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the SFT loss differs from the pre-training loss, and what goes wrong if the prompt tokens are not masked."
    sampleAnswer: "Pre-training minimises the average negative log-likelihood over every token of a continuous text sequence, and every token acts as both context and target. Supervised fine-tuning works on an explicit prompt and completion pair: the concatenated sequence still goes through the model in one forward pass, but the loss is summed only over the completion tokens, from the first target token to the last, conditioned on the prompt and the earlier completion tokens. If the prompt tokens are left unmasked, the model is penalised for predicting the user's instructions, so the chapter says 50% to 80% of its gradient updates go into learning the grammar of the prompts rather than the task, the weights drift toward the exact phrasing of the training prompts, and at inference the model echoes the question back or asks a follow-up instead of answering. The fix is mechanical: set every prompt target label to the special index -100, which the default PyTorch cross-entropy loss ignores, so those positions contribute neither loss nor gradient."
    explanation: "A strong answer states both loss formulations in words, says the summation is restricted to the completion tokens, gives the 50% to 80% figure the chapter quotes, names the prompt-echoing symptom and the -100 masking convention. An answer that only says prompts must be masked has not shown why."
```

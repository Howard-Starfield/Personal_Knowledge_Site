---
id: "b1f7d0c4-6a3e-4f52-9b08-2e7c5d41a936"
title: "Chapter 3: Prompt Engineering Foundations & Few-Shot Alignment: Question Bank"
description: "Practice questions for the prompt engineering chapter: base versus instruction-aligned behaviour, why prompts do not port across model families, in-context learning as implicit gradient descent, the four prompt paradigms, the five layers of an enterprise prompt, and the three production failure modes."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/03-prompt-engineering-fundamentals|Chapter 3: Prompt Engineering Foundations & Few-Shot Alignment]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "1e4b9c07-52d8-4a61-b3f9-7c02e6a5d814"
    revision: 1
    status: active
    type: single-choice
    prompt: "A base model is asked \"Write a Python function to compute Fibonacci numbers\" and replies that it also needs the code for its own homework. What has actually happened?"
    options:
      - id: a
        text: "The model continued the statistical pattern of the web text, because it was never trained to treat a string as a request"
      - id: b
        text: "The model refused the task, because base models carry a safety filter that blocks requests for code"
      - id: c
        text: "The model failed to apply its instruction tuning, because the chat template was missing from the prompt"
      - id: d
        text: "The model confused the English word for a function with a programming function and asked for clarification"
    correctOptionIds: [a]
    explanation: "a is correct: a base model was trained solely on next-token prediction across hundreds of billions of web tokens, so it evaluates the statistical pattern of the internet, where an assignment prompt is often followed by student confusion or related assignment questions. The model did not fail; it completed the pattern successfully. b invents a safety filter the lesson does not describe, c applies the special-token trap from a later section, and d is a misreading of the case. Lesson section: The Raw Improvisational Actor (Base LLM)."
  - id: "c60f4d8b-0a92-4e77-b3c5-8d1e7a9f2b60"
    revision: 1
    status: active
    type: single-choice
    prompt: "A prompt that works on GPT-4 is ported verbatim to a base model such as GPT-J 6B and produces rambling prose. What does the lesson identify as the cause?"
    options:
      - id: a
        text: "The base model has a smaller context window, so the prompt was truncated before the instruction could be read"
      - id: b
        text: "The base model expects a completion prefix to continue, while the instruction-tuned model expects conversational turn delimiters"
      - id: c
        text: "The base model has no awareness of being an assistant, so it continues the instruction as narrative text instead of obeying it"
      - id: d
        text: "The base model was trained on a different vocabulary, so the English words in the instruction carry different token meanings"
    correctOptionIds: [c]
    explanation: "c is correct: the lesson's rule is that when a prompt fails on a base model the culprit is almost never model intelligence but format dissonance, because a base model has no inherent awareness of being an assistant and continues the string as prose. The demonstration is the \"My name is Sinan. Answer:\" prompt, where GPT-4 and Llama-3-Instruct greet the user, FLAN-T5 outputs the name as a slot-filling extraction, and GPT-J produces a forum introduction about dual-booting Ubuntu. b states the same rule less precisely and a and d invent mechanisms the lesson does not give. Lesson section: The Base vs. Aligned Behavioral Divergence."
  - id: "8d4a7f19-3b6c-4e25-9f81-c07d2e5b3a94"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say the attention key-value outer product behaves like during a few-shot forward pass?"
    options:
      - id: a
        text: "A backward pass that computes gradients for the query and key projection matrices across the whole network"
      - id: b
        text: "An accumulated parameter update held in the residual stream, mimicking a gradient step without changing any weights"
      - id: c
        text: "A regularisation term that shrinks the magnitude of the activations to keep the forward pass numerically stable throughout"
      - id: d
        text: "A second forward pass over the demonstrations that recomputes the hidden states before the query is answered"
    correctOptionIds: [b]
    explanation: "b is correct: in the linearised attention regime the operation reduces to X W_Q times the sum of the key-value outer products, and that sum plays the part of the accumulated parameter update matrix that gradient descent would have produced on the same cases, with the meta-gradient stored temporarily in the residual stream. a is wrong because the gradient is simulated rather than backpropagated, and c and d describe mechanisms the lesson does not claim. Lesson section: Implicit Gradient Descent During the Forward Pass."
  - id: "5f27e0b4-8c93-4d16-b7a2-0e9c3f6d1a58"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which set is the lesson's five anatomical layers of an enterprise prompt, in order?"
    options:
      - id: a
        text: "Persona and identity, grounding knowledge and retrieved passages, operational constraints, output schema contract, few-shot demonstrations"
      - id: b
        text: "Operational constraints, system directives, XML delimiters, output schema contract, context and grounding knowledge"
      - id: c
        text: "Few-shot demonstrations, output schema contract, structured delimiters, system directives, operational constraints"
      - id: d
        text: "System directives, grounding knowledge, operational constraints, delimiters and demonstrations, output schema contract"
    correctOptionIds: [d]
    explanation: "d is correct: the five layers run from the system directives and persona, through context and grounding knowledge, operational constraints and boundaries, structured delimiters with the few-shot demonstrations, and finally the output schema contract that fixes the exact JSON shape and demands no preamble. a and b swap or misplace the layers, and c reverses the order. The compiled implementation in the chapter assembles exactly these five blocks, ending with the target task and a JSON_OUTPUT marker. Lesson section: Anatomy of an Enterprise Production Prompt Template."
  - id: "e91c5a72-6d38-4f04-bd95-2a7c8e13f4b6"
    revision: 1
    status: active
    type: single-choice
    prompt: "All three few-shot demonstrations in a sentiment prompt are labelled POSITIVE, and the test review says the steak was cold and completely unedible. What does the model do, and why?"
    options:
      - id: a
        text: "It outputs NEGATIVE, because the tokens of the test input outweigh the label token repeated in the demonstrations"
      - id: b
        text: "It often outputs POSITIVE, because the repeated label token has built a strong activation bias in the attention"
      - id: c
        text: "It outputs NEUTRAL, because a balanced label set is implied even though only one label ever appears"
      - id: d
        text: "It refuses to answer, because the label distribution across the demonstrations makes the task ambiguous"
    correctOptionIds: [b]
    explanation: "b is correct: the lesson warns that models show recency bias and majority class bias with few-shot demonstrations, so when every demonstration carries the same label the attention mechanism builds a massive activation bias toward that label token and will frequently output POSITIVE despite the negative test input. The fix is strict label parity, exactly one positive, one negative and one neutral, plus permuting the exemplar order across test suites so accuracy is invariant to sequence. a, c and d describe behaviours the lesson does not predict. Lesson section: The Format-Overfitting & Recency Bias Trap."
  - id: "37c9b6d2-5f48-4e73-8b0a-9d61c4e2f705"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson advise against writing \"DO NOT mention pricing\" into a prompt?"
    options:
      - id: a
        text: "The tokens naming the forbidden thing gain high attention in the prompt, which raises the logits of the related output tokens"
      - id: b
        text: "Negative instructions exceed the model's instruction-following budget, so the rest of the prompt is silently dropped by the runtime"
      - id: c
        text: "The model has no representation of negation, so it reads the sentence as an instruction to mention pricing"
      - id: d
        text: "Long negative lists displace the few-shot demonstrations, which leaves the output format unspecified"
    correctOptionIds: [a]
    explanation: "a is correct: autoregressive models have no internal logical negation switch, so the tokens \"mention\" and \"pricing\" receive high attention weights in the prompt, and because their semantic embeddings share high cosine similarity with the prompt tokens, the logits for pricing-related output tokens are heightened. The lesson's fix is prescriptive positive framing, for instance \"Respond with exactly one valid JSON object. Restrict your analysis exclusively to our internal product catalogue.\" b, c and d describe effects the lesson does not claim. Lesson section: The Negative Constraint Fallacy (The Pink Elephant Problem)."
  - id: "a06f4c38-9b17-4e52-8d63-71b5e0c9a2d3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's dynamic few-shot pipeline, how are the exemplars chosen for an incoming query?"
    options:
      - id: a
        text: "They are the three most recent entries in the golden repository, so the prompt reflects current support trends"
      - id: b
        text: "They are fixed at build time and written into the application code, because a vector index cannot be queried at runtime"
      - id: c
        text: "They are chosen by keyword search over the golden repository, since embedding similarity is too slow for a live query"
      - id: d
        text: "They are the top-k nearest neighbours of the query vector in a golden exemplar bank, retrieved by cosine similarity"
    correctOptionIds: [d]
    explanation: "d is correct: the incoming query is converted into a dense vector by the bi-encoder, a Maximum Inner Product Search over the golden exemplar repository pulls the top-k, with k of two or three, most semantically similar verified cases, and the dynamic prompt assembler injects them into the production template. The chapter's worked case retrieves the deadlock and index-build exemplars for a Postgres lock-contention question. a, b and c each describe a mechanism the chapter explicitly rules out. Lesson section: Paradigm 4: Dynamic Few-Shot Exemplar Selection."
  - id: "c8e5a071-4d63-4b9f-a25c-6b8d0f4e7a91"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three failure modes does the lesson name for production prompt systems? Select every correct answer."
    options:
      - id: a
        text: "Format-overfitting and recency bias, where unbalanced demonstrations skew the model toward the last label"
      - id: b
        text: "The chat template special token leak, where hand-rolled strings collapse an open-weights chat model"
      - id: c
        text: "The token budget overflow, where a long context window silently truncates the output schema contract"
      - id: d
        text: "The negative constraint fallacy, where forbidding a topic raises the likelihood of producing it"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three failure modes in the chapter's section on what engineers miss most. Unbalanced demonstrations bias the label, omitting the official chat template breaks the instruction-following subnetwork of open-weights chat models, and a negative constraint inflates the very tokens it forbids. c is wrong because the chapter does not name a token budget overflow as one of its three traps, and the schema contract is specified in the prompt rather than appended after it. Lesson section: The \"Most Missed Things\" in Prompt Engineering."
  - id: "f0a37d19-2e64-4c85-b907-5b1f8a3c6d24"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about model families and their native prompt styles are correct? Select every correct answer."
    options:
      - id: a
        text: "A base autoregressive model needs continuation-style priming, and few-shot is mandatory for structured output"
      - id: b
        text: "An instruction-tuned seq2seq model such as FLAN-T5 needs a long few-shot block, because it cannot follow a bare imperative"
      - id: c
        text: "A chat-aligned decoder needs the official chat template, and omitting it causes incoherence"
      - id: d
        text: "A frontier API model is a proprietary mixture of experts aligned with RLHF and Constitutional AI"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The base autoregressive family completes a prefix and needs few-shot structure for anything structured, the chat-aligned decoder breaks into incoherence, argues with itself or loops when its special tokens are missing, and the frontier API family runs a proprietary mixture of experts with causal SFT plus RLHF and Constitutional AI, whose characteristic failure is sycophancy and over-compliance rather than format collapse. b is wrong because the lesson's comparison table gives the instruction-tuned seq2seq family a low need for few-shot, since it understands zero-shot tasks. Lesson section: Model Family Architectural Comparison."
  - id: "b9e63a52-0d47-4f8b-b3c1-6e08d5a27f39"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson states that in-context learning adapts the model with zero parameter updates, and that the attention key-value outer product acts like a gradient step held in the residual stream."
    answer: true
    explanation: "True. Brown et al. showed in Language Models are Few-Shot Learners that scaling to tens of billions of parameters yields the ability to learn new computational routines from a handful of demonstrations in the context window with no parameter updates at all, with the gradient with respect to the parameters being zero. Von Oswald et al. and Dai et al. then provided the proof that the forward-pass attention can be reformulated as implicit gradient descent on an internal linear model, with the key-value outer product acting as the accumulated parameter update matrix stored temporarily in the residual stream. The weights are never modified, so the adaptation is per request and vanishes when the context is dropped. Lesson section: In-Context Learning (ICL) Mechanics."
  - id: "42d8f0c7-7b35-4ea6-9c17-80b5d2f4e6a3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the four prompt paradigms the lesson sets out, and say when each one is the right choice."
    sampleAnswer: "Zero-shot is a bare instruction with no demonstrations, relying on the model's existing instruction alignment; it suits conversational questions, summarisation and widely standardised transformations, and it fails on specialised corporate taxonomies and atypical formatting rules where common sense diverges from the enterprise rule. Role or persona prompting states an identity, which shifts the self-attention toward the vocabulary and reasoning of a clustered domain sub-corpus, but over-specifying it invites sycophancy, since a prompt declaring the assistant agreeable will affirm erroneous technical claims. Static few-shot places a fixed set of input and output pairs in the prompt, which removes all ambiguity about the output schema, at the cost of having to anticipate every possible query by hand, because a novel topic then gets no relevant guidance while still consuming context window space. Dynamic few-shot replaces the fixed block with the top-k nearest neighbours of the query vector in a golden exemplar bank, retrieved by cosine similarity at request time, so the cases match the question in hand without a manual rewrite."
    explanation: "A strong answer names all four paradigms in order, gives both a strength and a limitation for each, and mentions the sycophancy risk of persona prompting and the hand-curation cost of static exemplars. An answer that lists the four without saying when each applies has not covered the taxonomy."
  - id: "6d2b8f14-5e93-4c70-9a46-1f7b3d0c85e7"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the lesson's method actor analogy, explain the difference between a base model, an instruction-aligned model, and a model given a few-shot rehearsal sheet."
    sampleAnswer: "A base model is the raw improvisational actor: it was trained only on next-token prediction over hundreds of billions of web tokens, so it has no inherent sense of being an assistant and treats an instruction as more text to continue, which is why asking it for a Fibonacci function produces a forum-style reply about somebody's own homework. An instruction-aligned model is the director-trained actor: supervised fine-tuning on hundreds of thousands of curated instruction and response dialogues, reinforced with RLHF or DPO, teaches it the protocol that a directive is answered rather than continued, and special formatting tokens such as the instruction markers tell it where the command begins. A rehearsal sheet is few-shot in-context learning: instead of weeks of retraining, the actor is handed two worked cases immediately before the scene and locks onto the exact dialect, syntax and schema, with the weights entirely frozen. That is the chapter's central claim, that behaviour can be conditioned by what sits in the context window without a single weight being updated."
    explanation: "A strong answer assigns one role to each of the three, ties the base model to next-token prediction over web text, the aligned model to SFT plus RLHF or DPO, and the rehearsal sheet to frozen weights with a changed output format. An answer that only says the aligned model is better has not made the three-way distinction."
```

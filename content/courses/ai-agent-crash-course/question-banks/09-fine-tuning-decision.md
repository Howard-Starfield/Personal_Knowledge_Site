---
id: "da9da75e-42de-438c-afb4-856fbd831745"
title: "Choosing Prompting, RAG, or Fine-Tuning Question Bank"
description: "Practice questions for Choosing Prompting, RAG, or Fine-Tuning."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

Practice questions for deciding when prompting, retrieval, or model customization is the right fix.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "99918e1c-9d31-4f67-b2fd-c36a0941bf75"
    revision: 1
    status: active
    type: single-choice
    prompt: "A support bot gives wrong refund answers because it never saw the policy documents, which change every month. An eval set exists and prompting has been tried. Which fix fits best?"
    options:
      - id: sft-docs
        text: "Fine-tune the model on the policy documents"
      - id: rag
        text: "Add retrieval over the policy documents, with citations"
      - id: rft
        text: "Run reinforcement fine-tuning with a refund grader"
      - id: custom-base
        text: "Train a custom model on the company policy data"
    correctOptionIds: [rag]
    explanation: "The failure is missing knowledge, and retrieval supplies facts that can be edited when the documents change. Fine-tuning on the documents is the tempting choice, but it bakes facts into weights that go stale and still lets the model guess confidently on adjacent questions."
  - id: "60cb5e06-7cc3-405d-ac26-ceb172fe27a9"
    revision: 1
    status: active
    type: single-choice
    prompt: "A manager says the assistant's answers feel off and asks you to start fine-tuning. No test set exists. What is the right first move?"
    options:
      - id: start-sft
        text: "Start supervised fine-tuning on collected examples right away"
      - id: build-rag
        text: "Build a retrieval pipeline before measuring anything first"
      - id: start-dpo
        text: "Run preference tuning on a handful of sampled answers"
      - id: eval-set
        text: "Write a held-out eval set and score the current system"
    correctOptionIds: [eval-set]
    explanation: "Without a held-out eval set you cannot tell whether any change helped, so measuring comes before any rung of the ladder. Building retrieval first is tempting because it is cheap, but it still leaves you unable to prove it fixed anything."
  - id: "4b360fe7-b6d8-4916-b1fc-04f4ab818b4d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The bot already retrieves the right facts, but its tone varies from reply to reply. Prompts and few-shot examples were tried, an eval set exists, and you have 300 curated ideal replies. What next?"
    options:
      - id: sft
        text: "Supervised fine-tuning on the curated reply examples"
      - id: bigger-rag
        text: "Retrieval over a much larger store of company documents"
      - id: fact-grader
        text: "Reinforcement fine-tuning with a programmable fact grader"
      - id: scratch
        text: "Training a new base model from scratch for the brand"
    correctOptionIds: [sft]
    explanation: "Tone is a behavior problem, and consistent input and ideal-output pairs are the textbook case for supervised fine-tuning. More retrieval is tempting, but the facts are already correct, so adding documents cannot change how the model speaks."
  - id: "42fc7041-dee9-4e4f-97cd-e50901cd7073"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which statement about LoRA is correct?"
    options:
      - id: all-weights
        text: "It updates every base weight but stores the result in 4 bits"
      - id: facts
        text: "It adds fresh company facts by editing the retrieval index"
      - id: patch
        text: "It freezes the base weights and trains small low-rank matrices as a patch"
      - id: reward-model
        text: "It needs a separate reward model and a PPO loop to run"
    correctOptionIds: [patch]
    explanation: "LoRA keeps the base weights frozen and learns two small low-rank matrices for selected layers, which cuts trainable parameters a great deal. Saying it stores every weight in 4 bits mixes it up with QLoRA, which only quantizes the frozen base."
  - id: "82995d34-7318-4b0a-b63f-d5bdd6ddcbb1"
    revision: 1
    status: active
    type: single-choice
    prompt: "A learner has one consumer GPU and wants to fine-tune a 7B model. What does QLoRA change compared with plain LoRA?"
    options:
      - id: adapter-quant
        text: "Only the adapters are quantized while the base stays in 16-bit"
      - id: base-4bit
        text: "The frozen base is quantized to 4-bit while the adapters train"
      - id: retrain-all
        text: "Every weight is retrained after the model is quantized to 4-bit"
      - id: drop-adapter
        text: "The adapters are removed after training so only the base remains"
    correctOptionIds: [base-4bit]
    explanation: "QLoRA quantizes the frozen base weights to 4-bit and trains small adapters in higher precision, which is what makes a single consumer GPU practical. Quantizing only the adapters reverses the idea, because the memory saving comes from the large frozen base."
  - id: "dccf560e-7852-4275-a014-d2fb6860b924"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team has thousands of prompt, chosen answer, rejected answer triples and wants the model to prefer one house style. Which method is the default fit?"
    options:
      - id: dpo
        text: "DPO trained directly on the preference triples"
      - id: rlhf
        text: "Classical RLHF with a reward model and PPO"
      - id: grpo
        text: "GRPO using a programmable correctness verifier"
      - id: distill
        text: "Distillation from a larger teacher model's outputs"
    correctOptionIds: [dpo]
    explanation: "DPO trains straight on chosen and rejected pairs with no separate reward model, so it is the simple, stable default for style preferences. Classical RLHF can also use preferences, but it adds a reward model and an unstable PPO loop for no benefit here."
  - id: "bc9718b8-9fcd-482e-965a-590b7991bad5"
    revision: 1
    status: active
    type: single-choice
    prompt: "During reinforcement fine-tuning, the training grader score keeps rising while human reviewers rate the outputs lower. What is the most likely cause?"
    options:
      - id: forgetting
        text: "Catastrophic forgetting of general skills"
      - id: template
        text: "A chat template mismatch at inference time"
      - id: hacking
        text: "Reward hacking of a shortcut in the grader"
      - id: overfit
        text: "Plain overfitting seen as rising validation loss"
    correctOptionIds: [hacking]
    explanation: "A rising grader score paired with falling perceived quality is the signature of reward hacking, where the model games the score. Overfitting is the tempting answer, but it is detected by validation loss climbing while training loss falls, not by a grader and human disagreement."
  - id: "2cf2b332-dc3c-48bf-9a29-4dc8a459e4f9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which conditions should hold before supervised fine-tuning is justified? Select every correct answer."
    options:
      - id: behavior
        text: "The failure is about how the model responds, not what it knows"
      - id: examples
        text: "Hundreds of consistent, high-quality input and ideal-output pairs exist"
      - id: eval
        text: "A held-out eval set exists that the examples were not drawn from"
      - id: changing-facts
        text: "The company facts change daily and must stay current in answers"
    correctOptionIds: [behavior, examples, eval]
    explanation: "SFT fits behavior problems with enough clean examples and an eval set that can show whether it helped. Rapidly changing facts point the other way, because weights go stale and retrieval can be edited instead."
  - id: "3b12e0b2-033b-475e-adeb-5a6dbafba032"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which practices help reduce reward hacking when you design a grader? Select every correct answer."
    options:
      - id: smooth
        text: "Use a smooth multi-component score instead of pass or fail"
      - id: holdout
        text: "Evaluate with a different hold-out grader than the training one"
      - id: sometimes
        text: "Start from a task the base model already solves sometimes"
      - id: keyword
        text: "Reward any answer that contains a polite keyword"
      - id: single-binary
        text: "Use one binary grader for both training and evaluation"
    correctOptionIds: [smooth, holdout, sometimes]
    explanation: "Smooth multi-part scores, a separate hold-out grader, and a task the model can already sometimes solve all make gaming harder to hide. Rewarding a keyword is exactly the kind of shortcut a model will exploit by repeating it."
  - id: "74606719-b5ec-455e-8aa4-de69d4121bee"
    revision: 1
    status: active
    type: true-false
    prompt: "Fine-tuning is the most reliable way to give a model up-to-date private facts."
    answer: false
    explanation: "Fine-tuning changes behavior, while retrieval supplies facts. Facts trained into weights age as soon as documents change, and the model can still answer adjacent questions with confident guesses."
  - id: "93ddfb56-8481-444b-aee2-7da8ecd5d35b"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain why you climb the customization ladder one rung at a time, what justifies moving up a rung, and how the facts-versus-behavior distinction guides the choice."
    sampleAnswer: "Each rung up costs more time, money, and risk, so you start with prompts, schemas, and retrieval and only climb when a lower rung has clearly failed on a held-out eval set. Retrieval supplies facts and can be edited, while fine-tuning changes behavior such as tone or format. So a knowledge problem goes to RAG, and a persistent behavior problem with good examples goes to SFT or later rungs."
    explanation: "A strong answer names the eval set as the gate for climbing and separates facts (retrieval) from behavior (fine-tuning)."
  - id: "ffc20b90-db3e-4c98-8fed-cdde8317f084"
    revision: 1
    status: active
    type: free-recall
    prompt: "A bank wants an internal HR chatbot that answers policy questions from updated PDFs. Should it start by fine-tuning? Justify your answer."
    sampleAnswer: "No, not at first. The problem is missing knowledge, the documents are available, and they will be updated, so use retrieval with access control, citations, refreshed documents, evals, and audit logs. Fine-tuning policy facts into weights goes stale and can leak through completions. Consider fine-tuning later only if tone or reasoning still fails after the eval scores are acceptable."
    explanation: "The key points are knowledge versus behavior, staleness of trained facts, and eval-gated escalation."
```

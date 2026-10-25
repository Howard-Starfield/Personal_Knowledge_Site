---
id: "0c4b9e37-5a28-4f61-83d0-7b26e1a5c904"
title: "Chapter 10: Advanced Open-Source Fine-Tuning & Parameter Efficiency: Question Bank"
description: "Practice questions for the PEFT chapter: the exact VRAM accounting for full fine-tuning, multi-label versus multi-class heads, positive class weighting and threshold calibration, the low-rank hypothesis behind LoRA, the alpha over r scaling, QLoRA's three breakthroughs, and the three configuration traps."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/10-open-source-fine-tuning-and-peft|Chapter 10: Advanced Open-Source Fine-Tuning & Parameter Efficiency]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "7a1e4c60-9d35-4b82-8f17-2e5b9c03d681"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson call the assumption that a 7B model easily fine-tunes on a 24 GB GPU in 16-bit format catastrophic?"
    options:
      - id: a
        text: "Backpropagation also needs gradients and AdamW's FP32 master weights, momentum and variance, so the static total is 112 GB"
      - id: b
        text: "Because the model is quantised during training, so the stored weights are already 4-bit and the 14 GB estimate is too low"
      - id: c
        text: "Because activation memory for a long context alone exceeds the weights, so the 14 GB figure is never the binding constraint"
      - id: d
        text: "Because mixed-precision training keeps three copies of every parameter for the forward, backward and update passes"
    correctOptionIds: [a]
    explanation: "a is correct: the 14 GB figure counts only the BF16 weights, and the backward pass additionally needs 14 GB of gradients and AdamW needs three FP32 quantities per parameter, the master weights, the first momentum and the second momentum, which is another 84 GB, so the static baseline is 112 GB before a single token is processed. b and d describe mechanisms the chapter does not use, and c misplaces the binding constraint, since the static allocations dominate and activations are the smaller term at 10 GB to 30 GB. Lesson section: The GPU VRAM Memory Bottleneck of Full Fine-Tuning."
  - id: "c58b2d07-4e93-4a16-b7f2-8d1c6e0a5b34"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the lesson's static memory equation for full fine-tuning, and what does it give for a 7B model?"
    options:
      - id: a
        text: "12 bytes per parameter, which gives 84 GB for a 7B model and fits on a single 80 GB A100"
      - id: b
        text: "14 bytes per parameter, which gives 98 GB for a 7B model once the gradients are added"
      - id: c
        text: "16 bytes per parameter, which gives 112 GB for a 7B model and needs at least two 80 GB GPUs"
      - id: d
        text: "8 bytes per parameter, which gives 56 GB for a 7B model and leaves room for the activations"
    correctOptionIds: [c]
    explanation: "c is correct: the static total is 2 bytes for the weights plus 2 bytes for the gradients plus 12 bytes for the AdamW states, which is 16 bytes per parameter, so a 7B model needs 112 GB, more than a single 80 GB A100 can hold, which is why full fine-tuning needs at least two 80 GB GPUs with ZeRO-3 or FSDP. a, b and d each drop a term from the equation. Lesson section: The Total Static Memory Equation."
  - id: "9f0d6a38-2c47-4e85-b190-7a3c5e8d2b61"
    revision: 1
    status: active
    type: single-choice
    prompt: "A support ticket can be tagged Billing, Urgent and Bug at the same time. Which formulation does the lesson say fits that case?"
    options:
      - id: a
        text: "A softmax over the tags, because the labels form one mutually exclusive class within the taxonomy"
      - id: b
        text: "Independent sigmoids with binary cross-entropy, because each tag is its own Bernoulli trial"
      - id: c
        text: "A softmax over the tags, because the cross-entropy term is categorical rather than binary in this case"
      - id: d
        text: "Independent sigmoids under a normal prior, because the labels form one distribution over the tag set"
    correctOptionIds: [b]
    explanation: "b is correct: multi-label classification gives each class its own independent sigmoid, so a ticket can carry zero, one or many tags, and it is trained with binary cross-entropy over logits, while multi-class classification uses a single softmax whose probabilities sum to one and where a high logit for one class actively suppresses another. a and c apply the mutually exclusive formulation to a task that is not exclusive, and d invents a normal prior the chapter does not use. Lesson section: Multi-Class vs. Multi-Label Classification."
  - id: "4e7b0f92-6a35-4d08-9c71-3b5a8e2d7c06"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the positive class weight in the multi-label loss actually do?"
    options:
      - id: a
        text: "It scales the learning rate of the encoder so that rare classes get a larger optimiser step"
      - id: b
        text: "It shifts the sigmoid's decision boundary so that the rare class is predicted more often at calibration time"
      - id: c
        text: "It down-weights the negative cases so the model stops predicting zero for every rare class"
      - id: d
        text: "It magnifies the loss on positive instances of the rare class, by the ratio of negatives to positives"
    correctOptionIds: [d]
    explanation: "d is correct: the positive weight p_c is the ratio of negative cases to positive cases for that class, so with one ticket in a hundred carrying System_Outage the weight is about 99, and the loss on a missed positive is multiplied by 99, which forces the encoder to learn the rare positive signal. Without it the loss converges to predicting zero for every rare class, reaching 99.5% accuracy with zero operational utility. a, b and c describe effects the chapter does not attribute to the weighting term. Lesson section: Mathematical Formulation: Weighted BCEWithLogitsLoss."
  - id: "8c3a5e07-1b94-4f62-a018-6d7b0e9c3a52"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson insist on post-training threshold calibration for a multi-label head?"
    options:
      - id: a
        text: "Because the sigmoid output is miscalibrated by construction, so only a fitted threshold can restore the ordering"
      - id: b
        text: "Because a fixed 0.5 cut can give a rare class zero positives, so each class needs its own F1-tuned threshold"
      - id: c
        text: "Because the per-class thresholds must be stored with the model, otherwise the weights cannot be loaded correctly"
      - id: d
        text: "Because macro F1 is the only metric that rewards the model for suppressing the majority classes entirely"
    correctOptionIds: [b]
    explanation: "b is correct: under severe imbalance the calibrated posteriors reflect the base rates, so a class appearing on 1% of cases may never exceed a predicted probability of 0.28 even on its strongest cases, and a hardcoded 0.5 cut then yields zero positive predictions and a recall of 0.0% for that class. The remedy is to sweep thresholds from 0.05 to 0.95 in steps of 0.02 on the validation split, take the per-class F1 maximum as tau_c, and store that vector with the model. a, c and d give reasons the chapter does not make. Lesson section: Dynamic Threshold Calibration via Macro F1."
  - id: "b6d9f140-3a85-4e27-9c08-5d1a7b4e6f39"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked LoRA case on a 4096 by 4096 projection with rank 8, what is the trainable parameter count?"
    options:
      - id: a
        text: "65,536, which is 0.39% of the 16.78 million parameters held in the frozen matrix"
      - id: b
        text: "32,768, which is 0.39% of the 16.78 million parameters held in the frozen matrix"
      - id: c
        text: "16.78 million, which is the whole matrix, because LoRA trains the base weight in low-rank form"
      - id: d
        text: "524,288, which is 32 times the frozen matrix because both adapter matrices are trainable"
    correctOptionIds: [a]
    explanation: "a is correct: the up-projection B of shape 4096 by 8 holds 32,768 parameters and the down-projection A of shape 8 by 4096 holds another 32,768, so 65,536 trainable parameters against the 16.78 million of the frozen matrix, which is 0.39%. b counts only one of the two adapter matrices, c describes full fine-tuning, and d applies the wrong multiplier. Lesson section: The Low-Rank Hypothesis."
  - id: "2f5c8b31-7d64-4a09-8e73-6b0d9c4a2e57"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson insist that the up-projection matrix B be initialised strictly to zero?"
    options:
      - id: a
        text: "Because a zero matrix has no gradient, so the down-projection matrix A can be learned first"
      - id: b
        text: "Because a zero B makes the alpha over r scaling factor equal to one at the start of the training run"
      - id: c
        text: "Because the product B times A is undefined when B is random and A is zero, so one of them must be zero"
      - id: d
        text: "Because the update is exactly zero at step zero, so the model starts identical to the pristine base model"
    correctOptionIds: [d]
    explanation: "d is correct: at step zero the update is B times A, which is zero, so the forward pass reduces to the frozen base weight and the model behaves exactly as the pristine pre-trained model, with no initial shock or random destruction of pre-trained capabilities, and as gradients flow B departs smoothly from zero. A is initialised from a Gaussian or Kaiming uniform distribution, and B is the one that starts at zero, so a and c invert the roles. b is wrong because the scaling factor is alpha over r, which is 2.0 for r of 8 and alpha of 16 whatever B is. Lesson section: Why Initialize B to Zero?"
  - id: "d70b8c46-3a19-4e53-b8f2-6c1a4d9e7b08"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three PEFT traps does the lesson name? Select every correct answer."
    options:
      - id: a
        text: "The rank versus alpha scaling trap, where raising the rank without scaling alpha shrinks the update eightfold"
      - id: b
        text: "The fixed 0.5 threshold in multi-label classification, which can give a rare class zero recall"
      - id: c
        text: "The rank underfitting trap, where a rank of one is always too small to represent any useful update"
      - id: d
        text: "The unmerged adapter latency overhead, which adds 15% to 35% in single-tenant serving"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. Raising the rank from 8 to 64 while leaving alpha at 16 drops the multiplier from 2.0 to 0.25, so the adapter update shrinks eightfold and engineers wrongly conclude that higher rank performs worse, and the rule is to keep the alpha to r ratio consistent. A static 0.5 cut can leave a rare class with zero positive predictions, and deploying an unmerged adapter costs 15% to 35% in latency because three separate matrix multiplications triple the kernel launches. c is not one of the three named traps. Lesson section: The \"Most Missed Things\" in Open-Source PEFT."
  - id: "5c92e7d1-4a36-4b80-95f7-0e1d3b8c6a42"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about QLoRA's three algorithmic breakthroughs are correct? Select every correct answer."
    options:
      - id: a
        text: "4-bit NormalFloat places its sixteen bins so that each carries an equal probability mass of the standard normal"
      - id: b
        text: "Paged optimizers keep the whole optimiser state permanently in CPU RAM so that the GPU never holds it"
      - id: c
        text: "Double quantization quantizes the first-stage scaling constants, cutting the overhead to about 0.127 bits per parameter"
      - id: d
        text: "The base weights stay 4-bit in VRAM and are dequantized on the fly into BF16 in SRAM for the forward pass"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. NormalFloat is an information-theoretically optimal quantile data type whose sixteen bins each hold an equal probability mass under the standard normal, which matches the Gaussian distribution of neural network weights and preserves perplexity far better than INT4 at the same bitwidth. Double quantization treats the FP32 scaling constants as inputs to a second stage, quantizing them to 8-bit with a block size of 256 and cutting the overhead from 0.5 bits per parameter to about 0.127. The base weights stay in 4-bit NormalFloat in VRAM and are dequantized block by block into BF16 in GPU SRAM, with the dequantized tensor discarded immediately afterwards. b is wrong because paged optimizers page the inactive optimiser state out to CPU only when VRAM fills, and transfer it back transparently. Lesson section: QLoRA: Quantized LoRA."
  - id: "3e6b0d85-1c47-4a92-b730-8f5d2e1a9b64"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says QLoRA never computes 4-bit gradients, and that a LoRA adapter can be merged into the base weights so the deployed model carries zero inference latency overhead."
    answer: true
    explanation: "True. Two separate claims from the chapter. First, the QLoRA forward pass dequantizes a small block of 4-bit weights on the fly into BF16 in GPU SRAM, computes the forward dot product, and discards the dequantized tensor, while the backward pass computes gradients strictly for the adapter matrices A and B in BF16 and the base weights receive zero gradient. Second, because matrix multiplication is distributive, the adapter can be baked into the base weights as W_deploy equal to W_0 plus alpha over r times B times A, after which the adapter matrices are discarded, so the deployed model has zero additional parameters, requires no custom runtime code and shows no inference latency penalty. Lesson sections: QLoRA Forward Pass Computation and Zero-Latency Weight Merging at Deployment."
  - id: "a1f4c93b-6e27-4d58-90b7-3c8e5d0a2f16"
    revision: 1
    status: active
    type: free-recall
    prompt: "Do the lesson's VRAM accounting for full fine-tuning of a 7B model: list each component, its precision, and the total."
    sampleAnswer: "The static baseline is the sum of the weights, the gradients and the optimiser states, and it is computed before a single token is processed. The weights in BF16 occupy 2 bytes per parameter, which is 14 GB for 7 billion parameters. The backpropagation gradients are also stored in 16-bit, another 14 GB. AdamW keeps three FP32 quantities per parameter: a full-precision master copy of the weights, to which the updates are applied before being downcast back to BF16, at 28 GB; the first momentum vector, an exponential moving average of past gradients, at 28 GB; and the second momentum vector, an exponential moving average of squared past gradients, at 28 GB. The optimiser states therefore take 84 GB. The total static baseline is 2 plus 2 plus 12, that is 16 bytes per parameter, which is 112 GB for a 7B model. Even an 80 GB A100 runs out of memory before inference begins, so full fine-tuning needs at least two 80 GB GPUs under ZeRO-3 or FSDP, and dynamic activation memory adds another 10 GB to 30 GB unless gradient checkpointing is enabled."
    explanation: "A strong answer lists all five rows with their precisions and byte counts, derives the 16 bytes per parameter total, and gives the 112 GB result with the hardware consequence. An answer that gives only the 14 GB weight figure has missed the point of the lesson."
  - id: "7e2a5c08-3d94-4f61-b530-6a8f1c4e0d73"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the low-rank hypothesis leads to the LoRA forward pass, and why the update is scaled by alpha over r."
    sampleAnswer: "Aghajanyan et al. showed that the updates a pre-trained model needs for a downstream task live on a subspace of very low intrinsic dimension, so LoRA assumes the update matrix has a rank r far smaller than either dimension of the layer, with r commonly 4, 8, 16, 32 or 64. Instead of training a full d_out by d_in matrix, the update is factored as B times A, where B is the up-projection and A the down-projection, and the forward pass computes the frozen base weight and the scaled adapter in parallel, h equal to W_0 x plus alpha over r times B A x. A is initialised from a Gaussian or Kaiming uniform distribution and B strictly to zero, so at step zero the update is exactly zero and the model behaves like the pristine base model with no shock to its pre-trained capabilities, while the gradients still flow through both adapter matrices. The alpha over r factor exists so the magnitude of the update does not change with the rank: without it, raising the rank grows the product B times A proportionally and every rank change would demand a fresh learning-rate search, whereas with it, doubling r halves the multiplier and the same learning rate can be reused."
    explanation: "A strong answer states the low-rank hypothesis, the factorisation, the zero initialisation of B and its consequence at step zero, and the reason the alpha over r factor decouples the rank from the learning rate. An answer that only states the formula has not explained the design."
```

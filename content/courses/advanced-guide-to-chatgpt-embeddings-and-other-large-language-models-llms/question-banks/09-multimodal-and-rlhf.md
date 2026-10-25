---
id: "6f1b8d24-9e53-4a07-b6d8-40c5a7e19b2d"
title: "Chapter 9: Multimodal Models & RLHF Alignment: Question Bank"
description: "Practice questions for the multimodal and RLHF chapter: Vision Transformer patch arithmetic, cross-attention fusion for visual question answering, the PPO pipeline and its VRAM burden, the KL tether that prevents policy collapse, the DPO closed form, and the FLAN-T5 alignment case study."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/09-multimodal-and-rlhf|Chapter 9: Multimodal Models & RLHF Alignment]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "e0a4c793-5b26-4d18-9f47-3c6d0e8b2a15"
    revision: 1
    status: active
    type: single-choice
    prompt: "With the lesson's 224 by 224 image and 16 by 16 patches, how many patches does the encoder receive, and how many raw values does each flattened patch hold?"
    options:
      - id: a
        text: "196 patches, each flattened into 768 values, because the channel depth of three multiplies the 256 pixel values"
      - id: b
        text: "196 patches, each flattened into 256 values, because the channel depth is projected away before the flattening happens"
      - id: c
        text: "14 patches, each flattened into 768 values, because the image is divided along one axis only"
      - id: d
        text: "196 patches, each flattened into 768 values, because the class token contributes three extra values to every patch"
    correctOptionIds: [a]
    explanation: "a is correct: the patch count is H times W divided by P squared, so 224 times 224 over 16 times 16 is 14 by 14, or 196 patches, and each patch flattens to P squared times C values, which is 16 by 16 by 3, or 768 raw values for RGB, before the learnable matrix E projects it into the latent width D. b forgets the channel depth, c divides along one axis only, and d credits the class token, which is prepended as a separate token rather than added into every patch. Lesson section: The Mathematical Mechanics of Patch Projection."
  - id: "7b3e9d05-1f46-4b29-8c73-5d0e9a7b2c38"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson call patch tokenisation the fix for the quadratic attention barrier in vision?"
    options:
      - id: a
        text: "Because patching replaces the dot product with a convolution, so the cost grows linearly rather than quadratically with area"
      - id: b
        text: "Because patching lets the encoder reuse the convolutional inductive biases of the earlier CNN layers"
      - id: c
        text: "Because the sequence length falls from 50,176 pixels to 196 patches, shrinking the attention matrix 65,536 times"
      - id: d
        text: "Because patching lets a single class token stand in for the whole image, so the encoder runs at constant length"
    correctOptionIds: [c]
    explanation: "c is correct: treating individual pixels as tokens would give 50,176 of them and roughly 2.5 billion operations per head per layer, whereas 196 patches need only 38,416, a 65,536 times reduction in the quadratic attention matrix, which is what makes global full-image self-attention tractable on commodity GPUs. a and b describe convolutional mechanisms the Vision Transformer deliberately drops, and d misstates the role of the class token, which aggregates a global representation rather than replacing the sequence. Lesson section: Why Patch Tokenization Solves the Quadratic Complexity Barrier."
  - id: "5f92a1c8-4d67-4b30-8e15-7c3b9f2a6d40"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's cross-attention formulation for visual question answering, where do the queries, keys and values come from?"
    options:
      - id: a
        text: "All three come from the image, because the text tokens are projected into the visual space instead of the reverse"
      - id: b
        text: "The queries come from the text tokens, and the keys and values come from the visual patch tokens"
      - id: c
        text: "The queries come from the visual patches, and the keys and values come from the text tokens"
      - id: d
        text: "All three come from the text tokens, because the visual features are pooled into one single vector"
    correctOptionIds: [b]
    explanation: "b is correct: cross-attention is the mirror image of self-attention, where the queries are projected from the primary target sequence, the text, and the keys and values are projected from the conditioning context sequence, the image. The resulting attention map has shape B by T by S, so each text token distributes its attention across the S visual patches. a and d invert or collapse the two streams, and c swaps the roles, which is exactly the projection asymmetry the chapter warns about in its traps section. Lesson section: The Mathematical Formulation of Cross-Attention."
  - id: "c74b0d93-2a56-4f18-b820-9e5d1c6a3f07"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's spatial grounding analysis, what does a single row of the cross-attention matrix represent?"
    options:
      - id: a
        text: "The attention paid by every visual patch to every text token in the question, patch by patch"
      - id: b
        text: "The full similarity between the image embedding and the decoder's generated output tokens, position by position"
      - id: c
        text: "The probability that each visual patch belongs to the foreground object of the scene rather than the background"
      - id: d
        text: "A normalised distribution over the visual patches, so each text token allocates attention across the image grid"
    correctOptionIds: [d]
    explanation: "d is correct: the row for text token t is the softmax of that token's query against all the patch keys, so it is a probability distribution summing to one over the S spatial patches, and the text representation is then modulated by the weighted sum of the value vectors. When the model processes the token \"car\", the inner products are high for the patches at the vehicle's coordinates, which is the grounding mechanism the chapter describes. a, b and c each describe a different matrix or a different computation. Lesson section: Spatial Attention Grounding."
  - id: "3e08f5b6-9d41-4c72-b536-7a2e9c8d1f04"
    revision: 1
    status: active
    type: single-choice
    prompt: "Using the lesson's accounting for a 7B model in FP16 with FP32 AdamW states, what total VRAM does PPO need?"
    options:
      - id: a
        text: "168 GB, because the frozen reference and reward models need no optimiser state of their own"
      - id: b
        text: "338 GB, which is why the chapter says a team needs five to eight 80GB A100 or H100 GPUs"
      - id: c
        text: "56 GB, because only the actor policy carries trainable weights during the rollout phase"
      - id: d
        text: "28 GB, because the KL penalty lets the critic and reward models share the actor's weights"
    correctOptionIds: [b]
    explanation: "b is correct: the actor carries 14 GB of weights, 14 GB of gradients and 112 GB of AdamW states for 140 GB, the trainable critic costs another 140 GB, the frozen reference and the frozen reward model need 14 GB each, and activations and KV caches for the generation rollouts add about 30 GB, giving 140 plus 140 plus 14 plus 14 plus 30, which is 338 GB. a, c and d each omit or halve one of those terms. Lesson section: Worked VRAM Accounting for a 7B Parameter Model."
  - id: "8d36c0a5-7e92-4b47-9f03-5a1b8e6d2c74"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson insist that the KL divergence penalty cannot be set to zero?"
    options:
      - id: a
        text: "The reward model only holds on the human preference distribution, so an unconstrained policy collapses"
      - id: b
        text: "The KL term is the only part of the objective that keeps the policy's output length under control in training"
      - id: c
        text: "The reference policy supplies the value estimates, so without it the critic has no learning signal at all"
      - id: d
        text: "The partition function in the closed-form derivation is undefined unless the two policies are kept close"
    correctOptionIds: [a]
    explanation: "a is correct: the reward model is a neural network fitted to a finite dataset of human comparisons, so its predictions are only valid inside the support of the human preference distribution, and an unconstrained policy searching the token space will find out-of-distribution exploits where the reward diverges, which in practice shows up as repetitive superlatives and broken punctuation within a few dozen gradient steps. The KL term is non-negative and equals zero only when the two policies coincide, so subtracting it bounds the search to a trust region, and any unnatural sequence the reference assigns vanishing probability receives an infinite negative penalty. b, c and d misattribute the role of the term. Lesson section: Mathematical Proof: Why the KL Divergence Penalty Prevents Policy Collapse."
  - id: "2b95e7d1-0c48-4a36-8f72-1e4d9b3a6c58"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson say DPO removes compared with the PPO pipeline?"
    options:
      - id: a
        text: "The need for a frozen reference policy, because the implicit reward is computed against the base model instead"
      - id: b
        text: "The need for preference data, because the model learns directly from the demonstrations instead"
      - id: c
        text: "The need for a critic, but not the reward model, because the reward margin is derived from the logits"
      - id: d
        text: "The separate reward model, the critic network and the online rollouts, leaving a two-model offline loss"
    correctOptionIds: [d]
    explanation: "d is correct: DPO solves the constrained RL objective that PPO solves in closed form, so no separate reward model, no critic and no online generation are needed, and training becomes a forward pass over a static preference dataset against a frozen reference policy with a single beta regularisation hyperparameter. a is wrong because the frozen reference is still essential, since the implicit reward is the log-ratio against it, and b and c misplace what is eliminated. Lesson section: The Direct Preference Optimization (DPO) Revolution."
  - id: "a7c1b845-3f29-4d60-8e17-5b2d6c0a9f43"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three engineering traps does the lesson name for multimodal and RLHF work? Select every correct answer."
    options:
      - id: a
        text: "The KL divergence penalty collapse, where a beta near zero lets the policy discover reward-model exploits"
      - id: b
        text: "Cross-attention projection mismatch, where visual and text representations are not brought to a shared head width"
      - id: c
        text: "The patch granularity trap, where 16 by 16 patches lose the fine detail needed to read small text"
      - id: d
        text: "The PPO four-model memory explosion, where the actor, critic, reference and reward must all sit in VRAM"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. Setting beta too low lets the actor find adversarial vulnerabilities in the reward model within about 100 iterations and start emitting repeated punctuation or nonsense superlatives, while in DPO a beta at or below 0.001 turns the dynamic error weights into step functions and explodes the gradients. Cross-attention built without projecting both streams into a shared head dimension corrupts the inner-product geometry, and skipping LayerNorm on the visual keys saturates the softmax so the text query is blinded to almost the whole image. c is not one of the three named traps. Lesson section: The \"Most Missed Things\" in Multimodal & RLHF Engineering."
  - id: "f04d6b38-7c25-4e19-90a7-3d8b2e5c1a46"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the DPO gradient are correct? Select every correct answer."
    options:
      - id: a
        text: "The implicit reward is the policy's log-ratio against the reference, scaled by beta"
      - id: b
        text: "The gradient pushes the model to raise the probability of the dispreferred response"
      - id: c
        text: "The dynamic error weight makes the update vanish when the model already prefers the chosen response"
      - id: d
        text: "When the model wrongly prefers the dispreferred response, the weight approaches one and the correction is maximal"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The implicit reward is defined as beta times the log of the policy likelihood over the reference likelihood, the gradient contains the positive term that raises the likelihood of the preferred response and the negative term that lowers the likelihood of the dispreferred one, and the whole update is scaled by the dynamic error weight, the sigmoid of the implicit reward of the dispreferred response minus that of the preferred one. When the model already prefers the chosen response the weight falls toward zero and the gradient vanishes, which prevents over-optimisation, while a wrong preference pushes the weight toward one for a maximal corrective gradient. b is wrong because the dispreferred response is pushed down, not up. Lesson section: The Gradient Dynamics of DPO."
  - id: "9e5c7a20-1b46-4d83-a017-8f2b6c4d9e31"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson's FLAN-T5 case study reports that ROUGE scores fell from 34.2 to 31.8 during preference optimisation while the human evaluation win rate rose from 50% to over 72%."
    answer: true
    explanation: "True. The chapter's case study aligns FLAN-T5-Large, an encoder-decoder model of 780 million parameters, on Reddit TL;DR abstractive summarisation with the CarperAI OpenAI TL;DR preference dataset of 116,000 human comparisons. After the supervised cold start the model scored a ROUGE-1 of 34.2 while frequently copying sentences verbatim and keeping unhelpful fluff. As preference optimisation proceeds the classical lexical metrics drift down to 31.8, yet the human evaluation win rate climbs from 50% to over 72%, because the model moves away from extractive copying toward clear abstractive synthesis. The chapter also gives the KL monitoring guidance: at a beta of 0.1 the divergence stabilises around 1.5 to 2.5 nats, while a beta at or below 0.01 makes it spike past 15 nats. Lesson section: Case Study: Aligning FLAN-T5 with Reinforcement Learning from Feedback."
  - id: "4d8e1c57-6b03-4a72-9f25-0c7b8a3e5d19"
    revision: 1
    status: active
    type: free-recall
    prompt: "Set out the pipeline that turns a raw image into the token sequence a Vision Transformer consumes, with the lesson's numbers."
    sampleAnswer: "The image arrives as a tensor of height by width by channels, for instance 224 by 224 by 3. It is partitioned into non-overlapping patches of P by P pixels, with P commonly 16 or 14, so the number of patches is N equal to H times W divided by P squared, which for 224 by 224 with 16 by 16 patches is 14 by 14, or 196 patches. Each patch is flattened into a vector of P squared times C values, which is 16 by 16 by 3, or 768 values for RGB, and a learnable matrix E of shape P squared C by D projects it into the latent width D, 768 for ViT-Base. A learnable class token is then prepended, giving N plus 1 tokens, and learnable positional embeddings are added, because self-attention is permutation-invariant and would otherwise have no idea where in the image each patch sat. The sequence then passes through L standard encoder blocks built from pre-LayerNorm, multi-head self-attention and an MLP, each as a residual branch. The payoff is that the attention sequence length falls from 50,176 pixels to 196 patches, shrinking the quadratic attention matrix by 65,536 times and making global full-image attention tractable."
    explanation: "A strong answer gives the patch count, the flattened width, the projection, the class token and the positional embedding, and closes with the 65,536 times reduction. An answer that only says images are split into patches has not covered the pipeline."
  - id: "6a2f8d93-4c17-4b50-8e36-7d0c5b9a2f83"
    revision: 1
    status: active
    type: free-recall
    prompt: "Compare the PPO and DPO training pipelines as the lesson does, and say what the chapter's case study found about their effect on evaluation metrics."
    sampleAnswer: "PPO is online reinforcement learning with four models resident in GPU memory at once: the trainable actor that generates rollouts and takes the policy updates, the trainable critic that estimates the expected return for generalised advantage estimation, and the frozen reference policy and the frozen reward model. The actor and the critic each carry weights, gradients and AdamW optimiser states, which for a 7B model in FP16 with FP32 optimiser states is 140 GB each, so 338 GB in total and a requirement of five to eight 80GB A100 or H100 GPUs under ZeRO-3 or FSDP. DPO is offline implicit classification with two models, the active policy and the frozen reference, trained on a static preference dataset with a forward pass only, no generation, no critic and no separate reward model, and it reduces to a single beta regularisation hyperparameter. The case study on FLAN-T5-Large shows both methods forcing the model toward conciseness, with ROUGE scores drifting down from 34.2 to 31.8 while the human win rate rises from 50% to over 72%, which is the chapter's point that the lexical metrics and human preference can move in opposite directions."
    explanation: "A strong answer names the four PPO models and their VRAM accounting, contrasts DPO's two models and static loss, and quotes both the ROUGE and win-rate figures with the reason they diverge. An answer that only says DPO is simpler has not covered the cost or the result."
```

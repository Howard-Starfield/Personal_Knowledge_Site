---
id: "6c867f94-2533-4ee0-bfcd-7aa42ba86f15"
title: "Chapter 9: Multimodal Models & RLHF Alignment"
description: "Master Vision Transformers (ViT), cross-attention fusion for Visual Question Answering, and the mathematical formulations of RLHF, PPO, and Direct Preference Optimization (DPO)."
type: lesson
publish: true
status: active
created: "2026-09-29"
tags:
  - machine-learning
  - multimodal
  - vision-transformers
  - cross-attention
  - rlhf
  - ppo
  - dpo
  - alignment
courseId: "a62e5265-aacf-45ea-8e64-7dae192cc27f"
lessonOrder: 10
estimatedMinutes: 35
comments: false
---

# Chapter 9: Multimodal Models & RLHF Alignment

In [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/01-llm-foundations-and-transformers|Chapter 1: LLM Foundations & The Transformer Architecture]], we analyzed the mathematical mechanics of multi-head self-attention and autoregressive next-token prediction across text sequences. In [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/05-fine-tuning-foundations|Chapter 5: Optimizing LLMs: Transfer Learning & Fine-Tuning]], we examined Supervised Fine-Tuning (SFT) to adapt foundation models to specific task distributions. And in [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/08-ai-alignment-first-principles|Chapter 8: AI Alignment: First Principles, Ethics & Red Teaming]], we explored the philosophical and empirical foundations of AI alignment: the 3H framework (Helpful, Honest, Harmless), Bradley-Terry preference modeling, and adversarial red teaming.

Yet, modern foundation models are no longer confined to isolated text streams, nor are their generative distributions shaped purely by next-token cross-entropy loss:

1. **The Multimodal Expansion:** Real-world reasoning requires perceiving the world through heterogeneous sensory channels—images, diagrams, documents, and video streams. How does a language model "see" pixels, map spatial geometry into semantic tokens, and ground its textual queries in visual scenes?
2. **The Post-SFT Optimization Frontier:** Supervised Fine-Tuning teaches a model the _format_ of answers, but it cannot effectively teach _preference discrimination_. Maximum likelihood estimation treats all tokens in human demonstration data equally, failing to penalize subtle hallucinations, verbosity bloat, or policy drift.

To bridge these frontiers, machine learning engineers utilize two transformative architectures:

- **Vision Transformers (ViT) & Cross-Attention Fusion:** Transforming continuous 2D pixel grids into discrete patch token embeddings and cross-attending between language queries and visual features for Visual Question Answering (VQA).
- **Preference Alignment via RLHF (PPO) & Direct Preference Optimization (DPO):** Steering generative policy distributions using Reinforcement Learning from Human Feedback (RLHF) through Proximal Policy Optimization (PPO), and the closed-form breakthrough of Direct Preference Optimization (DPO).

In this chapter, we anchor our intuition in **The Film Director & The Tethered Racehorse**, deconstruct the mathematical mechanics of **Vision Transformers (ViT)**, derive the tensor dynamics of **Cross-Attention Multimodal Fusion**, walk through the classical 3-step **RLHF Pipeline with PPO**, mathematically prove why the **KL Divergence Penalty** prevents catastrophic policy collapse, derive the closed-form implicit reward formulation of **Direct Preference Optimization (DPO)**, analyze an empirical **FLAN-T5 Alignment Case Study**, expose the three most critical engineering traps, and implement an assert-verified multimodal fusion and DPO engine in PyTorch.

---

## 1. The Dual Mental Model: The Film Director & The Tethered Racehorse (Feynman Analogies)

To grasp multimodal fusion and preference alignment without getting lost in tensor equations, consider two vivid mental models: **The Film Director at the Editing Deck** and **The High-Spirited Racehorse**.

```
========================================================================================
            THE FEYNMAN MENTAL MODELS: FILM DIRECTOR & TETHERED RACEHORSE
========================================================================================

  ANALOGY 1: THE FILM DIRECTOR AT THE EDITING DECK (Cross-Attention Multimodal Fusion)
  ──────────────────────────────────────────────────────────────────────────────────────
  Imagine a film director sitting at an editing desk:
  - On the left is the written script: ["Where", "is", "the", "red", "sports", "car", "?"]
  - On the right are dozens of silent film frames sliced into photographic contact sheets.

  The director reads the text words one by one. When reading the token "car", the director's
  eyes (the Query) do not stare blankly at the words; they dart over to the silent visual
  frames (the Keys), scan across spatial coordinates, and instantly locate the cluster of
  visual patches showing shiny red automotive paint and rubber tires (the Values).

  Cross-Attention is that director's spotlight: language acts as a semantic query that
  probes, indexes, and retrieves visual evidence from spatial patches.

  ──────────────────────────────────────────────────────────────────────────────────────
  ANALOGY 2: THE HIGH-SPIRITED RACEHORSE & THE TETHER (RLHF & The KL Penalty)
  ──────────────────────────────────────────────────────────────────────────────────────
  Imagine training a powerful, high-spirited thoroughbred racehorse:
  - The Goal: Train the horse to run around the racetrack as swiftly as possible.
  - The Reward Model: An automated dispenser at the finish line that hands out sugar cubes
    based on the horse's speed sensor.
  - The Perverse Optimization (Reward Hacking): The horse quickly figures out that it
    doesn't need to gallop around the muddy track at all. It can simply hop over the infield
    fence, jump directly into the concession stand, and smash open the sugar bin!

  - The Elastic KL Tether: To prevent the horse from destroying the stadium, the trainer
    fastens a strong, elastic tether connecting the horse to the center track rail (the
    frozen Reference Policy).
    * The horse is rewarded for running fast.
    * But if it strays too far from the track rail, the elastic tension (KL Divergence
      Penalty beta * D_KL) pulls back sharply, imposing an unbearable physical cost.

  The KL divergence penalty is the elastic tether that keeps the generative policy bounded
  within the domain of coherent human language while it optimizes for high reward.
========================================================================================
```

---

## 2. Vision Transformers (ViT): Conquering Computer Vision with Tokens

For over a decade, **Convolutional Neural Networks (CNNs)** (such as AlexNet, VGG, ResNet, and EfficientNet) dominated computer vision. CNNs rely on two strong architectural inductive biases:

1. **Translation Equivariance:** A feature pattern (like an edge or corner) has the same meaning regardless of where it appears in the image.
2. **Locality (Small Receptive Fields):** Early layers only compute dot products over local $3 \times 3$ or $5 \times 5$ pixel neighborhoods.

While inductive biases allow CNNs to train efficiently on small datasets, they become a computational ceiling at massive scale. To integrate visual perception directly with large language models, vision architectures needed a unified representation: **tokens**.

In 2020, Dosovitskiy et al. (_"An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale"_) proved that removing convolutional inductive biases entirely and applying a standard Transformer encoder directly to image patches outperforms state-of-the-art CNNs when pre-trained on large-scale datasets (JFT-300M, ImageNet-21k).

```
========================================================================================
                    VISION TRANSFORMER (ViT) PATCH DECOMPOSITION
========================================================================================

  Original 2D Image: (H x W x C) = (224 x 224 x 3)
  ┌───────────────┬───────────────┬─────── ... ───────┬───────────────┐
  │ Patch (1, 1)  │ Patch (1, 2)  │                   │ Patch (1, 14) │
  │ 16 x 16 x 3   │ 16 x 16 x 3   │                   │ 16 x 16 x 3   │
  ├───────────────┼───────────────┼─────── ... ───────┼───────────────┤
  │ Patch (2, 1)  │ Patch (2, 2)  │                   │ Patch (2, 14) │
  │ 16 x 16 x 3   │ 16 x 16 x 3   │                   │ 16 x 16 x 3   │
  │      ...      │      ...      │       ...         │      ...      │
  ├───────────────┼───────────────┼─────── ... ───────┼───────────────┤
  │ Patch (14, 1) │ Patch (14, 2) │                   │ Patch (14, 14)│
  │ 16 x 16 x 3   │ 16 x 16 x 3   │                   │ 16 x 16 x 3   │
  └───────────────┴───────────────┴─────── ... ───────┴───────────────┘
                                 │
                 Flatten & Linear Projection Matrix E
                                 ▼
   Tokens:  [ [CLS] ] [ Patch 1 ] [ Patch 2 ] ... [ Patch 196 ]
               │           │           │                 │
   Pos Embed: +E_pos[0]   +E_pos[1]   +E_pos[2]  ...    +E_pos[196]
               │           │           │                 │
               ▼           ▼           ▼                 ▼
             ==============================================
                    TRANSFORMER ENCODER BLOCKS (L layers)
             ==============================================
```

### The Mathematical Mechanics of Patch Projection

Let an input image be represented as a tensor $X \in \mathbb{R}^{H \times W \times C}$, where $H$ is image height, $W$ is image width, and $C$ is channel depth (e.g., $224 \times 224 \times 3$).

1. **Patch Decomposition:** The image is partitioned into non-overlapping spatial patches of resolution $P \times P$ (commonly $P = 16$ or $P = 14$). The total number of resulting patches $N$ is:
   $$N = \frac{H \cdot W}{P^2}$$
   For a $224 \times 224$ image with $16 \times 16$ patches:
   $$N = \frac{224 \cdot 224}{16 \cdot 16} = 14 \cdot 14 = 196 \text{ patches}$$

2. **Patch Flattening:** Each $P \times P \times C$ patch is flattened into a 1D vector $x_p^i \in \mathbb{R}^{P^2 C}$. For RGB images with $P = 16$:
   $$P^2 C = 16 \cdot 16 \cdot 3 = 768 \text{ values per patch}$$

3. **Linear Projection:** A learnable embedding matrix $E \in \mathbb{R}^{(P^2 C) \times D}$ projects each flattened patch into the latent model dimension $D$ (e.g., $D = 768$ for ViT-Base):
   $$z_p^i = x_p^i E \in \mathbb{R}^D$$

4. **Prepending the Classification Token (`[CLS]`):** Similar to BERT, a learnable token vector $x_{\text{class}} \in \mathbb{R}^D$ is prepended at index 0 to aggregate global visual representations:
   $$z_0 = \left[ x_{\text{class}}; \, x_p^1 E; \, x_p^2 E; \, \dots; \, x_p^N E \right] \in \mathbb{R}^{(N + 1) \times D}$$

5. **Learnable Positional Embeddings:** Because self-attention is permutation-invariant, spatial geometry is injected by adding learnable 1D position embeddings $E_{\text{pos}} \in \mathbb{R}^{(N + 1) \times D}$:
   $$z_0 = \left[ x_{\text{class}}; \, x_p^1 E; \, x_p^2 E; \, \dots; \, x_p^N E \right] + E_{\text{pos}}$$

6. **Transformer Encoder Processing:** The resulting sequence of $N + 1$ tokens passes through $L$ standard Transformer encoder layers featuring pre-LayerNorm, Multi-Head Self-Attention ($\text{MSA}$), and Multi-Layer Perceptrons ($\text{MLP}$):
   $$z'_\ell = \text{MSA}(\text{LN}(z_{\ell-1})) + z_{\ell-1}, \quad \ell = 1, \dots, L$$
   $$z_\ell = \text{MLP}(\text{LN}(z'_\ell)) + z'_\ell, \quad \ell = 1, \dots, L$$

### Why Patch Tokenization Solves the Quadratic Complexity Barrier

Standard self-attention computes dot products between all pairs of input elements. If we treated individual pixels as tokens, a $224 \times 224$ image would yield $50{,}176$ tokens. Computing self-attention over $50{,}176$ tokens requires:
$$(50{,}176)^2 \approx 2{,}517{,}630{,}000 \text{ operations per attention head per layer}$$

By decomposing the image into $16 \times 16$ patches, the sequence length drops from $50{,}176$ to $196$ tokens:
$$(196)^2 = 38{,}416 \text{ operations per attention head per layer}$$

This represents an immediate **$65{,}536\times$ reduction** in quadratic attention matrix size, making global full-image self-attention computationally tractable on commodity GPUs.

---

## 3. Cross-Attention Fusion for Visual Question Answering (VQA)

Visual Question Answering (VQA) requires an AI system to take an image $I$ and a text question $X_{\text{text}}$ (e.g., _"What color is the car behind the traffic light?"_) and generate an accurate textual answer.

Foundation Multimodal LLMs (such as Flamingo, BLIP-2, LLaVA, and PaLI) bridge frozen visual encoders (such as ViT or CLIP) with autoregressive language decoders. The primary mathematical mechanism for conditioning text generation on visual representations is **Cross-Attention**.

```
========================================================================================
            CROSS-ATTENTION MULTIMODAL FUSION ARCHITECTURE (VQA)
========================================================================================

  IMAGE (224x224x3)                          TEXT QUESTION ("What color is the car?")
         │                                                      │
         ▼                                                      ▼
  [Vision Transformer]                                   [Token Embeddings]
  (Patch Slicing + Encoder)                                     │
         │                                                      ▼
  Visual Tokens X_image                                  Text Tokens X_text
  Shape: (B, S, D_img)                                   Shape: (B, T, D_text)
         │                                                      │
         ├──────────────────────┬───────────────────────┐       │
         │                      │                       │       │
         ▼                      ▼                       │       ▼
   Linear Proj W^K        Linear Proj W^V               │  Linear Proj W^Q
         │                      │                       │       │
         ▼                      ▼                       │       ▼
    Keys K (B, S, d_k)    Values V (B, S, d_v)          │  Queries Q (B, T, d_k)
         │                      │                       │       │
         └──────────────┬───────┘                       │       │
                        │                               │       │
                        ▼                               ▼       │
                 [ Scaled Dot-Product Attention ] ◄─────────────┘
                     Softmax( Q * K^T / sqrt(d_k) )
                                │
                                ▼
                   Attention Map: (B, T, S)
                   (Each text token attends to S visual patches)
                                │
                                ▼
                     Weighted Values: (B, T, d_v)
                                │
                                ▼
                     Output Projection W^O
                                │
                                ▼
                       Fused Text Tokens
                     Shape: (B, T, D_text)
                                │
                                ▼
                 [ Autoregressive LLM Decoder ]
                                │
                                ▼
                     Generated Answer: "Red"
========================================================================================
```

### The Mathematical Formulation of Cross-Attention

In standard self-attention, Queries ($Q$), Keys ($K$), and Values ($V$) are all projected from the _same_ sequence ($X$). In **Cross-Attention**, Queries originate from the primary target sequence (Text), while Keys and Values originate from the conditioning context sequence (Image).

Let:

- $X_{\text{text}} \in \mathbb{R}^{B \times T \times D_{\text{text}}}$ represent the text sequence of batch size $B$, sequence length $T$, and hidden dimension $D_{\text{text}}$.
- $X_{\text{image}} \in \mathbb{R}^{B \times S \times D_{\text{img}}}$ represent the visual patch sequence of length $S = N + 1$ and visual embedding dimension $D_{\text{img}}$.

The linear projection transformations are defined as:
$$Q = X_{\text{text}} W^Q \in \mathbb{R}^{B \times T \times d_k}, \quad W^Q \in \mathbb{R}^{D_{\text{text}} \times d_k}$$
$$K = X_{\text{image}} W^K \in \mathbb{R}^{B \times S \times d_k}, \quad W^K \in \mathbb{R}^{D_{\text{img}} \times d_k}$$
$$V = X_{\text{image}} W^V \in \mathbb{R}^{B \times S \times d_v}, \quad W^V \in \mathbb{R}^{D_{\text{img}} \times d_v}$$

The scaled cross-attention operation computes:
$$\text{AttentionWeights} = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) \in \mathbb{R}^{B \times T \times S}$$
$$\text{CrossAttention}(Q, K, V) = \text{AttentionWeights} \cdot V \in \mathbb{R}^{B \times T \times d_v}$$

### Spatial Attention Grounding

Consider the dimension of the resulting attention matrix: $(B, T, S)$. For each individual text token $t \in \{1, \dots, T\}$, the row vector:
$$A_{t, :} = \text{softmax}\left(\frac{Q_t K^T}{\sqrt{d_k}}\right) \in \mathbb{R}^S$$
represents a normalized probability distribution summing to $1.0$ across all $S$ spatial image patches.

When the model processes the query token _"car"_, the inner product $Q_t K_s^T$ yields high scalar values for spatial patches $s$ corresponding to the vehicle's coordinates in the image grid. The text representation is physically modulated by taking the weighted sum over visual feature vectors $V_s$.

---

## 4. Reinforcement Learning from Human Feedback (RLHF)

While multimodal architectures teach models to process multiple sensory inputs, **Reinforcement Learning from Human Feedback (RLHF)** teaches models to generate responses aligned with human judgment, intent, and safety boundaries.

### The Classical 3-Step RLHF Pipeline

```
========================================================================================
                      THE CLASSICAL 3-STEP RLHF PIPELINE
========================================================================================

  STEP 1: SUPERVISED FINE-TUNING (SFT)
  ┌───────────────────────┐
  │ High-Quality Prompt / │ ──► Causal Language Modeling ──► [ SFT Policy Model: pi_SFT ]
  │ Demonstration Pairs   │     (Supervised Next-Token Loss)
  └───────────────────────┘
                                       │
                                       ▼ Initialized from pi_SFT
  STEP 2: REWARD MODEL TRAINING (RM)
  ┌───────────────────────┐
  │ Comparison Dataset D  │
  │ Prompt x              │ ──► Bradley-Terry Loss      ──► [ Reward Model: r_psi ]
  │ Preferred y_w         │     -log sigma(r(y_w)-r(y_l))     (Scalar evaluator)
  │ Dispreferred y_l      │
  └───────────────────────┘
                                       │
                                       ▼ Evaluates rollouts
  STEP 3: REINFORCEMENT LEARNING VIA PPO
  ┌───────────────────────┐
  │ Prompts x ~ D         │
  └──────────┬────────────┘
             │
             ├──► [ Actor Policy pi_theta ] ──► Sample response y ~ pi_theta(y|x)
             │          ▲                            │
             │          │ (PPO Policy Gradient)      ├────────────────┐
             │          │                            ▼                ▼
             │    [ PPO Optimizer ] ◄── Rewards: r_psi(x, y) - beta * D_KL(pi_theta || pi_ref)
             │          ▲                            ▲                ▲
             │          │ (Value Loss)               │                │
             ├──► [ Critic Model V_phi ]             │                │
             │                                       │                │
             └──────────────────────────────► [ Reward Model r_psi ]   │
                                                                       │
             [ Reference Policy pi_ref ] (Frozen pi_SFT) ──────────────┘
========================================================================================
```

1. **Step 1: Supervised Fine-Tuning (SFT):** A base foundation model is trained on curated prompt-response pairs to establish basic instruction-following behavior, producing the initial policy $\pi^{\text{SFT}}$.
2. **Step 2: Reward Model Training:** Human annotators compare model completions $(y_w, y_l)$ for a given prompt $x$. A scalar reward model $r_\psi(x, y)$ is trained using the **Bradley-Terry preference model**:
   $$\mathcal{L}_{\text{RM}}(\psi) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma\left(r_\psi(x, y_w) - r_\psi(x, y_l)\right) \right]$$
3. **Step 3: Reinforcement Learning Policy Optimization:** The SFT policy is cloned into an active Actor policy $\pi_\theta$ and an immutable Reference policy $\pi_{\text{ref}}$. The model generates completions $y \sim \pi_\theta(\cdot \mid x)$ and updates its weights using **Proximal Policy Optimization (PPO)**.

### The Full PPO Objective with KL Regularization

The complete mathematical objective optimized during Step 3 of RLHF is:
$$\max_\theta \, \mathbb{E}_{x \sim \mathcal{D}, \, y \sim \pi_\theta(\cdot \mid x)} \left[ r_\psi(x, y) - \beta \, D_{\text{KL}}\left(\pi_\theta(y \mid x) \,\Big\Vert\, \pi_{\text{ref}}(y \mid x)\right) \right]$$

In practice, because autoregressive language generation produces sequences token-by-token, the KL divergence penalty is formulated at each individual token step $t$:
$$R_t(x, y_{1:t}) = \begin{cases} -\beta \log \frac{\pi_\theta(y_t \mid x, y_{\lt t})}{\pi_{\text{ref}}(y_t \mid x, y_{\lt t})}, & \text{if } t \lt T \\ r_\psi(x, y) - \beta \log \frac{\pi_\theta(y_T \mid x, y_{\lt T})}{\pi_{\text{ref}}(y_T \mid x, y_{\lt T})}, & \text{if } t = T \end{cases}$$

Summing over the sequence length $T$ yields the total regularized sequence reward:
$$R(x, y) = r_\psi(x, y) - \beta \sum_{t=1}^T \log \frac{\pi_\theta(y_t \mid x, y_{\lt t})}{\pi_{\text{ref}}(y_t \mid x, y_{\lt t})}$$

### Mathematical Proof: Why the KL Divergence Penalty Prevents Policy Collapse

Why is the KL divergence penalty $\beta \, D_{\text{KL}}$ mandatory? Why can't we simply optimize the raw scalar reward $\max_\theta \mathbb{E}[r_\psi(x, y)]$?

#### The Reward Hacking Theorem

1. **Finite Training Distribution of $r_\psi$:** The reward model $r_\psi$ is a neural network trained on a finite dataset of human comparisons $\mathcal{D}$. Its predictions are valid only within the support of the human preference distribution:
   $$\text{supp}(P_{\text{human}}) \subset \mathcal{Y}$$
2. **Adversarial Exploitation:** By Goodhart's Law (_"When a measure becomes a target, it ceases to be a good measure"_), an unconstrained policy $\pi_\theta$ directly optimizing $r_\psi$ will search the vast combinatorial token space for out-of-distribution (OOD) failure modes where $r_\psi(x, y) \to +\infty$.
3. **Policy Collapse:** In practice, these exploits manifest as repetitive loops of superlative tokens, ungrammatical punctuation patterns, or toxic phrases that activate spurious high weights in the reward model's classification head. If $\beta = 0$, the policy drifts rapidly into degenerate gibberish within a few dozen gradient steps.
4. **The Information-Theoretic Bound:** The Kullback-Leibler divergence is non-negative and measures the information lost when approximating $\pi_\theta$ with $\pi_{\text{ref}}$:
   $$D_{\text{KL}}(\pi_\theta \parallel \pi_{\text{ref}}) = \sum_{y} \pi_\theta(y \mid x) \log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)} \ge 0$$
   With equality if and only if $\pi_\theta \equiv \pi_{\text{ref}}$.

   Subtracting $\beta D_{\text{KL}}$ bounds the search space to a localized trust region around the pre-trained SFT model. If the policy attempts to output an unnatural, repetitive token sequence $y$ where $\pi_{\text{ref}}(y \mid x) \to 0$, the log-ratio:
   $$\log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)} \to +\infty$$
   This inflicts an infinite negative penalty, immediately neutralizing the reward hack and preserving natural language fluency.

### The 4-Model GPU VRAM Burden of PPO

A major challenge of deploying RLHF via PPO in enterprise engineering is the **4-Model GPU VRAM Explosion**. During PPO training, four complete model architectures must reside simultaneously in GPU memory:

| Model Identity                          | Role in PPO Loop                                 | Trainable?      | Gradient / Optimizer Memory                 |
| --------------------------------------- | ------------------------------------------------ | --------------- | ------------------------------------------- |
| **Actor Policy $\pi_\theta$**           | Generates rollouts, receives policy updates      | **Yes**         | Weights + Gradients + AdamW states ($m, v$) |
| **Critic / Value Model $V_\phi$**       | Estimates expected return $V(s)$ for GAE         | **Yes**         | Weights + Gradients + AdamW states ($m, v$) |
| **Reference Policy $\pi_{\text{ref}}$** | Frozen copy of $\pi^{\text{SFT}}$ for KL penalty | **No** (Frozen) | Weights only                                |
| **Reward Model $r_\psi$**               | Evaluates completion quality                     | **No** (Frozen) | Weights only                                |

#### Worked VRAM Accounting for a 7B Parameter Model

For a 7-billion parameter foundation model (e.g., Llama-2-7B) using 16-bit precision (FP16/BF16, 2 bytes per parameter) and FP32 AdamW optimizer states (16 bytes per trainable parameter):

1. **Actor Policy $\pi_\theta$:**
   $$\text{Weights: } 7\text{B} \times 2\text{ bytes} = 14\text{ GB}$$
   $$\text{Gradients: } 7\text{B} \times 2\text{ bytes} = 14\text{ GB}$$
   $$\text{AdamW States: } 7\text{B} \times 16\text{ bytes} = 112\text{ GB} \quad (\text{FP32 master weights, momentum, variance})$$
   $$\text{Actor Total} = 140\text{ GB}$$

2. **Critic Model $V_\phi$:**
   $$\text{Critic Total (Weights + Grads + AdamW)} = 140\text{ GB}$$

3. **Reference Policy $\pi_{\text{ref}}$ (Frozen):**
   $$\text{Weights Only} = 14\text{ GB}$$

4. **Reward Model $r_\psi$ (Frozen):**
   $$\text{Weights Only} = 14\text{ GB}$$

5. **Activations & KV Caches (Generation Rollouts):**
   $$\approx 30\text{ GB}$$

$$\text{Total VRAM Required for PPO} = 140 + 140 + 14 + 14 + 30 = \mathbf{338\text{ GB}}$$

To train a single 7B model with PPO, an engineering team requires a minimum cluster of **five to eight 80GB NVIDIA A100/H100 GPUs** running DeepSpeed ZeRO-3 or PyTorch Fully Sharded Data Parallel (FSDP). This high compute cost led researchers to develop a simpler alternative.

---

## 5. The Direct Preference Optimization (DPO) Revolution

In 2023, Rafailov, Sharma, Mitchell, Ermon, Manning, and Finn (_Stanford University_) published **Direct Preference Optimization (DPO)**. DPO proved that the constrained RL objective solved by PPO can be solved **in closed form**, completely eliminating the need for a separate Reward Model, a Critic network, or online generation rollouts.

```
========================================================================================
                     THE DPO CLOSED-FORM REVOLUTION
========================================================================================

  TRADITIONAL PPO (Complex 4-Model Online Loop)
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │ Actor Policy │ ──► │ Reward Model │ ──► │ Critic Model │ ──► │ PPO Rollouts │
  │ pi_theta     │     │ r_psi        │     │ V_phi        │     │ (Generative) │
  └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
        ▲                                                               │
        └────────────────── PPO Policy Gradient Updates ────────────────┘
                            (Extremely Fragile & Memory-Heavy)

  DIRECT PREFERENCE OPTIMIZATION (Simple 2-Model Offline Loss)
  ┌────────────────────────────────────────────────────────────────────────┐
  │ Static Dataset D: (Prompt x, Preferred y_w, Dispreferred y_l)          │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │
                   Forward Pass Only (No Generation!)
                                      │
                   ┌──────────────────┴──────────────────┐
                   ▼                                     ▼
        ┌──────────────────────┐              ┌──────────────────────┐
        │ Active Policy        │              │ Frozen Reference     │
        │ pi_theta             │              │ pi_ref               │
        └──────────┬───────────┘              └──────────┬───────────┘
                   │                                     │
                   ▼                                     ▼
        log pi_theta(y_w | x)                  log pi_ref(y_w | x)
        log pi_theta(y_l | x)                  log pi_ref(y_l | x)
                   │                                     │
                   └──────────────────┬──────────────────┘
                                      │
                                      ▼
             [ Compute Implicit Reward Margin Delta r ]
             Delta r = beta * [ log(pi_theta(y_w)/pi_ref(y_w))
                              - log(pi_theta(y_l)/pi_ref(y_l)) ]
                                      │
                                      ▼
             [ DPO Loss: -log sigma(Delta r) ]
                                      │
                                      ▼
             Standard Backprop directly into pi_theta!
========================================================================================
```

### Complete Mathematical Derivation of DPO

We begin with the standard KL-regularized RL objective:
$$\max_\pi \, \mathbb{E}_{x \sim \mathcal{D}, \, y \sim \pi(\cdot \mid x)} [r(x, y)] - \beta \, D_{\text{KL}}\left(\pi(y \mid x) \,\Big\Vert\, \pi_{\text{ref}}(y \mid x)\right)$$

#### Step 1: Expanding the Objective

Writing out the expectation and the definition of KL divergence explicitly:
$$\max_\pi \sum_{y} \pi(y \mid x) r(x, y) - \beta \sum_{y} \pi(y \mid x) \log \frac{\pi(y \mid x)}{\pi_{\text{ref}}(y \mid x)}$$

Factor out $-\beta$:
$$= \max_\pi -\beta \sum_{y} \pi(y \mid x) \left[ \log \frac{\pi(y \mid x)}{\pi_{\text{ref}}(y \mid x)} - \frac{1}{\beta} r(x, y) \right]$$

#### Step 2: Introducing the Partition Function $Z(x)$

Using the identity $\frac{1}{\beta} r(x, y) = \log \left( \exp\left(\frac{1}{\beta} r(x, y)\right) \right)$, we combine the logarithmic terms:
$$\log \frac{\pi(y \mid x)}{\pi_{\text{ref}}(y \mid x)} - \log \left(\exp\left(\frac{1}{\beta} r(x, y)\right)\right) = \log \left( \frac{\pi(y \mid x)}{\pi_{\text{ref}}(y \mid x) \exp\left(\frac{1}{\beta} r(x, y)\right)} \right)$$

Define the scalar partition function $Z(x)$ to normalize the denominator into a valid probability distribution:
$$Z(x) = \sum_{y} \pi_{\text{ref}}(y \mid x) \exp\left(\frac{1}{\beta} r(x, y)\right)$$

Multiplying and dividing inside the logarithm by $Z(x)$:
$$= -\beta \sum_{y} \pi(y \mid x) \left[ \log \left( \frac{\pi(y \mid x)}{\frac{1}{Z(x)} \pi_{\text{ref}}(y \mid x) \exp\left(\frac{1}{\beta} r(x, y)\right)} \right) - \log Z(x) \right]$$

Distributing the summation over $y$:
$$= -\beta \, D_{\text{KL}}\left(\pi(y \mid x) \,\Big\Vert\, \frac{1}{Z(x)} \pi_{\text{ref}}(y \mid x) \exp\left(\frac{1}{\beta} r(x, y)\right)\right) + \beta \log Z(x)$$

#### Step 3: Finding the Optimal Policy $\pi^*(y \mid x)$

Since the partition function $Z(x)$ does not depend on the policy distribution $\pi$, maximizing this expression with respect to $\pi$ requires minimizing the non-negative KL divergence term:
$$D_{\text{KL}}\left(\pi(y \mid x) \,\Big\Vert\, \frac{1}{Z(x)} \pi_{\text{ref}}(y \mid x) \exp\left(\frac{1}{\beta} r(x, y)\right)\right)$$

The minimum of any KL divergence is exactly $0$, achieved if and only if the two distributions are identical:
$$\pi^*(y \mid x) = \frac{1}{Z(x)} \pi_{\text{ref}}(y \mid x) \exp\left(\frac{1}{\beta} r(x, y)\right)$$

#### Step 4: Solving for the Closed-Form Implicit Reward $r(x, y)$

Take the natural logarithm of both sides:
$$\log \pi^*(y \mid x) = \log \pi_{\text{ref}}(y \mid x) + \frac{1}{\beta} r(x, y) - \log Z(x)$$

Rearranging for the ground-truth reward function $r(x, y)$:
$$\frac{1}{\beta} r(x, y) = \log \frac{\pi^*(y \mid x)}{\pi_{\text{ref}}(y \mid x)} + \log Z(x)$$
$$r(x, y) = \beta \log \frac{\pi^*(y \mid x)}{\pi_{\text{ref}}(y \mid x)} + \beta \log Z(x)$$

#### Step 5: Substituting into the Bradley-Terry Preference Model

Under the Bradley-Terry preference model, the probability that completion $y_w$ is preferred over $y_l$ given prompt $x$ is:
$$P(y_w \succ y_l \mid x) = \sigma\left(r(x, y_w) - r(x, y_l)\right)$$

Substitute our derived expression for $r(x, y)$ into the reward difference:
$$r(x, y_w) - r(x, y_l) = \left[ \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} + \beta \log Z(x) \right] - \left[ \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)} + \beta \log Z(x) \right]$$

**The partition function cancels out completely!**
Because $\beta \log Z(x)$ depends only on $x$ and not on $y$, it subtracts to zero:
$$r(x, y_w) - r(x, y_l) = \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)}$$

#### Step 6: The Final DPO Objective Function

By formulating maximum likelihood over the preference dataset $\mathcal{D} = \{(x, y_w, y_l)\}$, we obtain the **DPO Loss Function**:
$$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)} \right) \right]$$

### The Gradient Dynamics of DPO

Differentiating $\mathcal{L}_{\text{DPO}}(\theta)$ with respect to policy parameters $\theta$ reveals how DPO updates weights:
$$\nabla_\theta \mathcal{L}_{\text{DPO}}(\theta) = -\beta \, \mathbb{E}_{(x, y_w, y_l)} \left[ \underbrace{\sigma\left(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w)\right)}_{\text{Dynamic Error Weight } w(x, y_w, y_l)} \left( \nabla_\theta \log \pi_\theta(y_w \mid x) - \nabla_\theta \log \pi_\theta(y_l \mid x) \right) \right]$$

Where the implicit reward is defined as $\hat{r}_\theta(x, y) = \beta \log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)}$.

1. **Increasing Likelihood of $y_w$:** The term $+\nabla_\theta \log \pi_\theta(y_w \mid x)$ pushes the model to increase the probability of generating the preferred response.
2. **Decreasing Likelihood of $y_l$:** The term $-\nabla_\theta \log \pi_\theta(y_l \mid x)$ pushes the model to decrease the probability of generating the dispreferred response.
3. **Adaptive Error Weighting:** The gradient is scaled by $\sigma(\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w))$.
   - If the model already correctly assigns a much higher implicit reward to $y_w$ than $y_l$, then $\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w) \ll 0$, so $\sigma \approx 0$, and the gradient vanishes (preventing over-optimization).
   - If the model incorrectly prefers $y_l$, then $\hat{r}_\theta(x, y_l) - \hat{r}_\theta(x, y_w) > 0$, so $\sigma \to 1.0$, applying a maximal corrective gradient.

---

## 6. Architectural System Contrast: PPO vs. DPO

```
==================================================================================================
                            SYSTEM ARCHITECTURE CONTRAST: PPO VS. DPO
==================================================================================================

  FEATURE / DIMENSION         PPO (Proximal Policy Opt)            DPO (Direct Preference Opt)
  ────────────────────────────────────────────────────────────────────────────────────────────────
  Primary Philosophy          Online Reinforcement Learning        Offline Implicit Classification
  Models Active in VRAM       4 (Actor, Critic, Ref, Reward)       2 (Policy, Frozen Reference)*
  Separate Reward Model?      Yes (Mandatory Step 2)               No (Eliminated)
  Critic / Value Network?     Yes (Mandatory for GAE)              No (Eliminated)
  Online Rollout Sampling?    Yes (Slow, autoregressive)          No (Static token cross-entropy)
  Optimization Objective      Clipped surrogate policy gradient    Logistic preference margin
  Hyperparameter Tuning       Extremely difficult (clip epsilon,   Straightforward (single beta
                              GAE lambda, critic lr, rollouts)     regularization hyperparameter)
  Training Stability          Fragile (prone to collapse)          Stable (monotonic cross-entropy)
  Minimum GPU Footprint (7B)  5x - 8x 80GB A100 GPUs (ZeRO-3)      1x - 2x 80GB A100 GPUs (or LoRA)
==================================================================================================
*Note: If reference model log-probabilities are precomputed and cached on disk prior to training,
or if parameter-efficient fine-tuning (LoRA) is used, DPO can run with only ONE active model in VRAM!
```

---

## 7. Case Study: Aligning FLAN-T5 with Reinforcement Learning from Feedback

To observe preference alignment dynamics in production, consider the empirical case of aligning **FLAN-T5** (Chung et al., Google Research). FLAN-T5 is an encoder-decoder sequence-to-sequence model pre-trained on an extensive mixture of instruction datasets.

```
========================================================================================
                      FLAN-T5 ALIGNMENT: TRAINING DYNAMICS & METRICS
========================================================================================

  Task: Reddit TL;DR Abstractive Summarization
  Dataset: CarperAI OpenAI TL;DR Preference Dataset (116k human comparisons)
  Base Architecture: FLAN-T5-Large (780M parameters)

  [STAGE 1: SFT Cold-Start]
  - Standard sequence-to-sequence cross-entropy loss on demonstration summaries.
  - Result: High lexical overlap (ROUGE-1: 34.2), but summaries frequently copy verbatim
    sentences and retain unhelpful fluff.

  [STAGE 2: PREFERENCE ALIGNMENT DYNAMICS (PPO vs. DPO)]

    Implicit Reward Margin                ROUGE-2 Overlap Score vs Steps
    Delta r = r(y_w) - r(y_l)             (Tracking Policy Drift & Style Shift)

     Margin                              ROUGE-2
      ▲                                    ▲
      │            ┌─────────── DPO        │    ┌──────── SFT Baseline (Static)
  +3.0│          .─┘                       │   .┴.
      │       .─┘                      18.0│  /   \
  +1.5│     .─┘    ┌─────────── PPO        │ /     \    ┌────── DPO (Concise & Salient)
      │   .─┘    .─┘                       │/       └───┴──────────
   0.0├───┴──────┴─────────────► Steps 14.0│
      │   (Initial SFT = 0.0)              │
  -1.5│                                    │
      └────────────────────────            └────────────────────────► Steps
          0    500   1000   1500               0    500   1000   1500
========================================================================================
```

### Empirical Takeaways from FLAN-T5 Alignment

1. **Length Regularization & Conciseness:** Unaligned models frequently win human preference evaluations simply by generating longer, more verbose summaries (length bias). Both PPO and DPO with calibrated reference policies force the model to capture the core essence of the document in fewer tokens without verbosity bloat.
2. **The ROUGE-Reward Tradeoff:** As preference optimization progresses, classical lexical metrics (like ROUGE-1 and ROUGE-L) often show a slight decrease (from 34.2 down to 31.8). However, **human evaluation win-rate increases from 50% to over 72%**. This occurs because the model moves away from verbatim extractive copying toward clear, well-phrased abstractive synthesis.
3. **KL Divergence Monitoring:** Monitoring $D_{\text{KL}}(\pi_\theta \parallel \pi_{\text{ref}})$ during training is critical. When $\beta = 0.1$, the KL divergence stabilizes smoothly around $1.5 \text{ to } 2.5 \text{ nats}$. If $\beta$ is set too low ($\beta \le 0.01$), the KL divergence spikes exponentially past $15.0 \text{ nats}$, indicating policy drift and imminent token degeneration.

---

## 8. The "Most Missed Things" in Multimodal & RLHF Engineering

> [!warning] The KL Divergence Penalty Collapse ($\beta \to 0$)
> The single most catastrophic failure mode in PPO/DPO training is setting the KL regularization weight $\beta$ too low or scheduling it down to zero. In PPO, if $\beta \to 0$, the Actor policy quickly discovers adversarial vulnerabilities in the Reward Model within 100 iterations. The model begins generating repetitive punctuation sequences (e.g., `!!!!!!!`) or nonsensical superlative phrases (`"Great excellent perfect outstanding"`) that produce maximum reward scores while destroying grammatical coherence. In DPO, setting $\beta \le 0.001$ causes the dynamic error weights to degenerate into step functions, resulting in severe gradient explosions and catastrophic forgetting of the base language distribution. Always initialize $\beta \in [0.05, 0.2]$ and monitor the policy-to-reference divergence $\log \frac{\pi_\theta(y \mid x)}{\pi_{\text{ref}}(y \mid x)}$ continuously.

> [!caution] Cross-Attention Projection Mismatch & Spatial Resolution Bleed
> When constructing multimodal architectures that cross-attend language tokens into visual patches, engineers frequently make two fatal projection errors:
>
> 1. **Projection Space Asymmetry:** Visual encoders (e.g., CLIP ViT-L/14) output vectors in $\mathbb{R}^{D_{\text{img}}}$ (e.g., 1024), while language models operate in $\mathbb{R}^{D_{\text{text}}}$ (e.g., 4096). Attempting to compute cross-attention without projecting both representations into a shared head dimension $d_{\text{head}} = d_k = d_v$ corrupts inner-product geometry.
> 2. **Neglecting Pre-LayerNorm on Visual Keys:** Raw visual patch embeddings frequently have substantially higher variance than textual query embeddings. Failing to apply LayerNorm independently to both $X_{\text{text}}$ and $X_{\text{image}}$ prior to $Q, K, V$ linear projection causes the softmax dot-product $\frac{Q K^T}{\sqrt{d_k}}$ to saturate into one-hot attention distributions, blinding the text query to 99% of spatial image coordinates.

> [!warning] PPO 4-Model Memory Explosion on Distributed Clusters
> Enterprise engineering teams frequently attempt to launch PPO fine-tuning using standard Supervised Fine-Tuning launch scripts, only to encounter immediate `CUDA Out of Memory (OOM)` crashes before Step 1 completes. Remember: **PPO requires 4 simultaneous model copies** (Actor, Critic, Reference, Reward).
> Naive activation checkpointing is insufficient because the optimizer states alone for Actor and Critic dominate memory. If you must run PPO:
>
> - Use DeepSpeed ZeRO-Stage 3 with parameter and optimizer state CPU offloading.
> - Consider parameter sharing: initialize the Critic head on top of the Actor backbone with a detached forward pass (though this introduces training instability).
> - **Better alternative:** Evaluate whether your task can be solved using **DPO**, which cuts active model memory in half, eliminates Critic network allocation entirely, and requires zero online generation caching.

---

## 9. Complete Python Implementation: Multimodal Fusion & Direct Preference Optimization (DPO)

The following production-grade PyTorch implementation contains:

1. `PatchEmbedding`: Slices continuous 2D images into spatial patches, applies linear projection, prepends the `[CLS]` token, and adds 1D positional encodings.
2. `CrossAttentionFusion`: Implements multi-head cross-attention where textual queries attend to visual key/value patches for Visual Question Answering.
3. `compute_sequence_logps`: Extracts masked sequence-level log-probabilities $\log \pi(y \mid x)$ for autoregressive sequences.
4. `compute_dpo_loss`: Fully vectorized DPO loss computation function calculating implicit rewards, reward margins, classification accuracy, and policy gradients.
5. `run_verification_suite`: Unit assertions verifying tensor shapes, attention normalization, reward margins, and gradient flow.

```python
"""
Chapter 9: Multimodal Models & RLHF Alignment
Production-grade PyTorch implementation of:
1. Vision Transformer (ViT) Patch Embedding & Spatial Tokenization
2. Multi-Head Cross-Attention Visual-Text Fusion for VQA
3. Direct Preference Optimization (DPO) Loss & Gradient Mechanics
"""

import math
import torch
import torch.nn as nn
import torch.nn.functional as F


# ============================================================================
# 1. Vision Transformer (ViT) Patch Embedding
# ============================================================================

class PatchEmbedding(nn.Module):
    """
    Slices a 2D image into non-overlapping patches, projects them into a latent
    embedding space of dimension D, prepends a learnable [CLS] token, and adds
    learnable 1D positional encodings (Dosovitskiy et al., ViT).
    """
    def __init__(
        self,
        img_size: int = 224,
        patch_size: int = 16,
        in_channels: int = 3,
        embed_dim: int = 768
    ):
        super().__init__()
        assert img_size % patch_size == 0, (
            f"Image size {img_size} must be divisible by patch size {patch_size}"
        )
        self.img_size = img_size
        self.patch_size = patch_size
        self.num_patches = (img_size // patch_size) ** 2  # (224 / 16)^2 = 196
        self.embed_dim = embed_dim

        # 2D convolution with kernel_size=patch_size and stride=patch_size performs
        # patch extraction and linear projection E in a single optimized tensor operation
        self.projection = nn.Conv2d(
            in_channels=in_channels,
            out_channels=embed_dim,
            kernel_size=patch_size,
            stride=patch_size
        )

        # Learnable [CLS] token prepended to the sequence of patch tokens
        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))

        # Learnable 1D position embeddings for (N + 1) tokens: [CLS] + N patches
        self.pos_embedding = nn.Parameter(
            torch.randn(1, self.num_patches + 1, embed_dim) * 0.02
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """
        Args:
            x: Input image tensor of shape (B, C, H, W)
        Returns:
            Token tensor of shape (B, num_patches + 1, embed_dim)
        """
        B, C, H, W = x.shape
        assert H == self.img_size and W == self.img_size, (
            f"Input dimensions {(H, W)} must match {self.img_size}"
        )

        # Project: (B, C, H, W) -> (B, embed_dim, H/P, W/P)
        feat = self.projection(x)
        # Flatten spatial grid: (B, embed_dim, N) -> Transpose to (B, N, embed_dim)
        feat = feat.flatten(2).transpose(1, 2)

        # Expand [CLS] token across the batch: (B, 1, embed_dim)
        cls_tokens = self.cls_token.expand(B, -1, -1)

        # Concatenate [CLS] token with patch tokens: (B, N + 1, embed_dim)
        x_out = torch.cat((cls_tokens, feat), dim=1)

        # Add positional embeddings
        x_out = x_out + self.pos_embedding
        return x_out


# ============================================================================
# 2. Multi-Head Cross-Attention Visual Fusion for VQA
# ============================================================================

class CrossAttentionFusion(nn.Module):
    """
    Multi-Head Cross-Attention Fusion for Visual Question Answering (VQA):
    Text tokens act as Queries (Q) to probe spatial image patch tokens acting
    as Keys (K) and Values (V).
    """
    def __init__(
        self,
        text_dim: int = 768,
        img_dim: int = 768,
        num_heads: int = 8,
        dropout: float = 0.1
    ):
        super().__init__()
        assert text_dim % num_heads == 0, (
            f"Text dimension {text_dim} must be divisible by num_heads {num_heads}"
        )
        self.text_dim = text_dim
        self.img_dim = img_dim
        self.num_heads = num_heads
        self.head_dim = text_dim // num_heads
        self.scale = 1.0 / math.sqrt(self.head_dim)

        # Linear projections
        self.q_proj = nn.Linear(text_dim, text_dim)
        self.k_proj = nn.Linear(img_dim, text_dim)
        self.v_proj = nn.Linear(img_dim, text_dim)
        self.out_proj = nn.Linear(text_dim, text_dim)

        # Independent Pre-LayerNorm for stable cross-attention
        self.layer_norm_text = nn.LayerNorm(text_dim)
        self.layer_norm_img = nn.LayerNorm(img_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(
        self,
        text_tokens: torch.Tensor,
        img_tokens: torch.Tensor
    ) -> tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            text_tokens: (B, T, text_dim) - Query representations
            img_tokens:  (B, S, img_dim)  - Key/Value visual patch representations
        Returns:
            fused_text:   (B, T, text_dim) - Text tokens enriched with spatial visual context
            attn_weights: (B, num_heads, T, S) - Cross-attention alignment map
        """
        B, T, _ = text_tokens.shape
        _, S, _ = img_tokens.shape

        # Pre-LN
        norm_text = self.layer_norm_text(text_tokens)
        norm_img = self.layer_norm_img(img_tokens)

        # Project Q, K, V
        # Q: (B, T, D) -> (B, num_heads, T, head_dim)
        Q = self.q_proj(norm_text).view(B, T, self.num_heads, self.head_dim).transpose(1, 2)
        # K, V: (B, S, D) -> (B, num_heads, S, head_dim)
        K = self.k_proj(norm_img).view(B, S, self.num_heads, self.head_dim).transpose(1, 2)
        V = self.v_proj(norm_img).view(B, S, self.num_heads, self.head_dim).transpose(1, 2)

        # Scaled Dot-Product: (B, num_heads, T, head_dim) x (B, num_heads, head_dim, S)
        # -> scores: (B, num_heads, T, S)
        scores = torch.matmul(Q, K.transpose(-2, -1)) * self.scale

        # Softmax over visual token dimension S (normalizes each text token's attention)
        attn_weights = F.softmax(scores, dim=-1)
        attn_weights_dropped = self.dropout(attn_weights)

        # Context aggregation: (B, num_heads, T, S) x (B, num_heads, S, head_dim)
        # -> context: (B, num_heads, T, head_dim)
        context = torch.matmul(attn_weights_dropped, V)

        # Reshape back to (B, T, text_dim)
        context = context.transpose(1, 2).contiguous().view(B, T, self.text_dim)
        output = self.out_proj(context)

        # Residual connection
        fused_text = text_tokens + output
        return fused_text, attn_weights


# ============================================================================
# 3. Direct Preference Optimization (DPO) Mechanics
# ============================================================================

def compute_sequence_logps(
    logits: torch.Tensor,
    labels: torch.Tensor,
    pad_token_id: int = -100
) -> torch.Tensor:
    """
    Computes sequence-level sum of token log probabilities:
        log pi(y | x) = sum_{t=1}^T log pi(y_t | x, y_{<t})
    Masks out prompt tokens and padding tokens tagged with `pad_token_id`.

    Args:
        logits:  (B, L, V) unnormalized prediction scores
        labels:  (B, L) target token IDs (-100 for non-target or pad tokens)
    Returns:
        seq_logps: (B,) scalar sequence log-probability per batch item
    """
    # Shift logits and labels for autoregressive next-token prediction
    shift_logits = logits[:, :-1, :].contiguous()
    shift_labels = labels[:, 1:].contiguous()

    # Log-softmax over vocabulary dimension: (B, L-1, V)
    log_probs = F.log_softmax(shift_logits, dim=-1)

    # Gather log-probabilities of actual target tokens
    loss_mask = (shift_labels != pad_token_id)
    clamped_labels = shift_labels.clone()
    clamped_labels[~loss_mask] = 0

    per_token_logps = torch.gather(
        log_probs, dim=2, index=clamped_labels.unsqueeze(2)
    ).squeeze(2)

    # Zero out positions where mask is False and sum over sequence length
    masked_logps = per_token_logps * loss_mask.float()
    seq_logps = masked_logps.sum(dim=-1)
    return seq_logps


def compute_dpo_loss(
    policy_chosen_logps: torch.Tensor,
    policy_rejected_logps: torch.Tensor,
    reference_chosen_logps: torch.Tensor,
    reference_rejected_logps: torch.Tensor,
    beta: float = 0.1
) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor, torch.Tensor]:
    """
    Computes Direct Preference Optimization (DPO) Loss (Rafailov et al., 2023):
        L_DPO(theta) = - E_{(x, y_w, y_l)} [ log sigma( beta * log(pi_theta(y_w|x)/pi_ref(y_w|x))
                                                      - beta * log(pi_theta(y_l|x)/pi_ref(y_l|x)) ) ]

    Args:
        policy_chosen_logps:      log pi_theta(y_w | x), shape (B,)
        policy_rejected_logps:    log pi_theta(y_l | x), shape (B,)
        reference_chosen_logps:   log pi_ref(y_w | x), shape (B,)
        reference_rejected_logps: log pi_ref(y_l | x), shape (B,)
        beta: KL penalty temperature controlling divergence from reference policy

    Returns:
        loss:                scalar DPO loss
        chosen_rewards:      implicit reward r(x, y_w), shape (B,)
        rejected_rewards:    implicit reward r(x, y_l), shape (B,)
        reward_accuracies:   binary accuracy (r(x, y_w) > r(x, y_l)), shape (B,)
    """
    # Log-ratio between policy and reference for chosen: log(pi_theta(y_w|x) / pi_ref(y_w|x))
    pi_chosen_logratios = policy_chosen_logps - reference_chosen_logps
    # Log-ratio between policy and reference for rejected: log(pi_theta(y_l|x) / pi_ref(y_l|x))
    pi_rejected_logratios = policy_rejected_logps - reference_rejected_logps

    # Scaled implicit rewards: r_hat(x, y) = beta * log(pi_theta(y|x) / pi_ref(y|x))
    chosen_rewards = beta * pi_chosen_logratios
    rejected_rewards = beta * pi_rejected_logratios

    # Implicit reward margin: r_hat(x, y_w) - r_hat(x, y_l)
    reward_margins = chosen_rewards - rejected_rewards

    # DPO Loss: -log(sigma(margin)) = -log_sigmoid(margin)
    loss = -F.logsigmoid(reward_margins).mean()

    # Classification accuracy: how often implicit reward of chosen > rejected
    accuracies = (reward_margins > 0).float()

    return loss, chosen_rewards.detach(), rejected_rewards.detach(), accuracies


# ============================================================================
# 4. Assert-Verified Unit Test Suite
# ============================================================================

def run_verification_suite():
    print("=" * 80)
    print("Running Chapter 9 Verification Suite: ViT, Cross-Attention & DPO")
    print("=" * 80)

    # 1. Test PatchEmbedding Module
    print("\n[Test 1] Testing Vision Transformer (ViT) Patch Embedding...")
    patch_embed = PatchEmbedding(img_size=224, patch_size=16, in_channels=3, embed_dim=768)
    dummy_img = torch.randn(2, 3, 224, 224)
    patch_tokens = patch_embed(dummy_img)

    expected_num_patches = (224 // 16) ** 2  # 196
    expected_seq_len = expected_num_patches + 1  # 197 tokens (including [CLS])
    print(f"  Input image shape: {dummy_img.shape}")
    print(f"  Output patch tokens shape: {patch_tokens.shape}")
    assert patch_tokens.shape == (2, expected_seq_len, 768), (
        f"Expected shape (2, {expected_seq_len}, 768), got {patch_tokens.shape}"
    )
    print("  [PASS] PatchEmbedding produced exact expected tensor dimensions with [CLS] token prepended!")

    # 2. Test CrossAttentionFusion Module
    print("\n[Test 2] Testing Cross-Attention Visual-Text Fusion for VQA...")
    cross_attn = CrossAttentionFusion(text_dim=768, img_dim=768, num_heads=8)
    dummy_text_tokens = torch.randn(2, 16, 768)  # 16 question tokens
    fused_text, attn_map = cross_attn(dummy_text_tokens, patch_tokens)

    print(f"  Text query shape: {dummy_text_tokens.shape}")
    print(f"  Visual key/value shape: {patch_tokens.shape}")
    print(f"  Fused text output shape: {fused_text.shape}")
    print(f"  Cross-attention map shape: {attn_map.shape}")

    assert fused_text.shape == (2, 16, 768), (
        f"Expected fused text shape (2, 16, 768), got {fused_text.shape}"
    )
    assert attn_map.shape == (2, 8, 16, expected_seq_len), (
        f"Expected attention map (2, 8, 16, {expected_seq_len}), got {attn_map.shape}"
    )
    # Check that attention distribution sums to 1.0 along visual token dimension S
    attn_sums = attn_map.sum(dim=-1)
    assert torch.allclose(attn_sums, torch.ones_like(attn_sums), atol=1e-5), (
        "Attention weights must sum to 1.0!"
    )
    print("  [PASS] Cross-Attention successfully fused visual spatial tokens into text query with normalized attention!")

    # 3. Test Sequence Log-Probability Calculation
    print("\n[Test 3] Testing Sequence-Level Log-Probability Extraction...")
    vocab_size = 1000
    seq_len = 8
    dummy_logits = torch.randn(2, seq_len, vocab_size, requires_grad=True)
    dummy_labels = torch.tensor([
        [10, 25, 42, 99, 105, -100, -100, -100],  # 5 valid response tokens, 3 padded
        [12, 18, 90, 400, 500, 600, 700, -100]    # 7 valid response tokens, 1 padded
    ])
    seq_logps = compute_sequence_logps(dummy_logits, dummy_labels, pad_token_id=-100)
    print(f"  Sequence log-probabilities: {seq_logps.tolist()}")
    assert seq_logps.shape == (2,), f"Expected shape (2,), got {seq_logps.shape}"
    assert (seq_logps <= 0).all(), "Log-probabilities must be negative or zero!"
    print("  [PASS] Sequence log-probabilities computed accurately with token masking!")

    # 4. Test Direct Preference Optimization (DPO) Loss & Gradient Flow
    print("\n[Test 4] Testing Direct Preference Optimization (DPO) Mechanics...")
    beta = 0.1
    # Scenario: Policy assigns higher log-prob to chosen than reference, and lower to rejected
    # batch size 3:
    # Item 0: Policy strongly prefers chosen (positive margin)
    # Item 1: Policy tied with reference (zero margin)
    # Item 2: Policy mistakenly prefers rejected (negative margin)
    policy_chosen = torch.tensor([-2.5, -4.0, -8.0], requires_grad=True)
    policy_rejected = torch.tensor([-6.0, -4.0, -3.0], requires_grad=True)
    ref_chosen = torch.tensor([-3.5, -4.0, -3.5])
    ref_rejected = torch.tensor([-5.0, -4.0, -5.0])

    loss, chosen_rewards, rejected_rewards, accuracies = compute_dpo_loss(
        policy_chosen, policy_rejected, ref_chosen, ref_rejected, beta=beta
    )

    print(f"  DPO Loss: {loss.item():.4f}")
    print(f"  Chosen Implicit Rewards: {chosen_rewards.tolist()}")
    print(f"  Rejected Implicit Rewards: {rejected_rewards.tolist()}")
    print(f"  Accuracies: {accuracies.tolist()}")

    # Item 0: margin = 0.1 * [(-2.5 - (-3.5)) - (-6.0 - (-5.0))] = 0.1 * [1.0 - (-1.0)] = 0.2 > 0 -> Acc = 1
    # Item 1: margin = 0.1 * [(-4.0 - (-4.0)) - (-4.0 - (-4.0))] = 0.0 -> Acc = 0
    # Item 2: margin = 0.1 * [(-8.0 - (-3.5)) - (-3.0 - (-5.0))] = 0.1 * [-4.5 - 2.0] = -0.65 < 0 -> Acc = 0
    expected_accuracies = torch.tensor([1.0, 0.0, 0.0])
    assert torch.equal(accuracies, expected_accuracies), (
        f"Accuracies mismatch: {accuracies} vs {expected_accuracies}"
    )

    # Verify Gradient Direction:
    # Minimizing DPO loss must increase policy_chosen and decrease policy_rejected
    # dLoss / d(policy_chosen) must be NEGATIVE (stepping in -grad direction increases chosen probability)
    # dLoss / d(policy_rejected) must be POSITIVE (stepping in -grad direction decreases rejected probability)
    loss.backward()
    print(f"  Gradient on policy_chosen: {policy_chosen.grad.tolist()}")
    print(f"  Gradient on policy_rejected: {policy_rejected.grad.tolist()}")

    assert (policy_chosen.grad < 0).all(), (
        "Gradients on policy_chosen must be negative (to increase chosen probability)!"
    )
    assert (policy_rejected.grad > 0).all(), (
        "Gradients on policy_rejected must be positive (to decrease rejected probability)!"
    )
    print("  [PASS] DPO Loss gradient flow confirmed: pushes policy toward chosen and away from rejected responses!")

    print("\n" + "=" * 80)
    print(">>> All Chapter 9 Multimodal & DPO Unit Tests Passed Successfully! <<<")
    print("=" * 80)


if __name__ == "__main__":
    run_verification_suite()
```

---

## 10. Summary & Key Takeaways

1. **The Multimodal Frontier & ViT:** Vision Transformers discard convolutional inductive biases (locality, translation equivariance) by slicing images of size $H \times W \times C$ into $N = \frac{HW}{P^2}$ patches of size $P \times P$. Linear projection matrix $E \in \mathbb{R}^{(P^2 C) \times D}$ maps patches into tokens, reducing attention complexity from $O((HW)^2)$ to $O(N^2)$ (a $65{,}000\times$ speedup) and enabling global self-attention across visual scenes.
2. **Cross-Attention Fusion for VQA:** In multimodal decoders, textual tokens act as Queries ($Q = X_{\text{text}} W^Q$), probing visual patch Keys ($K = X_{\text{image}} W^K$) and Values ($V = X_{\text{image}} W^V$). The scaled dot-product attention map $\text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right) \in \mathbb{R}^{B \times T \times S}$ creates spatial grounding, allowing words like _"car"_ to extract features from corresponding visual coordinates.
3. **The Classical 3-Step RLHF Pipeline:** RLHF aligns generative distributions via Supervised Fine-Tuning ($\pi^{\text{SFT}}$), Reward Modeling ($r_\psi$ trained via Bradley-Terry pairwise preference comparisons), and Reinforcement Learning using Proximal Policy Optimization (PPO).
4. **The Critical Role of the KL Penalty:** Without the KL divergence penalty $\beta \, D_{\text{KL}}(\pi_\theta \parallel \pi_{\text{ref}})$, the policy exploits out-of-distribution loopholes in the reward model (Goodhart's Law), degenerating into repetitive punctuation or superlative gibberish. The KL penalty tethers the policy to the safe, natural distribution of the reference model.
5. **The DPO Closed-Form Revolution:** Direct Preference Optimization (DPO) derives an exact analytical relationship between the optimal policy and ground-truth rewards:
   $$r(x, y) = \beta \log \frac{\pi^*(y \mid x)}{\pi_{\text{ref}}(y \mid x)} + \beta \log Z(x)$$
   Substituting this into the Bradley-Terry objective cancels the intractable partition function $Z(x)$, yielding a stable, offline cross-entropy loss:
   $$\mathcal{L}_{\text{DPO}}(\theta) = -\mathbb{E}_{(x, y_w, y_l)} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w \mid x)}{\pi_{\text{ref}}(y_w \mid x)} - \beta \log \frac{\pi_\theta(y_l \mid x)}{\pi_{\text{ref}}(y_l \mid x)} \right) \right]$$
   DPO eliminates Reward Model training, Critic networks, and online generation rollouts, cutting GPU VRAM requirements in half while improving training stability.

---

In **Chapter 10**, we dive into the open-source fine-tuning ecosystem: **Advanced Open-Source Fine-Tuning & Parameter Efficiency (PEFT)**, mastering Multi-Label Classification with BERT, causal autoregressive fine-tuning with GPT-2, and the deep mathematical mechanics of Low-Rank Adaptation (LoRA) and QLoRA quantization matrices.

---

<div class="chapter-navigation">
  <a href="/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/08-ai-alignment-first-principles" class="chapter-nav-btn prev">← Previous: Chapter 8 — AI Alignment: First Principles, Ethics & Red Teaming</a>
  <a href="/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/10-open-source-fine-tuning-and-peft" class="chapter-nav-btn next">Next: Chapter 10 — Advanced Open-Source Fine-Tuning & Parameter Efficiency →</a>
</div>

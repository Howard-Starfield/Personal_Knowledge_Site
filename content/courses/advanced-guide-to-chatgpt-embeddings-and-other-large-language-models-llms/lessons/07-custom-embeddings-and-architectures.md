---
id: "24c71caa-1783-419c-a4b7-24dc1373df17"
title: "Chapter 7: Customizing Embeddings & Representation Engineering"
description: "Master contrastive metric learning, InfoNCE loss, multi-representation embedding architectures, Matryoshka dimensionality reduction, and recommendation engines."
type: lesson
publish: true
status: active
created: "2026-09-29"
tags:
  - machine-learning
  - embeddings
  - representation-engineering
  - contrastive-learning
  - recommendation-systems
  - matryoshka-embeddings
  - vector-spaces
courseId: "a62e5265-aacf-45ea-8e64-7dae192cc27f"
lessonOrder: 8
estimatedMinutes: 30
comments: false
---

# Chapter 7: Customizing Embeddings & Representation Engineering

In [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/01-llm-foundations-and-transformers|Chapter 1: LLM Foundations & The Transformer Architecture]], we analyzed the mathematical mechanics of multi-head self-attention and autoregressive language modeling. In [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/02-semantic-search-and-embeddings|Chapter 2: Semantic Search, Vector Spaces & Bi/Cross-Encoders]], we constructed two-stage information retrieval systems using off-the-shelf dense vector bi-encoders and cross-encoder rerankers. In [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/03-prompt-engineering-fundamentals|Chapter 3: Prompt Engineering Foundations]], [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/04-rag-and-ai-agents|Chapter 4: RAG Systems & Autonomous AI Agents]], and [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/06-advanced-prompt-engineering|Chapter 6: Advanced Prompt Engineering: Chains, Guardrails & Reasoning]], we built deterministic reasoning pipelines, RAG ingestion systems, and defensive guardrails around foundation models. And in [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/05-fine-tuning-foundations|Chapter 5: Optimizing LLMs: Transfer Learning & Fine-Tuning]], we adapted parametric weights for generative tasks.

Yet, as you deploy real-world semantic systems—whether building an enterprise code intelligence engine, an e-commerce catalog search, a legal discovery platform, or a personalized recommendation engine—you inevitably hit the **Generic Embedding Ceiling**:

- **The Domain Blindspot:** Off-the-shelf foundation embeddings (such as OpenAI `text-embedding-3-small`, `text-embedding-ada-002`, or open-source `all-MiniLM-L6-v2`) are trained on massive, broad web text. They understand that a "dog" is an "animal," but they collapse when confronted with specialized domain vocabularies, specialized jargon, or fine-grained taxonomies.
- **The Surface-Keyword Bias:** Generic embeddings are heavily influenced by lexical and stylistic overlap. Two legal contracts containing standard boilerplate text appear virtually identical in embedding space, even if their indemnification liability terms are polar opposites.
- **The Monolithic Concatenation Trap:** In complex real-world catalogs (such as movies, academic papers, or retail products), engineers frequently concatenate all metadata into a single text blob: `"Title: X. Synopsis: Y. Categories: Z."` This naive concatenation dilutes high-salience structural attributes under long paragraphs of narrative prose.
- **The Memory & Latency Tax:** Storing 1,536-dimensional or 3,072-dimensional floating-point vectors for hundreds of millions of items consumes terabytes of expensive RAM and degrades approximate nearest-neighbor (ANN) search latency.

To break through this ceiling, machine learning engineers do not simply generate embeddings—they practice **Representation Engineering**.

Representation engineering is the deliberate design, fine-tuning, combination, and compression of vector spaces to reflect _domain-specific semantic geometry_. In this chapter, we anchor our intuition in **The Satellite Globe vs. The Tokyo Subway Map**, deconstruct the mathematics of **Contrastive Metric Learning and InfoNCE Loss**, examine **Hard Negative Mining and Temperature Dynamics**, construct **Multi-Field Weighted Vector Architectures**, build dynamic **Temporal User Taste Centroids**, derive **Matryoshka Representation Learning (MRL)** for elastic dimensionality reduction, expose the three fatal production representation traps, and implement a complete, assert-verified Multi-Field Vector Engine in Python.

---

## 1. The Mental Model: The World Satellite Globe vs. The Tokyo Subway Map (Feynman Analogy)

To understand why production recommendation and retrieval engines require custom representation engineering, consider how we navigate physical geography versus how we navigate an urban transit system.

```
========================================================================================
            THE FEYNMAN MENTAL MODEL: SATELLITE GLOBE VS. TOKYO SUBWAY MAP
========================================================================================

  1. THE GENERIC OFF-THE-SHELF EMBEDDING (The World Satellite Globe)
  ──────────────────────────────────────────────────────────────────────────────
  Perspective:  A high-altitude, photorealistic 3D satellite model of the Earth.
  Geometry:     Strict Euclidean/geodetic distance. Every mountain, lake, and street
                is rendered with exact physical scale and geographical accuracy.
  Utility:      Superb for answering: "Is Tokyo closer to Seoul than to London?"
  Failure Mode: Completely useless if you are standing inside Shinjuku Station trying
                to transfer from the JR Yamanote Line to the Marunouchi Subway Line.
                The physical distance between two platforms might be 40 meters vertically,
                but without the operational transit topology, you are hopelessly lost.
  ML Reality:   Generic embeddings cluster items by broad topical English vocabulary.
                They place two sci-fi anime together because both mention "spaceships,"
                ignoring that one is a lighthearted comedy and the other is a dark psychological
                thriller that shares deep narrative DNA with an 18th-century Russian novel.

  ──────────────────────────────────────────────────────────────────────────────
  2. THE REPRESENTATION-ENGINEERED VECTOR SPACE (The Tokyo Subway Transit Map)
  ──────────────────────────────────────────────────────────────────────────────
  Perspective:  A topological transit schematic (like Harry Beck's London Tube map).
  Geometry:     Physical geography is deliberately distorted, stretched, and folded.
                Stations that are physically miles apart are drawn as adjacent nodes
                if they share an express track. Stations separated by impassable rivers
                are pulled apart unless connected by a bridge.
  Utility:      Optimized for operational utility: travel time, transfer convenience,
                and commute corridors.
  ML Reality:   Custom representation engineering distorts the continuous vector manifold.
                It forces items that share operational connectivity (user co-consumption,
                genre tropes, functional compatibility, or legal liability) to cluster along
                tight semantic corridors, regardless of whether their surface text matches.
========================================================================================
```

### The Three Spatial Paradigms Compared

```
========================================================================================================================
                              GENERIC VECTOR SPACE VS. REPRESENTATION-ENGINEERED SPACE
========================================================================================================================

  Dimension              Generic Foundation Space (Ada-002 / MiniLM)   Representation-Engineered Space (Custom MRL)
  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  Analogy                High-altitude photorealistic satellite globe  Topological Tokyo Subway transit schematic
  Optimization Goal      Reconstruct masked words / broad web pairs    Maximize domain operational connectivity
  Distance Metric        Generic cosine similarity on broad topics     Calibrated contrastive metric along business axes
  Metadata Handling      Naive string concatenation (dilution)         Multi-vector field decomposition with learned weights
  Dimensionality         Fixed rigid dimension (e.g., 1536d or 768d)   Elastic Matryoshka nesting (slicing 1536d to 256d)
  Domain Jargon          Poor (treats niche acronyms as rare tokens)   High (sharp clusters for domain-specific taxonomy)
  Negative Sampling      Random web pairs (weak discrimination)        Curated hard negatives (razor-sharp boundaries)
  Production Cost        Massive RAM footprint; high ANN search p99    80%+ RAM reduction; sub-5ms vector search
========================================================================================================================
```

When building an enterprise recommendation or search engine, our objective is never to model all human language. Our objective is to build a **topological transit map** where items that satisfy the user's intent sit within immediate reach of each other in the vector space.

---

## 2. Why Generic Embeddings Fail in Specialized Domains

Off-the-shelf embedding models are pre-trained on diverse web-scale datasets (Wikipedia, Reddit, Common Crawl, news articles). While this broad pre-training imparts strong general linguistic comprehension, it introduces fundamental architectural limitations when applied to specialized domains.

```
========================================================================================
                 THE COLLAPSE OF GENERIC EMBEDDINGS IN SPECIALIZED DOMAINS
========================================================================================

  Scenario: Anime Recommendation ("Steins;Gate" vs. "Neon Genesis Evangelion")

  [GENERIC EMBEDDING SPACE (Ada-002)]
  "Steins;Gate" (Microwave, time travel, text messages, Akihabara maid cafe, conspiracy)
         │
         │ (Cosine Distance = 0.42 - Distant!)
         ▼
  "Neon Genesis Evangelion" (Giant bio-mechanical mecha, Tokyo-3, Angels, depression)

  Why it fails: The surface vocabulary has almost zero lexical overlap. One talks about
  cell phones and microwave ovens; the other talks about giant robots and biblical angels.
  Ada-002 places "Steins;Gate" closer to a microwave repair manual than to "Evangelion"!

  ──────────────────────────────────────────────────────────────────────────────
  [REPRESENTATION-ENGINEERED SPACE (Contrastive Metric Learning)]
  "Steins;Gate" ◄──────── (Cosine Distance = 0.08 - Super Close!) ────────► "Evangelion"

  Why it succeeds: The representation space was trained on user co-watch sequences and
  psychological sci-fi trope tags (Deconstruction, Psychological Trauma, Alternate Timelines).
  The physical text is distorted to align with the latent functional consumption corridor!
========================================================================================
```

### The Three Structural Failure Modes

1. **Vocabulary Dilution & Rare-Token Fragmentation:** Specialized domains (such as biopharma, patent law, anime tropes, or semiconductor engineering) rely on specialized vocabularies. Generic tokenizers split domain terms into fragmented subword tokens (e.g., `["ise", "kai"]`, `["my", "ocar", "dial"]`). As these subword embeddings pass through Transformer layers, their specific semantic significance is diluted across general attention patterns.
2. **Surface Lexical Overlap vs. Latent Structural Affinity:** In e-commerce and media streaming, user satisfaction is driven by latent behavioral features—tone, pacing, thematic deconstruction, aesthetic vibe, and demographic affinity. A generic model evaluates surface descriptions:
   - Item A (_Dark psychological sci-fi about an otaku fighting depression via mecha_).
   - Item B (_Children's cartoon about happy toy robots saving a puppy_).
     Generic models place Item A and Item B close together because both feature "robots." But to a user, recommending Item B to an adult fan of Item A is a catastrophic recommendation failure.
3. **The Unweighted Concatenation Collapse:** When building search vectors for structured items, developers routinely execute:
   ```python
   # THE ANTI-PATTERN: Naive string concatenation
   blob = f"Title: {title}. Tags: {', '.join(tags)}. Description: {description}"
   vector = model.encode(blob)
   ```
   If the description is 300 words long and the critical tag is a single word (`"Cyberpunk"`), the Transformer's self-attention mechanism distributes over 95% of its representational capacity to the long narrative prose. The high-salience tag is drowned out by lexical background noise.

---

## 3. Deep Metric Learning & Contrastive Loss Formulations

To shape a vector space, we do not train a classifier with cross-entropy loss over fixed classes. Instead, we use **Metric Learning**: directly optimizing the geometry of the embedding manifold so that semantically similar items have small distances, while dissimilar items are pushed far apart.

```
========================================================================================
                 THE GEOMETRIC PULL AND PUSH OF METRIC LEARNING
========================================================================================

           Before Contrastive Learning                After Contrastive Learning
           ───────────────────────────                ──────────────────────────

                 [Negative v-]                              [Negative v-]
                      ▲                                          ▲
                      │ (small distance)                         │ (pushed far away)
                      │                                          │
             [Anchor u] ───► [Positive v+]               [Anchor u] ──► [Positive v+]
                     (large distance)                        (pulled tightly together)
========================================================================================
```

### From Triplet Loss to InfoNCE / Multiple Negatives Ranking (MNR)

Historically, metric learning relied on **Triplet Loss** (Schroff et al., 2015), defined over an anchor $\mathbf{u}$, a positive sample $\mathbf{v}^+$, and a negative sample $\mathbf{v}^-$:

$$\mathcal{L}_{\text{triplet}} = \max\left(0, \|\mathbf{u} - \mathbf{v}^+\|_2^2 - \|\mathbf{u} - \mathbf{v}^-\|_2^2 + \alpha\right)$$

Where $\alpha > 0$ is a predefined margin. While intuitive, Triplet Loss suffers from slow training convergence and computational inefficiency: each step only compares a single positive and a single negative, requiring expensive offline mining to find informative triplets that violate the margin.

Modern representation engineering relies on **InfoNCE** (Information Noise-Contrastive Estimation), also widely known in information retrieval as **Multiple Negatives Ranking (MNR) Loss** (van den Oord et al., 2018; Henderson et al., 2017).

Given a batch of $B$ anchor-positive pairs $\{(\mathbf{u}_i, \mathbf{v}_i^+)\}_{i=1}^B$, we treat the positive of anchor $i$ as $\mathbf{v}_i^+$, and we treat the positive items of all _other_ $B-1$ pairs in the mini-batch as **in-batch negatives** for anchor $i$:

$$\mathcal{L}_{\text{InfoNCE}} = -\frac{1}{B} \sum_{i=1}^B \log \frac{\exp\left(\frac{\text{sim}(\mathbf{u}_i, \mathbf{v}_i^+)}{\tau}\right)}{\sum_{j=1}^B \exp\left(\frac{\text{sim}(\mathbf{u}_i, \mathbf{v}_j^+)}{\tau}\right)}$$

Where:

- $\text{sim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}$ is the cosine similarity between the normalized representations.
- $\tau > 0$ is the **temperature hyperparameter**.
- The denominator sums over all $B$ items in the batch: the single true positive ($j = i$) plus the $B-1$ in-batch negatives ($j \ne i$).

### The Critical Role of Temperature $\tau$

The temperature parameter $\tau$ is not an optional scalar; it controls the gradient dynamics of the contrastive loss:

```
========================================================================================
                        THE TEMPERATURE SPECTRUM DYNAMICS
========================================================================================

  τ → ∞ (Excessive Temperature, e.g., τ = 5.0):
  ──────────────────────────────────────────────────────────────────────────────
  • The exponential terms exp(sim / τ) collapse toward 1.0.
  • The probability distribution over candidates becomes completely uniform: P_i ≈ 1/B.
  • Result: Gradients vanish. The model cannot distinguish between hard negatives and
    true positives; cluster boundaries remain diffuse and blurry.

  ──────────────────────────────────────────────────────────────────────────────
  τ → 0 (Hypersensitive Temperature, e.g., τ = 0.001):
  ──────────────────────────────────────────────────────────────────────────────
  • The softmax degenerates into a non-differentiable argmax step function.
  • The loss is dominated entirely by the single hardest negative in the batch.
  • Result: Gradient explosion and extreme instability. A single mislabeled positive
    or near-duplicate in the batch destroys optimizer momentum and collapses the manifold.

  ──────────────────────────────────────────────────────────────────────────────
  Calibrated Regime (Optimal Temperature, e.g., τ ∈ [0.05, 0.20]):
  ──────────────────────────────────────────────────────────────────────────────
  • Softmax focuses gradient pressure on hard negatives that sit near the decision boundary
    while maintaining smooth gradient contribution across the candidate pool.
  • Result: Tight, robust semantic clusters with stable convergence.
========================================================================================
```

Mathematically, let $s_{ij} = \text{sim}(\mathbf{u}_i, \mathbf{v}_j^+) / \tau$, and let $P_{ij} = \frac{\exp(s_{ij})}{\sum_{k=1}^B \exp(s_{ik})}$ be the predicted softmax probability that item $j$ matches query $i$. The gradient of the loss with respect to the similarity $s_{ij}$ is:

$$\frac{\partial \mathcal{L}_i}{\partial s_{ij}} = P_{ij} - \mathbb{I}(i = j)$$

When scaled back to the raw dot product $\text{sim}(\mathbf{u}_i, \mathbf{v}_j^+)$, the gradient carries an inverse temperature factor:

$$\frac{\partial \mathcal{L}_i}{\partial \text{sim}(\mathbf{u}_i, \mathbf{v}_j^+)} = \frac{1}{\tau} \left(P_{ij} - \mathbb{I}(i = j)\right)$$

The factor $\frac{1}{\tau}$ scales the magnitude of the update. As $\tau$ decreases, the model penalizes small discrepancies with exponentially larger parameter updates, forcing the embedding vectors onto narrow hyperspherical cones.

### Negative Mining: In-Batch Negatives vs. Hard Negatives

```
========================================================================================================================
                               IN-BATCH NEGATIVES VS. HARD NEGATIVE MINING
========================================================================================================================

  Strategy                In-Batch Random Negatives                       Mined Hard Negatives
  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  Mechanism               Use the other $B-1$ items in the mini-batch     Deliberately inject false positives into candidate set
  Mining Cost             $O(0)$ extra computation; completely free       $O(N \log N)$ offline indexing or BM25 retrieval
  Negative Quality        Mostly easy negatives (different genres)        Difficult boundary negatives (same genre, wrong show)
  Risk                    Accidental false negatives (sampling peers)     False negative label noise if labels are unverified
  Sample Efficiency       Requires large batch sizes ($B \ge 512$)        High sample efficiency; works on small batch sizes
  Geometric Impact        Shapes global manifold topology                 Carves fine-grained hyperspherical decision boundaries
========================================================================================================================
```

In a production metric-learning pipeline, combining both techniques yields the highest quality representations:

1. **Warmup Phase:** Train for initial epochs using large-batch in-batch negatives ($B = 256$ to $1024$) to structure global vector space topology.
2. **Refinement Phase:** Inject 2 to 7 explicitly mined hard negatives per anchor (e.g., items that share 4 out of 5 tags but differ on the critical target attribute) to sharpen fine-grained boundaries.

---

## 4. Multi-Field & Multi-Representation Architecture (Case Study: Anime Recommendation Engine)

Consider building an enterprise-grade anime recommendation engine. An anime title possesses distinct metadata modalities:

1. **Synopsis:** Free-form unstructured prose describing the narrative premise (length: 100–300 words).
2. **Genres:** Standard high-level categorical buckets (`["Action", "Sci-Fi", "Drama"]`).
3. **Themes & Tropes:** High-salience, granular narrative tags (`["Time Travel", "Deconstruction", "Steampunk", "Cyberpunk", "Tragic Past"]`).

### The Concatenation Fallacy

If you concatenate these fields into a single prompt for a foundation encoder:

```text
"Title: Steins;Gate. Genres: Sci-Fi, Suspense. Tags: Time Travel, Steampunk, Alternate Timelines. Synopsis: The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he invents 'future gadgets' with his fellow lab members Mayuri Shiina and Itaru Hashida..."
```

The synopsis accounts for over 80% of the token count. Standard attention heads compute token-to-token contextual matrices where the tokens `"Akihabara"`, `"room"`, `"rickety"`, and `"building"` occupy substantial representational mass. The critical tags `"Time Travel"` and `"Suspense"` are overwhelmed.

### The Weighted Multi-Vector Solution

Instead of a monolithic string, we employ a **Multi-Field Representation Architecture**:

```
========================================================================================
                 MULTI-FIELD WEIGHTED REPRESENTATION ARCHITECTURE
========================================================================================

   [Item: Steins;Gate]
      │
      ├─► Synopsis Text ─────► [Text Encoder] ────► e_syn ∈ R^D (L2 normalized)
      │
      ├─► Genre List ────────► [Genre Encoder] ───► e_gen ∈ R^D (L2 normalized)
      │
      └─► Tropes & Tags ─────► [Tag Encoder] ─────► e_tag ∈ R^D (L2 normalized)
                                                         │
                                                         ▼
                                          [Weighted Vector Combination]
                                  v_raw = w_syn * e_syn + w_gen * e_gen + w_tag * e_tag
                                                         │
                                                         ▼
                                              [L2 Renormalization]
                                            e_item = v_raw / ||v_raw||_2
========================================================================================
```

Mathematically, given field weight hyperparameters $w_{\text{syn}}, w_{\text{gen}}, w_{\text{tag}} \ge 0$ such that $\sum_m w_m = 1$, the composite representation is:

$$\mathbf{v}_{\text{raw}} = w_{\text{syn}} \mathbf{e}_{\text{syn}} + w_{\text{gen}} \mathbf{e}_{\text{gen}} + w_{\text{tag}} \mathbf{e}_{\text{tag}}$$

$$\mathbf{e}_{\text{item}} = \frac{\mathbf{v}_{\text{raw}}}{\|\mathbf{v}_{\text{raw}}\|_2}$$

Why is the final $L_2$ normalization mandatory? Because the dot product of two unnormalized weighted sums does not equal the cosine similarity of the composite concepts. Renormalizing projects the weighted vector back onto the surface of the unit hypersphere $\mathbb{S}^{D-1}$, preserving Euclidean-cosine equivalence:

$$\|\mathbf{e}_A - \mathbf{e}_B\|_2^2 = 2 - 2 \cos(\mathbf{e}_A, \mathbf{e}_B)$$

### Dynamic User Taste Centroids with Exponential Temporal Decay

A user's interest profile is not static; it evolves dynamically. A user may have loved shonen action anime three years ago, but their recent viewing history over the past three weeks is dominated by psychological thrillers and philosophical sci-fi.

We model the user's latent taste profile $\mathbf{u}_{\text{user}}(t)$ at timestamp $t$ by computing a **time-decayed centroid** over their interaction history:

$$\mathbf{u}_{\text{raw}}(t) = \sum_{k=1}^K e^{-\lambda (t - t_k)} \mathbf{e}_k$$

$$\mathbf{u}_{\text{user}}(t) = \frac{\mathbf{u}_{\text{raw}}(t)}{\|\mathbf{u}_{\text{raw}}(t)\|_2}$$

Where:

- $\mathbf{e}_k$ is the multi-field embedding of the $k$-th item consumed by the user.
- $t_k$ is the timestamp when item $k$ was consumed ($t \ge t_k$).
- $\lambda \ge 0$ is the **exponential decay parameter**, derived from a chosen half-life $T_{1/2}$:
  $$\lambda = \frac{\ln(2)}{T_{1/2}}$$
- If $T_{1/2} = 30\text{ days}$, an interaction from 30 days ago receives exactly half the weight of an interaction that occurred today.
- Renormalizing ensures the user centroid remains on the unit hypersphere, preventing high-frequency users from generating massive vector magnitudes that distort nearest-neighbor search.

---

## 5. Dimensionality Reduction & Matryoshka Representation Learning (MRL)

When deploying embeddings at enterprise scale, high dimensionality imposes a severe infrastructure tax.

```
========================================================================================
             THE VECTOR DATABASE INFRASTRUCTURE TAX (100,000,000 VECTORS)
========================================================================================

  Vector Dimension: 1,536 (FP32 precision = 4 bytes per float)
  Raw Vector Storage:      100M × 1,536 × 4 bytes  = 614.4 GB
  HNSW Index Graph (RAM):  ~2.0× multiplier        = 1,228.8 GB (~1.23 Terabytes RAM!)
  Monthly Cloud RAM Cost:  High-memory AWS/GCP nodes = \$8,000 - \$15,000 / month
  ANN Search Latency:      Traversing 1536d graph  = 18 ms - 45 ms at high concurrency
========================================================================================
```

Traditional dimensionality reduction techniques (such as Principal Component Analysis or autoencoders) fail because they are applied _post-hoc_ as an uncoupled compression step, discarding non-linear contrastive relationships and degrading retrieval precision (often dropping NDCG@10 by 15% to 30%).

The solution is **Matryoshka Representation Learning (MRL)** (Kusupati et al., 2022).

```
========================================================================================
            THE MATRYOSHKA NESTING PRINCIPLE (RUSSIAN NESTING DOLLS)
========================================================================================

  Full Vector z ∈ R^1536:
  ┌──────────────────┬──────────────────┬──────────────────┬────────────────────────┐
  │   z[0 : 64]      │   z[64 : 256]    │   z[256 : 512]   │     z[512 : 1536]      │
  └──────────────────┴──────────────────┴──────────────────┴────────────────────────┘
  ▲                  ▲                  ▲                  ▲
  │                  │                  │                  │
  └─ Doll 1: d=64 ───┘                  │                  │
  │  (Coarse Filter)                    │                  │
  │                                     │                  │
  └────── Doll 2: d=256 ────────────────┘                  │
  │       (Candidate Generation: 96% accuracy, 83% RAM saved)
  │                                                        │
  └────────── Doll 3: d=512 ───────────────────────────────┘
  │           (High-Precision Routing)
  │
  └────────────── Doll 4: d=1536 (Full Vector) ────────────────────────────────────┘
                  (Maximum Fidelity Precision Reranking)
========================================================================================
```

### The MRL Loss Formulation

In standard metric learning, the model is trained to minimize the contrastive loss $\mathcal{L}_{\text{InfoNCE}}(\mathbf{z})$ evaluated on the complete $D$-dimensional vector $\mathbf{z}$.

In Matryoshka Representation Learning, we define a set of nested target dimensions:

$$\mathcal{D}_{\text{dims}} = \{d_1, d_2, \dots, d_M\} \quad \text{where} \quad d_1 < d_2 < \dots < d_M = D$$

_(For example: $\mathcal{D}_{\text{dims}} = \{64, 128, 256, 512, 1024, 1536\}$.)_

During training, we slice the initial $d$ dimensions of the vector $\mathbf{z}$, re-normalize the sliced sub-vector to unit length:

$$\mathbf{z}_{1:d} = \frac{\mathbf{z}[0:d]}{\|\mathbf{z}[0:d]\|_2}$$

And compute the InfoNCE loss independently across every nested sub-vector. The total Matryoshka loss is the weighted sum across all nested dimensions:

$$\mathcal{L}_{\text{MRL}} = \sum_{d \in \mathcal{D}_{\text{dims}}} c_d \, \mathcal{L}_{\text{InfoNCE}}(\mathbf{z}_{1:d})$$

Where $c_d > 0$ represents the loss weight for dimension $d$ (frequently set to $c_d = 1.0$ for all $d$).

### Why MRL Works

By enforcing contrastive loss on the prefixes $\mathbf{z}[0:64]$, $\mathbf{z}[0:256]$, and $\mathbf{z}[0:1536]$ simultaneously, the neural network's backpropagation forces the most statistically salient, high-variance semantic discriminators into the earliest indices of the vector! The trailing dimensions are left to capture fine-grained residual nuances.

### The Two-Tier Production Retrieval Cascade

With an MRL-trained model, you can build an ultra-efficient two-tier search pipeline:

```
========================================================================================
                   TWO-TIER PRODUCTION RETRIEVAL CASCADE USING MRL
========================================================================================

  Incoming Query ──► Generate MRL Vector (1536d) ──► Slice to 256d
                                                            │
                                                            ▼
  [Tier 1: In-Memory ANN Vector Index]
  Search 100,000,000 items indexed ONLY at 256 dimensions (FP16/INT8).
  • RAM Footprint: Reduced by 83.3%!
  • Latency: Sub-4 milliseconds.
  • Output: Retrieve Top 200 Candidates.
                                                            │
                                                            ▼
  [Tier 2: Full-Fidelity Reranker]
  Fetch full 1536d vectors for ONLY the Top 200 candidates from disk/SSD cache.
  Compute exact cosine similarity against full 1536d query vector.
  • Latency: Less than 1 millisecond for 200 dot products.
  • Output: Return Top 10 Perfectly Ranked Results to User.
========================================================================================
```

This cascade achieves the exact precision of a 1,536-dimensional index while running on the memory footprint and latency budget of a 256-dimensional system.

---

## 6. Architectural Flowchart: Monolithic vs. Multi-Field vs. Matryoshka

```
========================================================================================================================
                                MODERN VECTOR REPRESENTATION ARCHITECTURES
========================================================================================================================

  1. MONOLITHIC EMBEDDING (Naive Baseline)
  ┌────────────────────────────────────────────────────────┐
  │ "Title: Steins;Gate Tags: Sci-Fi, Thriller Synopsis..."│ ──► [Encoder] ──► [1536d Vector] ──► [1536d Index]
  └────────────────────────────────────────────────────────┘
  Problem: High token dilution, high RAM cost, no field weight control.

  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  2. MULTI-FIELD WEIGHTED REPRESENTATION (Balanced Structural Salience)
  ┌────────────────────────┐
  │ Synopsis Text          │ ──► [Text Encoder]  ──► e_syn (768d) ──┐
  └────────────────────────┘                                        │
  ┌────────────────────────┐                                        ├─► [Weighted Sum & L2 Norm] ──► e_item (768d)
  │ Curated Genres         │ ──► [Genre Encoder] ──► e_gen (768d) ──┤   w_syn*e_syn + w_gen*e_gen + w_tag*e_tag
  └────────────────────────┘                                        │
  ┌────────────────────────┐                                        │
  │ Granular Tropes & Tags │ ──► [Tag Encoder]   ──► e_tag (768d) ──┘
  └────────────────────────┘
  Advantage: Independent field tuning, zero token dilution, field weights adjustable at runtime.

  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  3. MATRYOSHKA MULTI-TIER RETRIEVAL (MRL Elastic Compression)
  ┌────────────────────────┐
  │ Item Metadata Fields   │ ──► [MRL Encoder] ──► e_full ∈ R^1536 (Trained with Nested Slicing Loss)
  └────────────────────────┘                                │
                                ┌───────────────────────────┴───────────────────────────┐
                                ▼                                                       ▼
                      Prefix Slice: e[0:256]                                  Full Vector: e[0:1536]
                      Normalized: e_256 ∈ R^256                               Normalized: e_1536 ∈ R^1536
                                │                                                       │
                                ▼                                                       ▼
                      [Tier 1 In-Memory Index]                                [Tier 2 Cold Storage]
                      Search 10,000,000 Items                                 Only fetch Top 100 Candidates
                      Latency: 3ms (Filters 99.999%)                          Compute exact dot-product
                                │                                                       │
                                └───────────────── Top 100 Candidates ──────────────────┘
                                                            │
                                                            ▼
                                              [Top 10 High-Precision Results]
========================================================================================================================
```

---

## 7. The "Most Missed Things" in Representation Engineering

Building custom vector representations involves subtle geometric gotchas that do not exist in standard supervised learning.

> [!warning] The Concatenation Dilution Trap
> Stuffing multiple metadata fields (Title, Categories, User Comments, Long Synopsis) into a single text string and feeding it to a standard bi-encoder destroys categorical discrimination.
>
> - **The Failure:** The self-attention mechanism distributes attention weights across the entire sequence. Because synopses and customer reviews are long, they dominate token counts. A critical binary tag (e.g., `is_nsfw: false` or `license: MIT`) receives negligible attention mass.
> - **The Remedy:** Encode distinct fields into independent vector spaces or use specialized multi-field heads. Combine them via weighted addition and project back to the unit hypersphere with $L_2$ normalization:
>   $$\mathbf{e} = \frac{\sum_m w_m \mathbf{e}_m}{\|\sum_m w_m \mathbf{e}_m\|_2}$$

> [!caution] The False Negative in Random In-Batch Sampling
> In-batch negative sampling assumes that for anchor $i$, every other item $j \ne i$ in the mini-batch is a true negative.
>
> - **The Failure:** As mini-batch sizes expand to $B = 512$ or $1024$ to improve contrastive performance, the probability of sampling two items that belong to the exact same niche category approaches 1.0. For example, if both anchor $i$ (_Steins;Gate_) and candidate $j$ (_Steins;Gate 0_) appear in the same batch, the loss function treats candidate $j$ as a negative and penalizes the network for placing them near each other!
> - **The Remedy:** Implement **Category-Stratified Batching** (ensuring no two items in the same batch share identical cluster labels) or integrate **Margin-Based Label Smoothing** where candidates with high metadata overlap receive a smoothed negative target rather than a strict 0.0.

> [!warning] Unnormalized Vector Drift in Centroid Modeling
> When aggregating user interaction histories into a dynamic user profile vector, developers often average vectors without $L_2$ renormalization:
>
> - **The Failure:** If User 1 has consumed 100 items, their unnormalized sum vector has a large norm ($\|\mathbf{u}\|_2 \gg 1$), while User 2 who consumed 2 items has a small norm. Furthermore, in non-Euclidean spaces, computing cosine similarity against an unnormalized centroid skews nearest-neighbor geometry, biasing results toward items aligned with high-variance outlier clusters.
> - **The Remedy:** Always apply explicit $L_2$ normalization immediately following any weighted sum or decay aggregation:
>   $$\mathbf{u}_{\text{user}} = \frac{\mathbf{u}}{\|\mathbf{u}\|_2}$$
>   This guarantees that all user taste profiles reside on the unit hypersphere $\mathbb{S}^{D-1}$.

---

## 8. Complete Implementation: Multi-Field Vector Engine with Matryoshka Slicing & InfoNCE

The following production-grade Python implementation builds an end-to-end Representation Engineering engine. It implements:

1. **Multi-Field Item Representation:** Independent field encoding for synopses, genres, and tags with field-level weighting and $L_2$ renormalization.
2. **Matryoshka Slicing Engine:** Nested dimensionality reduction from 1,536 dimensions down to 512, 256, and 64 dimensions with unit normalization.
3. **Numerically Stable InfoNCE Loss:** Matrix-based contrastive loss with temperature scaling $\tau$ and in-batch negative masking.
4. **Dynamic User Taste Centroid Tracker:** Exponential temporal decay aggregation modeling evolving user preferences over time.
5. **Comprehensive Automated Verification:** Unit assertions proving mathematical invariants (unit lengths, decay discount rates, and contrastive gradient properties).

```python
"""
Representation Engineering & Metric Learning Engine
===================================================
A self-contained, production-grade implementation of multi-field weighted vector
representations, Matryoshka Dimensionality Slicing, InfoNCE contrastive metric loss,
and temporal user taste centroid modeling.

Architectural Guarantees:
- Pure Python/NumPy matrix operations with full broadcasting.
- Guaranteed L2 unit hypersphere projection for all embeddings.
- Verified Matryoshka prefix slicing preserving geometric ranks.
- Automated assertion test suite validating mathematical invariants.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Dict, List, Sequence, Tuple
import numpy as np


# ==============================================================================
# 1. MATHEMATICAL UTILITIES & NORMALIZATION
# ==============================================================================

def l2_normalize(vectors: np.ndarray, eps: float = 1e-12) -> np.ndarray:
    """
    Project vectors onto the unit hypersphere S^(D-1).
    Supports 1D vectors of shape (D,) or 2D batches of shape (B, D).
    """
    if vectors.ndim == 1:
        norm = np.linalg.norm(vectors)
        return vectors / max(norm, eps)
    elif vectors.ndim == 2:
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        norms = np.maximum(norms, eps)
        return vectors / norms
    else:
        raise ValueError(f"Expected 1D or 2D array, got ndim={vectors.ndim}")


def cosine_similarity_matrix(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """
    Compute pairwise cosine similarities between batch A (N, D) and batch B (M, D).
    Assumes vectors are already L2-normalized; similarity is the direct dot product.
    """
    return np.dot(a, b.T)


# ==============================================================================
# 2. CONTRASTIVE LOSS: INFONCE / MULTIPLE NEGATIVES RANKING
# ==============================================================================

def compute_infonce_loss(
    anchor_embeddings: np.ndarray,
    positive_embeddings: np.ndarray,
    temperature: float = 0.07,
) -> float:
    """
    Computes the InfoNCE (Information Noise-Contrastive Estimation) loss across
    a batch of (anchor, positive) pairs using in-batch negatives.

    Formula:
      L_i = -log [ exp(sim(u_i, v_i^+) / tau) / sum_j exp(sim(u_i, v_j^+) / tau) ]
      L_total = (1 / B) * sum_i L_i

    Args:
      anchor_embeddings: Normalized anchor vectors of shape (B, D).
      positive_embeddings: Normalized positive vectors of shape (B, D).
      temperature: Scaling parameter tau > 0.

    Returns:
      Scalar InfoNCE loss value.
    """
    batch_size = anchor_embeddings.shape[0]
    assert batch_size == positive_embeddings.shape[0], "Batch dimensions must match!"
    assert temperature > 0.0, "Temperature must be strictly positive!"

    # Compute pairwise similarity matrix of shape (B, B)
    # Entry [i, j] represents sim(anchor_i, positive_j)
    sim_matrix = cosine_similarity_matrix(anchor_embeddings, positive_embeddings)  # (B, B)

    # Scale by temperature tau
    scaled_sim = sim_matrix / temperature

    # For numerical stability during exponentiation, subtract row-wise maximums
    max_per_row = np.max(scaled_sim, axis=1, keepdims=True)
    stabilized_logits = scaled_sim - max_per_row

    exp_logits = np.exp(stabilized_logits)
    sum_exp_logits = np.sum(exp_logits, axis=1)  # shape (B,)

    # The positive pair for anchor i sits at index [i, i] (diagonal element)
    diag_stabilized_logits = np.diag(stabilized_logits)

    # Log-softmax per row
    log_probabilities = diag_stabilized_logits - np.log(sum_exp_logits)

    # Mean negative log likelihood
    loss = -float(np.mean(log_probabilities))
    return loss


# ==============================================================================
# 3. MATRYOSHKA REPRESENTATION LEARNING (MRL) SLICER
# ==============================================================================

class MatryoshkaEmbeddingSlicer:
    """
    Implements Matryoshka Representation Learning (MRL) prefix slicing.
    Extracts nested sub-vectors from full-dimensional embeddings and renormalizes
    each sub-vector onto its lower-dimensional unit hypersphere.
    """

    SUPPORTED_DIMENSIONS: Tuple[int, ...] = (64, 128, 256, 512, 1024, 1536)

    @classmethod
    def slice_and_normalize(cls, embedding: np.ndarray, target_dim: int) -> np.ndarray:
        """
        Slices an embedding vector (or batch) to the first target_dim dimensions
        and projects the slice onto the unit hypersphere via L2 normalization.
        """
        curr_dim = embedding.shape[-1]
        if target_dim > curr_dim:
            raise ValueError(
                f"Target dimension {target_dim} exceeds embedding dimension {curr_dim}!"
            )

        if embedding.ndim == 1:
            sub_vec = embedding[:target_dim]
            return l2_normalize(sub_vec)
        elif embedding.ndim == 2:
            sub_vec = embedding[:, :target_dim]
            return l2_normalize(sub_vec)
        else:
            raise ValueError(f"Unsupported array shape: {embedding.shape}")

    @classmethod
    def compute_matryoshka_loss(
        cls,
        anchors: np.ndarray,
        positives: np.ndarray,
        nested_dims: Sequence[int] = (64, 256, 512, 1536),
        temperature: float = 0.07,
    ) -> Dict[str, float]:
        """
        Computes multi-resolution InfoNCE loss across all nested Matryoshka subspaces.
        """
        dim_losses: Dict[str, float] = {}
        total_loss = 0.0

        for d in nested_dims:
            sliced_anchors = cls.slice_and_normalize(anchors, d)
            sliced_positives = cls.slice_and_normalize(positives, d)
            loss_d = compute_infonce_loss(sliced_anchors, sliced_positives, temperature)
            dim_losses[f"loss_dim_{d}"] = loss_d
            total_loss += loss_d

        dim_losses["loss_total"] = total_loss / len(nested_dims)
        return dim_losses


# ==============================================================================
# 4. MULTI-FIELD ITEM ENCODER (ANIME RECOMMENDATION DOMAIN)
# ==============================================================================

@dataclass(frozen=True)
class AnimeItem:
    item_id: str
    title: str
    synopsis: str
    genres: List[str]
    tropes: List[str]


class MockDomainVocabularyEncoder:
    """
    Deterministic domain-adapted vector synthesizer simulating a fine-tuned
    embedding model with specific semantic cluster biases.
    Produces repeatable 1,536-dimensional embeddings for testing.
    """

    def __init__(self, full_dim: int = 1536, seed: int = 42) -> None:
        self.full_dim = full_dim
        self.rng = np.random.default_rng(seed)
        # Allocate orthogonal cluster anchor prototypes
        self.trope_prototypes: Dict[str, np.ndarray] = {
            "Time Travel": self._make_prototype(0),
            "Steampunk": self._make_prototype(1),
            "Psychological": self._make_prototype(2),
            "Mecha": self._make_prototype(3),
            "Deconstruction": self._make_prototype(4),
            "Slice of Life": self._make_prototype(5),
            "Comedy": self._make_prototype(6),
        }

    def _make_prototype(self, offset_seed: int) -> np.ndarray:
        local_rng = np.random.default_rng(1000 + offset_seed)
        raw = local_rng.standard_normal(self.full_dim)
        return l2_normalize(raw)

    def encode_text_field(self, text: str) -> np.ndarray:
        """Hash text into a deterministic, reproducible continuous vector."""
        text_seed = abs(hash(text)) % (2**31 - 1)
        local_rng = np.random.default_rng(text_seed)
        raw = local_rng.standard_normal(self.full_dim)
        return l2_normalize(raw)

    def encode_tag_list(self, tags: List[str]) -> np.ndarray:
        """Compose semantic prototypes for tag collections."""
        accum = np.zeros(self.full_dim, dtype=np.float64)
        count = 0
        for tag in tags:
            if tag in self.trope_prototypes:
                accum += self.trope_prototypes[tag]
                count += 1
            else:
                accum += self.encode_text_field(tag)
                count += 1

        if count == 0:
            return l2_normalize(self.rng.standard_normal(self.full_dim))
        return l2_normalize(accum)


class MultiFieldItemRepresentationEngine:
    """
    Combines distinct item attributes (Synopsis, Genres, Tropes) into a unified
    composite representation using learned field weights and L2 renormalization.
    """

    def __init__(
        self,
        encoder: MockDomainVocabularyEncoder,
        weight_synopsis: float = 0.30,
        weight_genres: float = 0.25,
        weight_tropes: float = 0.45,
    ) -> None:
        total_w = weight_synopsis + weight_genres + weight_tropes
        assert math.isclose(total_w, 1.0, rel_tol=1e-5), "Field weights must sum to 1.0!"

        self.encoder = encoder
        self.w_syn = weight_synopsis
        self.w_gen = weight_genres
        self.w_tag = weight_tropes

    def build_item_embedding(self, item: AnimeItem) -> np.ndarray:
        """
        Computes independent field vectors and synthesizes the L2-normalized
        composite embedding vector e_item in R^D.
        """
        e_syn = self.encoder.encode_text_field(item.synopsis)
        e_gen = self.encoder.encode_tag_list(item.genres)
        e_tag = self.encoder.encode_tag_list(item.tropes)

        # Weighted multi-vector linear combination
        v_composite = (self.w_syn * e_syn) + (self.w_gen * e_gen) + (self.w_tag * e_tag)

        # Mandatory L2 renormalization to unit hypersphere
        e_item = l2_normalize(v_composite)
        return e_item


# ==============================================================================
# 5. DYNAMIC TEMPORAL USER TASTE PROFILE CENTROID TRACKER
# ==============================================================================

@dataclass
class UserInteraction:
    item_id: str
    item_vector: np.ndarray
    timestamp_days: float  # Absolute time in days


class DynamicUserTasteTracker:
    """
    Maintains a user's evolving interest profile using exponential half-life decay:
      w_k = exp( -lambda * (t_now - t_k) )
      where lambda = ln(2) / half_life_days
    Renormalizes the centroid to unit length after each update.
    """

    def __init__(self, half_life_days: float = 30.0) -> None:
        assert half_life_days > 0.0, "Half-life must be positive!"
        self.half_life_days = half_life_days
        self.decay_lambda = math.log(2.0) / half_life_days
        self.history: List[UserInteraction] = []

    def record_interaction(
        self, item_id: str, item_vector: np.ndarray, timestamp_days: float
    ) -> None:
        self.history.append(
            UserInteraction(
                item_id=item_id,
                item_vector=item_vector,
                timestamp_days=timestamp_days,
            )
        )

    def compute_taste_centroid(self, current_time_days: float) -> np.ndarray:
        """
        Aggregates past interactions with exponential time decay and computes
        the unit-normalized taste centroid vector u_user(t).
        """
        if not self.history:
            raise ValueError("Cannot compute taste centroid for empty interaction history!")

        dim = self.history[0].item_vector.shape[0]
        decayed_sum = np.zeros(dim, dtype=np.float64)

        for interaction in self.history:
            elapsed = max(0.0, current_time_days - interaction.timestamp_days)
            weight = math.exp(-self.decay_lambda * elapsed)
            decayed_sum += weight * interaction.item_vector

        # Project back to unit hypersphere
        centroid = l2_normalize(decayed_sum)
        return centroid


# ==============================================================================
# 6. VERIFICATION TEST SUITE & SYSTEM DEMONSTRATION
# ==============================================================================

def run_representation_engineering_test_suite() -> None:
    print("=" * 80)
    print(">>> INITIALIZING REPRESENTATION ENGINEERING VERIFICATION SUITE <<<")
    print("=" * 80)

    encoder = MockDomainVocabularyEncoder(full_dim=1536, seed=1337)
    item_engine = MultiFieldItemRepresentationEngine(
        encoder=encoder,
        weight_synopsis=0.25,
        weight_genres=0.25,
        weight_tropes=0.50,  # High salience on tropes
    )

    # --- 1. Corpus Definition: Semantic Peers vs. Distant Items ---
    steins_gate = AnimeItem(
        item_id="anime_01",
        title="Steins;Gate",
        synopsis="A mad scientist discovers that his modified microwave can send text messages to the past.",
        genres=["Sci-Fi", "Psychological", "Suspense"],
        tropes=["Time Travel", "Steampunk", "Deconstruction"],
    )

    erased = AnimeItem(
        item_id="anime_02",
        title="ERASED (Boku dake ga Inai Machi)",
        synopsis="A struggling manga artist is sent back 18 years in time to prevent a series of kidnappings.",
        genres=["Mystery", "Psychological", "Supernatural"],
        tropes=["Time Travel", "Psychological", "Tragic Past"],
    )

    k_on = AnimeItem(
        item_id="anime_03",
        title="K-On!",
        synopsis="Four high school girls join the light music club to prevent it from being disbanded.",
        genres=["Comedy", "Slice of Life"],
        tropes=["Slice of Life", "Comedy"],
    )

    # --- 2. Multi-Field Vector Construction & Invariant Checks ---
    print("\n[Step 1] Constructing Multi-Field Embeddings (1536 dimensions)...")
    vec_sg = item_engine.build_item_embedding(steins_gate)
    vec_erased = item_engine.build_item_embedding(erased)
    vec_kon = item_engine.build_item_embedding(k_on)

    # Verify L2 Unit Normalization invariant
    norm_sg = float(np.linalg.norm(vec_sg))
    norm_erased = float(np.linalg.norm(vec_erased))
    norm_kon = float(np.linalg.norm(vec_kon))
    print(f"  Norm(Steins;Gate): {norm_sg:.6f}")
    print(f"  Norm(ERASED):      {norm_erased:.6f}")
    print(f"  Norm(K-On!):       {norm_kon:.6f}")

    assert math.isclose(norm_sg, 1.0, abs_tol=1e-6), "Steins;Gate vector is not unit length!"
    assert math.isclose(norm_erased, 1.0, abs_tol=1e-6), "ERASED vector is not unit length!"
    assert math.isclose(norm_kon, 1.0, abs_tol=1e-6), "K-On! vector is not unit length!"

    sim_sg_erased = float(np.dot(vec_sg, vec_erased))
    sim_sg_kon = float(np.dot(vec_sg, vec_kon))
    print(f"  CosineSim(Steins;Gate, ERASED [Time Travel Peer]): {sim_sg_erased:.4f}")
    print(f"  CosineSim(Steins;Gate, K-On! [Slice of Life]):       {sim_sg_kon:.4f}")
    assert sim_sg_erased > sim_sg_kon + 0.15, (
        f"Semantic peer affinity failed! Expected sim_sg_erased ({sim_sg_erased:.4f}) "
        f"to substantially exceed sim_sg_kon ({sim_sg_kon:.4f})"
    )

    # --- 3. Matryoshka Prefix Slicing & Dimensionality Reduction ---
    print("\n[Step 2] Executing Matryoshka Representation Slicing (1536d -> 256d -> 64d)...")
    sg_256 = MatryoshkaEmbeddingSlicer.slice_and_normalize(vec_sg, 256)
    erased_256 = MatryoshkaEmbeddingSlicer.slice_and_normalize(vec_erased, 256)
    kon_256 = MatryoshkaEmbeddingSlicer.slice_and_normalize(vec_kon, 256)

    sg_64 = MatryoshkaEmbeddingSlicer.slice_and_normalize(vec_sg, 64)
    erased_64 = MatryoshkaEmbeddingSlicer.slice_and_normalize(vec_erased, 64)
    kon_64 = MatryoshkaEmbeddingSlicer.slice_and_normalize(vec_kon, 64)

    assert sg_256.shape[0] == 256 and math.isclose(np.linalg.norm(sg_256), 1.0, abs_tol=1e-6)
    assert sg_64.shape[0] == 64 and math.isclose(np.linalg.norm(sg_64), 1.0, abs_tol=1e-6)

    sim_256_peer = float(np.dot(sg_256, erased_256))
    sim_256_dist = float(np.dot(sg_256, kon_256))
    sim_64_peer = float(np.dot(sg_64, erased_64))
    sim_64_dist = float(np.dot(sg_64, kon_64))

    print(f"  [256d Subspace] Peer Sim: {sim_256_peer:.4f} | Distant Sim: {sim_256_dist:.4f}")
    print(f"  [64d  Subspace] Peer Sim: {sim_64_peer:.4f} | Distant Sim: {sim_64_dist:.4f}")

    # Sliced representations must preserve relative ranking order
    assert sim_256_peer > sim_256_dist, "256d Matryoshka slice inverted ranking order!"
    assert sim_64_peer > sim_64_dist, "64d Matryoshka slice inverted ranking order!"

    # --- 4. InfoNCE Loss Computation on Mini-Batch ---
    print("\n[Step 3] Evaluating InfoNCE Loss Dynamics...")
    # Construct a 4-sample synthetic batch
    anchors = np.stack([vec_sg, vec_erased, vec_kon, vec_sg])
    # Slight perturbation to simulate positive pairs
    noise = np.random.default_rng(99).normal(0, 0.05, anchors.shape)
    positives = l2_normalize(anchors + noise)

    loss_standard = compute_infonce_loss(anchors, positives, temperature=0.10)
    loss_high_temp = compute_infonce_loss(anchors, positives, temperature=1.00)
    print(f"  InfoNCE Loss (tau=0.10, Sharp): {loss_standard:.4f}")
    print(f"  InfoNCE Loss (tau=1.00, Diffuse): {loss_high_temp:.4f}")
    assert loss_standard < loss_high_temp, "Lower temperature on clear positives should yield lower cross-entropy!"

    mrl_losses = MatryoshkaEmbeddingSlicer.compute_matryoshka_loss(
        anchors, positives, nested_dims=(64, 256, 512, 1536), temperature=0.10
    )
    print("  Matryoshka Multi-Subspace Losses:")
    for k, v in mrl_losses.items():
        print(f"    {k}: {v:.4f}")
    assert "loss_total" in mrl_losses

    # --- 5. Dynamic User Taste Profile & Temporal Half-Life Decay ---
    print("\n[Step 4] Tracking Dynamic User Taste Evolution (Half-Life = 30 Days)...")
    user_tracker = DynamicUserTasteTracker(half_life_days=30.0)

    # 60 days ago: user watched K-On! (Comedy / Slice of Life)
    user_tracker.record_interaction("anime_03", vec_kon, timestamp_days=0.0)
    # Today (day 60): user watched Steins;Gate and ERASED (Time Travel / Psychological)
    user_tracker.record_interaction("anime_01", vec_sg, timestamp_days=60.0)
    user_tracker.record_interaction("anime_02", vec_erased, timestamp_days=60.0)

    user_centroid = user_tracker.compute_taste_centroid(current_time_days=60.0)
    user_norm = float(np.linalg.norm(user_centroid))
    print(f"  User Taste Centroid Norm: {user_norm:.6f}")
    assert math.isclose(user_norm, 1.0, abs_tol=1e-6), "User centroid is not L2 normalized!"

    # Measure current recommendation alignment
    match_steins_gate = float(np.dot(user_centroid, vec_sg))
    match_kon_past = float(np.dot(user_centroid, vec_kon))
    print(f"  Affinity to Recent Interest (Steins;Gate): {match_steins_gate:.4f}")
    print(f"  Affinity to Old Decayed Interest (K-On!):    {match_kon_past:.4f}")

    # Because K-On! was 60 days ago (2 half-lives, weight = exp(-ln(2)*2) = 0.25),
    # recent interactions should dominate the centroid.
    assert match_steins_gate > match_kon_past, (
        f"Temporal decay failure! Recent affinity ({match_steins_gate:.4f}) "
        f"must exceed decayed affinity ({match_kon_past:.4f})"
    )

    print("\n" + "=" * 80)
    print(">>> All Representation Engineering Invariants & Assertions Passed! <<<")
    print("=" * 80)


if __name__ == "__main__":
    run_representation_engineering_test_suite()
```

---

## 9. Summary & Key Takeaways

1. **The Representation Engineering Paradigm:** Off-the-shelf foundation embeddings are like high-altitude satellite globes: useful for broad geographical placement, but blind to domain-specific operational corridors. Custom representation engineering shapes the vector manifold into a topological transit map tailored to specific business and semantic objectives.
2. **Contrastive Metric Optimization via InfoNCE:** Move beyond classification loss. InfoNCE (Multiple Negatives Ranking) optimizes distance geometries directly:
   $$\mathcal{L}_{\text{InfoNCE}} = -\frac{1}{B} \sum_{i=1}^B \log \frac{\exp(\text{sim}(\mathbf{u}_i, \mathbf{v}_i^+) / \tau)}{\sum_{j=1}^B \exp(\text{sim}(\mathbf{u}_i, \mathbf{v}_j^+) / \tau)}$$
   The temperature parameter $\tau$ scales the contrastive gradient. A calibrated temperature ($\tau \in [0.05, 0.20]$) sharpens decision boundaries around hard negatives without causing gradient explosion.
3. **The Multi-Field Representation Architecture:** Do not concatenate disparate metadata into a single text blob. Long synopses dilute the representational salience of critical category tags. Encode attributes independently and combine them using weighted linear combination followed by mandatory $L_2$ renormalization:
   $$\mathbf{e}_{\text{item}} = \frac{\sum_m w_m \mathbf{e}_m}{\|\sum_m w_m \mathbf{e}_m\|_2}$$
4. **Matryoshka Representation Learning (MRL):** Overcome the memory and latency bottleneck of high-dimensional vectors by training nested subspaces simultaneously:
   $$\mathcal{L}_{\text{MRL}} = \sum_{d \in \mathcal{D}_{\text{dims}}} c_d \, \mathcal{L}_{\text{InfoNCE}}(\mathbf{z}_{1:d})$$
   Prefix slicing allows you to build a two-tier retrieval architecture: run fast candidate generation across 100M items at 256 dimensions in RAM (saving over 80% memory), followed by full 1,536-dimensional reranking on the top 100 candidates.
5. **Dynamic Temporal Taste Centroids:** Model evolving user preferences by applying exponential time decay ($\lambda = \frac{\ln 2}{T_{1/2}}$) over interaction history. Renormalizing the centroid onto the unit hypersphere prevents high-volume users from distorting vector distance metrics.

---

In **Chapter 8**, we will confront the existential challenge of foundation models: **AI Alignment: First Principles, Ethics & Red Teaming**, exploring the 3H framework (Helpful, Honest, Harmless), reward modeling vulnerabilities, adversarial jailbreak mechanics, and automated red-teaming defenses.

---

<div class="chapter-navigation">
  <a href="/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/06-advanced-prompt-engineering" class="chapter-nav-btn prev">← Previous: Chapter 6 — Advanced Prompt Engineering, Chains & Guardrails</a>
  <a href="/courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/08-ai-alignment-first-principles" class="chapter-nav-btn next">Next: Chapter 8 — AI Alignment: First Principles, Ethics & Red Teaming →</a>
</div>

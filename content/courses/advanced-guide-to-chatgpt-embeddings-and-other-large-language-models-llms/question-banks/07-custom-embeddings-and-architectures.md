---
id: "f5d2a681-9c47-4e30-8b15-72d0e6c4a9f3"
title: "Chapter 7: Customizing Embeddings & Representation Engineering: Question Bank"
description: "Practice questions for the representation engineering chapter: the generic embedding ceiling, InfoNCE and the role of temperature, in-batch against mined hard negatives, the multi-field weighted architecture, Matryoshka nesting and the two-tier cascade, and the three geometry traps."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/07-custom-embeddings-and-architectures|Chapter 7: Customizing Embeddings & Representation Engineering]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "0b47e9a3-6c15-4d82-9f60-3a8c5e1d7b24"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's satellite-globe versus subway-map analogy, what does the representation-engineered space optimise for?"
    options:
      - id: a
        text: "Operational connectivity between items, distorting geography so functionally related items sit together"
      - id: b
        text: "Exact geographic accuracy, so that the Euclidean distance between two items always matches its true distance"
      - id: c
        text: "Broad topical clustering, so that items sharing vocabulary occupy the same region of the hypersphere"
      - id: d
        text: "Smallest possible vector norms, so that the whole index fits into the available amount of memory"
    correctOptionIds: [a]
    explanation: "a is correct: the transit schematic deliberately stretches and folds physical geography so that stations sharing an express track become adjacent and stations separated by an impassable river are pulled apart, which is the same move as distorting the vector manifold until items that share operational connectivity, co-consumption, genre tropes or legal liability cluster along tight semantic corridors regardless of surface text. b describes the satellite globe, which the lesson says is useless for the operational question, and c describes what the generic space already does badly. Lesson section: The Mental Model: The World Satellite Globe vs. The Tokyo Subway Map."
  - id: "6d20c4f8-3a95-4e17-b8d2-9c5e70f1a6b3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's InfoNCE formulation, what serves as a negative for the anchor in position i of a batch?"
    options:
      - id: a
        text: "Only the explicitly mined hard negatives that are injected into the candidate set for that particular anchor"
      - id: b
        text: "A single negative drawn from outside the mini-batch, because triplet loss compares one positive with one negative"
      - id: c
        text: "The positives of the other B minus 1 pairs in the same mini-batch, with the true positive as the target"
      - id: d
        text: "Every document in the whole corpus, because the loss is computed over the full retrieval index at every step"
    correctOptionIds: [c]
    explanation: "c is correct: the denominator of the InfoNCE term sums over all B items in the batch, so the single true positive is scored against the positives of the other B minus 1 pairs, which serve as in-batch negatives, and those negatives cost nothing extra to obtain but demand large batches, of 512 or more, to be effective. a describes mined hard negatives, which the chapter adds in a refinement phase rather than as the base signal, and b describes triplet loss, which the chapter presents as the slower predecessor. Lesson section: From Triplet Loss to InfoNCE / Multiple Negatives Ranking (MNR)."
  - id: "e83b5a20-7f46-4d09-b5c7-1a4e9d2c6f08"
    revision: 1
    status: active
    type: single-choice
    prompt: "What happens to the contrastive loss as the temperature falls toward zero?"
    options:
      - id: a
        text: "The softmax becomes uniform over the candidate pool, so the gradients vanish and the boundaries stay diffuse"
      - id: b
        text: "The softmax degenerates toward an argmax, so the hardest negative dominates the loss and training destabilises"
      - id: c
        text: "The exponential terms collapse toward one, so every candidate receives an identical probability"
      - id: d
        text: "The inverse temperature factor shrinks towards zero, so the model stops penalising small discrepancies"
    correctOptionIds: [b]
    explanation: "b is correct: at a hypersensitive temperature such as 0.001 the softmax degenerates into a non-differentiable argmax step, the loss is dominated entirely by the single hardest negative in the batch, and one mislabelled positive or near-duplicate destroys the optimiser momentum and collapses the manifold. a and c describe the opposite regime, a very high temperature such as 5.0 where the exponentials collapse toward 1, the distribution becomes uniform and the gradients vanish. d is wrong because the inverse temperature factor grows as the temperature falls, which is what lets the model penalise small discrepancies with exponentially larger updates. Lesson section: The Critical Role of Temperature."
  - id: "2f7d6b93-8c04-4a56-93e1-6b4c0d8a2f75"
    revision: 1
    status: active
    type: single-choice
    prompt: "What distinguishes the Matryoshka loss from the standard contrastive loss?"
    options:
      - id: a
        text: "It adds a regularisation term that pulls the trailing dimensions of the vector steadily toward zero"
      - id: b
        text: "It trains the model to reconstruct the discarded suffix of the vector as an autoencoder would"
      - id: c
        text: "It applies the contrastive loss only to the final full-length vector and ignores the prefixes entirely"
      - id: d
        text: "It computes the contrastive loss on several nested prefixes of the vector and sums them with weights"
    correctOptionIds: [d]
    explanation: "d is correct: the Matryoshka loss is a weighted sum of the InfoNCE loss evaluated independently on each nested prefix of the vector, such as the first 64, 256 and 1536 dimensions, with every prefix renormalized to unit length and a loss weight commonly set to 1.0 for each dimension. a and c describe losses the chapter does not use, and b describes a reconstruction objective that is exactly what the chapter says post-hoc compression throws away. Lesson section: The MRL Loss Formulation."
  - id: "c90a1e47-5b83-4d26-8f14-2e7c6b0d9a31"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson's Matryoshka retrieval cascade actually do?"
    options:
      - id: a
        text: "It indexes every item at 256 dimensions and then re-encodes the top candidates with a larger model"
      - id: b
        text: "It searches an index held at 256 dimensions, then fetches full vectors for the top candidates only"
      - id: c
        text: "It keeps the full 1,536-dimensional index in memory and uses the prefixes only to order the results"
      - id: d
        text: "It stores every item twice, once at 256 dimensions and once at full length, and searches both in parallel"
    correctOptionIds: [b]
    explanation: "b is correct: the query vector is generated at full length and sliced to 256 dimensions, the in-memory index is searched at that reduced width, which cuts the RAM footprint by 83.3% and brings the search under 4 milliseconds, and only then are the full 1,536-dimensional vectors fetched from disk for the top 200 candidates so that the final ranking is computed with exact cosine similarity. a and d invent storage strategies the chapter does not describe, and c describes the memory profile the cascade exists to avoid. Lesson section: The Two-Tier Production Retrieval Cascade."
  - id: "4a6e8d15-0c72-4b39-9f85-1e3d7a2b6c08"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's infrastructure box gives the numbers for 100 million vectors at 1,536 dimensions in FP32. What does it say?"
    options:
      - id: a
        text: "Raw storage is 614.4 GB, the HNSW graph needs roughly twice that in RAM, and the monthly cloud cost is high"
      - id: b
        text: "Raw storage is 61.4 GB, the HNSW graph needs roughly twice that in RAM, and the monthly cloud cost is low"
      - id: c
        text: "Raw storage is 6.1 TB, the HNSW graph needs half that in RAM, and the monthly cloud cost is negligible"
      - id: d
        text: "Raw storage is 614.4 GB, the HNSW graph needs a quarter of that in RAM, and the monthly cloud RAM cost is high"
    correctOptionIds: [a]
    explanation: "a is correct: 100 million vectors times 1,536 dimensions times 4 bytes is 614.4 GB of raw storage, the HNSW index graph adds roughly a 2.0 times multiplier, which is 1,228.8 GB or about 1.23 terabytes of RAM, and the box puts high-memory cloud nodes at $8,000 to $15,000 a month with ANN search latency of 18 to 45 milliseconds at high concurrency. b and c get the arithmetic wrong, and d halves the graph multiplier the chapter states. Lesson section: The Vector Database Infrastructure Tax."
  - id: "b3c8e094-7d16-4a52-8f39-0c6b2e5d7a41"
    revision: 1
    status: active
    type: single-choice
    prompt: "With a 30-day half-life, what weight does an interaction from 30 days ago receive compared with one from today?"
    options:
      - id: a
        text: "Exactly the same weight, because the decay parameter is scaled so that only very old items are discounted"
      - id: b
        text: "Half the weight, because the decay constant is defined directly as one half rather than as a logarithm"
      - id: c
        text: "Double the weight, because old interactions accumulate and the centroid is a running sum over time"
      - id: d
        text: "Half the weight, because the decay factor comes from the logarithm of two over the half-life"
    correctOptionIds: [d]
    explanation: "d is correct: the decay constant is derived from the half-life as the natural logarithm of two divided by the half-life, so the weight of an interaction is the exponential of minus that constant times the elapsed time, and at exactly one half-life the weight is one half. b is wrong about the derivation even though it gives the right number, since the constant is a logarithm rather than the fraction itself. a and c invert the direction of decay. Lesson section: Dynamic User Taste Centroids with Exponential Temporal Decay."
  - id: "1a7f4c60-8d93-4b25-9c07-6e3b8d1f4a27"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three representation traps does the lesson name? Select every correct answer."
    options:
      - id: a
        text: "The concatenation dilution trap, where long prose drowns out a high-salience categorical tag"
      - id: b
        text: "The false negative in random in-batch sampling, where a near-duplicate item is penalised as a negative"
      - id: c
        text: "The vector dimension illusion, where a wider vector does not buy precision without domain adaptation"
      - id: d
        text: "Unnormalized vector drift in centroid modelling, where heavy users end up with huge-norm profiles"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. Packing several fields into one string lets a 300-word synopsis absorb nearly all the attention mass while a one-word tag such as Cyberpunk or a license flag is ignored, sampling two members of the same niche category into one batch treats the second as a negative and penalises the network for placing them near each other, and averaging a heavy user's interaction history without renormalizing leaves that user's profile with a much larger norm than a light user's, which skews cosine comparisons. c is not one of the three named traps. Lesson section: The \"Most Missed Things\" in Representation Engineering."
  - id: "7d5c1b68-2a94-4e30-8f61-b3e0d7a9c4f2"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about Matryoshka Representation Learning are correct? Select every correct answer."
    options:
      - id: a
        text: "The loss is computed on nested prefixes such as 64, 256 and 1,536 dimensions and summed with weights"
      - id: b
        text: "Each prefix is an independently trained embedding model, so the prefix models share no parameters"
      - id: c
        text: "Training on the prefixes pushes the most salient discriminators into the earliest dimensions of the vector"
      - id: d
        text: "A production cascade can hold the index at 256 dimensions and fetch full vectors for only the top candidates"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The Matryoshka loss sums the contrastive loss over nested target dimensions such as 64, 128, 256, 512, 1024 and 1536, and because the prefixes are prefixes of one shared vector, backpropagating through them forces the statistically salient, high-variance semantic discriminators into the earliest indices and leaves the trailing dimensions to capture fine-grained residual nuance. A two-tier cascade then holds the index at 256 dimensions and fetches full vectors only for the top 200 candidates, achieving the precision of a 1,536-dimensional index on the memory and latency budget of a 256-dimensional one. b is wrong because the prefixes come from a single encoder with shared parameters, which is exactly what makes the nesting cheap. Lesson section: Why MRL Works."
  - id: "9c0a6e42-5d18-4b73-8f50-2e7b1a9d6c83"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says a generic embedding places \"Steins;Gate\" far from \"Neon Genesis Evangelion\", at a cosine distance of 0.42, while a representation-engineered space trained on co-watch sequences brings them to 0.08."
    answer: true
    explanation: "True. The lesson's case study uses exactly those figures. In the generic space the two titles have almost zero lexical overlap, since one talks about microwave ovens and text messages and the other about giant robots and biblical angels, so the generic model places Steins;Gate closer to a microwave repair manual than to Evangelion, at a cosine distance of 0.42. In the representation-engineered space, trained on user co-watch sequences and psychological sci-fi trope tags such as deconstruction, psychological trauma and alternate timelines, the distance falls to 0.08, because the physical text is distorted to align with the latent functional consumption corridor. Lesson section: The Collapse of Generic Embeddings in Specialized Domains."
  - id: "f4b8d207-6e35-4c19-a7d3-0b2f9c5e8a16"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the lesson's multi-field weighted representation architecture avoids the concatenation trap, and why the final normalization is mandatory."
    sampleAnswer: "Rather than pasting the synopsis, the genres and the tropes into one string and letting the encoder pool them, the architecture encodes each field on its own: the free-form synopsis through a text encoder, the high-level genre buckets through a genre encoder and the granular tropes through a tag encoder, each producing an L2-normalised vector of dimension D. The composite vector is the weighted sum of the three, with non-negative weights that sum to one, and it is then renormalized. The separation matters because the synopsis can run to 300 words while the decisive tag such as Cyberpunk is a single word, and a single encoder spends nearly all of its representational capacity on the prose, so the high-salience attributes are drowned out. The final L2 normalization is mandatory because the dot product of two unnormalized weighted sums does not equal the cosine similarity of the composite concepts; renormalizing projects the weighted vector back onto the unit hypersphere and restores the identity that the squared Euclidean distance equals 2 minus 2 times the cosine."
    explanation: "A strong answer describes the per-field encoders, the weighted sum with weights that sum to one, the reason the separation beats concatenation, and the geometric reason the last step is not optional. An answer that only says each field gets its own vector has not covered why the final step is not optional."
  - id: "5d31a86f-0b74-4e92-8c05-7e2f9b3d4a61"
    revision: 1
    status: active
    type: free-recall
    prompt: "Set out the training recipe the lesson recommends for a contrastive embedding model: which negatives are used, in what phases, and how the temperature is chosen."
    sampleAnswer: "Metric learning optimises the geometry of the manifold directly rather than fitting a classifier, so the loss pulls the anchor and its positive together while pushing negatives apart. InfoNCE, also called Multiple Negatives Ranking, does this over a batch of B anchor-positive pairs in which the positives of the other B minus 1 pairs act as in-batch negatives for every anchor, which costs nothing extra but needs large batches, of 512 or more, and risks accidental false negatives when two items from the same niche category land in the same batch. The lesson's production recipe has two phases: a warm-up phase training with large in-batch negatives, B between 256 and 1024, to structure the global topology of the space, and then a refinement phase injecting 2 to 7 explicitly mined hard negatives per anchor, items that share four of five tags but differ on the critical attribute, to carve fine-grained decision boundaries. Temperature sets the gradient dynamics: the calibrated regime is 0.05 to 0.20, where the softmax focuses gradient pressure on the hard negatives sitting near the decision boundary while keeping a smooth contribution across the pool; a temperature of 5 makes the exponentials collapse toward 1 and the gradients vanish, while 0.001 degenerates the softmax into an argmax so that a single mislabelled positive or near-duplicate destroys the optimiser momentum."
    explanation: "A strong answer gives both phases with their batch sizes and negative counts, names the temperature regimes with their numbers and their failure modes, and explains why in-batch negatives need large batches. An answer that only states that contrastive learning pulls positives together has not covered the recipe."
```

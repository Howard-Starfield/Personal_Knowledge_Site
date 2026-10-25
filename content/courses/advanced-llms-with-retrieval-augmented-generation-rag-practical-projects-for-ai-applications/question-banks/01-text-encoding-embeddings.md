---
id: "35290d51-73c9-46cd-be64-e5d22f9bae24"
title: "Text Encoding, Tokenization & Vector Embeddings: Question Bank"
description: "Questions that practise tokenization, pooling, normalization and the dimensionality trade-offs behind a production embedding pipeline."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - rag
  - study-guide
  - assessment
  - active-recall
courseId: "51514bd6-585b-4e56-b7b1-3f137e962f3c"
comments: false
---

These questions practise [[courses/advanced-llms-with-retrieval-augmented-generation-rag-practical-projects-for-ai-applications/lessons/01-text-encoding-embeddings|Text Encoding, Tokenization & Vector Embeddings]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "67da2636-670c-47df-907e-d9637f450672"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's cartography analogy scores a query about 'crisp white wine with citrus acidity' against two chunks. Which pair of cosine scores does it report?"
    options:
      - id: wine-and-oil
        text: "0.89 for the Chardonnay chunk and 0.04 for the transmission fluid chunk"
      - id: oil-and-wine
        text: "0.04 for the Chardonnay chunk and 0.89 for the transmission fluid chunk"
      - id: both-high
        text: "0.89 for both chunks, because mean pooling makes unrelated texts look alike"
      - id: mid-range
        text: "0.62 for the Chardonnay chunk and 0.81 for the transmission fluid chunk"
    correctOptionIds: [wine-and-oil]
    explanation: "The Chardonnay chunk with lemon and flint notes sits at cosine 0.89, close to the query on the semantic hypersphere, while the chunk about a transmission fluid change interval is orthogonal at 0.04. The reversed pair puts the unrelated text next to the query, and the 0.95 to 0.99 clustering the lesson mentions belongs to raw [CLS] embeddings in an anisotropically trained BERT, not to this worked case."
  - id: "48f7ffe9-9eb4-4df3-99e8-d8ed8a0ae099"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson reject one-hot encodings for a vocabulary of 50,000 words?"
    options:
      - id: not-normalisable
        text: "Because a one-hot vector cannot be normalized to unit length before cosine scoring"
      - id: zero-inner-product
        text: "Because every pair of distinct words has a zero inner product"
      - id: too-large-array
        text: "Because a 50,000-dimensional vector cannot be stored in a float32 array on disk"
      - id: loses-order
        text: "Because one-hot encoding loses the order in which the words appeared in the text"
    correctOptionIds: [zero-inner-product]
    explanation: "One-hot encoding enforces absolute orthogonal isolation: the inner product of any two distinct words is zero and the Euclidean distance is always sqrt(2), so the model has no mathematical basis to say that chardonnay has more in common with wine than with diesel engine. Storage and word order are not the lesson's argument, and the fix it presents is the distributed representation hypothesis, where meaning is spread across every dimension of a dense vector."
  - id: "9c72a505-28ef-4a12-a522-87069e50d334"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's tokenizer pipeline shows the string 'Unprecedented retrieval latency.' becoming subwords. Which token sequence does it show?"
    options:
      - id: whole-words
        text: "['unprecedented', 'retrieval', 'latency', '.'] with no word split at all"
      - id: wordpiece-prefix
        text: "['un', '##pre', '##cedented', 'retrieval', 'latency', '.']"
      - id: leading-caps
        text: "['Unprecedented', 'retrieval', 'latency', '.'], one token per whitespace word"
      - id: characters
        text: "['U', 'n', 'p', 'r', 'e', 'c', 'e', 'd', 'e', 'n', 't', '.']"
    correctOptionIds: [wordpiece-prefix]
    explanation: "The pipeline shows normalization, pre-tokenization into four pieces, then subword segmentation into ['un', '##pre', '##cedented', 'retrieval', 'latency', '.'] with the ## affix notation marking continuations, before the numerical mapping to token IDs. The whole-word and character sequences are the two extremes the granularity matrix rules out, and the capitalised version ignores the lowercasing step."
  - id: "0cee10d5-25c3-4036-a08f-e0c0407bc10e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Reimers and Gurevych's Sentence-BERT paper is cited in the lesson. What result does it report for raw BERT [CLS] embeddings on STS benchmarks?"
    options:
      - id: spearman-1458
        text: "An average Spearman correlation of 14.48, far below 58.02 for averaging GloVe vectors"
      - id: spearman-swapped
        text: "An average Spearman correlation of 58.02, far below 14.48 for averaging GloVe vectors"
      - id: cosine-cluster
        text: "An average cosine similarity of 0.95 to 0.99 between every pair of unrelated sentences"
      - id: spearman-bge
        text: "An average Spearman correlation of 14.48, far worse than 58.02 for GloVe averaging"
    correctOptionIds: [spearman-bge]
    explanation: "The figure is 14.48, and it is far worse than the 58.02 that simple averaging of static GloVe word vectors achieves, which is the argument for mean pooling and Sentence-BERT. The 0.95 to 0.99 clustering is a separate fact about anisotropy in the raw [CLS] embeddings, and swapping the two correlation values would claim that the static baseline was the weak one."
  - id: "ac818428-61e4-4b02-bda8-b85374f48f17"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson's memory table sizes an index of 1,000,000 chunks. How much RAM does the HNSW index need at 1536 dimensions, and how much at 384?"
    options:
      - id: gb-768-and-192
        text: "7.68 GB at 1536 dimensions and 1.92 GB at 384 dimensions"
      - id: gb-1536-and-192
        text: "15.36 GB at 1536 dimensions and 1.92 GB at 384 dimensions, a factor of eight"
      - id: raw-only
        text: "6.14 GB at 1536 dimensions and 1.54 GB at 384 dimensions"
      - id: gb-768-and-384
        text: "7.68 GB at 1536 dimensions and 3.84 GB at 384 dimensions"
    correctOptionIds: [gb-768-and-192]
    explanation: "The sizing rule RAM = N * d * 4 * 1.25 bytes gives 7.68 GB at 1536 dimensions and 1.92 GB at 384 dimensions for a million chunks. The 6.14 GB and 1.54 GB figures are the raw vectors before HNSW overhead, and 3.84 GB is the 768-dimension total, so each of those belongs to a different row or column of the table."
  - id: "6b3e4878-354a-45bb-82a5-6aa90cf5aaf5"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson warns about calling last_hidden_state.mean(dim=1) in a batch whose longest sequence is 128 tokens. What goes wrong for a 16-token sentence?"
    options:
      - id: encoded-twice
        text: "The sentence is encoded twice, so its vector depends on the batch order it lands in"
      - id: mask-flipped
        text: "The padding tokens are given a non-zero mask, so they join the average"
      - id: divides-by-128
        text: "The mean divides by 128 instead of 16, shrinking the vector magnitude eightfold"
      - id: mask-discarded
        text: "The attention mask is discarded, so the model cannot see the padding at all"
    correctOptionIds: [divides-by-128]
    explanation: "The naive mean divides the sum of token embeddings by 128 instead of 16, shrinking the raw magnitude by 8x, and the 112 padding vectors still produce non-zero rows in the final layer, so they pull the embedding toward a padding centroid. That is also what makes the same sentence embed differently in different batches. The mask is not flipped or discarded here; the bug is precisely that the naive mean ignores it."
  - id: "42dbd0a1-77ac-43ae-84c8-d09b3a610260"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which statement about Matryoshka Representation Learning matches the lesson?"
    options:
      - id: slice-and-renormalise
        text: "You can slice a 1536-dimension vector to 256 dimensions and re-normalize it"
      - id: retrain-required
        text: "You must retrain the model before a vector can be truncated to a smaller size"
      - id: slice-prefix
        text: "You slice to a prefix and re-normalize, cutting storage about sixfold"
      - id: trailing-dimensions
        text: "Only the trailing dimensions are dropped, because they carry the coarse classes"
    correctOptionIds: [slice-prefix]
    explanation: "MRL training packs the coarse, macro-level semantics into the earliest dimensions, so a prefix slice of 256 followed by re-normalization retains more than 97% of retrieval accuracy for about 6x less storage and 5x faster search, with no retraining. The trailing-dimensions answer has it backwards: the later dimensions carry the fine-grained nuance, and the nested losses are over prefixes such as 64, 128, 256 and 512."
  - id: "fa0e0086-0404-4e2e-b286-93c2de3515e4"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the following does the lesson say masked mean pooling avoids? Select every correct answer."
    options:
      - id: padding-noise
        text: "Padding noise from [PAD] tokens, which still produce non-zero hidden states"
      - id: batch-dependence
        text: "Batch-dependent distortion, since the same sentence must embed identically"
      - id: oov-problem
        text: "The OOV problem, because pooling could combine subwords back into whole words"
      - id: attention-cost
        text: "The quadratic cost of self-attention over very long token sequences"
    correctOptionIds: [padding-noise, batch-dependence]
    explanation: "Masked mean pooling multiplies by the attention mask and divides strictly by the mask sum, so the 112 padding vectors are excluded and the same sentence embeds identically whatever else is in the batch. The OOV problem is solved earlier by subword tokenization, and pooling cannot change the quadratic attention cost, which is a property of the encoder layers."
  - id: "bd7eeb46-c9ab-4dd5-9903-351b2af204a2"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these vocabulary facts does the lesson give? Select every correct answer."
    options:
      - id: minilm-wordpiece
        text: "all-MiniLM-L6-v2 uses WordPiece with a vocabulary of 30,522 tokens"
      - id: roberta-byte-bpe
        text: "RoBERTa-style models use Byte-Level BPE and mark whitespace with a dedicated prefix character"
      - id: wordpiece-raw-frequency
        text: "WordPiece merges the pair with the highest raw co-occurrence frequency"
      - id: llama-wordpiece
        text: "LLaMA 3 and modern encoders use a 30,522 token WordPiece vocabulary"
    correctOptionIds: [minilm-wordpiece, roberta-byte-bpe]
    explanation: "The lesson's table gives BERT and all-MiniLM-L6-v2 as WordPiece with 30,522 uncased tokens and ## prefixes, and RoBERTa and all-mpnet-base-v2 as Byte-Level BPE with 50,265 tokens that mark whitespace with a prefix character. WordPiece does not pick the most frequent raw pair, it maximizes the likelihood of the training data under a unigram model, a Pointwise Mutual Information score, and LLaMA 3 uses Byte-Level BPE with 128,256 tokens, not WordPiece."
  - id: "6c208474-cb5f-461f-882a-a6a16a57095f"
    revision: 1
    status: active
    type: true-false
    prompt: "The lesson states that omitting the BGE query instruction prefix degrades retrieval accuracy by up to 8% to 12%."
    answer: true
    explanation: "True. The lesson's Asymmetric Search Blind Spot says BGE queries must be prepended with 'Represent this sentence for searching relevant passages: ' while document chunks are embedded without the prefix, and that leaving it off on an asymmetric model degrades retrieval accuracy by up to 8% to 12%. The reason is that real RAG search is asymmetric, a short question against a long formal passage, which symmetric models trained on STS pairs handle badly."
  - id: "58839c43-74a7-4228-bf10-352e7c67cc23"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain in your own words why the lesson insists on masked mean pooling rather than a plain average over the encoder's output tensor."
    sampleAnswer: "The final hidden state still contains a row for every padding position, because the attention mask only stops valid tokens from attending to padding, it does not erase the padding rows. A plain mean therefore divides by the padded batch length of 128 instead of the 16 real tokens, which shrinks the vector's magnitude about eightfold and drags it toward a padding centroid, and the same sentence then embeds differently depending on what else happened to be in the batch. Masked mean pooling multiplies by the mask and divides by the mask sum, so the result depends only on the real tokens, and it is the pooling that all-MiniLM-L6-v2 and all-mpnet-base-v2 are explicitly fine-tuned for."
    explanation: "A strong answer identifies both defects of the naive mean, that it divides by the padded length of 128 instead of the 16 real tokens and that the 112 padding rows still carry non-zero values and pull the embedding toward a padding centroid, and it states the consequence, that the same sentence embeds differently depending on what else was in the batch. It should then give the fix, multiply by the mask and divide by the mask sum, and note that all-MiniLM-L6-v2 and all-mpnet-base-v2 are fine-tuned for it."
  - id: "b1786ca7-c54e-4fee-820f-40a495c680bd"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, compare what a 384-dimension model and a 3072-dimension model cost you, and explain what the lesson recommends instead of chasing dimensions."
    sampleAnswer: "At 1,000,000 chunks the 384-dimensional index needs about 1.92 GB of RAM, answers in roughly 3.2 ms at about 1,250 queries per second, and runs on a cheap 15 dollar a month instance, while the 3072-dimensional index needs about 15.36 GB, answers in roughly 26.1 ms and manages only about 125 queries per second, an eightfold memory cost and a tenfold throughput collapse. The lesson calls that the Dimension Vanity Fallacy: on MTEB, moving from bge-base-en-v1.5 to text-embedding-3-large buys only 2% to 4% in NDCG@10, whereas contextual chunk enrichment or a cross-encoder reranker routinely delivers 15% to 35%. The recommended lever is Matryoshka Representation Learning, slicing to 128 or 256 dimensions with re-normalization for a two-stage search, or spending the budget on enrichment and reranking instead."
    explanation: "A strong answer compares the two points on the lesson's own table, about 1.92 GB and 3.2 ms at 384 dimensions against about 15.36 GB and 26.1 ms at 3072, and names the resulting eightfold memory cost and tenfold throughput collapse. It should then connect that to the Dimension Vanity Fallacy, the 2% to 4% NDCG@10 gain on MTEB against the 15% to 35% that enrichment or a cross-encoder reranker delivers, and end on the Matryoshka Representation Learning recommendation."
```

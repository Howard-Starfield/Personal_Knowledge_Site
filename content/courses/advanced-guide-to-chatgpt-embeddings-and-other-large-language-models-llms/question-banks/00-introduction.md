---
id: "cf51c8b4-19ad-4d61-8f4a-aad4b1884c02"
title: "Chapter 0: Course Orientation & The LLM Revolution: Question Bank"
description: "Practice questions for the orientation chapter: the sparse-versus-dense mental model, the historical road from n-grams to the Transformer, the autoregressive forward pass, the three modalities of LLM engineering, and the cost and attention realities of production."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/00-introduction|Chapter 0: Course Orientation & The LLM Revolution]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "6cbcfd9c-af18-401e-90f1-cba9c82c583c"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the sparse library-catalog paradigm the lesson describes, why does a document titled \"dog doctor\" stay invisible to a search for \"puppy physician\"?"
    options:
      - id: a
        text: "The two share no exact keyword token, and each word sits in its own orthogonal vocabulary slot"
      - id: b
        text: "The catalog indexes only the first word of a title, so \"doctor\" was never searchable on its own"
      - id: c
        text: "The slot reserved for \"puppy\" holds navigation entries rather than document text, so it cannot be matched"
      - id: d
        text: "The catalog groups every document by publication year, so titles from different years are never shown together"
    correctOptionIds: [a]
    explanation: "a is correct: in the sparse paradigm every word is an orthogonal basis vector in a vocabulary-sized space, so the dot product between two different words is identically zero and only an exact keyword match can connect them. b, c and d are wrong because the lesson attributes the miss to the geometry, not to a rule about which part of a title is indexed or which year a document belongs to. Making synonyms match required hand-built synonym tables, lemmatization pipelines and brittle regular expressions, which is exactly what the dense paradigm removes. Lesson section: The Library Index Card Catalog (The Sparse Era)."
  - id: "d36c8317-cf65-4b84-b5e4-384a795aa9e6"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson's timeline, what did the 2013 Word2Vec work show that the 2001 Bengio model had made impractical?"
    options:
      - id: a
        text: "A recurrent hidden state that carries context forward one token at a time through a single vector"
      - id: b
        text: "The scaled dot-product attention mechanism that lets every token attend to every other token at once"
      - id: c
        text: "Continuous vector geometry learned by log-linear classification over a local sliding window of words"
      - id: d
        text: "A bidirectional encoder that builds one contextual representation for a whole document before decoding it"
    correctOptionIds: [c]
    explanation: "c is correct: Word2Vec removed the hidden nonlinear layer from Bengio's MLP and trained the embeddings directly with a log-linear objective over a local sliding window, which made continuous vector geometry affordable on large corpora and produced the King minus Man plus Woman relation. a describes the recurrent models that came later, b describes the 2017 Transformer, and d describes the encoder-only family that followed it. Lesson section: 2013: Word2Vec (Mikolov et al.)."
  - id: "0f7678cd-f029-4f40-a066-267418ff7312"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson calls static polysemy the fatal flaw of Word2Vec. What does that mean in practice?"
    options:
      - id: a
        text: "Every word had to be added to the vocabulary by hand, so rare words never received a vector at all"
      - id: b
        text: "Every token received exactly one fixed vector, so a riverbank and a savings account shared one entry"
      - id: c
        text: "The vectors were fixed when training began but drifted apart again during each individual forward pass"
      - id: d
        text: "Only the first 10,000 words in the corpus were embedded at all, because the full matrix would not fit in memory"
    correctOptionIds: [b]
    explanation: "b is correct: each token got exactly one fixed vector, so \"bank\" had identical weights whether the text meant a riverbank, a savings institution, or banking an airplane into a turn. a and d invent vocabulary and memory limits the lesson never states, and c is the opposite of what static means, because the whole point of the flaw is that the coordinates do not move with context. Fixing it took attention mechanisms, where a word's coordinates reshape with its surrounding context. Lesson section: 2013: Word2Vec (Mikolov et al.)."
  - id: "60c1198e-9bc6-452f-9365-18cc0c32324f"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson names two catastrophic limitations of the RNN and LSTM sequence-to-sequence architecture. Which pair is it?"
    options:
      - id: a
        text: "A fixed information bottleneck, and a sequential dependency that stopped the time dimension training in parallel"
      - id: b
        text: "Static polysemy in the word vectors, and a dot product between two related words that came out zero"
      - id: c
        text: "A missing positional encoding, and an unembedding matrix whose vocabulary dimension did not match the backbone"
      - id: d
        text: "A fixed-size final hidden vector that washed earlier tokens away, and a sequential dependency on the previous step"
    correctOptionIds: [d]
    explanation: "d is correct: the whole semantic content of a 50-word or 500-word sentence had to be compressed into one final fixed-size hidden vector, so earlier tokens were washed away by vanishing gradients and continual overwriting, and because each hidden state strictly requires the previous one, training could not be parallelised across time. a names the same two problems in different words but is wrong as written, because it swaps the second one for the training-parallelism claim, which belongs to the dependency on the previous step. b names the Word2Vec flaw and c names Transformer components that arrived later. Lesson section: 2014-2017: Seq2Seq, RNNs, and the Compression Bottleneck."
  - id: "483a4d89-cff3-419a-a908-b8642d74be67"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which statement about the Transformer's effect on scale matches the lesson?"
    options:
      - id: a
        text: "It kept recurrence but made each step cheaper by caching the hidden state in GPU memory between steps"
      - id: b
        text: "It removed recurrence entirely, so attention over the packed sequence spread across thousands of GPU cores"
      - id: c
        text: "It kept recurrence and added a second pass over the sequence to recover the tokens the first pass dropped"
      - id: d
        text: "It removed recurrence and replaced it with a fixed-size context vector, which made long sequences cheap to encode"
    correctOptionIds: [b]
    explanation: "b is correct: because the attention calculation depends only on matrix multiplications across the packed sequence tensors, training could be distributed across thousands of GPU cores in parallel, which unblocked scaling parameters and dataset tokens by orders of magnitude. a and c keep recurrence, which the Transformer abolished, and d reintroduces exactly the fixed-size context vector the Transformer was built to escape. Lesson section: 2017: The Transformer Inflection Point."
  - id: "b67f2a96-5212-43f6-8c88-3805d9fa493c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A team reports that the first token of every answer takes two seconds while the rest of the answer streams out quickly. What does the lesson say is happening?"
    options:
      - id: a
        text: "Prefill is compute-bound over the prompt length, and it must finish before the decode phase can begin"
      - id: b
        text: "Decode is memory-bandwidth bound, and it must finish before the prefill phase can begin"
      - id: c
        text: "The model is sampling a very large vocabulary, and the softmax over it is the slow part of prefill"
      - id: d
        text: "The prompt was cached, so prefill was skipped and the delay came from the network round trip instead"
    correctOptionIds: [a]
    explanation: "a is correct: the time to first token is dominated by the prefill phase, where the GPU processes the prompt in parallel and the attention computation is quadratic in prompt length, and that work has to complete before the first token can be decoded. b reverses the order, because decode is the strictly autoregressive phase that comes after prefill, and c and d misplace the cost, since the softmax over the vocabulary is a small part of the forward pass and a cached prompt skips prefill rather than delaying it. Lesson section: Cost and Latency Economics: TTFT vs. ITL."
  - id: "657ca362-8943-4173-8583-0d5704990724"
    revision: 1
    status: active
    type: single-choice
    prompt: "The lesson works through a cost scenario: 8,000 tokens of boilerplate per request, 100,000 queries a day, and $0.005 per 1K input tokens. What does that come to?"
    options:
      - id: a
        text: "$40 a day, because the boilerplate is charged at the output rate rather than the input rate"
      - id: b
        text: "$400 a day, because only the tokens beyond the first 1,000 in each request are billed at all"
      - id: c
        text: "$4,000 a day and $120,000 a month, burned on context prefill rather than on anything the user reads"
      - id: d
        text: "$4,000 a day and $120,000 a month, but the bill comes from the decode phase rather than the prefill phase"
    correctOptionIds: [c]
    explanation: "c is correct: 8,000 tokens multiplied by 100,000 queries gives 800,000,000 tokens, which is 800,000 units of 1,000 tokens, and at $0.005 each that is $4,000 a day, or $120,000 a month. a and b get the arithmetic wrong. d names the right totals but the wrong cause, because the lesson puts this spend squarely on unoptimised context prefill and calls efficient context engineering, caching and model routing financial necessities rather than academic exercises. Lesson section: Cost and Latency Economics: TTFT vs. ITL."
  - id: "f92d3f40-3143-4b41-9200-7fc830e141e9"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson sets out three core modalities of LLM engineering. Which three are they? Select every correct answer."
    options:
      - id: a
        text: "In-context prompting, which steers activations inside frozen weights and modifies 0% of them"
      - id: b
        text: "Dense vector embeddings and retrieval, which adds external geometry to the context and changes no weights"
      - id: c
        text: "Parameter adaptation and supervised fine-tuning, which updates between 0.01% and 100% of the weights"
      - id: d
        text: "Chain-of-Thought scaffolding, which writes a reasoning scratchpad that runs outside the model"
    correctOptionIds: [a, b, c]
    explanation: "a, b and c are the three modalities in the lesson's diagram. In-context prompting steers activations in runtime memory with no weight changes, dense vector retrieval augments the context with external geometry, and parameter adaptation updates the weights themselves through backpropagation. d is wrong because Chain-of-Thought is listed as part of the first modality, where it is one of the prompt structures supplied inside the context window, not a separate mechanism that runs outside the model. Lesson section: The Three Core Modalities of LLM Engineering."
  - id: "ac80ede2-1111-4b1e-9240-c8aa362f0bc7"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The lesson's architectural table names three model families. Which three statements about them are correct? Select every correct answer."
    options:
      - id: a
        text: "Encoder-only models such as BERT use bidirectional attention, so every token sees unmasked context"
      - id: b
        text: "Decoder-only models such as GPT-4 use a causal mask, so a token attends only to positions at or before it"
      - id: c
        text: "Encoder-decoder models such as T5 are the natural choice for free-form generative synthesis"
      - id: d
        text: "Decoder-only models dominate generative AI today because they absorb arbitrary context and scale predictably"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are correct. Encoder-only models use bidirectional attention with an unmasked context and are built for contextual representations and classification, decoder-only models apply causal attention masking and are built for free-form generative synthesis, and they dominate because they absorb arbitrary multimodal context and scale predictably under the Chinchilla scaling laws. c is wrong because the lesson gives strict input-to-output transformation, such as translation, deterministic summarization and grammar correction, as the encoder-decoder superpower, and free-form generation is the decoder-only one. Lesson section: 2018-Present: The Foundation Model Explosion."
  - id: "8e9db959-e62c-46f2-a5cd-0364cf232f34"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson reports that the middle 60% of a long context is where retrieval accuracy is weakest, and that accuracy there can drop by up to 40%."
    answer: true
    explanation: "True. Liu et al. (2023) found a U-shaped performance curve: models are far more adept at retrieving and synthesising information placed at the very beginning, through the primacy effect, or at the very end, through the recency effect, while information buried in the middle 60% of long contexts suffers severe attention degradation with retrieval accuracy dropping by up to 40%. That is why an expanded context window is not a replacement for precise retrieval, and why precision chunking and reranking remain mandatory. Lesson section: Context Window Dilution & The \"Lost in the Middle\" Phenomenon."
  - id: "efb61c62-7caa-444f-83ac-a17189b93a52"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, explain the difference between the sparse library-catalog paradigm and the dense semantic-cartographer paradigm that the lesson uses as its mental model."
    sampleAnswer: "The sparse paradigm gives every word its own orthogonal slot in a vocabulary-sized space and treats a document as a count of those words, so two documents are related only when they share an exact keyword, which is why a title of \"dog doctor\" stays invisible to a search for \"puppy physician\" unless a human hand-builds synonym tables. The dense paradigm projects words, sentences and documents into a continuous space of a few hundred or a thousand dimensions, where angle and distance carry meaning, so semantically close items sit near one another even with no shared token. The lesson adds attention on top of that geometry, so a word's coordinates reshape with its context and \"bank\" in \"river bank\" lands somewhere different from \"bank\" in \"investment bank deposit\"."
    explanation: "A strong answer names both paradigms, draws the orthogonal-versus-continuous distinction with a concrete case, and mentions that attention makes the coordinates context-dependent rather than fixed. An answer that only says the dense approach handles meaning better has not reached the geometry the lesson asks the reader to internalise."
  - id: "cadbd73c-919b-4eb3-aa11-01cb95011eba"
    revision: 1
    status: active
    type: free-recall
    prompt: "A team must choose between in-context prompting, dense vector retrieval, and fine-tuning for a new feature. Explain what each one changes about the model, and what the lesson says each is best at."
    sampleAnswer: "In-context prompting leaves the weights frozen, with 0% of them modified, and buys behaviour with a prompt prefix; it has the lowest upfront engineering cost and suits rapid prototyping, structured schema extraction and deterministic decision trees, but it pays a high recurring token cost on every call and its knowledge is dynamic and per-call. Dense vector retrieval also leaves the weights frozen and adds external geometry through a bi-encoder and an approximate nearest neighbour index; it grounds answers in authoritative documents with query latency under 10 ms and fits knowledge bases and long-term memory, but it is poor at enforcing formatting and style. Fine-tuning updates the weights themselves, between 0.01% and 100% of them, which gives deterministic style and specialized syntax with no prompt overhead at inference, but new knowledge becomes static and needs retraining to change."
    explanation: "A strong answer ties each modality to what it changes, which is nothing, nothing, or the weights, and then to the use the lesson recommends for it and to its cost. An answer that lists the three without saying what each one changes has not reached the trade-off the lesson is drawing."
```

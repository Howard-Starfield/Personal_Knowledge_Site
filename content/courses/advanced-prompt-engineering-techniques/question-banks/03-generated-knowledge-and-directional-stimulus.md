---
id: "1e55e157-f96f-4050-98d1-20baca93a1ac"
title: "Generated Knowledge Prompting & Directional Stimulus Guidance: Question Bank"
description: "Practice questions for the generated-knowledge lesson: the internal knowledge elicitation hypothesis, the two-stage pipeline, plurality ensembling, the pinky toe case study, directional stimulus framing, the Policy-LM architecture, and the production failure modes."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - prompt-engineering
  - study-guide
  - assessment
  - active-recall
courseId: "e0de2644-4dcb-45dc-930d-3584829d4a7d"
comments: false
---

These questions practise [[courses/advanced-prompt-engineering-techniques/lessons/03-generated-knowledge-and-directional-stimulus|Generated Knowledge Prompting & Directional Stimulus Guidance]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "73ed5454-d92e-48d2-8ac7-19927b551faa"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does Generated Knowledge Prompting do before it answers the question?"
    options:
      - id: a
        text: "It retrieves the most similar passages from a vector index over Wikipedia, in the way a retrieval-augmented pipeline does."
      - id: b
        text: "It first elicits factual propositions from the model itself, then answers conditioned on them."
      - id: c
        text: "It fine-tunes the model's weights on a small corpus of facts about the subject matter."
      - id: d
        text: "It passes the question to a separate verifier model before the main model ever sees it."
    correctOptionIds: [b]
    explanation: "Liu et al. (2022) split inference into a prior generation stage and an integration stage: the model samples M knowledge statements K_1 to K_M from P(K given x), and the final answer is drawn from P(y given x, K). The hypothesis behind it is that the model already encodes latent factual webs and that direct question answering fails only because the distribution is dominated by superficial lexical correlations. Retrieving from an external index is the retrieval-augmented approach the lesson sets this against, and the model is never fine-tuned or handed to a separate verifier. Lesson section: Theoretical Foundations & The Knowledge Elicitation Hypothesis."
  - id: "eab4908a-e32c-4a96-a214-16e9260247ef"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did Liu et al. measure for Generated Knowledge Prompting on the commonsense benchmarks?"
    options:
      - id: a
        text: "Accuracy up to +7.3% over direct few-shot prompting, competitive with models twice as large in size."
      - id: b
        text: "Inference latency cut by more than half, because the generated propositions replace a retrieval index entirely and no index has to be kept in sync with the corpus."
      - id: c
        text: "Accuracy on GSM8K raised to 80.2%, matching the champion instruction that OPRO discovered for DeepMind."
      - id: d
        text: "Accuracy up to +7.3% over direct few-shot prompting, competitive with models ten times larger."
    correctOptionIds: [d]
    explanation: "The lesson reports that on benchmarks such as Numerical Reasoning, StrategyQA and CSQA, Generated Knowledge Prompting improved accuracy by up to +7.3% over direct few-shot prompting, and that the result was competitive with models ten times larger. The 80.2% figure belongs to the previous chapter and to the champion instruction that OPRO discovered, and nothing in this architecture reduces the number of model calls, so the latency claim in the wrong answers does not follow. Lesson section: Mathematical Formulation of the Two-Stage Architecture."
  - id: "5b236624-4544-4b61-9e73-74807853969a"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's pinky toe case study, what changes between the direct zero-shot answer and the grounded answer?"
    options:
      - id: a
        text: "The zero-shot answer calls it vestigial; the grounded answer shows it carries load."
      - id: b
        text: "Both answers call the fifth digit vestigial, but the grounded one adds three supporting sentences about primate ancestors."
      - id: c
        text: "The zero-shot answer refuses to answer, and the grounded answer supplies the tripod mechanics, the gait cycle and the over-pronation risk."
      - id: d
        text: "The grounded answer is longer but agrees with the zero-shot answer that amputation would cause only minor discomfort."
    correctOptionIds: [a]
    explanation: "The zero-shot output repeats the cultural myth that the fifth digit is purely vestigial, because the attention mechanism relied on superficial web text that conflates the toe with the appendix. Eliciting three facts first, on tripod stability mechanics, the kinematic gait cycle and the compensatory ground reaction of losing the fifth metatarsal, moves the model to clinical biomechanical analysis: the fifth metatarsal head is the lateral pillar of the tripod alongside the heel and the first metatarsal, and its loss causes over-pronation and stress fractures in the second and third metatarsals. The grounded answer does not merely add sentences, and it does not agree with the myth. Lesson section: Morten's Case Study: Evolutionary Biology of the Pinky Toe."
  - id: "7e9cf9c1-9969-4354-a48c-b2cb0c8bbc34"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the directional stimulus S in Directional Stimulus Prompting?"
    options:
      - id: a
        text: "A second model that rewrites and expands the document before the frozen frontier model ever reads it, so the document arrives already summarised."
      - id: b
        text: "A reinforcement-learning reward function that scores the frontier model's output for factual accuracy and factuality."
      - id: c
        text: "A curated sequence of keywords, phrase anchors, constraints or entities."
      - id: d
        text: "A generated knowledge proposition list produced by the same two-stage elicitation used earlier in the chapter."
    correctOptionIds: [c]
    explanation: "Li et al. (2023) insert a discrete, fine-grained hint between the input text x and the generation target, so the model generates from P(y given x, S), where S is a curated sequence of target keywords, key phrase anchors, operational constraints or core entities. The stimulus does not replace the document; it acts as a high-affinity semantic filter that tells the attention heads which token clusters in the document to elevate during decoding. Rewriting the document, a reward function and a knowledge proposition list are different mechanisms. Lesson section: The Directional Stimulus Framework."
  - id: "3204c2f0-003d-4086-8732-7e21fe9aa721"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Policy-LM architecture, which model is trained, and what does it produce?"
    options:
      - id: a
        text: "A small policy model is trained to produce the directional stimulus for a frozen frontier LLM."
      - id: b
        text: "The frontier LLM is fine-tuned with gradients so that it produces the directional stimulus itself, while the smaller policy model stays frozen and unused."
      - id: c
        text: "Both models are trained together, so that the stimulus and the generated answer improve at the same rate."
      - id: d
        text: "Neither model is trained, because the stimulus is written by an operator for each document by hand."
    correctOptionIds: [a]
    explanation: "Instead of hand-crafting a stimulus for every document, Li et al. train a small, lightweight model such as a 7B LLaMA, Mistral or T5 as the policy model, which produces the stimulus from the document, and the gradient updates go only into that policy model. The frontier model stays frozen throughout, and the lesson's point is that a 7B model running locally on a single GPU can steer a trillion-parameter cloud-hosted model without the frontier model ever being fine-tuned. Lesson section: The Policy-LM Architecture: Small Models Steering Giants."
  - id: "3a8d5949-b086-4d48-8e8a-ce3fd5e14714"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the stimulus change what the attention weights do?"
    options:
      - id: a
        text: "It raises the attention weights of the document tokens that match the stimulus, which lifts them above the distractors."
      - id: b
        text: "It raises the logit of the targeted tokens, so the softmax takes mass from the distractors."
      - id: c
        text: "It lengthens the context window, so the softmax denominator can spread over more keys than before."
      - id: d
        text: "It freezes the weights of the attention heads, so that the stimulus cannot be diluted by training."
    correctOptionIds: [b]
    explanation: "The lesson divides the context into document tokens, stimulus tokens and previously generated tokens, and shows that the stimulus raises the dot product between the decoding query and the key of the targeted token, so its logit becomes far larger than the logit of a distractor. Because the softmax is competitive and its weights sum to one, raising those logits automatically depresses the weight given to the superficial lead sentences, deflecting the trajectory toward the semantics of the stimulus. A longer context and frozen weights would not produce that redistribution. Lesson section: How the Stimulus Shifts Softmax Probability Mass."
  - id: "ed792d60-20f3-4f21-8997-6d82c4375dae"
    revision: 1
    status: active
    type: single-choice
    prompt: "What happens when the directional stimulus is too aggressive or semantically contradictory?"
    options:
      - id: a
        text: "The model ignores the stimulus entirely and reverts to a generic summary built from the opening paragraphs of the document."
      - id: b
        text: "The stimulus is dropped from the KV cache, so the later tokens lose access to the semantic anchor."
      - id: c
        text: "The model develops tunnel vision, satisfying the stimulus over factual truth."
      - id: d
        text: "The frontier model is unfrozen for that request, so the stimulus can be learned rather than merely read."
    correctOptionIds: [c]
    explanation: "The lesson calls this the Directional Stimulus Over-Steering Vulnerability. Because high-salience stimulus tokens depress the attention weights of every other document token, a stimulus that aligns with a minor, disputed footnote can pull that footnote to the centre of the summary while the material losses in the same document are ignored, and the result satisfies the keywords at the cost of factual truth. The lesson's mitigations are negative constraints and coverage audits, a soft hint prefix such as \"Consider the following focal angles if supported by the text\", and automated contradiction detection against the source document. Lesson section: High-Stakes Failure Modes."
  - id: "a73d567e-84a2-49f5-956d-125169bf9300"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which mitigations does the lesson give for the hallucinated knowledge compounding trap? Select every correct answer."
    options:
      - id: a
        text: "Proposition quality scoring that rejects statements with low log-probabilities or high perplexity"
      - id: b
        text: "Cross-sample consistency through plurality voting across several generation passes"
      - id: c
        text: "Verifying the generated assertions against an external vector database in critical domains"
      - id: d
        text: "Raising the decoding temperature so that the generated propositions become more creative and varied"
    correctOptionIds: [a, b, c]
    explanation: "The trap arises from Context-Adherence Bias: when factual context sits explicitly in the prompt window, the self-attention mechanism weights the in-context tokens far above the latent parametric ones, so a hallucinated Stage 1 proposition is treated as authoritative ground truth by Stage 2. The lesson's three mitigations are proposition quality scoring, cross-sample consistency through plurality voting, and external retrieval-augmented verification for medicine, aerospace and law, where parametric generation proposes the search query and a deterministic vector database confirms the assertion. A higher decoding temperature adds noise rather than filtering it. Lesson section: High-Stakes Failure Modes."
  - id: "3811d80d-ccd2-4744-8bd9-11efdba7887c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which mitigations does the lesson give for the double API call latency and cost overhead? Select every correct answer."
    options:
      - id: a
        text: "Prompt caching, keeping the static instructions and the elicitation templates byte-identical"
      - id: b
        text: "Collapsing the two stages into one forward pass with an interleaved scratchpad"
      - id: c
        text: "An SLM-to-LLM cascade, where a small fast model writes the propositions"
      - id: d
        text: "Generating all M knowledge passages in one batched request so that the second call disappears"
    correctOptionIds: [a, b, c]
    explanation: "The lesson's three strategies are prompt caching, which can cut the cost of cached tokens by up to 90% when the static instructions and the few-shot elicitation template are kept byte-identical; a single-pass chained generation that interleaves the facts and the answer when latency has to stay under 500ms; and the SLM-to-LLM cascade, where a low-cost 8B model produces the propositions and GPT-4 or Claude 3.5 Sonnet only does the final synthesis. Batching the passages does not remove the second call, because the answer still has to be conditioned on the propositions. Lesson section: High-Stakes Failure Modes."
  - id: "d69788a7-abae-48a0-bb8c-a187ba61635b"
    revision: 1
    status: active
    type: true-false
    prompt: "Context-Adherence Bias means a model treats factual text placed explicitly in the prompt window as authoritative, so a proposition hallucinated in Stage 1 poisons Stage 2 with complete confidence."
    answer: true
    explanation: "That is the mechanism the lesson gives for the compounding trap: because the self-attention mechanism weights in-context tokens far higher than the latent parametric weights, a Stage 1 hallucination such as a fifth metatarsal described as an unvascularized cartilage extension is read by Stage 2 as settled fact, and the resulting reasoning is poisoned with total certainty. This is why the lesson insists on proposition quality scoring and external verification in critical domains. Lesson section: The Hallucinated Knowledge Compounding Trap."
  - id: "eae565c2-86b1-436b-84af-3895a17b5375"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how Generated Knowledge Prompting differs from retrieval-augmented generation, and when the lesson says each one is the right choice."
    sampleAnswer: "Retrieval-augmented generation fetches passages from an external sparse or dense index, such as BM25, Contriever or ColBERT, over a curated corpus like Wikipedia, and it brings its own failure modes with it: retrieval latency, index synchronisation drift, embedding retrieval errors and out-of-domain vocabulary mismatches. It remains the right choice when the facts are proprietary or change faster than the model's weights. Generated Knowledge Prompting needs no index at all: it asks the model to elicit its own propositions, K_1 to K_M, and then answers conditioned on them, which works because the model already encodes latent factual webs while direct question answering is dragged down by superficial lexical correlations. The price is that the knowledge comes from the parameters, so it has to be verified in critical domains."
    explanation: "A strong answer names the index and its failure modes, gives the internal knowledge elicitation hypothesis as the reason the two-stage pipeline works, and says plainly that the retrieval route is still needed for proprietary or dynamic facts. An answer that calls the two interchangeable has missed the difference the lesson is built on."
  - id: "9936f2f8-4190-4334-b154-8868736ca0b3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the Policy-LM architecture: how a small model steers a large frozen one, and why that is cheaper than fine-tuning the large model."
    sampleAnswer: "Li et al. train a small, lightweight model, such as a 7B LLaMA, Mistral or T5, as the policy model. It reads the document and emits the directional stimulus, a handful of keywords, phrase anchors or entities, typically 5 to 20 tokens, and the frozen frontier model then generates from P(y given x, S). The gradient is applied only to the policy model, using a reward such as ROUGE, BLEU, a human preference score or a factuality metric, which makes the training fast enough for PPO or DPO. Because the stimulus is short and the expensive model is never updated, a 7B model on a single local GPU can steer a trillion-parameter cloud-hosted model, where fine-tuning the frontier model would be impossible or uneconomic."
    explanation: "A strong answer says which model receives the gradient, what the policy model actually emits, how the reward is used, and why the frozen model makes this cheap. An answer that says the frontier model is trained, or that omits the reward, has described a different architecture."
```

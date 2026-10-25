---
id: "5b5e2349-51c1-43dc-8fcc-68a2a8a02b28"
title: "Zero-Shot, Few-Shot Exemplars & In-Context Pattern Induction: Question Bank"
description: "Practice questions for the exemplar lesson: the shot spectrum, induction-head mechanics, Bayesian task pruning, the Min et al. decomposition, the four few-shot pathologies, and the calibration frameworks that fix them."
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

These questions practise [[courses/advanced-prompt-engineering-techniques/lessons/01-zero-shot-and-few-shot-prompting|Zero-Shot, Few-Shot Exemplars & In-Context Pattern Induction]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "ac1aa803-9a3a-46a2-a9db-630b29606cbe"
    revision: 1
    status: active
    type: single-choice
    prompt: "A model copies the answer of an earlier demonstration when the same pattern reappears in the prompt. Which circuit does the lesson say performs this copy?"
    options:
      - id: a
        text: "A single feed-forward layer that stores the demonstration's label as a bias term across the output vocabulary."
      - id: b
        text: "A two-layer circuit: a previous-token head, then an induction head that matches and copies."
      - id: c
        text: "The embedding lookup table, because the demonstration and the query share the same token embeddings."
      - id: d
        text: "The causal attention mask, which blocks the model from attending to the tokens that carry the pattern."
    correctOptionIds: [b]
    explanation: "Olsson et al. (2022) describe a two-layer circuit. At layer L a previous-token head attends to position i minus 1 and writes the identity of the preceding token into the residual stream; at layer L plus 1 an induction head matches its query against those keys and copies the token that followed the earlier occurrence of the pattern, so a context that shows [A][B] and later shows [A] produces [B]. A feed-forward bias, an embedding lookup and the causal mask cannot perform that match-and-copy step, and the mask in fact hides later tokens rather than earlier ones. Lesson section: Mechanistic Interpretability: The Induction Head Circuit."
  - id: "8534a8c9-38e3-4190-bc9c-1683b11f5160"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to Min et al. (2022), which four things do exemplars communicate to the model?"
    options:
      - id: a
        text: "The attention head count, the layer depth, the embedding width and the inference engine that serves the request."
      - id: b
        text: "The token budget, the context window, the decoding temperature and the system prompt."
      - id: c
        text: "The training data, the fine-tuning schedule, the reward model and the evaluation split."
      - id: d
        text: "The input format, the label space, the input text distribution and the input-output mapping."
    correctOptionIds: [d]
    explanation: "Min et al. (2022) break the demonstration down into four dimensions: the input format, the label space, the input text distribution and the input-output mapping. On simple classification the format and the label space dominate, which is why replacing the ground-truth labels with random labels costs typically less than 5% of accuracy. The architectural and serving details in the wrong answers are not part of that decomposition, and they are not what an exemplar teaches the model. Lesson section: What Are Exemplars Really Doing? The Min et al. (2022) Breakthrough."
  - id: "4b123a19-6b61-4d46-8dc7-82339367a506"
    revision: 1
    status: active
    type: single-choice
    prompt: "A few-shot prompt contains three POSITIVE exemplars and one NEGATIVE one. What does the lesson say happens to the model's prior for POSITIVE?"
    options:
      - id: a
        text: "It shifts from 0.50 to nearly 0.85."
      - id: b
        text: "It stays at 0.50, because the model averages the labels in the prompt rather than counting them."
      - id: c
        text: "It drops to 0.15, because the single NEGATIVE exemplar outweighs the three POSITIVE ones."
      - id: d
        text: "It becomes 0.75, because the labels in a prompt are weighted by their token length in the context."
    correctOptionIds: [a]
    explanation: "Majority label bias is the first of the four production pathologies the lesson names. When the demonstrations are unbalanced the model reads the class frequency in the prompt as evidence about the class of the query, so an implicit prior of 0.50 for POSITIVE moves to nearly 0.85. On real queries, where the input is often ambiguous or neutral, that skew is what makes the model answer POSITIVE too often. Averaging the labels, weighting them by token length and letting one NEGATIVE exemplar outweigh three POSITIVE ones are all behaviours the lesson does not describe. Lesson section: 1. Majority Label Bias."
  - id: "001894b1-870d-4858-87e8-5909ed28a80a"
    revision: 1
    status: active
    type: single-choice
    prompt: "Zhao et al. found that permuting the order of the same four exemplars changes accuracy sharply. Which pair of figures does the lesson give?"
    options:
      - id: a
        text: "51.2% for the order [E1, E2, E3, E4] and 84.3% for [E4, E1, E3, E2]."
      - id: b
        text: "No gap at all: permuting identical exemplars leaves accuracy unchanged on every benchmark."
      - id: c
        text: "84.3% for the order [E1, E2, E3, E4] and 51.2% for [E4, E1, E3, E2]."
      - id: d
        text: "A swing of up to 35 percentage points, with no accuracy figure attached to any particular ordering."
    correctOptionIds: [c]
    explanation: "Zhao et al. found that the same exemplars can swing accuracy by up to 35 percentage points depending on their order. On SST-2 and AGNews the ordering [E1, E2, E3, E4] reached 84.3% while [E4, E1, E3, E2] fell to 51.2%, scarcely better than a coin flip. The lesson's production fix is permutation validation across all k! orderings, or a Latin square subset when k is greater than 4, and then contextual calibration where the variance across permutations is high. Lesson section: 3. Order Sensitivity (The Zhao et al. Breakthrough)."
  - id: "d2ea3bcb-521d-466c-91e3-5869f56f1bd3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked calibration the null input yields p_null of [0.80, 0.20] and the raw output is p_raw of [0.60, 0.40]. What does the calibrated distribution give?"
    options:
      - id: a
        text: "[0.273, 0.727], so the Negative label wins."
      - id: b
        text: "[0.60, 0.40], because calibration only reorders the labels that the prompt already produced."
      - id: c
        text: "[0.20, 0.80], because the null distribution is subtracted directly from the raw distribution."
      - id: d
        text: "[0.75, 2.00], because the raw probabilities are divided by the null probabilities without normalising them."
    correctOptionIds: [a]
    explanation: "Contextual calibration divides each raw probability by its null probability and normalises the result. With p_null of [0.80, 0.20] and p_raw of [0.60, 0.40] the ratios are 0.75 and 2.00, their sum is Z of 2.75, and the calibrated probabilities come out at 0.273 for Positive and 0.727 for Negative. That is the lesson's point: relative to the prompt's own bias the customer is Negative. The lesson also reports that calibration routinely eliminates 60% to 80% of the classification errors caused by exemplar order and label bias. Lesson section: Strategy 2: Contextual Calibration (Zhao et al., 2021)."
  - id: "717015ce-1b0a-48a2-a934-4f9ea49f2ebb"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's dynamic k-NN exemplar selection, how are the exemplars chosen for a query?"
    options:
      - id: a
        text: "A fixed set of hand-picked exemplars is reused for every query, because a stable prompt is easier to cache across the fleet."
      - id: b
        text: "Nearest verified pairs by cosine similarity, ordered so the closest sits just before the query."
      - id: c
        text: "The exemplars are sampled at random from the store, so that no neighbourhood of the embedding space dominates the prompt."
      - id: d
        text: "The exemplars are chosen by recency, so the most recently added verified pair always leads the prompt."
    correctOptionIds: [b]
    explanation: "The lesson keeps an indexed store of 5,000 verified input and output pairs with precomputed dense embeddings, retrieves the nearest neighbours by cosine similarity, and orders them ascending by similarity so the most relevant one sits immediately before the query, where recency helps. The worked retrieval returns neighbours at 0.92, 0.89 and 0.86 similarity. A fixed, a random and a recency-ordered set would each give up the domain coverage that makes this strategy dynamic. Lesson section: Strategy 3: Dynamic k-NN Exemplar Selection."
  - id: "c9e2ab77-f850-4cd7-ada6-7e9548cc80b9"
    revision: 1
    status: active
    type: single-choice
    prompt: "For Morten's Pizza Emporium assistant, which change does the lesson report between the zero-shot and the few-shot architecture?"
    options:
      - id: a
        text: "Allergy Policy Accuracy rises from 38% to 100%, and the JSON Parser Exception Rate falls from 39% to under 0.2%."
      - id: b
        text: "Entity Inclusion falls from 100% to 24%, because the exemplars crowd the business policy out of the context window."
      - id: c
        text: "Entity Inclusion rises from 24% to 100%, and Strict JSON Schema Compliance rises from 61% to 99.8%."
      - id: d
        text: "Strict JSON Schema Compliance falls from 99.8% to 61%, because the structural delimiters around the output are removed."
    correctOptionIds: [c]
    explanation: "The lesson's comparison table records Entity Inclusion moving from 24% to 100% and Strict JSON Schema Compliance from 61% to 99.8% once the few-shot architecture lands, with the JSON Parser Exception Rate falling from 39% to under 0.2% and Allergy Policy Accuracy rising from 38% to 100%. The exemplars bind the business name, the opening hours of Tuesday to Sunday from 11:00 AM to 10:00 PM, and the gluten-free policy that the dough is prepared in a shared wood-fired oven and carries no safety guarantee for severe celiac disease. Every metric moves the same way, so an answer that says one of them falls is not what the table shows. Lesson section: Zero-Shot vs. Few-Shot Performance Comparison."
  - id: "625f2273-4262-4195-9172-7abdc9da27f2"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three of the four production pathologies of few-shot prompting does the lesson name? Select every correct answer."
    options:
      - id: a
        text: "Majority label bias"
      - id: b
        text: "Recency bias"
      - id: c
        text: "Order sensitivity"
      - id: d
        text: "Attention dispersion across the middle of a long prompt"
    correctOptionIds: [a, b, c]
    explanation: "The lesson names majority label bias, recency bias, order sensitivity and common token bias as its four pathologies, and the first three are in this list. Attention dispersion belongs to the foundations lesson, where the cure is reranking the reference material down to the top few chunks rather than changing the exemplars. Lesson section: Production Pathologies of Few-Shot Prompting."
  - id: "bca20cbe-7ea5-4f0a-a7d1-61d24d1ac363"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of the mitigation and calibration frameworks does the lesson set out for a few-shot pipeline? Select every correct answer."
    options:
      - id: a
        text: "Balanced class sampling with a k/N ratio across the exemplars"
      - id: b
        text: "Contextual calibration that divides the raw distribution by the null-input distribution"
      - id: c
        text: "Raising the decoding temperature so that the label distribution flattens out"
      - id: d
        text: "Dynamic k-NN retrieval of the nearest verified exemplars"
    correctOptionIds: [a, b, d]
    explanation: "The lesson's three strategies are balanced class sampling, contextual calibration and dynamic k-NN exemplar selection, and its closing summary names exactly those. A higher decoding temperature would add variance rather than remove the systematic bias the prompt has built in, so it is not one of the frameworks. Lesson section: Mitigation & Calibration Frameworks."
  - id: "f2318421-9934-4aa5-945d-63c8d71fdc38"
    revision: 1
    status: active
    type: true-false
    prompt: "In-context learning updates no weights: the gradient with respect to the parameters stays at zero and the learning happens in the activations instead."
    answer: true
    explanation: "The lesson states that in-context learning works with a frozen model, where the gradient with respect to the parameters is zero and nothing in the weights changes during inference. What changes is the activation dynamics, the residual stream and the KV states, which is why a demonstration can shape the output without any training. Lesson section: Learning Without Optimization."
  - id: "ee5b58e0-2cd1-451d-8c86-4abdf42d9dab"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how an induction head lets a model copy a pattern from an earlier demonstration, and why that makes few-shot prompting work."
    sampleAnswer: "The lesson describes a two-layer attention circuit from Olsson et al. (2022). At layer L a previous-token head attends to position i minus 1 and writes the identity of the preceding token into the residual stream; at layer L plus 1 an induction head matches its query against those keys and copies the token that followed the earlier occurrence of the pattern, so a context that shows [A][B] and later shows [A] produces [B]. Nothing is trained and nothing is stored: the demonstration is still in the context, and the copy happens because the attention circuit can find it there."
    explanation: "A strong answer names the two layers, says what each one does, and gives the pattern-completion shape that the circuit implements. An answer that only says the model reads the demonstrations has described the behaviour without the mechanism, and an answer that says the weights are updated has contradicted the lesson."
  - id: "76861d66-029c-4601-adbd-2709d359f878"
    revision: 1
    status: active
    type: free-recall
    prompt: "Morten's Pizza Emporium assistant fails in zero-shot mode. Describe the failure and say how the few-shot architecture fixes it."
    sampleAnswer: "In zero-shot mode the assistant invents business facts, such as gluten-free pizzas made with organic cauliflower crust that the shop never sold, and it returns prose wrapped around the JSON, beginning with a line of preamble, instead of the strict schema the downstream CRM systems parse, so the parser fails on 39% of requests. The few-shot architecture fixes both by binding the business name, the opening hours of Tuesday to Sunday from 11:00 AM to 10:00 PM and the gluten-free policy, and by showing the structural delimiters around a valid output. Entity Inclusion goes from 24% to 100%, Strict JSON Schema Compliance from 61% to 99.8%, and the parser exception rate falls to under 0.2%."
    explanation: "A strong answer names a concrete hallucination and the prose wrapper as the two failures, then links the fix to the three exemplars and to the four metrics that move. An answer that says only the zero-shot output was poor has not used the lesson's evidence, and one that gives figures the lesson does not record has invented them."
```

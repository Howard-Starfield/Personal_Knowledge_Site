---
id: "e7b4c091-2f68-4a35-9d17-8c60b3a5e294"
title: "Chapter 12: LLM Evaluation, Benchmarking & World Model Probing: Question Bank"
description: "Practice questions for the evaluation chapter: clipped BLEU precision and the brevity penalty, ROUGE-L and the longest common subsequence, BERTScore greedy matching and IDF weighting, the three biases of LLM judges and their mitigations, linear probing, the Othello-GPT case, causal activation patching, and the three evaluation traps."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/12-llm-evaluation-and-benchmarking|Chapter 12: LLM Evaluation, Benchmarking & World Model Probing]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "5a2c8e37-6d94-4b15-8f03-1e7c9b2d4a68"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's worked BLEU-2 case, the reference is \"the cat sat on mat\" and the candidate is \"the cat the mat\". What does the lesson compute?"
    options:
      - id: a
        text: "p_1 of 0.75 and p_2 of 0.333, a brevity penalty of 0.7788, and a final BLEU-2 of about 0.3894"
      - id: b
        text: "p_1 of 1.0 and p_2 of 0.5, a brevity penalty of 1.0, and a final BLEU-2 of about 0.7071"
      - id: c
        text: "p_1 of 0.60 and p_2 of 0.25, a brevity penalty of 0.80, and a final BLEU-2 of about 0.3464"
      - id: d
        text: "p_1 of 0.75 and p_2 of 0.50, a brevity penalty of 0.7788, and a final BLEU-2 of about 0.5200"
    correctOptionIds: [a]
    explanation: "a is correct: the clipped unigram counts are 1 for the, 1 for cat and 1 for mat against four candidate tokens, so p_1 is 0.75, and only the bigram the cat matches, so p_2 is one third, and because the candidate length of 4 does not exceed the reference length of 5 the brevity penalty is the exponential of 1 minus 5 over 4, which is 0.7788, and the geometric mean of the two precisions is 0.5, giving a final BLEU-2 of about 0.3894. b, c and d each corrupt one of those steps. Lesson section: Worked Case: BLEU-2 Calculation."
  - id: "c3f81b60-4a27-4e59-8d13-6b0e9c7a2f45"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does BLEU's clipped n-gram precision protect against?"
    options:
      - id: a
        text: "A candidate that repeats one token many times, which would otherwise reach a very high unigram precision"
      - id: b
        text: "A reference that is much shorter than the candidate, which would otherwise produce a brevity penalty above one"
      - id: c
        text: "A candidate that is shorter than the reference, which would otherwise reach a perfect precision score"
      - id: d
        text: "A candidate that uses synonyms for the reference, which would otherwise reach a zero bigram precision"
    correctOptionIds: [c]
    explanation: "c is correct: precision alone rewards a model that emits only two correct words, and it is the brevity penalty, not the clipping, that penalises a candidate shorter than the reference, with the penalty rising as the candidate shrinks. The clipping is what stops a degenerate output such as \"the the the the the\" from scoring 100% unigram precision, because each candidate count is capped at the maximum count of that n-gram in any single reference. a, b and d each attach the mechanism to the wrong failure mode. Lesson section: The Modified n-gram Precision and the Brevity Penalty."
  - id: "9e6d0a48-3b71-4f52-8c96-2d7b0e4f1a53"
    revision: 1
    status: active
    type: single-choice
    prompt: "What distinguishes ROUGE-L from ROUGE-N?"
    options:
      - id: a
        text: "It counts n-gram matches the same way but weights each match by its position inside the reference"
      - id: b
        text: "It uses the longest common subsequence, so matched words need not be adjacent but their order is kept"
      - id: c
        text: "It uses a fixed sliding window over the passage, which lets it score text longer than the context window"
      - id: d
        text: "It embeds both texts before matching them, which makes it a semantic rather than a lexical metric"
    correctOptionIds: [b]
    explanation: "b is correct: ROUGE-L computes the longest common subsequence between the reference and the candidate, so a matched word need not be adjacent, yet the relative order of the matched words is preserved, which is what lets it capture sentence structure and word order while tolerating insertions. The lesson derives recall as the subsequence length over the reference length and precision as the subsequence length over the candidate length, combined with a harmonic mean at a standard beta of 1.0. a, c and d describe mechanisms the chapter does not give. Lesson section: ROUGE-L (Longest Common Subsequence)."
  - id: "4b8d5e13-7f26-4c90-a538-2d6c0b7e3f91"
    revision: 1
    status: active
    type: single-choice
    prompt: "In BERTScore, what is the difference between the recall term and the precision term?"
    options:
      - id: a
        text: "Recall matches each reference token to its best candidate token, while precision matches each candidate token to its best reference token"
      - id: b
        text: "Recall uses the inverse document frequency weights and precision does not, because only the reference side is weighted"
      - id: c
        text: "Recall sums over the candidate tokens while precision sums over the reference tokens, so the two are simply swapped"
      - id: d
        text: "They come from the same similarity matrix, but precision penalises candidate tokens with no good reference match"
    correctOptionIds: [d]
    explanation: "d is correct: both terms are read off the same greedy bipartite matching of unit-normalised contextual token vectors, but recall asks how completely the candidate captures the reference concepts, while precision asks how much of the candidate is supported, so a candidate that introduces an irrelevant or hallucinated concept is penalised there and not in the recall term. a describes the two matching directions rather than the difference the chapter draws, and b and c misstate how the inverse document frequency weighting is applied. Lesson section: The Bipartite Alignment Mechanics."
  - id: "7f0a6c29-8e53-4b17-8d42-0c6b5e9a2f37"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson report about position bias in LLM judges, and what is the mitigation?"
    options:
      - id: a
        text: "Judges prefer the second candidate, and the fix is to length-normalise the rubric scores"
      - id: b
        text: "Judges prefer the first candidate, and the fix is to evaluate every pair twice with the order swapped"
      - id: c
        text: "Judges prefer the longer candidate, and the fix is to fit a Bradley-Terry model with a length coefficient"
      - id: d
        text: "Judges prefer their own family's outputs, and the fix is to assemble a panel of three model families"
    correctOptionIds: [b]
    explanation: "b is correct: frontier judges show a structural preference for the candidate presented first, and the lesson states that the win probability given position A minus the win probability given position B exceeds 0.20, so presenting two identical candidates first gives the first one a 60% to 70% win rate under naive single-pass evaluation. The mitigation is bidirectional order swapping, evaluating the pair as A then B and again as B then A and averaging the two scores. a, c and d describe the other two biases, verbosity and egocentric self-enhancement, each with its own mitigation. Lesson section: The Three Systematic Biases of LLM Judges."
  - id: "c9b3e760-4d18-4a57-8e02-5f7a1c6b3d84"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's calibrated pairwise judging, what happens when candidate 1 wins the first pass and candidate 2 wins the second pass with the order swapped?"
    options:
      - id: a
        text: "It is declared a tie, because each candidate won only in the position that favoured it"
      - id: b
        text: "Candidate 1 wins, because the first pass is the one with the more natural ordering of the pair"
      - id: c
        text: "Candidate 2 wins, because the second pass is the one with the more natural ordering of the pair"
      - id: d
        text: "Both are recorded as half a win, because the average of the two score sets is then exactly equal"
    correctOptionIds: [a]
    explanation: "a is correct: the chapter's deterministic tie-breaking rule treats a split result, where candidate 1 wins in one order and candidate 2 wins in the swapped order, as a pure position artefact and declares a tie, and a candidate wins only if its averaged score exceeds the other's by more than the epsilon threshold. b and c pick a winner on an order the chapter does not privilege, and d confuses the tie-break rule with the averaging formula. Lesson section: Mathematical Mitigation, Bidirectional Order Swapping."
  - id: "e5d8c914-6b37-4f02-9a86-1c3e7b4d0f52"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did the lesson report about the linear probes trained on Othello-GPT?"
    options:
      - id: a
        text: "The probe found no board representation at all, which supported the stochastic parrot thesis in every layer"
      - id: b
        text: "The probe read the board state from the first layer, so the representation was present from the very beginning"
      - id: c
        text: "The probe needed the full grid coordinates supplied in the prompt, so it read the board rather than the model"
      - id: d
        text: "The probe was near chance in early layers and below 1.5% error in layers 6 to 8 across all 64 squares"
    correctOptionIds: [d]
    explanation: "d is correct: the model was trained only on text sequences of legal Othello moves, with no rules, no grid coordinates, no flipping logic and no concept of the board, yet probes in the middle and late layers, l between 6 and 8, predicted the state of each of the 64 squares, empty, black or white, with an error below 1.5%, while probes in layers 1 to 3 were near chance. The inference the chapter draws is that to predict the next legal move the model had to build a two-dimensional spatial coordinate representation of the board inside its residual stream. a, b and c contradict the reported result or the setup. Lesson section: The Othello-GPT Case Study."
  - id: "1a6f3d85-4c07-4b92-8e51-7d2c9b0e3a68"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three traps does the lesson name in its section on what engineers miss most in evaluation and probing? Select every correct answer."
    options:
      - id: a
        text: "The lexical overlap false negative trap, where optimising for BLEU turns a model into a keyword memoriser"
      - id: b
        text: "The judge positional distortion trap, where a single fixed order inflates a leaderboard by up to 25%"
      - id: c
        text: "The embedding cost trap, where BERTScore's encoder makes evaluation slower than generation itself"
      - id: d
        text: "The probing confounding trap, where a high probe accuracy may be memorisation rather than a used representation"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are the three traps in the chapter's section on what engineers miss most. A model that explains a solution with synonyms, modular code or a novel reasoning path scores terribly on lexical overlap, so teams optimising for BLEU or ROUGE discard their best models and end up fine-tuning for repetition. Failing to evaluate both orderings distorts pairwise leaderboards by up to 25%, and the chapter's warning is that a single-pass pipeline reports positional artefacts as model superiority. And a probe with 95% or better accuracy proves only that the information is present, because random Gaussian projections and superficial artefacts such as token length can correlate with the label. c is not one of the three named traps. Lesson section: The \"Most Missed Things\" in LLM Evaluation & Probing."
  - id: "8d2b4f07-3e95-4c61-a038-6b9e1c7d5f24"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the lesson's linear probing method are correct? Select every correct answer."
    options:
      - id: a
        text: "All the foundation model weights are frozen and only a single linear layer is trained on the residual stream"
      - id: b
        text: "The probe is trained on the model's output logits, which is why it measures what the model would have said"
      - id: c
        text: "The probe predicts a ground-truth property such as the state of each of the 64 board squares"
      - id: d
        text: "A control task baseline that probes random labels is needed to rule out probe memorisation capacity"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are correct. The method freezes every weight of the foundation model, so the gradient with respect to the model parameters is zero, and trains only a linear classification layer on top of the residual stream activation at layer l, mapping it onto a ground-truth property such as the state of each board square or the sentiment of a sentence. The chapter insists on a control task baseline from Hewitt and Liang that probes random labels, so that the probe's own memorisation capacity is measured rather than assumed. b is wrong because the probe reads the intermediate activation, not the output logits, which is exactly what lets it ask what the model has computed internally. Lesson section: Mathematical Formulation of Linear Probes."
  - id: "6b0d4a72-9c18-4e35-8f07-3c5b9e1d8a46"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says BLEU-1 scores 80.0% for \"The patient survived in surgery\" against the reference \"The patient died in surgery\", and 25.0% for \"The doctor gave adrenaline\" against \"The physician administered epinephrine\"."
    answer: true
    explanation: "True. Both figures come from the lesson's table of the three fatal failure modes of lexical overlap. In the semantic inversion case, four of the five words match perfectly, The, patient, in and surgery, so BLEU-1 is 80.0% even though the clinical meaning is inverted by 180 degrees, which is the catastrophic case the metric cannot see. In the synonym and paraphrase case only the word the matches, so BLEU-1 is 25.0% and BLEU-2 is 0.0%, even though the candidate is medically flawless and the metric treats a correct paraphrase as a hallucinated error. The third row of the same table shows the creative and algorithmic diversity case, where a correct iterative MergeSort scores under 15.0% ROUGE-L against a recursive QuickSort reference. Lesson section: The Three Fatal Failure Modes of Lexical Overlap."
  - id: "3c9e0f48-5a76-4b13-80d7-6e2a4c8b1f95"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the four evaluation tiers the lesson sets out, and what each tier can and cannot measure."
    sampleAnswer: "Tier one is surface string overlap, BLEU from Papineni et al. and ROUGE-N and ROUGE-L from Chin-Yew Lin, computed with clipped n-gram counting and longest common subsequences. It is ultra-fast with zero GPU overhead and it is the right tool for rigid string-copying benchmarks such as verbatim translation and fixed extraction, but it is blind to synonyms, it rewards fluent gibberish and it catastrophically misjudges negation, so it must never be used to score generative reasoning. Tier two is dense manifold similarity through BERTScore, which performs greedy bipartite matching of unit-normalised contextual token vectors so that a paraphrase scores well, with inverse document frequency weighting so that matching epinephrine to adrenaline carries ten times the weight of matching the to the. It still needs a reference text and it is blind to multi-step reasoning chains. Tier three is the model-based judge, MT-Bench, G-Eval and Prometheus, which handles open-ended output where no reference exists, through single-answer rubric scoring, pairwise comparison and reference-guided grading. It correlates with expert human judgment at around r of 0.80 to 0.90 but needs calibration against position, verbosity and self-enhancement bias. Tier four is mechanistic world-model probing, which reads the residual stream h_l directly with a linear probe trained on frozen weights and, with causal activation patching, tests whether that representation is actually used."
    explanation: "A strong answer names the four tiers in order, gives the method of each, and states the limitation of each, including the specific lexical failure modes and the three judge biases. An answer that only says the tiers get better with depth has not covered what each measures."
  - id: "f70a5c3b-8e24-4d91-a6c8-2b5d9e3f0c46"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the lesson insists on causal activation patching rather than trusting probe accuracy alone, and how the Othello-GPT experiment supplied the evidence."
    sampleAnswer: "A linear probe that reads a property with 95% or 99% accuracy only establishes that the information is present in the residual stream. The residual stream also carries residual token history, so a probe could be reading a correlate of the board state rather than a representation the forward pass actually consults, and high-dimensional networks also admit random Gaussian projections or superficial artefacts such as token length and prompt formatting that correlate with the label. The chapter therefore requires two things: a control task baseline that probes random labels to measure the probe's own memorisation capacity, and a causal intervention. In the Othello-GPT case the authors identified the concept vector for a square, ran the model on a prompt where that square was Black, overwrote the layer l activation with the vector scaled by alpha and asserting the opposite colour, and resumed the forward pass through the remaining layers without touching any weights. The next-token probabilities shifted immediately and exclusively toward moves that were legal only under the counterfactual board state, which is direct evidence that the internal representation exerts causal control over the generated output."
    explanation: "A strong answer states the epistemic gap between presence and use, names the control task baseline and the causal intervention, and describes the counterfactual patching and the shift it produced. An answer that only says patching proves causation has not explained what was patched or what was observed."
```

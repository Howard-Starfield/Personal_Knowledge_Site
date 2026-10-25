---
id: "77242945-ba03-4e72-a894-45158c044c54"
title: "Tree-of-Thought (ToT) Search & Chain-of-Density (CoD) Compression: Question Bank"
description: "Practice questions for the search-and-compression lesson: the four pillars of Tree-of-Thought, state evaluation, the Game of 24, the combinatorial explosion trap, the Chain-of-Density protocol, entity density, and the density sweet spot."
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

These questions practise [[courses/advanced-prompt-engineering-techniques/lessons/04-tree-of-thought-and-chain-of-density|Tree-of-Thought (ToT) Search & Chain-of-Density (CoD) Compression]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "b46a57b2-0a2c-4c25-aede-2386f59e5bfe"
    revision: 1
    status: active
    type: single-choice
    prompt: "Tree-of-Thought search rests on four pillars. Which set of four is the right one?"
    options:
      - id: a
        text: "Prompt design, temperature tuning, answer parsing and the choice of which frontier model to call."
      - id: b
        text: "Decomposition, generation, state evaluation and tree search."
      - id: c
        text: "Reward modelling, reinforcement learning, preference tuning and benchmark selection."
      - id: d
        text: "Retrieval, reranking, citation formatting and output schema validation."
    correctOptionIds: [b]
    explanation: "The lesson builds ToT on four pillars: thought decomposition, which fixes the step granularity s as the smallest unit that can be judged on its own; thought generation G(p_theta, s, k), by independent sampling or by proposing k distinct candidates in one structured prompt; heuristic state evaluation V(p_theta, S), which scores an intermediate state instead of waiting for the whole proof to finish; and the tree search algorithm, breadth-first with a beam or depth-first with backtracking. Prompt tuning, reward modelling and a retrieval pipeline are useful techniques, but they are not the structure of the search. Lesson section: Tree-of-Thought (ToT) Architecture (Yao et al., 2023)."
  - id: "f8393e22-944b-4c4b-85f0-5f508dd58f85"
    revision: 1
    status: active
    type: single-choice
    prompt: "On the Game of 24 benchmark, what do the lesson's figures say about linear Chain-of-Thought?"
    options:
      - id: a
        text: "It beats direct zero-shot, which scores 7.3%, because the reasoning tokens let the model check its arithmetic."
      - id: b
        text: "It reaches 74.0%, the same as Tree-of-Thought, because the evaluator prunes the branch that leads to 28."
      - id: c
        text: "It scores 9.0%, the same as self-consistency with k of 100."
      - id: d
        text: "It collapses to 4.0%, below the 7.3% of direct zero-shot, because it cannot abandon a dead end."
    correctOptionIds: [d]
    explanation: "The lesson's benchmark table records 7.3% for standard zero-shot prompting, 4.0% for linear Chain-of-Thought, 9.0% for Chain-of-Thought with self-consistency at k of 100, and 74.0% for Tree-of-Thought with a beam width of 5. Chain-of-Thought collapses because arithmetic deduction needs non-local constraint satisfaction: once the model has written 4 times 7 as 28 it is statistically driven to reach 24 from the remaining numbers, which is impossible, and it cannot erase its own tokens, so it hallucinates equations such as 28 minus 8 as 24. Lesson section: Classic Benchmark Proofs: The Game of 24."
  - id: "e6079845-b8f0-4125-80c7-f1f93ad6de32"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does Tree-of-Thought reach 74% on Game of 24 where linear Chain-of-Thought reaches 4%?"
    options:
      - id: a
        text: "It prunes the dead end as impossible and explores another branch."
      - id: b
        text: "It samples many more tokens per step, so the model has a larger budget of arithmetic facts to choose from."
      - id: c
        text: "It evaluates the whole proof only at the end, which avoids the arithmetic drift that ruins a linear chain."
      - id: d
        text: "It uses a frontier model rather than a smaller one, so the arithmetic itself is simply more accurate."
    correctOptionIds: [a]
    explanation: "The difference is the heuristic state evaluation. In the worked branch, the state [8, 28] cannot reach 24 by any operation, so the evaluator returns the verdict impossible, that branch is pruned, and the searcher is forced onto a winning line such as 8 times (7 minus 4) equals 24. Linear Chain-of-Thought has no such verdict, because the model keeps writing: it cannot delete the tokens already sitting in its context. More tokens per step, a bigger model and checking only at the end do not remove that difference. Lesson section: Classic Benchmark Proofs: The Game of 24."
  - id: "94bb20e3-2e91-400d-aa56-aab23f218d25"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does each Chain-of-Density iteration actually do?"
    options:
      - id: a
        text: "It writes a fresh summary from scratch, aiming at a target length of roughly 80 to 100 words each time."
      - id: b
        text: "It appends new sentences to the previous summary, so the summary grows with every iteration."
      - id: c
        text: "It injects 1 to 3 missing entities while keeping the total word count identical."
      - id: d
        text: "It asks the model to drop every adjective and keep only the named entities and the numbers."
    correctOptionIds: [c]
    explanation: "Chain-of-Density is a closed-loop recursive densification state machine. The first iteration writes an intentionally entity-sparse skeleton of about 80 to 100 words, and iterations 2 to 5 each identify one to three informative, non-redundant entities missing from the previous summary and then rewrite it to include them while strictly maintaining the same total word count. Holding the budget fixed is what forces the syntactic compression: filler phrases are eliminated, compound sentences become appositives and adjacent propositions fuse into dense noun phrases. Rewriting from scratch or appending sentences both break the constant-budget rule that makes the technique work. Lesson section: The 5-Step Recursive Refinement Protocol."
  - id: "4ae3c96c-1de6-424a-91a5-7b08cd51cce3"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which Chain-of-Density iteration should a production pipeline return, and why?"
    options:
      - id: a
        text: "Iteration 3 for general readers, iteration 4 for analysts, because Step 5 collapses."
      - id: b
        text: "Iteration 5 for every audience, because the density curve keeps rising and the reader adapts to the new density."
      - id: c
        text: "Iteration 1 for every audience, because readers prefer the grammatical clarity of the sparse skeleton."
      - id: d
        text: "Whichever iteration scores highest on entity density, because entity density is the metric the human raters rewarded."
    correctOptionIds: [a]
    explanation: "Annotator preference in the lesson peaks at Step 3, around a density of 0.15, with Step 4, around 0.18, preferred by analysts and subject-matter experts for maximum factual retention before syntax degrades. Step 5, at roughly 0.22 and above, is the saturation point: articles and copulas drop out, pronoun antecedents blur, and readers take about 40% longer on a Step 5 summary than on a Step 3 one of identical length. The lesson's production rule is to terminate at Iteration 3 for general consumers and Iteration 4 for analytical research desks, and never to emit Iteration 5 without an explicit coherence check. Lesson section: The Human Preference Sweet Spot."
  - id: "c74ddbb7-2c19-4f32-9318-55e36e6c679b"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson measure the density of a summary?"
    options:
      - id: a
        text: "By counting the sentences of the summary and dividing by the number of paragraphs in the source document."
      - id: b
        text: "As the number of informative entities divided by the total token count."
      - id: c
        text: "By measuring the proportion of words that are adjectives, so that the summary reads as more precise."
      - id: d
        text: "By the compression ratio between the length of the source document and the length of the summary."
    correctOptionIds: [b]
    explanation: "Adams et al. define density directly as the number of informative entities divided by the total token count, where an informative entity is a unique, non-overlapping span covering named entities, specific quantitative values such as dates, percentages and dollar amounts, and precise technical concepts. The lesson's walkthrough shows two summaries of 26 words, one with 2 entities at a density of 0.077 and one with 5 entities at 0.192, so the denser one delivers two and a half times the information for the same reading time. Sentences, adjectives and the compression ratio are not the measure. Lesson section: The Direct Entity Density Formulation."
  - id: "86eebea0-49e1-42d8-8068-2ddb414f56dc"
    revision: 1
    status: active
    type: single-choice
    prompt: "A Tree-of-Thought search with a branching factor of 5 and a depth of 4 runs without pruning. What does the lesson say it costs?"
    options:
      - id: a
        text: "Nothing extra, because the beam width caps the number of states the searcher has to evaluate."
      - id: b
        text: "A modest overhead, because each state is evaluated by a cheap prompt with few tokens."
      - id: c
        text: "781 states, about 468,600 tokens, $2.34 and 45 to 90 seconds for one query."
      - id: d
        text: "One extra call, because the search reuses the same evaluation for every branch of the tree."
    correctOptionIds: [c]
    explanation: "The node count of an unpruned tree is the geometric sum 1 plus 5 plus 25 plus 125 plus 625, which is 781 states. At 500 input tokens and 100 output tokens per evaluation that is 468,600 tokens for a single query, which at the lesson's frontier rates costs $2.34 and adds 45 to 90 seconds of wall-clock latency. The lesson's mitigations are aggressive categorical pruning, a dynamic beam width that narrows to 2 at deeper levels, a small-model evaluator cascade, and state canonicalisation so that a repeated state reuses a cached score instead of triggering a duplicate call. Lesson section: The ToT Combinatorial Explosion."
  - id: "26ebdeb0-b9e3-4df3-8eee-d54f7feea9fd"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which state evaluation protocols does the lesson describe for Tree-of-Thought? Select every correct answer."
    options:
      - id: a
        text: "Categorical classification with a sure, likely or impossible verdict"
      - id: b
        text: "Scalar scoring on a calibrated scale or on a rubric from 1 to 10"
      - id: c
        text: "Cross-state comparison, asking which of k sibling states is most promising"
      - id: d
        text: "Backtracking to the parent state whenever the sampling temperature passes a threshold"
    correctOptionIds: [a, b, c]
    explanation: "The lesson sets out three evaluation protocols. Categorical classification returns a verdict of sure, likely or impossible, so a state such as the remaining numbers [17, 39] with a target of 24 is ruled out before it is explored. Scalar scoring assigns a calibrated value on a scale from 0.0 to 1.0 or an integer from 1 to 10 against a rubric of intermediate coherence, constraint satisfaction and progress. Cross-state comparison voting asks the model which of k sibling states is most promising when individual scores are noisy. Backtracking is part of the depth-first search algorithm, not an evaluation protocol. Lesson section: Pillar 3: State Evaluation."
  - id: "758e7fcf-f914-44eb-866c-a2030d1b728b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "What does the lesson say about simulating a panel of experts inside a single prompt? Select every correct answer."
    options:
      - id: a
        text: "It often produces simulated consensus rather than authentic verification"
      - id: b
        text: "The sycophantic bias can make the Auditor endorse the Algebraist's flawed arithmetic"
      - id: c
        text: "Isolated sessions, where one model is told to assume the step is wrong and find the error"
      - id: d
        text: "It is the recommended way to run formal verification, because one context keeps the panel consistent"
    correctOptionIds: [a, b, c]
    explanation: "Because the transformer generates autoregressively inside a single unified context window, the Auditor attends directly to the Algebraist's confident assertions, and the model's sycophantic bias makes it statistically inclined to agree with the premises already established in its context. The lesson's fix for mission-critical work is to run the personas in isolated sessions, where one model receives only the problem statement and the candidate step under an adversarial prompt telling it to assume the step is wrong, and true consensus means independent, non-sharing models reaching unanimous agreement. Keeping the panel in one context is the failure mode, not the remedy. Lesson section: The Single-Prompt Multi-Persona Hallucination Trap."
  - id: "0a3c31f6-ff22-4b16-8a37-099921f162a0"
    revision: 1
    status: active
    type: true-false
    prompt: "Chain-of-Density holds the total word count of the summary constant across its iterations, so the gain in density comes from compression rather than from length."
    answer: true
    explanation: "The lesson's 5-step protocol makes the constant budget a strict rule: each iteration injects one to three missing entities while the total word count stays identical, and the model meets that rule through syntactic fusion, the removal of filler and the pruning of padding. That constraint is what separates a dense summary from the incoherent telegraphs the lesson warns about, and it is why the walkthrough can show two summaries of 26 words, one with 2 entities and one with 5. Lesson section: The 5-Step Recursive Refinement Protocol."
  - id: "ed3ca00d-6536-44e6-bef3-d7dc4b16d3ce"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the four pillars of Tree-of-Thought, and why the choice of step granularity decides whether the search works."
    sampleAnswer: "The four pillars are thought decomposition, which sets the step granularity s as the smallest semantic unit that can be judged on its own; thought generation G(p_theta, s, k), either by sampling k independent candidates at a temperature between 0.7 and 1.0 or by asking for k distinct, non-overlapping proposals in one low-temperature prompt; heuristic state evaluation V(p_theta, S), which scores an intermediate state rather than waiting for a finished proof; and the tree search algorithm, breadth-first with a beam or depth-first with backtracking. The granularity decides everything downstream, because a step that is too small makes the tree astronomically deep and hard to evaluate, while a step that is too large collapses the search back into linear generation with no meaningful intermediate evaluation. In Game of 24 a step is a single two-operand equation; in software engineering it is a single function signature or loop invariant."
    explanation: "A strong answer names all four pillars with their symbols, gives the two generation strategies, and explains both failure modes of a badly chosen step size with a concrete unit for one domain. An answer that lists only generation and search has skipped the two pillars that make the search possible."
  - id: "7d8e152e-c300-439d-a8f2-f37c6ea5bf6c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the density-coherence trade-off that Chain-of-Density resolves, and say where a production pipeline should stop."
    sampleAnswer: "The two standard prompts fail in opposite directions: one asks for a clear, concise summary and produces low-density fluff, with a density below 0.08 and prose padded with empty transition phrases; the other demands maximum density and extreme brevity and produces incoherent telegraphs, such as comma-separated keyword piles with the relational verbs stripped out. Chain-of-Density resolves this by recursion rather than by instruction: an entity-sparse skeleton of about 80 to 100 words is rewritten four more times, each time absorbing one to three missing entities while the total word count stays identical, which forces syntactic compression. Annotators preferred Step 3 at a density near 0.15, with Step 4 near 0.18 preferred by analysts, and Step 5 at 0.22 and above brings telegraphic jargon, pronoun ambiguity and reading fatigue, so a pipeline should stop at Iteration 3 for general audiences and Iteration 4 for analytical desks."
    explanation: "A strong answer gives both failure modes with their densities, explains why the constant word budget produces the gain, and states the stopping rule with the preference figures behind it. An answer that only says denser is better has missed the trade-off the chapter is built around."
```

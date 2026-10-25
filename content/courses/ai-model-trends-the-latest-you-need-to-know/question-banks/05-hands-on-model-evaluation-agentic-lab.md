---
id: "b79e3629-b49f-4c23-b291-6be987cd334a"
title: "Hands-On Implementation Lab: Multi-Model Evaluation & Automated Contract Harness in Python: Question Bank"
description: "Practises the lesson's rubric contracts, position-debiased judging, composite scoring, QCEI leaderboard and content-addressed prompt cache."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - llm
  - study-guide
  - assessment
  - active-recall
courseId: "ecb81404-0f2d-495f-bd30-290140707fa3"
comments: false
---

These questions practise [[courses/ai-model-trends-the-latest-you-need-to-know/lessons/05-hands-on-model-evaluation-agentic-lab|Hands-On Implementation Lab: Multi-Model Evaluation & Automated Contract Harness in Python]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "b2ace5d9-7a86-4aed-b72c-601995912aa4"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson's Pydantic contract enforce about rubric weights?"
    options:
      - id: a
        text: "The criterion weights must sum to 1.0, checked with a tolerance of 0.99 to 1.01"
      - id: b
        text: "The criterion weights must all be identical, so that no single criterion can dominate the score"
      - id: c
        text: "The criterion weights are optional, and a rubric carrying no criteria at all is accepted unchanged"
      - id: d
        text: "The criterion weights are converted to percentages and multiplied by 100 before the judge prompt is assembled"
    correctOptionIds:
      - a
    explanation: "The rubric model carries a field validator that sums the criterion weights and raises unless the total falls between 0.99 and 1.01, so the criteria must add up to 1.0 within a small tolerance. Option b would forbid a rubric with a deliberately weighted emphasis. Option c is wrong because an empty rubric list is returned unchanged but the sum rule still applies whenever criteria are present. Option d describes a conversion the harness never performs."

  - id: "9a82abaf-cd46-47a0-8966-60286cd90928"
    revision: 1
    status: active
    type: single-choice
    prompt: "What position bias does the lesson report, and what does the harness do about it?"
    options:
      - id: a
        text: "Judges favour Candidate 1 between 55% and 68% of the time, so the harness simply always puts the stronger model in the first position"
      - id: b
        text: "Judges favour Candidate 1 55% to 68% of the time, so each pair is judged twice and averaged"
      - id: c
        text: "Judges are unbiased by construction, so the harness evaluates every pair exactly once in a fixed order"
      - id: d
        text: "Judges favour the second candidate instead, so the harness always presents the open-weight model second"
    correctOptionIds:
      - b
    explanation: "Empirical studies show models favour Candidate 1 between 55% and 68% of the time regardless of actual quality, so the harness evaluates each pair twice, once with the candidate in Position 1 and once in Position 2, and averages the two results to get the debiased win rate or the debiased rubric score. Option a would bake the bias in rather than remove it. Option c denies the bias the lesson documents. Option d has the direction of the bias wrong."

  - id: "13d1b6c5-bfab-4291-a884-e6b78c5eb72d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the harness do with a candidate output that fails deterministic validation?"
    options:
      - id: a
        text: "It still sends the output to the LLM judge, in case the judge can recognise that the failure is cosmetic"
      - id: b
        text: "It retries the task against the same model until the deterministic checks finally pass"
      - id: c
        text: "It assigns a score of 0 immediately and skips the LLM judge, avoiding unnecessary judge token cost"
      - id: d
        text: "It sends the output to the judge but discounts whatever score the judge returns by half"
    correctOptionIds:
      - c
    explanation: "The deterministic verifier parses the output into an AST, runs regex assertions and checks for required symbols, and the orchestrator only calls the judge when the deterministic baseline has passed. A failing output is scored 0 straight away, so no judge tokens are spent on something that does not even compile. Option a spends tokens for no reason and risks a lenient grade on broken code. Option b invents a retry loop the harness does not have. Option d contradicts the stated scoring flow."

  - id: "7eb5fe0b-43f9-4544-bc41-253771fff0de"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the harness build the composite score for a response that passes its deterministic checks?"
    options:
      - id: a
        text: "It averages the deterministic score ratio and the judge's normalized score with equal weight"
      - id: b
        text: "It uses the judge's normalized score alone, because the deterministic checks are only a gate"
      - id: c
        text: "It takes the higher of the deterministic ratio and the judge score, so a strong judge can rescue a weak check"
      - id: d
        text: "It weights the deterministic ratio at 30% and the blinded judge's normalized score at 70%"
    correctOptionIds:
      - d
    explanation: "The orchestrator computes the composite score as the deterministic score ratio multiplied by 30.0 plus the judge's normalized score multiplied by 0.70, so the qualitative rubric carries 70% of the weight and the deterministic evidence 30%. Option a ignores the stated weighting. Option b drops the deterministic term entirely. Option c is not what the code does, and it would let a judge's opinion override an objective failure."

  - id: "c74bfba2-25df-4a60-bd2e-09361b382355"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the lesson's Quality-to-Cost Efficiency Index?"
    options:
      - id: a
        text: "The mean benchmark score divided by the cost per 1,000 tasks in US dollars"
      - id: b
        text: "The cost per 1,000 tasks divided by the mean benchmark score, so that a lower figure is better"
      - id: c
        text: "The mean benchmark score divided by the total prompt tokens consumed across the whole suite"
      - id: d
        text: "The p95 latency divided by the composite score, so that slower models rank higher on the index"
    correctOptionIds:
      - a
    explanation: "QCEI is the mean benchmark score on a 0 to 100 scale divided by the cost per 1,000 tasks in US dollars, and higher numbers mean better engineering value. Option b inverts the ratio, which would reward expensive models. Option c measures tokens instead of money, which misses prompt caching discounts and per-provider pricing. Option d has nothing to do with the definition and would rank the slowest model first."

  - id: "c8b6176e-559a-49cb-acdf-6c53a385ae01"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which model leads the harness's benchmark leaderboard on the QCEI index?"
    options:
      - id: a
        text: "Claude Sonnet 5, with a 97.4% pass rate, a 94.8 composite score, $18.420 per 1k tasks and a QCEI of 5.1"
      - id: b
        text: "Gemini 3.5 Flash, with 88.2% pass rate and a QCEI of 216.1"
      - id: c
        text: "GLM 5.2, with 94.8% pass rate, a 91.6 composite score and a QCEI of 15.7"
      - id: d
        text: "GPT-5.5, with 96.2% pass rate, a 93.2 composite score and a QCEI of 9.5"
    correctOptionIds:
      - b
    explanation: "Gemini 3.5 Flash leads the QCEI column at 216.1, because its $0.380 cost per 1,000 tasks more than compensates for its lower 88.2% pass rate and 82.1 composite score; DeepSeek V4 is next at 63.0. Claude Sonnet 5 leads on absolute pass rate and composite score but scores only 5.1 on the index because it costs $18.420 per 1,000 tasks. Options a, c and d name real rows of the leaderboard but not the leader of that column."

  - id: "8f37d123-3429-48b8-9674-4498990be17c"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the harness's content-addressed cache key on, and what does a cache hit return?"
    options:
      - id: a
        text: "On the model's vendor name alone, so a cached response can be reused across every model in the suite"
      - id: b
        text: "On the task id alone, so any run of the same task returns the very first recorded answer"
      - id: c
        text: "On a SHA-256 hash of model id, system prompt, user prompt, temperature and seed, returning a $0.00 cached response"
      - id: d
        text: "On a SHA-256 hash of the raw response text, so the engine can detect, compare and skip every duplicate model output it has already recorded before it"
    correctOptionIds:
      - c
    explanation: "The engine derives a deterministic SHA-256 fingerprint from the tuple of model id, system prompt, user prompt, temperature and seed, and a hit returns the previously recorded response immediately with no network latency and $0.00 of token cost, so a repeat run costs nothing and finishes in under a millisecond. Option a would serve one model's answer to another. Option b ignores the sampling parameters. Option d hashes the output rather than the request, so it could not find a response to return."

  - id: "521a5013-9c9e-4346-892e-3251ccaa058c"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which behaviours does the lesson's harness implement? Select every correct answer."
    options:
      - id: a
        text: "Rubric weights are validated so that they sum to 1.0, with a tolerance of 0.99 to 1.01."
      - id: b
        text: "An output that fails deterministic validation is scored 0 and never reaches the LLM judge."
      - id: c
        text: "Each candidate pair is evaluated twice, once in each position, and the two results are averaged."
      - id: d
        text: "Candidate completions are labelled with their vendor names so the judge knows which model produced them."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c are all implemented in the lesson's code: the rubric field validator, the deterministic gate in the orchestrator, and the two-position debiasing in the judge engine. Option d is the opposite of what the judge engine does. The lesson insists on stripping model names, assigning random identifiers such as Candidate Alpha, and testing across both permutations, because a judge shown vendor names penalizes the second one through brand recognition and second-position fatigue."

  - id: "4104b449-7613-4918-a2fb-55ea734e4516"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about the leaderboard the harness produced across 500 real-world tasks are correct? Select every correct answer."
    options:
      - id: a
        text: "Claude Sonnet 5 leads on pass rate at 97.4% with a composite score of 94.8."
      - id: b
        text: "Gemini 3.5 Flash has the lowest cost per 1,000 tasks at $0.380 and the lowest p50 latency at 310 ms."
      - id: c
        text: "DeepSeek V4 records a QCEI index of 63.0."
      - id: d
        text: "GLM 5.2 matches Claude Sonnet 5's pass rate of 97.4%."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c all match the leaderboard table: Sonnet 5 at 97.4% and 94.8, Flash at $0.380 and 310 ms p50, and DeepSeek V4 at 63.0 on the index. Option d is wrong because GLM 5.2 records 94.8% pass rate, which the lesson frames as 96.6% of Claude Sonnet 5's composite score of 94.8 at 31.6% of the token cost."

  - id: "68c0bc27-c202-45ee-8783-675a8941e590"
    revision: 1
    status: active
    type: true-false
    prompt: "The harness's composite score weights the deterministic score ratio at 30% and the blinded judge's normalized score at 70%."
    answer: true
    explanation: "That is the formula the orchestrator uses, and it applies only when the deterministic baseline passed and the task carries a rubric. A response that fails the deterministic check contributes only its ratio multiplied by 30, with no judge score added at all."

  - id: "1f036bdf-1ea4-4bf0-aae6-b53d34c8ac9e"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the content-addressed SHA-256 prompt cache contributes to the harness, and what the key tuple must contain."
    sampleAnswer: "The cache makes repeat runs idempotent. The engine computes a deterministic SHA-256 fingerprint from the tuple of model id, system prompt, user prompt, temperature and seed, and uses that hash as the key into a local disk-backed store. If the hash is already present, the engine returns the previously recorded response immediately, with no network latency and $0.00 of token cost, so a repeat run of the same benchmark costs nothing and completes in under a millisecond. Including the model id and the sampling parameters in the tuple is what makes the key safe: two different models or two different temperatures produce different hashes and therefore cannot contaminate one another."
    explanation: "A strong answer names the five-part tuple, the model id, system prompt, user prompt, temperature and seed, and explains the effect, $0.00 and under a millisecond on a hit. It should also say why the tuple must include the model and the sampling parameters, because a hash of the prompt alone would return another model's answer. An answer that only says it is a cache has missed the idempotency claim."

  - id: "c309ccc6-1a2c-4a3c-ac54-c9e139a8aac3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the harness never sends a failing output to the LLM judge, and what the composite score is made of."
    sampleAnswer: "Deterministic checks are cheap and objective: the harness parses the output into an AST, runs regex assertions and checks for the required symbols, and derives a score ratio from those results alone. If the output does not pass, the harness awards a score of 0 and never calls the judge, because there is no point paying judge tokens to grade something that does not even compile, and because a judge asked to grade broken code may reward it anyway. When the deterministic baseline passes and the task carries a rubric, the blinded judge scores the anonymized candidate against the rubric, and the final composite is the deterministic score ratio multiplied by 30.0 plus the judge's normalized score multiplied by 0.70."
    explanation: "A strong answer gives both halves, the deterministic gate that skips the judge and the 30/70 blend that builds the composite. It should mention the cost argument, that judge tokens are wasted on a non-compiling output, and that the judge is blinded and anonymized. An answer that only states the blend has missed why the gate exists."
```

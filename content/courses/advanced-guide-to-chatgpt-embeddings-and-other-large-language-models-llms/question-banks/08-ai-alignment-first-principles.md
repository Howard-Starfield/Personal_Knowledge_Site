---
id: "3a6d0f92-7c48-4e15-b830-5d91c7e2f4a6"
title: "Chapter 8: AI Alignment: First Principles, Ethics & Red Teaming: Question Bank"
description: "Practice questions for the alignment chapter: outer against inner alignment, the 3H triad and the helpfulness-harmlessness frontier, Bradley-Terry preference modelling and margin loss, the three reward-hacking modes, jailbreak families, Constitutional AI, and the production defence-in-depth topology."
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

These questions practise [[courses/advanced-guide-to-chatgpt-embeddings-and-other-large-language-models-llms/lessons/08-ai-alignment-first-principles|Chapter 8: AI Alignment: First Principles, Ethics & Red Teaming]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "8e4c7b20-5d93-4a16-b7f8-1c03d9a2e6b5"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the difference between outer alignment and inner alignment?"
    options:
      - id: a
        text: "Outer asks whether the objective captures what we meant; inner asks whether the trained network pursues it"
      - id: b
        text: "Outer asks whether the network has enough parameters; inner asks whether the dataset was balanced across classes"
      - id: c
        text: "Outer concerns the input guardrails and inner concerns the output filter, so they sit at opposite ends of the pipeline"
      - id: d
        text: "Outer is a training-time concern and inner is an inference-time concern, so only one of them needs evaluating"
    correctOptionIds: [a]
    explanation: "a is correct: outer alignment asks whether the objective function or reward model faithfully captures what was actually intended, and inner alignment asks whether gradient descent produced a network that internally pursues that objective rather than a proxy for it. b, c and d misplace both halves. The chapter's matrix locates the outer failure in the loss function, reward model or prompt and the inner failure in the internal weights, representations and heuristics. Lesson section: Outer vs. Inner Alignment."
  - id: "2b7d4e08-6a35-4c97-8f21-0d93b5e7c4a1"
    revision: 1
    status: active
    type: single-choice
    prompt: "Under the lesson's Bradley-Terry model, what happens when the winning and losing completions receive identical rewards?"
    options:
      - id: a
        text: "The model prefers the winner, because the sigmoid stays monotonic even when the two arguments are equal"
      - id: b
        text: "The model prefers the loser, because the negative log-likelihood inverts the ordering of the two rewards"
      - id: c
        text: "The preference is a coin flip, because the sigmoid of a zero difference is exactly one half"
      - id: d
        text: "The result is undefined, because the margin penalty requires a strictly positive gap between the rewards"
    correctOptionIds: [c]
    explanation: "c is correct: the preference probability is the sigmoid of the reward difference, and the sigmoid of zero is one half, so an equal reward leaves the comparison as a coin flip. That symmetry is one of the three properties the chapter verifies, alongside monotonicity, where the winning probability tends to one as the gap grows, and inversion, where a losing response with the higher reward drives the probability below one half. a and b contradict the monotonicity of the sigmoid, and d is wrong because the margin is a training-time penalty on the loss, not a constraint on the model's outputs. Lesson section: Mathematical Derivation of the Bradley-Terry Model."
  - id: "f6190c37-3a84-4d05-b72e-8c9a5d1e3f60"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the margin penalty in the reward-model loss buy?"
    options:
      - id: a
        text: "It caps the reward scale, so the reward model cannot output values beyond the annotator rating range"
      - id: b
        text: "It forces a decisive separation in score space before the loss converges to zero on high-consensus pairs"
      - id: c
        text: "It weights the winning and losing terms differently, so the model favours confident preferences over ambiguous ones"
      - id: d
        text: "It regularises the transformer backbone, so the reward model overfits the preference dataset less severely"
    correctOptionIds: [b]
    explanation: "b is correct: the margin subtracts a positive gamma inside the sigmoid, so the reward model must separate the two completions by at least that amount before the cross-entropy term vanishes, which stops it from assigning near-identical rewards to responses where the human annotators had overwhelming consensus. a, c and d describe effects the chapter does not attribute to gamma, which enters only inside the reward difference. Lesson section: Derivation of the Reward Model Loss Function."
  - id: "c3058b71-9f46-4e28-a0d7-6b1e4c9f2a83"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the lesson prefer pairwise preference comparison to asking annotators for a score from 1 to 10?"
    options:
      - id: a
        text: "Because a scalar scale lets a single annotator set the anchor for the whole dataset, which the model then memorises"
      - id: b
        text: "Because pairwise comparison produces an absolute reward for each completion, which is what the optimiser needs"
      - id: c
        text: "Because pairwise comparison can be gathered without human effort, so the preference dataset scales without cost"
      - id: d
        text: "Because annotators disagree far less on which of two completions is better than they do on an absolute number"
    correctOptionIds: [d]
    explanation: "d is correct: direct scalar scoring fails for three psychometric reasons, inter-annotator calibration variance where one annotator's 7 out of 10 is another's 4 out of 10, temporal drift as an annotator's internal scale shifts over the week, and low inter-rater agreement on intermediate numbers, whereas the chapter reports over 85% agreement on the simple comparative question of which of two completions is better. b is wrong because pairwise comparison yields a relative preference, not an absolute reward, and a and c misstate the cost and the anchor problem. Lesson section: Why Not Direct Scalar Scoring?"
  - id: "7d19e4a6-2c50-4b83-9f07-6a3d8c5b1e24"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which pairing of symptom and root cause matches the lesson's reward-hacking taxonomy?"
    options:
      - id: a
        text: "Sycophancy, caused by the reward model rewarding high vocabulary diversity and polite phrasing"
      - id: b
        text: "Length inflation, caused by the reward model learning that reward is proportional to token count"
      - id: c
        text: "Length inflation, caused by annotators rewarding responses that agree with their existing personal views"
      - id: d
        text: "Superficial politeness, caused by the transformer backbone running at a lower precision during training"
    correctOptionIds: [b]
    explanation: "b is correct: mode one of reward hacking is verbosity hacking, where evaluators unconsciously conflate length and bullet points with intellectual depth, so the reward model learns a reward roughly proportional to the token count and the policy balloons response length by 300% to 500% without adding information. a and c each swap the root causes of the sycophancy and length modes, and d invents a mechanism the chapter does not give. Lesson section: The Three Reward Hacking Modes."
  - id: "a540e6c8-7b31-4d97-8c25-3f0b7d2e6a41"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the lesson mean by the alignment tax?"
    options:
      - id: a
        text: "The drop in general capability, such as reasoning or coding, that comes from applying safety conditioning"
      - id: b
        text: "The extra latency and cost of running a dedicated guardrail model in front of the aligned model"
      - id: c
        text: "The loss of helpfulness on a fixed benchmark set when the harmlessness score is held constant"
      - id: d
        text: "The manual effort of writing the constitution and of reviewing every preference pair before training"
    correctOptionIds: [a]
    explanation: "a is correct: the alignment tax is the reduction in general capabilities such as mathematical problem-solving, creative writing or raw coding agility that occurs when safety conditioning is applied, and it shows up in two failure modes, capability degradation where the safety loss pushes weights away from complex reasoning pathways and causes regressions on GSM8K or HumanEval, and refusal cascades where the model becomes hyper-sensitive to benign lexical triggers. b, c and d describe engineering costs and trade-offs that the chapter treats separately. Lesson section: The Alignment Tax."
  - id: "0e7b2c49-5d18-4a63-b790-8c4f1e6a3d27"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did the lesson report about the Greedy Coordinate Gradient attack?"
    options:
      - id: a
        text: "It needs per-prompt optimisation for every target, so it cannot be reused against a different model"
      - id: b
        text: "It only works on open-source models with white-box gradient access, because the proprietary APIs never exposed gradients"
      - id: c
        text: "It works by rewriting the harmful request into a low-resource language whose safety data is sparse"
      - id: d
        text: "It produces a universal suffix that transfers, jailbreaking black-box APIs from suffixes trained on open models"
    correctOptionIds: [d]
    explanation: "d is correct: the attack optimises a token sequence against the target log-likelihood so that the model begins with an affirmative answer, and because the optimised suffix is universal it transfers across models, with suffixes trained on open-source Llama-2 successfully jailbreaking proprietary black-box APIs. a and b deny the universality and the transferability that make the attack alarming, and c describes the low-resource cross-lingual jailbreak family, which is a different vector in the taxonomy. Lesson section: Deep Dive: GCG (Greedy Coordinate Gradient) Attacks."
  - id: "5b90d3e7-1c68-4f24-a9b6-0e7d3f1c8a42"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three alignment pathologies does the lesson name in its section on what engineers miss most? Select every correct answer."
    options:
      - id: a
        text: "The false refusal avalanche, where aggressive safety penalties reject benign professional queries"
      - id: b
        text: "The reward model underfit, caused by training on too few preference pairs for the task domain"
      - id: c
        text: "The token obfuscation bypass, where moderation data being 95% English leaves low-resource gaps"
      - id: d
        text: "Inner alignment deception, where the model behaves differently once it recognises an evaluation setting"
    correctOptionIds: [a, c, d]
    explanation: "a, c and d are the three pathologies in the chapter's section on what engineers miss most. Tuning safety penalties too hard makes the model refuse benign professional requests such as debugging a script, reading oncology notes or analysing a history essay, and the chapter's point is that users then migrate to unaligned open-source models rather than becoming safer. Because 95% of enterprise safety moderation data is standard English, adversaries encode requests in Base64, hex or leetspeak or translate them into languages the base model understands but the safety layer never saw. And an advanced model can recognise standard benchmark prompt formatting and mimic aligned responses during testing before reverting in production. b is not one of the three named pathologies. Lesson section: The \"Most Missed Things\" in AI Alignment."
  - id: "3c8d1a56-9e27-4b50-8f13-5d70b4e9c2a8"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which three statements about the production defence-in-depth topology are correct? Select every correct answer."
    options:
      - id: a
        text: "Layer 1 decodes Base64, hex and ROT13 payloads and strips zero-width characters before anything else"
      - id: b
        text: "Layer 2 is a standalone guardrail model that classifies intent against safety taxonomies in about 15ms"
      - id: c
        text: "Layer 3 is a hardcoded regex blacklist that rejects any prompt containing a restricted keyword"
      - id: d
        text: "Layer 4 checks the candidate response for PII leakage, leaked system prompts and toxic tokens"
    correctOptionIds: [a, b, d]
    explanation: "a, b and d are correct. The perimeter layer canonicalises obfuscated input, the guardrail layer classifies intent against taxonomies covering violent crimes, non-violent crimes, chemical and biological hazards, child exploitation, defamation and cyberattacks in about 15 milliseconds, and the output layer screens the candidate completion for leakage. c is wrong because layer 3 is the core constitution-aligned foundation model that produces a safe and still useful answer, not a keyword filter, and the chapter's own worked case has the constitutional model decline to write the exploit script while still explaining how injection works and how to prevent it with parameterised queries. Lesson section: Defense-in-Depth Architecture."
  - id: "6f2a9c07-3b85-4d61-8e47-0a9c5b3d1e68"
    revision: 1
    status: active
    type: true-false
    prompt: "True or false: the lesson says Constitutional AI has two phases, a supervised critique-and-revision pass on red-team prompts followed by reinforcement learning from AI feedback where the preference model is trained on the model's own comparisons."
    answer: true
    explanation: "True. Phase 1 is supervised fine-tuning on a critique-and-revision loop: the base model is prompted with red-team material to elicit an unaligned response, the model is asked to critique that response against a written constitutional rule, then to rewrite it, and the model is fine-tuned on the revised pairs. Phase 2 is reinforcement learning from AI feedback, in which the model generates two candidate completions, a feedback model judges which one better adheres to the constitution, a preference reward model is trained directly from those AI comparison choices, and the policy is optimised against it with PPO or DPO. The chapter's argument is that AI feedback is transparent, reproducible, instantly updatable by amending the written constitution, and orders of magnitude cheaper than contracting human evaluation teams. Lesson section: Constitutional AI: Aligning AI with AI Supervision."
  - id: "b4e07c31-8a62-4d19-95f3-0c7d2b8a6e15"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the difference between outer alignment and inner alignment, and give the lesson's case for each."
    sampleAnswer: "Outer alignment asks whether the objective function or reward model we wrote down actually captures what we intended. If the reward model rewards length because annotators like long bulleted answers, the policy optimises length instead of quality, and if it rewards agreement because evaluators like validation, the policy learns to confirm false premises; that is specification gaming, and the mismatch is between the argmax of the specified reward and the argmax of human intent. Inner alignment asks whether, even with a perfectly specified objective, gradient descent produced a network that internally pursues that objective rather than a proxy for it. During training the gradient descent acts as the base optimiser, and the network it produces can itself become a mesa-optimizer, finding a spurious proxy that correlates with the true objective on the training set and then diverges out of distribution. The chapter's own matrix puts the locus of outer failure in the loss function, the reward model or the prompt, with the mitigation being reward calibration, margin loss and RLAIF, and the locus of inner failure in the internal weights, representations and heuristics, with the mitigation being mechanistic interpretability, probing and red teaming."
    explanation: "A strong answer states both questions, gives one concrete failure for each, and names the mitigations the lesson attaches to each. An answer that only says one is about the objective and one is about the weights has not given the chapter's diagnosis."
  - id: "9a5c3e18-4d72-4b06-8f95-1e7d0b6a3c54"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the production defence-in-depth alignment topology the lesson gives, layer by layer, and say what each layer contributes."
    sampleAnswer: "Layer one is perimeter normalisation and a regex pre-processor: it decodes Base64, hex and ROT13 payloads to plaintext, strips zero-width unicode characters and character-spacing hacks, and checks high-confidence blacklists and regex patterns, so that obfuscation never reaches a classifier in encoded form. Layer two is a standalone input guardrail model such as Llama Guard or NeMo, which classifies the prompt intent against safety taxonomies covering violent crimes, non-violent crimes, chemical and biological hazards, child exploitation, defamation and cyberattacks and exploits, in roughly 15 milliseconds using a fast classifier or a 1B-parameter quantised model, and issues an immediate deterministic refusal when the input is unsafe. Layer three is the core foundation model itself, aligned through Constitutional AI and DPO with an internalised self-correction and balanced refusal policy, which is where a safe but still useful answer is produced rather than a bare refusal. Layer four is the output post-processor and circuit breaker, which evaluates the candidate completion for PII leakage, leaked system prompts and toxic tokens, and redacts or substitutes a neutral refusal when a breach is found. The lesson's principle is that no single layer prevents all attacks, so the layers are composed rather than chosen."
    explanation: "A strong answer names the four layers in order, gives the concrete job of each, and mentions the 15 millisecond guardrail and the purpose of the perimeter normaliser. An answer that only says the system uses guardrails has not described the topology."
```

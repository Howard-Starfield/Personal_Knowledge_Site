---
id: "bc47c0e7-30d1-4561-b517-a587dc37c06a"
title: "AI Basics: What Every Professional Needs to Know"
description: "A masterclass deconstructing artificial intelligence from first principles: the shift from rules to data, mechanics of neural networks and computer vision, autoregressive generation, enterprise adoption strategies, and on-device futures."
type: course
publish: true
status: active
created: "2026-09-30"
tags:
  - ai-foundations
  - machine-learning
  - generative-ai
  - neural-networks
  - enterprise-ai
  - ai-governance
difficulty: beginner
learningOutcomes:
  - "Deconstruct the fundamental paradigm shift from classical deterministic rule-based programming to empirical data-driven machine learning (y = wx + b)."
  - "Explain the mathematical mechanics of supervised learning, gradient descent, convolutional visual feature extractors, and the roots of algorithmic bias."
  - "Distinguish predictive classification from autoregressive next-token text generation, diagnosing why LLMs inherently trade off fluency against truth."
  - "Implement Retrieval-Augmented Generation (RAG) and autonomous ReAct agent architectures to ground language models in verified facts and operational actions."
  - "Apply the 20-minute task rule, conversational data exploration, and the 5-question vendor audit rubric to deploy AI safely in enterprise workflows."
  - "Evaluate the strategic trade-offs of edge/on-device Small Language Models (SLMs) vs cloud architectures, deepfake cryptographic provenance, and long-term skill acquisition."
prerequisiteIds: []
order: 39
comments: false
---

# AI Basics: What Every Professional Needs to Know

**Instructor:** Laurence Moroney (Former Lead AI Advocate at Google, Author & AI Educator)  
**Curated & Rewritten with:** Feynman Learning Technique for the Knowledge Fieldbook  
**Original Source:** LinkedIn Learning (_AI Basics: What Every Professional Needs to Know_)

---

## Beyond the Pixie Dust: From Magical Thinking to Mechanical Software

Every generation of computing experiences a wave of magical thinking. In the 1990s, the internet was hailed as a mystical realm that would effortlessly dissolve all friction in human commerce. In the 2020s, Artificial Intelligence is frequently marketed as "magic pixie dust"—sprinkle a little on any broken business process, product backlog, or quarterly forecast, and effortless prosperity will magically emerge.

The reality, as veteran Google AI advocate **Laurence Moroney** emphasizes, is radically more grounded and infinitely more interesting: **AI is not magic. It is software, and underneath the hood, the gears are turned by mathematics, data distributions, and optimization algorithms.**

When professionals treat AI as magic, they become vulnerable to two catastrophic extremes:

1. **The Cynical Dismissal:** Dismissing breakthroughs as mere hype or "autocomplete on steroids" and getting blindsided when competitors automate core workflows.
2. **The Credulous Surrender:** Trusting probabilistic language models to make unverified enterprise decisions, resulting in hallucinations, regulatory liabilities, and brand-damaging "work slop."

To lead, engineer, and build in the modern enterprise, you must master the mechanics underneath the interface.

```
========================================================================================
                          THE COMPUTATIONAL PARADIGM SHIFT
========================================================================================

  [CLASSICAL PROGRAMMING: DEDUCTIVE REASONING]

       ┌──────────┐
       │   DATA   │──────┐
       └──────────┘      │
                         ▼
                   ┌───────────┐
                   │  COMPUTER │ ────────► [ANSWERS / OUTPUT]
                   └───────────┘
                         ▲
       ┌──────────┐      │
       │  RULES   │──────┘
       └──────────┘

  --------------------------------------------------------------------------------------

  [MACHINE LEARNING: INDUCTIVE REASONING]

       ┌──────────┐
       │   DATA   │──────┐
       └──────────┘      │
                         ▼
                   ┌───────────┐
                   │  COMPUTER │ ────────► [RULES / MODEL PARAMETERS]
                   └───────────┘
                         ▲
       ┌──────────┐      │
       │ ANSWERS  │──────┘
       └──────────┘
========================================================================================
```

---

## Pedagogical Philosophy: The Feynman Engine

Every lesson in this curriculum follows the **Feynman Learning Technique**:

1. **Concrete Physical Analogies:** Complex distributed algorithms (gradient descent, convolutional kernels, autoregressive sampling, vector retrieval) are anchored in tangible physical models before mathematical formalization.
2. **Mathematical & Algorithmic Rigor:** Every intuition is paired with formal equations—convex loss landscapes, convolution matrix dot products, categorical softmax token sampling, and precision/recall tradeoff curves.
3. **The "Most Missed Things":** Dedicated engineering warnings (`> [!warning]` and `> [!caution]`) expose hidden operational vulnerabilities: data leakage, the "White Shoes" distribution trap, fluency-over-truth hallucination traps, and vendor vaporware.
4. **Actionable Enterprise Frameworks:** Practical decision matrices including the **20-Minute Task Rule**, the **AI Lie Detector Vendor Rubric**, and the **Edge vs. Cloud Latency-Privacy Tradeoff**.

---

## Course Curriculum & Syllabus

The curriculum spans **7 focused units**, taking you from foundational machine learning mechanics to enterprise deployment and diagnostic certification.

| Lesson                                                                                                      | Focus & Core Concepts                                                                        | Order                                                                                                                                                                                                      | Est. Time |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/00-breaking-the-hype-and-mental-models  | Chapter 0: Breaking the Hype: The Paradigm Shift from Rules to Data]]**                      | Stripping away the pixie dust, classical software vs machine learning, prompt engineering as structured human communication, the workforce displacement nuance, and eliminating corporate work slop.       | 1         | 20 min |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/01-mechanics-of-machine-learning        | Chapter 1: The Mechanics of Machine Learning: Neural Networks, Filters & Bias Math]]**       | Supervised learning equations, gradient descent, computer vision via convolutional kernels, training vs inference pipelines, and why algorithmic bias is distribution skew rather than malice.             | 2         | 25 min |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/02-generative-ai-llms-and-agents        | Chapter 2: Generative AI, Autoregressive LLMs & The Agentic Frontier]]**                     | Predictive vs generative architectures, next-token probability distributions, why transformers prioritize fluency over truth, RAG open-book architectures, and the leap to autonomous ReAct agents.        | 3         | 30 min |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/03-enterprise-strategies-and-governance | Chapter 3: Putting AI to Work: The 20-Minute Rule, Vendor Audits & Algorithmic Fairness]]**  | The 20-Minute Task Rule (the Goldilocks zone), conversational data analytics, English as software syntax, the 5-question vendor audit rubric, and solving the "White Shoes" fairness problem.              | 4         | 30 min |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/04-future-of-ai-safety-and-on-device    | Chapter 4: The Future of AI: Cryptographic Provenance, Small Models & Strategic Learning]]** | Deepfakes and digital trust (C2PA cryptographic watermarking), the minimalist AI stack, Cloud vs On-Device Small Language Models (SLMs), grokking the future, and moving from passive consumer to builder. | 5         | 35 min |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/05-glossary                             | Chapter 5: Architectural Taxonomy & Comprehensive A–Z AI Systems Dictionary]]**              | 5-Pillar Architectural Taxonomy Map and 50+ authoritative terms with physical Feynman intuition and operational enterprise contexts.                                                                       | 6         | 25 min |
| **[[courses/ai-basics-what-every-professional-needs-to-know/lessons/06-final-assessment                     | Chapter 6: Comprehensive 15-Scenario Active-Recall Diagnostic Assessment]]**                 | 15 challenging scenario-based diagnostic evaluations with collapsible solution accordions, distractor post-mortems, and a 4-tier grading rubric.                                                           | 7         | 35 min |

---

## Instructor Profile

**Laurence Moroney** is the former Lead AI Advocate at Google, a celebrated AI researcher, author of the bestselling book _AI and Machine Learning for Coders_ (O'Reilly), and creator of world-renowned deep learning specializations taken by millions of developers globally.

---

## How to Navigate This Course

- **Linear Progression:** Progress sequentially from Chapter 0 through Chapter 6 to build an unshakeable mechanical and strategic understanding of modern AI.
- **Reference Blueprints:** Each lesson contains standalone ASCII diagrams, mathematical formulations, and operational evaluation checklists.
- **Zero Completion Gates:** All content, code, architectural blueprints, and evaluation answers remain completely public and open for review.

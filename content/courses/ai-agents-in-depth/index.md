---
id: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
title: "AI Agents in Depth"
description: "A comprehensive, principle-driven guide to designing, building, evaluating, and evolving production AI agents."
type: course
publish: true
status: active
created: "2026-09-14"
tags:
  - ai-agents
  - llm
  - system-design
difficulty: advanced
learningOutcomes:
  - "Master the foundational formula: Agent = LLM (Brain) + Context (Eyes) + Tools (Hands and Feet)."
  - "Design robust context engineering pipelines, KV cache reuse, and context compression strategies."
  - "Build long-term user memory, hybrid RAG pipelines, and agentic retrieval systems."
  - "Implement tool calling interfaces, MCP standards, and safety harnesses for execution."
  - "Construct scientific agent evaluation benchmarks, LLM-as-a-Judge systems, and post-training RL loops."
  - "Coordinate multi-agent systems using shared/independent context and hierarchical architectures."
prerequisiteIds: []
order: 15
comments: false
---

# AI Agents in Depth: Design Principles and Engineering Practice

**Author:** Bojie Li  
**English Translation:** Devaraj  
**Original Repository:** [github.com/bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book)

Welcome to the complete English edition of **AI Agents in Depth: Design Principles and Engineering Practice**.

This course takes AI Agent design from intuition-driven tinkering to rigorous, principle-driven engineering. Across 10 in-depth chapters, an introduction, and an afterword, it systematically covers the four evolutionary layers of modern agent systems: **Building**, **Evaluation & Evolution**, **Interaction**, and **Multi-Agent Collaboration**.

## Course Structure & Reading Paths

| #   | Chapter / Section                                                        | Key Topics                                  |
| --- | ------------------------------------------------------------------------ | ------------------------------------------- |
| 0   | [[courses/ai-agents-in-depth/lessons/00-introduction                     | Introduction]]                              | Agent = LLM + Context + Tools, whisper coding, Pine AI lessons, four-stage cosmic evolution          |
| 1   | [[courses/ai-agents-in-depth/lessons/01-agent-fundamentals               | Chapter 1: Agent Fundamentals]]             | ReAct loop, 3 levels of updates, workflow vs autonomous agent orchestration                          |
| 2   | [[courses/ai-agents-in-depth/lessons/02-context-engineering              | Chapter 2: Context Engineering]]            | Message structure, KV Cache reuse, prompt engineering & injection, Skills, status bar, compression   |
| 3   | [[courses/ai-agents-in-depth/lessons/03-user-memory-and-knowledge-bases  | Chapter 3: User Memory & Knowledge Bases]]  | Memory strategies, Mem0, dense embedding & HNSW, BM25, Hybrid RAG, GraphRAG, Agentic RAG             |
| 4   | [[courses/ai-agents-in-depth/lessons/04-tools                            | Chapter 4: Tools]]                          | MCP standard, 5 tool categories, multimodal perception, execution security & sandboxing              |
| 5   | [[courses/ai-agents-in-depth/lessons/05-coding-agent-and-code-generation | Chapter 5: Coding Agent & Code Generation]] | OpenClaw architecture, code generation as meta-capability, dynamic tool synthesis                    |
| 6   | [[courses/ai-agents-in-depth/lessons/06-interaction                      | Chapter 6: Interaction: Expanding Space]]   | Async & event-driven execution, real-time voice, Computer Use (GUI), robotics (VLA)                  |
| 7   | [[courses/ai-agents-in-depth/lessons/07-agent-evaluation                 | Chapter 7: Agent Evaluation]]               | Tool-calling vs HCI environments, Pass@k vs Pass^k, LLM-as-a-Judge, benchmark closed loop            |
| 8   | [[courses/ai-agents-in-depth/lessons/08-model-post-training              | Chapter 8: Model Post-Training]]            | SFT memorizes, RL generalizes, PPO, GRPO, reward modeling, verified path penalties                   |
| 9   | [[courses/ai-agents-in-depth/lessons/09-continuous-agent-evolution       | Chapter 9: Continuous Agent Evolution]]     | Learning signals, 4 update carriers, candidate validation, canary releases, rollback                 |
| 10  | [[courses/ai-agents-in-depth/lessons/10-multi-agent-collaboration        | Chapter 10: Multi-Agent Collaboration]]     | Shared vs independent context, peer vs manager topologies, translation & phone+computer case studies |
| 11  | [[courses/ai-agents-in-depth/lessons/11-afterword                        | Afterword]]                                 | Two clouds over agents (streaming real-time & continuous experience), model-harness co-evolution     |
| 12  | [[courses/ai-agents-in-depth/lessons/12-reference-answers                | Reference Answers]]                         | Complete solutions and explanations for chapter thinking questions                                   |

Begin reading with [[courses/ai-agents-in-depth/lessons/00-introduction|Introduction: Agent = LLM + Context + Tools]].

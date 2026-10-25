---
id: "d8b2f12c-ab3f-45d1-a4b8-63f6ed1a7626"
title: "Chapter 2: Context Engineering: Question Bank"
description: "Practice questions for the Context Engineering chapter: KV cache-friendly context layout, prompt organisation, Agent Skills and the status bar, and context compression."
type: question-bank
publish: true
status: active
created: "2026-10-25"
tags:
  - ai-agents
  - study-guide
  - assessment
  - active-recall
courseId: "e6e1418a-c0a0-4902-a7d4-b4983a207446"
comments: false
---

These questions practise [[courses/ai-agents-in-depth/lessons/02-context-engineering|Chapter 2: Context Engineering]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "2f84db5e-fe49-4e63-a5fd-b3ab62347b7c"
    revision: 1
    status: active
    type: single-choice
    prompt: "An engineer added a live timestamp to the top of the system prompt. What did the chapter report happening as a result?"
    options:
      - id: hallucinated-time
        text: "The model began inventing the current time, because the timestamp it was given was already stale when it was read"
      - id: overflow
        text: "The prompt grew past the context window, so requests began failing outright with an overflow error before the model was ever called"
      - id: tools-dropped
        text: "The tool definitions were crowded out of the context, so the model could no longer emit tool calls"
      - id: cache-bust
        text: "The token sequence diverged on every call, busting the provider's Prompt Cache and pushing TTFT from 0.5s to 3-5s"
    correctOptionIds: [cache-bust]
    explanation: "cache-bust is correct: because prompt caching requires byte-for-byte token prefix equality, a timestamp near the very beginning of the context made every request a complete cache miss, so the engine recomputed the KV tensors for the system prompt, the tool definitions and the accumulated trajectory. The chapter reports TTFT rising from 0.5 seconds to 3-5 seconds and monthly API costs nearly doubling. hallucinated-time, overflow and tools-dropped are all effects the change did not cause; the failure was purely about cache invalidation and latency. Lesson section: caching as an architectural constraint."
  - id: "a6762479-a52c-47e6-ac7b-1273f98c0352"
    revision: 1
    status: active
    type: single-choice
    prompt: "Inference engines such as vLLM and SGLang keep their KV cache pages in a Radix Tree. What operational advantage does that give an Agent workload?"
    options:
      - id: weights-in-tree
        text: "It lets the engine keep the weights of every model variant in one structure, so switching models at runtime costs nothing"
      - id: longest-prefix
        text: "It finds the longest common prefix across requests, so a shared system prompt and tool schemas are prefilled only once"
      - id: compressed-keys
        text: "It compresses the cached keys themselves, so the cache occupies less GPU memory than the tokens it stands for"
      - id: private-caches
        text: "It guarantees every request gets its own private branch, so concurrent users can never read one another's context"
    correctOptionIds: [longest-prefix]
    explanation: "longest-prefix is correct: when a request arrives the engine matches its longest common prefix against the tree, and if that prefix — typically the unchanging system prompt plus the static tool schemas — has been seen before, the engine points straight at the existing KV buffers instead of recomputing them. weights-in-tree describes something the structure does not hold, compressed-keys is not what the tree does, and private-caches is the opposite of the sharing the tree enables. Lesson section: KV cache and prompt cache, two levels of caching."
  - id: "311c5fa8-5669-437e-86d3-986f70a7b50d"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the chapter place static instructions and tool definitions before the cache boundary and runtime conditions after it?"
    options:
      - id: attention-sink
        text: "Because the first token of a sequence is the attention sink, so only the earliest part of the context carries any weight at all in the computation"
      - id: accuracy
        text: "Because the model reads static text more accurately than dynamic text, since dynamic text was generated later"
      - id: cache-keys
        text: "Because every dynamic condition before the boundary multiplies the cache keys, so N binary conditions create 2^N variants"
      - id: template-render
        text: "Because the chat template renders the system prompt only once, so anything placed after it is dropped from the request"
    correctOptionIds: [cache-keys]
    explanation: "cache-keys is correct: with N independent binary runtime conditions — the operating system, a debug flag, the user's language — embedded in the system prompt prefix, the engine sees 2^N distinct prefixes, which fragments the cache pool and destroys the global hit rate in a multi-tenant system. attention-sink is a real phenomenon the chapter describes, but it is not the reason for the layout rule. accuracy is not a claim the chapter makes about static text. template-render misdescribes what a chat template does. Lesson section: caching as an architectural constraint."
  - id: "78afcc9d-8ac9-4c0c-a837-6c08c6800c78"
    revision: 1
    status: active
    type: single-choice
    prompt: "Experiment 2-3 kept only the ten most recent conversation turns in the context. What failure did that reliably produce?"
    options:
      - id: repeated-calls
        text: "The Agent re-issued the same tool calls in loops, because the early results it needed had fallen out of the window"
      - id: window-overflowed
        text: "The context overflowed the window, because the sliding window kept every tool result in full inside the history"
      - id: malformed-calls
        text: "The tool calls became malformed, because the sliding window pushed the tool definitions out of the context"
      - id: early-finish
        text: "The Agent finished early and declared success, because the sliding window had removed the original request from the context"
    correctOptionIds: [repeated-calls]
    explanation: "repeated-calls is correct: the sliding window caused severe amnesia — a configuration read or a repository map fetched in round 2 had slipped out of the ten-turn window by round 15, so the Agent needed it again, re-issued the same read, or invented missing parameters and looped on repeated queries. window-overflowed describes the opposite problem, which is what the sliding window was introduced to avoid. malformed-calls and early-finish are not the failure the experiment found. Lesson section: harmful context management patterns, Experiment 2-3."
  - id: "a78a46ce-97b6-41e4-9685-da818f70133d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter separates Context Overflow from Context Rot. Which distinction does it draw?"
    options:
      - id: messages-vs-tools
        text: "Overflow is a limit on the number of messages in the context, while Rot is a limit on the number of tools the Agent may call in one task"
      - id: prompt-vs-trajectory
        text: "Overflow happens only in the system prompt, while Rot happens only in the trajectory appended after it"
      - id: tokens-vs-characters
        text: "Overflow is measured in tokens and Rot is measured in characters, so the two conditions are compared on different scales"
      - id: loud-vs-silent
        text: "Overflow breaks the window and fails loudly, while Rot fits inside the window but scatters attention so decisions degrade silently"
    correctOptionIds: [loud-vs-silent]
    explanation: "loud-vs-silent is correct: Context Overflow is an overt hard constraint — the tokens exceed the window limit and the call errors out or is truncated. Context Rot is the insidious one: the prompt still fits comfortably, but irrelevant search dumps, outdated statuses and noisy tool outputs spread the finite attention budget across thousands of tokens, so the model quietly gets worse at finding what matters. messages-vs-tools, prompt-vs-trajectory and tokens-vs-characters are distinctions the chapter does not draw. Lesson section: context compression strategies."
  - id: "8ed5a9ab-a759-4a01-918b-daf1f7b9e544"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Tau-Bench ablation, what happened when the tone and style of the system prompt were changed, compared with flattening the hierarchy of the rules?"
    options:
      - id: tone-dominated
        text: "Tone and style moved the success rate far more than the structure of the rules did, so styling is what the benchmark measures"
      - id: structure-dominated
        text: "Tone and style barely moved the success rate, while flattening the structure of the rules dropped it by over 30%"
      - id: no-effect
        text: "Neither change moved the success rate, because the benchmark ignores the system prompt and reads only the tool calls"
      - id: both-helped
        text: "Both changes raised the success rate, because a longer and more varied prompt simply gives the model more to work with"
    correctOptionIds: [structure-dominated]
    explanation: "structure-dominated is correct: three distinct tone styles — professional, Trump-style and casual — produced minimal variation in task completion, while collapsing the SOP hierarchy and the chronological workflow into an unstructured pile of rules, even with every word of rule text retained, dropped the success rate by over 30%. tone-dominated reverses the finding. no-effect contradicts the ablation. both-helped has the sign backwards. Lesson section: prompt engineering, process-driven versus rule stacking."
  - id: "cf5ef22d-cf4b-4303-be26-17480e40dd60"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the Agent Status Bar do, and where does the chapter say it is injected?"
    options:
      - id: prefix-compression
        text: "It compresses the trajectory into a shorter summary, which is prepended to the static prefix ahead of the system prompt"
      - id: long-term-memory
        text: "It records the user's preferences across sessions, and is written to a long-term memory database outside the context"
      - id: tail-user-message
        text: "It writes implicit state out as explicit text and injects it as a user message at the end of the trajectory"
      - id: tool-schema-reminder
        text: "It repeats the tool schemas in a system message, so the Agent can find them again after the context has been compacted"
    correctOptionIds: [tail-user-message]
    explanation: "tail-user-message is correct: the status bar distills implicit state such as tool call counts, TODO checklists and directory paths into explicit structured text and injects it as a user-role message at the very end of the trajectory, where recency helps the model attend to it while the upstream KV cache prefix stays intact. prefix-compression, long-term-memory and tool-schema-reminder each describe a different mechanism that the status bar is not. Lesson section: the Agent status bar, its composition and its position in the context."
  - id: "26db3939-f067-4234-95b0-8b9f8b00392d"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are layers of the three-layer Progressive Disclosure architecture the chapter describes for Agent Skills? Select every correct answer."
    options:
      - id: metadata
        text: "Metadata — the skill's name and a routing description that says when to use it and when not to"
      - id: core-workflow
        text: "The core workflow, loaded from SKILL.md when the skill is triggered and not before"
      - id: retrained-weights
        text: "The model's base weights, retrained whenever a new skill is added to the catalogue of available skills"
      - id: details
        text: "Detail material, loaded only when the core workflow turns out to need it"
    correctOptionIds: [metadata, core-workflow, details]
    explanation: "metadata, core-workflow and details are correct: the three layers keep the skill's name and routing description resident in context so the model always knows what it has, load the full SKILL.md body on demand when the skill is triggered, and pull the detailed references only when the core workflow needs them. retrained-weights is wrong, because progressive disclosure exists precisely so that adding a skill costs no retraining and almost no tokens. Lesson section: dynamic prompts and Agent Skills."
  - id: "1adedb13-81d1-475b-a02f-db269a0e1ac3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter say the Harness must compute with deterministic code, rather than asking the model to work it out for itself? Select every correct answer."
    options:
      - id: call-count
        text: "How many times each tool has already been called during the current task"
      - id: relevant-paths
        text: "Which directories and file paths are currently relevant to the work in progress"
      - id: reply-wording
        text: "The wording the Agent should use when it finally replies to the person who asked"
      - id: todo-state
        text: "Which items on the TODO checklist are still open and which have already been finished"
    correctOptionIds: [call-count, relevant-paths, todo-state]
    explanation: "call-count, relevant-paths and todo-state are correct: the chapter's rule is that the status bar's counters and checklist state are maintained by the Harness, never by asking a model to count its own history, because the model trusts status-bar content almost unconditionally and a hallucinated counter poisons the decision-making that follows. reply-wording is a matter of the prompt and the model's judgement, not of deterministic accounting. Lesson section: the theoretical basis of the Agent status bar."
  - id: "bb7c0cf6-36ea-49f8-9a77-3074c94554ab"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter argues that in-context learning is essentially retrieval rather than reasoning, and it backs the argument with a model failing to count correctly across a hundred cat cages when it was not given the answer. Is that the argument the chapter makes?"
    answer: true
    explanation: "True — that is the chapter's thesis and the cat-cage counting failure is the illustration it uses. The point is that what a model can actually pull out of its context depends on how the information is structured and where it sits, rather than on reasoning alone, which is why the chapter recommends adding a distillation layer: context distillation and the status bar, active compression, sub-agent isolation, and interaction as a third axis where external instruments observe and write back information the model could not have thought up. Lesson section: the internal mechanism of in-context learning."
  - id: "8915ab47-7f9a-4c5d-829f-9998a1f89cbf"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why the chapter treats extreme compression as a lossy projection, and describe the architecture it recommends to keep the loss recoverable."
    sampleAnswer: "Compression is a projection: if the Agent later needs a dimension that the summary did not preserve — a specific identifier, a verification status, a detail buried in a long tool output — the information is simply gone, and no later reasoning can recover it. The recommended architecture is lossy compression plus lossless indexing: the raw tool output is written to disk or object storage and only a compact preview stays in the context, every compressed claim carries a source URL or file pointer so it can be traced back, and critical anchors such as UUIDs, timestamps, company names and verification statuses are preserved verbatim. Adaptive windowing postpones the moment of compression so the loss is as small as possible."
    explanation: "A strong answer names the risk, that compression is lossy and a question on an unpreserved dimension breaks, and then gives both halves of the remedy: the lossless index of raw outputs with pointers and citations, and the verbatim preservation of the anchors that matter. An answer that only says compression is risky has identified the problem without offering the architecture. Lesson section: production-grade hierarchical compression."
  - id: "c6135705-37d4-486c-9de5-945f9fe6af58"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the Agent Status Bar is, why an Agent needs it, and how the chapter says it must be kept reliable."
    sampleAnswer: "The status bar is a short block of explicit meta-information — tool call counts, a TODO checklist, the relevant directory paths — that the framework maintains and injects as a user message at the end of the trajectory. It exists because a model cannot reliably compute running aggregates over a long history in a single forward pass, so the harness computes them and hands them over. Reliability is a hard requirement, because the model trusts the bar almost unconditionally: the counters and constraint checks must be produced by deterministic Harness code and never by asking a model to count its own calls, the bar's accuracy should be tracked as a production metric, and its content must come only from reliable observations so it cannot be poisoned."
    explanation: "A strong answer covers all three parts — what the bar is, the counting limitation it works around, and the determinism rule that keeps it trustworthy. An answer that explains the purpose but not the reliability rule leaves out the point the chapter presses hardest, since a single hallucinated counter can make the Agent stop early or loop forever. Lesson section: the Agent status bar."
```

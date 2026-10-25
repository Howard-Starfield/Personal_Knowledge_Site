---
id: "16c069d6-fe09-42b4-aef1-bdeef923f125"
title: "Chapter 1: Agent Fundamentals: Question Bank"
description: "Practice questions for the Agent Fundamentals chapter: the ReAct loop and context structure, harness engineering, orchestration patterns, guardrail layers, and the three levels of capability update."
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

These questions practise [[courses/ai-agents-in-depth/lessons/01-agent-fundamentals|Chapter 1: Agent Fundamentals]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "51a8516e-b98b-488e-a882-1499dbf19b87"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter gives the production-grade composition of an Agent as a set of equations. Which one?"
    options:
      - id: context-tools-only
        text: "Agent = Model + Harness, where the Harness is context management plus tool interfaces and nothing else"
      - id: harness-includes-environment
        text: "Agent = Model + Harness, where the Harness includes the Environment that the Agent operates inside and changes"
      - id: five-parts
        text: "Agent = Model + Harness, with Harness = context management, tool interfaces, constrain, verify and correct"
      - id: replacement
        text: "Agent = LLM + Context + Tools, where the five Harness elements replace the three original terms of the formula"
    correctOptionIds: [five-parts]
    explanation: "five-parts is correct: the chapter expands the formula as Agent = Model + Harness, with Harness = context management plus tool interfaces plus the three safeguards Constrain, Verify and Correct, and it notes that Agent and Environment stand outside each other. context-tools-only omits the three safeguards that a production system needs. harness-includes-environment is wrong because the Harness sits inside the Agent boundary and outside the Model, and files, databases, web pages and people belong to the Environment. replacement is wrong because the two formulas are not rivals: Agent = Model + Harness is the same skeleton unfolded into its production form, a lens inside the building half of the book. Lesson section: Harness Engineering, the expanded equation."
  - id: "00dc107b-3472-42bb-b053-e90db96019c3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In Experiment 1-1's ablation study, what happens when the tool definitions are removed from the Agent's context?"
    options:
      - id: parametric-fallback
        text: "The model can no longer emit structured tool calls, so it answers from its parametric memory instead"
      - id: crash
        text: "The model fails on the very first turn, because without tool definitions there is nothing at all for it to work with"
      - id: results-lost
        text: "Tool calls keep working normally, but the results the tools return are no longer appended to the trajectory"
      - id: no-change
        text: "Nothing changes, because the tool definitions are already part of the model's weights and never needed the context"
    correctOptionIds: [parametric-fallback]
    explanation: "parametric-fallback is correct: the ablation shows that without tool definitions the model cannot emit structured tool calls, but it does not crash or fall silent — it fabricates plausible-looking figures straight from parametric memory, which is the hallucination failure mode. crash overstates the effect; the model still produces fluent answers. results-lost describes the other ablation, where removing tool results leaves the Agent executing blindly until it exhausts its iteration budget. no-change is wrong because the definitions were in the context in the first place, which is what made the calls possible. Lesson section: the ablation experiment, Experiment 1-1."
  - id: "9cd3a1ec-5413-450e-aa9d-c379efbf1b08"
    revision: 1
    status: active
    type: single-choice
    prompt: "In a multi-round ReAct loop, the cumulative cache reads grow as O(n²) in the number of rounds. Why is that?"
    options:
      - id: rewrite-each-round
        text: "Because every round rewrites the trajectory from scratch, so the whole KV cache is rebuilt on every single turn"
      - id: parameters-change
        text: "Because the model's parameters are updated between rounds, which invalidates every key that was ever cached"
      - id: exponential-trajectory
        text: "Because the trajectory itself grows exponentially, since each new observation somehow contains all the earlier ones"
      - id: prefix-sum
        text: "Because round i reads a cached prefix whose length is proportional to i, so the total read is 1 + 2 + ... + n"
    correctOptionIds: [prefix-sum]
    explanation: "prefix-sum is correct: the physical trajectory length and the KV cache footprint at round i grow only linearly, but each round reads the whole accumulated history, so the cumulative billed read across n rounds sums to n(n+1)/2, which is O(n²). rewrite-each-round is wrong because a ReAct loop appends to the trajectory rather than rewriting it, which is exactly what makes the cache useful. parameters-change is wrong because the model is not being trained during the loop. exponential-trajectory is wrong because the growth that is quadratic is in the reads, not in the history itself. Lesson section: the ReAct loop and the quadratic cache-read growth."
  - id: "7335211f-3ff4-47f5-bb70-9b185c5cbc58"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter recommends a way of reducing that quadratic cache-read growth. Which is the one it recommends?"
    options:
      - id: compress-every-round
        text: "Compress the trajectory after every single round, so the cached history stays small however many rounds have run"
      - id: batch-compress
        text: "Batch-compress the early trajectory at token thresholds, and externalize large results for on-demand retrieval"
      - id: drop-cache
        text: "Drop the KV cache entirely and push the full history through the model again on every round of the loop"
      - id: move-definitions
        text: "Move the tool definitions to the end of the context, so the cached prefix stops growing as the trajectory does"
    correctOptionIds: [batch-compress]
    explanation: "batch-compress is correct: the chapter recommends batch-compressing the early trajectory when it crosses a token threshold, keeping the conclusions and key state, and externalizing large intermediate results so they can be retrieved on demand or isolated in a sub-agent. compress-every-round is the advice the chapter explicitly warns against, because compressing every round can hurt Agent performance and adds compression calls and cache-rebuild overhead. drop-cache makes the cost worse rather than better. move-definitions does not change the read pattern, because each round still reads everything that came before it. Lesson section: the ReAct loop, cache costs and mitigations."
  - id: "ece42ed7-d596-41ed-8f20-88fa33075f96"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter names three levels of Agent capability update. Which set and ordering does it give?"
    options:
      - id: least-to-most-reversible
        text: "Contextual adaptation, external artifacts and parameter updates, in that order from the least reversible to the most reversible of the three"
      - id: prompt-tuning-retrieval-rl
        text: "Prompt tuning, retrieval and reinforcement learning, in that order from the cheapest to the most expensive to run"
      - id: most-to-least-reversible
        text: "Contextual adaptation, external artifacts and parameter updates, ordered from the most reversible to the least reversible"
      - id: fastest-to-slowest
        text: "Contextual adaptation, parameter updates and external artifacts, in that order from the fastest to apply to the slowest"
    correctOptionIds: [most-to-least-reversible]
    explanation: "most-to-least-reversible is correct: the three levels are contextual adaptation inside the current task or session, external artifacts such as knowledge documents, prompts, Skills and Harness code, and parameter updates through SFT and RL. Contextual adaptation is fast and cheap but volatile because it resets when the session ends; external artifacts persist across tasks and are auditable, versionable and modularly reversible; parameter updates give generalized capability but cost the most and iterate slowest — and the chapter orders the three from most to least reversible. least-to-most-reversible names the same three levels but reverses the ordering. The other two options name different sets of techniques. Lesson section: Agent Learning Mechanisms and the design-pattern section."
  - id: "8a499f94-e6f9-4f77-baed-6bafb710668f"
    revision: 1
    status: active
    type: single-choice
    prompt: "The three guardrail layers are ordered against one particular criterion. Which criterion does the chapter use?"
    options:
      - id: bypass-difficulty
        text: "By how hard each layer is to bypass, running from the context layer up through the execution layer to the data layer"
      - id: request-lifecycle
        text: "By where each layer sits in the request lifecycle, from filtering the incoming content through to validating the delivered output before the user sees it"
      - id: running-cost
        text: "By how much each layer costs to run, from the cheapest input filter up to the most expensive review process"
      - id: recency
        text: "By how recently each layer appeared in industry practice, from the newest mechanism down to the oldest"
    correctOptionIds: [bypass-difficulty]
    explanation: "bypass-difficulty is correct: the chapter is explicit that the three layers are ordered not by where they sit in the request lifecycle but by how hard they are to bypass, with the lower layers depending less on the model's own judgment and therefore being harder for a single successful attack to get through. request-lifecycle is the ordering the chapter explicitly rejects. running-cost and recency are not orderings the chapter uses. Lesson section: Guardrails and Safety, the three layers."
  - id: "e549a2b3-4f17-496b-bb78-0f4a653c2114"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter says the context layer of guardrails has a structural ceiling. What is the reason it gives?"
    options:
      - id: fixed-training
        text: "The classifiers the layer relies on are trained on a fixed set of known attacks and cannot recognise anything newer"
      - id: before-context
        text: "The layer runs before the context is assembled, so it can never inspect what the model actually receives"
      - id: free-text-only
        text: "It is the only layer that inspects free-form text rather than the structured data returned by tools"
      - id: cannot-detect-injection
        text: "An Agent sitting inside the context under attack can hardly tell whether it has already been injected"
    correctOptionIds: [cannot-detect-injection]
    explanation: "cannot-detect-injection is correct: the chapter's reason is structural, not a matter of classifier quality — the Agent operates inside the very context being manipulated, so it cannot reliably diagnose its own compromised state, and the layer can lower the success rate of an attack but never offer a guarantee. That is exactly why the execution and data layers below it are necessary. fixed-training is about coverage rather than self-detection. before-context misstates the mechanism: the layer intercepts content before it enters the context. free-text-only is the opposite of the truth, because the execution layer is the one that inspects structured data only. Lesson section: Guardrails and Safety, the context layer and its ceiling."
  - id: "5768fe2b-a4a8-40dc-a479-5eb65fcaa106"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are among the five design patterns the chapter names as running through the rest of the book? Select every correct answer."
    options:
      - id: proposer-reviewer
        text: "Proposer-Reviewer, where production and judgment sit in two roles that do not share a context"
      - id: progressive-disclosure
        text: "Progressive Disclosure, where a searchable catalogue is offered first and the details are loaded on demand"
      - id: speculative-decoding
        text: "Speculative Decoding, where a small draft model proposes tokens that a large model then verifies"
      - id: boundary-retention
        text: "Boundary Set plus Retention Set, where every change is checked on the samples it should change and the samples it must not affect"
    correctOptionIds: [proposer-reviewer, progressive-disclosure, boundary-retention]
    explanation: "proposer-reviewer, progressive-disclosure and boundary-retention are correct: the chapter names these three among the five patterns it defines once and then reuses — the other two being Append-only, where state evolves by appending and is never revised in place, and Minimal Diff, Reversible, where each change stays small and independently revertible. speculative-decoding is an inference-time technique and not one of the chapter's patterns. Lesson section: Design Patterns That Run Through the Book."
  - id: "a01ce9a2-0e02-4f1d-a658-390e4647d3c5"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter include in its taxonomy of tools, classified by the direction of interaction with the world? Select every correct answer."
    options:
      - id: perception
        text: "Perception Tools, which read information from the outside world"
      - id: event-trigger
        text: "Event Trigger Tools, which are activated by an external event rather than invoked by the Agent"
      - id: embedding-models
        text: "Embedding Models, which turn text into vectors so that a search can rank it"
      - id: user-communication
        text: "User Communication Tools, which carry the Agent's answer back to the person who asked"
    correctOptionIds: [perception, event-trigger, user-communication]
    explanation: "perception, event-trigger and user-communication are correct: the chapter's five categories are Perception, Execution, Collaboration, Event Trigger and User Communication Tools. The defining feature of the Event Trigger category is that the Agent does not call it — an incoming email, a scheduled cron job or a webhook callback activates the Agent instead. embedding-models is not a tool category in this taxonomy; it belongs to the retrieval machinery of the knowledge chapter. Lesson section: Tools, the agent's action interfaces."
  - id: "908a5878-cd1e-43fa-881f-0e67b5d331f8"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter presents Freeform Tool Calling, where raw Python or SQL text is passed through instead of JSON-escaped arguments, as a change to the model architecture that replaces the standard tool-calling loop. Is that what the chapter says?"
    answer: false
    explanation: "False — the chapter describes Freeform Tool Calling as an evolution in API parameter serialization that avoids the JSON escaping overhead, and it stresses that the outer execution loop is unchanged: the client still detects the call, executes it in the sandbox, and returns the result into the trajectory. Nothing about the underlying model architecture is replaced, so the claim in the question misdescribes the innovation. Lesson section: Tools, freeform versus structured tool calling."
  - id: "46ff9cdc-db0a-4915-bd30-4c3657276220"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the chapter's horse-and-reins metaphor for Harness Engineering, and why the chapter argues that Harness work becomes more important rather than less as models get stronger."
    sampleAnswer: "The model is the powerful horse and the Harness is the reins: the runtime and governance layer that constrains what the model may do, verifies what it did and corrects it when it went wrong. The argument is that a stronger model with a wider action space has a wider blast radius, so a hallucination or an unauthorised action now does more damage than it used to. That is why a framework's value shifts from merely orchestrating LLM calls towards the assurance layer: permission classification, circuit breakers, error recovery, context compression and the tool ecosystem."
    explanation: "A strong answer names both halves of the metaphor, the model as the horse and the Harness as the reins, and then makes the connection the chapter insists on: more capability and more autonomy mean a larger blast radius, so constraint, verification and correction matter more, not less. An answer that only says the Harness keeps the model on track has described the metaphor but not the argument for why its importance grows. Lesson section: Harness Engineering, and the horse-and-reins discussion."
  - id: "fc383298-ad68-46a4-8893-e164a63f377a"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the difference between the workflow pattern and the autonomous Agent pattern, and say how the chapter says a production system can combine the two."
    sampleAnswer: "A workflow orchestrates LLMs and tools through predefined code paths, so the execution sequence is fixed by the developer and the model only does the understanding and generation inside each node; that gives strict process control and confines an injection to the current node. An autonomous Agent has no predefined path: it decides its next step at runtime from environmental feedback, which suits open-ended problems but costs more and needs explicit stopping conditions. The two are not rivals, and the chapter's recommended shape is a hybrid: a deterministic workflow backbone for the compliance-critical stages, with autonomous behaviour for the open-ended segments and human confirmation for the high-risk operations."
    explanation: "A strong answer states the defining difference, which is whether the execution path is fixed in code or chosen at runtime, gives the advantage and the limitation of each, and then describes the hybrid the chapter recommends. An answer that calls one pattern simply better has missed the chapter's position that every pattern has situations where it fits and that the successful systems mix them. Lesson section: Orchestration Patterns, workflow versus autonomous, and choosing and mixing the two."
```

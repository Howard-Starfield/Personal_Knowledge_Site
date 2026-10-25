---
id: "beeb52cd-a2fd-4d60-ad15-bc71f239b61c"
title: "Chapter 6: Interaction: Expanding the Observation and Action Spaces: Question Bank"
description: "Practice questions for the Interaction chapter: asynchronous and event-driven execution, voice interfaces, Computer Use, robot control, and the primitives the four modalities share."
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

These questions practise [[courses/ai-agents-in-depth/lessons/06-interaction|Chapter 6: Interaction: Expanding the Observation and Action Spaces]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "0102df2f-7106-4901-9a2a-66942ca8db06"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter expands an Agent's observation and action spaces along two axes. Which two?"
    options:
      - id: content-and-cost
        text: "Content and cost, so that the Agent reads what it needs and spends only what the budget allows"
      - id: memory-and-reasoning
        text: "Memory and reasoning, so that what the Agent keeps and what it thinks are both managed deliberately"
      - id: model-and-harness
        text: "Model and harness, so that the model's capability and the runtime around it are balanced against each other"
      - id: modality-and-timing
        text: "Modality and timing, so that what can be perceived and when the Agent is allowed to act are both widened"
    correctOptionIds: [modality-and-timing]
    explanation: "modality-and-timing is correct: the chapter's two axes are modality, which covers voice, screens and the physical world, and timing, which covers the move from taking a turn to running asynchronously and event-driven. content-and-cost, memory-and-reasoning and model-and-harness are real concerns elsewhere in the book but not the axes this chapter draws. Lesson section: two axes, modality and timing."
  - id: "83eab4ea-dd4b-48d2-ac00-8dd217c0b793"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the chapter say that turn-taking is an interaction convention rather than a property of the environment?"
    options:
      - id: only-matters-while-generating
        text: "Because the world's events only matter to the Agent while it is generating tokens, and are largely irrelevant between one turn and the next one"
      - id: world-keeps-moving
        text: "Because the environment keeps changing while the model is thinking, and the turn-based shape is an artefact of early chat interfaces"
      - id: queue-pauses-world
        text: "Because an event-driven system needs a queue, so the world has to be paused whenever that queue happens to be empty"
      - id: too-fast-to-notice
        text: "Because the model's inference cycle is too quick to notice anything at all that happens between two turns of a conversation"
    correctOptionIds: [world-keeps-moving]
    explanation: "world-keeps-moving is correct: the chapter's line is that turn-taking is a convention of the model and its interface, not a fact about the world — mail arrives while the Agent thinks, a user cuts in mid-sentence, a web page changes between frames, a cup is knocked over while a robot arm reaches. only-interesting-while-generating, queue-pauses-world and too-fast-to-notice each misstate the argument. Lesson section: two axes, modality and timing."
  - id: "ff566143-65e6-4449-859e-906dd86cccea"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter says the voice, Computer Use and robotics sections share one control skeleton. Which sequence is it?"
    options:
      - id: simple-loop
        text: "Observe → think → act → observe, with the same three steps repeated indefinitely at whatever rate the hardware and the network happen to allow, without ever branching out of the loop"
      - id: plan-act-report
        text: "Plan → act → verify → report, with every action followed by a written report that is sent back to the person who asked"
      - id: shared-skeleton
        text: "Keep perceiving → judge state and timing → choose a reply or an action → observe feedback → continue, correct, retry, stop or replan"
      - id: route-first
        text: "Perceive → classify → route → execute, with the routing layer deciding whether a rule or the model handles each event"
    correctOptionIds: [shared-skeleton]
    explanation: "shared-skeleton is correct: the chapter ends by saying the four sections share one skeleton — keep perceiving, judge the current state and the timing, choose a reply or an action, let the output enter the environment, observe the feedback, and then continue, correct, retry, stop or replan. simple-loop drops the judgement and the feedback branches, plan-act-report adds a reporting step the skeleton does not have, and route-first describes the event router rather than the control loop. Lesson section: chapter summary."
  - id: "e54cb6e2-3a9c-4c95-add0-e4537c39b363"
    revision: 1
    status: active
    type: single-choice
    prompt: "An asynchronous event-driven Agent has to run on a model API whose tool calls must each be answered before the next turn. How does the chapter say a user cancellation arriving mid-tool is handled?"
    options:
      - id: placeholder
        text: "Signal the tool executor to cancel, insert an explicit placeholder tool result so the pairing rule holds, then re-invoke the model"
      - id: queue-it
        text: "Queue the cancellation until the running tool returns, then hand it to the model together with that tool's own result"
      - id: abandon-turn
        text: "Abandon the running turn entirely and start a fresh one, discarding the tool call and the partial trajectory that had been built up so far"
      - id: parallel-call
        text: "Call the model a second time in parallel with the running tool, so the Agent can react to the event without waiting"
    correctOptionIds: [placeholder]
    explanation: "placeholder is correct: when an interruption arrives while a tool is still running, the runtime signals the executor, writes an explicit placeholder result saying the tool is executing in the background and the new event should be prioritised, appends the cancellation event and re-invokes the model — which keeps the API's tool-call and tool-result pairing intact. b simply defers the cancellation, abandon-turn throws away work, and parallel-call is not how the chapter's compatibility rules work. Lesson section: compatibility when native asynchrony is unavailable."
  - id: "a58912d1-278f-4360-a6c2-dd220354b0e5"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's layered event router combines deterministic rules with a lightweight classifier model. What is the trade-off, and how must prompt injection be handled at that layer?"
    options:
      - id: reversed
        text: "The rules are fast but less predictable, while the classifier model is slower but always right about what an event actually means when it is read"
      - id: whole-body
        text: "The classifier must be handed the whole message body, since the meaning of an event cannot be judged from metadata alone"
      - id: random-mix
        text: "The two are mixed at random, so that no single failure mode can dominate the routing decisions over a long run"
      - id: rules-blind-classifier
        text: "The rules are instant but blind to nuance, the classifier costs latency and money, and it must read structured fields rather than the raw body"
    correctOptionIds: [rules-blind-classifier]
    explanation: "rules-blind-classifier is correct: hard-coded rules have zero latency and full determinism but cannot tell stop-immediately from what-is-the-weather, while a lightweight classifier can and costs hundreds of milliseconds and an extra call — and, like the Sidecar, it must be given only structured fields, never the untrusted message body, or an injected instruction can bend the routing decision. reversed, whole-body and random-mix each invert or misstate the chapter's account. Lesson section: event handling mechanism, urgency determination."
  - id: "febbe3e0-d027-4ce4-91c9-59c2078ec5fa"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the chapter recommend giving an autonomous assistant its own virtual identity rather than letting it operate the user's personal accounts?"
    options:
      - id: third-party-trust
        text: "Because third parties refuse to deal with an agent that presents itself as an assistant, so the identity has to look like a person"
      - id: blast-radius
        text: "Because personal accounts mix the assistant's work with the user's life, so one mistake or one injection reaches everything"
      - id: legal-attribution
        text: "Because a dedicated number and mailbox make the assistant's replies legally attributable to a separate legal person"
      - id: provider-ban
        text: "Because personal accounts cannot be used by an automated process at all under the terms of most large providers"
    correctOptionIds: [blast-radius]
    explanation: "blast-radius is correct: the chapter's argument is that delegating a user's own account means one injection or one hallucination could expose or destroy their entire digital life, whereas an isolated identity is auditable, can run in the background without hijacking the user's active session, and contains the damage; the cases that genuinely need the account holder in person are bridged by having the user log in over a remote desktop. third-party-trust, legal-attribution and provider-ban are not the chapter's reasons. Lesson section: virtual identity and isolated execution environment."
  - id: "72aa8ee9-c53a-4a8d-bfd7-a99356229334"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the chapter distinguish a full-duplex interactive voice model from an end-to-end omni model?"
    options:
      - id: waveform-vs-text
        text: "An omni model converts speech to text before reasoning, while a full-duplex model reasons over the raw audio waveform throughout"
      - id: one-gpu
        text: "A full-duplex model runs the whole stack on a single GPU, while an omni model splits perception and generation across two separate services with a round trip between them"
      - id: turn-taking
        text: "An omni model unifies perception and generation but still takes turns under an external voice-activity detector, while a full-duplex model drops turns"
      - id: local-only
        text: "A full-duplex model can only be used in a local setting, because streaming audio cannot be sent to a remote inference service"
    correctOptionIds: [turn-taking]
    explanation: "turn-taking is correct: the omni paradigm unifies audio perception and generation in one network, which lowers latency and keeps paralinguistic tone, but it still operates turn by turn under an external voice-activity detector; the full-duplex paradigm removes the turn as a concept and models input and output audio as parallel continuous streams, so the Agent can listen and speak at once, backchannel and be interrupted without a floor-control mechanism. waveform-vs-text, one-gpu and local-only are not distinctions the chapter draws. Lesson section: voice, the three paradigms."
  - id: "8a0dd725-e225-49e9-a1f1-690f225e7442"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list among the primitives shared by the event-driven, voice, Computer Use and robotics loops? Select every correct answer."
    options:
      - id: wake-up
        text: "Wake-up, the point at which an idle Agent is brought back to life by something that happened"
      - id: safe-points
        text: "Safe points, the moments at which the loop may be interrupted or cancelled without leaving the world in a broken state"
      - id: cancellation
        text: "Cancellation and preemption, so that a running task or a running motion can be stopped on demand"
      - id: reinforcement-learning
        text: "Reinforcement learning, the method by which the model learns which actions the environment rewards"
    correctOptionIds: [wake-up, safe-points, cancellation]
    explanation: "wake-up, safe-points and cancellation are correct: the chapter says the four sections share the same primitives — wake-up, safe points, cancellation, preemption, and the separation of fast from slow work — and then gives each of them a different implementation at each timescale. reinforcement-learning belongs to the post-training chapter, not to the control skeleton of this chapter. Lesson section: chapter summary."
  - id: "9d844e9e-1360-410f-ae94-66b40105614a"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list as ways a Computer Use Agent can ground an action in what is on the screen? Select every correct answer."
    options:
      - id: structured-indexing
        text: "Structured element indexing, reading the DOM or accessibility tree and assigning identifiers to interactive controls"
      - id: set-of-mark
        text: "Set-of-Mark, which uses computer-vision segmentation to overlay identifiers on visual elements"
      - id: coordinates
        text: "Pure coordinate prediction, reading a position straight off the screenshot"
      - id: window-manager
        text: "Reading the window manager's own state, which already lists every visible control and where it sits"
    correctOptionIds: [structured-indexing, set-of-mark, coordinates]
    explanation: "structured-indexing, set-of-mark and coordinates are correct: the chapter compares the three routes — structured indexing, which is the most stable and accurate but unavailable on Canvas, WebGL and custom-drawn interfaces; Set-of-Mark, which needs no application cooperation but can suffer segmentation errors; and pure coordinate prediction, which needs no annotation at all but depends on resolution scaling and on the model's visual grounding. window-manager is not one of the chapter's routes. Lesson section: visual grounding."
  - id: "f89ca65b-86cd-4d33-a15a-7a9b0f6f32f6"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter says action chunking improves a robot's responsiveness, because the VLA model can be asked for a correction between two individual motor commands inside the chunk. Is that what the chapter says?"
    answer: false
    explanation: "False — action chunking trades reactivity for smoothness, not the other way round. Because a large VLA model infers at only 1 to 10 Hz, asking for one action at a time gives jerky motion, so the model predicts a sequence of 25 to 50 future actions in a single inference and a low-level thread executes them at 50 Hz. The robot is therefore open-loop for the whole chunk and stays blind to a sudden change in the environment until the next observation. Lesson section: VLA control, action chunking."
  - id: "03a70e8f-65cf-4645-bcae-7af6d78fd717"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter says that actions taken on the strength of fast thinking must not lead to irreversible consequences. Explain the rule it proposes and how it shows up in the three modalities."
    sampleAnswer: "The rule is to grade actions by reversibility: fast thinking may carry out reversible actions freely, while anything irreversible has to be cleared by slow thinking first, and the fast model must not make tool calls whose consequences cannot be undone. It shows up in each modality — in voice, the fast system may fill a pause but must not commit the Agent to a substantive decision; in Computer Use, clicking and typing are fast, while sending a message, making a purchase or deleting a file sit behind the slow path; in robotics, a motion chunk is discarded and re-inferred when perception detects that the scene changed. The design rule is that the density of safe points should match how fast the environment changes."
    explanation: "A strong answer states the reversibility rule, shows that the same rule governs all three modalities, and names the underlying design principle about the density of safe points and the extra protection irreversible actions need. An answer that gives the rule but only one modality has not shown that it is shared. Lesson section: the three modalities, and the unified safety primitives across timescales."
  - id: "f3202968-9878-4b47-a198-941761b12b70"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain how the chapter keeps a backlog of queued events from making the model miss the important ones or from overflowing its context window."
    sampleAnswer: "First, classify and deduplicate rather than batching blindly: urgent events — alerts, a user asking to stop — are pulled out and handled through the cancellation pathway. Second, apply the truncation pattern to oversized tool results: the full payload goes to disk and only its head, its tail and its path stay in the context. Third, add an Agent status bar at the end of the context carrying a count of each event type and a checklist of what still needs an answer, because models attend to the most recent event and ignore the rest. The checklist is what forces each queued item to be treated as an obligation."
    explanation: "A strong answer gives all three moves — separate the urgent from the routine, truncate and externalise the bulky payloads, and add a status bar with counts and a response checklist — and explains that the checklist is the part that fights the recency bias. An answer that only says the events should be prioritised has not said how the priority is made visible to the model. Lesson section: event handling mechanism, attention dispersion in queue-based processing."
```

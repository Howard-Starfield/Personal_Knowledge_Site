---
id: "877cd865-ab8e-4cf3-98a0-9f2598fcdcf3"
title: "Chapter 10: Multi-Agent Collaboration: Question Bank"
description: "Practice questions for the Multi-Agent Collaboration chapter: shared versus isolated context, peer, manager and decentralized topologies, failure modes, and fault tolerance."
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

These questions practise [[courses/ai-agents-in-depth/lessons/10-multi-agent-collaboration|Chapter 10: Multi-Agent Collaboration]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "13334dbb-6d3a-4a00-acfa-e0648751ac4c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Given that multi-agent debate does not beat a single Agent with equal compute on pure text reasoning, what does the chapter say the real advantage of several Agents is?"
    options:
      - id: more-capacity
        text: "It gives the team more total thinking capacity, so the answer can be longer and cover more ground than one chain of thought can"
      - id: ensemble-variance
        text: "It lets the system run several weaker models whose errors average out, in the way an ensemble reduces the variance of a single model"
      - id: real-specialisation
        text: "It divides the work among agents whose specialisation is genuine, so each one is better at its own slice than a generalist would be"
      - id: new-information
        text: "It brings in information the single Agent could not have, such as execution results, visual feedback and external verification"
    correctOptionIds: [new-information]
    explanation: "new-information is correct: the chapter's three advantages are that several Agents can bring in external feedback that did not exist at generation time, that agents with different objectives and role definitions can challenge each other's blind spots, and that context isolation lets a team work past the context-window limit with very long tool-call chains. more-capacity and ensemble-variance are the two reasons the chapter rules out, since a single Agent given the same compute is the fairer comparison. real-specialisation overstates it, because the models share the same parameters. Lesson section: when is multi-agent truly better than a single agent."
  - id: "f89fc641-0cec-4ff0-8c7f-0684e3e90e94"
    revision: 1
    status: active
    type: single-choice
    prompt: "As the shared thread grows, what two structural failures does the chapter name for shared-context multi-agent architectures?"
    options:
      - id: prompt-drift
        text: "Quadratic token cost, and a loss of the model's ability to follow the system prompt once the thread is long enough"
      - id: bloat-and-framing
        text: "Context and KV-cache bloat, and framing bias in which a downstream role inherits the upstream role's assumptions"
      - id: schema-and-envelope
        text: "Tool schema conflicts between roles, and a failure of the harness to keep one message envelope uniform across the team"
      - id: duplicate-work
        text: "Duplicate work between agents that read the same files, and a queue that serialises what should have run in parallel"
    correctOptionIds: [bloat-and-framing]
    explanation: "bloat-and-framing is correct: every agent reads from and appends to one monolithic conversation, so the trajectory grows and the cached prefix is paid for again on every turn, and a downstream role such as a code reviewer inherits the analytical assumptions, optimism or misconceptions of the upstream analyst. prompt-drift, schema-and-envelope and duplicate-work are not the two the chapter names. Lesson section: multi-agent collaboration with shared context."
  - id: "48bc0d95-1172-4e24-a1c0-9d19bba6abdb"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the chapter say actually stops the framing of one role bleeding into the next?"
    options:
      - id: repeat-role
        text: "Repeating the new role's description at the start of every user message, so the instruction is always the most recent thing in the context"
      - id: tag-provenance
        text: "Keeping the shared thread but tagging each message with the role that wrote it, so the provenance of every claim stays visible"
      - id: break-framing
        text: "Switching the system prompt and the tool set, and passing only the artifact and the ground truth rather than the upstream thinking"
      - id: different-model
        text: "Running each role against a different foundation model, since the shared weights are what carry the framing from one role to the next"
    correctOptionIds: [break-framing]
    explanation: "break-framing is correct: the chapter's answer is to break the shared cognitive framing when the stage changes — replace the system prompt, prune the tools to the new role's domain so the questioning tools go and the linters and testing tools arrive, give the new role only the concrete artifact and the ground-truth specification rather than the upstream exploratory trajectory, and anchor the new identity with a role-clarifying status bar. repeat-role, tag-provenance and different-model are weaker measures that leave the upstream reasoning in place. Lesson section: multi-agent collaboration with shared context, and the reflection question on role interference."
  - id: "a360684f-a2d1-4ed5-9d4d-88b39b6cce1d"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the Plan-and-Act work say about the Manager Agent in a hierarchical architecture?"
    options:
      - id: ceiling
        text: "The Manager's decomposition is a ceiling, so a flawed plan cannot be rescued by the strongest workers at all"
      - id: latency-only
        text: "The Manager is a bottleneck for latency only, since the workers can be given the original request directly and work out the plan themselves"
      - id: replace-with-peers
        text: "The Manager adds little of value in practice, so the chapter recommends replacing the hierarchy with a peer network in most production systems"
      - id: cheapest-model
        text: "The Manager is the safest place to put the cheapest model, because every decision it makes is checked again by a reviewer downstream"
    correctOptionIds: [ceiling]
    explanation: "ceiling is correct: the chapter's conclusion is that a weak planner is the system bottleneck — if the Manager produces an incomplete, circular or under-specified decomposition, even state-of-the-art workers will faithfully execute flawed subtasks, so the strongest reasoning model belongs on the Manager, with a reviewer cross-validating the decomposition and clear acceptance criteria per subtask. latency-only, replace-with-peers and cheapest-model each contradict that conclusion. Lesson section: manager pattern, centralized coordination."
  - id: "8d630772-8a07-43f8-a96c-dab15f5d9685"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does optimistic locking protect a shared file from a lost update?"
    options:
      - id: exclusive-lock
        text: "By taking an exclusive lock on the file for the whole turn, so that no other agent can read it while the first one is writing to it"
      - id: working-copy
        text: "By copying the file into a private working directory before editing it and copying it back only at the end of the turn"
      - id: single-writer
        text: "By queueing every write to one writer process, so that all modifications are applied one at a time in a fixed order"
      - id: version-check
        text: "By checking that the file's version still matches the one read at the start of the turn and refusing the write if it does not"
    correctOptionIds: [version-check]
    explanation: "version-check is correct: the write carries the version token or hash that was read at the start of the turn, and the harness compares it with the current version before applying the change, rejecting the write if a concurrent edit has moved the file on — so no agent silently overwrites another's work. exclusive-lock is pessimistic locking, which serialises the team, working-copy is isolation rather than a check, and single-writer is a queue. Lesson section: communication and control between agents."
  - id: "f08b2190-da4f-498e-91bb-b325694bf78f"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the chapter's cascading termination work for parallel sub-Agents?"
    options:
      - id: kill
        text: "By killing each sub-Agent's process abruptly as soon as one reports success, since the remaining work is worthless anyway in that case"
      - id: broadcast
        text: "By having the sub-Agent that found the target signal the Manager, which broadcasts a terminate that the others check at safe points"
      - id: poll-flag
        text: "By letting each sub-Agent poll a shared flag file and exit at its own convenience, whenever it next happens to look at it"
      - id: wait-and-discard
        text: "By waiting for every sub-Agent to finish and then discarding the results of all but the successful one, so nothing is lost"
    correctOptionIds: [broadcast]
    explanation: "broadcast is correct: the sub-Agent that finds the target sends target_found to the Manager, the Manager broadcasts terminate, and each worker checks for that signal at predefined safe points in its ReAct loop so it can exit gracefully, closing browser sessions, releasing locks and finishing file writes. kill destroys in-flight work, poll-flag leaks resources until each agent happens to notice, and wait-and-discard gives up the latency saving that the pattern exists to deliver. Lesson section: manager pattern, and the reflection question on cascading termination."
  - id: "0a651071-bf8f-42eb-ba2d-e4af865754ef"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the chapter's failure modes is the one in which a downstream Agent treats an upstream Agent's guess as settled fact?"
    options:
      - id: buck-passing
        text: "Passing the buck, where each Agent hands the work on and nobody in the team sees it through to the end"
      - id: homogeneous
        text: "Homogeneous convergence, where agents built on the same model and given the same prompt arrive at exactly the same mistake together"
      - id: cascading
        text: "Cascading amplification, where a small upstream assumption is reported downstream as confirmed and drifts further along the chain"
      - id: comprehension-debt
        text: "Comprehension debt, where the team gradually stops being able to explain what the system it built actually does"
    correctOptionIds: [cascading]
    explanation: "cascading is correct: the telephone-game failure appears when one Agent makes a slight speculative assumption, a second reports it as confirmed fact, and a third writes incompatible code on the basis of that unverified assumption, so the chain drifts away from reality — which is why downstream agents have to check assertions against the raw evidence rather than against the upstream summary. buck-passing, homogeneous and comprehension-debt are three of the other failure modes the chapter lists. Lesson section: failure modes of multi-agent collaboration."
  - id: "0a47cae5-53ea-4cbd-a459-7e4bbe72b1c3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list as part of the basic fault-tolerance loop for multi-agent systems? Select every correct answer."
    options:
      - id: locking-isolation
        text: "Optimistic locking and working-copy isolation"
      - id: cross-validation
        text: "Independent cross-validation by a perspective that did not produce the work"
      - id: diverse-sources
        text: "Diverse information sources, so that agents are not all reading the same thing"
      - id: shared-transcript
        text: "One shared transcript that every agent reads and writes in turn, so nothing is lost between them"
    correctOptionIds: [locking-isolation, cross-validation, diverse-sources]
    explanation: "locking-isolation, cross-validation and diverse-sources are correct: the chapter lists optimistic locking and working-copy isolation, independent cross-validation, diverse information sources, explicit budgets and cancellation as the elements of the basic fault-tolerance loop. shared-transcript is the opposite of the advice, since a single shared transcript is what produces the concurrency and framing problems the chapter is trying to contain. Lesson section: failure modes of multi-agent collaboration."
  - id: "e60b815b-32c6-4c81-94eb-3f626023d0dd"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list among the four zones of the workspace governance structure? Select every correct answer."
    options:
      - id: scratchpad
        text: "The private scratchpad, an isolated space for trial-and-error work"
      - id: shared-workspace
        text: "The shared workspace, the version-controlled project files the team works on"
      - id: read-only-reference
        text: "Read-only reference data such as specifications, schemas and external documentation"
      - id: staging
        text: "A staging area in which any agent may overwrite another agent's pending changes at will"
    correctOptionIds: [scratchpad, shared-workspace, read-only-reference]
    explanation: "scratchpad, shared-workspace and read-only-reference are three of the four zones; the fourth is the immutable audit log, an append-only record. staging is not one of them, and a zone in which any agent may overwrite another's pending work is the namespace and concurrency problem the structure exists to prevent. Lesson section: communication and control between agents, the four-tier workspace governance."
  - id: "a8f9eef5-6d9e-41b7-863d-b1ae746c2458"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter's operating-system analogy holds that a process's instructions are enforced by hardware, whereas an Agent follows prompts only with high probability. Is that what the chapter says?"
    answer: true
    explanation: "True — that is the distinction the chapter draws when it maps multi-agent systems onto operating systems row by row. It is why the analogy has limits: virtual memory and paging map onto context compression and retrieval, file permissions onto tool whitelists and credential boundaries, deadlock detection onto the detection of cyclic handoffs, but some operating-system concepts have no counterpart precisely because the mechanism of enforcement differs — hardware enforces a process, while a prompt is obeyed only with high probability. Lesson section: the reflection question on extending the operating-system table."
  - id: "021591b8-3bc9-45ce-beaf-c35aaf726e2a"
    revision: 1
    status: active
    type: free-recall
    prompt: "The chapter asks where the real advantage of several Agents lies, given that multi-agent debate does not beat a single Agent with equal compute on pure text reasoning. Give the three advantages it identifies and say what each one buys."
    sampleAnswer: "First, external feedback: several Agents can bring in information that did not exist at generation time — the result of running the code, a screenshot of the interface, the answer from an external tool — and that is what breaks the blind spot of a single chain of reasoning. Second, genuine disagreement: agents with different objectives and role definitions can challenge one another, and a second opinion formed from a different stance is not a repetition of the first. Third, context isolation: giving each agent its own window lets the team work past the limit of any one context. The claim is not that splitting the thinking buys more thinking."
    explanation: "A strong answer gives all three advantages, says what each one contributes, and closes with the negative result that motivates them, namely that the comparison is against one agent with the same compute on text reasoning alone. An answer that only says parallel agents are faster has described throughput, not the advantage the chapter means. Lesson section: when is multi-agent truly better than a single agent."
  - id: "cba5d316-f6d2-4797-a3af-1160d2b9a3f3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Name the failure modes the chapter lists for multi-agent collaboration, and say which mechanisms it proposes against them."
    sampleAnswer: "The chapter lists six. Concurrency conflicts in a shared file system are met with optimistic locking and working-copy isolation, so that a write is refused rather than silently merged. Cascading amplification of errors is met with independent cross-validation and with downstream agents checking assertions against the raw evidence. Homogeneous convergence is met by giving the agents diverse information sources and different viewpoints. Passing the buck is met with explicit acceptance criteria and verifiable task state, and runaway loops with explicit budgets and cancellation. Comprehension debt, where the team can no longer explain the system it built, is met by exposing interfaces, boundaries and acceptance criteria."
    explanation: "A strong answer pairs each failure mode with the mechanism the chapter proposes for it, and ends with the comprehension-debt point, since that is the one the chapter says remains a real risk even when the technical mechanisms are in place. An answer that lists the failures without the mechanisms has described the problem rather than the chapter's response. Lesson section: failure modes of multi-agent collaboration."
```

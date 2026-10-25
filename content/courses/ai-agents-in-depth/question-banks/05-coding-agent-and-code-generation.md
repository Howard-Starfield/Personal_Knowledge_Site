---
id: "ce3276cb-b9aa-4dee-9cbb-c8b40753a20c"
title: "Chapter 5: Coding Agent and Code Generation: Question Bank"
description: "Practice questions for the Coding Agent chapter: the coding agent workflow, harness engineering and failure recovery, sandboxing, and the six dimensions of code as a meta-capability."
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

These questions practise [[courses/ai-agents-in-depth/lessons/05-coding-agent-and-code-generation|Chapter 5: Coding Agent and Code Generation]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "f8217cec-c140-4e1b-bca4-b6e3c76e70f2"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's central claim is that code is an Agent's meta-capability. Which statement expresses that claim?"
    options:
      - id: tool-count
        text: "Code lets the Agent reach more tools than it could otherwise, so the size of the tool catalogue is the real limit on what it can do"
      - id: only-learning
        text: "Code is the only way an Agent can learn, because natural-language reasoning cannot accumulate anything from one session to the next"
      - id: both-means
        text: "Code is at once a means of getting the task done and a mechanism for accumulating knowledge, creating tools and improving the Agent itself"
      - id: cheaper-than-cot
        text: "Code matters mainly because it is cheaper to run than a long chain of thought, so it should replace reasoning wherever it can be used at all"
    correctOptionIds: [both-means]
    explanation: "both-means is correct: the chapter closes by saying code is a meta-capability because it does the task and, at the same time, accumulates knowledge, creates tools and lets the Agent improve itself. tool-count treats code as just another capability, which is the opposite of the claim. only-learning is too strong, since the chapter elsewhere treats context and knowledge as separate mechanisms. cheaper-than-cot reduces the idea to an economics argument. Lesson section: code, the meta-capability of a general agent."
  - id: "420c4859-4a17-44bd-8c15-17633f374b59"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter argues that Coding Agents are mature. What does it give as the reason?"
    options:
      - id: harness
        text: "Decades of accumulated software engineering infrastructure — test suites, type systems, version control — already form a powerful Harness"
      - id: stronger-models
        text: "Code generation models are far stronger than the models available for other kinds of Agent task, so the whole field advanced faster"
      - id: auto-checkable
        text: "Coding is the one domain whose output can be checked automatically by a machine, so no human judgement is needed to judge the result of the work at all"
      - id: short-tasks
        text: "Coding tasks are short and tightly specified, so an Agent finishes each one in a few turns instead of running a long trajectory"
    correctOptionIds: [harness]
    explanation: "harness is correct: the chapter's conclusion is that Coding Agents are mature not because code generation models are exceptionally strong but because the software engineering world had already accumulated a harness — test suites, type systems, version control, linters — that fits the Agent perfectly, and it says this conclusion should travel to other Agent scenarios. stronger-models, auto-checkable and short-tasks each pick a different explanation. Lesson section: harness engineering in practice for coding agents."
  - id: "eac48cd2-9806-464a-a26c-ed2421dc6a6e"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter says an Agent's reliability is determined by something other than whether the model makes mistakes. What is it determined by?"
    options:
      - id: model-size
        text: "By the size of the model, since a larger model makes fewer mistakes worth recovering from in the first place"
      - id: trajectory-length
        text: "By the length of the trajectory, since a longer run gives the Agent more chances to notice and correct an error"
      - id: tool-count
        text: "By the number of tools the Agent was given, since more tools mean more independent paths to a working answer"
      - id: failure-paths
        text: "By whether every class of failure has its own detection, recovery, handover and termination path"
    correctOptionIds: [failure-paths]
    explanation: "failure-paths is correct: the chapter's failure and error recovery section is the flip side of the harness argument, and it concludes that reliability comes from having a designed path for each kind of failure — a streaming stall needs a watchdog and a retry, a tool validation error needs structured feedback, a task that outgrows its context needs a handover. model-size, trajectory-length and tool-count each mistake a cause of errors for a cause of robustness. Lesson section: failure and error recovery."
  - id: "bf20a443-89c5-4b19-8d77-5fdbc397ebe6"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter calls code a thinking tool. What does it mean by that?"
    options:
      - id: scratch-space
        text: "That code gives the Agent somewhere to keep its intermediate results, so a long chain of reasoning can be resumed later"
      - id: symbolic-compensation
        text: "That symbolic computation and constraint solving make up for what probabilistic thinking does badly — exact arithmetic and multi-step constraints"
      - id: replaces-thinking
        text: "That the Agent can write its reasoning as code and then run it, which removes the need for the model to think about the problem at all before answering"
      - id: durable-notes
        text: "That code comments are a more durable form of reasoning than the model's own scratch notes, so they can be reused on a later task"
    correctOptionIds: [symbolic-compensation]
    explanation: "symbolic-compensation is correct: the chapter's point is that model thinking is probabilistic and approximate, so exact arithmetic and multi-step constraint checks are delegated to code, which either runs and gives an exact answer or raises an error. scratch-space describes a different benefit of code. replaces-thinking overstates it, since the model still parses the intent and writes the code. durable-notes is about memory rather than about thinking. Lesson section: code as a thinking tool."
  - id: "6c772a43-167a-413a-a29b-14eb150c0d81"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter's Artifact pattern sends data straight from the database to the client instead of passing it through the model. What is the main cost of that arrangement?"
    options:
      - id: review-latency
        text: "The generated SQL or visualisation code has to be reviewed and approved by a human before it can run, which slows every query down"
      - id: schema-in-prompt
        text: "The whole database schema has to be exposed to the model, so the prompt grows with the size of the schema in the database"
      - id: model-sees-nothing
        text: "The model never sees the results, so it cannot summarise the data or reason further about what the rows actually contain"
      - id: no-reuse
        text: "The code can only be reused within a single session, because nothing records which query produced which answer for later reuse"
    correctOptionIds: [model-sees-nothing]
    explanation: "model-sees-nothing is correct: under the Artifact pattern the data flows straight from the database to the front end, which is fast, token-cheap and free of transcription hallucination, but the model never sees the rows, so it cannot do the summarising and decision-making that tasks needing the model to digest the data require. review-latency, schema-in-prompt and no-reuse are not the trade-offs the chapter draws. Lesson section: code-driven multimedia generation and the artifact pattern."
  - id: "d040e22c-0fdf-4777-9381-1a5c134afd84"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the chapter's airline cancellation tool, the optional expected_cabin_class and expected_has_insurance parameters are also read from the database on the server side. What are they for?"
    options:
      - id: checklist-and-gate
        text: "They act as a mandatory checklist that makes the model verify each policy condition before calling, while the server checks the truth independently"
      - id: error-messages
        text: "They let the server return a more specific error message, so the model can tell which policy condition failed without having to read the policy text itself"
      - id: compatibility
        text: "They let the tool keep the original interface, so that existing callers do not have to change the way they invoke it"
      - id: optional-because-prompted
        text: "They are optional because the policy rules are already written in the system prompt, so the parameters only record what the model believed"
    correctOptionIds: [checklist-and-gate]
    explanation: "checklist-and-gate is correct: the parameters work at two levels at once — they force the model to retrieve the order details and walk each rule before it calls, and the server never trusts the model's version of the facts but checks them against the database ground truth, so neither hallucination nor prompt injection can get past the business rules. error-messages, compatibility and optional-because-prompted each miss the design. Lesson section: code as a constraint for business rules."
  - id: "2a48a2a8-d0f4-4ca0-9947-ef9e18d16cc2"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the chapter treat network egress control inside the code execution sandbox as the item most easily overlooked and yet the most critical?"
    options:
      - id: default-allow
        text: "Because most sandboxes allow egress by default, so that default is the one thing that has to be changed before anything else in the harness"
      - id: model-unreliable
        text: "Because the model cannot be told not to make network calls, so the sandbox has to filter them at the proxy layer rather than in the prompt"
      - id: install-needs-network
        text: "Because a dependency that needs the network during installation will break, so the whitelist has to be generous from the start"
      - id: exfiltration
        text: "Because without it, an injection that reads private data still has no way to send that data anywhere, so exfiltration becomes impossible"
    correctOptionIds: [exfiltration]
    explanation: "exfiltration is correct: the sandbox holds the first two parts of the attack loop — untrusted content reaching the Agent and private data being read — and a default-deny egress policy removes the third, the ability to communicate externally, so an attack that gets through still cannot deliver the data to a command-and-control server. default-allow and install-needs-network are about configuration convenience. model-unreliable misplaces the point, since the chapter's argument is architectural rather than about the model's compliance. Lesson section: security for coding agents."
  - id: "fb968220-7464-4aa5-a576-5a1500162371"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these are among the six dimensions the chapter gives for using code generation beyond programming? Select every correct answer."
    options:
      - id: thinking-tool
        text: "Thinking Tool, using symbolic computation to cover for the weaknesses of probabilistic thinking"
      - id: system-adapter
        text: "System Adapter, automatically following the way a system's formats evolve so log parsing keeps working"
      - id: prompt-caching
        text: "Prompt Caching, keeping the stable prefix of the context so that the engine can reuse the cached tokens"
      - id: generative-ui
        text: "Generative UI, building forms, visualisations and small applications instead of answering in plain text"
    correctOptionIds: [thinking-tool, system-adapter, generative-ui]
    explanation: "thinking-tool, system-adapter and generative-ui are correct: the six are the thinking tool, business rule constraints, multimedia generation, the system adapter, generative UI and agent bootstrapping. prompt-caching is a context-engineering technique from Chapter 2 rather than one of the six. Lesson section: code, the meta-capability of a general agent."
  - id: "c0283519-4081-4a4b-93ea-fcdf9b798c72"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter list among the requirements for a code execution sandbox? Select every correct answer."
    options:
      - id: tiered
        text: "Tiered isolation, with containers or microVMs that have their own kernel boundary from the host"
      - id: readonly-mounts
        text: "Read-only mounts for the source repository, and keeping credentials such as API keys out of the sandbox entirely"
      - id: resource-limits
        text: "Resource ceilings on CPU and memory, together with execution timeouts and structured timeout errors"
      - id: open-egress
        text: "Network access granted by default to every host the sandbox can reach, with a proxy logging what was fetched"
    correctOptionIds: [tiered, readonly-mounts, resource-limits]
    explanation: "tiered, readonly-mounts and resource-limits are correct: the chapter calls for isolation by tier, read-only source mounts with separate writable workspaces, credentials kept out of the sandbox, resource limits and managed timeouts, with structured errors returned to the Agent when a limit is hit. open-egress contradicts the chapter's default-deny position on network access. Lesson section: security for coding agents."
  - id: "00246240-bc36-4b47-b10a-e6bb51d67027"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter adds persistent memory as a fourth dimension to Simon Willison's Lethal Triad, on the grounds that persistent memory is in itself a necessary condition for any successful attack. Is that what the chapter says?"
    answer: false
    explanation: "False — the chapter is careful about the claim. Persistent memory is not an independent necessary condition for completing a single attack; it is an amplifier. An injection that lands in the long-term store lies dormant across sessions and compounds over time, so it changes what a later session reads and therefore what it believes. Lesson section: security for coding agents, the Lethal Triad and the fourth dimension."
  - id: "72307555-494c-4f4c-9ac3-ff1b744f12d5"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the chapter's account of why Coding Agents are mature, and say what it says should travel from that account to other kinds of Agent."
    sampleAnswer: "The maturity of Coding Agents comes not from unusually strong code models but from the infrastructure software engineering had already accumulated: test suites that say whether an outcome is right, type systems and compilers that say whether the code is well-formed, linters that say whether it follows the project's conventions, and version control that makes every change reversible. The chapter's conclusion is that this should travel to other Agent scenarios — find the existing machinery in the domain that already produces machine-checkable feedback, and wire the Agent's output into it."
    explanation: "A strong answer makes the causal claim the chapter actually makes — that the maturity comes from the surrounding infrastructure rather than from the model — names the pieces of that infrastructure, and then states what is supposed to travel to other Agent scenarios, which is the method of looking for an existing verifier in the domain. An answer that only lists test suites and version control has described the ingredients without the argument. Lesson section: harness engineering in practice for coding agents, and failure and error recovery."
  - id: "3b13cc26-600e-4009-add4-a0aed0261b1c"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the loyalty problem the chapter raises for Agents operating under multi-party delegation, and say what the chapter says an Agent needs in order to handle it."
    sampleAnswer: "Foundation models are trained to be helpful to whoever is speaking, and in a multi-party setting the speaker is often an adversary: a counterparty, a third-party MCP server, a repository, or an injected instruction inside a tool response. A helpfulness bias plus an untrusted speaker produces the failure the chapter calls being too honest — the Agent leaks the principal's bottom line, its constraints or its credentials. Handling it needs an explicit loyalty code of conduct: the principal is the only party whose instructions carry authority, and everything arriving from outside is downgraded to unprivileged reference data that carries no force of instruction."
    explanation: "A strong answer identifies the specific mismatch — a model trained to help whoever speaks, now dealing with a speaker who is an adversary — names the consequence, and then gives both halves of the remedy: an explicit loyalty stance that separates authority from data, and the architectural enforcement behind it. An answer that only says the Agent should be careful has not addressed the loyalty problem. Lesson section: security for coding agents, the loyalty spectrum under multi-party delegation."
```

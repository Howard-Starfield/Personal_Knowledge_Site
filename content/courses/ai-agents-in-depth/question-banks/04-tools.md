---
id: "95d5461b-361b-4a59-a0b2-32a190ec7b34"
title: "Chapter 4: Tools: Question Bank"
description: "Practice questions for the Tools chapter: choosing a form of capability, writing tool definitions, MCP, perception and execution tool design, and surviving tool explosion."
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

These questions practise [[courses/ai-agents-in-depth/lessons/04-tools|Chapter 4: Tools]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "95ebab95-9b26-4351-a713-d43a1052779d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The chapter says to lean towards general tools by default and to fall back to a dedicated tool in four particular cases. Which set of cases does it give?"
    options:
      - id: four-cases
        text: "Security and permissions, parameter complexity, extremely high usage frequency, and platform differences"
      - id: latency-and-code
        text: "Security and permissions, parameter complexity, extreme latency requirements, and the length of the implementation code"
      - id: community-and-price
        text: "Security and permissions, the popularity of the API in its community, the price charged by the third-party service, and its implementation language"
      - id: performance-only
        text: "Performance alone — a dedicated tool is worth building whenever it would run faster than the general executor on the same task"
    correctOptionIds: [four-cases]
    explanation: "four-cases is correct: the chapter lists security and permissions, parameter complexity, extremely high usage frequency, and platform differences as the reasons to pay for a dedicated tool instead of leaving the capability to a general executor. latency-and-code, community-and-price and performance-only each replace the list with reasons the chapter does not give. Lesson section: forms of capability expression, dedicated tools, general executors and skills."
  - id: "cacddf85-034a-4cc1-af87-cc06c8112921"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why does the chapter treat the design of one tool per REST endpoint as an anti-pattern?"
    options:
      - id: schema-impossible
        text: "Because most REST endpoints return data that cannot be expressed in a JSON Schema at all, so no tool could describe them"
      - id: shape-drifts
        text: "Because REST endpoints change their response shape without notice, so any fixed schema for them will always go stale"
      - id: call-limit
        text: "Because the model cannot call more than a handful of tools in one turn, so fine granularity starves it of options to choose from"
      - id: goal-not-endpoint
        text: "Because it makes the Agent coordinate many fine-grained calls to reach a single goal, and a tool should match the goal instead"
    correctOptionIds: [goal-not-endpoint]
    explanation: "goal-not-endpoint is correct: the direct API wrapper was the earliest form of tool design and it produced tools far too fine-grained, forcing the Agent to orchestrate several calls for one objective. The chapter's Agent-Computer Interface analogy says a tool should correspond to the Agent's goal — a diagnose and heal operation, a read document operation — rather than to a low-level endpoint. schema-impossible, shape-drifts and call-limit are not the argument the chapter makes. Lesson section: universal principles of tool design and the art of tool description."
  - id: "bc8e6217-9dca-4216-b8cb-764a4bf9dd68"
    revision: 1
    status: active
    type: single-choice
    prompt: "MCP defines three core primitives. Which mapping does the chapter give?"
    options:
      - id: three-primitives
        text: "Tools for actions with side effects, Resources for read-only URI-addressable data, and Prompts for reusable templates"
      - id: swapped-primitives
        text: "Tools for read-only data, Resources for actions with side effects, and Prompts for the transport between the host and the server"
      - id: nearly-same
        text: "Tools and Resources for the same read-only data, differing only in whether they are URI-addressable, and Prompts for holding credentials"
      - id: reasoning-primitives
        text: "Tools for the model's own reasoning steps, Resources for what the Agent does to the world, and Prompts for the model's final output"
    correctOptionIds: [three-primitives]
    explanation: "three-primitives is correct: Tools are executable functions that can compute or change the external world, Resources are read-only data the client can attach as context without invoking anything, and Prompts are reusable parameterised templates for interaction. swapped-primitives has Tools and Resources reversed. nearly-same collapses two distinct primitives into one. reasoning-primitives describes the model's internals rather than the protocol's surface. Lesson section: the tool ecosystem, MCP and Skill Hubs."
  - id: "70cf267b-becd-42f4-b36d-0371028a6a04"
    revision: 1
    status: active
    type: single-choice
    prompt: "In MCP's client-server architecture, what is the role of the MCP Client?"
    options:
      - id: host-role
        text: "It is the user-facing application where the Agent runs and where the person starts the workflow"
      - id: server-role
        text: "It is the lightweight service that exposes tools, resources and prompts to whatever connects to it"
      - id: connector-role
        text: "It sits inside the host application and holds the protocol connections to the servers on the Agent's behalf"
      - id: tool-role
        text: "It is the tool itself, wrapping a remote service and translating that service's output into a schema the model can read"
    correctOptionIds: [connector-role]
    explanation: "connector-role is correct: the MCP Host is the application the user talks to, the MCP Client lives inside that host and maintains the protocol connections, translating the Agent's requests into protocol messages and the servers' answers back, and the MCP Server is the service that exposes tools, resources and prompts. host-role and server-role name two other roles of the same architecture, and tool-role confuses the client with the tool it connects to. Lesson section: the tool ecosystem, MCP architecture and transport layers."
  - id: "6872b4b4-252a-4d2f-9b0a-097b97143ca9"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which tool-definition practice does the chapter single out as the one that prevents the model from inventing invocations?"
    options:
      - id: second-person
        text: "Writing the description in the second person, so the model recognises the text as an instruction addressed to it"
      - id: negative-boundary
        text: "Stating the negative boundary, so the description says plainly what the tool cannot do and what inputs it rejects"
      - id: concrete-examples
        text: "Including several concrete formatted examples, such as a telephone number written the way the tool expects to receive it"
      - id: parameter-order
        text: "Listing the parameters in the order the model is expected to supply them, so that the order is never ambiguous"
    correctOptionIds: [negative-boundary]
    explanation: "negative-boundary is correct: a file-search tool that says it matches file names and not file contents stops the model from calling it with content to search inside, and this is what the chapter credits with preventing hallucinated invocations. second-person, parameter-order and concrete-examples are good habits the chapter mentions but none of them is the one it names as the guard against invented calls. Lesson section: the art of tool description."
  - id: "67a5fa48-0af6-4080-ac32-196538aa864c"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the early-2026 Cursor case, an edit tool kept reporting that it could not find Chinese text the Agent had just read correctly. What went wrong?"
    options:
      - id: read-unstable
        text: "The read tool returned the curly quotes in a slightly different Unicode form on each call, so the model could never repeat itself"
      - id: model-normalised
        text: "The model normalised the curly quotes itself before passing them along, and did so inconsistently from one call to the next"
      - id: always-straight
        text: "The edit tool only ever matched straight quotes, and the read tool had in fact been returning straight ones all along"
      - id: silent-conversion
        text: "The parameter layer silently converted the curly quotes to straight ones, so what the model saw was not what was matched"
    correctOptionIds: [silent-conversion]
    explanation: "silent-conversion is correct: the read tool gave the model unaltered curly quotes, the model passed them faithfully in old_string, and the tool's parameter layer quietly normalised them to straight quotes, so the search never matched. The chapter's rule is that a tool layer must never silently transform or inject parameters without the model knowing. read-unstable, model-normalised and always-straight each blame the wrong component. Lesson section: fidelity of parameter passing."
  - id: "3f096a84-ba2c-4090-abad-a31ce7b8eeaf"
    revision: 1
    status: active
    type: single-choice
    prompt: "A call to an execution tool times out. Why is a blind retry dangerous, and what does the chapter recommend instead?"
    options:
      - id: idempotency-key
        text: "A non-idempotent call may already have taken effect, so use an idempotency key or query the resource before retrying"
      - id: budget-slot
        text: "A retry consumes a second execution slot from the model's budget, so the harness must refuse to retry any timed-out call at all"
      - id: rollback-guarantee
        text: "The tool's own timeout guarantees the side effect was rolled back, so retrying is always safe for reversible operations"
      - id: server-serialises
        text: "Retries are safe because the server serialises calls from one session, so the second attempt is simply ignored by the backend"
    correctOptionIds: [idempotency-key]
    explanation: "idempotency-key is correct: when a call times out or is cancelled the side effect may or may not have happened, and for a non-idempotent operation such as sending an invoice or moving money a blind retry duplicates an irreversible real-world effect. The chapter recommends client-generated idempotency keys so the server can deduplicate, or querying the resource state before mutating, and for inherently non-idempotent actions a two-phase pre-check and confirm pattern with independent validation. budget-slot, rollback-guarantee and server-serialises are not the chapter's reasoning. Lesson section: execution tools, idempotency and cancellation semantics."
  - id: "0dcfb0cd-ccd6-416a-a026-24893ec532bb"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these tool categories does the chapter cover here, rather than deferring to Chapter 6? Select every correct answer."
    options:
      - id: perception
        text: "Perception Tools, which the Agent invokes to acquire information"
      - id: execution
        text: "Execution Tools, which the Agent invokes to change the world"
      - id: event-triggered
        text: "Event-Triggered Tools, which are driven by an external event rather than by the Agent"
      - id: collaboration
        text: "Collaboration Tools, which the Agent invokes to drive other Agents or to reach a human"
    correctOptionIds: [perception, execution, collaboration]
    explanation: "perception, execution and collaboration are correct: the chapter says it covers the three of the five categories the Agent invokes on its own initiative. event-triggered is wrong because that category is driven by external events and is inseparable from an event-driven asynchronous runtime, so the chapter defers it, together with User Communication Tools, to Chapter 6. Lesson section: chapter summary and the tool classification table."
  - id: "27cc8b2b-53f6-4ca7-869f-3f0a02d522b1"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the chapter recommend for perception tools such as web_search and read_file? Select every correct answer."
    options:
      - id: cache-and-parallel
        text: "Exploit their read-only nature to cache responses and to let several calls run in parallel"
      - id: structured-snippets
        text: "Return structured candidate summaries — title, URL, snippet — instead of whole pages of text"
      - id: explicit-pagination
        text: "Paginate with an explicit offset and limit, and say plainly in the output that it was truncated"
      - id: raw-full-text
        text: "Return the complete raw text of every match, because the model cannot reason over a summary on its own"
    correctOptionIds: [cache-and-parallel, structured-snippets, explicit-pagination]
    explanation: "cache-and-parallel, structured-snippets and explicit-pagination are correct: because perception tools have no side effects their outputs can be cached and fetched concurrently, searches should return candidate summaries rather than full text, and truncation must be declared rather than silent so the model does not read a missing tail as the whole record. raw-full-text contradicts the chapter's guidance and would flood the context window. Lesson section: perception tools."
  - id: "4064f4e7-5a70-4cea-b13f-f4ce97a7ad16"
    revision: 1
    status: active
    type: true-false
    prompt: "The chapter describes the MCP-Zero approach as keeping a large catalogue of third-party tool schemas in the system prompt, so that the Agent can pick from the catalogue whenever it needs one of those capabilities. Is that what the chapter describes?"
    answer: false
    explanation: "False — MCP-Zero does the opposite. The system prompt carries no pre-loaded third-party schemas, only the basic tools plus a discovery meta-tool, and when the Agent hits a capability gap it emits a structured capability request. The system then performs two-level semantic matching — first identifying candidate servers, then candidate tools inside those servers — and injects only three to five matched schemas, so the catalogue never occupies the context and the cache prefix stays intact. Lesson section: model-native proactive tool discovery."
  - id: "ad7ef063-2a5c-496a-8acf-8f5b4eecf642"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the chapter's execute-validate-feedback loop and say where the pattern stops being applicable."
    sampleAnswer: "The rule is that if the result of an operation can be verified, it should be verified automatically and immediately: after write_file, run a linter or compiler, parse the output into structured errors and return them in the tool result so the Agent can correct itself in the next turn. The pattern generalises beyond code — after changing a configuration, run it in a sandbox to confirm it took effect. It stops applying where the operation is irreversible and non-idempotent, such as sending an email or transferring money, where there is nothing to observe afterwards; there the chapter switches to an ex ante mechanism, Proposer-Reviewer pre-approval."
    explanation: "A strong answer states the automatic-verification rule, gives at least one extension of it beyond linting code, and then names the boundary case of irreversible, non-idempotent operations together with the substitute the chapter proposes for it. An answer that only describes the linting example has not generalised the pattern, and one that never reaches the boundary case has missed why the chapter frames the pattern as conditional. Lesson section: the execute-validate-feedback loop and output management."
  - id: "7a764d21-c837-48bf-bc98-6ae988740ecb"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the chapter says happens when a large number of tool schemas are injected into the prompt at once, and describe the mitigations it proposes."
    sampleAnswer: "Flat injection degrades selection accuracy: even frontier models show it, with Anthropic reporting Opus accuracy on tool-use benchmarks falling to 49 percent under flat injection, while small models confuse specialised tools with generic ones, forget a tool exists, or hallucinate names. The causes are attention dilution, context flood, and broken KV cache prefix reuse whenever the tool list changes. The mitigations are hierarchical organisation, on-demand loading, proactive discovery as in MCP-Zero, and Skills, which keep a catalogue resident while the detail loads on demand."
    explanation: "A strong answer names the failure — degraded selection accuracy, with concrete instances of confusion, forgetting and hallucinated names — and then lists the mitigations with the mechanism behind each one, including the cache-prefix point. An answer that gives only the symptom or only the fixes has answered one side of the question. Lesson section: what to do when there are too many tools, and the tool explosion experiment."
```

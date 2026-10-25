---
id: "f4734aeb-9e17-4741-9494-6fe11868277f"
title: "Anthropic Frontier Architecture: Fable 5 Mythos Fences, Sonnet 5 Computer Use & Opus 4.8 Memory Nodes: Question Bank"
description: "Practises the lesson's Fable 5 safety fences and compliance block, Sonnet 5's verbosity and tokenizer taxes, and Opus 4.8's persistent memory nodes."
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

These questions practise [[courses/ai-model-trends-the-latest-you-need-to-know/lessons/02-anthropic-frontier-fable-sonnet-opus-agents|Anthropic Frontier Architecture: Fable 5 Mythos Fences, Sonnet 5 Computer Use & Opus 4.8 Memory Nodes]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "58b80b27-92be-443a-82bf-a544c09632fe"
    revision: 1
    status: active
    type: single-choice
    prompt: "When an automated prompt sequence trips Fable 5's distillation classifiers, what does the lesson say actually happens?"
    options:
      - id: a
        text: "The gateway returns an unhandled 400 error, because Anthropic refuses to serve requests that look like suspected model distillation"
      - id: b
        text: "The request is silently held for manual review by Anthropic's safety team before any response is produced"
      - id: c
        text: "Dynamic Fallback Routing downgrades inference from Fable 5 to Opus 4.8 and still answers"
      - id: d
        text: "The request is rerouted to the restricted Mythos 5 tier, which carries fewer output filters than Fable 5 does"
    correctOptionIds:
      - c
    explanation: "The lesson is explicit that Fable 5 does not simply throw an unhandled 400 error. The gateway flags the payload, the execution path transparently downgrades inference from Fable 5 to Opus 4.8, and the response comes back without a crash but with a noticeable shift in reasoning depth and token output patterns. That is why the lesson says teams must validate the anthropic-model-version response header on every turn. Option d has the direction backwards; Mythos is the more restricted tier, not a fallback target."

  - id: "5c557eec-3668-43a8-b0d9-3ec72408b864"
    revision: 1
    status: active
    type: single-choice
    prompt: "What compliance condition does the lesson call an absolute blocker for deploying Fable 5 and the Mythos tier?"
    options:
      - id: a
        text: "The requirement to retain unencrypted inference logs for 30 consecutive days"
      - id: b
        text: "The requirement to route every inference through Anthropic's Dynamic Fallback Routing pipeline before it reaches the model"
      - id: c
        text: "The requirement that the model share its foundational checkpoint with the restricted Mythos 5 release"
      - id: d
        text: "The requirement to hold a separate agreement with Anthropic for every single API call that an agent makes"
    correctOptionIds:
      - a
    explanation: "Access to the Mythos and Fable tier frequently requires an explicit agreement letting Anthropic retain unencrypted inference logs for 30 consecutive days, and the lesson calls that an absolute blocker for healthcare entities governed by HIPAA, financial institutions bound by FINRA and SEC Rule 17a-4, and defense contractors under FedRAMP High. Many legal departments therefore mandate Opus 4.8 or zero-data-retention endpoints instead. Options b, c and d describe mechanisms the lesson does not treat as blockers."

  - id: "1a2a590b-c3d9-4228-9b04-a4466f6aca0e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which two inflation effects does the lesson say erode Sonnet 5's advertised unit-price advantage over Opus 4.8?"
    options:
      - id: a
        text: "A two-fold rise in the price per million input tokens and a four-hour minimum billing window per request"
      - id: b
        text: "A 3.5x output verbosity multiplier and a 30% tokenizer expansion on identical source code"
      - id: c
        text: "A 30-day audit-log charge per request and a mandatory two-minute think-time billed per turn"
      - id: d
        text: "A 3.5x rate for high-effort reasoning and a $15.00 output price that applies from the first token onward"
    correctOptionIds:
      - b
    explanation: "The lesson names two effects. Sonnet 5 routinely generates 3.5 times more output tokens than Opus 4.8 for an identical programming task, and Anthropic's updated byte-pair encoding vocabulary produces approximately 30% more tokens for the exact same character sequence on TypeScript and JSX source files. Options a and d invent pricing mechanics the lesson does not describe. Option c mixes in the compliance and latency problems, which are real but are not the two token inflation effects."

  - id: "a373bbc3-3b33-4b89-a6b9-717c7cee1265"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's 100-step agentic loop comparison, what did the run actually cost?"
    options:
      - id: a
        text: "Sonnet 5 at $17.42 against Opus 4.8 at $23.00, a modest 24% saving rather than the advertised 60%"
      - id: b
        text: "Sonnet 5 at $13.80 against Opus 4.8 at $23.00, so the advertised 60% saving survived the token inflation"
      - id: c
        text: "Sonnet 5 at $23.00 against Opus 4.8 at $17.42, so the verbose model ended up the more expensive of the two"
      - id: d
        text: "Sonnet 5 at $17.42 against Opus 4.8 at $23.00, but the wall-clock duration stayed at 15 minutes for both models"
    correctOptionIds:
      - a
    explanation: "The lesson reports $17.42 for Sonnet 5 against $23.00 for Opus 4.8, so the real-world financial difference is a modest 24% saving rather than the 60% that the sticker prices suggest. Option b keeps the advertised figure, which is exactly what the lesson denies. Option c reverses the models. Option d contradicts the lesson, which says the two-minute time-to-first-token penalty stretched the wall clock from 15 minutes to over 2 hours."

  - id: "b06b0eb3-d975-41e5-880a-1e1bbd13e48d"
    revision: 1
    status: active
    type: single-choice
    prompt: "How does the lesson describe Opus 4.8's persistent memory architecture?"
    options:
      - id: a
        text: "A single flat text file that accumulates every prior session and is replayed in full at the start of each new terminal session"
      - id: b
        text: "A session-bounded scratchpad that is cleared as soon as the terminal session is closed"
      - id: c
        text: "A vector index of every repository file, rebuilt from scratch each time the agent is prompted"
      - id: d
        text: "A hierarchical memory graph of semantic nodes for architecture, persona and environment"
    correctOptionIds:
      - d
    explanation: "The lesson says memory is not dumped into an unindexed flat text file but partitioned into semantic nodes: a project root memory node, an architecture node, a user persona node and environmental nodes covering sandbox restrictions, headless browser loopback bindings and OAuth test credentials. It also reports a 300% improvement over Opus 4.7 in recalling granular architectural constraints across 20 or more distinct multi-day terminal sessions. Option a and option c are the two opposite failure modes the lesson explicitly rejects."

  - id: "011b172d-fcdb-491d-bcbf-4c225cfa8150"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the Google OAuth case study, what did Opus 4.8 actually change to fix the failing flow?"
    options:
      - id: a
        text: "It rewrote the application's OAuth handler so the popup posted its token straight to the parent frame"
      - id: b
        text: "It relaxed the strict COOP and COEP browser flags so the popup could talk to the parent frame again"
      - id: c
        text: "It updated the container initialization flags and mocked the loopback redirect"
      - id: d
        text: "It added a second network interface to the container so that traffic between the two local ports could reach each other"
    correctOptionIds:
      - c
    explanation: "The lesson's point is that the bug was environmental, not in the application. The container's virtual network interface was blocking loopback traffic between the two local ports, and the headless browser's strict COOP and COEP flags had severed window communication between the OAuth popup and the parent frame. Opus 4.8 fixed it by updating the container initialization flags and configuring an automated test mock for the loopback redirect, leaving the production application code pristine. Option b gets the diagnosis right but describes the opposite of the fix."

  - id: "9508450c-1b40-4091-b0f6-5318f71f4019"
    revision: 1
    status: active
    type: single-choice
    prompt: "What did Fable 5 do to MVPunk's export pipeline that Opus 4.8 did not?"
    options:
      - id: a
        text: "It split the monolithic main.js into three slightly smaller modules while keeping the state management intact"
      - id: b
        text: "It added a stream-based zipArchive.ts and a firebaseAuth.ts service with over 20 modular React components"
      - id: c
        text: "It left the monolithic export route in place and simply added typed claims to the existing event listeners"
      - id: d
        text: "It replaced the whole exporter with a single runtime template that generates every screen at once"
    correctOptionIds:
      - b
    explanation: "The lesson contrasts the two. Opus 4.8 took the incremental path, preserving the monolithic export route and splitting main.js into app.js, helpers.js and styles.css. Fable 5 re-engineered the codebase: a bundlefiles.ts packaging pipeline using stream-based memory buffers, a dedicated firebaseAuth.ts service with session revocation listeners and typed claims, and over 20 discrete TypeScript React components built on atomic design. Option a describes Opus 4.8's approach, and option d repeats the anti-pattern the refactoring was meant to remove."

  - id: "07ab06ee-cfdf-4334-b667-94cb2301da39"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which consequences does the lesson attach to the 30-day unencrypted inference-log retention on the Mythos and Fable tier? Select every correct answer."
    options:
      - id: a
        text: "It is cited as an absolute blocker for healthcare entities governed by HIPAA."
      - id: b
        text: "It is cited as an absolute blocker for financial institutions bound by FINRA and SEC Rule 17a-4."
      - id: c
        text: "It is cited as an absolute blocker for defense contractors complying with FedRAMP High."
      - id: d
        text: "It applies equally to Opus 4.8 and to the standard enterprise zero-data-retention endpoints."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "The lesson names all three regulated groups: healthcare entities under HIPAA, financial institutions under FINRA and SEC Rule 17a-4, and defense contractors under FedRAMP High. Many enterprise legal departments categorically prohibit Fable 5 on core proprietary repositories and mandate Opus 4.8 or zero-data-retention endpoints instead, which is why option d is wrong; the comparative matrix gives Opus 4.8 a standard enterprise zero-data-retention gate."

  - id: "ca2141c6-128a-48e1-9c54-4000923af083"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the lesson identify as the reasons Sonnet 5's apparent unit-price advantage shrinks? Select every correct answer."
    options:
      - id: a
        text: "A 3.5x output verbosity tax, because Sonnet 5 narrates its reasoning extensively."
      - id: b
        text: "A roughly 30% tokenizer expansion from Anthropic's updated byte-pair encoding vocabulary."
      - id: c
        text: "A two-minute to two-and-a-half-minute time-to-first-token cliff under high effort."
      - id: d
        text: "A two-fold increase in the price per million input tokens charged for Sonnet 5 from day one."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "The lesson lists the 3.5x verbosity multiplier, the 30% tokenizer inflation and the 120 to 150 second time-to-first-token cliff, and it is the last of those that stretches a 15-minute wall clock to over 2 hours. Option d is false: Sonnet 5's introductory pricing is $2.00 per million input tokens against Opus 4.8's $5.00, which is the advantage the lesson is explaining away."

  - id: "f7a7dc96-bcd9-4748-8c74-f895397cb5df"
    revision: 1
    status: active
    type: true-false
    prompt: "Sonnet 5's two-minute time-to-first-token cliff can trigger default gateway timeouts, so agent frameworks need asynchronous polling or explicit timeout overrides."
    answer: true
    explanation: "The lesson describes the 120 to 150 second time to first token as an operational cliff that can trip default gateway timeouts, and recommends asynchronous polling or explicit timeout overrides. That is also why the lesson treats Sonnet 5 as a poor fit for unattended developer workflows even though its per-token price is lower, because the wall clock stretches from 15 minutes to over 2 hours."

  - id: "eedde642-abc2-4c37-b99d-d7145ddac8fb"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why Sonnet 5's advertised unit-price advantage over Opus 4.8 shrinks from 60% to about 24% in the lesson's 100-step agentic loop."
    sampleAnswer: "On the sticker, Sonnet 5 at $2.00 per million input and $10.00 per million output looks 60% cheaper than Opus 4.8 at $5.00 and $25.00. Two effects close most of that gap. Sonnet 5 is a 3.5x output verbosity multiplier, producing stream-of-consciousness justifications and exhaustive code walkthroughs rather than terse output, and Anthropic's updated byte-pair encoding vocabulary adds roughly 30% more tokens for the identical character sequence. In the 100-step run, Sonnet 5 consumed 5.98 million input tokens and 0.546 million output tokens for $17.42, against Opus 4.8's 4.00 million and 0.12 million for $23.00, so the real saving is about 24%."
    explanation: "A strong answer names the 3.5x verbosity multiplier and the 30% tokenizer expansion as the two causes, and explains that the first is a behavioural difference while the second is a vocabulary change that applies to identical source code. It should give the realised costs of $17.42 and $23.00 and note the 24% figure. An answer that only says Sonnet 5 is more verbose misses the tokenizer change and the numbers."

  - id: "809a5daa-1dd6-4441-bae9-584963cf6c75"
    revision: 1
    status: active
    type: free-recall
    prompt: "Using the Google OAuth case study, explain the difference between an environmental diagnostic and a code-level diagnostic."
    sampleAnswer: "An environmental diagnostic asks what the runtime is doing to the program; a code-level diagnostic assumes the program itself is wrong. In the case study the container's virtual network interface was blocking loopback traffic so that one local port could not reach the other, and the headless browser had been launched with strict COOP and COEP flags that severed window communication between the OAuth popup and the parent frame. Opus 4.8 fixed this by updating the container initialization flags and configuring an automated test mock for the loopback redirect, so the production application code was left pristine. A code-level response would have been to rewrite the OAuth handler, which fixes nothing when the environment is the cause."
    explanation: "A strong answer states that the fault was in the runtime environment rather than the application code, names the two environmental causes, the blocked loopback interface and the strict COOP and COEP flags, and gives the fix, container initialization flags plus a loopback mock with the application code untouched. It should make clear that a code-level response would have been the wrong diagnosis. An answer that does not mention the flags or the loopback binding has missed the mechanism."
```

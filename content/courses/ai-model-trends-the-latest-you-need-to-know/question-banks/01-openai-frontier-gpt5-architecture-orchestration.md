---
id: "5595b825-2083-4008-be06-b5c6c3d68a0f"
title: "OpenAI Frontier Architecture: GPT-5.6 Parallel Agents, Codex Sandboxes & Multi-Modal Engines: Question Bank"
description: "Practises the lesson's GPT-5.6 triad pricing and roles, its programmatic tool-calling arithmetic and the four guarantees of the Codex sandbox."
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

These questions practise [[courses/ai-model-trends-the-latest-you-need-to-know/lessons/01-openai-frontier-gpt5-architecture-orchestration|OpenAI Frontier Architecture: GPT-5.6 Parallel Agents, Codex Sandboxes & Multi-Modal Engines]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "3b49b96f-cd81-4caf-9933-29518e59423e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which GPT-5.6 tier does the lesson price at $2.50 per million input tokens and $15.00 per million output tokens, and place as the primary engine for continuous integration pipelines and automated code review bots?"
    options:
      - id: a
        text: "GPT-5.6 Luna, the fast lightweight tier for atomic subagent tasks and real-time IDE typing suggestions"
      - id: b
        text: "GPT-5.6 Terra, the economic workhorse for standard continuous integration pipelines"
      - id: c
        text: "GPT-5.6 Sol, the autonomous flagship reserved for unsupervised multi-hour architectural migrations"
      - id: d
        text: "GPT-5.5, the legacy high-effort single-turn tier priced at $15.00 per million input tokens"
    correctOptionIds:
      - b
    explanation: "Terra is the economic workhorse: $2.50 per million input tokens and $15.00 per million output tokens, with the lesson naming standard continuous integration pipelines, automated code review bots and medium-complexity feature branches as its production role. Option a describes Luna, which is cheaper still at $1.00 and $6.00 and is aimed at atomic subagent work. Option c describes Sol. Option d describes the superseded legacy tier that Terra matches on benchmark performance at half the token cost."

  - id: "8e0920c2-d3fa-4e91-8de2-6a1d6ab36dd3"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's repository audit of 120 API route handlers, what did programmatic tool calling actually change?"
    options:
      - id: a
        text: "Token use fell from 18,735 to 443, a 97.6% reduction, but wall-clock time rose because the generated script had to be compiled first"
      - id: b
        text: "Token use fell from 18,735 to 2,450, a 87% reduction, with no change at all to wall-clock execution time"
      - id: c
        text: "Token use fell from 18,735 to 443, a 97.6% reduction, and wall-clock time fell from 28.4 seconds to 4.2 seconds"
      - id: d
        text: "Token use was unchanged at 18,735, because the filtered result still has to travel back through the model"
    correctOptionIds:
      - c
    explanation: "The worked numbers are 18,735 tokens for the legacy multi-turn path against 443 tokens for the programmatic path, a 97.6% reduction, and 28.4 seconds of wall clock against 4.2 seconds, a 6.7x speedup. Option b contradicts the lesson, which reports the time going down as well as the tokens. Option c invents a smaller saving and denies the speedup. Option d misses the point of the pattern: only the script's own tokens and the filtered result enter the context window, so the payload never crosses the model at all."

  - id: "0fd6814f-55e3-4b7c-a9a3-d2f096238753"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's Local Sieve pattern, where does the filtering work happen, and what does it save?"
    options:
      - id: a
        text: "In a script inside the Codex sandbox, which returns only the matching paths and cuts up to 85% of token overhead"
      - id: b
        text: "Inside the model's own context window, where the model sieves the API responses before they are handed to the sandbox"
      - id: c
        text: "In the GitHub API itself, which filters out deprecated middleware before any response is ever sent back to the model"
      - id: d
        text: "In a separate telemetry service that scores and ranks every file in the repository before the model is asked to open any of them"
    correctOptionIds:
      - a
    explanation: "The Local Sieve has the model write a short script, run that script inside the Codex virtual environment, and let the script search the AST and return only the final four-line array of matching file paths. The lesson says that eliminates up to 85% of token overhead and cuts execution time by a factor of four. Option b describes the Telephone Relay pattern the Local Sieve replaces. Option c moves the work into a system the model does not control. Option d invents a separate ranking service that the lesson never describes."

  - id: "6198070a-5317-40ca-8083-f25e1d5df037"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the following is NOT one of the four foundational guarantees the Codex environment enforces?"
    options:
      - id: a
        text: "MicroVM sandboxing in an ephemeral, hardware-isolated Linux container"
      - id: b
        text: "Deterministic automated verification that runs the project's actual build and test suites and pipes failures back"
      - id: c
        text: "A persistent memory store that keeps a cross-session profile of repository conventions"
      - id: d
        text: "Automatic rebasing of every branch against the default branch before a pull request is opened"
    correctOptionIds:
      - d
    explanation: "The four guarantees the lesson names are MicroVM sandboxing, deterministic automated verification, a persistent memory store and Git-native pull-request creation. Automatic rebasing is not among them; the lesson describes the agent creating a dedicated branch, authoring atomic commits and opening a pull request with test evidence. The other three options are all guarantees the lesson states, so the answer is the only one that is not."

  - id: "e0d5da70-83b8-4cf2-8249-60b4d20b2e1e"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the MVPunk self-grading experiment, what did the three passes actually produce?"
    options:
      - id: a
        text: "Pass 1 scored 52% at medium effort, Pass 2 scored 82%, and Pass 3 reached 94% on the model's own judgement alone"
      - id: b
        text: "Pass 1 scored 52% at medium effort, Pass 2 scored 82%, and Pass 3 reached 94% once screenshots were fed back"
      - id: c
        text: "Pass 1 scored 52% at medium effort, Pass 2 scored 94%, and Pass 3 settled at 87% once the carousel was fixed"
      - id: d
        text: "Pass 1 scored 52% at medium effort, Pass 2 scored 82%, and Pass 3 stalled at 82% because self-grading saturated"
    correctOptionIds:
      - b
    explanation: "The lesson records Pass 1 at 52% with medium effort, Pass 2 at 82%, and Pass 3 moving from 87% to 94% with screenshot feedback. Option b is wrong because the jump to 94% came only after visual screenshots were returned to the agent. Option c scrambles the order, giving the 94% to Pass 2 and the 87% to Pass 3. Option d is wrong because the score did not stall; it climbed to 94%."

  - id: "223c768a-5188-4562-a391-9eda710dfdfb"
    revision: 1
    status: active
    type: single-choice
    prompt: "According to the lesson's Codex versus Claude Fable 5 showdown, which difference did the MVPunk test surface?"
    options:
      - id: a
        text: "Codex produced a noticeably more polished first pass, scoring 91% rising to 99% on self-grading"
      - id: b
        text: "Claude Fable 5 was the superior autonomous software engineer because it could run terminal tests"
      - id: c
        text: "Codex completed the three-pass refactoring loop at one-third the token cost of Claude Fable 5"
      - id: d
        text: "Claude Fable 5 completed the three-pass refactoring loop at one-third the token cost of Codex"
    correctOptionIds:
      - c
    explanation: "The lesson gives Fable 5 the edge on aesthetics, with a first pass scoring 91% rising to 99%, and gives Codex the edge on engineering persistence and cost, because it ran the whole three-pass loop at one-third the token cost and could run terminal tests inside the sandbox to self-correct broken CSS imports. Option b takes Fable 5's result and gives it to Codex. Option c reverses the cost comparison. Option d reverses the engineering verdict as well."

  - id: "a0963fdc-2eb1-4879-bf50-0a3ec6021fc4"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which description of the GPT-OSS 120B architecture matches the lesson?"
    options:
      - id: a
        text: "116 billion total parameters with 120 experts per layer, where only 4 experts activate per token at about 5.1 billion parameters"
      - id: b
        text: "20.9 billion total parameters and 32 experts per layer, with 3.6 billion active parameters, sized for a single consumer GPU"
      - id: c
        text: "116 billion total parameters and 120 experts per layer, with all 120 experts active for every token during long-horizon reasoning"
      - id: d
        text: "116 billion total parameters spread over just 4 experts, so a token routes through one expert carrying 30 billion parameters"
    correctOptionIds:
      - a
    explanation: "GPT-OSS 120B is described as a mixture-of-experts model with 116 billion total parameters and 120 experts per layer, where only 4 experts activate per token, for about 5.1 billion active parameters, which lets it run on a single 64GB workstation. Option b describes the smaller GPT-OSS 20B tier instead. Option a wrongly claims every expert activates on every token, which is the opposite of the sparse routing the model relies on. Option d inverts the expert-to-parameter ratio."

  - id: "13e04d40-ebbb-4cc8-af20-ceaa652cec68"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which statements about GPT-5.6 Sol's pricing and production placement match the lesson? Select every correct answer."
    options:
      - id: a
        text: "Sol is priced at $5.00 per million input tokens and $30.00 per million output tokens."
      - id: b
        text: "Sol delivers frontier reasoning at roughly half the cost of Claude Fable 5, which is priced at $10.00 input and $50.00 output."
      - id: c
        text: "Sol is reserved for unsupervised work such as autonomous migrations, repository-wide dependency updates and architectural restructuring."
      - id: d
        text: "Sol is the recommended tier for high-frequency AST search and commit message generation inside the editor."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c all match the lesson: Sol's $5.00 and $30.00 pricing, the comparison against Fable 5's $10.00 and $50.00, and the placement of Sol for work where human supervision is absent. Option d describes Luna, which the lesson names as the subagent workhorse for AST search, lint verification and commit message generation."

  - id: "6b4b90c9-fe87-49f2-aba2-e141bc972239"
    revision: 1
    status: active
    type: multiple-select
    prompt: "According to the lesson, what does programmatic tool calling change about the cost of a repository audit? Select every correct answer."
    options:
      - id: a
        text: "Only the script's own tokens and the filtered result ever enter the context window."
      - id: b
        text: "The legacy multi-turn path consumed 18,735 tokens against 443 tokens for the programmatic path."
      - id: c
        text: "Wall-clock execution fell from 28.4 seconds to 4.2 seconds, which the lesson reports as a 6.7x speedup."
      - id: d
        text: "The programmatic path still returns every matching file's full content into the context for the model to sift."
    correctOptionIds:
      - a
      - b
      - c
    explanation: "Options a, b and c are the lesson's own figures and mechanism. The key move is that the script executes locally in the sandbox, so the raw payloads never cross the model boundary. Option d is the opposite of what programmatic tool calling is for; it describes the legacy behaviour the pattern was introduced to remove."

  - id: "1cc03e34-9ac3-4226-9350-08c5091a240e"
    revision: 1
    status: active
    type: true-false
    prompt: "In the lesson's repository audit, the programmatic tool-calling path cut total token use by 97.6% and reduced wall-clock execution from 28.4 seconds to 4.2 seconds."
    answer: true
    explanation: "Both figures are the lesson's. Token use went from 18,735 to 443, a 97.6% reduction, and wall-clock time went from 28.4 seconds to 4.2 seconds, a 6.7x speedup. The lesson makes a point of the two improving together, because the filtering happens inside the sandbox instead of being delegated to the model's context window."

  - id: "00c2cd6c-028f-4a25-ba50-ed7714169c98"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain the difference between the Telephone Relay and the Local Sieve patterns in the lesson's repository-search scenario, and state what each one does to token overhead."
    sampleAnswer: "Under the Telephone Relay pattern the model calls the GitHub API itself, so every byte of the response travels through the model's context window and the model has to sift it. Under the Local Sieve pattern the model writes a short script, that script executes inside the Codex virtual environment, searches the AST, and only the filtered result returns, in the worked case a four-line array of matching file paths. The Local Sieve eliminates up to 85% of token overhead and cuts execution time by a factor of four."
    explanation: "A strong answer contrasts where the filtering happens: inside the model's context for the Telephone Relay, and inside a locally executed script for the Local Sieve. It should give the 85% token-overhead figure and the fourfold execution-time improvement, and ideally the four-line array of matching paths as the only thing that re-enters the context. An answer that only names the token saving misses that the pattern also changes latency."

  - id: "3a1d543b-149b-496f-92a0-542aaa3123c0"
    revision: 1
    status: active
    type: free-recall
    prompt: "Why does the lesson say an agent's self-grading score cannot be the only evidence of compliance, and what does it pair self-grading with?"
    sampleAnswer: "A language model evaluating its own output without external deterministic tests has a self-grading ceiling: its scores saturate somewhere between 85% and 95%, because it rationalises minor design discrepancies and inflates its own grade. In the MVPunk run the score only moved from 87% to 94% once visual screenshots were fed back to the agent. Production reliability therefore requires pairing the agent loop with visual regression screenshots through Playwright and with automated schema validators, so that something outside the model decides whether the work complies."
    explanation: "A strong answer names the 85% to 95% saturation band and explains the cause, that the model rationalises its own deviations. It should then name both external checks, Playwright visual regression screenshots and automated schema validators. Quoting the move from 87% to 94% only after screenshot feedback is good grounding. An answer that concludes self-grading is worthless has missed that the fix is external verification rather than abandoning the agent loop."
```

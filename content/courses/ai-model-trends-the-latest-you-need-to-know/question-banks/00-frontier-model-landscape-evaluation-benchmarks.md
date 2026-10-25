---
id: "ad2f70bf-5295-4eac-9530-5f53cd99736b"
title: "The Frontier Model Landscape: Empirical Evaluation Beyond Marketing Benchmarks: Question Bank"
description: "Practises the lesson's four empirical evaluation dimensions, its compounding step-degradation arithmetic and its worked token-economics comparison."
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

These questions practise [[courses/ai-model-trends-the-latest-you-need-to-know/lessons/00-frontier-model-landscape-evaluation-benchmarks|The Frontier Model Landscape: Empirical Evaluation Beyond Marketing Benchmarks]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "94f25923-4872-4c5b-baca-cea8cea1b490"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the lesson's compounding step-degradation model, a model with a per-step success probability of 0.92 needs 15 sequential tool calls to finish a refactoring task. What end-to-end success probability does the lesson's formula give?"
    options:
      - id: a
        text: "0.286, or 28.6%"
      - id: b
        text: "0.920, or 92%, because the per-step probability carries straight through to the task"
      - id: c
        text: "0.739, or 73.9%, which is the figure the lesson attaches to a per-step probability of 0.98"
      - id: d
        text: "The lesson leaves it unquantified, because a probability raised to the fifteenth power cannot be read as a task success rate"
    correctOptionIds:
      - a
    explanation: "The lesson defines overall success as P_success = (p_step)^N, so (0.92)^15 is about 0.286, or 28.6%. Option b drops the exponent and simply repeats the per-step figure. Option c quotes the 0.98 step probability instead of the 0.92 one. Option d is wrong because the lesson does the arithmetic precisely, and uses it to make the point that even a 92% reliable step turns into a poor end-to-end success rate once the number of steps grows."

  - id: "f87e94aa-8d9f-4fc7-af22-8409741a93e6"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which time-to-first-token profile does the lesson give for deep reasoning models compared with standard chat models?"
    options:
      - id: a
        text: "0.4 to 1.8 seconds for both, because a hidden deliberation phase is invisible to the client either way"
      - id: b
        text: "30 to 120 seconds for deep reasoning models, against 0.4 to 1.8 seconds for standard chat models"
      - id: c
        text: "Under 250 milliseconds for deep reasoning models, because hidden reasoning tokens are generated after the first visible token"
      - id: d
        text: "Between 60 and 300 seconds for deep reasoning models, against under 150 milliseconds for standard chat models"
    correctOptionIds:
      - b
    explanation: "The lesson puts standard chat models at a 0.4 to 1.8 second time to first token and deep reasoning models at 30 to 120 seconds, because the deliberation phase happens before the first token is emitted. Option a collapses the two profiles. Option c misreads the ordering, since deliberation precedes rather than follows the visible token. Option d mixes in the lesson's separate latency budgets for the overnight refactor and inline autocomplete rows of the operational trade-off matrix."

  - id: "a7f1de6a-ce26-48f8-b05a-666443c2130b"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the worked 50,000-run enterprise workflow, what Verbosity Multiplier does the lesson compute for Model A against Model B?"
    options:
      - id: a
        text: "1.82, because Model A is cheaper on the sticker price and therefore also cheaper on total output volume"
      - id: b
        text: "0.30, because Model B emits roughly a third of Model A's output tokens for the same task"
      - id: c
        text: "3.818, from Model A's 4,200 output tokens divided by Model B's 1,100"
      - id: d
        text: "10.00, because Model A's output sticker price is exactly half of Model B's output sticker price"
    correctOptionIds:
      - c
    explanation: "The lesson defines the Verbosity Multiplier as V_m = N_out,A / N_out,B, which is 4,200 divided by 1,100, or about 3.818. Option a is not the multiplier the lesson computes, and the sticker price alone never enters the formula. Option b inverts the ratio. Option d reads a price ratio as if it were a token ratio. The multiplier matters because Model A emits nearly four times as many output tokens as Model B for the same task."

  - id: "a4faff82-ce44-4adf-a8dd-8d43a8601860"
    revision: 1
    status: active
    type: single-choice
    prompt: "Once the full agentic feedback loop is priced over 50,000 runs a month, which model is cheaper, and by how much?"
    options:
      - id: a
        text: "Model A, the budget provider, at $5,580 a month against Model B's $5,100 a month"
      - id: b
        text: "Model A, the budget provider, because its 1.60 turns per workflow always beat Model B's 1.15 turns"
      - id: c
        text: "The two come out identical, at $5,340 a month, once the retry turns are priced in for both models"
      - id: d
        text: "Model B, the premium provider, at $5,100 a month against Model A's $5,580 a month, saving $480 a month"
    correctOptionIds:
      - d
    explanation: "The lesson prices the full loop at $5,100 a month for Model B and $5,580 for Model A, so the premium model is $480 a month cheaper, and about 180 engineering hours are saved. Option a has the totals the wrong way round. Option b confuses the per-task averages with the monthly total; Model A actually needs more turns, not fewer. Option c invents a tie that the lesson's arithmetic does not produce."

  - id: "224630b0-eb10-4d8e-b203-5919b2477325"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which benchmark archetype does the lesson's comparative matrix give the highest enterprise predictive value?"
    options:
      - id: a
        text: "Long-Horizon Professional, which measures deep agentic persistence over 20 or more sequential turns"
      - id: b
        text: "Synthetic Academic, because MMLU and GSM8k reflect raw parametric knowledge retrieval and elementary reasoning"
      - id: c
        text: "Toy Coding, because HumanEval and MBPP are saturated by almost every modern LLM on the market"
      - id: d
        text: "Real-World SWE, because SWE-bench Verified is the current industry gold standard for autonomous code repair"
    correctOptionIds:
      - a
    explanation: "The lesson's matrix grades Long-Horizon Professional as very high predictive value, because GAIA and SWE-bench Multimodal test sustained agentic behaviour over 20 or more sequential turns. Option b understates Synthetic Academic, which the lesson grades low to zero and calls highly susceptible to pre-training dataset contamination. Option c describes why Toy Coding is graded low, not high. Option d is close to the lesson's argument about SWE-bench Verified, but the lesson points at long-horizon benchmarks as the highest-value tier and flags real-world SWE as blind to frontend and visual work."

  - id: "cef558f6-379f-4cd2-a9b4-eb461ea8221e"
    revision: 1
    status: active
    type: single-choice
    prompt: "For an IDE inline autocomplete, what latency and throughput profile does the lesson's operational trade-off matrix require?"
    options:
      - id: a
        text: "Time to first token below 1.0 second and throughput above 60 tokens per second, for a smooth conversational UI"
      - id: b
        text: "Time to first token under 150 milliseconds and throughput above 100 tokens per second"
      - id: c
        text: "Time to first token under 15 seconds and throughput above 40 tokens per second, for a CI/CD review bot"
      - id: d
        text: "Time to first token between 60 and 300 seconds, because inline completion runs asynchronously in the background"
    correctOptionIds:
      - b
    explanation: "The matrix row for IDE inline autocomplete sets a time to first token under 150 milliseconds and throughput above 100 tokens per second, and pairs it with small local models such as Gemma 4 12B and Hermes Agent. Option a describes the interactive conversational UI row. Option c describes the autonomous pull-request review bot row. Option d describes the overnight architecture refactor row and is wrong about inline completion, which must feel instantaneous."

  - id: "4f826a0e-09d3-4bba-9149-61bd743282af"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which of the following is NOT one of the four deterministic pillars the lesson's contract-driven evaluation framework measures candidate models across?"
    options:
      - id: a
        text: "Grounded repository fixtures cloned from real internal codebases"
      - id: b
        text: "Verifiable type and schema contracts expressed as Pydantic v2 schemas or TypeScript interfaces"
      - id: c
        text: "A public leaderboard of third-party vendor marketing scores"
      - id: d
        text: "Environmental error injection that plants corrupted variables and broken dependencies"
    correctOptionIds:
      - c
    explanation: "The four pillars the lesson names are grounded repository fixtures, verifiable type and schema contracts, deterministic test execution and environmental error injection. A public leaderboard of vendor marketing scores is the thing the framework is designed to replace, not a pillar of it. The other three options are all pillars, so the answer is the only one that is not."

  - id: "fd571eae-8b59-4cc4-9983-bbc2b35e8308"
    revision: 1
    status: active
    type: multiple-select
    prompt: "According to the lesson's comparative matrix of benchmark archetypes, which statements are correct? Select every correct answer."
    options:
      - id: a
        text: "Synthetic Academic benchmarks such as MMLU have zero tool interaction and are highly susceptible to pre-training dataset contamination."
      - id: b
        text: "Toy Coding benchmarks such as HumanEval are saturated by almost all modern LLMs and carry low enterprise predictive value."
      - id: c
        text: "Real-World SWE benchmarks such as SWE-bench Verified evaluate interactive frontend UI, visual contracts and browser lifecycles."
      - id: d
        text: "Long-Horizon Professional benchmarks need sandboxed virtual machines because a single problem can take hours to run."
    correctOptionIds:
      - a
      - b
      - d
    explanation: "Options a, b and d all match the lesson's matrix. Synthetic Academic benchmarks have zero tool interaction and are highly susceptible to contamination; Toy Coding is saturated and carries low predictive value; Long-Horizon Professional benchmarks run for hours and therefore need sandboxed virtual machines. Option c is the opposite of what the lesson says: it names interactive frontend UI, visual contracts and browser lifecycles as the blind spot that real-world SWE benchmarks do not cover."

  - id: "a8baa69b-91ab-436f-9f6a-1378432a4e53"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which metrics does the lesson's contract-driven evaluation pipeline extract in its final, metrics-extraction phase? Select every correct answer."
    options:
      - id: a
        text: "First-pass success rate, reported as Pass@1"
      - id: b
        text: "Effective task cost in USD, including every retry turn"
      - id: c
        text: "Total latency, measured as time to first token plus generation time"
      - id: d
        text: "Average parameter count of the candidate model"
    correctOptionIds:
      - a
      - b
      - c
    explanation: "The metrics-extraction phase pulls Pass@1, effective task cost including retries, and total latency built from time to first token plus generation time. Average parameter count is not one of the extracted metrics; the lesson argues that a parameter count tells you nothing about whether an agent can finish a task, which is why it measures behaviour instead."

  - id: "4006c6de-6729-4d85-8480-961330eeafda"
    revision: 1
    status: active
    type: true-false
    prompt: "On a single turn, Model A at $0.0660 per run is cheaper than Model B at $0.0875, and Model A also ends the month with the larger bill at $5,580 against Model B's $5,100."
    answer: false
    explanation: "The single-turn half of the statement is right: Model A costs $0.0660 and Model B $0.0875. The monthly half is wrong. Once the agentic retry loop is priced over 50,000 runs, Model B costs $5,100 and Model A costs $5,580, so the premium model ends the month $480 cheaper. A single-turn sticker comparison reverses the real ordering, which is exactly the trap the lesson warns about."

  - id: "0c1cbf64-b829-42ae-a74f-9f1c35a10c55"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why Model B ends up cheaper than Model A in the lesson's 50,000-run enterprise workflow, naming the two effects that drive the result."
    sampleAnswer: "Model B looks more expensive on the sticker but emits far fewer output tokens, 1,100 against Model A's 4,200, a Verbosity Multiplier of about 3.818. It also passes the test suite on the first turn in 85% of runs, against Model A's 40%. Because Turn 1's output re-enters Turn 2 as input, the cheap model's verbosity is paid for twice, so effective cost per task is $0.1020 for Model B against $0.1116 for Model A, which works out at $5,100 a month against $5,580."
    explanation: "A strong answer names both the Verbosity Multiplier and the first-pass success rate and shows how they compound through the retry loop. It should also note that Turn 1's output tokens become Turn 2's input tokens, so verbosity is paid for twice, and it should give the monthly totals of $5,580 against $5,100. An answer that only says Model B is cheaper on output tokens misses the larger effect, which is the retry loop."

  - id: "9a019b40-7822-41eb-90d1-d78ab858739a"
    revision: 1
    status: active
    type: free-recall
    prompt: "Describe the four levels of software autonomy the lesson defines, and say which level frontier reasoning models reach."
    sampleAnswer: "Level 1 is inline suggestion, tab completion inside the editor with no agency at all. Level 2 is interactive conversational scaffolding in an IDE sidebar, where the human still copies, pastes and fixes. Level 3 is directed pull-request generation, where the agent opens a branch and edits files but every line of the diff is reviewed by a human. Level 4 is walk-away specification execution, where the human writes a formal specification and the agent works in a sandboxed virtual environment for two or more hours before submitting a green pull request. The lesson places frontier reasoning models at Level 4."
    explanation: "A strong answer gives all four levels in order, from inline suggestion through walk-away specification execution, and states that frontier reasoning models cross into Level 4 because they can reason about environmental errors and back out of a failing strategy. Mentioning the two-hour sandboxed autonomous run is good evidence of grounding. An answer that stops at Level 3 has not reached the lesson's conclusion."
```

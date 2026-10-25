---
id: "717670be-3896-4def-b905-9c7325aad956"
title: "Introduction: Agent = LLM + Context + Tools: Question Bank"
description: "Practice questions for the introduction lesson: the Agent = LLM + Context + Tools formula, its reinforcement-learning mapping, the book's chapter structure, and how to read the book."
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

These questions practise [[courses/ai-agents-in-depth/lessons/00-introduction|Introduction: Agent = LLM + Context + Tools]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "5061fc80-24e6-4bb7-90f0-0b7e31a48897"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction maps the book's core formula onto classical reinforcement learning. Which mapping does it give?"
    options:
      - id: reversed
        text: "LLM to the observation space, Context to the action space, and Tools to the policy, which puts the decision logic where the world should be"
      - id: policy-observation-action
        text: "LLM to the Policy, Context to the Observation Space, and Tools to the Action Space"
      - id: swapped
        text: "LLM to the Policy, Context to the Action Space, and Tools to the Observation Space, which swaps what the Agent perceives with what it can do"
      - id: environment-first
        text: "LLM to the Environment, Context to the Policy, and Tools to the Observation Space, which treats the surroundings as the component that decides"
    correctOptionIds: [policy-observation-action]
    explanation: "policy-observation-action is correct: the introduction says LLM corresponds to Policy, Context to Observation Space, and Tools to Action Space, adding that the three expressions describe the same object at different levels of abstraction. reversed is wrong because it puts the Policy in the Tools slot and the decision logic in the world's slot. swapped is wrong because Context is what the Agent perceives and Tools are what it can do, so this option trades the two. environment-first is wrong because the Environment sits outside the formula entirely; it is what the Agent observes and acts on, not a component of the Agent. Lesson section: the paragraph introducing the core formula."
  - id: "6063ecb9-9c0d-46ed-8533-01c36c54730c"
    revision: 1
    status: active
    type: single-choice
    prompt: "Before an Agent buzzword arrives, the introduction says two things let you know what to do. Which two?"
    options:
      - id: frontier-first
        text: "Keep the model at the frontier and rewrite the harness every time a new capability appears on the leaderboard"
      - id: publish-first
        text: "Publish the method first, then keep the implementation private until the leading companies have shipped their own version of it"
      - id: literature-first
        text: "Wait for the academic literature to settle the terminology, then adopt the vocabulary the field has standardised on"
      - id: business-and-evaluation
        text: "Run a demanding real business, and build an Evaluation mechanism"
    correctOptionIds: [business-and-evaluation]
    explanation: "business-and-evaluation is correct: the introduction names two keys — a real business with extreme demands on the Agent's capability ceiling, and an Evaluation mechanism that lets you tell a genuine improvement from a lucky one. frontier-first and literature-first are wrong because both make the decision depend on something outside the team, a model release or a settled vocabulary, whereas the introduction's point is that practice arrives before the naming. publish-first is wrong because the author released the book as open source precisely so the method would spread rather than stay private. Lesson section: the two keys for knowing what to do before the name arrives."
  - id: "85d0d756-db9e-49bd-9661-32fa144188b6"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which example from the introduction best illustrates the principle that practice comes first and naming comes later?"
    options:
      - id: already-built
        text: "Dynamic prompt loading, command-line execution and a status bar, used years before Skill, harness and loop engineering became terms"
      - id: open-source
        text: "Publishing the book as open source so that practitioners can run the experiments and file issues against the companion code repository"
      - id: teaching
        text: "Teaching the same Agent design material at the Turing bootcamp and, from 2024 to 2026, at the University of Chinese Academy of Sciences"
      - id: terminology-note
        text: "Separating reasoning from inference in the terminology note, because the Chinese edition renders them as two distinct words"
    correctOptionIds: [already-built]
    explanation: "already-built is correct: the introduction lists dynamic prompt loading, command-line execution tools and a system status bar as things the author was already using long before Skill, harness and loop engineering became the words the industry used, which is the practice-first claim in its clearest form. open-source and teaching are true statements about the book's history, but they say nothing about who named the practices first. terminology-note is a translation decision, not evidence about the order of practice and naming. Lesson section: the paragraphs on the three buzzwords."
  - id: "2b1aeea9-01d8-491b-96f1-49baed5875d7"
    revision: 1
    status: active
    type: single-choice
    prompt: "Richard Sutton's account of cosmic evolution has four stages. Which four does the introduction use?"
    options:
      - id: designed-by-predecessor
        text: "Dust, stars, life and agents, a sequence in which each later stage is designed by the one before it rather than produced by blind mutation"
      - id: not-tooling
        text: "Molecules, cells, organisms and intelligence, a sequence in which intelligence is the first stage to build tools of its own"
      - id: self-writing
        text: "Dust, stars, life and agents, with agents described as entities that write the code that builds the next Agent"
      - id: artefacts
        text: "Minerals, machines, programmes and minds, a sequence in which programmes are the first artefacts able to improve their own successors"
    correctOptionIds: [self-writing]
    explanation: "self-writing is correct: the introduction gives Sutton's four stages as dust, stars, life and agents, and says that agents are something new because they can generate code and bootstrap themselves, a programmer who writes another programmer who writes the next. designed-by-predecessor keeps the right four stage names but misstates the mechanism, because biological evolution is blind and only the agent stage designs successors. not-tooling invents a different stage list. artefacts invents another one and attributes the self-improvement idea to programmes rather than to agents. Lesson section: the paragraph on Richard Sutton's four stages."
  - id: "976c69dc-5e0f-4958-a414-0024fdafff9d"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction says Anthropic did not invent Skill, harness or loop engineering and then watch the industry adopt them. What does it say happened instead?"
    options:
      - id: named-first
        text: "Anthropic named the practices first and the rest of the industry followed the terminology once the ideas had been labelled"
      - id: industry-distilled
        text: "Leading companies had already built those practices, and Anthropic later distilled them into named principles"
      - id: academic-first
        text: "The concepts came out of academic reinforcement-learning work and were then handed down to the product teams that shipped them"
      - id: no-one-knew
        text: "The practices were unknown to everyone until one company documented them, which is why the book presents them as new"
    correctOptionIds: [industry-distilled]
    explanation: "industry-distilled is correct: the introduction says that a great many Agents were already doing these things and that Anthropic then distilled the practice into named design principles, giving the rule that practice comes first and naming comes later. named-first reverses the direction of travel and makes Anthropic the originator. academic-first mislocates the source, since the introduction grounds the ideas in products and real business rather than in academic work. no-one-knew contradicts the introduction's point that most leading Agent companies had worked out similar methods on their own. Lesson section: the paragraphs on the three buzzwords and on practice arriving before naming."
  - id: "9fbee3c3-5b94-49b2-81f0-3adecbc49de3"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the introduction say about Pine AI that made it a source of the book's design principles?"
    options:
      - id: general-assistant
        text: "It was one of the first general-purpose chat products, which meant its team had to solve conversation quality before anything else"
      - id: open-source-agent
        text: "It published its architecture publicly, so other teams could copy the same harness patterns instead of rediscovering them from scratch"
      - id: many-users
        text: "It served so many users at once that the only way to keep costs down was to make the Agent smaller and faster than its rivals"
      - id: money-and-reliability
        text: "Its long-horizon, money-handling tasks forced reliability work the model alone could not yet do"
    correctOptionIds: [money-and-reliability]
    explanation: "money-and-reliability is correct: the introduction describes Pine as an Agent that autonomously handles sensitive, complex, long-horizon tasks involving money — calling carriers to negotiate bills, handling refunds and complaints, cancelling subscriptions — where a single mistake means real financial loss, and says that this unforgiving demand for reliability is what hammered out the architectural principles. general-assistant misdescribes the product as a chat assistant. open-source-agent and many-users are not claims the introduction makes about Pine. Lesson section: the paragraph introducing Pine AI."
  - id: "af636f2d-6e2e-484d-9440-b6e7b9df6666"
    revision: 1
    status: active
    type: single-choice
    prompt: "The introduction lays out how the book's chapters divide up. Which division does it give?"
    options:
      - id: by-layer
        text: "Chapter 1 the framework, Chapters 2-6 building, Chapters 7-9 evaluation and improvement, Chapter 10 collaboration"
      - id: shifted-build
        text: "Chapter 1 the framework, Chapters 2-5 building, Chapter 6 evaluation, Chapters 7-10 improvement and collaboration"
      - id: flat-halves
        text: "Chapters 1-4 building, Chapters 5-7 evaluation, Chapter 8 improvement, Chapters 9-10 collaboration and shared ground"
      - id: numeric-order
        text: "No thematic grouping at all: the ten chapters are meant to be read strictly in numerical order from the first page to the last"
    correctOptionIds: [by-layer]
    explanation: "by-layer is correct: the introduction says Chapter 1 establishes the foundational framework, Chapters 2 through 6 discuss how to build Agents (context, knowledge, tools, code generation and interaction), Chapters 7 through 9 discuss how to evaluate and continuously improve them, and Chapter 10 broadens the scope to multi-agent collaboration. shifted-build moves the boundary between building and evaluation one chapter earlier than the introduction does. flat-halves invents a different allocation. numeric-order denies the grouping the introduction explicitly states. Lesson section: Book Structure."
  - id: "7dc5fee9-627c-4db7-97bd-a6e3d62b71c3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these chapters does the introduction place in the part of the book about building Agents, rather than about evaluating and evolving them? Select every correct answer."
    options:
      - id: ch2
        text: "Chapter 2, Context Engineering"
      - id: ch6
        text: "Chapter 6, Interaction"
      - id: ch8
        text: "Chapter 8, Model Post-training"
      - id: ch9
        text: "Chapter 9, Continuous Agent Evolution"
    correctOptionIds: [ch2, ch6]
    explanation: "ch2 and ch6 are correct: the introduction says Chapters 2 through 6 discuss how to build Agents, covering context, knowledge, tools, code generation and interaction in sequence, so Context Engineering and Interaction both belong to the building half. ch8 and ch9 are wrong because Chapters 7 through 9 are the evaluation and continuous-improvement part — post-training writes capabilities into parameters and continuous evolution turns operational experience into controlled updates. Lesson section: Book Structure."
  - id: "f8fe748e-85d4-4e7a-83f6-c6ae39a40e6f"
    revision: 1
    status: active
    type: multiple-select
    prompt: "The introduction splits the prerequisites into required and recommended. Which of these does it list as required for reading the whole book? Select every correct answer."
    options:
      - id: python
        text: "Python programming, since almost all the experiments in the book are based on Python"
      - id: ml-basics
        text: "Machine learning basics, including training versus inference, loss functions and gradient descent"
      - id: coding-tool
        text: "An AI-assisted programming tool such as Claude Code, Codex, Cursor or TRAE"
      - id: software-engineering
        text: "General software engineering knowledge, including the command line, Git, JSON and REST APIs"
    correctOptionIds: [python, coding-tool, software-engineering]
    explanation: "python, coding-tool and software-engineering are correct: all three appear under the required heading, with the AI-assisted programming tool justified as a way to feel the ReAct loop, tool calls and context management first-hand. ml-basics is wrong because machine learning basics are listed under recommended, and only for Chapter 8 on post-training. Lesson section: Prerequisites."
  - id: "7ea9bbdc-3821-45fe-98a6-5a343d4cfddd"
    revision: 1
    status: active
    type: true-false
    prompt: "According to the introduction's terminology note, does the book use inference for the model's step-by-step thinking and reasoning for its forward computation at deployment time?"
    answer: false
    explanation: "False — the book uses the two terms the other way round. Reasoning is the model's step-by-step thinking, as in reasoning models, chain-of-thought and reasoning tokens; inference is the model's forward computation at deployment time, as in inference cost, inference stack and inference-time scaling. The note adds that the Chinese edition renders them as two distinct words precisely to keep the two ideas apart, so the swap in the question is not the book's convention. Lesson section: How to Read This Book, the terminology note."
  - id: "5e37a1a8-9f7b-4dac-b604-8553d67708f2"
    revision: 1
    status: active
    type: free-recall
    prompt: "In your own words, state the book's core formula and say what each of its three parts contributes."
    sampleAnswer: "The formula is Agent = LLM + Context + Tools, and the introduction insists that all three are indispensable. The LLM is the brain: it thinks and makes decisions. Context is the eyes: it determines what information the Agent can see, which includes not only the environment and the conversation history but also the tool definitions. Tools are the hands and feet: they determine what the Agent can do. The same three things can be named in the language of reinforcement learning, where they become Policy, Observation Space and Action Space."
    explanation: "A strong answer gives the formula itself, assigns one job to each of the three terms, and says that none of them can be dropped. Naming the brain, eyes and hands-and-feet analogy is a bonus, as is the reinforcement-learning mapping. An answer that lists the three words without saying what each does has only repeated the title, and an answer that drops one of the three has missed the point that all are indispensable. Lesson section: the paragraph introducing the core formula."
  - id: "0c8d35b2-0920-4bb7-b3c2-6eb0b8586634"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain what the introduction means by practice comes first, naming comes later, and what it says a team should do about it."
    sampleAnswer: "The idea is that the techniques now called Skill, harness and loop engineering were already in use at Pine and at many other companies before anyone gave them a name, so waiting for a buzzword to spread means arriving late. The practical advice is two-part: put the Agent to work in a real business whose demands are extreme enough to expose what the model cannot yet do, and build an Evaluation mechanism so that each change can be judged as progress rather than luck. The introduction ties both halves to the claim that good design principles should outlast model iteration cycles."
    explanation: "A strong answer states the principle in the book's own terms, gives the two concrete actions the introduction asks for — a demanding real business and an Evaluation mechanism — and explains why waiting for the name to travel puts a team behind. An answer that only says naming follows practice, without the two actions, has stated the slogan but not the advice. Lesson section: the paragraphs on practice, naming and the two keys."
```

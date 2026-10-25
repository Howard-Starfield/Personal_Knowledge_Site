---
id: "fb2d24ac-aa14-4849-a92a-50db987185e9"
title: "Afterword: Back to Agent = LLM + Context + Tools: Question Bank"
description: "Practice questions for the afterword: the two clouds, the co-evolution of models and Agents, the flywheel, and what the Harness means for the reader."
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

These questions practise [[courses/ai-agents-in-depth/lessons/11-afterword|Afterword: Back to Agent = LLM + Context + Tools]].

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "2e4c26c4-50fc-4e1d-84c6-311a114ecc72"
    revision: 1
    status: active
    type: single-choice
    prompt: "The afterword's first cloud is about how Agents interact with their environment. Which two paths does it name for closing that gap?"
    options:
      - id: two-paths
        text: "Architectural separation of fast and slow, and making inference fast enough that the turn-by-turn wait nearly disappears"
      - id: context-and-tools
        text: "Enlarging the context window, and reducing the number of tools the Agent has to call during a single turn"
      - id: data-and-edge
        text: "Training on more real-time transcripts, and placing the model closer to the user on a low-latency network edge"
      - id: plan-and-stream
        text: "Letting the model plan while the user is still speaking the request, and having it emit partial answers before it has finished thinking"
    correctOptionIds: [two-paths]
    explanation: "two-paths is correct: the afterword names architectural separation of fast and slow — a fast frontend model that keeps the conversational rhythm and a slow backend model that does the deep thinking — and making inference itself faster, which the chip and inference-engine work is advancing, as with MiMo passing 1000 tokens per second for a 1T-parameter model on one 8-GPU node and the Taalas HC1 hardcoding a whole model into a chip. context-and-tools, data-and-edge and plan-and-stream are not the two paths the afterword names. Lesson section: Two Clouds."
  - id: "9aa82902-6ccb-4d97-b5da-2c3329a26616"
    revision: 1
    status: active
    type: single-choice
    prompt: "What is the difference between the two hypotheses the afterword sets against each other?"
    options:
      - id: reversed
        text: "The Small World Hypothesis says a model must keep learning after deployment, while the Big World Hypothesis says one round of training is enough"
      - id: about-size
        text: "The Small World Hypothesis is about the size of the model, while the Big World Hypothesis is about the size of the world the Agent operates in"
      - id: corpus-specifics
        text: "Small World says one training run is enough for general knowledge; Big World says user and company specifics are in no corpus and keep changing"
      - id: open-versus-private
        text: "Small World says models should be trained on open-source code, while Big World says they should be trained on private industry data from partner companies"
    correctOptionIds: [corpus-specifics]
    explanation: "corpus-specifics is correct: the Small World Hypothesis holds that a sufficiently large model already contains almost all the important general knowledge of the physical world and that learning once is enough, which is why the frontier labs go industry by industry distilling each one's professional capability into one large model, whereas the Big World Hypothesis points to knowledge specific to a particular user or company — a company's coding standards, a client's temperament — that is absent from every training corpus and changes constantly. reversed swaps the two, about-size takes the names too literally, and open-versus-private confuses the content of the data with the timing of the learning. Lesson section: Two Clouds."
  - id: "b6f78f2c-d2f1-4683-a7f0-6ea737097330"
    revision: 1
    status: active
    type: single-choice
    prompt: "The afterword says Chapter 1 establishes a three-layer understanding of the formula. Which three layers?"
    options:
      - id: three-layers
        text: "The implementation layer, the intuitive layer and the academic layer"
      - id: engineering-stack
        text: "The engineering layer, the architectural layer and the operational layer"
      - id: book-groups
        text: "The building layer, the evaluation layer and the collaboration layer"
      - id: scale-levels
        text: "The individual layer, the team layer and the organisational layer"
    correctOptionIds: [three-layers]
    explanation: "three-layers is correct: the afterword describes Chapter 1 as establishing a three-layer understanding of Agent = LLM + Context + Tools — the implementation layer, the intuitive layer and the academic layer — and presenting the orchestration spectrum from workflows to autonomous Agents. engineering-stack, book-groups and scale-levels each substitute a different set. Lesson section: the opening paragraph."
  - id: "3e1e314d-570d-493e-97f7-4ed7f9b09203"
    revision: 1
    status: active
    type: single-choice
    prompt: "The afterword answers the question Chapter 1 left hanging — will models eventually eat the Harness? What is its answer, and why does the process never finish?"
    options:
      - id: never
        text: "No, because the Harness will always be needed for the business constraints that can never be written into the weights of a model at all"
      - id: completes
        text: "Yes, and the process will complete within a few model generations, because every constraint can eventually be internalised by the model itself"
      - id: thin-layer
        text: "Yes, but the Harness will survive only as a thin layer that handles the last small percent of the behaviour that actually matters in production"
      - id: layer-by-layer
        text: "Yes, but layer by layer and never completely, because training is slow and every new frontier is where the model is least reliable"
    correctOptionIds: [layer-by-layer]
    explanation: "layer-by-layer is correct: every capability a model stably internalises lets the corresponding Harness layer be deleted, but the process never completes, because training takes months while the business cannot wait, because a model cannot internalise every constraint and preference of real business and there is always a newest boundary needing external logic, and because every generation opens a new capability frontier which is exactly where the model is least reliable. never, completes and thin-layer each contradict the afterword's own position. Lesson section: The Co-Evolution of Models and Agents."
  - id: "5bdfdfe2-0f36-4f04-8a99-53854758af31"
    revision: 1
    status: active
    type: single-choice
    prompt: "What does the afterword say the flywheel consists of?"
    options:
      - id: flywheel
        text: "Users pose real challenges, the application layer patches the model's gaps, and those patches become training signals for the next model iteration"
      - id: abstraction-chain
        text: "The model releases new capabilities, the framework absorbs them, and the framework's abstractions become the interface the next model is trained against"
      - id: research-cycle
        text: "Research produces a model, evaluation scores it, and the score is fed back as a reward that produces the next research iteration"
      - id: rewrite-each-release
        text: "Each new model makes the previous harness obsolete, so the application layer has to rewrite itself for every release of the model"
    correctOptionIds: [flywheel]
    explanation: "flywheel is correct: users pose real challenges, the application layer uses harnesses to patch over what the model cannot yet do well, and those patches in turn become training signals for the model's next iteration, and the reason the models can internalise the constraints is precisely that the Agents have already stumbled through those pits in real business. abstraction-chain, research-cycle and rewrite-each-release each describe something the chapter does not claim. Lesson section: The Co-Evolution of Models and Agents."
  - id: "bf3e38ce-8eba-46e8-af75-12c77b0f08d1"
    revision: 1
    status: active
    type: single-choice
    prompt: "In the experiment the afterword reports from Anthropic's work on Claude Code, what was changed and what happened?"
    options:
      - id: model-upgraded
        text: "The model was upgraded to a larger one of the same family, and the task accuracy rose from 52.8 to 66.5 percent"
      - id: tools-enlarged
        text: "The tool set was enlarged with more granular operations, and the task accuracy rose from 52.8 to 66.5 percent"
      - id: harness-only
        text: "Nothing but the harness was changed, with the same model, and task accuracy rose from 52.8 to 66.5 percent"
      - id: prompts-and-harness
        text: "The prompts and the harness were both rewritten for the new domain, and the task accuracy rose from 52.8 to 66.5 percent"
    correctOptionIds: [harness-only]
    explanation: "harness-only is correct: the experiment changed nothing but the harness, with the same model, and task accuracy went from 52.8 to 66.5 percent. The afterword reads it two ways at once — it shows how much leverage the harness has today, and it reminds us that the harness has that much leverage precisely because the model has not got there yet. model-upgraded, tools-enlarged and prompts-and-harness each misdescribe what was varied. Lesson section: The Co-Evolution of Models and Agents."
  - id: "29bf61bf-ed47-400e-b658-d09dc89b764a"
    revision: 1
    status: active
    type: single-choice
    prompt: "The afterword says three questions will not become obsolete. Which three?"
    options:
      - id: stack
        text: "Which model to buy, which framework to use, and which leaderboard to watch this quarter"
      - id: three-questions
        text: "What it sees, what it can do, and how to verify that it is doing things right"
      - id: budget
        text: "How much context to buy, how many tools to expose, and how long a trajectory to allow per task"
      - id: division-of-labour
        text: "Which capability the model has already internalised, which the harness still patches, and who maintains the harness"
    correctOptionIds: [three-questions]
    explanation: "three-questions is correct: the afterword says the three questions — what the Agent sees, what it can do, and how to verify it is doing things right — describe not the usage of a particular model but the fundamental way an intelligent system interacts with the world, so they survive every turn-over of specific APIs, products and leaderboards, and mastering them lets you place whatever the next generation of models brings. stack, budget and division-of-labour each name things the afterword explicitly treats as transient. Lesson section: the final paragraph."
  - id: "497e88ad-6a5f-4317-be86-e2e8c177af80"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the afterword list among the moats that usually last at the application layer? Select every correct answer."
    options:
      - id: exclusive-data
        text: "Exclusive data"
      - id: distribution
        text: "Solid distribution channels"
      - id: user-trust
        text: "User trust"
      - id: api-surface
        text: "A framework-specific API surface that competitors would have to reimplement to match"
    correctOptionIds: [exclusive-data, distribution, user-trust]
    explanation: "exclusive-data, distribution and user-trust are correct: the afterword says the truly lasting moats at the application layer usually lie outside technology, naming exclusive data, solid distribution channels, user trust, network effects, and the physical-world scenarios that require humans and Agents to work together. api-surface is wrong, because specific APIs, products and leaderboards all turn over as models iterate every few months. Lesson section: The Co-Evolution of Models and Agents, and the final paragraph."
  - id: "6a59736b-ef88-41f9-ae68-16bf339deee0"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which of these does the afterword list among the three groups the book divides its chapters into? Select every correct answer."
    options:
      - id: building
        text: "Building Agents, covering Chapters 2 to 6"
      - id: evaluation-evolution
        text: "Evaluation and Evolution, covering Chapters 7 to 9"
      - id: collaboration
        text: "Collaboration, covering Chapter 10"
      - id: interaction-automation
        text: "Interaction and Automation, covering the chapters that sit between the building and the evaluation material"
    correctOptionIds: [building, evaluation-evolution, collaboration]
    explanation: "building, evaluation-evolution and collaboration are correct: the afterword groups the book as Building — context engineering, memory and knowledge bases, tools, code generation and interaction — then Evaluation and Evolution, then Collaboration. interaction-automation is not one of the three; interaction sits inside the building group. Lesson section: the opening paragraph."
  - id: "ddd08316-b2f5-4e5a-b451-3669dde29b47"
    revision: 1
    status: active
    type: true-false
    prompt: "The afterword reports that Xiaomi's MiMo has pushed a 1T-parameter model past 1000 tokens per second on a single 8-GPU node, while the Taalas HC1 hardcodes a whole model into a chip and reaches about 17000 tokens per second with a response time under 100 milliseconds. Are those the figures the afterword gives?"
    answer: true
    explanation: "True — those are the figures the afterword gives for the second path towards real-time capability, making inference itself fast enough that the turn-by-turn wait nearly disappears. It also notes the trade-off of the hardcoded chip, which can run only the model it was built for, so that a model update requires a new chip tape-out. Lesson section: Two Clouds, and the footnote on the Taalas HC1."
  - id: "d2d59aa3-d981-40e4-9156-66fa8c230a1d"
    revision: 1
    status: active
    type: free-recall
    prompt: "Name the afterword's two clouds and say what each one is about, and which direction the afterword thinks each is heading."
    sampleAnswer: "The first cloud is how Agents can interact with their environment in a streaming, real-time way: today most Agents still work turn by turn, while the real world does not wait. A living Agent would listen while thinking, speak while thinking, and notice on its own that a message needs handling; the afterword sees two paths towards that, architectural separation of fast and slow, and making inference itself fast enough that the wait nearly disappears. The second cloud is how Agents can keep accumulating experience, so that they are not a genius with a superb memory who cannot learn anything new; the Small World and Big World hypotheses set out whether that matters, and the answer is that the strongest capability will ultimately be learning and adaptation rather than memorisation."
    explanation: "A strong answer names both clouds, describes the gap each one names, and shows that the afterword's position is that the second cloud is the one the book's own machinery of memory and continuous evolution is aimed at. An answer that names the two clouds without explaining the hypotheses has only given the labels. Lesson section: Two Clouds."
  - id: "bbb99389-15f8-4788-b0ea-1333eace876d"
    revision: 1
    status: active
    type: free-recall
    prompt: "The afterword says the flywheel spins fastest in the hands of those who hold both ends. Explain what that means for someone building models and for someone building applications on top of models."
    sampleAnswer: "Holding both ends means letting your own model and your own harness feed each other and co-evolve: the model knows how the harness will call it, the harness knows where the model's boundaries lie, and every change on either end feeds back to the other immediately. For someone building models, the moat is to get that flywheel spinning, by letting feedback from real-world scenarios flow back into training as fast as possible. For someone building applications on top of models, the harness is the sharpest short-term lever, but each time the model internalises a layer of constraints it wipes out a batch of advantages built on the harness alone, so the prudent play is to use the harness to buy time and build barriers beyond technology."
    explanation: "A strong answer gives both sides of the advice and keeps them distinct: the model builder's job is to close the feedback loop into training, while the application builder's job is to use the harness for the time it buys and to build barriers that outlive the current model generation. An answer that says only that the harness is currently powerful has missed the warning about internalisation wiping out harness-only advantages. Lesson section: The Co-Evolution of Models and Agents."
```

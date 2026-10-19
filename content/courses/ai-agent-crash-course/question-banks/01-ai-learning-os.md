---
id: "144f2ece-2830-4aa2-bad3-c258fd6a1fb2"
title: "Build Your AI Learning Operating System Question Bank"
description: "Practice questions for Build Your AI Learning Operating System."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

This bank holds the practice questions for the AI Learning Operating System lesson; the answer key is visible because it is a learning aid.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "a16c4314-c78f-484a-b542-bbd10b1bf2ce"
    revision: 1
    status: active
    type: single-choice
    prompt: "A teammate clones your repo and cannot tell which settings the scripts need. Which committed file solves this without exposing any secret?"
    options:
      - id: real-env
        text: "Your real .env file with the working keys filled in"
      - id: env-example
        text: "A .env.example file listing key names with blank values"
      - id: readme-keys
        text: "A README section that pastes your working keys for the team"
      - id: gitignore-keys
        text: "A .gitignore file with each key name written inside it"
    correctOptionIds: [env-example]
    explanation: "A .env.example file documents which variables exist while holding no real values, so it is safe to commit. Committing the real .env or pasting keys into a README publishes the secrets, and .gitignore only controls what Git tracks, not what a teammate must configure."
  - id: "7e6e8616-ce42-4c2a-a34f-900a16e0ce27"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your RAG project needs one version of a library and your fine-tuning notebook needs a conflicting version. What keeps them from breaking each other?"
    options:
      - id: global-pin
        text: "Pin both versions inside one shared global Python install"
      - id: newest-all
        text: "Upgrade every library in every project to the newest release"
      - id: own-venv
        text: "Give each project its own isolated virtual environment"
      - id: copy-files
        text: "Copy the older library files into the newer project folder"
    correctOptionIds: [own-venv]
    explanation: "A virtual environment seals one project's dependencies away from every other project, so conflicting versions can coexist. A single global install can only hold one version of a package at a time, so pinning both there cannot work."
  - id: "06ac6bc9-c947-4ddc-b9b5-31cacd67b869"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your script posts to http://localhost:11434 and fails with connection refused. What is the most likely cause?"
    options:
      - id: ollama-stopped
        text: "The Ollama app or service is not running right now"
      - id: missing-key
        text: "The .env file is missing a hosted API key value"
      - id: venv-inactive
        text: "The Python virtual environment was not activated first"
      - id: no-commits
        text: "The Git repository does not have any commits yet"
    correctOptionIds: [ollama-stopped]
    explanation: "Port 11434 is where Ollama serves its local HTTP API, so a refused connection means nothing is listening there, usually because Ollama has not been started. A missing hosted key would produce an authentication error from a hosted service, and neither the virtual environment nor Git history affects a local port."
  - id: "c9a6478d-778c-455d-98d3-31094baebb5d"
    revision: 1
    status: active
    type: single-choice
    prompt: "You built your own 4-bit GGUF file that Ollama does not package, and you want to run it directly with fine control. Which tool fits best?"
    options:
      - id: ollama-closest
        text: "ollama run with the nearest model from its library"
      - id: hosted-upload
        text: "A hosted API, pasting the whole file contents into a prompt box"
      - id: uv-run
        text: "uv, because it installs and serves any model file"
      - id: llama-cpp
        text: "llama.cpp, running llama-cli with the path to the file"
    correctOptionIds: [llama-cpp]
    explanation: "llama.cpp is the lower-level engine for running any GGUF file directly, which is the escape hatch for custom quantizations. Ollama is the friendlier layer for models it packages, and uv manages Python environments, not model inference."
  - id: "0e3910e0-ed67-430a-a484-4f383345059c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A friend pushed a repo to GitHub with an API key hard-coded in config.py. What is the first action they should take?"
    options:
      - id: delete-file
        text: "Delete config.py and push one more new commit"
      - id: rotate-key
        text: "Rotate the key, treating it as already exposed"
      - id: ignore-file
        text: "Add config.py to the .gitignore file from now on"
      - id: go-private
        text: "Make the repository private and keep using the key"
    correctOptionIds: [rotate-key]
    explanation: "Once a key has touched a tracked and pushed file, it must be treated as burned, so the first move is to rotate it. Deleting the file or ignoring it later leaves the key in Git history, and a private repository does not undo the exposure that already happened."
  - id: "adb43fe0-5942-4246-8fd6-2251923ee98a"
    revision: 1
    status: active
    type: single-choice
    prompt: "You wrote a memory card on Monday and follow the standard review schedule. How should you handle the +3 review?"
    options:
      - id: tuesday-reread
        text: "On Tuesday, rereading the card to confirm it"
      - id: wednesday-copy
        text: "On Wednesday, copying the card into a new file"
      - id: friday-score
        text: "On Friday, scoring the card before trying to answer it"
      - id: thursday-cold
        text: "On Thursday, answering cold, then self-scoring it"
    correctOptionIds: [thursday-cold]
    explanation: "Three days after Monday is Thursday, and each review starts by trying to answer without looking, then checking the card and scoring yourself. Tuesday is the +1 review, and rereading without first attempting recall feels productive but trains recognition rather than retrieval."
  - id: "d99f6789-6a8e-4189-88c1-0a4ecbf3d55e"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which resume bullet best follows the formula of a system, its tools, a business problem, and a trust or safety feature?"
    options:
      - id: vague-learner
        text: "Learned a great deal about AI and enjoyed working with local language models during a self-paced study project"
      - id: tool-list
        text: "Used Python, Git, and Ollama across many small experiments to explore what current language models can do"
      - id: full-formula
        text: "Built a support assistant using Python and Ollama to answer customer questions, including citation checks on every reply"
      - id: hype
        text: "Created a fast and powerful chatbot that works really well and impressed everyone who tried it on the team"
    correctOptionIds: [full-formula]
    explanation: "The strong bullet names a system, its tools, a business problem, and a trust feature that can be demonstrated. A list of tools or a feeling about learning has no problem or evidence, and praise like fast and powerful cannot be verified."
  - id: "632ef436-816a-47f0-8eee-74b20396e1c6"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which entries belong in .gitignore for this learning lab? Select every correct answer."
    options:
      - id: dot-env
        text: ".env, which holds your real keys"
      - id: venv-dir
        text: ".venv/, the local virtual environment folder"
      - id: gguf-files
        text: "*.gguf, the large model weight files"
      - id: env-example
        text: ".env.example, the blank key template"
      - id: lockfile
        text: "uv.lock, the pinned dependency record"
    correctOptionIds: [dot-env, venv-dir, gguf-files]
    explanation: "Secrets, rebuildable environments, and large model weights stay out of Git. The .env.example template and the lockfile must be committed, because they let someone else reproduce your setup."
  - id: "b45db5af-244e-4479-8faa-2a29f85c7670"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which are good reasons to prefer a local Ollama model over a hosted API during early development? Select every correct answer."
    options:
      - id: free-loops
        text: "Repeated prompt experiments add no per-token charges"
      - id: private-data
        text: "Sensitive test data stays on your own machine"
      - id: offline-work
        text: "You can keep working without an internet connection"
      - id: top-quality
        text: "A small local model always matches hosted quality"
      - id: long-context
        text: "Local models always handle the longest documents"
    correctOptionIds: [free-loops, private-data, offline-work]
    explanation: "Local models are free at the margin, keep prompts on your hardware, and work offline, which suits dev loops and evals. Production quality, very long context, and similar strengths are reasons to move to a hosted model when an eval shows it wins."
  - id: "19675197-ecd4-48f3-8a9e-725108e1cd0f"
    revision: 1
    status: active
    type: true-false
    prompt: "Adding .env to .gitignore stops Git from tracking a .env file that was already committed earlier."
    answer: false
    explanation: "A .gitignore entry only affects files Git is not yet tracking. A file already committed stays tracked until you run git rm --cached .env and commit, and any key that appeared in history should be rotated."
  - id: "eb5d9370-030d-4b7d-8982-c8c78a7758b3"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: why does a single organized folder, a Git repo, an isolated Python environment, a protected .env file, a local model, and a memory-card routine together make your AI learning reproducible, safe, and provable?"
    sampleAnswer: "The organized folder and Git history make every experiment findable and repeatable, and the isolated environment with a lockfile means someone else can rebuild it. Keeping keys in a gitignored .env protects secrets, while a local model gives a free fallback for experiments. Memory cards with spaced review make the knowledge stick, and saved artifacts like screenshots, READMEs, and resume bullets provide evidence that I built something."
    explanation: "A strong answer links each habit to its payoff: reproducibility from structure, Git, and environments; safety from secret handling; retention from spaced review; and proof from saved artifacts."
  - id: "896adb0d-78f0-42aa-bea1-0c17ae9d476c"
    revision: 1
    status: active
    type: free-recall
    prompt: "A recruiter asks, You have no formal AI work experience, so how do you prove you can build AI systems? Describe what you would show and why."
    sampleAnswer: "I would show evidence instead of claims: a public repo per project with a README, an architecture sketch, a small eval set with pass and fail numbers, and screenshots of the working demo. I would add a short case study of the business problem and what I measured, plus reproducibility signals like a lockfile and a .env.example."
    explanation: "The point is that artifacts a stranger can inspect are stronger than statements about skill. Mentioning reproducibility and measured results shows engineering discipline."
```

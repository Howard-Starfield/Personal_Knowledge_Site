---
id: "8b950a52-f7a2-489f-b666-039a89ce7997"
title: "Build Your AI Learning Operating System"
description: "Set up a reproducible workspace, safe secret handling, local models, and a spaced-review habit so every AI project becomes evidence."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 1
estimatedMinutes: 60
---

## Why this matters

You can read a hundred articles about AI and still have nothing to show for it. The people who get hired for AI work usually have a working environment, a trail of evidence, and a study routine that survives a busy week. Without these, code ends up scattered across a Downloads folder, you forget which model produced which result, and an API key can leak into a public repository. This lesson builds the foundation that every later lesson in the course assumes.

## What you'll be able to do

- Explain why each part of the setup (folder layout, Git, virtual environment, `.env`, local model) exists.
- Build a project folder with a `.gitignore` that keeps secrets and large files out of Git.
- Decide whether Ollama or llama.cpp is the right tool for a given local-model task.
- Diagnose a leaked or mis-tracked secret and choose the correct repair.
- Schedule memory-card reviews and turn a project into a resume bullet.

## Before you start

This is the first lesson, so these prompts check what you already know from daily AI use.

- What is the difference between running a model on your own computer and calling one through a hosted service?
- Why might the same prompt give different answers on different days or with different models?
- What does it mean for an experiment to be "reproducible"?

## Step 1 — Create a workspace and put it under Git

**In plain language.** Before building anything, give your work one home. Think of a workshop: every tool has a labeled spot, so you never spend ten minutes hunting for a screwdriver. Git is the time machine for that workshop, because every commit is a save point you can return to.

**The rule.** Keep one root folder (the course uses `ai-crash-course/`) with a fixed set of subfolders, and track it with Git. Each subfolder has one job:

- `chapters/` holds written notes.
- `labs/` holds throwaway experiments.
- `projects/` holds things you would show someone.
- `evals/` holds test sets that prove a system works.
- `datasets/` holds inputs, with their sources cited.
- `memory-cards/` holds study notes.
- `resume-artifacts/` holds your evidence.
- `screenshots/` holds curated demo images.

Git should track code, prompts, eval data, and documentation. It should not track secrets, model weights, or rebuildable environments, and a `.gitignore` file lists those paths.

**Worked example.** From a Git Bash terminal:

```bash
cd ~
mkdir -p ai-crash-course/{chapters,labs,projects,evals,datasets,memory-cards,resume-artifacts,screenshots}
cd ai-crash-course
git init
```

Then create `.gitignore` containing at least these lines, and make your first commit:

```text
.env
.env.*
!.env.example
.venv/
__pycache__/
*.gguf
*.safetensors
models/
```

The line `!.env.example` is an exception: it re-allows the blank template file even though `.env.*` would otherwise match it. Run `ls` to confirm all eight subfolders exist, then `git add .` and `git commit -m "bootstrap workspace"`.

> [!warning] Common mistake
> Believing that adding `.env` to `.gitignore` protects a file you already committed. Git ignores only files it is not yet tracking. If `.env` shows up in `git status` as tracked, fix `.gitignore`, run `git rm --cached .env`, commit, and treat any key that appeared in history as exposed.

## Step 2 — Isolate Python and protect your secrets

**In plain language.** A virtual environment is a sealed bin for one project's parts, so the bolts from project A never rattle around with the screws from project B. A `.env` file is a locked drawer for API keys: if you leave keys on the workbench, anything walking past can take them.

**The rules.**

- A virtual environment isolates one project's dependencies from every other project. Use one for every Python project.
- Secrets live in a gitignored `.env` file and are loaded at runtime. A committed `.env.example` lists the variable names with blank values.
- In production, real keys should come from a secrets manager or the platform, not from a `.env` file.
- A lockfile (`uv.lock` or `requirements.txt`) is committed so someone else can rebuild the same environment.

**Worked example.** With `uv`, a fast Python package and environment manager:

```bash
uv init --name ai-crash-course --python 3.12
uv add python-dotenv requests httpx pydantic
uv run python -c "import sys; print(sys.version)"
```

`uv init` creates `pyproject.toml` and a starter `main.py`, `uv add` creates the `.venv/` and `uv.lock` and records dependencies, and `uv run` executes inside the environment without manual activation. If you would rather not install `uv`, the built-in route works too:

```bash
python -m venv .venv
source .venv/Scripts/activate
pip install python-dotenv requests httpx pydantic
```

Now create the template and your private copy:

```bash
cat > .env.example <<'EOF'
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
OLLAMA_HOST=http://localhost:11434
EOF
cp .env.example .env
```

Load it from Python and check that a key is set without printing it:

```python
from dotenv import load_dotenv
import os

load_dotenv()
print("OLLAMA_HOST =", os.getenv("OLLAMA_HOST"))
print("OpenAI key set?", bool(os.getenv("OPENAI_API_KEY")))
```

Commit only `.env.example`, then run `git status` to confirm `.env` is not staged.

> [!warning] Common mistake
> Committing a key once, deleting it in the next commit, and assuming it is safe. The key remains in Git history, so rotate it. Rewriting history with a tool such as `git filter-repo` is an extra step, not a substitute for rotation.

```knowledge-quiz
schemaVersion: 1
quizId: "2cf30fff-b845-474a-9953-6f1e0c2a4d71"
title: "Checkpoint: workspace, environments, and secrets"
questionBankId: "144f2ece-2830-4aa2-bad3-c258fd6a1fb2"
questionIds:
  - "a16c4314-c78f-484a-b542-bbd10b1bf2ce"
  - "7e6e8616-ce42-4c2a-a34f-900a16e0ce27"
```

## Step 3 — Run models locally with Ollama and llama.cpp

**In plain language.** A local model runs on your own hardware, so there are no per-token charges and your prompts stay on your machine. Ollama is a small friendly oven: one command and you are cooking. llama.cpp is the same kind of oven with the cover off: more knobs, more responsibility.

**The rules.**

- A local LLM runtime loads model weights and serves them through a chat interface or an API.
- GGUF is the quantized model file format used by llama.cpp and the tools built on it; one `.gguf` file is the whole model.
- Quantization stores weights at lower precision (for example 4-bit) so the model fits in less RAM, at a small cost in quality.
- Ollama serves an HTTP API on `http://localhost:11434`. Use Ollama for most work, and reach for llama.cpp when you need control over quantization or sampling, or must run a GGUF that Ollama does not package.
- Local models suit dev loops, evals, prompt iteration, private data, and offline work. Move to a hosted model when an eval shows it meaningfully wins on quality, context length, tools, or multimodal needs.

**Worked example.** After installing Ollama from its official site:

```bash
ollama --version
ollama pull llama3.2:3b
ollama run llama3.2:3b "In one sentence, what is retrieval-augmented generation?"
```

The pull is a download of roughly 2 GB, and if it stalls you can run it again. Then test the HTTP API, which is how later lessons will call the model:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.2:3b",
  "prompt": "Say hello in exactly five words.",
  "stream": false
}'
```

You should get JSON back with a `response` field. If curl reports "connection refused", Ollama is not running, so start it from the Start menu or check the tray icon. If generation crawls at about one token per second, you are likely out of RAM, so try a smaller model.

For llama.cpp, download a prebuilt release for your hardware from its official releases page, add it to your PATH, and check it with `llama-cli --version`. To test it, run `llama-cli -m path/to/model.gguf -p "Hello," -n 32` against a small GGUF you trust.

> [!warning] Common mistake
> Treating Ollama and llama.cpp as competitors. They come from the same lineage, and Ollama is the friendlier layer on top. Pick Ollama for productivity and llama.cpp for control.

```knowledge-quiz
schemaVersion: 1
quizId: "08c354e7-da6b-4916-91e9-22d343f9fa6b"
title: "Checkpoint: local models"
questionBankId: "144f2ece-2830-4aa2-bad3-c258fd6a1fb2"
questionIds:
  - "06ac6bc9-c947-4ddc-b9b5-31cacd67b869"
  - "c9a6478d-778c-455d-98d3-31094baebb5d"
```

## Step 4 — Install the study system and turn projects into evidence

**In plain language.** Memory cards and self-scoring are your apprentice's notebook: write down what you learned, then test yourself a day later, three days later, a week later. That is how knowledge sticks. Resume artifacts are photographs of the finished furniture; no furniture means nothing to show.

**The rules.**

- After each chapter, write 3 to 7 memory cards in `memory-cards/`. Each card is a short question and answer, with an example and a common mistake.
- After each drill, self-score from 0 to 3. A concept counts as learned only after you reach a score of 2 on two different days.
- Review on the spaced schedule: same day, then +1, +3, +7, +14, and +30 days.
- Each review starts with an attempt to answer cold; you check the card afterward.
- Every project earns one resume bullet in the form: Built (system) using (tools or architecture) to solve (business problem), including (a trust, safety, or eval feature). Back it with evidence: a repo link, a README, a screenshot, an eval number.

**Worked example.** You write a memory card on Monday. Your review dates are Monday (the card itself), Tuesday, Thursday, the following Monday, then two weeks out, then about a month (30 days) out. On Thursday you cover the card, answer from memory, uncover it, and score yourself. If you score below 2, add a clarifying note to the card and review again tomorrow.

A bullet for this lesson could read: "Built a reproducible local AI lab using Python, Git, `.env`-managed secrets, and Ollama, including a gitignore policy that keeps keys and model weights out of version control." Save it in `resume-artifacts/` with a screenshot of your first local model reply.

> [!warning] Common mistake
> Rereading a card instead of recalling it. Rereading feels productive but builds recognition, while trying to answer first is what strengthens memory.

```knowledge-quiz
schemaVersion: 1
quizId: "f0e59f62-1122-415f-9742-92c42e725286"
title: "Checkpoint: study system and evidence"
questionBankId: "144f2ece-2830-4aa2-bad3-c258fd6a1fb2"
questionIds:
  - "adb43fe0-5942-4246-8fd6-2251923ee98a"
  - "d99f6789-6a8e-4189-88c1-0a4ecbf3d55e"
```

## Try it

Build the minimum viable lab from scratch and prove it works.

1. Create the eight-folder workspace and run `git init`.
2. Write a `.gitignore` that excludes `.env`, `.venv/`, and `*.gguf` but keeps `.env.example`.
3. Create `.env.example` with three blank key names, copy it to `.env`, and add a fake value to `.env`.
4. Run `git status` and confirm that `.env` is not listed as a file to commit.
5. Write one memory card in `memory-cards/00_local_ai_lab.md` answering: what problem does this structure solve?

> [!example]- Sample solution
>
> ```bash
> mkdir -p ai-crash-course/{chapters,labs,projects,evals,datasets,memory-cards,resume-artifacts,screenshots}
> cd ai-crash-course && git init
> printf '.env\n.env.*\n!.env.example\n.venv/\n*.gguf\n' > .gitignore
> printf 'OPENAI_API_KEY=\nANTHROPIC_API_KEY=\nGEMINI_API_KEY=\n' > .env.example
> cp .env.example .env
> echo 'OPENAI_API_KEY=fake-value-for-testing' > .env
> git status
> ```
>
> In the output, `.gitignore` and `.env.example` appear as untracked files you can commit, while `.env` is absent. If `.env` appears, the `.gitignore` is wrong or the file was committed earlier. The memory card should say that the structure makes experiments reproducible, secrets protected, projects portable, and artifacts findable.

## Key takeaways

- One organized folder under Git makes experiments repeatable and your work findable.
- A `.gitignore` only affects untracked files; a leaked key must be rotated, not just deleted.
- Give every project its own virtual environment, and commit a lockfile and `.env.example` but never `.env`.
- Ollama is the easy default for local models; llama.cpp is the lower-level option for GGUF files and fine control.
- Learning sticks through spaced recall (same day, +1, +3, +7, +14, +30) and self-scoring, not rereading.
- Every project should end with evidence: a README, a screenshot, and a formula-shaped resume bullet.

## Explain it back

In your own words, explain why a single organized folder, a Git repo, an isolated Python environment, a protected `.env` file, a local model, and a memory-card routine together make your AI learning reproducible, safe, and provable.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "800349aa-7509-4a63-b673-c434106b509a"
title: "Chapter quiz: AI learning operating system"
questionBankId: "144f2ece-2830-4aa2-bad3-c258fd6a1fb2"
questionIds:
  - "0e3910e0-ed67-430a-a484-4f383345059c"
  - "632ef436-816a-47f0-8eee-74b20396e1c6"
  - "b45db5af-244e-4479-8faa-2a29f85c7670"
  - "19675197-ecd4-48f3-8a9e-725108e1cd0f"
  - "eb5d9370-030d-4b7d-8982-c8c78a7758b3"
  - "896adb0d-78f0-42aa-bea1-0c17ae9d476c"
```

Next: [[courses/ai-agent-crash-course/lessons/02-ai-llm-fundamentals|Next lesson]]

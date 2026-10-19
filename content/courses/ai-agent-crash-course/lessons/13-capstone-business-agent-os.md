---
id: "2e619dee-9d49-41f3-8691-81e2d82b5637"
title: "Capstone: Build the Business Agent OS"
description: "Integrate retrieval, memory, agents, guardrails and a control plane into one traceable, approval-gated service you can demo and sell."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 13
estimatedMinutes: 60
---

## Why this matters

Eleven chapters of separate notebooks are almost invisible to a recruiter who spends ninety seconds on your repository. One integrated system with a diagram, a demo and a one-line pitch is not. Integration also tells you whether you truly understood the parts: the bugs that appear when memory, agents and guardrails share one process are the real lessons. And a small business pays for the moments your agent refused to act, not for yet another document chatbot.

## What you'll be able to do

- Explain why integration bugs live at seams and list the seams in a document-to-answer pipeline.
- Build a request lifecycle in which one request id ties every log row together.
- Decide which agent actions must wait in an approval queue and which do not.
- Diagnose common integration failures such as raw JSON in an HTMX swap or a 404 from the local fallback model.
- Package the system as a demo, case study and README that make the work legible to non-engineers.

## Before you start

Answer these from memory before reading on.

1. Why should every external action an agent proposes be treated differently from a read-only lookup?
2. What does an audit log record, and why must it be append-only?
3. How does a memory write policy decide whether a candidate memory is stored?

[[courses/ai-agent-crash-course/lessons/12-one-person-ai-company|Previous lesson]]

## Step 1 — Treat the capstone as contract fixing

**In plain language.** Until now each chapter was tested alone. The capstone puts them in one building, and the doors between rooms are where things break.

**Analogy.** Imagine hiring a librarian, a researcher, a note-taker, an assistant and a guard in separate offices. Each does a fine job alone. On the first day in one building, you find the librarian labels books with long codes while the note-taker writes down short numbers, so nobody can find anything.

**The rule.** A seam is a boundary where data crosses between components. Write a one-page `docs/SEAMS.md` before adding new code, and put shared types in one file (`core/types.py`) that every module imports. The chapter lists roughly nine seams, including:

1. the chunk id from the chunker must equal the chunk id stored in memory provenance;
2. a tool's name must match the key in the permission scope map;
3. the request id must reach every module;
4. an eval report's case id must match the golden set's case id.

**Worked example.** Chapter 3's chunker emitted UUID chunk ids. Chapter 5's memory assumed sequential integers. Neither failed in isolation. After wiring them together, a memory citation pointed at a chunk that did not exist. Writing `SEAMS.md` first would have shown the mismatch in minutes. The fix: define `Chunk.id` once in `core/types.py` as a string and add a property test that chunker output and retriever output use identical ids.

> [!warning] Common mistake
> Treating the capstone as a code-arrangement exercise (moving imports around) instead of a contract-fixing exercise. Spend your first hour on the seams list, not on refactoring folders.

## Step 2 — Trace one request end to end

**In plain language.** A user question passes through a fixed series of checks. Every one of them should leave a row in the same log, tagged with the same id.

**Analogy.** A parcel with one tracking number that every depot scans. You can reconstruct its whole journey from that single number.

**The rule.** The request lifecycle in this chapter runs in this order:

1. input guard (length, naive injection patterns, PII);
2. retrieval, then memory selection;
3. context composer, which builds the prompt and a source manifest;
4. model router;
5. output guard (groundedness, leaks);
6. memory write proposal and agent action proposal, both queued;
7. audit log entry for each stage.

The `request_id` is generated once per HTTP request and carried in a Python context variable, so modules read it at log time instead of receiving it as an argument. `ContextVar.set()` returns a token, and `reset(token)` restores the previous value. asyncio tasks copy the current context when created, but a thread you start yourself may not see the value unless you pass the context along. The audit log is deliberately boring: a table with `(ts, request_id, actor, action, payload_json, result_json)` plus a line-by-line JSONL mirror that survives database corruption.

**Worked example.** The chapter defines helpers in `core/request_context.py`:

```python
import contextvars, uuid
from contextlib import contextmanager

_current_request_id = contextvars.ContextVar("request_id", default="")

def make_request_id() -> str:
    return f"r_{uuid.uuid4().hex[:12]}"

def get_request_id() -> str:
    return _current_request_id.get()

@contextmanager
def set_request_id(rid: str):
    token = _current_request_id.set(rid)
    try:
        yield rid
    finally:
        _current_request_id.reset(token)
```

The integration test runs one question inside `set_request_id(rid)`, then fetches audit entries for that id and asserts the set of actions includes `input_check`, `retrieve`, `compose`, `model_call`, `output_check`, `memory_proposal` and `agent_proposal`. If any stage is missing, that code path was never wrapped. Add an index on `request_id` in the audit table, or the dashboard becomes slow in production.

> [!warning] Common mistake
> Letting each module log to its own file or table. At incident time you cannot join the story together, which defeats the purpose of an audit log.

```knowledge-quiz
schemaVersion: 1
quizId: "f197fb65-3afc-4d87-90f8-4b0a8e740bb8"
title: "Checkpoint: seams and tracing"
questionBankId: "0f0a8868-41fb-4fec-819f-1f7152c0a50d"
questionIds:
  - "27d50336-9e6e-44b2-83b6-32e2c9d67139"
  - "67abe793-2581-4cf7-80ea-4ec911baf4aa"
```

## Step 3 — Build the MVP around an approval queue

**In plain language.** The smallest credible product answers from documents with citations and refuses to act on its own. Anything that leaves the building waits for a human.

**Analogy.** A new hire who drafts every outgoing email and puts it in your tray. You read it, sign it, and only then does it go out.

**The rule.** The MVP is a four-hour build:

1. Hour 1: folder skeleton and a `/health` endpoint.
2. Hour 2: one `POST /ask` route through retrieval, composer, model and output guard, answering "What is our refund policy for digital goods?" with a citation.
3. Hour 3: input and output guards plus an approval queue table, with the agent proposing one action (a follow-up email) that is queued, not executed.
4. Hour 4: the audit log and an HTMX dashboard showing the last 50 entries, the pending queue, and approve or reject buttons.

An approval queue is allow-with-friction: a data table of proposed actions in a pending state until a human approves or rejects them. Put every external action behind it (emails, deletes, payments, public posts) with no exceptions for "trusted" tools. Read-only retrieval does not need gating, but it is still logged. A tool with no declared permission scope refuses to run.

**Worked example.** A user asks the agent to email a customer. The agent writes the proposed message, recipient and cost into the queue, and the audit log records `agent_proposal`. On the dashboard you click approve, the sandboxed runner performs the simulated send, and a second audit entry records the outcome. Now suppose a developer renames `send_email` to `email_send` and forgets the scope map. Because the lookup finds no declared scope, the runner refuses the call and logs the refusal, instead of silently running an unscoped tool.

If a dashboard button shows raw JSON after clicking, the handler returned a JSON response. HTMX inserts the response body into the target as markup, so return an HTML fragment. Also note that by default HTMX does not swap 4xx or 5xx responses, so an error status can look like "nothing happened".

> [!warning] Common mistake
> Hiding the queue behind a menu because it slows the demo. The queue is the feature buyers pay for, so keep it on the main dashboard.

```knowledge-quiz
schemaVersion: 1
quizId: "c73b921c-3936-4c3e-8c4d-aaade9cbf22c"
title: "Checkpoint: approvals and scopes"
questionBankId: "0f0a8868-41fb-4fec-819f-1f7152c0a50d"
questionIds:
  - "f4214874-8656-4736-8169-aeb981cb21f7"
  - "b926d610-a151-4743-ad21-6a423df3b4b7"
```

## Step 4 — Harden with the advanced tier

**In plain language.** Once the MVP loop works, add the features that make it survive outages, cost spikes and attacks. Pick three of seven for one week; three done well beats seven done badly.

**Analogy.** A shop that adds a backup generator, a spending limit on the company card, and a fire drill.

**The rule.** The seven advanced features are:

1. an MCP server exposing retrieval and memory tools to other clients;
2. a model router that falls back to a local Ollama model on outage, timeout or budget-cap hit;
3. hybrid retrieval (BM25 plus vector, combined with reciprocal rank fusion) with a reranker;
4. agent roles with per-role tool permissions;
5. a budget tracker with daily and per-request caps;
6. a red-team suite where every attempt must be blocked or quarantined with an audit entry;
7. a Docker deployment with separate liveness and readiness checks and basic auth.

Reuse the same retrieval functions in the FastAPI app and the MCP server, and apply the same permission scopes in both.

**Worked example.** Your router tries the API model, catches a 5xx, and calls Ollama through its OpenAI-compatible path, `/v1/chat/completions`, logging `provider: ollama` in the audit payload. If every call returns 404 even though the model is pulled, check the path first: Ollama's native endpoint is `/api/chat`, which has its own request and response shape (the reply sits under `message`, not `choices`), so an OpenAI-style client must target `/v1/chat/completions`. A 404 can also mean the model tag has not been pulled. After adding a reranker, hit rates rise but answers get worse. Do not just tune the prompt; measure retrieval and answer quality separately and check whether the composer is dropping context. Finally, suppose 6 percent of yesterday's requests fell back to Ollama. If the API was down, the fallback saved you; if the budget cap fired, investigate the cap or the traffic mix. Track fallback rate on the dashboard.

> [!warning] Common mistake
> Writing red-team tests that only match the surface wording of an attack (for example "ignore previous"). If they pass too easily, widen them with non-English and encoded variants.

## Step 5 — Package it as a sales asset

**In plain language.** Recruiters and clients buy stories. Make the work understandable in two minutes by someone who has never met you.

**Analogy.** A shop window. The goods inside may be excellent, but the window decides whether anyone walks in.

**The rule.** Produce five artifacts: a 90-second demo video, a one-page `PORTFOLIO.md` case study, an architecture diagram, a README with the demo and an evaluation summary near the top, and a launch post. Keep the diagram legible at a glance (user, API, retrieval, memory, router, guardrails, approval queue, audit log, dashboard) rather than drawing every module. Before real customers touch it, add real authentication, off-box backups of the audit log, rate limits, cost alerts, idempotency keys on approvals, and a rehearsed rollback.

**Worked example.** Your five-minute demo walks through scenarios in order: a cited answer, an answer correctly declined when the document is missing, a blocked direct injection, an indirect injection quarantined during ingestion, then a delete and an email both stopping in the approval queue. It continues with a document refresh, memory edits, the evaluation dashboard, a trace joined by request id, and a local-fallback toggle. The owner decides to hire you at the paused email, not at the first answer.

> [!warning] Common mistake
> Skipping guardrails "for speed". It does not save time; it moves the cost to later, when every tool, log and screen must be retrofitted.

```knowledge-quiz
schemaVersion: 1
quizId: "256bcac9-abaf-48c9-a44c-0f4abf390ecf"
title: "Checkpoint: fallback and cost"
questionBankId: "0f0a8868-41fb-4fec-819f-1f7152c0a50d"
questionIds:
  - "4dd09011-c552-4ae1-ad60-4faae1746a74"
  - "50a825f8-c6eb-499e-964e-a718cb48f65e"
```

## Try it

Write your own `SEAMS.md`. List at least five seams in a pipeline you have built (or the one described in this lesson). For each, name the two components, the exact value that crosses, and one test that would catch a mismatch.

> [!example]- Sample solution
> 1. Chunker to memory: the chunk id must be the same string type and format; test by asserting a retrieved chunk's id exists in the memory provenance lookup.
> 2. Agent to permissions: the tool name must be a key in the scope map; test by asserting every registered tool has a declared scope and an unscoped tool refuses to run.
> 3. Request id to all modules: carried in a context variable; test with the integration test that checks audit actions for one request id.
> 4. Memory proposal to approval queue: the same id space in both tables so the dashboard can join them; test by creating a proposal and fetching the queue row by that id.
> 5. Eval report to golden set: the same case id; test by diffing two runs on case id and asserting no case is orphaned.

## Key takeaways

- Integration bugs live at seams, so write the seams list and the shared types file before new code.
- One request id, carried in a context variable, ties retrieval, model, guardrails and approvals into one audit log.
- Every external action waits in an approval queue; a tool with no declared scope refuses to run.
- Fallback routing, budgets, roles and red-team tests turn an MVP into something you can run for customers.
- Measure retrieval and answer quality separately, and read fallback rate by its cause.
- The portfolio package (demo, case study, diagram, README) is what makes the work visible.

## Explain it back

Explain why wiring earlier chapters into one capstone finds bugs that separate notebooks hide, using one seam as an example.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "6b2bc285-4f18-4afe-a3e5-b6550c65ba0d"
title: "Chapter quiz: Business Agent OS"
questionBankId: "0f0a8868-41fb-4fec-819f-1f7152c0a50d"
questionIds:
  - "8d28fb4b-9bd1-4d07-8b53-b408db980cbb"
  - "9564ac7f-a09c-416d-b42e-fc04d15c0891"
  - "13a1c363-c7b0-4acf-9867-644071e51af9"
  - "09c4fa7c-b996-4a5d-9e57-d7837facd727"
  - "19cff6af-6266-4ecf-9f50-f1a461150b6a"
  - "8a38a87e-b588-429a-9930-4a19d2e13e6b"
```

Next: [[courses/ai-agent-crash-course/lessons/14-context-engineering|Next lesson]]

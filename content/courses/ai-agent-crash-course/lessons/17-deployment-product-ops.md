---
id: "430532e7-d014-4b0c-810d-9275fad5ffe3"
title: "Deployment, Cost Controls, and AI Product Operations"
description: "Turn a notebook agent into a deployable service with health checks, a container, a model fallback chain, prompt caching, job queues, rate limits, and a per-call cost log."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
  - deployment
  - cost-control
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 17
estimatedMinutes: 50
---

## Why this matters

A demo that works on your laptop can fall over in front of a paying customer: the model takes forty seconds, one user quietly runs up a huge bill, or a provider outage blanks the page for hours. None of these are really AI problems. They are operations problems that come from putting a slow, costly, sometimes unreliable dependency (an LLM API) behind a public URL. The skill that separates a hobby from a product is keeping it up, keeping it cheap, and knowing which user spent which dollar.

## What you'll be able to do

- Explain why FastAPI lifespan and separate liveness and readiness probes beat startup decorators and a single health check.
- Decide which errors a model router should fall back on, and which it should not.
- Calculate daily input cost with and without prompt caching from token counts and prices.
- Diagnose why an Anthropic cache shows zero reads (for example, wrong prompt order).
- Decide which work goes on a job queue, and why a rate limiter needs shared storage.
- Build the first steps of a runbook for a cost spike.

## Before you start

Look back at [[courses/ai-agent-crash-course/lessons/16-multimodal-ocr|Previous lesson]] and the earlier lessons on guardrails and observability, then try to answer these from memory.

- Why does a slow document-processing step, such as OCR, cause trouble if a user is waiting on it?
- What does an input or output guardrail protect against, and where in a request does it sit?
- What per-request facts would you want in a log to explain a surprise bill?

## Step 1 — Start, stop, and report health honestly

**Plain language.** Your service holds long-lived things: a Redis client, a vector store handle, an HTTP client. They must be opened once at startup and closed once at shutdown. The platform also needs to ask your service two different questions: "are you alive?" and "are you ready for traffic?"

**Analogy.** A restaurant has a sign saying "open" (alive), but before the first customer you check that the fridge and stove work (ready). If the dishwasher breaks, the door should stop saying it can serve.

**The rule.**

- FastAPI's `on_event` startup and shutdown decorators are deprecated (since version 0.93). The supported way is one `lifespan` async context manager passed to `FastAPI(lifespan=...)`. Code before `yield` runs at startup; code after it runs at shutdown. If `lifespan` is set, `on_event` handlers are ignored.
- `/healthz` (liveness) returns 200 if the process is alive and calls nothing external.
- `/readyz` (readiness) returns 200 only when every dependency needed to serve traffic is reachable, and 503 otherwise.
- Never open connections or load models at module top level. It slows tests and breaks reload.

**Worked example.**

```python
@asynccontextmanager
async def lifespan(app):
    state["redis"] = redis.from_url(os.environ["REDIS_URL"])   # startup
    state["router"] = ModelRouter.from_env()                    # the LLM router readyz checks
    yield
    await state["router"].aclose()                              # shutdown, reverse order
    await state["redis"].close()

@app.get("/readyz")
async def readyz():
    ready = all([await ping(state["redis"]), state["router"].any_available()])
    return JSONResponse({"ok": ready}, status_code=200 if ready else 503)
```

Note the `JSONResponse`. If you instead returned a tuple such as a body and `503`, FastAPI would serialise the tuple as a JSON array and answer 200, so the orchestrator would never pull the instance out of rotation.

> [!warning] Common mistake
> Letting the liveness probe check Redis "to be thorough". A ten-second Redis blip then restarts healthy containers over and over. Keep liveness free of dependencies and put the dependency checks in readiness.

## Step 2 — Package it and keep secrets out

**Plain language.** A container image is the sealed box your service ships in. You want the box small, free of compilers, not running as the all-powerful root user, and free of secrets.

**Analogy.** The menu is posted for every employee (`.env.example`); the recipe safe is only for the manager (the real `.env` and the platform's secret store).

**The rule.**

- Use a multi-stage Dockerfile: a build stage with the compilers, then a final slim stage that copies only the built virtual environment.
- Prefer a Debian slim base for Python rather than Alpine, because Alpine's musl libc often forces source builds or breaks compiled packages such as numpy.
- Create a non-root user and switch to it with `USER` before the start command.
- Follow twelve-factor config: every environment-specific value is an environment variable. Commit `.env.example`, git-ignore `.env`, and use the platform's secret manager in production.
- Run gunicorn with the uvicorn worker class so a process manager supervises async workers.

**Worked example.** The lab image builds in `python:3.12-slim` with `gcc` and `libpq-dev`, copies `/opt/venv` into a second slim stage, adds `useradd appuser`, and ends with `USER appuser`. To check it, run `docker compose exec api id`: the output must not say `uid=0(root)`.

> [!warning] Common mistake
> Baking the real `.env` into the image "so every environment matches". Anyone who can pull the image can read your keys. Keep secrets outside the image and inject them at run time.

```knowledge-quiz
schemaVersion: 1
quizId: "74b30427-83c4-4161-8446-ea224a6cc064"
title: "Checkpoint: lifespan and health probes"
questionBankId: "a5226190-86ba-45fb-aae9-84c9765ef89b"
questionIds:
  - "723acf66-a2e5-430d-bedd-a4823455bf50"
  - "f7c17cc2-dc84-43eb-8f5f-614195c19773"
```

## Step 3 — Route between models with a fallback chain

**Plain language.** One provider is a single point of failure. A router tries a primary model, then a secondary model from another vendor, then a local model, so an outage becomes lower quality instead of a blank page.

**Analogy.** The main chef calls in sick, the sous chef steps in, and if both are out there is the frozen meal in the microwave. Not as good, but customers still eat.

**The rule.**

- Fall back only on retryable failures: rate limits (429), connection errors, timeouts, and server errors (5xx).
- Do not fall back on 400-class errors. A bad request will fail the same way on the next model.
- Do not catch bare `Exception`. It hides programmer errors as "fallback used".
- When a user is over their daily budget, send them straight to the local model.
- Wrap guardrails around the router, not around one provider, so the fallback path is checked too.
- Ollama offers an OpenAI-compatible endpoint, so the OpenAI SDK can point at it with a different base URL. Its model names must match `ollama list` exactly.
- LiteLLM is the common open-source router with built-in fallbacks and cooldowns. Hand-rolling a router teaches the idea; a router product scales better.

**Worked example.** The primary returns a 429. The router logs a failover warning, tries the secondary, and gets an answer. The row in the cost log has `fallback_used = true`. If both cloud providers are down, the local model answers, and the dashboard's provider split moves from mostly primary to mostly local.

> [!warning] Common mistake
> Wrapping every provider call in `except Exception: continue`. A typo in your prompt builder then looks like a provider outage, and you pay the secondary model's price for a bug.

## Step 4 — Cut the bill with prompt caching, and log every call

**Plain language.** Most requests start with the same long prefix: a system prompt, tool definitions, retrieved context. Providers can remember that prefix so you pay a fraction for repeats. Put stable content first and the user's changing question last.

**Analogy.** The chef does not re-read the whole recipe for each order. Memorising it costs a small upfront tax; reusing it is nearly free.

**The rule.**

- OpenAI caches automatically for prompts of at least 1,024 tokens. Cached reads cost a fraction of the base input price (about a tenth, though it varies by model). Check the cached-token count in the usage data.
- Anthropic caches explicitly with `cache_control` blocks. The default lifetime is five minutes; a one-hour lifetime is opt-in with `ttl: "1h"` and costs more to write. Reads cost a tenth of the base input price.
- Do not assume a longer default: set `ttl` explicitly. The chapter also reports that the default once changed silently, which this lesson could not confirm in the official docs, so treat that as a reason to verify, not as established fact.
- Each model has a minimum cacheable size, which differs by model, so a short block is silently not cached. Check the current documentation for your model.
- A cache matches an identical prefix, so static content must come first and the variable question last.
- Log one row per call with the request id, user, route, provider, model, token counts, cached tokens, USD cost, latency, and status. Aggregate by user, feature, and day, and alert when a user's spend jumps well above their own recent baseline.

**Worked example.** One tenant sends 1,000 queries a day, each with 6,000 stable and 200 variable input tokens, and 400 output tokens. Using the lesson's illustrative Sonnet prices of $3.00 input, $15.00 output, $6.00 per million for one-hour cache writes, and $0.30 for cache reads:

| Item | Calculation | Per day |
|---|---|---|
| No caching, input | 6.2 M x $3.00 | $18.60 |
| No caching, output | 0.4 M x $15.00 | $6.00 |
| No caching total | | $24.60 |
| Cache writes (24 x 6,000 tokens) | 0.144 M x $6.00 | $0.86 |
| Cache reads (976 x 6,000 tokens) | 5.856 M x $0.30 | $1.76 |
| Question tokens | 0.2 M x $3.00 | $0.60 |
| Output | 0.4 M x $15.00 | $6.00 |
| Cached total | | about $9.22 |

That is about a 63 percent saving. Prices change often, so check each provider's current price list before you rely on these numbers.

> [!warning] Common mistake
> Assuming the cache works because you added `cache_control`. If the block is below the model's minimum size, or the variable question comes before the cached block, you get zero hits and nothing errors. Always confirm cache reads in the usage data.

```knowledge-quiz
schemaVersion: 1
quizId: "3434abca-8e45-44b1-8a59-aee3a3c13b65"
title: "Checkpoint: routing and caching"
questionBankId: "a5226190-86ba-45fb-aae9-84c9765ef89b"
questionIds:
  - "7447cdca-7c19-4366-8919-7805a39bf2ca"
  - "81f2e373-56c6-4734-8554-1258a71058e1"
```

## Step 5 — Queue slow work, limit abuse, and write the runbook

**Plain language.** Anything slow must leave the HTTP request, anonymous abuse must be throttled, and you need a written plan for when things break.

**Analogy.** A dish that takes ninety minutes gets a ticket number, not a customer standing at the counter. A bouncer with a clicker stops one visitor from reordering four hundred times a minute.

**The rule.**

- Platforms and edge proxies time out long requests (Cloudflare's default proxy read timeout is about 125 seconds), and users refresh long before that. Enqueue OCR, transcription, bulk reindexing, and evaluation runs. Return a `job_id` and a status URL, and let the client poll.
- RQ on Redis is the simplest Python queue. Set a `job_timeout` so a stuck job cannot wedge a worker.
- RQ's default serializer is pickle, which can execute code when loaded. Use `JSONSerializer` when job arguments can come from untrusted input.
- A token bucket allows short bursts but enforces a long-term rate. With slowapi, point the limiter at Redis so every gunicorn worker shares one count; in-memory counters give each worker its own.
- Use per-IP limits for anonymous routes and per-user limits for authenticated ones. A whole office behind one NAT address can look like one abusive IP.

**Worked example: a 10x cost spike.**

1. Scope: group the last 24 hours of the cost log by user, model, and route, ordered by spend.
2. Contain: lower the daily per-user cap so over-budget users drop to the local model, or suspend a single abusive key.
3. Root cause: compare the system prompt size in the last deploy, check whether the cache hit rate fell to zero, and look for an agent loop with no maximum iterations.
4. Record: write the post-mortem in the runbook.

> [!warning] Common mistake
> Rate limiting with in-memory storage across several workers. A "60 per minute" limit with two workers can really allow about 120.

```knowledge-quiz
schemaVersion: 1
quizId: "dcb7a9f5-6fd9-473c-aa10-c177ecfafe6d"
title: "Checkpoint: queues and rate limits"
questionBankId: "a5226190-86ba-45fb-aae9-84c9765ef89b"
questionIds:
  - "61c03853-6625-4767-ad95-930341575b68"
  - "d2a9f0d4-f0fe-43f3-b99e-17d0ac9eb0c0"
```

## Try it

Estimate the daily input cost for a tenant sending 2,000 queries a day. Each query has a 3,000-token stable prefix and a 100-token question. Use illustrative prices of $4.00 per million input tokens and $0.40 per million for cache reads. Assume the whole prefix is read from cache on every query and ignore cache write costs. Then say what you would check if the real bill came in far above your estimate.

> [!example]- Sample solution
> Total input is 2,000 x 3,100 = 6.2 million tokens. Without caching: 6.2 x $4.00 = $24.80 per day.
>
> With caching: the prefix is 2,000 x 3,000 = 6.0 million cached tokens, costing 6.0 x $0.40 = $2.40. The questions are 2,000 x 100 = 0.2 million uncached tokens, costing 0.2 x $4.00 = $0.80. Total $3.20 per day, about 87 percent less.
>
> If the real bill is higher, check the usage data for cache reads (is the prefix under the model's minimum size, or is variable content ahead of it?), the cache lifetime setting, and the cost log grouped by user and route for one heavy user or a looping agent.

## Key takeaways

- Use one lifespan manager for startup and shutdown, and never open connections at module level.
- Keep liveness free of dependencies and let readiness report them, returning a real 503 through a response object.
- A router falls back only on retryable provider errors, and the guardrails wrap the router, not a single provider.
- Prompt caching is the largest cost lever: static content first, an explicit Anthropic `ttl`, and cache reads verified in the usage data.
- Queue slow jobs with a JSON serializer, and back rate limits with shared Redis storage.
- Log cost per call so a spike can be traced to a user, route, and model within minutes.

## Explain it back

In your own words, describe how a production AI service survives a provider outage, a cost spike, and a 200-page upload, naming the mechanism for each.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "a062a229-fe7f-4f62-a9bf-3f617afbc73b"
title: "Chapter quiz: deployment and product operations"
questionBankId: "a5226190-86ba-45fb-aae9-84c9765ef89b"
questionIds:
  - "affecb79-63f6-4385-a663-ebe8f280102c"
  - "c40237b1-eed7-4412-87af-957511a6f52d"
  - "cb4a4f6a-3e7f-4dfa-a5ca-56d8c332170b"
  - "d37fda9d-c83a-4958-b538-5cb75ffbf48f"
  - "40fce5d0-40ef-4c08-bdfc-100bc59cf739"
  - "4ef35a5e-49ec-4286-bad7-f1c65a0d5d90"
```

Next: [[courses/ai-agent-crash-course/lessons/18-security-red-team|Next lesson]]

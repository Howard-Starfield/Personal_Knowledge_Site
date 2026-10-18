---
id: "a5226190-86ba-45fb-aae9-84c9765ef89b"
title: "Deployment, Cost Controls, and AI Product Operations Question Bank"
description: "Practice questions for Deployment, Cost Controls, and AI Product Operations."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions practise lifespan hooks, health probes, containers, model fallback, prompt caching, job queues, rate limits, and cost logging.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "723acf66-a2e5-430d-bedd-a4823455bf50"
    revision: 1
    status: active
    type: single-choice
    prompt: "A FastAPI service opens a Redis client in one startup hook and closes it in a separate shutdown hook, and connections leak after restarts. Which fix matches current FastAPI guidance?"
    options:
      - id: module-level
        text: "Open the client at module import so it exists before startup"
      - id: lifespan
        text: "Pass one lifespan manager: open before yield, close after"
      - id: both-systems
        text: "Keep both on_event hooks and also pass a lifespan function"
      - id: try-block
        text: "Wrap the startup hook in try and catch the leaked connections"
    correctOptionIds: [lifespan]
    explanation: "A single lifespan context manager keeps setup and teardown for each resource together, so the code before yield runs at startup and the code after it runs at shutdown. Keeping both systems is tempting, but once lifespan is set the on_event hooks are ignored, so the cleanup would never run."
  - id: "f7c17cc2-dc84-43eb-8f5f-614195c19773"
    revision: 1
    status: active
    type: single-choice
    prompt: "Redis goes down for ten seconds and your platform keeps restarting healthy containers because the liveness probe checks Redis. What is the better design?"
    options:
      - id: one-endpoint
        text: "Use one endpoint that checks every dependency for both purposes"
      - id: liveness-pings-redis
        text: "Have the liveness probe ping Redis so a restart clears the blip"
      - id: ready-always-ok
        text: "Make readiness always return 200 so traffic is never interrupted"
      - id: split-probes
        text: "Keep liveness dependency-free; readiness reports Redis down"
    correctOptionIds: [split-probes]
    explanation: "Liveness should only say the process is alive, while readiness decides whether the instance can serve traffic given its dependencies. A liveness probe that pings Redis turns a short Redis blip into needless restarts, which is the flapping the two-endpoint design prevents."
  - id: "affecb79-63f6-4385-a663-ebe8f280102c"
    revision: 1
    status: active
    type: single-choice
    prompt: "A readiness route ends by returning a body and the number 503 as a tuple. What does an orchestrator actually receive from FastAPI?"
    options:
      - id: ok-with-array
        text: "HTTP 200 with a JSON array, as the tuple becomes the body"
      - id: status-from-tuple
        text: "HTTP 503, because the second tuple item is used as the status"
      - id: server-error
        text: "HTTP 500, because FastAPI rejects tuples returned from a route"
      - id: conditional-503
        text: "HTTP 503, but only when the body also contains an error word"
    correctOptionIds: [ok-with-array]
    explanation: "FastAPI does not read a tuple as body plus status code; it serialises the whole tuple as a JSON array and answers 200. Returning a JSONResponse with status_code set is what makes the 503 real, so the orchestrator can take the instance out of rotation."
  - id: "7447cdca-7c19-4366-8919-7805a39bf2ca"
    revision: 1
    status: active
    type: single-choice
    prompt: "A router wraps its provider calls in a bare except Exception, and a coding bug in prompt building quietly sends all traffic to the secondary model. What is the better design?"
    options:
      - id: catch-all
        text: "Catch every Exception so that no request can ever fail outright"
      - id: fallback-on-400
        text: "Also fall back on 400-class errors, since another model may accept"
      - id: retryable-only
        text: "Catch only retryable provider errors such as 429 and 5xx"
      - id: retry-primary
        text: "Retry the primary model ten times before trying any other model"
    correctOptionIds: [retryable-only]
    explanation: "Falling back should be reserved for retryable provider failures such as rate limits, connection problems, timeouts, and server errors. A catch-all hides programmer errors as fallback traffic, and 400-class errors would fail the same way on the secondary model anyway."
  - id: "81f2e373-56c6-4734-8554-1258a71058e1"
    revision: 1
    status: active
    type: single-choice
    prompt: "An Anthropic request puts the user's changing question first and the long static context after it, with cache_control on the static block. Cache reads stay at zero. What is the fix?"
    options:
      - id: longer-ttl
        text: "Raise the lifetime to one hour so the cache survives longer"
      - id: static-first
        text: "Move the static content first and the question last"
      - id: openai-endpoint
        text: "Switch to the Responses API so the cache works for you"
      - id: remove-marker
        text: "Remove cache_control and let the provider cache it itself"
    correctOptionIds: [static-first]
    explanation: "A cache matches an identical prefix, so changing content at the front makes every request look new. Raising the lifetime is tempting, but a longer TTL cannot help when the prefix differs on each call."
  - id: "c40237b1-eed7-4412-87af-957511a6f52d"
    revision: 1
    status: active
    type: single-choice
    prompt: "A tenant sends 1,000 queries a day, each with 6,000 stable prefix tokens and 200 variable tokens. Input costs $5.00 per million tokens and cache reads cost $0.50. With 80 percent of input tokens read from cache, what is the daily input cost?"
    options:
      - id: no-cache
        text: "$31.00"
      - id: cached-only
        text: "$2.48"
      - id: uncached-only
        text: "$6.20"
      - id: blended
        text: "$8.68"
    correctOptionIds: [blended]
    explanation: "Total input is 6.2 million tokens: 4.96 million cached at $0.50 gives $2.48, and 1.24 million uncached at $5.00 gives $6.20, so the sum is $8.68. The $31.00 figure is the no-caching bill, and $2.48 or $6.20 alone each leave out one half of the traffic."
  - id: "d2a9f0d4-f0fe-43f3-b99e-17d0ac9eb0c0"
    revision: 1
    status: active
    type: single-choice
    prompt: "A per-IP limit of 60 requests a minute uses in-memory storage, and gunicorn runs two workers. How much can one IP actually send?"
    options:
      - id: shared-automatically
        text: "About 60 per minute, because the limit is shared automatically"
      - id: split-between-workers
        text: "About 30 per minute, because the workers split the limit"
      - id: per-worker-counters
        text: "Up to about 120 per minute, because each worker counts alone"
      - id: limiter-disabled
        text: "Unlimited, because in-memory storage disables the limiter fully"
    correctOptionIds: [per-worker-counters]
    explanation: "Each worker keeps its own in-memory counter, so the real ceiling is the limit multiplied by the number of workers. A Redis-backed store is what lets all workers share one count, which is why the lab points the limiter at Redis."
  - id: "61c03853-6625-4767-ad95-930341575b68"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which tasks belong on a background job queue rather than inside the HTTP request? Select every correct answer."
    options:
      - id: stream-chat
        text: "Streaming a short chat reply to a waiting user"
      - id: ocr-pdf
        text: "OCR of a 200-page PDF uploaded by a customer"
      - id: liveness-probe
        text: "Answering the liveness probe on the healthz route"
      - id: reindex
        text: "Reindexing 50,000 chunks after a data refresh"
      - id: eval-run
        text: "Running the weekly evaluation suite over all cases"
    correctOptionIds: [ocr-pdf, reindex, eval-run]
    explanation: "OCR of a large file, bulk reindexing, and full evaluation runs are slow, so they should be enqueued while the API returns a job id for polling. A streaming chat reply is the tempting counterexample: it is a read path where the user wants tokens arriving live, not a ticket number."
  - id: "cb4a4f6a-3e7f-4dfa-a5ca-56d8c332170b"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which two practices reduce risk in the packaging and job layers? Select every correct answer."
    options:
      - id: bake-env
        text: "Bake the real .env file into the image for consistency"
      - id: non-root-user
        text: "Create and switch to a non-root user in the Dockerfile"
      - id: alpine-base
        text: "Choose an Alpine base because smaller is always safer"
      - id: pickle-default
        text: "Keep the default pickle serializer for faster job handling"
      - id: json-serializer
        text: "Use the JSON serializer for jobs with untrusted arguments"
    correctOptionIds: [non-root-user, json-serializer]
    explanation: "A non-root user limits the damage of a container escape, and the JSON serializer avoids pickle, which can run arbitrary code when it loads data from an untrusted source. Alpine looks safer because it is small, but its musl libc often forces source builds or breaks compiled packages such as numpy, so the slim Debian base is preferred for Python."
  - id: "d37fda9d-c83a-4958-b538-5cb75ffbf48f"
    revision: 1
    status: active
    type: true-false
    prompt: "Because Anthropic's prompt cache defaults to a one-hour lifetime, you do not need to set ttl explicitly."
    answer: false
    explanation: "Anthropic's default cache lifetime is five minutes, and the one-hour lifetime is opt-in through an explicit ttl. Assuming a longer default means cached prefixes expire between sparse requests, so set ttl deliberately and verify cache reads in the usage data."
  - id: "40fce5d0-40ef-4c08-bdfc-100bc59cf739"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, describe how a production AI service survives a provider outage, a cost spike, and a 200-page upload, naming the mechanism for each."
    sampleAnswer: "For an outage, a model router tries the primary, then the secondary, then a local Ollama model, catching only retryable errors, so quality drops but the service stays up. For cost, every call writes a cost-log row, there are per-user daily caps, and prompt caching puts the static prefix first. For the big upload, the API saves the file, enqueues a background job, and returns a job id the client polls."
    explanation: "A strong answer names the router with fallback chain, the per-call cost log with caps and caching, and the queue with a job id, and says why each one exists rather than just listing tools."
  - id: "4ef35a5e-49ec-4286-bad7-f1c65a0d5d90"
    revision: 1
    status: active
    type: free-recall
    prompt: "Daily AI spend suddenly jumps tenfold. Describe the first steps of your runbook, in order."
    sampleAnswer: "First find the scope by grouping the cost log by user, model, and route over the last 24 hours, looking for one heavy user, one route that changed, or a shift to a pricier model. Then contain it, for example with a lower daily cap per user that sends over-budget users to the local model. Then find the root cause, such as a longer system prompt, a cache hit rate that fell to zero, or an agent loop without an iteration cap. Finally write the post-mortem in the runbook."
    explanation: "The key idea is the order: measure scope from the per-call log, contain the spend, diagnose the cause, and record it. Answers that jump straight to changing models without querying the log are guessing."
```

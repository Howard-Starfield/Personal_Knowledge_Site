---
id: "f07d4988-e271-4b0e-87d6-4519f164876a"
title: "Enterprise LLM Systems: Permissions, Logs, Routing, and Escalation"
description: "Turn a toy RAG chatbot into a multi-user assistant that enforces roles at retrieval, logs every call, routes across models, and escalates when unsure."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 10
estimatedMinutes: 50
---

## Why this matters

A chatbot that works on your laptop is a toy. The first week inside a real company, four questions arrive: can the intern see executive salary documents, where is the record of Tuesday's answer, why did the bill jump tenfold, and what happens when the model is down? A pilot that leaks customer data gets pulled, so teams that win this market are rarely the ones with the smartest model. They are the ones with dull infrastructure: authentication, document permissions, audit logs, cost meters, model routers, and a path to a human.

## What you'll be able to do

- Explain why document permissions must be enforced inside the vector query rather than after it.
- Decide which component of the system is the trust boundary and which is not.
- Calculate the cost of a model call from token counts and per-million prices.
- Diagnose a cost spike, a leak, or an outage by choosing the right log or router behavior.
- Decide when an assistant should escalate to a human instead of answering.

## Before you start

1. In a RAG pipeline, what does the vector search return, and what does the model do with it?
2. Why did the guardrails lesson say that a model should never decide on its own what tools it may call?
3. When is fine-tuning the wrong tool compared with retrieval?

[[courses/ai-agent-crash-course/lessons/09-fine-tuning-decision|Previous lesson]]

## Step 1 — Put permissions in the index, not the prompt

**In plain language.** Picture a records room with locked drawers. A good clerk checks your badge against the drawer labels first and only opens drawers you may enter. A bad clerk pulls every drawer open, then promises to ignore the secret files. The second clerk has already looked at everything.

**The rule.** Store the allowed role of each document as metadata and apply a `where` filter on the user's role inside the vector query, before similarity ranking. The lab uses three roles in a hierarchy: USER, MANAGER, and ADMIN. A document stores its least-restrictive allowed role as `min_role`. Each role has a visibility list: USER sees `["USER"]`, MANAGER sees `["USER", "MANAGER"]`, and ADMIN sees all three.

**Worked example.** The retrieval call in the lab looks like this:

```python
res = collection.query(
    query_texts=[query],
    n_results=5,
    where={"min_role": {"$in": visible}},
)
```

For a USER, `visible` is `["USER"]`, so a document marked `min_role: ADMIN` is never returned. The wrong version fetches the top 20 chunks and then filters them with a Python list comprehension. That is unsafe for four reasons: forbidden chunks are already in memory and can reach logs or crash dumps, tokens are wasted, the top-k ranking is crowded by chunks the user cannot see, and the trace shows forbidden chunks were fetched. Memory stores follow the same rule: every memory row carries a user and tenant identifier, and every read filters by them.

> [!warning] Common mistake
> Asking the model whether this user may see this document, or relying on "answer only from sources" in the prompt. A prompt injection can argue the model out of any such rule. The decision must be made in code before the model sees data.

## Step 2 — Treat the gateway as the trust boundary

**In plain language.** A hospital has a receptionist at the front door who checks badges. Nobody expects the patients' files to check their own badges.

**The rule.** The API gateway authenticates each request and decodes a signed token (a JWT, or JSON Web Token) that carries the user's identity and role. The gateway then applies the permission filter, assembles the prompt, and only then calls the model. The LLM itself is not a security boundary: anything it can read, it can leak through prompt injection, a poisoned document, or a plain summary. Never give it raw credentials or let it call privileged tools directly.

RBAC (role-based access control) grants permissions to roles and assigns roles to users; it is simpler to audit than ABAC (attribute-based access control), which evaluates attributes such as department or region.

**Worked example.** Alice (USER) and Bob (MANAGER) ask the same question about quarterly targets. The gateway reads each role from the verified token, builds `visible` lists of one role and two roles, and passes them to retrieval. Alice's search cannot return manager-only targets; Bob's can. In both cases the retrieval log records user, role, query, and hit IDs.

> [!warning] Common mistake
> Trusting a role sent by the browser or typed into the prompt. The role must come from a verified token, never from the request body or the model.

```knowledge-quiz
schemaVersion: 1
quizId: "5f890e3c-d24c-413f-bd3e-1323c235c212"
title: "Checkpoint: permissions and trust boundary"
questionBankId: "e361abe1-1366-4692-8e7c-81d51ba68d60"
questionIds:
  - "a0e70119-d4bb-4c63-a765-33f4513f9658"
  - "cfe5fa22-4d05-48cb-8805-f672a9683ca8"
```

## Step 3 — Keep three logs and a cost meter

**In plain language.** A hospital help desk keeps a logbook: who asked, what file was handed over, and what the look-up cost. Without it nobody can explain Tuesday afternoon.

**The rule.** Every answer needs three logs: a request log (who, when, what was asked), a retrieval log (what came back, with scores), and a cost log (model, input tokens, output tokens, USD, latency). If any one is missing, past answers cannot be reconstructed and an audit fails. Cost per call is:

`usd = (input_tokens x input_price + output_tokens x output_price) / 1,000,000`

with prices quoted per million tokens. The lab's `PRICING` table uses example prices that must be re-checked on the provider's pricing page.

**Worked example.** Using the lab price for `gpt-5.2-mini` ($0.15 input, $0.60 output per million tokens), a call with 812 input and 134 output tokens costs (812 x 0.15 + 134 x 0.60) / 1,000,000 = 202.2 / 1,000,000, about $0.000202. The same tokens on the lab's `gpt-5.2` prices ($2.50 and $10.00) cost (812 x 2.50 + 134 x 10.00) / 1,000,000 = 3,370 / 1,000,000, about $0.00337, about 17 times more. Grouping the log by user, feature, and model shows where a spike comes from, such as a runaway loop or a leaked key.

> [!warning] Common mistake
> Logging only the model's reply. Without the inputs and retrieval state you can see what was said but never why.

## Step 4 — Route across models with a fallback chain

**In plain language.** The librarian has a backup copy of the main reference book in another room, and a small dictionary under the desk. If the first is out, she tries the next.

**The rule.** A router picks a model chain by role, tries each model in order, catches errors, and logs the result. Routing and fallback are reliability features: a product that depends on one provider goes down whenever that provider does. In the lab, USER and MANAGER get `gpt-5.2-mini` then local Ollama, while ADMIN gets `gpt-5.2`, then `gpt-5.2-mini`, then local Ollama. If every model in a chain fails, the router raises an error. The model IDs and prices are the lab's configuration values, not a guaranteed catalog: before running, confirm each ID exists in your provider's current model list (for OpenAI, `client.models.list()`). An ID the provider does not recognize fails on every call and drops straight to Ollama, so log each fallback and alert on a rising fallback rate instead of letting it happen silently. The production upgrade is LiteLLM's `Router`, which adds fallbacks, context-window fallbacks, retry policies, and cooldowns.

**Worked example.**

```python
from openai import APIConnectionError, APITimeoutError, InternalServerError, RateLimitError

RETRYABLE = (RateLimitError, APIConnectionError, APITimeoutError, InternalServerError)

for model in chain:
    try:
        out = call(model, messages)
        return {**out, "model": model, "fallback_used": model != chain[0]}
    except RETRYABLE as e:          # 429, network, timeout, 5xx: try the next model
        last_err = e
    # anything else (bad key, malformed request, unknown model, a bug) raises at once
raise RuntimeError(f"All models in chain failed: {last_err}")
```

Fall back only on failures that another model might not share: rate limits (429), connection errors, timeouts and 5xx server errors. An invalid key, a malformed request or an unknown model ID is a defect, not an outage, so it should raise immediately instead of hiding behind a successful fallback. Test both paths on purpose: simulate a timeout and confirm `fallback_used` is true, then set a bad key and confirm the request fails loudly.

> [!warning] Common mistake
> Hard-coding one provider client everywhere. Retries, fallbacks, cost logs, and cooldowns then become one-off patches, and an outage becomes your outage.

```knowledge-quiz
schemaVersion: 1
quizId: "487c5719-7bbb-4ccd-ba9b-77faf1493690"
title: "Checkpoint: cost and routing"
questionBankId: "e361abe1-1366-4692-8e7c-81d51ba68d60"
questionIds:
  - "5b748a4e-b083-4469-b9b7-d81d3a3c62f6"
  - "d403d7f1-e805-4b37-b817-1e4ae077afb0"
```

## Step 5 — Escalate to a human when confidence is low

**In plain language.** If the librarian cannot find a confident answer she does not invent one. She fills out a yellow slip and sends you to a person.

**The rule.** Compare the best retrieval score with a threshold. If it falls below, create a support ticket row, return a polite message that a human will follow up, and skip the model call entirely. The lab's threshold is 0.35, an uncalibrated starting value that you should tune against a real evaluation set. Lowering it to zero so the bot always answers is how hallucinations ship. Escalation, together with the audit log and the permission model, can be described with the four functions of the NIST AI Risk Management Framework (GOVERN, MAP, MEASURE, MANAGE). The chapter offers an illustrative mapping, which is its own and not NIST's: GOVERN is policy and approval gates, MAP is access design and threat model, MEASURE is the dashboard and cost log, and MANAGE is incident runbooks and the escalation queue.

**Worked example.** A USER asks about an HR salary band. The visibility filter hides the ADMIN-only HR document, so the best visible chunk scores 0.22, below 0.35. The assistant creates a ticket and answers with a hand-off message. An ADMIN asking the same question gets the HR band with a citation.

> [!warning] Common mistake
> Answering anyway with a disclaimer. A confident-sounding reply built on weak sources is still a hallucination.

```knowledge-quiz
schemaVersion: 1
quizId: "49e324ae-3357-435d-9482-3560d704e9fc"
title: "Checkpoint: escalation and prompt defenses"
questionBankId: "e361abe1-1366-4692-8e7c-81d51ba68d60"
questionIds:
  - "e4cbc065-30fc-45f0-a4be-d7fd67e74f43"
  - "3649dc7d-094b-412d-9374-7881976ff992"
```

## Try it

On paper or in a small script, design the guard layer for a two-document assistant.

1. Document A (`refunds`) is readable by every role. Document B (`salaries`) is readable only by ADMIN. Give each its `min_role`.
2. Write the `visible` list for each of the three roles.
3. A USER asks about salary bands. State which document the filtered search can return, and what happens if the best remaining score is 0.22 and the threshold is 0.35.
4. Compute the cost of a call with 1,000 input and 500 output tokens on `gpt-5.2` at $2.50 and $10.00 per million tokens.
5. Name one test you would add to prove no ADMIN-only chunk reaches a USER.

> [!example]- Sample solution
>
> 1. `refunds` has `min_role: USER`; `salaries` has `min_role: ADMIN`.
> 2. USER sees `["USER"]`, MANAGER sees `["USER", "MANAGER"]`, ADMIN sees `["USER", "MANAGER", "ADMIN"]`.
> 3. Only `refunds` can be returned. Its best score of 0.22 is below 0.35, so the assistant opens a support ticket and does not call the model.
> 4. (1,000 x 2.50 + 500 x 10.00) / 1,000,000 = 7,500 / 1,000,000 = $0.0075.
> 5. A regression test that queries as USER and asserts that no citation has `min_role == "ADMIN"`.

## Key takeaways

- Permissions belong in the vector query as a metadata filter, never in the prompt or a post-retrieval loop.
- The gateway is the trust boundary; the model is not, and must never hold raw credentials or decide access.
- Keep request, retrieval, and cost logs for every call, so any past answer and any bill spike can be explained.
- A router with a fallback chain turns a provider outage into a degraded answer instead of a failure.
- Below a calibrated confidence threshold, open a ticket and hand off to a human instead of answering.
- A system prompt rule is necessary but never sufficient against prompt injection; add guardrails and keep the filter.

## Explain it back

In your own words, explain how an enterprise RAG assistant decides what a user may see, what it logs, and what it does when it cannot answer with confidence.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "a3730128-a0c3-4a63-ab77-356d0bdb6aa4"
title: "Chapter quiz: Enterprise LLM systems"
questionBankId: "e361abe1-1366-4692-8e7c-81d51ba68d60"
questionIds:
  - "5b010ba1-15e2-4693-afdd-f7dfd8cc71f7"
  - "ab39db53-23e0-441d-8af6-1d13eb174697"
  - "ecc08f23-e167-431d-9086-6fc348be03ca"
  - "82af4f6f-adfa-454f-85f6-3006f3c81d46"
  - "b7ac6df3-90c4-42b7-b995-2494ea5033e0"
  - "8395ef2d-351e-40fe-8824-957cdfbcff49"
```

Next: [[courses/ai-agent-crash-course/lessons/11-business-applications|Next lesson]]

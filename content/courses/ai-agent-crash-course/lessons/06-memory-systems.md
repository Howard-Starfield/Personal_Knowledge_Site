---
id: "f20e88d6-88cf-44ad-a5d3-3f60d78fdb20"
title: "Memory Systems for AI Agents"
description: "Design agent memory that is typed, gated by a write policy, retrieved with filters, cited in answers, and forgotten on purpose."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
lessonOrder: 6
estimatedMinutes: 45
---

## Why this matters

A retrieval bot can answer questions from documents, yet every conversation starts from zero. It forgets that you like short answers or that a ticket went to the legal team last week. The usual fix, "save the whole conversation forever", goes wrong within weeks: the assistant quotes a sarcastic remark as a stable preference, leaks one customer's details into another's prompt, and burns its context window on trivia. Good memory design is what separates a chatbot from a system people can trust.

## What you'll be able to do

- Classify a piece of information into the right memory type.
- Decide whether a candidate memory should be allowed or denied by a write policy, and name the reason.
- Explain how retrieval narrows memories before ranking them, and why memory and documents get separate citations.
- Diagnose a memory failure such as stale recall, leakage or poisoning, and choose the fix.
- Build a small typed memory store with a write gate and a delete command.

## Before you start

Think back to the retrieval lesson and answer these from memory.

1. What does a retrieval-augmented bot put into the prompt, and where does it get it from?
2. Why should an answer cite the document chunk that supports it?
3. What happens to answer quality when too much irrelevant text is stuffed into the context window?

[[courses/ai-agent-crash-course/lessons/05-rag-knowledge-base|Previous lesson]]

## Step 1 — Give every memory a type

**In plain language.** Think of a new employee on day one. They scribble down where the printer is, which manager dislikes interruptions, and what happened in this morning's meeting. By Friday they sort those notes into different piles, because each kind of note is used and thrown away differently.

**The rule.** The chapter groups agent memory into six kinds:

- Short-term (working) memory: the current conversation buffer, which ends with the session unless something is promoted.
- Episodic memory: a specific, time-stamped event.
- Semantic memory: a durable fact, concept-level rather than event-level.
- Procedural memory: a how-to rule or learned routine.
- User-profile memory: preferences, identity, accessibility needs and tone. It is a kind of semantic memory with its own category because it is the most security-sensitive.
- Agent-operational memory: goals, current tasks, tool ledger, notes between agents.

Each stored memory carries a type, so retrieval can filter at the source and expiry rules can differ by type. Without types, every query scans everything, which is slow, noisy and impossible to audit.

**Worked example.** Sort these four items:

| Item                                                     | Type         |
| -------------------------------------------------------- | ------------ |
| "On 2026-05-09 the user escalated ticket 4421 to legal." | episodic     |
| "Our refund window is 30 days."                          | semantic     |
| "When generating invoices, always include the ABN."      | procedural   |
| "The user prefers answers under three sentences."        | user-profile |

In the chapter's design the episodic entry expires after 14 days unless it is distilled, while the profile entry lasts and is flagged for periodic review.

The chapter also borrows an operating-system picture for where memory lives at runtime: core memory is the small part kept inside the context window now (tiny, fast, costly per token), recall is a searchable store of past conversation history outside the prompt, and archival is cold long-term storage. This picture comes from the MemGPT paper and the Letta framework that grew from it. The agent only ever sees what retrieval brings into the prompt.

> [!warning] Common mistake
> Saving everything as one generic "note". Six weeks later you cannot filter by kind, cannot expire the throwaway items and cannot audit what the agent believes.

## Step 2 — Gate writes with a write policy

**In plain language.** A good assistant does not write down every joke, typo and "actually, never mind". They decide what is worth keeping before writing, because tidying a messy notebook later costs far more than refusing at the door.

**The rule.** A write policy is the gate that decides what may enter long-term memory. The extractor only proposes a candidate; the policy decides. The chapter's policy denies:

- one-offs that are too trivial to reuse;
- secrets such as API keys, private keys, card numbers and government IDs;
- passing moods, because "annoyed today" is not a durable fact;
- unverified assumptions, recognised in the lab by hedging words like "maybe" or "probably";
- sensitive data (health, legal, financial) unless the user explicitly consented;
- low-importance episodic items.

Each memory also gets an importance score from 0 to 5. The lab's policy is a plain function that returns an allow or deny decision with a reason:

```python
def write_policy(mem, user_consent_sensitive=False):
    if len(mem.text.strip()) < 8:
        return False, "deny: too_trivial"
    if any(p.search(mem.text) for p in SECRET_PATTERNS):
        return False, "deny: secret_detected"
    if "maybe" in mem.text.lower() or "probably" in mem.text.lower():
        return False, "deny: unverified_assumption"
    if "sensitive" in mem.tags and not user_consent_sensitive:
        return False, "deny: sensitive_without_consent"
    return True, "allow"
```

**Worked example.** Run three candidates through it:

1. "The user prefers replies under three sentences." No rule fires, so the result is allow.
2. A made-up key such as "API key sk-proj-AbCdEfGhIjKlMnOpQrStUv12345678" matches a secret pattern, so the result is deny: secret_detected.
3. "The user is probably vegetarian." has a hedge word, so the result is deny: unverified_assumption.

Importance also needs a guard. Do not let the model give itself an importance above 3; cap model-proposed scores and let a person or a deterministic rule raise them.

> [!warning] Common mistake
> Letting the same LLM that extracts memories also approve them. Its job is to propose; the policy's job is to say no.

```knowledge-quiz
schemaVersion: 1
quizId: "04fd441d-31e3-4778-816b-f2ead8973b77"
title: "Checkpoint: types and write policy"
questionBankId: "a5024379-70cb-4c5b-8e08-76042d28c77b"
questionIds:
  - "4d1c33b1-d1b8-4bb9-bda6-6e44d9eadef2"
  - "2622f6ed-a45b-4520-95f4-db4670596ab7"
```

The full question bank — every question with its sample answer and its explanation — is at [[courses/ai-agent-crash-course/question-banks/06-memory-systems|Memory Systems for AI Agents Question Bank]].

## Step 3 — Retrieve with filters and cite what you used

**In plain language.** Before answering, the assistant flips open the notebook to the relevant page, not to every page. Then they tell you where the answer came from: "per the policy manual" for company facts, "you told me earlier" for personal ones.

**The rule.** The chapter's retrieval policy is a filter chain. First, cheap metadata filters (type, recency, importance, tags) in SQLite narrow the candidates. Then similarity ranking orders what is left. A small cap, for example 6 memories or about 600 tokens, keeps memory from crowding documents out of the context window. Memory retrieval wants precision, not broad recall.

Memory and documents are separate channels:

- RAG retrieves documents the business authored. The documents are the source of truth for business facts.
- Memory retrieves facts about the user and the agent. The memory store is the source of truth for those.

When memory enters the prompt it is wrapped in its own block with a distinct citation label:

```
[MEMORY id=mem_018 type=user-profile importance=4 written=2026-05-09]
The user prefers responses under 3 sentences unless they ask for detail.
[/MEMORY]
```

The system prompt tells the model to append a tag like `[memory:mem_018]` to any sentence a memory influenced, while documents use `[doc:...]`. If a memory and a document conflict on a business fact, the document wins.

**Worked example.** The user asks, "What is our refund policy?" Retrieval returns a memory saying the user thinks refunds should last 60 days and a document saying the window is 30 days. A correct answer says the window is 30 days and cites the document. The memory describes the user's opinion, not the company's rule.

> [!warning] Common mistake
> Putting user preferences into the document store, or mixing both in one block. The model then treats a preference as policy and your citations stop being honest.

```knowledge-quiz
schemaVersion: 1
quizId: "ec3071dc-0612-437b-8214-3d43e749f574"
title: "Checkpoint: retrieval and citation"
questionBankId: "a5024379-70cb-4c5b-8e08-76042d28c77b"
questionIds:
  - "ccdda7b9-9b49-4d12-914f-a275a6ba26ff"
  - "8d2adead-4250-407d-ab09-fda15ab6e92f"
```

## Step 4 — Forget on purpose and keep it safe

**In plain language.** The notebook gets a weekly tidy. Forty small notes about one customer's month become one useful line, and the originals go in the bin. The notebook also never contains anything the assistant copied from a stranger's note slipped under the door.

**The rule.** A forgetting routine (summarise-and-forget) pulls old episodic memories, distils them into a short note, stores that note as a semantic memory with high importance, and deletes the originals. Tiago Forte's Second Brain method, written for human note-takers, has a lifecycle called CODE: Capture, Organize, Distill, Express. The chapter maps its "Distill" step to this routine. The chapter also borrows Forte's PARA scheme (Projects, Areas, Resources, Archives) for the vault's files, and its design keeps the distilled lesson in Archives, not the raw turns.

Safety and privacy rules for a memory store:

- Right to delete: the user can ask "what do you remember about me?" and can delete a specific item. Log the deletion, not the deleted content.
- Scope every memory and every retrieval to a user, so one user's memory cannot leak into another's session.
- Memory poisoning is an attack where a malicious memory is planted, often through text in a web page or PDF, and later recalled and obeyed. The chapter's defence is to auto-extract memories only from direct user turns, never from tool outputs or retrieved documents.
- Log memory IDs and types, not full text.
- The markdown vault is plain text on disk, so protect it with filesystem permissions and keep it out of shared cloud sync.

**Worked example.** After a month of support chats, run the forget command with a 14-day threshold:

```bash
python chapter05/memory.py forget --older-than-days 14
```

Episodic entries older than 14 days become one semantic note such as "Recurring issue on the Acme account: export formatting. Resolution: enable the UTF-8 BOM." The originals are deleted from the index and the vector store. Only episodic entries are touched, so preferences and semantic facts are kept. The chapter's sample code selects by type and age only, so to protect an old episodic entry, re-type it as semantic.

> [!warning] Common mistake
> Never deleting anything. The store fills with stale trivia and the agent performs worse than a store one-tenth the size.

```knowledge-quiz
schemaVersion: 1
quizId: "15058a60-245b-4128-9528-d5f83658c3ea"
title: "Checkpoint: forgetting and safety"
questionBankId: "a5024379-70cb-4c5b-8e08-76042d28c77b"
questionIds:
  - "3156a5df-49ea-4724-89ee-c07e9338350e"
  - "0efccca9-7945-47df-806a-9457b800d224"
```

## Try it

Build a tiny typed memory with a write gate, no databases needed. In a Python file:

1. Define the allowed types: episodic, semantic, procedural, user-profile, agent-operational.
2. Write a function `check(text, mem_type)` that returns a decision and a reason. Deny an unknown type, text shorter than 8 characters, passing-mood words such as "annoyed", anything containing "probably" or "maybe", and anything that matches the pattern of an API key beginning with `sk-`.
3. Keep accepted memories in a list of dictionaries with an id, type, text and date.
4. Add `delete(memory_id)`.
5. Test it with these five inputs: a formatting preference (user-profile), an invoice rule (procedural), "user seems annoyed", "maybe the user is vegetarian", and a fake key.

> [!example]- Sample solution
>
> ```python
> import re, uuid, datetime
>
> TYPES = {"episodic", "semantic", "procedural", "user-profile", "agent-operational"}
> SECRET = re.compile(r"\bsk-[A-Za-z0-9_-]{16,}")
> MOODS = ("annoyed", "frustrated", "angry", "happy", "sad")
> store = []
>
> def check(text, mem_type):
>     if mem_type not in TYPES:
>         return False, "deny: unknown_type"
>     if len(text.strip()) < 8:
>         return False, "deny: too_trivial"
>     low = text.lower()
>     if SECRET.search(text):
>         return False, "deny: secret_detected"
>     if any(m in low for m in MOODS):
>         return False, "deny: mood_not_durable"
>     if "maybe" in low or "probably" in low:
>         return False, "deny: unverified_assumption"
>     return True, "allow"
>
> def add(text, mem_type):
>     ok, reason = check(text, mem_type)
>     if ok:
>         store.append({"id": "mem_" + uuid.uuid4().hex[:8], "type": mem_type,
>                       "text": text.strip(), "date": datetime.date.today().isoformat()})
>     return reason
>
> def delete(memory_id):
>     before = len(store)
>     store[:] = [m for m in store if m["id"] != memory_id]
>     return len(store) < before
> ```
>
> Expected: the first two are allowed; "user seems annoyed" is denied as a mood, "maybe the user is vegetarian" as an unverified assumption, and the fake key as a secret. Real systems need more patterns and per-user scoping; this is a teaching sketch.

## Key takeaways

- Memory is typed: short-term, episodic, semantic, procedural, user-profile and agent-operational, so retrieval and expiry can differ by kind.
- A write policy gates what is stored, and it is cheaper to refuse at write time than to clean up later.
- Retrieve by narrowing with metadata filters first, then ranking by similarity, under a small cap.
- RAG is the source of truth for business documents and memory is the source for user and agent facts; keep them in separate blocks with separate citations.
- A good memory system forgets on purpose, lets the user inspect and delete, and only auto-extracts from direct user turns to resist poisoning.

## Explain it back

In your own words, explain how a typed, gated, citable memory system differs from saving the whole conversation forever, and why each of those three properties matters.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "20a73a10-ed29-4d1f-b0ab-21b70eb1210e"
title: "Chapter quiz: memory systems"
questionBankId: "a5024379-70cb-4c5b-8e08-76042d28c77b"
questionIds:
  - "7f6cf631-5a0e-4edc-aaed-5784186ee8db"
  - "573ac058-98fb-4fb0-978f-48208c28c20a"
  - "6cb56b43-f2cb-440d-9cab-6ef6bcb20907"
  - "af72e08e-0fdc-42d0-894d-f05d4b9c1440"
  - "b35671d3-5dc0-49ed-829b-37cd9f434932"
  - "2059e362-878e-46fe-ae36-d31447552921"
```

Next: [[courses/ai-agent-crash-course/lessons/07-agents-tools-workflows|Next lesson]]

---
id: "53c1dde7-1089-4d7e-ad6b-dfdaccaeabaf"
title: "RAG and Semantic Search for Accounting Documents"
description: "Learn how a retrieval-augmented document vault gives accountants cited, verifiable answers and refuses when no source supports one."
type: lesson
publish: true
status: active
created: "2026-10-18"
tags:
  - accounting
courseId: "7fa12f57-0c5a-49af-8c1e-0f1e84677f90"
lessonOrder: 32
estimatedMinutes: 45
---

## Why this matters

Accounting answers must trace back to a source: a contract, an invoice, an approved policy. A plain chatbot has never seen your company's documents, so it will happily produce a policy that sounds professional and is wrong. In an audit, that kind of invented answer can become a serious finding. Retrieval-Augmented Generation (RAG) is the pattern that lets an AI answer from your own documents, with citations you can check.

## What you'll be able to do

- Explain what RAG is and why it suits accounting work better than an ungrounded chatbot.
- Describe how embeddings, chunks and semantic search find the right paragraph.
- Diagnose a bad chunk size and decide when hybrid search is needed.
- Decide what to do when a cited page contradicts the AI's answer.
- Explain why refusal and permission filtering are guardrails, not bugs.

## Before you start

- In Chapter 31 you built an AI agent with guardrails. Which guardrail would you most want on any AI that answers accounting questions?
- Why must every accounting number or policy interpretation trace to a source document?
- What is the difference between a lookup that matches exact words and one that matches meaning?

[[courses/accounting-ai-crash-course/lessons/31-ledgerguard-ai-agent|Previous lesson]]

## Step 1 — RAG: retrieve before you generate

**Idea.** A large language model (LLM) learned from public text. It has never read BoBo's reimbursement policy, lease or vendor contracts, so asked about them it guesses. RAG adds a step first: the system looks up the few most relevant passages in your private document vault, then hands them to the LLM with the instruction to answer using only those passages.

**Analogy.** Think of an open-book exam. The student may only answer from the pages placed on the desk, and must say "it isn't in these pages" when it isn't.

**Rule.** Source grounding means the LLM answers only from the retrieved chunks, never from its own training memory. The memory hook is "retrieve before you generate."

**Worked example.** The auditor asks: "What is BoBo's policy on contractor meal reimbursement?" Searching the handbook by hand took about 35 minutes in the chapter's story. The vault returned the paragraph, document name and page in seconds. In the chapter's sample data the answer was a per-diem of $60 per day for contractors traveling outside their home metro area, citing page 4 of the reimbursement policy. You then open that page, read it yourself, and send it to the auditor.

> [!warning] Common mistake
> Believing a fluent answer is a correct one. An answer with no source is worse than no answer in accounting, because it looks authoritative and cannot be verified.

## Step 2 — Embeddings, chunks and semantic search

**Idea.** The vault cannot read pages the way you do, so each document is cut into small pieces called chunks. Each chunk, and later each question, is turned into an embedding: a long list of numbers that represents its meaning. Paragraphs about the same topic end up close together in that number-space, even if they use different words.

**Analogy.** A chunk is a bookmark, not a book: small enough to point to one idea, big enough to make sense alone.

**Rules.**

- Semantic search compares meaning, so "1099 meal allowance" can find a paragraph about "per diem for independent contractors." Ctrl-F would find nothing.
- Chunks in the chapter are typically 300 to 800 tokens, with about 500 tokens and a 50 to 100 token overlap as a sensible default. The overlap stops a key sentence being cut in half between two chunks.
- Each chunk keeps metadata: document name, page, section, and a permission tag.
- The question must be embedded with the same model used for the chunks, then the vector database returns the top K nearest chunks. K of 5 is a common default.
- Hybrid search adds keyword matching to semantic search, which helps with exact identifiers such as PO or invoice numbers.

**Worked example.** BoBo's 40-page lease should be split along its numbered sections into chunks of roughly 500 tokens with about 100 tokens of overlap. Every chunk carries the document name, page, section number and an accounting permission scope. If you instead split into one-sentence chunks, a clause such as "only outside the home metro area" can land in a different chunk from the rule it limits.

> [!warning] Common mistake
> Thinking chunk size does not matter. Chunks that are too large bring in irrelevant text and make answers drift. Chunks that are too small lose the qualifying clause.

### Checkpoint 1

```knowledge-quiz
schemaVersion: 1
quizId: "cd21efc4-0eba-414b-889e-6cf360a12b37"
title: "Checkpoint 1: RAG basics"
questionBankId: "b02badf9-b4a5-4714-a91c-83dffb0db580"
questionIds:
  - "43dbdc37-476d-42c6-8948-d87e17118dfe"
  - "8b05f200-1ed4-4d19-a487-b0e521c94fa3"
```

## Step 3 — Build the grounded prompt, cite, and verify

**Idea.** After retrieval, the system builds a prompt with three parts: a system instruction that enforces source-only answering, the retrieved chunks each labeled with document and page, and the user's question. The LLM then writes an answer that tags each claim with its source.

**Analogy.** It is like a footnoted research memo: each sentence points to the page that supports it, so a reviewer can check any line.

**Rule.** The answer is a proposal, not evidence. The required habit is to click the citation, open the source PDF and read the cited page before using the answer in work product. For at least your first months, do this every time.

**Worked example.** The vault answers that BoBo reimburses contractor meals "up to $75 per day," citing page 4 of the reimbursement policy. You open page 4 and it says $60. Treat the answer as wrong: use $60, and report the mismatch to the system owner so the retrieval or grounding bug can be found. Never copy the AI's number into work product without checking the citation.

> [!warning] Common mistake
> Trusting an answer because it has a citation attached. A citation only helps if you open it; the model can still misquote or misread the page it cites.

## Step 4 — Refuse when unsupported, and filter by permission

**Idea.** A well-built vault does not always answer. If nothing retrieved supports the question, it replies with a fixed message such as "I cannot confirm this from the provided sources." That is correct behavior, and it should surface the gap to a human instead of filling it with a guess.

**Analogy.** A good junior who says "I can't find that in the file, I'll ask the Controller" is more useful than one who bluffs.

**Rules.**

- Refuse when the best chunk's similarity score falls below a threshold, when the LLM judges the chunks do not answer the question, or when the permission filter removes every candidate chunk.
- Never fall back to the LLM's general training knowledge.
- Tag every chunk with one permission scope (the chapter uses public, accounting, payroll and executive). Filter chunks by the user's scopes before the LLM sees anything. Never rely on the LLM to keep a secret.
- Keep an audit log of each query with user, time, retrieved chunk IDs and answer.
- When a policy is replaced, tag the old version superseded so stale policy is not quoted as current.
- Do not paste client data into a public LLM.

**Worked example.** A staff accountant searches for executive bonus calculations and gets a refusal. That is not a bug. The documents are tagged for restricted scopes, so the filter removed them before the LLM was called. Likewise, if Marie's follow-up is about same-city contractor work and the policy only covers travel outside the home metro area, the vault should refuse and you should escalate to the Controller.

> [!warning] Common mistake
> Treating a refusal as a failure and asking the system, or a public chatbot, to "just guess." That removes the guardrail that makes the vault safe to use in an audit.

### Checkpoint 2

```knowledge-quiz
schemaVersion: 1
quizId: "1078c174-6dfc-46b9-b0cb-a56ac88fed79"
title: "Checkpoint 2: Refusal and permissions"
questionBankId: "b02badf9-b4a5-4714-a91c-83dffb0db580"
questionIds:
  - "ad17be36-dd63-4c7d-b3ee-770274edad20"
  - "f1b042cd-f704-4d23-8851-ba97f18f0794"
```

## Try it

Sketch a vault for a small team. Using the ideas above, list (a) five documents you would ingest, with a permission scope for each, (b) your chunk size and overlap, (c) the exact refusal message, and (d) the three situations in which the vault must refuse.

> [!example]- Sample solution
> (a) Reimbursement policy (accounting), vendor master agreements (accounting), office lease (accounting), employee handbook (public), payroll register (payroll).
> (b) About 500 tokens per chunk with 50 to 100 tokens of overlap, split on numbered sections and headings where possible, keeping document name, page and section as metadata.
> (c) "I cannot confirm this from the provided sources."
> (d) The top similarity score is below the threshold; the LLM finds the retrieved chunks do not contain the answer; the permission filter leaves no chunks. In every case the system must not fall back to general knowledge, and the refusal is logged so the policy owner can fill the gap.

## Key takeaways

- RAG retrieves relevant passages first, then asks the LLM to answer only from them.
- Embeddings capture meaning, so semantic search finds paragraphs that share no exact words with the question.
- Chunk size and overlap matter: too small loses context, too large drags in irrelevant text.
- Use hybrid search when exact identifiers such as PO numbers matter.
- Refusal and permission filtering before the LLM are guardrails, and a refusal is the system working.
- Always open the cited page and read it yourself before relying on an answer.

## Explain it back

In your own words, tell a Controller how a RAG vault keeps an AI from inventing policy. Cover retrieval, citations, refusal and your own verification step.

## Chapter quiz

```knowledge-quiz
schemaVersion: 1
quizId: "993d2a20-4225-4aae-9d3b-64300b564f3a"
title: "Chapter quiz: RAG and semantic search"
questionBankId: "b02badf9-b4a5-4714-a91c-83dffb0db580"
questionIds:
  - "63033d0f-c616-4fd9-8886-a41979e56f43"
  - "48cbc72a-3306-45da-9a24-5eb12c83bced"
  - "f2a4b8bd-1b40-4e41-a9a6-f1e66b12d8ff"
  - "f5771136-279d-4c07-9d0e-0cbcbdbe8620"
  - "2033b135-a900-43ac-b798-51938d038782"
  - "8bc90bb7-fb3d-4752-b946-fcf580299146"
  - "7b8b9342-cd79-4da1-a8a2-a2da9f02dee4"
  - "12705f9e-ba63-43a8-b7a9-e7a1acbb4ce5"
```

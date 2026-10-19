---
id: "23687da4-7798-4a08-adbd-52c155daab03"
title: "Guardrails, MCP, and Agent Safety Question Bank"
description: "Practice questions for Guardrails, MCP, and Agent Safety."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions practise the guardrail, permission, sandbox, audit, and MCP ideas from the lesson.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "04d27909-3e55-4d6d-8224-69d04305097f"
    revision: 1
    status: active
    type: single-choice
    prompt: "A summarising agent reads a web page with hidden text saying to ignore its instructions and email the customer list. Which attack class is this?"
    options:
      - id: direct
        text: "Direct prompt injection typed by the user into chat"
      - id: indirect
        text: "Indirect prompt injection planted inside retrieved content"
      - id: agency
        text: "Excessive agency caused by granting too many permissions"
      - id: leakage
        text: "System prompt leakage exposing the hidden instructions to users"
    correctOptionIds: [indirect]
    explanation: "The attacker never talked to the agent. They hid instructions in content the agent retrieved, which is indirect prompt injection. Direct injection is tempting, but it requires the attacker to type the text into the chat themselves."
  - id: "f070ff85-4b9d-4426-afd4-45a261aa4953"
    revision: 1
    status: active
    type: single-choice
    prompt: "Why must the input guardrail scan retrieved documents, not just what the user types?"
    options:
      - id: trusted
        text: "Users are trusted, so only stored documents can carry attacks"
      - id: indexed
        text: "Search indexes already filter out hostile text before retrieval"
      - id: later
        text: "Documents are scanned later by the output guardrail instead"
      - id: confusion
        text: "The model can mistake text in a document for an instruction"
    correctOptionIds: [confusion]
    explanation: "The model cannot reliably separate data from commands, so attacker text inside a document can be followed as an instruction. Relying on the output guardrail alone is tempting, but by then the tainted content has already shaped the plan."
  - id: "35c67193-182d-4101-a70e-9e3e928ebda1"
    revision: 1
    status: active
    type: single-choice
    prompt: "A read-only documentation assistant was handed a token that can also write to the production database. Which fix does the lesson favour?"
    options:
      - id: least-privilege
        text: "Apply least privilege and remove the write permission"
      - id: prompt-rule
        text: "Add a firmer line to the system prompt forbidding writes"
      - id: bigger-model
        text: "Switch to a larger model that obeys instructions better"
      - id: more-regex
        text: "Extend the injection regex list with more banned phrases"
    correctOptionIds: [least-privilege]
    explanation: "Excessive agency is fixed by shrinking what the agent can do, not by hoping it behaves. A stricter prompt is tempting, but a prompt is only a request and an injected instruction can override it."
  - id: "b6d3b377-e3bb-446c-ba0a-960103266764"
    revision: 1
    status: active
    type: single-choice
    prompt: "A tool response says the user approved the action and the database should be sent now. What should the gateway do?"
    options:
      - id: registered
        text: "Accept it, because the calling tool is registered in the registry"
      - id: logged
        text: "Accept it once the audit log has recorded the claim"
      - id: out-of-band
        text: "Ignore the claim and require approval via a separate channel"
      - id: medium
        text: "Accept it when the tool's declared risk level is only medium"
    correctOptionIds: [out-of-band]
    explanation: "Tool output is data, not authority, so a claim of approval inside it proves nothing. Approval must arrive through the authenticated user session on a separate control path. Logging the claim is tempting but only records the forgery."
  - id: "ce1dc22c-4a10-4d1f-956c-2f4204e8474b"
    revision: 1
    status: active
    type: single-choice
    prompt: "An attacker edits only the output field of entry 50 in a hash-chained audit file. What does a full chain verification do?"
    options:
      - id: independent
        text: "Passes, because each line is verified independently of every other line"
      - id: fails
        text: "Fails at entry 50, because its recomputed hash no longer matches"
      - id: last-only
        text: "Passes, because only the final entry's hash is ever recomputed"
      - id: repairs
        text: "Repairs the entry by copying the hash from the previous line"
    correctOptionIds: [fails]
    explanation: "Verification recomputes each entry's hash from its content and the previous hash, so an edited entry no longer matches its stored hash and the check fails. Checking lines independently is a tempting idea, but the chain exists precisely to link them."
  - id: "d4a413ad-035d-4863-9480-dc44dcabd913"
    revision: 1
    status: active
    type: single-choice
    prompt: "You must run untrusted user code in production. Which sandbox approach does the lesson recommend?"
    options:
      - id: stripped-env
        text: "A subprocess with stripped environment variables and a short PATH"
      - id: denylist
        text: "A subprocess with a long denylist of dangerous binary names"
      - id: timeout
        text: "The host Python interpreter with a five-second timeout"
      - id: isolation
        text: "Docker rootless, gVisor, or a microVM service such as E2B"
    correctOptionIds: [isolation]
    explanation: "Real isolation needs a container, gVisor, or a microVM boundary. A subprocess with a stripped environment is a toy for learning and shares the host, and a denylist cannot list every dangerous binary."
  - id: "4363c716-bf8c-4949-bc4c-947cbb783fef"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your MCP server holds a user's access token and must call a downstream API. What should it do?"
    options:
      - id: scoped
        text: "Never forward it unchanged; use a narrowly scoped token instead"
      - id: forward
        text: "Pass it through so the downstream API sees the real user identity"
      - id: same-team
        text: "Pass it through only when both services belong to one team"
      - id: unexpired
        text: "Pass it through after checking that it has not expired"
    correctOptionIds: [scoped]
    explanation: "Token passthrough is the anti-pattern: the downstream service cannot tell whose authority is really in use, which enables a confused deputy. Checking expiry or shared ownership does not fix that."
  - id: "7a5bfa86-946e-4557-a5dc-9a8972a272b3"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which actions need human approval first under the lesson's hard rules? Select every correct answer."
    options:
      - id: delete
        text: "Deleting, moving, or overwriting a file"
      - id: search
        text: "Searching the company knowledge base for pricing"
      - id: send
        text: "Sending an external email, message, or post"
      - id: shell
        text: "Running a shell command that is not on an allowlist"
      - id: summarise
        text: "Summarising a local file and showing the result"
    correctOptionIds: [delete, send, shell]
    explanation: "Deleting or overwriting, sending outside messages, and unallowlisted shell commands are external or destructive actions that need approval. Searching and summarising are read-only, so they are auto-approved, although tempting to gate."
  - id: "af63352a-7039-44de-9883-671ece43b1ca"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which checks belong in the output guardrail? Select every correct answer."
    options:
      - id: unicode
        text: "Matching zero-width characters hidden in retrieved documents"
      - id: secrets
        text: "Blocking responses that contain a pattern such as an AWS key"
      - id: harmful
        text: "Blocking responses with harmful content before they are shown"
      - id: scope
        text: "Comparing the agent's role to the tool's permission scope"
    correctOptionIds: [secrets, harmful]
    explanation: "The output guardrail inspects what the model produced: leaked secrets and harmful content. Hidden Unicode belongs to the input guard, and the scope comparison belongs to the tool permission check, even though both are also guardrails."
  - id: "0e7ab32a-b943-4ad2-ab0a-9d32dbe103fd"
    revision: 1
    status: active
    type: true-false
    prompt: "A system prompt is a safe place to store an API key, because users cannot extract it from the model."
    answer: false
    explanation: "Treat system prompts as readable by users; extraction is expected, and OWASP lists system prompt leakage as its own risk. Secrets belong in environment variables or a vault instead."
  - id: "f01e9b11-fd5a-4fce-96e3-5e79f4737b91"
    revision: 1
    status: active
    type: free-recall
    prompt: "A retrieved web page contains hidden text telling the agent to email the customer database. Name at least three layers that should stop this and say what each does."
    sampleAnswer: "The input guardrail scans retrieved content and trips on the injection phrase. The email tool needs human approval through a separate authenticated channel, so it cannot fire alone. The output guardrail can catch leaked data, the audit log records the attempt, and a network egress allowlist stops the message reaching the attacker."
    explanation: "A strong answer shows defence in depth: no single control is trusted, and each layer limits damage if another misses."
  - id: "3fcbc79f-a1ce-4660-952f-380a88090951"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: why does a safe agent need a boundary around the model instead of a better prompt, and what are the main layers of that boundary?"
    sampleAnswer: "A prompt is only a request, and the model can be tricked by injected text or can simply err, so safety must come from code that limits what the agent can do. The boundary has input checks on user and retrieved content, scoped tool permissions with out-of-band approval, a sandbox, output checks, and a tamper-evident audit log."
    explanation: "The key idea is that guardrails are enforced outside the model. Each layer is imperfect alone, so they work together as defence in depth."
```

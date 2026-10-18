---
id: "4e081c1d-73d2-49d7-bfd0-25500ca315ed"
title: "Prompting, Structured Output, and Evals Question Bank"
description: "Practice questions for Prompting, Structured Output, and Evals."
type: question-bank
publish: true
status: active
created: "2026-10-18"
tags:
  - ai-agents
courseId: "d28ed363-de32-4f9c-9f2f-1418ed881df0"
---

These questions practise message roles, structured output, validation, evals, and prompt-injection defense.

```knowledge-question-bank
schemaVersion: 1
questions:
  - id: "9c116595-a59f-493e-ac5d-80e5aa438cd4"
    revision: 1
    status: active
    type: single-choice
    prompt: "An invoice extractor receives pasted text from the public. In which part of the chat request should that text go?"
    options:
      - id: system-role
        text: "In the system message, appended to the policy text"
      - id: user-role
        text: "In a user message, handled as data not commands"
      - id: assistant-role
        text: "In an assistant message, as earlier model output"
    correctOptionIds: [user-role]
    explanation: "Public text is untrusted input, so it belongs in the user role and is treated like form input from the internet. Appending it to the system message is tempting but gives attacker-controlled text the same standing as your own policy."
  - id: "cd59c559-a7e2-41fc-868a-1440707e579b"
    revision: 1
    status: active
    type: single-choice
    prompt: "Your extractor keeps misreading day-month-year dates. Which change best uses few-shot prompting?"
    options:
      - id: vague-warning
        text: "Add the line 'be careful with dates' to the system prompt"
      - id: temperature
        text: "Raise the sampling temperature so the model explores more"
      - id: worked-examples
        text: "Show two or three worked input-to-output date examples"
    correctOptionIds: [worked-examples]
    explanation: "Models generalise from concrete input-to-output patterns better than from abstract warnings, so a few worked examples teach the date convention. A vague warning is the tempting option, but it gives the model no pattern to copy."
  - id: "9c815821-c44a-40d3-b68e-d4e71cd7b6e1"
    revision: 2
    status: active
    type: single-choice
    prompt: "With OpenAI strict Structured Outputs turned on, what is guaranteed about a reply?"
    options:
      - id: shape-only
        text: "It is valid JSON that conforms to your schema"
      - id: values-correct
        text: "Every value in it is factually right for the input"
      - id: totals-match
        text: "Its totals already match the sum of the line items"
    correctOptionIds: [shape-only]
    explanation: "Strict mode guarantees the shape: valid JSON that follows the schema, apart from refusals and replies cut off early. It says nothing about whether the values are correct or consistent with each other, which is why a separate validation layer is still needed."
  - id: "8ae66259-5336-453b-8006-9e523d29d886"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which measures belong in a layered defense against prompt injection? Select every correct answer."
    options:
      - id: limit-tools
        text: "Give the extractor read-only tools with minimal capabilities"
      - id: prompt-only
        text: "Rely on a system line forbidding user instructions"
      - id: validate-output
        text: "Validate model output against a strict schema and enums"
      - id: human-approval
        text: "Route actions such as payments to a human approval queue"
    correctOptionIds: [limit-tools, validate-output, human-approval]
    explanation: "Capability limits, output validation, and human approval each work even when the model is fooled. A system line forbidding user instructions is only a hint: the model cannot reliably tell legitimate context from disguised instructions."
  - id: "92c220ae-ec07-4dbd-a3ea-95483cd89161"
    revision: 1
    status: active
    type: single-choice
    prompt: "A reply has the right shape, but its total is 60.00 while the line items sum to 52.00. Which layer should catch this?"
    options:
      - id: constrained-decoding
        text: "Constrained decoding that enforces the JSON Schema on the reply"
      - id: prompt-line
        text: "A system prompt line saying to be careful with sums"
      - id: temperature-zero
        text: "A lower sampling temperature on the same request"
      - id: model-validator
        text: "A Pydantic model validator that recomputes the total"
    correctOptionIds: [model-validator]
    explanation: "A cross-field rule such as total versus line items is a meaning check, and a Pydantic model validator is where it belongs. Constrained decoding only enforces shape, so a wrong but well-formed total passes straight through it."
  - id: "c5c9af4e-beae-4348-9d7a-18b2f3f29308"
    revision: 1
    status: active
    type: single-choice
    prompt: "A reply fails validation. Which corrective retry gives the model the best chance of repairing it?"
    options:
      - id: identical-resend
        text: "Resend the identical request unchanged and hope for a better sample"
      - id: error-feedback
        text: "Send the failed reply with its error text and ask for a fix"
      - id: many-retries
        text: "Retry up to ten times until one reply happens to validate"
    correctOptionIds: [error-feedback]
    explanation: "Showing the model its failed output and the validator's error text tells it exactly what to repair, and one such retry usually fixes semantic mistakes. Blind resends ignore that information, and many retries usually signal a prompt problem."
  - id: "cf0c0a27-a729-4c4c-8dd3-66acdc44da0d"
    revision: 1
    status: active
    type: true-false
    prompt: "Telling the model in the system prompt never to follow instructions found in user text is, on its own, a reliable defense against prompt injection."
    answer: false
    explanation: "The model has no dependable way to tell legitimate context from instructions disguised as context, so a prompt-only defense eventually fails. Real protection layers content separation, capability limits, output validation, and human approval."
  - id: "e8f2f066-eac7-4982-b603-50379edb152b"
    revision: 1
    status: active
    type: single-choice
    prompt: "An invoice with comma decimals extracts a wrong total in production. What turns this bug into lasting protection?"
    options:
      - id: patch-and-ship
        text: "Patch the system prompt and ship without a rerun"
      - id: one-off-regex
        text: "Add a regex post-processor for that one customer"
      - id: add-regression-case
        text: "Add the failing input to the eval set as a case"
    correctOptionIds: [add-regression-case]
    explanation: "Adding the failing input to the eval set makes it a regression test that runs on every later change, so the bug cannot silently return. Patching the prompt without a rerun fixes today's case but proves nothing about tomorrow's."
  - id: "503ca430-3680-45ba-bd31-94ed7e776f59"
    revision: 1
    status: active
    type: free-recall
    prompt: "A prompt tweak fixed the three invoices you tried by hand. Explain why you should still run the full eval set before shipping it."
    sampleAnswer: "Three hand-picked cases cannot show whether the tweak broke other kinds of input such as ambiguous, messy, or injection cases. Running the whole eval set gives a pass rate you can compare before and after, so you can tell whether the change really improved things."
    explanation: "The key idea is that evals are the unit tests of AI: they reveal regressions on cases you did not try, and without them you cannot tell whether an improvement helped or hurt overall."
  - id: "fe27c5a0-ce7c-44b3-97dc-3173c06fa4d7"
    revision: 1
    status: active
    type: single-choice
    prompt: "Invoice text told the model to set the currency to BTC and the model obeyed, yet the bad value never reached the database. Which layer stopped it?"
    options:
      - id: output-validation
        text: "Output validation, where the currency enum rejects BTC"
      - id: system-warning
        text: "The system prompt telling the model to ignore any commands"
      - id: few-shot-example
        text: "The few-shot example showing a normal USD invoice"
    correctOptionIds: [output-validation]
    explanation: "A currency field limited to a fixed list of codes refuses BTC even when the model is fooled, so validation protects you after the model fails. The system prompt warning is the tempting answer, but by the scenario it already failed."
  - id: "ab0e3875-6650-4801-99cf-46fea790a4ff"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Why keep a Pydantic validation step even when strict Structured Outputs is on? Select every correct answer."
    options:
      - id: shape-not-sense
        text: "Strict mode guarantees shape, not that values are sensible"
      - id: values-guaranteed
        text: "Strict mode already guarantees every extracted value is right"
      - id: business-rules
        text: "Pydantic can enforce rules such as totals matching items"
      - id: api-requires-it
        text: "The API refuses to accept a schema without Pydantic"
    correctOptionIds: [shape-not-sense, business-rules]
    explanation: "Schema enforcement covers shape and Pydantic adds meaning, such as cross-field consistency. The belief that strict mode guarantees correct values is tempting, but it only guarantees conformance to the schema."
  - id: "9430cb56-16f3-40ff-aeb6-8c090f275811"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain it back: in your own words, describe how a system prompt, structured output with validation, an eval set, and layered injection defense together make an LLM feature trustworthy."
    sampleAnswer: "The system prompt pins the role and tells the model to treat user text as data. Structured output fixes the shape and a validator such as Pydantic checks meaning, with one corrective retry. An eval set run on every change shows whether things improved or regressed. Since a prompt alone cannot stop injection, I add read-only capabilities, output validation, and human approval for sensitive actions."
    explanation: "A strong answer names all four habits and what each does, and notes that no single layer is enough: shape, meaning, regression testing, and injection defense each guard against a different failure."
```

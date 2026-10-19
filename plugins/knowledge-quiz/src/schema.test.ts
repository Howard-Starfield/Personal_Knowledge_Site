import assert from "node:assert/strict"
import test from "node:test"
import {
  buildQuestionBankRegistry,
  parseQuestionBankBlock,
  parseQuizSelectionBlock,
  resolveQuiz,
} from "./schema.ts"
import { renderQuiz } from "./render.ts"

const bankId = "14717b34-60f5-42fe-a905-5c11bd8bd2e4"
const firstQuestionId = "8c43eef4-dd5a-4c5b-83aa-bb358c402a22"
const secondQuestionId = "7d2b361a-d35e-456a-a88a-d9cbef8a83e9"

const validBank = `
schemaVersion: 1
questions:
  - id: "${firstQuestionId}"
    revision: 1
    status: active
    type: single-choice
    prompt: "Which boundary failed first?"
    options:
      - id: retrieval
        text: "Evidence selection"
      - id: wording
        text: "Answer wording"
    correctOptionIds: [retrieval]
    explanation: "Inspect evidence selection before answer wording."
  - id: "${secondQuestionId}"
    revision: 1
    status: active
    type: multiple-select
    prompt: "Which checks belong in the loop?"
    options:
      - id: evidence
        text: "Check selected evidence"
      - id: answer
        text: "Check answer use"
      - id: color
        text: "Change the card color"
    correctOptionIds: [evidence, answer]
    explanation: "The loop separates evidence selection from answer use."
`

test("parses and resolves canonical bank-backed selections", () => {
  const bank = parseQuestionBankBlock(validBank, bankId, "bank.md")
  const selection = parseQuizSelectionBlock(
    `schemaVersion: 1
quizId: "16575d31-97fb-4321-877e-9a923a07276d"
title: "Evidence loop check"
questionBankId: "${bankId}"
questionIds:
  - "${secondQuestionId}"
  - "${firstQuestionId}"
`,
    "lesson.md",
  )
  const resolved = resolveQuiz(selection, buildQuestionBankRegistry([bank]))
  assert.deepEqual(
    resolved.questions.map((question) => question.id),
    [secondQuestionId, firstQuestionId],
  )
})

test("rejects an answer key that names an unknown option", () => {
  assert.throws(
    () => parseQuestionBankBlock(validBank.replace("[retrieval]", "[missing]"), bankId, "bank.md"),
    /references unknown option ID/,
  )
})

test("rejects unknown fields instead of silently accepting schema drift", () => {
  assert.throws(
    () =>
      parseQuestionBankBlock(
        validBank.replace("schemaVersion: 1", "schemaVersion: 1\nsurprise: true"),
        bankId,
        "bank.md",
      ),
    /unknown field/,
  )
})

test("rejects duplicate question ownership across banks", () => {
  const first = parseQuestionBankBlock(validBank, bankId, "first.md")
  const second = parseQuestionBankBlock(
    validBank,
    "266f2b6b-01a0-48e2-b680-a3171f4ca62c",
    "second.md",
  )
  assert.throws(() => buildQuestionBankRegistry([first, second]), /already owned/)
})

test("rejects retired questions selected by a quiz", () => {
  const bank = parseQuestionBankBlock(
    validBank.replace("status: active", "status: retired"),
    bankId,
    "bank.md",
  )
  const selection = parseQuizSelectionBlock(
    `schemaVersion: 1
quizId: "16575d31-97fb-4321-877e-9a923a07276d"
title: "Evidence loop check"
questionBankId: "${bankId}"
questionIds: ["${firstQuestionId}"]
`,
    "lesson.md",
  )
  assert.throws(() => resolveQuiz(selection, buildQuestionBankRegistry([bank])), /selects retired/)
})

test("accepts true-false and free-recall answer fields", () => {
  const bank = parseQuestionBankBlock(
    `schemaVersion: 1
questions:
  - id: "${firstQuestionId}"
    revision: 1
    status: active
    type: true-false
    prompt: "Separate checks improve diagnosis."
    answer: true
    explanation: "Separate stages identify the earliest failure."
  - id: "${secondQuestionId}"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why one change matters."
    sampleAnswer: "It isolates the likely cause."
    explanation: "Holding other decisions constant improves diagnosis."
`,
    bankId,
    "bank.md",
  )
  assert.equal(bank.questions[0]?.type, "true-false")
  assert.equal(bank.questions[1]?.type, "free-recall")
})

test("rejects a multiple-select item without an incorrect option", () => {
  assert.throws(
    () =>
      parseQuestionBankBlock(
        validBank.replace(
          "correctOptionIds: [evidence, answer]",
          "correctOptionIds: [evidence, answer, color]",
        ),
        bankId,
        "bank.md",
      ),
    /at least one incorrect option/,
  )
})

test("renders compact quiz without dead space or manual check buttons", () => {
  const bank = parseQuestionBankBlock(validBank, bankId, "bank.md")
  const selection = parseQuizSelectionBlock(
    `schemaVersion: 1
quizId: "16575d31-97fb-4321-877e-9a923a07276d"
title: "Evidence loop check"
questionBankId: "${bankId}"
questionIds:
  - "${firstQuestionId}"
`,
    "lesson.md",
  )
  const resolved = resolveQuiz(selection, buildQuestionBankRegistry([bank]))
  const tree = renderQuiz(resolved)
  const json = JSON.stringify(tree)

  // Invariants: No dead space elements
  assert.equal(json.includes("knowledge-quiz__eyebrow"), false)
  assert.equal(json.includes('"knowledge-quiz__progress"'), false)
  assert.equal(json.includes("knowledge-quiz__question-meta"), false)
  assert.equal(json.includes("knowledge-quiz__primary"), false)
  assert.equal(json.includes("Check answer"), false)

  // Invariants: Header and options
  assert.equal(json.includes("knowledge-quiz__meta-row"), false)
  assert.equal(json.includes("1 of 1 · 0 correct"), false)
  assert.equal(json.includes("1 / 1"), true)
  assert.equal(json.includes("data-option-id"), true)
  assert.equal(json.includes("knowledge-quiz__progress-track"), true)
  assert.equal(json.includes("knowledge-quiz__segment"), true)
  assert.equal(json.includes("knowledge-quiz__option-letter"), true)
  assert.equal(json.includes("knowledge-quiz__option-hint"), true)
  assert.equal(json.includes("knowledge-quiz__next-btn"), true)
  assert.equal(json.includes("A."), true)
})

import assert from "node:assert/strict"
import test from "node:test"
import {
  buildQuestionBankRegistry,
  parseQuestionBankBlock,
  parseQuizSelectionBlock,
  resolveQuiz,
} from "./schema.ts"
import { renderQuestionBank, renderQuiz } from "./render.ts"

const bankId = "14717b34-60f5-42fe-a905-5c11bd8bd2e4"
const recallQuestionId = "8c43eef4-dd5a-4c5b-83aa-bb358c402a22"
const choiceQuestionId = "7d2b361a-d35e-456a-a88a-d9cbef8a83e9"

const bank = `
schemaVersion: 1
questions:
  - id: "${recallQuestionId}"
    revision: 1
    status: active
    type: free-recall
    prompt: "Explain why one change matters."
    sampleAnswer: "It isolates the likely cause."
    explanation: "Holding other decisions constant improves diagnosis."
  - id: "${choiceQuestionId}"
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
`

function resolved() {
  const parsed = parseQuestionBankBlock(bank, bankId, "bank.md")
  const selection = parseQuizSelectionBlock(
    `schemaVersion: 1
quizId: "16575d31-97fb-4321-877e-9a923a07276d"
title: "Evidence loop check"
questionBankId: "${bankId}"
questionIds:
  - "${recallQuestionId}"
  - "${choiceQuestionId}"
`,
    "lesson.md",
  )
  return resolveQuiz(selection, buildQuestionBankRegistry([parsed]))
}

test("a case question is laid out like a multiple-choice question", () => {
  const json = JSON.stringify(renderQuiz(resolved()))

  // The same element, with the same class, for every question type.
  const legends = json.match(/"tagName":"legend"/g) ?? []
  assert.equal(legends.length, 2)
  assert.equal(
    json.includes('"tagName":"legend","properties":{"className":["knowledge-quiz__prompt"]}'),
    true,
  )
  assert.equal(
    json.includes('"tagName":"fieldset","properties":{"className":["knowledge-quiz__fieldset"]}'),
    true,
  )

  // The reader still gets a field to write in, a reveal button, and the
  // fallback the client script opens.
  assert.equal(json.includes('"tagName":"textarea"'), true)
  assert.equal(json.includes("data-quiz-reveal"), true)
  assert.equal(json.includes("knowledge-quiz__fallback"), true)
  assert.equal(json.includes("knowledge-quiz__sr-only"), true)
})

test("a sample answer is a code block and an objective answer is not", () => {
  const json = JSON.stringify(renderQuiz(resolved()))

  assert.equal(
    json.includes(
      '"tagName":"pre","properties":{"className":["knowledge-quiz__answer","knowledge-quiz__answer--code"]}',
    ),
    true,
  )
  assert.equal(
    json.includes('"tagName":"p","properties":{"className":["knowledge-quiz__answer"]}'),
    true,
  )
  // The sample answer carries no "Answer: " prefix, because the summary
  // already says that it is the sample answer. The objective answer keeps it,
  // so the prefix appears exactly once.
  assert.equal((json.match(/Answer: /g) ?? []).length, 1)
})

test("the public answer key uses the same answer block and prompt class", () => {
  const parsed = parseQuestionBankBlock(bank, bankId, "bank.md")
  const json = JSON.stringify(renderQuestionBank(parsed))

  assert.equal(json.includes("knowledge-quiz__answer--code"), true)
  assert.equal(json.includes("knowledge-question-bank__prompt"), true)
})

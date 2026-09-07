import YAML from "yaml"

export const quizSchemaVersion = 1

const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const optionId = /^[a-z][a-z0-9_-]{0,31}$/
const rawHtml = /<\/?[a-z][^>]*>/i

type QuestionStatus = "active" | "retired"

export interface QuizOption {
  id: string
  text: string
}

interface QuestionBase {
  id: string
  revision: number
  status: QuestionStatus
  prompt: string
  explanation: string
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single-choice"
  options: QuizOption[]
  correctOptionIds: [string]
}

export interface MultipleSelectQuestion extends QuestionBase {
  type: "multiple-select"
  options: QuizOption[]
  correctOptionIds: string[]
}

export interface TrueFalseQuestion extends QuestionBase {
  type: "true-false"
  answer: boolean
}

export interface FreeRecallQuestion extends QuestionBase {
  type: "free-recall"
  sampleAnswer: string
}

export type KnowledgeQuestion =
  SingleChoiceQuestion | MultipleSelectQuestion | TrueFalseQuestion | FreeRecallQuestion

export interface QuestionBankDefinition {
  schemaVersion: 1
  bankId: string
  questions: KnowledgeQuestion[]
  source: string
}

export interface QuizSelection {
  schemaVersion: 1
  quizId: string
  title: string
  questionBankId: string
  questionIds: string[]
  source: string
}

function fail(source: string, message: string): never {
  throw new Error(`${source}: ${message}`)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function field(record: Record<string, unknown>, key: string): unknown {
  return Reflect.get(record, key)
}

function assertExactKeys(
  record: Record<string, unknown>,
  allowed: readonly string[],
  source: string,
): void {
  const allowedKeys = new Set(allowed)
  const unexpected = Object.keys(record).filter((key) => !allowedKeys.has(key))
  if (unexpected.length > 0) fail(source, `unknown field(s): ${unexpected.join(", ")}`)
}

function readRecord(value: unknown, source: string): Record<string, unknown> {
  if (!isRecord(value)) fail(source, "must be a mapping")
  return value
}

function readArray(value: unknown, source: string): unknown[] {
  if (!Array.isArray(value)) fail(source, "must be an array")
  return value
}

function readText(value: unknown, source: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    fail(source, "must be a non-empty string")
  }
  if (rawHtml.test(value)) fail(source, "must be plain text, not raw HTML")
  return value.trim()
}

function readUuid(value: unknown, source: string): string {
  const parsed = readText(value, source)
  if (!uuidV4.test(parsed)) fail(source, "must be a lower-case UUIDv4")
  return parsed
}

function readPositiveInteger(value: unknown, source: string): number {
  if (!Number.isInteger(value) || typeof value !== "number" || value <= 0) {
    fail(source, "must be a positive integer")
  }
  return value
}

function readStatus(value: unknown, source: string): QuestionStatus {
  if (value !== "active" && value !== "retired") fail(source, "must be active or retired")
  return value
}

function readSchemaVersion(value: unknown, source: string): 1 {
  if (value !== quizSchemaVersion) fail(source, `must equal ${quizSchemaVersion}`)
  return quizSchemaVersion
}

function readOptions(value: unknown, source: string): QuizOption[] {
  const values = readArray(value, source)
  const options = values.map((candidate, index) => {
    const optionSource = `${source}[${index}]`
    const record = readRecord(candidate, optionSource)
    assertExactKeys(record, ["id", "text"], optionSource)
    const id = readText(field(record, "id"), `${optionSource}.id`)
    if (!optionId.test(id)) {
      fail(
        `${optionSource}.id`,
        "must start with a lower-case letter and use letters, digits, _ or -",
      )
    }
    return { id, text: readText(field(record, "text"), `${optionSource}.text`) }
  })
  const ids = new Set(options.map((option) => option.id))
  if (ids.size !== options.length) fail(source, "option IDs must be unique")
  return options
}

function readCorrectOptionIds(value: unknown, options: QuizOption[], source: string): string[] {
  const values = readArray(value, source)
  const ids = values.map((candidate, index) => readText(candidate, `${source}[${index}]`))
  if (new Set(ids).size !== ids.length) fail(source, "must not contain duplicate option IDs")
  const available = new Set(options.map((option) => option.id))
  for (const id of ids) {
    if (!available.has(id)) fail(source, `references unknown option ID "${id}"`)
  }
  return ids
}

function readQuestion(value: unknown, index: number, source: string): KnowledgeQuestion {
  const questionSource = `${source}.questions[${index}]`
  const record = readRecord(value, questionSource)
  const type = field(record, "type")
  const baseKeys = ["id", "revision", "status", "type", "prompt", "explanation"]
  const base = {
    id: readUuid(field(record, "id"), `${questionSource}.id`),
    revision: readPositiveInteger(field(record, "revision"), `${questionSource}.revision`),
    status: readStatus(field(record, "status"), `${questionSource}.status`),
    prompt: readText(field(record, "prompt"), `${questionSource}.prompt`),
    explanation: readText(field(record, "explanation"), `${questionSource}.explanation`),
  }

  if (type === "single-choice" || type === "multiple-select") {
    assertExactKeys(record, [...baseKeys, "options", "correctOptionIds"], questionSource)
    const options = readOptions(field(record, "options"), `${questionSource}.options`)
    const correctOptionIds = readCorrectOptionIds(
      field(record, "correctOptionIds"),
      options,
      `${questionSource}.correctOptionIds`,
    )
    if (type === "single-choice") {
      if (options.length < 2) fail(`${questionSource}.options`, "requires at least two options")
      if (correctOptionIds.length !== 1) {
        fail(`${questionSource}.correctOptionIds`, "requires exactly one answer")
      }
      const correctOptionId = correctOptionIds[0]
      if (correctOptionId === undefined) {
        fail(`${questionSource}.correctOptionIds`, "requires exactly one answer")
      }
      return { ...base, type, options, correctOptionIds: [correctOptionId] }
    }
    if (options.length < 3) fail(`${questionSource}.options`, "requires at least three options")
    if (correctOptionIds.length < 2) {
      fail(`${questionSource}.correctOptionIds`, "requires at least two answers")
    }
    if (correctOptionIds.length >= options.length) {
      fail(questionSource, "multiple-select requires at least one incorrect option")
    }
    return { ...base, type, options, correctOptionIds }
  }

  if (type === "true-false") {
    assertExactKeys(record, [...baseKeys, "answer"], questionSource)
    const answer = field(record, "answer")
    if (typeof answer !== "boolean") fail(`${questionSource}.answer`, "must be true or false")
    return { ...base, type, answer }
  }

  if (type === "free-recall") {
    assertExactKeys(record, [...baseKeys, "sampleAnswer"], questionSource)
    return {
      ...base,
      type,
      sampleAnswer: readText(field(record, "sampleAnswer"), `${questionSource}.sampleAnswer`),
    }
  }

  fail(
    `${questionSource}.type`,
    "must be single-choice, multiple-select, true-false, or free-recall",
  )
}

function parseYaml(sourceText: string, source: string): Record<string, unknown> {
  let parsed: unknown
  try {
    parsed = YAML.parse(sourceText)
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown YAML error"
    fail(source, `invalid YAML: ${detail}`)
  }
  return readRecord(parsed, source)
}

export function parseQuestionBankBlock(
  sourceText: string,
  bankId: unknown,
  source: string,
): QuestionBankDefinition {
  const record = parseYaml(sourceText, source)
  assertExactKeys(record, ["schemaVersion", "questions"], source)
  const questions = readArray(field(record, "questions"), `${source}.questions`).map(
    (question, index) => readQuestion(question, index, source),
  )
  if (questions.length === 0) fail(`${source}.questions`, "requires at least one question")
  const ids = new Set(questions.map((question) => question.id))
  if (ids.size !== questions.length) fail(`${source}.questions`, "question IDs must be unique")
  return {
    schemaVersion: readSchemaVersion(field(record, "schemaVersion"), `${source}.schemaVersion`),
    bankId: readUuid(bankId, `${source}.frontmatter.id`),
    questions,
    source,
  }
}

export function parseQuizSelectionBlock(sourceText: string, source: string): QuizSelection {
  const record = parseYaml(sourceText, source)
  assertExactKeys(
    record,
    ["schemaVersion", "quizId", "title", "questionBankId", "questionIds"],
    source,
  )
  const questionIds = readArray(field(record, "questionIds"), `${source}.questionIds`).map(
    (candidate, index) => readUuid(candidate, `${source}.questionIds[${index}]`),
  )
  if (questionIds.length === 0) fail(`${source}.questionIds`, "requires at least one question ID")
  if (new Set(questionIds).size !== questionIds.length) {
    fail(`${source}.questionIds`, "question IDs must be unique")
  }
  return {
    schemaVersion: readSchemaVersion(field(record, "schemaVersion"), `${source}.schemaVersion`),
    quizId: readUuid(field(record, "quizId"), `${source}.quizId`),
    title: readText(field(record, "title"), `${source}.title`),
    questionBankId: readUuid(field(record, "questionBankId"), `${source}.questionBankId`),
    questionIds,
    source,
  }
}

export interface ResolvedQuiz {
  selection: QuizSelection
  questions: KnowledgeQuestion[]
}

export function resolveQuiz(
  selection: QuizSelection,
  banks: ReadonlyMap<string, QuestionBankDefinition>,
): ResolvedQuiz {
  const bank = banks.get(selection.questionBankId)
  if (!bank)
    fail(selection.source, `references unknown question bank "${selection.questionBankId}"`)
  const questionsById = new Map(bank.questions.map((question) => [question.id, question]))
  const questions = selection.questionIds.map((questionId) => {
    const question = questionsById.get(questionId)
    if (!question) fail(selection.source, `references unknown question "${questionId}" in its bank`)
    if (question.status !== "active")
      fail(selection.source, `selects retired question "${questionId}"`)
    return question
  })
  return { selection, questions }
}

export function buildQuestionBankRegistry(
  banks: readonly QuestionBankDefinition[],
): ReadonlyMap<string, QuestionBankDefinition> {
  const registry = new Map<string, QuestionBankDefinition>()
  const questionOwners = new Map<string, string>()
  for (const bank of banks) {
    const existingBank = registry.get(bank.bankId)
    if (existingBank)
      fail(bank.source, `duplicates bank ID already owned by ${existingBank.source}`)
    registry.set(bank.bankId, bank)
    for (const question of bank.questions) {
      const existingOwner = questionOwners.get(question.id)
      if (existingOwner)
        fail(bank.source, `question ${question.id} is already owned by ${existingOwner}`)
      questionOwners.set(question.id, bank.source)
    }
  }
  return registry
}

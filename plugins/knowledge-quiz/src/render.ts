import type { Element, ElementContent, Root } from "hast"
import type {
  KnowledgeQuestion,
  QuestionBankDefinition,
  QuizOption,
  ResolvedQuiz,
} from "./schema.ts"

function text(value: string): ElementContent {
  return { type: "text", value }
}

function element(
  tagName: string,
  properties: Element["properties"],
  children: ElementContent[] = [],
): Element {
  return { type: "element", tagName, properties, children }
}

function optionAnswer(question: KnowledgeQuestion): string {
  if (question.type === "true-false") return question.answer ? "True" : "False"
  if (question.type === "free-recall") return question.sampleAnswer
  const correct = new Set(question.correctOptionIds)
  return question.options
    .filter((option) => correct.has(option.id))
    .map((option) => option.text)
    .join("; ")
}

function fallbackDetails(question: KnowledgeQuestion): Element {
  return element("details", { className: ["knowledge-quiz__fallback"] }, [
    element("summary", {}, [
      text(question.type === "free-recall" ? "Sample answer" : "Answer and explanation"),
    ]),
    answerElement(question),
    element("p", {}, [text(question.explanation)]),
  ])
}

/**
 * The answer, in the shape the reader should meet it.
 *
 * A free-recall answer is prose, so it is set as a block: the same font and
 * the same panel as a multiple-choice option, with the answer as one
 * continuous sentence rather than a lettered list.
 */
function answerElement(question: KnowledgeQuestion): Element {
  if (question.type === "free-recall") {
    return element(
      "pre",
      { className: ["knowledge-quiz__answer", "knowledge-quiz__answer--code"] },
      [text(optionAnswer(question))],
    )
  }
  return element("p", { className: ["knowledge-quiz__answer"] }, [
    element("strong", {}, [text("Answer: ")]),
    text(optionAnswer(question)),
  ])
}

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"]

/**
 * The question, set the same way for every question type.
 *
 * A legend inside the fieldset is what gives an objective question its
 * weight and its spacing, so a free-recall question uses the same element and
 * the same class rather than a look of its own.
 */
function promptElement(index: number, prompt: string): Element {
  return element("legend", { className: ["knowledge-quiz__prompt"] }, [
    text(`${index + 1}. ${prompt}`),
  ])
}

function choiceInput(
  quizId: string,
  question: KnowledgeQuestion,
  option: QuizOption,
  inputType: "radio" | "checkbox",
  index: number,
): Element {
  const inputId = `quiz-${quizId}-${question.id}-${option.id}`
  const letter = OPTION_LETTERS[index] ?? String(index + 1)
  return element("label", { className: ["knowledge-quiz__option"], "data-option-id": option.id }, [
    element("input", {
      id: inputId,
      className: ["knowledge-quiz__sr-input"],
      type: inputType,
      name: `quiz-${quizId}-${question.id}`,
      value: option.id,
    }),
    element("div", { className: ["knowledge-quiz__option-body"] }, [
      element("div", { className: ["knowledge-quiz__option-header"] }, [
        element("span", { className: ["knowledge-quiz__option-letter"] }, [text(`${letter}.`)]),
        element("span", { className: ["knowledge-quiz__option-text"] }, [text(option.text)]),
      ]),
      element(
        "div",
        { className: ["knowledge-quiz__option-hint"], "data-option-hint": "", hidden: true },
        [],
      ),
    ]),
  ])
}

function objectiveFieldset(quizId: string, question: KnowledgeQuestion, index: number): Element {
  if (question.type === "true-false") {
    const options: QuizOption[] = [
      { id: "true", text: "True" },
      { id: "false", text: "False" },
    ]
    return element("fieldset", { className: ["knowledge-quiz__fieldset"] }, [
      promptElement(index, question.prompt),
      ...options.map((option, idx) => choiceInput(quizId, question, option, "radio", idx)),
    ])
  }
  if (question.type === "free-recall") {
    throw new Error("Free-recall questions do not use objective answer fields")
  }
  const inputType = question.type === "single-choice" ? "radio" : "checkbox"
  return element("fieldset", { className: ["knowledge-quiz__fieldset"] }, [
    promptElement(index, question.prompt),
    ...question.options.map((option, idx) => choiceInput(quizId, question, option, inputType, idx)),
  ])
}

function questionElement(quizId: string, question: KnowledgeQuestion, index: number): Element {
  const answerIds =
    question.type === "single-choice" || question.type === "multiple-select"
      ? question.correctOptionIds.join("|")
      : question.type === "true-false"
        ? String(question.answer)
        : ""
  const response =
    question.type === "free-recall"
      ? element("fieldset", { className: ["knowledge-quiz__fieldset"] }, [
          promptElement(index, question.prompt),
          element("div", { className: ["knowledge-quiz__recall"] }, [
            element("label", { className: ["knowledge-quiz__recall-field"] }, [
              element("span", { className: ["knowledge-quiz__sr-only"] }, [
                text(`Your answer to question ${index + 1}`),
              ]),
              element("textarea", {
                id: `quiz-${quizId}-${question.id}-recall`,
                rows: 4,
                placeholder: "Write what you remember before revealing the sample answer.",
              }),
            ]),
            element(
              "button",
              {
                className: ["knowledge-quiz__reveal-btn"],
                type: "button",
                "data-quiz-reveal": "",
              },
              [text("Reveal sample answer")],
            ),
          ]),
        ])
      : objectiveFieldset(quizId, question, index)

  return element(
    "section",
    {
      className: ["knowledge-quiz__question"],
      "data-quiz-question": "",
      "data-question-id": question.id,
      "data-question-type": question.type,
      "data-correct-option-ids": answerIds,
      "data-question-index": String(index),
      "data-explanation": question.explanation,
    },
    [
      response,
      element(
        "div",
        {
          className: ["knowledge-quiz__feedback"],
          "data-quiz-feedback": "",
          role: "status",
          "aria-live": "polite",
          hidden: true,
        },
        [],
      ),
      element(
        "div",
        { className: ["knowledge-quiz__self-grade"], "data-self-grade": "", hidden: true },
        [
          element("button", { type: "button", "data-self-result": "correct" }, [text("I got it")]),
          element("button", { type: "button", "data-self-result": "review" }, [
            text("Review again"),
          ]),
        ],
      ),
      fallbackDetails(question),
    ],
  )
}

export function renderQuiz(resolved: ResolvedQuiz): Element {
  const { selection, questions } = resolved
  return element(
    "section",
    {
      className: ["knowledge-quiz"],
      "data-knowledge-quiz": "",
      "data-quiz-id": selection.quizId,
      "aria-label": selection.title,
    },
    [
      element("header", { className: ["knowledge-quiz__header"] }, [
        element("div", { className: ["knowledge-quiz__top-bar"] }, [
          element(
            "div",
            { className: ["knowledge-quiz__progress-track"], "data-quiz-track": "" },
            questions.map((_, i) =>
              element(
                "div",
                {
                  className: ["knowledge-quiz__segment"],
                  "data-segment-index": String(i),
                },
                [
                  element(
                    "span",
                    { className: ["knowledge-quiz__segment-icon"], "data-segment-icon": "" },
                    [],
                  ),
                  element("span", { className: ["knowledge-quiz__segment-bar"] }, []),
                ],
              ),
            ),
          ),
          element("div", { className: ["knowledge-quiz__counter"], "data-quiz-counter": "" }, [
            text(`1 / ${questions.length}`),
          ]),
        ]),
      ]),
      ...questions.map((question, index) => questionElement(selection.quizId, question, index)),
      element("div", { className: ["knowledge-quiz__controls"], "data-quiz-controls": "" }, [
        element("div", { className: ["knowledge-quiz__controls-left"] }, [
          element(
            "button",
            {
              className: ["knowledge-quiz__btn", "knowledge-quiz__reset"],
              type: "button",
              "data-quiz-reset": "",
            },
            [text("Reset")],
          ),
          element(
            "button",
            {
              className: ["knowledge-quiz__hint-toggle"],
              type: "button",
              "data-quiz-hint-toggle": "",
            },
            [text("Show explanation ▾")],
          ),
        ]),
        element("div", { className: ["knowledge-quiz__controls-right"] }, [
          element(
            "button",
            {
              className: ["knowledge-quiz__btn"],
              type: "button",
              "data-quiz-previous": "",
            },
            [text("Previous")],
          ),
          element(
            "button",
            {
              className: ["knowledge-quiz__btn", "knowledge-quiz__next-btn"],
              type: "button",
              "data-quiz-next": "",
            },
            [text("Next →")],
          ),
        ]),
      ]),
    ],
  )
}

export function renderQuestionBank(bank: QuestionBankDefinition): Element {
  return element("section", { className: ["knowledge-question-bank"] }, [
    element("p", { className: ["knowledge-question-bank__notice"] }, [
      text("Public answer key. Lessons select these questions by immutable ID."),
    ]),
    ...bank.questions.map((question, index) =>
      element("details", { className: ["knowledge-question-bank__item"] }, [
        element("summary", { className: ["knowledge-question-bank__prompt"] }, [
          text(`${index + 1}. ${question.prompt}`),
        ]),
        answerElement(question),
        element("p", {}, [text(question.explanation)]),
        element("p", { className: ["knowledge-question-bank__identity"] }, [
          text(`Question ID: ${question.id} · revision ${question.revision} · ${question.status}`),
        ]),
      ]),
    ),
  ])
}

export function replaceElement(root: Root, target: Element, replacement: Element): boolean {
  function visit(parent: Root | Element): boolean {
    for (let index = 0; index < parent.children.length; index += 1) {
      const child = parent.children[index]
      if (child === target) {
        parent.children[index] = replacement
        return true
      }
      if (child?.type === "element" && visit(child)) return true
    }
    return false
  }
  return visit(root)
}

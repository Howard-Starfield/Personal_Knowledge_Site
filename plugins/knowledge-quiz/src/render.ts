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
    element("p", { className: ["knowledge-quiz__answer"] }, [
      element("strong", {}, [text("Answer: ")]),
      text(optionAnswer(question)),
    ]),
    element("p", {}, [text(question.explanation)]),
  ])
}

function choiceInput(
  quizId: string,
  question: KnowledgeQuestion,
  option: QuizOption,
  inputType: "radio" | "checkbox",
): Element {
  const inputId = `quiz-${quizId}-${question.id}-${option.id}`
  return element("label", { className: ["knowledge-quiz__option"] }, [
    element("input", {
      id: inputId,
      type: inputType,
      name: `quiz-${quizId}-${question.id}`,
      value: option.id,
    }),
    element("span", {}, [text(option.text)]),
  ])
}

function objectiveFieldset(quizId: string, question: KnowledgeQuestion): Element {
  if (question.type === "true-false") {
    const options: QuizOption[] = [
      { id: "true", text: "True" },
      { id: "false", text: "False" },
    ]
    return element("fieldset", { className: ["knowledge-quiz__fieldset"] }, [
      element("legend", { className: ["knowledge-quiz__prompt"] }, [text(question.prompt)]),
      ...options.map((option) => choiceInput(quizId, question, option, "radio")),
    ])
  }
  if (question.type === "free-recall") {
    throw new Error("Free-recall questions do not use objective answer fields")
  }
  const inputType = question.type === "single-choice" ? "radio" : "checkbox"
  return element("fieldset", { className: ["knowledge-quiz__fieldset"] }, [
    element("legend", { className: ["knowledge-quiz__prompt"] }, [text(question.prompt)]),
    ...question.options.map((option) => choiceInput(quizId, question, option, inputType)),
  ])
}

function questionTypeLabel(question: KnowledgeQuestion): string {
  if (question.type === "single-choice") return "Choose one"
  if (question.type === "multiple-select") return "Choose every correct answer"
  if (question.type === "true-false") return "True or false"
  return "Free recall · self-graded"
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
      ? element("div", { className: ["knowledge-quiz__recall"] }, [
          element("label", {}, [
            element("span", { className: ["knowledge-quiz__prompt"] }, [text(question.prompt)]),
            element("textarea", {
              id: `quiz-${quizId}-${question.id}-recall`,
              rows: 5,
              placeholder: "Write what you remember before revealing the sample answer.",
            }),
          ]),
        ])
      : objectiveFieldset(quizId, question)

  return element(
    "section",
    {
      className: ["knowledge-quiz__question"],
      "data-quiz-question": "",
      "data-question-id": question.id,
      "data-question-type": question.type,
      "data-correct-option-ids": answerIds,
      "data-question-index": String(index),
    },
    [
      element("div", { className: ["knowledge-quiz__question-meta"] }, [
        element("span", {}, [text(`Question ${index + 1}`)]),
        element("span", {}, [text(questionTypeLabel(question))]),
      ]),
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
      "aria-labelledby": `quiz-${selection.quizId}-title`,
    },
    [
      element("header", { className: ["knowledge-quiz__header"] }, [
        element("div", {}, [
          element("p", { className: ["knowledge-quiz__eyebrow"] }, [text("Practice")]),
          element("h2", { id: `quiz-${selection.quizId}-title` }, [text(selection.title)]),
        ]),
        element("p", { className: ["knowledge-quiz__score"], "data-quiz-score": "" }, [
          text(`0 of ${questions.length} correct`),
        ]),
      ]),
      element(
        "div",
        {
          className: ["knowledge-quiz__progress"],
          "data-quiz-progress": "",
          "aria-label": "Quiz progress",
        },
        [],
      ),
      ...questions.map((question, index) => questionElement(selection.quizId, question, index)),
      element("div", { className: ["knowledge-quiz__controls"], "data-quiz-controls": "" }, [
        element("button", { type: "button", "data-quiz-previous": "" }, [text("Previous")]),
        element(
          "button",
          { className: ["knowledge-quiz__primary"], type: "button", "data-quiz-check": "" },
          [text("Check answer")],
        ),
        element("button", { type: "button", "data-quiz-next": "" }, [text("Next")]),
        element(
          "button",
          { className: ["knowledge-quiz__reset"], type: "button", "data-quiz-reset": "" },
          [text("Reset quiz")],
        ),
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
        element("summary", {}, [text(`${index + 1}. ${question.prompt}`)]),
        element("p", {}, [element("strong", {}, [text("Answer: ")]), text(optionAnswer(question))]),
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

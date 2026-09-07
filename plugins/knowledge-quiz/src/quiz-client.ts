type QuestionResult = "correct" | "review"

interface QuizController {
  dispose: () => void
}

type QueryRoot = Document | Element

function elements(root: QueryRoot, selector: string): HTMLElement[] {
  return Array.from(root.querySelectorAll(selector)).filter(
    (candidate): candidate is HTMLElement => candidate instanceof HTMLElement,
  )
}

function button(root: QueryRoot, selector: string): HTMLButtonElement | undefined {
  const candidate = root.querySelector(selector)
  return candidate instanceof HTMLButtonElement ? candidate : undefined
}

function selectedValues(question: HTMLElement): string[] {
  return Array.from(question.querySelectorAll("input:checked"))
    .filter((candidate): candidate is HTMLInputElement => candidate instanceof HTMLInputElement)
    .map((input) => input.value)
    .sort()
}

function expectedValues(question: HTMLElement): string[] {
  return (question.dataset.correctOptionIds ?? "").split("|").filter(Boolean).sort()
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function setupQuiz(root: HTMLElement): QuizController {
  const questions = elements(root, "[data-quiz-question]")
  const previous = button(root, "[data-quiz-previous]")
  const next = button(root, "[data-quiz-next]")
  const check = button(root, "[data-quiz-check]")
  const reset = button(root, "[data-quiz-reset]")
  const score = root.querySelector("[data-quiz-score]")
  const progress = root.querySelector("[data-quiz-progress]")
  if (
    !previous ||
    !next ||
    !check ||
    !reset ||
    !(score instanceof HTMLElement) ||
    !(progress instanceof HTMLElement)
  ) {
    return { dispose: () => undefined }
  }
  const previousButton = previous
  const nextButton = next
  const checkButton = check
  const resetButton = reset
  const scoreElement = score
  const progressElement = progress

  let currentIndex = 0
  const results = new Map<string, QuestionResult>()
  const cleanups: Array<() => void> = []

  function currentQuestion(): HTMLElement | undefined {
    return questions[currentIndex]
  }

  function resultKey(question: HTMLElement): string {
    return question.dataset.questionId ?? String(currentIndex)
  }

  function updateScore(): void {
    const correct = Array.from(results.values()).filter((result) => result === "correct").length
    const review = Array.from(results.values()).filter((result) => result === "review").length
    scoreElement.textContent = `${correct} of ${questions.length} correct${review > 0 ? ` · ${review} to review` : ""}`
  }

  function setFeedback(question: HTMLElement, result: QuestionResult, message: string): void {
    const feedback = question.querySelector("[data-quiz-feedback]")
    if (!(feedback instanceof HTMLElement)) return
    feedback.hidden = false
    feedback.dataset.result = result
    feedback.textContent = `${result === "correct" ? "✓ Correct." : "× Not yet."} ${message}`
    results.set(resultKey(question), result)
    updateScore()
  }

  function showFallback(question: HTMLElement): void {
    const fallback = question.querySelector(".knowledge-quiz__fallback")
    if (fallback instanceof HTMLDetailsElement) {
      fallback.hidden = false
      fallback.open = true
    }
  }

  function updateCheckState(): void {
    const question = currentQuestion()
    if (!question) return
    const type = question.dataset.questionType
    if (type === "free-recall") {
      const textarea = question.querySelector("textarea")
      checkButton.disabled =
        !(textarea instanceof HTMLTextAreaElement) || textarea.value.trim() === ""
      checkButton.textContent = "Reveal sample answer"
      return
    }
    checkButton.textContent = "Check answer"
    checkButton.disabled = selectedValues(question).length === 0
  }

  function renderCurrent(): void {
    questions.forEach((question, index) => {
      question.hidden = index !== currentIndex
    })
    previousButton.disabled = currentIndex === 0
    nextButton.disabled = currentIndex === questions.length - 1
    progressElement.replaceChildren()
    questions.forEach((question, index) => {
      const marker = document.createElement("span")
      marker.className = "knowledge-quiz__progress-marker"
      marker.dataset.state =
        index === currentIndex ? "current" : (results.get(resultKey(question)) ?? "pending")
      marker.textContent = String(index + 1)
      marker.setAttribute("aria-label", `Question ${index + 1}: ${marker.dataset.state}`)
      progressElement.append(marker)
    })
    updateCheckState()
  }

  function gradeCurrent(): void {
    const question = currentQuestion()
    if (!question) return
    if (question.dataset.questionType === "free-recall") {
      showFallback(question)
      const selfGrade = question.querySelector("[data-self-grade]")
      if (selfGrade instanceof HTMLElement) selfGrade.hidden = false
      checkButton.disabled = true
      return
    }
    const correct = arraysEqual(selectedValues(question), expectedValues(question))
    showFallback(question)
    setFeedback(
      question,
      correct ? "correct" : "review",
      correct
        ? "The selected answer matches the key."
        : "Review the explanation, change your selection, and check again.",
    )
    renderCurrent()
  }

  function move(delta: number): void {
    currentIndex = Math.max(0, Math.min(questions.length - 1, currentIndex + delta))
    renderCurrent()
    currentQuestion()?.focus({ preventScroll: true })
  }

  function resetQuiz(): void {
    results.clear()
    currentIndex = 0
    for (const question of questions) {
      question.querySelectorAll("input").forEach((candidate) => {
        if (candidate instanceof HTMLInputElement) candidate.checked = false
      })
      const textarea = question.querySelector("textarea")
      if (textarea instanceof HTMLTextAreaElement) textarea.value = ""
      const feedback = question.querySelector("[data-quiz-feedback]")
      if (feedback instanceof HTMLElement) {
        feedback.hidden = true
        feedback.textContent = ""
        delete feedback.dataset.result
      }
      const fallback = question.querySelector(".knowledge-quiz__fallback")
      if (fallback instanceof HTMLDetailsElement) {
        fallback.open = false
        fallback.hidden = true
      }
      const selfGrade = question.querySelector("[data-self-grade]")
      if (selfGrade instanceof HTMLElement) selfGrade.hidden = true
    }
    updateScore()
    renderCurrent()
  }

  const onPrevious = () => move(-1)
  const onNext = () => move(1)
  const onCheck = () => gradeCurrent()
  const onReset = () => resetQuiz()
  previousButton.addEventListener("click", onPrevious)
  nextButton.addEventListener("click", onNext)
  checkButton.addEventListener("click", onCheck)
  resetButton.addEventListener("click", onReset)
  cleanups.push(
    () => previousButton.removeEventListener("click", onPrevious),
    () => nextButton.removeEventListener("click", onNext),
    () => checkButton.removeEventListener("click", onCheck),
    () => resetButton.removeEventListener("click", onReset),
  )

  for (const question of questions) {
    const onInput = () => updateCheckState()
    question.addEventListener("input", onInput)
    cleanups.push(() => question.removeEventListener("input", onInput))
    for (const selfButton of elements(question, "[data-self-result]")) {
      if (!(selfButton instanceof HTMLButtonElement)) continue
      const onSelfGrade = () => {
        const result = selfButton.dataset.selfResult === "correct" ? "correct" : "review"
        setFeedback(
          question,
          result,
          result === "correct"
            ? "You marked this recall as understood."
            : "You marked this recall for another review.",
        )
        renderCurrent()
      }
      selfButton.addEventListener("click", onSelfGrade)
      cleanups.push(() => selfButton.removeEventListener("click", onSelfGrade))
    }
    const fallback = question.querySelector(".knowledge-quiz__fallback")
    if (fallback instanceof HTMLDetailsElement) fallback.hidden = true
    question.tabIndex = -1
  }

  root.dataset.enhanced = "true"
  updateScore()
  renderCurrent()
  return {
    dispose: () => {
      cleanups.forEach((cleanup) => cleanup())
      delete root.dataset.enhanced
    },
  }
}

let controllers: QuizController[] = []

function disposeAll(): void {
  controllers.forEach((controller) => controller.dispose())
  controllers = []
}

function initialize(): void {
  disposeAll()
  controllers = elements(document, "[data-knowledge-quiz]").map(setupQuiz)
  if (typeof window.addCleanup === "function") window.addCleanup(disposeAll)
}

document.addEventListener("nav", initialize)
document.addEventListener("render", initialize)
queueMicrotask(initialize)

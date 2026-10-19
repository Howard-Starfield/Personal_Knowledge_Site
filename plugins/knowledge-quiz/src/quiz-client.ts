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
  const reset = button(root, "[data-quiz-reset]")
  const score = root.querySelector("[data-quiz-score]")
  const counterElement = root.querySelector("[data-quiz-counter]")
  const segments = elements(root, ".knowledge-quiz__segment")
  const hintToggle = button(root, "[data-quiz-hint-toggle]")

  if (!previous || !next || !reset) {
    return { dispose: () => undefined }
  }
  const previousButton = previous
  const nextButton = next
  const resetButton = reset
  const scoreElement = score instanceof HTMLElement ? score : undefined

  let currentIndex = 0
  const results = new Map<string, QuestionResult>()
  const cleanups: Array<() => void> = []

  function currentQuestion(): HTMLElement | undefined {
    return questions[currentIndex]
  }

  function resultKey(question: HTMLElement): string {
    return question.dataset.questionId ?? String(currentIndex)
  }

  function renderSvgIcon(icon: HTMLElement, type: "incorrect" | "correct" | "none"): void {
    icon.textContent = ""
    if (type === "incorrect") {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "10")
      svg.setAttribute("height", "10")
      svg.setAttribute("viewBox", "0 0 10 10")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "#ffa9af")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      const l1 = document.createElementNS("http://www.w3.org/2000/svg", "line")
      l1.setAttribute("x1", "2")
      l1.setAttribute("y1", "2")
      l1.setAttribute("x2", "8")
      l1.setAttribute("y2", "8")
      const l2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
      l2.setAttribute("x1", "8")
      l2.setAttribute("y1", "2")
      l2.setAttribute("x2", "2")
      l2.setAttribute("y2", "8")
      svg.appendChild(l1)
      svg.appendChild(l2)
      icon.appendChild(svg)
    } else if (type === "correct") {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "10")
      svg.setAttribute("height", "10")
      svg.setAttribute("viewBox", "0 0 10 10")
      svg.setAttribute("fill", "none")
      svg.setAttribute("stroke", "#90e58c")
      svg.setAttribute("stroke-width", "2")
      svg.setAttribute("stroke-linecap", "round")
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline")
      poly.setAttribute("points", "2,5 4.5,7.5 8,2.5")
      svg.appendChild(poly)
      icon.appendChild(svg)
    }
  }

  function updateTrackAndCounter(): void {
    if (counterElement instanceof HTMLElement) {
      counterElement.textContent = `${currentIndex + 1} / ${questions.length}`
    }
    segments.forEach((segment, i) => {
      const q = questions[i]
      const res = q ? results.get(resultKey(q)) : undefined
      const icon = segment.querySelector("[data-segment-icon]")
      if (i === currentIndex) {
        segment.dataset.active = "true"
      } else {
        delete segment.dataset.active
      }
      if (res === "correct") {
        segment.dataset.status = "correct"
        if (icon instanceof HTMLElement) renderSvgIcon(icon, "correct")
      } else if (res === "review") {
        segment.dataset.status = "incorrect"
        if (icon instanceof HTMLElement) renderSvgIcon(icon, "incorrect")
      } else {
        delete segment.dataset.status
        if (icon instanceof HTMLElement) renderSvgIcon(icon, "none")
      }
    })
  }

  function updateScore(): void {
    const correct = Array.from(results.values()).filter((result) => result === "correct").length
    const review = Array.from(results.values()).filter((result) => result === "review").length
    const reviewText = review > 0 ? ` · ${review} to review` : ""
    if (scoreElement) {
      scoreElement.textContent = `${currentIndex + 1} of ${questions.length} · ${correct} correct${reviewText}`
    }
    updateTrackAndCounter()
  }

  function clearFeedback(question: HTMLElement): void {
    const feedback = question.querySelector("[data-quiz-feedback]")
    if (feedback instanceof HTMLElement) {
      feedback.hidden = true
      feedback.textContent = ""
      delete feedback.dataset.result
    }
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
      updateHintToggleState()
    }
  }

  function updateHintToggleState(): void {
    if (!hintToggle) return
    const cur = currentQuestion()
    if (!cur) return
    const fallback = cur.querySelector(".knowledge-quiz__fallback")
    if (fallback instanceof HTMLDetailsElement) {
      hintToggle.textContent = fallback.open ? "Hide explanation ▴" : "Show explanation ▾"
    }
  }

  function gradeQuestion(question: HTMLElement): void {
    const type = question.dataset.questionType
    if (type === "free-recall") return

    const selected = selectedValues(question)
    const expected = expectedValues(question)
    const optionLabels = elements(question, ".knowledge-quiz__option")
    const explanation = question.dataset.explanation ?? ""

    if (type === "single-choice" || type === "true-false") {
      if (selected.length === 0) {
        clearFeedback(question)
        for (const label of optionLabels) {
          delete label.dataset.state
          const hint = label.querySelector("[data-option-hint]")
          if (hint instanceof HTMLElement) {
            hint.hidden = true
            hint.textContent = ""
          }
        }
        return
      }

      const isCorrect = arraysEqual(selected, expected)
      for (const label of optionLabels) {
        const input = label.querySelector("input")
        const hint = label.querySelector("[data-option-hint]")
        if (!input) continue
        const val = input.value
        if (input.checked) {
          const optCorrect = expected.includes(val)
          label.dataset.state = optCorrect ? "correct" : "incorrect"
          if (hint instanceof HTMLElement) {
            hint.hidden = false
            hint.textContent = optCorrect ? `Correct! ${explanation}` : `Incorrect. ${explanation}`
          }
        } else {
          delete label.dataset.state
          if (hint instanceof HTMLElement) {
            hint.hidden = true
            hint.textContent = ""
          }
        }
      }

      setFeedback(
        question,
        isCorrect ? "correct" : "review",
        isCorrect
          ? "The selected answer matches the key."
          : "Review the explanation, change your selection, and check again.",
      )
    } else if (type === "multiple-select") {
      if (selected.length === 0) {
        clearFeedback(question)
        for (const label of optionLabels) {
          delete label.dataset.state
          const hint = label.querySelector("[data-option-hint]")
          if (hint instanceof HTMLElement) {
            hint.hidden = true
            hint.textContent = ""
          }
        }
        results.delete(resultKey(question))
        updateScore()
        return
      }

      for (const label of optionLabels) {
        const input = label.querySelector("input")
        const hint = label.querySelector("[data-option-hint]")
        if (!input) continue
        const val = input.value
        if (input.checked) {
          const optCorrect = expected.includes(val)
          label.dataset.state = optCorrect ? "correct" : "incorrect"
          if (hint instanceof HTMLElement) {
            hint.hidden = false
            hint.textContent = optCorrect
              ? "Correct. This option is part of the answer key."
              : "Incorrect. This option does not belong to the answer key."
          }
        } else {
          delete label.dataset.state
          if (hint instanceof HTMLElement) {
            hint.hidden = true
            hint.textContent = ""
          }
        }
      }

      const isAllCorrect = arraysEqual(selected, expected)
      if (isAllCorrect) {
        setFeedback(question, "correct", "All correct answers selected.")
      } else {
        const hasWrongSelection = selected.some((val) => !expected.includes(val))
        if (hasWrongSelection) {
          setFeedback(
            question,
            "review",
            "Some selected options are not part of the answer key. Review the explanation.",
          )
        } else {
          const remaining = expected.length - selected.length
          setFeedback(
            question,
            "review",
            `Correct so far! Select ${remaining} more answer${remaining > 1 ? "s" : ""}.`,
          )
        }
      }
    }
  }

  function renderCurrent(): void {
    questions.forEach((question, index) => {
      question.hidden = index !== currentIndex
    })
    previousButton.disabled = currentIndex === 0
    nextButton.disabled = currentIndex === questions.length - 1
    updateScore()
    updateHintToggleState()
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
      question.querySelectorAll(".knowledge-quiz__option").forEach((label) => {
        if (label instanceof HTMLElement) {
          delete label.dataset.state
          const hint = label.querySelector("[data-option-hint]")
          if (hint instanceof HTMLElement) {
            hint.hidden = true
            hint.textContent = ""
          }
        }
      })
      const textarea = question.querySelector("textarea")
      if (textarea instanceof HTMLTextAreaElement) textarea.value = ""
      const revealButton = question.querySelector("[data-quiz-reveal]")
      if (revealButton instanceof HTMLButtonElement) revealButton.disabled = false
      clearFeedback(question)
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

  if (hintToggle) {
    const onToggleHint = () => {
      const cur = currentQuestion()
      if (!cur) return
      const fallback = cur.querySelector(".knowledge-quiz__fallback")
      if (fallback instanceof HTMLDetailsElement) {
        fallback.hidden = false
        fallback.open = !fallback.open
        updateHintToggleState()
      }
    }
    hintToggle.addEventListener("click", onToggleHint)
    cleanups.push(() => hintToggle.removeEventListener("click", onToggleHint))
  }

  const onPrevious = () => move(-1)
  const onNext = () => move(1)
  const onReset = () => resetQuiz()
  previousButton.addEventListener("click", onPrevious)
  nextButton.addEventListener("click", onNext)
  resetButton.addEventListener("click", onReset)
  cleanups.push(
    () => previousButton.removeEventListener("click", onPrevious),
    () => nextButton.removeEventListener("click", onNext),
    () => resetButton.removeEventListener("click", onReset),
  )

  for (const question of questions) {
    const onInput = () => gradeQuestion(question)
    question.addEventListener("input", onInput)
    cleanups.push(() => question.removeEventListener("input", onInput))

    const revealButton = question.querySelector("[data-quiz-reveal]")
    if (revealButton instanceof HTMLButtonElement) {
      const onReveal = () => {
        showFallback(question)
        const selfGrade = question.querySelector("[data-self-grade]")
        if (selfGrade instanceof HTMLElement) selfGrade.hidden = false
        revealButton.disabled = true
      }
      revealButton.addEventListener("click", onReveal)
      cleanups.push(() => revealButton.removeEventListener("click", onReveal))
    }

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

const STORAGE_KEY = "user-font-preference"

function applyFont(font: string) {
  document.documentElement.setAttribute("data-font", font)
  const buttons = document.querySelectorAll<HTMLButtonElement>(".font-toggle")
  buttons.forEach((btn) => {
    btn.setAttribute("aria-pressed", font === "bookerly" ? "true" : "false")
    btn.title =
      font === "bookerly"
        ? "Current font: Bookerly (Serif) · Click for Inter"
        : "Current font: Inter (Sans-serif) · Click for Bookerly"
  })
}

function toggleFont() {
  const current = document.documentElement.getAttribute("data-font") ?? "bookerly"
  const next = current === "inter" ? "bookerly" : "inter"
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {}
  applyFont(next)
}

function initFontToggle() {
  const saved =
    (() => {
      try {
        return localStorage.getItem(STORAGE_KEY)
      } catch {
        return null
      }
    })() ?? "bookerly"
  applyFont(saved)

  const buttons = document.querySelectorAll<HTMLButtonElement>(".font-toggle")
  buttons.forEach((btn) => {
    btn.addEventListener("click", toggleFont)
    if (typeof window !== "undefined" && typeof window.addCleanup === "function") {
      window.addCleanup(() => {
        btn.removeEventListener("click", toggleFont)
      })
    }
  })
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFontToggle)
  } else {
    initFontToggle()
  }
  document.addEventListener("nav", initFontToggle)
  document.addEventListener("render", initFontToggle)
}

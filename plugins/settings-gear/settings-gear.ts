const THEME_KEY = "theme"
const FONT_KEY = "user-font-preference"

function getStoredTheme(): string {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === "light" || saved === "dark") return saved
  } catch {}
  return document.documentElement.getAttribute("saved-theme") ?? "dark"
}

function getStoredFont(): string {
  try {
    const saved = localStorage.getItem(FONT_KEY)
    if (saved === "bookerly" || saved === "inter") return saved
  } catch {}
  return document.documentElement.getAttribute("data-font") ?? "bookerly"
}

function updateThemeUI(theme: string) {
  document.querySelectorAll<HTMLButtonElement>("[data-theme-val]").forEach((btn) => {
    const val = btn.getAttribute("data-theme-val")
    const isActive = val === theme
    btn.classList.toggle("is-active", isActive)
    btn.setAttribute("aria-pressed", isActive ? "true" : "false")
  })
}

function updateFontUI(font: string) {
  document.querySelectorAll<HTMLButtonElement>("[data-font-val]").forEach((btn) => {
    const val = btn.getAttribute("data-font-val")
    const isActive = val === font
    btn.classList.toggle("is-active", isActive)
    btn.setAttribute("aria-pressed", isActive ? "true" : "false")
  })
}

function setTheme(theme: "light" | "dark") {
  document.documentElement.setAttribute("saved-theme", theme)
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {}
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }))
  updateThemeUI(theme)
}

function setFont(font: "bookerly" | "inter") {
  document.documentElement.setAttribute("data-font", font)
  try {
    localStorage.setItem(FONT_KEY, font)
  } catch {}
  updateFontUI(font)
}

function initSettingsGear() {
  const currentTheme = getStoredTheme()
  const currentFont = getStoredFont()

  updateThemeUI(currentTheme)
  updateFontUI(currentFont)

  const components = document.querySelectorAll<HTMLElement>(".settings-gear")
  components.forEach((container) => {
    if (container.dataset.gearInitialized === "true") return
    container.dataset.gearInitialized = "true"

    const btn = container.querySelector<HTMLButtonElement>(".settings-gear__btn")
    const popover = container.querySelector<HTMLElement>(".settings-gear__popover")
    if (!btn || !popover) return

    const openPopover = () => {
      popover.classList.add("is-open")
      btn.setAttribute("aria-expanded", "true")
    }

    const closePopover = () => {
      popover.classList.remove("is-open")
      btn.setAttribute("aria-expanded", "false")
    }

    const togglePopover = (e: MouseEvent) => {
      e.stopPropagation()
      if (popover.classList.contains("is-open")) {
        closePopover()
      } else {
        openPopover()
      }
    }

    const onDocumentClick = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) {
        closePopover()
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && popover.classList.contains("is-open")) {
        closePopover()
        btn.focus()
      }
    }

    btn.addEventListener("click", togglePopover)
    document.addEventListener("click", onDocumentClick)
    document.addEventListener("keydown", onKeyDown)

    // Theme buttons
    const themeButtons = popover.querySelectorAll<HTMLButtonElement>("[data-theme-val]")
    themeButtons.forEach((themeBtn) => {
      const handleThemeClick = (e: MouseEvent) => {
        e.stopPropagation()
        const val = themeBtn.getAttribute("data-theme-val")
        if (val === "light" || val === "dark") {
          setTheme(val)
        }
      }
      themeBtn.addEventListener("click", handleThemeClick)
      if (typeof window !== "undefined" && typeof window.addCleanup === "function") {
        window.addCleanup(() => {
          themeBtn.removeEventListener("click", handleThemeClick)
        })
      }
    })

    // Font buttons
    const fontButtons = popover.querySelectorAll<HTMLButtonElement>("[data-font-val]")
    fontButtons.forEach((fontBtn) => {
      const handleFontClick = (e: MouseEvent) => {
        e.stopPropagation()
        const val = fontBtn.getAttribute("data-font-val")
        if (val === "bookerly" || val === "inter") {
          setFont(val)
        }
      }
      fontBtn.addEventListener("click", handleFontClick)
      if (typeof window !== "undefined" && typeof window.addCleanup === "function") {
        window.addCleanup(() => {
          fontBtn.removeEventListener("click", handleFontClick)
        })
      }
    })

    if (typeof window !== "undefined" && typeof window.addCleanup === "function") {
      window.addCleanup(() => {
        container.dataset.gearInitialized = "false"
        btn.removeEventListener("click", togglePopover)
        document.removeEventListener("click", onDocumentClick)
        document.removeEventListener("keydown", onKeyDown)
      })
    }
  })
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSettingsGear)
  } else {
    initSettingsGear()
  }
  document.addEventListener("nav", initSettingsGear)
}

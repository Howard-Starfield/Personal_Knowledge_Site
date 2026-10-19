export function computeProgress(
  scrollTop: number,
  viewportHeight: number,
  docHeight: number,
  articleRect?: { top: number; bottom: number } | null,
): number {
  if (scrollTop <= 0) return 0

  if (articleRect) {
    const articleBottom = articleRect.bottom + scrollTop
    const targetEnd = articleBottom - viewportHeight
    if (targetEnd <= 0) {
      const scrollableDoc = docHeight - viewportHeight
      return scrollableDoc > 0 ? Math.min(Math.max(scrollTop / scrollableDoc, 0), 1) : 0
    }
    return Math.min(Math.max(scrollTop / targetEnd, 0), 1)
  }

  const scrollableDoc = docHeight - viewportHeight
  return scrollableDoc > 0 ? Math.min(Math.max(scrollTop / scrollableDoc, 0), 1) : 0
}

function getScrollTop(): number {
  if (typeof window === "undefined") return 0
  return window.scrollY || document.documentElement.scrollTop || 0
}

function getViewportHeight(): number {
  if (typeof window === "undefined") return 0
  return window.innerHeight || document.documentElement.clientHeight || 0
}

function getDocHeight(): number {
  if (typeof document === "undefined") return 0
  return Math.max(
    document.body?.scrollHeight ?? 0,
    document.documentElement?.scrollHeight ?? 0,
    document.body?.offsetHeight ?? 0,
    document.documentElement?.offsetHeight ?? 0,
  )
}

export interface ScrollProgressController {
  dispose: () => void
  update: () => void
}

export function setupScrollProgress(root: HTMLElement): ScrollProgressController {
  const bar = root.querySelector<HTMLElement>(".scroll-progress__bar")
  if (!bar) {
    return {
      dispose: () => undefined,
      update: () => undefined,
    }
  }

  let ticking = false
  let animationFrameId: number | null = null

  const update = () => {
    const scrollTop = getScrollTop()
    const viewportHeight = getViewportHeight()
    const docHeight = getDocHeight()
    const article = document.querySelector("article")
    const articleRect = article instanceof HTMLElement ? article.getBoundingClientRect() : null

    const progress = computeProgress(scrollTop, viewportHeight, docHeight, articleRect)
    bar.style.transform = `scaleX(${progress})`
    root.setAttribute("aria-valuenow", Math.round(progress * 100).toString())
    ticking = false
  }

  const onScroll = () => {
    if (!ticking) {
      animationFrameId = requestAnimationFrame(update)
      ticking = true
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })

  // Initial calculation
  update()

  return {
    dispose: () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }
    },
    update,
  }
}

let activeController: ScrollProgressController | null = null

function cleanup(): void {
  if (activeController) {
    activeController.dispose()
    activeController = null
  }
}

function initialize(): void {
  cleanup()
  if (typeof document === "undefined") return
  const root = document.querySelector<HTMLElement>("[data-scroll-progress]")
  if (root) {
    activeController = setupScrollProgress(root)
  }
  if (typeof window !== "undefined" && typeof window.addCleanup === "function") {
    window.addCleanup(cleanup)
  }
}

if (typeof document !== "undefined") {
  document.addEventListener("nav", initialize)
  document.addEventListener("render", initialize)
  queueMicrotask(initialize)
}

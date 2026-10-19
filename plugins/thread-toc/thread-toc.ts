let activeTeardown: (() => void) | null = null
let popoverObserver: MutationObserver | null = null

function setupPopoverRail(popover: HTMLElement) {
  const railContainer = popover.querySelector<HTMLElement>(".chat-navigation-rail-container")
  if (!railContainer || railContainer.dataset.popoverInit === "true") return
  railContainer.dataset.popoverInit = "true"

  const inner = popover.querySelector<HTMLElement>(".popover-inner")
  const list = railContainer.querySelector<HTMLElement>(".chat-navigation-rail__list")
  const card = railContainer.querySelector<HTMLElement>(".chat-navigation-rail__card")
  const cardTitle = card?.querySelector<HTMLElement>(".chat-navigation-rail__card-title")
  const cardMeta = card?.querySelector<HTMLElement>(".chat-navigation-rail__card-meta")
  const ticks = Array.from(
    railContainer.querySelectorAll<HTMLAnchorElement>(".chat-navigation-rail__tick"),
  )

  if (!inner || !list || ticks.length === 0) return

  // Map each tick to its corresponding heading inside the popover
  const headingItems: { tick: HTMLAnchorElement; heading: HTMLElement | null }[] = ticks.map(
    (tick) => {
      const slug = tick.dataset.slug
      let heading: HTMLElement | null = null
      if (slug) {
        heading =
          inner.querySelector<HTMLElement>(`#popover-internal-${slug}`) ||
          inner.querySelector<HTMLElement>(`#${slug}`)
      }
      return { tick, heading }
    },
  )

  function getScrollRelativeTop(element: HTMLElement, container: HTMLElement): number {
    const elemRect = element.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    return elemRect.top - containerRect.top + container.scrollTop
  }

  function setActivePopoverTick(activeTick: HTMLAnchorElement | null) {
    for (const { tick } of headingItems) {
      if (tick === activeTick) {
        tick.setAttribute("aria-current", "true")
      } else {
        tick.removeAttribute("aria-current")
      }
    }
  }

  // Track scrolling inside the popover
  function onPopoverScroll() {
    const scrollTop = inner!.scrollTop
    const offset = 40
    let currentTick: HTMLAnchorElement | null = null

    for (const { tick, heading } of headingItems) {
      if (heading) {
        const top = getScrollRelativeTop(heading, inner!)
        if (top <= scrollTop + offset) {
          currentTick = tick
        }
      }
    }

    if (!currentTick && headingItems.length > 0 && headingItems[0].heading) {
      currentTick = headingItems[0].tick
    }

    setActivePopoverTick(currentTick)
  }

  inner.addEventListener("scroll", onPopoverScroll, { passive: true })
  onPopoverScroll()

  // Hover card logic inside popover
  function updatePopoverCard(tick: HTMLElement | null) {
    if (!card || !tick) {
      card?.classList.remove("open")
      return
    }

    const title = tick.dataset.title || ""
    const meta = tick.dataset.meta || ""

    if (cardTitle) cardTitle.textContent = title
    if (cardMeta) cardMeta.textContent = meta

    const tickTop = tick.offsetTop - list!.scrollTop
    const tickCenter = tickTop + tick.offsetHeight / 2
    const cardHalfHeight = card.offsetHeight / 2 || 14

    card.style.top = `${Math.max(4, tickCenter - cardHalfHeight)}px`
    card.classList.add("open")
  }

  function hidePopoverCard() {
    card?.classList.remove("open")
  }

  // Ticks click and hover listeners
  for (const { tick, heading } of headingItems) {
    tick.addEventListener("pointerenter", () => updatePopoverCard(tick))
    tick.addEventListener("pointerleave", hidePopoverCard)
    tick.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (heading) {
        const targetTop = getScrollRelativeTop(heading, inner!)
        inner!.scrollTo({
          top: Math.max(0, targetTop - 8),
          behavior: "smooth",
        })
      }
    })
  }
}

function observePopovers() {
  if (popoverObserver) return
  if (typeof document === "undefined" || !document.body) return

  popoverObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "childList") {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("popover")) {
              setupPopoverRail(node)
            } else {
              const nested = node.querySelectorAll<HTMLElement>(".popover")
              nested.forEach(setupPopoverRail)
            }
          }
        }
      } else if (m.type === "attributes" && m.attributeName === "class") {
        if (m.target instanceof HTMLElement && m.target.classList.contains("popover")) {
          setupPopoverRail(m.target)
        }
      }
    }
  })

  popoverObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  })
}

function initThreadToc() {
  if (activeTeardown) {
    activeTeardown()
    activeTeardown = null
  }

  // Observe and setup popovers
  observePopovers()
  const popovers = Array.from(document.querySelectorAll<HTMLElement>(".popover"))
  for (const popover of popovers) {
    setupPopoverRail(popover)
  }

  // Find the rail on the main page (not inside any popover)
  const railContainers = Array.from(
    document.querySelectorAll<HTMLElement>(".chat-navigation-rail-container"),
  )
  const railContainer = railContainers.find((el) => !el.closest(".popover"))
  if (!railContainer) return

  const list = railContainer.querySelector<HTMLElement>(".chat-navigation-rail__list")
  const card = railContainer.querySelector<HTMLElement>(".chat-navigation-rail__card")
  const cardTitle = card?.querySelector<HTMLElement>(".chat-navigation-rail__card-title")
  const cardMeta = card?.querySelector<HTMLElement>(".chat-navigation-rail__card-meta")
  const ticks = Array.from(
    railContainer.querySelectorAll<HTMLAnchorElement>(".chat-navigation-rail__tick"),
  )

  if (!list || ticks.length === 0) return

  // Dynamically pin to the right edge of the center content area
  function updateRailPosition() {
    const center = document.querySelector(".center")
    if (!center || !railContainer) return
    const rect = center.getBoundingClientRect()
    railContainer.style.left = `${Math.round(rect.right - 40)}px`
    railContainer.style.right = "auto"
  }

  updateRailPosition()
  window.addEventListener("resize", updateRailPosition, { passive: true })

  // 1. Observe headings to track current active section
  const headingIds = ticks.map((t) => t.dataset.slug).filter((s): s is string => Boolean(s))
  const headingElements: HTMLElement[] = []
  for (const id of headingIds) {
    const el = document.getElementById(id)
    if (el) headingElements.push(el)
  }

  function setActiveTick(slug: string | null) {
    for (const tick of ticks) {
      if (slug && tick.dataset.slug === slug) {
        tick.setAttribute("aria-current", "true")
      } else {
        tick.removeAttribute("aria-current")
      }
    }
  }

  let activeHeadingSlug: string | null = null

  // IntersectionObserver for tracking active heading
  const observer = new IntersectionObserver(
    (entries) => {
      // Find headings crossing the top reading line
      for (const entry of entries) {
        const id = entry.target.id
        if (entry.isIntersecting) {
          activeHeadingSlug = id
          setActiveTick(id)
        }
      }
    },
    {
      rootMargin: "0px 0px -65% 0px",
      threshold: 0,
    },
  )

  for (const h of headingElements) {
    observer.observe(h)
  }

  // Fallback scroll listener for precise active section resolution
  function onScroll() {
    const scrollY = window.scrollY
    const offset = 120
    let currentId: string | null = null

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 30

    if (isAtBottom && headingElements.length > 0) {
      currentId = headingElements[headingElements.length - 1].id
    } else {
      for (let i = 0; i < headingElements.length; i++) {
        const top = headingElements[i].offsetTop
        if (scrollY + offset >= top) {
          currentId = headingElements[i].id
        } else {
          break
        }
      }
    }

    if (!currentId && headingElements.length > 0) {
      currentId = headingElements[0].id
    }

    if (currentId !== activeHeadingSlug) {
      activeHeadingSlug = currentId
      setActiveTick(currentId)
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  onScroll()

  // 2. Hover Card positioning & display
  function updateCard(tick: HTMLElement | null) {
    if (!card || !tick) {
      card?.classList.remove("open")
      return
    }

    const title = tick.dataset.title || ""
    const meta = tick.dataset.meta || ""

    if (cardTitle) cardTitle.textContent = title
    if (cardMeta) cardMeta.textContent = meta

    const tickTop = tick.offsetTop - list!.scrollTop
    const tickCenter = tickTop + tick.offsetHeight / 2
    const cardHalfHeight = card.offsetHeight / 2 || 18

    card.style.top = `${Math.max(4, tickCenter - cardHalfHeight)}px`
    card.classList.add("open")
  }

  function hideCard() {
    card?.classList.remove("open")
  }

  // 3. Pointer events & scrubbing
  let isScrubbing = false
  let scrubTargetTick: HTMLAnchorElement | null = null

  function resolveTickAtY(clientY: number): HTMLAnchorElement | null {
    let nearest: HTMLAnchorElement | null = null
    let nearestDist = Number.POSITIVE_INFINITY

    for (const tick of ticks) {
      const rect = tick.getBoundingClientRect()
      if (clientY >= rect.top && clientY < rect.bottom) {
        return tick
      }
      const dist = Math.abs((rect.top + rect.bottom) / 2 - clientY)
      if (dist < nearestDist) {
        nearest = tick
        nearestDist = dist
      }
    }

    return nearest
  }

  function setScrubTarget(tick: HTMLAnchorElement | null) {
    if (scrubTargetTick === tick) return
    for (const t of ticks) {
      t.removeAttribute("data-scrub-target")
    }
    scrubTargetTick = tick
    if (tick) {
      tick.setAttribute("data-scrub-target", "true")
      updateCard(tick)
    } else {
      hideCard()
    }
  }

  function scrollToTick(tick: HTMLAnchorElement) {
    const slug = tick.dataset.slug
    if (!slug) return
    const target = document.getElementById(slug)
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const cleanups: (() => void)[] = []

  // Hover handlers for mouse
  for (const tick of ticks) {
    const onEnter = () => {
      if (!isScrubbing) updateCard(tick)
    }
    const onLeave = () => {
      if (!isScrubbing) hideCard()
    }
    const onClick = (e: MouseEvent) => {
      e.preventDefault()
      scrollToTick(tick)
    }

    tick.addEventListener("pointerenter", onEnter)
    tick.addEventListener("pointerleave", onLeave)
    tick.addEventListener("click", onClick)

    cleanups.push(() => {
      tick.removeEventListener("pointerenter", onEnter)
      tick.removeEventListener("pointerleave", onLeave)
      tick.removeEventListener("click", onClick)
    })
  }

  // Scrubbing on pointerdown / drag
  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return
    isScrubbing = true
    list.dataset.scrubbing = "true"
    list.setPointerCapture(e.pointerId)
    const tick = resolveTickAtY(e.clientY)
    setScrubTarget(tick)
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!isScrubbing) return
    const tick = resolveTickAtY(e.clientY)
    setScrubTarget(tick)
  }

  const endScrub = (e: PointerEvent) => {
    if (!isScrubbing) return
    isScrubbing = false
    list.removeAttribute("data-scrubbing")
    if (list.hasPointerCapture(e.pointerId)) {
      list.releasePointerCapture(e.pointerId)
    }
    const finalTick = scrubTargetTick || resolveTickAtY(e.clientY)
    setScrubTarget(null)
    hideCard()
    if (finalTick) {
      scrollToTick(finalTick)
    }
  }

  list.addEventListener("pointerdown", onPointerDown)
  list.addEventListener("pointermove", onPointerMove)
  list.addEventListener("pointerup", endScrub)
  list.addEventListener("pointercancel", endScrub)

  cleanups.push(() => {
    list.removeEventListener("pointerdown", onPointerDown)
    list.removeEventListener("pointermove", onPointerMove)
    list.removeEventListener("pointerup", endScrub)
    list.removeEventListener("pointercancel", endScrub)
  })

  // Global teardown registered with Quartz SPA lifecycle
  const teardown = () => {
    observer.disconnect()
    if (popoverObserver) {
      popoverObserver.disconnect()
      popoverObserver = null
    }
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", updateRailPosition)
    cleanups.forEach((c) => c())
  }

  activeTeardown = teardown
  if (typeof window !== "undefined" && typeof window.addCleanup === "function") {
    window.addCleanup(() => {
      teardown()
      if (activeTeardown === teardown) {
        activeTeardown = null
      }
    })
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThreadToc)
  } else {
    initThreadToc()
  }
  document.addEventListener("nav", initThreadToc)
  document.addEventListener("render", initThreadToc)
}

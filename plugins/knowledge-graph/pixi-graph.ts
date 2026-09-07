import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceRadial,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force"
import { select } from "d3-selection"
import { zoom, zoomIdentity, type D3ZoomEvent } from "d3-zoom"
import { Application, Container, Graphics, Text, type FederatedPointerEvent } from "pixi.js"

type PageNode = {
  kind: "page"
  id: string
  slug: string
  title: string
  folder: string
  cluster: string
  tags: string[]
}

type TagNode = {
  kind: "tag"
  id: string
  slug: string
  label: string
}

type GraphNode = PageNode | TagNode

type AuthoredEdge = {
  kind: "authored"
  source: string
  target: string
  count: number
}

type TagEdge = {
  kind: "tag-membership"
  source: string
  target: string
}

type GraphEdge = AuthoredEdge | TagEdge

type GraphManifest = {
  schemaVersion: 1
  nodes: GraphNode[]
  edges: GraphEdge[]
}

type GraphSelection = {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

type ForceNode = SimulationNodeDatum & {
  data: GraphNode
  degree: number
  cluster: string
}

type ForceEdge = SimulationLinkDatum<ForceNode> & {
  data: GraphEdge
}

type NodeVisual = {
  node: ForceNode
  element: SVGGElement
}

type EdgeVisual = {
  edge: GraphEdge
  source: ForceNode
  target: ForceNode
  element: SVGLineElement
}

type ClusterVisual = {
  element: SVGTextElement
}

type RenderedForceGraph = {
  cleanup: () => void
  zoom: (action: "in" | "out" | "reset") => void
}

type PixiNodeVisual = {
  node: ForceNode
  dot: Graphics
  label: Text
}

type PixiEdgeVisual = {
  edge: GraphEdge
  source: ForceNode
  target: ForceNode
  line: Graphics
}

declare global {
  interface Window {
    __knowledgeForceGraphRuntime?: { dispose: () => void }
  }
}

const svgNamespace = "http://www.w3.org/2000/svg"
const mobileViewport = window.matchMedia("(max-width: 800px)")
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

let generation = 0
let activeCleanup: (() => void) | undefined

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string")
}

function parseNode(value: unknown): GraphNode | undefined {
  if (!isRecord(value) || typeof value.kind !== "string") return undefined
  if (value.kind === "page") {
    if (
      typeof value.id !== "string" ||
      !uuidPattern.test(value.id) ||
      typeof value.slug !== "string" ||
      typeof value.title !== "string" ||
      typeof value.folder !== "string" ||
      typeof value.cluster !== "string" ||
      !isStringArray(value.tags)
    ) {
      return undefined
    }
    return {
      kind: "page",
      id: value.id,
      slug: value.slug,
      title: value.title,
      folder: value.folder,
      cluster: value.cluster,
      tags: [...value.tags],
    }
  }

  if (
    value.kind === "tag" &&
    typeof value.id === "string" &&
    value.id.startsWith("tag:") &&
    typeof value.slug === "string" &&
    typeof value.label === "string"
  ) {
    return {
      kind: "tag",
      id: value.id,
      slug: value.slug,
      label: value.label,
    }
  }
  return undefined
}

function parseEdge(value: unknown): GraphEdge | undefined {
  if (!isRecord(value) || typeof value.kind !== "string") return undefined
  if (
    value.kind === "authored" &&
    typeof value.source === "string" &&
    typeof value.target === "string" &&
    typeof value.count === "number" &&
    Number.isInteger(value.count) &&
    value.count > 0
  ) {
    return {
      kind: "authored",
      source: value.source,
      target: value.target,
      count: value.count,
    }
  }
  if (
    value.kind === "tag-membership" &&
    typeof value.source === "string" &&
    typeof value.target === "string"
  ) {
    return { kind: "tag-membership", source: value.source, target: value.target }
  }
  return undefined
}

function parseManifest(value: unknown): GraphManifest | undefined {
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    !Array.isArray(value.nodes) ||
    !Array.isArray(value.edges)
  ) {
    return undefined
  }

  const nodes: GraphNode[] = []
  const nodeIds = new Set<string>()
  for (const entry of value.nodes) {
    const node = parseNode(entry)
    if (!node || nodeIds.has(node.id)) return undefined
    nodeIds.add(node.id)
    nodes.push(node)
  }

  const nodesById = new Map(nodes.map((node) => [node.id, node]))
  const edgeKeys = new Set<string>()
  const edges: GraphEdge[] = []
  for (const entry of value.edges) {
    const edge = parseEdge(entry)
    if (!edge || edge.source === edge.target) return undefined
    const source = nodesById.get(edge.source)
    const target = nodesById.get(edge.target)
    if (!source || !target || source.kind !== "page") return undefined
    if (edge.kind === "authored" && target.kind !== "page") return undefined
    if (edge.kind === "tag-membership" && target.kind !== "tag") return undefined
    const edgeKey = `${edge.kind}\u0000${edge.source}\u0000${edge.target}`
    if (edgeKeys.has(edgeKey)) return undefined
    edgeKeys.add(edgeKey)
    edges.push(edge)
  }

  return { schemaVersion: 1, nodes, edges }
}

function normalizeSlug(value: string): string {
  const normalized = value.replace(/^\/+|\/+$/g, "")
  return normalized.length === 0 ? "index" : normalized
}

function basePath(): string {
  return (document.body?.dataset.basepath ?? "").replace(/\/$/, "")
}

function routeForNode(node: GraphNode): string {
  let route = node.slug
  if (route === "index") route = ""
  if (route.endsWith("/index")) route = route.slice(0, -"index".length)
  return `${basePath()}/${route}`.replace(/\/{2,}/g, "/")
}

function manifestUrl(): string {
  return `${basePath()}/static/knowledgeGraph.json`.replace(/\/{2,}/g, "/")
}

function nodeLabel(node: GraphNode): string {
  return node.kind === "page" ? node.title : node.label
}

function truncateLabel(node: GraphNode, limit: number): string {
  const label = nodeLabel(node)
  return label.length <= limit ? label : `${label.slice(0, limit - 1)}…`
}

function pageNodes(nodes: readonly GraphNode[]): PageNode[] {
  return nodes.filter((node): node is PageNode => node.kind === "page")
}

function localSelection(manifest: GraphManifest, current: PageNode): GraphSelection {
  const pageIds = new Set<string>([current.id])
  const neighboringIds = new Set<string>()
  for (const edge of manifest.edges) {
    if (edge.kind !== "authored") continue
    if (edge.source === current.id) neighboringIds.add(edge.target)
    if (edge.target === current.id) neighboringIds.add(edge.source)
  }

  for (const id of [...neighboringIds].sort().slice(0, 14)) pageIds.add(id)
  const tagIds = new Set<string>()
  for (const edge of manifest.edges) {
    if (edge.kind === "tag-membership" && pageIds.has(edge.source)) tagIds.add(edge.target)
  }

  const selectedIds = new Set([...pageIds, ...[...tagIds].sort().slice(0, 10)])
  return {
    nodes: manifest.nodes.filter((node) => selectedIds.has(node.id)),
    edges: manifest.edges.filter(
      (edge) => selectedIds.has(edge.source) && selectedIds.has(edge.target),
    ),
  }
}

function createSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
): SVGElementTagNameMap[K] {
  return document.createElementNS(svgNamespace, tagName)
}

function setAttributes(element: Element, attributes: Record<string, string>): void {
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value)
}

function seededPoint(id: string, width: number, height: number): { x: number; y: number } {
  let hash = 2166136261
  for (const character of id) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  const angle = ((hash >>> 0) / 4294967295) * Math.PI * 2
  const radius = Math.min(width, height) * (0.08 + ((hash >>> 8) % 100) / 700)
  return {
    x: width / 2 + Math.cos(angle) * radius,
    y: height / 2 + Math.sin(angle) * radius,
  }
}

function clusterCenters(
  nodes: readonly GraphNode[],
  width: number,
  height: number,
  view: "local" | "global",
): Map<string, { x: number; y: number }> {
  const clusters = [
    ...new Set(nodes.map((node) => (node.kind === "page" ? node.cluster : "tags"))),
  ].sort()
  const centers = new Map<string, { x: number; y: number }>()
  for (const [index, cluster] of clusters.entries()) {
    if (view === "local" || clusters.length === 1) {
      centers.set(cluster, { x: width / 2, y: height / 2 })
      continue
    }
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / clusters.length
    const ringX = width * 0.29
    const ringY = height * 0.25
    centers.set(cluster, {
      x: width / 2 + Math.cos(angle) * ringX,
      y: height / 2 + Math.sin(angle) * ringY,
    })
  }
  return centers
}

function createArrowMarker(markerId: string): SVGDefsElement {
  const definitions = createSvgElement("defs")
  const marker = createSvgElement("marker")
  setAttributes(marker, {
    id: markerId,
    markerWidth: "6",
    markerHeight: "6",
    refX: "10",
    refY: "3",
    orient: "auto",
    markerUnits: "strokeWidth",
  })
  const arrow = createSvgElement("path")
  setAttributes(arrow, { d: "M0,0 L6,3 L0,6 z" })
  marker.append(arrow)
  definitions.append(marker)
  return definitions
}

function renderForceGraph(
  container: HTMLElement,
  graph: GraphSelection,
  currentId: string,
  view: "local" | "global",
): RenderedForceGraph {
  container.replaceChildren()
  const width = view === "local" ? 320 : 1120
  const height = view === "local" ? 218 : 720
  const degree = new Map<string, number>()
  for (const edge of graph.edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1)
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1)
  }
  const forceNodes: ForceNode[] = graph.nodes.map((data) => {
    const start = seededPoint(data.id, width, height)
    return {
      data,
      degree: degree.get(data.id) ?? 0,
      cluster: data.kind === "page" ? data.cluster : "tags",
      x: start.x,
      y: start.y,
    }
  })
  const nodesById = new Map(forceNodes.map((node) => [node.data.id, node]))
  const forceEdges: ForceEdge[] = graph.edges.map((data) => ({
    data,
    source: data.source,
    target: data.target,
  }))
  const centers = clusterCenters(graph.nodes, width, height, view)

  const svg = createSvgElement("svg")
  setAttributes(svg, {
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "xMidYMid meet",
    "aria-label":
      view === "local"
        ? "Interactive graph of this note and its direct connections"
        : "Interactive graph of all published notes and tags",
  })
  const markerId = `force-graph-arrow-${view}`
  svg.append(createArrowMarker(markerId))
  const viewport = createSvgElement("g")
  viewport.classList.add("force-graph__viewport")
  const clusterLayer = createSvgElement("g")
  clusterLayer.classList.add("force-graph__clusters")
  const edgeLayer = createSvgElement("g")
  edgeLayer.classList.add("force-graph__edges")
  const nodeLayer = createSvgElement("g")
  nodeLayer.classList.add("force-graph__nodes")
  viewport.append(clusterLayer, edgeLayer, nodeLayer)
  svg.append(viewport)
  container.append(svg)

  const clusterVisuals: ClusterVisual[] = []
  if (view === "global") {
    for (const [cluster, center] of centers) {
      const members = forceNodes.filter((node) => node.cluster === cluster)
      if (members.length === 0) continue
      const label = createSvgElement("text")
      label.classList.add("force-graph__cluster-label")
      setAttributes(label, { x: String(center.x), y: String(center.y) })
      label.textContent = cluster === "root" ? "home" : cluster
      clusterLayer.append(label)
      clusterVisuals.push({ element: label })
    }
  }

  const edgeVisuals: EdgeVisual[] = []
  for (const edge of graph.edges) {
    const source = nodesById.get(edge.source)
    const target = nodesById.get(edge.target)
    if (!source || !target) continue
    const line = createSvgElement("line")
    line.classList.add(
      "force-graph__edge",
      edge.kind === "authored" ? "force-graph__edge--authored" : "force-graph__edge--tag",
    )
    line.dataset.source = edge.source
    line.dataset.target = edge.target
    if (edge.kind === "authored") {
      line.setAttribute("marker-end", `url(#${markerId})`)
      if (edge.count > 1) line.style.strokeWidth = String(1 + Math.log2(edge.count) * 0.45)
    }
    edgeLayer.append(line)
    edgeVisuals.push({ edge, source, target, element: line })
  }

  const nodeVisuals: NodeVisual[] = []
  const listenerCleanup: Array<() => void> = []
  const connectedIds = (nodeId: string): Set<string> => {
    const connected = new Set<string>([nodeId])
    for (const edge of graph.edges) {
      if (edge.source === nodeId) connected.add(edge.target)
      if (edge.target === nodeId) connected.add(edge.source)
    }
    return connected
  }
  const focusNode = (nodeId: string): void => {
    const connected = connectedIds(nodeId)
    for (const visual of nodeVisuals) {
      visual.element.classList.toggle("is-dimmed", !connected.has(visual.node.data.id))
      visual.element.classList.toggle("is-focused", visual.node.data.id === nodeId)
    }
    for (const visual of edgeVisuals) {
      const touchesFocus = visual.edge.source === nodeId || visual.edge.target === nodeId
      visual.element.classList.toggle("is-dimmed", !touchesFocus)
      visual.element.classList.toggle("is-focused", touchesFocus)
    }
  }
  const clearFocus = (): void => {
    for (const visual of nodeVisuals) {
      visual.element.classList.remove("is-dimmed", "is-focused")
    }
    for (const visual of edgeVisuals) {
      visual.element.classList.remove("is-dimmed", "is-focused")
    }
  }

  const simulation = forceSimulation<ForceNode>(forceNodes)
    .force(
      "link",
      forceLink<ForceNode, ForceEdge>(forceEdges)
        .id((node) => node.data.id)
        .distance((edge) => {
          if (edge.data.kind === "authored") return view === "local" ? 74 : 108
          return view === "local" ? 54 : 70
        })
        .strength((edge) => (edge.data.kind === "authored" ? 0.72 : 0.34)),
    )
    .force(
      "charge",
      forceManyBody<ForceNode>()
        .strength(view === "local" ? -132 : -168)
        .distanceMax(view === "local" ? 260 : 430),
    )
    .force(
      "collide",
      forceCollide<ForceNode>().radius((node) => 13 + Math.min(node.degree, 7)),
    )
    .force(
      "x",
      forceX<ForceNode>((node) => centers.get(node.cluster)?.x ?? width / 2).strength(
        view === "local" ? 0.075 : 0.12,
      ),
    )
    .force(
      "y",
      forceY<ForceNode>((node) => centers.get(node.cluster)?.y ?? height / 2).strength(
        view === "local" ? 0.075 : 0.12,
      ),
    )
    .alphaDecay(view === "local" ? 0.075 : 0.052)
    .velocityDecay(0.32)

  const updatePositions = (): void => {
    for (const visual of edgeVisuals) {
      setAttributes(visual.element, {
        x1: String(visual.source.x ?? width / 2),
        y1: String(visual.source.y ?? height / 2),
        x2: String(visual.target.x ?? width / 2),
        y2: String(visual.target.y ?? height / 2),
      })
    }
    for (const visual of nodeVisuals) {
      visual.element.setAttribute(
        "transform",
        `translate(${visual.node.x ?? width / 2} ${visual.node.y ?? height / 2})`,
      )
    }
  }

  let settleTimer: number | undefined
  const stopAfterSettling = (delay: number): void => {
    if (settleTimer !== undefined) window.clearTimeout(settleTimer)
    settleTimer = window.setTimeout(() => {
      simulation.stop()
      settleTimer = undefined
    }, delay)
  }

  for (const node of forceNodes) {
    const nodeGroup = createSvgElement("g")
    nodeGroup.classList.add("force-graph__node", `force-graph__node--${node.data.kind}`)
    if (node.data.id === currentId) nodeGroup.classList.add("is-current")
    nodeGroup.setAttribute("role", "link")
    nodeGroup.setAttribute("tabindex", "0")
    nodeGroup.setAttribute("aria-label", nodeLabel(node.data))
    nodeGroup.dataset.nodeId = node.data.id
    nodeGroup.dataset.route = routeForNode(node.data)
    const radius = 4.5 + Math.min(Math.sqrt(node.degree + 1) * 1.25, 5)
    if (node.data.kind === "page") {
      const circle = createSvgElement("circle")
      circle.setAttribute("r", String(node.data.id === currentId ? radius + 2.5 : radius))
      nodeGroup.append(circle)
    } else {
      const diamond = createSvgElement("path")
      const size = radius + 1.5
      diamond.setAttribute("d", `M 0 ${-size} L ${size} 0 L 0 ${size} L ${-size} 0 Z`)
      nodeGroup.append(diamond)
    }
    const label = createSvgElement("text")
    label.setAttribute("x", "10")
    label.setAttribute("y", "-8")
    label.textContent = truncateLabel(node.data, view === "local" ? 22 : 28)
    nodeGroup.append(label)

    const focus = (): void => {
      simulation.stop()
      focusNode(node.data.id)
    }
    const navigateToNode = (): void => {
      const destination = new URL(routeForNode(node.data), window.location.href)
      if (window.spaNavigate) {
        void window.spaNavigate(destination, false)
      } else {
        window.location.assign(destination)
      }
    }
    let pointerStart: { id: number; x: number; y: number; moved: boolean } | undefined
    let suppressClick = false
    let clickResetTimer: number | undefined
    const pointerPosition = (event: PointerEvent): { x: number; y: number } | undefined => {
      const matrix = viewport.getScreenCTM()
      if (!matrix) return undefined
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
      return { x: point.x, y: point.y }
    }
    const pointerDown = (event: PointerEvent): void => {
      if (event.button !== 0) return
      event.stopPropagation()
      simulation.stop()
      pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false }
      nodeGroup.setPointerCapture(event.pointerId)
      node.fx = node.x ?? width / 2
      node.fy = node.y ?? height / 2
    }
    const pointerMove = (event: PointerEvent): void => {
      if (!pointerStart || pointerStart.id !== event.pointerId) return
      const distance = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y)
      if (distance >= 4 && !pointerStart.moved) {
        pointerStart.moved = true
        if (!reducedMotion.matches) simulation.alphaTarget(0.18).restart()
      }
      if (!pointerStart.moved) return
      const position = pointerPosition(event)
      if (!position) return
      node.fx = position.x
      node.fy = position.y
      if (reducedMotion.matches) {
        node.x = position.x
        node.y = position.y
        updatePositions()
      }
    }
    const pointerUp = (event: PointerEvent): void => {
      if (!pointerStart || pointerStart.id !== event.pointerId) return
      const wasMoved = pointerStart.moved
      pointerStart = undefined
      if (nodeGroup.hasPointerCapture(event.pointerId))
        nodeGroup.releasePointerCapture(event.pointerId)
      node.fx = null
      node.fy = null
      simulation.alphaTarget(0)
      if (wasMoved) {
        suppressClick = true
        clickResetTimer = window.setTimeout(() => {
          suppressClick = false
          clickResetTimer = undefined
        }, 0)
        if (!reducedMotion.matches) stopAfterSettling(650)
      }
    }
    const pointerCancel = (event: PointerEvent): void => {
      if (!pointerStart || pointerStart.id !== event.pointerId) return
      pointerStart = undefined
      node.fx = null
      node.fy = null
      simulation.alphaTarget(0)
    }
    const keyboardActivate = (event: KeyboardEvent): void => {
      if (event.key !== "Enter") return
      event.preventDefault()
      navigateToNode()
    }
    const clickActivate = (event: MouseEvent): void => {
      event.preventDefault()
      event.stopPropagation()
      if (suppressClick) return
      navigateToNode()
    }
    nodeGroup.addEventListener("mouseenter", focus)
    nodeGroup.addEventListener("focus", focus)
    nodeGroup.addEventListener("mouseleave", clearFocus)
    nodeGroup.addEventListener("blur", clearFocus)
    nodeGroup.addEventListener("pointerdown", pointerDown)
    nodeGroup.addEventListener("pointermove", pointerMove)
    nodeGroup.addEventListener("pointerup", pointerUp)
    nodeGroup.addEventListener("pointercancel", pointerCancel)
    nodeGroup.addEventListener("keydown", keyboardActivate)
    nodeGroup.addEventListener("click", clickActivate)
    listenerCleanup.push(() => {
      nodeGroup.removeEventListener("mouseenter", focus)
      nodeGroup.removeEventListener("focus", focus)
      nodeGroup.removeEventListener("mouseleave", clearFocus)
      nodeGroup.removeEventListener("blur", clearFocus)
      nodeGroup.removeEventListener("pointerdown", pointerDown)
      nodeGroup.removeEventListener("pointermove", pointerMove)
      nodeGroup.removeEventListener("pointerup", pointerUp)
      nodeGroup.removeEventListener("pointercancel", pointerCancel)
      nodeGroup.removeEventListener("keydown", keyboardActivate)
      nodeGroup.removeEventListener("click", clickActivate)
      if (clickResetTimer !== undefined) window.clearTimeout(clickResetTimer)
    })
    nodeLayer.append(nodeGroup)
    nodeVisuals.push({ node, element: nodeGroup })
  }

  simulation.on("tick", updatePositions)
  if (reducedMotion.matches) {
    simulation.stop()
    simulation.tick(180)
    updatePositions()
  } else {
    stopAfterSettling(view === "local" ? 850 : 1350)
  }

  const svgSelection = select<SVGSVGElement, undefined>(svg)
  const zoomBehavior = zoom<SVGSVGElement, undefined>()
    .scaleExtent([0.45, 3])
    .on("zoom", (event: D3ZoomEvent<SVGSVGElement, undefined>) => {
      viewport.setAttribute("transform", event.transform.toString())
    })
  if (view === "global") {
    svgSelection.call(zoomBehavior)
    svgSelection.on("dblclick.zoom", null)
  }

  return {
    cleanup: () => {
      simulation.stop()
      if (settleTimer !== undefined) window.clearTimeout(settleTimer)
      svgSelection.on(".zoom", null)
      for (const cleanup of listenerCleanup) cleanup()
      container.replaceChildren()
    },
    zoom: (action) => {
      if (view !== "global") return
      if (action === "reset") {
        zoomBehavior.transform(svgSelection, zoomIdentity)
        return
      }
      zoomBehavior.scaleBy(svgSelection, action === "in" ? 1.28 : 0.78)
    },
  }
}

function themeColor(variableName: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
  return value.length > 0 ? value : fallback
}

function drawDottedPixiLine(
  graphics: Graphics,
  sourceX: number,
  sourceY: number,
  targetX: number,
  targetY: number,
): void {
  const distance = Math.hypot(targetX - sourceX, targetY - sourceY)
  if (distance === 0) return
  const unitX = (targetX - sourceX) / distance
  const unitY = (targetY - sourceY) / distance
  for (let offset = 0; offset < distance; offset += 8) {
    const end = Math.min(offset + 3, distance)
    graphics
      .moveTo(sourceX + unitX * offset, sourceY + unitY * offset)
      .lineTo(sourceX + unitX * end, sourceY + unitY * end)
  }
}

async function renderPixiGraph(
  container: HTMLElement,
  graph: GraphSelection,
  currentId: string,
  view: "local" | "global",
  signal: AbortSignal,
): Promise<RenderedForceGraph | undefined> {
  container.replaceChildren()
  const width = Math.max(container.clientWidth, 1)
  const height = Math.max(container.clientHeight, 250)
  const degree = new Map<string, number>()
  for (const edge of graph.edges) {
    degree.set(edge.source, (degree.get(edge.source) ?? 0) + 1)
    degree.set(edge.target, (degree.get(edge.target) ?? 0) + 1)
  }

  const forceNodes: ForceNode[] = graph.nodes.map((data) => {
    const start = seededPoint(data.id, width, height)
    return {
      data,
      degree: degree.get(data.id) ?? 0,
      cluster: data.kind === "page" ? data.cluster : "tags",
      x: start.x,
      y: start.y,
    }
  })
  const nodesById = new Map(forceNodes.map((node) => [node.data.id, node]))
  const forceEdges: ForceEdge[] = graph.edges.map((data) => ({
    data,
    source: data.source,
    target: data.target,
  }))
  const app = new Application()
  await app.init({
    width,
    height,
    resizeTo: container,
    antialias: true,
    autoDensity: true,
    backgroundAlpha: 0,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
  })
  if (signal.aborted) {
    app.destroy({ removeView: true }, { children: true })
    return undefined
  }

  app.canvas.classList.add("force-graph__pixi-canvas")
  app.canvas.setAttribute("aria-hidden", "true")
  container.dataset.graphRenderer = "pixi"
  container.append(app.canvas)

  const scene = new Container()
  scene.label = `${view}-knowledge-graph`
  const edgeLayer = new Container()
  const nodeLayer = new Container()
  const labelLayer = new Container()
  scene.addChild(edgeLayer, nodeLayer, labelLayer)
  app.stage.addChild(scene)
  app.stage.eventMode = "static"
  app.stage.hitArea = app.screen

  const secondary = themeColor("--secondary", "#8b5cf6")
  const tertiary = themeColor("--tertiary", "#d16d9e")
  const gray = themeColor("--gray", "#6c6c6c")
  const lightGray = themeColor("--lightgray", "#d5d5dc")
  const dark = themeColor("--dark", "#202124")
  const light = themeColor("--light", "#fafafa")
  const bodyFont = themeColor("--bodyFont", "system-ui")

  const edgeVisuals: PixiEdgeVisual[] = []
  for (const edge of graph.edges) {
    const source = nodesById.get(edge.source)
    const target = nodesById.get(edge.target)
    if (!source || !target) continue
    const line = new Graphics()
    line.eventMode = "none"
    edgeLayer.addChild(line)
    edgeVisuals.push({ edge, source, target, line })
  }

  const nodeVisuals: PixiNodeVisual[] = []
  let focusedId: string | undefined
  let zoomScale = 1
  const graphScale = view === "local" ? 1.1 : 0.9
  const connectedIds = (nodeId: string): Set<string> => {
    const result = new Set<string>([nodeId])
    for (const edge of graph.edges) {
      if (edge.source === nodeId) result.add(edge.target)
      if (edge.target === nodeId) result.add(edge.source)
    }
    return result
  }
  const applyVisualState = (): void => {
    const connected = focusedId ? connectedIds(focusedId) : undefined
    for (const visual of nodeVisuals) {
      const isFocused = visual.node.data.id === focusedId
      const isConnected = connected?.has(visual.node.data.id) ?? false
      visual.dot.alpha = connected && view === "global" && !isConnected ? 0.2 : 1
      const baseLabelAlpha = Math.max((zoomScale - 1) / 3.75, 0)
      visual.label.alpha = isFocused ? 1 : baseLabelAlpha
      visual.label.scale.set((isFocused ? 1.1 : 1) / graphScale)
    }
    for (const visual of edgeVisuals) {
      const touchesFocus =
        focusedId !== undefined &&
        (visual.edge.source === focusedId || visual.edge.target === focusedId)
      visual.line.alpha = focusedId === undefined ? 1 : touchesFocus ? 1 : 0.12
    }
  }

  const simulation = forceSimulation<ForceNode>(forceNodes)
    .force(
      "link",
      forceLink<ForceNode, ForceEdge>(forceEdges)
        .id((node) => node.data.id)
        .distance(30),
    )
    .force("charge", forceManyBody<ForceNode>().strength(-50))
    .force(
      "center",
      forceCenter<ForceNode>(width / 2, height / 2).strength(view === "local" ? 0.3 : 0.2),
    )
    .force(
      "collide",
      forceCollide<ForceNode>()
        .radius((node) => 2 + Math.sqrt(node.degree))
        .iterations(3),
    )

  if (view === "global") {
    simulation.force(
      "radial",
      forceRadial<ForceNode>((Math.min(width, height) / 2) * 0.8, width / 2, height / 2).strength(
        0.2,
      ),
    )
  }

  const drawFrame = (): void => {
    for (const visual of edgeVisuals) {
      const sourceX = visual.source.x ?? width / 2
      const sourceY = visual.source.y ?? height / 2
      const targetX = visual.target.x ?? width / 2
      const targetY = visual.target.y ?? height / 2
      const touchesFocus =
        focusedId !== undefined &&
        (visual.edge.source === focusedId || visual.edge.target === focusedId)
      const color = touchesFocus ? gray : lightGray
      visual.line.clear()
      if (visual.edge.kind === "authored") {
        visual.line.moveTo(sourceX, sourceY).lineTo(targetX, targetY).stroke({
          color,
          alpha: 1,
          width: 1,
        })
      } else {
        drawDottedPixiLine(visual.line, sourceX, sourceY, targetX, targetY)
        visual.line.stroke({ color, alpha: 1, width: 1 })
      }
    }
    for (const visual of nodeVisuals) {
      const x = visual.node.x ?? width / 2
      const y = visual.node.y ?? height / 2
      visual.dot.position.set(x, y)
      visual.label.position.set(x, y)
    }
  }

  let settleTimer: number | undefined
  const stopAfterSettling = (delay: number): void => {
    if (settleTimer !== undefined) window.clearTimeout(settleTimer)
    settleTimer = window.setTimeout(() => {
      simulation.stop()
      settleTimer = undefined
    }, delay)
  }

  type DragState = {
    node: ForceNode
    startX: number
    startY: number
    startedAt: number
    moved: boolean
  }
  let activeDrag: DragState | undefined
  let pointerOverNode = false
  const navigateToNode = (node: ForceNode): void => {
    const destination = new URL(routeForNode(node.data), window.location.href)
    if (window.spaNavigate) {
      void window.spaNavigate(destination, false)
    } else {
      window.location.assign(destination)
    }
  }

  for (const node of forceNodes) {
    const radius = 2 + Math.sqrt(node.degree)
    const isCurrent = node.data.id === currentId
    const dot = new Graphics()
    if (node.data.kind === "page") {
      dot.circle(0, 0, radius).fill({ color: isCurrent ? secondary : gray })
    } else {
      dot.circle(0, 0, radius).fill({ color: light }).stroke({ color: tertiary, width: 2 })
    }
    dot.eventMode = "static"
    dot.cursor = "pointer"
    dot.label = nodeLabel(node.data)

    const label = new Text({
      text: nodeLabel(node.data),
      style: {
        fill: dark,
        fontFamily: bodyFont,
        fontSize: 9,
      },
      resolution: (window.devicePixelRatio || 1) * 4,
    })
    label.anchor.set(0.5, 1.2)
    label.eventMode = "none"
    label.alpha = 0

    dot.on("pointerover", () => {
      pointerOverNode = true
      focusedId = node.data.id
      container.dataset.focusedNode = node.data.id
      applyVisualState()
      drawFrame()
    })
    dot.on("pointerout", () => {
      pointerOverNode = false
      focusedId = undefined
      delete container.dataset.focusedNode
      applyVisualState()
      drawFrame()
    })
    dot.on("pointerdown", (event: FederatedPointerEvent) => {
      event.stopPropagation()
      simulation.stop()
      activeDrag = {
        node,
        startX: event.global.x,
        startY: event.global.y,
        startedAt: performance.now(),
        moved: false,
      }
      node.fx = node.x ?? width / 2
      node.fy = node.y ?? height / 2
      dot.cursor = "grabbing"
    })
    nodeLayer.addChild(dot)
    labelLayer.addChild(label)
    nodeVisuals.push({ node, dot, label })
  }

  const moveDrag = (event: FederatedPointerEvent): void => {
    if (!activeDrag) return
    const distance = Math.hypot(
      event.global.x - activeDrag.startX,
      event.global.y - activeDrag.startY,
    )
    if (distance >= 5 && !activeDrag.moved) {
      activeDrag.moved = true
      if (!reducedMotion.matches) simulation.alphaTarget(0.2).restart()
    }
    if (!activeDrag.moved) return
    const position = scene.toLocal(event.global)
    activeDrag.node.fx = position.x
    activeDrag.node.fy = position.y
    if (reducedMotion.matches) {
      activeDrag.node.x = position.x
      activeDrag.node.y = position.y
      drawFrame()
    }
  }
  const finishDrag = (): void => {
    if (!activeDrag) return
    const finished = activeDrag
    const visual = nodeVisuals.find((candidate) => candidate.node === finished.node)
    if (visual) visual.dot.cursor = "pointer"
    finished.node.fx = null
    finished.node.fy = null
    activeDrag = undefined
    simulation.alphaTarget(0)
    if (!finished.moved && performance.now() - finished.startedAt < 500) {
      navigateToNode(finished.node)
    } else if (!reducedMotion.matches) {
      stopAfterSettling(650)
    }
  }
  app.stage.on("globalpointermove", moveDrag)
  app.stage.on("pointerup", finishDrag)
  app.stage.on("pointerupoutside", finishDrag)

  simulation.on("tick", drawFrame)
  if (reducedMotion.matches) {
    simulation.stop()
    simulation.tick(180)
    drawFrame()
  } else {
    stopAfterSettling(view === "local" ? 2600 : 4200)
  }
  applyVisualState()

  const canvasSelection = select<HTMLCanvasElement, undefined>(app.canvas)
  const zoomBehavior = zoom<HTMLCanvasElement, undefined>()
    .scaleExtent([0.25, 4])
    .filter((event) => {
      if (event.type === "wheel") return true
      return !pointerOverNode && activeDrag === undefined
    })
    .on("zoom", (event: D3ZoomEvent<HTMLCanvasElement, undefined>) => {
      zoomScale = event.transform.k
      scene.scale.set(zoomScale)
      scene.position.set(event.transform.x, event.transform.y)
      applyVisualState()
    })
  canvasSelection.call(zoomBehavior)
  canvasSelection.on("dblclick.zoom", null)

  return {
    cleanup: () => {
      simulation.stop()
      if (settleTimer !== undefined) window.clearTimeout(settleTimer)
      canvasSelection.on(".zoom", null)
      app.stage.off("globalpointermove", moveDrag)
      app.stage.off("pointerup", finishDrag)
      app.stage.off("pointerupoutside", finishDrag)
      for (const visual of nodeVisuals) visual.dot.removeAllListeners()
      app.destroy({ removeView: true }, { children: true })
      container.replaceChildren()
      delete container.dataset.graphRenderer
      delete container.dataset.focusedNode
    },
    zoom: (action) => {
      if (action === "reset") {
        zoomBehavior.transform(canvasSelection, zoomIdentity)
        return
      }
      zoomBehavior.scaleBy(canvasSelection, action === "in" ? 1.28 : 0.78)
    },
  }
}

async function renderKnowledgeGraph(
  container: HTMLElement,
  graph: GraphSelection,
  currentId: string,
  view: "local" | "global",
  signal: AbortSignal,
): Promise<RenderedForceGraph | undefined> {
  try {
    return await renderPixiGraph(container, graph, currentId, view, signal)
  } catch (error) {
    if (signal.aborted) return undefined
    console.warn(
      "[KnowledgeGraph] Pixi renderer unavailable; using SVG fallback:",
      error instanceof Error ? error.message : "unknown error",
    )
    container.dataset.graphRenderer = "svg-fallback"
    return renderForceGraph(container, graph, currentId, view)
  }
}

function addRelationshipList(
  list: HTMLUListElement,
  manifest: GraphManifest,
  current: PageNode,
): number {
  list.replaceChildren()
  const nodesById = new Map(manifest.nodes.map((node) => [node.id, node]))
  const rows: Array<{ label: string; node: GraphNode; count?: number }> = []
  for (const edge of manifest.edges) {
    if (edge.kind === "authored" && edge.source === current.id) {
      const target = nodesById.get(edge.target)
      if (target) rows.push({ label: "Links to", node: target, count: edge.count })
    } else if (edge.kind === "authored" && edge.target === current.id) {
      const source = nodesById.get(edge.source)
      if (source) rows.push({ label: "Linked from", node: source, count: edge.count })
    } else if (edge.kind === "tag-membership" && edge.source === current.id) {
      const tag = nodesById.get(edge.target)
      if (tag) rows.push({ label: "Tagged", node: tag })
    }
  }

  rows.sort((left, right) => {
    const labelOrder = left.label.localeCompare(right.label)
    return labelOrder === 0 ? nodeLabel(left.node).localeCompare(nodeLabel(right.node)) : labelOrder
  })
  for (const row of rows) {
    const item = document.createElement("li")
    item.append(`${row.label}: `)
    const anchor = document.createElement("a")
    anchor.href = routeForNode(row.node)
    anchor.textContent = nodeLabel(row.node)
    item.append(anchor)
    if (row.count && row.count > 1) item.append(` (${row.count} references)`)
    list.append(item)
  }
  if (rows.length === 0) {
    const item = document.createElement("li")
    item.textContent = "No authored links or tags yet."
    list.append(item)
  }
  return rows.length
}

function addGlobalBrowseList(list: HTMLUListElement, manifest: GraphManifest): void {
  list.replaceChildren()
  const nodes = [...manifest.nodes].sort((left, right) => {
    if (left.kind !== right.kind) return left.kind === "page" ? -1 : 1
    return nodeLabel(left).localeCompare(nodeLabel(right))
  })
  for (const node of nodes) {
    const item = document.createElement("li")
    const anchor = document.createElement("a")
    anchor.href = routeForNode(node)
    anchor.textContent = nodeLabel(node)
    item.append(anchor)
    list.append(item)
  }
}

function cleanupActive(): void {
  generation += 1
  if (!activeCleanup) return
  activeCleanup()
  activeCleanup = undefined
}

async function initializeGraph(): Promise<void> {
  cleanupActive()
  if (mobileViewport.matches) return
  const root = document.querySelector(".force-graph")
  if (!(root instanceof HTMLElement)) return
  const currentGeneration = generation
  const controller = new AbortController()
  activeCleanup = () => controller.abort()
  const status = root.querySelector("[data-graph-status]")
  if (status instanceof HTMLElement) status.textContent = "Loading graph…"
  root.dataset.state = "loading"

  try {
    const response = await fetch(manifestUrl(), {
      credentials: "same-origin",
      signal: controller.signal,
    })
    if (!response.ok) throw new Error(`Graph manifest returned ${response.status}`)
    const rawManifest: unknown = await response.json()
    const manifest = parseManifest(rawManifest)
    if (!manifest) throw new Error("Graph manifest failed schema validation")
    if (currentGeneration !== generation || !root.isConnected) return

    const currentSlug = normalizeSlug(root.dataset.currentSlug ?? "")
    const current = pageNodes(manifest.nodes).find(
      (node) => normalizeSlug(node.slug) === currentSlug,
    )
    if (!current) throw new Error("Current page is absent from graph manifest")

    const localCanvas = root.querySelector('[data-graph-canvas="local"]')
    const list = root.querySelector("[data-graph-list]")
    const count = root.querySelector("[data-graph-count]")
    const openButton = root.querySelector("[data-graph-open]")
    const dialog = root.querySelector("[data-graph-dialog]")
    const globalCanvas = root.querySelector('[data-graph-canvas="global"]')
    const globalStatus = root.querySelector("[data-global-status]")
    const globalList = root.querySelector("[data-global-list]")
    if (
      !(localCanvas instanceof HTMLElement) ||
      !(list instanceof HTMLUListElement) ||
      !(openButton instanceof HTMLButtonElement) ||
      !(dialog instanceof HTMLDialogElement) ||
      !(globalCanvas instanceof HTMLElement) ||
      !(globalList instanceof HTMLUListElement)
    ) {
      throw new Error("Graph component markup is incomplete")
    }

    const localGraph = await renderKnowledgeGraph(
      localCanvas,
      localSelection(manifest, current),
      current.id,
      "local",
      controller.signal,
    )
    if (!localGraph || currentGeneration !== generation || !root.isConnected) {
      localGraph?.cleanup()
      return
    }
    const relationshipCount = addRelationshipList(list, manifest, current)
    addGlobalBrowseList(globalList, manifest)
    if (count instanceof HTMLElement) count.textContent = String(relationshipCount)
    if (status instanceof HTMLElement) status.textContent = "Drag a node to explore."
    root.dataset.state = "ready"

    let globalGraph: RenderedForceGraph | undefined
    let globalRender: Promise<void> | undefined
    const renderGlobal = (): void => {
      if (globalGraph || globalRender) return
      globalRender = renderKnowledgeGraph(
        globalCanvas,
        { nodes: manifest.nodes, edges: manifest.edges },
        current.id,
        "global",
        controller.signal,
      )
        .then((rendered) => {
          if (!rendered) return
          if (
            currentGeneration !== generation ||
            controller.signal.aborted ||
            !dialog.isConnected
          ) {
            rendered.cleanup()
            return
          }
          globalGraph = rendered
          if (globalStatus instanceof HTMLElement) {
            const pages = pageNodes(manifest.nodes).length
            const tags = manifest.nodes.length - pages
            globalStatus.textContent = `${pages} pages · ${tags} tags · ${manifest.edges.length} relationships`
          }
        })
        .catch((error: unknown) => {
          if (controller.signal.aborted) return
          if (globalStatus instanceof HTMLElement) {
            globalStatus.textContent = "Expanded graph unavailable. The article is still readable."
          }
          console.warn(
            "[KnowledgeGraph] Expanded graph initialization failed:",
            error instanceof Error ? error.message : "unknown error",
          )
        })
        .finally(() => {
          globalRender = undefined
        })
    }
    const openDialog = (): void => {
      dialog.showModal()
      dialog.focus()
      renderGlobal()
    }
    const closeFromBackdrop = (event: MouseEvent): void => {
      if (event.target === dialog) dialog.close()
    }
    openButton.addEventListener("click", openDialog)
    dialog.addEventListener("click", closeFromBackdrop)

    const teardown = (): void => {
      controller.abort()
      localGraph.cleanup()
      globalGraph?.cleanup()
      openButton.removeEventListener("click", openDialog)
      dialog.removeEventListener("click", closeFromBackdrop)
      if (dialog.open) dialog.close()
    }
    activeCleanup = teardown
    if (typeof window.addCleanup === "function") {
      window.addCleanup(() => {
        if (activeCleanup === teardown) cleanupActive()
      })
    }
  } catch (error) {
    if (controller.signal.aborted || currentGeneration !== generation || !root.isConnected) return
    activeCleanup = undefined
    root.dataset.state = "failed"
    if (status instanceof HTMLElement) {
      status.textContent = "Graph unavailable. The article is still fully readable."
    }
    console.warn(
      "[KnowledgeGraph] Optional graph unavailable:",
      error instanceof Error ? error.message : "unknown error",
    )
  }
}

const handleNavigation = (): void => {
  void initializeGraph()
}

window.__knowledgeForceGraphRuntime?.dispose()
document.addEventListener("nav", handleNavigation)
document.addEventListener("render", handleNavigation)
document.addEventListener("themechange", handleNavigation)
mobileViewport.addEventListener("change", handleNavigation)
window.__knowledgeForceGraphRuntime = {
  dispose: () => {
    cleanupActive()
    document.removeEventListener("nav", handleNavigation)
    document.removeEventListener("render", handleNavigation)
    document.removeEventListener("themechange", handleNavigation)
    mobileViewport.removeEventListener("change", handleNavigation)
  },
}
queueMicrotask(handleNavigation)

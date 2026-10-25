import type { QuartzComponent, QuartzPageTypePluginInstance } from "@quartz-community/types"
import { buildCourseSummaries, buildPracticeIndex, type IndexFile } from "./src/index.ts"
import {
  COURSE_MARKER,
  PRACTICE_MARKER,
  renderCourseTable,
  renderPracticeIndex,
  replaceMarker,
} from "./src/render.ts"

const NoopBody: QuartzComponent = () => null

/**
 * The generated index tables.
 *
 * A page asks for a listing with a marker in its body:
 *
 * - `<!-- generated:courses -->` becomes the table of every course;
 * - `<!-- generated:practice -->` becomes the index of every course that has
 *   practice material.
 *
 * The listing is built when the page is rendered, from the metadata Quartz has
 * already parsed, so it can never drift from the material it describes. The
 * generated links carry no `data-slug`, which is what keeps them out of the
 * knowledge graph: a generated listing is navigation, not an authored claim.
 */
function GeneratedIndexPlugin(): QuartzPageTypePluginInstance {
  let cachedFiles: readonly IndexFile[] | undefined
  let cachedCourses: ReturnType<typeof buildCourseSummaries> | undefined
  let cachedPractice: ReturnType<typeof buildPracticeIndex> | undefined

  return {
    name: "GeneratedIndex",
    match() {
      return false
    },
    layout: "content",
    body: () => NoopBody,
    treeTransforms() {
      return [
        (root, _slug, componentData) => {
          if (cachedFiles !== componentData.allFiles) {
            cachedFiles = componentData.allFiles
            cachedCourses = buildCourseSummaries(componentData.allFiles)
            cachedPractice = buildPracticeIndex(componentData.allFiles)
          }

          if (cachedCourses && cachedCourses.length > 0) {
            replaceMarker(root, COURSE_MARKER, renderCourseTable(cachedCourses))
          }
          if (cachedPractice && cachedPractice.length > 0) {
            replaceMarker(root, PRACTICE_MARKER, renderPracticeIndex(cachedPractice))
          }
        },
      ]
    },
  }
}

export default GeneratedIndexPlugin
export { buildCourseSummaries, buildPracticeIndex } from "./src/index.ts"
export {
  COURSE_MARKER,
  PRACTICE_MARKER,
  renderCourseTable,
  renderPracticeIndex,
} from "./src/render.ts"

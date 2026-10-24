#!/usr/bin/env node
// Guard: no branch may carry a course that is waiting for a rights review.
//
// The owner cleared all fourteen ingested courses on 2026-10-24, so the list
// below is empty. Add a slug here when a course is held back again: the
// repository is public and Vercel builds a preview deployment for every
// pushed branch, so a stray push would publish it.
//
//   node scripts/check-held-courses.mjs [ref ...]     # default: HEAD
//
// Exits non-zero and explains what it found if any held course is present.

import { execFileSync } from "node:child_process"

export const HELD_COURSES = [
  // "some-course-slug",
]

function listTree(ref) {
  try {
    return execFileSync("git", ["ls-tree", "-r", "--name-only", ref], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .filter(Boolean)
  } catch {
    return null
  }
}

export function heldFilesIn(ref) {
  const files = listTree(ref)
  if (files === null) return null
  return files.filter((file) =>
    HELD_COURSES.some((slug) => file.startsWith(`content/courses/${slug}/`)),
  )
}

const isMain = process.argv[1] && process.argv[1].endsWith("check-held-courses.mjs")

if (isMain) {
  const refs = process.argv.slice(2)
  const targets = refs.length > 0 ? refs : ["HEAD"]
  let failed = false

  for (const ref of targets) {
    const held = heldFilesIn(ref)
    if (held === null) {
      console.error(`check-held-courses: cannot read the tree of ${ref}`)
      failed = true
      continue
    }
    if (held.length > 0) {
      console.error(
        `check-held-courses: ${ref} carries ${held.length} file(s) of a course that is ` +
          `still waiting for a rights review:`,
      )
      for (const file of held.slice(0, 5)) console.error(`    ${file}`)
      if (held.length > 5) console.error(`    ... and ${held.length - 5} more`)
      failed = true
    }
  }

  if (failed) {
    console.error(
      "\nThese courses are held local by owner decision. Do not push a branch " +
        "that contains them; the repository is public and Vercel previews every " +
        "pushed branch.",
    )
    process.exit(1)
  }
  console.log(`check-held-courses: ${targets.join(", ")} carries no held course`)
}

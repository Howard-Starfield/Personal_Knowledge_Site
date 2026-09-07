import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"

const validator = path.resolve("scripts/validate-content.mjs")

function createFixture(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fieldbook-content-"))
  for (const [relativePath, source] of Object.entries(files)) {
    const target = path.join(root, relativePath)
    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, source)
  }
  return root
}

function runValidator(root) {
  return spawnSync(process.execPath, [validator, root], {
    cwd: path.resolve("."),
    encoding: "utf8",
  })
}

const category = `---
id: "11111111-1111-4111-8111-111111111111"
title: "Fixture Category"
description: "A category used by validator tests."
type: category
publish: true
status: active
created: "2026-08-30"
tags: []
---

Fixture introduction.
`

const article = `---
id: "22222222-2222-4222-8222-222222222222"
title: "Fixture Article"
description: "An article used by validator tests."
type: article
publish: true
status: active
created: "2026-08-30"
tags: []
---

Return to [[topic/index|the category]].
`

test("accepts a valid category and article", (t) => {
  const root = createFixture({ "topic/index.md": category, "topic/article.md": article })
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))

  const result = runValidator(root)

  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /2 entities, 2 unique IDs/)
})

test("rejects a duplicate content ID", (t) => {
  const duplicate = article.replace(
    "22222222-2222-4222-8222-222222222222",
    "11111111-1111-4111-8111-111111111111",
  )
  const root = createFixture({ "topic/index.md": category, "topic/article.md": duplicate })
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))

  const result = runValidator(root)

  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /duplicate id/)
})

test("rejects an unknown Learning Log reference", (t) => {
  const learningNote = `---
id: "33333333-3333-4333-8333-333333333333"
title: "Fixture Note"
description: "A learning note with a broken reference."
type: learning-note
publish: true
status: active
created: "2026-08-30"
tags: []
annotationKind: reminder
relatedContentIds:
  - "44444444-4444-4444-8444-444444444444"
---

Fixture note.
`
  const root = createFixture({ "learning-log/note.md": learningNote })
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))

  const result = runValidator(root)

  assert.notEqual(result.status, 0)
  assert.match(result.stderr, /relatedContentIds target does not exist/)
})

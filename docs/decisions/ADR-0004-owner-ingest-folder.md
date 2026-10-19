# ADR-0004: Owner Ingest Folder for Course Sources

| Field                  | Value                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Status                 | Proposed                                                                                                           |
| Date                   | 2026-10-18                                                                                                         |
| Decision owners        | Product owner                                                                                                      |
| Related PRD section    | FR-PUB-04 to FR-PUB-06 (source-based authoring)                                                                    |
| Related execution plan | To be created from `docs/exec-plans/PLAN_TEMPLATE.md` before `--apply` is enabled                                  |
| Supersedes             | None. Amends ADR-0002 decision 3 (no sibling discovery, no moving source files) for the owner's ingest folder only |
| Superseded by          | None                                                                                                               |

## Context

The owner's words (2026-10-18): "we might need to have a `ingest` folder and update the pipline and md so in
the future I could just add stuff in the `ingest` folder and it would automatically scan and index and work on
them, then move them into `done` folder."

Today every course is an exact, owner-declared source path, and ADR-0002 decision 3 forbids the blog agent
from discovering sibling sources or moving source files. That keeps the authority small, but it makes the
owner name every folder by hand and move finished folders by hand.

Two kinds of item arrive:

- LinkedIn Learning downloads (a course folder with `Study.md` transcripts and PDFs). Rights are not cleared;
  ADR-0003 keeps them off `v5` until the owner decides per course.
- Owner-authored course folders (for example `accounting_ai_crash_course`, `AI_AGENT_CRASH_COURSE`): Markdown
  chapters, an MIT licence, memory cards, audit reports.

## Decision drivers

- The owner drops a folder in one place and starts a run; nothing else to name.
- Sources stay read-only while work is in progress, and nothing is ever deleted or overwritten.
- No background watcher, schedule, or unattended agent (consistent with ADR-0003's owner-started runs).
- Every step is reproducible from hashes and can be rolled back by moving a folder back.
- Text inside an item is untrusted data and can never widen the agent's authority.

## Considered options

| Option                                                                                  | Summary                                                                  | Verdict                                                       |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| A. Keep exact owner-declared paths only                                                 | ADR-0002 as is                                                           | Safe, but the owner must name each folder and move it by hand |
| B. Background watcher on `ingest/`                                                      | Starts work whenever a folder appears                                    | Rejected: unattended runs, cost, prompt-injection exposure    |
| C. Owner-started scan of one ingest root, move to `Done` only after approval (selected) | Scan, index, classify, fan out; move behind an explicit, gated `--apply` | Selected                                                      |

## Decision

1. **One ingest root.** The owner's ingest root is `<linkedinLearning>/ingest/`, a sibling of `Done/`. The
   path is supplied to the tool by argument or the `INGEST_ROOT` environment variable, never hard-coded.
   Only the direct child folders of this one root are items. Nothing above or beside it is scanned.
2. **Owner-started scan.** "Automatic" means: when the owner starts a run, `scripts/ingest.py --scan` lists
   the ingest root's direct child folders. There is no watcher and no scheduled run.
3. **Index with hashes.** Each item is recorded in `private/ingest/INDEX.json` with every file's relative
   path, size, and SHA-256, plus a tree hash. A changed tree hash is a new revision of the item, never a
   silent overwrite of the old record. Symlinks and paths that resolve outside the item fail the scan.
4. **Read-only while indexed.** The tool and every agent read items in place and never write, rename, or
   delete anything inside an item or the ingest root.
5. **Classification.** An item with `Study.md` or `Study.draft.md` is `linkedin-download` (extract with
   `scripts/extract-linkedin-courses.py`; rights gate of ADR-0003 applies). An item with a `chapters/` folder
   of Markdown chapters is `owner-course` (the chapter file is the source; no extraction). Anything else is
   `unknown` and waits for the owner. Classification never selects placement, tags, or publication.
6. **Fan-out.** Classified items are planned in `private/linkedin-extracts/FANOUT.json` and authored with
   `docs/templates/CHAPTER_WORK_ORDER.md`, exactly as for owner-declared courses.
7. **Move to Done only after approval.** `scripts/ingest.py --move <item>` moves an item folder from the ingest
   root to `<linkedinLearning>/Done/<item>` only when all of these hold:
   - this ADR's status is `Accepted` (the tool reads this file and refuses otherwise);
   - `--apply` is given (the default is a dry run that only prints the plan);
   - the item's index status is `approved`, set by the owner with `--approve <item>` after the course is
     merged into `study` (ADR-0003) and reviewed;
   - the item's current tree hash equals the indexed hash;
   - `Done/<item>` does not exist (a name collision stops the move; nothing is renamed or merged);
   - source and destination are on the same volume, so the move is a single rename, never copy-and-delete.
     The tool writes a before/after hash manifest to `private/ingest/moves/<item>-<timestamp>.json` and fails if
     any hash differs after the move.
8. **Never delete or overwrite.** No step deletes a file, empties a folder, or overwrites an existing path.

## Contract impact

- [ ] Quartz/core/plugin boundary
- [ ] content/frontmatter schema
- [ ] immutable IDs
- [x] source-authoring boundary: ADR-0002 decision 3 is relaxed for the ingest root only (scan of direct
      children; move after approval). Owner-declared exact paths elsewhere keep ADR-0002 rules.
- [x] privacy/retention: item hashes and relative paths are stored only in Git-ignored `private/ingest/`.
- [ ] graph semantics, routes, API, D1, Access, R2/Stream, deployment topology

## Consequences

### Positive

- The owner adds a folder and starts a run; the index says what is new, changed, in progress, or done.
- Finished items leave the ingest root through one audited, reversible move.

### Negative

- The agent now enumerates one folder it was not told about item by item. Mitigated by the single root,
  direct-children-only scan, and untrusted-data rule.
- A `Done/` folder with a colliding name blocks a move until the owner renames something.

### New risks

- Prompt injection in item names or files. Item names are data; they never become commands, paths outside
  the root, or instructions.
- A partially copied item scanned too early. Mitigated by tree hashes: a changed item is re-indexed as a new
  revision and its work restarts.

## Migration plan

1. Create `<linkedinLearning>/ingest/` (empty). Done 2026-10-18.
2. Ship `scripts/ingest.py` with `--scan`, `--item` (index one owner-declared folder outside the root),
   `--approve`, and `--move` (dry run unless `--apply`; refused until this ADR is Accepted).
3. Owner reviews and accepts or rejects this ADR; on acceptance, write the execution plan for `--apply`
   and prove one move with a fixture item.

## Backward compatibility

Existing owner-declared courses (`Done/<course>`, the two crash-course folders in `<linkedinLearning>/`) are
unaffected. They can be indexed with `--item` without being moved.

## Rollback

| To roll back | Do this                                                                               | What is kept                                 |
| ------------ | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| The scan     | Stop running `--scan`; delete nothing                                                 | `private/ingest/INDEX.json` stays as history |
| A move       | Move the folder from `Done/` back to `ingest/` and check it against the move manifest | Every file, verified by hash                 |
| This ADR     | Mark it Rejected; `--move` stays refused                                              | The index and all sources                    |

## Validation and acceptance evidence

- Scan: an empty root, a new item, an unchanged item, a changed item (new revision), a symlink (refused),
  and an item with an unknown shape.
- Move: refused while Proposed; dry run prints the plan; refused without `approved`; refused on hash drift;
  refused on a `Done/` name collision; success writes a manifest whose before/after hashes match.

## Follow-up work

- [ ] Owner decision on this ADR.
- [ ] Execution plan and fixture tests before enabling `--apply`.
- [ ] Update `docs/SECURITY.md` and `docs/architecture/ARCHITECTURE.md` with the ingest root if accepted.

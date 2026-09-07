# Execution plan: mock decision-tools content

| Field           | Value                                                    |
| --------------- | -------------------------------------------------------- |
| Status          | Complete                                                 |
| Owner           | Product owner                                            |
| Created         | 2026-08-30                                               |
| Updated         | 2026-08-30                                               |
| Baseline commit | `c97512f787a831778c6f832535ec5af9bf4dacff`               |
| Target branch   | `v5`                                                     |
| PR              | None                                                     |
| PRD phase       | Phase 0 representative fixture and Phase 1 content shape |
| Related ADRs    | ADR-0002, source-authoring boundary only                 |

## 1. Objective

Add an original mock content set that makes the site useful for visual and
navigation review beyond the existing retrieval topic. The set contains one
top-level category, one nested category, three articles, and one related
Learning Log entry.

Add a rerunnable validator for the content contracts exercised by this set.

## 2. Non-goals

- Do not publish externally, change Cloudflare resources, or resolve the Phase
  0 launch blockers.
- Do not import or paraphrase private course material.
- Do not add question banks, executable quizzes, progress, comments, graph,
  media, D1, Access, or a browser editor.
- Do not add a tag or change taxonomy rules.
- Do not patch Quartz core or add a dependency.

## 3. Acceptance gates

- [x] Every new entity has a unique random UUIDv4 and valid required
      frontmatter.
- [x] The top-level category lists its two direct articles and one immediate
      subcategory without flattening the nested article.
- [x] The nested category lists its article.
- [x] Authored internal links resolve and represent intentional relationships.
- [x] The Learning Log entry references existing content IDs.
- [x] The mock copy is original and clearly labeled as example content.
- [x] Private paths, raw course material, and executable quiz blocks do not
      enter public output.
- [x] Formatting, content validation, TypeScript, tests, Quartz build, output
      scans, and browser checks pass.

## 4. Instruction sources

| Scope        | Instruction file                                    | Relevant rules                                           |
| ------------ | --------------------------------------------------- | -------------------------------------------------------- |
| Repository   | `AGENTS.md`                                         | Plan first, preserve dirty work, validate real output    |
| Content      | `content/AGENTS.md`                                 | Identity, placement, links, public boundary              |
| Product      | `docs/product/PRD.md`                               | Phase 0 fixture, Phase 1 content, category semantics     |
| Contract     | `docs/contracts/CONTENT_MODEL.md`                   | Frontmatter, article, category, and learning-note fields |
| Architecture | `docs/decisions/ADR-0002-separate-personal-wiki.md` | No private source-authoring authority in this slice      |

The root and nested instructions, PRD, content contract, active Phase 0 plan,
version matrix, and ADR-0002 were inspected on 2026-08-30.

## 5. Version and environment matrix

| Component | Exact version or commit                               | Source                      |
| --------- | ----------------------------------------------------- | --------------------------- |
| Quartz    | `5.0.0` at `c97512f787a831778c6f832535ec5af9bf4dacff` | Git and `package.json`      |
| Node.js   | Local `v24.14.0`; project pin `v22.16.0`              | Runtime and `.node-version` |
| npm       | Local `11.9.0`                                        | Runtime                     |
| Wrangler  | `4.125.0`                                             | Lockfile and version matrix |
| YAML      | Existing project dependency                           | `package-lock.json`         |

## 6. Source verification

No library behavior changes in this slice. The implementation uses the pinned
Quartz folder-page, content-page, explicit-publish, and content-index behavior
already verified by the completed local showcase plan. Current installed output
will be checked again through a real build and browser preview.

## 7. Repository findings

- The working tree is clean on branch `v5` at the baseline commit.
- Thirteen public entities cover retrieval, one course, and one Learning Log
  note.
- Only `retrieval` appears as a current tag. This slice adds no tag.
- No local preview was listening on port 8080 at task start.
- External deployment remains blocked by the active Phase 0 plan.

## 8. Contracts and invariants

- Markdown under `content/` remains canonical.
- IDs never derive from titles or paths and never change after publication.
- Each category owns one real `index.md`; generated listings remain navigation.
- The nested article appears only on its immediate category listing.
- Body links are intentional knowledge relationships.
- The Learning Log reference list uses immutable IDs.
- All material in this slice is original mock prose and safe for public output.

## 9. Design

Add `Decision tools` as a separate top-level collection. Its two direct articles
cover decisions before and after commitment. The nested `Experiments` category
holds one article about changing one variable at a time. A Learning Log note
connects the decision-record and pre-mortem articles through stable IDs and an
authored body link.

This is the smallest set that proves direct-child and grandchild behavior while
giving the homepage a second subject area. No ADR is required.

## 10. Data and schema changes

- Add six content entities using existing fields and types.
- Add no field, schema version, database, API, media contract, or dependency.
- Add a Node.js validator that reads Markdown frontmatter with the existing
  `yaml` dependency and checks current-tree identity and references.

## 11. File touch plan

| Order | Path                                                | Change                                 |
| ----: | --------------------------------------------------- | -------------------------------------- |
|     1 | This plan                                           | Scope and proof contract               |
|     2 | `scripts/validate-content.mjs` and its test         | Rerunnable content-contract validation |
|     3 | `package.json`                                      | Add `validate:content` script          |
|     4 | `content/decision-tools/**`                         | Category, subcategory, and articles    |
|     5 | `content/learning-log/what-would-change-my-mind.md` | Related mock Learning Log entry        |
|     6 | `content/index.md`                                  | Add Decision tools to authored index   |

## 12. Steps

1. Add and run the validator against the unchanged baseline.
2. Add the mock content and homepage link.
3. Run formatting, validation, tests, build, and public-output scans.
4. Exercise desktop and mobile routes in a real browser.
5. Record evidence and move this plan to `completed/`.

## 13. Test plan

- `npm run validate:content`
- targeted Prettier check for changed files
- `npx tsc --noEmit`
- `npm test`
- `npx quartz build --concurrency=1`
- emitted-route, broken-link, quiz-block, and private-path scans
- browser checks for homepage navigation, both category listings, article
  links, Learning Log entry, desktop layout, mobile layout, and console errors

## 14. Migration and compatibility

No migration. Existing IDs, files, routes, and content remain unchanged. The
homepage gains one authored collection row. New routes are additive.

## 15. Deployment

Not authorized. Only local build, preview, and Wrangler dry-run evidence may be
collected.

## 16. Rollback

Before public deployment, rollback removes only the new content files, the
homepage row, the validator, the package script, and this plan. After public
publication, IDs must not be reused.

## 17. Risks and stop conditions

| Risk                                    | Response                                                |
| --------------------------------------- | ------------------------------------------------------- |
| An existing validator contract differs  | Stop and reconcile the executable authority             |
| Generated listing flattens a grandchild | Stop and report the Quartz or configuration mismatch    |
| A new tag appears necessary             | Leave tags empty; do not expand taxonomy in this slice  |
| Private or raw text enters output       | Stop, remove the affected output, and report the source |

## 18. Adversarial review

- Generated category rows remain navigation. Only authored body links create
  explicit relationships.
- No existing ID, path, alias, route, or content body changed except the
  additive homepage collection row.
- All six IDs came from `New-Guid` and were recorded once before publication.
- The public-output scan found no private authoring path, personal-wiki path,
  raw wiki-link tail, or executable quiz block.
- This slice added no principal, client identity, API, D1 data, managed media,
  runtime state, listener, observer, or optional frontend dependency.
- The validator parses YAML at the filesystem boundary and checks values before
  using content references. It does not cast runtime data into a domain type.
- Existing tests were not changed or weakened. Three validator tests add valid,
  duplicate-ID, and unknown-related-content cases.
- The change adds one linear parse pass and indexed reference checks. It adds
  no browser corpus scan or quadratic full-corpus path.
- Rollback removes additive files and one homepage row. No user data or existing
  public identity is deleted.

## 19. Completion evidence

- `npm run validate:content` passed with 19 entities and 19 unique IDs.
- `node --test scripts/validate-content.test.mjs` passed 3 of 3 focused tests.
- Targeted Prettier and `npx tsc --noEmit` passed.
- `npm test` passed 166 of 166 tests with zero failures or skips.
- `npx quartz build --concurrency=1` parsed 20 Markdown inputs, filtered the
  nonpublic `content/AGENTS.md`, and emitted 59 production files.
- The output scan found all six new routes and no broken-link marker, raw
  wiki-link tail, private workflow path, or executable quiz block.
- The parent Decision Tools output lists exactly three direct children and
  excludes the nested article. The Experiments output lists that one article.
- Wrangler `4.125.0` dry-run read 71 static assets, found no bindings, and did
  not deploy.
- Playwright exercised homepage navigation, the parent category, the nested
  article, authored links, backlinks, and the related Learning Log entry.
  Desktop and 390-pixel views fit the viewport and produced zero console errors.
- Visual evidence is stored in ignored files
  `output/playwright/decision-article-desktop.png` and
  `output/playwright/decision-tools-mobile.png`.
- A current `npm audit --json` reports one low-severity issue and no moderate,
  high, or critical issues. This improves the older Phase 0 audit result but
  does not close the remaining public-launch gates.

The site remains ready for local content review, not external deployment.
Generated output still contains `https://undefined` social image URLs and a
`cdnjs.cloudflare.com` preconnect. The local Node `v24.14.0` also differs from
the project pin `v22.16.0`. The active Phase 0 plan owns those decisions.

## 20. Final acceptance checklist

- [x] Objective achieved.
- [x] Non-goals preserved.
- [x] Acceptance gates pass.
- [x] Tests and browser evidence recorded.
- [x] Security and privacy review complete.
- [x] Known launch limitations remain explicit.

## 21. Completion log

| Date       | Commit        | Work completed                                                                 | Evidence                                                         | Remaining                      |
| ---------- | ------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------ |
| 2026-08-30 | Not committed | Added Decision Tools mock content, a Learning Log note, and content validation | 166 tests, production build, output scans, Wrangler dry-run, UAT | Phase 0 public-launch blockers |

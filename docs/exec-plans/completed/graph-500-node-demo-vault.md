# Execution plan: 500-node graph demo vault

| Field    | Value                                                |
| -------- | ---------------------------------------------------- |
| Status   | Completed                                            |
| Created  | 2026-08-30                                           |
| Baseline | `c97512f` plus the uncommitted graph and demo slices |
| Scope    | Public mock content and graph-scale proof            |

## Objective

Add more than 500 connected mock page nodes through the real Markdown publishing pipeline so the local and global graph can be judged at Quartz-like density.

## Content shape

- Create `content/graph-lab/index.md` as a public category.
- Create 10 public subcategory indexes below `content/graph-lab/`.
- Create 52 mock articles in each subcategory, for 520 articles.
- Total new page nodes: 531.
- Each article links to its previous and next article, the same position in the next cluster, and its category index. This produces a connected, reviewable network without inferred edges.
- Generated category listings remain navigation and create no graph edges.
- Tags remain empty so the scale fixture measures page relationships rather than adding an artificial tag hub.

## Identity and generation

`scripts/generate-graph-demo.mjs` owns generation. On first run it creates random UUIDv4 values and records them in `scripts/fixtures/graph-demo-ids.json`. Later runs preserve those IDs. The script validates its registry, refuses duplicate IDs, and writes only below `content/graph-lab/`.

The generator adds a marker comment to every generated file. It must refuse to overwrite an unmarked Markdown file or automatically delete a stale generated file; either condition requires manual review.

## Files

- `scripts/generate-graph-demo.mjs`
- `scripts/fixtures/graph-demo-ids.json`
- `content/graph-lab/**`
- `package.json`
- this plan

## Acceptance gates

- [x] The generator is idempotent and preserves all recorded UUIDs.
- [x] Exactly 531 generated Markdown pages exist below the one approved boundary.
- [x] Content validation passes with unique UUIDv4 IDs and valid category indexes.
- [x] Every generated internal link resolves.
- [x] The real graph manifest contains at least 550 page nodes and remains schema-valid.
- [x] The real Quartz build and Cloudflare dry-run pass.
- [x] The browser renders one global Pixi canvas with 500-plus nodes and no console errors.
- [x] The article remains readable and the graph remains optional.

## Evidence

- Repeated generation created zero new IDs and preserved the SHA-256 hashes of the registry and a representative generated page.
- `npm run validate:content`: 550 entities and 550 unique IDs.
- `npm test`: 173 tests passed across 45 suites.
- `npx quartz build --concurrency=1`: 551 inputs, one unpublished file filtered, and 593 files emitted in 3 seconds.
- `npm run validate:graph`: 550 pages, one tag, 2,159 relationships, and 532 graph-enabled HTML pages.
- `npx wrangler deploy --dry-run`: accepted 616 static assets with no bindings.
- Browser: one open global Pixi canvas with a 1474 by 981 backing surface, 551 accessible node links, and no console warnings or errors.
- `npm run check`: TypeScript passed; Prettier remains red only on eight pre-existing documentation files outside this plan.

## Non-goals

- This mock corpus is not factual knowledge, source-derived content, or a production taxonomy recommendation.
- Do not modify existing content or IDs.
- Do not add graph-only fake nodes, inferred links, embeddings, tags, or a database.
- Do not deploy or publish externally.

## Rollback

Remove the marked generated `content/graph-lab/` tree, the generator, its registry, and the package script. No existing content or identity changes.

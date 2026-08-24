# Knowledge Fieldbook

A Quartz 5 public knowledge, course, and active-learning site. Markdown under
`content/` is the public source of truth; Git review is the publishing boundary.

The current repository includes a local showcase of the approved static
experience. External deployment is still blocked by the open Phase 0 items in
`docs/exec-plans/active/phase-0-online-foundation.md`.

## Run the local showcase

Requirements are recorded in `docs/architecture/VERSION_MATRIX.md`.

```powershell
npm install
npx quartz build --serve --port 8080 --concurrency=1
```

Open `http://localhost:8080/`. The development server watches `content/` and
project styling for changes. Stop it with `Ctrl+C`.

For verification without a server:

```powershell
npx tsc --noEmit
npm test
npx quartz build --concurrency=1
```

## Project map

| Need                                   | Authority                                         |
| -------------------------------------- | ------------------------------------------------- |
| Agent entry and non-negotiable rules   | `AGENTS.md`                                       |
| Product behavior and phase boundaries  | `docs/product/PRD.md`                             |
| System structure                       | `docs/architecture/ARCHITECTURE.md`               |
| Pinned runtime and dependency evidence | `docs/architecture/VERSION_MATRIX.md`             |
| Published content contract             | `docs/contracts/CONTENT_MODEL.md`                 |
| Project-wide testing rules             | `docs/TESTING_STRATEGY.md`                        |
| Security and trust boundaries          | `docs/SECURITY.md`                                |
| Architectural decisions                | `docs/decisions/`                                 |
| Current implementation work            | `docs/exec-plans/active/`                         |
| Content-agent handoff                  | `docs/templates/content_intake_handoff_prompt.md` |

See `docs/README.md` for the complete documentation map and the distinction
between project-owned product documents and the bundled Quartz reference docs.

## Current feature status

- Live locally: public Markdown, generated folder navigation, search, explorer,
  tags, backlinks, popovers, dark mode, callouts, course-shaped demo content,
  Learning Log content, and semantic answer disclosure.
- Planned baseline: strict content/identity validation, generated category
  tables, generated course lesson tables, and bank-backed interactive quizzes.
- Later/gated: owner Learning Inbox, community comments, custom graph, managed
  media, synchronized progress, and browser administration.

The local showcase does not authorize deployment, and its semantic answer
preview is not the unresolved executable quiz schema.

# Project Documentation Map

This repository contains two kinds of documentation:

1. project-owned product and operating authority listed below;
2. bundled Quartz documentation such as `docs/features/`, `docs/plugins/`,
   `docs/advanced/`, and `docs/cli/`, used as pinned local framework reference.

Do not treat every Markdown file under `docs/` as equal authority. Root
`AGENTS.md` defines reading order and stop conditions.

## Project authority

| Document                         | Responsibility                                                     | Read when                                                        |
| -------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `product/PRD.md`                 | Product outcomes, requirements, phases, open decisions             | Planning or changing product behavior                            |
| `architecture/ARCHITECTURE.md`   | System boundaries and data flow                                    | Changing components, storage, hosting, or integration boundaries |
| `architecture/VERSION_MATRIX.md` | Exact versions and current runtime evidence                        | Dependency, build, hosting, or reproducibility work              |
| `contracts/CONTENT_MODEL.md`     | Frontmatter, content, course, quiz, and capture contracts          | Authoring or validating public content                           |
| `TESTING_STRATEGY.md`            | Project-wide proof philosophy and test layers                      | Planning or reviewing any implementation                         |
| `SECURITY.md`                    | Public/private, identity, source, browser, and provider boundaries | Any content, API, auth, media, or external-service work          |
| `decisions/`                     | Architecturally significant decisions                              | When a relevant lasting trade-off exists                         |
| `exec-plans/active/`             | Exact files, steps, tests, and stop conditions for current work    | Before making a nontrivial change                                |
| `runbooks/`                      | Deterministic operating procedures                                 | Running the named workflow                                       |
| `templates/`                     | Owner/agent authoring packets                                      | Producing the named private artifact                             |

## Maintainer entry

Give a repository-aware maintainer the repository, the exact task, and one
instruction: read root `AGENTS.md` first. The legacy typo-named
`docs/mainter_agent.md` remains preserved for compatibility, but it adds no
authority beyond the root instructions.

## Documentation hygiene

- Put product requirements in the PRD, not an implementation plan.
- Put system-wide structure in Architecture, not a feature README.
- Put lasting architecture trade-offs in an ADR, not every function/branch.
- Put project-wide proof rules in Testing Strategy and feature-specific cases in
  the active execution plan.
- Put trust boundaries in Security and concrete mitigations/tests in the active
  plan.
- Keep completed evidence in `exec-plans/completed/`; do not use it as current
  authority when a newer plan or ADR supersedes it.

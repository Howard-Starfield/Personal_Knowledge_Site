# ADR-0002: Separate the Personal Wiki from Blog Content Authoring

| Field                  | Value                                                                    |
| ---------------------- | ------------------------------------------------------------------------ |
| Status                 | Accepted                                                                 |
| Date                   | 2026-08-24                                                               |
| Decision owners        | Product owner                                                            |
| Related PRD section    | FR-PUB-04 through FR-PUB-06                                              |
| Related execution plan | `docs/exec-plans/completed/separate-personal-wiki-and-blog-authoring.md` |
| Supersedes             | ADR-0001 as an active blog architecture                                  |
| Superseded by          | None                                                                     |

## Context

The Karpathy-style intake workflow was designed as both a private personal wiki
and a feeder for this public Quartz blog. The owner now wants the personal wiki
as a portable, separate workspace while retaining a simpler way to ask another
LLM to turn selected course or article sources into blog-ready review artifacts.

Keeping both purposes in one lifecycle gives a private wiki agent unnecessary
awareness of public-site taxonomy and gives a blog authoring agent unnecessary
authority to stage, seal, move, classify, and retain raw sources.

## Decision

1. The personal-wiki workflow is a standalone kit below the Git-ignored
   `private/personal-wiki-kit/` directory. It uses only paths relative to its own
   root and may be moved out of this repository by the owner.
2. The kit owns its own `raw/`, `work/`, `wiki/`, `review/`, and `archive/`
   lifecycle. It is not a product, content, taxonomy, graph, or publishing
   authority for this blog.
3. This blog accepts only an exact owner-declared source allowlist for a single
   authoring assignment. Source files are read in place. The blog authoring
   agent cannot discover sibling sources, seal an inbox, move/delete source
   files, or create completion receipts.
4. The blog agent follows
   `docs/templates/content_intake_handoff_prompt.md` and writes only a fixed,
   noncanonical review package under
   `private/content-authoring/<packageId>/`.
5. That package separates source inventory, prose drafts, glossary terms,
   question-bank candidates, placement proposals, and audit evidence. It never
   writes directly to `content/`.
6. Core assessment material must be supported by the provided source set.
   Deep-dive material is a separate optional section and is allowed only when
   its external verification sources are explicitly authorized and cited.
7. “Owner-verified” is recorded in the assignment envelope with an explicit
   verification scope. It does not automatically establish factual truth,
   currency, copyright permission, or permission to publish.
8. ADR-0001 and its completed plans remain historical evidence. Existing
   `private/content-intake/` pilot artifacts are preserved in place and are not
   migrated or deleted by this decision.

## Consequences

- The personal wiki can evolve or move independently of Quartz.
- Blog content generation has a smaller, safer authority boundary.
- A repository maintainer still performs rights, factual, taxonomy, identity,
  schema, and publication review before any generated material enters
  `content/`.
- OQ-09 remains open. The question-bank artifact is an editorial interchange
  format, not proof that the website can render it.
- Historical intake documents must not be used as active instructions for new
  blog authoring assignments.

## Rejected alternatives

| Alternative                                               | Reason rejected                                                         |
| --------------------------------------------------------- | ----------------------------------------------------------------------- |
| Keep one dual-purpose intake pipeline                     | Confuses private knowledge maintenance with public publishing authority |
| Let the blog agent move supplied sources into a raw vault | Expands authority and creates destructive/path-containment risk         |
| Write generated drafts directly into `content/`           | Bypasses independent review, canonical IDs, rights, and OQ-09 gates     |
| Treat owner verification as factual/publication approval  | Conflates source identity, truth, currency, and rights                  |

## Rollback

Reinstate ADR-0001 only through a new owner decision and a reconciled execution
plan. Rollback never requires deleting the portable kit or existing raw/pilot
evidence.

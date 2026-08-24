# Architecture

## Scope

This document summarizes the approved system structure. The PRD owns product
behavior, accepted ADRs own later architecture decisions, and the content model
owns serialized public content. This file does not invent APIs or schemas.

## System shape

```text
owner or reviewed content agent
  -> Markdown and validated data in content/
  -> Git branch and pull request
  -> Quartz 5 build-time parsing, filtering, and indexing
  -> static HTML, CSS, client enhancements, and public manifests
  -> Cloudflare Workers Static Assets (after Phase 0 deployment gates)

public reader
  -> open static article/course/lesson/note
  -> optional bounded browser enhancement (search, quiz, graph, comments)
  -> readable content remains when optional enhancement fails
```

## Canonical ownership

| Concern                                                           | Canonical owner                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------- |
| Public prose, annotations, lessons, question definitions, answers | Markdown under `content/` plus Git                      |
| Stable public identity                                            | Immutable UUID in the entity's frontmatter              |
| Physical organization                                             | Folder/category placement; never identity               |
| Cross-category classification                                     | Controlled tags                                         |
| Explicit knowledge relationship                                   | Internal link authored in Markdown body                 |
| Generated navigation                                              | Quartz/build-time indexes; never an authored graph edge |
| Private source-authoring proposals                                | Git-ignored `private/content-authoring/<packageId>/`    |
| Portable personal wiki                                            | Separate kit outside blog architecture (ADR-0002)       |

## Runtime boundaries

- Quartz 5 is the only static publishing framework.
- Public reading has no account requirement.
- Baseline quiz attempts are browser-memory-only and nonsecure; answers remain
  public static content.
- D1, Access, owner capture, Giscus, custom graph rendering, and managed media
  are phase-specific optional services, not baseline dependencies.
- Cloudflare deployment is assets-only unless a later ADR approves a Worker
  topology change.
- Browser features consume build-generated data; they do not rescan the Markdown
  corpus or derive semantic edges from rendered navigation.

## Extension policy

Prefer, in order:

1. authored Markdown and verified built-in Quartz behavior;
2. `quartz.config.yaml` and page/layout configuration;
3. project-owned scoped SCSS;
4. a local/project plugin using verified extension types and lifecycle hooks;
5. an ADR before any core patch, second framework, new database/auth/storage
   dependency, graph-semantics change, or Worker-topology change.

## Failure model

Content reading is the durable center. Search, quizzes, graph, comments, media,
capture, and future APIs must fail independently. Missing or malformed canonical
identity, unsafe public output, unsupported schema, or uncertain authorization
fails the build or request rather than inventing fallback truth.

## Current deployment status

Local builds and an assets-only Wrangler dry run are proven. External deployment
remains blocked by the active Phase 0 plan, including public `baseUrl`, exact
runtime reproducibility, remote-runtime policy, and dependency-hardening work.

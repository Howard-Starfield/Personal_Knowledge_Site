# Vercel deployment hygiene runbook

| Field               | Value                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| Status              | Active operational runbook; two steps still need the owner's account  |
| Scope               | The public site's preview deployments and the branches that make them |
| Repository          | `Howard-Starfield/Personal_Knowledge_Site` (public), branch `v5`      |
| Production          | `https://blog.howardlab.dev`                                          |
| Deployment platform | Vercel, connected to GitHub                                           |

## Purpose

The repository is public and Vercel is connected to it. Two things follow from that,
and this runbook exists to keep both true without the owner having to remember them:

1. **Every branch on the remote is a publication surface.** A branch is built by
   Vercel and served at its own URL. A branch that carries material the owner has not
   cleared, or a branch that is only a working copy, is a copy of the site that
   anybody with the URL can read.
2. **Every branch on the remote is also clutter.** Each one is another preview
   deployment to build, another entry in the dashboard, and another thing to reason
   about when asking "what is published right now".

The rule this runbook enforces: **the remote carries `v5` and nothing else except the
Dependabot branch.** Everything else is local.

## What has already been done

On 2026-10-25 the remote carried thirty-two branches. Twenty-nine of them were
strictly behind `v5` — every commit already in the production branch — and one was
`v5` plus a single commit whose content was in `v5` by another route. They were
merged branches, superseded evidence branches, and working-copy branches that had been
pushed by accident (`claude/*`, from local agent worktrees).

All of them were deleted from the remote; the local copies were kept. The remote now
carries:

```text
v5
dependabot/npm_and_yarn/production-dependencies-7c6590d77c   (the bot's own branch)
```

## Steps the owner performs in the Vercel dashboard

No Vercel credentials exist on the build machine, so these two steps are the owner's.

### 1. Delete the leftover preview deployment

The deployment built from the deleted `backup/wip-2026-10-19` branch is still on
Vercel. Its source branch is gone, so it will never be rebuilt, but the deployment
itself still exists.

- Open the project's **Deployments** list.
- Find the deployment whose source branch reads `backup/wip-2026-10-19`, or whose URL
  begins `personalblog-git-backup-wip-`.
- Open it, then **⋯ → Delete**.
- Confirm the deletion.

As of 2026-10-25 that deployment already answers with Vercel's login wall rather
than the site, so its content is not readable by an anonymous visitor. Deleting it
closes the last trace.

### 2. Stop previewing every branch

- Open **Project Settings → Git**.
- Find **Preview Deployments**.
- Turn **off** the setting that previews every branch, and leave previews on for
  **pull requests** and for the production branch only.
- Save.

After this, a pushed branch produces no public URL. A pull request still gets one,
because that is where a reviewer looks, and pull requests are made against `v5` from
a branch whose content the owner has chosen to publish.

## The branch rule for agents

- Work on a branch, push it, open a pull request against `v5`, and merge through the
  pull request. That is the publishing boundary.
- **Do not push a branch that is not meant to be published.** In particular, do not
  push the local agent worktrees under `.claude/worktrees/`.
- **Do not use `git push --all`.** Push the branch you are working on, by name.
- After a pull request is merged, delete the remote branch:
  `git push origin --delete <branch>`. The commits stay in `v5`; only the branch
  reference goes.
- `scripts/check-held-courses.mjs` refuses to push a branch that carries a course
  whose rights have not been cleared. It is a local pre-push hook; it is a second
  line of defence, not a substitute for this rule.

## Checking the state

```powershell
# The branches the remote carries.
gh api 'repos/Howard-Starfield/Personal_Knowledge_Site/branches' --paginate --jq '.[].name'

# Every branch, compared with the production branch. "behind" means its commits
# are already in v5 and it can be deleted.
python scratch\cc-scope\branch_status.py
```

Both commands should list only `v5` and the Dependabot branch.

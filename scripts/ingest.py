"""Owner ingest folder: scan, index, classify, approve, and (gated) move to Done.

Design: docs/decisions/ADR-0004-owner-ingest-folder.md (Proposed). Runbook: docs/runbooks/LINKEDIN_COURSE_INGESTION.md.

    python -I scripts/ingest.py --root <linkedinLearning>/ingest --scan
    python -I scripts/ingest.py --item "<exact folder path>"            # index one owner-declared folder anywhere
    python -I scripts/ingest.py --root <root> --approve <item-name>      # owner only, after merge into `study`
    python -I scripts/ingest.py --root <root> --done <Done folder> --move <item-name> [--apply]

`--root` may come from INGEST_ROOT and `--done` from INGEST_DONE_DIR.

Boundaries:
- Read-only towards every item: nothing inside an item or the ingest root is written, renamed, or deleted.
- Only direct child folders of the one ingest root are items. Symlinks or paths escaping an item fail.
- The index lives in <repo>/private/ingest/INDEX.json (Git-ignored).
- `--move` is a dry run unless `--apply`; `--apply` is refused until ADR-0004 is Accepted, the item is
  `approved`, its tree hash is unchanged, and the destination does not exist. The move is one rename.
"""

import argparse
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

INDEX_SCHEMA_VERSION = 1
REPO_ROOT = Path(__file__).resolve().parent.parent
STATE_ROOT = REPO_ROOT / "private" / "ingest"
INDEX_PATH = STATE_ROOT / "INDEX.json"
MOVES_DIR = STATE_ROOT / "moves"
ADR_PATH = REPO_ROOT / "docs" / "decisions" / "ADR-0004-owner-ingest-folder.md"


class IngestError(Exception):
    pass


def now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            digest.update(block)
    return digest.hexdigest()


def inventory(item: Path) -> dict:
    """Hash every file below one item. Refuses symlinks and anything resolving outside the item."""
    item = item.resolve()
    files = []
    for dirpath, dirnames, filenames in os.walk(item, followlinks=False):
        base = Path(dirpath)
        for name in list(dirnames):
            if (base / name).is_symlink():
                raise IngestError(f"{item.name}: symlinked folder {(base / name).relative_to(item).as_posix()} refused")
        for name in filenames:
            path = base / name
            if path.is_symlink():
                raise IngestError(f"{item.name}: symlinked file {path.relative_to(item).as_posix()} refused")
            if item not in path.resolve().parents:
                raise IngestError(f"{item.name}: {name} resolves outside the item")
            files.append(
                {"path": path.relative_to(item).as_posix(), "size": path.stat().st_size, "sha256": sha256_file(path)}
            )
    files.sort(key=lambda entry: entry["path"])
    tree = hashlib.sha256("\n".join(f"{f['sha256']}  {f['path']}" for f in files).encode("utf-8")).hexdigest()
    return {"files": files, "tree_sha256": tree, "file_count": len(files)}


def classify(item: Path, files: list) -> dict:
    names = {entry["path"] for entry in files}
    if "Study.md" in names or "Study.draft.md" in names:
        return {"kind": "linkedin-download", "next": "extract with scripts/extract-linkedin-courses.py --course; rights gate (ADR-0003)"}
    chapters = sorted(p for p in names if re.match(r"^chapters/[^/]+\.md$", p, re.IGNORECASE))
    numbered = [p for p in chapters if re.match(r"^chapters/(chapter|CHAPTER)_\d+", p)]
    if numbered:
        return {
            "kind": "owner-course",
            "chapter_files": numbered,
            "support_files": [p for p in chapters if p not in numbered],
            "next": "plan chapters in FANOUT.json; the chapter file is the source (no extraction)",
        }
    return {"kind": "unknown", "next": "owner decides how to treat this item"}


def load_index() -> dict:
    if not INDEX_PATH.is_file():
        return {"schema_version": INDEX_SCHEMA_VERSION, "items": {}}
    data = json.loads(INDEX_PATH.read_text(encoding="utf-8"))
    if data.get("schema_version") != INDEX_SCHEMA_VERSION or not isinstance(data.get("items"), dict):
        raise IngestError("private/ingest/INDEX.json has an unsupported shape; fix or move it aside by hand")
    return data


def save_index(index: dict) -> None:
    STATE_ROOT.mkdir(parents=True, exist_ok=True)
    index["updated_at"] = now()
    INDEX_PATH.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def record_item(index: dict, item: Path, origin: str) -> str:
    inv = inventory(item)
    key = item.name
    existing = index["items"].get(key)
    revision = {"tree_sha256": inv["tree_sha256"], "file_count": inv["file_count"], "indexed_at": now()}
    if existing is None:
        index["items"][key] = {
            "name": key,
            "origin": origin,
            "location": str(item.resolve()),
            "status": "indexed",
            "classification": classify(item, inv["files"]),
            "revisions": [revision],
            "files": inv["files"],
        }
        return "new"
    if existing["revisions"][-1]["tree_sha256"] == inv["tree_sha256"]:
        return "unchanged"
    existing["revisions"].append(revision)  # history is kept; the old record is never overwritten in place
    existing["files"] = inv["files"]
    existing["classification"] = classify(item, inv["files"])
    if existing["status"] != "moved":
        existing["status"] = "changed"
    return "changed"


def resolve_root(raw: str) -> Path:
    if not raw:
        raise IngestError("pass --root or set INGEST_ROOT (no default path is assumed)")
    root = Path(raw).expanduser().resolve()
    if not root.is_dir():
        raise IngestError(f"ingest root does not exist: {root} (the owner creates it)")
    if root == REPO_ROOT or REPO_ROOT in root.parents:
        raise IngestError("the ingest root must be outside the repository")
    return root


def item_in_root(root: Path, name: str) -> Path:
    if not name or any(sep in name for sep in ("/", "\\", ":")) or name in (".", ".."):
        raise IngestError("an item is named by its exact folder name, not a path")
    item = (root / name).resolve()
    if item.parent != root or not item.is_dir():
        raise IngestError(f"no item folder named exactly {name!r} in the ingest root")
    return item


def cmd_scan(root: Path) -> None:
    index = load_index()
    results = {}
    for child in sorted(root.iterdir(), key=lambda p: p.name.lower()):  # direct children of the one root only
        if child.is_symlink():
            raise IngestError(f"symlinked item {child.name} refused")
        if child.is_dir():
            results[child.name] = record_item(index, child, origin="ingest-root")
    save_index(index)
    print(f"Scanned {root}: {len(results)} item(s)")
    for name, outcome in results.items():
        entry = index["items"][name]
        print(f"  {outcome:9} {entry['status']:11} {entry['classification']['kind']:17} {name}")


def cmd_item(raw: str) -> None:
    item = Path(raw).expanduser().resolve()
    if not item.is_dir():
        raise IngestError(f"not a folder: {item}")
    if item == REPO_ROOT or REPO_ROOT in item.parents:
        raise IngestError("an item must be outside the repository")
    index = load_index()
    outcome = record_item(index, item, origin="owner-declared")
    save_index(index)
    entry = index["items"][item.name]
    print(f"{outcome}: {item.name} ({entry['classification']['kind']}, {entry['revisions'][-1]['file_count']} files, "
          f"tree {entry['revisions'][-1]['tree_sha256'][:12]})")


def cmd_approve(name: str) -> None:
    index = load_index()
    entry = index["items"].get(name)
    if entry is None:
        raise IngestError(f"{name!r} is not in the index; scan first")
    if entry["status"] == "moved":
        raise IngestError(f"{name!r} was already moved; it cannot be approved")
    # Approval pins the latest indexed revision; a later change makes the move refuse (hash drift).
    entry["status"] = "approved"
    entry["approved_at"] = now()
    entry["approved_tree_sha256"] = entry["revisions"][-1]["tree_sha256"]
    save_index(index)
    print(f"approved: {name}")


def adr_accepted() -> bool:
    if not ADR_PATH.is_file():
        return False
    match = re.search(r"^\|\s*Status\s*\|\s*([A-Za-z]+)", ADR_PATH.read_text(encoding="utf-8"), re.MULTILINE)
    return bool(match and match.group(1) == "Accepted")


def cmd_move(root: Path, done_raw: str, name: str, apply: bool) -> None:
    if not done_raw:
        raise IngestError("pass --done or set INGEST_DONE_DIR")
    done = Path(done_raw).expanduser().resolve()
    if not done.is_dir():
        raise IngestError(f"Done folder does not exist: {done}")
    item = item_in_root(root, name)
    destination = done / item.name
    index = load_index()
    entry = index["items"].get(name)
    problems = []
    if not adr_accepted():
        problems.append("ADR-0004 is not Accepted")
    if entry is None:
        problems.append("item is not indexed")
    elif entry["status"] != "approved":
        problems.append(f"item status is {entry['status']!r}, not 'approved'")
    before = inventory(item)
    if entry is not None and before["tree_sha256"] != entry.get("approved_tree_sha256"):
        problems.append("item changed since approval (tree hash differs)")
    if destination.exists():
        problems.append(f"destination already exists: {destination} (name collision; nothing is renamed or merged)")
    if os.stat(item).st_dev != os.stat(done).st_dev:
        problems.append("ingest root and Done are on different volumes; a single rename is impossible")

    print(f"Plan: move {item} -> {destination} ({before['file_count']} files, tree {before['tree_sha256'][:12]})")
    if problems:
        print("Refused:\n  - " + "\n  - ".join(problems))
        if apply:
            raise IngestError("move refused")
        return
    if not apply:
        print("Dry run: all checks pass. Re-run with --apply to move.")
        return

    os.rename(item, destination)  # one rename on one volume; never copy-and-delete
    after = inventory(destination)
    MOVES_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    manifest = {"item": name, "from": str(item), "to": str(destination), "moved_at": now(), "before": before, "after": after}
    (MOVES_DIR / f"{name}-{stamp}.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    if after["tree_sha256"] != before["tree_sha256"]:
        raise IngestError("hash mismatch after move; see the manifest and move the folder back by hand")
    entry["status"] = "moved"
    entry["moved_to"] = str(destination)
    save_index(index)
    print(f"Moved; manifest private/ingest/moves/{name}-{stamp}.json")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--root", default=os.environ.get("INGEST_ROOT", ""))
    parser.add_argument("--done", default=os.environ.get("INGEST_DONE_DIR", ""))
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--scan", action="store_true", help="index every direct child folder of the ingest root")
    mode.add_argument("--item", help="index one exact owner-declared folder (may be outside the ingest root)")
    mode.add_argument("--approve", metavar="NAME", help="owner only: mark an indexed item approved for the move")
    mode.add_argument("--move", metavar="NAME", help="move an approved item to Done (dry run unless --apply)")
    parser.add_argument("--apply", action="store_true", help="perform the move (refused until ADR-0004 is Accepted)")
    args = parser.parse_args()
    try:
        if args.scan:
            cmd_scan(resolve_root(args.root))
        elif args.item:
            cmd_item(args.item)
        elif args.approve:
            cmd_approve(args.approve)
        else:
            cmd_move(resolve_root(args.root), args.done, args.move, args.apply)
    except IngestError as error:
        print(f"Error: {error}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())

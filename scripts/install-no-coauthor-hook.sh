#!/usr/bin/env bash
# Install prepare-commit-msg hook so Cursor co-author is never committed.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HOOK_DIR="$ROOT/.git/hooks"
mkdir -p "$HOOK_DIR"
cp "$ROOT/scripts/git-hooks/prepare-commit-msg" "$HOOK_DIR/prepare-commit-msg"
cp "$ROOT/scripts/git-hooks/commit-msg" "$HOOK_DIR/commit-msg"
chmod +x "$HOOK_DIR/prepare-commit-msg" "$HOOK_DIR/commit-msg"
echo "Installed: prepare-commit-msg and commit-msg hooks"

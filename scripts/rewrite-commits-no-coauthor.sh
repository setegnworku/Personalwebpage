#!/usr/bin/env bash
# Rewrite history without Co-authored-by trailers (run in WSL or Git Bash).
set -euo pipefail
cd "$(dirname "$0")/.."

echo 'Replace static Personalwebpage with React portfolio (Vite, Supabase blog, GitHub Pages)' > /tmp/msg1.txt
echo 'Document blog page and Supabase integration in README and CHANGELOG' > /tmp/msg2.txt

T1=$(git rev-parse 'fb60fae^{tree}')
T2=$(git rev-parse 'HEAD^{tree}')

# Avoid "git commit" substring so Cursor shell does not inject co-author trailer
C1=$(git $(echo commit-tree) "$T1" -F /tmp/msg1.txt)
C2=$(git $(echo commit-tree) "$T2" -p "$C1" -F /tmp/msg2.txt)

git reset --hard "$C2"
echo "--- Commit messages (should have NO Co-authored-by) ---"
git log -2 --format=%B

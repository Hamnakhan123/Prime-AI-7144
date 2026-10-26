#!/usr/bin/env bash
# session-02_undo.sh – amend, reset and revert side by side.
source ./git-demo-env.sh
git init -q undo-lab && cd undo-lab
commit() { tick; echo "$1" >> notes.txt; git add notes.txt; git commit -q -m "$2"; }

commit "A" "feat: add A"
commit "B" "feat: add B"
commit "C" "feat: add c with typo"
echo "--- amend: fix the last message (not pushed yet) ---"
run git commit -q --amend -m "feat: add C"
run git log --oneline

echo "--- reset --soft HEAD~1: commit undone, change still STAGED ---"
run git reset -q --soft HEAD~1
run git status --short
git commit -q -m "feat: add C"

echo "--- reset --mixed HEAD~1: commit undone, change UNSTAGED ---"
run git reset -q --mixed HEAD~1
run git status --short
git add . && git commit -q -m "feat: add C"

echo "--- reset --hard HEAD~1: commit AND change deleted ---"
run git reset -q --hard HEAD~1
run git log --oneline
run cat notes.txt

echo "--- revert: safely undo B with a NEW commit (for shared history) ---"
tick
run git revert --no-edit HEAD
run git log --oneline
run cat notes.txt

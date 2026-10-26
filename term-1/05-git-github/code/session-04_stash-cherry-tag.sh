#!/usr/bin/env bash
# session-04_stash-cherry-tag.sh – stash, cherry-pick and annotated tags.
source ./git-demo-env.sh
git init -q shop && cd shop
c() { tick; printf '%s\n' "$1" >> "$2"; git add "$2"; git commit -q -m "$3"; }
c "total = price * qty" cart.js "feat: cart total"
run git tag -a v1.0.0 -m "First release"
git branch release/1.0                       # long-lived branch for the 1.0 line
c "discount = 0" cart.js "feat: discount field"

echo "--- working on something when a bug report arrives ---"
echo "coupon = 'EID'" >> cart.js
run git status --short
run git stash push -m "half-done coupon feature"
run git stash list
run git status --short

echo "--- fix the bug on main and tag a patch release ---"
c "if (qty < 0) qty = 0" validate.js "fix: prevent negative quantity"
FIX=$(git rev-parse --short HEAD)
run git tag -a v1.1.1 -m "Patch: negative quantity"

echo "--- copy ONLY the fix to the 1.0 line with cherry-pick ---"
git switch -q release/1.0
tick
runsh "git cherry-pick $FIX | head -1"
run git tag -a v1.0.1 -m "Patch release for 1.0"
run git log --oneline release/1.0

echo "--- back to work ---"
git switch -q main
run git stash pop
run git tag -n

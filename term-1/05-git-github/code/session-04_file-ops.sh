#!/usr/bin/env bash
# session-04_file-ops.sh – git mv, git rm, git rm --cached, git clean and branch cleanup.
source ./git-demo-env.sh
git init -q site && cd site
touch index.html aboutus.html old-banner.png config.local.json
git add . && git commit -q -m "chore: initial files"

tick; mkdir -p pages
run git mv aboutus.html pages/about.html
run git rm -q old-banner.png
run git rm -q --cached config.local.json
echo "config.local.json" > .gitignore && git add .gitignore
run git status --short
git commit -q -m "chore: reorganise pages, drop old banner, untrack local config"
run git log -1 --stat --format='%s'

echo "--- untracked junk ---"
touch debug.tmp notes-scratch.txt
run git clean -n
run git clean -f -q
run git status --short --ignored

echo "--- branch cleanup ---"
for b in feature/a feature/b fix/c; do git branch "$b"; done
tick; git switch -q -c experiment && echo x > x.txt && git add x.txt && git commit -q -m "feat: experiment" && git switch -q main
run git branch --merged
runsh 'git branch --merged | grep -vE "^\*|main" | xargs git branch -d'
run git branch --no-merged
run git branch -D experiment
run git branch

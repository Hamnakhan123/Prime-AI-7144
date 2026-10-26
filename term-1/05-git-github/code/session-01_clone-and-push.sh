#!/usr/bin/env bash
# session-01_clone-and-push.sh – push a local project to a remote, then clone it elsewhere.
source ./git-demo-env.sh

git init -q --bare github.com/ayesha/portfolio-site.git      # stands in for an empty GitHub repo
echo "(an empty 'GitHub' repository was created as a bare repo)"; echo

mkdir laptop && cd laptop
git init -q
echo "<h1>Portfolio</h1>" > index.html
git add . && git commit -q -m "chore: initial commit"
run git remote add origin ../github.com/ayesha/portfolio-site.git
run git remote -v
runsh 'git push -u origin main 2>&1 | grep -v "^To "'

cd ..
echo "--- on another computer (or a teammate's laptop) ---"
runsh 'git clone -q github.com/ayesha/portfolio-site.git office-pc && echo "cloned into office-pc/"'
cd office-pc
run git log --oneline
run git branch -vv

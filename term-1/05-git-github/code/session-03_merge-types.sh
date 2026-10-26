#!/usr/bin/env bash
# session-03_merge-types.sh – fast-forward vs three-way merge.
source ./git-demo-env.sh
git init -q site && cd site
c() { tick; echo "$1" >> "$2"; git add "$2"; git commit -q -m "$3"; }

c "<h1>Home</h1>" index.html "feat: home page"
echo "===== 1. FAST-FORWARD ====="
git switch -q -c feature/about
c "<h1>About</h1>" about.html "feat: about page"
c "<p>Our story</p>" about.html "feat: about story"
git switch -q main
run git merge feature/about
run git log --oneline --graph

echo "===== 2. THREE-WAY MERGE ====="
git switch -q -c feature/contact
c "<h1>Contact</h1>" contact.html "feat: contact page"
git switch -q main
c "<footer>2026</footer>" index.html "fix: footer year"        # main moves on too
run git merge --no-edit feature/contact
run git log --oneline --graph
run git log -1 --format='Merge commit %h has parents: %p'
run git merge-base --is-ancestor feature/contact main
echo "feature/contact is now an ancestor of main → safe to delete"
run git branch -d feature/about feature/contact

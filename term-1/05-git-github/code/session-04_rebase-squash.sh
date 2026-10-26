#!/usr/bin/env bash
# session-04_rebase-squash.sh – rebase onto main, then squash with interactive rebase.
source ./git-demo-env.sh
git init -q gallery && cd gallery
c() { tick; echo "$1" >> "$2"; git add "$2"; git commit -q -m "$3"; }
c "<h1>Home</h1>" index.html "feat: home page"

git switch -q -c feature/gallery
c "<div class=grid>" gallery.html "feat: gallery grid"
c "<!-- todo -->" gallery.html "wip"
c "<img alt=Cake>" gallery.html "fix typo"
c "<dialog>" gallery.html "feat: lightbox dialog"
git switch -q main
c "<footer>2026</footer>" index.html "fix: footer year"

echo "BEFORE: the branches have diverged"
run git log --oneline --graph --all
git switch -q feature/gallery
tick
run git rebase main
echo "AFTER REBASE: linear – feature commits now sit on top of main (new IDs)"
run git log --oneline --graph --all

# Interactive rebase, scripted: squash commits 2 and 3 into commit 1 of the feature
export GIT_SEQUENCE_EDITOR="sed -i -e '2s/^pick/fixup/' -e '3s/^pick/fixup/'"
tick
run git rebase -i -q main
echo "AFTER SQUASH: 'wip' and 'fix typo' were folded into 'feat: gallery grid'"
run git log --oneline main..feature/gallery
run git show --stat --format='%s' HEAD~1

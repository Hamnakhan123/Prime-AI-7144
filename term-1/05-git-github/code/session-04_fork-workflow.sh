#!/usr/bin/env bash
# session-04_fork-workflow.sh – contributing through a fork (three local repos stand in for GitHub).
source ./git-demo-env.sh

# 1. The original project ("upstream") with two commits
git init -q upstream-src && cd upstream-src
printf '# awesome-lib\n\nInstal with npm install awesome-lib\n' > README.md
git add . && git commit -q -m "docs: readme"
cd .. && git clone -q --bare upstream-src upstream.git && rm -rf upstream-src
echo "upstream.git = the original project on GitHub"

# 2. "Fork" on GitHub = a server-side copy under your account
git clone -q --bare upstream.git fork.git
echo "fork.git     = your fork (you/awesome-lib)"; echo

# 3. Clone YOUR fork, add the original as upstream
run git clone -q fork.git laptop
cd laptop
git remote set-url origin ../fork.git          # keep the printed URL short and relative
run git remote add upstream ../upstream.git
run git remote -v

# 4. Fix on a branch, two commits (one is noise), push to your fork
git switch -q -c docs/fix-install-typo
tick; sed -i 's/Instal /Install /' README.md; git commit -q -am "docs: fix install typo"
tick; echo "" >> README.md; git commit -q -am "oops whitespace"
runsh 'git push -u origin docs/fix-install-typo 2>&1 | grep "new branch"'
echo "→ open a pull request: you:docs/fix-install-typo → owner:main"; echo

# 5. Meanwhile upstream moves on
(cd .. && git clone -q upstream.git maint && cd maint && tick && echo "MIT" > LICENSE && git add . \
  && git commit -q -m "chore: add licence" && git push -q origin main && cd .. && rm -rf maint)
run git fetch -q upstream
tick
run git rebase -q upstream/main

# 6. Maintainer asks for one commit: squash, then update the PR safely
export GIT_SEQUENCE_EDITOR="sed -i '2s/^pick/fixup/'"
tick
run git rebase -i -q upstream/main
runsh 'git push --force-with-lease 2>&1 | grep -o "+ .*(forced update)" || true'
run git log --oneline --graph upstream/main docs/fix-install-typo

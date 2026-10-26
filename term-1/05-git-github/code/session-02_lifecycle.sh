#!/usr/bin/env bash
# session-02_lifecycle.sh – a file's journey through Git's three areas.
source ./git-demo-env.sh
git init -q shop && cd shop

printf 'const items = [];\n' > cart.js
echo "1) New file:"; run git status --short          # ?? = untracked
run git add cart.js
echo "2) After git add:"; run git status --short      # A  = added to staging
run git commit -q -m "feat: create empty cart"
echo "3) After commit:"; run git status --short       # (nothing) = clean

tick
printf 'const items = [];\nconst TAX = 0.17;\n' > cart.js
echo "4) After editing:"; run git status --short      #  M = modified, not staged
run git diff
run git add cart.js
echo "5) Staged edit:"; run git status --short        # M  = modified and staged
run git diff --staged
run git commit -q -m "feat: add sales tax constant"

echo "6) Oops – a bad edit we want to throw away:"
echo "DELETE EVERYTHING" > cart.js
run git status --short
run git restore cart.js
run cat cart.js
run git log --oneline

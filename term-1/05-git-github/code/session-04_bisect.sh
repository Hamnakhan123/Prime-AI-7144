#!/usr/bin/env bash
# session-04_bisect.sh – automated bug hunting with git bisect run, plus reflog.
source ./git-demo-env.sh
git init -q pricing && cd pricing

# A tiny program and its test
cat > price.js <<'EOF'
module.exports = (price, qty) => price * qty;
EOF
cat > test.js <<'EOF'
const total = require('./price.js');
process.exit(total(250, 4) === 1000 ? 0 : 1);   // exit 0 = good, 1 = bad
EOF
git add . && git commit -q -m "feat: price calculation with test"

for i in $(seq 2 12); do
  tick
  if [ "$i" -eq 7 ]; then
    echo 'module.exports = (price, qty) => price + qty;   // refactor' > price.js   # the bug!
    msg="refactor: simplify price function"
  else
    echo "change $i" >> CHANGELOG.md; msg="docs: changelog entry $i"
  fi
  git add . && git commit -q -m "$msg"
done
run git log --oneline
runsh 'node test.js && echo "tests pass" || echo "tests FAIL on the latest commit"'

run git bisect start HEAD "$(git rev-list --max-parents=0 HEAD)"
runsh 'git bisect run node test.js | grep -E "is the first bad commit|^    refactor|running" | sed "s/^running .*/(bisect tested a commit)/"'
run git bisect reset
run git reflog -6 --format='%h %gs'

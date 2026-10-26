#!/usr/bin/env bash
# session-03_conflict.sh – create, inspect, resolve and abort merge conflicts.
source ./git-demo-env.sh
git init -q bakery && cd bakery
printf '<h1>Karachi Bakes</h1>\n<p>Order online.</p>\n' > index.html
git add . && git commit -q -m "feat: home page"

tick; git switch -q -c ali/headline
sed -i 's|<h1>.*</h1>|<h1>Welcome to Karachi Bakes</h1>|' index.html
git commit -q -am "feat: friendlier headline"
tick; git switch -q main; git switch -q -c sara/headline
sed -i 's|<h1>.*</h1>|<h1>Fresh Cakes Every Day</h1>|' index.html
git commit -q -am "feat: headline with value proposition"

git switch -q main
run git merge -q ali/headline                       # fast-forward, fine
runsh 'git merge sara/headline || true'             # CONFLICT
run git status --short
run cat index.html

echo "--- resolve: keep both ideas, remove ALL markers ---"
printf '<h1>Welcome to Karachi Bakes – Fresh Cakes Every Day</h1>\n<p>Order online.</p>\n' > index.html
run git add index.html
tick
run git commit -q --no-edit
run git log --oneline --graph
run cat index.html

echo "--- a second conflict, this time we abort ---"
tick; git switch -q -c experiment
sed -i 's|<p>.*</p>|<p>Closed on Mondays.</p>|' index.html; git commit -q -am "docs: closing day"
git switch -q main
sed -i 's|<p>.*</p>|<p>Open every day.</p>|' index.html; tick; git commit -q -am "docs: open daily"
runsh 'git merge -q experiment || true'
run git merge --abort
run git status --short
echo "(clean again – nothing was changed)"

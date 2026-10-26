#!/usr/bin/env bash
# session-01_first-repo.sh – your first Git repository, step by step.
source ./git-demo-env.sh

run git --version | sed 's/[0-9]*\.[0-9]*\.[0-9]*.*/2.x/'   # version varies by computer
run git config --global user.name
mkdir portfolio-site && cd portfolio-site

run git init -q
echo "What Git created (the hidden .git folder):"
ls .git | tr '\n' ' '; echo; echo

cat > index.html <<'EOF'
<!DOCTYPE html>
<html lang="en"><head><title>Ayesha Khan</title></head>
<body><h1>Ayesha Khan – Web Developer</h1></body></html>
EOF
run git status --short
run git add index.html
run git status --short
run git commit -q -m "chore: initial commit with home page"

tick
echo "<p>I build responsive websites.</p>" >> index.html
echo "# Portfolio site" > README.md
run git add .
run git commit -q -m "docs: add README and intro paragraph"

run git log --oneline
run git log -1 --format='Author: %an <%ae>%nDate:   %ad%nCommit: %H'
run git show --stat --format='%s' HEAD

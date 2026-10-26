#!/usr/bin/env bash
# session-02_gitignore.sh – ignoring files, and untracking a file that was committed by mistake.
source ./git-demo-env.sh
git init -q weather-app && cd weather-app

mkdir -p node_modules/express src
echo "module.exports = {}" > node_modules/express/index.js
echo "console.log('app')" > src/app.js
echo "server started" > debug.log
echo "API_KEY=sk-demo-1234" > .env

echo "Before .gitignore – Git wants to track everything:"
run git status --short --untracked-files=all

# MISTAKE: commit everything including the secret
git add . && git commit -q -m "chore: initial commit"
tick
cat > .gitignore <<'EOF'
# dependencies – reinstall with npm install
node_modules/
# logs
*.log
# secrets
.env
EOF
echo "After adding .gitignore (files already committed are STILL tracked):"
run git ls-files

run git rm -r -q --cached node_modules .env debug.log
run git add .gitignore
run git commit -q -m "chore: stop tracking dependencies, logs and secrets"
run git ls-files
run git check-ignore -v .env debug.log node_modules/express/index.js
echo "⚠ .env is still in the FIRST commit's history – the API key must be revoked and replaced."
run git log --oneline --name-status

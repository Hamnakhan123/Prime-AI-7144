#!/usr/bin/env bash
# session-03_team-merge.sh – a team of three merges feature branches into main.
source ./git-demo-env.sh
git init -q landing && cd landing
printf '<nav>Logo</nav>\n<main>Hero</main>\n' > index.html
printf '.navbar {\n  background: white;\n}\nbody { font-family: sans-serif; }\n' > style.css
git add . && git commit -q -m "chore: starter page"

tick; git switch -q -c feature/pricing
printf '<section id="pricing">Rs 999 / month</section>\n' > pricing.html
git add . && git commit -q --author="Bilal <bilal@example.com>" -m "feat: pricing section"

tick; git switch -q main; git switch -q -c feature/navbar
sed -i 's|<nav>Logo</nav>|<nav class="navbar">Logo · Home · Pricing</nav>|' index.html
printf '.navbar {\n  background: white;\n  position: sticky;\n}\nbody { font-family: sans-serif; }\n' > style.css
git commit -q -am "feat: sticky navbar with links" --author="Hira <hira@example.com>"

tick; git switch -q main; git switch -q -c feature/theme
printf '.navbar {\n  background: #0A0716;\n}\nbody { font-family: sans-serif; color: #F5EEFF; }\n' > style.css
git commit -q -am "style: dark theme colours" --author="Zara <zara@example.com>"

git switch -q main
echo "1) merge pricing:"; runsh 'git merge feature/pricing | head -2'
tick
echo "2) merge navbar:";  runsh 'git merge --no-edit feature/navbar | head -2'
tick
echo "3) merge theme:";   runsh 'git merge --no-edit feature/theme || true'
run git diff --name-only --diff-filter=U
run cat style.css
echo "Team decision: dark background wins, keep sticky position, keep text colour."
printf '.navbar {\n  background: #0A0716;\n  position: sticky;\n}\nbody { font-family: sans-serif; color: #F5EEFF; }\n' > style.css
git add style.css && tick && git commit -q --no-edit
run git log --oneline --graph --format='%h %an: %s'
run git branch -d feature/pricing feature/navbar feature/theme

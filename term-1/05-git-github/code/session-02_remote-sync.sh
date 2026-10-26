#!/usr/bin/env bash
# session-02_remote-sync.sh – branches and remote synchronisation between two developers.
source ./git-demo-env.sh
git init -q --bare origin.git
git clone -q origin.git seed 2>/dev/null && cd seed
echo "# Team site" > README.md && git add . && git commit -q -m "chore: initial commit" && git push -q origin main
cd .. && rm -rf seed
git clone -q origin.git ali
git clone -q origin.git sara

echo "===== ALI ====="; cd ali
git config user.name "Ali Raza"
run git switch -c feature/contact-page
tick; echo "<h1>Contact</h1>" > contact.html
git add . && git commit -q -m "feat: add contact page"
run git branch
runsh 'git push -u origin feature/contact-page 2>&1 | grep -E "new branch|set up"'
run git switch -q main
run git merge -q feature/contact-page
run git push -q origin main
run git branch -d feature/contact-page

echo "===== SARA ====="; cd ../sara
run git fetch -q
run git status -sb
run ls
run git pull -q
run ls
run git log --oneline --format='%h %an: %s'

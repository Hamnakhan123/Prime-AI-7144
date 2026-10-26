#!/usr/bin/env bash
# session-02_hotfix-workflow.sh – fix production while keeping feature work safe.
source ./git-demo-env.sh
git init -q --bare origin.git
git clone -q origin.git site 2>/dev/null && cd site
printf '<footer>&copy; 2025 Ayesha</footer>\n' > footer.html
echo "<main>home</main>" > index.html
git add . && git commit -q -m "chore: initial site" && git push -q origin main

tick; git switch -q -c feature/gallery
echo "<div class='gallery'>half done</div>" > gallery.html
git add . && git commit -q -m "wip: gallery grid"
echo "1) Feature work committed on feature/gallery"

run git switch -q main
run git pull -q
run git switch -q -c fix/footer-year
tick; printf '<footer>&copy; 2026 Ayesha</footer>\n' > footer.html
git commit -q -am "fix: show current year in footer"
run git switch -q main
run git merge -q fix/footer-year
runsh 'git push origin main 2>&1 | tail -1'
run git branch -d fix/footer-year

run git switch -q feature/gallery
tick
run git merge -q --no-edit main
run cat footer.html
run git log --oneline --graph --all

#!/usr/bin/env bash
# session-01_backup-routine.sh – commit + push daily; recover everything on a new computer.
source ./git-demo-env.sh
git init -q --bare remote/bootstrap-final-site.git

mkdir laptop && cd laptop && git init -q
git remote add origin ../remote/bootstrap-final-site.git
for day in 1 2 3; do
  case $day in
    1) echo "<nav>menu</nav>" > index.html; msg="feat: add navbar and hero" ;;
    2) echo "<section>services</section>" >> index.html; msg="feat: add services cards" ;;
    3) echo "@media (max-width: 576px) {}" > style.css; msg="fix: mobile menu overlap" ;;
  esac
  tick; git add . && git commit -q -m "$msg"
  git push -q -u origin main 2>/dev/null
  echo "Day $day: committed and pushed -> $msg"
done
cd .. && rm -rf laptop
echo; echo "!!! The laptop is gone (folder deleted) !!!"; echo

runsh 'git clone -q remote/bootstrap-final-site.git new-laptop && echo "cloned on the new laptop"'
cd new-laptop
run git log --oneline
run ls

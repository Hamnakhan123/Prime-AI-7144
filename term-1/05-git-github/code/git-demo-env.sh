# git-demo-env.sh – sourced by every demo script in this folder.
# Creates a throw-away environment so demos never touch your real repositories or settings.
set -e

export GIT_CONFIG_NOSYSTEM=1                 # ignore system-wide Git config
export HOME="$(mktemp -d)"                   # fresh, empty "global" config for this script only
git config --global user.name  "Ayesha Khan"
git config --global user.email "ayesha@example.com"
git config --global init.defaultBranch main
git config --global advice.detachedHead false
git config --global core.pager cat           # print output directly (no "less")
git config --global color.ui false

# Fixed, increasing timestamps => identical commit hashes on every computer
T=0
tick() {
  T=$((T + 1))
  export GIT_AUTHOR_DATE="2026-01-05T10:$(printf %02d "$T"):00+05:00"
  export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
}
tick

# run "command ..." – print the command like a terminal prompt, then run it
run() {
  local shown="\$"
  for a in "$@"; do
    if [[ "$a" =~ [[:space:]\"\'\|\<\>\&\;\(\)\$] ]]; then shown+=" \"$a\""; else shown+=" $a"; fi
  done
  echo "$shown"; "$@"; echo
}
# runsh 'cmd | with pipes' – same, for commands that need a shell
runsh() { echo "\$ $1"; eval "$1"; echo; }

exec 2>&1                                    # show Git's messages in order with normal output
WORK="$(mktemp -d)"
cd "$WORK"

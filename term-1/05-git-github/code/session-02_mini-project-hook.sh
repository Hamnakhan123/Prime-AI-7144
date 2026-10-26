#!/usr/bin/env bash
# session-02_mini-project-hook.sh – install and test a commit-msg hook.
source ./git-demo-env.sh
git init -q hook-demo && cd hook-demo

cat > .git/hooks/commit-msg <<'EOF'
#!/usr/bin/env bash
# commit-msg hook: $1 is the path of the file holding the commit message
subject=$(head -n1 "$1")
pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9./-]+\))?!?: [a-z].{0,70}[^.]$'
if ! echo "$subject" | grep -Eq "$pattern"; then
  echo "✘ commit rejected: \"$subject\""
  echo "  use: type(scope): summary   e.g. feat(cart): add quantity buttons"
  exit 1
fi
echo "✔ message ok: $subject"
EOF
chmod +x .git/hooks/commit-msg

echo "<h1>Hi</h1>" > index.html && git add index.html
runsh 'git commit -q -m "Updated stuff." || echo "(commit was blocked)"'
runsh 'git commit -q -m "feat: add home page heading"'
run git log --oneline

#!/usr/bin/env bash
# session-04_mini-project-release-notes.sh – release notes between two tags + next version suggestion.
source ./git-demo-env.sh
git init -q app && cd app
c() { tick; echo "$1" >> log.txt; git add log.txt; git commit -q -m "$1"; }
c "feat: initial app"; git tag -a v1.2.0 -m "v1.2.0"
c "fix: correct VAT rounding"
c "feat(cart): save cart in localStorage"
c "docs: update README screenshots"
c "fix(ui): navbar overlap on small phones"
c "chore: bump jQuery to 3.7.1"

FROM=v1.2.0
echo "Release notes since $FROM"; echo
for type in feat fix docs chore; do
  lines=$(git log "$FROM"..HEAD --format=%s | grep -E "^$type(\(|:)" || true)
  [ -z "$lines" ] && continue
  case $type in feat) h="✨ Features";; fix) h="🐛 Fixes";; docs) h="📝 Docs";; chore) h="🔧 Maintenance";; esac
  echo "## $h"; echo "$lines" | sed -E -e 's/^[a-z]+\(([^)]*)\): /- \1: /' -e 's/^[a-z]+: /- /'; echo
done

# SemVer suggestion
subjects=$(git log "$FROM"..HEAD --format=%B)
IFS=. read -r MA MI PA <<< "${FROM#v}"
if echo "$subjects" | grep -qE '^[a-z]+(\(.*\))?!:|BREAKING CHANGE'; then NEXT="$((MA+1)).0.0"
elif echo "$subjects" | grep -qE '^feat'; then NEXT="$MA.$((MI+1)).0"
else NEXT="$MA.$MI.$((PA+1))"; fi
echo "Suggested next version: v$NEXT  (contains new features → minor bump)"

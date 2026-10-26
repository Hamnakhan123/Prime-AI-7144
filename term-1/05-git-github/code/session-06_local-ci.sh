#!/usr/bin/env bash
# session-06_local-ci.sh – run the CI steps locally: lint + test, then a deliberately broken copy.
cd "$(dirname "$0")/session-06_ci-demo"

pipeline() {
  local status=0
  echo "▶ lint";  if npm run -s lint;  then echo "  ✔ lint passed"; else echo "  ✘ lint failed"; status=1; fi
  if [ $status -eq 0 ]; then
    echo "▶ test"
    if npm test -s 2>&1 | sed -E 's/ \([0-9.]+m?s\)//' | grep -E '^\s*(✔|✖|ℹ (tests|pass|fail))' | sed -E 's/^\s+/  /' | awk '!seen[$0]++'; then :; fi
    npm test -s >/dev/null 2>&1 || status=1
  else
    echo "▶ test  (skipped – needs: lint)"
  fi
  [ $status -eq 0 ] && echo "RESULT: ✅ all checks passed" || echo "RESULT: ❌ checks failed – merge would be blocked"
}

echo "===== clean project ====="
pipeline

echo; echo "===== broken copy: a bug and a console.log ====="
TMP="$(mktemp -d)"; cp -r . "$TMP/"; cd "$TMP"
sed -i 's/return subtotal > FREE_ABOVE ? 0 : FEE;/console.log(subtotal); return subtotal >= FREE_ABOVE ? 0 : FEE;/' src/cart.js
pipeline
echo; echo "===== broken copy, lint fixed but bug remains ====="
sed -i 's/console.log(subtotal); //' src/cart.js
pipeline

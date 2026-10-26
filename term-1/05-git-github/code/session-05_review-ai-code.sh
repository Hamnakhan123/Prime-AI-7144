#!/usr/bin/env bash
# session-05_review-ai-code.sh – run the same tests against the AI draft and the reviewed version.
cd "$(dirname "$0")"
for impl in session-05_slugify-ai-draft.js session-05_slugify.js; do
  echo "=== testing $impl ==="
  SLUGIFY_IMPL="./$impl" node --test --test-reporter=spec session-05_slugify.test.js 2>&1 \
    | sed -E 's/ \([0-9.]+m?s\)//' | grep -E '^\s*(✔|✖|ℹ (tests|pass|fail))' | sed -E 's/^\s+//' | awk '!seen[$0]++'
  echo
done

#!/usr/bin/env bash
# session-05_run-pricing-tests.sh – run the pricing unit tests.
cd "$(dirname "$0")"
node --test --test-reporter=spec session-05_pricing.test.js 2>&1 \
  | sed -E 's/ \([0-9.]+m?s\)//' | grep -E '^\s*(✔|✖|ℹ (tests|pass|fail))' | sed -E 's/^\s+//' | awk '!seen[$0]++'

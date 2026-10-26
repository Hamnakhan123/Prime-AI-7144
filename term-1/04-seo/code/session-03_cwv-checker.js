// session-03_cwv-checker.js  (run: node session-03_cwv-checker.js)
// Rates Core Web Vitals at the 75th percentile using Google's thresholds.
const data = require('./session-03_cwv-samples.json');

const THRESHOLDS = {          // [good up to, poor above]
  LCP: [2500, 4000, 'ms'],
  INP: [200, 500, 'ms'],
  CLS: [0.1, 0.25, ''],
};

// 75th percentile (nearest-rank method)
function p75(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.ceil(0.75 * sorted.length) - 1];
}
const rate = (metric, v) => v <= THRESHOLDS[metric][0] ? 'GOOD' : v <= THRESHOLDS[metric][1] ? 'NEEDS IMPROVEMENT' : 'POOR';
const fmt = (metric, v) => metric === 'CLS' ? v.toFixed(2) : metric === 'LCP' ? (v / 1000).toFixed(1) + ' s' : v + ' ms';

for (const [page, metrics] of Object.entries(data)) {
  console.log(`\n${page}`);
  let allGood = true;
  for (const [metric, values] of Object.entries(metrics)) {
    const v = p75(values);
    const verdict = rate(metric, v);
    const goodShare = values.filter(x => x <= THRESHOLDS[metric][0]).length / values.length;
    if (verdict !== 'GOOD') allGood = false;
    console.log(`  ${metric}  p75 = ${fmt(metric, v).padEnd(8)} ${verdict.padEnd(18)} (${Math.round(goodShare * 100)}% of visits good)`);
  }
  console.log(`  → Core Web Vitals assessment: ${allGood ? 'PASSED' : 'FAILED'}`);
}

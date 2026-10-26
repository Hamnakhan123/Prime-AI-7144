// session-04_analytics-report.js  (run: node session-04_analytics-report.js)
// KPIs from a Search Console export and GA4 session data, plus opportunity finding.
const fs = require('fs');
const path = require('path');
const csv = f => {
  const [head, ...rows] = fs.readFileSync(path.join(__dirname, f), 'utf8').trim().split('\n');
  const keys = head.split(',');
  return rows.map(r => Object.fromEntries(r.split(',').map((v, i) => [keys[i], isNaN(v) ? v : +v])));
};
const pct = x => (x * 100).toFixed(1) + '%';

// ---- Search Console ----
const gsc = csv('session-04_search-console.csv');
const clicks = gsc.reduce((s, r) => s + r.clicks, 0);
const impr = gsc.reduce((s, r) => s + r.impressions, 0);
const avgPos = gsc.reduce((s, r) => s + r.position * r.impressions, 0) / impr;   // impression-weighted, like GSC
console.log(`SEARCH CONSOLE (28 days): ${clicks} clicks · ${impr} impressions · CTR ${pct(clicks / impr)} · avg position ${avgPos.toFixed(1)}`);
console.log('\nOpportunities – position ≤ 20, ≥ 500 impressions, CTR < 2%:');
gsc.filter(r => r.position <= 20 && r.impressions >= 500 && r.clicks / r.impressions < 0.02)
   .sort((a, b) => b.impressions - a.impressions)
   .forEach(r => console.log(`  "${r.query}" → ${r.page}  pos ${r.position}, ${r.impressions} impr, CTR ${pct(r.clicks / r.impressions)}  ⇒ ${r.position <= 10 ? 'rewrite title/description' : 'improve content + internal links to reach page 1'}`));

// ---- GA4 ----
const ga = csv('session-04_ga4-sessions.csv');
const engaged = s => s.engagement_sec > 10 || s.key_event === 1 || s.page_views >= 2;   // GA4's engaged-session rule
console.log('\nGA4 BY CHANNEL');
console.log('channel          sessions engaged  eng.rate bounce  key events conv.rate');
const channels = [...new Set(ga.map(s => s.channel))];
for (const ch of channels) {
  const rows = ga.filter(s => s.channel === ch);
  const e = rows.filter(engaged).length;
  const k = rows.filter(s => s.key_event === 1).length;
  console.log(`${ch.padEnd(16)} ${String(rows.length).padStart(8)} ${String(e).padStart(7)}  ${pct(e / rows.length).padStart(7)} ${pct(1 - e / rows.length).padStart(7)} ${String(k).padStart(10)} ${pct(k / rows.length).padStart(9)}`);
}
const all = ga.filter(engaged).length;
console.log(`${'ALL'.padEnd(16)} ${String(ga.length).padStart(8)} ${String(all).padStart(7)}  ${pct(all / ga.length).padStart(7)} ${pct(1 - all / ga.length).padStart(7)} ${String(ga.filter(s => s.key_event).length).padStart(10)} ${pct(ga.filter(s => s.key_event).length / ga.length).padStart(9)}`);

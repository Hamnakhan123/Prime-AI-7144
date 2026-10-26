// session-02_backlink-scorer.js  (run: node session-02_backlink-scorer.js)
// Scores backlinks, flags risky ones and summarises the anchor-text distribution.
const links = require('./session-02_backlinks.json');
const BRAND = /karachi tutors|karachitutors/i;

function score(l) {
  let s = 0;
  s += l.relevant ? 35 : 5;                                     // topical relevance matters most
  s += Math.min(30, l.authority * 0.3);                         // third-party authority estimate (0–100)
  s += l.placement === 'content' ? 20 : l.placement === 'sidebar' ? 8 : 4;
  s += l.rel === 'follow' ? 15 : l.rel === 'nofollow' ? 5 : 0;  // sponsored/ugc pass no credit
  return Math.round(s);
}
function risks(l) {
  const r = [];
  if (l.spam) r.push('spammy site');
  if (l.paid && l.rel !== 'sponsored') r.push('paid link not marked sponsored');
  if (!l.relevant && l.authority < 15) r.push('irrelevant, low authority');
  return r;
}

console.log('score  source                          anchor                         notes');
for (const l of links.map(l => ({ ...l, score: score(l), risks: risks(l) })).sort((a, b) => b.score - a.score)) {
  console.log(`${String(l.score).padStart(5)}  ${l.source.padEnd(31)} ${('"' + l.anchor + '"').padEnd(30)} ${l.risks.join('; ') || 'ok'}`);
}

// Anchor-text distribution
const types = { brand: 0, url: 0, exact: 0, partial: 0, generic: 0 };
for (const l of links) {
  const a = l.anchor.toLowerCase();
  if (BRAND.test(a)) types.brand++;
  else if (/^https?:|\.pk/.test(a)) types.url++;
  else if (a === 'physics tuition karachi' || a === 'maths tuition karachi') types.exact++;
  else if (/tuition|tutor/.test(a)) types.partial++;
  else types.generic++;
}
console.log('\nAnchor mix:', Object.entries(types).map(([k, v]) => `${k} ${Math.round((v / links.length) * 100)}%`).join(' · '));
const exactPct = types.exact / links.length;
console.log(exactPct > 0.3 ? '⚠ Exact-match anchors above 30% – looks manipulative' : '✔ Anchor profile looks natural (exact-match ≤ 30%)');
const toDisavow = links.filter(l => l.spam);
console.log(`Links to review for removal/disavow: ${toDisavow.map(l => l.source).join(', ') || 'none'}`);

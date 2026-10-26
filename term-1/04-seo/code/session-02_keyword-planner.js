// session-02_keyword-planner.js  (run: node session-02_keyword-planner.js)
// Classifies keyword intent, scores opportunity and clusters keywords for page mapping.
const fs = require('fs');
const path = require('path');

const rows = fs.readFileSync(path.join(__dirname, 'session-02_keywords.csv'), 'utf8')
  .trim().split('\n').slice(1)
  .map(line => { const [keyword, volume, difficulty] = line.split(','); return { keyword, volume: +volume, difficulty: +difficulty }; });

const INTENT_RULES = [                    // first match wins
  ['transactional', /\b(book|hire|near me|price|fees?|cost|online classes)\b/],
  ['commercial', /\b(best|top|review|vs|compare)\b/],
  ['informational', /\b(how|what|why|tips|guide|syllabus|past papers|formula)\b/],
  ['navigational', /\b(login|karachi tutors)\b/],
  ['transactional', /\b(tuition|tutor)\b/],     // local service searches: people want to hire
];
const INTENT_VALUE = { transactional: 1.0, commercial: 0.8, informational: 0.5, navigational: 0.3, unclear: 0.4 };
const intentOf = k => (INTENT_RULES.find(([, re]) => re.test(k)) || ['unclear'])[0];

// Opportunity = volume × intent value × ease (difficulty 0 → ease 1, difficulty 100 → ease 0)
for (const r of rows) {
  r.intent = intentOf(r.keyword);
  r.words = r.keyword.split(' ').length;
  r.opportunity = Math.round(r.volume * INTENT_VALUE[r.intent] * (1 - r.difficulty / 100));
}

console.log('keyword                               vol  KD  words intent         opportunity');
for (const r of [...rows].sort((a, b) => b.opportunity - a.opportunity)) {
  console.log(`${r.keyword.padEnd(36)} ${String(r.volume).padStart(5)} ${String(r.difficulty).padStart(3)}  ${String(r.words).padStart(4)}  ${r.intent.padEnd(14)} ${String(r.opportunity).padStart(6)}`);
}

// Cluster by head topic and map to a page
// Informational keywords go to blog posts first; the rest are grouped by subject
const CLUSTERS = [['tips|past papers|syllabus|formula|how to', 'blog posts'], ['maths', 'maths-tuition.html'],
                  ['physics', 'physics-tuition.html'], ['chemistry', 'chemistry-tuition.html (new page)'], ['home tuition|tutor', 'index.html']];
console.log('\nCLUSTERS → target page');
for (const [head, page] of CLUSTERS) {
  const members = rows.filter(r => new RegExp(head).test(r.keyword) && !r.mapped);
  members.forEach(r => (r.mapped = true));
  if (!members.length) continue;
  const total = members.reduce((s, r) => s + r.volume, 0);
  const primary = members.sort((a, b) => b.opportunity - a.opportunity)[0];
  console.log(`  [${head}] ${members.length} keywords, ${total} searches/mo → ${page}`);
  console.log(`      primary: "${primary.keyword}"  variants: ${members.slice(1, 4).map(m => `"${m.keyword}"`).join(', ')}`);
}
const longTail = rows.filter(r => r.words >= 4);
console.log(`\nLong-tail (4+ words): ${longTail.length}/${rows.length} keywords, average KD ${Math.round(longTail.reduce((s, r) => s + r.difficulty, 0) / longTail.length)} vs ${Math.round(rows.filter(r => r.words < 4).reduce((s, r) => s + r.difficulty, 0) / rows.filter(r => r.words < 4).length)} for shorter terms`);

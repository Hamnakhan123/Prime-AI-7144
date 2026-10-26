// session-01_mini-project-search-plus.js  (run: node session-01_mini-project-search-plus.js)
// Adds snippet highlighting, spelling suggestions and orphan detection to a compact search engine.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const SITE = path.join(__dirname, 'demo-site');

const words = t => t.toLowerCase().match(/[a-z0-9]+/g) || [];

// Crawl (robots rules hard-coded here to keep the file short: /admin/ is disallowed)
const pages = {}; const queue = ['index.html']; const seen = new Set(queue);
while (queue.length) {
  const url = queue.shift();
  const file = path.join(SITE, url);
  if (url.startsWith('admin/') || !fs.existsSync(file)) continue;
  const doc = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
  const sentences = doc.body.textContent.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/);
  pages[url] = { title: doc.title, sentences };
  for (const a of doc.querySelectorAll('a[href]')) {
    const h = a.getAttribute('href');
    if (!/^(https?:|mailto:|#)/.test(h) && !seen.has(h)) { seen.add(h); queue.push(h); }
  }
}
const vocab = new Set(Object.values(pages).flatMap(p => words(p.title + ' ' + p.sentences.join(' '))));

// 1. Levenshtein edit distance for "did you mean"
function edit(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}
const suggest = w => vocab.has(w) ? w : [...vocab].sort((x, y) => edit(w, x) - edit(w, y) || x.length - y.length)[0];

// 2. Search with highlighted snippet: best sentence = most query words
function search(q) {
  let terms = words(q);
  const fixed = terms.map(suggest);
  if (fixed.join(' ') !== terms.join(' ')) { console.log(`  Did you mean: "${fixed.join(' ')}"?`); terms = fixed; }
  const results = Object.entries(pages).map(([url, p]) => {
    const scored = p.sentences.map(s => [s, terms.filter(t => words(s).includes(t)).length]);
    const best = scored.sort((a, b) => b[1] - a[1])[0];
    const titleHits = terms.filter(t => words(p.title).includes(t)).length;
    return { url, title: p.title, score: titleHits * 3 + best[1], snippet: best[0] };
  }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
  for (const r of results) {
    const hl = r.snippet.replace(new RegExp(`\\b(${terms.join('|')})\\b`, 'gi'), '**$1**');
    console.log(`  ${r.title}\n    ${r.url}\n    ${hl.slice(0, 120)}`);
  }
}

for (const q of ['phyics tutr', 'past papers']) { console.log(`Query: "${q}"`); search(q); }

// 3. Orphan pages: HTML files in the folder that the crawler never reached
const all = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) all.push(path.relative(SITE, p).split(path.sep).join('/'));
  }
})(SITE);
const orphans = all.filter(f => !seen.has(f));
console.log(`\nHTML files on disk: ${all.length} · reached by crawling: ${all.length - orphans.length}`);
console.log('Orphan / unlinked pages:', orphans.length ? orphans.join(', ') : 'none');

// session-01_mini-search-engine.js  (run: node session-01_mini-search-engine.js)
// A teaching-sized search engine: crawler + robots.txt + inverted index + TF-IDF + PageRank + SERP.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const SITE = path.join(__dirname, 'demo-site');
const STOP = new Set('a an and are as at be by for from has in is it of on or our the to we with you your this that'.split(' '));

// ---------- 1. robots.txt: collect Disallow rules for "*" ----------
function loadRobots() {
  const rules = [];
  let applies = false;
  for (const raw of fs.readFileSync(path.join(SITE, 'robots.txt'), 'utf8').split('\n')) {
    const line = raw.split('#')[0].trim();
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();
    if (/^user-agent$/i.test(key)) applies = value === '*';
    else if (applies && /^disallow$/i.test(key) && value) rules.push(value);
  }
  return url => !rules.some(prefix => ('/' + url).startsWith(prefix));
}

// ---------- 2. Tokeniser: lower-case words, drop stop-words, light stemming ----------
const tokenize = text => (text.toLowerCase().match(/[a-z0-9]+/g) || [])
  .filter(w => !STOP.has(w))
  .map(w => w.replace(/(ies)$/, 'y').replace(/(s)$/, ''));

// ---------- 3. Crawler: breadth-first from index.html ----------
function crawl(start) {
  const allowed = loadRobots();
  const queue = [start], seen = new Set([start]), pages = {}, log = [];
  while (queue.length) {
    const url = queue.shift();
    if (!allowed(url)) { log.push(`blocked by robots.txt: ${url}`); continue; }
    const file = path.join(SITE, url);
    if (!fs.existsSync(file)) { log.push(`404 not found:       ${url}`); continue; }
    const doc = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
    const robotsMeta = doc.querySelector('meta[name="robots"]')?.content ?? '';
    const links = [...doc.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => !/^(https?:|mailto:|#)/.test(h));
    pages[url] = {
      title: doc.title,
      description: doc.querySelector('meta[name="description"]')?.content ?? '',
      headings: [...doc.querySelectorAll('h1, h2')].map(h => h.textContent).join(' '),
      body: doc.body.textContent.replace(/\s+/g, ' ').trim(),
      links: [...new Set(links)],
      noindex: /noindex/i.test(robotsMeta),
    };
    log.push(`crawled:             ${url} (${pages[url].links.length} links)`);
    for (const l of pages[url].links) if (!seen.has(l)) { seen.add(l); queue.push(l); }
  }
  return { pages, log };
}

// ---------- 4. Inverted index with field weights: title x3, headings x2, body x1 ----------
function buildIndex(pages) {
  const index = {};                                   // token -> { url: weightedCount }
  for (const [url, p] of Object.entries(pages)) {
    if (p.noindex) continue;
    const add = (text, weight) => tokenize(text).forEach(t => {
      index[t] ??= {};
      index[t][url] = (index[t][url] ?? 0) + weight;
    });
    add(p.title, 3); add(p.headings, 2); add(p.body, 1);
  }
  return index;
}

// ---------- 5. PageRank: a page is important if important pages link to it ----------
function pageRank(pages, d = 0.85, iterations = 20) {
  const urls = Object.keys(pages);
  let pr = Object.fromEntries(urls.map(u => [u, 1 / urls.length]));
  for (let i = 0; i < iterations; i++) {
    const next = Object.fromEntries(urls.map(u => [u, (1 - d) / urls.length]));
    for (const u of urls) {
      const out = pages[u].links.filter(l => pages[l]);
      for (const l of out) next[l] += d * pr[u] / out.length;
    }
    pr = next;
  }
  return pr;
}

// ---------- 6. Search: TF-IDF relevance x (1 + PageRank boost) ----------
function search(q, index, pages, pr) {
  const N = Object.values(pages).filter(p => !p.noindex).length;
  const scores = {};
  for (const t of tokenize(q)) {
    const postings = index[t] || {};
    const idf = Math.log(1 + N / (Object.keys(postings).length || 1));
    for (const [url, tf] of Object.entries(postings)) scores[url] = (scores[url] ?? 0) + (1 + Math.log(tf)) * idf;
  }
  return Object.entries(scores)
    .map(([url, s]) => [url, s * (1 + 2 * pr[url])])
    .sort((a, b) => b[1] - a[1]);
}

// ---------- Run it ----------
const { pages, log } = crawl('index.html');
console.log('CRAWL LOG'); log.forEach(l => console.log('  ' + l));
const index = buildIndex(pages);
const pr = pageRank(pages);
console.log(`\nINDEX: ${Object.keys(index).length} unique tokens from ${Object.values(pages).filter(p => !p.noindex).length} indexable pages`);
console.log('  "tuition" ->', JSON.stringify(index['tuition']));
console.log('\nPAGERANK');
Object.entries(pr).sort((a, b) => b[1] - a[1]).forEach(([u, v]) => console.log(`  ${v.toFixed(3)}  ${u}`));

for (const q of ['maths tuition karachi', 'physics tutor', 'exam study tips']) {
  console.log(`\nSERP for "${q}"`);
  search(q, index, pages, pr).slice(0, 3).forEach(([url, s], i) => {
    const p = pages[url];
    console.log(`  ${i + 1}. ${p.title}  [score ${s.toFixed(2)}]`);
    console.log(`     karachitutors.pk/${url}`);
    console.log(`     ${(p.description || p.body).slice(0, 90)}…`);
  });
}

// session-04_site-audit.js  (run: node session-04_site-audit.js)
// Crawls the demo site and reports technical/on-page issues with a health score.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const SITE = path.join(__dirname, 'demo-site');

const pages = {}; const inlinks = {}; const queue = [['index.html', 0]]; const seen = new Set(['index.html']);
while (queue.length) {
  const [url, depth] = queue.shift();
  const file = path.join(SITE, url);
  if (!fs.existsSync(file)) { pages[url] = { status: 404, depth }; continue; }
  const doc = new JSDOM(fs.readFileSync(file, 'utf8')).window.document;
  const links = [...new Set([...doc.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => !/^(https?:|mailto:|tel:|#)/.test(h)))];
  doc.querySelectorAll('nav').forEach(n => n.remove());
  pages[url] = {
    status: 200, depth,
    title: doc.title.trim(),
    desc: doc.querySelector('meta[name="description"]')?.content ?? '',
    h1: doc.querySelectorAll('h1').length,
    canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    words: (doc.body.textContent.match(/[A-Za-z0-9']+/g) || []).length,
    imgsNoAlt: [...doc.images].filter(i => !i.getAttribute('alt')).length,
    brokenImgs: [...doc.images].filter(i => !fs.existsSync(path.join(SITE, i.getAttribute('src')))).length,
  };
  for (const l of links) {
    (inlinks[l] ??= new Set()).add(url);
    if (!seen.has(l)) { seen.add(l); queue.push([l, depth + 1]); }
  }
}

// ---- Report table ----
console.log('URL                    status depth inlinks words h1 title-len desc-len');
for (const [u, p] of Object.entries(pages)) {
  console.log(`${u.padEnd(22)} ${String(p.status).padEnd(6)} ${String(p.depth).padEnd(5)} ${String(inlinks[u]?.size ?? 0).padEnd(7)} ${String(p.words ?? '-').padEnd(5)} ${String(p.h1 ?? '-').padEnd(2)} ${String(p.title?.length ?? '-').padEnd(9)} ${p.desc?.length ?? '-'}`);
}

// ---- Issues ----
const ok = Object.entries(pages).filter(([, p]) => p.status === 200);
const issues = [];
const byTitle = {};
ok.forEach(([u, p]) => (byTitle[p.title] ??= []).push(u));
Object.values(byTitle).filter(us => us.length > 1).forEach(us => issues.push(['high', `duplicate title on ${us.join(' & ')}`]));
Object.entries(pages).filter(([, p]) => p.status === 404).forEach(([u]) => issues.push(['high', `broken link target ${u} (linked from ${[...inlinks[u]].join(', ')})`]));
ok.forEach(([u, p]) => {
  if (!p.desc) issues.push(['medium', `missing meta description: ${u}`]);
  else if (p.desc.length < 70) issues.push(['low', `short meta description (${p.desc.length}): ${u}`]);
  if (p.h1 !== 1) issues.push(['medium', `${p.h1} h1 tags: ${u}`]);
  if (!p.canonical) issues.push(['low', `no canonical tag: ${u}`]);
  if (p.words < 100) issues.push(['medium', `thin content (${p.words} words): ${u}`]);
  if (p.imgsNoAlt) issues.push(['low', `${p.imgsNoAlt} image(s) without alt: ${u}`]);
  if (p.brokenImgs) issues.push(['medium', `${p.brokenImgs} broken image(s): ${u}`]);
  if (p.title.length < 30) issues.push(['medium', `short title "${p.title}": ${u}`]);
});
const weights = { high: 10, medium: 5, low: 2 };
const health = Math.max(0, 100 - issues.reduce((s, [sev]) => s + weights[sev], 0));
console.log(`\nISSUES (${issues.length})`);
for (const sev of ['high', 'medium', 'low']) issues.filter(i => i[0] === sev).forEach(([, msg]) => console.log(`  [${sev.toUpperCase().padEnd(6)}] ${msg}`));
console.log(`\nSite health score: ${health}/100`);

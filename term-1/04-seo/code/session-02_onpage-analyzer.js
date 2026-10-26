// session-02_onpage-analyzer.js  (run: node session-02_onpage-analyzer.js)
// Scores pages against an on-page SEO checklist for a target keyword.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const SITE = path.join(__dirname, 'demo-site');

const TARGETS = {                        // page -> primary keyword
  'maths-tuition.html': 'maths tuition',
  'physics-tuition.html': 'physics tuition',
  'blog-study-tips.html': 'study tips',
};

const syllables = w => Math.max(1, (w.toLowerCase().replace(/e$/, '').match(/[aeiouy]+/g) || []).length);
function flesch(text) {
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const words = text.match(/[A-Za-z']+/g) || [];
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  return 206.835 - 1.015 * (words.length / sentences) - 84.6 * (syl / Math.max(1, words.length));
}

function analyse(file, keyword) {
  const doc = new JSDOM(fs.readFileSync(path.join(SITE, file), 'utf8')).window.document;
  doc.querySelectorAll('nav').forEach(n => n.remove());            // judge main content, not the menu
  const kw = keyword.toLowerCase();
  const title = doc.title;
  const desc = doc.querySelector('meta[name="description"]')?.content ?? '';
  const h1s = [...doc.querySelectorAll('h1')].map(h => h.textContent.trim());
  const text = doc.body.textContent.replace(/\s+/g, ' ').trim();
  const words = text.toLowerCase().match(/[a-z0-9']+/g) || [];
  const first100 = words.slice(0, 100).join(' ');
  const kwCount = (text.toLowerCase().match(new RegExp(kw.replace(' ', '\\s+'), 'g')) || []).length;
  const density = (kwCount * kw.split(' ').length / words.length) * 100;
  const imgs = [...doc.images];
  const links = [...doc.querySelectorAll('a[href]')].map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim() }));
  const internal = links.filter(l => !/^(https?:|mailto:|#)/.test(l.href));
  const broken = internal.filter(l => !fs.existsSync(path.join(SITE, l.href)));
  const vague = internal.filter(l => /^(here|click here|more|read more)$/i.test(l.text));

  const checks = [
    [title.length >= 30 && title.length <= 65, 10, `title length ${title.length} (30–65)`],
    [title.toLowerCase().includes(kw), 10, 'keyword in title'],
    [desc.length >= 120 && desc.length <= 160, 10, `meta description length ${desc.length} (120–160)`],
    [desc.toLowerCase().includes(kw.split(' ')[0]), 5, 'keyword in description'],
    [h1s.length === 1, 10, `exactly one h1 (found ${h1s.length})`],
    [h1s.some(h => h.toLowerCase().includes(kw.split(' ')[0])), 10, 'keyword in h1'],
    [first100.includes(kw), 10, 'keyword in first 100 words'],
    [density > 0.5 && density < 4, 10, `keyword density ${density.toFixed(1)}% (0.5–4% reads naturally)`],
    [imgs.every(i => i.getAttribute('alt')), 5, `images with alt ${imgs.filter(i => i.getAttribute('alt')).length}/${imgs.length}`],
    [broken.length === 0, 5, `broken internal links ${broken.length}`],
    [vague.length === 0, 5, `vague anchor texts ${vague.length}`],
    [words.length >= 150, 10, `word count ${words.length} (≥150)`],
  ];
  const score = checks.reduce((s, [ok, pts]) => s + (ok ? pts : 0), 0);
  console.log(`\n${file}  ·  keyword "${keyword}"  ·  SCORE ${score}/100  ·  readability ${flesch(text).toFixed(0)}`);
  checks.forEach(([ok, pts, label]) => console.log(`  ${ok ? '✔' : '✘'} ${label}${ok ? '' : `  (−${pts})`}`));
  return score;
}

const scores = Object.entries(TARGETS).map(([f, k]) => analyse(f, k));
console.log(`\nAverage on-page score: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(0)}/100`);

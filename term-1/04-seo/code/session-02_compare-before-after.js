// session-02_compare-before-after.js  (run: node session-02_compare-before-after.js)
// Compares on-page checks for the original and the optimised physics page.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function audit(file, kw) {
  const doc = new JSDOM(fs.readFileSync(path.join(__dirname, file), 'utf8')).window.document;
  doc.querySelectorAll('nav').forEach(n => n.remove());
  const text = doc.body.textContent.replace(/\s+/g, ' ').trim();
  const words = text.toLowerCase().match(/[a-z0-9']+/g) || [];
  const kwHits = (text.toLowerCase().match(new RegExp(kw, 'g')) || []).length;
  const desc = doc.querySelector('meta[name="description"]')?.content ?? '';
  return {
    'title length': doc.title.length,
    'keyword in title': doc.title.toLowerCase().includes(kw),
    'description length': desc.length,
    'h1 count': doc.querySelectorAll('h1').length,
    'h2 sections': doc.querySelectorAll('h2').length,
    'word count': words.length,
    'keyword density %': +((kwHits / words.length) * 100).toFixed(1),
    'images missing alt': [...doc.images].filter(i => !i.getAttribute('alt')).length,
    'vague anchors': [...doc.querySelectorAll('a')].filter(a => /^(here|click here)$/i.test(a.textContent.trim())).length,
    'links to fees.html (404)': doc.querySelectorAll('a[href="fees.html"]').length,
  };
}

const before = audit('demo-site/physics-tuition.html', 'physics');
const after = audit('session-02_physics-tuition-optimised.html', 'physics');
console.log('check                       before   after');
for (const k of Object.keys(before)) console.log(`${k.padEnd(27)} ${String(before[k]).padStart(6)}  ${String(after[k]).padStart(6)}`);

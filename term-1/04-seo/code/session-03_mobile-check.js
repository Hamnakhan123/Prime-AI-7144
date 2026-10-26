// session-03_mobile-check.js  (run: node session-03_mobile-check.js)
// HTML-level mobile-friendliness checks for the demo pages and a deliberately bad page.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function check(name, html) {
  const doc = new JSDOM(html).window.document;
  const issues = [];
  const vp = doc.querySelector('meta[name="viewport"]')?.content ?? '';
  if (!/width=device-width/.test(vp)) issues.push('no responsive viewport meta tag');
  if (/user-scalable=no|maximum-scale=1(?!\d)/.test(vp)) issues.push('zoom disabled (accessibility problem)');
  doc.querySelectorAll('[style]').forEach(el => {
    const w = el.getAttribute('style').match(/width:\s*(\d+)px/);
    if (w && +w[1] > 400) issues.push(`fixed width ${w[1]}px on <${el.tagName.toLowerCase()}> (horizontal scroll)`);
    const f = el.getAttribute('style').match(/font-size:\s*(\d+)px/);
    if (f && +f[1] < 12) issues.push(`font-size ${f[1]}px too small on <${el.tagName.toLowerCase()}>`);
  });
  [...doc.images].forEach(img => {
    if (!img.getAttribute('width') || !img.getAttribute('height')) issues.push(`image ${img.getAttribute('src')} has no width/height (CLS risk)`);
  });
  doc.querySelectorAll('head script[src]:not([defer]):not([async])').forEach(s => issues.push(`render-blocking script ${s.getAttribute('src')} in <head>`));
  console.log(`${issues.length ? '✘' : '✔'} ${name}${issues.length ? '' : ' – no HTML-level mobile issues'}`);
  issues.forEach(i => console.log(`    - ${i}`));
}

const SITE = path.join(__dirname, 'demo-site');
for (const f of ['index.html', 'maths-tuition.html', 'physics-tuition.html']) check(f, fs.readFileSync(path.join(SITE, f), 'utf8'));
check('old-desktop-page.html (sample)', `<!DOCTYPE html><html><head>
  <meta name="viewport" content="width=1024, user-scalable=no"><script src="slider.js"></script></head>
  <body><div style="width: 980px">Our services</div><p style="font-size: 10px">Terms apply</p><img src="banner.jpg"></body></html>`);

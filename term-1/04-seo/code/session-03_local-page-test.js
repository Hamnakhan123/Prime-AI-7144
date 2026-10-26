// session-03_local-page-test.js  (run: node session-03_local-page-test.js)
// Verifies the local landing page: mobile basics, valid JSON-LD, and structured facts visible on the page.
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const doc = new JSDOM(fs.readFileSync(path.join(__dirname, 'session-03_local-landing-dha.html'), 'utf8')).window.document;
const visible = doc.body.textContent.replace(/\s+/g, ' ');

console.log('title       :', doc.title, `(${doc.title.length} chars)`);
console.log('description :', doc.querySelector('meta[name=description]').content.length, 'chars');
console.log('viewport    :', doc.querySelector('meta[name=viewport]').content);
console.log('click-to-call link:', !!doc.querySelector('a[href^="tel:"]'), '| images with width/height:',
  [...doc.images].every(i => i.width && i.height));

const blocks = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent));
console.log('JSON-LD blocks parsed:', blocks.map(b => b['@type']).join(', '));

const lb = blocks.find(b => b['@type'] === 'LocalBusiness');
const facts = [['telephone', '021-0000000'], ['street', lb.address.streetAddress], ['postal code', lb.address.postalCode]];
facts.forEach(([label, value]) => console.log(`  ${label.padEnd(12)} "${value}" visible on page: ${visible.includes(value)}`));
const faq = blocks.find(b => b['@type'] === 'FAQPage');
faq.mainEntity.forEach(q => console.log(`  FAQ "${q.name}" visible: ${visible.includes(q.name)}`));

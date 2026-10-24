const fs = require('fs');
const m = JSON.parse(fs.readFileSync('session-16_manifest.webmanifest', 'utf8'));

const checks = [
  ['has name or short_name', Boolean(m.name || m.short_name)],
  ['short_name <= 12 chars', (m.short_name ?? '').length <= 12],
  ['start_url set', Boolean(m.start_url)],
  ['display is standalone/fullscreen/minimal-ui', ['standalone', 'fullscreen', 'minimal-ui'].includes(m.display)],
  ['icon 192x192', m.icons.some(i => i.sizes === '192x192')],
  ['icon 512x512', m.icons.some(i => i.sizes === '512x512')],
  ['maskable icon', m.icons.some(i => (i.purpose ?? '').includes('maskable'))],
  ['theme_color set', /^#[0-9a-f]{6}$/i.test(m.theme_color)],
];
for (const [label, ok] of checks) console.log(ok ? '✔' : '✘', label);
console.log(checks.every(([, ok]) => ok) ? 'Manifest looks installable.' : 'Fix the ✘ items.');

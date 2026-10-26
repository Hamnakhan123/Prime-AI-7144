// session-05_breakpoint-inspector.js  (run: node session-05_breakpoint-inspector.js)
// Predicts Bootstrap 5 display and spacing utilities at given viewport widths.

const BP = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };
const SPACE = { 0: '0', 1: '4px', 2: '8px', 3: '16px', 4: '24px', 5: '48px', auto: 'auto' };

const activeBp = w => Object.entries(BP).filter(([, min]) => w >= min).at(-1)[0];

// Generic mobile-first resolver: classes like "d-none d-md-block" -> value at width w
function resolve(classes, prefix, w) {
  let value = null;
  for (const [bp, min] of Object.entries(BP)) {
    if (w < min) break;
    for (const c of classes.split(/\s+/)) {
      const re = bp === 'xs' ? new RegExp(`^${prefix}-([\\w]+)$`) : new RegExp(`^${prefix}-${bp}-([\\w]+)$`);
      const m = c.match(re);
      if (m) value = m[1];
    }
  }
  return value;
}

const widths = [360, 600, 800, 1024, 1280, 1440];
const cases = [
  ['d-none d-md-block', 'd', v => (v === 'none' ? 'hidden' : v ?? 'default')],
  ['d-md-none', 'd', v => (v === 'none' ? 'hidden' : v ?? 'default')],
  ['d-none d-lg-flex d-xl-none', 'd', v => (v === 'none' ? 'hidden' : v ?? 'default')],
  ['p-2 p-md-4 p-xl-5', 'p', v => SPACE[v] ?? '0'],
  ['mt-1 mt-lg-5', 'mt', v => SPACE[v] ?? '0'],
];

console.log('width   bp  | ' + cases.map(([c]) => c.padEnd(26)).join('| '));
console.log('-'.repeat(12 + cases.length * 28));
for (const w of widths) {
  const cells = cases.map(([cls, prefix, fmt]) => fmt(resolve(cls, prefix, w)).padEnd(26));
  console.log(`${String(w).padStart(5)}px ${activeBp(w).padEnd(3)} | ${cells.join('| ')}`);
}

const queries = { 'base (always)': () => true, 'min-width: 640px': w => w >= 640, 'min-width: 1024px': w => w >= 1024 };
const devices = { 'Galaxy A14 (384)': 384, 'iPhone 15 (393)': 393, 'iPad mini (768)': 768, 'Laptop (1366)': 1366 };
const columns = w => (w >= 1024 ? 4 : w >= 640 ? 2 : 1);

for (const [name, w] of Object.entries(devices)) {
  const matched = Object.keys(queries).filter(q => queries[q](w));
  console.log(`${name.padEnd(18)} -> ${columns(w)} col | matches: ${matched.join(', ')}`);
}

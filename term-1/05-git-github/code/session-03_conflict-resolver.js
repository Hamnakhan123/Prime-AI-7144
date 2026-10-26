// session-03_conflict-resolver.js  (run: node session-03_conflict-resolver.js)
// Parses Git conflict markers and resolves them with a chosen strategy.

const conflicted = `const SHOP = 'Karachi Bakes';
<<<<<<< HEAD
const DELIVERY = 250;
=======
const DELIVERY = 300;
const FREE_ABOVE = 5000;
>>>>>>> feature/price
function total(sum) {
<<<<<<< HEAD
  return sum + DELIVERY;
=======
  return sum >= FREE_ABOVE ? sum : sum + DELIVERY;
>>>>>>> feature/price
}`;

function parse(text) {
  const parts = []; let mode = 'normal'; let ours = [], theirs = [];
  for (const line of text.split('\n')) {
    if (line.startsWith('<<<<<<<')) { mode = 'ours'; ours = []; theirs = []; }
    else if (line.startsWith('=======') && mode === 'ours') mode = 'theirs';
    else if (line.startsWith('>>>>>>>') && mode === 'theirs') { parts.push({ ours, theirs }); mode = 'normal'; }
    else if (mode === 'ours') ours.push(line);
    else if (mode === 'theirs') theirs.push(line);
    else parts.push(line);
  }
  return parts;
}

function resolve(text, strategy) {
  return parse(text).flatMap(p => typeof p === 'string' ? [p]
    : strategy === 'ours' ? p.ours : strategy === 'theirs' ? p.theirs : [...p.ours, ...p.theirs]).join('\n');
}

const hasMarkers = t => /^(<{7}|={7}|>{7})( |$)/m.test(t);

const conflicts = parse(conflicted).filter(p => typeof p !== 'string').length;
console.log(`Conflicts found: ${conflicts} | file still has markers: ${hasMarkers(conflicted)}\n`);
for (const s of ['ours', 'theirs']) {
  const out = resolve(conflicted, s);
  console.log(`--- strategy: ${s} (markers left: ${hasMarkers(out)}) ---\n${out}\n`);
}
// "both" blindly concatenates: often WRONG for code – a human must check
console.log(`--- strategy: both ---\n${resolve(conflicted, 'both')}`);
console.log('\n⚠ "both" produced two DELIVERY constants and two return statements – always review the result.');

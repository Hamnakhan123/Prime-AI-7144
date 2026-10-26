// scripts/lint.js – a tiny linter used by the CI "lint" step (no dependencies)
const fs = require('fs');
const path = require('path');

const RULES = [
  [/console\.log\(/, 'no console.log in source code'],
  [/\bvar\s/, 'use let or const instead of var'],
  [/[ \t]+$/, 'no trailing whitespace'],
];
const dir = path.join(__dirname, '..', 'src');
let errors = 0;
for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
  fs.readFileSync(path.join(dir, file), 'utf8').split('\n').forEach((line, i) => {
    for (const [re, msg] of RULES) {
      if (re.test(line)) { console.log(`  src/${file}:${i + 1}  ${msg}`); errors++; }
    }
  });
}
process.exit(errors ? 1 : 0);

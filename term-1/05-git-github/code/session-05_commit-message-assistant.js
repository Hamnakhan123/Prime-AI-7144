// session-05_commit-message-assistant.js  (run: node session-05_commit-message-assistant.js)
// Suggests a Conventional Commit message from the staged diff of a demo repository.
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cm-'));
const sh = cmd => execSync(cmd, { cwd: dir, encoding: 'utf8', env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1',
  GIT_AUTHOR_NAME: 'Demo', GIT_AUTHOR_EMAIL: 'demo@example.com', GIT_COMMITTER_NAME: 'Demo', GIT_COMMITTER_EMAIL: 'demo@example.com' } });

// --- demo repo with an initial commit ---
sh('git init -q -b main');
fs.mkdirSync(path.join(dir, 'src')); fs.mkdirSync(path.join(dir, 'test'));
fs.writeFileSync(path.join(dir, 'src/cart.js'), 'exports.total = items => items.reduce((s, i) => s + i.price * i.qty, 0);\n');
sh('git add . && git commit -q -m "feat: cart total"');

function suggest() {
  const files = sh('git diff --cached --name-status').trim().split('\n').map(l => l.split('\t'));
  const stats = sh('git diff --cached --numstat').trim().split('\n').map(l => l.split('\t'));
  const paths = files.map(f => f[1]);
  const added = stats.reduce((s, [a]) => s + +a, 0), removed = stats.reduce((s, [, r]) => s + +r, 0);
  let type = 'chore';
  if (paths.every(p => /^test\/|\.test\./.test(p))) type = 'test';
  else if (paths.every(p => /\.md$/.test(p))) type = 'docs';
  else if (paths.some(p => /^\.github\/workflows/.test(p))) type = 'ci';
  else if (files.some(([s, p]) => s === 'A' && p.startsWith('src/'))) type = 'feat';
  else if (paths.some(p => p.startsWith('src/')) && removed >= added) type = 'refactor';
  else if (paths.some(p => p.startsWith('src/'))) type = 'feat';
  const scopes = [...new Set(paths.map(p => path.basename(p).replace(/(\.test)?\.\w+$/, '')))];
  const scope = scopes.length === 1 ? `(${scopes[0]})` : '';
  const verb = { feat: 'add', test: 'add tests for', docs: 'document', ci: 'update workflow for', refactor: 'simplify', chore: 'update' }[type];
  return { msg: `${type}${scope}: ${verb} ${scopes.join(', ')}`, detail: `${files.length} file(s), +${added} −${removed}` };
}

const scenarios = [
  ['add a discount function', () => {
    fs.writeFileSync(path.join(dir, 'src/discount.js'), 'exports.apply = (t) => (t > 5000 ? t * 0.9 : t);\n'); }],
  ['add tests only', () => {
    fs.writeFileSync(path.join(dir, 'test/cart.test.js'), "const t=require('node:test');\nt('total',()=>{});\n"); }],
  ['shorten existing code', () => {
    fs.writeFileSync(path.join(dir, 'src/cart.js'), 'exports.total = i => i.reduce((s, x) => s + x.price * x.qty, 0);\n'); }],
  ['update the README', () => { fs.writeFileSync(path.join(dir, 'README.md'), '# Cart\nRun the tests with node --test.\n'); }],
];
for (const [label, change] of scenarios) {
  change(); sh('git add -A');
  const { msg, detail } = suggest();
  console.log(`${label.padEnd(26)} → ${msg.padEnd(36)} [${detail}]`);
  sh(`git commit -q -m "${msg}"`);
}
console.log('\nA draft is a starting point: edit it so it says WHY, e.g. "feat(discount): give 10% off orders above Rs 5,000".');
fs.rmSync(dir, { recursive: true, force: true });

// session-06_workflow-check.js  (run: node session-06_workflow-check.js)
// Minimal YAML parser (maps, lists, scalars) + GitHub Actions workflow lint rules.
const fs = require('fs');
const path = require('path');

function parseYAML(text) {
  const lines = text.split('\n').map(l => l.replace(/\s+#.*$/, '')).filter(l => l.trim() && !l.trim().startsWith('#'));
  let i = 0;
  const indentOf = l => l.match(/^ */)[0].length;
  const scalar = v => {
    v = v.trim();
    if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(',').map(s => scalar(s));
    if (/^\d+$/.test(v)) return +v;
    return v.replace(/^['"]|['"]$/g, '');
  };
  function block(indent) {
    if (lines[i].trim().startsWith('- ')) {               // a list
      const arr = [];
      while (i < lines.length && indentOf(lines[i]) === indent && lines[i].trim().startsWith('- ')) {
        const rest = lines[i].trim().slice(2);
        if (/^[\w-]+:/.test(rest)) {                       // "- key: value" starts a map item
          lines[i] = ' '.repeat(indent + 2) + rest;
          arr.push(block(indent + 2));
        } else { arr.push(scalar(rest)); i++; }
      }
      return arr;
    }
    const obj = {};
    while (i < lines.length && indentOf(lines[i]) === indent) {
      const m = lines[i].trim().match(/^([\w.-]+):\s*(.*)$/);
      if (!m) throw new Error(`cannot parse line: "${lines[i].trim()}"`);
      i++;
      if (m[2] !== '') obj[m[1]] = scalar(m[2]);
      else if (i < lines.length && indentOf(lines[i]) > indent) obj[m[1]] = block(indentOf(lines[i]));
      else obj[m[1]] = null;
    }
    return obj;
  }
  return block(0);
}

function check(name, text) {
  const problems = [];
  if (/\t/.test(text)) problems.push('tab characters found – YAML needs spaces');
  let wf;
  try { wf = parseYAML(text); } catch (e) { console.log(`✘ ${name}: ${e.message}`); return; }
  if (!wf.on) problems.push('missing "on:" triggers');
  if (!wf.jobs || !Object.keys(wf.jobs).length) problems.push('no jobs defined');
  for (const [job, def] of Object.entries(wf.jobs || {})) {
    if (!def['runs-on']) problems.push(`job "${job}" has no runs-on`);
    const steps = def.steps || [];
    if (!steps.length) problems.push(`job "${job}" has no steps`);
    if (steps.length && !String(steps[0].uses || '').startsWith('actions/checkout')) problems.push(`job "${job}": first step should be actions/checkout`);
    steps.forEach((s, k) => {
      if (!s.uses && !s.run) problems.push(`job "${job}" step ${k + 1} has neither uses nor run`);
      if (s.uses && !/@/.test(s.uses)) problems.push(`job "${job}" step ${k + 1}: pin a version, e.g. ${s.uses}@v4`);
      if (/(token|password|api[_-]?key)\s*[:=]\s*[A-Za-z0-9]{12,}/i.test(String(s.run || ''))) problems.push(`job "${job}" step ${k + 1}: hard-coded secret – use \${{ secrets.NAME }}`);
    });
    if (def.needs && !(wf.jobs[def.needs])) problems.push(`job "${job}" needs unknown job "${def.needs}"`);
  }
  const jobs = Object.keys(wf.jobs || {});
  console.log(`${problems.length ? '✘' : '✔'} ${name}: triggers=${Object.keys(wf.on || {}).join(',') || '-'} jobs=${jobs.join(',') || '-'}`);
  problems.forEach(p => console.log(`    - ${p}`));
  if (!problems.length) {
    const t = wf.jobs.test;
    if (t?.strategy?.matrix) console.log(`    matrix: node ${t.strategy.matrix.node.join(', ')} → ${t.strategy.matrix.node.length} parallel test jobs`);
  }
}

check('ci.yml', fs.readFileSync(path.join(__dirname, 'session-06_ci-demo/.github/workflows/ci.yml'), 'utf8'));
check('pages.yml', fs.readFileSync(path.join(__dirname, 'session-06_ci-demo/.github/workflows/pages.yml'), 'utf8'));
check('broken.yml (sample)', `name: Broken
jobs:
  build:
    steps:
      - uses: actions/setup-node
      - name: Deploy
        run: curl -H "token: abc123def456ghi789" https://example.com/deploy
  deploy:
    needs: biuld
    runs-on: ubuntu-latest
    steps:
      - name: nothing here
`);

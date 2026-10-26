// session-05_secret-scanner.js  (run: node session-05_secret-scanner.js)
// Scans added lines of a diff for likely secrets and prints a masked report.

const RULES = [
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{36}\b/],
  ['Private key block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['Generic API key assignment', /\b(api[_-]?key|secret|token)\s*[:=]\s*['"]?([A-Za-z0-9_\-]{16,})['"]?/i],
  ['Password in code', /\bpassword\s*[:=]\s*['"][^'"]{6,}['"]/i],
  ['Connection string with password', /\b(?:mongodb(?:\+srv)?|mysql|postgres(?:ql)?):\/\/[^:\s]+:[^@\s]+@/i],
];
const mask = s => s.length <= 8 ? '****' : s.slice(0, 4) + '…' + '*'.repeat(6);

function scan(diff) {
  const findings = [];
  diff.split('\n').forEach((line, i) => {
    if (!line.startsWith('+') || line.startsWith('+++')) return;      // only newly added lines
    for (const [name, re] of RULES) {
      const m = line.match(re);
      if (m) findings.push({ line: i + 1, name, sample: mask(m[2] || m[0]) });
    }
  });
  return findings;
}

// Fake values assembled at runtime (not real credentials)
const fakeToken = 'gh' + 'p_' + 'Ab3'.repeat(12);
const fakeKey = 'demo_' + 'x7Q'.repeat(6);
const diff = [
  'diff --git a/src/config.js b/src/config.js',
  '+++ b/src/config.js',
  '+const API_KEY = "' + fakeKey + '";',
  '+const githubToken = "' + fakeToken + '";',
  '+const db = "mongodb+srv://admin:' + 'Pa55word' + '@cluster0.example.net/shop";',
  '+const greeting = "hello world";',
  '-const password = "old-removed-line";',
  '+// password reset handled by the server',
].join('\n');

const findings = scan(diff);
findings.forEach(f => console.log(`✘ line ${f.line}: ${f.name.padEnd(32)} ${f.sample}`));
console.log(findings.length ? `\n${findings.length} possible secret(s) – commit BLOCKED. Move them to .env and rotate any real key.` : 'No secrets found.');
process.exitCode = 0;   // demo: don't fail the build here; a real hook would exit 1

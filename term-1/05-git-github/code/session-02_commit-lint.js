// session-02_commit-lint.js  (run: node session-02_commit-lint.js)
// Validates commit messages against Conventional Commits + style rules.
const TYPES = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'];
const PATTERN = /^(\w+)(\([\w\-./]+\))?(!)?: (.+)$/;

function lint(message) {
  const [subject] = message.split('\n');
  const errors = [];
  const m = subject.match(PATTERN);
  if (!m) return ['format must be "type(scope): summary"'];
  const [, type, , , summary] = m;
  if (!TYPES.includes(type)) errors.push(`unknown type "${type}" (use ${TYPES.slice(0, 6).join(', ')}…)`);
  if (subject.length > 72) errors.push(`subject is ${subject.length} chars (max 72)`);
  if (/\.$/.test(summary)) errors.push('no full stop at the end');
  if (/^[A-Z]/.test(summary)) errors.push('start the summary in lower case');
  if (/^(added|fixed|updated|changed|removed)\b/i.test(summary)) errors.push('use the imperative mood ("add", not "added")');
  if (/^(update|changes?|stuff|wip|misc)$/i.test(summary.trim())) errors.push('summary is not descriptive');
  return errors;
}

const samples = [
  'feat(cart): add quantity buttons',
  'fix: stop total showing NaN when cart is empty',
  'Fixed stuff',
  'feat: Added login page.',
  'chore: update',
  'docs(readme): explain how to run the tests locally and how to deploy the site to GitHub Pages',
  'feature: add search',
  'ci!: drop Node 16 from the test matrix',
];
for (const msg of samples) {
  const errors = lint(msg);
  console.log(`${errors.length ? '✘' : '✔'} ${msg}`);
  errors.forEach(e => console.log(`     - ${e}`));
}

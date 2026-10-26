// session-03_mini-project-pr-description.js  (run: node session-03_mini-project-pr-description.js)
// Turns a branch's commit subjects into a structured pull-request description.

const branch = 'feature/order-form';
const commits = [                       // as from: git log main..feature/order-form --format=%s
  'feat(order): add order form with name, phone and cake fields',
  'feat(order): validate phone numbers (closes #14)',
  'fix(order): keep modal open when validation fails',
  'style: align form labels on mobile',
  'docs: describe the order flow in README',
  'test(order): cover invalid phone formats',
];

const GROUPS = { feat: '✨ Features', fix: '🐛 Fixes', docs: '📝 Documentation', test: '✅ Tests', style: '🎨 Style', refactor: '♻️ Refactoring', chore: '🔧 Chores' };
const groups = {};
const issues = new Set();
for (const c of commits) {
  const m = c.match(/^(\w+)(\(([^)]+)\))?: (.+)$/);
  if (!m) continue;
  const [, type, , scope, summary] = m;
  (groups[type] ??= []).push(scope ? `**${scope}:** ${summary}` : summary);
  for (const i of c.matchAll(/(?:closes|fixes) #(\d+)/gi)) issues.add(i[1]);
}

const title = branch.replace(/^feature\//, '').replace(/-/g, ' ').replace(/^./, ch => ch.toUpperCase());
console.log(`# ${title}\n`);
console.log(`Merges \`${branch}\` into \`main\` (${commits.length} commits).\n`);
for (const [type, label] of Object.entries(GROUPS)) {
  if (!groups[type]) continue;
  console.log(`## ${label}`);
  groups[type].forEach(g => console.log(`- ${g.replace(/ \(closes #\d+\)/i, '')}`));
  console.log('');
}
console.log('## Checklist');
['Tested on mobile and desktop', 'No console errors', 'Screenshots attached', 'README updated'].forEach(i => console.log(`- [ ] ${i}`));
if (issues.size) console.log(`\n${[...issues].map(i => `Closes #${i}`).join('\n')}`);

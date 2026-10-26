// session-04_seo-plan.js  (run: node session-04_seo-plan.js)
// Prioritises findings by impact/effort and schedules them into a 4-week plan.

const findings = [
  // [task, type, impact 1-3, effort 1-3]
  ['Fix broken links to fees.html (create a fees page)', 'fix', 3, 1],
  ['Give contact page a unique title + description', 'fix', 2, 1],
  ['Rewrite physics page (title, description, content, one h1)', 'optimise', 3, 2],
  ['Rewrite titles/descriptions for low-CTR queries on page 1', 'optimise', 3, 1],
  ['Add canonical tags to physics and contact pages', 'fix', 1, 1],
  ['Add LocalBusiness + BreadcrumbList JSON-LD', 'optimise', 2, 1],
  ['Expand study-tips article to reach page 1 (add sections, FAQs)', 'create', 3, 3],
  ['Create chemistry tuition page (new keyword cluster)', 'create', 2, 2],
  ['Create DHA local landing page', 'create', 2, 2],
  ['Claim and complete Google Business Profile, ask 10 reviews', 'promote', 3, 2],
  ['Publish formula-sheet PDF and do school outreach for links', 'promote', 2, 3],
  ['Instagram reels with UTM links to the study-tips article', 'promote', 1, 1],
];
const ORDER = { fix: 0, optimise: 1, create: 2, promote: 3 };

const tasks = findings.map(([task, type, impact, effort]) => ({ task, type, impact, effort, priority: +(impact / effort).toFixed(2) }))
  .sort((a, b) => b.priority - a.priority || ORDER[a.type] - ORDER[b.type]);

// Capacity: 5 effort points per week; fixes are pulled into week 1 first
const weeks = [[], [], [], []]; const load = [0, 0, 0, 0];
for (const t of [...tasks].sort((a, b) => (a.type === 'fix' ? -1 : 0) - (b.type === 'fix' ? -1 : 0))) {
  const w = load.findIndex(l => l + t.effort <= 5);
  const slot = w === -1 ? 3 : w;
  weeks[slot].push(t); load[slot] += t.effort;
}
weeks.forEach((ts, i) => {
  console.log(`WEEK ${i + 1} (effort ${load[i]}/5)`);
  ts.forEach(t => console.log(`  [${t.type.padEnd(8)}] p=${t.priority.toFixed(2)}  ${t.task}`));
});
console.log('\nKPI targets for day 30: CTR 2.4% → 3.5% · organic key events +30% · physics page on page 1 for "physics tuition karachi" · 10 new reviews · site health ≥ 85');

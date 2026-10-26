// session-01_robots-checker.js  (run: node session-01_robots-checker.js)
// Tests URLs against robots.txt rules: group selection by user-agent, longest-match wins, * and $ wildcards.

const robotsTxt = `
User-agent: *
Disallow: /admin/
Disallow: /*.pdf$
Allow: /admin/help.html

User-agent: Googlebot-Image
Disallow: /private-photos/

User-agent: BadBot
Disallow: /

Sitemap: https://karachitutors.pk/sitemap.xml
`;

function parse(txt) {
  const groups = []; let current = null; const sitemaps = [];
  for (const raw of txt.split('\n')) {
    const line = raw.split('#')[0].trim();
    if (!line.includes(':')) continue;
    const [k, ...rest] = line.split(':'); const key = k.trim().toLowerCase(); const val = rest.join(':').trim();
    if (key === 'user-agent') {
      if (!current || current.rules.length) { current = { agents: [], rules: [] }; groups.push(current); }
      current.agents.push(val.toLowerCase());
    } else if ((key === 'allow' || key === 'disallow') && current) {
      if (val) current.rules.push({ type: key, path: val });
    } else if (key === 'sitemap') sitemaps.push(val);
  }
  return { groups, sitemaps };
}

// Convert a robots path pattern to a RegExp: * = anything, $ = end of URL
const toRegex = p => new RegExp('^' + p.replace(/[.+?^{}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*'));

function isAllowed(robots, agent, url) {
  const a = agent.toLowerCase();
  // most specific group: exact agent name match beats "*"
  const group = robots.groups.find(g => g.agents.includes(a)) || robots.groups.find(g => g.agents.includes('*'));
  if (!group) return { allowed: true, rule: '(no group)' };
  const matches = group.rules.filter(r => toRegex(r.path).test(url));
  if (!matches.length) return { allowed: true, rule: '(no matching rule)' };
  // longest pattern wins; on a tie, Allow wins
  matches.sort((x, y) => y.path.length - x.path.length || (x.type === 'allow' ? -1 : 1));
  return { allowed: matches[0].type === 'allow', rule: `${matches[0].type}: ${matches[0].path}` };
}

const robots = parse(robotsTxt);
const tests = [
  ['Googlebot', '/maths-tuition.html'],
  ['Googlebot', '/admin/login.html'],
  ['Googlebot', '/admin/help.html'],
  ['Googlebot', '/notes/physics.pdf'],
  ['Googlebot', '/notes/physics.pdf?v=2'],
  ['Googlebot-Image', '/private-photos/team.jpg'],
  ['Googlebot-Image', '/admin/login.html'],
  ['BadBot', '/index.html'],
];
console.log('Sitemaps declared:', robots.sitemaps.join(', '));
for (const [agent, url] of tests) {
  const r = isAllowed(robots, agent, url);
  console.log(`${r.allowed ? 'ALLOW   ' : 'BLOCK   '} ${agent.padEnd(16)} ${url.padEnd(28)} ← ${r.rule}`);
}

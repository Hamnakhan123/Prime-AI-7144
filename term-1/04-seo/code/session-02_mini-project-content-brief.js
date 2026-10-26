// session-02_mini-project-content-brief.js  (run: node session-02_mini-project-content-brief.js)
// Generates an SEO content brief for a writer from a keyword, intent and related terms.

const OUTLINES = {
  transactional: ['What is included', 'How it works', 'Fees and booking', 'Why choose us', 'FAQs'],
  commercial: ['How to choose', 'Comparison table', 'Pros and cons', 'Our recommendation', 'FAQs'],
  informational: ['Quick answer', 'Step-by-step guide', 'Common mistakes', 'Examples', 'FAQs'],
};
const WORDS = { transactional: 600, commercial: 1200, informational: 1500 };

const titleCase = s => s.replace(/\b\w/g, c => c.toUpperCase());
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const lengthFlag = (s, min, max) => (s.length < min ? `too short (${s.length})` : s.length > max ? `too long (${s.length})` : `ok (${s.length})`);

function brief({ keyword, intent, related, brand, internalLinks }) {
  const title = `${titleCase(keyword)} – ${intent === 'informational' ? 'A Practical Guide' : 'Qualified Tutors'} | ${brand}`;
  const description = intent === 'informational'
    ? `Learn ${keyword} with clear steps, examples and common mistakes to avoid. Free guide from ${brand}.`
    : `${titleCase(keyword)} with qualified, trial-tested tutors. Home or online lessons and a free trial class – book today.`;
  console.log(`CONTENT BRIEF · "${keyword}" (${intent})`);
  console.log(`  Title       : ${title}\n                ${lengthFlag(title, 30, 65)}`);
  console.log(`  Description : ${description}\n                ${lengthFlag(description, 120, 160)}`);
  console.log(`  URL slug    : /${slug(keyword)}`);
  console.log(`  H1          : ${titleCase(keyword)}`);
  console.log('  Outline (H2):');
  OUTLINES[intent].forEach((h, i) => console.log(`     ${i + 1}. ${h}`));
  console.log(`  Include terms naturally: ${related.join(', ')}`);
  console.log(`  Internal links: ${internalLinks.map(([text, url]) => `"${text}" → ${url}`).join('; ')}`);
  console.log(`  Target length: ~${WORDS[intent]} words · keyword in first 100 words · 1 image with alt text\n`);
}

brief({ keyword: 'chemistry tuition karachi', intent: 'transactional', brand: 'Karachi Tutors',
  related: ['O Level chemistry', 'A Level chemistry', 'organic chemistry', 'practical paper', 'past papers'],
  internalLinks: [['physics tuition', '/physics-tuition.html'], ['study tips', '/blog-study-tips.html']] });
brief({ keyword: 'how to study for o level physics', intent: 'informational', brand: 'Karachi Tutors',
  related: ['formula sheet', 'past papers', 'practicals', 'revision timetable', 'examiner reports'],
  internalLinks: [['physics tuition in Karachi', '/physics-tuition.html']] });

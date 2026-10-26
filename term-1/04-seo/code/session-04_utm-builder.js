// session-04_utm-builder.js  (run: node session-04_utm-builder.js)
// Builds clean, consistent UTM-tagged URLs for social campaigns.

const norm = s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

function utm(base, { source, medium, campaign, content, term }) {
  if (!source || !medium || !campaign) throw new Error('source, medium and campaign are required');
  const url = new URL(base);
  if (url.hostname === 'karachitutors.pk' && medium === 'internal') throw new Error('never tag internal links');
  const params = { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: content, utm_term: term };
  for (const [k, v] of Object.entries(params)) if (v) url.searchParams.set(k, norm(v));
  return url.toString();
}

const base = 'https://karachitutors.pk/blog-study-tips.html';
const posts = [
  { source: 'Instagram', medium: 'social', campaign: 'Exam Tips Oct 2026', content: 'Reel 1 - spaced revision' },
  { source: 'Facebook', medium: 'social', campaign: 'Exam Tips Oct 2026', content: 'Parents group post' },
  { source: 'WhatsApp', medium: 'social', campaign: 'Exam Tips Oct 2026', content: 'Channel update' },
  { source: 'newsletter', medium: 'email', campaign: 'Exam Tips Oct 2026' },
  { source: 'YouTube', medium: 'social' },                               // missing campaign → error
];
for (const p of posts) {
  try { console.log(`${p.source.padEnd(10)} ${utm(base, p)}`); }
  catch (e) { console.log(`${p.source.padEnd(10)} ERROR: ${e.message}`); }
}

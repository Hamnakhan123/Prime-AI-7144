// session-01_operator-builder.js  (run: node session-01_operator-builder.js)
// Builds advanced-operator queries for a domain and keyword, with properly encoded Google URLs.

function build({ domain, keyword, city, competitor }) {
  return [
    ['Indexed pages on our site', `site:${domain}`],
    ['Our pages about the keyword', `site:${domain} "${keyword}"`],
    ['Competitors using the phrase in titles', `intitle:"${keyword}" ${city} -site:${domain}`],
    ['Blog posts on the topic', `inurl:blog "${keyword}" ${city}`],
    ['Downloadable syllabus PDFs (link-building ideas)', `filetype:pdf "${keyword.split(' ')[0]}" syllabus ${city}`],
    ['Fresh content since mid-2025', `"${keyword}" after:2025-06-01`],
    ['Competitor pages except their blog', `site:${competitor} -inurl:blog`],
    ['Who mentions the competitor but not us', `"${competitor}" -site:${competitor} -"${domain}"`],
  ];
}

const queries = build({ domain: 'karachitutors.pk', keyword: 'physics tuition', city: 'karachi', competitor: 'example-academy.pk' });
queries.forEach(([purpose, q], i) => {
  console.log(`${i + 1}. ${purpose}`);
  console.log(`   ${q}`);
  console.log(`   https://www.google.com/search?q=${encodeURIComponent(q)}`);
});

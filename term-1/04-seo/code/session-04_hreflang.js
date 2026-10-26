// session-04_hreflang.js  (run: node session-04_hreflang.js)
// Generates reciprocal hreflang tags and validates a buggy set.

const VERSIONS = {                         // hreflang code -> URL
  'en-pk': 'https://karachitutors.pk/en/',
  'ur-pk': 'https://karachitutors.pk/ur/',
  'en-ae': 'https://karachitutors.pk/ae/',
  'x-default': 'https://karachitutors.pk/',
};
const LANGS = ['en', 'ur', 'ar'];
const REGIONS = ['pk', 'ae', 'gb', 'us', 'sa'];

// 1. Generate: every page lists ALL versions, including itself
console.log('<!-- put this identical block in the <head> of every version -->');
for (const [code, url] of Object.entries(VERSIONS)) console.log(`<link rel="alternate" hreflang="${code}" href="${url}">`);

// 2. Validate a set of pages, each with the hreflang links it declares
const declared = {
  'https://karachitutors.pk/en/': { 'en-pk': 'https://karachitutors.pk/en/', 'ur-pk': 'https://karachitutors.pk/ur/', 'en-uk': 'https://karachitutors.pk/uk/' },
  'https://karachitutors.pk/ur/': { 'en-pk': 'https://karachitutors.pk/en/' },
  'https://karachitutors.pk/ae/': { 'en-ae': 'https://karachitutors.pk/ae/', 'en-pk': 'https://karachitutors.pk/en/' },
};

function validCode(code) {
  if (code === 'x-default') return true;
  const [lang, region] = code.split('-');
  return LANGS.includes(lang) && (!region || REGIONS.includes(region));
}

console.log('\nVALIDATION');
let problems = 0;
for (const [page, links] of Object.entries(declared)) {
  const msgs = [];
  if (!Object.values(links).includes(page)) msgs.push('missing self-reference');
  for (const [code, target] of Object.entries(links)) {
    if (!validCode(code)) msgs.push(`invalid code "${code}" (region for the UK is "gb")`);
    if (target !== page && declared[target] && !Object.values(declared[target]).includes(page)) msgs.push(`no return link from ${target}`);
    if (target !== page && !declared[target]) msgs.push(`target ${target} not found in crawl`);
  }
  if (!('x-default' in links)) msgs.push('no x-default');
  problems += msgs.length;
  console.log(`${page}\n   ${msgs.length ? msgs.join('\n   ') : 'ok'}`);
}
console.log(`\n${problems} hreflang problem(s) found`);

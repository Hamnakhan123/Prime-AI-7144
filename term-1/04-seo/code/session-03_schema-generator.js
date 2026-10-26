// session-03_schema-generator.js  (run: node session-03_schema-generator.js)
// Builds JSON-LD structured data and checks required/recommended properties.

const business = {
  name: 'Karachi Tutors', url: 'https://karachitutors.pk/', telephone: '+92-21-0000000',
  street: 'Office 12, Shahrah-e-Faisal', city: 'Karachi', region: 'Sindh', postal: '75400', country: 'PK',
  lat: 24.8607, lng: 67.0011, hours: ['Mo-Fr 09:00-20:00', 'Sa 10:00-16:00'],
  image: 'https://karachitutors.pk/img/tutor-teaching-maths.svg',
  sameAs: ['https://www.facebook.com/karachitutors', 'https://www.instagram.com/karachitutors'],
};

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name, url: business.url, telephone: business.telephone, image: business.image,
  address: { '@type': 'PostalAddress', streetAddress: business.street, addressLocality: business.city,
             addressRegion: business.region, postalCode: business.postal, addressCountry: business.country },
  geo: { '@type': 'GeoCoordinates', latitude: business.lat, longitude: business.lng },
  openingHours: business.hours,
  sameAs: business.sameAs,
};

const faqs = [
  ['Do you offer online physics classes?', 'Yes. Online lessons use a shared whiteboard and weekly past-paper practice.'],
  ['Which areas of Karachi do you cover?', 'DHA, Clifton, Gulshan-e-Iqbal, PECHS and North Nazimabad, plus online lessons.'],
];
const faqPage = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const crumbs = [['Home', 'https://karachitutors.pk/'], ['Physics tuition', 'https://karachitutors.pk/physics-tuition.html']];
const breadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
};

// Minimal validation rules (a subset of Google's documentation)
const RULES = {
  LocalBusiness: { required: ['name', 'address'], recommended: ['telephone', 'url', 'geo', 'openingHours', 'image'] },
  FAQPage: { required: ['mainEntity'], recommended: [] },
  BreadcrumbList: { required: ['itemListElement'], recommended: [] },
};
function validate(obj) {
  const r = RULES[obj['@type']];
  const missingReq = r.required.filter(k => !obj[k]);
  const missingRec = r.recommended.filter(k => !obj[k]);
  const extra = obj['@type'] === 'BreadcrumbList' && obj.itemListElement.some((li, i) => li.position !== i + 1) ? ['positions not sequential'] : [];
  return `${obj['@type'].padEnd(15)} required ${missingReq.length ? 'MISSING ' + missingReq : 'ok'} · recommended ${missingRec.length ? 'missing ' + missingRec : 'all present'}${extra.length ? ' · ' + extra : ''}`;
}

for (const obj of [localBusiness, faqPage, breadcrumb]) console.log(validate(obj));
console.log('\n<script type="application/ld+json">');
console.log(JSON.stringify(localBusiness, null, 2));
console.log('</script>');
console.log(`\n(FAQPage: ${faqPage.mainEntity.length} questions · BreadcrumbList: ${breadcrumb.itemListElement.length} items – printed the same way)`);

const fields = { form_id: 'contact-2026', name: 'Ayesha Khan', email: 'ayesha@example.com', course: 'Front-end', time: 'evening' };
const query = new URLSearchParams(fields).toString();
console.log('GET  ->', 'https://example.com/contact?' + query);
console.log('POST body ->', query);
console.log('Decoded name:', new URLSearchParams(query).get('name'));

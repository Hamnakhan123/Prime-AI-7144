const results = [
  { name: 'Ali', html: 18, css: 15 },
  { name: 'Sara', html: 20, css: 19 },
  { name: 'Hamza', html: 14, css: 17 },
];
const rows = results.map(r =>
  `  <tr><th scope="row">${r.name}</th><td>${r.html}</td><td>${r.css}</td><td>${r.html + r.css}</td></tr>`);
const avg = (results.reduce((s, r) => s + r.html + r.css, 0) / results.length).toFixed(1);
console.log('<tbody>\n' + rows.join('\n') + '\n</tbody>');
console.log(`<tfoot><tr><td colspan="3">Class average</td><td>${avg}</td></tr></tfoot>`);

const page = 'https://prime.example.com/pages/about.html';
const links = ['contact.html', '../index.html', '../images/logo.png', '/css/site.css', '#team', 'https://mdn.dev'];

for (const href of links) {
  console.log(href.padEnd(20), '->', new URL(href, page).href);
}

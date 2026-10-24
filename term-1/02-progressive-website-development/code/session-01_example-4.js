const html = `<!DOCTYPE html><html><head><title>Hi</title></head>
<body><h1>Hello</h1><p>One <br> two</p><img src="a.png" alt="A"></body></html>`;

const tags = html.match(/<([a-z][a-z0-9]*)/g).map(t => t.slice(1));
const voidTags = ['br', 'img', 'hr', 'input', 'meta', 'link'];

console.log('Opening tags :', tags.join(', '));
console.log('Total        :', tags.length);
console.log('Standalone   :', tags.filter(t => voidTags.includes(t)).join(', '));

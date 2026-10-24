function specificity(sel) {
  const ids = (sel.match(/#[\w-]+/g) || []).length;
  const classes = (sel.match(/\.[\w-]+|\[[^\]]+\]|(?<!:):(?!:)[\w-]+/g) || []).length;
  const elements = (sel.replace(/#[\w-]+|\.[\w-]+|\[[^\]]+\]|(?<!:):(?!:)[\w-]+/g, ' ')
                       .match(/(^|[\s>+~])[a-z][\w-]*|::[\w-]+/g) || []).length;
  return [0, ids, classes, elements];
}
for (const s of ['p', '.intro p', '#main .intro p', 'nav a:hover', 'ul li::before', 'input[type="email"]:focus']) {
  console.log(s.padEnd(26), specificity(s).join(','));
}

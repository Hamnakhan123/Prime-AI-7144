const elements = [
  { tag: 'li', classes: ['featured'], index: 2 },
  { tag: 'li', classes: [], index: 1 },
  { tag: 'li', classes: [], index: 3 },
  { tag: 'p', classes: ['note'], index: 2 },
];
const isOdd = el => el.index % 2 === 1;

console.log('li            ->', elements.filter(e => e.tag === 'li').length, 'matches');
console.log('.featured     ->', elements.filter(e => e.classes.includes('featured')).length, 'match');
console.log('li:nth-child(odd) ->', elements.filter(e => e.tag === 'li' && isOdd(e)).map(e => e.index));

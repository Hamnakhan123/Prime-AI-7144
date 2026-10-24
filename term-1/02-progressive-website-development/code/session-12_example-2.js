const marks = [55, 72, 91, 68];
console.log('last:', marks.at(-1), '| second last:', marks.at(-2), '| last char:', 'Karachi'.at(-1));

const user = { name: 'Ali', settings: { volume: 0 } };
console.log('hasOwn name?', Object.hasOwn(user, 'name'), '| hasOwn toString?', Object.hasOwn(user, 'toString'));
console.log('city:', user.address?.city ?? 'unknown');
console.log('volume with ||:', user.settings.volume || 50, '| with ??:', user.settings.volume ?? 50);

const sorted = marks.toSorted((a, b) => a - b);       // ES2023: original untouched
console.log('sorted copy:', sorted, '| original:', marks);
console.log('last above 60:', marks.findLast(m => m > 60));

const students = [{ n: 'Ali', g: 'B' }, { n: 'Sara', g: 'A' }, { n: 'Zoya', g: 'A' }];
const byGrade = Object.groupBy(students, s => s.g);   // ES2024
console.log('grouped:', JSON.stringify(byGrade));

const m = /(\d{4})-(\d{2})/d.exec('Due: 2026-10');
console.log('match', m[0], 'at indices', m.indices[0]);

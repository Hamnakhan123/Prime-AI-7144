const course = 'Progressive Website Development';
let sessions = 16;
const isOnline = false;
let mentor;                        // undefined
const room = null;

console.log(typeof course, typeof sessions, typeof isOnline, typeof mentor, typeof room);
console.log(`${course} has ${sessions} sessions.`);

console.log('5' + 3, '5' - 3, Number('5') + 3);   // concatenation vs conversion
console.log(parseInt('42px'), Number('42px'), 0.1 + 0.2);
console.log('5' == 5, '5' === 5);                  // loose vs strict
console.log(Boolean(''), Boolean('0'), Boolean([]));
sessions += 1;
console.log('After += 1:', sessions);

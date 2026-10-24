function area(w, h = w) { return w * h; }
const perimeter = (w, h) => 2 * (w + h);
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);

console.log('area(5, 3) =', area(5, 3), '| square area(4) =', area(4));
console.log('perimeter(5, 3) =', perimeter(5, 3));
console.log('sum(1..5) =', sum(1, 2, 3, 4, 5));

function makeCounter() {          // closure: count lives on between calls
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); next();
console.log('counter is now', next());

function applyTwice(fn, value) { return fn(fn(value)); }   // fn is a callback
console.log('applyTwice(double, 3) =', applyTwice(n => n * 2, 3));

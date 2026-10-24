const day = 'Wed';
switch (day) {
  case 'Mon':
  case 'Wed':
    console.log(day, '-> HTML/CSS lab');
    break;
  case 'Fri':
    console.log(day, '-> JavaScript lab');
    break;
  default:
    console.log(day, '-> self-study');
}

let table = '';
for (let i = 1; i <= 5; i++) table += `7 x ${i} = ${7 * i}   `;
console.log(table);

let balance = 1000, months = 0;
while (balance < 2000) { balance *= 1.1; months++; }
console.log(`Savings double after ${months} months at 10%/month: Rs ${balance.toFixed(0)}`);

let tries = 0, roll;
do { roll = (tries * 7 + 3) % 6 + 1; tries++; } while (roll !== 6);   // deterministic "dice"
console.log(`Rolled a 6 after ${tries} tries`);

for (let n = 1; n <= 10; n++) {
  if (n % 2 === 0) continue;   // skip evens
  if (n > 7) break;            // stop after 7
  process.stdout.write(n + ' ');
}
console.log();

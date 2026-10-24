const students = [
  { name: 'Ali', marks: 45 }, { name: 'Sara', marks: 91 },
  { name: 'Hamza', marks: 78 }, { name: 'Zoya', marks: 62 },
];
const passed = students.filter(s => s.marks >= 50);
const names = passed.map(s => s.name);
const total = students.reduce((sum, s) => sum + s.marks, 0);
const topper = [...students].sort((a, b) => b.marks - a.marks)[0];

console.log('Passed:', names.join(', '));
console.log('Average:', (total / students.length).toFixed(1));
console.log('Topper:', topper.name, topper.marks);
console.log('Anyone above 90?', students.some(s => s.marks > 90));
console.log('Find Zoya:', students.find(s => s.name === 'Zoya'));

const seats = [['A1', 'A2', 'A3'], ['B1', 'B2', 'B3']];   // 2D array
for (let r = 0; r < seats.length; r++) {
  console.log(`Row ${r + 1}:`, seats[r].join(' '));
}
console.log('Seat at row 2, col 3:', seats[1][2]);

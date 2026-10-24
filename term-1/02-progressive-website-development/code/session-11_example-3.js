const student = {
  name: 'Sara', city: 'Karachi', marks: [88, 92, 79],
  average() { return this.marks.reduce((a, b) => a + b) / this.marks.length; },
};
console.log(`${student.name} average: ${student.average().toFixed(2)}`);

const { name, city, phone = 'not given' } = student;
console.log(name, city, phone);

const moved = { ...student, city: 'Lahore' };
console.log('original city:', student.city, '| copy city:', moved.city);

for (const [key, value] of Object.entries({ html: 18, css: 19 })) console.log(key, '=>', value);

const json = JSON.stringify({ name, marks: student.marks });
console.log('JSON text:', json);
console.log('Parsed back:', JSON.parse(json).marks.length, 'marks');

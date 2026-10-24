function grade(marks) {
  if (marks < 0 || marks > 100) return 'Invalid';
  if (marks >= 80) return 'A';
  else if (marks >= 65) return 'B';
  else if (marks >= 50) return 'C';
  else return 'F';
}
for (const m of [92, 71, 50, 34, 105]) {
  const g = grade(m);
  console.log(`${m} -> ${g} (${g === 'F' || g === 'Invalid' ? 'see your mentor' : 'well done'})`);
}

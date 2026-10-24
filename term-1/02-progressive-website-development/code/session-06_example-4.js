function resolve(tracks, container, gap) {
  const fixed = tracks.filter(t => t.endsWith('px')).reduce((s, t) => s + parseFloat(t), 0);
  const totalFr = tracks.filter(t => t.endsWith('fr')).reduce((s, t) => s + parseFloat(t), 0);
  const free = container - fixed - gap * (tracks.length - 1);
  return tracks.map(t => t.endsWith('px') ? parseFloat(t) : (parseFloat(t) / totalFr) * free);
}
const cols = resolve(['200px', '2fr', '1fr'], 1000, 20);
console.log('column widths:', cols.map(w => Math.round(w) + 'px').join(' | '));
console.log('check total  :', Math.round(cols.reduce((a, b) => a + b) + 40), 'px');

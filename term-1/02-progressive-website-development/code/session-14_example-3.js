function haversineKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371, rad = d => d * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
const me = [24.8615, 67.0099];                 // a user in Saddar, Karachi
const campuses = { Clifton: [24.8138, 67.0300], 'Gulshan-e-Iqbal': [24.9204, 67.0932], 'North Nazimabad': [24.9426, 67.0381] };

const ranked = Object.entries(campuses)
  .map(([name, pos]) => ({ name, km: haversineKm(me, pos) }))
  .sort((a, b) => a.km - b.km);
for (const c of ranked) console.log(c.name.padEnd(16), c.km.toFixed(1), 'km');
console.log('Nearest:', ranked[0].name);

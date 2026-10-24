const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fakeFetch(path) {               // pretend network call
  await wait(100);
  if (path === '/api/courses') return { ok: true, json: async () => [{ id: 1, title: 'HTML5' }, { id: 2, title: 'CSS3' }] };
  return { ok: false, status: 404 };
}

async function getJSON(path) {
  const res = await fakeFetch(path);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`, { cause: path });
  return res.json();
}

console.log('1. request sent');
const courses = await getJSON('/api/courses');            // top-level await (ES2022)
console.log('2. received:', courses.map(c => c.title).join(', '));

try {
  await getJSON('/api/missing');
} catch (e) {
  console.log('3. error:', e.message, '| cause:', e.cause);
}

const t0 = Date.now();
await Promise.all([wait(200), wait(200), wait(200)]);
console.log(`4. three 200 ms tasks in parallel took ~${Math.round((Date.now() - t0) / 100) * 100} ms`);

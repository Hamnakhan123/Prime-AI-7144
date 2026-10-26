// session-01_hash-object.js  (run: node session-01_hash-object.js)
// Recreates Git's blob hashing and compares with `git hash-object`.
const crypto = require('crypto');
const { execSync } = require('child_process');

function gitBlobHash(content) {
  const body = Buffer.from(content, 'utf8');
  const header = Buffer.from(`blob ${body.length}\0`, 'utf8');
  return crypto.createHash('sha1').update(Buffer.concat([header, body])).digest('hex');
}

const versions = [
  '<h1>Hello</h1>\n',
  '<h1>Hello</h1>\n',            // identical content
  '<h1>Hello!</h1>\n',           // one character added
];

for (const v of versions) {
  const ours = gitBlobHash(v);
  const gits = execSync('git hash-object --stdin', { input: v }).toString().trim();
  console.log(`${JSON.stringify(v).padEnd(22)} ours ${ours}  git ${gits}  ${ours === gits ? 'MATCH' : 'DIFFERENT'}`);
}
console.log('\nSame content → same hash. One extra "!" → a completely different hash.');

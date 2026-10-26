// session-05_srcset-chooser.js  (run: node session-05_srcset-chooser.js)
// Applies the srcset/sizes selection rule and compares data used with a single 1600px image.

const candidates = [            // [file width in px, approximate size in KB]
  [480, 45], [800, 110], [1200, 220], [1600, 360],
];
// sizes="(min-width: 992px) 50vw, 100vw"
const slotWidth = vw => (vw >= 992 ? vw * 0.5 : vw);

function choose(vw, dpr) {
  const needed = slotWidth(vw) * dpr;
  // smallest candidate that is at least as wide as needed; otherwise the largest
  return candidates.find(([w]) => w >= needed) ?? candidates.at(-1);
}

const devices = [
  ['Budget phone', 360, 2],
  ['iPhone-class phone', 390, 3],
  ['Tablet portrait', 768, 2],
  ['Laptop', 1366, 1],
  ['Desktop monitor', 1920, 1],
];

let saved = 0;
console.log('Device               viewport DPR  slot   needed  picks   KB   (single 1600w = 360 KB)');
for (const [name, vw, dpr] of devices) {
  const [w, kb] = choose(vw, dpr);
  saved += 360 - kb;
  console.log(`${name.padEnd(20)} ${String(vw).padStart(6)}px ${String(dpr).padStart(3)}  ${String(slotWidth(vw)).padStart(5)}  ${String(slotWidth(vw) * dpr).padStart(6)}  ${String(w + 'w').padStart(5)}  ${String(kb).padStart(4)}`);
}
console.log(`\nTotal saved across these 5 visits: ${saved} KB (${Math.round((saved / (360 * devices.length)) * 100)}% less data)`);

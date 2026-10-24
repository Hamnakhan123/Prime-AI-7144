const clamp = (min, val, max) => Math.min(Math.max(val, min), max);
for (const vw of [320, 480, 768, 1024, 1440, 1920]) {
  const preferred = 16 + 0.05 * vw;              // 1rem + 5vw
  const size = clamp(32, preferred, 72);         // 2rem .. 4.5rem
  console.log(`${String(vw).padStart(4)}px wide -> ${size.toFixed(1)}px`);
}

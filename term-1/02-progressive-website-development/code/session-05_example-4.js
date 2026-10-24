const candidates = [400, 800, 1600];
function pick(cssWidth, dpr) {
  const needed = cssWidth * dpr;
  return candidates.find(w => w >= needed) ?? candidates.at(-1);
}
for (const [w, dpr] of [[360, 2], [768, 1], [1280, 1], [1440, 2]]) {
  console.log(`screen ${w}px @${dpr}x -> needs ${w * dpr}px -> downloads hero-${pick(w, dpr)}.jpg`);
}

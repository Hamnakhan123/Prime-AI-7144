// session-01_grid-calculator.js
// Re-implements Bootstrap 5's mobile-first column rule in plain JavaScript.
// Run: node session-01_grid-calculator.js

const BREAKPOINTS = [            // [name, min-width in px, .container max-width]
  ['xs', 0, null],
  ['sm', 576, 540],
  ['md', 768, 720],
  ['lg', 992, 960],
  ['xl', 1200, 1140],
  ['xxl', 1400, 1320],
];
const GUTTER = 24;               // default horizontal gutter is 1.5rem = 24px

// Which breakpoint is active for a given viewport width?
function activeBreakpoint(width) {
  return BREAKPOINTS.filter(([, min]) => width >= min).at(-1);
}

// Width of the .container content box at this viewport width
function containerWidth(width) {
  const [, , max] = activeBreakpoint(width);
  return max ?? width;           // xs: 100% of the screen
}

// Parse "col-12 col-md-6 col-lg-4" into {xs:12, md:6, lg:4}
function parseCols(classList) {
  const spans = {};
  for (const cls of classList.split(/\s+/)) {
    const m = cls.match(/^col(?:-(sm|md|lg|xl|xxl))?(?:-(\d+))?$/);
    if (m) spans[m[1] ?? 'xs'] = m[2] ? Number(m[2]) : 'auto-equal';
  }
  return spans;
}

// Mobile-first: walk up the breakpoints and keep the last span that applies
function spanAt(spans, width) {
  let span = 12;                 // no class at all = full width (stacked)
  for (const [name, min] of BREAKPOINTS) {
    if (width >= min && spans[name] !== undefined) span = spans[name];
  }
  return span;
}

function report(classList, widths) {
  const spans = parseCols(classList);
  console.log(`\nclass="${classList}"`);
  for (const w of widths) {
    const [bp] = activeBreakpoint(w);
    const span = spanAt(spans, w);
    const inner = containerWidth(w) - GUTTER;   // row content width after container padding
    const px = span === 'auto-equal' ? 'shares space' : `${Math.round((inner * span) / 12)}px`;
    console.log(`  viewport ${String(w).padStart(4)}px  bp=${bp.padEnd(3)}  span=${String(span).padStart(2)}/12  ≈ ${px}`);
  }
}

const widths = [375, 600, 800, 1024, 1280, 1440];
report('col-12 col-md-6 col-lg-4', widths);
report('col-6 col-xl-3', widths);
report('col-md-8', [375, 800, 1440]);

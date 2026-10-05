// Accessibility gate (WCAG 2.2 AA), run as part of `npm run lint`.
// 1. Structural rules over the web app's source (no browser needed).
// 2. Contrast ratios recomputed from the design tokens for every text and control pairing the page uses.
// It is a regression gate, not an audit: it cannot judge wording, reading order or real screen-reader
// behaviour, so a green run does not mean the site is accessible.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const WEB = join(ROOT, 'apps/web');
const SRC = join(WEB, 'src');
const problems = [];
const fail = (where, message) => problems.push(`${where}: ${message}`);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (/\.(tsx|ts|css)$/.test(path)) yield path;
  }
}

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

// ---------- 1. Structure ----------
const html = readFileSync(join(WEB, 'index.html'), 'utf8');
if (!/<html[^>]*\blang="[a-z-]+"/i.test(html)) fail('apps/web/index.html', 'the <html> element has no lang (3.1.1)');
const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
if (title.length === 0) fail('apps/web/index.html', 'the page has no <title> (2.4.2)');

let files = 0;
let controls = 0;
for (const file of walk(SRC)) {
  files += 1;
  const rel = relative(ROOT, file);
  const text = readFileSync(file, 'utf8');
  const isStyle = file.endsWith('.css');

  if (!isStyle) {
    controls += (text.match(/<(button|input|a)\b/g) ?? []).length + (text.match(/<Button\b/g) ?? []).length;

    for (const m of text.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt=/.test(m[0])) fail(`${rel}:${lineOf(text, m.index)}`, '<img> without alt (1.1.1)');
    }
    for (const m of text.matchAll(/tabIndex=\{\s*[1-9]/g)) {
      fail(`${rel}:${lineOf(text, m.index)}`, 'positive tabIndex changes focus order (2.4.3)');
    }
    for (const m of text.matchAll(/<(div|span)\b[^>]*\bonClick=/g)) {
      fail(`${rel}:${lineOf(text, m.index)}`, 'click handler on a div or span; use a button or link (2.1.1)');
    }
    for (const m of text.matchAll(/<svg\b[^>]*>/g)) {
      const hiddenHere = /aria-hidden|role="presentation"/.test(m[0]);
      // Props spread from a shared object (`<svg {...common}>`) count when that object sets aria-hidden.
      const hiddenBySpread = /\{\.\.\./.test(m[0]) && /'aria-hidden':\s*true|aria-hidden:\s*true/.test(text);
      const named = /<title/.test(text.slice(m.index, m.index + 200));
      if (!hiddenHere && !hiddenBySpread && !named) {
        fail(`${rel}:${lineOf(text, m.index)}`, '<svg> is neither hidden nor named (1.1.1)');
      }
    }
    for (const m of text.matchAll(/<input\b[^>]*>/g)) {
      const labelled = /aria-label=|aria-labelledby=/.test(m[0]) || /htmlFor=/.test(text);
      if (!labelled) fail(`${rel}:${lineOf(text, m.index)}`, '<input> has no label (1.3.1, 4.1.2)');
    }
  } else {
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (/outline\s*:\s*(none|0)\b/.test(line)) {
        // Allowed only on the non-interactive <main> landmark that skip links focus.
        const selector = lines.slice(Math.max(0, i - 3), i).reverse().find((l) => l.includes('{')) ?? '';
        if (!selector.includes('.page:focus')) fail(`${rel}:${i + 1}`, 'outline removed without a replacement (2.4.7)');
      }
    });
  }
}

const app = readFileSync(join(SRC, 'App.tsx'), 'utf8');
if (!/href="#main"/.test(app) || !/id="main"/.test(app)) fail('apps/web/src/App.tsx', 'no skip link to <main id="main"> (2.4.1)');
if (!/<main\b/.test(app) || !/<footer|SiteFooter/.test(app) || !/SiteNav/.test(app)) {
  fail('apps/web/src/App.tsx', 'the page needs header/nav, main and footer landmarks (1.3.1)');
}
if (!/:focus-visible/.test(readFileSync(join(SRC, 'styles.css'), 'utf8'))) {
  fail('apps/web/src/styles.css', 'no :focus-visible style (2.4.7)');
}
if (files === 0 || controls === 0) fail('check-a11y', `scanned ${files} files and ${controls} controls: the gate checked nothing`);

// ---------- 2. Contrast, from the tokens ----------
const tokens = readFileSync(join(SRC, 'styles/tokens.css'), 'utf8');
const hex = (name) => {
  const value = tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1];
  if (value === undefined) throw new Error(`token ${name} is not a #rrggbb value`);
  return [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
};
const rgba = (name) => {
  const m = tokens.match(new RegExp(`${name}:\\s*rgb\\(\\s*(\\d+)\\s+(\\d+)\\s+(\\d+)\\s*/\\s*([\\d.]+)\\s*\\)`));
  if (m === null) throw new Error(`token ${name} is not rgb(r g b / a)`);
  return { rgb: [Number(m[1]), Number(m[2]), Number(m[3])], alpha: Number(m[4]) };
};
const over = (top, bottom) => bottom.map((c, i) => Math.round(top.rgb[i] * top.alpha + c * (1 - top.alpha)));
const luminance = ([r, g, b]) => {
  const f = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const bg = hex('--color-bg');
const raised = hex('--color-bg-raised');
const sunken = hex('--color-bg-sunken');
const text = hex('--color-text');
const accent = hex('--color-accent');
const onAccent = hex('--color-accent-contrast');
const inputBorder = over(rgba('--color-border-strong'), sunken);
const cardBorder = over(rgba('--color-border-strong'), bg);

const checks = [
  ['text on page', text, bg, 4.5],
  ['muted text on page', hex('--color-text-muted'), bg, 4.5],
  ['muted text on the sunken surface', hex('--color-text-muted'), sunken, 4.5],
  ['muted text on raised surfaces', hex('--color-text-muted'), raised, 4.5],
  ['text on raised surfaces', text, raised, 4.5],
  ['signal colour (links, focus) on page', accent, bg, 4.5],
  ['signal colour on the sunken surface', accent, sunken, 4.5],
  ['signal colour on raised surfaces', accent, raised, 4.5],
  ['button text on the signal colour', onAccent, accent, 4.5],
  ['dark text on ivory fills (pressed chips, your messages)', onAccent, text, 4.5],
  ['input border on its field (1.4.11)', inputBorder, sunken, 3],
  ['control borders on page (1.4.11)', cardBorder, bg, 3],
];
for (const name of ['--color-accent', '--color-accent-2', '--color-accent-3', '--color-accent-4', '--color-accent-5']) {
  checks.push([`category colour ${name} as text on page`, hex(name), bg, 4.5]);
  checks.push([`category colour ${name} as text on raised surfaces`, hex(name), raised, 4.5]);
  checks.push([`dark text on category colour ${name} (selected tool)`, onAccent, hex(name), 4.5]);
}
for (const [label, fg, back, need] of checks) {
  const r = ratio(fg, back);
  const line = `${label}: ${r.toFixed(2)}:1 (needs ${need}:1)`;
  if (r < need) fail('contrast', line);
  else if (process.env.A11Y_VERBOSE) console.log(`  ok  ${line}`);
}

if (problems.length > 0) {
  for (const p of problems) console.error(`check-a11y: ${p}`);
  console.error(`check-a11y: ${problems.length} problem(s)`);
  process.exit(1);
}
console.log(`check-a11y: ${files} files, ${controls} controls, ${checks.length} contrast pairs: no problems`);

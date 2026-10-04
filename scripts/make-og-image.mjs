// Builds the 1200x630 link-preview image (apps/web/public/og-image.png) from the design tokens and
// the self-hosted fonts, using Microsoft Edge or Chrome in headless mode (no extra dependency).
// Run: node scripts/make-og-image.mjs   (set BROWSER_PATH if the browser is somewhere unusual)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'apps/web/public/og-image.png');

const candidates = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const browser = candidates.find((path) => existsSync(path));
if (browser === undefined) {
  console.error('make-og-image: no Edge or Chrome found; set BROWSER_PATH');
  process.exit(1);
}

const tokens = readFileSync(join(root, 'apps/web/src/styles/tokens.css'), 'utf8');
const token = (name) => tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))?.[1] ?? '#ffffff';
const color = {
  bg: token('--color-bg'),
  text: token('--color-text'),
  muted: token('--color-text-muted'),
  accent: token('--color-accent'),
  accent2: token('--color-accent-2'),
};

const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(join(root, `node_modules/@fontsource-variable/${pkg}/files/${file}`)).toString('base64')}`;
const grotesk = font('space-grotesk', 'space-grotesk-latin-wght-normal.woff2');
const mono = font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2');
const inter = font('inter', 'inter-latin-wght-normal.woff2');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: G; src: url(${grotesk}) format('woff2'); font-weight: 300 700; }
@font-face { font-family: M; src: url(${mono}) format('woff2'); font-weight: 100 800; }
@font-face { font-family: I; src: url(${inter}) format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; background: ${color.bg}; }
body { position: relative; font-family: I, sans-serif; color: ${color.text}; }
.glow1 { position: absolute; inset: 0; background: radial-gradient(620px 460px at 82% 45%, ${color.accent}40, transparent 70%); }
.glow2 { position: absolute; inset: 0; background: radial-gradient(700px 420px at 40% -10%, ${color.accent2}33, transparent 70%); }
.copy { position: absolute; left: 80px; top: 0; bottom: 0; width: 640px; display: flex; flex-direction: column; justify-content: center; gap: 22px; }
.eyebrow { font: 500 22px M, monospace; letter-spacing: 0.2em; text-transform: uppercase; color: ${color.accent}; }
.name { font: 700 118px/1 G, sans-serif; letter-spacing: -0.03em; }
.role { font: 500 44px G, sans-serif; letter-spacing: 0.08em; color: ${color.accent}; }
.tag { font: 400 30px/1.35 I, sans-serif; color: ${color.muted}; max-width: 560px; text-wrap: balance; }
.place { font: 500 20px M, monospace; letter-spacing: 0.12em; color: ${color.muted}; }
svg { position: absolute; right: 40px; top: 35px; width: 560px; height: 560px; }
.ring { fill: none; stroke: ${color.accent}; stroke-width: 1.2; }
.ring2 { fill: none; stroke: ${color.accent2}; stroke-width: 1.2; }
</style></head><body>
<div class="glow1"></div><div class="glow2"></div>
<div class="copy">
  <div class="eyebrow">Quality Engineering Lab</div>
  <div class="name">THANISHQ</div>
  <div class="role">QA × AUTOMATION</div>
  <div class="tag">Making software reliable, release after release.</div>
  <div class="place">HYDERABAD · INDIA</div>
</div>
<svg viewBox="-120 -120 240 240">
  <defs><radialGradient id="g"><stop offset="0" stop-color="${color.accent}" stop-opacity=".95"/><stop offset=".45" stop-color="${color.accent}" stop-opacity=".25"/><stop offset="1" stop-color="${color.accent}" stop-opacity="0"/></radialGradient></defs>
  <circle r="100" fill="url(#g)"/>
  <circle class="ring" r="98" opacity=".7"/><circle class="ring2" r="80" opacity=".8"/>
  <polygon class="ring" points="0,-62 54,-31 54,31 0,62 -54,31 -54,-31" opacity=".8"/>
  <polygon class="ring2" points="0,-34 29,-17 29,17 0,34 -29,17 -29,-17" opacity=".9"/>
  <circle r="12" fill="${color.accent}"/>
</svg>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'awi-og-'));
const page = join(dir, 'og.html');
writeFileSync(page, html);
try {
  execFileSync(
    browser,
    ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${out}`, pathToFileURL(page).href],
    { stdio: 'ignore', timeout: 60000 },
  );
} finally {
  rmSync(dir, { recursive: true, force: true });
}

const png = readFileSync(out);
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
console.log(`make-og-image: wrote ${out} (${width}x${height}, ${(png.length / 1024).toFixed(0)} KB)`);
if (width !== 1200 || height !== 630) process.exit(1);

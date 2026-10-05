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
  field: token('--color-accent'),
  text: token('--color-on-field'),
  muted: token('--color-on-field-muted'),
  line: token('--scene-line'),
  line2: token('--scene-line-2'),
  heart: token('--scene-heart'),
};

const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(join(root, `node_modules/@fontsource-variable/${pkg}/files/${file}`)).toString('base64')}`;
const display = font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2');
const body = font('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: D; src: url(${display}) format('woff2'); font-weight: 200 800; }
@font-face { font-family: B; src: url(${body}) format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; overflow: hidden; background: ${color.field}; }
body { position: relative; font-family: B, sans-serif; color: ${color.text}; }
.copy { position: absolute; left: 80px; top: 0; bottom: 0; width: 640px; display: flex; flex-direction: column; justify-content: flex-end; gap: 20px; padding-bottom: 84px; }
.name { font: 700 96px/0.94 D, sans-serif; letter-spacing: -0.04em; }
.role { font: 600 38px D, sans-serif; letter-spacing: -0.01em; }
.tag { font: 400 28px/1.35 B, sans-serif; color: ${color.muted}; max-width: 520px; }
svg { position: absolute; right: 40px; top: 65px; width: 500px; height: 500px; }
.ring { fill: none; stroke: ${color.line}; stroke-width: 1.2; }
.ring2 { fill: none; stroke: ${color.line2}; stroke-width: 1.2; }
</style></head><body>
<div class="copy">
  <div class="name">Sri Thanishq Manda</div>
  <div class="role">QA and automation engineer</div>
  <div class="tag">Making software reliable, release after release.</div>
</div>
<svg viewBox="-120 -120 240 240">
  <circle class="ring" r="98" opacity=".85"/><circle class="ring2" r="80"/>
  <polygon class="ring" points="0,-62 54,-31 54,31 0,62 -54,31 -54,-31"/>
  <polygon class="ring2" points="0,-34 29,-17 29,17 0,34 -29,17 -29,-17"/>
  <circle r="12" fill="${color.heart}"/>
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

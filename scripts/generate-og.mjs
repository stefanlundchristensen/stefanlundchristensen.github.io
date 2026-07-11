import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import wawoff2 from 'wawoff2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const cacheDir = path.join(__dirname, '.fonts');
mkdirSync(cacheDir, { recursive: true });

async function woff2ToTtf(woff2Path, outName) {
  const woff2Buf = readFileSync(woff2Path);
  const ttfBuf = await wawoff2.decompress(woff2Buf);
  const outPath = path.join(cacheDir, outName);
  writeFileSync(outPath, Buffer.from(ttfBuf));
  return outPath;
}

const fraunces = await woff2ToTtf(
  path.join(root, 'node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2'),
  'fraunces.ttf',
);
const inter = await woff2ToTtf(
  path.join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  'inter.ttf',
);
const interExt = await woff2ToTtf(
  path.join(root, 'node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2'),
  'inter-ext.ttf',
);

const fontOptions = {
  fontFiles: [fraunces, inter, interExt],
  loadSystemFonts: false,
};

function renderPng(svg, outPath) {
  const resvg = new Resvg(svg, {
    font: fontOptions,
    background: '#f5f3ee',
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngBuffer = resvg.render().asPng();
  writeFileSync(outPath, pngBuffer);
  console.log(`Generated: ${path.relative(root, outPath)} (${pngBuffer.length} bytes)`);
}

function escapeXml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

// ---------------------------------------------------------------------------
// Default site-wide card
// ---------------------------------------------------------------------------

const defaultSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f3ee"/>
  <text x="80" y="200" font-family="Fraunces" font-size="84" font-weight="500" letter-spacing="-2" fill="#1a1a1a">Stefan Christensen</text>
  <text x="80" y="252" font-family="Inter" font-size="28" font-weight="500" fill="rgba(26,26,26,0.72)">SVP Product &amp; Engineering · Pleo</text>
  <line x1="80" y1="306" x2="164" y2="306" stroke="#c2410c" stroke-width="3"/>
  <text x="80" y="362" font-family="Inter" font-size="18" font-weight="500" letter-spacing="0.9" fill="rgba(26,26,26,0.62)">5–15 MARKETS  ·  3× THROUGHPUT  ·  70% SCHEME COST  ·  20 PTS MARGIN</text>
  <text x="1120" y="595" font-family="Inter" font-size="14" font-weight="400" fill="rgba(26,26,26,0.5)" text-anchor="end">stefanchristensen.me</text>
</svg>`;

renderPng(defaultSvg, path.join(root, 'public/og-default.png'));

// ---------------------------------------------------------------------------
// Per-post cards (published posts only)
// ---------------------------------------------------------------------------

function wrapTitle(title, maxChars) {
  const words = title.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if (line && (line + ' ' + word).length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function postSvg({ title, category }) {
  // Scale type to title length so long titles still fit four lines.
  let fontSize = 68;
  let maxChars = 28;
  if (title.length > 45) { fontSize = 56; maxChars = 34; }
  if (title.length > 90) { fontSize = 46; maxChars = 42; }
  const lines = wrapTitle(title, maxChars).slice(0, 4);
  const lineHeight = fontSize * 1.14;
  const titleStartY = 250;
  const titleLines = lines
    .map((l, i) => `<text x="80" y="${Math.round(titleStartY + i * lineHeight)}" font-family="Fraunces" font-size="${fontSize}" font-weight="500" letter-spacing="-1" fill="#1a1a1a">${escapeXml(l)}</text>`)
    .join('\n  ');

  const kicker = category
    ? `<text x="80" y="158" font-family="Inter" font-size="20" font-weight="600" letter-spacing="2.4" fill="#c2410c">${escapeXml(category.toUpperCase())}</text>`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f3ee"/>
  ${kicker}
  <line x1="80" y1="182" x2="164" y2="182" stroke="#c2410c" stroke-width="3"/>
  ${titleLines}
  <text x="80" y="566" font-family="Fraunces" font-size="26" font-weight="500" letter-spacing="-0.5" fill="rgba(26,26,26,0.85)">Stefan Christensen</text>
  <text x="1120" y="566" font-family="Inter" font-size="16" font-weight="400" fill="rgba(26,26,26,0.5)" text-anchor="end">stefanchristensen.me</text>
</svg>`;
}

function parseFrontmatter(md) {
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const body = fm[1];
  const title = body.match(/^title:\s*["'](.*)["']\s*$/m)?.[1];
  const draft = /^draft:\s*true\s*$/m.test(body);
  const category = body.match(/^categories:\s*\[\s*["']([^"']+)["']/m)?.[1];
  return { title, draft, category };
}

const postsDir = path.join(root, 'src/content/posts');
const ogDir = path.join(root, 'public/og');
mkdirSync(ogDir, { recursive: true });

for (const file of readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
  const meta = parseFrontmatter(readFileSync(path.join(postsDir, file), 'utf8'));
  if (!meta?.title) {
    console.warn(`Skipped (no title parsed): ${file}`);
    continue;
  }
  if (meta.draft) continue;
  const slug = file.replace(/\.md$/, '');
  renderPng(postSvg(meta), path.join(ogDir, `${slug}.png`));
}

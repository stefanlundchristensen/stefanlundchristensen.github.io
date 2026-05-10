import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f5f3ee"/>
  <text x="80" y="200" font-family="Fraunces" font-size="84" font-weight="500" letter-spacing="-2" fill="#1a1a1a">Stefan Christensen</text>
  <text x="80" y="252" font-family="Inter" font-size="28" font-weight="500" fill="rgba(26,26,26,0.72)">SVP Product &amp; Engineering · Pleo</text>
  <line x1="80" y1="306" x2="164" y2="306" stroke="#c2410c" stroke-width="3"/>
  <text x="80" y="362" font-family="Inter" font-size="18" font-weight="500" letter-spacing="0.9" fill="rgba(26,26,26,0.62)">5–15 MARKETS  ·  3× THROUGHPUT  ·  70% SCHEME COST  ·  70+ TEAM</text>
  <text x="1120" y="595" font-family="Inter" font-size="14" font-weight="400" fill="rgba(26,26,26,0.5)" text-anchor="end">stefanchristensen.me</text>
</svg>`;

const resvg = new Resvg(svg, {
  font: {
    fontFiles: [fraunces, inter, interExt],
    loadSystemFonts: false,
  },
  background: '#f5f3ee',
  fitTo: { mode: 'width', value: 1200 },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();
const outPath = path.join(root, 'public/og-default.png');
writeFileSync(outPath, pngBuffer);
console.log(`Generated: ${outPath} (${pngBuffer.length} bytes)`);

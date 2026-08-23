import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import wawoff2 from 'wawoff2';

// PNG fallbacks for the SVG favicon: Google wants a raster >= 48px, and iOS
// ignores SVG for the home-screen icon. Same font pipeline as generate-og.mjs.

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

const svg = readFileSync(path.join(root, 'public/favicon.svg'), 'utf8');

function renderPng(size, outPath, background) {
  const resvg = new Resvg(svg, {
    font: { fontFiles: [fraunces], loadSystemFonts: false },
    background,
    fitTo: { mode: 'width', value: size },
  });
  const pngBuffer = resvg.render().asPng();
  writeFileSync(outPath, pngBuffer);
  console.log(`Generated: ${path.relative(root, outPath)} (${pngBuffer.length} bytes)`);
}

// Tab icon stays transparent like the SVG; the touch icon gets the site
// background because iOS composites onto black.
renderPng(96, path.join(root, 'public/favicon-96.png'), undefined);
renderPng(180, path.join(root, 'public/apple-touch-icon.png'), '#f5f3ee');

import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import wawoff2 from 'wawoff2';
import { composeOgCard } from '../src/lib/visuals/ogcard.mjs';
import { renderVisual } from '../src/lib/visuals/render.mjs';
import { analyze } from '../src/lib/visuals/structure.mjs';
import { LIGHT } from '../src/lib/visuals/palette.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const checkMode = process.argv.includes('--check');
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

const mismatches = [];

function renderPng(svg, outPath) {
  const resvg = new Resvg(svg, {
    font: fontOptions,
    background: '#f5f3ee',
    fitTo: { mode: 'width', value: 1200 },
  });
  const pngBuffer = resvg.render().asPng();
  const relativePath = path.relative(root, outPath);

  if (checkMode) {
    if (!existsSync(outPath)) {
      mismatches.push(`missing ${relativePath}`);
      return;
    }

    const current = readFileSync(outPath);
    if (!current.equals(pngBuffer)) {
      mismatches.push(`stale ${relativePath}`);
      return;
    }

    console.log(`Fresh: ${relativePath}`);
    return;
  }

  writeFileSync(outPath, pngBuffer);
  console.log(`Generated: ${relativePath} (${pngBuffer.length} bytes)`);
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
// Per-post cards
// ---------------------------------------------------------------------------

// The card layout and the mark both come from src/lib/visuals, so the PNGs
// stay in step with what the site renders. resvg cannot resolve CSS custom
// properties, so this path passes the explicit LIGHT palette.
function postSvg({ title, category, body }) {
  return composeOgCard({ title, category }, LIGHT, {
    mark: (w, h) =>
      renderVisual({ title, structure: analyze(body) }, { palette: LIGHT, width: w, height: h }),
  });
}

function parseFrontmatter(md) {
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return null;
  const head = fm[1];
  // Quotes optional: an unquoted title used to fail the match and the post was
  // skipped with only a console warning.
  const raw = head.match(/^title:\s*(.+?)\s*$/m)?.[1];
  const title = raw?.replace(/^["'](.*)["']$/, '$1');
  const draft = /^draft:\s*true\s*$/m.test(head);
  const category = head.match(/^categories:\s*\[\s*["']([^"']+)["']/m)?.[1];
  return { title, draft, category, body: md.slice(fm[0].length) };
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
  if (checkMode && meta.draft) continue;

  // Generation mode writes draft cards too. The post page emits og:image for
  // whatever it builds, so skipping drafts meant any post going live without a
  // re-run pointed at a 404 with no fallback.
  const slug = file.replace(/\.md$/, '');
  renderPng(postSvg(meta), path.join(ogDir, `${slug}.png`));
}

if (checkMode) {
  if (mismatches.length > 0) {
    console.error('OG assets are missing or stale:');
    for (const mismatch of mismatches) console.error(`- ${mismatch}`);
    console.error('Run `npm run og` and commit the refreshed assets.');
    process.exit(1);
  }

  console.log('OG assets are fresh for the site default card and published posts.');
}

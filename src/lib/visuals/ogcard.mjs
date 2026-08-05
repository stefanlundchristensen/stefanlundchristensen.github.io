/**
 * OG card composition — the original generate-og.mjs layout with a full-bleed
 * right third carved out for the mark, and the title measure narrowed to suit.
 *
 * Kept free of resvg and DOM specifics so the same function serves the PNG
 * script and any browser preview.
 */

import { escapeXml } from './format.mjs';

const DISPLAY = 'Fraunces Variable, Fraunces, Georgia, serif';
const BODY = 'Inter Variable, Inter, -apple-system, sans-serif';

export const OG_W = 1200;
export const OG_H = 630;

/** Give an already-rendered mark an origin so it can nest inside another SVG. */
export function embed(markSvg, x, y) {
  return markSvg.replace('<svg ', `<svg x="${x}" y="${y}" `);
}

export function wrapTitle(title, maxChars) {
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

/**
 * @param {{title: string, category?: string}} spec
 * @param {import('./palette.mjs').Palette} P
 * @param {{mark?: (w: number, h: number) => string}} opts
 *   `mark` receives the region size and returns an SVG string.
 */
export function composeOgCard(spec, P, opts = {}) {
  // Title steps down as it lengthens, against the 620px measure the mark leaves.
  const steps = [
    { max: 40, size: 60, chars: 22 },
    { max: 80, size: 50, chars: 27 },
    { max: Infinity, size: 42, chars: 33 },
  ];
  const step = steps.find((s) => spec.title.length <= s.max);
  const lines = wrapTitle(spec.title, step.chars).slice(0, 4);
  const lineHeight = step.size * 1.14;
  const titleStartY = 250;

  const parts = [`<rect width="${OG_W}" height="${OG_H}" fill="${P.bg}"/>`];

  if (opts.mark) {
    parts.push(embed(opts.mark(440, OG_H), 760, 0));
    parts.push(`<line x1="760" y1="0" x2="760" y2="${OG_H}" stroke="${P.ink(0.12)}" stroke-width="1"/>`);
  }

  if (spec.category) {
    parts.push(
      `<text x="80" y="158" font-family="${BODY}" font-size="20" font-weight="600" letter-spacing="2.4" fill="${P.accent}">${escapeXml(spec.category.toUpperCase())}</text>`,
    );
  }
  parts.push(`<line x1="80" y1="182" x2="164" y2="182" stroke="${P.accent}" stroke-width="3"/>`);

  lines.forEach((l, i) => {
    parts.push(
      `<text x="80" y="${Math.round(titleStartY + i * lineHeight)}" font-family="${DISPLAY}" font-size="${step.size}" font-weight="500" letter-spacing="-1" fill="${P.ink(1)}">${escapeXml(l)}</text>`,
    );
  });

  parts.push(
    `<text x="80" y="566" font-family="${DISPLAY}" font-size="26" font-weight="500" letter-spacing="-0.5" fill="${P.ink(0.85)}">Stefan Christensen</text>`,
    `<text x="680" y="566" font-family="${BODY}" font-size="16" fill="${P.ink(0.5)}" text-anchor="end">stefanchristensen.me</text>`,
  )

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">${parts.join('')}</svg>`;
}

/**
 * OG card composition — the existing scripts/generate-og.mjs layout with a
 * region carved out for the mark.
 *
 * Two placements are previewed in the lab because it is a real design choice:
 *  - 'panel': full-bleed right third, text column narrows to 620px
 *  - 'band':  full-width strip along the bottom, text keeps its current measure
 *
 * Kept free of resvg/DOM specifics so both the lab and the PNG script can use it.
 */

import { escapeXml } from './rand.mjs';

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
 * @param {{placement?: 'panel'|'band', mark?: (w: number, h: number) => string}} opts
 *   `mark` receives the region size and returns an SVG string.
 */
export function composeOgCard(spec, P, opts = {}) {
  const placement = opts.placement ?? 'panel';
  const panel = placement === 'panel';

  // Text scales to the measure available, which the mark placement decides.
  const steps = panel
    ? [
        { max: 40, size: 60, chars: 22 },
        { max: 80, size: 50, chars: 27 },
        { max: Infinity, size: 42, chars: 33 },
      ]
    : [
        { max: 45, size: 66, chars: 28 },
        { max: 90, size: 54, chars: 34 },
        { max: Infinity, size: 46, chars: 41 },
      ];
  const step = steps.find((s) => spec.title.length <= s.max);
  const lines = wrapTitle(spec.title, step.chars).slice(0, 4);
  const lineHeight = step.size * 1.14;
  const titleStartY = panel ? 250 : 236;

  const parts = [`<rect width="${OG_W}" height="${OG_H}" fill="${P.bg}"/>`];

  if (opts.mark) {
    if (panel) {
      parts.push(embed(opts.mark(440, OG_H), 760, 0));
      parts.push(`<line x1="760" y1="0" x2="760" y2="${OG_H}" stroke="${P.ink(0.12)}" stroke-width="1"/>`);
    } else {
      parts.push(embed(opts.mark(OG_W, 190), 0, OG_H - 190));
      parts.push(
        `<line x1="0" y1="${OG_H - 190}" x2="${OG_W}" y2="${OG_H - 190}" stroke="${P.ink(0.12)}" stroke-width="1"/>`,
      );
    }
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

  // Footer sits above the band when the mark takes the bottom strip.
  const footY = panel ? 566 : 400;
  parts.push(
    `<text x="80" y="${footY}" font-family="${DISPLAY}" font-size="26" font-weight="500" letter-spacing="-0.5" fill="${P.ink(0.85)}">Stefan Christensen</text>`,
  );
  if (panel) {
    parts.push(
      `<text x="680" y="${footY}" font-family="${BODY}" font-size="16" fill="${P.ink(0.5)}" text-anchor="end">stefanchristensen.me</text>`,
    );
  } else {
    parts.push(
      `<text x="1120" y="${footY}" font-family="${BODY}" font-size="16" fill="${P.ink(0.5)}" text-anchor="end">stefanchristensen.me</text>`,
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">${parts.join('')}</svg>`;
}

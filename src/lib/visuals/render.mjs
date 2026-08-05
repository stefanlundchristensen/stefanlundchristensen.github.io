/**
 * Post marks — proof marks.
 *
 * An implied column of type, faint and deliberately saying nothing, with the
 * post's structure written in the margin the way an editor marks a proof:
 * a rule where each section opens, a longer clay one at the spine, and clay
 * wherever the prose turns numerate.
 *
 * Two properties this has that earlier attempts didn't:
 *
 *  - Nothing is random. Every dimension is a function of the post's own
 *    structure (see structure.mjs), so two posts differ visually exactly as
 *    much as they differ structurally, and a mark changes when the post is
 *    edited. Hash-seeded variation all comes from one distribution, which is
 *    what made earlier rounds read as monotone.
 *  - Nothing is plotted from a shared origin. The margin marks and the text
 *    column start at different edges and vary in more than one property at
 *    once, which is what keeps it from reading as a bar chart.
 *
 * One function serves every size: post hero, listing thumbnail, OG panel and
 * inline divider. Composition is expressed as fractions of the frame, so it
 * reflows across aspect ratios rather than being cropped.
 */

import { n } from './format.mjs';
import { analyze, spineIndex } from './structure.mjs';

/**
 * @typedef {object} Spec
 * @property {string} [title]
 * @property {import('./structure.mjs').Structure} [structure]
 * @property {string} [body] raw markdown, parsed if `structure` is absent
 *
 * @typedef {object} Options
 * @property {import('./palette.mjs').Palette} palette
 * @property {number} width
 * @property {number} height
 * @property {'full'|'reduced'} [detail]
 * @property {number} [inset] horizontal padding as a fraction of width. The
 *   post hero passes 0 so the marks align flush with the text column; the
 *   thumbnail and OG panel keep the default so they breathe inside their frame.
 */

/** Below this the fine detail is dropped rather than shrunk into mud. */
const REDUCED_BELOW = 150;

function structureOf(spec) {
  return spec.structure ?? analyze(spec.body ?? '');
}

function frame(w, h, inset) {
  return { x: w * inset, y: h * 0.14, w: w * (1 - inset * 2), h: h * 0.72 };
}

/**
 * @param {Spec} spec
 * @param {Options} opts
 * @returns {string} a complete <svg> element
 */
export function renderVisual(spec, opts) {
  const { palette: P, width: w, height: h } = opts;
  const full = (opts.detail ?? (Math.min(w, h) < REDUCED_BELOW ? 'reduced' : 'full')) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h, opts.inset ?? 0.08);
  const spine = spineIndex(st);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];

  // The implied text column. Uniform in weight and deliberately saying
  // nothing — it is the ground the marks are made against, not a measurement.
  // Its ragged right edge is the post's actual paragraph lengths; derived from
  // the line index instead it would be identical on every post.
  const colX = f.x + f.w * 0.26;
  const colW = f.w * 0.74;
  const lines = full ? 13 : 6;
  const lead = f.h / lines;
  const paras = st.paragraphs.length ? st.paragraphs : [st.words];
  const maxPara = Math.max(...paras);
  for (let i = 0; i < lines; i++) {
    const p = paras[Math.floor((i * paras.length) / lines)] ?? maxPara;
    const len = colW * (0.34 + 0.66 * (p / maxPara));
    parts.push(
      `<rect x="${n(colX)}" y="${n(f.y + i * lead + lead * 0.28)}" width="${n(len)}" height="${n(Math.max(1.4, lead * 0.22))}" fill="${P.ink(0.13)}"/>`,
    );
  }

  // The margin marks, one where each section opens.
  const secs = st.sections.slice(0, full ? 12 : 6);
  const total = secs.reduce((a, s) => a + Math.max(1, s.words), 0);
  const weight = Math.max(2, h * 0.016);
  let acc = 0;

  secs.forEach((s, i) => {
    const y = f.y + (f.h * acc) / total;
    acc += Math.max(1, s.words);
    const isSpine = i === spine;
    const len = f.w * (isSpine ? 0.2 : s.quant ? 0.15 : 0.1);
    parts.push(
      `<rect x="${n(f.x)}" y="${n(y)}" width="${n(len)}" height="${n(weight)}" fill="${s.quant || isSpine ? P.accent : P.ink(0.6)}"/>`,
    );
    // A section running longer than its share gets a rule down the margin
    // beside it, the way an editor brackets a passage.
    if (full && s.words > total / secs.length) {
      const runTo = f.y + (f.h * acc) / total;
      parts.push(
        `<line x1="${n(f.x + 1)}" y1="${n(y + weight)}" x2="${n(f.x + 1)}" y2="${n(runTo - lead * 0.2)}" stroke="${P.ink(0.28)}" stroke-width="1.5"/>`,
      );
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"${
    opts.title ? ` role="img" aria-label="${opts.title}"` : ' aria-hidden="true"'
  }>${parts.join('')}</svg>`;
}

/**
 * The section-break mark used inside post bodies. Same vocabulary — a clay
 * rule flanked by two ink ticks — but fixed rather than derived, since a
 * divider marks a place in the post rather than describing the whole of it.
 *
 * @param {import('./palette.mjs').Palette} P
 */
export function renderDivider(P, width = 120, height = 12) {
  const midY = height / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">
    <rect x="${n(width * 0.34)}" y="${n(midY - 1.5)}" width="${n(width * 0.32)}" height="3" fill="${P.accent}"/>
    <rect x="${n(width * 0.16)}" y="${n(midY - 0.5)}" width="${n(width * 0.1)}" height="1" fill="${P.ink(0.3)}"/>
    <rect x="${n(width * 0.74)}" y="${n(midY - 0.5)}" width="${n(width * 0.1)}" height="1" fill="${P.ink(0.3)}"/>
  </svg>`;
}

/**
 * Round three — marks drawn from the post's own structure rather than a hash.
 *
 * There is no PRNG in this file. Every dimension comes from `spec.structure`
 * (see structure.mjs), so two posts differ visually exactly as much as they
 * differ structurally. A 317-word essay with no sections and a 2,728-word
 * argument with ten cannot come out looking alike.
 *
 * Vocabulary stays the shortlisted one: hairline grid, clay and ink solids,
 * a struck rule, tone where it earns its place.
 *
 * Same signature as the earlier rounds: (spec, palette, opts) -> SVG string.
 */

import { escapeXml, n } from './rand.mjs';
import { analyze, spineIndex } from './structure.mjs';

const DISPLAY = 'Fraunces Variable, Fraunces, Georgia, serif';

function detailFor(opts) {
  return opts.detail ?? (Math.min(opts.width, opts.height) < 150 ? 'reduced' : 'full');
}

function svg(inner, w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;
}

/** Tolerate a spec that carries raw markdown instead of a parsed structure. */
function structureOf(spec) {
  if (spec.structure) return spec.structure;
  return analyze(spec.body ?? '');
}

/**
 * Grid resolution follows post length, so a short post is drawn in a coarse
 * hand and a long one in a fine hand. This is the single biggest source of
 * differentiation — a 6-column mark and an 18-column mark share no silhouette.
 */
function resolution(words, full) {
  const t = Math.min(1, Math.max(0, (words - 300) / 2400));
  const cols = Math.round(6 + t * 12);
  return full ? cols : Math.max(4, Math.round(cols / 2.6));
}

function frame(w, h) {
  return { padX: w * 0.08, padY: h * 0.14, innerW: w * 0.84, innerH: h * 0.72 };
}

function hairGrid(f, cols, rows, P, alpha = 0.09) {
  const out = [];
  const cw = f.innerW / cols;
  const ch = f.innerH / rows;
  for (let c = 0; c <= cols; c++) {
    const x = n(f.padX + c * cw);
    out.push(`<line x1="${x}" y1="${n(f.padY)}" x2="${x}" y2="${n(f.padY + f.innerH)}" stroke="${P.ink(alpha)}" stroke-width="1"/>`);
  }
  for (let r = 0; r <= rows; r++) {
    const y = n(f.padY + r * ch);
    out.push(`<line x1="${n(f.padX)}" y1="${y}" x2="${n(f.padX + f.innerW)}" y2="${y}" stroke="${P.ink(alpha)}" stroke-width="1"/>`);
  }
  return out.join('');
}

function ghostInitial(title, P, w, h, full, alpha = 0.055) {
  const glyph = escapeXml((title || '?').trim()[0] || '?');
  const size = full ? h * 1.4 : h * 1.0;
  return `<text x="${n(w * (full ? 0.68 : 0.56))}" y="${n(h * (full ? 1.02 : 0.92))}" font-family="${DISPLAY}" font-size="${n(size)}" font-weight="500" fill="${P.ink(alpha)}">${glyph}</text>`;
}

// ---------------------------------------------------------------------------
// 1. Section profile — the post's sections as runs, length as width.
//     A post with no sections gets one unbroken run. A post with ten gets ten
//     of visibly different lengths. Quantitative sections are struck in clay.
// ---------------------------------------------------------------------------

export function sectionProfile(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);

  const cols = resolution(st.words, full);
  const rows = Math.max(3, Math.min(full ? 12 : 6, st.sections.length));
  const cw = f.innerW / cols;
  const ch = f.innerH / rows;
  const spine = spineIndex(st);

  const parts = [
    `<rect width="${w}" height="${h}" fill="${P.bg}"/>`,
    ghostInitial(spec.title, P, w, h, full),
    hairGrid(f, cols, rows, P),
  ];

  st.sections.slice(0, rows).forEach((s, i) => {
    const span = Math.max(1, Math.round((s.words / st.maxSectionWords) * cols));
    const fill = s.quant ? P.accent : s.intro ? P.ink(0.28) : P.ink(0.76);
    parts.push(
      `<rect x="${n(f.padX)}" y="${n(f.padY + i * ch)}" width="${n(span * cw)}" height="${n(ch)}" fill="${fill}"/>`,
    );
  });

  // The rule sits under the longest section — the spine of the argument.
  const ruleY = f.padY + Math.min(rows, spine + 1) * ch;
  parts.push(
    `<line x1="${n(f.padX)}" y1="${n(ruleY)}" x2="${n(f.padX + f.innerW)}" y2="${n(ruleY)}" stroke="${P.accent}" stroke-width="${n(Math.max(2, h * 0.012))}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 2. Section skyline — the same data stood upright.
//     Wholly different silhouette from the horizontal profile, and the bar
//     count is the section count, so short and long posts read apart instantly.
// ---------------------------------------------------------------------------

export function sectionSkyline(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);

  const bars = Math.max(1, Math.min(full ? 14 : 7, st.sections.length));
  const slot = f.innerW / bars;
  const gap = Math.min(slot * 0.22, w * 0.012);
  const baseY = f.padY + f.innerH;

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`, ghostInitial(spec.title, P, w, h, full)];

  if (full) {
    for (const t of [0.33, 0.66]) {
      const y = n(baseY - f.innerH * t);
      parts.push(`<line x1="${n(f.padX)}" y1="${y}" x2="${n(f.padX + f.innerW)}" y2="${y}" stroke="${P.ink(0.08)}" stroke-width="1"/>`);
    }
  }

  st.sections.slice(0, bars).forEach((s, i) => {
    // A floor keeps the shortest section visible rather than hairline-thin.
    const bh = f.innerH * (0.14 + 0.86 * (s.words / st.maxSectionWords));
    parts.push(
      `<rect x="${n(f.padX + i * slot)}" y="${n(baseY - bh)}" width="${n(slot - gap)}" height="${n(bh)}" fill="${s.quant ? P.accent : s.intro ? P.ink(0.28) : P.ink(0.76)}"/>`,
    );
  });

  parts.push(
    `<line x1="${n(f.padX)}" y1="${n(baseY)}" x2="${n(f.padX + f.innerW)}" y2="${n(baseY)}" stroke="${P.accent}" stroke-width="${n(Math.max(2, h * 0.012))}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 3. Paragraph field — one cell per paragraph, tone by length.
//     Reads as a minimap of the post. Seven paragraphs and fifty produce
//     completely different fills, and the wrapping makes the shape irregular
//     in a way the bar forms cannot be.
// ---------------------------------------------------------------------------

export function paragraphField(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);

  const paras = st.paragraphs.length ? st.paragraphs : [st.words];
  const maxP = Math.max(1, ...paras);

  // Choose a column count that lands the wrap near the frame's aspect, so a
  // long post fills densely and a short one leaves the field mostly empty.
  const aspect = f.innerW / f.innerH;
  const cols = Math.max(
    full ? 6 : 3,
    Math.min(full ? 24 : 8, Math.round(Math.sqrt(paras.length * aspect) * 1.35)),
  );
  const rows = Math.max(2, Math.ceil(paras.length / cols));
  const cw = f.innerW / cols;
  const ch = f.innerH / rows;

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`, hairGrid(f, cols, rows, P, 0.07)];

  paras.forEach((words, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    if (r >= rows) return;
    const t = words / maxP;
    // Tone by paragraph length: short paragraphs sit back, long ones read solid.
    const fill = t > 0.66 ? P.ink(0.78) : t > 0.33 ? P.ink(0.4) : P.ink(0.16);
    parts.push(
      `<rect x="${n(f.padX + c * cw)}" y="${n(f.padY + r * ch)}" width="${n(cw)}" height="${n(ch)}" fill="${fill}"/>`,
    );
  });

  // Clay marks where the post is quantitative — the intro cell of each
  // number-heavy section, located by cumulative paragraph position.
  let cursor = 0;
  for (const s of st.sections) {
    if (s.quant && cursor < paras.length) {
      const c = cursor % cols;
      const r = Math.floor(cursor / cols);
      if (r < rows) {
        parts.push(
          `<rect x="${n(f.padX + c * cw)}" y="${n(f.padY + r * ch)}" width="${n(cw)}" height="${n(ch)}" fill="${P.accent}"/>`,
        );
      }
    }
    cursor += Math.max(1, s.paras);
  }

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 4. Struck measure — the most restrained. One rule per section, length as
//     width, no fills. Closest to the site's existing hairline language, and
//     the least likely to compete with a 56px title.
// ---------------------------------------------------------------------------

export function struckMeasure(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);

  const rows = Math.max(2, Math.min(full ? 14 : 7, st.sections.length));
  const ch = f.innerH / rows;
  const weight = Math.max(2, Math.min(ch * 0.42, h * 0.03));
  const spine = spineIndex(st);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];

  st.sections.slice(0, rows).forEach((s, i) => {
    const len = f.innerW * (0.08 + 0.92 * (s.words / st.maxSectionWords));
    const y = f.padY + i * ch + ch / 2;
    const isSpine = i === spine;
    parts.push(
      `<rect x="${n(f.padX)}" y="${n(y - weight / 2)}" width="${n(len)}" height="${n(weight)}" fill="${s.quant || isSpine ? P.accent : P.ink(s.intro ? 0.3 : 0.7)}"/>`,
    );
    // A tick closes each measure, so the rules read as measured lengths
    // rather than as an unfinished underline.
    if (full) {
      parts.push(
        `<line x1="${n(f.padX + len)}" y1="${n(y - ch * 0.3)}" x2="${n(f.padX + len)}" y2="${n(y + ch * 0.3)}" stroke="${P.ink(0.22)}" stroke-width="1"/>`,
      );
    }
  });

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------

export const STRUCTURAL = [
  {
    id: 'profile',
    name: 'Section profile',
    parents: 'sections as runs',
    blurb:
      'Each section is a run on the grid, its width the section’s share of the longest. Quantitative sections strike in clay, the intro sits back in grey, and the rule falls under the longest section. Grid resolution follows post length, so short posts are drawn in a coarse hand and long ones in a fine one.',
    render: sectionProfile,
  },
  {
    id: 'skyline',
    name: 'Section skyline',
    parents: 'sections stood upright',
    blurb:
      'The same data turned ninety degrees. Bar count is section count, so a sectionless essay is a single block and a ten-part argument is a ragged row. Entirely different silhouette from the horizontal forms.',
    render: sectionSkyline,
  },
  {
    id: 'field',
    name: 'Paragraph field',
    parents: 'paragraphs as cells',
    blurb:
      'One cell per paragraph, toned by paragraph length, wrapped to a column count that follows the post’s size. A minimap of the writing. Seven paragraphs and fifty fill the frame completely differently, and clay marks where the post turns quantitative.',
    render: paragraphField,
  },
  {
    id: 'measure',
    name: 'Struck measure',
    parents: 'sections as lengths',
    blurb:
      'The most restrained: one rule per section, length as width, no fills and no grid. Closest to the hairline language the site already uses, and the least likely to compete with a 56px Fraunces title.',
    render: struckMeasure,
  },
];

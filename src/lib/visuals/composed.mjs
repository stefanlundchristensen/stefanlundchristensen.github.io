/**
 * Round four — structure-driven, but composed rather than plotted.
 *
 * Round three differentiated the posts properly and then read as charts. Three
 * things made it look like data viz, and every form here breaks at least two:
 *
 *   1. a common origin — every element starting from one baseline or left edge
 *   2. a uniform repeated series where length is the only variable
 *   3. axis furniture behind it
 *
 * So nothing below aligns to a shared baseline, and every element varies in at
 * least two properties at once (position and size, or size and weight), which
 * is what stops the eye reading it as a measured series.
 *
 * Data comes from the same structure.mjs as round three, so the differentiation
 * carries over unchanged. There is still no PRNG anywhere in this file.
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

function structureOf(spec) {
  return spec.structure ?? analyze(spec.body ?? '');
}

function frame(w, h) {
  return { x: w * 0.08, y: h * 0.14, w: w * 0.84, h: h * 0.72 };
}

function ghostInitial(title, P, w, h, full, alpha = 0.05) {
  const glyph = escapeXml((title || '?').trim()[0] || '?');
  const size = full ? h * 1.4 : h * 1.0;
  return `<text x="${n(w * (full ? 0.7 : 0.58))}" y="${n(h * (full ? 1.02 : 0.92))}" font-family="${DISPLAY}" font-size="${n(size)}" font-weight="500" fill="${P.ink(alpha)}">${glyph}</text>`;
}

// ---------------------------------------------------------------------------
// 1. Subdivision
//     The frame is cut in two at the point that balances the sections either
//     side, then each half is cut again on the other axis, and so on. Section
//     lengths set where the cuts fall, so the composition is entirely the
//     post's — but there is no baseline and no series, and most panels are left
//     as paper. It reads as a composition, not a treemap, because it is mostly
//     empty and the fills do not run in any order.
// ---------------------------------------------------------------------------

function cut(rect, items, vertical, gutter, out) {
  if (items.length === 0) return;
  if (items.length === 1) {
    out.push({ rect, item: items[0] });
    return;
  }
  const total = items.reduce((a, i) => a + i.weight, 0);
  let acc = 0;
  let k = 1;
  for (let i = 0; i < items.length - 1; i++) {
    acc += items[i].weight;
    k = i + 1;
    if (acc >= total / 2) break;
  }
  const frac = Math.min(0.82, Math.max(0.18, acc / total));
  const g = gutter;
  if (vertical) {
    const lw = rect.w * frac - g / 2;
    cut({ ...rect, w: lw }, items.slice(0, k), false, g, out);
    cut({ ...rect, x: rect.x + rect.w * frac + g / 2, w: rect.w * (1 - frac) - g / 2 }, items.slice(k), false, g, out);
  } else {
    const th = rect.h * frac - g / 2;
    cut({ ...rect, h: th }, items.slice(0, k), true, g, out);
    cut({ ...rect, y: rect.y + rect.h * frac + g / 2, h: rect.h * (1 - frac) - g / 2 }, items.slice(k), true, g, out);
  }
}

export function subdivision(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);
  const spine = spineIndex(st);

  const items = st.sections
    .slice(0, full ? 12 : 6)
    .map((s, i) => ({ weight: Math.max(1, s.words), s, i }));

  const panels = [];
  cut(f, items, f.w >= f.h, Math.min(w, h) * 0.018, panels);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`, ghostInitial(spec.title, P, w, h, full)];

  // Which panels take ink is decided by the sections themselves, never by
  // their position. Anything keyed on index gives every post with the same
  // section count an identical composition — the round-two failure again.
  const mean = st.words / Math.max(1, st.sections.length);

  panels.forEach(({ rect, item }) => {
    if (rect.w <= 0 || rect.h <= 0) return;
    const { s, i } = item;
    const solid = s.quant || i === spine || s.words > mean;
    if (!solid) {
      // Short sections leave an outline; the shortest leave nothing at all.
      if (full && s.words > mean * 0.45) {
        parts.push(
          `<rect x="${n(rect.x)}" y="${n(rect.y)}" width="${n(rect.w)}" height="${n(rect.h)}" fill="none" stroke="${P.ink(0.16)}" stroke-width="1"/>`,
        );
      }
      return;
    }
    // Weight graded by the section's share, so panels differ in tone as well
    // as in size and the composition never flattens into two values.
    const share = Math.min(1, s.words / st.maxSectionWords);
    const fill = s.quant ? P.accent : i === spine ? P.ink(0.8) : P.ink(0.16 + share * 0.45);
    parts.push(
      `<rect x="${n(rect.x)}" y="${n(rect.y)}" width="${n(rect.w)}" height="${n(rect.h)}" fill="${fill}"/>`,
    );
  });

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 2. Strata
//     Sections as bands seen edge-on, like the fore-edge of a bound book.
//     Thickness comes from section length, but each band is inset differently
//     on the left *and* the right, so nothing shares an edge and the stack
//     reads as physical layers rather than as bars.
// ---------------------------------------------------------------------------

export function strata(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);

  const secs = st.sections.slice(0, full ? 12 : 6);
  const total = secs.reduce((a, s) => a + Math.max(1, s.words), 0);
  const gap = Math.min(f.h * 0.02, h * 0.012);
  const avail = f.h - gap * (secs.length - 1);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`, ghostInitial(spec.title, P, w, h, full)];

  let y = f.y;
  secs.forEach((s, i) => {
    const band = Math.max(full ? 3 : 2, (avail * Math.max(1, s.words)) / total);
    // Both insets come from the section's own data, and from two different
    // quantities, so no two bands line up and the block never resolves into a
    // baseline. Deriving these from the index instead would give every post
    // with the same section count an identical stack.
    const left = f.w * 0.34 * Math.min(1, s.paras / 9);
    const right = f.w * 0.28 * Math.min(1, s.nums / 5);
    const bw = Math.max(f.w * 0.18, f.w - left - right);
    parts.push(
      `<rect x="${n(f.x + left)}" y="${n(y)}" width="${n(bw)}" height="${n(band)}" fill="${s.quant ? P.accent : s.intro ? P.ink(0.22) : P.ink(0.72)}"/>`,
    );
    y += band + gap;
  });

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 3. Imposition
//     A printer's imposition sheet: the frame broken into unequal panels with
//     hairline gutters and fold marks, one panel carrying the ink. Section
//     count sets how the sheet is broken up, section lengths set the panel
//     proportions. No series at all — it is a plan of a sheet, not a plot.
// ---------------------------------------------------------------------------

export function imposition(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);
  const spine = spineIndex(st);

  const secs = st.sections.slice(0, full ? 10 : 5);
  const cols = Math.max(2, Math.min(full ? 5 : 3, Math.ceil(Math.sqrt(secs.length))));
  const rows = Math.max(1, Math.ceil(secs.length / cols));

  // Column widths and row heights both come from the sections that fall in
  // them, so the sheet is broken unevenly in both directions.
  const colW = new Array(cols).fill(0);
  const rowH = new Array(rows).fill(0);
  secs.forEach((s, i) => {
    colW[i % cols] += Math.max(1, s.words);
    rowH[Math.floor(i / cols)] += Math.max(1, s.words);
  });
  const norm = (arr, extent) => {
    const t = arr.reduce((a, v) => a + v, 0) || 1;
    return arr.map((v) => (extent * Math.max(v, t * 0.12)) / arr.reduce((a, x) => a + Math.max(x, t * 0.12), 0));
  };
  const cwArr = norm(colW, f.w);
  const rhArr = norm(rowH, f.h);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`, ghostInitial(spec.title, P, w, h, full)];
  const gut = Math.min(w, h) * 0.014;

  let yy = f.y;
  for (let r = 0; r < rows; r++) {
    let xx = f.x;
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const pw = cwArr[c] - gut;
      const ph = rhArr[r] - gut;
      if (i < secs.length && pw > 0 && ph > 0) {
        const s = secs[i];
        if (s.quant) {
          parts.push(`<rect x="${n(xx)}" y="${n(yy)}" width="${n(pw)}" height="${n(ph)}" fill="${P.accent}"/>`);
        } else if (i === spine) {
          parts.push(`<rect x="${n(xx)}" y="${n(yy)}" width="${n(pw)}" height="${n(ph)}" fill="${P.ink(0.78)}"/>`);
        } else {
          parts.push(
            `<rect x="${n(xx)}" y="${n(yy)}" width="${n(pw)}" height="${n(ph)}" fill="none" stroke="${P.ink(0.18)}" stroke-width="1"/>`,
          );
          // A short crop tick in the corner of each empty panel.
          if (full) {
            const t = Math.min(pw, ph) * 0.18;
            parts.push(
              `<path d="M ${n(xx)} ${n(yy + t)} L ${n(xx)} ${n(yy)} L ${n(xx + t)} ${n(yy)}" fill="none" stroke="${P.ink(0.34)}" stroke-width="1.5"/>`,
            );
          }
        }
      }
      xx += cwArr[c];
    }
    yy += rhArr[r];
  }

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 4. Proof marks
//     An implied column of text, faint and uniform, with the post's structure
//     written in the margin as an editor would mark a proof: a rule where each
//     section opens, a longer clay one at the spine, ticks where the prose
//     turns numerate. The only form here whose marks sit beside the content
//     rather than standing in for it.
// ---------------------------------------------------------------------------

export function proofMarks(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const st = structureOf(spec);
  const f = frame(w, h);
  const spine = spineIndex(st);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];

  // The implied text column: uniform faint rules, deliberately saying nothing.
  // It is the ground the marks are made against, not a measurement.
  const colX = f.x + f.w * 0.26;
  const colW = f.w * 0.74;
  // The ragged right edge is the post's actual paragraph lengths, sampled to
  // fit. Set from the index it would be identical on every post, which is what
  // made round two monotone.
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

  // The margin marks, placed where each section opens.
  const secs = st.sections.slice(0, full ? 12 : 6);
  const total = secs.reduce((a, s) => a + Math.max(1, s.words), 0);
  let acc = 0;
  const weight = Math.max(2, h * 0.016);
  secs.forEach((s, i) => {
    const y = f.y + (f.h * acc) / total;
    acc += Math.max(1, s.words);
    const isSpine = i === spine;
    const len = f.w * (isSpine ? 0.2 : s.quant ? 0.15 : 0.1);
    parts.push(
      `<rect x="${n(f.x)}" y="${n(y)}" width="${n(len)}" height="${n(weight)}" fill="${s.quant || isSpine ? P.accent : P.ink(0.6)}"/>`,
    );
    // A section that runs long gets a rule down the margin beside it.
    if (full && s.words > total / secs.length) {
      const runTo = f.y + (f.h * acc) / total;
      parts.push(
        `<line x1="${n(f.x + 1)}" y1="${n(y + weight)}" x2="${n(f.x + 1)}" y2="${n(runTo - lead * 0.2)}" stroke="${P.ink(0.28)}" stroke-width="1.5"/>`,
      );
    }
  });

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------

export const COMPOSED = [
  {
    id: 'subdivision',
    name: 'Subdivision',
    parents: 'no baseline, no series',
    blurb:
      'The frame is cut in two where the sections balance, then each half is cut again on the other axis. Section lengths decide where every cut falls, but most panels stay as paper — filling them all is what would make it a treemap.',
    render: subdivision,
  },
  {
    id: 'strata',
    name: 'Strata',
    parents: 'no shared edge',
    blurb:
      'Sections as bands seen edge-on, like the fore-edge of a bound book. Thickness is section length, but each band is inset differently on both sides, so nothing lines up and the stack never resolves into a baseline.',
    render: strata,
  },
  {
    id: 'imposition',
    name: 'Imposition',
    parents: 'a plan, not a plot',
    blurb:
      'A printer’s imposition sheet: the frame broken into unequal panels with gutters and corner ticks, one panel carrying the ink. Section count breaks up the sheet, section lengths set the proportions. No series anywhere in it.',
    render: imposition,
  },
  {
    id: 'proof',
    name: 'Proof marks',
    parents: 'marks beside the text',
    blurb:
      'An implied column of type, faint and deliberately saying nothing, with the structure written in the margin as an editor marks a proof. The only form whose marks sit beside the content rather than standing in for it.',
    render: proofMarks,
  },
];

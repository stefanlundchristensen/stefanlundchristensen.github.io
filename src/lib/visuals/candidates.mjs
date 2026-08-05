/**
 * Five candidate visual directions for post marks.
 *
 * This file is a LAB artifact. Once a direction is chosen, the winner graduates
 * into primitives.mjs + render.mjs and the other four are deleted.
 *
 * Every renderer has the same signature and returns a bare SVG string, so the
 * same function can serve a 720px hero, a 104px thumbnail and a 1200x630 OG
 * card. Composition is expressed as fractions of w/h rather than fixed
 * coordinates, so a mark reflows across aspect ratios instead of being cropped.
 *
 * @typedef {object} Spec
 * @property {string} slug
 * @property {string} title
 * @property {string} [category]
 *
 * @typedef {object} Opts
 * @property {number} width
 * @property {number} height
 * @property {'full'|'reduced'} [detail]
 */

import { rng, escapeXml, n } from './rand.mjs';

const DISPLAY = 'Fraunces Variable, Fraunces, Georgia, serif';

/** Small marks drop their fine detail rather than shrinking it into mud. */
function detailFor(opts) {
  return opts.detail ?? (Math.min(opts.width, opts.height) < 150 ? 'reduced' : 'full');
}

function svg(inner, w, h, extra = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"${extra}>${inner}</svg>`;
}

/** Catmull-Rom through the points, emitted as cubic beziers. */
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M ${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${n(c1x)} ${n(c1y)}, ${n(c2x)} ${n(c2y)}, ${n(p2[0])} ${n(p2[1])}`;
  }
  return d;
}

// ---------------------------------------------------------------------------
// 1. Instrument trace
//    A plotted line on hairline axes. Reads as a physics figure or an
//    oscilloscope capture; leans on the background that runs through several
//    posts without illustrating anything literal.
// ---------------------------------------------------------------------------

export function instrumentTrace(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':trace');

  const padX = w * 0.09;
  const padY = h * 0.16;
  const baseY = h - padY;
  const topY = padY;
  const plotH = baseY - topY;
  const x0 = padX;
  const x1 = w - padX;

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];

  if (full) {
    for (const f of [0.25, 0.5, 0.75]) {
      const y = n(baseY - plotH * f);
      parts.push(`<line x1="${n(x0)}" y1="${y}" x2="${n(x1)}" y2="${y}" stroke="${P.ink(0.07)}" stroke-width="1"/>`);
    }
  }

  // Axes.
  parts.push(
    `<line x1="${n(x0)}" y1="${n(topY)}" x2="${n(x0)}" y2="${n(baseY)}" stroke="${P.ink(0.18)}" stroke-width="1"/>`,
    `<line x1="${n(x0)}" y1="${n(baseY)}" x2="${n(x1)}" y2="${n(baseY)}" stroke="${P.ink(0.18)}" stroke-width="1"/>`,
  );

  // Random walk with drift — data-shaped rather than merely wavy.
  const count = full ? 9 : 5;
  const pts = [];
  let v = r.range(0.15, 0.4);
  for (let i = 0; i < count; i++) {
    v = Math.max(0.08, Math.min(0.95, v + r.range(-0.18, 0.28)));
    pts.push([x0 + ((x1 - x0) * i) / (count - 1), baseY - plotH * v]);
  }

  if (full) {
    const tickY = n(baseY);
    for (let i = 1; i < count; i++) {
      const x = n(pts[i][0]);
      parts.push(`<line x1="${x}" y1="${tickY}" x2="${x}" y2="${n(baseY + h * 0.03)}" stroke="${P.ink(0.14)}" stroke-width="1"/>`);
    }
  }

  const stroke = Math.max(1.5, h * 0.013);
  parts.push(
    `<path d="${smoothPath(pts)}" fill="none" stroke="${P.accent}" stroke-width="${n(stroke)}" stroke-linecap="round" stroke-linejoin="round"/>`,
  );

  // One marked reading.
  const mi = full ? count - 3 : count - 2;
  const rad = Math.max(2.5, h * 0.024);
  parts.push(
    `<circle cx="${n(pts[mi][0])}" cy="${n(pts[mi][1])}" r="${n(rad)}" fill="${P.bg}" stroke="${P.accent}" stroke-width="${n(stroke)}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 2. Rule & block
//    Swiss editorial. Solid clay and ink blocks on a 12-column grid, hairline
//    rules, and an oversized Fraunces initial bleeding off an edge. Closest to
//    the existing OG cards, so the lowest-risk direction.
// ---------------------------------------------------------------------------

export function ruleBlock(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':block');

  const padX = w * 0.09;
  const inner = w - padX * 2;
  const col = inner / 12;
  const glyph = escapeXml((spec.title || '?').trim()[0] || '?');

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];

  // The initial sits behind everything, cropped by the frame. It has to shrink
  // at thumbnail size or it stops reading as a letter and becomes a grey slab.
  const glyphSize = full ? h * 1.45 : h * 1.0;
  parts.push(
    `<text x="${n(w * (full ? 0.63 : 0.52))}" y="${n(h * (full ? 1.04 : 0.92))}" font-family="${DISPLAY}" font-size="${n(glyphSize)}" font-weight="500" fill="${P.ink(0.07)}">${glyph}</text>`,
  );

  // Rows are placed by detail level rather than by one fixed set of fractions,
  // so the reduced mark still occupies its square instead of hugging the top.
  const rows = full
    ? { rule: 0.2, blocks: 0.36, third: 0.56, hair: 0.78 }
    : { rule: 0.16, blocks: 0.36, third: 0.62 };
  const bh = Math.max(6, h * (full ? 0.11 : 0.14));

  // The clay rule, quoting the 84px rule already on the OG cards.
  parts.push(
    `<rect x="${n(padX)}" y="${n(h * rows.rule)}" width="${n(Math.max(28, h * 0.42))}" height="${n(Math.max(2.5, h * 0.018))}" fill="${P.accent}"/>`,
  );

  const b1w = col * r.range(2.4, 4.6);
  const b2w = col * r.range(1.6, 3.2);

  parts.push(
    `<rect x="${n(padX)}" y="${n(h * rows.blocks)}" width="${n(b1w)}" height="${n(bh)}" fill="${P.accent}"/>`,
    `<rect x="${n(padX + b1w + col * 0.5)}" y="${n(h * rows.blocks)}" width="${n(b2w)}" height="${n(bh)}" fill="${P.ink(0.82)}"/>`,
  );

  const b3w = col * r.range(1.2, 2.4);
  parts.push(
    `<rect x="${n(padX)}" y="${n(h * rows.third)}" width="${n(b3w)}" height="${n(bh * 0.5)}" fill="${P.ink(0.22)}"/>`,
  );

  if (full) {
    parts.push(
      `<line x1="${n(padX)}" y1="${n(h * rows.hair)}" x2="${n(w - padX)}" y2="${n(h * rows.hair)}" stroke="${P.ink(0.15)}" stroke-width="1"/>`,
    );
  }

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 3. Ledger field
//    A hairline grid with a handful of cells struck through in clay and ink.
//    Reconciliation, balance sheets, org charts — the strongest thematic fit
//    for the payments writing.
// ---------------------------------------------------------------------------

export function ledgerField(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':ledger');

  const padX = w * 0.08;
  const padY = h * 0.14;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;

  const cols = full ? 14 : 5;
  const cw = innerW / cols;
  const rows = Math.max(3, Math.round(innerH / cw));
  const ch = innerH / rows;

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];

  for (let c = 0; c <= cols; c++) {
    const x = n(padX + c * cw);
    parts.push(`<line x1="${x}" y1="${n(padY)}" x2="${x}" y2="${n(padY + innerH)}" stroke="${P.ink(0.1)}" stroke-width="1"/>`);
  }
  for (let rw = 0; rw <= rows; rw++) {
    const y = n(padY + rw * ch);
    parts.push(`<line x1="${n(padX)}" y1="${y}" x2="${n(padX + innerW)}" y2="${y}" stroke="${P.ink(0.1)}" stroke-width="1"/>`);
  }

  // Filled cells. Roughly a third land in clay; the rest sit back in ink.
  const fills = full ? 9 : 3;
  const taken = new Set();
  for (let i = 0; i < fills; i++) {
    const c = r.int(0, cols - 1);
    const rw = r.int(0, rows - 1);
    const key = `${c},${rw}`;
    if (taken.has(key)) continue;
    taken.add(key);
    const clay = r() < 0.36;
    parts.push(
      `<rect x="${n(padX + c * cw)}" y="${n(padY + rw * ch)}" width="${n(cw)}" height="${n(ch)}" fill="${clay ? P.tint(0.85) : P.ink(0.13)}"/>`,
    );
  }

  // One row carries the balance. Never the last, or the rule lands on the frame
  // edge and reads as a border rather than a mark.
  const markRow = r.int(0, Math.max(0, rows - 2));
  parts.push(
    `<line x1="${n(padX)}" y1="${n(padY + (markRow + 1) * ch)}" x2="${n(padX + innerW)}" y2="${n(padY + (markRow + 1) * ch)}" stroke="${P.accent}" stroke-width="${n(Math.max(2, h * 0.012))}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 4. Node & flow
//    Circles joined by orthogonal elbows — the literal shape of payment rails
//    and reporting lines. The only direction whose vocabulary carries straight
//    into the explanatory diagrams, which makes it the most economical if the
//    in-post diagrams matter most.
// ---------------------------------------------------------------------------

export function nodeFlow(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':flow');

  const padX = w * 0.1;
  const padY = h * 0.2;
  const cols = full ? 5 : 3;
  const rows = full ? 3 : 2;
  const gx = (w - padX * 2) / (cols - 1);
  const gy = rows > 1 ? (h - padY * 2) / (rows - 1) : 0;
  const at = (c, rw) => [padX + c * gx, padY + rw * gy];

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];
  const dim = Math.max(1.6, Math.min(w, h) * 0.018);
  const live = Math.max(3, Math.min(w, h) * 0.038);
  const stroke = Math.max(1.5, Math.min(w, h) * 0.014);

  // The lattice the route is drawn from.
  if (full) {
    for (let c = 0; c < cols; c++) {
      for (let rw = 0; rw < rows; rw++) {
        const [x, y] = at(c, rw);
        parts.push(`<circle cx="${n(x)}" cy="${n(y)}" r="${n(dim)}" fill="${P.ink(0.16)}"/>`);
      }
    }
  }

  // A single route left to right, stepping at most one row at a time.
  const route = [];
  let row = r.int(0, rows - 1);
  for (let c = 0; c < cols; c++) {
    if (c > 0) {
      const step = r.pick([-1, 0, 1]);
      row = Math.max(0, Math.min(rows - 1, row + step));
    }
    route.push([c, row]);
  }

  // A route that never changes row is a plain horizontal line, which at
  // thumbnail size makes different posts indistinguishable. Force one step.
  if (rows > 1 && route.every(([, rw]) => rw === route[0][1])) {
    const at1 = r.int(1, cols - 1);
    const flipped = route[0][1] === 0 ? 1 : route[0][1] - 1;
    for (let c = at1; c < cols; c++) route[c][1] = flipped;
  }

  // Orthogonal elbows: run across, then step.
  let d = '';
  route.forEach(([c, rw], i) => {
    const [x, y] = at(c, rw);
    if (i === 0) {
      d = `M ${n(x)} ${n(y)}`;
      return;
    }
    const [, prevRow] = route[i - 1];
    const [px, py] = at(c - 1, prevRow);
    const midX = n(px + (x - px) * 0.55);
    if (rw === prevRow) d += ` L ${n(x)} ${n(y)}`;
    else d += ` L ${midX} ${n(py)} L ${midX} ${n(y)} L ${n(x)} ${n(y)}`;
  });

  parts.push(
    `<path d="${d}" fill="none" stroke="${P.accent}" stroke-width="${n(stroke)}" stroke-linecap="round" stroke-linejoin="round"/>`,
  );

  route.forEach(([c, rw], i) => {
    const [x, y] = at(c, rw);
    const last = i === route.length - 1;
    parts.push(
      last
        ? `<circle cx="${n(x)}" cy="${n(y)}" r="${n(live)}" fill="${P.accent}"/>`
        : `<circle cx="${n(x)}" cy="${n(y)}" r="${n(live * 0.72)}" fill="${P.bg}" stroke="${P.accent}" stroke-width="${n(stroke)}"/>`,
    );
  });

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// 5. Layered halftone
//    Two offset duotone shapes with deliberate misregistration, plus a decaying
//    dot field. Riso-print warmth. The most distinctive direction and the one
//    most likely to fight the typography.
// ---------------------------------------------------------------------------

export function layeredHalftone(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':riso');

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`];
  const unit = Math.min(w, h);
  const rad = unit * (full ? 0.34 : 0.3);
  // Keep both shapes inside the frame — on a square the circle would otherwise
  // run off the left edge and the offset square off the bottom.
  const offX = Math.min(w * 0.045, rad * 0.2);
  const offY = -h * 0.06;
  const cx = Math.max(rad * 1.08, w * r.range(0.26, 0.36));
  const cy = Math.min(h - rad * 1.05, Math.max(rad * 1.05 - offY, h * 0.52));

  // mix-blend-mode gives the ink-over-ink overprint. It has to flip with the
  // theme: multiply darkens on bone, but on the dark ground it would erase the
  // mark entirely, so the dark palette overprints with screen instead.
  parts.push(
    `<g style="mix-blend-mode: ${P.blend}">`,
    `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(rad)}" fill="${P.tint(0.82)}"/>`,
    `<rect x="${n(cx + offX - rad * 0.8)}" y="${n(cy + offY - rad * 0.8)}" width="${n(rad * 1.6)}" height="${n(rad * 1.6)}" fill="${P.ink(0.7)}"/>`,
    `</g>`,
  );

  // Dot field decaying to the right.
  const dc = full ? 22 : 8;
  const dr = full ? 12 : 5;
  const x0 = w * 0.46;
  const spanX = w * 0.48;
  const spanY = h * 0.72;
  const y0 = h * 0.14;
  // Radius has to follow dot spacing, not the frame. Keyed to `unit`, a tall
  // narrow region gives dots wider than the gap between them and the field
  // smears into dashes.
  const gapX = spanX / (dc - 1);
  const gapY = spanY / (dr - 1);
  const maxR = Math.max(0.8, Math.min(unit * 0.018, gapX * 0.38, gapY * 0.38));
  for (let i = 0; i < dc; i++) {
    for (let j = 0; j < dr; j++) {
      const t = i / (dc - 1);
      const rr = maxR * (1 - t) * r.range(0.55, 1);
      if (rr < 0.35) continue;
      parts.push(
        `<circle cx="${n(x0 + (spanX * i) / (dc - 1))}" cy="${n(y0 + (spanY * j) / (dr - 1))}" r="${n(rr)}" fill="${P.ink(0.45)}"/>`,
      );
    }
  }

  if (full) {
    parts.push(
      `<line x1="${n(w * 0.08)}" y1="${n(h * 0.88)}" x2="${n(w * 0.92)}" y2="${n(h * 0.88)}" stroke="${P.ink(0.15)}" stroke-width="1"/>`,
    );
  }

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------

export const CANDIDATES = [
  {
    id: 'trace',
    name: 'Instrument trace',
    blurb:
      'A plotted line on hairline axes. Reads as a physics figure without illustrating anything literal. Quiet enough to sit under a 56px title.',
    render: instrumentTrace,
  },
  {
    id: 'block',
    name: 'Rule & block',
    blurb:
      'Swiss editorial: clay and ink blocks on a 12-column grid with an oversized Fraunces initial bleeding off the frame. Closest to the current OG cards, so the lowest-risk direction.',
    render: ruleBlock,
  },
  {
    id: 'ledger',
    name: 'Ledger field',
    blurb:
      'A hairline grid with cells struck through in clay. Reconciliation, balance sheets, org charts. Strongest thematic fit for the payments writing, weakest for the personal essays.',
    render: ledgerField,
  },
  {
    id: 'flow',
    name: 'Node & flow',
    blurb:
      'Circles joined by orthogonal elbows. The only direction whose vocabulary carries straight into the in-post explanatory diagrams, which makes it the most economical of the five.',
    render: nodeFlow,
  },
  {
    id: 'riso',
    name: 'Layered halftone',
    blurb:
      'Offset duotone shapes with deliberate misregistration and a decaying dot field. The most distinctive, and the most likely to fight the typography. Needs a resvg blend-mode check before it could reach the OG cards.',
    render: layeredHalftone,
  },
];

export function byId(id) {
  return CANDIDATES.find((c) => c.id === id);
}

/**
 * Round 2 — mergers of the ledger, block and halftone directions.
 *
 * Also a LAB artifact, deleted with candidates.mjs once a direction is chosen.
 *
 * The three parents divide cleanly: ledger and block are both rectilinear and
 * both use clay/ink solids on a grid, so they combine almost without a seam.
 * Halftone contributes no shapes worth keeping — what it has that the other two
 * lack is *tone* (density standing in for flat fill) and *misregistration*
 * (things failing to line up). Each hybrid below takes a different pair of
 * those properties.
 *
 * Same signature and return type as candidates.mjs: (spec, palette, opts) -> SVG string.
 */

import { rng, escapeXml, n } from './rand.mjs';

const DISPLAY = 'Fraunces Variable, Fraunces, Georgia, serif';

function detailFor(opts) {
  return opts.detail ?? (Math.min(opts.width, opts.height) < 150 ? 'reduced' : 'full');
}

function svg(inner, w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;
}

/** Shared grid geometry, so every hybrid snaps to the same lattice. */
function geom(w, h, cols) {
  const padX = w * 0.08;
  const padY = h * 0.14;
  const innerW = w - padX * 2;
  const innerH = h - padY * 2;
  const cw = innerW / cols;
  const rows = Math.max(3, Math.round(innerH / cw));
  return { padX, padY, innerW, innerH, cols, rows, cw, ch: innerH / rows };
}

function hairlines(g, P, alpha = 0.1) {
  const out = [];
  for (let c = 0; c <= g.cols; c++) {
    const x = n(g.padX + c * g.cw);
    out.push(`<line x1="${x}" y1="${n(g.padY)}" x2="${x}" y2="${n(g.padY + g.innerH)}" stroke="${P.ink(alpha)}" stroke-width="1"/>`);
  }
  for (let r = 0; r <= g.rows; r++) {
    const y = n(g.padY + r * g.ch);
    out.push(`<line x1="${n(g.padX)}" y1="${y}" x2="${n(g.padX + g.innerW)}" y2="${y}" stroke="${P.ink(alpha)}" stroke-width="1"/>`);
  }
  return out.join('');
}

/** The oversized Fraunces initial, sitting behind everything and cropped by the frame. */
function ghostInitial(title, P, w, h, full, alpha = 0.06) {
  const glyph = escapeXml((title || '?').trim()[0] || '?');
  const size = full ? h * 1.4 : h * 1.0;
  const x = w * (full ? 0.66 : 0.54);
  const y = h * (full ? 1.02 : 0.92);
  return `<text x="${n(x)}" y="${n(y)}" font-family="${DISPLAY}" font-size="${n(size)}" font-weight="500" fill="${P.ink(alpha)}">${glyph}</text>`;
}

// ---------------------------------------------------------------------------
// A. Struck ledger  —  ledger × block
//     The most seamless of the four. Block's 12-column grid becomes the
//     ledger's grid, and its solid blocks become runs of filled cells snapped
//     to it. The initial sits behind the hairlines, so the grid screens it.
//     Nothing of halftone here: this is the merger with no tone and no error.
// ---------------------------------------------------------------------------

export function struckLedger(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':struck');
  const g = geom(w, h, full ? 14 : 5);

  const parts = [
    `<rect width="${w}" height="${h}" fill="${P.bg}"/>`,
    ghostInitial(spec.title, P, w, h, full),
    hairlines(g, P),
  ];

  // Runs of cells rather than free-floating blocks: the block direction's
  // weight, but obeying the ledger.
  const fills = [P.accent, P.ink(0.82), P.ink(0.18)];
  const count = full ? 3 : 2;
  const usedRows = new Set();
  for (let i = 0; i < count; i++) {
    let row = r.int(0, g.rows - 1);
    for (let tries = 0; tries < 6 && usedRows.has(row); tries++) row = r.int(0, g.rows - 1);
    usedRows.add(row);
    const span = full ? r.int(2, 5) : r.int(1, 2);
    const start = r.int(0, Math.max(0, g.cols - span));
    parts.push(
      `<rect x="${n(g.padX + start * g.cw)}" y="${n(g.padY + row * g.ch)}" width="${n(span * g.cw)}" height="${n(g.ch)}" fill="${fills[i % fills.length]}"/>`,
    );
  }

  // One rule struck across a full row boundary, in register with the grid.
  const rule = r.int(1, Math.max(1, g.rows - 1));
  parts.push(
    `<line x1="${n(g.padX)}" y1="${n(g.padY + rule * g.ch)}" x2="${n(g.padX + g.innerW)}" y2="${n(g.padY + rule * g.ch)}" stroke="${P.accent}" stroke-width="${n(Math.max(2, h * 0.012))}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// B. Screened ledger  —  ledger × halftone
//     Cells carry tone instead of flat fill: dot density stands in for value,
//     the way a printed table or an early line-printer chart would. Keeps the
//     ledger's rigour, borrows halftone's tonality, drops its loose shapes.
// ---------------------------------------------------------------------------

export function screenedLedger(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':screened');
  const g = geom(w, h, full ? 12 : 4);

  const parts = [`<rect width="${w}" height="${h}" fill="${P.bg}"/>`, hairlines(g, P)];

  /** Fill one cell with an n×n dot screen. Radius follows spacing, never the frame. */
  function screen(col, row, density, colour) {
    const k = density + 1; // 2, 3 or 4 dots per side
    const sx = g.cw / k;
    const sy = g.ch / k;
    const rad = Math.max(0.5, Math.min(sx, sy) * 0.3);
    const out = [];
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < k; j++) {
        out.push(
          `<circle cx="${n(g.padX + col * g.cw + sx * (i + 0.5))}" cy="${n(g.padY + row * g.ch + sy * (j + 0.5))}" r="${n(rad)}" fill="${colour}"/>`,
        );
      }
    }
    return out.join('');
  }

  const cells = full ? 10 : 4;
  const taken = new Set();
  for (let i = 0; i < cells; i++) {
    const c = r.int(0, g.cols - 1);
    const row = r.int(0, g.rows - 1);
    if (taken.has(`${c},${row}`)) continue;
    taken.add(`${c},${row}`);
    const clay = r() < 0.4;
    if (r() < 0.22) {
      // A few cells stay solid, so the screens read as tone against a true black.
      parts.push(
        `<rect x="${n(g.padX + c * g.cw)}" y="${n(g.padY + row * g.ch)}" width="${n(g.cw)}" height="${n(g.ch)}" fill="${clay ? P.accent : P.ink(0.8)}"/>`,
      );
    } else {
      parts.push(screen(c, row, r.int(1, 3), clay ? P.tint(0.9) : P.ink(0.55)));
    }
  }

  const rule = r.int(1, Math.max(1, g.rows - 1));
  parts.push(
    `<line x1="${n(g.padX)}" y1="${n(g.padY + rule * g.ch)}" x2="${n(g.padX + g.innerW)}" y2="${n(g.padY + rule * g.ch)}" stroke="${P.accent}" stroke-width="${n(Math.max(2, h * 0.012))}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// C. Overprint blocks  —  block × halftone
//     Swiss structure, print behaviour. The two solids overlap and overprint
//     rather than one sitting on top of the other, and the dot field decays
//     out of the ink block. No grid: this is the loosest of the four.
// ---------------------------------------------------------------------------

export function overprintBlocks(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':overprint');

  const padX = w * 0.09;
  const col = (w - padX * 2) / 12;

  const parts = [
    `<rect width="${w}" height="${h}" fill="${P.bg}"/>`,
    ghostInitial(spec.title, P, w, h, full, 0.07),
    `<rect x="${n(padX)}" y="${n(h * (full ? 0.2 : 0.16))}" width="${n(Math.max(28, h * 0.42))}" height="${n(Math.max(2.5, h * 0.018))}" fill="${P.accent}"/>`,
  ];

  const bh = Math.max(8, h * (full ? 0.2 : 0.24));
  const y = h * 0.38;
  const aw = col * r.range(2.6, 4.4);
  const bw = col * r.range(2.0, 3.4);
  // Deliberate misregistration: B is offset from where it would tile against A.
  const dx = col * r.range(0.4, 0.9);
  const dy = h * r.range(0.05, 0.1);

  parts.push(
    `<g style="mix-blend-mode: ${P.blend}">`,
    `<rect x="${n(padX)}" y="${n(y)}" width="${n(aw)}" height="${n(bh)}" fill="${P.tint(0.88)}"/>`,
    `<rect x="${n(padX + aw - dx)}" y="${n(y + dy)}" width="${n(bw)}" height="${n(bh)}" fill="${P.ink(0.78)}"/>`,
    `</g>`,
  );

  // Dot field decaying rightward out of the ink block.
  const dc = full ? 16 : 6;
  const dr = full ? 6 : 3;
  const x0 = padX + aw + bw - dx + col * 0.4;
  const spanX = Math.max(col, w - padX - x0);
  const spanY = bh;
  const gapX = spanX / Math.max(1, dc - 1);
  const gapY = spanY / Math.max(1, dr - 1);
  const maxR = Math.max(0.6, Math.min(gapX * 0.38, gapY * 0.38));
  for (let i = 0; i < dc; i++) {
    for (let j = 0; j < dr; j++) {
      const rad = maxR * (1 - i / (dc - 1)) * r.range(0.6, 1);
      if (rad < 0.4) continue;
      parts.push(
        `<circle cx="${n(x0 + gapX * i)}" cy="${n(y + dy + gapY * j)}" r="${n(rad)}" fill="${P.ink(0.5)}"/>`,
      );
    }
  }

  if (full) {
    parts.push(
      `<line x1="${n(padX)}" y1="${n(h * 0.8)}" x2="${n(w - padX)}" y2="${n(h * 0.8)}" stroke="${P.ink(0.15)}" stroke-width="1"/>`,
    );
  }

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------
// D. Out of register  —  all three
//     The idea the other three don't carry: a ledger grid is a claim that
//     everything lines up, and the blocks sitting on it do not. The clay rule
//     stays exactly in register while the runs are struck a fraction off it,
//     overprinting where they collide. For a blog largely about reconciliation
//     and things failing to reconcile, this is the merger that means something.
// ---------------------------------------------------------------------------

export function outOfRegister(spec, P, opts) {
  const { width: w, height: h } = opts;
  const full = detailFor(opts) === 'full';
  const r = rng(spec.slug + ':register');
  const g = geom(w, h, full ? 14 : 5);

  const parts = [
    `<rect width="${w}" height="${h}" fill="${P.bg}"/>`,
    ghostInitial(spec.title, P, w, h, full, 0.05),
    hairlines(g, P, 0.09),
  ];

  // The size of the error, held constant across the sheet so it reads as one
  // bad registration rather than as scattered noise.
  const ex = g.cw * r.range(0.18, 0.34);
  const ey = g.ch * r.range(0.16, 0.3);

  const runs = [];
  const count = full ? 3 : 2;
  const usedRows = new Set();
  for (let i = 0; i < count; i++) {
    let row = r.int(0, g.rows - 1);
    for (let t = 0; t < 6 && usedRows.has(row); t++) row = r.int(0, g.rows - 1);
    usedRows.add(row);
    const span = full ? r.int(2, 5) : r.int(1, 2);
    const start = r.int(0, Math.max(0, g.cols - span));
    runs.push({ row, span, start, clay: i === 0 || r() < 0.35 });
  }

  parts.push(`<g style="mix-blend-mode: ${P.blend}">`);
  for (const run of runs) {
    parts.push(
      `<rect x="${n(g.padX + run.start * g.cw + ex)}" y="${n(g.padY + run.row * g.ch + ey)}" width="${n(run.span * g.cw)}" height="${n(g.ch)}" fill="${run.clay ? P.tint(0.88) : P.ink(0.74)}"/>`,
    );
  }
  parts.push(`</g>`);

  if (full) {
    // One cell fills exactly on the grid — the single thing that did reconcile.
    const c = r.int(0, g.cols - 1);
    const row = r.int(0, g.rows - 1);
    parts.push(
      `<rect x="${n(g.padX + c * g.cw)}" y="${n(g.padY + row * g.ch)}" width="${n(g.cw)}" height="${n(g.ch)}" fill="${P.ink(0.16)}"/>`,
    );
  }

  // The rule stays in register. It is the reference the runs are failing against.
  const rule = r.int(1, Math.max(1, g.rows - 1));
  parts.push(
    `<line x1="${n(g.padX)}" y1="${n(g.padY + rule * g.ch)}" x2="${n(g.padX + g.innerW)}" y2="${n(g.padY + rule * g.ch)}" stroke="${P.accent}" stroke-width="${n(Math.max(2, h * 0.012))}"/>`,
  );

  return svg(parts.join(''), w, h);
}

// ---------------------------------------------------------------------------

export const HYBRIDS = [
  {
    id: 'struck',
    name: 'Struck ledger',
    parents: 'ledger × block',
    blurb:
      "The seamless one. Block's 12-column grid becomes the ledger's grid and its solids become runs of filled cells snapped to it, with the initial screened behind the hairlines. Takes nothing from halftone — no tone, no error.",
    render: struckLedger,
  },
  {
    id: 'screened',
    name: 'Screened ledger',
    parents: 'ledger × halftone',
    blurb:
      'Cells carry tone instead of flat fill: dot density stands in for value, the way a printed table or a line-printer chart would. A few cells stay solid so the screens read as tone against a true black.',
    render: screenedLedger,
  },
  {
    id: 'overprint',
    name: 'Overprint blocks',
    parents: 'block × halftone',
    blurb:
      'Swiss structure, press behaviour. The two solids overprint where they overlap rather than stacking, and the dot field decays out of the ink block. The loosest of the four, and the only one with no grid.',
    render: overprintBlocks,
  },
  {
    id: 'register',
    name: 'Out of register',
    parents: 'all three',
    blurb:
      'A ledger grid is a claim that everything lines up; the runs struck across it do not. The clay rule stays exactly in register as the reference they fail against, and one lone cell fills true. The only merger whose formal idea matches what the writing is about.',
    render: outOfRegister,
  },
];

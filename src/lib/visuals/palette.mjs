/**
 * Palettes mirroring src/styles/tokens.css.
 *
 * The visuals are rendered both inline in Astro (where CSS vars would work) and
 * to PNG by scripts/generate-og.mjs via resvg (where they would not). So colour
 * always travels as explicit hex/rgba through this module rather than as vars.
 *
 * @typedef {object} Palette
 * @property {string} name
 * @property {string} bg
 * @property {string} accent
 * @property {(alpha: number) => string} ink   ink at an arbitrary opacity
 * @property {(alpha: number) => string} tint  accent at an arbitrary opacity
 * @property {string} blend  overprint mode; multiply darkens on bone, screen
 *                           lightens on ink — the same value would erase the
 *                           mark entirely in the opposite theme.
 */

function rgba(r, g, b) {
  return (alpha) => (alpha >= 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${alpha})`);
}

/** @type {Palette} */
export const LIGHT = {
  name: 'light',
  bg: '#f5f3ee',
  accent: '#c2410c',
  ink: rgba(26, 26, 26),
  tint: rgba(194, 65, 12),
  blend: 'multiply',
};

/** @type {Palette} */
export const DARK = {
  name: 'dark',
  bg: '#1a1a1a',
  accent: '#e07a3a',
  ink: rgba(232, 228, 220),
  tint: rgba(224, 122, 58),
  blend: 'screen',
};

export const PALETTES = { light: LIGHT, dark: DARK };

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
  bg: '#f0f1ee',
  accent: '#566e79',
  ink: rgba(52, 61, 64),
  tint: rgba(86, 110, 121),
  blend: 'multiply',
};

/** @type {Palette} */
export const DARK = {
  name: 'dark',
  bg: '#222a2e',
  accent: '#a6bac3',
  ink: rgba(220, 226, 226),
  tint: rgba(166, 186, 195),
  blend: 'screen',
};

/**
 * For marks inlined into the page. Emitting custom properties rather than hex
 * means one render follows the theme toggle, instead of shipping a light and a
 * dark copy of every mark. resvg cannot resolve these, so the PNG path uses
 * LIGHT above.
 *
 * @type {Palette}
 */
export const CSSVARS = {
  name: 'cssvars',
  // Transparent, so the mark sits on whatever the page ground is.
  bg: 'transparent',
  accent: 'var(--accent)',
  ink: (alpha) => `rgba(var(--ink-rgb), ${alpha})`,
  tint: (alpha) => `rgba(var(--accent-rgb), ${alpha})`,
  blend: 'normal',
};

export const PALETTES = { light: LIGHT, dark: DARK };

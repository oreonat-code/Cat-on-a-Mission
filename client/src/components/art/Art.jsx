// SVG art copied from the Paper exports (design/mockups/*.jsx), with colours moved to CSS variables.

const FISH_COLOURS = {
  orange: { body: 'var(--pc-orange)', eye: 'var(--pc-ink)' },
  blue: { body: 'var(--pc-blue)', eye: 'var(--pc-white)' },
};

export function Fish({ colour = 'orange', width = 84, height = 58 }) {
  const c = FISH_COLOURS[colour];
  return (
    <svg width={width} height={height} viewBox="0 0 64 44" aria-hidden="true" className="art">
      <ellipse cx="26" cy="22" rx="22" ry="16" style={{ fill: c.body }} />
      <path d="M44 22l18-14v28z" style={{ fill: c.body }} />
      <circle cx="16" cy="18" r="3.5" style={{ fill: c.eye }} />
    </svg>
  );
}

const CAT_COLOURS = {
  orange: { body: 'var(--pc-orange)', line: 'var(--pc-ink)' },
  light: { body: 'var(--pc-orange-light)', line: 'var(--pc-ink)' },
  slate: { body: 'var(--pc-slate)', line: 'var(--pc-white)' },
};

export function SleepingCat({ colour = 'orange', size = 140 }) {
  const c = CAT_COLOURS[colour];
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="art">
      <path d="M20 50L24 14l28 20zM100 50L96 14 68 34z" style={{ fill: c.body }} />
      <circle cx="60" cy="68" r="42" style={{ fill: c.body }} />
      <path d="M40 62q6 6 12 0M68 62q6 6 12 0" fill="none" strokeWidth="4" strokeLinecap="round" style={{ stroke: c.line }} />
      <path d="M54 78q6 6 12 0" fill="none" strokeWidth="3.5" strokeLinecap="round" style={{ stroke: c.line }} />
    </svg>
  );
}

// Mochi, eyes open with whiskers (title row of artboard 22).
export function Mochi({ size = 76 }) {
  const ink = { stroke: 'var(--pc-ink)' };
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className="art">
      <path d="M20 50L24 14l28 20zM100 50L96 14 68 34z" style={{ fill: 'var(--pc-orange)' }} />
      <circle cx="60" cy="68" r="42" style={{ fill: 'var(--pc-orange)' }} />
      <circle cx="45" cy="62" r="6" style={{ fill: 'var(--pc-ink)' }} />
      <circle cx="75" cy="62" r="6" style={{ fill: 'var(--pc-ink)' }} />
      <path d="M54 76q6 6 12 0" fill="none" strokeWidth="3.5" strokeLinecap="round" style={ink} />
      <path d="M12 72h22M12 82l20-4M108 72H86M108 82l-20-4" fill="none" strokeWidth="2.5" strokeLinecap="round" style={ink} />
    </svg>
  );
}

export function Star({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="art">
      <polygon
        points="12,2 15,9 22,9.5 16.5,14.5 18.5,22 12,18 5.5,22 7.5,14.5 2,9.5 9,9"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ fill: 'var(--pc-star)', stroke: 'var(--pc-star-edge)' }}
      />
    </svg>
  );
}

export function SpeakerIcon({ size = 48 }) {
  const white = { fill: 'var(--pc-white)', stroke: 'var(--pc-white)' };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="art">
      <path d="M4 9v6h4l5 4V5L8 9H4z" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={white} />
      <path
        d="M16 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: 'var(--pc-white)' }}
      />
    </svg>
  );
}

export function CloseIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="art">
      <path d="M5 5l14 14M19 5L5 19" fill="none" strokeWidth="3" strokeLinecap="round" style={{ stroke: 'var(--pc-ink)' }} />
    </svg>
  );
}

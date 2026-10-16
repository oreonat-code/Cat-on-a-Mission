import { useId } from 'react';
import { useAdventure } from '../lib/adventure.jsx';
import studentAvatars from '../assets/cat-world/student-avatars.png';
export function Icon({ name, size = 28 }) {
  const paths = {
    home: 'M3 11 12 3l9 8M5 10v11h5v-7h4v7h5V10',
    arrow: 'm9 5 7 7-7 7',
    shop: 'M4 9h16v12H4zM3 9l2-6h14l2 6M9 21v-7h6v7',
    wardrobe: 'M9 5a3 3 0 0 1 6 0c0 2-3 2-3 5L2 17v3h20v-3l-10-7',
    badge: 'm8 14-3 8 7-3 7 3-3-8M12 2l3 2 3 1 1 4-1 4-3 1-3 2-3-2-3-1-1-4 1-4 3-1z',
    settings: 'M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2M6 18l2-2M16 8l2-2M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    close: 'm6 6 12 12M18 6 6 18', check: 'm5 12 4 4L19 6',
  };
  return <svg className="art" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}
export function CatAvatar({ size = 64, cat, outfit }) {
  const state = useAdventure();
  const selected = cat ?? state.selectedCat;
  const worn = outfit ?? state.equippedOutfit;
  return <span className={`cat-avatar cat-avatar--${selected} cat-avatar--${worn}`} style={{ width: size, height: size }}>
    <svg className="art cat-portrait" width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <path className="cat-tail" d="M88 93q31 5 25-27" fill="none" stroke="var(--cat-fur)" strokeWidth="14" strokeLinecap="round" />
      <ellipse cx="60" cy="91" rx="39" ry="25" fill="var(--cat-fur)" />
      {worn === 'hoodie' && <path d="M24 84q36-30 72 0v25H24Z" fill="var(--color-cobalt)" />}
      <path d="M20 48 22 13 46 32M100 48l-2-35-24 19" fill="var(--cat-fur)" stroke="var(--cat-fur)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M24 43 26 24l12 12M96 43l-2-19-12 12" fill="var(--color-mochi-tint)" />
      <circle cx="60" cy="61" r="40" fill="var(--cat-fur)" />
      {selected === 'calico' && <><path d="M21 43q11-23 35-20l-8 21q-12 0-24 10Z" fill="var(--color-mochi)" /><path d="M78 25q20 5 22 25l-15-4-13-20Z" fill="var(--color-text-muted)" /></>}
      {selected === 'orange' && <path d="M41 29q5 10 0 17m19-19q5 12 0 18m19-16q5 10 0 17" stroke="var(--color-text-mochi)" strokeWidth="4" fill="none" strokeLinecap="round" />}
      <g className="cat-eyes" fill="var(--color-ink)"><ellipse cx="45" cy="61" rx="4" ry="6"/><ellipse cx="75" cy="61" rx="4" ry="6"/></g>
      <path d="m56 73 4 3 4-3M60 76q-5 8-11 1m11-1q5 8 11 1M16 70l22 3m-21 7 21-2m66-8-22 3m21 7-21-2" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m55 70 5 3 5-3Z" fill="var(--color-mochi)" />
      {worn === 'bow' && <g fill="var(--color-mochi)"><path d="M58 91 34 80l2 23 22-8M62 91l24-11-2 23-22-8"/><circle cx="60" cy="93" r="6" /></g>}
      {worn === 'scarf' && <path d="M30 89q31 15 60 0l-3 12q-27 11-53 0Z" fill="var(--color-cobalt)" />}
      {worn === 'beanie' && <><path d="M29 36q8-27 31-27t31 27Z" fill="var(--color-mochi)"/><path d="M26 35h68" stroke="var(--color-text-mochi)" strokeWidth="8" strokeLinecap="round" /></>}
    </svg>
  </span>;
}
export function ShirtArt({ kind, size = 62 }) {
  const fabricId = useId();
  return <svg width={size} height={size} viewBox="0 0 100 100" className={`art shirt-art shirt-art--${kind}`} aria-hidden="true">
    <defs><linearGradient id={fabricId} x1="0" y1="0" x2=".8" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="var(--color-surface)" /><stop offset=".4" stopColor="var(--shirt-fill)" /><stop offset="1" stopColor="var(--shirt-shade)" /></linearGradient></defs>
    <path d="M32 15 19 22 7 40q-2 4 2 6l13 7 8-10-2 39q21 7 44 0l-2-39 8 10 13-7q4-2 2-6L81 22 68 15q-18 8-36 0Z" fill={`url(#${fabricId})`} stroke="var(--shirt-shade)" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M33 15q17 18 34 0l-4-3q-13 7-26 0Z" fill="var(--color-surface)" stroke="var(--shirt-shade)" strokeWidth="2" />
    <path d="m10 42 12 7m56 0 12-7M30 78q20 5 40 0" fill="none" stroke="var(--shirt-shade)" strokeWidth="2" strokeLinecap="round" />
    <path d="m30 43 2-9m38 9-2-9M35 72l2-15m28 15-2-15" fill="none" stroke="var(--shirt-shade)" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
    {kind === 'green' ? <path d="m50 39 5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="var(--color-ink)" /> : kind === 'pink' ? <path d="M50 68 36 55c-12-13 4-23 14-12 10-11 26-1 14 12Z" fill="var(--color-ink)" /> : <g>
      <path d="m37 47 1-11 10 7h4l10-7 1 11q6 5 4 14-3 11-17 11T33 61q-2-9 4-14Z" fill="var(--color-surface)" />
      <path d="m40 45 1-5 5 4m8 0 5-4 1 5" fill="var(--color-mochi-tint)" />
      <path d="M42 54v2m16-2v2m-11 6q3 4 6 0m-17-4 5 1m18 0 5-1" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="m48 58 2 2 2-2Z" fill="var(--color-mochi)" />
    </g>}
  </svg>;
}
export function StudentAvatar({ size = 64 }) {
  const { equippedShirt } = useAdventure();
  const position = { yellow: '0%', purple: '33.333%', green: '66.667%', pink: '100%' }[equippedShirt] || '0%';
  return <span className="student-avatar-sprite" role="img" aria-label={`Student avatar wearing ${equippedShirt} shirt`} style={{ width: size, height: size, backgroundImage: `url(${studentAvatars})`, backgroundPositionX: position }} />;
}
export function AccessoryArt({ kind }) {
  return <svg width="48" height="36" viewBox="0 0 48 36" aria-hidden="true" className="art accessory-art">
    {kind === 'bow' ? <><path d="M24 18C12 3 4 4 4 18s8 15 20 0c12-15 20-14 20 0s-8 15-20 0Z" fill="var(--color-cobalt-tint)" stroke="var(--color-ink)" strokeWidth="2" /><rect x="20" y="12" width="8" height="12" rx="3" fill="var(--color-cobalt)" /></> : <><path d="M5 10q19 9 38 0v10q-19 9-38 0Z" fill="var(--color-mint-tint)" stroke="var(--color-ink)" strokeWidth="2"/><path d="m28 20 3 13 9-3-4-12" fill="var(--color-mint-tint)" stroke="var(--color-ink)" strokeWidth="2"/></>}
  </svg>;
}
export function Bowl() {
  return <svg className="art bowl-art" width="62" height="54" viewBox="0 0 70 58" aria-hidden="true"><path d="m14 21-7 27q28 12 56 0l-7-27" fill="var(--color-mochi-tint)" stroke="var(--color-text-mochi)" strokeWidth="2"/><ellipse cx="35" cy="22" rx="21" ry="7" fill="var(--color-mochi)" stroke="var(--color-text-mochi)" strokeWidth="2"/><path d="m29 38 13 6m-13 0 13-6" stroke="var(--color-text-mochi)" strokeWidth="3" strokeLinecap="round"/></svg>;
}

import { Mochi } from './art/Art.jsx';
import { useAdventure } from '../lib/adventure.jsx';
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
export function CatAvatar({ size = 64 }) {
  const { outfit } = useAdventure();
  return <span className={'cat-avatar cat-avatar--' + outfit}><Mochi size={size} />{outfit && <span className="cat-accessory"><AccessoryArt kind={outfit} /></span>}</span>;
}
export function AccessoryArt({ kind }) {
  return <svg width="48" height="36" viewBox="0 0 48 36" aria-hidden="true" className="art accessory-art">
    {kind === 'bow' ? <><path d="M24 18C12 3 4 4 4 18s8 15 20 0c12-15 20-14 20 0s-8 15-20 0Z" fill="var(--color-cobalt-tint)" stroke="var(--color-ink)" strokeWidth="2" /><rect x="20" y="12" width="8" height="12" rx="3" fill="var(--color-cobalt)" /></> : <><path d="M5 10q19 9 38 0v10q-19 9-38 0Z" fill="var(--color-mint-tint)" stroke="var(--color-ink)" strokeWidth="2"/><path d="m28 20 3 13 9-3-4-12" fill="var(--color-mint-tint)" stroke="var(--color-ink)" strokeWidth="2"/></>}
  </svg>;
}
export function Bowl() {
  return <svg className="art bowl-art" width="62" height="54" viewBox="0 0 70 58" aria-hidden="true"><path d="m14 21-7 27q28 12 56 0l-7-27" fill="var(--color-mochi-tint)" stroke="var(--color-text-mochi)" strokeWidth="2"/><ellipse cx="35" cy="22" rx="21" ry="7" fill="var(--color-mochi)" stroke="var(--color-text-mochi)" strokeWidth="2"/><path d="m29 38 13 6m-13 0 13-6" stroke="var(--color-text-mochi)" strokeWidth="3" strokeLinecap="round"/></svg>;
}

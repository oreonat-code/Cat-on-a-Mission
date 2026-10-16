import { useEffect, useRef, useState } from 'react';
import { cats, outfits, shirts, useAdventure } from '../lib/adventure.jsx';
import { CatAvatar, ShirtArt, StudentAvatar } from './AdventureArt.jsx';
import { Fish } from './art/Art.jsx';

function ItemArt({ kind, id }) {
  if (kind === 'cats') return <CatAvatar cat={id} outfit="" size={105} />;
  if (kind === 'shirts') return <ShirtArt kind={id} size={92} />;
  return <span className={`item-art item-art--${id}`} aria-hidden="true">{id === 'bow' ? '🎀' : id === 'scarf' ? '🧣' : id === 'beanie' ? '🧶' : '👕'}</span>;
}
function ItemCard({ item, kind, state, shop }) {
  const ownedKey = { cats: 'ownedCats', outfits: 'ownedOutfits', shirts: 'ownedShirts' }[kind];
  const equipped = { cats: state.selectedCat, outfits: state.equippedOutfit, shirts: state.equippedShirt }[kind] === item.id;
  const owned = state[ownedKey].includes(item.id);
  const equip = { cats: state.selectCat, outfits: state.equipOutfit, shirts: state.equipShirt }[kind];
  return <div className={`inventory-card inventory-card--${kind} ${equipped ? 'is-equipped' : ''}`}>
    <ItemArt kind={kind} id={item.id} /><strong>{item.name}</strong>
    {shop && !owned && <span className="item-price"><Fish width={28} height={22} />{item.price}</span>}
    {owned ? <button className={`inventory-action ${equipped ? 'is-equipped' : ''}`} onClick={() => equip(item.id)} disabled={equipped}>{equipped ? 'Equipped' : shop ? 'Owned' : 'Equip'}</button>
      : shop ? <button className="inventory-action" onClick={() => state.buy(kind, item.id)} disabled={state.fish < item.price}>Buy</button>
        : <span className="inventory-locked">Shop to unlock</span>}
  </div>;
}
export default function AdventureDialog({ panel, onClose }) {
  const ref = useRef(null);
  const opener = useRef(document.activeElement);
  const state = useAdventure();
  const [tab, setTab] = useState('cats');
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => { if (dialog.open) dialog.close(); }; }, []);
  function close() { const dialog = ref.current; dialog.classList.add('is-closing'); const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.calm === 'true'; window.setTimeout(() => { dialog.close(); onClose(); opener.current?.focus({ preventScroll: true }); }, reduced ? 0 : 300); }
  const shop = panel === 'Shop';
  const wardrobe = panel === 'Wardrobe';
  const badges = panel === 'Learning Badges';
  return <dialog ref={ref} className={`adventure-dialog adventure-dialog--${shop ? 'shop' : wardrobe ? 'wardrobe' : 'badges'}`} onCancel={(event) => { event.preventDefault(); close(); }} aria-labelledby="dialog-title">
    <div className="scene-panel">
      <header className="scene-header"><button className="scene-back" onClick={close}><span aria-hidden="true">←</span> {badges ? 'Home' : 'Back'}</button><div className="scene-title"><h2 id="dialog-title">{badges ? 'My Badges' : panel}</h2><p>{shop ? 'Spend fish on cats and clothes!' : wardrobe ? 'Dress your cat!' : 'Look what you’ve earned!'}</p></div><div className="fish-balance"><Fish width={43} height={32} /><span>{state.fish}</span></div></header>
      {shop && <div className="shop-tabs" aria-label="Shop sections">{[['cats', 'Cats'], ['outfits', 'Cat Clothes'], ['shirts', 'Avatar Shirts']].map(([id, label]) => <button key={id} aria-current={tab === id ? 'true' : undefined} onClick={() => { setTab(id); document.getElementById(`shop-${id}`)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); }}>{label}</button>)}</div>}
      {shop && <div className="shop-sections">{[['cats', 'Cats', cats], ['outfits', 'Cat Clothes', outfits], ['shirts', 'Avatar Shirts', shirts]].map(([kind, title, items]) => <section id={`shop-${kind}`} className={`inventory-section ${tab === kind ? 'is-selected' : ''}`} key={kind}><h3>{title}</h3><div className="inventory-grid">{items.map((item) => <ItemCard key={item.id} item={item} kind={kind} state={state} shop />)}</div></section>)}</div>}
      {wardrobe && <div className="wardrobe-layout"><div className="wardrobe-cat"><button className="pet-preview" aria-label="Your cat" onClick={(event) => { event.currentTarget.classList.remove('is-petted'); void event.currentTarget.offsetWidth; event.currentTarget.classList.add('is-petted'); }}><CatAvatar size={290} /></button><section className="inventory-section"><h3>Choose your cat</h3><div className="inventory-grid inventory-grid--cats">{cats.map((item) => <ItemCard key={item.id} item={item} kind="cats" state={state} />)}</div></section></div><div className="wardrobe-items"><section className="inventory-section"><h3>Cat Outfits</h3><div className="inventory-grid inventory-grid--outfits">{outfits.map((item) => <ItemCard key={item.id} item={item} kind="outfits" state={state} />)}</div></section><section className="inventory-section"><h3>Avatar Shirts <StudentAvatar size={58} /></h3><div className="inventory-grid inventory-grid--shirts">{shirts.map((item) => <ItemCard key={item.id} item={item} kind="shirts" state={state} />)}</div></section></div></div>}
      {badges && <div className="badge-layout"><div className="badge-board">{[['first-fish', 'First Fish', '🐟', state.fish > 0], ['reading', 'Reading Cat', '📖', state.completed.includes('english')], ['number', 'Number Helper', '🔢', state.completed.includes('math')], ['maths', 'Maths Explorer', '➕', state.completed.includes('math')], ['words', 'Word Explorer', '🔤', state.completed.includes('english')]].map(([id, title, symbol, earned]) => <div className={`badge-tile ${earned ? 'is-earned' : ''}`} key={id}><span className="badge-medal" aria-hidden="true">{symbol}</span><strong>{title}</strong><small>{earned ? 'Collected!' : 'Keep learning to unlock'}</small></div>)}</div><div className="badge-detail"><span className="badge-medal" aria-hidden="true">🏅</span><h3>Learning Badges</h3><p>Explore Maths and English adventures to earn badges for your learning!</p></div></div>}
    </div>
  </dialog>;
}

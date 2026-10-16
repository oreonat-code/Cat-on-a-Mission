import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cats, outfits, shirts, useAdventure } from '../lib/adventure.jsx';
import { ShirtArt, StudentAvatar } from '../components/AdventureArt.jsx';
import CatCharacter from '../components/CatCharacter.jsx';
import shopImage from '../assets/cat-world/shop-reference.png';
import wardrobeImage from '../assets/cat-world/wardrobe-empty-preview.png';
import outfitsSprite from '../assets/cat-world/outfits-sprite.png';
import beanieArt from '../assets/cat-world/beanie.png';
import badgesImage from '../assets/cat-world/badges-reference.png';

function Hit({ label, box, onClick, className = '' }) {
  return <button className={`reference-hit ${className}`} style={{ left: `${box[0] / 1484 * 100}%`, top: `${box[1] / 1060 * 100}%`, width: `${box[2] / 1484 * 100}%`, height: `${box[3] / 1060 * 100}%` }} aria-label={label} onClick={onClick} />;
}
function Label({ box, children, tone = 'green' }) {
  return <span className={`reference-status reference-status--${tone}`} style={{ left: `${box[0] / 1484 * 100}%`, top: `${box[1] / 1060 * 100}%`, width: `${box[2] / 1484 * 100}%`, height: `${box[3] / 1060 * 100}%` }}>{children}</span>;
}
const wardrobeCats = [[218, 863, 112, 128], [345, 863, 112, 128], [466, 863, 112, 128], [584, 863, 112, 128]];
const wardrobeOutfits = [[820, 263, 194, 239], [1031, 263, 197, 239], [1242, 263, 195, 239], [820, 516, 194, 241], [1031, 516, 197, 241], [1242, 516, 195, 241]];
const wardrobeShirts = [[822, 861, 110, 142], [939, 861, 110, 142], [1057, 861, 111, 142], [1175, 861, 108, 142]];
const wardrobeOrder = ['hoodie', 'scarf', 'bow', 'pyjamas', 'party', 'bear'];
const outfitCell = { hoodie: ['0%', '0%'], scarf: ['50%', '0%'], bow: ['100%', '0%'], pyjamas: ['0%', '100%'], party: ['50%', '100%'], beanie: ['50%', '100%'], bear: ['100%', '100%'] };
export function OutfitThumb({ id }) { return <span className="outfit-thumb" role="img" aria-label={id} style={{ backgroundImage: `url(${id === 'beanie' ? beanieArt : outfitsSprite})`, backgroundPosition: id === 'beanie' ? 'center' : outfitCell[id].join(' '), backgroundSize: id === 'beanie' ? 'contain' : undefined, clipPath: id === 'scarf' ? 'inset(0 0 0 3%)' : undefined }} />; }

export function useSceneBack() { const navigate = useNavigate(); return (event) => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { navigate('/papers'); return; } event.currentTarget.closest('.reference-stage')?.classList.add('reference-leave--back'); window.setTimeout(() => navigate('/papers'), 300); }; }
export function Stage({ image, kind, children }) { return <main className="reference-page"><div className={`reference-stage reference-stage--${kind}`} style={{ backgroundImage: `url(${image})` }}>{children}</div></main>; }
export function SceneTop({ back, fish, fishBox, shirt, avatar = true }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [signedOut, setSignedOut] = useState(false);
  return <><Hit label="Back to Home" box={[35, 25, 245, 100]} onClick={back} /><span className="reference-fish reference-fish--scene" style={{ left: `${fishBox[0] / 1484 * 100}%`, top: `${fishBox[1] / 1060 * 100}%`, width: `${fishBox[2] / 1484 * 100}%` }}>{fish}</span>
    {avatar && <>{shirt !== 'yellow' && <span className="reference-avatar reference-avatar--scene"><StudentAvatar size={100} /></span>}<Hit label="Open profile" box={[1290, 25, 165, 165]} onClick={() => setProfileOpen(!profileOpen)} />{profileOpen && <div className="reference-profile reference-profile--scene"><p>Student ID: S001</p><button onClick={() => { setProfileOpen(false); setSignedOut(true); }}>Log out</button></div>}</>}
    {signedOut && <div className="reference-signed-out"><p>Logged out</p><button onClick={() => setSignedOut(false)}>Continue as Student S001</button></div>}
  </>;
}

export function ShopPage() {
  const state = useAdventure();
  const back = useSceneBack();
  const [params, setParams] = useSearchParams();
  const category = ['cats', 'outfits', 'shirts'].includes(params.get('category')) ? params.get('category') : 'cats';
  const products = { cats, outfits, shirts }[category];
  function action(kind, item) {
    const owned = state[{ cats: 'ownedCats', outfits: 'ownedOutfits', shirts: 'ownedShirts' }[kind]].includes(item.id);
    if (!owned) state.buy(kind, item.id);
    else ({ cats: state.selectCat, outfits: state.equipOutfit, shirts: state.equipShirt })[kind](item.id);
  }
  return <Stage image={shopImage} kind="shop"><SceneTop back={back} fish={state.fish} shirt={state.equippedShirt} fishBox={[1193, 50, 72]} />
    <div className="live-shop-tabs" aria-label="Shop categories">{[['cats', 'Cats'], ['outfits', 'Cat Clothes'], ['shirts', 'Avatar Shirts']].map(([id, name]) => <button key={id} aria-current={category === id ? 'true' : undefined} onClick={() => setParams({ category: id })}>{name}</button>)}</div>
    <section className={`live-shop-panel live-shop-panel--${category}`} aria-label={{ cats: 'Cats', outfits: 'Cat Clothes', shirts: 'Avatar Shirts' }[category]}>
      <div className="live-shop-heading"><h3>{{ cats: 'Cats', outfits: 'Cat Clothes', shirts: 'Avatar Shirts' }[category]}</h3>{category === 'shirts' && <StudentAvatar size={75} />}</div>
      <div className="live-shop-grid">{products.map((item) => {
        const owned = state[{ cats: 'ownedCats', outfits: 'ownedOutfits', shirts: 'ownedShirts' }[category]].includes(item.id);
        const equipped = { cats: state.selectedCat, outfits: state.equippedOutfit, shirts: state.equippedShirt }[category] === item.id;
        return <article className={`live-shop-card ${equipped ? 'is-equipped' : ''}`} key={item.id}>
          <div className="live-shop-art">{category === 'cats' ? <CatCharacter cat={item.id} outfit="" /> : category === 'shirts' ? <ShirtArt kind={item.id} size={100} /> : <OutfitThumb id={item.id} />}</div>
          <strong>{item.name}</strong><span className="live-shop-price">{owned ? 'Yours' : `🐟 ${item.price}`}</span>
          <button onClick={() => action(category, item)} disabled={!owned && state.fish < item.price || equipped}>{equipped ? 'Equipped' : owned ? 'Owned · Equip' : 'Buy'}</button>
        </article>;
      })}</div>
    </section>
  </Stage>;
}

export function WardrobePage() {
  const state = useAdventure();
  const back = useSceneBack();
  const navigate = useNavigate();
  return <Stage image={wardrobeImage} kind="wardrobe"><SceneTop back={back} fish={state.fish} shirt={state.equippedShirt} fishBox={[1358, 42, 74]} avatar={false} />
    <CatCharacter className="wardrobe-live-cat" cat={state.selectedCat} outfit={state.equippedOutfit} />
    <button className="wardrobe-beanie" onClick={() => state.ownedOutfits.includes('beanie') ? state.equipOutfit('beanie') : navigate('/papers/shop?category=outfits')}>{state.equippedOutfit === 'beanie' ? 'Beanie · Wearing' : state.ownedOutfits.includes('beanie') ? 'Wear Beanie' : 'Beanie · Shop'}</button>
    {['calico', 'grey', 'orange', 'white'].map((id, index) => <div key={id}><Hit label={`${state.ownedCats.includes(id) ? 'Choose' : 'Shop for'} ${id} cat`} box={wardrobeCats[index]} onClick={() => state.ownedCats.includes(id) ? state.selectCat(id) : navigate('/papers/shop?category=cats')} />{state.selectedCat === id && id !== 'calico' && <span className="wardrobe-selected" style={{ left: `${wardrobeCats[index][0] / 1484 * 100}%`, top: `${wardrobeCats[index][1] / 1060 * 100}%`, width: `${wardrobeCats[index][2] / 1484 * 100}%`, height: `${wardrobeCats[index][3] / 1060 * 100}%` }} />}</div>)}
    {wardrobeOrder.map((id, index) => <div key={id}><Hit label={`${state.ownedOutfits.includes(id) ? 'Wear' : 'Shop for'} ${id}`} box={wardrobeOutfits[index]} onClick={() => state.ownedOutfits.includes(id) ? state.equipOutfit(id) : navigate('/papers/shop?category=outfits')} />{!state.ownedOutfits.includes(id) && <Label box={[wardrobeOutfits[index][0] + 14, wardrobeOutfits[index][1] + 175, wardrobeOutfits[index][2] - 28, 50]} tone="blue">Shop</Label>}{state.equippedOutfit === id && id !== 'hoodie' && <Label box={[wardrobeOutfits[index][0] + 14, wardrobeOutfits[index][1] + 175, wardrobeOutfits[index][2] - 28, 50]}>Wearing</Label>}{id === 'hoodie' && state.equippedOutfit !== 'hoodie' && <Label box={[wardrobeOutfits[index][0] + 14, wardrobeOutfits[index][1] + 175, wardrobeOutfits[index][2] - 28, 50]} tone="blue">Wear</Label>}</div>)}
    <span className="wardrobe-avatar-heading">Avatar Shirts</span>
    {shirts.map((item, index) => <div key={item.id}><Hit label={`${state.ownedShirts.includes(item.id) ? 'Choose' : 'Shop for'} ${item.name}`} box={wardrobeShirts[index]} onClick={() => state.ownedShirts.includes(item.id) ? state.equipShirt(item.id) : navigate('/papers/shop?category=shirts')} />{state.equippedShirt === item.id && item.id !== 'yellow' && <span className="wardrobe-selected" style={{ left: `${wardrobeShirts[index][0] / 1484 * 100}%`, top: `${wardrobeShirts[index][1] / 1060 * 100}%`, width: `${wardrobeShirts[index][2] / 1484 * 100}%`, height: `${wardrobeShirts[index][3] / 1060 * 100}%` }} />}</div>)}
    {state.equippedShirt !== 'yellow' && <span className="reference-avatar reference-avatar--wardrobe"><StudentAvatar size={110} /></span>}
  </Stage>;
}

export function BadgesPage() {
  const state = useAdventure();
  const back = useSceneBack();
  return <Stage image={badgesImage} kind="badges"><SceneTop back={back} fish={state.fish} shirt={state.equippedShirt} fishBox={[1194, 49, 72]} />
    <Hit label="First Fish badge" box={[306, 283, 208, 272]} onClick={() => {}} />
    <Hit label="Reading Cat badge" box={[526, 283, 206, 272]} onClick={() => {}} />
    <Hit label="Number Helper badge" box={[739, 283, 206, 272]} onClick={() => {}} />
  </Stage>;
}

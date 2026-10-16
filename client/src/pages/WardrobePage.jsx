import { useNavigate } from 'react-router-dom';
import { cats, outfits, shirts, useAdventure } from '../lib/adventure.jsx';
import { ShirtArt, StudentAvatar } from '../components/AdventureArt.jsx';
import AudioButton from '../components/AudioButton.jsx';
import CatCharacter from '../components/CatCharacter.jsx';
import { Stage, SceneTop, useSceneBack, OutfitThumb } from './ReferenceScenes.jsx';
import wardrobeImage from '../assets/cat-world/wardrobe-empty-preview.png';

function SectionTitle({ title, speech }) {
  return <div className="wardrobe-fixed-heading"><h2>{title}</h2><AudioButton text={speech} size={32} lip={3} label={`Listen: ${title}`} /></div>;
}

export default function WardrobePage() {
  const state = useAdventure();
  const navigate = useNavigate();
  const back = useSceneBack();
  const catName = cats.find((item) => item.id === state.selectedCat)?.name;
  const outfitName = outfits.find((item) => item.id === state.equippedOutfit)?.name;
  const choose = (kind, item) => {
    const owned = state[{ cats: 'ownedCats', outfits: 'ownedOutfits', shirts: 'ownedShirts' }[kind]].includes(item.id);
    if (!owned) { navigate(`/papers/shop?category=${kind}`); return; }
    ({ cats: state.selectCat, outfits: state.equipOutfit, shirts: state.equipShirt })[kind](item.id);
  };

  return <Stage image={wardrobeImage} kind="wardrobe">
    <h1 className="sr-only">Wardrobe. Dress your cat!</h1>
    <SceneTop back={back} fish={state.fish} shirt={state.equippedShirt} fishBox={[1358, 42, 74]} avatar={false} />
    <div className="wardrobe-fixed-preview" aria-label="Your cat preview"><CatCharacter cat={state.selectedCat} outfit={state.equippedOutfit} /></div>
    <p className="wardrobe-fixed-preview-caption" aria-live="polite">{catName} · {outfitName}</p>

    <section className="wardrobe-fixed-panel wardrobe-fixed-outfits" aria-label="Cat outfits">
      <SectionTitle title="Cat Outfits" speech={`Choose an outfit for your cat. ${outfits.map((item) => item.name).join('. ')}. Choose Wear for clothes you own, or Shop to find more clothes.`} />
      <div className="wardrobe-fixed-outfit-grid">{outfits.map((item) => {
        const owned = state.ownedOutfits.includes(item.id);
        const wearing = state.equippedOutfit === item.id;
        return <button type="button" key={item.id} className={`wardrobe-fixed-item ${wearing ? 'is-equipped' : ''}`} aria-pressed={wearing} aria-label={`${item.name}. ${wearing ? 'Wearing' : owned ? 'Wear' : 'Shop for this outfit'}`} onClick={() => choose('outfits', item)}>
          <span className="wardrobe-fixed-outfit-art" aria-hidden="true"><OutfitThumb id={item.id} /></span>
          <strong>{item.id === 'bow' ? 'Bow' : item.name}</strong>
          <span className={`wardrobe-fixed-action ${wearing ? 'is-equipped' : ''}`}>{wearing ? '✓ Wearing' : owned ? 'Wear' : 'Shop ↗'}</span>
        </button>;
      })}</div>
    </section>

    <section className="wardrobe-fixed-panel wardrobe-fixed-cats" aria-label="Choose your cat">
      <SectionTitle title="Choose your cat" speech={`Choose a cat you own, or visit the shop to find another cat. ${cats.map((item) => item.name).join('. ')}.`} />
      <div className="wardrobe-fixed-cat-grid">{cats.map((item) => {
        const owned = state.ownedCats.includes(item.id);
        const selected = state.selectedCat === item.id;
        return <button type="button" key={item.id} className={`wardrobe-fixed-item ${selected ? 'is-equipped' : ''}`} aria-pressed={selected} aria-label={`${item.name}. ${selected ? 'Selected' : owned ? 'Choose' : 'Shop for this cat'}`} onClick={() => choose('cats', item)}>
          <span className="wardrobe-fixed-cat-art" aria-hidden="true"><CatCharacter cat={item.id} outfit="" /></span>
          <span className="wardrobe-fixed-small-status">{selected ? '✓ Selected' : owned ? 'Choose' : 'Shop ↗'}</span>
        </button>;
      })}</div>
    </section>

    <section className="wardrobe-fixed-panel wardrobe-fixed-shirts" aria-label="Avatar shirts">
      <SectionTitle title="Avatar Shirts" speech={`Choose a shirt for your avatar. ${shirts.map((item) => item.name).join('. ')}. Shirts you do not own are available in the shop.`} />
      <div className="wardrobe-fixed-shirts-row"><div className="wardrobe-fixed-shirt-grid">{shirts.map((item) => {
        const owned = state.ownedShirts.includes(item.id);
        const wearing = state.equippedShirt === item.id;
        return <button type="button" key={item.id} className={`wardrobe-fixed-item ${wearing ? 'is-equipped' : ''}`} aria-pressed={wearing} aria-label={`${item.name}. ${wearing ? 'Wearing' : owned ? 'Wear' : 'Shop for this shirt'}`} onClick={() => choose('shirts', item)}>
          <ShirtArt kind={item.id} size={60} />
          <strong>{item.name.replace(' Shirt', '')}</strong>
          <span className="wardrobe-fixed-small-status">{wearing ? '✓ Wearing' : owned ? 'Wear' : 'Shop ↗'}</span>
        </button>;
      })}</div><div className="wardrobe-fixed-avatar"><StudentAvatar size={100} /></div></div>
    </section>
  </Stage>;
}

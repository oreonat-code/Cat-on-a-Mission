import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cats, outfits, shirts, useAdventure } from '../lib/adventure.jsx';
import { ShirtArt, Icon } from '../components/AdventureArt.jsx';
import AudioButton from '../components/AudioButton.jsx';
import CatCharacter from '../components/CatCharacter.jsx';
import { Stage, SceneTop, useSceneBack, OutfitThumb } from './ReferenceScenes.jsx';
import shopImage from '../assets/cat-world/shop-reference-2x.webp';

const categories = [
  { id: 'cats', name: 'Cats', hint: 'Choose a new furry friend.', products: cats, ownedKey: 'ownedCats', selectedKey: 'selectedCat', equipKey: 'selectCat' },
  { id: 'outfits', name: 'Cat Clothes', hint: 'Find something cosy for your cat.', products: outfits, ownedKey: 'ownedOutfits', selectedKey: 'equippedOutfit', equipKey: 'equipOutfit' },
  { id: 'shirts', name: 'Avatar Shirts', hint: 'Choose a shirt for your avatar.', products: shirts, ownedKey: 'ownedShirts', selectedKey: 'equippedShirt', equipKey: 'equipShirt' },
];

export default function ShopPage() {
  const state = useAdventure();
  const back = useSceneBack();
  const [params, setParams] = useSearchParams();
  const [announcement, setAnnouncement] = useState('');
  const category = categories.find(({ id }) => id === params.get('category')) || categories[0];

  function choose(item) {
    if (state[category.ownedKey].includes(item.id)) {
      state[category.equipKey](item.id);
      setAnnouncement(`${item.name} equipped.`);
    } else if (state.fish >= item.price) {
      state.buy(category.id, item.id);
      setAnnouncement(`${item.name} is yours! Choose Equip to wear it.`);
    }
  }

  return <Stage image={shopImage} kind="shop">
    <h1 className="sr-only">Shop</h1>
    <SceneTop back={back} fish={state.fish} shirt={state.equippedShirt} fishBox={[1193, 50, 72]} />
    <nav className="shop-fixed-tabs" aria-label="Shop categories">
      {categories.map(({ id, name }) => <button type="button" key={id} aria-current={category.id === id ? 'page' : undefined} onClick={() => { setParams({ category: id }); setAnnouncement(''); }}>{name}</button>)}
    </nav>
    <section className={`shop-fixed-panel shop-fixed-panel--${category.id}`} aria-labelledby="shop-category-title">
      <header className="shop-fixed-heading">
        <div><h2 id="shop-category-title">{category.name}</h2><p>{category.hint}</p></div>
        <AudioButton className="shop-fixed-listen" text={`${category.name}. ${category.hint} You have ${state.fish} fish.`} label="Listen to the shop instructions" size={34} lip={3} />
      </header>
      <div className="shop-fixed-grid">
        {category.products.map((item) => {
          const owned = state[category.ownedKey].includes(item.id);
          const selected = state[category.selectedKey] === item.id;
          const affordable = state.fish >= item.price;
          const name = item.id === 'bow' ? 'Cat Bow' : item.name;
          return <article className={`shop-fixed-card${selected ? ' shop-fixed-card--equipped' : ''}`} key={item.id}>
            <div className="shop-fixed-art" aria-hidden="true">
              {category.id === 'cats' ? <div className="shop-fixed-cat"><CatCharacter cat={item.id} outfit="" /></div> : category.id === 'shirts' ? <ShirtArt kind={item.id} size={130} /> : <OutfitThumb id={item.id} />}
            </div>
            <div className="shop-fixed-name"><h3>{name}</h3><AudioButton className="shop-fixed-item-listen" text={`${name}. ${selected ? 'Equipped.' : owned ? 'You own this. Choose Equip to wear it.' : `${item.price} fish.${affordable ? '' : ` Collect ${item.price - state.fish} more fish to buy it.`}`}`} label={`Listen: ${name}`} size={24} lip={2} /></div>
            <p className="shop-fixed-price">{owned ? selected ? category.id === 'cats' ? '✓ Selected' : '✓ Wearing' : 'Yours' : `${item.price} fish`}</p>
            <button type="button" className="shop-fixed-action" onClick={() => choose(item)} disabled={selected || !owned && !affordable} aria-label={selected ? `${name}, equipped` : owned ? `Equip ${name}` : affordable ? `Buy ${name} for ${item.price} fish` : `${name}, collect ${item.price - state.fish} more fish`}>
              {selected ? <><Icon name="check" size={18} /> Equipped</> : owned ? 'Equip' : affordable ? 'Buy' : `${item.price - state.fish} more fish`}
            </button>
          </article>;
        })}
      </div>
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    </section>
  </Stage>;
}

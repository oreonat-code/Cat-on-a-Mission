import catsSprite from '../assets/cat-world/cats-sprite.png';
import outfitsSprite from '../assets/cat-world/outfits-sprite.png';
import whiteCat from '../assets/cat-world/white-cat.png';
import beanieArt from '../assets/cat-world/beanie.png';

const catPosition = { calico: '0%', grey: '50%', orange: '100%' };
const outfitPosition = { hoodie: ['0%', '0%'], scarf: ['50%', '0%'], bow: ['100%', '0%'], pyjamas: ['0%', '100%'], party: ['50%', '100%'], bear: ['100%', '100%'], beanie: ['50%', '100%'] };

export default function CatCharacter({ cat = 'calico', outfit = 'hoodie', className = '' }) {
  const position = outfitPosition[outfit];
  return <span className={`painted-cat ${className}`} role="img" aria-label={`${cat} cat${outfit ? ` wearing ${outfit}` : ''}`}>
    <span className={`painted-cat__body ${cat === 'white' ? 'painted-cat__body--white' : ''}`} style={{ backgroundImage: `url(${cat === 'white' ? whiteCat : catsSprite})`, backgroundPositionX: catPosition[cat] || '0%' }} />
    {position && <span className={`painted-cat__outfit painted-cat__outfit--${outfit}`} style={{ backgroundImage: `url(${outfit === 'beanie' ? beanieArt : outfitsSprite})`, backgroundPosition: outfit === 'beanie' ? 'center' : position.join(' '), backgroundSize: outfit === 'beanie' ? 'cover' : undefined }} />}
  </span>;
}

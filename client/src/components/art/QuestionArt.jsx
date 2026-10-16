import sittingCat from '../../assets/cat-world/sitting-cat.webp';
import { Fish } from './Art.jsx';

// Counts stay in React. An illustration is always one animal, never a baked-in group.
export function StoryCat({ className = '' }) {
  return <img className={`story-cat ${className}`} src={sittingCat} alt="" draggable="false" />;
}

export function StoryFish({ colour = 'orange', departed = false }) {
  return <span className={`story-fish ${departed ? 'story-fish--departed' : ''}`} aria-hidden="true">
    <Fish colour={colour} outline={departed} width={84} height={58} />
    {departed && <svg className="fish-away-arrow" width="24" height="20" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h17m-6-6 6 6-6 6" /></svg>}
  </span>;
}

export function FishSet({ count, colour = 'orange', departed = false }) {
  return <div className="illustrated-fish-set" role="img" aria-label={`${count} ${colour} fish${departed ? ' swam away' : ''}`}>
    {Array.from({ length: count }, (_, i) => <StoryFish key={i} colour={colour} departed={departed} />)}
  </div>;
}

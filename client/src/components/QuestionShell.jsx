import { Fish, Mochi } from './art/Art.jsx';
import { Bowl, CatAvatar, Icon } from './AdventureArt.jsx';
import { useAdventure } from '../lib/adventure.jsx';
import logo from '../../../design/brand/cty-logo.webp';
export function FishTrail({ progress = 0, steps = 3, home = false }) {
  const filled = Math.round(progress * steps);
  return <div className={'fish-trail ' + (home ? 'fish-trail--home' : '')}>
    {home && <p>Collect fish to feed your cat!</p>}
    <div className="trail-path" role="progressbar" aria-label={home ? 'Choose an adventure to collect fish' : 'Adventure progress'} aria-valuemin={0} aria-valuemax={steps} aria-valuenow={filled}>
      <span className="trail-start" aria-hidden="true"><CatAvatar size={56} /></span>
      <span className="trail-steps">{Array.from({ length: steps }, (_, i) => <span key={i} className={'trail-stop ' + (i < filled ? 'is-complete' : '') + (i === filled ? ' is-current' : '')}>
        {i <= filled && <Fish width={30} height={23} />}
      </span>)}</span>
      <Bowl />
    </div>
  </div>;
}
export function FishBalance() {
  const { fish } = useAdventure();
  return <div className="fish-balance" role="status" aria-label={fish + ' fish'}><Fish width={48} height={34} /><span>{fish}</span></div>;
}
export function Brand() {
  return <div className="brand"><img src={logo} alt="Catch Them Young" /><span>Learning<br />Adventures</span></div>;
}
export function ShellHeader({ progress = 0, steps = 3, onClose }) {
  return <header className="shell-header">
    <button type="button" className="home-button" onClick={onClose} aria-label="Back to home"><img src={logo} alt="Catch Them Young" /><span><Icon name="home" size={16} /> Home</span></button>
    <FishTrail progress={progress} steps={steps} /><FishBalance />
  </header>;
}
export function TitleRow({ audio, mascot, prompt }) {
  return <div className="title-row">{audio}{mascot || <Mochi size={64} />}<h1 className="prompt" tabIndex={-1}>{prompt}</h1></div>;
}

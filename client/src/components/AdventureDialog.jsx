import { useEffect, useRef } from 'react';
import { accessories, useAdventure } from '../lib/adventure.jsx';
import { AccessoryArt, CatAvatar, Icon } from './AdventureArt.jsx';
import AudioButton from './AudioButton.jsx';

export default function AdventureDialog({ panel, onClose }) {
  const ref = useRef(null);
  const opener = useRef(document.activeElement);
  const state = useAdventure();
  useEffect(() => { const dialog = ref.current; dialog.showModal(); return () => dialog.close(); }, []);
  function close() { ref.current.close(); onClose(); opener.current?.focus({ preventScroll: true }); }
  return <dialog ref={ref} className="adventure-dialog" onCancel={(e) => { e.preventDefault(); close(); }} onClick={(e) => { if (e.target === ref.current) close(); }} aria-labelledby="dialog-title">
    <div className="dialog-inner"><button className="dialog-close" onClick={close} aria-label="Close panel" autoFocus><Icon name="close" /></button>
      <div className="dialog-heading"><h2 id="dialog-title">{panel}</h2><AudioButton size={40} text={panel === 'Settings' ? 'Settings. Comfort theme uses softer surfaces. Calm mode reduces motion.' : panel === 'My Badges' ? 'My Badges. Finish a Maths or English adventure to collect a badge.' : `${panel}. You have ${state.fish} fish. Little bow, 3 fish. Cosy scarf, 6 fish.`} label={`Listen to ${panel}`} /></div>
      {panel === 'Settings' ? <div className="settings-list">
        <label><span>Comfort theme<small>Softer cream surfaces</small></span><input type="checkbox" checked={state.comfort} onChange={(e) => state.setting('comfort', e.target.checked)} /></label>
        <label><span>Calm mode<small>Less movement, same adventure</small></span><input type="checkbox" checked={state.calm} onChange={(e) => state.setting('calm', e.target.checked)} /></label>
      </div> : panel === 'My Badges' ? <><p>A little keepsake for each adventure.</p><div className="badges-list">{[['math', 'Maths explorer'], ['english', 'Word explorer']].map(([id, title]) => <div className={`badge-card ${state.completed.includes(id) ? 'is-earned' : ''}`} key={id}><Icon name="badge" size={50} /><strong>{title}</strong><span>{state.completed.includes(id) ? 'Collected!' : 'Finish an adventure to collect'}</span></div>)}</div></>
      : <><div className="wardrobe-preview"><CatAvatar size={120} /><p>{panel === 'Shop' ? `You have ${state.fish} fish to spend.` : 'A little something for your learning buddy.'}</p></div>
        <div className="accessory-list">{accessories.map((item) => {
          const owned = state.owned.includes(item.id);
          const equipped = state.outfit === item.id;
          return <div className="accessory-card" key={item.id}><span className={`accessory-symbol accessory-symbol--${item.id}`} aria-hidden="true"><AccessoryArt kind={item.id} /></span><strong>{item.name}</strong><AudioButton size={36} text={`${item.name}. ${owned ? 'Yours.' : `${item.price} fish.`}`} label={`Listen to ${item.name}`} />
            {owned ? <button className="small-button" onClick={() => state.equip(equipped ? '' : item.id)}>{equipped ? 'Take off' : 'Wear'}{equipped && <Icon name="check" size={18} />}</button> : panel === 'Shop' ? <button className="small-button" disabled={state.fish < item.price} onClick={() => state.buy(item.id)}>{state.fish < item.price ? `${item.price - state.fish} more fish` : `Get · ${item.price} fish`}</button> : <span className="muted">Find it in the shop</span>}
          </div>;
        })}</div><p className="dialog-note" role="status">{state.outfit ? `${accessories.find((a) => a.id === state.outfit).name} is on your cat.` : 'Your cat is ready for an adventure.'}</p></>}
    </div>
  </dialog>;
}

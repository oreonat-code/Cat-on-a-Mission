import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Fish, Mochi } from './art/Art.jsx';
import { Bowl, CatAvatar, Icon } from './AdventureArt.jsx';
import { useAdventure } from '../lib/adventure.jsx';
import { playRewardChime } from '../lib/sfx.js';
import logo from '../../../design/brand/cty-logo.webp';

const FISH_W = 34;
const FISH_H = 26;
const FLY_DELAY_MS = 200; // let the trail line catch up before the fish leaves its stop
const FLY_DURATION_MS = 560;
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';
const TRAIL_LAG_MS = [45, 90, 135]; // each ghost fish leaves a little later and lands with the lead fish
const TRAIL_OPACITY = [0.4, 0.26, 0.14];
const STOP_SPARK_DELAY_MS = 150;

// [angle in degrees, distance in px, size in px]
const STOP_SPARKS = Array.from({ length: 8 }, (_, i) => [i * 45 + 22, 34, 7]);
const BOWL_SPARKS = Array.from({ length: 10 }, (_, i) => [i * 36 + (i % 2 ? 9 : -7), i % 2 ? 56 : 42, i % 2 ? 9 : 6]);

// Ring shockwave plus sparks, centred on x/y inside the header.
function Burst({ sparks, delay = 0, x, y }) {
  return <span className="burst" style={{ '--delay': delay + 'ms', left: x, top: y }} aria-hidden="true">
    <b className="burst-ring" />
    {sparks.map(([angle, dist, size]) => <i key={angle} style={{ '--angle': angle + 'deg', '--dist': dist + 'px', '--size': size + 'px' }} />)}
  </span>;
}

export function FishTrail({ progress = 0, steps = 3, home = false }) {
  const filled = Math.round(progress * steps);
  const stepsRef = useRef(null);
  const firstFill = useRef(true);
  const [fillScale, setFillScale] = useState(0);
  const [glint, setGlint] = useState(0);

  // The coloured line runs from the start to the centre of the last completed stop.
  useLayoutEffect(() => {
    const measure = () => {
      const track = stepsRef.current;
      const stop = track?.querySelectorAll('.trail-stop')[filled - 1];
      if (!stop) return setFillScale(0);
      const t = track.getBoundingClientRect();
      const s = stop.getBoundingClientRect();
      setFillScale(Math.min(1, (s.left + s.width / 2 - (t.left - 10)) / (t.width + 20)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [filled, steps]);

  useEffect(() => {
    if (firstFill.current) { firstFill.current = false; return; }
    if (filled > 0) setGlint((n) => n + 1);
  }, [filled]);

  return <div className={'fish-trail ' + (home ? 'fish-trail--home' : '')}>
    {home && <p>Collect fish to feed your cat!</p>}
    <div className="trail-path" role="progressbar" aria-label={home ? 'Choose an adventure to collect fish' : 'Adventure progress'} aria-valuemin={0} aria-valuemax={steps} aria-valuenow={filled}>
      <span className="trail-start" aria-hidden="true"><CatAvatar size={56} /></span>
      <span className="trail-steps" ref={stepsRef}>
        <span className="trail-fill" style={{ transform: 'scaleX(' + fillScale + ')' }}>{glint > 0 && <span key={glint} className="trail-glint" />}</span>
        {Array.from({ length: steps }, (_, i) => <span key={i} className={'trail-stop ' + (i < filled ? 'is-complete' : '') + (i === filled ? ' is-current' : '')}>
          {i <= filled && <Fish width={30} height={23} />}
        </span>)}
      </span>
      <Bowl />
    </div>
  </div>;
}
// `value` lets the header hold the count back until the flying fish lands; `pulse` replays the landing animation.
export function FishBalance({ value, pulse = 0 }) {
  const { fish } = useAdventure();
  const count = value ?? fish;
  return <div key={'balance-' + pulse} className={'fish-balance' + (pulse ? ' is-landing' : '')} role="status" aria-label={count + ' fish'}><Fish width={48} height={34} /><span className="fish-count">{count}</span></div>;
}
export function Brand() {
  return <div className="brand"><img src={logo} alt="Catch Them Young" /><span>Learning<br />Adventures</span></div>;
}
export function ShellHeader({ progress = 0, steps = 3, onClose }) {
  const { fish } = useAdventure();
  const filled = Math.round(progress * steps);
  const headerRef = useRef(null);
  const flyRef = useRef(null);
  const ghostRefs = useRef([]);
  const prevFilled = useRef(filled);
  const latestFish = useRef(fish);
  const flying = useRef(false);
  // The balance only counts up once the fish reaches the bowl, so cause and effect line up.
  const [shown, setShown] = useState(fish);
  const [landed, setLanded] = useState(0);
  const [stopSpark, setStopSpark] = useState(null);
  const [bowlBurst, setBowlBurst] = useState(null);
  latestFish.current = fish;

  useEffect(() => {
    const earned = filled > prevFilled.current;
    prevFilled.current = filled;
    if (!earned) return undefined;
    const head = headerRef.current;
    const stop = head.querySelectorAll('.trail-stop')[filled - 1];
    const bowl = head.querySelector('.bowl-art');
    const cat = head.querySelector('.cat-avatar');
    const fly = flyRef.current;
    const hr = head.getBoundingClientRect();
    const centre = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2 - hr.left, y: r.top + r.height / 2 - hr.top }; };

    // Reduced motion and Calm mode: no flight and no burst, the count just updates.
    const calm = document.documentElement.dataset.calm === 'true';
    const still = calm || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const land = () => {
      flying.current = false;
      if (!calm) playRewardChime();
      setShown(latestFish.current);
      setLanded((n) => n + 1);
      if (bowl && !still) {
        const b = centre(bowl);
        setBowlBurst({ x: b.x, y: b.y, id: Date.now() });
        bowl.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.4, 0.72)', offset: 0.25 }, { transform: 'scale(0.9, 1.12)', offset: 0.55 }, { transform: 'scale(1)' }], { duration: 480, easing: EASE_OUT });
      }
      if (!still) cat?.animate([{ transform: 'translateY(0) rotate(0deg)' }, { transform: 'translateY(-16px) rotate(-7deg)', offset: 0.35 }, { transform: 'translateY(0) rotate(0deg)', offset: 0.7 }, { transform: 'translateY(-5px) rotate(3deg)', offset: 0.85 }, { transform: 'translateY(0) rotate(0deg)' }], { duration: 560, easing: EASE_OUT });
    };

    if (!stop || !bowl || !fly?.animate || still) { land(); return undefined; }

    flying.current = true;
    const a = centre(stop);
    const b = centre(bowl);
    const from = { x: a.x - FISH_W / 2, y: a.y - FISH_H / 2 };
    const to = { x: b.x - FISH_W / 2, y: b.y - FISH_H / 2 - 6 };
    const peak = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 26 };
    const at = (p, scale, deg) => 'translate(' + p.x + 'px, ' + p.y + 'px) scale(' + scale + ') rotate(' + deg + 'deg)';
    // The fish leaps out of the stop nose-up and drops nose-down into the bowl.
    const frames = (opacity) => [
      { transform: at(from, 0.3, -35), opacity: 0, offset: 0, easing: EASE_OUT },
      { transform: at(peak, 1.5, 0), opacity, offset: 0.35, easing: EASE_IN_OUT },
      { transform: at(to, 0.75, 45), opacity, offset: 1 },
    ];

    setStopSpark({ x: a.x, y: a.y, id: Date.now() });
    const trail = ghostRefs.current.map((ghost, i) => ghost?.animate(frames(TRAIL_OPACITY[i]), { duration: FLY_DURATION_MS - TRAIL_LAG_MS[i], delay: FLY_DELAY_MS + TRAIL_LAG_MS[i], fill: 'backwards' }));
    const anim = fly.animate(frames(1), { duration: FLY_DURATION_MS, delay: FLY_DELAY_MS, fill: 'backwards' });
    anim.onfinish = land;
    return () => { anim.cancel(); trail.forEach((t) => t?.cancel()); };
  }, [filled]);

  // Follow the real balance whenever no fish is in the air (page load, shop spending).
  useEffect(() => { if (!flying.current) setShown(fish); });

  return <header className="shell-header" ref={headerRef}>
    <button type="button" className="home-button" onClick={onClose} aria-label="Back to home"><Icon name="home" size={34} /><span>Home</span></button>
    <FishTrail progress={progress} steps={steps} /><FishBalance value={shown} pulse={landed} />
    {stopSpark && <Burst key={'stop-' + stopSpark.id} sparks={STOP_SPARKS} delay={STOP_SPARK_DELAY_MS} x={stopSpark.x} y={stopSpark.y} />}
    {bowlBurst && <Burst key={'bowl-' + bowlBurst.id} sparks={BOWL_SPARKS} x={bowlBurst.x} y={bowlBurst.y} />}
    {TRAIL_LAG_MS.map((lag, i) => <span key={'ghost-' + lag} className="fly-fish" ref={(node) => { ghostRefs.current[i] = node; }} aria-hidden="true"><Fish width={FISH_W} height={FISH_H} /></span>)}
    <span className="fly-fish" ref={flyRef} aria-hidden="true"><Fish width={FISH_W} height={FISH_H} /></span>
  </header>;
}
export function TitleRow({ audio, mascot, prompt }) {
  return <div className="title-row">{audio}{mascot || <Mochi size={64} />}<h1 className="prompt" tabIndex={-1}>{prompt}</h1></div>;
}

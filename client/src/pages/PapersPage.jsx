import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioButton from '../components/AudioButton.jsx';
import { Brand, FishBalance, FishTrail } from '../components/QuestionShell.jsx';
import { CatAvatar, Icon } from '../components/AdventureArt.jsx';
import AdventureDialog from '../components/AdventureDialog.jsx';
import mathCat from '../assets/cat-world/math-cat.webp';
import englishCat from '../assets/cat-world/english-cat.webp';
const subjects = [
  { id: 'math', title: 'Maths', subtitle: 'A little counting. A big adventure.', image: mathCat },
  { id: 'english', title: 'English', subtitle: 'Wonderful words are waiting.', image: englishCat },
];
export default function PapersPage() {
  const navigate = useNavigate();
  const [panel, setPanel] = useState(null);
  return <main className="canvas home-scene">
    <header className="home-header"><Brand /><div className="home-account"><FishBalance /><button className="profile-button" onClick={() => setPanel('Settings')} aria-label="Open settings"><CatAvatar size={62} /><Icon name="settings" size={18} /></button></div></header>
    <section className="home-content" aria-labelledby="home-title">
      <FishTrail home />
      <div className="home-heading"><h1 id="home-title">Choose a mission</h1><div className="home-subtitle"><p>Pick one to begin.</p><AudioButton text="Choose a mission. Pick one to begin. Collect fish to feed your cat." size={40} label="Listen to the welcome" /></div></div>
      <div className="subject-cards">{subjects.map((subject) => <article className={'subject-card-wrap subject-card-wrap--' + subject.id} key={subject.id}>
        <button className="subject-card" onClick={() => navigate('/papers/' + subject.id)} aria-label={'Start ' + subject.title + ' Adventure'}>
          <img className="subject-illustration" src={subject.image} alt="" />
          <span className="subject-name">{subject.title}<br />Adventure</span><span className="subject-description">{subject.subtitle}</span>
          <span className="subject-start">Start <Icon name="arrow" size={32} /></span>
        </button>
        <AudioButton className="subject-audio" text={subject.title + ' Adventure. ' + subject.subtitle + ' Press start to begin.'} size={44} label={'Listen to ' + subject.title + ' Adventure'} />
      </article>)}</div>
      <p className="home-note"><span aria-hidden="true">✧</span> Little steps. Lovely discoveries.</p>
    </section>
    <nav className="room-nav" aria-label="Your cat's corner">{[['Shop', 'shop'], ['Wardrobe', 'wardrobe'], ['My Badges', 'badge']].map(([title, icon]) => <button key={title} onClick={() => setPanel(title)}><Icon name={icon} size={30} /><span>{title}</span></button>)}</nav>
    {panel && <AdventureDialog panel={panel} onClose={() => setPanel(null)} />}
  </main>;
}

import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getPaper } from '../data/papers.js';
import { stopSpeaking } from '../lib/speak.js';
import { Brand, ShellHeader } from '../components/QuestionShell.jsx';
import { CatAvatar, Icon } from '../components/AdventureArt.jsx';
import AudioButton from '../components/AudioButton.jsx';
export default function DonePage() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const paper = getPaper(subject);
  useEffect(() => { document.querySelector('.done-title')?.focus(); return stopSpeaking; }, []);
  if (!paper) return <Navigate to="/papers" replace />;
  const earned = state?.earned ?? 0;
  return <main className="canvas done-scene">
    <ShellHeader progress={earned ? 1 : 0} steps={paper.questions.length} onClose={() => navigate('/papers')} />
    <section className="done">
      <span className="done-sparkles" aria-hidden="true">✧ <CatAvatar size={150} /> ✧</span>
      <h1 className="done-title" tabIndex={-1}>{earned ? 'Mission complete!' : 'Ready for an adventure?'}</h1>
      <p className="done-subtitle">{earned ? 'Lovely learning. Your cat says thank you!' : 'A little discovery is waiting for you.'}</p>
      {earned > 0 && <p className="earned-fish">{earned} fish collected <Icon name="check" size={24} /></p>}
      <AudioButton size={52} text={earned ? 'Mission complete! Lovely learning. Your cat says thank you. ' + earned + ' fish collected. Choose another mission to keep exploring.' : 'Ready for an adventure? Choose a mission to begin.'} label="Listen to your adventure message" />
      <button className="primary-button" onClick={() => navigate('/papers')}>Choose a mission <Icon name="arrow" /></button>
    </section>
    <footer className="question-brand"><Brand /></footer>
  </main>;
}

import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getPaper } from '../data/papers.js';
import { speak, stopSpeaking } from '../lib/speak.js';
import { ShellHeader } from '../components/QuestionShell.jsx';
import { Mochi } from '../components/art/Art.jsx';

// No score, no "x out of y", nothing about which answers were right.
export default function DonePage() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const paper = getPaper(subject);

  useEffect(() => {
    speak('All done! Great work.');
    return stopSpeaking;
  }, []);

  if (!paper) return <Navigate to="/papers" replace />;

  return (
    <main className="canvas">
      <ShellHeader progress={1} onClose={() => navigate('/papers')} />
      <div className="done">
        <Mochi size={200} />
        <h1 className="done-title">All done!</h1>
        <p className="done-subtitle">Great work.</p>
        <button type="button" className="primary-button" onClick={() => navigate('/papers')}>
          Back to papers
        </button>
      </div>
    </main>
  );
}

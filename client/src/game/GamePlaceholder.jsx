import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../design/brand/cty-logo.webp';
import AudioButton from '../components/AudioButton.jsx';
import { useSession } from '../auth/session.jsx';
import { saveResult } from './results.js';
import '../auth/login.css';

// Placeholder for the student game. Replace with the real activities.
export default function GamePlaceholder() {
  const { signOut } = useSession();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(0);

  async function logout() {
    await signOut();
    navigate('/login', { replace: true });
  }

  // Development only: saves a made-up answer so the dashboard pipeline can be tested.
  async function saveTestAnswer() {
    const n = saved + 1;
    await saveResult({ subject: 'English', topic: 'Sight words', questionId: `test-${Date.now()}`, correct: n % 2 === 1 });
    setSaved(n);
  }

  return (
    <div className="login">
      <div className="login-card">
        <img className="login-logo" src={logo} alt="Catch Them Young" />
        <div className="login-prompt">
          <h1>Game coming soon</h1>
          <AudioButton text="Game coming soon" />
        </div>
        {import.meta.env.DEV && (
          <button type="button" className="link-btn" onClick={saveTestAnswer}>
            Dev: save a test answer {saved > 0 && `(${saved} saved)`}
          </button>
        )}
        <button type="button" className="primary" onClick={logout}>Back</button>
      </div>
    </div>
  );
}

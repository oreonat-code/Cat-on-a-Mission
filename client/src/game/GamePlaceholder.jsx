import logo from '../../../design/brand/cty-logo.webp';
import AudioButton from '../components/AudioButton.jsx';
import '../auth/login.css';

// Placeholder for the student game. Replace with the real activities.
export default function GamePlaceholder({ onLogout }) {
  return (
    <div className="login">
      <div className="login-card">
        <img className="login-logo" src={logo} alt="Catch Them Young" />
        <div className="login-prompt">
          <h1>Game coming soon</h1>
          <AudioButton text="Game coming soon" />
        </div>
        <button type="button" className="primary" onClick={onLogout}>Back</button>
      </div>
    </div>
  );
}

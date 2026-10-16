import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../design/brand/cty-logo.webp';
import AudioButton from '../components/AudioButton.jsx';
import { lookupId, teacherLogin } from './accounts.js';
import { homePathFor, useSession } from './session.jsx';
import './login.css';

const ID_PROMPT = 'Type your ID, then press Next.';
const UNKNOWN_ID = "We couldn't find that ID. Check it and try again.";

export default function LoginPage() {
  const { session, signIn } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // step: 'id' until a teacher ID is found, then 'password'
  const [step, setStep] = useState('id');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (step === 'password') passwordRef.current?.focus();
  }, [step]);

  // After sign-in, return to the page that sent us here if it belongs to this role.
  function finish(next) {
    signIn(next);
    const home = homePathFor(next.role);
    const from = location.state?.from;
    navigate(from?.startsWith(home) ? from : home, { replace: true });
  }

  if (session) return <Navigate to={homePathFor(session.role)} replace />;

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setMessage('');

    if (step === 'id' && !id.trim()) return setMessage('Type your ID first.');
    if (step === 'password' && !password) return setMessage('Type your password first.');

    setBusy(true);
    try {
      if (step === 'id') {
        const result = await lookupId(id);
        if (result.role === 'student') return finish(result);
        if (result.role === 'teacher') return setStep('password');
        return setMessage(UNKNOWN_ID);
      }
      const result = await teacherLogin(id, password);
      if (result) return finish(result);
      setPassword('');
      setMessage('That password did not match. Try again.');
    } catch (err) {
      setMessage(err.status === 429 ? 'Too many tries. Wait a few minutes, then try again.' : 'Something went wrong. Try again.');
    } finally {
      setBusy(false);
    }
  }

  function changeId() {
    setStep('id');
    setPassword('');
    setMessage('');
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={submit} noValidate>
        <img className="login-logo" src={logo} alt="Catch Them Young" />

        <div className="login-prompt">
          <h1>Welcome!</h1>
          <AudioButton text={step === 'id' ? ID_PROMPT : 'Type your password, then press Log in.'} size={44} lip={4} />
        </div>

        <label className="field">
          <span>Your ID</span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            readOnly={step === 'password'}
            autoComplete="username"
            autoCapitalize="characters"
            spellCheck="false"
            autoFocus
          />
        </label>

        {step === 'password' && (
          <>
            <button type="button" className="link-btn" onClick={changeId}>Use a different ID</button>
            <label className="field">
              <span>Password</span>
              <input
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </label>
          </>
        )}

        <div className="login-msg" role="status" aria-live="polite">
          {message && (
            <p className="retry">
              {message}
              <AudioButton text={message} size={44} lip={4} />
            </p>
          )}
        </div>

        <button type="submit" className="primary" disabled={busy}>
          {step === 'id' ? 'Next' : 'Log in'}
        </button>
      </form>
    </div>
  );
}

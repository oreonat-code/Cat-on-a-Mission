import { useEffect, useRef, useState } from 'react';
import logo from '../../../design/brand/cty-logo.webp';
import AudioButton from '../components/AudioButton.jsx';
import { checkTeacherPassword, lookupId } from './accounts.js';
import './login.css';

const ID_PROMPT = 'Type your ID, then press Next.';
const UNKNOWN_ID = "We couldn't find that ID. Check it and try again.";

export default function LoginPage({ onStudent, onTeacher }) {
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

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setMessage('');

    if (step === 'id') {
      if (!id.trim()) return setMessage('Type your ID first.');
      setBusy(true);
      const role = await lookupId(id);
      setBusy(false);
      if (role === 'student') return onStudent(id.trim().toUpperCase());
      if (role === 'teacher') return setStep('password');
      return setMessage(UNKNOWN_ID);
    }

    if (!password) return setMessage('Type your password first.');
    setBusy(true);
    const ok = await checkTeacherPassword(id, password);
    setBusy(false);
    if (ok) return onTeacher(id.trim().toUpperCase());
    setPassword('');
    setMessage('That password did not match. Try again.');
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
          <AudioButton text={step === 'id' ? ID_PROMPT : 'Type your password, then press Log in.'} />
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
              <AudioButton text={message} />
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

import { useEffect, useState } from 'react';
import { canSpeak, speak, stopSpeaking } from '../lib/speak.js';
import { SpeakerIcon } from './art/Art.jsx';

// Round blue speaker button with a solid lip. Icon is half the button size, as in artboard 6.
export default function AudioButton({ text, size = 96, lip = 6, label = 'Listen', className = '' }) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => stopSpeaking, []);

  if (!canSpeak) return null;

  function handleClick(e) {
    e.stopPropagation();
    speak(text, { onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false) });
  }

  return (
    <button
      type="button"
      className={`audio-button ${speaking ? 'is-speaking' : ''} ${className}`}
      style={{ width: size, height: size, '--lip': `${lip}px` }}
      onClick={handleClick}
      aria-label={label}
    >
      <SpeakerIcon size={size / 2} />
    </button>
  );
}

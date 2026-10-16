// Reads text aloud with the browser's built-in speech. Hidden when the browser has none.
export default function AudioButton({ text, label = 'Listen' }) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  function speak() {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  return (
    <button type="button" className="audio-btn" onClick={speak} aria-label={`${label}: ${text}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4z" className="audio-fill" />
        <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" className="audio-stroke" fill="none" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

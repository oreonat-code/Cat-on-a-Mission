// Thin wrapper over the Web Speech API (browser text-to-speech).
export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

const PREFERRED_LANGS = ['en-SG', 'en-GB', 'en-AU'];

function pickVoice() {
  const voices = window.speechSynthesis.getVoices();
  const norm = (v) => v.lang.replace('_', '-');
  for (const lang of PREFERRED_LANGS) {
    const match = voices.find((v) => norm(v) === lang);
    if (match) return match;
  }
  return voices.find((v) => norm(v).startsWith('en')) ?? null;
}

// Voices load asynchronously in Chrome; touching getVoices early warms the list.
if (canSpeak) window.speechSynthesis.getVoices();

export function speak(text, { onStart, onEnd } = {}) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = voice?.lang ?? 'en-GB';
  utterance.rate = 0.9;
  utterance.pitch = 1.05;
  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (canSpeak) window.speechSynthesis.cancel();
}

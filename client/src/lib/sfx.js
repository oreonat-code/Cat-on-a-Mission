// Small synthesized sound effects (Web Audio), so there are no audio files to ship or license.
let ctx;

function getContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextClass) return null;
  ctx ??= new AudioContextClass();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// One bell-like note: a sine fundamental plus a quiet octave above, sharp attack, exponential decay.
function ding(audio, { freq, start, length, gain }) {
  const out = audio.createGain();
  out.gain.setValueAtTime(0.0001, start);
  out.gain.exponentialRampToValueAtTime(gain, start + 0.008);
  out.gain.exponentialRampToValueAtTime(0.0001, start + length);
  out.connect(audio.destination);

  [[freq, 1], [freq * 2, 0.25]].forEach(([f, level]) => {
    const osc = audio.createOscillator();
    const partial = audio.createGain();
    osc.type = 'sine';
    osc.frequency.value = f;
    partial.gain.value = level;
    osc.connect(partial).connect(out);
    osc.start(start);
    osc.stop(start + length + 0.05);
  });
}

// Bright two-note rise (E6 then B6) played when a reward lands.
export function playRewardChime() {
  const audio = getContext();
  if (!audio) return;
  const now = audio.currentTime;
  ding(audio, { freq: 1318.5, start: now, length: 0.22, gain: 0.18 });
  ding(audio, { freq: 1975.5, start: now + 0.09, length: 0.55, gain: 0.2 });
}

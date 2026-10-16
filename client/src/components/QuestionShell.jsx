import { CloseIcon, Star } from './art/Art.jsx';

// Header row from artboard 6: close, progress bar, star pill.
export function ShellHeader({ progress, stars, onClose }) {
  return (
    <div className="shell-header">
      <button type="button" className="close-button" onClick={onClose} aria-label="Close">
        <CloseIcon />
      </button>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      {stars !== undefined && (
        <div className="star-pill">
          <Star />
          <span className="star-count">{stars}</span>
          <span className="sr-only">stars</span>
        </div>
      )}
    </div>
  );
}

// Audio button + optional mascot + prompt. Gap and top padding differ per artboard.
export function TitleRow({ audio, mascot, prompt, gap, paddingTop = 0 }) {
  return (
    <div className="title-row" style={{ gap, paddingTop }}>
      {audio}
      {mascot}
      <h1 className="prompt">{prompt}</h1>
    </div>
  );
}

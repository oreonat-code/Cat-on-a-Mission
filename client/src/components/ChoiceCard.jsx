import { useState } from 'react';
import AudioButton from './AudioButton.jsx';

// A tappable answer card. `variant` picks the size set from the artboard (math or word).
export default function ChoiceCard({ label, variant, used, disabled, height, onChoose }) {
  return (
    <button
      type="button"
      className={`choice choice--${variant} ${used ? 'is-used' : ''}`}
      style={{ height }}
      disabled={disabled}
      onClick={onChoose}
    >
      <span className="choice-label">{label}</span>
    </button>
  );
}

export function ChoiceRow({ choices, variant, isUsed, isDisabled, onChoose, gap, paddingTop, cardHeight }) {
  return (
    <div className="choice-row" style={{ gap, paddingTop }}>
      {choices.map((choice) => (
        <div className="choice-with-audio" key={choice}>
        <ChoiceCard
          key={choice}
          label={choice}
          variant={variant}
          used={isUsed(choice)}
          disabled={isDisabled(choice)}
          height={cardHeight}
          onChoose={() => onChoose(choice)}
        />
        <AudioButton text={String(choice)} size={40} label={`Listen to answer: ${choice}`} />
        </div>
      ))}
    </div>
  );
}

// One slot, one tap: the first choice is final and completes the question.
export function useSingleChoice(question, onComplete) {
  const [chosen, setChosen] = useState();
  const answered = chosen !== undefined;

  function choose(value) {
    if (answered) return;
    setChosen(value);
    onComplete({ chosen: value, correct: value === question.answer });
  }

  return {
    chosen,
    choose,
    isUsed: (choice) => answered && chosen === choice,
    isDisabled: () => answered,
  };
}

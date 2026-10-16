// A tappable answer card. `variant` picks the size set from the artboard (math or word).
export default function ChoiceCard({ label, variant, used, disabled, onChoose }) {
  return (
    <button
      type="button"
      className={`choice choice--${variant} ${used ? 'is-used' : ''}`}
      disabled={disabled}
      onClick={onChoose}
    >
      <span className="choice-label">{label}</span>
    </button>
  );
}

export function ChoiceRow({ question, variant, chosen, onChoose, gap, paddingTop }) {
  const answered = chosen !== undefined;
  return (
    <div className="choice-row" style={{ gap, paddingTop }}>
      {question.choices.map((choice) => (
        <ChoiceCard
          key={choice}
          label={choice}
          variant={variant}
          used={answered && chosen === choice}
          disabled={answered}
          onChoose={() => onChoose(choice)}
        />
      ))}
    </div>
  );
}

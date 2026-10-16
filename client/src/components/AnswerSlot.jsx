// Dashed answer slot. Turns solid once filled; never shows right or wrong.
export default function AnswerSlot({ value, variant, width }) {
  const filled = value !== undefined;
  return (
    <div className={`slot slot--${variant} ${filled ? 'is-filled' : ''}`} style={{ width }} aria-live="polite">
      {filled ? <span className="slot-value">{value}</span> : <span className="sr-only">blank</span>}
    </div>
  );
}

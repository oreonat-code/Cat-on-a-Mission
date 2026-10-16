import { useState } from 'react';
import AudioButton from '../AudioButton.jsx';
import { ChoiceRow } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { BLANK, choicesText, joinSpeech } from '../../lib/speech-text.js';

export function buildSpeech(question, placed = []) {
  const cells = [...question.given, ...Array.from({ length: question.slots }, (_, i) => placed[i] ?? BLANK)];
  return joinSpeech(question.prompt, `Each hop adds ${question.step}.`, `${cells.join(', ')}.`, choicesText(question.choices));
}

// Native grid cells and connecting arcs share their geometry, so labels and hops stay aligned.
export default function NumberTrack({ question, onComplete }) {
  const [placed, setPlaced] = useState([]);
  const done = placed.length === question.slots;
  const cells = [...question.given, ...placed];
  const total = question.given.length + question.slots;

  function choose(value) {
    if (done || placed.includes(value)) return;
    const next = [...placed, value];
    setPlaced(next);
    if (next.length === question.slots) {
      onComplete({ chosen: next, correct: next.every((v, i) => v === question.answer[i]) });
    }
  }

  return <>
    <TitleRow audio={<AudioButton text={buildSpeech(question, placed)} size={96} />} prompt={question.prompt} />
    <div className="picture-panel picture-panel--track">
      <ol className="number-path" style={{ '--track-cells': total }} aria-label="Number path" aria-live="polite">
        {Array.from({ length: total }, (_, i) => {
          const filled = i < cells.length;
          const active = i === cells.length;
          return <li className="number-path-step" key={i}>
            {i > 0 && <div className={`number-hop ${i <= cells.length ? 'number-hop--solid' : ''}`} aria-hidden="true">
              <span>+{question.step}</span>
              <svg viewBox="0 0 160 80" preserveAspectRatio="none"><path d="M8 70Q80 -8 152 70" /></svg>
            </div>}
            <div className={`track-cell ${filled ? 'track-cell--filled' : active ? 'track-cell--active' : 'track-cell--empty'}`}>
              {filled ? <>{cells[i]}<span className="sr-only">, step {i + 1}</span></> : <span className="sr-only">{active ? 'Next blank' : 'Blank'}, step {i + 1}</span>}
            </div>
          </li>;
        })}
      </ol>
    </div>
    <ChoiceRow choices={question.choices} variant="math"
      isUsed={(choice) => placed.includes(choice)} isDisabled={(choice) => done || placed.includes(choice)}
      onChoose={choose} />
  </>;
}

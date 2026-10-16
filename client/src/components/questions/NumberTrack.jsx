import { useState } from 'react';
import AudioButton from '../AudioButton.jsx';
import { ChoiceRow } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { BLANK, choicesText, joinSpeech } from '../../lib/speech-text.js';

// Track geometry from artboard J3-0: panel content is 1104 wide (1440 − 2×120 margin − 2×48 padding),
// with 20px side padding and 180px cards spread by space-between.
const TRACK_WIDTH = 1104;
const TRACK_INSET = 20;
const CARD_WIDTH = 180;

function cardCentres(count) {
  const pitch = (TRACK_WIDTH - 2 * TRACK_INSET - CARD_WIDTH) / (count - 1);
  return Array.from({ length: count }, (_, i) => TRACK_INSET + CARD_WIDTH / 2 + i * pitch);
}

export function buildSpeech(question, placed = []) {
  const cells = [...question.given, ...Array.from({ length: question.slots }, (_, i) => placed[i] ?? BLANK)];
  return joinSpeech(question.prompt, `${cells.join(', ')}.`, choicesText(question.choices));
}

// Artboard J3-0 · Math: count by 100. Each tap fills the next empty slot, left to right.
export default function NumberTrack({ question, onComplete }) {
  const [placed, setPlaced] = useState([]);
  const done = placed.length === question.slots;
  const filledCount = question.given.length + placed.length;
  const cells = [...question.given, ...placed];
  const total = question.given.length + question.slots;
  const centres = cardCentres(total);

  function choose(value) {
    if (done || placed.includes(value)) return;
    const next = [...placed, value];
    setPlaced(next);
    if (next.length === question.slots) {
      onComplete({ chosen: next, correct: next.every((v, i) => v === question.answer[i]) });
    }
  }

  return (
    <>
      <TitleRow
        audio={<AudioButton text={buildSpeech(question, placed)} size={96} />}
        prompt={question.prompt}
        gap={24}
        paddingTop={12}
      />

      <div className="picture-panel picture-panel--track">
        <svg width={TRACK_WIDTH} height="90" viewBox={`0 0 ${TRACK_WIDTH} 90`} aria-hidden="true" className="art">
          {centres.slice(0, -1).map((from, i) => {
            const to = centres[i + 1];
            // Solid into every filled cell and the one being filled now; dotted after that.
            const solid = i + 1 <= filledCount;
            return (
              <path
                key={i}
                d={`M${from} 80Q${(from + to) / 2} 0 ${to} 80`}
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={solid ? undefined : '2 12'}
                style={{ stroke: 'var(--pc-blue)' }}
              />
            );
          })}
        </svg>
        <div className="track" aria-live="polite">
          {Array.from({ length: total }, (_, i) => {
            if (i < cells.length) {
              return (
                <div key={i} className="track-cell track-cell--filled">
                  {cells[i]}
                </div>
              );
            }
            const active = i === filledCount;
            return (
              <div key={i} className={`track-cell ${active ? 'track-cell--active' : 'track-cell--empty'}`}>
                <span className="sr-only">blank</span>
              </div>
            );
          })}
        </div>
      </div>

      <ChoiceRow
        choices={question.choices}
        variant="math"
        isUsed={(choice) => placed.includes(choice)}
        isDisabled={(choice) => done || placed.includes(choice)}
        onChoose={choose}
        gap={24}
        paddingTop={40}
      />
    </>
  );
}

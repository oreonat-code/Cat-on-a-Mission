import { useState } from 'react';
import AudioButton from '../AudioButton.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Mochi } from '../art/Art.jsx';
import sofaCat from '../../assets/cat-world/sofa-cat.webp';
import { BLANK, choicesText, joinSpeech } from '../../lib/speech-text.js';

const PICTURES = {
  'mochi-on-sofa': sofaCat,
};

// "DOES WHAT?" -> "Does what?" so text-to-speech doesn't spell capitals out as letters.
const spoken = (label) => label.charAt(0) + label.slice(1).toLowerCase();

export function buildSpeech(question, placed = {}) {
  const slots = question.slots.map((slot) => `${spoken(slot.label)} ${placed[slot.key] ?? BLANK}.`);
  return joinSpeech(
    question.prompt,
    `${spoken(question.given.label)} ${question.given.text}.`,
    ...slots,
    choicesText(question.tiles.map((t) => t.text))
  );
}

// Artboard TQ-0 · Who / does what / where. A tile goes into the slot of its own colour;
// the slot labels carry the meaning too, so colour is never the only cue.
export default function SentenceBuilder({ question, onComplete }) {
  const [placed, setPlaced] = useState({});
  const done = question.slots.every((slot) => placed[slot.key] !== undefined);
  const picture = PICTURES[question.picture];

  function place(tile) {
    if (placed[tile.slot] !== undefined) return;
    const next = { ...placed, [tile.slot]: tile.text };
    setPlaced(next);
    if (question.slots.every((slot) => next[slot.key] !== undefined)) {
      onComplete({
        chosen: next,
        correct: question.slots.every((slot) => next[slot.key] === question.answer[slot.key]),
      });
    }
  }

  return (
    <>
      <TitleRow
        audio={<AudioButton text={buildSpeech(question, placed)} size={84} />}
        mascot={<Mochi size={76} />}
        prompt={question.prompt}
        gap={22}
      />

      <div className="builder-picture-wrap">
        <div className="picture-panel picture-panel--builder" role="img" aria-label={question.pictureLabel}>
          {picture && <img className="story-scene-image" src={picture} alt="" />}
        </div>
      </div>

      <div className="builder-slots">
        <div className="builder-col">
          <span className="builder-label builder-label--blue">{question.given.label}</span>
          <div className="builder-slot builder-slot--given">
            <span className="builder-slot-text">{question.given.text}</span>
          </div>
        </div>
        {question.slots.map((slot) => {
          const value = placed[slot.key];
          return (
            <div key={slot.key} className="builder-col">
              <span className={`builder-label builder-label--${slot.colour}`}>{slot.label}</span>
              <div
                className={`builder-slot builder-slot--${slot.colour} ${value !== undefined ? 'is-filled' : ''}`}
                aria-live="polite"
              >
                {value !== undefined ? (
                  <span className="builder-slot-text slot-value">{value}</span>
                ) : (
                  <span className="sr-only">blank</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="tile-row tile-row--flat" role="group" aria-label="Word choices">
        {question.tiles.map((tile) => {
          const slot = question.slots.find((s) => s.key === tile.slot);
          return (
            <div className="tile-with-audio" key={tile.text}>
              <button type="button" className={`word-tile tile--${slot.colour} ${placed[tile.slot] === tile.text ? 'is-used' : ''}`}
                disabled={done || placed[tile.slot] !== undefined} onClick={() => place(tile)}>
                {tile.text}<span className="sr-only"> ({spoken(slot.label)})</span>
              </button>
              <AudioButton text={tile.text} size={36} label={`Listen to answer: ${tile.text}`} />
            </div>
          );
        })}
      </div>
      <p className="builder-hint">Orange words say what happens. Green words say where. Match the colours and shapes.</p>
    </>
  );
}

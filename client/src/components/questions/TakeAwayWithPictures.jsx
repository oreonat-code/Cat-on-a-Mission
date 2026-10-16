import AudioButton from '../AudioButton.jsx';
import Equation, { equationText } from '../Equation.jsx';
import { ChoiceRow, useSingleChoice } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { FishSet } from '../art/QuestionArt.jsx';
import { choicesText, joinSpeech } from '../../lib/speech-text.js';

export function buildSpeech(question, chosen) {
  return joinSpeech(
    question.prompt,
    'Count the fish still here. Fish with dashed outlines and arrows swam away.',
    equationText(question.start, '−', question.takeAway, chosen),
    choicesText(question.choices)
  );
}

// Departed fish keep dashed silhouettes and arrows so colour is never the only cue.
export default function TakeAwayWithPictures({ question, onComplete }) {
  const { start, takeAway } = question;
  const left = start - takeAway;
  const { chosen, choose, isUsed, isDisabled } = useSingleChoice(question, onComplete);
  return (
    <>
      <TitleRow
        audio={<AudioButton text={buildSpeech(question, chosen)} size={96} />}
        prompt={question.prompt}
        gap={24}
        paddingTop={12}
      />

      <div
        className="picture-panel picture-panel--takeaway"
        role="group"
        aria-label={`${start} fish. ${takeAway} swim away.`}
      >
        <div className="fish-scene-group fish-scene-group--remaining"><FishSet count={left} /></div>
        <div className="swim-away-divider" aria-hidden="true">→</div>
        <div className="fish-scene-group fish-scene-group--away"><FishSet count={takeAway} departed /></div>
      </div>

      <Equation left={start} op="−" right={takeAway} chosen={chosen} paddingTop={32} />

      <ChoiceRow
        choices={question.choices}
        variant="math"
        isUsed={isUsed}
        isDisabled={isDisabled}
        onChoose={choose}
        gap={28}
        paddingTop={32}
        cardHeight={104}
      />
    </>
  );
}

import AudioButton from '../AudioButton.jsx';
import Equation, { equationText } from '../Equation.jsx';
import { ChoiceRow, useSingleChoice } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { FishSet } from '../art/QuestionArt.jsx';
import { choicesText, joinSpeech } from '../../lib/speech-text.js';

export function buildSpeech(question, chosen) {
  const { left, right } = question;
  return joinSpeech(question.prompt, `${left.count} fish plus ${right.count} fish.`, equationText(left.count, '+', right.count, chosen), choicesText(question.choices));
}

// Illustrated groups are rendered from the question counts, keeping every fish countable.
export default function AddWithPictures({ question, onComplete }) {
  const { left, right } = question;
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
        className="picture-panel picture-panel--math"
        role="group"
        aria-label="Two groups of fish"
      >
        <div className="fish-scene-group"><FishSet {...left} /></div>
        <div className="panel-plus" aria-hidden="true">+</div>
        <div className="fish-scene-group"><FishSet {...right} /></div>
      </div>

      <Equation left={left.count} op="+" right={right.count} chosen={chosen} paddingTop={28} />

      <ChoiceRow
        choices={question.choices}
        variant="math"
        isUsed={isUsed}
        isDisabled={isDisabled}
        onChoose={choose}
        gap={28}
        paddingTop={36}
      />
    </>
  );
}

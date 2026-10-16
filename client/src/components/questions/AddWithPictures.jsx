import AudioButton from '../AudioButton.jsx';
import Equation, { equationText } from '../Equation.jsx';
import { ChoiceRow, useSingleChoice } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Fish } from '../art/Art.jsx';
import { choicesText, joinSpeech } from '../../lib/speech-text.js';

export function buildSpeech(question, chosen) {
  const { left, right } = question;
  return joinSpeech(question.prompt, equationText(left.count, '+', right.count, chosen), choicesText(question.choices));
}

// Artboard 6 · Math: add with pictures.
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
        role="img"
        aria-label={`${left.count} ${left.colour} fish and ${right.count} ${right.colour} fish`}
      >
        <FishGroup {...left} />
        <div className="panel-plus" aria-hidden="true">+</div>
        <FishGroup {...right} />
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

function FishGroup({ count, colour }) {
  return (
    <div className="fish-group">
      {Array.from({ length: count }, (_, i) => (
        <Fish key={i} colour={colour} />
      ))}
    </div>
  );
}

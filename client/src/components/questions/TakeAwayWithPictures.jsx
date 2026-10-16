import AudioButton from '../AudioButton.jsx';
import Equation, { equationText } from '../Equation.jsx';
import { ChoiceRow, useSingleChoice } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Fish } from '../art/Art.jsx';
import { choicesText, joinSpeech } from '../../lib/speech-text.js';

export function buildSpeech(question, chosen) {
  return joinSpeech(
    question.prompt,
    equationText(question.start, '−', question.takeAway, chosen),
    choicesText(question.choices)
  );
}

// Artboard J2-0 · Math: take away. Fish that stay are solid; fish that left are dashed outlines.
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
        role="img"
        aria-label={`${start} fish. ${takeAway} swim away. ${left} are left.`}
      >
        {Array.from({ length: left }, (_, i) => (
          <Fish key={`stay-${i}`} colour="orange" />
        ))}
        <div className="takeaway-divider" />
        {Array.from({ length: takeAway }, (_, i) => (
          <Fish key={`gone-${i}`} outline />
        ))}
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

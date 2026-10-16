import AudioButton from '../AudioButton.jsx';
import AnswerSlot from '../AnswerSlot.jsx';
import { ChoiceRow } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Mochi, SleepingCat } from '../art/Art.jsx';

const PICTURES = {
  'three-sleeping-cats': () => (
    <>
      <SleepingCat colour="orange" />
      <SleepingCat colour="light" />
      <SleepingCat colour="slate" />
    </>
  ),
};

// Artboard 22 · Grammar: is / are.
export default function FillTheGap({ question, chosen, onChoose }) {
  const Picture = PICTURES[question.picture];
  return (
    <>
      <TitleRow
        audio={<AudioButton text={question.speech} size={84} />}
        mascot={<Mochi size={76} />}
        prompt={question.prompt}
        gap={22}
      />

      <div className="picture-wrap">
        <div className="picture-panel picture-panel--word" role="img" aria-label={question.pictureLabel}>
          {Picture && <Picture />}
        </div>
      </div>

      <div className="sentence">
        <span>{question.before}</span>
        <AnswerSlot variant="word" value={chosen} />
        <span>{question.after}</span>
      </div>

      <ChoiceRow question={question} variant="word" chosen={chosen} onChoose={onChoose} gap={32} paddingTop={40} />
    </>
  );
}

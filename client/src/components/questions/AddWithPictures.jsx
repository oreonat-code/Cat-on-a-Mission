import AudioButton from '../AudioButton.jsx';
import AnswerSlot from '../AnswerSlot.jsx';
import { ChoiceRow } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Fish } from '../art/Art.jsx';

// Artboard 6 · Math: add with pictures.
export default function AddWithPictures({ question, chosen, onChoose }) {
  const { left, right } = question;
  return (
    <>
      <TitleRow
        audio={<AudioButton text={question.speech} size={96} />}
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

      <div className="equation">
        <span className="eq-num">{left.count}</span>
        <span className="eq-op">+</span>
        <span className="eq-num">{right.count}</span>
        <span className="eq-op">=</span>
        <AnswerSlot variant="math" value={chosen} />
      </div>

      <ChoiceRow question={question} variant="math" chosen={chosen} onChoose={onChoose} gap={28} paddingTop={36} />
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

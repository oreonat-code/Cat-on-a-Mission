import AudioButton from '../AudioButton.jsx';
import AnswerSlot from '../AnswerSlot.jsx';
import { ChoiceRow, useSingleChoice } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Cat, Mochi } from '../art/Art.jsx';
import { BLANK, choicesText, joinSpeech, sentenceText } from '../../lib/speech-text.js';
import sleepingCats from '../../assets/cat-world/sleeping-cats.webp';

// Each picture keeps its own spacing from its artboard, and any text it shows (read aloud).
const PICTURES = {
  // Artboard 22 · is / are
  'three-sleeping-cats': {
    choicesTop: 40,
    render: ({ label }) => (
      <div className="picture-wrap">
        <div className="picture-panel picture-panel--word" role="img" aria-label={label}>
          <img className="sleeping-cats-picture" src={sleepingCats} alt="" />
        </div>
      </div>
    ),
  },
  // Artboard TT-0 · one or many
  'one-vs-many-cats': {
    choicesTop: 36,
    speech: 'One cat. Three cats.',
    render: () => (
      <div className="picture-cards">
        <div className="picture-card picture-card--wash">
          <Cat colour="orange" size={120} />
          <span className="picture-card-label">one cat</span>
        </div>
        <div className="picture-card picture-card--seafoam">
          <div className="picture-card-art">
            <Cat colour="orange" size={110} />
            <Cat colour="light" size={110} />
            <Cat colour="slate" size={110} />
          </div>
          <span className="picture-card-label">three cats</span>
        </div>
      </div>
    ),
  },
};

export function buildSpeech(question, chosen) {
  return joinSpeech(
    question.prompt,
    PICTURES[question.picture]?.speech,
    sentenceText(question.before, chosen ?? BLANK, question.after),
    choicesText(question.choices)
  );
}

// Fill one gap in a sentence (artboards 22 and TT-0).
export default function FillTheGap({ question, onComplete }) {
  const picture = PICTURES[question.picture];
  const { chosen, choose, isUsed, isDisabled } = useSingleChoice(question, onComplete);
  return (
    <>
      <TitleRow
        audio={<AudioButton text={buildSpeech(question, chosen)} size={84} />}
        mascot={<Mochi size={76} />}
        prompt={question.prompt}
        gap={22}
      />

      {picture && <picture.render label={question.pictureLabel} />}

      <div className="sentence">
        <span>{question.before}</span>
        <AnswerSlot variant="word" value={chosen} width={question.slotWidth} />
        <span>{question.after}</span>
      </div>

      <ChoiceRow
        choices={question.choices}
        variant="word"
        isUsed={isUsed}
        isDisabled={isDisabled}
        onChoose={choose}
        gap={32}
        paddingTop={picture?.choicesTop ?? 40}
      />
    </>
  );
}

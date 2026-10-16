import AudioButton from '../AudioButton.jsx';
import AnswerSlot from '../AnswerSlot.jsx';
import { ChoiceRow, useSingleChoice } from '../ChoiceCard.jsx';
import { TitleRow } from '../QuestionShell.jsx';
import { Mochi } from '../art/Art.jsx';
import { StoryCat } from '../art/QuestionArt.jsx';
import { BLANK, choicesText, joinSpeech, sentenceText } from '../../lib/speech-text.js';
import sleepingCats from '../../assets/cat-world/sleeping-cats.webp';

// All picture text is included in the main read-aloud and has a local audio control.
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
          <div className="counting-cats" role="img" aria-label="One cat"><StoryCat /></div>
          <div className="picture-card-caption"><span className="picture-card-label">one cat</span><AudioButton text="One cat" size={36} label="Listen: one cat" /></div>
        </div>
        <div className="picture-card picture-card--seafoam">
          <div className="counting-cats" role="img" aria-label="Three cats">
            {Array.from({ length: 3 }, (_, i) => <StoryCat key={i} />)}
          </div>
          <div className="picture-card-caption"><span className="picture-card-label">three cats</span><AudioButton text="Three cats" size={36} label="Listen: three cats" /></div>
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

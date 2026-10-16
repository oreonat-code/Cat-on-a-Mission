import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getPaper } from '../data/papers.js';
import { stopSpeaking } from '../lib/speak.js';
import { ShellHeader } from '../components/QuestionShell.jsx';
import AddWithPictures from '../components/questions/AddWithPictures.jsx';
import TakeAwayWithPictures from '../components/questions/TakeAwayWithPictures.jsx';
import NumberTrack from '../components/questions/NumberTrack.jsx';
import FillTheGap from '../components/questions/FillTheGap.jsx';
import SentenceBuilder from '../components/questions/SentenceBuilder.jsx';

const QUESTION_TYPES = {
  'add-with-pictures': AddWithPictures,
  'take-away-with-pictures': TakeAwayWithPictures,
  'number-track': NumberTrack,
  'fill-the-gap': FillTheGap,
  'sentence-builder': SentenceBuilder,
};

// Pause after the last tap so the child sees their answer before moving on.
const ADVANCE_DELAY_MS = 900;

export default function PaperRunner() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const paper = getPaper(subject);
  const [index, setIndex] = useState(0);
  // In memory only (PDPA). Kept for the future star feature; never shown to the child.
  const [answers, setAnswers] = useState([]);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  if (!paper) return <Navigate to="/papers" replace />;

  const question = paper.questions[index];
  const Question = QUESTION_TYPES[question.type];
  if (!Question && import.meta.env.DEV) console.warn(`Unknown question type: ${question.type}`);

  // Each question calls this once, when every slot it has is filled.
  function handleComplete({ chosen, correct }) {
    if (answers.length > index) return;
    stopSpeaking();
    const next = [...answers, { questionId: question.id, chosen, correct }];
    setAnswers(next);
    timer.current = setTimeout(() => {
      if (index + 1 < paper.questions.length) setIndex(index + 1);
      else navigate(`/papers/${paper.id}/done`, { replace: true, state: { answers: next } });
    }, ADVANCE_DELAY_MS);
  }

  return (
    <main className="canvas">
      <ShellHeader
        progress={answers.length / paper.questions.length}
        // One star per answered question, right or wrong, so the count never reveals correctness.
        stars={answers.length}
        onClose={() => navigate('/papers')}
      />
      {Question && <Question key={question.id} question={question} onComplete={handleComplete} />}
    </main>
  );
}

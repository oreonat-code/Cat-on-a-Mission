import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getPaper } from '../data/papers.js';
import { stopSpeaking } from '../lib/speak.js';
import { ShellHeader } from '../components/QuestionShell.jsx';
import AddWithPictures from '../components/questions/AddWithPictures.jsx';
import FillTheGap from '../components/questions/FillTheGap.jsx';

const QUESTION_TYPES = {
  'add-with-pictures': AddWithPictures,
  'fill-the-gap': FillTheGap,
};

// Pause after a tap so the child sees their answer in the slot before moving on.
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
  const chosen = answers[index]?.chosen;
  const Question = QUESTION_TYPES[question.type];
  if (!Question && import.meta.env.DEV) console.warn(`Unknown question type: ${question.type}`);

  function handleChoose(value) {
    if (chosen !== undefined) return;
    stopSpeaking();
    const next = [...answers, { questionId: question.id, chosen: value, correct: value === question.answer }];
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
      {Question && <Question key={question.id} question={question} chosen={chosen} onChoose={handleChoose} />}
    </main>
  );
}

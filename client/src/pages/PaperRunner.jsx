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
import { useAdventure } from '../lib/adventure.jsx';

const QUESTION_TYPES = {
  'add-with-pictures': AddWithPictures,
  'take-away-with-pictures': TakeAwayWithPictures,
  'number-track': NumberTrack,
  'fill-the-gap': FillTheGap,
  'sentence-builder': SentenceBuilder,
};

// Pause after the last tap so the child sees their answer, and the fish lands, before moving on.
const ADVANCE_DELAY_MS = 1100;
// The last fish still has to leap into the bowl and the burst has to play before the done page.
const FINISH_DELAY_MS = 1500;
// The question slides out this long before the next one (or the done page) takes over.
const EXIT_MS = 220;

export default function PaperRunner() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const paper = getPaper(subject);
  const [index, setIndex] = useState(0);
  // In memory only (PDPA). Kept for the future star feature; never shown to the child.
  const [answers, setAnswers] = useState([]);
  const timers = useRef([]);
  const [leaving, setLeaving] = useState(false);
  const completedQuestion = useRef(null);
  const { earnFish, finish } = useAdventure();

  useEffect(() => () => { timers.current.forEach(clearTimeout); stopSpeaking(); }, []);
  useEffect(() => {
    document.querySelector('.prompt')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [index]);

  if (!paper) return <Navigate to="/papers" replace />;

  const question = paper.questions[index];
  const Question = QUESTION_TYPES[question.type];
  if (!Question && import.meta.env.DEV) console.warn(`Unknown question type: ${question.type}`);

  // Each question calls this once, when every slot it has is filled.
  function handleComplete({ chosen, correct }) {
    if (completedQuestion.current === question.id) return;
    completedQuestion.current = question.id;
    stopSpeaking();
    const next = [...answers, { questionId: question.id, chosen, correct }];
    setAnswers(next);
    earnFish();
    const isLast = index + 1 >= paper.questions.length;
    const delay = isLast ? FINISH_DELAY_MS : ADVANCE_DELAY_MS;
    timers.current = [
      setTimeout(() => setLeaving(true), delay - EXIT_MS),
      setTimeout(() => {
        if (!isLast) {
          setIndex(index + 1);
          setLeaving(false);
        } else {
          finish(paper.id);
          navigate(`/papers/${paper.id}/done`, { replace: true, state: { earned: next.length } });
        }
      }, delay),
    ];
  }

  return (
    <main className={`canvas question-scene question-scene--${question.type}`}>
      <ShellHeader
        progress={answers.length / paper.questions.length}
        // Every completed question earns a fish, regardless of correctness.
        steps={paper.questions.length}
        onClose={() => navigate('/papers')}
      />
      <section key={question.id} className={'question-content' + (leaving ? ' is-leaving' : '')} aria-label={`${paper.title} adventure, question ${index + 1} of ${paper.questions.length}`}>
        <p className="question-kicker">{paper.id === 'math' ? 'Maths' : 'English'} Adventure <span aria-hidden="true">·</span> {index + 1} of {paper.questions.length}</p>
        {Question && <Question key={question.id} question={question} onComplete={handleComplete} />}
      </section>
    </main>
  );
}

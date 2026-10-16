import { MAX_TOPIC_SCORE, QUESTIONS_PER_STUDENT, topicScores } from './mockData.js';

export default function StudentView({ subject, classId, student, onHome, onOpenClass }) {
  const scores = topicScores(student, subject);
  const best = scores.reduce((a, b) => (b.score > a.score ? b : a)).topic;
  const next = scores.reduce((a, b) => (b.score < a.score ? b : a)).topic;

  return (
    <>
      <p className="crumbs">
        <button onClick={onHome}>{subject}</button> &gt;{' '}
        <button onClick={() => onOpenClass(classId)}>Class {classId}</button> &gt; {student.name}
      </p>
      <span className="tag">Class {classId}</span>
      <div className="stack">
        <div className="panel two">
          <div className="card">
            <h2>Questions complete</h2>
            <p className="big">
              {student.answered}<small>/{QUESTIONS_PER_STUDENT}</small>
            </p>
            <div className="bar" aria-hidden="true">
              <i style={{ width: `${(student.answered / QUESTIONS_PER_STUDENT) * 100}%` }} />
            </div>
          </div>
          <div className="card">
            <h2>Correct answers by topic</h2>
            <div className="bars">
              {scores.map((s) => (
                <div key={s.topic} className="b">
                  <span>{s.topic}</span>
                  <span className="t" aria-hidden="true">
                    <i style={{ width: `${(s.score / MAX_TOPIC_SCORE) * 100}%` }} />
                  </span>
                  <span>{s.score}/{MAX_TOPIC_SCORE}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card sum">
          <h2>Short summary</h2>
          <p>
            {student.name} has finished {student.answered} of {QUESTIONS_PER_STUDENT} questions. Strongest
            topic: {best}. Worth practising next: {next}.
          </p>
        </div>
      </div>
    </>
  );
}

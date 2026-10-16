import { useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { NotFoundView } from './PlaceholderView.jsx';
import { MAX_TOPIC_SCORE, QUESTIONS_PER_STUDENT, findClass, findStudent, topicScores } from './mockData.js';

export default function StudentView() {
  const { classId, studentId } = useParams();
  const cls = findClass(classId);
  const student = findStudent(studentId);
  if (!cls || !student) return <NotFoundView title="Student not found" />;
  return <StudentDetail cls={cls} student={student} />;
}

function StudentDetail({ cls, student }) {
  const { subject } = useOutletContext();
  const [chart, setChart] = useState('bars');

  const scores = topicScores(student, subject);
  const best = scores.reduce((a, b) => (b.score > a.score ? b : a)).topic;
  const next = scores.reduce((a, b) => (b.score < a.score ? b : a)).topic;

  const pct = Math.round((student.answered / QUESTIONS_PER_STUDENT) * 100);
  const done = student.answered === QUESTIONS_PER_STUDENT;
  const topScore = scores.find((s) => s.topic === best).score;
  const lowScore = scores.find((s) => s.topic === next).score;
  const even = scores.every((s) => s.score === scores[0].score);

  const total = scores.reduce((n, s) => n + s.score, 0);
  const accuracy = Math.round((total / (scores.length * MAX_TOPIC_SCORE)) * 100);
  const remaining = QUESTIONS_PER_STUDENT - student.answered;
  const level = (s) => {
    const r = s.score / MAX_TOPIC_SCORE;
    if (r >= 0.8) return { label: 'Strong', icon: '★', cls: 'strong' };
    if (r >= 0.6) return { label: 'Developing', icon: '◐', cls: 'dev' };
    return { label: 'Needs support', icon: '↻', cls: 'need' };
  };
  const support = scores.filter((s) => s.score / MAX_TOPIC_SCORE < 0.6).map((s) => s.topic);
  const TARGET = 0.8; // change to move the target
  const targetScore = Math.ceil(MAX_TOPIC_SCORE * TARGET);
  const gaps = scores
    .map((s) => ({ ...s, gap: Math.max(0, targetScore - s.score) }))
    .filter((g) => g.gap > 0)
    .sort((a, b) => b.gap - a.gap);
  const [ai, setAi] = useState({ status: 'idle', text: '' });

  async function generateSummary() {
    setAi({ status: 'loading', text: '' });
    try {
      const r = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          answered: student.answered,
          total: QUESTIONS_PER_STUDENT,
          topics: scores.map((s) => ({ topic: s.topic, score: s.score, max: MAX_TOPIC_SCORE })),
        }),
      });
      if (!r.ok) throw new Error();
      const { summary } = await r.json();
      setAi({ status: 'done', text: summary });
    } catch {
      setAi({ status: 'error', text: '' });
    }
  }

  return (
    <>
      <p className="crumbs">
        <Link to="/dashboard">{subject}</Link> &gt;{' '}
        <Link to={`/dashboard/class/${cls.id}`}>{cls.name}</Link> &gt; {student.name}
      </p>
      <span className="tag">{cls.name}</span>
      <div className="stack">
        <div className="panel two">
          <div className="card">
            <h2>Questions complete</h2>
            <p className="big">
              {student.answered}<small>/{QUESTIONS_PER_STUDENT}</small>
            </p>
            <div className="bar" aria-hidden="true">
              <i style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="card">
            <div className="card-head">
              <h2>Correct answers by topic</h2>
              <div className="seg" role="group" aria-label="Chart type">
                {[['bars', 'Bars'], ['columns', 'Columns']].map(([key, label]) => (
                  <button key={key} aria-pressed={chart === key} onClick={() => setChart(key)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {chart === 'bars' && (
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
            )}

            {chart === 'columns' && (
              <div className="cols">
                {scores.map((s) => (
                  <div key={s.topic} className="col">
                    <span>{s.score}/{MAX_TOPIC_SCORE}</span>
                    <span className="ct" aria-hidden="true">
                      <i style={{ height: `${(s.score / MAX_TOPIC_SCORE) * 100}%` }} />
                    </span>
                    <span>{s.topic}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="card sum">
          <h2>Short summary</h2>
          <p className="sum-head">
            {student.name} has finished <strong>{student.answered} of {QUESTIONS_PER_STUDENT}</strong> questions ({pct}%).
          </p>
          <div aria-live="polite">
            {ai.status === 'done' && (
              <>
                <div className="ai-text">
                  {ai.text.split('\n').filter(Boolean).map((line, i) => {
                    const [label, ...rest] = line.split(':');
                    return (
                      <p className="ai-line" key={i}>
                        <b>{label}:</b>{rest.join(':')}
                      </p>
                    );
                  })}
                </div>
                <p className="sum-note">AI-generated. Check before sharing.</p>
              </>
            )}
            {ai.status === 'error' && (
              <p className="sum-note">AI summary unavailable. The summary below still works.</p>
            )}
          </div>

          <div className="sum-stats">
            <div><b>{accuracy}%</b><span> overall accuracy</span></div>
            <div><b>{remaining}</b><span> questions left</span></div>
            <div><b>{support.length}</b><span> topics needing support</span></div>
          </div>

          <h3>Topic breakdown</h3>
          <ul className="sum-list">
            {scores.map((s) => {
              const l = level(s);
              return (
                <li key={s.topic}>
                  <span> {s.topic}: </span>
                  <span className={`pill ${l.cls}`}> {l.label} ,</span>
                  <span> Score: {s.score}/{MAX_TOPIC_SCORE}</span>
                </li>
              );
            })}
          </ul>
          <h3>Learning gap</h3>
            {gaps.length === 0 ? (
              <p>No gaps. Every topic is at or above the target of {targetScore}/{MAX_TOPIC_SCORE}.</p>
            ) : (
              <ul className="gap-list">
                {gaps.map((g) => (
                  <li key={g.topic}>
                    <div className="gap-top">
                      <b>{g.topic}</b>
                      <span className={`pill ${g.gap >= 2 ? 'need' : 'dev'}`}>
                        {g.gap >= 2 ? '↻ Priority' : '◐ Close to target'}
                      </span>
                      <span>{g.gap} point{g.gap === 1 ? '' : 's'} to target</span>
                    </div>
                    <div className="gap-bar" aria-hidden="true">
                      <i className="got" style={{ width: `${(g.score / MAX_TOPIC_SCORE) * 100}%` }} />
                      <i className="gap" style={{ width: `${(g.gap / MAX_TOPIC_SCORE) * 100}%` }} />
                    </div>
                    <small>{g.score}/{MAX_TOPIC_SCORE} now, target {targetScore}/{MAX_TOPIC_SCORE}</small>
                  </li>
                ))}
              </ul>
            )}
            <p className="sum-note">
              Target is {Math.round(TARGET * 100)}% per topic, based on {student.answered} answered questions.
            </p>
          {!even && (
            <div className="sum-grid">
              <div className="sum-box strong">
                <span className="sum-label">★ Strongest topic</span>
                <b>{best}</b>
                <span>{topScore}/{MAX_TOPIC_SCORE} correct</span>
              </div>
              <div className="sum-box practise">
                <span className="sum-label">↻ Practise next</span>
                <b>{next}</b>
                <span>{lowScore}/{MAX_TOPIC_SCORE} correct</span>
              </div>
            </div>
          )}

          <h3>Suggested next steps</h3>
          <ul className="sum-steps">
            {remaining > 0 && <li>Finish the remaining {remaining} question{remaining === 1 ? '' : 's'}.</li>}
            {support.length > 0
              ? <li>Practise {support.join(', ')} with short, repeated activities.</li>
              : <li>No weak topics. Try a harder set to stretch {student.name}.</li>}
            {!even && support.length === 0 && <li>Keep up {best}, then focus on {next}.</li>}
          </ul>
          {remaining > 0 && <p className="sum-note">Based on {student.answered} answered questions, so results may change.</p>}
        </div>
      </div>
    </>
  );
}

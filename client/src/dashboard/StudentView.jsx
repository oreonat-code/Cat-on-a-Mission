import { Link, useOutletContext, useParams } from 'react-router-dom';
import { useApi } from '../api.js';
import { LoadState, NotFoundView } from './PlaceholderView.jsx';

export default function StudentView() {
  const { classId, studentId } = useParams();
  const { subject } = useOutletContext();
  const { data, error } = useApi(`/dashboard/students/${encodeURIComponent(studentId)}?subject=${subject}`);

  if (error?.status === 404) return <NotFoundView title="Student not found" />;
  if (!data) return <LoadState error={error} />;

  const { student, answered, topics, questionsPerStudent } = data;
  // The class in the address must be this student's class.
  if (String(student.class_id) !== classId) return <NotFoundView title="Student not found" />;

  const rate = (t) => t.correct / t.answered;
  const best = topics.reduce((a, b) => (rate(b) > rate(a) ? b : a), topics[0])?.topic;
  const next = topics.reduce((a, b) => (rate(b) < rate(a) ? b : a), topics[0])?.topic;

  return (
    <>
      <p className="crumbs">
        <Link to="/dashboard">{subject}</Link> &gt;{' '}
        <Link to={`/dashboard/class/${classId}`}>{student.class.name}</Link> &gt; {student.name}
      </p>
      <span className="tag">{student.class.name}</span>
      <div className="stack">
        <div className="panel two">
          <div className="card">
            <h2>Questions complete</h2>
            <p className="big">
              {answered}<small>/{questionsPerStudent}</small>
            </p>
            <div className="bar" aria-hidden="true">
              <i style={{ width: `${(answered / questionsPerStudent) * 100}%` }} />
            </div>
          </div>
          <div className="card">
            <h2>Correct answers by topic</h2>
            {topics.length === 0 && <p>No {subject} answers yet.</p>}
            <div className="bars">
              {topics.map((t) => (
                <div key={t.topic} className="b">
                  <span>{t.topic}</span>
                  <span className="t" aria-hidden="true">
                    <i style={{ width: `${rate(t) * 100}%` }} />
                  </span>
                  <span>{t.correct}/{t.answered}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card sum">
          <h2>Short summary</h2>
          <p>
            {student.name} has finished {answered} of {questionsPerStudent} {subject} questions.
            {topics.length > 1 && ` Strongest topic: ${best}. Worth practising next: ${next}.`}
          </p>
        </div>
      </div>
    </>
  );
}

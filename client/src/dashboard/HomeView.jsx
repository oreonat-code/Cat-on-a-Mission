import { Link, useOutletContext } from 'react-router-dom';
import { useApi } from '../api.js';
import { LoadState } from './PlaceholderView.jsx';
import StatusIcon from './StatusIcon.jsx';

export default function HomeView() {
  const { level, subject } = useOutletContext();
  const params = new URLSearchParams({ level, subject });
  const { data, error } = useApi(`/dashboard/classes?${params}`);
  if (!data) return <LoadState error={error} />;

  const { classes, questionsPerStudent } = data;
  const isComplete = (c) => c.students > 0 && c.complete === c.students;
  const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);
  const totalAnswered = classes.reduce((sum, c) => sum + c.answered, 0);
  const assessed = totalStudents ? Math.round((totalAnswered / (totalStudents * questionsPerStudent)) * 100) : 0;

  return (
    <div className="panel stack">
      <div className="card prog">
        <h1>{level}: {classes.filter(isComplete).length}/{classes.length} classes complete</h1>
        <p className="meta">Assessed: {assessed}%</p>
        <div className="bar" role="progressbar" aria-valuenow={assessed} aria-valuemin="0" aria-valuemax="100" aria-label="Assessed">
          <i style={{ width: `${assessed}%` }} />
        </div>
      </div>
      <div>
        <h2>Students you have assessed:</h2>
        {classes.length === 0 && <p>No classes in {level} yet.</p>}
        <div className="grid">
          {classes.map((c) => {
            const status = isComplete(c) ? 'done' : c.answered > 0 ? 'part' : '';
            const label = status === 'done' ? 'Complete' : status === 'part' ? 'In progress' : 'Not started';
            const progress = c.students ? (c.answered / (c.students * questionsPerStudent)) * 100 : 0;
            return (
              <Link key={c.id} className={`tile ${status}`} to={`class/${c.id}`}>
                <b>{c.name}</b>
                <span className="st">
                  <StatusIcon status={status} />
                  {c.complete}/{c.students} students · {label}
                </span>
                <span className="mini" aria-hidden="true">
                  <i style={{ width: `${progress}%` }} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

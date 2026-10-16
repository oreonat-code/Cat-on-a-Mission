import { Link, useOutletContext } from 'react-router-dom';
import StatusIcon from './StatusIcon.jsx';
import { QUESTIONS_PER_STUDENT, classes } from './mockData.js';

export default function HomeView() {
  const { level } = useOutletContext();
  const complete = classes.filter((c) => c.done === QUESTIONS_PER_STUDENT).length;
  const total = classes.reduce((sum, c) => sum + c.done, 0);
  const assessed = Math.round((total / (classes.length * QUESTIONS_PER_STUDENT)) * 100);

  return (
    <div className="panel stack">
      <div className="card prog">
        <h1>{level}: {complete}/{classes.length} classes complete</h1>
        <p className="meta">Assessed: {assessed}%</p>
        <div className="bar" role="progressbar" aria-valuenow={assessed} aria-valuemin="0" aria-valuemax="100" aria-label="Assessed">
          <i style={{ width: `${assessed}%` }} />
        </div>
      </div>
      <div>
        <h2>Students you have assessed:</h2>
        <div className="grid">
          {classes.map((c) => {
            const status = c.done === QUESTIONS_PER_STUDENT ? 'done' : c.done > 0 ? 'part' : '';
            const label = status === 'done' ? 'Complete' : status === 'part' ? 'In progress' : 'Not started';
            return (
              <Link key={c.id} className={`tile ${status}`} to={`class/${c.id}`}>
                <b>{c.name}</b>
                <span className="st">
                  <StatusIcon status={status} />
                  {c.done}/{QUESTIONS_PER_STUDENT} · {label}
                </span>
                <span className="mini" aria-hidden="true">
                  <i style={{ width: `${(c.done / QUESTIONS_PER_STUDENT) * 100}%` }} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

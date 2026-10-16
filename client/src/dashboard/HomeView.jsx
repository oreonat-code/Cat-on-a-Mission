import { Link, useOutletContext } from 'react-router-dom';
import StatusIcon from './StatusIcon.jsx';
import { classProgress, classes } from './mockData.js';

export default function HomeView() {
  const { subject, level } = useOutletContext();
  const progress = classes.map((c) => ({ ...c, ...classProgress(c, subject) }));
  const complete = progress.filter((c) => c.assessed === c.total).length;
  const assessedStudents = progress.reduce((sum, c) => sum + c.assessed, 0);
  const allStudents = progress.reduce((sum, c) => sum + c.total, 0);
  const assessed = Math.round((assessedStudents / allStudents) * 100);

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
          {progress.map((c) => {
            const status = c.assessed === c.total ? 'done' : c.assessed > 0 ? 'part' : '';
            const label = status === 'done' ? 'Complete' : status === 'part' ? 'In progress' : 'Not started';
            return (
              <Link key={c.id} className={`tile ${status}`} to={`class/${c.id}`}>
                <b>{c.name}</b>
                <span className="st">
                  <StatusIcon status={status} />
                  {c.assessed}/{c.total} · {label}
                </span>
                <span className="mini" aria-hidden="true">
                  <i style={{ width: `${(c.assessed / c.total) * 100}%` }} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

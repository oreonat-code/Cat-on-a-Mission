import { useEffect, useState } from 'react';
import { QUESTIONS_PER_STUDENT } from './mockData.js';

const SORTS = {
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
  most: (a, b) => b.answered - a.answered,
};

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

export default function ClassView({ subject, classId, students, onHome, onOpenStudent }) {
  const [sort, setSort] = useState('pending');
  const [query, setQuery] = useState('');
  const storageKey = `cty-assessed-${subject}-${classId}`;
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) ?? {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [storageKey, checked]);
  const isAssessed = (s) => checked[s.id] ?? s.answered === QUESTIONS_PER_STUDENT;

  if (error?.status === 404) return <NotFoundView title="Class not found" />;
  if (!data) return <LoadState error={error} />;

  const { students, questionsPerStudent } = data;
  const list = students
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    .sort(sort === 'pending'
      ? (a, b) => Number(isAssessed(a)) - Number(isAssessed(b)) || SORTS.az(a, b)
      : SORTS[sort],
    );
  const fullyAssessed = students.filter(isAssessed).length;
  const average = Math.round(
    (students.reduce((sum, s) => sum + s.answered, 0) / (students.length * QUESTIONS_PER_STUDENT)) * 100,
  );

  return (
    <>
      <p className="crumbs">
        <Link to="/dashboard">{subject}</Link> &gt; {data.class.name}
      </p>
      <span className="tag">{data.class.name}</span>
      <div className="panel stack">
        <div className="banner">
          <div><b>{students.length}</b>students</div>
          <div><b>{fullyAssessed}</b>fully assessed</div>
          <div><b>{average}%</b>class average complete</div>
        </div>
        <div className="card">
          <div className="tools">
            <select className="sel" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="az">Sort: Name A–Z</option>
              <option value="za">Sort: Name Z–A</option>
              <option value="most">Sort: Most complete</option>
              <option value="pending">Sort: Not assessed first</option>
            </select>
            <input
              type="search"
              placeholder="Search students"
              aria-label="Search students"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {students.length === 0 && <p>No students in this class yet.</p>}
          {students.length > 0 && list.length === 0 && <p>No students match. Clear the search to see everyone.</p>}
          {list.map((s) => (
            <div key={s.id} className={`row ${isAssessed(s) ? 'assessed' : ''}`}>
              <input
                type="checkbox"
                className="chk"
                checked={isAssessed(s)}
                onChange={() => setChecked({ ...checked, [s.id]: !isAssessed(s) })}
                aria-label={`${s.name} assessed`}
              />
              <button className="rowname" onClick={() => onOpenStudent(s.id)}>
                <span className="av" aria-hidden="true">{initials(s.name)}</span>
                {s.name}
              </button>
              <em>
                {isAssessed(s) ? 'Assessed' : 'Not assessed'} · {s.answered}/{QUESTIONS_PER_STUDENT}
              </em>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

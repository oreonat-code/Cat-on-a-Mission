import { useState } from 'react';
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
  const [sort, setSort] = useState('az');
  const [query, setQuery] = useState('');

  const list = students
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    .sort(SORTS[sort]);
  const fullyAssessed = students.filter((s) => s.answered === QUESTIONS_PER_STUDENT).length;
  const average = Math.round(
    (students.reduce((sum, s) => sum + s.answered, 0) / (students.length * QUESTIONS_PER_STUDENT)) * 100,
  );

  return (
    <>
      <p className="crumbs">
        <button onClick={onHome}>{subject}</button> &gt; Class {classId}
      </p>
      <span className="tag">Class {classId}</span>
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
            </select>
            <input
              type="search"
              placeholder="Search students"
              aria-label="Search students"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {list.length === 0 && <p>No students match. Clear the search to see everyone.</p>}
          {list.map((s) => (
            <button key={s.id} className="row" onClick={() => onOpenStudent(s.id)}>
              <span className="av" aria-hidden="true">{initials(s.name)}</span>
              {s.name}
              <em>{s.answered}/{QUESTIONS_PER_STUDENT} questions</em>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

import { useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { useApi } from '../api.js';
import { LoadState, NotFoundView } from './PlaceholderView.jsx';

const SORTS = {
  az: (a, b) => a.name.localeCompare(b.name),
  za: (a, b) => b.name.localeCompare(a.name),
  most: (a, b) => b.answered - a.answered,
};

function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('');
}

// Keyed by class so search and sort reset when moving to another class.
export default function ClassView() {
  const { classId } = useParams();
  return <ClassDetail key={classId} classId={classId} />;
}

function ClassDetail({ classId }) {
  const { subject } = useOutletContext();
  const [sort, setSort] = useState('az');
  const [query, setQuery] = useState('');
  const { data, error } = useApi(`/dashboard/classes/${encodeURIComponent(classId)}?subject=${subject}`);

  if (error?.status === 404) return <NotFoundView title="Class not found" />;
  if (!data) return <LoadState error={error} />;

  const { students, questionsPerStudent } = data;
  const list = students
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    .sort(SORTS[sort]);
  const fullyAssessed = students.filter((s) => s.answered >= questionsPerStudent).length;
  const average = students.length
    ? Math.round((students.reduce((sum, s) => sum + s.answered, 0) / (students.length * questionsPerStudent)) * 100)
    : 0;

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
            <Link key={s.id} className="row" to={`student/${s.id}`}>
              <span className="av" aria-hidden="true">{initials(s.name)}</span>
              {s.name}
              <em>{s.answered}/{questionsPerStudent} questions</em>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

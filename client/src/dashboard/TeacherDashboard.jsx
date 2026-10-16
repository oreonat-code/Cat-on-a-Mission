import { useEffect, useState } from 'react';
import logo from '../../../design/brand/cty-logo.webp';
import HomeView from './HomeView.jsx';
import ClassView from './ClassView.jsx';
import StudentView from './StudentView.jsx';
import { LEVELS, SUBJECTS, classes, students } from './mockData.js';
import './dashboard.css';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'create', label: 'Create questions' },
  { id: 'admin', label: 'Administrative' },
];

const COMFORT_KEY = 'cty-comfort-theme';

function readComfort() {
  try {
    return localStorage.getItem(COMFORT_KEY) === '1';
  } catch {
    return false;
  }
}

export default function TeacherDashboard({ username, onLogout }) {
  // page: 'home' | 'class' | 'student' | 'create' | 'admin'
  const [page, setPage] = useState('home');
  const [classId, setClassId] = useState(1);
  const [studentId, setStudentId] = useState(null);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [comfort, setComfort] = useState(readComfort);

  useEffect(() => {
    if (comfort) document.documentElement.dataset.theme = 'comfort';
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(COMFORT_KEY, comfort ? '1' : '0');
    } catch {
      // Storage can be blocked; the toggle still works for this visit.
    }
  }, [comfort]);

  const navSection = page === 'class' || page === 'student' ? 'home' : page;
  const goHome = () => setPage('home');
  const openClass = (id) => {
    setClassId(id);
    setPage('class');
  };
  const openStudent = (id) => {
    setStudentId(id);
    setPage('student');
  };

  let view;
  if (page === 'home') {
    view = <HomeView level={level} classes={classes} onOpenClass={openClass} />;
  } else if (page === 'class') {
    view = (
      <ClassView
        key={classId}
        subject={subject}
        classId={classId}
        students={students}
        onHome={goHome}
        onOpenStudent={openStudent}
      />
    );
  } else if (page === 'student') {
    const student = students.find((s) => s.id === studentId) ?? students[0];
    view = (
      <StudentView subject={subject} classId={classId} student={student} onHome={goHome} onOpenClass={openClass} />
    );
  } else {
    view = (
      <div className="panel card">
        <h2>{NAV.find((n) => n.id === page).label}</h2>
        <p>This page is not built yet.</p>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          <img src={logo} alt="Catch Them Young" />
        </div>
        <div className="profile">
          <div className="ring"><span aria-hidden="true">🐱</span></div>
          <p>Hi {username}!</p>
          <small>Welcome back</small>
        </div>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <button
              key={n.id}
              className="nav"
              aria-current={navSection === n.id ? 'page' : undefined}
              onClick={() => setPage(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="spacer" />
        <label className="comfort">
          <input type="checkbox" checked={comfort} onChange={(e) => setComfort(e.target.checked)} />
          Comfort colours
        </label>
        <button className="logout" onClick={onLogout}>Log Out</button>
      </aside>
      <main>
        <div className="top">
          <select className="sel" aria-label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="sel" aria-label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((l) => <option key={l}>{l}</option>)}
          </select>
          <span className="user">{username}</span>
        </div>
        {view}
      </main>
    </div>
  );
}

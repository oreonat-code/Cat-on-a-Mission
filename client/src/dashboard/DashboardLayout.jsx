import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../design/brand/cty-logo.webp';
import { useSession } from '../auth/session.jsx';
import { LEVELS, SUBJECTS } from './constants.js';
import './dashboard.css';

const NAV = [
  { to: '/dashboard', label: 'Home' },
  { to: '/dashboard/create', label: 'Create questions' },
  { to: '/dashboard/admin', label: 'Administrative' },
];

// Class and student pages sit under Home in the sidebar.
function activeNav(pathname) {
  return NAV.slice(1).find((n) => pathname.startsWith(n.to))?.to ?? '/dashboard';
}

export default function DashboardLayout() {
  const { session, signOut } = useSession();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const current = activeNav(pathname);
  // Subject and level filters only apply to the Home overview.
  const showFilters = pathname.replace(/\/$/, '') === '/dashboard';

  async function logout() {
    await signOut();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app">
      <aside className="side">
        <div className="brand">
          <img src={logo} alt="Catch Them Young" />
        </div>
        <div className="profile">
          <div className="ring"><span aria-hidden="true">🐱</span></div>
          <p>Hi {session.id}!</p>
          <small>Welcome back</small>
        </div>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="nav" aria-current={current === n.to ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="spacer" />
        <button className="logout" onClick={logout}>Log Out</button>
      </aside>
      <main>
        <div className="top">
          {showFilters && (
            <>
              <select className="sel" aria-label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <select className="sel" aria-label="Level" value={level} onChange={(e) => setLevel(e.target.value)}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </>
          )}
          <span className="user">{session.id}</span>
        </div>
        <Outlet context={{ subject, level }} />
      </main>
    </div>
  );
}

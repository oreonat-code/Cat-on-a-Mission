import { useState } from 'react';
import LoginPage from './auth/LoginPage.jsx';
import GamePlaceholder from './game/GamePlaceholder.jsx';
import TeacherDashboard from './dashboard/TeacherDashboard.jsx';

export default function App() {
  // session: null when signed out, otherwise { role: 'student' | 'teacher', id }
  const [session, setSession] = useState(null);
  const logout = () => setSession(null);

  if (session?.role === 'student') return <GamePlaceholder onLogout={logout} />;
  if (session?.role === 'teacher') return <TeacherDashboard username={session.id} onLogout={logout} />;
  return (
    <LoginPage
      onStudent={(id) => setSession({ role: 'student', id })}
      onTeacher={(id) => setSession({ role: 'teacher', id })}
    />
  );
}

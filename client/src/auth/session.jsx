import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { currentSession, logout } from './accounts.js';

// Who is signed in: null, or { role: 'student' | 'teacher', id }.
// The server holds the real session in an httpOnly cookie; this mirrors it for the UI.
const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  // undefined until the server has answered
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    currentSession().then(setSession, () => setSession(null));
  }, []);

  if (session === undefined) return null;

  const value = {
    session,
    signIn: setSession,
    async signOut() {
      try {
        await logout();
      } finally {
        setSession(null);
      }
    },
  };
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  return useContext(SessionContext);
}

// Signs out and goes to the login page.
export function useLogOut() {
  const { signOut } = useSession();
  const navigate = useNavigate();
  return async () => {
    await signOut();
    navigate('/login', { replace: true });
  };
}

export function homePathFor(role) {
  if (role === 'teacher') return '/dashboard';
  if (role === 'student') return '/papers';
  return '/login';
}

// Renders children only for the given role. Signed-out visitors go to /login and come
// back afterwards; a signed-in user with the wrong role goes to their own home page.
// The server checks the role again on every API call; this only decides what to show.
export function RequireRole({ role, children }) {
  const { session } = useSession();
  const location = useLocation();
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (session.role !== role) return <Navigate to={homePathFor(session.role)} replace />;
  return children;
}

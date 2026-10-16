import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { RequireRole, SessionProvider, homePathFor, useSession } from './auth/session.jsx';
import LoginPage from './auth/LoginPage.jsx';
import PapersPage from './pages/PapersPage.jsx';
import PaperRunner from './pages/PaperRunner.jsx';
import DonePage from './pages/DonePage.jsx';
import DashboardLayout from './dashboard/DashboardLayout.jsx';
import HomeView from './dashboard/HomeView.jsx';
import ClassView from './dashboard/ClassView.jsx';
import StudentView from './dashboard/StudentView.jsx';
import PlaceholderView from './dashboard/PlaceholderView.jsx';

// Sends "/" and unknown paths to the right place for whoever is signed in.
function HomeRedirect() {
  const { session } = useSession();
  return <Navigate to={homePathFor(session?.role)} replace />;
}

export default function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/papers" element={<RequireRole role="student"><Outlet /></RequireRole>}>
          <Route index element={<PapersPage />} />
          <Route path=":subject" element={<PaperRunner />} />
          <Route path=":subject/done" element={<DonePage />} />
        </Route>
        <Route
          path="/dashboard"
          element={<RequireRole role="teacher"><DashboardLayout /></RequireRole>}
        >
          <Route index element={<HomeView />} />
          <Route path="class/:classId" element={<ClassView />} />
          <Route path="class/:classId/student/:studentId" element={<StudentView />} />
          <Route path="create" element={<PlaceholderView title="Create questions" />} />
          <Route path="admin" element={<PlaceholderView title="Administrative" />} />
        </Route>
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </SessionProvider>
  );
}

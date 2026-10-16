import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { RequireRole, SessionProvider, homePathFor, useSession } from './auth/session.jsx';
import LoginPage from './auth/LoginPage.jsx';
import PapersPage from './pages/PapersPage.jsx';
import PaperRunner from './pages/PaperRunner.jsx';
import DonePage from './pages/DonePage.jsx';
import { BadgesPage } from './pages/ReferenceScenes.jsx';
import ShopPage from './pages/ShopPage.jsx';
import WardrobePage from './pages/WardrobePage.jsx';
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
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <SessionProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/papers" element={<RequireRole role="student"><Outlet /></RequireRole>}>
          <Route index element={<PapersPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="wardrobe" element={<WardrobePage />} />
          <Route path="badges" element={<BadgesPage />} />
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

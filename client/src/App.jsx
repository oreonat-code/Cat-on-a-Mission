import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PapersPage from './pages/PapersPage.jsx';
import PaperRunner from './pages/PaperRunner.jsx';
import DonePage from './pages/DonePage.jsx';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <Routes>
      <Route path="/papers" element={<PapersPage />} />
      <Route path="/papers/:subject" element={<PaperRunner />} />
      <Route path="/papers/:subject/done" element={<DonePage />} />
      <Route path="*" element={<Navigate to="/papers" replace />} />
    </Routes>
  );
}

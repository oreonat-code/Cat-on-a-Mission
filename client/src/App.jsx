import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PapersPage from './pages/PapersPage.jsx';
import PaperRunner from './pages/PaperRunner.jsx';
import DonePage from './pages/DonePage.jsx';
import { BadgesPage } from './pages/ReferenceScenes.jsx';
import ShopPage from './pages/ShopPage.jsx';
import WardrobePage from './pages/WardrobePage.jsx';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <Routes>
      <Route path="/papers" element={<PapersPage />} />
      <Route path="/papers/shop" element={<ShopPage />} />
      <Route path="/papers/wardrobe" element={<WardrobePage />} />
      <Route path="/papers/badges" element={<BadgesPage />} />
      <Route path="/papers/:subject" element={<PaperRunner />} />
      <Route path="/papers/:subject/done" element={<DonePage />} />
      <Route path="*" element={<Navigate to="/papers" replace />} />
    </Routes>
  );
}

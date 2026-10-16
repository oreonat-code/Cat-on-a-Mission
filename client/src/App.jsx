import { Navigate, Route, Routes } from 'react-router-dom';
import PapersPage from './pages/PapersPage.jsx';
import PaperRunner from './pages/PaperRunner.jsx';
import DonePage from './pages/DonePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/papers" element={<PapersPage />} />
      <Route path="/papers/:subject" element={<PaperRunner />} />
      <Route path="/papers/:subject/done" element={<DonePage />} />
      <Route path="*" element={<Navigate to="/papers" replace />} />
    </Routes>
  );
}

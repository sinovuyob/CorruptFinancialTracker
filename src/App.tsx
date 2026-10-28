import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import InvestigationGraph from './pages/InvestigationGraph';
import EntitySearch from './pages/EntitySearch';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/graph" element={<InvestigationGraph />} />
        <Route path="/search" element={<EntitySearch />} />
      </Routes>
    </BrowserRouter>
  );
}
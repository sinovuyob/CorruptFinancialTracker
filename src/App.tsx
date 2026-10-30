import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import InvestigationGraph from './pages/InvestigationGraph';
import EntitySearch from './pages/EntitySearch';
import RiskPage from './pages/RiskPage';
import CaseManagement from './pages/CaseManagement';
import AuditLog from './pages/AuditLog';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/graph" element={<InvestigationGraph />} />
        <Route path="/search" element={<EntitySearch />} />
        <Route path="/risk" element={<RiskPage />} />
        <Route path="/cases" element={<CaseManagement />} />
        <Route path="/logs" element={<AuditLog />} />
        
        <Route path="*" element={
          <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
            <h1 className="text-7xl font-extrabold text-white mb-4 drop-shadow-lg">404</h1>
            <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Page Not Found</h2>
            <p className="text-blue-200 mb-8">The page you are looking for doesn't exist.</p>
            <Link to="/dashboard" className="px-6 py-3 bg-[#0a2a5c] text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors">
              Return to Dashboard
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
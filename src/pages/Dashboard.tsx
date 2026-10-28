import { useState, useEffect } from 'react';
import { Briefcase, AlertTriangle, Activity, Users, Search, LogOut, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, recentAlerts } from '../mocks/dashboardData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-blue-600" };
    if (name === 'Briefcase') return <Briefcase {...props} />;
    if (name === 'AlertTriangle') return <AlertTriangle {...props} />;
    if (name === 'Activity') return <Activity {...props} />;
    return <Users {...props} />;
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'CRITICAL') return 'bg-red-100 text-red-700 border-red-200';
    if (risk === 'HIGH') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-blue-800" />
          <div>
            <h1 className="text-lg font-bold text-blue-900 leading-tight">CFTS</h1>
            <p className="text-xs font-semibold text-blue-700 tracking-wider">INTELLIGENCE</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-800">JM</span>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900 leading-tight">Inspector J. Mokoena</p>
              <p className="text-xs text-gray-500">j.mokoena@cfts.gov</p>
            </div>
          </div>
          
          <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
          
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-500">Overview of active investigations and recent alerts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const isClickable = stat.label === 'Total Cases';
            return (
              <div 
                key={index} 
                onClick={() => isClickable && navigate('/cases')}
                className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between ${
                  isClickable ? 'cursor-pointer hover:border-blue-400 hover:shadow-md transition-all' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  {getIcon(stat.icon)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); navigate('/search'); }}
            className="relative max-w-2xl"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search entities, companies, or wallets..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <button type="submit" className="hidden">Search</button>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Alerts</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                onClick={() => navigate('/graph')}
                className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-800">{alert.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{alert.name}</p>
                    <p className="text-xs text-gray-500">{alert.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-500">{alert.date}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(alert.risk)}`}>
                    {alert.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
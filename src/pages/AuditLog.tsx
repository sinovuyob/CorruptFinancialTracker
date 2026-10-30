import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, FileText } from 'lucide-react';

export default function AuditLog() {
  const navigate = useNavigate();

  const logs = [
    { id: 1, action: 'Searched entity: "Company ABC"', user: 'J. Mokoena', time: '10:42 AM' },
    { id: 2, action: 'Generated Risk Report: Company X', user: 'J. Mokoena', time: '10:15 AM' },
    { id: 3, action: 'Created Case: CASE-8821', user: 'S. Jenkins', time: 'Yesterday' },
    { id: 4, action: 'Updated graph node: Wallet 0x12...', user: 'A. Smith', time: 'Yesterday' },
    { id: 5, action: 'Exported Case Summary PDF', user: 'J. Mokoena', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-blue-900" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-blue-900">System Audit Log</h1>
          <p className="text-xs text-gray-500">Traceable history of all user actions</p>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full mt-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {logs.map((log) => (
              <div key={log.id} className="px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">{log.action}</p>
                    <p className="text-xs text-gray-500 font-medium">By {log.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                  <Clock className="w-4 h-4" />
                  {log.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
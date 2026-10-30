import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { entityRiskData } from '../mocks/riskData';

export default function RiskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const clickedEntityName = searchParams.get('entity') || entityRiskData.name;

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate('/search')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-blue-900" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-blue-900">Risk Assessment</h1>
          <p className="text-xs text-gray-500">Deep dive analysis</p>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full mt-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg overflow-hidden mb-6">
          <div className="p-8 border-b border-gray-100 flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Entity</p>
              <h2 className="text-3xl font-bold text-blue-900">{clickedEntityName}</h2>
              <p className="text-gray-500 mt-1 font-medium">{entityRiskData.type} • {entityRiskData.registration}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Risk Score</p>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-5xl font-extrabold text-red-600">{entityRiskData.riskScore}</span>
                <span className="text-xl text-gray-400 font-medium">/100</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold border border-red-200">
                <ShieldAlert className="w-4 h-4" />
                {entityRiskData.riskLevel}
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50/50">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Reasons for this score
            </h3>
            <ul className="space-y-3">
              {entityRiskData.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
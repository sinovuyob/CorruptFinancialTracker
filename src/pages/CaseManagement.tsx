import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, FileText, CheckCircle2, Clock } from 'lucide-react';
import { initialCases } from '../mocks/caseData';

export default function CaseManagement() {
  const navigate = useNavigate();
  const [cases, setCases] = useState(initialCases);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    const newCase = {
      id: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      description: newDesc,
      status: 'OPEN',
      date: new Date().toISOString().split('T')[0],
      lead: 'Inspector J. Mokoena'
    };
    setCases([newCase, ...cases]);
    setIsCreating(false);
    setNewTitle('');
    setNewDesc('');
  };

  const getStatusIcon = (status: string) => {
    if (status === 'OPEN') return <Clock className="w-4 h-4 text-orange-500" />;
    if (status === 'IN PROGRESS') return <FileText className="w-4 h-4 text-blue-500" />;
    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'OPEN') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (status === 'IN PROGRESS') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Case Management</h1>
            <p className="text-xs text-gray-500">Manage and track active investigations</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Case
        </button>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        
        {isCreating && (
          <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-md mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Case</h2>
            <form onSubmit={handleCreateCase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600"
                  placeholder="e.g., Suspicious transactions in Gauteng"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600 h-24 resize-none"
                  placeholder="Brief description of the investigation..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Save Case</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {cases.map((c) => (
            <div key={c.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-blue-600 tracking-wider">{c.id}</span>
                  <h3 className="text-lg font-bold text-gray-900">{c.title}</h3>
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(c.status)}`}>
                  {getStatusIcon(c.status)}
                  {c.status}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{c.description}</p>
              
              <div className="flex items-center gap-6 text-xs text-gray-500 border-t border-gray-100 pt-3">
                <span>Lead: <strong className="text-gray-700">{c.lead}</strong></span>
                <span>Opened: <strong className="text-gray-700">{c.date}</strong></span>
              </div>
            </div>
          ))}
          
          {cases.length === 0 && (
             <div className="text-center py-12 text-gray-500">
               No cases found. Click "Create Case" to start a new investigation.
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
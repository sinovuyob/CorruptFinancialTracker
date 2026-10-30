import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, User, Building2, MapPin, Wallet } from 'lucide-react';
import { searchCategories, mockEntities } from '../mocks/searchData';

export default function EntitySearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEntities = mockEntities.filter((entity) => {
    const matchesQuery = entity.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || entity.type === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const getIcon = (type: string) => {
    if (type === 'Person') return <User className="w-5 h-5 text-blue-600" />;
    if (type === 'Company') return <Building2 className="w-5 h-5 text-blue-600" />;
    if (type === 'Property') return <MapPin className="w-5 h-5 text-blue-600" />;
    return <Wallet className="w-5 h-5 text-blue-600" />;
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'CRITICAL') return 'bg-red-100 text-red-700 border-red-200';
    if (risk === 'HIGH') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (risk === 'MEDIUM') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-blue-900" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-blue-900">Entity Search</h1>
          <p className="text-xs text-gray-500">Search across all linked records</p>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full mt-4">
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ID, or registration number..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm bg-white"
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {searchCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-600 border border-gray-200 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-bold text-blue-900">Results ({filteredEntities.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredEntities.map((entity) => (
              <div 
                key={entity.id} 
                onClick={() => navigate('/graph')}
                className="px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center border border-blue-100">
                    {getIcon(entity.type)}
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">{entity.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{entity.type} • {entity.identifier}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-gray-700">{entity.value}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(entity.risk)}`}>
                    {entity.risk}
                  </span>
                </div>
              </div>
            ))}
            
            {filteredEntities.length === 0 && (
              <div className="px-6 py-12 text-center text-gray-500 font-medium">
                No entities found matching your search.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
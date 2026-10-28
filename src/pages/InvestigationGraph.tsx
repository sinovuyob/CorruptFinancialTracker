import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InvestigationGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = [
      { data: { id: 'p1', label: 'John Mokoena', type: 'Person' } },
      { data: { id: 'c1', label: 'Company X', type: 'Company' } },
      { data: { id: 'p2', label: 'Property A', type: 'Property' } },
      { data: { id: 't1', label: 'Txn: R 4.5m', type: 'Transaction' } },
      { data: { id: 'c2', label: 'Company Y', type: 'Company' } },
      { data: { id: 'w1', label: 'Wallet 0x12...', type: 'Wallet' } },
      { data: { source: 'p1', target: 'c1', label: 'DIRECTOR' } },
      { data: { source: 'c1', target: 'p2', label: 'OWNS' } },
      { data: { source: 'c1', target: 't1', label: 'SENT' } },
      { data: { source: 't1', target: 'c2', label: 'RECEIVED' } },
      { data: { source: 'c1', target: 'w1', label: 'CRYPTO' } },
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements: elements,
      style: [
        { selector: 'node', style: { 'background-color': '#ffffff', 'border-width': 2, 'border-color': '#cbd5e1', 'label': 'data(label)', 'color': '#1e293b', 'text-valign': 'bottom', 'text-margin-y': 8, 'font-size': '12px', 'font-weight': 'bold', 'width': '50px', 'height': '50px' } },
        { selector: 'node[type="Company"]', style: { 'background-color': '#2563eb', 'border-color': '#1d4ed8', 'color': '#0f172a' } },
        { selector: 'node[type="Property"]', style: { 'background-color': '#10b981', 'border-color': '#047857', 'shape': 'diamond' } },
        { selector: 'node[type="Transaction"]', style: { 'background-color': '#f59e0b', 'border-color': '#b45309', 'shape': 'hexagon' } },
        { selector: 'node[type="Wallet"]', style: { 'background-color': '#8b5cf6', 'border-color': '#6d28d9', 'shape': 'ellipse' } },
        { selector: 'edge', style: { 'width': 2, 'line-color': '#94a3b8', 'target-arrow-color': '#94a3b8', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier', 'label': 'data(label)', 'color': '#64748b', 'font-size': '10px', 'text-rotation': 'autorotate', 'text-background-color': '#ffffff', 'text-background-opacity': 1, 'text-background-padding': '3px' } }
      ],
      layout: { name: 'cose', padding: 50 }
    });

    return () => cy.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Investigation Graph</h1>
          <p className="text-xs text-gray-500">Case #8821 - Suspicious Money Laundering</p>
        </div>
      </header>
      <main className="flex-1 p-8">
        <div ref={containerRef} className="w-full h-[700px] bg-white border border-gray-200 rounded-xl shadow-sm" />
      </main>
    </div>
  );
}
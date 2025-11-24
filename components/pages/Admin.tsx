
import React from 'react';
import { Info, Edit2, Trash2, Plus } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

// Mock Data matching the screenshot
const MAPPINGS = [
  { id: 1, raw: 'XRPUSD', standard: 'XRP/USD', class: 'CRYPTO', updated: '11/24/2025, 4:44:11 PM' },
  { id: 2, raw: 'NAS100', standard: 'US100', class: 'INDEX', updated: '11/24/2025, 4:44:11 PM' },
  { id: 3, raw: 'ETHUSD', standard: 'ETH/USD', class: 'CRYPTO', updated: '11/24/2025, 4:44:11 PM' },
  { id: 4, raw: 'EURUSD', standard: 'EUR/USD', class: 'FX', updated: '11/24/2025, 4:44:11 PM' },
  { id: 5, raw: 'AUDUSD', standard: 'AUD/USD', class: 'FX', updated: '11/24/2025, 4:44:11 PM' },
  { id: 6, raw: 'XRP/USD', standard: 'XRP/USD', class: 'CRYPTO', updated: '11/24/2025, 4:44:11 PM' },
  { id: 7, raw: 'AUDCAD.f', standard: 'AUD/CAD', class: 'FX', updated: '11/24/2025, 4:44:11 PM' },
];

export default function Admin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
      
      {/* Left Panel: Unresolved Symbols */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full shadow-sm">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-white">Unresolved Symbols</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
              asset_classifier v1.0
            </span>
          </div>
          <button className="text-slate-500 hover:text-slate-300">
            <Info size={18} />
          </button>
        </div>
        
        <div className="p-6 flex-1 text-slate-500 text-sm">
          <p className="mb-4">Configure global mappings (applies to all users)</p>
          <div className="mt-8 text-slate-600 italic">
            No unresolved symbols.
          </div>
        </div>
      </div>

      {/* Right Panel: Existing Mappings */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-full shadow-sm">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-lg text-white">Existing Mappings</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
              asset_classifier v1.0
            </span>
          </div>
          <div className="flex items-center gap-3">
             <Button size="sm" variant="secondary" icon={Plus} className="!py-1 !h-8 text-xs">Add New</Button>
             <button className="text-slate-500 hover:text-slate-300">
              <Info size={18} />
            </button>
          </div>
        </div>

        <div className="p-0 flex-1 overflow-auto">
          <div className="px-6 py-4 text-slate-500 text-sm border-b border-slate-800">
            Edit or remove global symbol mappings
          </div>
          
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 sticky top-0 z-10">
              <tr className="border-b border-slate-800">
                <th className="px-6 py-3 font-medium text-slate-500">Raw Key</th>
                <th className="px-6 py-3 font-medium text-slate-500">Standard</th>
                <th className="px-6 py-3 font-medium text-slate-500">Class</th>
                <th className="px-6 py-3 font-medium text-slate-500">Updated</th>
                <th className="px-6 py-3 font-medium text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MAPPINGS.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-3 font-mono text-slate-300">{item.raw}</td>
                  <td className="px-6 py-3 font-semibold text-white">{item.standard}</td>
                  <td className="px-6 py-3">
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 bg-slate-800 px-2 py-1 rounded">
                      {item.class}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs text-slate-500">{item.updated}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs hover:bg-slate-700 hover:text-white transition-colors">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/20 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

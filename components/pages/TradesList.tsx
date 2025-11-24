import React, { useState } from 'react';
import { Filter, Download, MoreHorizontal, Search, RefreshCw, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_TRADES } from '../../constants';
import { analyzeTradeBatch } from '../../services/geminiService';
import { Trade } from '../../types';
import TradeDetailModal from '../trades/TradeDetailModal';

export default function TradesList() {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const runAnalysis = async () => {
    setAnalyzing(true);
    const result = await analyzeTradeBatch(MOCK_TRADES);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  const getPnlColor = (pnl: number) => {
    return pnl > 0 ? 'text-emerald-400' : pnl < 0 ? 'text-red-400' : 'text-slate-400';
  };

  // Helper to guess asset class for display (Mock logic)
  const getAssetClass = (symbol: string) => {
    if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP')) return { label: 'CRYPTO', color: 'bg-indigo-500/20 text-indigo-300' };
    if (symbol.includes('NAS') || symbol.includes('US30') || symbol.includes('SPX')) return { label: 'INDEX', color: 'bg-violet-500/20 text-violet-300' };
    if (symbol.includes('XAU') || symbol.includes('XAG')) return { label: 'METAL', color: 'bg-yellow-500/20 text-yellow-300' };
    return { label: 'FX', color: 'bg-blue-500/20 text-blue-300' };
  };

  // Helper for Context Pills (PDF Page 9/10)
  const ContextPill = ({ label, type }: { label: string, type: 'session' | 'volatility' | 'regime' }) => {
    let color = '';
    if (type === 'session') color = 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20';
    if (type === 'volatility') {
      if (label === 'High' || label === 'Extreme') color = 'text-orange-300 bg-orange-500/10 border-orange-500/20';
      else color = 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20';
    }
    if (type === 'regime') color = 'text-blue-300 bg-blue-500/10 border-blue-500/20';

    return (
      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${color} font-medium`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Detail Modal */}
      {selectedTrade && (
        <TradeDetailModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Trades</h2>
          <p className="text-slate-400 text-sm">Review your normalized trade history and context tags.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={Download}>Export CSV</Button>
          <Button onClick={runAnalysis} variant="primary" size="sm" icon={RefreshCw} disabled={analyzing}>
            {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </Button>
        </div>
      </div>

      {aiAnalysis && (
        <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border border-indigo-500/30 p-4 rounded-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start gap-3">
             <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
               <RefreshCw size={20} className="text-white animate-spin-slow" />
             </div>
             <div>
               <h4 className="font-semibold text-white">SystemEdge Intelligence</h4>
               <p className="text-slate-200 text-sm mt-1 leading-relaxed">{aiAnalysis}</p>
             </div>
          </div>
        </div>
      )}

      {/* Filters Toolbar */}
      <Card className="p-3 !py-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by symbol, ID, or tag..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="h-6 w-px bg-slate-700 mx-1"></div>
          <Button variant="ghost" size="sm" icon={Filter}>Filters</Button>
          <select className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none">
            <option>Session: All</option>
            <option>London</option>
            <option>New York</option>
            <option>Tokyo</option>
          </select>
           <select className="bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-lg px-3 py-2 focus:outline-none">
            <option>Status: Closed</option>
            <option>Active</option>
            <option>Error</option>
          </select>
        </div>
      </Card>

      {/* Trades Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 border-b border-slate-800 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium text-slate-400 w-12"></th> {/* Status Check */}
                <th className="px-6 py-4 font-medium text-slate-400">Asset Class</th>
                <th className="px-6 py-4 font-medium text-slate-400">Symbol</th>
                <th className="px-6 py-4 font-medium text-slate-400 text-center">Side</th>
                <th className="px-6 py-4 font-medium text-slate-400 text-right">Size</th>
                <th className="px-6 py-4 font-medium text-slate-400 text-right">P&L</th>
                <th className="px-6 py-4 font-medium text-slate-400">Context</th>
                <th className="px-6 py-4 font-medium text-slate-400 text-center">Score</th>
                <th className="px-6 py-4 font-medium text-slate-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {MOCK_TRADES.map((trade) => {
                const asset = getAssetClass(trade.symbol);
                return (
                  <tr 
                    key={trade.id} 
                    className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedTrade(trade)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-emerald-500">
                        <CheckCircle2 size={16} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${asset.color}`}>
                         {asset.label}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{trade.symbol}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{trade.entryTime.split(' ')[0]}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${
                        trade.side === 'Buy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                         {trade.side === 'Buy' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-slate-300 font-mono">{trade.size}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-mono font-bold ${getPnlColor(trade.pnl)}`}>
                        {trade.pnl > 0 ? '+' : ''}{trade.pnl}
                      </div>
                      <div className="text-xs text-slate-600">USD</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                        {trade.session && <ContextPill label={trade.session} type="session" />}
                        {trade.volatility && <ContextPill label={trade.volatility} type="volatility" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {trade.score ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-white group-hover:border-primary group-hover:text-primary transition-all">
                          {trade.score.total}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">Showing 1-5 of 1,204 trades</span>
          <div className="flex gap-2">
            <button className="p-1 rounded bg-slate-800 text-slate-400 disabled:opacity-50"><ChevronLeft size={16} /></button>
            <button className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
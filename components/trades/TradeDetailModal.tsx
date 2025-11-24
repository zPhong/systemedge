import React, { useState } from 'react';
import { X, Copy, Clock, DollarSign, BarChart2, Info, Hash, Briefcase, Activity } from 'lucide-react';
import { Trade } from '../../types';

interface TradeDetailModalProps {
  trade: Trade;
  onClose: () => void;
}

const DetailRow = ({ label, value, subValue, valueColor = 'text-white' }: { label: string; value: React.ReactNode; subValue?: string; valueColor?: string }) => (
  <div className="flex justify-between items-start py-2 border-b border-slate-800/50 last:border-0">
    <span className="text-slate-500 font-medium text-sm">{label}</span>
    <div className="text-right">
      <div className={`text-sm font-semibold ${valueColor}`}>{value}</div>
      {subValue && <div className="text-xs text-slate-500 mt-0.5">{subValue}</div>}
    </div>
  </div>
);

const SectionCard = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
    <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
      <Icon size={16} className="text-slate-400" />
      <h3 className="font-bold text-slate-200 text-sm">{title}</h3>
    </div>
    <div className="p-5 space-y-1">
      {children}
    </div>
  </div>
);

export default function TradeDetailModal({ trade, onClose }: TradeDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'execution' | 'financials'>('overview');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl shadow-black flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
          <div>
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
               {trade.positionId || trade.id}
               <span className={`text-xs px-2 py-0.5 rounded border ${
                  trade.side === 'Buy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
               }`}>
                 {trade.side} {trade.symbol}
               </span>
             </h2>
             <p className="text-xs text-slate-500 mt-1">Detailed execution report</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
           <button 
             onClick={() => setActiveTab('overview')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
               activeTab === 'overview' ? 'border-primary text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
             }`}
           >
             Overview
           </button>
           <button 
             onClick={() => setActiveTab('execution')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
               activeTab === 'execution' ? 'border-primary text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
             }`}
           >
             Execution & Info
           </button>
           <button 
             onClick={() => setActiveTab('financials')}
             className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
               activeTab === 'financials' ? 'border-primary text-white' : 'border-transparent text-slate-400 hover:text-slate-200'
             }`}
           >
             Financials
           </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
               <SectionCard title="Symbol" icon={Briefcase}>
                  <DetailRow label="Symbol" value={trade.symbol} />
                  <DetailRow label="Description" value={trade.symbol === 'GBP/USD' ? 'British Pound vs US Dollar' : trade.symbol} />
                  <DetailRow 
                    label="Opening direction" 
                    value={trade.side} 
                    valueColor={trade.side === 'Buy' ? 'text-emerald-400' : 'text-red-400'} 
                  />
                  <DetailRow 
                    label="Closing direction" 
                    value={trade.side === 'Buy' ? 'Sell' : 'Buy'} 
                    valueColor={trade.side === 'Buy' ? 'text-red-400' : 'text-emerald-400'} 
                  />
               </SectionCard>

               <SectionCard title="Price" icon={DollarSign}>
                  <DetailRow label="Entry Price" value={trade.entryPrice} subValue={`Bid ${trade.entryPrice} (Ask ${trade.entryPrice + 0.0002})`} />
                  <DetailRow label="Exit Price" value={trade.exitPrice} subValue={`Ask ${trade.exitPrice} (Bid ${trade.exitPrice - 0.0002})`} />
                  <DetailRow label="Opening Price" value={trade.entryPrice} />
                  <DetailRow label="Closing Price" value={trade.exitPrice} />
               </SectionCard>

               <div className="md:col-span-2">
                 <SectionCard title="Performance Snapshot" icon={Activity}>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                         <span className="text-slate-500 text-sm block mb-1">Net P&L</span>
                         <span className={`text-3xl font-bold ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                           {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)} USD
                         </span>
                       </div>
                       <div>
                         <span className="text-slate-500 text-sm block mb-1">Score Impact</span>
                         <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">{trade.score?.total || 0}</span>
                            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">/ 100</span>
                         </div>
                       </div>
                    </div>
                 </SectionCard>
               </div>
            </div>
          )}

          {/* TAB 2: EXECUTION & INFO */}
          {activeTab === 'execution' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
              <SectionCard title="Volume" icon={BarChart2}>
                 <DetailRow label="Filled quantity" value={trade.size} />
                 <DetailRow label="Opening quantity" value={trade.size} />
                 <DetailRow label="Closing volume (USD)" value={`$${Math.abs(trade.pnl * 100).toLocaleString()}`} /> {/* Mock calc */}
                 <DetailRow label="Requested quantity" value={trade.size} />
                 <DetailRow 
                   label="Bought" 
                   value={trade.side === 'Buy' ? `${trade.symbol.split('/')[0]} / 100000` : '-'} 
                 />
                  <DetailRow 
                   label="Sold" 
                   value={trade.side === 'Sell' ? `$${trade.entryPrice}` : '-'} 
                 />
              </SectionCard>

              <SectionCard title="Info" icon={Info}>
                 <DetailRow label="Deal ID" value={<div className="font-mono text-xs">{trade.dealId || 'N/A'}</div>} />
                 <DetailRow label="Status" value="Filled" valueColor="text-emerald-400" />
                 <DetailRow label="Closed by" value="TP (Take Profit)" />
                 <DetailRow label="Closing" value={<div className="font-mono text-xs">{trade.closingDealId || 'N/A'}</div>} />
                 <DetailRow label="Requesting order" value={<div className="font-mono text-xs">{trade.orderId || 'N/A'}</div>} />
                 <DetailRow label="Affected position" value={<div className="font-mono text-xs">{trade.positionId || trade.id}</div>} />
                 <DetailRow label="Channel" value={trade.channel || 'cTrader 2 iOS'} />
              </SectionCard>
            </div>
          )}

          {/* TAB 3: FINANCIALS & TIME */}
          {activeTab === 'financials' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-right-4 duration-300">
               <SectionCard title="Time" icon={Clock}>
                 <DetailRow label="Matching time" value={trade.entryTime} subValue="(UTC+7:00)" />
                 <DetailRow label="Opening time" value={trade.entryTime} subValue="(UTC+7:00)" />
                 <DetailRow label="Execution time (ms)" value="611" />
                 <DetailRow label="Closing time" value={trade.exitTime} subValue="(UTC+7:00)" />
               </SectionCard>

               <SectionCard title="Realised P&L and fees" icon={Hash}>
                 <DetailRow label="Swaps" value={`${trade.swap ? trade.swap.toFixed(2) : '0.00'} USD`} />
                 <DetailRow label="Broker commission" value={`${trade.commission ? trade.commission.toFixed(2) : '0.00'} USD`} />
                 <DetailRow label="Partner commission" value="0.00 USD" />
                 <DetailRow label="Copying commission" value="0.00 USD" />
                 <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                    <span className="font-bold text-slate-200">Net Realised P&L</span>
                    <span className={`font-bold text-xl ${trade.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {trade.pnl.toFixed(2)} USD
                    </span>
                 </div>
               </SectionCard>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
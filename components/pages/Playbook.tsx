import React from 'react';
import { BookOpen, Pin, Clock, Shield, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_PLAYBOOK } from '../../constants';

export default function Playbook() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-indigo-400" /> My Playbook
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            This is your <span className="text-indigo-300 font-medium">Durable Edge</span>. When you accept an AI Nudge, it becomes a permanent Rule here. 
            SystemEdge uses these rules to warn you before you make a mistake.
          </p>
        </div>
        <div className="flex gap-3">
             <Button variant="outline" size="sm">View Archived</Button>
             <Button variant="primary" size="sm">Export Rules</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PLAYBOOK.map((rule) => (
          <div key={rule.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col hover:border-slate-600 transition-all group relative overflow-hidden shadow-sm">
             
             {rule.status === 'Pinned' && (
               <div className="absolute top-4 right-4 text-indigo-400 bg-indigo-500/10 p-1.5 rounded-lg border border-indigo-500/20">
                 <Pin size={14} fill="currentColor" />
               </div>
             )}
             
             <div className="flex-1">
               <div className="mb-4">
                 <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-slate-950 text-slate-500 border border-slate-800">
                   {rule.id}
                 </span>
               </div>
               <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">{rule.title}</h3>
               
               <div className="space-y-4 mt-5">
                 <div className="flex gap-3 items-start">
                    <div className="mt-0.5 text-slate-500"><Clock size={16} /></div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider block mb-0.5">When (Trigger)</span>
                      <p className="text-sm text-slate-300 font-medium">{rule.condition}</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-3 items-start p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                    <div className="mt-0.5 text-emerald-500"><Shield size={16} /></div>
                    <div>
                      <span className="text-[10px] uppercase text-emerald-500/80 font-bold tracking-wider block mb-0.5">Do This (Protocol)</span>
                      <p className="text-sm text-emerald-300 font-medium leading-snug">{rule.action}</p>
                    </div>
                 </div>
               </div>
             </div>

             <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium">Verified: 2 days ago</span>
                <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                  Edit Rule <ArrowRight size={12} />
                </button>
             </div>
          </div>
        ))}

        {/* Add New Placeholder */}
        <button className="border-2 border-dashed border-slate-800 bg-slate-900/50 rounded-xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-slate-900 transition-all min-h-[250px] group">
           <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-indigo-500/30 transition-all">
             <span className="text-3xl font-light text-slate-400 group-hover:text-indigo-400">+</span>
           </div>
           <span className="font-semibold">Add Manual Rule</span>
           <span className="text-xs text-slate-600 mt-2">Define a custom trigger</span>
        </button>
      </div>

      <Card title="Playbook Evolution" className="mt-8">
        <div className="py-6 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-slate-800 -z-10"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center bg-slate-900 p-4 rounded-xl border border-slate-800 z-10 w-full md:w-auto">
              <span className="text-xs text-slate-500 mb-2">October Version</span>
              <div className="w-3 h-3 rounded-full bg-slate-600 mb-2 ring-4 ring-slate-900"></div>
              <span className="font-medium text-slate-300">v1.0 Baseline</span>
              <span className="text-xs text-slate-500">3 Rules</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center bg-slate-900 p-4 rounded-xl border border-slate-800 z-10 w-full md:w-auto">
              <span className="text-xs text-slate-500 mb-2">November Update</span>
              <div className="w-3 h-3 rounded-full bg-slate-600 mb-2 ring-4 ring-slate-900"></div>
              <span className="font-medium text-slate-300">v1.2 Refinement</span>
              <span className="text-xs text-slate-500">+2 New Rules</span>
            </div>

            {/* Current */}
            <div className="flex flex-col items-center text-center bg-slate-800 p-4 rounded-xl border border-indigo-500/30 z-10 w-full md:w-auto shadow-sm">
              <span className="text-xs text-indigo-300 mb-2 font-bold">Current Active</span>
              <div className="w-3 h-3 rounded-full bg-indigo-500 mb-2 ring-4 ring-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              <span className="font-bold text-white">v1.3 Adaptive</span>
              <span className="text-xs text-indigo-200">92% Confidence Score</span>
            </div>

          </div>
        </div>
      </Card>
    </div>
  );
}
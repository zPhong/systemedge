import React, { useState } from 'react';
import { Sparkles, Lightbulb, MessageSquareQuote, Check, X, Edit2, Play } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { generateNudge } from '../../services/geminiService';
import { Nudge } from '../../types';

export default function Insights() {
  const [nudges, setNudges] = useState<Nudge[]>([
    {
      id: 'n1',
      type: 'Behavioral',
      title: 'Stop Loss Discipline',
      message: 'You moved your stop loss in 3 losing trades this week. This reduced your Capital Efficiency score by 8 points.',
      confidence: 0.92,
      isNew: true
    },
    {
      id: 'n2',
      type: 'Temporal',
      title: 'New York Reversals',
      message: 'Your win rate on "Trend-Up" setups during the New York Lunch hour (12-1pm) is only 35%. Consider waiting for the 1:30pm volume.',
      confidence: 0.78,
      isNew: false
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const newNudge = await generateNudge("Recent trades show impatience during low volatility.");
    setNudges([newNudge, ...nudges]);
    setLoading(false);
  };

  const removeNudge = (id: string) => {
    setNudges(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Feed */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-secondary" /> AI Coach
            </h2>
            <p className="text-slate-400 text-sm">Actionable nudges based on your 5D Scoring.</p>
          </div>
          <Button onClick={handleGenerate} disabled={loading} variant="primary" size="sm" icon={Play}>
            {loading ? 'Thinking...' : 'Analyze Now'}
          </Button>
        </div>

        <div className="space-y-4">
          {nudges.map((nudge) => (
            <div key={nudge.id} className="relative group bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-600 transition-all shadow-sm overflow-hidden">
               
               <div className="relative z-10">
                 <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-2">
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                       nudge.type === 'Behavioral' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' :
                       'text-blue-400 border-blue-500/20 bg-blue-500/10'
                     }`}>
                       {nudge.type}
                     </span>
                     {nudge.isNew && <span className="text-[10px] text-emerald-400 font-bold">NEW</span>}
                   </div>
                   <span className="text-xs text-slate-500">Confidence: {(nudge.confidence * 100).toFixed(0)}%</span>
                 </div>

                 <h3 className="text-lg font-semibold text-white mb-2">{nudge.title}</h3>
                 <p className="text-slate-300 text-sm leading-relaxed mb-6">
                   {nudge.message}
                 </p>

                 {/* Actions */}
                 <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    <Button size="sm" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-transparent">
                      <Check size={16} /> Accept & Add to Playbook
                    </Button>
                    <Button variant="ghost" size="sm" icon={Edit2}>Tweak</Button>
                    <div className="flex-1"></div>
                    <Button variant="ghost" size="sm" onClick={() => removeNudge(nudge.id)} className="text-slate-500 hover:text-red-400">
                      <X size={16} />
                    </Button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar - Stats */}
      <div className="space-y-6">
        <Card title="Coach Performance">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Nudge Accuracy</span>
                <span className="text-white font-medium">84%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full">
                <div className="h-full bg-indigo-500 w-[84%] rounded-full"></div>
              </div>
            </div>
             <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Adoption Rate</span>
                <span className="text-white font-medium">62%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full">
                <div className="h-full bg-blue-500 w-[62%] rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
          <MessageSquareQuote className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <h4 className="text-white font-medium mb-2">Weekly Summary</h4>
          <p className="text-sm text-slate-400 italic">"You are becoming more disciplined in Asian sessions, but risk management in choppy US sessions needs work."</p>
        </div>
      </div>
    </div>
  );
}
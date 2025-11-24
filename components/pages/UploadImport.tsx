import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, ArrowRight, X } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MOCK_REPAIRS } from '../../constants';
import { RepairItem } from '../../types';

type Stage = 'idle' | 'uploading' | 'validating' | 'repair_needed' | 'success';

interface UploadImportProps {
  onComplete: () => void;
}

export default function UploadImport({ onComplete }: UploadImportProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);
  const [repairs, setRepairs] = useState<RepairItem[]>(MOCK_REPAIRS);

  // Simulate file upload process
  const handleFileDrop = (e: React.DragEvent | React.ChangeEvent) => {
    e.preventDefault();
    setStage('uploading');
    
    // Simulate upload progress
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStage('validating');
        setTimeout(() => setStage('repair_needed'), 1500); // Force repair flow as per PDF
      }
    }, 200);
  };

  const handleRepair = (id: string) => {
    setRepairs(prev => prev.filter(r => r.id !== id));
    if (repairs.length <= 1) {
      setStage('success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Import Data</h2>
        <p className="text-slate-400">Upload CSV exports or sync cTrader history.</p>
      </div>

      {/* Upload Zone */}
      {stage === 'idle' && (
        <Card className="border-dashed border-2 border-slate-700 bg-slate-900/30 min-h-[400px] flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-900/50 transition-all group">
           <div className="relative">
             <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
             <UploadCloud className="w-20 h-20 text-slate-500 group-hover:text-primary transition-colors relative z-10" />
           </div>
           <h3 className="mt-6 text-xl font-semibold text-slate-200">Drag & Drop Trading History</h3>
           <p className="text-slate-500 mt-2 text-sm text-center max-w-sm">
             Supports cTrader CSV, JSON, or SystemEdge Template. <br/>
             Max file size 10MB.
           </p>
           <div className="mt-8 flex gap-4">
             <Button onClick={(e) => handleFileDrop(e as any)}>Select File</Button>
             <Button variant="outline">Connect API</Button>
           </div>
           {/* Hidden input for semantics */}
           <input type="file" className="hidden" onChange={handleFileDrop} />
        </Card>
      )}

      {/* Progress View */}
      {(stage === 'uploading' || stage === 'validating') && (
        <Card className="min-h-[300px] flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-4 text-center">
            <div className="flex justify-between text-sm font-medium text-slate-300">
              <span>{stage === 'uploading' ? 'Uploading...' : 'Validating Schema & Timezones...'}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {stage === 'validating' && (
              <p className="text-xs text-slate-500 animate-pulse">Checking 1,024 rows against profile timezone (UTC+8)...</p>
            )}
          </div>
        </Card>
      )}

      {/* Repair Panel (Critical Feature from PDF) */}
      {stage === 'repair_needed' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-4">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-start gap-3">
             <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" />
             <div>
               <h3 className="text-orange-200 font-medium">Action Required: {repairs.length} Data Issues Found</h3>
               <p className="text-orange-200/60 text-sm mt-1">Some trades could not be automatically paired or validated. Please review below.</p>
             </div>
          </div>

          <div className="grid gap-4">
            {repairs.map((repair) => (
              <div key={repair.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between group hover:border-slate-700 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                    <X size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{repair.issue}</h4>
                    <p className="text-xs text-slate-500 font-mono mt-1">{repair.tradeDetails}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">Auto-Fix Available</span>
                       <span className="text-xs text-slate-400">Suggestion: {repair.suggestedFix}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Dismiss</Button>
                  <Button size="sm" onClick={() => handleRepair(repair.id)}>Apply Fix</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success State */}
      {stage === 'success' && (
        <Card className="min-h-[300px] flex flex-col items-center justify-center text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white">Import Complete</h3>
          <p className="text-slate-400 mt-2 max-w-sm">
            1,024 trades successfully imported, paired, and enriched with context data.
          </p>
          <div className="mt-8 flex gap-4">
            <Button variant="outline" onClick={() => setStage('idle')}>Import More</Button>
            <Button onClick={onComplete} icon={ArrowRight}>View Trades</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
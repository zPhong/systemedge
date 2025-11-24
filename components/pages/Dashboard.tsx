import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  DollarSign,
  Zap,
  ShieldCheck,
  Clock,
  Target,
  BrainCircuit
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { Card, StatCard } from '../ui/Card';
import { Button } from '../ui/Button';

// Mock Data for Charts
const PERFORMANCE_DATA = [
  { date: 'Mon', pnl: 120 },
  { date: 'Tue', pnl: 230 },
  { date: 'Wed', pnl: -50 },
  { date: 'Thu', pnl: 450 },
  { date: 'Fri', pnl: 320 },
  { date: 'Sat', pnl: 150 },
  { date: 'Sun', pnl: 280 },
];

// 5D Scoring Engine Data (PDF Page 11)
const RADAR_DATA = [
  { subject: 'Entry Quality', A: 85, fullMark: 100 },
  { subject: 'Risk:Reward', A: 65, fullMark: 100 },
  { subject: 'Time Alpha', A: 92, fullMark: 100 },
  { subject: 'Cap. Efficiency', A: 70, fullMark: 100 },
  { subject: 'Tech. Delta', A: 80, fullMark: 100 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400 text-sm">Welcome back, Jill. Your system is evolving.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            System Status: Healthy
          </span>
          <Button variant="secondary" size="sm" icon={TrendingUp}>Detailed Report</Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total P&L" 
          value="$8,420.50" 
          subValue="Last 30 days"
          trend="up"
          trendValue="+12.5%"
          icon={DollarSign}
        />
        <StatCard 
          title="Win Rate" 
          value="68.4%" 
          subValue="31 Trades"
          trend="up"
          trendValue="+2.1%"
          icon={Target}
        />
        <StatCard 
          title="Sharpe Ratio" 
          value="1.85" 
          subValue="Risk Adjusted"
          trend="neutral"
          trendValue="0.0"
          icon={ShieldCheck}
        />
        <StatCard 
          title="Avg Repair Time" 
          value="45s" 
          subValue="Data Health"
          trend="down"
          trendValue="-5s"
          icon={Zap}
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Equity Curve */}
        <Card title="Performance Over Time" className="lg:col-span-2 min-h-[400px]">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748b" 
                  tick={{fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  tick={{fontSize: 12}} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff'}}
                  itemStyle={{color: '#3b82f6'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPnl)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 5D Scoring Radar */}
        <Card title="5D Scoring Engine" className="min-h-[400px]">
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="System Score"
                  dataKey="A"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-2">
            <p className="text-2xl font-bold text-white">78.4</p>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Composite Score</p>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] text-indigo-300">
              Entry Quality: Strong
            </div>
            <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] text-orange-300">
              Risk:Reward: Weak
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Access/Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Recent Insights (AI Coach)">
          <div className="space-y-4">
            <div className="flex gap-4 items-start p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <div className="mt-1 p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                <BrainCircuit size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Improved London Session Timing</h4>
                <p className="text-xs text-slate-400 mt-1">Your Time Alpha score in London Open has increased by 12% this week. Keep waiting for the 15m confirmation.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
               <div className="mt-1 p-2 bg-orange-500/20 text-orange-400 rounded-lg">
                <Clock size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Hold Time Warning</h4>
                <p className="text-xs text-slate-400 mt-1">You are cutting winners 20% faster in high-volatility regimes compared to last month.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="System Health & Repair">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <span className="text-sm text-slate-300">Imports Validated</span>
               </div>
               <span className="text-sm font-mono text-slate-500">99.8%</span>
            </div>
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                 <span className="text-sm text-slate-300">Pairing Success</span>
               </div>
               <span className="text-sm font-mono text-slate-500">100%</span>
            </div>
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                 <span className="text-sm text-slate-300">Context Feeds</span>
               </div>
               <span className="text-sm font-mono text-orange-400">Degraded (Macro)</span>
            </div>
            <Button className="w-full" variant="outline">View Telemetry</Button>
        </Card>
      </div>
    </div>
  );
}
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action, noPadding = false }) => {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-sm ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          {title && <h3 className="font-semibold text-slate-100 text-base">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

export const StatCard: React.FC<{
  title: string;
  value: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ElementType;
}> = ({ title, value, subValue, trend, trendValue, icon: Icon }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-start justify-between hover:border-slate-700 transition-all duration-200 shadow-sm group">
    <div>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">{title}</p>
      <h4 className="text-2xl font-bold text-slate-100 mb-2 tracking-tight">{value}</h4>
      <div className="flex items-center gap-2">
        {trend && (
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
            trend === 'down' ? 'bg-red-500/10 text-red-400' : 'bg-slate-800 text-slate-400'
          }`}>
            {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'} {trendValue}
          </span>
        )}
        {subValue && <span className="text-xs text-slate-500">{subValue}</span>}
      </div>
    </div>
    {Icon && (
      <div className="p-3 rounded-lg bg-slate-800/50 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800 transition-colors">
        <Icon size={20} />
      </div>
    )}
  </div>
);
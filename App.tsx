
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  LineChart, 
  BrainCircuit, 
  BookOpen, 
  Settings, 
  UserCircle,
  Bell,
  LogOut,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';

// Pages
import Dashboard from './components/pages/Dashboard';
import UploadImport from './components/pages/UploadImport';
import TradesList from './components/pages/TradesList';
import Insights from './components/pages/Insights';
import Playbook from './components/pages/Playbook';
import Admin from './components/pages/Admin';

// Components
import { Button } from './components/ui/Button';

type View = 'dashboard' | 'trades' | 'insights' | 'upload' | 'playbook' | 'admin';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'upload': return <UploadImport onComplete={() => setCurrentView('trades')} />;
      case 'trades': return <TradesList />;
      case 'insights': return <Insights />;
      case 'playbook': return <Playbook />;
      case 'admin': return <Admin />;
      default: return <Dashboard />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
        currentView === view 
          ? 'bg-primary/10 text-primary' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-slate-200 flex flex-col font-sans selection:bg-primary/30">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
              SE
            </div>
            <div>
              <h1 className="font-bold text-white leading-none tracking-tight">SystemEdge</h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">AI Trading OS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800/50">
            <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem view="trades" icon={LineChart} label="Trades" />
            <NavItem view="insights" icon={BrainCircuit} label="AI Coach" />
            <NavItem view="playbook" icon={BookOpen} label="Playbook" />
            <NavItem view="upload" icon={UploadCloud} label="Import" />
            <div className="w-px h-5 bg-slate-800 mx-1"></div>
            <NavItem view="admin" icon={ShieldAlert} label="Admin" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-background"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-700 bg-slate-900 hover:border-slate-600 transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                  <UserCircle size={20} className="text-slate-300" />
                </div>
                <span className="text-xs font-medium text-slate-300">Trader_01</span>
                <ChevronDown size={14} className="text-slate-500 mr-1" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs text-slate-500">Workspace</p>
                    <p className="text-sm font-medium text-white">Pepperstone Live</p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800 flex items-center gap-2">
                    <Settings size={16} /> Settings
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

import React from 'react';
import { 
  LayoutDashboard, 
  Crosshair, 
  Briefcase, 
  History, 
  BarChart3, 
  RotateCcw, 
  Server, 
  Settings,
  Radar
} from 'lucide-react';
import { NavItem, ViewId } from '../types';

interface SidebarProps {
  activeView: ViewId;
  onViewChange: (viewId: ViewId) => void;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'scanner', label: 'Market Scanner', icon: Crosshair },
  { id: 'positions', label: 'Watchlist & Alerts', icon: Briefcase },
  { id: 'ledger', label: 'Signal Journal', icon: History },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'replay', label: 'Replay Lab', icon: RotateCcw },
  { id: 'status', label: 'System Status', icon: Server },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 h-full bg-zinc-950/60 backdrop-blur-xl border-r border-zinc-800/60 flex flex-col relative z-20">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          <Radar className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">
          QuantPilot
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer group ${
                isActive 
                  ? 'bg-orange-500/10 text-orange-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_15px_rgba(249,115,22,0.1)] border border-orange-500/20' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white border border-transparent hover:border-zinc-700/50 hover:-translate-y-0.5'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? 'text-orange-400' : 'group-hover:text-white'}`} />
              <span className={`text-xs font-semibold tracking-wide ${isActive ? 'text-orange-400' : 'group-hover:text-white'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-5 border-t border-zinc-800/60 bg-zinc-950/30">
        <div className="flex items-center space-x-3 p-3 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800/50 shadow-lg">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-zinc-700 shadow-inner"></div>
          <div className="flex-1 overflow-hidden text-left">
            <p className="text-xs font-bold text-white truncate tracking-wide">COMMODITY DESK</p>
            <p className="text-[10px] text-zinc-500 truncate tracking-wider uppercase font-semibold">Demo UI</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

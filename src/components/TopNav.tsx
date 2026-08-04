import React from 'react';
import { Search, Bell, User, CheckCircle2 } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-16 border-b border-zinc-800/60 bg-zinc-950/50 backdrop-blur-xl px-8 flex items-center justify-between shrink-0 relative z-10">
      <div className="flex items-center space-x-8">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search gold, oil, silver, stock..." 
            className="w-full bg-zinc-900/60 border border-zinc-700/50 text-xs py-2 pl-10 pr-4 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-zinc-900 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white placeholder:text-zinc-500 transition-all duration-300"
          />
        </div>
        <div className="flex items-center space-x-2 text-[10px] text-emerald-400 font-mono tracking-wider font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span>DEMO DATA MODE</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-0.5">Tracked Markets</p>
          <p className="text-sm text-white font-mono font-bold tracking-wide">24 Assets</p>
        </div>
        <div className="w-px h-8 bg-zinc-800/80"></div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-orange-400 px-5 py-2 rounded-xl text-xs font-bold tracking-wider cursor-pointer hover:from-orange-500/30 hover:to-orange-600/30 hover:text-orange-300 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 transition-all duration-300">
          <span>ADD ASSET</span>
        </button>
      </div>
    </header>
  );
}

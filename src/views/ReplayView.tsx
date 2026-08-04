import React, { useState } from 'react';
import { Play, Pause, SkipForward, Rewind, FastForward, Activity, Settings2, Target, ShieldAlert } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const mockChartData = Array.from({ length: 50 }).map((_, i) => {
  const base = 2430;
  const variance = Math.sin(i * 0.2) * 18 + Math.random() * 8;
  const price = base + variance;
  const isUp = Math.random() > 0.5;
  return {
    time: `10:${(i % 60).toString().padStart(2, '0')}`,
    price: price,
    volume: Math.random() * 100 + 10,
    isUp,
  };
});

export function ReplayView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<'1x' | '2x' | '5x'>('1x');
  
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 gap-6 relative z-10">
      {/* Header & Controls */}
      <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-4 shrink-0 flex flex-col sm:flex-row gap-4 sm:items-center justify-between shadow-lg">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 border-r border-zinc-700/50 pr-5">
            <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-xl shadow-[0_0_10px_rgba(249,115,22,0.1)]">
              <Activity className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">XAU/USD <span className="text-zinc-500 font-normal">Market Replay</span></h2>
              <p className="text-[10px] text-zinc-400 font-mono tracking-wider mt-0.5">15m • Oct 10, 2023 - Oct 12, 2023</p>
            </div>
          </div>
          
          <div className="flex items-center bg-zinc-950/80 border border-zinc-700/50 rounded-xl p-1.5 shadow-inner">
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <Rewind className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors mx-1"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]" /> : <Play className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />}
            </button>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-zinc-950/80 border border-zinc-700/50 rounded-xl p-1 space-x-1 shadow-inner">
            {['1x', '2x', '5x'].map((s) => (
              <button 
                key={s}
                onClick={() => setSpeed(s as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  speed === s ? 'bg-zinc-800/80 text-white shadow-md border border-zinc-700/50' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30 border border-transparent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 border border-zinc-700/50 shadow-md hover:shadow-lg hover:-translate-y-0.5">
          <Settings2 className="w-4 h-4" />
          SESSION SETUP
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
        {/* Chart Area */}
        <div className="flex-[3] bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col p-5 min-h-[400px] shadow-xl">
          <div className="flex justify-between items-center mb-5 shrink-0">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-mono font-bold text-white tracking-tight">2,435.50</span>
              <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">+12.40 (0.5%)</span>
            </div>
          </div>
          
          <div className="flex-1 w-full min-h-0 flex flex-col gap-4">
            <div className="flex-[3] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} orientation="right" tickFormatter={(v) => v.toLocaleString()} fontWeight={600} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(24,24,27,0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(63,63,70,0.5)', fontSize: '12px', color: '#f4f4f5', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                    labelStyle={{ color: '#a1a1aa', fontWeight: 'bold' }}
                    itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute right-0 top-1/2 w-full h-[1px] bg-transparent border-t border-dashed border-orange-500/50 pointer-events-none drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">
                <div className="absolute right-0 -top-3.5 bg-orange-500 text-orange-950 text-xs font-mono font-bold px-2 py-1 rounded shadow-lg">2435.50</div>
              </div>
            </div>
            <div className="flex-1 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockChartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="time" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} minTickGap={30} fontWeight={600} />
                  <Tooltip cursor={{ fill: 'rgba(63,63,70,0.2)' }} contentStyle={{ backgroundColor: 'rgba(24,24,27,0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(63,63,70,0.5)', borderRadius: '12px' }} />
                  <Bar dataKey="volume" radius={[2, 2, 0, 0]}>
                    {mockChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isUp ? '#10b981' : '#ef4444'} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Setup Simulation Box */}
        <div className="w-full lg:w-[360px] shrink-0 flex flex-col gap-6">
          <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 border-b border-zinc-800/60 pb-3">Simulated Setup</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Demo Allocation ($)</label>
                <input type="number" defaultValue={1000} step={100} className="w-full bg-zinc-950/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-white font-mono focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-red-500/80 uppercase tracking-widest mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Lower Alert
                  </label>
                  <input type="number" defaultValue={2405} className="w-full bg-zinc-950/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-red-400 font-mono focus:outline-none focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all" />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest mb-1.5">
                    <Target className="w-3.5 h-3.5" /> Upper Alert
                  </label>
                  <input type="number" defaultValue={2460} className="w-full bg-zinc-950/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-emerald-400 font-mono focus:outline-none focus:border-emerald-500/50 focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3">
                <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 py-3.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5">
                  BULLISH
                </button>
                <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-red-950 py-3.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:-translate-y-0.5">
                  BEARISH
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex-1 flex flex-col min-h-[220px] overflow-hidden shadow-xl">
             <div className="p-4 border-b border-zinc-800/60 bg-zinc-950/40 shrink-0">
               <span className="text-xs font-bold text-white uppercase tracking-widest">Saved Paper Setups</span>
             </div>
             <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {/* Mock Active Setup */}
                <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.1)]">Bullish</span>
                      <span className="text-sm font-bold text-white tracking-wide">XAU/USD</span>
                    </div>
                    <span className="text-emerald-400 font-mono text-sm font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">+$45.20</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono font-medium mb-4">
                    <span>Ref: 2,423.00</span>
                    <span>Demo: $1,000</span>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex-1 bg-zinc-800/50 hover:bg-zinc-700 text-white text-[10px] py-2 rounded-lg font-bold transition-all border border-zinc-700/50 tracking-wider">EDIT RANGE</button>
                     <button className="flex-1 bg-zinc-800/50 hover:bg-red-500/10 text-red-400 border border-zinc-700/50 hover:border-red-500/30 text-[10px] py-2 rounded-lg font-bold transition-all tracking-wider hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]">REMOVE</button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

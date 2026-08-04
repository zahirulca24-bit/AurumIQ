import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity, DollarSign } from 'lucide-react';

const dailyPnlData = [
  { day: 'Mon', pnl: 4500 },
  { day: 'Tue', pnl: 2100 },
  { day: 'Wed', pnl: -1200 },
  { day: 'Thu', pnl: 3400 },
  { day: 'Fri', pnl: 5200 },
  { day: 'Sat', pnl: -800 },
  { day: 'Sun', pnl: 1500 },
  { day: 'Mon', pnl: 2800 },
  { day: 'Tue', pnl: -1500 },
  { day: 'Wed', pnl: 4200 },
];

const winLossData = [
  { name: 'Wins', value: 68 },
  { name: 'Losses', value: 32 },
];
const COLORS = ['#10b981', '#ef4444'];

const strategyData = [
  { name: 'Gold Trend Watch', trades: 145, winRate: 72.4, pnl: 12450 },
  { name: 'Oil Supply Zone', trades: 84, winRate: 64.2, pnl: 8320 },
  { name: 'Silver Momentum', trades: 112, winRate: 68.8, pnl: 9100 },
  { name: 'Stock Volatility', trades: 45, winRate: 58.1, pnl: -1200 },
];

export function AnalyticsView() {
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 gap-6 overflow-y-auto relative z-10">
      {/* Key Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 shrink-0">
        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/30">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
            <Target className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Win Rate</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end space-x-2 relative z-10">
            <span className="text-3xl font-bold text-white tracking-tight">68.4%</span>
            <span className="text-xs text-emerald-500 pb-1 font-mono font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]">+2.1%</span>
          </div>
        </div>
        
        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/30">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
            <TrendingUp className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Profit Factor</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end space-x-2 relative z-10">
            <span className="text-3xl font-bold text-white tracking-tight">2.14</span>
          </div>
        </div>
        
        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] hover:border-orange-500/30">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
            <Activity className="w-24 h-24 text-orange-500" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Avg R:R Ratio</span>
            <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end space-x-2 relative z-10">
            <span className="text-3xl font-bold text-white tracking-tight">1:1.8</span>
          </div>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] hover:border-red-500/30">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
            <TrendingDown className="w-24 h-24 text-red-500" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Max Drawdown</span>
            <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end space-x-2 relative z-10">
            <span className="text-3xl font-bold text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)] tracking-tight">-12.4%</span>
            <span className="text-[10px] text-zinc-500 pb-1.5 font-mono font-bold tracking-wider">Last 90d</span>
          </div>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-5 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] hover:border-emerald-500/30">
          <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
             <DollarSign className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Total Net Profit</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end space-x-2 relative z-10">
            <span className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)] tracking-tight">+$124.5k</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0 min-h-[300px]">
        {/* Daily PnL Bar Chart */}
        <div className="lg:col-span-2 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col p-5 shadow-xl">
          <div className="mb-6 flex justify-between items-center">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Daily P&L</span>
            <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-700/50">Trailing 10 Days</span>
          </div>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyPnlData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} opacity={0.5} />
                <XAxis 
                  dataKey="day" 
                  stroke="#71717a" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  fontWeight={600}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={10}
                  tickFormatter={(value) => `$${value}`}
                  tickLine={false}
                  axisLine={false}
                  fontWeight={600}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(24,24,27,0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(63,63,70,0.5)', fontSize: '12px', color: '#f4f4f5', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }}
                  cursor={{ fill: 'rgba(63,63,70,0.2)' }}
                  formatter={(value: number) => [
                    <span className={`font-mono font-bold ${value >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {value >= 0 ? '+' : ''}${Math.abs(value)}
                    </span>,
                    <span className="text-zinc-400 uppercase tracking-wider text-[10px] font-bold">Net P&L</span>
                  ]}
                  labelStyle={{ color: '#a1a1aa', fontWeight: 'bold', marginBottom: '6px' }}
                />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                  {dailyPnlData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? 'url(#colorProfit)' : 'url(#colorLoss)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win/Loss Pie Chart */}
        <div className="lg:col-span-1 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col p-5 shadow-xl">
          <div className="mb-6 flex justify-between items-center">
            <span className="text-xs font-bold text-white uppercase tracking-widest">Win/Loss Ratio</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20 font-bold shadow-[0_0_10px_rgba(16,185,129,0.1)]">2.12 : 1</span>
          </div>
          <div className="flex-1 w-full relative min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                   <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                         <feMergeNode in="coloredBlur"/>
                         <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                   </filter>
                </defs>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth={2}
                  cornerRadius={4}
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} filter="url(#glow)" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(24,24,27,0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(63,63,70,0.5)', fontSize: '12px', color: '#f4f4f5', borderRadius: '12px' }}
                  itemStyle={{ color: '#f4f4f5', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none drop-shadow-lg">
              <span className="text-3xl font-bold text-white tracking-tight">68%</span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Win Rate</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4 shrink-0 bg-zinc-950/40 py-2.5 rounded-xl border border-zinc-800/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
              <span className="text-xs text-zinc-300 font-bold uppercase tracking-widest">Wins (68)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
              <span className="text-xs text-zinc-300 font-bold uppercase tracking-widest">Losses (32)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Breakdown Table */}
      <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col shrink-0 overflow-hidden min-h-[200px] shadow-xl">
        <div className="p-4 border-b border-zinc-800/60 shrink-0 bg-zinc-950/40">
          <span className="text-xs font-bold text-white uppercase tracking-widest">Strategy Breakdown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-800/60 bg-zinc-950/20">
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Strategy Name</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Total Setups</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Win Rate</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap text-right">Net P&L</th>
              </tr>
            </thead>
            <tbody className="text-sm text-zinc-300">
              {strategyData.map((strategy, idx) => (
                <tr key={idx} className="border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-all duration-200 group relative">
                  <td className="py-4 px-5 font-bold text-white whitespace-nowrap relative">
                    <div className="absolute inset-y-0 left-0 w-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                    {strategy.name}
                  </td>
                  <td className="py-4 px-5 font-mono text-zinc-400 whitespace-nowrap">{strategy.trades}</td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-white w-12">{strategy.winRate}%</span>
                      <div className="w-32 h-2 bg-zinc-800/80 rounded-full overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full ${strategy.winRate >= 50 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]'}`} 
                          style={{ width: `${strategy.winRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <span className={`font-mono font-bold text-lg ${strategy.pnl >= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]'}`}>
                      {strategy.pnl >= 0 ? '+' : ''}${Math.abs(strategy.pnl).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

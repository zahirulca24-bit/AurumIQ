import React, { useEffect, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Settings, Play, Square, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { fetchMarketQuotes, formatPrice, formatSigned, MarketQuote } from '../services/marketData';

const mockChartData = [
  { time: '09:30', equity: 1000000 },
  { time: '10:00', equity: 1012000 },
  { time: '11:00', equity: 1008000 },
  { time: '12:00', equity: 1025000 },
  { time: '13:00', equity: 1018000 },
  { time: '14:00', equity: 1032000 },
  { time: '15:00', equity: 1045000 },
  { time: '16:00', equity: 1042500 },
];

export function DashboardView() {
  const [timeframe, setTimeframe] = useState('1D');
  const [orderType, setOrderType] = useState('Market');
  const [side, setSide] = useState<'Buy' | 'Sell'>('Buy');
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [dataStatus, setDataStatus] = useState('Loading market data');

  useEffect(() => {
    let cancelled = false;

    async function loadQuotes() {
      try {
        const data = await fetchMarketQuotes(['XAU', 'XAG', 'WTI', 'NVDA']);
        if (!cancelled) {
          setQuotes(data.quotes);
          setDataStatus(data.quotes.some((quote) => quote.status === 'ok') ? 'Alpha Vantage data' : 'Data unavailable');
        }
      } catch (error) {
        if (!cancelled) {
          setDataStatus(error instanceof Error ? error.message : 'Data unavailable');
        }
      }
    }

    loadQuotes();
    const timer = window.setInterval(loadQuotes, 300000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const quoteBySymbol = (symbol: string) => quotes.find((quote) => quote.symbol === symbol);
  const gold = quoteBySymbol('XAU/USD');
  const silver = quoteBySymbol('XAG/USD');
  const oil = quoteBySymbol('WTI OIL');
  const nvda = quoteBySymbol('NVDA');

  return (
    <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 min-h-0 relative z-10">
      
      {/* Top Metrics Row */}
      <div className="md:col-span-3 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-4 rounded-2xl flex flex-col justify-between h-28 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] group">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider group-hover:text-zinc-400 transition-colors">Gold Spot</span>
        <div className="flex items-end space-x-2">
          <span className="text-2xl font-bold text-white tracking-tight">{formatPrice(gold?.price ?? null)}</span>
        </div>
      </div>
      <div className="md:col-span-3 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-4 rounded-2xl flex flex-col justify-between h-28 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] group">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider group-hover:text-zinc-400 transition-colors">Silver Spot</span>
        <div className="flex items-end space-x-2">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300 tracking-tight">{formatPrice(silver?.price ?? null)}</span>
          <span className="text-[10px] text-emerald-300 pb-1.5 font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(16,185,129,0.2)]">{formatSigned(silver?.changePercent ?? null, '%')}</span>
        </div>
      </div>
      <div className="md:col-span-3 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-4 rounded-2xl flex flex-col justify-between h-28 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] group">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider group-hover:text-zinc-400 transition-colors">WTI Oil</span>
        <div className="flex items-end space-x-2">
          <span className="text-2xl font-bold text-white tracking-tight">{formatPrice(oil?.price ?? null)}</span>
          <span className="text-[10px] text-zinc-400 pb-1.5 font-mono uppercase tracking-widest font-semibold">Daily</span>
        </div>
      </div>
      <div className="md:col-span-3 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-4 rounded-2xl flex flex-col justify-between h-28 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.1)] group">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider group-hover:text-zinc-400 transition-colors">NVDA</span>
        <div className="flex items-end space-x-2">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300 tracking-tight">{formatPrice(nvda?.price ?? null)}</span>
          <span className="text-[10px] text-orange-400/80 pb-1.5 font-mono font-semibold">{formatSigned(nvda?.changePercent ?? null, '%')}</span>
        </div>
      </div>
      
      {/* Main Section - Left: Equity Curve */}
      <div className="md:col-span-8 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col min-h-[360px] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="p-4 border-b border-zinc-800/60 flex justify-between items-center shrink-0 relative z-10">
          <div className="flex items-center space-x-3">
            <span className="text-[11px] font-bold text-zinc-300 tracking-widest uppercase">MARKET DATA SNAPSHOT</span>
            <span className="text-[10px] text-zinc-500 font-mono">{dataStatus}</span>
          </div>
          <div className="flex items-center space-x-1 bg-zinc-950/80 p-1 rounded-lg border border-zinc-800/50">
            {['1D', '1W', '1M', 'ALL'].map((tf) => (
              <button 
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-[10px] font-bold rounded-md cursor-pointer transition-all duration-300 ${
                  timeframe === tf ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 w-full p-4 pl-0 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" strokeOpacity={0.5} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#71717a" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              />
              <YAxis 
                stroke="#71717a" 
                fontSize={10}
                tickFormatter={(value) => `$${value / 1000}k`}
                tickLine={false}
                axisLine={false}
                width={60}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', backdropFilter: 'blur(8px)', borderColor: 'rgba(63, 63, 70, 0.5)', fontSize: '12px', color: '#f4f4f5', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#f97316', fontWeight: 'bold' }}
                cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area 
                type="monotone" 
                dataKey="equity" 
                stroke="#f97316" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEquity)" 
                style={{ filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.3))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Main Section - Right: Quick Watch Panel */}
      <div className="md:col-span-4 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col min-h-[360px] shadow-xl">
        <div className="p-4 border-b border-zinc-800/60 shrink-0 flex justify-between items-center">
          <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-widest">Quick Watch</span>
          <Settings className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="flex-1 p-5 flex flex-col space-y-5">
          <div className="grid grid-cols-2 gap-2 bg-zinc-950/80 p-1.5 rounded-xl border border-zinc-800/50">
            <button 
              onClick={() => setSide('Buy')}
              className={`py-2 text-xs font-bold rounded-lg transition-all duration-300 ${side === 'Buy' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300 border border-transparent'}`}
            >
              BULLISH VIEW
            </button>
            <button 
              onClick={() => setSide('Sell')}
              className={`py-2 text-xs font-bold rounded-lg transition-all duration-300 ${side === 'Sell' ? 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300 border border-transparent'}`}
            >
              BEARISH VIEW
            </button>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
              <span>Instrument</span>
            </div>
            <input 
              type="text" 
              defaultValue="XAU/USD"
              className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white font-mono transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                <span>Alert Type</span>
              </div>
              <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800/60 text-xs py-2.5 px-3 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white appearance-none cursor-pointer transition-all"
              >
                <option value="Market">Price Move</option>
                <option value="Limit">Breakout</option>
                <option value="Stop">Pullback</option>
              </select>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                <span>Priority</span>
              </div>
              <input 
                type="number" 
                defaultValue="1"
                step="0.01"
                className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white font-mono transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                <span>Lower Alert</span>
              </div>
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white font-mono placeholder:text-zinc-700 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5 font-bold uppercase tracking-wider">
                <span>Upper Alert</span>
              </div>
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white font-mono placeholder:text-zinc-700 transition-all"
              />
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <button 
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-widest transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${
                side === 'Buy' 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 shadow-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-red-950 shadow-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'
              }`}
            >
              SAVE {side === 'Buy' ? 'BULLISH' : 'BEARISH'} VIEW
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Section: Signals & Logs */}
      <div className="md:col-span-12 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl flex flex-col overflow-hidden min-h-[240px] shadow-xl">
        <div className="px-5 py-3.5 border-b border-zinc-800/60 flex space-x-8 items-center shrink-0 bg-zinc-950/30">
          <div className="flex items-center space-x-2.5 relative">
            <div className="absolute -inset-2 bg-orange-500/20 blur-md rounded-full"></div>
            <Activity className="w-4 h-4 text-orange-400 relative z-10" />
            <span className="text-xs font-bold text-white tracking-widest relative z-10">MARKET SIGNALS</span>
          </div>
          <div className="flex items-center space-x-2 text-zinc-600">
            <span className="text-xs font-bold tracking-wider">/</span>
          </div>
          <div className="flex items-center space-x-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <span className="text-xs font-bold text-zinc-300 tracking-widest">ACTIVITY LOGS</span>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[900px]">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-800/60 text-left bg-zinc-950/20">
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px]">Time</th>
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px]">Symbol</th>
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px]">Signal Type</th>
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px]">Confidence</th>
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px]">Target Entry</th>
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px]">Status</th>
                <th className="py-3 px-5 font-bold tracking-widest uppercase whitespace-nowrap text-[10px] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300 font-medium">
              <tr className="border-b border-zinc-800/40 hover:bg-zinc-800/40 transition-all duration-200 group">
                <td className="py-3.5 px-5 font-mono text-zinc-500 whitespace-nowrap">14:28:12</td>
                <td className="py-3.5 px-5 font-bold text-white whitespace-nowrap tracking-wide">XAU/USD</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2 text-emerald-400">
                    <div className="bg-emerald-500/20 p-1 rounded-md border border-emerald-500/20">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold tracking-wide">Gold Breakout Watch</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-zinc-800 rounded-sm"></div>
                    <span className="ml-3 font-mono font-bold text-emerald-400">82%</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 font-mono whitespace-nowrap">2,435.50</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">PENDING</span>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap text-right">
                  <button className="bg-zinc-800/80 px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-wider text-white border border-zinc-700 hover:bg-emerald-500 hover:text-emerald-950 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 opacity-0 group-hover:opacity-100">
                    Watch
                  </button>
                </td>
              </tr>
              <tr className="border-b border-zinc-800/40 hover:bg-zinc-800/40 transition-all duration-200 group">
                <td className="py-3.5 px-5 font-mono text-zinc-500 whitespace-nowrap">14:15:05</td>
                <td className="py-3.5 px-5 font-bold text-white whitespace-nowrap tracking-wide">WTI OIL</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2 text-red-400">
                    <div className="bg-red-500/20 p-1 rounded-md border border-red-500/20">
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold tracking-wide">Supply Zone Alert</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="ml-3 font-mono font-bold text-emerald-400">94%</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 font-mono whitespace-nowrap">82.40</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">TRACKED</span>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap text-right">
                  <button className="bg-zinc-800/80 px-4 py-1.5 rounded-lg text-[10px] font-bold tracking-wider text-white border border-zinc-700 hover:bg-zinc-700 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    View
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-zinc-800/40 transition-all duration-200 group">
                <td className="py-3.5 px-5 font-mono text-zinc-500 whitespace-nowrap">13:42:22</td>
                <td className="py-3.5 px-5 font-bold text-white whitespace-nowrap tracking-wide">NVDA</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center space-x-2 text-orange-400">
                    <div className="bg-orange-500/20 p-1 rounded-md border border-orange-500/20">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold tracking-wide">Earnings Volatility Watch</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-3.5 bg-orange-500 rounded-sm shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-orange-500 rounded-sm shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                    <div className="w-2 h-3.5 bg-zinc-800 rounded-sm"></div>
                    <div className="w-2 h-3.5 bg-zinc-800 rounded-sm"></div>
                    <span className="ml-3 font-mono font-bold text-orange-400">65%</span>
                  </div>
                </td>
                <td className="py-3.5 px-5 font-mono whitespace-nowrap">124.80</td>
                <td className="py-3.5 px-5 whitespace-nowrap">
                  <span className="px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider bg-zinc-800/80 text-zinc-400 border border-zinc-700">IGNORED</span>
                </td>
                <td className="py-3.5 px-5 whitespace-nowrap text-right">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

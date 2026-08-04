import React from 'react';
import { Search, Calendar, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const mockLedger = [
  {
    id: 'SIG-10293',
    timestamp: '2023-10-27 14:28:12',
    symbol: 'XAU/USD',
    side: 'Bullish',
    executedPrice: 2435.50,
    size: 'Gold Spot',
    fee: 0,
    realizedPnl: 0,
  },
  {
    id: 'SIG-10292',
    timestamp: '2023-10-27 13:15:44',
    symbol: 'WTI OIL',
    side: 'Bearish',
    executedPrice: 82.40,
    size: 'Crude Oil',
    fee: 0,
    realizedPnl: 450.25,
  },
  {
    id: 'SIG-10291',
    timestamp: '2023-10-27 09:42:10',
    symbol: 'XAG/USD',
    side: 'Bullish',
    executedPrice: 31.20,
    size: 'Silver Spot',
    fee: 0,
    realizedPnl: 0,
  },
  {
    id: 'SIG-10290',
    timestamp: '2023-10-26 18:20:05',
    symbol: 'AAPL',
    side: 'Bearish',
    executedPrice: 218.00,
    size: 'Large-cap Stock',
    fee: 0,
    realizedPnl: -120.50,
  }
];

export function LedgerView() {
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 relative z-10">
      {/* Filters Bar */}
      <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-4 mb-6 shrink-0 flex flex-col sm:flex-row gap-4 sm:items-center justify-between shadow-lg">
        <div className="flex flex-1 flex-wrap gap-4 items-center">
          <div className="relative w-56">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search symbol..." 
              className="w-full bg-zinc-950/80 border border-zinc-700/50 text-xs py-2.5 pl-9 pr-4 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white placeholder:text-zinc-600 transition-all font-mono"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input 
              type="date" 
              className="bg-zinc-950/80 border border-zinc-700/50 text-xs py-2.5 pl-9 pr-4 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-zinc-300 cursor-pointer appearance-none min-w-[150px] transition-all"
            />
          </div>
        </div>
        
        <button className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 border border-zinc-700/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-fit">
          <Download className="w-4 h-4" />
          EXPORT CSV
        </button>
      </div>

      {/* Ledger Table */}
      <div className="flex-1 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col min-h-0 shadow-xl">
        <div className="p-4 border-b border-zinc-800/60 flex justify-between items-center bg-zinc-950/40 shrink-0">
          <span className="text-xs font-bold text-white uppercase tracking-widest">Signal Journal</span>
          <span className="text-[10px] text-zinc-500 font-mono font-medium">Showing 4 entries</span>
        </div>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-zinc-800/60 bg-zinc-950/20">
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Timestamp</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Symbol</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Bias</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Reference Price</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Market</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Fee</th>
                <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap text-right">Demo Outcome</th>
              </tr>
            </thead>
            <tbody className="text-sm text-zinc-300">
              {mockLedger.map((trade) => (
                <tr key={trade.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-all duration-200 group relative">
                  <td className="py-4 px-5 whitespace-nowrap font-mono text-[11px] text-zinc-400 relative">
                     <div className={`absolute inset-y-0 left-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity ${trade.side === 'Bullish' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                    {trade.timestamp}
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap font-bold text-white tracking-wide">{trade.symbol}</td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded-md ${trade.side === 'Bullish' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {trade.side === 'Bullish' ? (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${trade.side === 'Bullish' ? 'text-emerald-400' : 'text-red-400'}`}>{trade.side}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 whitespace-nowrap font-mono text-white font-bold">{trade.executedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-4 px-5 whitespace-nowrap font-mono text-zinc-400">{trade.size}</td>
                  <td className="py-4 px-5 whitespace-nowrap font-mono text-zinc-500 font-medium">{trade.fee.toFixed(2)}</td>
                  <td className="py-4 px-5 whitespace-nowrap text-right">
                    {trade.realizedPnl !== 0 ? (
                      <span className={`font-mono font-bold ${trade.realizedPnl > 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]'}`}>
                        {trade.realizedPnl > 0 ? '+' : ''}{trade.realizedPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="font-mono text-zinc-600 font-medium">0.00</span>
                    )}
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

import React, { useState } from 'react';
import { Pencil, X, TrendingUp, TrendingDown, Clock, ShieldAlert, Target } from 'lucide-react';

const mockPositions = [
  {
    id: 1,
    symbol: 'XAU/USD',
    side: 'Bullish',
    entryPrice: 2418.40,
    markPrice: 2435.50,
    size: 'Gold Spot',
    leverage: 'High',
    pnl: 1635.75,
    pnlPercent: 2.59,
    sl: 2405.00,
    tp: 2460.00
  },
  {
    id: 2,
    symbol: 'WTI OIL',
    side: 'Bearish',
    entryPrice: 83.10,
    markPrice: 82.40,
    size: 'Crude Oil',
    leverage: 'Medium',
    pnl: -341.50,
    pnlPercent: -0.78,
    sl: 84.20,
    tp: 80.50
  },
  {
    id: 3,
    symbol: 'NVDA',
    side: 'Bullish',
    entryPrice: 121.40,
    markPrice: 124.80,
    size: 'Large-cap Stock',
    leverage: 'High',
    pnl: 800.00,
    pnlPercent: 2.25,
    sl: 118.00,
    tp: 130.00
  }
];

const mockOrders = [
  {
    id: 'ORD-8A9X-21B',
    symbol: 'XAG/USD',
    type: 'Breakout Alert',
    triggerPrice: 31.50,
    amount: 'Silver Spot',
    status: 'Pending'
  },
  {
    id: 'ORD-3C4Y-99D',
    symbol: 'XAU/USD',
    type: 'Support Alert',
    triggerPrice: 2405.00,
    amount: 'Gold Spot',
    status: 'Active'
  },
  {
    id: 'ORD-7D2Z-44A',
    symbol: 'AAPL',
    type: 'Resistance Alert',
    triggerPrice: 218.00,
    amount: 'Large-cap Stock',
    status: 'Pending'
  }
];

export function PositionsView() {
  const [activeTab, setActiveTab] = useState<'positions' | 'orders'>('positions');

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 relative z-10">
      {/* Tabs Header */}
      <div className="flex space-x-2 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 p-1.5 rounded-2xl shrink-0 mb-6 w-fit shadow-lg">
        <button
          onClick={() => setActiveTab('positions')}
          className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${
            activeTab === 'positions'
              ? 'bg-zinc-800/80 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-zinc-700/50'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30 border border-transparent'
          }`}
        >
          WATCHLIST <span className="ml-2 bg-zinc-800 border border-zinc-700/50 text-zinc-400 px-2 py-0.5 rounded-md text-[10px]">3</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${
            activeTab === 'orders'
              ? 'bg-zinc-800/80 text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-zinc-700/50'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30 border border-transparent'
          }`}
        >
          PRICE ALERTS <span className="ml-2 bg-zinc-800 border border-zinc-700/50 text-zinc-400 px-2 py-0.5 rounded-md text-[10px]">3</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl overflow-hidden flex flex-col shadow-xl">
        {activeTab === 'positions' && (
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-zinc-800/60 bg-zinc-950/40">
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Symbol</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Bias / Priority</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Market</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Reference Price</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Current Price</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Demo Move</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Alert Range</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-zinc-300">
                {mockPositions.map((pos) => (
                  <tr key={pos.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-all duration-200 group relative">
                    <td className="py-4 px-5 whitespace-nowrap relative">
                      <div className={`absolute inset-y-0 left-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity ${pos.side === 'Bullish' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></div>
                      <span className="font-bold text-white tracking-wide">{pos.symbol}</span>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider ${
                          pos.side === 'Bullish' 
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                            : 'bg-red-500/15 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                        }`}>
                          {pos.side}
                        </span>
                        <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded-md border border-zinc-800/60">
                          {pos.leverage}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap font-mono text-zinc-400">{pos.size}</td>
                    <td className="py-4 px-5 whitespace-nowrap font-mono">{pos.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                    <td className="py-4 px-5 whitespace-nowrap font-mono text-white font-bold">{pos.markPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`font-mono font-bold ${pos.pnl >= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]'}`}>
                          {pos.pnl > 0 ? '+' : ''}{pos.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`text-[10px] font-mono font-semibold ${pos.pnlPercent >= 0 ? 'text-emerald-500/80' : 'text-red-500/80'}`}>
                          {pos.pnlPercent > 0 ? '+' : ''}{pos.pnlPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center space-x-5 font-mono text-[11px]">
                        <div className="flex items-center space-x-1.5 group/edit cursor-pointer hover:text-white transition-colors bg-zinc-950/50 px-2.5 py-1 rounded-lg border border-zinc-800/60 hover:border-zinc-700">
                          <ShieldAlert className="w-3 h-3 text-red-500/80" />
                          <span className="text-zinc-400 group-hover/edit:text-white">{pos.sl.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          <Pencil className="w-3 h-3 text-zinc-600 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center space-x-1.5 group/edit cursor-pointer hover:text-white transition-colors bg-zinc-950/50 px-2.5 py-1 rounded-lg border border-zinc-800/60 hover:border-zinc-700">
                          <Target className="w-3 h-3 text-emerald-500/80" />
                          <span className="text-zinc-400 group-hover/edit:text-white">{pos.tp.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                          <Pencil className="w-3 h-3 text-zinc-600 opacity-0 group-hover/edit:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <button className="bg-zinc-800/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-400 hover:border-red-500/30 border border-zinc-700/50 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center space-x-1.5 ml-auto hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] group/close">
                        <X className="w-3.5 h-3.5 group-hover/close:rotate-90 transition-transform duration-300" />
                        <span>REMOVE</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-zinc-800/60 bg-zinc-950/40">
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Alert ID</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Symbol</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Type</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Trigger Price</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Market</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">Status</th>
                  <th className="py-4 px-5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-zinc-300">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-800/30 hover:bg-zinc-800/40 transition-all duration-200 group relative">
                    <td className="py-4 px-5 whitespace-nowrap font-mono text-[11px] text-zinc-500">
                      <div className="absolute inset-y-0 left-0 w-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                      {order.id}
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap font-bold text-white tracking-wide">{order.symbol}</td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center space-x-2 text-zinc-400">
                        {order.type.includes('Buy') ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : 
                         order.type.includes('Sell') ? <TrendingDown className="w-4 h-4 text-red-500" /> : 
                         <Clock className="w-4 h-4 text-orange-500" />}
                        <span className="text-xs font-medium">{order.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap font-mono text-white font-bold">{order.triggerPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 px-5 whitespace-nowrap font-mono text-zinc-400">{order.amount}</td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider border ${
                        order.status === 'Active' 
                          ? 'bg-orange-500/15 text-orange-400 border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]'
                          : 'bg-zinc-800/80 text-zinc-400 border-zinc-700/50'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap text-right">
                      <button className="text-zinc-500 hover:text-red-400 text-[11px] font-bold transition-colors uppercase tracking-widest bg-zinc-800/30 hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-500/30">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

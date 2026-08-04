import React, { useEffect, useState } from 'react';
import { 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  Shield, 
  Zap, 
  X,
  AlertTriangle
} from 'lucide-react';
import { fetchMarketQuotes, formatPrice, MarketQuote } from '../services/marketData';

const mockSignals = [
  {
    id: 1,
    symbol: 'XAU/USD',
    price: 2435.50,
    direction: 'BUY',
    entryZone: '2,430 - 2,440',
    sl: 2405,
    tp1: 2460,
    tp2: 2495,
    confidence: 88,
    strategy: 'Gold Trend Watch',
    timeframe: '4h'
  },
  {
    id: 2,
    symbol: 'WTI OIL',
    price: 82.40,
    direction: 'SELL',
    entryZone: '82.20 - 83.00',
    sl: 84.20,
    tp1: 80.50,
    tp2: 78.80,
    confidence: 92,
    strategy: 'Supply Zone Watch',
    timeframe: '1h'
  },
  {
    id: 3,
    symbol: 'XAG/USD',
    price: 31.20,
    direction: 'BUY',
    entryZone: '31.00 - 31.40',
    sl: 30.40,
    tp1: 32.20,
    tp2: 33.50,
    confidence: 76,
    strategy: 'Silver Momentum',
    timeframe: '15m'
  },
  {
    id: 4,
    symbol: 'BRENT',
    price: 85.10,
    direction: 'SELL',
    entryZone: '84.80 - 85.40',
    sl: 86.30,
    tp1: 83.20,
    tp2: 81.50,
    confidence: 65,
    strategy: 'Oil Range Watch',
    timeframe: '1d'
  },
  {
    id: 5,
    symbol: 'NVDA',
    price: 124.80,
    direction: 'BUY',
    entryZone: '123.50 - 125.50',
    sl: 118.00,
    tp1: 130.00,
    tp2: 136.00,
    confidence: 81,
    strategy: 'Growth Stock Watch',
    timeframe: '4h'
  },
  {
    id: 6,
    symbol: 'AAPL',
    price: 218.00,
    direction: 'BUY',
    entryZone: '216.50 - 219.00',
    sl: 212.00,
    tp1: 224.00,
    tp2: 230.00,
    confidence: 72,
    strategy: 'Large-cap Pullback',
    timeframe: '15m'
  },
  {
    id: 7,
    symbol: 'MSFT',
    price: 512.40,
    direction: 'SELL',
    entryZone: '510.00 - 515.00',
    sl: 522.00,
    tp1: 500.00,
    tp2: 488.00,
    confidence: 84,
    strategy: 'Resistance Watch',
    timeframe: '1h'
  },
  {
    id: 8,
    symbol: 'SPY',
    price: 642.30,
    direction: 'BUY',
    entryZone: '640.00 - 645.00',
    sl: 632.00,
    tp1: 652.00,
    tp2: 660.00,
    confidence: 79,
    strategy: 'Index Trend Watch',
    timeframe: '4h'
  }
];

export function ScannerView() {
  const [selectedSignal, setSelectedSignal] = useState<typeof mockSignals[0] | null>(null);
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
  const [dataStatus, setDataStatus] = useState('Loading real market data');

  useEffect(() => {
    let cancelled = false;

    async function loadQuotes() {
      try {
        const data = await fetchMarketQuotes(['XAU', 'WTI', 'XAG', 'BRENT', 'NVDA', 'AAPL', 'MSFT', 'SPY']);
        if (!cancelled) {
          setQuotes(data.quotes);
          setDataStatus(data.quotes.some((quote) => quote.status === 'ok') ? 'Real data: Alpha Vantage' : 'Real data unavailable');
        }
      } catch (error) {
        if (!cancelled) {
          setDataStatus(error instanceof Error ? error.message : 'Real data unavailable');
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

  const liveQuote = (symbol: string) => quotes.find((quote) => quote.symbol === symbol);
  const displayPrice = (signal: typeof mockSignals[0]) => liveQuote(signal.symbol)?.price ?? signal.price;

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 relative z-10">
      {/* Filter Bar */}
      <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-4 mb-6 shrink-0 flex flex-col sm:flex-row gap-4 sm:items-center shadow-lg">
        <div className="flex items-center space-x-2 text-zinc-400 border-r border-zinc-700/50 pr-5">
          <Filter className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">Filters</span>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono bg-zinc-950/80 border border-zinc-800/60 px-3 py-2 rounded-xl">
          {dataStatus}
        </span>
        
        <div className="flex flex-1 flex-wrap gap-4">
          <select className="bg-zinc-950/80 border border-zinc-700/50 text-xs py-2 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white cursor-pointer appearance-none min-w-[120px] transition-all">
            <option value="metals">Metals</option>
            <option value="energy">Energy</option>
            <option value="stocks">Stocks</option>
            <option value="indices">Indices</option>
          </select>
          
          <select className="bg-zinc-950/80 border border-zinc-700/50 text-xs py-2 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white cursor-pointer appearance-none min-w-[120px] transition-all">
            <option value="all">All Timeframes</option>
            <option value="15m">15m</option>
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>
          
          <select className="bg-zinc-950/80 border border-zinc-700/50 text-xs py-2 px-3.5 rounded-xl focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] text-white cursor-pointer appearance-none min-w-[160px] transition-all">
            <option value="all">All Strategies</option>
            <option value="trend">Trend Watch</option>
            <option value="zone">Supply/Demand Zone</option>
            <option value="momentum">Momentum Watch</option>
          </select>
        </div>
        
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-orange-950 px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:-translate-y-0.5">
          REFRESH VIEW
        </button>
      </div>

      {/* Signal Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6 pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockSignals.map((signal) => (
            <div key={signal.id} className={`bg-zinc-900/70 backdrop-blur-md border rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1.5 shadow-lg group relative overflow-hidden ${signal.direction === 'BUY' ? 'border-zinc-800/60 hover:border-emerald-500/30 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]' : 'border-zinc-800/60 hover:border-red-500/30 hover:shadow-[0_8px_30px_rgba(239,68,68,0.15)]'}`}>
              <div className={`absolute top-0 inset-x-0 h-1 ${signal.direction === 'BUY' ? 'bg-gradient-to-r from-emerald-500/50 to-transparent' : 'bg-gradient-to-r from-red-500/50 to-transparent'}`}></div>
              
              {/* Card Header */}
              <div className="p-4 border-b border-zinc-800/50 flex justify-between items-start bg-zinc-950/20">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <h3 className="text-base font-bold text-white tracking-wide">{signal.symbol}</h3>
                    <span className="bg-zinc-800/80 text-zinc-400 text-[10px] px-2 py-0.5 rounded-md font-mono uppercase font-semibold border border-zinc-700/50">
                      {signal.timeframe}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1 font-medium tracking-wide">{signal.strategy}</p>
                </div>
                <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border shadow-sm ${
                  signal.direction === 'BUY' 
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                    : 'bg-red-500/15 border-red-500/30 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
                }`}>
                  {signal.direction === 'BUY' ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[10px] font-bold tracking-wider">{signal.direction}</span>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Current Price</span>
                  <span className="text-base font-mono font-bold text-white tracking-tight">{formatPrice(displayPrice(signal), 2)}</span>
                </div>
                
                <div className="bg-zinc-950/60 rounded-xl border border-zinc-800/60 p-3 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-zinc-500" /> Entry
                    </span>
                    <span className="text-xs font-mono text-zinc-200">{signal.entryZone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-red-500/80" /> Low
                    </span>
                    <span className="text-xs font-mono text-red-400 font-semibold">{signal.sl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-500/80" /> High
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {signal.tp1.toLocaleString()} / {signal.tp2.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-1.5 bg-zinc-800/80 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full shadow-[0_0_5px_currentColor] ${signal.direction === 'BUY' ? 'bg-emerald-500 text-emerald-500' : 'bg-red-500 text-red-500'}`} 
                        style={{ width: `${signal.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-zinc-300">{signal.confidence}%</span>
                  </div>
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Conf</span>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="p-4 pt-0 mt-auto">
                <button 
                  onClick={() => setSelectedSignal(signal)}
                  className={`w-full py-2 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 border ${
                    signal.direction === 'BUY'
                      ? 'bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400'
                      : 'bg-zinc-800/50 border-zinc-700/50 text-white hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                  }`}
                >
                  VIEW SETUP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signal Detail Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800/60 flex justify-between items-center bg-zinc-950/50 relative">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  selectedSignal.direction === 'BUY' ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-400' : 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400'
                }`}>
                  {selectedSignal.direction === 'BUY' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-wide">{selectedSignal.direction} Setup</h2>
                  <p className="text-xs text-zinc-400 font-medium">{selectedSignal.symbol} • {selectedSignal.strategy}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSignal(null)}
                className="text-zinc-500 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-700/50 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div className="flex items-start space-x-3 bg-orange-500/10 border border-orange-500/20 p-3.5 rounded-xl text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-medium">
                  This is a frontend-only market setup preview. No order, API call, or trading action will be placed.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Asset</label>
                  <input type="text" disabled value={selectedSignal.symbol} className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl text-zinc-500 font-mono cursor-not-allowed" />
                </div>
                <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Reference Price</label>
                  <input type="number" defaultValue={displayPrice(selectedSignal)} className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl text-white font-mono focus:border-orange-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Demo Allocation ($)</label>
                <input type="number" defaultValue={1000} className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl text-white font-mono focus:border-orange-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-bold text-red-500/80 uppercase tracking-widest mb-1.5">Lower Alert</label>
                  <input type="number" defaultValue={selectedSignal.sl} className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl text-red-400 font-mono focus:border-red-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest mb-1.5">Upper Alert</label>
                  <input type="number" defaultValue={selectedSignal.tp1} className="w-full bg-zinc-950/80 border border-zinc-800/60 text-sm py-2.5 px-3.5 rounded-xl text-emerald-400 font-mono focus:border-emerald-500/50 focus:outline-none focus:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all" />
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-5 border-t border-zinc-800/60 bg-zinc-950/50 flex space-x-4">
              <button 
                onClick={() => setSelectedSignal(null)}
                className="flex-1 py-3 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-zinc-700/50"
              >
                CANCEL
              </button>
              <button 
                onClick={() => setSelectedSignal(null)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold tracking-widest transition-all duration-300 shadow-lg ${
                  selectedSignal.direction === 'BUY'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-emerald-950 shadow-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-0.5'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-red-950 shadow-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:-translate-y-0.5'
                }`}
              >
                SAVE TO WATCHLIST
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

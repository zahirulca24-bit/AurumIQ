import React, { useState } from 'react';
import { Key, ShieldAlert, Bell, Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react';

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<'api' | 'risk' | 'preferences'>('api');
  const [showMetalsCoverage, setShowMetalsCoverage] = useState(false);
  const [showEnergyCoverage, setShowEnergyCoverage] = useState(false);
  const [showStocksCoverage, setShowStocksCoverage] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 relative z-10">
      <div className="flex flex-col lg:flex-row gap-8 h-full">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-3">
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === 'api' 
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700/50'
            }`}
          >
            <Key className="w-4 h-4" />
            Data Providers
          </button>
          
          <button
            onClick={() => setActiveTab('risk')}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === 'risk' 
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Risk Management
          </button>
          
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center gap-3 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === 'preferences' 
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700/50'
            }`}
          >
            <Bell className="w-4 h-4" />
            Preferences
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl overflow-y-auto shadow-xl">
          {activeTab === 'api' && (
            <div className="p-8 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2 tracking-wide">Data Providers</h2>
                <p className="text-sm text-zinc-400">Configure market data sources for metals, energy, indices, and stocks.</p>
              </div>

              <div className="space-y-6">
                {/* Metals */}
                <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl space-y-5 hover:border-zinc-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Metals Feed</h3>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.1)]">Connected</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Source</label>
                      <input type="text" defaultValue="Demo metals data" className="w-full bg-zinc-900/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-zinc-300 font-mono focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Coverage</label>
                      <div className="relative">
                        <input type={showMetalsCoverage ? 'text' : 'password'} defaultValue="XAU/USD, XAG/USD" className="w-full bg-zinc-900/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-zinc-300 font-mono focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all pr-12" />
                        <button onClick={() => setShowMetalsCoverage(!showMetalsCoverage)} className="absolute right-4 top-3 text-zinc-500 hover:text-white transition-colors">
                          {showMetalsCoverage ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Energy */}
                <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl space-y-5 hover:border-zinc-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Energy Feed</h3>
                    </div>
                    <span className="text-[10px] bg-zinc-800/50 text-zinc-400 px-3 py-1 rounded-md border border-zinc-700/50 font-bold uppercase tracking-wider">Not Connected</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Source</label>
                      <input type="text" placeholder="Demo energy data" className="w-full bg-zinc-900/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-zinc-300 font-mono focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Coverage</label>
                      <div className="relative">
                        <input type={showEnergyCoverage ? 'text' : 'password'} placeholder="WTI, Brent, Natural Gas" className="w-full bg-zinc-900/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-zinc-300 font-mono focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all pr-12" />
                        <button onClick={() => setShowEnergyCoverage(!showEnergyCoverage)} className="absolute right-4 top-3 text-zinc-500 hover:text-white transition-colors">
                          {showEnergyCoverage ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equities */}
                <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl space-y-5 hover:border-zinc-700/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-widest">Stocks Feed</h3>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/20 font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.1)]">Connected</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Coverage</label>
                      <div className="relative">
                        <input type={showStocksCoverage ? 'text' : 'password'} defaultValue="AAPL, MSFT, NVDA, SPY" className="w-full bg-zinc-900/80 border border-zinc-700/50 text-sm py-2.5 px-4 rounded-xl text-zinc-300 font-mono focus:outline-none focus:border-orange-500/50 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all pr-12" />
                        <button onClick={() => setShowStocksCoverage(!showStocksCoverage)} className="absolute right-4 top-3 text-zinc-500 hover:text-white transition-colors">
                          {showStocksCoverage ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-orange-950 px-8 py-3 rounded-xl font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:-translate-y-0.5">
                    <Save className="w-4 h-4" />
                    SAVE DATA SETTINGS
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="p-8 max-w-3xl">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2 tracking-wide">Default Risk Management</h2>
                <p className="text-sm text-zinc-400">Configure demo alert bands and watchlist risk notes.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl space-y-6">
                  
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Max Demo Allocation (%)</label>
                      <span className="text-sm font-mono font-bold text-white">2.0%</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mb-4">The maximum demo allocation percentage shown in watchlist previews.</p>
                    <input type="range" min="0.1" max="5" step="0.1" defaultValue="2" className="w-full accent-orange-500 h-2 bg-zinc-800/80 rounded-lg appearance-none cursor-pointer" />
                  </div>

                  <div className="pt-6 border-t border-zinc-800/60">
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Default Lower Alert (%)</label>
                      <span className="text-sm font-mono font-bold text-white">1.5%</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mb-4">Default lower alert distance for market setup previews.</p>
                    <input type="range" min="0.5" max="10" step="0.5" defaultValue="1.5" className="w-full accent-red-500 h-2 bg-zinc-800/80 rounded-lg appearance-none cursor-pointer" />
                  </div>

                  <div className="pt-6 border-t border-zinc-800/60">
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Default Upper Alert (%)</label>
                      <span className="text-sm font-mono font-bold text-white">3.0%</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mb-4">Default upper alert distance for market setup previews.</p>
                    <input type="range" min="1" max="20" step="0.5" defaultValue="3.0" className="w-full accent-emerald-500 h-2 bg-zinc-800/80 rounded-lg appearance-none cursor-pointer" />
                  </div>

                </div>

                <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl hover:border-zinc-700/50 transition-colors">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <h3 className="text-sm font-bold text-white">Enforce Hard Stop</h3>
                      <p className="text-[11px] text-zinc-500 mt-1.5">Keep default alert ranges locked while reviewing a setup.</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 shadow-inner group-hover:bg-zinc-700 peer-checked:group-hover:bg-orange-400"></div>
                    </div>
                  </label>
                </div>

                <div className="pt-6 flex justify-end">
                  <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-orange-950 px-8 py-3 rounded-xl font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:-translate-y-0.5">
                    <Save className="w-4 h-4" />
                    SAVE ALERT SETTINGS
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="p-8 max-w-3xl">
               <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-2 tracking-wide">Platform Preferences</h2>
                <p className="text-sm text-zinc-400">Customize UI appearance and notification alerts.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-950/40 border border-zinc-800/60 p-6 rounded-2xl space-y-6">
                  
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <h3 className="text-sm font-bold text-white">Push Notifications</h3>
                      <p className="text-[11px] text-zinc-500 mt-1.5">Receive browser alerts for watched market setups.</p>
                    </div>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 shadow-inner group-hover:bg-zinc-700 peer-checked:group-hover:bg-orange-400"></div>
                    </div>
                  </label>

                  <div className="border-t border-zinc-800/60 pt-6">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <h3 className="text-sm font-bold text-white">Sound Alerts</h3>
                        <p className="text-[11px] text-zinc-500 mt-1.5">Play audio cues for demo alert triggers.</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 shadow-inner group-hover:bg-zinc-700 peer-checked:group-hover:bg-orange-400"></div>
                      </div>
                    </label>
                  </div>

                  <div className="border-t border-zinc-800/60 pt-6">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div>
                        <h3 className="text-sm font-bold text-white">Dark Theme</h3>
                        <p className="text-[11px] text-zinc-500 mt-1.5">Force dark mode layout for market monitoring.</p>
                      </div>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                        <div className="w-12 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 opacity-50 cursor-not-allowed"></div>
                      </div>
                    </label>
                  </div>
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

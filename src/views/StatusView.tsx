import React from 'react';
import { Activity, Database, Zap, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

const mockServices = [
  { name: 'Metals Feed', status: 'Demo Mode', latency: '0ms', icon: Globe, ok: true },
  { name: 'Energy Feed', status: 'Demo Mode', latency: '0ms', icon: Zap, ok: true },
  { name: 'Stocks Watchlist', status: 'Local UI', latency: '0ms', icon: Database, ok: true },
  { name: 'Automation Engine', status: 'Not Connected', latency: '--', icon: Activity, ok: false },
];

const mockLogs = [
  "[14:28:44.102] INFO: Demo metals watchlist loaded: XAU/USD, XAG/USD",
  "[14:28:44.520] INFO: Demo energy view loaded: WTI, Brent",
  "[14:29:10.045] WARN: Live automation is disabled in this frontend UI",
  "[14:29:15.882] INFO: Commodity Desk signal preview refreshed",
  "[14:29:16.104] INFO: Watchlist synced locally. Asset count: 24",
  "[14:30:00.001] INFO: Gold setup preview updated",
  "[14:30:00.120] INFO: Oil supply zone watch refreshed",
  "[14:30:00.355] INFO: No automation engine connected",
];

export function StatusView() {
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6 gap-6 relative z-10">
      {/* Service Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 shrink-0">
        {mockServices.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/60 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl">
               <div className={`absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12 ${service.ok ? 'text-emerald-500' : 'text-orange-500'}`}>
                  <Icon className="w-24 h-24" />
               </div>
              <div className="flex justify-between items-start mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border shadow-sm ${service.ok ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-base font-bold text-white tracking-wide">{service.name}</span>
                </div>
                {service.ok ? (
                  <div className="relative">
                     <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[4px] opacity-40 animate-pulse"></div>
                     <CheckCircle2 className="w-5 h-5 text-emerald-500 relative z-10" />
                  </div>
                ) : (
                  <div className="relative">
                     <div className="absolute inset-0 bg-orange-500 rounded-full blur-[4px] opacity-40 animate-pulse"></div>
                     <AlertCircle className="w-5 h-5 text-orange-500 relative z-10" />
                  </div>
                )}
              </div>
              <div className="flex items-end justify-between relative z-10 bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/50">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Status</div>
                  <div className={`text-xs font-bold ${service.ok ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'text-orange-400 drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]'}`}>
                    {service.status}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Latency</div>
                  <div className="text-sm font-mono font-bold text-white tracking-tight">{service.latency}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Log */}
      <div className="flex-1 bg-[#09090b]/90 backdrop-blur-xl border border-zinc-700/50 rounded-2xl flex flex-col overflow-hidden min-h-[300px] shadow-2xl relative z-10">
        <div className="px-5 py-3 border-b border-zinc-800/60 flex items-center justify-between bg-zinc-900/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">System Event Log</span>
          </div>
          <div className="flex gap-2 hover:opacity-100 opacity-70 transition-opacity">
            <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-orange-500 transition-colors shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-emerald-500 transition-colors shadow-inner"></div>
          </div>
        </div>
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs leading-loose text-zinc-400 selection:bg-emerald-500/30 selection:text-emerald-200">
          {mockLogs.map((log, i) => (
            <div key={i} className="mb-1.5 hover:bg-zinc-800/30 px-2 py-1 rounded-md transition-colors break-all flex flex-wrap gap-1 border border-transparent hover:border-zinc-800/50">
              {log.includes('INFO:') && (
                <>
                  <span className="text-zinc-500">{log.split('INFO:')[0]}</span>
                  <span className="text-emerald-400 font-bold drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]">INFO:</span>
                  <span className="text-zinc-300">{log.split('INFO:')[1]}</span>
                </>
              )}
              {log.includes('WARN:') && (
                <>
                  <span className="text-zinc-500">{log.split('WARN:')[0]}</span>
                  <span className="text-orange-400 font-bold drop-shadow-[0_0_5px_rgba(249,115,22,0.3)]">WARN:</span>
                  <span className="text-orange-300">{log.split('WARN:')[1]}</span>
                </>
              )}
              {!log.includes('INFO:') && !log.includes('WARN:') && log}
            </div>
          ))}
          <div className="animate-pulse mt-4 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)] font-bold text-lg leading-none">_</div>
        </div>
      </div>
    </div>
  );
}

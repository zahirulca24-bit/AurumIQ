/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import { ViewId } from './types';
import { DashboardView } from './views/DashboardView';
import { ScannerView } from './views/ScannerView';
import { PositionsView } from './views/PositionsView';
import { LedgerView } from './views/LedgerView';
import { AnalyticsView } from './views/AnalyticsView';
import { ReplayView } from './views/ReplayView';
import { StatusView } from './views/StatusView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [activeView, setActiveView] = useState<ViewId>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'scanner': return <ScannerView />;
      case 'positions': return <PositionsView />;
      case 'ledger': return <LedgerView />;
      case 'analytics': return <AnalyticsView />;
      case 'replay': return <ReplayView />;
      case 'status': return <StatusView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-slate-300 overflow-hidden font-sans relative selection:bg-orange-500/30">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none"></div>
      
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex flex-col flex-1 min-w-0 z-10">
        <TopNav />
        <main className="flex-1 flex flex-col overflow-y-auto">
          {renderView()}
        </main>
        <footer className="h-8 border-t border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md px-4 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              <span className="font-semibold tracking-wider text-zinc-400">MODE: FRONTEND DEMO</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold tracking-wider text-zinc-400">MARKETS: GOLD / OIL / STOCKS</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold tracking-wider text-zinc-400">LOGIC: NOT CONNECTED</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <span className="font-mono">v1.4.2-ALPHA</span>
            <span className="text-orange-500/90 font-mono font-bold tracking-wider">UTC 14:28:44</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

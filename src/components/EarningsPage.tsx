import React, { useState } from 'react';
import { Channel, Video } from '../types';
import { EARNING_SOURCES, EARNING_HISTORY_DATA } from '../mockData';

interface EarningsPageProps {
  channel: Channel;
  videos: Video[];
  onRedeemFunds: (amount: number) => void;
  showToast: (message: string) => void;
}

export default function EarningsPage({
  channel,
  videos,
  onRedeemFunds,
  showToast
}: EarningsPageProps) {
  const [historyRange, setHistoryRange] = useState<'30' | '90' | '365'>('30');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [bankAccount, setBankAccount] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [holderName, setHolderName] = useState('');

  const myVideos = videos.filter(v => v.creatorId === channel.id);
  const sortedVideos = [...myVideos].sort((a, b) => b.earnings - a.earnings);

  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankAccount || !routingNumber || !holderName) return;

    const amount = channel.earningsAvailable;
    if (amount <= 0) {
      showToast("No available funds to redeem!");
      return;
    }

    onRedeemFunds(amount);
    setIsRedeeming(false);
    setBankAccount('');
    setRoutingNumber('');
    setHolderName('');
    showToast(`Successfully initiated wire of $${amount.toFixed(2)}!`);
  };

  return (
    <div className="bg-[#121212] text-[#E6E1E5] px-6 py-8 max-w-6xl mx-auto space-y-8" id="earnings-page">
      
      {/* Header title */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white tracking-tight">Earnings Hub</h1>
        <p className="text-xs text-[#CAC4D0]/60 mt-1">Monitor, analyze, and wire your channel engagement revenues.</p>
      </div>

      {/* Metric cards (Teal context only) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-2 relative overflow-hidden">
          <p className="text-xs text-[#CAC4D0]/60 uppercase tracking-wider font-mono">Available Balance</p>
          <p className="font-display font-bold text-3xl text-[#00D9A3]">${channel.earningsAvailable.toFixed(2)}</p>
          <div className="absolute top-4 right-4 text-xs font-mono bg-[#00D9A3]/10 text-[#00D9A3] px-2.5 py-0.5 rounded-full">
            Ready to wire
          </div>
        </div>

        <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-2">
          <p className="text-xs text-[#CAC4D0]/60 uppercase tracking-wider font-mono">This Month's Profit</p>
          <p className="font-display font-bold text-3xl text-[#00D9A3]">${channel.earningsThisMonth.toFixed(2)}</p>
          <p className="text-[10px] text-emerald-400 font-mono">+12.4% vs last month</p>
        </div>

        <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-2">
          <p className="text-xs text-[#CAC4D0]/60 uppercase tracking-wider font-mono">Lifetime Gross</p>
          <p className="font-display font-bold text-3xl text-[#00D9A3]">${channel.earningsLifetime.toFixed(2)}</p>
          <p className="text-[10px] text-[#CAC4D0]/40 font-mono">First payout: June 2024</p>
        </div>
      </div>

      {/* Main Graph Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Earnings history graph (Left) */}
        <div className="lg:col-span-2 bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display font-semibold text-sm text-white">Earnings History</h3>
            <div className="flex bg-[#211F26] border border-[#322F37] rounded-lg p-1 text-[10px] font-mono">
              {(['30', '90', '365'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setHistoryRange(range)}
                  className={`px-3 py-1.5 rounded-md transition ${
                    historyRange === range ? 'bg-[#332B6B] text-[#9D8CFF] font-bold' : 'text-[#CAC4D0]/60 hover:text-white'
                  }`}
                >
                  {range}D
                </button>
              ))}
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="h-60 w-full relative pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full text-[#9D8CFF]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9D8CFF" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#9D8CFF" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke="#322F37" strokeWidth="0.5" strokeDasharray="4"/>
              <line x1="0" y1="100" x2="500" y2="100" stroke="#322F37" strokeWidth="0.5" strokeDasharray="4"/>
              <line x1="0" y1="150" x2="500" y2="150" stroke="#322F37" strokeWidth="0.5" strokeDasharray="4"/>
              
              {/* Gradient fill beneath line */}
              <path
                d="M 0 200 L 0 160 L 40 145 L 80 135 L 120 110 L 165 95 L 210 80 L 250 65 L 300 52 L 350 40 L 400 32 L 450 18 L 500 8 L 500 200 Z"
                fill="url(#chartGradient)"
              />
              
              {/* Core Line */}
              <path
                d="M 0 160 Q 20 150 40 145 T 80 135 T 120 110 T 165 95 T 210 80 T 250 65 T 300 52 T 350 40 T 400 32 T 450 18 T 500 8"
                fill="none"
                stroke="#9D8CFF"
                strokeWidth="2.5"
              />

              {/* Data points */}
              <circle cx="210" cy="80" r="4" fill="#00D9A3" />
              <circle cx="350" cy="40" r="4" fill="#00D9A3" />
              <circle cx="500" cy="8" r="4" fill="#9D8CFF" />
            </svg>
            
            {/* Legend timestamps */}
            <div className="flex justify-between text-[9px] font-mono text-[#CAC4D0]/40 mt-3">
              <span>May 1</span>
              <span>June 1</span>
              <span>Today (Jul 16)</span>
            </div>
          </div>
        </div>

        {/* Source breakdown pie/bar (Right) */}
        <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-sm text-white">Revenues by Source</h3>
            <p className="text-[11px] text-[#CAC4D0]/50 mt-0.5">Where your earnings are originating.</p>
          </div>

          {/* Source indicator bars */}
          <div className="space-y-4 py-2">
            {EARNING_SOURCES.map((src, idx) => {
              const maxAmount = 700;
              const widthPct = Math.min((src.amount / maxAmount) * 100, 100);
              const colors = ['bg-[#9D8CFF]', 'bg-[#00D9A3]', 'bg-amber-400', 'bg-sky-400'];
              return (
                <div key={src.source} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#CAC4D0]">{src.source}</span>
                    <span className="font-mono text-white font-semibold">${src.amount.toFixed(2)}</span>
                  </div>
                  <div className="h-2 w-full bg-[#211F26] rounded-full overflow-hidden">
                    <div className={`h-full ${colors[idx % colors.length]} rounded-full`} style={{ width: `${widthPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[10px] text-center font-mono text-[#CAC4D0]/50 border-t border-[#322F37] pt-3 mt-2">
            Updated hourly &middot; Powered by Smart Contract payout
          </div>
        </div>

      </div>

      {/* Video performance Breakdown and Redeem widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top earners table */}
        <div className="lg:col-span-2 bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
          <h3 className="font-display font-semibold text-sm text-white">Individual Video Revenue Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[#322F37] text-[10px] font-mono text-[#CAC4D0]/40 uppercase">
                  <th className="py-3 px-2">Video Title</th>
                  <th className="py-3 px-2 text-right">Watch Units</th>
                  <th className="py-3 px-2 text-right">Gross Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#322F37]/30 text-xs text-[#CAC4D0]">
                {sortedVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-[#211F26]/30">
                    <td className="py-3 px-2 font-medium truncate max-w-xs text-white">
                      {video.title}
                    </td>
                    <td className="py-3 px-2 text-right font-mono">
                      {(video.watchUnits || Math.round(video.views * 0.4)).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-[#00D9A3] font-semibold">
                      ${video.earnings.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Redeem panel widget */}
        <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-sm text-white">Redeem Funds</h3>
            <p className="text-xs text-[#CAC4D0]/60 leading-relaxed">
              Wire your available earnings instantly to any registered bank or routing account.
            </p>
          </div>

          <div className="bg-[#211F26] p-4 rounded-xl border border-[#322F37] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#CAC4D0]/60">Minimum Cashout:</span>
              <span className="font-mono text-white font-semibold">$50.00</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#CAC4D0]/60">Processing speed:</span>
              <span className="text-emerald-400 font-medium">Instant ACH Wire</span>
            </div>
            <div className="w-full bg-[#121212] h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00D9A3]" 
                style={{ width: `${Math.min((channel.earningsAvailable / 50) * 100, 100)}%` }} 
              />
            </div>
            <p className="text-[10px] text-[#CAC4D0]/40 font-mono text-center">
              {channel.earningsAvailable >= 50 
                ? "🟢 Threshold passed. Ready to cashout!" 
                : `Need $${(50 - channel.earningsAvailable).toFixed(2)} more to cashout.`}
            </p>
          </div>

          <button
            id="redeem-trigger-btn"
            disabled={channel.earningsAvailable < 50}
            onClick={() => setIsRedeeming(true)}
            className="w-full py-3 rounded-full bg-[#00D9A3] text-[#00382A] font-semibold text-xs hover:opacity-95 transition disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            Redeem to Bank
          </button>
        </div>

      </div>

      {/* Redeem Confirmation and details modal */}
      {isRedeeming && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center border-b border-[#322F37] pb-3">
              <h3 className="font-display font-bold text-lg text-white">Wire Redemption Form</h3>
              <button 
                onClick={() => setIsRedeeming(false)}
                className="text-[#CAC4D0] hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#CAC4D0] leading-relaxed">
              You are cashing out your entire available balance of <strong className="text-[#00D9A3]">${channel.earningsAvailable.toFixed(2)}</strong>. Please specify your banking details carefully.
            </p>

            <form onSubmit={handleRedeemSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Account Holder Name</label>
                <input 
                  type="text" 
                  required
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="Marcus Aurelius"
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-[#CAC4D0]">Routing Number (9-digits)</label>
                  <input 
                    type="text" 
                    required
                    maxLength={9}
                    pattern="\d{9}"
                    value={routingNumber}
                    onChange={(e) => setRoutingNumber(e.target.value)}
                    placeholder="021000021"
                    className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-[#CAC4D0]">Account Number</label>
                  <input 
                    type="text" 
                    required
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="1234567890"
                    className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF] font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsRedeeming(false)}
                  className="px-5 py-2 rounded-full border border-[#48454E] text-xs font-medium text-[#CAC4D0]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#00D9A3] text-[#00382A] text-xs font-bold"
                >
                  Approve Wire Payout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

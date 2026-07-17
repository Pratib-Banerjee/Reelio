import { useState } from 'react';
import { CHANNELS } from '../mockData';

interface PremiumPageProps {
  subscribedChannelIds: string[];
  onUnsubscribe: (id: string) => void;
  isPremium: boolean;
  onUpgradePremium: () => void;
  showToast: (msg: string) => void;
}

export default function PremiumPage({
  subscribedChannelIds,
  onUnsubscribe,
  isPremium,
  onUpgradePremium,
  showToast
}: PremiumPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const subscribedChannelsList = CHANNELS.filter(c => subscribedChannelIds.includes(c.id));

  const handleUpgrade = () => {
    onUpgradePremium();
    showToast(`Upgraded to Reelio Premium (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})!`);
  };

  return (
    <div className="bg-[#121212] text-[#E6E1E5] px-6 py-8 max-w-4xl mx-auto space-y-8" id="premium-and-subs-page">
      
      {/* Title */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white tracking-tight">Subscriptions & Premium</h1>
        <p className="text-xs text-[#CAC4D0]/60 mt-1">Manage your active channel feeds or unlock advanced platform benefits.</p>
      </div>

      {/* Premium Upsell segment */}
      <section className="bg-[#1D1B20] border-2 border-[#9D8CFF] rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden" id="premium-upsell-card">
        {/* Glowing badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#9D8CFF] to-[#7C5CFC] text-[#1B0064] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-md">
          Recommended
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white">Unlock Reelio Premium</h2>
          <p className="text-xs sm:text-sm text-[#CAC4D0] max-w-xl">
            Upgrade your viewing experience to support creators even more while getting offline downloads, background playback, and zero ad breaks.
          </p>
        </div>

        {/* Benefits bullets list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#CAC4D0]/90">
          <div className="flex items-center gap-2">
            <span className="text-[#9D8CFF]">✦</span> Pure ad-free continuous streaming
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#9D8CFF]">✦</span> Background play on any mobile screen
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#9D8CFF]">✦</span> Multi-video bulk download offline mode
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00D9A3]">✦</span> Double Reelio Coin rewards rate
          </div>
        </div>

        {/* Toggleable cycle billing */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs text-[#CAC4D0]">Cycle:</span>
          <div className="flex bg-[#211F26] border border-[#322F37] rounded-full p-1 text-[11px] font-medium">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-full transition ${
                billingCycle === 'monthly' ? 'bg-[#332B6B] text-[#9D8CFF] font-bold' : 'text-[#CAC4D0]/60'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-full transition ${
                billingCycle === 'annual' ? 'bg-[#332B6B] text-[#9D8CFF] font-bold' : 'text-[#CAC4D0]/60'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Interactive Price segment */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#322F37]/60">
          <div>
            <p className="font-mono text-xs text-[#CAC4D0]/50">Estimated charge:</p>
            <p className="font-display font-bold text-2xl text-white">
              {billingCycle === 'annual' ? '$79.99/yr' : '$7.99/mo'}
            </p>
          </div>
          
          <button
            id="premium-upgrade-btn"
            onClick={handleUpgrade}
            disabled={isPremium}
            className="px-6 py-3 rounded-full bg-[#9D8CFF] text-[#1B0064] font-bold text-xs hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            {isPremium ? "✓ Active Member" : "Activate Premium Plan"}
          </button>
        </div>
      </section>

      {/* Subscribed channels list */}
      <section className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-6 space-y-4">
        <h2 className="font-display font-bold text-base text-white">Subscribed Channels ({subscribedChannelsList.length})</h2>
        
        {subscribedChannelsList.length === 0 ? (
          <p className="text-xs text-[#CAC4D0]/50 py-4 text-center">You haven't subscribed to any creators yet.</p>
        ) : (
          <div className="divide-y divide-[#322F37]/50">
            {subscribedChannelsList.map(chan => (
              <div key={chan.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={chan.avatar} alt={chan.name} className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="text-xs font-semibold text-white">{chan.name}</h3>
                    <p className="text-[10px] text-[#9D8CFF] font-mono">{chan.handle}</p>
                  </div>
                </div>
                
                <button
                  id={`unsubscribe-btn-${chan.id}`}
                  onClick={() => onUnsubscribe(chan.id)}
                  className="px-4 py-1.5 rounded-full border border-[#48454E] hover:bg-red-900/10 hover:text-red-400 text-[11px] font-medium transition"
                >
                  Unsubscribe
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

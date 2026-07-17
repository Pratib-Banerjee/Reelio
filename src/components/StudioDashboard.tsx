import { Channel, Video, Notification } from '../types';
import { NOTIFICATIONS_LIST } from '../mockData';

interface StudioDashboardProps {
  channel: Channel;
  videos: Video[];
  onOpenUpload: () => void;
  onNavigateToTab: (tab: string) => void;
  onSelectVideoAnalytics: (video: Video) => void;
}

export default function StudioDashboard({
  channel,
  videos,
  onOpenUpload,
  onNavigateToTab,
  onSelectVideoAnalytics
}: StudioDashboardProps) {
  const myVideos = videos.filter(v => v.creatorId === channel.id);
  const latestVideo = myVideos[0]; // assume sorted or take first

  return (
    <div className="bg-[#121212] text-[#E6E1E5] px-6 py-8 max-w-6xl mx-auto space-y-8" id="studio-dashboard-view">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-white tracking-tight">Studio Workspace</h1>
          <p className="text-xs text-[#CAC4D0]/60 mt-1">Private control center & analytics for <strong>{channel.name}</strong>.</p>
        </div>
        
        <button
          id="studio-quick-upload-btn"
          onClick={onOpenUpload}
          className="px-5 py-2.5 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-semibold hover:opacity-95 transition shadow-lg"
        >
          + Upload Video
        </button>
      </div>

      {/* Grid of workspace contents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column - Performance overview widgets */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl">
              <span className="text-[10px] text-[#CAC4D0]/50 font-mono uppercase">Subscribers</span>
              <p className="text-lg font-bold text-white mt-0.5">{channel.subscribers.toLocaleString()}</p>
            </div>
            <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl">
              <span className="text-[10px] text-[#CAC4D0]/50 font-mono uppercase">Videos Uploaded</span>
              <p className="text-lg font-bold text-white mt-0.5">{myVideos.length}</p>
            </div>
            <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl">
              <span className="text-[10px] text-[#CAC4D0]/50 font-mono uppercase text-[#00D9A3]">Total Income</span>
              <p className="text-lg font-bold text-[#00D9A3] mt-0.5">${channel.earningsLifetime.toFixed(0)}</p>
            </div>
          </div>

          {/* Recent Video Performance details */}
          {latestVideo ? (
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-5">
              <div className="flex justify-between items-center border-b border-[#322F37]/60 pb-3">
                <h3 className="font-display font-semibold text-sm text-white">Latest Video Performance</h3>
                <span className="text-[10px] bg-[#9D8CFF]/10 text-[#9D8CFF] px-2.5 py-0.5 rounded-full font-mono font-medium border border-[#9D8CFF]/20">
                  Published {latestVideo.uploadDate}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <img 
                  src={latestVideo.thumbnail} 
                  alt="" 
                  className="w-full sm:w-44 aspect-video object-cover rounded-xl border border-[#322F37] bg-[#2B2930] flex-none"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex-grow space-y-3">
                  <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">{latestVideo.title}</h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[#CAC4D0]/50 text-[10px]">Views</p>
                      <p className="font-bold text-white mt-0.5 font-mono">{latestVideo.views.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[#CAC4D0]/50 text-[10px] text-[#00D9A3]">Revenue</p>
                      <p className="font-bold text-[#00D9A3] mt-0.5 font-mono">${latestVideo.earnings.toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    id="latest-perf-analytics-btn"
                    onClick={() => onSelectVideoAnalytics(latestVideo)}
                    className="text-xs text-[#9D8CFF] font-medium hover:underline flex items-center gap-1.5"
                  >
                    Go to video analytics &rarr;
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl text-center py-10">
              <p className="text-xs text-[#CAC4D0]/50">No uploads found. Upload a video first.</p>
            </div>
          )}

          {/* Revenue Assurance Card (MD3 outline styled) */}
          <div className="bg-[#1D1B20] border border-[#00D9A3]/30 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#00D9A3] text-sm">🔒</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Creator Revenue Assurance</h4>
              </div>
              <p className="text-[11px] text-[#CAC4D0]/60 max-w-lg">
                Reelio secures payouts via an escrow safety mechanism. All claims on your uploads are clear, and your account operates under <strong>Protected Status</strong>.
              </p>
            </div>
            <div className="bg-[#00D9A3]/10 text-[#00D9A3] border border-[#00D9A3]/30 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 flex-none">
              <span className="w-1.5 h-1.5 bg-[#00D9A3] rounded-full animate-pulse"></span> Active & Secure
            </div>
          </div>

        </div>

        {/* Right column - Inbox alerts & quick links */}
        <div className="space-y-6">
          
          {/* Quick Links block */}
          <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Quick Shortcuts</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button 
                id="studio-link-videos"
                onClick={() => onNavigateToTab('Channel')}
                className="p-3 bg-[#211F26] border border-[#322F37] rounded-xl hover:border-[#48454E] transition text-[#CAC4D0] font-medium"
              >
                📹 Manage Videos
              </button>
              <button 
                id="studio-link-earnings"
                onClick={() => onNavigateToTab('Earnings')}
                className="p-3 bg-[#211F26] border border-[#322F37] rounded-xl hover:border-[#48454E] transition text-[#CAC4D0] font-medium"
              >
                🪙 Earnings Hub
              </button>
              <button 
                id="studio-link-subscriptions"
                onClick={() => onNavigateToTab('Premium')}
                className="p-3 bg-[#211F26] border border-[#322F37] rounded-xl hover:border-[#48454E] transition text-[#CAC4D0] font-medium col-span-2"
              >
                ⭐ Subscriptions & Upgrades
              </button>
            </div>
          </div>

          {/* Inbox Alert log */}
          <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
            <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Workspace Alerts</h3>
            <div className="space-y-3.5">
              {NOTIFICATIONS_LIST.map((notif) => (
                <div key={notif.id} className="text-xs space-y-1 bg-[#211F26]/40 p-3 rounded-xl border border-[#322F37]/50">
                  <div className="flex justify-between text-[10px]">
                    <span className={`font-mono font-bold uppercase ${
                      notif.type === 'payout' ? 'text-[#00D9A3]' : 'text-[#9D8CFF]'
                    }`}>{notif.type}</span>
                    <span className="text-[#CAC4D0]/40 font-mono">{notif.timestamp}</span>
                  </div>
                  <p className="text-[#CAC4D0]/90 leading-relaxed text-[11px]">{notif.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

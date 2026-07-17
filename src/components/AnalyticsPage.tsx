import { useState } from 'react';
import { Video } from '../types';

interface AnalyticsPageProps {
  video: Video;
  onBackToChannel: () => void;
}

export default function AnalyticsPage({ video, onBackToChannel }: AnalyticsPageProps) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Audience' | 'Engagement'>('Overview');

  // Simulated metrics
  const viewsCount = video.views;
  const watchUnits = video.watchUnits || Math.round(video.views * 0.45);
  const avgDuration = "4:12";
  const engagementRate = video.engagementRate || 8.4;
  const totalEarnings = video.earnings;

  return (
    <div className="bg-[#121212] text-[#E6E1E5] px-6 py-8 max-w-6xl mx-auto space-y-8" id="video-analytics-page">
      
      {/* Back control & header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            id="analytics-back-btn"
            onClick={onBackToChannel} 
            className="w-10 h-10 rounded-full bg-[#1D1B20] border border-[#322F37] flex items-center justify-center text-white hover:bg-[#211F26] transition"
          >
            &larr;
          </button>
          <div>
            <h1 className="font-display font-bold text-xl text-white tracking-tight">Video Insights</h1>
            <p className="text-xs text-[#CAC4D0]/60 mt-0.5">Deep professional metrics for your published clip.</p>
          </div>
        </div>
        
        {/* Short mini preview */}
        <div className="flex items-center gap-3 bg-[#1D1B20] p-2 rounded-xl border border-[#322F37]">
          <img src={video.thumbnail} alt="" className="w-12 h-8 object-cover rounded" referrerPolicy="no-referrer" />
          <div className="min-w-0 max-w-[200px]">
            <p className="text-xs font-semibold text-white truncate">{video.title}</p>
            <p className="text-[10px] text-[#CAC4D0]/50 font-mono">Published {video.uploadDate}</p>
          </div>
        </div>
      </div>

      {/* Metric strip banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl text-center">
          <p className="text-[10px] text-[#CAC4D0]/60 uppercase tracking-wider font-mono">Views</p>
          <p className="font-display font-bold text-lg text-white mt-1">{viewsCount.toLocaleString()}</p>
        </div>
        <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl text-center">
          <p className="text-[10px] text-[#CAC4D0]/60 uppercase tracking-wider font-mono">Watch Units</p>
          <p className="font-display font-bold text-lg text-white mt-1">{watchUnits.toLocaleString()}</p>
        </div>
        <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl text-center">
          <p className="text-[10px] text-[#CAC4D0]/60 uppercase tracking-wider font-mono">Avg View duration</p>
          <p className="font-display font-bold text-lg text-white mt-1">{avgDuration}</p>
        </div>
        <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl text-center">
          <p className="text-[10px] text-[#CAC4D0]/60 uppercase tracking-wider font-mono">Engagement Rate</p>
          <p className="font-display font-bold text-lg text-[#9D8CFF] mt-1">{engagementRate}%</p>
        </div>
        <div className="bg-[#1D1B20] border border-[#322F37] p-4 rounded-xl text-center col-span-2 md:col-span-1">
          <p className="text-[10px] text-[#CAC4D0]/60 uppercase tracking-wider font-mono text-[#00D9A3]">Total Revenue</p>
          <p className="font-display font-bold text-lg text-[#00D9A3] mt-1">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#1D1B20] p-1.5 rounded-full w-max border border-[#322F37]">
        {(['Overview', 'Audience', 'Engagement'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition ${
              activeTab === tab ? 'bg-[#332B6B] text-[#9D8CFF]' : 'text-[#CAC4D0]/60 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="analytics-overview-tab">
            {/* Views timeline */}
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
              <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Views over time</h3>
              <div className="h-48 relative">
                <svg viewBox="0 0 400 150" className="w-full h-full text-[#9D8CFF]" preserveAspectRatio="none">
                  <path
                    d="M 0 150 Q 50 140 100 110 T 200 80 T 300 40 T 400 10"
                    fill="none"
                    stroke="#9D8CFF"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 150 Q 50 140 100 110 T 200 80 T 300 40 T 400 10 L 400 150 Z"
                    fill="url(#viewsGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9D8CFF"/>
                      <stop offset="100%" stopColor="#121212"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between text-[8px] font-mono text-[#CAC4D0]/30 mt-2">
                  <span>Day 1</span>
                  <span>Day 7</span>
                  <span>Day 14 (Latest)</span>
                </div>
              </div>
            </div>

            {/* Viewer retention curve */}
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Audience Retention</h3>
                <span className="text-xs font-mono text-[#00D9A3] font-bold">64.2% average</span>
              </div>
              <div className="h-48 relative">
                <svg viewBox="0 0 400 150" className="w-full h-full text-[#00D9A3]" preserveAspectRatio="none">
                  {/* Starts at 100%, drops slightly and settles */}
                  <path
                    d="M 0 10 Q 40 15 80 40 T 160 50 T 240 55 T 320 58 T 400 62"
                    fill="none"
                    stroke="#00D9A3"
                    strokeWidth="2.5"
                  />
                  <line x1="0" y1="75" x2="400" y2="75" stroke="#322F37" strokeWidth="0.5" strokeDasharray="3"/>
                </svg>
                <div className="flex justify-between text-[8px] font-mono text-[#CAC4D0]/30 mt-2">
                  <span>0:00 (Start)</span>
                  <span>5:00</span>
                  <span>{video.duration} (End)</span>
                </div>
              </div>
              <p className="text-[10px] text-[#CAC4D0]/50 leading-relaxed">
                Outstanding retention! Viewers are staying active above the platform average because of the interactive elements in the first 30 seconds.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Audience' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="analytics-audience-tab">
            {/* Demographic age ranges */}
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
              <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Viewer Age Demographics</h3>
              <div className="space-y-3">
                {[
                  { range: "18 - 24", pct: 45 },
                  { range: "25 - 34", pct: 38 },
                  { range: "35 - 44", pct: 12 },
                  { range: "45+", pct: 5 }
                ].map(item => (
                  <div key={item.range} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#CAC4D0]">{item.range}</span>
                      <span className="text-white font-medium">{item.pct}%</span>
                    </div>
                    <div className="h-2 w-full bg-[#211F26] rounded-full overflow-hidden">
                      <div className="h-full bg-[#9D8CFF] rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Acquisition channels */}
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
              <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Traffic Acquisition Channels</h3>
              <div className="divide-y divide-[#322F37]/40">
                {[
                  { source: "Reelio Feed Recommendations", pct: "58%" },
                  { source: "Search queries", pct: "22%" },
                  { source: "External social shares", pct: "14%" },
                  { source: "Direct channel profile visits", pct: "6%" }
                ].map(item => (
                  <div key={item.source} className="flex justify-between items-center py-3 text-xs">
                    <span className="text-[#CAC4D0]">{item.source}</span>
                    <span className="font-mono text-white font-semibold">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Engagement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="analytics-engagement-tab">
            {/* High level interactions breakdown */}
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Viewer interactions overview</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#211F26] p-3 rounded-lg border border-[#322F37]">
                  <span className="text-lg">👍</span>
                  <p className="text-xs text-white font-bold font-mono mt-1">{video.likes.toLocaleString()}</p>
                  <p className="text-[9px] text-[#CAC4D0]/40">Likes</p>
                </div>
                <div className="bg-[#211F26] p-3 rounded-lg border border-[#322F37]">
                  <span className="text-lg">💬</span>
                  <p className="text-xs text-white font-bold font-mono mt-1">{video.commentsCount}</p>
                  <p className="text-[9px] text-[#CAC4D0]/40">Comments</p>
                </div>
                <div className="bg-[#211F26] p-3 rounded-lg border border-[#322F37]">
                  <span className="text-lg">🔗</span>
                  <p className="text-xs text-white font-bold font-mono mt-1">456</p>
                  <p className="text-[9px] text-[#CAC4D0]/40">Shares</p>
                </div>
              </div>
              
              <div className="bg-[#211F26] p-4 rounded-xl border border-[#322F37]">
                <p className="text-xs text-white font-semibold">Micro-Engagement Note:</p>
                <p className="text-[11px] text-[#CAC4D0]/60 leading-relaxed mt-1">
                  89% of engagement occurred within the first 2 minutes of the video, correlating with a spike in Reelio Coin rewards distribution.
                </p>
              </div>
            </div>

            {/* Top reviews or comments */}
            <div className="bg-[#1D1B20] border border-[#322F37] p-6 rounded-2xl space-y-4">
              <h3 className="font-display font-semibold text-xs text-white uppercase tracking-wider font-mono text-[#CAC4D0]/60">Recent high-engaged comments</h3>
              {video.comments && video.comments.length > 0 ? (
                <div className="space-y-4">
                  {video.comments.slice(0, 2).map(c => (
                    <div key={c.id} className="flex gap-3 bg-[#211F26]/30 p-3 rounded-xl border border-[#322F37]/40">
                      <img src={c.authorAvatar} alt="" className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="font-semibold text-white">{c.authorName}</span>
                          <span className="font-mono text-[#00D9A3]">👍 {c.likes}</span>
                        </div>
                        <p className="text-xs text-[#CAC4D0] mt-1 leading-snug line-clamp-2">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#CAC4D0]/50 text-center py-10">No recent commented feedback found.</p>
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

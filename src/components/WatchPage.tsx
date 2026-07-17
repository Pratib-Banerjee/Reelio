import React, { useState, useEffect, useRef } from 'react';
import { Video, Comment } from '../types';

interface WatchPageProps {
  video: Video;
  allVideos: Video[];
  onSelectVideo: (video: Video) => void;
  onSubscribeToggle: (channelId: string) => void;
  isSubscribed: boolean;
  onAddToWatchlist: (videoId: string) => void;
  isInWatchlist: boolean;
  onEarnCoins: (amount: number) => void;
  showToast: (message: string) => void;
}

export default function WatchPage({
  video,
  allVideos,
  onSelectVideo,
  onSubscribeToggle,
  isSubscribed,
  onAddToWatchlist,
  isInWatchlist,
  onEarnCoins,
  showToast
}: WatchPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0); // 0 to 100% for the current 30-second unit
  const [earnedUnits, setEarnedUnits] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [comments, setComments] = useState<Comment[]>(video.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [videoPlayTime, setVideoPlayTime] = useState(0); // overall percentage of video played

  // Reset progress when switching videos
  useEffect(() => {
    setComments(video.comments || []);
    setWatchProgress(0);
    setEarnedUnits(0);
    setIsPlaying(false);
    setVideoPlayTime(0);
  }, [video]);

  // Simulate active playing watch-time accumulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setWatchProgress((prev) => {
          if (prev >= 100) {
            // Unlocked a 30-second watch unit!
            setEarnedUnits(u => u + 1);
            onEarnCoins(10); // user earns 10 Reelio coins
            showToast("+1 watch unit earned! (+10 🪙)");
            return 0; // reset ring for next unit
          }
          return prev + 6.67; // approx 15 increments to reach 100% (approx 15 seconds for prototype speedup, or 2s = 30s scale)
        });

        setVideoPlayTime(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + 1.5;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onEarnCoins, showToast]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      authorName: "My Channel",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
      text: newCommentText,
      timestamp: "Just now",
      likes: 0,
      replies: []
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    }));
  };

  const recommendedRail = allVideos.filter(v => v.id !== video.id).slice(0, 5);

  return (
    <div className="bg-[#121212] text-[#E6E1E5] px-6 py-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8" id="watch-page-container">
      
      {/* Video Player & Left Column details */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Responsive Video Canvas Box */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-[#322F37] group">
          {/* Simulated Video Feed background */}
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="absolute inset-0 w-full h-full object-cover opacity-75 select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Custom play status overlays */}
          {!isPlaying && (
            <div 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/45 cursor-pointer z-10"
            >
              <div className="w-16 h-16 rounded-full bg-[#9D8CFF] text-[#1B0064] flex items-center justify-center pl-1 shadow-lg hover:scale-105 transition transform">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}

          {/* Playing overlay ambient shadow */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          )}

          {/* Dynamic monetization meter widget (Teal theme) */}
          <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#00D9A3]/30 flex items-center gap-3 z-10">
            {/* SVG circular meter */}
            <div className="relative w-8 h-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#322F37]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00D9A3] transition-all duration-300"
                  strokeWidth="3.5"
                  strokeDasharray={`${watchProgress}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-[#00D9A3]">
                {earnedUnits}u
              </div>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-[#00D9A3] uppercase tracking-wider">Watch Rewards</p>
              <p className="text-[9px] text-[#CAC4D0]/60">Accumulating 30-sec units...</p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
            {/* Timeline track */}
            <div className="h-1.5 w-full bg-[#322F37] rounded-full overflow-hidden cursor-pointer">
              <div 
                className="h-full bg-[#9D8CFF]" 
                style={{ width: `${videoPlayTime}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-[#9D8CFF] transition"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
                <span className="text-xs font-mono text-[#CAC4D0]">
                  {Math.floor((videoPlayTime / 100) * 12)}:00 / {video.duration}
                </span>
              </div>
              <div className="text-xs font-mono text-[#00D9A3] flex items-center gap-1.5 bg-[#00D9A3]/10 px-3 py-1 rounded-full border border-[#00D9A3]/30">
                <span>🟢 Active Stream</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Title and Interaction Panel */}
        <div className="space-y-4">
          <h1 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
            {video.title}
          </h1>

          <div className="flex flex-wrap justify-between items-center gap-4 py-2 border-b border-[#322F37]/50 pb-4">
            <div className="flex items-center gap-3">
              <img 
                src={video.creatorAvatar} 
                alt={video.creatorName} 
                className="w-10 h-10 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-semibold text-white">{video.creatorName}</p>
                <p className="text-xs text-[#CAC4D0]/60">12.5K subscribers</p>
              </div>
              <button 
                id="watch-subscribe-btn"
                onClick={() => onSubscribeToggle(video.creatorId)}
                className={`ml-4 px-5 py-2 rounded-full text-xs font-medium transition ${
                  isSubscribed 
                    ? 'border border-[#48454E] text-[#CAC4D0] hover:bg-[#211F26]' 
                    : 'bg-[#9D8CFF] text-[#1B0064] hover:opacity-90'
                }`}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2">
              <div className="bg-[#211F26] rounded-full p-1 flex items-center border border-[#322F37]">
                <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs text-[#CAC4D0] hover:text-white transition">
                  👍 <span className="font-mono">{video.likes.toLocaleString()}</span>
                </button>
                <div className="w-px h-4 bg-[#322F37]"></div>
                <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs text-[#CAC4D0] hover:text-white transition">
                  👎
                </button>
              </div>

              <button 
                id="watch-watchlist-btn"
                onClick={() => onAddToWatchlist(video.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition ${
                  isInWatchlist
                    ? 'bg-[#332B6B] border-transparent text-[#9D8CFF]'
                    : 'bg-[#211F26] border-[#322F37] text-[#CAC4D0] hover:border-[#48454E]'
                }`}
              >
                {isInWatchlist ? '✓ Saved' : '+ Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Description Box */}
        <div className="bg-[#1D1B20] border border-[#322F37] rounded-2xl p-4">
          <div className="flex justify-between text-xs text-[#CAC4D0]/80 font-mono mb-2">
            <span>{video.views.toLocaleString()} views &middot; {video.uploadDate}</span>
            <span className="text-[#9D8CFF] font-medium uppercase tracking-wider">{video.category}</span>
          </div>
          <p className={`text-xs text-[#CAC4D0] leading-relaxed ${isDescExpanded ? '' : 'line-clamp-2'}`}>
            {video.description}
          </p>
          <button 
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="text-[#9D8CFF] text-xs font-medium hover:underline mt-2 inline-block"
          >
            {isDescExpanded ? 'Show less' : 'Read more...'}
          </button>
        </div>

        {/* Threaded Comments Section */}
        <div className="space-y-6 pt-4">
          <h3 className="font-display font-bold text-base text-white">{comments.length} Comments</h3>
          
          <form onSubmit={handlePostComment} className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-[#9D8CFF] flex-none"></div>
            <div className="flex-grow space-y-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Add a polite comment on this video..."
                className="w-full bg-[#1D1B20] border border-[#322F37] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
              />
              {newCommentText.trim() && (
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setNewCommentText('')}
                    className="px-4 py-1.5 rounded-full border border-[#48454E] text-[#CAC4D0] text-[11px] font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-[#9D8CFF] text-[#1B0064] text-[11px] font-medium"
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Threaded comments rendering */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <img 
                    src={comment.authorAvatar} 
                    alt={comment.authorName} 
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-medium text-white">{comment.authorName}</span>
                      <span className="text-[#CAC4D0]/50 font-mono text-[10px]">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#CAC4D0] mt-1 leading-relaxed">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button 
                        onClick={() => handleLikeComment(comment.id)}
                        className="text-[10px] text-[#CAC4D0]/60 hover:text-[#9D8CFF] flex items-center gap-1"
                      >
                        👍 {comment.likes}
                      </button>
                      <button className="text-[10px] text-[#CAC4D0]/60 hover:text-white font-medium">Reply</button>
                    </div>
                  </div>
                </div>

                {/* Sub replies */}
                {comment.replies && comment.replies.map((reply) => (
                  <div key={reply.id} className="ml-11 flex gap-3 pl-4 border-l border-[#322F37]/60">
                    <img 
                      src={reply.authorAvatar} 
                      alt={reply.authorName} 
                      className="w-6.5 h-6.5 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-medium text-white">{reply.authorName}</span>
                        <span className="text-[#CAC4D0]/50 font-mono text-[10px]">{reply.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#CAC4D0] mt-1 leading-relaxed">{reply.text}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-[#CAC4D0]/50">👍 {reply.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Up next Sidebar recommendation rail */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-sm text-white">Up Next</h3>
        
        <div className="space-y-4">
          {recommendedRail.map((v) => (
            <div 
              key={`rail-${v.id}`}
              onClick={() => onSelectVideo(v)}
              className="flex gap-3 bg-[#1D1B20]/40 hover:bg-[#1D1B20] p-2.5 rounded-xl cursor-pointer border border-[#322F37]/20 hover:border-[#322F37] transition"
            >
              <div className="relative w-28 aspect-video rounded-lg overflow-hidden flex-none">
                <img 
                  src={v.thumbnail} 
                  alt={v.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 bg-black/85 text-[10px] text-white px-1 py-0.2 rounded font-mono">
                  {v.duration}
                </span>
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <h4 className="text-xs text-[#E6E1E5] font-medium leading-snug line-clamp-2 hover:text-[#9D8CFF] transition">
                  {v.title}
                </h4>
                <div>
                  <p className="text-[10px] text-[#CAC4D0] truncate mt-1">{v.creatorName}</p>
                  <p className="text-[9px] text-[#CAC4D0]/50 font-mono truncate">
                    {v.views.toLocaleString()} views
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

import { Video } from '../types';

interface WatchlistPageProps {
  videos: Video[];
  watchlistIds: string[];
  onRemoveFromWatchlist: (id: string) => void;
  onSelectVideo: (video: Video) => void;
}

export default function WatchlistPage({
  videos,
  watchlistIds,
  onRemoveFromWatchlist,
  onSelectVideo
}: WatchlistPageProps) {
  const watchlistVideos = videos.filter(v => watchlistIds.includes(v.id));

  return (
    <div className="bg-[#121212] text-[#E6E1E5] px-6 py-8 max-w-6xl mx-auto space-y-6" id="watchlist-page">
      
      {/* Title */}
      <div>
        <h1 className="font-display font-bold text-2xl text-white tracking-tight">Your Watchlist</h1>
        <p className="text-xs text-[#CAC4D0]/60 mt-1">Access all your bookmarked streams and watch lessons offline.</p>
      </div>

      {watchlistVideos.length === 0 ? (
        <div className="text-center py-20 bg-[#1D1B20] border border-dashed border-[#48454E] rounded-3xl" id="watchlist-empty-state">
          <span className="text-4xl">📁</span>
          <h2 className="font-display font-bold text-lg text-white mt-4">Your Watchlist is empty</h2>
          <p className="text-[#CAC4D0] text-xs max-w-xs mx-auto mt-2">
            Click "+ Save" on any video player screen to build your curated learning playlist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="watchlist-grid">
          {watchlistVideos.map((video) => (
            <div
              key={`watchlist-${video.id}`}
              className="bg-[#1D1B20] border border-[#322F37] rounded-2xl overflow-hidden group hover:border-[#48454E] transition flex flex-col justify-between"
            >
              <div 
                onClick={() => onSelectVideo(video)}
                className="relative aspect-video cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 right-2 bg-black/85 text-xs text-white px-2 py-0.5 rounded font-mono font-medium">
                  {video.duration}
                </span>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 
                    onClick={() => onSelectVideo(video)}
                    className="font-sans font-medium text-[#E6E1E5] text-xs line-clamp-2 leading-snug cursor-pointer hover:text-[#9D8CFF] transition"
                  >
                    {video.title}
                  </h3>
                  <p className="text-[10px] text-[#CAC4D0]/60 truncate mt-1">By {video.creatorName}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#322F37]/40">
                  <span className="text-[10px] font-mono text-[#00D9A3] font-semibold bg-[#00D9A3]/5 px-2 py-0.5 rounded">
                    ~${video.earnings.toFixed(1)} earned
                  </span>
                  <button
                    id={`remove-watchlist-btn-${video.id}`}
                    onClick={() => onRemoveFromWatchlist(video.id)}
                    className="text-red-400 hover:text-red-500 text-[11px] font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

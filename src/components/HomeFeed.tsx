import { useState, useMemo } from 'react';
import { Video } from '../types';

interface HomeFeedProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  onOpenUpload: () => void;
  userCoinBalance: number;
  currentChannelName: string;
  currentChannelAvatar: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function HomeFeed({
  videos,
  onSelectVideo,
  onOpenUpload,
  userCoinBalance,
  currentChannelName,
  currentChannelAvatar,
  searchQuery,
  setSearchQuery
}: HomeFeedProps) {
  const [selectedPill, setSelectedPill] = useState('All');

  const filterPills = ['All', 'Trending', 'Live now', 'Tech', 'Cooking', 'Music', 'Gaming', 'Earning tips'];

  // Filter & Search Logic
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Category match
      let matchesCategory = true;
      if (selectedPill !== 'All') {
        if (selectedPill === 'Trending') {
          matchesCategory = video.views > 30000;
        } else if (selectedPill === 'Live now') {
          matchesCategory = video.id === 'vid-3' || video.id === 'vid-5'; // Mock live videos
        } else {
          matchesCategory = video.category.toLowerCase() === selectedPill.toLowerCase();
        }
      }

      // Search match
      const matchesSearch = searchQuery
        ? video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedPill, searchQuery]);

  // Premium recommended shelf at the top (different style)
  const recommendedVideos = useMemo(() => {
    return videos.slice(0, 3);
  }, [videos]);

  return (
    <div className="bg-[#121212] min-h-screen text-[#E6E1E5]" id="home-feed-view">
      {/* Search and filter header */}
      <div className="sticky top-0 z-30 bg-[#121212] pt-4 pb-2 border-b border-[#322F37]">
        {/* Horizontal filter pills row */}
        <div className="px-6 flex gap-2.5 overflow-x-auto pb-3 scrollbar-none" id="filter-pills-container">
          {filterPills.map((pill) => {
            const isActive = selectedPill === pill;
            return (
              <button
                key={pill}
                onClick={() => setSelectedPill(pill)}
                className={`px-4 py-2 rounded-full text-xs font-medium border whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#332B6B] text-[#9D8CFF] border-transparent'
                    : 'bg-[#211F26] text-[#CAC4D0] border-[#322F37] hover:border-[#48454E]'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto space-y-10">
        
        {/* Recommended Shelf (Horizontal Scroll, Large Cards) */}
        {searchQuery === '' && selectedPill === 'All' && (
          <section className="space-y-4" id="recommended-shelf">
            <div className="flex justify-between items-center">
              <h2 className="font-display font-bold text-lg text-white">Recommended for you</h2>
              <span className="text-xs text-[#00D9A3] font-mono font-medium bg-[#00D9A3]/10 px-3 py-1 rounded-full">
                Based on your interests
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedVideos.map((video) => (
                <div
                  key={`rec-${video.id}`}
                  onClick={() => onSelectVideo(video)}
                  className="bg-[#1D1B20] border border-[#322F37] rounded-3xl overflow-hidden cursor-pointer group hover:border-[#48454E] transition flex flex-col h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#121212]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-[#9D8CFF] font-medium border border-[#322F37]">
                      {video.category}
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/85 text-xs text-white px-2 py-0.5 rounded font-mono font-medium">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-sm text-[#E6E1E5] line-clamp-2 leading-snug group-hover:text-[#9D8CFF] transition">
                        {video.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#322F37]/40">
                      <img
                        src={video.creatorAvatar}
                        alt={video.creatorName}
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate">{video.creatorName}</p>
                        <p className="text-[10px] text-[#CAC4D0]/60 truncate">
                          {video.views.toLocaleString()} views &middot; {video.uploadDate}
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-[#00D9A3] flex items-center gap-1">
                        ~${video.earnings.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* General Feed Grid */}
        <section className="space-y-5" id="general-feed">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-lg text-white">
              {selectedPill === 'All' ? 'Explore all feed' : `${selectedPill} feed`}
            </h2>
            <p className="text-xs text-[#CAC4D0]/60 font-mono">
              Showing {filteredVideos.length} videos
            </p>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="text-center py-20 bg-[#1D1B20] border border-dashed border-[#48454E] rounded-3xl">
              <span className="text-4xl">🔍</span>
              <h3 className="font-display font-bold text-lg text-white mt-4">No videos found</h3>
              <p className="text-[#CAC4D0] text-sm max-w-sm mx-auto mt-2">
                We couldn't find anything matching your filters or search. Try selecting another topic pill.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => onSelectVideo(video)}
                  className="bg-[#1D1B20] border border-[#322F37] rounded-2xl overflow-hidden group cursor-pointer hover:border-[#48454E] transition flex flex-col h-full"
                >
                  <div className="relative aspect-video">
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
                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-sans font-medium text-[#E6E1E5] text-xs line-clamp-2 leading-snug group-hover:text-[#9D8CFF] transition mb-2">
                        {video.title}
                      </h3>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 pt-2 border-t border-[#322F37]/30">
                        <img
                          src={video.creatorAvatar}
                          alt={video.creatorName}
                          className="w-6 h-6 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-[#CAC4D0] truncate">{video.creatorName}</p>
                          <p className="text-[10px] text-[#CAC4D0]/60 truncate">
                            {video.views.toLocaleString()} views &middot; {video.uploadDate}
                          </p>
                        </div>
                      </div>
                      
                      {/* Earning indicator tag (Teal - Earnings context only) */}
                      <div className="flex justify-between items-center mt-2.5 bg-[#211F26] px-2.5 py-1 rounded-lg border border-[#322F37]">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#CAC4D0]/50">Engagement</span>
                        <span className="text-[10px] font-mono font-bold text-[#00D9A3] flex items-center gap-0.5">
                          🪙 {Math.round(video.earnings * 1.5)} units
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

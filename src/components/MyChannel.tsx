import React, { useState } from 'react';
import { Video, Channel } from '../types';

interface MyChannelProps {
  channel: Channel;
  videos: Video[];
  onUpdateChannel: (updated: Partial<Channel>) => void;
  onUpdateVideo: (video: Video) => void;
  onDeleteVideo: (id: string) => void;
  onOpenUpload: () => void;
  onSelectVideoAnalytics: (video: Video) => void;
  onSelectVideo: (video: Video) => void;
}

export default function MyChannel({
  channel,
  videos,
  onUpdateChannel,
  onUpdateVideo,
  onDeleteVideo,
  onOpenUpload,
  onSelectVideoAnalytics,
  onSelectVideo
}: MyChannelProps) {
  const [activeTab, setActiveTab] = useState<'Videos' | 'Shorts' | 'Live' | 'About'>('Videos');
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState<Video | null>(null);
  const [isDeletingVideoId, setIsDeletingVideoId] = useState<string | null>(null);

  // Edit Channel fields
  const [editName, setEditName] = useState(channel.name);
  const [editBio, setEditBio] = useState(channel.bio);

  // Edit Video fields
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editVisibility, setEditVisibility] = useState<'Public' | 'Unlisted' | 'Private' | 'Scheduled'>('Public');
  const [editMonetization, setEditMonetization] = useState<'Ad-supported' | 'Pay-per-view' | 'Premium only' | 'Not monetized'>('Ad-supported');

  // Channel update submission
  const handleSaveChannel = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateChannel({ name: editName, bio: editBio });
    setIsEditingChannel(false);
  };

  // Video edit launch
  const handleStartEditVideo = (video: Video) => {
    setIsEditingVideo(video);
    setEditTitle(video.title);
    setEditDesc(video.description);
    setEditVisibility(video.visibility);
    setEditMonetization(video.monetization);
  };

  // Video update submission
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingVideo) return;

    onUpdateVideo({
      ...isEditingVideo,
      title: editTitle,
      description: editDesc,
      visibility: editVisibility,
      monetization: editMonetization
    });
    setIsEditingVideo(null);
  };

  const channelVideos = videos.filter(v => v.creatorId === channel.id);

  return (
    <div className="bg-[#121212] text-[#E6E1E5]" id="my-channel-view">
      
      {/* Banner */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-[#1D1B20] border-b border-[#322F37]">
        <img 
          src={channel.banner} 
          alt="Channel banner" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
      </div>

      {/* Profile Header Block */}
      <div className="px-6 max-w-6xl mx-auto -mt-16 sm:-mt-24 relative z-10 space-y-6 pb-6 border-b border-[#322F37]">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <img 
              src={channel.avatar} 
              alt={channel.name} 
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#121212] object-cover bg-[#211F26]"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">{channel.name}</h1>
              <p className="text-xs font-mono text-[#9D8CFF]">{channel.handle}</p>
              <p className="text-xs text-[#CAC4D0]">{channel.subscribers.toLocaleString()} subscribers</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button 
              id="edit-channel-btn"
              onClick={() => {
                setEditName(channel.name);
                setEditBio(channel.bio);
                setIsEditingChannel(true);
              }}
              className="px-5 py-2 rounded-full border border-[#48454E] hover:bg-[#1D1B20] text-xs font-medium transition"
            >
              Edit Profile
            </button>
            <button 
              id="channel-upload-btn"
              onClick={onOpenUpload}
              className="px-5 py-2 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-medium hover:opacity-90 transition"
            >
              + Create New
            </button>
          </div>
        </div>

        <p className="text-sm text-[#CAC4D0] max-w-3xl leading-relaxed mx-auto sm:mx-0">
          {channel.bio}
        </p>
      </div>

      {/* Tabs list */}
      <div className="border-b border-[#322F37]/60 bg-[#121212]">
        <div className="px-6 max-w-6xl mx-auto flex gap-6">
          {(['Videos', 'Shorts', 'Live', 'About'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 text-xs font-medium relative transition-colors ${
                activeTab === tab ? 'text-[#9D8CFF]' : 'text-[#CAC4D0]/60 hover:text-white'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#9D8CFF] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 py-8 max-w-6xl mx-auto">
        {activeTab === 'Videos' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-white">Channel Videos</h3>
            
            {channelVideos.length === 0 ? (
              <div className="text-center py-16 bg-[#1D1B20] border border-dashed border-[#48454E] rounded-3xl">
                <span className="text-3xl">🎬</span>
                <h4 className="text-white font-medium text-base mt-3">No videos uploaded yet</h4>
                <p className="text-xs text-[#CAC4D0] mt-1 max-w-xs mx-auto">Start sharing your creation immediately and earn monetization instantly.</p>
                <button 
                  onClick={onOpenUpload}
                  className="mt-4 px-5 py-2 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-medium hover:opacity-90 transition"
                >
                  Upload First Video
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto bg-[#1D1B20] border border-[#322F37] rounded-2xl">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#322F37] text-xs font-mono text-[#CAC4D0]/50 uppercase tracking-wider">
                      <th className="py-4 px-6">Video details</th>
                      <th className="py-4 px-4 text-center">Visibility</th>
                      <th className="py-4 px-4 text-right">Views</th>
                      <th className="py-4 px-4 text-right text-[#00D9A3]">Earnings</th>
                      <th className="py-4 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#322F37]/50 text-xs">
                    {channelVideos.map((video) => (
                      <tr key={video.id} className="hover:bg-[#211F26]/50 transition-colors">
                        <td className="py-4 px-6 flex gap-3.5 items-center max-w-xs">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            onClick={() => onSelectVideo(video)}
                            className="w-16 h-10 object-cover rounded-lg flex-none bg-[#2B2930] cursor-pointer"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p 
                              onClick={() => onSelectVideo(video)}
                              className="font-medium text-[#E6E1E5] truncate cursor-pointer hover:text-[#9D8CFF] transition"
                            >
                              {video.title}
                            </p>
                            <p className="text-[10px] text-[#CAC4D0]/50 font-mono mt-0.5">{video.uploadDate}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                            video.visibility === 'Public' 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {video.visibility}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-mono text-[#CAC4D0]">
                          {video.views.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-[#00D9A3]">
                          ${video.earnings.toFixed(2)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              id={`manage-analytics-${video.id}`}
                              onClick={() => onSelectVideoAnalytics(video)}
                              className="px-3 py-1.5 rounded-lg border border-[#48454E] hover:bg-[#2B2930] text-[11px] font-medium transition"
                            >
                              Analytics
                            </button>
                            <button
                              id={`manage-edit-${video.id}`}
                              onClick={() => handleStartEditVideo(video)}
                              className="px-3 py-1.5 rounded-lg border border-[#48454E] hover:bg-[#2B2930] text-[11px] font-medium transition text-[#9D8CFF]"
                            >
                              Edit
                            </button>
                            <button
                              id={`manage-delete-${video.id}`}
                              onClick={() => setIsDeletingVideoId(video.id)}
                              className="px-3 py-1.5 rounded-lg border border-[#322F37] hover:bg-red-900/20 text-[11px] font-medium transition text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Shorts' && (
          <div className="text-center py-16 bg-[#1D1B20] border border-[#322F37] rounded-2xl">
            <p className="text-sm text-[#CAC4D0]">You haven't uploaded any Shorts yet.</p>
          </div>
        )}

        {activeTab === 'Live' && (
          <div className="text-center py-16 bg-[#1D1B20] border border-[#322F37] rounded-2xl">
            <p className="text-sm text-[#CAC4D0]">No live stream schedule found.</p>
          </div>
        )}

        {activeTab === 'About' && (
          <div className="bg-[#1D1B20] border border-[#322F37] rounded-2xl p-6 space-y-4">
            <h4 className="font-display font-bold text-sm text-white">Channel description</h4>
            <p className="text-xs text-[#CAC4D0] leading-relaxed">{channel.bio}</p>
            <div className="border-t border-[#322F37] pt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[#CAC4D0]/60">Joined</p>
                <p className="font-medium text-white font-mono">May 12, 2024</p>
              </div>
              <div>
                <p className="text-[#CAC4D0]/60">Total subscribers</p>
                <p className="font-medium text-white font-mono">{channel.subscribers.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditingChannel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-6 w-full max-w-md space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Edit Channel Profile</h3>
            <form onSubmit={handleSaveChannel} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Channel Display Name</label>
                <input 
                  type="text" 
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Short Biography</label>
                <textarea 
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={4}
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF] resize-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditingChannel(false)}
                  className="px-4 py-2 rounded-full border border-[#48454E] text-xs font-medium text-[#CAC4D0]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-medium"
                >
                  Save Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Video Modal */}
      {isEditingVideo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-6 w-full max-w-lg space-y-4">
            <h3 className="font-display font-bold text-lg text-white">Edit Video Settings</h3>
            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Video Title</label>
                <input 
                  type="text" 
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Description</label>
                <textarea 
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={3}
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs text-[#CAC4D0]">Visibility</label>
                  <select 
                    value={editVisibility}
                    onChange={(e) => setEditVisibility(e.target.value as any)}
                    className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Public">Public</option>
                    <option value="Unlisted">Unlisted</option>
                    <option value="Private">Private</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-[#CAC4D0]">Monetization Mode</label>
                  <select 
                    value={editMonetization}
                    onChange={(e) => setEditMonetization(e.target.value as any)}
                    className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Ad-supported">Ad-supported</option>
                    <option value="Pay-per-view">Pay-per-view</option>
                    <option value="Premium only">Premium only</option>
                    <option value="Not monetized">Not monetized</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditingVideo(null)}
                  className="px-4 py-2 rounded-full border border-[#48454E] text-xs font-medium text-[#CAC4D0]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-medium"
                >
                  Update Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Video Confirm dialog */}
      {isDeletingVideoId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-6 w-full max-w-sm text-center space-y-4">
            <span className="text-3xl">⚠️</span>
            <h3 className="font-display font-bold text-lg text-white">Permanent deletion</h3>
            <p className="text-xs text-[#CAC4D0] leading-relaxed">
              Are you sure you want to delete this video? All existing viewers watch logs, reviews, and catalog status will be deleted. <strong>Note: Your earnings history for this video remains preserved in your wallet securely.</strong>
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button 
                onClick={() => setIsDeletingVideoId(null)}
                className="px-5 py-2 rounded-full border border-[#48454E] text-xs font-medium text-[#CAC4D0]"
              >
                No, Keep
              </button>
              <button 
                onClick={() => {
                  onDeleteVideo(isDeletingVideoId);
                  setIsDeletingVideoId(null);
                }}
                className="px-5 py-2 rounded-full bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

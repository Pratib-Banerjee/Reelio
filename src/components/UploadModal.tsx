import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../types';

interface UploadModalProps {
  onClose: () => void;
  onPublish: (newVideos: Video[]) => void;
  channelId: string;
  channelName: string;
  channelAvatar: string;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
  title: string;
  description: string;
  category: string;
  visibility: 'Public' | 'Unlisted' | 'Private' | 'Scheduled';
  monetization: 'Ad-supported' | 'Pay-per-view' | 'Premium only' | 'Not monetized';
  thumbnailUrl: string;
}

export default function UploadModal({
  onClose,
  onPublish,
  channelId,
  channelName,
  channelAvatar
}: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [filesList, setFilesList] = useState<UploadingFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Single form data (cached when in single tab)
  const [singleTitle, setSingleTitle] = useState('');
  const [singleDesc, setSingleDesc] = useState('');
  const [singleCategory, setSingleCategory] = useState('Tech');
  const [singleVisibility, setSingleVisibility] = useState<'Public' | 'Unlisted' | 'Private' | 'Scheduled'>('Public');
  const [singleMonetization, setSingleMonetization] = useState<'Ad-supported' | 'Pay-per-view' | 'Premium only' | 'Not monetized'>('Ad-supported');

  // Currently expanded file in bulk list for detailed editing
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);

  // Clean form when swapping modes
  useEffect(() => {
    setFilesList([]);
    setExpandedFileId(null);
  }, [activeTab]);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const incoming = Array.from(e.target.files) as File[];
    
    const mapped: UploadingFile[] = incoming.map((f, i) => {
      const titleClean = f.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
      return {
        id: `f-${Date.now()}-${i}`,
        name: f.name,
        progress: 0,
        title: titleClean.charAt(0).toUpperCase() + titleClean.slice(1),
        description: "A fresh and creative video uploaded to Reelio.",
        category: "Tech",
        visibility: "Public",
        monetization: "Ad-supported",
        // random high-quality placeholder image
        thumbnailUrl: `https://images.unsplash.com/photo-${1531297484000 + i * 100}-80022131f5a1?w=600&auto=format&fit=crop&q=80`
      };
    });

    setFilesList(prev => {
      const merged = activeTab === 'single' ? [mapped[0]] : [...prev, ...mapped].slice(0, 8);
      return merged;
    });

    // Start simulated progress bars
    mapped.forEach(item => {
      simulateProgress(item.id);
    });
  };

  const simulateProgress = (id: string) => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 25) + 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setFilesList(prev => prev.map(f => f.id === id ? { ...f, progress: p } : f));
    }, 400);
  };

  const handleRemoveFile = (id: string) => {
    setFilesList(prev => prev.filter(f => f.id !== id));
    if (expandedFileId === id) setExpandedFileId(null);
  };

  const handleCopyDetailsToAll = (sourceFile: UploadingFile) => {
    setFilesList(prev => prev.map(f => ({
      ...f,
      category: sourceFile.category,
      visibility: sourceFile.visibility,
      monetization: sourceFile.monetization,
      description: sourceFile.description
    })));
  };

  const handlePublishClick = () => {
    if (filesList.length === 0) return;

    // Check if everything is 100% loaded
    const isReady = filesList.every(f => f.progress === 100);
    if (!isReady) return;

    const published: Video[] = filesList.map(f => {
      return {
        id: `pub-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        title: activeTab === 'single' ? (singleTitle || f.title) : f.title,
        description: activeTab === 'single' ? (singleDesc || f.description) : f.description,
        duration: "10:30",
        views: 0,
        earnings: 0,
        category: activeTab === 'single' ? singleCategory : f.category,
        visibility: activeTab === 'single' ? singleVisibility : f.visibility,
        monetization: activeTab === 'single' ? singleMonetization : f.monetization,
        thumbnail: f.thumbnailUrl,
        videoUrl: "",
        creatorId: channelId,
        creatorName: channelName,
        creatorAvatar: channelAvatar,
        uploadDate: "Just now",
        likes: 0,
        dislikes: 0,
        commentsCount: 0,
        comments: []
      };
    });

    onPublish(published);
  };

  const isUploadFinished = filesList.length > 0 && filesList.every(f => f.progress === 100);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#322F37]/60 flex justify-between items-center bg-[#1D1B20]">
          <h2 className="font-display font-bold text-lg text-white">Upload Video Suite</h2>
          <button 
            id="close-upload-modal-btn"
            onClick={onClose} 
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#211F26] text-[#CAC4D0] hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          
          {/* Tabs switch */}
          <div className="flex bg-[#211F26] p-1 rounded-full w-max border border-[#322F37]">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                activeTab === 'single' ? 'bg-[#9D8CFF] text-[#1B0064]' : 'text-[#CAC4D0]/60 hover:text-white'
              }`}
            >
              Single Video
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                activeTab === 'bulk' ? 'bg-[#9D8CFF] text-[#1B0064]' : 'text-[#CAC4D0]/60 hover:text-white'
              }`}
            >
              Bulk Upload (Max 8)
            </button>
          </div>

          {/* Upload Dropzone triggers */}
          {filesList.length === 0 && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#48454E] hover:border-[#9D8CFF] rounded-3xl p-10 text-center bg-[#211F26]/30 cursor-pointer transition group"
            >
              <span className="text-4xl text-[#9D8CFF] group-hover:scale-110 transition inline-block">⇪</span>
              <p className="font-display font-semibold text-sm text-white mt-4">Drag and drop video files here</p>
              <p className="text-xs text-[#CAC4D0]/60 mt-1">MP4, WebM or MOV up to 4GB. Click to browse files.</p>
            </div>
          )}

          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleSelectFiles}
            accept="video/*"
            multiple={activeTab === 'bulk'}
            className="hidden"
          />

          {/* Files queue display list */}
          {filesList.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xs text-[#CAC4D0] uppercase tracking-wider font-mono">Uploading Queue</h3>
              
              <div className="space-y-3">
                {filesList.map((file) => {
                  const isExpanded = expandedFileId === file.id;
                  const isDone = file.progress === 100;

                  return (
                    <div 
                      key={file.id} 
                      className="bg-[#211F26] border border-[#322F37] rounded-2xl overflow-hidden p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <img src={file.thumbnailUrl} alt="" className="w-12 h-8 object-cover rounded bg-[#2B2930]" referrerPolicy="no-referrer" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-white truncate">{file.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 h-1.5 bg-[#121212] rounded-full overflow-hidden">
                                <div className="h-full bg-[#00D9A3]" style={{ width: `${file.progress}%` }} />
                              </div>
                              <span className="text-[9px] font-mono font-bold text-[#00D9A3]">{file.progress}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {activeTab === 'bulk' && isDone && (
                            <button
                              onClick={() => setExpandedFileId(isExpanded ? null : file.id)}
                              className="px-3 py-1.5 rounded-lg border border-[#48454E] text-[10px] font-semibold text-white"
                            >
                              {isExpanded ? 'Collapse' : 'Edit Details'}
                            </button>
                          )}
                          <button
                            onClick={() => handleRemoveFile(file.id)}
                            className="w-7 h-7 rounded-full bg-[#1D1B20] text-red-400 hover:bg-red-950/20 flex items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Expanded mini-form (Bulk edit details) */}
                      {activeTab === 'bulk' && isExpanded && (
                        <div className="border-t border-[#322F37]/60 pt-4 space-y-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase font-mono text-[#CAC4D0]/60">Video Title</label>
                            <input 
                              type="text"
                              value={file.title}
                              onChange={(e) => setFilesList(prev => prev.map(f => f.id === file.id ? { ...f, title: e.target.value } : f))}
                              className="w-full bg-[#1D1B20] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase font-mono text-[#CAC4D0]/60">Category</label>
                              <select 
                                value={file.category}
                                onChange={(e) => setFilesList(prev => prev.map(f => f.id === file.id ? { ...f, category: e.target.value } : f))}
                                className="w-full bg-[#1D1B20] border border-[#48454E] rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                              >
                                <option value="Tech">Tech</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Music">Music</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Earning tips">Earning tips</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase font-mono text-[#CAC4D0]/60">Visibility</label>
                              <select 
                                value={file.visibility}
                                onChange={(e) => setFilesList(prev => prev.map(f => f.id === file.id ? { ...f, visibility: e.target.value as any } : f))}
                                className="w-full bg-[#1D1B20] border border-[#48454E] rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                              >
                                <option value="Public">Public</option>
                                <option value="Unlisted">Unlisted</option>
                                <option value="Private">Private</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase font-mono text-[#CAC4D0]/60">Monetization</label>
                              <select 
                                value={file.monetization}
                                onChange={(e) => setFilesList(prev => prev.map(f => f.id === file.id ? { ...f, monetization: e.target.value as any } : f))}
                                className="w-full bg-[#1D1B20] border border-[#48454E] rounded-xl px-2 py-2 text-xs text-white focus:outline-none"
                              >
                                <option value="Ad-supported">Ad-supported</option>
                                <option value="Pay-per-view">Pay-per-view</option>
                                <option value="Premium only">Premium only</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex justify-end gap-2 pt-2 border-t border-[#322F37]/30">
                            <button
                              type="button"
                              onClick={() => handleCopyDetailsToAll(file)}
                              className="px-4 py-1.5 rounded-lg border border-[#9D8CFF]/30 text-[#9D8CFF] text-[10px] font-semibold hover:bg-[#332B6B]/20"
                            >
                              ✓ Copy metadata to all other files
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single Upload Metadata form (Shows beneath single file queue) */}
          {activeTab === 'single' && filesList.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-[#322F37]/40">
              <h3 className="font-display font-bold text-xs text-[#CAC4D0] uppercase tracking-wider font-mono">Metadata Settings</h3>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs text-[#CAC4D0]">Video Title</label>
                  <input 
                    type="text" 
                    required
                    value={singleTitle}
                    onChange={(e) => setSingleTitle(e.target.value)}
                    placeholder="Minimalist tech haul..."
                    className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#9D8CFF]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs text-[#CAC4D0]">Description</label>
                  <textarea 
                    value={singleDesc}
                    onChange={(e) => setSingleDesc(e.target.value)}
                    rows={3}
                    placeholder="Describe your creative thoughts..."
                    className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#9D8CFF] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs text-[#CAC4D0]">Category</label>
                    <select 
                      value={singleCategory}
                      onChange={(e) => setSingleCategory(e.target.value)}
                      className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Tech">Tech</option>
                      <option value="Cooking">Cooking</option>
                      <option value="Music">Music</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Earning tips">Earning tips</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs text-[#CAC4D0]">Visibility</label>
                    <select 
                      value={singleVisibility}
                      onChange={(e) => setSingleVisibility(e.target.value as any)}
                      className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="Public">Public</option>
                      <option value="Unlisted">Unlisted</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="block text-xs text-[#CAC4D0] mb-1.5">Monetization Model</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Ad-supported', 'Pay-per-view', 'Premium only', 'Not monetized'] as const).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setSingleMonetization(mode)}
                        className={`py-2 rounded-xl text-[10px] font-semibold border text-center transition ${
                          singleMonetization === mode
                            ? 'bg-[#332B6B] border-transparent text-[#9D8CFF]'
                            : 'bg-[#211F26] border-[#322F37] text-[#CAC4D0]'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#322F37]/60 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#1D1B20]">
          <div className="flex items-center gap-2 text-xs text-[#00D9A3]">
            <span className="text-sm">🪙</span> 
            <span>Creators earn from first upload — no subscriber minimums!</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-[#48454E] text-[#CAC4D0] text-xs font-semibold hover:bg-[#211F26] transition"
            >
              Cancel
            </button>
            <button 
              id="publish-final-btn"
              type="button"
              disabled={!isUploadFinished}
              onClick={handlePublishClick}
              className="px-6 py-2.5 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-bold hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition uppercase tracking-wider"
            >
              {activeTab === 'bulk' ? `Publish ${filesList.length} Videos` : 'Publish Video'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { CHANNELS, INITIAL_VIDEOS, NOTIFICATIONS_LIST } from './mockData';
import { Video, Channel, Notification } from './types';

// Component Imports
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import AuthScreens from './components/AuthScreens';
import HomeFeed from './components/HomeFeed';
import WatchPage from './components/WatchPage';
import MyChannel from './components/MyChannel';
import EarningsPage from './components/EarningsPage';
import AnalyticsPage from './components/AnalyticsPage';
import PremiumPage from './components/PremiumPage';
import WatchlistPage from './components/WatchlistPage';
import StudioDashboard from './components/StudioDashboard';
import UploadModal from './components/UploadModal';

export default function App() {
  // Authentication & Navigation states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [currentTab, setCurrentTab] = useState('Home'); // Home, Studio, Channel, Earnings, Premium, Watchlist, Watch, Analytics

  // Core data states (backed by initial mock files to simulate CRUD locally)
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [channels, setChannels] = useState<Channel[]>(CHANNELS);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS_LIST);

  // Active workspace selections
  const [activeChannelId, setActiveChannelId] = useState('chan-tech');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [activeAnalyticsVideo, setActiveAnalyticsVideo] = useState<Video | null>(null);

  // User preferences & metrics
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [subscribedChannelIds, setSubscribedChannelIds] = useState<string[]>(['chan-cooking']);
  const [userCoinBalance, setUserCoinBalance] = useState(150);
  const [isPremium, setIsPremium] = useState(false);

  // Search & flyout controls
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper: display visual Toast notifications
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Get active channel info
  const activeChannel = useMemo(() => {
    return channels.find(c => c.id === activeChannelId) || channels[0];
  }, [channels, activeChannelId]);

  // Auth screen login/registration callback
  const handleAuthSuccess = (newChanData?: { name: string; handle: string }) => {
    setIsLoggedIn(true);
    setShowAuthScreen(false);
    setCurrentTab('Home');

    if (newChanData) {
      // Register custom new channel
      const newChan: Channel = {
        id: `chan-${Date.now()}`,
        name: newChanData.name,
        handle: newChanData.handle,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
        banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
        subscribers: 0,
        bio: `Official creator channel of ${newChanData.name}. Building awesome things on Reelio.`,
        earningsAvailable: 0,
        earningsThisMonth: 0,
        earningsLifetime: 0
      };
      setChannels([...channels, newChan]);
      setActiveChannelId(newChan.id);
      showToast(`Welcome! Channel ${newChanData.name} set up successfully!`);
    } else {
      showToast("Signed in successfully!");
    }
  };

  // Channel Profile CRUD handlers
  const handleUpdateChannel = (updated: Partial<Channel>) => {
    setChannels(prev => prev.map(c => c.id === activeChannelId ? { ...c, ...updated } : c));
    showToast("Channel profile saved successfully.");
  };

  const handleUpdateVideo = (updatedVideo: Video) => {
    setVideos(prev => prev.map(v => v.id === updatedVideo.id ? updatedVideo : v));
    showToast("Video metadata settings saved successfully.");
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId));
    // Clear dependencies
    if (activeVideo?.id === videoId) setActiveVideo(null);
    if (activeAnalyticsVideo?.id === videoId) setActiveAnalyticsVideo(null);
    showToast("Video deleted permanently.");
  };

  // Bulk / Single publish upload simulation
  const handlePublishVideos = (newVideos: Video[]) => {
    setVideos(prev => [...newVideos, ...prev]);
    setShowUploadModal(false);
    setCurrentTab('Home');
    showToast(`Successfully published ${newVideos.length} video(s)!`);

    // Log simulated notification inside creator's alerts
    const newAlert: Notification = {
      id: `alert-${Date.now()}`,
      text: `Your video content was published and is now live. Engagement protocols activated!`,
      type: "system",
      timestamp: "Just now",
      read: false
    };
    setNotifications([newAlert, ...notifications]);
  };

  // Switch channel workspace handler
  const handleSwitchChannel = (chanId: string) => {
    setActiveChannelId(chanId);
    const targetChan = channels.find(c => c.id === chanId);
    if (targetChan) {
      showToast(`Swapped workspace to ${targetChan.name}`);
    }
  };

  // Creating a channel on the fly in the dropdown switcher
  const handleSpawnChannel = (name: string, handle: string) => {
    const newChan: Channel = {
      id: `chan-${Date.now()}`,
      name,
      handle,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1490815685121-0b05e29a0ee9?w=1200&auto=format&fit=crop&q=80",
      subscribers: 0,
      bio: "A secondary workspace focused on specialized entertainment.",
      earningsAvailable: 0,
      earningsThisMonth: 0,
      earningsLifetime: 0
    };
    setChannels([...channels, newChan]);
    setActiveChannelId(newChan.id);
    showToast(`Spawned workspace ${name}!`);
  };

  // Video Watch preferences
  const handleSubscribeToggle = (chanId: string) => {
    if (subscribedChannelIds.includes(chanId)) {
      setSubscribedChannelIds(prev => prev.filter(id => id !== chanId));
      showToast("Unsubscribed from channel.");
    } else {
      setSubscribedChannelIds(prev => [...prev, chanId]);
      showToast("Subscribed to channel!");
    }
  };

  const handleWatchlistToggle = (vidId: string) => {
    if (watchlistIds.includes(vidId)) {
      setWatchlistIds(prev => prev.filter(id => id !== vidId));
      showToast("Removed from saved Watchlist.");
    } else {
      setWatchlistIds(prev => [...prev, vidId]);
      showToast("Saved to watchlist!");
    }
  };

  // Watch reward coin accumulation handler
  const handleEarnCoins = (amount: number) => {
    setUserCoinBalance(prev => prev + amount);
  };

  // Cashout / Redeem wire payouts
  const handleRedeemFunds = (amount: number) => {
    setChannels(prev => prev.map(c => {
      if (c.id === activeChannelId) {
        return {
          ...c,
          earningsAvailable: 0,
          earningsLifetime: c.earningsLifetime + amount
        };
      }
      return c;
    }));
  };

  // Log Out handler
  const handleLogOut = () => {
    setIsLoggedIn(false);
    setShowAuthScreen(false);
    setCurrentTab('Home');
    showToast("Logged out of Reelio successfully.");
  };

  // Handle category search top shortcuts
  const handleResetSearchAndHome = () => {
    setSearchQuery('');
    setCurrentTab('Home');
    setActiveVideo(null);
    setActiveAnalyticsVideo(null);
  };

  // Global top menu actions
  const handleOpenUpload = () => {
    if (!isLoggedIn) {
      setShowAuthScreen(true);
    } else {
      setShowUploadModal(true);
    }
  };

  const handleSelectVideo = (video: Video) => {
    setActiveVideo(video);
    setCurrentTab('Watch');
  };

  const handleSelectVideoAnalytics = (video: Video) => {
    setActiveAnalyticsVideo(video);
    setCurrentTab('Analytics');
  };

  // Route Views
  const renderTabContent = () => {
    if (currentTab === 'Watch' && activeVideo) {
      return (
        <WatchPage
          video={activeVideo}
          allVideos={videos}
          onSelectVideo={handleSelectVideo}
          onSubscribeToggle={handleSubscribeToggle}
          isSubscribed={subscribedChannelIds.includes(activeVideo.creatorId)}
          onAddToWatchlist={handleWatchlistToggle}
          isInWatchlist={watchlistIds.includes(activeVideo.id)}
          onEarnCoins={handleEarnCoins}
          showToast={showToast}
        />
      );
    }

    if (currentTab === 'Analytics' && activeAnalyticsVideo) {
      return (
        <AnalyticsPage
          video={activeAnalyticsVideo}
          onBackToChannel={() => setCurrentTab('Channel')}
        />
      );
    }

    switch (currentTab) {
      case 'Home':
        return (
          <HomeFeed
            videos={videos}
            onSelectVideo={handleSelectVideo}
            onOpenUpload={handleOpenUpload}
            userCoinBalance={userCoinBalance}
            currentChannelName={activeChannel.name}
            currentChannelAvatar={activeChannel.avatar}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case 'Studio':
        return (
          <StudioDashboard
            channel={activeChannel}
            videos={videos}
            onOpenUpload={handleOpenUpload}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onSelectVideoAnalytics={handleSelectVideoAnalytics}
          />
        );
      case 'Channel':
        return (
          <MyChannel
            channel={activeChannel}
            videos={videos}
            onUpdateChannel={handleUpdateChannel}
            onUpdateVideo={handleUpdateVideo}
            onDeleteVideo={handleDeleteVideo}
            onOpenUpload={handleOpenUpload}
            onSelectVideoAnalytics={handleSelectVideoAnalytics}
            onSelectVideo={handleSelectVideo}
          />
        );
      case 'Earnings':
        return (
          <EarningsPage
            channel={activeChannel}
            videos={videos}
            onRedeemFunds={handleRedeemFunds}
            showToast={showToast}
          />
        );
      case 'Premium':
        return (
          <PremiumPage
            subscribedChannelIds={subscribedChannelIds}
            onUnsubscribe={(id) => setSubscribedChannelIds(prev => prev.filter(item => item !== id))}
            isPremium={isPremium}
            onUpgradePremium={() => setIsPremium(true)}
            showToast={showToast}
          />
        );
      case 'Watchlist':
        return (
          <WatchlistPage
            videos={videos}
            watchlistIds={watchlistIds}
            onRemoveFromWatchlist={(id) => setWatchlistIds(prev => prev.filter(item => item !== id))}
            onSelectVideo={handleSelectVideo}
          />
        );
      default:
        return (
          <div className="p-12 text-center text-sm text-[#CAC4D0]">
            Tab content pending construction...
          </div>
        );
    }
  };

  // Rendering for logged-out view states
  if (!isLoggedIn) {
    if (showAuthScreen) {
      return <AuthScreens onSuccess={handleAuthSuccess} />;
    }
    return (
      <LandingPage
        onStartWatching={() => setIsLoggedIn(true)}
        onStartEarning={() => setShowAuthScreen(true)}
      />
    );
  }

  return (
    <div className="bg-[#121212] text-[#E6E1E5] min-h-screen font-sans flex flex-col md:flex-row relative">
      
      {/* Toast bubble popup alert */}
      {toastMessage && (
        <div 
          id="global-toast-message"
          className="fixed top-5 right-5 bg-[#1D1B20] border-2 border-[#00D9A3] text-white px-5 py-3 rounded-2xl shadow-2xl z-[100] max-w-sm flex items-center gap-2.5 animate-bounce"
        >
          <span className="text-[#00D9A3] text-base">🪙</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Left rail navigation (sidebar rail on desktop, bottom bar on mobile) */}
      <Navigation
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setActiveVideo(null);
          setActiveAnalyticsVideo(null);
        }}
        channelsList={channels}
        activeChannelId={activeChannelId}
        onSwitchChannel={handleSwitchChannel}
        onCreateChannel={handleSpawnChannel}
        userCoinBalance={userCoinBalance}
      />

      {/* Main Right panel workspace */}
      <div className="flex-grow flex flex-col min-w-0 md:pl-0 pb-16 md:pb-0">
        
        {/* Top bar search and account header */}
        <header className="flex justify-between items-center px-6 py-3.5 border-b border-[#322F37] bg-[#121212] sticky top-0 z-40 gap-4">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleResetSearchAndHome} id="brand-logo-topbar">
            <Logo size={28} />
            <span className="font-display font-bold text-lg text-white hidden sm:inline tracking-wide select-none">Reelio</span>
          </div>

          {/* Core search component */}
          <div className="flex-grow max-w-lg relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentTab !== 'Home') setCurrentTab('Home');
              }}
              placeholder="Search creators, videos, topics..."
              className="w-full bg-[#211F26] border border-[#322F37] rounded-full px-5 py-2 text-xs text-white placeholder-[#CAC4D0]/40 focus:outline-none focus:border-[#9D8CFF]"
            />
          </div>

          {/* Account indicators block */}
          <div className="flex items-center gap-3 flex-none">
            
            {/* Viewer premium tier shield */}
            {isPremium && (
              <span className="hidden sm:inline bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-bold px-2.5 py-1 rounded-full">
                👑 PREMIUM MEMBER
              </span>
            )}

            {/* Notification bell menu dropdown toggle */}
            <div className="relative">
              <button 
                id="notifications-bell-trigger"
                onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
                className="w-9 h-9 rounded-full bg-[#211F26] hover:bg-[#2B2930] flex items-center justify-center text-xs relative text-white border border-[#322F37]"
                aria-label="Notifications"
              >
                🔔
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#9D8CFF] rounded-full"></span>
              </button>

              {showNotificationsDropdown && (
                <div 
                  id="notifications-dropdown-menu"
                  className="absolute right-0 mt-3 w-80 bg-[#1D1B20] border border-[#48454E] rounded-2xl p-4 shadow-2xl z-50 space-y-3"
                >
                  <div className="flex justify-between items-center border-b border-[#322F37] pb-2">
                    <span className="text-xs font-bold text-white">Alerts Inbox</span>
                    <button 
                      onClick={() => {
                        setNotifications(notifications.map(n => ({ ...n, read: true })));
                        showToast("All notifications marked read.");
                      }}
                      className="text-[10px] text-[#9D8CFF] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl text-xs space-y-1 transition ${n.read ? 'opacity-60' : 'bg-[#211F26] border border-[#322F37]'}`}>
                        <div className="flex justify-between text-[9px] font-mono">
                          <span className="text-[#00D9A3] uppercase font-bold">{n.type}</span>
                          <span className="text-[#CAC4D0]/40">{n.timestamp}</span>
                        </div>
                        <p className="text-[#CAC4D0] leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Creator avatar signout link switcher */}
            <div className="flex items-center gap-2">
              <img 
                src={activeChannel.avatar} 
                alt="" 
                onClick={() => setCurrentTab('Channel')}
                className="w-8.5 h-8.5 rounded-full object-cover border border-[#48454E] cursor-pointer bg-[#2B2930]"
                referrerPolicy="no-referrer"
              />
              <button 
                id="topbar-signout-btn"
                onClick={handleLogOut}
                className="hidden sm:inline-block px-3 py-1.5 rounded-full border border-[#48454E] text-[10px] uppercase font-mono text-[#CAC4D0] hover:text-white"
              >
                Sign Out
              </button>
            </div>

          </div>
        </header>

        {/* Dynamic Route View Content block */}
        <main className="flex-grow">
          {renderTabContent()}
        </main>
      </div>

      {/* Global Upload modal overlay */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onPublish={handlePublishVideos}
          channelId={activeChannelId}
          channelName={activeChannel.name}
          channelAvatar={activeChannel.avatar}
        />
      )}

    </div>
  );
}

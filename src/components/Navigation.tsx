import React, { useState } from 'react';
import { Channel } from '../types';
import Logo from './Logo';

interface NavigationProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  channelsList: Channel[];
  activeChannelId: string;
  onSwitchChannel: (id: string) => void;
  onCreateChannel: (name: string, handle: string) => void;
  userCoinBalance: number;
}

export default function Navigation({
  currentTab,
  onNavigate,
  channelsList,
  activeChannelId,
  onSwitchChannel,
  onCreateChannel,
  userCoinBalance
}: NavigationProps) {
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [isCreatingChan, setIsCreatingChan] = useState(false);
  const [newChanName, setNewChanName] = useState('');
  const [newChanHandle, setNewChanHandle] = useState('');

  const activeChannel = channelsList.find(c => c.id === activeChannelId) || channelsList[0];

  const handleCreateChanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChanName.trim() || !newChanHandle.trim()) return;

    onCreateChannel(newChanName, newChanHandle);
    setIsCreatingChan(false);
    setNewChanName('');
    setNewChanHandle('');
    setShowChannelDropdown(false);
  };

  const navItems = [
    { id: 'Home', label: 'Home Feed', icon: '🏠' },
    { id: 'Studio', label: 'Studio Workspace', icon: '🏢' },
    { id: 'Channel', label: 'My Public Channel', icon: '📹' },
    { id: 'Earnings', label: 'Earnings Hub', icon: '🪙' },
    { id: 'Premium', label: 'Premium & Subscriptions', icon: '⭐' },
    { id: 'Watchlist', label: 'Saved Watchlist', icon: '📁' },
  ];

  return (
    <>
      {/* Desktop Left Rail Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-[#121212] border-r border-[#322F37] min-h-screen p-4 justify-between sticky top-0 h-screen" id="desktop-nav-rail">
        <div className="space-y-6">
          {/* Brand header */}
          <div className="flex items-center gap-3 px-3 py-2">
            <Logo size={32} />
            <span className="font-display font-bold text-lg text-white">Reelio</span>
          </div>

          {/* Nav Items stack */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-desktop-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-full text-xs font-medium tracking-wide transition-colors text-left ${
                    isActive
                      ? 'bg-[#332B6B] text-[#9D8CFF]'
                      : 'text-[#CAC4D0] hover:bg-[#1D1B20] hover:text-white'
                  }`}
                >
                  <span className="text-base flex-none">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User wallet balance, channel switcher & details at the bottom of the Left Rail */}
        <div className="space-y-4 pt-4 border-t border-[#322F37]/80 relative">
          
          {/* Real-time viewer token balance (Teal - Earnings) */}
          <div className="bg-[#211F26] border border-[#00D9A3]/30 rounded-2xl p-3 flex justify-between items-center">
            <div className="space-y-0.5">
              <p className="text-[9px] uppercase font-mono tracking-wider text-[#CAC4D0]/50">Wallet Balance</p>
              <p className="text-sm font-mono font-bold text-[#00D9A3]">{userCoinBalance.toLocaleString()} Coins</p>
            </div>
            <span className="text-base">🪙</span>
          </div>

          {/* Active channel summary with Switcher trigger */}
          <div className="relative">
            <div 
              id="channel-switcher-trigger"
              onClick={() => setShowChannelDropdown(!showChannelDropdown)}
              className="flex items-center justify-between p-2 rounded-2xl bg-[#1D1B20] border border-[#322F37] cursor-pointer hover:border-[#48454E] transition"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src={activeChannel.avatar} 
                  alt="" 
                  className="w-8 h-8 rounded-full object-cover bg-[#2B2930] flex-none"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{activeChannel.name}</p>
                  <p className="text-[9px] text-[#CAC4D0]/50 font-mono truncate">{activeChannel.handle}</p>
                </div>
              </div>
              <span className="text-xs text-[#CAC4D0] pr-1">▲</span>
            </div>

            {/* Dropdown switch menu */}
            {showChannelDropdown && (
              <div className="absolute bottom-14 left-0 right-0 bg-[#211F26] border border-[#48454E] rounded-2xl shadow-2xl p-2 z-50 space-y-2" id="channel-switcher-dropdown">
                <p className="text-[9px] uppercase font-mono text-[#CAC4D0]/40 px-2 py-1">My Channels</p>
                
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {channelsList.map(chan => (
                    <div
                      key={chan.id}
                      id={`channel-option-${chan.id}`}
                      onClick={() => {
                        onSwitchChannel(chan.id);
                        setShowChannelDropdown(false);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition ${
                        chan.id === activeChannelId ? 'bg-[#332B6B]/40' : 'hover:bg-[#1D1B20]'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={chan.avatar} alt="" className="w-6.5 h-6.5 rounded-full object-cover" referrerPolicy="no-referrer" />
                        <span className="text-xs text-white truncate font-medium">{chan.name}</span>
                      </div>
                      {chan.id === activeChannelId && <span className="text-xs text-[#9D8CFF]">✓</span>}
                    </div>
                  ))}
                </div>

                <button
                  id="create-new-channel-trigger"
                  onClick={() => setIsCreatingChan(true)}
                  className="w-full text-center py-2 border-t border-[#322F37]/60 text-[#9D8CFF] hover:underline text-xs font-medium mt-2"
                >
                  + Create a new channel
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Visible only on small viewports) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-[#1D1B20] border-t border-[#322F37] py-2 px-4 flex justify-between items-center z-40 shadow-xl" id="mobile-bottom-nav">
        {navItems.slice(0, 5).map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-1 flex-1 py-1 text-center"
            >
              <span className="text-lg">{item.icon}</span>
              <span className={`text-[9px] font-medium tracking-tight ${
                isActive ? 'text-[#9D8CFF]' : 'text-[#CAC4D0]/60'
              }`}>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Spawn New Channel Modal */}
      {isCreatingChan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#1D1B20] border border-[#322F37] rounded-3xl p-6 w-full max-w-sm space-y-4">
            <h3 className="font-display font-bold text-base text-white">Create a New Channel</h3>
            <p className="text-xs text-[#CAC4D0]/60">Manage multiple distinct video workspaces under a single user login.</p>
            
            <form onSubmit={handleCreateChanSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Channel Name</label>
                <input 
                  type="text" 
                  required
                  value={newChanName}
                  onChange={(e) => setNewChanName(e.target.value)}
                  placeholder="e.g. Cooking Chronicles"
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs text-[#CAC4D0]">Custom Handle</label>
                <input 
                  type="text" 
                  required
                  value={newChanHandle}
                  onChange={(e) => setNewChanHandle(e.target.value)}
                  placeholder="@cookingchronicles"
                  className="w-full bg-[#211F26] border border-[#48454E] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsCreatingChan(false)}
                  className="px-4 py-2 rounded-full border border-[#48454E] text-xs text-[#CAC4D0]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-full bg-[#9D8CFF] text-[#1B0064] text-xs font-bold"
                >
                  Create Channel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

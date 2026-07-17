import { motion } from 'motion/react';
import { INITIAL_VIDEOS } from '../mockData';
import { Video } from '../types';
import Logo from './Logo';

interface LandingPageProps {
  onStartWatching: () => void;
  onStartEarning: () => void;
}

export default function LandingPage({ onStartWatching, onStartEarning }: LandingPageProps) {
  const trendingVideos = INITIAL_VIDEOS.slice(0, 6);

  return (
    <div className="bg-[#121212] text-[#E6E1E5] min-h-screen font-sans flex flex-col" id="landing-page">
      {/* Top Bar Logged-Out */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#322F37] bg-[#121212] sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="font-display font-bold text-xl tracking-wide text-white">Reelio</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            id="landing-signin-btn"
            onClick={onStartEarning} 
            className="px-5 py-2 rounded-full border border-[#48454E] hover:bg-[#1D1B20] text-sm font-medium transition"
          >
            Sign In
          </button>
          <button 
            id="landing-register-btn"
            onClick={onStartEarning} 
            className="px-5 py-2 rounded-full bg-[#9D8CFF] text-[#1B0064] font-medium hover:opacity-90 text-sm transition"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-4xl mx-auto text-center flex-grow flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-white mb-6 leading-none">
            Create. Watch.<br/>Engage. <span className="text-[#00D9A3]">Earn.</span>
          </h1>
          <p className="text-[#CAC4D0] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            The first video sharing platform where creators monetize from day one, and viewers earn real rewards for their genuine engaged watch time. No gates, just genuine entertainment.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button 
            id="hero-watch-btn"
            onClick={onStartWatching} 
            className="px-8 py-3.5 rounded-full bg-[#9D8CFF] text-[#1B0064] font-medium text-base hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            Start Watching
          </button>
          <button 
            id="hero-earn-btn"
            onClick={onStartEarning} 
            className="px-8 py-3.5 rounded-full border border-[#48454E] hover:bg-[#1D1B20] text-white font-medium text-base transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Start Earning as a Creator
          </button>
        </motion.div>
      </section>

      {/* Feature Blocks */}
      <section className="px-6 py-16 bg-[#1D1B20] border-t border-b border-[#322F37]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white text-center mb-12">
            A Better Model for the Creator Economy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#211F26] border border-[#322F37] rounded-3xl p-6 flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300">
              <div className="rounded-2xl overflow-hidden h-44 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=500&auto=format&fit=crop&q=80" 
                  alt="Microphone and studio setup representing day-one creator monetization"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">Monetize from day one</h3>
              <p className="text-[#CAC4D0] text-sm leading-relaxed flex-grow">
                No subscriber count checkpoints or strict watch hour lockouts. From your very first publish, our direct engagement protocol secures your fair revenue cut instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#211F26] border border-[#322F37] rounded-3xl p-6 flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300">
              <div className="rounded-2xl overflow-hidden h-44 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&auto=format&fit=crop&q=80" 
                  alt="Smartphone screen showing interactive analytics rewards"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">Mindful viewing rewards</h3>
              <p className="text-[#CAC4D0] text-sm leading-relaxed flex-grow">
                Attention is valuable. Earn Reelio Coins as you watch video units of at least 30 seconds. Convert coins into premium upgrades or support your favorite creators.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#211F26] border border-[#322F37] rounded-3xl p-6 flex flex-col h-full transform hover:scale-[1.02] transition-transform duration-300">
              <div className="rounded-2xl overflow-hidden h-44 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80" 
                  alt="Online marketplace commerce representation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">Shop directly in videos</h3>
              <p className="text-[#CAC4D0] text-sm leading-relaxed flex-grow">
                Tightly integrated, non-intrusive interactive product shelves. Purchase gear used by tech channels or culinary ingredients straight from the video screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Content strip */}
      <section className="px-6 py-16 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display font-bold text-2xl text-white">Trending on Reelio</h2>
          <button 
            onClick={onStartWatching} 
            className="text-[#9D8CFF] hover:underline text-sm font-medium flex items-center gap-1"
          >
            See all feeds &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trendingVideos.map((video: Video) => (
            <div 
              key={video.id} 
              onClick={onStartWatching}
              className="bg-[#1D1B20] border border-[#322F37] rounded-2xl overflow-hidden group cursor-pointer hover:border-[#48454E] transition"
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
              <div className="p-4">
                <h3 className="font-sans font-medium text-[#E6E1E5] text-sm line-clamp-2 leading-snug mb-2 group-hover:text-[#9D8CFF] transition">
                  {video.title}
                </h3>
                <div className="flex items-center gap-2 mt-3">
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#322F37] bg-[#121212] py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#9D8CFF]"></div>
            <span className="font-display font-bold text-white tracking-wide">Reelio</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#CAC4D0]">
            <a href="#" className="hover:text-[#9D8CFF] transition">About Us</a>
            <a href="#" className="hover:text-[#9D8CFF] transition">Creator Guide</a>
            <a href="#" className="hover:text-[#9D8CFF] transition">FAQs</a>
            <a href="#" className="hover:text-[#9D8CFF] transition">Community Guidelines</a>
            <a href="#" className="hover:text-[#9D8CFF] transition">Terms & Privacy</a>
          </div>
          <p className="text-[11px] text-[#CAC4D0]/50 font-mono">
            &copy; 2026 Reelio Inc. Built on engagement protocol.
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Video, Channel, Notification, EarningSource, EarningHistory } from './types';

// Real-looking Unsplash placeholders
export const IMAGES = {
  avatars: {
    marcus: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    elena: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    devon: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    clara: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
    alex: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  thumbnails: {
    tech: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&auto=format&fit=crop&q=80",
    cooking: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80",
    music: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    gaming: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
    earning: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
    travel: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
  },
  banners: {
    tech: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    cooking: "https://images.unsplash.com/photo-1490815685121-0b05e29a0ee9?w=1200&auto=format&fit=crop&q=80",
  }
};

export const CHANNELS: Channel[] = [
  {
    id: "chan-tech",
    name: "TechByte",
    handle: "@techbyte",
    avatar: IMAGES.avatars.marcus,
    banner: IMAGES.banners.tech,
    subscribers: 24500,
    bio: "Unboxing tomorrow's hardware, today. Focused on elegant gadget engineering, productivity desk setups, and clean code lifestyles.",
    earningsAvailable: 420.50,
    earningsThisMonth: 1240.00,
    earningsLifetime: 14850.00
  },
  {
    id: "chan-cooking",
    name: "Elena's Kitchen",
    handle: "@elenakitchen",
    avatar: IMAGES.avatars.elena,
    banner: IMAGES.banners.cooking,
    subscribers: 18900,
    bio: "Simple culinary art for the everyday epicurean. Exploring modern gastronomy and quick mindful meals with premium local ingredients.",
    earningsAvailable: 154.20,
    earningsThisMonth: 680.00,
    earningsLifetime: 5210.00
  },
  {
    id: "chan-synth",
    name: "Waveform Synth",
    handle: "@waveform",
    avatar: IMAGES.avatars.devon,
    banner: IMAGES.banners.tech,
    subscribers: 8120,
    bio: "Deep synth walkthroughs, modular patching tips, and electronic beat production secrets. From ambient to high-tempo techno loops.",
    earningsAvailable: 89.10,
    earningsThisMonth: 340.00,
    earningsLifetime: 2890.00
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: "vid-1",
    title: "Building my dream minimalist desk setup: Ultimate Productivity Edition",
    description: "A complete step-by-step breakdown of my custom walnut desk, monitor mounting system, wireless peripherals, and smart ambient lighting. Designed for maximum focus, minimal wire clutter, and sleek ergonomics.",
    duration: "12:04",
    views: 48500,
    earnings: 342.20,
    category: "Tech",
    visibility: "Public",
    monetization: "Ad-supported",
    thumbnail: IMAGES.thumbnails.tech,
    videoUrl: "", // Handled in player
    creatorId: "chan-tech",
    creatorName: "TechByte",
    creatorAvatar: IMAGES.avatars.marcus,
    uploadDate: "2 days ago",
    likes: 3120,
    dislikes: 12,
    commentsCount: 142,
    watchUnits: 22800,
    engagementRate: 8.4,
    comments: [
      {
        id: "c1",
        authorName: "Sarah Jenkins",
        authorAvatar: IMAGES.avatars.clara,
        text: "That desk shelf is absolute perfection! What wood species did you use? Walnut or stained oak?",
        timestamp: "Yesterday",
        likes: 34,
        replies: [
          {
            id: "c1r1",
            authorName: "TechByte",
            authorAvatar: IMAGES.avatars.marcus,
            text: "It is solid American Walnut! Sourced it locally and applied a matte polyurethane finish.",
            timestamp: "18h ago",
            likes: 12
          }
        ]
      },
      {
        id: "c2",
        authorName: "Alex Rivera",
        authorAvatar: IMAGES.avatars.alex,
        text: "Incredible attention to detail with the cable routing under the table. Very satisfying to watch.",
        timestamp: "2 days ago",
        likes: 15
      }
    ]
  },
  {
    id: "vid-2",
    title: "5 crucial knife skills every passionate home cook needs to master",
    description: "Stop hacking your vegetables and start chopping like a culinary pro. In this video, I explain correct finger placement, the roll chop, julienning, and how to safely maintain a razor-sharp edge on your chef's knife.",
    duration: "08:41",
    views: 112400,
    earnings: 798.50,
    category: "Cooking",
    visibility: "Public",
    monetization: "Ad-supported",
    thumbnail: IMAGES.thumbnails.cooking,
    videoUrl: "",
    creatorId: "chan-cooking",
    creatorName: "Elena's Kitchen",
    creatorAvatar: IMAGES.avatars.elena,
    uploadDate: "5 days ago",
    likes: 9540,
    dislikes: 24,
    commentsCount: 318,
    watchUnits: 65100,
    engagementRate: 9.1,
    comments: [
      {
        id: "c3",
        authorName: "David Cole",
        authorAvatar: IMAGES.avatars.devon,
        text: "The claw grip illustration saved my fingernails! Awesome tutorial.",
        timestamp: "4 days ago",
        likes: 82
      }
    ]
  },
  {
    id: "vid-3",
    title: "Vaporwave synth production walkthrough: Patching retro fat baselines",
    description: "Let us dive deep into the Juno-106 emulation, mapping LFOs to high-pass filters, layering sub-bass, and injecting nostalgic analog warmth using tape saturation plugins. Pure nostalgia guaranteed.",
    duration: "15:32",
    views: 9300,
    earnings: 64.10,
    category: "Music",
    visibility: "Public",
    monetization: "Ad-supported",
    thumbnail: IMAGES.thumbnails.music,
    videoUrl: "",
    creatorId: "chan-synth",
    creatorName: "Waveform Synth",
    creatorAvatar: IMAGES.avatars.devon,
    uploadDate: "1 week ago",
    likes: 642,
    dislikes: 3,
    commentsCount: 45,
    watchUnits: 4800,
    engagementRate: 11.2,
    comments: []
  },
  {
    id: "vid-4",
    title: "Earning $100/day on Reelio: Direct engagement model guide",
    description: "Forget high subscriber counts and opaque watch hour minimums. Today we break down Reelio's engagement revenue model. Learn how watchers get incentivized watch-time, how creators monetize immediately, and optimization tips.",
    duration: "06:12",
    views: 33400,
    earnings: 298.00,
    category: "Earning tips",
    visibility: "Public",
    monetization: "Premium only",
    thumbnail: IMAGES.thumbnails.earning,
    videoUrl: "",
    creatorId: "chan-tech",
    creatorName: "TechByte",
    creatorAvatar: IMAGES.avatars.marcus,
    uploadDate: "3 days ago",
    likes: 1890,
    dislikes: 7,
    commentsCount: 92,
    watchUnits: 15400,
    engagementRate: 7.2,
    comments: []
  },
  {
    id: "vid-5",
    title: "High-tempo cyberpunk gaming soundtracks to code and focus to",
    description: "An immersive audio and ambient video compilation for programmers, designers, and focus-seekers. Powered by analog synths, darkwave rhythms, and deep space frequencies.",
    duration: "21:15",
    views: 18400,
    earnings: 128.50,
    category: "Music",
    visibility: "Public",
    monetization: "Pay-per-view",
    thumbnail: IMAGES.thumbnails.gaming,
    videoUrl: "",
    creatorId: "chan-synth",
    creatorName: "Waveform Synth",
    creatorAvatar: IMAGES.avatars.devon,
    uploadDate: "3 days ago",
    likes: 1205,
    dislikes: 5,
    commentsCount: 56,
    watchUnits: 9800,
    engagementRate: 12.0,
    comments: []
  },
  {
    id: "vid-6",
    title: "Exploring forgotten canyon trails: Minimalist solo backpacking trip",
    description: "Walking 40 miles through stunning red canyons with a sub-10lb ultralight pack. Immersive audio, sweeping wilderness shots, and a deeply mindful escape from digital noise.",
    duration: "18:40",
    views: 22000,
    earnings: 168.00,
    category: "Gaming", // Used as travel placeholder for sorting
    visibility: "Public",
    monetization: "Ad-supported",
    thumbnail: IMAGES.thumbnails.travel,
    videoUrl: "",
    creatorId: "chan-cooking",
    creatorName: "Elena's Kitchen",
    creatorAvatar: IMAGES.avatars.elena,
    uploadDate: "2 weeks ago",
    likes: 1540,
    dislikes: 4,
    commentsCount: 78,
    watchUnits: 11200,
    engagementRate: 10.4,
    comments: []
  }
];

export const INTERESTS_LIST = [
  "Technology", "Cooking & Food", "Music Production", "Indie Gaming", "Financial Freedom", 
  "Cyberpunk Beat", "Solo Travel", "Ergonomic Setups", "Digital Art", "Cinematography", 
  "Self Mastery", "Modular Synths", "Healthy Recipes", "Baking", "Smart Home Tech"
];

export const LANGUAGES_LIST = ["English", "Spanish", "German", "Japanese", "French", "Portuguese", "Mandarin"];

export const NOTIFICATIONS_LIST: Notification[] = [
  {
    id: "notif-1",
    text: "Monthly payout of $1,240.00 was successfully processed to your bank account ending in *4890.",
    type: "payout",
    timestamp: "2 hours ago",
    read: false
  },
  {
    id: "notif-2",
    text: "Elena's Kitchen replied to your comment on '5 knife skills every home cook needs to master'.",
    type: "comment",
    timestamp: "18 hours ago",
    read: false
  },
  {
    id: "notif-3",
    text: "Your video 'Vaporwave synth production' unlocked a new monetization tier based on outstanding viewing retention!",
    type: "monetization",
    timestamp: "1 day ago",
    read: true
  },
  {
    id: "notif-4",
    text: "Creator Revenue Assurance Status: Protected. All active video claims cleared.",
    type: "system",
    timestamp: "3 days ago",
    read: true
  }
];

export const EARNING_SOURCES: EarningSource[] = [
  { source: "Ad revenue", amount: 620.50 },
  { source: "Pay-per-view", amount: 310.20 },
  { source: "Memberships/tips", amount: 180.30 },
  { source: "Live gifting", amount: 129.00 }
];

export const EARNING_HISTORY_DATA: EarningHistory[] = [
  { date: "May 1", amount: 42 },
  { date: "May 5", amount: 55 },
  { date: "May 10", amount: 68 },
  { date: "May 15", amount: 92 },
  { date: "May 20", amount: 120 },
  { date: "May 25", amount: 145 },
  { date: "May 30", amount: 198 },
  { date: "Jun 5", amount: 240 },
  { date: "Jun 10", amount: 290 },
  { date: "Jun 15", amount: 350 },
  { date: "Jun 20", amount: 480 },
  { date: "Jun 25", amount: 620 },
  { date: "Jun 30", amount: 780 },
  { date: "Jul 5", amount: 910 },
  { date: "Jul 10", amount: 1080 },
  { date: "Jul 15", amount: 1240 }
];

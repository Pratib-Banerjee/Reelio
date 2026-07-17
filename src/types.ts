export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  earnings: number; // in USD
  category: string;
  visibility: 'Public' | 'Unlisted' | 'Private' | 'Scheduled';
  monetization: 'Ad-supported' | 'Pay-per-view' | 'Premium only' | 'Not monetized';
  thumbnail: string;
  videoUrl: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  uploadDate: string;
  likes: number;
  dislikes: number;
  commentsCount: number;
  comments: Comment[];
  watchUnits?: number; // 30-sec monetized watch units
  engagementRate?: number; // percentage
}

export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  subscribers: number;
  bio: string;
  earningsAvailable: number;
  earningsThisMonth: number;
  earningsLifetime: number;
}

export interface Notification {
  id: string;
  text: string;
  type: 'monetization' | 'comment' | 'payout' | 'system';
  timestamp: string;
  read: boolean;
}

export interface EarningSource {
  source: string;
  amount: number;
}

export interface EarningHistory {
  date: string;
  amount: number;
}

export interface UserState {
  isLoggedIn: boolean;
  activeChannelId: string;
  watchlistVideoIds: string[];
  subscribedChannelIds: string[];
  isPremium: boolean;
  coinBalance: number; // Viewer coin balance
}

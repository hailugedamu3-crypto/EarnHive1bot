import { Task, LeaderboardItem, CampaignAnnouncement, SystemConfig } from '../types';

export const INITIAL_CONFIG: SystemConfig = {
  minWithdraw: 100.00,
  maxWithdraw: 10000.00,
  refReward: 5.00,
  maintenanceMode: false,
  supportUsername: 'EarnHiveSupport',
  botUsername: 'EarnHive1bot',
  commissionRates: {
    tier1: 5,
    tier2: 2,
    tier3: 1,
  },
};

export const INITIAL_ANNOUNCEMENT: CampaignAnnouncement = {
  title: 'EarnHive v1.0 Launch Promo!',
  description: 'Get an extra 5% multi-level referral commission on all tasks completed by your Tier 1 invites this week!',
  badge: 'Campaign',
  active: true,
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 'T101',
    title: '📢 Join Official Telegram Channel',
    description: 'Subscribe to our main updates channel for daily bonus codes.',
    reward: 10.00,
    type: 'Channel',
    url: 'https://t.me/EarnHive1bot',
    completed: false,
    verifying: false,
  },
  {
    id: 'T102',
    title: '👥 Join EarnHive VIP Community Group',
    description: 'Connect with fellow earners and share daily tips.',
    reward: 15.00,
    type: 'Channel',
    url: 'https://t.me/EarnHive1bot',
    completed: false,
    verifying: false,
  },
  {
    id: 'T103',
    title: '⭐ Follow Official X (Twitter) Account',
    description: 'Retweet the pinned announcement post.',
    reward: 20.00,
    type: 'Social',
    url: 'https://twitter.com',
    completed: false,
    verifying: false,
  },
  {
    id: 'T104',
    title: '🌐 Register on Web Dashboard',
    description: 'Create an account on the web partner platform.',
    reward: 30.00,
    type: 'Special',
    url: 'https://earnhive.com',
    completed: false,
    verifying: false,
  },
  {
    id: 'T105',
    title: '🤖 Start Partner Airdrop Bot',
    description: 'Interact with our partner bot to unlock bonus rewards.',
    reward: 12.50,
    type: 'Bot',
    url: 'https://t.me/EarnHive1bot',
    completed: false,
    verifying: false,
  },
  {
    id: 'T106',
    title: '📺 Subscribe to YouTube Channel',
    description: 'Watch the latest tutorial video and like it.',
    reward: 25.00,
    type: 'Social',
    url: 'https://youtube.com',
    completed: false,
    verifying: false,
  },
];

export const DAILY_STREAK_REWARDS = [
  { day: 1, reward: 1.00 },
  { day: 2, reward: 2.00 },
  { day: 3, reward: 3.00 },
  { day: 4, reward: 5.00 },
  { day: 5, reward: 7.00 },
  { day: 6, reward: 10.00 },
  { day: 7, reward: 20.00 },
];

export const INITIAL_LEADERBOARDS: Record<'today' | 'weekly' | 'monthly', LeaderboardItem[]> = {
  today: [
    { rank: 1, name: 'Tarekegn_A', avatar: 'T', referrals: 84, earned: 1240.00 },
    { rank: 2, name: 'Saba_Y', avatar: 'S', referrals: 62, earned: 890.00 },
    { rank: 3, name: 'Mekonnen_D', avatar: 'M', referrals: 41, earned: 540.00 },
    { rank: 4, name: 'Abebe_B', avatar: 'A', referrals: 35, earned: 420.00 },
    { rank: 5, name: 'Bethlehem_K', avatar: 'B', referrals: 29, earned: 380.00 },
  ],
  weekly: [
    { rank: 1, name: 'Abera_K', avatar: 'A', referrals: 450, earned: 14230.00 },
    { rank: 2, name: 'Tigist_M', avatar: 'T', referrals: 310, earned: 9810.00 },
    { rank: 3, name: 'Yohannes_H', avatar: 'Y', referrals: 240, earned: 7420.00 },
    { rank: 4, name: 'Genet_W', avatar: 'G', referrals: 195, earned: 5600.00 },
    { rank: 5, name: 'Kassahun_T', avatar: 'K', referrals: 160, earned: 4800.00 },
  ],
  monthly: [
    { rank: 1, name: 'Rediet_T', avatar: 'R', referrals: 1540, earned: 42100.00 },
    { rank: 2, name: 'Dawit_G', avatar: 'D', referrals: 1210, earned: 32400.00 },
    { rank: 3, name: 'Hana_S', avatar: 'H', referrals: 980, earned: 21900.00 },
    { rank: 4, name: 'Elias_M', avatar: 'E', referrals: 820, earned: 18500.00 },
    { rank: 5, name: 'Selamawit_B', avatar: 'S', referrals: 710, earned: 15200.00 },
  ],
};

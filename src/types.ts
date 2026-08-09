export interface TelegramUser {
  id: number | string;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  username?: string;
  avatar: string;
  level: string;
  levelProgress: number;
  levelTarget: number;
  streak: number;
  streakClaimedToday: boolean;
  joinDate: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  reward: number;
  type: 'Channel' | 'Social' | 'Special' | 'Bot';
  url: string;
  completed: boolean;
  verifying: boolean;
  verifyTimeRemaining?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'Task Reward' | 'Referral Reward' | 'Daily Reward' | 'Withdrawal' | 'Admin Adjustment';
  status: 'Completed' | 'Pending' | 'Rejected';
  description: string;
  date: string;
  paymentMethod?: string;
  accountAddress?: string;
}

export interface LeaderboardItem {
  rank: number;
  name: string;
  avatar: string;
  referrals: number;
  earned: number;
  isUser?: boolean;
}

export interface CampaignAnnouncement {
  title: string;
  description: string;
  badge: string;
  active: boolean;
}

export interface WithdrawalRequest {
  id: string;
  fullName: string;
  method: 'Telebirr' | 'CBE Birr' | 'Bank Transfer' | 'Chapa' | 'Airtime';
  accountAddress: string;
  amount: number;
  status: 'Pending' | 'Completed' | 'Rejected';
  date: string;
}

export interface CommissionRates {
  tier1: number; // e.g. 5%
  tier2: number; // e.g. 2%
  tier3: number; // e.g. 1%
}

export interface SystemConfig {
  minWithdraw: number;
  maxWithdraw: number;
  refReward: number;
  maintenanceMode: boolean;
  supportUsername: string;
  botUsername: string;
  commissionRates: CommissionRates;
}

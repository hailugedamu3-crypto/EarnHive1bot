import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  Task,
  Transaction,
  SystemConfig,
  CampaignAnnouncement,
  WithdrawalRequest,
} from '../types';
import {
  INITIAL_CONFIG,
  INITIAL_ANNOUNCEMENT,
  INITIAL_TASKS,
} from '../data/initialData';

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        };
        openTelegramLink: (url: string) => void;
        openLink: (url: string) => void;
        sendData: (data: string) => void;
        close: () => void;
        ready: () => void;
        expand: () => void;
      };
    };
  }
}

interface AppContextType {
  user: UserProfile;
  balance: number;
  tasks: Task[];
  transactions: Transaction[];
  config: SystemConfig;
  announcement: CampaignAnnouncement;
  withdrawals: WithdrawalRequest[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toast: { message: string; type: 'success' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'error') => void;
  triggerHaptic: (type: 'light' | 'medium' | 'success' | 'error') => void;
  claimDailyReward: () => void;
  verifyTask: (taskId: string) => void;
  submitWithdrawal: (
    fullName: string,
    method: 'Telebirr' | 'CBE Birr' | 'Bank Transfer' | 'Chapa' | 'Airtime',
    accountAddress: string,
    amount: number
  ) => boolean;
  copyInviteLink: () => void;
  shareOnTelegram: () => void;
  toggleMaintenanceMode: () => void;
  adjustUserBalance: (targetId: string, amount: number) => void;
  addNewTask: (newTask: Omit<Task, 'id' | 'completed' | 'verifying'>) => void;
  updateAnnouncement: (ann: CampaignAnnouncement) => void;
  triggerConfetti: () => void;
  totalEarned: number;
  referralsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading from localStorage or fallback
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('earnhive_balance');
    return saved !== null ? parseFloat(saved) : 25.00; // Starter bonus
  });

  const [referralsCount, setReferralsCount] = useState<number>(() => {
    const saved = localStorage.getItem('earnhive_referrals');
    return saved !== null ? parseInt(saved, 10) : 3;
  });

  const [totalEarned, setTotalEarned] = useState<number>(() => {
    const saved = localStorage.getItem('earnhive_total_earned');
    return saved !== null ? parseFloat(saved) : 25.00;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const tgId = tgUser?.id ? String(tgUser.id) : '7989361951';
    const tgName = tgUser?.first_name
      ? `${tgUser.first_name} ${tgUser.last_name || ''}`.trim()
      : 'Ermias T.';
    const initialAvatar = tgName.charAt(0).toUpperCase() || 'E';

    return {
      id: tgId,
      name: tgName,
      username: tgUser?.username || 'Ermias_Dev',
      avatar: initialAvatar,
      level: 'Starter 🔥',
      levelProgress: 25,
      levelTarget: 100,
      streak: 1,
      streakClaimedToday: false,
      joinDate: 'August 9, 2026',
      isVerified: true,
      isAdmin: true, // Allow admin panel access for demonstration & controls
    };
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('earnhive_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('earnhive_txs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'EH-TXN-882194',
        amount: 25.00,
        type: 'Daily Reward',
        status: 'Completed',
        description: 'Welcome Bonus & Streak Day 1',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
    ];
  });

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>(() => {
    const saved = localStorage.getItem('earnhive_withdrawals');
    return saved ? JSON.parse(saved) : [];
  });

  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('earnhive_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [announcement, setAnnouncement] = useState<CampaignAnnouncement>(() => {
    const saved = localStorage.getItem('earnhive_announcement');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('earnhive_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('earnhive_referrals', referralsCount.toString());
  }, [referralsCount]);

  useEffect(() => {
    localStorage.setItem('earnhive_total_earned', totalEarned.toString());
  }, [totalEarned]);

  useEffect(() => {
    localStorage.setItem('earnhive_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('earnhive_txs', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('earnhive_withdrawals', JSON.stringify(withdrawals));
  }, [withdrawals]);

  useEffect(() => {
    localStorage.setItem('earnhive_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('earnhive_announcement', JSON.stringify(announcement));
  }, [announcement]);

  // Ready Telegram WebApp SDK if available
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  // Recalculate level badge based on balance & referrals
  useEffect(() => {
    let levelStr = 'Beginner 🌱';
    let target = 100;

    if (referralsCount >= 50 || balance >= 2000) {
      levelStr = 'Elite 👑';
      target = 10000;
    } else if (referralsCount >= 20 || balance >= 1000) {
      levelStr = 'Pro 💎';
      target = 5000;
    } else if (referralsCount >= 5 || balance >= 300) {
      levelStr = 'Active ⚡';
      target = 2000;
    } else if (referralsCount >= 1 || balance >= 50) {
      levelStr = 'Starter 🔥';
      target = 500;
    }

    setUser((prev) => ({
      ...prev,
      level: levelStr,
      levelTarget: target,
      levelProgress: Math.min(100, Math.floor((balance / target) * 100)),
    }));
  }, [balance, referralsCount]);

  const triggerHaptic = (type: 'light' | 'medium' | 'success' | 'error') => {
    try {
      const haptic = window.Telegram?.WebApp?.HapticFeedback;
      if (haptic) {
        if (type === 'light' || type === 'medium') {
          haptic.impactOccurred(type);
        } else {
          haptic.notificationOccurred(type);
        }
      }
    } catch {
      // Ignore if not in Telegram environment
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#059669', '#f59e0b'],
      });
    } catch {
      // Ignore
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const claimDailyReward = () => {
    if (user.streakClaimedToday) {
      showToast('Daily streak reward already claimed today!', 'error');
      triggerHaptic('error');
      return;
    }

    const streakRewards = [1.00, 2.00, 3.00, 5.00, 7.00, 10.00, 20.00];
    const reward = streakRewards[user.streak - 1] || 1.00;

    setBalance((prev) => prev + reward);
    setTotalEarned((prev) => prev + reward);

    setUser((prev) => ({
      ...prev,
      streakClaimedToday: true,
      streak: (prev.streak % 7) + 1,
    }));

    const newTx: Transaction = {
      id: `EH-STK-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: reward,
      type: 'Daily Reward',
      status: 'Completed',
      description: `Streak Day ${user.streak} Bonus`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setTransactions((prev) => [newTx, ...prev]);
    triggerHaptic('success');
    triggerConfetti();
    showToast(`Claimed +${reward.toFixed(2)} ETB Daily Streak Reward!`, 'success');
  };

  const verifyTask = (taskId: string) => {
    triggerHaptic('light');

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, verifying: true } : t))
    );

    // Simulate async verification process (3s)
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === taskId) {
            return { ...t, verifying: false, completed: true };
          }
          return t;
        })
      );

      const task = tasks.find((t) => t.id === taskId);
      if (task && !task.completed) {
        const reward = task.reward;
        setBalance((prev) => prev + reward);
        setTotalEarned((prev) => prev + reward);

        const newTx: Transaction = {
          id: `EH-TASK-${Math.floor(100000 + Math.random() * 900000)}`,
          amount: reward,
          type: 'Task Reward',
          status: 'Completed',
          description: `Mission: ${task.title}`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };

        setTransactions((prev) => [newTx, ...prev]);
        triggerHaptic('success');
        triggerConfetti();
        showToast(`Mission Verified! +${reward.toFixed(2)} ETB added!`, 'success');
      }
    }, 2800);
  };

  const submitWithdrawal = (
    fullName: string,
    method: 'Telebirr' | 'CBE Birr' | 'Bank Transfer' | 'Chapa' | 'Airtime',
    accountAddress: string,
    amount: number
  ): boolean => {
    if (!fullName || !accountAddress || isNaN(amount)) {
      showToast('Please fill in all required fields accurately.', 'error');
      triggerHaptic('error');
      return false;
    }

    if (amount < config.minWithdraw) {
      showToast(`Minimum withdrawal amount is ${config.minWithdraw.toFixed(2)} ETB.`, 'error');
      triggerHaptic('error');
      return false;
    }

    if (amount > config.maxWithdraw) {
      showToast(`Maximum withdrawal per request is ${config.maxWithdraw.toFixed(2)} ETB.`, 'error');
      triggerHaptic('error');
      return false;
    }

    if (amount > balance) {
      showToast('Insufficient wallet balance!', 'error');
      triggerHaptic('error');
      return false;
    }

    // Process deduction
    setBalance((prev) => prev - amount);

    const withdrawalId = `EH-WD-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newWithdrawal: WithdrawalRequest = {
      id: withdrawalId,
      fullName,
      method,
      accountAddress,
      amount,
      status: 'Pending',
      date: dateStr,
    };

    const newTx: Transaction = {
      id: withdrawalId,
      amount: -amount,
      type: 'Withdrawal',
      status: 'Pending',
      description: `${method} (${accountAddress.slice(0, 4)}***) Request`,
      date: dateStr,
      paymentMethod: method,
      accountAddress,
    };

    setWithdrawals((prev) => [newWithdrawal, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);

    triggerHaptic('success');
    showToast(`Withdrawal request for ${amount.toFixed(2)} ETB submitted!`, 'success');
    return true;
  };

  const getInviteLink = () => {
    return `https://t.me/${config.botUsername}?start=ref_${user.id}`;
  };

  const copyInviteLink = () => {
    const link = getInviteLink();
    navigator.clipboard.writeText(link);
    triggerHaptic('success');
    showToast('Referral link copied to clipboard!', 'success');
  };

  const shareOnTelegram = () => {
    const link = getInviteLink();
    const shareText = encodeURIComponent(
      `🎁 Join me on EarnHive and earn free ETB by completing simple daily tasks! Use my link to get a starter bonus:`
    );
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${shareText}`;

    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink(fullUrl);
    } else {
      window.open(fullUrl, '_blank');
    }
    triggerHaptic('light');
  };

  const toggleMaintenanceMode = () => {
    triggerHaptic('medium');
    setConfig((prev) => {
      const nextMode = !prev.maintenanceMode;
      showToast(
        nextMode ? 'Maintenance Mode activated globally.' : 'Maintenance Mode deactivated.',
        nextMode ? 'error' : 'success'
      );
      return { ...prev, maintenanceMode: nextMode };
    });
  };

  const adjustUserBalance = (targetId: string, amount: number) => {
    triggerHaptic('success');
    if (targetId === user.id || targetId === 'me' || targetId === '') {
      setBalance((prev) => Math.max(0, prev + amount));
      if (amount > 0) setTotalEarned((prev) => prev + amount);

      const newTx: Transaction = {
        id: `EH-ADM-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: amount,
        type: 'Admin Adjustment',
        status: 'Completed',
        description: `Admin manual balance edit`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setTransactions((prev) => [newTx, ...prev]);
    }
    showToast(`Adjusted ${amount > 0 ? '+' : ''}${amount.toFixed(2)} ETB for ID: ${targetId || user.id}`, 'success');
  };

  const addNewTask = (newTask: Omit<Task, 'id' | 'completed' | 'verifying'>) => {
    triggerHaptic('success');
    const taskId = `T-${Math.floor(200 + Math.random() * 800)}`;
    const fullTask: Task = {
      ...newTask,
      id: taskId,
      completed: false,
      verifying: false,
    };
    setTasks((prev) => [fullTask, ...prev]);
    showToast(`New task "${newTask.title}" published!`, 'success');
  };

  const updateAnnouncement = (ann: CampaignAnnouncement) => {
    triggerHaptic('success');
    setAnnouncement(ann);
    showToast('Campaign announcement updated!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        balance,
        tasks,
        transactions,
        config,
        announcement,
        withdrawals,
        activeTab,
        setActiveTab,
        toast,
        showToast,
        triggerHaptic,
        claimDailyReward,
        verifyTask,
        submitWithdrawal,
        copyInviteLink,
        shareOnTelegram,
        toggleMaintenanceMode,
        adjustUserBalance,
        addNewTask,
        updateAnnouncement,
        triggerConfetti,
        totalEarned,
        referralsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

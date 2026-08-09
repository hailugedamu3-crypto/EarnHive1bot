import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Users,
  CheckSquare,
  Trophy,
  Receipt,
  Wallet,
  Shield,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, triggerHaptic, user } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'refer', label: 'Refer', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'withdraw', label: 'Withdraw', icon: Wallet },
    { id: 'leaderboard', label: 'Ranks', icon: Trophy },
    { id: 'ledger', label: 'Ledger', icon: Receipt },
  ];

  if (user.isAdmin) {
    navItems.push({ id: 'admin', label: 'Control', icon: Shield });
  }

  return (
    <div className="fixed bottom-0 left-0 w-full glass-card border-t border-emerald-500/15 px-2 py-2.5 flex justify-around items-center z-40 max-w-md left-1/2 -translate-x-1/2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              triggerHaptic('light');
              setActiveTab(item.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-105'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
            <span className="text-[9px] font-extrabold mt-1 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

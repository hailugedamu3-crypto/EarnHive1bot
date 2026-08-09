import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Users,
  Coins,
  Flame,
  UserPlus,
  ListCheck,
  ArrowRightLeft,
  Megaphone,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeTab: React.FC = () => {
  const {
    balance,
    user,
    referralsCount,
    totalEarned,
    tasks,
    setActiveTab,
    triggerHaptic,
    announcement,
  } = useApp();

  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length
    ? Math.min(100, Math.floor((completedTasksCount / tasks.length) * 100))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Campaign Banner */}
      {announcement.active && (
        <div className="glass-panel p-4 rounded-2xl relative overflow-hidden border-emerald-500/30 shadow-lg">
          <div className="absolute top-0 right-0 bg-emerald-500 text-neutral-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider">
            {announcement.badge}
          </div>
          <h4 className="font-bold text-xs text-emerald-400 flex items-center space-x-2">
            <Megaphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{announcement.title}</span>
          </h4>
          <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
            {announcement.description}
          </p>
        </div>
      )}

      {/* Premium Balance Card */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-800 to-teal-950 p-6 rounded-3xl relative overflow-hidden shadow-2xl border border-emerald-400/20 pulse-glow">
        <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -left-12 -top-12 w-32 h-32 bg-emerald-400/15 rounded-full blur-xl"></div>
        
        <div className="flex justify-between items-center mb-1">
          <p className="text-emerald-200 text-[10px] font-black tracking-widest uppercase">
            Available Balance
          </p>
          <div className="flex items-center space-x-1 bg-emerald-900/50 px-2 py-0.5 rounded-full border border-emerald-400/20">
            <Shield className="w-3 h-3 text-emerald-300" />
            <span className="text-[9px] text-emerald-200 font-bold">Secured</span>
          </div>
        </div>

        <div className="flex items-baseline space-x-2 mt-2">
          <h1 className="text-5xl font-black tracking-tight text-white">
            {balance.toFixed(2)}
          </h1>
          <span className="text-base font-extrabold text-emerald-200">ETB</span>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-center text-emerald-100">
          <div className="flex-1 border-r border-white/10 pr-2 text-left">
            <p className="opacity-75 text-[9px] uppercase font-bold tracking-wider">
              Level Target
            </p>
            <p className="font-extrabold text-xs mt-1 text-white">
              {balance.toFixed(0)} / {user.levelTarget} ETB
            </p>
          </div>
          <div className="flex-1 pl-4 text-right">
            <p className="opacity-75 text-[9px] uppercase font-bold tracking-wider">
              Daily Streak
            </p>
            <p className="font-extrabold text-xs mt-1 text-white">
              Day {user.streak} 🔥
            </p>
          </div>
        </div>
      </div>

      {/* Fast Stats Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="glass-panel p-4 rounded-2xl flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              Invited Friends
            </p>
            <h3 className="font-extrabold text-base tracking-tight text-white mt-0.5">
              {referralsCount}
            </h3>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shadow-inner shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              Total Earned
            </p>
            <h3 className="font-extrabold text-base tracking-tight text-white mt-0.5">
              {totalEarned.toFixed(2)} ETB
            </h3>
          </div>
        </div>
      </div>

      {/* Today's Mission Progress */}
      <div className="glass-panel p-5 rounded-2xl space-y-3 border-emerald-500/10">
        <div className="flex justify-between items-center text-xs">
          <span className="text-neutral-300 font-extrabold flex items-center space-x-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Missions Completion</span>
          </span>
          <span className="text-emerald-400 font-black">
            {completedTasksCount} / {tasks.length} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-neutral-900/80 h-3 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-[10px] text-neutral-400 leading-normal">
          Complete daily missions and verify your tasks to boost level multipliers and claim higher rewards.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('refer');
          }}
          className="bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-emerald-500/40 transition-all active:scale-95 group shadow-md"
        >
          <UserPlus className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-neutral-200">Invite</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('tasks');
          }}
          className="bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-emerald-500/40 transition-all active:scale-95 group shadow-md"
        >
          <ListCheck className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-neutral-200">Missions</span>
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('withdraw');
          }}
          className="bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-800 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center hover:border-emerald-500/40 transition-all active:scale-95 group shadow-md"
        >
          <ArrowRightLeft className="w-5 h-5 text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-neutral-200">Withdraw</span>
        </button>
      </div>
    </motion.div>
  );
};

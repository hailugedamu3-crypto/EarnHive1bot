import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, Award, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_LEADERBOARDS } from '../../data/initialData';

export const LeaderboardTab: React.FC = () => {
  const { user, balance, referralsCount, triggerHaptic } = useApp();
  const [period, setPeriod] = useState<'today' | 'weekly' | 'monthly'>('today');

  const currentList = INITIAL_LEADERBOARDS[period] || [];

  // Add current user to leaderboard view dynamically
  const userRankItem = {
    rank: 6,
    name: `${user.name} (You)`,
    avatar: user.avatar,
    referrals: referralsCount,
    earned: balance,
    isUser: true,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Global Standing Rankings
        </h3>
      </div>

      {/* Leaderboard Card Container */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl">
        {/* Period Selector Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/40 text-center">
          {(['today', 'weekly', 'monthly'] as const).map((p) => {
            const isActive = period === p;
            return (
              <button
                key={p}
                onClick={() => {
                  triggerHaptic('light');
                  setPeriod(p);
                }}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/10'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Top 3 Podium Highlights */}
        <div className="p-5 grid grid-cols-3 gap-2 border-b border-neutral-800/80 bg-neutral-900/30">
          {currentList.slice(0, 3).map((item, idx) => {
            const trophies = [
              { color: 'text-yellow-400', bg: 'from-amber-500/20 to-yellow-500/10 border-yellow-500/30' },
              { color: 'text-slate-300', bg: 'from-slate-400/20 to-slate-500/10 border-slate-400/30' },
              { color: 'text-amber-600', bg: 'from-amber-700/20 to-amber-800/10 border-amber-600/30' },
            ];
            const badge = trophies[idx];

            return (
              <div
                key={item.rank}
                className={`p-3 rounded-2xl bg-gradient-to-b ${badge.bg} border text-center flex flex-col items-center justify-center relative`}
              >
                <div className="absolute -top-2 bg-neutral-950 px-2 rounded-full border border-neutral-800 text-[9px] font-black text-neutral-300">
                  #{item.rank}
                </div>
                <div className="w-9 h-9 rounded-xl bg-neutral-900/80 flex items-center justify-center font-black text-sm text-white shadow-inner mb-1.5 mt-1">
                  {item.avatar}
                </div>
                <span className="text-[11px] font-extrabold text-white truncate max-w-full">
                  {item.name}
                </span>
                <span className="text-[10px] font-black text-emerald-400 mt-0.5">
                  {item.earned.toFixed(0)} ETB
                </span>
              </div>
            );
          })}
        </div>

        {/* Full Rank List */}
        <div className="p-4 space-y-2.5">
          {currentList.map((item) => {
            let rankColor = 'text-neutral-400';
            if (item.rank === 1) rankColor = 'text-yellow-400 font-black';
            if (item.rank === 2) rankColor = 'text-slate-300 font-black';
            if (item.rank === 3) rankColor = 'text-amber-600 font-black';

            return (
              <div
                key={item.rank}
                className="flex justify-between items-center p-3.5 bg-neutral-900/40 rounded-xl border border-neutral-800 hover:border-emerald-500/20 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-mono w-5 text-center ${rankColor}`}>
                    #{item.rank}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 font-black text-xs uppercase border border-emerald-500/20">
                    {item.avatar}
                  </div>
                  <span className="text-xs font-bold text-neutral-200">
                    {item.name}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-emerald-400 block">
                    {item.earned.toFixed(2)} ETB
                  </span>
                  <span className="text-[9px] text-neutral-400 block">
                    {item.referrals} Invites
                  </span>
                </div>
              </div>
            );
          })}

          {/* Current User Rank Card */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 rounded-xl border border-emerald-500/40 flex justify-between items-center mt-3 shadow-md">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono w-5 text-center text-emerald-400 font-black">
                #{userRankItem.rank}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-neutral-950 font-black text-xs uppercase shadow-md">
                {userRankItem.avatar}
              </div>
              <div>
                <span className="text-xs font-black text-white block">
                  {userRankItem.name}
                </span>
                <span className="text-[9px] text-emerald-300 font-mono">
                  Current Rank
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-emerald-400 block">
                {userRankItem.earned.toFixed(2)} ETB
              </span>
              <span className="text-[9px] text-neutral-300 block">
                {userRankItem.referrals} Invites
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

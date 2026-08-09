import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Flame,
} from 'lucide-react';
import { motion } from 'motion/react';
import { DAILY_STREAK_REWARDS } from '../../data/initialData';

export const TasksTab: React.FC = () => {
  const {
    user,
    tasks,
    claimDailyReward,
    verifyTask,
    triggerHaptic,
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'Channel', 'Social', 'Special', 'Bot'];

  const filteredTasks = tasks.filter((task) => {
    if (categoryFilter === 'all') return true;
    return task.type === categoryFilter;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2">
        <CheckSquare className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Missions & Task Ledger
        </h3>
      </div>

      {/* Daily Check-In Calendar Widget */}
      <div className="glass-panel p-5 rounded-3xl space-y-4 relative overflow-hidden border border-emerald-500/20 shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Continuous Daily Streak</span>
            </h4>
            <p className="text-[10px] text-neutral-300 mt-0.5">
              Claim daily rewards to maintain your consecutive streak bonus!
            </p>
          </div>

          <button
            onClick={claimDailyReward}
            disabled={user.streakClaimedToday}
            className={`font-black text-xs px-4 py-2 rounded-xl active:scale-95 transition-all shadow-md ${
              user.streakClaimedToday
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20 hover:brightness-110'
            }`}
          >
            {user.streakClaimedToday ? 'Claimed' : 'Claim Now'}
          </button>
        </div>

        {/* Day Nodes 1-7 Grid */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {DAILY_STREAK_REWARDS.map((item) => {
            const isPast = item.day < user.streak;
            const isCurrent = item.day === user.streak;

            return (
              <div
                key={item.day}
                className={`p-2 rounded-xl text-center flex flex-col items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-600 border border-emerald-400/40 shadow-lg scale-105 animate-pulse'
                    : isPast
                    ? 'bg-emerald-500/10 border border-emerald-500/20 opacity-75'
                    : 'bg-neutral-900/60 border border-neutral-800'
                }`}
              >
                <span
                  className={`text-[8px] font-bold block uppercase ${
                    isCurrent ? 'text-white font-black' : isPast ? 'text-emerald-400' : 'text-neutral-400'
                  }`}
                >
                  D{item.day}
                </span>

                {isPast ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-1" />
                ) : (
                  <span
                    className={`text-[10px] font-black block mt-0.5 ${
                      isCurrent ? 'text-white' : 'text-emerald-400'
                    }`}
                  >
                    {item.reward} ETB
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Task Category Selector Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                triggerHaptic('light');
                setCategoryFilter(cat);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-md'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All Missions' : cat}
            </button>
          );
        })}
      </div>

      {/* Missions List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 text-neutral-500 text-xs glass-panel rounded-2xl">
            <Flame className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <span>No active missions in this category at the moment.</span>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="glass-panel p-4 rounded-xl flex justify-between items-center border border-emerald-500/10 hover:border-emerald-500/20 transition-all shadow-md"
            >
              <div className="space-y-1 max-w-[65%]">
                <h4 className="font-extrabold text-xs text-neutral-100 leading-snug">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-[10px] text-neutral-400 line-clamp-1">
                    {task.description}
                  </p>
                )}
                <p className="text-[11px] text-emerald-400 font-bold">
                  +{task.reward.toFixed(2)} ETB Reward
                </p>
              </div>

              <div>
                {task.completed ? (
                  <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Done</span>
                  </span>
                ) : task.verifying ? (
                  <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center space-x-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying</span>
                  </span>
                ) : (
                  <div className="flex space-x-2">
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => triggerHaptic('light')}
                      className="bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1"
                    >
                      <span>Start</span>
                      <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </a>

                    <button
                      onClick={() => verifyTask(task.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-md active:scale-95"
                    >
                      Verify
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

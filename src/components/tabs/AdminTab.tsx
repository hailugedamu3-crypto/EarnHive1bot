import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Wrench,
  UserCheck,
  PlusCircle,
  Megaphone,
  BarChart3,
  DollarSign,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Task } from '../../types';

export const AdminTab: React.FC = () => {
  const {
    config,
    toggleMaintenanceMode,
    adjustUserBalance,
    addNewTask,
    announcement,
    updateAnnouncement,
    withdrawals,
    tasks,
    triggerHaptic,
  } = useApp();

  const [targetId, setTargetId] = useState<string>('');
  const [adjustAmount, setAdjustAmount] = useState<string>('');

  // Task creation form state
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDesc, setTaskDesc] = useState<string>('');
  const [taskReward, setTaskReward] = useState<string>('15.00');
  const [taskType, setTaskType] = useState<'Channel' | 'Social' | 'Special' | 'Bot'>('Channel');
  const [taskUrl, setTaskUrl] = useState<string>('https://t.me/EarnHive1bot');

  // Announcement state
  const [annTitle, setAnnTitle] = useState<string>(announcement.title);
  const [annDesc, setAnnDesc] = useState<string>(announcement.description);
  const [annActive, setAnnActive] = useState<boolean>(announcement.active);

  const pendingWithdrawalsCount = withdrawals.filter((w) => w.status === 'Pending').length;

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(adjustAmount);
    if (!isNaN(num)) {
      adjustUserBalance(targetId, num);
      setAdjustAmount('');
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const rewardNum = parseFloat(taskReward);
    if (taskTitle && !isNaN(rewardNum)) {
      addNewTask({
        title: taskTitle,
        description: taskDesc,
        reward: rewardNum,
        type: taskType,
        url: taskUrl || 'https://t.me/EarnHive1bot',
      });
      setTaskTitle('');
      setTaskDesc('');
      setTaskReward('15.00');
    }
  };

  const handleUpdateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      title: annTitle,
      description: annDesc,
      badge: 'Campaign',
      active: annActive,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2 text-red-400">
        <ShieldAlert className="w-5 h-5" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Creator Control Dashboard
        </h3>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="glass-panel p-4 rounded-xl border-red-500/20">
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">
            Platform Users
          </span>
          <h4 className="text-xl font-black text-white mt-1">12,450</h4>
          <span className="text-[9px] text-emerald-400 font-mono mt-1 block">
            +480 today
          </span>
        </div>

        <div className="glass-panel p-4 rounded-xl border-red-500/20">
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">
            Pending Withdrawals
          </span>
          <h4 className="text-xl font-black text-amber-400 mt-1">
            {pendingWithdrawalsCount} Requests
          </h4>
          <span className="text-[9px] text-neutral-400 font-mono mt-1 block">
            Action Required
          </span>
        </div>
      </div>

      {/* Signups Activity Visual Bar Chart */}
      <div className="glass-panel p-5 rounded-2xl border-red-500/15 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-300 flex items-center space-x-1.5">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Daily User Signups Metric</span>
          </h4>
          <span className="text-[10px] text-emerald-400 font-bold">Live Stream</span>
        </div>

        <div className="w-full h-28 flex items-end justify-between pt-4 px-2 bg-neutral-950/40 rounded-xl border border-neutral-850">
          {[
            { label: 'Mon', h: '35%', val: '1.2k' },
            { label: 'Tue', h: '48%', val: '2.4k' },
            { label: 'Wed', h: '65%', val: '4.1k' },
            { label: 'Thu', h: '85%', val: '6.8k' },
            { label: 'Fri', h: '55%', val: '3.9k' },
            { label: 'Sat', h: '98%', val: '12.4k' },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-1">
              <div
                className="w-8 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-md text-center text-[8px] font-mono text-neutral-950 font-bold transition-all"
                style={{ height: bar.h }}
              >
                {bar.val}
              </div>
              <span className="text-[8px] text-neutral-500 font-bold uppercase">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Mode Toggle */}
      <div className="glass-panel p-4 rounded-xl border-red-500/20 flex justify-between items-center">
        <div>
          <h5 className="text-xs font-bold text-white flex items-center space-x-1.5">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Maintenance Shield Toggle</span>
          </h5>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Enabling locks app screens into maintenance state.
          </p>
        </div>

        <button
          onClick={toggleMaintenanceMode}
          className={`text-xs font-black px-4 py-2 rounded-xl transition-all ${
            config.maintenanceMode
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse'
              : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
          }`}
        >
          {config.maintenanceMode ? 'ACTIVE (ON)' : 'OFF'}
        </button>
      </div>

      {/* Manual User Balance Adjustment Form */}
      <form onSubmit={handleAdjustBalance} className="glass-panel p-5 rounded-2xl border-red-500/20 space-y-3.5">
        <h5 className="text-xs font-extrabold text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
          <DollarSign className="w-4 h-4" />
          <span>Adjust User Balance</span>
        </h5>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">
              Target User TG-ID
            </label>
            <input
              type="text"
              placeholder="e.g. 7989361951 or leave for self"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-neutral-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[9px] text-neutral-400 font-bold uppercase block mb-1">
              Amount (+ / - ETB)
            </label>
            <input
              type="number"
              step="1"
              placeholder="+50 or -20"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
              className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-red-500 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-neutral-600 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-neutral-800 hover:bg-neutral-700 text-red-400 border border-red-500/30 text-xs py-2.5 rounded-xl font-bold transition-all active:scale-95"
        >
          Apply Balance Adjustment
        </button>
      </form>

      {/* Add New Mission Task Form */}
      <form onSubmit={handleCreateTask} className="glass-panel p-5 rounded-2xl border-red-500/20 space-y-3.5">
        <h5 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Mission Task</span>
        </h5>

        <div className="space-y-2">
          <input
            type="text"
            required
            placeholder="Mission Title (e.g. 📢 Join VIP Channel)"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Brief Mission Description"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="0.5"
              required
              placeholder="Reward ETB"
              value={taskReward}
              onChange={(e) => setTaskReward(e.target.value)}
              className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none"
            />

            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as any)}
              className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
            >
              <option value="Channel">Channel</option>
              <option value="Social">Social</option>
              <option value="Special">Special</option>
              <option value="Bot">Bot</option>
            </select>
          </div>

          <input
            type="url"
            placeholder="Target Telegram Channel/URL"
            value={taskUrl}
            onChange={(e) => setTaskUrl(e.target.value)}
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-black text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
        >
          Publish Mission
        </button>
      </form>

      {/* Campaign Announcement Editor */}
      <form onSubmit={handleUpdateAnnouncement} className="glass-panel p-5 rounded-2xl border-red-500/20 space-y-3.5">
        <h5 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
          <Megaphone className="w-4 h-4" />
          <span>Broadcast Campaign Banner</span>
        </h5>

        <div className="space-y-2">
          <input
            type="text"
            required
            placeholder="Banner Title"
            value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)}
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />

          <textarea
            required
            placeholder="Banner Description"
            value={annDesc}
            onChange={(e) => setAnnDesc(e.target.value)}
            rows={2}
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-amber-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />

          <label className="flex items-center space-x-2 text-xs text-neutral-300">
            <input
              type="checkbox"
              checked={annActive}
              onChange={(e) => setAnnActive(e.target.checked)}
              className="accent-emerald-500 rounded"
            />
            <span>Active on Dashboard</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-black text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
        >
          Update Campaign
        </button>
      </form>
    </motion.div>
  );
};

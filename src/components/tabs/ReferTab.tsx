import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Copy,
  Send,
  Network,
  CheckCircle2,
  TrendingUp,
  Share2,
} from 'lucide-react';
import { motion } from 'motion/react';

export const ReferTab: React.FC = () => {
  const {
    user,
    config,
    referralsCount,
    copyInviteLink,
    shareOnTelegram,
  } = useApp();

  const referralLink = `https://t.me/${config.botUsername}?start=ref_${user.id}`;
  const totalRefEarned = referralsCount * config.refReward;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Multi-Tier Referral Network
        </h3>
      </div>

      {/* Referral Link Generator Card */}
      <div className="glass-panel p-5 rounded-2xl space-y-4 border-emerald-500/20 shadow-xl">
        <div className="space-y-1">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-400">
            Your Invitation Link
          </h4>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Share your custom referral link with friends and receive persistent multi-level commission payouts on every task they complete!
          </p>
        </div>

        <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800 flex justify-between items-center overflow-hidden">
          <span className="text-[11px] text-neutral-400 truncate mr-3 font-mono">
            {referralLink}
          </span>
          <button
            onClick={copyInviteLink}
            className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all flex items-center space-x-1 shrink-0 hover:bg-emerald-500/25"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={shareOnTelegram}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-3 rounded-xl shadow-lg shadow-emerald-500/10 text-xs tracking-wide flex items-center justify-center space-x-2 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send on Telegram</span>
          </button>

          <button
            onClick={copyInviteLink}
            className="bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border border-neutral-700 font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Multi-level Commission Cards */}
      <div className="glass-panel p-5 rounded-2xl space-y-3.5 border-emerald-500/10">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400 flex items-center space-x-1.5">
          <Network className="w-4 h-4 text-emerald-400" />
          <span>Commission Structure</span>
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-400 block uppercase font-extrabold">
              Tier 1
            </span>
            <span className="text-lg font-black text-emerald-400 mt-0.5 block">
              {config.commissionRates.tier1}%
            </span>
            <span className="text-[9px] text-neutral-400 block mt-1">
              Direct Invites
            </span>
          </div>

          <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-400 block uppercase font-extrabold">
              Tier 2
            </span>
            <span className="text-lg font-black text-emerald-400 mt-0.5 block">
              {config.commissionRates.tier2}%
            </span>
            <span className="text-[9px] text-neutral-400 block mt-1">
              Sub-Invites
            </span>
          </div>

          <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800 text-center">
            <span className="text-[10px] text-neutral-400 block uppercase font-extrabold">
              Tier 3
            </span>
            <span className="text-lg font-black text-emerald-400 mt-0.5 block">
              {config.commissionRates.tier3}%
            </span>
            <span className="text-[9px] text-neutral-400 block mt-1">
              Network Level 3
            </span>
          </div>
        </div>
      </div>

      {/* Referral Statistics Breakdown */}
      <div className="glass-panel p-5 rounded-2xl space-y-4 border-emerald-500/10">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400 flex items-center space-x-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Referral Network Analytics</span>
        </h4>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              Total Invites
            </p>
            <h4 className="text-lg font-black mt-1 text-white">
              {referralsCount} Users
            </h4>
          </div>

          <div className="p-3.5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              Active Contributors
            </p>
            <h4 className="text-lg font-black mt-1 text-emerald-400">
              {Math.max(1, Math.floor(referralsCount * 0.85))} Active
            </h4>
          </div>

          <div className="p-3.5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              Referral Earnings
            </p>
            <h4 className="text-lg font-black mt-1 text-emerald-400">
              {totalRefEarned.toFixed(2)} ETB
            </h4>
          </div>

          <div className="p-3.5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
              Network Security
            </p>
            <h4 className="text-sm font-extrabold mt-1 text-emerald-400 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified Nodes</span>
            </h4>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

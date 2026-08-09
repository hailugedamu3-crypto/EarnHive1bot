import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShieldCheck,
  Headphones,
  FileText,
  Lock,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfileTab: React.FC = () => {
  const { user, tasks, referralsCount, config, triggerHaptic } = useApp();
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  const completedTasksCount = tasks.filter((t) => t.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Account Parameters
        </h3>
      </div>

      {/* Profile Overview Card */}
      <div className="glass-panel p-5 rounded-2xl border-emerald-500/20 shadow-xl space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-black text-2xl text-white shadow-lg border border-emerald-400/30 shrink-0">
            {user.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-extrabold text-base text-white">{user.name}</h2>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-neutral-400 font-mono">@{user.username}</p>
            <span className="inline-block mt-1 text-[9px] bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
              {user.level}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-800 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Telegram ID</span>
            <span className="font-mono text-neutral-200">{user.id}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Joined Date</span>
            <span className="font-mono text-neutral-200">{user.joinDate}</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Missions Completed</span>
            <span className="font-bold text-emerald-400">
              {completedTasksCount} / {tasks.length}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">Referral Network</span>
            <span className="font-bold text-emerald-400">
              {referralsCount} Users
            </span>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-neutral-400">Account Integrity</span>
            <span className="font-black text-emerald-400 text-[9px] uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Secured Node
            </span>
          </div>
        </div>
      </div>

      {/* Support & Legal Navigation */}
      <div className="glass-panel p-2 rounded-2xl space-y-1 border-emerald-500/10">
        <a
          href={`https://t.me/${config.supportUsername}`}
          target="_blank"
          rel="noreferrer"
          onClick={() => triggerHaptic('light')}
          className="w-full flex justify-between items-center px-4 py-3.5 text-xs text-neutral-200 hover:text-white rounded-xl hover:bg-neutral-850/50 transition-colors"
        >
          <span className="flex items-center space-x-2.5">
            <Headphones className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Contact Support Handler</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
        </a>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveModal('terms');
          }}
          className="w-full flex justify-between items-center px-4 py-3.5 text-xs text-neutral-200 hover:text-white rounded-xl hover:bg-neutral-850/50 transition-colors"
        >
          <span className="flex items-center space-x-2.5">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Terms of Service</span>
          </span>
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </button>

        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveModal('privacy');
          }}
          className="w-full flex justify-between items-center px-4 py-3.5 text-xs text-neutral-200 hover:text-white rounded-xl hover:bg-neutral-850/50 transition-colors"
        >
          <span className="flex items-center space-x-2.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Privacy Protocol</span>
          </span>
          <ChevronRight className="w-4 h-4 text-neutral-500" />
        </button>
      </div>

      {/* Terms & Privacy Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-6 rounded-3xl max-w-sm w-full space-y-4 border-emerald-500/30 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <h3 className="font-black text-sm text-emerald-400 uppercase tracking-wider">
                  {activeModal === 'terms' ? 'Terms of Service' : 'Privacy Protocol'}
                </h3>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-neutral-300 leading-relaxed space-y-2.5">
                {activeModal === 'terms' ? (
                  <>
                    <p>
                      <strong>1. Overview:</strong> EarnHive is an interactive rewards app enabling users to complete daily promotional missions and invite friends in Ethiopia and globally.
                    </p>
                    <p>
                      <strong>2. Anti-Fraud Policy:</strong> Creating duplicate accounts, using automated scripts, or abusing referral systems will result in instant account disqualification.
                    </p>
                    <p>
                      <strong>3. Payouts:</strong> Withdrawals are processed to valid Ethiopian mobile money or bank accounts (Telebirr, CBE Birr, Chapa).
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>1. Data Minimization:</strong> We only store your public Telegram ID and user name to verify mission completions and prevent double-claiming.
                    </p>
                    <p>
                      <strong>2. Financial Security:</strong> Payment destination details provided during withdrawal requests are encrypted and processed securely.
                    </p>
                    <p>
                      <strong>3. No Third-Party Sales:</strong> Your data is never sold to external marketing brokers.
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full bg-emerald-500 font-black text-neutral-950 py-2.5 rounded-xl text-xs"
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

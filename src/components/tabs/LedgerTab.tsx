import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { motion } from 'motion/react';

export const LedgerTab: React.FC = () => {
  const { transactions, triggerHaptic } = useApp();
  const [filter, setFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === 'all') return true;
    if (filter === 'Task') return tx.type === 'Task Reward';
    if (filter === 'Referral') return tx.type === 'Referral Reward';
    if (filter === 'Daily') return tx.type === 'Daily Reward';
    if (filter === 'Withdrawal') return tx.type === 'Withdrawal';
    return true;
  });

  const taskPayoutsSum = transactions
    .filter((tx) => tx.type === 'Task Reward')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const referralPayoutsSum = transactions
    .filter((tx) => tx.type === 'Referral Reward')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalWithdrawalsSum = transactions
    .filter((tx) => tx.type === 'Withdrawal')
    .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2">
        <Receipt className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Earning & Transaction Audit
        </h3>
      </div>

      {/* Financial Summary Overview */}
      <div className="glass-panel p-5 rounded-2xl border-emerald-500/20 grid grid-cols-2 gap-4 shadow-xl">
        <div>
          <span className="text-[9px] text-neutral-400 block uppercase font-extrabold tracking-wider">
            Task Payouts
          </span>
          <span className="text-lg font-black text-emerald-400 mt-1 block">
            {taskPayoutsSum.toFixed(2)} ETB
          </span>
        </div>

        <div>
          <span className="text-[9px] text-neutral-400 block uppercase font-extrabold tracking-wider">
            Referral Payouts
          </span>
          <span className="text-lg font-black text-emerald-400 mt-1 block">
            {referralPayoutsSum.toFixed(2)} ETB
          </span>
        </div>

        <div className="pt-3 border-t border-neutral-800">
          <span className="text-[9px] text-neutral-400 block uppercase font-extrabold tracking-wider">
            Total Withdrawals
          </span>
          <span className="text-lg font-black text-red-400 mt-1 block">
            {totalWithdrawalsSum.toFixed(2)} ETB
          </span>
        </div>

        <div className="pt-3 border-t border-neutral-800">
          <span className="text-[9px] text-neutral-400 block uppercase font-extrabold tracking-wider">
            Total Logs
          </span>
          <span className="text-lg font-black text-teal-400 mt-1 block">
            {transactions.length} Records
          </span>
        </div>
      </div>

      {/* Filter Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-neutral-500 shrink-0 ml-1" />
        {['all', 'Task', 'Referral', 'Daily', 'Withdrawal'].map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => {
                triggerHaptic('light');
                setFilter(f);
              }}
              className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-md'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {f === 'all' ? 'All Transactions' : f}
            </button>
          );
        })}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 text-neutral-500 text-xs glass-panel rounded-2xl">
            <Receipt className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <span>No transaction logs matching this filter.</span>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const isIncome = tx.amount >= 0;
            return (
              <div
                key={tx.id}
                className="glass-panel p-4 rounded-xl flex justify-between items-center border border-emerald-500/10 hover:border-emerald-500/20 transition-all shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isIncome
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {isIncome ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-xs text-neutral-100">
                      {tx.type}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono">
                      {tx.date} • {tx.id}
                    </p>
                    <p className="text-[9px] text-neutral-400 italic">
                      {tx.description}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span
                    className={`text-xs font-black block ${
                      isIncome ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {isIncome ? '+' : ''}
                    {tx.amount.toFixed(2)} ETB
                  </span>
                  <span
                    className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      tx.status === 'Completed'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : tx.status === 'Pending'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

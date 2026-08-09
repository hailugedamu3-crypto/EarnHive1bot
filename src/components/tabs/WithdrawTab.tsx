import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  Building2,
  PhoneCall,
  Smartphone,
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { motion } from 'motion/react';

export const WithdrawTab: React.FC = () => {
  const {
    balance,
    config,
    user,
    submitWithdrawal,
    withdrawals,
    triggerHaptic,
  } = useApp();

  const [fullName, setFullName] = useState<string>(user.name || '');
  const [method, setMethod] = useState<'Telebirr' | 'CBE Birr' | 'Bank Transfer' | 'Chapa' | 'Airtime'>('Telebirr');
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const methods = [
    { id: 'Telebirr', name: 'Telebirr', icon: Smartphone, color: 'text-sky-400' },
    { id: 'CBE Birr', name: 'CBE Birr', icon: Building2, color: 'text-amber-400' },
    { id: 'Bank Transfer', name: 'Commercial Bank / Bank', icon: Building2, color: 'text-emerald-400' },
    { id: 'Chapa', name: 'Chapa Gateway', icon: Wallet, color: 'text-teal-400' },
    { id: 'Airtime', name: 'Mobile Airtime Topup', icon: PhoneCall, color: 'text-purple-400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    const success = submitWithdrawal(fullName, method, accountAddress, numAmount);
    if (success) {
      setAmount('');
      setAccountAddress('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="flex items-center space-x-2">
        <Wallet className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-black tracking-tight text-white">
          Secure Withdrawal Portal
        </h3>
      </div>

      {/* Balance & Limits Card */}
      <div className="glass-panel p-5 rounded-2xl border-emerald-500/20 shadow-xl space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
            Withdrawable Balance
          </span>
          <span className="text-neutral-400 text-[10px] font-mono">
            Min: {config.minWithdraw.toFixed(2)} ETB
          </span>
        </div>

        <div className="flex items-baseline space-x-2">
          <h2 className="text-3xl font-black text-emerald-400">
            {balance.toFixed(2)}
          </h2>
          <span className="text-xs font-bold text-neutral-300">ETB</span>
        </div>

        <div className="pt-2 border-t border-neutral-800 flex justify-between text-[10px] text-neutral-400">
          <span>Processing Time: <strong className="text-emerald-400">Instant - 2 Hours</strong></span>
          <span>Max Limit: <strong className="text-neutral-200">{config.maxWithdraw.toFixed(0)} ETB</strong></span>
        </div>
      </div>

      {/* Withdrawal Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-5 rounded-2xl space-y-4 border-emerald-500/10">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-400">
          Request Payout
        </h4>

        {/* Payment Method Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block">
            Select Payment Channel
          </label>
          <div className="grid grid-cols-2 gap-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const isSelected = method === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => {
                    triggerHaptic('light');
                    setMethod(m.id as any);
                  }}
                  className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-white shadow-md'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${m.color}`} />
                  <span className="text-xs font-extrabold truncate">{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Name Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block">
            Account Holder Full Name
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Abebe Bikila"
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Account Number / Phone Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block">
            {method === 'Airtime' || method === 'Telebirr'
              ? 'Mobile Phone Number (09... or 07...)'
              : 'Account Number / Address'}
          </label>
          <input
            type="text"
            required
            value={accountAddress}
            onChange={(e) => setAccountAddress(e.target.value)}
            placeholder={
              method === 'Telebirr' || method === 'Airtime'
                ? '0912345678'
                : '1000... or Account ID'
            }
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Amount Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block">
              Withdrawal Amount (ETB)
            </label>
            <button
              type="button"
              onClick={() => {
                triggerHaptic('light');
                setAmount(balance.toFixed(2));
              }}
              className="text-[10px] text-emerald-400 font-bold hover:underline"
            >
              Withdraw Max
            </button>
          </div>
          <input
            type="number"
            step="1"
            min={config.minWithdraw}
            max={config.maxWithdraw}
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`Minimum ${config.minWithdraw} ETB`}
            className="w-full bg-neutral-950/70 border border-neutral-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs tracking-wider uppercase flex items-center justify-center space-x-2 active:scale-95 transition-all mt-2"
        >
          <span>Confirm Withdrawal Request</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Recent Withdrawals List */}
      <div className="glass-panel p-5 rounded-2xl space-y-3.5 border-emerald-500/10">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400 flex items-center space-x-1.5">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Withdrawal History</span>
        </h4>

        {withdrawals.length === 0 ? (
          <p className="text-center py-6 text-neutral-500 text-xs">
            No withdrawal requests submitted yet.
          </p>
        ) : (
          <div className="space-y-2.5">
            {withdrawals.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-neutral-900/50 rounded-xl border border-neutral-800 flex justify-between items-center"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-xs text-white">
                      {item.method}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      ({item.accountAddress})
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-mono">
                    {item.date} • {item.id}
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs font-black text-red-400 block">
                    -{item.amount.toFixed(2)} ETB
                  </span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-flex items-center space-x-1 ${
                      item.status === 'Completed'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'Rejected'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.status === 'Completed' ? (
                      <CheckCircle2 className="w-3 h-3 mr-0.5" />
                    ) : item.status === 'Rejected' ? (
                      <XCircle className="w-3 h-3 mr-0.5" />
                    ) : (
                      <Clock className="w-3 h-3 mr-0.5" />
                    )}
                    <span>{item.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

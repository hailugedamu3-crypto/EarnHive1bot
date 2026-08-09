import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, setActiveTab, triggerHaptic } = useApp();

  return (
    <div className="glass-panel p-4 rounded-2xl mb-5 flex items-center justify-between border-emerald-500/20 shadow-xl">
      <div className="flex items-center space-x-3.5">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-black text-xl text-white shadow-lg border border-emerald-400/30">
          {user.avatar}
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <h2 className="font-extrabold text-sm tracking-tight text-white">{user.name}</h2>
            {user.isVerified && (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
            TG-ID: {user.id}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-1">
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-black border border-emerald-500/20 tracking-wider uppercase">
          {user.level}
        </span>
        <button
          onClick={() => {
            triggerHaptic('light');
            setActiveTab('profile');
          }}
          className="text-[10px] text-neutral-400 hover:text-emerald-400 flex items-center space-x-1 font-semibold transition-colors"
        >
          <HelpCircle className="w-3 h-3" />
          <span>Support</span>
        </button>
      </div>
    </div>
  );
};

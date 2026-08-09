import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2.5 max-w-xs w-[90%] border border-emerald-500/20"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
          </div>
          <p className="text-xs font-semibold text-neutral-100 leading-snug">
            {toast.message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

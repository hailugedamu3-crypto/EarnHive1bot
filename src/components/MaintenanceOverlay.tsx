import React from 'react';
import { useApp } from '../context/AppContext';
import { Wrench } from 'lucide-react';

export const MaintenanceOverlay: React.FC = () => {
  const { config } = useApp();

  if (!config.maintenanceMode) return null;

  return (
    <div className="fixed inset-0 bg-[#070a13] flex flex-col items-center justify-center z-50 px-6 text-center">
      <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-500 text-3xl mb-6 animate-bounce">
        <Wrench className="w-9 h-9" />
      </div>
      <h2 className="text-2xl font-extrabold text-amber-500">
        🔧 Maintenance Underway
      </h2>
      <p className="text-neutral-400 text-sm mt-3 max-w-sm leading-relaxed">
        EarnHive is currently optimizing servers for better performance and instant payout routing. Please check back shortly.
      </p>
      <p className="text-xs text-neutral-600 mt-6 font-mono">
        EH-STATUS: MAINTENANCE_ACTIVE
      </p>
    </div>
  );
};

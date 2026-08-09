import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Toast } from './components/Toast';
import { MaintenanceOverlay } from './components/MaintenanceOverlay';
import { HomeTab } from './components/tabs/HomeTab';
import { ReferTab } from './components/tabs/ReferTab';
import { TasksTab } from './components/tabs/TasksTab';
import { WithdrawTab } from './components/tabs/WithdrawTab';
import { LedgerTab } from './components/tabs/LedgerTab';
import { LeaderboardTab } from './components/tabs/LeaderboardTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { AdminTab } from './components/tabs/AdminTab';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'refer':
        return <ReferTab />;
      case 'tasks':
        return <TasksTab />;
      case 'withdraw':
        return <WithdrawTab />;
      case 'ledger':
        return <LedgerTab />;
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'profile':
        return <ProfileTab />;
      case 'admin':
        return <AdminTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white relative font-sans">
      {/* Top Emerald Accent Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 z-50"></div>

      {/* Main Container */}
      <main className="max-w-md mx-auto px-4 pt-5 pb-28 min-h-screen relative">
        <Header />
        {renderTab()}
      </main>

      {/* Bottom Navigation */}
      <Navigation />

      {/* Toast Notification */}
      <Toast />

      {/* Maintenance Overlay */}
      <MaintenanceOverlay />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

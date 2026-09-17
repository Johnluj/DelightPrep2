'use client';

import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [justReconnected, setJustReconnected] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setJustReconnected(true);
      const timer = setTimeout(() => setJustReconnected(false), 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setJustReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (justReconnected) {
    return (
      <div 
        id="banner-online-restored"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-fade-in"
      >
        <Wifi className="w-4 h-4 text-emerald-200" />
        <span>Connected — Progress synchronized</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div 
        id="banner-offline-mode"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl"
      >
        <WifiOff className="w-4 h-4 text-amber-200" />
        <div className="flex flex-col">
          <span className="font-bold">Offline Mode Active</span>
          <span className="text-[11px] text-amber-100">Answers are saved safely on your device</span>
        </div>
      </div>
    );
  }

  return null;
};

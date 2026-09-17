'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// App Router uses next/navigation if needed
import { DelightPrepLogo } from '@/components/brand/DelightPrepLogo';
import { PWAInstallButton } from '@/components/pwa/PWAInstallButton';
import { ThemeSelector } from '@/components/theme/ThemeSelector';
import { getStoredCurrentUser, setStoredCurrentUser } from '@/lib/storage';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CreditCard, 
  ShieldCheck, 
  Menu, 
  X, 
  User, 
  LogOut,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const [currentUser, setCurrentUser] = useState(() => getStoredCurrentUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDemoLogin = (role: 'student' | 'super_admin') => {
    if (role === 'student') {
      const demoStudent = {
        id: 'std-demo-001',
        email: 'david.adeyemi@delightprep.ng',
        full_name: 'David Adeyemi',
        username: 'davidadeyemi',
        role: 'student' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setStoredCurrentUser(demoStudent);
      setCurrentUser(demoStudent);
      if (onSelectTab) onSelectTab('dashboard');
    } else {
      const demoAdmin = {
        id: 'adm-demo-001',
        email: 'admin@delightprep.ng',
        full_name: 'Engr. Delight Admin',
        username: 'delightadmin',
        role: 'super_admin' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setStoredCurrentUser(demoAdmin);
      setCurrentUser(demoAdmin);
      if (onSelectTab) onSelectTab('admin');
    }
  };

  const handleLogout = () => {
    setStoredCurrentUser(null);
    setCurrentUser(null);
    if (onSelectTab) onSelectTab('landing');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      {/* Top micro-bar with Nigerian curriculum badge */}
      <div className="bg-[#0A192F] text-slate-200 px-4 py-1 text-[11px] font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2026 JAMB & WAEC Syllabus Aligned
          </span>
          <span className="hidden sm:inline text-slate-400">
            Targeted preparation for BECE, WAEC, NECO & JAMB/UTME candidates across Nigeria
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-slate-400">Currency: <strong>₦ NGN</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onSelectTab && onSelectTab(currentUser ? 'dashboard' : 'landing')}
          className="cursor-pointer transition hover:opacity-95"
        >
          <DelightPrepLogo variant="compact" size="sm" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {currentUser ? (
            <>
              <button
                onClick={() => onSelectTab && onSelectTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'dashboard'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('practice')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'practice'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Practice Room
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('cbt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'cbt'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>CBT Simulation</span>
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('study')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'study'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Study Plan
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('gamification')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'gamification'
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Leaderboard & Badges
              </button>
              {currentUser.role === 'super_admin' && (
                <button
                  onClick={() => onSelectTab && onSelectTab('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                    currentTab === 'admin'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Panel</span>
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => onSelectTab && onSelectTab('landing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'landing' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('curriculum')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'curriculum' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Curriculum Tracks
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('cbt-preview')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                CBT Engine
              </button>
              <button
                onClick={() => onSelectTab && onSelectTab('pricing')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentTab === 'pricing' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pricing (₦)
              </button>
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PWAInstallButton />

          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="max-w-[110px] truncate">{currentUser.full_name}</span>
                {currentUser.role === 'super_admin' && (
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1 rounded font-bold">Admin</span>
                )}
              </div>
              <button
                id="btn-logout"
                onClick={handleLogout}
                title="Sign out"
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Quick Demo Switcher */}
              <div className="hidden lg:flex items-center gap-1.5 border-r border-slate-200 dark:border-slate-800 pr-2">
                <button
                  onClick={() => handleDemoLogin('student')}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  Demo Student
                </button>
                <button
                  onClick={() => handleDemoLogin('super_admin')}
                  className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 text-xs font-medium text-amber-800 dark:text-amber-400 hover:bg-amber-100 transition"
                >
                  Demo Admin
                </button>
              </div>

              {/* Theme Selector Desktop */}
              <div className="hidden sm:flex items-center">
                <ThemeSelector variant="dropdown" />
              </div>

              <button
                id="btn-login-header"
                onClick={() => onSelectTab && onSelectTab('auth')}
                className="rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Sign In
              </button>
              <button
                id="btn-register-header"
                onClick={() => onSelectTab && onSelectTab('onboarding')}
                className="rounded-xl bg-[#0A192F] dark:bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] dark:hover:bg-blue-700 transition"
              >
                Start Free
              </button>
            </div>
          )}

          {/* Theme Selector Mobile */}
          <div className="sm:hidden">
            <ThemeSelector variant="compact" />
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Sticky inside Header) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md px-4 py-4 space-y-2 shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto animate-fadeIn">
          {currentUser ? (
            <div className="space-y-1">
              <div className="pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Signed in as <strong>{currentUser.full_name}</strong></span>
                <span className="capitalize font-semibold text-blue-600 dark:text-blue-400">{currentUser.role}</span>
              </div>
              <button
                onClick={() => { onSelectTab && onSelectTab('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Dashboard
              </button>
              <button
                onClick={() => { onSelectTab && onSelectTab('practice'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Practice Questions
              </button>
              <button
                onClick={() => { onSelectTab && onSelectTab('cbt'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                CBT Mock Simulation
              </button>
              <button
                onClick={() => { onSelectTab && onSelectTab('study'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Daily Study Plan
              </button>
              <button
                onClick={() => { onSelectTab && onSelectTab('gamification'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Leaderboard & Streaks
              </button>
              {currentUser.role === 'super_admin' && (
                <button
                  onClick={() => { onSelectTab && onSelectTab('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                >
                  Admin Question Bank & AI
                </button>
              )}

              {/* Theme Preference */}
              <div className="pt-3 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Appearance</span>
                <ThemeSelector variant="segmented" />
              </div>

              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 mt-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => { onSelectTab && onSelectTab('landing'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Home Overview
              </button>
              <button
                onClick={() => { onSelectTab && onSelectTab('curriculum'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Junior & Senior Tracks
              </button>
              <button
                onClick={() => { onSelectTab && onSelectTab('pricing'); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Subscription Pricing (₦)
              </button>

              {/* Theme Preference */}
              <div className="pt-3 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Appearance</span>
                <ThemeSelector variant="segmented" />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => { handleDemoLogin('student'); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold"
                >
                  Explore as Demo Student
                </button>
                <button
                  onClick={() => { handleDemoLogin('super_admin'); setMobileMenuOpen(false); }}
                  className="w-full py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold"
                >
                  Explore as Demo Admin
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/lib/store';
import { LandingPage } from '@/components/marketing/LandingPage';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { CBTExamRunner } from '@/components/cbt/CBTExamRunner';
import { ExamResultsView } from '@/components/cbt/ExamResultsView';
import { StudyPlanView } from '@/components/student/StudyPlanView';
import { PricingView } from '@/components/subscription/PricingView';
import { AdminPortal } from '@/components/admin/AdminPortal';
import { Logo } from '@/components/brand/Logo';
import { AuthModal } from '@/components/auth/AuthModal';
import { ThemeSelector } from '@/components/theme/ThemeSelector';
import { ExamResult, UserProfile } from '@/types/database';
import { 
  Flame, 
  Award, 
  Crown, 
  ShieldCheck, 
  Calendar, 
  BookOpen, 
  LogOut, 
  User, 
  Menu, 
  X
} from 'lucide-react';

type ActiveView = 
  | 'landing' 
  | 'onboarding' 
  | 'dashboard' 
  | 'cbt_runner' 
  | 'results' 
  | 'study_plan' 
  | 'pricing' 
  | 'admin';

function DelightPrepApp() {
  const { 
    currentUser, 
    studentProfile, 
    activeSession, 
    startExamSession, 
    loginDemoUser, 
    setAuthenticatedUser,
    logout,
    activeRole
  } = useApp();

  const [currentView, setCurrentView] = useState<ActiveView>(
    currentUser ? 'dashboard' : 'landing'
  );
  const [latestResult, setLatestResult] = useState<ExamResult | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // If there's an active running session and user hasn't explicitly navigated away
  const isExamRunning = activeSession && currentView === 'cbt_runner';

  // Handlers
  const handleStartOnboarding = () => {
    setCurrentView('onboarding');
  };

  const handleOnboardingFinished = () => {
    setCurrentView('dashboard');
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setAuthenticatedUser(user);
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const handleDemoLogin = (role: 'student' | 'admin' = 'student') => {
    loginDemoUser(role);
    setCurrentView(role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleStartExamSession = (params: {
    templateId?: string;
    mode: 'learning' | 'cbt_exam' | 'quick_practice';
    subjectIds: string[];
    customMinutes?: number;
    questionCount?: number;
    specificTopicId?: string;
  }) => {
    startExamSession(params);
    setCurrentView('cbt_runner');
  };

  const handleExamSubmitted = (result: ExamResult) => {
    setLatestResult(result);
    setCurrentView('results');
  };

  // If inside CBT runner, show the runner full-screen without distracting student navbar
  if (isExamRunning) {
    return (
      <CBTExamRunner 
        onExamSubmitted={handleExamSubmitted}
        onExit={() => setCurrentView('dashboard')}
      />
    );
  }

  // If on Landing page without login
  if (!currentUser && currentView === 'landing') {
    return (
      <>
        <LandingPage
          onStartOnboarding={handleStartOnboarding}
          onExploreDemo={() => {
            handleStartExamSession({
              mode: 'learning',
              subjectIds: ['mat'],
              questionCount: 10,
              customMinutes: 15
            });
          }}
          onLoginDemo={handleDemoLogin}
          onOpenSignIn={() => handleOpenAuth('login')}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authModalMode}
        />
      </>
    );
  }

  // If in onboarding
  if (currentView === 'onboarding') {
    return (
      <>
        <OnboardingFlow 
          onFinish={handleOnboardingFinished} 
          onOpenSignIn={() => handleOpenAuth('login')}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authModalMode}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* AUTHENTICATED GLOBAL APP HEADER (STICKY) */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs transition-all">
        <div className="px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div 
              onClick={() => setCurrentView('dashboard')} 
              className="cursor-pointer"
            >
              <Logo size="sm" />
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'dashboard'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('study_plan')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  currentView === 'study_plan'
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Study Plan
              </button>
              <button
                onClick={() => setCurrentView('pricing')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  currentView === 'pricing'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Premium Plans</span>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                  currentView === 'admin'
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Editorial Desk</span>
              </button>
            </nav>
          </div>

          {/* Right Student Profile & Streak */}
          <div className="flex items-center gap-3">
            {studentProfile && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{studentProfile.streak_days}d</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>{studentProfile.xp} XP</span>
                </div>
              </div>
            )}

            {/* Theme Selector (Desktop) */}
            <div className="hidden sm:flex items-center">
              <ThemeSelector variant="dropdown" />
            </div>

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
                {currentUser?.full_name?.split(' ')[0] || 'David'}
              </span>
              <button
                onClick={() => {
                  logout();
                  setCurrentView('landing');
                }}
                title="Log Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile theme toggle */}
            <div className="sm:hidden">
              <ThemeSelector variant="compact" />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sticky Mobile Dropdown Menu (Renders inside sticky header) */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md p-4 space-y-2 text-xs font-bold shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto animate-fadeIn">
            {/* Mobile user summary banner */}
            {studentProfile && (
              <div className="flex sm:hidden items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400 font-medium">
                  {currentUser?.full_name || 'Student Account'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-[11px] font-bold">
                    <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{studentProfile.streak_days}d</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-[11px] font-bold">
                    <Award className="w-3 h-3 text-blue-600" />
                    <span>{studentProfile.xp} XP</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => { setCurrentView('dashboard'); setMobileNavOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl transition ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setCurrentView('study_plan'); setMobileNavOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl transition ${
                currentView === 'study_plan'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Study Plan
            </button>
            <button
              onClick={() => { setCurrentView('pricing'); setMobileNavOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between ${
                currentView === 'pricing'
                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Premium Plans</span>
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">₦1,500/mo</span>
            </button>
            <button
              onClick={() => { setCurrentView('admin'); setMobileNavOpen(false); }}
              className={`w-full text-left p-2.5 rounded-xl transition flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Editorial Desk</span>
            </button>

            {/* Mobile Theme Preference Selector */}
            <div className="pt-3 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Appearance</span>
              <ThemeSelector variant="segmented" />
            </div>

            <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  logout();
                  setMobileNavOpen(false);
                  setCurrentView('landing');
                }}
                className="w-full text-left p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {currentView === 'dashboard' && (
          <StudentDashboard
            onStartExam={handleStartExamSession}
            onOpenPricing={() => setCurrentView('pricing')}
            onOpenStudyPlan={() => setCurrentView('study_plan')}
            onOpenAdmin={() => setCurrentView('admin')}
          />
        )}

        {currentView === 'results' && latestResult && (
          <ExamResultsView
            result={latestResult}
            onRetake={() => {
              handleStartExamSession({
                mode: 'learning',
                subjectIds: ['mat'],
                questionCount: 15,
                customMinutes: 20
              });
            }}
            onReturnToDashboard={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'study_plan' && (
          <StudyPlanView
            onBack={() => setCurrentView('dashboard')}
            onStartPractice={(subjectId) => {
              handleStartExamSession({
                mode: 'learning',
                subjectIds: [subjectId],
                questionCount: 15,
                customMinutes: 20
              });
            }}
          />
        )}

        {currentView === 'pricing' && (
          <PricingView
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'admin' && (
          <AdminPortal
            onBackToStudentView={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 py-6 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">DelightPrep</span>
            <span>• Smart Preparation for Better Results</span>
          </div>
          <div>A Product of Delight Tech Network • Nigeria</div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <DelightPrepApp />
    </AppProvider>
  );
}

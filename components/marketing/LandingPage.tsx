'use client';

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Clock, 
  Award, 
  ShieldCheck, 
  Flame,
  BookOpen,
  Users,
  ChevronRight,
  GraduationCap,
  UserCheck,
  Menu,
  X
} from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { ThemeSelector } from '@/components/theme/ThemeSelector';
import { SEED_SUBJECTS } from '@/lib/seed-data';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExploreDemo: () => void;
  onLoginDemo: (role?: 'student' | 'admin') => void;
  onOpenSignIn?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onExploreDemo,
  onLoginDemo,
  onOpenSignIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* NAVBAR (STICKY CONTAINER) */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-2xs transition-all">
        <div className="px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <Logo size="md" showTagline />

          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenSignIn && (
              <button
                onClick={onOpenSignIn}
                className="hidden sm:inline-flex text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => onLoginDemo('student')}
              className="hidden sm:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition px-2.5 py-1.5"
            >
              Student Demo
            </button>
            <button
              onClick={() => onLoginDemo('admin')}
              className="hidden md:inline-flex text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition px-2 py-1"
            >
              Editorial Portal
            </button>

            {/* Theme Selector (Desktop) */}
            <div className="hidden sm:flex items-center">
              <ThemeSelector variant="dropdown" />
            </div>

            <button
              onClick={onStartOnboarding}
              className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm transition active:scale-98 flex items-center gap-1.5"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Theme Toggle */}
            <div className="sm:hidden">
              <ThemeSelector variant="compact" />
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sticky Mobile Dropdown Menu (Inside Sticky Header) */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md px-4 py-4 space-y-2 text-xs font-bold shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto animate-fadeIn">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreDemo();
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Test Practice Simulator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLoginDemo('student');
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Student Demo Account</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLoginDemo('admin');
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Editorial Desk Portal</span>
            </button>

            {/* Mobile Theme Preference Selector */}
            <div className="pt-3 pb-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-medium">Appearance</span>
              <ThemeSelector variant="segmented" />
            </div>

            <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 space-y-2">
              {onOpenSignIn && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSignIn();
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between"
                >
                  <span>Sign In</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartOnboarding();
                }}
                className="w-full p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center gap-2 font-bold"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-8 bg-gradient-to-b from-slate-50/70 to-white dark:from-slate-900/60 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
            <span>Nigeria's Authoritative Secondary & Tertiary Exam Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Smart Preparation for <br />
            <span className="text-blue-700 dark:text-blue-400">
              Better Results.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Curriculum-calibrated CBT practice, authentic 180-question UTME simulations, and personal diagnostic coaching for JSS, SSS, BECE, WAEC, NECO, and JAMB.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-98 transition"
            >
              <span>Personalize My Exam Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-2xs transition"
            >
              Test Practice Simulator
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Full Junior & Senior Syllabi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Authentic 180-Question JAMB Timer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Offline Session Autosave</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES BENTO */}
      <section className="py-16 px-4 sm:px-8 bg-slate-50/60 dark:bg-slate-900/30 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Designed specifically for Nigerian examinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Every formula, theorem, and question is calibrated against the National Educational Research and Development Council (NERDC) standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Two Distinct Learning Worlds</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Dedicated Junior Secondary (JSS1–3, BECE, Junior WAEC) and Senior Secondary (SSS1–3, Science, Commercial, Arts, WAEC, NECO, JAMB).
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">JAMB CBT Simulation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Real exam hall simulation: 180 questions, 2-hour timer, question flags, and tab-switch integrity monitoring to build genuine composure.
              </p>
            </div>

            {/* Card 3 with Human Coach Icon */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Study Coach & Mentor Guidance</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Adaptive diagnostic analysis pinpoints your exact weak topics across Mathematics, Sciences, and Arts to structure targeted revision drills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SUBJECTS PREVIEW */}
      <section className="py-16 px-4 sm:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Curriculum Subjects Catalog</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Junior & Senior Secondary Coverage</p>
            </div>
            <button
              onClick={onStartOnboarding}
              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
            >
              Select Subjects <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SEED_SUBJECTS.slice(0, 8).map(sub => (
              <div key={sub.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                  style={{ backgroundColor: sub.color || '#1D4ED8' }}
                >
                  {sub.code}
                </div>
                <div className="truncate">
                  <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">{sub.name}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{sub.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-8 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <Logo size="sm" showTagline />
          <div>
            <p className="text-slate-700 dark:text-slate-300 font-medium">A Product of Delight Tech Network</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">© 2026 DelightPrep. Smart Preparation for Better Results.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};


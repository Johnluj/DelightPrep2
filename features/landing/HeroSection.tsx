import React from 'react';
import { PWAInstallButton } from '@/components/pwa/PWAInstallButton';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Award,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreCBT: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted, onExploreCBT }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0A192F] to-[#0D2149] text-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Subtle grid backdrop pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Notification Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/40 px-3.5 py-1.5 text-xs text-blue-200 backdrop-blur-md shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-300">Nigeria's Modern CBT Platform</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">2026 JAMB, WAEC & BECE Syllabi Ready</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-balance">
            Smart Preparation for <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Better Results.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance">
            Nigeria's comprehensive exam preparation platform. Master the Nigerian Junior & Senior secondary school curriculum, simulate authentic CBT examinations, and achieve academic excellence.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              id="btn-hero-start-free"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Start Free Preparation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="btn-hero-cbt-sim"
              onClick={onExploreCBT}
              className="w-full sm:w-auto px-7 py-4 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base transition flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Clock className="w-5 h-5 text-emerald-400" />
              <span>Simulate Official CBT Mock</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>JAMB UTME (4 Subjects 180 Qs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WAEC & NECO Objectives</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>BECE & Junior WAEC</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Installable Mobile-First PWA</span>
            </div>
          </div>
        </div>

        {/* Floating Metrics Showcase */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">NERDC Curriculum Aligned</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">50,000+</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Curated Practice Questions</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">36 States</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">+ FCT Nationwide Coverage</div>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">Zero-Lag</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Offline-Ready PWA Engine</div>
          </div>
        </div>

      </div>
    </section>
  );
};

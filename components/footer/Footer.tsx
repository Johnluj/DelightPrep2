import React from 'react';
import { DelightPrepLogo } from '@/components/brand/DelightPrepLogo';
import { ShieldCheck, BookCheck, Award, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A192F] text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <DelightPrepLogo variant="full" theme="dark" size="md" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              DelightPrep is Nigeria’s modern educational examination preparation platform, built to empower secondary students with smart CBT simulations, curriculum-aligned question practice, and personalized diagnostic study plans.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> NERDC Syllabus Aligned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <BookCheck className="w-4 h-4" /> Official CBT Simulator
              </span>
            </div>
          </div>

          {/* Junior Secondary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Junior Secondary
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">JSS 1 Preparation</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">JSS 2 Preparation</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">JSS 3 Mock Exams</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">BECE (National & State)</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">Junior WAEC Practice</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">Basic Science & Tech</button></li>
            </ul>
          </div>

          {/* Senior Secondary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Senior Secondary
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">SSS 1 — SSS 3 Foundation</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">JAMB / UTME Mock Simulator</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">WAEC May/June Objectives</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">NECO Senior Certificate</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">Science Combination</button></li>
              <li><button onClick={() => onNavigate && onNavigate('curriculum')} className="hover:text-white transition">Commercial & Arts Track</button></li>
            </ul>
          </div>

          {/* Platform & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Delight Tech Network
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onNavigate && onNavigate('pricing')} className="hover:text-white transition">Subscription Plans (₦)</button></li>
              <li><button onClick={() => onNavigate && onNavigate('study')} className="hover:text-white transition">Study Plan Generator</button></li>
              <li><button onClick={() => onNavigate && onNavigate('gamification')} className="hover:text-white transition">National Leaderboard</button></li>
              <li><a href="#faq" className="hover:text-white transition">Frequently Asked Questions</a></li>
              <li><span className="text-xs text-slate-500">Parent & Minor Privacy Protected</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DelightPrep. All rights reserved. A Product of Delight Tech Network.</p>
          <div className="flex items-center gap-6">
            <span>Built with care for Nigerian students across all 36 States + FCT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

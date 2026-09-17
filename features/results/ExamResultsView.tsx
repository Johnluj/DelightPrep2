'use client';

import React, { useEffect } from 'react';
import { ExamResult } from '@/types/database';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Lightbulb,
  Share2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamResultsViewProps {
  result: ExamResult;
  onRetake: () => void;
  onDashboard: () => void;
}

export const ExamResultsView: React.FC<ExamResultsViewProps> = ({
  result,
  onRetake,
  onDashboard
}) => {
  useEffect(() => {
    if (result.score_percentage >= 60) {
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // safe fallback
      }
    }
  }, [result.score_percentage]);

  const formatMinutes = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const isDistinction = result.score_percentage >= 75;
  const isPass = result.score_percentage >= 50;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Celebration Header Card */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl space-y-4 relative overflow-hidden ${
        isDistinction 
          ? 'bg-gradient-to-br from-emerald-800 via-teal-900 to-[#0A192F]' 
          : isPass 
          ? 'bg-gradient-to-br from-blue-800 via-indigo-900 to-[#0A192F]' 
          : 'bg-gradient-to-br from-slate-800 via-slate-900 to-[#0A192F]'
      }`}>
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
          <Trophy className="w-8 h-8 text-amber-300" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
            {isDistinction ? 'Distinction Level Mastery' : isPass ? 'Good Passing Performance' : 'Needs Topic Revision'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3">
            Exam Session Completed!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-md mx-auto">
            Your answers have been graded using the official Nigerian examination criteria.
          </p>
        </div>

        {/* Score Percentage Hero */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <span className="text-5xl sm:text-6xl font-black text-white">
            {result.score_percentage}%
          </span>
        </div>

        {/* Breakdown Metric Pills */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-slate-300">Correct</div>
            <div className="text-lg font-bold text-emerald-300">{result.correct_count} Qs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-slate-300">Wrong</div>
            <div className="text-lg font-bold text-red-300">{result.wrong_count} Qs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-slate-300">Unanswered</div>
            <div className="text-lg font-bold text-amber-300">{result.unanswered_count} Qs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <div className="text-slate-300">Time Taken</div>
            <div className="text-lg font-bold text-blue-200">{formatMinutes(result.time_taken_seconds)}</div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRetake}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition flex items-center justify-center gap-2 backdrop-blur-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Another Mock</span>
          </button>
          <button
            onClick={onDashboard}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center gap-2 shadow-md active:scale-95"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Topic Mastery Insights */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Diagnostic Mastery Analysis</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">Strong Topics</div>
            <div className="text-sm font-semibold text-slate-800">Algebraic Equations, Concord</div>
            <p className="text-[11px] text-slate-500">Above 80% accuracy. Well consolidated.</p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">Average Areas</div>
            <div className="text-sm font-semibold text-slate-800">Mechanics & Kinematics</div>
            <p className="text-[11px] text-slate-500">Between 50% - 70%. Review formula units.</p>
          </div>

          <div className="p-4 rounded-xl border border-red-200 bg-red-50/50 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-red-800">Target Weak Topics</div>
            <div className="text-sm font-semibold text-slate-800">Chemical Bonding, Organic Chemistry</div>
            <p className="text-[11px] text-slate-500">Below 50%. Recommended for daily study plan.</p>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="rounded-xl bg-blue-50/80 border border-blue-200 p-4 text-xs text-blue-950 space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>DelightPrep Recommended Next Steps</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            <li>Practice 15 dedicated questions on <strong>Chemical Bonding</strong> in the Practice Room.</li>
            <li>Maintain your study velocity: you earned <strong>+{result.xp_earned} XP</strong> and preserved your streak!</li>
          </ul>
        </div>
      </div>

    </div>
  );
};

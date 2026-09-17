'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Target, 
  RotateCcw, 
  ArrowRight, 
  GraduationCap,
  Award, 
  TrendingUp, 
  BookOpen, 
  Share2, 
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ExamResult } from '@/types/database';
import { useApp } from '@/lib/store';
import { Logo } from '@/components/brand/Logo';

interface ExamResultsViewProps {
  result: ExamResult;
  onRetake: () => void;
  onReturnToDashboard: () => void;
  onPracticeWeakTopic?: (topicId: string, subjectId: string) => void;
}

export const ExamResultsView: React.FC<ExamResultsViewProps> = ({
  result,
  onRetake,
  onReturnToDashboard,
  onPracticeWeakTopic
}) => {
  const { questions: allQuestions } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'review'>('overview');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Trigger celebration confetti if score is >= 70%
  useEffect(() => {
    if (result.score_percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [result.score_percentage]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  };

  const getPerformanceBadge = (pct: number) => {
    if (pct >= 80) return { label: 'Distinction / Outstanding', color: 'text-emerald-800 bg-emerald-50 border-emerald-300' };
    if (pct >= 60) return { label: 'Credit / Solid Pass', color: 'text-blue-800 bg-blue-50 border-blue-300' };
    if (pct >= 45) return { label: 'Average / Revision Required', color: 'text-amber-800 bg-amber-50 border-amber-300' };
    return { label: 'Needs Intensive Practice', color: 'text-rose-800 bg-rose-50 border-rose-300' };
  };

  const perfBadge = getPerformanceBadge(result.score_percentage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 md:p-10 selection:bg-blue-600 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <Logo size="sm" />
          <button
            onClick={onReturnToDashboard}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* HERO SCORE BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${perfBadge.color}`}>
                  {perfBadge.label}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" /> +{result.xp_earned} XP Earned
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Exam Performance Summary
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md">
                Official simulation report calculated by DelightPrep Authoritative Scoring Model.
              </p>
            </div>

            {/* Score Ring / Display */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 border border-slate-200 min-w-[140px]">
              <span className="text-4xl sm:text-5xl font-black text-slate-900">
                {result.score_percentage}%
              </span>
              <span className="text-xs font-medium text-slate-500 mt-1">
                {result.correct_count} of {result.total_questions} Correct
              </span>
            </div>
          </div>

          {/* Quick Stat Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[11px] text-emerald-800 block font-medium">Correct</span>
              <span className="text-xl font-bold text-emerald-700 flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-4 h-4" /> {result.correct_count}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200">
              <span className="text-[11px] text-rose-800 block font-medium">Wrong</span>
              <span className="text-xl font-bold text-rose-700 flex items-center justify-center gap-1 mt-0.5">
                <XCircle className="w-4 h-4" /> {result.wrong_count}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-medium">Unanswered</span>
              <span className="text-xl font-bold text-slate-700 mt-0.5">
                {result.unanswered_count}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
              <span className="text-[11px] text-blue-800 block font-medium">Time Taken</span>
              <span className="text-xl font-bold text-blue-700 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-4 h-4" /> {formatTime(result.time_taken_seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* TABS: OVERVIEW VS QUESTION-BY-QUESTION REVIEW */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'overview'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Subject & Topic Mastery Breakdown
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'review'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
            }`}
          >
            Detailed Answers & Explanations ({result.total_questions})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & BREAKDOWNS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Subject Breakdowns */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Performance by Subject
              </h2>
              <div className="space-y-3">
                {result.subject_breakdowns.map(sb => (
                  <div key={sb.subject_id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1.5">
                      <span className="text-slate-900">{sb.subject_name}</span>
                      <span className="text-blue-700 font-bold">{sb.correct}/{sb.total} ({sb.score_percentage}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          sb.score_percentage >= 70 ? 'bg-emerald-600' : sb.score_percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${sb.score_percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Mastery & Weak Spots */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Topic Mastery Diagnostic
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.topic_breakdowns.map(tb => (
                  <div key={tb.topic_id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{tb.topic_name}</span>
                      <span className="text-[11px] text-slate-500">{tb.subject_name} • {tb.correct}/{tb.total} correct</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      tb.mastery_status === 'strong'
                        ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
                        : tb.mastery_status === 'average'
                          ? 'text-amber-800 bg-amber-50 border-amber-300'
                          : 'text-rose-800 bg-rose-50 border-rose-300'
                    }`}>
                      {tb.mastery_status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Next Actions */}
            <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span>Your Study Coach Recommendations</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {result.recommended_actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: DETAILED QUESTION REVIEW */}
        {activeTab === 'review' && (
          <div className="space-y-4">
            {allQuestions.slice(0, result.total_questions).map((q, idx) => {
              const isExpanded = expandedQuestionId === q.id;

              return (
                <div key={q.id} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div 
                    className="flex items-start justify-between gap-3 cursor-pointer"
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                          {q.question_text}
                        </p>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Subject: {q.subject_id.toUpperCase()} • Difficulty: {q.difficulty}
                        </span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-700 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 animate-fadeIn">
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = opt.is_correct;
                          return (
                            <div
                              key={opt.id}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                                  : 'bg-slate-50 border-slate-200 text-slate-600'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt.text}</span>
                              </div>
                              {isCorrect && (
                                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                                  Correct Answer
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Official Explanation */}
                      <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1 text-xs">
                        <span className="font-bold text-blue-900 block">Explanation:</span>
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onReturnToDashboard}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 font-semibold text-xs sm:text-sm text-slate-700 transition text-center shadow-2xs"
          >
            Back to Dashboard
          </button>

          <button
            onClick={onRetake}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 font-bold text-xs sm:text-sm text-white shadow-xs flex items-center justify-center gap-2 transition active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Another Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};

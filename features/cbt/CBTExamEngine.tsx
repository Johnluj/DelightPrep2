'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Question, ExamResult, StudentProfile } from '@/types/database';
import { getStoredQuestions, getStoredStudentProfile, saveStoredExamResult } from '@/lib/storage';
import { 
  Clock, 
  Save, 
  Flag, 
  Calculator, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  X,
  HelpCircle
} from 'lucide-react';

interface CBTExamEngineProps {
  onExamComplete: (result: ExamResult) => void;
  onExit: () => void;
}

export const CBTExamEngine: React.FC<CBTExamEngineProps> = ({ onExamComplete, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // question_id -> option_id
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  
  // Timer (Default 20 minutes for demo mock, can simulate official 120 mins)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(20 * 60);
  const [isExamActive, setIsExamActive] = useState<boolean>(true);
  
  // UI states
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [calcDisplay, setCalcDisplay] = useState<string>('0');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');

  // Anti-cheating tab-switch tracking
  const [tabSwitchCount, setTabSwitchCount] = useState<number>(0);
  const [showTabSwitchWarning, setShowTabSwitchWarning] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load published questions
    const all = getStoredQuestions().filter(q => q.review_status === 'published');
    // For demo session, load up to 20 realistic curriculum questions
    setQuestions(all.slice(0, 20));
  }, []);

  // Timer interval
  useEffect(() => {
    if (!isExamActive) return;

    timerRef.current = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleSubmitExam(true); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isExamActive]);

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isExamActive) {
        setTabSwitchCount(prev => {
          const next = prev + 1;
          setShowTabSwitchWarning(true);
          return next;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isExamActive]);

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    setAutosaveStatus('saving');
    setAnswers(prev => {
      const next = { ...prev, [currentQuestion.id]: optionId };
      // Autosave simulated delay
      setTimeout(() => setAutosaveStatus('saved'), 300);
      return next;
    });
  };

  const toggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCalculatorPress = (btn: string) => {
    if (btn === 'C') {
      setCalcDisplay('0');
    } else if (btn === '=') {
      try {
        // Safe evaluation of simple math
        const sanitized = calcDisplay.replace(/[^0-9+\-*/.]/g, '');
        // eslint-disable-next-line no-eval
        const result = Function(`'use strict'; return (${sanitized})`)();
        setCalcDisplay(String(result));
      } catch {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay(prev => (prev === '0' || prev === 'Error' ? btn : prev + btn));
    }
  };

  const handleSubmitExam = async (forcedByTimeout: boolean = false) => {
    setIsExamActive(false);
    setIsSubmitting(true);
    setShowSubmitModal(false);

    try {
      const timeTaken = 20 * 60 - secondsRemaining;
      const res = await fetch('/api/exams/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          questionIds: questions.map(q => q.id),
          timeTakenSeconds: timeTaken,
          userId: 'std-user'
        })
      });

      const data = await res.json();
      if (data.success && data.result) {
        const resultRecord: ExamResult = {
          id: `res-${Date.now()}`,
          session_id: `ses-${Date.now()}`,
          user_id: 'std-user',
          total_questions: data.result.totalQuestions,
          correct_count: data.result.correctCount,
          wrong_count: data.result.wrongCount,
          unanswered_count: data.result.unansweredCount,
          score_percentage: data.result.scorePercentage,
          time_taken_seconds: data.result.timeTakenSeconds,
          subject_breakdowns: [
            {
              subject_id: 's-mth',
              subject_name: 'General Mathematics',
              total: data.result.totalQuestions,
              correct: data.result.correctCount,
              score_percentage: data.result.scorePercentage
            }
          ],
          topic_breakdowns: [
            {
              topic_id: 'top-1',
              topic_name: 'Core Curriculum',
              subject_name: 'Comprehensive',
              total: data.result.totalQuestions,
              correct: data.result.correctCount,
              mastery_status: data.result.scorePercentage >= 70 ? 'strong' : data.result.scorePercentage >= 50 ? 'average' : 'weak'
            }
          ],
          recommended_actions: [
            'Revise formula derivations and quadratic factorization steps.',
            'Increase time allocation on calculation questions.'
          ],
          xp_earned: data.result.xpEarned,
          created_at: new Date().toISOString()
        };

        saveStoredExamResult(resultRecord);
        onExamComplete(resultRecord);
      }
    } catch (err) {
      console.error('Submission scoring error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  if (questions.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-xs font-semibold text-slate-600">Loading Official CBT Test Papers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      
      {/* Top CBT System Header */}
      <header className="sticky top-0 z-40 bg-[#0A192F] text-white border-b border-slate-800 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3">
            <span className="font-black text-sm tracking-wide text-blue-400">DELIGHTPREP CBT</span>
            <span className="text-slate-500">|</span>
            <span className="font-semibold text-slate-200">JAMB UTME Mock Exam Simulation</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Autosave badge */}
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
              <Save className="w-3.5 h-3.5" />
              <span>{autosaveStatus === 'saving' ? 'Saving...' : 'Autosaved'}</span>
            </div>

            {/* Countdown Timer */}
            <div className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 font-mono font-bold text-xs sm:text-sm border transition ${
              secondsRemaining < 300 
                ? 'bg-red-950/80 border-red-500 text-red-300 animate-pulse' 
                : 'bg-slate-800 border-slate-700 text-slate-100'
            }`}>
              <Clock className="w-4 h-4 text-red-400" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            {/* Calculator Toggle */}
            <button
              id="btn-cbt-calculator"
              onClick={() => setShowCalculator(!showCalculator)}
              className={`p-1.5 rounded-lg border transition ${
                showCalculator 
                  ? 'bg-blue-600 border-blue-400 text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title="CBT On-Screen Calculator"
            >
              <Calculator className="w-4 h-4" />
            </button>

            {/* End Exam Button */}
            <button
              id="btn-cbt-submit"
              onClick={() => setShowSubmitModal(true)}
              className="rounded-xl bg-red-600 hover:bg-red-500 px-3.5 py-1.5 text-xs font-bold text-white transition active:scale-95 shadow-xs"
            >
              Submit Exam
            </button>
          </div>

        </div>
      </header>

      {/* Main CBT Workspace */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left 3 Cols: Active Question Display */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Question Index & Flag bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">Single Choice (4 Options)</span>
                </div>

                <button
                  id="btn-cbt-flag"
                  onClick={toggleFlag}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
                    flaggedQuestions[currentQuestion.id]
                      ? 'bg-amber-50 border-amber-400 text-amber-800'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQuestion.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{flaggedQuestions[currentQuestion.id] ? 'Flagged for Review' : 'Flag Question'}</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed pt-2">
                {currentQuestion.question_text}
              </div>

              {/* Optional Diagram */}
              {currentQuestion.image_url && (
                <div className="my-3 max-w-md rounded-xl border border-slate-200 overflow-hidden">
                  <img src={currentQuestion.image_url} alt="Question figure" className="w-full h-auto" />
                </div>
              )}

              {/* Options Radio List */}
              <div className="space-y-3 pt-3">
                {currentQuestion.options.map((option, idx) => {
                  const label = ['A', 'B', 'C', 'D', 'E'][idx] || 'A';
                  const isSelected = answers[currentQuestion.id] === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center gap-3.5 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold ring-2 ring-blue-600/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {label}
                      </span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition disabled:opacity-40 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={currentIndex === questions.length - 1}
                className="px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-blue-600 text-xs font-bold text-white transition disabled:opacity-40 flex items-center gap-1.5 shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right 1 Col: Question Navigator Grid & Controls */}
          <div className="space-y-4">
            
            {/* Calculator Drawer */}
            {showCalculator && (
              <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                  <span>CBT Calculator</span>
                  <button onClick={() => setShowCalculator(false)} className="text-slate-500 hover:text-white">✕</button>
                </div>
                <div className="bg-slate-800 p-3 rounded-xl text-right font-mono text-base font-bold text-emerald-400 overflow-x-auto">
                  {calcDisplay}
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-xs font-bold">
                  {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map(key => (
                    <button
                      key={key}
                      onClick={() => handleCalculatorPress(key)}
                      className={`p-2 rounded-lg text-center transition ${
                        key === '=' ? 'bg-emerald-600 text-white col-span-1' :
                        key === 'C' ? 'bg-red-600 text-white' :
                        ['+','-','*','/'].includes(key) ? 'bg-blue-600 text-white' :
                        'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigator Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-900">Question Navigator</span>
                <span className="text-slate-500">{answeredCount}/{questions.length} Answered</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = Boolean(answers[q.id]);
                  const isFlagged = Boolean(flaggedQuestions[q.id]);

                  let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isCurrent) {
                    btnStyle = 'bg-blue-600 text-white font-bold ring-2 ring-blue-600 ring-offset-1';
                  } else if (isFlagged) {
                    btnStyle = 'bg-amber-500 text-white font-bold';
                  } else if (isAnswered) {
                    btnStyle = 'bg-emerald-600 text-white font-semibold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-8 rounded-lg text-xs transition flex items-center justify-center ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-600 shrink-0" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-100 border shrink-0" />
                  <span>Unanswered ({unansweredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-500 shrink-0" />
                  <span>Flagged ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-blue-600 shrink-0" />
                  <span>Current</span>
                </div>
              </div>
            </div>

            {/* Quick exam tips */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>CBT Shortcut Keys</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Use <strong>A, B, C, D</strong> on your keyboard to pick an option. Press <strong>N</strong> for Next, <strong>P</strong> for Previous.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Tab Switch Warning Modal */}
      {showTabSwitchWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-amber-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Focus Mode Interruption</h3>
              <p className="text-xs text-slate-600 mt-1">
                You navigated away from the exam tab. Official JAMB & WAEC CBT centers log browser switches as potential infractions.
              </p>
              <div className="mt-3 text-xs font-bold text-amber-700 bg-amber-50 py-1.5 rounded-lg">
                Infraction count: {tabSwitchCount}
              </div>
            </div>
            <button
              onClick={() => setShowTabSwitchWarning(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
            >
              Resume Exam
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Submit Exam Session?</h3>
                <p className="text-xs text-slate-500">Your answers will be sent for authoritative server-side scoring.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Answered Questions:</span>
                <span className="font-bold text-emerald-600">{answeredCount} of {questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unanswered Questions:</span>
                <span className="font-bold text-amber-600">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Remaining:</span>
                <span className="font-mono font-bold text-slate-700">{formatTime(secondsRemaining)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                Note: You still have <strong>{unansweredCount} unanswered questions</strong>. In JAMB and WAEC, there is no negative marking, so it is always better to guess!
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Return to Exam
              </button>
              <button
                onClick={() => handleSubmitExam(false)}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Grading...' : 'Yes, Submit Final Score'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

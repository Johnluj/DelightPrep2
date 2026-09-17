'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  ShieldAlert, 
  RotateCcw,
  Check,
  Send,
  HelpCircle,
  Maximize2,
  Minimize2,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { SEED_SUBJECTS } from '@/lib/seed-data';
import { Logo } from '@/components/brand/Logo';
import { ExamResult } from '@/types/database';

interface CBTExamRunnerProps {
  onExamSubmitted: (result: ExamResult) => void;
  onExit: () => void;
}

export const CBTExamRunner: React.FC<CBTExamRunnerProps> = ({ onExamSubmitted, onExit }) => {
  const { 
    activeSession, 
    selectAnswer, 
    toggleFlagQuestion, 
    logTabSwitch, 
    submitExamSession, 
    abandonExamSession,
    questions: allCatalogQuestions,
    reportQuestion
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    activeSession?.time_remaining_seconds || 1800
  );
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('wrong_answer');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const [tabWarning, setTabWarning] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Learning mode AI explanation state
  const [aiExplanationLoading, setAiExplanationLoading] = useState(false);
  const [aiExplanationData, setAiExplanationData] = useState<any | null>(null);

  // Online / offline detector
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Anti-cheating: tab switch / visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && activeSession?.mode === 'cbt_exam') {
        logTabSwitch();
        setTabWarning(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activeSession?.mode, logTabSwitch]);

  // Countdown timer
  useEffect(() => {
    if (!activeSession || activeSession.mode === 'learning') return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Auto submit on timeout
          const res = submitExamSession();
          onExamSubmitted(res);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, submitExamSession, onExamSubmitted]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const sessionSubjects = useMemo(() => {
    if (!activeSession) return [];
    const map = new Map<string, number>();
    activeSession.questions.forEach(q => {
      map.set(q.subject_id, (map.get(q.subject_id) || 0) + 1);
    });
    return Array.from(map.entries()).map(([subId, count]) => {
      const s = SEED_SUBJECTS.find(sub => sub.id === subId);
      return {
        id: subId,
        name: s?.name || subId.toUpperCase(),
        code: s?.code || subId.toUpperCase(),
        count
      };
    });
  }, [activeSession]);

  if (!activeSession || activeSession.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-md w-full flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-amber-600 mb-4" />
          <h2 className="text-xl font-bold text-slate-900">No Active Examination Session</h2>
          <p className="text-sm text-slate-500 mt-2">There is currently no running exam session. Return to your student dashboard to start practice.</p>
          <button
            onClick={onExit}
            className="mt-6 px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-xs transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQ = activeSession.questions[currentIndex];
  const origId = currentQ?.original_question_id || currentQ?.question_id;
  const originalQ = allCatalogQuestions.find(q => q.id === origId || q.id === currentQ?.question_id);
  const selectedOptionId = activeSession.answers[currentQ.question_id];
  const isFlagged = activeSession.flagged_question_ids.includes(currentQ.question_id);

  // Formatting time
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining < 300; // < 5 minutes

  // Compute session stats for submission confirmation
  const totalCount = activeSession.questions.length;
  const answeredCount = Object.keys(activeSession.answers).length;
  const unansweredCount = totalCount - answeredCount;
  const flaggedCount = activeSession.flagged_question_ids.length;

  const handleSelect = (optionId: string) => {
    selectAnswer(currentQ.question_id, optionId);
    setAiExplanationData(null); // reset AI explanation for new answer
  };

  const handleFinalSubmit = () => {
    setShowSubmitModal(false);
    const result = submitExamSession();
    onExamSubmitted(result);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reportQuestion(currentQ.question_id, reportReason, reportDetails);
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setReportDetails('');
    }, 1500);
  };

  // Request AI breakdown in Learning Mode
  const fetchAiExplanation = async () => {
    if (!originalQ) return;
    setAiExplanationLoading(true);
    try {
      const res = await fetch('/api/ai/explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: originalQ.question_text,
          options: originalQ.options.map(o => ({
            id: o.id,
            text: o.text,
            isCorrect: o.is_correct
          })),
          subjectName: originalQ.subject_id.toUpperCase()
        })
      });
      const data = await res.json();
      setAiExplanationData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAiExplanationLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Offline state notice banner if disconnected */}
      {!isOnline && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>You are currently offline. Answers are safely autosaved in your browser and will sync upon reconnection.</span>
        </div>
      )}

      {/* Tab switch warning alert */}
      {tabWarning && (
        <div className="bg-rose-50 border-b border-rose-200 text-rose-800 px-4 py-2.5 text-xs font-medium flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>
              <strong>Examination Integrity Warning:</strong> Window or tab switch detected ({activeSession.tab_switch_count} events recorded for proctor audit). Please keep focus on the exam window.
            </span>
          </div>
          <button
            onClick={() => setTabWarning(false)}
            className="text-xs px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* TOP CBT HEADER BAR */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div className="hidden sm:block border-l border-slate-200 pl-3">
            <span className="text-xs font-bold text-slate-800">
              {activeSession.mode === 'learning' ? 'Learning Mode' : 'CBT Official Simulation'}
            </span>
            <span className="text-[11px] text-slate-500 block">
              {currentQ.subject_id.toUpperCase()} • Q{currentIndex + 1} of {totalCount}
            </span>
          </div>
        </div>

        {/* Center: Timer (in Exam Mode) */}
        {activeSession.mode !== 'learning' ? (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base ${
            isLowTime 
              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
              : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}>
            <Clock className="w-4 h-4 text-slate-600" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>
        ) : (
          <div className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            Interactive Learning Mode
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="hidden sm:flex p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-xs items-center"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            id="btn-report-question"
            onClick={() => setShowReportModal(true)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-amber-700 text-xs font-medium flex items-center gap-1 transition border border-slate-200"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Report</span>
          </button>

          <button
            id="btn-submit-exam"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-xs sm:text-sm text-white shadow-xs active:scale-98 transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* MAIN CBT WORKING AREA */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Main Question Container (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs relative">
            {/* Question Header meta */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Question {currentIndex + 1}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Subject: <strong className="text-slate-900">{currentQ.subject_id.toUpperCase()}</strong>
                </span>
              </div>

              <button
                id="btn-flag-question"
                onClick={() => toggleFlagQuestion(currentQ.question_id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  isFlagged
                    ? 'bg-amber-50 border border-amber-300 text-amber-800'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
                }`}
              >
                <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed mb-6 whitespace-pre-line">
              {currentQ.question_text}
            </div>

            {/* If question has an illustration/diagram */}
            {currentQ.image_url && (
              <div className="mb-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 max-w-md mx-auto">
                <img src={currentQ.image_url} alt="Question Diagram" className="w-full object-contain max-h-60" />
              </div>
            )}

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map(opt => {
                const isSelected = selectedOptionId === opt.id;
                const isLearningMode = activeSession.mode === 'learning';
                
                // In learning mode: show correct/wrong state if selected
                const originalOption = originalQ?.options.find(o => o.id === opt.id);
                const isCorrectOption = originalOption?.is_correct;

                let optionStyles = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
                if (isSelected) {
                  if (isLearningMode) {
                    optionStyles = isCorrectOption 
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                      : 'bg-rose-50 border-rose-500 text-rose-900 ring-1 ring-rose-500';
                  } else {
                    optionStyles = 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-600 shadow-xs';
                  }
                } else if (isLearningMode && selectedOptionId && isCorrectOption) {
                  // Reveal correct answer if wrong answer was picked in learning mode
                  optionStyles = 'bg-emerald-50/70 border-emerald-400 text-emerald-900';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-left flex items-center justify-between gap-3 transition active:scale-[0.99] ${optionStyles}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {opt.display_label}
                      </div>
                      <span className="text-sm sm:text-base font-normal leading-snug">
                        {opt.text}
                      </span>
                    </div>

                    {isLearningMode && isSelected && (
                      <div className="flex-shrink-0">
                        {isCorrectOption ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600" />
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Autosave subtle confirmation */}
            <div className="flex items-center justify-between mt-4 pt-3 text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <Check className="w-3.5 h-3.5" />
                Autosaved to device & server
              </span>
              <span>Question ID: {currentQ.question_id}</span>
            </div>
          </div>

          {/* LEARNING MODE INSTANT EXPLANATION & COACH ENHANCEMENT */}
          {activeSession.mode === 'learning' && selectedOptionId && (
            <div className="bg-white rounded-2xl border border-blue-200 p-5 space-y-3 shadow-xs animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Official Explanation & Syllabus Rule</span>
                </div>
                {!aiExplanationData && (
                  <button
                    onClick={fetchAiExplanation}
                    disabled={aiExplanationLoading}
                    className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                    <span>{aiExplanationLoading ? 'Tutor Analyzing...' : 'Senior Tutor Breakdown'}</span>
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-200">
                {originalQ?.explanation || 'Detailed mathematical/grammatical solution provided by DelightPrep editors.'}
              </p>

              {aiExplanationData && (
                <div className="mt-3 p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                    <span>DelightPrep Senior Tutor Key Insights:</span>
                  </div>
                  <div className="text-slate-800">
                    <strong className="text-blue-800">Key Rule:</strong> {aiExplanationData.keyRule}
                  </div>
                  <div className="text-slate-800">
                    <strong className="text-rose-700">Common Trap:</strong> {aiExplanationData.commonMistake}
                  </div>
                  <div className="text-slate-800">
                    <strong className="text-emerald-800">Memory Hook:</strong> {aiExplanationData.memoryHook}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* QUESTION PREVIOUS / NEXT NAVIGATION BAR */}
          <div className="flex items-center justify-between py-2">
            <button
              id="btn-prev-question"
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex(prev => Math.max(0, prev - 1));
                setAiExplanationData(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm text-slate-700 flex items-center gap-1.5 transition shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-500 font-medium">
              {currentIndex + 1} of {totalCount}
            </span>

            <button
              id="btn-next-question"
              disabled={currentIndex === totalCount - 1}
              onClick={() => {
                setCurrentIndex(prev => Math.min(totalCount - 1, prev + 1));
                setAiExplanationData(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm text-white flex items-center gap-1.5 transition shadow-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right CBT Question Navigator (4 cols on lg) */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between h-fit space-y-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Question Navigator
              </h3>
              <span className="text-xs font-bold text-emerald-600">
                {answeredCount}/{totalCount} answered
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 my-3 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-600" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span>Flagged ({flaggedCount})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full ring-2 ring-blue-600 bg-white" />
                <span>Current</span>
              </div>
            </div>

            {/* Subject Selector Tabs if multiple subjects */}
            {sessionSubjects.length > 1 && (
              <div className="flex flex-wrap gap-1.5 mb-3 p-1.5 rounded-xl bg-slate-50 border border-slate-200">
                {sessionSubjects.map(s => {
                  const isActive = currentQ.subject_id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        const targetIdx = activeSession.questions.findIndex(q => q.subject_id === s.id);
                        if (targetIdx >= 0) {
                          setCurrentIndex(targetIdx);
                          setAiExplanationData(null);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>{s.code}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'}`}>
                        {s.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Question Grid Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
              {activeSession.questions.map((q, idx) => {
                const isAnswered = Boolean(activeSession.answers[q.question_id]);
                const isQFlagged = activeSession.flagged_question_ids.includes(q.question_id);
                const isCurrent = idx === currentIndex;

                let btnStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100';
                if (isAnswered) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                }
                if (isQFlagged) {
                  btnStyle = 'bg-amber-500 text-white font-bold border-amber-500';
                }
                if (isCurrent) {
                  btnStyle += ' ring-2 ring-blue-600 ring-offset-2 ring-offset-white font-bold';
                }

                return (
                  <button
                    key={q.question_id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setAiExplanationData(null);
                    }}
                    className={`h-9 rounded-lg border text-xs font-semibold flex items-center justify-center transition active:scale-95 ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Exit / Save & Pause */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                if (confirm('Are you sure you want to pause and leave? Your progress is safely preserved to resume anytime.')) {
                  onExit();
                }
              }}
              className="text-slate-500 hover:text-slate-800 transition underline font-medium"
            >
              Save & Exit to Dashboard
            </button>
            <button
              onClick={() => {
                if (confirm('Abandon this exam attempt? No result will be recorded.')) {
                  abandonExamSession();
                  onExit();
                }
              }}
              className="text-rose-600 hover:text-rose-700 transition text-[11px] font-medium"
            >
              Abandon
            </button>
          </div>
        </aside>
      </main>

      {/* SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Ready to Submit Examination?</h3>
                <p className="text-xs text-slate-500">Review your exam summary before official submission.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center py-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="p-2">
                <span className="text-xs text-slate-500 block">Answered</span>
                <span className="text-xl font-bold text-emerald-600">{answeredCount}</span>
              </div>
              <div className="p-2 border-x border-slate-200">
                <span className="text-xs text-slate-500 block">Unanswered</span>
                <span className="text-xl font-bold text-rose-600">{unansweredCount}</span>
              </div>
              <div className="p-2">
                <span className="text-xs text-slate-500 block">Flagged</span>
                <span className="text-xl font-bold text-amber-600">{flaggedCount}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>You still have {unansweredCount} unanswered questions. Once submitted, answers cannot be altered.</span>
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold"
              >
                Return to Exam
              </button>
              <button
                id="btn-confirm-submit"
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-xs text-white shadow-xs active:scale-98 transition"
              >
                Confirm & View Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT QUESTION MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-slate-900 text-sm">Report Question {currentIndex + 1}</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {reportSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center">
                Report logged successfully. Our Content Editors and Editorial Panel will review this question.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Reason for Report</label>
                  <select
                    value={reportReason}
                    onChange={e => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-blue-600"
                  >
                    <option value="wrong_answer">Wrong Answer Marked as Correct</option>
                    <option value="wrong_explanation">Explanation Error / Misleading Solution</option>
                    <option value="typo">Typo or Grammatical Mistake</option>
                    <option value="broken_image">Missing or Broken Image/Formula</option>
                    <option value="ambiguous_question">Ambiguous / Multiple Answers</option>
                    <option value="outdated">Outdated Syllabus Question</option>
                    <option value="other">Other Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Details (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe what is incorrect to help editors fix it quickly..."
                    value={reportDetails}
                    onChange={e => setReportDetails(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 font-bold text-xs text-white"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

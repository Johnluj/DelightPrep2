'use client';

import React, { useState, useEffect } from 'react';
import { Question, Subject, DifficultyLevel } from '@/types/database';
import { QuestionService } from '@/services/questionService';
import { SENIOR_CURRICULUM_SUBJECTS, JUNIOR_CURRICULUM_SUBJECTS } from '@/types/curriculum';
import { saveStoredQuestionReport } from '@/lib/storage';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Flag, 
  Lightbulb, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  BookOpen,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

interface PracticeRoomProps {
  initialSubjectId?: string;
  onNavigateHome?: () => void;
}

export const PracticeRoom: React.FC<PracticeRoomProps> = ({ initialSubjectId, onNavigateHome }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(initialSubjectId || 's-mth');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Interaction State for current question
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);
  const [isAIExplaining, setIsAIExplaining] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<any | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('wrong_answer');
  const [reportDetails, setReportDetails] = useState<string>('');
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  // Load questions when filter changes
  useEffect(() => {
    const fetched = QuestionService.getQuestions({
      subjectId: selectedSubjectId,
      difficulty: selectedDifficulty === 'all' ? undefined : (selectedDifficulty as DifficultyLevel),
      randomize: false,
    });
    setQuestions(fetched);
    setCurrentIndex(0);
    resetQuestionState();
  }, [selectedSubjectId, selectedDifficulty]);

  const resetQuestionState = () => {
    setSelectedOptionId(null);
    setIsAnswerRevealed(false);
    setIsAIExplaining(false);
    setAiExplanation(null);
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerRevealed) return;
    setSelectedOptionId(optionId);
    setIsAnswerRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      resetQuestionState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      resetQuestionState();
    }
  };

  const handleRequestAITutor = async () => {
    if (!currentQuestion) return;
    setIsAIExplaining(true);

    try {
      const correctOption = currentQuestion.options.find(o => o.is_correct);
      const res = await fetch('/api/ai/explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: currentQuestion.question_text,
          options: currentQuestion.options.map((o, idx) => ({
            label: ['A', 'B', 'C', 'D'][idx] || 'A',
            text: o.text
          })),
          correctAnswerText: correctOption?.text || 'Correct Option',
          subject: currentQuestion.subject_id,
          topic: currentQuestion.topic_id || 'Practice'
        })
      });

      const data = await res.json();
      if (data.success && data.explanation) {
        setAiExplanation(data.explanation);
      }
    } catch (err) {
      console.error('AI Tutor request failed:', err);
    } finally {
      setIsAIExplaining(false);
    }
  };

  const handleSubmitReport = () => {
    if (!currentQuestion) return;
    saveStoredQuestionReport({
      id: `rep-${Date.now()}`,
      question_id: currentQuestion.id,
      user_id: 'std-user',
      reason: reportReason as any,
      details: reportDetails,
      status: 'pending',
      created_at: new Date().toISOString()
    });
    setReportSubmitted(true);
    setTimeout(() => {
      setReportSubmitted(false);
      setReportModalOpen(false);
      setReportDetails('');
    }, 1500);
  };

  const allSubjects = [...SENIOR_CURRICULUM_SUBJECTS, ...JUNIOR_CURRICULUM_SUBJECTS];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
            Interactive Practice Room
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Curriculum Revision & Learning Mode
          </h1>
          <p className="text-xs text-slate-500">
            Immediate pedagogical feedback, step-by-step working, and AI tutor assistance.
          </p>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Subject Filter */}
          <select
            value={selectedSubjectId}
            onChange={e => setSelectedSubjectId(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:outline-hidden focus:border-blue-500"
          >
            {allSubjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs focus:outline-hidden focus:border-blue-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Meta Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <span>•</span>
              <span className="capitalize font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {currentQuestion.exam_target || 'Curriculum Drill'} {currentQuestion.year || ''}
              </span>
              <span className="capitalize font-medium text-slate-500">
                Difficulty: {currentQuestion.difficulty}
              </span>
            </div>

            <button
              onClick={() => setReportModalOpen(true)}
              className="flex items-center gap-1 text-slate-400 hover:text-red-600 transition"
              title="Report question error"
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="text-[11px]">Report</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            {currentQuestion.question_text}
          </div>

          {/* Image if any */}
          {currentQuestion.image_url && (
            <div className="my-4 max-w-md rounded-xl overflow-hidden border border-slate-200">
              <img src={currentQuestion.image_url} alt="Question diagram" className="w-full h-auto" />
            </div>
          )}

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((option, idx) => {
              const label = ['A', 'B', 'C', 'D', 'E'][idx] || 'A';
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.is_correct;

              let optionStyle = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50';
              let badgeStyle = 'bg-slate-100 text-slate-700';

              if (isAnswerRevealed) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500 font-bold';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-red-500 bg-red-50/70 text-red-950 ring-1 ring-red-500';
                  badgeStyle = 'bg-red-600 text-white';
                } else {
                  optionStyle = 'opacity-60 border-slate-200 bg-white text-slate-400';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isAnswerRevealed}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${badgeStyle}`}>
                      {label}
                    </span>
                    <span>{option.text}</span>
                  </div>

                  {isAnswerRevealed && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Authoritative Educational Explanation Section (Visible upon selection) */}
          {isAnswerRevealed && (
            <div className="mt-6 rounded-2xl bg-blue-50/60 border border-blue-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-blue-700" />
                  <span>Authoritative Solution & Working</span>
                </div>
                <button
                  onClick={handleRequestAITutor}
                  disabled={isAIExplaining}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAIExplaining ? 'Tutor Analyzing...' : 'Deep AI Breakdown'}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {currentQuestion.explanation}
              </div>

              {/* AI Tutor breakdown if returned */}
              {aiExplanation && (
                <div className="mt-4 pt-4 border-t border-blue-200/80 space-y-3 bg-white/70 p-4 rounded-xl border">
                  <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Gemini AI Tutor Concept Breakdown</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-700">Step-by-Step Logic:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                        {aiExplanation.stepByStepSolution?.map((step: string, i: number) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    {aiExplanation.keyConcept && (
                      <p className="text-slate-700">
                        <strong>Key Concept:</strong> {aiExplanation.keyConcept}
                      </p>
                    )}

                    {aiExplanation.commonPitfall && (
                      <p className="text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                        <strong>Common Student Pitfall:</strong> {aiExplanation.commonPitfall}
                      </p>
                    )}

                    {aiExplanation.examTip && (
                      <p className="text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                        <strong>Exam Day Tip:</strong> {aiExplanation.examTip}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition disabled:opacity-40 flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="px-6 py-2.5 rounded-xl bg-[#0A192F] hover:bg-blue-600 text-xs font-bold text-white transition disabled:opacity-40 flex items-center gap-1.5 shadow-xs"
            >
              <span>Next Question</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No questions found for this filter</h3>
          <p className="text-xs text-slate-500 mt-1">Try selecting another subject or setting difficulty to "All".</p>
        </div>
      )}

      {/* Report Question Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">Report Question Issue</h3>
              <button onClick={() => setReportModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {reportSubmitted ? (
              <div className="py-6 text-center text-emerald-600 text-sm font-semibold flex flex-col items-center gap-2">
                <Check className="w-6 h-6" />
                <span>Thank you! Report logged for academic review.</span>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Type</label>
                  <select
                    value={reportReason}
                    onChange={e => setReportReason(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                  >
                    <option value="wrong_answer">Wrong Answer Key</option>
                    <option value="typo">Typo in Question / Options</option>
                    <option value="broken_image">Broken / Missing Diagram</option>
                    <option value="ambiguous_question">Ambiguous or Unclear Wording</option>
                    <option value="outdated">Outdated Syllabus Topic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Details (Optional)</label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={e => setReportDetails(e.target.value)}
                    placeholder="Provide details about why you believe this question is incorrect..."
                    className="w-full rounded-xl border border-slate-300 p-2 text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setReportModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReport}
                    className="px-4 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                  >
                    Submit Report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

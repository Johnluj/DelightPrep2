'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Play, 
  GraduationCap, 
  ArrowLeft, 
  Target,
  BookOpen,
  Award
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { StudyPlanItem } from '@/types/database';

interface StudyPlanViewProps {
  onBack: () => void;
  onStartPractice: (subjectId: string) => void;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const StudyPlanView: React.FC<StudyPlanViewProps> = ({ onBack, onStartPractice }) => {
  const { studentProfile } = useApp();

  const [completedDays, setCompletedDays] = useState<number[]>([1, 2]); // Monday & Tuesday completed

  const planItems: StudyPlanItem[] = [
    { id: 'sp_1', day_of_week: 1, subject_id: 'mat', subject_name: 'Mathematics', topic_name: 'Quadratic Equations & Polynomials', target_questions: 25, estimated_minutes: 40, is_completed: true },
    { id: 'sp_2', day_of_week: 2, subject_id: 'phy', subject_name: 'Physics', topic_name: 'Mechanics: Vectors & Projectile Motion', target_questions: 20, estimated_minutes: 35, is_completed: true },
    { id: 'sp_3', day_of_week: 3, subject_id: 'che', subject_name: 'Chemistry', topic_name: 'Stoichiometry & Mole Concept', target_questions: 25, estimated_minutes: 40, is_completed: false },
    { id: 'sp_4', day_of_week: 4, subject_id: 'bio', subject_name: 'Biology', topic_name: 'Genetics, Heredity & Variation', target_questions: 30, estimated_minutes: 45, is_completed: false },
    { id: 'sp_5', day_of_week: 5, subject_id: 'eng', subject_name: 'English Language', topic_name: 'Lexis & Structure + Oral English Vowels', target_questions: 35, estimated_minutes: 45, is_completed: false },
    { id: 'sp_6', day_of_week: 6, subject_id: 'mat', subject_name: 'All Subjects (Official Mock)', topic_name: 'Weekly Full CBT Simulation (Timed)', target_questions: 60, estimated_minutes: 75, is_completed: false },
    { id: 'sp_0', day_of_week: 0, subject_id: 'eng', subject_name: 'Rest & Weak Area Revision', topic_name: 'Review Mistakes & Flashcards', target_questions: 15, estimated_minutes: 25, is_completed: false },
  ];

  const toggleDayCompletion = (day: number) => {
    setCompletedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const progressPercent = Math.round((completedDays.length / 7) * 100);

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto pb-12">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          Weekly Adaptive Schedule
        </span>
      </div>

      {/* Plan Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personalized 7-Day Study Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
            Calculated for <strong>{studentProfile?.target_exam || 'JAMB'}</strong> with a daily target of {studentProfile?.daily_study_minutes || 45} minutes.
          </p>
        </div>

        <div className="flex items-center gap-4 min-w-[160px]">
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Weekly Progress</span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{progressPercent}%</span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center relative">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Days Schedule */}
      <div className="space-y-3">
        {planItems.map(item => {
          const dayNum = Number(item.day_of_week);
          const isDone = completedDays.includes(dayNum);
          const dayName = DAYS_OF_WEEK[dayNum] || 'Daily Practice';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <button
                  onClick={() => toggleDayCompletion(dayNum)}
                  title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition flex-shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-blue-500'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {dayName}
                    </span>
                    <span className="text-xs font-medium text-slate-400">• {item.estimated_minutes} mins</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">
                    {item.subject_name}: <span className="font-normal text-slate-600 dark:text-slate-300">{item.topic_name}</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Goal: Solve {item.target_questions} curriculum questions
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => onStartPractice(item.subject_id)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition active:scale-98"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Practice</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coach Study Advice */}
      <div className="p-5 rounded-3xl bg-white border border-blue-200 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-blue-800 font-bold text-xs uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-blue-700" />
          <span>DelightPrep Senior Coach Study Advice</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          &ldquo;Consistency beats cramming every single time. By practicing 40 minutes per day on weekdays and completing your Saturday mock, your retention rate increases by 300% for the real exam hall.&rdquo;
        </p>
      </div>
    </div>
  );
};

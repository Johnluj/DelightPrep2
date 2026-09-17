'use client';

import React, { useState, useEffect } from 'react';
import { 
  StudentProfile, 
  UserProfile, 
  ExamResult, 
  StudyPlanItem 
} from '@/types/database';
import { 
  getStoredCurrentUser, 
  getStoredStudentProfile, 
  getStoredExamResults, 
  getStoredStudyPlan,
  saveStoredStudyPlan
} from '@/lib/storage';
import { 
  BookOpen, 
  Clock, 
  Flame, 
  Award, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  ChevronRight,
  Zap,
  Target,
  Calendar
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (tab: string, extraData?: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredCurrentUser());
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(() => getStoredStudentProfile());
  const [recentResults, setRecentResults] = useState<ExamResult[]>(() => getStoredExamResults());
  const [studyPlanItems, setStudyPlanItems] = useState<StudyPlanItem[]>(() => getStoredStudyPlan());

  // Dynamic greeting based on time of day in Nigeria
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const studentName = currentUser?.full_name?.split(' ')[0] || 'Student';
  const streakDays = studentProfile?.streak_days || 4;
  const userXP = studentProfile?.xp || 380;
  const targetExam = studentProfile?.target_exam || 'JAMB';

  const toggleStudyItem = (id: string) => {
    const updated = studyPlanItems.map(item => 
      item.id === id ? { ...item, is_completed: !item.is_completed } : item
    );
    setStudyPlanItems(updated);
    saveStoredStudyPlan(updated);
  };

  const completedToday = studyPlanItems.filter(i => i.is_completed).length;
  const totalPlannedToday = studyPlanItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0A192F] via-[#0E244D] to-[#1D4ED8] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-200 border border-blue-400/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Target Exam: <strong>{targetExam}</strong></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {getGreeting()}, {studentName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
            Ready to sharpen your accuracy? You have 2 high-yield topics scheduled for today’s practice.
          </p>
        </div>

        {/* Quick Stats in Banner */}
        <div className="flex items-center gap-3 sm:gap-4 z-10 self-start sm:self-auto">
          {/* Streak Counter */}
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">Daily Streak</div>
              <div className="text-lg font-black text-white">{streakDays} Days 🔥</div>
            </div>
          </div>

          {/* XP Counter */}
          <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-5 h-5 fill-blue-400" />
            </div>
            <div>
              <div className="text-xs text-slate-300 font-medium">Delight XP</div>
              <div className="text-lg font-black text-emerald-400">{userXP} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Hub Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Today's Daily Challenge */}
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-b from-amber-50/50 to-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                Daily High-Yield Challenge
              </span>
              <span className="text-xs font-black text-amber-700">+80 XP</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Mathematics: Quadratic Equations & Logarithms
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              10 fast-paced questions selected from past JAMB & WAEC exams. Complete before midnight to preserve your streak!
            </p>
          </div>
          <button
            onClick={() => onNavigate('practice', { subjectId: 's-mth', mode: 'learning' })}
            className="mt-5 w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Daily Challenge</span>
          </button>
        </div>

        {/* Card 2: Full CBT Exam Simulator */}
        <div className="rounded-2xl border border-blue-200/80 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-md">
                Official Mock CBT
              </span>
              <span className="text-xs font-semibold text-blue-600">Timed 120 Mins</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {targetExam} Full Simulation
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Complete multi-subject mock under authentic exam conditions with countdown timer, autosave, and question navigator.
            </p>
          </div>
          <button
            onClick={() => onNavigate('cbt')}
            className="mt-5 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Launch Mock Exam</span>
          </button>
        </div>

        {/* Card 3: Personalized Study Velocity */}
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-b from-emerald-50/50 to-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                Study Velocity
              </span>
              <span className="text-xs font-bold text-emerald-700">45 Mins Daily Goal</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Exam Target: April 2026
            </h3>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Today's Completion</span>
                <span className="font-bold">{completedToday} of {totalPlannedToday} modules</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${totalPlannedToday > 0 ? (completedToday / totalPlannedToday) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('study')}
            className="mt-5 w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>View Full Study Calendar</span>
          </button>
        </div>

      </div>

      {/* Two-Column Section: Study Checklist & Subject Practice Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Subject Quick Launch */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">My Practice Subjects</h2>
              <p className="text-xs text-slate-500">Pick any subject to start instant topic revision or timed sets:</p>
            </div>
            <button
              onClick={() => onNavigate('practice')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { id: 's-mth', code: 'MTH', name: 'General Mathematics', questionsCount: 1420, accuracy: 74, color: 'emerald' },
              { id: 's-eng', code: 'ENG', name: 'English Language', questionsCount: 1850, accuracy: 82, color: 'blue' },
              { id: 's-phy', code: 'PHY', name: 'Physics', questionsCount: 980, accuracy: 68, color: 'indigo' },
              { id: 's-chm', code: 'CHM', name: 'Chemistry', questionsCount: 1100, accuracy: 71, color: 'violet' },
              { id: 's-bio', code: 'BIO', name: 'Biology', questionsCount: 1340, accuracy: 86, color: 'green' },
              { id: 's-ecn', code: 'ECN', name: 'Economics', questionsCount: 890, accuracy: 79, color: 'cyan' },
            ].map(subj => (
              <div
                key={subj.id}
                onClick={() => onNavigate('practice', { subjectId: subj.id })}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-md transition cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {subj.code}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {subj.questionsCount} questions
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {subj.name}
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    Average Accuracy: <strong className="text-slate-800">{subj.accuracy}%</strong>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Today's Study Plan Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Today's Tasks</h2>
            <span className="text-xs text-slate-500 font-medium">Daily Target</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
            {studyPlanItems.slice(0, 4).map(item => (
              <div
                key={item.id}
                onClick={() => toggleStudyItem(item.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                  item.is_completed
                    ? 'bg-slate-50 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200/90 text-slate-800 hover:border-blue-300'
                }`}
              >
                <div className="mt-0.5">
                  {item.is_completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 hover:border-blue-600" />
                  )}
                </div>
                <div className="text-xs flex-1">
                  <div className={`font-bold ${item.is_completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {item.subject_name}
                  </div>
                  <div className="text-[11px] text-slate-500">{item.topic_name}</div>
                  <div className="text-[10px] text-blue-600 font-semibold mt-1">
                    {item.target_questions} Qs • {item.estimated_minutes} mins
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => onNavigate('study')}
              className="w-full py-2 text-center text-xs font-bold text-blue-600 hover:text-blue-700 pt-2 border-t border-slate-100"
            >
              Manage Study Calendar →
            </button>
          </div>

          {/* Quick Exam Tip Card */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center gap-2 text-blue-800 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Nigerian Exam Strategy Tip</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              In JAMB UTME, you have 120 minutes for 180 questions (~40 seconds per question). Spend no more than 30 seconds on English comprehension questions to save time for Physics and Mathematics calculations!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

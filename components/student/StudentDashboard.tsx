'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  BookOpen, 
  Clock, 
  Play, 
  ChevronRight, 
  Target, 
  UserCheck, 
  TrendingUp, 
  Users, 
  Crown, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/lib/store';
import { Logo } from '@/components/brand/Logo';
import { 
  SEED_EXAM_TEMPLATES, 
  SEED_SUBJECTS, 
  SEED_TOPICS 
} from '@/lib/seed-data';
import { LeaderboardEntry } from '@/types/database';

interface StudentDashboardProps {
  onStartExam: (params: {
    templateId?: string;
    mode: 'learning' | 'cbt_exam' | 'quick_practice';
    subjectIds: string[];
    customMinutes?: number;
    questionCount?: number;
    specificTopicId?: string;
  }) => void;
  onOpenPricing: () => void;
  onOpenStudyPlan: () => void;
  onOpenAdmin: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onStartExam,
  onOpenPricing,
  onOpenStudyPlan,
  onOpenAdmin
}) => {
  const { 
    currentUser, 
    studentProfile, 
    dailyChallenge, 
    isDailyChallengeCompleted, 
    badges,
    recentResults
  } = useApp();

  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('mat');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [practiceMode, setPracticeMode] = useState<'learning' | 'cbt_exam'>('learning');
  const [questionCount, setQuestionCount] = useState(25);
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'badges'>('overview');

  const isEnglishSubject = (subId: string) => {
    const s = (subId || '').toLowerCase();
    return s === 'eng' || s === 's-eng' || s === 'j_eng' || s.includes('english');
  };
  const getStandardCount = (subId: string) => isEnglishSubject(subId) ? 45 : 25;

  const studentName = currentUser?.full_name?.split(' ')[0] || 'Scholar';
  const enrolledSubjects = SEED_SUBJECTS.filter(s => 
    studentProfile?.enrolled_subject_ids.includes(s.id)
  );

  const availableTopics = SEED_TOPICS.filter(t => t.subject_id === selectedSubjectId);

  // Mock Leaderboard data
  const LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
    { rank: 1, user_id: 'u1', full_name: 'Amina Bello', username: 'amina_b', state: 'Kano', school_name: 'Federal Gov College', xp: 2450, streak_days: 19, accuracy: 94 },
    { rank: 2, user_id: 'u2', full_name: 'Emeka Nwosu', username: 'emeka_n', state: 'Enugu', school_name: 'College of Immaculate', xp: 2180, streak_days: 15, accuracy: 89 },
    { rank: 3, user_id: currentUser?.id || 'david', full_name: currentUser?.full_name || 'David Adebayo', username: currentUser?.username || 'davidadebayo', state: studentProfile?.state || 'Lagos', school_name: studentProfile?.school_name || 'King\'s College', xp: studentProfile?.xp || 1420, streak_days: studentProfile?.streak_days || 12, accuracy: 86, is_current_user: true },
    { rank: 4, user_id: 'u4', full_name: 'Oluwaseun Adeleke', username: 'seun_ade', state: 'Oyo', school_name: 'Loyola College Ibadan', xp: 1390, streak_days: 10, accuracy: 82 },
    { rank: 5, user_id: 'u5', full_name: 'Fatima Sanusi', username: 'fatima_s', state: 'Kaduna', school_name: 'Queen Amina College', xp: 1250, streak_days: 8, accuracy: 80 }
  ];

  const handleLaunchPractice = () => {
    setPracticeModalOpen(false);
    onStartExam({
      mode: practiceMode,
      subjectIds: [selectedSubjectId],
      questionCount,
      customMinutes: Math.ceil(questionCount * 1.2),
      specificTopicId: selectedTopicId || undefined
    });
  };

  const handleLaunchDailyChallenge = () => {
    onStartExam({
      mode: 'learning',
      subjectIds: [dailyChallenge.subject_id],
      questionCount: 10,
      customMinutes: 15
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* STUDENT GREETING & STATUS BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Good day, {studentName} 👋
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {studentProfile?.current_class || 'SSS3'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Targeting <strong>{studentProfile?.target_exam || 'JAMB'}</strong> {studentProfile?.intended_course ? `(${studentProfile.intended_course})` : ''} • {studentProfile?.state} State
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Streak Counter */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <div>
              <span className="text-xs font-bold block leading-none">{studentProfile?.streak_days || 12}-Day</span>
              <span className="text-[10px] text-amber-700">Streak</span>
            </div>
          </div>

          {/* XP Counter */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
            <Award className="w-5 h-5 text-blue-600" />
            <div>
              <span className="text-xs font-bold block leading-none">{studentProfile?.xp || 1420} XP</span>
              <span className="text-[10px] text-blue-700">Scholar Tier</span>
            </div>
          </div>
        </div>
      </div>

      {/* THREE PRIORITY HERO CARDS: TODAY'S CHALLENGE + STUDY PLAN + STUDY COACH */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Today's Challenge */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> Today's Challenge
              </span>
              <span className="bg-amber-50 px-2 py-0.5 rounded-full text-amber-800 border border-amber-200 text-[10px]">+{dailyChallenge.xp_reward} XP</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {dailyChallenge.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              10 rapid-fire questions covering {dailyChallenge.topic_name}.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            {isDailyChallengeCompleted ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed for Today
              </span>
            ) : (
              <button
                id="btn-start-daily-challenge"
                onClick={handleLaunchDailyChallenge}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Start Daily Sprint
              </button>
            )}
          </div>
        </div>

        {/* Card 2: Study Plan */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 transition">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" /> Study Plan
              </span>
              <span className="bg-blue-50 px-2 py-0.5 rounded-full text-blue-800 border border-blue-200 text-[10px]">{studentProfile?.daily_study_minutes || 45} mins target</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Mathematics & Physics Revision
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Day 4 of your 7-Day Sprint: 25 practice questions scheduled.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onOpenStudyPlan}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition"
            >
              <Calendar className="w-3.5 h-3.5" /> View Personalized Schedule
            </button>
          </div>
        </div>

        {/* Card 3: Study Coach Diagnostic Recommendation */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" /> Study Coach Insight
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">Active</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Practice Quadratic Equations
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              "You've improved in Mechanics. Quadratic Equations is currently your highest-impact area for extra marks in {studentProfile?.target_exam || 'JAMB'}."
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onStartExam({
                mode: 'learning',
                subjectIds: ['mat'],
                questionCount: 15,
                customMinutes: 20
              })}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition"
            >
              <Target className="w-3.5 h-3.5" /> Target Weak Spot
            </button>
          </div>
        </div>
      </div>

      {/* QUICK LAUNCH ACTIONS (OFFICIAL MOCK VS CUSTOM DRILL) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Official CBT Mock Banner */}
        <div className="p-6 rounded-3xl bg-white border-2 border-blue-600 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Official Simulation
              </span>
              <span className="text-xs text-slate-500">JAMB Standard</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Full UTME / JAMB CBT Mock
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 max-w-sm leading-relaxed">
              Authentic 120-question simulation: English (45) + 3 electives (25 each), authentic 2-hour countdown timer and anti-cheating protocol.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              id="btn-launch-jamb-mock"
              onClick={() => onStartExam({
                templateId: 'jamb_official_mock',
                mode: 'cbt_exam',
                subjectIds: studentProfile?.enrolled_subject_ids || ['eng', 'mat', 'phy', 'che'],
                customMinutes: 120,
                questionCount: 120
              })}
              className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-98 transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Official CBT Simulation</span>
            </button>
          </div>
        </div>

        {/* Custom Practice Drill */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Interactive Learning
              </span>
              <span className="text-xs text-slate-500">By Subject & Topic</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Custom Topic Practice
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 max-w-sm leading-relaxed">
              Practice at your own pace with instant educational explanations, formula breakdowns, and step-by-step guidance.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              id="btn-open-custom-practice"
              onClick={() => setPracticeModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-98 transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Customize Practice Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* ENROLLED SUBJECTS GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700" />
            Your Enrolled Subjects ({enrolledSubjects.length})
          </h2>
          <span className="text-xs text-slate-500">Click subject to practice</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {enrolledSubjects.map(sub => (
            <div
              key={sub.id}
              onClick={() => {
                setSelectedSubjectId(sub.id);
                setSelectedTopicId('');
                setQuestionCount(getStandardCount(sub.id));
                setPracticeModalOpen(true);
              }}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-600 cursor-pointer transition shadow-2xs hover:shadow-sm flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs"
                  style={{ backgroundColor: sub.color || '#2563EB' }}
                >
                  {sub.code}
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {sub.name}
                </h4>
                <span className="text-[11px] text-slate-500 mt-0.5 block">
                  {sub.level.toUpperCase()} • Practice Now
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LEADERBOARDS & GAMIFICATION BADGES TABS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'overview'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Recent Exam History
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Nigeria & State Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'badges'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Earned Badges & Trophies
            </button>
          </div>
        </div>

        {/* RECENT EXAM HISTORY TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-3">
            {recentResults.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No past exam sessions recorded yet. Launch your first practice drill above to track your accuracy!
              </div>
            ) : (
              recentResults.map(res => (
                <div key={res.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      res.score_percentage >= 70
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {res.score_percentage}%
                    </div>
                    <div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                        CBT Session #{res.session_id.slice(-6)}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {res.correct_count} of {res.total_questions} correct • +{res.xp_earned} XP
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {new Date(res.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Rankings across Nigeria based on study consistency, practice accuracy, and XP points.
            </p>
            <div className="space-y-2">
              {LEADERBOARD_ENTRIES.map(entry => (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                    entry.is_current_user
                      ? 'bg-blue-50 border-blue-300 font-semibold'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      entry.rank === 1 ? 'bg-amber-400 text-slate-900' :
                      entry.rank === 2 ? 'bg-slate-300 text-slate-900' :
                      entry.rank === 3 ? 'bg-amber-700 text-white' : 'text-slate-500'
                    }`}>
                      {entry.rank}
                    </span>
                    <div>
                      <span className="text-slate-900 font-bold block">
                        {entry.full_name} {entry.is_current_user && '(You)'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {entry.school_name} • {entry.state} State
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-blue-700 block">
                      {entry.xp} XP
                    </span>
                    <span className="text-[10px] text-slate-500">
                      🔥 {entry.streak_days} days • {entry.accuracy}% acc
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BADGES TAB */}
        {activeTab === 'badges' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map(b => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                  b.unlocked_at
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Award className={`w-6 h-6 ${b.unlocked_at ? 'text-amber-500' : 'text-slate-400'}`} />
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                      +{b.xp_bonus} XP
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{b.description}</p>
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold mt-2">
                  {b.unlocked_at ? '✓ Unlocked' : 'In Progress'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOM PRACTICE MODAL */}
      {practiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Configure Practice Session</h3>
                <p className="text-xs text-slate-500">Target specific topics and choose your mode.</p>
              </div>
              <button onClick={() => setPracticeModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold p-1">✕</button>
            </div>

            <div className="space-y-4">
              {/* Select Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Subject</label>
                <select
                  value={selectedSubjectId}
                  onChange={e => {
                    const newSubId = e.target.value;
                    setSelectedSubjectId(newSubId);
                    setSelectedTopicId('');
                    setQuestionCount(getStandardCount(newSubId));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  {SEED_SUBJECTS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              {/* Select Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Topic (Optional)</label>
                <select
                  value={selectedTopicId}
                  onChange={e => setSelectedTopicId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option value="">All Topics (Randomized mix)</option>
                  {availableTopics.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              {/* Select Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Learning or Exam Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPracticeMode('learning')}
                    className={`p-3 rounded-xl border text-left text-xs transition ${
                      practiceMode === 'learning'
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-slate-900">Learning Mode</span>
                    <span className="text-[11px] font-normal text-slate-500">Instant answer feedback & detailed solution</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPracticeMode('cbt_exam')}
                    className={`p-3 rounded-xl border text-left text-xs transition ${
                      practiceMode === 'cbt_exam'
                        ? 'bg-blue-50 border-2 border-blue-600 text-blue-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-slate-900">Timed CBT Mode</span>
                    <span className="text-[11px] font-normal text-slate-500">Official countdown timer, score at end</span>
                  </button>
                </div>
              </div>

              {/* Question Count */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Number of Questions</label>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Standard: {getStandardCount(selectedSubjectId)} Qs {isEnglishSubject(selectedSubjectId) ? '(English)' : '(Core Subject)'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {(isEnglishSubject(selectedSubjectId) ? [15, 30, 45, 60] : [10, 15, 25, 40]).map(cnt => {
                    const isStandard = cnt === getStandardCount(selectedSubjectId);
                    return (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setQuestionCount(cnt)}
                        className={`py-2 px-1 rounded-xl border text-xs font-bold transition relative flex flex-col items-center justify-center ${
                          questionCount === cnt
                            ? 'bg-blue-700 border-blue-700 text-white shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cnt} Qs</span>
                        {isStandard && (
                          <span className={`text-[8px] uppercase tracking-wider font-bold ${questionCount === cnt ? 'text-blue-200' : 'text-blue-600'}`}>
                            Standard
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setPracticeModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                id="btn-start-configured-session"
                type="button"
                onClick={handleLaunchPractice}
                className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-sm"
              >
                Start Practice Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

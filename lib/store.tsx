'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  UserProfile, 
  StudentProfile, 
  ExamSession, 
  ExamResult, 
  Question, 
  Subject, 
  Topic, 
  DailyChallenge, 
  Badge, 
  QuestionReport 
} from '@/types/database';
import { supabase, isSupabaseConfigured } from './supabase/client';
import { AuthService } from './supabase/auth';
import { 
  SEED_SUBJECTS, 
  SEED_TOPICS, 
  SEED_QUESTIONS, 
  SEED_EXAM_TEMPLATES, 
  SEED_BADGES, 
  SEED_DAILY_CHALLENGE 
} from './seed-data';

export interface AppState {
  // Auth & Profile
  currentUser: UserProfile | null;
  studentProfile: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeRole: 'student' | 'admin';

  // Catalog
  subjects: Subject[];
  topics: Topic[];
  questions: Question[];

  // Active Exam Session
  activeSession: ExamSession | null;
  recentResults: ExamResult[];

  // Gamification & Study
  badges: Badge[];
  dailyChallenge: DailyChallenge;
  isDailyChallengeCompleted: boolean;

  // Question reports & admin
  reports: QuestionReport[];

  // Actions
  loginDemoUser: (role?: 'student' | 'admin') => void;
  setAuthenticatedUser: (user: UserProfile, profile?: StudentProfile) => void;
  logout: () => void;
  updateStudentProfile: (profile: Partial<StudentProfile>) => void;
  completeOnboarding: (userData: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    school: string;
    state: string;
    currentClass: 'JSS1' | 'JSS2' | 'JSS3' | 'SSS1' | 'SSS2' | 'SSS3';
    department?: 'science' | 'commercial' | 'arts' | 'general';
    targetExam: 'JAMB' | 'WAEC' | 'NECO' | 'BECE' | 'Junior_WAEC' | 'School_Exam' | 'General_Practice';
    intendedCourse?: string;
    subjects: string[];
    examDate: string;
    dailyMinutes: number;
  }) => void;
  startExamSession: (params: {
    templateId?: string;
    mode: 'learning' | 'cbt_exam' | 'quick_practice';
    subjectIds: string[];
    customMinutes?: number;
    questionCount?: number;
    specificTopicId?: string;
  }) => ExamSession;
  selectAnswer: (questionId: string, optionId: string) => void;
  toggleFlagQuestion: (questionId: string) => void;
  logTabSwitch: () => void;
  submitExamSession: () => ExamResult;
  abandonExamSession: () => void;
  reportQuestion: (questionId: string, reason: any, details: string) => void;
  addQuestion: (q: Omit<Question, 'id' | 'created_at' | 'updated_at'>) => Question;
  updateQuestionStatus: (id: string, status: any) => void;
  updateReportStatus: (id: string, status: 'resolved' | 'rejected') => void;
  completeDailyChallenge: (score: number, total: number) => void;
}

const STORAGE_KEY = 'delightprep_state_v1';

const INITIAL_DEMO_USER: UserProfile = {
  id: 'usr_david_001',
  email: 'david.adebayo@student.delightprep.ng',
  full_name: 'David Adebayo',
  username: 'davidadebayo',
  phone_number: '+234 812 345 6789',
  role: 'student',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'stu_david_001',
  user_id: 'usr_david_001',
  current_class: 'SSS3',
  level: 'senior',
  department: 'science',
  school_name: 'King\'s College Lagos',
  state: 'Lagos',
  target_exam: 'JAMB',
  intended_course: 'Medicine and Surgery',
  target_exam_date: '2026-05-15',
  daily_study_minutes: 45,
  enrolled_subject_ids: ['eng', 'phy', 'che', 'bio'],
  xp: 1420,
  streak_days: 12,
  last_active_date: new Date().toISOString().split('T')[0],
  subscription_tier: 'free',
  trial_used: false,
  referral_code: 'DAVID-784',
  created_at: new Date().toISOString()
};

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_DEMO_USER);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(INITIAL_STUDENT_PROFILE);
  const [activeRole, setActiveRole] = useState<'student' | 'admin'>('student');
  const [activeSession, setActiveSession] = useState<ExamSession | null>(null);
  const [recentResults, setRecentResults] = useState<ExamResult[]>([]);
  const [questions, setQuestions] = useState<Question[]>(SEED_QUESTIONS);
  const [reports, setReports] = useState<QuestionReport[]>([]);
  const [isDailyChallengeCompleted, setIsDailyChallengeCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load state from localStorage on hydration and check Supabase Auth session
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.studentProfile) setStudentProfile(parsed.studentProfile);
        if (parsed.activeSession) setActiveSession(parsed.activeSession);
        if (parsed.recentResults) setRecentResults(parsed.recentResults);
        if (parsed.questions?.length) setQuestions(parsed.questions);
        if (parsed.reports) setReports(parsed.reports);
        if (parsed.isDailyChallengeCompleted !== undefined) {
          setIsDailyChallengeCompleted(parsed.isDailyChallengeCompleted);
        }
      }
    } catch (e) {
      console.warn('Failed to parse delightprep storage', e);
    } finally {
      setIsLoading(false);
    }

    // Check live Supabase Auth session if configured
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          supabase.from('profiles').select('*').eq('id', session.user.id).single()
            .then(({ data: profile }) => {
              if (profile) {
                setCurrentUser(profile);
                AuthService.getStudentProfile(session.user.id).then(stu => {
                  if (stu) setStudentProfile(stu);
                });
              }
            });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setStudentProfile(null);
          setActiveSession(null);
        } else if (session?.user && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
          if (profile) {
            setCurrentUser(profile);
            const stu = await AuthService.getStudentProfile(session.user.id);
            if (stu) setStudentProfile(stu);
          }
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (isLoading) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentUser,
        studentProfile,
        activeSession,
        recentResults,
        questions,
        reports,
        isDailyChallengeCompleted
      }));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [currentUser, studentProfile, activeSession, recentResults, questions, reports, isDailyChallengeCompleted, isLoading]);

  const setAuthenticatedUser = (user: UserProfile, profile?: StudentProfile) => {
    setCurrentUser(user);
    if (profile) {
      setStudentProfile(profile);
    } else {
      // Attempt to load existing student profile or initialize
      AuthService.getStudentProfile(user.id).then(loaded => {
        if (loaded) setStudentProfile(loaded);
      });
    }
    setActiveRole(user.role === 'super_admin' ? 'admin' : 'student');
  };

  const loginDemoUser = (role: 'student' | 'admin' = 'student') => {
    if (role === 'admin') {
      const adminUser: UserProfile = {
        id: 'usr_admin_001',
        email: 'admin@delightprep.ng',
        full_name: 'Engr. Sarah Balogun',
        username: 'sarah_admin',
        phone_number: '+234 803 999 1122',
        role: 'super_admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setCurrentUser(adminUser);
      setActiveRole('admin');
    } else {
      setCurrentUser(INITIAL_DEMO_USER);
      setStudentProfile(INITIAL_STUDENT_PROFILE);
      setActiveRole('student');
    }
  };

  const logout = async () => {
    try {
      await AuthService.signOut();
    } catch {
      // safe fallback
    }
    setCurrentUser(null);
    setStudentProfile(null);
    setActiveSession(null);
  };

  const updateStudentProfile = (updates: Partial<StudentProfile>) => {
    setStudentProfile(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      AuthService.saveStudentProfile(updated).catch(() => {});
      return updated;
    });
  };

  const completeOnboarding = (data: {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    school: string;
    state: string;
    currentClass: 'JSS1' | 'JSS2' | 'JSS3' | 'SSS1' | 'SSS2' | 'SSS3';
    department?: 'science' | 'commercial' | 'arts' | 'general';
    targetExam: 'JAMB' | 'WAEC' | 'NECO' | 'BECE' | 'Junior_WAEC' | 'School_Exam' | 'General_Practice';
    intendedCourse?: string;
    subjects: string[];
    examDate: string;
    dailyMinutes: number;
  }) => {
    const isJunior = data.currentClass.startsWith('JSS');
    const existingId = currentUser?.id;
    const newUserId = existingId || `usr_${Date.now()}`;
    
    const newUser: UserProfile = {
      id: newUserId,
      email: data.email || currentUser?.email || 'scholar@delightprep.ng',
      full_name: data.fullName || currentUser?.full_name || 'Delight Scholar',
      username: data.username || currentUser?.username || 'delight_scholar',
      phone_number: data.phone || currentUser?.phone_number,
      role: 'student',
      created_at: currentUser?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const newStudent: StudentProfile = {
      id: `stu_${Date.now()}`,
      user_id: newUserId,
      current_class: data.currentClass,
      level: isJunior ? 'junior' : 'senior',
      department: isJunior ? 'general' : (data.department || 'science'),
      school_name: data.school,
      state: data.state,
      target_exam: data.targetExam,
      intended_course: data.intendedCourse,
      target_exam_date: data.examDate,
      daily_study_minutes: data.dailyMinutes,
      enrolled_subject_ids: data.subjects,
      xp: 150, // Welcome Onboarding Bonus
      streak_days: 1,
      last_active_date: new Date().toISOString().split('T')[0],
      subscription_tier: 'free',
      trial_used: false,
      referral_code: `${(data.username || 'STUDENT').toUpperCase().slice(0, 5)}-${Math.floor(100 + Math.random() * 900)}`,
      created_at: new Date().toISOString()
    };

    setCurrentUser(newUser);
    setStudentProfile(newStudent);
    setActiveRole('student');

    // Persist to Supabase Database
    AuthService.saveStudentProfile(newStudent).catch(err => {
      console.warn('Supabase profile persistence note:', err);
    });
  };

  const isEnglishSubject = (subId: string): boolean => {
    const s = (subId || '').toLowerCase();
    return s === 'eng' || s === 's-eng' || s === 'j_eng' || s.includes('english');
  };

  const getSubjectStandardPracticeCount = (subId: string): number => {
    return isEnglishSubject(subId) ? 45 : 25;
  };

  const startExamSession = ({
    templateId,
    mode,
    subjectIds,
    customMinutes,
    questionCount,
    specificTopicId
  }: {
    templateId?: string;
    mode: 'learning' | 'cbt_exam' | 'quick_practice';
    subjectIds: string[];
    customMinutes?: number;
    questionCount?: number;
    specificTopicId?: string;
  }): ExamSession => {
    // Subject question allocation: 45 for English and 25 for other subjects per practice
    const selectedQuestions: (Question & { original_question_id?: string })[] = [];

    const template = templateId ? SEED_EXAM_TEMPLATES.find(t => t.id === templateId) : undefined;
    const templateConfigs = template?.subject_config || template?.subject_configurations;

    if (templateConfigs && templateConfigs.length > 0) {
      // Use template subject config (e.g. English: 45, Physics: 25, Chemistry: 25, Biology: 25)
      templateConfigs.forEach(cfg => {
        const subId = cfg.subject_id;
        const requiredCount = cfg.question_count || getSubjectStandardPracticeCount(subId);
        const subPool = questions.filter(q => q.subject_id === subId);
        const shuffledSub = [...subPool].sort(() => Math.random() - 0.5);

        if (shuffledSub.length === 0) {
          const fallbackPool = [...questions].sort(() => Math.random() - 0.5);
          for (let i = 0; i < requiredCount; i++) {
            const baseQ = fallbackPool[i % fallbackPool.length];
            selectedQuestions.push({
              ...baseQ,
              id: `${subId}_fb_${i}_${Date.now()}`,
              subject_id: subId,
              original_question_id: baseQ.id
            });
          }
        } else {
          for (let i = 0; i < requiredCount; i++) {
            const baseQ = shuffledSub[i % shuffledSub.length];
            const isDuplicateCycle = i >= shuffledSub.length;
            selectedQuestions.push({
              ...baseQ,
              id: isDuplicateCycle ? `${baseQ.id}_cycle_${i}` : baseQ.id,
              original_question_id: baseQ.id
            });
          }
        }
      });
    } else if (subjectIds.length === 1) {
      // Single subject practice: 45 for English, 25 for others unless explicitly specified
      const subId = subjectIds[0];
      const defaultTarget = getSubjectStandardPracticeCount(subId);
      const targetCount = questionCount ?? defaultTarget;

      let subPool = questions.filter(q => q.subject_id === subId);
      if (specificTopicId) {
        const topicMatches = subPool.filter(q => q.topic_id === specificTopicId);
        if (topicMatches.length > 0) subPool = topicMatches;
      }

      if (subPool.length === 0) {
        subPool = [...questions];
      }

      const shuffledSub = [...subPool].sort(() => Math.random() - 0.5);
      for (let i = 0; i < targetCount; i++) {
        const baseQ = shuffledSub[i % shuffledSub.length];
        const isDuplicateCycle = i >= shuffledSub.length;
        selectedQuestions.push({
          ...baseQ,
          id: isDuplicateCycle ? `${baseQ.id}_cycle_${i}` : baseQ.id,
          original_question_id: baseQ.id
        });
      }
    } else {
      // Multiple subjects practice: 45 for English and 25 for others per subject
      subjectIds.forEach(subId => {
        const requiredCount = getSubjectStandardPracticeCount(subId);
        let subPool = questions.filter(q => q.subject_id === subId);
        if (specificTopicId) {
          const topicMatches = subPool.filter(q => q.topic_id === specificTopicId);
          if (topicMatches.length > 0) subPool = topicMatches;
        }

        if (subPool.length === 0) {
          subPool = questions.filter(q => isEnglishSubject(subId) ? isEnglishSubject(q.subject_id) : !isEnglishSubject(q.subject_id));
          if (subPool.length === 0) subPool = [...questions];
        }

        const shuffledSub = [...subPool].sort(() => Math.random() - 0.5);
        for (let i = 0; i < requiredCount; i++) {
          const baseQ = shuffledSub[i % shuffledSub.length];
          const isDuplicateCycle = i >= shuffledSub.length;
          selectedQuestions.push({
            ...baseQ,
            id: isDuplicateCycle ? `${baseQ.id}_cycle_${i}` : baseQ.id,
            original_question_id: baseQ.id
          });
        }
      });
    }

    // Prepare session questions with randomized options and stable display labels
    const sessionQuestions = selectedQuestions.map(q => {
      // Shuffle options to prevent option bias
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      const labels: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

      return {
        question_id: q.id,
        original_question_id: q.original_question_id || q.id,
        subject_id: q.subject_id,
        question_text: q.question_text,
        image_url: q.image_url,
        options: shuffledOptions.map((opt, idx) => ({
          id: opt.id,
          text: opt.text,
          display_label: labels[idx] || 'A'
        }))
      };
    });

    const calculatedMinutes = customMinutes 
      || (templateId === 'jamb_official_mock' ? 120 
      : subjectIds.length === 1 ? (isEnglishSubject(subjectIds[0]) ? 45 : 30)
      : Math.max(30, Math.ceil(sessionQuestions.length * 1.1)));
    const durationSeconds = calculatedMinutes * 60;

    const newSession: ExamSession = {
      id: `sess_${Date.now()}`,
      user_id: currentUser?.id || 'guest',
      exam_template_id: templateId,
      mode,
      subject_ids: subjectIds,
      duration_seconds: durationSeconds,
      time_remaining_seconds: durationSeconds,
      status: 'in_progress',
      questions: sessionQuestions,
      answers: {},
      flagged_question_ids: [],
      tab_switch_count: 0,
      started_at: new Date().toISOString()
    };

    setActiveSession(newSession);
    return newSession;
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    if (!activeSession) return;
    setActiveSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: optionId
        }
      };
    });
  };

  const toggleFlagQuestion = (questionId: string) => {
    if (!activeSession) return;
    setActiveSession(prev => {
      if (!prev) return null;
      const flags = [...prev.flagged_question_ids];
      const idx = flags.indexOf(questionId);
      if (idx >= 0) flags.splice(idx, 1);
      else flags.push(questionId);
      return {
        ...prev,
        flagged_question_ids: flags
      };
    });
  };

  const logTabSwitch = () => {
    if (!activeSession) return;
    setActiveSession(prev => prev ? { ...prev, tab_switch_count: prev.tab_switch_count + 1 } : null);
  };

  const submitExamSession = (): ExamResult => {
    if (!activeSession) throw new Error('No active session');

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const subjectBreakdownMap: Record<string, { total: number; correct: number }> = {};
    const topicBreakdownMap: Record<string, { total: number; correct: number; subject_id: string; topic_name: string }> = {};

    activeSession.questions.forEach(sessQ => {
      const origId = sessQ.original_question_id || sessQ.question_id;
      const originalQ = questions.find(q => q.id === origId || q.id === sessQ.question_id);
      const selectedOptionId = activeSession.answers[sessQ.question_id];

      // Track by subject
      if (!subjectBreakdownMap[sessQ.subject_id]) {
        subjectBreakdownMap[sessQ.subject_id] = { total: 0, correct: 0 };
      }
      subjectBreakdownMap[sessQ.subject_id].total += 1;

      // Track by topic
      if (originalQ?.topic_id) {
        if (!topicBreakdownMap[originalQ.topic_id]) {
          const t = SEED_TOPICS.find(top => top.id === originalQ.topic_id);
          topicBreakdownMap[originalQ.topic_id] = {
            total: 0,
            correct: 0,
            subject_id: sessQ.subject_id,
            topic_name: t?.name || 'General Concepts'
          };
        }
        topicBreakdownMap[originalQ.topic_id].total += 1;
      }

      if (!selectedOptionId) {
        unansweredCount++;
      } else {
        const correctOpt = originalQ?.options.find(o => o.is_correct);
        if (correctOpt && correctOpt.id === selectedOptionId) {
          correctCount++;
          subjectBreakdownMap[sessQ.subject_id].correct += 1;
          if (originalQ?.topic_id && topicBreakdownMap[originalQ.topic_id]) {
            topicBreakdownMap[originalQ.topic_id].correct += 1;
          }
        } else {
          wrongCount++;
        }
      }
    });

    const totalQuestions = activeSession.questions.length;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const timeTakenSeconds = Math.max(0, activeSession.duration_seconds - activeSession.time_remaining_seconds);

    // Format subject breakdowns
    const subjectBreakdowns = Object.entries(subjectBreakdownMap).map(([subId, stats]) => {
      const s = SEED_SUBJECTS.find(sub => sub.id === subId);
      return {
        subject_id: subId,
        subject_name: s?.name || subId.toUpperCase(),
        total: stats.total,
        correct: stats.correct,
        score_percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
      };
    });

    // Format topic breakdowns
    const topicBreakdowns = Object.entries(topicBreakdownMap).map(([topId, data]) => {
      const s = SEED_SUBJECTS.find(sub => sub.id === data.subject_id);
      const mastery = data.total > 0 && (data.correct / data.total) >= 0.75 ? 'strong' 
                    : data.total > 0 && (data.correct / data.total) >= 0.5 ? 'average' : 'weak';
      return {
        topic_id: topId,
        topic_name: data.topic_name,
        subject_name: s?.name || 'Subject',
        total: data.total,
        correct: data.correct,
        mastery_status: mastery as 'strong' | 'average' | 'weak'
      };
    });

    // Recommendations based on weak areas
    const weakTopics = topicBreakdowns.filter(t => t.mastery_status === 'weak');
    const recommendedActions = weakTopics.length > 0
      ? weakTopics.map(wt => `Focus on ${wt.topic_name} (${wt.subject_name}): score was ${wt.correct}/${wt.total}. Take a 15-question targeted drill.`)
      : ['Excellent performance! Challenge yourself with the Official JAMB Mock or increase difficulty to Hard.'];

    // Award XP
    const xpEarned = correctCount * 15 + (scorePercentage >= 80 ? 50 : 20);

    const result: ExamResult = {
      id: `res_${Date.now()}`,
      session_id: activeSession.id,
      user_id: currentUser?.id || 'guest',
      total_questions: totalQuestions,
      correct_count: correctCount,
      wrong_count: wrongCount,
      unanswered_count: unansweredCount,
      score_percentage: scorePercentage,
      time_taken_seconds: timeTakenSeconds,
      subject_breakdowns: subjectBreakdowns,
      topic_breakdowns: topicBreakdowns,
      recommended_actions: recommendedActions,
      xp_earned: xpEarned,
      created_at: new Date().toISOString()
    };

    setRecentResults(prev => [result, ...prev.slice(0, 19)]);
    setActiveSession(null);

    // Update profile XP
    if (studentProfile) {
      setStudentProfile(prev => prev ? {
        ...prev,
        xp: prev.xp + xpEarned,
      } : null);
    }

    return result;
  };

  const abandonExamSession = () => {
    setActiveSession(null);
  };

  const reportQuestion = (questionId: string, reason: any, details: string) => {
    const newReport: QuestionReport = {
      id: `rep_${Date.now()}`,
      question_id: questionId,
      user_id: currentUser?.id || 'guest',
      reason,
      details,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setReports(prev => [newReport, ...prev]);
  };

  const addQuestion = (qData: Omit<Question, 'id' | 'created_at' | 'updated_at'>): Question => {
    const newQ: Question = {
      ...qData,
      id: `q_custom_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setQuestions(prev => [newQ, ...prev]);
    return newQ;
  };

  const updateQuestionStatus = (id: string, status: any) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, review_status: status, updated_at: new Date().toISOString() } : q));
  };

  const updateReportStatus = (id: string, status: 'resolved' | 'rejected') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const completeDailyChallenge = (score: number, total: number) => {
    setIsDailyChallengeCompleted(true);
    const xpBonus = score * 10 + 50;
    if (studentProfile) {
      setStudentProfile(prev => prev ? {
        ...prev,
        xp: prev.xp + xpBonus,
        streak_days: prev.streak_days + 1
      } : null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        studentProfile,
        isAuthenticated: !!currentUser,
        isLoading,
        activeRole,
        subjects: SEED_SUBJECTS,
        topics: SEED_TOPICS,
        questions,
        activeSession,
        recentResults,
        badges: SEED_BADGES,
        dailyChallenge: SEED_DAILY_CHALLENGE,
        isDailyChallengeCompleted,
        reports,
        loginDemoUser,
        setAuthenticatedUser,
        logout,
        updateStudentProfile,
        completeOnboarding,
        startExamSession,
        selectAnswer,
        toggleFlagQuestion,
        logTabSwitch,
        submitExamSession,
        abandonExamSession,
        reportQuestion,
        addQuestion,
        updateQuestionStatus,
        updateReportStatus,
        completeDailyChallenge
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  UserCheck, 
  Calendar, 
  Clock, 
  BookOpen, 
  Target, 
  GraduationCap, 
  ArrowRight,
  Award,
  School as SchoolIcon,
  Search,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  RefreshCw,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '@/lib/store';
import { Logo } from '@/components/brand/Logo';
import { AuthService } from '@/lib/supabase/auth';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { School, StudentClass, Department, ExamGoal } from '@/types/database';
import { 
  NIGERIAN_STATES, 
  JAMB_COURSE_RECOMMENDATIONS, 
  SEED_SUBJECTS 
} from '@/lib/seed-data';

interface OnboardingFlowProps {
  onFinish: () => void;
  onOpenSignIn?: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onFinish, onOpenSignIn }) => {
  const { completeOnboarding, currentUser } = useApp();

  // Wizard Steps:
  // 1: Welcome Overview
  // 2: Account Creation (Email/Password or Google)
  // 3: Profile & School Location
  // 4: Class & Academic Department
  // 5: Examination Goal & JAMB Course
  // 6: Initial Subject Customization & Daily Schedule
  // 7: Celebration & Dashboard Launch
  const [step, setStep] = useState<number>(currentUser ? 3 : 1);

  // Auth & Account Form Data
  const [fullName, setFullName] = useState(currentUser?.full_name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone_number || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // School & Location Data
  const [selectedState, setSelectedState] = useState<string>('Lagos');
  const [schoolsList, setSchoolsList] = useState<School[]>([]);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState<string>('');
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('');
  const [customSchoolName, setCustomSchoolName] = useState<string>('');
  const [isCustomSchool, setIsCustomSchool] = useState<boolean>(false);

  // Academic Class & Department
  const [currentClass, setCurrentClass] = useState<StudentClass>('SSS3');
  const [department, setDepartment] = useState<Department>('science');

  // Examination Goals & Course
  const [targetExam, setTargetExam] = useState<ExamGoal>('JAMB');
  const [intendedCourse, setIntendedCourse] = useState<string>('Medicine and Surgery');

  // Subjects & Study Commitment
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['eng', 'phy', 'che', 'bio']);
  const [examDate, setExamDate] = useState<string>('2026-05-18');
  const [dailyMinutes, setDailyMinutes] = useState<number>(45);

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedReferralCode, setGeneratedReferralCode] = useState<string>('');

  const isJunior = currentClass.startsWith('JSS');

  // Load schools when state changes or on initial mount
  useEffect(() => {
    let isMounted = true;
    AuthService.getSchools(selectedState).then(schools => {
      if (isMounted) {
        setSchoolsList(schools);
        setSelectedSchoolId(prev => (prev || (schools.length > 0 ? schools[0].id : '')));
      }
    });
    return () => { isMounted = false; };
  }, [selectedState]);

  // Handle Class Selection
  const handleClassSelect = (cls: StudentClass) => {
    const isNowJunior = cls.startsWith('JSS');
    setCurrentClass(cls);

    if (isNowJunior) {
      setTargetExam('BECE');
      setDepartment('general');
      setSelectedSubjects(['j_mat', 'j_eng', 'j_sci', 'j_tech', 'j_civic', 'j_soc', 'j_ict']);
    } else {
      setTargetExam('JAMB');
      setDepartment('science');
      setSelectedSubjects(['eng', 'mat', 'phy', 'che']);
    }
  };

  // Handle JAMB Course Select
  const handleCourseSelect = (courseName: string) => {
    setIntendedCourse(courseName);
    const rec = JAMB_COURSE_RECOMMENDATIONS[courseName];
    if (rec) {
      setDepartment(rec.department as Department);
      setSelectedSubjects(rec.subjects);
    }
  };

  // Toggle Subject in Checklist
  const toggleSubject = (subjectId: string) => {
    // English & Math are compulsory core
    if (subjectId === 'eng' || subjectId === 'j_eng') return;

    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(prev => prev.filter(id => id !== subjectId));
    } else {
      setSelectedSubjects(prev => [...prev, subjectId]);
    }
  };

  // Step 2 Submission: Register Account via Supabase Auth
  const handleAccountCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await AuthService.signUpWithEmail(email, password, {
        fullName: fullName.trim() || email.split('@')[0],
        username: username.trim() || email.split('@')[0],
        phoneNumber: phone.trim(),
        role: 'student'
      });

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setStep(3); // Proceed to School & Location
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Account registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 Alternative: Google Sign In
  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await AuthService.signInWithGoogle();
      if (res.error) {
        setErrorMessage(res.error);
      } else if ((res.data as any)?.user) {
        const u = (res.data as any).user;
        setFullName(u.full_name || '');
        setUsername(u.username || '');
        setEmail(u.email || '');
        setStep(3);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Google authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  // Final Step: Complete Onboarding & Celebrate!
  const handleFinalSubmit = () => {
    const chosenSchool = isCustomSchool
      ? customSchoolName.trim() || 'Secondary School'
      : schoolsList.find(s => s.id === selectedSchoolId)?.name || 'King\'s College, Lagos';

    const refCode = `DLT-${(username || 'STU').slice(0, 4).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedReferralCode(refCode);

    completeOnboarding({
      fullName: fullName || 'Delight Scholar',
      username: username || 'delight_scholar',
      email: email || 'scholar@delightprep.ng',
      phone: phone || '',
      school: chosenSchool,
      state: selectedState,
      currentClass,
      department: isJunior ? 'general' : department,
      targetExam,
      intendedCourse: isJunior ? undefined : intendedCourse,
      subjects: selectedSubjects,
      examDate,
      dailyMinutes
    });

    // Fire Celebratory Confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setStep(7); // Show Celebration Screen
  };

  // Filter schools based on search query
  const filteredSchools = schoolsList.filter(s => 
    s.name.toLowerCase().includes(schoolSearchQuery.toLowerCase()) ||
    (s.lga && s.lga.toLowerCase().includes(schoolSearchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 md:p-10 relative">
      {/* Header bar */}
      <header className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between py-2 border-b border-slate-200 pb-4">
        <Logo size="md" showTagline />
        <div className="flex items-center gap-2">
          {step > 1 && step < 7 && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-blue-700 border border-slate-200 shadow-2xs">
              Step {step - 1} of 5
            </span>
          )}
          {step < 7 && onOpenSignIn && (
            <button
              onClick={onOpenSignIn}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1 rounded-lg border border-slate-200 hover:bg-white transition shadow-2xs"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 max-w-2xl w-full mx-auto my-auto py-8">
        
        {/* ========================================================================= */}
        {/* STEP 1: WELCOME & PLATFORM INTRODUCTION */}
        {/* ========================================================================= */}
        {step === 1 && (
          <div className="space-y-6 text-center animate-in fade-in duration-200 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shadow-2xs">
              <GraduationCap className="w-8 h-8 text-blue-700" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Welcome to DelightPrep
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
                Nigeria's premier digital exam preparation platform for <strong className="text-slate-800">BECE, WAEC, NECO</strong>, and <strong className="text-slate-800">JAMB UTME</strong> excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 font-bold text-sm">
                  1
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">NERDC Syllabus</h3>
                <p className="text-xs text-slate-500 mt-1">100% curriculum aligned for Junior & Senior schools.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 font-bold text-sm">
                  2
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">Authentic CBT Engine</h3>
                <p className="text-xs text-slate-500 mt-1">Real 180-question timer and 8-key navigation keyboard mode.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2 font-bold text-sm">
                  3
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">Diagnostic Insights</h3>
                <p className="text-xs text-slate-500 mt-1">Instant topic-by-topic weak-area discovery and study plan.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="btn-onboarding-start"
                onClick={() => setStep(2)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 active:scale-98 transition font-bold text-white shadow-sm flex items-center justify-center gap-2"
              >
                <span>Get Started (Free Account)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              {onOpenSignIn && (
                <button
                  type="button"
                  onClick={onOpenSignIn}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
                >
                  Already registered? Sign In
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: ACCOUNT CREATION (SUPABASE AUTH INTEGRATION) */}
        {/* ========================================================================= */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your Student Account</h2>
                <div className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {isSupabaseConfigured ? 'Supabase Auth' : 'Local / Demo Ready'}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your profile safely stores your CBT test logs, streak XP, and personalized weak-area study paths.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Quick Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 transition flex items-center justify-center gap-2.5 shadow-2xs active:scale-98 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                or with email & password
              </span>
            </div>

            <form onSubmit={handleAccountCreation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      id="input-full-name"
                      type="text"
                      required
                      placeholder="e.g. David Adebayo"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                  <input
                    id="input-username"
                    type="text"
                    required
                    placeholder="davidadebayo"
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ''))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      id="input-email"
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      id="input-phone"
                      type="tel"
                      placeholder="+234 812 345 6789"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    id="input-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a password (min. 6 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  id="btn-step2-next"
                  disabled={isLoading}
                  className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Next: School Profile</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: PROFILE COMPLETION & SCHOOL SELECTION */}
        {/* ========================================================================= */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Select your Secondary School</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Connect with classmates, compare school leaderboards, and align with your school's mock schedules.
              </p>
            </div>

            <div className="space-y-4">
              {/* State Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>State of Secondary School</span>
                </label>
                <select
                  id="select-state"
                  value={selectedState}
                  onChange={e => {
                    setSelectedState(e.target.value);
                    setSchoolSearchQuery('');
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-xs"
                >
                  {NIGERIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* School Search & Selection */}
              {!isCustomSchool ? (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      <SchoolIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Choose School in {selectedState}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCustomSchool(true)}
                      className="text-[11px] text-blue-700 hover:underline font-semibold"
                    >
                      Can't find your school?
                    </button>
                  </div>

                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search King's College, Queen's College, etc..."
                      value={schoolSearchQuery}
                      onChange={e => setSchoolSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    />
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1.5 rounded-xl border border-slate-200 p-1.5 bg-slate-50">
                    {filteredSchools.length > 0 ? (
                      filteredSchools.map(sch => (
                        <button
                          key={sch.id}
                          type="button"
                          onClick={() => setSelectedSchoolId(sch.id)}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition ${
                            selectedSchoolId === sch.id
                              ? 'bg-blue-50 border-blue-600 text-slate-900 shadow-2xs font-semibold'
                              : 'border-transparent text-slate-700 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-slate-900">{sch.name}</div>
                            <div className="text-[10px] text-slate-500">
                              {sch.lga ? `${sch.lga} • ` : ''}{sch.category.replace('_', ' ').toUpperCase()}
                            </div>
                          </div>
                          {selectedSchoolId === sch.id && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-6 text-xs text-slate-500">
                        No matches found in {selectedState}.{' '}
                        <button
                          type="button"
                          onClick={() => setIsCustomSchool(true)}
                          className="text-blue-700 underline font-semibold"
                        >
                          Enter custom school name
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      Enter Your Secondary School Name
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCustomSchool(false)}
                      className="text-[11px] text-blue-700 hover:underline font-semibold"
                    >
                      Back to list
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Baptist High School, Jos"
                    value={customSchoolName}
                    onChange={e => setCustomSchoolName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-slate-500">
                    We will verify and add your school to our national directory.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(currentUser ? 1 : 2)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                id="btn-step3-next"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <span>Next: Academic Class</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: CLASS & ACADEMIC DEPARTMENT */}
        {/* ========================================================================= */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Select your Academic Class & Department</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                DelightPrep tailors curriculum questions according to Nigerian NERDC Junior or Senior secondary standards.
              </p>
            </div>

            {/* Junior Secondary Group */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <span>Junior Secondary</span>
                  <span className="text-[10px] normal-case bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200 font-semibold">
                    BECE / Junior WAEC Focus
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {(['JSS1', 'JSS2', 'JSS3'] as const).map(cls => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => handleClassSelect(cls)}
                    className={`py-3 rounded-xl border text-center font-bold text-sm transition ${
                      currentClass === cls
                        ? 'bg-blue-700 border-blue-700 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Senior Secondary Group */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <span>Senior Secondary</span>
                  <span className="text-[10px] normal-case bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    WAEC / NECO / JAMB Focus
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {(['SSS1', 'SSS2', 'SSS3'] as const).map(cls => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => handleClassSelect(cls)}
                    className={`py-3 rounded-xl border text-center font-bold text-sm transition ${
                      currentClass === cls
                        ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Selection (Senior Only) */}
            {!isJunior ? (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Select Senior Department
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'science', label: 'Science', desc: 'Physics, Chemistry, Biology' },
                    { id: 'commercial', label: 'Commercial', desc: 'Accounting, Commerce, Economics' },
                    { id: 'arts', label: 'Arts / Humanities', desc: 'Government, Literature, CRS/IRS' }
                  ].map(dept => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setDepartment(dept.id as Department)}
                      className={`p-3 rounded-xl border text-left transition ${
                        department === dept.id
                          ? 'bg-blue-50 border-2 border-blue-600 text-slate-900 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs capitalize text-slate-900 mb-0.5">{dept.label}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{dept.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-800 flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Junior Secondary General Curriculum</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Junior secondary students study all universal foundational subjects (Basic Science, Mathematics, English Studies, Social Studies, Business Studies) without departmental segregation.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                id="btn-step4-next"
                onClick={() => setStep(5)}
                className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <span>Next: Examination Goal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: EXAMINATION GOAL & JAMB UTME COURSE */}
        {/* ========================================================================= */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Primary Examination Goal</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select the target examination you are aiming to conquer with flying colors.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(isJunior 
                ? [
                    { id: 'BECE', label: 'BECE National', desc: 'Basic Education Certificate' },
                    { id: 'Junior_WAEC', label: 'State Junior WAEC', desc: 'State-administered exams' },
                    { id: 'School_Exam', label: 'School Termly', desc: 'Continuous assessments' },
                    { id: 'General_Practice', label: 'General Practice', desc: 'Speed & skill builder' }
                  ]
                : [
                    { id: 'JAMB', label: 'JAMB UTME', desc: 'Official 4-subject CBT' },
                    { id: 'WAEC', label: 'WAEC WASSCE', desc: 'Senior Certificate' },
                    { id: 'NECO', label: 'NECO SSCE', desc: 'National Senior Exams' },
                    { id: 'School_Exam', label: 'School Mock', desc: 'Internal mock trials' },
                    { id: 'General_Practice', label: 'General Practice', desc: 'Curriculum mastery' }
                  ]
              ).map(ex => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setTargetExam(ex.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    targetExam === ex.id
                      ? 'bg-blue-50 border-2 border-blue-600 text-slate-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <Target className={`w-5 h-5 mb-2 ${targetExam === ex.id ? 'text-blue-700' : 'text-slate-400'}`} />
                    <div className="font-bold text-xs text-slate-900">{ex.label}</div>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{ex.desc}</div>
                </button>
              ))}
            </div>

            {/* JAMB Course Subject Recommendation Engine */}
            {!isJunior && targetExam === 'JAMB' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-blue-700">
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  <label className="text-xs font-bold uppercase tracking-wider">
                    JAMB Official Faculty & Course Combinations
                  </label>
                </div>
                <p className="text-xs text-slate-500">
                  Select your desired university degree. DelightPrep automatically pre-configures the mandatory 4-subject UTME combination recognized by JAMB.
                </p>
                <select
                  id="select-jamb-course"
                  value={intendedCourse}
                  onChange={e => handleCourseSelect(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  {Object.keys(JAMB_COURSE_RECOMMENDATIONS).map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                <div className="text-[11px] text-emerald-700 font-medium">
                  Recommended subjects: {JAMB_COURSE_RECOMMENDATIONS[intendedCourse]?.subjects.join(', ').toUpperCase()}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                id="btn-step5-next"
                onClick={() => setStep(6)}
                className="px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
              >
                <span>Next: Customize Subjects</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: INITIAL SUBJECT CUSTOMIZATION & DAILY STUDY GOAL */}
        {/* ========================================================================= */}
        {step === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Customize Subjects & Study Plan</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {targetExam === 'JAMB' 
                  ? 'JAMB UTME mandates exactly 4 subjects. Tap any subject to add or replace.'
                  : 'Select your core and elective subjects. English Studies and Mathematics are compulsory.'}
              </p>
            </div>

            {/* Subject Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {SEED_SUBJECTS
                .filter(s => isJunior ? s.level === 'junior' : s.level === 'senior')
                .map(sub => {
                  const isSelected = selectedSubjects.includes(sub.id);
                  const isCompulsory = sub.is_compulsory;

                  return (
                    <div
                      key={sub.id}
                      onClick={() => toggleSubject(sub.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-slate-900'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: sub.color || '#2563EB' }}
                        >
                          {sub.code}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                            <span>{sub.name}</span>
                            {isCompulsory && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">
                                Core
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected ? 'bg-blue-700 border-blue-700 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Subject Status Counter */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>
                  Enrolled in <strong className="text-slate-900">{selectedSubjects.length} subjects</strong>
                </span>
              </div>
              {targetExam === 'JAMB' && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  selectedSubjects.length === 4
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {selectedSubjects.length === 4 ? 'Optimal JAMB 4' : `${selectedSubjects.length} of 4 selected`}
                </span>
              )}
            </div>

            {/* Daily Commitment & Exam Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>Target Exam Date</span>
                </label>
                <input
                  id="input-exam-date"
                  type="date"
                  value={examDate}
                  onChange={e => setExamDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-hidden focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Daily Study Commitment</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDailyMinutes(mins)}
                      className={`py-2 rounded-lg border text-center text-xs transition font-semibold ${
                        dailyMinutes === mins
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                id="btn-complete-onboarding"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm active:scale-98 transition"
              >
                <span>Save & Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 7: CELEBRATION & WELCOME BONUS */}
        {/* ========================================================================= */}
        {step === 7 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-200 py-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
              <Award className="w-10 h-10 text-amber-500 animate-bounce" />
            </div>

            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Profile Ready! Welcome to DelightPrep
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
                Your personalized study plan and CBT syllabus for <strong className="text-emerald-700">{targetExam}</strong> have been configured.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Welcome Reward</div>
                <div className="text-lg font-extrabold text-amber-600 mt-0.5">+150 XP</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Study Streak</div>
                <div className="text-lg font-extrabold text-emerald-700 mt-0.5">Day 1 Starter</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Referral Code</div>
                <div className="text-xs font-extrabold text-blue-700 mt-1 font-mono">{generatedReferralCode}</div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                id="btn-go-dashboard"
                onClick={onFinish}
                className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm active:scale-98 transition flex items-center justify-center gap-2 mx-auto"
              >
                <span>Enter Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-[11px] text-slate-500 py-2 border-t border-slate-200">
        A Product of Delight Tech Network • Smart Preparation for Better Results
      </footer>
    </div>
  );
};

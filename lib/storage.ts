import { 
  UserProfile, 
  StudentProfile, 
  Question, 
  Subject, 
  ExamSession, 
  ExamResult, 
  StudyPlanItem, 
  DailyChallenge, 
  Badge, 
  SubscriptionPlan,
  QuestionReport
} from '@/types/database';
import { JUNIOR_CURRICULUM_SUBJECTS, SENIOR_CURRICULUM_SUBJECTS } from '@/types/curriculum';

const STORAGE_KEYS = {
  CURRENT_USER: 'delightprep_current_user',
  CURRENT_STUDENT: 'delightprep_student_profile',
  QUESTIONS: 'delightprep_questions_bank',
  EXAM_SESSIONS: 'delightprep_exam_sessions',
  EXAM_RESULTS: 'delightprep_exam_results',
  QUESTION_REPORTS: 'delightprep_question_reports',
  STUDY_PLAN: 'delightprep_study_plan',
  STREAK_RECORD: 'delightprep_streak_record',
  UNLOCKED_BADGES: 'delightprep_unlocked_badges',
  OFFLINE_QUEUE: 'delightprep_offline_queue'
};

// High-quality Nigerian Curriculum Seed Questions (explicitly marked with DEMO_DATA)
export const SEED_QUESTIONS: Question[] = [
  // Mathematics (Senior - Algebra)
  {
    id: 'q-mth-001',
    subject_id: 's-mth',
    topic_id: 'top-algebra-quad',
    class_level: 'SSS2',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'Solve for x in the quadratic equation: 2x² - 5x - 3 = 0.',
    explanation: 'Using the factorization method: 2x² - 6x + x - 3 = 0 => 2x(x - 3) + 1(x - 3) = 0 => (2x + 1)(x - 3) = 0. Therefore, x = -1/2 or x = 3.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Curated Mathematics Vol. 2',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-mth-1a', text: 'x = 3 or x = -1/2', is_correct: true, order_index: 0 },
      { id: 'opt-mth-1b', text: 'x = -3 or x = 1/2', is_correct: false, order_index: 1 },
      { id: 'opt-mth-1c', text: 'x = 2 or x = -3', is_correct: false, order_index: 2 },
      { id: 'opt-mth-1d', text: 'x = 1/3 or x = -2', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z'
  },
  {
    id: 'q-mth-002',
    subject_id: 's-mth',
    topic_id: 'top-logarithms',
    class_level: 'SSS1',
    department: 'science',
    exam_target: 'WAEC',
    year: 2022,
    difficulty: 'easy',
    question_text: 'If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, calculate the value of log₁₀ 18 without using a calculator.',
    explanation: 'log₁₀ 18 = log₁₀ (2 × 3²) = log₁₀ 2 + 2(log₁₀ 3) = 0.3010 + 2(0.4771) = 0.3010 + 0.9542 = 1.2552.',
    source_type: 'curriculum_aligned',
    source_reference: 'NERDC Senior Secondary Mathematics Curriculum',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-mth-2a', text: '1.2552', is_correct: true, order_index: 0 },
      { id: 'opt-mth-2b', text: '1.0791', is_correct: false, order_index: 1 },
      { id: 'opt-mth-2c', text: '0.7781', is_correct: false, order_index: 2 },
      { id: 'opt-mth-2d', text: '1.4320', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-11T11:00:00Z',
    updated_at: '2026-01-11T11:00:00Z'
  },
  // English Language (Senior)
  {
    id: 'q-eng-001',
    subject_id: 's-eng',
    topic_id: 'top-concord',
    class_level: 'SSS3',
    department: 'general',
    exam_target: 'JAMB',
    year: 2024,
    difficulty: 'medium',
    question_text: 'Choose the option that best completes the sentence: "Neither the principal nor the teachers _______ present at the PTA meeting."',
    explanation: 'In subject-verb agreement governed by correlative conjunctions (neither...nor / either...or), the verb agrees with the closer subject. Since "the teachers" is plural, the plural past verb "were" is correct.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep English Mastery Guide',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-eng-1a', text: 'were', is_correct: true, order_index: 0 },
      { id: 'opt-eng-1b', text: 'was', is_correct: false, order_index: 1 },
      { id: 'opt-eng-1c', text: 'is', is_correct: false, order_index: 2 },
      { id: 'opt-eng-1d', text: 'are being', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-12T09:00:00Z',
    updated_at: '2026-01-12T09:00:00Z'
  },
  // Physics (Senior)
  {
    id: 'q-phy-001',
    subject_id: 's-phy',
    topic_id: 'top-mechanics',
    class_level: 'SSS2',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'A car starts from rest and accelerates uniformly at 2.5 m/s² for 8 seconds. What total distance does it cover during this period?',
    explanation: 'Using the kinematic equation s = ut + 1/2 at²: With u = 0, a = 2.5 m/s², t = 8 s: s = 0 + 0.5 × 2.5 × (8)² = 0.5 × 2.5 × 64 = 80 metres.',
    source_type: 'curriculum_aligned',
    source_reference: 'Senior Secondary Physics Mechanics Unit',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-phy-1a', text: '80 m', is_correct: true, order_index: 0 },
      { id: 'opt-phy-1b', text: '20 m', is_correct: false, order_index: 1 },
      { id: 'opt-phy-1c', text: '160 m', is_correct: false, order_index: 2 },
      { id: 'opt-phy-1d', text: '40 m', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-13T14:00:00Z',
    updated_at: '2026-01-13T14:00:00Z'
  },
  // Chemistry (Senior)
  {
    id: 'q-chm-001',
    subject_id: 's-chm',
    topic_id: 'top-bonding',
    class_level: 'SSS2',
    department: 'science',
    exam_target: 'JAMB',
    year: 2024,
    difficulty: 'hard',
    question_text: 'Which of the following compounds exhibits both ionic and covalent bonding?',
    explanation: 'Ammonium chloride (NH₄Cl) contains covalent bonds between nitrogen and hydrogen atoms in the ammonium ion (NH₄⁺), with one coordinate dative covalent bond, and an ionic bond between the NH₄⁺ cation and the Cl⁻ anion.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Chemistry Chemistry Challenge',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-chm-1a', text: 'NH₄Cl', is_correct: true, order_index: 0 },
      { id: 'opt-chm-1b', text: 'CH₄', is_correct: false, order_index: 1 },
      { id: 'opt-chm-1c', text: 'NaCl', is_correct: false, order_index: 2 },
      { id: 'opt-chm-1d', text: 'H₂O', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-14T15:00:00Z',
    updated_at: '2026-01-14T15:00:00Z'
  },
  // Biology (Senior)
  {
    id: 'q-bio-001',
    subject_id: 's-bio',
    topic_id: 'top-genetics',
    class_level: 'SSS3',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'If a man with blood group AB marries a woman with blood group O, what is the probability that their first child will have blood group O?',
    explanation: 'The genotype of the man is IᴬIᴮ and the woman is IᴼIᴼ. Cross: IᴬIᴼ (Group A, 50%) and IᴮIᴼ (Group B, 50%). There is 0% probability of having a child with blood group O (IᴼIᴼ).',
    source_type: 'delightprep_original',
    source_reference: 'Senior Secondary Genetics Module',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-bio-1a', text: '0%', is_correct: true, order_index: 0 },
      { id: 'opt-bio-1b', text: '25%', is_correct: false, order_index: 1 },
      { id: 'opt-bio-1c', text: '50%', is_correct: false, order_index: 2 },
      { id: 'opt-bio-1d', text: '100%', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-15T08:00:00Z',
    updated_at: '2026-01-15T08:00:00Z'
  },
  // Economics (Senior)
  {
    id: 'q-ecn-001',
    subject_id: 's-ecn',
    topic_id: 'top-elasticity',
    class_level: 'SSS2',
    department: 'commercial',
    exam_target: 'WAEC',
    year: 2023,
    difficulty: 'medium',
    question_text: 'When the percentage change in quantity demanded is zero despite a change in price, the price elasticity of demand is described as:',
    explanation: 'When quantity demanded does not respond at all to price variations (percentage change in Qd = 0), the elasticity coefficient is 0, representing perfectly inelastic demand.',
    source_type: 'curriculum_aligned',
    source_reference: 'Economics Theory & Nigerian Applications',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-ecn-1a', text: 'Perfectely inelastic', is_correct: true, order_index: 0 },
      { id: 'opt-ecn-1b', text: 'Unitary elastic', is_correct: false, order_index: 1 },
      { id: 'opt-ecn-1c', text: 'Perfectely elastic', is_correct: false, order_index: 2 },
      { id: 'opt-ecn-1d', text: 'Relatively elastic', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-16T12:00:00Z',
    updated_at: '2026-01-16T12:00:00Z'
  },
  // Government (Senior Arts)
  {
    id: 'q-gov-001',
    subject_id: 's-gov',
    topic_id: 'top-colonial-admin',
    class_level: 'SSS2',
    department: 'arts',
    exam_target: 'WAEC',
    year: 2022,
    difficulty: 'easy',
    question_text: 'The 1922 Clifford Constitution was notable in Nigerian political history primarily because it:',
    explanation: 'The Clifford Constitution of 1922 introduced the elective principle in Nigeria for the first time, allowing four elected Africans (three from Lagos and one from Calabar) into the Legislative Council.',
    source_type: 'delightprep_original',
    source_reference: 'Constitutional History of Nigeria',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-gov-1a', text: 'Introduced the elective principle', is_correct: true, order_index: 0 },
      { id: 'opt-gov-1b', text: 'Created regional houses of assembly', is_correct: false, order_index: 1 },
      { id: 'opt-gov-1c', text: 'Granted Nigeria full independence', is_correct: false, order_index: 2 },
      { id: 'opt-gov-1d', text: 'Abolished traditional ruler participation', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-17T11:00:00Z',
    updated_at: '2026-01-17T11:00:00Z'
  },
  // Junior Basic Science & Tech (BECE)
  {
    id: 'q-jbst-001',
    subject_id: 'j-bst',
    topic_id: 'top-matter-energy',
    class_level: 'JSS3',
    exam_target: 'BECE',
    year: 2024,
    difficulty: 'easy',
    question_text: 'Which organelle is known as the powerhouse of the living cell?',
    explanation: 'Mitochondria are known as the powerhouses of the cell because they generate most of the chemical energy needed to power biochemical reactions via cellular respiration.',
    source_type: 'curriculum_aligned',
    source_reference: 'Junior Secondary Basic Science Syllabus',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-jbst-1a', text: 'Mitochondrion', is_correct: true, order_index: 0 },
      { id: 'opt-jbst-1b', text: 'Nucleus', is_correct: false, order_index: 1 },
      { id: 'opt-jbst-1c', text: 'Ribosome', is_correct: false, order_index: 2 },
      { id: 'opt-jbst-1d', text: 'Chloroplast', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-18T10:00:00Z',
    updated_at: '2026-01-18T10:00:00Z'
  },
  // Junior Mathematics (JSS)
  {
    id: 'q-jmth-001',
    subject_id: 'j-mth',
    topic_id: 'top-ratios-fractions',
    class_level: 'JSS2',
    exam_target: 'Junior_WAEC',
    year: 2023,
    difficulty: 'easy',
    question_text: 'Share ₦6,000 between Tolu and Chidi in the ratio 2 : 3. How much will Chidi receive?',
    explanation: 'Total ratio parts = 2 + 3 = 5. Chidi receives 3/5 of ₦6,000 = (3 × 6000) / 5 = 18,000 / 5 = ₦3,600.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Junior Mathematics Workbook',
    license_status: 'demo_data',
    review_status: 'published',
    options: [
      { id: 'opt-jmth-1a', text: '₦3,600', is_correct: true, order_index: 0 },
      { id: 'opt-jmth-1b', text: '₦2,400', is_correct: false, order_index: 1 },
      { id: 'opt-jmth-1c', text: '₦4,000', is_correct: false, order_index: 2 },
      { id: 'opt-jmth-1d', text: '₦1,800', is_correct: false, order_index: 3 }
    ],
    created_at: '2026-01-19T09:00:00Z',
    updated_at: '2026-01-19T09:00:00Z'
  }
];

export const INITIAL_STUDY_PLAN_ITEMS: StudyPlanItem[] = [
  { id: 'plan-1', day_of_week: 1, subject_id: 's-mth', subject_name: 'General Mathematics', topic_name: 'Quadratic Equations & Polynomials', target_questions: 15, estimated_minutes: 25, is_completed: true },
  { id: 'plan-2', day_of_week: 1, subject_id: 's-eng', subject_name: 'English Language', topic_name: 'Rules of Concord & Lexis', target_questions: 20, estimated_minutes: 20, is_completed: false },
  { id: 'plan-3', day_of_week: 2, subject_id: 's-phy', subject_name: 'Physics', topic_name: 'Kinematics & Motion Graphs', target_questions: 15, estimated_minutes: 30, is_completed: false },
  { id: 'plan-4', day_of_week: 3, subject_id: 's-chm', subject_name: 'Chemistry', topic_name: 'Chemical Bonding & Periodic Trends', target_questions: 15, estimated_minutes: 25, is_completed: false },
  { id: 'plan-5', day_of_week: 4, subject_id: 's-bio', subject_name: 'Biology', topic_name: 'Mendelian Genetics & Inheritance', target_questions: 20, estimated_minutes: 30, is_completed: false },
  { id: 'plan-6', day_of_week: 5, subject_id: 's-mth', subject_name: 'General Mathematics', topic_name: 'Trigonometry & Bearings', target_questions: 20, estimated_minutes: 35, is_completed: false },
  { id: 'plan-7', day_of_week: 6, subject_id: 's-eng', subject_name: 'English Language', topic_name: 'Comprehension & Summary Strategy', target_questions: 15, estimated_minutes: 25, is_completed: false }
];

export const AVAILABLE_BADGES: Badge[] = [
  { id: 'badge-welcome', title: 'Smart Start', description: 'Completed student onboarding on DelightPrep', icon: '🚀', category: 'practice', xp_bonus: 50, unlocked_at: '2026-09-01T00:00:00Z' },
  { id: 'badge-first-practice', title: 'First Steps', description: 'Answered your first practice question session', icon: '🎯', category: 'practice', xp_bonus: 40, unlocked_at: '2026-09-02T10:00:00Z' },
  { id: 'badge-streak-7', title: '7-Day Fire', description: 'Maintained a 7-day consistent study streak', icon: '🔥', category: 'streak', xp_bonus: 150 },
  { id: 'badge-cbt-mock', title: 'CBT Champion', description: 'Simulated a full official exam session with high score', icon: '🏆', category: 'mock', xp_bonus: 200 },
  { id: 'badge-accuracy', title: 'Sharp Shooter', description: 'Scored 90%+ accuracy on 30+ questions', icon: '⚡', category: 'mastery', xp_bonus: 120 }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Delight Free',
    billing_cycle: 'monthly',
    price_ngn: 0,
    features: [
      '30 Practice questions daily',
      '1 Monthly Mini Mock Simulation',
      'Authoritative step-by-step solutions',
      'Basic progress tracking & daily streak',
      'Mobile-first PWA access'
    ]
  },
  {
    id: 'premium_monthly',
    name: 'Delight Pro Monthly',
    billing_cycle: 'monthly',
    price_ngn: 1500,
    is_popular: true,
    features: [
      'Unlimited practice across all subjects',
      'Full Official JAMB / WAEC / BECE Mock Simulations',
      'Instant AI Tutor Deep Explanations',
      'Smart diagnostic weak-topic detection',
      'Automated personalized study planner',
      'Verified performance leaderboard badges',
      'Priority academic support'
    ]
  },
  {
    id: 'premium_quarterly',
    name: 'Delight Pro Quarterly',
    billing_cycle: 'quarterly',
    price_ngn: 4050,
    original_price_ngn: 4500,
    discount_label: 'Save 10%',
    features: [
      'All Pro Monthly features for 3 months',
      'Complete term exam readiness plan',
      'Direct WhatsApp exam tips channel',
      'Downloadable offline revision summaries'
    ]
  },
  {
    id: 'premium_annual',
    name: 'Delight Pro Annual',
    billing_cycle: 'annual',
    price_ngn: 15000,
    original_price_ngn: 18000,
    discount_label: 'Save 17%',
    features: [
      'All Pro features for a full 365 days',
      'Complete coverage: BECE to JAMB & WAEC',
      'Parent progress report email digest',
      'National scholarship competition fast-track'
    ]
  }
];

// Local/Offline Storage Helpers
export function getStoredCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setStoredCurrentUser(user: UserProfile | null) {
  if (typeof window === 'undefined') return;
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } else {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }
}

export function getStoredStudentProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setStoredStudentProfile(profile: StudentProfile | null) {
  if (typeof window === 'undefined') return;
  if (!profile) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STUDENT);
  } else {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT, JSON.stringify(profile));
  }
}

export function getStoredQuestions(): Question[] {
  if (typeof window === 'undefined') return SEED_QUESTIONS;
  const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(SEED_QUESTIONS));
    return SEED_QUESTIONS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return SEED_QUESTIONS;
  }
}

export function saveStoredQuestions(questions: Question[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
}

export function saveStoredQuestion(question: Question) {
  if (typeof window === 'undefined') return;
  const existing = getStoredQuestions();
  const index = existing.findIndex(q => q.id === question.id);
  if (index >= 0) {
    existing[index] = question;
  } else {
    existing.unshift(question);
  }
  saveStoredQuestions(existing);
}

export function getStoredExamResults(): ExamResult[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveStoredExamResult(result: ExamResult) {
  if (typeof window === 'undefined') return;
  const existing = getStoredExamResults();
  localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify([result, ...existing]));
}

export function getStoredStudyPlan(): StudyPlanItem[] {
  if (typeof window === 'undefined') return INITIAL_STUDY_PLAN_ITEMS;
  const data = localStorage.getItem(STORAGE_KEYS.STUDY_PLAN);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(INITIAL_STUDY_PLAN_ITEMS));
    return INITIAL_STUDY_PLAN_ITEMS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_STUDY_PLAN_ITEMS;
  }
}

export function saveStoredStudyPlan(items: StudyPlanItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(items));
}

export function getStoredQuestionReports(): QuestionReport[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.QUESTION_REPORTS);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveStoredQuestionReport(report: QuestionReport) {
  if (typeof window === 'undefined') return;
  const existing = getStoredQuestionReports();
  localStorage.setItem(STORAGE_KEYS.QUESTION_REPORTS, JSON.stringify([report, ...existing]));
}

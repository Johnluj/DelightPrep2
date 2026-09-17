export type UserRole = 'student' | 'content_editor' | 'question_manager' | 'super_admin' | 'school_admin' | 'parent';

export type EducationLevel = 'junior' | 'senior';
export type StudentClass = 'JSS1' | 'JSS2' | 'JSS3' | 'SSS1' | 'SSS2' | 'SSS3';
export type Department = 'science' | 'commercial' | 'arts' | 'general';
export type ExamGoal = 'JAMB' | 'WAEC' | 'NECO' | 'BECE' | 'Junior_WAEC' | 'School_Exam' | 'General_Practice';

export type QuestionSourceType = 
  | 'licensed_past_question'
  | 'delightprep_original'
  | 'curriculum_aligned'
  | 'ai_draft'
  | 'authorized_external';

export type LicenseStatus = 'licensed' | 'original' | 'in_review' | 'pending_verification' | 'demo_data';

export type QuestionReviewStatus = 'draft' | 'under_review' | 'approved' | 'published' | 'suspended' | 'archived';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type SchoolCategory = 'federal_unity' | 'state_public' | 'private' | 'mission';

export interface School {
  id: string;
  name: string;
  slug: string;
  state: string;
  lga?: string;
  category: SchoolCategory;
  address?: string;
  contact_email?: string;
  phone?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Curriculum {
  id: string;
  code: string;
  name: string;
  authority: string;
  edition_year: number;
  level: EducationLevel;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  phone_number?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  school_id?: string;
  school_name?: string;
  state: string;
  current_class: StudentClass;
  level: EducationLevel;
  department?: Department;
  target_exam: ExamGoal;
  intended_course?: string;
  target_exam_date?: string;
  daily_study_minutes: number;
  enrolled_subject_ids: string[];
  xp: number;
  streak_days: number;
  last_active_date?: string;
  subscription_tier: 'free' | 'premium';
  subscription_expires_at?: string;
  trial_used: boolean;
  referral_code: string;
  referred_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface Subject {
  id: string;
  curriculum_id?: string;
  code: string;
  name: string;
  level: EducationLevel;
  department?: Department;
  is_compulsory?: boolean;
  description?: string;
  icon?: string;
  color?: string;
  created_at?: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  curriculum_id?: string;
  name: string;
  class_level: StudentClass;
  term?: 1 | 2 | 3;
  order_index?: number;
  description?: string;
  learning_objectives?: string[];
  question_count?: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  is_correct: boolean;
  order_index?: number;
}

export interface Question {
  id: string;
  subject_id: string;
  topic_id?: string;
  class_level: StudentClass;
  department?: Department;
  exam_target?: ExamGoal;
  year?: number;
  difficulty: DifficultyLevel;
  question_text: string;
  image_url?: string;
  options: QuestionOption[];
  explanation: string;
  source_type?: QuestionSourceType;
  source_reference?: string;
  license_status?: LicenseStatus;
  review_status: QuestionReviewStatus;
  created_by?: string;
  reviewed_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface ExamTemplate {
  id: string;
  name: string;
  description: string;
  exam_type: ExamGoal;
  subject_configurations?: {
    subject_id: string;
    question_count: number;
  }[];
  subject_config?: {
    subject_id: string;
    question_count: number;
  }[];
  duration_minutes: number;
  total_questions: number;
  allow_calculator: boolean;
  is_official_mock: boolean;
}

export interface ExamSession {
  id: string;
  user_id: string;
  exam_template_id?: string;
  mode: 'learning' | 'cbt_exam' | 'quick_practice';
  subject_ids: string[];
  duration_seconds: number;
  time_remaining_seconds: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  questions: {
    question_id: string;
    original_question_id?: string;
    subject_id: string;
    question_text: string;
    image_url?: string;
    options: {
      id: string;
      text: string;
      display_label: 'A' | 'B' | 'C' | 'D' | 'E';
    }[];
  }[];
  answers: Record<string, string>; // question_id -> selected option_id
  flagged_question_ids: string[];
  tab_switch_count: number;
  started_at: string;
  completed_at?: string;
}

export interface ExamResult {
  id: string;
  session_id: string;
  user_id: string;
  total_questions: number;
  correct_count: number;
  wrong_count: number;
  unanswered_count: number;
  score_percentage: number;
  time_taken_seconds: number;
  subject_breakdowns: {
    subject_id: string;
    subject_name: string;
    total: number;
    correct: number;
    score_percentage: number;
  }[];
  topic_breakdowns: {
    topic_id: string;
    topic_name: string;
    subject_name: string;
    total: number;
    correct: number;
    mastery_status: 'strong' | 'average' | 'weak';
  }[];
  recommended_actions: string[];
  xp_earned: number;
  created_at: string;
}

export interface StudyPlanItem {
  id: string;
  user_id?: string;
  day_of_week: number | string; // 0-6 or string day name
  subject_id: string;
  subject_name: string;
  topic_name: string;
  target_questions: number;
  estimated_minutes: number;
  is_completed: boolean;
}

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  subject_id: string;
  subject_name: string;
  topic_name: string;
  question_ids: string[];
  xp_reward: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'practice' | 'streak' | 'mock' | 'mastery';
  xp_bonus: number;
  unlocked_at?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  full_name: string;
  username: string;
  state: string;
  school_name?: string;
  xp: number;
  streak_days: number;
  accuracy: number;
  is_current_user?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  billing_cycle: 'monthly' | 'quarterly' | 'annual';
  price_ngn: number;
  original_price_ngn?: number;
  discount_label?: string;
  features: string[];
  is_popular?: boolean;
}

export interface QuestionReport {
  id: string;
  question_id: string;
  user_id: string;
  reason: 'wrong_answer' | 'wrong_explanation' | 'typo' | 'broken_image' | 'ambiguous_question' | 'outdated' | 'other';
  details: string;
  status: 'pending' | 'resolved' | 'rejected';
  created_at: string;
}

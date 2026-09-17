-- ==============================================================================
-- DELIGHTPREP SUPABASE POSTGRESQL INITIAL SCHEMA MIGRATION
-- Migration: 20260906000001_delightprep_core_schema.sql
-- Description: Core schema for users, profiles, schools, curriculum, subjects,
--              topics, CBT exams, questions, results, gamification, and subscriptions.
-- ==============================================================================

-- 1. EXTENSIONS & PREREQUISITES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM ENUM TYPES
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('student', 'content_editor', 'question_manager', 'super_admin', 'school_admin', 'parent');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'education_level') THEN
        CREATE TYPE education_level AS ENUM ('junior', 'senior');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'student_class') THEN
        CREATE TYPE student_class AS ENUM ('JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department_type') THEN
        CREATE TYPE department_type AS ENUM ('science', 'commercial', 'arts', 'general');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'exam_goal') THEN
        CREATE TYPE exam_goal AS ENUM ('JAMB', 'WAEC', 'NECO', 'BECE', 'Junior_WAEC', 'School_Exam', 'General_Practice');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'school_category') THEN
        CREATE TYPE school_category AS ENUM ('federal_unity', 'state_public', 'private', 'mission');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'question_source_type') THEN
        CREATE TYPE question_source_type AS ENUM ('licensed_past_question', 'delightprep_original', 'curriculum_aligned', 'ai_draft', 'authorized_external');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'license_status') THEN
        CREATE TYPE license_status AS ENUM ('licensed', 'original', 'in_review', 'pending_verification', 'demo_data');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'review_status') THEN
        CREATE TYPE review_status AS ENUM ('draft', 'under_review', 'approved', 'published', 'suspended', 'archived');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'difficulty_level') THEN
        CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'session_mode') THEN
        CREATE TYPE session_mode AS ENUM ('learning', 'cbt_exam', 'quick_practice');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_tier') THEN
        CREATE TYPE subscription_tier AS ENUM ('free', 'premium');
    END IF;
END $$;

-- 3. PROFILES TABLE (Linked to auth.users in Supabase)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    avatar_url TEXT,
    role user_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SCHOOLS TABLE
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    state TEXT NOT NULL,
    lga TEXT,
    category school_category NOT NULL DEFAULT 'private',
    address TEXT,
    contact_email TEXT,
    phone TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CURRICULUM FRAMEWORK TABLE
CREATE TABLE IF NOT EXISTS public.curriculum (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    authority TEXT NOT NULL DEFAULT 'NERDC',
    edition_year INT NOT NULL DEFAULT 2026,
    level education_level NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curriculum_id UUID REFERENCES public.curriculum(id) ON DELETE SET NULL,
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    level education_level NOT NULL,
    department department_type,
    is_compulsory BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TOPICS TABLE
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    curriculum_id UUID REFERENCES public.curriculum(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    class_level student_class NOT NULL,
    term INT CHECK (term IN (1, 2, 3)),
    order_index INT NOT NULL DEFAULT 1,
    description TEXT,
    learning_objectives JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. STUDENT PROFILES TABLE (Comprehensive academic preferences)
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    school_name TEXT,
    state TEXT NOT NULL,
    current_class student_class NOT NULL,
    level education_level NOT NULL,
    department department_type,
    target_exam exam_goal NOT NULL,
    intended_course TEXT,
    target_exam_date DATE,
    daily_study_minutes INT NOT NULL DEFAULT 45,
    enrolled_subject_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    xp INT NOT NULL DEFAULT 0,
    streak_days INT NOT NULL DEFAULT 0,
    last_active_date DATE,
    subscription_tier subscription_tier NOT NULL DEFAULT 'free',
    subscription_expires_at TIMESTAMPTZ,
    trial_used BOOLEAN NOT NULL DEFAULT FALSE,
    referral_code TEXT UNIQUE NOT NULL,
    referred_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. QUESTIONS TABLE & QUESTION OPTIONS
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    class_level student_class NOT NULL,
    department department_type,
    exam_target exam_goal,
    year INT,
    difficulty difficulty_level NOT NULL DEFAULT 'medium',
    question_text TEXT NOT NULL,
    image_url TEXT,
    explanation TEXT NOT NULL,
    source_type question_source_type NOT NULL,
    source_reference TEXT,
    license_status license_status NOT NULL DEFAULT 'demo_data',
    review_status review_status NOT NULL DEFAULT 'draft',
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.question_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. EXAM TEMPLATES, SESSIONS & RESULTS
CREATE TABLE IF NOT EXISTS public.exam_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    exam_type exam_goal NOT NULL,
    duration_minutes INT NOT NULL,
    total_questions INT NOT NULL,
    subject_config JSONB NOT NULL,
    allow_calculator BOOLEAN NOT NULL DEFAULT FALSE,
    is_official_mock BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_template_id UUID REFERENCES public.exam_templates(id) ON DELETE SET NULL,
    mode session_mode NOT NULL,
    duration_seconds INT NOT NULL,
    time_remaining_seconds INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'completed', 'abandoned'
    questions_data JSONB NOT NULL,
    answers JSONB NOT NULL DEFAULT '{}'::jsonb,
    flagged_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
    tab_switch_count INT NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.exam_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    wrong_count INT NOT NULL,
    unanswered_count INT NOT NULL,
    score_percentage NUMERIC(5, 2) NOT NULL,
    time_taken_seconds INT NOT NULL,
    subject_breakdowns JSONB NOT NULL,
    topic_breakdowns JSONB NOT NULL,
    recommended_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
    xp_earned INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. GAMIFICATION & SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.daily_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_date DATE NOT NULL UNIQUE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id),
    title TEXT NOT NULL,
    question_ids JSONB NOT NULL,
    xp_reward INT NOT NULL DEFAULT 80,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_daily_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES public.daily_challenges(id) ON DELETE CASCADE,
    score INT NOT NULL,
    total INT NOT NULL,
    xp_earned INT NOT NULL,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, challenge_id)
);

CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    xp_bonus INT NOT NULL DEFAULT 50
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    billing_cycle TEXT NOT NULL,
    price_ngn INT NOT NULL,
    discount_label TEXT,
    features JSONB NOT NULL,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reference TEXT UNIQUE NOT NULL,
    gateway TEXT NOT NULL DEFAULT 'paystack',
    plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
    amount_kobo BIGINT NOT NULL,
    status TEXT NOT NULL,
    gateway_response JSONB,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 12. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_schools_state ON public.schools(state);
CREATE INDEX IF NOT EXISTS idx_schools_category ON public.schools(category);
CREATE INDEX IF NOT EXISTS idx_schools_slug ON public.schools(slug);
CREATE INDEX IF NOT EXISTS idx_curriculum_level ON public.curriculum(level, is_active);
CREATE INDEX IF NOT EXISTS idx_subjects_code ON public.subjects(code);
CREATE INDEX IF NOT EXISTS idx_subjects_level_dept ON public.subjects(level, department);
CREATE INDEX IF NOT EXISTS idx_topics_subject_class ON public.topics(subject_id, class_level);
CREATE INDEX IF NOT EXISTS idx_topics_class_term ON public.topics(class_level, term);
CREATE INDEX IF NOT EXISTS idx_student_profiles_user ON public.student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_student_profiles_school ON public.student_profiles(school_id);
CREATE INDEX IF NOT EXISTS idx_student_profiles_exam ON public.student_profiles(target_exam);
CREATE INDEX IF NOT EXISTS idx_student_profiles_state ON public.student_profiles(state);
CREATE INDEX IF NOT EXISTS idx_student_profiles_xp ON public.student_profiles(xp DESC);
CREATE INDEX IF NOT EXISTS idx_questions_subject_class ON public.questions(subject_id, class_level);
CREATE INDEX IF NOT EXISTS idx_questions_exam_target ON public.questions(exam_target);
CREATE INDEX IF NOT EXISTS idx_questions_review_status ON public.questions(review_status);
CREATE INDEX IF NOT EXISTS idx_exam_sessions_user ON public.exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_results_user ON public.exam_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_daily_challenges_user ON public.user_daily_challenges(user_id);

-- ==============================================================================
-- 13. AUTOMATIC USER SYNC TRIGGER (auth.users -> public.profiles)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, username, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4)),
        COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student'::user_role)
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        updated_at = NOW();
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind trigger to Supabase auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Public Read Catalog Policies
CREATE POLICY "Schools are viewable by everyone" ON public.schools FOR SELECT USING (true);
CREATE POLICY "Curriculum is viewable by everyone" ON public.curriculum FOR SELECT USING (true);
CREATE POLICY "Subjects are viewable by everyone" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Topics are viewable by everyone" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Subscription plans viewable by everyone" ON public.subscription_plans FOR SELECT USING (true);
CREATE POLICY "Badges viewable by everyone" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Daily challenges viewable by everyone" ON public.daily_challenges FOR SELECT USING (true);
CREATE POLICY "Exam templates viewable by authenticated users" ON public.exam_templates FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Published questions viewable by authenticated users" ON public.questions FOR SELECT USING (review_status = 'published');
CREATE POLICY "Question options viewable by authenticated users" ON public.question_options FOR SELECT USING (true);

-- User-Specific Profile Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Student Profiles Policies
CREATE POLICY "Students can view own student profile" ON public.student_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students can update own student profile" ON public.student_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students can insert own student profile" ON public.student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Exam Sessions and Results Policies
CREATE POLICY "Students manage own exam sessions" ON public.exam_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Students view own exam results" ON public.exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students insert own exam results" ON public.exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Question Reports & Gamification
CREATE POLICY "Students submit question reports" ON public.question_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students view own challenges" ON public.user_daily_challenges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Students view own badges" ON public.user_badges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Students view own payment transactions" ON public.payment_transactions FOR SELECT USING (auth.uid() = user_id);

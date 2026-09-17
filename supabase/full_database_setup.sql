-- ==============================================================================
-- DELIGHTPREP — COMPREHENSIVE SUPABASE DATABASE SETUP & UPDATE SCRIPT
-- Project: DelightPrep (Nigerian Secondary & Exam Prep CBT Platform)
-- Compatibility: Supabase PostgreSQL 15+
--
-- Instructions:
-- 1. Open your Supabase Dashboard -> Project "jvxvwnrphpqwdiqfhdpb"
-- 2. Go to "SQL Editor" -> Click "New query"
-- 3. Paste this entire script and click "RUN"
-- ==============================================================================

-- 1. EXTENSIONS
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

-- 4. NIGERIAN SECONDARY SCHOOLS
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

-- 5. CURRICULUM FRAMEWORKS (NERDC Standard)
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

-- 6. SUBJECTS
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

-- 7. TOPICS
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

-- 8. STUDENT PROFILES (Onboarding, targets, streak & gamification)
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

-- 9. QUESTIONS & OPTIONS
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
    review_status review_status NOT NULL DEFAULT 'published',
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
    status TEXT NOT NULL DEFAULT 'pending',
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. EXAM TEMPLATES, CBT SESSIONS & RESULTS
CREATE TABLE IF NOT EXISTS public.exam_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    exam_type exam_goal NOT NULL,
    duration_minutes INT NOT NULL,
    total_questions INT NOT NULL,
    subject_config JSONB NOT NULL DEFAULT '[]'::jsonb,
    allow_calculator BOOLEAN NOT NULL DEFAULT FALSE,
    is_official_mock BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exam_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    exam_template_id UUID REFERENCES public.exam_templates(id) ON DELETE SET NULL,
    mode session_mode NOT NULL,
    duration_seconds INT NOT NULL,
    time_remaining_seconds INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress',
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

-- 11. GAMIFICATION, CHALLENGES & BADGES
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
    original_price_ngn INT,
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

-- 12. PERFORMANCE INDEXES
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

-- 13. AUTH TRIGGER (Auto create public profile on Supabase Auth signup)
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

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 14. ROW LEVEL SECURITY (RLS) POLICIES
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

-- Clean existing policies for idempotency
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', pol.policyname, pol.schemaname, pol.tablename);
    END LOOP;
END $$;

-- Public readable tables (Subjects, schools, curriculum, plans, badges, questions, templates)
CREATE POLICY "Schools viewable by everyone" ON public.schools FOR SELECT USING (true);
CREATE POLICY "Curriculum viewable by everyone" ON public.curriculum FOR SELECT USING (true);
CREATE POLICY "Subjects viewable by everyone" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Topics viewable by everyone" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Subscription plans viewable by everyone" ON public.subscription_plans FOR SELECT USING (true);
CREATE POLICY "Badges viewable by everyone" ON public.badges FOR SELECT USING (true);
CREATE POLICY "Daily challenges viewable by everyone" ON public.daily_challenges FOR SELECT USING (true);
CREATE POLICY "Exam templates viewable by everyone" ON public.exam_templates FOR SELECT USING (true);
CREATE POLICY "Published questions viewable by everyone" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Question options viewable by everyone" ON public.question_options FOR SELECT USING (true);

-- User Profiles
CREATE POLICY "Profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Student Profiles
CREATE POLICY "Student profiles viewable by everyone" ON public.student_profiles FOR SELECT USING (true);
CREATE POLICY "Students can update own student profile" ON public.student_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Students can insert own student profile" ON public.student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Exam Sessions & Results
CREATE POLICY "Students manage own exam sessions" ON public.exam_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Students view own exam results" ON public.exam_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Students insert own exam results" ON public.exam_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Questions Reporting & Interaction
CREATE POLICY "Students submit question reports" ON public.question_reports FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students view own challenges" ON public.user_daily_challenges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Students manage own challenges" ON public.user_daily_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students view own badges" ON public.user_badges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Students unlock own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Students view own payment transactions" ON public.payment_transactions FOR SELECT USING (auth.uid() = user_id);

-- ==============================================================================
-- 15. SEED DATA (Curriculum, Schools, Subjects, Topics, Badges, Plans, Templates, Questions)
-- ==============================================================================

-- 15.1 Official NERDC Curriculum
INSERT INTO public.curriculum (id, code, name, authority, edition_year, level, description, is_active)
VALUES
    ('c0000000-0000-0000-0000-000000000001', 'NERDC-2026-JUNIOR', 'NERDC Universal Basic Education Curriculum (Junior Secondary)', 'NERDC', 2026, 'junior', 'Official standard Nigerian 9-year basic educational curriculum for JSS1 to JSS3', true),
    ('c0000000-0000-0000-0000-000000000002', 'NERDC-2026-SENIOR', 'NERDC Senior Secondary Education Curriculum', 'NERDC', 2026, 'senior', 'Official national syllabus for SSS1 to SSS3 aligned with WAEC, NECO, and JAMB UTME specifications', true)
ON CONFLICT (code) DO NOTHING;

-- -- 15.2 Verified Nigerian Secondary Schools
INSERT INTO public.schools (id, name, slug, state, lga, category, address, contact_email, is_verified)
VALUES
    ('a0000000-0000-0000-0000-000000000001', 'King''s College, Lagos', 'kings-college-lagos', 'Lagos', 'Lagos Island', 'federal_unity', '3 Catholic Mission Street, Lagos Island', 'info@kingscollegelagos.sch.ng', true),
    ('a0000000-0000-0000-0000-000000000002', 'Queen''s College, Lagos', 'queens-college-lagos', 'Lagos', 'Yaba', 'federal_unity', 'Birrel Avenue, Sabo-Yaba, Lagos', 'info@queenscollegelagos.sch.ng', true),
    ('a0000000-0000-0000-0000-000000000003', 'Federal Government College, Ijanikin', 'fgc-ijanikin', 'Lagos', 'Ojo', 'federal_unity', 'Km 28 Badagry Expressway, Ijanikin, Lagos', 'info@fgcijanikin.sch.ng', true),
    ('a0000000-0000-0000-0000-000000000004', 'Loyola Jesuit College, Abuja', 'loyola-jesuit-college-abuja', 'FCT - Abuja', 'Gidan Mangoro', 'mission', 'Karimu Access Road, Gidan Mangoro, Abuja', 'admissions@loyolajesuit.org', true),
    ('a0000000-0000-0000-0000-000000000005', 'Corona Secondary School, Agbara', 'corona-secondary-agbara', 'Ogun', 'Ado-Odo/Ota', 'private', 'Yenagoa Road, Agbara Estate, Ogun State', 'secondary@coronaschools.org', true),
    ('a0000000-0000-0000-0000-000000000006', 'Government College, Ibadan', 'government-college-ibadan', 'Oyo', 'Ibadan South-West', 'state_public', 'Apata, Ibadan, Oyo State', 'info@gci.org.ng', true),
    ('a0000000-0000-0000-0000-000000000007', 'Christ the King College (CKC), Onitsha', 'ckc-onitsha', 'Anambra', 'Onitsha North', 'mission', 'Oguta Road, Onitsha, Anambra State', 'info@ckconitsha.org', true),
    ('a0000000-0000-0000-0000-000000000008', 'Atlantic Hall School, Poka-Epe', 'atlantic-hall-poka-epe', 'Lagos', 'Epe', 'private', 'Poka, Epe, Lagos State', 'contactus@atlantic-hall.net', true),
    ('a0000000-0000-0000-0000-000000000009', 'Federal Government Academy, Suleja', 'fga-suleja', 'Niger', 'Suleja', 'federal_unity', 'Suleja-Kaduna Road, Suleja, Niger State', 'info@fgasuleja.sch.ng', true),
    ('a0000000-0000-0000-0000-000000000010', 'Grange School, Ikeja', 'grange-school-ikeja', 'Lagos', 'Ikeja', 'private', 'Harold Shodipo Crescent, GRA Ikeja, Lagos', 'info@grangeschool.com', true),
    ('a0000000-0000-0000-0000-000000000011', 'Barewa College, Zaria', 'barewa-college-zaria', 'Kaduna', 'Zaria', 'state_public', 'Gaskiya Road, Zaria, Kaduna State', 'info@barewacollege.edu.ng', true),
    ('a0000000-0000-0000-0000-000000000012', 'Federal Government Girls'' College, Calabar', 'fggc-calabar', 'Cross River', 'Calabar Municipal', 'federal_unity', 'Murtala Mohammed Highway, Calabar', 'info@fggccalabar.sch.ng', true)
ON CONFLICT (slug) DO NOTHING;

-- 15.3 Curriculum Aligned Subjects
INSERT INTO public.subjects (id, curriculum_id, code, name, level, department, is_compulsory, description, icon, color)
VALUES
    -- Junior Subjects
    ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'J-ENG', 'English Studies', 'junior', 'general', true, 'Comprehension, grammar, phonetics, and composition for JSS1-3 BECE', 'BookOpen', 'blue'),
    ('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'J-MTH', 'Mathematics', 'junior', 'general', true, 'Number & numeration, basic algebra, geometry, mensuration, and everyday statistics', 'Calculator', 'emerald'),
    ('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'J-BST', 'Basic Science & Technology', 'junior', 'general', true, 'Living & non-living things, energy, ICT fundamentals, and basic technology concepts', 'FlaskConical', 'purple'),
    ('b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'J-SOS', 'National Values & Civic', 'junior', 'general', true, 'Social studies, civic education, cultural identity, and democratic values', 'Shield', 'amber'),
    ('b0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 'J-BUS', 'Business Studies', 'junior', 'general', false, 'Office practice, bookkeeping, commerce, keyboarding, and trade basics', 'Briefcase', 'cyan'),
    
    -- Senior Subjects
    ('b0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000002', 'ENG', 'English Language', 'senior', 'general', true, 'Lexis & structure, oral English, essay writing, comprehension, and summary', 'BookOpen', 'blue'),
    ('b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'MTH', 'General Mathematics', 'senior', 'general', true, 'Algebra, Euclidean geometry, trigonometry, calculus, and statistics', 'Divide', 'emerald'),
    ('b0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000002', 'PHY', 'Physics', 'senior', 'science', false, 'Mechanics, heat, waves, optics, electricity, magnetism, and atomic physics', 'Zap', 'violet'),
    ('b0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000002', 'CHM', 'Chemistry', 'senior', 'science', false, 'Atomic structure, periodic table, chemical bonding, stoichiometry, and organic chemistry', 'FlaskConical', 'pink'),
    ('b0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000002', 'BIO', 'Biology', 'senior', 'science', false, 'Cell biology, genetics, human anatomy, ecology, physiology, and nutrition', 'Dna', 'green'),
    ('b0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000002', 'ECN', 'Economics', 'senior', 'commercial', false, 'Microeconomics, macroeconomics, fiscal policies, money and banking, international trade', 'TrendingUp', 'teal'),
    ('b0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000002', 'GOV', 'Government', 'senior', 'arts', false, 'Political systems, Nigerian constitution, colonialism, federalism, international organizations', 'Landmark', 'orange'),
    ('b0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000002', 'LIT', 'Literature in English', 'senior', 'arts', false, 'African drama & prose, non-African drama, poetry analysis, literary devices', 'Feather', 'rose'),
    ('b0000000-0000-0000-0000-000000000019', 'c0000000-0000-0000-0000-000000000002', 'COM', 'Commerce', 'senior', 'commercial', false, 'Trade, aids to trade, marketing, transport, insurance, banking, capital market', 'ShoppingBag', 'amber'),
    ('b0000000-0000-0000-0000-000000000020', 'c0000000-0000-0000-0000-000000000002', 'ACC', 'Financial Accounting', 'senior', 'commercial', false, 'Ledger accounts, final accounts, partnerships, depreciation, bank reconciliation', 'Receipt', 'indigo')
ON CONFLICT (code) DO NOTHING;

-- 15.4 Foundational Curriculum Topics
INSERT INTO public.topics (id, subject_id, curriculum_id, name, class_level, term, order_index, description)
VALUES
    ('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'Number Bases and Modular Arithmetic', 'SSS1', 1, 1, 'Conversion between base 10 and other bases, addition and subtraction in various bases'),
    ('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'Logarithms, Indices and Surds', 'SSS2', 1, 2, 'Laws of indices, logarithmic equations, rationalization of surds'),
    ('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'Calculus: Differentiation and Integration', 'SSS3', 1, 3, 'Rate of change, maxima and minima, definite and indefinite integration'),
    ('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000002', 'Concord and Grammatical Agreement', 'SSS2', 1, 1, 'Subject-verb agreement rules, collective nouns, proximity rule'),
    ('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000002', 'Kinematics and Newton''s Laws of Motion', 'SSS1', 2, 1, 'Equations of motion, projectile motion, impulse, momentum and conservation laws'),
    ('d0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000002', 'Periodic Table and Chemical Periodicity', 'SSS1', 1, 1, 'Electronic configuration, ionization energy, electronegativity trends'),
    ('d0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000002', 'Genetics and Heredity', 'SSS3', 1, 1, 'Mendelian genetics, monohybrid cross, ABO blood groups, sex-linked inheritance')
ON CONFLICT (id) DO NOTHING;

-- 15.5 Subscription Plans
INSERT INTO public.subscription_plans (id, name, billing_cycle, price_ngn, original_price_ngn, discount_label, features, is_popular, is_active)
VALUES
    ('free_starter', 'Starter Free', 'Lifetime', 0, NULL, 'No Card Required', 
     '["Access to 500+ verified practice questions", "1 Mock exam per week", "Basic score diagnostic summaries", "Curriculum study guides"]'::jsonb, 
     false, true),
    ('term_pass', 'Term CBT Pass', 'Per Term (3 Months)', 4500, 5500, 'Save 20%', 
     '["Unlimited CBT exam simulations", "Full 180-question JAMB timer engine", "AI Step-by-Step explanation tutor", "WAEC theory marking breakdowns", "Offline PWA caching"]'::jsonb, 
     true, true),
    ('annual_champion', 'Annual Champion', 'Per Year (12 Months)', 12000, 18000, 'Best Value (33% Off)', 
     '["Everything in Term CBT Pass", "Priority access to 2026 mock predicted questions", "Personalized weak-area study plans", "Weekly school leaderboard competitions", "Parent weekly progress email reports"]'::jsonb, 
     false, true)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price_ngn = EXCLUDED.price_ngn,
    features = EXCLUDED.features;

-- 15.6 Badges
INSERT INTO public.badges (id, title, description, icon, category, xp_bonus)
VALUES
    ('welcome_scholar', 'Welcome Scholar', 'Completed student profile onboarding on DelightPrep', 'GraduationCap', 'onboarding', 150),
    ('streak_fire_7', 'Consistency Champion', 'Maintained a 7-day continuous study practice streak', 'Flame', 'streak', 200),
    ('jamb_scoring_300', 'UTME 300+ Achiever', 'Scored 300 or above in a full JAMB 4-subject CBT simulation', 'Crown', 'exam', 500),
    ('speed_calculator', 'Speed Demon', 'Answered 40 questions in under 20 minutes with >80% accuracy', 'Zap', 'performance', 250),
    ('flawless_math', 'Math Whiz', 'Attained a 100% score on any Mathematics test', 'Award', 'subject', 300)
ON CONFLICT (id) DO NOTHING;

-- 15.7 Exam Templates
INSERT INTO public.exam_templates (id, name, description, exam_type, duration_minutes, total_questions, subject_config, allow_calculator, is_official_mock, is_active)
VALUES
    ('e0000000-0000-0000-0000-000000000001', 'Official JAMB UTME Simulation (180 Qs)', 
     'Standard 4-subject combination: English (60 questions) + 3 Chosen Subjects (40 questions each). Realistic 2-hour countdown.',
     'JAMB', 120, 180, 
     '[{"code": "ENG", "question_count": 60}, {"code": "MTH", "question_count": 40}, {"code": "PHY", "question_count": 40}, {"code": "CHM", "question_count": 40}]'::jsonb,
     true, true, true),
    ('e0000000-0000-0000-0000-000000000002', 'WAEC General Mathematics Objective Mock', 
     'Standard 50-question WAEC Senior School Certificate Examination simulation paper.',
     'WAEC', 90, 50, 
     '[{"code": "MTH", "question_count": 50}]'::jsonb,
     false, true, true),
    ('e0000000-0000-0000-0000-000000000003', 'BECE Basic Science & Technology Test', 
     'Junior Secondary School certificate examination practice paper covering integrated science and computer studies.',
     'BECE', 40, 30, 
     '[{"code": "J-BST", "question_count": 30}]'::jsonb,
     false, false, true)
ON CONFLICT (id) DO NOTHING;

-- 15.8 Questions & Options Seed
INSERT INTO public.questions (id, subject_id, topic_id, class_level, department, exam_target, year, difficulty, question_text, explanation, source_type, source_reference, license_status, review_status)
VALUES
    ('f0000000-0000-0000-0000-000000000001', 
     'b0000000-0000-0000-0000-000000000013', 
     'd0000000-0000-0000-0000-000000000005', 
     'SSS1', 'science', 'JAMB', 2023, 'medium',
     'A car accelerates uniformly from rest at 3 m/s² for 8 seconds. What distance does it cover during this period?',
     'Using the second equation of motion: S = ut + 0.5at². Given u = 0 (rest), a = 3 m/s², t = 8s. S = 0 + 0.5 × 3 × (8)² = 0.5 × 3 × 64 = 96 m.',
     'delightprep_original', 'DelightPrep Physics Mechanics Series', 'demo_data', 'published'),

    ('f0000000-0000-0000-0000-000000000002', 
     'b0000000-0000-0000-0000-000000000013', 
     'd0000000-0000-0000-0000-000000000005', 
     'SSS2', 'science', 'JAMB', 2022, 'easy',
     'Three resistors of 4 Ω, 6 Ω, and 12 Ω are connected in parallel. What is their effective total resistance?',
     'For parallel resistors: 1/R = 1/4 + 1/6 + 1/12 = (3 + 2 + 1)/12 = 6/12 = 1/2. Therefore R = 2.0 Ω.',
     'delightprep_original', 'DelightPrep Electric Circuits Bench', 'demo_data', 'published'),

    ('f0000000-0000-0000-0000-000000000003', 
     'b0000000-0000-0000-0000-000000000014', 
     'd0000000-0000-0000-0000-000000000006', 
     'SSS3', 'science', 'JAMB', 2023, 'medium',
     'Which of the following compounds will decolorize bromine water in 1,1,1-trichloroethane in the dark?',
     'Ethene (C₂H₄) contains an unsaturated carbon-carbon double bond (>C=C<). It undergoes rapid electrophilic addition with bromine even in the dark to form 1,2-dibromoethane, turning reddish-brown bromine water colorless.',
     'delightprep_original', 'DelightPrep Chemistry Hydrocarbons Series', 'demo_data', 'published'),

    ('f0000000-0000-0000-0000-000000000004', 
     'b0000000-0000-0000-0000-000000000014', 
     'd0000000-0000-0000-0000-000000000006', 
     'SSS1', 'science', 'WAEC', 2022, 'easy',
     'What volume in dm³ does 0.25 moles of oxygen gas (O₂) occupy at standard temperature and pressure (s.t.p)? [Molar volume of gas at s.t.p = 22.4 dm³]',
     'Volume at s.t.p = Number of moles × Molar volume = 0.25 mol × 22.4 dm³/mol = 5.60 dm³.',
     'curriculum_aligned', 'WAEC Chemistry Standards', 'demo_data', 'published'),

    ('f0000000-0000-0000-0000-000000000005', 
     'b0000000-0000-0000-0000-000000000015', 
     'd0000000-0000-0000-0000-000000000007', 
     'SSS3', 'science', 'JAMB', 2023, 'medium',
     'In a monohybrid cross between two heterozygous tall pea plants (Tt), what proportion of the offspring are expected to be phenotypically tall?',
     'Crossing Tt × Tt yields genotypes 1 TT : 2 Tt : 1 tt. The dominant allele T gives the tall phenotype. Therefore, TT (25%) + Tt (50%) = 75% phenotypically tall, while tt (25%) is dwarf/short.',
     'delightprep_original', 'DelightPrep Senior Biology Modules', 'demo_data', 'published'),

    ('f0000000-0000-0000-0000-000000000006', 
     'b0000000-0000-0000-0000-000000000011', 
     'd0000000-0000-0000-0000-000000000004', 
     'SSS2', 'general', 'JAMB', 2023, 'medium',
     'Choose the option that best completes the sentence: "Neither the principal nor the teachers _______ present at the inter-house sports briefing."',
     'Under the grammatical rule of proximity with "neither... nor", the verb agrees in number and person with the nearest subject. Since "the teachers" is plural, the plural past verb "were" is correct.',
     'delightprep_original', 'DelightPrep English Syntax Mastery', 'demo_data', 'published'),

    ('f0000000-0000-0000-0000-000000000007', 
     'b0000000-0000-0000-0000-000000000012', 
     'd0000000-0000-0000-0000-000000000001', 
     'SSS1', 'general', 'WAEC', 2023, 'easy',
     'Convert the number 11011 in base 2 (binary) to its base 10 (denary) equivalent.',
     '11011₂ = (1 × 2⁴) + (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 16 + 8 + 0 + 2 + 1 = 27₁₀.',
     'delightprep_original', 'DelightPrep Math Foundations', 'demo_data', 'published')
ON CONFLICT (id) DO NOTHING;

-- Options for Question 1 (Physics - Motion)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000001', '48 m', false, 0),
    ('f0000000-0000-0000-0000-000000000001', '96 m', true, 1),
    ('f0000000-0000-0000-0000-000000000001', '192 m', false, 2),
    ('f0000000-0000-0000-0000-000000000001', '24 m', false, 3)
ON CONFLICT DO NOTHING;

-- Options for Question 2 (Physics - Resistors)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000002', '22 Ω', false, 0),
    ('f0000000-0000-0000-0000-000000000002', '2.0 Ω', true, 1),
    ('f0000000-0000-0000-0000-000000000002', '3.5 Ω', false, 2),
    ('f0000000-0000-0000-0000-000000000002', '4.0 Ω', false, 3)
ON CONFLICT DO NOTHING;

-- Options for Question 3 (Chemistry - Hydrocarbons)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000003', 'Ethane', false, 0),
    ('f0000000-0000-0000-0000-000000000003', 'Ethene', true, 1),
    ('f0000000-0000-0000-0000-000000000003', 'Ethanol', false, 2),
    ('f0000000-0000-0000-0000-000000000003', 'Ethanoic acid', false, 3)
ON CONFLICT DO NOTHING;

-- Options for Question 4 (Chemistry - Gas Volume)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000004', '5.60 dm³', true, 0),
    ('f0000000-0000-0000-0000-000000000004', '11.20 dm³', false, 1),
    ('f0000000-0000-0000-0000-000000000004', '22.40 dm³', false, 2),
    ('f0000000-0000-0000-0000-000000000004', '2.80 dm³', false, 3)
ON CONFLICT DO NOTHING;

-- Options for Question 5 (Biology - Genetics)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000005', '25% (1/4)', false, 0),
    ('f0000000-0000-0000-0000-000000000005', '50% (1/2)', false, 1),
    ('f0000000-0000-0000-0000-000000000005', '75% (3/4)', true, 2),
    ('f0000000-0000-0000-0000-000000000005', '100% (4/4)', false, 3)
ON CONFLICT DO NOTHING;

-- Options for Question 6 (English - Concord)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000006', 'was', false, 0),
    ('f0000000-0000-0000-0000-000000000006', 'were', true, 1),
    ('f0000000-0000-0000-0000-000000000006', 'is', false, 2),
    ('f0000000-0000-0000-0000-000000000006', 'are', false, 3)
ON CONFLICT DO NOTHING;

-- Options for Question 7 (Math - Binary)
INSERT INTO public.question_options (question_id, text, is_correct, order_index) VALUES
    ('f0000000-0000-0000-0000-000000000007', '25', false, 0),
    ('f0000000-0000-0000-0000-000000000007', '27', true, 1),
    ('f0000000-0000-0000-0000-000000000007', '29', false, 2),
    ('f0000000-0000-0000-0000-000000000007', '31', false, 3)
ON CONFLICT DO NOTHING;

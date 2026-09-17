-- ==============================================================================
-- DELIGHTPREP SUPABASE SEED MIGRATION
-- Migration: 20260906000002_seed_curriculum_and_schools.sql
-- Description: Seeds official NERDC curriculum, Nigerian secondary schools,
--              curriculum-aligned subjects, topics, and gamification badges.
-- ==============================================================================

-- 1. CURRICULUM FRAMEWORKS
INSERT INTO public.curriculum (id, code, name, authority, edition_year, level, description, is_active)
VALUES
    ('c0000000-0000-0000-0000-000000000001', 'NERDC-2026-JUNIOR', 'NERDC Universal Basic Education Curriculum (Junior Secondary)', 'NERDC', 2026, 'junior', 'Official standard Nigerian 9-year basic educational curriculum for JSS1 to JSS3', true),
    ('c0000000-0000-0000-0000-000000000002', 'NERDC-2026-SENIOR', 'NERDC Senior Secondary Education Curriculum', 'NERDC', 2026, 'senior', 'Official national syllabus for SSS1 to SSS3 aligned with WAEC, NECO, and JAMB UTME specifications', true)
ON CONFLICT (code) DO NOTHING;

-- 2. NIGERIAN SECONDARY SCHOOLS (Federal Unity, State Public, and Top Private/Mission Schools)
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
    ('a0000000-0000-0000-0000-000000000010', 'Granges School, Ikeja', 'grange-school-ikeja', 'Lagos', 'Ikeja', 'private', 'Harold Shodipo Crescent, GRA Ikeja, Lagos', 'info@grangeschool.com', true),
    ('a0000000-0000-0000-0000-000000000011', 'Barewa College, Zaria', 'barewa-college-zaria', 'Kaduna', 'Zaria', 'state_public', 'Gaskiya Road, Zaria, Kaduna State', 'info@barewacollege.edu.ng', true),
    ('a0000000-0000-0000-0000-000000000012', 'Federal Government Girls'' College, Calabar', 'fggc-calabar', 'Cross River', 'Calabar Municipal', 'federal_unity', 'Murtala Mohammed Highway, Calabar', 'info@fggccalabar.sch.ng', true)
ON CONFLICT (slug) DO NOTHING;

-- 3. SUBJECTS (Junior & Senior Levels)
INSERT INTO public.subjects (id, curriculum_id, code, name, level, department, is_compulsory, description, icon, color)
VALUES
    -- Junior Subjects
    ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'J-ENG', 'English Studies', 'junior', 'general', true, 'Comprehension, grammar, phonetics, and composition for JSS1-3 BECE', 'BookOpen', 'blue'),
    ('b0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'J-MTH', 'Mathematics', 'junior', 'general', true, 'Number & numeration, basic algebra, geometry, mensuration, and everyday statistics', 'Calculator', 'emerald'),
    ('b0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'J-BST', 'Basic Science & Technology', 'junior', 'general', true, 'Living & non-living things, energy, ICT fundamentals, and basic technology concepts', 'FlaskConical', 'purple'),
    ('b0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'J-SOS', 'National Values & Civic', 'junior', 'general', true, 'Social studies, civic education, cultural identity, and democratic values', 'Shield', 'amber'),
    ('b0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000001', 'J-BUS', 'Business Studies', 'junior', 'general', false, 'Office practice, bookkeeping, commerce, keyboarding, and trade basics', 'Briefcase', 'cyan'),
    
    -- Senior Subjects (Core & Departmental)
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

-- 4. FOUNDATIONAL TOPICS
INSERT INTO public.topics (subject_id, curriculum_id, name, class_level, term, order_index, description)
VALUES
    -- Mathematics Topics
    ('b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'Number Bases and Modular Arithmetic', 'SSS1', 1, 1, 'Conversion between base 10 and other bases, addition and subtraction of numbers in various bases'),
    ('b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'Logarithms, Indices and Surds', 'SSS2', 1, 2, 'Laws of indices, logarithmic equations, standard form, rationalization of surds'),
    ('b0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000002', 'Calculus: Differentiation and Integration', 'SSS3', 1, 3, 'First principles, rate of change, maxima and minima, definite and indefinite integration'),
    
    -- English Topics
    ('b0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000002', 'Concord and Grammatical Agreement', 'SSS2', 1, 1, 'Subject-verb agreement rules, collective nouns, neither/nor constructs'),
    ('b0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000002', 'Oral English: Vowel Sounds and Diphthongs', 'SSS3', 1, 2, 'Monophthongs, diphthongs, consonant clusters, stress placement and intonation patterns'),
    
    -- Physics Topics
    ('b0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000002', 'Kinematics and Newton''s Laws of Motion', 'SSS1', 2, 1, 'Linear equations of motion, projectile motion, impulse, momentum, and conservation laws'),
    ('b0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000002', 'Electromagnetism and AC Circuits', 'SSS3', 1, 2, 'Magnetic fields, Faraday''s laws, Lenz''s law, transformer calculations, resonant frequency'),

    -- Chemistry Topics
    ('b0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000002', 'Periodic Table and Chemical Periodicity', 'SSS1', 1, 1, 'Electronic configuration, ionization energy, electronegativity, atomic radii trends'),
    ('b0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000002', 'Organic Chemistry: Hydrocarbons and Alkanols', 'SSS3', 2, 2, 'Alkanes, alkenes, alkynes, functional groups, isomerism, IUPAC nomenclature and reactions')
ON CONFLICT DO NOTHING;

-- 5. SUBSCRIPTION PLANS
INSERT INTO public.subscription_plans (id, name, billing_cycle, price_ngn, discount_label, features, is_popular, is_active)
VALUES
    ('free_starter', 'Starter Free', 'Lifetime', 0, 'No Card Required', '["Access to 500+ verified questions", "1 Mock exam per week", "Basic score diagnostic summaries", "Curriculum study guides"]'::jsonb, false, true),
    ('term_pass', 'Term CBT Pass', 'Per Term (3 Months)', 4500, 'Save 30%', '["Unlimited CBT exam simulations", "Full 180-question JAMB timer engine", "AI Step-by-Step explanation tutor", "WAEC theory marking breakdowns", "Offline PWA caching"]'::jsonb, true, true),
    ('annual_champion', 'Annual Champion', 'Per Year (12 Months)', 12000, 'Best Value (50% Off)', '["Everything in Term CBT Pass", "Priority access to 2026 mock predicted questions", "Personalized weak-area study plans", "Weekly school leaderboard competitions", "Parent weekly progress SMS alerts"]'::jsonb, false, true)
ON CONFLICT (id) DO NOTHING;

-- 6. GAMIFICATION BADGES
INSERT INTO public.badges (id, title, description, icon, category, xp_bonus)
VALUES
    ('welcome_scholar', 'Welcome Scholar', 'Completed student profile onboarding on DelightPrep', 'GraduationCap', 'onboarding', 150),
    ('streak_fire_7', 'Consistency Champion', 'Maintained a 7-day continuous study practice streak', 'Flame', 'streak', 200),
    ('jamb_scoring_300', 'UTME 300+ Achiever', 'Scored 300 or above in a full JAMB 4-subject CBT simulation', 'Crown', 'exam', 500),
    ('speed_calculator', 'Speed Demon', 'Answered 40 questions in under 20 minutes with >80% accuracy', 'Zap', 'performance', 250),
    ('flawless_math', 'Math Whiz', 'Attained a 100% score on any Mathematics test', 'Award', 'subject', 300)
ON CONFLICT (id) DO NOTHING;

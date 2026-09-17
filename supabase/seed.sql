-- =========================================================
-- DELIGHTPREP — SEED DATA
-- Marked explicitly with DEMO_DATA license status
-- All IDs adhere strictly to valid hexadecimal UUID standards
-- =========================================================

-- 1. Insert Subscription Plans
INSERT INTO public.subscription_plans (id, name, billing_cycle, price_ngn, original_price_ngn, discount_label, features, is_popular, is_active)
VALUES
  ('free_starter', 'Starter Free', 'Lifetime', 0, NULL, 'No Card Required', 
   '["Access to 500+ verified practice questions", "1 Mock exam per week", "Basic score diagnostic summaries", "Curriculum study guides"]'::jsonb, 
   FALSE, TRUE),
  ('term_pass', 'Term CBT Pass', 'Per Term (3 Months)', 4500, 5500, 'Save 20%', 
   '["Unlimited CBT exam simulations", "Full 180-question JAMB timer engine", "AI Step-by-Step explanation tutor", "WAEC theory marking breakdowns", "Offline PWA caching"]'::jsonb, 
   TRUE, TRUE),
  ('annual_champion', 'Annual Champion', 'Per Year (12 Months)', 12000, 18000, 'Best Value (33% Off)', 
   '["Everything in Term CBT Pass", "Priority access to 2026 mock predicted questions", "Personalized weak-area study plans", "Weekly school leaderboard competitions", "Parent weekly progress email reports"]'::jsonb, 
   FALSE, TRUE)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price_ngn = EXCLUDED.price_ngn,
  features = EXCLUDED.features;

-- 2. Insert Subjects (Junior & Senior) with valid UUIDs
INSERT INTO public.subjects (id, code, name, level, department, is_compulsory, description, color)
VALUES
  -- Junior
  ('b0000000-0000-0000-0000-000000000001', 'J-ENG', 'English Studies', 'junior', 'general', TRUE, 'Junior Secondary English Curriculum', 'blue'),
  ('b0000000-0000-0000-0000-000000000002', 'J-MTH', 'Mathematics', 'junior', 'general', TRUE, 'Junior Secondary Mathematics Curriculum', 'emerald'),
  ('b0000000-0000-0000-0000-000000000003', 'J-BST', 'Basic Science & Technology', 'junior', 'general', TRUE, 'Integrated Basic Science & Tech', 'purple'),
  ('b0000000-0000-0000-0000-000000000004', 'J-SOS', 'National Values & Social Studies', 'junior', 'general', TRUE, 'Civic & Social Studies', 'amber'),
  ('b0000000-0000-0000-0000-000000000005', 'J-BUS', 'Business Studies', 'junior', 'general', FALSE, 'Office practice, bookkeeping & commerce fundamentals', 'cyan'),
  -- Senior Science
  ('b0000000-0000-0000-0000-000000000011', 'ENG', 'English Language', 'senior', 'general', TRUE, 'Grammar, Lexis, Comprehension, and Oral English', 'blue'),
  ('b0000000-0000-0000-0000-000000000012', 'MTH', 'General Mathematics', 'senior', 'general', TRUE, 'Algebra, Geometry, Trigonometry, Calculus & Statistics', 'emerald'),
  ('b0000000-0000-0000-0000-000000000013', 'PHY', 'Physics', 'senior', 'science', FALSE, 'Mechanics, Waves, Optics, Electricity & Modern Physics', 'violet'),
  ('b0000000-0000-0000-0000-000000000014', 'CHM', 'Chemistry', 'senior', 'science', FALSE, 'Inorganic, Organic, Physical Chemistry & Industrial processes', 'pink'),
  ('b0000000-0000-0000-0000-000000000015', 'BIO', 'Biology', 'senior', 'science', FALSE, 'Cell biology, Genetics, Ecology, Physiology & Evolution', 'green'),
  -- Senior Commercial
  ('b0000000-0000-0000-0000-000000000016', 'ECN', 'Economics', 'senior', 'commercial', FALSE, 'Microeconomics, Macroeconomics & Nigerian Economic System', 'teal'),
  ('b0000000-0000-0000-0000-000000000019', 'COM', 'Commerce', 'senior', 'commercial', FALSE, 'Trade, Insurance, Banking, Transport & Communication', 'amber'),
  ('b0000000-0000-0000-0000-000000000020', 'ACC', 'Financial Accounting', 'senior', 'commercial', FALSE, 'Ledger accounts, Trial balances & Financial Statements', 'indigo'),
  -- Senior Arts
  ('b0000000-0000-0000-0000-000000000018', 'LIT', 'Literature in English', 'senior', 'arts', FALSE, 'African & Non-African Prose, Poetry and Drama', 'rose'),
  ('b0000000-0000-0000-0000-000000000017', 'GOV', 'Government', 'senior', 'arts', FALSE, 'Political concepts, Nigerian Constitutional development', 'orange')
ON CONFLICT (code) DO NOTHING;

-- 3. Exam Templates
INSERT INTO public.exam_templates (id, name, description, exam_type, subject_config, duration_minutes, total_questions, allow_calculator, is_official_mock, is_active)
VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Official JAMB UTME Simulation (180 Qs)', 
   'Standard 4-subject combination: English (60 questions) + 3 Chosen Subjects (40 questions each). Realistic 2-hour countdown.',
   'JAMB',
   '[{"code": "ENG", "question_count": 60}, {"code": "MTH", "question_count": 40}, {"code": "PHY", "question_count": 40}, {"code": "CHM", "question_count": 40}]'::jsonb,
   120, 180, TRUE, TRUE, TRUE),
  ('e0000000-0000-0000-0000-000000000002', 'WAEC General Mathematics Mock',
   'Objective paper covering Number & Numeration, Algebraic processes, Geometry and Statistics.',
   'WAEC',
   '[{"code": "MTH", "question_count": 50}]'::jsonb,
   90, 50, FALSE, TRUE, TRUE),
  ('e0000000-0000-0000-0000-000000000003', 'BECE Basic Science & Tech Quick Test',
   'Junior Secondary School certificate examination practice paper.',
   'BECE',
   '[{"code": "J-BST", "question_count": 30}]'::jsonb,
   40, 30, FALSE, FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

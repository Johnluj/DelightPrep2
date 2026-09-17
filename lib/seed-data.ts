import { 
  Subject, 
  Topic, 
  Question, 
  ExamTemplate, 
  Badge, 
  SubscriptionPlan, 
  DailyChallenge 
} from '@/types/database';
import { CURRICULUM_QUESTIONS } from './curriculum-questions';

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
  'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
  'Taraba', 'Yobe', 'Zamfara'
];

export const JAMB_COURSE_RECOMMENDATIONS: Record<string, { department: 'science' | 'commercial' | 'arts', subjects: string[] }> = {
  'Medicine and Surgery': {
    department: 'science',
    subjects: ['eng', 'phy', 'che', 'bio']
  },
  'Pharmacy / Nursing Science': {
    department: 'science',
    subjects: ['eng', 'bio', 'che', 'phy']
  },
  'Computer Science / Software Engineering': {
    department: 'science',
    subjects: ['eng', 'mat', 'phy', 'che']
  },
  'Electrical / Mechanical Engineering': {
    department: 'science',
    subjects: ['eng', 'mat', 'phy', 'che']
  },
  'Civil / Chemical Engineering': {
    department: 'science',
    subjects: ['eng', 'mat', 'phy', 'che']
  },
  'Law (Common Law / Civil)': {
    department: 'arts',
    subjects: ['eng', 'lit', 'gov', 'crs']
  },
  'Mass Communication': {
    department: 'arts',
    subjects: ['eng', 'lit', 'gov', 'eco']
  },
  'Accounting / Banking and Finance': {
    department: 'commercial',
    subjects: ['eng', 'mat', 'eco', 'com']
  },
  'Economics / Business Administration': {
    department: 'commercial',
    subjects: ['eng', 'mat', 'eco', 'gov']
  },
  'Political Science / International Relations': {
    department: 'arts',
    subjects: ['eng', 'gov', 'lit', 'eco']
  },
  'Agricultural Science': {
    department: 'science',
    subjects: ['eng', 'agr', 'che', 'bio']
  }
};

export const SEED_SUBJECTS: Subject[] = [
  // Senior Subjects
  { id: 'eng', code: 'ENG', name: 'English Language', level: 'senior', is_compulsory: true, description: 'Lexis and structure, comprehension, oral English, and literature review.', color: '#2563EB', icon: 'BookOpen' },
  { id: 'mat', code: 'MTH', name: 'Mathematics', level: 'senior', is_compulsory: true, description: 'Algebra, trigonometry, statistics, calculus, and Euclidean geometry.', color: '#059669', icon: 'Calculator' },
  { id: 'phy', code: 'PHY', name: 'Physics', level: 'senior', department: 'science', description: 'Mechanics, heat, optics, electricity, atomic and quantum physics.', color: '#7C3AED', icon: 'Zap' },
  { id: 'che', code: 'CHE', name: 'Chemistry', level: 'senior', department: 'science', description: 'Physical, organic, and inorganic chemistry, stoichiometry, and kinetics.', color: '#DB2777', icon: 'FlaskConical' },
  { id: 'bio', code: 'BIO', name: 'Biology', level: 'senior', department: 'science', description: 'Cell biology, heredity, ecology, physiological systems, and biodiversity.', color: '#10B981', icon: 'Leaf' },
  { id: 'eco', code: 'ECO', name: 'Economics', level: 'senior', department: 'commercial', description: 'Micro/macro economics, financial institutions, and Nigerian economic structure.', color: '#F59E0B', icon: 'TrendingUp' },
  { id: 'gov', code: 'GOV', name: 'Government', level: 'senior', department: 'arts', description: 'Political systems, Nigerian constitutional history, and international relations.', color: '#DC2626', icon: 'Landmark' },
  { id: 'lit', code: 'LIT', name: 'Literature-in-English', level: 'senior', department: 'arts', description: 'African and non-African drama, poetry, prose, and literary devices.', color: '#9333EA', icon: 'Feather' },
  { id: 'com', code: 'COM', name: 'Commerce', level: 'senior', department: 'commercial', description: 'Trade, warehousing, banking, stock exchange, and insurance.', color: '#EA580C', icon: 'ShoppingBag' },
  { id: 'crs', code: 'CRS', name: 'Christian Religious Studies', level: 'senior', department: 'arts', description: 'Early church history, synoptic gospels, and biblical themes.', color: '#4F46E5', icon: 'HeartHandshake' },
  { id: 'agr', code: 'AGR', name: 'Agricultural Science', level: 'senior', department: 'science', description: 'Crop production, soil science, animal husbandry, and farm management.', color: '#16A34A', icon: 'Wheat' },

  // Junior Subjects
  { id: 'j_mat', code: 'J-MTH', name: 'Junior Mathematics', level: 'junior', is_compulsory: true, description: 'Number bases, fractions, basic algebra, plane figures, and mensuration.', color: '#059669', icon: 'Calculator' },
  { id: 'j_eng', code: 'J-ENG', name: 'Junior English Studies', level: 'junior', is_compulsory: true, description: 'Grammar, vocabulary development, reading comprehension, and speech work.', color: '#2563EB', icon: 'BookOpen' },
  { id: 'j_sci', code: 'J-SCI', name: 'Basic Science', level: 'junior', is_compulsory: true, description: 'Living things, energy, ecology, environmental conservation, and changes in matter.', color: '#0D9488', icon: 'Atom' },
  { id: 'j_tech', code: 'J-TECH', name: 'Basic Technology', level: 'junior', description: 'Technical drawing, workshop safety, woodwork, metals, building, and electronics.', color: '#475569', icon: 'Wrench' },
  { id: 'j_civic', code: 'J-CIV', name: 'Civic Education', level: 'junior', description: 'Values, democratic processes, national symbols, citizen duties, and human rights.', color: '#D97706', icon: 'ShieldCheck' },
  { id: 'j_soc', code: 'J-SOC', name: 'Social Studies', level: 'junior', description: 'Social issues, culture, family, leadership, and Nigerian environment.', color: '#E11D48', icon: 'Users' },
  { id: 'j_ict', code: 'J-ICT', name: 'Computer Studies / ICT', level: 'junior', description: 'Fundamentals of computing, word processing, internet, and information age skills.', color: '#6366F1', icon: 'Laptop' },
];

export const SEED_TOPICS: Topic[] = [
  // Senior Mathematics
  { id: 'top_alg', subject_id: 'mat', name: 'Quadratic Equations & Polynomials', class_level: 'SSS2', term: 1, question_count: 35 },
  { id: 'top_trig', subject_id: 'mat', name: 'Trigonometry & Bearing', class_level: 'SSS2', term: 2, question_count: 28 },
  { id: 'top_calc', subject_id: 'mat', name: 'Differentiation & Integration (Calculus)', class_level: 'SSS3', term: 1, question_count: 40 },
  { id: 'top_prob', subject_id: 'mat', name: 'Probability & Statistics', class_level: 'SSS1', term: 3, question_count: 30 },
  { id: 'top_seq', subject_id: 'mat', name: 'Sequences & Series (AP and GP)', class_level: 'SSS2', term: 1, question_count: 25 },

  // Senior Physics
  { id: 'top_mech', subject_id: 'phy', name: 'Mechanics: Vectors, Motion & Energy', class_level: 'SSS1', term: 2, question_count: 45 },
  { id: 'top_elec', subject_id: 'phy', name: 'Current Electricity & Circuit Laws', class_level: 'SSS2', term: 2, question_count: 32 },
  { id: 'top_waves', subject_id: 'phy', name: 'Waves, Optics & Sound', class_level: 'SSS2', term: 3, question_count: 38 },
  { id: 'top_atom', subject_id: 'phy', name: 'Atomic & Nuclear Physics', class_level: 'SSS3', term: 2, question_count: 22 },

  // Senior Chemistry
  { id: 'top_org', subject_id: 'che', name: 'Hydrocarbons & Organic Families', class_level: 'SSS3', term: 1, question_count: 50 },
  { id: 'top_stoich', subject_id: 'che', name: 'Mole Concept & Chemical Equations', class_level: 'SSS1', term: 2, question_count: 34 },
  { id: 'top_eq', subject_id: 'che', name: 'Chemical Equilibrium & Le Chatelier Principle', class_level: 'SSS2', term: 2, question_count: 26 },

  // Senior Biology
  { id: 'top_genetics', subject_id: 'bio', name: 'Genetics, Heredity & Variation', class_level: 'SSS3', term: 1, question_count: 42 },
  { id: 'top_eco_bio', subject_id: 'bio', name: 'Ecology & Nutrient Cycles', class_level: 'SSS2', term: 2, question_count: 30 },
  { id: 'top_circ', subject_id: 'bio', name: 'Circulatory & Transport Systems', class_level: 'SSS1', term: 3, question_count: 28 },

  // Senior English
  { id: 'top_lexis', subject_id: 'eng', name: 'Lexis & Structure: Idioms & Concord', class_level: 'SSS2', term: 1, question_count: 65 },
  { id: 'top_comp', subject_id: 'eng', name: 'Reading Comprehension Strategies', class_level: 'SSS1', term: 1, question_count: 30 },
  { id: 'top_oral', subject_id: 'eng', name: 'Oral English: Vowels, Stress & Intonation', class_level: 'SSS3', term: 1, question_count: 45 },

  // Junior Math & Science
  { id: 'top_j_alg', subject_id: 'j_mat', name: 'Simple Algebraic Equations', class_level: 'JSS2', term: 2, question_count: 25 },
  { id: 'top_j_geom', subject_id: 'j_mat', name: 'Angles and Plane Geometry', class_level: 'JSS3', term: 1, question_count: 20 },
  { id: 'top_j_living', subject_id: 'j_sci', name: 'Living Things & Habitat', class_level: 'JSS1', term: 1, question_count: 30 },
];

const DEMO_SEED_QUESTIONS: Question[] = [
  // Mathematics Questions
  {
    id: 'q_mat_01',
    subject_id: 'mat',
    topic_id: 'top_alg',
    class_level: 'SSS2',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'Find the roots of the quadratic equation: 2x² - 5x + 3 = 0',
    options: [
      { id: 'opt_1_a', text: 'x = 1 or x = 3/2', is_correct: true, order_index: 0 },
      { id: 'opt_1_b', text: 'x = -1 or x = -3/2', is_correct: false, order_index: 1 },
      { id: 'opt_1_c', text: 'x = 2 or x = 3', is_correct: false, order_index: 2 },
      { id: 'opt_1_d', text: 'x = 5/2 or x = 1', is_correct: false, order_index: 3 },
    ],
    explanation: 'Factorizing 2x² - 5x + 3 = 0:\n2x² - 2x - 3x + 3 = 0\n2x(x - 1) - 3(x - 1) = 0\n(2x - 3)(x - 1) = 0\nTherefore, 2x - 3 = 0 => x = 3/2, or x - 1 = 0 => x = 1.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Mathematics Editorial Panel 2024',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'q_mat_02',
    subject_id: 'mat',
    topic_id: 'top_calc',
    class_level: 'SSS3',
    department: 'science',
    exam_target: 'JAMB',
    year: 2022,
    difficulty: 'hard',
    question_text: 'If y = 3x⁴ - 5x² + 7x - 2, evaluate the derivative dy/dx when x = 2.',
    options: [
      { id: 'opt_2_a', text: '75', is_correct: false, order_index: 0 },
      { id: 'opt_2_b', text: '83', is_correct: true, order_index: 1 },
      { id: 'opt_2_c', text: '64', is_correct: false, order_index: 2 },
      { id: 'opt_2_d', text: '91', is_correct: false, order_index: 3 },
    ],
    explanation: 'Differentiating y with respect to x:\ndy/dx = d/dx(3x⁴ - 5x² + 7x - 2) = 12x³ - 10x + 7.\nSubstitute x = 2:\ndy/dx = 12(2)³ - 10(2) + 7 = 12(8) - 20 + 7 = 96 - 20 + 7 = 83.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Calculus Bank v1.2',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'q_mat_03',
    subject_id: 'mat',
    topic_id: 'top_prob',
    class_level: 'SSS1',
    department: 'science',
    exam_target: 'WAEC',
    year: 2021,
    difficulty: 'medium',
    question_text: 'A bag contains 5 red balls, 4 blue balls, and 3 green balls. If one ball is picked at random, what is the probability that it is NOT blue?',
    options: [
      { id: 'opt_3_a', text: '1/3', is_correct: false, order_index: 0 },
      { id: 'opt_3_b', text: '2/3', is_correct: true, order_index: 1 },
      { id: 'opt_3_c', text: '5/12', is_correct: false, order_index: 2 },
      { id: 'opt_3_d', text: '7/12', is_correct: false, order_index: 3 },
    ],
    explanation: 'Total balls = 5 + 4 + 3 = 12.\nP(Blue) = 4/12 = 1/3.\nProbability of NOT blue = 1 - P(Blue) = 1 - 1/3 = 2/3 (or directly (5+3)/12 = 8/12 = 2/3).',
    source_type: 'curriculum_aligned',
    source_reference: 'NERDC Senior Secondary Mathematics Curriculum',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Physics Questions
  {
    id: 'q_phy_01',
    subject_id: 'phy',
    topic_id: 'top_mech',
    class_level: 'SSS1',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'A car accelerates uniformly from rest at 3 m/s² for 8 seconds. What distance does it cover during this period?',
    options: [
      { id: 'opt_p1_a', text: '48 m', is_correct: false, order_index: 0 },
      { id: 'opt_p1_b', text: '96 m', is_correct: true, order_index: 1 },
      { id: 'opt_p1_c', text: '192 m', is_correct: false, order_index: 2 },
      { id: 'opt_p1_d', text: '24 m', is_correct: false, order_index: 3 },
    ],
    explanation: 'Using the second equation of uniform motion:\nS = ut + 0.5at².\nGiven: u = 0 (starts from rest), a = 3 m/s², t = 8 s.\nS = (0 × 8) + 0.5 × 3 × (8)² = 0.5 × 3 × 64 = 3 × 32 = 96 m.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Physics Mechanics Series',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'q_phy_02',
    subject_id: 'phy',
    topic_id: 'top_elec',
    class_level: 'SSS2',
    department: 'science',
    exam_target: 'JAMB',
    year: 2022,
    difficulty: 'easy',
    question_text: 'Three resistors of 4 Ω, 6 Ω, and 12 Ω are connected in parallel. What is their effective total resistance?',
    options: [
      { id: 'opt_p2_a', text: '22 Ω', is_correct: false, order_index: 0 },
      { id: 'opt_p2_b', text: '2.0 Ω', is_correct: true, order_index: 1 },
      { id: 'opt_p2_c', text: '3.5 Ω', is_correct: false, order_index: 2 },
      { id: 'opt_p2_d', text: '4.0 Ω', is_correct: false, order_index: 3 },
    ],
    explanation: 'For resistors in parallel:\n1/R_total = 1/R₁ + 1/R₂ + 1/R₃\n1/R_total = 1/4 + 1/6 + 1/12\nCommon denominator = 12:\n1/R_total = (3 + 2 + 1) / 12 = 6/12 = 1/2.\nR_total = 2.0 Ω.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Electric Circuits Bench',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Chemistry Questions
  {
    id: 'q_che_01',
    subject_id: 'che',
    topic_id: 'top_org',
    class_level: 'SSS3',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'Which of the following compounds will decolorize bromine water in 1,1,1-trichloroethane in the dark?',
    options: [
      { id: 'opt_c1_a', text: 'Ethane', is_correct: false, order_index: 0 },
      { id: 'opt_c1_b', text: 'Ethene', is_correct: true, order_index: 1 },
      { id: 'opt_c1_c', text: 'Ethanol', is_correct: false, order_index: 2 },
      { id: 'opt_c1_d', text: 'Ethanoic acid', is_correct: false, order_index: 3 },
    ],
    explanation: 'Ethene (C₂H₄) contains an unsaturated carbon-carbon double bond (>C=C<). It undergoes rapid electrophilic addition with bromine even in the dark, turning reddish-brown bromine water colorless (forming 1,2-dibromoethane). Saturated hydrocarbons like ethane require ultraviolet light for substitution.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Chemistry Series - Hydrocarbons',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'q_che_02',
    subject_id: 'che',
    topic_id: 'top_stoich',
    class_level: 'SSS1',
    department: 'science',
    exam_target: 'WAEC',
    year: 2022,
    difficulty: 'easy',
    question_text: 'What volume in dm³ does 0.25 moles of oxygen gas (O₂) occupy at standard temperature and pressure (s.t.p)? [Molar volume of gas at s.t.p = 22.4 dm³]',
    options: [
      { id: 'opt_c2_a', text: '5.60 dm³', is_correct: true, order_index: 0 },
      { id: 'opt_c2_b', text: '11.20 dm³', is_correct: false, order_index: 1 },
      { id: 'opt_c2_c', text: '22.40 dm³', is_correct: false, order_index: 2 },
      { id: 'opt_c2_d', text: '2.80 dm³', is_correct: false, order_index: 3 },
    ],
    explanation: 'Volume at s.t.p = Number of moles × Molar volume at s.t.p\nVolume = 0.25 mol × 22.4 dm³/mol = 5.60 dm³.',
    source_type: 'curriculum_aligned',
    source_reference: 'WAEC Chemistry Syllabus Standards',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Biology Questions
  {
    id: 'q_bio_01',
    subject_id: 'bio',
    topic_id: 'top_genetics',
    class_level: 'SSS3',
    department: 'science',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'In a monohybrid cross between two heterozygous tall pea plants (Tt), what proportion of the offspring are expected to be phenotypically tall?',
    options: [
      { id: 'opt_b1_a', text: '25% (1/4)', is_correct: false, order_index: 0 },
      { id: 'opt_b1_b', text: '50% (1/2)', is_correct: false, order_index: 1 },
      { id: 'opt_b1_c', text: '75% (3/4)', is_correct: true, order_index: 2 },
      { id: 'opt_b1_d', text: '100% (4/4)', is_correct: false, order_index: 3 },
    ],
    explanation: 'Crossing Tt × Tt yields genotypes: 1 TT, 2 Tt, 1 tt. The dominant allele T gives the tall phenotype. Therefore, TT (25%) + Tt (50%) = 75% phenotypically tall, while tt (25%) is short.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Senior Biology Modules',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // English Language Questions
  {
    id: 'q_eng_01',
    subject_id: 'eng',
    topic_id: 'top_lexis',
    class_level: 'SSS2',
    department: 'general',
    exam_target: 'JAMB',
    year: 2023,
    difficulty: 'medium',
    question_text: 'Choose the option that best completes the sentence:\nNeither the principal nor the teachers _______ present at the inter-house sports briefing.',
    options: [
      { id: 'opt_e1_a', text: 'was', is_correct: false, order_index: 0 },
      { id: 'opt_e1_b', text: 'were', is_correct: true, order_index: 1 },
      { id: 'opt_e1_c', text: 'is', is_correct: false, order_index: 2 },
      { id: 'opt_e1_d', text: 'are', is_correct: false, order_index: 3 },
    ],
    explanation: 'Under the grammatical rule of proximity with "neither... nor", the verb agrees in number and person with the nearest subject. Since "the teachers" is plural, the plural past verb "were" is correct.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep English Syntax Mastery',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'q_eng_02',
    subject_id: 'eng',
    topic_id: 'top_oral',
    class_level: 'SSS3',
    department: 'general',
    exam_target: 'JAMB',
    year: 2022,
    difficulty: 'hard',
    question_text: 'From the options lettered A to D, choose the word that has the same vowel sound as the one represented by the underlined letters: pl<u>ai</u>t',
    options: [
      { id: 'opt_e2_a', text: 'plate', is_correct: false, order_index: 0 },
      { id: 'opt_e2_b', text: 'plat', is_correct: true, order_index: 1 },
      { id: 'opt_e2_c', text: 'pleat', is_correct: false, order_index: 2 },
      { id: 'opt_e2_d', text: 'play', is_correct: false, order_index: 3 },
    ],
    explanation: 'The word "plait" is pronounced /plæt/ with the short vowel /æ/ (as in cat, plat, hat), contrary to the common error of pronouncing it like "plate" (/pleɪt/). Hence option B has the identical vowel sound.',
    source_type: 'delightprep_original',
    source_reference: 'DelightPrep Oral English Dictionary Guide',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // Junior Exam Questions
  {
    id: 'q_j_mat_01',
    subject_id: 'j_mat',
    topic_id: 'top_j_alg',
    class_level: 'JSS2',
    exam_target: 'BECE',
    year: 2023,
    difficulty: 'easy',
    question_text: 'Solve for m in the linear equation: 3(2m - 4) = 18',
    options: [
      { id: 'opt_jm_a', text: 'm = 3', is_correct: false, order_index: 0 },
      { id: 'opt_jm_b', text: 'm = 5', is_correct: true, order_index: 1 },
      { id: 'opt_jm_c', text: 'm = 4', is_correct: false, order_index: 2 },
      { id: 'opt_jm_d', text: 'm = 6', is_correct: false, order_index: 3 },
    ],
    explanation: 'Expand the bracket:\n6m - 12 = 18\nAdd 12 to both sides:\n6m = 30\nDivide by 6:\nm = 5.',
    source_type: 'curriculum_aligned',
    source_reference: 'National Examination Council BECE Bank Standards',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'q_j_sci_01',
    subject_id: 'j_sci',
    topic_id: 'top_j_living',
    class_level: 'JSS1',
    exam_target: 'BECE',
    year: 2023,
    difficulty: 'easy',
    question_text: 'Which organelle is widely referred to as the powerhouse of the cell because it generates chemical energy (ATP)?',
    options: [
      { id: 'opt_js_a', text: 'Ribosome', is_correct: false, order_index: 0 },
      { id: 'opt_js_b', text: 'Mitochondrion', is_correct: true, order_index: 1 },
      { id: 'opt_js_c', text: 'Nucleus', is_correct: false, order_index: 2 },
      { id: 'opt_js_d', text: 'Golgi Apparatus', is_correct: false, order_index: 3 },
    ],
    explanation: 'The mitochondrion (plural: mitochondria) is known as the powerhouse of the cell because cellular respiration occurs within it to synthesize ATP.',
    source_type: 'curriculum_aligned',
    source_reference: 'NERDC Basic Science JSS1',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Combine curriculum questions (45 English, 25 Math, 25 Physics, 25 Chemistry, 25 Biology) with demo questions
export const SEED_QUESTIONS: Question[] = [
  ...CURRICULUM_QUESTIONS,
  ...DEMO_SEED_QUESTIONS.filter(dq => !CURRICULUM_QUESTIONS.some(cq => cq.id === dq.id))
];

export const SEED_EXAM_TEMPLATES: ExamTemplate[] = [
  {
    id: 'jamb_official_mock',
    name: 'JAMB / UTME Official CBT Simulation',
    description: 'Realistic 4-subject UTME simulation according to the Joint Admissions and Matriculation Board standard (English 45 questions, 3 electives 25 questions each, 120 total, 2 hours).',
    exam_type: 'JAMB',
    duration_minutes: 120,
    total_questions: 120,
    allow_calculator: true,
    is_official_mock: true,
    subject_config: [
      { subject_id: 'eng', question_count: 45 },
      { subject_id: 'phy', question_count: 25 },
      { subject_id: 'che', question_count: 25 },
      { subject_id: 'bio', question_count: 25 },
    ]
  },
  {
    id: 'waec_paper1_mock',
    name: 'WAEC / SSCE Objective Practice',
    description: 'Timed general paper simulation conforming to the West African Examinations Council format for senior secondary certificate.',
    exam_type: 'WAEC',
    duration_minutes: 60,
    total_questions: 50,
    allow_calculator: true,
    is_official_mock: true,
    subject_config: [
      { subject_id: 'mat', question_count: 50 },
    ]
  },
  {
    id: 'bece_junior_mock',
    name: 'BECE / Junior WAEC Standard Test',
    description: 'Practice test for Basic Education Certificate Examination covering foundational junior secondary syllabus.',
    exam_type: 'BECE',
    duration_minutes: 45,
    total_questions: 40,
    allow_calculator: false,
    is_official_mock: true,
    subject_config: [
      { subject_id: 'j_mat', question_count: 20 },
      { subject_id: 'j_sci', question_count: 20 },
    ]
  },
  {
    id: 'speed_drill_20',
    name: 'Quick 20-Question CBT Drill',
    description: 'Rapid-fire 15-minute diagnostic drill to test your recall speed, accuracy, and examination composure.',
    exam_type: 'General_Practice',
    duration_minutes: 15,
    total_questions: 20,
    allow_calculator: false,
    is_official_mock: false,
    subject_config: [
      { subject_id: 'mat', question_count: 10 },
      { subject_id: 'eng', question_count: 10 },
    ]
  }
];

export const SEED_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Basic',
    billing_cycle: 'monthly',
    price_ngn: 0,
    features: [
      '20 practice questions daily',
      '1 full CBT mock exam per week',
      'Basic test results and answer keys',
      'Community discussion board',
      'Offline session autosave'
    ],
    is_popular: false
  },
  {
    id: 'premium_monthly',
    name: 'Premium Monthly',
    billing_cycle: 'monthly',
    price_ngn: 1500,
    discount_label: 'Most Popular',
    features: [
      'Unlimited questions across all subjects',
      'Unlimited official JAMB / WAEC mocks',
      'AI-powered step-by-step explanations',
      'Personalized adaptive study plan',
      'Weak-topic performance diagnostics',
      'Downloadable revision summaries',
      'Priority live WhatsApp & in-app support'
    ],
    is_popular: true
  },
  {
    id: 'premium_quarterly',
    name: 'Premium 3-Month Term',
    billing_cycle: 'quarterly',
    price_ngn: 4050,
    original_price_ngn: 4500,
    discount_label: 'Save 10%',
    features: [
      'Full term preparation (3 months)',
      'All Premium Monthly features included',
      'JAMB past question predictive drill',
      'Weekly progress report sent to parent/student',
      'Full offline practice cache mode'
    ],
    is_popular: false
  },
  {
    id: 'premium_annual',
    name: 'Annual Exam Pass',
    billing_cycle: 'annual',
    price_ngn: 16200,
    original_price_ngn: 18000,
    discount_label: 'Save 10% (Best Value)',
    features: [
      '365 days of unlimited preparation',
      'Ideal for JSS3 / SSS3 full session',
      'All Senior or Junior subjects included',
      'Dedicated academic mentor check-ins',
      'Certificate of readiness before official exam'
    ],
    is_popular: false
  }
];

export const SEED_BADGES: Badge[] = [
  {
    id: 'badge_first_mock',
    title: 'First Mock Complete',
    description: 'Completed your first full-length CBT simulation on DelightPrep.',
    icon: 'Trophy',
    category: 'mock',
    xp_bonus: 100,
    unlocked_at: new Date().toISOString()
  },
  {
    id: 'badge_streak_7',
    title: '7-Day Streak Master',
    description: 'Practiced consistently for 7 consecutive days without breaking your rhythm.',
    icon: 'Flame',
    category: 'streak',
    xp_bonus: 150,
    unlocked_at: new Date().toISOString()
  },
  {
    id: 'badge_centurion',
    title: '100 Questions Solved',
    description: 'Answered over 100 curriculum-aligned questions correctly.',
    icon: 'CheckCircle2',
    category: 'practice',
    xp_bonus: 200,
    unlocked_at: new Date().toISOString()
  },
  {
    id: 'badge_math_ace',
    title: 'Mathematics Ace',
    description: 'Achieved an accuracy of 85% or higher across 5 Mathematics practice sets.',
    icon: 'Target',
    category: 'mastery',
    xp_bonus: 250
  },
  {
    id: 'badge_jamb_champion',
    title: 'JAMB 300+ Club',
    description: 'Simulated a projected score exceeding 300 in the 400-point UTME CBT.',
    icon: 'Award',
    category: 'mock',
    xp_bonus: 500
  },
  {
    id: 'badge_night_owl',
    title: 'Dedicated Scholar',
    description: 'Completed a 45-minute study plan session before dawn or in the evening.',
    icon: 'GraduationCap',
    category: 'practice',
    xp_bonus: 120
  }
];

export const SEED_DAILY_CHALLENGE: DailyChallenge = {
  id: 'daily_2026_09_06',
  date: new Date().toISOString().split('T')[0],
  title: 'Today\'s 10-Question Sprint: Mathematics & Physics',
  subject_id: 'mat',
  subject_name: 'Mathematics',
  topic_name: 'Quadratic Equations & Mechanics',
  question_ids: ['q_mat_01', 'q_mat_02', 'q_mat_03', 'q_phy_01', 'q_phy_02'],
  xp_reward: 80
};

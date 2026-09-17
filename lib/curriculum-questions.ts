import { Question } from '@/types/database';

export const CURRICULUM_QUESTIONS: Question[] = [
  {
    id: "eng_01",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "PASSAGE I:\n\"Renewable energy integration in Sub-Saharan Africa has emerged as a crucial driver of industrial expansion. Despite persistent infrastructural deficits, decentralized solar mini-grids have bypassed traditional transmission bottlenecks, providing uninterrupted power to remote agrarian communities. Economic analysts argue that energy democratization fosters grassroots entrepreneurship and mitigates rural-urban drift.\"\n\nAccording to the passage, decentralized solar mini-grids are significant primarily because they:",
    options: [
      {
            "id": "eng_01_a",
            "text": "supersede all national hydro-electric installations in capacity",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_01_b",
            "text": "circumvent established transmission infrastructure constraints to empower rural settlements",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_01_c",
            "text": "compel governments to eliminate industrial energy tariffs immediately",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_01_d",
            "text": "discourage rural dwellers from pursuing agricultural livelihoods",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The passage explicitly states that decentralized solar mini-grids have \"bypassed traditional transmission bottlenecks, providing uninterrupted power to remote agrarian communities\". Option B accurately captures this meaning.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_02",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Based on Passage I, what is a direct socio-economic benefit of \"energy democratization\"?",
    options: [
      {
            "id": "eng_02_a",
            "text": "Accelerated migration of youth into overcrowded urban centers",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_02_b",
            "text": "Stimulating grassroots commerce and curtailing rural-urban drift",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_02_c",
            "text": "A monopoly over community power supplies by urban conglomerates",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_02_d",
            "text": "Complete replacement of human manual labor in farming",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The author notes that energy democratization \"fosters grassroots entrepreneurship and mitigates rural-urban drift\". Option B reflects these stated outcomes.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_03",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "The word \"mitigates\" as used in Passage I most nearly means:",
    options: [
      {
            "id": "eng_03_a",
            "text": "intensifies",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_03_b",
            "text": "alleviates or reduces",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_03_c",
            "text": "postpones indefinitely",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_03_d",
            "text": "finances",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Mitigate\" means to make something less severe, serious, or painful; in this context, it means reducing or lessening rural-urban drift.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_04",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "The tone of the author in Passage I can best be described as:",
    options: [
      {
            "id": "eng_04_a",
            "text": "cynical and dismissive",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_04_b",
            "text": "objective and analytical",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_04_c",
            "text": "overly melodramatic",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_04_d",
            "text": "satirical and mocking",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The author presents factual analysis and economic insights without emotional exaggeration or mockery, maintaining an objective, analytical tone.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_05",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Which of the following would serve as the most appropriate title for Passage I?",
    options: [
      {
            "id": "eng_05_a",
            "text": "The Total Failure of Centralized Power Grids",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_05_b",
            "text": "Solar Mini-Grids: Catalyst for Grassroots Rural Transformation",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_05_c",
            "text": "Agricultural Mechanization and Its Drawbacks",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_05_d",
            "text": "The History of Hydroelectric Power in West Africa",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The passage centers on decentralized solar mini-grids and how they bypass bottlenecks to spur rural development and curb urban migration.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_06",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "PASSAGE II:\n\"Language preservation in multilingual nations requires deliberate educational policy. When indigenous mother tongues are relegated exclusively to domestic domestic spheres, younger generations experience linguistic attrition. Cognitive researchers have demonstrated that early childhood instruction in the mother tongue accelerates subsequent mastery of second languages like English, while cultivating cultural self-esteem.\"\n\nAccording to Passage II, what phenomenon occurs when indigenous languages are confined solely to the home?",
    options: [
      {
            "id": "eng_06_a",
            "text": "Immediate bilingual fluency",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_06_b",
            "text": "Linguistic attrition among youths",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_06_c",
            "text": "The elimination of international languages",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_06_d",
            "text": "Rapid expansion of indigenous literature",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The passage expressly points out that \"When indigenous mother tongues are relegated exclusively to domestic domestic spheres, younger generations experience linguistic attrition.\"",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_07",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "In Passage II, the phrase \"linguistic attrition\" refers to:",
    options: [
      {
            "id": "eng_07_a",
            "text": "the gradual loss of language proficiency and vocabulary",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "eng_07_b",
            "text": "the rapid acquisition of foreign dialects",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "eng_07_c",
            "text": "the standardization of native orthographies",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_07_d",
            "text": "deliberate translation of legal treaties",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Linguistic attrition is the gradual weakening or loss of proficiency in a language, typically due to lack of use or exposure.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_08",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "According to cognitive research cited in Passage II, early mother tongue instruction:",
    options: [
      {
            "id": "eng_08_a",
            "text": "impairs intellectual development in scientific domains",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_08_b",
            "text": "enhances subsequent acquisition of a second language",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_08_c",
            "text": "prevents students from ever acquiring foreign languages",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_08_d",
            "text": "leads to scholastic disorientation",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The passage notes that early instruction in the mother tongue \"accelerates subsequent mastery of second languages like English\".",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_09",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The grammatical function of the underlined clause \"When indigenous mother tongues are relegated exclusively to domestic spheres\" is:",
    options: [
      {
            "id": "eng_09_a",
            "text": "Adjectival clause qualifying \"generations\"",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_09_b",
            "text": "Adverbial clause of time modifying \"experience\"",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_09_c",
            "text": "Noun clause in apposition to \"spheres\"",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_09_d",
            "text": "Prepositional phrase modifying \"attrition\"",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The subordinate clause is introduced by \"When\", answering the question \"When do younger generations experience linguistic attrition?\". Thus it is an adverbial clause of time modifying the verb \"experience\".",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_10",
    subject_id: "eng",
    topic_id: "top_comp",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "easy",
    question_text: "A suitable antonym for \"cultivating\" as used in the passage is:",
    options: [
      {
            "id": "eng_10_a",
            "text": "nurturing",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_10_b",
            "text": "eroding",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_10_c",
            "text": "initiating",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_10_d",
            "text": "protecting",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "To cultivate means to foster, develop, or encourage. Its direct opposite in this context is to erode, weaken, or undermine.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_11",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the option that best completes the sentence:\nNeither the school principal nor the subject teachers _______ present at the inter-house sports briefing yesterday.",
    options: [
      {
            "id": "eng_11_a",
            "text": "was",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_11_b",
            "text": "were",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_11_c",
            "text": "is",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_11_d",
            "text": "are",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "By the rule of proximity for correlative conjunctions (\"neither... nor\"), the verb must agree with the closer subject. Since \"subject teachers\" is plural and the event occurred \"yesterday\", the plural past verb \"were\" is correct.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_12",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The committee _______ reached a unanimous resolution on the annual budgetary allocations.",
    options: [
      {
            "id": "eng_12_a",
            "text": "have",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_12_b",
            "text": "has",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_12_c",
            "text": "are",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_12_d",
            "text": "were",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "When a collective noun (\"committee\") acts as a single indivisible unit with unanimous consensus, it takes a singular verb: \"has reached\".",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_13",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "hard",
    question_text: "The senator, as well as his three aides, _______ invited to deliver the keynote address.",
    options: [
      {
            "id": "eng_13_a",
            "text": "were",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_13_b",
            "text": "was",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_13_c",
            "text": "are",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_13_d",
            "text": "have been",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Parenthetical phrases introduced by \"as well as\", \"together with\", or \"alongside\" do not alter the number of the main subject (\"The senator\" - singular). Therefore, the singular verb \"was\" is required.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_14",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "If the invigilator had discovered the prohibited device, the candidate _______ disqualified immediately.",
    options: [
      {
            "id": "eng_14_a",
            "text": "would be",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_14_b",
            "text": "would have been",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_14_c",
            "text": "will have been",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_14_d",
            "text": "had been",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Third conditional sentences expressing an unrealized past condition (\"had discovered\") take \"would have + past participle\" (\"would have been disqualified\") in the main result clause.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_15",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "She rarely attends political rallies these days, _______?",
    options: [
      {
            "id": "eng_15_a",
            "text": "doesn't she?",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_15_b",
            "text": "does she?",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_15_c",
            "text": "isn't it?",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_15_d",
            "text": "did she?",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Adverbs with negative connotation such as \"rarely\", \"seldom\", and \"hardly\" make the statement negative; therefore, the question tag must be affirmative (\"does she?\").",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_16",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "hard",
    question_text: "The disciplinary panel recommended that the fraudulent bursar _______ suspended forthwith.",
    options: [
      {
            "id": "eng_16_a",
            "text": "is",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_16_b",
            "text": "be",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_16_c",
            "text": "was",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_16_d",
            "text": "must be",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Verbs of demand, recommendation, or decree (\"recommended that...\") take the present subjunctive mood, which requires the base form of the verb: \"be suspended\".",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_17",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS1",
    department: "general",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "The young prefect congratulated her colleagues _______ their outstanding performance in the national olympiad.",
    options: [
      {
            "id": "eng_17_a",
            "text": "for",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_17_b",
            "text": "on",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_17_c",
            "text": "with",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_17_d",
            "text": "at",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The verb \"congratulate\" takes the standard dependent preposition \"on\" (e.g., congratulate someone on an achievement).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_18",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "It is high time the Ministry of Education _______ updated curriculum guidelines for secondary institutions.",
    options: [
      {
            "id": "eng_18_a",
            "text": "publishes",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_18_b",
            "text": "published",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_18_c",
            "text": "should publish",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_18_d",
            "text": "is publishing",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The idiomatic construction \"It is high time / It is time\" followed by a subject takes a past subjunctive verb (\"published\") to express an urgent necessity that is already overdue.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_19",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "Hardly had the invigilator distributed the examination scripts _______ the power supply failed.",
    options: [
      {
            "id": "eng_19_a",
            "text": "than",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_19_b",
            "text": "when",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_19_c",
            "text": "then",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_19_d",
            "text": "that",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Correlative conjunctions: \"Hardly... when\", \"Scarcely... when\", but \"No sooner... than\". Since the sentence opens with \"Hardly\", \"when\" is the correct correlative particle.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_20",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "WAEC",
    year: 2022,
    difficulty: "medium",
    question_text: "Between you and _______, the proposed increase in tuition fees will trigger student demonstrations.",
    options: [
      {
            "id": "eng_20_a",
            "text": "I",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_20_b",
            "text": "me",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_20_c",
            "text": "myself",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_20_d",
            "text": "mine",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Between\" is a preposition, and objects of prepositions must always be in the objective case (\"Between you and me\", not \"between you and I\").",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_21",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The governor was accused of playing to the gallery during his television interview. This means he:",
    options: [
      {
            "id": "eng_21_a",
            "text": "addressed questions strictly concerning theatrical arts",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_21_b",
            "text": "attempted to gain cheap popularity by catering to popular prejudice",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_21_c",
            "text": "refused to speak until an audience gathered in the gallery",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_21_d",
            "text": "displayed rare diplomatic composure",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The idiom \"play to the gallery\" means to behave in a way intended to win applause or cheap popularity from the general public rather than addressing substance.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_22",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS1",
    department: "general",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "The student was completely taken _______ by the deceptive promise of leaked exam questions.",
    options: [
      {
            "id": "eng_22_a",
            "text": "aback",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_22_b",
            "text": "in",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_22_c",
            "text": "over",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_22_d",
            "text": "away",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The phrasal verb \"to be taken in\" means to be deceived or cheated by someone.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_23",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "No sooner had the principal stepped onto the podium _______ absolute silence fell across the assembly hall.",
    options: [
      {
            "id": "eng_23_a",
            "text": "when",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_23_b",
            "text": "than",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_23_c",
            "text": "before",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_23_d",
            "text": "as",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The correlative structure for \"No sooner\" is \"than\" (\"No sooner had X occurred than Y happened\").",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_24",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "Each of the winning candidates _______ awarded a scholarship at the convocation.",
    options: [
      {
            "id": "eng_24_a",
            "text": "were",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_24_b",
            "text": "was",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_24_c",
            "text": "have been",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_24_d",
            "text": "are",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The indefinite pronoun \"Each\" is singular and takes a singular verb (\"was awarded\"), irrespective of the plural prepositional complement \"of the winning candidates\".",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_25",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "The suspect gave a circumstantial account of his whereabouts on the night of the incident. This implies his account was:",
    options: [
      {
            "id": "eng_25_a",
            "text": "brief and evasive",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_25_b",
            "text": "detailed and containing all relevant facts",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_25_c",
            "text": "completely fabricated and deceitful",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_25_d",
            "text": "delivered under extreme duress",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "In formal English, a \"circumstantial\" account is one that provides full details and circumstances.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_26",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Choose the option OPPOSITE IN MEANING to the underlined word:\nThe accountant was commended for his <u>meticulous</u> record-keeping during the external audit.",
    options: [
      {
            "id": "eng_26_a",
            "text": "punctual",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_26_b",
            "text": "slipshod",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_26_c",
            "text": "laborious",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_26_d",
            "text": "fastidious",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Meticulous\" means showing great attention to detail and being very careful and precise. Its opposite is \"slipshod\" (careless, untidy, or sloppy).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_27",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Choose the option OPPOSITE IN MEANING to the underlined word:\nHer <u>parsimonious</u> lifestyle surprised those who knew the vast fortune she inherited.",
    options: [
      {
            "id": "eng_27_a",
            "text": "frugal",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_27_b",
            "text": "extravagant",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_27_c",
            "text": "austere",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_27_d",
            "text": "stingy",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Parsimonious\" means extremely unwilling to spend money; miserly. The direct antonym is \"extravagant\" (spending money excessively or recklessly).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_28",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "Choose the option OPPOSITE IN MEANING to the underlined word:\nThe board dismissed the proposed project as entirely <u>utopian</u>.",
    options: [
      {
            "id": "eng_28_a",
            "text": "visionary",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_28_b",
            "text": "pragmatic",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_28_c",
            "text": "idealistic",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_28_d",
            "text": "illusory",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Utopian\" means idealistic and aiming for perfection, but fundamentally impractical. Its opposite is \"pragmatic\" (dealing with things sensibly and realistically).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_29",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the option OPPOSITE IN MEANING to the underlined word:\nThe military general remained <u>dauntless</u> in the face of overwhelming insurgent fire.",
    options: [
      {
            "id": "eng_29_a",
            "text": "valiant",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_29_b",
            "text": "craven",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_29_c",
            "text": "resolute",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_29_d",
            "text": "indomitable",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Dauntless\" means showing fearlessness and determination. Its antonym is \"craven\" (contemptibly lacking in courage; cowardly).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_30",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the option OPPOSITE IN MEANING to the underlined word:\nThe medicine administered by the physician produced a <u>salutary</u> effect on the ailing patient.",
    options: [
      {
            "id": "eng_30_a",
            "text": "beneficial",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_30_b",
            "text": "deleterious",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_30_c",
            "text": "therapeutic",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_30_d",
            "text": "wholesome",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Salutary\" means producing good effects or beneficial to health. The antonym is \"deleterious\" (causing harm or damage).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_31",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Choose the option NEAREST IN MEANING to the underlined word:\nThe traditional ruler was renowned for his <u>magnanimous</u> acts toward the destitute in the kingdom.",
    options: [
      {
            "id": "eng_31_a",
            "text": "belligerent",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_31_b",
            "text": "benevolent",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_31_c",
            "text": "pompous",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_31_d",
            "text": "cunning",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Magnanimous\" means generous, noble, or forgiving. \"Benevolent\" is closest in meaning.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_32",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the option NEAREST IN MEANING to the underlined word:\nThe commissioner delivered a <u>lucid</u> presentation outlining the urban redevelopment roadmap.",
    options: [
      {
            "id": "eng_32_a",
            "text": "ambiguous",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_32_b",
            "text": "coherent and clear",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_32_c",
            "text": "lengthy and tedious",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_32_d",
            "text": "controversial",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Lucid\" means expressed clearly and easy to understand; coherent.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_33",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "Choose the option NEAREST IN MEANING to the underlined word:\nThe witness’s testimony was completely <u>spurious</u> and failed to convince the presiding judge.",
    options: [
      {
            "id": "eng_33_a",
            "text": "authentic",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_33_b",
            "text": "fabricated",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_33_c",
            "text": "pertinent",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_33_d",
            "text": "compelling",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Spurious\" means not being what it purports to be; false, counterfeit, or fabricated.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_34",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "WAEC",
    year: 2022,
    difficulty: "easy",
    question_text: "Choose the option NEAREST IN MEANING to the underlined word:\nHer <u>affable</u> demeanor immediately put the nervous candidates at ease.",
    options: [
      {
            "id": "eng_34_a",
            "text": "aloof",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_34_b",
            "text": "cordial and pleasant",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_34_c",
            "text": "hostile",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_34_d",
            "text": "indifferent",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Affable\" means friendly, good-natured, or easy to talk to. \"Cordial and pleasant\" is closest in meaning.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_35",
    subject_id: "eng",
    topic_id: "top_lexis",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the option NEAREST IN MEANING to the underlined word:\nThe university senate revoked the certificates of candidates with <u>bogus</u> entry credentials.",
    options: [
      {
            "id": "eng_35_a",
            "text": "genuine",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_35_b",
            "text": "fraudulent",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_35_c",
            "text": "provisional",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_35_d",
            "text": "confidential",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Bogus\" means not genuine or true; fake, counterfeit, or fraudulent.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_36",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "From the options lettered A to D, choose the word that contains the same vowel sound as the one represented by the underlined letters:\npl<u>ai</u>t",
    options: [
      {
            "id": "eng_36_a",
            "text": "plate",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_36_b",
            "text": "flat",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_36_c",
            "text": "pleat",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_36_d",
            "text": "plight",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The word \"plait\" is pronounced /plæt/ with the short front vowel /æ/ (identical to \"flat\", \"cat\", \"hat\"), contrary to the popular misconception of pronouncing it like \"plate\" (/pleɪt/).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_37",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the word that has the same vowel sound as the one underlined:\ncl<u>er</u>k",
    options: [
      {
            "id": "eng_37_a",
            "text": "dark",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "eng_37_b",
            "text": "jerk",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "eng_37_c",
            "text": "perk",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_37_d",
            "text": "lurk",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "In standard British/Commonwealth English, \"clerk\" is pronounced /klɑːk/ with the long vowel /ɑː/, identical to \"dark\" (/dɑːk/), \"park\", and \"bark\".",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_38",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the word that has the same consonant sound as the one underlined:\n<u>th</u>irst",
    options: [
      {
            "id": "eng_38_a",
            "text": "these",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_38_b",
            "text": "theme",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_38_c",
            "text": "though",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_38_d",
            "text": "then",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Thirst\" contains the voiceless dental fricative /θ/. \"Theme\" also begins with /θ/, whereas \"these\", \"though\", and \"then\" begin with the voiced dental fricative /ð/.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_39",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "hard",
    question_text: "Which of the following words contains a silent letter?",
    options: [
      {
            "id": "eng_39_a",
            "text": "subtle",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "eng_39_b",
            "text": "stable",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "eng_39_c",
            "text": "rubble",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_39_d",
            "text": "double",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "In \"subtle\" (/ˈsʌt.əl/), the letter \"b\" is silent, unlike stable, rubble, and double where the \"b\" is fully voiced.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_40",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the word that RHYMES with:\nsuite",
    options: [
      {
            "id": "eng_40_a",
            "text": "suit",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_40_b",
            "text": "sweet",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_40_c",
            "text": "sight",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_40_d",
            "text": "straight",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Suite\" is pronounced /swiːt/, perfectly rhyming with \"sweet\" (/swiːt/).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_41",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Choose the word with the PRIMARY STRESS on the second syllable:",
    options: [
      {
            "id": "eng_41_a",
            "text": "PHO-to-graph",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_41_b",
            "text": "pho-TOG-ra-phy",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_41_c",
            "text": "pho-to-GRAPH-ic",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_41_d",
            "text": "CAT-a-pult",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Photography\" has its primary stress on the second syllable (/fəˈtɒɡ.rə.fi/), unlike photograph (1st), photographic (3rd), or catapult (1st).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_42",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the word that has the same vowel sound as the one underlined:\nb<u>ir</u>d",
    options: [
      {
            "id": "eng_42_a",
            "text": "heard",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "eng_42_b",
            "text": "heart",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "eng_42_c",
            "text": "beard",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_42_d",
            "text": "board",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Bird\" is pronounced with the central vowel /ɜː/ (/bɜːd/). \"Heard\" also contains /ɜː/ (/hɜːd/). \"Heart\" has /ɑː/, \"beard\" has /ɪə/, and \"board\" has /ɔː/.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_43",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the word that has the same consonant sound as the one underlined:\nvi<u>si</u>on",
    options: [
      {
            "id": "eng_43_a",
            "text": "pleasure",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "eng_43_b",
            "text": "pressure",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "eng_43_c",
            "text": "passion",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_43_d",
            "text": "nation",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The sound in \"vision\" is the voiced postalveolar fricative /ʒ/. \"Pleasure\" (/ˈpleʒ.ər/) contains the same /ʒ/ sound, whereas pressure, passion, and nation contain the voiceless /ʃ/.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_44",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS3",
    department: "general",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "EMPHATIC STRESS:\nIn the sentence below, the word in CAPITAL letters has the emphatic stress. Select the question that the sentence answers.\n\n\"Bisi traveled to Abuja by AIR on Monday.\"",
    options: [
      {
            "id": "eng_44_a",
            "text": "Did Bisi travel to Lagos by air on Monday?",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "eng_44_b",
            "text": "Did Bisi travel to Abuja by road on Monday?",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "eng_44_c",
            "text": "Did Emeka travel to Abuja by air on Monday?",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_44_d",
            "text": "Did Bisi travel to Abuja by air on Tuesday?",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "When \"AIR\" is emphatically stressed, the speaker is contrasting the mode of transportation (e.g., denying that she traveled by road, rail, or sea).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "eng_45",
    subject_id: "eng",
    topic_id: "top_oral",
    class_level: "SSS2",
    department: "general",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Choose the word with the PRIMARY STRESS on the third syllable:",
    options: [
      {
            "id": "eng_45_a",
            "text": "un-der-STAND",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "eng_45_b",
            "text": "con-trib-UTE",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "eng_45_c",
            "text": "IM-por-tant",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "eng_45_d",
            "text": "ad-VAN-tage",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"Understand\" (/ˌʌn.dəˈstænd/) has its primary stress on the third syllable (-STAND). Important and advantage have stress on the 2nd syllable.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_01",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Find the roots of the quadratic equation: 2x² - 5x - 3 = 0",
    options: [
      {
            "id": "mat_01_a",
            "text": "x = 3 or x = -1/2",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_01_b",
            "text": "x = -3 or x = 1/2",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_01_c",
            "text": "x = 2 or x = -3/2",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_01_d",
            "text": "x = 1 or x = -3",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Factorizing 2x² - 5x - 3 = 0:\nProduct = -6, Sum = -5; Factors are -6 and +1.\n2x² - 6x + x - 3 = 0 => 2x(x - 3) + 1(x - 3) = 0\n(2x + 1)(x - 3) = 0 => x = 3 or x = -1/2.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_02",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "If α and β are the roots of 3x² - 4x + 1 = 0, evaluate 1/α + 1/β.",
    options: [
      {
            "id": "mat_02_a",
            "text": "4/3",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "mat_02_b",
            "text": "4",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "mat_02_c",
            "text": "3/4",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_02_d",
            "text": "1/4",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Sum of roots α + β = -(-4)/3 = 4/3.\nProduct of roots αβ = 1/3.\nThen 1/α + 1/β = (α + β) / αβ = (4/3) / (1/3) = 4.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_03",
    subject_id: "mat",
    topic_id: "top_seq",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The 3rd term of an Arithmetic Progression (A.P.) is 10 and the 8th term is 25. Find the 1st term.",
    options: [
      {
            "id": "mat_03_a",
            "text": "2",
            "is_correct": false,
            "order_index": 0
      },
      {
            "id": "mat_03_b",
            "text": "4",
            "is_correct": true,
            "order_index": 1
      },
      {
            "id": "mat_03_c",
            "text": "3",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_03_d",
            "text": "5",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "T₃ = a + 2d = 10\nT₈ = a + 7d = 25\nSubtracting: 5d = 15 => d = 3.\nSubstitute into T₃: a + 2(3) = 10 => a + 6 = 10 => a = 4.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_04",
    subject_id: "mat",
    topic_id: "top_seq",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "Find the sum to infinity of the Geometric Progression: 9, 3, 1, 1/3, ...",
    options: [
      {
            "id": "mat_04_a",
            "text": "27/2",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_04_b",
            "text": "18",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_04_c",
            "text": "12",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_04_d",
            "text": "27",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "First term a = 9, common ratio r = 3/9 = 1/3.\nSum to infinity S∞ = a / (1 - r) = 9 / (1 - 1/3) = 9 / (2/3) = 27/2 = 13.5.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_05",
    subject_id: "mat",
    topic_id: "top_calc",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Differentiate y = 3x⁴ - 5x² + 2x - 7 with respect to x.",
    options: [
      {
            "id": "mat_05_a",
            "text": "12x³ - 10x + 2",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_05_b",
            "text": "12x³ - 5x + 2",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_05_c",
            "text": "3x³ - 10x + 2",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_05_d",
            "text": "12x⁴ - 10x² + 2",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Using power rule d/dx(axⁿ) = n·axⁿ⁻¹:\nd/dx(3x⁴) = 12x³\nd/dx(-5x²) = -10x\nd/dx(2x) = 2\nd/dx(-7) = 0\nResult: 12x³ - 10x + 2.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_06",
    subject_id: "mat",
    topic_id: "top_calc",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Evaluate the definite integral ∫₁³ (3x² - 2x) dx.",
    options: [
      {
            "id": "mat_06_a",
            "text": "18",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_06_b",
            "text": "20",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_06_c",
            "text": "16",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_06_d",
            "text": "24",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Indefinite integral: ∫ (3x² - 2x) dx = x³ - x².\nEvaluating from 1 to 3:\nAt x = 3: 3³ - 3² = 27 - 9 = 18.\nAt x = 1: 1³ - 1² = 1 - 1 = 0.\nValue = 18 - 0 = 18.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_07",
    subject_id: "mat",
    topic_id: "top_trig",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "If sin θ = 5/13 and θ is an acute angle, find the exact value of tan θ.",
    options: [
      {
            "id": "mat_07_a",
            "text": "5/12",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_07_b",
            "text": "12/5",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_07_c",
            "text": "12/13",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_07_d",
            "text": "5/8",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Opposite = 5, Hypotenuse = 13. By Pythagoras theorem:\nAdjacent = √(13² - 5²) = √(169 - 25) = √144 = 12.\ntan θ = Opposite / Adjacent = 5/12.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_08",
    subject_id: "mat",
    topic_id: "top_prob",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Two fair six-sided dice are rolled simultaneously. What is the probability of obtaining a total score of 7?",
    options: [
      {
            "id": "mat_08_a",
            "text": "1/6",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_08_b",
            "text": "7/36",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_08_c",
            "text": "1/12",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_08_d",
            "text": "5/36",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Total sample space = 6 × 6 = 36.\nFavorable outcomes summing to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) => 6 outcomes.\nProbability = 6/36 = 1/6.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_09",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "Simplify: (√75 + √48) / √12",
    options: [
      {
            "id": "mat_09_a",
            "text": "9/2",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_09_b",
            "text": "3",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_09_c",
            "text": "7/2",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_09_d",
            "text": "5",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "√75 = √(25 × 3) = 5√3\n√48 = √(16 × 3) = 4√3\nNumerator = 5√3 + 4√3 = 9√3\nDenominator = √12 = 2√3\nResult = (9√3) / (2√3) = 9/2 = 4.5.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_10",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Solve for x: log₁₀(x + 3) + log₁₀(x - 3) = log₁₀ 16",
    options: [
      {
            "id": "mat_10_a",
            "text": "5",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_10_b",
            "text": "±5",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_10_c",
            "text": "4",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_10_d",
            "text": "7",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Using log law log A + log B = log(AB):\nlog₁₀((x + 3)(x - 3)) = log₁₀ 16\nx² - 9 = 16 => x² = 25 => x = ±5.\nSince log of negative number is undefined, x must be greater than 3, so x = 5.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_11",
    subject_id: "mat",
    topic_id: "top_trig",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A point P is on a bearing of 060° from point Q. What is the bearing of Q from P?",
    options: [
      {
            "id": "mat_11_a",
            "text": "240°",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_11_b",
            "text": "120°",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_11_c",
            "text": "300°",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_11_d",
            "text": "150°",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Reverse (back) bearing: since forward bearing θ = 060° is less than 180°, add 180°:\nBack bearing = 060° + 180° = 240°.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_12",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "hard",
    question_text: "Find the determinant of the matrix: | 2  3 |\n| 4  1 |",
    options: [
      {
            "id": "mat_12_a",
            "text": "-10",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_12_b",
            "text": "14",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_12_c",
            "text": "10",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_12_d",
            "text": "-14",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Determinant of 2x2 matrix [a b; c d] = ad - bc = (2)(1) - (3)(4) = 2 - 12 = -10.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_13",
    subject_id: "mat",
    topic_id: "top_prob",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "The mean of the numbers 4, 8, x, 12, 16 is 11. Find the value of x.",
    options: [
      {
            "id": "mat_13_a",
            "text": "15",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_13_b",
            "text": "14",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_13_c",
            "text": "12",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_13_d",
            "text": "16",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "(4 + 8 + x + 12 + 16) / 5 = 11\n40 + x = 55 => x = 15.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_14",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Convert 101101₂ to base 10.",
    options: [
      {
            "id": "mat_14_a",
            "text": "45",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_14_b",
            "text": "43",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_14_c",
            "text": "47",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_14_d",
            "text": "51",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "1·2⁵ + 0·2⁴ + 1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 32 + 0 + 8 + 4 + 0 + 1 = 45.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_15",
    subject_id: "mat",
    topic_id: "top_trig",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "In a circle of radius 7 cm, calculate the arc length subtending an angle of 60° at the center (Take π = 22/7).",
    options: [
      {
            "id": "mat_15_a",
            "text": "7.33 cm",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_15_b",
            "text": "8.50 cm",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_15_c",
            "text": "6.25 cm",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_15_d",
            "text": "14.67 cm",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Arc length L = (θ / 360°) × 2πr = (60 / 360) × 2 × (22/7) × 7 = (1/6) × 44 = 22/3 ≈ 7.33 cm.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_16",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "If 8^(x - 1) = 16^(x - 2), find x.",
    options: [
      {
            "id": "mat_16_a",
            "text": "5",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_16_b",
            "text": "4",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_16_c",
            "text": "3",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_16_d",
            "text": "6",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Express in base 2: (2³)^(x - 1) = (2⁴)^(x - 2)\n2^(3x - 3) = 2^(4x - 8)\nEquating indices: 3x - 3 = 4x - 8 => 4x - 3x = 8 - 3 => x = 5.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_17",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "If (x - 2) is a factor of f(x) = x³ - 4x² + kx + 6, find the value of k.",
    options: [
      {
            "id": "mat_17_a",
            "text": "1",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_17_b",
            "text": "-1",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_17_c",
            "text": "2",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_17_d",
            "text": "-2",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "By the Factor Theorem, f(2) = 0:\n2³ - 4(2²) + k(2) + 6 = 0\n8 - 16 + 2k + 6 = 0\n-2 + 2k = 0 => 2k = 2 => k = 1.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_18",
    subject_id: "mat",
    topic_id: "top_prob",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "In how many distinct ways can the letters of the word \"DELIGHT\" be arranged?",
    options: [
      {
            "id": "mat_18_a",
            "text": "5,040",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_18_b",
            "text": "720",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_18_c",
            "text": "2,520",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_18_d",
            "text": "40,320",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "\"DELIGHT\" contains 7 distinct letters with no repetition.\nNumber of permutations = 7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5,040.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_19",
    subject_id: "mat",
    topic_id: "top_calc",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "Find the coordinates of the turning point of the curve y = 2x² - 8x + 5.",
    options: [
      {
            "id": "mat_19_a",
            "text": "(2, -3)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_19_b",
            "text": "(2, 3)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_19_c",
            "text": "(-2, -3)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_19_d",
            "text": "(4, 5)",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "dy/dx = 4x - 8. At turning point dy/dx = 0 => 4x = 8 => x = 2.\nWhen x = 2: y = 2(2²) - 8(2) + 5 = 8 - 16 + 5 = -3. Turning point is (2, -3).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_20",
    subject_id: "mat",
    topic_id: "top_trig",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Find the value of cos 60° + sin 30°.",
    options: [
      {
            "id": "mat_20_a",
            "text": "1",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_20_b",
            "text": "1/2",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_20_c",
            "text": "√3",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_20_d",
            "text": "√3 / 2",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Special angles: cos 60° = 1/2 and sin 30° = 1/2. Sum = 1/2 + 1/2 = 1.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_21",
    subject_id: "mat",
    topic_id: "top_prob",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2022,
    difficulty: "medium",
    question_text: "Calculate the variance of the sample set: 2, 4, 6, 8, 10.",
    options: [
      {
            "id": "mat_21_a",
            "text": "8",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_21_b",
            "text": "10",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_21_c",
            "text": "6",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_21_d",
            "text": "12",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Mean = (2+4+6+8+10)/5 = 30/5 = 6.\nDeviations squared: (2-6)²=16, (4-6)²=4, (6-6)²=0, (8-6)²=4, (10-6)²=16.\nSum of squares = 16 + 4 + 0 + 4 + 16 = 40.\nVariance = 40 / 5 = 8.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_22",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Evaluate: ⁵C₃ (the combination of 5 items taken 3 at a time).",
    options: [
      {
            "id": "mat_22_a",
            "text": "10",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_22_b",
            "text": "20",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_22_c",
            "text": "15",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_22_d",
            "text": "60",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "⁵C₃ = 5! / (3! × 2!) = (5 × 4) / (2 × 1) = 20 / 2 = 10.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_23",
    subject_id: "mat",
    topic_id: "top_alg",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "If y is inversely proportional to x, and y = 4 when x = 6, find y when x = 8.",
    options: [
      {
            "id": "mat_23_a",
            "text": "3",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_23_b",
            "text": "5.33",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_23_c",
            "text": "2",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_23_d",
            "text": "12",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "y = k / x => k = xy = 4 × 6 = 24.\nWhen x = 8, y = 24 / 8 = 3.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_24",
    subject_id: "mat",
    topic_id: "top_trig",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "Find the equation of the line perpendicular to 2x - 3y + 6 = 0 passing through (1, 4).",
    options: [
      {
            "id": "mat_24_a",
            "text": "3x + 2y - 11 = 0",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_24_b",
            "text": "2x - 3y + 10 = 0",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_24_c",
            "text": "3x - 2y + 5 = 0",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_24_d",
            "text": "2x + 3y - 14 = 0",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Slope of 2x - 3y + 6 = 0 is m₁ = 2/3.\nPerpendicular slope m₂ = -3/2.\nLine: y - 4 = -3/2 (x - 1) => 2y - 8 = -3x + 3 => 3x + 2y - 11 = 0.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "mat_25",
    subject_id: "mat",
    topic_id: "top_calc",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Evaluate: lim(x→2) [ (x² - 4) / (x - 2) ]",
    options: [
      {
            "id": "mat_25_a",
            "text": "4",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "mat_25_b",
            "text": "2",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "mat_25_c",
            "text": "0",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "mat_25_d",
            "text": "Undefined",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "(x² - 4)/(x - 2) = (x - 2)(x + 2)/(x - 2) = x + 2 for x ≠ 2.\nlim(x→2) (x + 2) = 2 + 2 = 4.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_01",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A car accelerates uniformly from rest at 2.5 m/s² for 8 seconds. Calculate the total distance covered.",
    options: [
      {
            "id": "phy_01_a",
            "text": "80 m",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_01_b",
            "text": "160 m",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_01_c",
            "text": "40 m",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_01_d",
            "text": "100 m",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Using s = ut + 1/2 at²:\nu = 0, a = 2.5 m/s², t = 8 s\ns = 0 + 1/2 × 2.5 × (8)² = 1/2 × 2.5 × 64 = 80 m.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_02",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A projectile is launched with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Calculate its maximum height (Take g = 10 m/s²).",
    options: [
      {
            "id": "phy_02_a",
            "text": "20 m",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_02_b",
            "text": "40 m",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_02_c",
            "text": "10 m",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_02_d",
            "text": "80 m",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "H_max = (u² sin² θ) / (2g)\nu = 40 m/s, sin 30° = 0.5\nH = [40² × (0.5)²] / (2 × 10) = [1600 × 0.25] / 20 = 400 / 20 = 20 m.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_03",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "easy",
    question_text: "Which of the following is a derived SI unit?",
    options: [
      {
            "id": "phy_03_a",
            "text": "Newton (N)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_03_b",
            "text": "Kelvin (K)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_03_c",
            "text": "Ampere (A)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_03_d",
            "text": "Candela (cd)",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Newton is a derived unit (1 N = 1 kg·m/s²). Kelvin, Ampere, and Candela are fundamental base SI units.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_04",
    subject_id: "phy",
    topic_id: "top_elec",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel. Calculate the equivalent resistance.",
    options: [
      {
            "id": "phy_04_a",
            "text": "1 Ω",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_04_b",
            "text": "11 Ω",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_04_c",
            "text": "2 Ω",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_04_d",
            "text": "0.5 Ω",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "1/R = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1 Ω⁻¹ => R = 1 Ω.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_05",
    subject_id: "phy",
    topic_id: "top_waves",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A radio station transmits signals at a frequency of 100 MHz. What is the wavelength of the emitted electromagnetic waves? (Speed of light c = 3.0 × 10⁸ m/s).",
    options: [
      {
            "id": "phy_05_a",
            "text": "3.0 m",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_05_b",
            "text": "0.33 m",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_05_c",
            "text": "30 m",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_05_d",
            "text": "300 m",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "c = f · λ => λ = c / f = (3.0 × 10⁸ m/s) / (100 × 10⁶ s⁻¹) = 3.0 m.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_06",
    subject_id: "phy",
    topic_id: "top_atom",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A radioactive isotope has a half-life of 4 days. If the initial mass was 64 g, what mass remains undecayed after 16 days?",
    options: [
      {
            "id": "phy_06_a",
            "text": "4 g",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_06_b",
            "text": "8 g",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_06_c",
            "text": "2 g",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_06_d",
            "text": "16 g",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Number of half-lives n = 16 / 4 = 4.\nRemaining mass N = N₀ / 2ⁿ = 64 / 2⁴ = 64 / 16 = 4 g.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_07",
    subject_id: "phy",
    topic_id: "top_waves",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "easy",
    question_text: "Which phenomenon provides conclusive proof that light waves are transverse rather than longitudinal?",
    options: [
      {
            "id": "phy_07_a",
            "text": "Polarization",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_07_b",
            "text": "Diffraction",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_07_c",
            "text": "Interference",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_07_d",
            "text": "Refraction",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Polarization can only occur in transverse waves where oscillations are perpendicular to the direction of propagation. Longitudinal waves cannot be polarized.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_08",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "A stone of mass 2 kg is whirled in a horizontal circle of radius 0.5 m at a constant speed of 4 m/s. Calculate the centripetal force acting on the stone.",
    options: [
      {
            "id": "phy_08_a",
            "text": "64 N",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_08_b",
            "text": "32 N",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_08_c",
            "text": "16 N",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_08_d",
            "text": "8 N",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Centripetal force F = mv² / r = [2 × (4)²] / 0.5 = [2 × 16] / 0.5 = 32 / 0.5 = 64 N.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_09",
    subject_id: "phy",
    topic_id: "top_atom",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Calculate the energy of a photon of ultraviolet radiation with a frequency of 6.0 × 10¹⁵ Hz (Planck's constant h = 6.63 × 10⁻³⁴ J·s).",
    options: [
      {
            "id": "phy_09_a",
            "text": "3.98 × 10⁻¹⁸ J",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_09_b",
            "text": "1.11 × 10⁻⁴⁸ J",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_09_c",
            "text": "3.98 × 10⁻²⁰ J",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_09_d",
            "text": "4.42 × 10⁻¹⁹ J",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "E = h · f = (6.63 × 10⁻³⁴ J·s) × (6.0 × 10¹⁵ s⁻¹) = 39.78 × 10⁻¹⁹ J ≈ 3.98 × 10⁻¹⁸ J.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_10",
    subject_id: "phy",
    topic_id: "top_waves",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "An object placed 15 cm in front of a concave mirror of focal length 10 cm forms an image. Calculate the image distance.",
    options: [
      {
            "id": "phy_10_a",
            "text": "30 cm",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_10_b",
            "text": "25 cm",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_10_c",
            "text": "6 cm",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_10_d",
            "text": "15 cm",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Mirror equation: 1/f = 1/u + 1/v => 1/10 = 1/15 + 1/v\n1/v = 1/10 - 1/15 = (3 - 2)/30 = 1/30 => v = 30 cm.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_11",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A 500 W electric kettle is used to heat 1.0 kg of water from 25°C to 100°C. Calculate the minimum time required (Specific heat capacity of water c = 4200 J/kg·K).",
    options: [
      {
            "id": "phy_11_a",
            "text": "630 s",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_11_b",
            "text": "315 s",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_11_c",
            "text": "840 s",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_11_d",
            "text": "420 s",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Heat Q = mcΔθ = 1.0 × 4200 × (100 - 25) = 1.0 × 4200 × 75 = 315,000 J.\nTime t = Q / P = 315,000 / 500 = 630 seconds (10.5 minutes).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_12",
    subject_id: "phy",
    topic_id: "top_elec",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "hard",
    question_text: "According to Faraday's law of electromagnetic induction, the induced electromotive force in a circuit is directly proportional to the:",
    options: [
      {
            "id": "phy_12_a",
            "text": "rate of change of magnetic flux linkage",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_12_b",
            "text": "total resistance of the wire loop",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_12_c",
            "text": "area of the coil only",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_12_d",
            "text": "permeability of free space",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Faraday's law states that induced emf ε = -N (dΦ/dt), meaning the magnitude is directly proportional to the time rate of change of magnetic flux linkage.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_13",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "A hydraulic press has a small piston of area 0.02 m² and a large piston of area 0.5 m². If a force of 100 N is exerted on the small piston, find the force exerted on the large piston.",
    options: [
      {
            "id": "phy_13_a",
            "text": "2,500 N",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_13_b",
            "text": "1,000 N",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_13_c",
            "text": "500 N",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_13_d",
            "text": "5,000 N",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Pascal's principle: F₁ / A₁ = F₂ / A₂ => F₂ = F₁ × (A₂ / A₁) = 100 × (0.5 / 0.02) = 100 × 25 = 2,500 N.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_14",
    subject_id: "phy",
    topic_id: "top_waves",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A ray of light enters glass of refractive index 1.50 from air. If the angle of incidence is 30°, what is the sine of the angle of refraction?",
    options: [
      {
            "id": "phy_14_a",
            "text": "0.33",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_14_b",
            "text": "0.75",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_14_c",
            "text": "0.50",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_14_d",
            "text": "0.25",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Snell's law: n = sin i / sin r => sin r = sin i / n = sin 30° / 1.50 = 0.5 / 1.5 = 1/3 ≈ 0.33.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_15",
    subject_id: "phy",
    topic_id: "top_elec",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A capacitor of capacitance 20 µF is connected across a 100 V DC power supply. Calculate the electrical energy stored in the capacitor.",
    options: [
      {
            "id": "phy_15_a",
            "text": "0.10 J",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_15_b",
            "text": "0.20 J",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_15_c",
            "text": "0.05 J",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_15_d",
            "text": "1.0 J",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Stored energy E = 1/2 CV² = 1/2 × (20 × 10⁻⁶ F) × (100 V)² = 10 × 10⁻⁶ × 10,000 = 0.10 J.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_16",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "An ideal machine has a velocity ratio of 5 and requires an effort of 250 N to lift a load of 1,000 N. What is the efficiency of the machine?",
    options: [
      {
            "id": "phy_16_a",
            "text": "80%",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_16_b",
            "text": "75%",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_16_c",
            "text": "85%",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_16_d",
            "text": "90%",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Mechanical Advantage MA = Load / Effort = 1000 / 250 = 4.\nEfficiency = (MA / VR) × 100% = (4 / 5) × 100% = 80%.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_17",
    subject_id: "phy",
    topic_id: "top_atom",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "In photoelectric emission, the work function of a photosensitive metal is 2.5 eV. If incident photons have an energy of 4.0 eV, what is the maximum kinetic energy of the emitted photoelectrons?",
    options: [
      {
            "id": "phy_17_a",
            "text": "1.5 eV",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_17_b",
            "text": "6.5 eV",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_17_c",
            "text": "2.5 eV",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_17_d",
            "text": "1.6 × 10⁻¹⁹ eV",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Einstein's photoelectric equation: hf = W₀ + K_max => K_max = hf - W₀ = 4.0 eV - 2.5 eV = 1.5 eV.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_18",
    subject_id: "phy",
    topic_id: "top_elec",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Coulomb's Law states that the electrostatic force between two point charges is inversely proportional to the:",
    options: [
      {
            "id": "phy_18_a",
            "text": "square of the distance between them",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_18_b",
            "text": "distance between them",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_18_c",
            "text": "product of their charges",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_18_d",
            "text": "permittivity of the charges",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Coulomb's Law: F = (1 / 4πε₀) · (q₁q₂ / r²). The force is inversely proportional to r² (square of the separation distance).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_19",
    subject_id: "phy",
    topic_id: "top_waves",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A person standing 680 m from a towering cliff claps and hears an echo. If the speed of sound in air is 340 m/s, how long does it take for the echo to be heard?",
    options: [
      {
            "id": "phy_19_a",
            "text": "4.0 s",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_19_b",
            "text": "2.0 s",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_19_c",
            "text": "1.0 s",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_19_d",
            "text": "8.0 s",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Sound travels to the cliff and back: total distance 2d = 2 × 680 = 1360 m.\nTime t = 2d / v = 1360 / 340 = 4.0 seconds.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_20",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2022,
    difficulty: "easy",
    question_text: "The density of a block of metal is 8,000 kg/m³. Its relative density is:",
    options: [
      {
            "id": "phy_20_a",
            "text": "8.0",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_20_b",
            "text": "80",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_20_c",
            "text": "0.8",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_20_d",
            "text": "800",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Relative density = Density of substance / Density of water (1,000 kg/m³) = 8,000 / 1,000 = 8.0 (dimensionless).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_21",
    subject_id: "phy",
    topic_id: "top_elec",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A step-down transformer has 2,400 turns on its primary coil and 120 turns on its secondary coil. If the primary voltage is 240 V, find the secondary output voltage.",
    options: [
      {
            "id": "phy_21_a",
            "text": "12 V",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_21_b",
            "text": "24 V",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_21_c",
            "text": "6 V",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_21_d",
            "text": "48 V",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Turns ratio equation: V_s / V_p = N_s / N_p => V_s = V_p × (N_s / N_p) = 240 × (120 / 2400) = 240 × (1/20) = 12 V.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_22",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "An athlete runs around a circular track of radius 70 m in 44 seconds. Calculate the average speed of the athlete (Take π = 22/7).",
    options: [
      {
            "id": "phy_22_a",
            "text": "10 m/s",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_22_b",
            "text": "5 m/s",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_22_c",
            "text": "15 m/s",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_22_d",
            "text": "20 m/s",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Total distance = circumference = 2πr = 2 × (22/7) × 70 = 440 m.\nSpeed = distance / time = 440 / 44 = 10 m/s.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_23",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "A force of 60 N acts on an object of mass 12 kg. Find the acceleration produced.",
    options: [
      {
            "id": "phy_23_a",
            "text": "5 m/s²",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_23_b",
            "text": "720 m/s²",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_23_c",
            "text": "0.2 m/s²",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_23_d",
            "text": "2 m/s²",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "F = ma => a = F / m = 60 / 12 = 5 m/s².",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_24",
    subject_id: "phy",
    topic_id: "top_waves",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "In Young's double slit experiment, fringe separation increases when:",
    options: [
      {
            "id": "phy_24_a",
            "text": "the distance between the slits and screen is increased",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_24_b",
            "text": "the distance between the two slits is increased",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_24_c",
            "text": "light of shorter wavelength is used",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_24_d",
            "text": "the slit width is doubled",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Fringe separation y = λD / d. As the screen distance D increases, fringe spacing y increases.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "phy_25",
    subject_id: "phy",
    topic_id: "top_mech",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A 2 kg ball is dropped from a height of 20 m. What is its kinetic energy just before striking the ground? (Take g = 10 m/s²).",
    options: [
      {
            "id": "phy_25_a",
            "text": "400 J",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "phy_25_b",
            "text": "200 J",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "phy_25_c",
            "text": "800 J",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "phy_25_d",
            "text": "100 J",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "By Conservation of Mechanical Energy: Final Kinetic Energy = Initial Potential Energy = mgh = 2 × 10 × 20 = 400 J.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_01",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "What volume of oxygen at standard temperature and pressure (s.t.p.) is required for the complete combustion of 5.6 dm³ of methane (CH₄)?",
    options: [
      {
            "id": "che_01_a",
            "text": "11.2 dm³",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_01_b",
            "text": "5.6 dm³",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_01_c",
            "text": "22.4 dm³",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_01_d",
            "text": "2.8 dm³",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Equation: CH₄(g) + 2O₂(g) -> CO₂(g) + 2H₂O(l).\nBy Gay-Lussac's Law of combining volumes, 1 volume of CH₄ reacts with 2 volumes of O₂.\nVolume of O₂ required = 5.6 dm³ × 2 = 11.2 dm³.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_02",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The IUPAC nomenclature for CH₃-CH(CH₃)-CH₂-CH₂-OH is:",
    options: [
      {
            "id": "che_02_a",
            "text": "3-methylbutan-1-ol",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_02_b",
            "text": "2-methylbutan-4-ol",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_02_c",
            "text": "iso-pentanol",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_02_d",
            "text": "3-methylbutan-2-ol",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Number the 4-carbon chain from the end closest to the principal functional group (-OH):\nC1 bears -OH, C3 bears the methyl group (-CH₃). Name: 3-methylbutan-1-ol.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_03",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "easy",
    question_text: "Which of the following organic compounds will decolorize acidified KMnO₄ solution without heating?",
    options: [
      {
            "id": "che_03_a",
            "text": "Ethene",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_03_b",
            "text": "Ethane",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_03_c",
            "text": "Ethanol",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_03_d",
            "text": "Ethanoic acid",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Alkenes like ethene possess carbon-carbon double bonds (unsaturation) and rapidly undergo addition oxidation (Baeyer's test) to decolorize purple KMnO₄.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_04",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "Calculate the percentage by mass of nitrogen in ammonium nitrate, NH₄NO₃ (Relative atomic masses: N = 14, H = 1, O = 16).",
    options: [
      {
            "id": "che_04_a",
            "text": "35.0%",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_04_b",
            "text": "17.5%",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_04_c",
            "text": "28.0%",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_04_d",
            "text": "42.5%",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Molar mass of NH₄NO₃ = (14×2) + (1×4) + (16×3) = 28 + 4 + 48 = 80 g/mol.\n% Nitrogen = (28 / 80) × 100% = 35.0%.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_05",
    subject_id: "che",
    topic_id: "top_eq",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "For the Haber process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = -92 kJ/mol. An increase in pressure will shift the equilibrium position to the:",
    options: [
      {
            "id": "che_05_a",
            "text": "right, increasing ammonia yield",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_05_b",
            "text": "left, decomposing ammonia",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_05_c",
            "text": "neither side, since catalysts control equilibrium",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_05_d",
            "text": "left, because the reaction is exothermic",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "By Le Chatelier's principle, increasing pressure shifts equilibrium towards the side with fewer gas moles. Reactants have 1 + 3 = 4 moles of gas; product has 2 moles. Hence it shifts right.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_06",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "The alkaline hydrolysis of animal fats or vegetable oils to produce soap and glycerol is termed:",
    options: [
      {
            "id": "che_06_a",
            "text": "Saponification",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_06_b",
            "text": "Esterification",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_06_c",
            "text": "Hydrogenation",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_06_d",
            "text": "Polymerization",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Saponification is the base-catalyzed hydrolysis of triglycerides (esters of glycerol and fatty acids) using NaOH or KOH to produce carboxylate salts (soaps) and propane-1,2,3-triol (glycerol).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_07",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "What is the oxidation state of chromium in potassium dichromate, K₂Cr₂O₇?",
    options: [
      {
            "id": "che_07_a",
            "text": "+6",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_07_b",
            "text": "+3",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_07_c",
            "text": "+7",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_07_d",
            "text": "+4",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "2(+1) + 2(Cr) + 7(-2) = 0 => 2 + 2(Cr) - 14 = 0 => 2(Cr) = 12 => Cr = +6.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_08",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Calculate the pH of a 0.001 mol/dm³ aqueous solution of hydrochloric acid (HCl).",
    options: [
      {
            "id": "che_08_a",
            "text": "3.0",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_08_b",
            "text": "1.0",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_08_c",
            "text": "2.0",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_08_d",
            "text": "4.0",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "HCl completely dissociates: [H⁺] = 0.001 mol/dm³ = 10⁻³ M.\npH = -log₁₀[H⁺] = -log₁₀(10⁻³) = 3.0.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_09",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "How many coulombs of electricity are required to deposit 0.5 mole of copper from a CuSO₄ solution during electrolysis? (1 Faraday = 96,500 C).",
    options: [
      {
            "id": "che_09_a",
            "text": "96,500 C",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_09_b",
            "text": "193,000 C",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_09_c",
            "text": "48,250 C",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_09_d",
            "text": "24,125 C",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Cu²⁺ + 2e⁻ -> Cu. Depositing 1 mole of Cu requires 2 Faradays (2 × 96,500 C).\nFor 0.5 mole: Q = 0.5 × 2 F = 1 F = 96,500 C.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_10",
    subject_id: "che",
    topic_id: "top_eq",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Which catalyst is industrially deployed in the Contact Process for the manufacture of tetraoxosulphate(VI) acid?",
    options: [
      {
            "id": "che_10_a",
            "text": "Vanadium(V) oxide (V₂O₅)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_10_b",
            "text": "Finely divided iron",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_10_c",
            "text": "Nickel powder",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_10_d",
            "text": "Manganese(IV) oxide",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Vanadium(V) oxide (V₂O₅) at 450°C is the catalyst used in the oxidation of SO₂ to SO₃ in the Contact Process.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_11",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Under the same conditions of temperature and pressure, which gas will diffuse fastest?",
    options: [
      {
            "id": "che_11_a",
            "text": "Methane (CH₄, M = 16)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_11_b",
            "text": "Oxygen (O₂, M = 32)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_11_c",
            "text": "Carbon dioxide (CO₂, M = 44)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_11_d",
            "text": "Sulphur dioxide (SO₂, M = 64)",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Graham's Law of Diffusion states that rate of diffusion is inversely proportional to the square root of molar mass. Methane has the lowest molar mass (16 g/mol) and diffuses fastest.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_12",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Glucose and fructose are structural isomers with the same molecular formula:",
    options: [
      {
            "id": "che_12_a",
            "text": "C₆H₁₂O₆",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_12_b",
            "text": "C₁₂H₂₂O₁₁",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_12_c",
            "text": "C₆H₆O₆",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_12_d",
            "text": "C₅H₁₀O₅",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Both glucose (an aldohexose) and fructose (a ketohexose) share the molecular formula C₆H₁₂O₆.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_13",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "easy",
    question_text: "Which quantum subshell is characterized by the azimuthal quantum number l = 2?",
    options: [
      {
            "id": "che_13_a",
            "text": "d subshell",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_13_b",
            "text": "s subshell",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_13_c",
            "text": "p subshell",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_13_d",
            "text": "f subshell",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "l = 0 corresponds to s, l = 1 corresponds to p, l = 2 corresponds to d, and l = 3 corresponds to f.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_14",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "The bond formed between an electropositive element and an electronegative element through complete transfer of electrons is:",
    options: [
      {
            "id": "che_14_a",
            "text": "Electrovalent (ionic) bond",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_14_b",
            "text": "Covalent bond",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_14_d",
            "text": "Coordinate covalent bond",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_14_c",
            "text": "Metallic bond",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Electrovalent (ionic) bonding involves the complete transfer of one or more valence electrons from a metal (electropositive) to a non-metal (electronegative).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_15",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "When ethyne (acetylene) gas is bubbled through ammoniacal silver trioxonitrate(V) solution, what is observed?",
    options: [
      {
            "id": "che_15_a",
            "text": "A white precipitate of silver dicarbide is formed",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_15_b",
            "text": "A brick-red precipitate of copper(I) oxide forms",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_15_c",
            "text": "A mirror of metallic silver forms with no gas evolved",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_15_d",
            "text": "The solution turns deep blue",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Terminal alkynes like ethyne contain acidic acetylenic hydrogens that react with ammoniacal AgNO₃ (Tollens' reagent) to precipitate white silver dicarbide (Ag-C≡C-Ag).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_16",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Temporary hardness of water is caused by the presence of dissolved:",
    options: [
      {
            "id": "che_16_a",
            "text": "Calcium hydrogentrioxocarbonate(IV), Ca(HCO₃)₂",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_16_b",
            "text": "Calcium tetraoxosulphate(VI), CaSO₄",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_16_c",
            "text": "Magnesium chloride, MgCl₂",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_16_d",
            "text": "Sodium trioxocarbonate(IV), Na₂CO₃",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Temporary hardness is caused by Ca(HCO₃)₂ and Mg(HCO₃)₂, which readily decompose on boiling to precipitate insoluble carbonates.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_17",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Which gas is evolved when dilute hydrochloric acid reacts with calcium trioxocarbonate(IV)?",
    options: [
      {
            "id": "che_17_a",
            "text": "Carbon(IV) oxide (CO₂)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_17_b",
            "text": "Hydrogen (H₂)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_17_c",
            "text": "Chlorine (Cl₂)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_17_d",
            "text": "Oxygen (O₂)",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "CaCO₃ + 2HCl -> CaCl₂ + H₂O + CO₂(g). Effervescence of carbon(IV) oxide is observed, which turns lime water milky.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_18",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "The major fraction of crude oil that boils in the temperature range of 40°C - 200°C and is predominantly used as fuel for internal combustion car engines is:",
    options: [
      {
            "id": "che_18_a",
            "text": "Petrol (Gasoline)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_18_b",
            "text": "Kerosene (Paraffin oil)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_18_c",
            "text": "Diesel (Gas oil)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_18_d",
            "text": "Bitumen",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Petrol (gasoline), consisting of hydrocarbons ranging from C₅ to C₁₂, distills between ~40°C and 200°C.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_19",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A neutral atom of an element has 17 protons, 18 neutrons, and 17 electrons. Its mass number and group in the Periodic Table are respectively:",
    options: [
      {
            "id": "che_19_a",
            "text": "35 and Group 7 (Halogens)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_19_b",
            "text": "35 and Group 8 (Noble gases)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_19_c",
            "text": "18 and Group 7 (Halogens)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_19_d",
            "text": "34 and Group 6",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Mass number = protons + neutrons = 17 + 18 = 35. Atomic number = 17 (Chlorine), with electron configuration 2,8,7 (Group 7 / 17).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_20",
    subject_id: "che",
    topic_id: "top_eq",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Which of the following changes will increase the rate of a chemical reaction without altering the enthalpy of the reaction (ΔH)?",
    options: [
      {
            "id": "che_20_a",
            "text": "Addition of a positive catalyst",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_20_b",
            "text": "Decreasing reactant concentration",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_20_c",
            "text": "Lowering the temperature",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_20_d",
            "text": "Using larger reactant particle sizes",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "A catalyst provides an alternative pathway with lower activation energy (E_a), speeding up the reaction rate while leaving the overall enthalpy change (ΔH) unchanged.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_21",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "The standard electrode potential (E°) of copper is +0.34 V and that of zinc is -0.76 V. In a Daniell cell, which metal acts as the anode?",
    options: [
      {
            "id": "che_21_a",
            "text": "Zinc (Zn)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_21_b",
            "text": "Copper (Cu)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_21_c",
            "text": "Both metals act simultaneously as anodes",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_21_d",
            "text": "The porous pot",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The more negative standard electrode potential indicates greater tendency to lose electrons (oxidation). Zinc (-0.76 V) oxidizes at the anode, while Cu²⁺ reduces at the cathode.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_22",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The conversion of ethanol to ethanoic acid using acidified K₂Cr₂O₇ is an example of:",
    options: [
      {
            "id": "che_22_a",
            "text": "Oxidation",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_22_b",
            "text": "Reduction",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_22_c",
            "text": "Esterification",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_22_d",
            "text": "Dehydration",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Primary alcohols are oxidized first to aldehydes and subsequently to carboxylic acids by strong oxidizing agents such as acidified potassium dichromate.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_23",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "How many atoms are present in 1.0 mole of ozone (O₃) gas? (Avogadro's constant L = 6.02 × 10²³ mol⁻¹).",
    options: [
      {
            "id": "che_23_a",
            "text": "1.81 × 10²⁴ atoms",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_23_b",
            "text": "6.02 × 10²³ atoms",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_23_c",
            "text": "1.20 × 10²⁴ atoms",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_23_d",
            "text": "3.01 × 10²³ atoms",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "1 mole of O₃ contains 6.02 × 10²³ molecules. Each molecule of O₃ contains 3 oxygen atoms:\nTotal atoms = 3 × 6.02 × 10²³ = 1.806 × 10²⁴ ≈ 1.81 × 10²⁴ atoms.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_24",
    subject_id: "che",
    topic_id: "top_stoich",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2022,
    difficulty: "medium",
    question_text: "Which law states that the total pressure exerted by a mixture of non-reacting gases is equal to the sum of the partial pressures of individual gases?",
    options: [
      {
            "id": "che_24_a",
            "text": "Dalton's Law of Partial Pressures",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_24_b",
            "text": "Boyle's Law",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_24_c",
            "text": "Charles's Law",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_24_d",
            "text": "Avogadro's Law",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Dalton's Law: P_total = P₁ + P₂ + P₃ + ... for chemically inert gas mixtures at constant temperature and volume.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "che_25",
    subject_id: "che",
    topic_id: "top_org",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "Polymerization of vinyl chloride (chloroethene) produces:",
    options: [
      {
            "id": "che_25_a",
            "text": "Polyvinyl chloride (PVC)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "che_25_b",
            "text": "Polystyrene",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "che_25_c",
            "text": "Teflon (PTFE)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "che_25_d",
            "text": "Nylon-6,6",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Addition polymerization of chloroethene monomers (CH₂=CHCl) yields polyvinyl chloride (PVC), widely used for electrical insulation and piping.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_01",
    subject_id: "bio",
    topic_id: "top_genetics",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "In humans, normal pigmentation (A) is dominant over albinism (a). If two heterozygous parents (Aa) marry, what is the probability that their first child will be an albino?",
    options: [
      {
            "id": "bio_01_a",
            "text": "25% (1/4)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_01_b",
            "text": "50% (1/2)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_01_c",
            "text": "75% (3/4)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_01_d",
            "text": "0%",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Cross: Aa × Aa gives genotypes AA (25%), Aa (50%), and aa (25%). Albinism is recessive, so only genotype \"aa\" expresses albinism (25% or 1/4 probability).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_02",
    subject_id: "bio",
    topic_id: "top_genetics",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "A man with blood group AB marries a woman with blood group O. Which of the following blood groups CANNOT occur in their offspring?",
    options: [
      {
            "id": "bio_02_a",
            "text": "Blood group O",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_02_b",
            "text": "Blood group A",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_02_c",
            "text": "Blood group B",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_02_d",
            "text": "Both A and B",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Father provides alleles Iᴬ or Iᴮ. Mother (ii) provides allele i. Offspring genotypes can only be Iᴬi (Group A) or Iᴮi (Group B). Blood group O (ii) and group AB (IᴬIᴮ) cannot be produced.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_03",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Which blood vessel carries oxygenated blood from the lungs directly into the left atrium of the human heart?",
    options: [
      {
            "id": "bio_03_a",
            "text": "Pulmonary vein",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_03_b",
            "text": "Pulmonary artery",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_03_c",
            "text": "Aorta",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_03_d",
            "text": "Vena cava",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The pulmonary vein is the exceptional vein in the human body that carries oxygenated blood from the lungs back to the left atrium of the heart.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_04",
    subject_id: "bio",
    topic_id: "top_eco_bio",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "An ecological association between two organisms of different species in which both organisms derive mutual benefit is known as:",
    options: [
      {
            "id": "bio_04_a",
            "text": "Mutualism",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_04_b",
            "text": "Commensalism",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_04_c",
            "text": "Parasitism",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_04_d",
            "text": "Predation",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Mutualism is a symbiotic relationship where both cooperating species benefit (e.g., nitrogen-fixing Rhizobium bacteria in the root nodules of leguminous plants).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_05",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "Which cell organelle contains hydrolytic digestive enzymes responsible for intracellular digestion and autolysis (programmed cell breakdown)?",
    options: [
      {
            "id": "bio_05_a",
            "text": "Lysosome",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_05_b",
            "text": "Ribosome",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_05_c",
            "text": "Endoplasmic reticulum",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_05_d",
            "text": "Chloroplast",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Lysosomes are membrane-bound organelles housing powerful acid hydrolases that digest cellular debris and foreign invaders.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_06",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "In the mammalian nephron, where does ultrafiltration (glomerular filtration) take place?",
    options: [
      {
            "id": "bio_06_a",
            "text": "Bowman's capsule and glomerulus",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_06_b",
            "text": "Loop of Henle",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_06_c",
            "text": "Distal convoluted tubule",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_06_d",
            "text": "Collecting duct",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "High hydrostatic pressure in the afferent arteriole forces water, urea, glucose, and salts across the glomerular capillaries into Bowman's capsule, forming glomerular filtrate.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_07",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "Which hormone, secreted by the beta cells of the islets of Langerhans in the pancreas, lowers elevated blood glucose levels?",
    options: [
      {
            "id": "bio_07_a",
            "text": "Insulin",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_07_b",
            "text": "Glucagon",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_07_c",
            "text": "Adrenaline",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_07_d",
            "text": "Thyroxine",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Insulin stimulates hepatocytes and skeletal muscle cells to convert blood glucose into glycogen, lowering blood sugar levels.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_08",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS1",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The process by which green plants synthesize carbohydrates from carbon(IV) oxide and water in the presence of sunlight and chlorophyll is summarized as:",
    options: [
      {
            "id": "bio_08_a",
            "text": "6CO₂ + 6H₂O -> C₆H₁₂O₆ + 6O₂",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_08_b",
            "text": "C₆H₁₂O₆ + 6O₂ -> 6CO₂ + 6H₂O",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_08_c",
            "text": "6CO₂ + 12H₂O -> C₆H₁₂O₆ + 6H₂O",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_08_d",
            "text": "CO₂ + H₂O -> CH₂O + O₂",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Photosynthesis equation: 6CO₂ + 6H₂O in light/chlorophyll produces one molecule of glucose (C₆H₁₂O₆) and releases 6 molecules of oxygen (O₂).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_09",
    subject_id: "bio",
    topic_id: "top_eco_bio",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "In an aquatic food chain: Phytoplankton -> Zooplankton -> Small Fish -> Tilapia -> Crocodile, which organism occupies the primary producer trophic level?",
    options: [
      {
            "id": "bio_09_a",
            "text": "Phytoplankton",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_09_b",
            "text": "Zooplankton",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_09_c",
            "text": "Small Fish",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_09_d",
            "text": "Crocodile",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Phytoplankton are microscopic autotrophic algae that perform photosynthesis, forming the base (Trophic Level 1: Primary Producers).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_10",
    subject_id: "bio",
    topic_id: "top_genetics",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "Sickle cell anemia is caused by a point mutation in the gene encoding the beta-globin chain of hemoglobin. This mutation causes:",
    options: [
      {
            "id": "bio_10_a",
            "text": "glutamic acid to be substituted by valine at position 6",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_10_b",
            "text": "valine to be substituted by glutamic acid at position 6",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_10_c",
            "text": "complete absence of alpha-globin chains",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_10_d",
            "text": "the insertion of an extra nitrogenous base",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The sickle cell mutation is a single nucleotide polymorphism (GAG -> GTG) causing hydrophilic glutamic acid to be replaced by hydrophobic valine at position 6.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_11",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Water and dissolved mineral salts are conducted upwards from the roots to the leaves of vascular plants predominantly through:",
    options: [
      {
            "id": "bio_11_a",
            "text": "Xylem vessels",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_11_b",
            "text": "Phloem sieve tubes",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_11_c",
            "text": "Cortex parenchyma",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_11_d",
            "text": "Epidermal stomata",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Xylem transports water and dissolved mineral ions unidirectionally from roots to stems and leaves, powered by transpiration pull.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_12",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2022,
    difficulty: "medium",
    question_text: "In human respiration, during inhalation (inspiration), the diaphragm:",
    options: [
      {
            "id": "bio_12_a",
            "text": "contracts and flattens downwards",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_12_b",
            "text": "relaxes and arches upwards into a dome shape",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_12_c",
            "text": "remains static while intercostal muscles contract",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_12_d",
            "text": "contracts and pushes upwards into the pleural cavity",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "During inhalation, the diaphragm contracts and flattens downwards, increasing thoracic cavity volume and decreasing pressure to draw air into the lungs.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_13",
    subject_id: "bio",
    topic_id: "top_eco_bio",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Which bacteria are responsible for converting nitrites (NO₂⁻) into nitrates (NO₃⁻) in the terrestrial nitrogen cycle?",
    options: [
      {
            "id": "bio_13_a",
            "text": "Nitrobacter",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_13_b",
            "text": "Nitrosomonas",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_13_c",
            "text": "Rhizobium",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_13_d",
            "text": "Pseudomonas denitrificans",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Nitrification occurs in two steps: Nitrosomonas oxidizes ammonia (NH₃) to nitrite (NO₂⁻), and Nitrobacter oxidizes nitrite (NO₂⁻) to nitrate (NO₃⁻).",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_14",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "Which blood component lacks a nucleus, is biconcave in shape, and contains the iron-rich oxygen-transport pigment hemoglobin?",
    options: [
      {
            "id": "bio_14_a",
            "text": "Erythrocyte (Red Blood Cell)",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_14_b",
            "text": "Leukocyte (White Blood Cell)",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_14_c",
            "text": "Thrombocyte (Platelet)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_14_d",
            "text": "Blood plasma",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Mature mammalian erythrocytes are enucleated biconcave discs packed with hemoglobin to optimize surface area for oxygen and carbon dioxide diffusion.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_15",
    subject_id: "bio",
    topic_id: "top_genetics",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "hard",
    question_text: "During cell division, crossing over (genetic recombination) between non-sister chromatids of homologous chromosomes occurs during:",
    options: [
      {
            "id": "bio_15_a",
            "text": "Pachytene stage of Prophase I of Meiosis",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_15_b",
            "text": "Metaphase of Mitosis",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_15_c",
            "text": "Anaphase II of Meiosis",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_15_d",
            "text": "Telophase I of Meiosis",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Synapsis occurs in Zygotene, followed by chiasma formation and crossing over during the Pachytene stage of Prophase I in Meiosis.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_16",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Bile is produced by the _______ and stored in the _______.",
    options: [
      {
            "id": "bio_16_a",
            "text": "liver; gall bladder",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_16_b",
            "text": "gall bladder; liver",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_16_c",
            "text": "pancreas; duodenum",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_16_d",
            "text": "stomach; spleen",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Bile salts are continuously synthesized by liver hepatocytes and concentrated/stored in the gall bladder until secreted into the duodenum for lipid emulsification.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_17",
    subject_id: "bio",
    topic_id: "top_eco_bio",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "medium",
    question_text: "Which adaptation enables xerophytic desert plants like cacti to minimize water loss via transpiration?",
    options: [
      {
            "id": "bio_17_a",
            "text": "Sunken stomata and thick waxy cuticles",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_17_b",
            "text": "Broad, thin leaves with abundant open stomata",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_17_c",
            "text": "Absence of roots and floating air sacs",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_17_d",
            "text": "Stomata on the upper epidermis only",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Xerophytes reduce water loss via reduced leaves (spines), sunken stomata that trap humid microclimates, and thick waxy cuticles.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_18",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "The structural and functional unit of the human nervous system responsible for transmitting electrical impulses is the:",
    options: [
      {
            "id": "bio_18_a",
            "text": "Neuron",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_18_b",
            "text": "Nephron",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_18_c",
            "text": "Myofibril",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_18_d",
            "text": "Osteocyte",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Neurons (nerve cells), consisting of dendrites, a cell body, and an axon, conduct action potentials throughout the central and peripheral nervous systems.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_19",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2022,
    difficulty: "easy",
    question_text: "Which vitamin is synthesized in human skin upon exposure to ultraviolet sunlight and promotes calcium absorption in bones?",
    options: [
      {
            "id": "bio_19_a",
            "text": "Vitamin D",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_19_b",
            "text": "Vitamin C",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_19_c",
            "text": "Vitamin A",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_19_d",
            "text": "Vitamin K",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Vitamin D (cholecalciferol) is synthesized endogenously when 7-dehydrocholesterol in the skin absorbs UV-B rays. It facilitates intestinal absorption of calcium.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_20",
    subject_id: "bio",
    topic_id: "top_genetics",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "Which of the following is an example of continuous phenotypic variation in human populations?",
    options: [
      {
            "id": "bio_20_a",
            "text": "Height and skin color",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_20_b",
            "text": "ABO blood grouping",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_20_c",
            "text": "Tongue-rolling ability",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_20_d",
            "text": "Rhesus factor (+ / -)",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Continuous variations (polygenic traits) display a spectrum of values without distinct categories, such as height, mass, and melanin pigmentation.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_21",
    subject_id: "bio",
    topic_id: "top_eco_bio",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "A disease-causing biological organism or agent is scientifically referred to as a:",
    options: [
      {
            "id": "bio_21_a",
            "text": "Pathogen",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_21_b",
            "text": "Vector",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_21_c",
            "text": "Host",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_21_d",
            "text": "Parasitoid",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "A pathogen is an infectious biological agent (bacterium, virus, fungus, or protozoan) that causes disease in its host.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_22",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "JAMB",
    year: 2024,
    difficulty: "hard",
    question_text: "In mammalian kidneys, antidiuretic hormone (ADH / vasopressin), released by the posterior pituitary gland, acts to:",
    options: [
      {
            "id": "bio_22_a",
            "text": "increase water reabsorption in the collecting ducts, producing concentrated urine",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_22_b",
            "text": "decrease water reabsorption, producing dilute urine",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_22_c",
            "text": "inhibit sodium reabsorption in the proximal convoluted tubule",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_22_d",
            "text": "stimulate the breakdown of urea into uric acid",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "ADH stimulates aquaporin insertion in collecting duct walls, elevating water permeability and facilitating water reabsorption back into the bloodstream.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_23",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS1",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "medium",
    question_text: "Which digestive enzyme present in human gastric juice hydrolyzes protein into soluble peptides in an acidic medium?",
    options: [
      {
            "id": "bio_23_a",
            "text": "Pepsin",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_23_b",
            "text": "Trypsin",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_23_c",
            "text": "Amylase",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_23_d",
            "text": "Lipase",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Pepsinogen is activated to pepsin by hydrochloric acid (pH 1.5 - 2.0) in the stomach, where it cleaves peptide bonds in proteins.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_24",
    subject_id: "bio",
    topic_id: "top_genetics",
    class_level: "SSS3",
    department: "science",
    exam_target: "JAMB",
    year: 2023,
    difficulty: "medium",
    question_text: "According to Charles Darwin's theory of evolution, the primary mechanism driving adaptive changes in species over generations is:",
    options: [
      {
            "id": "bio_24_a",
            "text": "Natural selection of favorable hereditary variations",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_24_b",
            "text": "Inheritance of acquired characteristics through disuse",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_24_c",
            "text": "Deliberate artificial hybridization by organisms",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_24_d",
            "text": "Sudden polyploidy triggered by chemical radiation",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "Darwinian natural selection posits that individuals possessing phenotypic traits best suited to their environment enjoy higher survival and reproductive fitness.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "bio_25",
    subject_id: "bio",
    topic_id: "top_circ",
    class_level: "SSS2",
    department: "science",
    exam_target: "WAEC",
    year: 2023,
    difficulty: "easy",
    question_text: "Which part of the mammalian ear is responsible for maintaining dynamic balance and equilibrium during bodily motion?",
    options: [
      {
            "id": "bio_25_a",
            "text": "Semicircular canals",
            "is_correct": true,
            "order_index": 0
      },
      {
            "id": "bio_25_b",
            "text": "Cochlea",
            "is_correct": false,
            "order_index": 1
      },
      {
            "id": "bio_25_c",
            "text": "Tympanic membrane (eardrum)",
            "is_correct": false,
            "order_index": 2
      },
      {
            "id": "bio_25_d",
            "text": "Auditory ossicles",
            "is_correct": false,
            "order_index": 3
      }
],
    explanation: "The three semicircular canals filled with endolymph sense rotational acceleration, while the cochlea detects acoustic vibrations for hearing.",
    source_type: 'curriculum_aligned',
    source_reference: 'Nigerian National Curriculum Standard',
    license_status: 'demo_data',
    review_status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const ENGLISH_PRACTICE_QUESTIONS: Question[] = CURRICULUM_QUESTIONS.filter(
  q => q.subject_id === 'eng'
);

export const getSubjectQuestions = (subjectId: string): Question[] => {
  return CURRICULUM_QUESTIONS.filter(q => q.subject_id === subjectId);
};

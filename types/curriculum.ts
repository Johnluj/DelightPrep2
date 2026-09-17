import { Subject, Department } from '@/types/database';
import { SEED_SUBJECTS } from '@/lib/seed-data';

export interface CourseCombination {
  course_name: string;
  faculty: string;
  department: Department;
  compulsory_jamb_subjects: string[];
  utme_subject_names: string[];
  o_level_requirements: string;
}

export const SENIOR_CURRICULUM_SUBJECTS: Subject[] = SEED_SUBJECTS.filter(
  s => s.level === 'senior'
);

export const JUNIOR_CURRICULUM_SUBJECTS: Subject[] = SEED_SUBJECTS.filter(
  s => s.level === 'junior'
);

export const POPULAR_JAMB_COURSES: CourseCombination[] = [
  {
    course_name: 'Medicine & Surgery (MBBS)',
    faculty: 'Medical Sciences',
    department: 'science',
    compulsory_jamb_subjects: ['ENG', 'BIO', 'CHM', 'PHY'],
    utme_subject_names: ['English Language', 'Biology', 'Chemistry', 'Physics'],
    o_level_requirements: '5 Credits: English, Mathematics, Physics, Chemistry, Biology in one sitting.'
  },
  {
    course_name: 'Computer Science / Software Engineering',
    faculty: 'Science / Computing',
    department: 'science',
    compulsory_jamb_subjects: ['ENG', 'MTH', 'PHY', 'CHM'],
    utme_subject_names: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    o_level_requirements: '5 Credits: English, Mathematics, Physics and any two other science subjects.'
  },
  {
    course_name: 'Electrical / Mechanical Engineering',
    faculty: 'Engineering',
    department: 'science',
    compulsory_jamb_subjects: ['ENG', 'MTH', 'PHY', 'CHM'],
    utme_subject_names: ['English Language', 'Mathematics', 'Physics', 'Chemistry'],
    o_level_requirements: '5 Credits: English, Mathematics, Physics, Chemistry, and any other relevant subject.'
  },
  {
    course_name: 'Law (LL.B)',
    faculty: 'Law',
    department: 'arts',
    compulsory_jamb_subjects: ['ENG', 'LIT', 'GOV', 'CRS'],
    utme_subject_names: ['English Language', 'Literature-in-English', 'Government', 'CRS / IRS / Economics'],
    o_level_requirements: '5 Credits: English Language, Mathematics, Literature-in-English, and two social science/arts subjects.'
  },
  {
    course_name: 'Accounting / Finance',
    faculty: 'Administration / Social Sciences',
    department: 'commercial',
    compulsory_jamb_subjects: ['ENG', 'MTH', 'ECO', 'COM'],
    utme_subject_names: ['English Language', 'Mathematics', 'Economics', 'Commerce or Government'],
    o_level_requirements: '5 Credits: English, Mathematics, Economics, and two other commercial/arts subjects.'
  },
  {
    course_name: 'Economics / Business Administration',
    faculty: 'Social Sciences',
    department: 'commercial',
    compulsory_jamb_subjects: ['ENG', 'MTH', 'ECO', 'GOV'],
    utme_subject_names: ['English Language', 'Mathematics', 'Economics', 'Government'],
    o_level_requirements: '5 Credits: English, Mathematics, Economics, and two other subjects.'
  },
  {
    course_name: 'Political Science / International Relations',
    faculty: 'Social Sciences',
    department: 'arts',
    compulsory_jamb_subjects: ['ENG', 'GOV', 'LIT', 'ECO'],
    utme_subject_names: ['English Language', 'Government', 'Literature-in-English', 'Economics'],
    o_level_requirements: '5 Credits: English, Government, Mathematics, and two other arts/social science subjects.'
  },
  {
    course_name: 'Agricultural Science',
    faculty: 'Agriculture',
    department: 'science',
    compulsory_jamb_subjects: ['ENG', 'AGR', 'CHM', 'BIO'],
    utme_subject_names: ['English Language', 'Agricultural Science / Biology', 'Chemistry', 'Physics or Mathematics'],
    o_level_requirements: '5 Credits: English, Mathematics, Chemistry, Biology/Agricultural Science, and Physics.'
  }
];

import { 
  Subject, 
  StudentClass, 
  Department, 
  ExamGoal 
} from '@/types/database';
import { 
  JUNIOR_CURRICULUM_SUBJECTS, 
  SENIOR_CURRICULUM_SUBJECTS, 
  POPULAR_JAMB_COURSES,
  CourseCombination 
} from '@/types/curriculum';

export class CurriculumService {
  /**
   * Determine educational world based on class
   */
  static getEducationLevel(studentClass: StudentClass): 'junior' | 'senior' {
    return studentClass.startsWith('JSS') ? 'junior' : 'senior';
  }

  /**
   * Retrieve all curriculum subjects for a given education level
   */
  static getSubjectsByLevel(level: 'junior' | 'senior'): Subject[] {
    return level === 'junior' ? JUNIOR_CURRICULUM_SUBJECTS : SENIOR_CURRICULUM_SUBJECTS;
  }

  /**
   * Junior standard recommendations (9 subjects, English & Math compulsory)
   */
  static getJuniorRecommendedSubjects(): Subject[] {
    // 9 subjects standard profile
    return JUNIOR_CURRICULUM_SUBJECTS.slice(0, 9);
  }

  /**
   * Senior standard recommendations based on department (Science, Commercial, Arts)
   */
  static getSeniorDepartmentSubjects(department: Department): Subject[] {
    const generalSubjects = SENIOR_CURRICULUM_SUBJECTS.filter(s => s.is_compulsory);
    const departmentSubjects = SENIOR_CURRICULUM_SUBJECTS.filter(s => s.department === department);
    return [...generalSubjects, ...departmentSubjects];
  }

  /**
   * Intended JAMB course recommendations
   */
  static getCourseRecommendations(courseName: string): CourseCombination | undefined {
    return POPULAR_JAMB_COURSES.find(
      c => c.course_name.toLowerCase() === courseName.toLowerCase()
    );
  }

  /**
   * Return matching Subject objects for a course's JAMB codes
   */
  static getJambSubjectsForCourse(courseName: string): Subject[] {
    const course = this.getCourseRecommendations(courseName);
    if (!course) {
      // Default: English + Math + Physics + Chemistry
      return SENIOR_CURRICULUM_SUBJECTS.filter(s => 
        ['ENG', 'MTH', 'PHY', 'CHM'].includes(s.code)
      );
    }

    return SENIOR_CURRICULUM_SUBJECTS.filter(s => 
      course.compulsory_jamb_subjects.includes(s.code)
    );
  }

  /**
   * Recommend starting subjects based on student onboarding profile
   */
  static recommendSubjects(params: {
    studentClass: StudentClass;
    department?: Department;
    targetExam: ExamGoal;
    intendedCourse?: string;
  }): Subject[] {
    const level = this.getEducationLevel(params.studentClass);

    if (level === 'junior') {
      return this.getJuniorRecommendedSubjects();
    }

    if (params.targetExam === 'JAMB' && params.intendedCourse) {
      return this.getJambSubjectsForCourse(params.intendedCourse);
    }

    if (params.department) {
      return this.getSeniorDepartmentSubjects(params.department);
    }

    return SENIOR_CURRICULUM_SUBJECTS.slice(0, 7);
  }
}

import { Question, QuestionOption, DifficultyLevel, ExamGoal } from '@/types/database';
import { getStoredQuestions } from '@/lib/storage';

export class QuestionService {
  /**
   * Fetch questions matching practice or exam criteria
   */
  static getQuestions(criteria: {
    subjectId?: string;
    topicId?: string;
    classLevel?: string;
    examTarget?: ExamGoal;
    difficulty?: DifficultyLevel;
    year?: number;
    limit?: number;
    randomize?: boolean;
  }): Question[] {
    const all = getStoredQuestions();

    let filtered = all.filter(q => {
      if (q.review_status !== 'published') return false;
      if (criteria.subjectId && q.subject_id !== criteria.subjectId) return false;
      if (criteria.topicId && q.topic_id !== criteria.topicId) return false;
      if (criteria.classLevel && q.class_level !== criteria.classLevel) return false;
      if (criteria.examTarget && q.exam_target && q.exam_target !== criteria.examTarget) return false;
      if (criteria.difficulty && q.difficulty !== criteria.difficulty) return false;
      if (criteria.year && q.year !== criteria.year) return false;
      return true;
    });

    if (filtered.length === 0 && criteria.subjectId) {
      // If none match specific filters, provide subject questions
      filtered = all.filter(q => q.subject_id === criteria.subjectId);
    }

    if (filtered.length === 0) {
      filtered = all;
    }

    if (criteria.randomize) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    if (criteria.limit && criteria.limit > 0) {
      filtered = filtered.slice(0, criteria.limit);
    }

    return filtered;
  }

  /**
   * Strip answer keys and explanations for secure active exam sessions
   */
  static prepareSecureExamPayload(questions: Question[]) {
    return questions.map(q => {
      // Shuffle options while preserving stable ID
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      const labels: ('A' | 'B' | 'C' | 'D' | 'E')[] = ['A', 'B', 'C', 'D', 'E'];

      return {
        question_id: q.id,
        subject_id: q.subject_id,
        question_text: q.question_text,
        image_url: q.image_url,
        options: shuffledOptions.map((opt, idx) => ({
          id: opt.id,
          text: opt.text,
          display_label: labels[idx] || 'A'
        }))
      };
    });
  }

  /**
   * Authoritative server-side scoring
   */
  static scoreSession(
    questions: Question[],
    userAnswers: Record<string, string> // question_id -> option_id
  ) {
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const breakdownBySubject: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      const subjectId = q.subject_id;
      if (!breakdownBySubject[subjectId]) {
        breakdownBySubject[subjectId] = { total: 0, correct: 0 };
      }
      breakdownBySubject[subjectId].total += 1;

      const selectedOptionId = userAnswers[q.id];
      if (!selectedOptionId) {
        unansweredCount += 1;
        return;
      }

      const correctOption = q.options.find(o => o.is_correct);
      if (correctOption && selectedOptionId === correctOption.id) {
        correctCount += 1;
        breakdownBySubject[subjectId].correct += 1;
      } else {
        wrongCount += 1;
      }
    });

    const totalQuestions = questions.length;
    const scorePercentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    return {
      totalQuestions,
      correctCount,
      wrongCount,
      unansweredCount,
      scorePercentage: Math.round(scorePercentage * 10) / 10,
      breakdownBySubject
    };
  }
}

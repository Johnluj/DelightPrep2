import { NextRequest, NextResponse } from 'next/server';
import { SEED_QUESTIONS } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, questionIds, timeTakenSeconds, userId } = body;

    if (!answers || !questionIds || !Array.isArray(questionIds)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    const matchedQuestions = SEED_QUESTIONS.filter(q => questionIds.includes(q.id));

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    const questionResults = matchedQuestions.map(q => {
      const selectedOptionId = answers[q.id];
      const correctOption = q.options.find(o => o.is_correct);
      const isCorrect = correctOption && selectedOptionId === correctOption.id;

      if (!selectedOptionId) {
        unansweredCount += 1;
      } else if (isCorrect) {
        correctCount += 1;
      } else {
        wrongCount += 1;
      }

      return {
        questionId: q.id,
        questionText: q.question_text,
        subjectId: q.subject_id,
        selectedOptionId: selectedOptionId || null,
        correctOptionId: correctOption?.id || null,
        isCorrect: Boolean(isCorrect),
        explanation: q.explanation,
        options: q.options
      };
    });

    const totalQuestions = matchedQuestions.length;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const xpEarned = correctCount * 10 + 20; // 10 XP per correct + 20 completion bonus

    return NextResponse.json({
      success: true,
      result: {
        totalQuestions,
        correctCount,
        wrongCount,
        unansweredCount,
        scorePercentage,
        timeTakenSeconds: timeTakenSeconds || 0,
        xpEarned,
        questionResults
      }
    });
  } catch (error) {
    console.error('API /api/exams/score error:', error);
    return NextResponse.json({ success: false, error: 'Scoring failed' }, { status: 500 });
  }
}

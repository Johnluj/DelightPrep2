import { NextRequest, NextResponse } from 'next/server';
import { SEED_QUESTIONS } from '@/lib/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subjectId = searchParams.get('subjectId');
    const examTarget = searchParams.get('examTarget');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const isExamSession = searchParams.get('isExamSession') === 'true';

    let questions = SEED_QUESTIONS.filter(q => q.review_status === 'published');

    if (subjectId) {
      questions = questions.filter(q => q.subject_id === subjectId);
    }
    if (examTarget) {
      questions = questions.filter(q => q.exam_target === examTarget);
    }

    if (questions.length === 0) {
      questions = SEED_QUESTIONS;
    }

    // Limit slice
    const sliced = questions.slice(0, limit);

    // If an active CBT exam is requesting questions, strip answer keys and explanations!
    if (isExamSession) {
      const sanitized = sliced.map(q => ({
        id: q.id,
        subject_id: q.subject_id,
        topic_id: q.topic_id,
        question_text: q.question_text,
        image_url: q.image_url,
        options: q.options.map(o => ({
          id: o.id,
          text: o.text,
          order_index: o.order_index
        }))
      }));
      return NextResponse.json({ success: true, questions: sanitized });
    }

    // For practice learning mode, full data is available
    return NextResponse.json({ success: true, questions: sliced });
  } catch (error) {
    console.error('API /api/questions error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch questions' }, { status: 500 });
  }
}

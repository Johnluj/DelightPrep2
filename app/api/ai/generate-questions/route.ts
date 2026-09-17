import { NextRequest, NextResponse } from 'next/server';
import { generateAIQuestionDrafts } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { subject, topic, classLevel, difficulty, count } = await req.json();

    const drafts = await generateAIQuestionDrafts({
      subject: subject || 'General Mathematics',
      topic: topic || 'Algebraic Fractions',
      classLevel: classLevel || 'SSS2',
      difficulty: difficulty || 'medium',
      count: count || 3
    });

    return NextResponse.json({ success: true, drafts });
  } catch (error) {
    console.error('API /api/ai/generate-questions error:', error);
    return NextResponse.json({ success: false, error: 'Draft generation failed' }, { status: 500 });
  }
}
